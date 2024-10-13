const baseNow = Math.floor((Date.now() - performance.now()) * 1e-3);
let exported = globalThis.process || {
    getuid: () => 0,
    getgid: () => 0,
    cwd: () => "/",
    platform: "browser",
    nextTick: (typeof setImmediate === "function") ? setImmediate.bind(globalThis) : setTimeout.bind(globalThis),
    emitWarning: (message, type) => {
        console.warn(`${type}${type ? ": " : ""}${message}`)
    },
    env: {},
    hrtime(previousTimestamp) {
        let clocktime = performance.now() * 1e-3;
        let seconds = Math.floor(clocktime) + baseNow;
        let nanoseconds = Math.floor((clocktime % 1) * 1e9);
        // Compare to the prvious timestamp if we have one
        if (previousTimestamp) {
            seconds = seconds - previousTimestamp[0];
            nanoseconds = nanoseconds - previousTimestamp[1];
            if (nanoseconds < 0) {
                seconds--;
                nanoseconds += 1e9;
            }
        }
        return [seconds, nanoseconds];
    }
}

// Deno 1.x
if (globalThis.Deno && !globalThis.process) {
     exported = await import("node:process")
}

var {
    abort,
    cwd,
    exit,
    hrtime,
    platform,
    stdout,
    arch,
    getegid,
    kill,
    removeAllListeners,
    umask,
    argv,
    dlopen,
    geteuid,
    memoryUsage,
    removeListener,
    version,
    argv0,
    emitWarning,
    getgid,
    nextTick,
    stderr,
    versions,
    chdir,
    env,
    getuid,
    pid,
    stdin,
} = exported

exported.default = exported
export {
    abort,
    cwd,
    exit,
    hrtime,
    platform,
    stdout,
    arch,
    getegid,
    kill,
    removeAllListeners,
    umask,
    argv,
    dlopen,
    geteuid,
    memoryUsage,
    removeListener,
    version,
    argv0,
    emitWarning,
    getgid,
    nextTick,
    stderr,
    versions,
    chdir,
    env,
    getuid,
    pid,
    stdin,
}

export default exported