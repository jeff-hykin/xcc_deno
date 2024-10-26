import { toRepresentation } from "https://deno.land/x/good@1.12.0.0/flattened/to_representation.js"
// import { toRepresentation } from "/Users/jeffhykin/repos/good-js/source/flattened/to_representation.js"

import { capitalize, indent, toCamelCase, digitsToEnglishArray, toPascalCase, toKebabCase, toSnakeCase, toScreamingKebabCase, toScreamingSnakeCase, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix, didYouMean } from "https://deno.land/x/good@1.10.0.0/string.js"

var conservativeGlobalsNames = [
    "Function",
    "Object",
    "Boolean",
    "Number",
    "String",
    "Array",
    "RegExp",
    "Symbol",
    "Error", 
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