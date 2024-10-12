// "https://cdn.jsdelivr.net/npm/@wasmer/wasi@0.12.0/lib/bindings/browser.js"
import path from "https://esm.sh/path-browserify@1.0.1"
import randomfill from "https://esm.sh/randomfill@1.0.4"
import browser_hrtime from "../polyfills/browser-hrtime.js"
import hrtime_bigint from "../polyfills/hrtime.bigint.js"
import { WASIError, WASIExitError, WASIKillError } from "./errors.js" 

const bindings = {
    hrtime: hrtime_bigint.default(browser_hrtime.default),
    exit: (code) => {
        throw new WASIExitError(code);
    },
    kill: (signal) => {
        throw new WASIKillError(signal);
    },
    randomFillSync: randomfill.randomFillSync,
    isTTY: () => true,
    path: path,
    // Let the user attach the fs at runtime
    fs: null
}
export default bindings