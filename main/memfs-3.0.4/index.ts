import Stats from "./Stats.ts";
import Dirent from "./Dirent.ts";
import { Volume as _Volume, StatWatcher, FSWatcher, toUnixTimestamp, IReadStream, IWriteStream } from "./volume.ts";
import { IPromisesAPI } from "./promises.ts";
import { fsSyncMethods, fsAsyncMethods } from "../fs-monkey/lib/util/lists.js";
import * as workaround from "./constants.ts";
// import { constants } from "./constants.ts";
const constants = workaround.constants;
const { F_OK, R_OK, W_OK, X_OK } = constants;

var exports = {};
export const Volume = _Volume;
exports.Volume = Volume;

// Default volume.
export const vol = new _Volume();
exports.vol = vol;

export interface IFs extends _Volume {
  constants: typeof constants;
  Stats: new (...args) => Stats;
  Dirent: new (...args) => Dirent;
  StatWatcher: new () => StatWatcher;
  FSWatcher: new () => FSWatcher;
  ReadStream: new (...args) => IReadStream;
  WriteStream: new (...args) => IWriteStream;
  promises: IPromisesAPI;
  _toUnixTimestamp;
}

export function createFsFromVolume(vol: _Volume): IFs {
  const fs = ({ F_OK, R_OK, W_OK, X_OK, constants, Stats, Dirent } as any) as IFs;

  // Bind FS methods.
  for (const method of fsSyncMethods) if (typeof vol[method] === 'function') fs[method] = vol[method].bind(vol);
  for (const method of fsAsyncMethods) if (typeof vol[method] === 'function') fs[method] = vol[method].bind(vol);

  fs.StatWatcher = vol.StatWatcher;
  fs.FSWatcher = vol.FSWatcher;
  fs.WriteStream = vol.WriteStream;
  fs.ReadStream = vol.ReadStream;
  fs.promises = vol.promises;

  fs._toUnixTimestamp = toUnixTimestamp;

  return fs;
}
exports.createFsFromVolume = createFsFromVolume;

export const fs: IFs = createFsFromVolume(vol);

// 
// export stuff
// 
exports.fs = fs;
Object.assign(exports, fs);
exports.default = exports;
var { // this is all the stuff from Object.assign(exports, fs)
    Stats, 
    Dirent, 
    renameSync, 
    ftruncateSync, 
    truncateSync, 
    chownSync, 
    fchownSync, 
    lchownSync, 
    chmodSync, 
    fchmodSync, 
    lchmodSync, 
    statSync, 
    lstatSync, 
    fstatSync, 
    linkSync, 
    symlinkSync, 
    readlinkSync, 
    realpathSync, 
    unlinkSync, 
    rmdirSync, 
    mkdirSync, 
    mkdirpSync, 
    readdirSync, 
    closeSync, 
    openSync, 
    utimesSync, 
    futimesSync, 
    fsyncSync, 
    writeSync, 
    readSync, 
    readFileSync, 
    writeFileSync, 
    appendFileSync, 
    existsSync, 
    accessSync, 
    fdatasyncSync, 
    mkdtempSync, 
    copyFileSync, 
    createReadStream, 
    createWriteStream, 
    rename, 
    ftruncate, 
    truncate, 
    chown, 
    fchown, 
    lchown, 
    chmod, 
    fchmod, 
    lchmod, 
    stat, 
    lstat, 
    fstat, 
    link, 
    symlink, 
    readlink, 
    realpath, 
    unlink, 
    rmdir, 
    mkdir, 
    mkdirp, 
    readdir, 
    close, 
    open, 
    utimes, 
    futimes, 
    fsync, 
    write, 
    read, 
    readFile, 
    writeFile, 
    appendFile, 
    exists, 
    access, 
    fdatasync, 
    mkdtemp, 
    copyFile, 
    watchFile, 
    unwatchFile, 
    watch, 
    StatWatcher, 
    FSWatcher, 
    WriteStream, 
    ReadStream, 
    promises, 
    _toUnixTimestamp, 
} = fs;
export {
    F_OK, 
    R_OK, 
    W_OK, 
    X_OK, 
    constants, 
    Stats, 
    Dirent, 
    renameSync, 
    ftruncateSync, 
    truncateSync, 
    chownSync, 
    fchownSync, 
    lchownSync, 
    chmodSync, 
    fchmodSync, 
    lchmodSync, 
    statSync, 
    lstatSync, 
    fstatSync, 
    linkSync, 
    symlinkSync, 
    readlinkSync, 
    realpathSync, 
    unlinkSync, 
    rmdirSync, 
    mkdirSync, 
    mkdirpSync, 
    readdirSync, 
    closeSync, 
    openSync, 
    utimesSync, 
    futimesSync, 
    fsyncSync, 
    writeSync, 
    readSync, 
    readFileSync, 
    writeFileSync, 
    appendFileSync, 
    existsSync, 
    accessSync, 
    fdatasyncSync, 
    mkdtempSync, 
    copyFileSync, 
    createReadStream, 
    createWriteStream, 
    rename, 
    ftruncate, 
    truncate, 
    chown, 
    fchown, 
    lchown, 
    chmod, 
    fchmod, 
    lchmod, 
    stat, 
    lstat, 
    fstat, 
    link, 
    symlink, 
    readlink, 
    realpath, 
    unlink, 
    rmdir, 
    mkdir, 
    mkdirp, 
    readdir, 
    close, 
    open, 
    utimes, 
    futimes, 
    fsync, 
    write, 
    read, 
    readFile, 
    writeFile, 
    appendFile, 
    exists, 
    access, 
    fdatasync, 
    mkdtemp, 
    copyFile, 
    watchFile, 
    unwatchFile, 
    watch, 
    StatWatcher, 
    FSWatcher, 
    WriteStream, 
    ReadStream, 
    promises, 
    _toUnixTimestamp,
}
export default exports