var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// https://deno.land/std@0.128.0/_util/os.ts
var osType, isWindows;
var init_os = __esm({
  "https://deno.land/std@0.128.0/_util/os.ts"() {
    osType = (() => {
      const { Deno: Deno4 } = globalThis;
      if (typeof Deno4?.build?.os === "string") {
        return Deno4.build.os;
      }
      const { navigator } = globalThis;
      if (navigator?.appVersion?.includes?.("Win") ?? false) {
        return "windows";
      }
      return "linux";
    })();
    isWindows = osType === "windows";
  }
});

// https://deno.land/std@0.128.0/path/_constants.ts
var CHAR_UPPERCASE_A, CHAR_LOWERCASE_A, CHAR_UPPERCASE_Z, CHAR_LOWERCASE_Z, CHAR_DOT, CHAR_FORWARD_SLASH, CHAR_BACKWARD_SLASH, CHAR_COLON, CHAR_QUESTION_MARK;
var init_constants = __esm({
  "https://deno.land/std@0.128.0/path/_constants.ts"() {
    CHAR_UPPERCASE_A = 65;
    CHAR_LOWERCASE_A = 97;
    CHAR_UPPERCASE_Z = 90;
    CHAR_LOWERCASE_Z = 122;
    CHAR_DOT = 46;
    CHAR_FORWARD_SLASH = 47;
    CHAR_BACKWARD_SLASH = 92;
    CHAR_COLON = 58;
    CHAR_QUESTION_MARK = 63;
  }
});

// https://deno.land/std@0.128.0/path/_util.ts
function assertPath(path5) {
  if (typeof path5 !== "string") {
    throw new TypeError(
      `Path must be a string. Received ${JSON.stringify(path5)}`
    );
  }
}
function isPosixPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH;
}
function isPathSeparator(code) {
  return isPosixPathSeparator(code) || code === CHAR_BACKWARD_SLASH;
}
function isWindowsDeviceRoot(code) {
  return code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z || code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z;
}
function normalizeString(path5, allowAboveRoot, separator, isPathSeparator4) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for (let i20 = 0, len = path5.length; i20 <= len; ++i20) {
    if (i20 < len) code = path5.charCodeAt(i20);
    else if (isPathSeparator4(code)) break;
    else code = CHAR_FORWARD_SLASH;
    if (isPathSeparator4(code)) {
      if (lastSlash === i20 - 1 || dots === 1) {
      } else if (lastSlash !== i20 - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i20;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i20;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path5.slice(lastSlash + 1, i20);
        else res = path5.slice(lastSlash + 1, i20);
        lastSegmentLength = i20 - lastSlash - 1;
      }
      lastSlash = i20;
      dots = 0;
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep9, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) return base;
  if (dir === pathObject.root) return dir + base;
  return dir + sep9 + base;
}
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, (c24) => {
    return WHITESPACE_ENCODINGS[c24] ?? c24;
  });
}
var WHITESPACE_ENCODINGS;
var init_util = __esm({
  "https://deno.land/std@0.128.0/path/_util.ts"() {
    init_constants();
    WHITESPACE_ENCODINGS = {
      "	": "%09",
      "\n": "%0A",
      "\v": "%0B",
      "\f": "%0C",
      "\r": "%0D",
      " ": "%20"
    };
  }
});

// https://deno.land/std@0.128.0/_util/assert.ts
function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}
var DenoStdInternalError;
var init_assert = __esm({
  "https://deno.land/std@0.128.0/_util/assert.ts"() {
    DenoStdInternalError = class extends Error {
      constructor(message2) {
        super(message2);
        this.name = "DenoStdInternalError";
      }
    };
  }
});

// https://deno.land/std@0.128.0/path/win32.ts
var win32_exports = {};
__export(win32_exports, {
  basename: () => basename2,
  delimiter: () => delimiter2,
  dirname: () => dirname2,
  extname: () => extname2,
  format: () => format2,
  fromFileUrl: () => fromFileUrl,
  isAbsolute: () => isAbsolute2,
  join: () => join3,
  normalize: () => normalize2,
  parse: () => parse2,
  relative: () => relative2,
  resolve: () => resolve2,
  sep: () => sep2,
  toFileUrl: () => toFileUrl,
  toNamespacedPath: () => toNamespacedPath2
});
function resolve2(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for (let i20 = pathSegments.length - 1; i20 >= -1; i20--) {
    let path5;
    const { Deno: Deno4 } = globalThis;
    if (i20 >= 0) {
      path5 = pathSegments[i20];
    } else if (!resolvedDevice) {
      if (typeof Deno4?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a CWD.");
      }
      path5 = Deno4.cwd();
    } else {
      if (typeof Deno4?.env?.get !== "function" || typeof Deno4?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno4.cwd();
      if (path5 === void 0 || path5.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path5 = `${resolvedDevice}\\`;
      }
    }
    assertPath(path5);
    const len = path5.length;
    if (len === 0) continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute8 = false;
    const code = path5.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code)) {
        isAbsolute8 = true;
        if (isPathSeparator(path5.charCodeAt(1))) {
          let j17 = 2;
          let last = j17;
          for (; j17 < len; ++j17) {
            if (isPathSeparator(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            const firstPart = path5.slice(last, j17);
            last = j17;
            for (; j17 < len; ++j17) {
              if (!isPathSeparator(path5.charCodeAt(j17))) break;
            }
            if (j17 < len && j17 !== last) {
              last = j17;
              for (; j17 < len; ++j17) {
                if (isPathSeparator(path5.charCodeAt(j17))) break;
              }
              if (j17 === len) {
                device = `\\\\${firstPart}\\${path5.slice(last)}`;
                rootEnd = j17;
              } else if (j17 !== last) {
                device = `\\\\${firstPart}\\${path5.slice(last, j17)}`;
                rootEnd = j17;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code)) {
        if (path5.charCodeAt(1) === CHAR_COLON) {
          device = path5.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path5.charCodeAt(2))) {
              isAbsolute8 = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code)) {
      rootEnd = 1;
      isAbsolute8 = true;
    }
    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      continue;
    }
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path5.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute8;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0) break;
  }
  resolvedTail = normalizeString(
    resolvedTail,
    !resolvedAbsolute,
    "\\",
    isPathSeparator
  );
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize2(path5) {
  assertPath(path5);
  const len = path5.length;
  if (len === 0) return ".";
  let rootEnd = 0;
  let device;
  let isAbsolute8 = false;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      isAbsolute8 = true;
      if (isPathSeparator(path5.charCodeAt(1))) {
        let j17 = 2;
        let last = j17;
        for (; j17 < len; ++j17) {
          if (isPathSeparator(path5.charCodeAt(j17))) break;
        }
        if (j17 < len && j17 !== last) {
          const firstPart = path5.slice(last, j17);
          last = j17;
          for (; j17 < len; ++j17) {
            if (!isPathSeparator(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            last = j17;
            for (; j17 < len; ++j17) {
              if (isPathSeparator(path5.charCodeAt(j17))) break;
            }
            if (j17 === len) {
              return `\\\\${firstPart}\\${path5.slice(last)}\\`;
            } else if (j17 !== last) {
              device = `\\\\${firstPart}\\${path5.slice(last, j17)}`;
              rootEnd = j17;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON) {
        device = path5.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path5.charCodeAt(2))) {
            isAbsolute8 = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator(code)) {
    return "\\";
  }
  let tail;
  if (rootEnd < len) {
    tail = normalizeString(
      path5.slice(rootEnd),
      !isAbsolute8,
      "\\",
      isPathSeparator
    );
  } else {
    tail = "";
  }
  if (tail.length === 0 && !isAbsolute8) tail = ".";
  if (tail.length > 0 && isPathSeparator(path5.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === void 0) {
    if (isAbsolute8) {
      if (tail.length > 0) return `\\${tail}`;
      else return "\\";
    } else if (tail.length > 0) {
      return tail;
    } else {
      return "";
    }
  } else if (isAbsolute8) {
    if (tail.length > 0) return `${device}\\${tail}`;
    else return `${device}\\`;
  } else if (tail.length > 0) {
    return device + tail;
  } else {
    return device;
  }
}
function isAbsolute2(path5) {
  assertPath(path5);
  const len = path5.length;
  if (len === 0) return false;
  const code = path5.charCodeAt(0);
  if (isPathSeparator(code)) {
    return true;
  } else if (isWindowsDeviceRoot(code)) {
    if (len > 2 && path5.charCodeAt(1) === CHAR_COLON) {
      if (isPathSeparator(path5.charCodeAt(2))) return true;
    }
  }
  return false;
}
function join3(...paths) {
  const pathsCount = paths.length;
  if (pathsCount === 0) return ".";
  let joined;
  let firstPart = null;
  for (let i20 = 0; i20 < pathsCount; ++i20) {
    const path5 = paths[i20];
    assertPath(path5);
    if (path5.length > 0) {
      if (joined === void 0) joined = firstPart = path5;
      else joined += `\\${path5}`;
    }
  }
  if (joined === void 0) return ".";
  let needsReplace = true;
  let slashCount = 0;
  assert(firstPart != null);
  if (isPathSeparator(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
          else {
            needsReplace = false;
          }
        }
      }
    }
  }
  if (needsReplace) {
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
    }
    if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize2(joined);
}
function relative2(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
  const fromOrig = resolve2(from);
  const toOrig = resolve2(to);
  if (fromOrig === toOrig) return "";
  from = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from === to) return "";
  let fromStart = 0;
  let fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH) break;
  }
  for (; fromEnd - 1 > fromStart; --fromEnd) {
    if (from.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 0;
  let toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH) break;
  }
  for (; toEnd - 1 > toStart; --toEnd) {
    if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i20 = 0;
  for (; i20 <= length; ++i20) {
    if (i20 === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i20) === CHAR_BACKWARD_SLASH) {
          return toOrig.slice(toStart + i20 + 1);
        } else if (i20 === 2) {
          return toOrig.slice(toStart + i20);
        }
      }
      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i20) === CHAR_BACKWARD_SLASH) {
          lastCommonSep = i20;
        } else if (i20 === 2) {
          lastCommonSep = 3;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i20);
    const toCode = to.charCodeAt(toStart + i20);
    if (fromCode !== toCode) break;
    else if (fromCode === CHAR_BACKWARD_SLASH) lastCommonSep = i20;
  }
  if (i20 !== length && lastCommonSep === -1) {
    return toOrig;
  }
  let out = "";
  if (lastCommonSep === -1) lastCommonSep = 0;
  for (i20 = fromStart + lastCommonSep + 1; i20 <= fromEnd; ++i20) {
    if (i20 === fromEnd || from.charCodeAt(i20) === CHAR_BACKWARD_SLASH) {
      if (out.length === 0) out += "..";
      else out += "\\..";
    }
  }
  if (out.length > 0) {
    return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  } else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}
function toNamespacedPath2(path5) {
  if (typeof path5 !== "string") return path5;
  if (path5.length === 0) return "";
  const resolvedPath = resolve2(path5);
  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
        const code = resolvedPath.charCodeAt(2);
        if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
      if (resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
        return `\\\\?\\${resolvedPath}`;
      }
    }
  }
  return path5;
}
function dirname2(path5) {
  assertPath(path5);
  const len = path5.length;
  if (len === 0) return ".";
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      rootEnd = offset = 1;
      if (isPathSeparator(path5.charCodeAt(1))) {
        let j17 = 2;
        let last = j17;
        for (; j17 < len; ++j17) {
          if (isPathSeparator(path5.charCodeAt(j17))) break;
        }
        if (j17 < len && j17 !== last) {
          last = j17;
          for (; j17 < len; ++j17) {
            if (!isPathSeparator(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            last = j17;
            for (; j17 < len; ++j17) {
              if (isPathSeparator(path5.charCodeAt(j17))) break;
            }
            if (j17 === len) {
              return path5;
            }
            if (j17 !== last) {
              rootEnd = offset = j17 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator(path5.charCodeAt(2))) rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    return path5;
  }
  for (let i20 = len - 1; i20 >= offset; --i20) {
    if (isPathSeparator(path5.charCodeAt(i20))) {
      if (!matchedSlash) {
        end = i20;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1) return ".";
    else end = rootEnd;
  }
  return path5.slice(0, end);
}
function basename2(path5, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath(path5);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i20;
  if (path5.length >= 2) {
    const drive = path5.charCodeAt(0);
    if (isWindowsDeviceRoot(drive)) {
      if (path5.charCodeAt(1) === CHAR_COLON) start = 2;
    }
  }
  if (ext !== void 0 && ext.length > 0 && ext.length <= path5.length) {
    if (ext.length === path5.length && ext === path5) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i20 = path5.length - 1; i20 >= start; --i20) {
      const code = path5.charCodeAt(i20);
      if (isPathSeparator(code)) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i20 + 1;
        }
        if (extIdx >= 0) {
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i20;
            }
          } else {
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) end = firstNonSlashEnd;
    else if (end === -1) end = path5.length;
    return path5.slice(start, end);
  } else {
    for (i20 = path5.length - 1; i20 >= start; --i20) {
      if (isPathSeparator(path5.charCodeAt(i20))) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i20 + 1;
      }
    }
    if (end === -1) return "";
    return path5.slice(start, end);
  }
}
function extname2(path5) {
  assertPath(path5);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  if (path5.length >= 2 && path5.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path5.charCodeAt(0))) {
    start = startPart = 2;
  }
  for (let i20 = path5.length - 1; i20 >= start; --i20) {
    const code = path5.charCodeAt(i20);
    if (isPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format2(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format("\\", pathObject);
}
function parse2(path5) {
  assertPath(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  const len = path5.length;
  if (len === 0) return ret;
  let rootEnd = 0;
  let code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      rootEnd = 1;
      if (isPathSeparator(path5.charCodeAt(1))) {
        let j17 = 2;
        let last = j17;
        for (; j17 < len; ++j17) {
          if (isPathSeparator(path5.charCodeAt(j17))) break;
        }
        if (j17 < len && j17 !== last) {
          last = j17;
          for (; j17 < len; ++j17) {
            if (!isPathSeparator(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            last = j17;
            for (; j17 < len; ++j17) {
              if (isPathSeparator(path5.charCodeAt(j17))) break;
            }
            if (j17 === len) {
              rootEnd = j17;
            } else if (j17 !== last) {
              rootEnd = j17 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON) {
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path5.charCodeAt(2))) {
            if (len === 3) {
              ret.root = ret.dir = path5;
              return ret;
            }
            rootEnd = 3;
          }
        } else {
          ret.root = ret.dir = path5;
          return ret;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    ret.root = ret.dir = path5;
    return ret;
  }
  if (rootEnd > 0) ret.root = path5.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i20 = path5.length - 1;
  let preDotState = 0;
  for (; i20 >= rootEnd; --i20) {
    code = path5.charCodeAt(i20);
    if (isPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      ret.base = ret.name = path5.slice(startPart, end);
    }
  } else {
    ret.name = path5.slice(startPart, startDot);
    ret.base = path5.slice(startPart, end);
    ret.ext = path5.slice(startDot, end);
  }
  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path5.slice(0, startPart - 1);
  } else ret.dir = ret.root;
  return ret;
}
function fromFileUrl(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  let path5 = decodeURIComponent(
    url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname != "") {
    path5 = `\\\\${url.hostname}${path5}`;
  }
  return path5;
}
function toFileUrl(path5) {
  if (!isAbsolute2(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const [, hostname2, pathname] = path5.match(
    /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/
  );
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname2 != null && hostname2 != "localhost") {
    url.hostname = hostname2;
    if (!url.hostname) {
      throw new TypeError("Invalid hostname.");
    }
  }
  return url;
}
var sep2, delimiter2;
var init_win32 = __esm({
  "https://deno.land/std@0.128.0/path/win32.ts"() {
    init_constants();
    init_util();
    init_assert();
    sep2 = "\\";
    delimiter2 = ";";
  }
});

// https://deno.land/std@0.128.0/path/posix.ts
var posix_exports = {};
__export(posix_exports, {
  basename: () => basename3,
  delimiter: () => delimiter3,
  dirname: () => dirname3,
  extname: () => extname3,
  format: () => format3,
  fromFileUrl: () => fromFileUrl2,
  isAbsolute: () => isAbsolute3,
  join: () => join4,
  normalize: () => normalize3,
  parse: () => parse3,
  relative: () => relative3,
  resolve: () => resolve3,
  sep: () => sep3,
  toFileUrl: () => toFileUrl2,
  toNamespacedPath: () => toNamespacedPath3
});
function resolve3(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let i20 = pathSegments.length - 1; i20 >= -1 && !resolvedAbsolute; i20--) {
    let path5;
    if (i20 >= 0) path5 = pathSegments[i20];
    else {
      const { Deno: Deno4 } = globalThis;
      if (typeof Deno4?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno4.cwd();
    }
    assertPath(path5);
    if (path5.length === 0) {
      continue;
    }
    resolvedPath = `${path5}/${resolvedPath}`;
    resolvedAbsolute = path5.charCodeAt(0) === CHAR_FORWARD_SLASH;
  }
  resolvedPath = normalizeString(
    resolvedPath,
    !resolvedAbsolute,
    "/",
    isPosixPathSeparator
  );
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return `/${resolvedPath}`;
    else return "/";
  } else if (resolvedPath.length > 0) return resolvedPath;
  else return ".";
}
function normalize3(path5) {
  assertPath(path5);
  if (path5.length === 0) return ".";
  const isAbsolute8 = path5.charCodeAt(0) === CHAR_FORWARD_SLASH;
  const trailingSeparator = path5.charCodeAt(path5.length - 1) === CHAR_FORWARD_SLASH;
  path5 = normalizeString(path5, !isAbsolute8, "/", isPosixPathSeparator);
  if (path5.length === 0 && !isAbsolute8) path5 = ".";
  if (path5.length > 0 && trailingSeparator) path5 += "/";
  if (isAbsolute8) return `/${path5}`;
  return path5;
}
function isAbsolute3(path5) {
  assertPath(path5);
  return path5.length > 0 && path5.charCodeAt(0) === CHAR_FORWARD_SLASH;
}
function join4(...paths) {
  if (paths.length === 0) return ".";
  let joined;
  for (let i20 = 0, len = paths.length; i20 < len; ++i20) {
    const path5 = paths[i20];
    assertPath(path5);
    if (path5.length > 0) {
      if (!joined) joined = path5;
      else joined += `/${path5}`;
    }
  }
  if (!joined) return ".";
  return normalize3(joined);
}
function relative3(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
  from = resolve3(from);
  to = resolve3(to);
  if (from === to) return "";
  let fromStart = 1;
  const fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 1;
  const toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i20 = 0;
  for (; i20 <= length; ++i20) {
    if (i20 === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i20) === CHAR_FORWARD_SLASH) {
          return to.slice(toStart + i20 + 1);
        } else if (i20 === 0) {
          return to.slice(toStart + i20);
        }
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i20) === CHAR_FORWARD_SLASH) {
          lastCommonSep = i20;
        } else if (i20 === 0) {
          lastCommonSep = 0;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i20);
    const toCode = to.charCodeAt(toStart + i20);
    if (fromCode !== toCode) break;
    else if (fromCode === CHAR_FORWARD_SLASH) lastCommonSep = i20;
  }
  let out = "";
  for (i20 = fromStart + lastCommonSep + 1; i20 <= fromEnd; ++i20) {
    if (i20 === fromEnd || from.charCodeAt(i20) === CHAR_FORWARD_SLASH) {
      if (out.length === 0) out += "..";
      else out += "/..";
    }
  }
  if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
  else {
    toStart += lastCommonSep;
    if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH) ++toStart;
    return to.slice(toStart);
  }
}
function toNamespacedPath3(path5) {
  return path5;
}
function dirname3(path5) {
  assertPath(path5);
  if (path5.length === 0) return ".";
  const hasRoot = path5.charCodeAt(0) === CHAR_FORWARD_SLASH;
  let end = -1;
  let matchedSlash = true;
  for (let i20 = path5.length - 1; i20 >= 1; --i20) {
    if (path5.charCodeAt(i20) === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        end = i20;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) return hasRoot ? "/" : ".";
  if (hasRoot && end === 1) return "//";
  return path5.slice(0, end);
}
function basename3(path5, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath(path5);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i20;
  if (ext !== void 0 && ext.length > 0 && ext.length <= path5.length) {
    if (ext.length === path5.length && ext === path5) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i20 = path5.length - 1; i20 >= 0; --i20) {
      const code = path5.charCodeAt(i20);
      if (code === CHAR_FORWARD_SLASH) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i20 + 1;
        }
        if (extIdx >= 0) {
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i20;
            }
          } else {
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) end = firstNonSlashEnd;
    else if (end === -1) end = path5.length;
    return path5.slice(start, end);
  } else {
    for (i20 = path5.length - 1; i20 >= 0; --i20) {
      if (path5.charCodeAt(i20) === CHAR_FORWARD_SLASH) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i20 + 1;
      }
    }
    if (end === -1) return "";
    return path5.slice(start, end);
  }
}
function extname3(path5) {
  assertPath(path5);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  for (let i20 = path5.length - 1; i20 >= 0; --i20) {
    const code = path5.charCodeAt(i20);
    if (code === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format3(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format("/", pathObject);
}
function parse3(path5) {
  assertPath(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path5.length === 0) return ret;
  const isAbsolute8 = path5.charCodeAt(0) === CHAR_FORWARD_SLASH;
  let start;
  if (isAbsolute8) {
    ret.root = "/";
    start = 1;
  } else {
    start = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i20 = path5.length - 1;
  let preDotState = 0;
  for (; i20 >= start; --i20) {
    const code = path5.charCodeAt(i20);
    if (code === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute8) {
        ret.base = ret.name = path5.slice(1, end);
      } else {
        ret.base = ret.name = path5.slice(startPart, end);
      }
    }
  } else {
    if (startPart === 0 && isAbsolute8) {
      ret.name = path5.slice(1, startDot);
      ret.base = path5.slice(1, end);
    } else {
      ret.name = path5.slice(startPart, startDot);
      ret.base = path5.slice(startPart, end);
    }
    ret.ext = path5.slice(startDot, end);
  }
  if (startPart > 0) ret.dir = path5.slice(0, startPart - 1);
  else if (isAbsolute8) ret.dir = "/";
  return ret;
}
function fromFileUrl2(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  );
}
function toFileUrl2(path5) {
  if (!isAbsolute3(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(
    path5.replace(/%/g, "%25").replace(/\\/g, "%5C")
  );
  return url;
}
var sep3, delimiter3;
var init_posix = __esm({
  "https://deno.land/std@0.128.0/path/posix.ts"() {
    init_constants();
    init_util();
    sep3 = "/";
    delimiter3 = ":";
  }
});

// https://deno.land/std@0.128.0/path/separator.ts
var init_separator = __esm({
  "https://deno.land/std@0.128.0/path/separator.ts"() {
    init_os();
  }
});

// https://deno.land/std@0.128.0/path/common.ts
var init_common = __esm({
  "https://deno.land/std@0.128.0/path/common.ts"() {
    init_separator();
  }
});

// https://deno.land/std@0.128.0/path/_interface.ts
var init_interface = __esm({
  "https://deno.land/std@0.128.0/path/_interface.ts"() {
  }
});

// https://deno.land/std@0.128.0/path/glob.ts
var path, join5, normalize4;
var init_glob = __esm({
  "https://deno.land/std@0.128.0/path/glob.ts"() {
    init_os();
    init_separator();
    init_win32();
    init_posix();
    path = isWindows ? win32_exports : posix_exports;
    ({ join: join5, normalize: normalize4 } = path);
  }
});

// https://deno.land/std@0.128.0/path/mod.ts
var path2, basename4, delimiter4, dirname4, extname4, format4, fromFileUrl3, isAbsolute4, join6, normalize5, parse4, relative4, resolve4, sep4, toFileUrl3, toNamespacedPath4;
var init_mod = __esm({
  "https://deno.land/std@0.128.0/path/mod.ts"() {
    init_os();
    init_win32();
    init_posix();
    init_common();
    init_separator();
    init_interface();
    init_glob();
    path2 = isWindows ? win32_exports : posix_exports;
    ({
      basename: basename4,
      delimiter: delimiter4,
      dirname: dirname4,
      extname: extname4,
      format: format4,
      fromFileUrl: fromFileUrl3,
      isAbsolute: isAbsolute4,
      join: join6,
      normalize: normalize5,
      parse: parse4,
      relative: relative4,
      resolve: resolve4,
      sep: sep4,
      toFileUrl: toFileUrl3,
      toNamespacedPath: toNamespacedPath4
    } = path2);
  }
});

// https://deno.land/std@0.133.0/_util/os.ts
var osType2, isWindows2;
var init_os2 = __esm({
  "https://deno.land/std@0.133.0/_util/os.ts"() {
    osType2 = (() => {
      const { Deno: Deno4 } = globalThis;
      if (typeof Deno4?.build?.os === "string") {
        return Deno4.build.os;
      }
      const { navigator } = globalThis;
      if (navigator?.appVersion?.includes?.("Win") ?? false) {
        return "windows";
      }
      return "linux";
    })();
    isWindows2 = osType2 === "windows";
  }
});

// https://deno.land/std@0.133.0/path/_constants.ts
var CHAR_UPPERCASE_A2, CHAR_LOWERCASE_A2, CHAR_UPPERCASE_Z2, CHAR_LOWERCASE_Z2, CHAR_DOT2, CHAR_FORWARD_SLASH2, CHAR_BACKWARD_SLASH2, CHAR_COLON2, CHAR_QUESTION_MARK2;
var init_constants2 = __esm({
  "https://deno.land/std@0.133.0/path/_constants.ts"() {
    CHAR_UPPERCASE_A2 = 65;
    CHAR_LOWERCASE_A2 = 97;
    CHAR_UPPERCASE_Z2 = 90;
    CHAR_LOWERCASE_Z2 = 122;
    CHAR_DOT2 = 46;
    CHAR_FORWARD_SLASH2 = 47;
    CHAR_BACKWARD_SLASH2 = 92;
    CHAR_COLON2 = 58;
    CHAR_QUESTION_MARK2 = 63;
  }
});

// https://deno.land/std@0.133.0/path/_util.ts
function assertPath2(path5) {
  if (typeof path5 !== "string") {
    throw new TypeError(
      `Path must be a string. Received ${JSON.stringify(path5)}`
    );
  }
}
function isPosixPathSeparator2(code) {
  return code === CHAR_FORWARD_SLASH2;
}
function isPathSeparator2(code) {
  return isPosixPathSeparator2(code) || code === CHAR_BACKWARD_SLASH2;
}
function isWindowsDeviceRoot2(code) {
  return code >= CHAR_LOWERCASE_A2 && code <= CHAR_LOWERCASE_Z2 || code >= CHAR_UPPERCASE_A2 && code <= CHAR_UPPERCASE_Z2;
}
function normalizeString2(path5, allowAboveRoot, separator, isPathSeparator4) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for (let i20 = 0, len = path5.length; i20 <= len; ++i20) {
    if (i20 < len) code = path5.charCodeAt(i20);
    else if (isPathSeparator4(code)) break;
    else code = CHAR_FORWARD_SLASH2;
    if (isPathSeparator4(code)) {
      if (lastSlash === i20 - 1 || dots === 1) {
      } else if (lastSlash !== i20 - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT2 || res.charCodeAt(res.length - 2) !== CHAR_DOT2) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i20;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i20;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path5.slice(lastSlash + 1, i20);
        else res = path5.slice(lastSlash + 1, i20);
        lastSegmentLength = i20 - lastSlash - 1;
      }
      lastSlash = i20;
      dots = 0;
    } else if (code === CHAR_DOT2 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format2(sep9, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) return base;
  if (dir === pathObject.root) return dir + base;
  return dir + sep9 + base;
}
function encodeWhitespace2(string) {
  return string.replaceAll(/[\s]/g, (c24) => {
    return WHITESPACE_ENCODINGS2[c24] ?? c24;
  });
}
var WHITESPACE_ENCODINGS2;
var init_util2 = __esm({
  "https://deno.land/std@0.133.0/path/_util.ts"() {
    init_constants2();
    WHITESPACE_ENCODINGS2 = {
      "	": "%09",
      "\n": "%0A",
      "\v": "%0B",
      "\f": "%0C",
      "\r": "%0D",
      " ": "%20"
    };
  }
});

// https://deno.land/std@0.133.0/_util/assert.ts
function assert2(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError2(msg);
  }
}
var DenoStdInternalError2;
var init_assert2 = __esm({
  "https://deno.land/std@0.133.0/_util/assert.ts"() {
    DenoStdInternalError2 = class extends Error {
      constructor(message2) {
        super(message2);
        this.name = "DenoStdInternalError";
      }
    };
  }
});

// https://deno.land/std@0.133.0/path/win32.ts
var win32_exports2 = {};
__export(win32_exports2, {
  basename: () => basename5,
  delimiter: () => delimiter5,
  dirname: () => dirname5,
  extname: () => extname5,
  format: () => format5,
  fromFileUrl: () => fromFileUrl4,
  isAbsolute: () => isAbsolute5,
  join: () => join7,
  normalize: () => normalize6,
  parse: () => parse5,
  relative: () => relative5,
  resolve: () => resolve5,
  sep: () => sep5,
  toFileUrl: () => toFileUrl4,
  toNamespacedPath: () => toNamespacedPath5
});
function resolve5(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for (let i20 = pathSegments.length - 1; i20 >= -1; i20--) {
    let path5;
    const { Deno: Deno4 } = globalThis;
    if (i20 >= 0) {
      path5 = pathSegments[i20];
    } else if (!resolvedDevice) {
      if (typeof Deno4?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a CWD.");
      }
      path5 = Deno4.cwd();
    } else {
      if (typeof Deno4?.env?.get !== "function" || typeof Deno4?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno4.cwd();
      if (path5 === void 0 || path5.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path5 = `${resolvedDevice}\\`;
      }
    }
    assertPath2(path5);
    const len = path5.length;
    if (len === 0) continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute8 = false;
    const code = path5.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator2(code)) {
        isAbsolute8 = true;
        if (isPathSeparator2(path5.charCodeAt(1))) {
          let j17 = 2;
          let last = j17;
          for (; j17 < len; ++j17) {
            if (isPathSeparator2(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            const firstPart = path5.slice(last, j17);
            last = j17;
            for (; j17 < len; ++j17) {
              if (!isPathSeparator2(path5.charCodeAt(j17))) break;
            }
            if (j17 < len && j17 !== last) {
              last = j17;
              for (; j17 < len; ++j17) {
                if (isPathSeparator2(path5.charCodeAt(j17))) break;
              }
              if (j17 === len) {
                device = `\\\\${firstPart}\\${path5.slice(last)}`;
                rootEnd = j17;
              } else if (j17 !== last) {
                device = `\\\\${firstPart}\\${path5.slice(last, j17)}`;
                rootEnd = j17;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot2(code)) {
        if (path5.charCodeAt(1) === CHAR_COLON2) {
          device = path5.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator2(path5.charCodeAt(2))) {
              isAbsolute8 = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator2(code)) {
      rootEnd = 1;
      isAbsolute8 = true;
    }
    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      continue;
    }
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path5.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute8;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0) break;
  }
  resolvedTail = normalizeString2(
    resolvedTail,
    !resolvedAbsolute,
    "\\",
    isPathSeparator2
  );
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize6(path5) {
  assertPath2(path5);
  const len = path5.length;
  if (len === 0) return ".";
  let rootEnd = 0;
  let device;
  let isAbsolute8 = false;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator2(code)) {
      isAbsolute8 = true;
      if (isPathSeparator2(path5.charCodeAt(1))) {
        let j17 = 2;
        let last = j17;
        for (; j17 < len; ++j17) {
          if (isPathSeparator2(path5.charCodeAt(j17))) break;
        }
        if (j17 < len && j17 !== last) {
          const firstPart = path5.slice(last, j17);
          last = j17;
          for (; j17 < len; ++j17) {
            if (!isPathSeparator2(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            last = j17;
            for (; j17 < len; ++j17) {
              if (isPathSeparator2(path5.charCodeAt(j17))) break;
            }
            if (j17 === len) {
              return `\\\\${firstPart}\\${path5.slice(last)}\\`;
            } else if (j17 !== last) {
              device = `\\\\${firstPart}\\${path5.slice(last, j17)}`;
              rootEnd = j17;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot2(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON2) {
        device = path5.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator2(path5.charCodeAt(2))) {
            isAbsolute8 = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator2(code)) {
    return "\\";
  }
  let tail;
  if (rootEnd < len) {
    tail = normalizeString2(
      path5.slice(rootEnd),
      !isAbsolute8,
      "\\",
      isPathSeparator2
    );
  } else {
    tail = "";
  }
  if (tail.length === 0 && !isAbsolute8) tail = ".";
  if (tail.length > 0 && isPathSeparator2(path5.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === void 0) {
    if (isAbsolute8) {
      if (tail.length > 0) return `\\${tail}`;
      else return "\\";
    } else if (tail.length > 0) {
      return tail;
    } else {
      return "";
    }
  } else if (isAbsolute8) {
    if (tail.length > 0) return `${device}\\${tail}`;
    else return `${device}\\`;
  } else if (tail.length > 0) {
    return device + tail;
  } else {
    return device;
  }
}
function isAbsolute5(path5) {
  assertPath2(path5);
  const len = path5.length;
  if (len === 0) return false;
  const code = path5.charCodeAt(0);
  if (isPathSeparator2(code)) {
    return true;
  } else if (isWindowsDeviceRoot2(code)) {
    if (len > 2 && path5.charCodeAt(1) === CHAR_COLON2) {
      if (isPathSeparator2(path5.charCodeAt(2))) return true;
    }
  }
  return false;
}
function join7(...paths) {
  const pathsCount = paths.length;
  if (pathsCount === 0) return ".";
  let joined;
  let firstPart = null;
  for (let i20 = 0; i20 < pathsCount; ++i20) {
    const path5 = paths[i20];
    assertPath2(path5);
    if (path5.length > 0) {
      if (joined === void 0) joined = firstPart = path5;
      else joined += `\\${path5}`;
    }
  }
  if (joined === void 0) return ".";
  let needsReplace = true;
  let slashCount = 0;
  assert2(firstPart != null);
  if (isPathSeparator2(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator2(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator2(firstPart.charCodeAt(2))) ++slashCount;
          else {
            needsReplace = false;
          }
        }
      }
    }
  }
  if (needsReplace) {
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator2(joined.charCodeAt(slashCount))) break;
    }
    if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize6(joined);
}
function relative5(from, to) {
  assertPath2(from);
  assertPath2(to);
  if (from === to) return "";
  const fromOrig = resolve5(from);
  const toOrig = resolve5(to);
  if (fromOrig === toOrig) return "";
  from = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from === to) return "";
  let fromStart = 0;
  let fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH2) break;
  }
  for (; fromEnd - 1 > fromStart; --fromEnd) {
    if (from.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH2) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 0;
  let toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH2) break;
  }
  for (; toEnd - 1 > toStart; --toEnd) {
    if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH2) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i20 = 0;
  for (; i20 <= length; ++i20) {
    if (i20 === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i20) === CHAR_BACKWARD_SLASH2) {
          return toOrig.slice(toStart + i20 + 1);
        } else if (i20 === 2) {
          return toOrig.slice(toStart + i20);
        }
      }
      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i20) === CHAR_BACKWARD_SLASH2) {
          lastCommonSep = i20;
        } else if (i20 === 2) {
          lastCommonSep = 3;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i20);
    const toCode = to.charCodeAt(toStart + i20);
    if (fromCode !== toCode) break;
    else if (fromCode === CHAR_BACKWARD_SLASH2) lastCommonSep = i20;
  }
  if (i20 !== length && lastCommonSep === -1) {
    return toOrig;
  }
  let out = "";
  if (lastCommonSep === -1) lastCommonSep = 0;
  for (i20 = fromStart + lastCommonSep + 1; i20 <= fromEnd; ++i20) {
    if (i20 === fromEnd || from.charCodeAt(i20) === CHAR_BACKWARD_SLASH2) {
      if (out.length === 0) out += "..";
      else out += "\\..";
    }
  }
  if (out.length > 0) {
    return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  } else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH2) ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}
function toNamespacedPath5(path5) {
  if (typeof path5 !== "string") return path5;
  if (path5.length === 0) return "";
  const resolvedPath = resolve5(path5);
  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH2) {
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH2) {
        const code = resolvedPath.charCodeAt(2);
        if (code !== CHAR_QUESTION_MARK2 && code !== CHAR_DOT2) {
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot2(resolvedPath.charCodeAt(0))) {
      if (resolvedPath.charCodeAt(1) === CHAR_COLON2 && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH2) {
        return `\\\\?\\${resolvedPath}`;
      }
    }
  }
  return path5;
}
function dirname5(path5) {
  assertPath2(path5);
  const len = path5.length;
  if (len === 0) return ".";
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator2(code)) {
      rootEnd = offset = 1;
      if (isPathSeparator2(path5.charCodeAt(1))) {
        let j17 = 2;
        let last = j17;
        for (; j17 < len; ++j17) {
          if (isPathSeparator2(path5.charCodeAt(j17))) break;
        }
        if (j17 < len && j17 !== last) {
          last = j17;
          for (; j17 < len; ++j17) {
            if (!isPathSeparator2(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            last = j17;
            for (; j17 < len; ++j17) {
              if (isPathSeparator2(path5.charCodeAt(j17))) break;
            }
            if (j17 === len) {
              return path5;
            }
            if (j17 !== last) {
              rootEnd = offset = j17 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot2(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON2) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator2(path5.charCodeAt(2))) rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator2(code)) {
    return path5;
  }
  for (let i20 = len - 1; i20 >= offset; --i20) {
    if (isPathSeparator2(path5.charCodeAt(i20))) {
      if (!matchedSlash) {
        end = i20;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1) return ".";
    else end = rootEnd;
  }
  return path5.slice(0, end);
}
function basename5(path5, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath2(path5);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i20;
  if (path5.length >= 2) {
    const drive = path5.charCodeAt(0);
    if (isWindowsDeviceRoot2(drive)) {
      if (path5.charCodeAt(1) === CHAR_COLON2) start = 2;
    }
  }
  if (ext !== void 0 && ext.length > 0 && ext.length <= path5.length) {
    if (ext.length === path5.length && ext === path5) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i20 = path5.length - 1; i20 >= start; --i20) {
      const code = path5.charCodeAt(i20);
      if (isPathSeparator2(code)) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i20 + 1;
        }
        if (extIdx >= 0) {
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i20;
            }
          } else {
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) end = firstNonSlashEnd;
    else if (end === -1) end = path5.length;
    return path5.slice(start, end);
  } else {
    for (i20 = path5.length - 1; i20 >= start; --i20) {
      if (isPathSeparator2(path5.charCodeAt(i20))) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i20 + 1;
      }
    }
    if (end === -1) return "";
    return path5.slice(start, end);
  }
}
function extname5(path5) {
  assertPath2(path5);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  if (path5.length >= 2 && path5.charCodeAt(1) === CHAR_COLON2 && isWindowsDeviceRoot2(path5.charCodeAt(0))) {
    start = startPart = 2;
  }
  for (let i20 = path5.length - 1; i20 >= start; --i20) {
    const code = path5.charCodeAt(i20);
    if (isPathSeparator2(code)) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format5(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format2("\\", pathObject);
}
function parse5(path5) {
  assertPath2(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  const len = path5.length;
  if (len === 0) return ret;
  let rootEnd = 0;
  let code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator2(code)) {
      rootEnd = 1;
      if (isPathSeparator2(path5.charCodeAt(1))) {
        let j17 = 2;
        let last = j17;
        for (; j17 < len; ++j17) {
          if (isPathSeparator2(path5.charCodeAt(j17))) break;
        }
        if (j17 < len && j17 !== last) {
          last = j17;
          for (; j17 < len; ++j17) {
            if (!isPathSeparator2(path5.charCodeAt(j17))) break;
          }
          if (j17 < len && j17 !== last) {
            last = j17;
            for (; j17 < len; ++j17) {
              if (isPathSeparator2(path5.charCodeAt(j17))) break;
            }
            if (j17 === len) {
              rootEnd = j17;
            } else if (j17 !== last) {
              rootEnd = j17 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot2(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON2) {
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator2(path5.charCodeAt(2))) {
            if (len === 3) {
              ret.root = ret.dir = path5;
              return ret;
            }
            rootEnd = 3;
          }
        } else {
          ret.root = ret.dir = path5;
          return ret;
        }
      }
    }
  } else if (isPathSeparator2(code)) {
    ret.root = ret.dir = path5;
    return ret;
  }
  if (rootEnd > 0) ret.root = path5.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i20 = path5.length - 1;
  let preDotState = 0;
  for (; i20 >= rootEnd; --i20) {
    code = path5.charCodeAt(i20);
    if (isPathSeparator2(code)) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      ret.base = ret.name = path5.slice(startPart, end);
    }
  } else {
    ret.name = path5.slice(startPart, startDot);
    ret.base = path5.slice(startPart, end);
    ret.ext = path5.slice(startDot, end);
  }
  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path5.slice(0, startPart - 1);
  } else ret.dir = ret.root;
  return ret;
}
function fromFileUrl4(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  let path5 = decodeURIComponent(
    url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname != "") {
    path5 = `\\\\${url.hostname}${path5}`;
  }
  return path5;
}
function toFileUrl4(path5) {
  if (!isAbsolute5(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const [, hostname2, pathname] = path5.match(
    /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/
  );
  const url = new URL("file:///");
  url.pathname = encodeWhitespace2(pathname.replace(/%/g, "%25"));
  if (hostname2 != null && hostname2 != "localhost") {
    url.hostname = hostname2;
    if (!url.hostname) {
      throw new TypeError("Invalid hostname.");
    }
  }
  return url;
}
var sep5, delimiter5;
var init_win322 = __esm({
  "https://deno.land/std@0.133.0/path/win32.ts"() {
    init_constants2();
    init_util2();
    init_assert2();
    sep5 = "\\";
    delimiter5 = ";";
  }
});

// https://deno.land/std@0.133.0/path/posix.ts
var posix_exports2 = {};
__export(posix_exports2, {
  basename: () => basename6,
  delimiter: () => delimiter6,
  dirname: () => dirname6,
  extname: () => extname6,
  format: () => format6,
  fromFileUrl: () => fromFileUrl5,
  isAbsolute: () => isAbsolute6,
  join: () => join8,
  normalize: () => normalize7,
  parse: () => parse6,
  relative: () => relative6,
  resolve: () => resolve6,
  sep: () => sep6,
  toFileUrl: () => toFileUrl5,
  toNamespacedPath: () => toNamespacedPath6
});
function resolve6(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let i20 = pathSegments.length - 1; i20 >= -1 && !resolvedAbsolute; i20--) {
    let path5;
    if (i20 >= 0) path5 = pathSegments[i20];
    else {
      const { Deno: Deno4 } = globalThis;
      if (typeof Deno4?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno4.cwd();
    }
    assertPath2(path5);
    if (path5.length === 0) {
      continue;
    }
    resolvedPath = `${path5}/${resolvedPath}`;
    resolvedAbsolute = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  }
  resolvedPath = normalizeString2(
    resolvedPath,
    !resolvedAbsolute,
    "/",
    isPosixPathSeparator2
  );
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return `/${resolvedPath}`;
    else return "/";
  } else if (resolvedPath.length > 0) return resolvedPath;
  else return ".";
}
function normalize7(path5) {
  assertPath2(path5);
  if (path5.length === 0) return ".";
  const isAbsolute8 = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  const trailingSeparator = path5.charCodeAt(path5.length - 1) === CHAR_FORWARD_SLASH2;
  path5 = normalizeString2(path5, !isAbsolute8, "/", isPosixPathSeparator2);
  if (path5.length === 0 && !isAbsolute8) path5 = ".";
  if (path5.length > 0 && trailingSeparator) path5 += "/";
  if (isAbsolute8) return `/${path5}`;
  return path5;
}
function isAbsolute6(path5) {
  assertPath2(path5);
  return path5.length > 0 && path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
}
function join8(...paths) {
  if (paths.length === 0) return ".";
  let joined;
  for (let i20 = 0, len = paths.length; i20 < len; ++i20) {
    const path5 = paths[i20];
    assertPath2(path5);
    if (path5.length > 0) {
      if (!joined) joined = path5;
      else joined += `/${path5}`;
    }
  }
  if (!joined) return ".";
  return normalize7(joined);
}
function relative6(from, to) {
  assertPath2(from);
  assertPath2(to);
  if (from === to) return "";
  from = resolve6(from);
  to = resolve6(to);
  if (from === to) return "";
  let fromStart = 1;
  const fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH2) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 1;
  const toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH2) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i20 = 0;
  for (; i20 <= length; ++i20) {
    if (i20 === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i20) === CHAR_FORWARD_SLASH2) {
          return to.slice(toStart + i20 + 1);
        } else if (i20 === 0) {
          return to.slice(toStart + i20);
        }
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i20) === CHAR_FORWARD_SLASH2) {
          lastCommonSep = i20;
        } else if (i20 === 0) {
          lastCommonSep = 0;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i20);
    const toCode = to.charCodeAt(toStart + i20);
    if (fromCode !== toCode) break;
    else if (fromCode === CHAR_FORWARD_SLASH2) lastCommonSep = i20;
  }
  let out = "";
  for (i20 = fromStart + lastCommonSep + 1; i20 <= fromEnd; ++i20) {
    if (i20 === fromEnd || from.charCodeAt(i20) === CHAR_FORWARD_SLASH2) {
      if (out.length === 0) out += "..";
      else out += "/..";
    }
  }
  if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
  else {
    toStart += lastCommonSep;
    if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH2) ++toStart;
    return to.slice(toStart);
  }
}
function toNamespacedPath6(path5) {
  return path5;
}
function dirname6(path5) {
  assertPath2(path5);
  if (path5.length === 0) return ".";
  const hasRoot = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  let end = -1;
  let matchedSlash = true;
  for (let i20 = path5.length - 1; i20 >= 1; --i20) {
    if (path5.charCodeAt(i20) === CHAR_FORWARD_SLASH2) {
      if (!matchedSlash) {
        end = i20;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) return hasRoot ? "/" : ".";
  if (hasRoot && end === 1) return "//";
  return path5.slice(0, end);
}
function basename6(path5, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath2(path5);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i20;
  if (ext !== void 0 && ext.length > 0 && ext.length <= path5.length) {
    if (ext.length === path5.length && ext === path5) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i20 = path5.length - 1; i20 >= 0; --i20) {
      const code = path5.charCodeAt(i20);
      if (code === CHAR_FORWARD_SLASH2) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i20 + 1;
        }
        if (extIdx >= 0) {
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i20;
            }
          } else {
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) end = firstNonSlashEnd;
    else if (end === -1) end = path5.length;
    return path5.slice(start, end);
  } else {
    for (i20 = path5.length - 1; i20 >= 0; --i20) {
      if (path5.charCodeAt(i20) === CHAR_FORWARD_SLASH2) {
        if (!matchedSlash) {
          start = i20 + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i20 + 1;
      }
    }
    if (end === -1) return "";
    return path5.slice(start, end);
  }
}
function extname6(path5) {
  assertPath2(path5);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  for (let i20 = path5.length - 1; i20 >= 0; --i20) {
    const code = path5.charCodeAt(i20);
    if (code === CHAR_FORWARD_SLASH2) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format6(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format2("/", pathObject);
}
function parse6(path5) {
  assertPath2(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path5.length === 0) return ret;
  const isAbsolute8 = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  let start;
  if (isAbsolute8) {
    ret.root = "/";
    start = 1;
  } else {
    start = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i20 = path5.length - 1;
  let preDotState = 0;
  for (; i20 >= start; --i20) {
    const code = path5.charCodeAt(i20);
    if (code === CHAR_FORWARD_SLASH2) {
      if (!matchedSlash) {
        startPart = i20 + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i20 + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1) startDot = i20;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute8) {
        ret.base = ret.name = path5.slice(1, end);
      } else {
        ret.base = ret.name = path5.slice(startPart, end);
      }
    }
  } else {
    if (startPart === 0 && isAbsolute8) {
      ret.name = path5.slice(1, startDot);
      ret.base = path5.slice(1, end);
    } else {
      ret.name = path5.slice(startPart, startDot);
      ret.base = path5.slice(startPart, end);
    }
    ret.ext = path5.slice(startDot, end);
  }
  if (startPart > 0) ret.dir = path5.slice(0, startPart - 1);
  else if (isAbsolute8) ret.dir = "/";
  return ret;
}
function fromFileUrl5(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  );
}
function toFileUrl5(path5) {
  if (!isAbsolute6(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const url = new URL("file:///");
  url.pathname = encodeWhitespace2(
    path5.replace(/%/g, "%25").replace(/\\/g, "%5C")
  );
  return url;
}
var sep6, delimiter6;
var init_posix2 = __esm({
  "https://deno.land/std@0.133.0/path/posix.ts"() {
    init_constants2();
    init_util2();
    sep6 = "/";
    delimiter6 = ":";
  }
});

// https://deno.land/std@0.133.0/path/separator.ts
var init_separator2 = __esm({
  "https://deno.land/std@0.133.0/path/separator.ts"() {
    init_os2();
  }
});

// https://deno.land/std@0.133.0/path/common.ts
var init_common2 = __esm({
  "https://deno.land/std@0.133.0/path/common.ts"() {
    init_separator2();
  }
});

// https://deno.land/std@0.133.0/path/_interface.ts
var init_interface2 = __esm({
  "https://deno.land/std@0.133.0/path/_interface.ts"() {
  }
});

// https://deno.land/std@0.133.0/path/glob.ts
var path3, join9, normalize8;
var init_glob2 = __esm({
  "https://deno.land/std@0.133.0/path/glob.ts"() {
    init_os2();
    init_separator2();
    init_win322();
    init_posix2();
    path3 = isWindows2 ? win32_exports2 : posix_exports2;
    ({ join: join9, normalize: normalize8 } = path3);
  }
});

// https://deno.land/std@0.133.0/path/mod.ts
var path4, basename7, delimiter7, dirname7, extname7, format7, fromFileUrl6, isAbsolute7, join10, normalize9, parse7, relative7, resolve7, sep7, toFileUrl6, toNamespacedPath7;
var init_mod2 = __esm({
  "https://deno.land/std@0.133.0/path/mod.ts"() {
    init_os2();
    init_win322();
    init_posix2();
    init_common2();
    init_separator2();
    init_interface2();
    init_glob2();
    path4 = isWindows2 ? win32_exports2 : posix_exports2;
    ({
      basename: basename7,
      delimiter: delimiter7,
      dirname: dirname7,
      extname: extname7,
      format: format7,
      fromFileUrl: fromFileUrl6,
      isAbsolute: isAbsolute7,
      join: join10,
      normalize: normalize9,
      parse: parse7,
      relative: relative7,
      resolve: resolve7,
      sep: sep7,
      toFileUrl: toFileUrl6,
      toNamespacedPath: toNamespacedPath7
    } = path4);
  }
});

// https://deno.land/std@0.133.0/fs/empty_dir.ts
var init_empty_dir = __esm({
  "https://deno.land/std@0.133.0/fs/empty_dir.ts"() {
    init_mod2();
  }
});

// https://deno.land/std@0.133.0/fs/_util.ts
function isSubdir(src, dest, sep9 = sep7) {
  if (src === dest) {
    return false;
  }
  const srcArray = src.split(sep9);
  const destArray = dest.split(sep9);
  return srcArray.every((current, i20) => destArray[i20] === current);
}
function getFileInfoType(fileInfo) {
  return fileInfo.isFile ? "file" : fileInfo.isDirectory ? "dir" : fileInfo.isSymlink ? "symlink" : void 0;
}
var init_util3 = __esm({
  "https://deno.land/std@0.133.0/fs/_util.ts"() {
    init_mod2();
  }
});

// https://deno.land/std@0.133.0/fs/ensure_dir.ts
async function ensureDir(dir) {
  try {
    const fileInfo = await Deno.lstat(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${getFileInfoType(fileInfo)}'`
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      await Deno.mkdir(dir, { recursive: true });
      return;
    }
    throw err;
  }
}
function ensureDirSync(dir) {
  try {
    const fileInfo = Deno.lstatSync(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${getFileInfoType(fileInfo)}'`
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      Deno.mkdirSync(dir, { recursive: true });
      return;
    }
    throw err;
  }
}
var init_ensure_dir = __esm({
  "https://deno.land/std@0.133.0/fs/ensure_dir.ts"() {
    init_util3();
  }
});

// https://deno.land/std@0.133.0/fs/ensure_file.ts
var init_ensure_file = __esm({
  "https://deno.land/std@0.133.0/fs/ensure_file.ts"() {
    init_mod2();
    init_ensure_dir();
    init_util3();
  }
});

// https://deno.land/std@0.133.0/fs/exists.ts
async function exists(filePath) {
  try {
    await Deno.lstat(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}
function existsSync(filePath) {
  try {
    Deno.lstatSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}
var init_exists = __esm({
  "https://deno.land/std@0.133.0/fs/exists.ts"() {
  }
});

// https://deno.land/std@0.133.0/fs/ensure_link.ts
var init_ensure_link = __esm({
  "https://deno.land/std@0.133.0/fs/ensure_link.ts"() {
    init_mod2();
    init_ensure_dir();
    init_exists();
    init_util3();
  }
});

// https://deno.land/std@0.133.0/fs/ensure_symlink.ts
var init_ensure_symlink = __esm({
  "https://deno.land/std@0.133.0/fs/ensure_symlink.ts"() {
    init_mod2();
    init_ensure_dir();
    init_exists();
    init_util3();
    init_os2();
  }
});

// https://deno.land/std@0.133.0/fs/walk.ts
var init_walk = __esm({
  "https://deno.land/std@0.133.0/fs/walk.ts"() {
    init_assert2();
    init_mod2();
  }
});

// https://deno.land/std@0.133.0/fs/expand_glob.ts
var init_expand_glob = __esm({
  "https://deno.land/std@0.133.0/fs/expand_glob.ts"() {
    init_mod2();
    init_walk();
    init_assert2();
    init_os2();
  }
});

// https://deno.land/std@0.133.0/fs/move.ts
async function move(src, dest, { overwrite = false } = {}) {
  const srcStat = await Deno.stat(src);
  if (srcStat.isDirectory && isSubdir(src, dest)) {
    throw new Error(
      `Cannot move '${src}' to a subdirectory of itself, '${dest}'.`
    );
  }
  if (overwrite) {
    if (await exists(dest)) {
      await Deno.remove(dest, { recursive: true });
    }
  } else {
    if (await exists(dest)) {
      throw new Error("dest already exists.");
    }
  }
  await Deno.rename(src, dest);
  return;
}
function moveSync(src, dest, { overwrite = false } = {}) {
  const srcStat = Deno.statSync(src);
  if (srcStat.isDirectory && isSubdir(src, dest)) {
    throw new Error(
      `Cannot move '${src}' to a subdirectory of itself, '${dest}'.`
    );
  }
  if (overwrite) {
    if (existsSync(dest)) {
      Deno.removeSync(dest, { recursive: true });
    }
  } else {
    if (existsSync(dest)) {
      throw new Error("dest already exists.");
    }
  }
  Deno.renameSync(src, dest);
}
var init_move = __esm({
  "https://deno.land/std@0.133.0/fs/move.ts"() {
    init_exists();
    init_util3();
  }
});

// https://deno.land/std@0.133.0/_deno_unstable.ts
function utime(...args2) {
  if (typeof Deno.utime == "function") {
    return Deno.utime(...args2);
  } else {
    return Promise.reject(new TypeError("Requires --unstable"));
  }
}
function utimeSync(...args2) {
  if (typeof Deno.utimeSync == "function") {
    return Deno.utimeSync(...args2);
  } else {
    throw new TypeError("Requires --unstable");
  }
}
var init_deno_unstable = __esm({
  "https://deno.land/std@0.133.0/_deno_unstable.ts"() {
  }
});

// https://deno.land/std@0.133.0/fs/copy.ts
async function ensureValidCopy(src, dest, options) {
  let destStat;
  try {
    destStat = await Deno.lstat(dest);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return;
    }
    throw err;
  }
  if (options.isFolder && !destStat.isDirectory) {
    throw new Error(
      `Cannot overwrite non-directory '${dest}' with directory '${src}'.`
    );
  }
  if (!options.overwrite) {
    throw new Error(`'${dest}' already exists.`);
  }
  return destStat;
}
function ensureValidCopySync(src, dest, options) {
  let destStat;
  try {
    destStat = Deno.lstatSync(dest);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return;
    }
    throw err;
  }
  if (options.isFolder && !destStat.isDirectory) {
    throw new Error(
      `Cannot overwrite non-directory '${dest}' with directory '${src}'.`
    );
  }
  if (!options.overwrite) {
    throw new Error(`'${dest}' already exists.`);
  }
  return destStat;
}
async function copyFile(src, dest, options) {
  await ensureValidCopy(src, dest, options);
  await Deno.copyFile(src, dest);
  if (options.preserveTimestamps) {
    const statInfo = await Deno.stat(src);
    assert2(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert2(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    await utime(dest, statInfo.atime, statInfo.mtime);
  }
}
function copyFileSync(src, dest, options) {
  ensureValidCopySync(src, dest, options);
  Deno.copyFileSync(src, dest);
  if (options.preserveTimestamps) {
    const statInfo = Deno.statSync(src);
    assert2(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert2(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    utimeSync(dest, statInfo.atime, statInfo.mtime);
  }
}
async function copySymLink(src, dest, options) {
  await ensureValidCopy(src, dest, options);
  const originSrcFilePath = await Deno.readLink(src);
  const type = getFileInfoType(await Deno.lstat(src));
  if (isWindows2) {
    await Deno.symlink(originSrcFilePath, dest, {
      type: type === "dir" ? "dir" : "file"
    });
  } else {
    await Deno.symlink(originSrcFilePath, dest);
  }
  if (options.preserveTimestamps) {
    const statInfo = await Deno.lstat(src);
    assert2(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert2(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    await utime(dest, statInfo.atime, statInfo.mtime);
  }
}
function copySymlinkSync(src, dest, options) {
  ensureValidCopySync(src, dest, options);
  const originSrcFilePath = Deno.readLinkSync(src);
  const type = getFileInfoType(Deno.lstatSync(src));
  if (isWindows2) {
    Deno.symlinkSync(originSrcFilePath, dest, {
      type: type === "dir" ? "dir" : "file"
    });
  } else {
    Deno.symlinkSync(originSrcFilePath, dest);
  }
  if (options.preserveTimestamps) {
    const statInfo = Deno.lstatSync(src);
    assert2(statInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert2(statInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    utimeSync(dest, statInfo.atime, statInfo.mtime);
  }
}
async function copyDir(src, dest, options) {
  const destStat = await ensureValidCopy(src, dest, {
    ...options,
    isFolder: true
  });
  if (!destStat) {
    await ensureDir(dest);
  }
  if (options.preserveTimestamps) {
    const srcStatInfo = await Deno.stat(src);
    assert2(srcStatInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert2(srcStatInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    await utime(dest, srcStatInfo.atime, srcStatInfo.mtime);
  }
  for await (const entry of Deno.readDir(src)) {
    const srcPath = join10(src, entry.name);
    const destPath = join10(dest, basename7(srcPath));
    if (entry.isSymlink) {
      await copySymLink(srcPath, destPath, options);
    } else if (entry.isDirectory) {
      await copyDir(srcPath, destPath, options);
    } else if (entry.isFile) {
      await copyFile(srcPath, destPath, options);
    }
  }
}
function copyDirSync(src, dest, options) {
  const destStat = ensureValidCopySync(src, dest, {
    ...options,
    isFolder: true
  });
  if (!destStat) {
    ensureDirSync(dest);
  }
  if (options.preserveTimestamps) {
    const srcStatInfo = Deno.statSync(src);
    assert2(srcStatInfo.atime instanceof Date, `statInfo.atime is unavailable`);
    assert2(srcStatInfo.mtime instanceof Date, `statInfo.mtime is unavailable`);
    utimeSync(dest, srcStatInfo.atime, srcStatInfo.mtime);
  }
  for (const entry of Deno.readDirSync(src)) {
    assert2(entry.name != null, "file.name must be set");
    const srcPath = join10(src, entry.name);
    const destPath = join10(dest, basename7(srcPath));
    if (entry.isSymlink) {
      copySymlinkSync(srcPath, destPath, options);
    } else if (entry.isDirectory) {
      copyDirSync(srcPath, destPath, options);
    } else if (entry.isFile) {
      copyFileSync(srcPath, destPath, options);
    }
  }
}
async function copy(src, dest, options = {}) {
  src = resolve7(src);
  dest = resolve7(dest);
  if (src === dest) {
    throw new Error("Source and destination cannot be the same.");
  }
  const srcStat = await Deno.lstat(src);
  if (srcStat.isDirectory && isSubdir(src, dest)) {
    throw new Error(
      `Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`
    );
  }
  if (srcStat.isSymlink) {
    await copySymLink(src, dest, options);
  } else if (srcStat.isDirectory) {
    await copyDir(src, dest, options);
  } else if (srcStat.isFile) {
    await copyFile(src, dest, options);
  }
}
function copySync(src, dest, options = {}) {
  src = resolve7(src);
  dest = resolve7(dest);
  if (src === dest) {
    throw new Error("Source and destination cannot be the same.");
  }
  const srcStat = Deno.lstatSync(src);
  if (srcStat.isDirectory && isSubdir(src, dest)) {
    throw new Error(
      `Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`
    );
  }
  if (srcStat.isSymlink) {
    copySymlinkSync(src, dest, options);
  } else if (srcStat.isDirectory) {
    copyDirSync(src, dest, options);
  } else if (srcStat.isFile) {
    copyFileSync(src, dest, options);
  }
}
var init_copy = __esm({
  "https://deno.land/std@0.133.0/fs/copy.ts"() {
    init_deno_unstable();
    init_mod2();
    init_ensure_dir();
    init_util3();
    init_assert2();
    init_os2();
  }
});

// https://deno.land/std@0.133.0/fs/eol.ts
var init_eol = __esm({
  "https://deno.land/std@0.133.0/fs/eol.ts"() {
  }
});

// https://deno.land/std@0.133.0/fs/mod.ts
var init_mod3 = __esm({
  "https://deno.land/std@0.133.0/fs/mod.ts"() {
    init_empty_dir();
    init_ensure_dir();
    init_ensure_file();
    init_ensure_link();
    init_ensure_symlink();
    init_exists();
    init_expand_glob();
    init_move();
    init_copy();
    init_walk();
    init_eol();
  }
});

// https://deno.land/x/good@1.6.0.1/value.js
function deepCopyInner(value, valueChain = [], originalToCopyMap = /* @__PURE__ */ new Map()) {
  valueChain.push(value);
  if (value == null) {
    return value;
  }
  if (!(value instanceof Object)) {
    return value;
  }
  if (originalToCopyMap.has(value)) {
    return originalToCopyMap.get(value);
  }
  if (value[deepCopySymbol] instanceof Function) {
    const clonedValue = value[deepCopySymbol](originalToCopyMap);
    originalToCopyMap.set(value, clonedValue);
    return clonedValue;
  }
  if (isGeneratorType(value)) {
    throw Error(`Sadly built-in generators cannot be deep copied.
And I found a generator along this path:
${valueChain.reverse().map((each2) => `${each2},
`)}`);
  }
  let object, theThis, thisCopy;
  if (value instanceof Date) {
    object = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    object = new RegExp(value);
  } else if (value instanceof URL) {
    object = new URL(value);
  } else if (value instanceof Function) {
    theThis = value[getThis]();
    object = value.bind(theThis);
  } else if (copyableClasses.has(value.constructor)) {
    object = new value.constructor(value);
  } else if (value instanceof Array) {
    object = [];
  } else if (value instanceof Set) {
    object = /* @__PURE__ */ new Set();
  } else if (value instanceof Map) {
    object = /* @__PURE__ */ new Map();
  }
  originalToCopyMap.set(value, object);
  if (object instanceof Function) {
    thisCopy = deepCopyInner(theThis, valueChain, originalToCopyMap);
    object = object.bind(thisCopy);
  }
  const output3 = object;
  try {
    output3.constructor = value.constructor;
  } catch (error) {
  }
  Object.setPrototypeOf(output3, Object.getPrototypeOf(value));
  const propertyDefinitions = {};
  for (const [key, description] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    const { value: value2, get, set, ...options } = description;
    const getIsFunc = get instanceof Function;
    const setIsFunc = set instanceof Function;
    if (getIsFunc || setIsFunc) {
      propertyDefinitions[key] = {
        ...options,
        get: get ? function(...args2) {
          return get.apply(output3, args2);
        } : void 0,
        set: set ? function(...args2) {
          return set.apply(output3, args2);
        } : void 0
      };
    } else {
      if (key == "length" && output3 instanceof Array) {
        continue;
      }
      propertyDefinitions[key] = {
        ...options,
        value: deepCopyInner(value2, valueChain, originalToCopyMap)
      };
    }
  }
  Object.defineProperties(output3, propertyDefinitions);
  return output3;
}
var typedArrayClasses, copyableClasses, IteratorPrototype, ArrayIterator, MapIterator, SetIterator, AsyncFunction, GeneratorFunction, AsyncGeneratorFunction, SyncGenerator, AsyncGenerator, isPrimitive, isPureObject, isPracticallyPrimitive, isBuiltInIterator, isGeneratorType, isAsyncIterable, isSyncIterable, isIterableObjectOrContainer, isTechnicallyIterable, isSyncIterableObjectOrContainer, deepCopySymbol, clonedFromSymbol, getThis, deepCopy, shallowSortObject, deepSortObject, stableStringify, allKeys, ownKeyDescriptions, allKeyDescriptions;
var init_value = __esm({
  "https://deno.land/x/good@1.6.0.1/value.js"() {
    typedArrayClasses = [
      Uint16Array,
      Uint32Array,
      Uint8Array,
      Uint8ClampedArray,
      Int16Array,
      Int32Array,
      Int8Array,
      Float32Array,
      Float64Array,
      globalThis.BigInt64Array,
      globalThis.BigUint64Array
    ].filter((each2) => each2);
    copyableClasses = /* @__PURE__ */ new Set([RegExp, Date, URL, ...typedArrayClasses, globalThis.ArrayBuffer, globalThis.DataView]);
    IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
    ArrayIterator = Object.getPrototypeOf([][Symbol.iterator]);
    MapIterator = Object.getPrototypeOf((/* @__PURE__ */ new Map())[Symbol.iterator]);
    SetIterator = Object.getPrototypeOf((/* @__PURE__ */ new Set())[Symbol.iterator]);
    AsyncFunction = class {
    };
    GeneratorFunction = class {
    };
    AsyncGeneratorFunction = class {
    };
    SyncGenerator = class {
    };
    AsyncGenerator = class {
    };
    try {
      AsyncFunction = eval("(async function(){}).constructor");
      GeneratorFunction = eval("(function*(){}).constructor");
      AsyncGeneratorFunction = eval("(async function*(){}).constructor");
      SyncGenerator = eval("((function*(){})()).constructor");
      AsyncGenerator = eval("((async function*(){})()).constructor");
    } catch (error) {
    }
    isPrimitive = (value) => !(value instanceof Object);
    isPureObject = (value) => value instanceof Object && Object.getPrototypeOf(value).constructor == Object;
    isPracticallyPrimitive = (value) => isPrimitive(value) || value instanceof Date || value instanceof RegExp || value instanceof URL;
    isBuiltInIterator = (value) => IteratorPrototype.isPrototypeOf(value);
    isGeneratorType = (value) => {
      if (value instanceof Object) {
        if (isBuiltInIterator(value)) {
          return true;
        }
        const constructor = value.constructor;
        return constructor == SyncGenerator || constructor == AsyncGenerator;
      }
      return false;
    };
    isAsyncIterable = function(value) {
      return value && typeof value[Symbol.asyncIterator] === "function";
    };
    isSyncIterable = function(value) {
      return value && typeof value[Symbol.iterator] === "function";
    };
    isIterableObjectOrContainer = function(value) {
      return value instanceof Object && (typeof value[Symbol.iterator] == "function" || typeof value[Symbol.asyncIterator] === "function");
    };
    isTechnicallyIterable = function(value) {
      return value instanceof Object || typeof value == "string";
    };
    isSyncIterableObjectOrContainer = function(value) {
      return value instanceof Object && typeof value[Symbol.iterator] == "function";
    };
    deepCopySymbol = Symbol.for("deepCopy");
    clonedFromSymbol = Symbol();
    getThis = Symbol();
    Object.getPrototypeOf(function() {
    })[getThis] = function() {
      return this;
    };
    deepCopy = (value) => deepCopyInner(value);
    shallowSortObject = (obj) => {
      return Object.keys(obj).sort().reduce(
        (newObj, key) => {
          newObj[key] = obj[key];
          return newObj;
        },
        {}
      );
    };
    deepSortObject = (obj, seen = /* @__PURE__ */ new Map()) => {
      if (!(obj instanceof Object)) {
        return obj;
      } else if (seen.has(obj)) {
        return seen.get(obj);
      } else {
        if (obj instanceof Array) {
          const sortedChildren = [];
          seen.set(obj, sortedChildren);
          for (const each2 of obj) {
            sortedChildren.push(deepSortObject(each2, seen));
          }
          return sortedChildren;
        } else {
          const sorted = {};
          seen.set(obj, sorted);
          for (const eachKey of Object.keys(obj).sort()) {
            sorted[eachKey] = deepSortObject(obj[eachKey], seen);
          }
          return sorted;
        }
      }
    };
    stableStringify = (value, ...args2) => {
      return JSON.stringify(deepSortObject(value), ...args2);
    };
    allKeys = function(obj) {
      let keys = [];
      if (obj == null) {
        return [];
      }
      if (!(obj instanceof Object)) {
        obj = Object.getPrototypeOf(obj);
      }
      while (obj) {
        keys = keys.concat(Reflect.ownKeys(obj));
        obj = Object.getPrototypeOf(obj);
      }
      return keys;
    };
    ownKeyDescriptions = Object.getOwnPropertyDescriptors;
    allKeyDescriptions = function(value, options = { includingBuiltin: false }) {
      var { includingBuiltin } = { ...options };
      let descriptions = [];
      if (value == null) {
        return {};
      }
      if (!(value instanceof Object)) {
        value = Object.getPrototypeOf(value);
      }
      const rootPrototype = Object.getPrototypeOf({});
      let prevObj;
      while (value && value != prevObj) {
        if (!includingBuiltin && value == rootPrototype) {
          break;
        }
        descriptions = descriptions.concat(Object.entries(Object.getOwnPropertyDescriptors(value)));
        prevObj = value;
        value = Object.getPrototypeOf(value);
      }
      descriptions.reverse();
      return Object.fromEntries(descriptions);
    };
  }
});

// https://deno.land/x/good@1.6.0.1/async.js
var objectPrototype;
var init_async = __esm({
  "https://deno.land/x/good@1.6.0.1/async.js"() {
    objectPrototype = Object.getPrototypeOf({});
  }
});

// https://deno.land/x/good@1.6.0.1/iterable.js
async function asyncIteratorToList(asyncIterator) {
  const results = [];
  for await (const each2 of asyncIterator) {
    results.push(each2);
  }
  return results;
}
function concurrentlyTransform({ iterator, transformFunction, poolLimit = null, awaitAll = false }) {
  poolLimit = poolLimit || concurrentlyTransform.defaultPoolLimit;
  const res = new TransformStream({
    async transform(p28, controller) {
      try {
        const s28 = await p28;
        controller.enqueue(s28);
      } catch (e10) {
        if (e10 instanceof AggregateError && e10.message == ERROR_WHILE_MAPPING_MESSAGE) {
          controller.error(e10);
        }
      }
    }
  });
  const mainPromise = (async () => {
    const writer = res.writable.getWriter();
    const executing = [];
    try {
      let index = 0;
      for await (const item of iterator) {
        const p28 = Promise.resolve().then(() => transformFunction(item, index));
        index++;
        writer.write(p28);
        const e10 = p28.then(() => executing.splice(executing.indexOf(e10), 1));
        executing.push(e10);
        if (executing.length >= poolLimit) {
          await Promise.race(executing);
        }
      }
      await Promise.all(executing);
      writer.close();
    } catch {
      const errors2 = [];
      for (const result of await Promise.allSettled(executing)) {
        if (result.status == "rejected") {
          errors2.push(result.reason);
        }
      }
      writer.write(Promise.reject(
        new AggregateError(errors2, ERROR_WHILE_MAPPING_MESSAGE)
      )).catch(() => {
      });
    }
  })();
  const asyncIterator = res.readable[Symbol.asyncIterator]();
  if (!awaitAll) {
    return asyncIterator;
  } else {
    return mainPromise.then(() => asyncIteratorToList(asyncIterator));
  }
}
var emptyIterator, makeIterable, Stop, iter, zip, ERROR_WHILE_MAPPING_MESSAGE;
var init_iterable = __esm({
  "https://deno.land/x/good@1.6.0.1/iterable.js"() {
    init_value();
    init_async();
    emptyIterator = function* () {
    }();
    makeIterable = (object) => {
      if (object == null) {
        return emptyIterator;
      }
      if (object[Symbol.iterator] instanceof Function || object[Symbol.asyncIterator] instanceof Function) {
        return object;
      }
      if (Object.getPrototypeOf(object).constructor == Object) {
        return Object.entries(object);
      }
      return emptyIterator;
    };
    Stop = Symbol("iterationStop");
    iter = (object) => {
      const iterable = makeIterable(object);
      if (iterable[Symbol.asyncIterator]) {
        return iterable[Symbol.asyncIterator]();
      } else {
        return iterable[Symbol.iterator]();
      }
    };
    zip = function* (...iterables) {
      iterables = iterables.map((each2) => iter(each2));
      while (true) {
        const nexts = iterables.map((each2) => each2.next());
        if (nexts.every((each2) => each2.done)) {
          break;
        }
        yield nexts.map((each2) => each2.value);
      }
    };
    ERROR_WHILE_MAPPING_MESSAGE = "Threw while mapping.";
    concurrentlyTransform.defaultPoolLimit = 40;
  }
});

// https://deno.land/x/good@1.6.0.1/string.js
function escapeRegexMatch(str) {
  return str.replaceAll(
    RX_REGEXP_ESCAPE,
    (m24) => reservedCharMap[m24]
  );
}
function regexWithStripWarning(shouldStrip) {
  return (strings, ...values) => {
    let newRegexString = "";
    for (const [string, value] of zip(strings, values)) {
      newRegexString += string;
      if (value instanceof RegExp) {
        if (!shouldStrip && value.flags.replace(/g/, "").length > 0) {
          console.warn(`Warning: flags inside of regex:
    The RegExp trigging this warning is: ${value}
    When calling the regex interpolater (e.g. regex\`something\${stuff}\`)
    one of the \${} values (the one above) was a RegExp with a flag enabled
    e.g. /stuff/i  <- i = ignoreCase flag enabled
    When the /stuff/i gets interpolated, its going to loose its flags
    (thats what I'm warning you about)
    
    To disable/ignore this warning do:
        regex.stripFlags\`something\${/stuff/i}\`
    If you want to add flags to the output of regex\`something\${stuff}\` do:
        regex\`something\${stuff}\`.i   // ignoreCase
        regex\`something\${stuff}\`.ig  // ignoreCase and global
        regex\`something\${stuff}\`.gi  // functionally equivlent
`);
        }
        newRegexString += `(?:${value.source})`;
      } else if (value != null) {
        newRegexString += escapeRegexMatch(toString(value));
      }
    }
    return proxyRegExp(newRegexString, "");
  };
}
var indent, toString, reprSymbol, denoInspectSymbol, toRepresentation, findAll, reservedCharMap, RX_REGEXP_ESCAPE, regexpProxy, realExec, proxyRegExp, regexProxyOptions, regex, textDecoder, textEncoder, utf8BytesToString, stringToUtf8Bytes;
var init_string = __esm({
  "https://deno.land/x/good@1.6.0.1/string.js"() {
    init_iterable();
    indent = ({ string, by = "    ", noLead = false }) => (noLead ? "" : by) + string.replace(/\n/g, "\n" + by);
    toString = (value) => {
      if (typeof value == "symbol") {
        return toRepresentation(value);
      } else if (!(value instanceof Object)) {
        return value != null ? value.toString() : `${value}`;
      } else {
        return toRepresentation(value);
      }
    };
    reprSymbol = Symbol.for("representation");
    denoInspectSymbol = Symbol.for("Deno.customInspect");
    toRepresentation = (item) => {
      const alreadySeen = /* @__PURE__ */ new Set();
      const recursionWrapper = (item2) => {
        if (item2 instanceof Object) {
          if (alreadySeen.has(item2)) {
            return `[Self Reference]`;
          } else {
            alreadySeen.add(item2);
          }
        }
        let output3;
        if (item2 === void 0) {
          output3 = "undefined";
        } else if (item2 === null) {
          output3 = "null";
        } else if (typeof item2 == "string") {
          output3 = JSON.stringify(item2);
        } else if (typeof item2 == "symbol") {
          if (!item2.description) {
            output3 = "Symbol()";
          } else {
            const globalVersion = Symbol.for(item2.description);
            if (globalVersion == item2) {
              output3 = `Symbol.for(${JSON.stringify(item2.description)})`;
            } else {
              output3 = `Symbol(${JSON.stringify(item2.description)})`;
            }
          }
        } else if (item2 instanceof Date) {
          output3 = `new Date(${item2.getTime()})`;
        } else if (item2 instanceof Array) {
          output3 = `[${item2.map((each2) => recursionWrapper(each2)).join(",")}]`;
        } else if (item2 instanceof Set) {
          output3 = `new Set(${[...item2].map((each2) => recursionWrapper(each2)).join(",")})`;
        } else if (item2 instanceof Object && item2.constructor == Object) {
          output3 = pureObjectRepr(item2);
        } else if (item2 instanceof Map) {
          let string = "new Map(";
          for (const [key, value] of item2.entries()) {
            const stringKey = recursionWrapper(key);
            const stringValue = recursionWrapper(value);
            if (!stringKey.match(/\n/g)) {
              string += `
  [${stringKey}, ${indent({ string: stringValue, by: "  ", noLead: true })}],`;
            } else {
              string += `
  [${indent({ string: stringKey, by: "  ", noLead: true })},
  ${indent({ string: stringValue, by: "    ", noLead: true })}],`;
            }
          }
          string += "\n)";
          output3 = string;
        } else {
          if (item2[reprSymbol] instanceof Function) {
            try {
              output3 = item2[reprSymbol]();
              return output3;
            } catch (error) {
            }
          }
          if (item2[denoInspectSymbol] instanceof Function) {
            try {
              output3 = item2[denoInspectSymbol]();
              return output3;
            } catch (error) {
            }
          }
          try {
            output3 = item2.toString();
            if (output3 !== "[object Object]") {
              return output3;
            }
          } catch (error) {
          }
          try {
            if (item2.constructor instanceof Function && item2.prototype && typeof item2.name == "string") {
              output3 = `class ${item2.name} { /*...*/ }`;
              return output3;
            }
          } catch (error) {
          }
          try {
            if (item2.constructor instanceof Function && typeof item2.constructor.name == "string") {
              output3 = `new ${item2.constructor.name}(${pureObjectRepr(item2)})`;
              return output3;
            }
          } catch (error) {
          }
          return pureObjectRepr(item2);
        }
        return output3;
      };
      const pureObjectRepr = (item2) => {
        let string = "{";
        for (const [key, value] of Object.entries(item2)) {
          const stringKey = recursionWrapper(key);
          const stringValue = recursionWrapper(value);
          string += `
  ${stringKey}: ${indent({ string: stringValue, by: "  ", noLead: true })},`;
        }
        string += "\n}";
        return string;
      };
      return recursionWrapper(item);
    };
    findAll = (regexPattern, sourceString) => {
      var output3 = [];
      var match2;
      var regexPatternWithGlobal = regexPattern.global ? regexPattern : RegExp(regexPattern, regexPattern.flags + "g");
      while (match2 = regexPatternWithGlobal.exec(sourceString)) {
        output3.push(match2);
        if (match2[0].length == 0) {
          regexPatternWithGlobal.lastIndex += 1;
        }
      }
      return output3;
    };
    reservedCharMap = {
      "&": "\\x26",
      "!": "\\x21",
      "#": "\\x23",
      "$": "\\$",
      "%": "\\x25",
      "*": "\\*",
      "+": "\\+",
      ",": "\\x2c",
      ".": "\\.",
      ":": "\\x3a",
      ";": "\\x3b",
      "<": "\\x3c",
      "=": "\\x3d",
      ">": "\\x3e",
      "?": "\\?",
      "@": "\\x40",
      "^": "\\^",
      "`": "\\x60",
      "~": "\\x7e",
      "(": "\\(",
      ")": "\\)",
      "[": "\\[",
      "]": "\\]",
      "{": "\\{",
      "}": "\\}",
      "/": "\\/",
      "-": "\\x2d",
      "\\": "\\\\",
      "|": "\\|"
    };
    RX_REGEXP_ESCAPE = new RegExp(
      `[${Object.values(reservedCharMap).join("")}]`,
      "gu"
    );
    regexpProxy = Symbol("regexpProxy");
    realExec = RegExp.prototype.exec;
    RegExp.prototype.exec = function(...args2) {
      if (this[regexpProxy]) {
        return realExec.apply(this[regexpProxy], args2);
      }
      return realExec.apply(this, args2);
    };
    regexProxyOptions = Object.freeze({
      get(original, key) {
        if (typeof key == "string" && key.match(/^[igmusyv]+$/)) {
          return proxyRegExp(original, key);
        }
        if (key == regexpProxy) {
          return original;
        }
        return original[key];
      },
      set(original, key, value) {
        original[key] = value;
        return true;
      }
    });
    proxyRegExp = (parent, flags) => {
      const regex3 = new RegExp(parent, flags);
      const output3 = new Proxy(regex3, regexProxyOptions);
      Object.setPrototypeOf(output3, Object.getPrototypeOf(regex3));
      return output3;
    };
    regex = regexWithStripWarning(false);
    regex.stripFlags = regexWithStripWarning(true);
    textDecoder = new TextDecoder("utf-8");
    textEncoder = new TextEncoder("utf-8");
    utf8BytesToString = textDecoder.decode.bind(textDecoder);
    stringToUtf8Bytes = textEncoder.encode.bind(textEncoder);
  }
});

// https://deno.land/std@0.214.0/path/is_glob.ts
var init_is_glob = __esm({
  "https://deno.land/std@0.214.0/path/is_glob.ts"() {
  }
});

// https://deno.land/std@0.214.0/path/_os.ts
var osType3, isWindows3;
var init_os3 = __esm({
  "https://deno.land/std@0.214.0/path/_os.ts"() {
    osType3 = (() => {
      const { Deno: Deno4 } = globalThis;
      if (typeof Deno4?.build?.os === "string") {
        return Deno4.build.os;
      }
      const { navigator } = globalThis;
      if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
      }
      return "linux";
    })();
    isWindows3 = osType3 === "windows";
  }
});

// https://deno.land/std@0.214.0/path/_common/glob_to_reg_exp.ts
function _globToRegExp(c24, glob2, {
  extended = true,
  globstar: globstarOption = true,
  // os = osType,
  caseInsensitive = false
} = {}) {
  if (glob2 === "") {
    return /(?!)/;
  }
  let newLength = glob2.length;
  for (; newLength > 1 && c24.seps.includes(glob2[newLength - 1]); newLength--) ;
  glob2 = glob2.slice(0, newLength);
  let regExpString = "";
  for (let j17 = 0; j17 < glob2.length; ) {
    let segment = "";
    const groupStack = [];
    let inRange = false;
    let inEscape = false;
    let endsWithSep = false;
    let i20 = j17;
    for (; i20 < glob2.length && !c24.seps.includes(glob2[i20]); i20++) {
      if (inEscape) {
        inEscape = false;
        const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
        segment += escapeChars.includes(glob2[i20]) ? `\\${glob2[i20]}` : glob2[i20];
        continue;
      }
      if (glob2[i20] === c24.escapePrefix) {
        inEscape = true;
        continue;
      }
      if (glob2[i20] === "[") {
        if (!inRange) {
          inRange = true;
          segment += "[";
          if (glob2[i20 + 1] === "!") {
            i20++;
            segment += "^";
          } else if (glob2[i20 + 1] === "^") {
            i20++;
            segment += "\\^";
          }
          continue;
        } else if (glob2[i20 + 1] === ":") {
          let k5 = i20 + 1;
          let value = "";
          while (glob2[k5 + 1] !== void 0 && glob2[k5 + 1] !== ":") {
            value += glob2[k5 + 1];
            k5++;
          }
          if (glob2[k5 + 1] === ":" && glob2[k5 + 2] === "]") {
            i20 = k5 + 2;
            if (value === "alnum") segment += "\\dA-Za-z";
            else if (value === "alpha") segment += "A-Za-z";
            else if (value === "ascii") segment += "\0-";
            else if (value === "blank") segment += "	 ";
            else if (value === "cntrl") segment += "\0-";
            else if (value === "digit") segment += "\\d";
            else if (value === "graph") segment += "!-~";
            else if (value === "lower") segment += "a-z";
            else if (value === "print") segment += " -~";
            else if (value === "punct") {
              segment += `!"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~`;
            } else if (value === "space") segment += "\\s\v";
            else if (value === "upper") segment += "A-Z";
            else if (value === "word") segment += "\\w";
            else if (value === "xdigit") segment += "\\dA-Fa-f";
            continue;
          }
        }
      }
      if (glob2[i20] === "]" && inRange) {
        inRange = false;
        segment += "]";
        continue;
      }
      if (inRange) {
        if (glob2[i20] === "\\") {
          segment += `\\\\`;
        } else {
          segment += glob2[i20];
        }
        continue;
      }
      if (glob2[i20] === ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
        segment += ")";
        const type = groupStack.pop();
        if (type === "!") {
          segment += c24.wildcard;
        } else if (type !== "@") {
          segment += type;
        }
        continue;
      }
      if (glob2[i20] === "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
        segment += "|";
        continue;
      }
      if (glob2[i20] === "+" && extended && glob2[i20 + 1] === "(") {
        i20++;
        groupStack.push("+");
        segment += "(?:";
        continue;
      }
      if (glob2[i20] === "@" && extended && glob2[i20 + 1] === "(") {
        i20++;
        groupStack.push("@");
        segment += "(?:";
        continue;
      }
      if (glob2[i20] === "?") {
        if (extended && glob2[i20 + 1] === "(") {
          i20++;
          groupStack.push("?");
          segment += "(?:";
        } else {
          segment += ".";
        }
        continue;
      }
      if (glob2[i20] === "!" && extended && glob2[i20 + 1] === "(") {
        i20++;
        groupStack.push("!");
        segment += "(?!";
        continue;
      }
      if (glob2[i20] === "{") {
        groupStack.push("BRACE");
        segment += "(?:";
        continue;
      }
      if (glob2[i20] === "}" && groupStack[groupStack.length - 1] === "BRACE") {
        groupStack.pop();
        segment += ")";
        continue;
      }
      if (glob2[i20] === "," && groupStack[groupStack.length - 1] === "BRACE") {
        segment += "|";
        continue;
      }
      if (glob2[i20] === "*") {
        if (extended && glob2[i20 + 1] === "(") {
          i20++;
          groupStack.push("*");
          segment += "(?:";
        } else {
          const prevChar = glob2[i20 - 1];
          let numStars = 1;
          while (glob2[i20 + 1] === "*") {
            i20++;
            numStars++;
          }
          const nextChar = glob2[i20 + 1];
          if (globstarOption && numStars === 2 && [...c24.seps, void 0].includes(prevChar) && [...c24.seps, void 0].includes(nextChar)) {
            segment += c24.globstar;
            endsWithSep = true;
          } else {
            segment += c24.wildcard;
          }
        }
        continue;
      }
      segment += regExpEscapeChars.includes(glob2[i20]) ? `\\${glob2[i20]}` : glob2[i20];
    }
    if (groupStack.length > 0 || inRange || inEscape) {
      segment = "";
      for (const c25 of glob2.slice(j17, i20)) {
        segment += regExpEscapeChars.includes(c25) ? `\\${c25}` : c25;
        endsWithSep = false;
      }
    }
    regExpString += segment;
    if (!endsWithSep) {
      regExpString += i20 < glob2.length ? c24.sep : c24.sepMaybe;
      endsWithSep = true;
    }
    while (c24.seps.includes(glob2[i20])) i20++;
    if (!(i20 > j17)) {
      throw new Error("Assertion failure: i > j (potential infinite loop)");
    }
    j17 = i20;
  }
  regExpString = `^${regExpString}$`;
  return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
var regExpEscapeChars, rangeEscapeChars;
var init_glob_to_reg_exp = __esm({
  "https://deno.land/std@0.214.0/path/_common/glob_to_reg_exp.ts"() {
    regExpEscapeChars = [
      "!",
      "$",
      "(",
      ")",
      "*",
      "+",
      ".",
      "=",
      "?",
      "[",
      "\\",
      "^",
      "{",
      "|"
    ];
    rangeEscapeChars = ["-", "\\", "]"];
  }
});

// https://deno.land/std@0.214.0/path/posix/glob_to_regexp.ts
function globToRegExp2(glob2, options = {}) {
  return _globToRegExp(constants, glob2, options);
}
var constants;
var init_glob_to_regexp = __esm({
  "https://deno.land/std@0.214.0/path/posix/glob_to_regexp.ts"() {
    init_glob_to_reg_exp();
    constants = {
      sep: "/+",
      sepMaybe: "/*",
      seps: ["/"],
      globstar: "(?:[^/]*(?:/|$)+)*",
      wildcard: "[^/]*",
      escapePrefix: "\\"
    };
  }
});

// https://deno.land/std@0.214.0/path/windows/glob_to_regexp.ts
function globToRegExp3(glob2, options = {}) {
  return _globToRegExp(constants2, glob2, options);
}
var constants2;
var init_glob_to_regexp2 = __esm({
  "https://deno.land/std@0.214.0/path/windows/glob_to_regexp.ts"() {
    init_glob_to_reg_exp();
    constants2 = {
      sep: "(?:\\\\|/)+",
      sepMaybe: "(?:\\\\|/)*",
      seps: ["\\", "/"],
      globstar: "(?:[^\\\\/]*(?:\\\\|/|$)+)*",
      wildcard: "[^\\\\/]*",
      escapePrefix: "`"
    };
  }
});

// https://deno.land/std@0.214.0/path/glob_to_regexp.ts
function globToRegExp4(glob2, options = {}) {
  return options.os === "windows" || !options.os && isWindows3 ? globToRegExp3(glob2, options) : globToRegExp2(glob2, options);
}
var init_glob_to_regexp3 = __esm({
  "https://deno.land/std@0.214.0/path/glob_to_regexp.ts"() {
    init_os3();
    init_glob_to_regexp();
    init_glob_to_regexp2();
  }
});

// https://deno.land/std@0.214.0/path/_common/assert_path.ts
var init_assert_path = __esm({
  "https://deno.land/std@0.214.0/path/_common/assert_path.ts"() {
  }
});

// https://deno.land/std@0.214.0/path/_common/normalize.ts
var init_normalize = __esm({
  "https://deno.land/std@0.214.0/path/_common/normalize.ts"() {
    init_assert_path();
  }
});

// https://deno.land/std@0.214.0/path/_common/constants.ts
var init_constants3 = __esm({
  "https://deno.land/std@0.214.0/path/_common/constants.ts"() {
  }
});

// https://deno.land/std@0.214.0/path/_common/normalize_string.ts
var init_normalize_string = __esm({
  "https://deno.land/std@0.214.0/path/_common/normalize_string.ts"() {
    init_constants3();
  }
});

// https://deno.land/std@0.214.0/path/posix/_util.ts
var init_util4 = __esm({
  "https://deno.land/std@0.214.0/path/posix/_util.ts"() {
    init_constants3();
  }
});

// https://deno.land/std@0.214.0/path/posix/normalize.ts
var init_normalize2 = __esm({
  "https://deno.land/std@0.214.0/path/posix/normalize.ts"() {
    init_normalize();
    init_normalize_string();
    init_util4();
  }
});

// https://deno.land/std@0.214.0/path/posix/constants.ts
var init_constants4 = __esm({
  "https://deno.land/std@0.214.0/path/posix/constants.ts"() {
  }
});

// https://deno.land/std@0.214.0/path/posix/normalize_glob.ts
var init_normalize_glob = __esm({
  "https://deno.land/std@0.214.0/path/posix/normalize_glob.ts"() {
    init_normalize2();
    init_constants4();
  }
});

// https://deno.land/std@0.214.0/path/windows/_util.ts
var init_util5 = __esm({
  "https://deno.land/std@0.214.0/path/windows/_util.ts"() {
    init_constants3();
  }
});

// https://deno.land/std@0.214.0/path/windows/normalize.ts
var init_normalize3 = __esm({
  "https://deno.land/std@0.214.0/path/windows/normalize.ts"() {
    init_normalize();
    init_constants3();
    init_normalize_string();
    init_util5();
  }
});

// https://deno.land/std@0.214.0/path/windows/constants.ts
var init_constants5 = __esm({
  "https://deno.land/std@0.214.0/path/windows/constants.ts"() {
  }
});

// https://deno.land/std@0.214.0/path/windows/normalize_glob.ts
var init_normalize_glob2 = __esm({
  "https://deno.land/std@0.214.0/path/windows/normalize_glob.ts"() {
    init_normalize3();
    init_constants5();
  }
});

// https://deno.land/std@0.214.0/path/normalize_glob.ts
var init_normalize_glob3 = __esm({
  "https://deno.land/std@0.214.0/path/normalize_glob.ts"() {
    init_os3();
    init_normalize_glob();
    init_normalize_glob2();
  }
});

// https://deno.land/std@0.214.0/path/posix/join.ts
var init_join = __esm({
  "https://deno.land/std@0.214.0/path/posix/join.ts"() {
    init_assert_path();
    init_normalize2();
  }
});

// https://deno.land/std@0.214.0/path/posix/join_globs.ts
var init_join_globs = __esm({
  "https://deno.land/std@0.214.0/path/posix/join_globs.ts"() {
    init_join();
    init_constants4();
    init_normalize_glob();
  }
});

// https://deno.land/std@0.214.0/assert/assertion_error.ts
var init_assertion_error = __esm({
  "https://deno.land/std@0.214.0/assert/assertion_error.ts"() {
  }
});

// https://deno.land/std@0.214.0/assert/assert.ts
var init_assert3 = __esm({
  "https://deno.land/std@0.214.0/assert/assert.ts"() {
    init_assertion_error();
  }
});

// https://deno.land/std@0.214.0/path/windows/join.ts
var init_join2 = __esm({
  "https://deno.land/std@0.214.0/path/windows/join.ts"() {
    init_assert3();
    init_assert_path();
    init_util5();
    init_normalize3();
  }
});

// https://deno.land/std@0.214.0/path/windows/join_globs.ts
var init_join_globs2 = __esm({
  "https://deno.land/std@0.214.0/path/windows/join_globs.ts"() {
    init_join2();
    init_constants5();
    init_normalize_glob2();
  }
});

// https://deno.land/std@0.214.0/path/join_globs.ts
var init_join_globs3 = __esm({
  "https://deno.land/std@0.214.0/path/join_globs.ts"() {
    init_os3();
    init_join_globs();
    init_join_globs2();
  }
});

// https://deno.land/std@0.214.0/path/glob.ts
var init_glob3 = __esm({
  "https://deno.land/std@0.214.0/path/glob.ts"() {
    init_is_glob();
    init_glob_to_regexp3();
    init_normalize_glob3();
    init_join_globs3();
  }
});

// https://deno.land/std@0.191.0/_util/asserts.ts
function assert4(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError3(msg);
  }
}
var DenoStdInternalError3;
var init_asserts = __esm({
  "https://deno.land/std@0.191.0/_util/asserts.ts"() {
    DenoStdInternalError3 = class extends Error {
      constructor(message2) {
        super(message2);
        this.name = "DenoStdInternalError";
      }
    };
  }
});

// https://deno.land/std@0.191.0/bytes/copy.ts
function copy2(src, dst, off = 0) {
  off = Math.max(0, Math.min(off, dst.byteLength));
  const dstBytesAvailable = dst.byteLength - off;
  if (src.byteLength > dstBytesAvailable) {
    src = src.subarray(0, dstBytesAvailable);
  }
  dst.set(src, off);
  return src.byteLength;
}
var init_copy2 = __esm({
  "https://deno.land/std@0.191.0/bytes/copy.ts"() {
  }
});

// https://deno.land/std@0.191.0/io/buf_reader.ts
var DEFAULT_BUF_SIZE, MIN_BUF_SIZE, MAX_CONSECUTIVE_EMPTY_READS, CR, LF, BufferFullError, PartialReadError, BufReader;
var init_buf_reader = __esm({
  "https://deno.land/std@0.191.0/io/buf_reader.ts"() {
    init_asserts();
    init_copy2();
    DEFAULT_BUF_SIZE = 4096;
    MIN_BUF_SIZE = 16;
    MAX_CONSECUTIVE_EMPTY_READS = 100;
    CR = "\r".charCodeAt(0);
    LF = "\n".charCodeAt(0);
    BufferFullError = class extends Error {
      constructor(partial) {
        super("Buffer full");
        this.partial = partial;
      }
      name = "BufferFullError";
    };
    PartialReadError = class extends Error {
      name = "PartialReadError";
      partial;
      constructor() {
        super("Encountered UnexpectedEof, data only partially read");
      }
    };
    BufReader = class _BufReader {
      #buf;
      #rd;
      // Reader provided by caller.
      #r = 0;
      // buf read position.
      #w = 0;
      // buf write position.
      #eof = false;
      // private lastByte: number;
      // private lastCharSize: number;
      /** return new BufReader unless r is BufReader */
      static create(r20, size = DEFAULT_BUF_SIZE) {
        return r20 instanceof _BufReader ? r20 : new _BufReader(r20, size);
      }
      constructor(rd, size = DEFAULT_BUF_SIZE) {
        if (size < MIN_BUF_SIZE) {
          size = MIN_BUF_SIZE;
        }
        this.#reset(new Uint8Array(size), rd);
      }
      /** Returns the size of the underlying buffer in bytes. */
      size() {
        return this.#buf.byteLength;
      }
      buffered() {
        return this.#w - this.#r;
      }
      // Reads a new chunk into the buffer.
      #fill = async () => {
        if (this.#r > 0) {
          this.#buf.copyWithin(0, this.#r, this.#w);
          this.#w -= this.#r;
          this.#r = 0;
        }
        if (this.#w >= this.#buf.byteLength) {
          throw Error("bufio: tried to fill full buffer");
        }
        for (let i20 = MAX_CONSECUTIVE_EMPTY_READS; i20 > 0; i20--) {
          const rr2 = await this.#rd.read(this.#buf.subarray(this.#w));
          if (rr2 === null) {
            this.#eof = true;
            return;
          }
          assert4(rr2 >= 0, "negative read");
          this.#w += rr2;
          if (rr2 > 0) {
            return;
          }
        }
        throw new Error(
          `No progress after ${MAX_CONSECUTIVE_EMPTY_READS} read() calls`
        );
      };
      /** Discards any buffered data, resets all state, and switches
       * the buffered reader to read from r.
       */
      reset(r20) {
        this.#reset(this.#buf, r20);
      }
      #reset = (buf, rd) => {
        this.#buf = buf;
        this.#rd = rd;
        this.#eof = false;
      };
      /** reads data into p.
       * It returns the number of bytes read into p.
       * The bytes are taken from at most one Read on the underlying Reader,
       * hence n may be less than len(p).
       * To read exactly len(p) bytes, use io.ReadFull(b, p).
       */
      async read(p28) {
        let rr2 = p28.byteLength;
        if (p28.byteLength === 0) return rr2;
        if (this.#r === this.#w) {
          if (p28.byteLength >= this.#buf.byteLength) {
            const rr3 = await this.#rd.read(p28);
            const nread = rr3 ?? 0;
            assert4(nread >= 0, "negative read");
            return rr3;
          }
          this.#r = 0;
          this.#w = 0;
          rr2 = await this.#rd.read(this.#buf);
          if (rr2 === 0 || rr2 === null) return rr2;
          assert4(rr2 >= 0, "negative read");
          this.#w += rr2;
        }
        const copied = copy2(this.#buf.subarray(this.#r, this.#w), p28, 0);
        this.#r += copied;
        return copied;
      }
      /** reads exactly `p.length` bytes into `p`.
       *
       * If successful, `p` is returned.
       *
       * If the end of the underlying stream has been reached, and there are no more
       * bytes available in the buffer, `readFull()` returns `null` instead.
       *
       * An error is thrown if some bytes could be read, but not enough to fill `p`
       * entirely before the underlying stream reported an error or EOF. Any error
       * thrown will have a `partial` property that indicates the slice of the
       * buffer that has been successfully filled with data.
       *
       * Ported from https://golang.org/pkg/io/#ReadFull
       */
      async readFull(p28) {
        let bytesRead = 0;
        while (bytesRead < p28.length) {
          try {
            const rr2 = await this.read(p28.subarray(bytesRead));
            if (rr2 === null) {
              if (bytesRead === 0) {
                return null;
              } else {
                throw new PartialReadError();
              }
            }
            bytesRead += rr2;
          } catch (err) {
            if (err instanceof PartialReadError) {
              err.partial = p28.subarray(0, bytesRead);
            }
            throw err;
          }
        }
        return p28;
      }
      /** Returns the next byte [0, 255] or `null`. */
      async readByte() {
        while (this.#r === this.#w) {
          if (this.#eof) return null;
          await this.#fill();
        }
        const c24 = this.#buf[this.#r];
        this.#r++;
        return c24;
      }
      /** readString() reads until the first occurrence of delim in the input,
       * returning a string containing the data up to and including the delimiter.
       * If ReadString encounters an error before finding a delimiter,
       * it returns the data read before the error and the error itself
       * (often `null`).
       * ReadString returns err != nil if and only if the returned data does not end
       * in delim.
       * For simple uses, a Scanner may be more convenient.
       */
      async readString(delim) {
        if (delim.length !== 1) {
          throw new Error("Delimiter should be a single character");
        }
        const buffer = await this.readSlice(delim.charCodeAt(0));
        if (buffer === null) return null;
        return new TextDecoder().decode(buffer);
      }
      /** `readLine()` is a low-level line-reading primitive. Most callers should
       * use `readString('\n')` instead or use a Scanner.
       *
       * `readLine()` tries to return a single line, not including the end-of-line
       * bytes. If the line was too long for the buffer then `more` is set and the
       * beginning of the line is returned. The rest of the line will be returned
       * from future calls. `more` will be false when returning the last fragment
       * of the line. The returned buffer is only valid until the next call to
       * `readLine()`.
       *
       * The text returned from ReadLine does not include the line end ("\r\n" or
       * "\n").
       *
       * When the end of the underlying stream is reached, the final bytes in the
       * stream are returned. No indication or error is given if the input ends
       * without a final line end. When there are no more trailing bytes to read,
       * `readLine()` returns `null`.
       *
       * Calling `unreadByte()` after `readLine()` will always unread the last byte
       * read (possibly a character belonging to the line end) even if that byte is
       * not part of the line returned by `readLine()`.
       */
      async readLine() {
        let line = null;
        try {
          line = await this.readSlice(LF);
        } catch (err) {
          let partial;
          if (err instanceof PartialReadError) {
            partial = err.partial;
            assert4(
              partial instanceof Uint8Array,
              "bufio: caught error from `readSlice()` without `partial` property"
            );
          }
          if (!(err instanceof BufferFullError)) {
            throw err;
          }
          partial = err.partial;
          if (!this.#eof && partial && partial.byteLength > 0 && partial[partial.byteLength - 1] === CR) {
            assert4(this.#r > 0, "bufio: tried to rewind past start of buffer");
            this.#r--;
            partial = partial.subarray(0, partial.byteLength - 1);
          }
          if (partial) {
            return { line: partial, more: !this.#eof };
          }
        }
        if (line === null) {
          return null;
        }
        if (line.byteLength === 0) {
          return { line, more: false };
        }
        if (line[line.byteLength - 1] == LF) {
          let drop = 1;
          if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
            drop = 2;
          }
          line = line.subarray(0, line.byteLength - drop);
        }
        return { line, more: false };
      }
      /** `readSlice()` reads until the first occurrence of `delim` in the input,
       * returning a slice pointing at the bytes in the buffer. The bytes stop
       * being valid at the next read.
       *
       * If `readSlice()` encounters an error before finding a delimiter, or the
       * buffer fills without finding a delimiter, it throws an error with a
       * `partial` property that contains the entire buffer.
       *
       * If `readSlice()` encounters the end of the underlying stream and there are
       * any bytes left in the buffer, the rest of the buffer is returned. In other
       * words, EOF is always treated as a delimiter. Once the buffer is empty,
       * it returns `null`.
       *
       * Because the data returned from `readSlice()` will be overwritten by the
       * next I/O operation, most clients should use `readString()` instead.
       */
      async readSlice(delim) {
        let s28 = 0;
        let slice;
        while (true) {
          let i20 = this.#buf.subarray(this.#r + s28, this.#w).indexOf(delim);
          if (i20 >= 0) {
            i20 += s28;
            slice = this.#buf.subarray(this.#r, this.#r + i20 + 1);
            this.#r += i20 + 1;
            break;
          }
          if (this.#eof) {
            if (this.#r === this.#w) {
              return null;
            }
            slice = this.#buf.subarray(this.#r, this.#w);
            this.#r = this.#w;
            break;
          }
          if (this.buffered() >= this.#buf.byteLength) {
            this.#r = this.#w;
            const oldbuf = this.#buf;
            const newbuf = this.#buf.slice(0);
            this.#buf = newbuf;
            throw new BufferFullError(oldbuf);
          }
          s28 = this.#w - this.#r;
          try {
            await this.#fill();
          } catch (err) {
            if (err instanceof PartialReadError) {
              err.partial = slice;
            }
            throw err;
          }
        }
        return slice;
      }
      /** `peek()` returns the next `n` bytes without advancing the reader. The
       * bytes stop being valid at the next read call.
       *
       * When the end of the underlying stream is reached, but there are unread
       * bytes left in the buffer, those bytes are returned. If there are no bytes
       * left in the buffer, it returns `null`.
       *
       * If an error is encountered before `n` bytes are available, `peek()` throws
       * an error with the `partial` property set to a slice of the buffer that
       * contains the bytes that were available before the error occurred.
       */
      async peek(n33) {
        if (n33 < 0) {
          throw Error("negative count");
        }
        let avail = this.#w - this.#r;
        while (avail < n33 && avail < this.#buf.byteLength && !this.#eof) {
          try {
            await this.#fill();
          } catch (err) {
            if (err instanceof PartialReadError) {
              err.partial = this.#buf.subarray(this.#r, this.#w);
            }
            throw err;
          }
          avail = this.#w - this.#r;
        }
        if (avail === 0 && this.#eof) {
          return null;
        } else if (avail < n33 && this.#eof) {
          return this.#buf.subarray(this.#r, this.#r + avail);
        } else if (avail < n33) {
          throw new BufferFullError(this.#buf.subarray(this.#r, this.#w));
        }
        return this.#buf.subarray(this.#r, this.#r + n33);
      }
    };
  }
});

// https://deno.land/std@0.191.0/bytes/concat.ts
function concat(...buf) {
  let length = 0;
  for (const b25 of buf) {
    length += b25.length;
  }
  const output3 = new Uint8Array(length);
  let index = 0;
  for (const b25 of buf) {
    output3.set(b25, index);
    index += b25.length;
  }
  return output3;
}
var init_concat = __esm({
  "https://deno.land/std@0.191.0/bytes/concat.ts"() {
  }
});

// https://deno.land/std@0.191.0/io/read_lines.ts
async function* readLines(reader, decoderOpts) {
  const bufReader = new BufReader(reader);
  let chunks = [];
  const decoder = new TextDecoder(decoderOpts?.encoding, decoderOpts);
  while (true) {
    const res = await bufReader.readLine();
    if (!res) {
      if (chunks.length > 0) {
        yield decoder.decode(concat