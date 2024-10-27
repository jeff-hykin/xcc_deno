const realSetTimeout = globalThis.setTimeout
const realDate = globalThis.Date

export function createTimingTools({startTime=0, setTimeoutIncrement=1, performanceIncrement=0.1,dateIncrement=10, fetchIncrement=10}={}) {
    const schedule = []
    const internal = {
        time: 0,
        increment: setTimeoutIncrement,
        macroTaskIndex: 0,
    }
    function runNextMacroTask() {
        if (schedule.length) {
            internal.time += internal.increment
            // TODO: make this more efficient by reversing the insert order and using pop
            const { 0: targetTime, 1: id, 2: callback, 3: args, 4: interval, } = schedule.pop()
            // teleport forward in time, but never backwards
            // because the code doesn't interact with the outside world, it will/should never know the difference
            if (targetTime > internal.time) {
                internal.time = targetTime + internal.increment
            }
            // console.debug(`args is:`,args)
            if (interval != null) {
                scheduleTask(callback, interval, args, id)
            }
            callback(...args)
        }
    }
    function scheduleTask(callback, delay=0, args, intervalId) {
        if (intervalId == null) {
            internal.time += internal.increment
        }
        const targetTime = internal.time + delay
        const id = intervalId || ++internal.macroTaskIndex
        // 
        // put into schedule
        // 
        const interval = intervalId ? delay : null
        if (schedule.length === 0) {
            schedule.push([targetTime, id, callback, args, interval, ])
        } else {
            let index = -1
            for (const { 0 : eachTime } of schedule) {
                index++
                if (targetTime >= eachTime) {
                    break
                }
            }
            schedule.splice(index, 0, [targetTime, id, callback, args, interval,])
        }
        realSetTimeout(runNextMacroTask, 0)
        return id
    }
    function setTimeout(callback, delay=0, ...args) {
        return scheduleTask(callback, delay, args, null)
    }
    function setInterval(callback, delay=0, ...args) {
        internal.time += internal.increment
        const setIntervalId = ++internal.macroTaskIndex
        return scheduleTask(callback, delay, args, setIntervalId)
    }
    function clearTimeout(id) {
        let index = -1
        for (const { 1: eachId, 4: interval } of schedule) {
            index++
            if (eachId === id && interval == null) {
                schedule.splice(index, 1)
                return
            }
        }
    }
    function clearInterval(id) {
        let index = -1
        for (const { 1: eachId, 4: interval } of schedule) {
            index++
            if (eachId === id && interval == null) {
                schedule.splice(index, 1)
                return
            }
        }
    }

    let perfMarkNumber = 0
    class PerformanceMark {
        // FIXME: I didn't check the spec for this, its just temp
        constructor(name, entryType, startTime, duration, detail) {
            this.name = name
            this.entryType = entryType
            this.startTime = startTime
            this.duration = duration
            this.detail = detail
        }
    }
    class Performance {
        constructor() {
        }
        timeOrigin = startTime
        clearMarks() {
            // FIXME: implement
            return
        }
        clearMeasures() {
            // FIXME: implement
            return
        }
        getEntries() {
            // FIXME: implement
            return []
        }
        getEntriesByName() {
            // FIXME: implement
            return []
        }
        getEntriesByType() {
            // FIXME: implement
            return []
        }
        mark({
            markName,
            markOptions={},
        }={}) {
            // FIXME: todo not fully implemented
            return new PerformanceMark(String(markName)||`${++perfMarkNumber}`, "mark", this.now(), 0, markOptions.detail)
        }
        measure(...args) {
            // FIXME: implement
            return new PerformanceMark(String(args[0]), "measure", this.now(), 1, args[1])
        }
        now() {
            internal.time += performanceIncrement
            return internal.time + this.timeOrigin
        }
        toJSON() {
            return { timeOrigin: this.timeOrigin, }
        }
        [Symbol.toStringTag]() {
            return "Performance"
        }
        // Symbol(Deno.privateCustomInspect),
    }
    const performance = new Performance()

    class Date extends realDate {
        // FIXME: implement all of Date, especially get ride of timezone knowledge
        constructor(...args) {
            internal.time += dateIncrement
            if (args.length === 0) {
                super(internal.time)
            } else {
                super(...args)
            }
        }
    }

    return { internal, globals: { setTimeout, setInterval, clearInterval, clearTimeout, Date, performance, Performance, PerformanceMark,} }
}