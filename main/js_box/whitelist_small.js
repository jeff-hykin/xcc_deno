const notEnumerated = {
    writable: true,
    enumerable: false,
    configurable: true,
}

export const nameMap = new Map([
    [NaN, "NaN"],
    [Infinity, "Infinity"],
    [undefined, "undefined"],
    [Function, "Function"],
    [Function.prototype, "Function.prototype"],
    [Object, "Object"],
    [Object.prototype, "Object.prototype"],
    [Boolean, "Boolean"],
    [Boolean.prototype, "Boolean.prototype"],
    [Number, "Number"],
    [Number.prototype, "Number.prototype"],
    [String, "String"],
    [String.prototype, "String.prototype"],
    [Array, "Array"],
    [Array.prototype, "Array.prototype"],
    [RegExp, "RegExp"],
    [RegExp.prototype, "RegExp.prototype"],
    [Symbol, "Symbol"],
    [Symbol.prototype, "Symbol.prototype"],
    [Error, "Error"],
    [Error.prototype, "Error.prototype"],
    [Promise, "Promise"],
    [Promise.prototype, "Promise.prototype"],
    [Set, "Set"],
    [Set.prototype, "Set.prototype"],
    [Map, "Map"],
    [Map.prototype, "Map.prototype"],
    [Math, "Math"],
    [Reflect, "Reflect"],
    [JSON, "JSON"],
    [EventTarget, "EventTarget"],
])
export default new Map([
    [
        Function,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Function",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Function.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
        },
    ],
    [
        Function.prototype,
        {
            length: {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            arguments: {
                get: Object.getOwnPropertyDescriptor(Function.prototype, "arguments").get,
                set: Object.getOwnPropertyDescriptor(Function.prototype, "arguments").set,
                enumerable: false,
                configurable: true,
            },
            caller: {
                get: Object.getOwnPropertyDescriptor(Function.prototype, "caller").get,
                set: Object.getOwnPropertyDescriptor(Function.prototype, "caller").get,
                enumerable: false,
                configurable: true,
            },
            constructor: {
                value: Function,
                ...notEnumerated,
            },
            apply: {
                value: Function.prototype.apply /*native function*/,
                ...notEnumerated,
            },
            bind: {
                value: Function.prototype.bind /*native function*/,
                ...notEnumerated,
            },
            call: {
                value: Function.prototype.call /*native function*/,
                ...notEnumerated,
            },
            toString: {
                value: Function.prototype.toString /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Object,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Object",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Object.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            assign: {
                value: Object.assign /*native function*/,
                ...notEnumerated,
            },
            getOwnPropertyDescriptor: {
                value: Object.getOwnPropertyDescriptor /*native function*/,
                ...notEnumerated,
            },
            getOwnPropertyDescriptors: {
                value: Object.getOwnPropertyDescriptors /*native function*/,
                ...notEnumerated,
            },
            getOwnPropertyNames: {
                value: Object.getOwnPropertyNames /*native function*/,
                ...notEnumerated,
            },
            getOwnPropertySymbols: {
                value: Object.getOwnPropertySymbols /*native function*/,
                ...notEnumerated,
            },
            hasOwn: {
                value: Object.hasOwn /*native function*/,
                ...notEnumerated,
            },
            is: {
                value: Object.is /*native function*/,
                ...notEnumerated,
            },
            preventExtensions: {
                value: Object.preventExtensions /*native function*/,
                ...notEnumerated,
            },
            seal: {
                value: Object.seal /*native function*/,
                ...notEnumerated,
            },
            create: {
                value: Object.create /*native function*/,
                ...notEnumerated,
            },
            defineProperties: {
                value: Object.defineProperties /*native function*/,
                ...notEnumerated,
            },
            defineProperty: {
                value: Object.defineProperty /*native function*/,
                ...notEnumerated,
            },
            freeze: {
                value: Object.freeze /*native function*/,
                ...notEnumerated,
            },
            getPrototypeOf: {
                value: Object.getPrototypeOf /*native function*/,
                ...notEnumerated,
            },
            setPrototypeOf: {
                value: Object.setPrototypeOf /*native function*/,
                ...notEnumerated,
            },
            isExtensible: {
                value: Object.isExtensible /*native function*/,
                ...notEnumerated,
            },
            isFrozen: {
                value: Object.isFrozen /*native function*/,
                ...notEnumerated,
            },
            isSealed: {
                value: Object.isSealed /*native function*/,
                ...notEnumerated,
            },
            keys: {
                value: Object.keys /*native function*/,
                ...notEnumerated,
            },
            entries: {
                value: Object.entries /*native function*/,
                ...notEnumerated,
            },
            fromEntries: {
                value: Object.fromEntries /*native function*/,
                ...notEnumerated,
            },
            values: {
                value: Object.values /*native function*/,
                ...notEnumerated,
            },
            groupBy: {
                value: Object.groupBy /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Object.prototype,
        {
            constructor: {
                value: Object,
                ...notEnumerated,
            },
            __defineGetter__: {
                value: globalThis["__defineGetter__"],
                ...notEnumerated,
            },
            __defineSetter__: {
                value: globalThis["__defineSetter__"],
                ...notEnumerated,
            },
            hasOwnProperty: {
                value: Object.prototype.hasOwnProperty,
                ...notEnumerated,
            },
            __lookupGetter__: {
                value: globalThis["__lookupGetter__"],
                ...notEnumerated,
            },
            __lookupSetter__: {
                value: globalThis["__lookupSetter__"],
                ...notEnumerated,
            },
            isPrototypeOf: {
                value: Object.prototype.isPrototypeOf,
                ...notEnumerated,
            },
            propertyIsEnumerable: {
                value: Object.prototype.propertyIsEnumerable,
                ...notEnumerated,
            },
            toString: {
                value: Object.prototype.toString,
                ...notEnumerated,
            },
            valueOf: {
                value: Object.prototype.valueOf,
                ...notEnumerated,
            },
            toLocaleString: {
                value: Object.prototype.toLocaleString,
                ...notEnumerated,
            },
        },
    ],
    [
        Boolean,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Boolean",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Boolean.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
        },
    ],
    [
        Boolean.prototype,
        {
            constructor: {
                value: Boolean,
                ...notEnumerated,
            },
            toString: {
                value: Boolean.prototype.toString /*native function*/,
                ...notEnumerated,
            },
            valueOf: {
                value: Boolean.prototype.valueOf /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Number,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Number",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Number.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            isFinite: {
                value: Number.isFinite /*native function*/,
                ...notEnumerated,
            },
            isInteger: {
                value: Number.isInteger /*native function*/,
                ...notEnumerated,
            },
            isNaN: {
                value: Number.isNaN /*native function*/,
                ...notEnumerated,
            },
            isSafeInteger: {
                value: Number.isSafeInteger /*native function*/,
                ...notEnumerated,
            },
            parseFloat: {
                value: Number.parseFloat,
                ...notEnumerated,
            },
            parseInt: {
                value: Number.parseInt,
                ...notEnumerated,
            },
            MAX_VALUE: {
                value: 1.7976931348623157e308,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            MIN_VALUE: {
                value: 5e-324,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            NaN: {
                value: NaN,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            NEGATIVE_INFINITY: {
                value: -Infinity,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            POSITIVE_INFINITY: {
                value: Infinity,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            MAX_SAFE_INTEGER: {
                value: 9007199254740991,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            MIN_SAFE_INTEGER: {
                value: -9007199254740991,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            EPSILON: {
                value: 2.220446049250313e-16,
                writable: false,
                enumerable: false,
                configurable: false,
            },
        },
    ],
    [
        Number.prototype,
        {
            constructor: {
                value: Number,
                ...notEnumerated,
            },
            toExponential: {
                value: Number.prototype.toExponential /*native function*/,
                ...notEnumerated,
            },
            toFixed: {
                value: Number.prototype.toFixed /*native function*/,
                ...notEnumerated,
            },
            toPrecision: {
                value: Number.prototype.toPrecision /*native function*/,
                ...notEnumerated,
            },
            toString: {
                value: Number.prototype.toString /*native function*/,
                ...notEnumerated,
            },
            valueOf: {
                value: Number.prototype.valueOf /*native function*/,
                ...notEnumerated,
            },
            toLocaleString: {
                value: Number.prototype.toLocaleString /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        String,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "String",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: String.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            fromCharCode: {
                value: String.fromCharCode /*native function*/,
                ...notEnumerated,
            },
            fromCodePoint: {
                value: String.fromCodePoint /*native function*/,
                ...notEnumerated,
            },
            raw: {
                value: String.raw /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        String.prototype,
        {
            length: {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            constructor: {
                value: String,
                ...notEnumerated,
            },
            anchor: {
                value: String.prototype.anchor /*native function*/,
                ...notEnumerated,
            },
            at: {
                value: String.prototype.at /*native function*/,
                ...notEnumerated,
            },
            big: {
                value: String.prototype.big /*native function*/,
                ...notEnumerated,
            },
            blink: {
                value: String.prototype.blink /*native function*/,
                ...notEnumerated,
            },
            bold: {
                value: String.prototype.bold /*native function*/,
                ...notEnumerated,
            },
            charAt: {
                value: String.prototype.charAt /*native function*/,
                ...notEnumerated,
            },
            charCodeAt: {
                value: String.prototype.charCodeAt /*native function*/,
                ...notEnumerated,
            },
            codePointAt: {
                value: String.prototype.codePointAt /*native function*/,
                ...notEnumerated,
            },
            concat: {
                value: String.prototype.concat /*native function*/,
                ...notEnumerated,
            },
            endsWith: {
                value: String.prototype.endsWith /*native function*/,
                ...notEnumerated,
            },
            fontcolor: {
                value: String.prototype.fontcolor /*native function*/,
                ...notEnumerated,
            },
            fontsize: {
                value: String.prototype.fontsize /*native function*/,
                ...notEnumerated,
            },
            fixed: {
                value: String.prototype.fixed /*native function*/,
                ...notEnumerated,
            },
            includes: {
                value: String.prototype.includes /*native function*/,
                ...notEnumerated,
            },
            indexOf: {
                value: String.prototype.indexOf /*native function*/,
                ...notEnumerated,
            },
            isWellFormed: {
                value: String.prototype.isWellFormed /*native function*/,
                ...notEnumerated,
            },
            italics: {
                value: String.prototype.italics /*native function*/,
                ...notEnumerated,
            },
            lastIndexOf: {
                value: String.prototype.lastIndexOf /*native function*/,
                ...notEnumerated,
            },
            link: {
                value: String.prototype.link /*native function*/,
                ...notEnumerated,
            },
            localeCompare: {
                value: String.prototype.localeCompare /*native function*/,
                ...notEnumerated,
            },
            match: {
                value: String.prototype.match /*native function*/,
                ...notEnumerated,
            },
            matchAll: {
                value: String.prototype.matchAll /*native function*/,
                ...notEnumerated,
            },
            normalize: {
                value: String.prototype.normalize /*native function*/,
                ...notEnumerated,
            },
            padEnd: {
                value: String.prototype.padEnd /*native function*/,
                ...notEnumerated,
            },
            padStart: {
                value: String.prototype.padStart /*native function*/,
                ...notEnumerated,
            },
            repeat: {
                value: String.prototype.repeat /*native function*/,
                ...notEnumerated,
            },
            replace: {
                value: String.prototype.replace /*native function*/,
                ...notEnumerated,
            },
            replaceAll: {
                value: String.prototype.replaceAll /*native function*/,
                ...notEnumerated,
            },
            search: {
                value: String.prototype.search /*native function*/,
                ...notEnumerated,
            },
            slice: {
                value: String.prototype.slice /*native function*/,
                ...notEnumerated,
            },
            small: {
                value: String.prototype.small /*native function*/,
                ...notEnumerated,
            },
            split: {
                value: String.prototype.split /*native function*/,
                ...notEnumerated,
            },
            strike: {
                value: String.prototype.strike /*native function*/,
                ...notEnumerated,
            },
            sub: {
                value: String.prototype.sub /*native function*/,
                ...notEnumerated,
            },
            substr: {
                value: String.prototype.substr /*native function*/,
                ...notEnumerated,
            },
            substring: {
                value: String.prototype.substring /*native function*/,
                ...notEnumerated,
            },
            sup: {
                value: String.prototype.sup /*native function*/,
                ...notEnumerated,
            },
            startsWith: {
                value: String.prototype.startsWith /*native function*/,
                ...notEnumerated,
            },
            toString: {
                value: String.prototype.toString /*native function*/,
                ...notEnumerated,
            },
            toWellFormed: {
                value: String.prototype.toWellFormed /*native function*/,
                ...notEnumerated,
            },
            trim: {
                value: String.prototype.trim /*native function*/,
                ...notEnumerated,
            },
            trimStart: {
                value: String.prototype.trimStart /*native function*/,
                ...notEnumerated,
            },
            trimLeft: {
                value: String.prototype.trimStart /*native function*/,
                ...notEnumerated,
            },
            trimEnd: {
                value: String.prototype.trimEnd /*native function*/,
                ...notEnumerated,
            },
            trimRight: {
                value: String.prototype.trimEnd /*native function*/,
                ...notEnumerated,
            },
            toLocaleLowerCase: {
                value: String.prototype.toLocaleLowerCase /*native function*/,
                ...notEnumerated,
            },
            toLocaleUpperCase: {
                value: String.prototype.toLocaleUpperCase /*native function*/,
                ...notEnumerated,
            },
            toLowerCase: {
                value: String.prototype.toLowerCase /*native function*/,
                ...notEnumerated,
            },
            toUpperCase: {
                value: String.prototype.toUpperCase /*native function*/,
                ...notEnumerated,
            },
            valueOf: {
                value: String.prototype.valueOf /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Array,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Array",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Array.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            isArray: {
                value: Array.isArray /*native function*/,
                ...notEnumerated,
            },
            from: {
                value: Array.from /*native function*/,
                ...notEnumerated,
            },
            fromAsync: {
                value: Array.fromAsync /*native function*/,
                ...notEnumerated,
            },
            of: {
                value: Array.of /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Array.prototype,
        {
            length: {
                value: 0,
                writable: true,
                enumerable: false,
                configurable: false,
            },
            constructor: {
                value: Array,
                ...notEnumerated,
            },
            at: {
                value: Array.prototype.at /*native function*/,
                ...notEnumerated,
            },
            concat: {
                value: Array.prototype.concat /*native function*/,
                ...notEnumerated,
            },
            copyWithin: {
                value: Array.prototype.copyWithin /*native function*/,
                ...notEnumerated,
            },
            fill: {
                value: Array.prototype.fill /*native function*/,
                ...notEnumerated,
            },
            find: {
                value: Array.prototype.find /*native function*/,
                ...notEnumerated,
            },
            findIndex: {
                value: Array.prototype.findIndex /*native function*/,
                ...notEnumerated,
            },
            findLast: {
                value: Array.prototype.findLast /*native function*/,
                ...notEnumerated,
            },
            findLastIndex: {
                value: Array.prototype.findLastIndex /*native function*/,
                ...notEnumerated,
            },
            lastIndexOf: {
                value: Array.prototype.lastIndexOf /*native function*/,
                ...notEnumerated,
            },
            pop: {
                value: Array.prototype.pop /*native function*/,
                ...notEnumerated,
            },
            push: {
                value: Array.prototype.push /*native function*/,
                ...notEnumerated,
            },
            reverse: {
                value: Array.prototype.reverse /*native function*/,
                ...notEnumerated,
            },
            shift: {
                value: Array.prototype.shift /*native function*/,
                ...notEnumerated,
            },
            unshift: {
                value: Array.prototype.unshift /*native function*/,
                ...notEnumerated,
            },
            slice: {
                value: Array.prototype.slice /*native function*/,
                ...notEnumerated,
            },
            sort: {
                value: Array.prototype.sort /*native function*/,
                ...notEnumerated,
            },
            splice: {
                value: Array.prototype.splice /*native function*/,
                ...notEnumerated,
            },
            includes: {
                value: Array.prototype.includes /*native function*/,
                ...notEnumerated,
            },
            indexOf: {
                value: Array.prototype.indexOf /*native function*/,
                ...notEnumerated,
            },
            join: {
                value: Array.prototype.join /*native function*/,
                ...notEnumerated,
            },
            keys: {
                value: Array.prototype.keys /*native function*/,
                ...notEnumerated,
            },
            entries: {
                value: Array.prototype.entries /*native function*/,
                ...notEnumerated,
            },
            values: {
                value: Array.prototype.values /*native function*/,
                ...notEnumerated,
            },
            forEach: {
                value: Array.prototype.forEach /*native function*/,
                ...notEnumerated,
            },
            filter: {
                value: Array.prototype.filter /*native function*/,
                ...notEnumerated,
            },
            flat: {
                value: Array.prototype.flat /*native function*/,
                ...notEnumerated,
            },
            flatMap: {
                value: Array.prototype.flatMap /*native function*/,
                ...notEnumerated,
            },
            map: {
                value: Array.prototype.map /*native function*/,
                ...notEnumerated,
            },
            every: {
                value: Array.prototype.every /*native function*/,
                ...notEnumerated,
            },
            some: {
                value: Array.prototype.some /*native function*/,
                ...notEnumerated,
            },
            reduce: {
                value: Array.prototype.reduce /*native function*/,
                ...notEnumerated,
            },
            reduceRight: {
                value: Array.prototype.reduceRight /*native function*/,
                ...notEnumerated,
            },
            toReversed: {
                value: Array.prototype.toReversed /*native function*/,
                ...notEnumerated,
            },
            toSorted: {
                value: Array.prototype.toSorted /*native function*/,
                ...notEnumerated,
            },
            toSpliced: {
                value: Array.prototype.toSpliced /*native function*/,
                ...notEnumerated,
            },
            with: {
                value: Array.prototype.with /*native function*/,
                ...notEnumerated,
            },
            toLocaleString: {
                value: Array.prototype.toLocaleString /*native function*/,
                ...notEnumerated,
            },
            toString: {
                value: Array.prototype.toString /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        RegExp,
        {
            length: {
                value: 2,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "RegExp",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: RegExp.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            input: {
                get: Object.getOwnPropertyDescriptor(RegExp, "input").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "input").set,
                enumerable: false,
                configurable: true,
            },
            $_: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$_").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "$_").set,
                enumerable: false,
                configurable: true,
            },
            lastMatch: {
                get: Object.getOwnPropertyDescriptor(RegExp, "lastMatch").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "lastMatch").set,
                enumerable: false,
                configurable: true,
            },
            "$&": {
                get: Object.getOwnPropertyDescriptor(RegExp, "$&").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "$&").set,
                enumerable: false,
                configurable: true,
            },
            lastParen: {
                get: Object.getOwnPropertyDescriptor(RegExp, "lastParen").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "lastParen").set,
                enumerable: false,
                configurable: true,
            },
            "$+": {
                get: Object.getOwnPropertyDescriptor(RegExp, "$+").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "$+").set,
                enumerable: false,
                configurable: true,
            },
            leftContext: {
                get: Object.getOwnPropertyDescriptor(RegExp, "leftContext").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "leftContext").set,
                enumerable: false,
                configurable: true,
            },
            "$`": {
                get: Object.getOwnPropertyDescriptor(RegExp, "$`").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "$`").set,
                enumerable: false,
                configurable: true,
            },
            rightContext: {
                get: Object.getOwnPropertyDescriptor(RegExp, "rightContext").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "rightContext").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            "$'": {
                get: Object.getOwnPropertyDescriptor(RegExp, "$'").get,
                set: Object.getOwnPropertyDescriptor(RegExp, "$'").set,
                enumerable: false,
                configurable: true,
            },
            $1: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$1").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$1").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $2: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$2").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$2").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $3: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$3").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$3").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $4: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$4").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$4").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $5: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$5").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$5").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $6: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$6").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$6").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $7: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$7").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$7").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $8: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$8").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$8").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
            $9: {
                get: Object.getOwnPropertyDescriptor(RegExp, "$9").get /*native function*/,
                set: Object.getOwnPropertyDescriptor(RegExp, "$9").set /*native function*/,
                enumerable: false,
                configurable: true,
            },
        },
    ],
    [
        RegExp.prototype,
        {
            constructor: {
                value: RegExp,
                ...notEnumerated,
            },
            exec: {
                value: RegExp.prototype.exec,
                ...notEnumerated,
            },
            dotAll: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "dotAll").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            flags: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            global: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "global").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            hasIndices: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "hasIndices").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            ignoreCase: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "ignoreCase").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            multiline: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "multiline").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            source: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "source").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            sticky: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "sticky").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            unicode: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "unicode").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            unicodeSets: {
                get: Object.getOwnPropertyDescriptor(RegExp.prototype, "unicodeSets").get /*native function*/,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            compile: {
                value: RegExp.prototype.compile /*native function*/,
                ...notEnumerated,
            },
            toString: {
                value: RegExp.prototype.toString /*native function*/,
                ...notEnumerated,
            },
            test: {
                value: RegExp.prototype.test /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Symbol,
        {
            length: {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Symbol",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Symbol.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            for: {
                value: Symbol.for /*native function*/,
                ...notEnumerated,
            },
            keyFor: {
                value: Symbol.keyFor /*native function*/,
                ...notEnumerated,
            },
            asyncIterator: {
                value: Symbol.asyncIterator,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            hasInstance: {
                value: Symbol.hasInstance,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            isConcatSpreadable: {
                value: Symbol.isConcatSpreadable,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            iterator: {
                value: Symbol.iterator,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            match: {
                value: Symbol.match,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            matchAll: {
                value: Symbol.matchAll,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            replace: {
                value: Symbol.replace,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            search: {
                value: Symbol.search,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            species: {
                value: Symbol.species,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            split: {
                value: Symbol.split,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            toPrimitive: {
                value: Symbol.toPrimitive,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            toStringTag: {
                value: Symbol.toStringTag,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            unscopables: {
                value: Symbol.unscopables,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            dispose: {
                value: Symbol.dispose,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            asyncDispose: {
                value: Symbol.asyncDispose,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            metadata: {
                value: Symbol.metadata,
                writable: false,
                enumerable: false,
                configurable: false,
            },
        },
    ],
    [
        Symbol.prototype,
        {
            constructor: {
                value: Symbol,
                ...notEnumerated,
            },
            toString: {
                value: Symbol.prototype.toString /*native function*/,
                ...notEnumerated,
            },
            valueOf: {
                value: Symbol.prototype.valueOf /*native function*/,
                ...notEnumerated,
            },
            description: {
                get: Object.getOwnPropertyDescriptor(Symbol.prototype, "description").get,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
        },
    ],
    [
        Error,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Error",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Error.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            captureStackTrace: {
                value: Error.captureStackTrace /*native function*/,
                ...notEnumerated,
            },
            stackTraceLimit: {
                value: 10,
                writable: true,
                enumerable: true,
                configurable: true,
            },
        },
    ],
    [
        Error.prototype,
        {
            constructor: {
                value: Error,
                ...notEnumerated,
            },
            name: {
                value: "Error",
                ...notEnumerated,
            },
            message: {
                value: "",
                ...notEnumerated,
            },
            toString: {
                value: Error.prototype.toString /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Promise,
        {
            length: {
                value: 1,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Promise",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Promise.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            all: {
                value: Promise.all /*native function*/,
                ...notEnumerated,
            },
            allSettled: {
                value: Promise.allSettled /*native function*/,
                ...notEnumerated,
            },
            any: {
                value: Promise.any /*native function*/,
                ...notEnumerated,
            },
            race: {
                value: Promise.race /*native function*/,
                ...notEnumerated,
            },
            resolve: {
                value: Promise.resolve /*native function*/,
                ...notEnumerated,
            },
            reject: {
                value: Promise.reject /*native function*/,
                ...notEnumerated,
            },
            withResolvers: {
                value: Promise.withResolvers /*native function*/,
                ...notEnumerated,
            },
            try: {
                value: Promise.try /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Promise.prototype,
        {
            constructor: {
                value: Promise,
                ...notEnumerated,
            },
            then: {
                value: Promise.prototype.then /*native function*/,
                ...notEnumerated,
            },
            catch: {
                value: Promise.prototype.catch /*native function*/,
                ...notEnumerated,
            },
            finally: {
                value: Promise.prototype.finally /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Set,
        {
            length: {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Set",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Set.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
        },
    ],
    [
        Set.prototype,
        {
            constructor: {
                value: Set,
                ...notEnumerated,
            },
            has: {
                value: Set.prototype.has /*native function*/,
                ...notEnumerated,
            },
            add: {
                value: Set.prototype.add /*native function*/,
                ...notEnumerated,
            },
            delete: {
                value: Set.prototype.delete /*native function*/,
                ...notEnumerated,
            },
            clear: {
                value: Set.prototype.clear /*native function*/,
                ...notEnumerated,
            },
            entries: {
                value: Set.prototype.entries /*native function*/,
                ...notEnumerated,
            },
            forEach: {
                value: Set.prototype.forEach /*native function*/,
                ...notEnumerated,
            },
            size: {
                get: Object.getOwnPropertyDescriptor(Set.prototype, "size").get,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            values: {
                value: Set.prototype.values /*native function*/,
                ...notEnumerated,
            },
            keys: {
                value: Set.prototype.values /*native function*/,
                ...notEnumerated,
            },
            union: {
                value: Set.prototype.union /*native function*/,
                ...notEnumerated,
            },
            intersection: {
                value: Set.prototype.intersection /*native function*/,
                ...notEnumerated,
            },
            difference: {
                value: Set.prototype.difference /*native function*/,
                ...notEnumerated,
            },
            symmetricDifference: {
                value: Set.prototype.symmetricDifference /*native function*/,
                ...notEnumerated,
            },
            isSubsetOf: {
                value: Set.prototype.isSubsetOf /*native function*/,
                ...notEnumerated,
            },
            isSupersetOf: {
                value: Set.prototype.isSupersetOf /*native function*/,
                ...notEnumerated,
            },
            isDisjointFrom: {
                value: Set.prototype.isDisjointFrom /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Map,
        {
            length: {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "Map",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: Map.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            groupBy: {
                value: Map.groupBy /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Map.prototype,
        {
            constructor: {
                value: Map,
                ...notEnumerated,
            },
            get: {
                value: Map.prototype.get /*native function*/,
                ...notEnumerated,
            },
            set: {
                value: Map.prototype.set /*native function*/,
                ...notEnumerated,
            },
            has: {
                value: Map.prototype.has /*native function*/,
                ...notEnumerated,
            },
            delete: {
                value: Map.prototype.delete /*native function*/,
                ...notEnumerated,
            },
            clear: {
                value: Map.prototype.clear /*native function*/,
                ...notEnumerated,
            },
            entries: {
                value: Map.prototype.entries /*native function*/,
                ...notEnumerated,
            },
            forEach: {
                value: Map.prototype.forEach /*native function*/,
                ...notEnumerated,
            },
            keys: {
                value: Map.prototype.keys /*native function*/,
                ...notEnumerated,
            },
            size: {
                get: Object.getOwnPropertyDescriptor(Map.prototype, "size").get,
                set: undefined,
                enumerable: false,
                configurable: true,
            },
            values: {
                value: Map.prototype.values /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Math,
        {
            abs: {
                value: Math.abs /*native function*/,
                ...notEnumerated,
            },
            acos: {
                value: Math.acos /*native function*/,
                ...notEnumerated,
            },
            acosh: {
                value: Math.acosh /*native function*/,
                ...notEnumerated,
            },
            asin: {
                value: Math.asin /*native function*/,
                ...notEnumerated,
            },
            asinh: {
                value: Math.asinh /*native function*/,
                ...notEnumerated,
            },
            atan: {
                value: Math.atan /*native function*/,
                ...notEnumerated,
            },
            atanh: {
                value: Math.atanh /*native function*/,
                ...notEnumerated,
            },
            atan2: {
                value: Math.atan2 /*native function*/,
                ...notEnumerated,
            },
            ceil: {
                value: Math.ceil /*native function*/,
                ...notEnumerated,
            },
            cbrt: {
                value: Math.cbrt /*native function*/,
                ...notEnumerated,
            },
            expm1: {
                value: Math.expm1 /*native function*/,
                ...notEnumerated,
            },
            clz32: {
                value: Math.clz32 /*native function*/,
                ...notEnumerated,
            },
            cos: {
                value: Math.cos /*native function*/,
                ...notEnumerated,
            },
            cosh: {
                value: Math.cosh /*native function*/,
                ...notEnumerated,
            },
            exp: {
                value: Math.exp /*native function*/,
                ...notEnumerated,
            },
            floor: {
                value: Math.floor /*native function*/,
                ...notEnumerated,
            },
            fround: {
                value: Math.fround /*native function*/,
                ...notEnumerated,
            },
            hypot: {
                value: Math.hypot /*native function*/,
                ...notEnumerated,
            },
            imul: {
                value: Math.imul /*native function*/,
                ...notEnumerated,
            },
            log: {
                value: Math.log /*native function*/,
                ...notEnumerated,
            },
            log1p: {
                value: Math.log1p /*native function*/,
                ...notEnumerated,
            },
            log2: {
                value: Math.log2 /*native function*/,
                ...notEnumerated,
            },
            log10: {
                value: Math.log10 /*native function*/,
                ...notEnumerated,
            },
            max: {
                value: Math.max /*native function*/,
                ...notEnumerated,
            },
            min: {
                value: Math.min /*native function*/,
                ...notEnumerated,
            },
            pow: {
                value: Math.pow /*native function*/,
                ...notEnumerated,
            },
            random: {
                value: Math.random /*native function*/,
                ...notEnumerated,
            },
            round: {
                value: Math.round /*native function*/,
                ...notEnumerated,
            },
            sign: {
                value: Math.sign /*native function*/,
                ...notEnumerated,
            },
            sin: {
                value: Math.sin /*native function*/,
                ...notEnumerated,
            },
            sinh: {
                value: Math.sinh /*native function*/,
                ...notEnumerated,
            },
            sqrt: {
                value: Math.sqrt /*native function*/,
                ...notEnumerated,
            },
            tan: {
                value: Math.tan /*native function*/,
                ...notEnumerated,
            },
            tanh: {
                value: Math.tanh /*native function*/,
                ...notEnumerated,
            },
            trunc: {
                value: Math.trunc /*native function*/,
                ...notEnumerated,
            },
            E: {
                value: 2.718281828459045,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            LN10: {
                value: 2.302585092994046,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            LN2: {
                value: 0.6931471805599453,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            LOG10E: {
                value: 0.4342944819032518,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            LOG2E: {
                value: 1.4426950408889634,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            PI: {
                value: 3.141592653589793,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            SQRT1_2: {
                value: 0.7071067811865476,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            SQRT2: {
                value: 1.4142135623730951,
                writable: false,
                enumerable: false,
                configurable: false,
            },
            f16round: {
                value: Math.f16round /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        Reflect,
        {
            defineProperty: {
                value: Reflect.defineProperty /*native function*/,
                ...notEnumerated,
            },
            deleteProperty: {
                value: Reflect.deleteProperty /*native function*/,
                ...notEnumerated,
            },
            apply: {
                value: Reflect.apply /*native function*/,
                ...notEnumerated,
            },
            construct: {
                value: Reflect.construct /*native function*/,
                ...notEnumerated,
            },
            get: {
                value: Reflect.get /*native function*/,
                ...notEnumerated,
            },
            getOwnPropertyDescriptor: {
                value: Reflect.getOwnPropertyDescriptor /*native function*/,
                ...notEnumerated,
            },
            getPrototypeOf: {
                value: Reflect.getPrototypeOf /*native function*/,
                ...notEnumerated,
            },
            has: {
                value: Reflect.has /*native function*/,
                ...notEnumerated,
            },
            isExtensible: {
                value: Reflect.isExtensible /*native function*/,
                ...notEnumerated,
            },
            ownKeys: {
                value: Reflect.ownKeys /*native function*/,
                ...notEnumerated,
            },
            preventExtensions: {
                value: Reflect.preventExtensions /*native function*/,
                ...notEnumerated,
            },
            set: {
                value: Reflect.set /*native function*/,
                ...notEnumerated,
            },
            setPrototypeOf: {
                value: Reflect.setPrototypeOf /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        JSON,
        {
            parse: {
                value: JSON.parse /*native function*/,
                ...notEnumerated,
            },
            stringify: {
                value: JSON.stringify /*native function*/,
                ...notEnumerated,
            },
            rawJSON: {
                value: JSON.rawJSON /*native function*/,
                ...notEnumerated,
            },
            isRawJSON: {
                value: JSON.isRawJSON /*native function*/,
                ...notEnumerated,
            },
        },
    ],
    [
        EventTarget,
        {
            length: {
                value: 0,
                writable: false,
                enumerable: false,
                configurable: true,
            },
            name: {
                value: "EventTarget",
                writable: false,
                enumerable: false,
                configurable: true,
            },
            prototype: {
                value: EventTarget.prototype,
                writable: false,
                enumerable: false,
                configurable: false,
            },
        },
    ],
    [
        EventTarget.prototype,
        {
            constructor: {
                value: EventTarget.prototype.EventTarget,
                ...notEnumerated,
            },
            addEventListener: {
                value: EventTarget.prototype.addEventListener,
                writable: true,
                enumerable: true,
                configurable: true,
            },
            removeEventListener: {
                value: EventTarget.prototype.removeEventListener,
                writable: true,
                enumerable: true,
                configurable: true,
            },
            dispatchEvent: {
                value: EventTarget.prototype.dispatchEvent,
                writable: true,
                enumerable: true,
                configurable: true,
            },
            getParent: {
                value: EventTarget.prototype.getParent,
                writable: true,
                enumerable: true,
                configurable: true,
            },
        },
    ],
    [
        Date.prototype,
        {
            toISOString: {
                value: Date.prototype.toISOString,
                ...notEnumerated,
            },
            getTime: {
                value: Date.prototype.getTime,
                ...notEnumerated,
            },
            setTime: {
                value: Date.prototype.setTime,
                ...notEnumerated,
            },
            getUTCDate: {
                value: Date.prototype.getUTCDate,
                ...notEnumerated,
            },
            setUTCDate: {
                value: Date.prototype.setUTCDate,
                ...notEnumerated,
            },
            getUTCDay: {
                value: Date.prototype.getUTCDay,
                ...notEnumerated,
            },
            getUTCFullYear: {
                value: Date.prototype.getUTCFullYear,
                ...notEnumerated,
            },
            setUTCFullYear: {
                value: Date.prototype.setUTCFullYear,
                ...notEnumerated,
            },
            getUTCHours: {
                value: Date.prototype.getUTCHours,
                ...notEnumerated,
            },
            setUTCHours: {
                value: Date.prototype.setUTCHours,
                ...notEnumerated,
            },
            getUTCMilliseconds: {
                value: Date.prototype.getUTCMilliseconds,
                ...notEnumerated,
            },
            setUTCMilliseconds: {
                value: Date.prototype.setUTCMilliseconds,
                ...notEnumerated,
            },
            getUTCMinutes: {
                value: Date.prototype.getUTCMinutes,
                ...notEnumerated,
            },
            setUTCMinutes: {
                value: Date.prototype.setUTCMinutes,
                ...notEnumerated,
            },
            getUTCMonth: {
                value: Date.prototype.getUTCMonth,
                ...notEnumerated,
            },
            setUTCMonth: {
                value: Date.prototype.setUTCMonth,
                ...notEnumerated,
            },
            getUTCSeconds: {
                value: Date.prototype.getUTCSeconds,
                ...notEnumerated,
            },
            setUTCSeconds: {
                value: Date.prototype.setUTCSeconds,
                ...notEnumerated,
            },
            valueOf: {
                value: Date.prototype.valueOf,
                ...notEnumerated,
            },
            toJSON: {
                value: Date.prototype.toJSON,
                ...notEnumerated,
            },
            // polyfills
            getDate:         {value: Date.prototype.getUTCDate, ...notEnumerated},
            setDate:         {value: Date.prototype.setUTCDate, ...notEnumerated},
            getDay:          {value: Date.prototype.getUTCDay, ...notEnumerated},
            getFullYear:     {value: Date.prototype.getUTCFullYear, ...notEnumerated},
            setFullYear:     {value: Date.prototype.setUTCFullYear, ...notEnumerated},
            getHours:        {value: Date.prototype.getUTCHours, ...notEnumerated},
            setHours:        {value: Date.prototype.setUTCHours, ...notEnumerated},
            getMilliseconds: {value: Date.prototype.getUTCMilliseconds, ...notEnumerated},
            setMilliseconds: {value: Date.prototype.setUTCMilliseconds, ...notEnumerated},
            getMinutes:      {value: Date.prototype.getUTCMinutes, ...notEnumerated},
            setMinutes:      {value: Date.prototype.setUTCMinutes, ...notEnumerated},
            getMonth:        {value: Date.prototype.getUTCMonth, ...notEnumerated},
            setMonth:        {value: Date.prototype.setUTCMonth, ...notEnumerated},
            getSeconds:      {value: Date.prototype.getUTCSeconds, ...notEnumerated},
            setSeconds:      {value: Date.prototype.setUTCSeconds, ...notEnumerated},
            getYear:         {value: (...args)=>`${Date.prototype.getUTCFullYear(...args)}`.slice(-2)-0, ...notEnumerated},
            // TODO: setYear
            // setYear:
        },
    ],
])
export const globalThisBaseDescriptors = {
    undefined: {
        value: undefined,
        writable: false,
        enumerable: false,
        configurable: false,
    },
    NaN: {
        value: NaN,
        writable: false,
        enumerable: false,
        configurable: false,
    },
    Infinity: {
        value: Infinity,
        writable: false,
        enumerable: false,
        configurable: false,
    },
    Object: {
        value: Object,
        ...notEnumerated,
    },
    Function: {
        value: Function,
        ...notEnumerated,
    },
    Array: {
        value: Array,
        ...notEnumerated,
    },
    Number: {
        value: Number,
        ...notEnumerated,
    },
    Boolean: {
        value: Boolean,
        ...notEnumerated,
    },
    String: {
        value: String,
        ...notEnumerated,
    },
    Symbol: {
        value: Symbol,
        ...notEnumerated,
    },
    Promise: {
        value: Promise,
        ...notEnumerated,
    },
    RegExp: {
        value: RegExp,
        ...notEnumerated,
    },
    Error: {
        value: Error,
        ...notEnumerated,
    },
    Map: {
        value: Map,
        ...notEnumerated,
    },
    Set: {
        value: Set,
        ...notEnumerated,
    },
    Math: {
        value: Math,
        ...notEnumerated,
    },
    Reflect: {
        value: Reflect,
        ...notEnumerated,
    },
    JSON: {
        value: JSON,
        ...notEnumerated,
    },
    EventTarget: {
        value: EventTarget,
        ...notEnumerated,
    },
}
