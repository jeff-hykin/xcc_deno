// "https://cdn.jsdelivr.net/npm/@wasmer/wasi@0.12.0/lib/index.js"
import { WASIError, WASIExitError, WASIKillError } from "./errors.js" 
import { Buffer } from "../node_shims/buffer.js"
import browserBindings from "./bindings/browser.js";
// Import our default bindings depending on the environment
let defaultBindings = browserBindings;
/*ROLLUP_REPLACE_NODE
import nodeBindings from "./bindings/node";
defaultBindings = nodeBindings;
ROLLUP_REPLACE_NODE*/
/*ROLLUP_REPLACE_BROWSER
import browserBindings from "./bindings/browser";
defaultBindings = browserBindings;
ROLLUP_REPLACE_BROWSER*/
/*

This project is based from the Node implementation made by Gus Caplan
https://github.com/devsnek/node-wasi
However, JavaScript WASI is focused on:
 * Bringing WASI to the Browsers
 * Make easy to plug different filesystems
 * Provide a type-safe api using Typescript
 * Providing multiple output targets to support both browsers and node
 * The API is adapted to the Node-WASI API: https://github.com/nodejs/wasi/blob/wasi/lib/wasi.js

Copyright 2019 Gus Caplan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

 */
import * as constants from "./constants.js"
const STDIN_DEFAULT_RIGHTS = constants.WASI_RIGHT_FD_DATASYNC |
    constants.WASI_RIGHT_FD_READ |
    constants.WASI_RIGHT_FD_SYNC |
    constants.WASI_RIGHT_FD_ADVISE |
    constants.WASI_RIGHT_FD_FILESTAT_GET |
    constants.WASI_RIGHT_POLL_FD_READWRITE;
const STDOUT_DEFAULT_RIGHTS = constants.WASI_RIGHT_FD_DATASYNC |
    constants.WASI_RIGHT_FD_WRITE |
    constants.WASI_RIGHT_FD_SYNC |
    constants.WASI_RIGHT_FD_ADVISE |
    constants.WASI_RIGHT_FD_FILESTAT_GET |
    constants.WASI_RIGHT_POLL_FD_READWRITE;
const STDERR_DEFAULT_RIGHTS = STDOUT_DEFAULT_RIGHTS;
const msToNs = (ms) => {
    const msInt = Math.trunc(ms);
    const decimal = BigInt(Math.round((ms - msInt) * 1000000));
    const ns = BigInt(msInt) * BigInt(1000000);
    return ns + decimal;
};
const nsToMs = (ns) => {
    if (typeof ns === 'number') {
        ns = Math.trunc(ns);
    }
    const nsInt = BigInt(ns);
    return Number(nsInt / BigInt(1000000));
};
const wrap = (f) => (...args) => {
    try {
        return f(...args);
    }
    catch (e) {
        // If it's an error from the fs
        if (e && e.code && typeof e.code === "string") {
            return constants.ERROR_MAP[e.code] || constants.WASI_EINVAL;
        }
        // If it's a WASI error, we return it directly
        if (e instanceof WASIError) {
            return e.errno;
        }
        // Otherwise we let the error bubble up
        throw e;
    }
};
const stat = (wasi, fd) => {
    const entry = wasi.FD_MAP.get(fd);
    if (!entry) {
        throw new WASIError(constants.WASI_EBADF);
    }
    if (entry.filetype === undefined) {
        const stats = wasi.bindings.fs.fstatSync(entry.real);
        const { filetype, rightsBase, rightsInheriting } = translateFileAttributes(wasi, fd, stats);
        entry.filetype = filetype;
        if (!entry.rights) {
            entry.rights = {
                base: rightsBase,
                inheriting: rightsInheriting
            };
        }
    }
    return entry;
};
const translateFileAttributes = (wasi, fd, stats) => {
    switch (true) {
        case stats.isBlockDevice():
            return {
                filetype: constants.WASI_FILETYPE_BLOCK_DEVICE,
                rightsBase: constants.RIGHTS_BLOCK_DEVICE_BASE,
                rightsInheriting: constants.RIGHTS_BLOCK_DEVICE_INHERITING
            };
        case stats.isCharacterDevice(): {
            const filetype = constants.WASI_FILETYPE_CHARACTER_DEVICE;
            if (fd !== undefined && wasi.bindings.isTTY(fd)) {
                return {
                    filetype,
                    rightsBase: constants.RIGHTS_TTY_BASE,
                    rightsInheriting: constants.RIGHTS_TTY_INHERITING
                };
            }
            return {
                filetype,
                rightsBase: constants.RIGHTS_CHARACTER_DEVICE_BASE,
                rightsInheriting: constants.RIGHTS_CHARACTER_DEVICE_INHERITING
            };
        }
        case stats.isDirectory():
            return {
                filetype: constants.WASI_FILETYPE_DIRECTORY,
                rightsBase: constants.RIGHTS_DIRECTORY_BASE,
                rightsInheriting: constants.RIGHTS_DIRECTORY_INHERITING
            };
        case stats.isFIFO():
            return {
                filetype: constants.WASI_FILETYPE_SOCKET_STREAM,
                rightsBase: constants.RIGHTS_SOCKET_BASE,
                rightsInheriting: constants.RIGHTS_SOCKET_INHERITING
            };
        case stats.isFile():
            return {
                filetype: constants.WASI_FILETYPE_REGULAR_FILE,
                rightsBase: constants.RIGHTS_REGULAR_FILE_BASE,
                rightsInheriting: constants.RIGHTS_REGULAR_FILE_INHERITING
            };
        case stats.isSocket():
            return {
                filetype: constants.WASI_FILETYPE_SOCKET_STREAM,
                rightsBase: constants.RIGHTS_SOCKET_BASE,
                rightsInheriting: constants.RIGHTS_SOCKET_INHERITING
            };
        case stats.isSymbolicLink():
            return {
                filetype: constants.WASI_FILETYPE_SYMBOLIC_LINK,
                rightsBase: BigInt(0),
                rightsInheriting: BigInt(0)
            };
        default:
            return {
                filetype: constants.WASI_FILETYPE_UNKNOWN,
                rightsBase: BigInt(0),
                rightsInheriting: BigInt(0)
            };
    }
};
export class WASIDefault {
    constructor(wasiConfig) {
        // Destructure our wasiConfig
        let preopens = {};
        if (wasiConfig && wasiConfig.preopens) {
            preopens = wasiConfig.preopens;
        }
        else if (wasiConfig && wasiConfig.preopenDirectories) {
            preopens = wasiConfig
                .preopenDirectories;
        }
        let env = {};
        if (wasiConfig && wasiConfig.env) {
            env = wasiConfig.env;
        }
        let args = [];
        if (wasiConfig && wasiConfig.args) {
            args = wasiConfig.args;
        }
        let bindings = defaultBindings;
        if (wasiConfig && wasiConfig.bindings) {
            bindings = wasiConfig.bindings;
        }
        // @ts-ignore
        this.memory = undefined;
        // @ts-ignore
        this.view = undefined;
        this.bindings = bindings;
        this.FD_MAP = new Map([
            [
                constants.WASI_STDIN_FILENO,
                {
                    real: 0,
                    filetype: constants.WASI_FILETYPE_CHARACTER_DEVICE,
                    // offset: BigInt(0),
                    rights: {
                        base: STDIN_DEFAULT_RIGHTS,
                        inheriting: BigInt(0)
                    },
                    path: undefined
                }
            ],
            [
                constants.WASI_STDOUT_FILENO,
                {
                    real: 1,
                    filetype: constants.WASI_FILETYPE_CHARACTER_DEVICE,
                    // offset: BigInt(0),
                    rights: {
                        base: STDOUT_DEFAULT_RIGHTS,
                        inheriting: BigInt(0)
                    },
                    path: undefined
                }
            ],
            [
                constants.WASI_STDERR_FILENO,
                {
                    real: 2,
                    filetype: constants.WASI_FILETYPE_CHARACTER_DEVICE,
                    // offset: BigInt(0),
                    rights: {
                        base: STDERR_DEFAULT_RIGHTS,
                        inheriting: BigInt(0)
                    },
                    path: undefined
                }
            ]
        ]);
        let fs = this.bindings.fs;
        let path = this.bindings.path;
        for (const [k, v] of Object.entries(preopens)) {
            const real = fs.openSync(v, fs.constants.O_RDONLY);
            const newfd = [...this.FD_MAP.keys()].reverse()[0] + 1;
            this.FD_MAP.set(newfd, {
                real,
                filetype: constants.WASI_FILETYPE_DIRECTORY,
                // offset: BigInt(0),
                rights: {
                    base: constants.RIGHTS_DIRECTORY_BASE,
                    inheriting: constants.RIGHTS_DIRECTORY_INHERITING
                },
                fakePath: k,
                path: v
            });
        }
        const getiovs = (iovs, iovsLen) => {
            // iovs* -> [iov, iov, ...]
            // __wasi_ciovec_t {
            //   void* buf,
            //   size_t buf_len,
            // }
            this.refreshMemory();
            const buffers = Array.from({ length: iovsLen }, (_, i) => {
                const ptr = iovs + i * 8;
                const buf = this.view.getUint32(ptr, true);
                const bufLen = this.view.getUint32(ptr + 4, true);
                return new Uint8Array(this.memory.buffer, buf, bufLen);
            });
            return buffers;
        };
        const CHECK_FD = (fd, rights) => {
            const stats = stat(this, fd);
            // console.log(`CHECK_FD: stats.real: ${stats.real}, stats.path:`, stats.path);
            if (rights !== BigInt(0) && (stats.rights.base & rights) === BigInt(0)) {
                throw new WASIError(constants.WASI_EPERM);
            }
            return stats;
        };
        const CPUTIME_START = bindings.hrtime();
        const now = (clockId) => {
            switch (clockId) {
                case constants.WASI_CLOCK_MONOTONIC:
                    return bindings.hrtime();
                case constants.WASI_CLOCK_REALTIME:
                    return msToNs(Date.now());
                case constants.WASI_CLOCK_PROCESS_CPUTIME_ID:
                case constants.WASI_CLOCK_THREAD_CPUTIME_ID:
                    // return bindings.hrtime(CPUTIME_START)
                    return bindings.hrtime() - CPUTIME_START;
                default:
                    return null;
            }
        };
        this.wasiImport = {
            args_get: (argv, argvBuf) => {
                this.refreshMemory();
                let coffset = argv;
                let offset = argvBuf;
                args.forEach(a => {
                    this.view.setUint32(coffset, offset, true);
                    coffset += 4;
                    offset += Buffer.from(this.memory.buffer).write(`${a}\0`, offset);
                });
                return constants.WASI_ESUCCESS;
            },
            args_sizes_get: (argc, argvBufSize) => {
                this.refreshMemory();
                this.view.setUint32(argc, args.length, true);
                const size = args.reduce((acc, a) => acc + Buffer.byteLength(a) + 1, 0);
                this.view.setUint32(argvBufSize, size, true);
                return constants.WASI_ESUCCESS;
            },
            environ_get: (environ, environBuf) => {
                this.refreshMemory();
                let coffset = environ;
                let offset = environBuf;
                Object.entries(env).forEach(([key, value]) => {
                    this.view.setUint32(coffset, offset, true);
                    coffset += 4;
                    offset += Buffer.from(this.memory.buffer).write(`${key}=${value}\0`, offset);
                });
                return constants.WASI_ESUCCESS;
            },
            environ_sizes_get: (environCount, environBufSize) => {
                this.refreshMemory();
                const envProcessed = Object.entries(env).map(([key, value]) => `${key}=${value}\0`);
                const size = envProcessed.reduce((acc, e) => acc + Buffer.byteLength(e), 0);
                this.view.setUint32(environCount, envProcessed.length, true);
                this.view.setUint32(environBufSize, size, true);
                return constants.WASI_ESUCCESS;
            },
            clock_res_get: (clockId, resolution) => {
                let res;
                switch (clockId) {
                    case constants.WASI_CLOCK_MONOTONIC:
                    case constants.WASI_CLOCK_PROCESS_CPUTIME_ID:
                    case constants.WASI_CLOCK_THREAD_CPUTIME_ID: {
                        res = BigInt(1);
                        break;
                    }
                    case constants.WASI_CLOCK_REALTIME: {
                        res = BigInt(1000);
                        break;
                    }
                }
                this.view.setBigUint64(resolution, res);
                return constants.WASI_ESUCCESS;
            },
            clock_time_get: (clockId, precision, time) => {
                this.refreshMemory();
                const n = now(clockId);
                if (n === null) {
                    return constants.WASI_EINVAL;
                }
                this.view.setBigUint64(time, BigInt(n), true);
                return constants.WASI_ESUCCESS;
            },
            fd_advise: wrap((fd, offset, len, advice) => {
                CHECK_FD(fd, constants.WASI_RIGHT_FD_ADVISE);
                return constants.WASI_ENOSYS;
            }),
            fd_allocate: wrap((fd, offset, len) => {
                CHECK_FD(fd, constants.WASI_RIGHT_FD_ALLOCATE);
                return constants.WASI_ENOSYS;
            }),
            fd_close: wrap((fd) => {
                const stats = CHECK_FD(fd, BigInt(0));
                fs.closeSync(stats.real);
                this.FD_MAP.delete(fd);
                return constants.WASI_ESUCCESS;
            }),
            fd_datasync: wrap((fd) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_DATASYNC);
                fs.fdatasyncSync(stats.real);
                return constants.WASI_ESUCCESS;
            }),
            fd_fdstat_get: wrap((fd, bufPtr) => {
                const stats = CHECK_FD(fd, BigInt(0));
                this.refreshMemory();
                this.view.setUint8(bufPtr, stats.filetype); // FILETYPE u8
                this.view.setUint16(bufPtr + 2, 0, true); // FDFLAG u16
                this.view.setUint16(bufPtr + 4, 0, true); // FDFLAG u16
                this.view.setBigUint64(bufPtr + 8, BigInt(stats.rights.base), true); // u64
                this.view.setBigUint64(bufPtr + 8 + 8, BigInt(stats.rights.inheriting), true); // u64
                return constants.WASI_ESUCCESS;
            }),
            fd_fdstat_set_flags: wrap((fd, flags) => {
                CHECK_FD(fd, constants.WASI_RIGHT_FD_FDSTAT_SET_FLAGS);
                return constants.WASI_ENOSYS;
            }),
            fd_fdstat_set_rights: wrap((fd, fsRightsBase, fsRightsInheriting) => {
                const stats = CHECK_FD(fd, BigInt(0));
                const nrb = stats.rights.base | fsRightsBase;
                if (nrb > stats.rights.base) {
                    return constants.WASI_EPERM;
                }
                const nri = stats.rights.inheriting | fsRightsInheriting;
                if (nri > stats.rights.inheriting) {
                    return constants.WASI_EPERM;
                }
                stats.rights.base = fsRightsBase;
                stats.rights.inheriting = fsRightsInheriting;
                return constants.WASI_ESUCCESS;
            }),
            fd_filestat_get: wrap((fd, bufPtr) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_FILESTAT_GET);
                const rstats = fs.fstatSync(stats.real);
                this.refreshMemory();
                this.view.setBigUint64(bufPtr, BigInt(rstats.dev), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, BigInt(rstats.ino), true);
                bufPtr += 8;
                this.view.setUint8(bufPtr, stats.filetype);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, BigInt(rstats.nlink), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, BigInt(rstats.size), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, msToNs(rstats.atimeMs), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, msToNs(rstats.mtimeMs), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, msToNs(rstats.ctimeMs), true);
                return constants.WASI_ESUCCESS;
            }),
            fd_filestat_set_size: wrap((fd, stSize) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_FILESTAT_SET_SIZE);
                fs.ftruncateSync(stats.real, Number(stSize));
                return constants.WASI_ESUCCESS;
            }),
            fd_filestat_set_times: wrap((fd, stAtim, stMtim, fstflags) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_FILESTAT_SET_TIMES);
                const rstats = fs.fstatSync(stats.real);
                let atim = rstats.atime;
                let mtim = rstats.mtime;
                const n = nsToMs(now(constants.WASI_CLOCK_REALTIME));
                const atimflags = constants.WASI_FILESTAT_SET_ATIM | constants.WASI_FILESTAT_SET_ATIM_NOW;
                if ((fstflags & atimflags) === atimflags) {
                    return constants.WASI_EINVAL;
                }
                const mtimflags = constants.WASI_FILESTAT_SET_MTIM | constants.WASI_FILESTAT_SET_MTIM_NOW;
                if ((fstflags & mtimflags) === mtimflags) {
                    return constants.WASI_EINVAL;
                }
                if ((fstflags & constants.WASI_FILESTAT_SET_ATIM) === constants.WASI_FILESTAT_SET_ATIM) {
                    atim = nsToMs(stAtim);
                }
                else if ((fstflags & constants.WASI_FILESTAT_SET_ATIM_NOW) === constants.WASI_FILESTAT_SET_ATIM_NOW) {
                    atim = n;
                }
                if ((fstflags & constants.WASI_FILESTAT_SET_MTIM) === constants.WASI_FILESTAT_SET_MTIM) {
                    mtim = nsToMs(stMtim);
                }
                else if ((fstflags & constants.WASI_FILESTAT_SET_MTIM_NOW) === constants.WASI_FILESTAT_SET_MTIM_NOW) {
                    mtim = n;
                }
                fs.futimesSync(stats.real, new Date(atim), new Date(mtim));
                return constants.WASI_ESUCCESS;
            }),
            fd_prestat_get: wrap((fd, bufPtr) => {
                const stats = CHECK_FD(fd, BigInt(0));
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                this.view.setUint8(bufPtr, constants.WASI_PREOPENTYPE_DIR);
                this.view.setUint32(bufPtr + 4, Buffer.byteLength(stats.fakePath), true);
                return constants.WASI_ESUCCESS;
            }),
            fd_prestat_dir_name: wrap((fd, pathPtr, pathLen) => {
                const stats = CHECK_FD(fd, BigInt(0));
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                Buffer.from(this.memory.buffer).write(stats.fakePath, pathPtr, pathLen, "utf8");
                return constants.WASI_ESUCCESS;
            }),
            fd_pwrite: wrap((fd, iovs, iovsLen, offset, nwritten) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_WRITE | constants.WASI_RIGHT_FD_SEEK);
                let written = 0;
                getiovs(iovs, iovsLen).forEach(iov => {
                    let w = 0;
                    while (w < iov.byteLength) {
                        w += fs.writeSync(stats.real, iov, w, iov.byteLength - w, Number(offset) + written + w);
                    }
                    written += w;
                });
                this.view.setUint32(nwritten, written, true);
                return constants.WASI_ESUCCESS;
            }),
            fd_write: wrap((fd, iovs, iovsLen, nwritten) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_WRITE);
                let written = 0;
                getiovs(iovs, iovsLen).forEach(iov => {
                    let w = 0;
                    while (w < iov.byteLength) {
                        const i = fs.writeSync(stats.real, iov, w, iov.byteLength - w, stats.offset ? Number(stats.offset) : null);
                        if (stats.offset)
                            stats.offset += BigInt(i);
                        w += i;
                    }
                    written += w;
                });
                this.view.setUint32(nwritten, written, true);
                return constants.WASI_ESUCCESS;
            }),
            fd_pread: wrap((fd, iovs, iovsLen, offset, nread) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_READ | constants.WASI_RIGHT_FD_SEEK);
                let read = 0;
                outer: for (const iov of getiovs(iovs, iovsLen)) {
                    let r = 0;
                    while (r < iov.byteLength) {
                        const length = iov.byteLength - r;
                        const rr = fs.readSync(stats.real, iov, r, iov.byteLength - r, Number(offset) + read + r);
                        r += rr;
                        read += rr;
                        // If we don't read anything, or we receive less than requested
                        if (rr === 0 || rr < length) {
                            break outer;
                        }
                    }
                    read += r;
                }
                ;
                this.view.setUint32(nread, read, true);
                return constants.WASI_ESUCCESS;
            }),
            fd_read: wrap((fd, iovs, iovsLen, nread) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_READ);
                const IS_STDIN = stats.real === 0;
                let read = 0;
                outer: for (const iov of getiovs(iovs, iovsLen)) {
                    let r = 0;
                    while (r < iov.byteLength) {
                        let length = iov.byteLength - r;
                        let position = IS_STDIN || stats.offset === undefined
                            ? null
                            : Number(stats.offset);
                        let rr = fs.readSync(stats.real, // fd
                        iov, // buffer
                        r, // offset
                        length, // length
                        position // position
                        );
                        if (!IS_STDIN) {
                            stats.offset =
                                (stats.offset ? stats.offset : BigInt(0)) + BigInt(rr);
                        }
                        r += rr;
                        read += rr;
                        // If we don't read anything, or we receive less than requested
                        if (rr === 0 || rr < length) {
                            break outer;
                        }
                    }
                }
                // We should not modify the offset of stdin
                this.view.setUint32(nread, read, true);
                return constants.WASI_ESUCCESS;
            }),
            fd_readdir: wrap((fd, bufPtr, bufLen, cookie, bufusedPtr) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_READDIR);
                this.refreshMemory();
                const entries = fs.readdirSync(stats.path, { withFileTypes: true });
                const startPtr = bufPtr;
                for (let i = Number(cookie); i < entries.length; i += 1) {
                    const entry = entries[i];
                    let nameLength = Buffer.byteLength(entry.name);
                    if (bufPtr - startPtr > bufLen) {
                        break;
                    }
                    this.view.setBigUint64(bufPtr, BigInt(i + 1), true);
                    bufPtr += 8;
                    if (bufPtr - startPtr > bufLen) {
                        break;
                    }
                    const rstats = fs.statSync(path.resolve(stats.path, entry.name));
                    this.view.setBigUint64(bufPtr, BigInt(rstats.ino), true);
                    bufPtr += 8;
                    if (bufPtr - startPtr > bufLen) {
                        break;
                    }
                    this.view.setUint32(bufPtr, nameLength, true);
                    bufPtr += 4;
                    if (bufPtr - startPtr > bufLen) {
                        break;
                    }
                    let filetype;
                    switch (true) {
                        case rstats.isBlockDevice():
                            filetype = constants.WASI_FILETYPE_BLOCK_DEVICE;
                            break;
                        case rstats.isCharacterDevice():
                            filetype = constants.WASI_FILETYPE_CHARACTER_DEVICE;
                            break;
                        case rstats.isDirectory():
                            filetype = constants.WASI_FILETYPE_DIRECTORY;
                            break;
                        case rstats.isFIFO():
                            filetype = constants.WASI_FILETYPE_SOCKET_STREAM;
                            break;
                        case rstats.isFile():
                            filetype = constants.WASI_FILETYPE_REGULAR_FILE;
                            break;
                        case rstats.isSocket():
                            filetype = constants.WASI_FILETYPE_SOCKET_STREAM;
                            break;
                        case rstats.isSymbolicLink():
                            filetype = constants.WASI_FILETYPE_SYMBOLIC_LINK;
                            break;
                        default:
                            filetype = constants.WASI_FILETYPE_UNKNOWN;
                            break;
                    }
                    this.view.setUint8(bufPtr, filetype);
                    bufPtr += 1;
                    bufPtr += 3; // padding
                    if (bufPtr + nameLength >= startPtr + bufLen) {
                        // It doesn't fit in the buffer
                        break;
                    }
                    let memory_buffer = Buffer.from(this.memory.buffer);
                    memory_buffer.write(entry.name, bufPtr);
                    bufPtr += nameLength;
                }
                const bufused = bufPtr - startPtr;
                this.view.setUint32(bufusedPtr, Math.min(bufused, bufLen), true);
                return constants.WASI_ESUCCESS;
            }),
            fd_renumber: wrap((from, to) => {
                CHECK_FD(from, BigInt(0));
                CHECK_FD(to, BigInt(0));
                fs.closeSync(this.FD_MAP.get(from).real);
                this.FD_MAP.set(from, this.FD_MAP.get(to));
                this.FD_MAP.delete(to);
                return constants.WASI_ESUCCESS;
            }),
            fd_seek: wrap((fd, offset, whence, newOffsetPtr) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_SEEK);
                this.refreshMemory();
                switch (whence) {
                    case constants.WASI_WHENCE_CUR:
                        stats.offset =
                            (stats.offset ? stats.offset : BigInt(0)) + BigInt(offset);
                        break;
                    case constants.WASI_WHENCE_END:
                        const { size } = fs.fstatSync(stats.real);
                        stats.offset = BigInt(size) + BigInt(offset);
                        break;
                    case constants.WASI_WHENCE_SET:
                        stats.offset = BigInt(offset);
                        break;
                }
                this.view.setBigUint64(newOffsetPtr, stats.offset, true);
                return constants.WASI_ESUCCESS;
            }),
            fd_tell: wrap((fd, offsetPtr) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_TELL);
                this.refreshMemory();
                if (!stats.offset) {
                    stats.offset = BigInt(0);
                }
                this.view.setBigUint64(offsetPtr, stats.offset, true);
                return constants.WASI_ESUCCESS;
            }),
            fd_sync: wrap((fd) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_FD_SYNC);
                fs.fsyncSync(stats.real);
                return constants.WASI_ESUCCESS;
            }),
            path_create_directory: wrap((fd, pathPtr, pathLen) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_PATH_CREATE_DIRECTORY);
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const p = Buffer.from(this.memory.buffer, pathPtr, pathLen).toString();
                fs.mkdirSync(path.resolve(stats.path, p));
                return constants.WASI_ESUCCESS;
            }),
            path_filestat_get: wrap((fd, flags, pathPtr, pathLen, bufPtr) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_PATH_FILESTAT_GET);
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const p = Buffer.from(this.memory.buffer, pathPtr, pathLen).toString();
                const rstats = fs.statSync(path.resolve(stats.path, p));
                this.view.setBigUint64(bufPtr, BigInt(rstats.dev), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, BigInt(rstats.ino), true);
                bufPtr += 8;
                this.view.setUint8(bufPtr, translateFileAttributes(this, undefined, rstats).filetype);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, BigInt(rstats.nlink), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, BigInt(rstats.size), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, msToNs(rstats.atimeMs), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, msToNs(rstats.mtimeMs), true);
                bufPtr += 8;
                this.view.setBigUint64(bufPtr, msToNs(rstats.ctimeMs), true);
                return constants.WASI_ESUCCESS;
            }),
            path_filestat_set_times: wrap((fd, dirflags, pathPtr, pathLen, stAtim, stMtim, fstflags) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_PATH_FILESTAT_SET_TIMES);
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const rstats = fs.fstatSync(stats.real);
                let atim = rstats.atime;
                let mtim = rstats.mtime;
                const n = nsToMs(now(constants.WASI_CLOCK_REALTIME));
                const atimflags = constants.WASI_FILESTAT_SET_ATIM | constants.WASI_FILESTAT_SET_ATIM_NOW;
                if ((fstflags & atimflags) === atimflags) {
                    return constants.WASI_EINVAL;
                }
                const mtimflags = constants.WASI_FILESTAT_SET_MTIM | constants.WASI_FILESTAT_SET_MTIM_NOW;
                if ((fstflags & mtimflags) === mtimflags) {
                    return constants.WASI_EINVAL;
                }
                if ((fstflags & constants.WASI_FILESTAT_SET_ATIM) === constants.WASI_FILESTAT_SET_ATIM) {
                    atim = nsToMs(stAtim);
                }
                else if ((fstflags & constants.WASI_FILESTAT_SET_ATIM_NOW) === constants.WASI_FILESTAT_SET_ATIM_NOW) {
                    atim = n;
                }
                if ((fstflags & constants.WASI_FILESTAT_SET_MTIM) === constants.WASI_FILESTAT_SET_MTIM) {
                    mtim = nsToMs(stMtim);
                }
                else if ((fstflags & constants.WASI_FILESTAT_SET_MTIM_NOW) === constants.WASI_FILESTAT_SET_MTIM_NOW) {
                    mtim = n;
                }
                const p = Buffer.from(this.memory.buffer, pathPtr, pathLen).toString();
                fs.utimesSync(path.resolve(stats.path, p), new Date(atim), new Date(mtim));
                return constants.WASI_ESUCCESS;
            }),
            path_link: wrap((oldFd, oldFlags, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
                const ostats = CHECK_FD(oldFd, constants.WASI_RIGHT_PATH_LINK_SOURCE);
                const nstats = CHECK_FD(newFd, constants.WASI_RIGHT_PATH_LINK_TARGET);
                if (!ostats.path || !nstats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const op = Buffer.from(this.memory.buffer, oldPath, oldPathLen).toString();
                const np = Buffer.from(this.memory.buffer, newPath, newPathLen).toString();
                fs.linkSync(path.resolve(ostats.path, op), path.resolve(nstats.path, np));
                return constants.WASI_ESUCCESS;
            }),
            path_open: wrap((dirfd, dirflags, pathPtr, pathLen, oflags, fsRightsBase, fsRightsInheriting, fsFlags, fd) => {
                const stats = CHECK_FD(dirfd, constants.WASI_RIGHT_PATH_OPEN);
                fsRightsBase = BigInt(fsRightsBase);
                fsRightsInheriting = BigInt(fsRightsInheriting);
                const read = (fsRightsBase & (constants.WASI_RIGHT_FD_READ | constants.WASI_RIGHT_FD_READDIR)) !==
                    BigInt(0);
                const write = (fsRightsBase &
                    (constants.WASI_RIGHT_FD_DATASYNC |
                        constants.WASI_RIGHT_FD_WRITE |
                        constants.WASI_RIGHT_FD_ALLOCATE |
                        constants.WASI_RIGHT_FD_FILESTAT_SET_SIZE)) !==
                    BigInt(0);
                let noflags;
                if (write && read) {
                    noflags = fs.constants.O_RDWR;
                }
                else if (read) {
                    noflags = fs.constants.O_RDONLY;
                }
                else if (write) {
                    noflags = fs.constants.O_WRONLY;
                }
                // fsRightsBase is needed here but perhaps we should do it in neededInheriting
                let neededBase = fsRightsBase | constants.WASI_RIGHT_PATH_OPEN;
                let neededInheriting = fsRightsBase | fsRightsInheriting;
                if ((oflags & constants.WASI_O_CREAT) !== 0) {
                    noflags |= fs.constants.O_CREAT;
                    neededBase |= constants.WASI_RIGHT_PATH_CREATE_FILE;
                }
                if ((oflags & constants.WASI_O_DIRECTORY) !== 0) {
                    noflags |= fs.constants.O_DIRECTORY;
                }
                if ((oflags & constants.WASI_O_EXCL) !== 0) {
                    noflags |= fs.constants.O_EXCL;
                }
                if ((oflags & constants.WASI_O_TRUNC) !== 0) {
                    noflags |= fs.constants.O_TRUNC;
                    neededBase |= constants.WASI_RIGHT_PATH_FILESTAT_SET_SIZE;
                }
                // Convert file descriptor flags.
                if ((fsFlags & constants.WASI_FDFLAG_APPEND) !== 0) {
                    noflags |= fs.constants.O_APPEND;
                }
                if ((fsFlags & constants.WASI_FDFLAG_DSYNC) !== 0) {
                    if (fs.constants.O_DSYNC) {
                        noflags |= fs.constants.O_DSYNC;
                    }
                    else {
                        noflags |= fs.constants.O_SYNC;
                    }
                    neededInheriting |= constants.WASI_RIGHT_FD_DATASYNC;
                }
                if ((fsFlags & constants.WASI_FDFLAG_NONBLOCK) !== 0) {
                    noflags |= fs.constants.O_NONBLOCK;
                }
                if ((fsFlags & constants.WASI_FDFLAG_RSYNC) !== 0) {
                    if (fs.constants.O_RSYNC) {
                        noflags |= fs.constants.O_RSYNC;
                    }
                    else {
                        noflags |= fs.constants.O_SYNC;
                    }
                    neededInheriting |= constants.WASI_RIGHT_FD_SYNC;
                }
                if ((fsFlags & constants.WASI_FDFLAG_SYNC) !== 0) {
                    noflags |= fs.constants.O_SYNC;
                    neededInheriting |= constants.WASI_RIGHT_FD_SYNC;
                }
                if (write &&
                    (noflags & (fs.constants.O_APPEND | fs.constants.O_TRUNC)) === 0) {
                    neededInheriting |= constants.WASI_RIGHT_FD_SEEK;
                }
                this.refreshMemory();
                const p = Buffer.from(this.memory.buffer, pathPtr, pathLen).toString();
                const fullUnresolved = path.resolve(stats.path, p);
                if (path.relative(stats.path, fullUnresolved).startsWith("..")) {
                    return constants.WASI_ENOTCAPABLE;
                }
                let full;
                try {
                    full = fs.realpathSync(fullUnresolved);
                    if (path.relative(stats.path, full).startsWith("..")) {
                        return constants.WASI_ENOTCAPABLE;
                    }
                }
                catch (e) {
                    if (e.code === "ENOENT") {
                        full = fullUnresolved;
                    }
                    else {
                        throw e;
                    }
                }
                /* check if the file is a directory (unless opening for write,
                 * in which case the file may not exist and should be created) */
                let isDirectory;
                try {
                    isDirectory = fs.statSync(full).isDirectory();
                }
                catch (e) { }
                let realfd;
                if (!write && isDirectory) {
                    realfd = fs.openSync(full, fs.constants.O_RDONLY);
                }
                else {
                    realfd = fs.openSync(full, noflags);
                }
                const newfd = [...this.FD_MAP.keys()].reverse()[0] + 1;
                this.FD_MAP.set(newfd, {
                    real: realfd,
                    filetype: undefined,
                    // offset: BigInt(0),
                    rights: {
                        base: neededBase,
                        inheriting: neededInheriting
                    },
                    path: full
                });
                stat(this, newfd);
                this.view.setUint32(fd, newfd, true);
                return constants.WASI_ESUCCESS;
            }),
            path_readlink: wrap((fd, pathPtr, pathLen, buf, bufLen, bufused) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_PATH_READLINK);
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const p = Buffer.from(this.memory.buffer, pathPtr, pathLen).toString();
                const full = path.resolve(stats.path, p);
                const r = fs.readlinkSync(full);
                const used = Buffer.from(this.memory.buffer).write(r, buf, bufLen);
                this.view.setUint32(bufused, used, true);
                return constants.WASI_ESUCCESS;
            }),
            path_remove_directory: wrap((fd, pathPtr, pathLen) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_PATH_REMOVE_DIRECTORY);
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const p = Buffer.from(this.memory.buffer, pathPtr, pathLen).toString();
                fs.rmdirSync(path.resolve(stats.path, p));
                return constants.WASI_ESUCCESS;
            }),
            path_rename: wrap((oldFd, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
                const ostats = CHECK_FD(oldFd, constants.WASI_RIGHT_PATH_RENAME_SOURCE);
                const nstats = CHECK_FD(newFd, constants.WASI_RIGHT_PATH_RENAME_TARGET);
                if (!ostats.path || !nstats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const op = Buffer.from(this.memory.buffer, oldPath, oldPathLen).toString();
                const np = Buffer.from(this.memory.buffer, newPath, newPathLen).toString();
                fs.renameSync(path.resolve(ostats.path, op), path.resolve(nstats.path, np));
                return constants.WASI_ESUCCESS;
            }),
            path_symlink: wrap((oldPath, oldPathLen, fd, newPath, newPathLen) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_PATH_SYMLINK);
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const op = Buffer.from(this.memory.buffer, oldPath, oldPathLen).toString();
                const np = Buffer.from(this.memory.buffer, newPath, newPathLen).toString();
                fs.symlinkSync(op, path.resolve(stats.path, np));
                return constants.WASI_ESUCCESS;
            }),
            path_unlink_file: wrap((fd, pathPtr, pathLen) => {
                const stats = CHECK_FD(fd, constants.WASI_RIGHT_PATH_UNLINK_FILE);
                if (!stats.path) {
                    return constants.WASI_EINVAL;
                }
                this.refreshMemory();
                const p = Buffer.from(this.memory.buffer, pathPtr, pathLen).toString();
                fs.unlinkSync(path.resolve(stats.path, p));
                return constants.WASI_ESUCCESS;
            }),
            poll_oneoff: (sin, sout, nsubscriptions, nevents) => {
                let eventc = 0;
                let waitEnd = 0;
                this.refreshMemory();
                for (let i = 0; i < nsubscriptions; i += 1) {
                    const userdata = this.view.getBigUint64(sin, true);
                    sin += 8;
                    const type = this.view.getUint8(sin);
                    sin += 1;
                    switch (type) {
                        case constants.WASI_EVENTTYPE_CLOCK: {
                            sin += 7; // padding
                            const identifier = this.view.getBigUint64(sin, true);
                            sin += 8;
                            const clockid = this.view.getUint32(sin, true);
                            sin += 4;
                            sin += 4; // padding
                            const timestamp = this.view.getBigUint64(sin, true);
                            sin += 8;
                            const precision = this.view.getBigUint64(sin, true);
                            sin += 8;
                            const subclockflags = this.view.getUint16(sin, true);
                            sin += 2;
                            sin += 6; // padding
                            const absolute = subclockflags === 1;
                            let e = constants.WASI_ESUCCESS;
                            const n = BigInt(now(clockid));
                            if (n === null) {
                                e = constants.WASI_EINVAL;
                            }
                            else {
                                const end = absolute ? timestamp : n + timestamp;
                                waitEnd =
                                    end > waitEnd ? end : waitEnd;
                            }
                            this.view.setBigUint64(sout, userdata, true);
                            sout += 8;
                            this.view.setUint16(sout, e, true); // error
                            sout += 2; // pad offset 2
                            this.view.setUint8(sout, constants.WASI_EVENTTYPE_CLOCK);
                            sout += 1; // pad offset 3
                            sout += 5; // padding to 8
                            eventc += 1;
                            break;
                        }
                        case constants.WASI_EVENTTYPE_FD_READ:
                        case constants.WASI_EVENTTYPE_FD_WRITE: {
                            sin += 3; // padding
                            const fd = this.view.getUint32(sin, true);
                            sin += 4;
                            this.view.setBigUint64(sout, userdata, true);
                            sout += 8;
                            this.view.setUint16(sout, constants.WASI_ENOSYS, true); // error
                            sout += 2; // pad offset 2
                            this.view.setUint8(sout, type);
                            sout += 1; // pad offset 3
                            sout += 5; // padding to 8
                            eventc += 1;
                            break;
                        }
                        default:
                            return constants.WASI_EINVAL;
                    }
                }
                this.view.setUint32(nevents, eventc, true);
                while (bindings.hrtime() < waitEnd) {
                    // nothing
                }
                return constants.WASI_ESUCCESS;
            },
            proc_exit: (rval) => {
                bindings.exit(rval);
                return constants.WASI_ESUCCESS;
            },
            proc_raise: (sig) => {
                if (!(sig in constants.SIGNAL_MAP)) {
                    return constants.WASI_EINVAL;
                }
                bindings.kill(constants.SIGNAL_MAP[sig]);
                return constants.WASI_ESUCCESS;
            },
            random_get: (bufPtr, bufLen) => {
                this.refreshMemory();
                bindings.randomFillSync(new Uint8Array(this.memory.buffer), bufPtr, bufLen);
                return constants.WASI_ESUCCESS;
            },
            sched_yield() {
                // Single threaded environment
                // This is a no-op in JS
                return constants.WASI_ESUCCESS;
            },
            sock_recv() {
                return constants.WASI_ENOSYS;
            },
            sock_send() {
                return constants.WASI_ENOSYS;
            },
            sock_shutdown() {
                return constants.WASI_ENOSYS;
            }
        };
        // Wrap each of the imports to show the calls in the console
        if (wasiConfig.traceSyscalls) {
            Object.keys(this.wasiImport).forEach((key) => {
                const prevImport = this.wasiImport[key];
                this.wasiImport[key] = function (...args) {
                    console.log(`WASI: wasiImport called: ${key} (${args})`);
                    try {
                        let result = prevImport(...args);
                        console.log(`WASI:  => ${result}`);
                        return result;
                    }
                    catch (e) {
                        console.log(`Catched error: ${e}`);
                        throw e;
                    }
                };
            });
        }
    }
    refreshMemory() {
        // @ts-ignore
        if (!this.view || this.view.buffer.byteLength === 0) {
            this.view = new DataView(this.memory.buffer);
        }
    }
    setMemory(memory) {
        this.memory = memory;
    }
    start(instance) {
        const exports = instance.exports;
        if (exports === null || typeof exports !== "object") {
            throw new Error(`instance.exports must be an Object. Received ${exports}.`);
        }
        const { memory } = exports;
        if (!(memory instanceof WebAssembly.Memory)) {
            throw new Error(`instance.exports.memory must be a WebAssembly.Memory. Recceived ${memory}.`);
        }
        this.setMemory(memory);
        if (exports._start) {
            exports._start();
        }
    }
    getImportNamespace(module) {
        let namespace = null;
        for (let imp of WebAssembly.Module.imports(module)) {
            // We only check for the functions
            if (imp.kind !== "function") {
                continue;
            }
            // We allow functions in other namespaces other than wasi
            if (!imp.module.startsWith("wasi_")) {
                continue;
            }
            if (!namespace) {
                namespace = imp.module;
            }
            else {
                if (namespace !== imp.module) {
                    throw new Error("Multiple namespaces detected.");
                }
            }
        }
        return namespace;
    }
    getImports(module) {
        let namespace = this.getImportNamespace(module);
        switch (namespace) {
            case "wasi_unstable":
                return {
                    wasi_unstable: this.wasiImport
                };
            case "wasi_snapshot_preview1":
                return {
                    wasi_snapshot_preview1: this.wasiImport
                };
            default:
                throw new Error("Can't detect a WASI namespace for the WebAssembly Module");
        }
    }
}
WASIDefault.defaultBindings = defaultBindings;
export {
    WASIError,
    WASIExitError,
    WASIKillError,
    WASIDefault as WASI,
}