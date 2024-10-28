import esbuild from "../bundles/esbuild.js"
import uint8ArrayForEsbuildWasm from "../bundles/esbuild.wasm.binaryified.js"
import { Go } from "./go_wasm.js"

const module = (await WebAssembly.instantiate(uint8ArrayForEsbuildWasm, new Go().importObject)).module
export default await esbuild.initialize({
//   wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
    wasmModule: module,
    worker: false,
})