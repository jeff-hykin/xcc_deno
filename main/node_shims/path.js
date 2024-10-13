import * as browser from "https://esm.sh/path-browserify@1.0.1"
import browserDefault from "https://esm.sh/path-browserify@1.0.1"

let exported = browser
let exportedDefault = browserDefault
if (globalThis.Deno || globalThis.process) {
     exported = await import("node:path")
     exportedDefault = exported.default
}

var {
    _makeLong,
    basename,
    common,
    delimiter,
    dirname,
    extname,
    format,
    isAbsolute,
    join,
    normalize,
    parse,
    posix,
    relative,
    resolve,
    sep,
    toNamespacedPath,
    win32,
} = exported

export {
    _makeLong,
    basename,
    common,
    delimiter,
    dirname,
    extname,
    format,
    isAbsolute,
    join,
    normalize,
    parse,
    posix,
    relative,
    resolve,
    sep,
    toNamespacedPath,
    win32,
}

export default exportedDefault