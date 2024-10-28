import esbuild from "../bundles/esbuild.js"
import uint8ArrayForEsbuildWasm from "../bundles/esbuild.wasm.binaryified.js"
import { Go } from "./go_wasm.js"

const module = (await WebAssembly.instantiate(uint8ArrayForEsbuildWasm, new Go().importObject)).module
await esbuild.initialize({
    wasmModule: module,
    worker: false,
})
export default esbuild