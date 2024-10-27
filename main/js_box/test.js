import { toRepresentation } from "/Users/jeffhykin/repos/good-js/source/flattened/to_representation.js"
import { createTimingTools } from "./deterministic_tooling/timing_tools.js"

// // import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.10.0.0/string.js"

// // const reprSymbol = Symbol.for("representation")
// // const denoInspectSymbol = Symbol.for("Deno.customInspect")
// // /**
// //  * python's repr() for JS
// //  *
// //  */
// // export const toRepresentation = (item, {alreadySeen=new Set(), debugging=false}={})=>{
// //     const recursionWrapper = (item)=>{
// //         console.debug(`item is:`,item)
// //         // prevent infinite recursion
// //         if (item instanceof Object) {
// //             if (alreadySeen.has(item)) {
// //                 return `[Self Reference]`
// //             } else {
// //                 alreadySeen.add(item)
// //             }
// //         }
        
// //         let output
// //         if (item == null || typeof item == 'number' || typeof item == 'boolean' || item instanceof RegExp) {
// //             output = String(item)
// //         } else if (typeof item == 'string') {
// //             output = JSON.stringify(item)
// //         } else if (typeof item == 'symbol') {
// //             if (!item.description) {
// //                 output = "Symbol()"
// //             } else {
// //                 const globalVersion = Symbol.for(item.description)
// //                 if (globalVersion == item) {
// //                     output = `Symbol.for(${JSON.stringify(item.description)})`
// //                 } else {
// //                     output = `Symbol(${JSON.stringify(item.description)})`
// //                 }
// //             }
// //         } else if (item instanceof BigInt) {
// //             output = `BigInt(${item.toString()})`
// //         } else if (item instanceof Date) {
// //             output = `new Date(${item.getTime()})`
// //         } else if (item instanceof Array) {
// //             output = `[${item.map(each=>recursionWrapper(each)).join(",")}]`
// //         } else if (item instanceof Set) {
// //             output = `new Set([${([...item]).map(each=>recursionWrapper(each)).join(",")}])`
// //         // pure object
// //         } else if (item instanceof Object && item.constructor == Object) {
// //             output = pureObjectRepr(item)
// //         // map
// //         } else if (console.log(item, item instanceof Map) || item instanceof Map) {
// //             console.log(`here`)
// //             let string = "new Map("
// //             console.group("")
// //             for (const [key, value] of item.entries()) {
// //                 console.log(`iterating key:`,key)
// //                 const stringKey = recursionWrapper(key)
// //                 const stringValue = recursionWrapper(value)
// //                 console.log(`here3`)
// //                 if (!stringKey.match(/\n/g)) {
// //                     console.log(`here3.1`)
// //                     string += `\n  [${stringKey}, ${indent({string:stringValue, by:"  ", noLead:true})}],`
// //                 // multiline key
// //                 } else {
// //                     console.log(`here3.2`)
// //                     string += `\n  [${indent({string:stringKey, by:"  ", noLead:true})},\n  ${indent({string:stringValue, by:"    ", noLead:true})}],`
// //                 }
// //             }
// //             console.groupEnd("")
// //             string += "\n)"
// //             output = string
// //             console.log(`setting output`)
// //         } else {
// //             console.log(`here2`)
// //             // if custom object has a repr, use it
// //             if (item[reprSymbol] instanceof Function) {
// //                 try {
// //                     output = item[reprSymbol]()
// //                     return output
// //                 } catch (error) {}
// //             }
// //             // fallback on inspect methods 
// //             if (item[denoInspectSymbol] instanceof Function) {
// //                 try {
// //                     output = item[denoInspectSymbol]()
// //                     return output
// //                 } catch (error) {}
// //             }
            
// //             // built in prototypes
// //             try {
// //                 // this check is for Boolean.prototype
// //                 const halfPrimitiveClass = (item?.constructor?.name == 'string' && item?.constructor?.name != 'Function')
// //                 if ((typeof item.name == 'string' || halfPrimitiveClass) && !(item instanceof Function)) {
// //                     if (eval(`globalThis[${JSON.stringify(item?.name)}]?.prototype`) == item) {
// //                         return `${item.name}.prototype`
// //                     }
// //                 }
// //             } catch (error) {
                
// //             }

// //             if (item?.constructor == Error) {
// //                 output = `new Error(${JSON.stringify(item.message)})`
// //                 return output
// //             }

// //             // built in functions/constructors (there is no way to tell the difference)
// //             let isNativeCode
// //             let asString
// //             try {
// //                 asString = item.toString()
// //             } catch (error) {
                
// //             }
// //             try {
// //                 isNativeCode = asString.endsWith("{ [native code] }")
// //                 if (typeof item.name == 'string' && isNativeCode) {
// //                     return `${item.name} /*native function*/`
// //                 }
// //             } catch (error) {
                
// //             }
            
// //             // fallback on rendering with prototype as pure object
// //             try {
// //                 // 
// //                 if (item instanceof Function && item.name && asString.match(/^class\b/)) {
// //                     return `${item.name} /*class*/`
// //                 }
// //                 if (item instanceof Function && item.name && asString.match(/^function\b/)) {
// //                     return `${item.name} /*function*/`
// //                 }
// //                 // if (item.constructor instanceof Function && typeof item.constructor.name == 'string') {
// //                 //     let inner = "/*unknown*/"
// //                 //     try {
// //                 //         inner = pureObjectRepr(item)
// //                 //     } catch (error) {
// //                 //         if (debugging) {
// //                 //             console.log(`inner error is:`,error)
// //                 //         }
// //                 //     }
// //                 //     output = `new ${item.constructor.name}(${inner})`
// //                 //     return output
// //                 // }
// //             } catch (error) {
                
// //             }
            
// //             // fallback on rendering with prototype as pure object
// //             try {
// //                 if (item.constructor instanceof Function && item.prototype && typeof item.name == 'string') {
// //                     output = `class ${item.name} { /*...*/ }`
// //                     return output
// //                 }
// //             } catch (error) {
                
// //             }
            
// //             // fallback on toString()
// //             try {
// //                 if (typeof asString == 'string' && asString !== "[object Object]") {
// //                     return asString
// //                 }
// //             } catch (error) {}
            
// //             // absolute fallback on treating as pure item
// //             return pureObjectRepr(item)
// //         }
        
// //         console.debug(`output is:`,output)
// //         return output
// //     }
// //     const pureObjectRepr = (item)=>{
// //         let string = "{"
// //         let entries
// //         try {
// //             console.debug(`typeof item is:`,typeof item)
// //             console.debug(`item is:`,item)
// //             entries = Object.entries(item)
// //         } catch (error) {
// //             try {
// //                 return String(item)
// //             } catch (error) {
// //                 return "[Unable to represent]"
// //             }
// //         }
// //         for (const [key, value] of entries) {
// //             const stringKey = recursionWrapper(key)
// //             const stringValue = recursionWrapper(value)
// //             string += `\n  ${stringKey}: ${indent({string:stringValue, by:"  ", noLead:true})},`
// //         }
// //         if (entries.length == 0) {
// //             string += "}"
// //         } else {
// //             string += "\n}"
// //         }
// //         return string
// //     }
    
// //     try {
// //         return recursionWrapper(item)
// //     } catch (error) {
// //         if (debugging) {
// //             console.debug(`[toRepresentation] error is:`,error)
// //         }
// //         return String(item)
// //     }
// // }


// var conservativeGlobals = [
//     "structuredClone",
//     "parseFloat",
//     "Infinity",
//     "NaN",
//     "undefined",
//     "ArrayBuffer",
//     "Uint8Array",
//     "Int8Array",
//     "Uint16Array",
//     "Int16Array",
//     "Uint32Array",
//     "Int32Array",
//     "Float16Array",
//     "Float32Array",
//     "Float64Array",
//     "Uint8ClampedArray",
//     "BigUint64Array",
//     "BigInt64Array",
//     "DataView",
//     "Map",
//     "BigInt",
//     "Set",
    
//     // basic functions
//     "isFinite",
//     "isNaN",
//     "atob",
//     "btoa",

//     // url related (all of these exist in nodejs)
//     "URL",
//     "URLPattern",
//     "URLSearchParams", 
//     "decodeURI",
//     "decodeURIComponent",
//     "encodeURI",
//     "encodeURIComponent",
//     "escape",
//     "unescape",
    
//     // helper classes
//     "Blob",
//     "TextDecoder",
//     "TextEncoder",

//     // "File",        // not defined in nodejs
//     // "FileReader",  // not defined in nodejs

//     // related to fetch (all are defined in nodejs)
//     "Request",
//     "Response",
//     "Headers",

//     // event
//     "Event",                    // exist in nodejs
//     "EventTarget",              // exist in nodejs
//     "MessageEvent",             // exist in nodejs
//     // "EventSource",              // do not exist in nodejs
//     // "CustomEvent",              // do not exist in nodejs
//     // "ErrorEvent",               // do not exist in nodejs
//     // "CloseEvent",               // do not exist in nodejs
//     // "PromiseRejectionEvent",    // do not exist in nodejs
//     // "ProgressEvent",            // do not exist in nodejs

//     // stream related (all exist in nodejs, deno, and firefox)
//     "TextDecoderStream",
//     "TextEncoderStream",
//     "AbortController",
//     "AbortSignal",
//     "CompressionStream",
//     "DecompressionStream",
//     "ReadableStream",
//     "ReadableStreamDefaultReader",
//     "TransformStream",
//     "WritableStream",
//     "WritableStreamDefaultWriter",
//     "WritableStreamDefaultController",
//     "ReadableByteStreamController",
//     "ReadableStreamBYOBReader",
//     "ReadableStreamBYOBRequest",
//     "ReadableStreamDefaultController",
//     "TransformStreamDefaultController",
//     "MessageChannel",
//     "MessagePort",
//     "ByteLengthQueuingStrategy",
//     "CountQueuingStrategy",

//     // misc
//     "DOMException", // exists in nodejs
//     // "Iterator", // Not defined in firefox or nodejs (supposed to be but isn't on globalThis)
//     // "SharedArrayBuffer", // Not defined in firefox (supposed to be but isn't on globalThis)
//     // "FormData", // exists in nodejs, maybe its related to fetch?

//     // // image 
//     // "ImageData", // does not exist in nodejs
//     // "ImageBitmap", // does not exist in nodejs
//     // "createImageBitmap", // probably don't actually support (doesn't seem to work in deno)
        
//     // pure but needs justification
//     "RegExp", // .lastMatch does not leak outside of the web worker
//     "WebAssembly",
//     // "Worker", // probably need to patch to enforce type: module
//     // "name", // ensure its always an emtpy string at top level
//     // "Atomics", // TODO: consider race conditions

//     // basically no modification
//     "Function",
//     "Array",
//     "Number",
//     "parseInt",
//     "Boolean",
//     "Symbol",
//     "JSON",
        
//     // possible sandbox breakers
//     "Proxy",
//     "Reflect",
//     "eval",
    
//     // 
//     // will get patched
//     //
//     "Object",
//     "Math",
//     "String",

//     // 
//     // possibly needs fixing
//     // 
//         // 
//         // error related
//         // 
//             "Error", // stack traces might need patching
//             "AggregateError", // all impure because of access to Error
//             "EvalError",      // all impure because of access to Error
//             "RangeError",     // all impure because of access to Error
//             "ReferenceError", // all impure because of access to Error
//             "SyntaxError",    // all impure because of access to Error
//             "TypeError",      // all impure because of access to Error
//             "URIError",       // all impure because of access to Error
    
//     // note intentionally missing:
//         // 
//         // event-loop related
//         // 
//             // "clearInterval", 
//             // "clearTimeout", 
//             // "setInterval", 
//             // "setTimeout", 
//             // "Promise", // .race, .all, .any etc need patching to be deterministic
//             // "addEventListener",
//             // "removeEventListener",
//             // "dispatchEvent",
//             // "queueMicrotask",
//             // "onunhandledrejection",
//             // "onbeforeunload", // simply never call
//             // "onunload", // simply never call

//         // 
//         // error related
//         // 
//             // "reportError", unclear: it can't be caught directly and instead teleports an error to the top level where it can supposedly be caught while preserving stack information
        
//         // "fetch",

//         // 
//         // random related
//         // 
//             // "CryptoKey",
//             // "crypto",
//             // "Crypto",
//             // "SubtleCrypto",

//         // 
//         // time related
//         // 
//             // "Date", // both time access and locale access are impure
//             // "performance", // timing and memory
//             // "Performance", memory, timing, etc
//             // "PerformanceEntry",
//             // "PerformanceMark",
//             // "PerformanceMeasure",
        
//         // 
//         // std IO related
//         // 
//             // "console",
//             // "alert", 
//             // "confirm", 
//             // "prompt", 
//             // "close", // kinda like end
//             // "closed", // just always false
//             // "clear",  // effectively part of console
        
//         // 
//         // external world info
//         // 
//             // "location", the href location, which might be pure, but override it to be certain
//             // "Location", the href location, which might be pure, but override it to be certain
//             // "navigator", user agent, etc
//             // "Navigator",

//         // "Deno",
//         // "Intl",
//         // "WebSocket", // could maybe be faked
        
//         // cache related
//             // "localStorage",
//             // "sessionStorage",
//             // "caches",
//             // "Storage",
//             // "CacheStorage",
//             // "Cache",

//         // garbage collector related
//             // "WeakMap"
//             // "WeakSet"
//             // "FinalizationRegistry"
//             // "WeakRef"
        
//         //
//     // 
// ]
// var objects = new Map()
// for (const each of conservativeGlobals) {
//     const originalValue = eval(each)
//     if (originalValue == null) {
//         continue
//     }
//     let value = originalValue
//     if (!objects.has(value)) {
//         objects.set(value, each)
//     }
//     value = Object.getPrototypeOf(originalValue || Object)
//     if (!objects.has(value)) {
//         objects.set(value, `Object.getPrototypeOf(${each})`)
//     }
    
//     value = originalValue.prototype
//     if (!objects.has(value)) {
//         objects.set(value, `${each}.prototype`)
//     }
    
//     value = originalValue.constructor
//     if (!objects.has(value)) {
//         objects.set(value, `${each}.constructor`)
//     }
    
//     value = originalValue.constructor?.prototype
//     if (!objects.has(value)) {
//         objects.set(value, `${each}.constructor.prototype`)
//     }
// }

// // console.debug(`objects is:`,objects)
// // console.debug(`toRepresentation(objects) is:`,toRepresentation(objects))


// var prototypes = new Set(
//     conservativeGlobals
//         .map((each) => eval(each))
//         .filter(each=>each!=null)
//         .map((each) => [
//             Object.getPrototypeOf(each || Object),
//             each?.prototype,
//             each?.constructor?.prototype,
//             (each instanceof Function ? each : undefined),
//         ].filter(each=>each))
//         .flat(1)
// )
// var prototypeKeyMap = new Map([...objects.keys()].map(proto=>[proto, proto==null ? [] : ((typeof proto != 'object'&&typeof proto != 'function') ? Object.keys(proto) : Reflect.ownKeys(proto))]))

// console.log(toRepresentation(prototypeKeyMap, {debug: true}))
// // console.debug(`prototypeKeyMap is:`,prototypeKeyMap)


// 
// interval impl
// 
const { setTimeout, setInterval, clearInterval, clearTimeout, performance, Date } = createTimingTools()
    
    
// TODO: patch Function.prototype .toString to check setTimeout,setInterval,clearTimeout,clearInterval and return `function ${name}() { [native code] }`
    // NOTE: for some reason Deno doesn't have that same string output, it has actual code. And NodeJS does too (very different code)
// TODO: try to hack the stack trace to hide the runNextMacroTask

// open questions:
    // how will eventDispatcher work?
        // Ez: delete it because nodejs doesn't have it

let intervalIndex = 0
const startTime = performance.now()
let delayTime = 1000
setInterval(async ()=>{
    console.log(`interval: ${intervalIndex++}, idealTime: ${(delayTime*intervalIndex)/1000}, actualTime: ${(performance.now() - startTime)/1000}`)
    // randomly busywait to make a setInterval late
        if (intervalIndex % 3 == 0) {
            console.log(`delaying interval ${intervalIndex}`)
            let startOfDelay = performance.now()
            while (performance.now() - startOfDelay < (delayTime*2.5)) {
            }
        }
}, delayTime)

let timeoutIndex = 0
setTimeout(() => {
    console.log(`timeout: ${timeoutIndex++}, idealTime: ${(delayTime*timeoutIndex)/1000}, actualTime: ${(performance.now() - startTime)/1000}`)
}, 1000)
setTimeout(() => {
    console.log(`timeout: ${timeoutIndex++}, idealTime: ${(delayTime*timeoutIndex)/1000}, actualTime: ${(performance.now() - startTime)/1000}`)
}, 2000)
setTimeout(() => {
    console.log(`timeout: ${timeoutIndex++}, idealTime: ${(delayTime*timeoutIndex)/1000}, actualTime: ${(performance.now() - startTime)/1000}`)
    // if (timeoutIndex % 3 == 0) {
    //     console.log(`delaying timeout ${timeoutIndex}`)
    //     let startOfDelay = performance.now()
    //     while (performance.now() - startOfDelay < (delayTime*2.5)) {
    //     }
    // }
}, 3000)
setTimeout(() => {
    console.log(`timeout: ${timeoutIndex++}, idealTime: ${(delayTime*timeoutIndex)/1000}, actualTime: ${(performance.now() - startTime)/1000}`)
}, 4000)
setTimeout(() => {
    console.log(`timeout: ${timeoutIndex++}, idealTime: ${(delayTime*timeoutIndex)/1000}, actualTime: ${(performance.now() - startTime)/1000}`)
}, 5000)
setTimeout(() => {
    console.log(`timeout: ${timeoutIndex++}, idealTime: ${(delayTime*timeoutIndex)/1000}, actualTime: ${(performance.now() - startTime)/1000}`)
}, 6000)

// var microTaskPreTimeout = 7

// var setTimeoutCount = 0
// var setTimeoutScheduled = 0
// var microTaskIndex = 0
// var microTaskScheduled = 0
// while (microTaskPreTimeout--) {
//     microTaskScheduled++
//     Promise.resolve().then(()=>{
//         (async ()=>{
//             console.log(`microTaskScheduled: ${microTaskScheduled}, microTaskIndex: ${microTaskIndex++}, setTimeoutCount: ${setTimeoutCount}, setTimeoutScheduled: ${setTimeoutScheduled}`)
//         })()
//     })
// }
// setTimeoutScheduled++
// var setTimeoutDelay = 1 //ms
// setTimeout(() => {
//     setTimeoutCount++
//     console.log(`setTimeoutCount: ${setTimeoutCount}`)
// }, setTimeoutDelay)
// let time = new Date().getTime()


// // this microtask will happen before the setTimeout callback
// Promise.resolve().then(()=>{
//     (async ()=>{
//         console.log(`microTaskScheduled: ${microTaskScheduled}, microTaskIndex: ${microTaskIndex++}, setTimeoutCount: ${setTimeoutCount}, setTimeoutScheduled: ${setTimeoutScheduled}`)
//     })()
// })
// var microTaskPostTimeout = 20000000
// ;((async ()=>{
//     // busy-wait enough time for the macrotask to outlive its timeout
//     while (true) {
//         let newTime = new Date().getTime()
//         if (newTime - time > (setTimeoutDelay*2)) {
//             time = newTime
//             break
//         }
//     }
//     console.log(`macrotask should now be scheduled`)
//     // then schedule a micro task (which should happen after a macrotask)
//     ;((async ()=>{
//         while (microTaskPostTimeout--) {
//             let newTime = new Date().getTime()
//             if (newTime - time < 50) {
//                 continue
//             }
//             time = newTime
//             microTaskScheduled++
//             // console.log(`scheduling microTask`)
//             Promise.resolve().then(()=>{
//                 (async ()=>{
//                     console.log(`microTaskScheduled: ${microTaskScheduled}, microTaskIndex: ${microTaskIndex++}, setTimeoutCount: ${setTimeoutCount}, setTimeoutScheduled: ${setTimeoutScheduled}`)
//                 })()
//             })
//         }
//     })())
// })())
// // })())
// // ;((async ()=>{

// // schedule micro task