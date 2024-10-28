import nullEnvCodeImport from "./null_env.bundle.js.binaryified.js"

let nullEnvCode = nullEnvCodeImport
// dynamic bundle and read-as-string for the worker
if (typeof Deno !== "undefined") {
    const { build, stop } = await import("https://deno.land/x/esbuild@v0.24.0/mod.js")
    const { FileSystem } = await import("https://deno.land/x/quickr@0.6.72/main/file_system.js")
    const { denoPlugins } = await import("https://esm.sh/jsr/@duesabati/esbuild-deno-plugin@0.1.0/mod.ts")
    const targetToBuild = `${FileSystem.thisFolder}/support/enforce_null_env.js`
    if ((await FileSystem.info(targetToBuild)).isFile) {
        nullEnvCode = "{" + new TextDecoder().decode(await new Promise((resolve, reject)=>{
            build({
                bundle: true,
                entryPoints: [targetToBuild],
                jsxFactory: "h",
                format: "esm",
                write: false,
                plugins: [
                    {
                        "name": "exit-on-build",
                        "setup": (build) => {
                            build.onEnd((result) => {
                                if (result.errors.length > 0) {
                                    reject(result.errors)
                                    stop().catch(reject)
                                    return
                                }
                                resolve(result.outputFiles[0].contents)
                                stop().catch(reject)
                            })
                        },
                    },
                    ...denoPlugins(),
                ],
                external: [
                    "node:assert",
                ]
            }).catch(reject)
        }))+"}"
        console.log(nullEnvCode.slice(0,100)+"..."+nullEnvCode.slice(-100))
    }
    // function makeImport(codeString) {
    // function replaceNonAsciiWithUnicode(str) {
    //     return str.replace(/[^\0-~](?<!\n|\r|\t|\0)/g, (char) => {
    //         return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
    //     })
    // }

    // return `import "data:text/javascript;base64,${btoa(replaceNonAsciiWithUnicode(codeString))}"`
    // }
    // // const nullEnvCode = new TextDecoder().decode(nullEnvBytes)
    // const importString = makeImport(nullEnvCode+'\nenforceNullEnv()')
}

/**
 * run code in a web worker
 *
 * @example
 * ```js
 * await workerEval({world:{}, timeout:Infinity, untrustedCode:`10`})
 * ```
 */
export function workerEval({ timeout, untrustedCode } = {}) {
    timeout = timeout ?? Infinity
    return new Promise(function (resolve, reject) {
        var blobURL = URL.createObjectURL(
            new Blob(
                [
                    `{var p=postMessage,a=addEventListener;a("message",(e)=>p(new Function("","return("+e.data+"\\n)")()))}`,
                    nullEnvCode,
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
