var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

Object.defineProperty(Object.getPrototypeOf({}), "__proto__", {
    get() {
        return Object.getPrototypeOf(this)
    },
    set(value) {
        return Object.setPrototypeOf(this, value)
    }
})

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
      for (var i4 = 0; i4 < 64 - bigNumberAsBinaryStr.length; i4++) {
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
    for (var i4 = 0; i4 < 32 - lowWordAsBinaryStr.length; i4++) {
      lowWordAsBinaryStrPadded += "0";
    }
    lowWordAsBinaryStrPadded += lowWordAsBinaryStr;
    return BigIntPolyfill("0b" + highWordAsBinaryStr + lowWordAsBinaryStrPadded);
  };
}
exports2.DataViewPolyfill = exportedDataView;
var { DataViewPolyfill } = exports2;

// https://cdn.jsdelivr.net/npm/buffer-es6@4.9.3/base64.js
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var inited = false;
function init() {
  inited = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i4 = 0, len = code.length; i4 < len; ++i4) {
    lookup[i4] = code[i4];
    revLookup[code.charCodeAt(i4)] = i4;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i4, j7, l4, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr(len * 3 / 4 - placeHolders);
  l4 = placeHolders > 0 ? len - 4 : len;
  var L4 = 0;
  for (i4 = 0, j7 = 0; i4 < l4; i4 += 4, j7 += 3) {
    tmp = revLookup[b64.charCodeAt(i4)] << 18 | revLookup[b64.charCodeAt(i4 + 1)] << 12 | revLookup[b64.charCodeAt(i4 + 2)] << 6 | revLookup[b64.charCodeAt(i4 + 3)];
    arr[L4++] = tmp >> 16 & 255;
    arr[L4++] = tmp >> 8 & 255;
    arr[L4++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i4)] << 2 | revLookup[b64.charCodeAt(i4 + 1)] >> 4;
    arr[L4++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i4)] << 10 | revLookup[b64.charCodeAt(i4 + 1)] << 4 | revLookup[b64.charCodeAt(i4 + 2)] >> 2;
    arr[L4++] = tmp >> 8 & 255;
    arr[L4++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i4 = start; i4 < end; i4 += 3) {
    tmp = (uint8[i4] << 16) + (uint8[i4 + 1] << 8) + uint8[i4 + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i4 = 0, len2 = len - extraBytes; i4 < len2; i4 += maxChunkLength) {
    parts.push(encodeChunk(uint8, i4, i4 + maxChunkLength > len2 ? len2 : i4 + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 63];
    output += lookup[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}

// https://cdn.jsdelivr.net/npm/buffer-es6@4.9.3/ieee754.js
function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m6;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i4 = isLE ? nBytes - 1 : 0;
  var d8 = isLE ? -1 : 1;
  var s3 = buffer[offset + i4];
  i4 += d8;
  e = s3 & (1 << -nBits) - 1;
  s3 >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i4], i4 += d8, nBits -= 8) {
  }
  m6 = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m6 = m6 * 256 + buffer[offset + i4], i4 += d8, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m6 ? NaN : (s3 ? -1 : 1) * Infinity;
  } else {
    m6 = m6 + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s3 ? -1 : 1) * m6 * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m6, c5;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i4 = isLE ? 0 : nBytes - 1;
  var d8 = isLE ? 1 : -1;
  var s3 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m6 = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c5 = Math.pow(2, -e)) < 1) {
      e--;
      c5 *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c5;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c5 >= 2) {
      e++;
      c5 /= 2;
    }
    if (e + eBias >= eMax) {
      m6 = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m6 = (value * c5 - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m6 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i4] = m6 & 255, i4 += d8, m6 /= 256, mLen -= 8) {
  }
  e = e << mLen | m6;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i4] = e & 255, i4 += d8, e /= 256, eLen -= 8) {
  }
  buffer[offset + i4 - d8] |= s3 * 128;
}

// https://cdn.jsdelivr.net/npm/buffer-es6@4.9.3/isArray.js
var toString = {}.toString;
var isArray_default = Array.isArray || function(arr) {
  return toString.call(arr) == "[object Array]";
};

// buffer_es6@4_9_3.js
var INSPECT_MAX_BYTES = 50;
Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
var _kMaxLength = kMaxLength();
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer2.prototype;
  } else {
    if (that === null) {
      that = new Buffer2(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
    return new Buffer2(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
Buffer2.poolSize = 8192;
Buffer2._augment = function(arr) {
  arr.__proto__ = Buffer2.prototype;
  return arr;
};
function from(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
Buffer2.from = function(value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};
if (Buffer2.TYPED_ARRAY_SUPPORT) {
  Buffer2.prototype.__proto__ = Uint8Array.prototype;
  Buffer2.__proto__ = Uint8Array;
  if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
  }
}
function assertSize(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill2, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill2 !== void 0) {
    return typeof encoding === "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2);
  }
  return createBuffer(that, size);
}
Buffer2.alloc = function(size, fill2, encoding) {
  return alloc(null, size, fill2, encoding);
};
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
    for (var i4 = 0; i4 < size; ++i4) {
      that[i4] = 0;
    }
  }
  return that;
}
Buffer2.allocUnsafe = function(size) {
  return allocUnsafe(null, size);
};
Buffer2.allocUnsafeSlow = function(size) {
  return allocUnsafe(null, size);
};
function fromString(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i4 = 0; i4 < length; i4 += 1) {
    that[i4] = array[i4] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer2.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === "Buffer" && isArray_default(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
  }
  return length | 0;
}
Buffer2.isBuffer = isBuffer;
function internalIsBuffer(b6) {
  return !!(b6 != null && b6._isBuffer);
}
Buffer2.compare = function compare(a3, b6) {
  if (!internalIsBuffer(a3) || !internalIsBuffer(b6)) {
    throw new TypeError("Arguments must be Buffers");
  }
  if (a3 === b6) return 0;
  var x9 = a3.length;
  var y5 = b6.length;
  for (var i4 = 0, len = Math.min(x9, y5); i4 < len; ++i4) {
    if (a3[i4] !== b6[i4]) {
      x9 = a3[i4];
      y5 = b6[i4];
      break;
    }
  }
  if (x9 < y5) return -1;
  if (y5 < x9) return 1;
  return 0;
};
Buffer2.isEncoding = function isEncoding(encoding) {
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
Buffer2.concat = function concat(list, length) {
  if (!isArray_default(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }
  if (list.length === 0) {
    return Buffer2.alloc(0);
  }
  var i4;
  if (length === void 0) {
    length = 0;
    for (i4 = 0; i4 < list.length; ++i4) {
      length += list[i4].length;
    }
  }
  var buffer = Buffer2.allocUnsafe(length);
  var pos = 0;
  for (i4 = 0; i4 < list.length; ++i4) {
    var buf = list[i4];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0) return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
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
        if (loweredCase) return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer2.byteLength = byteLength;
function slowToString(encoding, start, end) {
  var loweredCase = false;
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
  if (!encoding) encoding = "utf8";
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
        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer2.prototype._isBuffer = true;
function swap(b6, n3, m6) {
  var i4 = b6[n3];
  b6[n3] = b6[m6];
  b6[m6] = i4;
}
Buffer2.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  }
  for (var i4 = 0; i4 < len; i4 += 2) {
    swap(this, i4, i4 + 1);
  }
  return this;
};
Buffer2.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  }
  for (var i4 = 0; i4 < len; i4 += 4) {
    swap(this, i4, i4 + 3);
    swap(this, i4 + 1, i4 + 2);
  }
  return this;
};
Buffer2.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  }
  for (var i4 = 0; i4 < len; i4 += 8) {
    swap(this, i4, i4 + 7);
    swap(this, i4 + 1, i4 + 6);
    swap(this, i4 + 2, i4 + 5);
    swap(this, i4 + 3, i4 + 4);
  }
  return this;
};
Buffer2.prototype.toString = function toString2() {
  var length = this.length | 0;
  if (length === 0) return "";
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};
Buffer2.prototype.equals = function equals(b6) {
  if (!internalIsBuffer(b6)) throw new TypeError("Argument must be a Buffer");
  if (this === b6) return true;
  return Buffer2.compare(this, b6) === 0;
};
Buffer2.prototype.inspect = function inspect() {
  var str = "";
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
    if (this.length > max) str += " ... ";
  }
  return "<Buffer " + str + ">";
};
Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError("Argument must be a Buffer");
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
  if (this === target) return 0;
  var x9 = thisEnd - thisStart;
  var y5 = end - start;
  var len = Math.min(x9, y5);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);
  for (var i4 = 0; i4 < len; ++i4) {
    if (thisCopy[i4] !== targetCopy[i4]) {
      x9 = thisCopy[i4];
      y5 = targetCopy[i4];
      break;
    }
  }
  if (x9 < y5) return -1;
  if (y5 < x9) return 1;
  return 0;
};
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0) return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1;
  }
  if (typeof val === "string") {
    val = Buffer2.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
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
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
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
  function read2(buf, i5) {
    if (indexSize === 1) {
      return buf[i5];
    } else {
      return buf.readUInt16BE(i5 * indexSize);
    }
  }
  var i4;
  if (dir) {
    var foundIndex = -1;
    for (i4 = byteOffset; i4 < arrLength; i4++) {
      if (read2(arr, i4) === read2(val, foundIndex === -1 ? 0 : i4 - foundIndex)) {
        if (foundIndex === -1) foundIndex = i4;
        if (i4 - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i4 -= i4 - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i4 = byteOffset; i4 >= 0; i4--) {
      var found = true;
      for (var j7 = 0; j7 < valLength; j7++) {
        if (read2(arr, i4 + j7) !== read2(val, j7)) {
          found = false;
          break;
        }
      }
      if (found) return i4;
    }
  }
  return -1;
}
Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i4 = 0; i4 < length; ++i4) {
    var parsed = parseInt(string.substr(i4 * 2, 2), 16);
    if (isNaN(parsed)) return i4;
    buf[offset + i4] = parsed;
  }
  return i4;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer2.prototype.write = function write2(string, offset, length, encoding) {
  if (offset === void 0) {
    encoding = "utf8";
    length = this.length;
    offset = 0;
  } else if (length === void 0 && typeof offset === "string") {
    encoding = offset;
    length = this.length;
    offset = 0;
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === void 0) encoding = "utf8";
    } else {
      encoding = length;
      length = void 0;
    }
  } else {
    throw new Error(
      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
    );
  }
  var remaining = this.length - offset;
  if (length === void 0 || length > remaining) length = remaining;
  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError("Attempt to write outside buffer bounds");
  }
  if (!encoding) encoding = "utf8";
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "hex":
        return hexWrite(this, string, offset, length);
      case "utf8":
      case "utf-8":
        return utf8Write(this, string, offset, length);
      case "ascii":
        return asciiWrite(this, string, offset, length);
      case "latin1":
      case "binary":
        return latin1Write(this, string, offset, length);
      case "base64":
        return base64Write(this, string, offset, length);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return ucs2Write(this, string, offset, length);
      default:
        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};
Buffer2.prototype.toJSON = function toJSON() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i4 = start;
  while (i4 < end) {
    var firstByte = buf[i4];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i4 + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i4 + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i4 + 1];
          thirdByte = buf[i4 + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i4 + 1];
          thirdByte = buf[i4 + 2];
          fourthByte = buf[i4 + 3];
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
    i4 += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
var MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i4 = 0;
  while (i4 < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i4, i4 += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i4 = start; i4 < end; ++i4) {
    ret += String.fromCharCode(buf[i4] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i4 = start; i4 < end; ++i4) {
    ret += String.fromCharCode(buf[i4]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = "";
  for (var i4 = start; i4 < end; ++i4) {
    out += toHex(buf[i4]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i4 = 0; i4 < bytes.length; i4 += 2) {
    res += String.fromCharCode(bytes[i4] + bytes[i4 + 1] * 256);
  }
  return res;
}
Buffer2.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === void 0 ? len : ~~end;
  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }
  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }
  if (end < start) end = start;
  var newBuf;
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer2.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer2(sliceLen, void 0);
    for (var i4 = 0; i4 < sliceLen; ++i4) {
      newBuf[i4] = this[i4 + start];
    }
  }
  return newBuf;
};
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
  if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) checkOffset(offset, byteLength2, this.length);
  var val = this[offset];
  var mul = 1;
  var i4 = 0;
  while (++i4 < byteLength2 && (mul *= 256)) {
    val += this[offset + i4] * mul;
  }
  return val;
};
Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength2, this.length);
  }
  var val = this[offset + --byteLength2];
  var mul = 1;
  while (byteLength2 > 0 && (mul *= 256)) {
    val += this[offset + --byteLength2] * mul;
  }
  return val;
};
Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};
Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};
Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};
Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
};
Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) checkOffset(offset, byteLength2, this.length);
  var val = this[offset];
  var mul = 1;
  var i4 = 0;
  while (++i4 < byteLength2 && (mul *= 256)) {
    val += this[offset + i4] * mul;
  }
  mul *= 128;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
  return val;
};
Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) checkOffset(offset, byteLength2, this.length);
  var i4 = byteLength2;
  var mul = 1;
  var val = this[offset + --i4];
  while (i4 > 0 && (mul *= 256)) {
    val += this[offset + --i4] * mul;
  }
  mul *= 128;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
  return val;
};
Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 128)) return this[offset];
  return (255 - this[offset] + 1) * -1;
};
Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 32768 ? val | 4294901760 : val;
};
Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 32768 ? val | 4294901760 : val;
};
Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4);
};
Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4);
};
Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8);
};
Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
    checkInt(this, value, offset, byteLength2, maxBytes, 0);
  }
  var mul = 1;
  var i4 = 0;
  this[offset] = value & 255;
  while (++i4 < byteLength2 && (mul *= 256)) {
    this[offset + i4] = value / mul & 255;
  }
  return offset + byteLength2;
};
Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength2 = byteLength2 | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
    checkInt(this, value, offset, byteLength2, maxBytes, 0);
  }
  var i4 = byteLength2 - 1;
  var mul = 1;
  this[offset + i4] = value & 255;
  while (--i4 >= 0 && (mul *= 256)) {
    this[offset + i4] = value / mul & 255;
  }
  return offset + byteLength2;
};
Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 255;
  return offset + 1;
};
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 65535 + value + 1;
  for (var i4 = 0, j7 = Math.min(buf.length - offset, 2); i4 < j7; ++i4) {
    buf[offset + i4] = (value & 255 << 8 * (littleEndian ? i4 : 1 - i4)) >>> (littleEndian ? i4 : 1 - i4) * 8;
  }
}
Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};
Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 4294967295 + value + 1;
  for (var i4 = 0, j7 = Math.min(buf.length - offset, 4); i4 < j7; ++i4) {
    buf[offset + i4] = value >>> (littleEndian ? i4 : 3 - i4) * 8 & 255;
  }
}
Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};
Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};
Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength2 - 1);
    checkInt(this, value, offset, byteLength2, limit - 1, -limit);
  }
  var i4 = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 255;
  while (++i4 < byteLength2 && (mul *= 256)) {
    if (value < 0 && sub === 0 && this[offset + i4 - 1] !== 0) {
      sub = 1;
    }
    this[offset + i4] = (value / mul >> 0) - sub & 255;
  }
  return offset + byteLength2;
};
Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength2 - 1);
    checkInt(this, value, offset, byteLength2, limit - 1, -limit);
  }
  var i4 = byteLength2 - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i4] = value & 255;
  while (--i4 >= 0 && (mul *= 256)) {
    if (value < 0 && sub === 0 && this[offset + i4 + 1] !== 0) {
      sub = 1;
    }
    this[offset + i4] = (value / mul >> 0) - sub & 255;
  }
  return offset + byteLength2;
};
Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 255 + value + 1;
  this[offset] = value & 255;
  return offset + 1;
};
Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};
Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};
Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};
Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
  if (value < 0) value = 4294967295 + value + 1;
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError("Index out of range");
  if (offset < 0) throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};
Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};
Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};
Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;
  if (targetStart < 0) {
    throw new RangeError("targetStart out of bounds");
  }
  if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
  if (end < 0) throw new RangeError("sourceEnd out of bounds");
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }
  var len = end - start;
  var i4;
  if (this === target && start < targetStart && targetStart < end) {
    for (i4 = len - 1; i4 >= 0; --i4) {
      target[i4 + targetStart] = this[i4 + start];
    }
  } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
    for (i4 = 0; i4 < len; ++i4) {
      target[i4 + targetStart] = this[i4 + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }
  return len;
};
Buffer2.prototype.fill = function fill(val, start, end, encoding) {
  if (typeof val === "string") {
    if (typeof start === "string") {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === "string") {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== void 0 && typeof encoding !== "string") {
      throw new TypeError("encoding must be a string");
    }
    if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
  } else if (typeof val === "number") {
    val = val & 255;
  }
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError("Out of range index");
  }
  if (end <= start) {
    return this;
  }
  start = start >>> 0;
  end = end === void 0 ? this.length : end >>> 0;
  if (!val) val = 0;
  var i4;
  if (typeof val === "number") {
    for (i4 = start; i4 < end; ++i4) {
      this[i4] = val;
    }
  } else {
    var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
    var len = bytes.length;
    for (i4 = 0; i4 < end - start; ++i4) {
      this[i4 + start] = bytes[i4 % len];
    }
  }
  return this;
};
var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
  if (str.length < 2) return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex(n3) {
  if (n3 < 16) return "0" + n3.toString(16);
  return n3.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i4 = 0; i4 < length; ++i4) {
    codePoint = string.charCodeAt(i4);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        } else if (i4 + 1 === length) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) break;
      bytes.push(
        codePoint >> 6 | 192,
        codePoint & 63 | 128
      );
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) break;
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
  var byteArray = [];
  for (var i4 = 0; i4 < str.length; ++i4) {
    byteArray.push(str.charCodeAt(i4) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c5, hi, lo;
  var byteArray = [];
  for (var i4 = 0; i4 < str.length; ++i4) {
    if ((units -= 2) < 0) break;
    c5 = str.charCodeAt(i4);
    hi = c5 >> 8;
    lo = c5 % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i4 = 0; i4 < length; ++i4) {
    if (i4 + offset >= dst.length || i4 >= src.length) break;
    dst[i4 + offset] = src[i4];
  }
  return i4;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
}

// wasi/polyfills/buffer.js

// https://esm.sh/v135/path-browserify@1.0.1/denonext/path-browserify.mjs
import __Process$ from "node:process";
var z = Object.create;
var C = Object.defineProperty;
var D = Object.getOwnPropertyDescriptor;
var T = Object.getOwnPropertyNames;
var R = Object.getPrototypeOf;
var x = Object.prototype.hasOwnProperty;
var E = (l4, e) => () => (e || l4((e = { exports: {} }).exports, e), e.exports);
var J = (l4, e) => {
  for (var r2 in e) C(l4, r2, { get: e[r2], enumerable: true });
};
var b = (l4, e, r2, t3) => {
  if (e && typeof e == "object" || typeof e == "function") for (let i4 of T(e)) !x.call(l4, i4) && i4 !== r2 && C(l4, i4, { get: () => e[i4], enumerable: !(t3 = D(e, i4)) || t3.enumerable });
  return l4;
};
var g = (l4, e, r2) => (b(l4, e, "default"), r2 && b(r2, e, "default"));
var w = (l4, e, r2) => (r2 = l4 != null ? z(R(l4)) : {}, b(e || !l4 || !l4.__esModule ? C(r2, "default", { value: l4, enumerable: true }) : r2, l4));
var h = E((p6, _7) => {
  "use strict";
  function c5(l4) {
    if (typeof l4 != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(l4));
  }
  function y5(l4, e) {
    for (var r2 = "", t3 = 0, i4 = -1, s3 = 0, n3, f5 = 0; f5 <= l4.length; ++f5) {
      if (f5 < l4.length) n3 = l4.charCodeAt(f5);
      else {
        if (n3 === 47) break;
        n3 = 47;
      }
      if (n3 === 47) {
        if (!(i4 === f5 - 1 || s3 === 1)) if (i4 !== f5 - 1 && s3 === 2) {
          if (r2.length < 2 || t3 !== 2 || r2.charCodeAt(r2.length - 1) !== 46 || r2.charCodeAt(r2.length - 2) !== 46) {
            if (r2.length > 2) {
              var a3 = r2.lastIndexOf("/");
              if (a3 !== r2.length - 1) {
                a3 === -1 ? (r2 = "", t3 = 0) : (r2 = r2.slice(0, a3), t3 = r2.length - 1 - r2.lastIndexOf("/")), i4 = f5, s3 = 0;
                continue;
              }
            } else if (r2.length === 2 || r2.length === 1) {
              r2 = "", t3 = 0, i4 = f5, s3 = 0;
              continue;
            }
          }
          e && (r2.length > 0 ? r2 += "/.." : r2 = "..", t3 = 2);
        } else r2.length > 0 ? r2 += "/" + l4.slice(i4 + 1, f5) : r2 = l4.slice(i4 + 1, f5), t3 = f5 - i4 - 1;
        i4 = f5, s3 = 0;
      } else n3 === 46 && s3 !== -1 ? ++s3 : s3 = -1;
    }
    return r2;
  }
  function q6(l4, e) {
    var r2 = e.dir || e.root, t3 = e.base || (e.name || "") + (e.ext || "");
    return r2 ? r2 === e.root ? r2 + t3 : r2 + l4 + t3 : t3;
  }
  var m6 = { resolve: function() {
    for (var e = "", r2 = false, t3, i4 = arguments.length - 1; i4 >= -1 && !r2; i4--) {
      var s3;
      i4 >= 0 ? s3 = arguments[i4] : (t3 === void 0 && (t3 = __Process$.cwd()), s3 = t3), c5(s3), s3.length !== 0 && (e = s3 + "/" + e, r2 = s3.charCodeAt(0) === 47);
    }
    return e = y5(e, !r2), r2 ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
  }, normalize: function(e) {
    if (c5(e), e.length === 0) return ".";
    var r2 = e.charCodeAt(0) === 47, t3 = e.charCodeAt(e.length - 1) === 47;
    return e = y5(e, !r2), e.length === 0 && !r2 && (e = "."), e.length > 0 && t3 && (e += "/"), r2 ? "/" + e : e;
  }, isAbsolute: function(e) {
    return c5(e), e.length > 0 && e.charCodeAt(0) === 47;
  }, join: function() {
    if (arguments.length === 0) return ".";
    for (var e, r2 = 0; r2 < arguments.length; ++r2) {
      var t3 = arguments[r2];
      c5(t3), t3.length > 0 && (e === void 0 ? e = t3 : e += "/" + t3);
    }
    return e === void 0 ? "." : m6.normalize(e);
  }, relative: function(e, r2) {
    if (c5(e), c5(r2), e === r2 || (e = m6.resolve(e), r2 = m6.resolve(r2), e === r2)) return "";
    for (var t3 = 1; t3 < e.length && e.charCodeAt(t3) === 47; ++t3) ;
    for (var i4 = e.length, s3 = i4 - t3, n3 = 1; n3 < r2.length && r2.charCodeAt(n3) === 47; ++n3) ;
    for (var f5 = r2.length, a3 = f5 - n3, v5 = s3 < a3 ? s3 : a3, u6 = -1, o4 = 0; o4 <= v5; ++o4) {
      if (o4 === v5) {
        if (a3 > v5) {
          if (r2.charCodeAt(n3 + o4) === 47) return r2.slice(n3 + o4 + 1);
          if (o4 === 0) return r2.slice(n3 + o4);
        } else s3 > v5 && (e.charCodeAt(t3 + o4) === 47 ? u6 = o4 : o4 === 0 && (u6 = 0));
        break;
      }
      var k4 = e.charCodeAt(t3 + o4), P4 = r2.charCodeAt(n3 + o4);
      if (k4 !== P4) break;
      k4 === 47 && (u6 = o4);
    }
    var A4 = "";
    for (o4 = t3 + u6 + 1; o4 <= i4; ++o4) (o4 === i4 || e.charCodeAt(o4) === 47) && (A4.length === 0 ? A4 += ".." : A4 += "/..");
    return A4.length > 0 ? A4 + r2.slice(n3 + u6) : (n3 += u6, r2.charCodeAt(n3) === 47 && ++n3, r2.slice(n3));
  }, _makeLong: function(e) {
    return e;
  }, dirname: function(e) {
    if (c5(e), e.length === 0) return ".";
    for (var r2 = e.charCodeAt(0), t3 = r2 === 47, i4 = -1, s3 = true, n3 = e.length - 1; n3 >= 1; --n3) if (r2 = e.charCodeAt(n3), r2 === 47) {
      if (!s3) {
        i4 = n3;
        break;
      }
    } else s3 = false;
    return i4 === -1 ? t3 ? "/" : "." : t3 && i4 === 1 ? "//" : e.slice(0, i4);
  }, basename: function(e, r2) {
    if (r2 !== void 0 && typeof r2 != "string") throw new TypeError('"ext" argument must be a string');
    c5(e);
    var t3 = 0, i4 = -1, s3 = true, n3;
    if (r2 !== void 0 && r2.length > 0 && r2.length <= e.length) {
      if (r2.length === e.length && r2 === e) return "";
      var f5 = r2.length - 1, a3 = -1;
      for (n3 = e.length - 1; n3 >= 0; --n3) {
        var v5 = e.charCodeAt(n3);
        if (v5 === 47) {
          if (!s3) {
            t3 = n3 + 1;
            break;
          }
        } else a3 === -1 && (s3 = false, a3 = n3 + 1), f5 >= 0 && (v5 === r2.charCodeAt(f5) ? --f5 === -1 && (i4 = n3) : (f5 = -1, i4 = a3));
      }
      return t3 === i4 ? i4 = a3 : i4 === -1 && (i4 = e.length), e.slice(t3, i4);
    } else {
      for (n3 = e.length - 1; n3 >= 0; --n3) if (e.charCodeAt(n3) === 47) {
        if (!s3) {
          t3 = n3 + 1;
          break;
        }
      } else i4 === -1 && (s3 = false, i4 = n3 + 1);
      return i4 === -1 ? "" : e.slice(t3, i4);
    }
  }, extname: function(e) {
    c5(e);
    for (var r2 = -1, t3 = 0, i4 = -1, s3 = true, n3 = 0, f5 = e.length - 1; f5 >= 0; --f5) {
      var a3 = e.charCodeAt(f5);
      if (a3 === 47) {
        if (!s3) {
          t3 = f5 + 1;
          break;
        }
        continue;
      }
      i4 === -1 && (s3 = false, i4 = f5 + 1), a3 === 46 ? r2 === -1 ? r2 = f5 : n3 !== 1 && (n3 = 1) : r2 !== -1 && (n3 = -1);
    }
    return r2 === -1 || i4 === -1 || n3 === 0 || n3 === 1 && r2 === i4 - 1 && r2 === t3 + 1 ? "" : e.slice(r2, i4);
  }, format: function(e) {
    if (e === null || typeof e != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
    return q6("/", e);
  }, parse: function(e) {
    c5(e);
    var r2 = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0) return r2;
    var t3 = e.charCodeAt(0), i4 = t3 === 47, s3;
    i4 ? (r2.root = "/", s3 = 1) : s3 = 0;
    for (var n3 = -1, f5 = 0, a3 = -1, v5 = true, u6 = e.length - 1, o4 = 0; u6 >= s3; --u6) {
      if (t3 = e.charCodeAt(u6), t3 === 47) {
        if (!v5) {
          f5 = u6 + 1;
          break;
        }
        continue;
      }
      a3 === -1 && (v5 = false, a3 = u6 + 1), t3 === 46 ? n3 === -1 ? n3 = u6 : o4 !== 1 && (o4 = 1) : n3 !== -1 && (o4 = -1);
    }
    return n3 === -1 || a3 === -1 || o4 === 0 || o4 === 1 && n3 === a3 - 1 && n3 === f5 + 1 ? a3 !== -1 && (f5 === 0 && i4 ? r2.base = r2.name = e.slice(1, a3) : r2.base = r2.name = e.slice(f5, a3)) : (f5 === 0 && i4 ? (r2.name = e.slice(1, n3), r2.base = e.slice(1, a3)) : (r2.name = e.slice(f5, n3), r2.base = e.slice(f5, a3)), r2.ext = e.slice(n3, a3)), f5 > 0 ? r2.dir = e.slice(0, f5 - 1) : i4 && (r2.dir = "/"), r2;
  }, sep: "/", delimiter: ":", win32: null, posix: null };
  m6.posix = m6;
  _7.exports = m6;
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
var require2 = (n3) => {
  const e = (m6) => typeof m6.default < "u" ? m6.default : m6, c5 = (m6) => Object.assign({}, m6);
  switch (n3) {
    case "buffer":
      return e(__0$);
    default:
      throw new Error('module "' + n3 + '" not found');
  }
};
var S2 = Object.create;
var s = Object.defineProperty;
var _ = Object.getOwnPropertyDescriptor;
var g2 = Object.getOwnPropertyNames;
var h2 = Object.getPrototypeOf;
var x2 = Object.prototype.hasOwnProperty;
var A = ((e) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(e, { get: (r2, t3) => (typeof require2 < "u" ? require2 : r2)[t3] }) : e)(function(e) {
  if (typeof require2 < "u") return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var E2 = (e, r2) => () => (r2 || e((r2 = { exports: {} }).exports, r2), r2.exports);
var T2 = (e, r2) => {
  for (var t3 in r2) s(e, t3, { get: r2[t3], enumerable: true });
};
var m = (e, r2, t3, n3) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let l4 of g2(r2)) !x2.call(e, l4) && l4 !== t3 && s(e, l4, { get: () => r2[l4], enumerable: !(n3 = _(r2, l4)) || n3.enumerable });
  return e;
};
var u = (e, r2, t3) => (m(e, r2, "default"), t3 && m(t3, r2, "default"));
var c = (e, r2, t3) => (t3 = e != null ? S2(h2(e)) : {}, m(r2 || !e || !e.__esModule ? s(t3, "default", { value: e, enumerable: true }) : t3, e));
var b2 = E2((p6, y5) => {
  var i4 = A("buffer"), o4 = i4.Buffer;
  function w9(e, r2) {
    for (var t3 in e) r2[t3] = e[t3];
  }
  o4.from && o4.alloc && o4.allocUnsafe && o4.allocUnsafeSlow ? y5.exports = i4 : (w9(i4, p6), p6.Buffer = a3);
  function a3(e, r2, t3) {
    return o4(e, r2, t3);
  }
  a3.prototype = Object.create(o4.prototype);
  w9(o4, a3);
  a3.from = function(e, r2, t3) {
    if (typeof e == "number") throw new TypeError("Argument must not be a number");
    return o4(e, r2, t3);
  };
  a3.alloc = function(e, r2, t3) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    var n3 = o4(e);
    return r2 !== void 0 ? typeof t3 == "string" ? n3.fill(r2, t3) : n3.fill(r2) : n3.fill(0), n3;
  };
  a3.allocUnsafe = function(e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return o4(e);
  };
  a3.allocUnsafeSlow = function(e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return i4.SlowBuffer(e);
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
var require3 = (n3) => {
  const e = (m6) => typeof m6.default < "u" ? m6.default : m6, c5 = (m6) => Object.assign({}, m6);
  switch (n3) {
    case "safe-buffer":
      return e(safe_buffer_exports);
    default:
      throw new Error('module "' + n3 + '" not found');
  }
};
var y = Object.create;
var l = Object.defineProperty;
var _2 = Object.getOwnPropertyDescriptor;
var x3 = Object.getOwnPropertyNames;
var b3 = Object.getPrototypeOf;
var v2 = Object.prototype.hasOwnProperty;
var w2 = ((r2) => typeof require3 < "u" ? require3 : typeof Proxy < "u" ? new Proxy(r2, { get: (o4, e) => (typeof require3 < "u" ? require3 : o4)[e] }) : r2)(function(r2) {
  if (typeof require3 < "u") return require3.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var B3 = (r2, o4) => () => (o4 || r2((o4 = { exports: {} }).exports, o4), o4.exports);
var g3 = (r2, o4) => {
  for (var e in o4) l(r2, e, { get: o4[e], enumerable: true });
};
var u2 = (r2, o4, e, t3) => {
  if (o4 && typeof o4 == "object" || typeof o4 == "function") for (let f5 of x3(o4)) !v2.call(r2, f5) && f5 !== e && l(r2, f5, { get: () => o4[f5], enumerable: !(t3 = _2(o4, f5)) || t3.enumerable });
  return r2;
};
var a = (r2, o4, e) => (u2(r2, o4, "default"), e && u2(e, o4, "default"));
var c2 = (r2, o4, e) => (e = r2 != null ? y(b3(r2)) : {}, u2(o4 || !r2 || !r2.__esModule ? l(e, "default", { value: r2, enumerable: true }) : e, r2));
var p = B3((C3, m6) => {
  "use strict";
  var i4 = 65536, h6 = 4294967295;
  function E5() {
    throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
  }
  var R5 = w2("safe-buffer").Buffer, s3 = __global$.crypto || __global$.msCrypto;
  s3 && s3.getRandomValues ? m6.exports = T4 : m6.exports = E5;
  function T4(r2, o4) {
    if (r2 > h6) throw new RangeError("requested too many random bytes");
    var e = R5.allocUnsafe(r2);
    if (r2 > 0) if (r2 > i4) for (var t3 = 0; t3 < r2; t3 += i4) s3.getRandomValues(e.slice(t3, t3 + i4));
    else s3.getRandomValues(e);
    return typeof o4 == "function" ? __Process$2.nextTick(function() {
      o4(null, e);
    }) : e;
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
var require4 = (n3) => {
  const e = (m6) => typeof m6.default < "u" ? m6.default : m6, c5 = (m6) => Object.assign({}, m6);
  switch (n3) {
    case "safe-buffer":
      return e(safe_buffer_exports);
    case "randombytes":
      return e(randombytes_exports);
    default:
      throw new Error('module "' + n3 + '" not found');
  }
};
var k2 = Object.create;
var m2 = Object.defineProperty;
var M3 = Object.getOwnPropertyDescriptor;
var R3 = Object.getOwnPropertyNames;
var b4 = Object.getPrototypeOf;
var q3 = Object.prototype.hasOwnProperty;
var w3 = ((r2) => typeof require4 < "u" ? require4 : typeof Proxy < "u" ? new Proxy(r2, { get: (n3, e) => (typeof require4 < "u" ? require4 : n3)[e] }) : r2)(function(r2) {
  if (typeof require4 < "u") return require4.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var L3 = (r2, n3) => () => (n3 || r2((n3 = { exports: {} }).exports, n3), n3.exports);
var V3 = (r2, n3) => {
  for (var e in n3) m2(r2, e, { get: n3[e], enumerable: true });
};
var i = (r2, n3, e, t3) => {
  if (n3 && typeof n3 == "object" || typeof n3 == "function") for (let a3 of R3(n3)) !q3.call(r2, a3) && a3 !== e && m2(r2, a3, { get: () => n3[a3], enumerable: !(t3 = M3(n3, a3)) || t3.enumerable });
  return r2;
};
var l2 = (r2, n3, e) => (i(r2, n3, "default"), e && i(e, n3, "default"));
var d4 = (r2, n3, e) => (e = r2 != null ? k2(b4(r2)) : {}, i(n3 || !r2 || !r2.__esModule ? m2(e, "default", { value: r2, enumerable: true }) : e, r2));
var p2 = L3((u6) => {
  "use strict";
  function f5() {
    throw new Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`);
  }
  var h6 = w3("safe-buffer"), g7 = w3("randombytes"), s3 = h6.Buffer, E5 = h6.kMaxLength, y5 = __global$2.crypto || __global$2.msCrypto, F4 = Math.pow(2, 32) - 1;
  function v5(r2, n3) {
    if (typeof r2 != "number" || r2 !== r2) throw new TypeError("offset must be a number");
    if (r2 > F4 || r2 < 0) throw new TypeError("offset must be a uint32");
    if (r2 > E5 || r2 > n3) throw new RangeError("offset out of range");
  }
  function x9(r2, n3, e) {
    if (typeof r2 != "number" || r2 !== r2) throw new TypeError("size must be a number");
    if (r2 > F4 || r2 < 0) throw new TypeError("size must be a uint32");
    if (r2 + n3 > e || r2 > E5) throw new RangeError("buffer too small");
  }
  y5 && y5.getRandomValues || !__Process$3.browser ? (u6.randomFill = C3, u6.randomFillSync = I3) : (u6.randomFill = f5, u6.randomFillSync = f5);
  function C3(r2, n3, e, t3) {
    if (!s3.isBuffer(r2) && !(r2 instanceof __global$2.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    if (typeof n3 == "function") t3 = n3, n3 = 0, e = r2.length;
    else if (typeof e == "function") t3 = e, e = r2.length - n3;
    else if (typeof t3 != "function") throw new TypeError('"cb" argument must be a function');
    return v5(n3, r2.length), x9(e, n3, r2.length), B5(r2, n3, e, t3);
  }
  function B5(r2, n3, e, t3) {
    if (__Process$3.browser) {
      var a3 = r2.buffer, _7 = new Uint8Array(a3, n3, e);
      if (y5.getRandomValues(_7), t3) {
        __Process$3.nextTick(function() {
          t3(null, r2);
        });
        return;
      }
      return r2;
    }
    if (t3) {
      g7(e, function(c5, S4) {
        if (c5) return t3(c5);
        S4.copy(r2, n3), t3(null, r2);
      });
      return;
    }
    var A4 = g7(e);
    return A4.copy(r2, n3), r2;
  }
  function I3(r2, n3, e) {
    if (typeof n3 > "u" && (n3 = 0), !s3.isBuffer(r2) && !(r2 instanceof __global$2.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    return v5(n3, r2.length), e === void 0 && (e = r2.length - n3), x9(e, n3, r2.length), B5(r2, n3, e);
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
var wrap = (f5) => (...args) => {
  try {
    return f5(...args);
  } catch (e) {
    if (e && e.code && typeof e.code === "string") {
      return constants_default.ERROR_MAP[e.code] || constants_default.WASI_EINVAL;
    }
    if (e instanceof WASIError) {
      return e.errno;
    }
    throw e;
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
    let env = {};
    if (wasiConfig && wasiConfig.env) {
      env = wasiConfig.env;
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
    let fs = this.bindings.fs;
    let path = this.bindings.path;
    for (const [k4, v5] of Object.entries(preopens)) {
      const real = fs.openSync(v5, fs.constants.O_RDONLY);
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
        path: v5
      });
    }
    const getiovs = (iovs, iovsLen) => {
      this.refreshMemory();
      const buffers = Array.from({ length: iovsLen }, (_7, i4) => {
        const ptr = iovs + i4 * 8;
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
      args_get: (argv, argvBuf) => {
        this.refreshMemory();
        let coffset = argv;
        let offset = argvBuf;
        args.forEach((a3) => {
          this.view.setUint32(coffset, offset, true);
          coffset += 4;
          offset += Buffer2.from(this.memory.buffer).write(`${a3}\0`, offset);
        });
        return constants_default.WASI_ESUCCESS;
      },
      args_sizes_get: (argc, argvBufSize) => {
        this.refreshMemory();
        this.view.setUint32(argc, args.length, true);
        const size = args.reduce((acc, a3) => acc + Buffer2.byteLength(a3) + 1, 0);
        this.view.setUint32(argvBufSize, size, true);
        return constants_default.WASI_ESUCCESS;
      },
      environ_get: (environ, environBuf) => {
        this.refreshMemory();
        let coffset = environ;
        let offset = environBuf;
        Object.entries(env).forEach(([key, value]) => {
          this.view.setUint32(coffset, offset, true);
          coffset += 4;
          offset += Buffer2.from(this.memory.buffer).write(`${key}=${value}\0`, offset);
        });
        return constants_default.WASI_ESUCCESS;
      },
      environ_sizes_get: (environCount, environBufSize) => {
        this.refreshMemory();
        const envProcessed = Object.entries(env).map(([key, value]) => `${key}=${value}\0`);
        const size = envProcessed.reduce((acc, e) => acc + Buffer2.byteLength(e), 0);
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
        const n3 = now(clockId);
        if (n3 === null) {
          return constants_default.WASI_EINVAL;
        }
        this.view.setBigUint64(time, BigIntPolyfill(n3), true);
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
        fs.closeSync(stats.real);
        this.FD_MAP.delete(fd);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_datasync: wrap((fd) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_DATASYNC);
        fs.fdatasyncSync(stats.real);
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
        const rstats = fs.fstatSync(stats.real);
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
        fs.ftruncateSync(stats.real, Number(stSize));
        return constants_default.WASI_ESUCCESS;
      }),
      fd_filestat_set_times: wrap((fd, stAtim, stMtim, fstflags) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_FILESTAT_SET_TIMES);
        const rstats = fs.fstatSync(stats.real);
        let atim = rstats.atime;
        let mtim = rstats.mtime;
        const n3 = nsToMs(now(constants_default.WASI_CLOCK_REALTIME));
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
          atim = n3;
        }
        if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM) === constants_default.WASI_FILESTAT_SET_MTIM) {
          mtim = nsToMs(stMtim);
        } else if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM_NOW) === constants_default.WASI_FILESTAT_SET_MTIM_NOW) {
          mtim = n3;
        }
        fs.futimesSync(stats.real, new Date(atim), new Date(mtim));
        return constants_default.WASI_ESUCCESS;
      }),
      fd_prestat_get: wrap((fd, bufPtr) => {
        const stats = CHECK_FD(fd, BigIntPolyfill(0));
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        this.view.setUint8(bufPtr, constants_default.WASI_PREOPENTYPE_DIR);
        this.view.setUint32(bufPtr + 4, Buffer2.byteLength(stats.fakePath), true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_prestat_dir_name: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, BigIntPolyfill(0));
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        Buffer2.from(this.memory.buffer).write(stats.fakePath, pathPtr, pathLen, "utf8");
        return constants_default.WASI_ESUCCESS;
      }),
      fd_pwrite: wrap((fd, iovs, iovsLen, offset, nwritten) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_WRITE | constants_default.WASI_RIGHT_FD_SEEK);
        let written = 0;
        getiovs(iovs, iovsLen).forEach((iov) => {
          let w9 = 0;
          while (w9 < iov.byteLength) {
            w9 += fs.writeSync(stats.real, iov, w9, iov.byteLength - w9, Number(offset) + written + w9);
          }
          written += w9;
        });
        this.view.setUint32(nwritten, written, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_write: wrap((fd, iovs, iovsLen, nwritten) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_WRITE);
        let written = 0;
        getiovs(iovs, iovsLen).forEach((iov) => {
          let w9 = 0;
          while (w9 < iov.byteLength) {
            const i4 = fs.writeSync(stats.real, iov, w9, iov.byteLength - w9, stats.offset ? Number(stats.offset) : null);
            if (stats.offset)
              stats.offset += BigIntPolyfill(i4);
            w9 += i4;
          }
          written += w9;
        });
        this.view.setUint32(nwritten, written, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_pread: wrap((fd, iovs, iovsLen, offset, nread) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_READ | constants_default.WASI_RIGHT_FD_SEEK);
        let read2 = 0;
        outer: for (const iov of getiovs(iovs, iovsLen)) {
          let r2 = 0;
          while (r2 < iov.byteLength) {
            const length = iov.byteLength - r2;
            const rr2 = fs.readSync(stats.real, iov, r2, iov.byteLength - r2, Number(offset) + read2 + r2);
            r2 += rr2;
            read2 += rr2;
            if (rr2 === 0 || rr2 < length) {
              break outer;
            }
          }
          read2 += r2;
        }
        ;
        this.view.setUint32(nread, read2, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_read: wrap((fd, iovs, iovsLen, nread) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_READ);
        const IS_STDIN = stats.real === 0;
        let read2 = 0;
        outer: for (const iov of getiovs(iovs, iovsLen)) {
          let r2 = 0;
          while (r2 < iov.byteLength) {
            let length = iov.byteLength - r2;
            let position = IS_STDIN || stats.offset === void 0 ? null : Number(stats.offset);
            let rr2 = fs.readSync(
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
              stats.offset = (stats.offset ? stats.offset : BigIntPolyfill(0)) + BigIntPolyfill(rr2);
            }
            r2 += rr2;
            read2 += rr2;
            if (rr2 === 0 || rr2 < length) {
              break outer;
            }
          }
        }
        this.view.setUint32(nread, read2, true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_readdir: wrap((fd, bufPtr, bufLen, cookie, bufusedPtr) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_FD_READDIR);
        this.refreshMemory();
        const entries = fs.readdirSync(stats.path, { withFileTypes: true });
        const startPtr = bufPtr;
        for (let i4 = Number(cookie); i4 < entries.length; i4 += 1) {
          const entry = entries[i4];
          let nameLength = Buffer2.byteLength(entry.name);
          if (bufPtr - startPtr > bufLen) {
            break;
          }
          this.view.setBigUint64(bufPtr, BigIntPolyfill(i4 + 1), true);
          bufPtr += 8;
          if (bufPtr - startPtr > bufLen) {
            break;
          }
          const rstats = fs.statSync(path.resolve(stats.path, entry.name));
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
          let memory_buffer = Buffer2.from(this.memory.buffer);
          memory_buffer.write(entry.name, bufPtr);
          bufPtr += nameLength;
        }
        const bufused = bufPtr - startPtr;
        this.view.setUint32(bufusedPtr, Math.min(bufused, bufLen), true);
        return constants_default.WASI_ESUCCESS;
      }),
      fd_renumber: wrap((from2, to) => {
        CHECK_FD(from2, BigIntPolyfill(0));
        CHECK_FD(to, BigIntPolyfill(0));
        fs.closeSync(this.FD_MAP.get(from2).real);
        this.FD_MAP.set(from2, this.FD_MAP.get(to));
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
            const { size } = fs.fstatSync(stats.real);
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
        fs.fsyncSync(stats.real);
        return constants_default.WASI_ESUCCESS;
      }),
      path_create_directory: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_CREATE_DIRECTORY);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p6 = Buffer2.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs.mkdirSync(path.resolve(stats.path, p6));
        return constants_default.WASI_ESUCCESS;
      }),
      path_filestat_get: wrap((fd, flags, pathPtr, pathLen, bufPtr) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_FILESTAT_GET);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p6 = Buffer2.from(this.memory.buffer, pathPtr, pathLen).toString();
        const rstats = fs.statSync(path.resolve(stats.path, p6));
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
        const rstats = fs.fstatSync(stats.real);
        let atim = rstats.atime;
        let mtim = rstats.mtime;
        const n3 = nsToMs(now(constants_default.WASI_CLOCK_REALTIME));
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
          atim = n3;
        }
        if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM) === constants_default.WASI_FILESTAT_SET_MTIM) {
          mtim = nsToMs(stMtim);
        } else if ((fstflags & constants_default.WASI_FILESTAT_SET_MTIM_NOW) === constants_default.WASI_FILESTAT_SET_MTIM_NOW) {
          mtim = n3;
        }
        const p6 = Buffer2.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs.utimesSync(path.resolve(stats.path, p6), new Date(atim), new Date(mtim));
        return constants_default.WASI_ESUCCESS;
      }),
      path_link: wrap((oldFd, oldFlags, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
        const ostats = CHECK_FD(oldFd, constants_default.WASI_RIGHT_PATH_LINK_SOURCE);
        const nstats = CHECK_FD(newFd, constants_default.WASI_RIGHT_PATH_LINK_TARGET);
        if (!ostats.path || !nstats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const op = Buffer2.from(this.memory.buffer, oldPath, oldPathLen).toString();
        const np = Buffer2.from(this.memory.buffer, newPath, newPathLen).toString();
        fs.linkSync(path.resolve(ostats.path, op), path.resolve(nstats.path, np));
        return constants_default.WASI_ESUCCESS;
      }),
      path_open: wrap((dirfd, dirflags, pathPtr, pathLen, oflags, fsRightsBase, fsRightsInheriting, fsFlags, fd) => {
        const stats = CHECK_FD(dirfd, constants_default.WASI_RIGHT_PATH_OPEN);
        fsRightsBase = BigIntPolyfill(fsRightsBase);
        fsRightsInheriting = BigIntPolyfill(fsRightsInheriting);
        const read2 = (fsRightsBase & (constants_default.WASI_RIGHT_FD_READ | constants_default.WASI_RIGHT_FD_READDIR)) !== BigIntPolyfill(0);
        const write3 = (fsRightsBase & (constants_default.WASI_RIGHT_FD_DATASYNC | constants_default.WASI_RIGHT_FD_WRITE | constants_default.WASI_RIGHT_FD_ALLOCATE | constants_default.WASI_RIGHT_FD_FILESTAT_SET_SIZE)) !== BigIntPolyfill(0);
        let noflags;
        if (write3 && read2) {
          noflags = fs.constants.O_RDWR;
        } else if (read2) {
          noflags = fs.constants.O_RDONLY;
        } else if (write3) {
          noflags = fs.constants.O_WRONLY;
        }
        let neededBase = fsRightsBase | constants_default.WASI_RIGHT_PATH_OPEN;
        let neededInheriting = fsRightsBase | fsRightsInheriting;
        if ((oflags & constants_default.WASI_O_CREAT) !== 0) {
          noflags |= fs.constants.O_CREAT;
          neededBase |= constants_default.WASI_RIGHT_PATH_CREATE_FILE;
        }
        if ((oflags & constants_default.WASI_O_DIRECTORY) !== 0) {
          noflags |= fs.constants.O_DIRECTORY;
        }
        if ((oflags & constants_default.WASI_O_EXCL) !== 0) {
          noflags |= fs.constants.O_EXCL;
        }
        if ((oflags & constants_default.WASI_O_TRUNC) !== 0) {
          noflags |= fs.constants.O_TRUNC;
          neededBase |= constants_default.WASI_RIGHT_PATH_FILESTAT_SET_SIZE;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_APPEND) !== 0) {
          noflags |= fs.constants.O_APPEND;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_DSYNC) !== 0) {
          if (fs.constants.O_DSYNC) {
            noflags |= fs.constants.O_DSYNC;
          } else {
            noflags |= fs.constants.O_SYNC;
          }
          neededInheriting |= constants_default.WASI_RIGHT_FD_DATASYNC;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_NONBLOCK) !== 0) {
          noflags |= fs.constants.O_NONBLOCK;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_RSYNC) !== 0) {
          if (fs.constants.O_RSYNC) {
            noflags |= fs.constants.O_RSYNC;
          } else {
            noflags |= fs.constants.O_SYNC;
          }
          neededInheriting |= constants_default.WASI_RIGHT_FD_SYNC;
        }
        if ((fsFlags & constants_default.WASI_FDFLAG_SYNC) !== 0) {
          noflags |= fs.constants.O_SYNC;
          neededInheriting |= constants_default.WASI_RIGHT_FD_SYNC;
        }
        if (write3 && (noflags & (fs.constants.O_APPEND | fs.constants.O_TRUNC)) === 0) {
          neededInheriting |= constants_default.WASI_RIGHT_FD_SEEK;
        }
        this.refreshMemory();
        const p6 = Buffer2.from(this.memory.buffer, pathPtr, pathLen).toString();
        const fullUnresolved = path.resolve(stats.path, p6);
        if (path.relative(stats.path, fullUnresolved).startsWith("..")) {
          return constants_default.WASI_ENOTCAPABLE;
        }
        let full;
        try {
          full = fs.realpathSync(fullUnresolved);
          if (path.relative(stats.path, full).startsWith("..")) {
            return constants_default.WASI_ENOTCAPABLE;
          }
        } catch (e) {
          if (e.code === "ENOENT") {
            full = fullUnresolved;
          } else {
            throw e;
          }
        }
        let isDirectory;
        try {
          isDirectory = fs.statSync(full).isDirectory();
        } catch (e) {
        }
        let realfd;
        if (!write3 && isDirectory) {
          realfd = fs.openSync(full, fs.constants.O_RDONLY);
        } else {
          realfd = fs.openSync(full, noflags);
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
        const p6 = Buffer2.from(this.memory.buffer, pathPtr, pathLen).toString();
        const full = path.resolve(stats.path, p6);
        const r2 = fs.readlinkSync(full);
        const used = Buffer2.from(this.memory.buffer).write(r2, buf, bufLen);
        this.view.setUint32(bufused, used, true);
        return constants_default.WASI_ESUCCESS;
      }),
      path_remove_directory: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_REMOVE_DIRECTORY);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p6 = Buffer2.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs.rmdirSync(path.resolve(stats.path, p6));
        return constants_default.WASI_ESUCCESS;
      }),
      path_rename: wrap((oldFd, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
        const ostats = CHECK_FD(oldFd, constants_default.WASI_RIGHT_PATH_RENAME_SOURCE);
        const nstats = CHECK_FD(newFd, constants_default.WASI_RIGHT_PATH_RENAME_TARGET);
        if (!ostats.path || !nstats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const op = Buffer2.from(this.memory.buffer, oldPath, oldPathLen).toString();
        const np = Buffer2.from(this.memory.buffer, newPath, newPathLen).toString();
        fs.renameSync(path.resolve(ostats.path, op), path.resolve(nstats.path, np));
        return constants_default.WASI_ESUCCESS;
      }),
      path_symlink: wrap((oldPath, oldPathLen, fd, newPath, newPathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_SYMLINK);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const op = Buffer2.from(this.memory.buffer, oldPath, oldPathLen).toString();
        const np = Buffer2.from(this.memory.buffer, newPath, newPathLen).toString();
        fs.symlinkSync(op, path.resolve(stats.path, np));
        return constants_default.WASI_ESUCCESS;
      }),
      path_unlink_file: wrap((fd, pathPtr, pathLen) => {
        const stats = CHECK_FD(fd, constants_default.WASI_RIGHT_PATH_UNLINK_FILE);
        if (!stats.path) {
          return constants_default.WASI_EINVAL;
        }
        this.refreshMemory();
        const p6 = Buffer2.from(this.memory.buffer, pathPtr, pathLen).toString();
        fs.unlinkSync(path.resolve(stats.path, p6));
        return constants_default.WASI_ESUCCESS;
      }),
      poll_oneoff: (sin, sout, nsubscriptions, nevents) => {
        let eventc = 0;
        let waitEnd = 0;
        this.refreshMemory();
        for (let i4 = 0; i4 < nsubscriptions; i4 += 1) {
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
              const timestamp = this.view.getBigUint64(sin, true);
              sin += 8;
              const precision = this.view.getBigUint64(sin, true);
              sin += 8;
              const subclockflags = this.view.getUint16(sin, true);
              sin += 2;
              sin += 6;
              const absolute = subclockflags === 1;
              let e = constants_default.WASI_ESUCCESS;
              const n3 = BigIntPolyfill(now(clockid));
              if (n3 === null) {
                e = constants_default.WASI_EINVAL;
              } else {
                const end = absolute ? timestamp : n3 + timestamp;
                waitEnd = end > waitEnd ? end : waitEnd;
              }
              this.view.setBigUint64(sout, userdata, true);
              sout += 8;
              this.view.setUint16(sout, e, true);
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
          } catch (e) {
            console.log(`Catched error: ${e}`);
            throw e;
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
    const exports5 = instance.exports;
    if (exports5 === null || typeof exports5 !== "object") {
      throw new Error(`instance.exports must be an Object. Received ${exports5}.`);
    }
    const { memory: memory2 } = exports5;
    if (!(memory2 instanceof WebAssembly.Memory)) {
      throw new Error(`instance.exports.memory must be a WebAssembly.Memory. Recceived ${memory2}.`);
    }
    this.setMemory(memory2);
    if (exports5._start) {
      exports5._start();
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
        path: I
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

// https://esm.sh/v135/fs-monkey@0.3.3/denonext/lib/util/lists.js
var lists_exports = {};
__export(lists_exports, {
  __esModule: () => F3,
  default: () => x4
});
var f2 = Object.create;
var d5 = Object.defineProperty;
var h3 = Object.getOwnPropertyDescriptor;
var p3 = Object.getOwnPropertyNames;
var u3 = Object.getPrototypeOf;
var k3 = Object.prototype.hasOwnProperty;
var _3 = (c5, e) => () => (e || c5((e = { exports: {} }).exports, e), e.exports);
var w4 = (c5, e) => {
  for (var n3 in e) d5(c5, n3, { get: e[n3], enumerable: true });
};
var y2 = (c5, e, n3, S4) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s3 of p3(e)) !k3.call(c5, s3) && s3 !== n3 && d5(c5, s3, { get: () => e[s3], enumerable: !(S4 = h3(e, s3)) || S4.enumerable });
  return c5;
};
var r = (c5, e, n3) => (y2(c5, e, "default"), n3 && y2(n3, e, "default"));
var o2 = (c5, e, n3) => (n3 = c5 != null ? f2(u3(c5)) : {}, y2(e || !c5 || !c5.__esModule ? d5(n3, "default", { value: c5, enumerable: true }) : n3, c5));
var i2 = _3((a3) => {
  "use strict";
  Object.defineProperty(a3, "__esModule", { value: true });
  var v5 = a3.fsProps = ["constants", "F_OK", "R_OK", "W_OK", "X_OK", "Stats"], K3 = a3.fsSyncMethods = ["renameSync", "ftruncateSync", "truncateSync", "chownSync", "fchownSync", "lchownSync", "chmodSync", "fchmodSync", "lchmodSync", "statSync", "lstatSync", "fstatSync", "linkSync", "symlinkSync", "readlinkSync", "realpathSync", "unlinkSync", "rmdirSync", "mkdirSync", "mkdirpSync", "readdirSync", "closeSync", "openSync", "utimesSync", "futimesSync", "fsyncSync", "writeSync", "readSync", "readFileSync", "writeFileSync", "appendFileSync", "existsSync", "accessSync", "fdatasyncSync", "mkdtempSync", "copyFileSync", "createReadStream", "createWriteStream"], P4 = a3.fsAsyncMethods = ["rename", "ftruncate", "truncate", "chown", "fchown", "lchown", "chmod", "fchmod", "lchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "mkdirp", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile", "exists", "access", "fdatasync", "mkdtemp", "copyFile", "watchFile", "unwatchFile", "watch"];
});
var t = {};
w4(t, { __esModule: () => F3, default: () => x4 });
var m3 = o2(i2());
r(t, o2(i2()));
var { __esModule: F3 } = m3;
var { default: l3, ...M4 } = m3;
var x4 = l3 !== void 0 ? l3 : M4;

// https://esm.sh/v135/fast-extend@1.0.2/denonext/fast-extend.mjs
var fast_extend_exports = {};
__export(fast_extend_exports, {
  default: () => w5,
  extend: () => j4
});
var m4 = Object.create;
var d6 = Object.defineProperty;
var x5 = Object.getOwnPropertyDescriptor;
var _4 = Object.getOwnPropertyNames;
var g4 = Object.getPrototypeOf;
var v3 = Object.prototype.hasOwnProperty;
var y3 = (t3, e) => () => (e || t3((e = { exports: {} }).exports, e), e.exports);
var h4 = (t3, e) => {
  for (var r2 in e) d6(t3, r2, { get: e[r2], enumerable: true });
};
var u4 = (t3, e, r2, l4) => {
  if (e && typeof e == "object" || typeof e == "function") for (let a3 of _4(e)) !v3.call(t3, a3) && a3 !== r2 && d6(t3, a3, { get: () => e[a3], enumerable: !(l4 = x5(e, a3)) || l4.enumerable });
  return t3;
};
var o3 = (t3, e, r2) => (u4(t3, e, "default"), r2 && u4(r2, e, "default"));
var f3 = (t3, e, r2) => (r2 = t3 != null ? m4(g4(t3)) : {}, u4(e || !t3 || !t3.__esModule ? d6(r2, "default", { value: t3, enumerable: true }) : r2, t3));
var c3 = y3((p6) => {
  var A4 = Array.prototype.slice;
  p6.extend = function t3(e, r2) {
    for (var l4 in r2) e[l4] = r2[l4];
    return arguments.length < 3 ? e : t3.apply(null, [e].concat(A4.call(arguments, 2)));
  };
});
var n2 = {};
h4(n2, { default: () => w5, extend: () => j4 });
var i3 = f3(c3());
o3(n2, f3(c3()));
var { extend: j4 } = i3;
var { default: s2, ...q4 } = i3;
var w5 = s2 !== void 0 ? s2 : q4;

// https://esm.sh/v135/fs-monkey@0.3.3/denonext/lib/correctPath.js
var correctPath_exports = {};
__export(correctPath_exports, {
  __esModule: () => S3,
  correctPath: () => A2,
  default: () => O3,
  unixify: () => j5
});
import __Process$4 from "node:process";
var _5 = Object.create;
var c4 = Object.defineProperty;
var x6 = Object.getOwnPropertyDescriptor;
var h5 = Object.getOwnPropertyNames;
var v4 = Object.getPrototypeOf;
var y4 = Object.prototype.hasOwnProperty;
var P2 = (e, r2) => () => (r2 || e((r2 = { exports: {} }).exports, r2), r2.exports);
var w6 = (e, r2) => {
  for (var n3 in r2) c4(e, n3, { get: r2[n3], enumerable: true });
};
var a2 = (e, r2, n3, l4) => {
  if (r2 && typeof r2 == "object" || typeof r2 == "function") for (let i4 of h5(r2)) !y4.call(e, i4) && i4 !== n3 && c4(e, i4, { get: () => r2[i4], enumerable: !(l4 = x6(r2, i4)) || l4.enumerable });
  return e;
};
var u5 = (e, r2, n3) => (a2(e, r2, "default"), n3 && a2(n3, r2, "default"));
var p4 = (e, r2, n3) => (n3 = e != null ? _5(v4(e)) : {}, a2(r2 || !e || !e.__esModule ? c4(n3, "default", { value: e, enumerable: true }) : n3, e));
var f4 = P2((o4) => {
  "use strict";
  Object.defineProperty(o4, "__esModule", { value: true });
  o4.unixify = d8;
  o4.correctPath = M6;
  var s3 = __Process$4.platform === "win32";
  function T4(e) {
    var r2 = e.length - 1;
    if (r2 < 2) return e;
    for (; b6(e, r2); ) r2--;
    return e.substr(0, r2 + 1);
  }
  function b6(e, r2) {
    var n3 = e[r2];
    return r2 > 0 && (n3 === "/" || s3 && n3 === "\\");
  }
  function z3(e, r2) {
    if (typeof e != "string") throw new TypeError("expected a string");
    return e = e.replace(/[\\\/]+/g, "/"), r2 !== false && (e = T4(e)), e;
  }
  function d8(e) {
    var r2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return s3 ? (e = z3(e, r2), e.replace(/^([a-zA-Z]+:|\.\/)/, "")) : e;
  }
  function M6(e) {
    return d8(e.replace(/^\\\\\?\\.:\\/, "\\"));
  }
});
var t2 = {};
w6(t2, { __esModule: () => S3, correctPath: () => A2, default: () => O3, unixify: () => j5 });
var m5 = p4(f4());
u5(t2, p4(f4()));
var { __esModule: S3, unixify: j5, correctPath: A2 } = m5;
var { default: g5, ...E3 } = m5;
var O3 = g5 !== void 0 ? g5 : E3;

// https://esm.sh/v135/memfs@3.0.4/denonext/memfs.mjs
import __Process$5 from "node:process";
import * as __1$ from "node:buffer";
import * as __2$ from "node:assert";
import * as __3$ from "node:util";
import * as __4$ from "node:path";
import * as __5$ from "node:stream";
import * as __6$ from "node:events";
import * as __8$ from "node:util";
import * as __9$ from "node:url";
import * as __b$ from "node:process";
import * as __c$ from "node:events";
var __global$3 = globalThis || (typeof window !== "undefined" ? window : self);
var __setImmediate$ = (cb, ...args) => setTimeout(cb, 0, ...args);
var require5 = (n3) => {
  const e = (m6) => typeof m6.default < "u" ? m6.default : m6, c5 = (m6) => Object.assign({ __esModule: true }, m6);
  switch (n3) {
    case "fs-monkey/lib/util/lists":
      return c5(lists_exports);
    case "buffer":
      return e(__1$);
    case "assert":
      return e(__2$);
    case "util":
      return e(__3$);
    case "path":
      return e(__4$);
    case "stream":
      return e(__5$);
    case "events":
      return e(__6$);
    case "fast-extend":
      return e(fast_extend_exports);
    case "url":
      return e(__9$);
    case "fs-monkey/lib/correctPath":
      return c5(correctPath_exports);
    case "process":
      return e(__b$);
    default:
      throw new Error('module "' + n3 + '" not found');
  }
};
var pr = Object.create;
var Wt = Object.defineProperty;
var lr = Object.getOwnPropertyDescriptor;
var dr = Object.getOwnPropertyNames;
var yr = Object.getPrototypeOf;
var vr = Object.prototype.hasOwnProperty;
var R4 = ((r2) => typeof require5 < "u" ? require5 : typeof Proxy < "u" ? new Proxy(r2, { get: (t3, e) => (typeof require5 < "u" ? require5 : t3)[e] }) : r2)(function(r2) {
  if (typeof require5 < "u") return require5.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var g6 = (r2, t3) => () => (t3 || r2((t3 = { exports: {} }).exports, t3), t3.exports);
var mr = (r2, t3) => {
  for (var e in t3) Wt(r2, e, { get: t3[e], enumerable: true });
};
var Ut = (r2, t3, e, n3) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let i4 of dr(t3)) !vr.call(r2, i4) && i4 !== e && Wt(r2, i4, { get: () => t3[i4], enumerable: !(n3 = lr(t3, i4)) || n3.enumerable });
  return r2;
};
var j6 = (r2, t3, e) => (Ut(r2, t3, "default"), e && Ut(e, t3, "default"));
var ve = (r2, t3, e) => (e = r2 != null ? pr(yr(r2)) : {}, Ut(t3 || !r2 || !r2.__esModule ? Wt(e, "default", { value: r2, enumerable: true }) : e, r2));
var Q2 = g6((Kt2) => {
  "use strict";
  Object.defineProperty(Kt2, "__esModule", { value: true });
  Kt2.constants = { O_RDONLY: 0, O_WRONLY: 1, O_RDWR: 2, S_IFMT: 61440, S_IFREG: 32768, S_IFDIR: 16384, S_IFCHR: 8192, S_IFBLK: 24576, S_IFIFO: 4096, S_IFLNK: 40960, S_IFSOCK: 49152, O_CREAT: 64, O_EXCL: 128, O_NOCTTY: 256, O_TRUNC: 512, O_APPEND: 1024, O_DIRECTORY: 65536, O_NOATIME: 262144, O_NOFOLLOW: 131072, O_SYNC: 1052672, O_DIRECT: 16384, O_NONBLOCK: 2048, S_IRWXU: 448, S_IRUSR: 256, S_IWUSR: 128, S_IXUSR: 64, S_IRWXG: 56, S_IRGRP: 32, S_IWGRP: 16, S_IXGRP: 8, S_IRWXO: 7, S_IROTH: 4, S_IWOTH: 2, S_IXOTH: 1, F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1, UV_FS_SYMLINK_DIR: 1, UV_FS_SYMLINK_JUNCTION: 2, UV_FS_COPYFILE_EXCL: 1, UV_FS_COPYFILE_FICLONE: 2, UV_FS_COPYFILE_FICLONE_FORCE: 4, COPYFILE_EXCL: 1, COPYFILE_FICLONE: 2, COPYFILE_FICLONE_FORCE: 4 };
});
var me = g6((Vt) => {
  typeof BigInt == "function" ? Vt.default = BigInt : Vt.default = function() {
    throw new Error("BigInt is not supported in this environment.");
  };
});
var Et = g6((gt2) => {
  "use strict";
  Object.defineProperty(gt2, "__esModule", { value: true });
  var V5 = Q2(), _r = me(), gr = V5.constants.S_IFMT, Er = V5.constants.S_IFDIR, Rr = V5.constants.S_IFREG, Sr = V5.constants.S_IFBLK, wr = V5.constants.S_IFCHR, Or = V5.constants.S_IFLNK, Ir = V5.constants.S_IFIFO, Nr = V5.constants.S_IFSOCK, _e = function() {
    function r2() {
    }
    return r2.build = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = new r2(), i4 = t3.uid, o4 = t3.gid, s3 = t3.atime, a3 = t3.mtime, f5 = t3.ctime, u6 = e ? _r.default : function(y5) {
        return y5;
      };
      n3.uid = u6(i4), n3.gid = u6(o4), n3.rdev = u6(0), n3.blksize = u6(4096), n3.ino = u6(t3.ino), n3.size = u6(t3.getSize()), n3.blocks = u6(1), n3.atime = s3, n3.mtime = a3, n3.ctime = f5, n3.birthtime = f5, n3.atimeMs = u6(s3.getTime()), n3.mtimeMs = u6(a3.getTime());
      var d8 = u6(f5.getTime());
      return n3.ctimeMs = d8, n3.birthtimeMs = d8, n3.dev = u6(0), n3.mode = u6(t3.mode), n3.nlink = u6(t3.nlink), n3;
    }, r2.prototype._checkModeProperty = function(t3) {
      return (Number(this.mode) & gr) === t3;
    }, r2.prototype.isDirectory = function() {
      return this._checkModeProperty(Er);
    }, r2.prototype.isFile = function() {
      return this._checkModeProperty(Rr);
    }, r2.prototype.isBlockDevice = function() {
      return this._checkModeProperty(Sr);
    }, r2.prototype.isCharacterDevice = function() {
      return this._checkModeProperty(wr);
    }, r2.prototype.isSymbolicLink = function() {
      return this._checkModeProperty(Or);
    }, r2.prototype.isFIFO = function() {
      return this._checkModeProperty(Ir);
    }, r2.prototype.isSocket = function() {
      return this._checkModeProperty(Nr);
    }, r2;
  }();
  gt2.Stats = _e;
  gt2.default = _e;
});
var Rt = g6((X3) => {
  "use strict";
  var Fr = X3 && X3.__spreadArrays || function() {
    for (var r2 = 0, t3 = 0, e = arguments.length; t3 < e; t3++) r2 += arguments[t3].length;
    for (var n3 = Array(r2), i4 = 0, t3 = 0; t3 < e; t3++) for (var o4 = arguments[t3], s3 = 0, a3 = o4.length; s3 < a3; s3++, i4++) n3[i4] = o4[s3];
    return n3;
  };
  Object.defineProperty(X3, "__esModule", { value: true });
  var ut = R4("buffer");
  X3.Buffer = ut.Buffer;
  function ge2(r2) {
    for (var t3 = [], e = 1; e < arguments.length; e++) t3[e - 1] = arguments[e];
    return new (ut.Buffer.bind.apply(ut.Buffer, Fr([void 0, r2], t3)))();
  }
  var Tr = ut.Buffer.allocUnsafe || ge2;
  X3.bufferAllocUnsafe = Tr;
  var br = ut.Buffer.from || ge2;
  X3.bufferFrom = br;
});
var Ht = g6((O5) => {
  "use strict";
  var Re = O5 && O5.__extends || /* @__PURE__ */ function() {
    var r2 = function(t3, e) {
      return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, i4) {
        n3.__proto__ = i4;
      } || function(n3, i4) {
        for (var o4 in i4) i4.hasOwnProperty(o4) && (n3[o4] = i4[o4]);
      }, r2(t3, e);
    };
    return function(t3, e) {
      r2(t3, e);
      function n3() {
        this.constructor = t3;
      }
      t3.prototype = e === null ? Object.create(e) : (n3.prototype = e.prototype, new n3());
    };
  }();
  Object.defineProperty(O5, "__esModule", { value: true });
  var q6 = R4("assert"), qt = R4("util"), Ee = typeof Symbol > "u" ? "_kCode" : Symbol("code"), Se = {};
  function Yt(r2) {
    return function(t3) {
      Re(e, t3);
      function e(n3) {
        for (var i4 = [], o4 = 1; o4 < arguments.length; o4++) i4[o4 - 1] = arguments[o4];
        var s3 = t3.call(this, we(n3, i4)) || this;
        return s3.code = n3, s3[Ee] = n3, s3.name = t3.prototype.name + " [" + s3[Ee] + "]", s3;
      }
      return e;
    }(r2);
  }
  var kr = function(r2) {
    Re(t3, r2);
    function t3(e) {
      var n3 = this;
      if (typeof e != "object" || e === null) throw new O5.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
      return e.message ? n3 = r2.call(this, e.message) || this : n3 = r2.call(this, qt.inspect(e.actual).slice(0, 128) + " " + (e.operator + " " + qt.inspect(e.expected).slice(0, 128))) || this, n3.generatedMessage = !e.message, n3.name = "AssertionError [ERR_ASSERTION]", n3.code = "ERR_ASSERTION", n3.actual = e.actual, n3.expected = e.expected, n3.operator = e.operator, O5.Error.captureStackTrace(n3, e.stackStartFunction), n3;
    }
    return t3;
  }(__global$3.Error);
  O5.AssertionError = kr;
  function we(r2, t3) {
    q6.strictEqual(typeof r2, "string");
    var e = Se[r2];
    q6(e, "An invalid error message key was used: " + r2 + ".");
    var n3;
    if (typeof e == "function") n3 = e;
    else {
      if (n3 = qt.format, t3 === void 0 || t3.length === 0) return e;
      t3.unshift(e);
    }
    return String(n3.apply(null, t3));
  }
  O5.message = we;
  function c5(r2, t3) {
    Se[r2] = typeof t3 == "function" ? t3 : String(t3);
  }
  O5.E = c5;
  O5.Error = Yt(__global$3.Error);
  O5.TypeError = Yt(__global$3.TypeError);
  O5.RangeError = Yt(__global$3.RangeError);
  c5("ERR_ARG_NOT_ITERABLE", "%s must be iterable");
  c5("ERR_ASSERTION", "%s");
  c5("ERR_BUFFER_OUT_OF_BOUNDS", Pr);
  c5("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received");
  c5("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s");
  c5("ERR_CPU_USAGE", "Unable to obtain cpu usage %s");
  c5("ERR_DNS_SET_SERVERS_FAILED", function(r2, t3) {
    return 'c-ares failed to set servers: "' + r2 + '" [' + t3 + "]";
  });
  c5("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value");
  c5("ERR_ENCODING_NOT_SUPPORTED", function(r2) {
    return 'The "' + r2 + '" encoding is not supported';
  });
  c5("ERR_ENCODING_INVALID_ENCODED_DATA", function(r2) {
    return "The encoded data was not valid for encoding " + r2;
  });
  c5("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client");
  c5("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s");
  c5("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding");
  c5("ERR_INDEX_OUT_OF_RANGE", "Index out of range");
  c5("ERR_INVALID_ARG_TYPE", Br);
  c5("ERR_INVALID_ARRAY_LENGTH", function(r2, t3, e) {
    return q6.strictEqual(typeof e, "number"), 'The array "' + r2 + '" (length ' + e + ") must be of length " + t3 + ".";
  });
  c5("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s");
  c5("ERR_INVALID_CALLBACK", "Callback must be a function");
  c5("ERR_INVALID_CHAR", "Invalid character in %s");
  c5("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column");
  c5("ERR_INVALID_FD", '"fd" must be a positive integer: %s');
  c5("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s');
  c5("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
  c5("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent");
  c5("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s");
  c5("ERR_INVALID_OPT_VALUE", function(r2, t3) {
    return 'The value "' + String(t3) + '" is invalid for option "' + r2 + '"';
  });
  c5("ERR_INVALID_OPT_VALUE_ENCODING", function(r2) {
    return 'The value "' + String(r2) + '" is invalid for option "encoding"';
  });
  c5("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL');
  c5("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s");
  c5("ERR_INVALID_THIS", 'Value of "this" must be of type %s');
  c5("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple");
  c5("ERR_INVALID_URL", "Invalid URL: %s");
  c5("ERR_INVALID_URL_SCHEME", function(r2) {
    return "The URL must be " + St(r2, "scheme");
  });
  c5("ERR_IPC_CHANNEL_CLOSED", "Channel closed");
  c5("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected");
  c5("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe");
  c5("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks");
  c5("ERR_MISSING_ARGS", Cr);
  c5("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  c5("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function");
  c5("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object");
  c5("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support");
  c5("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported");
  c5("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s");
  c5("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound");
  c5("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536");
  c5("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6");
  c5("ERR_SOCKET_CANNOT_SEND", "Unable to send data");
  c5("ERR_SOCKET_CLOSED", "Socket is closed");
  c5("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running");
  c5("ERR_STDERR_CLOSE", "process.stderr cannot be closed");
  c5("ERR_STDOUT_CLOSE", "process.stdout cannot be closed");
  c5("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode");
  c5("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s");
  c5("ERR_TLS_DH_PARAM_SIZE", function(r2) {
    return "DH parameter size " + r2 + " is less than 2048";
  });
  c5("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout");
  c5("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate");
  c5("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext');
  c5("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected");
  c5("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming");
  c5("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0");
  c5("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s");
  c5("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s");
  c5("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type");
  c5("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type");
  c5("ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl");
  function Br(r2, t3, e) {
    q6(r2, "name is required");
    var n3;
    t3.includes("not ") ? (n3 = "must not be", t3 = t3.split("not ")[1]) : n3 = "must be";
    var i4;
    if (Array.isArray(r2)) {
      var o4 = r2.map(function(a3) {
        return '"' + a3 + '"';
      }).join(", ");
      i4 = "The " + o4 + " arguments " + n3 + " " + St(t3, "type");
    } else if (r2.includes(" argument")) i4 = "The " + r2 + " " + n3 + " " + St(t3, "type");
    else {
      var s3 = r2.includes(".") ? "property" : "argument";
      i4 = 'The "' + r2 + '" ' + s3 + " " + n3 + " " + St(t3, "type");
    }
    return arguments.length >= 3 && (i4 += ". Received type " + (e !== null ? typeof e : "null")), i4;
  }
  function Cr() {
    for (var r2 = [], t3 = 0; t3 < arguments.length; t3++) r2[t3] = arguments[t3];
    q6(r2.length > 0, "At least one arg needs to be specified");
    var e = "The ", n3 = r2.length;
    switch (r2 = r2.map(function(i4) {
      return '"' + i4 + '"';
    }), n3) {
      case 1:
        e += r2[0] + " argument";
        break;
      case 2:
        e += r2[0] + " and " + r2[1] + " arguments";
        break;
      default:
        e += r2.slice(0, n3 - 1).join(", "), e += ", and " + r2[n3 - 1] + " arguments";
        break;
    }
    return e + " must be specified";
  }
  function St(r2, t3) {
    if (q6(r2, "expected is required"), q6(typeof t3 == "string", "thing is required"), Array.isArray(r2)) {
      var e = r2.length;
      return q6(e > 0, "At least one expected value needs to be specified"), r2 = r2.map(function(n3) {
        return String(n3);
      }), e > 2 ? "one of " + t3 + " " + r2.slice(0, e - 1).join(", ") + ", or " + r2[e - 1] : e === 2 ? "one of " + t3 + " " + r2[0] + " or " + r2[1] : "of " + t3 + " " + r2[0];
    } else return "of " + t3 + " " + String(r2);
  }
  function Pr(r2, t3) {
    return t3 ? "Attempt to write outside buffer bounds" : '"' + r2 + '" is outside of buffer bounds';
  }
});
var jt = g6(($3) => {
  "use strict";
  Object.defineProperty($3, "__esModule", { value: true });
  var xt2 = Rt(), Lr = Ht();
  $3.ENCODING_UTF8 = "utf8";
  function Ar(r2) {
    if (r2 && !xt2.Buffer.isEncoding(r2)) throw new Lr.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", r2);
  }
  $3.assertEncoding = Ar;
  function Dr(r2, t3) {
    return !t3 || t3 === $3.ENCODING_UTF8 ? r2 : t3 === "buffer" ? new xt2.Buffer(r2) : new xt2.Buffer(r2).toString(t3);
  }
  $3.strToEncoding = Dr;
});
var Xt = g6((wt) => {
  "use strict";
  Object.defineProperty(wt, "__esModule", { value: true });
  var Y3 = Q2(), Mr = jt(), Ur = Y3.constants.S_IFMT, Wr = Y3.constants.S_IFDIR, Kr = Y3.constants.S_IFREG, Vr = Y3.constants.S_IFBLK, qr = Y3.constants.S_IFCHR, Yr = Y3.constants.S_IFLNK, Hr = Y3.constants.S_IFIFO, xr = Y3.constants.S_IFSOCK, Oe2 = function() {
    function r2() {
      this.name = "", this.mode = 0;
    }
    return r2.build = function(t3, e) {
      var n3 = new r2(), i4 = t3.getNode().mode;
      return n3.name = Mr.strToEncoding(t3.getName(), e), n3.mode = i4, n3;
    }, r2.prototype._checkModeProperty = function(t3) {
      return (this.mode & Ur) === t3;
    }, r2.prototype.isDirectory = function() {
      return this._checkModeProperty(Wr);
    }, r2.prototype.isFile = function() {
      return this._checkModeProperty(Kr);
    }, r2.prototype.isBlockDevice = function() {
      return this._checkModeProperty(Vr);
    }, r2.prototype.isCharacterDevice = function() {
      return this._checkModeProperty(qr);
    }, r2.prototype.isSymbolicLink = function() {
      return this._checkModeProperty(Yr);
    }, r2.prototype.isFIFO = function() {
      return this._checkModeProperty(Hr);
    }, r2.prototype.isSocket = function() {
      return this._checkModeProperty(xr);
    }, r2;
  }();
  wt.Dirent = Oe2;
  wt.default = Oe2;
});
var Gt = g6((zt) => {
  "use strict";
  Object.defineProperty(zt, "__esModule", { value: true });
  var Jt;
  typeof __setImmediate$ == "function" ? Jt = __setImmediate$.bind(__global$3) : Jt = setTimeout.bind(__global$3);
  zt.default = Jt;
});
var Zt = g6((Ot2) => {
  "use strict";
  Object.defineProperty(Ot2, "__esModule", { value: true });
  var jr = function() {
    if (typeof __Process$5 < "u") return __Process$5;
    try {
      return R4("process");
    } catch {
      return;
    }
  };
  function Ie() {
    var r2 = jr() || {};
    return r2.getuid || (r2.getuid = function() {
      return 0;
    }), r2.getgid || (r2.getgid = function() {
      return 0;
    }), r2.cwd || (r2.cwd = function() {
      return "/";
    }), r2.nextTick || (r2.nextTick = Gt().default), r2.emitWarning || (r2.emitWarning = function(t3, e) {
      console.warn("" + e + (e ? ": " : "") + t3);
    }), r2.env || (r2.env = {}), r2;
  }
  Ot2.createProcess = Ie;
  Ot2.default = Ie();
});
var ke = g6((L4) => {
  "use strict";
  var Te2 = L4 && L4.__extends || /* @__PURE__ */ function() {
    var r2 = function(t3, e) {
      return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, i4) {
        n3.__proto__ = i4;
      } || function(n3, i4) {
        for (var o4 in i4) i4.hasOwnProperty(o4) && (n3[o4] = i4[o4]);
      }, r2(t3, e);
    };
    return function(t3, e) {
      r2(t3, e);
      function n3() {
        this.constructor = t3;
      }
      t3.prototype = e === null ? Object.create(e) : (n3.prototype = e.prototype, new n3());
    };
  }();
  Object.defineProperty(L4, "__esModule", { value: true });
  var tt2 = Zt(), B5 = Rt(), A4 = Q2(), be = R4("events"), Xr = Et(), It = A4.constants.S_IFMT, Ne2 = A4.constants.S_IFDIR, Qt = A4.constants.S_IFREG, ei = A4.constants.S_IFBLK, ri = A4.constants.S_IFCHR, Fe = A4.constants.S_IFLNK, ni = A4.constants.S_IFIFO, ii = A4.constants.S_IFSOCK, Jr = A4.constants.O_APPEND;
  L4.SEP = "/";
  var zr = function(r2) {
    Te2(t3, r2);
    function t3(e, n3) {
      n3 === void 0 && (n3 = 438);
      var i4 = r2.call(this) || this;
      return i4.uid = tt2.default.getuid(), i4.gid = tt2.default.getgid(), i4.atime = /* @__PURE__ */ new Date(), i4.mtime = /* @__PURE__ */ new Date(), i4.ctime = /* @__PURE__ */ new Date(), i4.perm = 438, i4.mode = Qt, i4.nlink = 1, i4.perm = n3, i4.mode |= n3, i4.ino = e, i4;
    }
    return t3.prototype.getString = function(e) {
      return e === void 0 && (e = "utf8"), this.getBuffer().toString(e);
    }, t3.prototype.setString = function(e) {
      this.buf = B5.bufferFrom(e, "utf8"), this.touch();
    }, t3.prototype.getBuffer = function() {
      return this.buf || this.setBuffer(B5.bufferAllocUnsafe(0)), B5.bufferFrom(this.buf);
    }, t3.prototype.setBuffer = function(e) {
      this.buf = B5.bufferFrom(e), this.touch();
    }, t3.prototype.getSize = function() {
      return this.buf ? this.buf.length : 0;
    }, t3.prototype.setModeProperty = function(e) {
      this.mode = this.mode & ~It | e;
    }, t3.prototype.setIsFile = function() {
      this.setModeProperty(Qt);
    }, t3.prototype.setIsDirectory = function() {
      this.setModeProperty(Ne2);
    }, t3.prototype.setIsSymlink = function() {
      this.setModeProperty(Fe);
    }, t3.prototype.isFile = function() {
      return (this.mode & It) === Qt;
    }, t3.prototype.isDirectory = function() {
      return (this.mode & It) === Ne2;
    }, t3.prototype.isSymlink = function() {
      return (this.mode & It) === Fe;
    }, t3.prototype.makeSymlink = function(e) {
      this.symlink = e, this.setIsSymlink();
    }, t3.prototype.write = function(e, n3, i4, o4) {
      if (n3 === void 0 && (n3 = 0), i4 === void 0 && (i4 = e.length), o4 === void 0 && (o4 = 0), this.buf || (this.buf = B5.bufferAllocUnsafe(0)), o4 + i4 > this.buf.length) {
        var s3 = B5.bufferAllocUnsafe(o4 + i4);
        this.buf.copy(s3, 0, 0, this.buf.length), this.buf = s3;
      }
      return e.copy(this.buf, o4, n3, n3 + i4), this.touch(), i4;
    }, t3.prototype.read = function(e, n3, i4, o4) {
      n3 === void 0 && (n3 = 0), i4 === void 0 && (i4 = e.byteLength), o4 === void 0 && (o4 = 0), this.buf || (this.buf = B5.bufferAllocUnsafe(0));
      var s3 = i4;
      return s3 > e.byteLength && (s3 = e.byteLength), s3 + o4 > this.buf.length && (s3 = this.buf.length - o4), this.buf.copy(e, n3, o4, o4 + s3), s3;
    }, t3.prototype.truncate = function(e) {
      if (e === void 0 && (e = 0), !e) this.buf = B5.bufferAllocUnsafe(0);
      else if (this.buf || (this.buf = B5.bufferAllocUnsafe(0)), e <= this.buf.length) this.buf = this.buf.slice(0, e);
      else {
        var n3 = B5.bufferAllocUnsafe(0);
        this.buf.copy(n3), n3.fill(0, e);
      }
      this.touch();
    }, t3.prototype.chmod = function(e) {
      this.perm = e, this.mode = this.mode & -512 | e, this.touch();
    }, t3.prototype.chown = function(e, n3) {
      this.uid = e, this.gid = n3, this.touch();
    }, t3.prototype.touch = function() {
      this.mtime = /* @__PURE__ */ new Date(), this.emit("change", this);
    }, t3.prototype.canRead = function(e, n3) {
      return e === void 0 && (e = tt2.default.getuid()), n3 === void 0 && (n3 = tt2.default.getgid()), !!(this.perm & 4 || n3 === this.gid && this.perm & 32 || e === this.uid && this.perm & 256);
    }, t3.prototype.canWrite = function(e, n3) {
      return e === void 0 && (e = tt2.default.getuid()), n3 === void 0 && (n3 = tt2.default.getgid()), !!(this.perm & 2 || n3 === this.gid && this.perm & 16 || e === this.uid && this.perm & 128);
    }, t3.prototype.del = function() {
      this.emit("delete", this);
    }, t3.prototype.toJSON = function() {
      return { ino: this.ino, uid: this.uid, gid: this.gid, atime: this.atime.getTime(), mtime: this.mtime.getTime(), ctime: this.ctime.getTime(), perm: this.perm, mode: this.mode, nlink: this.nlink, symlink: this.symlink, data: this.getString() };
    }, t3;
  }(be.EventEmitter);
  L4.Node = zr;
  var Gr = function(r2) {
    Te2(t3, r2);
    function t3(e, n3, i4) {
      var o4 = r2.call(this) || this;
      return o4.children = {}, o4.steps = [], o4.ino = 0, o4.length = 0, o4.vol = e, o4.parent = n3, o4.steps = n3 ? n3.steps.concat([i4]) : [i4], o4;
    }
    return t3.prototype.setNode = function(e) {
      this.node = e, this.ino = e.ino;
    }, t3.prototype.getNode = function() {
      return this.node;
    }, t3.prototype.createChild = function(e, n3) {
      n3 === void 0 && (n3 = this.vol.createNode());
      var i4 = new t3(this.vol, this, e);
      return i4.setNode(n3), n3.isDirectory(), this.setChild(e, i4), i4;
    }, t3.prototype.setChild = function(e, n3) {
      return n3 === void 0 && (n3 = new t3(this.vol, this, e)), this.children[e] = n3, n3.parent = this, this.length++, this.emit("child:add", n3, this), n3;
    }, t3.prototype.deleteChild = function(e) {
      delete this.children[e.getName()], this.length--, this.emit("child:delete", e, this);
    }, t3.prototype.getChild = function(e) {
      if (Object.hasOwnProperty.call(this.children, e)) return this.children[e];
    }, t3.prototype.getPath = function() {
      return this.steps.join(L4.SEP);
    }, t3.prototype.getName = function() {
      return this.steps[this.steps.length - 1];
    }, t3.prototype.walk = function(e, n3, i4) {
      if (n3 === void 0 && (n3 = e.length), i4 === void 0 && (i4 = 0), i4 >= e.length) return this;
      if (i4 >= n3) return this;
      var o4 = e[i4], s3 = this.getChild(o4);
      return s3 ? s3.walk(e, n3, i4 + 1) : null;
    }, t3.prototype.toJSON = function() {
      return { steps: this.steps, ino: this.ino, children: Object.keys(this.children) };
    }, t3;
  }(be.EventEmitter);
  L4.Link = Gr;
  var Zr = function() {
    function r2(t3, e, n3, i4) {
      this.position = 0, this.link = t3, this.node = e, this.flags = n3, this.fd = i4;
    }
    return r2.prototype.getString = function(t3) {
      return t3 === void 0 && (t3 = "utf8"), this.node.getString();
    }, r2.prototype.setString = function(t3) {
      this.node.setString(t3);
    }, r2.prototype.getBuffer = function() {
      return this.node.getBuffer();
    }, r2.prototype.setBuffer = function(t3) {
      this.node.setBuffer(t3);
    }, r2.prototype.getSize = function() {
      return this.node.getSize();
    }, r2.prototype.truncate = function(t3) {
      this.node.truncate(t3);
    }, r2.prototype.seekTo = function(t3) {
      this.position = t3;
    }, r2.prototype.stats = function() {
      return Xr.default.build(this.node);
    }, r2.prototype.write = function(t3, e, n3, i4) {
      e === void 0 && (e = 0), n3 === void 0 && (n3 = t3.length), typeof i4 != "number" && (i4 = this.position), this.flags & Jr && (i4 = this.getSize());
      var o4 = this.node.write(t3, e, n3, i4);
      return this.position = i4 + o4, o4;
    }, r2.prototype.read = function(t3, e, n3, i4) {
      e === void 0 && (e = 0), n3 === void 0 && (n3 = t3.byteLength), typeof i4 != "number" && (i4 = this.position);
      var o4 = this.node.read(t3, e, n3, i4);
      return this.position = i4 + o4, o4;
    }, r2.prototype.chmod = function(t3) {
      this.node.chmod(t3);
    }, r2.prototype.chown = function(t3, e) {
      this.node.chown(t3, e);
    }, r2;
  }();
  L4.File = Zr;
});
var Be = g6(($t) => {
  "use strict";
  Object.defineProperty($t, "__esModule", { value: true });
  function Qr(r2, t3, e) {
    var n3 = setTimeout.apply(null, arguments);
    return n3 && typeof n3 == "object" && typeof n3.unref == "function" && n3.unref(), n3;
  }
  $t.default = Qr;
});
var Ce = g6((rt) => {
  "use strict";
  var $r = rt && rt.__spreadArrays || function() {
    for (var r2 = 0, t3 = 0, e = arguments.length; t3 < e; t3++) r2 += arguments[t3].length;
    for (var n3 = Array(r2), i4 = 0, t3 = 0; t3 < e; t3++) for (var o4 = arguments[t3], s3 = 0, a3 = o4.length; s3 < a3; s3++, i4++) n3[i4] = o4[s3];
    return n3;
  };
  Object.defineProperty(rt, "__esModule", { value: true });
  function l4(r2, t3, e) {
    return e === void 0 && (e = function(n3) {
      return n3;
    }), function() {
      for (var n3 = [], i4 = 0; i4 < arguments.length; i4++) n3[i4] = arguments[i4];
      return new Promise(function(o4, s3) {
        r2[t3].bind(r2).apply(void 0, $r(n3, [function(a3, f5) {
          return a3 ? s3(a3) : o4(e(f5));
        }]));
      });
    };
  }
  var et2 = function() {
    function r2(t3, e) {
      this.vol = t3, this.fd = e;
    }
    return r2.prototype.appendFile = function(t3, e) {
      return l4(this.vol, "appendFile")(this.fd, t3, e);
    }, r2.prototype.chmod = function(t3) {
      return l4(this.vol, "fchmod")(this.fd, t3);
    }, r2.prototype.chown = function(t3, e) {
      return l4(this.vol, "fchown")(this.fd, t3, e);
    }, r2.prototype.close = function() {
      return l4(this.vol, "close")(this.fd);
    }, r2.prototype.datasync = function() {
      return l4(this.vol, "fdatasync")(this.fd);
    }, r2.prototype.read = function(t3, e, n3, i4) {
      return l4(this.vol, "read", function(o4) {
        return { bytesRead: o4, buffer: t3 };
      })(this.fd, t3, e, n3, i4);
    }, r2.prototype.readFile = function(t3) {
      return l4(this.vol, "readFile")(this.fd, t3);
    }, r2.prototype.stat = function(t3) {
      return l4(this.vol, "fstat")(this.fd, t3);
    }, r2.prototype.sync = function() {
      return l4(this.vol, "fsync")(this.fd);
    }, r2.prototype.truncate = function(t3) {
      return l4(this.vol, "ftruncate")(this.fd, t3);
    }, r2.prototype.utimes = function(t3, e) {
      return l4(this.vol, "futimes")(this.fd, t3, e);
    }, r2.prototype.write = function(t3, e, n3, i4) {
      return l4(this.vol, "write", function(o4) {
        return { bytesWritten: o4, buffer: t3 };
      })(this.fd, t3, e, n3, i4);
    }, r2.prototype.writeFile = function(t3, e) {
      return l4(this.vol, "writeFile")(this.fd, t3, e);
    }, r2;
  }();
  rt.FileHandle = et2;
  function tn(r2) {
    return typeof Promise > "u" ? null : { FileHandle: et2, access: function(t3, e) {
      return l4(r2, "access")(t3, e);
    }, appendFile: function(t3, e, n3) {
      return l4(r2, "appendFile")(t3 instanceof et2 ? t3.fd : t3, e, n3);
    }, chmod: function(t3, e) {
      return l4(r2, "chmod")(t3, e);
    }, chown: function(t3, e, n3) {
      return l4(r2, "chown")(t3, e, n3);
    }, copyFile: function(t3, e, n3) {
      return l4(r2, "copyFile")(t3, e, n3);
    }, lchmod: function(t3, e) {
      return l4(r2, "lchmod")(t3, e);
    }, lchown: function(t3, e, n3) {
      return l4(r2, "lchown")(t3, e, n3);
    }, link: function(t3, e) {
      return l4(r2, "link")(t3, e);
    }, lstat: function(t3, e) {
      return l4(r2, "lstat")(t3, e);
    }, mkdir: function(t3, e) {
      return l4(r2, "mkdir")(t3, e);
    }, mkdtemp: function(t3, e) {
      return l4(r2, "mkdtemp")(t3, e);
    }, open: function(t3, e, n3) {
      return l4(r2, "open", function(i4) {
        return new et2(r2, i4);
      })(t3, e, n3);
    }, readdir: function(t3, e) {
      return l4(r2, "readdir")(t3, e);
    }, readFile: function(t3, e) {
      return l4(r2, "readFile")(t3 instanceof et2 ? t3.fd : t3, e);
    }, readlink: function(t3, e) {
      return l4(r2, "readlink")(t3, e);
    }, realpath: function(t3, e) {
      return l4(r2, "realpath")(t3, e);
    }, rename: function(t3, e) {
      return l4(r2, "rename")(t3, e);
    }, rmdir: function(t3) {
      return l4(r2, "rmdir")(t3);
    }, stat: function(t3, e) {
      return l4(r2, "stat")(t3, e);
    }, symlink: function(t3, e, n3) {
      return l4(r2, "symlink")(t3, e, n3);
    }, truncate: function(t3, e) {
      return l4(r2, "truncate")(t3, e);
    }, unlink: function(t3) {
      return l4(r2, "unlink")(t3);
    }, utimes: function(t3, e, n3) {
      return l4(r2, "utimes")(t3, e, n3);
    }, writeFile: function(t3, e, n3) {
      return l4(r2, "writeFile")(t3 instanceof et2 ? t3.fd : t3, e, n3);
    } };
  }
  rt.default = tn;
});
var sr = g6((_7) => {
  "use strict";
  var st = _7 && _7.__extends || /* @__PURE__ */ function() {
    var r2 = function(t3, e) {
      return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, i4) {
        n3.__proto__ = i4;
      } || function(n3, i4) {
        for (var o4 in i4) i4.hasOwnProperty(o4) && (n3[o4] = i4[o4]);
      }, r2(t3, e);
    };
    return function(t3, e) {
      r2(t3, e);
      function n3() {
        this.constructor = t3;
      }
      t3.prototype = e === null ? Object.create(e) : (n3.prototype = e.prototype, new n3());
    };
  }(), te = _7 && _7.__spreadArrays || function() {
    for (var r2 = 0, t3 = 0, e = arguments.length; t3 < e; t3++) r2 += arguments[t3].length;
    for (var n3 = Array(r2), i4 = 0, t3 = 0; t3 < e; t3++) for (var o4 = arguments[t3], s3 = 0, a3 = o4.length; s3 < a3; s3++, i4++) n3[i4] = o4[s3];
    return n3;
  };
  Object.defineProperty(_7, "__esModule", { value: true });
  var ht = R4("path"), ee = ke(), re = Et(), en = Xt(), U5 = Rt(), Nt = Gt(), H3 = Zt(), rn = Be(), Pt3 = R4("stream"), F4 = Q2(), Ye = R4("events"), C3 = jt(), oe2 = Ht(), W3 = R4("fast-extend").extend, He = R4("util"), nn = Ce(), on = ht.resolve, kt = F4.constants.O_RDONLY, at = F4.constants.O_WRONLY, M6 = F4.constants.O_RDWR, b6 = F4.constants.O_CREAT, Ft2 = F4.constants.O_EXCL, pt = F4.constants.O_TRUNC, lt = F4.constants.O_APPEND, Pe = F4.constants.O_SYNC, sn = F4.constants.O_DIRECTORY, Le = F4.constants.F_OK, an = F4.constants.COPYFILE_EXCL, fn = F4.constants.COPYFILE_FICLONE_FORCE, w9, Bt;
  ht.posix ? (ne = ht.posix, w9 = ne.sep, Bt = ne.relative) : (w9 = ht.sep, Bt = ht.relative);
  var ne, se = H3.default.platform === "win32", un = 128, K3 = { PATH_STR: "path must be a string or Buffer", FD: "fd must be a file descriptor", MODE_INT: "mode must be an int", CB: "callback must be a function", UID: "uid must be an unsigned int", GID: "gid must be an unsigned int", LEN: "len must be an integer", ATIME: "atime must be an integer", MTIME: "mtime must be an integer", PREFIX: "filename prefix is required", BUFFER: "buffer must be an instance of Buffer or StaticBuffer", OFFSET: "offset must be an integer", LENGTH: "length must be an integer", POSITION: "position must be an integer" }, cn = function(r2) {
    return "Expected options to be either an object or a string, but got " + r2 + " instead";
  }, m6 = "ENOENT", ae = "EBADF", xe = "EINVAL", hn = "EPERM", pn = "EPROTO", ot = "EEXIST", J3 = "ENOTDIR", je = "EMFILE", Xe = "EACCES", Tt = "EISDIR", Je = "ENOTEMPTY", ze = "ENOSYS";
  function ln(r2, t3, e, n3) {
    t3 === void 0 && (t3 = ""), e === void 0 && (e = ""), n3 === void 0 && (n3 = "");
    var i4 = "";
    switch (e && (i4 = " '" + e + "'"), n3 && (i4 += " -> '" + n3 + "'"), r2) {
      case m6:
        return "ENOENT: no such file or directory, " + t3 + i4;
      case ae:
        return "EBADF: bad file descriptor, " + t3 + i4;
      case xe:
        return "EINVAL: invalid argument, " + t3 + i4;
      case hn:
        return "EPERM: operation not permitted, " + t3 + i4;
      case pn:
        return "EPROTO: protocol error, " + t3 + i4;
      case ot:
        return "EEXIST: file already exists, " + t3 + i4;
      case J3:
        return "ENOTDIR: not a directory, " + t3 + i4;
      case Tt:
        return "EISDIR: illegal operation on a directory, " + t3 + i4;
      case Xe:
        return "EACCES: permission denied, " + t3 + i4;
      case Je:
        return "ENOTEMPTY: directory not empty, " + t3 + i4;
      case je:
        return "EMFILE: too many open files, " + t3 + i4;
      case ze:
        return "ENOSYS: function not implemented, " + t3 + i4;
      default:
        return r2 + ": error occurred, " + t3 + i4;
    }
  }
  function p6(r2, t3, e, n3, i4) {
    t3 === void 0 && (t3 = ""), e === void 0 && (e = ""), n3 === void 0 && (n3 = ""), i4 === void 0 && (i4 = Error);
    var o4 = new i4(ln(r2, t3, e, n3));
    return o4.code = r2, o4;
  }
  var Z3;
  (function(r2) {
    r2[r2.r = kt] = "r", r2[r2["r+"] = M6] = "r+", r2[r2.rs = kt | Pe] = "rs", r2[r2.sr = r2.rs] = "sr", r2[r2["rs+"] = M6 | Pe] = "rs+", r2[r2["sr+"] = r2["rs+"]] = "sr+", r2[r2.w = at | b6 | pt] = "w", r2[r2.wx = at | b6 | pt | Ft2] = "wx", r2[r2.xw = r2.wx] = "xw", r2[r2["w+"] = M6 | b6 | pt] = "w+", r2[r2["wx+"] = M6 | b6 | pt | Ft2] = "wx+", r2[r2["xw+"] = r2["wx+"]] = "xw+", r2[r2.a = at | lt | b6] = "a", r2[r2.ax = at | lt | b6 | Ft2] = "ax", r2[r2.xa = r2.ax] = "xa", r2[r2["a+"] = M6 | lt | b6] = "a+", r2[r2["ax+"] = M6 | lt | b6 | Ft2] = "ax+", r2[r2["xa+"] = r2["ax+"]] = "xa+";
  })(Z3 = _7.FLAGS || (_7.FLAGS = {}));
  function z3(r2) {
    if (typeof r2 == "number") return r2;
    if (typeof r2 == "string") {
      var t3 = Z3[r2];
      if (typeof t3 < "u") return t3;
    }
    throw new oe2.TypeError("ERR_INVALID_OPT_VALUE", "flags", r2);
  }
  _7.flagsToNumber = z3;
  function ue(r2, t3) {
    var e;
    if (t3) {
      var n3 = typeof t3;
      switch (n3) {
        case "string":
          e = W3({}, r2, { encoding: t3 });
          break;
        case "object":
          e = W3({}, r2, t3);
          break;
        default:
          throw TypeError(cn(n3));
      }
    } else return r2;
    return e.encoding !== "buffer" && C3.assertEncoding(e.encoding), e;
  }
  function ft2(r2) {
    return function(t3) {
      return ue(r2, t3);
    };
  }
  function E5(r2) {
    if (typeof r2 != "function") throw TypeError(K3.CB);
    return r2;
  }
  function vt2(r2) {
    return function(t3, e) {
      return typeof t3 == "function" ? [r2(), t3] : [r2(t3), E5(e)];
    };
  }
  var Ge = { encoding: "utf8" }, bt2 = ft2(Ge), Ae = vt2(bt2), dn = { flag: "r" }, De = ft2(dn), Ze = { encoding: "utf8", mode: 438, flag: Z3[Z3.w] }, Me = ft2(Ze), Qe = { encoding: "utf8", mode: 438, flag: Z3[Z3.a] }, $e = ft2(Qe), yn = vt2($e), vn = Ge, tr = ft2(vn), mn = vt2(tr), Ue = { mode: 511, recursive: false }, We = function(r2) {
    return typeof r2 == "number" ? W3({}, Ue, { mode: r2 }) : W3({}, Ue, r2);
  }, _n = { recursive: false }, Ke = function(r2) {
    return W3({}, _n, r2);
  }, gn = { encoding: "utf8", withFileTypes: false }, er2 = ft2(gn), En = vt2(er2), Rn2 = { bigint: false }, yt = function(r2) {
    return r2 === void 0 && (r2 = {}), W3({}, Rn2, r2);
  }, ie = function(r2, t3) {
    return typeof r2 == "function" ? [yt(), r2] : [yt(r2), E5(t3)];
  };
  function Sn2(r2) {
    if (r2.hostname !== "") throw new oe2.TypeError("ERR_INVALID_FILE_URL_HOST", H3.default.platform);
    for (var t3 = r2.pathname, e = 0; e < t3.length; e++) if (t3[e] === "%") {
      var n3 = t3.codePointAt(e + 2) | 32;
      if (t3[e + 1] === "2" && n3 === 102) throw new oe2.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
    }
    return decodeURIComponent(t3);
  }
  function h6(r2) {
    if (typeof r2 != "string" && !U5.Buffer.isBuffer(r2)) {
      try {
        if (!(r2 instanceof R4("url").URL)) throw new TypeError(K3.PATH_STR);
      } catch {
        throw new TypeError(K3.PATH_STR);
      }
      r2 = Sn2(r2);
    }
    var t3 = String(r2);
    return fe(t3), t3;
  }
  _7.pathToFilename = h6;
  var Ct = function(r2, t3) {
    return t3 === void 0 && (t3 = H3.default.cwd()), on(t3, r2);
  };
  se && (Ve = Ct, qe = R4("fs-monkey/lib/correctPath").unixify, Ct = function(r2, t3) {
    return qe(Ve(r2, t3));
  });
  var Ve, qe;
  function v5(r2, t3) {
    var e = Ct(r2, t3), n3 = e.substr(1);
    return n3 ? n3.split(w9) : [];
  }
  _7.filenameToSteps = v5;
  function rr2(r2) {
    return v5(h6(r2));
  }
  _7.pathToSteps = rr2;
  function wn2(r2, t3) {
    return t3 === void 0 && (t3 = C3.ENCODING_UTF8), U5.Buffer.isBuffer(r2) ? r2.toString(t3) : r2 instanceof Uint8Array ? U5.bufferFrom(r2).toString(t3) : String(r2);
  }
  _7.dataToStr = wn2;
  function dt(r2, t3) {
    return t3 === void 0 && (t3 = C3.ENCODING_UTF8), U5.Buffer.isBuffer(r2) ? r2 : r2 instanceof Uint8Array ? U5.bufferFrom(r2) : U5.bufferFrom(String(r2), t3);
  }
  _7.dataToBuffer = dt;
  function nr(r2, t3) {
    return !t3 || t3 === "buffer" ? r2 : r2.toString(t3);
  }
  _7.bufferToEncoding = nr;
  function fe(r2, t3) {
    if (("" + r2).indexOf("\0") !== -1) {
      var e = new Error("Path must be a string without null bytes");
      if (e.code = m6, typeof t3 != "function") throw e;
      return H3.default.nextTick(t3, e), false;
    }
    return true;
  }
  function On2(r2, t3) {
    if (typeof r2 == "number") return r2;
    if (typeof r2 == "string") return parseInt(r2, 8);
    if (t3) return S4(t3);
  }
  function S4(r2, t3) {
    var e = On2(r2, t3);
    if (typeof e != "number" || isNaN(e)) throw new TypeError(K3.MODE_INT);
    return e;
  }
  function G3(r2) {
    return r2 >>> 0 === r2;
  }
  function ct(r2) {
    if (!G3(r2)) throw TypeError(K3.FD);
  }
  function D3(r2) {
    if (typeof r2 == "string" && +r2 == r2) return +r2;
    if (r2 instanceof Date) return r2.getTime() / 1e3;
    if (isFinite(r2)) return r2 < 0 ? Date.now() / 1e3 : r2;
    throw new Error("Cannot parse time: " + r2);
  }
  _7.toUnixTimestamp = D3;
  function nt(r2) {
    if (typeof r2 != "number") throw TypeError(K3.UID);
  }
  function it(r2) {
    if (typeof r2 != "number") throw TypeError(K3.GID);
  }
  var In2 = function() {
    function r2(t3) {
      t3 === void 0 && (t3 = {}), this.ino = 0, this.inodes = {}, this.releasedInos = [], this.fds = {}, this.releasedFds = [], this.maxFiles = 1e4, this.openFiles = 0, this.promisesApi = nn.default(this), this.statWatchers = {}, this.props = W3({ Node: ee.Node, Link: ee.Link, File: ee.File }, t3);
      var e = this.createLink();
      e.setNode(this.createNode(true));
      var n3 = this;
      this.StatWatcher = function(s3) {
        st(a3, s3);
        function a3() {
          return s3.call(this, n3) || this;
        }
        return a3;
      }(ir2);
      var i4 = k4;
      this.ReadStream = function(s3) {
        st(a3, s3);
        function a3() {
          for (var f5 = [], u6 = 0; u6 < arguments.length; u6++) f5[u6] = arguments[u6];
          return s3.apply(this, te([n3], f5)) || this;
        }
        return a3;
      }(i4);
      var o4 = N4;
      this.WriteStream = function(s3) {
        st(a3, s3);
        function a3() {
          for (var f5 = [], u6 = 0; u6 < arguments.length; u6++) f5[u6] = arguments[u6];
          return s3.apply(this, te([n3], f5)) || this;
        }
        return a3;
      }(o4), this.FSWatcher = function(s3) {
        st(a3, s3);
        function a3() {
          return s3.call(this, n3) || this;
        }
        return a3;
      }(or2), this.root = e;
    }
    return r2.fromJSON = function(t3, e) {
      var n3 = new r2();
      return n3.fromJSON(t3, e), n3;
    }, Object.defineProperty(r2.prototype, "promises", { get: function() {
      if (this.promisesApi === null) throw new Error("Promise is not supported in this environment.");
      return this.promisesApi;
    }, enumerable: true, configurable: true }), r2.prototype.createLink = function(t3, e, n3, i4) {
      if (n3 === void 0 && (n3 = false), !t3) return new this.props.Link(this, null, "");
      if (!e) throw new Error("createLink: name cannot be empty");
      return t3.createChild(e, this.createNode(n3, i4));
    }, r2.prototype.deleteLink = function(t3) {
      var e = t3.parent;
      return e ? (e.deleteChild(t3), true) : false;
    }, r2.prototype.newInoNumber = function() {
      var t3 = this.releasedInos.pop();
      return t3 || (this.ino = (this.ino + 1) % 4294967295, this.ino);
    }, r2.prototype.newFdNumber = function() {
      var t3 = this.releasedFds.pop();
      return typeof t3 == "number" ? t3 : r2.fd--;
    }, r2.prototype.createNode = function(t3, e) {
      t3 === void 0 && (t3 = false);
      var n3 = new this.props.Node(this.newInoNumber(), e);
      return t3 && n3.setIsDirectory(), this.inodes[n3.ino] = n3, n3;
    }, r2.prototype.getNode = function(t3) {
      return this.inodes[t3];
    }, r2.prototype.deleteNode = function(t3) {
      t3.del(), delete this.inodes[t3.ino], this.releasedInos.push(t3.ino);
    }, r2.prototype.genRndStr = function() {
      var t3 = (Math.random() + 1).toString(36).substr(2, 6);
      return t3.length === 6 ? t3 : this.genRndStr();
    }, r2.prototype.getLink = function(t3) {
      return this.root.walk(t3);
    }, r2.prototype.getLinkOrThrow = function(t3, e) {
      var n3 = v5(t3), i4 = this.getLink(n3);
      if (!i4) throw p6(m6, e, t3);
      return i4;
    }, r2.prototype.getResolvedLink = function(t3) {
      for (var e = typeof t3 == "string" ? v5(t3) : t3, n3 = this.root, i4 = 0; i4 < e.length; ) {
        var o4 = e[i4];
        if (n3 = n3.getChild(o4), !n3) return null;
        var s3 = n3.getNode();
        if (s3.isSymlink()) {
          e = s3.symlink.concat(e.slice(i4 + 1)), n3 = this.root, i4 = 0;
          continue;
        }
        i4++;
      }
      return n3;
    }, r2.prototype.getResolvedLinkOrThrow = function(t3, e) {
      var n3 = this.getResolvedLink(t3);
      if (!n3) throw p6(m6, e, t3);
      return n3;
    }, r2.prototype.resolveSymlinks = function(t3) {
      return this.getResolvedLink(t3.steps.slice(1));
    }, r2.prototype.getLinkAsDirOrThrow = function(t3, e) {
      var n3 = this.getLinkOrThrow(t3, e);
      if (!n3.getNode().isDirectory()) throw p6(J3, e, t3);
      return n3;
    }, r2.prototype.getLinkParent = function(t3) {
      return this.root.walk(t3, t3.length - 1);
    }, r2.prototype.getLinkParentAsDirOrThrow = function(t3, e) {
      var n3 = t3 instanceof Array ? t3 : v5(t3), i4 = this.getLinkParent(n3);
      if (!i4) throw p6(m6, e, w9 + n3.join(w9));
      if (!i4.getNode().isDirectory()) throw p6(J3, e, w9 + n3.join(w9));
      return i4;
    }, r2.prototype.getFileByFd = function(t3) {
      return this.fds[String(t3)];
    }, r2.prototype.getFileByFdOrThrow = function(t3, e) {
      if (!G3(t3)) throw TypeError(K3.FD);
      var n3 = this.getFileByFd(t3);
      if (!n3) throw p6(ae, e);
      return n3;
    }, r2.prototype.getNodeByIdOrCreate = function(t3, e, n3) {
      if (typeof t3 == "number") {
        var i4 = this.getFileByFd(t3);
        if (!i4) throw Error("File nto found");
        return i4.node;
      } else {
        var o4 = rr2(t3), s3 = this.getLink(o4);
        if (s3) return s3.getNode();
        if (e & b6) {
          var a3 = this.getLinkParent(o4);
          if (a3) {
            var f5 = o4[o4.length - 1];
            return s3 = this.createLink(a3, f5, false, n3), s3.getNode();
          }
        }
        throw p6(m6, "getNodeByIdOrCreate", h6(t3));
      }
    }, r2.prototype.wrapAsync = function(t3, e, n3) {
      var i4 = this;
      E5(n3), Nt.default(function() {
        try {
          n3(null, t3.apply(i4, e));
        } catch (o4) {
          n3(o4);
        }
      });
    }, r2.prototype._toJSON = function(t3, e, n3) {
      var i4;
      t3 === void 0 && (t3 = this.root), e === void 0 && (e = {});
      var o4 = true, s3 = t3.children;
      t3.getNode().isFile() && (s3 = (i4 = {}, i4[t3.getName()] = t3.parent.getChild(t3.getName()), i4), t3 = t3.parent);
      for (var a3 in s3) {
        o4 = false;
        var f5 = t3.getChild(a3);
        if (!f5) throw new Error("_toJSON: unexpected undefined");
        var u6 = f5.getNode();
        if (u6.isFile()) {
          var d8 = f5.getPath();
          n3 && (d8 = Bt(n3, d8)), e[d8] = u6.getString();
        } else u6.isDirectory() && this._toJSON(f5, e, n3);
      }
      var y5 = t3.getPath();
      return n3 && (y5 = Bt(n3, y5)), y5 && o4 && (e[y5] = null), e;
    }, r2.prototype.toJSON = function(t3, e, n3) {
      e === void 0 && (e = {}), n3 === void 0 && (n3 = false);
      var i4 = [];
      if (t3) {
        t3 instanceof Array || (t3 = [t3]);
        for (var o4 = 0, s3 = t3; o4 < s3.length; o4++) {
          var a3 = s3[o4], f5 = h6(a3), u6 = this.getResolvedLink(f5);
          u6 && i4.push(u6);
        }
      } else i4.push(this.root);
      if (!i4.length) return e;
      for (var d8 = 0, y5 = i4; d8 < y5.length; d8++) {
        var u6 = y5[d8];
        this._toJSON(u6, e, n3 ? u6.getPath() : "");
      }
      return e;
    }, r2.prototype.fromJSON = function(t3, e) {
      e === void 0 && (e = H3.default.cwd());
      for (var n3 in t3) {
        var i4 = t3[n3];
        if (typeof i4 == "string") {
          n3 = Ct(n3, e);
          var o4 = v5(n3);
          if (o4.length > 1) {
            var s3 = w9 + o4.slice(0, o4.length - 1).join(w9);
            this.mkdirpBase(s3, 511);
          }
          this.writeFileSync(n3, i4);
        } else this.mkdirpBase(n3, 511);
      }
    }, r2.prototype.reset = function() {
      this.ino = 0, this.inodes = {}, this.releasedInos = [], this.fds = {}, this.releasedFds = [], this.openFiles = 0, this.root = this.createLink(), this.root.setNode(this.createNode(true));
    }, r2.prototype.mountSync = function(t3, e) {
      this.fromJSON(e, t3);
    }, r2.prototype.openLink = function(t3, e, n3) {
      if (n3 === void 0 && (n3 = true), this.openFiles >= this.maxFiles) throw p6(je, "open", t3.getPath());
      var i4 = t3;
      if (n3 && (i4 = this.resolveSymlinks(t3)), !i4) throw p6(m6, "open", t3.getPath());
      var o4 = i4.getNode();
      if (o4.isDirectory()) {
        if ((e & (kt | M6 | at)) !== kt) throw p6(Tt, "open", t3.getPath());
      } else if (e & sn) throw p6(J3, "open", t3.getPath());
      if (!(e & at) && !o4.canRead()) throw p6(Xe, "open", t3.getPath());
      e & M6;
      var s3 = new this.props.File(t3, o4, e, this.newFdNumber());
      return this.fds[s3.fd] = s3, this.openFiles++, e & pt && s3.truncate(), s3;
    }, r2.prototype.openFile = function(t3, e, n3, i4) {
      i4 === void 0 && (i4 = true);
      var o4 = v5(t3), s3 = i4 ? this.getResolvedLink(o4) : this.getLink(o4);
      if (!s3 && e & b6) {
        var a3 = this.getResolvedLink(o4.slice(0, o4.length - 1));
        if (!a3) throw p6(m6, "open", w9 + o4.join(w9));
        e & b6 && typeof n3 == "number" && (s3 = this.createLink(a3, o4[o4.length - 1], false, n3));
      }
      if (s3) return this.openLink(s3, e, i4);
      throw p6(m6, "open", t3);
    }, r2.prototype.openBase = function(t3, e, n3, i4) {
      i4 === void 0 && (i4 = true);
      var o4 = this.openFile(t3, e, n3, i4);
      if (!o4) throw p6(m6, "open", t3);
      return o4.fd;
    }, r2.prototype.openSync = function(t3, e, n3) {
      n3 === void 0 && (n3 = 438);
      var i4 = S4(n3), o4 = h6(t3), s3 = z3(e);
      return this.openBase(o4, s3, i4);
    }, r2.prototype.open = function(t3, e, n3, i4) {
      var o4 = n3, s3 = i4;
      typeof n3 == "function" && (o4 = 438, s3 = n3), o4 = o4 || 438;
      var a3 = S4(o4), f5 = h6(t3), u6 = z3(e);
      this.wrapAsync(this.openBase, [f5, u6, a3], s3);
    }, r2.prototype.closeFile = function(t3) {
      this.fds[t3.fd] && (this.openFiles--, delete this.fds[t3.fd], this.releasedFds.push(t3.fd));
    }, r2.prototype.closeSync = function(t3) {
      ct(t3);
      var e = this.getFileByFdOrThrow(t3, "close");
      this.closeFile(e);
    }, r2.prototype.close = function(t3, e) {
      ct(t3), this.wrapAsync(this.closeSync, [t3], e);
    }, r2.prototype.openFileOrGetById = function(t3, e, n3) {
      if (typeof t3 == "number") {
        var i4 = this.fds[t3];
        if (!i4) throw p6(m6);
        return i4;
      } else return this.openFile(h6(t3), e, n3);
    }, r2.prototype.readBase = function(t3, e, n3, i4, o4) {
      var s3 = this.getFileByFdOrThrow(t3);
      return s3.read(e, Number(n3), Number(i4), o4);
    }, r2.prototype.readSync = function(t3, e, n3, i4, o4) {
      return ct(t3), this.readBase(t3, e, n3, i4, o4);
    }, r2.prototype.read = function(t3, e, n3, i4, o4, s3) {
      var a3 = this;
      if (E5(s3), i4 === 0) return H3.default.nextTick(function() {
        s3 && s3(null, 0, e);
      });
      Nt.default(function() {
        try {
          var f5 = a3.readBase(t3, e, n3, i4, o4);
          s3(null, f5, e);
        } catch (u6) {
          s3(u6);
        }
      });
    }, r2.prototype.readFileBase = function(t3, e, n3) {
      var i4, o4 = typeof t3 == "number", s3 = o4 && G3(t3), a3;
      if (s3) a3 = t3;
      else {
        var f5 = h6(t3), u6 = v5(f5), d8 = this.getResolvedLink(u6);
        if (d8) {
          var y5 = d8.getNode();
          if (y5.isDirectory()) throw p6(Tt, "open", d8.getPath());
        }
        a3 = this.openSync(t3, e);
      }
      try {
        i4 = nr(this.getFileByFdOrThrow(a3).getBuffer(), n3);
      } finally {
        s3 || this.closeSync(a3);
      }
      return i4;
    }, r2.prototype.readFileSync = function(t3, e) {
      var n3 = De(e), i4 = z3(n3.flag);
      return this.readFileBase(t3, i4, n3.encoding);
    }, r2.prototype.readFile = function(t3, e, n3) {
      var i4 = vt2(De)(e, n3), o4 = i4[0], s3 = i4[1], a3 = z3(o4.flag);
      this.wrapAsync(this.readFileBase, [t3, a3, o4.encoding], s3);
    }, r2.prototype.writeBase = function(t3, e, n3, i4, o4) {
      var s3 = this.getFileByFdOrThrow(t3, "write");
      return s3.write(e, n3, i4, o4);
    }, r2.prototype.writeSync = function(t3, e, n3, i4, o4) {
      ct(t3);
      var s3, a3, f5, u6, d8 = typeof e != "string";
      d8 ? (a3 = (n3 || 0) | 0, f5 = i4, u6 = o4) : (u6 = n3, s3 = i4);
      var y5 = dt(e, s3);
      return d8 ? typeof f5 > "u" && (f5 = y5.length) : (a3 = 0, f5 = y5.length), this.writeBase(t3, y5, a3, f5, u6);
    }, r2.prototype.write = function(t3, e, n3, i4, o4, s3) {
      var a3 = this;
      ct(t3);
      var f5, u6, d8, y5, T4, Dt = typeof e, pe = typeof n3, le2 = typeof i4, de = typeof o4;
      Dt !== "string" ? pe === "function" ? T4 = n3 : le2 === "function" ? (f5 = n3 | 0, T4 = i4) : de === "function" ? (f5 = n3 | 0, u6 = i4, T4 = o4) : (f5 = n3 | 0, u6 = i4, d8 = o4, T4 = s3) : pe === "function" ? T4 = n3 : le2 === "function" ? (d8 = n3, T4 = i4) : de === "function" && (d8 = n3, y5 = i4, T4 = o4);
      var _t2 = dt(e, y5);
      Dt !== "string" ? typeof u6 > "u" && (u6 = _t2.length) : (f5 = 0, u6 = _t2.length);
      var Mt2 = E5(T4);
      Nt.default(function() {
        try {
          var ye = a3.writeBase(t3, _t2, f5, u6, d8);
          Dt !== "string" ? Mt2(null, ye, _t2) : Mt2(null, ye, e);
        } catch (hr) {
          Mt2(hr);
        }
      });
    }, r2.prototype.writeFileBase = function(t3, e, n3, i4) {
      var o4 = typeof t3 == "number", s3;
      o4 ? s3 = t3 : s3 = this.openBase(h6(t3), n3, i4);
      var a3 = 0, f5 = e.length, u6 = n3 & lt ? void 0 : 0;
      try {
        for (; f5 > 0; ) {
          var d8 = this.writeSync(s3, e, a3, f5, u6);
          a3 += d8, f5 -= d8, u6 !== void 0 && (u6 += d8);
        }
      } finally {
        o4 || this.closeSync(s3);
      }
    }, r2.prototype.writeFileSync = function(t3, e, n3) {
      var i4 = Me(n3), o4 = z3(i4.flag), s3 = S4(i4.mode), a3 = dt(e, i4.encoding);
      this.writeFileBase(t3, a3, o4, s3);
    }, r2.prototype.writeFile = function(t3, e, n3, i4) {
      var o4 = n3, s3 = i4;
      typeof n3 == "function" && (o4 = Ze, s3 = n3);
      var a3 = E5(s3), f5 = Me(o4), u6 = z3(f5.flag), d8 = S4(f5.mode), y5 = dt(e, f5.encoding);
      this.wrapAsync(this.writeFileBase, [t3, y5, u6, d8], a3);
    }, r2.prototype.linkBase = function(t3, e) {
      var n3 = v5(t3), i4 = this.getLink(n3);
      if (!i4) throw p6(m6, "link", t3, e);
      var o4 = v5(e), s3 = this.getLinkParent(o4);
      if (!s3) throw p6(m6, "link", t3, e);
      var a3 = o4[o4.length - 1];
      if (s3.getChild(a3)) throw p6(ot, "link", t3, e);
      var f5 = i4.getNode();
      f5.nlink++, s3.createChild(a3, f5);
    }, r2.prototype.copyFileBase = function(t3, e, n3) {
      var i4 = this.readFileSync(t3);
      if (n3 & an && this.existsSync(e)) throw p6(ot, "copyFile", t3, e);
      if (n3 & fn) throw p6(ze, "copyFile", t3, e);
      this.writeFileBase(e, i4, Z3.w, 438);
    }, r2.prototype.copyFileSync = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      return this.copyFileBase(i4, o4, (n3 || 0) | 0);
    }, r2.prototype.copyFile = function(t3, e, n3, i4) {
      var o4 = h6(t3), s3 = h6(e), a3, f5;
      typeof n3 == "function" ? (a3 = 0, f5 = n3) : (a3 = n3, f5 = i4), E5(f5), this.wrapAsync(this.copyFileBase, [o4, s3, a3], f5);
    }, r2.prototype.linkSync = function(t3, e) {
      var n3 = h6(t3), i4 = h6(e);
      this.linkBase(n3, i4);
    }, r2.prototype.link = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      this.wrapAsync(this.linkBase, [i4, o4], n3);
    }, r2.prototype.unlinkBase = function(t3) {
      var e = v5(t3), n3 = this.getLink(e);
      if (!n3) throw p6(m6, "unlink", t3);
      if (n3.length) throw Error("Dir not empty...");
      this.deleteLink(n3);
      var i4 = n3.getNode();
      i4.nlink--, i4.nlink <= 0 && this.deleteNode(i4);
    }, r2.prototype.unlinkSync = function(t3) {
      var e = h6(t3);
      this.unlinkBase(e);
    }, r2.prototype.unlink = function(t3, e) {
      var n3 = h6(t3);
      this.wrapAsync(this.unlinkBase, [n3], e);
    }, r2.prototype.symlinkBase = function(t3, e) {
      var n3 = v5(e), i4 = this.getLinkParent(n3);
      if (!i4) throw p6(m6, "symlink", t3, e);
      var o4 = n3[n3.length - 1];
      if (i4.getChild(o4)) throw p6(ot, "symlink", t3, e);
      var s3 = i4.createChild(o4);
      return s3.getNode().makeSymlink(v5(t3)), s3;
    }, r2.prototype.symlinkSync = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      this.symlinkBase(i4, o4);
    }, r2.prototype.symlink = function(t3, e, n3, i4) {
      var o4 = E5(typeof n3 == "function" ? n3 : i4), s3 = h6(t3), a3 = h6(e);
      this.wrapAsync(this.symlinkBase, [s3, a3], o4);
    }, r2.prototype.realpathBase = function(t3, e) {
      var n3 = v5(t3), i4 = this.getResolvedLink(n3);
      if (!i4) throw p6(m6, "realpath", t3);
      return C3.strToEncoding(i4.getPath(), e);
    }, r2.prototype.realpathSync = function(t3, e) {
      return this.realpathBase(h6(t3), tr(e).encoding);
    }, r2.prototype.realpath = function(t3, e, n3) {
      var i4 = mn(e, n3), o4 = i4[0], s3 = i4[1], a3 = h6(t3);
      this.wrapAsync(this.realpathBase, [a3, o4.encoding], s3);
    }, r2.prototype.lstatBase = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = this.getLink(v5(t3));
      if (!n3) throw p6(m6, "lstat", t3);
      return re.default.build(n3.getNode(), e);
    }, r2.prototype.lstatSync = function(t3, e) {
      return this.lstatBase(h6(t3), yt(e).bigint);
    }, r2.prototype.lstat = function(t3, e, n3) {
      var i4 = ie(e, n3), o4 = i4[0], s3 = i4[1];
      this.wrapAsync(this.lstatBase, [h6(t3), o4.bigint], s3);
    }, r2.prototype.statBase = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = this.getResolvedLink(v5(t3));
      if (!n3) throw p6(m6, "stat", t3);
      return re.default.build(n3.getNode(), e);
    }, r2.prototype.statSync = function(t3, e) {
      return this.statBase(h6(t3), yt(e).bigint);
    }, r2.prototype.stat = function(t3, e, n3) {
      var i4 = ie(e, n3), o4 = i4[0], s3 = i4[1];
      this.wrapAsync(this.statBase, [h6(t3), o4.bigint], s3);
    }, r2.prototype.fstatBase = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = this.getFileByFd(t3);
      if (!n3) throw p6(ae, "fstat");
      return re.default.build(n3.node, e);
    }, r2.prototype.fstatSync = function(t3, e) {
      return this.fstatBase(t3, yt(e).bigint);
    }, r2.prototype.fstat = function(t3, e, n3) {
      var i4 = ie(e, n3), o4 = i4[0], s3 = i4[1];
      this.wrapAsync(this.fstatBase, [t3, o4.bigint], s3);
    }, r2.prototype.renameBase = function(t3, e) {
      var n3 = this.getLink(v5(t3));
      if (!n3) throw p6(m6, "rename", t3, e);
      var i4 = v5(e), o4 = this.getLinkParent(i4);
      if (!o4) throw p6(m6, "rename", t3, e);
      var s3 = n3.parent;
      s3 && s3.deleteChild(n3);
      var a3 = i4[i4.length - 1];
      n3.steps = te(o4.steps, [a3]), o4.setChild(n3.getName(), n3);
    }, r2.prototype.renameSync = function(t3, e) {
      var n3 = h6(t3), i4 = h6(e);
      this.renameBase(n3, i4);
    }, r2.prototype.rename = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      this.wrapAsync(this.renameBase, [i4, o4], n3);
    }, r2.prototype.existsBase = function(t3) {
      return !!this.statBase(t3);
    }, r2.prototype.existsSync = function(t3) {
      try {
        return this.existsBase(h6(t3));
      } catch {
        return false;
      }
    }, r2.prototype.exists = function(t3, e) {
      var n3 = this, i4 = h6(t3);
      if (typeof e != "function") throw Error(K3.CB);
      Nt.default(function() {
        try {
          e(n3.existsBase(i4));
        } catch {
          e(false);
        }
      });
    }, r2.prototype.accessBase = function(t3, e) {
      var n3 = this.getLinkOrThrow(t3, "access");
    }, r2.prototype.accessSync = function(t3, e) {
      e === void 0 && (e = Le);
      var n3 = h6(t3);
      e = e | 0, this.accessBase(n3, e);
    }, r2.prototype.access = function(t3, e, n3) {
      var i4 = Le, o4;
      typeof e != "function" ? (i4 = e | 0, o4 = E5(n3)) : o4 = e;
      var s3 = h6(t3);
      this.wrapAsync(this.accessBase, [s3, i4], o4);
    }, r2.prototype.appendFileSync = function(t3, e, n3) {
      n3 === void 0 && (n3 = Qe);
      var i4 = $e(n3);
      (!i4.flag || G3(t3)) && (i4.flag = "a"), this.writeFileSync(t3, e, i4);
    }, r2.prototype.appendFile = function(t3, e, n3, i4) {
      var o4 = yn(n3, i4), s3 = o4[0], a3 = o4[1];
      (!s3.flag || G3(t3)) && (s3.flag = "a"), this.writeFile(t3, e, s3, a3);
    }, r2.prototype.readdirBase = function(t3, e) {
      var n3 = v5(t3), i4 = this.getResolvedLink(n3);
      if (!i4) throw p6(m6, "readdir", t3);
      var o4 = i4.getNode();
      if (!o4.isDirectory()) throw p6(J3, "scandir", t3);
      if (e.withFileTypes) {
        var s3 = [];
        for (var a3 in i4.children) {
          var f5 = i4.getChild(a3);
          f5 && s3.push(en.default.build(f5, e.encoding));
        }
        return !se && e.encoding !== "buffer" && s3.sort(function(y5, T4) {
          return y5.name < T4.name ? -1 : y5.name > T4.name ? 1 : 0;
        }), s3;
      }
      var u6 = [];
      for (var d8 in i4.children) u6.push(C3.strToEncoding(d8, e.encoding));
      return !se && e.encoding !== "buffer" && u6.sort(), u6;
    }, r2.prototype.readdirSync = function(t3, e) {
      var n3 = er2(e), i4 = h6(t3);
      return this.readdirBase(i4, n3);
    }, r2.prototype.readdir = function(t3, e, n3) {
      var i4 = En(e, n3), o4 = i4[0], s3 = i4[1], a3 = h6(t3);
      this.wrapAsync(this.readdirBase, [a3, o4], s3);
    }, r2.prototype.readlinkBase = function(t3, e) {
      var n3 = this.getLinkOrThrow(t3, "readlink"), i4 = n3.getNode();
      if (!i4.isSymlink()) throw p6(xe, "readlink", t3);
      var o4 = w9 + i4.symlink.join(w9);
      return C3.strToEncoding(o4, e);
    }, r2.prototype.readlinkSync = function(t3, e) {
      var n3 = bt2(e), i4 = h6(t3);
      return this.readlinkBase(i4, n3.encoding);
    }, r2.prototype.readlink = function(t3, e, n3) {
      var i4 = Ae(e, n3), o4 = i4[0], s3 = i4[1], a3 = h6(t3);
      this.wrapAsync(this.readlinkBase, [a3, o4.encoding], s3);
    }, r2.prototype.fsyncBase = function(t3) {
      this.getFileByFdOrThrow(t3, "fsync");
    }, r2.prototype.fsyncSync = function(t3) {
      this.fsyncBase(t3);
    }, r2.prototype.fsync = function(t3, e) {
      this.wrapAsync(this.fsyncBase, [t3], e);
    }, r2.prototype.fdatasyncBase = function(t3) {
      this.getFileByFdOrThrow(t3, "fdatasync");
    }, r2.prototype.fdatasyncSync = function(t3) {
      this.fdatasyncBase(t3);
    }, r2.prototype.fdatasync = function(t3, e) {
      this.wrapAsync(this.fdatasyncBase, [t3], e);
    }, r2.prototype.ftruncateBase = function(t3, e) {
      var n3 = this.getFileByFdOrThrow(t3, "ftruncate");
      n3.truncate(e);
    }, r2.prototype.ftruncateSync = function(t3, e) {
      this.ftruncateBase(t3, e);
    }, r2.prototype.ftruncate = function(t3, e, n3) {
      var i4 = typeof e == "number" ? e : 0, o4 = E5(typeof e == "number" ? n3 : e);
      this.wrapAsync(this.ftruncateBase, [t3, i4], o4);
    }, r2.prototype.truncateBase = function(t3, e) {
      var n3 = this.openSync(t3, "r+");
      try {
        this.ftruncateSync(n3, e);
      } finally {
        this.closeSync(n3);
      }
    }, r2.prototype.truncateSync = function(t3, e) {
      if (G3(t3)) return this.ftruncateSync(t3, e);
      this.truncateBase(t3, e);
    }, r2.prototype.truncate = function(t3, e, n3) {
      var i4 = typeof e == "number" ? e : 0, o4 = E5(typeof e == "number" ? n3 : e);
      if (G3(t3)) return this.ftruncate(t3, i4, o4);
      this.wrapAsync(this.truncateBase, [t3, i4], o4);
    }, r2.prototype.futimesBase = function(t3, e, n3) {
      var i4 = this.getFileByFdOrThrow(t3, "futimes"), o4 = i4.node;
      o4.atime = new Date(e * 1e3), o4.mtime = new Date(n3 * 1e3);
    }, r2.prototype.futimesSync = function(t3, e, n3) {
      this.futimesBase(t3, D3(e), D3(n3));
    }, r2.prototype.futimes = function(t3, e, n3, i4) {
      this.wrapAsync(this.futimesBase, [t3, D3(e), D3(n3)], i4);
    }, r2.prototype.utimesBase = function(t3, e, n3) {
      var i4 = this.openSync(t3, "r+");
      try {
        this.futimesBase(i4, e, n3);
      } finally {
        this.closeSync(i4);
      }
    }, r2.prototype.utimesSync = function(t3, e, n3) {
      this.utimesBase(h6(t3), D3(e), D3(n3));
    }, r2.prototype.utimes = function(t3, e, n3, i4) {
      this.wrapAsync(this.utimesBase, [h6(t3), D3(e), D3(n3)], i4);
    }, r2.prototype.mkdirBase = function(t3, e) {
      var n3 = v5(t3);
      if (!n3.length) throw p6(Tt, "mkdir", t3);
      var i4 = this.getLinkParentAsDirOrThrow(t3, "mkdir"), o4 = n3[n3.length - 1];
      if (i4.getChild(o4)) throw p6(ot, "mkdir", t3);
      i4.createChild(o4, this.createNode(true, e));
    }, r2.prototype.mkdirpBase = function(t3, e) {
      for (var n3 = v5(t3), i4 = this.root, o4 = 0; o4 < n3.length; o4++) {
        var s3 = n3[o4];
        if (!i4.getNode().isDirectory()) throw p6(J3, "mkdir", i4.getPath());
        var a3 = i4.getChild(s3);
        if (a3) if (a3.getNode().isDirectory()) i4 = a3;
        else throw p6(J3, "mkdir", a3.getPath());
        else i4 = i4.createChild(s3, this.createNode(true, e));
      }
    }, r2.prototype.mkdirSync = function(t3, e) {
      var n3 = We(e), i4 = S4(n3.mode, 511), o4 = h6(t3);
      n3.recursive ? this.mkdirpBase(o4, i4) : this.mkdirBase(o4, i4);
    }, r2.prototype.mkdir = function(t3, e, n3) {
      var i4 = We(e), o4 = E5(typeof e == "function" ? e : n3), s3 = S4(i4.mode, 511), a3 = h6(t3);
      i4.recursive ? this.wrapAsync(this.mkdirpBase, [a3, s3], o4) : this.wrapAsync(this.mkdirBase, [a3, s3], o4);
    }, r2.prototype.mkdirpSync = function(t3, e) {
      this.mkdirSync(t3, { mode: e, recursive: true });
    }, r2.prototype.mkdirp = function(t3, e, n3) {
      var i4 = typeof e == "function" ? void 0 : e, o4 = E5(typeof e == "function" ? e : n3);
      this.mkdir(t3, { mode: i4, recursive: true }, o4);
    }, r2.prototype.mkdtempBase = function(t3, e, n3) {
      n3 === void 0 && (n3 = 5);
      var i4 = t3 + this.genRndStr();
      try {
        return this.mkdirBase(i4, 511), C3.strToEncoding(i4, e);
      } catch (o4) {
        if (o4.code === ot) {
          if (n3 > 1) return this.mkdtempBase(t3, e, n3 - 1);
          throw Error("Could not create temp dir.");
        } else throw o4;
      }
    }, r2.prototype.mkdtempSync = function(t3, e) {
      var n3 = bt2(e).encoding;
      if (!t3 || typeof t3 != "string") throw new TypeError("filename prefix is required");
      return fe(t3), this.mkdtempBase(t3, n3);
    }, r2.prototype.mkdtemp = function(t3, e, n3) {
      var i4 = Ae(e, n3), o4 = i4[0].encoding, s3 = i4[1];
      if (!t3 || typeof t3 != "string") throw new TypeError("filename prefix is required");
      fe(t3) && this.wrapAsync(this.mkdtempBase, [t3, o4], s3);
    }, r2.prototype.rmdirBase = function(t3, e) {
      var n3 = Ke(e), i4 = this.getLinkAsDirOrThrow(t3, "rmdir");
      if (i4.length && !n3.recursive) throw p6(Je, "rmdir", t3);
      this.deleteLink(i4);
    }, r2.prototype.rmdirSync = function(t3, e) {
      this.rmdirBase(h6(t3), e);
    }, r2.prototype.rmdir = function(t3, e, n3) {
      var i4 = Ke(e), o4 = E5(typeof e == "function" ? e : n3);
      this.wrapAsync(this.rmdirBase, [h6(t3), i4], o4);
    }, r2.prototype.fchmodBase = function(t3, e) {
      var n3 = this.getFileByFdOrThrow(t3, "fchmod");
      n3.chmod(e);
    }, r2.prototype.fchmodSync = function(t3, e) {
      this.fchmodBase(t3, S4(e));
    }, r2.prototype.fchmod = function(t3, e, n3) {
      this.wrapAsync(this.fchmodBase, [t3, S4(e)], n3);
    }, r2.prototype.chmodBase = function(t3, e) {
      var n3 = this.openSync(t3, "r+");
      try {
        this.fchmodBase(n3, e);
      } finally {
        this.closeSync(n3);
      }
    }, r2.prototype.chmodSync = function(t3, e) {
      var n3 = S4(e), i4 = h6(t3);
      this.chmodBase(i4, n3);
    }, r2.prototype.chmod = function(t3, e, n3) {
      var i4 = S4(e), o4 = h6(t3);
      this.wrapAsync(this.chmodBase, [o4, i4], n3);
    }, r2.prototype.lchmodBase = function(t3, e) {
      var n3 = this.openBase(t3, M6, 0, false);
      try {
        this.fchmodBase(n3, e);
      } finally {
        this.closeSync(n3);
      }
    }, r2.prototype.lchmodSync = function(t3, e) {
      var n3 = S4(e), i4 = h6(t3);
      this.lchmodBase(i4, n3);
    }, r2.prototype.lchmod = function(t3, e, n3) {
      var i4 = S4(e), o4 = h6(t3);
      this.wrapAsync(this.lchmodBase, [o4, i4], n3);
    }, r2.prototype.fchownBase = function(t3, e, n3) {
      this.getFileByFdOrThrow(t3, "fchown").chown(e, n3);
    }, r2.prototype.fchownSync = function(t3, e, n3) {
      nt(e), it(n3), this.fchownBase(t3, e, n3);
    }, r2.prototype.fchown = function(t3, e, n3, i4) {
      nt(e), it(n3), this.wrapAsync(this.fchownBase, [t3, e, n3], i4);
    }, r2.prototype.chownBase = function(t3, e, n3) {
      var i4 = this.getResolvedLinkOrThrow(t3, "chown"), o4 = i4.getNode();
      o4.chown(e, n3);
    }, r2.prototype.chownSync = function(t3, e, n3) {
      nt(e), it(n3), this.chownBase(h6(t3), e, n3);
    }, r2.prototype.chown = function(t3, e, n3, i4) {
      nt(e), it(n3), this.wrapAsync(this.chownBase, [h6(t3), e, n3], i4);
    }, r2.prototype.lchownBase = function(t3, e, n3) {
      this.getLinkOrThrow(t3, "lchown").getNode().chown(e, n3);
    }, r2.prototype.lchownSync = function(t3, e, n3) {
      nt(e), it(n3), this.lchownBase(h6(t3), e, n3);
    }, r2.prototype.lchown = function(t3, e, n3, i4) {
      nt(e), it(n3), this.wrapAsync(this.lchownBase, [h6(t3), e, n3], i4);
    }, r2.prototype.watchFile = function(t3, e, n3) {
      var i4 = h6(t3), o4 = e, s3 = n3;
      if (typeof o4 == "function" && (s3 = e, o4 = null), typeof s3 != "function") throw Error('"watchFile()" requires a listener function');
      var a3 = 5007, f5 = true;
      o4 && typeof o4 == "object" && (typeof o4.interval == "number" && (a3 = o4.interval), typeof o4.persistent == "boolean" && (f5 = o4.persistent));
      var u6 = this.statWatchers[i4];
      return u6 || (u6 = new this.StatWatcher(), u6.start(i4, f5, a3), this.statWatchers[i4] = u6), u6.addListener("change", s3), u6;
    }, r2.prototype.unwatchFile = function(t3, e) {
      var n3 = h6(t3), i4 = this.statWatchers[n3];
      i4 && (typeof e == "function" ? i4.removeListener("change", e) : i4.removeAllListeners("change"), i4.listenerCount("change") === 0 && (i4.stop(), delete this.statWatchers[n3]));
    }, r2.prototype.createReadStream = function(t3, e) {
      return new this.ReadStream(t3, e);
    }, r2.prototype.createWriteStream = function(t3, e) {
      return new this.WriteStream(t3, e);
    }, r2.prototype.watch = function(t3, e, n3) {
      var i4 = h6(t3), o4 = e;
      typeof e == "function" && (n3 = e, o4 = null);
      var s3 = bt2(o4), a3 = s3.persistent, f5 = s3.recursive, u6 = s3.encoding;
      a3 === void 0 && (a3 = true), f5 === void 0 && (f5 = false);
      var d8 = new this.FSWatcher();
      return d8.start(i4, a3, f5, u6), n3 && d8.addListener("change", n3), d8;
    }, r2.fd = 2147483647, r2;
  }();
  _7.Volume = In2;
  function Nn2(r2) {
    r2.emit("stop");
  }
  var ir2 = function(r2) {
    st(t3, r2);
    function t3(e) {
      var n3 = r2.call(this) || this;
      return n3.onInterval = function() {
        try {
          var i4 = n3.vol.statSync(n3.filename);
          n3.hasChanged(i4) && (n3.emit("change", i4, n3.prev), n3.prev = i4);
        } finally {
          n3.loop();
        }
      }, n3.vol = e, n3;
    }
    return t3.prototype.loop = function() {
      this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
    }, t3.prototype.hasChanged = function(e) {
      return e.mtimeMs > this.prev.mtimeMs || e.nlink !== this.prev.nlink;
    }, t3.prototype.start = function(e, n3, i4) {
      n3 === void 0 && (n3 = true), i4 === void 0 && (i4 = 5007), this.filename = h6(e), this.setTimeout = n3 ? setTimeout : rn.default, this.interval = i4, this.prev = this.vol.statSync(this.filename), this.loop();
    }, t3.prototype.stop = function() {
      clearTimeout(this.timeoutRef), H3.default.nextTick(Nn2, this);
    }, t3;
  }(Ye.EventEmitter);
  _7.StatWatcher = ir2;
  var I3;
  function Fn2(r2) {
    I3 = U5.bufferAllocUnsafe(r2), I3.used = 0;
  }
  He.inherits(k4, Pt3.Readable);
  _7.ReadStream = k4;
  function k4(r2, t3, e) {
    if (!(this instanceof k4)) return new k4(r2, t3, e);
    if (this._vol = r2, e = W3({}, ue(e, {})), e.highWaterMark === void 0 && (e.highWaterMark = 64 * 1024), Pt3.Readable.call(this, e), this.path = h6(t3), this.fd = e.fd === void 0 ? null : e.fd, this.flags = e.flags === void 0 ? "r" : e.flags, this.mode = e.mode === void 0 ? 438 : e.mode, this.start = e.start, this.end = e.end, this.autoClose = e.autoClose === void 0 ? true : e.autoClose, this.pos = void 0, this.bytesRead = 0, this.start !== void 0) {
      if (typeof this.start != "number") throw new TypeError('"start" option must be a Number');
      if (this.end === void 0) this.end = 1 / 0;
      else if (typeof this.end != "number") throw new TypeError('"end" option must be a Number');
      if (this.start > this.end) throw new Error('"start" option must be <= "end" option');
      this.pos = this.start;
    }
    typeof this.fd != "number" && this.open(), this.on("end", function() {
      this.autoClose && this.destroy && this.destroy();
    });
  }
  k4.prototype.open = function() {
    var r2 = this;
    this._vol.open(this.path, this.flags, this.mode, function(t3, e) {
      if (t3) {
        r2.autoClose && r2.destroy && r2.destroy(), r2.emit("error", t3);
        return;
      }
      r2.fd = e, r2.emit("open", e), r2.read();
    });
  };
  k4.prototype._read = function(r2) {
    if (typeof this.fd != "number") return this.once("open", function() {
      this._read(r2);
    });
    if (this.destroyed) return;
    (!I3 || I3.length - I3.used < un) && Fn2(this._readableState.highWaterMark);
    var t3 = I3, e = Math.min(I3.length - I3.used, r2), n3 = I3.used;
    if (this.pos !== void 0 && (e = Math.min(this.end - this.pos + 1, e)), e <= 0) return this.push(null);
    var i4 = this;
    this._vol.read(this.fd, I3, I3.used, e, this.pos, o4), this.pos !== void 0 && (this.pos += e), I3.used += e;
    function o4(s3, a3) {
      if (s3) i4.autoClose && i4.destroy && i4.destroy(), i4.emit("error", s3);
      else {
        var f5 = null;
        a3 > 0 && (i4.bytesRead += a3, f5 = t3.slice(n3, n3 + a3)), i4.push(f5);
      }
    }
  };
  k4.prototype._destroy = function(r2, t3) {
    this.close(function(e) {
      t3(r2 || e);
    });
  };
  k4.prototype.close = function(r2) {
    var t3 = this;
    if (r2 && this.once("close", r2), this.closed || typeof this.fd != "number") {
      if (typeof this.fd != "number") {
        this.once("open", Tn2);
        return;
      }
      return H3.default.nextTick(function() {
        return t3.emit("close");
      });
    }
    this.closed = true, this._vol.close(this.fd, function(e) {
      e ? t3.emit("error", e) : t3.emit("close");
    }), this.fd = null;
  };
  function Tn2(r2) {
    this.close();
  }
  He.inherits(N4, Pt3.Writable);
  _7.WriteStream = N4;
  function N4(r2, t3, e) {
    if (!(this instanceof N4)) return new N4(r2, t3, e);
    if (this._vol = r2, e = W3({}, ue(e, {})), Pt3.Writable.call(this, e), this.path = h6(t3), this.fd = e.fd === void 0 ? null : e.fd, this.flags = e.flags === void 0 ? "w" : e.flags, this.mode = e.mode === void 0 ? 438 : e.mode, this.start = e.start, this.autoClose = e.autoClose === void 0 ? true : !!e.autoClose, this.pos = void 0, this.bytesWritten = 0, this.start !== void 0) {
      if (typeof this.start != "number") throw new TypeError('"start" option must be a Number');
      if (this.start < 0) throw new Error('"start" must be >= zero');
      this.pos = this.start;
    }
    e.encoding && this.setDefaultEncoding(e.encoding), typeof this.fd != "number" && this.open(), this.once("finish", function() {
      this.autoClose && this.close();
    });
  }
  N4.prototype.open = function() {
    this._vol.open(this.path, this.flags, this.mode, function(r2, t3) {
      if (r2) {
        this.autoClose && this.destroy && this.destroy(), this.emit("error", r2);
        return;
      }
      this.fd = t3, this.emit("open", t3);
    }.bind(this));
  };
  N4.prototype._write = function(r2, t3, e) {
    if (!(r2 instanceof U5.Buffer)) return this.emit("error", new Error("Invalid data"));
    if (typeof this.fd != "number") return this.once("open", function() {
      this._write(r2, t3, e);
    });
    var n3 = this;
    this._vol.write(this.fd, r2, 0, r2.length, this.pos, function(i4, o4) {
      if (i4) return n3.autoClose && n3.destroy && n3.destroy(), e(i4);
      n3.bytesWritten += o4, e();
    }), this.pos !== void 0 && (this.pos += r2.length);
  };
  N4.prototype._writev = function(r2, t3) {
    if (typeof this.fd != "number") return this.once("open", function() {
      this._writev(r2, t3);
    });
    for (var e = this, n3 = r2.length, i4 = new Array(n3), o4 = 0, s3 = 0; s3 < n3; s3++) {
      var a3 = r2[s3].chunk;
      i4[s3] = a3, o4 += a3.length;
    }
    var f5 = U5.Buffer.concat(i4);
    this._vol.write(this.fd, f5, 0, f5.length, this.pos, function(u6, d8) {
      if (u6) return e.destroy && e.destroy(), t3(u6);
      e.bytesWritten += d8, t3();
    }), this.pos !== void 0 && (this.pos += o4);
  };
  N4.prototype._destroy = k4.prototype._destroy;
  N4.prototype.close = k4.prototype.close;
  N4.prototype.destroySoon = N4.prototype.end;
  var or2 = function(r2) {
    st(t3, r2);
    function t3(e) {
      var n3 = r2.call(this) || this;
      return n3._filename = "", n3._filenameEncoded = "", n3._recursive = false, n3._encoding = C3.ENCODING_UTF8, n3._onNodeChange = function() {
        n3._emit("change");
      }, n3._onParentChild = function(i4) {
        i4.getName() === n3._getName() && n3._emit("rename");
      }, n3._emit = function(i4) {
        n3.emit("change", i4, n3._filenameEncoded);
      }, n3._persist = function() {
        n3._timer = setTimeout(n3._persist, 1e6);
      }, n3._vol = e, n3;
    }
    return t3.prototype._getName = function() {
      return this._steps[this._steps.length - 1];
    }, t3.prototype.start = function(e, n3, i4, o4) {
      n3 === void 0 && (n3 = true), i4 === void 0 && (i4 = false), o4 === void 0 && (o4 = C3.ENCODING_UTF8), this._filename = h6(e), this._steps = v5(this._filename), this._filenameEncoded = C3.strToEncoding(this._filename), this._recursive = i4, this._encoding = o4;
      try {
        this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher");
      } catch (f5) {
        var s3 = new Error("watch " + this._filename + " " + f5.code);
        throw s3.code = f5.code, s3.errno = f5.code, s3;
      }
      this._link.getNode().on("change", this._onNodeChange), this._link.on("child:add", this._onNodeChange), this._link.on("child:delete", this._onNodeChange);
      var a3 = this._link.parent;
      a3 && (a3.setMaxListeners(a3.getMaxListeners() + 1), a3.on("child:delete", this._onParentChild)), n3 && this._persist();
    }, t3.prototype.close = function() {
      clearTimeout(this._timer), this._link.getNode().removeListener("change", this._onNodeChange);
      var e = this._link.parent;
      e && e.removeListener("child:delete", this._onParentChild);
    }, t3;
  }(Ye.EventEmitter);
  _7.FSWatcher = or2;
});
var he = g6((P4, At) => {
  "use strict";
  var Lt2 = P4 && P4.__assign || function() {
    return Lt2 = Object.assign || function(r2) {
      for (var t3, e = 1, n3 = arguments.length; e < n3; e++) {
        t3 = arguments[e];
        for (var i4 in t3) Object.prototype.hasOwnProperty.call(t3, i4) && (r2[i4] = t3[i4]);
      }
      return r2;
    }, Lt2.apply(this, arguments);
  };
  Object.defineProperty(P4, "__esModule", { value: true });
  var bn2 = Et(), kn2 = Xt(), ce2 = sr(), ar2 = R4("fs-monkey/lib/util/lists"), ar2=Object.assign(ar2, ar2.default), Bn2 = ar2.fsSyncMethods, Cn2 = ar2.fsAsyncMethods, mt = Q2(), Pn2 = mt.constants.F_OK, Ln2 = mt.constants.R_OK, An2 = mt.constants.W_OK, Dn2 = mt.constants.X_OK;
  P4.Volume = ce2.Volume;
  P4.vol = new ce2.Volume();
  function fr2(r2) {
    for (var t3 = { F_OK: Pn2, R_OK: Ln2, W_OK: An2, X_OK: Dn2, constants: mt.constants, Stats: bn2.default, Dirent: kn2.default }, e = 0, n3 = Bn2; e < n3.length; e++) {
      var i4 = n3[e];
      typeof r2[i4] == "function" && (t3[i4] = r2[i4].bind(r2));
    }
    for (var o4 = 0, s3 = Cn2; o4 < s3.length; o4++) {
      var i4 = s3[o4];
      typeof r2[i4] == "function" && (t3[i4] = r2[i4].bind(r2));
    }
    return t3.StatWatcher = r2.StatWatcher, t3.FSWatcher = r2.FSWatcher, t3.WriteStream = r2.WriteStream, t3.ReadStream = r2.ReadStream, t3.promises = r2.promises, t3._toUnixTimestamp = ce2.toUnixTimestamp, t3;
  }
  P4.createFsFromVolume = fr2;
  P4.fs = fr2(P4.vol);
  At.exports = Lt2(Lt2({}, At.exports), P4.fs);
  At.exports.semantic = true;
});
var x7 = {};
mr(x7, { Volume: () => Un, __esModule: () => Mn, createFsFromVolume: () => Kn, default: () => Hn, fs: () => Vn, semantic: () => qn, vol: () => Wn });
var cr = ve(he());
j6(x7, ve(he()));
var { __esModule: Mn, Volume: Un, vol: Wn, createFsFromVolume: Kn, fs: Vn, semantic: qn } = cr;
var { default: ur, ...Yn } = cr;
var Hn = ur !== void 0 ? ur : Yn;

// https://esm.sh/v135/memfs@3.0.4/denonext/lib/volume.js
import __Process$6 from "node:process";
import * as __0$2 from "node:path";
import * as __1$2 from "node:stream";
import * as __2$2 from "node:events";
import * as __4$2 from "node:util";
import * as __5$2 from "node:url";
import * as __7$ from "node:process";
import * as __8$2 from "node:buffer";
import * as __9$2 from "node:assert";
import * as __a$ from "node:util";
import * as __b$2 from "node:events";
var __global$4 = globalThis || (typeof window !== "undefined" ? window : self);
var __setImmediate$2 = (cb, ...args) => setTimeout(cb, 0, ...args);
var require6 = (n3) => {
  const e = (m6) => typeof m6.default < "u" ? m6.default : m6, c5 = (m6) => Object.assign({ __esModule: true }, m6);
  switch (n3) {
    case "path":
      return e(__0$2);
    case "stream":
      return e(__1$2);
    case "events":
      return e(__2$2);
    case "fast-extend":
      return e(fast_extend_exports);
    case "util":
      return e(__4$2);
    case "url":
      return e(__5$2);
    case "fs-monkey/lib/correctPath":
      return c5(correctPath_exports);
    case "process":
      return e(__7$);
    case "buffer":
      return e(__8$2);
    case "assert":
      return e(__9$2);
    default:
      throw new Error('module "' + n3 + '" not found');
  }
};
var ir = Object.create;
var Pt = Object.defineProperty;
var or = Object.getOwnPropertyDescriptor;
var sr2 = Object.getOwnPropertyNames;
var ar = Object.getPrototypeOf;
var fr = Object.prototype.hasOwnProperty;
var w7 = ((r2) => typeof require6 < "u" ? require6 : typeof Proxy < "u" ? new Proxy(r2, { get: (t3, e) => (typeof require6 < "u" ? require6 : t3)[e] }) : r2)(function(r2) {
  if (typeof require6 < "u") return require6.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var E4 = (r2, t3) => () => (t3 || r2((t3 = { exports: {} }).exports, t3), t3.exports);
var ur2 = (r2, t3) => {
  for (var e in t3) Pt(r2, e, { get: t3[e], enumerable: true });
};
var Lt = (r2, t3, e, n3) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let i4 of sr2(t3)) !fr.call(r2, i4) && i4 !== e && Pt(r2, i4, { get: () => t3[i4], enumerable: !(n3 = or(t3, i4)) || n3.enumerable });
  return r2;
};
var x8 = (r2, t3, e) => (Lt(r2, t3, "default"), e && Lt(e, t3, "default"));
var ce = (r2, t3, e) => (e = r2 != null ? ir(ar(r2)) : {}, Lt(t3 || !r2 || !r2.__esModule ? Pt(e, "default", { value: r2, enumerable: true }) : e, r2));
var Ut2 = E4((Dt) => {
  "use strict";
  Object.defineProperty(Dt, "__esModule", { value: true });
  var At;
  typeof __setImmediate$2 == "function" ? At = __setImmediate$2.bind(__global$4) : At = setTimeout.bind(__global$4);
  Dt.default = At;
});
var Mt = E4((mt) => {
  "use strict";
  Object.defineProperty(mt, "__esModule", { value: true });
  var cr2 = function() {
    if (typeof __Process$6 < "u") return __Process$6;
    try {
      return w7("process");
    } catch {
      return;
    }
  };
  function he2() {
    var r2 = cr2() || {};
    return r2.getuid || (r2.getuid = function() {
      return 0;
    }), r2.getgid || (r2.getgid = function() {
      return 0;
    }), r2.cwd || (r2.cwd = function() {
      return "/";
    }), r2.nextTick || (r2.nextTick = Ut2().default), r2.emitWarning || (r2.emitWarning = function(t3, e) {
      console.warn("" + e + (e ? ": " : "") + t3);
    }), r2.env || (r2.env = {}), r2;
  }
  mt.createProcess = he2;
  mt.default = he2();
});
var _t = E4((j7) => {
  "use strict";
  var hr = j7 && j7.__spreadArrays || function() {
    for (var r2 = 0, t3 = 0, e = arguments.length; t3 < e; t3++) r2 += arguments[t3].length;
    for (var n3 = Array(r2), i4 = 0, t3 = 0; t3 < e; t3++) for (var o4 = arguments[t3], s3 = 0, a3 = o4.length; s3 < a3; s3++, i4++) n3[i4] = o4[s3];
    return n3;
  };
  Object.defineProperty(j7, "__esModule", { value: true });
  var at = w7("buffer");
  j7.Buffer = at.Buffer;
  function pe(r2) {
    for (var t3 = [], e = 1; e < arguments.length; e++) t3[e - 1] = arguments[e];
    return new (at.Buffer.bind.apply(at.Buffer, hr([void 0, r2], t3)))();
  }
  var pr2 = at.Buffer.allocUnsafe || pe;
  j7.bufferAllocUnsafe = pr2;
  var lr2 = at.Buffer.from || pe;
  j7.bufferFrom = lr2;
});
var ft = E4((Wt2) => {
  "use strict";
  Object.defineProperty(Wt2, "__esModule", { value: true });
  Wt2.constants = { O_RDONLY: 0, O_WRONLY: 1, O_RDWR: 2, S_IFMT: 61440, S_IFREG: 32768, S_IFDIR: 16384, S_IFCHR: 8192, S_IFBLK: 24576, S_IFIFO: 4096, S_IFLNK: 40960, S_IFSOCK: 49152, O_CREAT: 64, O_EXCL: 128, O_NOCTTY: 256, O_TRUNC: 512, O_APPEND: 1024, O_DIRECTORY: 65536, O_NOATIME: 262144, O_NOFOLLOW: 131072, O_SYNC: 1052672, O_DIRECT: 16384, O_NONBLOCK: 2048, S_IRWXU: 448, S_IRUSR: 256, S_IWUSR: 128, S_IXUSR: 64, S_IRWXG: 56, S_IRGRP: 32, S_IWGRP: 16, S_IXGRP: 8, S_IRWXO: 7, S_IROTH: 4, S_IWOTH: 2, S_IXOTH: 1, F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1, UV_FS_SYMLINK_DIR: 1, UV_FS_SYMLINK_JUNCTION: 2, UV_FS_COPYFILE_EXCL: 1, UV_FS_COPYFILE_FICLONE: 2, UV_FS_COPYFILE_FICLONE_FORCE: 4, COPYFILE_EXCL: 1, COPYFILE_FICLONE: 2, COPYFILE_FICLONE_FORCE: 4 };
});
var le = E4((Vt) => {
  typeof BigInt == "function" ? Vt.default = BigInt : Vt.default = function() {
    throw new Error("BigInt is not supported in this environment.");
  };
});
var Kt = E4((gt2) => {
  "use strict";
  Object.defineProperty(gt2, "__esModule", { value: true });
  var V5 = ft(), dr2 = le(), yr2 = V5.constants.S_IFMT, vr2 = V5.constants.S_IFDIR, mr2 = V5.constants.S_IFREG, _r = V5.constants.S_IFBLK, gr = V5.constants.S_IFCHR, Er = V5.constants.S_IFLNK, Rr = V5.constants.S_IFIFO, Sr = V5.constants.S_IFSOCK, de = function() {
    function r2() {
    }
    return r2.build = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = new r2(), i4 = t3.uid, o4 = t3.gid, s3 = t3.atime, a3 = t3.mtime, f5 = t3.ctime, u6 = e ? dr2.default : function(y5) {
        return y5;
      };
      n3.uid = u6(i4), n3.gid = u6(o4), n3.rdev = u6(0), n3.blksize = u6(4096), n3.ino = u6(t3.ino), n3.size = u6(t3.getSize()), n3.blocks = u6(1), n3.atime = s3, n3.mtime = a3, n3.ctime = f5, n3.birthtime = f5, n3.atimeMs = u6(s3.getTime()), n3.mtimeMs = u6(a3.getTime());
      var d8 = u6(f5.getTime());
      return n3.ctimeMs = d8, n3.birthtimeMs = d8, n3.dev = u6(0), n3.mode = u6(t3.mode), n3.nlink = u6(t3.nlink), n3;
    }, r2.prototype._checkModeProperty = function(t3) {
      return (Number(this.mode) & yr2) === t3;
    }, r2.prototype.isDirectory = function() {
      return this._checkModeProperty(vr2);
    }, r2.prototype.isFile = function() {
      return this._checkModeProperty(mr2);
    }, r2.prototype.isBlockDevice = function() {
      return this._checkModeProperty(_r);
    }, r2.prototype.isCharacterDevice = function() {
      return this._checkModeProperty(gr);
    }, r2.prototype.isSymbolicLink = function() {
      return this._checkModeProperty(Er);
    }, r2.prototype.isFIFO = function() {
      return this._checkModeProperty(Rr);
    }, r2.prototype.isSocket = function() {
      return this._checkModeProperty(Sr);
    }, r2;
  }();
  gt2.Stats = de;
  gt2.default = de;
});
var ge = E4((L4) => {
  "use strict";
  var me2 = L4 && L4.__extends || /* @__PURE__ */ function() {
    var r2 = function(t3, e) {
      return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, i4) {
        n3.__proto__ = i4;
      } || function(n3, i4) {
        for (var o4 in i4) i4.hasOwnProperty(o4) && (n3[o4] = i4[o4]);
      }, r2(t3, e);
    };
    return function(t3, e) {
      r2(t3, e);
      function n3() {
        this.constructor = t3;
      }
      t3.prototype = e === null ? Object.create(e) : (n3.prototype = e.prototype, new n3());
    };
  }();
  Object.defineProperty(L4, "__esModule", { value: true });
  var Z3 = Mt(), B5 = _t(), P4 = ft(), _e = w7("events"), wr = Kt(), Et2 = P4.constants.S_IFMT, ye = P4.constants.S_IFDIR, Yt = P4.constants.S_IFREG, xn = P4.constants.S_IFBLK, jn = P4.constants.S_IFCHR, ve2 = P4.constants.S_IFLNK, Xn = P4.constants.S_IFIFO, Jn = P4.constants.S_IFSOCK, Ir = P4.constants.O_APPEND;
  L4.SEP = "/";
  var Or = function(r2) {
    me2(t3, r2);
    function t3(e, n3) {
      n3 === void 0 && (n3 = 438);
      var i4 = r2.call(this) || this;
      return i4.uid = Z3.default.getuid(), i4.gid = Z3.default.getgid(), i4.atime = /* @__PURE__ */ new Date(), i4.mtime = /* @__PURE__ */ new Date(), i4.ctime = /* @__PURE__ */ new Date(), i4.perm = 438, i4.mode = Yt, i4.nlink = 1, i4.perm = n3, i4.mode |= n3, i4.ino = e, i4;
    }
    return t3.prototype.getString = function(e) {
      return e === void 0 && (e = "utf8"), this.getBuffer().toString(e);
    }, t3.prototype.setString = function(e) {
      this.buf = B5.bufferFrom(e, "utf8"), this.touch();
    }, t3.prototype.getBuffer = function() {
      return this.buf || this.setBuffer(B5.bufferAllocUnsafe(0)), B5.bufferFrom(this.buf);
    }, t3.prototype.setBuffer = function(e) {
      this.buf = B5.bufferFrom(e), this.touch();
    }, t3.prototype.getSize = function() {
      return this.buf ? this.buf.length : 0;
    }, t3.prototype.setModeProperty = function(e) {
      this.mode = this.mode & ~Et2 | e;
    }, t3.prototype.setIsFile = function() {
      this.setModeProperty(Yt);
    }, t3.prototype.setIsDirectory = function() {
      this.setModeProperty(ye);
    }, t3.prototype.setIsSymlink = function() {
      this.setModeProperty(ve2);
    }, t3.prototype.isFile = function() {
      return (this.mode & Et2) === Yt;
    }, t3.prototype.isDirectory = function() {
      return (this.mode & Et2) === ye;
    }, t3.prototype.isSymlink = function() {
      return (this.mode & Et2) === ve2;
    }, t3.prototype.makeSymlink = function(e) {
      this.symlink = e, this.setIsSymlink();
    }, t3.prototype.write = function(e, n3, i4, o4) {
      if (n3 === void 0 && (n3 = 0), i4 === void 0 && (i4 = e.length), o4 === void 0 && (o4 = 0), this.buf || (this.buf = B5.bufferAllocUnsafe(0)), o4 + i4 > this.buf.length) {
        var s3 = B5.bufferAllocUnsafe(o4 + i4);
        this.buf.copy(s3, 0, 0, this.buf.length), this.buf = s3;
      }
      return e.copy(this.buf, o4, n3, n3 + i4), this.touch(), i4;
    }, t3.prototype.read = function(e, n3, i4, o4) {
      n3 === void 0 && (n3 = 0), i4 === void 0 && (i4 = e.byteLength), o4 === void 0 && (o4 = 0), this.buf || (this.buf = B5.bufferAllocUnsafe(0));
      var s3 = i4;
      return s3 > e.byteLength && (s3 = e.byteLength), s3 + o4 > this.buf.length && (s3 = this.buf.length - o4), this.buf.copy(e, n3, o4, o4 + s3), s3;
    }, t3.prototype.truncate = function(e) {
      if (e === void 0 && (e = 0), !e) this.buf = B5.bufferAllocUnsafe(0);
      else if (this.buf || (this.buf = B5.bufferAllocUnsafe(0)), e <= this.buf.length) this.buf = this.buf.slice(0, e);
      else {
        var n3 = B5.bufferAllocUnsafe(0);
        this.buf.copy(n3), n3.fill(0, e);
      }
      this.touch();
    }, t3.prototype.chmod = function(e) {
      this.perm = e, this.mode = this.mode & -512 | e, this.touch();
    }, t3.prototype.chown = function(e, n3) {
      this.uid = e, this.gid = n3, this.touch();
    }, t3.prototype.touch = function() {
      this.mtime = /* @__PURE__ */ new Date(), this.emit("change", this);
    }, t3.prototype.canRead = function(e, n3) {
      return e === void 0 && (e = Z3.default.getuid()), n3 === void 0 && (n3 = Z3.default.getgid()), !!(this.perm & 4 || n3 === this.gid && this.perm & 32 || e === this.uid && this.perm & 256);
    }, t3.prototype.canWrite = function(e, n3) {
      return e === void 0 && (e = Z3.default.getuid()), n3 === void 0 && (n3 = Z3.default.getgid()), !!(this.perm & 2 || n3 === this.gid && this.perm & 16 || e === this.uid && this.perm & 128);
    }, t3.prototype.del = function() {
      this.emit("delete", this);
    }, t3.prototype.toJSON = function() {
      return { ino: this.ino, uid: this.uid, gid: this.gid, atime: this.atime.getTime(), mtime: this.mtime.getTime(), ctime: this.ctime.getTime(), perm: this.perm, mode: this.mode, nlink: this.nlink, symlink: this.symlink, data: this.getString() };
    }, t3;
  }(_e.EventEmitter);
  L4.Node = Or;
  var Nr = function(r2) {
    me2(t3, r2);
    function t3(e, n3, i4) {
      var o4 = r2.call(this) || this;
      return o4.children = {}, o4.steps = [], o4.ino = 0, o4.length = 0, o4.vol = e, o4.parent = n3, o4.steps = n3 ? n3.steps.concat([i4]) : [i4], o4;
    }
    return t3.prototype.setNode = function(e) {
      this.node = e, this.ino = e.ino;
    }, t3.prototype.getNode = function() {
      return this.node;
    }, t3.prototype.createChild = function(e, n3) {
      n3 === void 0 && (n3 = this.vol.createNode());
      var i4 = new t3(this.vol, this, e);
      return i4.setNode(n3), n3.isDirectory(), this.setChild(e, i4), i4;
    }, t3.prototype.setChild = function(e, n3) {
      return n3 === void 0 && (n3 = new t3(this.vol, this, e)), this.children[e] = n3, n3.parent = this, this.length++, this.emit("child:add", n3, this), n3;
    }, t3.prototype.deleteChild = function(e) {
      delete this.children[e.getName()], this.length--, this.emit("child:delete", e, this);
    }, t3.prototype.getChild = function(e) {
      if (Object.hasOwnProperty.call(this.children, e)) return this.children[e];
    }, t3.prototype.getPath = function() {
      return this.steps.join(L4.SEP);
    }, t3.prototype.getName = function() {
      return this.steps[this.steps.length - 1];
    }, t3.prototype.walk = function(e, n3, i4) {
      if (n3 === void 0 && (n3 = e.length), i4 === void 0 && (i4 = 0), i4 >= e.length) return this;
      if (i4 >= n3) return this;
      var o4 = e[i4], s3 = this.getChild(o4);
      return s3 ? s3.walk(e, n3, i4 + 1) : null;
    }, t3.prototype.toJSON = function() {
      return { steps: this.steps, ino: this.ino, children: Object.keys(this.children) };
    }, t3;
  }(_e.EventEmitter);
  L4.Link = Nr;
  var Tr = function() {
    function r2(t3, e, n3, i4) {
      this.position = 0, this.link = t3, this.node = e, this.flags = n3, this.fd = i4;
    }
    return r2.prototype.getString = function(t3) {
      return t3 === void 0 && (t3 = "utf8"), this.node.getString();
    }, r2.prototype.setString = function(t3) {
      this.node.setString(t3);
    }, r2.prototype.getBuffer = function() {
      return this.node.getBuffer();
    }, r2.prototype.setBuffer = function(t3) {
      this.node.setBuffer(t3);
    }, r2.prototype.getSize = function() {
      return this.node.getSize();
    }, r2.prototype.truncate = function(t3) {
      this.node.truncate(t3);
    }, r2.prototype.seekTo = function(t3) {
      this.position = t3;
    }, r2.prototype.stats = function() {
      return wr.default.build(this.node);
    }, r2.prototype.write = function(t3, e, n3, i4) {
      e === void 0 && (e = 0), n3 === void 0 && (n3 = t3.length), typeof i4 != "number" && (i4 = this.position), this.flags & Ir && (i4 = this.getSize());
      var o4 = this.node.write(t3, e, n3, i4);
      return this.position = i4 + o4, o4;
    }, r2.prototype.read = function(t3, e, n3, i4) {
      e === void 0 && (e = 0), n3 === void 0 && (n3 = t3.byteLength), typeof i4 != "number" && (i4 = this.position);
      var o4 = this.node.read(t3, e, n3, i4);
      return this.position = i4 + o4, o4;
    }, r2.prototype.chmod = function(t3) {
      this.node.chmod(t3);
    }, r2.prototype.chown = function(t3, e) {
      this.node.chown(t3, e);
    }, r2;
  }();
  L4.File = Tr;
});
var xt = E4((I3) => {
  "use strict";
  var Re = I3 && I3.__extends || /* @__PURE__ */ function() {
    var r2 = function(t3, e) {
      return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, i4) {
        n3.__proto__ = i4;
      } || function(n3, i4) {
        for (var o4 in i4) i4.hasOwnProperty(o4) && (n3[o4] = i4[o4]);
      }, r2(t3, e);
    };
    return function(t3, e) {
      r2(t3, e);
      function n3() {
        this.constructor = t3;
      }
      t3.prototype = e === null ? Object.create(e) : (n3.prototype = e.prototype, new n3());
    };
  }();
  Object.defineProperty(I3, "__esModule", { value: true });
  var K3 = w7("assert"), qt = w7("util"), Ee = typeof Symbol > "u" ? "_kCode" : Symbol("code"), Se = {};
  function Ht2(r2) {
    return function(t3) {
      Re(e, t3);
      function e(n3) {
        for (var i4 = [], o4 = 1; o4 < arguments.length; o4++) i4[o4 - 1] = arguments[o4];
        var s3 = t3.call(this, we(n3, i4)) || this;
        return s3.code = n3, s3[Ee] = n3, s3.name = t3.prototype.name + " [" + s3[Ee] + "]", s3;
      }
      return e;
    }(r2);
  }
  var Fr = function(r2) {
    Re(t3, r2);
    function t3(e) {
      var n3 = this;
      if (typeof e != "object" || e === null) throw new I3.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
      return e.message ? n3 = r2.call(this, e.message) || this : n3 = r2.call(this, qt.inspect(e.actual).slice(0, 128) + " " + (e.operator + " " + qt.inspect(e.expected).slice(0, 128))) || this, n3.generatedMessage = !e.message, n3.name = "AssertionError [ERR_ASSERTION]", n3.code = "ERR_ASSERTION", n3.actual = e.actual, n3.expected = e.expected, n3.operator = e.operator, I3.Error.captureStackTrace(n3, e.stackStartFunction), n3;
    }
    return t3;
  }(__global$4.Error);
  I3.AssertionError = Fr;
  function we(r2, t3) {
    K3.strictEqual(typeof r2, "string");
    var e = Se[r2];
    K3(e, "An invalid error message key was used: " + r2 + ".");
    var n3;
    if (typeof e == "function") n3 = e;
    else {
      if (n3 = qt.format, t3 === void 0 || t3.length === 0) return e;
      t3.unshift(e);
    }
    return String(n3.apply(null, t3));
  }
  I3.message = we;
  function c5(r2, t3) {
    Se[r2] = typeof t3 == "function" ? t3 : String(t3);
  }
  I3.E = c5;
  I3.Error = Ht2(__global$4.Error);
  I3.TypeError = Ht2(__global$4.TypeError);
  I3.RangeError = Ht2(__global$4.RangeError);
  c5("ERR_ARG_NOT_ITERABLE", "%s must be iterable");
  c5("ERR_ASSERTION", "%s");
  c5("ERR_BUFFER_OUT_OF_BOUNDS", Br);
  c5("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received");
  c5("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s");
  c5("ERR_CPU_USAGE", "Unable to obtain cpu usage %s");
  c5("ERR_DNS_SET_SERVERS_FAILED", function(r2, t3) {
    return 'c-ares failed to set servers: "' + r2 + '" [' + t3 + "]";
  });
  c5("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value");
  c5("ERR_ENCODING_NOT_SUPPORTED", function(r2) {
    return 'The "' + r2 + '" encoding is not supported';
  });
  c5("ERR_ENCODING_INVALID_ENCODED_DATA", function(r2) {
    return "The encoded data was not valid for encoding " + r2;
  });
  c5("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client");
  c5("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s");
  c5("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding");
  c5("ERR_INDEX_OUT_OF_RANGE", "Index out of range");
  c5("ERR_INVALID_ARG_TYPE", br);
  c5("ERR_INVALID_ARRAY_LENGTH", function(r2, t3, e) {
    return K3.strictEqual(typeof e, "number"), 'The array "' + r2 + '" (length ' + e + ") must be of length " + t3 + ".";
  });
  c5("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s");
  c5("ERR_INVALID_CALLBACK", "Callback must be a function");
  c5("ERR_INVALID_CHAR", "Invalid character in %s");
  c5("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column");
  c5("ERR_INVALID_FD", '"fd" must be a positive integer: %s');
  c5("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s');
  c5("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
  c5("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent");
  c5("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s");
  c5("ERR_INVALID_OPT_VALUE", function(r2, t3) {
    return 'The value "' + String(t3) + '" is invalid for option "' + r2 + '"';
  });
  c5("ERR_INVALID_OPT_VALUE_ENCODING", function(r2) {
    return 'The value "' + String(r2) + '" is invalid for option "encoding"';
  });
  c5("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL');
  c5("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s");
  c5("ERR_INVALID_THIS", 'Value of "this" must be of type %s');
  c5("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple");
  c5("ERR_INVALID_URL", "Invalid URL: %s");
  c5("ERR_INVALID_URL_SCHEME", function(r2) {
    return "The URL must be " + Rt3(r2, "scheme");
  });
  c5("ERR_IPC_CHANNEL_CLOSED", "Channel closed");
  c5("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected");
  c5("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe");
  c5("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks");
  c5("ERR_MISSING_ARGS", kr);
  c5("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  c5("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function");
  c5("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object");
  c5("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support");
  c5("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported");
  c5("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s");
  c5("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound");
  c5("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536");
  c5("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6");
  c5("ERR_SOCKET_CANNOT_SEND", "Unable to send data");
  c5("ERR_SOCKET_CLOSED", "Socket is closed");
  c5("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running");
  c5("ERR_STDERR_CLOSE", "process.stderr cannot be closed");
  c5("ERR_STDOUT_CLOSE", "process.stdout cannot be closed");
  c5("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode");
  c5("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s");
  c5("ERR_TLS_DH_PARAM_SIZE", function(r2) {
    return "DH parameter size " + r2 + " is less than 2048";
  });
  c5("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout");
  c5("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate");
  c5("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext');
  c5("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected");
  c5("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming");
  c5("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0");
  c5("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s");
  c5("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s");
  c5("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type");
  c5("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type");
  c5("ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl");
  function br(r2, t3, e) {
    K3(r2, "name is required");
    var n3;
    t3.includes("not ") ? (n3 = "must not be", t3 = t3.split("not ")[1]) : n3 = "must be";
    var i4;
    if (Array.isArray(r2)) {
      var o4 = r2.map(function(a3) {
        return '"' + a3 + '"';
      }).join(", ");
      i4 = "The " + o4 + " arguments " + n3 + " " + Rt3(t3, "type");
    } else if (r2.includes(" argument")) i4 = "The " + r2 + " " + n3 + " " + Rt3(t3, "type");
    else {
      var s3 = r2.includes(".") ? "property" : "argument";
      i4 = 'The "' + r2 + '" ' + s3 + " " + n3 + " " + Rt3(t3, "type");
    }
    return arguments.length >= 3 && (i4 += ". Received type " + (e !== null ? typeof e : "null")), i4;
  }
  function kr() {
    for (var r2 = [], t3 = 0; t3 < arguments.length; t3++) r2[t3] = arguments[t3];
    K3(r2.length > 0, "At least one arg needs to be specified");
    var e = "The ", n3 = r2.length;
    switch (r2 = r2.map(function(i4) {
      return '"' + i4 + '"';
    }), n3) {
      case 1:
        e += r2[0] + " argument";
        break;
      case 2:
        e += r2[0] + " and " + r2[1] + " arguments";
        break;
      default:
        e += r2.slice(0, n3 - 1).join(", "), e += ", and " + r2[n3 - 1] + " arguments";
        break;
    }
    return e + " must be specified";
  }
  function Rt3(r2, t3) {
    if (K3(r2, "expected is required"), K3(typeof t3 == "string", "thing is required"), Array.isArray(r2)) {
      var e = r2.length;
      return K3(e > 0, "At least one expected value needs to be specified"), r2 = r2.map(function(n3) {
        return String(n3);
      }), e > 2 ? "one of " + t3 + " " + r2.slice(0, e - 1).join(", ") + ", or " + r2[e - 1] : e === 2 ? "one of " + t3 + " " + r2[0] + " or " + r2[1] : "of " + t3 + " " + r2[0];
    } else return "of " + t3 + " " + String(r2);
  }
  function Br(r2, t3) {
    return t3 ? "Attempt to write outside buffer bounds" : '"' + r2 + '" is outside of buffer bounds';
  }
});
var Xt2 = E4((Q4) => {
  "use strict";
  Object.defineProperty(Q4, "__esModule", { value: true });
  var jt2 = _t(), Cr = xt();
  Q4.ENCODING_UTF8 = "utf8";
  function Lr(r2) {
    if (r2 && !jt2.Buffer.isEncoding(r2)) throw new Cr.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", r2);
  }
  Q4.assertEncoding = Lr;
  function Pr(r2, t3) {
    return !t3 || t3 === Q4.ENCODING_UTF8 ? r2 : t3 === "buffer" ? new jt2.Buffer(r2) : new jt2.Buffer(r2).toString(t3);
  }
  Q4.strToEncoding = Pr;
});
var Oe = E4((St) => {
  "use strict";
  Object.defineProperty(St, "__esModule", { value: true });
  var Y3 = ft(), Ar = Xt2(), Dr = Y3.constants.S_IFMT, Ur = Y3.constants.S_IFDIR, Mr = Y3.constants.S_IFREG, Wr = Y3.constants.S_IFBLK, Vr = Y3.constants.S_IFCHR, Kr = Y3.constants.S_IFLNK, Yr = Y3.constants.S_IFIFO, qr = Y3.constants.S_IFSOCK, Ie = function() {
    function r2() {
      this.name = "", this.mode = 0;
    }
    return r2.build = function(t3, e) {
      var n3 = new r2(), i4 = t3.getNode().mode;
      return n3.name = Ar.strToEncoding(t3.getName(), e), n3.mode = i4, n3;
    }, r2.prototype._checkModeProperty = function(t3) {
      return (this.mode & Dr) === t3;
    }, r2.prototype.isDirectory = function() {
      return this._checkModeProperty(Ur);
    }, r2.prototype.isFile = function() {
      return this._checkModeProperty(Mr);
    }, r2.prototype.isBlockDevice = function() {
      return this._checkModeProperty(Wr);
    }, r2.prototype.isCharacterDevice = function() {
      return this._checkModeProperty(Vr);
    }, r2.prototype.isSymbolicLink = function() {
      return this._checkModeProperty(Kr);
    }, r2.prototype.isFIFO = function() {
      return this._checkModeProperty(Yr);
    }, r2.prototype.isSocket = function() {
      return this._checkModeProperty(qr);
    }, r2;
  }();
  St.Dirent = Ie;
  St.default = Ie;
});
var Ne = E4((Jt) => {
  "use strict";
  Object.defineProperty(Jt, "__esModule", { value: true });
  function Hr(r2, t3, e) {
    var n3 = setTimeout.apply(null, arguments);
    return n3 && typeof n3 == "object" && typeof n3.unref == "function" && n3.unref(), n3;
  }
  Jt.default = Hr;
});
var Te = E4((tt2) => {
  "use strict";
  var xr = tt2 && tt2.__spreadArrays || function() {
    for (var r2 = 0, t3 = 0, e = arguments.length; t3 < e; t3++) r2 += arguments[t3].length;
    for (var n3 = Array(r2), i4 = 0, t3 = 0; t3 < e; t3++) for (var o4 = arguments[t3], s3 = 0, a3 = o4.length; s3 < a3; s3++, i4++) n3[i4] = o4[s3];
    return n3;
  };
  Object.defineProperty(tt2, "__esModule", { value: true });
  function l4(r2, t3, e) {
    return e === void 0 && (e = function(n3) {
      return n3;
    }), function() {
      for (var n3 = [], i4 = 0; i4 < arguments.length; i4++) n3[i4] = arguments[i4];
      return new Promise(function(o4, s3) {
        r2[t3].bind(r2).apply(void 0, xr(n3, [function(a3, f5) {
          return a3 ? s3(a3) : o4(e(f5));
        }]));
      });
    };
  }
  var $3 = function() {
    function r2(t3, e) {
      this.vol = t3, this.fd = e;
    }
    return r2.prototype.appendFile = function(t3, e) {
      return l4(this.vol, "appendFile")(this.fd, t3, e);
    }, r2.prototype.chmod = function(t3) {
      return l4(this.vol, "fchmod")(this.fd, t3);
    }, r2.prototype.chown = function(t3, e) {
      return l4(this.vol, "fchown")(this.fd, t3, e);
    }, r2.prototype.close = function() {
      return l4(this.vol, "close")(this.fd);
    }, r2.prototype.datasync = function() {
      return l4(this.vol, "fdatasync")(this.fd);
    }, r2.prototype.read = function(t3, e, n3, i4) {
      return l4(this.vol, "read", function(o4) {
        return { bytesRead: o4, buffer: t3 };
      })(this.fd, t3, e, n3, i4);
    }, r2.prototype.readFile = function(t3) {
      return l4(this.vol, "readFile")(this.fd, t3);
    }, r2.prototype.stat = function(t3) {
      return l4(this.vol, "fstat")(this.fd, t3);
    }, r2.prototype.sync = function() {
      return l4(this.vol, "fsync")(this.fd);
    }, r2.prototype.truncate = function(t3) {
      return l4(this.vol, "ftruncate")(this.fd, t3);
    }, r2.prototype.utimes = function(t3, e) {
      return l4(this.vol, "futimes")(this.fd, t3, e);
    }, r2.prototype.write = function(t3, e, n3, i4) {
      return l4(this.vol, "write", function(o4) {
        return { bytesWritten: o4, buffer: t3 };
      })(this.fd, t3, e, n3, i4);
    }, r2.prototype.writeFile = function(t3, e) {
      return l4(this.vol, "writeFile")(this.fd, t3, e);
    }, r2;
  }();
  tt2.FileHandle = $3;
  function jr(r2) {
    return typeof Promise > "u" ? null : { FileHandle: $3, access: function(t3, e) {
      return l4(r2, "access")(t3, e);
    }, appendFile: function(t3, e, n3) {
      return l4(r2, "appendFile")(t3 instanceof $3 ? t3.fd : t3, e, n3);
    }, chmod: function(t3, e) {
      return l4(r2, "chmod")(t3, e);
    }, chown: function(t3, e, n3) {
      return l4(r2, "chown")(t3, e, n3);
    }, copyFile: function(t3, e, n3) {
      return l4(r2, "copyFile")(t3, e, n3);
    }, lchmod: function(t3, e) {
      return l4(r2, "lchmod")(t3, e);
    }, lchown: function(t3, e, n3) {
      return l4(r2, "lchown")(t3, e, n3);
    }, link: function(t3, e) {
      return l4(r2, "link")(t3, e);
    }, lstat: function(t3, e) {
      return l4(r2, "lstat")(t3, e);
    }, mkdir: function(t3, e) {
      return l4(r2, "mkdir")(t3, e);
    }, mkdtemp: function(t3, e) {
      return l4(r2, "mkdtemp")(t3, e);
    }, open: function(t3, e, n3) {
      return l4(r2, "open", function(i4) {
        return new $3(r2, i4);
      })(t3, e, n3);
    }, readdir: function(t3, e) {
      return l4(r2, "readdir")(t3, e);
    }, readFile: function(t3, e) {
      return l4(r2, "readFile")(t3 instanceof $3 ? t3.fd : t3, e);
    }, readlink: function(t3, e) {
      return l4(r2, "readlink")(t3, e);
    }, realpath: function(t3, e) {
      return l4(r2, "realpath")(t3, e);
    }, rename: function(t3, e) {
      return l4(r2, "rename")(t3, e);
    }, rmdir: function(t3) {
      return l4(r2, "rmdir")(t3);
    }, stat: function(t3, e) {
      return l4(r2, "stat")(t3, e);
    }, symlink: function(t3, e, n3) {
      return l4(r2, "symlink")(t3, e, n3);
    }, truncate: function(t3, e) {
      return l4(r2, "truncate")(t3, e);
    }, unlink: function(t3) {
      return l4(r2, "unlink")(t3);
    }, utimes: function(t3, e, n3) {
      return l4(r2, "utimes")(t3, e, n3);
    }, writeFile: function(t3, e, n3) {
      return l4(r2, "writeFile")(t3 instanceof $3 ? t3.fd : t3, e, n3);
    } };
  }
  tt2.default = jr;
});
var oe = E4((_7) => {
  "use strict";
  var it = _7 && _7.__extends || /* @__PURE__ */ function() {
    var r2 = function(t3, e) {
      return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, i4) {
        n3.__proto__ = i4;
      } || function(n3, i4) {
        for (var o4 in i4) i4.hasOwnProperty(o4) && (n3[o4] = i4[o4]);
      }, r2(t3, e);
    };
    return function(t3, e) {
      r2(t3, e);
      function n3() {
        this.constructor = t3;
      }
      t3.prototype = e === null ? Object.create(e) : (n3.prototype = e.prototype, new n3());
    };
  }(), zt = _7 && _7.__spreadArrays || function() {
    for (var r2 = 0, t3 = 0, e = arguments.length; t3 < e; t3++) r2 += arguments[t3].length;
    for (var n3 = Array(r2), i4 = 0, t3 = 0; t3 < e; t3++) for (var o4 = arguments[t3], s3 = 0, a3 = o4.length; s3 < a3; s3++, i4++) n3[i4] = o4[s3];
    return n3;
  };
  Object.defineProperty(_7, "__esModule", { value: true });
  var ct = w7("path"), Gt2 = ge(), Zt2 = Kt(), Xr = Oe(), U5 = _t(), wt = Ut2(), q6 = Mt(), Jr = Ne(), kt = w7("stream"), T4 = ft(), Me = w7("events"), C3 = Xt2(), te = xt(), M6 = w7("fast-extend").extend, We = w7("util"), zr = Te(), Gr = ct.resolve, Tt = T4.constants.O_RDONLY, ot = T4.constants.O_WRONLY, D3 = T4.constants.O_RDWR, b6 = T4.constants.O_CREAT, It = T4.constants.O_EXCL, ht = T4.constants.O_TRUNC, pt = T4.constants.O_APPEND, Fe = T4.constants.O_SYNC, Zr = T4.constants.O_DIRECTORY, be = T4.constants.F_OK, Qr = T4.constants.COPYFILE_EXCL, $r = T4.constants.COPYFILE_FICLONE_FORCE, S4, Ft2;
  ct.posix ? (Qt = ct.posix, S4 = Qt.sep, Ft2 = Qt.relative) : (S4 = ct.sep, Ft2 = ct.relative);
  var Qt, ee = q6.default.platform === "win32", tn = 128, W3 = { PATH_STR: "path must be a string or Buffer", FD: "fd must be a file descriptor", MODE_INT: "mode must be an int", CB: "callback must be a function", UID: "uid must be an unsigned int", GID: "gid must be an unsigned int", LEN: "len must be an integer", ATIME: "atime must be an integer", MTIME: "mtime must be an integer", PREFIX: "filename prefix is required", BUFFER: "buffer must be an instance of Buffer or StaticBuffer", OFFSET: "offset must be an integer", LENGTH: "length must be an integer", POSITION: "position must be an integer" }, en = function(r2) {
    return "Expected options to be either an object or a string, but got " + r2 + " instead";
  }, m6 = "ENOENT", re = "EBADF", Ve = "EINVAL", rn = "EPERM", nn = "EPROTO", nt = "EEXIST", X3 = "ENOTDIR", Ke = "EMFILE", Ye = "EACCES", Ot2 = "EISDIR", qe = "ENOTEMPTY", He = "ENOSYS";
  function on(r2, t3, e, n3) {
    t3 === void 0 && (t3 = ""), e === void 0 && (e = ""), n3 === void 0 && (n3 = "");
    var i4 = "";
    switch (e && (i4 = " '" + e + "'"), n3 && (i4 += " -> '" + n3 + "'"), r2) {
      case m6:
        return "ENOENT: no such file or directory, " + t3 + i4;
      case re:
        return "EBADF: bad file descriptor, " + t3 + i4;
      case Ve:
        return "EINVAL: invalid argument, " + t3 + i4;
      case rn:
        return "EPERM: operation not permitted, " + t3 + i4;
      case nn:
        return "EPROTO: protocol error, " + t3 + i4;
      case nt:
        return "EEXIST: file already exists, " + t3 + i4;
      case X3:
        return "ENOTDIR: not a directory, " + t3 + i4;
      case Ot2:
        return "EISDIR: illegal operation on a directory, " + t3 + i4;
      case Ye:
        return "EACCES: permission denied, " + t3 + i4;
      case qe:
        return "ENOTEMPTY: directory not empty, " + t3 + i4;
      case Ke:
        return "EMFILE: too many open files, " + t3 + i4;
      case He:
        return "ENOSYS: function not implemented, " + t3 + i4;
      default:
        return r2 + ": error occurred, " + t3 + i4;
    }
  }
  function p6(r2, t3, e, n3, i4) {
    t3 === void 0 && (t3 = ""), e === void 0 && (e = ""), n3 === void 0 && (n3 = ""), i4 === void 0 && (i4 = Error);
    var o4 = new i4(on(r2, t3, e, n3));
    return o4.code = r2, o4;
  }
  var G3;
  (function(r2) {
    r2[r2.r = Tt] = "r", r2[r2["r+"] = D3] = "r+", r2[r2.rs = Tt | Fe] = "rs", r2[r2.sr = r2.rs] = "sr", r2[r2["rs+"] = D3 | Fe] = "rs+", r2[r2["sr+"] = r2["rs+"]] = "sr+", r2[r2.w = ot | b6 | ht] = "w", r2[r2.wx = ot | b6 | ht | It] = "wx", r2[r2.xw = r2.wx] = "xw", r2[r2["w+"] = D3 | b6 | ht] = "w+", r2[r2["wx+"] = D3 | b6 | ht | It] = "wx+", r2[r2["xw+"] = r2["wx+"]] = "xw+", r2[r2.a = ot | pt | b6] = "a", r2[r2.ax = ot | pt | b6 | It] = "ax", r2[r2.xa = r2.ax] = "xa", r2[r2["a+"] = D3 | pt | b6] = "a+", r2[r2["ax+"] = D3 | pt | b6 | It] = "ax+", r2[r2["xa+"] = r2["ax+"]] = "xa+";
  })(G3 = _7.FLAGS || (_7.FLAGS = {}));
  function J3(r2) {
    if (typeof r2 == "number") return r2;
    if (typeof r2 == "string") {
      var t3 = G3[r2];
      if (typeof t3 < "u") return t3;
    }
    throw new te.TypeError("ERR_INVALID_OPT_VALUE", "flags", r2);
  }
  _7.flagsToNumber = J3;
  function ie(r2, t3) {
    var e;
    if (t3) {
      var n3 = typeof t3;
      switch (n3) {
        case "string":
          e = M6({}, r2, { encoding: t3 });
          break;
        case "object":
          e = M6({}, r2, t3);
          break;
        default:
          throw TypeError(en(n3));
      }
    } else return r2;
    return e.encoding !== "buffer" && C3.assertEncoding(e.encoding), e;
  }
  function st(r2) {
    return function(t3) {
      return ie(r2, t3);
    };
  }
  function g7(r2) {
    if (typeof r2 != "function") throw TypeError(W3.CB);
    return r2;
  }
  function yt(r2) {
    return function(t3, e) {
      return typeof t3 == "function" ? [r2(), t3] : [r2(t3), g7(e)];
    };
  }
  var xe = { encoding: "utf8" }, Nt = st(xe), ke2 = yt(Nt), sn = { flag: "r" }, Be2 = st(sn), je = { encoding: "utf8", mode: 438, flag: G3[G3.w] }, Ce2 = st(je), Xe = { encoding: "utf8", mode: 438, flag: G3[G3.a] }, Je = st(Xe), an = yt(Je), fn = xe, ze = st(fn), un = yt(ze), Le = { mode: 511, recursive: false }, Pe = function(r2) {
    return typeof r2 == "number" ? M6({}, Le, { mode: r2 }) : M6({}, Le, r2);
  }, cn = { recursive: false }, Ae = function(r2) {
    return M6({}, cn, r2);
  }, hn = { encoding: "utf8", withFileTypes: false }, Ge = st(hn), pn = yt(Ge), ln = { bigint: false }, dt = function(r2) {
    return r2 === void 0 && (r2 = {}), M6({}, ln, r2);
  }, $t = function(r2, t3) {
    return typeof r2 == "function" ? [dt(), r2] : [dt(r2), g7(t3)];
  };
  function dn(r2) {
    if (r2.hostname !== "") throw new te.TypeError("ERR_INVALID_FILE_URL_HOST", q6.default.platform);
    for (var t3 = r2.pathname, e = 0; e < t3.length; e++) if (t3[e] === "%") {
      var n3 = t3.codePointAt(e + 2) | 32;
      if (t3[e + 1] === "2" && n3 === 102) throw new te.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
    }
    return decodeURIComponent(t3);
  }
  function h6(r2) {
    if (typeof r2 != "string" && !U5.Buffer.isBuffer(r2)) {
      try {
        if (!(r2 instanceof w7("url").URL)) throw new TypeError(W3.PATH_STR);
      } catch {
        throw new TypeError(W3.PATH_STR);
      }
      r2 = dn(r2);
    }
    var t3 = String(r2);
    return ne(t3), t3;
  }
  _7.pathToFilename = h6;
  var bt2 = function(r2, t3) {
    return t3 === void 0 && (t3 = q6.default.cwd()), Gr(t3, r2);
  };
  ee && (De = bt2, Ue = w7("fs-monkey/lib/correctPath").unixify, bt2 = function(r2, t3) {
    return Ue(De(r2, t3));
  });
  var De, Ue;
  function v5(r2, t3) {
    var e = bt2(r2, t3), n3 = e.substr(1);
    return n3 ? n3.split(S4) : [];
  }
  _7.filenameToSteps = v5;
  function Ze(r2) {
    return v5(h6(r2));
  }
  _7.pathToSteps = Ze;
  function yn(r2, t3) {
    return t3 === void 0 && (t3 = C3.ENCODING_UTF8), U5.Buffer.isBuffer(r2) ? r2.toString(t3) : r2 instanceof Uint8Array ? U5.bufferFrom(r2).toString(t3) : String(r2);
  }
  _7.dataToStr = yn;
  function lt(r2, t3) {
    return t3 === void 0 && (t3 = C3.ENCODING_UTF8), U5.Buffer.isBuffer(r2) ? r2 : r2 instanceof Uint8Array ? U5.bufferFrom(r2) : U5.bufferFrom(String(r2), t3);
  }
  _7.dataToBuffer = lt;
  function Qe(r2, t3) {
    return !t3 || t3 === "buffer" ? r2 : r2.toString(t3);
  }
  _7.bufferToEncoding = Qe;
  function ne(r2, t3) {
    if (("" + r2).indexOf("\0") !== -1) {
      var e = new Error("Path must be a string without null bytes");
      if (e.code = m6, typeof t3 != "function") throw e;
      return q6.default.nextTick(t3, e), false;
    }
    return true;
  }
  function vn(r2, t3) {
    if (typeof r2 == "number") return r2;
    if (typeof r2 == "string") return parseInt(r2, 8);
    if (t3) return R5(t3);
  }
  function R5(r2, t3) {
    var e = vn(r2, t3);
    if (typeof e != "number" || isNaN(e)) throw new TypeError(W3.MODE_INT);
    return e;
  }
  function z3(r2) {
    return r2 >>> 0 === r2;
  }
  function ut(r2) {
    if (!z3(r2)) throw TypeError(W3.FD);
  }
  function A4(r2) {
    if (typeof r2 == "string" && +r2 == r2) return +r2;
    if (r2 instanceof Date) return r2.getTime() / 1e3;
    if (isFinite(r2)) return r2 < 0 ? Date.now() / 1e3 : r2;
    throw new Error("Cannot parse time: " + r2);
  }
  _7.toUnixTimestamp = A4;
  function et2(r2) {
    if (typeof r2 != "number") throw TypeError(W3.UID);
  }
  function rt(r2) {
    if (typeof r2 != "number") throw TypeError(W3.GID);
  }
  var mn = function() {
    function r2(t3) {
      t3 === void 0 && (t3 = {}), this.ino = 0, this.inodes = {}, this.releasedInos = [], this.fds = {}, this.releasedFds = [], this.maxFiles = 1e4, this.openFiles = 0, this.promisesApi = zr.default(this), this.statWatchers = {}, this.props = M6({ Node: Gt2.Node, Link: Gt2.Link, File: Gt2.File }, t3);
      var e = this.createLink();
      e.setNode(this.createNode(true));
      var n3 = this;
      this.StatWatcher = function(s3) {
        it(a3, s3);
        function a3() {
          return s3.call(this, n3) || this;
        }
        return a3;
      }($e);
      var i4 = k4;
      this.ReadStream = function(s3) {
        it(a3, s3);
        function a3() {
          for (var f5 = [], u6 = 0; u6 < arguments.length; u6++) f5[u6] = arguments[u6];
          return s3.apply(this, zt([n3], f5)) || this;
        }
        return a3;
      }(i4);
      var o4 = N4;
      this.WriteStream = function(s3) {
        it(a3, s3);
        function a3() {
          for (var f5 = [], u6 = 0; u6 < arguments.length; u6++) f5[u6] = arguments[u6];
          return s3.apply(this, zt([n3], f5)) || this;
        }
        return a3;
      }(o4), this.FSWatcher = function(s3) {
        it(a3, s3);
        function a3() {
          return s3.call(this, n3) || this;
        }
        return a3;
      }(tr), this.root = e;
    }
    return r2.fromJSON = function(t3, e) {
      var n3 = new r2();
      return n3.fromJSON(t3, e), n3;
    }, Object.defineProperty(r2.prototype, "promises", { get: function() {
      if (this.promisesApi === null) throw new Error("Promise is not supported in this environment.");
      return this.promisesApi;
    }, enumerable: true, configurable: true }), r2.prototype.createLink = function(t3, e, n3, i4) {
      if (n3 === void 0 && (n3 = false), !t3) return new this.props.Link(this, null, "");
      if (!e) throw new Error("createLink: name cannot be empty");
      return t3.createChild(e, this.createNode(n3, i4));
    }, r2.prototype.deleteLink = function(t3) {
      var e = t3.parent;
      return e ? (e.deleteChild(t3), true) : false;
    }, r2.prototype.newInoNumber = function() {
      var t3 = this.releasedInos.pop();
      return t3 || (this.ino = (this.ino + 1) % 4294967295, this.ino);
    }, r2.prototype.newFdNumber = function() {
      var t3 = this.releasedFds.pop();
      return typeof t3 == "number" ? t3 : r2.fd--;
    }, r2.prototype.createNode = function(t3, e) {
      t3 === void 0 && (t3 = false);
      var n3 = new this.props.Node(this.newInoNumber(), e);
      return t3 && n3.setIsDirectory(), this.inodes[n3.ino] = n3, n3;
    }, r2.prototype.getNode = function(t3) {
      return this.inodes[t3];
    }, r2.prototype.deleteNode = function(t3) {
      t3.del(), delete this.inodes[t3.ino], this.releasedInos.push(t3.ino);
    }, r2.prototype.genRndStr = function() {
      var t3 = (Math.random() + 1).toString(36).substr(2, 6);
      return t3.length === 6 ? t3 : this.genRndStr();
    }, r2.prototype.getLink = function(t3) {
      return this.root.walk(t3);
    }, r2.prototype.getLinkOrThrow = function(t3, e) {
      var n3 = v5(t3), i4 = this.getLink(n3);
      if (!i4) throw p6(m6, e, t3);
      return i4;
    }, r2.prototype.getResolvedLink = function(t3) {
      for (var e = typeof t3 == "string" ? v5(t3) : t3, n3 = this.root, i4 = 0; i4 < e.length; ) {
        var o4 = e[i4];
        if (n3 = n3.getChild(o4), !n3) return null;
        var s3 = n3.getNode();
        if (s3.isSymlink()) {
          e = s3.symlink.concat(e.slice(i4 + 1)), n3 = this.root, i4 = 0;
          continue;
        }
        i4++;
      }
      return n3;
    }, r2.prototype.getResolvedLinkOrThrow = function(t3, e) {
      var n3 = this.getResolvedLink(t3);
      if (!n3) throw p6(m6, e, t3);
      return n3;
    }, r2.prototype.resolveSymlinks = function(t3) {
      return this.getResolvedLink(t3.steps.slice(1));
    }, r2.prototype.getLinkAsDirOrThrow = function(t3, e) {
      var n3 = this.getLinkOrThrow(t3, e);
      if (!n3.getNode().isDirectory()) throw p6(X3, e, t3);
      return n3;
    }, r2.prototype.getLinkParent = function(t3) {
      return this.root.walk(t3, t3.length - 1);
    }, r2.prototype.getLinkParentAsDirOrThrow = function(t3, e) {
      var n3 = t3 instanceof Array ? t3 : v5(t3), i4 = this.getLinkParent(n3);
      if (!i4) throw p6(m6, e, S4 + n3.join(S4));
      if (!i4.getNode().isDirectory()) throw p6(X3, e, S4 + n3.join(S4));
      return i4;
    }, r2.prototype.getFileByFd = function(t3) {
      return this.fds[String(t3)];
    }, r2.prototype.getFileByFdOrThrow = function(t3, e) {
      if (!z3(t3)) throw TypeError(W3.FD);
      var n3 = this.getFileByFd(t3);
      if (!n3) throw p6(re, e);
      return n3;
    }, r2.prototype.getNodeByIdOrCreate = function(t3, e, n3) {
      if (typeof t3 == "number") {
        var i4 = this.getFileByFd(t3);
        if (!i4) throw Error("File nto found");
        return i4.node;
      } else {
        var o4 = Ze(t3), s3 = this.getLink(o4);
        if (s3) return s3.getNode();
        if (e & b6) {
          var a3 = this.getLinkParent(o4);
          if (a3) {
            var f5 = o4[o4.length - 1];
            return s3 = this.createLink(a3, f5, false, n3), s3.getNode();
          }
        }
        throw p6(m6, "getNodeByIdOrCreate", h6(t3));
      }
    }, r2.prototype.wrapAsync = function(t3, e, n3) {
      var i4 = this;
      g7(n3), wt.default(function() {
        try {
          n3(null, t3.apply(i4, e));
        } catch (o4) {
          n3(o4);
        }
      });
    }, r2.prototype._toJSON = function(t3, e, n3) {
      var i4;
      t3 === void 0 && (t3 = this.root), e === void 0 && (e = {});
      var o4 = true, s3 = t3.children;
      t3.getNode().isFile() && (s3 = (i4 = {}, i4[t3.getName()] = t3.parent.getChild(t3.getName()), i4), t3 = t3.parent);
      for (var a3 in s3) {
        o4 = false;
        var f5 = t3.getChild(a3);
        if (!f5) throw new Error("_toJSON: unexpected undefined");
        var u6 = f5.getNode();
        if (u6.isFile()) {
          var d8 = f5.getPath();
          n3 && (d8 = Ft2(n3, d8)), e[d8] = u6.getString();
        } else u6.isDirectory() && this._toJSON(f5, e, n3);
      }
      var y5 = t3.getPath();
      return n3 && (y5 = Ft2(n3, y5)), y5 && o4 && (e[y5] = null), e;
    }, r2.prototype.toJSON = function(t3, e, n3) {
      e === void 0 && (e = {}), n3 === void 0 && (n3 = false);
      var i4 = [];
      if (t3) {
        t3 instanceof Array || (t3 = [t3]);
        for (var o4 = 0, s3 = t3; o4 < s3.length; o4++) {
          var a3 = s3[o4], f5 = h6(a3), u6 = this.getResolvedLink(f5);
          u6 && i4.push(u6);
        }
      } else i4.push(this.root);
      if (!i4.length) return e;
      for (var d8 = 0, y5 = i4; d8 < y5.length; d8++) {
        var u6 = y5[d8];
        this._toJSON(u6, e, n3 ? u6.getPath() : "");
      }
      return e;
    }, r2.prototype.fromJSON = function(t3, e) {
      e === void 0 && (e = q6.default.cwd());
      for (var n3 in t3) {
        var i4 = t3[n3];
        if (typeof i4 == "string") {
          n3 = bt2(n3, e);
          var o4 = v5(n3);
          if (o4.length > 1) {
            var s3 = S4 + o4.slice(0, o4.length - 1).join(S4);
            this.mkdirpBase(s3, 511);
          }
          this.writeFileSync(n3, i4);
        } else this.mkdirpBase(n3, 511);
      }
    }, r2.prototype.reset = function() {
      this.ino = 0, this.inodes = {}, this.releasedInos = [], this.fds = {}, this.releasedFds = [], this.openFiles = 0, this.root = this.createLink(), this.root.setNode(this.createNode(true));
    }, r2.prototype.mountSync = function(t3, e) {
      this.fromJSON(e, t3);
    }, r2.prototype.openLink = function(t3, e, n3) {
      if (n3 === void 0 && (n3 = true), this.openFiles >= this.maxFiles) throw p6(Ke, "open", t3.getPath());
      var i4 = t3;
      if (n3 && (i4 = this.resolveSymlinks(t3)), !i4) throw p6(m6, "open", t3.getPath());
      var o4 = i4.getNode();
      if (o4.isDirectory()) {
        if ((e & (Tt | D3 | ot)) !== Tt) throw p6(Ot2, "open", t3.getPath());
      } else if (e & Zr) throw p6(X3, "open", t3.getPath());
      if (!(e & ot) && !o4.canRead()) throw p6(Ye, "open", t3.getPath());
      e & D3;
      var s3 = new this.props.File(t3, o4, e, this.newFdNumber());
      return this.fds[s3.fd] = s3, this.openFiles++, e & ht && s3.truncate(), s3;
    }, r2.prototype.openFile = function(t3, e, n3, i4) {
      i4 === void 0 && (i4 = true);
      var o4 = v5(t3), s3 = i4 ? this.getResolvedLink(o4) : this.getLink(o4);
      if (!s3 && e & b6) {
        var a3 = this.getResolvedLink(o4.slice(0, o4.length - 1));
        if (!a3) throw p6(m6, "open", S4 + o4.join(S4));
        e & b6 && typeof n3 == "number" && (s3 = this.createLink(a3, o4[o4.length - 1], false, n3));
      }
      if (s3) return this.openLink(s3, e, i4);
      throw p6(m6, "open", t3);
    }, r2.prototype.openBase = function(t3, e, n3, i4) {
      i4 === void 0 && (i4 = true);
      var o4 = this.openFile(t3, e, n3, i4);
      if (!o4) throw p6(m6, "open", t3);
      return o4.fd;
    }, r2.prototype.openSync = function(t3, e, n3) {
      n3 === void 0 && (n3 = 438);
      var i4 = R5(n3), o4 = h6(t3), s3 = J3(e);
      return this.openBase(o4, s3, i4);
    }, r2.prototype.open = function(t3, e, n3, i4) {
      var o4 = n3, s3 = i4;
      typeof n3 == "function" && (o4 = 438, s3 = n3), o4 = o4 || 438;
      var a3 = R5(o4), f5 = h6(t3), u6 = J3(e);
      this.wrapAsync(this.openBase, [f5, u6, a3], s3);
    }, r2.prototype.closeFile = function(t3) {
      this.fds[t3.fd] && (this.openFiles--, delete this.fds[t3.fd], this.releasedFds.push(t3.fd));
    }, r2.prototype.closeSync = function(t3) {
      ut(t3);
      var e = this.getFileByFdOrThrow(t3, "close");
      this.closeFile(e);
    }, r2.prototype.close = function(t3, e) {
      ut(t3), this.wrapAsync(this.closeSync, [t3], e);
    }, r2.prototype.openFileOrGetById = function(t3, e, n3) {
      if (typeof t3 == "number") {
        var i4 = this.fds[t3];
        if (!i4) throw p6(m6);
        return i4;
      } else return this.openFile(h6(t3), e, n3);
    }, r2.prototype.readBase = function(t3, e, n3, i4, o4) {
      var s3 = this.getFileByFdOrThrow(t3);
      return s3.read(e, Number(n3), Number(i4), o4);
    }, r2.prototype.readSync = function(t3, e, n3, i4, o4) {
      return ut(t3), this.readBase(t3, e, n3, i4, o4);
    }, r2.prototype.read = function(t3, e, n3, i4, o4, s3) {
      var a3 = this;
      if (g7(s3), i4 === 0) return q6.default.nextTick(function() {
        s3 && s3(null, 0, e);
      });
      wt.default(function() {
        try {
          var f5 = a3.readBase(t3, e, n3, i4, o4);
          s3(null, f5, e);
        } catch (u6) {
          s3(u6);
        }
      });
    }, r2.prototype.readFileBase = function(t3, e, n3) {
      var i4, o4 = typeof t3 == "number", s3 = o4 && z3(t3), a3;
      if (s3) a3 = t3;
      else {
        var f5 = h6(t3), u6 = v5(f5), d8 = this.getResolvedLink(u6);
        if (d8) {
          var y5 = d8.getNode();
          if (y5.isDirectory()) throw p6(Ot2, "open", d8.getPath());
        }
        a3 = this.openSync(t3, e);
      }
      try {
        i4 = Qe(this.getFileByFdOrThrow(a3).getBuffer(), n3);
      } finally {
        s3 || this.closeSync(a3);
      }
      return i4;
    }, r2.prototype.readFileSync = function(t3, e) {
      var n3 = Be2(e), i4 = J3(n3.flag);
      return this.readFileBase(t3, i4, n3.encoding);
    }, r2.prototype.readFile = function(t3, e, n3) {
      var i4 = yt(Be2)(e, n3), o4 = i4[0], s3 = i4[1], a3 = J3(o4.flag);
      this.wrapAsync(this.readFileBase, [t3, a3, o4.encoding], s3);
    }, r2.prototype.writeBase = function(t3, e, n3, i4, o4) {
      var s3 = this.getFileByFdOrThrow(t3, "write");
      return s3.write(e, n3, i4, o4);
    }, r2.prototype.writeSync = function(t3, e, n3, i4, o4) {
      ut(t3);
      var s3, a3, f5, u6, d8 = typeof e != "string";
      d8 ? (a3 = (n3 || 0) | 0, f5 = i4, u6 = o4) : (u6 = n3, s3 = i4);
      var y5 = lt(e, s3);
      return d8 ? typeof f5 > "u" && (f5 = y5.length) : (a3 = 0, f5 = y5.length), this.writeBase(t3, y5, a3, f5, u6);
    }, r2.prototype.write = function(t3, e, n3, i4, o4, s3) {
      var a3 = this;
      ut(t3);
      var f5, u6, d8, y5, F4, Bt = typeof e, se = typeof n3, ae = typeof i4, fe = typeof o4;
      Bt !== "string" ? se === "function" ? F4 = n3 : ae === "function" ? (f5 = n3 | 0, F4 = i4) : fe === "function" ? (f5 = n3 | 0, u6 = i4, F4 = o4) : (f5 = n3 | 0, u6 = i4, d8 = o4, F4 = s3) : se === "function" ? F4 = n3 : ae === "function" ? (d8 = n3, F4 = i4) : fe === "function" && (d8 = n3, y5 = i4, F4 = o4);
      var vt2 = lt(e, y5);
      Bt !== "string" ? typeof u6 > "u" && (u6 = vt2.length) : (f5 = 0, u6 = vt2.length);
      var Ct = g7(F4);
      wt.default(function() {
        try {
          var ue = a3.writeBase(t3, vt2, f5, u6, d8);
          Bt !== "string" ? Ct(null, ue, vt2) : Ct(null, ue, e);
        } catch (nr) {
          Ct(nr);
        }
      });
    }, r2.prototype.writeFileBase = function(t3, e, n3, i4) {
      var o4 = typeof t3 == "number", s3;
      o4 ? s3 = t3 : s3 = this.openBase(h6(t3), n3, i4);
      var a3 = 0, f5 = e.length, u6 = n3 & pt ? void 0 : 0;
      try {
        for (; f5 > 0; ) {
          var d8 = this.writeSync(s3, e, a3, f5, u6);
          a3 += d8, f5 -= d8, u6 !== void 0 && (u6 += d8);
        }
      } finally {
        o4 || this.closeSync(s3);
      }
    }, r2.prototype.writeFileSync = function(t3, e, n3) {
      var i4 = Ce2(n3), o4 = J3(i4.flag), s3 = R5(i4.mode), a3 = lt(e, i4.encoding);
      this.writeFileBase(t3, a3, o4, s3);
    }, r2.prototype.writeFile = function(t3, e, n3, i4) {
      var o4 = n3, s3 = i4;
      typeof n3 == "function" && (o4 = je, s3 = n3);
      var a3 = g7(s3), f5 = Ce2(o4), u6 = J3(f5.flag), d8 = R5(f5.mode), y5 = lt(e, f5.encoding);
      this.wrapAsync(this.writeFileBase, [t3, y5, u6, d8], a3);
    }, r2.prototype.linkBase = function(t3, e) {
      var n3 = v5(t3), i4 = this.getLink(n3);
      if (!i4) throw p6(m6, "link", t3, e);
      var o4 = v5(e), s3 = this.getLinkParent(o4);
      if (!s3) throw p6(m6, "link", t3, e);
      var a3 = o4[o4.length - 1];
      if (s3.getChild(a3)) throw p6(nt, "link", t3, e);
      var f5 = i4.getNode();
      f5.nlink++, s3.createChild(a3, f5);
    }, r2.prototype.copyFileBase = function(t3, e, n3) {
      var i4 = this.readFileSync(t3);
      if (n3 & Qr && this.existsSync(e)) throw p6(nt, "copyFile", t3, e);
      if (n3 & $r) throw p6(He, "copyFile", t3, e);
      this.writeFileBase(e, i4, G3.w, 438);
    }, r2.prototype.copyFileSync = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      return this.copyFileBase(i4, o4, (n3 || 0) | 0);
    }, r2.prototype.copyFile = function(t3, e, n3, i4) {
      var o4 = h6(t3), s3 = h6(e), a3, f5;
      typeof n3 == "function" ? (a3 = 0, f5 = n3) : (a3 = n3, f5 = i4), g7(f5), this.wrapAsync(this.copyFileBase, [o4, s3, a3], f5);
    }, r2.prototype.linkSync = function(t3, e) {
      var n3 = h6(t3), i4 = h6(e);
      this.linkBase(n3, i4);
    }, r2.prototype.link = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      this.wrapAsync(this.linkBase, [i4, o4], n3);
    }, r2.prototype.unlinkBase = function(t3) {
      var e = v5(t3), n3 = this.getLink(e);
      if (!n3) throw p6(m6, "unlink", t3);
      if (n3.length) throw Error("Dir not empty...");
      this.deleteLink(n3);
      var i4 = n3.getNode();
      i4.nlink--, i4.nlink <= 0 && this.deleteNode(i4);
    }, r2.prototype.unlinkSync = function(t3) {
      var e = h6(t3);
      this.unlinkBase(e);
    }, r2.prototype.unlink = function(t3, e) {
      var n3 = h6(t3);
      this.wrapAsync(this.unlinkBase, [n3], e);
    }, r2.prototype.symlinkBase = function(t3, e) {
      var n3 = v5(e), i4 = this.getLinkParent(n3);
      if (!i4) throw p6(m6, "symlink", t3, e);
      var o4 = n3[n3.length - 1];
      if (i4.getChild(o4)) throw p6(nt, "symlink", t3, e);
      var s3 = i4.createChild(o4);
      return s3.getNode().makeSymlink(v5(t3)), s3;
    }, r2.prototype.symlinkSync = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      this.symlinkBase(i4, o4);
    }, r2.prototype.symlink = function(t3, e, n3, i4) {
      var o4 = g7(typeof n3 == "function" ? n3 : i4), s3 = h6(t3), a3 = h6(e);
      this.wrapAsync(this.symlinkBase, [s3, a3], o4);
    }, r2.prototype.realpathBase = function(t3, e) {
      var n3 = v5(t3), i4 = this.getResolvedLink(n3);
      if (!i4) throw p6(m6, "realpath", t3);
      return C3.strToEncoding(i4.getPath(), e);
    }, r2.prototype.realpathSync = function(t3, e) {
      return this.realpathBase(h6(t3), ze(e).encoding);
    }, r2.prototype.realpath = function(t3, e, n3) {
      var i4 = un(e, n3), o4 = i4[0], s3 = i4[1], a3 = h6(t3);
      this.wrapAsync(this.realpathBase, [a3, o4.encoding], s3);
    }, r2.prototype.lstatBase = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = this.getLink(v5(t3));
      if (!n3) throw p6(m6, "lstat", t3);
      return Zt2.default.build(n3.getNode(), e);
    }, r2.prototype.lstatSync = function(t3, e) {
      return this.lstatBase(h6(t3), dt(e).bigint);
    }, r2.prototype.lstat = function(t3, e, n3) {
      var i4 = $t(e, n3), o4 = i4[0], s3 = i4[1];
      this.wrapAsync(this.lstatBase, [h6(t3), o4.bigint], s3);
    }, r2.prototype.statBase = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = this.getResolvedLink(v5(t3));
      if (!n3) throw p6(m6, "stat", t3);
      return Zt2.default.build(n3.getNode(), e);
    }, r2.prototype.statSync = function(t3, e) {
      return this.statBase(h6(t3), dt(e).bigint);
    }, r2.prototype.stat = function(t3, e, n3) {
      var i4 = $t(e, n3), o4 = i4[0], s3 = i4[1];
      this.wrapAsync(this.statBase, [h6(t3), o4.bigint], s3);
    }, r2.prototype.fstatBase = function(t3, e) {
      e === void 0 && (e = false);
      var n3 = this.getFileByFd(t3);
      if (!n3) throw p6(re, "fstat");
      return Zt2.default.build(n3.node, e);
    }, r2.prototype.fstatSync = function(t3, e) {
      return this.fstatBase(t3, dt(e).bigint);
    }, r2.prototype.fstat = function(t3, e, n3) {
      var i4 = $t(e, n3), o4 = i4[0], s3 = i4[1];
      this.wrapAsync(this.fstatBase, [t3, o4.bigint], s3);
    }, r2.prototype.renameBase = function(t3, e) {
      var n3 = this.getLink(v5(t3));
      if (!n3) throw p6(m6, "rename", t3, e);
      var i4 = v5(e), o4 = this.getLinkParent(i4);
      if (!o4) throw p6(m6, "rename", t3, e);
      var s3 = n3.parent;
      s3 && s3.deleteChild(n3);
      var a3 = i4[i4.length - 1];
      n3.steps = zt(o4.steps, [a3]), o4.setChild(n3.getName(), n3);
    }, r2.prototype.renameSync = function(t3, e) {
      var n3 = h6(t3), i4 = h6(e);
      this.renameBase(n3, i4);
    }, r2.prototype.rename = function(t3, e, n3) {
      var i4 = h6(t3), o4 = h6(e);
      this.wrapAsync(this.renameBase, [i4, o4], n3);
    }, r2.prototype.existsBase = function(t3) {
      return !!this.statBase(t3);
    }, r2.prototype.existsSync = function(t3) {
      try {
        return this.existsBase(h6(t3));
      } catch {
        return false;
      }
    }, r2.prototype.exists = function(t3, e) {
      var n3 = this, i4 = h6(t3);
      if (typeof e != "function") throw Error(W3.CB);
      wt.default(function() {
        try {
          e(n3.existsBase(i4));
        } catch {
          e(false);
        }
      });
    }, r2.prototype.accessBase = function(t3, e) {
      var n3 = this.getLinkOrThrow(t3, "access");
    }, r2.prototype.accessSync = function(t3, e) {
      e === void 0 && (e = be);
      var n3 = h6(t3);
      e = e | 0, this.accessBase(n3, e);
    }, r2.prototype.access = function(t3, e, n3) {
      var i4 = be, o4;
      typeof e != "function" ? (i4 = e | 0, o4 = g7(n3)) : o4 = e;
      var s3 = h6(t3);
      this.wrapAsync(this.accessBase, [s3, i4], o4);
    }, r2.prototype.appendFileSync = function(t3, e, n3) {
      n3 === void 0 && (n3 = Xe);
      var i4 = Je(n3);
      (!i4.flag || z3(t3)) && (i4.flag = "a"), this.writeFileSync(t3, e, i4);
    }, r2.prototype.appendFile = function(t3, e, n3, i4) {
      var o4 = an(n3, i4), s3 = o4[0], a3 = o4[1];
      (!s3.flag || z3(t3)) && (s3.flag = "a"), this.writeFile(t3, e, s3, a3);
    }, r2.prototype.readdirBase = function(t3, e) {
      var n3 = v5(t3), i4 = this.getResolvedLink(n3);
      if (!i4) throw p6(m6, "readdir", t3);
      var o4 = i4.getNode();
      if (!o4.isDirectory()) throw p6(X3, "scandir", t3);
      if (e.withFileTypes) {
        var s3 = [];
        for (var a3 in i4.children) {
          var f5 = i4.getChild(a3);
          f5 && s3.push(Xr.default.build(f5, e.encoding));
        }
        return !ee && e.encoding !== "buffer" && s3.sort(function(y5, F4) {
          return y5.name < F4.name ? -1 : y5.name > F4.name ? 1 : 0;
        }), s3;
      }
      var u6 = [];
      for (var d8 in i4.children) u6.push(C3.strToEncoding(d8, e.encoding));
      return !ee && e.encoding !== "buffer" && u6.sort(), u6;
    }, r2.prototype.readdirSync = function(t3, e) {
      var n3 = Ge(e), i4 = h6(t3);
      return this.readdirBase(i4, n3);
    }, r2.prototype.readdir = function(t3, e, n3) {
      var i4 = pn(e, n3), o4 = i4[0], s3 = i4[1], a3 = h6(t3);
      this.wrapAsync(this.readdirBase, [a3, o4], s3);
    }, r2.prototype.readlinkBase = function(t3, e) {
      var n3 = this.getLinkOrThrow(t3, "readlink"), i4 = n3.getNode();
      if (!i4.isSymlink()) throw p6(Ve, "readlink", t3);
      var o4 = S4 + i4.symlink.join(S4);
      return C3.strToEncoding(o4, e);
    }, r2.prototype.readlinkSync = function(t3, e) {
      var n3 = Nt(e), i4 = h6(t3);
      return this.readlinkBase(i4, n3.encoding);
    }, r2.prototype.readlink = function(t3, e, n3) {
      var i4 = ke2(e, n3), o4 = i4[0], s3 = i4[1], a3 = h6(t3);
      this.wrapAsync(this.readlinkBase, [a3, o4.encoding], s3);
    }, r2.prototype.fsyncBase = function(t3) {
      this.getFileByFdOrThrow(t3, "fsync");
    }, r2.prototype.fsyncSync = function(t3) {
      this.fsyncBase(t3);
    }, r2.prototype.fsync = function(t3, e) {
      this.wrapAsync(this.fsyncBase, [t3], e);
    }, r2.prototype.fdatasyncBase = function(t3) {
      this.getFileByFdOrThrow(t3, "fdatasync");
    }, r2.prototype.fdatasyncSync = function(t3) {
      this.fdatasyncBase(t3);
    }, r2.prototype.fdatasync = function(t3, e) {
      this.wrapAsync(this.fdatasyncBase, [t3], e);
    }, r2.prototype.ftruncateBase = function(t3, e) {
      var n3 = this.getFileByFdOrThrow(t3, "ftruncate");
      n3.truncate(e);
    }, r2.prototype.ftruncateSync = function(t3, e) {
      this.ftruncateBase(t3, e);
    }, r2.prototype.ftruncate = function(t3, e, n3) {
      var i4 = typeof e == "number" ? e : 0, o4 = g7(typeof e == "number" ? n3 : e);
      this.wrapAsync(this.ftruncateBase, [t3, i4], o4);
    }, r2.prototype.truncateBase = function(t3, e) {
      var n3 = this.openSync(t3, "r+");
      try {
        this.ftruncateSync(n3, e);
      } finally {
        this.closeSync(n3);
      }
    }, r2.prototype.truncateSync = function(t3, e) {
      if (z3(t3)) return this.ftruncateSync(t3, e);
      this.truncateBase(t3, e);
    }, r2.prototype.truncate = function(t3, e, n3) {
      var i4 = typeof e == "number" ? e : 0, o4 = g7(typeof e == "number" ? n3 : e);
      if (z3(t3)) return this.ftruncate(t3, i4, o4);
      this.wrapAsync(this.truncateBase, [t3, i4], o4);
    }, r2.prototype.futimesBase = function(t3, e, n3) {
      var i4 = this.getFileByFdOrThrow(t3, "futimes"), o4 = i4.node;
      o4.atime = new Date(e * 1e3), o4.mtime = new Date(n3 * 1e3);
    }, r2.prototype.futimesSync = function(t3, e, n3) {
      this.futimesBase(t3, A4(e), A4(n3));
    }, r2.prototype.futimes = function(t3, e, n3, i4) {
      this.wrapAsync(this.futimesBase, [t3, A4(e), A4(n3)], i4);
    }, r2.prototype.utimesBase = function(t3, e, n3) {
      var i4 = this.openSync(t3, "r+");
      try {
        this.futimesBase(i4, e, n3);
      } finally {
        this.closeSync(i4);
      }
    }, r2.prototype.utimesSync = function(t3, e, n3) {
      this.utimesBase(h6(t3), A4(e), A4(n3));
    }, r2.prototype.utimes = function(t3, e, n3, i4) {
      this.wrapAsync(this.utimesBase, [h6(t3), A4(e), A4(n3)], i4);
    }, r2.prototype.mkdirBase = function(t3, e) {
      var n3 = v5(t3);
      if (!n3.length) throw p6(Ot2, "mkdir", t3);
      var i4 = this.getLinkParentAsDirOrThrow(t3, "mkdir"), o4 = n3[n3.length - 1];
      if (i4.getChild(o4)) throw p6(nt, "mkdir", t3);
      i4.createChild(o4, this.createNode(true, e));
    }, r2.prototype.mkdirpBase = function(t3, e) {
      for (var n3 = v5(t3), i4 = this.root, o4 = 0; o4 < n3.length; o4++) {
        var s3 = n3[o4];
        if (!i4.getNode().isDirectory()) throw p6(X3, "mkdir", i4.getPath());
        var a3 = i4.getChild(s3);
        if (a3) if (a3.getNode().isDirectory()) i4 = a3;
        else throw p6(X3, "mkdir", a3.getPath());
        else i4 = i4.createChild(s3, this.createNode(true, e));
      }
    }, r2.prototype.mkdirSync = function(t3, e) {
      var n3 = Pe(e), i4 = R5(n3.mode, 511), o4 = h6(t3);
      n3.recursive ? this.mkdirpBase(o4, i4) : this.mkdirBase(o4, i4);
    }, r2.prototype.mkdir = function(t3, e, n3) {
      var i4 = Pe(e), o4 = g7(typeof e == "function" ? e : n3), s3 = R5(i4.mode, 511), a3 = h6(t3);
      i4.recursive ? this.wrapAsync(this.mkdirpBase, [a3, s3], o4) : this.wrapAsync(this.mkdirBase, [a3, s3], o4);
    }, r2.prototype.mkdirpSync = function(t3, e) {
      this.mkdirSync(t3, { mode: e, recursive: true });
    }, r2.prototype.mkdirp = function(t3, e, n3) {
      var i4 = typeof e == "function" ? void 0 : e, o4 = g7(typeof e == "function" ? e : n3);
      this.mkdir(t3, { mode: i4, recursive: true }, o4);
    }, r2.prototype.mkdtempBase = function(t3, e, n3) {
      n3 === void 0 && (n3 = 5);
      var i4 = t3 + this.genRndStr();
      try {
        return this.mkdirBase(i4, 511), C3.strToEncoding(i4, e);
      } catch (o4) {
        if (o4.code === nt) {
          if (n3 > 1) return this.mkdtempBase(t3, e, n3 - 1);
          throw Error("Could not create temp dir.");
        } else throw o4;
      }
    }, r2.prototype.mkdtempSync = function(t3, e) {
      var n3 = Nt(e).encoding;
      if (!t3 || typeof t3 != "string") throw new TypeError("filename prefix is required");
      return ne(t3), this.mkdtempBase(t3, n3);
    }, r2.prototype.mkdtemp = function(t3, e, n3) {
      var i4 = ke2(e, n3), o4 = i4[0].encoding, s3 = i4[1];
      if (!t3 || typeof t3 != "string") throw new TypeError("filename prefix is required");
      ne(t3) && this.wrapAsync(this.mkdtempBase, [t3, o4], s3);
    }, r2.prototype.rmdirBase = function(t3, e) {
      var n3 = Ae(e), i4 = this.getLinkAsDirOrThrow(t3, "rmdir");
      if (i4.length && !n3.recursive) throw p6(qe, "rmdir", t3);
      this.deleteLink(i4);
    }, r2.prototype.rmdirSync = function(t3, e) {
      this.rmdirBase(h6(t3), e);
    }, r2.prototype.rmdir = function(t3, e, n3) {
      var i4 = Ae(e), o4 = g7(typeof e == "function" ? e : n3);
      this.wrapAsync(this.rmdirBase, [h6(t3), i4], o4);
    }, r2.prototype.fchmodBase = function(t3, e) {
      var n3 = this.getFileByFdOrThrow(t3, "fchmod");
      n3.chmod(e);
    }, r2.prototype.fchmodSync = function(t3, e) {
      this.fchmodBase(t3, R5(e));
    }, r2.prototype.fchmod = function(t3, e, n3) {
      this.wrapAsync(this.fchmodBase, [t3, R5(e)], n3);
    }, r2.prototype.chmodBase = function(t3, e) {
      var n3 = this.openSync(t3, "r+");
      try {
        this.fchmodBase(n3, e);
      } finally {
        this.closeSync(n3);
      }
    }, r2.prototype.chmodSync = function(t3, e) {
      var n3 = R5(e), i4 = h6(t3);
      this.chmodBase(i4, n3);
    }, r2.prototype.chmod = function(t3, e, n3) {
      var i4 = R5(e), o4 = h6(t3);
      this.wrapAsync(this.chmodBase, [o4, i4], n3);
    }, r2.prototype.lchmodBase = function(t3, e) {
      var n3 = this.openBase(t3, D3, 0, false);
      try {
        this.fchmodBase(n3, e);
      } finally {
        this.closeSync(n3);
      }
    }, r2.prototype.lchmodSync = function(t3, e) {
      var n3 = R5(e), i4 = h6(t3);
      this.lchmodBase(i4, n3);
    }, r2.prototype.lchmod = function(t3, e, n3) {
      var i4 = R5(e), o4 = h6(t3);
      this.wrapAsync(this.lchmodBase, [o4, i4], n3);
    }, r2.prototype.fchownBase = function(t3, e, n3) {
      this.getFileByFdOrThrow(t3, "fchown").chown(e, n3);
    }, r2.prototype.fchownSync = function(t3, e, n3) {
      et2(e), rt(n3), this.fchownBase(t3, e, n3);
    }, r2.prototype.fchown = function(t3, e, n3, i4) {
      et2(e), rt(n3), this.wrapAsync(this.fchownBase, [t3, e, n3], i4);
    }, r2.prototype.chownBase = function(t3, e, n3) {
      var i4 = this.getResolvedLinkOrThrow(t3, "chown"), o4 = i4.getNode();
      o4.chown(e, n3);
    }, r2.prototype.chownSync = function(t3, e, n3) {
      et2(e), rt(n3), this.chownBase(h6(t3), e, n3);
    }, r2.prototype.chown = function(t3, e, n3, i4) {
      et2(e), rt(n3), this.wrapAsync(this.chownBase, [h6(t3), e, n3], i4);
    }, r2.prototype.lchownBase = function(t3, e, n3) {
      this.getLinkOrThrow(t3, "lchown").getNode().chown(e, n3);
    }, r2.prototype.lchownSync = function(t3, e, n3) {
      et2(e), rt(n3), this.lchownBase(h6(t3), e, n3);
    }, r2.prototype.lchown = function(t3, e, n3, i4) {
      et2(e), rt(n3), this.wrapAsync(this.lchownBase, [h6(t3), e, n3], i4);
    }, r2.prototype.watchFile = function(t3, e, n3) {
      var i4 = h6(t3), o4 = e, s3 = n3;
      if (typeof o4 == "function" && (s3 = e, o4 = null), typeof s3 != "function") throw Error('"watchFile()" requires a listener function');
      var a3 = 5007, f5 = true;
      o4 && typeof o4 == "object" && (typeof o4.interval == "number" && (a3 = o4.interval), typeof o4.persistent == "boolean" && (f5 = o4.persistent));
      var u6 = this.statWatchers[i4];
      return u6 || (u6 = new this.StatWatcher(), u6.start(i4, f5, a3), this.statWatchers[i4] = u6), u6.addListener("change", s3), u6;
    }, r2.prototype.unwatchFile = function(t3, e) {
      var n3 = h6(t3), i4 = this.statWatchers[n3];
      i4 && (typeof e == "function" ? i4.removeListener("change", e) : i4.removeAllListeners("change"), i4.listenerCount("change") === 0 && (i4.stop(), delete this.statWatchers[n3]));
    }, r2.prototype.createReadStream = function(t3, e) {
      return new this.ReadStream(t3, e);
    }, r2.prototype.createWriteStream = function(t3, e) {
      return new this.WriteStream(t3, e);
    }, r2.prototype.watch = function(t3, e, n3) {
      var i4 = h6(t3), o4 = e;
      typeof e == "function" && (n3 = e, o4 = null);
      var s3 = Nt(o4), a3 = s3.persistent, f5 = s3.recursive, u6 = s3.encoding;
      a3 === void 0 && (a3 = true), f5 === void 0 && (f5 = false);
      var d8 = new this.FSWatcher();
      return d8.start(i4, a3, f5, u6), n3 && d8.addListener("change", n3), d8;
    }, r2.fd = 2147483647, r2;
  }();
  _7.Volume = mn;
  function _n(r2) {
    r2.emit("stop");
  }
  var $e = function(r2) {
    it(t3, r2);
    function t3(e) {
      var n3 = r2.call(this) || this;
      return n3.onInterval = function() {
        try {
          var i4 = n3.vol.statSync(n3.filename);
          n3.hasChanged(i4) && (n3.emit("change", i4, n3.prev), n3.prev = i4);
        } finally {
          n3.loop();
        }
      }, n3.vol = e, n3;
    }
    return t3.prototype.loop = function() {
      this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
    }, t3.prototype.hasChanged = function(e) {
      return e.mtimeMs > this.prev.mtimeMs || e.nlink !== this.prev.nlink;
    }, t3.prototype.start = function(e, n3, i4) {
      n3 === void 0 && (n3 = true), i4 === void 0 && (i4 = 5007), this.filename = h6(e), this.setTimeout = n3 ? setTimeout : Jr.default, this.interval = i4, this.prev = this.vol.statSync(this.filename), this.loop();
    }, t3.prototype.stop = function() {
      clearTimeout(this.timeoutRef), q6.default.nextTick(_n, this);
    }, t3;
  }(Me.EventEmitter);
  _7.StatWatcher = $e;
  var O5;
  function gn(r2) {
    O5 = U5.bufferAllocUnsafe(r2), O5.used = 0;
  }
  We.inherits(k4, kt.Readable);
  _7.ReadStream = k4;
  function k4(r2, t3, e) {
    if (!(this instanceof k4)) return new k4(r2, t3, e);
    if (this._vol = r2, e = M6({}, ie(e, {})), e.highWaterMark === void 0 && (e.highWaterMark = 64 * 1024), kt.Readable.call(this, e), this.path = h6(t3), this.fd = e.fd === void 0 ? null : e.fd, this.flags = e.flags === void 0 ? "r" : e.flags, this.mode = e.mode === void 0 ? 438 : e.mode, this.start = e.start, this.end = e.end, this.autoClose = e.autoClose === void 0 ? true : e.autoClose, this.pos = void 0, this.bytesRead = 0, this.start !== void 0) {
      if (typeof this.start != "number") throw new TypeError('"start" option must be a Number');
      if (this.end === void 0) this.end = 1 / 0;
      else if (typeof this.end != "number") throw new TypeError('"end" option must be a Number');
      if (this.start > this.end) throw new Error('"start" option must be <= "end" option');
      this.pos = this.start;
    }
    typeof this.fd != "number" && this.open(), this.on("end", function() {
      this.autoClose && this.destroy && this.destroy();
    });
  }
  k4.prototype.open = function() {
    var r2 = this;
    this._vol.open(this.path, this.flags, this.mode, function(t3, e) {
      if (t3) {
        r2.autoClose && r2.destroy && r2.destroy(), r2.emit("error", t3);
        return;
      }
      r2.fd = e, r2.emit("open", e), r2.read();
    });
  };
  k4.prototype._read = function(r2) {
    if (typeof this.fd != "number") return this.once("open", function() {
      this._read(r2);
    });
    if (this.destroyed) return;
    (!O5 || O5.length - O5.used < tn) && gn(this._readableState.highWaterMark);
    var t3 = O5, e = Math.min(O5.length - O5.used, r2), n3 = O5.used;
    if (this.pos !== void 0 && (e = Math.min(this.end - this.pos + 1, e)), e <= 0) return this.push(null);
    var i4 = this;
    this._vol.read(this.fd, O5, O5.used, e, this.pos, o4), this.pos !== void 0 && (this.pos += e), O5.used += e;
    function o4(s3, a3) {
      if (s3) i4.autoClose && i4.destroy && i4.destroy(), i4.emit("error", s3);
      else {
        var f5 = null;
        a3 > 0 && (i4.bytesRead += a3, f5 = t3.slice(n3, n3 + a3)), i4.push(f5);
      }
    }
  };
  k4.prototype._destroy = function(r2, t3) {
    this.close(function(e) {
      t3(r2 || e);
    });
  };
  k4.prototype.close = function(r2) {
    var t3 = this;
    if (r2 && this.once("close", r2), this.closed || typeof this.fd != "number") {
      if (typeof this.fd != "number") {
        this.once("open", En);
        return;
      }
      return q6.default.nextTick(function() {
        return t3.emit("close");
      });
    }
    this.closed = true, this._vol.close(this.fd, function(e) {
      e ? t3.emit("error", e) : t3.emit("close");
    }), this.fd = null;
  };
  function En(r2) {
    this.close();
  }
  We.inherits(N4, kt.Writable);
  _7.WriteStream = N4;
  function N4(r2, t3, e) {
    if (!(this instanceof N4)) return new N4(r2, t3, e);
    if (this._vol = r2, e = M6({}, ie(e, {})), kt.Writable.call(this, e), this.path = h6(t3), this.fd = e.fd === void 0 ? null : e.fd, this.flags = e.flags === void 0 ? "w" : e.flags, this.mode = e.mode === void 0 ? 438 : e.mode, this.start = e.start, this.autoClose = e.autoClose === void 0 ? true : !!e.autoClose, this.pos = void 0, this.bytesWritten = 0, this.start !== void 0) {
      if (typeof this.start != "number") throw new TypeError('"start" option must be a Number');
      if (this.start < 0) throw new Error('"start" must be >= zero');
      this.pos = this.start;
    }
    e.encoding && this.setDefaultEncoding(e.encoding), typeof this.fd != "number" && this.open(), this.once("finish", function() {
      this.autoClose && this.close();
    });
  }
  N4.prototype.open = function() {
    this._vol.open(this.path, this.flags, this.mode, function(r2, t3) {
      if (r2) {
        this.autoClose && this.destroy && this.destroy(), this.emit("error", r2);
        return;
      }
      this.fd = t3, this.emit("open", t3);
    }.bind(this));
  };
  N4.prototype._write = function(r2, t3, e) {
    if (!(r2 instanceof U5.Buffer)) return this.emit("error", new Error("Invalid data"));
    if (typeof this.fd != "number") return this.once("open", function() {
      this._write(r2, t3, e);
    });
    var n3 = this;
    this._vol.write(this.fd, r2, 0, r2.length, this.pos, function(i4, o4) {
      if (i4) return n3.autoClose && n3.destroy && n3.destroy(), e(i4);
      n3.bytesWritten += o4, e();
    }), this.pos !== void 0 && (this.pos += r2.length);
  };
  N4.prototype._writev = function(r2, t3) {
    if (typeof this.fd != "number") return this.once("open", function() {
      this._writev(r2, t3);
    });
    for (var e = this, n3 = r2.length, i4 = new Array(n3), o4 = 0, s3 = 0; s3 < n3; s3++) {
      var a3 = r2[s3].chunk;
      i4[s3] = a3, o4 += a3.length;
    }
    var f5 = U5.Buffer.concat(i4);
    this._vol.write(this.fd, f5, 0, f5.length, this.pos, function(u6, d8) {
      if (u6) return e.destroy && e.destroy(), t3(u6);
      e.bytesWritten += d8, t3();
    }), this.pos !== void 0 && (this.pos += o4);
  };
  N4.prototype._destroy = k4.prototype._destroy;
  N4.prototype.close = k4.prototype.close;
  N4.prototype.destroySoon = N4.prototype.end;
  var tr = function(r2) {
    it(t3, r2);
    function t3(e) {
      var n3 = r2.call(this) || this;
      return n3._filename = "", n3._filenameEncoded = "", n3._recursive = false, n3._encoding = C3.ENCODING_UTF8, n3._onNodeChange = function() {
        n3._emit("change");
      }, n3._onParentChild = function(i4) {
        i4.getName() === n3._getName() && n3._emit("rename");
      }, n3._emit = function(i4) {
        n3.emit("change", i4, n3._filenameEncoded);
      }, n3._persist = function() {
        n3._timer = setTimeout(n3._persist, 1e6);
      }, n3._vol = e, n3;
    }
    return t3.prototype._getName = function() {
      return this._steps[this._steps.length - 1];
    }, t3.prototype.start = function(e, n3, i4, o4) {
      n3 === void 0 && (n3 = true), i4 === void 0 && (i4 = false), o4 === void 0 && (o4 = C3.ENCODING_UTF8), this._filename = h6(e), this._steps = v5(this._filename), this._filenameEncoded = C3.strToEncoding(this._filename), this._recursive = i4, this._encoding = o4;
      try {
        this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher");
      } catch (f5) {
        var s3 = new Error("watch " + this._filename + " " + f5.code);
        throw s3.code = f5.code, s3.errno = f5.code, s3;
      }
      this._link.getNode().on("change", this._onNodeChange), this._link.on("child:add", this._onNodeChange), this._link.on("child:delete", this._onNodeChange);
      var a3 = this._link.parent;
      a3 && (a3.setMaxListeners(a3.getMaxListeners() + 1), a3.on("child:delete", this._onParentChild)), n3 && this._persist();
    }, t3.prototype.close = function() {
      clearTimeout(this._timer), this._link.getNode().removeListener("change", this._onNodeChange);
      var e = this._link.parent;
      e && e.removeListener("child:delete", this._onParentChild);
    }, t3;
  }(Me.EventEmitter);
  _7.FSWatcher = tr;
});
var H2 = {};
ur2(H2, { FLAGS: () => Sn, FSWatcher: () => An, ReadStream: () => Ln, StatWatcher: () => Cn, Volume: () => Bn, WriteStream: () => Pn, __esModule: () => Rn, bufferToEncoding: () => bn, dataToBuffer: () => Fn, dataToStr: () => Tn, default: () => Un2, filenameToSteps: () => On, flagsToNumber: () => wn, pathToFilename: () => In, pathToSteps: () => Nn, toUnixTimestamp: () => kn });
var rr = ce(oe());
x8(H2, ce(oe()));
var { __esModule: Rn, FLAGS: Sn, flagsToNumber: wn, pathToFilename: In, filenameToSteps: On, pathToSteps: Nn, dataToStr: Tn, dataToBuffer: Fn, bufferToEncoding: bn, toUnixTimestamp: kn, Volume: Bn, StatWatcher: Cn, ReadStream: Ln, WriteStream: Pn, FSWatcher: An } = rr;
var { default: er, ...Dn } = rr;
var Un2 = er !== void 0 ? er : Dn;

// https://esm.sh/v135/memfs@3.0.4/denonext/lib/node.js
import __Process$7 from "node:process";
import * as __0$3 from "node:events";
import * as __1$3 from "node:process";
import * as __2$3 from "node:buffer";
var __global$5 = globalThis || (typeof window !== "undefined" ? window : self);
var __setImmediate$3 = (cb, ...args) => setTimeout(cb, 0, ...args);
var require7 = (n3) => {
  const e = (m6) => typeof m6.default < "u" ? m6.default : m6, c5 = (m6) => Object.assign({ __esModule: true }, m6);
  switch (n3) {
    case "events":
      return e(__0$3);
    case "process":
      return e(__1$3);
    case "buffer":
      return e(__2$3);
    default:
      throw new Error('module "' + n3 + '" not found');
  }
};
var J2 = Object.create;
var b5 = Object.defineProperty;
var Q3 = Object.getOwnPropertyDescriptor;
var Z2 = Object.getOwnPropertyNames;
var $2 = Object.getPrototypeOf;
var tt = Object.prototype.hasOwnProperty;
var P3 = ((r2) => typeof require7 < "u" ? require7 : typeof Proxy < "u" ? new Proxy(r2, { get: (t3, e) => (typeof require7 < "u" ? require7 : t3)[e] }) : r2)(function(r2) {
  if (typeof require7 < "u") return require7.apply(this, arguments);
  throw Error('Dynamic require of "' + r2 + '" is not supported');
});
var p5 = (r2, t3) => () => (t3 || r2((t3 = { exports: {} }).exports, t3), t3.exports);
var et = (r2, t3) => {
  for (var e in t3) b5(r2, e, { get: t3[e], enumerable: true });
};
var O4 = (r2, t3, e, i4) => {
  if (t3 && typeof t3 == "object" || typeof t3 == "function") for (let n3 of Z2(t3)) !tt.call(r2, n3) && n3 !== e && b5(r2, n3, { get: () => t3[n3], enumerable: !(i4 = Q3(t3, n3)) || i4.enumerable });
  return r2;
};
var _6 = (r2, t3, e) => (O4(r2, t3, "default"), e && O4(e, t3, "default"));
var B4 = (r2, t3, e) => (e = r2 != null ? J2($2(r2)) : {}, O4(t3 || !r2 || !r2.__esModule ? b5(e, "default", { value: r2, enumerable: true }) : e, r2));
var w8 = p5((C3) => {
  "use strict";
  Object.defineProperty(C3, "__esModule", { value: true });
  var R5;
  typeof __setImmediate$3 == "function" ? R5 = __setImmediate$3.bind(__global$5) : R5 = setTimeout.bind(__global$5);
  C3.default = R5;
});
var K2 = p5((I3) => {
  "use strict";
  Object.defineProperty(I3, "__esModule", { value: true });
  var it = function() {
    if (typeof __Process$7 < "u") return __Process$7;
    try {
      return P3("process");
    } catch {
      return;
    }
  };
  function D3() {
    var r2 = it() || {};
    return r2.getuid || (r2.getuid = function() {
      return 0;
    }), r2.getgid || (r2.getgid = function() {
      return 0;
    }), r2.cwd || (r2.cwd = function() {
      return "/";
    }), r2.nextTick || (r2.nextTick = w8().default), r2.emitWarning || (r2.emitWarning = function(t3, e) {
      console.warn("" + e + (e ? ": " : "") + t3);
    }), r2.env || (r2.env = {}), r2;
  }
  I3.createProcess = D3;
  I3.default = D3();
});
var A3 = p5((l4) => {
  "use strict";
  var rt = l4 && l4.__spreadArrays || function() {
    for (var r2 = 0, t3 = 0, e = arguments.length; t3 < e; t3++) r2 += arguments[t3].length;
    for (var i4 = Array(r2), n3 = 0, t3 = 0; t3 < e; t3++) for (var o4 = arguments[t3], s3 = 0, S4 = o4.length; s3 < S4; s3++, n3++) i4[n3] = o4[s3];
    return i4;
  };
  Object.defineProperty(l4, "__esModule", { value: true });
  var m6 = P3("buffer");
  l4.Buffer = m6.Buffer;
  function U5(r2) {
    for (var t3 = [], e = 1; e < arguments.length; e++) t3[e - 1] = arguments[e];
    return new (m6.Buffer.bind.apply(m6.Buffer, rt([void 0, r2], t3)))();
  }
  var nt = m6.Buffer.allocUnsafe || U5;
  l4.bufferAllocUnsafe = nt;
  var ot = m6.Buffer.from || U5;
  l4.bufferFrom = ot;
});
var N3 = p5((L4) => {
  "use strict";
  Object.defineProperty(L4, "__esModule", { value: true });
  L4.constants = { O_RDONLY: 0, O_WRONLY: 1, O_RDWR: 2, S_IFMT: 61440, S_IFREG: 32768, S_IFDIR: 16384, S_IFCHR: 8192, S_IFBLK: 24576, S_IFIFO: 4096, S_IFLNK: 40960, S_IFSOCK: 49152, O_CREAT: 64, O_EXCL: 128, O_NOCTTY: 256, O_TRUNC: 512, O_APPEND: 1024, O_DIRECTORY: 65536, O_NOATIME: 262144, O_NOFOLLOW: 131072, O_SYNC: 1052672, O_DIRECT: 16384, O_NONBLOCK: 2048, S_IRWXU: 448, S_IRUSR: 256, S_IWUSR: 128, S_IXUSR: 64, S_IRWXG: 56, S_IRGRP: 32, S_IWGRP: 16, S_IXGRP: 8, S_IRWXO: 7, S_IROTH: 4, S_IWOTH: 2, S_IXOTH: 1, F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1, UV_FS_SYMLINK_DIR: 1, UV_FS_SYMLINK_JUNCTION: 2, UV_FS_COPYFILE_EXCL: 1, UV_FS_COPYFILE_FICLONE: 2, UV_FS_COPYFILE_FICLONE_FORCE: 4, COPYFILE_EXCL: 1, COPYFILE_FICLONE: 2, COPYFILE_FICLONE_FORCE: 4 };
});
var W2 = p5((E5) => {
  typeof BigInt == "function" ? E5.default = BigInt : E5.default = function() {
    throw new Error("BigInt is not supported in this environment.");
  };
});
var q5 = p5((g7) => {
  "use strict";
  Object.defineProperty(g7, "__esModule", { value: true });
  var a3 = N3(), st = W2(), ut = a3.constants.S_IFMT, ft2 = a3.constants.S_IFDIR, ct = a3.constants.S_IFREG, ht = a3.constants.S_IFBLK, at = a3.constants.S_IFCHR, dt = a3.constants.S_IFLNK, pt = a3.constants.S_IFIFO, _t2 = a3.constants.S_IFSOCK, Y3 = function() {
    function r2() {
    }
    return r2.build = function(t3, e) {
      e === void 0 && (e = false);
      var i4 = new r2(), n3 = t3.uid, o4 = t3.gid, s3 = t3.atime, S4 = t3.mtime, F4 = t3.ctime, u6 = e ? st.default : function(x9) {
        return x9;
      };
      i4.uid = u6(n3), i4.gid = u6(o4), i4.rdev = u6(0), i4.blksize = u6(4096), i4.ino = u6(t3.ino), i4.size = u6(t3.getSize()), i4.blocks = u6(1), i4.atime = s3, i4.mtime = S4, i4.ctime = F4, i4.birthtime = F4, i4.atimeMs = u6(s3.getTime()), i4.mtimeMs = u6(S4.getTime());
      var T4 = u6(F4.getTime());
      return i4.ctimeMs = T4, i4.birthtimeMs = T4, i4.dev = u6(0), i4.mode = u6(t3.mode), i4.nlink = u6(t3.nlink), i4;
    }, r2.prototype._checkModeProperty = function(t3) {
      return (Number(this.mode) & ut) === t3;
    }, r2.prototype.isDirectory = function() {
      return this._checkModeProperty(ft2);
    }, r2.prototype.isFile = function() {
      return this._checkModeProperty(ct);
    }, r2.prototype.isBlockDevice = function() {
      return this._checkModeProperty(ht);
    }, r2.prototype.isCharacterDevice = function() {
      return this._checkModeProperty(at);
    }, r2.prototype.isSymbolicLink = function() {
      return this._checkModeProperty(dt);
    }, r2.prototype.isFIFO = function() {
      return this._checkModeProperty(pt);
    }, r2.prototype.isSocket = function() {
      return this._checkModeProperty(_t2);
    }, r2;
  }();
  g7.Stats = Y3;
  g7.default = Y3;
});
var M5 = p5((c5) => {
  "use strict";
  var G3 = c5 && c5.__extends || /* @__PURE__ */ function() {
    var r2 = function(t3, e) {
      return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i4, n3) {
        i4.__proto__ = n3;
      } || function(i4, n3) {
        for (var o4 in n3) n3.hasOwnProperty(o4) && (i4[o4] = n3[o4]);
      }, r2(t3, e);
    };
    return function(t3, e) {
      r2(t3, e);
      function i4() {
        this.constructor = t3;
      }
      t3.prototype = e === null ? Object.create(e) : (i4.prototype = e.prototype, new i4());
    };
  }();
  Object.defineProperty(c5, "__esModule", { value: true });
  var y5 = K2(), f5 = A3(), h6 = N3(), H3 = P3("events"), lt = q5(), v5 = h6.constants.S_IFMT, X3 = h6.constants.S_IFDIR, k4 = h6.constants.S_IFREG, Bt = h6.constants.S_IFBLK, wt = h6.constants.S_IFCHR, j7 = h6.constants.S_IFLNK, Dt = h6.constants.S_IFIFO, Kt2 = h6.constants.S_IFSOCK, yt = h6.constants.O_APPEND;
  c5.SEP = "/";
  var mt = function(r2) {
    G3(t3, r2);
    function t3(e, i4) {
      i4 === void 0 && (i4 = 438);
      var n3 = r2.call(this) || this;
      return n3.uid = y5.default.getuid(), n3.gid = y5.default.getgid(), n3.atime = /* @__PURE__ */ new Date(), n3.mtime = /* @__PURE__ */ new Date(), n3.ctime = /* @__PURE__ */ new Date(), n3.perm = 438, n3.mode = k4, n3.nlink = 1, n3.perm = i4, n3.mode |= i4, n3.ino = e, n3;
    }
    return t3.prototype.getString = function(e) {
      return e === void 0 && (e = "utf8"), this.getBuffer().toString(e);
    }, t3.prototype.setString = function(e) {
      this.buf = f5.bufferFrom(e, "utf8"), this.touch();
    }, t3.prototype.getBuffer = function() {
      return this.buf || this.setBuffer(f5.bufferAllocUnsafe(0)), f5.bufferFrom(this.buf);
    }, t3.prototype.setBuffer = function(e) {
      this.buf = f5.bufferFrom(e), this.touch();
    }, t3.prototype.getSize = function() {
      return this.buf ? this.buf.length : 0;
    }, t3.prototype.setModeProperty = function(e) {
      this.mode = this.mode & ~v5 | e;
    }, t3.prototype.setIsFile = function() {
      this.setModeProperty(k4);
    }, t3.prototype.setIsDirectory = function() {
      this.setModeProperty(X3);
    }, t3.prototype.setIsSymlink = function() {
      this.setModeProperty(j7);
    }, t3.prototype.isFile = function() {
      return (this.mode & v5) === k4;
    }, t3.prototype.isDirectory = function() {
      return (this.mode & v5) === X3;
    }, t3.prototype.isSymlink = function() {
      return (this.mode & v5) === j7;
    }, t3.prototype.makeSymlink = function(e) {
      this.symlink = e, this.setIsSymlink();
    }, t3.prototype.write = function(e, i4, n3, o4) {
      if (i4 === void 0 && (i4 = 0), n3 === void 0 && (n3 = e.length), o4 === void 0 && (o4 = 0), this.buf || (this.buf = f5.bufferAllocUnsafe(0)), o4 + n3 > this.buf.length) {
        var s3 = f5.bufferAllocUnsafe(o4 + n3);
        this.buf.copy(s3, 0, 0, this.buf.length), this.buf = s3;
      }
      return e.copy(this.buf, o4, i4, i4 + n3), this.touch(), n3;
    }, t3.prototype.read = function(e, i4, n3, o4) {
      i4 === void 0 && (i4 = 0), n3 === void 0 && (n3 = e.byteLength), o4 === void 0 && (o4 = 0), this.buf || (this.buf = f5.bufferAllocUnsafe(0));
      var s3 = n3;
      return s3 > e.byteLength && (s3 = e.byteLength), s3 + o4 > this.buf.length && (s3 = this.buf.length - o4), this.buf.copy(e, i4, o4, o4 + s3), s3;
    }, t3.prototype.truncate = function(e) {
      if (e === void 0 && (e = 0), !e) this.buf = f5.bufferAllocUnsafe(0);
      else if (this.buf || (this.buf = f5.bufferAllocUnsafe(0)), e <= this.buf.length) this.buf = this.buf.slice(0, e);
      else {
        var i4 = f5.bufferAllocUnsafe(0);
        this.buf.copy(i4), i4.fill(0, e);
      }
      this.touch();
    }, t3.prototype.chmod = function(e) {
      this.perm = e, this.mode = this.mode & -512 | e, this.touch();
    }, t3.prototype.chown = function(e, i4) {
      this.uid = e, this.gid = i4, this.touch();
    }, t3.prototype.touch = function() {
      this.mtime = /* @__PURE__ */ new Date(), this.emit("change", this);
    }, t3.prototype.canRead = function(e, i4) {
      return e === void 0 && (e = y5.default.getuid()), i4 === void 0 && (i4 = y5.default.getgid()), !!(this.perm & 4 || i4 === this.gid && this.perm & 32 || e === this.uid && this.perm & 256);
    }, t3.prototype.canWrite = function(e, i4) {
      return e === void 0 && (e = y5.default.getuid()), i4 === void 0 && (i4 = y5.default.getgid()), !!(this.perm & 2 || i4 === this.gid && this.perm & 16 || e === this.uid && this.perm & 128);
    }, t3.prototype.del = function() {
      this.emit("delete", this);
    }, t3.prototype.toJSON = function() {
      return { ino: this.ino, uid: this.uid, gid: this.gid, atime: this.atime.getTime(), mtime: this.mtime.getTime(), ctime: this.ctime.getTime(), perm: this.perm, mode: this.mode, nlink: this.nlink, symlink: this.symlink, data: this.getString() };
    }, t3;
  }(H3.EventEmitter);
  c5.Node = mt;
  var St = function(r2) {
    G3(t3, r2);
    function t3(e, i4, n3) {
      var o4 = r2.call(this) || this;
      return o4.children = {}, o4.steps = [], o4.ino = 0, o4.length = 0, o4.vol = e, o4.parent = i4, o4.steps = i4 ? i4.steps.concat([n3]) : [n3], o4;
    }
    return t3.prototype.setNode = function(e) {
      this.node = e, this.ino = e.ino;
    }, t3.prototype.getNode = function() {
      return this.node;
    }, t3.prototype.createChild = function(e, i4) {
      i4 === void 0 && (i4 = this.vol.createNode());
      var n3 = new t3(this.vol, this, e);
      return n3.setNode(i4), i4.isDirectory(), this.setChild(e, n3), n3;
    }, t3.prototype.setChild = function(e, i4) {
      return i4 === void 0 && (i4 = new t3(this.vol, this, e)), this.children[e] = i4, i4.parent = this, this.length++, this.emit("child:add", i4, this), i4;
    }, t3.prototype.deleteChild = function(e) {
      delete this.children[e.getName()], this.length--, this.emit("child:delete", e, this);
    }, t3.prototype.getChild = function(e) {
      if (Object.hasOwnProperty.call(this.children, e)) return this.children[e];
    }, t3.prototype.getPath = function() {
      return this.steps.join(c5.SEP);
    }, t3.prototype.getName = function() {
      return this.steps[this.steps.length - 1];
    }, t3.prototype.walk = function(e, i4, n3) {
      if (i4 === void 0 && (i4 = e.length), n3 === void 0 && (n3 = 0), n3 >= e.length) return this;
      if (n3 >= i4) return this;
      var o4 = e[n3], s3 = this.getChild(o4);
      return s3 ? s3.walk(e, i4, n3 + 1) : null;
    }, t3.prototype.toJSON = function() {
      return { steps: this.steps, ino: this.ino, children: Object.keys(this.children) };
    }, t3;
  }(H3.EventEmitter);
  c5.Link = St;
  var It = function() {
    function r2(t3, e, i4, n3) {
      this.position = 0, this.link = t3, this.node = e, this.flags = i4, this.fd = n3;
    }
    return r2.prototype.getString = function(t3) {
      return t3 === void 0 && (t3 = "utf8"), this.node.getString();
    }, r2.prototype.setString = function(t3) {
      this.node.setString(t3);
    }, r2.prototype.getBuffer = function() {
      return this.node.getBuffer();
    }, r2.prototype.setBuffer = function(t3) {
      this.node.setBuffer(t3);
    }, r2.prototype.getSize = function() {
      return this.node.getSize();
    }, r2.prototype.truncate = function(t3) {
      this.node.truncate(t3);
    }, r2.prototype.seekTo = function(t3) {
      this.position = t3;
    }, r2.prototype.stats = function() {
      return lt.default.build(this.node);
    }, r2.prototype.write = function(t3, e, i4, n3) {
      e === void 0 && (e = 0), i4 === void 0 && (i4 = t3.length), typeof n3 != "number" && (n3 = this.position), this.flags & yt && (n3 = this.getSize());
      var o4 = this.node.write(t3, e, i4, n3);
      return this.position = n3 + o4, o4;
    }, r2.prototype.read = function(t3, e, i4, n3) {
      e === void 0 && (e = 0), i4 === void 0 && (i4 = t3.byteLength), typeof n3 != "number" && (n3 = this.position);
      var o4 = this.node.read(t3, e, i4, n3);
      return this.position = n3 + o4, o4;
    }, r2.prototype.chmod = function(t3) {
      this.node.chmod(t3);
    }, r2.prototype.chown = function(t3, e) {
      this.node.chown(t3, e);
    }, r2;
  }();
  c5.File = It;
});
var d7 = {};
et(d7, { File: () => bt, Link: () => Ot, Node: () => Ft, SEP: () => vt, __esModule: () => gt, default: () => Rt2 });
var V4 = B4(M5());
_6(d7, B4(M5()));
var { __esModule: gt, SEP: vt, Node: Ft, Link: Ot, File: bt } = V4;
var { default: z2, ...Pt2 } = V4;
var Rt2 = z2 !== void 0 ? z2 : Pt2;

// wasmfs/node_sync_emit.ts
Ft.prototype.emit = function(event, ...args) {
  const listeners = this.listeners(event);
  for (let listener of listeners) {
    try {
      listener(...args);
    } catch (e) {
      console.error(e);
    }
  }
  return listeners.length > 0;
};

// wasmfs/index.ts
var assert = (cond, message) => {
  if (!cond) {
    throw new Error(message);
  }
};
var WasmFsDefault = class {
  volume;
  fs;
  constructor() {
    this.volume = new Bn();
    this.fs = Kn(this.volume);
    this.fromJSON({
      "/dev/stdin": "",
      "/dev/stdout": "",
      "/dev/stderr": ""
    });
  }
  _toJSON(link, json = {}, path) {
    let isEmpty = true;
    for (const name in link.children) {
      isEmpty = false;
      const child = link.getChild(name);
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
    let dirPath = link.getPath();
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
        const filename = In(path);
        const link = this.volume.getResolvedLink(filename);
        if (!link) continue;
        links.push(link);
      }
    } else {
      links.push(this.volume.root);
    }
    if (!links.length) return json;
    for (const link of links)
      this._toJSON(link, json, isRelative ? link.getPath() : "");
    return json;
  }
  fromJSONFixed(vol, json) {
    const sep = "/";
    for (let filename in json) {
      const data = json[filename];
      const isDir = data ? Object.getPrototypeOf(data) === null : data === null;
      if (!isDir) {
        const steps = On(filename);
        if (steps.length > 1) {
          const dirname = sep + steps.slice(0, steps.length - 1).join(sep);
          vol.mkdirpBase(dirname, 511);
        }
        vol.writeFileSync(filename, data || "");
      } else {
        vol.mkdirpBase(filename, 511);
      }
    }
  }
  fromJSON(fsJson) {
    this.volume = new Bn();
    this.fromJSONFixed(this.volume, fsJson);
    this.fs = Kn(this.volume);
    this.volume.releasedFds = [0, 1, 2];
    const fdErr = this.volume.openSync("/dev/stderr", "w");
    const fdOut = this.volume.openSync("/dev/stdout", "w");
    const fdIn = this.volume.openSync("/dev/stdin", "r");
    assert(fdErr === 2, `invalid handle for stderr: ${fdErr}`);
    assert(fdOut === 1, `invalid handle for stdout: ${fdOut}`);
    assert(fdIn === 0, `invalid handle for stdin: ${fdIn}`);
  }
  async getStdOut() {
    let promise = new Promise((resolve) => {
      resolve(this.fs.readFileSync("/dev/stdout", "utf8"));
    });
    return promise;
  }
};
var WasmFs = WasmFsDefault;

// wasi_worker.ts
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
      } catch (e) {
        this.self.postMessage({ messageId: data.messageId, error: e.toString() });
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
    const stat2 = this.wasmFs.fs.statSync(filePath);
    if (!stat2.isDirectory()) return false;
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
    } catch (e) {
      if (!(e instanceof WASIExitError)) throw e;
      const err = e;
      exitCode = err.code;
    }
    return exitCode;
  }
};
new WasiWorker(self);
export {
  WasiWorker
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
