import * as xcc from '../main/main.js'
import { WccRunner, DisWasm } from '../main/main.js'

export async function compileAndOrRun({args, sourceCode, compileAndDump=true}) {
    var wccRunner = new WccRunner()
    wccRunner.setConsoleOutFunction((text, _isError) => console.log(`[wccRunner.setConsoleOutFunction] error?: ${_isError}, text: ${text}`))
    await wccRunner.setUp()
    
    const sourceName = "main.c"
    const objFn = "main.o"
    const compiledPath = "a.wasm"
    const extraOptions = compileAndDump ? ["-c", "-o", objFn, "--import-module-name=env"] : undefined
    await wccRunner.writeFile(sourceName, sourceCode)

    const exitCode = await wccRunner.compile(sourceName, extraOptions)
    if (exitCode !== 0) {
        throw new Error(`Compile failed: ${exitCode}`)
    }

    if (compileAndDump) {
        const compiledCode = await wccRunner.readFile(objFn)
        const disWasm = new DisWasm(compiledCode.buffer)
        let compiledWasm = ""
        disWasm.setLogFunc((code)=>compiledWasm+=(code+"\n"))
        // disWasm.setLogFunc((s) => Util.putTerminal(`${s}\n`))
        disWasm.dump()
        return compiledWasm
    }

    // Run
    args = ["a.wasm", ...args]
    const runExitCode = await wccRunner.runWasi(compiledPath, args)
    if (runExitCode !== 0) {
        throw new Error(`Run failed: ${runExitCode}`)
    }
    await wccRunner.clearTemporaries()
}

const EXAMPLE_CODE = `
#include <stdio.h>

int fib(int n) {
    if (n < 2)
        return n;
    else
        return fib(n - 1) + fib(n - 2);
}

int main() {
    printf("%d\\n", fib(30));
    return 0;
}
`

Deno.exit()
console.log(await compileAndOrRun({args: [], sourceCode: EXAMPLE_CODE}))