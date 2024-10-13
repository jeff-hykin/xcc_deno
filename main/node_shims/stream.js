import * as browser from "./helpers/stream-browserify.js"
import browserDefault from "https://esm.sh/path-browserify@1.0.1"

let exported = browser
let exportedDefault = browserDefault
if (globalThis.Deno || globalThis.process) {
     exported = await import("node:stream")
    exportedDefault = exported.default
}

var {
    Duplex,
    Stream,
    _isUint8Array,
    PassThrough,
    Transform,
    _uint8ArrayToBuffer,
    finished,
    Readable,
    Writable,
    addAbortSignal,
    pipeline,
} = exported

export {
    Duplex,
    Stream,
    _isUint8Array,
    PassThrough,
    Transform,
    _uint8ArrayToBuffer,
    finished,
    Readable,
    Writable,
    addAbortSignal,
    pipeline,
}

export default exportedDefault