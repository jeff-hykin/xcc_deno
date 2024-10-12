import crypto from "node:crypto"
import fs from "node:fs"
import { isatty as isTTY } from "node:tty"
import path from "node:path"
import hrtime_bigint from "../polyfills/hrtime.bigint.js"

let bigIntHrtime = hrtime_bigint(process.hrtime);
if (process.hrtime && process.hrtime.bigint) {
    bigIntHrtime = process.hrtime.bigint;
}
const bindings = {
    hrtime: bigIntHrtime,
    exit: (code) => {
        process.exit(code);
    },
    kill: (signal) => {
        process.kill(process.pid, signal);
    },
    randomFillSync: crypto.randomFillSync,
    isTTY: isTTY,
    fs: fs,
    path: path
};

export default bindings