/**
 * run code in a web worker
 *
 * @example
 * ```js
 * await workerEval({world:{}, timeout:Infinity, untrustedCode:`10`})
 * ```
 */
export function workerEval({timeout, untrustedCode}={timeout:Infinity}) {
    return new Promise(function (resolve, reject) {
        var blobURL = URL.createObjectURL(
            new Blob(
                ["(", 
                function() {
                    var _postMessage = postMessage
                    var _addEventListener = addEventListener

                    _addEventListener("message", function (e) {
                        var f = new Function("", "return (" + e.data + "\n);")
                        _postMessage(f())
                    })
                }.toString()
                ,`)() // ${Math.random()}`, ],
                { type: "application/javascript" }
            )
        )
        // TODO: clean up Math.random() (debugging stuff)
        var worker = new Worker(blobURL+`#${Math.random()}`, { type: "module" })
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