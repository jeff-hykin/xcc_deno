import { config } from "./_config.js"
let exported = {
    AssertionError: class AssertionError extends Error {},
    doesNotMatch() {

    },
    fail() {

    },
    notDeepStrictEqual() {

    },
    rejects() {

    },
    deepEqual() {

    },
    doesNotReject() {

    },
    ifError() {

    },
    notEqual() {

    },
    strict() {

    },
    deepStrictEqual() {

    },
    doesNotThrow() {

    },
    match() {

    },
    notStrictEqua() {

    },
    strictEqual(...args) {
        let [actual, expected, message] = args
        if (args.length < 2) {
            throw new ERR_MISSING_ARGS('actual', 'expected');
        }
        if (!Object.is(actual, expected)) {
            var obj = {
                actual: actual,
                expected: expected,
                message: message,
                operator: 'strictEqual',
                stackStartFn: strictEqual
            };
            throw new exported.AssertionError(obj);
        }
    },
    equal,
    notDeepEqual,
    ok,
    throws,
}
const assert = (boolValue, message) => {
  if (!boolValue) {
    throw new Error(message)
  }
}
let exportedDefault = Object.assign(assert, exported)
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
     exported = await import("node:assert")
     exportedDefault = exported.default
}

var {
    AssertionError,
    doesNotMatch,
    fail,
    notDeepStrictEqual,
    rejects,
    deepEqual,
    doesNotReject,
    ifError,
    notEqual,
    strict,
    deepStrictEqual,
    doesNotThrow,
    match,
    notStrictEqual,
    strictEqual,
    equal,
    notDeepEqual,
    ok,
    throws,
} = exported

export {
    AssertionError,
    doesNotMatch,
    fail,
    notDeepStrictEqual,
    rejects,
    deepEqual,
    doesNotReject,
    ifError,
    notEqual,
    strict,
    deepStrictEqual,
    doesNotThrow,
    match,
    notStrictEqual,
    strictEqual,
    equal,
    notDeepEqual,
    ok,
    throws,
}

export default exportedDefault