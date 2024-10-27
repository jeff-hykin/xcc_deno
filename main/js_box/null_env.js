import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toRepresentation, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.11.0.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorObject,isAsyncIterable, isSyncIterable, isIterableTechnically, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.11.0.0/value.js"
import { iter, next, Stop, Iterable, map, filter, reduce, frequencyCount, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkBy } from "https://deno.land/x/good@1.11.0.0/iterable.js"
import { RandomSource } from "./deterministic_tooling/random_seed.js"
import { createTimingTools } from "./deterministic_tooling/timing_tools.js"
import { TypedArray } from "https://deno.land/x/good@1.11.0.0/flattened/typed_array__class.js"
import { recursivelyOwnKeysOf } from "https://deno.land/x/good@1.11.0.0/flattened/recursively_own_keys_of.js"
import { set } from "https://deno.land/x/good@1.11.0.0/flattened/set.js"
import { get } from "https://deno.land/x/good@1.11.0.0/flattened/get.js"
import { subtract } from "https://deno.land/x/good@1.11.0.0/flattened/subtract.js"

// Overview:
    // 1. Start with Object, Function, Array, Number, String, Boolean, Symbol, Error, Promise
    // 2. whitelist their methods
        // if name not in descriptor list, delete it
            // catch if unable to delete (could switch to a proxy, would need to check how equality works with that)
        // otherwise get descriptors
            // if descriptors mismatch
            // check if it can be redefined
            // if so delete it


import {nameMap} from "./whitelist_small.js"
import whitelist from "./whitelist_small.js"
import { fail } from "../node_shims/assert.js"
import { ensureDescriptorAgreement } from "./deterministic_tooling/ensure_descriptor_agreement.js"

// TODO:
    // must set the prototype of globalThis to a plain object because its not consistent between runtimes

function enforceNullEnv() {
    if (!globalThis) {
        throw new Error("catestrophic error: the spec requires globalThis, but globalThis is not defined")
    }

    const functionsToConsiderNative = new Map()
    const markAsNative = (funcName, func)=>(functionsToConsiderNative.set(func, funcName),func)
    
    // obj will be values such as [ Object, Function, Array, Number, String, Boolean, Symbol, Error, Promise ]
    for (const [obj, desiredDescriptors] of whitelist.entries()) {
        const name = nameMap[obj]
        const currentDescriptors = Object.getOwnPropertyDescriptors(obj)
        const warnings = ensureDescriptorAgreement({ desiredDescriptors, name, object: obj, markAsNative })
    }
    
    // 
    // monkeypatching
    // 
        // TODO:

    // 
    // globalThis patching
    // 
        const proto = {}
        Object.setPrototypeOf(globalThis, proto)

        for (const each of globalThis) {
            
        }

}