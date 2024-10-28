import nullEnvBytes from "./null_env.bundle.js.binaryified.js"

function makeImport(codeString) {
    function replaceNonAsciiWithUnicode(str) {
        return str.replace(/[^\0-~](?<!\n|\r|\t|\0)/g, (char) => {
            return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
        })
    }

    return `import "data:text/javascript;base64,${btoa(replaceNonAsciiWithUnicode(codeString))}"`
}
const nullEnvCode = new TextDecoder().decode(nullEnvBytes)
const importString = makeImport(nullEnvCode+'\nenforceNullEnv()')

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
                    importString,
                    `
                    (function() {
                        // TODO: fix this data transfer method (there's got to be a better way)
                        var _postMessage = postMessage
                        var _addEventListener = addEventListener

                        _addEventListener("message", function (e) {
                            var f = new Function("", "return(" + e.data + "\\n)")
                            _postMessage(f())
                        })
                    })()`,
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
