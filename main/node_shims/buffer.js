import * as browser from "./helpers/buffer_es6@4_9_3.js"

let exported = browser
if (globalThis.Deno || globalThis.process) {
     exported = await import("node:buffer")
}

var {
    INSPECT_MAX_BYTES,
    isBuffer,
    Blob,
    SlowBuffer,
    btoa,
    isUtf8,
    kStringMaxLength,
    Buffer,
    atob,
    constants,
    isAscii,
    kMaxLength,
} = exported

export {
    INSPECT_MAX_BYTES,
    isBuffer,
    Blob,
    SlowBuffer,
    btoa,
    isUtf8,
    kStringMaxLength,
    Buffer,
    atob,
    constants,
    isAscii,
    kMaxLength,
}

export default exported

