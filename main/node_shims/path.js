import browserPath from "https://esm.sh/path-browserify@1.0.1"

let exportedPath = browserPath
if (globalThis.Deno || globalThis.process) {
     exportedPath = await import("node:path")
}

var {
    resolve,
    normalize,
    isAbsolute,
    join,
    relative,
    _makeLong,
    dirname,
    basename,
    extname,
    format,
    parse,
    sep,
    delimiter,
    win32,
    posix,
    basename
    toNamespacedPath,
    common,
} = exportedPath

export {
    resolve,
    normalize,
    isAbsolute,
    join,
    relative,
    _makeLong,
    dirname,
    basename,
    extname,
    format,
    parse,
    sep,
    delimiter,
    win32,
    posix,
    basename
    toNamespacedPath,
    common,
}

export default exportedPath