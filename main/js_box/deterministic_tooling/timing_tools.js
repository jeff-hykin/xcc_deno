const realSetTimeout = globalThis.setTimeout

export function createTimingTools() {
    const schedule = []
    const internal = {
        time: 0,
        increment: 10,
        macroTaskIndex: 0,
    }
    function runNextMacroTask() {
        if (schedule.length) {
            internal.time += internal.increment
            // TODO: make this more efficient by reversing the insert order and using pop
            const { 0: targetTime, 1: id, 2: callback, 3: args, 4: interval, } = schedule.pop()
            // teleport forward in time, but never backwards
            // because the code doesn't interact with the outside world, it will/should never know the difference
            if (targetTime < internal.time) {
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

    return { setTimeout, setInterval, clearInterval, clearTimeout, internal, }
}