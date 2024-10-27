/**
 * run code in a web worker
 *
 * @example
 * ```js
 * await workerEval({world:{}, timeout:Infinity, untrustedCode:`10`})
 * ```
 */
export function workerEval({ timeout, untrustedCode } = { timeout: Infinity }) {
    return new Promise(function (resolve, reject) {
        var blobURL = URL.createObjectURL(
            new Blob(
                [
                    "(",
                    function () {
                        // TODO: fix this data transfer method (there's got to be a better way)
                        var _postMessage = postMessage
                        var _addEventListener = addEventListener

                        _addEventListener("message", function (e) {
                            var f = new Function("", "return(" + e.data + "\n)")
                            _postMessage(f())
                        })
                    }.toString(),
                    `)()`,
                ],
                { type: "application/javascript" }
            )
        )
        var worker = new Worker(blobURL, { type: "module" })
        // URL.revokeObjectURL(blobURL) // For some reason this causes an error on Deno when calling function more than once
        worker.onmessage = function (evt) {
            worker.terminate()
            resolve(evt.data)
        }
        worker.onerror = function (evt) {
            reject(new Error(evt.message))
        }
        worker.postMessage(untrustedCode)

        if (timeout !== Infinity) {
            setTimeout(function () {
                worker.terminate()
                reject(new Error("The worker timed out."))
            }, timeout)
        }
    })
}
