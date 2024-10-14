import * as xcc from '../main/main.js'
// import * as xcc from '../main/main.bundle.js'
// import { WccRunner, DisWasm } from '../main/main.js'

import { WASI } from "../main/wasi/index.js"
import { WasmFs } from "../main/wasmfs/index.ts"
import path from "../main/node_shims/path.js"

// 
// setup imports
// 
    var wasmFs = new WasmFs()
    var wasi = new WASI({
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
    var imports = {
        wasi_snapshot_preview1: wasi.wasiImport,
    }

async function compileAndOrRun({sourceCode}) {
    var wccRunner = await xcc.Compiler()
    
    const sourceName = "main.c"
    const objFn = "main.wasm"
    const compiledPath = "a.wasm"
    const extraOptions =  ["-e", "fib", "-c", "-o", objFn, "--import-module-name=env", ]
    await wccRunner.writeFile(sourceName, sourceCode)

    const exitCode = await wccRunner.compile(sourceName, [ "--verbose", "-e", "fib", "-o", objFn, "--import-module-name=env", ])
    if (exitCode !== 0) {
        throw new Error(`Compile failed: ${exitCode}`)
    }

    const compiledCode = await wccRunner.readFile(objFn)
    console.debug(`compiledCode.buffer is:`,compiledCode.buffer)
    const disWasm = new xcc.DisWasm(compiledCode.buffer)
    let compiledWasm = ""
    disWasm.setLogFunc((code)=>compiledWasm+=(code+"\n"))
    // disWasm.setLogFunc((s) => Util.putTerminal(`${s}\n`))
    disWasm.dump()
    console.debug(`compiledWasm is:`,compiledWasm)
    const localImports = {
        ...imports,
        env: {
            ...imports.env,
            __linear_memory: new WebAssembly.Memory({ initial: 65536 /*65536 is max size*/ }),
            __stack_pointer: new WebAssembly.Global({ value: "i32", mutable: true }, 0),
        },
    }
    console.log(`localImports is:`,localImports)

    var wasmModule = await WebAssembly.instantiate(compiledCode.buffer, localImports)
    console.debug(`wasmModule is:`,wasmModule)
    console.debug(`wasmModule.module is:`,wasmModule.module)
    console.debug(`wasmModule.instance is:`,wasmModule.instance)
    console.debug(`wasmModule.instance.exports is:`,wasmModule.instance.exports)
    console.debug(`wasmModule.instance.exports.fib is:`,wasmModule.instance.exports.fib)
    console.debug(`wasmModule.instance.exports.fib(10) is:`,wasmModule.instance.exports.fib(10))
    return wasmModule
}

const EXAMPLE_CODE = `
int fib(int n) {
    if (n < 2)
        return n;
    else
        return fib(n - 1) + fib(n - 2);
}
int main() {
    return 0;
}
`

try {
    console.log(await compileAndOrRun({sourceCode: EXAMPLE_CODE}))
} catch (error) {
    console.error(error)
    console.error(error.stack)
    Deno.exit(1)
}
Deno.exit()