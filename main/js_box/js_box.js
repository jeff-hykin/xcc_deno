import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toRepresentation, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.10.0.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorObject,isAsyncIterable, isSyncIterable, isIterableTechnically, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.10.0.0/value.js"
import { iter, next, Stop, Iterable, map, filter, reduce, frequencyCount, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkBy } from "https://deno.land/x/good@1.10.0.0/iterable.js"
import { RandomSource } from "./deterministic_tooling/random_seed.js"
import { createTimingTools } from "./deterministic_tooling/timing_tools.js"
import { TypedArray } from "https://deno.land/x/good@1.13.0.1/flattened/typed_array__class.js"
import { recursivelyOwnKeysOf } from "https://deno.land/x/good@1.10.0.0/flattened/recursively_own_keys_of.js"
import { set } from "https://deno.land/x/good@1.10.0.0/flattened/set.js"
import { get } from "https://deno.land/x/good@1.10.0.0/flattened/get.js"

import { workerEval } from "./worker_eval.js"

// overall goal:
    // try to build make (a wasmer output, MacOS-arm, x86 linux, etc) in a deterministic env
    // which will probably need bash to be loaded with wasmer in a deterministic env
    // which will need WebAssembly, and probably fetch, and several other API's to be available

    // smaller goals. Get these working in the deterministic env:
        // esbuild
        // wasmer
        // bash (wasmer)
        // python (wasmer)
        // ruby

// overview TODO:
    // 1. add bundling step to workerEval, and somehow make it deterministic (might need to fake )
    // 2. design a record mode for fetch
        // some way to dump and reload
    // 3. get the bundler working
        // see if it patches import.meta
        // find a way to make bundle use the fake fs (e.g. more advanced import map)
        // later: see if there's a way to control dynamic imports
    // 4. create a world object (seed, startTime, localCompareOptions, etc)
    // 5. allow for custom injections and world combinations (ex: sharing/inheriting a fake fs)

// misc large todos:
    // Date locale patching
    // streaming-fetch patching
    // clean up worker data transfer
    // later:
        // wasm
        // isomorphic git connected to world fs
        // bash converter
import nullEnvBytes from "./null_env.bundle.js.binaryified.js"

function makeImport(codeString) {
    function replaceNonAsciiWithUnicode(str) {
        return str.replace(/[^\0-~](?<!\n|\r|\t|\0)/g, (char) => {
            return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
        })
    }

    return `import "data:text/javascript;base64,${btoa(replaceNonAsciiWithUnicode(codeString))}"`
}
const nullEnvCode = new TextEncoder().encode(nullEnvBytes)
const importString = makeImport(nullEnvCode+'\nenforceNullEnv()')
export function deterministicEval(code, {mode="reproduce", world}) {
    // todo: run code though bundler
   return workerEval({timeout:Infinity, untrustedCode:`10`})
}