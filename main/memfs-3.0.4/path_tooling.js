import process from "../node_shims/process.js";

// this is a function so that process.platform can be mocked and dynamically changed
function isWindows() {
    return process.platform === "win32"
}
function removeTrailingSeparator(str) {
    var i = str.length - 1
    if (i < 2) {
        return str
    }
    while (isSeparator(str, i)) {
        i--
    }
    return str.substr(0, i + 1)
}
function isSeparator(str, i) {
    var _char = str[i]
    return i > 0 && (_char === "/" || (isWindows() && _char === "\\"))
}
function normalizePath(str, stripTrailing) {
    if (typeof str !== "string") {
        throw new TypeError("expected a string")
    }
    str = str.replace(/[\\\/]+/g, "/")
    if (stripTrailing !== false) {
        str = removeTrailingSeparator(str)
    }
    return str
}
export function unixify(filepath) {
    var stripTrailing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true
    if (isWindows()) {
        filepath = normalizePath(filepath, stripTrailing)
        return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "")
    }
    return filepath
}