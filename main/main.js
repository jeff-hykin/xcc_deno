import { DisWasm, wasmToWast } from "./diswasm.ts"
import { Compiler } from "./compiler.js"
import { version } from "./version.js"
import { loadWasm } from "./wasm_loader.js"

export async function quickC(maybeStrings, ...args) {
    // 
    // template support
    // 
    let asStringArg
    const isTemplateCallProbably = maybeStrings instanceof Array && maybeStrings.length-1 == args.length
    if (isTemplateCallProbably) {
        const chunks = []
        let index = -1
        for (const each of args) {
            index++
            chunks.push(maybeStrings[index])
            // here's where to handle custom logic on interpolated args
            //each
            chunks.push(each)
        }
        chunks.push(maybeStrings[index+1])
        asStringArg = chunks.join("")
    }
    if (asStringArg) {
        args = []
        // TODO: add caching
        // import { generateKeys, encrypt, decrypt, hashers } from "https://deno.land/x/good@1.9.1.1/encryption.js"
        // // basic caching
        // if (globalThis.localStorage) {
        //     const key = await hashers.sha256(asStringArg)
        //     const cached = globalThis.localStorage.getItem(`xcc:${version}:${key}`)
        //     
        // }
    } else {
        asStringArg = maybeStrings
    }
    
    // 
    // actual function
    // 
    const sourceCode = asStringArg
    const { imports, verbose, initalMemorySize } = args[0]||{}
    if (verbose) {
        console.log(`[quickC] loading compiler`)
    }
    var wccRunner = await Compiler()
    if (verbose) {
        console.log(`[quickC] sending source code to compiler`)
    }
    
    // TODO: probably should make these temp
    const sourcePath = "main.c"
    const outputPath = "main.wasm"
    await wccRunner.writeFile(sourcePath, sourceCode)
    const compileArgs = [
        "--entry-point=",
         "-o", outputPath,
         "--import-module-name=env",
         (verbose ? "--verbose" : [])  
    ].flat(Infinity)
    
    // 
    // get exportable names
    // 
        if (verbose) {
            console.log(`[quickC] discovering exportable names`)
        }
        // -c allows us to get names even when no main function is present
        var { exitCode, out, stdout, stderr } = await wccRunner.compile(sourcePath, [ "--list-exportable-names", "-c", ...compileArgs.filter(each=>each!="--verbose") ])
        const exportableNames = []
        for (const each of out.matchAll(/@exportable:(.*)/g)) {
            exportableNames.push(each[1])
        }
        if (exitCode !== 0) {
            throw new Error(`Compile failed:\n${out}\nexit code: ${exitCode}`)
        }
    
    // 
    // actual compilation
    // 
        if (verbose) {
            console.log(`[quickC] compiling`)
        }
        var { exitCode, out, stdout, stderr } = await wccRunner.compile(sourcePath, [...compileArgs, ...exportableNames.map(each=>["-e", each])].flat(Infinity))
        if (exitCode !== 0) {
            throw new Error(`Compile failed:\n${out}\nexit code: ${exitCode}`)
        }
    
    const compiledCode = await wccRunner.readFile(outputPath)
    if (verbose) {
        console.log(`[quickC] loading wasm module`)
    }
    const output = {
        ...await loadWasm({
            wasmBuffer: compiledCode.buffer,
            imports,
            initalMemorySize: initalMemorySize || 65536
        }),
        wasmBytes: compiledCode,
        get wasmReadable() {
            return wasmToWast(compiledCode.buffer)
        }
    }
    if (verbose) {
        console.log(`[quickC] terminating worker`)
    }
    await wccRunner.terminate()
    if (verbose) {
        console.log(`[quickC] done`)
    }
    return output
}

export { DisWasm, Compiler, wasmToWast, loadWasm, version }