import { toRepresentation } from "https://deno.land/x/good@1.12.0.0/flattened/to_representation.js"
// import { toRepresentation } from "/Users/jeffhykin/repos/good-js/source/flattened/to_representation.js"

import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.10.0.0/string.js"

var conservativeGlobalsNames = [
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
var objects = new Map()
for (const each of conservativeGlobalsNames) {
    const originalValue = eval(each)
    if (originalValue == null) {
        continue
    }
    let value = originalValue
    if (!objects.has(value)) {
        objects.set(value, each)
    }
    value = Object.getPrototypeOf(originalValue || Object)
    if (!objects.has(value)) {
        objects.set(value, `Object.getPrototypeOf(${each})`)
    }
    
    value = originalValue.prototype
    if (!objects.has(value)) {
        objects.set(value, `${each}.prototype`)
    }
    
    value = originalValue.constructor
    if (!objects.has(value)) {
        objects.set(value, `${each}.constructor`)
    }
    
    value = originalValue.constructor?.prototype
    if (!objects.has(value)) {
        objects.set(value, `${each}.constructor.prototype`)
    }
}

// console.debug(`objects is:`,objects)
// console.debug(`toRepresentation(objects) is:`,toRepresentation(objects))


var prototypes = new Set(
    conservativeGlobalsNames
        .map((each) => eval(each))
        .filter(each=>each!=null)
        .map((each) => [
            Object.getPrototypeOf(each || Object),
            each?.prototype,
            each?.constructor?.prototype,
            (each instanceof Function ? each : undefined),
        ].filter(each=>each))
        .flat(1)
)
var prototypeKeyMap = new Map([...objects.keys()].map(proto=>[proto, proto==null ? [] : ((typeof proto != 'object'&&typeof proto != 'function') ? Object.keys(proto) : Reflect.ownKeys(proto))]))

const propertyDescriptorsMap = new Map()
for (const eachObj of [...prototypeKeyMap.keys()].slice(0)) {
    if (eachObj == null) {
        continue
    }
    const descriptors = Object.getOwnPropertyDescriptors(eachObj)
    propertyDescriptorsMap.set(eachObj, descriptors)
}

// console.log(toRepresentation(prototypeKeyMap, { indent: "    " }))
console.log(toRepresentation(propertyDescriptorsMap, { indent: "    ", simplified: true }))