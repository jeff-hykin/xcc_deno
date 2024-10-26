import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toRepresentation, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.10.0.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorObject,isAsyncIterable, isSyncIterable, isIterableTechnically, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.10.0.0/value.js"
import { iter, next, Stop, Iterable, map, filter, reduce, frequencyCount, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkBy } from "https://deno.land/x/good@1.10.0.0/iterable.js"
import { RandomSource } from "./deterministic_tooling/random_seed.js"
import { recursivelyOwnKeysOf } from "https://deno.land/x/good@1.10.0.0/flattened/recursively_own_keys_of.js"
import { set } from "https://deno.land/x/good@1.10.0.0/flattened/set.js"
import { get } from "https://deno.land/x/good@1.10.0.0/flattened/get.js"
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

var prototypeKeyMap = new Map(
    [structuredClone, ["length","name","prototype"]],
    [Function.prototype, ["length","name","arguments","caller","constructor","apply","bind","call","toString",Symbol.hasInstance]],
    [structuredClone.prototype, ["constructor"]],
    [Function, ["length","name","prototype"]],
    [parseFloat, ["length","name"]],
    [undefined, []],
    [Infinity, []],
    [Number.prototype, ["constructor","toExponential","toFixed","toPrecision","toString","valueOf","toLocaleString"]],
    [Number, ["length","name","prototype","isFinite","isInteger","isNaN","isSafeInteger","parseFloat","parseInt","MAX_VALUE","MIN_VALUE","NaN","NEGATIVE_INFINITY","POSITIVE_INFINITY","MAX_SAFE_INTEGER","MIN_SAFE_INTEGER","EPSILON"]],
    [NaN, []],
    [ArrayBuffer, ["length","name","prototype","isView",Symbol.species]],
    [ArrayBuffer.prototype, ["constructor","byteLength","slice","maxByteLength","resizable","resize","transfer","transferToFixedLength","detached",Symbol.toStringTag]],
    [Uint8Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [TypedArray /*native function*/, ["length","name","prototype","of","from",Symbol.species]],
    [Uint8Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Int8Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Int8Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Uint16Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Uint16Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Int16Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Int16Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Uint32Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Uint32Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Int32Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Int32Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Float16Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Float16Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Float32Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Float32Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Float64Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Float64Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [Uint8ClampedArray, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [Uint8ClampedArray.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [BigUint64Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [BigUint64Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [BigInt64Array, ["length","name","prototype","BYTES_PER_ELEMENT"]],
    [BigInt64Array.prototype, ["constructor","BYTES_PER_ELEMENT"]],
    [DataView, ["length","name","prototype"]],
    [DataView.prototype, ["constructor","buffer","byteLength","byteOffset","getInt8","setInt8","getUint8","setUint8","getInt16","setInt16","getUint16","setUint16","getInt32","setInt32","getUint32","setUint32","getFloat32","setFloat32","getFloat64","setFloat64","getBigInt64","setBigInt64","getBigUint64","setBigUint64","getFloat16","setFloat16",Symbol.toStringTag]],
    [Map, ["length","name","prototype","groupBy",Symbol.species]],
    [Map.prototype, ["constructor","get","set","has","delete","clear","entries","forEach","keys","size","values",Symbol.toStringTag,Symbol.iterator]],
    [BigInt, ["length","name","prototype","asUintN","asIntN"]],
    [BigInt.prototype, ["constructor","toLocaleString","toString","valueOf",Symbol.toStringTag]],
    [Set, ["length","name","prototype",Symbol.species]],
    [Set.prototype, ["constructor","has","add","delete","clear","entries","forEach","size","values","keys","union","intersection","difference","symmetricDifference","isSubsetOf","isSupersetOf","isDisjointFrom",Symbol.toStringTag,Symbol.iterator]],
    [isFinite, ["length","name"]],
    [isNaN, ["length","name"]],
    [atob, ["length","name","prototype"]],
    [atob.prototype, ["constructor"]],
    [btoa, ["length","name","prototype"]],
    [btoa.prototype, ["constructor"]],
    [URL, ["length","name","prototype","parse","canParse","createObjectURL","revokeObjectURL"]],
    [URL.prototype, ["constructor","hash","host","hostname","href","origin","password","pathname","port","protocol","search","username","searchParams","toString","toJSON",Symbol("updateUrlSearch"),Symbol.toStringTag]],
    [URLPattern, ["length","name","prototype"]],
    [URLPattern.prototype, ["constructor","protocol","username","password","hostname","port","pathname","search","hash","hasRegExpGroups","test","exec",Symbol.toStringTag]],
    [URLSearchParams, ["length","name","prototype"]],
    [URLSearchParams.prototype, ["constructor","append","delete","getAll","get","has","set","sort","toString","size","entries","keys","values","forEach",Symbol.iterator,Symbol.toStringTag]],
    [decodeURI, ["length","name"]],
    [decodeURIComponent, ["length","name"]],
    [encodeURI, ["length","name"]],
    [encodeURIComponent, ["length","name"]],
    [escape, ["length","name"]],
    [unescape, ["length","name"]],
    [Blob, ["length","name","prototype"]],
    [Blob.prototype, ["constructor","size","type","slice","stream","text","arrayBuffer","bytes",Symbol.toStringTag]],
    [TextDecoder, ["length","name","prototype"]],
    [TextDecoder.prototype, ["constructor","encoding","fatal","ignoreBOM","decode",Symbol.toStringTag]],
    [TextEncoder, ["length","name","prototype"]],
    [TextEncoder.prototype, ["constructor","encoding","encode","encodeInto",Symbol.toStringTag]],
    [Request, ["length","name","prototype"]],
    [Request.prototype, ["constructor","method","url","headers","redirect","signal","clone","body","bodyUsed","arrayBuffer","blob","bytes","formData","json","text",Symbol("headers"),Symbol("signal"),Symbol("mime type"),Symbol("body"),Symbol.toStringTag]],
    [Response, ["length","name","prototype","error","redirect","json"]],
    [Response.prototype, ["constructor","type","url","redirected","status","ok","statusText","headers","clone","body","bodyUsed","arrayBuffer","blob","bytes","formData","json","text",Symbol("mime type"),Symbol("body"),Symbol.toStringTag]],
    [Headers, ["length","name","prototype"]],
    [Headers.prototype, ["constructor","append","delete","get","getSetCookie","has","set","entries","keys","values","forEach",Symbol("iterable headers"),Symbol.iterator,Symbol.toStringTag]],
    [Event, ["length","name","prototype","NONE","CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE"]],
    [Event.prototype, ["constructor","type","target","srcElement","currentTarget","composedPath","NONE","CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE","eventPhase","stopPropagation","cancelBubble","stopImmediatePropagation","bubbles","cancelable","returnValue","preventDefault","defaultPrevented","composed","initialized","timeStamp","isTrusted"]],
    [EventTarget, ["length","name","prototype"]],
    [EventTarget.prototype, ["constructor","addEventListener","removeEventListener","dispatchEvent","getParent",Symbol.toStringTag]],
    [MessageEvent, ["length","name","prototype"]],
    [MessageEvent.prototype, ["constructor","source"]],
    [TextDecoderStream, ["length","name","prototype"]],
    [TextDecoderStream.prototype, ["constructor","encoding","fatal","ignoreBOM","readable","writable",Symbol.toStringTag]],
    [TextEncoderStream, ["length","name","prototype"]],
    [TextEncoderStream.prototype, ["constructor","encoding","readable","writable",Symbol.toStringTag]],
    [AbortController, ["length","name","prototype"]],
    [AbortController.prototype, ["constructor","signal","abort",Symbol.toStringTag]],
    [AbortSignal, ["length","name","prototype","any","abort","timeout"]],
    [AbortSignal.prototype, ["constructor","aborted","reason","throwIfAborted","addEventListener","removeEventListener","onabort",Symbol("[[add]]"),Symbol("[[signalAbort]]"),Symbol("[[runAbortSteps]]"),Symbol("[[remove]]"),Symbol.toStringTag]],
    [CompressionStream, ["length","name","prototype"]],
    [CompressionStream.prototype, ["constructor","readable","writable",Symbol.toStringTag]],
    [DecompressionStream, ["length","name","prototype"]],
    [DecompressionStream.prototype, ["constructor","readable","writable",Symbol.toStringTag]],
    [ReadableStream, ["length","name","prototype","from"]],
    [ReadableStream.prototype, ["constructor","locked","cancel","getReader","pipeThrough","pipeTo","tee","values",Symbol.asyncIterator,Symbol.toStringTag]],
    [ReadableStreamDefaultReader, ["length","name","prototype"]],
    [ReadableStreamDefaultReader.prototype, ["constructor","read","releaseLock","closed","cancel",Symbol.toStringTag]],
    [TransformStream, ["length","name","prototype"]],
    [TransformStream.prototype, ["constructor","readable","writable",Symbol.toStringTag]],
    [WritableStream, ["length","name","prototype"]],
    [WritableStream.prototype, ["constructor","locked","abort","close","getWriter",Symbol.toStringTag]],
    [WritableStreamDefaultWriter, ["length","name","prototype"]],
    [WritableStreamDefaultWriter.prototype, ["constructor","closed","desiredSize","ready","abort","close","releaseLock","write",Symbol.toStringTag]],
    [WritableStreamDefaultController, ["length","name","prototype"]],
    [WritableStreamDefaultController.prototype, ["constructor","signal","error",Symbol("[[AbortSteps]]"),Symbol("[[ErrorSteps]]"),Symbol.toStringTag]],
    [ReadableByteStreamController, ["length","name","prototype"]],
    [ReadableByteStreamController.prototype, ["constructor","byobRequest","desiredSize","close","enqueue","error",Symbol("[[CancelSteps]]"),Symbol("[[PullSteps]]"),Symbol("[[ReleaseSteps]]"),Symbol.toStringTag]],
    [ReadableStreamBYOBReader, ["length","name","prototype"]],
    [ReadableStreamBYOBReader.prototype, ["constructor","read","releaseLock","closed","cancel",Symbol.toStringTag]],
    [ReadableStreamBYOBRequest, ["length","name","prototype"]],
    [ReadableStreamBYOBRequest.prototype, ["constructor","view","respond","respondWithNewView",Symbol.toStringTag]],
    [ReadableStreamDefaultController, ["length","name","prototype"]],
    [ReadableStreamDefaultController.prototype, ["constructor","desiredSize","close","enqueue","error",Symbol("[[CancelSteps]]"),Symbol("[[PullSteps]]"),Symbol("[[ReleaseSteps]]"),Symbol.toStringTag]],
    [TransformStreamDefaultController, ["length","name","prototype"]],
    [TransformStreamDefaultController.prototype, ["constructor","desiredSize","enqueue","error","terminate",Symbol.toStringTag]],
    [MessageChannel, ["length","name","prototype"]],
    [MessageChannel.prototype, ["constructor","port1","port2",Symbol.toStringTag]],
    [MessagePort, ["length","name","prototype"]],
    [MessagePort.prototype, ["constructor","postMessage","start","close","removeEventListener","addEventListener","onmessage","onmessageerror",Symbol("refMessagePort"),Symbol.toStringTag]],
    [ByteLengthQueuingStrategy, ["length","name","prototype"]],
    [ByteLengthQueuingStrategy.prototype, ["constructor","highWaterMark","size",Symbol.toStringTag]],
    [CountQueuingStrategy, ["length","name","prototype"]],
    [CountQueuingStrategy.prototype, ["constructor","highWaterMark","size",Symbol.toStringTag]],
    [DOMException, ["length","name","prototype","INDEX_SIZE_ERR","DOMSTRING_SIZE_ERR","HIERARCHY_REQUEST_ERR","WRONG_DOCUMENT_ERR","INVALID_CHARACTER_ERR","NO_DATA_ALLOWED_ERR","NO_MODIFICATION_ALLOWED_ERR","NOT_FOUND_ERR","NOT_SUPPORTED_ERR","INUSE_ATTRIBUTE_ERR","INVALID_STATE_ERR","SYNTAX_ERR","INVALID_MODIFICATION_ERR","NAMESPACE_ERR","INVALID_ACCESS_ERR","VALIDATION_ERR","TYPE_MISMATCH_ERR","SECURITY_ERR","NETWORK_ERR","ABORT_ERR","URL_MISMATCH_ERR","QUOTA_EXCEEDED_ERR","TIMEOUT_ERR","INVALID_NODE_TYPE_ERR","DATA_CLONE_ERR"]],
    [DOMException.prototype, ["constructor","message","name","code","INDEX_SIZE_ERR","DOMSTRING_SIZE_ERR","HIERARCHY_REQUEST_ERR","WRONG_DOCUMENT_ERR","INVALID_CHARACTER_ERR","NO_DATA_ALLOWED_ERR","NO_MODIFICATION_ALLOWED_ERR","NOT_FOUND_ERR","NOT_SUPPORTED_ERR","INUSE_ATTRIBUTE_ERR","INVALID_STATE_ERR","SYNTAX_ERR","INVALID_MODIFICATION_ERR","NAMESPACE_ERR","INVALID_ACCESS_ERR","VALIDATION_ERR","TYPE_MISMATCH_ERR","SECURITY_ERR","NETWORK_ERR","ABORT_ERR","URL_MISMATCH_ERR","QUOTA_EXCEEDED_ERR","TIMEOUT_ERR","INVALID_NODE_TYPE_ERR","DATA_CLONE_ERR",Symbol.toStringTag]],
    [RegExp, ["length","name","prototype","input","$_","lastMatch","$&","lastParen","$+","leftContext","$`","rightContext","$'","$1","$2","$3","$4","$5","$6","$7","$8","$9",Symbol.species]],
    [RegExp.prototype, ["constructor","exec","dotAll","flags","global","hasIndices","ignoreCase","multiline","source","sticky","unicode","unicodeSets","compile","toString","test",Symbol.match,Symbol.matchAll,Symbol.replace,Symbol.search,Symbol.split]],
    [WebAssembly, ["compile","validate","instantiate","Module","Instance","Table","Memory","Global","Tag","JSTag","Exception","CompileError","LinkError","RuntimeError","compileStreaming","instantiateStreaming",Symbol.toStringTag]],
    [Object.prototype, ["constructor","__defineGetter__","__defineSetter__","hasOwnProperty","__lookupGetter__","__lookupSetter__","isPrototypeOf","propertyIsEnumerable","toString","valueOf","toLocaleString"]],
    [Object, ["length","name","prototype","assign","getOwnPropertyDescriptor","getOwnPropertyDescriptors","getOwnPropertyNames","getOwnPropertySymbols","hasOwn","is","preventExtensions","seal","create","defineProperties","defineProperty","freeze","getPrototypeOf","setPrototypeOf","isExtensible","isFrozen","isSealed","keys","entries","fromEntries","values","groupBy"]],
    [Array, ["length","name","prototype","isArray","from","fromAsync","of",Symbol.species]],
    [Array.prototype, ["length","constructor","at","concat","copyWithin","fill","find","findIndex","findLast","findLastIndex","lastIndexOf","pop","push","reverse","shift","unshift","slice","sort","splice","includes","indexOf","join","keys","entries","values","forEach","filter","flat","flatMap","map","every","some","reduce","reduceRight","toReversed","toSorted","toSpliced","with","toLocaleString","toString",Symbol.iterator,Symbol.unscopables]],
    [parseInt, ["length","name"]],
    [Boolean, ["length","name","prototype"]],
    [Boolean.prototype, ["constructor","toString","valueOf"]],
    [Symbol, ["length","name","prototype","for","keyFor","asyncIterator","hasInstance","isConcatSpreadable","iterator","match","matchAll","replace","search","species","split","toPrimitive","toStringTag","unscopables","dispose","asyncDispose","metadata"]],
    [Symbol.prototype, ["constructor","toString","valueOf","description",Symbol.toStringTag,Symbol.toPrimitive]],
    [JSON, ["parse","stringify","rawJSON","isRawJSON",Symbol.toStringTag]],
    [Proxy, ["length","name","revocable"]],
    [Reflect, ["defineProperty","deleteProperty","apply","construct","get","getOwnPropertyDescriptor","getPrototypeOf","has","isExtensible","ownKeys","preventExtensions","set","setPrototypeOf",Symbol.toStringTag]],
    [eval, ["length","name"]],
    [Math, ["abs","acos","acosh","asin","asinh","atan","atanh","atan2","ceil","cbrt","expm1","clz32","cos","cosh","exp","floor","fround","hypot","imul","log","log1p","log2","log10","max","min","pow","random","round","sign","sin","sinh","sqrt","tan","tanh","trunc","E","LN10","LN2","LOG10E","LOG2E","PI","SQRT1_2","SQRT2","f16round",Symbol.toStringTag]],
    [String, ["length","name","prototype","fromCharCode","fromCodePoint","raw"]],
    [String.prototype, ["length","constructor","anchor","at","big","blink","bold","charAt","charCodeAt","codePointAt","concat","endsWith","fontcolor","fontsize","fixed","includes","indexOf","isWellFormed","italics","lastIndexOf","link","localeCompare","match","matchAll","normalize","padEnd","padStart","repeat","replace","replaceAll","search","slice","small","split","strike","sub","substr","substring","sup","startsWith","toString","toWellFormed","trim","trimStart","trimLeft","trimEnd","trimRight","toLocaleLowerCase","toLocaleUpperCase","toLowerCase","toUpperCase","valueOf",Symbol.iterator]],
    [Error, ["length","name","prototype","captureStackTrace","stackTraceLimit"]],
    [Error.prototype, ["constructor","name","message","toString"]],
    [AggregateError, ["length","name","prototype"]],
    [AggregateError.prototype, ["constructor","name","message"]],
    [EvalError, ["length","name","prototype"]],
    [EvalError.prototype, ["constructor","name","message"]],
    [RangeError, ["length","name","prototype"]],
    [RangeError.prototype, ["constructor","name","message"]],
    [ReferenceError, ["length","name","prototype"]],
    [ReferenceError.prototype, ["constructor","name","message"]],
    [SyntaxError, ["length","name","prototype"]],
    [SyntaxError.prototype, ["constructor","name","message"]],
    [TypeError, ["length","name","prototype"]],
    [TypeError.prototype, ["constructor","name","message"]],
    [URIError, ["length","name","prototype"]],
    [URIError.prototype, ["constructor","name","message"]],
)

const initDefaultWorld = ({ seed, startTime, localCompareOptions })=>{
    const numberGenerator = new RandomSource(seed)

    const realToLocaleString = Object.prototype.toLocaleString
    const realToLocaleLowerCase = String.prototype.toLocaleLowerCase
    const realToLocaleUpperCase = String.prototype.toLocaleUpperCase
    const realLocaleCompare     = String.prototype.localeCompare
    const localCompareDefaults  = { usage: "sort", localeMatcher: "best fit", collation: "default", sensitivity: "base", ignorePunctuation: true, numeric: false, caseFirst: false, ...localCompareOptions }

    return ({
        extraGlobals: {
        },
        patchedMethods: {
            Object: {
                prototype: {
                    toLocaleString: function(...args) {
                        return args.length === 0 ? this.toString() : realToLocaleString.apply(this, args)
                    },
                    toLocaleLowerCase: function(...args) {
                        return args.length === 0 ? this.toLowerCase() : realToLocaleLowerCase.apply(this, args)
                    },
                    toLocaleUpperCase: function(...args) {
                        return args.length === 0 ? this.toUpperCase() : realToLocaleUpperCase.apply(this, args)
                    },
                    localeCompare: function(other, locale="en", options={}) {
                        options = { ...localCompareDefaults, ...options }
                        return realLocaleCompare.apply(this, [other, locale, options])
                    },
                }
            },
            Math: {
                random: ()=>numberGenerator.next()
            },
        },
        whitelists: {
            keys: new Map([
                [
                    ["Object", "prototype"], [
                        "constructor",
                        "__defineGetter__",
                        "__defineSetter__",
                        "hasOwnProperty",
                        "__lookupGetter__",
                        "__lookupSetter__",
                        "isPrototypeOf",
                        "propertyIsEnumerable",
                        "toString",
                        "valueOf",
                        "toLocaleString",
                    ],
                    ["Function", "prototype"], [
                        "length",
                        "name",
                        "arguments",
                        "caller",
                        "constructor",
                        "apply",
                        "bind",
                        "call",
                        "toString",
                        Symbol.hasInstance,
                        // NOTE: there is one more key, a symbol, that appears on the function prototype
                        //           on deno its a key for "function() { return this }"
                        //           on firefox its Symbol(Symbol.metadata) but Symbol.metadata is null, and the value (e.g. Function[thatSymbol]) is null (not undefined)
                        //           I bet removing these things could break stuff. 
                        //           Maybe it would be best to patch Reflect.ownKeys and Object.key-stuff to merely hide these
                    ],
                    ["Function"], [
                        "length",
                        "name",
                        "prototype",
                    ],
                    ["Object"], [
                        "length",
                        "name",
                        "prototype",
                        "assign",
                        "getOwnPropertyDescriptor",
                        "getOwnPropertyDescriptors",
                        "getOwnPropertyNames",
                        "getOwnPropertySymbols",
                        "hasOwn",
                        "is",
                        "preventExtensions",
                        "seal",
                        "create",
                        "defineProperties",
                        "defineProperty",
                        "freeze",
                        "getPrototypeOf",
                        "setPrototypeOf",
                        "isExtensible",
                        "isFrozen",
                        "isSealed",
                        "keys",
                        "entries",
                        "fromEntries",
                        "values",
                        "groupBy",
                    ],
                    // 
                    // 
                    // 
                    ["String", "prototype"], [
                        "length",
                        "constructor",
                        "anchor",
                        "at",
                        "big",
                        "blink",
                        "bold",
                        "charAt",
                        "charCodeAt",
                        "codePointAt",
                        "concat",
                        "endsWith",
                        "fontcolor",
                        "fontsize",
                        "fixed",
                        "includes",
                        "indexOf",
                        "isWellFormed",
                        "italics",
                        "lastIndexOf",
                        "link",
                        "localeCompare",
                        "match",
                        "matchAll",
                        "normalize",
                        "padEnd",
                        "padStart",
                        "repeat",
                        "replace",
                        "replaceAll",
                        "search",
                        "slice",
                        "small",
                        "split",
                        "strike",
                        "sub",
                        "substr",
                        "substring",
                        "sup",
                        "startsWith",
                        "toString",
                        "toWellFormed",
                        "trim",
                        "trimStart",
                        "trimLeft",
                        "trimEnd",
                        "trimRight",
                        "toLocaleLowerCase",
                        "toLocaleUpperCase",
                        "toLowerCase",
                        "toUpperCase",
                        "valueOf",
                        Symbol.iterator,
                    ],
                    ["String"], [
                        "length",
                        "name",
                        "prototype",
                        "fromCharCode",
                        "fromCodePoint",
                        "raw"
                    ],
                ],
            ]),
        }
    })
}

function patchEnviornment(globalObj, world) {
    const newGlobal = {}
    world = typeof world == 'function' ? world() : world

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
    // basic method patching
    //
        for (const keyList of recursivelyOwnKeysOf(world.patchedMethods)) {
            const value = get({ keyList, from: globalThis, failValue: null })
            if (typeof value !== 'function') {
                // TODO: might need to do some .bind here
                set({ keyList, on: newGlobal, to: value,  })
            }
        }

    // 
    // method restrictions
    //
        for (const [keyList, allowedMethods] of world.whitelists.keys.entries()) {
            const obj = get({ keyList, from: globalThis, failValue: null })
            const allowedKeys = new Set(allowedMethods)
            for (const eachKey of Reflect.ownKeys(obj)) {
                if (!allowedKeys.has(eachKey)) {
                    delete obj[eachKey]
                }
            }
        }
        
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
