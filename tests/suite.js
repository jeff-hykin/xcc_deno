import * as xcc from '../main/main.js'
import { FileSystem, glob } from "https://deno.land/x/quickr@0.6.72/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo, } from "https://deno.land/x/quickr@0.6.72/main/run.js"
import { Console, clearAnsiStylesFrom, black, white, red, green, blue, yellow, cyan, magenta, lightBlack, lightWhite, lightRed, lightGreen, lightBlue, lightYellow, lightMagenta, lightCyan, blackBackground, whiteBackground, redBackground, greenBackground, blueBackground, yellowBackground, magentaBackground, cyanBackground, lightBlackBackground, lightRedBackground, lightGreenBackground, lightYellowBackground, lightBlueBackground, lightMagentaBackground, lightCyanBackground, lightWhiteBackground, bold, reset, dim, italic, underline, inverse, strikethrough, gray, grey, lightGray, lightGrey, grayBackground, greyBackground, lightGrayBackground, lightGreyBackground, } from "https://deno.land/x/quickr@0.6.72/main/console.js"
import DateTime from "https://deno.land/x/good@1.9.1.1/date.js"
import { zip, enumerate, count, permute, combinations, wrapAroundGet } from "https://deno.land/x/good@1.9.1.1/array.js"
import { intersection, subtract } from "https://deno.land/x/good@1.9.1.1/set.js"
import { stats, sum, spread, normalizeZeroToOne, roundedUpToNearest, roundedDownToNearest } from "https://deno.land/x/good@1.9.1.1/math.js"
import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase,  toScreamingKebabCase, toScreamingSnakeCase, toRepresentation, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix } from "https://deno.land/x/good@1.9.1.1/string.js"

const testPaths = new Set()
for (const path of (await FileSystem.listFilePathsIn("../test_support/c_testsuite")).sort()) {
    if (path.endsWith(".c")) {
        testPaths.add(path.replace(".c", ""))
    }
}

var wccRunner = await xcc.Compiler()
let totalTests = testPaths.size
let counts = { compileFailed: 0, runFailed: 0, outputFailed: 0, passed: 0, }
let number = 0
for (const each of testPaths) {
    number++
    console.log(`- ${FileSystem.basename(each)}.c`)
    const [sourceCode, expectedOutput] = await Promise.all([
        FileSystem.read(each + ".c"),
        FileSystem.read(each + ".c.expected"),
    ])
    
    if (sourceCode==null || expectedOutput==null) {
        console.log(`        Could not read source code and/or expected output`)
        continue
    }
    
    const sourceName = "main.c"
    const compiledPath = "a.wasm"
    await wccRunner.writeFile(sourceName, sourceCode)

    var {exitCode, out} = await wccRunner.compile(sourceName, [])
    if (exitCode !== 0) {
        counts.compileFailed++
        console.log(`        Compile failed: ${exitCode}, output:\n${indent({ string: out, by: "            "})}`)
        continue
    }
    
    var compiledCode = await wccRunner.readFile(compiledPath)
    var { exitCode, out } = await wccRunner.runWasi(compiledPath, [ compiledPath,])
    if (exitCode !== 0) {
        counts.runFailed++
        console.log(`        Run failed: ${runExitCode}, output:\n${indent({ string: out, by: "            "})}`)
        continue
    }
    if (out != expectedOutput) {
        counts.outputFailed++
        console.log(`        Expected output:\n${indent({ string: expectedOutput, by: "            "})}`)
        console.log(`        Actual output:\n${indent({ string: out, by: "            "})}`)
        continue
    }
    counts.passed++
    console.log(`    passed`)
}
console.log(`    (total passed ${counts.passed} of ${totalTests})`)
await wccRunner.clearTemporaries()
await wccRunner.terminate()
console.log(`done`)