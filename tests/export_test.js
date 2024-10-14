import * as xcc from '../main/main.js'
// import * as xcc from '../main/main.bundle.js'
// import { WccRunner, DisWasm } from '../main/main.js'

// 
// setup imports
// 
async function compileAndOrRun({sourceCode, exportNames, imports}) {
    var wccRunner = await xcc.Compiler()
    
    const sourceName = "main.c"
    const objFn = "main.wasm"
    const compiledPath = "a.wasm"
    const compileArgs =  [ "--verbose", ...exportNames.map(each=>["-e", each]).toReversed(), "-o", objFn, "--import-module-name=env", ].flat(Infinity)
    await wccRunner.writeFile(sourceName, sourceCode)

    const exitCode = await wccRunner.compile(sourceName, compileArgs)
    if (exitCode !== 0) {
        throw new Error(`Compile failed: ${exitCode}`)
    }

    const compiledCode = await wccRunner.readFile(objFn)
    console.debug(`compiledWasm is:`, xcc.wasmToWast(compiledCode.buffer))
    let exports = await xcc.loadWasm({wasmBuffer: compiledCode.buffer, imports, initalMemorySize: 65536})
    console.debug(`exports.fib is:`,exports.fib)
    console.debug(`exports.fib(20) is:`,exports.fib(20))
    console.debug(`exports.fib2(20) is:`,exports.fib2(20))
    return exports
}

const EXAMPLE_CODE = `
int fib(int n) {
    if (n < 2)
        return n;
    else
        return fib(n - 1) + fib(n - 2);
}
int fib2(int n) {
    if (n <= 1)
        return n;
    else
        return fib(n - 1) + fib(n - 2);
}
int main() {
    return 0;
}
`

try {
    console.log(await compileAndOrRun({sourceCode: EXAMPLE_CODE, exportNames: ["fib", "fib2"]}))
} catch (error) {
    console.error(error)
    console.error(error.stack)
    Deno.exit(1)
}
Deno.exit()