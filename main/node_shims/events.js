import * as browser from "./helpers/events.js"
import browserDefault from "./helpers/events.js"

let exported = browser
let exportedDefault = browserDefault
if (globalThis.Deno || globalThis.process) {
     exported = await import("node:events")
     exportedDefault = exported.default
}

var {
    EventEmitter,
    EventEmitterAsyncResource,
    captureRejectionSymbol,
    defaultMaxListeners,
    errorMonitor,
    getEventListeners,
    listenerCount,
    on,
    once,
    setMaxListeners,
} = exported

export {
    EventEmitter,
    EventEmitterAsyncResource,
    captureRejectionSymbol,
    defaultMaxListeners,
    errorMonitor,
    getEventListeners,
    listenerCount,
    on,
    once,
    setMaxListeners,
}

export default exportedDefault