// 
// 
// 
import { WASI } from "./wasi/index.js"
import { WasmFs } from "./wasmfs/index.ts"
import path from "./node_shims/path.js"
const wasmFs = new WasmFs()
const wasi = new WASI({
    args: [],
    bindings: {
        ...WASI.defaultBindings,
        fs: wasmFs.fs,
        path,
    },
    preopens: {
        "/": "/",
        ".": "/",
    },
})
const defaultImports = {
    wasi_snapshot_preview1: wasi.wasiImport,
}

export function loadWasm({wasmBuffer, imports, initalMemorySize=65536}) {
    const localImports = {
        ...defaultImports,
        ...imports,
        env: {
            ...defaultImports.env,
            __linear_memory: new WebAssembly.Memory({ initial: initalMemorySize /*65536 is max size*/ }),
            __stack_pointer: new WebAssembly.Global({ value: "i32", mutable: true }, 0),
            ...imports?.env,
        },
    }
    return WebAssembly.instantiate(wasmBuffer, localImports).then(wasmModule=>wasmModule.instance.exports)
}