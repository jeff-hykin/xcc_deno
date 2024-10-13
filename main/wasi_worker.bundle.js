var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// wasi/polyfills/bigint.js
var exports = {};
var globalObj = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
exports.BigIntPolyfill = typeof BigInt !== "undefined" ? BigInt : globalObj.BigInt || Number;
var { BigIntPolyfill } = exports;

// wasi/polyfills/dataview.js
var exports2 = {};
var exportedDataView = DataView;
if (!exportedDataView.prototype.setBigUint64) {
  exportedDataView.prototype.setBigUint64 = function(byteOffset, value, littleEndian) {
    let lowWord;
    let highWord;
    if (value < 2 ** 32) {
      lowWord = Number(value);
      highWord = 0;
    } else {
      var bigNumberAsBinaryStr = value.toString(2);
      var bigNumberAsBinaryStr2 = "";
      for (var i18 = 0; i18 < 64 - bigNumberAsBinaryStr.length; i18++) {
        bigNumberAsBinaryStr2 += "0";
      }
      bigNumberAsBinaryStr2 += bigNumberAsBinaryStr;
      highWord = parseInt(bigNumberAsBinaryStr2.substring(0, 32), 2);
      lowWord = parseInt(bigNumberAsBinaryStr2.substring(32), 2);
    }
    this.setUint32(byteOffset + (littleEndian ? 0 : 4), lowWord, littleEndian);
    this.setUint32(byteOffset + (littleEndian ? 4 : 0), highWord, littleEndian);
  };
  exportedDataView.prototype.getBigUint64 = function(byteOffset, littleEndian) {
    let lowWord = this.getUint32(byteOffset + (littleEndian ? 0 : 4), littleEndian);
    let highWord = this.getUint32(byteOffset + (littleEndian ? 4 : 0), littleEndian);
    var lowWordAsBinaryStr = lowWord.toString(2);
    var highWordAsBinaryStr = highWord.toString(2);
    var lowWordAsBinaryStrPadded = "";
    for (var i18 = 0; i18 < 32 - lowWordAsBinaryStr.length; i18++) {
      lowWordAsBinaryStrPadded += "0";
    }
    lowWordAsBinaryStrPadded += lowWordAsBinaryStr;
    return BigIntPolyfill("0b" + highWordAsBinaryStr + lowWordAsBinaryStrPadded);
  };
}
exports2.DataViewPolyfill = exportedDataView;
var { DataViewPolyfill } = exports2;

// node_shims/buffer.js
var buffer_exports2 = {};
__export(buffer_exports2, {
  Blob: () => Blob,
  Buffer: () => Buffer3,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES2,
  SlowBuffer: () => SlowBuffer2,
  atob: () => atob,
  btoa: () => btoa,
  constants: () => constants,
  default: () => buffer_default,
  isAscii: () => isAscii,
  isBuffer: () => isBuffer,
  isUtf8: () => isUtf8,
  kMaxLength: () => kMaxLength2,
  kStringMaxLength: () => kStringMaxLength
});

// node_shims/_config.js
var config = {
  forceBrowser: true
};

// node_shims/helpers/buffer.js
var buffer_exports = {};
__export(buffer_exports, {
  Buffer: () => Buffer2,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES,
  SlowBuffer: () => SlowBuffer,
  default: () => build_default3,
  kMaxLength: () => kMaxLength
});
var __defProp2 = Object.defineProperty;
var __export2 = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var base64_js_development_exports = {};
__export2(base64_js_development_exports, {
  byteLength: () => byteLength,
  default: () => build_default,
  fromByteArray: () => fromByteArray,
  toByteArray: () => toByteArray
});
var __create = Object.create;
var __defProp22 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export22 = (target, all) => {
  for (var name in all)
    __defProp22(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp22(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_base64_js = __commonJS({
  "../esmd/npm/base64-js@1.5.1/node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports10) {
    "use strict";
    exports10.byteLength = byteLength22;
    exports10.toByteArray = toByteArray22;
    exports10.fromByteArray = fromByteArray22;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i18 = 0, len = code.length; i18 < len; ++i18) {
      lookup[i18] = code[i18];
      revLookup[code.charCodeAt(i18)] = i18;
    }
    var i18;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength22(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray22(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i23;
      for (i23 = 0; i23 < len2; i23 += 4) {
        tmp = revLookup[b64.charCodeAt(i23)] << 18 | revLookup[b64.charCodeAt(i23 + 1)] << 12 | revLookup[b64.charCodeAt(i23 + 2)] << 6 | revLookup[b64.charCodeAt(i23 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i23)] << 2 | revLookup[b64.charCodeAt(i23 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i23)] << 10 | revLookup[b64.charCodeAt(i23 + 1)] << 4 | revLookup[b64.charCodeAt(i23 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i23 = start; i23 < end; i23 += 3) {
        tmp = (uint8[i23] << 16 & 16711680) + (uint8[i23 + 1] << 8 & 65280) + (uint8[i23 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray22(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i23 = 0, len22 = len2 - extraBytes; i23 < len22; i23 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i23, i23 + maxChunkLength > len22 ? len22 : i23 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});
var build_exports = {};
__export22(build_exports, {
  byteLength: () => byteLength,
  default: () => build_default,
  fromByteArray: () => fromByteArray,
  toByteArray: () => toByteArray
});
var __module = __toESM(require_base64_js());
__reExport(build_exports, __toESM(require_base64_js()));
var { byteLength, toByteArray, fromByteArray } = __module;
var { default: __default, ...__rest } = __module;
var build_default = __default !== void 0 ? __default : __rest;
var ieee754_development_exports = {};
__export2(ieee754_development_exports, {
  default: () => build_default2,
  read: () => read,
  write: () => write
});
var __create2 = Object.create;
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS2 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export3 = (target, all) => {
  for (var name in all)
    __defProp3(target, name, { get: all[name], enumerable: true });
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport2 = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_ieee754 = __commonJS2({
  "../esmd/npm/ieee754@1.2.1/node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js"(exports10) {
    exports10.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e3, m21;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i18 = isLE ? nBytes - 1 : 0;
      var d23 = isLE ? -1 : 1;
      var s26 = buffer[offset + i18];
      i18 += d23;
      e3 = s26 & (1 << -nBits) - 1;
      s26 >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e3 = e3 * 256 + buffer[offset + i18], i18 += d23, nBits -= 8) {
      }
      m21 = e3 & (1 << -nBits) - 1;
      e3 >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m21 = m21 * 256 + buffer[offset + i18], i18 += d23, nBits -= 8) {
      }
      if (e3 === 0) {
        e3 = 1 - eBias;
      } else if (e3 === eMax) {
        return m21 ? NaN : (s26 ? -1 : 1) * Infinity;
      } else {
        m21 = m21 + Math.pow(2, mLen);
        e3 = e3 - eBias;
      }
      return (s26 ? -1 : 1) * m21 * Math.pow(2, e3 - mLen);
    };
    exports10.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e3, m21, c23;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i18 = isLE ? 0 : nBytes - 1;
      var d23 = isLE ? 1 : -1;
      var s26 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m21 = isNaN(value) ? 1 : 0;
        e3 = eMax;
      } else {
        e3 = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c23 = Math.pow(2, -e3)) < 1) {
          e3--;
          c23 *= 2;
        }
        if (e3 + eBias >= 1) {
          value += rt / c23;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c23 >= 2) {
          e3++;
          c23 /= 2;
        }
        if (e3 + eBias >= eMax) {
          m21 = 0;
          e3 = eMax;
        } else if (e3 + eBias >= 1) {
          m21 = (value * c23 - 1) * Math.pow(2, mLen);
          e3 = e3 + eBias;
        } else {
          m21 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e3 = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i18] = m21 & 255, i18 += d23, m21 /= 256, mLen -= 8) {
      }
      e3 = e3 << mLen | m21;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i18] = e3 & 255, i18 += d23, e3 /= 256, eLen -= 8) {
      }
      buffer[offset + i18 - d23] |= s26 * 128;
    };
  }
});
var build_exports2 = {};
__export3(build_exports2, {
  default: () => build_default2,
  read: () => read,
  write: () => write
});
var __module2 = __toESM2(require_ieee754());
__reExport2(build_exports2, __toESM2(require_ieee754()));
var { read, write } = __module2;
var { default: __default2, ...__rest2 } = __module2;
var build_default2 = __default2 !== void 0 ? __default2 : __rest2;
var require2 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c23 = (m21) => Object.assign({ __esModule: true }, m21);
  switch (n30) {
    case "base64-js":
      return e3(base64_js_development_exports);
    case "ieee754":
      return e3(ieee754_development_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var __create3 = Object.create;
var __defProp4 = Object.defineProperty;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames3 = Object.getOwnPropertyNames;
var __getProtoOf3 = Object.getPrototypeOf;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x33) => typeof require2 !== "undefined" ? require2 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a17, b24) => (typeof require2 !== "undefined" ? require2 : a17)[b24]
}) : x33)(function(x33) {
  if (typeof require2 !== "undefined")
    return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __commonJS3 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export4 = (target, all) => {
  for (var name in all)
    __defProp4(target, name, { get: all[name], enumerable: true });
};
var __copyProps3 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames3(from))
      if (!__hasOwnProp3.call(to, key) && key !== except)
        __defProp4(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport3 = (target, mod, secondTarget) => (__copyProps3(target, mod, "default"), secondTarget && __copyProps3(secondTarget, mod, "default"));
var __toESM3 = (mod, isNodeMode, target) => (target = mod != null ? __create3(__getProtoOf3(mod)) : {}, __copyProps3(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp4(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_buffer = __commonJS3({
  "../esmd/npm/buffer@6.0.3/node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js"(exports10) {
    "use strict";
    var base64 = __require("base64-js");
    var ieee754 = __require("ieee754");
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports10.Buffer = Buffer32;
    exports10.SlowBuffer = SlowBuffer23;
    exports10.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports10.kMaxLength = K_MAX_LENGTH;
    Buffer32.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer32.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e3) {
        return false;
      }
    }
    Object.defineProperty(Buffer32.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer32.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer32.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer32.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer32.prototype);
      return buf;
    }
    function Buffer32(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer32.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer32.from(valueOf, encodingOrOffset, length);
      }
      const b24 = fromObject(value);
      if (b24)
        return b24;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer32.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer32.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer32.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer32, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer32.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer32.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer32.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer32.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength22(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i18 = 0; i18 < length; i18 += 1) {
        buf[i18] = array[i18] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer32.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer32.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer23(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer32.alloc(+length);
    }
    Buffer32.isBuffer = function isBuffer3(b24) {
      return b24 != null && b24._isBuffer === true && b24 !== Buffer32.prototype;
    };
    Buffer32.compare = function compare(a17, b24) {
      if (isInstance(a17, Uint8Array))
        a17 = Buffer32.from(a17, a17.offset, a17.byteLength);
      if (isInstance(b24, Uint8Array))
        b24 = Buffer32.from(b24, b24.offset, b24.byteLength);
      if (!Buffer32.isBuffer(a17) || !Buffer32.isBuffer(b24)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a17 === b24)
        return 0;
      let x33 = a17.length;
      let y23 = b24.length;
      for (let i18 = 0, len = Math.min(x33, y23); i18 < len; ++i18) {
        if (a17[i18] !== b24[i18]) {
          x33 = a17[i18];
          y23 = b24[i18];
          break;
        }
      }
      if (x33 < y23)
        return -1;
      if (y23 < x33)
        return 1;
      return 0;
    };
    Buffer32.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer32.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer32.alloc(0);
      }
      let i18;
      if (length === void 0) {
        length = 0;
        for (i18 = 0; i18 < list.length; ++i18) {
          length += list[i18].length;
        }
      }
      const buffer = Buffer32.allocUnsafe(length);
      let pos = 0;
      for (i18 = 0; i18 < list.length; ++i18) {
        let buf = list[i18];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer32.isBuffer(buf))
              buf = Buffer32.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer32.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength22(string, encoding) {
      if (Buffer32.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer32.byteLength = byteLength22;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer32.prototype._isBuffer = true;
    function swap(b24, n30, m21) {
      const i18 = b24[n30];
      b24[n30] = b24[m21];
      b24[m21] = i18;
    }
    Buffer32.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i18 = 0; i18 < len; i18 += 2) {
        swap(this, i18, i18 + 1);
      }
      return this;
    };
    Buffer32.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i18 = 0; i18 < len; i18 += 4) {
        swap(this, i18, i18 + 3);
        swap(this, i18 + 1, i18 + 2);
      }
      return this;
    };
    Buffer32.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i18 = 0; i18 < len; i18 += 8) {
        swap(this, i18, i18 + 7);
        swap(this, i18 + 1, i18 + 6);
        swap(this, i18 + 2, i18 + 5);
        swap(this, i18 + 3, i18 + 4);
      }
      return this;
    };
    Buffer32.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer32.prototype.toLocaleString = Buffer32.prototype.toString;
    Buffer32.prototype.equals = function equals(b24) {
      if (!Buffer32.isBuffer(b24))
        throw new TypeError("Argument must be a Buffer");
      if (this === b24)
        return true;
      return Buffer32.compare(this, b24) === 0;
    };
    Buffer32.prototype.inspect = function inspect3() {
      let str = "";
      const max = exports10.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer32.prototype[customInspectSymbol] = Buffer32.prototype.inspect;
    }
    Buffer32.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer32.from(target, target.offset, target.byteLength);
      }
      if (!Buffer32.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x33 = thisEnd - thisStart;
      let y23 = end - start;
      const len = Math.min(x33, y23);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i18 = 0; i18 < len; ++i18) {
        if (thisCopy[i18] !== targetCopy[i18]) {
          x33 = thisCopy[i18];
          y23 = targetCopy[i18];
          break;
        }
      }
      if (x33 < y23)
        return -1;
      if (y23 < x33)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer32.from(val, encoding);
      }
      if (Buffer32.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read22(buf, i23) {
        if (indexSize === 1) {
          return buf[i23];
        } else {
          return buf.readUInt16BE(i23 * indexSize);
        }
      }
      let i18;
      if (dir) {
        let foundIndex = -1;
        for (i18 = byteOffset; i18 < arrLength; i18++) {
          if (read22(arr, i18) === read22(val, foundIndex === -1 ? 0 : i18 - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i18;
            if (i18 - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i18 -= i18 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i18 = byteOffset; i18 >= 0; i18--) {
          let found = true;
          for (let j15 = 0; j15 < valLength; j15++) {
            if (read22(arr, i18 + j15) !== read22(val, j15)) {
              found = false;
              break;
            }
          }
          if (found)
            return i18;
        }
      }
      return -1;
    }
    Buffer32.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer32.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer32.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i18;
      for (i18 = 0; i18 < length; ++i18) {
        const parsed = parseInt(string.substr(i18 * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i18;
        buf[offset + i18] = parsed;
      }
      return i18;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer32.prototype.write = function write22(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer32.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i18 = start;
      while (i18 < end) {
        const firstByte = buf[i18];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i18 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i18 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i18 + 1];
              thirdByte = buf[i18 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i18 + 1];
              thirdByte = buf[i18 + 2];
              fourthByte = buf[i18 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i18 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i18 = 0;
      while (i18 < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i18, i18 += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i18 = start; i18 < end; ++i18) {
        ret += String.fromCharCode(buf[i18] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i18 = start; i18 < end; ++i18) {
        ret += String.fromCharCode(buf[i18]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i18 = start; i18 < end; ++i18) {
        out += hexSliceLookupTable[buf[i18]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i18 = 0; i18 < bytes.length - 1; i18 += 2) {
        res += String.fromCharCode(bytes[i18] + bytes[i18 + 1] * 256);
      }
      return res;
    }
    Buffer32.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer32.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer32.prototype.readUintLE = Buffer32.prototype.readUIntLE = function readUIntLE(offset, byteLength222, noAssert) {
      offset = offset >>> 0;
      byteLength222 = byteLength222 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength222, this.length);
      let val = this[offset];
      let mul = 1;
      let i18 = 0;
      while (++i18 < byteLength222 && (mul *= 256)) {
        val += this[offset + i18] * mul;
      }
      return val;
    };
    Buffer32.prototype.readUintBE = Buffer32.prototype.readUIntBE = function readUIntBE(offset, byteLength222, noAssert) {
      offset = offset >>> 0;
      byteLength222 = byteLength222 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength222, this.length);
      }
      let val = this[offset + --byteLength222];
      let mul = 1;
      while (byteLength222 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength222] * mul;
      }
      return val;
    };
    Buffer32.prototype.readUint8 = Buffer32.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer32.prototype.readUint16LE = Buffer32.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer32.prototype.readUint16BE = Buffer32.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer32.prototype.readUint32LE = Buffer32.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer32.prototype.readUint32BE = Buffer32.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer32.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer32.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer32.prototype.readIntLE = function readIntLE(offset, byteLength222, noAssert) {
      offset = offset >>> 0;
      byteLength222 = byteLength222 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength222, this.length);
      let val = this[offset];
      let mul = 1;
      let i18 = 0;
      while (++i18 < byteLength222 && (mul *= 256)) {
        val += this[offset + i18] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength222);
      return val;
    };
    Buffer32.prototype.readIntBE = function readIntBE(offset, byteLength222, noAssert) {
      offset = offset >>> 0;
      byteLength222 = byteLength222 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength222, this.length);
      let i18 = byteLength222;
      let mul = 1;
      let val = this[offset + --i18];
      while (i18 > 0 && (mul *= 256)) {
        val += this[offset + --i18] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength222);
      return val;
    };
    Buffer32.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer32.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer32.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer32.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer32.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer32.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer32.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer32.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer32.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer32.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer32.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer32.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer32.prototype.writeUintLE = Buffer32.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength222, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength222 = byteLength222 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength222) - 1;
        checkInt(this, value, offset, byteLength222, maxBytes, 0);
      }
      let mul = 1;
      let i18 = 0;
      this[offset] = value & 255;
      while (++i18 < byteLength222 && (mul *= 256)) {
        this[offset + i18] = value / mul & 255;
      }
      return offset + byteLength222;
    };
    Buffer32.prototype.writeUintBE = Buffer32.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength222, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength222 = byteLength222 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength222) - 1;
        checkInt(this, value, offset, byteLength222, maxBytes, 0);
      }
      let i18 = byteLength222 - 1;
      let mul = 1;
      this[offset + i18] = value & 255;
      while (--i18 >= 0 && (mul *= 256)) {
        this[offset + i18] = value / mul & 255;
      }
      return offset + byteLength222;
    };
    Buffer32.prototype.writeUint8 = Buffer32.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer32.prototype.writeUint16LE = Buffer32.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer32.prototype.writeUint16BE = Buffer32.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer32.prototype.writeUint32LE = Buffer32.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer32.prototype.writeUint32BE = Buffer32.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer32.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer32.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer32.prototype.writeIntLE = function writeIntLE(value, offset, byteLength222, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength222 - 1);
        checkInt(this, value, offset, byteLength222, limit - 1, -limit);
      }
      let i18 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i18 < byteLength222 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i18 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i18] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength222;
    };
    Buffer32.prototype.writeIntBE = function writeIntBE(value, offset, byteLength222, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength222 - 1);
        checkInt(this, value, offset, byteLength222, limit - 1, -limit);
      }
      let i18 = byteLength222 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i18] = value & 255;
      while (--i18 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i18 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i18] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength222;
    };
    Buffer32.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer32.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer32.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer32.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer32.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer32.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer32.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer32.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer32.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer32.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer32.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer32.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer32.isBuffer(target) && !ArrayBuffer.isView(target)) {
        throw new TypeError("argument should be a Buffer");
      }
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer32.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer32.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i18;
      if (typeof val === "number") {
        for (i18 = start; i18 < end; ++i18) {
          this[i18] = val;
        }
      } else {
        const bytes = Buffer32.isBuffer(val) ? val : Buffer32.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i18 = 0; i18 < end - start; ++i18) {
          this[i18 + start] = bytes[i18 % len];
        }
      }
      return this;
    };
    var errors = {};
    function E16(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E16(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E16(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E16(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i18 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i18 >= start + 4; i18 -= 3) {
        res = `_${val.slice(i18 - 3, i18)}${res}`;
      }
      return `${val.slice(0, i18)}${res}`;
    }
    function checkBounds(buf, offset, byteLength222) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength222] === void 0) {
        boundsError(offset, buf.length - (byteLength222 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength222) {
      if (value > max || value < min) {
        const n30 = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength222 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n30} and < 2${n30} ** ${(byteLength222 + 1) * 8}${n30}`;
          } else {
            range = `>= -(2${n30} ** ${(byteLength222 + 1) * 8 - 1}${n30}) and < 2 ** ${(byteLength222 + 1) * 8 - 1}${n30}`;
          }
        } else {
          range = `>= ${min}${n30} and <= ${max}${n30}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength222);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i18 = 0; i18 < length; ++i18) {
        codePoint = string.charCodeAt(i18);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i18 + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i18 = 0; i18 < str.length; ++i18) {
        byteArray.push(str.charCodeAt(i18) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c23, hi, lo;
      const byteArray = [];
      for (let i18 = 0; i18 < str.length; ++i18) {
        if ((units -= 2) < 0)
          break;
        c23 = str.charCodeAt(i18);
        hi = c23 >> 8;
        lo = c23 % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i18;
      for (i18 = 0; i18 < length; ++i18) {
        if (i18 + offset >= dst.length || i18 >= src.length)
          break;
        dst[i18 + offset] = src[i18];
      }
      return i18;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i18 = 0; i18 < 16; ++i18) {
        const i162 = i18 * 16;
        for (let j15 = 0; j15 < 16; ++j15) {
          table[i162 + j15] = alphabet[i18] + alphabet[j15];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});
var build_exports3 = {};
__export4(build_exports3, {
  Buffer: () => Buffer2,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES,
  SlowBuffer: () => SlowBuffer,
  default: () => build_default3,
  kMaxLength: () => kMaxLength
});
var __module3 = __toESM3(require_buffer());
__reExport3(build_exports3, __toESM3(require_buffer()));
var { Buffer: Buffer2, SlowBuffer, INSPECT_MAX_BYTES, kMaxLength } = __module3;
var { default: __default3, ...__rest3 } = __module3;
var build_default3 = __default3 !== void 0 ? __default3 : __rest3;

// node_shims/buffer.js
var exported = buffer_exports;
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
  exported = await import("node:buffer");
}
var {
  INSPECT_MAX_BYTES: INSPECT_MAX_BYTES2,
  isBuffer,
  Blob,
  SlowBuffer: SlowBuffer2,
  btoa,
  isUtf8,
  kStringMaxLength,
  Buffer: Buffer3,
  atob,
  constants,
  isAscii,
  kMaxLength: kMaxLength2
} = exported;
var buffer_default = exported;

// https://esm.sh/path-browserify@1.0.1
var path_browserify_1_0_exports = {};
__export(path_browserify_1_0_exports, {
  _makeLong: () => M,
  basename: () => U,
  default: () => I,
  delimiter: () => Z,
  dirname: () => Q,
  extname: () => V,
  format: () => W,
  isAbsolute: () => G,
  join: () => H,
  normalize: () => F,
  parse: () => X,
  posix: () => j,
  relative: () => K,
  resolve: () => B,
  sep: () => Y,
  win32: () => $
});

// https://esm.sh/v135/path-browserify@1.0.1/denonext/path-browserify.mjs
import __Process$ from "node:process";
var z = Object.create;
var C = Object.defineProperty;
var D = Object.getOwnPropertyDescriptor;
var T = Object.getOwnPropertyNames;
var R = Object.getPrototypeOf;
var x = Object.prototype.hasOwnProperty;
var E = (l23, e3) => () => (e3 || l23((e3 = { exports: {} }).exports, e3), e3.exports);
var J = (l23, e3) => {
  for (var r2 in e3) C(l23, r2, { get: e3[r2], enumerable: true });
};
var b = (l23, e3, r2, t3) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let i18 of T(e3)) !x.call(l23, i18) && i18 !== r2 && C(l23, i18, { get: () => e3[i18], enumerable: !(t3 = D(e3, i18)) || t3.enumerable });
  return l23;
};
var g = (l23, e3, r2) => (b(l23, e3, "default"), r2 && b(r2, e3, "default"));
var w = (l23, e3, r2) => (r2 = l23 != null ? z(R(l23)) : {}, b(e3 || !l23 || !l23.__esModule ? C(r2, "default", { value: l23, enumerable: true }) : r2, l23));
var h = E((p26, _31) => {
  "use strict";
  function c23(l23) {
    if (typeof l23 != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(l23));
  }
  function y23(l23, e3) {
    for (var r2 = "", t3 = 0, i18 = -1, s26 = 0, n30, f18 = 0; f18 <= l23.length; ++f18) {
      if (f18 < l23.length) n30 = l23.charCodeAt(f18);
      else {
        if (n30 === 47) break;
        n30 = 47;
      }
      if (n30 === 47) {
        if (!(i18 === f18 - 1 || s26 === 1)) if (i18 !== f18 - 1 && s26 === 2) {
          if (r2.length < 2 || t3 !== 2 || r2.charCodeAt(r2.length - 1) !== 46 || r2.charCodeAt(r2.length - 2) !== 46) {
            if (r2.length > 2) {
              var a17 = r2.lastIndexOf("/");
              if (a17 !== r2.length - 1) {
                a17 === -1 ? (r2 = "", t3 = 0) : (r2 = r2.slice(0, a17), t3 = r2.length - 1 - r2.lastIndexOf("/")), i18 = f18, s26 = 0;
                continue;
              }
            } else if (r2.length === 2 || r2.length === 1) {
              r2 = "", t3 = 0, i18 = f18, s26 = 0;
              continue;
            }
          }
          e3 && (r2.length > 0 ? r2 += "/.." : r2 = "..", t3 = 2);
        } else r2.length > 0 ? r2 += "/" + l23.slice(i18 + 1, f18) : r2 = l23.slice(i18 + 1, f18), t3 = f18 - i18 - 1;
        i18 = f18, s26 = 0;
      } else n30 === 46 && s26 !== -1 ? ++s26 : s26 = -1;
    }
    return r2;
  }
  function q18(l23, e3) {
    var r2 = e3.dir || e3.root, t3 = e3.base || (e3.name || "") + (e3.ext || "");
    return r2 ? r2 === e3.root ? r2 + t3 : r2 + l23 + t3 : t3;
  }
  var m21 = { resolve: function() {
    for (var e3 = "", r2 = false, t3, i18 = arguments.length - 1; i18 >= -1 && !r2; i18--) {
      var s26;
      i18 >= 0 ? s26 = arguments[i18] : (t3 === void 0 && (t3 = __Process$.cwd()), s26 = t3), c23(s26), s26.length !== 0 && (e3 = s26 + "/" + e3, r2 = s26.charCodeAt(0) === 47);
    }
    return e3 = y23(e3, !r2), r2 ? e3.length > 0 ? "/" + e3 : "/" : e3.length > 0 ? e3 : ".";
  }, normalize: function(e3) {
    if (c23(e3), e3.length === 0) return ".";
    var r2 = e3.charCodeAt(0) === 47, t3 = e3.charCodeAt(e3.length - 1) === 47;
    return e3 = y23(e3, !r2), e3.length === 0 && !r2 && (e3 = "."), e3.length > 0 && t3 && (e3 += "/"), r2 ? "/" + e3 : e3;
  }, isAbsolute: function(e3) {
    return c23(e3), e3.length > 0 && e3.charCodeAt(0) === 47;
  }, join: function() {
    if (arguments.length === 0) return ".";
    for (var e3, r2 = 0; r2 < arguments.length; ++r2) {
      var t3 = arguments[r2];
      c23(t3), t3.length > 0 && (e3 === void 0 ? e3 = t3 : e3 += "/" + t3);
    }
    return e3 === void 0 ? "." : m21.normalize(e3);
  }, relative: function(e3, r2) {
    if (c23(e3), c23(r2), e3 === r2 || (e3 = m21.resolve(e3), r2 = m21.resolve(r2), e3 === r2)) return "";
    for (var t3 = 1; t3 < e3.length && e3.charCodeAt(t3) === 47; ++t3) ;
    for (var i18 = e3.length, s26 = i18 - t3, n30 = 1; n30 < r2.length && r2.charCodeAt(n30) === 47; ++n30) ;
    for (var f18 = r2.length, a17 = f18 - n30, v23 = s26 < a17 ? s26 : a17, u25 = -1, o26 = 0; o26 <= v23; ++o26) {
      if (o26 === v23) {
        if (a17 > v23) {
          if (r2.charCodeAt(n30 + o26) === 47) return r2.slice(n30 + o26 + 1);
          if (o26 === 0) return r2.slice(n30 + o26);
        } else s26 > v23 && (e3.charCodeAt(t3 + o26) === 47 ? u25 = o26 : o26 === 0 && (u25 = 0));
        break;
      }
      var k4 = e3.charCodeAt(t3 + o26), P16 = r2.charCodeAt(n30 + o26);
      if (k4 !== P16) break;
      k4 === 47 && (u25 = o26);
    }
    var A15 = "";
    for (o26 = t3 + u25 + 1; o26 <= i18; ++o26) (o26 === i18 || e3.charCodeAt(o26) === 47) && (A15.length === 0 ? A15 += ".." : A15 += "/..");
    return A15.length > 0 ? A15 + r2.slice(n30 + u25) : (n30 += u25, r2.charCodeAt(n30) === 47 && ++n30, r2.slice(n30));
  }, _makeLong: function(e3) {
    return e3;
  }, dirname: function(e3) {
    if (c23(e3), e3.length === 0) return ".";
    for (var r2 = e3.charCodeAt(0), t3 = r2 === 47, i18 = -1, s26 = true, n30 = e3.length - 1; n30 >= 1; --n30) if (r2 = e3.charCodeAt(n30), r2 === 47) {
      if (!s26) {
        i18 = n30;
        break;
      }
    } else s26 = false;
    return i18 === -1 ? t3 ? "/" : "." : t3 && i18 === 1 ? "//" : e3.slice(0, i18);
  }, basename: function(e3, r2) {
    if (r2 !== void 0 && typeof r2 != "string") throw new TypeError('"ext" argument must be a string');
    c23(e3);
    var t3 = 0, i18 = -1, s26 = true, n30;
    if (r2 !== void 0 && r2.length > 0 && r2.length <= e3.length) {
      if (r2.length === e3.length && r2 === e3) return "";
      var f18 = r2.length - 1, a17 = -1;
      for (n30 = e3.length - 1; n30 >= 0; --n30) {
        var v23 = e3.charCodeAt(n30);
        if (v23 === 47) {
          if (!s26) {
            t3 = n30 + 1;
            break;
          }
        } else a17 === -1 && (s26 = false, a17 = n30 + 1), f18 >= 0 && (v23 === r2.charCodeAt(f18) ? --f18 === -1 && (i18 = n30) : (f18 = -1, i18 = a17));
      }
      return t3 === i18 ? i18 = a17 : i18 === -1 && (i18 = e3.length), e3.slice(t3, i18);
    } else {
      for (n30 = e3.length - 1; n30 >= 0; --n30) if (e3.charCodeAt(n30) === 47) {
        if (!s26) {
          t3 = n30 + 1;
          break;
        }
      } else i18 === -1 && (s26 = false, i18 = n30 + 1);
      return i18 === -1 ? "" : e3.slice(t3, i18);
    }
  }, extname: function(e3) {
    c23(e3);
    for (var r2 = -1, t3 = 0, i18 = -1, s26 = true, n30 = 0, f18 = e3.length - 1; f18 >= 0; --f18) {
      var a17 = e3.charCodeAt(f18);
      if (a17 === 47) {
        if (!s26) {
          t3 = f18 + 1;
          break;
        }
        continue;
      }
      i18 === -1 && (s26 = false, i18 = f18 + 1), a17 === 46 ? r2 === -1 ? r2 = f18 : n30 !== 1 && (n30 = 1) : r2 !== -1 && (n30 = -1);
    }
    return r2 === -1 || i18 === -1 || n30 === 0 || n30 === 1 && r2 === i18 - 1 && r2 === t3 + 1 ? "" : e3.slice(r2, i18);
  }, format: function(e3) {
    if (e3 === null || typeof e3 != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e3);
    return q18("/", e3);
  }, parse: function(e3) {
    c23(e3);
    var r2 = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e3.length === 0) return r2;
    var t3 = e3.charCodeAt(0), i18 = t3 === 47, s26;
    i18 ? (r2.root = "/", s26 = 1) : s26 = 0;
    for (var n30 = -1, f18 = 0, a17 = -1, v23 = true, u25 = e3.length - 1, o26 = 0; u25 >= s26; --u25) {
      if (t3 = e3.charCodeAt(u25), t3 === 47) {
        if (!v23) {
          f18 = u25 + 1;
          break;
        }
        continue;
      }
      a17 === -1 && (v23 = false, a17 = u25 + 1), t3 === 46 ? n30 === -1 ? n30 = u25 : o26 !== 1 && (o26 = 1) : n30 !== -1 && (o26 = -1);
    }
    return n30 === -1 || a17 === -1 || o26 === 0 || o26 === 1 && n30 === a17 - 1 && n30 === f18 + 1 ? a17 !== -1 && (f18 === 0 && i18 ? r2.base = r2.name = e3.slice(1, a17) : r2.base = r2.name = e3.slice(f18, a17)) : (f18 === 0 && i18 ? (r2.name = e3.slice(1, n30), r2.base = e3.slice(1, a17)) : (r2.name = e3.slice(f18, n30), r2.base = e3.slice(f18, a17)), r2.ext = e3.slice(n30, a17)), f18 > 0 ? r2.dir = e3.slice(0, f18 - 1) : i18 && (r2.dir = "/"), r2;
  }, sep: "/", delimiter: ":", win32: null, posix: null };
  m21.posix = m21;
  _31.exports = m21;
});
var d = {};
J(d, { _makeLong: () => M, basename: () => U, default: () => I, delimiter: () => Z, dirname: () => Q, extname: () => V, format: () => W, isAbsolute: () => G, join: () => H, normalize: () => F, parse: () => X, posix: () => j, relative: () => K, resolve: () => B, sep: () => Y, win32: () => $ });
var L = w(h());
g(d, w(h()));
var { resolve: B, normalize: F, isAbsolute: G, join: H, relative: K, _makeLong: M, dirname: Q, basename: U, extname: V, format: W, parse: X, sep: Y, delimiter: Z, win32: $, posix: j } = L;
var { default: S, ...N } = L;
var I = S !== void 0 ? S : N;

// https://esm.sh/v135/safe-buffer@5.2.1/denonext/safe-buffer.mjs
var safe_buffer_exports = {};
__export(safe_buffer_exports, {
  Blob: () => U2,
  Buffer: () => M2,
  File: () => v,
  INSPECT_MAX_BYTES: () => R2,
  SlowBuffer: () => j2,
  atob: () => I2,
  btoa: () => F2,
  constants: () => N2,
  default: () => Y2,
  isAscii: () => k,
  isUtf8: () => P,
  kMaxLength: () => q,
  kStringMaxLength: () => C2,
  resolveObjectURL: () => L2,
  transcode: () => O
});
import * as __0$ from "node:buffer";
var require3 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c23 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "buffer":
      return e3(__0$);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var S2 = Object.create;
var s = Object.defineProperty;
var _ = Object.getOwnPropertyDescriptor;
var g2 = Object.getOwnPropertyNames;
var h2 = Object.getPrototypeOf;
var x2 = Object.prototype.hasOwnProperty;
var A = ((e3) => typeof require3 < "u" ? require3 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require3 < "u" ? require3 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require3 < "u") return require3.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var E2 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var T2 = (e3, r2) => {
  for (var t3 in r2) s(e3, t3, { get: r2[t3], enumerable: true });
};
var m = (e3, r2, t3, n30) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let l23 of g2(r2)) !x2.call(e3, l23) && l23 !== t3 && s(e3, l23, { get: () => r2[l23], enumerable: !(n30 = _(r2, l23)) || n30.enumerable });
  return e3;
};
var u = (e3, r2, t3) => (m(e3, r2, "default"), t3 && m(t3, r2, "default"));
var c = (e3, r2, t3) => (t3 = e3 != null ? S2(h2(e3)) : {}, m(r2 || !e3 || !e3.__esModule ? s(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var b2 = E2((p26, y23) => {
  var i18 = A("buffer"), o26 = i18.Buffer;
  function w12(e3, r2) {
    for (var t3 in e3) r2[t3] = e3[t3];
  }
  o26.from && o26.alloc && o26.allocUnsafe && o26.allocUnsafeSlow ? y23.exports = i18 : (w12(i18, p26), p26.Buffer = a17);
  function a17(e3, r2, t3) {
    return o26(e3, r2, t3);
  }
  a17.prototype = Object.create(o26.prototype);
  w12(o26, a17);
  a17.from = function(e3, r2, t3) {
    if (typeof e3 == "number") throw new TypeError("Argument must not be a number");
    return o26(e3, r2, t3);
  };
  a17.alloc = function(e3, r2, t3) {
    if (typeof e3 != "number") throw new TypeError("Argument must be a number");
    var n30 = o26(e3);
    return r2 !== void 0 ? typeof t3 == "string" ? n30.fill(r2, t3) : n30.fill(r2) : n30.fill(0), n30;
  };
  a17.allocUnsafe = function(e3) {
    if (typeof e3 != "number") throw new TypeError("Argument must be a number");
    return o26(e3);
  };
  a17.allocUnsafeSlow = function(e3) {
    if (typeof e3 != "number") throw new TypeError("Argument must be a number");
    return i18.SlowBuffer(e3);
  };
});
var f = {};
T2(f, { Blob: () => U2, Buffer: () => M2, File: () => v, INSPECT_MAX_BYTES: () => R2, SlowBuffer: () => j2, atob: () => I2, btoa: () => F2, constants: () => N2, default: () => Y2, isAscii: () => k, isUtf8: () => P, kMaxLength: () => q, kStringMaxLength: () => C2, resolveObjectURL: () => L2, transcode: () => O });
var d2 = c(b2());
u(f, c(b2()));
var { Blob: U2, File: v, resolveObjectURL: L2, Buffer: M2, SlowBuffer: j2, transcode: O, isUtf8: P, isAscii: k, kMaxLength: q, kStringMaxLength: C2, btoa: F2, atob: I2, constants: N2, INSPECT_MAX_BYTES: R2 } = d2;
var { default: B2, ...X2 } = d2;
var Y2 = B2 !== void 0 ? B2 : X2;

// https://esm.sh/v135/randombytes@2.1.0/denonext/randombytes.mjs
var randombytes_exports = {};
__export(randombytes_exports, {
  default: () => q2
});
import __Process$2 from "node:process";
var __global$ = globalThis || (typeof window !== "undefined" ? window : self);
var require4 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c23 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "safe-buffer":
      return e3(safe_buffer_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var y = Object.create;
var l = Object.defineProperty;
var _2 = Object.getOwnPropertyDescriptor;
var x3 = Object.getOwnPropertyNames;
var b3 = Object.getPrototypeOf;
var v2 = Object.prototype.hasOwnProperty;
var w2 = ((r2) => typeof require4 < "u" ? require4 : typeof Proxy < "u" ? new Proxy(r2, { get: (o26, e3) => (typeof require4 < "u" ? require4 : o26)[e3] }) : r2)(function(r2) {
  if (typeof require4 < "u") return require4.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var B3 = (r2, o26) => () => (o26 || r2((o26 = { exports: {} }).exports, o26), o26.exports);
var g3 = (r2, o26) => {
  for (var e3 in o26) l(r2, e3, { get: o26[e3], enumerable: true });
};
var u2 = (r2, o26, e3, t3) => {
  if (o26 && typeof o26 == "object" || typeof o26 == "function") for (let f18 of x3(o26)) !v2.call(r2, f18) && f18 !== e3 && l(r2, f18, { get: () => o26[f18], enumerable: !(t3 = _2(o26, f18)) || t3.enumerable });
  return r2;
};
var a = (r2, o26, e3) => (u2(r2, o26, "default"), e3 && u2(e3, o26, "default"));
var c2 = (r2, o26, e3) => (e3 = r2 != null ? y(b3(r2)) : {}, u2(o26 || !r2 || !r2.__esModule ? l(e3, "default", { value: r2, enumerable: true }) : e3, r2));
var p = B3((C7, m21) => {
  "use strict";
  var i18 = 65536, h20 = 4294967295;
  function E16() {
    throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
  }
  var R7 = w2("safe-buffer").Buffer, s26 = __global$.crypto || __global$.msCrypto;
  s26 && s26.getRandomValues ? m21.exports = T12 : m21.exports = E16;
  function T12(r2, o26) {
    if (r2 > h20) throw new RangeError("requested too many random bytes");
    var e3 = R7.allocUnsafe(r2);
    if (r2 > 0) if (r2 > i18) for (var t3 = 0; t3 < r2; t3 += i18) s26.getRandomValues(e3.slice(t3, t3 + i18));
    else s26.getRandomValues(e3);
    return typeof o26 == "function" ? __Process$2.nextTick(function() {
      o26(null, e3);
    }) : e3;
  }
});
var n = {};
g3(n, { default: () => q2 });
var U3 = c2(p());
a(n, c2(p()));
var { default: d3, ...V2 } = U3;
var q2 = d3 !== void 0 ? d3 : V2;

// https://esm.sh/v135/randomfill@1.0.4/denonext/randomfill.mjs
import __Process$3 from "node:process";
var __global$2 = globalThis || (typeof window !== "undefined" ? window : self);
var require5 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c23 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "safe-buffer":
      return e3(safe_buffer_exports);
    case "randombytes":
      return e3(randombytes_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var k2 = Object.create;
var m2 = Object.defineProperty;
var M3 = Object.getOwnPropertyDescriptor;
var R3 = Object.getOwnPropertyNames;
var b4 = Object.getPrototypeOf;
var q3 = Object.prototype.hasOwnProperty;
var w3 = ((r2) => typeof require5 < "u" ? require5 : typeof Proxy < "u" ? new Proxy(r2, { get: (n30, e3) => (typeof require5 < "u" ? require5 : n30)[e3] }) : r2)(function(r2) {
  if (typeof require5 < "u") return require5.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var L3 = (r2, n30) => () => (n30 || r2((n30 = { exports: {} }).exports, n30), n30.exports);
var V3 = (r2, n30) => {
  for (var e3 in n30) m2(r2, e3, { get: n30[e3], enumerable: true });
};
var i = (r2, n30, e3, t3) => {
  if (n30 && typeof n30 == "object" || typeof n30 == "function") for (let a17 of R3(n30)) !q3.call(r2, a17) && a17 !== e3 && m2(r2, a17, { get: () => n30[a17], enumerable: !(t3 = M3(n30, a17)) || t3.enumerable });
  return r2;
};
var l2 = (r2, n30, e3) => (i(r2, n30, "default"), e3 && i(e3, n30, "default"));
var d4 = (r2, n30, e3) => (e3 = r2 != null ? k2(b4(r2)) : {}, i(n30 || !r2 || !r2.__esModule ? m2(e3, "default", { value: r2, enumerable: true }) : e3, r2));
var p2 = L3((u25) => {
  "use strict";
  function f18() {
    throw new Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`);
  }
  var h20 = w3("safe-buffer"), g27 = w3("randombytes"), s26 = h20.Buffer, E16 = h20.kMaxLength, y23 = __global$2.crypto || __global$2.msCrypto, F10 = Math.pow(2, 32) - 1;
  function v23(r2, n30) {
    if (typeof r2 != "number" || r2 !== r2) throw new TypeError("offset must be a number");
    if (r2 > F10 || r2 < 0) throw new TypeError("offset must be a uint32");
    if (r2 > E16 || r2 > n30) throw new RangeError("offset out of range");
  }
  function x33(r2, n30, e3) {
    if (typeof r2 != "number" || r2 !== r2) throw new TypeError("size must be a number");
    if (r2 > F10 || r2 < 0) throw new TypeError("size must be a uint32");
    if (r2 + n30 > e3 || r2 > E16) throw new RangeError("buffer too small");
  }
  y23 && y23.getRandomValues || !__Process$3.browser ? (u25.randomFill = C7, u25.randomFillSync = I8) : (u25.randomFill = f18, u25.randomFillSync = f18);
  function C7(r2, n30, e3, t3) {
    if (!s26.isBuffer(r2) && !(r2 instanceof __global$2.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    if (typeof n30 == "function") t3 = n30, n30 = 0, e3 = r2.length;
    else if (typeof e3 == "function") t3 = e3, e3 = r2.length - n30;
    else if (typeof t3 != "function") throw new TypeError('"cb" argument must be a function');
    return v23(n30, r2.length), x33(e3, n30, r2.length), B8(r2, n30, e3, t3);
  }
  function B8(r2, n30, e3, t3) {
    if (__Process$3.browser) {
      var a17 = r2.buffer, _31 = new Uint8Array(a17, n30, e3);
      if (y23.getRandomValues(_31), t3) {
        __Process$3.nextTick(function() {
          t3(null, r2);
        });
        return;
      }
      return r2;
    }
    if (t3) {
      g27(e3, function(c23, S13) {
        if (c23) return t3(c23);
        S13.copy(r2, n30), t3(null, r2);
      });
      return;
    }
    var A15 = g27(e3);
    return A15.copy(r2, n30), r2;
  }
  function I8(r2, n30, e3) {
    if (typeof n30 > "u" && (n30 = 0), !s26.isBuffer(r2) && !(r2 instanceof __global$2.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    return v23(n30, r2.length), e3 === void 0 && (e3 = r2.length - n30), x33(e3, n30, r2.length), B8(r2, n30, e3);
  }
});
var o = {};
V3(o, { default: () => G2, randomFill: () => O2, randomFillSync: () => j3 });
var U4 = d4(p2());
l2(o, d4(p2()));
var { randomFill: O2, randomFillSync: j3 } = U4;
var { default: T3, ...D2 } = U4;
var G2 = T3 !== void 0 ? T3 : D2;

// wasi/polyfills/browser-hrtime.js
var baseNow = Math.floor((Date.now() - performance.now()) * 1e-3);
function hrtime(previousTimestamp) {
  let clocktime = performance.now() * 1e-3;
  let seconds = Math.floor(clocktime) + baseNow;
  let nanoseconds = Math.floor(clocktime % 1 * 1e9);
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
var browser_hrtime_default = hrtime;

// wasi/polyfills/hrtime.bigint.js
var NS_PER_SEC = 1e9;
var getBigIntHrtime = (nativeHrtime) => {
  return (time) => {
    const diff = nativeHrtime(time);
    return diff[0] * NS_PER_SEC + diff[1];
  };
};
var hrtime_bigint_default = getBigIntHrtime;

// wasi/errors.js
var WASIError = class _WASIError extends Error {
  constructor(errno) {
    super();
    this.errno = errno;
    Object.setPrototypeOf(this, _WASIError.prototype);
  }
};
var WASIExitError = class _WASIExitError extends Error {
  constructor(code) {
    super(`WASI Exit error: ${code}`);
    this.code = code;
    Object.setPrototypeOf(this, _WASIExitError.prototype);
  }
};
var WASIKillError = class _WASIKillError extends Error {
  constructor(signal) {
    super(`WASI Kill signal: ${signal}`);
    this.signal = signal;
    Object.setPrototypeOf(this, _WASIKillError.prototype);
  }
};

// wasi/bindings/browser.js
var bindings = {
  hrtime: hrtime_bigint_default(browser_hrtime_default),
  exit: (code) => {
    throw new WASIExitError(code);
  },
  kill: (signal) => {
    throw new WASIKillError(signal);
  },
  randomFillSync: G2.randomFillSync,
  isTTY: () => true,
  path: I,
  // Let the user attach the fs at runtime
  fs: null
};
var browser_default = bindings;

// wasi/constants.js
var exports3 = {};
exports3.WASI_ESUCCESS = 0;
exports3.WASI_E2BIG = 1;
exports3.WASI_EACCES = 2;
exports3.WASI_EADDRINUSE = 3;
exports3.WASI_EADDRNOTAVAIL = 4;
exports3.WASI_EAFNOSUPPORT = 5;
exports3.WASI_EAGAIN = 6;
exports3.WASI_EALREADY = 7;
exports3.WASI_EBADF = 8;
exports3.WASI_EBADMSG = 9;
exports3.WASI_EBUSY = 10;
exports3.WASI_ECANCELED = 11;
exports3.WASI_ECHILD = 12;
exports3.WASI_ECONNABORTED = 13;
exports3.WASI_ECONNREFUSED = 14;
exports3.WASI_ECONNRESET = 15;
exports3.WASI_EDEADLK = 16;
exports3.WASI_EDESTADDRREQ = 17;
exports3.WASI_EDOM = 18;
exports3.WASI_EDQUOT = 19;
exports3.WASI_EEXIST = 20;
exports3.WASI_EFAULT = 21;
exports3.WASI_EFBIG = 22;
exports3.WASI_EHOSTUNREACH = 23;
exports3.WASI_EIDRM = 24;
exports3.WASI_EILSEQ = 25;
exports3.WASI_EINPROGRESS = 26;
exports3.WASI_EINTR = 27;
exports3.WASI_EINVAL = 28;
exports3.WASI_EIO = 29;
exports3.WASI_EISCONN = 30;
exports3.WASI_EISDIR = 31;
exports3.WASI_ELOOP = 32;
exports3.WASI_EMFILE = 33;
exports3.WASI_EMLINK = 34;
exports3.WASI_EMSGSIZE = 35;
exports3.WASI_EMULTIHOP = 36;
exports3.WASI_ENAMETOOLONG = 37;
exports3.WASI_ENETDOWN = 38;
exports3.WASI_ENETRESET = 39;
exports3.WASI_ENETUNREACH = 40;
exports3.WASI_ENFILE = 41;
exports3.WASI_ENOBUFS = 42;
exports3.WASI_ENODEV = 43;
exports3.WASI_ENOENT = 44;
exports3.WASI_ENOEXEC = 45;
exports3.WASI_ENOLCK = 46;
exports3.WASI_ENOLINK = 47;
exports3.WASI_ENOMEM = 48;
exports3.WASI_ENOMSG = 49;
exports3.WASI_ENOPROTOOPT = 50;
exports3.WASI_ENOSPC = 51;
exports3.WASI_ENOSYS = 52;
exports3.WASI_ENOTCONN = 53;
exports3.WASI_ENOTDIR = 54;
exports3.WASI_ENOTEMPTY = 55;
exports3.WASI_ENOTRECOVERABLE = 56;
exports3.WASI_ENOTSOCK = 57;
exports3.WASI_ENOTSUP = 58;
exports3.WASI_ENOTTY = 59;
exports3.WASI_ENXIO = 60;
exports3.WASI_EOVERFLOW = 61;
exports3.WASI_EOWNERDEAD = 62;
exports3.WASI_EPERM = 63;
exports3.WASI_EPIPE = 64;
exports3.WASI_EPROTO = 65;
exports3.WASI_EPROTONOSUPPORT = 66;
exports3.WASI_EPROTOTYPE = 67;
exports3.WASI_ERANGE = 68;
exports3.WASI_EROFS = 69;
exports3.WASI_ESPIPE = 70;
exports3.WASI_ESRCH = 71;
exports3.WASI_ESTALE = 72;
exports3.WASI_ETIMEDOUT = 73;
exports3.WASI_ETXTBSY = 74;
exports3.WASI_EXDEV = 75;
exports3.WASI_ENOTCAPABLE = 76;
exports3.WASI_SIGABRT = 0;
exports3.WASI_SIGALRM = 1;
exports3.WASI_SIGBUS = 2;
exports3.WASI_SIGCHLD = 3;
exports3.WASI_SIGCONT = 4;
exports3.WASI_SIGFPE = 5;
exports3.WASI_SIGHUP = 6;
exports3.WASI_SIGILL = 7;
exports3.WASI_SIGINT = 8;
exports3.WASI_SIGKILL = 9;
exports3.WASI_SIGPIPE = 10;
exports3.WASI_SIGQUIT = 11;
exports3.WASI_SIGSEGV = 12;
exports3.WASI_SIGSTOP = 13;
exports3.WASI_SIGTERM = 14;
exports3.WASI_SIGTRAP = 15;
exports3.WASI_SIGTSTP = 16;
exports3.WASI_SIGTTIN = 17;
exports3.WASI_SIGTTOU = 18;
exports3.WASI_SIGURG = 19;
exports3.WASI_SIGUSR1 = 20;
exports3.WASI_SIGUSR2 = 21;
exports3.WASI_SIGVTALRM = 22;
exports3.WASI_SIGXCPU = 23;
exports3.WASI_SIGXFSZ = 24;
exports3.WASI_FILETYPE_UNKNOWN = 0;
exports3.WASI_FILETYPE_BLOCK_DEVICE = 1;
exports3.WASI_FILETYPE_CHARACTER_DEVICE = 2;
exports3.WASI_FILETYPE_DIRECTORY = 3;
exports3.WASI_FILETYPE_REGULAR_FILE = 4;
exports3.WASI_FILETYPE_SOCKET_DGRAM = 5;
exports3.WASI_FILETYPE_SOCKET_STREAM = 6;
exports3.WASI_FILETYPE_SYMBOLIC_LINK = 7;
exports3.WASI_FDFLAG_APPEND = 1;
exports3.WASI_FDFLAG_DSYNC = 2;
exports3.WASI_FDFLAG_NONBLOCK = 4;
exports3.WASI_FDFLAG_RSYNC = 8;
exports3.WASI_FDFLAG_SYNC = 16;
exports3.WASI_RIGHT_FD_DATASYNC = BigIntPolyfill(1);
exports3.WASI_RIGHT_FD_READ = BigIntPolyfill(2);
exports3.WASI_RIGHT_FD_SEEK = BigIntPolyfill(4);
exports3.WASI_RIGHT_FD_FDSTAT_SET_FLAGS = BigIntPolyfill(8);
exports3.WASI_RIGHT_FD_SYNC = BigIntPolyfill(16);
exports3.WASI_RIGHT_FD_TELL = BigIntPolyfill(32);
exports3.WASI_RIGHT_FD_WRITE = BigIntPolyfill(64);
exports3.WASI_RIGHT_FD_ADVISE = BigIntPolyfill(128);
exports3.WASI_RIGHT_FD_ALLOCATE = BigIntPolyfill(256);
exports3.WASI_RIGHT_PATH_CREATE_DIRECTORY = BigIntPolyfill(512);
exports3.WASI_RIGHT_PATH_CREATE_FILE = BigIntPolyfill(1024);
exports3.WASI_RIGHT_PATH_LINK_SOURCE = BigIntPolyfill(2048);
exports3.WASI_RIGHT_PATH_LINK_TARGET = BigIntPolyfill(4096);
exports3.WASI_RIGHT_PATH_OPEN = BigIntPolyfill(8192);
exports3.WASI_RIGHT_FD_READDIR = BigIntPolyfill(16384);
exports3.WASI_RIGHT_PATH_READLINK = BigIntPolyfill(32768);
exports3.WASI_RIGHT_PATH_RENAME_SOURCE = BigIntPolyfill(65536);
exports3.WASI_RIGHT_PATH_RENAME_TARGET = BigIntPolyfill(131072);
exports3.WASI_RIGHT_PATH_FILESTAT_GET = BigIntPolyfill(262144);
exports3.WASI_RIGHT_PATH_FILESTAT_SET_SIZE = BigIntPolyfill(524288);
exports3.WASI_RIGHT_PATH_FILESTAT_SET_TIMES = BigIntPolyfill(1048576);
exports3.WASI_RIGHT_FD_FILESTAT_GET = BigIntPolyfill(2097152);
exports3.WASI_RIGHT_FD_FILESTAT_SET_SIZE = BigIntPolyfill(4194304);
exports3.WASI_RIGHT_FD_FILESTAT_SET_TIMES = BigIntPolyfill(8388608);
exports3.WASI_RIGHT_PATH_SYMLINK = BigIntPolyfill(16777216);
exports3.WASI_RIGHT_PATH_REMOVE_DIRECTORY = BigIntPolyfill(33554432);
exports3.WASI_RIGHT_PATH_UNLINK_FILE = BigIntPolyfill(67108864);
exports3.WASI_RIGHT_POLL_FD_READWRITE = BigIntPolyfill(134217728);
exports3.WASI_RIGHT_SOCK_SHUTDOWN = BigIntPolyfill(268435456);
exports3.RIGHTS_ALL = exports3.WASI_RIGHT_FD_DATASYNC | exports3.WASI_RIGHT_FD_READ | exports3.WASI_RIGHT_FD_SEEK | exports3.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports3.WASI_RIGHT_FD_SYNC | exports3.WASI_RIGHT_FD_TELL | exports3.WASI_RIGHT_FD_WRITE | exports3.WASI_RIGHT_FD_ADVISE | exports3.WASI_RIGHT_FD_ALLOCATE | exports3.WASI_RIGHT_PATH_CREATE_DIRECTORY | exports3.WASI_RIGHT_PATH_CREATE_FILE | exports3.WASI_RIGHT_PATH_LINK_SOURCE | exports3.WASI_RIGHT_PATH_LINK_TARGET | exports3.WASI_RIGHT_PATH_OPEN | exports3.WASI_RIGHT_FD_READDIR | exports3.WASI_RIGHT_PATH_READLINK | exports3.WASI_RIGHT_PATH_RENAME_SOURCE | exports3.WASI_RIGHT_PATH_RENAME_TARGET | exports3.WASI_RIGHT_PATH_FILESTAT_GET | exports3.WASI_RIGHT_PATH_FILESTAT_SET_SIZE | exports3.WASI_RIGHT_PATH_FILESTAT_SET_TIMES | exports3.WASI_RIGHT_FD_FILESTAT_GET | exports3.WASI_RIGHT_FD_FILESTAT_SET_TIMES | exports3.WASI_RIGHT_FD_FILESTAT_SET_SIZE | exports3.WASI_RIGHT_PATH_SYMLINK | exports3.WASI_RIGHT_PATH_UNLINK_FILE | exports3.WASI_RIGHT_PATH_REMOVE_DIRECTORY | exports3.WASI_RIGHT_POLL_FD_READWRITE | exports3.WASI_RIGHT_SOCK_SHUTDOWN;
exports3.RIGHTS_BLOCK_DEVICE_BASE = exports3.RIGHTS_ALL;
exports3.RIGHTS_BLOCK_DEVICE_INHERITING = exports3.RIGHTS_ALL;
exports3.RIGHTS_CHARACTER_DEVICE_BASE = exports3.RIGHTS_ALL;
exports3.RIGHTS_CHARACTER_DEVICE_INHERITING = exports3.RIGHTS_ALL;
exports3.RIGHTS_REGULAR_FILE_BASE = exports3.WASI_RIGHT_FD_DATASYNC | exports3.WASI_RIGHT_FD_READ | exports3.WASI_RIGHT_FD_SEEK | exports3.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports3.WASI_RIGHT_FD_SYNC | exports3.WASI_RIGHT_FD_TELL | exports3.WASI_RIGHT_FD_WRITE | exports3.WASI_RIGHT_FD_ADVISE | exports3.WASI_RIGHT_FD_ALLOCATE | exports3.WASI_RIGHT_FD_FILESTAT_GET | exports3.WASI_RIGHT_FD_FILESTAT_SET_SIZE | exports3.WASI_RIGHT_FD_FILESTAT_SET_TIMES | exports3.WASI_RIGHT_POLL_FD_READWRITE;
exports3.RIGHTS_REGULAR_FILE_INHERITING = BigIntPolyfill(0);
exports3.RIGHTS_DIRECTORY_BASE = exports3.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports3.WASI_RIGHT_FD_SYNC | exports3.WASI_RIGHT_FD_ADVISE | exports3.WASI_RIGHT_PATH_CREATE_DIRECTORY | exports3.WASI_RIGHT_PATH_CREATE_FILE | exports3.WASI_RIGHT_PATH_LINK_SOURCE | exports3.WASI_RIGHT_PATH_LINK_TARGET | exports3.WASI_RIGHT_PATH_OPEN | exports3.WASI_RIGHT_FD_READDIR | exports3.WASI_RIGHT_PATH_READLINK | exports3.WASI_RIGHT_PATH_RENAME_SOURCE | exports3.WASI_RIGHT_PATH_RENAME_TARGET | exports3.WASI_RIGHT_PATH_FILESTAT_GET | exports3.WASI_RIGHT_PATH_FILESTAT_SET_SIZE | exports3.WASI_RIGHT_PATH_FILESTAT_SET_TIMES | exports3.WASI_RIGHT_FD_FILESTAT_GET | exports3.WASI_RIGHT_FD_FILESTAT_SET_TIMES | exports3.WASI_RIGHT_PATH_SYMLINK | exports3.WASI_RIGHT_PATH_UNLINK_FILE | exports3.WASI_RIGHT_PATH_REMOVE_DIRECTORY | exports3.WASI_RIGHT_POLL_FD_READWRITE;
exports3.RIGHTS_DIRECTORY_INHERITING = exports3.RIGHTS_DIRECTORY_BASE | exports3.RIGHTS_REGULAR_FILE_BASE;
exports3.RIGHTS_SOCKET_BASE = exports3.WASI_RIGHT_FD_READ | exports3.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports3.WASI_RIGHT_FD_WRITE | exports3.WASI_RIGHT_FD_FILESTAT_GET | exports3.WASI_RIGHT_POLL_FD_READWRITE | exports3.WASI_RIGHT_SOCK_SHUTDOWN;
exports3.RIGHTS_SOCKET_INHERITING = exports3.RIGHTS_ALL;
exports3.RIGHTS_TTY_BASE = exports3.WASI_RIGHT_FD_READ | exports3.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports3.WASI_RIGHT_FD_WRITE | exports3.WASI_RIGHT_FD_FILESTAT_GET | exports3.WASI_RIGHT_POLL_FD_READWRITE;
exports3.RIGHTS_TTY_INHERITING = BigIntPolyfill(0);
exports3.WASI_CLOCK_REALTIME = 0;
exports3.WASI_CLOCK_MONOTONIC = 1;
exports3.WASI_CLOCK_PROCESS_CPUTIME_ID = 2;
exports3.WASI_CLOCK_THREAD_CPUTIME_ID = 3;
exports3.WASI_EVENTTYPE_CLOCK = 0;
exports3.WASI_EVENTTYPE_FD_READ = 1;
exports3.WASI_EVENTTYPE_FD_WRITE = 2;
exports3.WASI_FILESTAT_SET_ATIM = 1 << 0;
exports3.WASI_FILESTAT_SET_ATIM_NOW = 1 << 1;
exports3.WASI_FILESTAT_SET_MTIM = 1 << 2;
exports3.WASI_FILESTAT_SET_MTIM_NOW = 1 << 3;
exports3.WASI_O_CREAT = 1 << 0;
exports3.WASI_O_DIRECTORY = 1 << 1;
exports3.WASI_O_EXCL = 1 << 2;
exports3.WASI_O_TRUNC = 1 << 3;
exports3.WASI_PREOPENTYPE_DIR = 0;
exports3.WASI_DIRCOOKIE_START = 0;
exports3.WASI_STDIN_FILENO = 0;
exports3.WASI_STDOUT_FILENO = 1;
exports3.WASI_STDERR_FILENO = 2;
exports3.WASI_WHENCE_SET = 0;
exports3.WASI_WHENCE_CUR = 1;
exports3.WASI_WHENCE_END = 2;
exports3.ERROR_MAP = {
  E2BIG: exports3.WASI_E2BIG,
  EACCES: exports3.WASI_EACCES,
  EADDRINUSE: exports3.WASI_EADDRINUSE,
  EADDRNOTAVAIL: exports3.WASI_EADDRNOTAVAIL,
  EAFNOSUPPORT: exports3.WASI_EAFNOSUPPORT,
  EALREADY: exports3.WASI_EALREADY,
  EAGAIN: exports3.WASI_EAGAIN,
  // EBADE: WASI_EBADE,
  EBADF: exports3.WASI_EBADF,
  // EBADFD: WASI_EBADFD,
  EBADMSG: exports3.WASI_EBADMSG,
  // EBADR: WASI_EBADR,
  // EBADRQC: WASI_EBADRQC,
  // EBADSLT: WASI_EBADSLT,
  EBUSY: exports3.WASI_EBUSY,
  ECANCELED: exports3.WASI_ECANCELED,
  ECHILD: exports3.WASI_ECHILD,
  // ECHRNG: WASI_ECHRNG,
  // ECOMM: WASI_ECOMM,
  ECONNABORTED: exports3.WASI_ECONNABORTED,
  ECONNREFUSED: exports3.WASI_ECONNREFUSED,
  ECONNRESET: exports3.WASI_ECONNRESET,
  EDEADLOCK: exports3.WASI_EDEADLK,
  EDESTADDRREQ: exports3.WASI_EDESTADDRREQ,
  EDOM: exports3.WASI_EDOM,
  EDQUOT: exports3.WASI_EDQUOT,
  EEXIST: exports3.WASI_EEXIST,
  EFAULT: exports3.WASI_EFAULT,
  EFBIG: exports3.WASI_EFBIG,
  EHOSTDOWN: exports3.WASI_EHOSTUNREACH,
  EHOSTUNREACH: exports3.WASI_EHOSTUNREACH,
  // EHWPOISON: WASI_EHWPOISON,
  EIDRM: exports3.WASI_EIDRM,
  EILSEQ: exports3.WASI_EILSEQ,
  EINPROGRESS: exports3.WASI_EINPROGRESS,
  EINTR: exports3.WASI_EINTR,
  EINVAL: exports3.WASI_EINVAL,
  EIO: exports3.WASI_EIO,
  EISCONN: exports3.WASI_EISCONN,
  EISDIR: exports3.WASI_EISDIR,
  ELOOP: exports3.WASI_ELOOP,
  EMFILE: exports3.WASI_EMFILE,
  EMLINK: exports3.WASI_EMLINK,
  EMSGSIZE: exports3.WASI_EMSGSIZE,
  EMULTIHOP: exports3.WASI_EMULTIHOP,
  ENAMETOOLONG: exports3.WASI_ENAMETOOLONG,
  ENETDOWN: exports3.WASI_ENETDOWN,
  ENETRESET: exports3.WASI_ENETRESET,
  ENETUNREACH: exports3.WASI_ENETUNREACH,
  ENFILE: exports3.WASI_ENFILE,
  ENOBUFS: exports3.WASI_ENOBUFS,
  ENODEV: exports3.WASI_ENODEV,
  ENOENT: exports3.WASI_ENOENT,
  ENOEXEC: exports3.WASI_ENOEXEC,
  ENOLCK: exports3.WASI_ENOLCK,
  ENOLINK: exports3.WASI_ENOLINK,
  ENOMEM: exports3.WASI_ENOMEM,
  ENOMSG: exports3.WASI_ENOMSG,
  ENOPROTOOPT: exports3.WASI_ENOPROTOOPT,
  ENOSPC: exports3.WASI_ENOSPC,
  ENOSYS: exports3.WASI_ENOSYS,
  ENOTCONN: exports3.WASI_ENOTCONN,
  ENOTDIR: exports3.WASI_ENOTDIR,
  ENOTEMPTY: exports3.WASI_ENOTEMPTY,
  ENOTRECOVERABLE: exports3.WASI_ENOTRECOVERABLE,
  ENOTSOCK: exports3.WASI_ENOTSOCK,
  ENOTTY: exports3.WASI_ENOTTY,
  ENXIO: exports3.WASI_ENXIO,
  EOVERFLOW: exports3.WASI_EOVERFLOW,
  EOWNERDEAD: exports3.WASI_EOWNERDEAD,
  EPERM: exports3.WASI_EPERM,
  EPIPE: exports3.WASI_EPIPE,
  EPROTO: exports3.WASI_EPROTO,
  EPROTONOSUPPORT: exports3.WASI_EPROTONOSUPPORT,
  EPROTOTYPE: exports3.WASI_EPROTOTYPE,
  ERANGE: exports3.WASI_ERANGE,
  EROFS: exports3.WASI_EROFS,
  ESPIPE: exports3.WASI_ESPIPE,
  ESRCH: exports3.WASI_ESRCH,
  ESTALE: exports3.WASI_ESTALE,
  ETIMEDOUT: exports3.WASI_ETIMEDOUT,
  ETXTBSY: exports3.WASI_ETXTBSY,
  EXDEV: exports3.WASI_EXDEV
};
exports3.SIGNAL_MAP = {
  [exports3.WASI_SIGHUP]: "SIGHUP",
  [exports3.WASI_SIGINT]: "SIGINT",
  [exports3.WASI_SIGQUIT]: "SIGQUIT",
  [exports3.WASI_SIGILL]: "SIGILL",
  [exports3.WASI_SIGTRAP]: "SIGTRAP",
  [exports3.WASI_SIGABRT]: "SIGABRT",
  [exports3.WASI_SIGBUS]: "SIGBUS",
  [exports3.WASI_SIGFPE]: "SIGFPE",
  [exports3.WASI_SIGKILL]: "SIGKILL",
  [exports3.WASI_SIGUSR1]: "SIGUSR1",
  [exports3.WASI_SIGSEGV]: "SIGSEGV",
  [exports3.WASI_SIGUSR2]: "SIGUSR2",
  [exports3.WASI_SIGPIPE]: "SIGPIPE",
  [exports3.WASI_SIGALRM]: "SIGALRM",
  [exports3.WASI_SIGTERM]: "SIGTERM",
  [exports3.WASI_SIGCHLD]: "SIGCHLD",
  [exports3.WASI_SIGCONT]: "SIGCONT",
  [exports3.WASI_SIGSTOP]: "SIGSTOP",
  [exports3.WASI_SIGTSTP]: "SIGTSTP",
  [exports3.WASI_SIGTTIN]: "SIGTTIN",
  [exports3.WASI_SIGTTOU]: "SIGTTOU",
  [exports3.WASI_SIGURG]: "SIGURG",
  [exports3.WASI_SIGXCPU]: "SIGXCPU",
  [exports3.WASI_SIGXFSZ]: "SIGXFSZ",
  [exports3.WASI_SIGVTALRM]: "SIGVTALRM"
};
var constants_default = exports3;
var {
  WASI_ESUCCESS,
  WASI_E2BIG,
  WASI_EACCES,
  WASI_EADDRINUSE,
  WASI_EADDRNOTAVAIL,
  WASI_EAFNOSUPPORT,
  WASI_EAGAIN,
  WASI_EALREADY,
  WASI_EBADF,
  WASI_EBADMSG,
  WASI_EBUSY,
  WASI_ECANCELED,
  WASI_ECHILD,
  WASI_ECONNABORTED,
  WASI_ECONNREFUSED,
  WASI_ECONNRESET,
  WASI_EDEADLK,
  WASI_EDESTADDRREQ,
  WASI_EDOM,
  WASI_EDQUOT,
  WASI_EEXIST,
  WASI_EFAULT,
  WASI_EFBIG,
  WASI_EHOSTUNREACH,
  WASI_EIDRM,
  WASI_EILSEQ,
  WASI_EINPROGRESS,
  WASI_EINTR,
  WASI_EINVAL,
  WASI_EIO,
  WASI_EISCONN,
  WASI_EISDIR,
  WASI_ELOOP,
  WASI_EMFILE,
  WASI_EMLINK,
  WASI_EMSGSIZE,
  WASI_EMULTIHOP,
  WASI_ENAMETOOLONG,
  WASI_ENETDOWN,
  WASI_ENETRESET,
  WASI_ENETUNREACH,
  WASI_ENFILE,
  WASI_ENOBUFS,
  WASI_ENODEV,
  WASI_ENOENT,
  WASI_ENOEXEC,
  WASI_ENOLCK,
  WASI_ENOLINK,
  WASI_ENOMEM,
  WASI_ENOMSG,
  WASI_ENOPROTOOPT,
  WASI_ENOSPC,
  WASI_ENOSYS,
  WASI_ENOTCONN,
  WASI_ENOTDIR,
  WASI_ENOTEMPTY,
  WASI_ENOTRECOVERABLE,
  WASI_ENOTSOCK,
  WASI_ENOTSUP,
  WASI_ENOTTY,
  WASI_ENXIO,
  WASI_EOVERFLOW,
  WASI_EOWNERDEAD,
  WASI_EPERM,
  WASI_EPIPE,
  WASI_EPROTO,
  WASI_EPROTONOSUPPORT,
  WASI_EPROTOTYPE,
  WASI_ERANGE,
  WASI_EROFS,
  WASI_ESPIPE,
  WASI_ESRCH,
  WASI_ESTALE,
  WASI_ETIMEDOUT,
  WASI_ETXTBSY,
  WASI_EXDEV,
  WASI_ENOTCAPABLE,
  WASI_SIGABRT,
  WASI_SIGALRM,
  WASI_SIGBUS,
  WASI_SIGCHLD,
  WASI_SIGCONT,
  WASI_SIGFPE,
  WASI_SIGHUP,
  WASI_SIGILL,
  WASI_SIGINT,
  WASI_SIGKILL,
  WASI_SIGPIPE,
  WASI_SIGQUIT,
  WASI_SIGSEGV,
  WASI_SIGSTOP,
  WASI_SIGTERM,
  WASI_SIGTRAP,
  WASI_SIGTSTP,
  WASI_SIGTTIN,
  WASI_SIGTTOU,
  WASI_SIGURG,
  WASI_SIGUSR1,
  WASI_SIGUSR2,
  WASI_SIGVTALRM,
  WASI_SIGXCPU,
  WASI_SIGXFSZ,
  WASI_FILETYPE_UNKNOWN,
  WASI_FILETYPE_BLOCK_DEVICE,
  WASI_FILETYPE_CHARACTER_DEVICE,
  WASI_FILETYPE_DIRECTORY,
  WASI_FILETYPE_REGULAR_FILE,
  WASI_FILETYPE_SOCKET_DGRAM,
  WASI_FILETYPE_SOCKET_STREAM,
  WASI_FILETYPE_SYMBOLIC_LINK,
  WASI_FDFLAG_APPEND,
  WASI_FDFLAG_DSYNC,
  WASI_FDFLAG_NONBLOCK,
  WASI_FDFLAG_RSYNC,
  WASI_FDFLAG_SYNC,
  WASI_RIGHT_FD_DATASYNC,
  WASI_RIGHT_FD_READ,
  WASI_RIGHT_FD_SEEK,
  WASI_RIGHT_FD_FDSTAT_SET_FLAGS,
  WASI_RIGHT_FD_SYNC,
  WASI_RIGHT_FD_TELL,
  WASI_RIGHT_FD_WRITE,
  WASI_RIGHT_FD_ADVISE,
  WASI_RIGHT_FD_ALLOCATE,
  WASI_RIGHT_PATH_CREATE_DIRECTORY,
  WASI_RIGHT_PATH_CREATE_FILE,
  WASI_RIGHT_PATH_LINK_SOURCE,
  WASI_RIGHT_PATH_LINK_TARGET,
  WASI_RIGHT_PATH_OPEN,
  WASI_RIGHT_FD_READDIR,
  WASI_RIGHT_PATH_READLINK,
  WASI_RIGHT_PATH_RENAME_SOURCE,
  WASI_RIGHT_PATH_RENAME_TARGET,
  WASI_RIGHT_PATH_FILESTAT_GET,
  WASI_RIGHT_PATH_FILESTAT_SET_SIZE,
  WASI_RIGHT_PATH_FILESTAT_SET_TIMES,
  WASI_RIGHT_FD_FILESTAT_GET,
  WASI_RIGHT_FD_FILESTAT_SET_SIZE,
  WASI_RIGHT_FD_FILESTAT_SET_TIMES,
  WASI_RIGHT_PATH_SYMLINK,
  WASI_RIGHT_PATH_REMOVE_DIRECTORY,
  WASI_RIGHT_PATH_UNLINK_FILE,
  WASI_RIGHT_POLL_FD_READWRITE,
  WASI_RIGHT_SOCK_SHUTDOWN,
  RIGHTS_ALL,
  WASI_RIGHT_FD_DATASYNC,
  WASI_RIGHT_FD_READ,
  WASI_RIGHT_FD_SEEK,
  WASI_RIGHT_FD_FDSTAT_SET_FLAGS,
  WASI_RIGHT_FD_SYNC,
  WASI_RIGHT_FD_TELL,
  WASI_RIGHT_FD_WRITE,
  WASI_RIGHT_FD_ADVISE,
  WASI_RIGHT_FD_ALLOCATE,
  WASI_RIGHT_PATH_CREATE_DIRECTORY,
  WASI_RIGHT_PATH_CREATE_FILE,
  WASI_RIGHT_PATH_LINK_SOURCE,
  WASI_RIGHT_PATH_LINK_TARGET,
  WASI_RIGHT_PATH_OPEN,
  WASI_RIGHT_FD_READDIR,
  WASI_RIGHT_PATH_READLINK,
  WASI_RIGHT_PATH_RENAME_SOURCE,
  WASI_RIGHT_PATH_RENAME_TARGET,
  WASI_RIGHT_PATH_FILESTAT_GET,
  WASI_RIGHT_PATH_FILESTAT_SET_SIZE,
  WASI_RIGHT_PATH_FILESTAT_SET_TIMES,
  WASI_RIGHT_FD_FILESTAT_GET,
  WASI_RIGHT_FD_FILESTAT_SET_TIMES,
  WASI_RIGHT_FD_FILESTAT_SET_SIZE,
  WASI_RIGHT_PATH_SYMLINK,
  WASI_RIGHT_PATH_UNLINK_FILE,
  WASI_RIGHT_PATH_REMOVE_DIRECTORY,
  WASI_RIGHT_POLL_FD_READWRITE,
  WASI_RIGHT_SOCK_SHUTDOWN,
  RIGHTS_BLOCK_DEVICE_BASE,
  RIGHTS_ALL,
  RIGHTS_BLOCK_DEVICE_INHERITING,
  RIGHTS_ALL,
  RIGHTS_CHARACTER_DEVICE_BASE,
  RIGHTS_ALL,
  RIGHTS_CHARACTER_DEVICE_INHERITING,
  RIGHTS_ALL,
  RIGHTS_REGULAR_FILE_BASE,
  WASI_RIGHT_FD_DATASYNC,
  WASI_RIGHT_FD_READ,
  WASI_RIGHT_FD_SEEK,
  WASI_RIGHT_FD_FDSTAT_SET_FLAGS,
  WASI_RIGHT_FD_SYNC,
  WASI_RIGHT_FD_TELL,
  WASI_RIGHT_FD_WRITE,
  WASI_RIGHT_FD_ADVISE,
  WASI_RIGHT_FD_ALLOCATE,
  WASI_RIGHT_FD_FILESTAT_GET,
  WASI_RIGHT_FD_FILESTAT_SET_SIZE,
  WASI_RIGHT_FD_FILESTAT_SET_TIMES,
  WASI_RIGHT_POLL_FD_READWRITE,
  RIGHTS_REGULAR_FILE_INHERITING,
  RIGHTS_DIRECTORY_BASE,
  WASI_RIGHT_FD_FDSTAT_SET_FLAGS,
  WASI_RIGHT_FD_SYNC,
  WASI_RIGHT_FD_ADVISE,
  WASI_RIGHT_PATH_CREATE_DIRECTORY,
  WASI_RIGHT_PATH_CREATE_FILE,
  WASI_RIGHT_PATH_LINK_SOURCE,
  WASI_RIGHT_PATH_LINK_TARGET,
  WASI_RIGHT_PATH_OPEN,
  WASI_RIGHT_FD_READDIR,
  WASI_RIGHT_PATH_READLINK,
  WASI_RIGHT_PATH_RENAME_SOURCE,
  WASI_RIGHT_PATH_RENAME_TARGET,
  WASI_RIGHT_PATH_FILESTAT_GET,
  WASI_RIGHT_PATH_FILESTAT_SET_SIZE,
  WASI_RIGHT_PATH_FILESTAT_SET_TIMES,
  WASI_RIGHT_FD_FILESTAT_GET,
  WASI_RIGHT_FD_FILESTAT_SET_TIMES,
  WASI_RIGHT_PATH_SYMLINK,
  WASI_RIGHT_PATH_UNLINK_FILE,
  WASI_RIGHT_PATH_REMOVE_DIRECTORY,
  WASI_RIGHT_POLL_FD_READWRITE,
  RIGHTS_DIRECTORY_INHERITING,
  RIGHTS_DIRECTORY_BASE,
  RIGHTS_REGULAR_FILE_BASE,
  RIGHTS_SOCKET_BASE,
  WASI_RIGHT_FD_READ,
  WASI_RIGHT_FD_FDSTAT_SET_FLAGS,
  WASI_RIGHT_FD_WRITE,
  WASI_RIGHT_FD_FILESTAT_GET,
  WASI_RIGHT_POLL_FD_READWRITE,
  WASI_RIGHT_SOCK_SHUTDOWN,
  RIGHTS_SOCKET_INHERITING,
  RIGHTS_ALL,
  RIGHTS_TTY_BASE,
  WASI_RIGHT_FD_READ,
  WASI_RIGHT_FD_FDSTAT_SET_FLAGS,
  WASI_RIGHT_FD_WRITE,
  WASI_RIGHT_FD_FILESTAT_GET,
  WASI_RIGHT_POLL_FD_READWRITE,
  RIGHTS_TTY_INHERITING,
  WASI_CLOCK_REALTIME,
  WASI_CLOCK_MONOTONIC,
  WASI_CLOCK_PROCESS_CPUTIME_ID,
  WASI_CLOCK_THREAD_CPUTIME_ID,
  WASI_EVENTTYPE_CLOCK,
  WASI_EVENTTYPE_FD_READ,
  WASI_EVENTTYPE_FD_WRITE,
  WASI_FILESTAT_SET_ATIM,
  WASI_FILESTAT_SET_ATIM_NOW,
  WASI_FILESTAT_SET_MTIM,
  WASI_FILESTAT_SET_MTIM_NOW,
  WASI_O_CREAT,
  WASI_O_DIRECTORY,
  WASI_O_EXCL,
  WASI_O_TRUNC,
  WASI_PREOPENTYPE_DIR,
  WASI_DIRCOOKIE_START,
  WASI_STDIN_FILENO,
  WASI_STDOUT_FILENO,
  WASI_STDERR_FILENO,
  WASI_WHENCE_SET,
  WASI_WHENCE_CUR,
  WASI_WHENCE_END,
  ERROR_MAP,
  WASI_E2BIG,
  WASI_EACCES,
  WASI_EADDRINUSE,
  WASI_EADDRNOTAVAIL,
  WASI_EAFNOSUPPORT,
  WASI_EALREADY,
  WASI_EAGAIN,
  WASI_EBADF,
  WASI_EBADMSG,
  WASI_EBUSY,
  WASI_ECANCELED,
  WASI_ECHILD,
  WASI_ECONNABORTED,
  WASI_ECONNREFUSED,
  WASI_ECONNRESET,
  WASI_EDEADLK,
  WASI_EDESTADDRREQ,
  WASI_EDOM,
  WASI_EDQUOT,
  WASI_EEXIST,
  WASI_EFAULT,
  WASI_EFBIG,
  WASI_EHOSTUNREACH,
  WASI_EHOSTUNREACH,
  WASI_EIDRM,
  WASI_EILSEQ,
  WASI_EINPROGRESS,
  WASI_EINTR,
  WASI_EINVAL,
  WASI_EIO,
  WASI_EISCONN,
  WASI_EISDIR,
  WASI_ELOOP,
  WASI_EMFILE,
  WASI_EMLINK,
  WASI_EMSGSIZE,
  WASI_EMULTIHOP,
  WASI_ENAMETOOLONG,
  WASI_ENETDOWN,
  WASI_ENETRESET,
  WASI_ENETUNREACH,
  WASI_ENFILE,
  WASI_ENOBUFS,
  WASI_ENODEV,
  WASI_ENOENT,
  WASI_ENOEXEC,
  WASI_ENOLCK,
  WASI_ENOLINK,
  WASI_ENOMEM,
  WASI_ENOMSG,
  WASI_ENOPROTOOPT,
  WASI_ENOSPC,
  WASI_ENOSYS,
  WASI_ENOTCONN,
  WASI_ENOTDIR,
  WASI_ENOTEMPTY,
  WASI_ENOTRECOVERABLE,
  WASI_ENOTSOCK,
  WASI_ENOTTY,
  WASI_ENXIO,
  WASI_EOVERFLOW,
  WASI_EOWNERDEAD,
  WASI_EPERM,
  WASI_EPIPE,
  WASI_EPROTO,
  WASI_EPROTONOSUPPORT,
  WASI_EPROTOTYPE,
  WASI_ERANGE,
  WASI_EROFS,
  WASI_ESPIPE,
  WASI_ESRCH,
  WASI_ESTALE,
  WASI_ETIMEDOUT,
  WASI_ETXTBSY,
  WASI_EXDEV,
  SIGNAL_MAP,
  WASI_SIGHUP,
  WASI_SIGINT,
  WASI_SIGQUIT,
  WASI_SIGILL,
  WASI_SIGTRAP,
  WASI_SIGABRT,
  WASI_SIGBUS,
  WASI_SIGFPE,
  WASI_SIGKILL,
  WASI_SIGUSR1,
  WASI_SIGSEGV,
  WASI_SIGUSR2,
  WASI_SIGPIPE,
  WASI_SIGALRM,
  WASI_SIGTERM,
  WASI_SIGCHLD,
  WASI_SIGCONT,
  WASI_SIGSTOP,
  WASI_SIGTSTP,
  WASI_SIGTTIN,
  WASI_SIGTTOU,
  WASI_SIGURG,
  WASI_SIGXCPU,
  WASI_SIGXFSZ,
  WASI_SIGVTALRM
} = exports3;

// wasi/index.js
var exports4 = {};
var defaultBindings = browser_default;
var STDIN_DEFAULT_RIGHTS = constants_default.WASI_RIGHT_FD_DATASYNC | constants_default.WASI_RIGHT_FD_READ | constants_default.WASI_RIGHT_FD_SYNC | constants_default.WASI_RIGHT_FD_ADVISE | constants_default.WASI_RIGHT_FD_FILESTAT_GET | constants_default.WASI_RIGHT_POLL_FD_READWRITE;
var STDOUT_DEFAULT_RIGHTS = constants_default.WASI_RIGHT_FD_DATASYNC | constants_default.WASI_RIGHT_FD_WRITE | constants_default.WASI_RIGHT_FD_SYNC | constants_default.WASI_RIGHT_FD_ADVISE | constants_default.WASI_RIGHT_FD_FILESTAT_GET | constants_default.WASI_RIGHT_POLL_FD_READWRITE;
var STDERR_DEFAULT_RIGHTS = STDOUT_DEFAULT_RIGHTS;
var msToNs = (ms) => {
  const msInt = Math.trunc(ms);
  const decimal = BigIntPolyfill(Math.round((ms - msInt) * 1e6));
  const ns = BigIntPolyfill(msInt) * BigIntPolyfill(1e6);
  return ns + decimal;
};
var nsToMs = (ns) => {
  if (typeof ns === "number") {
    ns = Math.trunc(ns);
  }
  const nsInt = BigIntPolyfill(ns);
  return Number(nsInt / BigIntPolyfill(1e6));
};
var wrap = (f18) => (...args) => {
  try {
    return f18(...args);
  } catch (e3) {
    if (e3 && e3.code && typeof e3.code === "string") {
      return constants_default.ERROR_MAP[e3.code] || constants_default.WASI_EINVAL;
    }
    if (e3 instanceof WASIError) {
      return e3.errno;
    }
    throw e3;
  }
};
var stat = (wasi, fd) => {
  const entry = wasi.FD_MAP.get(fd);
  if (!entry) {
    throw new WASIError(constants_default.WASI_EBADF);
  }
  if (entry.filetype === void 0) {
    const stats = wasi.bindings.fs.fstatSync(entry.real);
    const { filetype, rightsBase, rightsInheriting } = translateFileAttributes(wasi, fd, stats);
    entry.filetype = filetype;
    if (!entry.rights) {
      entry.rights = {
        base: rightsBase,
        inheriting: rightsInheriting
      };
    }
  }
  return entry;
};
var translateFileAttributes = (wasi, fd, stats) => {
  switch (true) {
    case stats.isBlockDevice():
      return {
        filetype: constants_default.WASI_FILETYPE_BLOCK_DEVICE,
        rightsBase: constants_default.RIGHTS_BLOCK_DEVICE_BASE,
        rightsInheriting: constants_default.RIGHTS_BLOCK_DEVICE_INHERITING
      };
    case stats.isCharacterDevice(): {
      const filetype = constants_default.WASI_FILETYPE_CHARACTER_DEVICE;
      if (fd !== void 0 && wasi.bindings.isTTY(fd)) {
        return {
          filetype,
          rightsBase: constants_default.RIGHTS_TTY_BASE,
          rightsInheriting: constants_default.RIGHTS_TTY_INHERITING
        };
      }
      return {
        filetype,
        rightsBase: constants_default.RIGHTS_CHARACTER_DEVICE_BASE,
        rightsInheriting: constants_default.RIGHTS_CHARACTER_DEVICE_INHERITING
      };
    }
    case stats.isDirectory():
      return {
        filetype: constants_default.WASI_FILETYPE_DIRECTORY,
        rightsBase: constants_default.RIGHTS_DIRECTORY_BASE,
        rightsInheriting: constants_default.RIGHTS_DIRECTORY_INHERITING
      };
    case stats.isFIFO():
      return {
        filetype: constants_default.WASI_FILETYPE_SOCKET_STREAM,
        rightsBase: constants_default.RIGHTS_SOCKET_BASE,
        rightsInheriting: constants_default.RIGHTS_SOCKET_INHERITING
      };
    case stats.isFile():
      return {
        filetype: constants_default.WASI_FILETYPE_REGULAR_FILE,
        rightsBase: constants_default.RIGHTS_REGULAR_FILE_BASE,
        rightsInheriting: constants_default.RIGHTS_REGULAR_FILE_INHERITING
      };
    case stats.isSocket():
      return {
        filetype: constants_default.WASI_FILETYPE_SOCKET_STREAM,
        rightsBase: constants_default.RIGHTS_SOCKET_BASE,
        rightsInheriting: constants_default.RIGHTS_SOCKET_INHERITING
      };
    case stats.isSymbolicLink():
      return {
        filetype: constants_default.WASI_FILETYPE_SYMBOLIC_LINK,
        rightsBase: BigIntPolyfill(0),
        rightsInheriting: BigIntPolyfill(0)
      };
    default:
      return {
        filetype: constants_default.WASI_FILETYPE_UNKNOWN,
        rightsBase: BigIntPolyfill(0),
        rightsInheriting: BigIntPolyfill(0)
      };
  }
};
exports4.WASIError = WASIError;
exports4.WASIExitError = WASIExitError;
exports4.WASIKillError = WASIKillError;
var WASIDefault = class {
  constructor(wasiConfig) {
    let preopens = {};
    if (wasiConfig && wasiConfig.preopens) {
      preopens = wasiConfig.preopens;
    } else if (wasiConfig && wasiConfig.preopenDirectories) {
      preopens = wasiConfig.preopenDirectories;
    }
    let env2 = {};
    if (wasiConfig && wasiConfig.env) {
      env2 = wasiConfig.env;
    }
    let args = [];
    if (wasiConfig && wasiConfig.args) {
      args = wasiConfig.args;
    }
    let bindings2 = defaultBindings;
    if (wasiConfig && wasiConfig.bindings) {
      bindings2 = wasiConfig.bindings;
    }
    this.memory = void 0;
    this.view = void 0;
    this.bindings = bindings2;
    this.FD_MAP = /* @__PURE__ */ new Map([
      [
        constants_default.WASI_STDIN_FILENO,
        {
          real: 0,
          filetype: constants_default.WASI_FILETYPE_CHARACTER_DEVICE,
          // offset: BigInt(0),
          rights: {
            base: STDIN_DEFAULT_RIGHTS,
            inheriting: BigIntPolyfill(0)
          },
          path: void 0
        }
      ],
      [
        constants_default.WASI_STDOUT_FILENO,
        {
          real: 1,
          filetype: constants_default.WASI_FILETYPE_CHARACTER_DEVICE,
          // offset: BigInt(0),
          rights: {
            base: STDOUT_DEFAULT_RIGHTS,
            inheriting: BigIntPolyfill(0)
          },
          path: void 0
        }
      ],
      [
        constants_default.WASI_STDERR_FILENO,
        {
          real: 2,
          filetype: constants_default.WASI_FILETYPE_CHARACTER_DEVICE,
          // offset: BigInt(0),
          rights: {
            base: STDERR_DEFAULT_RIGHTS,
            inheriting: BigIntPolyfill(0)
          },
          path: void 0
        }
      ]
    ]);
    let fs2 = this.bindings.fs;
    let path = this.bindings.path;
    for (const [k4, v23] of Object.entries(preopens)) {
      const real = fs2.openSync(v23, fs2.constants.O_RDONLY);
      const newfd = [...this.FD_MAP.keys()].reverse()[0] + 1;
      this.FD_MAP.set(newfd, {
        real,
        filetype: constants_default.WASI_FILETYPE_DIRECTORY,
        // offset: BigInt(0),
        rights: {
          base: constants_default.RIGHTS_DIRECTORY_BASE,
          inheriting: constants_default.RIGHTS_DIRECTORY_INHERITING
        },
        fakePath: k4,
        path: v23
      });
    }
    const getiovs = (iovs, iovsLen) => {
      this.refreshMemory();
      const buffers = Array.from({ length: iovsLen }, (_31, i18) => {
        const ptr = iovs + i18 * 8;
        const buf = this.view.getUint32(ptr, true);
        const bufLen = this.view.getUint32(ptr + 4, true);
        return new Uint8Array(this.memory.buffer, buf, bufLen);
      });
      return buffers;
    };
    const CHECK_FD = (fd, rights) => {
      const stats = stat(this, fd);
      if (rights !== BigIntPolyfill(0) && (stats.rights.base & rights) === BigIntPolyfill(0)) {
        throw new WASIError(constants_default.WASI_EPERM);
      }
      return stats;
    };
    const CPUTIME_START = bindings2.hrtime();
    const now = (clockId) => {
      switch (clockId) {
        case constants_default.WASI_CLOCK_MONOTONIC:
          return bindings2.hrtime();
        case constants_default.WASI_CLOCK_REALTIME:
          return msToNs(Date.now());
        case constants_default.WASI_CLOCK_PROCESS_CPUTIME_ID:
        case constants_default.WASI_CLOCK_THREAD_CPUTIME_ID:
          return bindings2.hrtime() - CPUTIME_START;
        default:
          return null;
      }
    };
    this.wasiImport = {
      args_get: (argv2, argvBuf) => {
        this.refreshMemory();
        let coffset = argv2;
        let offset = argvBuf;
        args.forEach((a17) => {
          this.view.setUint32(coffset, offset, true);
          coffset += 4;
          offset += Buffer3.from(this.memory.buffer).write(`${a17}\0`, offset);
        });
        return constants_default.WASI_ESUCCESS;
      },
      args_sizes_get: (argc, argvBufSize) => {
        this.refreshMemory();
        this.view.setUint32(argc, args.length, true);
        const size = args.reduce((acc, a17) => acc + Buffer3.byteLength(a17) + 1, 0);
        this.view.setUint32(argvBufSize, size, true);
        return constants_default.WASI_ESUCCESS;
      },
      environ_get: (environ, environBuf) => {
        this.refreshMemory();
        let coffset = environ;
        let offset = environBuf;
        Object.entries(env2).forEach(([key, value]) => {
          this.view.setUint32(coffset, offset, true);
          coffset += 4;
          offset += Buffer3.from(this.memory.buffer).write(`${key}=${value}\0`, offset);
        });
        return constants_default.WASI_ESUCCESS;
      },
      environ_sizes_get: (environCount, environBufSize) => {
        this.refreshMemory();
        const envProcessed = Object.entries(env2).map(([key, value]) => `${key}=${value}\0`);
        const size = envProcessed.reduce((acc, e3) => acc + Buffer3.byteLength(e3), 0);
        this.view.setUint32(environCount, envProcessed.length, true);
        this.view.setUint32(environBufSize, size, true);
        return constants_default.WASI_ESUCCESS;
      },
      clock_res_get: (clockId, resolution) => {
        let res;
        switch (clockId) {
          case constants_default.WASI_CLOCK_MONOTONIC:
          case constants_default.WASI_CLOCK_PROCESS_CPUTIME_ID:
          case constants_default.WASI_CLOCK_THREAD_CPUTIME_ID: {
            res = BigIntPolyfill(1);
            break;
          }
          case constants_default.WASI_CLOCK_REALTIME: {
            res = BigIntPolyfill(1e3);
            break;
          }
        }
        this.view.setBigUint64(resolution, res);
        return constants_default.WASI_ESUCCESS;
      },
      clock_time_get: (clockId, precision, time) => {
        this.refreshMemory();
        const n30 = now(clockId);
        if (n30 === null) {
          return constants_default.WASI_EINVAL;
        }
        this.view.setBigUint64(time, BigIntPolyfill(n30), true);
        return constants_default.WASI_ESUCCESS;
      },
      fd_advise: wrap((fd, offset, len, advice) => {
        CHECK_FD(fd, constants_default.WASI_RIGHT_FD_ADVISE);
        return constants_default.WASI_ENOSYS;
      }),
      fd_allocate: wrap((fd, offset, len) => {
        CHECK_FD(fd, constants_default.WASI_RIGHT_FD_ALLOCATE);
        return constants_default.WASI_ENOSYS;
      }),
      fd_close: wrap((fd) => {
        const stats = CHECK_FD(fd, BigIntPolyfill(0));
        fs2.closeSync(stats.real);
        this.FD_MAP.delete(fd);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_datasync: wrap((fd) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_DATASYNC);
        fs2.fdatasyncSync(stats.real);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_fdstat_get: wrap((fd, bufPtr) => {
        const stats = CHECK_FD(fd, BigIntPolyfill(0));
        this.refreshMemory();
        this.view.setUint8(bufPtr, stats.filetype);
        this.view.setUint16(bufPtr + 2, 0, true);
        this.view.setUint16(bufPtr + 4, 0, true);
        this.view.setBigUint64(bufPtr + 8, BigIntPolyfill(stats.rights.base), true);
        this.view.setBigUint64(bufPtr + 8 + 8, BigIntPolyfill(stats.rights.inheriting), true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_fdstat_set_flags: wrap((fd, flags) => {
        CHECK_FD(fd, constants_default.WASI_RIGHT_FD_FDSTAT_SET_FLAGS);
        return constants_default.WASI_ENOSYS;
      }),
      fd_fdstat_set_rights: wrap((fd, fsRightsBase, fsRightsInheriting) => {
        const stats = CHECK_FD(fd, BigIntPolyfill(0));
        const nrb = stats.rights.base | fsRightsBase;
        if (nrb > stats.rights.base) {
          return constants_default.WASI_EPERM;
        }
        const nri = stats.rights.inheriting | fsRightsInheriting;
        if (nri > stats.rights.inheriting) {
          return constants_default.WASI_EPERM;
        }
        stats.rights.base = fsRightsBase;
        stats.rights.inheriting = fsRightsInheriting;
        return constants_default.WASI_ESUCCESS;
      }),
      fd_filestat_get: wrap((fd, bufPtr) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_FILESTAT_GET);
        const rstats = fs2.fstatSync(stats.real);
        this.refreshMemory();
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.dev), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.ino), true);
        bufPtr += 8;
        this.view.setUint8(bufPtr, stats.filetype);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.nlink), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.size), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, msToNs(rstats.atimeMs), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, msToNs(rstats.mtimeMs), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, msToNs(rstats.ctimeMs), true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_filestat_set_size: wrap((fd, stSize) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_FILESTAT_SET_SIZE);
        fs2.ftruncateSync(stats.real, Number(stSize));
        return constants_default.WASI_ESUCCESS;
      }),
      fd_filestat_set_times: wrap((fd, stAtim, stMtim, fstflags) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_FILESTAT_SET_TIMES);
        const rstats = fs2.fstatSync(stats.real);
        let atim = rstats.atime;
        let mtim = rstats.mtime;
        const n30 = nsToMs(now(constants_default.WASI_CLOCK_REALTIME));
        const atimflags = constants_default.WASI_FILESTAT_SET_ATIM | constants_default.WASI_FILESTAT_SET_ATIM_NOW;
        if ((fstflags & atimflags) === atimflags) {
          return constants_default.WASI_EINVAL;
        }
        const mtimflags = constants_default.WASI_FILESTAT_SET_MTIM | constants_default.WASI_FILESTAT_SET_MTIM_NOW;
        if ((fstflags & mtimflags) === mtimflags) {
          return constants_default.WASI_EINVAL;
        }
        if ((fstflags & constants_default.WASI_FILESTAT_SET_ATIM) === constants_default.WASI_FILESTAT_SET_ATIM) {
          atim = nsToMs(stAtim);
        } else if ((fstflags & constants_default.WASI_FILESTAT_SET_ATIM_NOW) === constants_default.WASI_FILESTAT_SET_ATIM_NOW) {
          atim = n30;
        }
        if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM) === constants_default.WASI_FILESTAT_SET_MTIM) {
          mtim = nsToMs(stMtim);
        } else if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM_NOW) === constants_default.WASI_FILESTAT_SET_MTIM_NOW) {
          mtim = n30;
        }
        fs2.futimesSync(stats.real, new Date(atim), new Date(mtim));
        return constants_default.WASI_ESUCCESS;
      }),
      fd_prestat_get: wrap((fd, bufPtr) => {
        const stats = CHECK_FD(fd, BigIntPolyfill(0));
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        this.view.setUint8(bufPtr, constants_default.WASI_PREOPENTYPE_DIR);
        this.view.setUint32(bufPtr + 4, Buffer3.byteLength(stats.fakePath), true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_prestat_dir_name: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, BigIntPolyfill(0));
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        Buffer3.from(this.memory.buffer).write(stats.fakePath, pathPtr, pathLen, "utf8");
        return constants_default.WASI_ESUCCESS;
      }),
      fd_pwrite: wrap((fd, iovs, iovsLen, offset, nwritten) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_WRITE | constants_default.WASI_RIGHT_FD_SEEK);
        let written = 0;
        getiovs(iovs, iovsLen).forEach((iov) => {
          let w12 = 0;
          while (w12 < iov.byteLength) {
            w12 += fs2.writeSync(stats.real, iov, w12, iov.byteLength - w12, Number(offset) + written + w12);
          }
          written += w12;
        });
        this.view.setUint32(nwritten, written, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_write: wrap((fd, iovs, iovsLen, nwritten) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_WRITE);
        let written = 0;
        getiovs(iovs, iovsLen).forEach((iov) => {
          let w12 = 0;
          while (w12 < iov.byteLength) {
            const i18 = fs2.writeSync(stats.real, iov, w12, iov.byteLength - w12, stats.offset ? Number(stats.offset) : null);
            if (stats.offset)
              stats.offset += BigIntPolyfill(i18);
            w12 += i18;
          }
          written += w12;
        });
        this.view.setUint32(nwritten, written, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_pread: wrap((fd, iovs, iovsLen, offset, nread) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_READ | constants_default.WASI_RIGHT_FD_SEEK);
        let read4 = 0;
        outer: for (const iov of getiovs(iovs, iovsLen)) {
          let r2 = 0;
          while (r2 < iov.byteLength) {
            const length = iov.byteLength - r2;
            const rr = fs2.readSync(stats.real, iov, r2, iov.byteLength - r2, Number(offset) + read4 + r2);
            r2 += rr;
            read4 += rr;
            if (rr === 0 || rr < length) {
              break outer;
            }
          }
          read4 += r2;
        }
        ;
        this.view.setUint32(nread, read4, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_read: wrap((fd, iovs, iovsLen, nread) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_READ);
        const IS_STDIN = stats.real === 0;
        let read4 = 0;
        outer: for (const iov of getiovs(iovs, iovsLen)) {
          let r2 = 0;
          while (r2 < iov.byteLength) {
            let length = iov.byteLength - r2;
            let position = IS_STDIN || stats.offset === void 0 ? null : Number(stats.offset);
            let rr = fs2.readSync(
              stats.real,
              // fd
              iov,
              // buffer
              r2,
              // offset
              length,
              // length
              position
              // position
            );
            if (!IS_STDIN) {
              stats.offset = (stats.offset ? stats.offset : BigIntPolyfill(0)) + BigIntPolyfill(rr);
            }
            r2 += rr;
            read4 += rr;
            if (rr === 0 || rr < length) {
              break outer;
            }
          }
        }
        this.view.setUint32(nread, read4, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_readdir: wrap((fd, bufPtr, bufLen, cookie, bufusedPtr) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_READDIR);
        this.refreshMemory();
        const entries = fs2.readdirSync(stats.path, { withFileTypes: true });
        const startPtr = bufPtr;
        for (let i18 = Number(cookie); i18 < entries.length; i18 += 1) {
          const entry = entries[i18];
          let nameLength = Buffer3.byteLength(entry.name);
          if (bufPtr - startPtr > bufLen) {
            break;
          }
          this.view.setBigUint64(bufPtr, BigIntPolyfill(i18 + 1), true);
          bufPtr += 8;
          if (bufPtr - startPtr > bufLen) {
            break;
          }
          const rstats = fs2.statSync(path.resolve(stats.path, entry.name));
          this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.ino), true);
          bufPtr += 8;
          if (bufPtr - startPtr > bufLen) {
            break;
          }
          this.view.setUint32(bufPtr, nameLength, true);
          bufPtr += 4;
          if (bufPtr - startPtr > bufLen) {
            break;
          }
          let filetype;
          switch (true) {
            case rstats.isBlockDevice():
              filetype = constants_default.WASI_FILETYPE_BLOCK_DEVICE;
              break;
            case rstats.isCharacterDevice():
              filetype = constants_default.WASI_FILETYPE_CHARACTER_DEVICE;
              break;
            case rstats.isDirectory():
              filetype = constants_default.WASI_FILETYPE_DIRECTORY;
              break;
            case rstats.isFIFO():
              filetype = constants_default.WASI_FILETYPE_SOCKET_STREAM;
              break;
            case rstats.isFile():
              filetype = constants_default.WASI_FILETYPE_REGULAR_FILE;
              break;
            case rstats.isSocket():
              filetype = constants_default.WASI_FILETYPE_SOCKET_STREAM;
              break;
            case rstats.isSymbolicLink():
              filetype = constants_default.WASI_FILETYPE_SYMBOLIC_LINK;
              break;
            default:
              filetype = constants_default.WASI_FILETYPE_UNKNOWN;
              break;
          }
          this.view.setUint8(bufPtr, filetype);
          bufPtr += 1;
          bufPtr += 3;
          if (bufPtr + nameLength >= startPtr + bufLen) {
            break;
          }
          let memory_buffer = Buffer3.from(this.memory.buffer);
          memory_buffer.write(entry.name, bufPtr);
          bufPtr += nameLength;
        }
        const bufused = bufPtr - startPtr;
        this.view.setUint32(bufusedPtr, Math.min(bufused, bufLen), true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_renumber: wrap((from, to) => {
        CHECK_FD(from, BigIntPolyfill(0));
        CHECK_FD(to, BigIntPolyfill(0));
        fs2.closeSync(this.FD_MAP.get(from).real);
        this.FD_MAP.set(from, this.FD_MAP.get(to));
        this.FD_MAP.delete(to);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_seek: wrap((fd, offset, whence, newOffsetPtr) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_SEEK);
        this.refreshMemory();
        switch (whence) {
          case constants_default.WASI_WHENCE_CUR:
            stats.offset = (stats.offset ? stats.offset : BigIntPolyfill(0)) + BigIntPolyfill(offset);
            break;
          case constants_default.WASI_WHENCE_END:
            const { size } = fs2.fstatSync(stats.real);
            stats.offset = BigIntPolyfill(size) + BigIntPolyfill(offset);
            break;
          case constants_default.WASI_WHENCE_SET:
            stats.offset = BigIntPolyfill(offset);
            break;
        }
        this.view.setBigUint64(newOffsetPtr, stats.offset, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_tell: wrap((fd, offsetPtr) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_TELL);
        this.refreshMemory();
        if (!stats.offset) {
          stats.offset = BigIntPolyfill(0);
        }
        this.view.setBigUint64(offsetPtr, stats.offset, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_sync: wrap((fd) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_SYNC);
        fs2.fsyncSync(stats.real);
        return constants_default.WASI_ESUCCESS;
      }),
      path_create_directory: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_CREATE_DIRECTORY);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p26 = Buffer3.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs2.mkdirSync(path.resolve(stats.path, p26));
        return constants_default.WASI_ESUCCESS;
      }),
      path_filestat_get: wrap((fd, flags, pathPtr, pathLen, bufPtr) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_FILESTAT_GET);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p26 = Buffer3.from(this.memory.buffer, pathPtr, pathLen).toString();
        const rstats = fs2.statSync(path.resolve(stats.path, p26));
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.dev), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.ino), true);
        bufPtr += 8;
        this.view.setUint8(bufPtr, translateFileAttributes(this, void 0, rstats).filetype);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.nlink), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, BigIntPolyfill(rstats.size), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, msToNs(rstats.atimeMs), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, msToNs(rstats.mtimeMs), true);
        bufPtr += 8;
        this.view.setBigUint64(bufPtr, msToNs(rstats.ctimeMs), true);
        return constants_default.WASI_ESUCCESS;
      }),
      path_filestat_set_times: wrap((fd, dirflags, pathPtr, pathLen, stAtim, stMtim, fstflags) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_FILESTAT_SET_TIMES);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const rstats = fs2.fstatSync(stats.real);
        let atim = rstats.atime;
        let mtim = rstats.mtime;
        const n30 = nsToMs(now(constants_default.WASI_CLOCK_REALTIME));
        const atimflags = constants_default.WASI_FILESTAT_SET_ATIM | constants_default.WASI_FILESTAT_SET_ATIM_NOW;
        if ((fstflags & atimflags) === atimflags) {
          return constants_default.WASI_EINVAL;
        }
        const mtimflags = constants_default.WASI_FILESTAT_SET_MTIM | constants_default.WASI_FILESTAT_SET_MTIM_NOW;
        if ((fstflags & mtimflags) === mtimflags) {
          return constants_default.WASI_EINVAL;
        }
        if ((fstflags & constants_default.WASI_FILESTAT_SET_ATIM) === constants_default.WASI_FILESTAT_SET_ATIM) {
          atim = nsToMs(stAtim);
        } else if ((fstflags & constants_default.WASI_FILESTAT_SET_ATIM_NOW) === constants_default.WASI_FILESTAT_SET_ATIM_NOW) {
          atim = n30;
        }
        if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM) === constants_default.WASI_FILESTAT_SET_MTIM) {
          mtim = nsToMs(stMtim);
        } else if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM_NOW) === constants_default.WASI_FILESTAT_SET_MTIM_NOW) {
          mtim = n30;
        }
        const p26 = Buffer3.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs2.utimesSync(path.resolve(stats.path, p26), new Date(atim), new Date(mtim));
        return constants_default.WASI_ESUCCESS;
      }),
      path_link: wrap((oldFd, oldFlags, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
        const ostats = CHECK_FD(oldFd, constants_default.WASI_RIGHT_PATH_LINK_SOURCE);
        const nstats = CHECK_FD(newFd, constants_default.WASI_RIGHT_PATH_LINK_TARGET);
        if (!ostats.path || !nstats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const op = Buffer3.from(this.memory.buffer, oldPath, oldPathLen).toString();
        const np = Buffer3.from(this.memory.buffer, newPath, newPathLen).toString();
        fs2.linkSync(path.resolve(ostats.path, op), path.resolve(nstats.path, np));
        return constants_default.WASI_ESUCCESS;
      }),
      path_open: wrap((dirfd, dirflags, pathPtr, pathLen, oflags, fsRightsBase, fsRightsInheriting, fsFlags, fd) => {
        const stats = CHECK_FD(dirfd, constants_default.WASI_RIGHT_PATH_OPEN);
        fsRightsBase = BigIntPolyfill(fsRightsBase);
        fsRightsInheriting = BigIntPolyfill(fsRightsInheriting);
        const read4 = (fsRightsBase & (constants_default.WASI_RIGHT_FD_READ | constants_default.WASI_RIGHT_FD_READDIR)) !== BigIntPolyfill(0);
        const write4 = (fsRightsBase & (constants_default.WASI_RIGHT_FD_DATASYNC | constants_default.WASI_RIGHT_FD_WRITE | constants_default.WASI_RIGHT_FD_ALLOCATE | constants_default.WASI_RIGHT_FD_FILESTAT_SET_SIZE)) !== BigIntPolyfill(0);
        let noflags;
        if (write4 && read4) {
          noflags = fs2.constants.O_RDWR;
        } else if (read4) {
          noflags = fs2.constants.O_RDONLY;
        } else if (write4) {
          noflags = fs2.constants.O_WRONLY;
        }
        let neededBase = fsRightsBase | constants_default.WASI_RIGHT_PATH_OPEN;
        let neededInheriting = fsRightsBase | fsRightsInheriting;
        if ((oflags & constants_default.WASI_O_CREAT) !== 0) {
          noflags |= fs2.constants.O_CREAT;
          neededBase |= constants_default.WASI_RIGHT_PATH_CREATE_FILE;
        }
        if ((oflags & constants_default.WASI_O_DIRECTORY) !== 0) {
          noflags |= fs2.constants.O_DIRECTORY;
        }
        if ((oflags & constants_default.WASI_O_EXCL) !== 0) {
          noflags |= fs2.constants.O_EXCL;
        }
        if ((oflags & constants_default.WASI_O_TRUNC) !== 0) {
          noflags |= fs2.constants.O_TRUNC;
          neededBase |= constants_default.WASI_RIGHT_PATH_FILESTAT_SET_SIZE;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_APPEND) !== 0) {
          noflags |= fs2.constants.O_APPEND;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_DSYNC) !== 0) {
          if (fs2.constants.O_DSYNC) {
            noflags |= fs2.constants.O_DSYNC;
          } else {
            noflags |= fs2.constants.O_SYNC;
          }
          neededInheriting |= constants_default.WASI_RIGHT_FD_DATASYNC;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_NONBLOCK) !== 0) {
          noflags |= fs2.constants.O_NONBLOCK;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_RSYNC) !== 0) {
          if (fs2.constants.O_RSYNC) {
            noflags |= fs2.constants.O_RSYNC;
          } else {
            noflags |= fs2.constants.O_SYNC;
          }
          neededInheriting |= constants_default.WASI_RIGHT_FD_SYNC;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_SYNC) !== 0) {
          noflags |= fs2.constants.O_SYNC;
          neededInheriting |= constants_default.WASI_RIGHT_FD_SYNC;
        }
        if (write4 && (noflags & (fs2.constants.O_APPEND | fs2.constants.O_TRUNC)) === 0) {
          neededInheriting |= constants_default.WASI_RIGHT_FD_SEEK;
        }
        this.refreshMemory();
        const p26 = Buffer3.from(this.memory.buffer, pathPtr, pathLen).toString();
        const fullUnresolved = path.resolve(stats.path, p26);
        if (path.relative(stats.path, fullUnresolved).startsWith("..")) {
          return constants_default.WASI_ENOTCAPABLE;
        }
        let full;
        try {
          full = fs2.realpathSync(fullUnresolved);
          if (path.relative(stats.path, full).startsWith("..")) {
            return constants_default.WASI_ENOTCAPABLE;
          }
        } catch (e3) {
          if (e3.code === "ENOENT") {
            full = fullUnresolved;
          } else {
            throw e3;
          }
        }
        let isDirectory;
        try {
          isDirectory = fs2.statSync(full).isDirectory();
        } catch (e3) {
        }
        let realfd;
        if (!write4 && isDirectory) {
          realfd = fs2.openSync(full, fs2.constants.O_RDONLY);
        } else {
          realfd = fs2.openSync(full, noflags);
        }
        const newfd = [...this.FD_MAP.keys()].reverse()[0] + 1;
        this.FD_MAP.set(newfd, {
          real: realfd,
          filetype: void 0,
          // offset: BigInt(0),
          rights: {
            base: neededBase,
            inheriting: neededInheriting
          },
          path: full
        });
        stat(this, newfd);
        this.view.setUint32(fd, newfd, true);
        return constants_default.WASI_ESUCCESS;
      }),
      path_readlink: wrap((fd, pathPtr, pathLen, buf, bufLen, bufused) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_READLINK);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p26 = Buffer3.from(this.memory.buffer, pathPtr, pathLen).toString();
        const full = path.resolve(stats.path, p26);
        const r2 = fs2.readlinkSync(full);
        const used = Buffer3.from(this.memory.buffer).write(r2, buf, bufLen);
        this.view.setUint32(bufused, used, true);
        return constants_default.WASI_ESUCCESS;
      }),
      path_remove_directory: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_REMOVE_DIRECTORY);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p26 = Buffer3.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs2.rmdirSync(path.resolve(stats.path, p26));
        return constants_default.WASI_ESUCCESS;
      }),
      path_rename: wrap((oldFd, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
        const ostats = CHECK_FD(oldFd, constants_default.WASI_RIGHT_PATH_RENAME_SOURCE);
        const nstats = CHECK_FD(newFd, constants_default.WASI_RIGHT_PATH_RENAME_TARGET);
        if (!ostats.path || !nstats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const op = Buffer3.from(this.memory.buffer, oldPath, oldPathLen).toString();
        const np = Buffer3.from(this.memory.buffer, newPath, newPathLen).toString();
        fs2.renameSync(path.resolve(ostats.path, op), path.resolve(nstats.path, np));
        return constants_default.WASI_ESUCCESS;
      }),
      path_symlink: wrap((oldPath, oldPathLen, fd, newPath, newPathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_SYMLINK);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const op = Buffer3.from(this.memory.buffer, oldPath, oldPathLen).toString();
        const np = Buffer3.from(this.memory.buffer, newPath, newPathLen).toString();
        fs2.symlinkSync(op, path.resolve(stats.path, np));
        return constants_default.WASI_ESUCCESS;
      }),
      path_unlink_file: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_UNLINK_FILE);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p26 = Buffer3.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs2.unlinkSync(path.resolve(stats.path, p26));
        return constants_default.WASI_ESUCCESS;
      }),
      poll_oneoff: (sin, sout, nsubscriptions, nevents) => {
        let eventc = 0;
        let waitEnd = 0;
        this.refreshMemory();
        for (let i18 = 0; i18 < nsubscriptions; i18 += 1) {
          const userdata = this.view.getBigUint64(sin, true);
          sin += 8;
          const type = this.view.getUint8(sin);
          sin += 1;
          switch (type) {
            case constants_default.WASI_EVENTTYPE_CLOCK: {
              sin += 7;
              const identifier = this.view.getBigUint64(sin, true);
              sin += 8;
              const clockid = this.view.getUint32(sin, true);
              sin += 4;
              sin += 4;
              const timestamp2 = this.view.getBigUint64(sin, true);
              sin += 8;
              const precision = this.view.getBigUint64(sin, true);
              sin += 8;
              const subclockflags = this.view.getUint16(sin, true);
              sin += 2;
              sin += 6;
              const absolute = subclockflags === 1;
              let e3 = constants_default.WASI_ESUCCESS;
              const n30 = BigIntPolyfill(now(clockid));
              if (n30 === null) {
                e3 = constants_default.WASI_EINVAL;
              } else {
                const end = absolute ? timestamp2 : n30 + timestamp2;
                waitEnd = end > waitEnd ? end : waitEnd;
              }
              this.view.setBigUint64(sout, userdata, true);
              sout += 8;
              this.view.setUint16(sout, e3, true);
              sout += 2;
              this.view.setUint8(sout, constants_default.WASI_EVENTTYPE_CLOCK);
              sout += 1;
              sout += 5;
              eventc += 1;
              break;
            }
            case constants_default.WASI_EVENTTYPE_FD_READ:
            case constants_default.WASI_EVENTTYPE_FD_WRITE: {
              sin += 3;
              const fd = this.view.getUint32(sin, true);
              sin += 4;
              this.view.setBigUint64(sout, userdata, true);
              sout += 8;
              this.view.setUint16(sout, constants_default.WASI_ENOSYS, true);
              sout += 2;
              this.view.setUint8(sout, type);
              sout += 1;
              sout += 5;
              eventc += 1;
              break;
            }
            default:
              return constants_default.WASI_EINVAL;
          }
        }
        this.view.setUint32(nevents, eventc, true);
        while (bindings2.hrtime() < waitEnd) {
        }
        return constants_default.WASI_ESUCCESS;
      },
      proc_exit: (rval) => {
        bindings2.exit(rval);
        return constants_default.WASI_ESUCCESS;
      },
      proc_raise: (sig) => {
        if (!(sig in constants_default.SIGNAL_MAP)) {
          return constants_default.WASI_EINVAL;
        }
        bindings2.kill(constants_default.SIGNAL_MAP[sig]);
        return constants_default.WASI_ESUCCESS;
      },
      random_get: (bufPtr, bufLen) => {
        this.refreshMemory();
        bindings2.randomFillSync(new Uint8Array(this.memory.buffer), bufPtr, bufLen);
        return constants_default.WASI_ESUCCESS;
      },
      sched_yield() {
        return constants_default.WASI_ESUCCESS;
      },
      sock_recv() {
        return constants_default.WASI_ENOSYS;
      },
      sock_send() {
        return constants_default.WASI_ENOSYS;
      },
      sock_shutdown() {
        return constants_default.WASI_ENOSYS;
      }
    };
    if (wasiConfig.traceSyscalls) {
      Object.keys(this.wasiImport).forEach((key) => {
        const prevImport = this.wasiImport[key];
        this.wasiImport[key] = function(...args2) {
          console.log(`WASI: wasiImport called: ${key} (${args2})`);
          try {
            let result = prevImport(...args2);
            console.log(`WASI:  => ${result}`);
            return result;
          } catch (e3) {
            console.log(`Catched error: ${e3}`);
            throw e3;
          }
        };
      });
    }
  }
  refreshMemory() {
    if (!this.view || this.view.buffer.byteLength === 0) {
      this.view = new DataViewPolyfill(this.memory.buffer);
    }
  }
  setMemory(memory2) {
    this.memory = memory2;
  }
  start(instance) {
    const exports10 = instance.exports;
    if (exports10 === null || typeof exports10 !== "object") {
      throw new Error(`instance.exports must be an Object. Received ${exports10}.`);
    }
    const { memory: memory2 } = exports10;
    if (!(memory2 instanceof WebAssembly.Memory)) {
      throw new Error(`instance.exports.memory must be a WebAssembly.Memory. Recceived ${memory2}.`);
    }
    this.setMemory(memory2);
    if (exports10._start) {
      exports10._start();
    }
  }
  getImportNamespace(module) {
    let namespace = null;
    for (let imp of WebAssembly.Module.imports(module)) {
      if (imp.kind !== "function") {
        continue;
      }
      if (!imp.module.startsWith("wasi_")) {
        continue;
      }
      if (!namespace) {
        namespace = imp.module;
      } else {
        if (namespace !== imp.module) {
          throw new Error("Multiple namespaces detected.");
        }
      }
    }
    return namespace;
  }
  getImports(module) {
    let namespace = this.getImportNamespace(module);
    switch (namespace) {
      case "wasi_unstable":
        return {
          wasi_unstable: this.wasiImport
        };
      case "wasi_snapshot_preview1":
        return {
          wasi_snapshot_preview1: this.wasiImport
        };
      default:
        throw new Error("Can't detect a WASI namespace for the WebAssembly Module");
    }
  }
};
exports4.default = WASIDefault;
WASIDefault.defaultBindings = defaultBindings;
exports4.WASI = WASIDefault;
var { memory, _start, WASI } = exports4;

// node_shims/path.js
var path_exports = {};
__export(path_exports, {
  _makeLong: () => _makeLong,
  basename: () => basename,
  common: () => common,
  default: () => path_default,
  delimiter: () => delimiter,
  dirname: () => dirname,
  extname: () => extname,
  format: () => format,
  isAbsolute: () => isAbsolute,
  join: () => join2,
  normalize: () => normalize,
  parse: () => parse,
  posix: () => posix,
  relative: () => relative,
  resolve: () => resolve,
  sep: () => sep,
  toNamespacedPath: () => toNamespacedPath,
  win32: () => win32
});
var exported2 = path_browserify_1_0_exports;
var exportedDefault = I;
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
  exported2 = await import("node:path");
  exportedDefault = exported2.default;
}
var {
  _makeLong,
  basename,
  common,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join: join2,
  normalize,
  parse,
  posix,
  relative,
  resolve,
  sep,
  toNamespacedPath,
  win32
} = exported2;
var path_default = exportedDefault;

// wa_proc.ts
var WaProc = class {
  constructor(wasmFs, args, curDir) {
    this.wasmFs = wasmFs;
    if (curDir == null) curDir = "/";
    this.wasi = new WASI({
      args,
      bindings: {
        ...WASI.defaultBindings,
        fs: this.wasmFs.fs,
        path: path_default
      },
      preopens: {
        "/": "/",
        ".": curDir
      }
    });
    this.imports = {
      wasi_snapshot_preview1: this.wasi.wasiImport
    };
    this.chdir(curDir);
  }
  memory;
  cwd = "/";
  imports;
  wasi;
  async runWasiEntry(wasmPath) {
    const instance = await this.loadWasm(wasmPath);
    this.wasi.start(instance);
  }
  async loadWasm(wasmPath) {
    let obj;
    if (typeof wasmPath === "string") {
      const bin = this.wasmFs.fs.readFileSync(this.getAbsPath(wasmPath));
      if (bin == null) {
        throw "File not found";
      }
      obj = await WebAssembly.instantiate(bin, this.imports);
    } else {
      console.error(`Path or buffer required: ${wasmPath}`);
      return null;
    }
    const instance = obj.instance;
    if (instance.exports.memory) {
      this.memory = instance.exports.memory;
      this.wasi.setMemory(this.memory);
    }
    return instance;
  }
  chdir(absPath) {
    const st = this.wasmFs.fs.statSync(absPath);
    if (!st?.isDirectory()) return false;
    this.cwd = absPath;
    return true;
  }
  getAbsPath(fileName) {
    if (fileName.length > 0 && fileName[0] === "/") return fileName;
    return `${this.cwd}${this.cwd === "/" ? "" : "/"}${fileName}`;
  }
};

// https://esm.sh/v135/fast-extend@1.0.2/denonext/fast-extend.mjs
var m3 = Object.create;
var d5 = Object.defineProperty;
var x4 = Object.getOwnPropertyDescriptor;
var _3 = Object.getOwnPropertyNames;
var g4 = Object.getPrototypeOf;
var v3 = Object.prototype.hasOwnProperty;
var y2 = (t3, e3) => () => (e3 || t3((e3 = { exports: {} }).exports, e3), e3.exports);
var h3 = (t3, e3) => {
  for (var r2 in e3) d5(t3, r2, { get: e3[r2], enumerable: true });
};
var u3 = (t3, e3, r2, l23) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let a17 of _3(e3)) !v3.call(t3, a17) && a17 !== r2 && d5(t3, a17, { get: () => e3[a17], enumerable: !(l23 = x4(e3, a17)) || l23.enumerable });
  return t3;
};
var o2 = (t3, e3, r2) => (u3(t3, e3, "default"), r2 && u3(r2, e3, "default"));
var f2 = (t3, e3, r2) => (r2 = t3 != null ? m3(g4(t3)) : {}, u3(e3 || !t3 || !t3.__esModule ? d5(r2, "default", { value: t3, enumerable: true }) : r2, t3));
var c3 = y2((p26) => {
  var A15 = Array.prototype.slice;
  p26.extend = function t3(e3, r2) {
    for (var l23 in r2) e3[l23] = r2[l23];
    return arguments.length < 3 ? e3 : t3.apply(null, [e3].concat(A15.call(arguments, 2)));
  };
});
var n2 = {};
h3(n2, { default: () => w4, extend: () => j4 });
var i2 = f2(c3());
o2(n2, f2(c3()));
var { extend: j4 } = i2;
var { default: s2, ...q4 } = i2;
var w4 = s2 !== void 0 ? s2 : q4;

// node_shims/process.js
var baseNow2 = Math.floor((Date.now() - performance.now()) * 1e-3);
var exported3 = {
  getuid: () => 0,
  getgid: () => 0,
  cwd: () => "/",
  platform: "browser",
  nextTick: typeof setImmediate === "function" ? setImmediate.bind(globalThis) : setTimeout.bind(globalThis),
  emitWarning: (message2, type) => {
    console.warn(`${type}${type ? ": " : ""}${message2}`);
  },
  env: {},
  hrtime(previousTimestamp) {
    let clocktime = performance.now() * 1e-3;
    let seconds = Math.floor(clocktime) + baseNow2;
    let nanoseconds = Math.floor(clocktime % 1 * 1e9);
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
};
if (!config.forceBrowser && globalThis.process) {
  exported3 = globalThis.process;
} else if (!config.forceBrowser && globalThis.Deno && !globalThis.process) {
  exported3 = await import("node:process");
} else {
  exported3.default = exported3;
}
var {
  abort,
  cwd,
  exit,
  hrtime: hrtime2,
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
  stdin
} = exported3;
var process_default = exported3;

// fs-monkey/lib/correctPath.js
var exports5 = {};
var isWin = process_default.platform === "win32";
function removeTrailingSeparator(str) {
  var i18 = str.length - 1;
  if (i18 < 2) {
    return str;
  }
  while (isSeparator(str, i18)) {
    i18--;
  }
  return str.substr(0, i18 + 1);
}
function isSeparator(str, i18) {
  var _char = str[i18];
  return i18 > 0 && (_char === "/" || isWin && _char === "\\");
}
function normalizePath(str, stripTrailing) {
  if (typeof str !== "string") {
    throw new TypeError("expected a string");
  }
  str = str.replace(/[\\\/]+/g, "/");
  if (stripTrailing !== false) {
    str = removeTrailingSeparator(str);
  }
  return str;
}
function unixify(filepath) {
  var stripTrailing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (isWin) {
    filepath = normalizePath(filepath, stripTrailing);
    return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "");
  }
  return filepath;
}
function correctPath(filepath) {
  return unixify(filepath.replace(/^\\\\\?\\.:\\/, "\\"));
}
exports5.correctPath = correctPath;
exports5.unixify = unixify;
exports5.default = exports5;

// node_shims/helpers/stream-browserify.js
var stream_browserify_exports = {};
__export(stream_browserify_exports, {
  Duplex: () => Duplex,
  PassThrough: () => PassThrough,
  Readable: () => Readable,
  Stream: () => Stream,
  Transform: () => Transform,
  Writable: () => Writable,
  default: () => build_default15,
  finished: () => finished,
  pipeline: () => pipeline
});
var __defProp5 = Object.defineProperty;
var __export5 = (target, all) => {
  for (var name in all)
    __defProp5(target, name, { get: all[name], enumerable: true });
};
var node_events_exports = {};
__export5(node_events_exports, {
  EventEmitter: () => o3,
  default: () => o3,
  defaultMaxListeners: () => l3,
  init: () => d6,
  listenerCount: () => b5,
  once: () => N3,
  setMaxListeners: () => P2
});
var a2 = typeof Reflect == "object" ? Reflect : null;
var m4 = a2 && typeof a2.apply == "function" ? a2.apply : function(e3, n210, r2) {
  return Function.prototype.apply.call(e3, n210, r2);
};
var v4;
a2 && typeof a2.ownKeys == "function" ? v4 = a2.ownKeys : Object.getOwnPropertySymbols ? v4 = function(e3) {
  return Object.getOwnPropertyNames(e3).concat(Object.getOwnPropertySymbols(e3));
} : v4 = function(e3) {
  return Object.getOwnPropertyNames(e3);
};
function C3(t3) {
  console && console.warn && console.warn(t3);
}
var p3 = Number.isNaN || function(e3) {
  return e3 !== e3;
};
function o3() {
  d6.call(this);
}
o3.EventEmitter = o3, o3.prototype._events = void 0, o3.prototype._eventsCount = 0, o3.prototype._maxListeners = void 0;
var l3 = 10;
function h4(t3) {
  if (typeof t3 != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t3);
}
Object.defineProperty(o3, "defaultMaxListeners", { enumerable: true, get: function() {
  return l3;
}, set: function(t3) {
  if (typeof t3 != "number" || t3 < 0 || p3(t3)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t3 + ".");
  l3 = t3;
} });
function d6() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}
o3.init = d6, o3.prototype.setMaxListeners = function(e3) {
  if (typeof e3 != "number" || e3 < 0 || p3(e3)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e3 + ".");
  return this._maxListeners = e3, this;
};
function y3(t3) {
  return t3._maxListeners === void 0 ? o3.defaultMaxListeners : t3._maxListeners;
}
o3.prototype.getMaxListeners = function() {
  return y3(this);
}, o3.prototype.emit = function(e3) {
  for (var n210 = [], r2 = 1; r2 < arguments.length; r2++) n210.push(arguments[r2]);
  var i18 = e3 === "error", f18 = this._events;
  if (f18 !== void 0) i18 = i18 && f18.error === void 0;
  else if (!i18) return false;
  if (i18) {
    var s26;
    if (n210.length > 0 && (s26 = n210[0]), s26 instanceof Error) throw s26;
    var u25 = new Error("Unhandled error." + (s26 ? " (" + s26.message + ")" : ""));
    throw u25.context = s26, u25;
  }
  var c23 = f18[e3];
  if (c23 === void 0) return false;
  if (typeof c23 == "function") m4(c23, this, n210);
  else for (var L8 = c23.length, x33 = E3(c23, L8), r2 = 0; r2 < L8; ++r2) m4(x33[r2], this, n210);
  return true;
};
function g5(t3, e3, n210, r2) {
  var i18, f18, s26;
  if (h4(n210), f18 = t3._events, f18 === void 0 ? (f18 = t3._events = /* @__PURE__ */ Object.create(null), t3._eventsCount = 0) : (f18.newListener !== void 0 && (t3.emit("newListener", e3, n210.listener ? n210.listener : n210), f18 = t3._events), s26 = f18[e3]), s26 === void 0) s26 = f18[e3] = n210, ++t3._eventsCount;
  else if (typeof s26 == "function" ? s26 = f18[e3] = r2 ? [n210, s26] : [s26, n210] : r2 ? s26.unshift(n210) : s26.push(n210), i18 = y3(t3), i18 > 0 && s26.length > i18 && !s26.warned) {
    s26.warned = true;
    var u25 = new Error("Possible EventEmitter memory leak detected. " + s26.length + " " + String(e3) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    u25.name = "MaxListenersExceededWarning", u25.emitter = t3, u25.type = e3, u25.count = s26.length, C3(u25);
  }
  return t3;
}
o3.prototype.addListener = function(e3, n210) {
  return g5(this, e3, n210, false);
}, o3.prototype.on = o3.prototype.addListener, o3.prototype.prependListener = function(e3, n210) {
  return g5(this, e3, n210, true);
};
function R4() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function w5(t3, e3, n210) {
  var r2 = { fired: false, wrapFn: void 0, target: t3, type: e3, listener: n210 }, i18 = R4.bind(r2);
  return i18.listener = n210, r2.wrapFn = i18, i18;
}
o3.prototype.once = function(e3, n210) {
  return h4(n210), this.on(e3, w5(this, e3, n210)), this;
}, o3.prototype.prependOnceListener = function(e3, n210) {
  return h4(n210), this.prependListener(e3, w5(this, e3, n210)), this;
}, o3.prototype.removeListener = function(e3, n210) {
  var r2, i18, f18, s26, u25;
  if (h4(n210), i18 = this._events, i18 === void 0) return this;
  if (r2 = i18[e3], r2 === void 0) return this;
  if (r2 === n210 || r2.listener === n210) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i18[e3], i18.removeListener && this.emit("removeListener", e3, r2.listener || n210));
  else if (typeof r2 != "function") {
    for (f18 = -1, s26 = r2.length - 1; s26 >= 0; s26--) if (r2[s26] === n210 || r2[s26].listener === n210) {
      u25 = r2[s26].listener, f18 = s26;
      break;
    }
    if (f18 < 0) return this;
    f18 === 0 ? r2.shift() : M4(r2, f18), r2.length === 1 && (i18[e3] = r2[0]), i18.removeListener !== void 0 && this.emit("removeListener", e3, u25 || n210);
  }
  return this;
}, o3.prototype.off = o3.prototype.removeListener, o3.prototype.removeAllListeners = function(e3) {
  var n210, r2, i18;
  if (r2 = this._events, r2 === void 0) return this;
  if (r2.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : r2[e3] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete r2[e3]), this;
  if (arguments.length === 0) {
    var f18 = Object.keys(r2), s26;
    for (i18 = 0; i18 < f18.length; ++i18) s26 = f18[i18], s26 !== "removeListener" && this.removeAllListeners(s26);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (n210 = r2[e3], typeof n210 == "function") this.removeListener(e3, n210);
  else if (n210 !== void 0) for (i18 = n210.length - 1; i18 >= 0; i18--) this.removeListener(e3, n210[i18]);
  return this;
};
function _4(t3, e3, n210) {
  var r2 = t3._events;
  if (r2 === void 0) return [];
  var i18 = r2[e3];
  return i18 === void 0 ? [] : typeof i18 == "function" ? n210 ? [i18.listener || i18] : [i18] : n210 ? j5(i18) : E3(i18, i18.length);
}
o3.prototype.listeners = function(e3) {
  return _4(this, e3, true);
}, o3.prototype.rawListeners = function(e3) {
  return _4(this, e3, false);
};
function b5(t3, e3) {
  return typeof t3.listenerCount == "function" ? t3.listenerCount(e3) : o3.prototype.listenerCount.call(t3, e3);
}
o3.listenerCount = b5, o3.prototype.listenerCount = function(t3) {
  var e3 = this._events;
  if (e3 !== void 0) {
    var n210 = e3[t3];
    if (typeof n210 == "function") return 1;
    if (n210 !== void 0) return n210.length;
  }
  return 0;
}, o3.prototype.eventNames = function() {
  return this._eventsCount > 0 ? v4(this._events) : [];
};
function E3(t3, e3) {
  for (var n210 = new Array(e3), r2 = 0; r2 < e3; ++r2) n210[r2] = t3[r2];
  return n210;
}
function M4(t3, e3) {
  for (; e3 + 1 < t3.length; e3++) t3[e3] = t3[e3 + 1];
  t3.pop();
}
function j5(t3) {
  for (var e3 = new Array(t3.length), n210 = 0; n210 < e3.length; ++n210) e3[n210] = t3[n210].listener || t3[n210];
  return e3;
}
function N3(t3, e3) {
  return new Promise(function(n210, r2) {
    function i18(s26) {
      t3.removeListener(e3, f18), r2(s26);
    }
    function f18() {
      typeof t3.removeListener == "function" && t3.removeListener("error", i18), n210([].slice.call(arguments));
    }
    O3(t3, e3, f18, { once: true }), e3 !== "error" && A2(t3, i18, { once: true });
  });
}
function A2(t3, e3, n210) {
  typeof t3.on == "function" && O3(t3, "error", e3, n210);
}
function O3(t3, e3, n210, r2) {
  if (typeof t3.on == "function") r2.once ? t3.once(e3, n210) : t3.on(e3, n210);
  else if (typeof t3.addEventListener == "function") t3.addEventListener(e3, function i18(f18) {
    r2.once && t3.removeEventListener(e3, i18), n210(f18);
  });
  else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t3);
}
function P2(t3 = l3, ...e3) {
  if (typeof t3 != "number" || t3 < 0 || p3(t3)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t3 + ".");
  if (e3.length === 0) l3 = t3;
  else for (let n210 = 0; n210 < e3.length; n210++) {
    const r2 = e3[n210];
    if (typeof r2.setMaxListeners == "function") r2.setMaxListeners(t3);
    else throw new TypeError("eventTarget is invalid, must have 'setMaxListeners' method.");
  }
}
var inherits_development_exports = {};
__export5(inherits_development_exports, {
  default: () => build_default4
});
var __create4 = Object.create;
var __defProp23 = Object.defineProperty;
var __getOwnPropDesc4 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames4 = Object.getOwnPropertyNames;
var __getProtoOf4 = Object.getPrototypeOf;
var __hasOwnProp4 = Object.prototype.hasOwnProperty;
var __commonJS4 = (cb, mod) => function __require10() {
  return mod || (0, cb[__getOwnPropNames4(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export23 = (target, all) => {
  for (var name in all)
    __defProp23(target, name, { get: all[name], enumerable: true });
};
var __copyProps4 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames4(from))
      if (!__hasOwnProp4.call(to, key) && key !== except)
        __defProp23(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc4(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport4 = (target, mod, secondTarget) => (__copyProps4(target, mod, "default"), secondTarget && __copyProps4(secondTarget, mod, "default"));
var __toESM4 = (mod, isNodeMode, target) => (target = mod != null ? __create4(__getProtoOf4(mod)) : {}, __copyProps4(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp23(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_inherits_browser = __commonJS4({
  "../esmd/npm/inherits@2.0.4/node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports10, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits2(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits2(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});
var build_exports4 = {};
__export23(build_exports4, {
  default: () => build_default4
});
var __module4 = __toESM4(require_inherits_browser());
__reExport4(build_exports4, __toESM4(require_inherits_browser()));
var { default: __default4, ...__rest4 } = __module4;
var build_default4 = __default4 !== void 0 ? __default4 : __rest4;
var stream_readable_development_exports = {};
__export5(stream_readable_development_exports, {
  _fromList: () => _fromList,
  default: () => build_default8
});
function s3(t3) {
  const e3 = performance.now(), r2 = Math.floor(e3 / 1e3), o26 = Math.floor(e3 * 1e6 - r2 * 1e9);
  if (!t3) return [r2, o26];
  const [i18, c23] = t3;
  return [r2 - i18, o26 - c23];
}
s3.bigint = function() {
  const [t3, e3] = s3();
  return BigInt(t3) * 1000000000n + BigInt(e3);
};
var p22 = class extends o3 {
  title = "browser";
  browser = true;
  env = {};
  argv = [];
  pid = 0;
  arch = "unknown";
  platform = "browser";
  version = "";
  versions = {};
  emitWarning = () => {
    throw new Error("process.emitWarning is not supported");
  };
  binding = () => {
    throw new Error("process.binding is not supported");
  };
  cwd = () => {
    throw new Error("process.cwd is not supported");
  };
  chdir = (e3) => {
    throw new Error("process.chdir is not supported");
  };
  umask = () => 18;
  nextTick = (e3, ...r2) => queueMicrotask(() => e3(...r2));
  hrtime = s3;
  constructor() {
    super();
  }
};
var n3 = new p22();
if (typeof Deno < "u") {
  n3.name = "deno", n3.browser = false, n3.pid = Deno.pid, n3.cwd = () => Deno.cwd(), n3.chdir = (e3) => Deno.chdir(e3), n3.arch = Deno.build.arch, n3.platform = Deno.build.os, n3.version = "v18.12.1", n3.versions = { node: "18.12.1", uv: "1.43.0", zlib: "1.2.11", brotli: "1.0.9", ares: "1.18.1", modules: "108", nghttp2: "1.47.0", napi: "8", llhttp: "6.0.10", openssl: "3.0.7+quic", cldr: "41.0", icu: "71.1", tz: "2022b", unicode: "14.0", ngtcp2: "0.8.1", nghttp3: "0.7.0", ...Deno.version }, n3.env = new Proxy({}, { get(e3, r2) {
    return Deno.env.get(String(r2));
  }, ownKeys: () => Reflect.ownKeys(Deno.env.toObject()), getOwnPropertyDescriptor: (e3, r2) => {
    const o26 = Deno.env.toObject();
    if (r2 in Deno.env.toObject()) {
      const i18 = { enumerable: true, configurable: true };
      return typeof r2 == "string" && (i18.value = o26[r2]), i18;
    }
  }, set(e3, r2, o26) {
    return Deno.env.set(String(r2), String(o26)), o26;
  } });
  const t3 = ["", "", ...Deno.args];
  Object.defineProperty(t3, "0", { get: Deno.execPath }), Object.defineProperty(t3, "1", { get: () => Deno.mainModule.startsWith("file:") ? new URL(Deno.mainModule).pathname : join(Deno.cwd(), "$deno$node.js") }), n3.argv = t3;
} else {
  let t3 = "/";
  n3.cwd = () => t3, n3.chdir = (e3) => t3 = e3;
}
var a22 = n3;
var buffer_development_exports = {};
__export5(buffer_development_exports, {
  Buffer: () => Buffer22,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES3,
  SlowBuffer: () => SlowBuffer3,
  default: () => build_default42,
  kMaxLength: () => kMaxLength3
});
var base64_js_development_exports2 = {};
__export5(base64_js_development_exports2, {
  byteLength: () => byteLength2,
  default: () => build_default22,
  fromByteArray: () => fromByteArray2,
  toByteArray: () => toByteArray2
});
var __create22 = Object.create;
var __defProp32 = Object.defineProperty;
var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames22 = Object.getOwnPropertyNames;
var __getProtoOf22 = Object.getPrototypeOf;
var __hasOwnProp22 = Object.prototype.hasOwnProperty;
var __commonJS22 = (cb, mod) => function __require10() {
  return mod || (0, cb[__getOwnPropNames22(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export32 = (target, all) => {
  for (var name in all)
    __defProp32(target, name, { get: all[name], enumerable: true });
};
var __copyProps22 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames22(from))
      if (!__hasOwnProp22.call(to, key) && key !== except)
        __defProp32(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc22(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport22 = (target, mod, secondTarget) => (__copyProps22(target, mod, "default"), secondTarget && __copyProps22(secondTarget, mod, "default"));
var __toESM22 = (mod, isNodeMode, target) => (target = mod != null ? __create22(__getProtoOf22(mod)) : {}, __copyProps22(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp32(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_base64_js2 = __commonJS22({
  "../esmd/npm/base64-js@1.5.1/node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports10) {
    "use strict";
    exports10.byteLength = byteLength22;
    exports10.toByteArray = toByteArray22;
    exports10.fromByteArray = fromByteArray22;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i18 = 0, len = code.length; i18 < len; ++i18) {
      lookup[i18] = code[i18];
      revLookup[code.charCodeAt(i18)] = i18;
    }
    var i18;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength22(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray22(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i23;
      for (i23 = 0; i23 < len2; i23 += 4) {
        tmp = revLookup[b64.charCodeAt(i23)] << 18 | revLookup[b64.charCodeAt(i23 + 1)] << 12 | revLookup[b64.charCodeAt(i23 + 2)] << 6 | revLookup[b64.charCodeAt(i23 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i23)] << 2 | revLookup[b64.charCodeAt(i23 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i23)] << 10 | revLookup[b64.charCodeAt(i23 + 1)] << 4 | revLookup[b64.charCodeAt(i23 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i23 = start; i23 < end; i23 += 3) {
        tmp = (uint8[i23] << 16 & 16711680) + (uint8[i23 + 1] << 8 & 65280) + (uint8[i23 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray22(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i23 = 0, len22 = len2 - extraBytes; i23 < len22; i23 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i23, i23 + maxChunkLength > len22 ? len22 : i23 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});
var build_exports22 = {};
__export32(build_exports22, {
  byteLength: () => byteLength2,
  default: () => build_default22,
  fromByteArray: () => fromByteArray2,
  toByteArray: () => toByteArray2
});
var __module22 = __toESM22(require_base64_js2());
__reExport22(build_exports22, __toESM22(require_base64_js2()));
var { byteLength: byteLength2, toByteArray: toByteArray2, fromByteArray: fromByteArray2 } = __module22;
var { default: __default22, ...__rest22 } = __module22;
var build_default22 = __default22 !== void 0 ? __default22 : __rest22;
var ieee754_development_exports2 = {};
__export5(ieee754_development_exports2, {
  default: () => build_default32,
  read: () => read2,
  write: () => write2
});
var __create32 = Object.create;
var __defProp42 = Object.defineProperty;
var __getOwnPropDesc32 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames32 = Object.getOwnPropertyNames;
var __getProtoOf32 = Object.getPrototypeOf;
var __hasOwnProp32 = Object.prototype.hasOwnProperty;
var __commonJS32 = (cb, mod) => function __require10() {
  return mod || (0, cb[__getOwnPropNames32(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export42 = (target, all) => {
  for (var name in all)
    __defProp42(target, name, { get: all[name], enumerable: true });
};
var __copyProps32 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames32(from))
      if (!__hasOwnProp32.call(to, key) && key !== except)
        __defProp42(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc32(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport32 = (target, mod, secondTarget) => (__copyProps32(target, mod, "default"), secondTarget && __copyProps32(secondTarget, mod, "default"));
var __toESM32 = (mod, isNodeMode, target) => (target = mod != null ? __create32(__getProtoOf32(mod)) : {}, __copyProps32(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp42(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_ieee7542 = __commonJS32({
  "../esmd/npm/ieee754@1.2.1/node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js"(exports10) {
    exports10.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e3, m23;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i18 = isLE ? nBytes - 1 : 0;
      var d23 = isLE ? -1 : 1;
      var s26 = buffer[offset + i18];
      i18 += d23;
      e3 = s26 & (1 << -nBits) - 1;
      s26 >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e3 = e3 * 256 + buffer[offset + i18], i18 += d23, nBits -= 8) {
      }
      m23 = e3 & (1 << -nBits) - 1;
      e3 >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m23 = m23 * 256 + buffer[offset + i18], i18 += d23, nBits -= 8) {
      }
      if (e3 === 0) {
        e3 = 1 - eBias;
      } else if (e3 === eMax) {
        return m23 ? NaN : (s26 ? -1 : 1) * Infinity;
      } else {
        m23 = m23 + Math.pow(2, mLen);
        e3 = e3 - eBias;
      }
      return (s26 ? -1 : 1) * m23 * Math.pow(2, e3 - mLen);
    };
    exports10.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e3, m23, c23;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i18 = isLE ? 0 : nBytes - 1;
      var d23 = isLE ? 1 : -1;
      var s26 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m23 = isNaN(value) ? 1 : 0;
        e3 = eMax;
      } else {
        e3 = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c23 = Math.pow(2, -e3)) < 1) {
          e3--;
          c23 *= 2;
        }
        if (e3 + eBias >= 1) {
          value += rt / c23;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c23 >= 2) {
          e3++;
          c23 /= 2;
        }
        if (e3 + eBias >= eMax) {
          m23 = 0;
          e3 = eMax;
        } else if (e3 + eBias >= 1) {
          m23 = (value * c23 - 1) * Math.pow(2, mLen);
          e3 = e3 + eBias;
        } else {
          m23 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e3 = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i18] = m23 & 255, i18 += d23, m23 /= 256, mLen -= 8) {
      }
      e3 = e3 << mLen | m23;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i18] = e3 & 255, i18 += d23, e3 /= 256, eLen -= 8) {
      }
      buffer[offset + i18 - d23] |= s26 * 128;
    };
  }
});
var build_exports32 = {};
__export42(build_exports32, {
  default: () => build_default32,
  read: () => read2,
  write: () => write2
});
var __module32 = __toESM32(require_ieee7542());
__reExport32(build_exports32, __toESM32(require_ieee7542()));
var { read: read2, write: write2 } = __module32;
var { default: __default32, ...__rest32 } = __module32;
var build_default32 = __default32 !== void 0 ? __default32 : __rest32;
var __create42 = Object.create;
var __defProp52 = Object.defineProperty;
var __getOwnPropDesc42 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames42 = Object.getOwnPropertyNames;
var __getProtoOf42 = Object.getPrototypeOf;
var __hasOwnProp42 = Object.prototype.hasOwnProperty;
var __commonJS42 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames42(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export52 = (target, all) => {
  for (var name in all)
    __defProp52(target, name, { get: all[name], enumerable: true });
};
var __copyProps42 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames42(from))
      if (!__hasOwnProp42.call(to, key) && key !== except)
        __defProp52(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc42(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport42 = (target, mod, secondTarget) => (__copyProps42(target, mod, "default"), secondTarget && __copyProps42(secondTarget, mod, "default"));
var __toESM42 = (mod, isNodeMode, target) => (target = mod != null ? __create42(__getProtoOf42(mod)) : {}, __copyProps42(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp52(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_buffer2 = __commonJS42({
  "../esmd/npm/buffer@6.0.3/node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js"(exports10) {
    Object.assign(exports10, buffer_exports2);
  }
});
var build_exports42 = {};
__export52(build_exports42, {
  Buffer: () => Buffer22,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES3,
  SlowBuffer: () => SlowBuffer3,
  default: () => build_default42,
  kMaxLength: () => kMaxLength3
});
var __module42 = __toESM42(require_buffer2());
__reExport42(build_exports42, __toESM42(require_buffer2()));
var { Buffer: Buffer22, SlowBuffer: SlowBuffer3, INSPECT_MAX_BYTES: INSPECT_MAX_BYTES3, kMaxLength: kMaxLength3 } = __module42;
var { default: __default42, ...__rest42 } = __module42;
var build_default42 = __default42 !== void 0 ? __default42 : __rest42;
var string_decoder_development_exports = {};
__export5(string_decoder_development_exports, {
  StringDecoder: () => StringDecoder,
  default: () => build_default6
});
var safe_buffer_development_exports = {};
__export5(safe_buffer_development_exports, {
  Blob: () => Blob2,
  Buffer: () => Buffer222,
  File: () => File,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES22,
  SlowBuffer: () => SlowBuffer22,
  atob: () => atob2,
  btoa: () => btoa2,
  constants: () => constants2,
  default: () => build_default5,
  isAscii: () => isAscii2,
  isUtf8: () => isUtf82,
  kMaxLength: () => kMaxLength22,
  kStringMaxLength: () => kStringMaxLength2,
  resolveObjectURL: () => resolveObjectURL,
  transcode: () => transcode
});
var require32 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "buffer":
      return e3(buffer_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create5 = Object.create;
var __defProp6 = Object.defineProperty;
var __getOwnPropDesc5 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames5 = Object.getOwnPropertyNames;
var __getProtoOf5 = Object.getPrototypeOf;
var __hasOwnProp5 = Object.prototype.hasOwnProperty;
var __require2 = /* @__PURE__ */ ((x33) => typeof require32 !== "undefined" ? require32 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require32 !== "undefined" ? require32 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require32 !== "undefined")
    return require32.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __commonJS5 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames5(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export6 = (target, all) => {
  for (var name in all)
    __defProp6(target, name, { get: all[name], enumerable: true });
};
var __copyProps5 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames5(from))
      if (!__hasOwnProp5.call(to, key) && key !== except)
        __defProp6(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc5(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport5 = (target, mod, secondTarget) => (__copyProps5(target, mod, "default"), secondTarget && __copyProps5(secondTarget, mod, "default"));
var __toESM5 = (mod, isNodeMode, target) => (target = mod != null ? __create5(__getProtoOf5(mod)) : {}, __copyProps5(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp6(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_safe_buffer = __commonJS5({
  "../esmd/npm/safe-buffer@5.2.1/node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js"(exports10, module) {
    var buffer = __require2("buffer");
    var Buffer32 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer32.from && Buffer32.alloc && Buffer32.allocUnsafe && Buffer32.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports10);
      exports10.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer32(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer32.prototype);
    copyProps(Buffer32, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer32(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer32(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer32(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});
var build_exports5 = {};
__export6(build_exports5, {
  Blob: () => Blob2,
  Buffer: () => Buffer222,
  File: () => File,
  INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES22,
  SlowBuffer: () => SlowBuffer22,
  atob: () => atob2,
  btoa: () => btoa2,
  constants: () => constants2,
  default: () => build_default5,
  isAscii: () => isAscii2,
  isUtf8: () => isUtf82,
  kMaxLength: () => kMaxLength22,
  kStringMaxLength: () => kStringMaxLength2,
  resolveObjectURL: () => resolveObjectURL,
  transcode: () => transcode
});
var __module5 = __toESM5(require_safe_buffer());
__reExport5(build_exports5, __toESM5(require_safe_buffer()));
var { Blob: Blob2, File, resolveObjectURL, Buffer: Buffer222, SlowBuffer: SlowBuffer22, transcode, isUtf8: isUtf82, isAscii: isAscii2, kMaxLength: kMaxLength22, kStringMaxLength: kStringMaxLength2, btoa: btoa2, atob: atob2, constants: constants2, INSPECT_MAX_BYTES: INSPECT_MAX_BYTES22 } = __module5;
var { default: __default5, ...__rest5 } = __module5;
var build_default5 = __default5 !== void 0 ? __default5 : __rest5;
var require42 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "safe-buffer":
      return e3(safe_buffer_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create6 = Object.create;
var __defProp7 = Object.defineProperty;
var __getOwnPropDesc6 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames6 = Object.getOwnPropertyNames;
var __getProtoOf6 = Object.getPrototypeOf;
var __hasOwnProp6 = Object.prototype.hasOwnProperty;
var __require3 = /* @__PURE__ */ ((x33) => typeof require42 !== "undefined" ? require42 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require42 !== "undefined" ? require42 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require42 !== "undefined")
    return require42.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __commonJS6 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames6(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export7 = (target, all) => {
  for (var name in all)
    __defProp7(target, name, { get: all[name], enumerable: true });
};
var __copyProps6 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames6(from))
      if (!__hasOwnProp6.call(to, key) && key !== except)
        __defProp7(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc6(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport6 = (target, mod, secondTarget) => (__copyProps6(target, mod, "default"), secondTarget && __copyProps6(secondTarget, mod, "default"));
var __toESM6 = (mod, isNodeMode, target) => (target = mod != null ? __create6(__getProtoOf6(mod)) : {}, __copyProps6(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp7(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_string_decoder = __commonJS6({
  "../esmd/npm/string_decoder@1.3.0/node_modules/.pnpm/string_decoder@1.3.0/node_modules/string_decoder/lib/string_decoder.js"(exports10) {
    "use strict";
    var Buffer23 = __require3("safe-buffer").Buffer;
    var isEncoding = Buffer23.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc)
        return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried)
              return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer23.isEncoding === isEncoding || !isEncoding(enc)))
        throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports10.StringDecoder = StringDecoder2;
    function StringDecoder2(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer23.allocUnsafe(nb);
    }
    StringDecoder2.prototype.write = function(buf) {
      if (buf.length === 0)
        return "";
      var r2;
      var i18;
      if (this.lastNeed) {
        r2 = this.fillLast(buf);
        if (r2 === void 0)
          return "";
        i18 = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i18 = 0;
      }
      if (i18 < buf.length)
        return r2 ? r2 + this.text(buf, i18) : this.text(buf, i18);
      return r2 || "";
    };
    StringDecoder2.prototype.end = utf8End;
    StringDecoder2.prototype.text = utf8Text;
    StringDecoder2.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127)
        return 0;
      else if (byte >> 5 === 6)
        return 2;
      else if (byte >> 4 === 14)
        return 3;
      else if (byte >> 3 === 30)
        return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i18) {
      var j23 = buf.length - 1;
      if (j23 < i18)
        return 0;
      var nb = utf8CheckByte(buf[j23]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j23 < i18 || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j23]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j23 < i18 || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j23]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2)
            nb = 0;
          else
            self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p33) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "�";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "�";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "�";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p33 = this.lastTotal - this.lastNeed;
      var r2 = utf8CheckExtraBytes(this, buf, p33);
      if (r2 !== void 0)
        return r2;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p33, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p33, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i18) {
      var total = utf8CheckIncomplete(this, buf, i18);
      if (!this.lastNeed)
        return buf.toString("utf8", i18);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i18, end);
    }
    function utf8End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r2 + "�";
      return r2;
    }
    function utf16Text(buf, i18) {
      if ((buf.length - i18) % 2 === 0) {
        var r2 = buf.toString("utf16le", i18);
        if (r2) {
          var c23 = r2.charCodeAt(r2.length - 1);
          if (c23 >= 55296 && c23 <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r2.slice(0, -1);
          }
        }
        return r2;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i18, buf.length - 1);
    }
    function utf16End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r2 + this.lastChar.toString("utf16le", 0, end);
      }
      return r2;
    }
    function base64Text(buf, i18) {
      var n210 = (buf.length - i18) % 3;
      if (n210 === 0)
        return buf.toString("base64", i18);
      this.lastNeed = 3 - n210;
      this.lastTotal = 3;
      if (n210 === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i18, buf.length - n210);
    }
    function base64End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r2 + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r2;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});
var build_exports6 = {};
__export7(build_exports6, {
  StringDecoder: () => StringDecoder,
  default: () => build_default6
});
var __module6 = __toESM6(require_string_decoder());
__reExport6(build_exports6, __toESM6(require_string_decoder()));
var { StringDecoder } = __module6;
var { default: __default6, ...__rest6 } = __module6;
var build_default6 = __default6 !== void 0 ? __default6 : __rest6;
var util_deprecate_development_exports = {};
__export5(util_deprecate_development_exports, {
  default: () => build_default7
});
var __global$3 = globalThis || (typeof window !== "undefined" ? window : self);
var __create7 = Object.create;
var __defProp8 = Object.defineProperty;
var __getOwnPropDesc7 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames7 = Object.getOwnPropertyNames;
var __getProtoOf7 = Object.getPrototypeOf;
var __hasOwnProp7 = Object.prototype.hasOwnProperty;
var __commonJS7 = (cb, mod) => function __require10() {
  return mod || (0, cb[__getOwnPropNames7(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export8 = (target, all) => {
  for (var name in all)
    __defProp8(target, name, { get: all[name], enumerable: true });
};
var __copyProps7 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames7(from))
      if (!__hasOwnProp7.call(to, key) && key !== except)
        __defProp8(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc7(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport7 = (target, mod, secondTarget) => (__copyProps7(target, mod, "default"), secondTarget && __copyProps7(secondTarget, mod, "default"));
var __toESM7 = (mod, isNodeMode, target) => (target = mod != null ? __create7(__getProtoOf7(mod)) : {}, __copyProps7(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp8(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_browser = __commonJS7({
  "../esmd/npm/util-deprecate@1.0.2/node_modules/.pnpm/util-deprecate@1.0.2/node_modules/util-deprecate/browser.js"(exports10, module) {
    module.exports = deprecate2;
    function deprecate2(fn, msg) {
      if (config2("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config2("throwDeprecation")) {
            throw new Error(msg);
          } else if (config2("traceDeprecation")) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    }
    function config2(name) {
      try {
        if (!__global$3.localStorage)
          return false;
      } catch (_210) {
        return false;
      }
      var val = __global$3.localStorage[name];
      if (null == val)
        return false;
      return String(val).toLowerCase() === "true";
    }
  }
});
var build_exports7 = {};
__export8(build_exports7, {
  default: () => build_default7
});
var __module7 = __toESM7(require_browser());
__reExport7(build_exports7, __toESM7(require_browser()));
var { default: __default7, ...__rest7 } = __module7;
var build_default7 = __default7 !== void 0 ? __default7 : __rest7;
var __global$22 = globalThis || (typeof window !== "undefined" ? window : self);
var require52 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "events":
      return e3(node_events_exports);
    case "buffer":
      return e3(buffer_development_exports);
    case "inherits":
      return e3(inherits_development_exports);
    case "string_decoder":
      return e3(string_decoder_development_exports);
    case "util-deprecate":
      return e3(util_deprecate_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create8 = Object.create;
var __defProp9 = Object.defineProperty;
var __getOwnPropDesc8 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames8 = Object.getOwnPropertyNames;
var __getProtoOf8 = Object.getPrototypeOf;
var __hasOwnProp8 = Object.prototype.hasOwnProperty;
var __require4 = /* @__PURE__ */ ((x33) => typeof require52 !== "undefined" ? require52 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require52 !== "undefined" ? require52 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require52 !== "undefined")
    return require52.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames8(fn)[0]])(fn = 0)), res;
};
var __commonJS8 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames8(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export9 = (target, all) => {
  for (var name in all)
    __defProp9(target, name, { get: all[name], enumerable: true });
};
var __copyProps8 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames8(from))
      if (!__hasOwnProp8.call(to, key) && key !== except)
        __defProp9(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc8(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport8 = (target, mod, secondTarget) => (__copyProps8(target, mod, "default"), secondTarget && __copyProps8(secondTarget, mod, "default"));
var __toESM8 = (mod, isNodeMode, target) => (target = mod != null ? __create8(__getProtoOf8(mod)) : {}, __copyProps8(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp9(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps8(__defProp9({}, "__esModule", { value: true }), mod);
var require_stream_browser = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports10, module) {
    module.exports = __require4("events").EventEmitter;
  }
});
var util_exports = {};
__export9(util_exports, {
  default: () => util_default
});
var util_default;
var init_util = __esm({
  "browser-exclude:util"() {
    util_default = {};
  }
});
var require_buffer_list = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports10, module) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i18 = 1; i18 < arguments.length; i18++) {
        var source = null != arguments[i18] ? arguments[i18] : {};
        i18 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i18 = 0; i18 < props.length; i18++) {
        var descriptor = props[i18];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = __require4("buffer");
    var Buffer23 = _require.Buffer;
    var _require2 = (init_util(), __toCommonJS(util_exports));
    var inspect3 = _require2.inspect;
    var custom = inspect3 && inspect3.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer23.prototype.copy.call(src, target, offset);
    }
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v23) {
          var entry = {
            data: v23,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v23) {
          var entry = {
            data: v23,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join22(s26) {
          if (this.length === 0)
            return "";
          var p33 = this.head;
          var ret = "" + p33.data;
          while (p33 = p33.next)
            ret += s26 + p33.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n210) {
          if (this.length === 0)
            return Buffer23.alloc(0);
          var ret = Buffer23.allocUnsafe(n210 >>> 0);
          var p33 = this.head;
          var i18 = 0;
          while (p33) {
            copyBuffer(p33.data, ret, i18);
            i18 += p33.data.length;
            p33 = p33.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n210, hasStrings) {
          var ret;
          if (n210 < this.head.data.length) {
            ret = this.head.data.slice(0, n210);
            this.head.data = this.head.data.slice(n210);
          } else if (n210 === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n210) : this._getBuffer(n210);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n210) {
          var p33 = this.head;
          var c23 = 1;
          var ret = p33.data;
          n210 -= ret.length;
          while (p33 = p33.next) {
            var str = p33.data;
            var nb = n210 > str.length ? str.length : n210;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n210);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === str.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = str.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n210) {
          var ret = Buffer23.allocUnsafe(n210);
          var p33 = this.head;
          var c23 = 1;
          p33.data.copy(ret);
          n210 -= p33.data.length;
          while (p33 = p33.next) {
            var buf = p33.data;
            var nb = n210 > buf.length ? buf.length : n210;
            buf.copy(ret, ret.length - n210, 0, nb);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === buf.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = buf.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_210, options) {
          return inspect3(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});
var require_destroy = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports10, module) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            a22.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            a22.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          a22.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          a22.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});
var require_errors_browser = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/errors-browser.js"(exports10, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message2, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message2 === "string") {
          return message2;
        } else {
          return message2(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf2(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i18) {
          return String(i18);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_state = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/state.js"(exports10, module) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module.exports = {
      getHighWaterMark
    };
  }
});
var require_stream_writable = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_writable.js"(exports10, module) {
    "use strict";
    module.exports = Writable22;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex22;
    Writable22.WritableState = WritableState;
    var internalUtil = {
      deprecate: __require4("util-deprecate")
    };
    var Stream22 = require_stream_browser();
    var Buffer23 = __require4("buffer").Buffer;
    var OurUint8Array = (typeof __global$22 !== "undefined" ? __global$22 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    __require4("inherits")(Writable22, Stream22);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_210) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable22, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable22)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex();
      var isDuplex = this instanceof Duplex22;
      if (!isDuplex && !realHasInstance.call(Writable22, this))
        return new Writable22(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream22.call(this);
    }
    Writable22.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      a22.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        a22.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable22.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array2(chunk);
      if (isBuf && !Buffer23.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer2(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable22.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable22.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable22.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer23.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        a22.nextTick(cb, er);
        a22.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished22 = needFinish(state) || stream.destroyed;
        if (!finished22 && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          a22.nextTick(afterWrite, stream, state, finished22, cb);
        } else {
          afterWrite(stream, state, finished22, cb);
        }
      }
    }
    function afterWrite(stream, state, finished22, cb) {
      if (!finished22)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l23 = state.bufferedRequestCount;
        var buffer = new Array(l23);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable22.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable22.prototype._writev = null;
    Writable22.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          a22.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          a22.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable22.prototype.destroy = destroyImpl.destroy;
    Writable22.prototype._undestroy = destroyImpl.undestroy;
    Writable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});
var require_stream_duplex = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_duplex.js"(exports10, module) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      return keys2;
    };
    module.exports = Duplex22;
    var Readable22 = require_stream_readable();
    var Writable22 = require_stream_writable();
    __require4("inherits")(Duplex22, Readable22);
    {
      keys = objectKeys(Writable22.prototype);
      for (v23 = 0; v23 < keys.length; v23++) {
        method = keys[v23];
        if (!Duplex22.prototype[method])
          Duplex22.prototype[method] = Writable22.prototype[method];
      }
    }
    var keys;
    var method;
    var v23;
    function Duplex22(options) {
      if (!(this instanceof Duplex22))
        return new Duplex22(options);
      Readable22.call(this, options);
      Writable22.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      a22.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});
var require_end_of_stream = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports10, module) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once4(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});
var require_async_iterator = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports10, module) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished22 = require_end_of_stream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve3 = iter[kLastResolve];
      if (resolve3 !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve3(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      a22.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve3, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve3(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve3, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve3, reject) {
            a22.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve3(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve3, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve3(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve3, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve3(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve3;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished22(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve3 = iterator[kLastResolve];
        if (resolve3 !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve3(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module.exports = createReadableStreamAsyncIterator;
  }
});
var require_from_browser = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports10, module) {
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});
var require_stream_readable = __commonJS8({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_readable.js"(exports10, module) {
    "use strict";
    module.exports = Readable22;
    var Duplex22;
    Readable22.ReadableState = ReadableState;
    var EE = __require4("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream22 = require_stream_browser();
    var Buffer23 = __require4("buffer").Buffer;
    var OurUint8Array = (typeof __global$22 !== "undefined" ? __global$22 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = (init_util(), __toCommonJS(util_exports));
    var debug2;
    if (debugUtil && debugUtil.debuglog) {
      debug2 = debugUtil.debuglog("stream");
    } else {
      debug2 = function debug22() {
      };
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder2;
    var createReadableStreamAsyncIterator;
    var from;
    __require4("inherits")(Readable22, Stream22);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener2(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder2)
          StringDecoder2 = __require4("string_decoder").StringDecoder;
        this.decoder = new StringDecoder2(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex();
      if (!(this instanceof Readable22))
        return new Readable22(options);
      var isDuplex = this instanceof Duplex22;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream22.call(this);
    }
    Object.defineProperty(Readable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable22.prototype.destroy = destroyImpl.destroy;
    Readable22.prototype._undestroy = destroyImpl.undestroy;
    Readable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable22.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer23.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable22.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug2("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer23.prototype) {
            chunk = _uint8ArrayToBuffer2(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array2(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable22.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable22.prototype.setEncoding = function(enc) {
      if (!StringDecoder2)
        StringDecoder2 = __require4("string_decoder").StringDecoder;
      var decoder = new StringDecoder2(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p33 = this._readableState.buffer.head;
      var content = "";
      while (p33 !== null) {
        content += decoder.write(p33.data);
        p33 = p33.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n210) {
      if (n210 >= MAX_HWM) {
        n210 = MAX_HWM;
      } else {
        n210--;
        n210 |= n210 >>> 1;
        n210 |= n210 >>> 2;
        n210 |= n210 >>> 4;
        n210 |= n210 >>> 8;
        n210 |= n210 >>> 16;
        n210++;
      }
      return n210;
    }
    function howMuchToRead(n210, state) {
      if (n210 <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n210 !== n210) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n210 > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n210);
      if (n210 <= state.length)
        return n210;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable22.prototype.read = function(n210) {
      debug2("read", n210);
      n210 = parseInt(n210, 10);
      var state = this._readableState;
      var nOrig = n210;
      if (n210 !== 0)
        state.emittedReadable = false;
      if (n210 === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n210 = howMuchToRead(n210, state);
      if (n210 === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n210 < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug2("reading or ended", doRead);
      } else if (doRead) {
        debug2("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n210 = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n210 > 0)
        ret = fromList(n210, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n210 = 0;
      } else {
        state.length -= n210;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n210 && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        a22.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        a22.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable22.prototype._read = function(n210) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable22.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== a22.stdout && dest !== a22.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        a22.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        var ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug2("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug2("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable22.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i18 = 0; i18 < len; i18++)
          dests[i18].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable22.prototype.on = function(ev, fn) {
      var res = Stream22.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            a22.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable22.prototype.addListener = Readable22.prototype.on;
    Readable22.prototype.removeListener = function(ev, fn) {
      var res = Stream22.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable22.prototype.removeAllListeners = function(ev) {
      var res = Stream22.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable22.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        a22.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable22.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null)
        ;
    }
    Readable22.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug2("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug2("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i18 in stream) {
        if (this[i18] === void 0 && typeof stream[i18] === "function") {
          this[i18] = /* @__PURE__ */ function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i18);
        }
      }
      for (var n210 = 0; n210 < kProxyEvents.length; n210++) {
        stream.on(kProxyEvents[n210], this.emit.bind(this, kProxyEvents[n210]));
      }
      this._read = function(n223) {
        debug2("wrapped _read", n223);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable22.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable22.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable22._fromList = fromList;
    Object.defineProperty(Readable22.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n210, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n210 || n210 >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n210, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        a22.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable22.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser();
        }
        return from(Readable22, iterable, opts);
      };
    }
    function indexOf(xs, x33) {
      for (var i18 = 0, l23 = xs.length; i18 < l23; i18++) {
        if (xs[i18] === x33)
          return i18;
      }
      return -1;
    }
  }
});
var build_exports8 = {};
__export9(build_exports8, {
  _fromList: () => _fromList,
  default: () => build_default8
});
var __module8 = __toESM8(require_stream_readable());
__reExport8(build_exports8, __toESM8(require_stream_readable()));
var { _fromList } = __module8;
var { default: __default8, ...__rest8 } = __module8;
var build_default8 = __default8 !== void 0 ? __default8 : __rest8;
var stream_writable_development_exports = {};
__export5(stream_writable_development_exports, {
  default: () => build_default9
});
var __global$32 = globalThis || (typeof window !== "undefined" ? window : self);
var require6 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "util-deprecate":
      return e3(util_deprecate_development_exports);
    case "buffer":
      return e3(buffer_development_exports);
    case "inherits":
      return e3(inherits_development_exports);
    case "events":
      return e3(node_events_exports);
    case "string_decoder":
      return e3(string_decoder_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create9 = Object.create;
var __defProp10 = Object.defineProperty;
var __getOwnPropDesc9 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames9 = Object.getOwnPropertyNames;
var __getProtoOf9 = Object.getPrototypeOf;
var __hasOwnProp9 = Object.prototype.hasOwnProperty;
var __require5 = /* @__PURE__ */ ((x33) => typeof require6 !== "undefined" ? require6 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require6 !== "undefined" ? require6 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require6 !== "undefined")
    return require6.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __esm2 = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames9(fn)[0]])(fn = 0)), res;
};
var __commonJS9 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames9(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export10 = (target, all) => {
  for (var name in all)
    __defProp10(target, name, { get: all[name], enumerable: true });
};
var __copyProps9 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames9(from))
      if (!__hasOwnProp9.call(to, key) && key !== except)
        __defProp10(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc9(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport9 = (target, mod, secondTarget) => (__copyProps9(target, mod, "default"), secondTarget && __copyProps9(secondTarget, mod, "default"));
var __toESM9 = (mod, isNodeMode, target) => (target = mod != null ? __create9(__getProtoOf9(mod)) : {}, __copyProps9(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp10(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS2 = (mod) => __copyProps9(__defProp10({}, "__esModule", { value: true }), mod);
var require_stream_browser2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports10, module) {
    module.exports = __require5("events").EventEmitter;
  }
});
var require_destroy2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports10, module) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            a22.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            a22.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          a22.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          a22.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});
var require_errors_browser2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/errors-browser.js"(exports10, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message2, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message2 === "string") {
          return message2;
        } else {
          return message2(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf2(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i18) {
          return String(i18);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_state2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/state.js"(exports10, module) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors_browser2().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module.exports = {
      getHighWaterMark
    };
  }
});
var util_exports2 = {};
__export10(util_exports2, {
  default: () => util_default2
});
var util_default2;
var init_util2 = __esm2({
  "browser-exclude:util"() {
    util_default2 = {};
  }
});
var require_buffer_list2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports10, module) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i18 = 1; i18 < arguments.length; i18++) {
        var source = null != arguments[i18] ? arguments[i18] : {};
        i18 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i18 = 0; i18 < props.length; i18++) {
        var descriptor = props[i18];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = __require5("buffer");
    var Buffer23 = _require.Buffer;
    var _require2 = (init_util2(), __toCommonJS2(util_exports2));
    var inspect3 = _require2.inspect;
    var custom = inspect3 && inspect3.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer23.prototype.copy.call(src, target, offset);
    }
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v23) {
          var entry = {
            data: v23,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v23) {
          var entry = {
            data: v23,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join22(s26) {
          if (this.length === 0)
            return "";
          var p33 = this.head;
          var ret = "" + p33.data;
          while (p33 = p33.next)
            ret += s26 + p33.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n210) {
          if (this.length === 0)
            return Buffer23.alloc(0);
          var ret = Buffer23.allocUnsafe(n210 >>> 0);
          var p33 = this.head;
          var i18 = 0;
          while (p33) {
            copyBuffer(p33.data, ret, i18);
            i18 += p33.data.length;
            p33 = p33.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n210, hasStrings) {
          var ret;
          if (n210 < this.head.data.length) {
            ret = this.head.data.slice(0, n210);
            this.head.data = this.head.data.slice(n210);
          } else if (n210 === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n210) : this._getBuffer(n210);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n210) {
          var p33 = this.head;
          var c23 = 1;
          var ret = p33.data;
          n210 -= ret.length;
          while (p33 = p33.next) {
            var str = p33.data;
            var nb = n210 > str.length ? str.length : n210;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n210);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === str.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = str.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n210) {
          var ret = Buffer23.allocUnsafe(n210);
          var p33 = this.head;
          var c23 = 1;
          p33.data.copy(ret);
          n210 -= p33.data.length;
          while (p33 = p33.next) {
            var buf = p33.data;
            var nb = n210 > buf.length ? buf.length : n210;
            buf.copy(ret, ret.length - n210, 0, nb);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === buf.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = buf.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_210, options) {
          return inspect3(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});
var require_end_of_stream2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports10, module) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser2().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once4(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});
var require_async_iterator2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports10, module) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished22 = require_end_of_stream2();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve3 = iter[kLastResolve];
      if (resolve3 !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve3(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      a22.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve3, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve3(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve3, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve3, reject) {
            a22.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve3(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve3, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve3(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve3, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve3(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve3;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished22(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve3 = iterator[kLastResolve];
        if (resolve3 !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve3(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module.exports = createReadableStreamAsyncIterator;
  }
});
var require_from_browser2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports10, module) {
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});
var require_stream_readable2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_readable.js"(exports10, module) {
    "use strict";
    module.exports = Readable22;
    var Duplex22;
    Readable22.ReadableState = ReadableState;
    var EE = __require5("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream22 = require_stream_browser2();
    var Buffer23 = __require5("buffer").Buffer;
    var OurUint8Array = (typeof __global$32 !== "undefined" ? __global$32 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = (init_util2(), __toCommonJS2(util_exports2));
    var debug2;
    if (debugUtil && debugUtil.debuglog) {
      debug2 = debugUtil.debuglog("stream");
    } else {
      debug2 = function debug22() {
      };
    }
    var BufferList = require_buffer_list2();
    var destroyImpl = require_destroy2();
    var _require = require_state2();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser2().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder2;
    var createReadableStreamAsyncIterator;
    var from;
    __require5("inherits")(Readable22, Stream22);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener2(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex2();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder2)
          StringDecoder2 = __require5("string_decoder").StringDecoder;
        this.decoder = new StringDecoder2(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex2();
      if (!(this instanceof Readable22))
        return new Readable22(options);
      var isDuplex = this instanceof Duplex22;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream22.call(this);
    }
    Object.defineProperty(Readable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable22.prototype.destroy = destroyImpl.destroy;
    Readable22.prototype._undestroy = destroyImpl.undestroy;
    Readable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable22.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer23.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable22.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug2("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer23.prototype) {
            chunk = _uint8ArrayToBuffer2(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array2(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable22.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable22.prototype.setEncoding = function(enc) {
      if (!StringDecoder2)
        StringDecoder2 = __require5("string_decoder").StringDecoder;
      var decoder = new StringDecoder2(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p33 = this._readableState.buffer.head;
      var content = "";
      while (p33 !== null) {
        content += decoder.write(p33.data);
        p33 = p33.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n210) {
      if (n210 >= MAX_HWM) {
        n210 = MAX_HWM;
      } else {
        n210--;
        n210 |= n210 >>> 1;
        n210 |= n210 >>> 2;
        n210 |= n210 >>> 4;
        n210 |= n210 >>> 8;
        n210 |= n210 >>> 16;
        n210++;
      }
      return n210;
    }
    function howMuchToRead(n210, state) {
      if (n210 <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n210 !== n210) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n210 > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n210);
      if (n210 <= state.length)
        return n210;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable22.prototype.read = function(n210) {
      debug2("read", n210);
      n210 = parseInt(n210, 10);
      var state = this._readableState;
      var nOrig = n210;
      if (n210 !== 0)
        state.emittedReadable = false;
      if (n210 === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n210 = howMuchToRead(n210, state);
      if (n210 === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n210 < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug2("reading or ended", doRead);
      } else if (doRead) {
        debug2("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n210 = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n210 > 0)
        ret = fromList(n210, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n210 = 0;
      } else {
        state.length -= n210;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n210 && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        a22.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        a22.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable22.prototype._read = function(n210) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable22.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== a22.stdout && dest !== a22.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        a22.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        var ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug2("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug2("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable22.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i18 = 0; i18 < len; i18++)
          dests[i18].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable22.prototype.on = function(ev, fn) {
      var res = Stream22.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            a22.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable22.prototype.addListener = Readable22.prototype.on;
    Readable22.prototype.removeListener = function(ev, fn) {
      var res = Stream22.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable22.prototype.removeAllListeners = function(ev) {
      var res = Stream22.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable22.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        a22.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable22.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null)
        ;
    }
    Readable22.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug2("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug2("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i18 in stream) {
        if (this[i18] === void 0 && typeof stream[i18] === "function") {
          this[i18] = /* @__PURE__ */ function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i18);
        }
      }
      for (var n210 = 0; n210 < kProxyEvents.length; n210++) {
        stream.on(kProxyEvents[n210], this.emit.bind(this, kProxyEvents[n210]));
      }
      this._read = function(n223) {
        debug2("wrapped _read", n223);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable22.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator2();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable22.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable22._fromList = fromList;
    Object.defineProperty(Readable22.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n210, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n210 || n210 >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n210, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        a22.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable22.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser2();
        }
        return from(Readable22, iterable, opts);
      };
    }
    function indexOf(xs, x33) {
      for (var i18 = 0, l23 = xs.length; i18 < l23; i18++) {
        if (xs[i18] === x33)
          return i18;
      }
      return -1;
    }
  }
});
var require_stream_duplex2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_duplex.js"(exports10, module) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      return keys2;
    };
    module.exports = Duplex22;
    var Readable22 = require_stream_readable2();
    var Writable22 = require_stream_writable2();
    __require5("inherits")(Duplex22, Readable22);
    {
      keys = objectKeys(Writable22.prototype);
      for (v23 = 0; v23 < keys.length; v23++) {
        method = keys[v23];
        if (!Duplex22.prototype[method])
          Duplex22.prototype[method] = Writable22.prototype[method];
      }
    }
    var keys;
    var method;
    var v23;
    function Duplex22(options) {
      if (!(this instanceof Duplex22))
        return new Duplex22(options);
      Readable22.call(this, options);
      Writable22.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      a22.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});
var require_stream_writable2 = __commonJS9({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_writable.js"(exports10, module) {
    "use strict";
    module.exports = Writable22;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex22;
    Writable22.WritableState = WritableState;
    var internalUtil = {
      deprecate: __require5("util-deprecate")
    };
    var Stream22 = require_stream_browser2();
    var Buffer23 = __require5("buffer").Buffer;
    var OurUint8Array = (typeof __global$32 !== "undefined" ? __global$32 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy2();
    var _require = require_state2();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser2().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    __require5("inherits")(Writable22, Stream22);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex2();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_210) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable22, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable22)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex2();
      var isDuplex = this instanceof Duplex22;
      if (!isDuplex && !realHasInstance.call(Writable22, this))
        return new Writable22(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream22.call(this);
    }
    Writable22.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      a22.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        a22.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable22.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array2(chunk);
      if (isBuf && !Buffer23.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer2(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable22.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable22.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable22.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer23.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        a22.nextTick(cb, er);
        a22.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished22 = needFinish(state) || stream.destroyed;
        if (!finished22 && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          a22.nextTick(afterWrite, stream, state, finished22, cb);
        } else {
          afterWrite(stream, state, finished22, cb);
        }
      }
    }
    function afterWrite(stream, state, finished22, cb) {
      if (!finished22)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l23 = state.bufferedRequestCount;
        var buffer = new Array(l23);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable22.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable22.prototype._writev = null;
    Writable22.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          a22.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          a22.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable22.prototype.destroy = destroyImpl.destroy;
    Writable22.prototype._undestroy = destroyImpl.undestroy;
    Writable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});
var build_exports9 = {};
__export10(build_exports9, {
  default: () => build_default9
});
var __module9 = __toESM9(require_stream_writable2());
__reExport9(build_exports9, __toESM9(require_stream_writable2()));
var { default: __default9, ...__rest9 } = __module9;
var build_default9 = __default9 !== void 0 ? __default9 : __rest9;
var stream_duplex_development_exports = {};
__export5(stream_duplex_development_exports, {
  default: () => build_default10
});
var __global$4 = globalThis || (typeof window !== "undefined" ? window : self);
var require7 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "inherits":
      return e3(inherits_development_exports);
    case "util-deprecate":
      return e3(util_deprecate_development_exports);
    case "buffer":
      return e3(buffer_development_exports);
    case "events":
      return e3(node_events_exports);
    case "string_decoder":
      return e3(string_decoder_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create10 = Object.create;
var __defProp11 = Object.defineProperty;
var __getOwnPropDesc10 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames10 = Object.getOwnPropertyNames;
var __getProtoOf10 = Object.getPrototypeOf;
var __hasOwnProp10 = Object.prototype.hasOwnProperty;
var __require6 = /* @__PURE__ */ ((x33) => typeof require7 !== "undefined" ? require7 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require7 !== "undefined" ? require7 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require7 !== "undefined")
    return require7.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __esm3 = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames10(fn)[0]])(fn = 0)), res;
};
var __commonJS10 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames10(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export11 = (target, all) => {
  for (var name in all)
    __defProp11(target, name, { get: all[name], enumerable: true });
};
var __copyProps10 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames10(from))
      if (!__hasOwnProp10.call(to, key) && key !== except)
        __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc10(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport10 = (target, mod, secondTarget) => (__copyProps10(target, mod, "default"), secondTarget && __copyProps10(secondTarget, mod, "default"));
var __toESM10 = (mod, isNodeMode, target) => (target = mod != null ? __create10(__getProtoOf10(mod)) : {}, __copyProps10(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp11(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS3 = (mod) => __copyProps10(__defProp11({}, "__esModule", { value: true }), mod);
var require_stream_browser3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports10, module) {
    module.exports = __require6("events").EventEmitter;
  }
});
var util_exports3 = {};
__export11(util_exports3, {
  default: () => util_default3
});
var util_default3;
var init_util3 = __esm3({
  "browser-exclude:util"() {
    util_default3 = {};
  }
});
var require_buffer_list3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports10, module) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i18 = 1; i18 < arguments.length; i18++) {
        var source = null != arguments[i18] ? arguments[i18] : {};
        i18 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i18 = 0; i18 < props.length; i18++) {
        var descriptor = props[i18];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = __require6("buffer");
    var Buffer23 = _require.Buffer;
    var _require2 = (init_util3(), __toCommonJS3(util_exports3));
    var inspect3 = _require2.inspect;
    var custom = inspect3 && inspect3.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer23.prototype.copy.call(src, target, offset);
    }
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v23) {
          var entry = {
            data: v23,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v23) {
          var entry = {
            data: v23,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join22(s26) {
          if (this.length === 0)
            return "";
          var p33 = this.head;
          var ret = "" + p33.data;
          while (p33 = p33.next)
            ret += s26 + p33.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n210) {
          if (this.length === 0)
            return Buffer23.alloc(0);
          var ret = Buffer23.allocUnsafe(n210 >>> 0);
          var p33 = this.head;
          var i18 = 0;
          while (p33) {
            copyBuffer(p33.data, ret, i18);
            i18 += p33.data.length;
            p33 = p33.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n210, hasStrings) {
          var ret;
          if (n210 < this.head.data.length) {
            ret = this.head.data.slice(0, n210);
            this.head.data = this.head.data.slice(n210);
          } else if (n210 === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n210) : this._getBuffer(n210);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n210) {
          var p33 = this.head;
          var c23 = 1;
          var ret = p33.data;
          n210 -= ret.length;
          while (p33 = p33.next) {
            var str = p33.data;
            var nb = n210 > str.length ? str.length : n210;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n210);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === str.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = str.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n210) {
          var ret = Buffer23.allocUnsafe(n210);
          var p33 = this.head;
          var c23 = 1;
          p33.data.copy(ret);
          n210 -= p33.data.length;
          while (p33 = p33.next) {
            var buf = p33.data;
            var nb = n210 > buf.length ? buf.length : n210;
            buf.copy(ret, ret.length - n210, 0, nb);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === buf.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = buf.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_210, options) {
          return inspect3(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});
var require_destroy3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports10, module) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            a22.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            a22.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          a22.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          a22.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});
var require_errors_browser3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/errors-browser.js"(exports10, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message2, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message2 === "string") {
          return message2;
        } else {
          return message2(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf2(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i18) {
          return String(i18);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_state3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/state.js"(exports10, module) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors_browser3().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module.exports = {
      getHighWaterMark
    };
  }
});
var require_end_of_stream3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports10, module) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser3().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once4(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});
var require_async_iterator3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports10, module) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished22 = require_end_of_stream3();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve3 = iter[kLastResolve];
      if (resolve3 !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve3(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      a22.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve3, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve3(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve3, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve3, reject) {
            a22.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve3(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve3, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve3(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve3, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve3(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve3;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished22(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve3 = iterator[kLastResolve];
        if (resolve3 !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve3(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module.exports = createReadableStreamAsyncIterator;
  }
});
var require_from_browser3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports10, module) {
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});
var require_stream_readable3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_readable.js"(exports10, module) {
    "use strict";
    module.exports = Readable22;
    var Duplex22;
    Readable22.ReadableState = ReadableState;
    var EE = __require6("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream22 = require_stream_browser3();
    var Buffer23 = __require6("buffer").Buffer;
    var OurUint8Array = (typeof __global$4 !== "undefined" ? __global$4 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = (init_util3(), __toCommonJS3(util_exports3));
    var debug2;
    if (debugUtil && debugUtil.debuglog) {
      debug2 = debugUtil.debuglog("stream");
    } else {
      debug2 = function debug22() {
      };
    }
    var BufferList = require_buffer_list3();
    var destroyImpl = require_destroy3();
    var _require = require_state3();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser3().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder2;
    var createReadableStreamAsyncIterator;
    var from;
    __require6("inherits")(Readable22, Stream22);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener2(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex3();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder2)
          StringDecoder2 = __require6("string_decoder").StringDecoder;
        this.decoder = new StringDecoder2(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex3();
      if (!(this instanceof Readable22))
        return new Readable22(options);
      var isDuplex = this instanceof Duplex22;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream22.call(this);
    }
    Object.defineProperty(Readable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable22.prototype.destroy = destroyImpl.destroy;
    Readable22.prototype._undestroy = destroyImpl.undestroy;
    Readable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable22.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer23.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable22.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug2("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer23.prototype) {
            chunk = _uint8ArrayToBuffer2(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array2(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable22.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable22.prototype.setEncoding = function(enc) {
      if (!StringDecoder2)
        StringDecoder2 = __require6("string_decoder").StringDecoder;
      var decoder = new StringDecoder2(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p33 = this._readableState.buffer.head;
      var content = "";
      while (p33 !== null) {
        content += decoder.write(p33.data);
        p33 = p33.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n210) {
      if (n210 >= MAX_HWM) {
        n210 = MAX_HWM;
      } else {
        n210--;
        n210 |= n210 >>> 1;
        n210 |= n210 >>> 2;
        n210 |= n210 >>> 4;
        n210 |= n210 >>> 8;
        n210 |= n210 >>> 16;
        n210++;
      }
      return n210;
    }
    function howMuchToRead(n210, state) {
      if (n210 <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n210 !== n210) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n210 > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n210);
      if (n210 <= state.length)
        return n210;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable22.prototype.read = function(n210) {
      debug2("read", n210);
      n210 = parseInt(n210, 10);
      var state = this._readableState;
      var nOrig = n210;
      if (n210 !== 0)
        state.emittedReadable = false;
      if (n210 === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n210 = howMuchToRead(n210, state);
      if (n210 === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n210 < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug2("reading or ended", doRead);
      } else if (doRead) {
        debug2("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n210 = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n210 > 0)
        ret = fromList(n210, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n210 = 0;
      } else {
        state.length -= n210;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n210 && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        a22.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        a22.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable22.prototype._read = function(n210) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable22.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== a22.stdout && dest !== a22.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        a22.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        var ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug2("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug2("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable22.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i18 = 0; i18 < len; i18++)
          dests[i18].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable22.prototype.on = function(ev, fn) {
      var res = Stream22.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            a22.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable22.prototype.addListener = Readable22.prototype.on;
    Readable22.prototype.removeListener = function(ev, fn) {
      var res = Stream22.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable22.prototype.removeAllListeners = function(ev) {
      var res = Stream22.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable22.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        a22.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable22.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null)
        ;
    }
    Readable22.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug2("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug2("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i18 in stream) {
        if (this[i18] === void 0 && typeof stream[i18] === "function") {
          this[i18] = /* @__PURE__ */ function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i18);
        }
      }
      for (var n210 = 0; n210 < kProxyEvents.length; n210++) {
        stream.on(kProxyEvents[n210], this.emit.bind(this, kProxyEvents[n210]));
      }
      this._read = function(n223) {
        debug2("wrapped _read", n223);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable22.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator3();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable22.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable22._fromList = fromList;
    Object.defineProperty(Readable22.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n210, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n210 || n210 >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n210, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        a22.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable22.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser3();
        }
        return from(Readable22, iterable, opts);
      };
    }
    function indexOf(xs, x33) {
      for (var i18 = 0, l23 = xs.length; i18 < l23; i18++) {
        if (xs[i18] === x33)
          return i18;
      }
      return -1;
    }
  }
});
var require_stream_writable3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_writable.js"(exports10, module) {
    "use strict";
    module.exports = Writable22;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex22;
    Writable22.WritableState = WritableState;
    var internalUtil = {
      deprecate: __require6("util-deprecate")
    };
    var Stream22 = require_stream_browser3();
    var Buffer23 = __require6("buffer").Buffer;
    var OurUint8Array = (typeof __global$4 !== "undefined" ? __global$4 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy3();
    var _require = require_state3();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser3().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    __require6("inherits")(Writable22, Stream22);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex3();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_210) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable22, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable22)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex3();
      var isDuplex = this instanceof Duplex22;
      if (!isDuplex && !realHasInstance.call(Writable22, this))
        return new Writable22(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream22.call(this);
    }
    Writable22.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      a22.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        a22.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable22.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array2(chunk);
      if (isBuf && !Buffer23.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer2(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable22.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable22.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable22.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer23.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        a22.nextTick(cb, er);
        a22.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished22 = needFinish(state) || stream.destroyed;
        if (!finished22 && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          a22.nextTick(afterWrite, stream, state, finished22, cb);
        } else {
          afterWrite(stream, state, finished22, cb);
        }
      }
    }
    function afterWrite(stream, state, finished22, cb) {
      if (!finished22)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l23 = state.bufferedRequestCount;
        var buffer = new Array(l23);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable22.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable22.prototype._writev = null;
    Writable22.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          a22.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          a22.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable22.prototype.destroy = destroyImpl.destroy;
    Writable22.prototype._undestroy = destroyImpl.undestroy;
    Writable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});
var require_stream_duplex3 = __commonJS10({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_duplex.js"(exports10, module) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      return keys2;
    };
    module.exports = Duplex22;
    var Readable22 = require_stream_readable3();
    var Writable22 = require_stream_writable3();
    __require6("inherits")(Duplex22, Readable22);
    {
      keys = objectKeys(Writable22.prototype);
      for (v23 = 0; v23 < keys.length; v23++) {
        method = keys[v23];
        if (!Duplex22.prototype[method])
          Duplex22.prototype[method] = Writable22.prototype[method];
      }
    }
    var keys;
    var method;
    var v23;
    function Duplex22(options) {
      if (!(this instanceof Duplex22))
        return new Duplex22(options);
      Readable22.call(this, options);
      Writable22.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      a22.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});
var build_exports10 = {};
__export11(build_exports10, {
  default: () => build_default10
});
var __module10 = __toESM10(require_stream_duplex3());
__reExport10(build_exports10, __toESM10(require_stream_duplex3()));
var { default: __default10, ...__rest10 } = __module10;
var build_default10 = __default10 !== void 0 ? __default10 : __rest10;
var stream_transform_development_exports = {};
__export5(stream_transform_development_exports, {
  default: () => build_default11
});
var __global$5 = globalThis || (typeof window !== "undefined" ? window : self);
var require8 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "inherits":
      return e3(inherits_development_exports);
    case "util-deprecate":
      return e3(util_deprecate_development_exports);
    case "buffer":
      return e3(buffer_development_exports);
    case "events":
      return e3(node_events_exports);
    case "string_decoder":
      return e3(string_decoder_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create11 = Object.create;
var __defProp12 = Object.defineProperty;
var __getOwnPropDesc11 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames11 = Object.getOwnPropertyNames;
var __getProtoOf11 = Object.getPrototypeOf;
var __hasOwnProp11 = Object.prototype.hasOwnProperty;
var __require7 = /* @__PURE__ */ ((x33) => typeof require8 !== "undefined" ? require8 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require8 !== "undefined" ? require8 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require8 !== "undefined")
    return require8.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __esm4 = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames11(fn)[0]])(fn = 0)), res;
};
var __commonJS11 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames11(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export12 = (target, all) => {
  for (var name in all)
    __defProp12(target, name, { get: all[name], enumerable: true });
};
var __copyProps11 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames11(from))
      if (!__hasOwnProp11.call(to, key) && key !== except)
        __defProp12(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc11(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport11 = (target, mod, secondTarget) => (__copyProps11(target, mod, "default"), secondTarget && __copyProps11(secondTarget, mod, "default"));
var __toESM11 = (mod, isNodeMode, target) => (target = mod != null ? __create11(__getProtoOf11(mod)) : {}, __copyProps11(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp12(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS4 = (mod) => __copyProps11(__defProp12({}, "__esModule", { value: true }), mod);
var require_errors_browser4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/errors-browser.js"(exports10, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message2, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message2 === "string") {
          return message2;
        } else {
          return message2(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf2(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i18) {
          return String(i18);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_stream_browser4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports10, module) {
    module.exports = __require7("events").EventEmitter;
  }
});
var util_exports4 = {};
__export12(util_exports4, {
  default: () => util_default4
});
var util_default4;
var init_util4 = __esm4({
  "browser-exclude:util"() {
    util_default4 = {};
  }
});
var require_buffer_list4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports10, module) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i18 = 1; i18 < arguments.length; i18++) {
        var source = null != arguments[i18] ? arguments[i18] : {};
        i18 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i18 = 0; i18 < props.length; i18++) {
        var descriptor = props[i18];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = __require7("buffer");
    var Buffer23 = _require.Buffer;
    var _require2 = (init_util4(), __toCommonJS4(util_exports4));
    var inspect3 = _require2.inspect;
    var custom = inspect3 && inspect3.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer23.prototype.copy.call(src, target, offset);
    }
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v23) {
          var entry = {
            data: v23,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v23) {
          var entry = {
            data: v23,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join22(s26) {
          if (this.length === 0)
            return "";
          var p33 = this.head;
          var ret = "" + p33.data;
          while (p33 = p33.next)
            ret += s26 + p33.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n210) {
          if (this.length === 0)
            return Buffer23.alloc(0);
          var ret = Buffer23.allocUnsafe(n210 >>> 0);
          var p33 = this.head;
          var i18 = 0;
          while (p33) {
            copyBuffer(p33.data, ret, i18);
            i18 += p33.data.length;
            p33 = p33.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n210, hasStrings) {
          var ret;
          if (n210 < this.head.data.length) {
            ret = this.head.data.slice(0, n210);
            this.head.data = this.head.data.slice(n210);
          } else if (n210 === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n210) : this._getBuffer(n210);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n210) {
          var p33 = this.head;
          var c23 = 1;
          var ret = p33.data;
          n210 -= ret.length;
          while (p33 = p33.next) {
            var str = p33.data;
            var nb = n210 > str.length ? str.length : n210;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n210);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === str.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = str.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n210) {
          var ret = Buffer23.allocUnsafe(n210);
          var p33 = this.head;
          var c23 = 1;
          p33.data.copy(ret);
          n210 -= p33.data.length;
          while (p33 = p33.next) {
            var buf = p33.data;
            var nb = n210 > buf.length ? buf.length : n210;
            buf.copy(ret, ret.length - n210, 0, nb);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === buf.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = buf.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_210, options) {
          return inspect3(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});
var require_destroy4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports10, module) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            a22.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            a22.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          a22.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          a22.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});
var require_state4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/state.js"(exports10, module) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors_browser4().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module.exports = {
      getHighWaterMark
    };
  }
});
var require_end_of_stream4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports10, module) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser4().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once4(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});
var require_async_iterator4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports10, module) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished22 = require_end_of_stream4();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve3 = iter[kLastResolve];
      if (resolve3 !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve3(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      a22.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve3, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve3(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve3, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve3, reject) {
            a22.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve3(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve3, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve3(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve3, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve3(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve3;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished22(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve3 = iterator[kLastResolve];
        if (resolve3 !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve3(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module.exports = createReadableStreamAsyncIterator;
  }
});
var require_from_browser4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports10, module) {
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});
var require_stream_readable4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_readable.js"(exports10, module) {
    "use strict";
    module.exports = Readable22;
    var Duplex22;
    Readable22.ReadableState = ReadableState;
    var EE = __require7("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream22 = require_stream_browser4();
    var Buffer23 = __require7("buffer").Buffer;
    var OurUint8Array = (typeof __global$5 !== "undefined" ? __global$5 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = (init_util4(), __toCommonJS4(util_exports4));
    var debug2;
    if (debugUtil && debugUtil.debuglog) {
      debug2 = debugUtil.debuglog("stream");
    } else {
      debug2 = function debug22() {
      };
    }
    var BufferList = require_buffer_list4();
    var destroyImpl = require_destroy4();
    var _require = require_state4();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser4().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder2;
    var createReadableStreamAsyncIterator;
    var from;
    __require7("inherits")(Readable22, Stream22);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener2(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex4();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder2)
          StringDecoder2 = __require7("string_decoder").StringDecoder;
        this.decoder = new StringDecoder2(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex4();
      if (!(this instanceof Readable22))
        return new Readable22(options);
      var isDuplex = this instanceof Duplex22;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream22.call(this);
    }
    Object.defineProperty(Readable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable22.prototype.destroy = destroyImpl.destroy;
    Readable22.prototype._undestroy = destroyImpl.undestroy;
    Readable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable22.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer23.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable22.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug2("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer23.prototype) {
            chunk = _uint8ArrayToBuffer2(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array2(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable22.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable22.prototype.setEncoding = function(enc) {
      if (!StringDecoder2)
        StringDecoder2 = __require7("string_decoder").StringDecoder;
      var decoder = new StringDecoder2(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p33 = this._readableState.buffer.head;
      var content = "";
      while (p33 !== null) {
        content += decoder.write(p33.data);
        p33 = p33.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n210) {
      if (n210 >= MAX_HWM) {
        n210 = MAX_HWM;
      } else {
        n210--;
        n210 |= n210 >>> 1;
        n210 |= n210 >>> 2;
        n210 |= n210 >>> 4;
        n210 |= n210 >>> 8;
        n210 |= n210 >>> 16;
        n210++;
      }
      return n210;
    }
    function howMuchToRead(n210, state) {
      if (n210 <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n210 !== n210) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n210 > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n210);
      if (n210 <= state.length)
        return n210;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable22.prototype.read = function(n210) {
      debug2("read", n210);
      n210 = parseInt(n210, 10);
      var state = this._readableState;
      var nOrig = n210;
      if (n210 !== 0)
        state.emittedReadable = false;
      if (n210 === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n210 = howMuchToRead(n210, state);
      if (n210 === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n210 < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug2("reading or ended", doRead);
      } else if (doRead) {
        debug2("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n210 = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n210 > 0)
        ret = fromList(n210, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n210 = 0;
      } else {
        state.length -= n210;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n210 && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        a22.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        a22.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable22.prototype._read = function(n210) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable22.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== a22.stdout && dest !== a22.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        a22.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        var ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug2("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug2("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable22.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i18 = 0; i18 < len; i18++)
          dests[i18].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable22.prototype.on = function(ev, fn) {
      var res = Stream22.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            a22.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable22.prototype.addListener = Readable22.prototype.on;
    Readable22.prototype.removeListener = function(ev, fn) {
      var res = Stream22.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable22.prototype.removeAllListeners = function(ev) {
      var res = Stream22.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable22.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        a22.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable22.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null)
        ;
    }
    Readable22.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug2("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug2("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i18 in stream) {
        if (this[i18] === void 0 && typeof stream[i18] === "function") {
          this[i18] = /* @__PURE__ */ function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i18);
        }
      }
      for (var n210 = 0; n210 < kProxyEvents.length; n210++) {
        stream.on(kProxyEvents[n210], this.emit.bind(this, kProxyEvents[n210]));
      }
      this._read = function(n223) {
        debug2("wrapped _read", n223);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable22.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator4();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable22.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable22._fromList = fromList;
    Object.defineProperty(Readable22.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n210, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n210 || n210 >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n210, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        a22.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable22.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser4();
        }
        return from(Readable22, iterable, opts);
      };
    }
    function indexOf(xs, x33) {
      for (var i18 = 0, l23 = xs.length; i18 < l23; i18++) {
        if (xs[i18] === x33)
          return i18;
      }
      return -1;
    }
  }
});
var require_stream_writable4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_writable.js"(exports10, module) {
    "use strict";
    module.exports = Writable22;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex22;
    Writable22.WritableState = WritableState;
    var internalUtil = {
      deprecate: __require7("util-deprecate")
    };
    var Stream22 = require_stream_browser4();
    var Buffer23 = __require7("buffer").Buffer;
    var OurUint8Array = (typeof __global$5 !== "undefined" ? __global$5 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy4();
    var _require = require_state4();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser4().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    __require7("inherits")(Writable22, Stream22);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex4();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_210) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable22, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable22)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex4();
      var isDuplex = this instanceof Duplex22;
      if (!isDuplex && !realHasInstance.call(Writable22, this))
        return new Writable22(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream22.call(this);
    }
    Writable22.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      a22.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        a22.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable22.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array2(chunk);
      if (isBuf && !Buffer23.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer2(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable22.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable22.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable22.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer23.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        a22.nextTick(cb, er);
        a22.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished22 = needFinish(state) || stream.destroyed;
        if (!finished22 && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          a22.nextTick(afterWrite, stream, state, finished22, cb);
        } else {
          afterWrite(stream, state, finished22, cb);
        }
      }
    }
    function afterWrite(stream, state, finished22, cb) {
      if (!finished22)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l23 = state.bufferedRequestCount;
        var buffer = new Array(l23);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable22.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable22.prototype._writev = null;
    Writable22.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          a22.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          a22.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable22.prototype.destroy = destroyImpl.destroy;
    Writable22.prototype._undestroy = destroyImpl.undestroy;
    Writable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});
var require_stream_duplex4 = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_duplex.js"(exports10, module) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      return keys2;
    };
    module.exports = Duplex22;
    var Readable22 = require_stream_readable4();
    var Writable22 = require_stream_writable4();
    __require7("inherits")(Duplex22, Readable22);
    {
      keys = objectKeys(Writable22.prototype);
      for (v23 = 0; v23 < keys.length; v23++) {
        method = keys[v23];
        if (!Duplex22.prototype[method])
          Duplex22.prototype[method] = Writable22.prototype[method];
      }
    }
    var keys;
    var method;
    var v23;
    function Duplex22(options) {
      if (!(this instanceof Duplex22))
        return new Duplex22(options);
      Readable22.call(this, options);
      Writable22.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      a22.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});
var require_stream_transform = __commonJS11({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_transform.js"(exports10, module) {
    "use strict";
    module.exports = Transform22;
    var _require$codes = require_errors_browser4().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex22 = require_stream_duplex4();
    __require7("inherits")(Transform22, Duplex22);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform22(options) {
      if (!(this instanceof Transform22))
        return new Transform22(options);
      Duplex22.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform22.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex22.prototype.push.call(this, chunk, encoding);
    };
    Transform22.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform22.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform22.prototype._read = function(n210) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform22.prototype._destroy = function(err, cb) {
      Duplex22.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er)
        return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }
});
var build_exports11 = {};
__export12(build_exports11, {
  default: () => build_default11
});
var __module11 = __toESM11(require_stream_transform());
__reExport11(build_exports11, __toESM11(require_stream_transform()));
var { default: __default11, ...__rest11 } = __module11;
var build_default11 = __default11 !== void 0 ? __default11 : __rest11;
var stream_passthrough_development_exports = {};
__export5(stream_passthrough_development_exports, {
  default: () => build_default12
});
var __global$6 = globalThis || (typeof window !== "undefined" ? window : self);
var require9 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "inherits":
      return e3(inherits_development_exports);
    case "util-deprecate":
      return e3(util_deprecate_development_exports);
    case "buffer":
      return e3(buffer_development_exports);
    case "events":
      return e3(node_events_exports);
    case "string_decoder":
      return e3(string_decoder_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create12 = Object.create;
var __defProp13 = Object.defineProperty;
var __getOwnPropDesc12 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames12 = Object.getOwnPropertyNames;
var __getProtoOf12 = Object.getPrototypeOf;
var __hasOwnProp12 = Object.prototype.hasOwnProperty;
var __require8 = /* @__PURE__ */ ((x33) => typeof require9 !== "undefined" ? require9 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require9 !== "undefined" ? require9 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require9 !== "undefined")
    return require9.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __esm5 = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames12(fn)[0]])(fn = 0)), res;
};
var __commonJS12 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames12(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export13 = (target, all) => {
  for (var name in all)
    __defProp13(target, name, { get: all[name], enumerable: true });
};
var __copyProps12 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames12(from))
      if (!__hasOwnProp12.call(to, key) && key !== except)
        __defProp13(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc12(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport12 = (target, mod, secondTarget) => (__copyProps12(target, mod, "default"), secondTarget && __copyProps12(secondTarget, mod, "default"));
var __toESM12 = (mod, isNodeMode, target) => (target = mod != null ? __create12(__getProtoOf12(mod)) : {}, __copyProps12(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp13(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS5 = (mod) => __copyProps12(__defProp13({}, "__esModule", { value: true }), mod);
var require_errors_browser5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/errors-browser.js"(exports10, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message2, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message2 === "string") {
          return message2;
        } else {
          return message2(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf2(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i18) {
          return String(i18);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_stream_browser5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports10, module) {
    module.exports = __require8("events").EventEmitter;
  }
});
var util_exports5 = {};
__export13(util_exports5, {
  default: () => util_default5
});
var util_default5;
var init_util5 = __esm5({
  "browser-exclude:util"() {
    util_default5 = {};
  }
});
var require_buffer_list5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports10, module) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i18 = 1; i18 < arguments.length; i18++) {
        var source = null != arguments[i18] ? arguments[i18] : {};
        i18 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i18 = 0; i18 < props.length; i18++) {
        var descriptor = props[i18];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = __require8("buffer");
    var Buffer23 = _require.Buffer;
    var _require2 = (init_util5(), __toCommonJS5(util_exports5));
    var inspect3 = _require2.inspect;
    var custom = inspect3 && inspect3.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer23.prototype.copy.call(src, target, offset);
    }
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v23) {
          var entry = {
            data: v23,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v23) {
          var entry = {
            data: v23,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join22(s26) {
          if (this.length === 0)
            return "";
          var p33 = this.head;
          var ret = "" + p33.data;
          while (p33 = p33.next)
            ret += s26 + p33.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n210) {
          if (this.length === 0)
            return Buffer23.alloc(0);
          var ret = Buffer23.allocUnsafe(n210 >>> 0);
          var p33 = this.head;
          var i18 = 0;
          while (p33) {
            copyBuffer(p33.data, ret, i18);
            i18 += p33.data.length;
            p33 = p33.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n210, hasStrings) {
          var ret;
          if (n210 < this.head.data.length) {
            ret = this.head.data.slice(0, n210);
            this.head.data = this.head.data.slice(n210);
          } else if (n210 === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n210) : this._getBuffer(n210);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n210) {
          var p33 = this.head;
          var c23 = 1;
          var ret = p33.data;
          n210 -= ret.length;
          while (p33 = p33.next) {
            var str = p33.data;
            var nb = n210 > str.length ? str.length : n210;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n210);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === str.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = str.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n210) {
          var ret = Buffer23.allocUnsafe(n210);
          var p33 = this.head;
          var c23 = 1;
          p33.data.copy(ret);
          n210 -= p33.data.length;
          while (p33 = p33.next) {
            var buf = p33.data;
            var nb = n210 > buf.length ? buf.length : n210;
            buf.copy(ret, ret.length - n210, 0, nb);
            n210 -= nb;
            if (n210 === 0) {
              if (nb === buf.length) {
                ++c23;
                if (p33.next)
                  this.head = p33.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p33;
                p33.data = buf.slice(nb);
              }
              break;
            }
            ++c23;
          }
          this.length -= c23;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_210, options) {
          return inspect3(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});
var require_destroy5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports10, module) {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            a22.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            a22.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            a22.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          a22.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          a22.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});
var require_state5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/state.js"(exports10, module) {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors_browser5().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module.exports = {
      getHighWaterMark
    };
  }
});
var require_end_of_stream5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports10, module) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser5().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once4(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});
var require_async_iterator5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports10, module) {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished22 = require_end_of_stream5();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve3 = iter[kLastResolve];
      if (resolve3 !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve3(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      a22.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve3, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve3(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve3, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve3, reject) {
            a22.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve3(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve3, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve3(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve3, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve3(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve3;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished22(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve3 = iterator[kLastResolve];
        if (resolve3 !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve3(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module.exports = createReadableStreamAsyncIterator;
  }
});
var require_from_browser5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports10, module) {
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});
var require_stream_readable5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_readable.js"(exports10, module) {
    "use strict";
    module.exports = Readable22;
    var Duplex22;
    Readable22.ReadableState = ReadableState;
    var EE = __require8("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream22 = require_stream_browser5();
    var Buffer23 = __require8("buffer").Buffer;
    var OurUint8Array = (typeof __global$6 !== "undefined" ? __global$6 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = (init_util5(), __toCommonJS5(util_exports5));
    var debug2;
    if (debugUtil && debugUtil.debuglog) {
      debug2 = debugUtil.debuglog("stream");
    } else {
      debug2 = function debug22() {
      };
    }
    var BufferList = require_buffer_list5();
    var destroyImpl = require_destroy5();
    var _require = require_state5();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser5().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder2;
    var createReadableStreamAsyncIterator;
    var from;
    __require8("inherits")(Readable22, Stream22);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener2(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex5();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder2)
          StringDecoder2 = __require8("string_decoder").StringDecoder;
        this.decoder = new StringDecoder2(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex5();
      if (!(this instanceof Readable22))
        return new Readable22(options);
      var isDuplex = this instanceof Duplex22;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream22.call(this);
    }
    Object.defineProperty(Readable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable22.prototype.destroy = destroyImpl.destroy;
    Readable22.prototype._undestroy = destroyImpl.undestroy;
    Readable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable22.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer23.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable22.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug2("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer23.prototype) {
            chunk = _uint8ArrayToBuffer2(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array2(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable22.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable22.prototype.setEncoding = function(enc) {
      if (!StringDecoder2)
        StringDecoder2 = __require8("string_decoder").StringDecoder;
      var decoder = new StringDecoder2(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p33 = this._readableState.buffer.head;
      var content = "";
      while (p33 !== null) {
        content += decoder.write(p33.data);
        p33 = p33.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n210) {
      if (n210 >= MAX_HWM) {
        n210 = MAX_HWM;
      } else {
        n210--;
        n210 |= n210 >>> 1;
        n210 |= n210 >>> 2;
        n210 |= n210 >>> 4;
        n210 |= n210 >>> 8;
        n210 |= n210 >>> 16;
        n210++;
      }
      return n210;
    }
    function howMuchToRead(n210, state) {
      if (n210 <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n210 !== n210) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n210 > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n210);
      if (n210 <= state.length)
        return n210;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable22.prototype.read = function(n210) {
      debug2("read", n210);
      n210 = parseInt(n210, 10);
      var state = this._readableState;
      var nOrig = n210;
      if (n210 !== 0)
        state.emittedReadable = false;
      if (n210 === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n210 = howMuchToRead(n210, state);
      if (n210 === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n210 < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug2("reading or ended", doRead);
      } else if (doRead) {
        debug2("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n210 = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n210 > 0)
        ret = fromList(n210, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n210 = 0;
      } else {
        state.length -= n210;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n210 && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        a22.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        a22.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable22.prototype._read = function(n210) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable22.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== a22.stdout && dest !== a22.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        a22.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        var ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug2("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug2("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable22.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i18 = 0; i18 < len; i18++)
          dests[i18].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable22.prototype.on = function(ev, fn) {
      var res = Stream22.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            a22.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable22.prototype.addListener = Readable22.prototype.on;
    Readable22.prototype.removeListener = function(ev, fn) {
      var res = Stream22.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable22.prototype.removeAllListeners = function(ev) {
      var res = Stream22.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        a22.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable22.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        a22.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable22.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null)
        ;
    }
    Readable22.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug2("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug2("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i18 in stream) {
        if (this[i18] === void 0 && typeof stream[i18] === "function") {
          this[i18] = /* @__PURE__ */ function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i18);
        }
      }
      for (var n210 = 0; n210 < kProxyEvents.length; n210++) {
        stream.on(kProxyEvents[n210], this.emit.bind(this, kProxyEvents[n210]));
      }
      this._read = function(n223) {
        debug2("wrapped _read", n223);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable22.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator5();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable22.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable22.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable22._fromList = fromList;
    Object.defineProperty(Readable22.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n210, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n210 || n210 >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n210, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        a22.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable22.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser5();
        }
        return from(Readable22, iterable, opts);
      };
    }
    function indexOf(xs, x33) {
      for (var i18 = 0, l23 = xs.length; i18 < l23; i18++) {
        if (xs[i18] === x33)
          return i18;
      }
      return -1;
    }
  }
});
var require_stream_writable5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_writable.js"(exports10, module) {
    "use strict";
    module.exports = Writable22;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex22;
    Writable22.WritableState = WritableState;
    var internalUtil = {
      deprecate: __require8("util-deprecate")
    };
    var Stream22 = require_stream_browser5();
    var Buffer23 = __require8("buffer").Buffer;
    var OurUint8Array = (typeof __global$6 !== "undefined" ? __global$6 : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer2(chunk) {
      return Buffer23.from(chunk);
    }
    function _isUint8Array2(obj) {
      return Buffer23.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy5();
    var _require = require_state5();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser5().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    __require8("inherits")(Writable22, Stream22);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex22 = Duplex22 || require_stream_duplex5();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex22;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_210) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable22, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable22)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable22(options) {
      Duplex22 = Duplex22 || require_stream_duplex5();
      var isDuplex = this instanceof Duplex22;
      if (!isDuplex && !realHasInstance.call(Writable22, this))
        return new Writable22(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream22.call(this);
    }
    Writable22.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      a22.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        a22.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable22.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array2(chunk);
      if (isBuf && !Buffer23.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer2(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable22.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable22.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable22.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer23.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        a22.nextTick(cb, er);
        a22.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished22 = needFinish(state) || stream.destroyed;
        if (!finished22 && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          a22.nextTick(afterWrite, stream, state, finished22, cb);
        } else {
          afterWrite(stream, state, finished22, cb);
        }
      }
    }
    function afterWrite(stream, state, finished22, cb) {
      if (!finished22)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l23 = state.bufferedRequestCount;
        var buffer = new Array(l23);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable22.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable22.prototype._writev = null;
    Writable22.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          a22.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          a22.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable22.prototype.destroy = destroyImpl.destroy;
    Writable22.prototype._undestroy = destroyImpl.undestroy;
    Writable22.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});
var require_stream_duplex5 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_duplex.js"(exports10, module) {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      return keys2;
    };
    module.exports = Duplex22;
    var Readable22 = require_stream_readable5();
    var Writable22 = require_stream_writable5();
    __require8("inherits")(Duplex22, Readable22);
    {
      keys = objectKeys(Writable22.prototype);
      for (v23 = 0; v23 < keys.length; v23++) {
        method = keys[v23];
        if (!Duplex22.prototype[method])
          Duplex22.prototype[method] = Writable22.prototype[method];
      }
    }
    var keys;
    var method;
    var v23;
    function Duplex22(options) {
      if (!(this instanceof Duplex22))
        return new Duplex22(options);
      Readable22.call(this, options);
      Writable22.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex22.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex22.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      a22.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex22.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});
var require_stream_transform2 = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_transform.js"(exports10, module) {
    "use strict";
    module.exports = Transform22;
    var _require$codes = require_errors_browser5().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex22 = require_stream_duplex5();
    __require8("inherits")(Transform22, Duplex22);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform22(options) {
      if (!(this instanceof Transform22))
        return new Transform22(options);
      Duplex22.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform22.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex22.prototype.push.call(this, chunk, encoding);
    };
    Transform22.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform22.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform22.prototype._read = function(n210) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform22.prototype._destroy = function(err, cb) {
      Duplex22.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er)
        return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }
});
var require_stream_passthrough = __commonJS12({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/_stream_passthrough.js"(exports10, module) {
    "use strict";
    module.exports = PassThrough22;
    var Transform22 = require_stream_transform2();
    __require8("inherits")(PassThrough22, Transform22);
    function PassThrough22(options) {
      if (!(this instanceof PassThrough22))
        return new PassThrough22(options);
      Transform22.call(this, options);
    }
    PassThrough22.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});
var build_exports12 = {};
__export13(build_exports12, {
  default: () => build_default12
});
var __module12 = __toESM12(require_stream_passthrough());
__reExport12(build_exports12, __toESM12(require_stream_passthrough()));
var { default: __default12, ...__rest12 } = __module12;
var build_default12 = __default12 !== void 0 ? __default12 : __rest12;
var end_of_stream_development_exports = {};
__export5(end_of_stream_development_exports, {
  default: () => build_default13
});
var __create13 = Object.create;
var __defProp14 = Object.defineProperty;
var __getOwnPropDesc13 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames13 = Object.getOwnPropertyNames;
var __getProtoOf13 = Object.getPrototypeOf;
var __hasOwnProp13 = Object.prototype.hasOwnProperty;
var __commonJS13 = (cb, mod) => function __require10() {
  return mod || (0, cb[__getOwnPropNames13(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export14 = (target, all) => {
  for (var name in all)
    __defProp14(target, name, { get: all[name], enumerable: true });
};
var __copyProps13 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames13(from))
      if (!__hasOwnProp13.call(to, key) && key !== except)
        __defProp14(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc13(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport13 = (target, mod, secondTarget) => (__copyProps13(target, mod, "default"), secondTarget && __copyProps13(secondTarget, mod, "default"));
var __toESM13 = (mod, isNodeMode, target) => (target = mod != null ? __create13(__getProtoOf13(mod)) : {}, __copyProps13(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp14(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_errors_browser6 = __commonJS13({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/errors-browser.js"(exports10, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message2, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message2 === "string") {
          return message2;
        } else {
          return message2(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf2(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i18) {
          return String(i18);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_end_of_stream6 = __commonJS13({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports10, module) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser6().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once4(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});
var build_exports13 = {};
__export14(build_exports13, {
  default: () => build_default13
});
var __module13 = __toESM13(require_end_of_stream6());
__reExport13(build_exports13, __toESM13(require_end_of_stream6()));
var { default: __default13, ...__rest13 } = __module13;
var build_default13 = __default13 !== void 0 ? __default13 : __rest13;
var pipeline_development_exports = {};
__export5(pipeline_development_exports, {
  default: () => build_default14
});
var __create14 = Object.create;
var __defProp15 = Object.defineProperty;
var __getOwnPropDesc14 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames14 = Object.getOwnPropertyNames;
var __getProtoOf14 = Object.getPrototypeOf;
var __hasOwnProp14 = Object.prototype.hasOwnProperty;
var __commonJS14 = (cb, mod) => function __require10() {
  return mod || (0, cb[__getOwnPropNames14(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export15 = (target, all) => {
  for (var name in all)
    __defProp15(target, name, { get: all[name], enumerable: true });
};
var __copyProps14 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames14(from))
      if (!__hasOwnProp14.call(to, key) && key !== except)
        __defProp15(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc14(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport14 = (target, mod, secondTarget) => (__copyProps14(target, mod, "default"), secondTarget && __copyProps14(secondTarget, mod, "default"));
var __toESM14 = (mod, isNodeMode, target) => (target = mod != null ? __create14(__getProtoOf14(mod)) : {}, __copyProps14(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp15(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_errors_browser7 = __commonJS14({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/errors-browser.js"(exports10, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message2, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message2 === "string") {
          return message2;
        } else {
          return message2(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf2(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i18) {
          return String(i18);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf2(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});
var require_end_of_stream7 = __commonJS14({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports10, module) {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser7().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once4(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});
var require_pipeline = __commonJS14({
  "../esmd/npm/readable-stream@3.6.2/node_modules/.pnpm/readable-stream@3.6.2/node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports10, module) {
    "use strict";
    var eos;
    function once4(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = require_errors_browser7().codes;
    var ERR_MISSING_ARGS2 = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err) {
      if (err)
        throw err;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once4(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0)
        eos = require_end_of_stream7();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isRequest(stream))
          return stream.abort();
        if (typeof stream.destroy === "function")
          return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length)
        return noop;
      if (typeof streams[streams.length - 1] !== "function")
        return noop;
      return streams.pop();
    }
    function pipeline22() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS2("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i18) {
        var reading = i18 < streams.length - 1;
        var writing = i18 > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    module.exports = pipeline22;
  }
});
var build_exports14 = {};
__export15(build_exports14, {
  default: () => build_default14
});
var __module14 = __toESM14(require_pipeline());
__reExport14(build_exports14, __toESM14(require_pipeline()));
var { default: __default14, ...__rest14 } = __module14;
var build_default14 = __default14 !== void 0 ? __default14 : __rest14;
var require10 = (n210) => {
  const e3 = (m23) => typeof m23.default < "u" ? m23.default : m23, c23 = (m23) => Object.assign({}, m23);
  switch (n210) {
    case "events":
      return e3(node_events_exports);
    case "inherits":
      return e3(inherits_development_exports);
    case "readable-stream/lib/_stream_readable.js":
      return e3(stream_readable_development_exports);
    case "readable-stream/lib/_stream_writable.js":
      return e3(stream_writable_development_exports);
    case "readable-stream/lib/_stream_duplex.js":
      return e3(stream_duplex_development_exports);
    case "readable-stream/lib/_stream_transform.js":
      return e3(stream_transform_development_exports);
    case "readable-stream/lib/_stream_passthrough.js":
      return e3(stream_passthrough_development_exports);
    case "readable-stream/lib/internal/streams/end-of-stream.js":
      return e3(end_of_stream_development_exports);
    case "readable-stream/lib/internal/streams/pipeline.js":
      return e3(pipeline_development_exports);
    default:
      throw new Error('module "' + n210 + '" not found');
  }
};
var __create15 = Object.create;
var __defProp16 = Object.defineProperty;
var __getOwnPropDesc15 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames15 = Object.getOwnPropertyNames;
var __getProtoOf15 = Object.getPrototypeOf;
var __hasOwnProp15 = Object.prototype.hasOwnProperty;
var __require9 = /* @__PURE__ */ ((x33) => typeof require10 !== "undefined" ? require10 : typeof Proxy !== "undefined" ? new Proxy(x33, {
  get: (a33, b24) => (typeof require10 !== "undefined" ? require10 : a33)[b24]
}) : x33)(function(x33) {
  if (typeof require10 !== "undefined")
    return require10.apply(this, arguments);
  throw Error('Dynamic require of "' + x33 + '" is not supported');
});
var __commonJS15 = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames15(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export16 = (target, all) => {
  for (var name in all)
    __defProp16(target, name, { get: all[name], enumerable: true });
};
var __copyProps15 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames15(from))
      if (!__hasOwnProp15.call(to, key) && key !== except)
        __defProp16(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc15(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport15 = (target, mod, secondTarget) => (__copyProps15(target, mod, "default"), secondTarget && __copyProps15(secondTarget, mod, "default"));
var __toESM15 = (mod, isNodeMode, target) => (target = mod != null ? __create15(__getProtoOf15(mod)) : {}, __copyProps15(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp16(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_stream_browserify = __commonJS15({
  "../esmd/npm/stream-browserify@3.0.0/node_modules/.pnpm/stream-browserify@3.0.0/node_modules/stream-browserify/index.js"(exports10, module) {
    module.exports = Stream22;
    var EE = __require9("events").EventEmitter;
    var inherits2 = __require9("inherits");
    inherits2(Stream22, EE);
    Stream22.Readable = __require9("readable-stream/lib/_stream_readable.js");
    Stream22.Writable = __require9("readable-stream/lib/_stream_writable.js");
    Stream22.Duplex = __require9("readable-stream/lib/_stream_duplex.js");
    Stream22.Transform = __require9("readable-stream/lib/_stream_transform.js");
    Stream22.PassThrough = __require9("readable-stream/lib/_stream_passthrough.js");
    Stream22.finished = __require9("readable-stream/lib/internal/streams/end-of-stream.js");
    Stream22.pipeline = __require9("readable-stream/lib/internal/streams/pipeline.js");
    Stream22.Stream = Stream22;
    function Stream22() {
      EE.call(this);
    }
    Stream22.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        if (typeof dest.destroy === "function")
          dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, "error") === 0) {
          throw er;
        }
      }
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
  }
});
var build_exports15 = {};
__export16(build_exports15, {
  Duplex: () => Duplex,
  PassThrough: () => PassThrough,
  Readable: () => Readable,
  Stream: () => Stream,
  Transform: () => Transform,
  Writable: () => Writable,
  default: () => build_default15,
  finished: () => finished,
  pipeline: () => pipeline
});
var __module15 = __toESM15(require_stream_browserify());
__reExport15(build_exports15, __toESM15(require_stream_browserify()));
var { Readable, Writable, Duplex, Transform, PassThrough, finished, pipeline, Stream } = __module15;
var { default: __default15, ...__rest15 } = __module15;
var build_default15 = __default15 !== void 0 ? __default15 : __rest15;

// node_shims/stream.js
var exported4 = stream_browserify_exports;
var exportedDefault2 = I;
if (globalThis.Deno || globalThis.process) {
  exported4 = await import("node:stream");
  exportedDefault2 = exported4.default;
}
var {
  Duplex: Duplex2,
  Stream: Stream2,
  _isUint8Array,
  PassThrough: PassThrough2,
  Transform: Transform2,
  _uint8ArrayToBuffer,
  finished: finished2,
  Readable: Readable2,
  Writable: Writable2,
  addAbortSignal,
  pipeline: pipeline2
} = exported4;

// node_shims/helpers/events.js
var events_exports = {};
__export(events_exports, {
  EventEmitter: () => EventEmitter,
  default: () => events_default,
  once: () => once2
});
var R5 = typeof Reflect === "object" ? Reflect : null;
var ReflectApply = R5 && typeof R5.apply === "function" ? R5.apply : function ReflectApply2(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R5 && typeof R5.ownKeys === "function") {
  ReflectOwnKeys = R5.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = void 0;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function() {
  if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || void 0;
};
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n30) {
  if (typeof n30 !== "number" || n30 < 0 || NumberIsNaN(n30)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n30 + ".");
  }
  this._maxListeners = n30;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === void 0)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i18 = 1; i18 < arguments.length; i18++) args.push(arguments[i18]);
  var doError = type === "error";
  var events = this._events;
  if (events !== void 0)
    doError = doError && events.error === void 0;
  else if (!doError)
    return false;
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      throw er;
    }
    var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
    err.context = er;
    throw err;
  }
  var handler = events[type];
  if (handler === void 0)
    return false;
  if (typeof handler === "function") {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i18 = 0; i18 < len; ++i18)
      ReflectApply(listeners2[i18], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m21;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === void 0) {
    events = target._events = /* @__PURE__ */ Object.create(null);
    target._eventsCount = 0;
  } else {
    if (events.newListener !== void 0) {
      target.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === void 0) {
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }
    m21 = _getMaxListeners(target);
    if (m21 > 0 && existing.length > m21 && !existing.warned) {
      existing.warned = true;
      var w12 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      w12.name = "MaxListenersExceededWarning";
      w12.emitter = target;
      w12.type = type;
      w12.count = existing.length;
      ProcessEmitWarning(w12);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: void 0, target, type, listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.removeListener = function removeListener2(type, listener) {
  var list, events, position, i18, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === void 0)
    return this;
  list = events[type];
  if (list === void 0)
    return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0)
      this._events = /* @__PURE__ */ Object.create(null);
    else {
      delete events[type];
      if (events.removeListener)
        this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position = -1;
    for (i18 = list.length - 1; i18 >= 0; i18--) {
      if (list[i18] === listener || list[i18].listener === listener) {
        originalListener = list[i18].listener;
        position = i18;
        break;
      }
    }
    if (position < 0)
      return this;
    if (position === 0)
      list.shift();
    else {
      spliceOne(list, position);
    }
    if (list.length === 1)
      events[type] = list[0];
    if (events.removeListener !== void 0)
      this.emit("removeListener", type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners2(type) {
  var listeners2, events, i18;
  events = this._events;
  if (events === void 0)
    return this;
  if (events.removeListener === void 0) {
    if (arguments.length === 0) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== void 0) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else
        delete events[type];
    }
    return this;
  }
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i18 = 0; i18 < keys.length; ++i18) {
      key = keys[i18];
      if (key === "removeListener") continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners2 = events[type];
  if (typeof listeners2 === "function") {
    this.removeListener(type, listeners2);
  } else if (listeners2 !== void 0) {
    for (i18 = listeners2.length - 1; i18 >= 0; i18--) {
      this.removeListener(type, listeners2[i18]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === void 0)
    return [];
  var evlistener = events[type];
  if (evlistener === void 0)
    return [];
  if (typeof evlistener === "function")
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== void 0) {
    var evlistener = events[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== void 0) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n30) {
  var copy = new Array(n30);
  for (var i18 = 0; i18 < n30; ++i18)
    copy[i18] = arr[i18];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i18 = 0; i18 < ret.length; ++i18) {
    ret[i18] = arr[i18].listener || arr[i18];
  }
  return ret;
}
function once2(emitter, name) {
  return new Promise(function(resolve3, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve3([].slice.call(arguments));
    }
    ;
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== "error") {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === "function") {
    eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name, function wrapListener(arg) {
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}
var events_default = EventEmitter;

// node_shims/events.js
var exported5 = events_exports;
var exportedDefault3 = events_default;
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
  exported5 = await import("node:events");
  exportedDefault3 = exported5.default;
}
var {
  EventEmitter: EventEmitter2,
  EventEmitterAsyncResource,
  captureRejectionSymbol,
  defaultMaxListeners: defaultMaxListeners2,
  errorMonitor,
  getEventListeners,
  listenerCount: listenerCount2,
  on,
  once: once3,
  setMaxListeners: setMaxListeners2
} = exported5;

// node_shims/helpers/support/types.js
var types_exports = {};
__export(types_exports, {
  default: () => ie,
  isAnyArrayBuffer: () => te,
  isArgumentsObject: () => mr,
  isArrayBuffer: () => Er,
  isArrayBufferView: () => Mr,
  isAsyncFunction: () => Jr,
  isBigInt64Array: () => Dr,
  isBigIntObject: () => $r,
  isBigUint64Array: () => Cr,
  isBooleanObject: () => Zr,
  isBoxedPrimitive: () => ee,
  isDataView: () => zr,
  isFloat32Array: () => vr,
  isFloat64Array: () => xr,
  isGeneratorFunction: () => kr,
  isGeneratorObject: () => Qr,
  isInt16Array: () => Vr,
  isInt32Array: () => Pr,
  isInt8Array: () => Tr,
  isMap: () => Gr,
  isMapIterator: () => Kr,
  isNumberObject: () => Xr,
  isPromise: () => Ir,
  isSet: () => _r,
  isSetIterator: () => Lr,
  isSharedArrayBuffer: () => Hr,
  isStringObject: () => Yr,
  isSymbolObject: () => re,
  isTypedArray: () => Or,
  isUint16Array: () => hr,
  isUint32Array: () => Fr,
  isUint8Array: () => Ur,
  isUint8ClampedArray: () => Wr,
  isWeakMap: () => Nr,
  isWeakSet: () => qr,
  isWebAssemblyCompiledModule: () => Rr
});
var __defProp17 = Object.defineProperty;
var __export17 = (target, all) => {
  for (var name in all)
    __defProp17(target, name, { get: all[name], enumerable: true });
};
var is_arguments_exports = {};
__export17(is_arguments_exports, {
  default: () => O7
});
var shams_exports2 = {};
__export17(shams_exports2, {
  default: () => v22
});
var shams_exports = {};
__export17(shams_exports, {
  default: () => d7
});
var m5 = Object.create;
var y4 = Object.defineProperty;
var O4 = Object.getOwnPropertyDescriptor;
var j6 = Object.getOwnPropertyNames;
var g6 = Object.getPrototypeOf;
var S3 = Object.prototype.hasOwnProperty;
var v5 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var w6 = (r2, e3) => {
  for (var t3 in e3) y4(r2, t3, { get: e3[t3], enumerable: true });
};
var s4 = (r2, e3, t3, l222) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let o26 of j6(e3)) !S3.call(r2, o26) && o26 !== t3 && y4(r2, o26, { get: () => e3[o26], enumerable: !(l222 = O4(e3, o26)) || l222.enumerable });
  return r2;
};
var f3 = (r2, e3, t3) => (s4(r2, e3, "default"), t3 && s4(t3, e3, "default"));
var c4 = (r2, e3, t3) => (t3 = r2 != null ? m5(g6(r2)) : {}, s4(e3 || !r2 || !r2.__esModule ? y4(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var a3 = v5((x322, i18) => {
  "use strict";
  i18.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return false;
    if (typeof Symbol.iterator == "symbol") return true;
    var e3 = {}, t3 = Symbol("test"), l222 = Object(t3);
    if (typeof t3 == "string" || Object.prototype.toString.call(t3) !== "[object Symbol]" || Object.prototype.toString.call(l222) !== "[object Symbol]") return false;
    var o26 = 42;
    e3[t3] = o26;
    for (t3 in e3) return false;
    if (typeof Object.keys == "function" && Object.keys(e3).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e3).length !== 0) return false;
    var u25 = Object.getOwnPropertySymbols(e3);
    if (u25.length !== 1 || u25[0] !== t3 || !Object.prototype.propertyIsEnumerable.call(e3, t3)) return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var b24 = Object.getOwnPropertyDescriptor(e3, t3);
      if (b24.value !== o26 || b24.enumerable !== true) return false;
    }
    return true;
  };
});
var n4 = {};
w6(n4, { default: () => d7 });
var P3 = c4(a3());
f3(n4, c4(a3()));
var { default: p4, ..._5 } = P3;
var d7 = p4 !== void 0 ? p4 : _5;
var require22 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "has-symbols/shams":
      return e3(shams_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _22 = Object.create;
var n22 = Object.defineProperty;
var S22 = Object.getOwnPropertyDescriptor;
var g22 = Object.getOwnPropertyNames;
var p23 = Object.getPrototypeOf;
var c22 = Object.prototype.hasOwnProperty;
var h5 = ((t3) => typeof require22 < "u" ? require22 : typeof Proxy < "u" ? new Proxy(t3, { get: (r2, e3) => (typeof require22 < "u" ? require22 : r2)[e3] }) : t3)(function(t3) {
  if (typeof require22 < "u") return require22.apply(this, arguments);
  throw Error('Dynamic require of "' + t3 + '" is not supported');
});
var x5 = (t3, r2) => () => (r2 || t3((r2 = { exports: {} }).exports, r2), r2.exports);
var T4 = (t3, r2) => {
  for (var e3 in r2) n22(t3, e3, { get: r2[e3], enumerable: true });
};
var u4 = (t3, r2, e3, i18) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let s26 of g22(r2)) !c22.call(t3, s26) && s26 !== e3 && n22(t3, s26, { get: () => r2[s26], enumerable: !(i18 = S22(r2, s26)) || i18.enumerable });
  return t3;
};
var a23 = (t3, r2, e3) => (u4(t3, r2, "default"), e3 && u4(e3, r2, "default"));
var m22 = (t3, r2, e3) => (e3 = t3 != null ? _22(p23(t3)) : {}, u4(r2 || !t3 || !t3.__esModule ? n22(e3, "default", { value: t3, enumerable: true }) : e3, t3));
var f22 = x5((k32, d222) => {
  "use strict";
  var b24 = h5("has-symbols/shams");
  d222.exports = function() {
    return b24() && !!Symbol.toStringTag;
  };
});
var o4 = {};
T4(o4, { default: () => v22 });
var y22 = m22(f22());
a23(o4, m22(f22()));
var { default: l4, ...q5 } = y22;
var v22 = l4 !== void 0 ? l4 : q5;
var callBound_exports = {};
__export17(callBound_exports, {
  default: () => S4
});
var get_intrinsic_exports = {};
__export17(get_intrinsic_exports, {
  default: () => pr
});
var has_symbols_exports = {};
__export17(has_symbols_exports, {
  default: () => k3
});
var g32 = Object.create;
var y32 = Object.defineProperty;
var v32 = Object.getOwnPropertyDescriptor;
var d22 = Object.getOwnPropertyNames;
var h22 = Object.getPrototypeOf;
var w22 = Object.prototype.hasOwnProperty;
var b6 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var P22 = (r2, e3) => {
  for (var t3 in e3) y32(r2, t3, { get: e3[t3], enumerable: true });
};
var s22 = (r2, e3, t3, l222) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let o26 of d22(e3)) !w22.call(r2, o26) && o26 !== t3 && y32(r2, o26, { get: () => e3[o26], enumerable: !(l222 = v32(e3, o26)) || l222.enumerable });
  return r2;
};
var n32 = (r2, e3, t3) => (s22(r2, e3, "default"), t3 && s22(t3, e3, "default"));
var p32 = (r2, e3, t3) => (t3 = r2 != null ? g32(h22(r2)) : {}, s22(e3 || !r2 || !r2.__esModule ? y32(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var c32 = b6((q18, m21) => {
  "use strict";
  m21.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return false;
    if (typeof Symbol.iterator == "symbol") return true;
    var e3 = {}, t3 = Symbol("test"), l222 = Object(t3);
    if (typeof t3 == "string" || Object.prototype.toString.call(t3) !== "[object Symbol]" || Object.prototype.toString.call(l222) !== "[object Symbol]") return false;
    var o26 = 42;
    e3[t3] = o26;
    for (t3 in e3) return false;
    if (typeof Object.keys == "function" && Object.keys(e3).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e3).length !== 0) return false;
    var u25 = Object.getOwnPropertySymbols(e3);
    if (u25.length !== 1 || u25[0] !== t3 || !Object.prototype.propertyIsEnumerable.call(e3, t3)) return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var i18 = Object.getOwnPropertyDescriptor(e3, t3);
      if (i18.value !== o26 || i18.enumerable !== true) return false;
    }
    return true;
  };
});
var a32 = b6((E152, S122) => {
  "use strict";
  var O13 = typeof Symbol < "u" && Symbol, _31 = c32();
  S122.exports = function() {
    return typeof O13 != "function" || typeof Symbol != "function" || typeof O13("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : _31();
  };
});
var f32 = {};
P22(f32, { default: () => k3 });
var x22 = p32(a32());
n32(f32, p32(a32()));
var { default: j22, ...N4 } = x22;
var k3 = j22 !== void 0 ? j22 : N4;
var has_proto_exports = {};
__export17(has_proto_exports, {
  default: () => g42
});
var i3 = Object.create;
var s32 = Object.defineProperty;
var m32 = Object.getOwnPropertyDescriptor;
var x32 = Object.getOwnPropertyNames;
var b22 = Object.getPrototypeOf;
var j32 = Object.prototype.hasOwnProperty;
var v42 = (t3, o26) => () => (o26 || t3((o26 = { exports: {} }).exports, o26), o26.exports);
var O22 = (t3, o26) => {
  for (var e3 in o26) s32(t3, e3, { get: o26[e3], enumerable: true });
};
var n42 = (t3, o26, e3, a17) => {
  if (o26 && typeof o26 == "object" || typeof o26 == "function") for (let f18 of x32(o26)) !j32.call(t3, f18) && f18 !== e3 && s32(t3, f18, { get: () => o26[f18], enumerable: !(a17 = m32(o26, f18)) || a17.enumerable });
  return t3;
};
var _32 = (t3, o26, e3) => (n42(t3, o26, "default"), e3 && n42(e3, o26, "default"));
var c42 = (t3, o26, e3) => (e3 = t3 != null ? i3(b22(t3)) : {}, n42(o26 || !t3 || !t3.__esModule ? s32(e3, "default", { value: t3, enumerable: true }) : e3, t3));
var u22 = v42((q18, l222) => {
  "use strict";
  var d222 = { foo: {} }, h20 = Object;
  l222.exports = function() {
    return { __proto__: d222 }.foo === d222.foo && !({ __proto__: null } instanceof h20);
  };
});
var r = {};
O22(r, { default: () => g42 });
var P32 = c42(u22());
_32(r, c42(u22()));
var { default: p42, ...$2 } = P32;
var g42 = p42 !== void 0 ? p42 : $2;
var function_bind_exports = {};
__export17(function_bind_exports, {
  default: () => D3
});
var S32 = Object.create;
var l22 = Object.defineProperty;
var w32 = Object.getOwnPropertyDescriptor;
var E4 = Object.getOwnPropertyNames;
var O32 = Object.getPrototypeOf;
var R6 = Object.prototype.hasOwnProperty;
var g52 = (n30, t3) => () => (t3 || n30((t3 = { exports: {} }).exports, t3), t3.exports);
var A3 = (n30, t3) => {
  for (var r2 in t3) l22(n30, r2, { get: t3[r2], enumerable: true });
};
var v52 = (n30, t3, r2, o26) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let e3 of E4(t3)) !R6.call(n30, e3) && e3 !== r2 && l22(n30, e3, { get: () => t3[e3], enumerable: !(o26 = w32(t3, e3)) || o26.enumerable });
  return n30;
};
var p5 = (n30, t3, r2) => (v52(n30, t3, "default"), r2 && v52(r2, t3, "default"));
var d32 = (n30, t3, r2) => (r2 = n30 != null ? S32(O32(n30)) : {}, v52(t3 || !n30 || !n30.__esModule ? l22(r2, "default", { value: n30, enumerable: true }) : r2, n30));
var m42 = g52((I8, b24) => {
  "use strict";
  var M42 = "Function.prototype.bind called on incompatible ", T12 = Object.prototype.toString, q18 = Math.max, G12 = "[object Function]", h20 = function(t3, r2) {
    for (var o26 = [], e3 = 0; e3 < t3.length; e3 += 1) o26[e3] = t3[e3];
    for (var a17 = 0; a17 < r2.length; a17 += 1) o26[a17 + t3.length] = r2[a17];
    return o26;
  }, $8 = function(t3, r2) {
    for (var o26 = [], e3 = r2 || 0, a17 = 0; e3 < t3.length; e3 += 1, a17 += 1) o26[a17] = t3[e3];
    return o26;
  }, j15 = function(n30, t3) {
    for (var r2 = "", o26 = 0; o26 < n30.length; o26 += 1) r2 += n30[o26], o26 + 1 < n30.length && (r2 += t3);
    return r2;
  };
  b24.exports = function(t3) {
    var r2 = this;
    if (typeof r2 != "function" || T12.apply(r2) !== G12) throw new TypeError(M42 + r2);
    for (var o26 = $8(arguments, 1), e3, a17 = function() {
      if (this instanceof e3) {
        var c222 = r2.apply(this, h20(o26, arguments));
        return Object(c222) === c222 ? c222 : this;
      }
      return r2.apply(t3, h20(o26, arguments));
    }, F10 = q18(0, r2.length - o26.length), y222 = [], i18 = 0; i18 < F10; i18++) y222[i18] = "$" + i18;
    if (e3 = Function("binder", "return function (" + j15(y222, ",") + "){ return binder.apply(this,arguments); }")(a17), r2.prototype) {
      var f18 = function() {
      };
      f18.prototype = r2.prototype, e3.prototype = new f18(), f18.prototype = null;
    }
    return e3;
  };
});
var s42 = g52((J4, _31) => {
  "use strict";
  var z5 = m42();
  _31.exports = Function.prototype.bind || z5;
});
var u32 = {};
A3(u32, { default: () => D3 });
var B4 = d32(s42());
p5(u32, d32(s42()));
var { default: x42, ...C4 } = B4;
var D3 = x42 !== void 0 ? x42 : C4;
var hasown_exports = {};
__export17(hasown_exports, {
  default: () => P4
});
var require33 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "function-bind":
      return e3(function_bind_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var i22 = Object.create;
var n5 = Object.defineProperty;
var _42 = Object.getOwnPropertyDescriptor;
var m52 = Object.getOwnPropertyNames;
var v6 = Object.getPrototypeOf;
var x52 = Object.prototype.hasOwnProperty;
var y42 = ((t3) => typeof require33 < "u" ? require33 : typeof Proxy < "u" ? new Proxy(t3, { get: (e3, r2) => (typeof require33 < "u" ? require33 : e3)[r2] }) : t3)(function(t3) {
  if (typeof require33 < "u") return require33.apply(this, arguments);
  throw Error('Dynamic require of "' + t3 + '" is not supported');
});
var O42 = (t3, e3) => () => (e3 || t3((e3 = { exports: {} }).exports, e3), e3.exports);
var b32 = (t3, e3) => {
  for (var r2 in e3) n5(t3, r2, { get: e3[r2], enumerable: true });
};
var p6 = (t3, e3, r2, u25) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let l222 of m52(e3)) !x52.call(t3, l222) && l222 !== r2 && n5(t3, l222, { get: () => e3[l222], enumerable: !(u25 = _42(e3, l222)) || u25.enumerable });
  return t3;
};
var a4 = (t3, e3, r2) => (p6(t3, e3, "default"), r2 && p6(r2, e3, "default"));
var c5 = (t3, e3, r2) => (r2 = t3 != null ? i22(v6(t3)) : {}, p6(e3 || !t3 || !t3.__esModule ? n5(r2, "default", { value: t3, enumerable: true }) : r2, t3));
var s5 = O42((g27, d222) => {
  "use strict";
  var h20 = Function.prototype.call, w12 = Object.prototype.hasOwnProperty, j15 = y42("function-bind");
  d222.exports = j15.call(h20, w12);
});
var o22 = {};
b32(o22, { default: () => P4 });
var q22 = c5(s5());
a4(o22, c5(s5()));
var { default: f4, ...F3 } = q22;
var P4 = f4 !== void 0 ? f4 : F3;
var require43 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "has-symbols":
      return e3(has_symbols_exports);
    case "has-proto":
      return e3(has_proto_exports);
    case "function-bind":
      return e3(function_bind_exports);
    case "hasown":
      return e3(hasown_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var $22 = Object.create;
var N22 = Object.defineProperty;
var J2 = Object.getOwnPropertyDescriptor;
var q32 = Object.getOwnPropertyNames;
var V4 = Object.getPrototypeOf;
var z2 = Object.prototype.hasOwnProperty;
var U5 = ((t3) => typeof require43 < "u" ? require43 : typeof Proxy < "u" ? new Proxy(t3, { get: (r2, o26) => (typeof require43 < "u" ? require43 : r2)[o26] }) : t3)(function(t3) {
  if (typeof require43 < "u") return require43.apply(this, arguments);
  throw Error('Dynamic require of "' + t3 + '" is not supported');
});
var L4 = (t3, r2) => () => (r2 || t3((r2 = { exports: {} }).exports, r2), r2.exports);
var Y3 = (t3, r2) => {
  for (var o26 in r2) N22(t3, o26, { get: r2[o26], enumerable: true });
};
var x6 = (t3, r2, o26, n30) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let a17 of q32(r2)) !z2.call(t3, a17) && a17 !== o26 && N22(t3, a17, { get: () => r2[a17], enumerable: !(n30 = J2(r2, a17)) || n30.enumerable });
  return t3;
};
var A22 = (t3, r2, o26) => (x6(t3, r2, "default"), o26 && x6(o26, r2, "default"));
var T22 = (t3, r2, o26) => (o26 = t3 != null ? $22(V4(t3)) : {}, x6(r2 || !t3 || !t3.__esModule ? N22(o26, "default", { value: t3, enumerable: true }) : o26, t3));
var G3 = L4((cr, W4) => {
  "use strict";
  var e3, v222 = SyntaxError, j15 = Function, g27 = TypeError, _31 = function(t3) {
    try {
      return j15('"use strict"; return (' + t3 + ").constructor;")();
    } catch {
    }
  }, c222 = Object.getOwnPropertyDescriptor;
  if (c222) try {
    c222({}, "");
  } catch {
    c222 = null;
  }
  var O13 = function() {
    throw new g27();
  }, H3 = c222 ? function() {
    try {
      return arguments.callee, O13;
    } catch {
      try {
        return c222(arguments, "callee").get;
      } catch {
        return O13;
      }
    }
  }() : O13, d222 = U5("has-symbols")(), K22 = U5("has-proto")(), y222 = Object.getPrototypeOf || (K22 ? function(t3) {
    return t3.__proto__;
  } : null), P16 = {}, Q2 = typeof Uint8Array > "u" || !y222 ? e3 : y222(Uint8Array), l222 = { "%AggregateError%": typeof AggregateError > "u" ? e3 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e3 : ArrayBuffer, "%ArrayIteratorPrototype%": d222 && y222 ? y222([][Symbol.iterator]()) : e3, "%AsyncFromSyncIteratorPrototype%": e3, "%AsyncFunction%": P16, "%AsyncGenerator%": P16, "%AsyncGeneratorFunction%": P16, "%AsyncIteratorPrototype%": P16, "%Atomics%": typeof Atomics > "u" ? e3 : Atomics, "%BigInt%": typeof BigInt > "u" ? e3 : BigInt, "%BigInt64Array%": typeof BigInt64Array > "u" ? e3 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > "u" ? e3 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > "u" ? e3 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array > "u" ? e3 : Float32Array, "%Float64Array%": typeof Float64Array > "u" ? e3 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e3 : FinalizationRegistry, "%Function%": j15, "%GeneratorFunction%": P16, "%Int8Array%": typeof Int8Array > "u" ? e3 : Int8Array, "%Int16Array%": typeof Int16Array > "u" ? e3 : Int16Array, "%Int32Array%": typeof Int32Array > "u" ? e3 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": d222 && y222 ? y222(y222([][Symbol.iterator]())) : e3, "%JSON%": typeof JSON == "object" ? JSON : e3, "%Map%": typeof Map > "u" ? e3 : Map, "%MapIteratorPrototype%": typeof Map > "u" || !d222 || !y222 ? e3 : y222((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > "u" ? e3 : Promise, "%Proxy%": typeof Proxy > "u" ? e3 : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect > "u" ? e3 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > "u" ? e3 : Set, "%SetIteratorPrototype%": typeof Set > "u" || !d222 || !y222 ? e3 : y222((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e3 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": d222 && y222 ? y222(""[Symbol.iterator]()) : e3, "%Symbol%": d222 ? Symbol : e3, "%SyntaxError%": v222, "%ThrowTypeError%": H3, "%TypedArray%": Q2, "%TypeError%": g27, "%Uint8Array%": typeof Uint8Array > "u" ? e3 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e3 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > "u" ? e3 : Uint16Array, "%Uint32Array%": typeof Uint32Array > "u" ? e3 : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap > "u" ? e3 : WeakMap, "%WeakRef%": typeof WeakRef > "u" ? e3 : WeakRef, "%WeakSet%": typeof WeakSet > "u" ? e3 : WeakSet };
  if (y222) try {
    null.error;
  } catch (t3) {
    k32 = y222(y222(t3)), l222["%Error.prototype%"] = k32;
  }
  var k32, X3 = function t3(r2) {
    var o26;
    if (r2 === "%AsyncFunction%") o26 = _31("async function () {}");
    else if (r2 === "%GeneratorFunction%") o26 = _31("function* () {}");
    else if (r2 === "%AsyncGeneratorFunction%") o26 = _31("async function* () {}");
    else if (r2 === "%AsyncGenerator%") {
      var n30 = t3("%AsyncGeneratorFunction%");
      n30 && (o26 = n30.prototype);
    } else if (r2 === "%AsyncIteratorPrototype%") {
      var a17 = t3("%AsyncGenerator%");
      a17 && y222 && (o26 = y222(a17.prototype));
    }
    return l222[r2] = o26, o26;
  }, C7 = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, E152 = U5("function-bind"), R7 = U5("hasown"), Z2 = E152.call(Function.call, Array.prototype.concat), rr = E152.call(Function.apply, Array.prototype.splice), M42 = E152.call(Function.call, String.prototype.replace), w12 = E152.call(Function.call, String.prototype.slice), er = E152.call(Function.call, RegExp.prototype.exec), tr = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, or = /\\(\\)?/g, nr = function(r2) {
    var o26 = w12(r2, 0, 1), n30 = w12(r2, -1);
    if (o26 === "%" && n30 !== "%") throw new v222("invalid intrinsic syntax, expected closing `%`");
    if (n30 === "%" && o26 !== "%") throw new v222("invalid intrinsic syntax, expected opening `%`");
    var a17 = [];
    return M42(r2, tr, function(p26, s26, i18, h20) {
      a17[a17.length] = i18 ? M42(h20, or, "$1") : s26 || p26;
    }), a17;
  }, ar = function(r2, o26) {
    var n30 = r2, a17;
    if (R7(C7, n30) && (a17 = C7[n30], n30 = "%" + a17[0] + "%"), R7(l222, n30)) {
      var p26 = l222[n30];
      if (p26 === P16 && (p26 = X3(n30)), typeof p26 > "u" && !o26) throw new g27("intrinsic " + r2 + " exists, but is not available. Please file an issue!");
      return { alias: a17, name: n30, value: p26 };
    }
    throw new v222("intrinsic " + r2 + " does not exist!");
  };
  W4.exports = function(r2, o26) {
    if (typeof r2 != "string" || r2.length === 0) throw new g27("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof o26 != "boolean") throw new g27('"allowMissing" argument must be a boolean');
    if (er(/^%?[^%]*%?$/, r2) === null) throw new v222("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var n30 = nr(r2), a17 = n30.length > 0 ? n30[0] : "", p26 = ar("%" + a17 + "%", o26), s26 = p26.name, i18 = p26.value, h20 = false, B8 = p26.alias;
    B8 && (a17 = B8[0], rr(n30, Z2([0, 1], B8)));
    for (var m21 = 1, S122 = true; m21 < n30.length; m21 += 1) {
      var f18 = n30[m21], I8 = w12(f18, 0, 1), F10 = w12(f18, -1);
      if ((I8 === '"' || I8 === "'" || I8 === "`" || F10 === '"' || F10 === "'" || F10 === "`") && I8 !== F10) throw new v222("property names with quotes must have matching quotes");
      if ((f18 === "constructor" || !S122) && (h20 = true), a17 += "." + f18, s26 = "%" + a17 + "%", R7(l222, s26)) i18 = l222[s26];
      else if (i18 != null) {
        if (!(f18 in i18)) {
          if (!o26) throw new g27("base intrinsic for " + r2 + " exists, but the property is not available.");
          return;
        }
        if (c222 && m21 + 1 >= n30.length) {
          var b24 = c222(i18, f18);
          S122 = !!b24, S122 && "get" in b24 && !("originalValue" in b24.get) ? i18 = b24.get : i18 = i18[f18];
        } else S122 = R7(i18, f18), i18 = i18[f18];
        S122 && !h20 && (l222[s26] = i18);
      }
    }
    return i18;
  };
});
var u42 = {};
Y3(u42, { default: () => pr });
var yr = T22(G3());
A22(u42, T22(G3()));
var { default: D22, ...ir } = yr;
var pr = D22 !== void 0 ? D22 : ir;
var set_function_length_exports = {};
__export17(set_function_length_exports, {
  default: () => C32
});
var define_data_property_exports = {};
__export17(define_data_property_exports, {
  default: () => I3
});
var has_property_descriptors_exports = {};
__export17(has_property_descriptors_exports, {
  default: () => j42,
  hasArrayLengthDefineBug: () => L22
});
var require53 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "get-intrinsic":
      return e3(get_intrinsic_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var g62 = Object.create;
var o32 = Object.defineProperty;
var _52 = Object.getOwnPropertyDescriptor;
var v7 = Object.getOwnPropertyNames;
var D32 = Object.getPrototypeOf;
var m6 = Object.prototype.hasOwnProperty;
var x7 = ((e3) => typeof require53 < "u" ? require53 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require53 < "u" ? require53 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require53 < "u") return require53.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var P5 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var A32 = (e3, r2) => {
  for (var t3 in r2) o32(e3, t3, { get: r2[t3], enumerable: true });
};
var s6 = (e3, r2, t3, h20) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let a17 of v7(r2)) !m6.call(e3, a17) && a17 !== t3 && o32(e3, a17, { get: () => r2[a17], enumerable: !(h20 = _52(r2, a17)) || h20.enumerable });
  return e3;
};
var u5 = (e3, r2, t3) => (s6(e3, r2, "default"), t3 && s6(t3, r2, "default"));
var l32 = (e3, r2, t3) => (t3 = e3 != null ? g62(D32(e3)) : {}, s6(r2 || !e3 || !e3.__esModule ? o32(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var c6 = P5((G12, p26) => {
  "use strict";
  var B8 = x7("get-intrinsic"), f18 = B8("%Object.defineProperty%", true), i18 = function() {
    if (f18) try {
      return f18({}, "a", { value: 1 }), true;
    } catch {
      return false;
    }
    return false;
  };
  i18.hasArrayLengthDefineBug = function() {
    if (!i18()) return null;
    try {
      return f18([], "length", { value: 1 }).length !== 1;
    } catch {
      return true;
    }
  };
  p26.exports = i18;
});
var n6 = {};
A32(n6, { default: () => j42, hasArrayLengthDefineBug: () => L22 });
var d42 = l32(c6());
u5(n6, l32(c6()));
var { hasArrayLengthDefineBug: L22 } = d42;
var { default: y5, ...b42 } = d42;
var j42 = y5 !== void 0 ? y5 : b42;
var gopd_exports = {};
__export17(gopd_exports, {
  default: () => j52
});
var require62 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "get-intrinsic":
      return e3(get_intrinsic_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _6 = Object.create;
var a5 = Object.defineProperty;
var m7 = Object.getOwnPropertyDescriptor;
var g7 = Object.getOwnPropertyNames;
var x8 = Object.getPrototypeOf;
var O5 = Object.prototype.hasOwnProperty;
var h32 = ((e3) => typeof require62 < "u" ? require62 : typeof Proxy < "u" ? new Proxy(e3, { get: (t3, r2) => (typeof require62 < "u" ? require62 : t3)[r2] }) : e3)(function(e3) {
  if (typeof require62 < "u") return require62.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var v8 = (e3, t3) => () => (t3 || e3((t3 = { exports: {} }).exports, t3), t3.exports);
var y6 = (e3, t3) => {
  for (var r2 in t3) a5(e3, r2, { get: t3[r2], enumerable: true });
};
var s7 = (e3, t3, r2, f18) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let i18 of g7(t3)) !O5.call(e3, i18) && i18 !== r2 && a5(e3, i18, { get: () => t3[i18], enumerable: !(f18 = m7(t3, i18)) || f18.enumerable });
  return e3;
};
var u6 = (e3, t3, r2) => (s7(e3, t3, "default"), r2 && s7(r2, t3, "default"));
var l42 = (e3, t3, r2) => (r2 = e3 != null ? _6(x8(e3)) : {}, s7(t3 || !e3 || !e3.__esModule ? a5(r2, "default", { value: e3, enumerable: true }) : r2, e3));
var c7 = v8((w12, d222) => {
  "use strict";
  var D8 = h32("get-intrinsic"), n30 = D8("%Object.getOwnPropertyDescriptor%", true);
  if (n30) try {
    n30([], "length");
  } catch {
    n30 = null;
  }
  d222.exports = n30;
});
var o42 = {};
y6(o42, { default: () => j52 });
var P6 = l42(c7());
u6(o42, l42(c7()));
var { default: p7, ...b52 } = P6;
var j52 = p7 !== void 0 ? p7 : b52;
var require72 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "has-property-descriptors":
      return e3(has_property_descriptors_exports);
    case "get-intrinsic":
      return e3(get_intrinsic_exports);
    case "gopd":
      return e3(gopd_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _7 = Object.create;
var b62 = Object.defineProperty;
var x9 = Object.getOwnPropertyDescriptor;
var P7 = Object.getOwnPropertyNames;
var q42 = Object.getPrototypeOf;
var T32 = Object.prototype.hasOwnProperty;
var p8 = ((n30) => typeof require72 < "u" ? require72 : typeof Proxy < "u" ? new Proxy(n30, { get: (e3, r2) => (typeof require72 < "u" ? require72 : e3)[r2] }) : n30)(function(n30) {
  if (typeof require72 < "u") return require72.apply(this, arguments);
  throw Error('Dynamic require of "' + n30 + '" is not supported');
});
var $3 = (n30, e3) => () => (e3 || n30((e3 = { exports: {} }).exports, e3), e3.exports);
var C22 = (n30, e3) => {
  for (var r2 in e3) b62(n30, r2, { get: e3[r2], enumerable: true });
};
var g8 = (n30, e3, r2, s26) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let t3 of P7(e3)) !T32.call(n30, t3) && t3 !== r2 && b62(n30, t3, { get: () => e3[t3], enumerable: !(s26 = x9(e3, t3)) || s26.enumerable });
  return n30;
};
var l5 = (n30, e3, r2) => (g8(n30, e3, "default"), r2 && g8(r2, e3, "default"));
var v9 = (n30, e3, r2) => (r2 = n30 != null ? _7(q42(n30)) : {}, g8(e3 || !n30 || !n30.__esModule ? b62(r2, "default", { value: n30, enumerable: true }) : r2, n30));
var h42 = $3((k32, y222) => {
  "use strict";
  var D8 = p8("has-property-descriptors")(), d222 = p8("get-intrinsic"), i18 = D8 && d222("%Object.defineProperty%", true);
  if (i18) try {
    i18({}, "a", { value: 1 });
  } catch {
    i18 = false;
  }
  var S122 = d222("%SyntaxError%"), u25 = d222("%TypeError%"), w12 = p8("gopd");
  y222.exports = function(e3, r2, s26) {
    if (!e3 || typeof e3 != "object" && typeof e3 != "function") throw new u25("`obj` must be an object or a function`");
    if (typeof r2 != "string" && typeof r2 != "symbol") throw new u25("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new u25("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new u25("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new u25("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new u25("`loose`, if provided, must be a boolean");
    var t3 = arguments.length > 3 ? arguments[3] : null, f18 = arguments.length > 4 ? arguments[4] : null, m21 = arguments.length > 5 ? arguments[5] : null, E152 = arguments.length > 6 ? arguments[6] : false, a17 = !!w12 && w12(e3, r2);
    if (i18) i18(e3, r2, { configurable: m21 === null && a17 ? a17.configurable : !m21, enumerable: t3 === null && a17 ? a17.enumerable : !t3, value: s26, writable: f18 === null && a17 ? a17.writable : !f18 });
    else if (E152 || !t3 && !f18 && !m21) e3[r2] = s26;
    else throw new S122("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var o5 = {};
C22(o5, { default: () => I3 });
var W2 = v9(h42());
l5(o5, v9(h42()));
var { default: c8, ...G22 } = W2;
var I3 = c8 !== void 0 ? c8 : G22;
var require82 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "get-intrinsic":
      return e3(get_intrinsic_exports);
    case "define-data-property":
      return e3(define_data_property_exports);
    case "has-property-descriptors":
      return e3(has_property_descriptors_exports);
    case "gopd":
      return e3(gopd_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var w42 = Object.create;
var l6 = Object.defineProperty;
var d52 = Object.getOwnPropertyDescriptor;
var q52 = Object.getOwnPropertyNames;
var x10 = Object.getPrototypeOf;
var y7 = Object.prototype.hasOwnProperty;
var f5 = ((e3) => typeof require82 < "u" ? require82 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require82 < "u" ? require82 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require82 < "u") return require82.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var I22 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var L32 = (e3, r2) => {
  for (var t3 in r2) l6(e3, t3, { get: r2[t3], enumerable: true });
};
var s8 = (e3, r2, t3, u25) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let i18 of q52(r2)) !y7.call(e3, i18) && i18 !== t3 && l6(e3, i18, { get: () => r2[i18], enumerable: !(u25 = d52(r2, i18)) || u25.enumerable });
  return e3;
};
var n7 = (e3, r2, t3) => (s8(e3, r2, "default"), t3 && s8(t3, r2, "default"));
var g9 = (e3, r2, t3) => (t3 = e3 != null ? w42(x10(e3)) : {}, s8(r2 || !e3 || !e3.__esModule ? l6(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var v10 = I22((M42, h20) => {
  "use strict";
  var b24 = f5("get-intrinsic"), F10 = f5("define-data-property"), D8 = f5("has-property-descriptors")(), c222 = f5("gopd"), m21 = b24("%TypeError%"), E152 = b24("%Math.floor%");
  h20.exports = function(r2, t3) {
    if (typeof r2 != "function") throw new m21("`fn` is not a function");
    if (typeof t3 != "number" || t3 < 0 || t3 > 4294967295 || E152(t3) !== t3) throw new m21("`length` must be a positive 32-bit integer");
    var u25 = arguments.length > 2 && !!arguments[2], i18 = true, p26 = true;
    if ("length" in r2 && c222) {
      var a17 = c222(r2, "length");
      a17 && !a17.configurable && (i18 = false), a17 && !a17.writable && (p26 = false);
    }
    return (i18 || p26 || !u25) && (D8 ? F10(r2, "length", t3, true, true) : F10(r2, "length", t3)), r2;
  };
});
var o6 = {};
L32(o6, { default: () => C32 });
var T42 = g9(v10());
n7(o6, g9(v10()));
var { default: _8, ...$4 } = T42;
var C32 = _8 !== void 0 ? _8 : $4;
var require92 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "get-intrinsic":
      return e3(get_intrinsic_exports);
    case "function-bind":
      return e3(function_bind_exports);
    case "set-function-length":
      return e3(set_function_length_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var b7 = Object.create;
var s9 = Object.defineProperty;
var w52 = Object.getOwnPropertyDescriptor;
var E22 = Object.getOwnPropertyNames;
var F22 = Object.getPrototypeOf;
var G32 = Object.prototype.hasOwnProperty;
var l7 = ((e3) => typeof require92 < "u" ? require92 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require92 < "u" ? require92 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require92 < "u") return require92.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var v11 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var P8 = (e3, r2) => {
  for (var t3 in r2) s9(e3, t3, { get: r2[t3], enumerable: true });
};
var f6 = (e3, r2, t3, a17) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let u25 of E22(r2)) !G32.call(e3, u25) && u25 !== t3 && s9(e3, u25, { get: () => r2[u25], enumerable: !(a17 = w52(r2, u25)) || a17.enumerable });
  return e3;
};
var i32 = (e3, r2, t3) => (f6(e3, r2, "default"), t3 && f6(t3, r2, "default"));
var x11 = (e3, r2, t3) => (t3 = e3 != null ? b7(F22(e3)) : {}, f6(r2 || !e3 || !e3.__esModule ? s9(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var q6 = v11((z5, c222) => {
  "use strict";
  var y222 = l7("function-bind"), p26 = l7("get-intrinsic"), T12 = l7("set-function-length"), j15 = p26("%TypeError%"), $8 = p26("%Function.prototype.apply%"), g27 = p26("%Function.prototype.call%"), h20 = p26("%Reflect.apply%", true) || y222.call(g27, $8), o26 = p26("%Object.defineProperty%", true), A15 = p26("%Math.max%");
  if (o26) try {
    o26({}, "a", { value: 1 });
  } catch {
    o26 = null;
  }
  c222.exports = function(r2) {
    if (typeof r2 != "function") throw new j15("a function is required");
    var t3 = h20(y222, g27, arguments);
    return T12(t3, 1 + A15(0, r2.length - (arguments.length - 1)), true);
  };
  var m21 = function() {
    return h20(y222, $8, arguments);
  };
  o26 ? o26(c222.exports, "apply", { value: m21 }) : c222.exports.apply = m21;
});
var d62 = v11((C7, I8) => {
  "use strict";
  var _31 = l7("get-intrinsic"), B8 = q6(), L8 = B8(_31("String.prototype.indexOf"));
  I8.exports = function(r2, t3) {
    var a17 = _31(r2, !!t3);
    return typeof a17 == "function" && L8(r2, ".prototype.") > -1 ? B8(a17) : a17;
  };
});
var n8 = {};
P8(n8, { default: () => S4 });
var M5 = x11(d62());
i32(n8, x11(d62()));
var { default: O6, ...R22 } = M5;
var S4 = O6 !== void 0 ? O6 : R22;
var require102 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "has-tostringtag/shams":
      return e3(shams_exports2);
    case "call-bind/callBound":
      return e3(callBound_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var A4 = Object.create;
var g10 = Object.defineProperty;
var S5 = Object.getOwnPropertyDescriptor;
var j62 = Object.getOwnPropertyNames;
var _9 = Object.getPrototypeOf;
var l8 = Object.prototype.hasOwnProperty;
var m8 = ((r2) => typeof require102 < "u" ? require102 : typeof Proxy < "u" ? new Proxy(r2, { get: (t3, e3) => (typeof require102 < "u" ? require102 : t3)[e3] }) : r2)(function(r2) {
  if (typeof require102 < "u") return require102.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var h52 = (r2, t3) => () => (t3 || r2((t3 = { exports: {} }).exports, t3), t3.exports);
var x12 = (r2, t3) => {
  for (var e3 in t3) g10(r2, e3, { get: t3[e3], enumerable: true });
};
var u7 = (r2, t3, e3, f18) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let s26 of j62(t3)) !l8.call(r2, s26) && s26 !== e3 && g10(r2, s26, { get: () => t3[s26], enumerable: !(f18 = S5(t3, s26)) || f18.enumerable });
  return r2;
};
var o7 = (r2, t3, e3) => (u7(r2, t3, "default"), e3 && u7(e3, t3, "default"));
var d72 = (r2, t3, e3) => (e3 = r2 != null ? A4(_9(r2)) : {}, u7(t3 || !r2 || !r2.__esModule ? g10(e3, "default", { value: r2, enumerable: true }) : e3, r2));
var a6 = h52((k32, b24) => {
  "use strict";
  var T12 = m8("has-tostringtag/shams")(), q18 = m8("call-bind/callBound"), c222 = q18("Object.prototype.toString"), i18 = function(t3) {
    return T12 && t3 && typeof t3 == "object" && Symbol.toStringTag in t3 ? false : c222(t3) === "[object Arguments]";
  }, p26 = function(t3) {
    return i18(t3) ? true : t3 !== null && typeof t3 == "object" && typeof t3.length == "number" && t3.length >= 0 && c222(t3) !== "[object Array]" && c222(t3.callee) === "[object Function]";
  }, L8 = function() {
    return i18(arguments);
  }();
  i18.isLegacyArguments = p26;
  b24.exports = L8 ? i18 : p26;
});
var n9 = {};
x12(n9, { default: () => O7 });
var B22 = d72(a6());
o7(n9, d72(a6()));
var { default: y8, ...F32 } = B22;
var O7 = y8 !== void 0 ? y8 : F32;
var is_generator_function_exports = {};
__export17(is_generator_function_exports, {
  default: () => R32
});
var require11 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "has-tostringtag/shams":
      return e3(shams_exports2);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var y9 = Object.create;
var f7 = Object.defineProperty;
var F4 = Object.getOwnPropertyDescriptor;
var _10 = Object.getOwnPropertyNames;
var S6 = Object.getPrototypeOf;
var m9 = Object.prototype.hasOwnProperty;
var x13 = ((r2) => typeof require11 < "u" ? require11 : typeof Proxy < "u" ? new Proxy(r2, { get: (t3, e3) => (typeof require11 < "u" ? require11 : t3)[e3] }) : r2)(function(r2) {
  if (typeof require11 < "u") return require11.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var G4 = (r2, t3) => () => (t3 || r2((t3 = { exports: {} }).exports, t3), t3.exports);
var b8 = (r2, t3) => {
  for (var e3 in t3) f7(r2, e3, { get: t3[e3], enumerable: true });
};
var a7 = (r2, t3, e3, u25) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let i18 of _10(t3)) !m9.call(r2, i18) && i18 !== e3 && f7(r2, i18, { get: () => t3[i18], enumerable: !(u25 = F4(t3, i18)) || u25.enumerable });
  return r2;
};
var o8 = (r2, t3, e3) => (a7(r2, t3, "default"), e3 && a7(e3, t3, "default"));
var p9 = (r2, t3, e3) => (e3 = r2 != null ? y9(S6(r2)) : {}, a7(t3 || !r2 || !r2.__esModule ? f7(e3, "default", { value: r2, enumerable: true }) : e3, r2));
var l9 = G4((w12, d222) => {
  "use strict";
  var j15 = Object.prototype.toString, O13 = Function.prototype.toString, T12 = /^\s*(?:function)?\*/, v222 = x13("has-tostringtag/shams")(), c222 = Object.getPrototypeOf, h20 = function() {
    if (!v222) return false;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, s26;
  d222.exports = function(t3) {
    if (typeof t3 != "function") return false;
    if (T12.test(O13.call(t3))) return true;
    if (!v222) {
      var e3 = j15.call(t3);
      return e3 === "[object GeneratorFunction]";
    }
    if (!c222) return false;
    if (typeof s26 > "u") {
      var u25 = h20();
      s26 = u25 ? c222(u25) : false;
    }
    return c222(t3) === s26;
  };
});
var n10 = {};
b8(n10, { default: () => R32 });
var P9 = p9(l9());
o8(n10, p9(l9()));
var { default: g11, ...q7 } = P9;
var R32 = g11 !== void 0 ? g11 : q7;
var which_typed_array_exports = {};
__export17(which_typed_array_exports, {
  default: () => H2
});
var for_each_exports = {};
__export17(for_each_exports, {
  default: () => z22
});
var is_callable_exports = {};
__export17(is_callable_exports, {
  default: () => q8
});
var T5 = Object.create;
var u8 = Object.defineProperty;
var F5 = Object.getOwnPropertyDescriptor;
var _11 = Object.getOwnPropertyNames;
var A5 = Object.getPrototypeOf;
var D4 = Object.prototype.hasOwnProperty;
var L42 = (r2, t3) => () => (t3 || r2((t3 = { exports: {} }).exports, t3), t3.exports);
var M22 = (r2, t3) => {
  for (var e3 in t3) u8(r2, e3, { get: t3[e3], enumerable: true });
};
var s10 = (r2, t3, e3, l222) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let f18 of _11(t3)) !D4.call(r2, f18) && f18 !== e3 && u8(r2, f18, { get: () => t3[f18], enumerable: !(l222 = F5(t3, f18)) || l222.enumerable });
  return r2;
};
var o9 = (r2, t3, e3) => (s10(r2, t3, "default"), e3 && s10(e3, t3, "default"));
var C42 = (r2, t3, e3) => (e3 = r2 != null ? T5(A5(r2)) : {}, s10(t3 || !r2 || !r2.__esModule ? u8(e3, "default", { value: r2, enumerable: true }) : e3, r2));
var j7 = L42((B8, g27) => {
  "use strict";
  var S122 = Function.prototype.toString, c222 = typeof Reflect == "object" && Reflect !== null && Reflect.apply, b24, a17;
  if (typeof c222 == "function" && typeof Object.defineProperty == "function") try {
    b24 = Object.defineProperty({}, "length", { get: function() {
      throw a17;
    } }), a17 = {}, c222(function() {
      throw 42;
    }, null, b24);
  } catch (r2) {
    r2 !== a17 && (c222 = null);
  }
  else c222 = null;
  var O13 = /^\s*class\b/, p26 = function(t3) {
    try {
      var e3 = S122.call(t3);
      return O13.test(e3);
    } catch {
      return false;
    }
  }, y222 = function(t3) {
    try {
      return p26(t3) ? false : (S122.call(t3), true);
    } catch {
      return false;
    }
  }, i18 = Object.prototype.toString, x322 = "[object Object]", H3 = "[object Function]", R7 = "[object GeneratorFunction]", v222 = "[object HTMLAllCollection]", E152 = "[object HTML document.all class]", k32 = "[object HTMLCollection]", w12 = typeof Symbol == "function" && !!Symbol.toStringTag, P16 = !(0 in [,]), d222 = function() {
    return false;
  };
  typeof document == "object" && (m21 = document.all, i18.call(m21) === i18.call(document.all) && (d222 = function(t3) {
    if ((P16 || !t3) && (typeof t3 > "u" || typeof t3 == "object")) try {
      var e3 = i18.call(t3);
      return (e3 === v222 || e3 === E152 || e3 === k32 || e3 === x322) && t3("") == null;
    } catch {
    }
    return false;
  }));
  var m21;
  g27.exports = c222 ? function(t3) {
    if (d222(t3)) return true;
    if (!t3 || typeof t3 != "function" && typeof t3 != "object") return false;
    try {
      c222(t3, null, b24);
    } catch (e3) {
      if (e3 !== a17) return false;
    }
    return !p26(t3) && y222(t3);
  } : function(t3) {
    if (d222(t3)) return true;
    if (!t3 || typeof t3 != "function" && typeof t3 != "object") return false;
    if (w12) return y222(t3);
    if (p26(t3)) return false;
    var e3 = i18.call(t3);
    return e3 !== H3 && e3 !== R7 && !/^\[object HTML/.test(e3) ? false : y222(t3);
  };
});
var n11 = {};
M22(n11, { default: () => q8 });
var G5 = C42(j7());
o9(n11, C42(j7()));
var { default: h6, ...I32 } = G5;
var q8 = h6 !== void 0 ? h6 : I32;
var require12 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "is-callable":
      return e3(is_callable_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var d8 = Object.create;
var u9 = Object.defineProperty;
var m10 = Object.getOwnPropertyDescriptor;
var O8 = Object.getOwnPropertyNames;
var _12 = Object.getPrototypeOf;
var A6 = Object.prototype.hasOwnProperty;
var g12 = ((o26) => typeof require12 < "u" ? require12 : typeof Proxy < "u" ? new Proxy(o26, { get: (f18, r2) => (typeof require12 < "u" ? require12 : f18)[r2] }) : o26)(function(o26) {
  if (typeof require12 < "u") return require12.apply(this, arguments);
  throw Error('Dynamic require of "' + o26 + '" is not supported');
});
var w62 = (o26, f18) => () => (f18 || o26((f18 = { exports: {} }).exports, f18), f18.exports);
var y10 = (o26, f18) => {
  for (var r2 in f18) u9(o26, r2, { get: f18[r2], enumerable: true });
};
var t = (o26, f18, r2, a17) => {
  if (f18 && typeof f18 == "object" || typeof f18 == "function") for (let l222 of O8(f18)) !A6.call(o26, l222) && l222 !== r2 && u9(o26, l222, { get: () => f18[l222], enumerable: !(a17 = m10(f18, l222)) || a17.enumerable });
  return o26;
};
var n12 = (o26, f18, r2) => (t(o26, f18, "default"), r2 && t(r2, f18, "default"));
var p10 = (o26, f18, r2) => (r2 = o26 != null ? d8(_12(o26)) : {}, t(f18 || !o26 || !o26.__esModule ? u9(r2, "default", { value: o26, enumerable: true }) : r2, o26));
var h7 = w62((D8, v222) => {
  "use strict";
  var S122 = g12("is-callable"), x322 = Object.prototype.toString, s26 = Object.prototype.hasOwnProperty, b24 = function(f18, r2, a17) {
    for (var l222 = 0, c222 = f18.length; l222 < c222; l222++) s26.call(f18, l222) && (a17 == null ? r2(f18[l222], l222, f18) : r2.call(a17, f18[l222], l222, f18));
  }, P16 = function(f18, r2, a17) {
    for (var l222 = 0, c222 = f18.length; l222 < c222; l222++) a17 == null ? r2(f18.charAt(l222), l222, f18) : r2.call(a17, f18.charAt(l222), l222, f18);
  }, q18 = function(f18, r2, a17) {
    for (var l222 in f18) s26.call(f18, l222) && (a17 == null ? r2(f18[l222], l222, f18) : r2.call(a17, f18[l222], l222, f18));
  }, C7 = function(f18, r2, a17) {
    if (!S122(r2)) throw new TypeError("iterator must be a function");
    var l222;
    arguments.length >= 3 && (l222 = a17), x322.call(f18) === "[object Array]" ? b24(f18, r2, l222) : typeof f18 == "string" ? P16(f18, r2, l222) : q18(f18, r2, l222);
  };
  v222.exports = C7;
});
var e = {};
y10(e, { default: () => z22 });
var T6 = p10(h7());
n12(e, p10(h7()));
var { default: E32, ...j8 } = T6;
var z22 = E32 !== void 0 ? E32 : j8;
var available_typed_arrays_exports = {};
__export17(available_typed_arrays_exports, {
  default: () => N32
});
var possible_typed_array_names_exports = {};
__export17(possible_typed_array_names_exports, {
  default: () => B32
});
var u10 = Object.create;
var i4 = Object.defineProperty;
var _13 = Object.getOwnPropertyDescriptor;
var m11 = Object.getOwnPropertyNames;
var p11 = Object.getPrototypeOf;
var U22 = Object.prototype.hasOwnProperty;
var I4 = (t3, r2) => () => (r2 || t3((r2 = { exports: {} }).exports, r2), r2.exports);
var x14 = (t3, r2) => {
  for (var a17 in r2) i4(t3, a17, { get: r2[a17], enumerable: true });
};
var A7 = (t3, r2, a17, d222) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let y222 of m11(r2)) !U22.call(t3, y222) && y222 !== a17 && i4(t3, y222, { get: () => r2[y222], enumerable: !(d222 = _13(r2, y222)) || d222.enumerable });
  return t3;
};
var n13 = (t3, r2, a17) => (A7(t3, r2, "default"), a17 && A7(a17, r2, "default"));
var l10 = (t3, r2, a17) => (a17 = t3 != null ? u10(p11(t3)) : {}, A7(r2 || !t3 || !t3.__esModule ? i4(a17, "default", { value: t3, enumerable: true }) : a17, t3));
var o10 = I4((C7, f18) => {
  "use strict";
  f18.exports = ["Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array"];
});
var e2 = {};
x14(e2, { default: () => B32 });
var c9 = l10(o10());
n13(e2, l10(o10()));
var { default: s11, ...g13 } = c9;
var B32 = s11 !== void 0 ? s11 : g13;
var __global$7 = globalThis || (typeof window !== "undefined" ? window : self);
var require13 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({ __esModule: true }, m21);
  switch (n30) {
    case "possible-typed-array-names":
      return e3(possible_typed_array_names_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _14 = Object.create;
var n14 = Object.defineProperty;
var b9 = Object.getOwnPropertyDescriptor;
var m12 = Object.getOwnPropertyNames;
var v12 = Object.getPrototypeOf;
var c10 = Object.prototype.hasOwnProperty;
var h8 = ((r2) => typeof require13 < "u" ? require13 : typeof Proxy < "u" ? new Proxy(r2, { get: (e3, t3) => (typeof require13 < "u" ? require13 : e3)[t3] }) : r2)(function(r2) {
  if (typeof require13 < "u") return require13.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var y11 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var x15 = (r2, e3) => {
  for (var t3 in e3) n14(r2, t3, { get: e3[t3], enumerable: true });
};
var f8 = (r2, e3, t3, d222) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let l222 of m12(e3)) !c10.call(r2, l222) && l222 !== t3 && n14(r2, l222, { get: () => e3[l222], enumerable: !(d222 = b9(e3, l222)) || d222.enumerable });
  return r2;
};
var a8 = (r2, e3, t3) => (f8(r2, e3, "default"), t3 && f8(t3, e3, "default"));
var i5 = (r2, e3, t3) => (t3 = r2 != null ? _14(v12(r2)) : {}, f8(e3 || !r2 || !r2.__esModule ? n14(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var u11 = y11((k32, p26) => {
  "use strict";
  var s26 = h8("possible-typed-array-names"), T12 = typeof globalThis > "u" ? __global$7 : globalThis;
  p26.exports = function() {
    for (var e3 = [], t3 = 0; t3 < s26.length; t3++) typeof T12[s26[t3]] == "function" && (e3[e3.length] = s26[t3]);
    return e3;
  };
});
var o11 = {};
x15(o11, { default: () => N32 });
var q9 = i5(u11());
a8(o11, i5(u11()));
var { default: g14, ...A8 } = q9;
var N32 = g14 !== void 0 ? g14 : A8;
var call_bind_exports = {};
__export17(call_bind_exports, {
  default: () => P14
});
var javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_exports = {};
__export17(javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_exports, {
  default: () => javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_default
});
var javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_default = Function.prototype.bind;
var get_intrinsic_exports2 = {};
__export17(get_intrinsic_exports2, {
  default: () => sr
});
var es_errors_exports = {};
__export17(es_errors_exports, {
  default: () => k22
});
var i6 = Object.create;
var u12 = Object.defineProperty;
var n15 = Object.getOwnPropertyDescriptor;
var x16 = Object.getOwnPropertyNames;
var c11 = Object.getPrototypeOf;
var E42 = Object.prototype.hasOwnProperty;
var b10 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var g15 = (r2, e3) => {
  for (var t3 in e3) u12(r2, t3, { get: e3[t3], enumerable: true });
};
var s12 = (r2, e3, t3, a17) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let f18 of x16(e3)) !E42.call(r2, f18) && f18 !== t3 && u12(r2, f18, { get: () => e3[f18], enumerable: !(a17 = n15(e3, f18)) || a17.enumerable });
  return r2;
};
var d9 = (r2, e3, t3) => (s12(r2, e3, "default"), t3 && s12(t3, e3, "default"));
var l11 = (r2, e3, t3) => (t3 = r2 != null ? i6(c11(r2)) : {}, s12(e3 || !r2 || !r2.__esModule ? u12(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var _15 = b10((v222, m21) => {
  "use strict";
  m21.exports = Error;
});
var o12 = {};
g15(o12, { default: () => k22 });
var h9 = l11(_15());
d9(o12, l11(_15()));
var { default: p12, ...j9 } = h9;
var k22 = p12 !== void 0 ? p12 : j9;
var eval_exports = {};
__export17(eval_exports, {
  default: () => j10
});
var i7 = Object.create;
var u13 = Object.defineProperty;
var n16 = Object.getOwnPropertyDescriptor;
var x17 = Object.getOwnPropertyNames;
var c12 = Object.getPrototypeOf;
var E5 = Object.prototype.hasOwnProperty;
var v13 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var b11 = (r2, e3) => {
  for (var t3 in e3) u13(r2, t3, { get: e3[t3], enumerable: true });
};
var s13 = (r2, e3, t3, a17) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let f18 of x17(e3)) !E5.call(r2, f18) && f18 !== t3 && u13(r2, f18, { get: () => e3[f18], enumerable: !(a17 = n16(e3, f18)) || a17.enumerable });
  return r2;
};
var d10 = (r2, e3, t3) => (s13(r2, e3, "default"), t3 && s13(t3, e3, "default"));
var l12 = (r2, e3, t3) => (t3 = r2 != null ? i7(c12(r2)) : {}, s13(e3 || !r2 || !r2.__esModule ? u13(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var _16 = v13((q18, m21) => {
  "use strict";
  m21.exports = EvalError;
});
var o13 = {};
b11(o13, { default: () => j10 });
var g16 = l12(_16());
d10(o13, l12(_16()));
var { default: p13, ...h10 } = g16;
var j10 = p13 !== void 0 ? p13 : h10;
var range_exports = {};
__export17(range_exports, {
  default: () => j11
});
var p14 = Object.create;
var u14 = Object.defineProperty;
var i8 = Object.getOwnPropertyDescriptor;
var x18 = Object.getOwnPropertyNames;
var c13 = Object.getPrototypeOf;
var g17 = Object.prototype.hasOwnProperty;
var E6 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var R42 = (r2, e3) => {
  for (var t3 in e3) u14(r2, t3, { get: e3[t3], enumerable: true });
};
var s14 = (r2, e3, t3, a17) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let f18 of x18(e3)) !g17.call(r2, f18) && f18 !== t3 && u14(r2, f18, { get: () => e3[f18], enumerable: !(a17 = i8(e3, f18)) || a17.enumerable });
  return r2;
};
var d11 = (r2, e3, t3) => (s14(r2, e3, "default"), t3 && s14(t3, e3, "default"));
var l13 = (r2, e3, t3) => (t3 = r2 != null ? p14(c13(r2)) : {}, s14(e3 || !r2 || !r2.__esModule ? u14(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var _17 = E6((q18, m21) => {
  "use strict";
  m21.exports = RangeError;
});
var o14 = {};
R42(o14, { default: () => j11 });
var b12 = l13(_17());
d11(o14, l13(_17()));
var { default: n17, ...h11 } = b12;
var j11 = n17 !== void 0 ? n17 : h11;
var ref_exports = {};
__export17(ref_exports, {
  default: () => j12
});
var p15 = Object.create;
var u15 = Object.defineProperty;
var c14 = Object.getOwnPropertyDescriptor;
var i9 = Object.getOwnPropertyNames;
var x19 = Object.getPrototypeOf;
var E7 = Object.prototype.hasOwnProperty;
var R52 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var b13 = (r2, e3) => {
  for (var t3 in e3) u15(r2, t3, { get: e3[t3], enumerable: true });
};
var s15 = (r2, e3, t3, a17) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let d222 of i9(e3)) !E7.call(r2, d222) && d222 !== t3 && u15(r2, d222, { get: () => e3[d222], enumerable: !(a17 = c14(e3, d222)) || a17.enumerable });
  return r2;
};
var f9 = (r2, e3, t3) => (s15(r2, e3, "default"), t3 && s15(t3, e3, "default"));
var l14 = (r2, e3, t3) => (t3 = r2 != null ? p15(x19(r2)) : {}, s15(e3 || !r2 || !r2.__esModule ? u15(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var _18 = R52((q18, m21) => {
  "use strict";
  m21.exports = ReferenceError;
});
var o15 = {};
b13(o15, { default: () => j12 });
var g18 = l14(_18());
f9(o15, l14(_18()));
var { default: n18, ...h12 } = g18;
var j12 = n18 !== void 0 ? n18 : h12;
var syntax_exports = {};
__export17(syntax_exports, {
  default: () => h13
});
var p16 = Object.create;
var u16 = Object.defineProperty;
var x20 = Object.getOwnPropertyDescriptor;
var i10 = Object.getOwnPropertyNames;
var c15 = Object.getPrototypeOf;
var y12 = Object.prototype.hasOwnProperty;
var E8 = (e3, t3) => () => (t3 || e3((t3 = { exports: {} }).exports, t3), t3.exports);
var S7 = (e3, t3) => {
  for (var r2 in t3) u16(e3, r2, { get: t3[r2], enumerable: true });
};
var s16 = (e3, t3, r2, a17) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let f18 of i10(t3)) !y12.call(e3, f18) && f18 !== r2 && u16(e3, f18, { get: () => t3[f18], enumerable: !(a17 = x20(t3, f18)) || a17.enumerable });
  return e3;
};
var d12 = (e3, t3, r2) => (s16(e3, t3, "default"), r2 && s16(r2, t3, "default"));
var l15 = (e3, t3, r2) => (r2 = e3 != null ? p16(c15(e3)) : {}, s16(t3 || !e3 || !e3.__esModule ? u16(r2, "default", { value: e3, enumerable: true }) : r2, e3));
var _19 = E8((k32, m21) => {
  "use strict";
  m21.exports = SyntaxError;
});
var o16 = {};
S7(o16, { default: () => h13 });
var b14 = l15(_19());
d12(o16, l15(_19()));
var { default: n19, ...g19 } = b14;
var h13 = n19 !== void 0 ? n19 : g19;
var type_exports = {};
__export17(type_exports, {
  default: () => h14
});
var i11 = Object.create;
var u17 = Object.defineProperty;
var n20 = Object.getOwnPropertyDescriptor;
var x21 = Object.getOwnPropertyNames;
var c16 = Object.getPrototypeOf;
var y13 = Object.prototype.hasOwnProperty;
var E9 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var T7 = (r2, e3) => {
  for (var t3 in e3) u17(r2, t3, { get: e3[t3], enumerable: true });
};
var s17 = (r2, e3, t3, p26) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let f18 of x21(e3)) !y13.call(r2, f18) && f18 !== t3 && u17(r2, f18, { get: () => e3[f18], enumerable: !(p26 = n20(e3, f18)) || p26.enumerable });
  return r2;
};
var d13 = (r2, e3, t3) => (s17(r2, e3, "default"), t3 && s17(t3, e3, "default"));
var a9 = (r2, e3, t3) => (t3 = r2 != null ? i11(c16(r2)) : {}, s17(e3 || !r2 || !r2.__esModule ? u17(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var _20 = E9((k32, l222) => {
  "use strict";
  l222.exports = TypeError;
});
var o17 = {};
T7(o17, { default: () => h14 });
var b15 = a9(_20());
d13(o17, a9(_20()));
var { default: m13, ...g20 } = b15;
var h14 = m13 !== void 0 ? m13 : g20;
var uri_exports = {};
__export17(uri_exports, {
  default: () => g21
});
var i12 = Object.create;
var u18 = Object.defineProperty;
var n21 = Object.getOwnPropertyDescriptor;
var x222 = Object.getOwnPropertyNames;
var c17 = Object.getPrototypeOf;
var E10 = Object.prototype.hasOwnProperty;
var I5 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var R62 = (r2, e3) => {
  for (var t3 in e3) u18(r2, t3, { get: e3[t3], enumerable: true });
};
var s18 = (r2, e3, t3, a17) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let f18 of x222(e3)) !E10.call(r2, f18) && f18 !== t3 && u18(r2, f18, { get: () => e3[f18], enumerable: !(a17 = n21(e3, f18)) || a17.enumerable });
  return r2;
};
var d14 = (r2, e3, t3) => (s18(r2, e3, "default"), t3 && s18(t3, e3, "default"));
var l16 = (r2, e3, t3) => (t3 = r2 != null ? i12(c17(r2)) : {}, s18(e3 || !r2 || !r2.__esModule ? u18(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var _21 = I5((j15, m21) => {
  "use strict";
  m21.exports = URIError;
});
var o18 = {};
R62(o18, { default: () => g21 });
var U32 = l16(_21());
d14(o18, l16(_21()));
var { default: p17, ...b16 } = U32;
var g21 = p17 !== void 0 ? p17 : b16;
var javascript_base64_ZXhwb3J0IGRlZmF1bHQgKCk9PnRydWU_exports = {};
__export17(javascript_base64_ZXhwb3J0IGRlZmF1bHQgKCk9PnRydWU_exports, {
  default: () => javascript_base64_ZXhwb3J0IGRlZmF1bHQgKCk9PnRydWU_default
});
var javascript_base64_ZXhwb3J0IGRlZmF1bHQgKCk9PnRydWU_default = () => true;
var javascript_base64_Y29uc3QgZm9vPXtiYXI6e319O2NvbnN0IE89T2JqZWN0O2V4cG9ydCBkZWZhdWx0ICgpPT4oe19fcHJvdG9fXzpmb299KS5iYXI9PT1mb28uYmFyJiYhKHtfX3Byb3RvX186bnVsbH0gaW5zdGFuY2VvZiBPKQ_exports = {};
__export17(javascript_base64_Y29uc3QgZm9vPXtiYXI6e319O2NvbnN0IE89T2JqZWN0O2V4cG9ydCBkZWZhdWx0ICgpPT4oe19fcHJvdG9fXzpmb299KS5iYXI9PT1mb28uYmFyJiYhKHtfX3Byb3RvX186bnVsbH0gaW5zdGFuY2VvZiBPKQ_exports, {
  default: () => javascript_base64_Y29uc3QgZm9vPXtiYXI6e319O2NvbnN0IE89T2JqZWN0O2V4cG9ydCBkZWZhdWx0ICgpPT4oe19fcHJvdG9fXzpmb299KS5iYXI9PT1mb28uYmFyJiYhKHtfX3Byb3RvX186bnVsbH0gaW5zdGFuY2VvZiBPKQ_default
});
var foo = { bar: {} };
var O9 = Object;
var javascript_base64_Y29uc3QgZm9vPXtiYXI6e319O2NvbnN0IE89T2JqZWN0O2V4cG9ydCBkZWZhdWx0ICgpPT4oe19fcHJvdG9fXzpmb299KS5iYXI9PT1mb28uYmFyJiYhKHtfX3Byb3RvX186bnVsbH0gaW5zdGFuY2VvZiBPKQ_default = () => ({ __proto__: foo }).bar === foo.bar && !({ __proto__: null } instanceof O9);
var hasown_exports2 = {};
__export17(hasown_exports2, {
  default: () => P10
});
var require14 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "function-bind":
      return e3(javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var i13 = Object.create;
var n222 = Object.defineProperty;
var _222 = Object.getOwnPropertyDescriptor;
var m14 = Object.getOwnPropertyNames;
var v14 = Object.getPrototypeOf;
var x23 = Object.prototype.hasOwnProperty;
var y14 = ((t3) => typeof require14 < "u" ? require14 : typeof Proxy < "u" ? new Proxy(t3, { get: (e3, r2) => (typeof require14 < "u" ? require14 : e3)[r2] }) : t3)(function(t3) {
  if (typeof require14 < "u") return require14.apply(this, arguments);
  throw Error('Dynamic require of "' + t3 + '" is not supported');
});
var O10 = (t3, e3) => () => (e3 || t3((e3 = { exports: {} }).exports, e3), e3.exports);
var b17 = (t3, e3) => {
  for (var r2 in e3) n222(t3, r2, { get: e3[r2], enumerable: true });
};
var p18 = (t3, e3, r2, u25) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let l222 of m14(e3)) !x23.call(t3, l222) && l222 !== r2 && n222(t3, l222, { get: () => e3[l222], enumerable: !(u25 = _222(e3, l222)) || u25.enumerable });
  return t3;
};
var a10 = (t3, e3, r2) => (p18(t3, e3, "default"), r2 && p18(r2, e3, "default"));
var c18 = (t3, e3, r2) => (r2 = t3 != null ? i13(v14(t3)) : {}, p18(e3 || !t3 || !t3.__esModule ? n222(r2, "default", { value: t3, enumerable: true }) : r2, t3));
var s19 = O10((g27, d222) => {
  "use strict";
  var h20 = Function.prototype.call, w12 = Object.prototype.hasOwnProperty, j15 = y14("function-bind");
  d222.exports = j15.call(h20, w12);
});
var o19 = {};
b17(o19, { default: () => P10 });
var q10 = c18(s19());
a10(o19, c18(s19()));
var { default: f10, ...F6 } = q10;
var P10 = f10 !== void 0 ? f10 : F6;
var require15 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "es-errors":
      return e3(es_errors_exports);
    case "es-errors/eval":
      return e3(eval_exports);
    case "es-errors/range":
      return e3(range_exports);
    case "es-errors/ref":
      return e3(ref_exports);
    case "es-errors/syntax":
      return e3(syntax_exports);
    case "es-errors/type":
      return e3(type_exports);
    case "es-errors/uri":
      return e3(uri_exports);
    case "has-symbols":
      return e3(javascript_base64_ZXhwb3J0IGRlZmF1bHQgKCk9PnRydWU_exports);
    case "has-proto":
      return e3(javascript_base64_Y29uc3QgZm9vPXtiYXI6e319O2NvbnN0IE89T2JqZWN0O2V4cG9ydCBkZWZhdWx0ICgpPT4oe19fcHJvdG9fXzpmb299KS5iYXI9PT1mb28uYmFyJiYhKHtfX3Byb3RvX186bnVsbH0gaW5zdGFuY2VvZiBPKQ_exports);
    case "function-bind":
      return e3(javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_exports);
    case "hasown":
      return e3(hasown_exports2);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var W22 = Object.create;
var x24 = Object.defineProperty;
var D5 = Object.getOwnPropertyDescriptor;
var J22 = Object.getOwnPropertyNames;
var V22 = Object.getPrototypeOf;
var z3 = Object.prototype.hasOwnProperty;
var p19 = ((t3) => typeof require15 < "u" ? require15 : typeof Proxy < "u" ? new Proxy(t3, { get: (r2, o26) => (typeof require15 < "u" ? require15 : r2)[o26] }) : t3)(function(t3) {
  if (typeof require15 < "u") return require15.apply(this, arguments);
  throw Error('Dynamic require of "' + t3 + '" is not supported');
});
var L5 = (t3, r2) => () => (r2 || t3((r2 = { exports: {} }).exports, r2), r2.exports);
var Y22 = (t3, r2) => {
  for (var o26 in r2) x24(t3, o26, { get: r2[o26], enumerable: true });
};
var B42 = (t3, r2, o26, n30) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let a17 of J22(r2)) !z3.call(t3, a17) && a17 !== o26 && x24(t3, a17, { get: () => r2[a17], enumerable: !(n30 = D5(r2, a17)) || n30.enumerable });
  return t3;
};
var d15 = (t3, r2, o26) => (B42(t3, r2, "default"), o26 && B42(o26, r2, "default"));
var T8 = (t3, r2, o26) => (o26 = t3 != null ? W22(V22(t3)) : {}, B42(r2 || !t3 || !t3.__esModule ? x24(o26, "default", { value: t3, enumerable: true }) : o26, t3));
var G6 = L5((dr, j15) => {
  "use strict";
  var e3, H3 = p19("es-errors"), K22 = p19("es-errors/eval"), Q2 = p19("es-errors/range"), X3 = p19("es-errors/ref"), S122 = p19("es-errors/syntax"), g27 = p19("es-errors/type"), Z2 = p19("es-errors/uri"), M42 = Function, N5 = function(t3) {
    try {
      return M42('"use strict"; return (' + t3 + ").constructor;")();
    } catch {
    }
  }, u25 = Object.getOwnPropertyDescriptor;
  if (u25) try {
    u25({}, "");
  } catch {
    u25 = null;
  }
  var O13 = function() {
    throw new g27();
  }, rr = u25 ? function() {
    try {
      return arguments.callee, O13;
    } catch {
      try {
        return u25(arguments, "callee").get;
      } catch {
        return O13;
      }
    }
  }() : O13, v222 = p19("has-symbols")(), er = p19("has-proto")(), y222 = Object.getPrototypeOf || (er ? function(t3) {
    return t3.__proto__;
  } : null), P16 = {}, tr = typeof Uint8Array > "u" || !y222 ? e3 : y222(Uint8Array), l222 = { __proto__: null, "%AggregateError%": typeof AggregateError > "u" ? e3 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e3 : ArrayBuffer, "%ArrayIteratorPrototype%": v222 && y222 ? y222([][Symbol.iterator]()) : e3, "%AsyncFromSyncIteratorPrototype%": e3, "%AsyncFunction%": P16, "%AsyncGenerator%": P16, "%AsyncGeneratorFunction%": P16, "%AsyncIteratorPrototype%": P16, "%Atomics%": typeof Atomics > "u" ? e3 : Atomics, "%BigInt%": typeof BigInt > "u" ? e3 : BigInt, "%BigInt64Array%": typeof BigInt64Array > "u" ? e3 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > "u" ? e3 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > "u" ? e3 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": H3, "%eval%": eval, "%EvalError%": K22, "%Float32Array%": typeof Float32Array > "u" ? e3 : Float32Array, "%Float64Array%": typeof Float64Array > "u" ? e3 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e3 : FinalizationRegistry, "%Function%": M42, "%GeneratorFunction%": P16, "%Int8Array%": typeof Int8Array > "u" ? e3 : Int8Array, "%Int16Array%": typeof Int16Array > "u" ? e3 : Int16Array, "%Int32Array%": typeof Int32Array > "u" ? e3 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": v222 && y222 ? y222(y222([][Symbol.iterator]())) : e3, "%JSON%": typeof JSON == "object" ? JSON : e3, "%Map%": typeof Map > "u" ? e3 : Map, "%MapIteratorPrototype%": typeof Map > "u" || !v222 || !y222 ? e3 : y222((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > "u" ? e3 : Promise, "%Proxy%": typeof Proxy > "u" ? e3 : Proxy, "%RangeError%": Q2, "%ReferenceError%": X3, "%Reflect%": typeof Reflect > "u" ? e3 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > "u" ? e3 : Set, "%SetIteratorPrototype%": typeof Set > "u" || !v222 || !y222 ? e3 : y222((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e3 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": v222 && y222 ? y222(""[Symbol.iterator]()) : e3, "%Symbol%": v222 ? Symbol : e3, "%SyntaxError%": S122, "%ThrowTypeError%": rr, "%TypedArray%": tr, "%TypeError%": g27, "%Uint8Array%": typeof Uint8Array > "u" ? e3 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e3 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > "u" ? e3 : Uint16Array, "%Uint32Array%": typeof Uint32Array > "u" ? e3 : Uint32Array, "%URIError%": Z2, "%WeakMap%": typeof WeakMap > "u" ? e3 : WeakMap, "%WeakRef%": typeof WeakRef > "u" ? e3 : WeakRef, "%WeakSet%": typeof WeakSet > "u" ? e3 : WeakSet };
  if (y222) try {
    null.error;
  } catch (t3) {
    $8 = y222(y222(t3)), l222["%Error.prototype%"] = $8;
  }
  var $8, or = function t3(r2) {
    var o26;
    if (r2 === "%AsyncFunction%") o26 = N5("async function () {}");
    else if (r2 === "%GeneratorFunction%") o26 = N5("function* () {}");
    else if (r2 === "%AsyncGeneratorFunction%") o26 = N5("async function* () {}");
    else if (r2 === "%AsyncGenerator%") {
      var n30 = t3("%AsyncGeneratorFunction%");
      n30 && (o26 = n30.prototype);
    } else if (r2 === "%AsyncIteratorPrototype%") {
      var a17 = t3("%AsyncGenerator%");
      a17 && y222 && (o26 = y222(a17.prototype));
    }
    return l222[r2] = o26, o26;
  }, k32 = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, h20 = p19("function-bind"), R7 = p19("hasown"), nr = h20.call(Function.call, Array.prototype.concat), ar = h20.call(Function.apply, Array.prototype.splice), C7 = h20.call(Function.call, String.prototype.replace), w12 = h20.call(Function.call, String.prototype.slice), yr2 = h20.call(Function.call, RegExp.prototype.exec), ir2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, pr2 = /\\(\\)?/g, fr = function(r2) {
    var o26 = w12(r2, 0, 1), n30 = w12(r2, -1);
    if (o26 === "%" && n30 !== "%") throw new S122("invalid intrinsic syntax, expected closing `%`");
    if (n30 === "%" && o26 !== "%") throw new S122("invalid intrinsic syntax, expected opening `%`");
    var a17 = [];
    return C7(r2, ir2, function(f18, A15, i18, m21) {
      a17[a17.length] = i18 ? C7(m21, pr2, "$1") : A15 || f18;
    }), a17;
  }, cr = function(r2, o26) {
    var n30 = r2, a17;
    if (R7(k32, n30) && (a17 = k32[n30], n30 = "%" + a17[0] + "%"), R7(l222, n30)) {
      var f18 = l222[n30];
      if (f18 === P16 && (f18 = or(n30)), typeof f18 > "u" && !o26) throw new g27("intrinsic " + r2 + " exists, but is not available. Please file an issue!");
      return { alias: a17, name: n30, value: f18 };
    }
    throw new S122("intrinsic " + r2 + " does not exist!");
  };
  j15.exports = function(r2, o26) {
    if (typeof r2 != "string" || r2.length === 0) throw new g27("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof o26 != "boolean") throw new g27('"allowMissing" argument must be a boolean');
    if (yr2(/^%?[^%]*%?$/, r2) === null) throw new S122("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var n30 = fr(r2), a17 = n30.length > 0 ? n30[0] : "", f18 = cr("%" + a17 + "%", o26), A15 = f18.name, i18 = f18.value, m21 = false, _31 = f18.alias;
    _31 && (a17 = _31[0], ar(n30, nr([0, 1], _31)));
    for (var I8 = 1, E152 = true; I8 < n30.length; I8 += 1) {
      var c222 = n30[I8], F10 = w12(c222, 0, 1), b24 = w12(c222, -1);
      if ((F10 === '"' || F10 === "'" || F10 === "`" || b24 === '"' || b24 === "'" || b24 === "`") && F10 !== b24) throw new S122("property names with quotes must have matching quotes");
      if ((c222 === "constructor" || !E152) && (m21 = true), a17 += "." + c222, A15 = "%" + a17 + "%", R7(l222, A15)) i18 = l222[A15];
      else if (i18 != null) {
        if (!(c222 in i18)) {
          if (!o26) throw new g27("base intrinsic for " + r2 + " exists, but the property is not available.");
          return;
        }
        if (u25 && I8 + 1 >= n30.length) {
          var U42 = u25(i18, c222);
          E152 = !!U42, E152 && "get" in U42 && !("originalValue" in U42.get) ? i18 = U42.get : i18 = i18[c222];
        } else E152 = R7(i18, c222), i18 = i18[c222];
        E152 && !m21 && (l222[A15] = i18);
      }
    }
    return i18;
  };
});
var s20 = {};
Y22(s20, { default: () => sr });
var ur = T8(G6());
d15(s20, T8(G6()));
var { default: q11, ...lr } = ur;
var sr = q11 !== void 0 ? q11 : lr;
var set_function_length_exports2 = {};
__export17(set_function_length_exports2, {
  default: () => G8
});
var define_data_property_exports2 = {};
__export17(define_data_property_exports2, {
  default: () => S8
});
var es_define_property_exports = {};
__export17(es_define_property_exports, {
  default: () => I6
});
var require16 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "get-intrinsic":
      return e3(get_intrinsic_exports2);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _23 = Object.create;
var u19 = Object.defineProperty;
var m15 = Object.getOwnPropertyDescriptor;
var v15 = Object.getOwnPropertyNames;
var x25 = Object.getPrototypeOf;
var y15 = Object.prototype.hasOwnProperty;
var P11 = ((e3) => typeof require16 < "u" ? require16 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require16 < "u" ? require16 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require16 < "u") return require16.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var b18 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var h15 = (e3, r2) => {
  for (var t3 in r2) u19(e3, t3, { get: r2[t3], enumerable: true });
};
var s21 = (e3, r2, t3, l222) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let o26 of v15(r2)) !y15.call(e3, o26) && o26 !== t3 && u19(e3, o26, { get: () => r2[o26], enumerable: !(l222 = m15(r2, o26)) || l222.enumerable });
  return e3;
};
var f11 = (e3, r2, t3) => (s21(e3, r2, "default"), t3 && s21(t3, r2, "default"));
var n23 = (e3, r2, t3) => (t3 = e3 != null ? _23(x25(e3)) : {}, s21(r2 || !e3 || !e3.__esModule ? u19(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var d16 = b18(($8, c222) => {
  "use strict";
  var j15 = P11("get-intrinsic"), i18 = j15("%Object.defineProperty%", true) || false;
  if (i18) try {
    i18({}, "a", { value: 1 });
  } catch {
    i18 = false;
  }
  c222.exports = i18;
});
var a11 = {};
h15(a11, { default: () => I6 });
var q12 = n23(d16());
f11(a11, n23(d16()));
var { default: p20, ...G7 } = q12;
var I6 = p20 !== void 0 ? p20 : G7;
var require17 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "es-define-property":
      return e3(es_define_property_exports);
    case "es-errors/syntax":
      return e3(syntax_exports);
    case "es-errors/type":
      return e3(type_exports);
    case "gopd":
      return e3(gopd_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _24 = Object.create;
var b19 = Object.defineProperty;
var q13 = Object.getOwnPropertyDescriptor;
var x26 = Object.getOwnPropertyNames;
var E11 = Object.getPrototypeOf;
var $5 = Object.prototype.hasOwnProperty;
var i14 = ((n30) => typeof require17 < "u" ? require17 : typeof Proxy < "u" ? new Proxy(n30, { get: (e3, r2) => (typeof require17 < "u" ? require17 : e3)[r2] }) : n30)(function(n30) {
  if (typeof require17 < "u") return require17.apply(this, arguments);
  throw Error('Dynamic require of "' + n30 + '" is not supported');
});
var C5 = (n30, e3) => () => (e3 || n30((e3 = { exports: {} }).exports, e3), e3.exports);
var P12 = (n30, e3) => {
  for (var r2 in e3) b19(n30, r2, { get: e3[r2], enumerable: true });
};
var g222 = (n30, e3, r2, s26) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let o26 of x26(e3)) !$5.call(n30, o26) && o26 !== r2 && b19(n30, o26, { get: () => e3[o26], enumerable: !(s26 = q13(e3, o26)) || s26.enumerable });
  return n30;
};
var l17 = (n30, e3, r2) => (g222(n30, e3, "default"), r2 && g222(r2, e3, "default"));
var p21 = (n30, e3, r2) => (r2 = n30 != null ? _24(E11(n30)) : {}, g222(e3 || !n30 || !n30.__esModule ? b19(r2, "default", { value: n30, enumerable: true }) : r2, n30));
var d17 = C5((z5, v222) => {
  "use strict";
  var w12 = i14("es-define-property"), T12 = i14("es-errors/syntax"), u25 = i14("es-errors/type"), h20 = i14("gopd");
  v222.exports = function(e3, r2, s26) {
    if (!e3 || typeof e3 != "object" && typeof e3 != "function") throw new u25("`obj` must be an object or a function`");
    if (typeof r2 != "string" && typeof r2 != "symbol") throw new u25("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null) throw new u25("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null) throw new u25("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null) throw new u25("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean") throw new u25("`loose`, if provided, must be a boolean");
    var o26 = arguments.length > 3 ? arguments[3] : null, f18 = arguments.length > 4 ? arguments[4] : null, m21 = arguments.length > 5 ? arguments[5] : null, c222 = arguments.length > 6 ? arguments[6] : false, a17 = !!h20 && h20(e3, r2);
    if (w12) w12(e3, r2, { configurable: m21 === null && a17 ? a17.configurable : !m21, enumerable: o26 === null && a17 ? a17.enumerable : !o26, value: s26, writable: f18 === null && a17 ? a17.writable : !f18 });
    else if (c222 || !o26 && !f18 && !m21) e3[r2] = s26;
    else throw new T12("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var t2 = {};
P12(t2, { default: () => S8 });
var W3 = p21(d17());
l17(t2, p21(d17()));
var { default: y16, ...D6 } = W3;
var S8 = y16 !== void 0 ? y16 : D6;
var has_property_descriptors_exports2 = {};
__export17(has_property_descriptors_exports2, {
  default: () => q14,
  hasArrayLengthDefineBug: () => L6
});
var require18 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "es-define-property":
      return e3(es_define_property_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var y17 = Object.create;
var s222 = Object.defineProperty;
var _25 = Object.getOwnPropertyDescriptor;
var D7 = Object.getOwnPropertyNames;
var m16 = Object.getPrototypeOf;
var x27 = Object.prototype.hasOwnProperty;
var v16 = ((e3) => typeof require18 < "u" ? require18 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require18 < "u" ? require18 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require18 < "u") return require18.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var A9 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var B5 = (e3, r2) => {
  for (var t3 in r2) s222(e3, t3, { get: r2[t3], enumerable: true });
};
var a12 = (e3, r2, t3, h20) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let o26 of D7(r2)) !x27.call(e3, o26) && o26 !== t3 && s222(e3, o26, { get: () => r2[o26], enumerable: !(h20 = _25(r2, o26)) || h20.enumerable });
  return e3;
};
var u20 = (e3, r2, t3) => (a12(e3, r2, "default"), t3 && a12(t3, r2, "default"));
var p222 = (e3, r2, t3) => (t3 = e3 != null ? y17(m16(e3)) : {}, a12(r2 || !e3 || !e3.__esModule ? s222(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var i15 = A9((b24, l222) => {
  "use strict";
  var f18 = v16("es-define-property"), c222 = function() {
    return !!f18;
  };
  c222.hasArrayLengthDefineBug = function() {
    if (!f18) return null;
    try {
      return f18([], "length", { value: 1 }).length !== 1;
    } catch {
      return true;
    }
  };
  l222.exports = c222;
});
var n24 = {};
B5(n24, { default: () => q14, hasArrayLengthDefineBug: () => L6 });
var d18 = p222(i15());
u20(n24, p222(i15()));
var { hasArrayLengthDefineBug: L6 } = d18;
var { default: g23, ...P13 } = d18;
var q14 = g23 !== void 0 ? g23 : P13;
var require19 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "get-intrinsic":
      return e3(get_intrinsic_exports2);
    case "define-data-property":
      return e3(define_data_property_exports2);
    case "has-property-descriptors":
      return e3(has_property_descriptors_exports2);
    case "gopd":
      return e3(gopd_exports);
    case "es-errors/type":
      return e3(type_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _26 = Object.create;
var l18 = Object.defineProperty;
var q15 = Object.getOwnPropertyDescriptor;
var w7 = Object.getOwnPropertyNames;
var d19 = Object.getPrototypeOf;
var x28 = Object.prototype.hasOwnProperty;
var u21 = ((r2) => typeof require19 < "u" ? require19 : typeof Proxy < "u" ? new Proxy(r2, { get: (e3, t3) => (typeof require19 < "u" ? require19 : e3)[t3] }) : r2)(function(r2) {
  if (typeof require19 < "u") return require19.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var y18 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var I7 = (r2, e3) => {
  for (var t3 in e3) l18(r2, t3, { get: e3[t3], enumerable: true });
};
var s23 = (r2, e3, t3, a17) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let i18 of w7(e3)) !x28.call(r2, i18) && i18 !== t3 && l18(r2, i18, { get: () => e3[i18], enumerable: !(a17 = q15(e3, i18)) || a17.enumerable });
  return r2;
};
var n25 = (r2, e3, t3) => (s23(r2, e3, "default"), t3 && s23(t3, e3, "default"));
var p232 = (r2, e3, t3) => (t3 = r2 != null ? _26(d19(r2)) : {}, s23(e3 || !r2 || !r2.__esModule ? l18(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var v17 = y18((O13, b24) => {
  "use strict";
  var L8 = u21("get-intrinsic"), F10 = u21("define-data-property"), D8 = u21("has-property-descriptors")(), c222 = u21("gopd"), m21 = u21("es-errors/type"), $8 = L8("%Math.floor%");
  b24.exports = function(e3, t3) {
    if (typeof e3 != "function") throw new m21("`fn` is not a function");
    if (typeof t3 != "number" || t3 < 0 || t3 > 4294967295 || $8(t3) !== t3) throw new m21("`length` must be a positive 32-bit integer");
    var a17 = arguments.length > 2 && !!arguments[2], i18 = true, g27 = true;
    if ("length" in e3 && c222) {
      var f18 = c222(e3, "length");
      f18 && !f18.configurable && (i18 = false), f18 && !f18.writable && (g27 = false);
    }
    return (i18 || g27 || !a17) && (D8 ? F10(e3, "length", t3, true, true) : F10(e3, "length", t3)), e3;
  };
});
var o20 = {};
I7(o20, { default: () => G8 });
var C6 = p232(v17());
n25(o20, p232(v17()));
var { default: h16, ...E12 } = C6;
var G8 = h16 !== void 0 ? h16 : E12;
var require20 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "function-bind":
      return e3(javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_exports);
    case "get-intrinsic":
      return e3(get_intrinsic_exports2);
    case "set-function-length":
      return e3(set_function_length_exports2);
    case "es-errors/type":
      return e3(type_exports);
    case "es-define-property":
      return e3(es_define_property_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var g24 = Object.create;
var f12 = Object.defineProperty;
var h17 = Object.getOwnPropertyDescriptor;
var B6 = Object.getOwnPropertyNames;
var w8 = Object.getPrototypeOf;
var F7 = Object.prototype.hasOwnProperty;
var u222 = ((r2) => typeof require20 < "u" ? require20 : typeof Proxy < "u" ? new Proxy(r2, { get: (e3, t3) => (typeof require20 < "u" ? require20 : e3)[t3] }) : r2)(function(r2) {
  if (typeof require20 < "u") return require20.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var b20 = (r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports);
var A10 = (r2, e3) => {
  for (var t3 in e3) f12(r2, t3, { get: e3[t3], enumerable: true });
};
var o21 = (r2, e3, t3, y222) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let p26 of B6(e3)) !F7.call(r2, p26) && p26 !== t3 && f12(r2, p26, { get: () => e3[p26], enumerable: !(y222 = h17(e3, p26)) || y222.enumerable });
  return r2;
};
var n26 = (r2, e3, t3) => (o21(r2, e3, "default"), t3 && o21(t3, e3, "default"));
var d20 = (r2, e3, t3) => (t3 = r2 != null ? g24(w8(r2)) : {}, o21(e3 || !r2 || !r2.__esModule ? f12(t3, "default", { value: r2, enumerable: true }) : t3, r2));
var s24 = b20((T12, l222) => {
  "use strict";
  var c222 = u222("function-bind"), i18 = u222("get-intrinsic"), E152 = u222("set-function-length"), G12 = u222("es-errors/type"), x322 = i18("%Function.prototype.apply%"), q18 = i18("%Function.prototype.call%"), _31 = i18("%Reflect.apply%", true) || c222.call(q18, x322), v222 = u222("es-define-property"), I8 = i18("%Math.max%");
  l222.exports = function(e3) {
    if (typeof e3 != "function") throw new G12("a function is required");
    var t3 = _31(c222, q18, arguments);
    return E152(t3, 1 + I8(0, e3.length - (arguments.length - 1)), true);
  };
  var m21 = function() {
    return _31(c222, x322, arguments);
  };
  v222 ? v222(l222.exports, "apply", { value: m21 }) : l222.exports.apply = m21;
});
var a13 = {};
A10(a13, { default: () => P14 });
var L7 = d20(s24());
n26(a13, d20(s24()));
var { default: $6, ...M32 } = L7;
var P14 = $6 !== void 0 ? $6 : M32;
var callBound_exports2 = {};
__export17(callBound_exports2, {
  default: () => j13
});
var require21 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({}, m21);
  switch (n30) {
    case "get-intrinsic":
      return e3(get_intrinsic_exports2);
    case "function-bind":
      return e3(javascript_base64_ZXhwb3J0IGRlZmF1bHQgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ_exports);
    case "set-function-length":
      return e3(set_function_length_exports2);
    case "es-errors/type":
      return e3(type_exports);
    case "es-define-property":
      return e3(es_define_property_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var F8 = Object.create;
var f13 = Object.defineProperty;
var G9 = Object.getOwnPropertyDescriptor;
var O11 = Object.getOwnPropertyNames;
var b21 = Object.getPrototypeOf;
var A11 = Object.prototype.hasOwnProperty;
var a14 = ((e3) => typeof require21 < "u" ? require21 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require21 < "u" ? require21 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require21 < "u") return require21.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var v18 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var E13 = (e3, r2) => {
  for (var t3 in r2) f13(e3, t3, { get: r2[t3], enumerable: true });
};
var c19 = (e3, r2, t3, i18) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let u25 of O11(r2)) !A11.call(e3, u25) && u25 !== t3 && f13(e3, u25, { get: () => r2[u25], enumerable: !(i18 = G9(r2, u25)) || i18.enumerable });
  return e3;
};
var p24 = (e3, r2, t3) => (c19(e3, r2, "default"), t3 && c19(t3, r2, "default"));
var y19 = (e3, r2, t3) => (t3 = e3 != null ? F8(b21(e3)) : {}, c19(r2 || !e3 || !e3.__esModule ? f13(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var _27 = v18((z5, o26) => {
  "use strict";
  var s26 = a14("function-bind"), l222 = a14("get-intrinsic"), L8 = a14("set-function-length"), M42 = a14("es-errors/type"), q18 = l222("%Function.prototype.apply%"), $8 = l222("%Function.prototype.call%"), g27 = l222("%Reflect.apply%", true) || s26.call($8, q18), x322 = a14("es-define-property"), P16 = l222("%Math.max%");
  o26.exports = function(r2) {
    if (typeof r2 != "function") throw new M42("a function is required");
    var t3 = g27(s26, $8, arguments);
    return L8(t3, 1 + P16(0, r2.length - (arguments.length - 1)), true);
  };
  var m21 = function() {
    return g27(s26, q18, arguments);
  };
  x322 ? x322(o26.exports, "apply", { value: m21 }) : o26.exports.apply = m21;
});
var d21 = v18((C7, I8) => {
  "use strict";
  var h20 = a14("get-intrinsic"), B8 = _27(), R7 = B8(h20("String.prototype.indexOf"));
  I8.exports = function(r2, t3) {
    var i18 = h20(r2, !!t3);
    return typeof i18 == "function" && R7(r2, ".prototype.") > -1 ? B8(i18) : i18;
  };
});
var n27 = {};
E13(n27, { default: () => j13 });
var S9 = y19(d21());
p24(n27, y19(d21()));
var { default: w9, ...T9 } = S9;
var j13 = w9 !== void 0 ? w9 : T9;
var shams_exports3 = {};
__export17(shams_exports3, {
  default: () => v19
});
var require222 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({ __esModule: true }, m21);
  switch (n30) {
    case "has-symbols/shams":
      return e3(shams_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var _28 = Object.create;
var n28 = Object.defineProperty;
var S10 = Object.getOwnPropertyDescriptor;
var g25 = Object.getOwnPropertyNames;
var p25 = Object.getPrototypeOf;
var c20 = Object.prototype.hasOwnProperty;
var h18 = ((t3) => typeof require222 < "u" ? require222 : typeof Proxy < "u" ? new Proxy(t3, { get: (r2, e3) => (typeof require222 < "u" ? require222 : r2)[e3] }) : t3)(function(t3) {
  if (typeof require222 < "u") return require222.apply(this, arguments);
  throw Error('Dynamic require of "' + t3 + '" is not supported');
});
var x29 = (t3, r2) => () => (r2 || t3((r2 = { exports: {} }).exports, r2), r2.exports);
var T10 = (t3, r2) => {
  for (var e3 in r2) n28(t3, e3, { get: r2[e3], enumerable: true });
};
var u23 = (t3, r2, e3, i18) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let s26 of g25(r2)) !c20.call(t3, s26) && s26 !== e3 && n28(t3, s26, { get: () => r2[s26], enumerable: !(i18 = S10(r2, s26)) || i18.enumerable });
  return t3;
};
var a15 = (t3, r2, e3) => (u23(t3, r2, "default"), e3 && u23(e3, r2, "default"));
var m17 = (t3, r2, e3) => (e3 = t3 != null ? _28(p25(t3)) : {}, u23(r2 || !t3 || !t3.__esModule ? n28(e3, "default", { value: t3, enumerable: true }) : e3, t3));
var f14 = x29((k32, d222) => {
  "use strict";
  var b24 = h18("has-symbols/shams");
  d222.exports = function() {
    return b24() && !!Symbol.toStringTag;
  };
});
var o222 = {};
T10(o222, { default: () => v19 });
var y20 = m17(f14());
a15(o222, m17(f14()));
var { default: l19, ...q16 } = y20;
var v19 = l19 !== void 0 ? l19 : q16;
var __global$23 = globalThis || (typeof window !== "undefined" ? window : self);
var require23 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({ __esModule: true }, m21);
  switch (n30) {
    case "for-each":
      return e3(for_each_exports);
    case "available-typed-arrays":
      return e3(available_typed_arrays_exports);
    case "call-bind":
      return e3(call_bind_exports);
    case "call-bind/callBound":
      return e3(callBound_exports2);
    case "gopd":
      return e3(gopd_exports);
    case "has-tostringtag/shams":
      return e3(shams_exports3);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var x30 = Object.create;
var v20 = Object.defineProperty;
var $7 = Object.getOwnPropertyDescriptor;
var A12 = Object.getOwnPropertyNames;
var j14 = Object.getPrototypeOf;
var w10 = Object.prototype.hasOwnProperty;
var f15 = ((t3) => typeof require23 < "u" ? require23 : typeof Proxy < "u" ? new Proxy(t3, { get: (r2, e3) => (typeof require23 < "u" ? require23 : r2)[e3] }) : t3)(function(t3) {
  if (typeof require23 < "u") return require23.apply(this, arguments);
  throw Error('Dynamic require of "' + t3 + '" is not supported');
});
var P15 = (t3, r2) => () => (r2 || t3((r2 = { exports: {} }).exports, r2), r2.exports);
var B7 = (t3, r2) => {
  for (var e3 in r2) v20(t3, e3, { get: r2[e3], enumerable: true });
};
var s25 = (t3, r2, e3, n30) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let a17 of A12(r2)) !w10.call(t3, a17) && a17 !== e3 && v20(t3, a17, { get: () => r2[a17], enumerable: !(n30 = $7(r2, a17)) || n30.enumerable });
  return t3;
};
var o23 = (t3, r2, e3) => (s25(t3, r2, "default"), e3 && s25(e3, r2, "default"));
var b222 = (t3, r2, e3) => (e3 = t3 != null ? x30(j14(t3)) : {}, s25(r2 || !t3 || !t3.__esModule ? v20(e3, "default", { value: t3, enumerable: true }) : e3, t3));
var S11 = P15((J4, O13) => {
  "use strict";
  var u25 = f15("for-each"), D8 = f15("available-typed-arrays"), T12 = f15("call-bind"), d222 = f15("call-bind/callBound"), l222 = f15("gopd"), E152 = d222("Object.prototype.toString"), _31 = f15("has-tostringtag/shams")(), h20 = typeof globalThis > "u" ? __global$23 : globalThis, g27 = D8(), p26 = d222("String.prototype.slice"), y222 = Object.getPrototypeOf, k32 = d222("Array.prototype.indexOf", true) || function(r2, e3) {
    for (var n30 = 0; n30 < r2.length; n30 += 1) if (r2[n30] === e3) return n30;
    return -1;
  }, c222 = { __proto__: null };
  _31 && l222 && y222 ? u25(g27, function(t3) {
    var r2 = new h20[t3]();
    if (Symbol.toStringTag in r2) {
      var e3 = y222(r2), n30 = l222(e3, Symbol.toStringTag);
      if (!n30) {
        var a17 = y222(e3);
        n30 = l222(a17, Symbol.toStringTag);
      }
      c222["$" + t3] = T12(n30.get);
    }
  }) : u25(g27, function(t3) {
    var r2 = new h20[t3](), e3 = r2.slice || r2.set;
    e3 && (c222["$" + t3] = T12(e3));
  });
  var z5 = function(r2) {
    var e3 = false;
    return u25(c222, function(n30, a17) {
      if (!e3) try {
        "$" + n30(r2) === a17 && (e3 = p26(a17, 1));
      } catch {
      }
    }), e3;
  }, C7 = function(r2) {
    var e3 = false;
    return u25(c222, function(n30, a17) {
      if (!e3) try {
        n30(r2), e3 = p26(a17, 1);
      } catch {
      }
    }), e3;
  };
  O13.exports = function(r2) {
    if (!r2 || typeof r2 != "object") return false;
    if (!_31) {
      var e3 = p26(E152(r2), 8, -1);
      return k32(g27, e3) > -1 ? e3 : e3 !== "Object" ? false : C7(r2);
    }
    return l222 ? z5(r2) : null;
  };
});
var i16 = {};
B7(i16, { default: () => H2 });
var F9 = b222(S11());
o23(i16, b222(S11()));
var { default: m18, ...G10 } = F9;
var H2 = m18 !== void 0 ? m18 : G10;
var is_typed_array_exports = {};
__export17(is_typed_array_exports, {
  default: () => b23
});
var require24 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({ __esModule: true }, m21);
  switch (n30) {
    case "which-typed-array":
      return e3(which_typed_array_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var c21 = Object.create;
var f16 = Object.defineProperty;
var l20 = Object.getOwnPropertyDescriptor;
var m19 = Object.getOwnPropertyNames;
var y21 = Object.getPrototypeOf;
var x31 = Object.prototype.hasOwnProperty;
var h19 = ((e3) => typeof require24 < "u" ? require24 : typeof Proxy < "u" ? new Proxy(e3, { get: (r2, t3) => (typeof require24 < "u" ? require24 : r2)[t3] }) : e3)(function(e3) {
  if (typeof require24 < "u") return require24.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var A13 = (e3, r2) => () => (r2 || e3((r2 = { exports: {} }).exports, r2), r2.exports);
var T11 = (e3, r2) => {
  for (var t3 in r2) f16(e3, t3, { get: r2[t3], enumerable: true });
};
var a16 = (e3, r2, t3, s26) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let d222 of m19(r2)) !x31.call(e3, d222) && d222 !== t3 && f16(e3, d222, { get: () => r2[d222], enumerable: !(s26 = l20(r2, d222)) || s26.enumerable });
  return e3;
};
var u24 = (e3, r2, t3) => (a16(e3, r2, "default"), t3 && a16(t3, r2, "default"));
var n29 = (e3, r2, t3) => (t3 = e3 != null ? c21(y21(e3)) : {}, a16(r2 || !e3 || !e3.__esModule ? f16(t3, "default", { value: e3, enumerable: true }) : t3, e3));
var i17 = A13((j15, p26) => {
  "use strict";
  var q18 = h19("which-typed-array");
  p26.exports = function(r2) {
    return !!q18(r2);
  };
});
var o24 = {};
T11(o24, { default: () => b23 });
var v21 = n29(i17());
u24(o24, n29(i17()));
var { default: _29, ...w11 } = v21;
var b23 = _29 !== void 0 ? _29 : w11;
var require25 = (n30) => {
  const e3 = (m21) => typeof m21.default < "u" ? m21.default : m21, c222 = (m21) => Object.assign({ __esModule: true }, m21);
  switch (n30) {
    case "is-arguments":
      return e3(is_arguments_exports);
    case "is-generator-function":
      return e3(is_generator_function_exports);
    case "which-typed-array":
      return e3(which_typed_array_exports);
    case "is-typed-array":
      return e3(is_typed_array_exports);
    default:
      throw new Error('module "' + n30 + '" not found');
  }
};
var N42 = Object.create;
var g26 = Object.defineProperty;
var q17 = Object.getOwnPropertyDescriptor;
var E14 = Object.getOwnPropertyNames;
var z4 = Object.getPrototypeOf;
var H22 = Object.prototype.hasOwnProperty;
var A14 = ((r2) => typeof require25 < "u" ? require25 : typeof Proxy < "u" ? new Proxy(r2, { get: (t3, n30) => (typeof require25 < "u" ? require25 : t3)[n30] }) : r2)(function(r2) {
  if (typeof require25 < "u") return require25.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var J3 = (r2, t3) => () => (t3 || r2((t3 = { exports: {} }).exports, t3), t3.exports);
var K2 = (r2, t3) => {
  for (var n30 in t3) g26(r2, n30, { get: t3[n30], enumerable: true });
};
var l21 = (r2, t3, n30, k32) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let s26 of E14(t3)) !H22.call(r2, s26) && s26 !== n30 && g26(r2, s26, { get: () => t3[s26], enumerable: !(k32 = q17(t3, s26)) || k32.enumerable });
  return r2;
};
var f17 = (r2, t3, n30) => (l21(r2, t3, "default"), n30 && l21(n30, t3, "default"));
var O12 = (r2, t3, n30) => (n30 = r2 != null ? N42(z4(r2)) : {}, l21(t3 || !r2 || !r2.__esModule ? g26(n30, "default", { value: r2, enumerable: true }) : n30, r2));
var m20 = J3((e3) => {
  "use strict";
  var L8 = A14("is-arguments"), Q2 = A14("is-generator-function"), a17 = A14("which-typed-array"), I8 = A14("is-typed-array");
  function u25(r2) {
    return r2.call.bind(r2);
  }
  var M42 = typeof BigInt < "u", U42 = typeof Symbol < "u", i18 = u25(Object.prototype.toString), R7 = u25(Number.prototype.valueOf), X3 = u25(String.prototype.valueOf), Y32 = u25(Boolean.prototype.valueOf);
  M42 && (W4 = u25(BigInt.prototype.valueOf));
  var W4;
  U42 && (h20 = u25(Symbol.prototype.valueOf));
  var h20;
  function c222(r2, t3) {
    if (typeof r2 != "object") return false;
    try {
      return t3(r2), true;
    } catch {
      return false;
    }
  }
  e3.isArgumentsObject = L8;
  e3.isGeneratorFunction = Q2;
  e3.isTypedArray = I8;
  function Z2(r2) {
    return typeof Promise < "u" && r2 instanceof Promise || r2 !== null && typeof r2 == "object" && typeof r2.then == "function" && typeof r2.catch == "function";
  }
  e3.isPromise = Z2;
  function $8(r2) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(r2) : I8(r2) || T12(r2);
  }
  e3.isArrayBufferView = $8;
  function rr(r2) {
    return a17(r2) === "Uint8Array";
  }
  e3.isUint8Array = rr;
  function er(r2) {
    return a17(r2) === "Uint8ClampedArray";
  }
  e3.isUint8ClampedArray = er;
  function tr(r2) {
    return a17(r2) === "Uint16Array";
  }
  e3.isUint16Array = tr;
  function nr(r2) {
    return a17(r2) === "Uint32Array";
  }
  e3.isUint32Array = nr;
  function ir2(r2) {
    return a17(r2) === "Int8Array";
  }
  e3.isInt8Array = ir2;
  function ar(r2) {
    return a17(r2) === "Int16Array";
  }
  e3.isInt16Array = ar;
  function or(r2) {
    return a17(r2) === "Int32Array";
  }
  e3.isInt32Array = or;
  function fr(r2) {
    return a17(r2) === "Float32Array";
  }
  e3.isFloat32Array = fr;
  function ur2(r2) {
    return a17(r2) === "Float64Array";
  }
  e3.isFloat64Array = ur2;
  function sr2(r2) {
    return a17(r2) === "BigInt64Array";
  }
  e3.isBigInt64Array = sr2;
  function yr2(r2) {
    return a17(r2) === "BigUint64Array";
  }
  e3.isBigUint64Array = yr2;
  function d222(r2) {
    return i18(r2) === "[object Map]";
  }
  d222.working = typeof Map < "u" && d222(/* @__PURE__ */ new Map());
  function cr(r2) {
    return typeof Map > "u" ? false : d222.working ? d222(r2) : r2 instanceof Map;
  }
  e3.isMap = cr;
  function p26(r2) {
    return i18(r2) === "[object Set]";
  }
  p26.working = typeof Set < "u" && p26(/* @__PURE__ */ new Set());
  function Ar(r2) {
    return typeof Set > "u" ? false : p26.working ? p26(r2) : r2 instanceof Set;
  }
  e3.isSet = Ar;
  function b24(r2) {
    return i18(r2) === "[object WeakMap]";
  }
  b24.working = typeof WeakMap < "u" && b24(/* @__PURE__ */ new WeakMap());
  function dr(r2) {
    return typeof WeakMap > "u" ? false : b24.working ? b24(r2) : r2 instanceof WeakMap;
  }
  e3.isWeakMap = dr;
  function w12(r2) {
    return i18(r2) === "[object WeakSet]";
  }
  w12.working = typeof WeakSet < "u" && w12(/* @__PURE__ */ new WeakSet());
  function pr2(r2) {
    return w12(r2);
  }
  e3.isWeakSet = pr2;
  function B8(r2) {
    return i18(r2) === "[object ArrayBuffer]";
  }
  B8.working = typeof ArrayBuffer < "u" && B8(new ArrayBuffer());
  function F10(r2) {
    return typeof ArrayBuffer > "u" ? false : B8.working ? B8(r2) : r2 instanceof ArrayBuffer;
  }
  e3.isArrayBuffer = F10;
  function S122(r2) {
    return i18(r2) === "[object DataView]";
  }
  S122.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && S122(new DataView(new ArrayBuffer(1), 0, 1));
  function T12(r2) {
    return typeof DataView > "u" ? false : S122.working ? S122(r2) : r2 instanceof DataView;
  }
  e3.isDataView = T12;
  var j15 = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function y222(r2) {
    return i18(r2) === "[object SharedArrayBuffer]";
  }
  function V32(r2) {
    return typeof j15 > "u" ? false : (typeof y222.working > "u" && (y222.working = y222(new j15())), y222.working ? y222(r2) : r2 instanceof j15);
  }
  e3.isSharedArrayBuffer = V32;
  function br(r2) {
    return i18(r2) === "[object AsyncFunction]";
  }
  e3.isAsyncFunction = br;
  function Br(r2) {
    return i18(r2) === "[object Map Iterator]";
  }
  e3.isMapIterator = Br;
  function Sr(r2) {
    return i18(r2) === "[object Set Iterator]";
  }
  e3.isSetIterator = Sr;
  function lr2(r2) {
    return i18(r2) === "[object Generator]";
  }
  e3.isGeneratorObject = lr2;
  function gr(r2) {
    return i18(r2) === "[object WebAssembly.Module]";
  }
  e3.isWebAssemblyCompiledModule = gr;
  function P16(r2) {
    return c222(r2, R7);
  }
  e3.isNumberObject = P16;
  function v222(r2) {
    return c222(r2, X3);
  }
  e3.isStringObject = v222;
  function x322(r2) {
    return c222(r2, Y32);
  }
  e3.isBooleanObject = x322;
  function D8(r2) {
    return M42 && c222(r2, W4);
  }
  e3.isBigIntObject = D8;
  function C7(r2) {
    return U42 && c222(r2, h20);
  }
  e3.isSymbolObject = C7;
  function jr(r2) {
    return P16(r2) || v222(r2) || x322(r2) || D8(r2) || C7(r2);
  }
  e3.isBoxedPrimitive = jr;
  function wr(r2) {
    return typeof Uint8Array < "u" && (F10(r2) || V32(r2));
  }
  e3.isAnyArrayBuffer = wr;
  ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(r2) {
    Object.defineProperty(e3, r2, { enumerable: false, value: function() {
      throw new Error(r2 + " is not supported in userland");
    } });
  });
});
var o25 = {};
K2(o25, { default: () => ie, isAnyArrayBuffer: () => te, isArgumentsObject: () => mr, isArrayBuffer: () => Er, isArrayBufferView: () => Mr, isAsyncFunction: () => Jr, isBigInt64Array: () => Dr, isBigIntObject: () => $r, isBigUint64Array: () => Cr, isBooleanObject: () => Zr, isBoxedPrimitive: () => ee, isDataView: () => zr, isFloat32Array: () => vr, isFloat64Array: () => xr, isGeneratorFunction: () => kr, isGeneratorObject: () => Qr, isInt16Array: () => Vr, isInt32Array: () => Pr, isInt8Array: () => Tr, isMap: () => Gr, isMapIterator: () => Kr, isNumberObject: () => Xr, isPromise: () => Ir, isSet: () => _r, isSetIterator: () => Lr, isSharedArrayBuffer: () => Hr, isStringObject: () => Yr, isSymbolObject: () => re, isTypedArray: () => Or, isUint16Array: () => hr, isUint32Array: () => Fr, isUint8Array: () => Ur, isUint8ClampedArray: () => Wr, isWeakMap: () => Nr, isWeakSet: () => qr, isWebAssemblyCompiledModule: () => Rr });
var _30 = O12(m20());
f17(o25, O12(m20()));
var { isArgumentsObject: mr, isGeneratorFunction: kr, isTypedArray: Or, isPromise: Ir, isArrayBufferView: Mr, isUint8Array: Ur, isUint8ClampedArray: Wr, isUint16Array: hr, isUint32Array: Fr, isInt8Array: Tr, isInt16Array: Vr, isInt32Array: Pr, isFloat32Array: vr, isFloat64Array: xr, isBigInt64Array: Dr, isBigUint64Array: Cr, isMap: Gr, isSet: _r, isWeakMap: Nr, isWeakSet: qr, isArrayBuffer: Er, isDataView: zr, isSharedArrayBuffer: Hr, isAsyncFunction: Jr, isMapIterator: Kr, isSetIterator: Lr, isGeneratorObject: Qr, isWebAssemblyCompiledModule: Rr, isNumberObject: Xr, isStringObject: Yr, isBooleanObject: Zr, isBigIntObject: $r, isSymbolObject: re, isBoxedPrimitive: ee, isAnyArrayBuffer: te } = _30;
var { default: G11, ...ne } = _30;
var ie = G11 !== void 0 ? G11 : ne;

// node_shims/helpers/util.js
var exports6 = { types: types_exports };
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
  var keys = Object.keys(obj);
  var descriptors = {};
  for (var i18 = 0; i18 < keys.length; i18++) {
    descriptors[keys[i18]] = Object.getOwnPropertyDescriptor(obj, keys[i18]);
  }
  return descriptors;
};
var formatRegExp = /%[sdj%]/g;
exports6.format = function(f18) {
  if (!isString(f18)) {
    var objects = [];
    for (var i18 = 0; i18 < arguments.length; i18++) {
      objects.push(inspect(arguments[i18]));
    }
    return objects.join(" ");
  }
  var i18 = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f18).replace(formatRegExp, function(x34) {
    if (x34 === "%%") return "%";
    if (i18 >= len) return x34;
    switch (x34) {
      case "%s":
        return String(args[i18++]);
      case "%d":
        return Number(args[i18++]);
      case "%j":
        try {
          return JSON.stringify(args[i18++]);
        } catch (_31) {
          return "[Circular]";
        }
      default:
        return x34;
    }
  });
  for (var x33 = args[i18]; i18 < len; x33 = args[++i18]) {
    if (isNull(x33) || !isObject(x33)) {
      str += " " + x33;
    } else {
      str += " " + inspect(x33);
    }
  }
  return str;
};
exports6.deprecate = function(fn, msg) {
  if (typeof process_default !== "undefined" && process_default.noDeprecation === true) {
    return fn;
  }
  if (typeof process_default === "undefined") {
    return function() {
      return exports6.deprecate(fn, msg).apply(this, arguments);
    };
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process_default.throwDeprecation) {
        throw new Error(msg);
      } else if (process_default.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
};
var debugs = {};
var debugEnvRegex = /^$/;
if (process_default.env.NODE_DEBUG) {
  debugEnv = process_default.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
  debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
}
var debugEnv;
exports6.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid2 = process_default.pid;
      debugs[set] = function() {
        var msg = exports6.format.apply(exports6, arguments);
        console.error("%s %d: %s", set, pid2, msg);
      };
    } else {
      debugs[set] = function() {
      };
    }
  }
  return debugs[set];
};
function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    exports6._extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports6.inspect = inspect;
inspect.colors = {
  "bold": [1, 22],
  "italic": [3, 23],
  "underline": [4, 24],
  "inverse": [7, 27],
  "white": [37, 39],
  "grey": [90, 39],
  "black": [30, 39],
  "blue": [34, 39],
  "cyan": [36, 39],
  "green": [32, 39],
  "magenta": [35, 39],
  "red": [31, 39],
  "yellow": [33, 39]
};
inspect.styles = {
  "special": "cyan",
  "number": "yellow",
  "boolean": "yellow",
  "undefined": "grey",
  "null": "bold",
  "string": "green",
  "date": "magenta",
  // "name": intentionally not styling
  "regexp": "red"
};
function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];
  if (style) {
    return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
  } else {
    return str;
  }
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  array.forEach(function(val, idx) {
    hash[val] = true;
  });
  return hash;
}
function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports6.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);
  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }
  if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
    return formatError(value);
  }
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ": " + value.name : "";
      return ctx.stylize("[Function" + name + "]", "special");
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), "date");
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base = "", array = false, braces = ["{", "}"];
  if (isArray(value)) {
    array = true;
    braces = ["[", "]"];
  }
  if (isFunction(value)) {
    var n30 = value.name ? ": " + value.name : "";
    base = " [Function" + n30 + "]";
  }
  if (isRegExp(value)) {
    base = " " + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base = " " + Date.prototype.toUTCString.call(value);
  }
  if (isError(value)) {
    base = " " + formatError(value);
  }
  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    } else {
      return ctx.stylize("[Object]", "special");
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString(value)) {
    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull(value))
    return ctx.stylize("null", "null");
}
function formatError(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i18 = 0, l23 = value.length; i18 < l23; ++i18) {
    if (hasOwnProperty(value, String(i18))) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        String(i18),
        true
      ));
    } else {
      output.push("");
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(
        ctx,
        value,
        recurseTimes,
        visibleKeys,
        key,
        true
      ));
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize("[Getter/Setter]", "special");
    } else {
      str = ctx.stylize("[Getter]", "special");
    }
  } else {
    if (desc.set) {
      str = ctx.stylize("[Setter]", "special");
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = "[" + key + "]";
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf("\n") > -1) {
        if (array) {
          str = str.split("\n").map(function(line) {
            return "  " + line;
          }).join("\n").slice(2);
        } else {
          str = "\n" + str.split("\n").map(function(line) {
            return "   " + line;
          }).join("\n");
        }
      }
    } else {
      str = ctx.stylize("[Circular]", "special");
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify("" + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, "name");
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, "string");
    }
  }
  return name + ": " + str;
}
function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf("\n") >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  if (length > 60) {
    return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
  }
  return braces[0] + base + " " + output.join(", ") + " " + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar);
}
exports6.isArray = isArray;
function isBoolean(arg) {
  return typeof arg === "boolean";
}
exports6.isBoolean = isBoolean;
function isNull(arg) {
  return arg === null;
}
exports6.isNull = isNull;
function isNullOrUndefined(arg) {
  return arg == null;
}
exports6.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
  return typeof arg === "number";
}
exports6.isNumber = isNumber;
function isString(arg) {
  return typeof arg === "string";
}
exports6.isString = isString;
function isSymbol(arg) {
  return typeof arg === "symbol";
}
exports6.isSymbol = isSymbol;
function isUndefined(arg) {
  return arg === void 0;
}
exports6.isUndefined = isUndefined;
function isRegExp(re2) {
  return isObject(re2) && objectToString(re2) === "[object RegExp]";
}
exports6.isRegExp = isRegExp;
exports6.types.isRegExp = isRegExp;
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
exports6.isObject = isObject;
function isDate(d23) {
  return isObject(d23) && objectToString(d23) === "[object Date]";
}
exports6.isDate = isDate;
exports6.types.isDate = isDate;
function isError(e3) {
  return isObject(e3) && (objectToString(e3) === "[object Error]" || e3 instanceof Error);
}
exports6.isError = isError;
exports6.types.isNativeError = isError;
function isFunction(arg) {
  return typeof arg === "function";
}
exports6.isFunction = isFunction;
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
  typeof arg === "undefined";
}
exports6.isPrimitive = isPrimitive;
function objectToString(o26) {
  return Object.prototype.toString.call(o26);
}
function pad(n30) {
  return n30 < 10 ? "0" + n30.toString(10) : n30.toString(10);
}
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function timestamp() {
  var d23 = /* @__PURE__ */ new Date();
  var time = [
    pad(d23.getHours()),
    pad(d23.getMinutes()),
    pad(d23.getSeconds())
  ].join(":");
  return [d23.getDate(), months[d23.getMonth()], time].join(" ");
}
exports6.log = function() {
  console.log("%s - %s", timestamp(), exports6.format.apply(exports6, arguments));
};
if (typeof Object.create === "function") {
  exports6.inherits = function(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  exports6.inherits = function(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
exports6._extend = function(origin, add) {
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i18 = keys.length;
  while (i18--) {
    origin[keys[i18]] = add[keys[i18]];
  }
  return origin;
};
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
exports6.promisify = function promisify(original) {
  if (typeof original !== "function")
    throw new TypeError('The "original" argument must be of type Function');
  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== "function") {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return fn;
  }
  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function(resolve3, reject) {
      promiseResolve = resolve3;
      promiseReject = reject;
    });
    var args = [];
    for (var i18 = 0; i18 < arguments.length; i18++) {
      args.push(arguments[i18]);
    }
    args.push(function(err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });
    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }
    return promise;
  }
  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
};
exports6.promisify.custom = kCustomPromisifiedSymbol;
function callbackifyOnRejected(reason, cb) {
  if (!reason) {
    var newReason = new Error("Promise was rejected with a falsy value");
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}
function callbackify(original) {
  if (typeof original !== "function") {
    throw new TypeError('The "original" argument must be of type Function');
  }
  function callbackified() {
    var args = [];
    for (var i18 = 0; i18 < arguments.length; i18++) {
      args.push(arguments[i18]);
    }
    var maybeCb = args.pop();
    if (typeof maybeCb !== "function") {
      throw new TypeError("The last argument must be of type Function");
    }
    var self2 = this;
    var cb = function() {
      return maybeCb.apply(self2, arguments);
    };
    original.apply(this, args).then(
      function(ret) {
        process_default.nextTick(cb.bind(null, null, ret));
      },
      function(rej) {
        process_default.nextTick(callbackifyOnRejected.bind(null, rej, cb));
      }
    );
  }
  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(
    callbackified,
    getOwnPropertyDescriptors(original)
  );
  return callbackified;
}
exports6.callbackify = callbackify;
var util_default6 = exports6;

// node_shims/util.js
var exported6 = {
  _extend: globalThis._extend,
  callbackify: globalThis.callbackify,
  debug: globalThis.debug,
  debuglog: globalThis.debuglog,
  deprecate: globalThis.deprecate,
  format: globalThis.format,
  formatWithOptions: globalThis.formatWithOptions,
  getSystemErrorName: globalThis.getSystemErrorName,
  inspect: globalThis.inspect,
  isArray: globalThis.isArray,
  isBoolean: globalThis.isBoolean,
  isDate: globalThis.isDate,
  isDeepStrictEqual: globalThis.isDeepStrictEqual,
  isError: globalThis.isError,
  isFunction: globalThis.isFunction,
  isNull: globalThis.isNull,
  isNullOrUndefined: globalThis.isNullOrUndefined,
  isNumber: globalThis.isNumber,
  isObject: globalThis.isObject,
  isPrimitive: globalThis.isPrimitive,
  isRegExp: globalThis.isRegExp,
  isString: globalThis.isString,
  isSymbol: globalThis.isSymbol,
  isUndefined: globalThis.isUndefined,
  log: globalThis.log,
  parseArgs: globalThis.parseArgs,
  promisify: globalThis.promisify,
  stripVTControlCharacters: globalThis.stripVTControlCharacters,
  TextDecoder: globalThis.TextDecoder,
  TextEncoder: globalThis.TextEncoder,
  toUSVString: globalThis.toUSVString,
  ...util_default6,
  types: {},
  isBuffer: (arg) => arg instanceof Buffer3
};
var exportedDefault4 = exported6;
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
  exported6 = await import("node:util");
  exportedDefault4 = exported6.default;
}
var {
  _extend,
  callbackify: callbackify2,
  debug,
  debuglog,
  deprecate,
  format: format2,
  formatWithOptions,
  getSystemErrorName,
  inherits,
  inspect: inspect2,
  isArray: isArray2,
  isBoolean: isBoolean2,
  isBuffer: isBuffer2,
  isDate: isDate2,
  isDeepStrictEqual,
  isError: isError2,
  isFunction: isFunction2,
  isNull: isNull2,
  isNullOrUndefined: isNullOrUndefined2,
  isNumber: isNumber2,
  isObject: isObject2,
  isPrimitive: isPrimitive2,
  isRegExp: isRegExp2,
  isString: isString2,
  isSymbol: isSymbol2,
  isUndefined: isUndefined2,
  log,
  parseArgs,
  promisify: promisify2,
  stripVTControlCharacters,
  TextDecoder: TextDecoder2,
  TextEncoder,
  toUSVString,
  types
} = exported6;
var util_default7 = exportedDefault4;

// memfs-3.0.4/internal/buffer.ts
function bufferV0P12Ponyfill(arg0, ...args) {
  return new Buffer3(arg0, ...args);
}
var bufferAllocUnsafe = Buffer3.allocUnsafe || bufferV0P12Ponyfill;
var bufferFrom = Buffer3.from || bufferV0P12Ponyfill;

// memfs-3.0.4/constants.ts
var constants3 = {
  O_RDONLY: 0,
  O_WRONLY: 1,
  O_RDWR: 2,
  S_IFMT: 61440,
  S_IFREG: 32768,
  S_IFDIR: 16384,
  S_IFCHR: 8192,
  S_IFBLK: 24576,
  S_IFIFO: 4096,
  S_IFLNK: 40960,
  S_IFSOCK: 49152,
  O_CREAT: 64,
  O_EXCL: 128,
  O_NOCTTY: 256,
  O_TRUNC: 512,
  O_APPEND: 1024,
  O_DIRECTORY: 65536,
  O_NOATIME: 262144,
  O_NOFOLLOW: 131072,
  O_SYNC: 1052672,
  O_DIRECT: 16384,
  O_NONBLOCK: 2048,
  S_IRWXU: 448,
  S_IRUSR: 256,
  S_IWUSR: 128,
  S_IXUSR: 64,
  S_IRWXG: 56,
  S_IRGRP: 32,
  S_IWGRP: 16,
  S_IXGRP: 8,
  S_IRWXO: 7,
  S_IROTH: 4,
  S_IWOTH: 2,
  S_IXOTH: 1,
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  UV_FS_SYMLINK_DIR: 1,
  UV_FS_SYMLINK_JUNCTION: 2,
  UV_FS_COPYFILE_EXCL: 1,
  UV_FS_COPYFILE_FICLONE: 2,
  UV_FS_COPYFILE_FICLONE_FORCE: 4,
  COPYFILE_EXCL: 1,
  COPYFILE_FICLONE: 2,
  COPYFILE_FICLONE_FORCE: 4
};

// memfs-3.0.4/Stats.ts
var { S_IFMT, S_IFDIR, S_IFREG, S_IFBLK, S_IFCHR, S_IFLNK, S_IFIFO, S_IFSOCK } = constants3;
var Stats = class _Stats {
  static build(node, bigint = false) {
    const stats = new _Stats();
    const { uid, gid, atime, mtime, ctime } = node;
    const getStatNumber = !bigint ? (number) => number : BigInt;
    stats.uid = getStatNumber(uid);
    stats.gid = getStatNumber(gid);
    stats.rdev = getStatNumber(0);
    stats.blksize = getStatNumber(4096);
    stats.ino = getStatNumber(node.ino);
    stats.size = getStatNumber(node.getSize());
    stats.blocks = getStatNumber(1);
    stats.atime = atime;
    stats.mtime = mtime;
    stats.ctime = ctime;
    stats.birthtime = ctime;
    stats.atimeMs = getStatNumber(atime.getTime());
    stats.mtimeMs = getStatNumber(mtime.getTime());
    const ctimeMs = getStatNumber(ctime.getTime());
    stats.ctimeMs = ctimeMs;
    stats.birthtimeMs = ctimeMs;
    stats.dev = getStatNumber(0);
    stats.mode = getStatNumber(node.mode);
    stats.nlink = getStatNumber(node.nlink);
    return stats;
  }
  uid;
  gid;
  rdev;
  blksize;
  ino;
  size;
  blocks;
  atime;
  mtime;
  ctime;
  birthtime;
  atimeMs;
  mtimeMs;
  ctimeMs;
  birthtimeMs;
  dev;
  mode;
  nlink;
  _checkModeProperty(property) {
    return (Number(this.mode) & S_IFMT) === property;
  }
  isDirectory() {
    return this._checkModeProperty(S_IFDIR);
  }
  isFile() {
    return this._checkModeProperty(S_IFREG);
  }
  isBlockDevice() {
    return this._checkModeProperty(S_IFBLK);
  }
  isCharacterDevice() {
    return this._checkModeProperty(S_IFCHR);
  }
  isSymbolicLink() {
    return this._checkModeProperty(S_IFLNK);
  }
  isFIFO() {
    return this._checkModeProperty(S_IFIFO);
  }
  isSocket() {
    return this._checkModeProperty(S_IFSOCK);
  }
};
var Stats_default = Stats;

// memfs-3.0.4/node.ts
var { S_IFMT: S_IFMT2, S_IFDIR: S_IFDIR2, S_IFREG: S_IFREG2, S_IFBLK: S_IFBLK2, S_IFCHR: S_IFCHR2, S_IFLNK: S_IFLNK2, S_IFIFO: S_IFIFO2, S_IFSOCK: S_IFSOCK2, O_APPEND } = constants3;
var SEP = "/";
var Node = class extends EventEmitter2 {
  // i-node number.
  ino;
  // User ID and group ID.
  uid = process_default.getuid();
  gid = process_default.getgid();
  atime = /* @__PURE__ */ new Date();
  mtime = /* @__PURE__ */ new Date();
  ctime = /* @__PURE__ */ new Date();
  // data: string = '';
  buf;
  perm = 438;
  // Permissions `chmod`, `fchmod`
  mode = S_IFREG2;
  // S_IFDIR, S_IFREG, etc.. (file by default?)
  // Number of hard links pointing at this Node.
  nlink = 1;
  // Steps to another node, if this node is a symlink.
  symlink;
  constructor(ino, perm = 438) {
    super();
    this.perm = perm;
    this.mode |= perm;
    this.ino = ino;
  }
  getString(encoding = "utf8") {
    return this.getBuffer().toString(encoding);
  }
  setString(str) {
    this.buf = bufferFrom(str, "utf8");
    this.touch();
  }
  getBuffer() {
    if (!this.buf) this.setBuffer(bufferAllocUnsafe(0));
    return bufferFrom(this.buf);
  }
  setBuffer(buf) {
    this.buf = bufferFrom(buf);
    this.touch();
  }
  getSize() {
    return this.buf ? this.buf.length : 0;
  }
  setModeProperty(property) {
    this.mode = this.mode & ~S_IFMT2 | property;
  }
  setIsFile() {
    this.setModeProperty(S_IFREG2);
  }
  setIsDirectory() {
    this.setModeProperty(S_IFDIR2);
  }
  setIsSymlink() {
    this.setModeProperty(S_IFLNK2);
  }
  isFile() {
    return (this.mode & S_IFMT2) === S_IFREG2;
  }
  isDirectory() {
    return (this.mode & S_IFMT2) === S_IFDIR2;
  }
  isSymlink() {
    return (this.mode & S_IFMT2) === S_IFLNK2;
  }
  makeSymlink(steps) {
    this.symlink = steps;
    this.setIsSymlink();
  }
  write(buf, off = 0, len = buf.length, pos = 0) {
    if (!this.buf) this.buf = bufferAllocUnsafe(0);
    if (pos + len > this.buf.length) {
      const newBuf = bufferAllocUnsafe(pos + len);
      this.buf.copy(newBuf, 0, 0, this.buf.length);
      this.buf = newBuf;
    }
    buf.copy(this.buf, pos, off, off + len);
    this.touch();
    return len;
  }
  // Returns the number of bytes read.
  read(buf, off = 0, len = buf.byteLength, pos = 0) {
    if (!this.buf) this.buf = bufferAllocUnsafe(0);
    let actualLen = len;
    if (actualLen > buf.byteLength) {
      actualLen = buf.byteLength;
    }
    if (actualLen + pos > this.buf.length) {
      actualLen = this.buf.length - pos;
    }
    this.buf.copy(buf, off, pos, pos + actualLen);
    return actualLen;
  }
  truncate(len = 0) {
    if (!len) this.buf = bufferAllocUnsafe(0);
    else {
      if (!this.buf) this.buf = bufferAllocUnsafe(0);
      if (len <= this.buf.length) {
        this.buf = this.buf.slice(0, len);
      } else {
        const buf = bufferAllocUnsafe(0);
        this.buf.copy(buf);
        buf.fill(0, len);
      }
    }
    this.touch();
  }
  chmod(perm) {
    this.perm = perm;
    this.mode = this.mode & ~511 | perm;
    this.touch();
  }
  chown(uid, gid) {
    this.uid = uid;
    this.gid = gid;
    this.touch();
  }
  touch() {
    this.mtime = /* @__PURE__ */ new Date();
    this.emit("change", this);
  }
  canRead(uid = process_default.getuid(), gid = process_default.getgid()) {
    if (this.perm & 4 /* IROTH */) {
      return true;
    }
    if (gid === this.gid) {
      if (this.perm & 32 /* IRGRP */) {
        return true;
      }
    }
    if (uid === this.uid) {
      if (this.perm & 256 /* IRUSR */) {
        return true;
      }
    }
    return false;
  }
  canWrite(uid = process_default.getuid(), gid = process_default.getgid()) {
    if (this.perm & 2 /* IWOTH */) {
      return true;
    }
    if (gid === this.gid) {
      if (this.perm & 16 /* IWGRP */) {
        return true;
      }
    }
    if (uid === this.uid) {
      if (this.perm & 128 /* IWUSR */) {
        return true;
      }
    }
    return false;
  }
  del() {
    this.emit("delete", this);
  }
  toJSON() {
    return {
      ino: this.ino,
      uid: this.uid,
      gid: this.gid,
      atime: this.atime.getTime(),
      mtime: this.mtime.getTime(),
      ctime: this.ctime.getTime(),
      perm: this.perm,
      mode: this.mode,
      nlink: this.nlink,
      symlink: this.symlink,
      data: this.getString()
    };
  }
};
var Link = class _Link extends EventEmitter2 {
  vol;
  parent;
  children = {};
  // Path to this node as Array: ['usr', 'bin', 'node'].
  steps = [];
  // "i-node" of this hard link.
  node;
  // "i-node" number of the node.
  ino = 0;
  // Number of children.
  length = 0;
  constructor(vol2, parent, name) {
    super();
    this.vol = vol2;
    this.parent = parent;
    this.steps = parent ? parent.steps.concat([name]) : [name];
  }
  setNode(node) {
    this.node = node;
    this.ino = node.ino;
  }
  getNode() {
    return this.node;
  }
  createChild(name, node = this.vol.createNode()) {
    const link2 = new _Link(this.vol, this, name);
    link2.setNode(node);
    if (node.isDirectory()) {
    }
    this.setChild(name, link2);
    return link2;
  }
  setChild(name, link2 = new _Link(this.vol, this, name)) {
    this.children[name] = link2;
    link2.parent = this;
    this.length++;
    this.emit("child:add", link2, this);
    return link2;
  }
  deleteChild(link2) {
    delete this.children[link2.getName()];
    this.length--;
    this.emit("child:delete", link2, this);
  }
  getChild(name) {
    if (Object.hasOwnProperty.call(this.children, name)) {
      return this.children[name];
    }
  }
  getPath() {
    return this.steps.join(SEP);
  }
  getName() {
    return this.steps[this.steps.length - 1];
  }
  // del() {
  //     const parent = this.parent;
  //     if(parent) {
  //         parent.deleteChild(link);
  //     }
  //     this.parent = null;
  //     this.vol = null;
  // }
  /**
   * Walk the tree path and return the `Link` at that location, if any.
   * @param steps {string[]} Desired location.
   * @param stop {number} Max steps to go into.
   * @param i {number} Current step in the `steps` array.
   *
   * @return {Link|null}
   */
  walk(steps, stop = steps.length, i18 = 0) {
    if (i18 >= steps.length) return this;
    if (i18 >= stop) return this;
    const step = steps[i18];
    const link2 = this.getChild(step);
    if (!link2) return null;
    return link2.walk(steps, stop, i18 + 1);
  }
  toJSON() {
    return {
      steps: this.steps,
      ino: this.ino,
      children: Object.keys(this.children)
    };
  }
};
var File2 = class {
  fd;
  /**
   * Hard link that this file opened.
   * @type {any}
   */
  link;
  /**
   * Reference to a `Node`.
   * @type {Node}
   */
  node;
  /**
   * A cursor/offset position in a file, where data will be written on write.
   * User can "seek" this position.
   */
  position = 0;
  // Flags used when opening the file.
  flags;
  /**
   * Open a Link-Node pair. `node` is provided separately as that might be a different node
   * rather the one `link` points to, because it might be a symlink.
   * @param link
   * @param node
   * @param flags
   * @param fd
   */
  constructor(link2, node, flags, fd) {
    this.link = link2;
    this.node = node;
    this.flags = flags;
    this.fd = fd;
  }
  getString(encoding = "utf8") {
    return this.node.getString();
  }
  setString(str) {
    this.node.setString(str);
  }
  getBuffer() {
    return this.node.getBuffer();
  }
  setBuffer(buf) {
    this.node.setBuffer(buf);
  }
  getSize() {
    return this.node.getSize();
  }
  truncate(len) {
    this.node.truncate(len);
  }
  seekTo(position) {
    this.position = position;
  }
  stats() {
    return Stats_default.build(this.node);
  }
  write(buf, offset = 0, length = buf.length, position) {
    if (typeof position !== "number") position = this.position;
    if (this.flags & O_APPEND) position = this.getSize();
    const bytes = this.node.write(buf, offset, length, position);
    this.position = position + bytes;
    return bytes;
  }
  read(buf, offset = 0, length = buf.byteLength, position) {
    if (typeof position !== "number") position = this.position;
    const bytes = this.node.read(buf, offset, length, position);
    this.position = position + bytes;
    return bytes;
  }
  chmod(perm) {
    this.node.chmod(perm);
  }
  chown(uid, gid) {
    this.node.chown(uid, gid);
  }
};

// node_shims/assert.js
var exported7 = {
  AssertionError: class AssertionError extends Error {
  },
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
    let [actual, expected, message2] = args;
    if (args.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (!Object.is(actual, expected)) {
      var obj = {
        actual,
        expected,
        message: message2,
        operator: "strictEqual",
        stackStartFn: strictEqual
      };
      throw new exported7.AssertionError(obj);
    }
  },
  equal,
  notDeepEqual,
  ok,
  throws
};
var assert = (boolValue, message2) => {
  if (!boolValue) {
    throw new Error(message2);
  }
};
var exportedDefault5 = Object.assign(assert, exported7);
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
  exported7 = await import("node:assert");
  exportedDefault5 = exported7.default;
}
var {
  AssertionError: AssertionError2,
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
  throws
} = exported7;

// memfs-3.0.4/internal/errors.ts
var assert2 = (boolValue, message2) => {
  if (!boolValue) {
    throw new Error2(message2);
  }
};
var kCode = typeof Symbol === "undefined" ? "_kCode" : Symbol("code");
var messages = {};
function makeNodeError(Base) {
  return class NodeError extends Base {
    constructor(key, ...args) {
      super(message(key, args));
      this.code = key;
      this[kCode] = key;
      this.name = `${super.name} [${this[kCode]}]`;
    }
  };
}
var AssertionError3 = class extends globalThis.Error {
  generatedMessage;
  name;
  code;
  actual;
  expected;
  operator;
  constructor(options) {
    if (typeof options !== "object" || options === null) {
      throw new globalThis.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
    }
    if (options.message) {
      super(options.message);
    } else {
      super(
        `${inspect2(options.actual).slice(0, 128)} ${options.operator} ${inspect2(options.expected).slice(0, 128)}`
      );
    }
    this.generatedMessage = !options.message;
    this.name = "AssertionError [ERR_ASSERTION]";
    this.code = "ERR_ASSERTION";
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    Error2.captureStackTrace(this, options.stackStartFunction);
  }
};
function message(key, args) {
  strictEqual(typeof key, "string");
  const msg = messages[key];
  assert2(msg, `An invalid error message key was used: ${key}.`);
  let fmt;
  if (typeof msg === "function") {
    fmt = msg;
  } else {
    fmt = format2;
    if (args === void 0 || args.length === 0) return msg;
    args.unshift(msg);
  }
  return String(fmt.apply(null, args));
}
function E15(sym, val) {
  messages[sym] = typeof val === "function" ? val : String(val);
}
var Error2 = makeNodeError(globalThis.Error);
var TypeError2 = makeNodeError(globalThis.TypeError);
var RangeError2 = makeNodeError(globalThis.RangeError);
E15("ERR_ARG_NOT_ITERABLE", "%s must be iterable");
E15("ERR_ASSERTION", "%s");
E15("ERR_BUFFER_OUT_OF_BOUNDS", bufferOutOfBounds);
E15("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received");
E15("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s");
E15("ERR_CPU_USAGE", "Unable to obtain cpu usage %s");
E15("ERR_DNS_SET_SERVERS_FAILED", (err, servers) => `c-ares failed to set servers: "${err}" [${servers}]`);
E15("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value");
E15("ERR_ENCODING_NOT_SUPPORTED", (enc) => `The "${enc}" encoding is not supported`);
E15("ERR_ENCODING_INVALID_ENCODED_DATA", (enc) => `The encoded data was not valid for encoding ${enc}`);
E15("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client");
E15("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s");
E15("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding");
E15("ERR_INDEX_OUT_OF_RANGE", "Index out of range");
E15("ERR_INVALID_ARG_TYPE", invalidArgType);
E15("ERR_INVALID_ARRAY_LENGTH", (name, len, actual) => {
  strictEqual(typeof actual, "number");
  return `The array "${name}" (length ${actual}) must be of length ${len}.`;
});
E15("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s");
E15("ERR_INVALID_CALLBACK", "Callback must be a function");
E15("ERR_INVALID_CHAR", "Invalid character in %s");
E15("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column");
E15("ERR_INVALID_FD", '"fd" must be a positive integer: %s');
E15("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s');
E15("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
E15("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent");
E15("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s");
E15("ERR_INVALID_OPT_VALUE", (name, value) => {
  return `The value "${String(value)}" is invalid for option "${name}"`;
});
E15("ERR_INVALID_OPT_VALUE_ENCODING", (value) => `The value "${String(value)}" is invalid for option "encoding"`);
E15("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL');
E15("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s");
E15("ERR_INVALID_THIS", 'Value of "this" must be of type %s');
E15("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple");
E15("ERR_INVALID_URL", "Invalid URL: %s");
E15("ERR_INVALID_URL_SCHEME", (expected) => `The URL must be ${oneOf(expected, "scheme")}`);
E15("ERR_IPC_CHANNEL_CLOSED", "Channel closed");
E15("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected");
E15("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe");
E15("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks");
E15("ERR_MISSING_ARGS", missingArgs);
E15("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
E15("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function");
E15("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object");
E15("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support");
E15("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported");
E15("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s");
E15("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound");
E15("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536");
E15("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6");
E15("ERR_SOCKET_CANNOT_SEND", "Unable to send data");
E15("ERR_SOCKET_CLOSED", "Socket is closed");
E15("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running");
E15("ERR_STDERR_CLOSE", "process.stderr cannot be closed");
E15("ERR_STDOUT_CLOSE", "process.stdout cannot be closed");
E15("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode");
E15("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s");
E15("ERR_TLS_DH_PARAM_SIZE", (size) => `DH parameter size ${size} is less than 2048`);
E15("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout");
E15("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate");
E15("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext');
E15("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected");
E15("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming");
E15("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0");
E15("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s");
E15("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s");
E15("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type");
E15("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type");
E15("ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl");
function invalidArgType(name, expected, actual) {
  assert2(name, "name is required");
  let determiner;
  if (expected.includes("not ")) {
    determiner = "must not be";
    expected = expected.split("not ")[1];
  } else {
    determiner = "must be";
  }
  let msg;
  if (Array.isArray(name)) {
    const names = name.map((val) => `"${val}"`).join(", ");
    msg = `The ${names} arguments ${determiner} ${oneOf(expected, "type")}`;
  } else if (name.includes(" argument")) {
    msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
  } else {
    const type = name.includes(".") ? "property" : "argument";
    msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
  }
  if (arguments.length >= 3) {
    msg += `. Received type ${actual !== null ? typeof actual : "null"}`;
  }
  return msg;
}
function missingArgs(...args) {
  assert2(args.length > 0, "At least one arg needs to be specified");
  let msg = "The ";
  const len = args.length;
  args = args.map((a17) => `"${a17}"`);
  switch (len) {
    case 1:
      msg += `${args[0]} argument`;
      break;
    case 2:
      msg += `${args[0]} and ${args[1]} arguments`;
      break;
    default:
      msg += args.slice(0, len - 1).join(", ");
      msg += `, and ${args[len - 1]} arguments`;
      break;
  }
  return `${msg} must be specified`;
}
function oneOf(expected, thing) {
  assert2(expected, "expected is required");
  assert2(typeof thing === "string", "thing is required");
  if (Array.isArray(expected)) {
    const len = expected.length;
    assert2(len > 0, "At least one expected value needs to be specified");
    expected = expected.map((i18) => String(i18));
    if (len > 2) {
      return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
    } else if (len === 2) {
      return `one of ${thing} ${expected[0]} or ${expected[1]}`;
    } else {
      return `of ${thing} ${expected[0]}`;
    }
  } else {
    return `of ${thing} ${String(expected)}`;
  }
}
function bufferOutOfBounds(name, isWriting) {
  if (isWriting) {
    return "Attempt to write outside buffer bounds";
  } else {
    return `"${name}" is outside of buffer bounds`;
  }
}

// memfs-3.0.4/encoding.ts
var ENCODING_UTF8 = "utf8";
function assertEncoding(encoding) {
  if (encoding && !Buffer3.isEncoding(encoding)) throw new TypeError2("ERR_INVALID_OPT_VALUE_ENCODING", encoding);
}
function strToEncoding(str, encoding) {
  if (!encoding || encoding === ENCODING_UTF8) return str;
  if (encoding === "buffer") return new Buffer3(str);
  return new Buffer3(str).toString(encoding);
}

// memfs-3.0.4/Dirent.ts
var { S_IFMT: S_IFMT3, S_IFDIR: S_IFDIR3, S_IFREG: S_IFREG3, S_IFBLK: S_IFBLK3, S_IFCHR: S_IFCHR3, S_IFLNK: S_IFLNK3, S_IFIFO: S_IFIFO3, S_IFSOCK: S_IFSOCK3 } = constants3;
var Dirent = class _Dirent {
  static build(link2, encoding) {
    const dirent = new _Dirent();
    const { mode } = link2.getNode();
    dirent.name = strToEncoding(link2.getName(), encoding);
    dirent.mode = mode;
    return dirent;
  }
  name = "";
  mode = 0;
  _checkModeProperty(property) {
    return (this.mode & S_IFMT3) === property;
  }
  isDirectory() {
    return this._checkModeProperty(S_IFDIR3);
  }
  isFile() {
    return this._checkModeProperty(S_IFREG3);
  }
  isBlockDevice() {
    return this._checkModeProperty(S_IFBLK3);
  }
  isCharacterDevice() {
    return this._checkModeProperty(S_IFCHR3);
  }
  isSymbolicLink() {
    return this._checkModeProperty(S_IFLNK3);
  }
  isFIFO() {
    return this._checkModeProperty(S_IFIFO3);
  }
  isSocket() {
    return this._checkModeProperty(S_IFSOCK3);
  }
};
var Dirent_default = Dirent;

// memfs-3.0.4/setTimeoutUnref.ts
function setTimeoutUnref(callback, time, args) {
  const ref = setTimeout.apply(null, arguments);
  if (ref && typeof ref === "object" && typeof ref.unref === "function") ref.unref();
  return ref;
}
var setTimeoutUnref_default = setTimeoutUnref;

// memfs-3.0.4/promises.ts
function promisify3(vol2, fn, getResult = (input) => input) {
  return (...args) => new Promise((resolve3, reject) => {
    vol2[fn].bind(vol2)(...args, (error, result) => {
      if (error) return reject(error);
      return resolve3(getResult(result));
    });
  });
}
var FileHandle = class {
  vol;
  fd;
  constructor(vol2, fd) {
    this.vol = vol2;
    this.fd = fd;
  }
  appendFile(data, options) {
    return promisify3(this.vol, "appendFile")(this.fd, data, options);
  }
  chmod(mode) {
    return promisify3(this.vol, "fchmod")(this.fd, mode);
  }
  chown(uid, gid) {
    return promisify3(this.vol, "fchown")(this.fd, uid, gid);
  }
  close() {
    return promisify3(this.vol, "close")(this.fd);
  }
  datasync() {
    return promisify3(this.vol, "fdatasync")(this.fd);
  }
  read(buffer, offset, length, position) {
    return promisify3(this.vol, "read", (bytesRead) => ({ bytesRead, buffer }))(this.fd, buffer, offset, length, position);
  }
  readFile(options) {
    return promisify3(this.vol, "readFile")(this.fd, options);
  }
  stat(options) {
    return promisify3(this.vol, "fstat")(this.fd, options);
  }
  sync() {
    return promisify3(this.vol, "fsync")(this.fd);
  }
  truncate(len) {
    return promisify3(this.vol, "ftruncate")(this.fd, len);
  }
  utimes(atime, mtime) {
    return promisify3(this.vol, "futimes")(this.fd, atime, mtime);
  }
  write(buffer, offset, length, position) {
    return promisify3(this.vol, "write", (bytesWritten) => ({ bytesWritten, buffer }))(
      this.fd,
      buffer,
      offset,
      length,
      position
    );
  }
  writeFile(data, options) {
    return promisify3(this.vol, "writeFile")(this.fd, data, options);
  }
};
function createPromisesApi(vol2) {
  if (typeof Promise === "undefined") return null;
  return {
    FileHandle,
    access(path, mode) {
      return promisify3(vol2, "access")(path, mode);
    },
    appendFile(path, data, options) {
      return promisify3(vol2, "appendFile")(path instanceof FileHandle ? path.fd : path, data, options);
    },
    chmod(path, mode) {
      return promisify3(vol2, "chmod")(path, mode);
    },
    chown(path, uid, gid) {
      return promisify3(vol2, "chown")(path, uid, gid);
    },
    copyFile(src, dest, flags) {
      return promisify3(vol2, "copyFile")(src, dest, flags);
    },
    lchmod(path, mode) {
      return promisify3(vol2, "lchmod")(path, mode);
    },
    lchown(path, uid, gid) {
      return promisify3(vol2, "lchown")(path, uid, gid);
    },
    link(existingPath, newPath) {
      return promisify3(vol2, "link")(existingPath, newPath);
    },
    lstat(path, options) {
      return promisify3(vol2, "lstat")(path, options);
    },
    mkdir(path, options) {
      return promisify3(vol2, "mkdir")(path, options);
    },
    mkdtemp(prefix, options) {
      return promisify3(vol2, "mkdtemp")(prefix, options);
    },
    open(path, flags, mode) {
      return promisify3(vol2, "open", (fd) => new FileHandle(vol2, fd))(path, flags, mode);
    },
    readdir(path, options) {
      return promisify3(vol2, "readdir")(path, options);
    },
    readFile(id, options) {
      return promisify3(vol2, "readFile")(id instanceof FileHandle ? id.fd : id, options);
    },
    readlink(path, options) {
      return promisify3(vol2, "readlink")(path, options);
    },
    realpath(path, options) {
      return promisify3(vol2, "realpath")(path, options);
    },
    rename(oldPath, newPath) {
      return promisify3(vol2, "rename")(oldPath, newPath);
    },
    rmdir(path) {
      return promisify3(vol2, "rmdir")(path);
    },
    stat(path, options) {
      return promisify3(vol2, "stat")(path, options);
    },
    symlink(target, path, type) {
      return promisify3(vol2, "symlink")(target, path, type);
    },
    truncate(path, len) {
      return promisify3(vol2, "truncate")(path, len);
    },
    unlink(path) {
      return promisify3(vol2, "unlink")(path);
    },
    utimes(path, atime, mtime) {
      return promisify3(vol2, "utimes")(path, atime, mtime);
    },
    writeFile(id, data, options) {
      return promisify3(vol2, "writeFile")(id instanceof FileHandle ? id.fd : id, data, options);
    }
  };
}

// memfs-3.0.4/volume.ts
var exports7 = {};
var resolveCrossPlatform = resolve;
var {
  O_RDONLY,
  O_WRONLY,
  O_RDWR,
  O_CREAT,
  O_EXCL,
  O_TRUNC,
  O_APPEND: O_APPEND2,
  O_SYNC,
  O_DIRECTORY,
  F_OK,
  COPYFILE_EXCL,
  COPYFILE_FICLONE_FORCE
} = constants3;
var sep2;
var relative2;
if (posix) {
  const { posix: posix2 } = path_exports;
  sep2 = posix2.sep;
  relative2 = posix2.relative;
} else {
  sep2 = sep;
  relative2 = relative;
}
var isWin2 = process_default.platform === "win32";
var kMinPoolSpace = 128;
var ERRSTR = {
  PATH_STR: "path must be a string or Buffer",
  // FD:             'file descriptor must be a unsigned 32-bit integer',
  FD: "fd must be a file descriptor",
  MODE_INT: "mode must be an int",
  CB: "callback must be a function",
  UID: "uid must be an unsigned int",
  GID: "gid must be an unsigned int",
  LEN: "len must be an integer",
  ATIME: "atime must be an integer",
  MTIME: "mtime must be an integer",
  PREFIX: "filename prefix is required",
  BUFFER: "buffer must be an instance of Buffer or StaticBuffer",
  OFFSET: "offset must be an integer",
  LENGTH: "length must be an integer",
  POSITION: "position must be an integer"
};
var ERRSTR_OPTS = (tipeof) => `Expected options to be either an object or a string, but got ${tipeof} instead`;
var ENOENT = "ENOENT";
var EBADF = "EBADF";
var EINVAL = "EINVAL";
var EPERM = "EPERM";
var EPROTO = "EPROTO";
var EEXIST = "EEXIST";
var ENOTDIR = "ENOTDIR";
var EMFILE = "EMFILE";
var EACCES = "EACCES";
var EISDIR = "EISDIR";
var ENOTEMPTY = "ENOTEMPTY";
var ENOSYS = "ENOSYS";
function formatError2(errorCode, func = "", path = "", path2 = "") {
  let pathFormatted = "";
  if (path) pathFormatted = ` '${path}'`;
  if (path2) pathFormatted += ` -> '${path2}'`;
  switch (errorCode) {
    case ENOENT:
      return `ENOENT: no such file or directory, ${func}${pathFormatted}`;
    case EBADF:
      return `EBADF: bad file descriptor, ${func}${pathFormatted}`;
    case EINVAL:
      return `EINVAL: invalid argument, ${func}${pathFormatted}`;
    case EPERM:
      return `EPERM: operation not permitted, ${func}${pathFormatted}`;
    case EPROTO:
      return `EPROTO: protocol error, ${func}${pathFormatted}`;
    case EEXIST:
      return `EEXIST: file already exists, ${func}${pathFormatted}`;
    case ENOTDIR:
      return `ENOTDIR: not a directory, ${func}${pathFormatted}`;
    case EISDIR:
      return `EISDIR: illegal operation on a directory, ${func}${pathFormatted}`;
    case EACCES:
      return `EACCES: permission denied, ${func}${pathFormatted}`;
    case ENOTEMPTY:
      return `ENOTEMPTY: directory not empty, ${func}${pathFormatted}`;
    case EMFILE:
      return `EMFILE: too many open files, ${func}${pathFormatted}`;
    case ENOSYS:
      return `ENOSYS: function not implemented, ${func}${pathFormatted}`;
    default:
      return `${errorCode}: error occurred, ${func}${pathFormatted}`;
  }
}
function createError(errorCode, func = "", path = "", path2 = "", Constructor = Error) {
  const error = new Constructor(formatError2(errorCode, func, path, path2));
  error.code = errorCode;
  return error;
}
var FLAGS = ((FLAGS2) => {
  FLAGS2[FLAGS2["r"] = O_RDONLY] = "r";
  FLAGS2[FLAGS2["r+"] = O_RDWR] = "r+";
  FLAGS2[FLAGS2["rs"] = O_RDONLY | O_SYNC] = "rs";
  FLAGS2[FLAGS2["sr"] = FLAGS2.rs] = "sr";
  FLAGS2[FLAGS2["rs+"] = O_RDWR | O_SYNC] = "rs+";
  FLAGS2[FLAGS2["sr+"] = FLAGS2["rs+"]] = "sr+";
  FLAGS2[FLAGS2["w"] = O_WRONLY | O_CREAT | O_TRUNC] = "w";
  FLAGS2[FLAGS2["wx"] = O_WRONLY | O_CREAT | O_TRUNC | O_EXCL] = "wx";
  FLAGS2[FLAGS2["xw"] = FLAGS2.wx] = "xw";
  FLAGS2[FLAGS2["w+"] = O_RDWR | O_CREAT | O_TRUNC] = "w+";
  FLAGS2[FLAGS2["wx+"] = O_RDWR | O_CREAT | O_TRUNC | O_EXCL] = "wx+";
  FLAGS2[FLAGS2["xw+"] = FLAGS2["wx+"]] = "xw+";
  FLAGS2[FLAGS2["a"] = O_WRONLY | O_APPEND2 | O_CREAT] = "a";
  FLAGS2[FLAGS2["ax"] = O_WRONLY | O_APPEND2 | O_CREAT | O_EXCL] = "ax";
  FLAGS2[FLAGS2["xa"] = FLAGS2.ax] = "xa";
  FLAGS2[FLAGS2["a+"] = O_RDWR | O_APPEND2 | O_CREAT] = "a+";
  FLAGS2[FLAGS2["ax+"] = O_RDWR | O_APPEND2 | O_CREAT | O_EXCL] = "ax+";
  FLAGS2[FLAGS2["xa+"] = FLAGS2["ax+"]] = "xa+";
  return FLAGS2;
})(FLAGS || {});
function flagsToNumber(flags) {
  if (typeof flags === "number") return flags;
  if (typeof flags === "string") {
    const flagsNum = FLAGS[flags];
    if (typeof flagsNum !== "undefined") return flagsNum;
  }
  throw new TypeError2("ERR_INVALID_OPT_VALUE", "flags", flags);
}
function getOptions(defaults, options) {
  let opts;
  if (!options) return defaults;
  else {
    const tipeof = typeof options;
    switch (tipeof) {
      case "string":
        opts = j4({}, defaults, { encoding: options });
        break;
      case "object":
        opts = j4({}, defaults, options);
        break;
      default:
        throw TypeError(ERRSTR_OPTS(tipeof));
    }
  }
  if (opts.encoding !== "buffer") assertEncoding(opts.encoding);
  return opts;
}
function optsGenerator(defaults) {
  return (options) => getOptions(defaults, options);
}
function validateCallback(callback) {
  if (typeof callback !== "function") throw TypeError(ERRSTR.CB);
  return callback;
}
function optsAndCbGenerator(getOpts) {
  return (options, callback) => typeof options === "function" ? [getOpts(), options] : [getOpts(options), validateCallback(callback)];
}
var optsDefaults = {
  encoding: "utf8"
};
var getDefaultOpts = optsGenerator(optsDefaults);
var getDefaultOptsAndCb = optsAndCbGenerator(getDefaultOpts);
var readFileOptsDefaults = {
  flag: "r"
};
var getReadFileOptions = optsGenerator(readFileOptsDefaults);
var writeFileDefaults = {
  encoding: "utf8",
  mode: 438 /* DEFAULT */,
  flag: FLAGS[FLAGS.w]
};
var getWriteFileOptions = optsGenerator(writeFileDefaults);
var appendFileDefaults = {
  encoding: "utf8",
  mode: 438 /* DEFAULT */,
  flag: FLAGS[FLAGS.a]
};
var getAppendFileOpts = optsGenerator(appendFileDefaults);
var getAppendFileOptsAndCb = optsAndCbGenerator(getAppendFileOpts);
var realpathDefaults = optsDefaults;
var getRealpathOptions = optsGenerator(realpathDefaults);
var getRealpathOptsAndCb = optsAndCbGenerator(getRealpathOptions);
var mkdirDefaults = {
  mode: 511 /* DIR */,
  recursive: false
};
var getMkdirOptions = (options) => {
  if (typeof options === "number") return j4({}, mkdirDefaults, { mode: options });
  return j4({}, mkdirDefaults, options);
};
var rmdirDefaults = {
  recursive: false
};
var getRmdirOptions = (options) => {
  return j4({}, rmdirDefaults, options);
};
var readdirDefaults = {
  encoding: "utf8",
  withFileTypes: false
};
var getReaddirOptions = optsGenerator(readdirDefaults);
var getReaddirOptsAndCb = optsAndCbGenerator(getReaddirOptions);
var statDefaults = {
  bigint: false
};
var getStatOptions = (options = {}) => j4({}, statDefaults, options);
var getStatOptsAndCb = (options, callback) => typeof options === "function" ? [getStatOptions(), options] : [getStatOptions(options), validateCallback(callback)];
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    throw new TypeError2("ERR_INVALID_FILE_URL_HOST", process_default.platform);
  }
  const pathname = url.pathname;
  for (let n30 = 0; n30 < pathname.length; n30++) {
    if (pathname[n30] === "%") {
      const third = pathname.codePointAt(n30 + 2) | 32;
      if (pathname[n30 + 1] === "2" && third === 102) {
        throw new TypeError2("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
      }
    }
  }
  return decodeURIComponent(pathname);
}
function pathToFilename(path) {
  if (typeof path !== "string" && !Buffer3.isBuffer(path)) {
    try {
      if (!(path instanceof URL)) throw new TypeError(ERRSTR.PATH_STR);
    } catch (err) {
      throw new TypeError(ERRSTR.PATH_STR);
    }
    path = getPathFromURLPosix(path);
  }
  const pathString = String(path);
  nullCheck(pathString);
  return pathString;
}
var resolve2 = (filename, base = process_default.cwd()) => resolveCrossPlatform(base, filename);
if (isWin2) {
  const _resolve = resolve2;
  resolve2 = (filename, base) => unixify(_resolve(filename, base));
}
function filenameToSteps(filename, base) {
  const fullPath = resolve2(filename, base);
  const fullPathSansSlash = fullPath.substr(1);
  if (!fullPathSansSlash) return [];
  return fullPathSansSlash.split(sep2);
}
function pathToSteps(path) {
  return filenameToSteps(pathToFilename(path));
}
function dataToBuffer(data, encoding = ENCODING_UTF8) {
  if (Buffer3.isBuffer(data)) return data;
  else if (data instanceof Uint8Array) return bufferFrom(data);
  else return bufferFrom(String(data), encoding);
}
function bufferToEncoding(buffer, encoding) {
  if (!encoding || encoding === "buffer") return buffer;
  else return buffer.toString(encoding);
}
function nullCheck(path, callback) {
  if (("" + path).indexOf("\0") !== -1) {
    const er = new Error("Path must be a string without null bytes");
    er.code = ENOENT;
    if (typeof callback !== "function") throw er;
    process_default.nextTick(callback, er);
    return false;
  }
  return true;
}
function _modeToNumber(mode, def) {
  if (typeof mode === "number") return mode;
  if (typeof mode === "string") return parseInt(mode, 8);
  if (def) return modeToNumber(def);
  return void 0;
}
function modeToNumber(mode, def) {
  const result = _modeToNumber(mode, def);
  if (typeof result !== "number" || isNaN(result)) throw new TypeError(ERRSTR.MODE_INT);
  return result;
}
function isFd(path) {
  return path >>> 0 === path;
}
function validateFd(fd) {
  if (!isFd(fd)) throw TypeError(ERRSTR.FD);
}
function toUnixTimestamp(time) {
  if (typeof time === "string" && +time == time) {
    return +time;
  }
  if (time instanceof Date) {
    return time.getTime() / 1e3;
  }
  if (isFinite(time)) {
    if (time < 0) {
      return Date.now() / 1e3;
    }
    return time;
  }
  throw new Error("Cannot parse time: " + time);
}
function validateUid(uid) {
  if (typeof uid !== "number") throw TypeError(ERRSTR.UID);
}
function validateGid(gid) {
  if (typeof gid !== "number") throw TypeError(ERRSTR.GID);
}
var Volume = class _Volume {
  static fromJSON(json, cwd2) {
    const vol2 = new _Volume();
    vol2.fromJSON(json, cwd2);
    return vol2;
  }
  /**
   * Global file descriptor counter. UNIX file descriptors start from 0 and go sequentially
   * up, so here, in order not to conflict with them, we choose some big number and descrease
   * the file descriptor of every new opened file.
   * @type {number}
   * @todo This should not be static, right?
   */
  static fd = 2147483647;
  // Constructor function used to create new nodes.
  // NodeClass: new (...args) => TNode = Node as new (...args) => TNode;
  // Hard link to the root of this volume.
  // root: Node = new (this.NodeClass)(null, '', true);
  root;
  // I-node number counter.
  ino = 0;
  // A mapping for i-node numbers to i-nodes (`Node`);
  inodes = {};
  // List of released i-node numbers, for reuse.
  releasedInos = [];
  // A mapping for file descriptors to `File`s.
  fds = {};
  // A list of reusable (opened and closed) file descriptors, that should be
  // used first before creating a new file descriptor.
  releasedFds = [];
  // Max number of open files.
  maxFiles = 1e4;
  // Current number of open files.
  openFiles = 0;
  StatWatcher;
  ReadStream;
  WriteStream;
  FSWatcher;
  props;
  promisesApi = createPromisesApi(this);
  get promises() {
    if (this.promisesApi === null) throw new Error("Promise is not supported in this environment.");
    return this.promisesApi;
  }
  constructor(props = {}) {
    this.props = j4({ Node, Link, File: File2 }, props);
    const root = this.createLink();
    root.setNode(this.createNode(true));
    const self2 = this;
    this.StatWatcher = class extends StatWatcher {
      constructor() {
        super(self2);
      }
    };
    const _ReadStream = FsReadStream;
    this.ReadStream = class extends _ReadStream {
      constructor(...args) {
        super(self2, ...args);
      }
    };
    const _WriteStream = FsWriteStream;
    this.WriteStream = class extends _WriteStream {
      constructor(...args) {
        super(self2, ...args);
      }
    };
    this.FSWatcher = class extends FSWatcher {
      constructor() {
        super(self2);
      }
    };
    this.root = root;
  }
  createLink(parent, name, isDirectory = false, perm) {
    if (!parent) {
      return new this.props.Link(this, null, "");
    }
    if (!name) {
      throw new Error("createLink: name cannot be empty");
    }
    return parent.createChild(name, this.createNode(isDirectory, perm));
  }
  deleteLink(link2) {
    const parent = link2.parent;
    if (parent) {
      parent.deleteChild(link2);
      return true;
    }
    return false;
  }
  newInoNumber() {
    const releasedFd = this.releasedInos.pop();
    if (releasedFd) return releasedFd;
    else {
      this.ino = (this.ino + 1) % 4294967295;
      return this.ino;
    }
  }
  newFdNumber() {
    const releasedFd = this.releasedFds.pop();
    return typeof releasedFd === "number" ? releasedFd : _Volume.fd--;
  }
  createNode(isDirectory = false, perm) {
    const node = new this.props.Node(this.newInoNumber(), perm);
    if (isDirectory) node.setIsDirectory();
    this.inodes[node.ino] = node;
    return node;
  }
  getNode(ino) {
    return this.inodes[ino];
  }
  deleteNode(node) {
    node.del();
    delete this.inodes[node.ino];
    this.releasedInos.push(node.ino);
  }
  // Generates 6 character long random string, used by `mkdtemp`.
  genRndStr() {
    const str = (Math.random() + 1).toString(36).substr(2, 6);
    if (str.length === 6) return str;
    else return this.genRndStr();
  }
  // Returns a `Link` (hard link) referenced by path "split" into steps.
  getLink(steps) {
    return this.root.walk(steps);
  }
  // Just link `getLink`, but throws a correct user error, if link to found.
  getLinkOrThrow(filename, funcName) {
    const steps = filenameToSteps(filename);
    const link2 = this.getLink(steps);
    if (!link2) throw createError(ENOENT, funcName, filename);
    return link2;
  }
  // Just like `getLink`, but also dereference/resolves symbolic links.
  getResolvedLink(filenameOrSteps) {
    let steps = typeof filenameOrSteps === "string" ? filenameToSteps(filenameOrSteps) : filenameOrSteps;
    let link2 = this.root;
    let i18 = 0;
    while (i18 < steps.length) {
      const step = steps[i18];
      link2 = link2.getChild(step);
      if (!link2) return null;
      const node = link2.getNode();
      if (node.isSymlink()) {
        steps = node.symlink.concat(steps.slice(i18 + 1));
        link2 = this.root;
        i18 = 0;
        continue;
      }
      i18++;
    }
    return link2;
  }
  // Just like `getLinkOrThrow`, but also dereference/resolves symbolic links.
  getResolvedLinkOrThrow(filename, funcName) {
    const link2 = this.getResolvedLink(filename);
    if (!link2) throw createError(ENOENT, funcName, filename);
    return link2;
  }
  resolveSymlinks(link2) {
    return this.getResolvedLink(link2.steps.slice(1));
  }
  // Just like `getLinkOrThrow`, but also verifies that the link is a directory.
  getLinkAsDirOrThrow(filename, funcName) {
    const link2 = this.getLinkOrThrow(filename, funcName);
    if (!link2.getNode().isDirectory()) throw createError(ENOTDIR, funcName, filename);
    return link2;
  }
  // Get the immediate parent directory of the link.
  getLinkParent(steps) {
    return this.root.walk(steps, steps.length - 1);
  }
  getLinkParentAsDirOrThrow(filenameOrSteps, funcName) {
    const steps = filenameOrSteps instanceof Array ? filenameOrSteps : filenameToSteps(filenameOrSteps);
    const link2 = this.getLinkParent(steps);
    if (!link2) throw createError(ENOENT, funcName, sep2 + steps.join(sep2));
    if (!link2.getNode().isDirectory()) throw createError(ENOTDIR, funcName, sep2 + steps.join(sep2));
    return link2;
  }
  getFileByFd(fd) {
    return this.fds[String(fd)];
  }
  getFileByFdOrThrow(fd, funcName) {
    if (!isFd(fd)) throw TypeError(ERRSTR.FD);
    const file = this.getFileByFd(fd);
    if (!file) throw createError(EBADF, funcName);
    return file;
  }
  getNodeByIdOrCreate(id, flags, perm) {
    if (typeof id === "number") {
      const file = this.getFileByFd(id);
      if (!file) throw Error("File nto found");
      return file.node;
    } else {
      const steps = pathToSteps(id);
      let link2 = this.getLink(steps);
      if (link2) return link2.getNode();
      if (flags & O_CREAT) {
        const dirLink = this.getLinkParent(steps);
        if (dirLink) {
          const name = steps[steps.length - 1];
          link2 = this.createLink(dirLink, name, false, perm);
          return link2.getNode();
        }
      }
      throw createError(ENOENT, "getNodeByIdOrCreate", pathToFilename(id));
    }
  }
  wrapAsync(method, args, callback) {
    validateCallback(callback);
    process_default.nextTick(() => {
      try {
        callback(null, method.apply(this, args));
      } catch (err) {
        callback(err);
      }
    });
  }
  _toJSON(link2 = this.root, json = {}, path) {
    let isEmpty = true;
    let children = link2.children;
    if (link2.getNode().isFile()) {
      children = { [link2.getName()]: link2.parent.getChild(link2.getName()) };
      link2 = link2.parent;
    }
    for (const name in children) {
      isEmpty = false;
      const child = link2.getChild(name);
      if (!child) {
        throw new Error("_toJSON: unexpected undefined");
      }
      const node = child.getNode();
      if (node.isFile()) {
        let filename = child.getPath();
        if (path) filename = relative2(path, filename);
        json[filename] = node.getString();
      } else if (node.isDirectory()) {
        this._toJSON(child, json, path);
      }
    }
    let dirPath = link2.getPath();
    if (path) dirPath = relative2(path, dirPath);
    if (dirPath && isEmpty) {
      json[dirPath] = null;
    }
    return json;
  }
  toJSON(paths, json = {}, isRelative = false) {
    const links = [];
    if (paths) {
      if (!(paths instanceof Array)) paths = [paths];
      for (const path of paths) {
        const filename = pathToFilename(path);
        const link2 = this.getResolvedLink(filename);
        if (!link2) continue;
        links.push(link2);
      }
    } else {
      links.push(this.root);
    }
    if (!links.length) return json;
    for (const link2 of links) this._toJSON(link2, json, isRelative ? link2.getPath() : "");
    return json;
  }
  // fromJSON(json: {[filename: string]: string}, cwd: string = '/') {
  fromJSON(json, cwd2 = process_default.cwd()) {
    for (let filename in json) {
      const data = json[filename];
      if (typeof data === "string") {
        filename = resolve2(filename, cwd2);
        const steps = filenameToSteps(filename);
        if (steps.length > 1) {
          const dirname2 = sep2 + steps.slice(0, steps.length - 1).join(sep2);
          this.mkdirpBase(dirname2, 511 /* DIR */);
        }
        this.writeFileSync(filename, data);
      } else {
        this.mkdirpBase(filename, 511 /* DIR */);
      }
    }
  }
  reset() {
    this.ino = 0;
    this.inodes = {};
    this.releasedInos = [];
    this.fds = {};
    this.releasedFds = [];
    this.openFiles = 0;
    this.root = this.createLink();
    this.root.setNode(this.createNode(true));
  }
  // Legacy interface
  mountSync(mountpoint, json) {
    this.fromJSON(json, mountpoint);
  }
  openLink(link2, flagsNum, resolveSymlinks = true) {
    if (this.openFiles >= this.maxFiles) {
      throw createError(EMFILE, "open", link2.getPath());
    }
    let realLink = link2;
    if (resolveSymlinks) realLink = this.resolveSymlinks(link2);
    if (!realLink) throw createError(ENOENT, "open", link2.getPath());
    const node = realLink.getNode();
    if (node.isDirectory()) {
      if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_RDONLY) throw createError(EISDIR, "open", link2.getPath());
    } else {
      if (flagsNum & O_DIRECTORY) throw createError(ENOTDIR, "open", link2.getPath());
    }
    if (!(flagsNum & O_WRONLY)) {
      if (!node.canRead()) {
        throw createError(EACCES, "open", link2.getPath());
      }
    }
    if (flagsNum & O_RDWR) {
    }
    const file = new this.props.File(link2, node, flagsNum, this.newFdNumber());
    this.fds[file.fd] = file;
    this.openFiles++;
    if (flagsNum & O_TRUNC) file.truncate();
    return file;
  }
  openFile(filename, flagsNum, modeNum, resolveSymlinks = true) {
    const steps = filenameToSteps(filename);
    let link2 = resolveSymlinks ? this.getResolvedLink(steps) : this.getLink(steps);
    if (!link2 && flagsNum & O_CREAT) {
      const dirLink = this.getResolvedLink(steps.slice(0, steps.length - 1));
      if (!dirLink) throw createError(ENOENT, "open", sep2 + steps.join(sep2));
      if (flagsNum & O_CREAT && typeof modeNum === "number") {
        link2 = this.createLink(dirLink, steps[steps.length - 1], false, modeNum);
      }
    }
    if (link2) return this.openLink(link2, flagsNum, resolveSymlinks);
    throw createError(ENOENT, "open", filename);
  }
  openBase(filename, flagsNum, modeNum, resolveSymlinks = true) {
    const file = this.openFile(filename, flagsNum, modeNum, resolveSymlinks);
    if (!file) throw createError(ENOENT, "open", filename);
    return file.fd;
  }
  openSync(path, flags, mode = 438 /* DEFAULT */) {
    const modeNum = modeToNumber(mode);
    const fileName = pathToFilename(path);
    const flagsNum = flagsToNumber(flags);
    return this.openBase(fileName, flagsNum, modeNum);
  }
  open(path, flags, a17, b24) {
    let mode = a17;
    let callback = b24;
    if (typeof a17 === "function") {
      mode = 438 /* DEFAULT */;
      callback = a17;
    }
    mode = mode || 438 /* DEFAULT */;
    const modeNum = modeToNumber(mode);
    const fileName = pathToFilename(path);
    const flagsNum = flagsToNumber(flags);
    this.wrapAsync(this.openBase, [fileName, flagsNum, modeNum], callback);
  }
  closeFile(file) {
    if (!this.fds[file.fd]) return;
    this.openFiles--;
    delete this.fds[file.fd];
    this.releasedFds.push(file.fd);
  }
  closeSync(fd) {
    validateFd(fd);
    const file = this.getFileByFdOrThrow(fd, "close");
    this.closeFile(file);
  }
  close(fd, callback) {
    validateFd(fd);
    this.wrapAsync(this.closeSync, [fd], callback);
  }
  openFileOrGetById(id, flagsNum, modeNum) {
    if (typeof id === "number") {
      const file = this.fds[id];
      if (!file) throw createError(ENOENT);
      return file;
    } else {
      return this.openFile(pathToFilename(id), flagsNum, modeNum);
    }
  }
  readBase(fd, buffer, offset, length, position) {
    const file = this.getFileByFdOrThrow(fd);
    return file.read(buffer, Number(offset), Number(length), position);
  }
  readSync(fd, buffer, offset, length, position) {
    validateFd(fd);
    return this.readBase(fd, buffer, offset, length, position);
  }
  read(fd, buffer, offset, length, position, callback) {
    validateCallback(callback);
    if (length === 0) {
      return process_default.nextTick(() => {
        if (callback) callback(null, 0, buffer);
      });
    }
    process_default.nextTick(() => {
      try {
        const bytes = this.readBase(fd, buffer, offset, length, position);
        callback(null, bytes, buffer);
      } catch (err) {
        callback(err);
      }
    });
  }
  readFileBase(id, flagsNum, encoding) {
    let result;
    const isUserFd = typeof id === "number";
    const userOwnsFd = isUserFd && isFd(id);
    let fd;
    if (userOwnsFd) fd = id;
    else {
      const filename = pathToFilename(id);
      const steps = filenameToSteps(filename);
      const link2 = this.getResolvedLink(steps);
      if (link2) {
        const node = link2.getNode();
        if (node.isDirectory()) throw createError(EISDIR, "open", link2.getPath());
      }
      fd = this.openSync(id, flagsNum);
    }
    try {
      result = bufferToEncoding(this.getFileByFdOrThrow(fd).getBuffer(), encoding);
    } finally {
      if (!userOwnsFd) {
        this.closeSync(fd);
      }
    }
    return result;
  }
  readFileSync(file, options) {
    const opts = getReadFileOptions(options);
    const flagsNum = flagsToNumber(opts.flag);
    return this.readFileBase(file, flagsNum, opts.encoding);
  }
  readFile(id, a17, b24) {
    const [opts, callback] = optsAndCbGenerator(getReadFileOptions)(a17, b24);
    const flagsNum = flagsToNumber(opts.flag);
    this.wrapAsync(this.readFileBase, [id, flagsNum, opts.encoding], callback);
  }
  writeBase(fd, buf, offset, length, position) {
    const file = this.getFileByFdOrThrow(fd, "write");
    return file.write(buf, offset, length, position);
  }
  writeSync(fd, a17, b24, c23, d23) {
    validateFd(fd);
    let encoding;
    let offset;
    let length;
    let position;
    const isBuffer3 = typeof a17 !== "string";
    if (isBuffer3) {
      offset = (b24 || 0) | 0;
      length = c23;
      position = d23;
    } else {
      position = b24;
      encoding = c23;
    }
    const buf = dataToBuffer(a17, encoding);
    if (isBuffer3) {
      if (typeof length === "undefined") {
        length = buf.length;
      }
    } else {
      offset = 0;
      length = buf.length;
    }
    return this.writeBase(fd, buf, offset, length, position);
  }
  write(fd, a17, b24, c23, d23, e3) {
    validateFd(fd);
    let offset;
    let length;
    let position;
    let encoding;
    let callback;
    const tipa = typeof a17;
    const tipb = typeof b24;
    const tipc = typeof c23;
    const tipd = typeof d23;
    if (tipa !== "string") {
      if (tipb === "function") {
        callback = b24;
      } else if (tipc === "function") {
        offset = b24 | 0;
        callback = c23;
      } else if (tipd === "function") {
        offset = b24 | 0;
        length = c23;
        callback = d23;
      } else {
        offset = b24 | 0;
        length = c23;
        position = d23;
        callback = e3;
      }
    } else {
      if (tipb === "function") {
        callback = b24;
      } else if (tipc === "function") {
        position = b24;
        callback = c23;
      } else if (tipd === "function") {
        position = b24;
        encoding = c23;
        callback = d23;
      }
    }
    const buf = dataToBuffer(a17, encoding);
    if (tipa !== "string") {
      if (typeof length === "undefined") length = buf.length;
    } else {
      offset = 0;
      length = buf.length;
    }
    const cb = validateCallback(callback);
    process_default.nextTick(() => {
      try {
        const bytes = this.writeBase(fd, buf, offset, length, position);
        if (tipa !== "string") {
          cb(null, bytes, buf);
        } else {
          cb(null, bytes, a17);
        }
      } catch (err) {
        cb(err);
      }
    });
  }
  writeFileBase(id, buf, flagsNum, modeNum) {
    const isUserFd = typeof id === "number";
    let fd;
    if (isUserFd) fd = id;
    else {
      fd = this.openBase(pathToFilename(id), flagsNum, modeNum);
    }
    let offset = 0;
    let length = buf.length;
    let position = flagsNum & O_APPEND2 ? void 0 : 0;
    try {
      while (length > 0) {
        const written = this.writeSync(fd, buf, offset, length, position);
        offset += written;
        length -= written;
        if (position !== void 0) position += written;
      }
    } finally {
      if (!isUserFd) this.closeSync(fd);
    }
  }
  writeFileSync(id, data, options) {
    const opts = getWriteFileOptions(options);
    const flagsNum = flagsToNumber(opts.flag);
    const modeNum = modeToNumber(opts.mode);
    const buf = dataToBuffer(data, opts.encoding);
    this.writeFileBase(id, buf, flagsNum, modeNum);
  }
  writeFile(id, data, a17, b24) {
    let options = a17;
    let callback = b24;
    if (typeof a17 === "function") {
      options = writeFileDefaults;
      callback = a17;
    }
    const cb = validateCallback(callback);
    const opts = getWriteFileOptions(options);
    const flagsNum = flagsToNumber(opts.flag);
    const modeNum = modeToNumber(opts.mode);
    const buf = dataToBuffer(data, opts.encoding);
    this.wrapAsync(this.writeFileBase, [id, buf, flagsNum, modeNum], cb);
  }
  linkBase(filename1, filename2) {
    const steps1 = filenameToSteps(filename1);
    const link1 = this.getLink(steps1);
    if (!link1) throw createError(ENOENT, "link", filename1, filename2);
    const steps2 = filenameToSteps(filename2);
    const dir2 = this.getLinkParent(steps2);
    if (!dir2) throw createError(ENOENT, "link", filename1, filename2);
    const name = steps2[steps2.length - 1];
    if (dir2.getChild(name)) throw createError(EEXIST, "link", filename1, filename2);
    const node = link1.getNode();
    node.nlink++;
    dir2.createChild(name, node);
  }
  copyFileBase(src, dest, flags) {
    const buf = this.readFileSync(src);
    if (flags & COPYFILE_EXCL) {
      if (this.existsSync(dest)) {
        throw createError(EEXIST, "copyFile", src, dest);
      }
    }
    if (flags & COPYFILE_FICLONE_FORCE) {
      throw createError(ENOSYS, "copyFile", src, dest);
    }
    this.writeFileBase(dest, buf, FLAGS.w, 438 /* DEFAULT */);
  }
  copyFileSync(src, dest, flags) {
    const srcFilename = pathToFilename(src);
    const destFilename = pathToFilename(dest);
    return this.copyFileBase(srcFilename, destFilename, (flags || 0) | 0);
  }
  copyFile(src, dest, a17, b24) {
    const srcFilename = pathToFilename(src);
    const destFilename = pathToFilename(dest);
    let flags;
    let callback;
    if (typeof a17 === "function") {
      flags = 0;
      callback = a17;
    } else {
      flags = a17;
      callback = b24;
    }
    validateCallback(callback);
    this.wrapAsync(this.copyFileBase, [srcFilename, destFilename, flags], callback);
  }
  linkSync(existingPath, newPath) {
    const existingPathFilename = pathToFilename(existingPath);
    const newPathFilename = pathToFilename(newPath);
    this.linkBase(existingPathFilename, newPathFilename);
  }
  link(existingPath, newPath, callback) {
    const existingPathFilename = pathToFilename(existingPath);
    const newPathFilename = pathToFilename(newPath);
    this.wrapAsync(this.linkBase, [existingPathFilename, newPathFilename], callback);
  }
  unlinkBase(filename) {
    const steps = filenameToSteps(filename);
    const link2 = this.getLink(steps);
    if (!link2) throw createError(ENOENT, "unlink", filename);
    if (link2.length) throw Error("Dir not empty...");
    this.deleteLink(link2);
    const node = link2.getNode();
    node.nlink--;
    if (node.nlink <= 0) {
      this.deleteNode(node);
    }
  }
  unlinkSync(path) {
    const filename = pathToFilename(path);
    this.unlinkBase(filename);
  }
  unlink(path, callback) {
    const filename = pathToFilename(path);
    this.wrapAsync(this.unlinkBase, [filename], callback);
  }
  symlinkBase(targetFilename, pathFilename) {
    const pathSteps = filenameToSteps(pathFilename);
    const dirLink = this.getLinkParent(pathSteps);
    if (!dirLink) throw createError(ENOENT, "symlink", targetFilename, pathFilename);
    const name = pathSteps[pathSteps.length - 1];
    if (dirLink.getChild(name)) throw createError(EEXIST, "symlink", targetFilename, pathFilename);
    const symlink2 = dirLink.createChild(name);
    symlink2.getNode().makeSymlink(filenameToSteps(targetFilename));
    return symlink2;
  }
  // `type` argument works only on Windows.
  symlinkSync(target, path, type) {
    const targetFilename = pathToFilename(target);
    const pathFilename = pathToFilename(path);
    this.symlinkBase(targetFilename, pathFilename);
  }
  symlink(target, path, a17, b24) {
    const callback = validateCallback(typeof a17 === "function" ? a17 : b24);
    const targetFilename = pathToFilename(target);
    const pathFilename = pathToFilename(path);
    this.wrapAsync(this.symlinkBase, [targetFilename, pathFilename], callback);
  }
  realpathBase(filename, encoding) {
    const steps = filenameToSteps(filename);
    const realLink = this.getResolvedLink(steps);
    if (!realLink) throw createError(ENOENT, "realpath", filename);
    return strToEncoding(realLink.getPath(), encoding);
  }
  realpathSync(path, options) {
    return this.realpathBase(pathToFilename(path), getRealpathOptions(options).encoding);
  }
  realpath(path, a17, b24) {
    const [opts, callback] = getRealpathOptsAndCb(a17, b24);
    const pathFilename = pathToFilename(path);
    this.wrapAsync(this.realpathBase, [pathFilename, opts.encoding], callback);
  }
  lstatBase(filename, bigint = false) {
    const link2 = this.getLink(filenameToSteps(filename));
    if (!link2) throw createError(ENOENT, "lstat", filename);
    return Stats_default.build(link2.getNode(), bigint);
  }
  lstatSync(path, options) {
    return this.lstatBase(pathToFilename(path), getStatOptions(options).bigint);
  }
  lstat(path, a17, b24) {
    const [opts, callback] = getStatOptsAndCb(a17, b24);
    this.wrapAsync(this.lstatBase, [pathToFilename(path), opts.bigint], callback);
  }
  statBase(filename, bigint = false) {
    const link2 = this.getResolvedLink(filenameToSteps(filename));
    if (!link2) throw createError(ENOENT, "stat", filename);
    return Stats_default.build(link2.getNode(), bigint);
  }
  statSync(path, options) {
    return this.statBase(pathToFilename(path), getStatOptions(options).bigint);
  }
  stat(path, a17, b24) {
    const [opts, callback] = getStatOptsAndCb(a17, b24);
    this.wrapAsync(this.statBase, [pathToFilename(path), opts.bigint], callback);
  }
  fstatBase(fd, bigint = false) {
    const file = this.getFileByFd(fd);
    if (!file) throw createError(EBADF, "fstat");
    return Stats_default.build(file.node, bigint);
  }
  fstatSync(fd, options) {
    return this.fstatBase(fd, getStatOptions(options).bigint);
  }
  fstat(fd, a17, b24) {
    const [opts, callback] = getStatOptsAndCb(a17, b24);
    this.wrapAsync(this.fstatBase, [fd, opts.bigint], callback);
  }
  renameBase(oldPathFilename, newPathFilename) {
    const link2 = this.getLink(filenameToSteps(oldPathFilename));
    if (!link2) throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
    const newPathSteps = filenameToSteps(newPathFilename);
    const newPathDirLink = this.getLinkParent(newPathSteps);
    if (!newPathDirLink) throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
    const oldLinkParent = link2.parent;
    if (oldLinkParent) {
      oldLinkParent.deleteChild(link2);
    }
    const name = newPathSteps[newPathSteps.length - 1];
    link2.steps = [...newPathDirLink.steps, name];
    newPathDirLink.setChild(link2.getName(), link2);
  }
  renameSync(oldPath, newPath) {
    const oldPathFilename = pathToFilename(oldPath);
    const newPathFilename = pathToFilename(newPath);
    this.renameBase(oldPathFilename, newPathFilename);
  }
  rename(oldPath, newPath, callback) {
    const oldPathFilename = pathToFilename(oldPath);
    const newPathFilename = pathToFilename(newPath);
    this.wrapAsync(this.renameBase, [oldPathFilename, newPathFilename], callback);
  }
  existsBase(filename) {
    return !!this.statBase(filename);
  }
  existsSync(path) {
    try {
      return this.existsBase(pathToFilename(path));
    } catch (err) {
      return false;
    }
  }
  exists(path, callback) {
    const filename = pathToFilename(path);
    if (typeof callback !== "function") throw Error(ERRSTR.CB);
    process_default.nextTick(() => {
      try {
        callback(this.existsBase(filename));
      } catch (err) {
        callback(false);
      }
    });
  }
  accessBase(filename, mode) {
    const link2 = this.getLinkOrThrow(filename, "access");
  }
  accessSync(path, mode = F_OK) {
    const filename = pathToFilename(path);
    mode = mode | 0;
    this.accessBase(filename, mode);
  }
  access(path, a17, b24) {
    let mode = F_OK;
    let callback;
    if (typeof a17 !== "function") {
      mode = a17 | 0;
      callback = validateCallback(b24);
    } else {
      callback = a17;
    }
    const filename = pathToFilename(path);
    this.wrapAsync(this.accessBase, [filename, mode], callback);
  }
  appendFileSync(id, data, options = appendFileDefaults) {
    const opts = getAppendFileOpts(options);
    if (!opts.flag || isFd(id)) opts.flag = "a";
    this.writeFileSync(id, data, opts);
  }
  appendFile(id, data, a17, b24) {
    const [opts, callback] = getAppendFileOptsAndCb(a17, b24);
    if (!opts.flag || isFd(id)) opts.flag = "a";
    this.writeFile(id, data, opts, callback);
  }
  readdirBase(filename, options) {
    const steps = filenameToSteps(filename);
    const link2 = this.getResolvedLink(steps);
    if (!link2) throw createError(ENOENT, "readdir", filename);
    const node = link2.getNode();
    if (!node.isDirectory()) throw createError(ENOTDIR, "scandir", filename);
    if (options.withFileTypes) {
      const list2 = [];
      for (const name in link2.children) {
        const child = link2.getChild(name);
        if (!child) {
          continue;
        }
        list2.push(Dirent_default.build(child, options.encoding));
      }
      if (!isWin2 && options.encoding !== "buffer")
        list2.sort((a17, b24) => {
          if (a17.name < b24.name) return -1;
          if (a17.name > b24.name) return 1;
          return 0;
        });
      return list2;
    }
    const list = [];
    for (const name in link2.children) {
      list.push(strToEncoding(name, options.encoding));
    }
    if (!isWin2 && options.encoding !== "buffer") list.sort();
    return list;
  }
  readdirSync(path, options) {
    const opts = getReaddirOptions(options);
    const filename = pathToFilename(path);
    return this.readdirBase(filename, opts);
  }
  readdir(path, a17, b24) {
    const [options, callback] = getReaddirOptsAndCb(a17, b24);
    const filename = pathToFilename(path);
    this.wrapAsync(this.readdirBase, [filename, options], callback);
  }
  readlinkBase(filename, encoding) {
    const link2 = this.getLinkOrThrow(filename, "readlink");
    const node = link2.getNode();
    if (!node.isSymlink()) throw createError(EINVAL, "readlink", filename);
    const str = sep2 + node.symlink.join(sep2);
    return strToEncoding(str, encoding);
  }
  readlinkSync(path, options) {
    const opts = getDefaultOpts(options);
    const filename = pathToFilename(path);
    return this.readlinkBase(filename, opts.encoding);
  }
  readlink(path, a17, b24) {
    const [opts, callback] = getDefaultOptsAndCb(a17, b24);
    const filename = pathToFilename(path);
    this.wrapAsync(this.readlinkBase, [filename, opts.encoding], callback);
  }
  fsyncBase(fd) {
    this.getFileByFdOrThrow(fd, "fsync");
  }
  fsyncSync(fd) {
    this.fsyncBase(fd);
  }
  fsync(fd, callback) {
    this.wrapAsync(this.fsyncBase, [fd], callback);
  }
  fdatasyncBase(fd) {
    this.getFileByFdOrThrow(fd, "fdatasync");
  }
  fdatasyncSync(fd) {
    this.fdatasyncBase(fd);
  }
  fdatasync(fd, callback) {
    this.wrapAsync(this.fdatasyncBase, [fd], callback);
  }
  ftruncateBase(fd, len) {
    const file = this.getFileByFdOrThrow(fd, "ftruncate");
    file.truncate(len);
  }
  ftruncateSync(fd, len) {
    this.ftruncateBase(fd, len);
  }
  ftruncate(fd, a17, b24) {
    const len = typeof a17 === "number" ? a17 : 0;
    const callback = validateCallback(typeof a17 === "number" ? b24 : a17);
    this.wrapAsync(this.ftruncateBase, [fd, len], callback);
  }
  truncateBase(path, len) {
    const fd = this.openSync(path, "r+");
    try {
      this.ftruncateSync(fd, len);
    } finally {
      this.closeSync(fd);
    }
  }
  truncateSync(id, len) {
    if (isFd(id)) return this.ftruncateSync(id, len);
    this.truncateBase(id, len);
  }
  truncate(id, a17, b24) {
    const len = typeof a17 === "number" ? a17 : 0;
    const callback = validateCallback(typeof a17 === "number" ? b24 : a17);
    if (isFd(id)) return this.ftruncate(id, len, callback);
    this.wrapAsync(this.truncateBase, [id, len], callback);
  }
  futimesBase(fd, atime, mtime) {
    const file = this.getFileByFdOrThrow(fd, "futimes");
    const node = file.node;
    node.atime = new Date(atime * 1e3);
    node.mtime = new Date(mtime * 1e3);
  }
  futimesSync(fd, atime, mtime) {
    this.futimesBase(fd, toUnixTimestamp(atime), toUnixTimestamp(mtime));
  }
  futimes(fd, atime, mtime, callback) {
    this.wrapAsync(this.futimesBase, [fd, toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
  }
  utimesBase(filename, atime, mtime) {
    const fd = this.openSync(filename, "r+");
    try {
      this.futimesBase(fd, atime, mtime);
    } finally {
      this.closeSync(fd);
    }
  }
  utimesSync(path, atime, mtime) {
    this.utimesBase(pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime));
  }
  utimes(path, atime, mtime, callback) {
    this.wrapAsync(this.utimesBase, [pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
  }
  mkdirBase(filename, modeNum) {
    const steps = filenameToSteps(filename);
    if (!steps.length) {
      throw createError(EISDIR, "mkdir", filename);
    }
    const dir = this.getLinkParentAsDirOrThrow(filename, "mkdir");
    const name = steps[steps.length - 1];
    if (dir.getChild(name)) throw createError(EEXIST, "mkdir", filename);
    dir.createChild(name, this.createNode(true, modeNum));
  }
  /**
   * Creates directory tree recursively.
   * @param filename
   * @param modeNum
   */
  mkdirpBase(filename, modeNum) {
    const steps = filenameToSteps(filename);
    let link2 = this.root;
    for (let i18 = 0; i18 < steps.length; i18++) {
      const step = steps[i18];
      if (!link2.getNode().isDirectory()) throw createError(ENOTDIR, "mkdir", link2.getPath());
      const child = link2.getChild(step);
      if (child) {
        if (child.getNode().isDirectory()) link2 = child;
        else throw createError(ENOTDIR, "mkdir", child.getPath());
      } else {
        link2 = link2.createChild(step, this.createNode(true, modeNum));
      }
    }
  }
  mkdirSync(path, options) {
    const opts = getMkdirOptions(options);
    const modeNum = modeToNumber(opts.mode, 511);
    const filename = pathToFilename(path);
    if (opts.recursive) this.mkdirpBase(filename, modeNum);
    else this.mkdirBase(filename, modeNum);
  }
  mkdir(path, a17, b24) {
    const opts = getMkdirOptions(a17);
    const callback = validateCallback(typeof a17 === "function" ? a17 : b24);
    const modeNum = modeToNumber(opts.mode, 511);
    const filename = pathToFilename(path);
    if (opts.recursive) this.wrapAsync(this.mkdirpBase, [filename, modeNum], callback);
    else this.wrapAsync(this.mkdirBase, [filename, modeNum], callback);
  }
  // legacy interface
  mkdirpSync(path, mode) {
    this.mkdirSync(path, { mode, recursive: true });
  }
  mkdirp(path, a17, b24) {
    const mode = typeof a17 === "function" ? void 0 : a17;
    const callback = validateCallback(typeof a17 === "function" ? a17 : b24);
    this.mkdir(path, { mode, recursive: true }, callback);
  }
  mkdtempBase(prefix, encoding, retry = 5) {
    const filename = prefix + this.genRndStr();
    try {
      this.mkdirBase(filename, 511 /* DIR */);
      return strToEncoding(filename, encoding);
    } catch (err) {
      if (err.code === EEXIST) {
        if (retry > 1) return this.mkdtempBase(prefix, encoding, retry - 1);
        else throw Error("Could not create temp dir.");
      } else throw err;
    }
  }
  mkdtempSync(prefix, options) {
    const { encoding } = getDefaultOpts(options);
    if (!prefix || typeof prefix !== "string") throw new TypeError("filename prefix is required");
    nullCheck(prefix);
    return this.mkdtempBase(prefix, encoding);
  }
  mkdtemp(prefix, a17, b24) {
    const [{ encoding }, callback] = getDefaultOptsAndCb(a17, b24);
    if (!prefix || typeof prefix !== "string") throw new TypeError("filename prefix is required");
    if (!nullCheck(prefix)) return;
    this.wrapAsync(this.mkdtempBase, [prefix, encoding], callback);
  }
  rmdirBase(filename, options) {
    const opts = getRmdirOptions(options);
    const link2 = this.getLinkAsDirOrThrow(filename, "rmdir");
    if (link2.length && !opts.recursive) throw createError(ENOTEMPTY, "rmdir", filename);
    this.deleteLink(link2);
  }
  rmdirSync(path, options) {
    this.rmdirBase(pathToFilename(path), options);
  }
  rmdir(path, a17, b24) {
    const opts = getRmdirOptions(a17);
    const callback = validateCallback(typeof a17 === "function" ? a17 : b24);
    this.wrapAsync(this.rmdirBase, [pathToFilename(path), opts], callback);
  }
  fchmodBase(fd, modeNum) {
    const file = this.getFileByFdOrThrow(fd, "fchmod");
    file.chmod(modeNum);
  }
  fchmodSync(fd, mode) {
    this.fchmodBase(fd, modeToNumber(mode));
  }
  fchmod(fd, mode, callback) {
    this.wrapAsync(this.fchmodBase, [fd, modeToNumber(mode)], callback);
  }
  chmodBase(filename, modeNum) {
    const fd = this.openSync(filename, "r+");
    try {
      this.fchmodBase(fd, modeNum);
    } finally {
      this.closeSync(fd);
    }
  }
  chmodSync(path, mode) {
    const modeNum = modeToNumber(mode);
    const filename = pathToFilename(path);
    this.chmodBase(filename, modeNum);
  }
  chmod(path, mode, callback) {
    const modeNum = modeToNumber(mode);
    const filename = pathToFilename(path);
    this.wrapAsync(this.chmodBase, [filename, modeNum], callback);
  }
  lchmodBase(filename, modeNum) {
    const fd = this.openBase(filename, O_RDWR, 0, false);
    try {
      this.fchmodBase(fd, modeNum);
    } finally {
      this.closeSync(fd);
    }
  }
  lchmodSync(path, mode) {
    const modeNum = modeToNumber(mode);
    const filename = pathToFilename(path);
    this.lchmodBase(filename, modeNum);
  }
  lchmod(path, mode, callback) {
    const modeNum = modeToNumber(mode);
    const filename = pathToFilename(path);
    this.wrapAsync(this.lchmodBase, [filename, modeNum], callback);
  }
  fchownBase(fd, uid, gid) {
    this.getFileByFdOrThrow(fd, "fchown").chown(uid, gid);
  }
  fchownSync(fd, uid, gid) {
    validateUid(uid);
    validateGid(gid);
    this.fchownBase(fd, uid, gid);
  }
  fchown(fd, uid, gid, callback) {
    validateUid(uid);
    validateGid(gid);
    this.wrapAsync(this.fchownBase, [fd, uid, gid], callback);
  }
  chownBase(filename, uid, gid) {
    const link2 = this.getResolvedLinkOrThrow(filename, "chown");
    const node = link2.getNode();
    node.chown(uid, gid);
  }
  chownSync(path, uid, gid) {
    validateUid(uid);
    validateGid(gid);
    this.chownBase(pathToFilename(path), uid, gid);
  }
  chown(path, uid, gid, callback) {
    validateUid(uid);
    validateGid(gid);
    this.wrapAsync(this.chownBase, [pathToFilename(path), uid, gid], callback);
  }
  lchownBase(filename, uid, gid) {
    this.getLinkOrThrow(filename, "lchown").getNode().chown(uid, gid);
  }
  lchownSync(path, uid, gid) {
    validateUid(uid);
    validateGid(gid);
    this.lchownBase(pathToFilename(path), uid, gid);
  }
  lchown(path, uid, gid, callback) {
    validateUid(uid);
    validateGid(gid);
    this.wrapAsync(this.lchownBase, [pathToFilename(path), uid, gid], callback);
  }
  statWatchers = {};
  watchFile(path, a17, b24) {
    const filename = pathToFilename(path);
    let options = a17;
    let listener = b24;
    if (typeof options === "function") {
      listener = a17;
      options = null;
    }
    if (typeof listener !== "function") {
      throw Error('"watchFile()" requires a listener function');
    }
    let interval = 5007;
    let persistent = true;
    if (options && typeof options === "object") {
      if (typeof options.interval === "number") interval = options.interval;
      if (typeof options.persistent === "boolean") persistent = options.persistent;
    }
    let watcher = this.statWatchers[filename];
    if (!watcher) {
      watcher = new this.StatWatcher();
      watcher.start(filename, persistent, interval);
      this.statWatchers[filename] = watcher;
    }
    watcher.addListener("change", listener);
    return watcher;
  }
  unwatchFile(path, listener) {
    const filename = pathToFilename(path);
    const watcher = this.statWatchers[filename];
    if (!watcher) return;
    if (typeof listener === "function") {
      watcher.removeListener("change", listener);
    } else {
      watcher.removeAllListeners("change");
    }
    if (watcher.listenerCount("change") === 0) {
      watcher.stop();
      delete this.statWatchers[filename];
    }
  }
  createReadStream(path, options) {
    return new this.ReadStream(path, options);
  }
  createWriteStream(path, options) {
    return new this.WriteStream(path, options);
  }
  // watch(path: TFilePath): FSWatcher;
  // watch(path: TFilePath, options?: IWatchOptions | string): FSWatcher;
  watch(path, options, listener) {
    const filename = pathToFilename(path);
    let givenOptions = options;
    if (typeof options === "function") {
      listener = options;
      givenOptions = null;
    }
    let { persistent, recursive, encoding } = getDefaultOpts(givenOptions);
    if (persistent === void 0) persistent = true;
    if (recursive === void 0) recursive = false;
    const watcher = new this.FSWatcher();
    watcher.start(filename, persistent, recursive, encoding);
    if (listener) {
      watcher.addListener("change", listener);
    }
    return watcher;
  }
};
function emitStop(self2) {
  self2.emit("stop");
}
var StatWatcher = class extends EventEmitter2 {
  vol;
  filename;
  interval;
  timeoutRef;
  setTimeout;
  prev;
  constructor(vol2) {
    super();
    this.vol = vol2;
  }
  loop() {
    this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
  }
  hasChanged(stats) {
    if (stats.mtimeMs > this.prev.mtimeMs) return true;
    if (stats.nlink !== this.prev.nlink) return true;
    return false;
  }
  onInterval = () => {
    try {
      const stats = this.vol.statSync(this.filename);
      if (this.hasChanged(stats)) {
        this.emit("change", stats, this.prev);
        this.prev = stats;
      }
    } finally {
      this.loop();
    }
  };
  start(path, persistent = true, interval = 5007) {
    this.filename = pathToFilename(path);
    this.setTimeout = persistent ? setTimeout : setTimeoutUnref_default;
    this.interval = interval;
    this.prev = this.vol.statSync(this.filename);
    this.loop();
  }
  stop() {
    clearTimeout(this.timeoutRef);
    process_default.nextTick(emitStop, this);
  }
};
var pool;
function allocNewPool(poolSize) {
  pool = bufferAllocUnsafe(poolSize);
  pool.used = 0;
}
util_default7.inherits(FsReadStream, Readable2);
exports7.ReadStream = FsReadStream;
function FsReadStream(vol2, path, options) {
  if (!(this instanceof FsReadStream)) return new FsReadStream(vol2, path, options);
  this._vol = vol2;
  options = j4({}, getOptions(options, {}));
  if (options.highWaterMark === void 0) options.highWaterMark = 64 * 1024;
  Readable2.call(this, options);
  this.path = pathToFilename(path);
  this.fd = options.fd === void 0 ? null : options.fd;
  this.flags = options.flags === void 0 ? "r" : options.flags;
  this.mode = options.mode === void 0 ? 438 : options.mode;
  this.start = options.start;
  this.end = options.end;
  this.autoClose = options.autoClose === void 0 ? true : options.autoClose;
  this.pos = void 0;
  this.bytesRead = 0;
  if (this.start !== void 0) {
    if (typeof this.start !== "number") {
      throw new TypeError('"start" option must be a Number');
    }
    if (this.end === void 0) {
      this.end = Infinity;
    } else if (typeof this.end !== "number") {
      throw new TypeError('"end" option must be a Number');
    }
    if (this.start > this.end) {
      throw new Error('"start" option must be <= "end" option');
    }
    this.pos = this.start;
  }
  if (typeof this.fd !== "number") this.open();
  this.on("end", function() {
    if (this.autoClose) {
      if (this.destroy) this.destroy();
    }
  });
}
FsReadStream.prototype.open = function() {
  var self2 = this;
  this._vol.open(this.path, this.flags, this.mode, (er, fd) => {
    if (er) {
      if (self2.autoClose) {
        if (self2.destroy) self2.destroy();
      }
      self2.emit("error", er);
      return;
    }
    self2.fd = fd;
    self2.emit("open", fd);
    self2.read();
  });
};
FsReadStream.prototype._read = function(n30) {
  if (typeof this.fd !== "number") {
    return this.once("open", function() {
      this._read(n30);
    });
  }
  if (this.destroyed) return;
  if (!pool || pool.length - pool.used < kMinPoolSpace) {
    allocNewPool(this._readableState.highWaterMark);
  }
  var thisPool = pool;
  var toRead = Math.min(pool.length - pool.used, n30);
  var start = pool.used;
  if (this.pos !== void 0) toRead = Math.min(this.end - this.pos + 1, toRead);
  if (toRead <= 0) return this.push(null);
  var self2 = this;
  this._vol.read(this.fd, pool, pool.used, toRead, this.pos, onread);
  if (this.pos !== void 0) this.pos += toRead;
  pool.used += toRead;
  function onread(er, bytesRead) {
    if (er) {
      if (self2.autoClose && self2.destroy) {
        self2.destroy();
      }
      self2.emit("error", er);
    } else {
      var b24 = null;
      if (bytesRead > 0) {
        self2.bytesRead += bytesRead;
        b24 = thisPool.slice(start, start + bytesRead);
      }
      self2.push(b24);
    }
  }
};
FsReadStream.prototype._destroy = function(err, cb) {
  this.close((err2) => {
    cb(err || err2);
  });
};
FsReadStream.prototype.close = function(cb) {
  if (cb) this.once("close", cb);
  if (this.closed || typeof this.fd !== "number") {
    if (typeof this.fd !== "number") {
      this.once("open", closeOnOpen);
      return;
    }
    return process_default.nextTick(() => this.emit("close"));
  }
  this.closed = true;
  this._vol.close(this.fd, (er) => {
    if (er) this.emit("error", er);
    else this.emit("close");
  });
  this.fd = null;
};
function closeOnOpen(fd) {
  this.close();
}
util_default7.inherits(FsWriteStream, Writable2);
exports7.WriteStream = FsWriteStream;
function FsWriteStream(vol2, path, options) {
  if (!(this instanceof FsWriteStream)) return new FsWriteStream(vol2, path, options);
  this._vol = vol2;
  options = j4({}, getOptions(options, {}));
  Writable2.call(this, options);
  this.path = pathToFilename(path);
  this.fd = options.fd === void 0 ? null : options.fd;
  this.flags = options.flags === void 0 ? "w" : options.flags;
  this.mode = options.mode === void 0 ? 438 : options.mode;
  this.start = options.start;
  this.autoClose = options.autoClose === void 0 ? true : !!options.autoClose;
  this.pos = void 0;
  this.bytesWritten = 0;
  if (this.start !== void 0) {
    if (typeof this.start !== "number") {
      throw new TypeError('"start" option must be a Number');
    }
    if (this.start < 0) {
      throw new Error('"start" must be >= zero');
    }
    this.pos = this.start;
  }
  if (options.encoding) this.setDefaultEncoding(options.encoding);
  if (typeof this.fd !== "number") this.open();
  this.once("finish", function() {
    if (this.autoClose) {
      this.close();
    }
  });
}
FsWriteStream.prototype.open = function() {
  this._vol.open(
    this.path,
    this.flags,
    this.mode,
    function(er, fd) {
      if (er) {
        if (this.autoClose && this.destroy) {
          this.destroy();
        }
        this.emit("error", er);
        return;
      }
      this.fd = fd;
      this.emit("open", fd);
    }.bind(this)
  );
};
FsWriteStream.prototype._write = function(data, encoding, cb) {
  if (!(data instanceof Buffer3)) return this.emit("error", new Error("Invalid data"));
  if (typeof this.fd !== "number") {
    return this.once("open", function() {
      this._write(data, encoding, cb);
    });
  }
  var self2 = this;
  this._vol.write(this.fd, data, 0, data.length, this.pos, (er, bytes) => {
    if (er) {
      if (self2.autoClose && self2.destroy) {
        self2.destroy();
      }
      return cb(er);
    }
    self2.bytesWritten += bytes;
    cb();
  });
  if (this.pos !== void 0) this.pos += data.length;
};
FsWriteStream.prototype._writev = function(data, cb) {
  if (typeof this.fd !== "number") {
    return this.once("open", function() {
      this._writev(data, cb);
    });
  }
  const self2 = this;
  const len = data.length;
  const chunks = new Array(len);
  var size = 0;
  for (var i18 = 0; i18 < len; i18++) {
    var chunk = data[i18].chunk;
    chunks[i18] = chunk;
    size += chunk.length;
  }
  const buf = Buffer3.concat(chunks);
  this._vol.write(this.fd, buf, 0, buf.length, this.pos, (er, bytes) => {
    if (er) {
      if (self2.destroy) self2.destroy();
      return cb(er);
    }
    self2.bytesWritten += bytes;
    cb();
  });
  if (this.pos !== void 0) this.pos += size;
};
FsWriteStream.prototype._destroy = FsReadStream.prototype._destroy;
FsWriteStream.prototype.close = FsReadStream.prototype.close;
FsWriteStream.prototype.destroySoon = FsWriteStream.prototype.end;
var FSWatcher = class extends EventEmitter2 {
  _vol;
  _filename = "";
  _steps;
  _filenameEncoded = "";
  // _persistent: boolean = true;
  _recursive = false;
  _encoding = ENCODING_UTF8;
  _link;
  _timer;
  // Timer that keeps this task persistent.
  constructor(vol2) {
    super();
    this._vol = vol2;
  }
  _getName() {
    return this._steps[this._steps.length - 1];
  }
  _onNodeChange = () => {
    this._emit("change");
  };
  _onParentChild = (link2) => {
    if (link2.getName() === this._getName()) {
      this._emit("rename");
    }
  };
  _emit = (type) => {
    this.emit("change", type, this._filenameEncoded);
  };
  _persist = () => {
    this._timer = setTimeout(this._persist, 1e6);
  };
  start(path, persistent = true, recursive = false, encoding = ENCODING_UTF8) {
    this._filename = pathToFilename(path);
    this._steps = filenameToSteps(this._filename);
    this._filenameEncoded = strToEncoding(this._filename);
    this._recursive = recursive;
    this._encoding = encoding;
    try {
      this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher");
    } catch (err) {
      const error = new Error(`watch ${this._filename} ${err.code}`);
      error.code = err.code;
      error.errno = err.code;
      throw error;
    }
    this._link.getNode().on("change", this._onNodeChange);
    this._link.on("child:add", this._onNodeChange);
    this._link.on("child:delete", this._onNodeChange);
    const parent = this._link.parent;
    if (parent) {
      parent.setMaxListeners(parent.getMaxListeners() + 1);
      parent.on("child:delete", this._onParentChild);
    }
    if (persistent) this._persist();
  }
  close() {
    clearTimeout(this._timer);
    this._link.getNode().removeListener("change", this._onNodeChange);
    const parent = this._link.parent;
    if (parent) {
      parent.removeListener("child:delete", this._onParentChild);
    }
  }
};

// fs-monkey/lib/util/lists.js
var fsProps = ["constants", "F_OK", "R_OK", "W_OK", "X_OK", "Stats"];
var fsSyncMethods = ["renameSync", "ftruncateSync", "truncateSync", "chownSync", "fchownSync", "lchownSync", "chmodSync", "fchmodSync", "lchmodSync", "statSync", "lstatSync", "fstatSync", "linkSync", "symlinkSync", "readlinkSync", "realpathSync", "unlinkSync", "rmdirSync", "mkdirSync", "mkdirpSync", "readdirSync", "closeSync", "openSync", "utimesSync", "futimesSync", "fsyncSync", "writeSync", "readSync", "readFileSync", "writeFileSync", "appendFileSync", "existsSync", "accessSync", "fdatasyncSync", "mkdtempSync", "copyFileSync", "rmSync", "createReadStream", "createWriteStream"];
var fsAsyncMethods = ["rename", "ftruncate", "truncate", "chown", "fchown", "lchown", "chmod", "fchmod", "lchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "mkdirp", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile", "exists", "access", "fdatasync", "mkdtemp", "copyFile", "rm", "watchFile", "unwatchFile", "watch"];
var exports8 = { fsProps, fsSyncMethods, fsAsyncMethods };
exports8.default = exports8;

// memfs-3.0.4/index.ts
var constants4 = constants3;
var { F_OK: F_OK2, R_OK, W_OK, X_OK } = constants4;
var exports9 = {};
var Volume2 = Volume;
exports9.Volume = Volume2;
var vol = new Volume();
exports9.vol = vol;
function createFsFromVolume(vol2) {
  const fs2 = { F_OK: F_OK2, R_OK, W_OK, X_OK, constants: constants4, Stats: Stats2, Dirent: Dirent2 };
  for (const method of fsSyncMethods) if (typeof vol2[method] === "function") fs2[method] = vol2[method].bind(vol2);
  for (const method of fsAsyncMethods) if (typeof vol2[method] === "function") fs2[method] = vol2[method].bind(vol2);
  fs2.StatWatcher = vol2.StatWatcher;
  fs2.FSWatcher = vol2.FSWatcher;
  fs2.WriteStream = vol2.WriteStream;
  fs2.ReadStream = vol2.ReadStream;
  fs2.promises = vol2.promises;
  fs2._toUnixTimestamp = toUnixTimestamp;
  return fs2;
}
exports9.createFsFromVolume = createFsFromVolume;
var fs = createFsFromVolume(vol);
exports9.fs = fs;
Object.assign(exports9, fs);
exports9.default = exports9;
var {
  // this is all the stuff from Object.assign(exports, fs)
  Stats: Stats2,
  Dirent: Dirent2,
  renameSync,
  ftruncateSync,
  truncateSync,
  chownSync,
  fchownSync,
  lchownSync,
  chmodSync,
  fchmodSync,
  lchmodSync,
  statSync,
  lstatSync,
  fstatSync,
  linkSync,
  symlinkSync,
  readlinkSync,
  realpathSync,
  unlinkSync,
  rmdirSync,
  mkdirSync,
  mkdirpSync,
  readdirSync,
  closeSync,
  openSync,
  utimesSync,
  futimesSync,
  fsyncSync,
  writeSync,
  readSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
  existsSync,
  accessSync,
  fdatasyncSync,
  mkdtempSync,
  copyFileSync,
  createReadStream,
  createWriteStream,
  rename,
  ftruncate,
  truncate,
  chown,
  fchown,
  lchown,
  chmod,
  fchmod,
  lchmod,
  stat: stat2,
  lstat,
  fstat,
  link,
  symlink,
  readlink,
  realpath,
  unlink,
  rmdir,
  mkdir,
  mkdirp,
  readdir,
  close,
  open,
  utimes,
  futimes,
  fsync,
  write: write3,
  read: read3,
  readFile,
  writeFile,
  appendFile,
  exists,
  access,
  fdatasync,
  mkdtemp,
  copyFile,
  watchFile,
  unwatchFile,
  watch,
  StatWatcher: StatWatcher2,
  FSWatcher: FSWatcher2,
  WriteStream,
  ReadStream,
  promises,
  _toUnixTimestamp
} = fs;

// wasmfs/node_sync_emit.ts
Node.prototype.emit = function(event, ...args) {
  const listeners2 = this.listeners(event);
  for (let listener of listeners2) {
    try {
      listener(...args);
    } catch (e3) {
      console.error(e3);
    }
  }
  return listeners2.length > 0;
};

// wasmfs/index.ts
var assert3 = (cond, message2) => {
  if (!cond) {
    throw new Error(message2);
  }
};
var WasmFsDefault = class {
  volume;
  fs;
  constructor() {
    this.volume = new Volume();
    this.fs = createFsFromVolume(this.volume);
    this.fromJSON({
      "/dev/stdin": "",
      "/dev/stdout": "",
      "/dev/stderr": ""
    });
  }
  _toJSON(link2, json = {}, path) {
    let isEmpty = true;
    for (const name in link2.children) {
      isEmpty = false;
      const child = link2.getChild(name);
      if (child) {
        const node = child.getNode();
        if (node && node.isFile()) {
          let filename = child.getPath();
          if (path) filename = K(path, filename);
          json[filename] = node.getBuffer();
        } else if (node && node.isDirectory()) {
          this._toJSON(child, json, path);
        }
      }
    }
    let dirPath = link2.getPath();
    if (path) dirPath = K(path, dirPath);
    if (dirPath && isEmpty) {
      json[dirPath] = null;
    }
    return json;
  }
  toJSON(paths, json = {}, isRelative = false) {
    const links = [];
    if (paths) {
      if (!(paths instanceof Array)) paths = [paths];
      for (const path of paths) {
        const filename = pathToFilename(path);
        const link2 = this.volume.getResolvedLink(filename);
        if (!link2) continue;
        links.push(link2);
      }
    } else {
      links.push(this.volume.root);
    }
    if (!links.length) return json;
    for (const link2 of links)
      this._toJSON(link2, json, isRelative ? link2.getPath() : "");
    return json;
  }
  fromJSONFixed(vol2, json) {
    const sep3 = "/";
    for (let filename in json) {
      const data = json[filename];
      const isDir = data ? Object.getPrototypeOf(data) === null : data === null;
      if (!isDir) {
        const steps = filenameToSteps(filename);
        if (steps.length > 1) {
          const dirname2 = sep3 + steps.slice(0, steps.length - 1).join(sep3);
          vol2.mkdirpBase(dirname2, 511);
        }
        vol2.writeFileSync(filename, data || "");
      } else {
        vol2.mkdirpBase(filename, 511);
      }
    }
  }
  fromJSON(fsJson) {
    this.volume = new Volume();
    this.fromJSONFixed(this.volume, fsJson);
    this.fs = createFsFromVolume(this.volume);
    this.volume.releasedFds = [0, 1, 2];
    const fdErr = this.volume.openSync("/dev/stderr", "w");
    const fdOut = this.volume.openSync("/dev/stdout", "w");
    const fdIn = this.volume.openSync("/dev/stdin", "r");
    assert3(fdErr === 2, `invalid handle for stderr: ${fdErr}`);
    assert3(fdOut === 1, `invalid handle for stdout: ${fdOut}`);
    assert3(fdIn === 0, `invalid handle for stdin: ${fdIn}`);
  }
  async getStdOut() {
    let promise = new Promise((resolve3) => {
      resolve3(this.fs.readFileSync("/dev/stdout", "utf8"));
    });
    return promise;
  }
};
var WasmFs = WasmFsDefault;

// wasi_worker.ts
Object.defineProperty(Object.getPrototypeOf({}), "__proto__", {
  get() {
    return Object.getPrototypeOf(this);
  },
  set(value) {
    return Object.setPrototypeOf(this, value);
  }
});
var WasiWorker = class {
  constructor(self2) {
    this.self = self2;
    const originalWriteSync = this.wasmFs.fs.writeSync.bind(this.wasmFs.fs);
    this.wasmFs.fs.writeSync = (fd, buffer, offset, length, position) => {
      switch (fd) {
        case 1:
        case 2:
          {
            const text = typeof buffer === "string" ? buffer : new TextDecoder("utf-8").decode(buffer);
            this.self.postMessage({
              action: "consoleOut",
              text,
              isError: fd === 2
            });
          }
          break;
      }
      return originalWriteSync(fd, buffer, offset, length, position);
    };
    this.self.onmessage = async (ev) => {
      const data = ev.data;
      let result;
      try {
        switch (data.action) {
          case "writeFile":
            this.writeFile(data.filePath, data.content);
            break;
          case "readFile":
            result = this.readFile(data.filePath);
            break;
          case "unlink":
            this.unlink(data.filePath);
            break;
          case "chdir":
            result = this.chdir(data.filePath);
            break;
          case "mkdir":
            this.mkdir(data.filePath, data.option);
            break;
          case "readdir":
            result = this.readdir(data.filePath);
            break;
          case "runWasi":
            result = await this.runWasi(data.filePath, data.args);
            break;
          default:
            throw `${data.action}: Not handled`;
        }
        this.self.postMessage({ messageId: data.messageId, result });
      } catch (e3) {
        this.self.postMessage({ messageId: data.messageId, error: e3.toString() });
      }
    };
  }
  wasmFs = new WasmFs();
  curDir = "/";
  writeFile(filePath, content) {
    this.wasmFs.fs.writeFileSync(filePath, content);
  }
  readFile(filePath) {
    const content = this.wasmFs.fs.readFileSync(filePath);
    if (content != null) {
      return content;
    } else {
      throw `File not found: ${filePath}`;
    }
  }
  unlink(filePath) {
    this.wasmFs.fs.unlinkSync(filePath);
  }
  chdir(filePath) {
    const stat3 = this.wasmFs.fs.statSync(filePath);
    if (!stat3.isDirectory()) return false;
    this.curDir = filePath;
    return true;
  }
  mkdir(filePath, option) {
    this.wasmFs.fs.mkdirSync(filePath, option);
  }
  readdir(filePath) {
    return this.wasmFs.fs.readdirSync(filePath);
  }
  async runWasi(filePath, args) {
    const waProc = new WaProc(this.wasmFs, args, this.curDir);
    let exitCode = 0;
    try {
      await waProc.runWasiEntry(filePath);
    } catch (e3) {
      if (!(e3 instanceof WASIExitError)) throw e3;
      const err = e3;
      exitCode = err.code;
    }
    return exitCode;
  }
};
try {
  new WasiWorker(self);
} catch (error) {
  throw new Error(`error: ${error.stack}`);
}
export {
  WasiWorker
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
/*! Bundled license information:

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
