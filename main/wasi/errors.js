export class WASIError extends Error {
    constructor(errno) {
        super();
        this.errno = errno;
        Object.setPrototypeOf(this, WASIError.prototype);
    }
}
export class WASIExitError extends Error {
    constructor(code) {
        super(`WASI Exit error: ${code}`);
        this.code = code;
        Object.setPrototypeOf(this, WASIExitError.prototype);
    }
}
export class WASIKillError extends Error {
    constructor(signal) {
        super(`WASI Kill signal: ${signal}`);
        this.signal = signal;
        Object.setPrototypeOf(this, WASIKillError.prototype);
    }
}