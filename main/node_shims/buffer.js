import { config } from "./_config.js"
import * as browser from "./helpers/buffer.js"

let exported = browser
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
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

