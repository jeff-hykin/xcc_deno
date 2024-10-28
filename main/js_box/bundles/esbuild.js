// https://esm.sh/v135/buffer@6.0.3/es2022/buffer.bundle.mjs
var dr = Object.create
var $ = Object.defineProperty
var gr = Object.getOwnPropertyDescriptor
var mr = Object.getOwnPropertyNames
var Ir = Object.getPrototypeOf
var Fr = Object.prototype.hasOwnProperty
var b = (i, r) => () => (r || i((r = { exports: {} }).exports, r), r.exports)
var Ar = (i, r) => {
    for (var t in r) $(i, t, { get: r[t], enumerable: true })
}
var D = (i, r, t, n) => {
    if ((r && typeof r == "object") || typeof r == "function") for (let e of mr(r)) !Fr.call(i, e) && e !== t && $(i, e, { get: () => r[e], enumerable: !(n = gr(r, e)) || n.enumerable })
    return i
}
var I = (i, r, t) => (D(i, r, "default"), t && D(t, r, "default"))
var J = (i, r, t) => ((t = i != null ? dr(Ir(i)) : {}), D(r || !i || !i.__esModule ? $(t, "default", { value: i, enumerable: true }) : t, i))
var Q = b((L) => {
    "use strict"
    L.byteLength = Tr
    L.toByteArray = Cr
    L.fromByteArray = Lr
    var B = [],
        w = [],
        Ur = typeof Uint8Array < "u" ? Uint8Array : Array,
        P = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    for (F = 0, K = P.length; F < K; ++F) (B[F] = P[F]), (w[P.charCodeAt(F)] = F)
    var F, K
    w[45] = 62
    w[95] = 63
    function Z(i) {
        var r = i.length
        if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4")
        var t = i.indexOf("=")
        t === -1 && (t = r)
        var n = t === r ? 0 : 4 - (t % 4)
        return [t, n]
    }
    function Tr(i) {
        var r = Z(i),
            t = r[0],
            n = r[1]
        return ((t + n) * 3) / 4 - n
    }
    function Rr(i, r, t) {
        return ((r + t) * 3) / 4 - t
    }
    function Cr(i) {
        var r,
            t = Z(i),
            n = t[0],
            e = t[1],
            o = new Ur(Rr(i, n, e)),
            u = 0,
            f = e > 0 ? n - 4 : n,
            c
        for (c = 0; c < f; c += 4) (r = (w[i.charCodeAt(c)] << 18) | (w[i.charCodeAt(c + 1)] << 12) | (w[i.charCodeAt(c + 2)] << 6) | w[i.charCodeAt(c + 3)]), (o[u++] = (r >> 16) & 255), (o[u++] = (r >> 8) & 255), (o[u++] = r & 255)
        return e === 2 && ((r = (w[i.charCodeAt(c)] << 2) | (w[i.charCodeAt(c + 1)] >> 4)), (o[u++] = r & 255)), e === 1 && ((r = (w[i.charCodeAt(c)] << 10) | (w[i.charCodeAt(c + 1)] << 4) | (w[i.charCodeAt(c + 2)] >> 2)), (o[u++] = (r >> 8) & 255), (o[u++] = r & 255)), o
    }
    function _r(i) {
        return B[(i >> 18) & 63] + B[(i >> 12) & 63] + B[(i >> 6) & 63] + B[i & 63]
    }
    function Sr(i, r, t) {
        for (var n, e = [], o = r; o < t; o += 3) (n = ((i[o] << 16) & 16711680) + ((i[o + 1] << 8) & 65280) + (i[o + 2] & 255)), e.push(_r(n))
        return e.join("")
    }
    function Lr(i) {
        for (var r, t = i.length, n = t % 3, e = [], o = 16383, u = 0, f = t - n; u < f; u += o) e.push(Sr(i, u, u + o > f ? f : u + o))
        return n === 1 ? ((r = i[t - 1]), e.push(B[r >> 2] + B[(r << 4) & 63] + "==")) : n === 2 && ((r = (i[t - 2] << 8) + i[t - 1]), e.push(B[r >> 10] + B[(r >> 4) & 63] + B[(r << 2) & 63] + "=")), e.join("")
    }
})
var v = b((O) => {
    O.read = function (i, r, t, n, e) {
        var o,
            u,
            f = e * 8 - n - 1,
            c = (1 << f) - 1,
            l = c >> 1,
            s = -7,
            p = t ? e - 1 : 0,
            U = t ? -1 : 1,
            x = i[r + p]
        for (p += U, o = x & ((1 << -s) - 1), x >>= -s, s += f; s > 0; o = o * 256 + i[r + p], p += U, s -= 8);
        for (u = o & ((1 << -s) - 1), o >>= -s, s += n; s > 0; u = u * 256 + i[r + p], p += U, s -= 8);
        if (o === 0) o = 1 - l
        else {
            if (o === c) return u ? NaN : (x ? -1 : 1) * (1 / 0)
            ;(u = u + Math.pow(2, n)), (o = o - l)
        }
        return (x ? -1 : 1) * u * Math.pow(2, o - n)
    }
    O.write = function (i, r, t, n, e, o) {
        var u,
            f,
            c,
            l = o * 8 - e - 1,
            s = (1 << l) - 1,
            p = s >> 1,
            U = e === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            x = n ? 0 : o - 1,
            k = n ? 1 : -1,
            Er = r < 0 || (r === 0 && 1 / r < 0) ? 1 : 0
        for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? ((f = isNaN(r) ? 1 : 0), (u = s)) : ((u = Math.floor(Math.log(r) / Math.LN2)), r * (c = Math.pow(2, -u)) < 1 && (u--, (c *= 2)), u + p >= 1 ? (r += U / c) : (r += U * Math.pow(2, 1 - p)), r * c >= 2 && (u++, (c /= 2)), u + p >= s ? ((f = 0), (u = s)) : u + p >= 1 ? ((f = (r * c - 1) * Math.pow(2, e)), (u = u + p)) : ((f = r * Math.pow(2, p - 1) * Math.pow(2, e)), (u = 0))); e >= 8; i[t + x] = f & 255, x += k, f /= 256, e -= 8);
        for (u = (u << e) | f, l += e; l > 0; i[t + x] = u & 255, x += k, u /= 256, l -= 8);
        i[t + x - k] |= Er * 128
    }
})
var z = b((_) => {
    "use strict"
    var G = Q(),
        R = v(),
        rr = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null
    _.Buffer = h
    _.SlowBuffer = br
    _.INSPECT_MAX_BYTES = 50
    var M = 2147483647
    _.kMaxLength = M
    h.TYPED_ARRAY_SUPPORT = Mr()
    !h.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.")
    function Mr() {
        try {
            let i = new Uint8Array(1),
                r = {
                    foo: function () {
                        return 42
                    },
                }
            return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(i, r), i.foo() === 42
        } catch {
            return false
        }
    }
    Object.defineProperty(h.prototype, "parent", {
        enumerable: true,
        get: function () {
            if (h.isBuffer(this)) return this.buffer
        },
    })
    Object.defineProperty(h.prototype, "offset", {
        enumerable: true,
        get: function () {
            if (h.isBuffer(this)) return this.byteOffset
        },
    })
    function d(i) {
        if (i > M) throw new RangeError('The value "' + i + '" is invalid for option "size"')
        let r = new Uint8Array(i)
        return Object.setPrototypeOf(r, h.prototype), r
    }
    function h(i, r, t) {
        if (typeof i == "number") {
            if (typeof r == "string") throw new TypeError('The "string" argument must be of type string. Received type number')
            return j(i)
        }
        return er(i, r, t)
    }
    h.poolSize = 8192
    function er(i, r, t) {
        if (typeof i == "string") return kr(i, r)
        if (ArrayBuffer.isView(i)) return Dr(i)
        if (i == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i)
        if (E(i, ArrayBuffer) || (i && E(i.buffer, ArrayBuffer)) || (typeof SharedArrayBuffer < "u" && (E(i, SharedArrayBuffer) || (i && E(i.buffer, SharedArrayBuffer))))) return q(i, r, t)
        if (typeof i == "number") throw new TypeError('The "value" argument must not be of type number. Received type number')
        let n = i.valueOf && i.valueOf()
        if (n != null && n !== i) return h.from(n, r, t)
        let e = $r(i)
        if (e) return e
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof i[Symbol.toPrimitive] == "function") return h.from(i[Symbol.toPrimitive]("string"), r, t)
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i)
    }
    h.from = function (i, r, t) {
        return er(i, r, t)
    }
    Object.setPrototypeOf(h.prototype, Uint8Array.prototype)
    Object.setPrototypeOf(h, Uint8Array)
    function or(i) {
        if (typeof i != "number") throw new TypeError('"size" argument must be of type number')
        if (i < 0) throw new RangeError('The value "' + i + '" is invalid for option "size"')
    }
    function Nr(i, r, t) {
        return or(i), i <= 0 ? d(i) : r !== void 0 ? (typeof t == "string" ? d(i).fill(r, t) : d(i).fill(r)) : d(i)
    }
    h.alloc = function (i, r, t) {
        return Nr(i, r, t)
    }
    function j(i) {
        return or(i), d(i < 0 ? 0 : X(i) | 0)
    }
    h.allocUnsafe = function (i) {
        return j(i)
    }
    h.allocUnsafeSlow = function (i) {
        return j(i)
    }
    function kr(i, r) {
        if (((typeof r != "string" || r === "") && (r = "utf8"), !h.isEncoding(r))) throw new TypeError("Unknown encoding: " + r)
        let t = ur(i, r) | 0,
            n = d(t),
            e = n.write(i, r)
        return e !== t && (n = n.slice(0, e)), n
    }
    function Y(i) {
        let r = i.length < 0 ? 0 : X(i.length) | 0,
            t = d(r)
        for (let n = 0; n < r; n += 1) t[n] = i[n] & 255
        return t
    }
    function Dr(i) {
        if (E(i, Uint8Array)) {
            let r = new Uint8Array(i)
            return q(r.buffer, r.byteOffset, r.byteLength)
        }
        return Y(i)
    }
    function q(i, r, t) {
        if (r < 0 || i.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds')
        if (i.byteLength < r + (t || 0)) throw new RangeError('"length" is outside of buffer bounds')
        let n
        return r === void 0 && t === void 0 ? (n = new Uint8Array(i)) : t === void 0 ? (n = new Uint8Array(i, r)) : (n = new Uint8Array(i, r, t)), Object.setPrototypeOf(n, h.prototype), n
    }
    function $r(i) {
        if (h.isBuffer(i)) {
            let r = X(i.length) | 0,
                t = d(r)
            return t.length === 0 || i.copy(t, 0, 0, r), t
        }
        if (i.length !== void 0) return typeof i.length != "number" || V(i.length) ? d(0) : Y(i)
        if (i.type === "Buffer" && Array.isArray(i.data)) return Y(i.data)
    }
    function X(i) {
        if (i >= M) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + M.toString(16) + " bytes")
        return i | 0
    }
    function br(i) {
        return +i != i && (i = 0), h.alloc(+i)
    }
    h.isBuffer = function (r) {
        return r != null && r._isBuffer === true && r !== h.prototype
    }
    h.compare = function (r, t) {
        if ((E(r, Uint8Array) && (r = h.from(r, r.offset, r.byteLength)), E(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), !h.isBuffer(r) || !h.isBuffer(t))) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')
        if (r === t) return 0
        let n = r.length,
            e = t.length
        for (let o = 0, u = Math.min(n, e); o < u; ++o)
            if (r[o] !== t[o]) {
                ;(n = r[o]), (e = t[o])
                break
            }
        return n < e ? -1 : e < n ? 1 : 0
    }
    h.isEncoding = function (r) {
        switch (String(r).toLowerCase()) {
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
                return true
            default:
                return false
        }
    }
    h.concat = function (r, t) {
        if (!Array.isArray(r)) throw new TypeError('"list" argument must be an Array of Buffers')
        if (r.length === 0) return h.alloc(0)
        let n
        if (t === void 0) for (t = 0, n = 0; n < r.length; ++n) t += r[n].length
        let e = h.allocUnsafe(t),
            o = 0
        for (n = 0; n < r.length; ++n) {
            let u = r[n]
            if (E(u, Uint8Array)) o + u.length > e.length ? (h.isBuffer(u) || (u = h.from(u)), u.copy(e, o)) : Uint8Array.prototype.set.call(e, u, o)
            else if (h.isBuffer(u)) u.copy(e, o)
            else throw new TypeError('"list" argument must be an Array of Buffers')
            o += u.length
        }
        return e
    }
    function ur(i, r) {
        if (h.isBuffer(i)) return i.length
        if (ArrayBuffer.isView(i) || E(i, ArrayBuffer)) return i.byteLength
        if (typeof i != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof i)
        let t = i.length,
            n = arguments.length > 2 && arguments[2] === true
        if (!n && t === 0) return 0
        let e = false
        for (;;)
            switch (r) {
                case "ascii":
                case "latin1":
                case "binary":
                    return t
                case "utf8":
                case "utf-8":
                    return W(i).length
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return t * 2
                case "hex":
                    return t >>> 1
                case "base64":
                    return wr(i).length
                default:
                    if (e) return n ? -1 : W(i).length
                    ;(r = ("" + r).toLowerCase()), (e = true)
            }
    }
    h.byteLength = ur
    function Pr(i, r, t) {
        let n = false
        if (((r === void 0 || r < 0) && (r = 0), r > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || ((t >>>= 0), (r >>>= 0), t <= r))) return ""
        for (i || (i = "utf8"); ; )
            switch (i) {
                case "hex":
                    return zr(this, r, t)
                case "utf8":
                case "utf-8":
                    return fr(this, r, t)
                case "ascii":
                    return Hr(this, r, t)
                case "latin1":
                case "binary":
                    return Vr(this, r, t)
                case "base64":
                    return jr(this, r, t)
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return Jr(this, r, t)
                default:
                    if (n) throw new TypeError("Unknown encoding: " + i)
                    ;(i = (i + "").toLowerCase()), (n = true)
            }
    }
    h.prototype._isBuffer = true
    function A(i, r, t) {
        let n = i[r]
        ;(i[r] = i[t]), (i[t] = n)
    }
    h.prototype.swap16 = function () {
        let r = this.length
        if (r % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits")
        for (let t = 0; t < r; t += 2) A(this, t, t + 1)
        return this
    }
    h.prototype.swap32 = function () {
        let r = this.length
        if (r % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits")
        for (let t = 0; t < r; t += 4) A(this, t, t + 3), A(this, t + 1, t + 2)
        return this
    }
    h.prototype.swap64 = function () {
        let r = this.length
        if (r % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits")
        for (let t = 0; t < r; t += 8) A(this, t, t + 7), A(this, t + 1, t + 6), A(this, t + 2, t + 5), A(this, t + 3, t + 4)
        return this
    }
    h.prototype.toString = function () {
        let r = this.length
        return r === 0 ? "" : arguments.length === 0 ? fr(this, 0, r) : Pr.apply(this, arguments)
    }
    h.prototype.toLocaleString = h.prototype.toString
    h.prototype.equals = function (r) {
        if (!h.isBuffer(r)) throw new TypeError("Argument must be a Buffer")
        return this === r ? true : h.compare(this, r) === 0
    }
    h.prototype.inspect = function () {
        let r = "",
            t = _.INSPECT_MAX_BYTES
        return (
            (r = this.toString("hex", 0, t)
                .replace(/(.{2})/g, "$1 ")
                .trim()),
            this.length > t && (r += " ... "),
            "<Buffer " + r + ">"
        )
    }
    rr && (h.prototype[rr] = h.prototype.inspect)
    h.prototype.compare = function (r, t, n, e, o) {
        if ((E(r, Uint8Array) && (r = h.from(r, r.offset, r.byteLength)), !h.isBuffer(r))) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r)
        if ((t === void 0 && (t = 0), n === void 0 && (n = r ? r.length : 0), e === void 0 && (e = 0), o === void 0 && (o = this.length), t < 0 || n > r.length || e < 0 || o > this.length)) throw new RangeError("out of range index")
        if (e >= o && t >= n) return 0
        if (e >= o) return -1
        if (t >= n) return 1
        if (((t >>>= 0), (n >>>= 0), (e >>>= 0), (o >>>= 0), this === r)) return 0
        let u = o - e,
            f = n - t,
            c = Math.min(u, f),
            l = this.slice(e, o),
            s = r.slice(t, n)
        for (let p = 0; p < c; ++p)
            if (l[p] !== s[p]) {
                ;(u = l[p]), (f = s[p])
                break
            }
        return u < f ? -1 : f < u ? 1 : 0
    }
    function hr(i, r, t, n, e) {
        if (i.length === 0) return -1
        if ((typeof t == "string" ? ((n = t), (t = 0)) : t > 2147483647 ? (t = 2147483647) : t < -2147483648 && (t = -2147483648), (t = +t), V(t) && (t = e ? 0 : i.length - 1), t < 0 && (t = i.length + t), t >= i.length)) {
            if (e) return -1
            t = i.length - 1
        } else if (t < 0)
            if (e) t = 0
            else return -1
        if ((typeof r == "string" && (r = h.from(r, n)), h.isBuffer(r))) return r.length === 0 ? -1 : tr(i, r, t, n, e)
        if (typeof r == "number") return (r = r & 255), typeof Uint8Array.prototype.indexOf == "function" ? (e ? Uint8Array.prototype.indexOf.call(i, r, t) : Uint8Array.prototype.lastIndexOf.call(i, r, t)) : tr(i, [r], t, n, e)
        throw new TypeError("val must be string, number or Buffer")
    }
    function tr(i, r, t, n, e) {
        let o = 1,
            u = i.length,
            f = r.length
        if (n !== void 0 && ((n = String(n).toLowerCase()), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
            if (i.length < 2 || r.length < 2) return -1
            ;(o = 2), (u /= 2), (f /= 2), (t /= 2)
        }
        function c(s, p) {
            return o === 1 ? s[p] : s.readUInt16BE(p * o)
        }
        let l
        if (e) {
            let s = -1
            for (l = t; l < u; l++)
                if (c(i, l) === c(r, s === -1 ? 0 : l - s)) {
                    if ((s === -1 && (s = l), l - s + 1 === f)) return s * o
                } else s !== -1 && (l -= l - s), (s = -1)
        } else
            for (t + f > u && (t = u - f), l = t; l >= 0; l--) {
                let s = true
                for (let p = 0; p < f; p++)
                    if (c(i, l + p) !== c(r, p)) {
                        s = false
                        break
                    }
                if (s) return l
            }
        return -1
    }
    h.prototype.includes = function (r, t, n) {
        return this.indexOf(r, t, n) !== -1
    }
    h.prototype.indexOf = function (r, t, n) {
        return hr(this, r, t, n, true)
    }
    h.prototype.lastIndexOf = function (r, t, n) {
        return hr(this, r, t, n, false)
    }
    function Or(i, r, t, n) {
        t = Number(t) || 0
        let e = i.length - t
        n ? ((n = Number(n)), n > e && (n = e)) : (n = e)
        let o = r.length
        n > o / 2 && (n = o / 2)
        let u
        for (u = 0; u < n; ++u) {
            let f = parseInt(r.substr(u * 2, 2), 16)
            if (V(f)) return u
            i[t + u] = f
        }
        return u
    }
    function Gr(i, r, t, n) {
        return N(W(r, i.length - t), i, t, n)
    }
    function Yr(i, r, t, n) {
        return N(vr(r), i, t, n)
    }
    function qr(i, r, t, n) {
        return N(wr(r), i, t, n)
    }
    function Wr(i, r, t, n) {
        return N(rt(r, i.length - t), i, t, n)
    }
    h.prototype.write = function (r, t, n, e) {
        if (t === void 0) (e = "utf8"), (n = this.length), (t = 0)
        else if (n === void 0 && typeof t == "string") (e = t), (n = this.length), (t = 0)
        else if (isFinite(t)) (t = t >>> 0), isFinite(n) ? ((n = n >>> 0), e === void 0 && (e = "utf8")) : ((e = n), (n = void 0))
        else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
        let o = this.length - t
        if (((n === void 0 || n > o) && (n = o), (r.length > 0 && (n < 0 || t < 0)) || t > this.length)) throw new RangeError("Attempt to write outside buffer bounds")
        e || (e = "utf8")
        let u = false
        for (;;)
            switch (e) {
                case "hex":
                    return Or(this, r, t, n)
                case "utf8":
                case "utf-8":
                    return Gr(this, r, t, n)
                case "ascii":
                case "latin1":
                case "binary":
                    return Yr(this, r, t, n)
                case "base64":
                    return qr(this, r, t, n)
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return Wr(this, r, t, n)
                default:
                    if (u) throw new TypeError("Unknown encoding: " + e)
                    ;(e = ("" + e).toLowerCase()), (u = true)
            }
    }
    h.prototype.toJSON = function () {
        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) }
    }
    function jr(i, r, t) {
        return r === 0 && t === i.length ? G.fromByteArray(i) : G.fromByteArray(i.slice(r, t))
    }
    function fr(i, r, t) {
        t = Math.min(i.length, t)
        let n = [],
            e = r
        for (; e < t; ) {
            let o = i[e],
                u = null,
                f = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1
            if (e + f <= t) {
                let c, l, s, p
                switch (f) {
                    case 1:
                        o < 128 && (u = o)
                        break
                    case 2:
                        ;(c = i[e + 1]), (c & 192) === 128 && ((p = ((o & 31) << 6) | (c & 63)), p > 127 && (u = p))
                        break
                    case 3:
                        ;(c = i[e + 1]), (l = i[e + 2]), (c & 192) === 128 && (l & 192) === 128 && ((p = ((o & 15) << 12) | ((c & 63) << 6) | (l & 63)), p > 2047 && (p < 55296 || p > 57343) && (u = p))
                        break
                    case 4:
                        ;(c = i[e + 1]), (l = i[e + 2]), (s = i[e + 3]), (c & 192) === 128 && (l & 192) === 128 && (s & 192) === 128 && ((p = ((o & 15) << 18) | ((c & 63) << 12) | ((l & 63) << 6) | (s & 63)), p > 65535 && p < 1114112 && (u = p))
                }
            }
            u === null ? ((u = 65533), (f = 1)) : u > 65535 && ((u -= 65536), n.push(((u >>> 10) & 1023) | 55296), (u = 56320 | (u & 1023))), n.push(u), (e += f)
        }
        return Xr(n)
    }
    var ir = 4096
    function Xr(i) {
        let r = i.length
        if (r <= ir) return String.fromCharCode.apply(String, i)
        let t = "",
            n = 0
        for (; n < r; ) t += String.fromCharCode.apply(String, i.slice(n, (n += ir)))
        return t
    }
    function Hr(i, r, t) {
        let n = ""
        t = Math.min(i.length, t)
        for (let e = r; e < t; ++e) n += String.fromCharCode(i[e] & 127)
        return n
    }
    function Vr(i, r, t) {
        let n = ""
        t = Math.min(i.length, t)
        for (let e = r; e < t; ++e) n += String.fromCharCode(i[e])
        return n
    }
    function zr(i, r, t) {
        let n = i.length
        ;(!r || r < 0) && (r = 0), (!t || t < 0 || t > n) && (t = n)
        let e = ""
        for (let o = r; o < t; ++o) e += tt[i[o]]
        return e
    }
    function Jr(i, r, t) {
        let n = i.slice(r, t),
            e = ""
        for (let o = 0; o < n.length - 1; o += 2) e += String.fromCharCode(n[o] + n[o + 1] * 256)
        return e
    }
    h.prototype.slice = function (r, t) {
        let n = this.length
        ;(r = ~~r), (t = t === void 0 ? n : ~~t), r < 0 ? ((r += n), r < 0 && (r = 0)) : r > n && (r = n), t < 0 ? ((t += n), t < 0 && (t = 0)) : t > n && (t = n), t < r && (t = r)
        let e = this.subarray(r, t)
        return Object.setPrototypeOf(e, h.prototype), e
    }
    function a(i, r, t) {
        if (i % 1 !== 0 || i < 0) throw new RangeError("offset is not uint")
        if (i + r > t) throw new RangeError("Trying to access beyond buffer length")
    }
    h.prototype.readUintLE = h.prototype.readUIntLE = function (r, t, n) {
        ;(r = r >>> 0), (t = t >>> 0), n || a(r, t, this.length)
        let e = this[r],
            o = 1,
            u = 0
        for (; ++u < t && (o *= 256); ) e += this[r + u] * o
        return e
    }
    h.prototype.readUintBE = h.prototype.readUIntBE = function (r, t, n) {
        ;(r = r >>> 0), (t = t >>> 0), n || a(r, t, this.length)
        let e = this[r + --t],
            o = 1
        for (; t > 0 && (o *= 256); ) e += this[r + --t] * o
        return e
    }
    h.prototype.readUint8 = h.prototype.readUInt8 = function (r, t) {
        return (r = r >>> 0), t || a(r, 1, this.length), this[r]
    }
    h.prototype.readUint16LE = h.prototype.readUInt16LE = function (r, t) {
        return (r = r >>> 0), t || a(r, 2, this.length), this[r] | (this[r + 1] << 8)
    }
    h.prototype.readUint16BE = h.prototype.readUInt16BE = function (r, t) {
        return (r = r >>> 0), t || a(r, 2, this.length), (this[r] << 8) | this[r + 1]
    }
    h.prototype.readUint32LE = h.prototype.readUInt32LE = function (r, t) {
        return (r = r >>> 0), t || a(r, 4, this.length), (this[r] | (this[r + 1] << 8) | (this[r + 2] << 16)) + this[r + 3] * 16777216
    }
    h.prototype.readUint32BE = h.prototype.readUInt32BE = function (r, t) {
        return (r = r >>> 0), t || a(r, 4, this.length), this[r] * 16777216 + ((this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3])
    }
    h.prototype.readBigUInt64LE = g(function (r) {
        ;(r = r >>> 0), C(r, "offset")
        let t = this[r],
            n = this[r + 7]
        ;(t === void 0 || n === void 0) && S(r, this.length - 8)
        let e = t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24,
            o = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + n * 2 ** 24
        return BigInt(e) + (BigInt(o) << BigInt(32))
    })
    h.prototype.readBigUInt64BE = g(function (r) {
        ;(r = r >>> 0), C(r, "offset")
        let t = this[r],
            n = this[r + 7]
        ;(t === void 0 || n === void 0) && S(r, this.length - 8)
        let e = t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r],
            o = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n
        return (BigInt(e) << BigInt(32)) + BigInt(o)
    })
    h.prototype.readIntLE = function (r, t, n) {
        ;(r = r >>> 0), (t = t >>> 0), n || a(r, t, this.length)
        let e = this[r],
            o = 1,
            u = 0
        for (; ++u < t && (o *= 256); ) e += this[r + u] * o
        return (o *= 128), e >= o && (e -= Math.pow(2, 8 * t)), e
    }
    h.prototype.readIntBE = function (r, t, n) {
        ;(r = r >>> 0), (t = t >>> 0), n || a(r, t, this.length)
        let e = t,
            o = 1,
            u = this[r + --e]
        for (; e > 0 && (o *= 256); ) u += this[r + --e] * o
        return (o *= 128), u >= o && (u -= Math.pow(2, 8 * t)), u
    }
    h.prototype.readInt8 = function (r, t) {
        return (r = r >>> 0), t || a(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r]
    }
    h.prototype.readInt16LE = function (r, t) {
        ;(r = r >>> 0), t || a(r, 2, this.length)
        let n = this[r] | (this[r + 1] << 8)
        return n & 32768 ? n | 4294901760 : n
    }
    h.prototype.readInt16BE = function (r, t) {
        ;(r = r >>> 0), t || a(r, 2, this.length)
        let n = this[r + 1] | (this[r] << 8)
        return n & 32768 ? n | 4294901760 : n
    }
    h.prototype.readInt32LE = function (r, t) {
        return (r = r >>> 0), t || a(r, 4, this.length), this[r] | (this[r + 1] << 8) | (this[r + 2] << 16) | (this[r + 3] << 24)
    }
    h.prototype.readInt32BE = function (r, t) {
        return (r = r >>> 0), t || a(r, 4, this.length), (this[r] << 24) | (this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3]
    }
    h.prototype.readBigInt64LE = g(function (r) {
        ;(r = r >>> 0), C(r, "offset")
        let t = this[r],
            n = this[r + 7]
        ;(t === void 0 || n === void 0) && S(r, this.length - 8)
        let e = this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 + (n << 24)
        return (BigInt(e) << BigInt(32)) + BigInt(t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24)
    })
    h.prototype.readBigInt64BE = g(function (r) {
        ;(r = r >>> 0), C(r, "offset")
        let t = this[r],
            n = this[r + 7]
        ;(t === void 0 || n === void 0) && S(r, this.length - 8)
        let e = (t << 24) + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r]
        return (BigInt(e) << BigInt(32)) + BigInt(this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n)
    })
    h.prototype.readFloatLE = function (r, t) {
        return (r = r >>> 0), t || a(r, 4, this.length), R.read(this, r, true, 23, 4)
    }
    h.prototype.readFloatBE = function (r, t) {
        return (r = r >>> 0), t || a(r, 4, this.length), R.read(this, r, false, 23, 4)
    }
    h.prototype.readDoubleLE = function (r, t) {
        return (r = r >>> 0), t || a(r, 8, this.length), R.read(this, r, true, 52, 8)
    }
    h.prototype.readDoubleBE = function (r, t) {
        return (r = r >>> 0), t || a(r, 8, this.length), R.read(this, r, false, 52, 8)
    }
    function y(i, r, t, n, e, o) {
        if (!h.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance')
        if (r > e || r < o) throw new RangeError('"value" argument is out of bounds')
        if (t + n > i.length) throw new RangeError("Index out of range")
    }
    h.prototype.writeUintLE = h.prototype.writeUIntLE = function (r, t, n, e) {
        if (((r = +r), (t = t >>> 0), (n = n >>> 0), !e)) {
            let f = Math.pow(2, 8 * n) - 1
            y(this, r, t, n, f, 0)
        }
        let o = 1,
            u = 0
        for (this[t] = r & 255; ++u < n && (o *= 256); ) this[t + u] = (r / o) & 255
        return t + n
    }
    h.prototype.writeUintBE = h.prototype.writeUIntBE = function (r, t, n, e) {
        if (((r = +r), (t = t >>> 0), (n = n >>> 0), !e)) {
            let f = Math.pow(2, 8 * n) - 1
            y(this, r, t, n, f, 0)
        }
        let o = n - 1,
            u = 1
        for (this[t + o] = r & 255; --o >= 0 && (u *= 256); ) this[t + o] = (r / u) & 255
        return t + n
    }
    h.prototype.writeUint8 = h.prototype.writeUInt8 = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 1, 255, 0), (this[t] = r & 255), t + 1
    }
    h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 2, 65535, 0), (this[t] = r & 255), (this[t + 1] = r >>> 8), t + 2
    }
    h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 2, 65535, 0), (this[t] = r >>> 8), (this[t + 1] = r & 255), t + 2
    }
    h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 4, 4294967295, 0), (this[t + 3] = r >>> 24), (this[t + 2] = r >>> 16), (this[t + 1] = r >>> 8), (this[t] = r & 255), t + 4
    }
    h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 4, 4294967295, 0), (this[t] = r >>> 24), (this[t + 1] = r >>> 16), (this[t + 2] = r >>> 8), (this[t + 3] = r & 255), t + 4
    }
    function cr(i, r, t, n, e) {
        yr(r, n, e, i, t, 7)
        let o = Number(r & BigInt(4294967295))
        ;(i[t++] = o), (o = o >> 8), (i[t++] = o), (o = o >> 8), (i[t++] = o), (o = o >> 8), (i[t++] = o)
        let u = Number((r >> BigInt(32)) & BigInt(4294967295))
        return (i[t++] = u), (u = u >> 8), (i[t++] = u), (u = u >> 8), (i[t++] = u), (u = u >> 8), (i[t++] = u), t
    }
    function pr(i, r, t, n, e) {
        yr(r, n, e, i, t, 7)
        let o = Number(r & BigInt(4294967295))
        ;(i[t + 7] = o), (o = o >> 8), (i[t + 6] = o), (o = o >> 8), (i[t + 5] = o), (o = o >> 8), (i[t + 4] = o)
        let u = Number((r >> BigInt(32)) & BigInt(4294967295))
        return (i[t + 3] = u), (u = u >> 8), (i[t + 2] = u), (u = u >> 8), (i[t + 1] = u), (u = u >> 8), (i[t] = u), t + 8
    }
    h.prototype.writeBigUInt64LE = g(function (r, t = 0) {
        return cr(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"))
    })
    h.prototype.writeBigUInt64BE = g(function (r, t = 0) {
        return pr(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"))
    })
    h.prototype.writeIntLE = function (r, t, n, e) {
        if (((r = +r), (t = t >>> 0), !e)) {
            let c = Math.pow(2, 8 * n - 1)
            y(this, r, t, n, c - 1, -c)
        }
        let o = 0,
            u = 1,
            f = 0
        for (this[t] = r & 255; ++o < n && (u *= 256); ) r < 0 && f === 0 && this[t + o - 1] !== 0 && (f = 1), (this[t + o] = (((r / u) >> 0) - f) & 255)
        return t + n
    }
    h.prototype.writeIntBE = function (r, t, n, e) {
        if (((r = +r), (t = t >>> 0), !e)) {
            let c = Math.pow(2, 8 * n - 1)
            y(this, r, t, n, c - 1, -c)
        }
        let o = n - 1,
            u = 1,
            f = 0
        for (this[t + o] = r & 255; --o >= 0 && (u *= 256); ) r < 0 && f === 0 && this[t + o + 1] !== 0 && (f = 1), (this[t + o] = (((r / u) >> 0) - f) & 255)
        return t + n
    }
    h.prototype.writeInt8 = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 1, 127, -128), r < 0 && (r = 255 + r + 1), (this[t] = r & 255), t + 1
    }
    h.prototype.writeInt16LE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 2, 32767, -32768), (this[t] = r & 255), (this[t + 1] = r >>> 8), t + 2
    }
    h.prototype.writeInt16BE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 2, 32767, -32768), (this[t] = r >>> 8), (this[t + 1] = r & 255), t + 2
    }
    h.prototype.writeInt32LE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 4, 2147483647, -2147483648), (this[t] = r & 255), (this[t + 1] = r >>> 8), (this[t + 2] = r >>> 16), (this[t + 3] = r >>> 24), t + 4
    }
    h.prototype.writeInt32BE = function (r, t, n) {
        return (r = +r), (t = t >>> 0), n || y(this, r, t, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), (this[t] = r >>> 24), (this[t + 1] = r >>> 16), (this[t + 2] = r >>> 8), (this[t + 3] = r & 255), t + 4
    }
    h.prototype.writeBigInt64LE = g(function (r, t = 0) {
        return cr(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    })
    h.prototype.writeBigInt64BE = g(function (r, t = 0) {
        return pr(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    })
    function sr(i, r, t, n, e, o) {
        if (t + n > i.length) throw new RangeError("Index out of range")
        if (t < 0) throw new RangeError("Index out of range")
    }
    function lr(i, r, t, n, e) {
        return (r = +r), (t = t >>> 0), e || sr(i, r, t, 4, 34028234663852886e22, -34028234663852886e22), R.write(i, r, t, n, 23, 4), t + 4
    }
    h.prototype.writeFloatLE = function (r, t, n) {
        return lr(this, r, t, true, n)
    }
    h.prototype.writeFloatBE = function (r, t, n) {
        return lr(this, r, t, false, n)
    }
    function ar(i, r, t, n, e) {
        return (r = +r), (t = t >>> 0), e || sr(i, r, t, 8, 17976931348623157e292, -17976931348623157e292), R.write(i, r, t, n, 52, 8), t + 8
    }
    h.prototype.writeDoubleLE = function (r, t, n) {
        return ar(this, r, t, true, n)
    }
    h.prototype.writeDoubleBE = function (r, t, n) {
        return ar(this, r, t, false, n)
    }
    h.prototype.copy = function (r, t, n, e) {
        if (!h.isBuffer(r)) throw new TypeError("argument should be a Buffer")
        if ((n || (n = 0), !e && e !== 0 && (e = this.length), t >= r.length && (t = r.length), t || (t = 0), e > 0 && e < n && (e = n), e === n || r.length === 0 || this.length === 0)) return 0
        if (t < 0) throw new RangeError("targetStart out of bounds")
        if (n < 0 || n >= this.length) throw new RangeError("Index out of range")
        if (e < 0) throw new RangeError("sourceEnd out of bounds")
        e > this.length && (e = this.length), r.length - t < e - n && (e = r.length - t + n)
        let o = e - n
        return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, e) : Uint8Array.prototype.set.call(r, this.subarray(n, e), t), o
    }
    h.prototype.fill = function (r, t, n, e) {
        if (typeof r == "string") {
            if ((typeof t == "string" ? ((e = t), (t = 0), (n = this.length)) : typeof n == "string" && ((e = n), (n = this.length)), e !== void 0 && typeof e != "string")) throw new TypeError("encoding must be a string")
            if (typeof e == "string" && !h.isEncoding(e)) throw new TypeError("Unknown encoding: " + e)
            if (r.length === 1) {
                let u = r.charCodeAt(0)
                ;((e === "utf8" && u < 128) || e === "latin1") && (r = u)
            }
        } else typeof r == "number" ? (r = r & 255) : typeof r == "boolean" && (r = Number(r))
        if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index")
        if (n <= t) return this
        ;(t = t >>> 0), (n = n === void 0 ? this.length : n >>> 0), r || (r = 0)
        let o
        if (typeof r == "number") for (o = t; o < n; ++o) this[o] = r
        else {
            let u = h.isBuffer(r) ? r : h.from(r, e),
                f = u.length
            if (f === 0) throw new TypeError('The value "' + r + '" is invalid for argument "value"')
            for (o = 0; o < n - t; ++o) this[o + t] = u[o % f]
        }
        return this
    }
    var T = {}
    function H(i, r, t) {
        T[i] = class extends t {
            constructor() {
                super(), Object.defineProperty(this, "message", { value: r.apply(this, arguments), writable: true, configurable: true }), (this.name = `${this.name} [${i}]`), this.stack, delete this.name
            }
            get code() {
                return i
            }
            set code(e) {
                Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e, writable: true })
            }
            toString() {
                return `${this.name} [${i}]: ${this.message}`
            }
        }
    }
    H(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function (i) {
            return i ? `${i} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
        },
        RangeError
    )
    H(
        "ERR_INVALID_ARG_TYPE",
        function (i, r) {
            return `The "${i}" argument must be of type number. Received type ${typeof r}`
        },
        TypeError
    )
    H(
        "ERR_OUT_OF_RANGE",
        function (i, r, t) {
            let n = `The value of "${i}" is out of range.`,
                e = t
            return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? (e = nr(String(t))) : typeof t == "bigint" && ((e = String(t)), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (e = nr(e)), (e += "n")), (n += ` It must be ${r}. Received ${e}`), n
        },
        RangeError
    )
    function nr(i) {
        let r = "",
            t = i.length,
            n = i[0] === "-" ? 1 : 0
        for (; t >= n + 4; t -= 3) r = `_${i.slice(t - 3, t)}${r}`
        return `${i.slice(0, t)}${r}`
    }
    function Kr(i, r, t) {
        C(r, "offset"), (i[r] === void 0 || i[r + t] === void 0) && S(r, i.length - (t + 1))
    }
    function yr(i, r, t, n, e, o) {
        if (i > t || i < r) {
            let u = typeof r == "bigint" ? "n" : "",
                f
            throw (o > 3 ? (r === 0 || r === BigInt(0) ? (f = `>= 0${u} and < 2${u} ** ${(o + 1) * 8}${u}`) : (f = `>= -(2${u} ** ${(o + 1) * 8 - 1}${u}) and < 2 ** ${(o + 1) * 8 - 1}${u}`)) : (f = `>= ${r}${u} and <= ${t}${u}`), new T.ERR_OUT_OF_RANGE("value", f, i))
        }
        Kr(n, e, o)
    }
    function C(i, r) {
        if (typeof i != "number") throw new T.ERR_INVALID_ARG_TYPE(r, "number", i)
    }
    function S(i, r, t) {
        throw Math.floor(i) !== i ? (C(i, t), new T.ERR_OUT_OF_RANGE(t || "offset", "an integer", i)) : r < 0 ? new T.ERR_BUFFER_OUT_OF_BOUNDS() : new T.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${r}`, i)
    }
    var Zr = /[^+/0-9A-Za-z-_]/g
    function Qr(i) {
        if (((i = i.split("=")[0]), (i = i.trim().replace(Zr, "")), i.length < 2)) return ""
        for (; i.length % 4 !== 0; ) i = i + "="
        return i
    }
    function W(i, r) {
        r = r || 1 / 0
        let t,
            n = i.length,
            e = null,
            o = []
        for (let u = 0; u < n; ++u) {
            if (((t = i.charCodeAt(u)), t > 55295 && t < 57344)) {
                if (!e) {
                    if (t > 56319) {
                        ;(r -= 3) > -1 && o.push(239, 191, 189)
                        continue
                    } else if (u + 1 === n) {
                        ;(r -= 3) > -1 && o.push(239, 191, 189)
                        continue
                    }
                    e = t
                    continue
                }
                if (t < 56320) {
                    ;(r -= 3) > -1 && o.push(239, 191, 189), (e = t)
                    continue
                }
                t = (((e - 55296) << 10) | (t - 56320)) + 65536
            } else e && (r -= 3) > -1 && o.push(239, 191, 189)
            if (((e = null), t < 128)) {
                if ((r -= 1) < 0) break
                o.push(t)
            } else if (t < 2048) {
                if ((r -= 2) < 0) break
                o.push((t >> 6) | 192, (t & 63) | 128)
            } else if (t < 65536) {
                if ((r -= 3) < 0) break
                o.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (t & 63) | 128)
            } else if (t < 1114112) {
                if ((r -= 4) < 0) break
                o.push((t >> 18) | 240, ((t >> 12) & 63) | 128, ((t >> 6) & 63) | 128, (t & 63) | 128)
            } else throw new Error("Invalid code point")
        }
        return o
    }
    function vr(i) {
        let r = []
        for (let t = 0; t < i.length; ++t) r.push(i.charCodeAt(t) & 255)
        return r
    }
    function rt(i, r) {
        let t,
            n,
            e,
            o = []
        for (let u = 0; u < i.length && !((r -= 2) < 0); ++u) (t = i.charCodeAt(u)), (n = t >> 8), (e = t % 256), o.push(e), o.push(n)
        return o
    }
    function wr(i) {
        return G.toByteArray(Qr(i))
    }
    function N(i, r, t, n) {
        let e
        for (e = 0; e < n && !(e + t >= r.length || e >= i.length); ++e) r[e + t] = i[e]
        return e
    }
    function E(i, r) {
        return i instanceof r || (i != null && i.constructor != null && i.constructor.name != null && i.constructor.name === r.name)
    }
    function V(i) {
        return i !== i
    }
    var tt = (function () {
        let i = "0123456789abcdef",
            r = new Array(256)
        for (let t = 0; t < 16; ++t) {
            let n = t * 16
            for (let e = 0; e < 16; ++e) r[n + e] = i[t] + i[e]
        }
        return r
    })()
    function g(i) {
        return typeof BigInt > "u" ? it : i
    }
    function it() {
        throw new Error("BigInt not supported")
    }
})
var m = {}
Ar(m, { Buffer: () => nt, INSPECT_MAX_BYTES: () => ot, SlowBuffer: () => et, default: () => ft, kMaxLength: () => ut })
var Br = J(z())
I(m, J(z()))
var { Buffer: nt, SlowBuffer: et, INSPECT_MAX_BYTES: ot, kMaxLength: ut } = Br
var { default: xr, ...ht } = Br
var ft = xr !== void 0 ? xr : ht

// https://esm.sh/v135/esbuild-wasm@0.24.0/es2022/esbuild-wasm.mjs
var Dt = Object.create
var Ce = Object.defineProperty
var At = Object.getOwnPropertyDescriptor
var Ut = Object.getOwnPropertyNames
var Rt = Object.getPrototypeOf
var It = Object.prototype.hasOwnProperty
var Mt = (Y, z2) => () => (z2 || Y((z2 = { exports: {} }).exports, z2), z2.exports)
var Ft = (Y, z2) => {
    for (var K in z2) Ce(Y, K, { get: z2[K], enumerable: true })
}
var Oe = (Y, z2, K, ve) => {
    if ((z2 && typeof z2 == "object") || typeof z2 == "function") for (let ae of Ut(z2)) !It.call(Y, ae) && ae !== K && Ce(Y, ae, { get: () => z2[ae], enumerable: !(ve = At(z2, ae)) || ve.enumerable })
    return Y
}
var de = (Y, z2, K) => (Oe(Y, z2, "default"), K && Oe(K, z2, "default"))
var He = (Y, z2, K) => ((K = Y != null ? Dt(Rt(Y)) : {}), Oe(z2 || !Y || !Y.__esModule ? Ce(K, "default", { value: Y, enumerable: true }) : K, Y))
var Ae = Mt((en, De) => {
    ;((Y) => {
        "use strict"
        var z2 = Object.defineProperty,
            K = Object.getOwnPropertyDescriptor,
            ve = Object.getOwnPropertyNames,
            ae = Object.prototype.hasOwnProperty,
            Ke = (e, n) => {
                for (var r in n) z2(e, r, { get: n[r], enumerable: true })
            },
            Ze = (e, n, r, o) => {
                if ((n && typeof n == "object") || typeof n == "function") for (let g of ve(n)) !ae.call(e, g) && g !== r && z2(e, g, { get: () => n[g], enumerable: !(o = K(n, g)) || o.enumerable })
                return e
            },
            et2 = (e) => Ze(z2({}, "__esModule", { value: true }), e),
            le = (e, n, r) =>
                new Promise((o, g) => {
                    var y = (f) => {
                            try {
                                E(r.next(f))
                            } catch (U) {
                                g(U)
                            }
                        },
                        m2 = (f) => {
                            try {
                                E(r.throw(f))
                            } catch (U) {
                                g(U)
                            }
                        },
                        E = (f) => (f.done ? o(f.value) : Promise.resolve(f.value).then(y, m2))
                    E((r = r.apply(e, n)).next())
                }),
            be = {}
        Ke(be, { analyzeMetafile: () => bt, analyzeMetafileSync: () => Et, build: () => pt, buildSync: () => xt, context: () => yt, default: () => jt, formatMessages: () => vt, formatMessagesSync: () => kt, initialize: () => Tt, stop: () => St, transform: () => wt, transformSync: () => _t, version: () => gt }), (Y.exports = et2(be))
        function Ue(e) {
            let n = (o) => {
                    if (o === null) r.write8(0)
                    else if (typeof o == "boolean") r.write8(1), r.write8(+o)
                    else if (typeof o == "number") r.write8(2), r.write32(o | 0)
                    else if (typeof o == "string") r.write8(3), r.write(re(o))
                    else if (o instanceof Uint8Array) r.write8(4), r.write(o)
                    else if (o instanceof Array) {
                        r.write8(5), r.write32(o.length)
                        for (let g of o) n(g)
                    } else {
                        let g = Object.keys(o)
                        r.write8(6), r.write32(g.length)
                        for (let y of g) r.write(re(y)), n(o[y])
                    }
                },
                r = new Re()
            return r.write32(0), r.write32((e.id << 1) | +!e.isRequest), n(e.value), Pe(r.buf, r.len - 4, 0), r.buf.subarray(0, r.len)
        }
        function tt(e) {
            let n = () => {
                    switch (r.read8()) {
                        case 0:
                            return null
                        case 1:
                            return !!r.read8()
                        case 2:
                            return r.read32()
                        case 3:
                            return he(r.read())
                        case 4:
                            return r.read()
                        case 5: {
                            let m2 = r.read32(),
                                E = []
                            for (let f = 0; f < m2; f++) E.push(n())
                            return E
                        }
                        case 6: {
                            let m2 = r.read32(),
                                E = {}
                            for (let f = 0; f < m2; f++) E[he(r.read())] = n()
                            return E
                        }
                        default:
                            throw new Error("Invalid packet")
                    }
                },
                r = new Re(e),
                o = r.read32(),
                g = (o & 1) === 0
            o >>>= 1
            let y = n()
            if (r.ptr !== e.length) throw new Error("Invalid packet")
            return { id: o, isRequest: g, value: y }
        }
        var Re = class {
                constructor(e = new Uint8Array(1024)) {
                    ;(this.buf = e), (this.len = 0), (this.ptr = 0)
                }
                _write(e) {
                    if (this.len + e > this.buf.length) {
                        let n = new Uint8Array((this.len + e) * 2)
                        n.set(this.buf), (this.buf = n)
                    }
                    return (this.len += e), this.len - e
                }
                write8(e) {
                    let n = this._write(1)
                    this.buf[n] = e
                }
                write32(e) {
                    let n = this._write(4)
                    Pe(this.buf, e, n)
                }
                write(e) {
                    let n = this._write(4 + e.length)
                    Pe(this.buf, e.length, n), this.buf.set(e, n + 4)
                }
                _read(e) {
                    if (this.ptr + e > this.buf.length) throw new Error("Invalid packet")
                    return (this.ptr += e), this.ptr - e
                }
                read8() {
                    return this.buf[this._read(1)]
                }
                read32() {
                    return Ie(this.buf, this._read(4))
                }
                read() {
                    let e = this.read32(),
                        n = new Uint8Array(e),
                        r = this._read(n.length)
                    return n.set(this.buf.subarray(r, r + e)), n
                }
            },
            re,
            he,
            je
        if (typeof TextEncoder < "u" && typeof TextDecoder < "u") {
            let e = new TextEncoder(),
                n = new TextDecoder()
            ;(re = (r) => e.encode(r)), (he = (r) => n.decode(r)), (je = 'new TextEncoder().encode("")')
        } else if (typeof nt < "u")
            (re = (e) => nt.from(e)),
                (he = (e) => {
                    let { buffer: n, byteOffset: r, byteLength: o } = e
                    return nt.from(n, r, o).toString()
                }),
                (je = 'Buffer.from("")')
        else throw new Error("No UTF-8 codec found")
        if (!(re("") instanceof Uint8Array))
            throw new Error(`Invariant violation: "${je} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`)
        function Ie(e, n) {
            return e[n++] | (e[n++] << 8) | (e[n++] << 16) | (e[n++] << 24)
        }
        function Pe(e, n, r) {
            ;(e[r++] = n), (e[r++] = n >> 8), (e[r++] = n >> 16), (e[r++] = n >> 24)
        }
        var H = JSON.stringify,
            Me = "warning",
            Fe = "silent"
        function Ne(e) {
            if ((X(e, "target"), e.indexOf(",") >= 0)) throw new Error(`Invalid target: ${e}`)
            return e
        }
        var xe = () => null,
            B = (e) => (typeof e == "boolean" ? null : "a boolean"),
            j = (e) => (typeof e == "string" ? null : "a string"),
            _e = (e) => (e instanceof RegExp ? null : "a RegExp object"),
            ce = (e) => (typeof e == "number" && e === (e | 0) ? null : "an integer"),
            Ve = (e) => (typeof e == "function" ? null : "a function"),
            q = (e) => (Array.isArray(e) ? null : "an array"),
            ee = (e) => (typeof e == "object" && e !== null && !Array.isArray(e) ? null : "an object"),
            nt2 = (e) => (typeof e == "object" && e !== null ? null : "an array or an object"),
            rt = (e) => (e instanceof WebAssembly.Module ? null : "a WebAssembly.Module"),
            Le = (e) => (typeof e == "object" && !Array.isArray(e) ? null : "an object or null"),
            Be = (e) => (typeof e == "string" || typeof e == "boolean" ? null : "a string or a boolean"),
            st = (e) => (typeof e == "string" || (typeof e == "object" && e !== null && !Array.isArray(e)) ? null : "a string or an object"),
            it = (e) => (typeof e == "string" || Array.isArray(e) ? null : "a string or an array"),
            We = (e) => (typeof e == "string" || e instanceof Uint8Array ? null : "a string or a Uint8Array"),
            lt = (e) => (typeof e == "string" || e instanceof URL ? null : "a string or a URL")
        function s(e, n, r, o) {
            let g = e[r]
            if (((n[r + ""] = true), g === void 0)) return
            let y = o(g)
            if (y !== null) throw new Error(`${H(r)} must be ${y}`)
            return g
        }
        function Q2(e, n, r) {
            for (let o in e) if (!(o in n)) throw new Error(`Invalid option ${r}: ${H(o)}`)
        }
        function ot2(e) {
            let n = /* @__PURE__ */ Object.create(null),
                r = s(e, n, "wasmURL", lt),
                o = s(e, n, "wasmModule", rt),
                g = s(e, n, "worker", B)
            return Q2(e, n, "in initialize() call"), { wasmURL: r, wasmModule: o, worker: g }
        }
        function ze(e) {
            let n
            if (e !== void 0) {
                n = /* @__PURE__ */ Object.create(null)
                for (let r in e) {
                    let o = e[r]
                    if (typeof o == "string" || o === false) n[r] = o
                    else throw new Error(`Expected ${H(r)} in mangle cache to map to either a string or false`)
                }
            }
            return n
        }
        function ke(e, n, r, o, g) {
            let y = s(n, r, "color", B),
                m2 = s(n, r, "logLevel", j),
                E = s(n, r, "logLimit", ce)
            y !== void 0 ? e.push(`--color=${y}`) : o && e.push("--color=true"), e.push(`--log-level=${m2 || g}`), e.push(`--log-limit=${E || 0}`)
        }
        function X(e, n, r) {
            if (typeof e != "string") throw new Error(`Expected value for ${n}${r !== void 0 ? " " + H(r) : ""} to be a string, got ${typeof e} instead`)
            return e
        }
        function Ge(e, n, r) {
            let o = s(n, r, "legalComments", j),
                g = s(n, r, "sourceRoot", j),
                y = s(n, r, "sourcesContent", B),
                m2 = s(n, r, "target", it),
                E = s(n, r, "format", j),
                f = s(n, r, "globalName", j),
                U = s(n, r, "mangleProps", _e),
                R = s(n, r, "reserveProps", _e),
                O = s(n, r, "mangleQuoted", B),
                V = s(n, r, "minify", B),
                A = s(n, r, "minifySyntax", B),
                M = s(n, r, "minifyWhitespace", B),
                F = s(n, r, "minifyIdentifiers", B),
                $2 = s(n, r, "lineLimit", ce),
                G = s(n, r, "drop", q),
                T = s(n, r, "dropLabels", q),
                S = s(n, r, "charset", j),
                p = s(n, r, "treeShaking", B),
                d = s(n, r, "ignoreAnnotations", B),
                i = s(n, r, "jsx", j),
                c = s(n, r, "jsxFactory", j),
                u = s(n, r, "jsxFragment", j),
                w = s(n, r, "jsxImportSource", j),
                _ = s(n, r, "jsxDev", B),
                a = s(n, r, "jsxSideEffects", B),
                h = s(n, r, "define", ee),
                x = s(n, r, "logOverride", ee),
                t = s(n, r, "supported", ee),
                l = s(n, r, "pure", q),
                b2 = s(n, r, "keepNames", B),
                v2 = s(n, r, "platform", j),
                P = s(n, r, "tsconfigRaw", st)
            if ((o && e.push(`--legal-comments=${o}`), g !== void 0 && e.push(`--source-root=${g}`), y !== void 0 && e.push(`--sources-content=${y}`), m2 && (Array.isArray(m2) ? e.push(`--target=${Array.from(m2).map(Ne).join(",")}`) : e.push(`--target=${Ne(m2)}`)), E && e.push(`--format=${E}`), f && e.push(`--global-name=${f}`), v2 && e.push(`--platform=${v2}`), P && e.push(`--tsconfig-raw=${typeof P == "string" ? P : JSON.stringify(P)}`), V && e.push("--minify"), A && e.push("--minify-syntax"), M && e.push("--minify-whitespace"), F && e.push("--minify-identifiers"), $2 && e.push(`--line-limit=${$2}`), S && e.push(`--charset=${S}`), p !== void 0 && e.push(`--tree-shaking=${p}`), d && e.push("--ignore-annotations"), G)) for (let D2 of G) e.push(`--drop:${X(D2, "drop")}`)
            if (
                (T &&
                    e.push(
                        `--drop-labels=${Array.from(T)
                            .map((D2) => X(D2, "dropLabels"))
                            .join(",")}`
                    ),
                U && e.push(`--mangle-props=${U.source}`),
                R && e.push(`--reserve-props=${R.source}`),
                O !== void 0 && e.push(`--mangle-quoted=${O}`),
                i && e.push(`--jsx=${i}`),
                c && e.push(`--jsx-factory=${c}`),
                u && e.push(`--jsx-fragment=${u}`),
                w && e.push(`--jsx-import-source=${w}`),
                _ && e.push("--jsx-dev"),
                a && e.push("--jsx-side-effects"),
                h)
            )
                for (let D2 in h) {
                    if (D2.indexOf("=") >= 0) throw new Error(`Invalid define: ${D2}`)
                    e.push(`--define:${D2}=${X(h[D2], "define", D2)}`)
                }
            if (x)
                for (let D2 in x) {
                    if (D2.indexOf("=") >= 0) throw new Error(`Invalid log override: ${D2}`)
                    e.push(`--log-override:${D2}=${X(x[D2], "log override", D2)}`)
                }
            if (t)
                for (let D2 in t) {
                    if (D2.indexOf("=") >= 0) throw new Error(`Invalid supported: ${D2}`)
                    let C = t[D2]
                    if (typeof C != "boolean") throw new Error(`Expected value for supported ${H(D2)} to be a boolean, got ${typeof C} instead`)
                    e.push(`--supported:${D2}=${C}`)
                }
            if (l) for (let D2 of l) e.push(`--pure:${X(D2, "pure")}`)
            b2 && e.push("--keep-names")
        }
        function at(e, n, r, o, g) {
            var y
            let m2 = [],
                E = [],
                f = /* @__PURE__ */ Object.create(null),
                U = null,
                R = null
            ke(m2, n, f, r, o), Ge(m2, n, f)
            let O = s(n, f, "sourcemap", Be),
                V = s(n, f, "bundle", B),
                A = s(n, f, "splitting", B),
                M = s(n, f, "preserveSymlinks", B),
                F = s(n, f, "metafile", B),
                $2 = s(n, f, "outfile", j),
                G = s(n, f, "outdir", j),
                T = s(n, f, "outbase", j),
                S = s(n, f, "tsconfig", j),
                p = s(n, f, "resolveExtensions", q),
                d = s(n, f, "nodePaths", q),
                i = s(n, f, "mainFields", q),
                c = s(n, f, "conditions", q),
                u = s(n, f, "external", q),
                w = s(n, f, "packages", j),
                _ = s(n, f, "alias", ee),
                a = s(n, f, "loader", ee),
                h = s(n, f, "outExtension", ee),
                x = s(n, f, "publicPath", j),
                t = s(n, f, "entryNames", j),
                l = s(n, f, "chunkNames", j),
                b2 = s(n, f, "assetNames", j),
                v2 = s(n, f, "inject", q),
                P = s(n, f, "banner", ee),
                D2 = s(n, f, "footer", ee),
                C = s(n, f, "entryPoints", nt2),
                L = s(n, f, "absWorkingDir", j),
                I2 = s(n, f, "stdin", ee),
                N = (y = s(n, f, "write", B)) != null ? y : g,
                te = s(n, f, "allowOverwrite", B),
                J2 = s(n, f, "mangleCache", ee)
            if (((f.plugins = true), Q2(n, f, `in ${e}() call`), O && m2.push(`--sourcemap${O === true ? "" : `=${O}`}`), V && m2.push("--bundle"), te && m2.push("--allow-overwrite"), A && m2.push("--splitting"), M && m2.push("--preserve-symlinks"), F && m2.push("--metafile"), $2 && m2.push(`--outfile=${$2}`), G && m2.push(`--outdir=${G}`), T && m2.push(`--outbase=${T}`), S && m2.push(`--tsconfig=${S}`), w && m2.push(`--packages=${w}`), p)) {
                let k = []
                for (let W of p) {
                    if ((X(W, "resolve extension"), W.indexOf(",") >= 0)) throw new Error(`Invalid resolve extension: ${W}`)
                    k.push(W)
                }
                m2.push(`--resolve-extensions=${k.join(",")}`)
            }
            if ((x && m2.push(`--public-path=${x}`), t && m2.push(`--entry-names=${t}`), l && m2.push(`--chunk-names=${l}`), b2 && m2.push(`--asset-names=${b2}`), i)) {
                let k = []
                for (let W of i) {
                    if ((X(W, "main field"), W.indexOf(",") >= 0)) throw new Error(`Invalid main field: ${W}`)
                    k.push(W)
                }
                m2.push(`--main-fields=${k.join(",")}`)
            }
            if (c) {
                let k = []
                for (let W of c) {
                    if ((X(W, "condition"), W.indexOf(",") >= 0)) throw new Error(`Invalid condition: ${W}`)
                    k.push(W)
                }
                m2.push(`--conditions=${k.join(",")}`)
            }
            if (u) for (let k of u) m2.push(`--external:${X(k, "external")}`)
            if (_)
                for (let k in _) {
                    if (k.indexOf("=") >= 0) throw new Error(`Invalid package name in alias: ${k}`)
                    m2.push(`--alias:${k}=${X(_[k], "alias", k)}`)
                }
            if (P)
                for (let k in P) {
                    if (k.indexOf("=") >= 0) throw new Error(`Invalid banner file type: ${k}`)
                    m2.push(`--banner:${k}=${X(P[k], "banner", k)}`)
                }
            if (D2)
                for (let k in D2) {
                    if (k.indexOf("=") >= 0) throw new Error(`Invalid footer file type: ${k}`)
                    m2.push(`--footer:${k}=${X(D2[k], "footer", k)}`)
                }
            if (v2) for (let k of v2) m2.push(`--inject:${X(k, "inject")}`)
            if (a)
                for (let k in a) {
                    if (k.indexOf("=") >= 0) throw new Error(`Invalid loader extension: ${k}`)
                    m2.push(`--loader:${k}=${X(a[k], "loader", k)}`)
                }
            if (h)
                for (let k in h) {
                    if (k.indexOf("=") >= 0) throw new Error(`Invalid out extension: ${k}`)
                    m2.push(`--out-extension:${k}=${X(h[k], "out extension", k)}`)
                }
            if (C)
                if (Array.isArray(C))
                    for (let k = 0, W = C.length; k < W; k++) {
                        let ne = C[k]
                        if (typeof ne == "object" && ne !== null) {
                            let se = /* @__PURE__ */ Object.create(null),
                                Z = s(ne, se, "in", j),
                                we = s(ne, se, "out", j)
                            if ((Q2(ne, se, "in entry point at index " + k), Z === void 0)) throw new Error('Missing property "in" for entry point at index ' + k)
                            if (we === void 0) throw new Error('Missing property "out" for entry point at index ' + k)
                            E.push([we, Z])
                        } else E.push(["", X(ne, "entry point at index " + k)])
                    }
                else for (let k in C) E.push([k, X(C[k], "entry point", k)])
            if (I2) {
                let k = /* @__PURE__ */ Object.create(null),
                    W = s(I2, k, "contents", We),
                    ne = s(I2, k, "resolveDir", j),
                    se = s(I2, k, "sourcefile", j),
                    Z = s(I2, k, "loader", j)
                Q2(I2, k, 'in "stdin" object'), se && m2.push(`--sourcefile=${se}`), Z && m2.push(`--loader=${Z}`), ne && (R = ne), typeof W == "string" ? (U = re(W)) : W instanceof Uint8Array && (U = W)
            }
            let ge = []
            if (d) for (let k of d) (k += ""), ge.push(k)
            return { entries: E, flags: m2, write: N, stdinContents: U, stdinResolveDir: R, absWorkingDir: L, nodePaths: ge, mangleCache: ze(J2) }
        }
        function ct(e, n, r, o) {
            let g = [],
                y = /* @__PURE__ */ Object.create(null)
            ke(g, n, y, r, o), Ge(g, n, y)
            let m2 = s(n, y, "sourcemap", Be),
                E = s(n, y, "sourcefile", j),
                f = s(n, y, "loader", j),
                U = s(n, y, "banner", j),
                R = s(n, y, "footer", j),
                O = s(n, y, "mangleCache", ee)
            return Q2(n, y, `in ${e}() call`), m2 && g.push(`--sourcemap=${m2 === true ? "external" : m2}`), E && g.push(`--sourcefile=${E}`), f && g.push(`--loader=${f}`), U && g.push(`--banner=${U}`), R && g.push(`--footer=${R}`), { flags: g, mangleCache: ze(O) }
        }
        function ut2(e) {
            let n = {},
                r = { didClose: false, reason: "" },
                o = {},
                g = 0,
                y = 0,
                m2 = new Uint8Array(16 * 1024),
                E = 0,
                f = (S) => {
                    let p = E + S.length
                    if (p > m2.length) {
                        let i = new Uint8Array(p * 2)
                        i.set(m2), (m2 = i)
                    }
                    m2.set(S, E), (E += S.length)
                    let d = 0
                    for (; d + 4 <= E; ) {
                        let i = Ie(m2, d)
                        if (d + 4 + i > E) break
                        ;(d += 4), M(m2.subarray(d, d + i)), (d += i)
                    }
                    d > 0 && (m2.copyWithin(0, d, E), (E -= d))
                },
                U = (S) => {
                    ;(r.didClose = true), S && (r.reason = ": " + (S.message || S))
                    let p = "The service was stopped" + r.reason
                    for (let d in o) o[d](p, null)
                    o = {}
                },
                R = (S, p, d) => {
                    if (r.didClose) return d("The service is no longer running" + r.reason, null)
                    let i = g++
                    ;(o[i] = (c, u) => {
                        try {
                            d(c, u)
                        } finally {
                            S && S.unref()
                        }
                    }),
                        S && S.ref(),
                        e.writeToStdin(Ue({ id: i, isRequest: true, value: p }))
                },
                O = (S, p) => {
                    if (r.didClose) throw new Error("The service is no longer running" + r.reason)
                    e.writeToStdin(Ue({ id: S, isRequest: false, value: p }))
                },
                V = (S, p) =>
                    le(this, null, function* () {
                        try {
                            if (p.command === "ping") {
                                O(S, {})
                                return
                            }
                            if (typeof p.key == "number") {
                                let d = n[p.key]
                                if (!d) return
                                let i = d[p.command]
                                if (i) {
                                    yield i(S, p)
                                    return
                                }
                            }
                            throw new Error("Invalid command: " + p.command)
                        } catch (d) {
                            let i = [ue(d, e, null, void 0, "")]
                            try {
                                O(S, { errors: i })
                            } catch {}
                        }
                    }),
                A = true,
                M = (S) => {
                    if (A) {
                        A = false
                        let d = String.fromCharCode(...S)
                        if (d !== "0.24.0") throw new Error(`Cannot start service: Host version "0.24.0" does not match binary version ${H(d)}`)
                        return
                    }
                    let p = tt(S)
                    if (p.isRequest) V(p.id, p.value)
                    else {
                        let d = o[p.id]
                        delete o[p.id], p.value.error ? d(p.value.error, {}) : d(null, p.value)
                    }
                }
            return {
                readFromStdout: f,
                afterClose: U,
                service: {
                    buildOrContext: ({ callName: S, refs: p, options: d, isTTY: i, defaultWD: c, callback: u }) => {
                        let w = 0,
                            _ = y++,
                            a = {},
                            h = {
                                ref() {
                                    ++w === 1 && p && p.ref()
                                },
                                unref() {
                                    --w === 0 && (delete n[_], p && p.unref())
                                },
                            }
                        ;(n[_] = a),
                            h.ref(),
                            ft2(S, _, R, O, h, e, a, d, i, c, (x, t) => {
                                try {
                                    u(x, t)
                                } finally {
                                    h.unref()
                                }
                            })
                    },
                    transform: ({ callName: S, refs: p, input: d, options: i, isTTY: c, fs: u, callback: w }) => {
                        let _ = qe(),
                            a = (h) => {
                                try {
                                    if (typeof d != "string" && !(d instanceof Uint8Array)) throw new Error('The input to "transform" must be a string or a Uint8Array')
                                    let { flags: x, mangleCache: t } = ct(S, i, c, Fe),
                                        l = { command: "transform", flags: x, inputFS: h !== null, input: h !== null ? re(h) : typeof d == "string" ? re(d) : d }
                                    t && (l.mangleCache = t),
                                        R(p, l, (b2, v2) => {
                                            if (b2) return w(new Error(b2), null)
                                            let P = me(v2.errors, _),
                                                D2 = me(v2.warnings, _),
                                                C = 1,
                                                L = () => {
                                                    if (--C === 0) {
                                                        let I2 = { warnings: D2, code: v2.code, map: v2.map, mangleCache: void 0, legalComments: void 0 }
                                                        "legalComments" in v2 && (I2.legalComments = v2?.legalComments), v2.mangleCache && (I2.mangleCache = v2?.mangleCache), w(null, I2)
                                                    }
                                                }
                                            if (P.length > 0) return w(pe("Transform failed", P, D2), null)
                                            v2.codeFS &&
                                                (C++,
                                                u.readFile(v2.code, (I2, N) => {
                                                    I2 !== null ? w(I2, null) : ((v2.code = N), L())
                                                })),
                                                v2.mapFS &&
                                                    (C++,
                                                    u.readFile(v2.map, (I2, N) => {
                                                        I2 !== null ? w(I2, null) : ((v2.map = N), L())
                                                    })),
                                                L()
                                        })
                                } catch (x) {
                                    let t = []
                                    try {
                                        ke(t, i, {}, c, Fe)
                                    } catch {}
                                    let l = ue(x, e, _, void 0, "")
                                    R(p, { command: "error", flags: t, error: l }, () => {
                                        ;(l.detail = _.load(l.detail)), w(pe("Transform failed", [l], []), null)
                                    })
                                }
                            }
                        if ((typeof d == "string" || d instanceof Uint8Array) && d.length > 1024 * 1024) {
                            let h = a
                            a = () => u.writeFile(d, h)
                        }
                        a(null)
                    },
                    formatMessages: ({ callName: S, refs: p, messages: d, options: i, callback: c }) => {
                        if (!i) throw new Error(`Missing second argument in ${S}() call`)
                        let u = {},
                            w = s(i, u, "kind", j),
                            _ = s(i, u, "color", B),
                            a = s(i, u, "terminalWidth", ce)
                        if ((Q2(i, u, `in ${S}() call`), w === void 0)) throw new Error(`Missing "kind" in ${S}() call`)
                        if (w !== "error" && w !== "warning") throw new Error(`Expected "kind" to be "error" or "warning" in ${S}() call`)
                        let h = { command: "format-msgs", messages: ie(d, "messages", null, "", a), isWarning: w === "warning" }
                        _ !== void 0 && (h.color = _),
                            a !== void 0 && (h.terminalWidth = a),
                            R(p, h, (x, t) => {
                                if (x) return c(new Error(x), null)
                                c(null, t.messages)
                            })
                    },
                    analyzeMetafile: ({ callName: S, refs: p, metafile: d, options: i, callback: c }) => {
                        i === void 0 && (i = {})
                        let u = {},
                            w = s(i, u, "color", B),
                            _ = s(i, u, "verbose", B)
                        Q2(i, u, `in ${S}() call`)
                        let a = { command: "analyze-metafile", metafile: d }
                        w !== void 0 && (a.color = w),
                            _ !== void 0 && (a.verbose = _),
                            R(p, a, (h, x) => {
                                if (h) return c(new Error(h), null)
                                c(null, x.result)
                            })
                    },
                },
            }
        }
        function ft2(e, n, r, o, g, y, m2, E, f, U, R) {
            let O = qe(),
                V = e === "context",
                A = ($2, G) => {
                    let T = []
                    try {
                        ke(T, E, {}, f, Me)
                    } catch {}
                    let S = ue($2, y, O, void 0, G)
                    r(g, { command: "error", flags: T, error: S }, () => {
                        ;(S.detail = O.load(S.detail)), R(pe(V ? "Context failed" : "Build failed", [S], []), null)
                    })
                },
                M
            if (typeof E == "object") {
                let $2 = E.plugins
                if ($2 !== void 0) {
                    if (!Array.isArray($2)) return A(new Error('"plugins" must be an array'), "")
                    M = $2
                }
            }
            if (M && M.length > 0) {
                if (y.isSync) return A(new Error("Cannot use plugins in synchronous API calls"), "")
                dt(n, r, o, g, y, m2, E, M, O).then(
                    ($2) => {
                        if (!$2.ok) return A($2.error, $2.pluginName)
                        try {
                            F($2.requestPlugins, $2.runOnEndCallbacks, $2.scheduleOnDisposeCallbacks)
                        } catch (G) {
                            A(G, "")
                        }
                    },
                    ($2) => A($2, "")
                )
                return
            }
            try {
                F(
                    null,
                    ($2, G) => G([], []),
                    () => {}
                )
            } catch ($2) {
                A($2, "")
            }
            function F($2, G, T) {
                let S = y.hasFS,
                    { entries: p, flags: d, write: i, stdinContents: c, stdinResolveDir: u, absWorkingDir: w, nodePaths: _, mangleCache: a } = at(e, E, f, Me, S)
                if (i && !y.hasFS) throw new Error('The "write" option is unavailable in this environment')
                let h = { command: "build", key: n, entries: p, flags: d, write: i, stdinContents: c, stdinResolveDir: u, absWorkingDir: w || U, nodePaths: _, context: V }
                $2 && (h.plugins = $2), a && (h.mangleCache = a)
                let x = (b2, v2) => {
                        let P = { errors: me(b2.errors, O), warnings: me(b2.warnings, O), outputFiles: void 0, metafile: void 0, mangleCache: void 0 },
                            D2 = P.errors.slice(),
                            C = P.warnings.slice()
                        b2.outputFiles && (P.outputFiles = b2.outputFiles.map(mt)),
                            b2.metafile && (P.metafile = JSON.parse(b2.metafile)),
                            b2.mangleCache && (P.mangleCache = b2.mangleCache),
                            b2.writeToStdout !== void 0 && console.log(he(b2.writeToStdout).replace(/\n$/, "")),
                            G(P, (L, I2) => {
                                if (D2.length > 0 || L.length > 0) {
                                    let N = pe("Build failed", D2.concat(L), C.concat(I2))
                                    return v2(N, null, L, I2)
                                }
                                v2(null, P, L, I2)
                            })
                    },
                    t,
                    l
                V &&
                    (m2["on-end"] = (b2, v2) =>
                        new Promise((P) => {
                            x(v2, (D2, C, L, I2) => {
                                let N = { errors: L, warnings: I2 }
                                l && l(D2, C), (t = void 0), (l = void 0), o(b2, N), P()
                            })
                        })),
                    r(g, h, (b2, v2) => {
                        if (b2) return R(new Error(b2), null)
                        if (!V) return x(v2, (C, L) => (T(), R(C, L)))
                        if (v2.errors.length > 0) return R(pe("Context failed", v2.errors, v2.warnings), null)
                        let P = false,
                            D2 = {
                                rebuild: () => (
                                    t ||
                                        (t = new Promise((C, L) => {
                                            let I2
                                            l = (te, J2) => {
                                                I2 || (I2 = () => (te ? L(te) : C(J2)))
                                            }
                                            let N = () => {
                                                r(g, { command: "rebuild", key: n }, (J2, ge) => {
                                                    J2 ? L(new Error(J2)) : I2 ? I2() : N()
                                                })
                                            }
                                            N()
                                        })),
                                    t
                                ),
                                watch: (C = {}) =>
                                    new Promise((L, I2) => {
                                        if (!y.hasFS) throw new Error('Cannot use the "watch" API in this environment')
                                        Q2(C, {}, "in watch() call"),
                                            r(g, { command: "watch", key: n }, (J2) => {
                                                J2 ? I2(new Error(J2)) : L(void 0)
                                            })
                                    }),
                                serve: (C = {}) =>
                                    new Promise((L, I2) => {
                                        if (!y.hasFS) throw new Error('Cannot use the "serve" API in this environment')
                                        let N = {},
                                            te = s(C, N, "port", ce),
                                            J2 = s(C, N, "host", j),
                                            ge = s(C, N, "servedir", j),
                                            k = s(C, N, "keyfile", j),
                                            W = s(C, N, "certfile", j),
                                            ne = s(C, N, "fallback", j),
                                            se = s(C, N, "onRequest", Ve)
                                        Q2(C, N, "in serve() call")
                                        let Z = { command: "serve", key: n, onRequest: !!se }
                                        te !== void 0 && (Z.port = te),
                                            J2 !== void 0 && (Z.host = J2),
                                            ge !== void 0 && (Z.servedir = ge),
                                            k !== void 0 && (Z.keyfile = k),
                                            W !== void 0 && (Z.certfile = W),
                                            ne !== void 0 && (Z.fallback = ne),
                                            r(g, Z, (we, Pt) => {
                                                if (we) return I2(new Error(we))
                                                se &&
                                                    (m2["serve-request"] = (Ot, Ct) => {
                                                        se(Ct.args), o(Ot, {})
                                                    }),
                                                    L(Pt)
                                            })
                                    }),
                                cancel: () =>
                                    new Promise((C) => {
                                        if (P) return C()
                                        r(g, { command: "cancel", key: n }, () => {
                                            C()
                                        })
                                    }),
                                dispose: () =>
                                    new Promise((C) => {
                                        if (P) return C()
                                        ;(P = true),
                                            r(g, { command: "dispose", key: n }, () => {
                                                C(), T(), g.unref()
                                            })
                                    }),
                            }
                        g.ref(), R(null, D2)
                    })
            }
        }
        var dt = (e, n, r, o, g, y, m2, E, f) =>
            le(void 0, null, function* () {
                let U = [],
                    R = [],
                    O = {},
                    V = {},
                    A = [],
                    M = 0,
                    F = 0,
                    $2 = [],
                    G = false
                E = [...E]
                for (let p of E) {
                    let d = {}
                    if (typeof p != "object") throw new Error(`Plugin at index ${F} must be an object`)
                    let i = s(p, d, "name", j)
                    if (typeof i != "string" || i === "") throw new Error(`Plugin at index ${F} is missing a name`)
                    try {
                        let c = s(p, d, "setup", Ve)
                        if (typeof c != "function") throw new Error("Plugin is missing a setup function")
                        Q2(p, d, `on plugin ${H(i)}`)
                        let u = { name: i, onStart: false, onEnd: false, onResolve: [], onLoad: [] }
                        F++
                        let _ = c({
                            initialOptions: m2,
                            resolve: (a, h = {}) => {
                                if (!G) throw new Error('Cannot call "resolve" before plugin setup has completed')
                                if (typeof a != "string") throw new Error("The path to resolve must be a string")
                                let x = /* @__PURE__ */ Object.create(null),
                                    t = s(h, x, "pluginName", j),
                                    l = s(h, x, "importer", j),
                                    b2 = s(h, x, "namespace", j),
                                    v2 = s(h, x, "resolveDir", j),
                                    P = s(h, x, "kind", j),
                                    D2 = s(h, x, "pluginData", xe),
                                    C = s(h, x, "with", ee)
                                return (
                                    Q2(h, x, "in resolve() call"),
                                    new Promise((L, I2) => {
                                        let N = { command: "resolve", path: a, key: e, pluginName: i }
                                        if ((t != null && (N.pluginName = t), l != null && (N.importer = l), b2 != null && (N.namespace = b2), v2 != null && (N.resolveDir = v2), P != null)) N.kind = P
                                        else throw new Error('Must specify "kind" when calling "resolve"')
                                        D2 != null && (N.pluginData = f.store(D2)),
                                            C != null && (N.with = ht2(C, "with")),
                                            n(o, N, (te, J2) => {
                                                te !== null ? I2(new Error(te)) : L({ errors: me(J2.errors, f), warnings: me(J2.warnings, f), path: J2.path, external: J2.external, sideEffects: J2.sideEffects, namespace: J2.namespace, suffix: J2.suffix, pluginData: f.load(J2.pluginData) })
                                            })
                                    })
                                )
                            },
                            onStart(a) {
                                let h = 'This error came from the "onStart" callback registered here:',
                                    x = Ee(new Error(h), g, "onStart")
                                U.push({ name: i, callback: a, note: x }), (u.onStart = true)
                            },
                            onEnd(a) {
                                let h = 'This error came from the "onEnd" callback registered here:',
                                    x = Ee(new Error(h), g, "onEnd")
                                R.push({ name: i, callback: a, note: x }), (u.onEnd = true)
                            },
                            onResolve(a, h) {
                                let x = 'This error came from the "onResolve" callback registered here:',
                                    t = Ee(new Error(x), g, "onResolve"),
                                    l = {},
                                    b2 = s(a, l, "filter", _e),
                                    v2 = s(a, l, "namespace", j)
                                if ((Q2(a, l, `in onResolve() call for plugin ${H(i)}`), b2 == null)) throw new Error("onResolve() call is missing a filter")
                                let P = M++
                                ;(O[P] = { name: i, callback: h, note: t }), u.onResolve.push({ id: P, filter: b2.source, namespace: v2 || "" })
                            },
                            onLoad(a, h) {
                                let x = 'This error came from the "onLoad" callback registered here:',
                                    t = Ee(new Error(x), g, "onLoad"),
                                    l = {},
                                    b2 = s(a, l, "filter", _e),
                                    v2 = s(a, l, "namespace", j)
                                if ((Q2(a, l, `in onLoad() call for plugin ${H(i)}`), b2 == null)) throw new Error("onLoad() call is missing a filter")
                                let P = M++
                                ;(V[P] = { name: i, callback: h, note: t }), u.onLoad.push({ id: P, filter: b2.source, namespace: v2 || "" })
                            },
                            onDispose(a) {
                                A.push(a)
                            },
                            esbuild: g.esbuild,
                        })
                        _ && (yield _), $2.push(u)
                    } catch (c) {
                        return { ok: false, error: c, pluginName: i }
                    }
                }
                ;(y["on-start"] = (p, d) =>
                    le(void 0, null, function* () {
                        f.clear()
                        let i = { errors: [], warnings: [] }
                        yield Promise.all(
                            U.map((c) =>
                                le(void 0, [c], function* ({ name: u, callback: w, note: _ }) {
                                    try {
                                        let a = yield w()
                                        if (a != null) {
                                            if (typeof a != "object") throw new Error(`Expected onStart() callback in plugin ${H(u)} to return an object`)
                                            let h = {},
                                                x = s(a, h, "errors", q),
                                                t = s(a, h, "warnings", q)
                                            Q2(a, h, `from onStart() callback in plugin ${H(u)}`), x != null && i.errors.push(...ie(x, "errors", f, u, void 0)), t != null && i.warnings.push(...ie(t, "warnings", f, u, void 0))
                                        }
                                    } catch (a) {
                                        i.errors.push(ue(a, g, f, _ && _(), u))
                                    }
                                })
                            )
                        ),
                            r(p, i)
                    })),
                    (y["on-resolve"] = (p, d) =>
                        le(void 0, null, function* () {
                            let i = {},
                                c = "",
                                u,
                                w
                            for (let _ of d.ids)
                                try {
                                    ;({ name: c, callback: u, note: w } = O[_])
                                    let a = yield u({ path: d.path, importer: d.importer, namespace: d.namespace, resolveDir: d.resolveDir, kind: d.kind, pluginData: f.load(d.pluginData), with: d.with })
                                    if (a != null) {
                                        if (typeof a != "object") throw new Error(`Expected onResolve() callback in plugin ${H(c)} to return an object`)
                                        let h = {},
                                            x = s(a, h, "pluginName", j),
                                            t = s(a, h, "path", j),
                                            l = s(a, h, "namespace", j),
                                            b2 = s(a, h, "suffix", j),
                                            v2 = s(a, h, "external", B),
                                            P = s(a, h, "sideEffects", B),
                                            D2 = s(a, h, "pluginData", xe),
                                            C = s(a, h, "errors", q),
                                            L = s(a, h, "warnings", q),
                                            I2 = s(a, h, "watchFiles", q),
                                            N = s(a, h, "watchDirs", q)
                                        Q2(a, h, `from onResolve() callback in plugin ${H(c)}`), (i.id = _), x != null && (i.pluginName = x), t != null && (i.path = t), l != null && (i.namespace = l), b2 != null && (i.suffix = b2), v2 != null && (i.external = v2), P != null && (i.sideEffects = P), D2 != null && (i.pluginData = f.store(D2)), C != null && (i.errors = ie(C, "errors", f, c, void 0)), L != null && (i.warnings = ie(L, "warnings", f, c, void 0)), I2 != null && (i.watchFiles = Se(I2, "watchFiles")), N != null && (i.watchDirs = Se(N, "watchDirs"))
                                        break
                                    }
                                } catch (a) {
                                    i = { id: _, errors: [ue(a, g, f, w && w(), c)] }
                                    break
                                }
                            r(p, i)
                        })),
                    (y["on-load"] = (p, d) =>
                        le(void 0, null, function* () {
                            let i = {},
                                c = "",
                                u,
                                w
                            for (let _ of d.ids)
                                try {
                                    ;({ name: c, callback: u, note: w } = V[_])
                                    let a = yield u({ path: d.path, namespace: d.namespace, suffix: d.suffix, pluginData: f.load(d.pluginData), with: d.with })
                                    if (a != null) {
                                        if (typeof a != "object") throw new Error(`Expected onLoad() callback in plugin ${H(c)} to return an object`)
                                        let h = {},
                                            x = s(a, h, "pluginName", j),
                                            t = s(a, h, "contents", We),
                                            l = s(a, h, "resolveDir", j),
                                            b2 = s(a, h, "pluginData", xe),
                                            v2 = s(a, h, "loader", j),
                                            P = s(a, h, "errors", q),
                                            D2 = s(a, h, "warnings", q),
                                            C = s(a, h, "watchFiles", q),
                                            L = s(a, h, "watchDirs", q)
                                        Q2(a, h, `from onLoad() callback in plugin ${H(c)}`), (i.id = _), x != null && (i.pluginName = x), t instanceof Uint8Array ? (i.contents = t) : t != null && (i.contents = re(t)), l != null && (i.resolveDir = l), b2 != null && (i.pluginData = f.store(b2)), v2 != null && (i.loader = v2), P != null && (i.errors = ie(P, "errors", f, c, void 0)), D2 != null && (i.warnings = ie(D2, "warnings", f, c, void 0)), C != null && (i.watchFiles = Se(C, "watchFiles")), L != null && (i.watchDirs = Se(L, "watchDirs"))
                                        break
                                    }
                                } catch (a) {
                                    i = { id: _, errors: [ue(a, g, f, w && w(), c)] }
                                    break
                                }
                            r(p, i)
                        }))
                let T = (p, d) => d([], [])
                R.length > 0 &&
                    (T = (p, d) => {
                        le(void 0, null, function* () {
                            let i = [],
                                c = []
                            for (let { name: u, callback: w, note: _ } of R) {
                                let a, h
                                try {
                                    let x = yield w(p)
                                    if (x != null) {
                                        if (typeof x != "object") throw new Error(`Expected onEnd() callback in plugin ${H(u)} to return an object`)
                                        let t = {},
                                            l = s(x, t, "errors", q),
                                            b2 = s(x, t, "warnings", q)
                                        Q2(x, t, `from onEnd() callback in plugin ${H(u)}`), l != null && (a = ie(l, "errors", f, u, void 0)), b2 != null && (h = ie(b2, "warnings", f, u, void 0))
                                    }
                                } catch (x) {
                                    a = [ue(x, g, f, _ && _(), u)]
                                }
                                if (a) {
                                    i.push(...a)
                                    try {
                                        p.errors.push(...a)
                                    } catch {}
                                }
                                if (h) {
                                    c.push(...h)
                                    try {
                                        p.warnings.push(...h)
                                    } catch {}
                                }
                            }
                            d(i, c)
                        })
                    })
                let S = () => {
                    for (let p of A) setTimeout(() => p(), 0)
                }
                return (G = true), { ok: true, requestPlugins: $2, runOnEndCallbacks: T, scheduleOnDisposeCallbacks: S }
            })
        function qe() {
            let e = /* @__PURE__ */ new Map(),
                n = 0
            return {
                clear() {
                    e.clear()
                },
                load(r) {
                    return e.get(r)
                },
                store(r) {
                    if (r === void 0) return -1
                    let o = n++
                    return e.set(o, r), o
                },
            }
        }
        function Ee(e, n, r) {
            let o,
                g = false
            return () => {
                if (g) return o
                g = true
                try {
                    let y = (e.stack + "").split(`
`)
                    y.splice(1, 1)
                    let m2 = Je(n, y, r)
                    if (m2) return (o = { text: e.message, location: m2 }), o
                } catch {}
            }
        }
        function ue(e, n, r, o, g) {
            let y = "Internal error",
                m2 = null
            try {
                y = ((e && e.message) || e) + ""
            } catch {}
            try {
                m2 = Je(
                    n,
                    (e.stack + "").split(`
`),
                    ""
                )
            } catch {}
            return { id: "", pluginName: g, text: y, location: m2, notes: o ? [o] : [], detail: r ? r.store(e) : -1 }
        }
        function Je(e, n, r) {
            let o = "    at "
            if (e.readFileSync && !n[0].startsWith(o) && n[1].startsWith(o))
                for (let g = 1; g < n.length; g++) {
                    let y = n[g]
                    if (y.startsWith(o))
                        for (y = y.slice(o.length); ; ) {
                            let m2 = /^(?:new |async )?\S+ \((.*)\)$/.exec(y)
                            if (m2) {
                                y = m2[1]
                                continue
                            }
                            if (((m2 = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(y)), m2)) {
                                y = m2[1]
                                continue
                            }
                            if (((m2 = /^(\S+):(\d+):(\d+)$/.exec(y)), m2)) {
                                let E
                                try {
                                    E = e.readFileSync(m2[1], "utf8")
                                } catch {
                                    break
                                }
                                let f = E.split(/\r\n|\r|\n|\u2028|\u2029/)[+m2[2] - 1] || "",
                                    U = +m2[3] - 1,
                                    R = f.slice(U, U + r.length) === r ? r.length : 0
                                return {
                                    file: m2[1],
                                    namespace: "file",
                                    line: +m2[2],
                                    column: re(f.slice(0, U)).length,
                                    length: re(f.slice(U, U + R)).length,
                                    lineText:
                                        f +
                                        `
` +
                                        n.slice(1).join(`
`),
                                    suggestion: "",
                                }
                            }
                            break
                        }
                }
            return null
        }
        function pe(e, n, r) {
            let o = 5
            e +=
                n.length < 1
                    ? ""
                    : ` with ${n.length} error${n.length < 2 ? "" : "s"}:` +
                      n
                          .slice(0, o + 1)
                          .map((y, m2) => {
                              if (m2 === o)
                                  return `
...`
                              if (!y.location)
                                  return `
error: ${y.text}`
                              let { file: E, line: f, column: U } = y.location,
                                  R = y.pluginName ? `[plugin: ${y.pluginName}] ` : ""
                              return `
${E}:${f}:${U}: ERROR: ${R}${y.text}`
                          })
                          .join("")
            let g = new Error(e)
            for (let [y, m2] of [
                ["errors", n],
                ["warnings", r],
            ])
                Object.defineProperty(g, y, { configurable: true, enumerable: true, get: () => m2, set: (E) => Object.defineProperty(g, y, { configurable: true, enumerable: true, value: E }) })
            return g
        }
        function me(e, n) {
            for (let r of e) r.detail = n.load(r.detail)
            return e
        }
        function Ye(e, n, r) {
            if (e == null) return null
            let o = {},
                g = s(e, o, "file", j),
                y = s(e, o, "namespace", j),
                m2 = s(e, o, "line", ce),
                E = s(e, o, "column", ce),
                f = s(e, o, "length", ce),
                U = s(e, o, "lineText", j),
                R = s(e, o, "suggestion", j)
            if ((Q2(e, o, n), U)) {
                let O = U.slice(0, (E && E > 0 ? E : 0) + (f && f > 0 ? f : 0) + (r && r > 0 ? r : 80))
                !/[\x7F-\uFFFF]/.test(O) && !/\n/.test(U) && (U = O)
            }
            return { file: g || "", namespace: y || "", line: m2 || 0, column: E || 0, length: f || 0, lineText: U || "", suggestion: R || "" }
        }
        function ie(e, n, r, o, g) {
            let y = [],
                m2 = 0
            for (let E of e) {
                let f = {},
                    U = s(E, f, "id", j),
                    R = s(E, f, "pluginName", j),
                    O = s(E, f, "text", j),
                    V = s(E, f, "location", Le),
                    A = s(E, f, "notes", q),
                    M = s(E, f, "detail", xe),
                    F = `in element ${m2} of "${n}"`
                Q2(E, f, F)
                let $2 = []
                if (A)
                    for (let G of A) {
                        let T = {},
                            S = s(G, T, "text", j),
                            p = s(G, T, "location", Le)
                        Q2(G, T, F), $2.push({ text: S || "", location: Ye(p, F, g) })
                    }
                y.push({ id: U || "", pluginName: R || o, text: O || "", location: Ye(V, F, g), notes: $2, detail: r ? r.store(M) : -1 }), m2++
            }
            return y
        }
        function Se(e, n) {
            let r = []
            for (let o of e) {
                if (typeof o != "string") throw new Error(`${H(n)} must be an array of strings`)
                r.push(o)
            }
            return r
        }
        function ht2(e, n) {
            let r = /* @__PURE__ */ Object.create(null)
            for (let o in e) {
                let g = e[o]
                if (typeof g != "string") throw new Error(`key ${H(o)} in object ${H(n)} must be a string`)
                r[o] = g
            }
            return r
        }
        function mt({ path: e, contents: n, hash: r }) {
            let o = null
            return {
                path: e,
                contents: n,
                hash: r,
                get text() {
                    let g = this.contents
                    return (o === null || g !== n) && ((n = g), (o = he(g))), o
                },
            }
        }
        var gt = "0.24.0",
            pt = (e) => ye().build(e),
            yt = (e) => ye().context(e),
            wt = (e, n) => ye().transform(e, n),
            vt = (e, n) => ye().formatMessages(e, n),
            bt = (e, n) => ye().analyzeMetafile(e, n),
            xt = () => {
                throw new Error('The "buildSync" API only works in node')
            },
            _t = () => {
                throw new Error('The "transformSync" API only works in node')
            },
            kt = () => {
                throw new Error('The "formatMessagesSync" API only works in node')
            },
            Et = () => {
                throw new Error('The "analyzeMetafileSync" API only works in node')
            },
            St = () => (Te && Te(), Promise.resolve()),
            fe,
            Te,
            $e,
            ye = () => {
                if ($e) return $e
                throw fe ? new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this') : new Error('You need to call "initialize" before calling this')
            },
            Tt = (e) => {
                e = ot2(e || {})
                let n = e.wasmURL,
                    r = e.wasmModule,
                    o = e.worker !== false
                if (!n && !r) throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option')
                if (fe) throw new Error('Cannot call "initialize" more than once')
                return (
                    (fe = $t(n || "", r, o)),
                    fe.catch(() => {
                        fe = void 0
                    }),
                    fe
                )
            },
            $t = (e, n, r) =>
                le(void 0, null, function* () {
                    let o,
                        g,
                        y = new Promise((O) => (g = O))
                    if (r) {
                        let O = new Blob(
                            [
                                `onmessage=((postMessage) => {
      // Copyright 2018 The Go Authors. All rights reserved.
      // Use of this source code is governed by a BSD-style
      // license that can be found in the LICENSE file.
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      let onmessage;
      let globalThis = {};
      for (let o = self; o; o = Object.getPrototypeOf(o))
        for (let k of Object.getOwnPropertyNames(o))
          if (!(k in globalThis))
            Object.defineProperty(globalThis, k, { get: () => self[k] });
      "use strict";
      (() => {
        const enosys = () => {
          const err = new Error("not implemented");
          err.code = "ENOSYS";
          return err;
        };
        if (!globalThis.fs) {
          let outputBuf = "";
          globalThis.fs = {
            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
            // unused
            writeSync(fd, buf) {
              outputBuf += decoder.decode(buf);
              const nl = outputBuf.lastIndexOf("\\n");
              if (nl != -1) {
                console.log(outputBuf.substring(0, nl));
                outputBuf = outputBuf.substring(nl + 1);
              }
              return buf.length;
            },
            write(fd, buf, offset, length, position, callback) {
              if (offset !== 0 || length !== buf.length || position !== null) {
                callback(enosys());
                return;
              }
              const n = this.writeSync(fd, buf);
              callback(null, n);
            },
            chmod(path, mode, callback) {
              callback(enosys());
            },
            chown(path, uid, gid, callback) {
              callback(enosys());
            },
            close(fd, callback) {
              callback(enosys());
            },
            fchmod(fd, mode, callback) {
              callback(enosys());
            },
            fchown(fd, uid, gid, callback) {
              callback(enosys());
            },
            fstat(fd, callback) {
              callback(enosys());
            },
            fsync(fd, callback) {
              callback(null);
            },
            ftruncate(fd, length, callback) {
              callback(enosys());
            },
            lchown(path, uid, gid, callback) {
              callback(enosys());
            },
            link(path, link, callback) {
              callback(enosys());
            },
            lstat(path, callback) {
              callback(enosys());
            },
            mkdir(path, perm, callback) {
              callback(enosys());
            },
            open(path, flags, mode, callback) {
              callback(enosys());
            },
            read(fd, buffer, offset, length, position, callback) {
              callback(enosys());
            },
            readdir(path, callback) {
              callback(enosys());
            },
            readlink(path, callback) {
              callback(enosys());
            },
            rename(from, to, callback) {
              callback(enosys());
            },
            rmdir(path, callback) {
              callback(enosys());
            },
            stat(path, callback) {
              callback(enosys());
            },
            symlink(path, link, callback) {
              callback(enosys());
            },
            truncate(path, length, callback) {
              callback(enosys());
            },
            unlink(path, callback) {
              callback(enosys());
            },
            utimes(path, atime, mtime, callback) {
              callback(enosys());
            }
          };
        }
        if (!globalThis.process) {
          globalThis.process = {
            getuid() {
              return -1;
            },
            getgid() {
              return -1;
            },
            geteuid() {
              return -1;
            },
            getegid() {
              return -1;
            },
            getgroups() {
              throw enosys();
            },
            pid: -1,
            ppid: -1,
            umask() {
              throw enosys();
            },
            cwd() {
              throw enosys();
            },
            chdir() {
              throw enosys();
            }
          };
        }
        if (!globalThis.crypto) {
          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
        }
        if (!globalThis.performance) {
          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
        }
        if (!globalThis.TextEncoder) {
          throw new Error("globalThis.TextEncoder is not available, polyfill required");
        }
        if (!globalThis.TextDecoder) {
          throw new Error("globalThis.TextDecoder is not available, polyfill required");
        }
        const encoder = new TextEncoder("utf-8");
        const decoder = new TextDecoder("utf-8");
        globalThis.Go = class {
          constructor() {
            this.argv = ["js"];
            this.env = {};
            this.exit = (code) => {
              if (code !== 0) {
                console.warn("exit code:", code);
              }
            };
            this._exitPromise = new Promise((resolve) => {
              this._resolveExitPromise = resolve;
            });
            this._pendingEvent = null;
            this._scheduledTimeouts = /* @__PURE__ */ new Map();
            this._nextCallbackTimeoutID = 1;
            const setInt64 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
            };
            const setInt32 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
            };
            const getInt64 = (addr) => {
              const low = this.mem.getUint32(addr + 0, true);
              const high = this.mem.getInt32(addr + 4, true);
              return low + high * 4294967296;
            };
            const loadValue = (addr) => {
              const f = this.mem.getFloat64(addr, true);
              if (f === 0) {
                return void 0;
              }
              if (!isNaN(f)) {
                return f;
              }
              const id = this.mem.getUint32(addr, true);
              return this._values[id];
            };
            const storeValue = (addr, v) => {
              const nanHead = 2146959360;
              if (typeof v === "number" && v !== 0) {
                if (isNaN(v)) {
                  this.mem.setUint32(addr + 4, nanHead, true);
                  this.mem.setUint32(addr, 0, true);
                  return;
                }
                this.mem.setFloat64(addr, v, true);
                return;
              }
              if (v === void 0) {
                this.mem.setFloat64(addr, 0, true);
                return;
              }
              let id = this._ids.get(v);
              if (id === void 0) {
                id = this._idPool.pop();
                if (id === void 0) {
                  id = this._values.length;
                }
                this._values[id] = v;
                this._goRefCounts[id] = 0;
                this._ids.set(v, id);
              }
              this._goRefCounts[id]++;
              let typeFlag = 0;
              switch (typeof v) {
                case "object":
                  if (v !== null) {
                    typeFlag = 1;
                  }
                  break;
                case "string":
                  typeFlag = 2;
                  break;
                case "symbol":
                  typeFlag = 3;
                  break;
                case "function":
                  typeFlag = 4;
                  break;
              }
              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
              this.mem.setUint32(addr, id, true);
            };
            const loadSlice = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, array, len);
            };
            const loadSliceOfValues = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              const a = new Array(len);
              for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
              }
              return a;
            };
            const loadString = (addr) => {
              const saddr = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
            };
            const timeOrigin = Date.now() - performance.now();
            this.importObject = {
              _gotest: {
                add: (a, b) => a + b
              },
              gojs: {
                // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
                // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
                // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
                // This changes the SP, thus we have to update the SP used by the imported function.
                // func wasmExit(code int32)
                "runtime.wasmExit": (sp) => {
                  sp >>>= 0;
                  const code = this.mem.getInt32(sp + 8, true);
                  this.exited = true;
                  delete this._inst;
                  delete this._values;
                  delete this._goRefCounts;
                  delete this._ids;
                  delete this._idPool;
                  this.exit(code);
                },
                // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
                "runtime.wasmWrite": (sp) => {
                  sp >>>= 0;
                  const fd = getInt64(sp + 8);
                  const p = getInt64(sp + 16);
                  const n = this.mem.getInt32(sp + 24, true);
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                // func resetMemoryDataView()
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                // func nanotime1() int64
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                // func walltime() (sec int64, nsec int32)
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = (/* @__PURE__ */ new Date()).getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                },
                // func scheduleTimeoutEvent(delay int64) int32
                "runtime.scheduleTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++;
                  this._scheduledTimeouts.set(id, setTimeout(
                    () => {
                      this._resume();
                      while (this._scheduledTimeouts.has(id)) {
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8)
                  ));
                  this.mem.setInt32(sp + 16, id, true);
                },
                // func clearTimeoutEvent(id int32)
                "runtime.clearTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getInt32(sp + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(id));
                  this._scheduledTimeouts.delete(id);
                },
                // func getRandomData(r []byte)
                "runtime.getRandomData": (sp) => {
                  sp >>>= 0;
                  crypto.getRandomValues(loadSlice(sp + 8));
                },
                // func finalizeRef(v ref)
                "syscall/js.finalizeRef": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getUint32(sp + 8, true);
                  this._goRefCounts[id]--;
                  if (this._goRefCounts[id] === 0) {
                    const v = this._values[id];
                    this._values[id] = null;
                    this._ids.delete(v);
                    this._idPool.push(id);
                  }
                },
                // func stringVal(value string) ref
                "syscall/js.stringVal": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, loadString(sp + 8));
                },
                // func valueGet(v ref, p string) ref
                "syscall/js.valueGet": (sp) => {
                  sp >>>= 0;
                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                  sp = this._inst.exports.getsp() >>> 0;
                  storeValue(sp + 32, result);
                },
                // func valueSet(v ref, p string, x ref)
                "syscall/js.valueSet": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                },
                // func valueDelete(v ref, p string)
                "syscall/js.valueDelete": (sp) => {
                  sp >>>= 0;
                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                },
                // func valueIndex(v ref, i int) ref
                "syscall/js.valueIndex": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                },
                // valueSetIndex(v ref, i int, x ref)
                "syscall/js.valueSetIndex": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                },
                // func valueCall(v ref, m string, args []ref) (ref, bool)
                "syscall/js.valueCall": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const m = Reflect.get(v, loadString(sp + 16));
                    const args = loadSliceOfValues(sp + 32);
                    const result = Reflect.apply(m, v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, err);
                    this.mem.setUint8(sp + 64, 0);
                  }
                },
                // func valueInvoke(v ref, args []ref) (ref, bool)
                "syscall/js.valueInvoke": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.apply(v, void 0, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueNew(v ref, args []ref) (ref, bool)
                "syscall/js.valueNew": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.construct(v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueLength(v ref) int
                "syscall/js.valueLength": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                },
                // valuePrepareString(v ref) (ref, int)
                "syscall/js.valuePrepareString": (sp) => {
                  sp >>>= 0;
                  const str = encoder.encode(String(loadValue(sp + 8)));
                  storeValue(sp + 16, str);
                  setInt64(sp + 24, str.length);
                },
                // valueLoadString(v ref, b []byte)
                "syscall/js.valueLoadString": (sp) => {
                  sp >>>= 0;
                  const str = loadValue(sp + 8);
                  loadSlice(sp + 16).set(str);
                },
                // func valueInstanceOf(v ref, t ref) bool
                "syscall/js.valueInstanceOf": (sp) => {
                  sp >>>= 0;
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                },
                // func copyBytesToGo(dst []byte, src ref) (int, bool)
                "syscall/js.copyBytesToGo": (sp) => {
                  sp >>>= 0;
                  const dst = loadSlice(sp + 8);
                  const src = loadValue(sp + 32);
                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                // func copyBytesToJS(dst ref, src []byte) (int, bool)
                "syscall/js.copyBytesToJS": (sp) => {
                  sp >>>= 0;
                  const dst = loadValue(sp + 8);
                  const src = loadSlice(sp + 16);
                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                "debug": (value) => {
                  console.log(value);
                }
              }
            };
          }
          run(instance) {
            return __async(this, null, function* () {
              if (!(instance instanceof WebAssembly.Instance)) {
                throw new Error("Go.run: WebAssembly.Instance expected");
              }
              this._inst = instance;
              this.mem = new DataView(this._inst.exports.mem.buffer);
              this._values = [
                // JS values that Go currently has references to, indexed by reference id
                NaN,
                0,
                null,
                true,
                false,
                globalThis,
                this
              ];
              this._goRefCounts = new Array(this._values.length).fill(Infinity);
              this._ids = /* @__PURE__ */ new Map([
                // mapping from JS values to reference ids
                [0, 1],
                [null, 2],
                [true, 3],
                [false, 4],
                [globalThis, 5],
                [this, 6]
              ]);
              this._idPool = [];
              this.exited = false;
              let offset = 4096;
              const strPtr = (str) => {
                const ptr = offset;
                const bytes = encoder.encode(str + "\\0");
                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                offset += bytes.length;
                if (offset % 8 !== 0) {
                  offset += 8 - offset % 8;
                }
                return ptr;
              };
              const argc = this.argv.length;
              const argvPtrs = [];
              this.argv.forEach((arg) => {
                argvPtrs.push(strPtr(arg));
              });
              argvPtrs.push(0);
              const keys = Object.keys(this.env).sort();
              keys.forEach((key) => {
                argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
              });
              argvPtrs.push(0);
              const argv = offset;
              argvPtrs.forEach((ptr) => {
                this.mem.setUint32(offset, ptr, true);
                this.mem.setUint32(offset + 4, 0, true);
                offset += 8;
              });
              const wasmMinDataAddr = 4096 + 8192;
              if (offset >= wasmMinDataAddr) {
                throw new Error("total length of command line and environment variables exceeds limit");
              }
              this._inst.exports.run(argc, argv);
              if (this.exited) {
                this._resolveExitPromise();
              }
              yield this._exitPromise;
            });
          }
          _resume() {
            if (this.exited) {
              throw new Error("Go program has already exited");
            }
            this._inst.exports.resume();
            if (this.exited) {
              this._resolveExitPromise();
            }
          }
          _makeFuncWrapper(id) {
            const go = this;
            return function() {
              const event = { id, this: this, args: arguments };
              go._pendingEvent = event;
              go._resume();
              return event.result;
            };
          }
        };
      })();
      onmessage = ({ data: wasm }) => {
        let decoder = new TextDecoder();
        let fs = globalThis.fs;
        let stderr = "";
        fs.writeSync = (fd, buffer) => {
          if (fd === 1) {
            postMessage(buffer);
          } else if (fd === 2) {
            stderr += decoder.decode(buffer);
            let parts = stderr.split("\\n");
            if (parts.length > 1) console.log(parts.slice(0, -1).join("\\n"));
            stderr = parts[parts.length - 1];
          } else {
            throw new Error("Bad write");
          }
          return buffer.length;
        };
        let stdin = [];
        let resumeStdin;
        let stdinPos = 0;
        onmessage = ({ data }) => {
          if (data.length > 0) {
            stdin.push(data);
            if (resumeStdin) resumeStdin();
          }
          return go;
        };
        fs.read = (fd, buffer, offset, length, position, callback) => {
          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
            throw new Error("Bad read");
          }
          if (stdin.length === 0) {
            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
            return;
          }
          let first = stdin[0];
          let count = Math.max(0, Math.min(length, first.length - stdinPos));
          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
          stdinPos += count;
          if (stdinPos === first.length) {
            stdin.shift();
            stdinPos = 0;
          }
          callback(null, count);
        };
        let go = new globalThis.Go();
        go.argv = ["", \`--service=\${"0.24.0"}\`];
        tryToInstantiateModule(wasm, go).then(
          (instance) => {
            postMessage(null);
            go.run(instance);
          },
          (error) => {
            postMessage(error);
          }
        );
        return go;
      };
      function tryToInstantiateModule(wasm, go) {
        return __async(this, null, function* () {
          if (wasm instanceof WebAssembly.Module) {
            return WebAssembly.instantiate(wasm, go.importObject);
          }
          const res = yield fetch(wasm);
          if (!res.ok) throw new Error(\`Failed to download \${JSON.stringify(wasm)}\`);
          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
            return result2.instance;
          }
          const bytes = yield res.arrayBuffer();
          const result = yield WebAssembly.instantiate(bytes, go.importObject);
          return result.instance;
        });
      }
      return (m) => onmessage(m);
    })(postMessage)`,
                            ],
                            { type: "text/javascript" }
                        )
                        o = new Worker(URL.createObjectURL(O))
                    } else {
                        let O = ((A) => {
                                var M = (T, S, p) =>
                                    new Promise((d, i) => {
                                        var c = (_) => {
                                                try {
                                                    w(p.next(_))
                                                } catch (a) {
                                                    i(a)
                                                }
                                            },
                                            u = (_) => {
                                                try {
                                                    w(p.throw(_))
                                                } catch (a) {
                                                    i(a)
                                                }
                                            },
                                            w = (_) => (_.done ? d(_.value) : Promise.resolve(_.value).then(c, u))
                                        w((p = p.apply(T, S)).next())
                                    })
                                let F,
                                    $2 = {}
                                for (let T = self; T; T = Object.getPrototypeOf(T)) for (let S of Object.getOwnPropertyNames(T)) S in $2 || Object.defineProperty($2, S, { get: () => self[S] })
                                ;(() => {
                                    let T = () => {
                                        let d = new Error("not implemented")
                                        return (d.code = "ENOSYS"), d
                                    }
                                    if (!$2.fs) {
                                        let d = ""
                                        $2.fs = {
                                            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
                                            writeSync(i, c) {
                                                d += p.decode(c)
                                                let u = d.lastIndexOf(`
`)
                                                return u != -1 && (console.log(d.substring(0, u)), (d = d.substring(u + 1))), c.length
                                            },
                                            write(i, c, u, w, _, a) {
                                                if (u !== 0 || w !== c.length || _ !== null) {
                                                    a(T())
                                                    return
                                                }
                                                let h = this.writeSync(i, c)
                                                a(null, h)
                                            },
                                            chmod(i, c, u) {
                                                u(T())
                                            },
                                            chown(i, c, u, w) {
                                                w(T())
                                            },
                                            close(i, c) {
                                                c(T())
                                            },
                                            fchmod(i, c, u) {
                                                u(T())
                                            },
                                            fchown(i, c, u, w) {
                                                w(T())
                                            },
                                            fstat(i, c) {
                                                c(T())
                                            },
                                            fsync(i, c) {
                                                c(null)
                                            },
                                            ftruncate(i, c, u) {
                                                u(T())
                                            },
                                            lchown(i, c, u, w) {
                                                w(T())
                                            },
                                            link(i, c, u) {
                                                u(T())
                                            },
                                            lstat(i, c) {
                                                c(T())
                                            },
                                            mkdir(i, c, u) {
                                                u(T())
                                            },
                                            open(i, c, u, w) {
                                                w(T())
                                            },
                                            read(i, c, u, w, _, a) {
                                                a(T())
                                            },
                                            readdir(i, c) {
                                                c(T())
                                            },
                                            readlink(i, c) {
                                                c(T())
                                            },
                                            rename(i, c, u) {
                                                u(T())
                                            },
                                            rmdir(i, c) {
                                                c(T())
                                            },
                                            stat(i, c) {
                                                c(T())
                                            },
                                            symlink(i, c, u) {
                                                u(T())
                                            },
                                            truncate(i, c, u) {
                                                u(T())
                                            },
                                            unlink(i, c) {
                                                c(T())
                                            },
                                            utimes(i, c, u, w) {
                                                w(T())
                                            },
                                        }
                                    }
                                    if (
                                        ($2.process ||
                                            ($2.process = {
                                                getuid() {
                                                    return -1
                                                },
                                                getgid() {
                                                    return -1
                                                },
                                                geteuid() {
                                                    return -1
                                                },
                                                getegid() {
                                                    return -1
                                                },
                                                getgroups() {
                                                    throw T()
                                                },
                                                pid: -1,
                                                ppid: -1,
                                                umask() {
                                                    throw T()
                                                },
                                                cwd() {
                                                    throw T()
                                                },
                                                chdir() {
                                                    throw T()
                                                },
                                            }),
                                        !$2.crypto)
                                    )
                                        throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)")
                                    if (!$2.performance) throw new Error("globalThis.performance is not available, polyfill required (performance.now only)")
                                    if (!$2.TextEncoder) throw new Error("globalThis.TextEncoder is not available, polyfill required")
                                    if (!$2.TextDecoder) throw new Error("globalThis.TextDecoder is not available, polyfill required")
                                    let S = new TextEncoder("utf-8"),
                                        p = new TextDecoder("utf-8")
                                    $2.Go = class {
                                        constructor() {
                                            ;(this.argv = ["js"]),
                                                (this.env = {}),
                                                (this.exit = (t) => {
                                                    t !== 0 && console.warn("exit code:", t)
                                                }),
                                                (this._exitPromise = new Promise((t) => {
                                                    this._resolveExitPromise = t
                                                })),
                                                (this._pendingEvent = null),
                                                (this._scheduledTimeouts = /* @__PURE__ */ new Map()),
                                                (this._nextCallbackTimeoutID = 1)
                                            let d = (t, l) => {
                                                    this.mem.setUint32(t + 0, l, true), this.mem.setUint32(t + 4, Math.floor(l / 4294967296), true)
                                                },
                                                i = (t, l) => {
                                                    this.mem.setUint32(t + 0, l, true)
                                                },
                                                c = (t) => {
                                                    let l = this.mem.getUint32(t + 0, true),
                                                        b2 = this.mem.getInt32(t + 4, true)
                                                    return l + b2 * 4294967296
                                                },
                                                u = (t) => {
                                                    let l = this.mem.getFloat64(t, true)
                                                    if (l === 0) return
                                                    if (!isNaN(l)) return l
                                                    let b2 = this.mem.getUint32(t, true)
                                                    return this._values[b2]
                                                },
                                                w = (t, l) => {
                                                    if (typeof l == "number" && l !== 0) {
                                                        if (isNaN(l)) {
                                                            this.mem.setUint32(t + 4, 2146959360, true), this.mem.setUint32(t, 0, true)
                                                            return
                                                        }
                                                        this.mem.setFloat64(t, l, true)
                                                        return
                                                    }
                                                    if (l === void 0) {
                                                        this.mem.setFloat64(t, 0, true)
                                                        return
                                                    }
                                                    let v2 = this._ids.get(l)
                                                    v2 === void 0 && ((v2 = this._idPool.pop()), v2 === void 0 && (v2 = this._values.length), (this._values[v2] = l), (this._goRefCounts[v2] = 0), this._ids.set(l, v2)), this._goRefCounts[v2]++
                                                    let P = 0
                                                    switch (typeof l) {
                                                        case "object":
                                                            l !== null && (P = 1)
                                                            break
                                                        case "string":
                                                            P = 2
                                                            break
                                                        case "symbol":
                                                            P = 3
                                                            break
                                                        case "function":
                                                            P = 4
                                                            break
                                                    }
                                                    this.mem.setUint32(t + 4, 2146959360 | P, true), this.mem.setUint32(t, v2, true)
                                                },
                                                _ = (t) => {
                                                    let l = c(t + 0),
                                                        b2 = c(t + 8)
                                                    return new Uint8Array(this._inst.exports.mem.buffer, l, b2)
                                                },
                                                a = (t) => {
                                                    let l = c(t + 0),
                                                        b2 = c(t + 8),
                                                        v2 = new Array(b2)
                                                    for (let P = 0; P < b2; P++) v2[P] = u(l + P * 8)
                                                    return v2
                                                },
                                                h = (t) => {
                                                    let l = c(t + 0),
                                                        b2 = c(t + 8)
                                                    return p.decode(new DataView(this._inst.exports.mem.buffer, l, b2))
                                                },
                                                x = Date.now() - performance.now()
                                            this.importObject = {
                                                _gotest: { add: (t, l) => t + l },
                                                gojs: {
                                                    "runtime.wasmExit": (t) => {
                                                        t >>>= 0
                                                        let l = this.mem.getInt32(t + 8, true)
                                                        ;(this.exited = true), delete this._inst, delete this._values, delete this._goRefCounts, delete this._ids, delete this._idPool, this.exit(l)
                                                    },
                                                    "runtime.wasmWrite": (t) => {
                                                        t >>>= 0
                                                        let l = c(t + 8),
                                                            b2 = c(t + 16),
                                                            v2 = this.mem.getInt32(t + 24, true)
                                                        $2.fs.writeSync(l, new Uint8Array(this._inst.exports.mem.buffer, b2, v2))
                                                    },
                                                    "runtime.resetMemoryDataView": (t) => {
                                                        ;(t >>>= 0), (this.mem = new DataView(this._inst.exports.mem.buffer))
                                                    },
                                                    "runtime.nanotime1": (t) => {
                                                        ;(t >>>= 0), d(t + 8, (x + performance.now()) * 1e6)
                                                    },
                                                    "runtime.walltime": (t) => {
                                                        t >>>= 0
                                                        let l = /* @__PURE__ */ new Date().getTime()
                                                        d(t + 8, l / 1e3), this.mem.setInt32(t + 16, (l % 1e3) * 1e6, true)
                                                    },
                                                    "runtime.scheduleTimeoutEvent": (t) => {
                                                        t >>>= 0
                                                        let l = this._nextCallbackTimeoutID
                                                        this._nextCallbackTimeoutID++,
                                                            this._scheduledTimeouts.set(
                                                                l,
                                                                setTimeout(() => {
                                                                    for (this._resume(); this._scheduledTimeouts.has(l); ) console.warn("scheduleTimeoutEvent: missed timeout event"), this._resume()
                                                                }, c(t + 8))
                                                            ),
                                                            this.mem.setInt32(t + 16, l, true)
                                                    },
                                                    "runtime.clearTimeoutEvent": (t) => {
                                                        t >>>= 0
                                                        let l = this.mem.getInt32(t + 8, true)
                                                        clearTimeout(this._scheduledTimeouts.get(l)), this._scheduledTimeouts.delete(l)
                                                    },
                                                    "runtime.getRandomData": (t) => {
                                                        ;(t >>>= 0), crypto.getRandomValues(_(t + 8))
                                                    },
                                                    "syscall/js.finalizeRef": (t) => {
                                                        t >>>= 0
                                                        let l = this.mem.getUint32(t + 8, true)
                                                        if ((this._goRefCounts[l]--, this._goRefCounts[l] === 0)) {
                                                            let b2 = this._values[l]
                                                            ;(this._values[l] = null), this._ids.delete(b2), this._idPool.push(l)
                                                        }
                                                    },
                                                    "syscall/js.stringVal": (t) => {
                                                        ;(t >>>= 0), w(t + 24, h(t + 8))
                                                    },
                                                    "syscall/js.valueGet": (t) => {
                                                        t >>>= 0
                                                        let l = Reflect.get(u(t + 8), h(t + 16))
                                                        ;(t = this._inst.exports.getsp() >>> 0), w(t + 32, l)
                                                    },
                                                    "syscall/js.valueSet": (t) => {
                                                        ;(t >>>= 0), Reflect.set(u(t + 8), h(t + 16), u(t + 32))
                                                    },
                                                    "syscall/js.valueDelete": (t) => {
                                                        ;(t >>>= 0), Reflect.deleteProperty(u(t + 8), h(t + 16))
                                                    },
                                                    "syscall/js.valueIndex": (t) => {
                                                        ;(t >>>= 0), w(t + 24, Reflect.get(u(t + 8), c(t + 16)))
                                                    },
                                                    "syscall/js.valueSetIndex": (t) => {
                                                        ;(t >>>= 0), Reflect.set(u(t + 8), c(t + 16), u(t + 24))
                                                    },
                                                    "syscall/js.valueCall": (t) => {
                                                        t >>>= 0
                                                        try {
                                                            let l = u(t + 8),
                                                                b2 = Reflect.get(l, h(t + 16)),
                                                                v2 = a(t + 32),
                                                                P = Reflect.apply(b2, l, v2)
                                                            ;(t = this._inst.exports.getsp() >>> 0), w(t + 56, P), this.mem.setUint8(t + 64, 1)
                                                        } catch (l) {
                                                            ;(t = this._inst.exports.getsp() >>> 0), w(t + 56, l), this.mem.setUint8(t + 64, 0)
                                                        }
                                                    },
                                                    "syscall/js.valueInvoke": (t) => {
                                                        t >>>= 0
                                                        try {
                                                            let l = u(t + 8),
                                                                b2 = a(t + 16),
                                                                v2 = Reflect.apply(l, void 0, b2)
                                                            ;(t = this._inst.exports.getsp() >>> 0), w(t + 40, v2), this.mem.setUint8(t + 48, 1)
                                                        } catch (l) {
                                                            ;(t = this._inst.exports.getsp() >>> 0), w(t + 40, l), this.mem.setUint8(t + 48, 0)
                                                        }
                                                    },
                                                    "syscall/js.valueNew": (t) => {
                                                        t >>>= 0
                                                        try {
                                                            let l = u(t + 8),
                                                                b2 = a(t + 16),
                                                                v2 = Reflect.construct(l, b2)
                                                            ;(t = this._inst.exports.getsp() >>> 0), w(t + 40, v2), this.mem.setUint8(t + 48, 1)
                                                        } catch (l) {
                                                            ;(t = this._inst.exports.getsp() >>> 0), w(t + 40, l), this.mem.setUint8(t + 48, 0)
                                                        }
                                                    },
                                                    "syscall/js.valueLength": (t) => {
                                                        ;(t >>>= 0), d(t + 16, parseInt(u(t + 8).length))
                                                    },
                                                    "syscall/js.valuePrepareString": (t) => {
                                                        t >>>= 0
                                                        let l = S.encode(String(u(t + 8)))
                                                        w(t + 16, l), d(t + 24, l.length)
                                                    },
                                                    "syscall/js.valueLoadString": (t) => {
                                                        t >>>= 0
                                                        let l = u(t + 8)
                                                        _(t + 16).set(l)
                                                    },
                                                    "syscall/js.valueInstanceOf": (t) => {
                                                        ;(t >>>= 0), this.mem.setUint8(t + 24, u(t + 8) instanceof u(t + 16) ? 1 : 0)
                                                    },
                                                    "syscall/js.copyBytesToGo": (t) => {
                                                        t >>>= 0
                                                        let l = _(t + 8),
                                                            b2 = u(t + 32)
                                                        if (!(b2 instanceof Uint8Array || b2 instanceof Uint8ClampedArray)) {
                                                            this.mem.setUint8(t + 48, 0)
                                                            return
                                                        }
                                                        let v2 = b2.subarray(0, l.length)
                                                        l.set(v2), d(t + 40, v2.length), this.mem.setUint8(t + 48, 1)
                                                    },
                                                    "syscall/js.copyBytesToJS": (t) => {
                                                        t >>>= 0
                                                        let l = u(t + 8),
                                                            b2 = _(t + 16)
                                                        if (!(l instanceof Uint8Array || l instanceof Uint8ClampedArray)) {
                                                            this.mem.setUint8(t + 48, 0)
                                                            return
                                                        }
                                                        let v2 = b2.subarray(0, l.length)
                                                        l.set(v2), d(t + 40, v2.length), this.mem.setUint8(t + 48, 1)
                                                    },
                                                    debug: (t) => {
                                                        console.log(t)
                                                    },
                                                },
                                            }
                                        }
                                        run(d) {
                                            return M(this, null, function* () {
                                                if (!(d instanceof WebAssembly.Instance)) throw new Error("Go.run: WebAssembly.Instance expected")
                                                ;(this._inst = d),
                                                    (this.mem = new DataView(this._inst.exports.mem.buffer)),
                                                    (this._values = [NaN, 0, null, true, false, $2, this]),
                                                    (this._goRefCounts = new Array(this._values.length).fill(1 / 0)),
                                                    (this._ids = /* @__PURE__ */ new Map([
                                                        [0, 1],
                                                        [null, 2],
                                                        [true, 3],
                                                        [false, 4],
                                                        [$2, 5],
                                                        [this, 6],
                                                    ])),
                                                    (this._idPool = []),
                                                    (this.exited = false)
                                                let i = 4096,
                                                    c = (x) => {
                                                        let t = i,
                                                            l = S.encode(x + "\0")
                                                        return new Uint8Array(this.mem.buffer, i, l.length).set(l), (i += l.length), i % 8 !== 0 && (i += 8 - (i % 8)), t
                                                    },
                                                    u = this.argv.length,
                                                    w = []
                                                this.argv.forEach((x) => {
                                                    w.push(c(x))
                                                }),
                                                    w.push(0),
                                                    Object.keys(this.env)
                                                        .sort()
                                                        .forEach((x) => {
                                                            w.push(c(`${x}=${this.env[x]}`))
                                                        }),
                                                    w.push(0)
                                                let a = i
                                                if (
                                                    (w.forEach((x) => {
                                                        this.mem.setUint32(i, x, true), this.mem.setUint32(i + 4, 0, true), (i += 8)
                                                    }),
                                                    i >= 12288)
                                                )
                                                    throw new Error("total length of command line and environment variables exceeds limit")
                                                this._inst.exports.run(u, a), this.exited && this._resolveExitPromise(), yield this._exitPromise
                                            })
                                        }
                                        _resume() {
                                            if (this.exited) throw new Error("Go program has already exited")
                                            this._inst.exports.resume(), this.exited && this._resolveExitPromise()
                                        }
                                        _makeFuncWrapper(d) {
                                            let i = this
                                            return function () {
                                                let c = { id: d, this: this, args: arguments }
                                                return (i._pendingEvent = c), i._resume(), c.result
                                            }
                                        }
                                    }
                                })(),
                                    (F = ({ data: T }) => {
                                        let S = new TextDecoder(),
                                            p = $2.fs,
                                            d = ""
                                        p.writeSync = (_, a) => {
                                            if (_ === 1) A(a)
                                            else if (_ === 2) {
                                                d += S.decode(a)
                                                let h = d.split(`
`)
                                                h.length > 1 &&
                                                    console.log(
                                                        h.slice(0, -1).join(`
`)
                                                    ),
                                                    (d = h[h.length - 1])
                                            } else throw new Error("Bad write")
                                            return a.length
                                        }
                                        let i = [],
                                            c,
                                            u = 0
                                        ;(F = ({ data: _ }) => (_.length > 0 && (i.push(_), c && c()), w)),
                                            (p.read = (_, a, h, x, t, l) => {
                                                if (_ !== 0 || h !== 0 || x !== a.length || t !== null) throw new Error("Bad read")
                                                if (i.length === 0) {
                                                    c = () => p.read(_, a, h, x, t, l)
                                                    return
                                                }
                                                let b2 = i[0],
                                                    v2 = Math.max(0, Math.min(x, b2.length - u))
                                                a.set(b2.subarray(u, u + v2), h), (u += v2), u === b2.length && (i.shift(), (u = 0)), l(null, v2)
                                            })
                                        let w = new $2.Go()
                                        return (
                                            (w.argv = ["", "--service=0.24.0"]),
                                            G(T, w).then(
                                                (_) => {
                                                    A(null), w.run(_)
                                                },
                                                (_) => {
                                                    A(_)
                                                }
                                            ),
                                            w
                                        )
                                    })
                                function G(T, S) {
                                    return M(this, null, function* () {
                                        if (T instanceof WebAssembly.Module) return WebAssembly.instantiate(T, S.importObject)
                                        let p = yield fetch(T)
                                        if (!p.ok) throw new Error(`Failed to download ${JSON.stringify(T)}`)
                                        if ("instantiateStreaming" in WebAssembly && /^application\/wasm($|;)/i.test(p.headers.get("Content-Type") || "")) return (yield WebAssembly.instantiateStreaming(p, S.importObject)).instance
                                        let d = yield p.arrayBuffer()
                                        return (yield WebAssembly.instantiate(d, S.importObject)).instance
                                    })
                                }
                                return (T) => F(T)
                            })((A) => o.onmessage({ data: A })),
                            V
                        o = {
                            onmessage: null,
                            postMessage: (A) =>
                                setTimeout(() => {
                                    try {
                                        V = O({ data: A })
                                    } catch (M) {
                                        g(M)
                                    }
                                }),
                            terminate() {
                                if (V) for (let A of V._scheduledTimeouts.values()) clearTimeout(A)
                            },
                        }
                    }
                    let m2,
                        E,
                        f = new Promise((O, V) => {
                            ;(m2 = O), (E = V)
                        })
                    ;(o.onmessage = ({ data: O }) => {
                        ;(o.onmessage = ({ data: V }) => U(V)), O ? E(O) : m2()
                    }),
                        o.postMessage(n || new URL(e, location.href).toString())
                    let { readFromStdout: U, service: R } = ut2({
                        writeToStdin(O) {
                            o.postMessage(O)
                        },
                        isSync: false,
                        hasFS: false,
                        esbuild: be,
                    })
                    yield f,
                        (Te = () => {
                            o.terminate(), (fe = void 0), (Te = void 0), ($e = void 0)
                        }),
                        ($e = {
                            build: (O) =>
                                new Promise((V, A) => {
                                    y.then(A), R.buildOrContext({ callName: "build", refs: null, options: O, isTTY: false, defaultWD: "/", callback: (M, F) => (M ? A(M) : V(F)) })
                                }),
                            context: (O) =>
                                new Promise((V, A) => {
                                    y.then(A), R.buildOrContext({ callName: "context", refs: null, options: O, isTTY: false, defaultWD: "/", callback: (M, F) => (M ? A(M) : V(F)) })
                                }),
                            transform: (O, V) =>
                                new Promise((A, M) => {
                                    y.then(M),
                                        R.transform({
                                            callName: "transform",
                                            refs: null,
                                            input: O,
                                            options: V || {},
                                            isTTY: false,
                                            fs: {
                                                readFile(F, $2) {
                                                    $2(new Error("Internal error"), null)
                                                },
                                                writeFile(F, $2) {
                                                    $2(null)
                                                },
                                            },
                                            callback: (F, $2) => (F ? M(F) : A($2)),
                                        })
                                }),
                            formatMessages: (O, V) =>
                                new Promise((A, M) => {
                                    y.then(M), R.formatMessages({ callName: "formatMessages", refs: null, messages: O, options: V, callback: (F, $2) => (F ? M(F) : A($2)) })
                                }),
                            analyzeMetafile: (O, V) =>
                                new Promise((A, M) => {
                                    y.then(M), R.analyzeMetafile({ callName: "analyzeMetafile", refs: null, metafile: typeof O == "string" ? O : JSON.stringify(O), options: V, callback: (F, $2) => (F ? M(F) : A($2)) })
                                }),
                        })
                }),
            jt = be
    })(
        typeof De == "object"
            ? De
            : {
                  set exports(Y) {
                      ;(typeof self < "u" ? self : this).esbuild = Y
                  },
              }
    )
})
var oe = {}
Ft(oe, { analyzeMetafile: () => Nt, analyzeMetafileSync: () => Vt, build: () => Lt, buildSync: () => Bt, context: () => Wt, default: () => Kt, formatMessages: () => zt, formatMessagesSync: () => Gt, initialize: () => qt, stop: () => Jt, transform: () => Yt, transformSync: () => Ht, version: () => Qt })
var Xe = He(Ae())
de(oe, He(Ae()))
var { analyzeMetafile: Nt, analyzeMetafileSync: Vt, build: Lt, buildSync: Bt, context: Wt, formatMessages: zt, formatMessagesSync: Gt, initialize: qt, stop: Jt, transform: Yt, transformSync: Ht, version: Qt } = Xe
var { default: Qe, ...Xt } = Xe
var Kt = Qe !== void 0 ? Qe : Xt
export { Nt as analyzeMetafile, Vt as analyzeMetafileSync, Lt as build, Bt as buildSync, Wt as context, Kt as default, zt as formatMessages, Gt as formatMessagesSync, qt as initialize, Jt as stop, Yt as transform, Ht as transformSync, Qt as version }
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
