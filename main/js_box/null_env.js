// import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toRepresentation, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.13.0.1/string.js"
// import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorObject,isAsyncIterable, isSyncIterable, isIterableTechnically, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.13.0.1/value.js"
// import { iter, next, Stop, Iterable, map, filter, reduce, frequencyCount, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkBy } from "https://deno.land/x/good@1.13.0.1/iterable.js"
import { RandomSource } from "./deterministic_tooling/random_seed.js"
import { createTimingTools } from "./deterministic_tooling/timing_tools.js"
import { TypedArray } from "https://deno.land/x/good@1.13.0.1/flattened/typed_array__class.js"
import { recursivelyOwnKeysOf } from "https://deno.land/x/good@1.13.0.1/flattened/recursively_own_keys_of.js"
import { set } from "https://deno.land/x/good@1.13.0.1/flattened/set.js"
import { get } from "https://deno.land/x/good@1.13.0.1/flattened/get.js"
import { setSubtract as subtract } from "https://deno.land/x/good@1.13.0.1/flattened/set_subtract.js"
import { toRepresentation } from "https://deno.land/x/good@1.13.0.1/flattened/to_representation.js"

// Overview:
    // 1. Start with Object, Function, Array, Number, String, Boolean, Symbol, Error, Promise
    // 2. whitelist their methods
        // if name not in descriptor list, delete it
            // catch if unable to delete (could switch to a proxy, would need to check how equality works with that)
        // otherwise get descriptors
            // if descriptors mismatch
            // check if it can be redefined
            // if so delete it


import whitelist from "./whitelist_small.js"
import { nameMap, globalThisBaseDescriptors } from "./whitelist_small.js"
import { fail } from "../node_shims/assert.js"
import { ensureDescriptorAgreement } from "./deterministic_tooling/ensure_descriptor_agreement.js"

// TODO:
    // must set the prototype of globalThis to a plain object because its not consistent between runtimes
    // set Error.stackTraceLimit to Infinity 

export function enforceNullEnv() {
    const warnings = []
    if (!globalThis) {
        throw new Error("catestrophic error: the spec requires globalThis, but globalThis is not defined")
    }

    const functionsToConsiderNative = new Map()
    const markAsNative = (funcName, func)=>(functionsToConsiderNative.set(func, funcName),func)
    const markAllMethodsNative = (name, classFunc)=>(markAsNative(name,classFunc),Reflect.ownKeys(classFunc.prototype).map(
        // TODO: might need to make this handle symbols
        eachKey=>(typeof eachKey == 'string'&&typeof classFunc.prototype[eachKey] == 'function')&&markAsNative(eachKey, classFunc.prototype[eachKey])
    ))

    // obj will be values such as [ Object, Function, Array, Number, String, Boolean, Symbol, Error, Promise ]
    for (const [obj, desiredDescriptors] of whitelist.entries()) {
        console.debug(`obj is:`,obj)
        console.debug(`desiredDescriptors is:`,desiredDescriptors)
        const name = nameMap.get(obj)
        console.debug(`nameMap[obj] is:`,name)
        const currentDescriptors = Object.getOwnPropertyDescriptors(obj)
        warnings.push(
            ...ensureDescriptorAgreement({ desiredDescriptors, name, object: obj, markAsNative })
        )
    }
    
    // 
    // monkeypatching
    // 
        // 
        // setup
        // 
            const numberGenerator = new RandomSource(5)
            const { globals: timingTools } = createTimingTools({ startTime: 0, setTimeoutIncrement: 0.1, performanceIncrement: 0.1, dateIncrement: 10, fetchIncrement: 10, })

            for (const each of whitelist.keys()) {
                if (typeof each == 'function' && typeof each.name == 'string' && each.name.length > 0) { // YES: the .length check is necessary (sadly)
                    markAsNative(each.name, each)
                }
            }
            Object.entries(timingTools).map(([key, value])=>(markAsNative(key, value)))
            markAllMethodsNative("Date", timingTools.Date)
            markAllMethodsNative("Performance", timingTools.Performance)
            markAllMethodsNative("PerformanceMark", timingTools.PerformanceMark)
        
            const realFuncToString      = Function.prototype.toString
            const realToLocaleString    = Object.prototype.toLocaleString
            const realToLocaleLowerCase = String.prototype.toLocaleLowerCase
            const realToLocaleUpperCase = String.prototype.toLocaleUpperCase
            const realLocaleCompare     = String.prototype.localeCompare
            const localCompareDefaults  = { usage: "sort", localeMatcher: "best fit", collation: "default", sensitivity: "base", ignorePunctuation: true, numeric: false, caseFirst: false, }
        
        // 
        // patching
        // 
            Function.prototype.toString = markAsNative("toString", function(...args) {
                if (functionsToConsiderNative.has(this)) {
                    return `function ${functionsToConsiderNative.get(this)}() { [native code] }`
                }
                return realFuncToString.apply(this, args)
            })
            Object.prototype.toLocaleString = markAsNative("toLocaleString", function(...args) {
                return args.length === 0 ? this.toString() : realToLocaleString.apply(this, args)
            })
            String.prototype.toLocaleLowerCase = markAsNative("toLocaleLowerCase", function(...args) {
                return args.length === 0 ? this.toLowerCase() : realToLocaleLowerCase.apply(this, args)
            })
            String.prototype.toLocaleUpperCase = markAsNative("toLocaleUpperCase", function(...args) {
                return args.length === 0 ? this.toUpperCase() : realToLocaleUpperCase.apply(this, args)
            })
            String.prototype.localeCompare = markAsNative("localeCompare", function(other, locale="en", options={}) {
                options = { ...localCompareDefaults, ...options }
                return realLocaleCompare.apply(this, [other, locale, options])
            })
            Math.random = markAsNative("random", ()=>numberGenerator.next())
            Object.assign(globalThis, timingTools)
            Error.stackTraceLimit = Infinity
            
        // TODO:
            // patch Object.getOwnPropertyDescriptors and Object.keys so that the results always appear in the same order for all built-in objects
        
    // 
    // globalThis patching
    // 
        const proto = {}
        Object.setPrototypeOf(globalThis, proto)
        warnings.push(
            ...ensureDescriptorAgreement({
                object: globalThis,
                desiredDescriptors: {
                    ...globalThisBaseDescriptors,
                    ...Object.getOwnPropertyDescriptors(timingTools),
                    "globalThis": {
                        value: globalThis,
                        writable: true,
                        enumerable: false,
                        configurable: true,
                    },
                    "structuredClone": {
                        value: markAsNative("structuredClone", structuredClone),
                        writable: true,
                        enumerable: false,
                        configurable: true,
                    },
                    "atob": {
                        value: markAsNative("atob", atob),
                        writable: true,
                        enumerable: false,
                        configurable: true,
                    },
                    "btoa": {
                        value: markAsNative("btoa", btoa),
                        writable: true,
                        enumerable: false,
                        configurable: true,
                    },
                }, 
                name,
                markAsNative,
            })
        )
    
    return warnings
}