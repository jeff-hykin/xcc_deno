// main/js_box/deterministic_tooling/random_seed.js
var RandomSource = class {
  constructor(seed) {
    this.state = seed | 1;
  }
  next() {
    this.state ^= this.state << 13;
    this.state ^= this.state >> 17;
    this.state ^= this.state << 5;
    const nextU32_1 = this.state >>> 0;
    this.state ^= this.state << 13;
    this.state ^= this.state >> 17;
    this.state ^= this.state << 5;
    const nextU32_2 = this.state >>> 0;
    return nextU32_1 / 2 ** 32 + nextU32_2 / 2 ** 64;
  }
};

// main/js_box/deterministic_tooling/timing_tools.js
var realSetTimeout = globalThis.setTimeout;
var realDate = globalThis.Date;
function createTimingTools({ startTime = 0, setTimeoutIncrement = 1, performanceIncrement = 0.1, dateIncrement = 10, fetchIncrement = 10 } = {}) {
  const schedule = [];
  const internal = {
    time: 0,
    increment: setTimeoutIncrement,
    macroTaskIndex: 0
  };
  function runNextMacroTask() {
    if (schedule.length) {
      internal.time += internal.increment;
      const { 0: targetTime, 1: id, 2: callback, 3: args, 4: interval } = schedule.pop();
      if (targetTime > internal.time) {
        internal.time = targetTime + internal.increment;
      }
      if (interval != null) {
        scheduleTask(callback, interval, args, id);
      }
      callback(...args);
    }
  }
  function scheduleTask(callback, delay = 0, args, intervalId) {
    if (intervalId == null) {
      internal.time += internal.increment;
    }
    const targetTime = internal.time + delay;
    const id = intervalId || ++internal.macroTaskIndex;
    const interval = intervalId ? delay : null;
    if (schedule.length === 0) {
      schedule.push([targetTime, id, callback, args, interval]);
    } else {
      let index = -1;
      for (const { 0: eachTime } of schedule) {
        index++;
        if (targetTime >= eachTime) {
          break;
        }
      }
      schedule.splice(index, 0, [targetTime, id, callback, args, interval]);
    }
    realSetTimeout(runNextMacroTask, 0);
    return id;
  }
  function setTimeout(callback, delay = 0, ...args) {
    return scheduleTask(callback, delay, args, null);
  }
  function setInterval(callback, delay = 0, ...args) {
    internal.time += internal.increment;
    const setIntervalId = ++internal.macroTaskIndex;
    return scheduleTask(callback, delay, args, setIntervalId);
  }
  function clearTimeout(id) {
    let index = -1;
    for (const { 1: eachId, 4: interval } of schedule) {
      index++;
      if (eachId === id && interval == null) {
        schedule.splice(index, 1);
        return;
      }
    }
  }
  function clearInterval(id) {
    let index = -1;
    for (const { 1: eachId, 4: interval } of schedule) {
      index++;
      if (eachId === id && interval == null) {
        schedule.splice(index, 1);
        return;
      }
    }
  }
  let perfMarkNumber = 0;
  class PerformanceMark {
    // FIXME: I didn't check the spec for this, its just temp
    constructor(name2, entryType, startTime2, duration, detail) {
      this.name = name2;
      this.entryType = entryType;
      this.startTime = startTime2;
      this.duration = duration;
      this.detail = detail;
    }
  }
  class Performance {
    constructor() {
    }
    timeOrigin = startTime;
    clearMarks() {
      return;
    }
    clearMeasures() {
      return;
    }
    getEntries() {
      return [];
    }
    getEntriesByName() {
      return [];
    }
    getEntriesByType() {
      return [];
    }
    mark({
      markName,
      markOptions = {}
    } = {}) {
      return new PerformanceMark(String(markName) || `${++perfMarkNumber}`, "mark", this.now(), 0, markOptions.detail);
    }
    measure(...args) {
      return new PerformanceMark(String(args[0]), "measure", this.now(), 1, args[1]);
    }
    now() {
      internal.time += performanceIncrement;
      return internal.time + this.timeOrigin;
    }
    toJSON() {
      return { timeOrigin: this.timeOrigin };
    }
    [Symbol.toStringTag]() {
      return "Performance";
    }
    // Symbol(Deno.privateCustomInspect),
  }
  const performance = new Performance();
  class Date2 extends realDate {
    // FIXME: implement all of Date, especially get ride of timezone knowledge
    constructor(...args) {
      internal.time += dateIncrement;
      if (args.length === 0) {
        super(internal.time);
      } else {
        super(...args);
      }
    }
  }
  return { internal, globals: { setTimeout, setInterval, clearInterval, clearTimeout, Date: Date2, performance, Performance, PerformanceMark } };
}

// https://deno.land/x/good@1.13.0.1/flattened/typed_array__class.js
var TypedArray = typeof globalThis?.Uint8Array != "function" ? class {
} : Object.getPrototypeOf(Uint8Array.prototype).constructor;

// https://deno.land/x/good@1.13.0.1/flattened/all_keys.js
var allKeys = function(obj) {
  const listOfKeys = [];
  if (obj == null) {
    return [];
  }
  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }
  while (obj) {
    listOfKeys.push(Reflect.ownKeys(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return [...new Set(listOfKeys.flat(1))];
};

// https://deno.land/x/good@1.13.0.1/flattened/set_subtract.js
function setSubtract({ value, from }) {
  let source = from;
  let detractor = value;
  let sourceSize = source.size || source.length;
  if (!sourceSize) {
    source = new Set(source);
    sourceSize = source.size;
  }
  let detractorSize = detractor.size || detractor.length;
  if (!detractorSize) {
    detractor = new Set(detractor);
    detractorSize = detractor.size;
  }
  if (sourceSize < detractorSize) {
    const outputSet = /* @__PURE__ */ new Set();
    !(detractor instanceof Set) && (detractor = new Set(detractor));
    for (const each of source) {
      if (!detractor.has(each)) {
        outputSet.add(each);
      }
    }
    return outputSet;
  } else {
    !(source != from) && (source = new Set(source));
    for (const eachValueBeingRemoved of detractor) {
      source.delete(eachValueBeingRemoved);
    }
    return source;
  }
}

// https://deno.land/x/good@1.13.0.1/flattened/indent.js
var indent = ({ string, by = "    ", noLead = false }) => (noLead ? "" : by) + string.replace(/\n/g, "\n" + by);

// https://deno.land/x/good@1.13.0.1/flattened/typed_array_classes.js
var typedArrayClasses = [
  Uint16Array,
  Uint32Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Int32Array,
  Int8Array,
  Float32Array,
  Float64Array
];
if (globalThis.BigInt64Array) {
  typedArrayClasses.push(globalThis.BigInt64Array);
}
if (globalThis.BigUint64Array) {
  typedArrayClasses.push(globalThis.BigUint64Array);
}

// https://deno.land/x/good@1.13.0.1/flattened/is_valid_identifier.js
var regexIdentifier = /^(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*$/;
var regexIdentifierES5 = /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])(?:[\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])*$/;
var regexES6ReservedWord = /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|await|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;
function isValidIdentifier(value) {
  if (typeof value != "string") {
    return false;
  }
  const tmp = value.replace(/\\u([a-fA-F0-9]{4})|\\u\{([0-9a-fA-F]{1,})\}/g, function($0, $1, $2) {
    var codePoint = parseInt($2 || $1, 16);
    if (codePoint >= 55296 && codePoint <= 57343) {
      return "\0";
    }
    return String.fromCodePoint(codePoint);
  });
  const es5Warning = !regexIdentifierES5.test(
    // Only Unicode escapes are allowed in ES5 identifiers.
    value.replace(/\\u([a-fA-F0-9]{4})/g, function($0, $1) {
      return String.fromCodePoint(parseInt($1, 16));
    })
  );
  var isReserved;
  if ((isReserved = regexES6ReservedWord.test(tmp)) || !regexIdentifier.test(tmp)) {
    return false;
  } else {
    return true;
  }
}

// https://deno.land/x/good@1.13.0.1/flattened/is_valid_key_literal.js
function isValidKeyLiteral(value) {
  if (typeof value != "string") {
    return false;
  }
  if (value.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/)) {
    return true;
  }
  return isValidIdentifier(value);
}

// https://deno.land/x/good@1.13.0.1/flattened/to_representation.js
var reprSymbol = Symbol.for("representation");
var denoInspectSymbol = Symbol.for("Deno.customInspect");
var RegExpPrototype = RegExp.prototype;
var BigIntPrototype = BigInt.prototype;
var DatePrototype = Date.prototype;
var ArrayPrototype = Array.prototype;
var SetPrototype = Set.prototype;
var MapPrototype = Map.prototype;
var ObjectPrototype = Object.prototype;
var ErrorPrototype = Error.prototype;
var PromisePrototype = Promise.prototype;
var isProbablyAPrototype = (item) => typeof item?.constructor == "function" && item.constructor?.prototype == item && isValidIdentifier(item.constructor?.name);
var representSymbol = (item) => {
  if (!item.description) {
    return "Symbol()";
  } else {
    const description = item.description;
    let globalVersion = Symbol.for(description);
    if (globalVersion == item) {
      return `Symbol.for(${JSON.stringify(description)})`;
    } else if (description.startsWith("Symbol.") && Symbol[description.slice(7)]) {
      return description;
    } else {
      return `Symbol(${JSON.stringify(description)})`;
    }
  }
};
var reprKey = (key) => {
  if (typeof key == "symbol") {
    return `[${representSymbol(key)}]`;
  } else if (isValidKeyLiteral(key)) {
    return key;
  } else {
    return JSON.stringify(key);
  }
};
var allGlobalKeysAtInit = Object.freeze(allKeys(globalThis));
var toRepresentation = (item, { alreadySeen = /* @__PURE__ */ new Map(), debug = false, simplified, indent: indent2 = "    ", globalValues } = {}) => {
  if (Number.isFinite(indent2)) {
    indent2 = " ".repeat(indent2);
  }
  const options = { alreadySeen, debug, simplified, indent: indent2 };
  const recursionWrapper = (item2, options2) => {
    let groupIsOn = false;
    try {
      if (item2 === void 0) {
        return "undefined";
      } else if (item2 === null) {
        return "null";
      }
      const { alreadySeen: alreadySeen2, simplified: simplified2, indent: indent3 } = options2;
      if (item2 instanceof Object) {
        if (alreadySeen2.has(item2)) {
          const output2 = alreadySeen2.get(item2);
          if (output2 != null) {
            return output2;
          } else {
            return `${String(item2)} /*Self Reference*/`;
          }
        } else {
          alreadySeen2.set(item2, null);
        }
      }
      const prototype = Object.getPrototypeOf(item2);
      if (typeof item2[reprSymbol] == "function") {
        try {
          const output2 = item2[reprSymbol](options2);
          alreadySeen2.set(item2, output2);
          return output2;
        } catch (error) {
          if (debug) {
            console.error(`calling Symbol.for("representation") method failed (skipping)
Error was: ${error?.stack || error}`);
          }
        }
      }
      if (typeof item2[denoInspectSymbol] == "function") {
        try {
          const output2 = item2[denoInspectSymbol](options2);
          alreadySeen2.set(item2, output2);
          return output2;
        } catch (error) {
          if (debug) {
            console.error(`calling Symbol.for("Deno.customInspect") method failed (skipping)
Error was: ${error?.stack || error}`);
          }
        }
      }
      if (debug) {
        console.group();
        groupIsOn = true;
      }
      let output;
      if (typeof item2 == "number" || typeof item2 == "boolean" || prototype == RegExpPrototype) {
        output = String(item2);
      } else if (typeof item2 == "string") {
        output = JSON.stringify(item2);
      } else if (typeof item2 == "symbol") {
        output = representSymbol(item2);
      } else if (prototype == BigIntPrototype) {
        output = `BigInt(${item2.toString()})`;
      } else if (prototype == DatePrototype) {
        output = `new Date(${item2.getTime()})`;
      } else if (prototype == ArrayPrototype) {
        output = arrayLikeRepr(item2, options2);
        let nonIndexKeys;
        try {
          nonIndexKeys = Object.keys(item2).filter((each) => !(Number.isInteger(each - 0) && each >= 0));
        } catch (error) {
          if (debug) {
            console.error(`[toRepresentation] error checking nonIndexKeys
${error?.stack || error}`);
          }
        }
        if (nonIndexKeys.length > 0) {
          let extraKeys = {};
          for (const each of nonIndexKeys) {
            try {
              extraKeys[each] = item2[each];
            } catch (error) {
            }
          }
          if (Object.keys(extraKeys).length > 0) {
            output = `Object.assign(${output}, ${pureObjectRepr(extraKeys)})`;
          }
        }
      } else if (prototype == SetPrototype) {
        output = `new Set(${arrayLikeRepr(item2, options2)})`;
      } else if (prototype == MapPrototype) {
        output = `new Map(${mapLikeObject(item2.entries(), options2)})`;
      } else if (prototype == PromisePrototype) {
        output = `Promise.resolve(/*unknown*/)`;
      } else if (isGlobalValue(item2)) {
        const key = globalValueMap.get(item2);
        if (isValidIdentifier(key) || key == "eval") {
          output = key;
        } else {
          if (typeof key == "symbol") {
            output = `globalThis[${representSymbol(key)}]`;
          } else if (isValidKeyLiteral(key)) {
            output = `globalThis.${key}`;
          } else {
            output = `globalThis[${JSON.stringify(key)}]`;
          }
        }
      } else if (isProbablyAPrototype(item2)) {
        const name2 = item2.constructor.name;
        let isPrototypeOfGlobal;
        try {
          isPrototypeOfGlobal = globalThis[name2]?.prototype == item2;
        } catch (error) {
        }
        if (isPrototypeOfGlobal) {
          output = `${name2}.prototype`;
        } else {
          if (simplified2) {
            output = `${name2}.prototype /*${name2} is local*/`;
          } else {
            output = `/*prototype of ${name2}*/ ${customObjectRepr(item2, options2)}`;
          }
        }
      } else if (prototype == ErrorPrototype && item2?.constructor != globalThis.DOMException) {
        try {
          output = `new Error(${JSON.stringify(item2?.message)})`;
        } catch (error) {
          output = `new Error(${JSON.stringify(item2)})`;
        }
      } else if (typeof item2 == "function") {
        let isNativeCode;
        let asString;
        let isClass;
        const getAsString = () => {
          if (asString != null) {
            return asString;
          }
          try {
            asString = Function.prototype.toString.call(item2);
          } catch (error) {
          }
          return asString;
        };
        const getIsNativeCode = () => {
          if (isNativeCode != null) {
            return isNativeCode;
          }
          try {
            isNativeCode = !!getAsString().match(/{\s*\[native code\]\s*}$/);
          } catch (error) {
          }
          return isNativeCode;
        };
        const getIsClass = () => {
          if (isClass != null) {
            return isClass;
          }
          try {
            isClass = item2.name && getAsString().match(/^class\b/);
          } catch (error) {
          }
          return isClass;
        };
        const name2 = item2.name;
        if (isValidIdentifier(name2)) {
          if (getIsNativeCode()) {
            output = `${name2} /*native function*/`;
          } else if (getIsClass()) {
            if (simplified2) {
              output = `${name2} /*class*/`;
            } else {
              output = getAsString();
            }
          } else {
            if (simplified2) {
              output = `${item2.name} /*function*/`;
            } else {
              output = `(${getAsString()})`;
            }
          }
        } else if (getIsClass()) {
          if (typeof name2 == "string") {
            output = `/*name: ${JSON.stringify(name2)}*/ class { /*...*/ }`;
          } else if (simplified2) {
            output = `class { /*...*/ }`;
          } else {
            output = getAsString();
          }
        } else if (typeof name2 == "string" && getAsString().match(/^(function )?(g|s)et\b/)) {
          const realName = name2.slice(4);
          if (name2[0] == "g") {
            output = `Object.getOwnPropertyDescriptor({/*unknown obj*/},${JSON.stringify(realName)}).get`;
          } else {
            output = `Object.getOwnPropertyDescriptor({/*unknown obj*/},${JSON.stringify(realName)}).set`;
          }
        } else if (name2) {
          if (simplified2) {
            if (getIsNativeCode()) {
              if (name2.startsWith("get ")) {
                const realName = name2.slice(4);
                if (Object.getOwnPropertyDescriptor(globalThis, realName)?.get == item2) {
                  output = `Object.getOwnPropertyDescriptor(globalThis, ${JSON.stringify(realName)}).get /*native getter*/`;
                } else {
                  output = `Object.getOwnPropertyDescriptor({/*unknown obj*/}, ${JSON.stringify(realName)}).get`;
                }
              } else if (name2.startsWith("set ")) {
                const realName = name2.slice(4);
                if (Object.getOwnPropertyDescriptor(globalThis, realName)?.set == item2) {
                  output = `Object.getOwnPropertyDescriptor(globalThis, ${JSON.stringify(realName)}).set /*native setter*/`;
                } else {
                  output = `Object.getOwnPropertyDescriptor({/*unknown obj*/}, ${JSON.stringify(realName)}).set`;
                }
              } else {
                output = `(function(){/*name: ${recursionWrapper(name2, options2)}, native function*/}})`;
              }
            } else {
              output = `(function(){/*name: ${recursionWrapper(name2, options2)}*/}})`;
            }
          } else {
            output = `/*name: ${recursionWrapper(name2, options2)}*/ (${getAsString()})`;
          }
        } else {
          if (simplified2) {
            if (getIsNativeCode()) {
              output = `(function(){/*native function*/}})`;
            } else {
              output = `(function(){/*...*/}})`;
            }
          } else {
            output = `(${getAsString()})`;
          }
        }
      } else {
        output = customObjectRepr(item2, options2);
      }
      if (groupIsOn) {
        console.groupEnd();
      }
      alreadySeen2.set(item2, output);
      return output;
    } catch (error) {
      if (groupIsOn) {
        console.groupEnd();
      }
      if (debug) {
        console.debug(`[toRepresentation] error is: ${error}`, error?.stack || error);
      }
      try {
        return String(item2);
      } catch (error2) {
        return "{} /*error: catestrophic representation failure*/";
      }
    }
  };
  let globalValueMap;
  const isGlobalValue = (item2) => {
    if (globalValueMap == null) {
      globalValueMap = globalValueMap || new Map(allGlobalKeysAtInit.filter((each) => {
        try {
          globalThis[each];
        } catch (error) {
          return false;
        }
        return true;
      }).map((each) => [globalThis[each], each]));
      for (const [key, value] of Object.entries(globalValues || {})) {
        globalValueMap.set(key, value);
      }
    }
    return globalValueMap.has(item2);
  };
  const pureObjectRepr = (item2) => {
    if (options.simplified == null) {
      options.simplified = true;
    }
    let string = "{";
    let propertyDescriptors;
    try {
      propertyDescriptors = Object.entries(Object.getOwnPropertyDescriptors(item2));
    } catch (error) {
      if (debug) {
        console.error(`[toRepresentation] error getting Object.propertyDescriptor
${error?.stack || error}`);
      }
      try {
        return String(item2);
      } catch (error2) {
        return "undefined /*error: catestrophic representation failure*/";
      }
    }
    for (const [key, { value, writable, enumerable, configurable, get: get2, set: set2 }] of propertyDescriptors) {
      const stringKey = reprKey(key);
      if (get2) {
        string += `
${indent2}get ${stringKey}(){/*contents*/}`;
      } else {
        string += `
${indent2}${stringKey}: ${indent({ string: recursionWrapper(value, options), by: options.indent, noLead: true })},`;
      }
    }
    if (propertyDescriptors.length == 0) {
      string += "}";
    } else {
      string += "\n}";
    }
    return string;
  };
  const arrayLikeRepr = (item2, options2) => {
    if (options2.simplified == null) {
      options2.simplified = true;
    }
    const chunks = [];
    let oneHasNewLine = false;
    for (const each of item2) {
      const repr = recursionWrapper(each, options2);
      chunks.push(repr);
      if (!oneHasNewLine && repr.includes("\n")) {
        oneHasNewLine = true;
      }
    }
    if (!oneHasNewLine) {
      return `[${chunks.join(",")}]`;
    } else {
      return `[
${chunks.map((each) => indent({ string: each, by: options2.indent, noLead: false })).join(",\n")}
]`;
    }
  };
  const mapLikeObject = (entries, options2) => {
    let string = "";
    for (const [key, value] of entries) {
      if (options2.simplified == null) {
        options2.simplified = true;
      }
      const stringKey = recursionWrapper(key, options2);
      const stringValue = recursionWrapper(value, options2);
      if (!stringKey.includes("\n")) {
        const formattedValue = stringValue.includes("\n") ? indent({ string: stringValue, by: options2.indent, noLead: true }) : indent({ string: stringValue, by: options2.indent, noLead: true });
        string += `
${options2.indent}[${stringKey}, ${formattedValue}],`;
      } else {
        const doubleIndent = options2.indent + options2.indent;
        string += `
${options2.indent}[
${indent({ string: stringKey, by: doubleIndent, noLead: false })},
${indent({ string: stringValue, by: doubleIndent, noLead: false })}
${options2.indent}],`;
      }
    }
    if (string.length == 0) {
      return "";
    } else {
      return `[${string}
]`;
    }
  };
  const customObjectRepr = (item2, options2) => {
    const prototype = Object.getPrototypeOf(item2);
    if (prototype == ObjectPrototype) {
      return pureObjectRepr(item2);
    }
    let className = prototype.constructor?.name;
    let output;
    if (typeof className != "string" || className == "Object" || className == "Function") {
      className = null;
    }
    const vanillaCustomObjRepr = () => {
      if (className) {
        if (options2.simplified) {
          return `new ${className}(/*...*/)`;
        } else {
          return `new ${className}(${pureObjectRepr(item2)})`;
        }
      } else {
        return pureObjectRepr(item2);
      }
    };
    if (item2 instanceof Array || item2 instanceof TypedArray || item2 instanceof Set) {
      let isAllIndexKeys;
      try {
        isAllIndexKeys = Object.keys(item2).every((each) => Number.isInteger(each - 0) && each >= 0);
      } catch (error) {
        if (debug) {
          console.error(`[toRepresentation] error checking isAllIndexKeys
${error?.stack || error}`);
        }
      }
      let arrayLikeReprString;
      if (isAllIndexKeys) {
        try {
          arrayLikeReprString = arrayLikeRepr(item2, options2);
        } catch (error) {
          isAllIndexKeys = false;
        }
      }
      if (isAllIndexKeys) {
        if (className) {
          output = `new ${className}(${arrayLikeReprString})`;
        } else {
          if (item2 instanceof Array) {
            output = arrayLikeReprString;
          } else if (item2 instanceof TypedArray) {
            for (const each of typedArrayClasses) {
              if (item2 instanceof each) {
                output = `new ${each.name}(${arrayLikeReprString})`;
                break;
              }
            }
          } else if (item2 instanceof Set) {
            output = `new Set(${arrayLikeReprString})`;
          }
        }
      } else {
        output = vanillaCustomObjRepr(item2);
      }
    } else if (item2 instanceof Map) {
      if (className && options2.simplified) {
        output = `new ${className}(/*...*/)`;
      } else {
        let entries = [];
        try {
          entries = Map.prototype.entries.call(item2);
        } catch (error) {
          if (debug) {
            console.error(`[toRepresentation] error getting Map.prototype.entries
${error?.stack || error}`);
          }
        }
        const core = mapLikeObject(entries, options2);
        if (className) {
          output = `new ${className}(${core})`;
        } else {
          output = `new Map(${core})`;
        }
      }
    } else {
      try {
        output = vanillaCustomObjRepr(item2);
      } catch (error) {
        try {
          output = pureObjectRepr(item2);
        } catch (error2) {
          try {
            output = item2.toString();
          } catch (error3) {
            return "undefined /*error: catestrophic representation failure*/";
          }
        }
      }
    }
    return output;
  };
  try {
    const output = recursionWrapper(item, options);
    return output;
  } catch (error) {
    if (debug) {
      console.debug(`[toRepresentation] error is:`, error);
    }
    return String(item);
  }
};

// main/js_box/whitelist_small.js
var nameMap = /* @__PURE__ */ new Map([
  [NaN, "NaN"],
  [Infinity, "Infinity"],
  [void 0, "undefined"],
  [Function, "Function"],
  [Function.prototype, "Function.prototype"],
  [Object, "Object"],
  [Object.prototype, "Object.prototype"],
  [Boolean, "Boolean"],
  [Boolean.prototype, "Boolean.prototype"],
  [Number, "Number"],
  [Number.prototype, "Number.prototype"],
  [String, "String"],
  [String.prototype, "String.prototype"],
  [Array, "Array"],
  [Array.prototype, "Array.prototype"],
  [RegExp, "RegExp"],
  [RegExp.prototype, "RegExp.prototype"],
  [Symbol, "Symbol"],
  [Symbol.prototype, "Symbol.prototype"],
  [Error, "Error"],
  [Error.prototype, "Error.prototype"],
  [Promise, "Promise"],
  [Promise.prototype, "Promise.prototype"],
  [Set, "Set"],
  [Set.prototype, "Set.prototype"],
  [Map, "Map"],
  [Map.prototype, "Map.prototype"],
  [Math, "Math"],
  [Reflect, "Reflect"]
]);
var whitelist_small_default = /* @__PURE__ */ new Map([
  [Function, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Function",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Function.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
  }],
  [Function.prototype, {
    "length": {
      "value": 0,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "arguments": {
      "get": Object.getOwnPropertyDescriptor(Function.prototype, "arguments").get,
      "set": Object.getOwnPropertyDescriptor(Function.prototype, "arguments").set,
      "enumerable": false,
      "configurable": true
    },
    "caller": {
      "get": Object.getOwnPropertyDescriptor(Function.prototype, "caller").get,
      "set": Object.getOwnPropertyDescriptor(Function.prototype, "caller").get,
      "enumerable": false,
      "configurable": true
    },
    "constructor": {
      "value": Function,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "apply": {
      "value": Function.prototype.apply,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "bind": {
      "value": Function.prototype.bind,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "call": {
      "value": Function.prototype.call,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": Function.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Object, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Object",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Object.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "assign": {
      "value": Object.assign,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "getOwnPropertyDescriptor": {
      "value": Object.getOwnPropertyDescriptor,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "getOwnPropertyDescriptors": {
      "value": Object.getOwnPropertyDescriptors,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "getOwnPropertyNames": {
      "value": Object.getOwnPropertyNames,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "getOwnPropertySymbols": {
      "value": Object.getOwnPropertySymbols,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "hasOwn": {
      "value": Object.hasOwn,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "is": {
      "value": Object.is,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "preventExtensions": {
      "value": Object.preventExtensions,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "seal": {
      "value": Object.seal,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "create": {
      "value": Object.create,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "defineProperties": {
      "value": Object.defineProperties,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "defineProperty": {
      "value": Object.defineProperty,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "freeze": {
      "value": Object.freeze,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "getPrototypeOf": {
      "value": Object.getPrototypeOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "setPrototypeOf": {
      "value": Object.setPrototypeOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isExtensible": {
      "value": Object.isExtensible,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isFrozen": {
      "value": Object.isFrozen,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isSealed": {
      "value": Object.isSealed,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "keys": {
      "value": Object.keys,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "entries": {
      "value": Object.entries,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "fromEntries": {
      "value": Object.fromEntries,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "values": {
      "value": Object.values,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "groupBy": {
      "value": Object.groupBy,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Object.prototype, {
    "constructor": {
      "value": Object,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "__defineGetter__": {
      "value": globalThis["__defineGetter__"],
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "__defineSetter__": {
      "value": globalThis["__defineSetter__"],
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "hasOwnProperty": {
      "value": Object.prototype.hasOwnProperty,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "__lookupGetter__": {
      "value": globalThis["__lookupGetter__"],
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "__lookupSetter__": {
      "value": globalThis["__lookupSetter__"],
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isPrototypeOf": {
      "value": Object.prototype.isPrototypeOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "propertyIsEnumerable": {
      "value": Object.prototype.propertyIsEnumerable,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": Object.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "valueOf": {
      "value": Object.prototype.valueOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toLocaleString": {
      "value": Object.prototype.toLocaleString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Boolean, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Boolean",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Boolean.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
  }],
  [Boolean.prototype, {
    "constructor": {
      "value": Boolean,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": Boolean.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "valueOf": {
      "value": Boolean.prototype.valueOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Number, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Number",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Number.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "isFinite": {
      "value": Number.isFinite,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isInteger": {
      "value": Number.isInteger,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isNaN": {
      "value": Number.isNaN,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isSafeInteger": {
      "value": Number.isSafeInteger,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "parseFloat": {
      "value": Number.parseFloat,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "parseInt": {
      "value": Number.parseInt,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "MAX_VALUE": {
      "value": 17976931348623157e292,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "MIN_VALUE": {
      "value": 5e-324,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "NaN": {
      "value": NaN,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "NEGATIVE_INFINITY": {
      "value": -Infinity,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "POSITIVE_INFINITY": {
      "value": Infinity,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "MAX_SAFE_INTEGER": {
      "value": 9007199254740991,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "MIN_SAFE_INTEGER": {
      "value": -9007199254740991,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "EPSILON": {
      "value": 2220446049250313e-31,
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
  }],
  [Number.prototype, {
    "constructor": {
      "value": Number,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toExponential": {
      "value": Number.prototype.toExponential,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toFixed": {
      "value": Number.prototype.toFixed,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toPrecision": {
      "value": Number.prototype.toPrecision,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": Number.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "valueOf": {
      "value": Number.prototype.valueOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toLocaleString": {
      "value": Number.prototype.toLocaleString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [String, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "String",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": String.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "fromCharCode": {
      "value": String.fromCharCode,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "fromCodePoint": {
      "value": String.fromCodePoint,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "raw": {
      "value": String.raw,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [String.prototype, {
    "length": {
      "value": 0,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "constructor": {
      "value": String,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "anchor": {
      "value": String.prototype.anchor,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "at": {
      "value": String.prototype.at,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "big": {
      "value": String.prototype.big,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "blink": {
      "value": String.prototype.blink,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "bold": {
      "value": String.prototype.bold,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "charAt": {
      "value": String.prototype.charAt,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "charCodeAt": {
      "value": String.prototype.charCodeAt,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "codePointAt": {
      "value": String.prototype.codePointAt,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "concat": {
      "value": String.prototype.concat,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "endsWith": {
      "value": String.prototype.endsWith,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "fontcolor": {
      "value": String.prototype.fontcolor,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "fontsize": {
      "value": String.prototype.fontsize,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "fixed": {
      "value": String.prototype.fixed,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "includes": {
      "value": String.prototype.includes,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "indexOf": {
      "value": String.prototype.indexOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "isWellFormed": {
      "value": String.prototype.isWellFormed,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "italics": {
      "value": String.prototype.italics,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "lastIndexOf": {
      "value": String.prototype.lastIndexOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "link": {
      "value": String.prototype.link,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "localeCompare": {
      "value": String.prototype.localeCompare,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "match": {
      "value": String.prototype.match,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "matchAll": {
      "value": String.prototype.matchAll,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "normalize": {
      "value": String.prototype.normalize,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "padEnd": {
      "value": String.prototype.padEnd,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "padStart": {
      "value": String.prototype.padStart,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "repeat": {
      "value": String.prototype.repeat,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "replace": {
      "value": String.prototype.replace,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "replaceAll": {
      "value": String.prototype.replaceAll,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "search": {
      "value": String.prototype.search,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "slice": {
      "value": String.prototype.slice,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "small": {
      "value": String.prototype.small,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "split": {
      "value": String.prototype.split,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "strike": {
      "value": String.prototype.strike,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "sub": {
      "value": String.prototype.sub,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "substr": {
      "value": String.prototype.substr,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "substring": {
      "value": String.prototype.substring,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "sup": {
      "value": String.prototype.sup,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "startsWith": {
      "value": String.prototype.startsWith,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": String.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toWellFormed": {
      "value": String.prototype.toWellFormed,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "trim": {
      "value": String.prototype.trim,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "trimStart": {
      "value": String.prototype.trimStart,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "trimLeft": {
      "value": String.prototype.trimStart,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "trimEnd": {
      "value": String.prototype.trimEnd,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "trimRight": {
      "value": String.prototype.trimEnd,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toLocaleLowerCase": {
      "value": String.prototype.toLocaleLowerCase,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toLocaleUpperCase": {
      "value": String.prototype.toLocaleUpperCase,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toLowerCase": {
      "value": String.prototype.toLowerCase,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toUpperCase": {
      "value": String.prototype.toUpperCase,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "valueOf": {
      "value": String.prototype.valueOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Array, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Array",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Array.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "isArray": {
      "value": Array.isArray,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "from": {
      "value": Array.from,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "fromAsync": {
      "value": Array.fromAsync,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "of": {
      "value": Array.of,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Array.prototype, {
    "length": {
      "value": 0,
      "writable": true,
      "enumerable": false,
      "configurable": false
    },
    "constructor": {
      "value": Array,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "at": {
      "value": Array.prototype.at,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "concat": {
      "value": Array.prototype.concat,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "copyWithin": {
      "value": Array.prototype.copyWithin,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "fill": {
      "value": Array.prototype.fill,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "find": {
      "value": Array.prototype.find,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "findIndex": {
      "value": Array.prototype.findIndex,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "findLast": {
      "value": Array.prototype.findLast,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "findLastIndex": {
      "value": Array.prototype.findLastIndex,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "lastIndexOf": {
      "value": Array.prototype.lastIndexOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "pop": {
      "value": Array.prototype.pop,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "push": {
      "value": Array.prototype.push,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "reverse": {
      "value": Array.prototype.reverse,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "shift": {
      "value": Array.prototype.shift,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "unshift": {
      "value": Array.prototype.unshift,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "slice": {
      "value": Array.prototype.slice,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "sort": {
      "value": Array.prototype.sort,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "splice": {
      "value": Array.prototype.splice,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "includes": {
      "value": Array.prototype.includes,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "indexOf": {
      "value": Array.prototype.indexOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "join": {
      "value": Array.prototype.join,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "keys": {
      "value": Array.prototype.keys,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "entries": {
      "value": Array.prototype.entries,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "values": {
      "value": Array.prototype.values,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "forEach": {
      "value": Array.prototype.forEach,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "filter": {
      "value": Array.prototype.filter,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "flat": {
      "value": Array.prototype.flat,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "flatMap": {
      "value": Array.prototype.flatMap,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "map": {
      "value": Array.prototype.map,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "every": {
      "value": Array.prototype.every,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "some": {
      "value": Array.prototype.some,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "reduce": {
      "value": Array.prototype.reduce,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "reduceRight": {
      "value": Array.prototype.reduceRight,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toReversed": {
      "value": Array.prototype.toReversed,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toSorted": {
      "value": Array.prototype.toSorted,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toSpliced": {
      "value": Array.prototype.toSpliced,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "with": {
      "value": Array.prototype.with,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toLocaleString": {
      "value": Array.prototype.toLocaleString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": Array.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [RegExp, {
    "length": {
      "value": 2,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "RegExp",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": RegExp.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "input": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "input").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "input").set,
      "enumerable": false,
      "configurable": true
    },
    "$_": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$_").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$_").set,
      "enumerable": false,
      "configurable": true
    },
    "lastMatch": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "lastMatch").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "lastMatch").set,
      "enumerable": false,
      "configurable": true
    },
    "$&": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$&").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$&").set,
      "enumerable": false,
      "configurable": true
    },
    "lastParen": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "lastParen").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "lastParen").set,
      "enumerable": false,
      "configurable": true
    },
    "$+": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$+").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$+").set,
      "enumerable": false,
      "configurable": true
    },
    "leftContext": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "leftContext").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "leftContext").set,
      "enumerable": false,
      "configurable": true
    },
    "$`": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$`").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$`").set,
      "enumerable": false,
      "configurable": true
    },
    "rightContext": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "rightContext").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "rightContext").set,
      "enumerable": false,
      "configurable": true
    },
    "$'": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$'").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$'").set,
      "enumerable": false,
      "configurable": true
    },
    "$1": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$1").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$1").set,
      "enumerable": false,
      "configurable": true
    },
    "$2": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$2").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$2").set,
      "enumerable": false,
      "configurable": true
    },
    "$3": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$3").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$3").set,
      "enumerable": false,
      "configurable": true
    },
    "$4": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$4").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$4").set,
      "enumerable": false,
      "configurable": true
    },
    "$5": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$5").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$5").set,
      "enumerable": false,
      "configurable": true
    },
    "$6": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$6").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$6").set,
      "enumerable": false,
      "configurable": true
    },
    "$7": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$7").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$7").set,
      "enumerable": false,
      "configurable": true
    },
    "$8": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$8").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$8").set,
      "enumerable": false,
      "configurable": true
    },
    "$9": {
      "get": Object.getOwnPropertyDescriptor(RegExp, "$9").get,
      "set": Object.getOwnPropertyDescriptor(RegExp, "$9").set,
      "enumerable": false,
      "configurable": true
    }
  }],
  [RegExp.prototype, {
    "constructor": {
      "value": RegExp,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "exec": {
      "value": RegExp.prototype.exec,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "dotAll": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "dotAll").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "flags": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "global": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "global").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "hasIndices": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "hasIndices").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "ignoreCase": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "ignoreCase").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "multiline": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "multiline").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "source": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "source").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "sticky": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "sticky").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "unicode": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "unicode").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "unicodeSets": {
      "get": Object.getOwnPropertyDescriptor(RegExp.prototype, "unicodeSets").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    },
    "compile": {
      "value": RegExp.prototype.compile,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": RegExp.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "test": {
      "value": RegExp.prototype.test,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Symbol, {
    "length": {
      "value": 0,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Symbol",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Symbol.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "for": {
      "value": Symbol.for,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "keyFor": {
      "value": Symbol.keyFor,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "asyncIterator": {
      "value": Symbol.asyncIterator,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "hasInstance": {
      "value": Symbol.hasInstance,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "isConcatSpreadable": {
      "value": Symbol.isConcatSpreadable,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "iterator": {
      "value": Symbol.iterator,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "match": {
      "value": Symbol.match,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "matchAll": {
      "value": Symbol.matchAll,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "replace": {
      "value": Symbol.replace,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "search": {
      "value": Symbol.search,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "species": {
      "value": Symbol.species,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "split": {
      "value": Symbol.split,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "toPrimitive": {
      "value": Symbol.toPrimitive,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "toStringTag": {
      "value": Symbol.toStringTag,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "unscopables": {
      "value": Symbol.unscopables,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "dispose": {
      "value": Symbol.dispose,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "asyncDispose": {
      "value": Symbol.asyncDispose,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "metadata": {
      "value": Symbol.metadata,
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
  }],
  [Symbol.prototype, {
    "constructor": {
      "value": Symbol,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": Symbol.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "valueOf": {
      "value": Symbol.prototype.valueOf,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "description": {
      "get": Object.getOwnPropertyDescriptor(Symbol.prototype, "description").get,
      "set": void 0,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Error, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Error",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Error.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "captureStackTrace": {
      "value": Error.captureStackTrace,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "stackTraceLimit": {
      "value": 10,
      "writable": true,
      "enumerable": true,
      "configurable": true
    }
  }],
  [Error.prototype, {
    "constructor": {
      "value": Error,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Error",
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "message": {
      "value": "",
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "toString": {
      "value": Error.prototype.toString,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Promise, {
    "length": {
      "value": 1,
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "name": {
      "value": "Promise",
      "writable": false,
      "enumerable": false,
      "configurable": true
    },
    "prototype": {
      "value": Promise.prototype,
      "writable": false,
      "enumerable": false,
      "configurable": false
    },
    "all": {
      "value": Promise.all,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "allSettled": {
      "value": Promise.allSettled,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "any": {
      "value": Promise.any,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "race": {
      "value": Promise.race,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "resolve": {
      "value": Promise.resolve,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "reject": {
      "value": Promise.reject,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "withResolvers": {
      "value": Promise.withResolvers,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "try": {
      "value": Promise.try,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Promise.prototype, {
    "constructor": {
      "value": Promise,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "then": {
      "value": Promise.prototype.then,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "catch": {
      "value": Promise.prototype.catch,
      "writable": true,
      "enumerable": false,
      "configurable": true
    },
    "finally": {
      "value": Promise.prototype.finally,
      "writable": true,
      "enumerable": false,
      "configurable": true
    }
  }],
  [Set, {
    length: {
      value: 0,
      writable: false,
      enumerable: false,
      configurable: true
    },
    name: {
      value: "Set",
      writable: false,
      enumerable: false,
      configurable: true
    },
    prototype: {
      value: Set.prototype,
      writable: false,
      enumerable: false,
      configurable: false
    }
  }],
  [Set.prototype, {
    constructor: {
      value: Set,
      writable: true,
      enumerable: false,
      configurable: true
    },
    has: {
      value: Set.prototype.has,
      writable: true,
      enumerable: false,
      configurable: true
    },
    add: {
      value: Set.prototype.add,
      writable: true,
      enumerable: false,
      configurable: true
    },
    delete: {
      value: Set.prototype.delete,
      writable: true,
      enumerable: false,
      configurable: true
    },
    clear: {
      value: Set.prototype.clear,
      writable: true,
      enumerable: false,
      configurable: true
    },
    entries: {
      value: Set.prototype.entries,
      writable: true,
      enumerable: false,
      configurable: true
    },
    forEach: {
      value: Set.prototype.forEach,
      writable: true,
      enumerable: false,
      configurable: true
    },
    size: {
      get: Object.getOwnPropertyDescriptor(Set.prototype, "size").get,
      set: void 0,
      enumerable: false,
      configurable: true
    },
    values: {
      value: Set.prototype.values,
      writable: true,
      enumerable: false,
      configurable: true
    },
    keys: {
      value: Set.prototype.values,
      writable: true,
      enumerable: false,
      configurable: true
    },
    union: {
      value: Set.prototype.union,
      writable: true,
      enumerable: false,
      configurable: true
    },
    intersection: {
      value: Set.prototype.intersection,
      writable: true,
      enumerable: false,
      configurable: true
    },
    difference: {
      value: Set.prototype.difference,
      writable: true,
      enumerable: false,
      configurable: true
    },
    symmetricDifference: {
      value: Set.prototype.symmetricDifference,
      writable: true,
      enumerable: false,
      configurable: true
    },
    isSubsetOf: {
      value: Set.prototype.isSubsetOf,
      writable: true,
      enumerable: false,
      configurable: true
    },
    isSupersetOf: {
      value: Set.prototype.isSupersetOf,
      writable: true,
      enumerable: false,
      configurable: true
    },
    isDisjointFrom: {
      value: Set.prototype.isDisjointFrom,
      writable: true,
      enumerable: false,
      configurable: true
    }
  }],
  [Map, {
    length: {
      value: 0,
      writable: false,
      enumerable: false,
      configurable: true
    },
    name: {
      value: "Map",
      writable: false,
      enumerable: false,
      configurable: true
    },
    prototype: {
      value: Map.prototype,
      writable: false,
      enumerable: false,
      configurable: false
    },
    groupBy: {
      value: Map.groupBy,
      writable: true,
      enumerable: false,
      configurable: true
    }
  }],
  [Map.prototype, {
    constructor: {
      value: Map,
      writable: true,
      enumerable: false,
      configurable: true
    },
    get: {
      value: Map.prototype.get,
      writable: true,
      enumerable: false,
      configurable: true
    },
    set: {
      value: Map.prototype.set,
      writable: true,
      enumerable: false,
      configurable: true
    },
    has: {
      value: Map.prototype.has,
      writable: true,
      enumerable: false,
      configurable: true
    },
    delete: {
      value: Map.prototype.delete,
      writable: true,
      enumerable: false,
      configurable: true
    },
    clear: {
      value: Map.prototype.clear,
      writable: true,
      enumerable: false,
      configurable: true
    },
    entries: {
      value: Map.prototype.entries,
      writable: true,
      enumerable: false,
      configurable: true
    },
    forEach: {
      value: Map.prototype.forEach,
      writable: true,
      enumerable: false,
      configurable: true
    },
    keys: {
      value: Map.prototype.keys,
      writable: true,
      enumerable: false,
      configurable: true
    },
    size: {
      get: Object.getOwnPropertyDescriptor(Map.prototype, "size").get,
      set: void 0,
      enumerable: false,
      configurable: true
    },
    values: {
      value: Map.prototype.values,
      writable: true,
      enumerable: false,
      configurable: true
    }
  }],
  [Math, {
    abs: {
      value: Math.abs,
      writable: true,
      enumerable: false,
      configurable: true
    },
    acos: {
      value: Math.acos,
      writable: true,
      enumerable: false,
      configurable: true
    },
    acosh: {
      value: Math.acosh,
      writable: true,
      enumerable: false,
      configurable: true
    },
    asin: {
      value: Math.asin,
      writable: true,
      enumerable: false,
      configurable: true
    },
    asinh: {
      value: Math.asinh,
      writable: true,
      enumerable: false,
      configurable: true
    },
    atan: {
      value: Math.atan,
      writable: true,
      enumerable: false,
      configurable: true
    },
    atanh: {
      value: Math.atanh,
      writable: true,
      enumerable: false,
      configurable: true
    },
    atan2: {
      value: Math.atan2,
      writable: true,
      enumerable: false,
      configurable: true
    },
    ceil: {
      value: Math.ceil,
      writable: true,
      enumerable: false,
      configurable: true
    },
    cbrt: {
      value: Math.cbrt,
      writable: true,
      enumerable: false,
      configurable: true
    },
    expm1: {
      value: Math.expm1,
      writable: true,
      enumerable: false,
      configurable: true
    },
    clz32: {
      value: Math.clz32,
      writable: true,
      enumerable: false,
      configurable: true
    },
    cos: {
      value: Math.cos,
      writable: true,
      enumerable: false,
      configurable: true
    },
    cosh: {
      value: Math.cosh,
      writable: true,
      enumerable: false,
      configurable: true
    },
    exp: {
      value: Math.exp,
      writable: true,
      enumerable: false,
      configurable: true
    },
    floor: {
      value: Math.floor,
      writable: true,
      enumerable: false,
      configurable: true
    },
    fround: {
      value: Math.fround,
      writable: true,
      enumerable: false,
      configurable: true
    },
    hypot: {
      value: Math.hypot,
      writable: true,
      enumerable: false,
      configurable: true
    },
    imul: {
      value: Math.imul,
      writable: true,
      enumerable: false,
      configurable: true
    },
    log: {
      value: Math.log,
      writable: true,
      enumerable: false,
      configurable: true
    },
    log1p: {
      value: Math.log1p,
      writable: true,
      enumerable: false,
      configurable: true
    },
    log2: {
      value: Math.log2,
      writable: true,
      enumerable: false,
      configurable: true
    },
    log10: {
      value: Math.log10,
      writable: true,
      enumerable: false,
      configurable: true
    },
    max: {
      value: Math.max,
      writable: true,
      enumerable: false,
      configurable: true
    },
    min: {
      value: Math.min,
      writable: true,
      enumerable: false,
      configurable: true
    },
    pow: {
      value: Math.pow,
      writable: true,
      enumerable: false,
      configurable: true
    },
    random: {
      value: Math.random,
      writable: true,
      enumerable: false,
      configurable: true
    },
    round: {
      value: Math.round,
      writable: true,
      enumerable: false,
      configurable: true
    },
    sign: {
      value: Math.sign,
      writable: true,
      enumerable: false,
      configurable: true
    },
    sin: {
      value: Math.sin,
      writable: true,
      enumerable: false,
      configurable: true
    },
    sinh: {
      value: Math.sinh,
      writable: true,
      enumerable: false,
      configurable: true
    },
    sqrt: {
      value: Math.sqrt,
      writable: true,
      enumerable: false,
      configurable: true
    },
    tan: {
      value: Math.tan,
      writable: true,
      enumerable: false,
      configurable: true
    },
    tanh: {
      value: Math.tanh,
      writable: true,
      enumerable: false,
      configurable: true
    },
    trunc: {
      value: Math.trunc,
      writable: true,
      enumerable: false,
      configurable: true
    },
    E: {
      value: 2.718281828459045,
      writable: false,
      enumerable: false,
      configurable: false
    },
    LN10: {
      value: 2.302585092994046,
      writable: false,
      enumerable: false,
      configurable: false
    },
    LN2: {
      value: 0.6931471805599453,
      writable: false,
      enumerable: false,
      configurable: false
    },
    LOG10E: {
      value: 0.4342944819032518,
      writable: false,
      enumerable: false,
      configurable: false
    },
    LOG2E: {
      value: 1.4426950408889634,
      writable: false,
      enumerable: false,
      configurable: false
    },
    PI: {
      value: 3.141592653589793,
      writable: false,
      enumerable: false,
      configurable: false
    },
    SQRT1_2: {
      value: 0.7071067811865476,
      writable: false,
      enumerable: false,
      configurable: false
    },
    SQRT2: {
      value: 1.4142135623730951,
      writable: false,
      enumerable: false,
      configurable: false
    },
    f16round: {
      value: Math.f16round,
      writable: true,
      enumerable: false,
      configurable: true
    }
  }],
  [Reflect, {
    defineProperty: {
      value: Reflect.defineProperty,
      writable: true,
      enumerable: false,
      configurable: true
    },
    deleteProperty: {
      value: Reflect.deleteProperty,
      writable: true,
      enumerable: false,
      configurable: true
    },
    apply: {
      value: Reflect.apply,
      writable: true,
      enumerable: false,
      configurable: true
    },
    construct: {
      value: Reflect.construct,
      writable: true,
      enumerable: false,
      configurable: true
    },
    get: {
      value: Reflect.get,
      writable: true,
      enumerable: false,
      configurable: true
    },
    getOwnPropertyDescriptor: {
      value: Reflect.getOwnPropertyDescriptor,
      writable: true,
      enumerable: false,
      configurable: true
    },
    getPrototypeOf: {
      value: Reflect.getPrototypeOf,
      writable: true,
      enumerable: false,
      configurable: true
    },
    has: {
      value: Reflect.has,
      writable: true,
      enumerable: false,
      configurable: true
    },
    isExtensible: {
      value: Reflect.isExtensible,
      writable: true,
      enumerable: false,
      configurable: true
    },
    ownKeys: {
      value: Reflect.ownKeys,
      writable: true,
      enumerable: false,
      configurable: true
    },
    preventExtensions: {
      value: Reflect.preventExtensions,
      writable: true,
      enumerable: false,
      configurable: true
    },
    set: {
      value: Reflect.set,
      writable: true,
      enumerable: false,
      configurable: true
    },
    setPrototypeOf: {
      value: Reflect.setPrototypeOf,
      writable: true,
      enumerable: false,
      configurable: true
    }
  }]
]);
var globalThisBaseDescriptors = {
  undefined: {
    value: void 0,
    writable: false,
    enumerable: false,
    configurable: false
  },
  NaN: {
    value: NaN,
    writable: false,
    enumerable: false,
    configurable: false
  },
  Infinity: {
    value: Infinity,
    writable: false,
    enumerable: false,
    configurable: false
  },
  Object: {
    value: Object,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Function: {
    value: Function,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Array: {
    value: Array,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Number: {
    value: Number,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Boolean: {
    value: Boolean,
    writable: true,
    enumerable: false,
    configurable: true
  },
  String: {
    value: String,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Symbol: {
    value: Symbol,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Promise: {
    value: Promise,
    writable: true,
    enumerable: false,
    configurable: true
  },
  RegExp: {
    value: RegExp,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Error: {
    value: Error,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Map: {
    value: Map,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Set: {
    value: Set,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Math: {
    value: Math,
    writable: true,
    enumerable: false,
    configurable: true
  },
  Reflect: {
    value: Reflect,
    writable: true,
    enumerable: false,
    configurable: true
  }
};

// main/node_shims/_config.js
var config = {
  forceBrowser: true
};

// main/node_shims/assert.js
var exported = {
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
    let [actual, expected, message] = args;
    if (args.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (!Object.is(actual, expected)) {
      var obj = {
        actual,
        expected,
        message,
        operator: "strictEqual",
        stackStartFn: strictEqual
      };
      throw new exported.AssertionError(obj);
    }
  },
  equal,
  notDeepEqual,
  ok,
  throws
};
var assert = (boolValue, message) => {
  if (!boolValue) {
    throw new Error(message);
  }
};
var exportedDefault = Object.assign(assert, exported);
if (!config.forceBrowser && (globalThis.Deno || globalThis.process)) {
  exported = await import("node:assert");
  exportedDefault = exported.default;
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
} = exported;

// main/js_box/deterministic_tooling/ensure_descriptor_agreement.js
function ensureDescriptorAgreement({ desiredDescriptors, name: name2, object, markAsNative }) {
  const warnings = [];
  const currentDescriptors = Object.getOwnPropertyDescriptors(object);
  const acceptedKeys = [];
  for (const [currentKey, currentDescriptor] of Object.entries(currentDescriptors)) {
    const { value, writable, enumerable, configurable, get: get2, set: set2 } = currentDescriptor;
    const desiredDescriptor = desiredDescriptors[currentKey];
    if (desiredDescriptor === void 0) {
      let failedToDelete = true;
      if (currentDescriptor.configurable) {
        try {
          delete object[currentKey];
          failedToDelete = false;
        } catch (error) {
        }
      }
      if (failedToDelete) {
        warnings.push(`This runtime is not allowing the deletion of ${name2}.${currentKey}
This is going to cause the runtime to be not 100% deterministic`);
      }
      continue;
    }
    let needsRedefinition = false;
    const desiredHasGetter = desiredDescriptor.get !== void 0;
    const desiredHasSetter = desiredDescriptor.set !== void 0;
    const currentHasGetter = currentDescriptor.get !== void 0;
    const currentHasSetter = currentDescriptor.set !== void 0;
    const currentValueType = typeof currentDescriptor.value;
    const desiredValueType = typeof desiredDescriptor.value;
    const disagreement = desiredHasGetter !== currentHasGetter || desiredHasSetter !== currentHasSetter || currentValueType !== desiredValueType || currentDescriptor.writable !== desiredDescriptor.writable || currentDescriptor.enumerable !== desiredDescriptor.enumerable || currentDescriptor.configurable !== desiredDescriptor.configurable || currentValueType !== "function" && !Object.is(currentDescriptor.value, desiredDescriptor.value);
    if (!disagreement) {
      if (currentHasGetter) {
        markAsNative(`get ${currentKey}`, get2);
      }
      if (currentHasSetter) {
        markAsNative(`set ${currentKey}`, set2);
      }
      if (currentValueType === "function") {
        markAsNative(currentKey, value);
      }
      acceptedKeys.push(currentKey);
      continue;
    } else {
      warnings.push(`This runtime value of ${name2}.${currentKey} is not consistent with the spec
spec: ${toRepresentation(desiredDescriptor)}
runtime: ${toRepresentation(currentDescriptor)}`);
    }
  }
  const desiredKeys = Object.keys(desiredDescriptors);
  const hasAllDesiredKeys = acceptedKeys.length == desiredKeys.length;
  if (!hasAllDesiredKeys) {
    const remainingKeys = setSubtract({ value: acceptedKeys, from: desiredKeys });
    const keysThatNeedPolyfills = [];
    const descriptorsToDefine = {};
    for (const eachKey of remainingKeys) {
      const desiredDescriptor = desiredDescriptors[eachKey];
      if (desiredDescriptor.get == void 0 && desiredDescriptor.set == void 0 && typeof desiredDescriptor.value !== "function") {
        descriptorsToDefine[eachKey] = desiredDescriptor;
      } else {
        keysThatNeedPolyfills.push(eachKey);
      }
    }
    if (keysThatNeedPolyfills.length > 0) {
      warnings.push(`This runtime doesn't match the necessary spec. It is missing the following keys from ${name2}:
${[...keysThatNeedPolyfills].join(", ")}`);
    }
  }
  return warnings;
}

// main/js_box/null_env.js
function enforceNullEnv() {
  const warnings = [];
  if (!globalThis) {
    throw new Error("catestrophic error: the spec requires globalThis, but globalThis is not defined");
  }
  const functionsToConsiderNative = /* @__PURE__ */ new Map();
  const markAsNative = (funcName, func) => (functionsToConsiderNative.set(func, funcName), func);
  const markAllMethodsNative = (name2, classFunc) => (markAsNative(name2, classFunc), Reflect.ownKeys(classFunc.prototype).map(
    // TODO: might need to make this handle symbols
    (eachKey) => typeof eachKey == "string" && typeof classFunc.prototype[eachKey] == "function" && markAsNative(eachKey, classFunc.prototype[eachKey])
  ));
  for (const [obj, desiredDescriptors] of whitelist_small_default.entries()) {
    const name2 = nameMap.get(obj);
    const currentDescriptors = Object.getOwnPropertyDescriptors(obj);
    warnings.push(
      ...ensureDescriptorAgreement({ desiredDescriptors, name: name2, object: obj, markAsNative })
    );
  }
  const numberGenerator = new RandomSource(5);
  const { globals: timingTools } = createTimingTools({ startTime: 0, setTimeoutIncrement: 0.1, performanceIncrement: 0.1, dateIncrement: 10, fetchIncrement: 10 });
  for (const each of whitelist_small_default.keys()) {
    if (typeof each == "function" && typeof each.name == "string" && each.name.length > 0) {
      markAsNative(each.name, each);
    }
  }
  Object.entries(timingTools).map(([key, value]) => markAsNative(key, value));
  markAllMethodsNative("Date", timingTools.Date);
  markAllMethodsNative("Performance", timingTools.Performance);
  markAllMethodsNative("PerformanceMark", timingTools.PerformanceMark);
  const realFuncToString = Function.prototype.toString;
  const realToLocaleString = Object.prototype.toLocaleString;
  const realToLocaleLowerCase = String.prototype.toLocaleLowerCase;
  const realToLocaleUpperCase = String.prototype.toLocaleUpperCase;
  const realLocaleCompare = String.prototype.localeCompare;
  const localCompareDefaults = { usage: "sort", localeMatcher: "best fit", collation: "default", sensitivity: "base", ignorePunctuation: true, numeric: false, caseFirst: false };
  Function.prototype.toString = markAsNative("toString", function(...args) {
    if (functionsToConsiderNative.has(this)) {
      return `function ${functionsToConsiderNative.get(this)}() { [native code] }`;
    }
    return realFuncToString.apply(this, args);
  });
  Object.prototype.toLocaleString = markAsNative("toLocaleString", function(...args) {
    return args.length === 0 ? this.toString() : realToLocaleString.apply(this, args);
  });
  String.prototype.toLocaleLowerCase = markAsNative("toLocaleLowerCase", function(...args) {
    return args.length === 0 ? this.toLowerCase() : realToLocaleLowerCase.apply(this, args);
  });
  String.prototype.toLocaleUpperCase = markAsNative("toLocaleUpperCase", function(...args) {
    return args.length === 0 ? this.toUpperCase() : realToLocaleUpperCase.apply(this, args);
  });
  String.prototype.localeCompare = markAsNative("localeCompare", function(other, locale = "en", options = {}) {
    options = { ...localCompareDefaults, ...options };
    return realLocaleCompare.apply(this, [other, locale, options]);
  });
  Math.random = markAsNative("random", () => numberGenerator.next());
  for (const each of Object.keys(timingTools)) {
    delete globalThis[each];
  }
  Object.assign(globalThis, timingTools);
  Error.stackTraceLimit = Infinity;
  const proto = {};
  Object.setPrototypeOf(globalThis, proto);
  warnings.push(
    ...ensureDescriptorAgreement({
      object: globalThis,
      desiredDescriptors: {
        ...globalThisBaseDescriptors,
        ...Object.getOwnPropertyDescriptors(timingTools),
        "globalThis": {
          value: globalThis,
          writable: true,
          enumerable: false,
          configurable: true
        },
        // 
        // non-enumerable top level functions
        // 
        ...Object.fromEntries([
          "eval",
          "parseInt",
          "parseFloat",
          "isFinite",
          "isNaN",
          "escape",
          "unescape"
        ].map((each) => [each, {
          value: markAsNative(each, globalThis[each]),
          writable: true,
          enumerable: false,
          configurable: true
        }])),
        // 
        // enumberable functions
        // 
        ...Object.fromEntries([
          "structuredClone",
          "atob",
          "btoa"
        ].map((each) => [each, {
          value: markAsNative(each, globalThis[each]),
          writable: true,
          enumerable: true,
          configurable: true
        }]))
      },
      name,
      markAsNative
    })
  );
  return warnings;
}
export {
  enforceNullEnv
};
