// https://github.com/wasmerio/wasmer-js/issues/321
Object.defineProperty(Object.getPrototypeOf({}), "__proto__", {
    get() {
        return Object.getPrototypeOf(this)
    },
    set(value) {
        return Object.setPrototypeOf(this, value)
    }
})

;(function () {
    "use strict"
    function Ar(t, e) {
        return (
            (Ar =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (r, n) {
                        r.__proto__ = n
                    }) ||
                function (r, n) {
                    for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i])
                }),
            Ar(t, e)
        )
    }
    function Or(t, e) {
        function r() {
            this.constructor = t
        }
        Ar(t, e), (t.prototype = e === null ? Object.create(e) : ((r.prototype = e.prototype), new r()))
    }
    function Ve(t) {
        var e = typeof Symbol == "function" && t[Symbol.iterator],
            r = 0
        return e
            ? e.call(t)
            : {
                  next: function () {
                      return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t }
                  },
              }
    }
    function qe(t, e) {
        var r = typeof Symbol == "function" && t[Symbol.iterator]
        if (!r) return t
        t = r.call(t)
        var n,
            i = []
        try {
            for (; (e === void 0 || 0 < e--) && !(n = t.next()).done; ) i.push(n.value)
        } catch (u) {
            var s = { error: u }
        } finally {
            try {
                n && !n.done && (r = t.return) && r.call(t)
            } finally {
                if (s) throw s.error
            }
        }
        return i
    }
    function Ke() {
        for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(qe(arguments[e]))
        return t
    }
    var Qo = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {},
        T = typeof BigInt < "u" ? BigInt : Qo.BigInt || Number,
        He = DataView
    He.prototype.setBigUint64 ||
        ((He.prototype.setBigUint64 = function (t, e, r) {
            if (e < Math.pow(2, 32)) {
                e = Number(e)
                var n = 0
            } else {
                ;(n = e.toString(2)), (e = "")
                for (var i = 0; i < 64 - n.length; i++) e += "0"
                ;(e += n), (n = parseInt(e.substring(0, 32), 2)), (e = parseInt(e.substring(32), 2))
            }
            this.setUint32(t + (r ? 0 : 4), e, r), this.setUint32(t + (r ? 4 : 0), n, r)
        }),
        (He.prototype.getBigUint64 = function (t, e) {
            var r = this.getUint32(t + (e ? 0 : 4), e)
            ;(t = this.getUint32(t + (e ? 4 : 0), e)), (r = r.toString(2)), (t = t.toString(2)), (e = "")
            for (var n = 0; n < 32 - r.length; n++) e += "0"
            return T("0b" + t + (e + r))
        }))
    var Ne = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {},
        mt = [],
        lt = [],
        bo = typeof Uint8Array < "u" ? Uint8Array : Array,
        Tr = !1
    function Ln() {
        Tr = !0
        for (var t = 0; 64 > t; ++t) (mt[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[t]), (lt["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(t)] = t)
        ;(lt[45] = 62), (lt[95] = 63)
    }
    function ts(t, e, r) {
        for (var n = [], i = e; i < r; i += 3) (e = (t[i] << 16) + (t[i + 1] << 8) + t[i + 2]), n.push(mt[(e >> 18) & 63] + mt[(e >> 12) & 63] + mt[(e >> 6) & 63] + mt[e & 63])
        return n.join("")
    }
    function Pn(t) {
        Tr || Ln()
        for (var e = t.length, r = e % 3, n = "", i = [], s = 0, u = e - r; s < u; s += 16383) i.push(ts(t, s, s + 16383 > u ? u : s + 16383))
        return r === 1 ? ((t = t[e - 1]), (n += mt[t >> 2]), (n += mt[(t << 4) & 63]), (n += "==")) : r === 2 && ((t = (t[e - 2] << 8) + t[e - 1]), (n += mt[t >> 10]), (n += mt[(t >> 4) & 63]), (n += mt[(t << 2) & 63]), (n += "=")), i.push(n), i.join("")
    }
    function Xe(t, e, r, n, i) {
        var s = 8 * i - n - 1,
            u = (1 << s) - 1,
            l = u >> 1,
            g = -7
        i = r ? i - 1 : 0
        var p = r ? -1 : 1,
            a = t[e + i]
        for (i += p, r = a & ((1 << -g) - 1), a >>= -g, g += s; 0 < g; r = 256 * r + t[e + i], i += p, g -= 8);
        for (s = r & ((1 << -g) - 1), r >>= -g, g += n; 0 < g; s = 256 * s + t[e + i], i += p, g -= 8);
        if (r === 0) r = 1 - l
        else {
            if (r === u) return s ? NaN : (1 / 0) * (a ? -1 : 1)
            ;(s += Math.pow(2, n)), (r -= l)
        }
        return (a ? -1 : 1) * s * Math.pow(2, r - n)
    }
    function Je(t, e, r, n, i, s) {
        var u,
            l = 8 * s - i - 1,
            g = (1 << l) - 1,
            p = g >> 1,
            a = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
        s = n ? 0 : s - 1
        var y = n ? 1 : -1,
            v = 0 > e || (e === 0 && 0 > 1 / e) ? 1 : 0
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? ((e = isNaN(e) ? 1 : 0), (n = g)) : ((n = Math.floor(Math.log(e) / Math.LN2)), 1 > e * (u = Math.pow(2, -n)) && (n--, (u *= 2)), (e = 1 <= n + p ? e + a / u : e + a * Math.pow(2, 1 - p)), 2 <= e * u && (n++, (u /= 2)), n + p >= g ? ((e = 0), (n = g)) : 1 <= n + p ? ((e = (e * u - 1) * Math.pow(2, i)), (n += p)) : ((e = e * Math.pow(2, p - 1) * Math.pow(2, i)), (n = 0))); 8 <= i; t[r + s] = e & 255, s += y, e /= 256, i -= 8);
        for (n = (n << i) | e, l += i; 0 < l; t[r + s] = n & 255, s += y, n /= 256, l -= 8);
        t[r + s - y] |= 128 * v
    }
    var es = {}.toString,
        Cn =
            Array.isArray ||
            function (t) {
                return es.call(t) == "[object Array]"
            }
    R.TYPED_ARRAY_SUPPORT = Ne.TYPED_ARRAY_SUPPORT !== void 0 ? Ne.TYPED_ARRAY_SUPPORT : !0
    var rs = R.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    // function It(t, e) {
    //     if ((R.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < e) throw new RangeError("Invalid typed array length")
    //     return R.TYPED_ARRAY_SUPPORT ? ((t = new Uint8Array(e)), (t.__proto__ = R.prototype)) : (t === null && (t = new R(e)), (t.length = e)), t
    // }
    function It(array, length) {
        const maxLength = R.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        
        if (length > maxLength) {
            throw new RangeError("Invalid typed array length");
        }
        
        if (R.TYPED_ARRAY_SUPPORT) {
            array = new Uint8Array(length);
            Object.setPrototypeOf(array, R.prototype);
        } else {
            if (array === null) {
                array = new R(length);
            }
            array.length = length;
        }
        
        return array;
    }
    function R(t, e, r) {
        if (!(R.TYPED_ARRAY_SUPPORT || this instanceof R)) return new R(t, e, r)
        if (typeof t == "number") {
            if (typeof e == "string") throw Error("If encoding is specified then the first argument must be a string")
            return Ir(this, t)
        }
        return Bn(this, t, e, r)
    }
    ;(R.poolSize = 8192),
        (R._augment = function (t) {
            return (t.__proto__ = R.prototype), t
        })
    function Bn(t, e, r, n) {
        if (typeof e == "number") throw new TypeError('"value" argument must not be a number')
        if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) {
            if ((e.byteLength, 0 > r || e.byteLength < r)) throw new RangeError("'offset' is out of bounds")
            if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds")
            return (e = r === void 0 && n === void 0 ? new Uint8Array(e) : n === void 0 ? new Uint8Array(e, r) : new Uint8Array(e, r, n)), R.TYPED_ARRAY_SUPPORT ? ((t = e), (t.__proto__ = R.prototype)) : (t = Nr(t, e)), t
        }
        if (typeof e == "string") {
            if (((n = t), (t = r), (typeof t != "string" || t === "") && (t = "utf8"), !R.isEncoding(t))) throw new TypeError('"encoding" must be a valid string encoding')
            return (r = Un(e, t) | 0), (n = It(n, r)), (e = n.write(e, t)), e !== r && (n = n.slice(0, e)), n
        }
        return ns(t, e)
    }
    ;(R.from = function (t, e, r) {
        return Bn(null, t, e, r)
    }),
        R.TYPED_ARRAY_SUPPORT && ((R.prototype.__proto__ = Uint8Array.prototype), (R.__proto__ = Uint8Array))
    function Fn(t) {
        if (typeof t != "number") throw new TypeError('"size" argument must be a number')
        if (0 > t) throw new RangeError('"size" argument must not be negative')
    }
    R.alloc = function (t, e, r) {
        return Fn(t), (t = 0 >= t ? It(null, t) : e !== void 0 ? (typeof r == "string" ? It(null, t).fill(e, r) : It(null, t).fill(e)) : It(null, t)), t
    }
    function Ir(t, e) {
        if ((Fn(e), (t = It(t, 0 > e ? 0 : kr(e) | 0)), !R.TYPED_ARRAY_SUPPORT)) for (var r = 0; r < e; ++r) t[r] = 0
        return t
    }
    ;(R.allocUnsafe = function (t) {
        return Ir(null, t)
    }),
        (R.allocUnsafeSlow = function (t) {
            return Ir(null, t)
        })
    function Nr(t, e) {
        var r = 0 > e.length ? 0 : kr(e.length) | 0
        t = It(t, r)
        for (var n = 0; n < r; n += 1) t[n] = e[n] & 255
        return t
    }
    function ns(t, e) {
        if (vt(e)) {
            var r = kr(e.length) | 0
            return (t = It(t, r)), t.length === 0 || e.copy(t, 0, 0, r), t
        }
        if (e) {
            if ((typeof ArrayBuffer < "u" && e.buffer instanceof ArrayBuffer) || "length" in e) return (r = typeof e.length != "number") || ((r = e.length), (r = r !== r)), r ? It(t, 0) : Nr(t, e)
            if (e.type === "Buffer" && Cn(e.data)) return Nr(t, e.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }
    function kr(t) {
        if (t >= (R.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823)) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + (R.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) + " bytes")
        return t | 0
    }
    R.isBuffer = Wn
    function vt(t) {
        return !(t == null || !t._isBuffer)
    }
    ;(R.compare = function (t, e) {
        if (!vt(t) || !vt(e)) throw new TypeError("Arguments must be Buffers")
        if (t === e) return 0
        for (var r = t.length, n = e.length, i = 0, s = Math.min(r, n); i < s; ++i)
            if (t[i] !== e[i]) {
                ;(r = t[i]), (n = e[i])
                break
            }
        return r < n ? -1 : n < r ? 1 : 0
    }),
        (R.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
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
                    return !0
                default:
                    return !1
            }
        }),
        (R.concat = function (t, e) {
            if (!Cn(t)) throw new TypeError('"list" argument must be an Array of Buffers')
            if (t.length === 0) return R.alloc(0)
            var r
            if (e === void 0) for (r = e = 0; r < t.length; ++r) e += t[r].length
            e = R.allocUnsafe(e)
            var n = 0
            for (r = 0; r < t.length; ++r) {
                var i = t[r]
                if (!vt(i)) throw new TypeError('"list" argument must be an Array of Buffers')
                i.copy(e, n), (n += i.length)
            }
            return e
        })
    function Un(t, e) {
        if (vt(t)) return t.length
        if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength
        typeof t != "string" && (t = "" + t)
        var r = t.length
        if (r === 0) return 0
        for (var n = !1; ; )
            switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return r
                case "utf8":
                case "utf-8":
                case void 0:
                    return tr(t).length
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * r
                case "hex":
                    return r >>> 1
                case "base64":
                    return $n(t).length
                default:
                    if (n) return tr(t).length
                    ;(e = ("" + e).toLowerCase()), (n = !0)
            }
    }
    R.byteLength = Un
    function is(t, e, r) {
        var n = !1
        if (((e === void 0 || 0 > e) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), 0 >= r) || ((r >>>= 0), (e >>>= 0), r <= e))) return ""
        for (t || (t = "utf8"); ; )
            switch (t) {
                case "hex":
                    for (t = e, e = r, r = this.length, (!t || 0 > t) && (t = 0), (!e || 0 > e || e > r) && (e = r), n = "", r = t; r < e; ++r) (t = n), (n = this[r]), (n = 16 > n ? "0" + n.toString(16) : n.toString(16)), (n = t + n)
                    return n
                case "utf8":
                case "utf-8":
                    return xn(this, e, r)
                case "ascii":
                    for (t = "", r = Math.min(this.length, r); e < r; ++e) t += String.fromCharCode(this[e] & 127)
                    return t
                case "latin1":
                case "binary":
                    for (t = "", r = Math.min(this.length, r); e < r; ++e) t += String.fromCharCode(this[e])
                    return t
                case "base64":
                    return (e = e === 0 && r === this.length ? Pn(this) : Pn(this.slice(e, r))), e
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    for (e = this.slice(e, r), r = "", t = 0; t < e.length; t += 2) r += String.fromCharCode(e[t] + 256 * e[t + 1])
                    return r
                default:
                    if (n) throw new TypeError("Unknown encoding: " + t)
                    ;(t = (t + "").toLowerCase()), (n = !0)
            }
    }
    R.prototype._isBuffer = !0
    function Ht(t, e, r) {
        var n = t[e]
        ;(t[e] = t[r]), (t[r] = n)
    }
    ;(R.prototype.swap16 = function () {
        var t = this.length
        if (t % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits")
        for (var e = 0; e < t; e += 2) Ht(this, e, e + 1)
        return this
    }),
        (R.prototype.swap32 = function () {
            var t = this.length
            if (t % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits")
            for (var e = 0; e < t; e += 4) Ht(this, e, e + 3), Ht(this, e + 1, e + 2)
            return this
        }),
        (R.prototype.swap64 = function () {
            var t = this.length
            if (t % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits")
            for (var e = 0; e < t; e += 8) Ht(this, e, e + 7), Ht(this, e + 1, e + 6), Ht(this, e + 2, e + 5), Ht(this, e + 3, e + 4)
            return this
        }),
        (R.prototype.toString = function () {
            var t = this.length | 0
            return t === 0 ? "" : arguments.length === 0 ? xn(this, 0, t) : is.apply(this, arguments)
        }),
        (R.prototype.equals = function (t) {
            if (!vt(t)) throw new TypeError("Argument must be a Buffer")
            return this === t ? !0 : R.compare(this, t) === 0
        }),
        (R.prototype.inspect = function () {
            var t = ""
            return 0 < this.length && ((t = this.toString("hex", 0, 50).match(/.{2}/g).join(" ")), 50 < this.length && (t += " ... ")), "<Buffer " + t + ">"
        }),
        (R.prototype.compare = function (t, e, r, n, i) {
            if (!vt(t)) throw new TypeError("Argument must be a Buffer")
            if ((e === void 0 && (e = 0), r === void 0 && (r = t ? t.length : 0), n === void 0 && (n = 0), i === void 0 && (i = this.length), 0 > e || r > t.length || 0 > n || i > this.length)) throw new RangeError("out of range index")
            if (n >= i && e >= r) return 0
            if (n >= i) return -1
            if (e >= r) return 1
            if (((e >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === t)) return 0
            var s = i - n,
                u = r - e,
                l = Math.min(s, u)
            for (n = this.slice(n, i), t = t.slice(e, r), e = 0; e < l; ++e)
                if (n[e] !== t[e]) {
                    ;(s = n[e]), (u = t[e])
                    break
                }
            return s < u ? -1 : u < s ? 1 : 0
        })
    function Dn(t, e, r, n, i) {
        if (t.length === 0) return -1
        if ((typeof r == "string" ? ((n = r), (r = 0)) : 2147483647 < r ? (r = 2147483647) : -2147483648 > r && (r = -2147483648), (r = +r), isNaN(r) && (r = i ? 0 : t.length - 1), 0 > r && (r = t.length + r), r >= t.length)) {
            if (i) return -1
            r = t.length - 1
        } else if (0 > r)
            if (i) r = 0
            else return -1
        if ((typeof e == "string" && (e = R.from(e, n)), vt(e))) return e.length === 0 ? -1 : Mn(t, e, r, n, i)
        if (typeof e == "number") return (e &= 255), R.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? (i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r)) : Mn(t, [e], r, n, i)
        throw new TypeError("val must be string, number or Buffer")
    }
    function Mn(t, e, r, n, i) {
        function s(p, a) {
            return u === 1 ? p[a] : p.readUInt16BE(a * u)
        }
        var u = 1,
            l = t.length,
            g = e.length
        if (n !== void 0 && ((n = String(n).toLowerCase()), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
            if (2 > t.length || 2 > e.length) return -1
            ;(u = 2), (l /= 2), (g /= 2), (r /= 2)
        }
        if (i)
            for (n = -1; r < l; r++)
                if (s(t, r) === s(e, n === -1 ? 0 : r - n)) {
                    if ((n === -1 && (n = r), r - n + 1 === g)) return n * u
                } else n !== -1 && (r -= r - n), (n = -1)
        else
            for (r + g > l && (r = l - g); 0 <= r; r--) {
                for (l = !0, n = 0; n < g; n++)
                    if (s(t, r + n) !== s(e, n)) {
                        l = !1
                        break
                    }
                if (l) return r
            }
        return -1
    }
    ;(R.prototype.includes = function (t, e, r) {
        return this.indexOf(t, e, r) !== -1
    }),
        (R.prototype.indexOf = function (t, e, r) {
            return Dn(this, t, e, r, !0)
        }),
        (R.prototype.lastIndexOf = function (t, e, r) {
            return Dn(this, t, e, r, !1)
        }),
        (R.prototype.write = function (t, e, r, n) {
            if (e === void 0) (n = "utf8"), (r = this.length), (e = 0)
            else if (r === void 0 && typeof e == "string") (n = e), (r = this.length), (e = 0)
            else if (isFinite(e)) (e |= 0), isFinite(r) ? ((r |= 0), n === void 0 && (n = "utf8")) : ((n = r), (r = void 0))
            else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
            var i = this.length - e
            if (((r === void 0 || r > i) && (r = i), (0 < t.length && (0 > r || 0 > e)) || e > this.length)) throw new RangeError("Attempt to write outside buffer bounds")
            for (n || (n = "utf8"), i = !1; ; )
                switch (n) {
                    case "hex":
                        t: {
                            if (((e = Number(e) || 0), (n = this.length - e), r ? ((r = Number(r)), r > n && (r = n)) : (r = n), (n = t.length), n % 2 !== 0)) throw new TypeError("Invalid hex string")
                            for (r > n / 2 && (r = n / 2), n = 0; n < r; ++n) {
                                if (((i = parseInt(t.substr(2 * n, 2), 16)), isNaN(i))) {
                                    t = n
                                    break t
                                }
                                this[e + n] = i
                            }
                            t = n
                        }
                        return t
                    case "utf8":
                    case "utf-8":
                        return ke(tr(t, this.length - e), this, e, r)
                    case "ascii":
                        return ke(Yn(t), this, e, r)
                    case "latin1":
                    case "binary":
                        return ke(Yn(t), this, e, r)
                    case "base64":
                        return ke($n(t), this, e, r)
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        ;(n = t), (i = this.length - e)
                        for (var s = [], u = 0; u < n.length && !(0 > (i -= 2)); ++u) {
                            var l = n.charCodeAt(u)
                            ;(t = l >> 8), (l %= 256), s.push(l), s.push(t)
                        }
                        return ke(s, this, e, r)
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + n)
                        ;(n = ("" + n).toLowerCase()), (i = !0)
                }
        }),
        (R.prototype.toJSON = function () {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) }
        })
    function xn(t, e, r) {
        r = Math.min(t.length, r)
        for (var n = []; e < r; ) {
            var i = t[e],
                s = null,
                u = 239 < i ? 4 : 223 < i ? 3 : 191 < i ? 2 : 1
            if (e + u <= r)
                switch (u) {
                    case 1:
                        128 > i && (s = i)
                        break
                    case 2:
                        var l = t[e + 1]
                        ;(l & 192) === 128 && ((i = ((i & 31) << 6) | (l & 63)), 127 < i && (s = i))
                        break
                    case 3:
                        l = t[e + 1]
                        var g = t[e + 2]
                        ;(l & 192) === 128 && (g & 192) === 128 && ((i = ((i & 15) << 12) | ((l & 63) << 6) | (g & 63)), 2047 < i && (55296 > i || 57343 < i) && (s = i))
                        break
                    case 4:
                        ;(l = t[e + 1]), (g = t[e + 2])
                        var p = t[e + 3]
                        ;(l & 192) === 128 && (g & 192) === 128 && (p & 192) === 128 && ((i = ((i & 15) << 18) | ((l & 63) << 12) | ((g & 63) << 6) | (p & 63)), 65535 < i && 1114112 > i && (s = i))
                }
            s === null ? ((s = 65533), (u = 1)) : 65535 < s && ((s -= 65536), n.push(((s >>> 10) & 1023) | 55296), (s = 56320 | (s & 1023))), n.push(s), (e += u)
        }
        if (((t = n.length), t <= jn)) n = String.fromCharCode.apply(String, n)
        else {
            for (r = "", e = 0; e < t; ) r += String.fromCharCode.apply(String, n.slice(e, (e += jn)))
            n = r
        }
        return n
    }
    var jn = 4096
    R.prototype.slice = function (t, e) {
        var r = this.length
        if (((t = ~~t), (e = e === void 0 ? r : ~~e), 0 > t ? ((t += r), 0 > t && (t = 0)) : t > r && (t = r), 0 > e ? ((e += r), 0 > e && (e = 0)) : e > r && (e = r), e < t && (e = t), R.TYPED_ARRAY_SUPPORT)) (e = this.subarray(t, e)), (e.__proto__ = R.prototype)
        else {
            ;(r = e - t), (e = new R(r, void 0))
            for (var n = 0; n < r; ++n) e[n] = this[n + t]
        }
        return e
    }
    function Z(t, e, r) {
        if (t % 1 !== 0 || 0 > t) throw new RangeError("offset is not uint")
        if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
    }
    ;(R.prototype.readUIntLE = function (t, e, r) {
        ;(t |= 0), (e |= 0), r || Z(t, e, this.length), (r = this[t])
        for (var n = 1, i = 0; ++i < e && (n *= 256); ) r += this[t + i] * n
        return r
    }),
        (R.prototype.readUIntBE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || Z(t, e, this.length), (r = this[t + --e])
            for (var n = 1; 0 < e && (n *= 256); ) r += this[t + --e] * n
            return r
        }),
        (R.prototype.readUInt8 = function (t, e) {
            return e || Z(t, 1, this.length), this[t]
        }),
        (R.prototype.readUInt16LE = function (t, e) {
            return e || Z(t, 2, this.length), this[t] | (this[t + 1] << 8)
        }),
        (R.prototype.readUInt16BE = function (t, e) {
            return e || Z(t, 2, this.length), (this[t] << 8) | this[t + 1]
        }),
        (R.prototype.readUInt32LE = function (t, e) {
            return e || Z(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
        }),
        (R.prototype.readUInt32BE = function (t, e) {
            return e || Z(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
        }),
        (R.prototype.readIntLE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || Z(t, e, this.length), (r = this[t])
            for (var n = 1, i = 0; ++i < e && (n *= 256); ) r += this[t + i] * n
            return r >= 128 * n && (r -= Math.pow(2, 8 * e)), r
        }),
        (R.prototype.readIntBE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || Z(t, e, this.length), (r = e)
            for (var n = 1, i = this[t + --r]; 0 < r && (n *= 256); ) i += this[t + --r] * n
            return i >= 128 * n && (i -= Math.pow(2, 8 * e)), i
        }),
        (R.prototype.readInt8 = function (t, e) {
            return e || Z(t, 1, this.length), this[t] & 128 ? -1 * (255 - this[t] + 1) : this[t]
        }),
        (R.prototype.readInt16LE = function (t, e) {
            return e || Z(t, 2, this.length), (t = this[t] | (this[t + 1] << 8)), t & 32768 ? t | 4294901760 : t
        }),
        (R.prototype.readInt16BE = function (t, e) {
            return e || Z(t, 2, this.length), (t = this[t + 1] | (this[t] << 8)), t & 32768 ? t | 4294901760 : t
        }),
        (R.prototype.readInt32LE = function (t, e) {
            return e || Z(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
        }),
        (R.prototype.readInt32BE = function (t, e) {
            return e || Z(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
        }),
        (R.prototype.readFloatLE = function (t, e) {
            return e || Z(t, 4, this.length), Xe(this, t, !0, 23, 4)
        }),
        (R.prototype.readFloatBE = function (t, e) {
            return e || Z(t, 4, this.length), Xe(this, t, !1, 23, 4)
        }),
        (R.prototype.readDoubleLE = function (t, e) {
            return e || Z(t, 8, this.length), Xe(this, t, !0, 52, 8)
        }),
        (R.prototype.readDoubleBE = function (t, e) {
            return e || Z(t, 8, this.length), Xe(this, t, !1, 52, 8)
        })
    function nt(t, e, r, n, i, s) {
        if (!vt(t)) throw new TypeError('"buffer" argument must be a Buffer instance')
        if (e > i || e < s) throw new RangeError('"value" argument is out of bounds')
        if (r + n > t.length) throw new RangeError("Index out of range")
    }
    ;(R.prototype.writeUIntLE = function (t, e, r, n) {
        ;(t = +t), (e |= 0), (r |= 0), n || nt(this, t, e, r, Math.pow(2, 8 * r) - 1, 0), (n = 1)
        var i = 0
        for (this[e] = t & 255; ++i < r && (n *= 256); ) this[e + i] = (t / n) & 255
        return e + r
    }),
        (R.prototype.writeUIntBE = function (t, e, r, n) {
            ;(t = +t), (e |= 0), (r |= 0), n || nt(this, t, e, r, Math.pow(2, 8 * r) - 1, 0), (n = r - 1)
            var i = 1
            for (this[e + n] = t & 255; 0 <= --n && (i *= 256); ) this[e + n] = (t / i) & 255
            return e + r
        }),
        (R.prototype.writeUInt8 = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 1, 255, 0), R.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), (this[e] = t & 255), e + 1
        })
    function Ze(t, e, r, n) {
        0 > e && (e = 65535 + e + 1)
        for (var i = 0, s = Math.min(t.length - r, 2); i < s; ++i) t[r + i] = (e & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i))
    }
    ;(R.prototype.writeUInt16LE = function (t, e, r) {
        return (t = +t), (e |= 0), r || nt(this, t, e, 2, 65535, 0), R.TYPED_ARRAY_SUPPORT ? ((this[e] = t & 255), (this[e + 1] = t >>> 8)) : Ze(this, t, e, !0), e + 2
    }),
        (R.prototype.writeUInt16BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 2, 65535, 0), R.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = t & 255)) : Ze(this, t, e, !1), e + 2
        })
    function Qe(t, e, r, n) {
        0 > e && (e = 4294967295 + e + 1)
        for (var i = 0, s = Math.min(t.length - r, 4); i < s; ++i) t[r + i] = (e >>> (8 * (n ? i : 3 - i))) & 255
    }
    ;(R.prototype.writeUInt32LE = function (t, e, r) {
        return (t = +t), (e |= 0), r || nt(this, t, e, 4, 4294967295, 0), R.TYPED_ARRAY_SUPPORT ? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = t & 255)) : Qe(this, t, e, !0), e + 4
    }),
        (R.prototype.writeUInt32BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 4, 4294967295, 0), R.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = t & 255)) : Qe(this, t, e, !1), e + 4
        }),
        (R.prototype.writeIntLE = function (t, e, r, n) {
            ;(t = +t), (e |= 0), n || ((n = Math.pow(2, 8 * r - 1)), nt(this, t, e, r, n - 1, -n)), (n = 0)
            var i = 1,
                s = 0
            for (this[e] = t & 255; ++n < r && (i *= 256); ) 0 > t && s === 0 && this[e + n - 1] !== 0 && (s = 1), (this[e + n] = (((t / i) >> 0) - s) & 255)
            return e + r
        }),
        (R.prototype.writeIntBE = function (t, e, r, n) {
            ;(t = +t), (e |= 0), n || ((n = Math.pow(2, 8 * r - 1)), nt(this, t, e, r, n - 1, -n)), (n = r - 1)
            var i = 1,
                s = 0
            for (this[e + n] = t & 255; 0 <= --n && (i *= 256); ) 0 > t && s === 0 && this[e + n + 1] !== 0 && (s = 1), (this[e + n] = (((t / i) >> 0) - s) & 255)
            return e + r
        }),
        (R.prototype.writeInt8 = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 1, 127, -128), R.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 0 > t && (t = 255 + t + 1), (this[e] = t & 255), e + 1
        }),
        (R.prototype.writeInt16LE = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 2, 32767, -32768), R.TYPED_ARRAY_SUPPORT ? ((this[e] = t & 255), (this[e + 1] = t >>> 8)) : Ze(this, t, e, !0), e + 2
        }),
        (R.prototype.writeInt16BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 2, 32767, -32768), R.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = t & 255)) : Ze(this, t, e, !1), e + 2
        }),
        (R.prototype.writeInt32LE = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 4, 2147483647, -2147483648), R.TYPED_ARRAY_SUPPORT ? ((this[e] = t & 255), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24)) : Qe(this, t, e, !0), e + 4
        }),
        (R.prototype.writeInt32BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || nt(this, t, e, 4, 2147483647, -2147483648), 0 > t && (t = 4294967295 + t + 1), R.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = t & 255)) : Qe(this, t, e, !1), e + 4
        })
    function be(t, e, r, n) {
        if (r + n > t.length) throw new RangeError("Index out of range")
        if (0 > r) throw new RangeError("Index out of range")
    }
    ;(R.prototype.writeFloatLE = function (t, e, r) {
        return r || be(this, t, e, 4), Je(this, t, e, !0, 23, 4), e + 4
    }),
        (R.prototype.writeFloatBE = function (t, e, r) {
            return r || be(this, t, e, 4), Je(this, t, e, !1, 23, 4), e + 4
        }),
        (R.prototype.writeDoubleLE = function (t, e, r) {
            return r || be(this, t, e, 8), Je(this, t, e, !0, 52, 8), e + 8
        }),
        (R.prototype.writeDoubleBE = function (t, e, r) {
            return r || be(this, t, e, 8), Je(this, t, e, !1, 52, 8), e + 8
        }),
        (R.prototype.copy = function (t, e, r, n) {
            if ((r || (r = 0), n || n === 0 || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), 0 < n && n < r && (n = r), n === r || t.length === 0 || this.length === 0)) return 0
            if (0 > e) throw new RangeError("targetStart out of bounds")
            if (0 > r || r >= this.length) throw new RangeError("sourceStart out of bounds")
            if (0 > n) throw new RangeError("sourceEnd out of bounds")
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r)
            var i = n - r
            if (this === t && r < e && e < n) for (n = i - 1; 0 <= n; --n) t[n + e] = this[n + r]
            else if (1e3 > i || !R.TYPED_ARRAY_SUPPORT) for (n = 0; n < i; ++n) t[n + e] = this[n + r]
            else Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e)
            return i
        }),
        (R.prototype.fill = function (t, e, r, n) {
            if (typeof t == "string") {
                if ((typeof e == "string" ? ((n = e), (e = 0), (r = this.length)) : typeof r == "string" && ((n = r), (r = this.length)), t.length === 1)) {
                    var i = t.charCodeAt(0)
                    256 > i && (t = i)
                }
                if (n !== void 0 && typeof n != "string") throw new TypeError("encoding must be a string")
                if (typeof n == "string" && !R.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
            } else typeof t == "number" && (t &= 255)
            if (0 > e || this.length < e || this.length < r) throw new RangeError("Out of range index")
            if (r <= e) return this
            if (((e >>>= 0), (r = r === void 0 ? this.length : r >>> 0), t || (t = 0), typeof t == "number")) for (n = e; n < r; ++n) this[n] = t
            else for (t = vt(t) ? t : tr(new R(t, n).toString()), i = t.length, n = 0; n < r - e; ++n) this[n + e] = t[n % i]
            return this
        })
    var os = /[^+\/0-9A-Za-z-_]/g
    function tr(t, e) {
        e = e || 1 / 0
        for (var r, n = t.length, i = null, s = [], u = 0; u < n; ++u) {
            if (((r = t.charCodeAt(u)), 55295 < r && 57344 > r)) {
                if (!i) {
                    if (56319 < r) {
                        ;-1 < (e -= 3) && s.push(239, 191, 189)
                        continue
                    } else if (u + 1 === n) {
                        ;-1 < (e -= 3) && s.push(239, 191, 189)
                        continue
                    }
                    i = r
                    continue
                }
                if (56320 > r) {
                    ;-1 < (e -= 3) && s.push(239, 191, 189), (i = r)
                    continue
                }
                r = (((i - 55296) << 10) | (r - 56320)) + 65536
            } else i && -1 < (e -= 3) && s.push(239, 191, 189)
            if (((i = null), 128 > r)) {
                if (0 > --e) break
                s.push(r)
            } else if (2048 > r) {
                if (0 > (e -= 2)) break
                s.push((r >> 6) | 192, (r & 63) | 128)
            } else if (65536 > r) {
                if (0 > (e -= 3)) break
                s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (r & 63) | 128)
            } else if (1114112 > r) {
                if (0 > (e -= 4)) break
                s.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (r & 63) | 128)
            } else throw Error("Invalid code point")
        }
        return s
    }
    function Yn(t) {
        for (var e = [], r = 0; r < t.length; ++r) e.push(t.charCodeAt(r) & 255)
        return e
    }
    function $n(t) {
        if (((t = (t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")).replace(os, "")), 2 > t.length)) t = ""
        else for (; t.length % 4 !== 0; ) t += "="
        Tr || Ln()
        var e = t.length
        if (0 < e % 4) throw Error("Invalid string. Length must be a multiple of 4")
        var r = t[e - 2] === "=" ? 2 : t[e - 1] === "=" ? 1 : 0,
            n = new bo((3 * e) / 4 - r),
            i = 0 < r ? e - 4 : e,
            s = 0
        for (e = 0; e < i; e += 4) {
            var u = (lt[t.charCodeAt(e)] << 18) | (lt[t.charCodeAt(e + 1)] << 12) | (lt[t.charCodeAt(e + 2)] << 6) | lt[t.charCodeAt(e + 3)]
            ;(n[s++] = (u >> 16) & 255), (n[s++] = (u >> 8) & 255), (n[s++] = u & 255)
        }
        return r === 2 ? ((u = (lt[t.charCodeAt(e)] << 2) | (lt[t.charCodeAt(e + 1)] >> 4)), (n[s++] = u & 255)) : r === 1 && ((u = (lt[t.charCodeAt(e)] << 10) | (lt[t.charCodeAt(e + 1)] << 4) | (lt[t.charCodeAt(e + 2)] >> 2)), (n[s++] = (u >> 8) & 255), (n[s++] = u & 255)), n
    }
    function ke(t, e, r, n) {
        for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i]
        return i
    }
    function Wn(t) {
        return t != null && (!!t._isBuffer || Gn(t) || (typeof t.readFloatLE == "function" && typeof t.slice == "function" && Gn(t.slice(0, 0))))
    }
    function Gn(t) {
        return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t)
    }
    var er = Object.freeze({
            __proto__: null,
            INSPECT_MAX_BYTES: 50,
            kMaxLength: rs,
            Buffer: R,
            SlowBuffer: function (t) {
                return +t != t && (t = 0), R.alloc(+t)
            },
            isBuffer: Wn,
        }),
        z = R,
        rr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
    function Lr(t, e) {
        return (e = { exports: {} }), t(e, e.exports), e.exports
    }
    function zn() {
        throw Error("setTimeout has not been defined")
    }
    function Vn() {
        throw Error("clearTimeout has not been defined")
    }
    var Ut = zn,
        Dt = Vn
    typeof Ne.setTimeout == "function" && (Ut = setTimeout), typeof Ne.clearTimeout == "function" && (Dt = clearTimeout)
    function qn(t) {
        if (Ut === setTimeout) return setTimeout(t, 0)
        if ((Ut === zn || !Ut) && setTimeout) return (Ut = setTimeout), setTimeout(t, 0)
        try {
            return Ut(t, 0)
        } catch {
            try {
                return Ut.call(null, t, 0)
            } catch {
                return Ut.call(this, t, 0)
            }
        }
    }
    function ss(t) {
        if (Dt === clearTimeout) return clearTimeout(t)
        if ((Dt === Vn || !Dt) && clearTimeout) return (Dt = clearTimeout), clearTimeout(t)
        try {
            return Dt(t)
        } catch {
            try {
                return Dt.call(null, t)
            } catch {
                return Dt.call(this, t)
            }
        }
    }
    var Nt = [],
        le = !1,
        Xt,
        nr = -1
    function us() {
        le && Xt && ((le = !1), Xt.length ? (Nt = Xt.concat(Nt)) : (nr = -1), Nt.length && Kn())
    }
    function Kn() {
        if (!le) {
            var t = qn(us)
            le = !0
            for (var e = Nt.length; e; ) {
                for (Xt = Nt, Nt = []; ++nr < e; ) Xt && Xt[nr].run()
                ;(nr = -1), (e = Nt.length)
            }
            ;(Xt = null), (le = !1), ss(t)
        }
    }
    function Hn(t) {
        var e = Array(arguments.length - 1)
        if (1 < arguments.length) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r]
        Nt.push(new Xn(t, e)), Nt.length !== 1 || le || qn(Kn)
    }
    function Xn(t, e) {
        ;(this.fun = t), (this.array = e)
    }
    Xn.prototype.run = function () {
        this.fun.apply(null, this.array)
    }
    function Jt() {}
    var ce = Ne.performance || {},
        fs =
            ce.now ||
            ce.mozNow ||
            ce.msNow ||
            ce.oNow ||
            ce.webkitNow ||
            function () {
                return new Date().getTime()
            },
        hs = new Date(),
        ls = {
            nextTick: Hn,
            title: "browser",
            browser: !0,
            env: {},
            argv: [],
            version: "",
            versions: {},
            on: Jt,
            addListener: Jt,
            once: Jt,
            off: Jt,
            removeListener: Jt,
            removeAllListeners: Jt,
            emit: Jt,
            binding: function () {
                throw Error("process.binding is not supported")
            },
            cwd: function () {
                return "/"
            },
            chdir: function () {
                throw Error("process.chdir is not supported")
            },
            umask: function () {
                return 0
            },
            hrtime: function (t) {
                var e = 0.001 * fs.call(ce),
                    r = Math.floor(e)
                return (e = Math.floor((e % 1) * 1e9)), t && ((r -= t[0]), (e -= t[1]), 0 > e && (r--, (e += 1e9))), [r, e]
            },
            platform: "browser",
            release: {},
            config: {},
            uptime: function () {
                return (new Date() - hs) / 1e3
            },
        },
        Jn = Lr(function (t, e) {
            function r(s, u) {
                for (var l in s) u[l] = s[l]
            }
            function n(s, u, l) {
                return i(s, u, l)
            }
            var i = er.Buffer
            i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? (t.exports = er) : (r(er, e), (e.Buffer = n)),
                (n.prototype = Object.create(i.prototype)),
                r(i, n),
                (n.from = function (s, u, l) {
                    if (typeof s == "number") throw new TypeError("Argument must not be a number")
                    return i(s, u, l)
                }),
                (n.alloc = function (s, u, l) {
                    if (typeof s != "number") throw new TypeError("Argument must be a number")
                    return (s = i(s)), u !== void 0 ? (typeof l == "string" ? s.fill(u, l) : s.fill(u)) : s.fill(0), s
                }),
                (n.allocUnsafe = function (s) {
                    if (typeof s != "number") throw new TypeError("Argument must be a number")
                    return i(s)
                }),
                (n.allocUnsafeSlow = function (s) {
                    if (typeof s != "number") throw new TypeError("Argument must be a number")
                    return er.SlowBuffer(s)
                })
        }),
        cs = Lr(function (t, e) {
            function r() {
                throw Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`)
            }
            function n(v, w) {
                if (typeof v != "number" || v !== v) throw new TypeError("offset must be a number")
                if (v > y || 0 > v) throw new TypeError("offset must be a uint32")
                if (v > p || v > w) throw new RangeError("offset out of range")
            }
            function i(v, w, O) {
                if (typeof v != "number" || v !== v) throw new TypeError("size must be a number")
                if (v > y || 0 > v) throw new TypeError("size must be a uint32")
                if (v + w > O || v > p) throw new RangeError("buffer too small")
            }
            function s(v, w, O, $) {
                if (!(g.isBuffer(v) || v instanceof rr.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
                if (typeof w == "function") ($ = w), (w = 0), (O = v.length)
                else if (typeof O == "function") ($ = O), (O = v.length - w)
                else if (typeof $ != "function") throw new TypeError('"cb" argument must be a function')
                return n(w, v.length), i(O, w, v.length), u(v, w, O, $)
            }
            function u(v, w, O, $) {
                if (((w = new Uint8Array(v.buffer, w, O)), a.getRandomValues(w), $))
                    Hn(function () {
                        $(null, v)
                    })
                else return v
            }
            function l(v, w, O) {
                if ((typeof w > "u" && (w = 0), !(g.isBuffer(v) || v instanceof rr.Uint8Array))) throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
                return n(w, v.length), O === void 0 && (O = v.length - w), i(O, w, v.length), u(v, w, O)
            }
            var g = Jn.Buffer,
                p = Jn.kMaxLength,
                a = rr.crypto || rr.msCrypto,
                y = Math.pow(2, 32) - 1
            a && a.getRandomValues ? ((e.randomFill = s), (e.randomFillSync = l)) : ((e.randomFill = r), (e.randomFillSync = r))
        }),
        ps = Lr(function (t) {
            t.exports = cs
        }).randomFillSync,
        as = Math.floor(0.001 * (Date.now() - performance.now()))
    function wt(t) {
        if (typeof t != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(t))
    }
    function Zn(t, e) {
        for (var r = "", n = 0, i = -1, s = 0, u, l = 0; l <= t.length; ++l) {
            if (l < t.length) u = t.charCodeAt(l)
            else {
                if (u === 47) break
                u = 47
            }
            if (u === 47) {
                if (i !== l - 1 && s !== 1)
                    if (i !== l - 1 && s === 2) {
                        if (2 > r.length || n !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
                            if (2 < r.length) {
                                if (((i = r.lastIndexOf("/")), i !== r.length - 1)) {
                                    i === -1 ? ((r = ""), (n = 0)) : ((r = r.slice(0, i)), (n = r.length - 1 - r.lastIndexOf("/"))), (i = l), (s = 0)
                                    continue
                                }
                            } else if (r.length === 2 || r.length === 1) {
                                ;(r = ""), (n = 0), (i = l), (s = 0)
                                continue
                            }
                        }
                        e && ((r = 0 < r.length ? r + "/.." : ".."), (n = 2))
                    } else (r = 0 < r.length ? r + ("/" + t.slice(i + 1, l)) : t.slice(i + 1, l)), (n = l - i - 1)
                ;(i = l), (s = 0)
            } else u === 46 && s !== -1 ? ++s : (s = -1)
        }
        return r
    }
    var Le = {
            resolve: function () {
                for (var t = "", e = !1, r, n = arguments.length - 1; -1 <= n && !e; n--) {
                    if (0 <= n) var i = arguments[n]
                    else r === void 0 && (r = ls.cwd()), (i = r)
                    wt(i), i.length !== 0 && ((t = i + "/" + t), (e = i.charCodeAt(0) === 47))
                }
                return (t = Zn(t, !e)), e ? (0 < t.length ? "/" + t : "/") : 0 < t.length ? t : "."
            },
            normalize: function (t) {
                if ((wt(t), t.length === 0)) return "."
                var e = t.charCodeAt(0) === 47,
                    r = t.charCodeAt(t.length - 1) === 47
                return (t = Zn(t, !e)), t.length !== 0 || e || (t = "."), 0 < t.length && r && (t += "/"), e ? "/" + t : t
            },
            isAbsolute: function (t) {
                return wt(t), 0 < t.length && t.charCodeAt(0) === 47
            },
            join: function () {
                if (arguments.length === 0) return "."
                for (var t, e = 0; e < arguments.length; ++e) {
                    var r = arguments[e]
                    wt(r), 0 < r.length && (t = t === void 0 ? r : t + ("/" + r))
                }
                return t === void 0 ? "." : Le.normalize(t)
            },
            relative: function (t, e) {
                if ((wt(t), wt(e), t === e || ((t = Le.resolve(t)), (e = Le.resolve(e)), t === e))) return ""
                for (var r = 1; r < t.length && t.charCodeAt(r) === 47; ++r);
                for (var n = t.length, i = n - r, s = 1; s < e.length && e.charCodeAt(s) === 47; ++s);
                for (var u = e.length - s, l = i < u ? i : u, g = -1, p = 0; p <= l; ++p) {
                    if (p === l) {
                        if (u > l) {
                            if (e.charCodeAt(s + p) === 47) return e.slice(s + p + 1)
                            if (p === 0) return e.slice(s + p)
                        } else i > l && (t.charCodeAt(r + p) === 47 ? (g = p) : p === 0 && (g = 0))
                        break
                    }
                    var a = t.charCodeAt(r + p),
                        y = e.charCodeAt(s + p)
                    if (a !== y) break
                    a === 47 && (g = p)
                }
                for (i = "", p = r + g + 1; p <= n; ++p) (p === n || t.charCodeAt(p) === 47) && (i = i.length === 0 ? i + ".." : i + "/..")
                return 0 < i.length ? i + e.slice(s + g) : ((s += g), e.charCodeAt(s) === 47 && ++s, e.slice(s))
            },
            _makeLong: function (t) {
                return t
            },
            dirname: function (t) {
                if ((wt(t), t.length === 0)) return "."
                for (var e = t.charCodeAt(0), r = e === 47, n = -1, i = !0, s = t.length - 1; 1 <= s; --s)
                    if (((e = t.charCodeAt(s)), e === 47)) {
                        if (!i) {
                            n = s
                            break
                        }
                    } else i = !1
                return n === -1 ? (r ? "/" : ".") : r && n === 1 ? "//" : t.slice(0, n)
            },
            basename: function (t, e) {
                if (e !== void 0 && typeof e != "string") throw new TypeError('"ext" argument must be a string')
                wt(t)
                var r = 0,
                    n = -1,
                    i = !0,
                    s
                if (e !== void 0 && 0 < e.length && e.length <= t.length) {
                    if (e.length === t.length && e === t) return ""
                    var u = e.length - 1,
                        l = -1
                    for (s = t.length - 1; 0 <= s; --s) {
                        var g = t.charCodeAt(s)
                        if (g === 47) {
                            if (!i) {
                                r = s + 1
                                break
                            }
                        } else l === -1 && ((i = !1), (l = s + 1)), 0 <= u && (g === e.charCodeAt(u) ? --u === -1 && (n = s) : ((u = -1), (n = l)))
                    }
                    return r === n ? (n = l) : n === -1 && (n = t.length), t.slice(r, n)
                }
                for (s = t.length - 1; 0 <= s; --s)
                    if (t.charCodeAt(s) === 47) {
                        if (!i) {
                            r = s + 1
                            break
                        }
                    } else n === -1 && ((i = !1), (n = s + 1))
                return n === -1 ? "" : t.slice(r, n)
            },
            extname: function (t) {
                wt(t)
                for (var e = -1, r = 0, n = -1, i = !0, s = 0, u = t.length - 1; 0 <= u; --u) {
                    var l = t.charCodeAt(u)
                    if (l === 47) {
                        if (!i) {
                            r = u + 1
                            break
                        }
                    } else n === -1 && ((i = !1), (n = u + 1)), l === 46 ? (e === -1 ? (e = u) : s !== 1 && (s = 1)) : e !== -1 && (s = -1)
                }
                return e === -1 || n === -1 || s === 0 || (s === 1 && e === n - 1 && e === r + 1) ? "" : t.slice(e, n)
            },
            format: function (t) {
                if (t === null || typeof t != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t)
                var e = t.dir || t.root,
                    r = t.base || (t.name || "") + (t.ext || "")
                return (t = e ? (e === t.root ? e + r : e + "/" + r) : r), t
            },
            parse: function (t) {
                wt(t)
                var e = { root: "", dir: "", base: "", ext: "", name: "" }
                if (t.length === 0) return e
                var r = t.charCodeAt(0),
                    n = r === 47
                if (n) {
                    e.root = "/"
                    var i = 1
                } else i = 0
                for (var s = -1, u = 0, l = -1, g = !0, p = t.length - 1, a = 0; p >= i; --p)
                    if (((r = t.charCodeAt(p)), r === 47)) {
                        if (!g) {
                            u = p + 1
                            break
                        }
                    } else l === -1 && ((g = !1), (l = p + 1)), r === 46 ? (s === -1 ? (s = p) : a !== 1 && (a = 1)) : s !== -1 && (a = -1)
                return s === -1 || l === -1 || a === 0 || (a === 1 && s === l - 1 && s === u + 1) ? l !== -1 && (e.base = u === 0 && n ? (e.name = t.slice(1, l)) : (e.name = t.slice(u, l))) : (u === 0 && n ? ((e.name = t.slice(1, s)), (e.base = t.slice(1, l))) : ((e.name = t.slice(u, s)), (e.base = t.slice(u, l))), (e.ext = t.slice(s, l))), 0 < u ? (e.dir = t.slice(0, u - 1)) : n && (e.dir = "/"), e
            },
            sep: "/",
            delimiter: ":",
            win32: null,
            posix: null,
        },
        Qn = (Le.posix = Le),
        ys = Object.freeze({ __proto__: null, default: Qn, __moduleExports: Qn }),
        bn = {
            hrtime: (function (t) {
                return function (e) {
                    return (e = t(e)), 1e9 * e[0] + e[1]
                }
            })(function (t) {
                var e = 0.001 * performance.now(),
                    r = Math.floor(e) + as
                return (e = Math.floor((e % 1) * 1e9)), t && ((r -= t[0]), (e -= t[1]), 0 > e && (r--, (e += 1e9))), [r, e]
            }),
            exit: function (t) {
                throw new fi(t)
            },
            kill: function (t) {
                throw new Es(t)
            },
            randomFillSync: ps,
            isTTY: function () {
                return !0
            },
            path: ys,
            fs: null,
        },
        Y,
        Zt = T(1),
        Mt = T(2),
        pe = T(4),
        ae = T(8),
        xt = T(16),
        Pr = T(32),
        jt = T(64),
        ye = T(128),
        ir = T(256),
        Cr = T(512),
        Br = T(1024),
        Fr = T(2048),
        Ur = T(4096),
        or = T(8192),
        sr = T(16384),
        Dr = T(32768),
        Mr = T(65536),
        xr = T(131072),
        jr = T(262144),
        Yr = T(524288),
        $r = T(1048576),
        Yt = T(2097152),
        ur = T(4194304),
        fr = T(8388608),
        Wr = T(16777216),
        Gr = T(33554432),
        zr = T(67108864),
        Qt = T(134217728),
        ti = T(268435456),
        ge = Zt | Mt | pe | ae | xt | Pr | jt | ye | ir | Cr | Br | Fr | Ur | or | sr | Dr | Mr | xr | jr | Yr | $r | Yt | fr | ur | Wr | zr | Gr | Qt | ti,
        ei = Zt | Mt | pe | ae | xt | Pr | jt | ye | ir | Yt | ur | fr | Qt,
        gs = T(0),
        Vr = ae | xt | ye | Cr | Br | Fr | Ur | or | sr | Dr | Mr | xr | jr | Yr | $r | Yt | fr | Wr | zr | Gr | Qt,
        ri = Vr | ei,
        ni = Mt | ae | jt | Yt | Qt | ti,
        ds = Mt | ae | jt | Yt | Qt,
        ms = T(0),
        vs = { E2BIG: 1, EACCES: 2, EADDRINUSE: 3, EADDRNOTAVAIL: 4, EAFNOSUPPORT: 5, EALREADY: 7, EAGAIN: 6, EBADF: 8, EBADMSG: 9, EBUSY: 10, ECANCELED: 11, ECHILD: 12, ECONNABORTED: 13, ECONNREFUSED: 14, ECONNRESET: 15, EDEADLOCK: 16, EDESTADDRREQ: 17, EDOM: 18, EDQUOT: 19, EEXIST: 20, EFAULT: 21, EFBIG: 22, EHOSTDOWN: 23, EHOSTUNREACH: 23, EIDRM: 24, EILSEQ: 25, EINPROGRESS: 26, EINTR: 27, EINVAL: 28, EIO: 29, EISCONN: 30, EISDIR: 31, ELOOP: 32, EMFILE: 33, EMLINK: 34, EMSGSIZE: 35, EMULTIHOP: 36, ENAMETOOLONG: 37, ENETDOWN: 38, ENETRESET: 39, ENETUNREACH: 40, ENFILE: 41, ENOBUFS: 42, ENODEV: 43, ENOENT: 44, ENOEXEC: 45, ENOLCK: 46, ENOLINK: 47, ENOMEM: 48, ENOMSG: 49, ENOPROTOOPT: 50, ENOSPC: 51, ENOSYS: 52, ENOTCONN: 53, ENOTDIR: 54, ENOTEMPTY: 55, ENOTRECOVERABLE: 56, ENOTSOCK: 57, ENOTTY: 59, ENXIO: 60, EOVERFLOW: 61, EOWNERDEAD: 62, EPERM: 63, EPIPE: 64, EPROTO: 65, EPROTONOSUPPORT: 66, EPROTOTYPE: 67, ERANGE: 68, EROFS: 69, ESPIPE: 70, ESRCH: 71, ESTALE: 72, ETIMEDOUT: 73, ETXTBSY: 74, EXDEV: 75 },
        ii = ((Y = {}), (Y[6] = "SIGHUP"), (Y[8] = "SIGINT"), (Y[11] = "SIGQUIT"), (Y[7] = "SIGILL"), (Y[15] = "SIGTRAP"), (Y[0] = "SIGABRT"), (Y[2] = "SIGBUS"), (Y[5] = "SIGFPE"), (Y[9] = "SIGKILL"), (Y[20] = "SIGUSR1"), (Y[12] = "SIGSEGV"), (Y[21] = "SIGUSR2"), (Y[10] = "SIGPIPE"), (Y[1] = "SIGALRM"), (Y[14] = "SIGTERM"), (Y[3] = "SIGCHLD"), (Y[4] = "SIGCONT"), (Y[13] = "SIGSTOP"), (Y[16] = "SIGTSTP"), (Y[17] = "SIGTTIN"), (Y[18] = "SIGTTOU"), (Y[19] = "SIGURG"), (Y[23] = "SIGXCPU"), (Y[24] = "SIGXFSZ"), (Y[22] = "SIGVTALRM"), Y),
        ws = Zt | Mt | xt | ye | Yt | Qt,
        oi = Zt | jt | xt | ye | Yt | Qt
    function bt(t) {
        var e = Math.trunc(t)
        return (t = T(Math.round(1e6 * (t - e)))), T(e) * T(1e6) + t
    }
    function de(t) {
        return typeof t == "number" && (t = Math.trunc(t)), (t = T(t)), Number(t / T(1e6))
    }
    function x(t) {
        return function () {
            for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r]
            try {
                return t.apply(void 0, Ke(e))
            } catch (n) {
                if (n && n.code && typeof n.code == "string") return vs[n.code] || 28
                if (n instanceof qr) return n.errno
                throw n
            }
        }
    }
    function si(t, e) {
        var r = t.FD_MAP.get(e)
        if (!r) throw new qr(8)
        if (r.filetype === void 0) {
            var n = t.bindings.fs.fstatSync(r.real)
            ;(t = ui(t, e, n)), (e = t.rightsBase), (n = t.rightsInheriting), (r.filetype = t.filetype), r.rights || (r.rights = { base: e, inheriting: n })
        }
        return r
    }
    function ui(t, e, r) {
        switch (!0) {
            case r.isBlockDevice():
                return { filetype: 1, rightsBase: ge, rightsInheriting: ge }
            case r.isCharacterDevice():
                return e !== void 0 && t.bindings.isTTY(e) ? { filetype: 2, rightsBase: ds, rightsInheriting: ms } : { filetype: 2, rightsBase: ge, rightsInheriting: ge }
            case r.isDirectory():
                return { filetype: 3, rightsBase: Vr, rightsInheriting: ri }
            case r.isFIFO():
                return { filetype: 6, rightsBase: ni, rightsInheriting: ge }
            case r.isFile():
                return { filetype: 4, rightsBase: ei, rightsInheriting: gs }
            case r.isSocket():
                return { filetype: 6, rightsBase: ni, rightsInheriting: ge }
            case r.isSymbolicLink():
                return { filetype: 7, rightsBase: T(0), rightsInheriting: T(0) }
            default:
                return { filetype: 0, rightsBase: T(0), rightsInheriting: T(0) }
        }
    }
    var qr = (function (t) {
            function e(r) {
                var n = t.call(this) || this
                return (n.errno = r), Object.setPrototypeOf(n, e.prototype), n
            }
            return Or(e, t), e
        })(Error),
        fi = (function (t) {
            function e(r) {
                var n = t.call(this, "WASI Exit error: " + r) || this
                return (n.code = r), Object.setPrototypeOf(n, e.prototype), n
            }
            return Or(e, t), e
        })(Error),
        Es = (function (t) {
            function e(r) {
                var n = t.call(this, "WASI Kill signal: " + r) || this
                return (n.signal = r), Object.setPrototypeOf(n, e.prototype), n
            }
            return Or(e, t), e
        })(Error),
        hi = (function () {
            function t(e) {
                function r(m) {
                    switch (m) {
                        case 1:
                            return a.hrtime()
                        case 0:
                            return bt(Date.now())
                        case 2:
                        case 3:
                            return a.hrtime() - gt
                        default:
                            return null
                    }
                }
                function n(m, E) {
                    if (((m = si(u, m)), E !== T(0) && (m.rights.base & E) === T(0))) throw new qr(63)
                    return m
                }
                function i(m, E) {
                    return (
                        u.refreshMemory(),
                        Array.from({ length: E }, function (A, I) {
                            return (I = m + 8 * I), (A = u.view.getUint32(I, !0)), (I = u.view.getUint32(I + 4, !0)), new Uint8Array(u.memory.buffer, A, I)
                        })
                    )
                }
                var s,
                    u = this,
                    l = {}
                e && e.preopens ? (l = e.preopens) : e && e.preopenDirectories && (l = e.preopenDirectories)
                var g = {}
                e && e.env && (g = e.env)
                var p = []
                e && e.args && (p = e.args)
                var a = bn
                e && e.bindings && (a = e.bindings),
                    (this.view = this.memory = void 0),
                    (this.bindings = a),
                    (this.FD_MAP = new Map([
                        [0, { real: 0, filetype: 2, rights: { base: ws, inheriting: T(0) }, path: void 0 }],
                        [1, { real: 1, filetype: 2, rights: { base: oi, inheriting: T(0) }, path: void 0 }],
                        [2, { real: 2, filetype: 2, rights: { base: oi, inheriting: T(0) }, path: void 0 }],
                    ]))
                var y = this.bindings.fs,
                    v = this.bindings.path
                try {
                    for (var w = Ve(Object.entries(l)), O = w.next(); !O.done; O = w.next()) {
                        var $ = qe(O.value, 2),
                            Tt = $[0],
                            Bt = $[1],
                            ue = y.openSync(Bt, y.constants.O_RDONLY),
                            rt = Ke(this.FD_MAP.keys()).reverse()[0] + 1
                        this.FD_MAP.set(rt, { real: ue, filetype: 3, rights: { base: Vr, inheriting: ri }, fakePath: Tt, path: Bt })
                    }
                } catch (m) {
                    var qt = { error: m }
                } finally {
                    try {
                        O && !O.done && (s = w.return) && s.call(w)
                    } finally {
                        if (qt) throw qt.error
                    }
                }
                var gt = a.hrtime()
                ;(this.wasiImport = {
                    args_get: function (m, E) {
                        u.refreshMemory()
                        var A = m,
                            I = E
                        return (
                            p.forEach(function (k) {
                                u.view.setUint32(A, I, !0), (A += 4), (I += z.from(u.memory.buffer).write(k + "\0", I))
                            }),
                            0
                        )
                    },
                    args_sizes_get: function (m, E) {
                        return (
                            u.refreshMemory(),
                            u.view.setUint32(m, p.length, !0),
                            (m = p.reduce(function (A, I) {
                                return A + z.byteLength(I) + 1
                            }, 0)),
                            u.view.setUint32(E, m, !0),
                            0
                        )
                    },
                    environ_get: function (m, E) {
                        u.refreshMemory()
                        var A = m,
                            I = E
                        return (
                            Object.entries(g).forEach(function (k) {
                                var L = qe(k, 2)
                                ;(k = L[0]), (L = L[1]), u.view.setUint32(A, I, !0), (A += 4), (I += z.from(u.memory.buffer).write(k + "=" + L + "\0", I))
                            }),
                            0
                        )
                    },
                    environ_sizes_get: function (m, E) {
                        u.refreshMemory()
                        var A = Object.entries(g).map(function (k) {
                                return (k = qe(k, 2)), k[0] + "=" + k[1] + "\0"
                            }),
                            I = A.reduce(function (k, L) {
                                return k + z.byteLength(L)
                            }, 0)
                        return u.view.setUint32(m, A.length, !0), u.view.setUint32(E, I, !0), 0
                    },
                    clock_res_get: function (m, E) {
                        switch (m) {
                            case 1:
                            case 2:
                            case 3:
                                var A = T(1)
                                break
                            case 0:
                                A = T(1e3)
                        }
                        return u.view.setBigUint64(E, A), 0
                    },
                    clock_time_get: function (m, E, A) {
                        return u.refreshMemory(), (m = r(m)), m === null ? 28 : (u.view.setBigUint64(A, T(m), !0), 0)
                    },
                    fd_advise: x(function (m) {
                        return n(m, ye), 52
                    }),
                    fd_allocate: x(function (m) {
                        return n(m, ir), 52
                    }),
                    fd_close: x(function (m) {
                        var E = n(m, T(0))
                        return y.closeSync(E.real), u.FD_MAP.delete(m), 0
                    }),
                    fd_datasync: x(function (m) {
                        return (m = n(m, Zt)), y.fdatasyncSync(m.real), 0
                    }),
                    fd_fdstat_get: x(function (m, E) {
                        return (m = n(m, T(0))), u.refreshMemory(), u.view.setUint8(E, m.filetype), u.view.setUint16(E + 2, 0, !0), u.view.setUint16(E + 4, 0, !0), u.view.setBigUint64(E + 8, T(m.rights.base), !0), u.view.setBigUint64(E + 8 + 8, T(m.rights.inheriting), !0), 0
                    }),
                    fd_fdstat_set_flags: x(function (m) {
                        return n(m, ae), 52
                    }),
                    fd_fdstat_set_rights: x(function (m, E, A) {
                        return (m = n(m, T(0))), (m.rights.base | E) > m.rights.base || (m.rights.inheriting | A) > m.rights.inheriting ? 63 : ((m.rights.base = E), (m.rights.inheriting = A), 0)
                    }),
                    fd_filestat_get: x(function (m, E) {
                        m = n(m, Yt)
                        var A = y.fstatSync(m.real)
                        return u.refreshMemory(), u.view.setBigUint64(E, T(A.dev), !0), (E += 8), u.view.setBigUint64(E, T(A.ino), !0), (E += 8), u.view.setUint8(E, m.filetype), (E += 8), u.view.setBigUint64(E, T(A.nlink), !0), (E += 8), u.view.setBigUint64(E, T(A.size), !0), (E += 8), u.view.setBigUint64(E, bt(A.atimeMs), !0), (E += 8), u.view.setBigUint64(E, bt(A.mtimeMs), !0), u.view.setBigUint64(E + 8, bt(A.ctimeMs), !0), 0
                    }),
                    fd_filestat_set_size: x(function (m, E) {
                        return (m = n(m, ur)), y.ftruncateSync(m.real, Number(E)), 0
                    }),
                    fd_filestat_set_times: x(function (m, E, A, I) {
                        m = n(m, fr)
                        var k = y.fstatSync(m.real),
                            L = k.atime
                        k = k.mtime
                        var C = de(r(0))
                        return (I & 3) === 3 || (I & 12) === 12 ? 28 : ((I & 1) === 1 ? (L = de(E)) : (I & 2) === 2 && (L = C), (I & 4) === 4 ? (k = de(A)) : (I & 8) === 8 && (k = C), y.futimesSync(m.real, new Date(L), new Date(k)), 0)
                    }),
                    fd_prestat_get: x(function (m, E) {
                        return (m = n(m, T(0))), m.path ? (u.refreshMemory(), u.view.setUint8(E, 0), u.view.setUint32(E + 4, z.byteLength(m.fakePath), !0), 0) : 28
                    }),
                    fd_prestat_dir_name: x(function (m, E, A) {
                        return (m = n(m, T(0))), m.path ? (u.refreshMemory(), z.from(u.memory.buffer).write(m.fakePath, E, A, "utf8"), 0) : 28
                    }),
                    fd_pwrite: x(function (m, E, A, I, k) {
                        var L = n(m, jt | pe),
                            C = 0
                        return (
                            i(E, A).forEach(function (B) {
                                for (var P = 0; P < B.byteLength; ) P += y.writeSync(L.real, B, P, B.byteLength - P, Number(I) + C + P)
                                C += P
                            }),
                            u.view.setUint32(k, C, !0),
                            0
                        )
                    }),
                    fd_write: x(function (m, E, A, I) {
                        var k = n(m, jt),
                            L = 0
                        return (
                            i(E, A).forEach(function (C) {
                                for (var B = 0; B < C.byteLength; ) {
                                    var P = y.writeSync(k.real, C, B, C.byteLength - B, k.offset ? Number(k.offset) : null)
                                    k.offset && (k.offset += T(P)), (B += P)
                                }
                                L += B
                            }),
                            u.view.setUint32(I, L, !0),
                            0
                        )
                    }),
                    fd_pread: x(function (m, E, A, I, k) {
                        var L
                        m = n(m, Mt | pe)
                        var C = 0
                        try {
                            var B = Ve(i(E, A)),
                                P = B.next()
                            t: for (; !P.done; P = B.next()) {
                                var D = P.value
                                for (E = 0; E < D.byteLength; ) {
                                    var M = D.byteLength - E,
                                        W = y.readSync(m.real, D, E, D.byteLength - E, Number(I) + C + E)
                                    if (((E += W), (C += W), W === 0 || W < M)) break t
                                }
                                C += E
                            }
                        } catch (J) {
                            var X = { error: J }
                        } finally {
                            try {
                                P && !P.done && (L = B.return) && L.call(B)
                            } finally {
                                if (X) throw X.error
                            }
                        }
                        return u.view.setUint32(k, C, !0), 0
                    }),
                    fd_read: x(function (m, E, A, I) {
                        var k
                        m = n(m, Mt)
                        var L = m.real === 0,
                            C = 0
                        try {
                            var B = Ve(i(E, A)),
                                P = B.next()
                            t: for (; !P.done; P = B.next()) {
                                var D = P.value
                                for (E = 0; E < D.byteLength; ) {
                                    var M = D.byteLength - E,
                                        W = y.readSync(m.real, D, E, M, L || m.offset === void 0 ? null : Number(m.offset))
                                    if ((L || (m.offset = (m.offset ? m.offset : T(0)) + T(W)), (E += W), (C += W), W === 0 || W < M)) break t
                                }
                            }
                        } catch (J) {
                            var X = { error: J }
                        } finally {
                            try {
                                P && !P.done && (k = B.return) && k.call(B)
                            } finally {
                                if (X) throw X.error
                            }
                        }
                        return u.view.setUint32(I, C, !0), 0
                    }),
                    fd_readdir: x(function (m, E, A, I, k) {
                        ;(m = n(m, sr)), u.refreshMemory()
                        var L = y.readdirSync(m.path, { withFileTypes: !0 }),
                            C = E
                        for (I = Number(I); I < L.length; I += 1) {
                            var B = L[I],
                                P = z.byteLength(B.name)
                            if (E - C > A || (u.view.setBigUint64(E, T(I + 1), !0), (E += 8), E - C > A)) break
                            var D = y.statSync(v.resolve(m.path, B.name))
                            if ((u.view.setBigUint64(E, T(D.ino), !0), (E += 8), E - C > A || (u.view.setUint32(E, P, !0), (E += 4), E - C > A))) break
                            switch (!0) {
                                case D.isBlockDevice():
                                    D = 1
                                    break
                                case D.isCharacterDevice():
                                    D = 2
                                    break
                                case D.isDirectory():
                                    D = 3
                                    break
                                case D.isFIFO():
                                    D = 6
                                    break
                                case D.isFile():
                                    D = 4
                                    break
                                case D.isSocket():
                                    D = 6
                                    break
                                case D.isSymbolicLink():
                                    D = 7
                                    break
                                default:
                                    D = 0
                            }
                            if ((u.view.setUint8(E, D), (E += 1), (E += 3), E + P >= C + A)) break
                            z.from(u.memory.buffer).write(B.name, E), (E += P)
                        }
                        return u.view.setUint32(k, Math.min(E - C, A), !0), 0
                    }),
                    fd_renumber: x(function (m, E) {
                        return n(m, T(0)), n(E, T(0)), y.closeSync(u.FD_MAP.get(m).real), u.FD_MAP.set(m, u.FD_MAP.get(E)), u.FD_MAP.delete(E), 0
                    }),
                    fd_seek: x(function (m, E, A, I) {
                        switch (((m = n(m, pe)), u.refreshMemory(), A)) {
                            case 1:
                                m.offset = (m.offset ? m.offset : T(0)) + T(E)
                                break
                            case 2:
                                ;(A = y.fstatSync(m.real).size), (m.offset = T(A) + T(E))
                                break
                            case 0:
                                m.offset = T(E)
                        }
                        return u.view.setBigUint64(I, m.offset, !0), 0
                    }),
                    fd_tell: x(function (m, E) {
                        return (m = n(m, Pr)), u.refreshMemory(), m.offset || (m.offset = T(0)), u.view.setBigUint64(E, m.offset, !0), 0
                    }),
                    fd_sync: x(function (m) {
                        return (m = n(m, xt)), y.fsyncSync(m.real), 0
                    }),
                    path_create_directory: x(function (m, E, A) {
                        return (m = n(m, Cr)), m.path ? (u.refreshMemory(), (E = z.from(u.memory.buffer, E, A).toString()), y.mkdirSync(v.resolve(m.path, E)), 0) : 28
                    }),
                    path_filestat_get: x(function (m, E, A, I, k) {
                        return (m = n(m, jr)), m.path ? (u.refreshMemory(), (A = z.from(u.memory.buffer, A, I).toString()), (A = y.statSync(v.resolve(m.path, A))), u.view.setBigUint64(k, T(A.dev), !0), (k += 8), u.view.setBigUint64(k, T(A.ino), !0), (k += 8), u.view.setUint8(k, ui(u, void 0, A).filetype), (k += 8), u.view.setBigUint64(k, T(A.nlink), !0), (k += 8), u.view.setBigUint64(k, T(A.size), !0), (k += 8), u.view.setBigUint64(k, bt(A.atimeMs), !0), (k += 8), u.view.setBigUint64(k, bt(A.mtimeMs), !0), u.view.setBigUint64(k + 8, bt(A.ctimeMs), !0), 0) : 28
                    }),
                    path_filestat_set_times: x(function (m, E, A, I, k, L, C) {
                        if (((m = n(m, $r)), !m.path)) return 28
                        u.refreshMemory()
                        var B = y.fstatSync(m.real)
                        ;(E = B.atime), (B = B.mtime)
                        var P = de(r(0))
                        return (C & 3) === 3 || (C & 12) === 12 ? 28 : ((C & 1) === 1 ? (E = de(k)) : (C & 2) === 2 && (E = P), (C & 4) === 4 ? (B = de(L)) : (C & 8) === 8 && (B = P), (A = z.from(u.memory.buffer, A, I).toString()), y.utimesSync(v.resolve(m.path, A), new Date(E), new Date(B)), 0)
                    }),
                    path_link: x(function (m, E, A, I, k, L, C) {
                        return (m = n(m, Fr)), (k = n(k, Ur)), !m.path || !k.path ? 28 : (u.refreshMemory(), (A = z.from(u.memory.buffer, A, I).toString()), (L = z.from(u.memory.buffer, L, C).toString()), y.linkSync(v.resolve(m.path, A), v.resolve(k.path, L)), 0)
                    }),
                    path_open: x(function (m, E, A, I, k, L, C, B, P) {
                        ;(E = n(m, or)), (L = T(L)), (C = T(C)), (m = (L & (Mt | sr)) !== T(0))
                        var D = (L & (Zt | jt | ir | ur)) !== T(0)
                        if (D && m) var M = y.constants.O_RDWR
                        else m ? (M = y.constants.O_RDONLY) : D && (M = y.constants.O_WRONLY)
                        if (((m = L | or), (L |= C), k & 1 && ((M |= y.constants.O_CREAT), (m |= Br)), k & 2 && (M |= y.constants.O_DIRECTORY), k & 4 && (M |= y.constants.O_EXCL), k & 8 && ((M |= y.constants.O_TRUNC), (m |= Yr)), B & 1 && (M |= y.constants.O_APPEND), B & 2 && ((M = y.constants.O_DSYNC ? M | y.constants.O_DSYNC : M | y.constants.O_SYNC), (L |= Zt)), B & 4 && (M |= y.constants.O_NONBLOCK), B & 8 && ((M = y.constants.O_RSYNC ? M | y.constants.O_RSYNC : M | y.constants.O_SYNC), (L |= xt)), B & 16 && ((M |= y.constants.O_SYNC), (L |= xt)), D && !(M & (y.constants.O_APPEND | y.constants.O_TRUNC)) && (L |= pe), u.refreshMemory(), (A = z.from(u.memory.buffer, A, I).toString()), (A = v.resolve(E.path, A)), v.relative(E.path, A).startsWith(".."))) return 76
                        try {
                            var W = y.realpathSync(A)
                            if (v.relative(E.path, W).startsWith("..")) return 76
                        } catch (J) {
                            if (J.code === "ENOENT") W = A
                            else throw J
                        }
                        try {
                            var X = y.statSync(W).isDirectory()
                        } catch {}
                        return (M = !D && X ? y.openSync(W, y.constants.O_RDONLY) : y.openSync(W, M)), (X = Ke(u.FD_MAP.keys()).reverse()[0] + 1), u.FD_MAP.set(X, { real: M, filetype: void 0, rights: { base: m, inheriting: L }, path: W }), si(u, X), u.view.setUint32(P, X, !0), 0
                    }),
                    path_readlink: x(function (m, E, A, I, k, L) {
                        return (m = n(m, Dr)), m.path ? (u.refreshMemory(), (E = z.from(u.memory.buffer, E, A).toString()), (E = v.resolve(m.path, E)), (E = y.readlinkSync(E)), (I = z.from(u.memory.buffer).write(E, I, k)), u.view.setUint32(L, I, !0), 0) : 28
                    }),
                    path_remove_directory: x(function (m, E, A) {
                        return (m = n(m, Gr)), m.path ? (u.refreshMemory(), (E = z.from(u.memory.buffer, E, A).toString()), y.rmdirSync(v.resolve(m.path, E)), 0) : 28
                    }),
                    path_rename: x(function (m, E, A, I, k, L) {
                        return (m = n(m, Mr)), (I = n(I, xr)), !m.path || !I.path ? 28 : (u.refreshMemory(), (E = z.from(u.memory.buffer, E, A).toString()), (k = z.from(u.memory.buffer, k, L).toString()), y.renameSync(v.resolve(m.path, E), v.resolve(I.path, k)), 0)
                    }),
                    path_symlink: x(function (m, E, A, I, k) {
                        return (A = n(A, Wr)), A.path ? (u.refreshMemory(), (m = z.from(u.memory.buffer, m, E).toString()), (I = z.from(u.memory.buffer, I, k).toString()), y.symlinkSync(m, v.resolve(A.path, I)), 0) : 28
                    }),
                    path_unlink_file: x(function (m, E, A) {
                        return (m = n(m, zr)), m.path ? (u.refreshMemory(), (E = z.from(u.memory.buffer, E, A).toString()), y.unlinkSync(v.resolve(m.path, E)), 0) : 28
                    }),
                    poll_oneoff: function (m, E, A, I) {
                        var k = 0,
                            L = 0
                        u.refreshMemory()
                        for (var C = 0; C < A; C += 1) {
                            var B = u.view.getBigUint64(m, !0)
                            m += 8
                            var P = u.view.getUint8(m)
                            switch (((m += 1), P)) {
                                case 0:
                                    ;(m += 7), u.view.getBigUint64(m, !0), (m += 8)
                                    var D = u.view.getUint32(m, !0)
                                    ;(m += 4), (m += 4), (P = u.view.getBigUint64(m, !0)), (m += 8), u.view.getBigUint64(m, !0), (m += 8)
                                    var M = u.view.getUint16(m, !0)
                                    ;(m += 2), (m += 6)
                                    var W = M === 1
                                    ;(M = 0), (D = T(r(D))), D === null ? (M = 28) : ((P = W ? P : D + P), (L = P > L ? P : L)), u.view.setBigUint64(E, B, !0), (E += 8), u.view.setUint16(E, M, !0), (E += 2), u.view.setUint8(E, 0), (E += 1), (E += 5), (k += 1)
                                    break
                                case 1:
                                case 2:
                                    ;(m += 3), u.view.getUint32(m, !0), (m += 4), u.view.setBigUint64(E, B, !0), (E += 8), u.view.setUint16(E, 52, !0), (E += 2), u.view.setUint8(E, P), (E += 1), (E += 5), (k += 1)
                                    break
                                default:
                                    return 28
                            }
                        }
                        for (u.view.setUint32(I, k, !0); a.hrtime() < L; );
                        return 0
                    },
                    proc_exit: function (m) {
                        return a.exit(m), 0
                    },
                    proc_raise: function (m) {
                        return m in ii ? (a.kill(ii[m]), 0) : 28
                    },
                    random_get: function (m, E) {
                        return u.refreshMemory(), a.randomFillSync(new Uint8Array(u.memory.buffer), m, E), 0
                    },
                    sched_yield: function () {
                        return 0
                    },
                    sock_recv: function () {
                        return 52
                    },
                    sock_send: function () {
                        return 52
                    },
                    sock_shutdown: function () {
                        return 52
                    },
                }),
                    e.traceSyscalls &&
                        Object.keys(this.wasiImport).forEach(function (m) {
                            var E = u.wasiImport[m]
                            u.wasiImport[m] = function () {
                                for (var A = [], I = 0; I < arguments.length; I++) A[I] = arguments[I]
                                console.log("WASI: wasiImport called: " + m + " (" + A + ")")
                                try {
                                    var k = E.apply(void 0, Ke(A))
                                    return console.log("WASI:  => " + k), k
                                } catch (L) {
                                    throw (console.log("Catched error: " + L), L)
                                }
                            }
                        })
            }
            return (
                (t.prototype.refreshMemory = function () {
                    ;(this.view && this.view.buffer.byteLength !== 0) || (this.view = new He(this.memory.buffer))
                }),
                (t.prototype.setMemory = function (e) {
                    this.memory = e
                }),
                (t.prototype.start = function (e) {
                    if (((e = e.exports), e === null || typeof e != "object")) throw Error("instance.exports must be an Object. Received " + e + ".")
                    var r = e.memory
                    if (!(r instanceof WebAssembly.Memory)) throw Error("instance.exports.memory must be a WebAssembly.Memory. Recceived " + r + ".")
                    this.setMemory(r), e._start && e._start()
                }),
                (t.prototype.getImportNamespace = function (e) {
                    var r,
                        n = null
                    try {
                        for (var i = Ve(WebAssembly.Module.imports(e)), s = i.next(); !s.done; s = i.next()) {
                            var u = s.value
                            if (u.kind === "function" && u.module.startsWith("wasi_")) {
                                if (!n) n = u.module
                                else if (n !== u.module) throw Error("Multiple namespaces detected.")
                            }
                        }
                    } catch (g) {
                        var l = { error: g }
                    } finally {
                        try {
                            s && !s.done && (r = i.return) && r.call(i)
                        } finally {
                            if (l) throw l.error
                        }
                    }
                    return n
                }),
                (t.prototype.getImports = function (e) {
                    switch (this.getImportNamespace(e)) {
                        case "wasi_unstable":
                            return { wasi_unstable: this.wasiImport }
                        case "wasi_snapshot_preview1":
                            return { wasi_snapshot_preview1: this.wasiImport }
                        default:
                            throw Error("Can't detect a WASI namespace for the WebAssembly Module")
                    }
                }),
                (t.defaultBindings = bn),
                t
            )
        })()
    function _s(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }
    function Et(t) {
        if (typeof t != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(t))
    }
    function li(t, e) {
        for (var r = "", n = 0, i = -1, s = 0, u, l = 0; l <= t.length; ++l) {
            if (l < t.length) u = t.charCodeAt(l)
            else {
                if (u === 47) break
                u = 47
            }
            if (u === 47) {
                if (!(i === l - 1 || s === 1))
                    if (i !== l - 1 && s === 2) {
                        if (r.length < 2 || n !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
                            if (r.length > 2) {
                                var g = r.lastIndexOf("/")
                                if (g !== r.length - 1) {
                                    g === -1 ? ((r = ""), (n = 0)) : ((r = r.slice(0, g)), (n = r.length - 1 - r.lastIndexOf("/"))), (i = l), (s = 0)
                                    continue
                                }
                            } else if (r.length === 2 || r.length === 1) {
                                ;(r = ""), (n = 0), (i = l), (s = 0)
                                continue
                            }
                        }
                        e && (r.length > 0 ? (r += "/..") : (r = ".."), (n = 2))
                    } else r.length > 0 ? (r += "/" + t.slice(i + 1, l)) : (r = t.slice(i + 1, l)), (n = l - i - 1)
                ;(i = l), (s = 0)
            } else u === 46 && s !== -1 ? ++s : (s = -1)
        }
        return r
    }
    function Ss(t, e) {
        var r = e.dir || e.root,
            n = e.base || (e.name || "") + (e.ext || "")
        return r ? (r === e.root ? r + n : r + t + n) : n
    }
    var me = {
        resolve: function () {
            for (var e = "", r = !1, n, i = arguments.length - 1; i >= -1 && !r; i--) {
                var s
                i >= 0 ? (s = arguments[i]) : (n === void 0 && (n = process.cwd()), (s = n)), Et(s), s.length !== 0 && ((e = s + "/" + e), (r = s.charCodeAt(0) === 47))
            }
            return (e = li(e, !r)), r ? (e.length > 0 ? "/" + e : "/") : e.length > 0 ? e : "."
        },
        normalize: function (e) {
            if ((Et(e), e.length === 0)) return "."
            var r = e.charCodeAt(0) === 47,
                n = e.charCodeAt(e.length - 1) === 47
            return (e = li(e, !r)), e.length === 0 && !r && (e = "."), e.length > 0 && n && (e += "/"), r ? "/" + e : e
        },
        isAbsolute: function (e) {
            return Et(e), e.length > 0 && e.charCodeAt(0) === 47
        },
        join: function () {
            if (arguments.length === 0) return "."
            for (var e, r = 0; r < arguments.length; ++r) {
                var n = arguments[r]
                Et(n), n.length > 0 && (e === void 0 ? (e = n) : (e += "/" + n))
            }
            return e === void 0 ? "." : me.normalize(e)
        },
        relative: function (e, r) {
            if ((Et(e), Et(r), e === r || ((e = me.resolve(e)), (r = me.resolve(r)), e === r))) return ""
            for (var n = 1; n < e.length && e.charCodeAt(n) === 47; ++n);
            for (var i = e.length, s = i - n, u = 1; u < r.length && r.charCodeAt(u) === 47; ++u);
            for (var l = r.length, g = l - u, p = s < g ? s : g, a = -1, y = 0; y <= p; ++y) {
                if (y === p) {
                    if (g > p) {
                        if (r.charCodeAt(u + y) === 47) return r.slice(u + y + 1)
                        if (y === 0) return r.slice(u + y)
                    } else s > p && (e.charCodeAt(n + y) === 47 ? (a = y) : y === 0 && (a = 0))
                    break
                }
                var v = e.charCodeAt(n + y),
                    w = r.charCodeAt(u + y)
                if (v !== w) break
                v === 47 && (a = y)
            }
            var O = ""
            for (y = n + a + 1; y <= i; ++y) (y === i || e.charCodeAt(y) === 47) && (O.length === 0 ? (O += "..") : (O += "/.."))
            return O.length > 0 ? O + r.slice(u + a) : ((u += a), r.charCodeAt(u) === 47 && ++u, r.slice(u))
        },
        _makeLong: function (e) {
            return e
        },
        dirname: function (e) {
            if ((Et(e), e.length === 0)) return "."
            for (var r = e.charCodeAt(0), n = r === 47, i = -1, s = !0, u = e.length - 1; u >= 1; --u)
                if (((r = e.charCodeAt(u)), r === 47)) {
                    if (!s) {
                        i = u
                        break
                    }
                } else s = !1
            return i === -1 ? (n ? "/" : ".") : n && i === 1 ? "//" : e.slice(0, i)
        },
        basename: function (e, r) {
            if (r !== void 0 && typeof r != "string") throw new TypeError('"ext" argument must be a string')
            Et(e)
            var n = 0,
                i = -1,
                s = !0,
                u
            if (r !== void 0 && r.length > 0 && r.length <= e.length) {
                if (r.length === e.length && r === e) return ""
                var l = r.length - 1,
                    g = -1
                for (u = e.length - 1; u >= 0; --u) {
                    var p = e.charCodeAt(u)
                    if (p === 47) {
                        if (!s) {
                            n = u + 1
                            break
                        }
                    } else g === -1 && ((s = !1), (g = u + 1)), l >= 0 && (p === r.charCodeAt(l) ? --l === -1 && (i = u) : ((l = -1), (i = g)))
                }
                return n === i ? (i = g) : i === -1 && (i = e.length), e.slice(n, i)
            } else {
                for (u = e.length - 1; u >= 0; --u)
                    if (e.charCodeAt(u) === 47) {
                        if (!s) {
                            n = u + 1
                            break
                        }
                    } else i === -1 && ((s = !1), (i = u + 1))
                return i === -1 ? "" : e.slice(n, i)
            }
        },
        extname: function (e) {
            Et(e)
            for (var r = -1, n = 0, i = -1, s = !0, u = 0, l = e.length - 1; l >= 0; --l) {
                var g = e.charCodeAt(l)
                if (g === 47) {
                    if (!s) {
                        n = l + 1
                        break
                    }
                    continue
                }
                i === -1 && ((s = !1), (i = l + 1)), g === 46 ? (r === -1 ? (r = l) : u !== 1 && (u = 1)) : r !== -1 && (u = -1)
            }
            return r === -1 || i === -1 || u === 0 || (u === 1 && r === i - 1 && r === n + 1) ? "" : e.slice(r, i)
        },
        format: function (e) {
            if (e === null || typeof e != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e)
            return Ss("/", e)
        },
        parse: function (e) {
            Et(e)
            var r = { root: "", dir: "", base: "", ext: "", name: "" }
            if (e.length === 0) return r
            var n = e.charCodeAt(0),
                i = n === 47,
                s
            i ? ((r.root = "/"), (s = 1)) : (s = 0)
            for (var u = -1, l = 0, g = -1, p = !0, a = e.length - 1, y = 0; a >= s; --a) {
                if (((n = e.charCodeAt(a)), n === 47)) {
                    if (!p) {
                        l = a + 1
                        break
                    }
                    continue
                }
                g === -1 && ((p = !1), (g = a + 1)), n === 46 ? (u === -1 ? (u = a) : y !== 1 && (y = 1)) : u !== -1 && (y = -1)
            }
            return u === -1 || g === -1 || y === 0 || (y === 1 && u === g - 1 && u === l + 1) ? g !== -1 && (l === 0 && i ? (r.base = r.name = e.slice(1, g)) : (r.base = r.name = e.slice(l, g))) : (l === 0 && i ? ((r.name = e.slice(1, u)), (r.base = e.slice(1, g))) : ((r.name = e.slice(l, u)), (r.base = e.slice(l, g))), (r.ext = e.slice(u, g))), l > 0 ? (r.dir = e.slice(0, l - 1)) : i && (r.dir = "/"), r
        },
        sep: "/",
        delimiter: ":",
        win32: null,
        posix: null,
    }
    me.posix = me
    var Rs = me,
        As = _s(Rs)
    class Os {
        constructor(e, r, n) {
            ;(this.wasmFs = e), (this.cwd = "/"), n == null && (n = "/"), (this.wasi = new hi({ args: r, bindings: { ...hi.defaultBindings, fs: this.wasmFs.fs, path: As }, preopens: { "/": "/", ".": n } })), (this.imports = { wasi_snapshot_preview1: this.wasi.wasiImport }), this.chdir(n)
        }
        async runWasiEntry(e) {
            const r = await this.loadWasm(e)
            this.wasi.start(r)
        }
        async loadWasm(e) {
            let r
            if (typeof e == "string") {
                const i = this.wasmFs.fs.readFileSync(this.getAbsPath(e))
                if (i == null) throw "File not found"
                r = await WebAssembly.instantiate(i, this.imports)
            } else return console.error(`Path or buffer required: ${e}`), null
            const n = r.instance
            return n.exports.memory && ((this.memory = n.exports.memory), this.wasi.setMemory(this.memory)), n
        }
        chdir(e) {
            const r = this.wasmFs.fs.statSync(e)
            return r != null && r.isDirectory() ? ((this.cwd = e), !0) : !1
        }
        getAbsPath(e) {
            return e.length > 0 && e[0] === "/" ? e : `${this.cwd}${this.cwd === "/" ? "" : "/"}${e}`
        }
    }
    function Ts(t, e, r, n) {
        return new (r || (r = Promise))(function (i, s) {
            function u(p) {
                try {
                    g(n.next(p))
                } catch (a) {
                    s(a)
                }
            }
            function l(p) {
                try {
                    g(n.throw(p))
                } catch (a) {
                    s(a)
                }
            }
            function g(p) {
                p.done
                    ? i(p.value)
                    : new r(function (a) {
                          a(p.value)
                      }).then(u, l)
            }
            g((n = n.apply(t, [])).next())
        })
    }
    function Is(t, e) {
        function r(p) {
            return function (a) {
                return n([p, a])
            }
        }
        function n(p) {
            if (s) throw new TypeError("Generator is already executing.")
            for (; i; )
                try {
                    if (((s = 1), u && (l = p[0] & 2 ? u.return : p[0] ? u.throw || ((l = u.return) && l.call(u), 0) : u.next) && !(l = l.call(u, p[1])).done)) return l
                    switch (((u = 0), l && (p = [p[0] & 2, l.value]), p[0])) {
                        case 0:
                        case 1:
                            l = p
                            break
                        case 4:
                            return i.label++, { value: p[1], done: !1 }
                        case 5:
                            i.label++, (u = p[1]), (p = [0])
                            continue
                        case 7:
                            ;(p = i.ops.pop()), i.trys.pop()
                            continue
                        default:
                            if (((l = i.trys), !(l = 0 < l.length && l[l.length - 1]) && (p[0] === 6 || p[0] === 2))) {
                                i = 0
                                continue
                            }
                            if (p[0] === 3 && (!l || (p[1] > l[0] && p[1] < l[3]))) i.label = p[1]
                            else if (p[0] === 6 && i.label < l[1]) (i.label = l[1]), (l = p)
                            else if (l && i.label < l[2]) (i.label = l[2]), i.ops.push(p)
                            else {
                                l[2] && i.ops.pop(), i.trys.pop()
                                continue
                            }
                    }
                    p = e.call(t, i)
                } catch (a) {
                    ;(p = [6, a]), (u = 0)
                } finally {
                    s = l = 0
                }
            if (p[0] & 5) throw p[1]
            return { value: p[0] ? p[1] : void 0, done: !0 }
        }
        var i = {
                label: 0,
                sent: function () {
                    if (l[0] & 1) throw l[1]
                    return l[1]
                },
                trys: [],
                ops: [],
            },
            s,
            u,
            l,
            g
        return (
            (g = { next: r(0), throw: r(1), return: r(2) }),
            typeof Symbol == "function" &&
                (g[Symbol.iterator] = function () {
                    return this
                }),
            g
        )
    }
    function Kr(t) {
        var e = typeof Symbol == "function" && t[Symbol.iterator],
            r = 0
        return e
            ? e.call(t)
            : {
                  next: function () {
                      return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t }
                  },
              }
    }
    function Ns(t, e) {
        var r = typeof Symbol == "function" && t[Symbol.iterator]
        if (!r) return t
        t = r.call(t)
        var n,
            i = []
        try {
            for (; (e === void 0 || 0 < e--) && !(n = t.next()).done; ) i.push(n.value)
        } catch (u) {
            var s = { error: u }
        } finally {
            try {
                n && !n.done && (r = t.return) && r.call(t)
            } finally {
                if (s) throw s.error
            }
        }
        return i
    }
    function ks() {
        for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(Ns(arguments[e]))
        return t
    }
    var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
    function et(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }
    function b(t, e) {
        return (e = { exports: {} }), t(e, e.exports), e.exports
    }
    var F = b(function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.constants = { O_RDONLY: 0, O_WRONLY: 1, O_RDWR: 2, S_IFMT: 61440, S_IFREG: 32768, S_IFDIR: 16384, S_IFCHR: 8192, S_IFBLK: 24576, S_IFIFO: 4096, S_IFLNK: 40960, S_IFSOCK: 49152, O_CREAT: 64, O_EXCL: 128, O_NOCTTY: 256, O_TRUNC: 512, O_APPEND: 1024, O_DIRECTORY: 65536, O_NOATIME: 262144, O_NOFOLLOW: 131072, O_SYNC: 1052672, O_DIRECT: 16384, O_NONBLOCK: 2048, S_IRWXU: 448, S_IRUSR: 256, S_IWUSR: 128, S_IXUSR: 64, S_IRWXG: 56, S_IRGRP: 32, S_IWGRP: 16, S_IXGRP: 8, S_IRWXO: 7, S_IROTH: 4, S_IWOTH: 2, S_IXOTH: 1, F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1, UV_FS_SYMLINK_DIR: 1, UV_FS_SYMLINK_JUNCTION: 2, UV_FS_COPYFILE_EXCL: 1, UV_FS_COPYFILE_FICLONE: 2, UV_FS_COPYFILE_FICLONE_FORCE: 4, COPYFILE_EXCL: 1, COPYFILE_FICLONE: 2, COPYFILE_FICLONE_FORCE: 4 })
    })
    et(F)
    var Ls = b(function (t, e) {
            e.default =
                typeof BigInt == "function"
                    ? BigInt
                    : function () {
                          throw Error("BigInt is not supported in this environment.")
                      }
        }),
        ve = b(function (t, e) {
            Object.defineProperty(e, "__esModule", { value: !0 })
            var r = F.constants.S_IFMT,
                n = F.constants.S_IFDIR,
                i = F.constants.S_IFREG,
                s = F.constants.S_IFBLK,
                u = F.constants.S_IFCHR,
                l = F.constants.S_IFLNK,
                g = F.constants.S_IFIFO,
                p = F.constants.S_IFSOCK
            ;(t = (function () {
                function a() {}
                return (
                    (a.build = function (y, v) {
                        v === void 0 && (v = !1)
                        var w = new a(),
                            O = y.gid,
                            $ = y.atime,
                            Tt = y.mtime,
                            Bt = y.ctime
                        return (
                            (v = v
                                ? Ls.default
                                : function (ue) {
                                      return ue
                                  }),
                            (w.uid = v(y.uid)),
                            (w.gid = v(O)),
                            (w.rdev = v(0)),
                            (w.blksize = v(4096)),
                            (w.ino = v(y.ino)),
                            (w.size = v(y.getSize())),
                            (w.blocks = v(1)),
                            (w.atime = $),
                            (w.mtime = Tt),
                            (w.ctime = Bt),
                            (w.birthtime = Bt),
                            (w.atimeMs = v($.getTime())),
                            (w.mtimeMs = v(Tt.getTime())),
                            (O = v(Bt.getTime())),
                            (w.ctimeMs = O),
                            (w.birthtimeMs = O),
                            (w.dev = v(0)),
                            (w.mode = v(y.mode)),
                            (w.nlink = v(y.nlink)),
                            w
                        )
                    }),
                    (a.prototype._checkModeProperty = function (y) {
                        return (Number(this.mode) & r) === y
                    }),
                    (a.prototype.isDirectory = function () {
                        return this._checkModeProperty(n)
                    }),
                    (a.prototype.isFile = function () {
                        return this._checkModeProperty(i)
                    }),
                    (a.prototype.isBlockDevice = function () {
                        return this._checkModeProperty(s)
                    }),
                    (a.prototype.isCharacterDevice = function () {
                        return this._checkModeProperty(u)
                    }),
                    (a.prototype.isSymbolicLink = function () {
                        return this._checkModeProperty(l)
                    }),
                    (a.prototype.isFIFO = function () {
                        return this._checkModeProperty(g)
                    }),
                    (a.prototype.isSocket = function () {
                        return this._checkModeProperty(p)
                    }),
                    a
                )
            })()),
                (e.Stats = t),
                (e.default = t)
        })
    et(ve)
    var te = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {},
        _t = [],
        ct = [],
        Ps = typeof Uint8Array < "u" ? Uint8Array : Array,
        Hr = !1
    function ci() {
        Hr = !0
        for (var t = 0; 64 > t; ++t) (_t[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[t]), (ct["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(t)] = t)
        ;(ct[45] = 62), (ct[95] = 63)
    }
    function Cs(t, e, r) {
        for (var n = [], i = e; i < r; i += 3) (e = (t[i] << 16) + (t[i + 1] << 8) + t[i + 2]), n.push(_t[(e >> 18) & 63] + _t[(e >> 12) & 63] + _t[(e >> 6) & 63] + _t[e & 63])
        return n.join("")
    }
    function pi(t) {
        Hr || ci()
        for (var e = t.length, r = e % 3, n = "", i = [], s = 0, u = e - r; s < u; s += 16383) i.push(Cs(t, s, s + 16383 > u ? u : s + 16383))
        return r === 1 ? ((t = t[e - 1]), (n += _t[t >> 2]), (n += _t[(t << 4) & 63]), (n += "==")) : r === 2 && ((t = (t[e - 2] << 8) + t[e - 1]), (n += _t[t >> 10]), (n += _t[(t >> 4) & 63]), (n += _t[(t << 2) & 63]), (n += "=")), i.push(n), i.join("")
    }
    function hr(t, e, r, n, i) {
        var s = 8 * i - n - 1,
            u = (1 << s) - 1,
            l = u >> 1,
            g = -7
        i = r ? i - 1 : 0
        var p = r ? -1 : 1,
            a = t[e + i]
        for (i += p, r = a & ((1 << -g) - 1), a >>= -g, g += s; 0 < g; r = 256 * r + t[e + i], i += p, g -= 8);
        for (s = r & ((1 << -g) - 1), r >>= -g, g += n; 0 < g; s = 256 * s + t[e + i], i += p, g -= 8);
        if (r === 0) r = 1 - l
        else {
            if (r === u) return s ? NaN : (1 / 0) * (a ? -1 : 1)
            ;(s += Math.pow(2, n)), (r -= l)
        }
        return (a ? -1 : 1) * s * Math.pow(2, r - n)
    }
    function lr(t, e, r, n, i, s) {
        var u,
            l = 8 * s - i - 1,
            g = (1 << l) - 1,
            p = g >> 1,
            a = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
        s = n ? 0 : s - 1
        var y = n ? 1 : -1,
            v = 0 > e || (e === 0 && 0 > 1 / e) ? 1 : 0
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? ((e = isNaN(e) ? 1 : 0), (n = g)) : ((n = Math.floor(Math.log(e) / Math.LN2)), 1 > e * (u = Math.pow(2, -n)) && (n--, (u *= 2)), (e = 1 <= n + p ? e + a / u : e + a * Math.pow(2, 1 - p)), 2 <= e * u && (n++, (u /= 2)), n + p >= g ? ((e = 0), (n = g)) : 1 <= n + p ? ((e = (e * u - 1) * Math.pow(2, i)), (n += p)) : ((e = e * Math.pow(2, p - 1) * Math.pow(2, i)), (n = 0))); 8 <= i; t[r + s] = e & 255, s += y, e /= 256, i -= 8);
        for (n = (n << i) | e, l += i; 0 < l; t[r + s] = n & 255, s += y, n /= 256, l -= 8);
        t[r + s - y] |= 128 * v
    }
    var Bs = {}.toString,
        ai =
            Array.isArray ||
            function (t) {
                return Bs.call(t) == "[object Array]"
            }
    S.TYPED_ARRAY_SUPPORT = te.TYPED_ARRAY_SUPPORT !== void 0 ? te.TYPED_ARRAY_SUPPORT : !0
    var Fs = S.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    // function kt(t, e) {
    //     if ((S.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < e) throw new RangeError("Invalid typed array length")
    //     return S.TYPED_ARRAY_SUPPORT ? ((t = new Uint8Array(e)), (t.__proto__ = S.prototype)) : (t === null && (t = new S(e)), (t.length = e)), t
    // }
    function kt(array, length) {
        const maxLength = R.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        
        if (length > maxLength) {
            throw new RangeError("Invalid typed array length");
        }
        
        if (R.TYPED_ARRAY_SUPPORT) {
            array = new Uint8Array(length);
            Object.setPrototypeOf(array, R.prototype);
        } else {
            if (array === null) {
                array = new R(length);
            }
            array.length = length;
        }
        
        return array;
    }
    function S(t, e, r) {
        if (!(S.TYPED_ARRAY_SUPPORT || this instanceof S)) return new S(t, e, r)
        if (typeof t == "number") {
            if (typeof e == "string") throw Error("If encoding is specified then the first argument must be a string")
            return Xr(this, t)
        }
        return yi(this, t, e, r)
    }
    ;(S.poolSize = 8192),
        (S._augment = function (t) {
            return (t.__proto__ = S.prototype), t
        })
    function yi(t, e, r, n) {
        if (typeof e == "number") throw new TypeError('"value" argument must not be a number')
        if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) {
            if ((e.byteLength, 0 > r || e.byteLength < r)) throw new RangeError("'offset' is out of bounds")
            if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds")
            return (e = r === void 0 && n === void 0 ? new Uint8Array(e) : n === void 0 ? new Uint8Array(e, r) : new Uint8Array(e, r, n)), S.TYPED_ARRAY_SUPPORT ? ((t = e), (t.__proto__ = S.prototype)) : (t = Jr(t, e)), t
        }
        if (typeof e == "string") {
            if (((n = t), (t = r), (typeof t != "string" || t === "") && (t = "utf8"), !S.isEncoding(t))) throw new TypeError('"encoding" must be a valid string encoding')
            return (r = di(e, t) | 0), (n = kt(n, r)),(console.log(n)), (e = n.write(e, t)), e !== r && (n = n.slice(0, e)), n
        }
        return Us(t, e)
    }
    ;(S.from = function (t, e, r) {
        return yi(null, t, e, r)
    }),
        S.TYPED_ARRAY_SUPPORT && ((S.prototype.__proto__ = Uint8Array.prototype), (S.__proto__ = Uint8Array))
    function gi(t) {
        if (typeof t != "number") throw new TypeError('"size" argument must be a number')
        if (0 > t) throw new RangeError('"size" argument must not be negative')
    }
    S.alloc = function (t, e, r) {
        return gi(t), (t = 0 >= t ? kt(null, t) : e !== void 0 ? (typeof r == "string" ? kt(null, t).fill(e, r) : kt(null, t).fill(e)) : kt(null, t)), t
    }
    function Xr(t, e) {
        if ((gi(e), (t = kt(t, 0 > e ? 0 : Zr(e) | 0)), !S.TYPED_ARRAY_SUPPORT)) for (var r = 0; r < e; ++r) t[r] = 0
        return t
    }
    ;(S.allocUnsafe = function (t) {
        return Xr(null, t)
    }),
        (S.allocUnsafeSlow = function (t) {
            return Xr(null, t)
        })
    function Jr(t, e) {
        var r = 0 > e.length ? 0 : Zr(e.length) | 0
        t = kt(t, r)
        for (var n = 0; n < r; n += 1) t[n] = e[n] & 255
        return t
    }
    function Us(t, e) {
        if (St(e)) {
            var r = Zr(e.length) | 0
            return (t = kt(t, r)), t.length === 0 || e.copy(t, 0, 0, r), t
        }
        if (e) {
            if ((typeof ArrayBuffer < "u" && e.buffer instanceof ArrayBuffer) || "length" in e) return (r = typeof e.length != "number") || ((r = e.length), (r = r !== r)), r ? kt(t, 0) : Jr(t, e)
            if (e.type === "Buffer" && ai(e.data)) return Jr(t, e.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }
    function Zr(t) {
        if (t >= (S.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823)) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + (S.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) + " bytes")
        return t | 0
    }
    S.isBuffer = Lt
    function St(t) {
        return !(t == null || !t._isBuffer)
    }
    ;(S.compare = function (t, e) {
        if (!St(t) || !St(e)) throw new TypeError("Arguments must be Buffers")
        if (t === e) return 0
        for (var r = t.length, n = e.length, i = 0, s = Math.min(r, n); i < s; ++i)
            if (t[i] !== e[i]) {
                ;(r = t[i]), (n = e[i])
                break
            }
        return r < n ? -1 : n < r ? 1 : 0
    }),
        (S.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
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
                    return !0
                default:
                    return !1
            }
        }),
        (S.concat = function (t, e) {
            if (!ai(t)) throw new TypeError('"list" argument must be an Array of Buffers')
            if (t.length === 0) return S.alloc(0)
            var r
            if (e === void 0) for (r = e = 0; r < t.length; ++r) e += t[r].length
            e = S.allocUnsafe(e)
            var n = 0
            for (r = 0; r < t.length; ++r) {
                var i = t[r]
                if (!St(i)) throw new TypeError('"list" argument must be an Array of Buffers')
                i.copy(e, n), (n += i.length)
            }
            return e
        })
    function di(t, e) {
        if (St(t)) return t.length
        if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength
        typeof t != "string" && (t = "" + t)
        var r = t.length
        if (r === 0) return 0
        for (var n = !1; ; )
            switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return r
                case "utf8":
                case "utf-8":
                case void 0:
                    return yr(t).length
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * r
                case "hex":
                    return r >>> 1
                case "base64":
                    return Si(t).length
                default:
                    if (n) return yr(t).length
                    ;(e = ("" + e).toLowerCase()), (n = !0)
            }
    }
    S.byteLength = di
    function Ds(t, e, r) {
        var n = !1
        if (((e === void 0 || 0 > e) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), 0 >= r) || ((r >>>= 0), (e >>>= 0), r <= e))) return ""
        for (t || (t = "utf8"); ; )
            switch (t) {
                case "hex":
                    for (t = e, e = r, r = this.length, (!t || 0 > t) && (t = 0), (!e || 0 > e || e > r) && (e = r), n = "", r = t; r < e; ++r) (t = n), (n = this[r]), (n = 16 > n ? "0" + n.toString(16) : n.toString(16)), (n = t + n)
                    return n
                case "utf8":
                case "utf-8":
                    return wi(this, e, r)
                case "ascii":
                    for (t = "", r = Math.min(this.length, r); e < r; ++e) t += String.fromCharCode(this[e] & 127)
                    return t
                case "latin1":
                case "binary":
                    for (t = "", r = Math.min(this.length, r); e < r; ++e) t += String.fromCharCode(this[e])
                    return t
                case "base64":
                    return (e = e === 0 && r === this.length ? pi(this) : pi(this.slice(e, r))), e
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    for (e = this.slice(e, r), r = "", t = 0; t < e.length; t += 2) r += String.fromCharCode(e[t] + 256 * e[t + 1])
                    return r
                default:
                    if (n) throw new TypeError("Unknown encoding: " + t)
                    ;(t = (t + "").toLowerCase()), (n = !0)
            }
    }
    S.prototype._isBuffer = !0
    function ee(t, e, r) {
        var n = t[e]
        ;(t[e] = t[r]), (t[r] = n)
    }
    ;(S.prototype.swap16 = function () {
        var t = this.length
        if (t % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits")
        for (var e = 0; e < t; e += 2) ee(this, e, e + 1)
        return this
    }),
        (S.prototype.swap32 = function () {
            var t = this.length
            if (t % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits")
            for (var e = 0; e < t; e += 4) ee(this, e, e + 3), ee(this, e + 1, e + 2)
            return this
        }),
        (S.prototype.swap64 = function () {
            var t = this.length
            if (t % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits")
            for (var e = 0; e < t; e += 8) ee(this, e, e + 7), ee(this, e + 1, e + 6), ee(this, e + 2, e + 5), ee(this, e + 3, e + 4)
            return this
        }),
        (S.prototype.toString = function () {
            var t = this.length | 0
            return t === 0 ? "" : arguments.length === 0 ? wi(this, 0, t) : Ds.apply(this, arguments)
        }),
        (S.prototype.equals = function (t) {
            if (!St(t)) throw new TypeError("Argument must be a Buffer")
            return this === t ? !0 : S.compare(this, t) === 0
        }),
        (S.prototype.inspect = function () {
            var t = ""
            return 0 < this.length && ((t = this.toString("hex", 0, 50).match(/.{2}/g).join(" ")), 50 < this.length && (t += " ... ")), "<Buffer " + t + ">"
        }),
        (S.prototype.compare = function (t, e, r, n, i) {
            if (!St(t)) throw new TypeError("Argument must be a Buffer")
            if ((e === void 0 && (e = 0), r === void 0 && (r = t ? t.length : 0), n === void 0 && (n = 0), i === void 0 && (i = this.length), 0 > e || r > t.length || 0 > n || i > this.length)) throw new RangeError("out of range index")
            if (n >= i && e >= r) return 0
            if (n >= i) return -1
            if (e >= r) return 1
            if (((e >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === t)) return 0
            var s = i - n,
                u = r - e,
                l = Math.min(s, u)
            for (n = this.slice(n, i), t = t.slice(e, r), e = 0; e < l; ++e)
                if (n[e] !== t[e]) {
                    ;(s = n[e]), (u = t[e])
                    break
                }
            return s < u ? -1 : u < s ? 1 : 0
        })
    function mi(t, e, r, n, i) {
        if (t.length === 0) return -1
        if ((typeof r == "string" ? ((n = r), (r = 0)) : 2147483647 < r ? (r = 2147483647) : -2147483648 > r && (r = -2147483648), (r = +r), isNaN(r) && (r = i ? 0 : t.length - 1), 0 > r && (r = t.length + r), r >= t.length)) {
            if (i) return -1
            r = t.length - 1
        } else if (0 > r)
            if (i) r = 0
            else return -1
        if ((typeof e == "string" && (e = S.from(e, n)), St(e))) return e.length === 0 ? -1 : vi(t, e, r, n, i)
        if (typeof e == "number") return (e &= 255), S.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? (i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r)) : vi(t, [e], r, n, i)
        throw new TypeError("val must be string, number or Buffer")
    }
    function vi(t, e, r, n, i) {
        function s(p, a) {
            return u === 1 ? p[a] : p.readUInt16BE(a * u)
        }
        var u = 1,
            l = t.length,
            g = e.length
        if (n !== void 0 && ((n = String(n).toLowerCase()), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
            if (2 > t.length || 2 > e.length) return -1
            ;(u = 2), (l /= 2), (g /= 2), (r /= 2)
        }
        if (i)
            for (n = -1; r < l; r++)
                if (s(t, r) === s(e, n === -1 ? 0 : r - n)) {
                    if ((n === -1 && (n = r), r - n + 1 === g)) return n * u
                } else n !== -1 && (r -= r - n), (n = -1)
        else
            for (r + g > l && (r = l - g); 0 <= r; r--) {
                for (l = !0, n = 0; n < g; n++)
                    if (s(t, r + n) !== s(e, n)) {
                        l = !1
                        break
                    }
                if (l) return r
            }
        return -1
    }
    ;(S.prototype.includes = function (t, e, r) {
        return this.indexOf(t, e, r) !== -1
    }),
        (S.prototype.indexOf = function (t, e, r) {
            return mi(this, t, e, r, !0)
        }),
        (S.prototype.lastIndexOf = function (t, e, r) {
            return mi(this, t, e, r, !1)
        }),
        (S.prototype.write = function (t, e, r, n) {
            if (e === void 0) (n = "utf8"), (r = this.length), (e = 0)
            else if (r === void 0 && typeof e == "string") (n = e), (r = this.length), (e = 0)
            else if (isFinite(e)) (e |= 0), isFinite(r) ? ((r |= 0), n === void 0 && (n = "utf8")) : ((n = r), (r = void 0))
            else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
            var i = this.length - e
            if (((r === void 0 || r > i) && (r = i), (0 < t.length && (0 > r || 0 > e)) || e > this.length)) throw new RangeError("Attempt to write outside buffer bounds")
            for (n || (n = "utf8"), i = !1; ; )
                switch (n) {
                    case "hex":
                        t: {
                            if (((e = Number(e) || 0), (n = this.length - e), r ? ((r = Number(r)), r > n && (r = n)) : (r = n), (n = t.length), n % 2 !== 0)) throw new TypeError("Invalid hex string")
                            for (r > n / 2 && (r = n / 2), n = 0; n < r; ++n) {
                                if (((i = parseInt(t.substr(2 * n, 2), 16)), isNaN(i))) {
                                    t = n
                                    break t
                                }
                                this[e + n] = i
                            }
                            t = n
                        }
                        return t
                    case "utf8":
                    case "utf-8":
                        return Pe(yr(t, this.length - e), this, e, r)
                    case "ascii":
                        return Pe(_i(t), this, e, r)
                    case "latin1":
                    case "binary":
                        return Pe(_i(t), this, e, r)
                    case "base64":
                        return Pe(Si(t), this, e, r)
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        ;(n = t), (i = this.length - e)
                        for (var s = [], u = 0; u < n.length && !(0 > (i -= 2)); ++u) {
                            var l = n.charCodeAt(u)
                            ;(t = l >> 8), (l %= 256), s.push(l), s.push(t)
                        }
                        return Pe(s, this, e, r)
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + n)
                        ;(n = ("" + n).toLowerCase()), (i = !0)
                }
        }),
        (S.prototype.toJSON = function () {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) }
        })
    function wi(t, e, r) {
        r = Math.min(t.length, r)
        for (var n = []; e < r; ) {
            var i = t[e],
                s = null,
                u = 239 < i ? 4 : 223 < i ? 3 : 191 < i ? 2 : 1
            if (e + u <= r)
                switch (u) {
                    case 1:
                        128 > i && (s = i)
                        break
                    case 2:
                        var l = t[e + 1]
                        ;(l & 192) === 128 && ((i = ((i & 31) << 6) | (l & 63)), 127 < i && (s = i))
                        break
                    case 3:
                        l = t[e + 1]
                        var g = t[e + 2]
                        ;(l & 192) === 128 && (g & 192) === 128 && ((i = ((i & 15) << 12) | ((l & 63) << 6) | (g & 63)), 2047 < i && (55296 > i || 57343 < i) && (s = i))
                        break
                    case 4:
                        ;(l = t[e + 1]), (g = t[e + 2])
                        var p = t[e + 3]
                        ;(l & 192) === 128 && (g & 192) === 128 && (p & 192) === 128 && ((i = ((i & 15) << 18) | ((l & 63) << 12) | ((g & 63) << 6) | (p & 63)), 65535 < i && 1114112 > i && (s = i))
                }
            s === null ? ((s = 65533), (u = 1)) : 65535 < s && ((s -= 65536), n.push(((s >>> 10) & 1023) | 55296), (s = 56320 | (s & 1023))), n.push(s), (e += u)
        }
        if (((t = n.length), t <= Ei)) n = String.fromCharCode.apply(String, n)
        else {
            for (r = "", e = 0; e < t; ) r += String.fromCharCode.apply(String, n.slice(e, (e += Ei)))
            n = r
        }
        return n
    }
    var Ei = 4096
    S.prototype.slice = function (t, e) {
        var r = this.length
        if (((t = ~~t), (e = e === void 0 ? r : ~~e), 0 > t ? ((t += r), 0 > t && (t = 0)) : t > r && (t = r), 0 > e ? ((e += r), 0 > e && (e = 0)) : e > r && (e = r), e < t && (e = t), S.TYPED_ARRAY_SUPPORT)) (e = this.subarray(t, e)), (e.__proto__ = S.prototype)
        else {
            ;(r = e - t), (e = new S(r, void 0))
            for (var n = 0; n < r; ++n) e[n] = this[n + t]
        }
        return e
    }
    function Q(t, e, r) {
        if (t % 1 !== 0 || 0 > t) throw new RangeError("offset is not uint")
        if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
    }
    ;(S.prototype.readUIntLE = function (t, e, r) {
        ;(t |= 0), (e |= 0), r || Q(t, e, this.length), (r = this[t])
        for (var n = 1, i = 0; ++i < e && (n *= 256); ) r += this[t + i] * n
        return r
    }),
        (S.prototype.readUIntBE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || Q(t, e, this.length), (r = this[t + --e])
            for (var n = 1; 0 < e && (n *= 256); ) r += this[t + --e] * n
            return r
        }),
        (S.prototype.readUInt8 = function (t, e) {
            return e || Q(t, 1, this.length), this[t]
        }),
        (S.prototype.readUInt16LE = function (t, e) {
            return e || Q(t, 2, this.length), this[t] | (this[t + 1] << 8)
        }),
        (S.prototype.readUInt16BE = function (t, e) {
            return e || Q(t, 2, this.length), (this[t] << 8) | this[t + 1]
        }),
        (S.prototype.readUInt32LE = function (t, e) {
            return e || Q(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
        }),
        (S.prototype.readUInt32BE = function (t, e) {
            return e || Q(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
        }),
        (S.prototype.readIntLE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || Q(t, e, this.length), (r = this[t])
            for (var n = 1, i = 0; ++i < e && (n *= 256); ) r += this[t + i] * n
            return r >= 128 * n && (r -= Math.pow(2, 8 * e)), r
        }),
        (S.prototype.readIntBE = function (t, e, r) {
            ;(t |= 0), (e |= 0), r || Q(t, e, this.length), (r = e)
            for (var n = 1, i = this[t + --r]; 0 < r && (n *= 256); ) i += this[t + --r] * n
            return i >= 128 * n && (i -= Math.pow(2, 8 * e)), i
        }),
        (S.prototype.readInt8 = function (t, e) {
            return e || Q(t, 1, this.length), this[t] & 128 ? -1 * (255 - this[t] + 1) : this[t]
        }),
        (S.prototype.readInt16LE = function (t, e) {
            return e || Q(t, 2, this.length), (t = this[t] | (this[t + 1] << 8)), t & 32768 ? t | 4294901760 : t
        }),
        (S.prototype.readInt16BE = function (t, e) {
            return e || Q(t, 2, this.length), (t = this[t + 1] | (this[t] << 8)), t & 32768 ? t | 4294901760 : t
        }),
        (S.prototype.readInt32LE = function (t, e) {
            return e || Q(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
        }),
        (S.prototype.readInt32BE = function (t, e) {
            return e || Q(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
        }),
        (S.prototype.readFloatLE = function (t, e) {
            return e || Q(t, 4, this.length), hr(this, t, !0, 23, 4)
        }),
        (S.prototype.readFloatBE = function (t, e) {
            return e || Q(t, 4, this.length), hr(this, t, !1, 23, 4)
        }),
        (S.prototype.readDoubleLE = function (t, e) {
            return e || Q(t, 8, this.length), hr(this, t, !0, 52, 8)
        }),
        (S.prototype.readDoubleBE = function (t, e) {
            return e || Q(t, 8, this.length), hr(this, t, !1, 52, 8)
        })
    function it(t, e, r, n, i, s) {
        if (!St(t)) throw new TypeError('"buffer" argument must be a Buffer instance')
        if (e > i || e < s) throw new RangeError('"value" argument is out of bounds')
        if (r + n > t.length) throw new RangeError("Index out of range")
    }
    ;(S.prototype.writeUIntLE = function (t, e, r, n) {
        ;(t = +t), (e |= 0), (r |= 0), n || it(this, t, e, r, Math.pow(2, 8 * r) - 1, 0), (n = 1)
        var i = 0
        for (this[e] = t & 255; ++i < r && (n *= 256); ) this[e + i] = (t / n) & 255
        return e + r
    }),
        (S.prototype.writeUIntBE = function (t, e, r, n) {
            ;(t = +t), (e |= 0), (r |= 0), n || it(this, t, e, r, Math.pow(2, 8 * r) - 1, 0), (n = r - 1)
            var i = 1
            for (this[e + n] = t & 255; 0 <= --n && (i *= 256); ) this[e + n] = (t / i) & 255
            return e + r
        }),
        (S.prototype.writeUInt8 = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 1, 255, 0), S.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), (this[e] = t & 255), e + 1
        })
    function cr(t, e, r, n) {
        0 > e && (e = 65535 + e + 1)
        for (var i = 0, s = Math.min(t.length - r, 2); i < s; ++i) t[r + i] = (e & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i))
    }
    ;(S.prototype.writeUInt16LE = function (t, e, r) {
        return (t = +t), (e |= 0), r || it(this, t, e, 2, 65535, 0), S.TYPED_ARRAY_SUPPORT ? ((this[e] = t & 255), (this[e + 1] = t >>> 8)) : cr(this, t, e, !0), e + 2
    }),
        (S.prototype.writeUInt16BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 2, 65535, 0), S.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = t & 255)) : cr(this, t, e, !1), e + 2
        })
    function pr(t, e, r, n) {
        0 > e && (e = 4294967295 + e + 1)
        for (var i = 0, s = Math.min(t.length - r, 4); i < s; ++i) t[r + i] = (e >>> (8 * (n ? i : 3 - i))) & 255
    }
    ;(S.prototype.writeUInt32LE = function (t, e, r) {
        return (t = +t), (e |= 0), r || it(this, t, e, 4, 4294967295, 0), S.TYPED_ARRAY_SUPPORT ? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = t & 255)) : pr(this, t, e, !0), e + 4
    }),
        (S.prototype.writeUInt32BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 4, 4294967295, 0), S.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = t & 255)) : pr(this, t, e, !1), e + 4
        }),
        (S.prototype.writeIntLE = function (t, e, r, n) {
            ;(t = +t), (e |= 0), n || ((n = Math.pow(2, 8 * r - 1)), it(this, t, e, r, n - 1, -n)), (n = 0)
            var i = 1,
                s = 0
            for (this[e] = t & 255; ++n < r && (i *= 256); ) 0 > t && s === 0 && this[e + n - 1] !== 0 && (s = 1), (this[e + n] = (((t / i) >> 0) - s) & 255)
            return e + r
        }),
        (S.prototype.writeIntBE = function (t, e, r, n) {
            ;(t = +t), (e |= 0), n || ((n = Math.pow(2, 8 * r - 1)), it(this, t, e, r, n - 1, -n)), (n = r - 1)
            var i = 1,
                s = 0
            for (this[e + n] = t & 255; 0 <= --n && (i *= 256); ) 0 > t && s === 0 && this[e + n + 1] !== 0 && (s = 1), (this[e + n] = (((t / i) >> 0) - s) & 255)
            return e + r
        }),
        (S.prototype.writeInt8 = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 1, 127, -128), S.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 0 > t && (t = 255 + t + 1), (this[e] = t & 255), e + 1
        }),
        (S.prototype.writeInt16LE = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 2, 32767, -32768), S.TYPED_ARRAY_SUPPORT ? ((this[e] = t & 255), (this[e + 1] = t >>> 8)) : cr(this, t, e, !0), e + 2
        }),
        (S.prototype.writeInt16BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 2, 32767, -32768), S.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = t & 255)) : cr(this, t, e, !1), e + 2
        }),
        (S.prototype.writeInt32LE = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 4, 2147483647, -2147483648), S.TYPED_ARRAY_SUPPORT ? ((this[e] = t & 255), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24)) : pr(this, t, e, !0), e + 4
        }),
        (S.prototype.writeInt32BE = function (t, e, r) {
            return (t = +t), (e |= 0), r || it(this, t, e, 4, 2147483647, -2147483648), 0 > t && (t = 4294967295 + t + 1), S.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = t & 255)) : pr(this, t, e, !1), e + 4
        })
    function ar(t, e, r, n) {
        if (r + n > t.length) throw new RangeError("Index out of range")
        if (0 > r) throw new RangeError("Index out of range")
    }
    ;(S.prototype.writeFloatLE = function (t, e, r) {
        return r || ar(this, t, e, 4), lr(this, t, e, !0, 23, 4), e + 4
    }),
        (S.prototype.writeFloatBE = function (t, e, r) {
            return r || ar(this, t, e, 4), lr(this, t, e, !1, 23, 4), e + 4
        }),
        (S.prototype.writeDoubleLE = function (t, e, r) {
            return r || ar(this, t, e, 8), lr(this, t, e, !0, 52, 8), e + 8
        }),
        (S.prototype.writeDoubleBE = function (t, e, r) {
            return r || ar(this, t, e, 8), lr(this, t, e, !1, 52, 8), e + 8
        }),
        (S.prototype.copy = function (t, e, r, n) {
            if ((r || (r = 0), n || n === 0 || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), 0 < n && n < r && (n = r), n === r || t.length === 0 || this.length === 0)) return 0
            if (0 > e) throw new RangeError("targetStart out of bounds")
            if (0 > r || r >= this.length) throw new RangeError("sourceStart out of bounds")
            if (0 > n) throw new RangeError("sourceEnd out of bounds")
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r)
            var i = n - r
            if (this === t && r < e && e < n) for (n = i - 1; 0 <= n; --n) t[n + e] = this[n + r]
            else if (1e3 > i || !S.TYPED_ARRAY_SUPPORT) for (n = 0; n < i; ++n) t[n + e] = this[n + r]
            else Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e)
            return i
        }),
        (S.prototype.fill = function (t, e, r, n) {
            if (typeof t == "string") {
                if ((typeof e == "string" ? ((n = e), (e = 0), (r = this.length)) : typeof r == "string" && ((n = r), (r = this.length)), t.length === 1)) {
                    var i = t.charCodeAt(0)
                    256 > i && (t = i)
                }
                if (n !== void 0 && typeof n != "string") throw new TypeError("encoding must be a string")
                if (typeof n == "string" && !S.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
            } else typeof t == "number" && (t &= 255)
            if (0 > e || this.length < e || this.length < r) throw new RangeError("Out of range index")
            if (r <= e) return this
            if (((e >>>= 0), (r = r === void 0 ? this.length : r >>> 0), t || (t = 0), typeof t == "number")) for (n = e; n < r; ++n) this[n] = t
            else for (t = St(t) ? t : yr(new S(t, n).toString()), i = t.length, n = 0; n < r - e; ++n) this[n + e] = t[n % i]
            return this
        })
    var Ms = /[^+\/0-9A-Za-z-_]/g
    function yr(t, e) {
        e = e || 1 / 0
        for (var r, n = t.length, i = null, s = [], u = 0; u < n; ++u) {
            if (((r = t.charCodeAt(u)), 55295 < r && 57344 > r)) {
                if (!i) {
                    if (56319 < r) {
                        ;-1 < (e -= 3) && s.push(239, 191, 189)
                        continue
                    } else if (u + 1 === n) {
                        ;-1 < (e -= 3) && s.push(239, 191, 189)
                        continue
                    }
                    i = r
                    continue
                }
                if (56320 > r) {
                    ;-1 < (e -= 3) && s.push(239, 191, 189), (i = r)
                    continue
                }
                r = (((i - 55296) << 10) | (r - 56320)) + 65536
            } else i && -1 < (e -= 3) && s.push(239, 191, 189)
            if (((i = null), 128 > r)) {
                if (0 > --e) break
                s.push(r)
            } else if (2048 > r) {
                if (0 > (e -= 2)) break
                s.push((r >> 6) | 192, (r & 63) | 128)
            } else if (65536 > r) {
                if (0 > (e -= 3)) break
                s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (r & 63) | 128)
            } else if (1114112 > r) {
                if (0 > (e -= 4)) break
                s.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (r & 63) | 128)
            } else throw Error("Invalid code point")
        }
        return s
    }
    function _i(t) {
        for (var e = [], r = 0; r < t.length; ++r) e.push(t.charCodeAt(r) & 255)
        return e
    }
    function Si(t) {
        if (((t = (t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")).replace(Ms, "")), 2 > t.length)) t = ""
        else for (; t.length % 4 !== 0; ) t += "="
        Hr || ci()
        var e = t.length
        if (0 < e % 4) throw Error("Invalid string. Length must be a multiple of 4")
        var r = t[e - 2] === "=" ? 2 : t[e - 1] === "=" ? 1 : 0,
            n = new Ps((3 * e) / 4 - r),
            i = 0 < r ? e - 4 : e,
            s = 0
        for (e = 0; e < i; e += 4) {
            var u = (ct[t.charCodeAt(e)] << 18) | (ct[t.charCodeAt(e + 1)] << 12) | (ct[t.charCodeAt(e + 2)] << 6) | ct[t.charCodeAt(e + 3)]
            ;(n[s++] = (u >> 16) & 255), (n[s++] = (u >> 8) & 255), (n[s++] = u & 255)
        }
        return r === 2 ? ((u = (ct[t.charCodeAt(e)] << 2) | (ct[t.charCodeAt(e + 1)] >> 4)), (n[s++] = u & 255)) : r === 1 && ((u = (ct[t.charCodeAt(e)] << 10) | (ct[t.charCodeAt(e + 1)] << 4) | (ct[t.charCodeAt(e + 2)] >> 2)), (n[s++] = (u >> 8) & 255), (n[s++] = u & 255)), n
    }
    function Pe(t, e, r, n) {
        for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i]
        return i
    }
    function Lt(t) {
        return t != null && (!!t._isBuffer || Ri(t) || (typeof t.readFloatLE == "function" && typeof t.slice == "function" && Ri(t.slice(0, 0))))
    }
    function Ri(t) {
        return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t)
    }
    var Ce = Object.freeze({
            __proto__: null,
            INSPECT_MAX_BYTES: 50,
            kMaxLength: Fs,
            Buffer: S,
            SlowBuffer: function (t) {
                return +t != t && (t = 0), S.alloc(+t)
            },
            isBuffer: Lt,
        }),
        G = b(function (t, e) {
            function r(i) {
                for (var s = [], u = 1; u < arguments.length; u++) s[u - 1] = arguments[u]
                return new (Ce.Buffer.bind.apply(Ce.Buffer, n([void 0, i], s)))()
            }
            var n =
                (H && H.__spreadArrays) ||
                function () {
                    for (var i = 0, s = 0, u = arguments.length; s < u; s++) i += arguments[s].length
                    i = Array(i)
                    var l = 0
                    for (s = 0; s < u; s++) for (var g = arguments[s], p = 0, a = g.length; p < a; p++, l++) i[l] = g[p]
                    return i
                }
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.Buffer = Ce.Buffer), (e.bufferAllocUnsafe = Ce.Buffer.allocUnsafe || r), (e.bufferFrom = Ce.Buffer.from || r)
        })
    et(G)
    function Ai() {
        throw Error("setTimeout has not been defined")
    }
    function Oi() {
        throw Error("clearTimeout has not been defined")
    }
    var $t = Ai,
        Wt = Oi
    typeof te.setTimeout == "function" && ($t = setTimeout), typeof te.clearTimeout == "function" && (Wt = clearTimeout)
    function Ti(t) {
        if ($t === setTimeout) return setTimeout(t, 0)
        if (($t === Ai || !$t) && setTimeout) return ($t = setTimeout), setTimeout(t, 0)
        try {
            return $t(t, 0)
        } catch {
            try {
                return $t.call(null, t, 0)
            } catch {
                return $t.call(this, t, 0)
            }
        }
    }
    function xs(t) {
        if (Wt === clearTimeout) return clearTimeout(t)
        if ((Wt === Oi || !Wt) && clearTimeout) return (Wt = clearTimeout), clearTimeout(t)
        try {
            return Wt(t)
        } catch {
            try {
                return Wt.call(null, t)
            } catch {
                return Wt.call(this, t)
            }
        }
    }
    var Pt = [],
        we = !1,
        re,
        gr = -1
    function js() {
        we && re && ((we = !1), re.length ? (Pt = re.concat(Pt)) : (gr = -1), Pt.length && Ii())
    }
    function Ii() {
        if (!we) {
            var t = Ti(js)
            we = !0
            for (var e = Pt.length; e; ) {
                for (re = Pt, Pt = []; ++gr < e; ) re && re[gr].run()
                ;(gr = -1), (e = Pt.length)
            }
            ;(re = null), (we = !1), xs(t)
        }
    }
    function ut(t) {
        var e = Array(arguments.length - 1)
        if (1 < arguments.length) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r]
        Pt.push(new Ni(t, e)), Pt.length !== 1 || we || Ti(Ii)
    }
    function Ni(t, e) {
        ;(this.fun = t), (this.array = e)
    }
    Ni.prototype.run = function () {
        this.fun.apply(null, this.array)
    }
    function ne() {}
    var Ee = te.performance || {},
        Ys =
            Ee.now ||
            Ee.mozNow ||
            Ee.msNow ||
            Ee.oNow ||
            Ee.webkitNow ||
            function () {
                return new Date().getTime()
            },
        $s = new Date(),
        _e = {
            nextTick: ut,
            title: "browser",
            browser: !0,
            env: {},
            argv: [],
            version: "",
            versions: {},
            on: ne,
            addListener: ne,
            once: ne,
            off: ne,
            removeListener: ne,
            removeAllListeners: ne,
            emit: ne,
            binding: function () {
                throw Error("process.binding is not supported")
            },
            cwd: function () {
                return "/"
            },
            chdir: function () {
                throw Error("process.chdir is not supported")
            },
            umask: function () {
                return 0
            },
            hrtime: function (t) {
                var e = 0.001 * Ys.call(Ee),
                    r = Math.floor(e)
                return (e = Math.floor((e % 1) * 1e9)), t && ((r -= t[0]), (e -= t[1]), 0 > e && (r--, (e += 1e9))), [r, e]
            },
            platform: "browser",
            release: {},
            config: {},
            uptime: function () {
                return (new Date() - $s) / 1e3
            },
        },
        Gt =
            typeof Object.create == "function"
                ? function (t, e) {
                      ;(t.super_ = e), (t.prototype = Object.create(e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }))
                  }
                : function (t, e) {
                      function r() {}
                      ;(t.super_ = e), (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t)
                  },
        Ws = /%[sdj%]/g
    function Qr(t) {
        if (!ie(t)) {
            for (var e = [], r = 0; r < arguments.length; r++) e.push(Rt(arguments[r]))
            return e.join(" ")
        }
        r = 1
        var n = arguments,
            i = n.length
        e = String(t).replace(Ws, function (u) {
            if (u === "%%") return "%"
            if (r >= i) return u
            switch (u) {
                case "%s":
                    return String(n[r++])
                case "%d":
                    return Number(n[r++])
                case "%j":
                    try {
                        return JSON.stringify(n[r++])
                    } catch {
                        return "[Circular]"
                    }
                default:
                    return u
            }
        })
        for (var s = n[r]; r < i; s = n[++r]) e = s !== null && zt(s) ? e + (" " + Rt(s)) : e + (" " + s)
        return e
    }
    function br(t, e) {
        if (Ct(te.process))
            return function () {
                return br(t, e).apply(this, arguments)
            }
        if (_e.noDeprecation === !0) return t
        var r = !1
        return function () {
            if (!r) {
                if (_e.throwDeprecation) throw Error(e)
                _e.traceDeprecation ? console.trace(e) : console.error(e), (r = !0)
            }
            return t.apply(this, arguments)
        }
    }
    var dr = {},
        tn
    function ki(t) {
        return (
            Ct(tn) && (tn = _e.env.NODE_DEBUG || ""),
            (t = t.toUpperCase()),
            dr[t] ||
                (new RegExp("\\b" + t + "\\b", "i").test(tn)
                    ? (dr[t] = function () {
                          var e = Qr.apply(null, arguments)
                          console.error("%s %d: %s", t, 0, e)
                      })
                    : (dr[t] = function () {})),
            dr[t]
        )
    }
    function Rt(t, e) {
        var r = { seen: [], stylize: zs }
        return 3 <= arguments.length && (r.depth = arguments[2]), 4 <= arguments.length && (r.colors = arguments[3]), nn(e) ? (r.showHidden = e) : e && Ci(r, e), Ct(r.showHidden) && (r.showHidden = !1), Ct(r.depth) && (r.depth = 2), Ct(r.colors) && (r.colors = !1), Ct(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = Gs), mr(r, t, r.depth)
    }
    ;(Rt.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }), (Rt.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" })
    function Gs(t, e) {
        return (e = Rt.styles[e]) ? "\x1B[" + Rt.colors[e][0] + "m" + t + "\x1B[" + Rt.colors[e][1] + "m" : t
    }
    function zs(t) {
        return t
    }
    function Vs(t) {
        var e = {}
        return (
            t.forEach(function (r) {
                e[r] = !0
            }),
            e
        )
    }
    function mr(t, e, r) {
        if (t.customInspect && e && Re(e.inspect) && e.inspect !== Rt && (!e.constructor || e.constructor.prototype !== e)) {
            var n = e.inspect(r, t)
            return ie(n) || (n = mr(t, n, r)), n
        }
        if ((n = qs(t, e))) return n
        var i = Object.keys(e),
            s = Vs(i)
        if ((t.showHidden && (i = Object.getOwnPropertyNames(e)), Fe(e) && (0 <= i.indexOf("message") || 0 <= i.indexOf("description")))) return en(e)
        if (i.length === 0) {
            if (Re(e)) return t.stylize("[Function" + (e.name ? ": " + e.name : "") + "]", "special")
            if (Se(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp")
            if (Be(e)) return t.stylize(Date.prototype.toString.call(e), "date")
            if (Fe(e)) return en(e)
        }
        n = ""
        var u = !1,
            l = ["{", "}"]
        return (
            Li(e) && ((u = !0), (l = ["[", "]"])),
            Re(e) && (n = " [Function" + (e.name ? ": " + e.name : "") + "]"),
            Se(e) && (n = " " + RegExp.prototype.toString.call(e)),
            Be(e) && (n = " " + Date.prototype.toUTCString.call(e)),
            Fe(e) && (n = " " + en(e)),
            i.length === 0 && (!u || e.length == 0)
                ? l[0] + n + l[1]
                : 0 > r
                ? Se(e)
                    ? t.stylize(RegExp.prototype.toString.call(e), "regexp")
                    : t.stylize("[Object]", "special")
                : (t.seen.push(e),
                  (i = u
                      ? Ks(t, e, r, s, i)
                      : i.map(function (g) {
                            return rn(t, e, r, s, g, u)
                        })),
                  t.seen.pop(),
                  Hs(i, n, l))
        )
    }
    function qs(t, e) {
        if (Ct(e)) return t.stylize("undefined", "undefined")
        if (ie(e)) return (e = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'"), t.stylize(e, "string")
        if (Pi(e)) return t.stylize("" + e, "number")
        if (nn(e)) return t.stylize("" + e, "boolean")
        if (e === null) return t.stylize("null", "null")
    }
    function en(t) {
        return "[" + Error.prototype.toString.call(t) + "]"
    }
    function Ks(t, e, r, n, i) {
        for (var s = [], u = 0, l = e.length; u < l; ++u) Object.prototype.hasOwnProperty.call(e, String(u)) ? s.push(rn(t, e, r, n, String(u), !0)) : s.push("")
        return (
            i.forEach(function (g) {
                g.match(/^\d+$/) || s.push(rn(t, e, r, n, g, !0))
            }),
            s
        )
    }
    function rn(t, e, r, n, i, s) {
        var u, l
        if (
            ((e = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }),
            e.get ? (l = e.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special")) : e.set && (l = t.stylize("[Setter]", "special")),
            Object.prototype.hasOwnProperty.call(n, i) || (u = "[" + i + "]"),
            l ||
                (0 > t.seen.indexOf(e.value)
                    ? ((l = r === null ? mr(t, e.value, null) : mr(t, e.value, r - 1)),
                      -1 <
                          l.indexOf(`
`) &&
                          (l = s
                              ? l
                                    .split(
                                        `
`
                                    )
                                    .map(function (g) {
                                        return "  " + g
                                    })
                                    .join(
                                        `
`
                                    )
                                    .substr(2)
                              : `
` +
                                l
                                    .split(
                                        `
`
                                    )
                                    .map(function (g) {
                                        return "   " + g
                                    }).join(`
`)))
                    : (l = t.stylize("[Circular]", "special"))),
            Ct(u))
        ) {
            if (s && i.match(/^\d+$/)) return l
            ;(u = JSON.stringify("" + i)),
                u.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
                    ? ((u = u.substr(1, u.length - 2)), (u = t.stylize(u, "name")))
                    : ((u = u
                          .replace(/'/g, "\\'")
                          .replace(/\\"/g, '"')
                          .replace(/(^"|"$)/g, "'")),
                      (u = t.stylize(u, "string")))
        }
        return u + ": " + l
    }
    function Hs(t, e, r) {
        return 60 <
            t.reduce(function (n, i) {
                return (
                    i.indexOf(`
`),
                    n + i.replace(/\u001b\[\d\d?m/g, "").length + 1
                )
            }, 0)
            ? r[0] +
                  (e === ""
                      ? ""
                      : e +
                        `
 `) +
                  " " +
                  t.join(`,
  `) +
                  " " +
                  r[1]
            : r[0] + e + " " + t.join(", ") + " " + r[1]
    }
    function Li(t) {
        return Array.isArray(t)
    }
    function nn(t) {
        return typeof t == "boolean"
    }
    function Pi(t) {
        return typeof t == "number"
    }
    function ie(t) {
        return typeof t == "string"
    }
    function Ct(t) {
        return t === void 0
    }
    function Se(t) {
        return zt(t) && Object.prototype.toString.call(t) === "[object RegExp]"
    }
    function zt(t) {
        return typeof t == "object" && t !== null
    }
    function Be(t) {
        return zt(t) && Object.prototype.toString.call(t) === "[object Date]"
    }
    function Fe(t) {
        return zt(t) && (Object.prototype.toString.call(t) === "[object Error]" || t instanceof Error)
    }
    function Re(t) {
        return typeof t == "function"
    }
    function on(t) {
        return t === null || typeof t == "boolean" || typeof t == "number" || typeof t == "string" || typeof t == "symbol" || typeof t > "u"
    }
    function sn(t) {
        return 10 > t ? "0" + t.toString(10) : t.toString(10)
    }
    var Xs = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
    function Js() {
        var t = new Date(),
            e = [sn(t.getHours()), sn(t.getMinutes()), sn(t.getSeconds())].join(":")
        return [t.getDate(), Xs[t.getMonth()], e].join(" ")
    }
    function Ci(t, e) {
        if (!e || !zt(e)) return t
        for (var r = Object.keys(e), n = r.length; n--; ) t[r[n]] = e[r[n]]
        return t
    }
    var Ue = {
        inherits: Gt,
        _extend: Ci,
        log: function () {
            console.log("%s - %s", Js(), Qr.apply(null, arguments))
        },
        isBuffer: function (t) {
            return Lt(t)
        },
        isPrimitive: on,
        isFunction: Re,
        isError: Fe,
        isDate: Be,
        isObject: zt,
        isRegExp: Se,
        isUndefined: Ct,
        isSymbol: function (t) {
            return typeof t == "symbol"
        },
        isString: ie,
        isNumber: Pi,
        isNullOrUndefined: function (t) {
            return t == null
        },
        isNull: function (t) {
            return t === null
        },
        isBoolean: nn,
        isArray: Li,
        inspect: Rt,
        deprecate: br,
        format: Qr,
        debuglog: ki,
    }
    function Bi(t, e) {
        if (t === e) return 0
        for (var r = t.length, n = e.length, i = 0, s = Math.min(r, n); i < s; ++i)
            if (t[i] !== e[i]) {
                ;(r = t[i]), (n = e[i])
                break
            }
        return r < n ? -1 : n < r ? 1 : 0
    }
    var Zs = Object.prototype.hasOwnProperty,
        Fi =
            Object.keys ||
            function (t) {
                var e = [],
                    r
                for (r in t) Zs.call(t, r) && e.push(r)
                return e
            },
        Ui = Array.prototype.slice,
        un
    function Di() {
        return typeof un < "u"
            ? un
            : (un = (function () {
                  return function () {}.name === "foo"
              })())
    }
    function Mi(t) {
        return Lt(t) || typeof te.ArrayBuffer != "function" ? !1 : typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t ? !!(t instanceof DataView || (t.buffer && t.buffer instanceof ArrayBuffer)) : !1
    }
    function V(t, e) {
        t || ot(t, !0, e, "==", hn)
    }
    var Qs = /\s*function\s+([^\(\s]*)\s*/
    function xi(t) {
        if (Re(t)) return Di() ? t.name : (t = t.toString().match(Qs)) && t[1]
    }
    V.AssertionError = fn
    function fn(t) {
        ;(this.name = "AssertionError"), (this.actual = t.actual), (this.expected = t.expected), (this.operator = t.operator), t.message ? ((this.message = t.message), (this.generatedMessage = !1)) : ((this.message = ji(Yi(this.actual), 128) + " " + this.operator + " " + ji(Yi(this.expected), 128)), (this.generatedMessage = !0))
        var e = t.stackStartFunction || ot
        Error.captureStackTrace
            ? Error.captureStackTrace(this, e)
            : ((t = Error()),
              t.stack &&
                  ((t = t.stack),
                  (e = xi(e)),
                  (e = t.indexOf(
                      `
` + e
                  )),
                  0 <= e &&
                      ((e = t.indexOf(
                          `
`,
                          e + 1
                      )),
                      (t = t.substring(e + 1))),
                  (this.stack = t)))
    }
    Gt(fn, Error)
    function ji(t, e) {
        return typeof t == "string" ? (t.length < e ? t : t.slice(0, e)) : t
    }
    function Yi(t) {
        return Di() || !Re(t) ? Rt(t) : ((t = xi(t)), "[Function" + (t ? ": " + t : "") + "]")
    }
    function ot(t, e, r, n, i) {
        throw new fn({ message: r, actual: t, expected: e, operator: n, stackStartFunction: i })
    }
    V.fail = ot
    function hn(t, e) {
        t || ot(t, !0, e, "==", hn)
    }
    ;(V.ok = hn), (V.equal = $i)
    function $i(t, e, r) {
        t != e && ot(t, e, r, "==", $i)
    }
    V.notEqual = Wi
    function Wi(t, e, r) {
        t == e && ot(t, e, r, "!=", Wi)
    }
    V.deepEqual = Gi
    function Gi(t, e, r) {
        Ae(t, e, !1) || ot(t, e, r, "deepEqual", Gi)
    }
    V.deepStrictEqual = zi
    function zi(t, e, r) {
        Ae(t, e, !0) || ot(t, e, r, "deepStrictEqual", zi)
    }
    function Ae(t, e, r, n) {
        if (t === e) return !0
        if (Lt(t) && Lt(e)) return Bi(t, e) === 0
        if (Be(t) && Be(e)) return t.getTime() === e.getTime()
        if (Se(t) && Se(e)) return t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase
        if ((t !== null && typeof t == "object") || (e !== null && typeof e == "object")) {
            if (!Mi(t) || !Mi(e) || Object.prototype.toString.call(t) !== Object.prototype.toString.call(e) || t instanceof Float32Array || t instanceof Float64Array) {
                if (Lt(t) !== Lt(e)) return !1
                n = n || { actual: [], expected: [] }
                var i = n.actual.indexOf(t)
                return i !== -1 && i === n.expected.indexOf(e) ? !0 : (n.actual.push(t), n.expected.push(e), bs(t, e, r, n))
            }
            return Bi(new Uint8Array(t.buffer), new Uint8Array(e.buffer)) === 0
        }
        return r ? t === e : t == e
    }
    function Vi(t) {
        return Object.prototype.toString.call(t) == "[object Arguments]"
    }
    function bs(t, e, r, n) {
        if (t == null || e === null || e === void 0) return !1
        if (on(t) || on(e)) return t === e
        if (r && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e)) return !1
        var i = Vi(t),
            s = Vi(e)
        if ((i && !s) || (!i && s)) return !1
        if (i) return (t = Ui.call(t)), (e = Ui.call(e)), Ae(t, e, r)
        i = Fi(t)
        var u = Fi(e)
        if (i.length !== u.length) return !1
        for (i.sort(), u.sort(), s = i.length - 1; 0 <= s; s--) if (i[s] !== u[s]) return !1
        for (s = i.length - 1; 0 <= s; s--) if (((u = i[s]), !Ae(t[u], e[u], r, n))) return !1
        return !0
    }
    V.notDeepEqual = qi
    function qi(t, e, r) {
        Ae(t, e, !1) && ot(t, e, r, "notDeepEqual", qi)
    }
    V.notDeepStrictEqual = Ki
    function Ki(t, e, r) {
        Ae(t, e, !0) && ot(t, e, r, "notDeepStrictEqual", Ki)
    }
    V.strictEqual = Hi
    function Hi(t, e, r) {
        t !== e && ot(t, e, r, "===", Hi)
    }
    V.notStrictEqual = Xi
    function Xi(t, e, r) {
        t === e && ot(t, e, r, "!==", Xi)
    }
    function Ji(t, e) {
        if (!t || !e) return !1
        if (Object.prototype.toString.call(e) == "[object RegExp]") return e.test(t)
        try {
            if (t instanceof e) return !0
        } catch {}
        return Error.isPrototypeOf(e) ? !1 : e.call({}, t) === !0
    }
    function Zi(t, e, r, n) {
        if (typeof e != "function") throw new TypeError('"block" argument must be a function')
        typeof r == "string" && ((n = r), (r = null))
        try {
            e()
        } catch (l) {
            var i = l
        }
        ;(e = i), (n = (r && r.name ? " (" + r.name + ")." : ".") + (n ? " " + n : ".")), t && !e && ot(e, r, "Missing expected exception" + n), (i = typeof n == "string")
        var s = !t && Fe(e),
            u = !t && e && !r
        if ((((s && i && Ji(e, r)) || u) && ot(e, r, "Got unwanted exception" + n), (t && e && r && !Ji(e, r)) || (!t && e))) throw e
    }
    V.throws = tu
    function tu(t, e, r) {
        Zi(!0, t, e, r)
    }
    V.doesNotThrow = eu
    function eu(t, e, r) {
        Zi(!1, t, e, r)
    }
    V.ifError = ru
    function ru(t) {
        if (t) throw t
    }
    var De = b(function (t, e) {
        function r(p) {
            return (function (a) {
                function y(v) {
                    for (var w = [], O = 1; O < arguments.length; O++) w[O - 1] = arguments[O]
                    return (w = a.call(this, n(v, w)) || this), (w.code = v), (w[l] = v), (w.name = a.prototype.name + " [" + w[l] + "]"), w
                }
                return u(y, a), y
            })(p)
        }
        function n(p, a) {
            V.strictEqual(typeof p, "string")
            var y = g[p]
            if ((V(y, "An invalid error message key was used: " + p + "."), typeof y == "function")) p = y
            else {
                if (((p = Ue.format), a === void 0 || a.length === 0)) return y
                a.unshift(y)
            }
            return String(p.apply(null, a))
        }
        function i(p, a) {
            g[p] = typeof a == "function" ? a : String(a)
        }
        function s(p, a) {
            if ((V(p, "expected is required"), V(typeof a == "string", "thing is required"), Array.isArray(p))) {
                var y = p.length
                return (
                    V(0 < y, "At least one expected value needs to be specified"),
                    (p = p.map(function (v) {
                        return String(v)
                    })),
                    2 < y ? "one of " + a + " " + p.slice(0, y - 1).join(", ") + ", or " + p[y - 1] : y === 2 ? "one of " + a + " " + p[0] + " or " + p[1] : "of " + a + " " + p[0]
                )
            }
            return "of " + a + " " + String(p)
        }
        var u =
            (H && H.__extends) ||
            (function () {
                function p(a, y) {
                    return (
                        (p =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (v, w) {
                                    v.__proto__ = w
                                }) ||
                            function (v, w) {
                                for (var O in w) w.hasOwnProperty(O) && (v[O] = w[O])
                            }),
                        p(a, y)
                    )
                }
                return function (a, y) {
                    function v() {
                        this.constructor = a
                    }
                    p(a, y), (a.prototype = y === null ? Object.create(y) : ((v.prototype = y.prototype), new v()))
                }
            })()
        Object.defineProperty(e, "__esModule", { value: !0 })
        var l = typeof Symbol > "u" ? "_kCode" : Symbol("code"),
            g = {}
        ;(t = (function (p) {
            function a(y) {
                if (typeof y != "object" || y === null) throw new e.TypeError("ERR_INVALID_ARG_TYPE", "options", "object")
                var v = y.message ? p.call(this, y.message) || this : p.call(this, Ue.inspect(y.actual).slice(0, 128) + " " + (y.operator + " " + Ue.inspect(y.expected).slice(0, 128))) || this
                return (v.generatedMessage = !y.message), (v.name = "AssertionError [ERR_ASSERTION]"), (v.code = "ERR_ASSERTION"), (v.actual = y.actual), (v.expected = y.expected), (v.operator = y.operator), e.Error.captureStackTrace(v, y.stackStartFunction), v
            }
            return u(a, p), a
        })(H.Error)),
            (e.AssertionError = t),
            (e.message = n),
            (e.E = i),
            (e.Error = r(H.Error)),
            (e.TypeError = r(H.TypeError)),
            (e.RangeError = r(H.RangeError)),
            i("ERR_ARG_NOT_ITERABLE", "%s must be iterable"),
            i("ERR_ASSERTION", "%s"),
            i("ERR_BUFFER_OUT_OF_BOUNDS", function (p, a) {
                return a ? "Attempt to write outside buffer bounds" : '"' + p + '" is outside of buffer bounds'
            }),
            i("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received"),
            i("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s"),
            i("ERR_CPU_USAGE", "Unable to obtain cpu usage %s"),
            i("ERR_DNS_SET_SERVERS_FAILED", function (p, a) {
                return 'c-ares failed to set servers: "' + p + '" [' + a + "]"
            }),
            i("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value"),
            i("ERR_ENCODING_NOT_SUPPORTED", function (p) {
                return 'The "' + p + '" encoding is not supported'
            }),
            i("ERR_ENCODING_INVALID_ENCODED_DATA", function (p) {
                return "The encoded data was not valid for encoding " + p
            }),
            i("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client"),
            i("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s"),
            i("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding"),
            i("ERR_INDEX_OUT_OF_RANGE", "Index out of range"),
            i("ERR_INVALID_ARG_TYPE", function (p, a, y) {
                if ((V(p, "name is required"), a.includes("not "))) {
                    var v = "must not be"
                    a = a.split("not ")[1]
                } else v = "must be"
                if (Array.isArray(p))
                    v =
                        "The " +
                        p
                            .map(function (O) {
                                return '"' + O + '"'
                            })
                            .join(", ") +
                        " arguments " +
                        v +
                        " " +
                        s(a, "type")
                else if (p.includes(" argument")) v = "The " + p + " " + v + " " + s(a, "type")
                else {
                    var w = p.includes(".") ? "property" : "argument"
                    v = 'The "' + p + '" ' + w + " " + v + " " + s(a, "type")
                }
                return 3 <= arguments.length && (v += ". Received type " + (y !== null ? typeof y : "null")), v
            }),
            i("ERR_INVALID_ARRAY_LENGTH", function (p, a, y) {
                return V.strictEqual(typeof y, "number"), 'The array "' + p + '" (length ' + y + ") must be of length " + a + "."
            }),
            i("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s"),
            i("ERR_INVALID_CALLBACK", "Callback must be a function"),
            i("ERR_INVALID_CHAR", "Invalid character in %s"),
            i("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column"),
            i("ERR_INVALID_FD", '"fd" must be a positive integer: %s'),
            i("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s'),
            i("ERR_INVALID_FILE_URL_PATH", "File URL path %s"),
            i("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent"),
            i("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s"),
            i("ERR_INVALID_OPT_VALUE", function (p, a) {
                return 'The value "' + String(a) + '" is invalid for option "' + p + '"'
            }),
            i("ERR_INVALID_OPT_VALUE_ENCODING", function (p) {
                return 'The value "' + String(p) + '" is invalid for option "encoding"'
            }),
            i("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL'),
            i("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s"),
            i("ERR_INVALID_THIS", 'Value of "this" must be of type %s'),
            i("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple"),
            i("ERR_INVALID_URL", "Invalid URL: %s"),
            i("ERR_INVALID_URL_SCHEME", function (p) {
                return "The URL must be " + s(p, "scheme")
            }),
            i("ERR_IPC_CHANNEL_CLOSED", "Channel closed"),
            i("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected"),
            i("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe"),
            i("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks"),
            i("ERR_MISSING_ARGS", function () {
                for (var p = [], a = 0; a < arguments.length; a++) p[a] = arguments[a]
                V(0 < p.length, "At least one arg needs to be specified"), (a = "The ")
                var y = p.length
                switch (
                    ((p = p.map(function (v) {
                        return '"' + v + '"'
                    })),
                    y)
                ) {
                    case 1:
                        a += p[0] + " argument"
                        break
                    case 2:
                        a += p[0] + " and " + p[1] + " arguments"
                        break
                    default:
                        ;(a += p.slice(0, y - 1).join(", ")), (a += ", and " + p[y - 1] + " arguments")
                }
                return a + " must be specified"
            }),
            i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
            i("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function"),
            i("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object"),
            i("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support"),
            i("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported"),
            i("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s"),
            i("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound"),
            i("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536"),
            i("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6"),
            i("ERR_SOCKET_CANNOT_SEND", "Unable to send data"),
            i("ERR_SOCKET_CLOSED", "Socket is closed"),
            i("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running"),
            i("ERR_STDERR_CLOSE", "process.stderr cannot be closed"),
            i("ERR_STDOUT_CLOSE", "process.stdout cannot be closed"),
            i("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode"),
            i("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s"),
            i("ERR_TLS_DH_PARAM_SIZE", function (p) {
                return "DH parameter size " + p + " is less than 2048"
            }),
            i("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout"),
            i("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate"),
            i("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext'),
            i("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected"),
            i("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming"),
            i("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0"),
            i("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s"),
            i("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s"),
            i("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type"),
            i("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type"),
            i("ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl")
    })
    et(De)
    var pt = b(function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.ENCODING_UTF8 = "utf8"),
            (e.assertEncoding = function (r) {
                if (r && !G.Buffer.isEncoding(r)) throw new De.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", r)
            }),
            (e.strToEncoding = function (r, n) {
                return n && n !== e.ENCODING_UTF8 ? (n === "buffer" ? new G.Buffer(r) : new G.Buffer(r).toString(n)) : r
            })
    })
    et(pt)
    var ln = b(function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 })
        var r = F.constants.S_IFMT,
            n = F.constants.S_IFDIR,
            i = F.constants.S_IFREG,
            s = F.constants.S_IFBLK,
            u = F.constants.S_IFCHR,
            l = F.constants.S_IFLNK,
            g = F.constants.S_IFIFO,
            p = F.constants.S_IFSOCK
        ;(t = (function () {
            function a() {
                ;(this.name = ""), (this.mode = 0)
            }
            return (
                (a.build = function (y, v) {
                    var w = new a(),
                        O = y.getNode().mode
                    return (w.name = pt.strToEncoding(y.getName(), v)), (w.mode = O), w
                }),
                (a.prototype._checkModeProperty = function (y) {
                    return (this.mode & r) === y
                }),
                (a.prototype.isDirectory = function () {
                    return this._checkModeProperty(n)
                }),
                (a.prototype.isFile = function () {
                    return this._checkModeProperty(i)
                }),
                (a.prototype.isBlockDevice = function () {
                    return this._checkModeProperty(s)
                }),
                (a.prototype.isCharacterDevice = function () {
                    return this._checkModeProperty(u)
                }),
                (a.prototype.isSymbolicLink = function () {
                    return this._checkModeProperty(l)
                }),
                (a.prototype.isFIFO = function () {
                    return this._checkModeProperty(g)
                }),
                (a.prototype.isSocket = function () {
                    return this._checkModeProperty(p)
                }),
                a
            )
        })()),
            (e.Dirent = t),
            (e.default = t)
    })
    et(ln)
    function Qi(t, e) {
        for (var r = 0, n = t.length - 1; 0 <= n; n--) {
            var i = t[n]
            i === "." ? t.splice(n, 1) : i === ".." ? (t.splice(n, 1), r++) : r && (t.splice(n, 1), r--)
        }
        if (e) for (; r--; r) t.unshift("..")
        return t
    }
    var cn = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
    function pn() {
        for (var t = "", e = !1, r = arguments.length - 1; -1 <= r && !e; r--) {
            var n = 0 <= r ? arguments[r] : "/"
            if (typeof n != "string") throw new TypeError("Arguments to path.resolve must be strings")
            n && ((t = n + "/" + t), (e = n.charAt(0) === "/"))
        }
        return (
            (t = Qi(
                gn(t.split("/"), function (i) {
                    return !!i
                }),
                !e
            ).join("/")),
            (e ? "/" : "") + t || "."
        )
    }
    function bi(t) {
        var e = to(t),
            r = nu(t, -1) === "/"
        return (
            (t = Qi(
                gn(t.split("/"), function (n) {
                    return !!n
                }),
                !e
            ).join("/")) ||
                e ||
                (t = "."),
            t && r && (t += "/"),
            (e ? "/" : "") + t
        )
    }
    function to(t) {
        return t.charAt(0) === "/"
    }
    function an(t, e) {
        function r(u) {
            for (var l = 0; l < u.length && u[l] === ""; l++);
            for (var g = u.length - 1; 0 <= g && u[g] === ""; g--);
            return l > g ? [] : u.slice(l, g - l + 1)
        }
        ;(t = pn(t).substr(1)), (e = pn(e).substr(1)), (t = r(t.split("/"))), (e = r(e.split("/")))
        for (var n = Math.min(t.length, e.length), i = n, s = 0; s < n; s++)
            if (t[s] !== e[s]) {
                i = s
                break
            }
        for (n = [], s = i; s < t.length; s++) n.push("..")
        return (n = n.concat(e.slice(i))), n.join("/")
    }
    var yn = {
        extname: function (t) {
            return cn.exec(t).slice(1)[3]
        },
        basename: function (t, e) {
            return (t = cn.exec(t).slice(1)[2]), e && t.substr(-1 * e.length) === e && (t = t.substr(0, t.length - e.length)), t
        },
        dirname: function (t) {
            var e = cn.exec(t).slice(1)
            return (t = e[0]), (e = e[1]), !t && !e ? "." : (e && (e = e.substr(0, e.length - 1)), t + e)
        },
        sep: "/",
        delimiter: ":",
        relative: an,
        join: function () {
            var t = Array.prototype.slice.call(arguments, 0)
            return bi(
                gn(t, function (e) {
                    if (typeof e != "string") throw new TypeError("Arguments to path.join must be strings")
                    return e
                }).join("/")
            )
        },
        isAbsolute: to,
        normalize: bi,
        resolve: pn,
    }
    function gn(t, e) {
        if (t.filter) return t.filter(e)
        for (var r = [], n = 0; n < t.length; n++) e(t[n], n, t) && r.push(t[n])
        return r
    }
    var nu =
            "ab".substr(-1) === "b"
                ? function (t, e, r) {
                      return t.substr(e, r)
                  }
                : function (t, e, r) {
                      return 0 > e && (e = t.length + e), t.substr(e, r)
                  },
        Oe = b(function (t, e) {
            Object.defineProperty(e, "__esModule", { value: !0 }), (t = typeof setImmediate == "function" ? setImmediate.bind(H) : setTimeout.bind(H)), (e.default = t)
        })
    et(Oe)
    var st = b(function (t, e) {
        function r() {
            var n = _e || {}
            return (
                n.getuid ||
                    (n.getuid = function () {
                        return 0
                    }),
                n.getgid ||
                    (n.getgid = function () {
                        return 0
                    }),
                n.cwd ||
                    (n.cwd = function () {
                        return "/"
                    }),
                n.nextTick || (n.nextTick = Oe.default),
                n.emitWarning ||
                    (n.emitWarning = function (i, s) {
                        console.warn("" + s + (s ? ": " : "") + i)
                    }),
                n.env || (n.env = {}),
                n
            )
        }
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.createProcess = r), (e.default = r())
    })
    et(st)
    function Vt() {}
    Vt.prototype = Object.create(null)
    function U() {
        U.init.call(this)
    }
    ;(U.EventEmitter = U),
        (U.usingDomains = !1),
        (U.prototype.domain = void 0),
        (U.prototype._events = void 0),
        (U.prototype._maxListeners = void 0),
        (U.defaultMaxListeners = 10),
        (U.init = function () {
            ;(this.domain = null), (this._events && this._events !== Object.getPrototypeOf(this)._events) || ((this._events = new Vt()), (this._eventsCount = 0)), (this._maxListeners = this._maxListeners || void 0)
        }),
        (U.prototype.setMaxListeners = function (t) {
            if (typeof t != "number" || 0 > t || isNaN(t)) throw new TypeError('"n" argument must be a positive number')
            return (this._maxListeners = t), this
        }),
        (U.prototype.getMaxListeners = function () {
            return this._maxListeners === void 0 ? U.defaultMaxListeners : this._maxListeners
        }),
        (U.prototype.emit = function (t) {
            var e,
                r,
                n = t === "error"
            if ((e = this._events)) n = n && e.error == null
            else if (!n) return !1
            var i = this.domain
            if (n) {
                if (((e = arguments[1]), i)) e || (e = Error('Uncaught, unspecified "error" event')), (e.domainEmitter = this), (e.domain = i), (e.domainThrown = !1), i.emit("error", e)
                else throw e instanceof Error ? e : ((i = Error('Uncaught, unspecified "error" event. (' + e + ")")), (i.context = e), i)
                return !1
            }
            if (((i = e[t]), !i)) return !1
            e = typeof i == "function"
            var s = arguments.length
            switch (s) {
                case 1:
                    if (e) i.call(this)
                    else for (e = i.length, i = Me(i, e), n = 0; n < e; ++n) i[n].call(this)
                    break
                case 2:
                    if (((n = arguments[1]), e)) i.call(this, n)
                    else for (e = i.length, i = Me(i, e), s = 0; s < e; ++s) i[s].call(this, n)
                    break
                case 3:
                    if (((n = arguments[1]), (s = arguments[2]), e)) i.call(this, n, s)
                    else for (e = i.length, i = Me(i, e), r = 0; r < e; ++r) i[r].call(this, n, s)
                    break
                case 4:
                    if (((n = arguments[1]), (s = arguments[2]), (r = arguments[3]), e)) i.call(this, n, s, r)
                    else {
                        ;(e = i.length), (i = Me(i, e))
                        for (var u = 0; u < e; ++u) i[u].call(this, n, s, r)
                    }
                    break
                default:
                    for (n = Array(s - 1), r = 1; r < s; r++) n[r - 1] = arguments[r]
                    if (e) i.apply(this, n)
                    else for (e = i.length, i = Me(i, e), s = 0; s < e; ++s) i[s].apply(this, n)
            }
            return !0
        })
    function eo(t, e, r, n) {
        var i
        if (typeof r != "function") throw new TypeError('"listener" argument must be a function')
        if ((i = t._events)) {
            i.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), (i = t._events))
            var s = i[e]
        } else (i = t._events = new Vt()), (t._eventsCount = 0)
        return s ? (typeof s == "function" ? (s = i[e] = n ? [r, s] : [s, r]) : n ? s.unshift(r) : s.push(r), s.warned || ((r = t._maxListeners === void 0 ? U.defaultMaxListeners : t._maxListeners) && 0 < r && s.length > r && ((s.warned = !0), (r = Error("Possible EventEmitter memory leak detected. " + s.length + " " + e + " listeners added. Use emitter.setMaxListeners() to increase limit")), (r.name = "MaxListenersExceededWarning"), (r.emitter = t), (r.type = e), (r.count = s.length), typeof console.warn == "function" ? console.warn(r) : console.log(r)))) : ((i[e] = r), ++t._eventsCount), t
    }
    ;(U.prototype.addListener = function (t, e) {
        return eo(this, t, e, !1)
    }),
        (U.prototype.on = U.prototype.addListener),
        (U.prototype.prependListener = function (t, e) {
            return eo(this, t, e, !0)
        })
    function ro(t, e, r) {
        function n() {
            t.removeListener(e, n), i || ((i = !0), r.apply(t, arguments))
        }
        var i = !1
        return (n.listener = r), n
    }
    ;(U.prototype.once = function (t, e) {
        if (typeof e != "function") throw new TypeError('"listener" argument must be a function')
        return this.on(t, ro(this, t, e)), this
    }),
        (U.prototype.prependOnceListener = function (t, e) {
            if (typeof e != "function") throw new TypeError('"listener" argument must be a function')
            return this.prependListener(t, ro(this, t, e)), this
        }),
        (U.prototype.removeListener = function (t, e) {
            var r
            if (typeof e != "function") throw new TypeError('"listener" argument must be a function')
            var n = this._events
            if (!n) return this
            var i = n[t]
            if (!i) return this
            if (i === e || (i.listener && i.listener === e)) --this._eventsCount === 0 ? (this._events = new Vt()) : (delete n[t], n.removeListener && this.emit("removeListener", t, i.listener || e))
            else if (typeof i != "function") {
                var s = -1
                for (r = i.length; 0 < r--; )
                    if (i[r] === e || (i[r].listener && i[r].listener === e)) {
                        var u = i[r].listener
                        s = r
                        break
                    }
                if (0 > s) return this
                if (i.length === 1) {
                    if (((i[0] = void 0), --this._eventsCount === 0)) return (this._events = new Vt()), this
                    delete n[t]
                } else {
                    r = s + 1
                    for (var l = i.length; r < l; s += 1, r += 1) i[s] = i[r]
                    i.pop()
                }
                n.removeListener && this.emit("removeListener", t, u || e)
            }
            return this
        }),
        (U.prototype.removeAllListeners = function (t) {
            var e = this._events
            if (!e) return this
            if (!e.removeListener) return arguments.length === 0 ? ((this._events = new Vt()), (this._eventsCount = 0)) : e[t] && (--this._eventsCount === 0 ? (this._events = new Vt()) : delete e[t]), this
            if (arguments.length === 0) {
                e = Object.keys(e)
                for (var r = 0, n; r < e.length; ++r) (n = e[r]), n !== "removeListener" && this.removeAllListeners(n)
                return this.removeAllListeners("removeListener"), (this._events = new Vt()), (this._eventsCount = 0), this
            }
            if (((e = e[t]), typeof e == "function")) this.removeListener(t, e)
            else if (e)
                do this.removeListener(t, e[e.length - 1])
                while (e[0])
            return this
        }),
        (U.prototype.listeners = function (t) {
            var e = this._events
            if (e)
                if ((t = e[t]))
                    if (typeof t == "function") t = [t.listener || t]
                    else {
                        e = Array(t.length)
                        for (var r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r]
                        t = e
                    }
                else t = []
            else t = []
            return t
        }),
        (U.listenerCount = function (t, e) {
            return typeof t.listenerCount == "function" ? t.listenerCount(e) : no.call(t, e)
        }),
        (U.prototype.listenerCount = no)
    function no(t) {
        var e = this._events
        if (e) {
            if (((t = e[t]), typeof t == "function")) return 1
            if (t) return t.length
        }
        return 0
    }
    U.prototype.eventNames = function () {
        return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : []
    }
    function Me(t, e) {
        for (var r = Array(e); e--; ) r[e] = t[e]
        return r
    }
    var xe = b(function (t, e) {
        var r =
            (H && H.__extends) ||
            (function () {
                function g(p, a) {
                    return (
                        (g =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (y, v) {
                                    y.__proto__ = v
                                }) ||
                            function (y, v) {
                                for (var w in v) v.hasOwnProperty(w) && (y[w] = v[w])
                            }),
                        g(p, a)
                    )
                }
                return function (p, a) {
                    function y() {
                        this.constructor = p
                    }
                    g(p, a), (p.prototype = a === null ? Object.create(a) : ((y.prototype = a.prototype), new y()))
                }
            })()
        Object.defineProperty(e, "__esModule", { value: !0 })
        var n = F.constants.S_IFMT,
            i = F.constants.S_IFDIR,
            s = F.constants.S_IFREG,
            u = F.constants.S_IFLNK,
            l = F.constants.O_APPEND
        ;(e.SEP = "/"),
            (t = (function (g) {
                function p(a, y) {
                    y === void 0 && (y = 438)
                    var v = g.call(this) || this
                    return (v.uid = st.default.getuid()), (v.gid = st.default.getgid()), (v.atime = new Date()), (v.mtime = new Date()), (v.ctime = new Date()), (v.perm = 438), (v.mode = s), (v.nlink = 1), (v.perm = y), (v.mode |= y), (v.ino = a), v
                }
                return (
                    r(p, g),
                    (p.prototype.getString = function (a) {
                        return a === void 0 && (a = "utf8"), this.getBuffer().toString(a)
                    }),
                    (p.prototype.setString = function (a) {
                        ;(this.buf = G.bufferFrom(a, "utf8")), this.touch()
                    }),
                    (p.prototype.getBuffer = function () {
                        return this.buf || this.setBuffer(G.bufferAllocUnsafe(0)), G.bufferFrom(this.buf)
                    }),
                    (p.prototype.setBuffer = function (a) {
                        ;(this.buf = G.bufferFrom(a)), this.touch()
                    }),
                    (p.prototype.getSize = function () {
                        return this.buf ? this.buf.length : 0
                    }),
                    (p.prototype.setModeProperty = function (a) {
                        this.mode = (this.mode & ~n) | a
                    }),
                    (p.prototype.setIsFile = function () {
                        this.setModeProperty(s)
                    }),
                    (p.prototype.setIsDirectory = function () {
                        this.setModeProperty(i)
                    }),
                    (p.prototype.setIsSymlink = function () {
                        this.setModeProperty(u)
                    }),
                    (p.prototype.isFile = function () {
                        return (this.mode & n) === s
                    }),
                    (p.prototype.isDirectory = function () {
                        return (this.mode & n) === i
                    }),
                    (p.prototype.isSymlink = function () {
                        return (this.mode & n) === u
                    }),
                    (p.prototype.makeSymlink = function (a) {
                        ;(this.symlink = a), this.setIsSymlink()
                    }),
                    (p.prototype.write = function (a, y, v, w) {
                        if ((y === void 0 && (y = 0), v === void 0 && (v = a.length), w === void 0 && (w = 0), this.buf || (this.buf = G.bufferAllocUnsafe(0)), w + v > this.buf.length)) {
                            var O = G.bufferAllocUnsafe(w + v)
                            this.buf.copy(O, 0, 0, this.buf.length), (this.buf = O)
                        }
                        return a.copy(this.buf, w, y, y + v), this.touch(), v
                    }),
                    (p.prototype.read = function (a, y, v, w) {
                        return y === void 0 && (y = 0), v === void 0 && (v = a.byteLength), w === void 0 && (w = 0), this.buf || (this.buf = G.bufferAllocUnsafe(0)), v > a.byteLength && (v = a.byteLength), v + w > this.buf.length && (v = this.buf.length - w), this.buf.copy(a, y, w, w + v), v
                    }),
                    (p.prototype.truncate = function (a) {
                        if ((a === void 0 && (a = 0), a))
                            if ((this.buf || (this.buf = G.bufferAllocUnsafe(0)), a <= this.buf.length)) this.buf = this.buf.slice(0, a)
                            else {
                                var y = G.bufferAllocUnsafe(0)
                                this.buf.copy(y), y.fill(0, a)
                            }
                        else this.buf = G.bufferAllocUnsafe(0)
                        this.touch()
                    }),
                    (p.prototype.chmod = function (a) {
                        ;(this.perm = a), (this.mode = (this.mode & -512) | a), this.touch()
                    }),
                    (p.prototype.chown = function (a, y) {
                        ;(this.uid = a), (this.gid = y), this.touch()
                    }),
                    (p.prototype.touch = function () {
                        ;(this.mtime = new Date()), this.emit("change", this)
                    }),
                    (p.prototype.canRead = function (a, y) {
                        return a === void 0 && (a = st.default.getuid()), y === void 0 && (y = st.default.getgid()), !!(this.perm & 4 || (y === this.gid && this.perm & 32) || (a === this.uid && this.perm & 256))
                    }),
                    (p.prototype.canWrite = function (a, y) {
                        return a === void 0 && (a = st.default.getuid()), y === void 0 && (y = st.default.getgid()), !!(this.perm & 2 || (y === this.gid && this.perm & 16) || (a === this.uid && this.perm & 128))
                    }),
                    (p.prototype.del = function () {
                        this.emit("delete", this)
                    }),
                    (p.prototype.toJSON = function () {
                        return { ino: this.ino, uid: this.uid, gid: this.gid, atime: this.atime.getTime(), mtime: this.mtime.getTime(), ctime: this.ctime.getTime(), perm: this.perm, mode: this.mode, nlink: this.nlink, symlink: this.symlink, data: this.getString() }
                    }),
                    p
                )
            })(U.EventEmitter)),
            (e.Node = t),
            (t = (function (g) {
                function p(a, y, v) {
                    var w = g.call(this) || this
                    return (w.children = {}), (w.steps = []), (w.ino = 0), (w.length = 0), (w.vol = a), (w.parent = y), (w.steps = y ? y.steps.concat([v]) : [v]), w
                }
                return (
                    r(p, g),
                    (p.prototype.setNode = function (a) {
                        ;(this.node = a), (this.ino = a.ino)
                    }),
                    (p.prototype.getNode = function () {
                        return this.node
                    }),
                    (p.prototype.createChild = function (a, y) {
                        y === void 0 && (y = this.vol.createNode())
                        var v = new p(this.vol, this, a)
                        return v.setNode(y), y.isDirectory(), this.setChild(a, v), v
                    }),
                    (p.prototype.setChild = function (a, y) {
                        return y === void 0 && (y = new p(this.vol, this, a)), (this.children[a] = y), (y.parent = this), this.length++, this.emit("child:add", y, this), y
                    }),
                    (p.prototype.deleteChild = function (a) {
                        delete this.children[a.getName()], this.length--, this.emit("child:delete", a, this)
                    }),
                    (p.prototype.getChild = function (a) {
                        if (Object.hasOwnProperty.call(this.children, a)) return this.children[a]
                    }),
                    (p.prototype.getPath = function () {
                        return this.steps.join(e.SEP)
                    }),
                    (p.prototype.getName = function () {
                        return this.steps[this.steps.length - 1]
                    }),
                    (p.prototype.walk = function (a, y, v) {
                        if ((y === void 0 && (y = a.length), v === void 0 && (v = 0), v >= a.length || v >= y)) return this
                        var w = this.getChild(a[v])
                        return w ? w.walk(a, y, v + 1) : null
                    }),
                    (p.prototype.toJSON = function () {
                        return { steps: this.steps, ino: this.ino, children: Object.keys(this.children) }
                    }),
                    p
                )
            })(U.EventEmitter)),
            (e.Link = t),
            (t = (function () {
                function g(p, a, y, v) {
                    ;(this.position = 0), (this.link = p), (this.node = a), (this.flags = y), (this.fd = v)
                }
                return (
                    (g.prototype.getString = function () {
                        return this.node.getString()
                    }),
                    (g.prototype.setString = function (p) {
                        this.node.setString(p)
                    }),
                    (g.prototype.getBuffer = function () {
                        return this.node.getBuffer()
                    }),
                    (g.prototype.setBuffer = function (p) {
                        this.node.setBuffer(p)
                    }),
                    (g.prototype.getSize = function () {
                        return this.node.getSize()
                    }),
                    (g.prototype.truncate = function (p) {
                        this.node.truncate(p)
                    }),
                    (g.prototype.seekTo = function (p) {
                        this.position = p
                    }),
                    (g.prototype.stats = function () {
                        return ve.default.build(this.node)
                    }),
                    (g.prototype.write = function (p, a, y, v) {
                        return a === void 0 && (a = 0), y === void 0 && (y = p.length), typeof v != "number" && (v = this.position), this.flags & l && (v = this.getSize()), (p = this.node.write(p, a, y, v)), (this.position = v + p), p
                    }),
                    (g.prototype.read = function (p, a, y, v) {
                        return a === void 0 && (a = 0), y === void 0 && (y = p.byteLength), typeof v != "number" && (v = this.position), (p = this.node.read(p, a, y, v)), (this.position = v + p), p
                    }),
                    (g.prototype.chmod = function (p) {
                        this.node.chmod(p)
                    }),
                    (g.prototype.chown = function (p, a) {
                        this.node.chown(p, a)
                    }),
                    g
                )
            })()),
            (e.File = t)
    })
    et(xe)
    var iu = xe.Node,
        io = b(function (t, e) {
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.default = function (r, n, i) {
                    var s = setTimeout.apply(null, arguments)
                    return s && typeof s == "object" && typeof s.unref == "function" && s.unref(), s
                })
        })
    et(io)
    function oe() {
        ;(this.tail = this.head = null), (this.length = 0)
    }
    ;(oe.prototype.push = function (t) {
        ;(t = { data: t, next: null }), 0 < this.length ? (this.tail.next = t) : (this.head = t), (this.tail = t), ++this.length
    }),
        (oe.prototype.unshift = function (t) {
            ;(t = { data: t, next: this.head }), this.length === 0 && (this.tail = t), (this.head = t), ++this.length
        }),
        (oe.prototype.shift = function () {
            if (this.length !== 0) {
                var t = this.head.data
                return (this.head = this.length === 1 ? (this.tail = null) : this.head.next), --this.length, t
            }
        }),
        (oe.prototype.clear = function () {
            ;(this.head = this.tail = null), (this.length = 0)
        }),
        (oe.prototype.join = function (t) {
            if (this.length === 0) return ""
            for (var e = this.head, r = "" + e.data; (e = e.next); ) r += t + e.data
            return r
        }),
        (oe.prototype.concat = function (t) {
            if (this.length === 0) return S.alloc(0)
            if (this.length === 1) return this.head.data
            t = S.allocUnsafe(t >>> 0)
            for (var e = this.head, r = 0; e; ) e.data.copy(t, r), (r += e.data.length), (e = e.next)
            return t
        })
    var ou =
        S.isEncoding ||
        function (t) {
            switch (t && t.toLowerCase()) {
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
                    return !0
                default:
                    return !1
            }
        }
    function je(t) {
        if (((this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, "")), t && !ou(t))) throw Error("Unknown encoding: " + t)
        switch (this.encoding) {
            case "utf8":
                this.surrogateSize = 3
                break
            case "ucs2":
            case "utf16le":
                ;(this.surrogateSize = 2), (this.detectIncompleteChar = uu)
                break
            case "base64":
                ;(this.surrogateSize = 3), (this.detectIncompleteChar = fu)
                break
            default:
                this.write = su
                return
        }
        ;(this.charBuffer = new S(6)), (this.charLength = this.charReceived = 0)
    }
    ;(je.prototype.write = function (t) {
        for (var e = ""; this.charLength; ) {
            if (((e = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length), t.copy(this.charBuffer, this.charReceived, 0, e), (this.charReceived += e), this.charReceived < this.charLength)) return ""
            ;(t = t.slice(e, t.length)), (e = this.charBuffer.slice(0, this.charLength).toString(this.encoding))
            var r = e.charCodeAt(e.length - 1)
            if (55296 <= r && 56319 >= r) (this.charLength += this.surrogateSize), (e = "")
            else {
                if (((this.charReceived = this.charLength = 0), t.length === 0)) return e
                break
            }
        }
        this.detectIncompleteChar(t)
        var n = t.length
        return this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, n), (n -= this.charReceived)), (e += t.toString(this.encoding, 0, n)), (n = e.length - 1), (r = e.charCodeAt(n)), 55296 <= r && 56319 >= r ? ((r = this.surrogateSize), (this.charLength += r), (this.charReceived += r), this.charBuffer.copy(this.charBuffer, r, 0, r), t.copy(this.charBuffer, 0, 0, r), e.substring(0, n)) : e
    }),
        (je.prototype.detectIncompleteChar = function (t) {
            for (var e = 3 <= t.length ? 3 : t.length; 0 < e; e--) {
                var r = t[t.length - e]
                if (e == 1 && r >> 5 == 6) {
                    this.charLength = 2
                    break
                }
                if (2 >= e && r >> 4 == 14) {
                    this.charLength = 3
                    break
                }
                if (3 >= e && r >> 3 == 30) {
                    this.charLength = 4
                    break
                }
            }
            this.charReceived = e
        }),
        (je.prototype.end = function (t) {
            var e = ""
            return t && t.length && (e = this.write(t)), this.charReceived && ((t = this.encoding), (e += this.charBuffer.slice(0, this.charReceived).toString(t))), e
        })
    function su(t) {
        return t.toString(this.encoding)
    }
    function uu(t) {
        this.charLength = (this.charReceived = t.length % 2) ? 2 : 0
    }
    function fu(t) {
        this.charLength = (this.charReceived = t.length % 3) ? 3 : 0
    }
    q.ReadableState = oo
    var j = ki("stream")
    Gt(q, U)
    function hu(t, e, r) {
        if (typeof t.prependListener == "function") return t.prependListener(e, r)
        t._events && t._events[e] ? (Array.isArray(t._events[e]) ? t._events[e].unshift(r) : (t._events[e] = [r, t._events[e]])) : t.on(e, r)
    }
    function oo(t, e) {
        ;(t = t || {}), (this.objectMode = !!t.objectMode), e instanceof at && (this.objectMode = this.objectMode || !!t.readableObjectMode), (e = t.highWaterMark)
        var r = this.objectMode ? 16 : 16384
        ;(this.highWaterMark = e || e === 0 ? e : r), (this.highWaterMark = ~~this.highWaterMark), (this.buffer = new oe()), (this.length = 0), (this.pipes = null), (this.pipesCount = 0), (this.flowing = null), (this.reading = this.endEmitted = this.ended = !1), (this.sync = !0), (this.resumeScheduled = this.readableListening = this.emittedReadable = this.needReadable = !1), (this.defaultEncoding = t.defaultEncoding || "utf8"), (this.ranOut = !1), (this.awaitDrain = 0), (this.readingMore = !1), (this.encoding = this.decoder = null), t.encoding && ((this.decoder = new je(t.encoding)), (this.encoding = t.encoding))
    }
    function q(t) {
        if (!(this instanceof q)) return new q(t)
        ;(this._readableState = new oo(t, this)), (this.readable = !0), t && typeof t.read == "function" && (this._read = t.read), U.call(this)
    }
    ;(q.prototype.push = function (t, e) {
        var r = this._readableState
        return r.objectMode || typeof t != "string" || ((e = e || r.defaultEncoding), e !== r.encoding && ((t = S.from(t, e)), (e = ""))), so(this, r, t, e, !1)
    }),
        (q.prototype.unshift = function (t) {
            return so(this, this._readableState, t, "", !0)
        }),
        (q.prototype.isPaused = function () {
            return this._readableState.flowing === !1
        })
    function so(t, e, r, n, i) {
        var s = r,
            u = null
        if ((Lt(s) || typeof s == "string" || s === null || s === void 0 || e.objectMode || (u = new TypeError("Invalid non-string/buffer chunk")), (s = u))) t.emit("error", s)
        else if (r === null) (e.reading = !1), e.ended || (e.decoder && (r = e.decoder.end()) && r.length && (e.buffer.push(r), (e.length += e.objectMode ? 1 : r.length)), (e.ended = !0), vr(t))
        else if (e.objectMode || (r && 0 < r.length))
            if (e.ended && !i) t.emit("error", Error("stream.push() after EOF"))
            else if (e.endEmitted && i) t.emit("error", Error("stream.unshift() after end event"))
            else {
                if (e.decoder && !i && !n) {
                    r = e.decoder.write(r)
                    var l = !e.objectMode && r.length === 0
                }
                i || (e.reading = !1), l || (e.flowing && e.length === 0 && !e.sync ? (t.emit("data", r), t.read(0)) : ((e.length += e.objectMode ? 1 : r.length), i ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && vr(t))), e.readingMore || ((e.readingMore = !0), ut(lu, t, e))
            }
        else i || (e.reading = !1)
        return !e.ended && (e.needReadable || e.length < e.highWaterMark || e.length === 0)
    }
    q.prototype.setEncoding = function (t) {
        return (this._readableState.decoder = new je(t)), (this._readableState.encoding = t), this
    }
    function uo(t, e) {
        if (0 >= t || (e.length === 0 && e.ended)) return 0
        if (e.objectMode) return 1
        if (t !== t) return e.flowing && e.length ? e.buffer.head.data.length : e.length
        if (t > e.highWaterMark) {
            var r = t
            8388608 <= r ? (r = 8388608) : (r--, (r |= r >>> 1), (r |= r >>> 2), (r |= r >>> 4), (r |= r >>> 8), (r |= r >>> 16), r++), (e.highWaterMark = r)
        }
        return t <= e.length ? t : e.ended ? e.length : ((e.needReadable = !0), 0)
    }
    q.prototype.read = function (t) {
        j("read", t), (t = parseInt(t, 10))
        var e = this._readableState,
            r = t
        if ((t !== 0 && (e.emittedReadable = !1), t === 0 && e.needReadable && (e.length >= e.highWaterMark || e.ended))) return j("read: emitReadable", e.length, e.ended), e.length === 0 && e.ended ? mn(this) : vr(this), null
        if (((t = uo(t, e)), t === 0 && e.ended)) return e.length === 0 && mn(this), null
        var n = e.needReadable
        return j("need readable", n), (e.length === 0 || e.length - t < e.highWaterMark) && ((n = !0), j("length less than watermark", n)), e.ended || e.reading ? j("reading or ended", !1) : n && (j("do read"), (e.reading = !0), (e.sync = !0), e.length === 0 && (e.needReadable = !0), this._read(e.highWaterMark), (e.sync = !1), e.reading || (t = uo(r, e))), (n = 0 < t ? ho(t, e) : null), n === null ? ((e.needReadable = !0), (t = 0)) : (e.length -= t), e.length === 0 && (e.ended || (e.needReadable = !0), r !== t && e.ended && mn(this)), n !== null && this.emit("data", n), n
    }
    function vr(t) {
        var e = t._readableState
        ;(e.needReadable = !1), e.emittedReadable || (j("emitReadable", e.flowing), (e.emittedReadable = !0), e.sync ? ut(fo, t) : fo(t))
    }
    function fo(t) {
        j("emit readable"), t.emit("readable"), dn(t)
    }
    function lu(t, e) {
        for (var r = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (j("maybeReadMore read 0"), t.read(0), r !== e.length); ) r = e.length
        e.readingMore = !1
    }
    ;(q.prototype._read = function () {
        this.emit("error", Error("not implemented"))
    }),
        (q.prototype.pipe = function (t, e) {
            function r($) {
                j("onunpipe"), $ === a && i()
            }
            function n() {
                j("onend"), t.end()
            }
            function i() {
                j("cleanup"), t.removeListener("close", l), t.removeListener("finish", g), t.removeListener("drain", v), t.removeListener("error", u), t.removeListener("unpipe", r), a.removeListener("end", n), a.removeListener("end", i), a.removeListener("data", s), (w = !0), !y.awaitDrain || (t._writableState && !t._writableState.needDrain) || v()
            }
            function s($) {
                j("ondata"), (O = !1), t.write($) !== !1 || O || (((y.pipesCount === 1 && y.pipes === t) || (1 < y.pipesCount && lo(y.pipes, t) !== -1)) && !w && (j("false write response, pause", a._readableState.awaitDrain), a._readableState.awaitDrain++, (O = !0)), a.pause())
            }
            function u($) {
                j("onerror", $), p(), t.removeListener("error", u), t.listeners("error").length === 0 && t.emit("error", $)
            }
            function l() {
                t.removeListener("finish", g), p()
            }
            function g() {
                j("onfinish"), t.removeListener("close", l), p()
            }
            function p() {
                j("unpipe"), a.unpipe(t)
            }
            var a = this,
                y = this._readableState
            switch (y.pipesCount) {
                case 0:
                    y.pipes = t
                    break
                case 1:
                    y.pipes = [y.pipes, t]
                    break
                default:
                    y.pipes.push(t)
            }
            ;(y.pipesCount += 1), j("pipe count=%d opts=%j", y.pipesCount, e), (e = e && e.end === !1 ? i : n), y.endEmitted ? ut(e) : a.once("end", e), t.on("unpipe", r)
            var v = cu(a)
            t.on("drain", v)
            var w = !1,
                O = !1
            return a.on("data", s), hu(t, "error", u), t.once("close", l), t.once("finish", g), t.emit("pipe", a), y.flowing || (j("pipe resume"), a.resume()), t
        })
    function cu(t) {
        return function () {
            var e = t._readableState
            j("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, e.awaitDrain === 0 && t.listeners("data").length && ((e.flowing = !0), dn(t))
        }
    }
    ;(q.prototype.unpipe = function (t) {
        var e = this._readableState
        if (e.pipesCount === 0) return this
        if (e.pipesCount === 1) return t && t !== e.pipes ? this : (t || (t = e.pipes), (e.pipes = null), (e.pipesCount = 0), (e.flowing = !1), t && t.emit("unpipe", this), this)
        if (!t) {
            t = e.pipes
            var r = e.pipesCount
            for (e.pipes = null, e.pipesCount = 0, e.flowing = !1, e = 0; e < r; e++) t[e].emit("unpipe", this)
            return this
        }
        return (r = lo(e.pipes, t)), r === -1 ? this : (e.pipes.splice(r, 1), --e.pipesCount, e.pipesCount === 1 && (e.pipes = e.pipes[0]), t.emit("unpipe", this), this)
    }),
        (q.prototype.on = function (t, e) {
            return (e = U.prototype.on.call(this, t, e)), t === "data" ? this._readableState.flowing !== !1 && this.resume() : t === "readable" && ((t = this._readableState), t.endEmitted || t.readableListening || ((t.readableListening = t.needReadable = !0), (t.emittedReadable = !1), t.reading ? t.length && vr(this) : ut(pu, this))), e
        }),
        (q.prototype.addListener = q.prototype.on)
    function pu(t) {
        j("readable nexttick read 0"), t.read(0)
    }
    q.prototype.resume = function () {
        var t = this._readableState
        return t.flowing || (j("resume"), (t.flowing = !0), t.resumeScheduled || ((t.resumeScheduled = !0), ut(au, this, t))), this
    }
    function au(t, e) {
        e.reading || (j("resume read 0"), t.read(0)), (e.resumeScheduled = !1), (e.awaitDrain = 0), t.emit("resume"), dn(t), e.flowing && !e.reading && t.read(0)
    }
    q.prototype.pause = function () {
        return j("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (j("pause"), (this._readableState.flowing = !1), this.emit("pause")), this
    }
    function dn(t) {
        var e = t._readableState
        for (j("flow", e.flowing); e.flowing && t.read() !== null; );
    }
    ;(q.prototype.wrap = function (t) {
        var e = this._readableState,
            r = !1,
            n = this
        t.on("end", function () {
            if ((j("wrapped end"), e.decoder && !e.ended)) {
                var s = e.decoder.end()
                s && s.length && n.push(s)
            }
            n.push(null)
        }),
            t.on("data", function (s) {
                j("wrapped data"), e.decoder && (s = e.decoder.write(s)), (e.objectMode && s == null) || !(e.objectMode || (s && s.length)) || n.push(s) || ((r = !0), t.pause())
            })
        for (var i in t)
            this[i] === void 0 &&
                typeof t[i] == "function" &&
                (this[i] = (function (s) {
                    return function () {
                        return t[s].apply(t, arguments)
                    }
                })(i))
        return (
            gu(["error", "close", "destroy", "pause", "resume"], function (s) {
                t.on(s, n.emit.bind(n, s))
            }),
            (n._read = function (s) {
                j("wrapped _read", s), r && ((r = !1), t.resume())
            }),
            n
        )
    }),
        (q._fromList = ho)
    function ho(t, e) {
        if (e.length === 0) return null
        if (e.objectMode) var r = e.buffer.shift()
        else if (!t || t >= e.length) (r = e.decoder ? e.buffer.join("") : e.buffer.length === 1 ? e.buffer.head.data : e.buffer.concat(e.length)), e.buffer.clear()
        else {
            if (((r = e.buffer), (e = e.decoder), t < r.head.data.length)) (e = r.head.data.slice(0, t)), (r.head.data = r.head.data.slice(t))
            else {
                if (t === r.head.data.length) r = r.shift()
                else if (e) {
                    e = r.head
                    var n = 1,
                        i = e.data
                    for (t -= i.length; (e = e.next); ) {
                        var s = e.data,
                            u = t > s.length ? s.length : t
                        if (((i = u === s.length ? i + s : i + s.slice(0, t)), (t -= u), t === 0)) {
                            u === s.length ? (++n, (r.head = e.next ? e.next : (r.tail = null))) : ((r.head = e), (e.data = s.slice(u)))
                            break
                        }
                        ++n
                    }
                    ;(r.length -= n), (r = i)
                } else {
                    for (e = S.allocUnsafe(t), n = r.head, i = 1, n.data.copy(e), t -= n.data.length; (n = n.next); ) {
                        if (((s = n.data), (u = t > s.length ? s.length : t), s.copy(e, e.length - t, 0, u), (t -= u), t === 0)) {
                            u === s.length ? (++i, (r.head = n.next ? n.next : (r.tail = null))) : ((r.head = n), (n.data = s.slice(u)))
                            break
                        }
                        ++i
                    }
                    ;(r.length -= i), (r = e)
                }
                e = r
            }
            r = e
        }
        return r
    }
    function mn(t) {
        var e = t._readableState
        if (0 < e.length) throw Error('"endReadable()" called on non-empty stream')
        e.endEmitted || ((e.ended = !0), ut(yu, e, t))
    }
    function yu(t, e) {
        t.endEmitted || t.length !== 0 || ((t.endEmitted = !0), (e.readable = !1), e.emit("end"))
    }
    function gu(t, e) {
        for (var r = 0, n = t.length; r < n; r++) e(t[r], r)
    }
    function lo(t, e) {
        for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r
        return -1
    }
    ;(tt.WritableState = vn), Gt(tt, U)
    function du() {}
    function mu(t, e, r) {
        ;(this.chunk = t), (this.encoding = e), (this.callback = r), (this.next = null)
    }
    function vn(t, e) {
        Object.defineProperty(this, "buffer", {
            get: br(function () {
                return this.getBuffer()
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead."),
        }),
            (t = t || {}),
            (this.objectMode = !!t.objectMode),
            e instanceof at && (this.objectMode = this.objectMode || !!t.writableObjectMode)
        var r = t.highWaterMark,
            n = this.objectMode ? 16 : 16384
        ;(this.highWaterMark = r || r === 0 ? r : n),
            (this.highWaterMark = ~~this.highWaterMark),
            (this.finished = this.ended = this.ending = this.needDrain = !1),
            (this.decodeStrings = t.decodeStrings !== !1),
            (this.defaultEncoding = t.defaultEncoding || "utf8"),
            (this.length = 0),
            (this.writing = !1),
            (this.corked = 0),
            (this.sync = !0),
            (this.bufferProcessing = !1),
            (this.onwrite = function (i) {
                var s = e._writableState,
                    u = s.sync,
                    l = s.writecb
                ;(s.writing = !1), (s.writecb = null), (s.length -= s.writelen), (s.writelen = 0), i ? (--s.pendingcb, u ? ut(l, i) : l(i), (e._writableState.errorEmitted = !0), e.emit("error", i)) : ((i = ao(s)) || s.corked || s.bufferProcessing || !s.bufferedRequest || po(e, s), u ? ut(co, e, s, i, l) : co(e, s, i, l))
            }),
            (this.writecb = null),
            (this.writelen = 0),
            (this.lastBufferedRequest = this.bufferedRequest = null),
            (this.pendingcb = 0),
            (this.errorEmitted = this.prefinished = !1),
            (this.bufferedRequestCount = 0),
            (this.corkedRequestsFree = new go(this))
    }
    vn.prototype.getBuffer = function () {
        for (var t = this.bufferedRequest, e = []; t; ) e.push(t), (t = t.next)
        return e
    }
    function tt(t) {
        if (!(this instanceof tt || this instanceof at)) return new tt(t)
        ;(this._writableState = new vn(t, this)), (this.writable = !0), t && (typeof t.write == "function" && (this._write = t.write), typeof t.writev == "function" && (this._writev = t.writev)), U.call(this)
    }
    ;(tt.prototype.pipe = function () {
        this.emit("error", Error("Cannot pipe, not readable"))
    }),
        (tt.prototype.write = function (t, e, r) {
            var n = this._writableState,
                i = !1
            if ((typeof e == "function" && ((r = e), (e = null)), S.isBuffer(t) ? (e = "buffer") : e || (e = n.defaultEncoding), typeof r != "function" && (r = du), n.ended)) (n = r), (t = Error("write after end")), this.emit("error", t), ut(n, t)
            else {
                var s = r,
                    u = !0,
                    l = !1
                t === null ? (l = new TypeError("May not write null values to stream")) : S.isBuffer(t) || typeof t == "string" || t === void 0 || n.objectMode || (l = new TypeError("Invalid non-string/buffer chunk")), l && (this.emit("error", l), ut(s, l), (u = !1)), u && (n.pendingcb++, (i = e), n.objectMode || n.decodeStrings === !1 || typeof t != "string" || (t = S.from(t, i)), S.isBuffer(t) && (i = "buffer"), (s = n.objectMode ? 1 : t.length), (n.length += s), (e = n.length < n.highWaterMark), e || (n.needDrain = !0), n.writing || n.corked ? ((s = n.lastBufferedRequest), (n.lastBufferedRequest = new mu(t, i, r)), s ? (s.next = n.lastBufferedRequest) : (n.bufferedRequest = n.lastBufferedRequest), (n.bufferedRequestCount += 1)) : wn(this, n, !1, s, t, i, r), (i = e))
            }
            return i
        }),
        (tt.prototype.cork = function () {
            this._writableState.corked++
        }),
        (tt.prototype.uncork = function () {
            var t = this._writableState
            t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || po(this, t))
        }),
        (tt.prototype.setDefaultEncoding = function (t) {
            if ((typeof t == "string" && (t = t.toLowerCase()), !(-1 < "hex utf8 utf-8 ascii binary base64 ucs2 ucs-2 utf16le utf-16le raw".split(" ").indexOf((t + "").toLowerCase())))) throw new TypeError("Unknown encoding: " + t)
            return (this._writableState.defaultEncoding = t), this
        })
    function wn(t, e, r, n, i, s, u) {
        ;(e.writelen = n), (e.writecb = u), (e.writing = !0), (e.sync = !0), r ? t._writev(i, e.onwrite) : t._write(i, s, e.onwrite), (e.sync = !1)
    }
    function co(t, e, r, n) {
        !r && e.length === 0 && e.needDrain && ((e.needDrain = !1), t.emit("drain")), e.pendingcb--, n(), yo(t, e)
    }
    function po(t, e) {
        e.bufferProcessing = !0
        var r = e.bufferedRequest
        if (t._writev && r && r.next) {
            var n = Array(e.bufferedRequestCount),
                i = e.corkedRequestsFree
            i.entry = r
            for (var s = 0; r; ) (n[s] = r), (r = r.next), (s += 1)
            wn(t, e, !0, e.length, n, "", i.finish), e.pendingcb++, (e.lastBufferedRequest = null), i.next ? ((e.corkedRequestsFree = i.next), (i.next = null)) : (e.corkedRequestsFree = new go(e))
        } else {
            for (; r && ((n = r.chunk), wn(t, e, !1, e.objectMode ? 1 : n.length, n, r.encoding, r.callback), (r = r.next), !e.writing); );
            r === null && (e.lastBufferedRequest = null)
        }
        ;(e.bufferedRequestCount = 0), (e.bufferedRequest = r), (e.bufferProcessing = !1)
    }
    ;(tt.prototype._write = function (t, e, r) {
        r(Error("not implemented"))
    }),
        (tt.prototype._writev = null),
        (tt.prototype.end = function (t, e, r) {
            var n = this._writableState
            typeof t == "function" ? ((r = t), (e = t = null)) : typeof e == "function" && ((r = e), (e = null)), t != null && this.write(t, e), n.corked && ((n.corked = 1), this.uncork()), !n.ending && !n.finished && ((t = r), (n.ending = !0), yo(this, n), t && (n.finished ? ut(t) : this.once("finish", t)), (n.ended = !0), (this.writable = !1))
        })
    function ao(t) {
        return t.ending && t.length === 0 && t.bufferedRequest === null && !t.finished && !t.writing
    }
    function yo(t, e) {
        var r = ao(e)
        return r && (e.pendingcb === 0 ? (e.prefinished || ((e.prefinished = !0), t.emit("prefinish")), (e.finished = !0), t.emit("finish")) : e.prefinished || ((e.prefinished = !0), t.emit("prefinish"))), r
    }
    function go(t) {
        var e = this
        ;(this.entry = this.next = null),
            (this.finish = function (r) {
                var n = e.entry
                for (e.entry = null; n; ) {
                    var i = n.callback
                    t.pendingcb--, i(r), (n = n.next)
                }
                t.corkedRequestsFree ? (t.corkedRequestsFree.next = e) : (t.corkedRequestsFree = e)
            })
    }
    Gt(at, q)
    for (var mo = Object.keys(tt.prototype), En = 0; En < mo.length; En++) {
        var _n = mo[En]
        at.prototype[_n] || (at.prototype[_n] = tt.prototype[_n])
    }
    function at(t) {
        if (!(this instanceof at)) return new at(t)
        q.call(this, t), tt.call(this, t), t && t.readable === !1 && (this.readable = !1), t && t.writable === !1 && (this.writable = !1), (this.allowHalfOpen = !0), t && t.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", vu)
    }
    function vu() {
        this.allowHalfOpen || this._writableState.ended || ut(wu, this)
    }
    function wu(t) {
        t.end()
    }
    Gt(At, at)
    function Eu(t) {
        ;(this.afterTransform = function (e, r) {
            var n = t._transformState
            n.transforming = !1
            var i = n.writecb
            return i ? ((n.writechunk = null), (n.writecb = null), r != null && t.push(r), i(e), (e = t._readableState), (e.reading = !1), (e.needReadable || e.length < e.highWaterMark) && t._read(e.highWaterMark), (e = void 0)) : (e = t.emit("error", Error("no writecb in Transform class"))), e
        }),
            (this.transforming = this.needTransform = !1),
            (this.writeencoding = this.writechunk = this.writecb = null)
    }
    function At(t) {
        if (!(this instanceof At)) return new At(t)
        at.call(this, t), (this._transformState = new Eu(this))
        var e = this
        ;(this._readableState.needReadable = !0),
            (this._readableState.sync = !1),
            t && (typeof t.transform == "function" && (this._transform = t.transform), typeof t.flush == "function" && (this._flush = t.flush)),
            this.once("prefinish", function () {
                typeof this._flush == "function"
                    ? this._flush(function (r) {
                          vo(e, r)
                      })
                    : vo(e)
            })
    }
    ;(At.prototype.push = function (t, e) {
        return (this._transformState.needTransform = !1), at.prototype.push.call(this, t, e)
    }),
        (At.prototype._transform = function () {
            throw Error("Not implemented")
        }),
        (At.prototype._write = function (t, e, r) {
            var n = this._transformState
            ;(n.writecb = r), (n.writechunk = t), (n.writeencoding = e), n.transforming || ((t = this._readableState), (n.needTransform || t.needReadable || t.length < t.highWaterMark) && this._read(t.highWaterMark))
        }),
        (At.prototype._read = function () {
            var t = this._transformState
            t.writechunk !== null && t.writecb && !t.transforming ? ((t.transforming = !0), this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : (t.needTransform = !0)
        })
    function vo(t, e) {
        if (e) return t.emit("error", e)
        if (((e = t._transformState), t._writableState.length)) throw Error("Calling transform done when ws.length != 0")
        if (e.transforming) throw Error("Calling transform done when still transforming")
        return t.push(null)
    }
    Gt(Ye, At)
    function Ye(t) {
        if (!(this instanceof Ye)) return new Ye(t)
        At.call(this, t)
    }
    ;(Ye.prototype._transform = function (t, e, r) {
        r(null, t)
    }),
        Gt(ft, U),
        (ft.Readable = q),
        (ft.Writable = tt),
        (ft.Duplex = at),
        (ft.Transform = At),
        (ft.PassThrough = Ye),
        (ft.Stream = ft)
    function ft() {
        U.call(this)
    }
    ft.prototype.pipe = function (t, e) {
        function r(a) {
            t.writable && t.write(a) === !1 && g.pause && g.pause()
        }
        function n() {
            g.readable && g.resume && g.resume()
        }
        function i() {
            p || ((p = !0), t.end())
        }
        function s() {
            p || ((p = !0), typeof t.destroy == "function" && t.destroy())
        }
        function u(a) {
            if ((l(), U.listenerCount(this, "error") === 0)) throw a
        }
        function l() {
            g.removeListener("data", r), t.removeListener("drain", n), g.removeListener("end", i), g.removeListener("close", s), g.removeListener("error", u), t.removeListener("error", u), g.removeListener("end", l), g.removeListener("close", l), t.removeListener("close", l)
        }
        var g = this
        g.on("data", r), t.on("drain", n), t._isStdio || (e && e.end === !1) || (g.on("end", i), g.on("close", s))
        var p = !1
        return g.on("error", u), t.on("error", u), g.on("end", l), g.on("close", l), t.on("close", l), t.emit("pipe", g), t
    }
    var _u = Array.prototype.slice,
        Su = {
            extend: function t(e, r) {
                for (var n in r) e[n] = r[n]
                return 3 > arguments.length ? e : t.apply(null, [e].concat(_u.call(arguments, 2)))
            },
        },
        wo = b(function (t, e) {
            function r(s, u, l) {
                return (
                    l === void 0 &&
                        (l = function (g) {
                            return g
                        }),
                    function () {
                        for (var g = [], p = 0; p < arguments.length; p++) g[p] = arguments[p]
                        return new Promise(function (a, y) {
                            s[u].bind(s).apply(
                                void 0,
                                n(g, [
                                    function (v, w) {
                                        return v ? y(v) : a(l(w))
                                    },
                                ])
                            )
                        })
                    }
                )
            }
            var n =
                (H && H.__spreadArrays) ||
                function () {
                    for (var s = 0, u = 0, l = arguments.length; u < l; u++) s += arguments[u].length
                    s = Array(s)
                    var g = 0
                    for (u = 0; u < l; u++) for (var p = arguments[u], a = 0, y = p.length; a < y; a++, g++) s[g] = p[a]
                    return s
                }
            Object.defineProperty(e, "__esModule", { value: !0 })
            var i = (function () {
                function s(u, l) {
                    ;(this.vol = u), (this.fd = l)
                }
                return (
                    (s.prototype.appendFile = function (u, l) {
                        return r(this.vol, "appendFile")(this.fd, u, l)
                    }),
                    (s.prototype.chmod = function (u) {
                        return r(this.vol, "fchmod")(this.fd, u)
                    }),
                    (s.prototype.chown = function (u, l) {
                        return r(this.vol, "fchown")(this.fd, u, l)
                    }),
                    (s.prototype.close = function () {
                        return r(this.vol, "close")(this.fd)
                    }),
                    (s.prototype.datasync = function () {
                        return r(this.vol, "fdatasync")(this.fd)
                    }),
                    (s.prototype.read = function (u, l, g, p) {
                        return r(this.vol, "read", function (a) {
                            return { bytesRead: a, buffer: u }
                        })(this.fd, u, l, g, p)
                    }),
                    (s.prototype.readFile = function (u) {
                        return r(this.vol, "readFile")(this.fd, u)
                    }),
                    (s.prototype.stat = function (u) {
                        return r(this.vol, "fstat")(this.fd, u)
                    }),
                    (s.prototype.sync = function () {
                        return r(this.vol, "fsync")(this.fd)
                    }),
                    (s.prototype.truncate = function (u) {
                        return r(this.vol, "ftruncate")(this.fd, u)
                    }),
                    (s.prototype.utimes = function (u, l) {
                        return r(this.vol, "futimes")(this.fd, u, l)
                    }),
                    (s.prototype.write = function (u, l, g, p) {
                        return r(this.vol, "write", function (a) {
                            return { bytesWritten: a, buffer: u }
                        })(this.fd, u, l, g, p)
                    }),
                    (s.prototype.writeFile = function (u, l) {
                        return r(this.vol, "writeFile")(this.fd, u, l)
                    }),
                    s
                )
            })()
            ;(e.FileHandle = i),
                (e.default = function (s) {
                    return typeof Promise > "u"
                        ? null
                        : {
                              FileHandle: i,
                              access: function (u, l) {
                                  return r(s, "access")(u, l)
                              },
                              appendFile: function (u, l, g) {
                                  return r(s, "appendFile")(u instanceof i ? u.fd : u, l, g)
                              },
                              chmod: function (u, l) {
                                  return r(s, "chmod")(u, l)
                              },
                              chown: function (u, l, g) {
                                  return r(s, "chown")(u, l, g)
                              },
                              copyFile: function (u, l, g) {
                                  return r(s, "copyFile")(u, l, g)
                              },
                              lchmod: function (u, l) {
                                  return r(s, "lchmod")(u, l)
                              },
                              lchown: function (u, l, g) {
                                  return r(s, "lchown")(u, l, g)
                              },
                              link: function (u, l) {
                                  return r(s, "link")(u, l)
                              },
                              lstat: function (u, l) {
                                  return r(s, "lstat")(u, l)
                              },
                              mkdir: function (u, l) {
                                  return r(s, "mkdir")(u, l)
                              },
                              mkdtemp: function (u, l) {
                                  return r(s, "mkdtemp")(u, l)
                              },
                              open: function (u, l, g) {
                                  return r(s, "open", function (p) {
                                      return new i(s, p)
                                  })(u, l, g)
                              },
                              readdir: function (u, l) {
                                  return r(s, "readdir")(u, l)
                              },
                              readFile: function (u, l) {
                                  return r(s, "readFile")(u instanceof i ? u.fd : u, l)
                              },
                              readlink: function (u, l) {
                                  return r(s, "readlink")(u, l)
                              },
                              realpath: function (u, l) {
                                  return r(s, "realpath")(u, l)
                              },
                              rename: function (u, l) {
                                  return r(s, "rename")(u, l)
                              },
                              rmdir: function (u) {
                                  return r(s, "rmdir")(u)
                              },
                              stat: function (u, l) {
                                  return r(s, "stat")(u, l)
                              },
                              symlink: function (u, l, g) {
                                  return r(s, "symlink")(u, l, g)
                              },
                              truncate: function (u, l) {
                                  return r(s, "truncate")(u, l)
                              },
                              unlink: function (u) {
                                  return r(s, "unlink")(u)
                              },
                              utimes: function (u, l, g) {
                                  return r(s, "utimes")(u, l, g)
                              },
                              writeFile: function (u, l, g) {
                                  return r(s, "writeFile")(u instanceof i ? u.fd : u, l, g)
                              },
                          }
                })
        })
    et(wo)
    var Ru = /[^\x20-\x7E]/,
        Au = /[\x2E\u3002\uFF0E\uFF61]/g,
        Eo = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
        Te = Math.floor,
        Sn = String.fromCharCode
    function Ou(t, e) {
        var r = t.split("@"),
            n = ""
        1 < r.length && ((n = r[0] + "@"), (t = r[1])), (t = t.replace(Au, ".")), (t = t.split(".")), (r = t.length)
        for (var i = []; r--; ) i[r] = e(t[r])
        return (e = i.join(".")), n + e
    }
    function _o(t, e) {
        return t + 22 + 75 * (26 > t) - ((e != 0) << 5)
    }
    function Tu(t) {
        return Ou(t, function (e) {
            if (Ru.test(e)) {
                var r,
                    n = [],
                    i = [],
                    s = 0
                for (r = e.length; s < r; ) {
                    var u = e.charCodeAt(s++)
                    if (55296 <= u && 56319 >= u && s < r) {
                        var l = e.charCodeAt(s++)
                        ;(l & 64512) == 56320 ? i.push(((u & 1023) << 10) + (l & 1023) + 65536) : (i.push(u), s--)
                    } else i.push(u)
                }
                ;(e = i), (l = e.length), (i = 128)
                var g = 0,
                    p = 72
                for (u = 0; u < l; ++u) {
                    var a = e[u]
                    128 > a && n.push(Sn(a))
                }
                for ((s = r = n.length) && n.push("-"); s < l; ) {
                    var y = 2147483647
                    for (u = 0; u < l; ++u) (a = e[u]), a >= i && a < y && (y = a)
                    var v = s + 1
                    if (y - i > Te((2147483647 - g) / v)) throw new RangeError(Eo.overflow)
                    for (g += (y - i) * v, i = y, u = 0; u < l; ++u) {
                        if (((a = e[u]), a < i && 2147483647 < ++g)) throw new RangeError(Eo.overflow)
                        if (a == i) {
                            var w = g
                            for (y = 36; (a = y <= p ? 1 : y >= p + 26 ? 26 : y - p), !(w < a); y += 36) {
                                var O = w - a
                                ;(w = 36 - a), n.push(Sn(_o(a + (O % w), 0))), (w = Te(O / w))
                            }
                            for (n.push(Sn(_o(w, 0))), p = v, y = 0, g = s == r ? Te(g / 700) : g >> 1, g += Te(g / p); 455 < g; y += 36) g = Te(g / 35)
                            ;(p = Te(y + (36 * g) / (g + 38))), (g = 0), ++s
                        }
                    }
                    ++g, ++i
                }
                n = "xn--" + n.join("")
            } else n = e
            return n
        })
    }
    var So =
        Array.isArray ||
        function (t) {
            return Object.prototype.toString.call(t) === "[object Array]"
        }
    function $e(t) {
        switch (typeof t) {
            case "string":
                return t
            case "boolean":
                return t ? "true" : "false"
            case "number":
                return isFinite(t) ? t : ""
            default:
                return ""
        }
    }
    function Iu(t, e, r, n) {
        return (
            (e = e || "&"),
            (r = r || "="),
            t === null && (t = void 0),
            typeof t == "object"
                ? Ro(Nu(t), function (i) {
                      var s = encodeURIComponent($e(i)) + r
                      return So(t[i])
                          ? Ro(t[i], function (u) {
                                return s + encodeURIComponent($e(u))
                            }).join(e)
                          : s + encodeURIComponent($e(t[i]))
                  }).join(e)
                : n
                ? encodeURIComponent($e(n)) + r + encodeURIComponent($e(t))
                : ""
        )
    }
    function Ro(t, e) {
        if (t.map) return t.map(e)
        for (var r = [], n = 0; n < t.length; n++) r.push(e(t[n], n))
        return r
    }
    var Nu =
        Object.keys ||
        function (t) {
            var e = [],
                r
            for (r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r)
            return e
        }
    function Ao(t, e, r, n) {
        r = r || "="
        var i = {}
        if (typeof t != "string" || t.length === 0) return i
        var s = /\+/g
        for (t = t.split(e || "&"), e = 1e3, n && typeof n.maxKeys == "number" && (e = n.maxKeys), n = t.length, 0 < e && n > e && (n = e), e = 0; e < n; ++e) {
            var u = t[e].replace(s, "%20"),
                l = u.indexOf(r)
            if (0 <= l) {
                var g = u.substr(0, l)
                u = u.substr(l + 1)
            } else (g = u), (u = "")
            ;(g = decodeURIComponent(g)), (u = decodeURIComponent(u)), Object.prototype.hasOwnProperty.call(i, g) ? (So(i[g]) ? i[g].push(u) : (i[g] = [i[g], u])) : (i[g] = u)
        }
        return i
    }
    var ku = { parse: wr, resolve: xu, resolveObject: ju, format: Mu, Url: Ot }
    function Ot() {
        this.href = this.path = this.pathname = this.query = this.search = this.hash = this.hostname = this.port = this.host = this.auth = this.slashes = this.protocol = null
    }
    var Lu = /^([a-z0-9.+-]+:)/i,
        Pu = /:[0-9]*$/,
        Cu = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        Bu = "{}|\\^`".split("").concat('<>"` \r\n	'.split("")),
        Rn = ["'"].concat(Bu),
        Oo = ["%", "/", "?", ";", "#"].concat(Rn),
        To = ["/", "?", "#"],
        Fu = 255,
        Io = /^[+a-z0-9A-Z_-]{0,63}$/,
        Uu = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        Du = { javascript: !0, "javascript:": !0 },
        An = { javascript: !0, "javascript:": !0 },
        Ie = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 }
    function wr(t, e, r) {
        if (t && zt(t) && t instanceof Ot) return t
        var n = new Ot()
        return n.parse(t, e, r), n
    }
    Ot.prototype.parse = function (t, e, r) {
        return No(this, t, e, r)
    }
    function No(t, e, r, n) {
        if (!ie(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e)
        var i = e.indexOf("?")
        if (((i = i !== -1 && i < e.indexOf("#") ? "?" : "#"), (e = e.split(i)), (e[0] = e[0].replace(/\\/g, "/")), (e = e.join(i)), (i = e.trim()), !n && e.split("#").length === 1 && (e = Cu.exec(i)))) return (t.path = i), (t.href = i), (t.pathname = e[1]), e[2] ? ((t.search = e[2]), (t.query = r ? Ao(t.search.substr(1)) : t.search.substr(1))) : r && ((t.search = ""), (t.query = {})), t
        if ((e = Lu.exec(i))) {
            e = e[0]
            var s = e.toLowerCase()
            ;(t.protocol = s), (i = i.substr(e.length))
        }
        if (n || e || i.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var u = i.substr(0, 2) === "//"
            !u || (e && An[e]) || ((i = i.substr(2)), (t.slashes = !0))
        }
        if (!An[e] && (u || (e && !Ie[e]))) {
            for (e = -1, n = 0; n < To.length; n++) (u = i.indexOf(To[n])), u !== -1 && (e === -1 || u < e) && (e = u)
            for (u = e === -1 ? i.lastIndexOf("@") : i.lastIndexOf("@", e), u !== -1 && ((n = i.slice(0, u)), (i = i.slice(u + 1)), (t.auth = decodeURIComponent(n))), e = -1, n = 0; n < Oo.length; n++) (u = i.indexOf(Oo[n])), u !== -1 && (e === -1 || u < e) && (e = u)
            if ((e === -1 && (e = i.length), (t.host = i.slice(0, e)), (i = i.slice(e)), ko(t), (t.hostname = t.hostname || ""), (u = t.hostname[0] === "[" && t.hostname[t.hostname.length - 1] === "]"), !u)) {
                var l = t.hostname.split(/\./)
                for (n = 0, e = l.length; n < e; n++) {
                    var g = l[n]
                    if (g && !g.match(Io)) {
                        for (var p = "", a = 0, y = g.length; a < y; a++) p = 127 < g.charCodeAt(a) ? p + "x" : p + g[a]
                        if (!p.match(Io)) {
                            ;(e = l.slice(0, n)), (n = l.slice(n + 1)), (g = g.match(Uu)) && (e.push(g[1]), n.unshift(g[2])), n.length && (i = "/" + n.join(".") + i), (t.hostname = e.join("."))
                            break
                        }
                    }
                }
            }
            ;(t.hostname = t.hostname.length > Fu ? "" : t.hostname.toLowerCase()), u || (t.hostname = Tu(t.hostname)), (n = t.port ? ":" + t.port : ""), (t.host = (t.hostname || "") + n), (t.href += t.host), u && ((t.hostname = t.hostname.substr(1, t.hostname.length - 2)), i[0] !== "/" && (i = "/" + i))
        }
        if (!Du[s]) for (n = 0, e = Rn.length; n < e; n++) (u = Rn[n]), i.indexOf(u) !== -1 && ((g = encodeURIComponent(u)), g === u && (g = escape(u)), (i = i.split(u).join(g)))
        return (n = i.indexOf("#")), n !== -1 && ((t.hash = i.substr(n)), (i = i.slice(0, n))), (n = i.indexOf("?")), n !== -1 ? ((t.search = i.substr(n)), (t.query = i.substr(n + 1)), r && (t.query = Ao(t.query)), (i = i.slice(0, n))) : r && ((t.search = ""), (t.query = {})), i && (t.pathname = i), Ie[s] && t.hostname && !t.pathname && (t.pathname = "/"), (t.pathname || t.search) && ((n = t.pathname || ""), (t.path = n + (t.search || ""))), (t.href = On(t)), t
    }
    function Mu(t) {
        return ie(t) && (t = No({}, t)), On(t)
    }
    function On(t) {
        var e = t.auth || ""
        e && ((e = encodeURIComponent(e)), (e = e.replace(/%3A/i, ":")), (e += "@"))
        var r = t.protocol || "",
            n = t.pathname || "",
            i = t.hash || "",
            s = !1,
            u = ""
        return (
            t.host ? (s = e + t.host) : t.hostname && ((s = e + (t.hostname.indexOf(":") === -1 ? t.hostname : "[" + this.hostname + "]")), t.port && (s += ":" + t.port)),
            t.query && zt(t.query) && Object.keys(t.query).length && (u = Iu(t.query)),
            (e = t.search || (u && "?" + u) || ""),
            r && r.substr(-1) !== ":" && (r += ":"),
            t.slashes || ((!r || Ie[r]) && s !== !1) ? ((s = "//" + (s || "")), n && n.charAt(0) !== "/" && (n = "/" + n)) : s || (s = ""),
            i && i.charAt(0) !== "#" && (i = "#" + i),
            e && e.charAt(0) !== "?" && (e = "?" + e),
            (n = n.replace(/[?#]/g, function (l) {
                return encodeURIComponent(l)
            })),
            (e = e.replace("#", "%23")),
            r + s + n + e + i
        )
    }
    Ot.prototype.format = function () {
        return On(this)
    }
    function xu(t, e) {
        return wr(t, !1, !0).resolve(e)
    }
    Ot.prototype.resolve = function (t) {
        return this.resolveObject(wr(t, !1, !0)).format()
    }
    function ju(t, e) {
        return t ? wr(t, !1, !0).resolveObject(e) : e
    }
    ;(Ot.prototype.resolveObject = function (t) {
        if (ie(t)) {
            var e = new Ot()
            e.parse(t, !1, !0), (t = e)
        }
        e = new Ot()
        for (var r = Object.keys(this), n = 0; n < r.length; n++) {
            var i = r[n]
            e[i] = this[i]
        }
        if (((e.hash = t.hash), t.href === "")) return (e.href = e.format()), e
        if (t.slashes && !t.protocol) {
            for (r = Object.keys(t), n = 0; n < r.length; n++) (i = r[n]), i !== "protocol" && (e[i] = t[i])
            return Ie[e.protocol] && e.hostname && !e.pathname && (e.path = e.pathname = "/"), (e.href = e.format()), e
        }
        var s
        if (t.protocol && t.protocol !== e.protocol) {
            if (!Ie[t.protocol]) {
                for (r = Object.keys(t), n = 0; n < r.length; n++) (i = r[n]), (e[i] = t[i])
                return (e.href = e.format()), e
            }
            if (((e.protocol = t.protocol), t.host || An[t.protocol])) e.pathname = t.pathname
            else {
                for (s = (t.pathname || "").split("/"); s.length && !(t.host = s.shift()); );
                t.host || (t.host = ""), t.hostname || (t.hostname = ""), s[0] !== "" && s.unshift(""), 2 > s.length && s.unshift(""), (e.pathname = s.join("/"))
            }
            return (e.search = t.search), (e.query = t.query), (e.host = t.host || ""), (e.auth = t.auth), (e.hostname = t.hostname || t.host), (e.port = t.port), (e.pathname || e.search) && (e.path = (e.pathname || "") + (e.search || "")), (e.slashes = e.slashes || t.slashes), (e.href = e.format()), e
        }
        r = e.pathname && e.pathname.charAt(0) === "/"
        var u = t.host || (t.pathname && t.pathname.charAt(0) === "/"),
            l = (r = u || r || (e.host && t.pathname))
        if (((n = (e.pathname && e.pathname.split("/")) || []), (i = e.protocol && !Ie[e.protocol]), (s = (t.pathname && t.pathname.split("/")) || []), i && ((e.hostname = ""), (e.port = null), e.host && (n[0] === "" ? (n[0] = e.host) : n.unshift(e.host)), (e.host = ""), t.protocol && ((t.hostname = null), (t.port = null), t.host && (s[0] === "" ? (s[0] = t.host) : s.unshift(t.host)), (t.host = null)), (r = r && (s[0] === "" || n[0] === ""))), u)) (e.host = t.host || t.host === "" ? t.host : e.host), (e.hostname = t.hostname || t.hostname === "" ? t.hostname : e.hostname), (e.search = t.search), (e.query = t.query), (n = s)
        else if (s.length) n || (n = []), n.pop(), (n = n.concat(s)), (e.search = t.search), (e.query = t.query)
        else if (t.search != null) return i && ((e.hostname = e.host = n.shift()), (i = e.host && 0 < e.host.indexOf("@") ? e.host.split("@") : !1)) && ((e.auth = i.shift()), (e.host = e.hostname = i.shift())), (e.search = t.search), (e.query = t.query), (e.pathname !== null || e.search !== null) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), (e.href = e.format()), e
        if (!n.length) return (e.pathname = null), (e.path = e.search ? "/" + e.search : null), (e.href = e.format()), e
        ;(u = n.slice(-1)[0]), (s = ((e.host || t.host || 1 < n.length) && (u === "." || u === "..")) || u === "")
        for (var g = 0, p = n.length; 0 <= p; p--) (u = n[p]), u === "." ? n.splice(p, 1) : u === ".." ? (n.splice(p, 1), g++) : g && (n.splice(p, 1), g--)
        if (!r && !l) for (; g--; g) n.unshift("..")
        return !r || n[0] === "" || (n[0] && n[0].charAt(0) === "/") || n.unshift(""), s && n.join("/").substr(-1) !== "/" && n.push(""), (l = n[0] === "" || (n[0] && n[0].charAt(0) === "/")), i && ((e.hostname = e.host = l ? "" : n.length ? n.shift() : ""), (i = e.host && 0 < e.host.indexOf("@") ? e.host.split("@") : !1)) && ((e.auth = i.shift()), (e.host = e.hostname = i.shift())), (r = r || (e.host && n.length)) && !l && n.unshift(""), n.length ? (e.pathname = n.join("/")) : ((e.pathname = null), (e.path = null)), (e.pathname !== null || e.search !== null) && (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), (e.auth = t.auth || e.auth), (e.slashes = e.slashes || t.slashes), (e.href = e.format()), e
    }),
        (Ot.prototype.parseHost = function () {
            return ko(this)
        })
    function ko(t) {
        var e = t.host,
            r = Pu.exec(e)
        r && ((r = r[0]), r !== ":" && (t.port = r.substr(1)), (e = e.substr(0, e.length - r.length))), e && (t.hostname = e)
    }
    var Lo = b(function (t, e) {
        function r(s, u) {
            return (s = s[u]), 0 < u && (s === "/" || (i && s === "\\"))
        }
        function n(s) {
            var u = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : !0
            if (i) {
                var l = s
                if (typeof l != "string") throw new TypeError("expected a string")
                if (((l = l.replace(/[\\\/]+/g, "/")), u !== !1))
                    if (((u = l), (l = u.length - 1), 2 > l)) l = u
                    else {
                        for (; r(u, l); ) l--
                        l = u.substr(0, l + 1)
                    }
                return l.replace(/^([a-zA-Z]+:|\.\/)/, "")
            }
            return s
        }
        Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.unixify = n),
            (e.correctPath = function (s) {
                return n(s.replace(/^\\\\\?\\.:\\/, "\\"))
            })
        var i = _e.platform === "win32"
    })
    et(Lo)
    var se = b(function (t, e) {
        function r(c, o) {
            return o === void 0 && (o = st.default.cwd()), D(o, c)
        }
        function n(c, o) {
            return typeof c == "function" ? [i(), c] : [i(c), y(o)]
        }
        function i(c) {
            return c === void 0 && (c = {}), P({}, Ju, c)
        }
        function s(c) {
            return typeof c == "number" ? P({}, zo, { mode: c }) : P({}, zo, c)
        }
        function u(c, o, f, h) {
            o === void 0 && (o = ""), f === void 0 && (f = ""), h === void 0 && (h = "")
            var d = ""
            switch ((f && (d = " '" + f + "'"), h && (d += " -> '" + h + "'"), c)) {
                case "ENOENT":
                    return "ENOENT: no such file or directory, " + o + d
                case "EBADF":
                    return "EBADF: bad file descriptor, " + o + d
                case "EINVAL":
                    return "EINVAL: invalid argument, " + o + d
                case "EPERM":
                    return "EPERM: operation not permitted, " + o + d
                case "EPROTO":
                    return "EPROTO: protocol error, " + o + d
                case "EEXIST":
                    return "EEXIST: file already exists, " + o + d
                case "ENOTDIR":
                    return "ENOTDIR: not a directory, " + o + d
                case "EISDIR":
                    return "EISDIR: illegal operation on a directory, " + o + d
                case "EACCES":
                    return "EACCES: permission denied, " + o + d
                case "ENOTEMPTY":
                    return "ENOTEMPTY: directory not empty, " + o + d
                case "EMFILE":
                    return "EMFILE: too many open files, " + o + d
                case "ENOSYS":
                    return "ENOSYS: function not implemented, " + o + d
                default:
                    return c + ": error occurred, " + o + d
            }
        }
        function l(c, o, f, h, d) {
            return o === void 0 && (o = ""), f === void 0 && (f = ""), h === void 0 && (h = ""), d === void 0 && (d = Error), (o = new d(u(c, o, f, h))), (o.code = c), o
        }
        function g(c) {
            if (typeof c == "number") return c
            if (typeof c == "string") {
                var o = fe[c]
                if (typeof o < "u") return o
            }
            throw new De.TypeError("ERR_INVALID_OPT_VALUE", "flags", c)
        }
        function p(c, o) {
            if (o) {
                var f = typeof o
                switch (f) {
                    case "string":
                        c = P({}, c, { encoding: o })
                        break
                    case "object":
                        c = P({}, c, o)
                        break
                    default:
                        throw TypeError("Expected options to be either an object or a string, but got " + f + " instead")
                }
            } else return c
            return c.encoding !== "buffer" && pt.assertEncoding(c.encoding), c
        }
        function a(c) {
            return function (o) {
                return p(c, o)
            }
        }
        function y(c) {
            if (typeof c != "function") throw TypeError(Ft.CB)
            return c
        }
        function v(c) {
            return function (o, f) {
                return typeof o == "function" ? [c(), o] : [c(o), y(f)]
            }
        }
        function w(c) {
            if (typeof c != "string" && !G.Buffer.isBuffer(c)) {
                try {
                    if (!(c instanceof ku.URL)) throw new TypeError(Ft.PATH_STR)
                } catch {
                    throw new TypeError(Ft.PATH_STR)
                }
                if (c.hostname !== "") throw new De.TypeError("ERR_INVALID_FILE_URL_HOST", st.default.platform)
                c = c.pathname
                for (var o = 0; o < c.length; o++)
                    if (c[o] === "%") {
                        var f = c.codePointAt(o + 2) | 32
                        if (c[o + 1] === "2" && f === 102) throw new De.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters")
                    }
                c = decodeURIComponent(c)
            }
            return (c = String(c)), ue(c), c
        }
        function O(c, o) {
            return (c = r(c, o).substr(1)) ? c.split(dt) : []
        }
        function $(c) {
            return O(w(c))
        }
        function Tt(c, o) {
            return o === void 0 && (o = pt.ENCODING_UTF8), G.Buffer.isBuffer(c) ? c : c instanceof Uint8Array ? G.bufferFrom(c) : G.bufferFrom(String(c), o)
        }
        function Bt(c, o) {
            return o && o !== "buffer" ? c.toString(o) : c
        }
        function ue(c, o) {
            if (("" + c).indexOf("\0") !== -1) throw ((c = Error("Path must be a string without null bytes")), (c.code = "ENOENT"), c)
            return !0
        }
        function rt(c, o) {
            if (((c = typeof c == "number" ? c : typeof c == "string" ? parseInt(c, 8) : o ? rt(o) : void 0), typeof c != "number" || isNaN(c))) throw new TypeError(Ft.MODE_INT)
            return c
        }
        function qt(c) {
            if (c >>> 0 !== c) throw TypeError(Ft.FD)
        }
        function gt(c) {
            if (typeof c == "string" && +c == c) return +c
            if (c instanceof Date) return c.getTime() / 1e3
            if (isFinite(c)) return 0 > c ? Date.now() / 1e3 : c
            throw Error("Cannot parse time: " + c)
        }
        function m(c) {
            if (typeof c != "number") throw TypeError(Ft.UID)
        }
        function E(c) {
            if (typeof c != "number") throw TypeError(Ft.GID)
        }
        function A(c) {
            c.emit("stop")
        }
        function I(c, o, f) {
            if (!(this instanceof I)) return new I(c, o, f)
            if (((this._vol = c), (f = P({}, p(f, {}))), f.highWaterMark === void 0 && (f.highWaterMark = 65536), ft.Readable.call(this, f), (this.path = w(o)), (this.fd = f.fd === void 0 ? null : f.fd), (this.flags = f.flags === void 0 ? "r" : f.flags), (this.mode = f.mode === void 0 ? 438 : f.mode), (this.start = f.start), (this.end = f.end), (this.autoClose = f.autoClose === void 0 ? !0 : f.autoClose), (this.pos = void 0), (this.bytesRead = 0), this.start !== void 0)) {
                if (typeof this.start != "number") throw new TypeError('"start" option must be a Number')
                if (this.end === void 0) this.end = 1 / 0
                else if (typeof this.end != "number") throw new TypeError('"end" option must be a Number')
                if (this.start > this.end) throw Error('"start" option must be <= "end" option')
                this.pos = this.start
            }
            typeof this.fd != "number" && this.open(),
                this.on("end", function () {
                    this.autoClose && this.destroy && this.destroy()
                })
        }
        function k() {
            this.close()
        }
        function L(c, o, f) {
            if (!(this instanceof L)) return new L(c, o, f)
            if (((this._vol = c), (f = P({}, p(f, {}))), ft.Writable.call(this, f), (this.path = w(o)), (this.fd = f.fd === void 0 ? null : f.fd), (this.flags = f.flags === void 0 ? "w" : f.flags), (this.mode = f.mode === void 0 ? 438 : f.mode), (this.start = f.start), (this.autoClose = f.autoClose === void 0 ? !0 : !!f.autoClose), (this.pos = void 0), (this.bytesWritten = 0), this.start !== void 0)) {
                if (typeof this.start != "number") throw new TypeError('"start" option must be a Number')
                if (0 > this.start) throw Error('"start" must be >= zero')
                this.pos = this.start
            }
            f.encoding && this.setDefaultEncoding(f.encoding),
                typeof this.fd != "number" && this.open(),
                this.once("finish", function () {
                    this.autoClose && this.close()
                })
        }
        var C =
                (H && H.__extends) ||
                (function () {
                    function c(o, f) {
                        return (
                            (c =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (h, d) {
                                        h.__proto__ = d
                                    }) ||
                                function (h, d) {
                                    for (var _ in d) d.hasOwnProperty(_) && (h[_] = d[_])
                                }),
                            c(o, f)
                        )
                    }
                    return function (o, f) {
                        function h() {
                            this.constructor = o
                        }
                        c(o, f), (o.prototype = f === null ? Object.create(f) : ((h.prototype = f.prototype), new h()))
                    }
                })(),
            B =
                (H && H.__spreadArrays) ||
                function () {
                    for (var c = 0, o = 0, f = arguments.length; o < f; o++) c += arguments[o].length
                    c = Array(c)
                    var h = 0
                    for (o = 0; o < f; o++) for (var d = arguments[o], _ = 0, N = d.length; _ < N; _++, h++) c[h] = d[_]
                    return c
                }
        Object.defineProperty(e, "__esModule", { value: !0 })
        var P = Su.extend,
            D = yn.resolve,
            M = F.constants.O_RDONLY,
            W = F.constants.O_WRONLY,
            X = F.constants.O_RDWR,
            J = F.constants.O_CREAT,
            Er = F.constants.O_EXCL,
            We = F.constants.O_TRUNC,
            Ge = F.constants.O_APPEND,
            Fo = F.constants.O_SYNC,
            zu = F.constants.O_DIRECTORY,
            Uo = F.constants.F_OK,
            Vu = F.constants.COPYFILE_EXCL,
            qu = F.constants.COPYFILE_FICLONE_FORCE,
            dt = yn.sep,
            Do = yn.relative,
            In = st.default.platform === "win32",
            Ft = { PATH_STR: "path must be a string or Buffer", FD: "fd must be a file descriptor", MODE_INT: "mode must be an int", CB: "callback must be a function", UID: "uid must be an unsigned int", GID: "gid must be an unsigned int", LEN: "len must be an integer", ATIME: "atime must be an integer", MTIME: "mtime must be an integer", PREFIX: "filename prefix is required", BUFFER: "buffer must be an instance of Buffer or StaticBuffer", OFFSET: "offset must be an integer", LENGTH: "length must be an integer", POSITION: "position must be an integer" },
            fe
        ;(function (c) {
            ;(c[(c.r = M)] = "r"), (c[(c["r+"] = X)] = "r+"), (c[(c.rs = M | Fo)] = "rs"), (c[(c.sr = c.rs)] = "sr"), (c[(c["rs+"] = X | Fo)] = "rs+"), (c[(c["sr+"] = c["rs+"])] = "sr+"), (c[(c.w = W | J | We)] = "w"), (c[(c.wx = W | J | We | Er)] = "wx"), (c[(c.xw = c.wx)] = "xw"), (c[(c["w+"] = X | J | We)] = "w+"), (c[(c["wx+"] = X | J | We | Er)] = "wx+"), (c[(c["xw+"] = c["wx+"])] = "xw+"), (c[(c.a = W | Ge | J)] = "a"), (c[(c.ax = W | Ge | J | Er)] = "ax"), (c[(c.xa = c.ax)] = "xa"), (c[(c["a+"] = X | Ge | J)] = "a+"), (c[(c["ax+"] = X | Ge | J | Er)] = "ax+"), (c[(c["xa+"] = c["ax+"])] = "xa+")
        })((fe = e.FLAGS || (e.FLAGS = {}))),
            (e.flagsToNumber = g),
            (t = { encoding: "utf8" })
        var _r = a(t),
            Mo = v(_r),
            xo = a({ flag: "r" }),
            jo = { encoding: "utf8", mode: 438, flag: fe[fe.w] },
            Yo = a(jo),
            $o = { encoding: "utf8", mode: 438, flag: fe[fe.a] },
            Wo = a($o),
            Ku = v(Wo),
            Go = a(t),
            Hu = v(Go),
            zo = { mode: 511, recursive: !1 },
            Vo = { recursive: !1 },
            qo = a({ encoding: "utf8", withFileTypes: !1 }),
            Xu = v(qo),
            Ju = { bigint: !1 }
        if (((e.pathToFilename = w), In)) {
            var Zu = r,
                Qu = Lo.unixify
            r = function (c, o) {
                return Qu(Zu(c, o))
            }
        }
        ;(e.filenameToSteps = O),
            (e.pathToSteps = $),
            (e.dataToStr = function (c, o) {
                return o === void 0 && (o = pt.ENCODING_UTF8), G.Buffer.isBuffer(c) ? c.toString(o) : c instanceof Uint8Array ? G.bufferFrom(c).toString(o) : String(c)
            }),
            (e.dataToBuffer = Tt),
            (e.bufferToEncoding = Bt),
            (e.toUnixTimestamp = gt),
            (t = (function () {
                function c(o) {
                    o === void 0 && (o = {}), (this.ino = 0), (this.inodes = {}), (this.releasedInos = []), (this.fds = {}), (this.releasedFds = []), (this.maxFiles = 1e4), (this.openFiles = 0), (this.promisesApi = wo.default(this)), (this.statWatchers = {}), (this.props = P({ Node: xe.Node, Link: xe.Link, File: xe.File }, o)), (o = this.createLink()), o.setNode(this.createNode(!0))
                    var f = this
                    ;(this.StatWatcher = (function (h) {
                        function d() {
                            return h.call(this, f) || this
                        }
                        return C(d, h), d
                    })(Ko)),
                        (this.ReadStream = (function (h) {
                            function d() {
                                for (var _ = [], N = 0; N < arguments.length; N++) _[N] = arguments[N]
                                return h.apply(this, B([f], _)) || this
                            }
                            return C(d, h), d
                        })(I)),
                        (this.WriteStream = (function (h) {
                            function d() {
                                for (var _ = [], N = 0; N < arguments.length; N++) _[N] = arguments[N]
                                return h.apply(this, B([f], _)) || this
                            }
                            return C(d, h), d
                        })(L)),
                        (this.FSWatcher = (function (h) {
                            function d() {
                                return h.call(this, f) || this
                            }
                            return C(d, h), d
                        })(Ho)),
                        (this.root = o)
                }
                return (
                    (c.fromJSON = function (o, f) {
                        var h = new c()
                        return h.fromJSON(o, f), h
                    }),
                    Object.defineProperty(c.prototype, "promises", {
                        get: function () {
                            if (this.promisesApi === null) throw Error("Promise is not supported in this environment.")
                            return this.promisesApi
                        },
                        enumerable: !0,
                        configurable: !0,
                    }),
                    (c.prototype.createLink = function (o, f, h, d) {
                        if ((h === void 0 && (h = !1), !o)) return new this.props.Link(this, null, "")
                        if (!f) throw Error("createLink: name cannot be empty")
                        return o.createChild(f, this.createNode(h, d))
                    }),
                    (c.prototype.deleteLink = function (o) {
                        var f = o.parent
                        return f ? (f.deleteChild(o), !0) : !1
                    }),
                    (c.prototype.newInoNumber = function () {
                        var o = this.releasedInos.pop()
                        return o || (this.ino = (this.ino + 1) % 4294967295)
                    }),
                    (c.prototype.newFdNumber = function () {
                        var o = this.releasedFds.pop()
                        return typeof o == "number" ? o : c.fd--
                    }),
                    (c.prototype.createNode = function (o, f) {
                        return o === void 0 && (o = !1), (f = new this.props.Node(this.newInoNumber(), f)), o && f.setIsDirectory(), (this.inodes[f.ino] = f)
                    }),
                    (c.prototype.getNode = function (o) {
                        return this.inodes[o]
                    }),
                    (c.prototype.deleteNode = function (o) {
                        o.del(), delete this.inodes[o.ino], this.releasedInos.push(o.ino)
                    }),
                    (c.prototype.genRndStr = function () {
                        var o = (Math.random() + 1).toString(36).substr(2, 6)
                        return o.length === 6 ? o : this.genRndStr()
                    }),
                    (c.prototype.getLink = function (o) {
                        return this.root.walk(o)
                    }),
                    (c.prototype.getLinkOrThrow = function (o, f) {
                        var h = O(o)
                        if (((h = this.getLink(h)), !h)) throw l("ENOENT", f, o)
                        return h
                    }),
                    (c.prototype.getResolvedLink = function (o) {
                        o = typeof o == "string" ? O(o) : o
                        for (var f = this.root, h = 0; h < o.length; ) {
                            if (((f = f.getChild(o[h])), !f)) return null
                            var d = f.getNode()
                            d.isSymlink() ? ((o = d.symlink.concat(o.slice(h + 1))), (f = this.root), (h = 0)) : h++
                        }
                        return f
                    }),
                    (c.prototype.getResolvedLinkOrThrow = function (o, f) {
                        var h = this.getResolvedLink(o)
                        if (!h) throw l("ENOENT", f, o)
                        return h
                    }),
                    (c.prototype.resolveSymlinks = function (o) {
                        return this.getResolvedLink(o.steps.slice(1))
                    }),
                    (c.prototype.getLinkAsDirOrThrow = function (o, f) {
                        var h = this.getLinkOrThrow(o, f)
                        if (!h.getNode().isDirectory()) throw l("ENOTDIR", f, o)
                        return h
                    }),
                    (c.prototype.getLinkParent = function (o) {
                        return this.root.walk(o, o.length - 1)
                    }),
                    (c.prototype.getLinkParentAsDirOrThrow = function (o, f) {
                        o = o instanceof Array ? o : O(o)
                        var h = this.getLinkParent(o)
                        if (!h) throw l("ENOENT", f, dt + o.join(dt))
                        if (!h.getNode().isDirectory()) throw l("ENOTDIR", f, dt + o.join(dt))
                        return h
                    }),
                    (c.prototype.getFileByFd = function (o) {
                        return this.fds[String(o)]
                    }),
                    (c.prototype.getFileByFdOrThrow = function (o, f) {
                        if (o >>> 0 !== o) throw TypeError(Ft.FD)
                        if (((o = this.getFileByFd(o)), !o)) throw l("EBADF", f)
                        return o
                    }),
                    (c.prototype.getNodeByIdOrCreate = function (o, f, h) {
                        if (typeof o == "number") {
                            if (((o = this.getFileByFd(o)), !o)) throw Error("File nto found")
                            return o.node
                        }
                        var d = $(o),
                            _ = this.getLink(d)
                        if (_) return _.getNode()
                        if (f & J && (f = this.getLinkParent(d))) return (_ = this.createLink(f, d[d.length - 1], !1, h)), _.getNode()
                        throw l("ENOENT", "getNodeByIdOrCreate", w(o))
                    }),
                    (c.prototype.wrapAsync = function (o, f, h) {
                        var d = this
                        y(h),
                            Oe.default(function () {
                                try {
                                    h(null, o.apply(d, f))
                                } catch (_) {
                                    h(_)
                                }
                            })
                    }),
                    (c.prototype._toJSON = function (o, f, h) {
                        var d
                        o === void 0 && (o = this.root), f === void 0 && (f = {})
                        var _ = !0,
                            N = o.children
                        o.getNode().isFile() && ((N = ((d = {}), (d[o.getName()] = o.parent.getChild(o.getName())), d)), (o = o.parent))
                        for (var K in N) {
                            if (((_ = !1), (N = o.getChild(K)), !N)) throw Error("_toJSON: unexpected undefined")
                            ;(d = N.getNode()), d.isFile() ? ((N = N.getPath()), h && (N = Do(h, N)), (f[N] = d.getString())) : d.isDirectory() && this._toJSON(N, f, h)
                        }
                        return (o = o.getPath()), h && (o = Do(h, o)), o && _ && (f[o] = null), f
                    }),
                    (c.prototype.toJSON = function (o, f, h) {
                        f === void 0 && (f = {}), h === void 0 && (h = !1)
                        var d = []
                        if (o) {
                            o instanceof Array || (o = [o])
                            for (var _ = 0; _ < o.length; _++) {
                                var N = w(o[_])
                                ;(N = this.getResolvedLink(N)) && d.push(N)
                            }
                        } else d.push(this.root)
                        if (!d.length) return f
                        for (_ = 0; _ < d.length; _++) (N = d[_]), this._toJSON(N, f, h ? N.getPath() : "")
                        return f
                    }),
                    (c.prototype.fromJSON = function (o, f) {
                        f === void 0 && (f = st.default.cwd())
                        for (var h in o) {
                            var d = o[h]
                            if (typeof d == "string") {
                                h = r(h, f)
                                var _ = O(h)
                                1 < _.length && ((_ = dt + _.slice(0, _.length - 1).join(dt)), this.mkdirpBase(_, 511)), this.writeFileSync(h, d)
                            } else this.mkdirpBase(h, 511)
                        }
                    }),
                    (c.prototype.reset = function () {
                        ;(this.ino = 0), (this.inodes = {}), (this.releasedInos = []), (this.fds = {}), (this.releasedFds = []), (this.openFiles = 0), (this.root = this.createLink()), this.root.setNode(this.createNode(!0))
                    }),
                    (c.prototype.mountSync = function (o, f) {
                        this.fromJSON(f, o)
                    }),
                    (c.prototype.openLink = function (o, f, h) {
                        if ((h === void 0 && (h = !0), this.openFiles >= this.maxFiles)) throw l("EMFILE", "open", o.getPath())
                        var d = o
                        if ((h && (d = this.resolveSymlinks(o)), !d)) throw l("ENOENT", "open", o.getPath())
                        if (((h = d.getNode()), h.isDirectory())) {
                            if ((f & (M | X | W)) !== M) throw l("EISDIR", "open", o.getPath())
                        } else if (f & zu) throw l("ENOTDIR", "open", o.getPath())
                        if (!(f & W || h.canRead())) throw l("EACCES", "open", o.getPath())
                        return (o = new this.props.File(o, h, f, this.newFdNumber())), (this.fds[o.fd] = o), this.openFiles++, f & We && o.truncate(), o
                    }),
                    (c.prototype.openFile = function (o, f, h, d) {
                        d === void 0 && (d = !0)
                        var _ = O(o),
                            N = d ? this.getResolvedLink(_) : this.getLink(_)
                        if (!N && f & J) {
                            var K = this.getResolvedLink(_.slice(0, _.length - 1))
                            if (!K) throw l("ENOENT", "open", dt + _.join(dt))
                            f & J && typeof h == "number" && (N = this.createLink(K, _[_.length - 1], !1, h))
                        }
                        if (N) return this.openLink(N, f, d)
                        throw l("ENOENT", "open", o)
                    }),
                    (c.prototype.openBase = function (o, f, h, d) {
                        if ((d === void 0 && (d = !0), (f = this.openFile(o, f, h, d)), !f)) throw l("ENOENT", "open", o)
                        return f.fd
                    }),
                    (c.prototype.openSync = function (o, f, h) {
                        return h === void 0 && (h = 438), (h = rt(h)), (o = w(o)), (f = g(f)), this.openBase(o, f, h)
                    }),
                    (c.prototype.open = function (o, f, h, d) {
                        var _ = h
                        typeof h == "function" && ((_ = 438), (d = h)), (h = rt(_ || 438)), (o = w(o)), (f = g(f)), this.wrapAsync(this.openBase, [o, f, h], d)
                    }),
                    (c.prototype.closeFile = function (o) {
                        this.fds[o.fd] && (this.openFiles--, delete this.fds[o.fd], this.releasedFds.push(o.fd))
                    }),
                    (c.prototype.closeSync = function (o) {
                        qt(o), (o = this.getFileByFdOrThrow(o, "close")), this.closeFile(o)
                    }),
                    (c.prototype.close = function (o, f) {
                        qt(o), this.wrapAsync(this.closeSync, [o], f)
                    }),
                    (c.prototype.openFileOrGetById = function (o, f, h) {
                        if (typeof o == "number") {
                            if (((o = this.fds[o]), !o)) throw l("ENOENT")
                            return o
                        }
                        return this.openFile(w(o), f, h)
                    }),
                    (c.prototype.readBase = function (o, f, h, d, _) {
                        return this.getFileByFdOrThrow(o).read(f, Number(h), Number(d), _)
                    }),
                    (c.prototype.readSync = function (o, f, h, d, _) {
                        return qt(o), this.readBase(o, f, h, d, _)
                    }),
                    (c.prototype.read = function (o, f, h, d, _, N) {
                        var K = this
                        if ((y(N), d === 0))
                            return st.default.nextTick(function () {
                                N && N(null, 0, f)
                            })
                        Oe.default(function () {
                            try {
                                var ht = K.readBase(o, f, h, d, _)
                                N(null, ht, f)
                            } catch (Kt) {
                                N(Kt)
                            }
                        })
                    }),
                    (c.prototype.readFileBase = function (o, f, h) {
                        var d = typeof o == "number" && o >>> 0 === o
                        if (!d) {
                            var _ = w(o)
                            if (((_ = O(_)), (_ = this.getResolvedLink(_)) && _.getNode().isDirectory())) throw l("EISDIR", "open", _.getPath())
                            o = this.openSync(o, f)
                        }
                        try {
                            var N = Bt(this.getFileByFdOrThrow(o).getBuffer(), h)
                        } finally {
                            d || this.closeSync(o)
                        }
                        return N
                    }),
                    (c.prototype.readFileSync = function (o, f) {
                        f = xo(f)
                        var h = g(f.flag)
                        return this.readFileBase(o, h, f.encoding)
                    }),
                    (c.prototype.readFile = function (o, f, h) {
                        ;(h = v(xo)(f, h)), (f = h[0]), (h = h[1])
                        var d = g(f.flag)
                        this.wrapAsync(this.readFileBase, [o, d, f.encoding], h)
                    }),
                    (c.prototype.writeBase = function (o, f, h, d, _) {
                        return this.getFileByFdOrThrow(o, "write").write(f, h, d, _)
                    }),
                    (c.prototype.writeSync = function (o, f, h, d, _) {
                        qt(o)
                        var N = typeof f != "string"
                        if (N) {
                            var K = (h || 0) | 0,
                                ht = d
                            h = _
                        } else var Kt = d
                        return (f = Tt(f, Kt)), N ? typeof ht > "u" && (ht = f.length) : ((K = 0), (ht = f.length)), this.writeBase(o, f, K, ht, h)
                    }),
                    (c.prototype.write = function (o, f, h, d, _, N) {
                        var K = this
                        qt(o)
                        var ht = typeof f,
                            Kt = typeof h,
                            Xo = typeof d,
                            Jo = typeof _
                        if (ht !== "string")
                            if (Kt === "function") var he = h
                            else if (Xo === "function") {
                                var Sr = h | 0
                                he = d
                            } else if (Jo === "function") {
                                Sr = h | 0
                                var ze = d
                                he = _
                            } else {
                                ;(Sr = h | 0), (ze = d)
                                var Nn = _
                                he = N
                            }
                        else if (Kt === "function") he = h
                        else if (Xo === "function") (Nn = h), (he = d)
                        else if (Jo === "function") {
                            Nn = h
                            var bu = d
                            he = _
                        }
                        var Rr = Tt(f, bu)
                        ht !== "string" ? typeof ze > "u" && (ze = Rr.length) : ((Sr = 0), (ze = Rr.length))
                        var kn = y(he)
                        Oe.default(function () {
                            try {
                                var Zo = K.writeBase(o, Rr, Sr, ze, Nn)
                                ht !== "string" ? kn(null, Zo, Rr) : kn(null, Zo, f)
                            } catch (tf) {
                                kn(tf)
                            }
                        })
                    }),
                    (c.prototype.writeFileBase = function (o, f, h, d) {
                        var _ = typeof o == "number"
                        ;(o = _ ? o : this.openBase(w(o), h, d)), (d = 0)
                        var N = f.length
                        h = h & Ge ? void 0 : 0
                        try {
                            for (; 0 < N; ) {
                                var K = this.writeSync(o, f, d, N, h)
                                ;(d += K), (N -= K), h !== void 0 && (h += K)
                            }
                        } finally {
                            _ || this.closeSync(o)
                        }
                    }),
                    (c.prototype.writeFileSync = function (o, f, h) {
                        var d = Yo(h)
                        h = g(d.flag)
                        var _ = rt(d.mode)
                        ;(f = Tt(f, d.encoding)), this.writeFileBase(o, f, h, _)
                    }),
                    (c.prototype.writeFile = function (o, f, h, d) {
                        var _ = h
                        typeof h == "function" && ((_ = jo), (d = h)), (h = y(d))
                        var N = Yo(_)
                        ;(_ = g(N.flag)), (d = rt(N.mode)), (f = Tt(f, N.encoding)), this.wrapAsync(this.writeFileBase, [o, f, _, d], h)
                    }),
                    (c.prototype.linkBase = function (o, f) {
                        var h = O(o),
                            d = this.getLink(h)
                        if (!d) throw l("ENOENT", "link", o, f)
                        var _ = O(f)
                        if (((h = this.getLinkParent(_)), !h)) throw l("ENOENT", "link", o, f)
                        if (((_ = _[_.length - 1]), h.getChild(_))) throw l("EEXIST", "link", o, f)
                        ;(o = d.getNode()), o.nlink++, h.createChild(_, o)
                    }),
                    (c.prototype.copyFileBase = function (o, f, h) {
                        var d = this.readFileSync(o)
                        if (h & Vu && this.existsSync(f)) throw l("EEXIST", "copyFile", o, f)
                        if (h & qu) throw l("ENOSYS", "copyFile", o, f)
                        this.writeFileBase(f, d, fe.w, 438)
                    }),
                    (c.prototype.copyFileSync = function (o, f, h) {
                        return (o = w(o)), (f = w(f)), this.copyFileBase(o, f, (h || 0) | 0)
                    }),
                    (c.prototype.copyFile = function (o, f, h, d) {
                        if (((o = w(o)), (f = w(f)), typeof h == "function")) var _ = 0
                        else (_ = h), (h = d)
                        y(h), this.wrapAsync(this.copyFileBase, [o, f, _], h)
                    }),
                    (c.prototype.linkSync = function (o, f) {
                        ;(o = w(o)), (f = w(f)), this.linkBase(o, f)
                    }),
                    (c.prototype.link = function (o, f, h) {
                        ;(o = w(o)), (f = w(f)), this.wrapAsync(this.linkBase, [o, f], h)
                    }),
                    (c.prototype.unlinkBase = function (o) {
                        var f = O(o)
                        if (((f = this.getLink(f)), !f)) throw l("ENOENT", "unlink", o)
                        if (f.length) throw Error("Dir not empty...")
                        this.deleteLink(f), (o = f.getNode()), o.nlink--, 0 >= o.nlink && this.deleteNode(o)
                    }),
                    (c.prototype.unlinkSync = function (o) {
                        ;(o = w(o)), this.unlinkBase(o)
                    }),
                    (c.prototype.unlink = function (o, f) {
                        ;(o = w(o)), this.wrapAsync(this.unlinkBase, [o], f)
                    }),
                    (c.prototype.symlinkBase = function (o, f) {
                        var h = O(f),
                            d = this.getLinkParent(h)
                        if (!d) throw l("ENOENT", "symlink", o, f)
                        if (((h = h[h.length - 1]), d.getChild(h))) throw l("EEXIST", "symlink", o, f)
                        return (f = d.createChild(h)), f.getNode().makeSymlink(O(o)), f
                    }),
                    (c.prototype.symlinkSync = function (o, f) {
                        ;(o = w(o)), (f = w(f)), this.symlinkBase(o, f)
                    }),
                    (c.prototype.symlink = function (o, f, h, d) {
                        ;(h = y(typeof h == "function" ? h : d)), (o = w(o)), (f = w(f)), this.wrapAsync(this.symlinkBase, [o, f], h)
                    }),
                    (c.prototype.realpathBase = function (o, f) {
                        var h = O(o)
                        if (((h = this.getResolvedLink(h)), !h)) throw l("ENOENT", "realpath", o)
                        return pt.strToEncoding(h.getPath(), f)
                    }),
                    (c.prototype.realpathSync = function (o, f) {
                        return this.realpathBase(w(o), Go(f).encoding)
                    }),
                    (c.prototype.realpath = function (o, f, h) {
                        ;(h = Hu(f, h)), (f = h[0]), (h = h[1]), (o = w(o)), this.wrapAsync(this.realpathBase, [o, f.encoding], h)
                    }),
                    (c.prototype.lstatBase = function (o, f) {
                        f === void 0 && (f = !1)
                        var h = this.getLink(O(o))
                        if (!h) throw l("ENOENT", "lstat", o)
                        return ve.default.build(h.getNode(), f)
                    }),
                    (c.prototype.lstatSync = function (o, f) {
                        return this.lstatBase(w(o), i(f).bigint)
                    }),
                    (c.prototype.lstat = function (o, f, h) {
                        ;(h = n(f, h)), (f = h[0]), (h = h[1]), this.wrapAsync(this.lstatBase, [w(o), f.bigint], h)
                    }),
                    (c.prototype.statBase = function (o, f) {
                        f === void 0 && (f = !1)
                        var h = this.getResolvedLink(O(o))
                        if (!h) throw l("ENOENT", "stat", o)
                        return ve.default.build(h.getNode(), f)
                    }),
                    (c.prototype.statSync = function (o, f) {
                        return this.statBase(w(o), i(f).bigint)
                    }),
                    (c.prototype.stat = function (o, f, h) {
                        ;(h = n(f, h)), (f = h[0]), (h = h[1]), this.wrapAsync(this.statBase, [w(o), f.bigint], h)
                    }),
                    (c.prototype.fstatBase = function (o, f) {
                        if ((f === void 0 && (f = !1), (o = this.getFileByFd(o)), !o)) throw l("EBADF", "fstat")
                        return ve.default.build(o.node, f)
                    }),
                    (c.prototype.fstatSync = function (o, f) {
                        return this.fstatBase(o, i(f).bigint)
                    }),
                    (c.prototype.fstat = function (o, f, h) {
                        ;(f = n(f, h)), this.wrapAsync(this.fstatBase, [o, f[0].bigint], f[1])
                    }),
                    (c.prototype.renameBase = function (o, f) {
                        var h = this.getLink(O(o))
                        if (!h) throw l("ENOENT", "rename", o, f)
                        var d = O(f),
                            _ = this.getLinkParent(d)
                        if (!_) throw l("ENOENT", "rename", o, f)
                        ;(o = h.parent) && o.deleteChild(h), (h.steps = B(_.steps, [d[d.length - 1]])), _.setChild(h.getName(), h)
                    }),
                    (c.prototype.renameSync = function (o, f) {
                        ;(o = w(o)), (f = w(f)), this.renameBase(o, f)
                    }),
                    (c.prototype.rename = function (o, f, h) {
                        ;(o = w(o)), (f = w(f)), this.wrapAsync(this.renameBase, [o, f], h)
                    }),
                    (c.prototype.existsBase = function (o) {
                        return !!this.statBase(o)
                    }),
                    (c.prototype.existsSync = function (o) {
                        try {
                            return this.existsBase(w(o))
                        } catch {
                            return !1
                        }
                    }),
                    (c.prototype.exists = function (o, f) {
                        var h = this,
                            d = w(o)
                        if (typeof f != "function") throw Error(Ft.CB)
                        Oe.default(function () {
                            try {
                                f(h.existsBase(d))
                            } catch {
                                f(!1)
                            }
                        })
                    }),
                    (c.prototype.accessBase = function (o) {
                        this.getLinkOrThrow(o, "access")
                    }),
                    (c.prototype.accessSync = function (o, f) {
                        f === void 0 && (f = Uo), (o = w(o)), this.accessBase(o, f | 0)
                    }),
                    (c.prototype.access = function (o, f, h) {
                        var d = Uo
                        typeof f != "function" && ((d = f | 0), (f = y(h))), (o = w(o)), this.wrapAsync(this.accessBase, [o, d], f)
                    }),
                    (c.prototype.appendFileSync = function (o, f, h) {
                        h === void 0 && (h = $o), (h = Wo(h)), (h.flag && o >>> 0 !== o) || (h.flag = "a"), this.writeFileSync(o, f, h)
                    }),
                    (c.prototype.appendFile = function (o, f, h, d) {
                        ;(d = Ku(h, d)), (h = d[0]), (d = d[1]), (h.flag && o >>> 0 !== o) || (h.flag = "a"), this.writeFile(o, f, h, d)
                    }),
                    (c.prototype.readdirBase = function (o, f) {
                        var h = O(o)
                        if (((h = this.getResolvedLink(h)), !h)) throw l("ENOENT", "readdir", o)
                        if (!h.getNode().isDirectory()) throw l("ENOTDIR", "scandir", o)
                        if (f.withFileTypes) {
                            var d = []
                            for (_ in h.children) (o = h.getChild(_)) && d.push(ln.default.build(o, f.encoding))
                            return (
                                In ||
                                    f.encoding === "buffer" ||
                                    d.sort(function (N, K) {
                                        return N.name < K.name ? -1 : N.name > K.name ? 1 : 0
                                    }),
                                d
                            )
                        }
                        var _ = []
                        for (d in h.children) _.push(pt.strToEncoding(d, f.encoding))
                        return In || f.encoding === "buffer" || _.sort(), _
                    }),
                    (c.prototype.readdirSync = function (o, f) {
                        return (f = qo(f)), (o = w(o)), this.readdirBase(o, f)
                    }),
                    (c.prototype.readdir = function (o, f, h) {
                        ;(h = Xu(f, h)), (f = h[0]), (h = h[1]), (o = w(o)), this.wrapAsync(this.readdirBase, [o, f], h)
                    }),
                    (c.prototype.readlinkBase = function (o, f) {
                        var h = this.getLinkOrThrow(o, "readlink").getNode()
                        if (!h.isSymlink()) throw l("EINVAL", "readlink", o)
                        return (o = dt + h.symlink.join(dt)), pt.strToEncoding(o, f)
                    }),
                    (c.prototype.readlinkSync = function (o, f) {
                        return (f = _r(f)), (o = w(o)), this.readlinkBase(o, f.encoding)
                    }),
                    (c.prototype.readlink = function (o, f, h) {
                        ;(h = Mo(f, h)), (f = h[0]), (h = h[1]), (o = w(o)), this.wrapAsync(this.readlinkBase, [o, f.encoding], h)
                    }),
                    (c.prototype.fsyncBase = function (o) {
                        this.getFileByFdOrThrow(o, "fsync")
                    }),
                    (c.prototype.fsyncSync = function (o) {
                        this.fsyncBase(o)
                    }),
                    (c.prototype.fsync = function (o, f) {
                        this.wrapAsync(this.fsyncBase, [o], f)
                    }),
                    (c.prototype.fdatasyncBase = function (o) {
                        this.getFileByFdOrThrow(o, "fdatasync")
                    }),
                    (c.prototype.fdatasyncSync = function (o) {
                        this.fdatasyncBase(o)
                    }),
                    (c.prototype.fdatasync = function (o, f) {
                        this.wrapAsync(this.fdatasyncBase, [o], f)
                    }),
                    (c.prototype.ftruncateBase = function (o, f) {
                        this.getFileByFdOrThrow(o, "ftruncate").truncate(f)
                    }),
                    (c.prototype.ftruncateSync = function (o, f) {
                        this.ftruncateBase(o, f)
                    }),
                    (c.prototype.ftruncate = function (o, f, h) {
                        var d = typeof f == "number" ? f : 0
                        ;(f = y(typeof f == "number" ? h : f)), this.wrapAsync(this.ftruncateBase, [o, d], f)
                    }),
                    (c.prototype.truncateBase = function (o, f) {
                        o = this.openSync(o, "r+")
                        try {
                            this.ftruncateSync(o, f)
                        } finally {
                            this.closeSync(o)
                        }
                    }),
                    (c.prototype.truncateSync = function (o, f) {
                        if (o >>> 0 === o) return this.ftruncateSync(o, f)
                        this.truncateBase(o, f)
                    }),
                    (c.prototype.truncate = function (o, f, h) {
                        var d = typeof f == "number" ? f : 0
                        if (((f = y(typeof f == "number" ? h : f)), o >>> 0 === o)) return this.ftruncate(o, d, f)
                        this.wrapAsync(this.truncateBase, [o, d], f)
                    }),
                    (c.prototype.futimesBase = function (o, f, h) {
                        ;(o = this.getFileByFdOrThrow(o, "futimes").node), (o.atime = new Date(1e3 * f)), (o.mtime = new Date(1e3 * h))
                    }),
                    (c.prototype.futimesSync = function (o, f, h) {
                        this.futimesBase(o, gt(f), gt(h))
                    }),
                    (c.prototype.futimes = function (o, f, h, d) {
                        this.wrapAsync(this.futimesBase, [o, gt(f), gt(h)], d)
                    }),
                    (c.prototype.utimesBase = function (o, f, h) {
                        o = this.openSync(o, "r+")
                        try {
                            this.futimesBase(o, f, h)
                        } finally {
                            this.closeSync(o)
                        }
                    }),
                    (c.prototype.utimesSync = function (o, f, h) {
                        this.utimesBase(w(o), gt(f), gt(h))
                    }),
                    (c.prototype.utimes = function (o, f, h, d) {
                        this.wrapAsync(this.utimesBase, [w(o), gt(f), gt(h)], d)
                    }),
                    (c.prototype.mkdirBase = function (o, f) {
                        var h = O(o)
                        if (!h.length) throw l("EISDIR", "mkdir", o)
                        var d = this.getLinkParentAsDirOrThrow(o, "mkdir")
                        if (((h = h[h.length - 1]), d.getChild(h))) throw l("EEXIST", "mkdir", o)
                        d.createChild(h, this.createNode(!0, f))
                    }),
                    (c.prototype.mkdirpBase = function (o, f) {
                        o = O(o)
                        for (var h = this.root, d = 0; d < o.length; d++) {
                            var _ = o[d]
                            if (!h.getNode().isDirectory()) throw l("ENOTDIR", "mkdir", h.getPath())
                            var N = h.getChild(_)
                            if (N)
                                if (N.getNode().isDirectory()) h = N
                                else throw l("ENOTDIR", "mkdir", N.getPath())
                            else h = h.createChild(_, this.createNode(!0, f))
                        }
                    }),
                    (c.prototype.mkdirSync = function (o, f) {
                        f = s(f)
                        var h = rt(f.mode, 511)
                        ;(o = w(o)), f.recursive ? this.mkdirpBase(o, h) : this.mkdirBase(o, h)
                    }),
                    (c.prototype.mkdir = function (o, f, h) {
                        var d = s(f)
                        ;(f = y(typeof f == "function" ? f : h)), (h = rt(d.mode, 511)), (o = w(o)), d.recursive ? this.wrapAsync(this.mkdirpBase, [o, h], f) : this.wrapAsync(this.mkdirBase, [o, h], f)
                    }),
                    (c.prototype.mkdirpSync = function (o, f) {
                        this.mkdirSync(o, { mode: f, recursive: !0 })
                    }),
                    (c.prototype.mkdirp = function (o, f, h) {
                        var d = typeof f == "function" ? void 0 : f
                        ;(f = y(typeof f == "function" ? f : h)), this.mkdir(o, { mode: d, recursive: !0 }, f)
                    }),
                    (c.prototype.mkdtempBase = function (o, f, h) {
                        h === void 0 && (h = 5)
                        var d = o + this.genRndStr()
                        try {
                            return this.mkdirBase(d, 511), pt.strToEncoding(d, f)
                        } catch (_) {
                            if (_.code === "EEXIST") {
                                if (1 < h) return this.mkdtempBase(o, f, h - 1)
                                throw Error("Could not create temp dir.")
                            }
                            throw _
                        }
                    }),
                    (c.prototype.mkdtempSync = function (o, f) {
                        if (((f = _r(f).encoding), !o || typeof o != "string")) throw new TypeError("filename prefix is required")
                        return ue(o), this.mkdtempBase(o, f)
                    }),
                    (c.prototype.mkdtemp = function (o, f, h) {
                        if (((h = Mo(f, h)), (f = h[0].encoding), (h = h[1]), !o || typeof o != "string")) throw new TypeError("filename prefix is required")
                        ue(o) && this.wrapAsync(this.mkdtempBase, [o, f], h)
                    }),
                    (c.prototype.rmdirBase = function (o, f) {
                        f = P({}, Vo, f)
                        var h = this.getLinkAsDirOrThrow(o, "rmdir")
                        if (h.length && !f.recursive) throw l("ENOTEMPTY", "rmdir", o)
                        this.deleteLink(h)
                    }),
                    (c.prototype.rmdirSync = function (o, f) {
                        this.rmdirBase(w(o), f)
                    }),
                    (c.prototype.rmdir = function (o, f, h) {
                        var d = P({}, Vo, f)
                        ;(f = y(typeof f == "function" ? f : h)), this.wrapAsync(this.rmdirBase, [w(o), d], f)
                    }),
                    (c.prototype.fchmodBase = function (o, f) {
                        this.getFileByFdOrThrow(o, "fchmod").chmod(f)
                    }),
                    (c.prototype.fchmodSync = function (o, f) {
                        this.fchmodBase(o, rt(f))
                    }),
                    (c.prototype.fchmod = function (o, f, h) {
                        this.wrapAsync(this.fchmodBase, [o, rt(f)], h)
                    }),
                    (c.prototype.chmodBase = function (o, f) {
                        o = this.openSync(o, "r+")
                        try {
                            this.fchmodBase(o, f)
                        } finally {
                            this.closeSync(o)
                        }
                    }),
                    (c.prototype.chmodSync = function (o, f) {
                        ;(f = rt(f)), (o = w(o)), this.chmodBase(o, f)
                    }),
                    (c.prototype.chmod = function (o, f, h) {
                        ;(f = rt(f)), (o = w(o)), this.wrapAsync(this.chmodBase, [o, f], h)
                    }),
                    (c.prototype.lchmodBase = function (o, f) {
                        o = this.openBase(o, X, 0, !1)
                        try {
                            this.fchmodBase(o, f)
                        } finally {
                            this.closeSync(o)
                        }
                    }),
                    (c.prototype.lchmodSync = function (o, f) {
                        ;(f = rt(f)), (o = w(o)), this.lchmodBase(o, f)
                    }),
                    (c.prototype.lchmod = function (o, f, h) {
                        ;(f = rt(f)), (o = w(o)), this.wrapAsync(this.lchmodBase, [o, f], h)
                    }),
                    (c.prototype.fchownBase = function (o, f, h) {
                        this.getFileByFdOrThrow(o, "fchown").chown(f, h)
                    }),
                    (c.prototype.fchownSync = function (o, f, h) {
                        m(f), E(h), this.fchownBase(o, f, h)
                    }),
                    (c.prototype.fchown = function (o, f, h, d) {
                        m(f), E(h), this.wrapAsync(this.fchownBase, [o, f, h], d)
                    }),
                    (c.prototype.chownBase = function (o, f, h) {
                        this.getResolvedLinkOrThrow(o, "chown").getNode().chown(f, h)
                    }),
                    (c.prototype.chownSync = function (o, f, h) {
                        m(f), E(h), this.chownBase(w(o), f, h)
                    }),
                    (c.prototype.chown = function (o, f, h, d) {
                        m(f), E(h), this.wrapAsync(this.chownBase, [w(o), f, h], d)
                    }),
                    (c.prototype.lchownBase = function (o, f, h) {
                        this.getLinkOrThrow(o, "lchown").getNode().chown(f, h)
                    }),
                    (c.prototype.lchownSync = function (o, f, h) {
                        m(f), E(h), this.lchownBase(w(o), f, h)
                    }),
                    (c.prototype.lchown = function (o, f, h, d) {
                        m(f), E(h), this.wrapAsync(this.lchownBase, [w(o), f, h], d)
                    }),
                    (c.prototype.watchFile = function (o, f, h) {
                        o = w(o)
                        var d = f
                        if ((typeof d == "function" && ((h = f), (d = null)), typeof h != "function")) throw Error('"watchFile()" requires a listener function')
                        f = 5007
                        var _ = !0
                        return d && typeof d == "object" && (typeof d.interval == "number" && (f = d.interval), typeof d.persistent == "boolean" && (_ = d.persistent)), (d = this.statWatchers[o]), d || ((d = new this.StatWatcher()), d.start(o, _, f), (this.statWatchers[o] = d)), d.addListener("change", h), d
                    }),
                    (c.prototype.unwatchFile = function (o, f) {
                        o = w(o)
                        var h = this.statWatchers[o]
                        h && (typeof f == "function" ? h.removeListener("change", f) : h.removeAllListeners("change"), h.listenerCount("change") === 0 && (h.stop(), delete this.statWatchers[o]))
                    }),
                    (c.prototype.createReadStream = function (o, f) {
                        return new this.ReadStream(o, f)
                    }),
                    (c.prototype.createWriteStream = function (o, f) {
                        return new this.WriteStream(o, f)
                    }),
                    (c.prototype.watch = function (o, f, h) {
                        o = w(o)
                        var d = f
                        typeof f == "function" && ((h = f), (d = null))
                        var _ = _r(d)
                        ;(f = _.persistent), (d = _.recursive), (_ = _.encoding), f === void 0 && (f = !0), d === void 0 && (d = !1)
                        var N = new this.FSWatcher()
                        return N.start(o, f, d, _), h && N.addListener("change", h), N
                    }),
                    (c.fd = 2147483647),
                    c
                )
            })()),
            (e.Volume = t)
        var Ko = (function (c) {
            function o(f) {
                var h = c.call(this) || this
                return (
                    (h.onInterval = function () {
                        try {
                            var d = h.vol.statSync(h.filename)
                            h.hasChanged(d) && (h.emit("change", d, h.prev), (h.prev = d))
                        } finally {
                            h.loop()
                        }
                    }),
                    (h.vol = f),
                    h
                )
            }
            return (
                C(o, c),
                (o.prototype.loop = function () {
                    this.timeoutRef = this.setTimeout(this.onInterval, this.interval)
                }),
                (o.prototype.hasChanged = function (f) {
                    return f.mtimeMs > this.prev.mtimeMs || f.nlink !== this.prev.nlink
                }),
                (o.prototype.start = function (f, h, d) {
                    h === void 0 && (h = !0), d === void 0 && (d = 5007), (this.filename = w(f)), (this.setTimeout = h ? setTimeout : io.default), (this.interval = d), (this.prev = this.vol.statSync(this.filename)), this.loop()
                }),
                (o.prototype.stop = function () {
                    clearTimeout(this.timeoutRef), st.default.nextTick(A, this)
                }),
                o
            )
        })(U.EventEmitter)
        e.StatWatcher = Ko
        var yt
        Ue.inherits(I, ft.Readable),
            (e.ReadStream = I),
            (I.prototype.open = function () {
                var c = this
                this._vol.open(this.path, this.flags, this.mode, function (o, f) {
                    o ? (c.autoClose && c.destroy && c.destroy(), c.emit("error", o)) : ((c.fd = f), c.emit("open", f), c.read())
                })
            }),
            (I.prototype._read = function (c) {
                if (typeof this.fd != "number")
                    return this.once("open", function () {
                        this._read(c)
                    })
                if (!this.destroyed) {
                    ;(!yt || 128 > yt.length - yt.used) && ((yt = G.bufferAllocUnsafe(this._readableState.highWaterMark)), (yt.used = 0))
                    var o = yt,
                        f = Math.min(yt.length - yt.used, c),
                        h = yt.used
                    if ((this.pos !== void 0 && (f = Math.min(this.end - this.pos + 1, f)), 0 >= f)) return this.push(null)
                    var d = this
                    this._vol.read(this.fd, yt, yt.used, f, this.pos, function (_, N) {
                        _ ? (d.autoClose && d.destroy && d.destroy(), d.emit("error", _)) : ((_ = null), 0 < N && ((d.bytesRead += N), (_ = o.slice(h, h + N))), d.push(_))
                    }),
                        this.pos !== void 0 && (this.pos += f),
                        (yt.used += f)
                }
            }),
            (I.prototype._destroy = function (c, o) {
                this.close(function (f) {
                    o(c || f)
                })
            }),
            (I.prototype.close = function (c) {
                var o = this
                if ((c && this.once("close", c), this.closed || typeof this.fd != "number")) {
                    if (typeof this.fd != "number") {
                        this.once("open", k)
                        return
                    }
                    return st.default.nextTick(function () {
                        return o.emit("close")
                    })
                }
                ;(this.closed = !0),
                    this._vol.close(this.fd, function (f) {
                        f ? o.emit("error", f) : o.emit("close")
                    }),
                    (this.fd = null)
            }),
            Ue.inherits(L, ft.Writable),
            (e.WriteStream = L),
            (L.prototype.open = function () {
                this._vol.open(
                    this.path,
                    this.flags,
                    this.mode,
                    function (c, o) {
                        c ? (this.autoClose && this.destroy && this.destroy(), this.emit("error", c)) : ((this.fd = o), this.emit("open", o))
                    }.bind(this)
                )
            }),
            (L.prototype._write = function (c, o, f) {
                if (!(c instanceof G.Buffer)) return this.emit("error", Error("Invalid data"))
                if (typeof this.fd != "number")
                    return this.once("open", function () {
                        this._write(c, o, f)
                    })
                var h = this
                this._vol.write(this.fd, c, 0, c.length, this.pos, function (d, _) {
                    if (d) return h.autoClose && h.destroy && h.destroy(), f(d)
                    ;(h.bytesWritten += _), f()
                }),
                    this.pos !== void 0 && (this.pos += c.length)
            }),
            (L.prototype._writev = function (c, o) {
                if (typeof this.fd != "number")
                    return this.once("open", function () {
                        this._writev(c, o)
                    })
                for (var f = this, h = c.length, d = Array(h), _ = 0, N = 0; N < h; N++) {
                    var K = c[N].chunk
                    ;(d[N] = K), (_ += K.length)
                }
                ;(h = G.Buffer.concat(d)),
                    this._vol.write(this.fd, h, 0, h.length, this.pos, function (ht, Kt) {
                        if (ht) return f.destroy && f.destroy(), o(ht)
                        ;(f.bytesWritten += Kt), o()
                    }),
                    this.pos !== void 0 && (this.pos += _)
            }),
            (L.prototype._destroy = I.prototype._destroy),
            (L.prototype.close = I.prototype.close),
            (L.prototype.destroySoon = L.prototype.end)
        var Ho = (function (c) {
            function o(f) {
                var h = c.call(this) || this
                return (
                    (h._filename = ""),
                    (h._filenameEncoded = ""),
                    (h._recursive = !1),
                    (h._encoding = pt.ENCODING_UTF8),
                    (h._onNodeChange = function () {
                        h._emit("change")
                    }),
                    (h._onParentChild = function (d) {
                        d.getName() === h._getName() && h._emit("rename")
                    }),
                    (h._emit = function (d) {
                        h.emit("change", d, h._filenameEncoded)
                    }),
                    (h._persist = function () {
                        h._timer = setTimeout(h._persist, 1e6)
                    }),
                    (h._vol = f),
                    h
                )
            }
            return (
                C(o, c),
                (o.prototype._getName = function () {
                    return this._steps[this._steps.length - 1]
                }),
                (o.prototype.start = function (f, h, d, _) {
                    h === void 0 && (h = !0), d === void 0 && (d = !1), _ === void 0 && (_ = pt.ENCODING_UTF8), (this._filename = w(f)), (this._steps = O(this._filename)), (this._filenameEncoded = pt.strToEncoding(this._filename)), (this._recursive = d), (this._encoding = _)
                    try {
                        this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher")
                    } catch (N) {
                        throw ((h = Error("watch " + this._filename + " " + N.code)), (h.code = N.code), (h.errno = N.code), h)
                    }
                    this._link.getNode().on("change", this._onNodeChange), this._link.on("child:add", this._onNodeChange), this._link.on("child:delete", this._onNodeChange), (f = this._link.parent) && (f.setMaxListeners(f.getMaxListeners() + 1), f.on("child:delete", this._onParentChild)), h && this._persist()
                }),
                (o.prototype.close = function () {
                    clearTimeout(this._timer), this._link.getNode().removeListener("change", this._onNodeChange)
                    var f = this._link.parent
                    f && f.removeListener("child:delete", this._onParentChild)
                }),
                o
            )
        })(U.EventEmitter)
        e.FSWatcher = Ho
    })
    et(se)
    var Yu = se.pathToFilename,
        $u = se.filenameToSteps,
        Po = se.Volume,
        Tn = b(function (t, e) {
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.fsProps = "constants F_OK R_OK W_OK X_OK Stats".split(" ")), (e.fsSyncMethods = "renameSync ftruncateSync truncateSync chownSync fchownSync lchownSync chmodSync fchmodSync lchmodSync statSync lstatSync fstatSync linkSync symlinkSync readlinkSync realpathSync unlinkSync rmdirSync mkdirSync mkdirpSync readdirSync closeSync openSync utimesSync futimesSync fsyncSync writeSync readSync readFileSync writeFileSync appendFileSync existsSync accessSync fdatasyncSync mkdtempSync copyFileSync createReadStream createWriteStream".split(" ")), (e.fsAsyncMethods = "rename ftruncate truncate chown fchown lchown chmod fchmod lchmod stat lstat fstat link symlink readlink realpath unlink rmdir mkdir mkdirp readdir close open utimes futimes fsync write read readFile writeFile appendFile exists access fdatasync mkdtemp copyFile watchFile unwatchFile watch".split(" "))
        })
    et(Tn)
    var Co = b(function (t, e) {
        function r(a) {
            for (var y = { F_OK: u, R_OK: l, W_OK: g, X_OK: p, constants: F.constants, Stats: ve.default, Dirent: ln.default }, v = 0, w = i; v < w.length; v++) {
                var O = w[v]
                typeof a[O] == "function" && (y[O] = a[O].bind(a))
            }
            for (v = 0, w = s; v < w.length; v++) (O = w[v]), typeof a[O] == "function" && (y[O] = a[O].bind(a))
            return (y.StatWatcher = a.StatWatcher), (y.FSWatcher = a.FSWatcher), (y.WriteStream = a.WriteStream), (y.ReadStream = a.ReadStream), (y.promises = a.promises), (y._toUnixTimestamp = se.toUnixTimestamp), y
        }
        var n =
            (H && H.__assign) ||
            function () {
                return (
                    (n =
                        Object.assign ||
                        function (a) {
                            for (var y, v = 1, w = arguments.length; v < w; v++) {
                                y = arguments[v]
                                for (var O in y) Object.prototype.hasOwnProperty.call(y, O) && (a[O] = y[O])
                            }
                            return a
                        }),
                    n.apply(this, arguments)
                )
            }
        Object.defineProperty(e, "__esModule", { value: !0 })
        var i = Tn.fsSyncMethods,
            s = Tn.fsAsyncMethods,
            u = F.constants.F_OK,
            l = F.constants.R_OK,
            g = F.constants.W_OK,
            p = F.constants.X_OK
        ;(e.Volume = se.Volume), (e.vol = new se.Volume()), (e.createFsFromVolume = r), (e.fs = r(e.vol)), (t.exports = n(n({}, t.exports), e.fs)), (t.exports.semantic = !0)
    })
    et(Co)
    var Bo = Co.createFsFromVolume
    iu.prototype.emit = function (t) {
        for (var e, r, n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i]
        i = this.listeners(t)
        try {
            for (var s = Kr(i), u = s.next(); !u.done; u = s.next()) {
                var l = u.value
                try {
                    l.apply(void 0, ks(n))
                } catch (g) {
                    console.error(g)
                }
            }
        } catch (g) {
            e = { error: g }
        } finally {
            try {
                u && !u.done && (r = s.return) && r.call(s)
            } finally {
                if (e) throw e.error
            }
        }
        return 0 < i.length
    }
    var Wu = (function () {
        function t() {
            ;(this.volume = new Po()), (this.fs = Bo(this.volume)), this.fromJSON({ "/dev/stdin": "", "/dev/stdout": "", "/dev/stderr": "" })
        }
        return (
            (t.prototype._toJSON = function (e, r, n) {
                r === void 0 && (r = {})
                var i = !0,
                    s
                for (s in e.children) {
                    i = !1
                    var u = e.getChild(s)
                    if (u) {
                        var l = u.getNode()
                        l && l.isFile() ? ((u = u.getPath()), n && (u = an(n, u)), (r[u] = l.getBuffer())) : l && l.isDirectory() && this._toJSON(u, r, n)
                    }
                }
                return (e = e.getPath()), n && (e = an(n, e)), e && i && (r[e] = null), r
            }),
            (t.prototype.toJSON = function (e, r, n) {
                var i, s
                r === void 0 && (r = {}), n === void 0 && (n = !1)
                var u = []
                if (e) {
                    e instanceof Array || (e = [e])
                    try {
                        for (var l = Kr(e), g = l.next(); !g.done; g = l.next()) {
                            var p = Yu(g.value),
                                a = this.volume.getResolvedLink(p)
                            a && u.push(a)
                        }
                    } catch ($) {
                        var y = { error: $ }
                    } finally {
                        try {
                            g && !g.done && (i = l.return) && i.call(l)
                        } finally {
                            if (y) throw y.error
                        }
                    }
                } else u.push(this.volume.root)
                if (!u.length) return r
                try {
                    for (var v = Kr(u), w = v.next(); !w.done; w = v.next()) (a = w.value), this._toJSON(a, r, n ? a.getPath() : "")
                } catch ($) {
                    var O = { error: $ }
                } finally {
                    try {
                        w && !w.done && (s = v.return) && s.call(v)
                    } finally {
                        if (O) throw O.error
                    }
                }
                return r
            }),
            (t.prototype.fromJSONFixed = function (e, r) {
                for (var n in r) {
                    var i = r[n]
                    if (i ? Object.getPrototypeOf(i) !== null : i !== null) {
                        var s = $u(n)
                        1 < s.length && ((s = "/" + s.slice(0, s.length - 1).join("/")), e.mkdirpBase(s, 511)), e.writeFileSync(n, i || "")
                    } else e.mkdirpBase(n, 511)
                }
            }),
            (t.prototype.fromJSON = function (e) {
                ;(this.volume = new Po()), this.fromJSONFixed(this.volume, e), (this.fs = Bo(this.volume)), (this.volume.releasedFds = [0, 1, 2]), (e = this.volume.openSync("/dev/stderr", "w"))
                var r = this.volume.openSync("/dev/stdout", "w"),
                    n = this.volume.openSync("/dev/stdin", "r")
                if (e !== 2) throw Error("invalid handle for stderr: " + e)
                if (r !== 1) throw Error("invalid handle for stdout: " + r)
                if (n !== 0) throw Error("invalid handle for stdin: " + n)
            }),
            (t.prototype.getStdOut = function () {
                return Ts(this, void 0, void 0, function () {
                    var e,
                        r = this
                    return Is(this, function () {
                        return (
                            (e = new Promise(function (n) {
                                n(r.fs.readFileSync("/dev/stdout", "utf8"))
                            })),
                            [2, e]
                        )
                    })
                })
            }),
            t
        )
    })()
    class Gu {
        constructor(e) {
            ;(this.self = e), (this.wasmFs = new Wu()), (this.curDir = "/")
            const r = this.wasmFs.fs.writeSync.bind(this.wasmFs.fs)
            ;(this.wasmFs.fs.writeSync = (n, i, s, u, l) => {
                switch (n) {
                    case 1:
                    case 2:
                        {
                            const g = typeof i == "string" ? i : new TextDecoder("utf-8").decode(i)
                            this.self.postMessage({ action: "consoleOut", text: g, isError: n === 2 })
                        }
                        break
                }
                return r(n, i, s, u, l)
            }),
                (this.self.onmessage = async (n) => {
                    const i = n.data
                    let s
                    try {
                        switch (i.action) {
                            case "writeFile":
                                this.writeFile(i.filePath, i.content)
                                break
                            case "readFile":
                                s = this.readFile(i.filePath)
                                break
                            case "unlink":
                                this.unlink(i.filePath)
                                break
                            case "chdir":
                                s = this.chdir(i.filePath)
                                break
                            case "mkdir":
                                this.mkdir(i.filePath, i.option)
                                break
                            case "readdir":
                                s = this.readdir(i.filePath)
                                break
                            case "runWasi":
                                s = await this.runWasi(i.filePath, i.args)
                                break
                            default:
                                throw `${i.action}: Not handled`
                        }
                        this.self.postMessage({ messageId: i.messageId, result: s })
                    } catch (u) {
                        if (u.stack) {
                            u = u.stack
                        } else {
                            u = u.toString()
                        }
                        this.self.postMessage({ messageId: i.messageId, error: u })
                    }
                })
        }
        writeFile(e, r) {
            this.wasmFs.fs.writeFileSync(e, r)
            console.debug(`finished writing ${e}`)
        }
        readFile(e) {
            const r = this.wasmFs.fs.readFileSync(e)
            if (r != null) return r
            throw `File not found: ${e}`
        }
        unlink(e) {
            this.wasmFs.fs.unlinkSync(e)
        }
        chdir(e) {
            return this.wasmFs.fs.statSync(e).isDirectory() ? ((this.curDir = e), !0) : !1
        }
        mkdir(e, r) {
            this.wasmFs.fs.mkdirSync(e, r)
        }
        readdir(e) {
            return this.wasmFs.fs.readdirSync(e)
        }
        async runWasi(e, r) {
            const n = new Os(this.wasmFs, r, this.curDir)
            let i = 0
            try {
                await n.runWasiEntry(e)
            } catch (s) {
                if (!(s instanceof fi)) throw s
                i = s.code
            }
            return i
        }
    }
    new Gu(self)
})()
