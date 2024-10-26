import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toRepresentation, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.10.0.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorObject,isAsyncIterable, isSyncIterable, isIterableTechnically, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.10.0.0/value.js"
import { iter, next, Stop, Iterable, map, filter, reduce, frequencyCount, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkBy } from "https://deno.land/x/good@1.10.0.0/iterable.js"
import { RandomSource } from "./deterministic_tooling/random_seed.js"
// Goal:
    // 1. Be able to run a subset of practial code deterministicly (engine-independent)
    // 2. Be able to fake major parts:
    //     a. Math.random
    //     b. Date
    //     c. fetch
    //     d. deno args
    //     e. process
    //     f. deno file system
    //     g. node file system

// impure things:
    // import.meta
    // import()
    // ;((async ()=>{})())
    // the methods of all the global objects

// TODO:
    // patch Function.prototype .toString to check setTimeout,setInterval,clearTimeout,clearInterval and return `function ${name}() { [native code] }`
        // NOTE: for some reason Deno doesn't have that same string output, it has actual code. And NodeJS does too (very different code)
    // run Object.getPrototypeOf on every value until it converges and we have a complete list of prototypes
    // then restrict methods on every object
    // NOTE: will need to generate some objects from function calls (Symbol, BigInt, etc)
    // don't forget window dispatchEvent as a macrotask
        // check on NodeJS's microTask limiter

const conservativeGlobals = [
    "structuredClone",
    "parseFloat",
    "Infinity",
    "NaN",
    "undefined",
    "ArrayBuffer",
    "Uint8Array",
    "Int8Array",
    "Uint16Array",
    "Int16Array",
    "Uint32Array",
    "Int32Array",
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "Uint8ClampedArray",
    "BigUint64Array",
    "BigInt64Array",
    "DataView",
    "Map",
    "BigInt",
    "Set",
    
    // basic functions
    "isFinite",
    "isNaN",
    "atob",
    "btoa",

    // url related (all of these exist in nodejs)
    "URL",
    "URLPattern",
    "URLSearchParams", 
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape",
    
    // helper classes
    "Blob",
    "TextDecoder",
    "TextEncoder",

    // "File",        // not defined in nodejs
    // "FileReader",  // not defined in nodejs

    // related to fetch (all are defined in nodejs)
    "Request",
    "Response",
    "Headers",

    // event
    "Event",                    // exist in nodejs
    "EventTarget",              // exist in nodejs
    "MessageEvent",             // exist in nodejs
    // "EventSource",              // do not exist in nodejs
    // "CustomEvent",              // do not exist in nodejs
    // "ErrorEvent",               // do not exist in nodejs
    // "CloseEvent",               // do not exist in nodejs
    // "PromiseRejectionEvent",    // do not exist in nodejs
    // "ProgressEvent",            // do not exist in nodejs

    // stream related (all exist in nodejs, deno, and firefox)
    "TextDecoderStream",
    "TextEncoderStream",
    "AbortController",
    "AbortSignal",
    "CompressionStream",
    "DecompressionStream",
    "ReadableStream",
    "ReadableStreamDefaultReader",
    "TransformStream",
    "WritableStream",
    "WritableStreamDefaultWriter",
    "WritableStreamDefaultController",
    "ReadableByteStreamController",
    "ReadableStreamBYOBReader",
    "ReadableStreamBYOBRequest",
    "ReadableStreamDefaultController",
    "TransformStreamDefaultController",
    "MessageChannel",
    "MessagePort",
    "ByteLengthQueuingStrategy",
    "CountQueuingStrategy",

    // misc
    "DOMException", // exists in nodejs
    // "Iterator", // Not defined in firefox or nodejs (supposed to be but isn't on globalThis)
    // "SharedArrayBuffer", // Not defined in firefox (supposed to be but isn't on globalThis)
    // "FormData", // exists in nodejs, maybe its related to fetch?

    // // image 
    // "ImageData", // does not exist in nodejs
    // "ImageBitmap", // does not exist in nodejs
    // "createImageBitmap", // probably don't actually support (doesn't seem to work in deno)
        
    // pure but needs justification
    "RegExp", // .lastMatch does not leak outside of the web worker
    "WebAssembly",
    // "Worker", // probably need to patch to enforce type: module
    // "name", // ensure its always an emtpy string at top level
    // "Atomics", // TODO: consider race conditions

    // basically no modification
    "Function",
    "Array",
    "Number",
    "parseInt",
    "Boolean",
    "Symbol",
    "JSON",
        
    // possible sandbox breakers
    "Proxy",
    "Reflect",
    "eval",
    
    // 
    // will get patched
    //
    "Object",
    "Math",
    "String",

    // 
    // possibly needs fixing
    // 
        // 
        // error related
        // 
            "Error", // stack traces might need patching
            "AggregateError", // all impure because of access to Error
            "EvalError",      // all impure because of access to Error
            "RangeError",     // all impure because of access to Error
            "ReferenceError", // all impure because of access to Error
            "SyntaxError",    // all impure because of access to Error
            "TypeError",      // all impure because of access to Error
            "URIError",       // all impure because of access to Error
    
    // note intentionally missing:
        // 
        // event-loop related
        // 
            // "clearInterval", 
            // "clearTimeout", 
            // "setInterval", 
            // "setTimeout", 
            // "Promise", // .race, .all, .any etc need patching to be deterministic
            // "addEventListener",
            // "removeEventListener",
            // "dispatchEvent",
            // "queueMicrotask",
            // "onunhandledrejection",
            // "onbeforeunload", // simply never call
            // "onunload", // simply never call

        // 
        // error related
        // 
            // "reportError", unclear: it can't be caught directly and instead teleports an error to the top level where it can supposedly be caught while preserving stack information
        
        // "fetch",

        // 
        // random related
        // 
            // "CryptoKey",
            // "crypto",
            // "Crypto",
            // "SubtleCrypto",

        // 
        // time related
        // 
            // "Date", // both time access and locale access are impure
            // "performance", // timing and memory
            // "Performance", memory, timing, etc
            // "PerformanceEntry",
            // "PerformanceMark",
            // "PerformanceMeasure",
        
        // 
        // std IO related
        // 
            // "console",
            // "alert", 
            // "confirm", 
            // "prompt", 
            // "close", // kinda like end
            // "closed", // just always false
            // "clear",  // effectively part of console
        
        // 
        // external world info
        // 
            // "location", the href location, which might be pure, but override it to be certain
            // "Location", the href location, which might be pure, but override it to be certain
            // "navigator", user agent, etc
            // "Navigator",

        // "Deno",
        // "Intl",
        // "WebSocket", // could maybe be faked
        
        // cache related
            // "localStorage",
            // "sessionStorage",
            // "caches",
            // "Storage",
            // "CacheStorage",
            // "Cache",

        // garbage collector related
            // "WeakMap"
            // "WeakSet"
            // "FinalizationRegistry"
            // "WeakRef"
        
        //
    // 
]

function patchEnviornment(globalObj, world) {
    const newGlobal = {}

    // 
    // global equivlents
    // 
        newGlobal.global = newGlobal.window = newGlobal.globalThis = newGlobal.self = newGlobal

    // 
    // direct globals
    // 
        for (const each of conservativeGlobals) {
            newGlobal[each] = globalObj[each]
        }
    // 
    // basic patching
    //
        const realToLocaleString = Object.prototype.toLocaleString
        Object.prototype.toLocaleString = function(...args) {
            return args.length === 0 ? this.toString() : realToLocaleString.apply(this, args)
        }
        const realToLocaleLowerCase = String.prototype.toLocaleLowerCase
        String.prototype.toLocaleLowerCase = function(...args) {
            return args.length === 0 ? this.toLowerCase() : realToLocaleLowerCase.apply(this, args)
        }
        const realToLocaleUpperCase = String.prototype.toLocaleUpperCase
        String.prototype.toLocaleUpperCase = function(...args) {
            return args.length === 0 ? this.toUpperCase() : realToLocaleUpperCase.apply(this, args)
        }
        const realLocaleCompare = String.prototype.localeCompare
        const defaults = { usage: "sort", localeMatcher: "best fit", collation: "default", sensitivity: "base", ignorePunctuation: true, numeric: false, caseFirst: false }
        String.prototype.localeCompare = function(other, locale="en", options={}) {
            options = { ...defaults, ...options }
            return realLocaleCompare.apply(this, [other, locale, options])
        }
        


        // TODO:
            // Math.random
        
    // 
    // method restrictions
    //
        // ex: a only allow known methods on Object, String, Function, TextDecoder, etc
        // var whiteList = [
        //         "length",
        //         "constructor",
        //         "anchor",
        //         "at",
        //         "big",
        //         "blink",
        //         "bold",
        //         "charAt",
        //         "charCodeAt",
        //         "codePointAt",
        //         "concat",
        //         "endsWith",
        //         "fontcolor",
        //         "fontsize",
        //         "fixed",
        //         "includes",
        //         "indexOf",
        //         "isWellFormed",
        //         "italics",
        //         "lastIndexOf",
        //         "link",
        //         "match",
        //         "matchAll",
        //         "normalize",
        //         "padEnd",
        //         "padStart",
        //         "repeat",
        //         "replace",
        //         "replaceAll",
        //         "search",
        //         "slice",
        //         "small",
        //         "split",
        //         "strike",
        //         "sub",
        //         "substr",
        //         "substring",
        //         "sup",
        //         "startsWith",
        //         "toString",
        //         "toWellFormed",
        //         "trim",
        //         "trimStart",
        //         "trimLeft",
        //         "trimEnd",
        //         "trimRight",
        //         "toLowerCase",
        //         "toUpperCase",
        //         "valueOf",
        //         Symbol.iterator,
        //         "__defineGetter__",
        //         "__defineSetter__",
        //         "hasOwnProperty",
        //         "__lookupGetter__",
        //         "__lookupSetter__",
        //         "isPrototypeOf",
        //         "propertyIsEnumerable",
        //     ]

    // 
    // substituions
    // 
        // TODO:
            // Date
            // performance.now
            // fetch
}

function safeEval({world, timeout, untrustedCode}={world:{}, timeout:Infinity}) {
    return new Promise(function (resolve, reject) {
        var blobURL = URL.createObjectURL(
            new Blob(
                ["(", 
                function() {
                    var _postMessage = postMessage
                    var _addEventListener = addEventListener

                    // ;(function (obj) {
                    //     "use strict"

                    //     // var current = globalThis
                    //     // console.debug(`current is:`,current)
                    //     // var keepProperties = [
                    //     //     // Required
                    //     //     "Object",
                    //     //     "Function",
                    //     //     "Infinity",
                    //     //     "NaN",
                    //     //     "undefined",
                    //     //     "caches",
                    //     //     "TEMPORARY",
                    //     //     "PERSISTENT",
                    //     //     // Optional, but trivial to get back
                    //     //     "Array",
                    //     //     "Boolean",
                    //     //     "Number",
                    //     //     "String",
                    //     //     "Symbol",
                    //     //     // Optional
                    //     //     "Map",
                    //     //     "Math",
                    //     //     "Set",
                    //     // ]

                    //     // do {
                    //     //     Object.getOwnPropertyNames(current).forEach(function (name) {
                    //     //         if (keepProperties.indexOf(name) === -1) {
                    //     //             delete current[name]
                    //     //         }
                    //     //     })

                    //     //     current = Object.getPrototypeOf(current)
                    //     // } while (current !== Object.prototype)
                    // })(this)

                    _addEventListener("message", function (e) {
                        var f = new Function("", "return (" + e.data + "\n);")
                        _postMessage(f())
                    })
                }.toString()
                ,`)() // ${Math.random()}`, ],
                { type: "application/javascript" }
            )
        )
        // TODO: clean up Math.random() (debugging stuff)
        var worker = new Worker(blobURL+`#${Math.random()}`, { type: "module" })
        // URL.revokeObjectURL(blobURL) // For some reason this causes an error on Deno when calling function more than once
        worker.onmessage = function (evt) {
            worker.terminate()
            resolve(evt.data)
        }
        worker.onerror = function (evt) {
            reject(new Error(evt.message))
        }
        worker.postMessage(untrustedCode)
        
        if (timeout !== Infinity) {
            setTimeout(function () {
                worker.terminate()
                reject(new Error("The worker timed out."))
            }, timeout)
        }
    })
}
safeEval({world:{}, timeout:Infinity, untrustedCode:`Object.hi = 10`})
