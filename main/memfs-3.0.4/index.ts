import Stats from "./Stats.ts";
import Dirent from "./Dirent.ts";
import { Volume as _Volume, StatWatcher, FSWatcher, toUnixTimestamp, IReadStream, IWriteStream } from "./volume.ts";
import { IPromisesAPI } from "./promises.ts";
import * as workaround from "./constants.ts";

// from "../fs-monkey/lib/util/lists.js";
export const fsSyncMethods = ['renameSync', 'ftruncateSync', 'truncateSync', 'chownSync', 'fchownSync', 'lchownSync', 'chmodSync', 'fchmodSync', 'lchmodSync', 'statSync', 'lstatSync', 'fstatSync', 'linkSync', 'symlinkSync', 'readlinkSync', 'realpathSync', 'unlinkSync', 'rmdirSync', 'mkdirSync', 'mkdirpSync', 'readdirSync', 'closeSync', 'openSync', 'utimesSync', 'futimesSync', 'fsyncSync', 'writeSync', 'readSync', 'readFileSync', 'writeFileSync', 'appendFileSync', 'existsSync', 'accessSync', 'fdatasyncSync', 'mkdtempSync', 'copyFileSync', 'rmSync', 'createReadStream', 'createWriteStream']
export const fsAsyncMethods = ['rename', 'ftruncate', 'truncate', 'chown', 'fchown', 'lchown', 'chmod', 'fchmod', 'lchmod', 'stat', 'lstat', 'fstat', 'link', 'symlink', 'readlink', 'realpath', 'unlink', 'rmdir', 'mkdir', 'mkdirp', 'readdir', 'close', 'open', 'utimes', 'futimes', 'fsync', 'write', 'read', 'readFile', 'writeFile', 'appendFile', 'exists', 'access', 'fdatasync', 'mkdtemp', 'copyFile', 'rm', 'watchFile', 'unwatchFile', 'watch']

// import { constants } from "./constants.ts";
const constants = workaround.constants;
const { F_OK, R_OK, W_OK, X_OK } = constants;

export const Volume = _Volume;

// Default volume.
export const vol = new _Volume();

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

export const fs: IFs = createFsFromVolume(vol);

export {
    Stats, 
    Dirent,
}
export const { // this is all the stuff from Object.assign(exports, fs)
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