
"use strict";
// Return our buffer depending on browser or node
Object.defineProperty(exports, "__esModule", { value: true });
// import { Buffer } from "https://cdn.jsdelivr.net/npm/buffer-es6@4.9.3/index.js"
import { Buffer } from "../../buffer_es6@4_9_3.js"
/*ROLLUP_REPLACE_BROWSER
// @ts-ignore
import { Buffer } from "buffer-es6";
ROLLUP_REPLACE_BROWSER*/
const isomorphicBuffer = Buffer;
exports.default = isomorphicBuffer;

;export default exports