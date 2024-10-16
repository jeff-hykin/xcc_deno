import * as xcc from '../main/main.js'
// import * as xcc from '../main/main.bundle.js'
// import { WccRunner, DisWasm } from '../main/main.js'

// 
// setup imports
// 
async function compileAndOrRun({sourceCode, imports, extraArgs=[ "--verbose", "--import-module-name=env" ]}) {
    var wccRunner = await xcc.Compiler()
    
    // TODO: make these temp
    const sourceName   = "main.c"
    const objFn        = "main.wasm"
    await wccRunner.writeFile(sourceName, sourceCode)
    const compileArgs =  [ "--entry-point=", "-o", objFn, ...extraArgs ].flat(Infinity)
    
    // 
    // get exportable names
    // 
        // -c allows us to get names even when no main function is present
        var { exitCode, out, stdout, stderr } = await wccRunner.compile(sourceName, [ "--list-exportable-names", "-c", ...compileArgs.filter(each=>each!="--verbose") ])
        console.debug(`out is:`,out)
        const exportableNames = []
        for (const each of out.matchAll(/@exportable:(.*)/g)) {
            exportableNames.push(each[1])
        }
        console.debug(`exportableNames is:`,exportableNames)
        if (exitCode !== 0) {
            throw new Error(`Compile failed:\n${out}\nexit code: ${exitCode}`)
        }
    
    // 
    // export everything
    // 
        var { exitCode, out, stdout, stderr } = await wccRunner.compile(sourceName, [...compileArgs, ...exportableNames.map(each=>["-e", each])].flat(Infinity))
        if (exitCode !== 0) {
            throw new Error(`Compile failed:\n${out}\nexit code: ${exitCode}`)
        }
    console.log(out)

    const compiledCode = await wccRunner.readFile(objFn)
    console.debug(`compiledCode is:`,compiledCode)
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
`

try {
    console.log(await compileAndOrRun({sourceCode: EXAMPLE_CODE}))
} catch (error) {
    console.error(error)
    console.error(error.stack)
    Deno.exit(1)
}
Deno.exit()