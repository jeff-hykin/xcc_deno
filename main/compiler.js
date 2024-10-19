import path from "./node_shims/path.js"
import { unzip } from "https://esm.sh/fflate@0.8.2"
import uint8ArrayForWccfilesZip from "../embedded_files/wccfiles.zip.binaryified.js"
import DateTime from "https://deno.land/x/good@1.9.1.1/date.js"
import { capitalize, indent, toCamelCase, toPascalCase, toKebabCase, toSnakeCase, toRepresentation, toString, regex, findAll, iterativelyFindAll, escapeRegexMatch, escapeRegexReplace, extractFirst, isValidIdentifier, removeCommonPrefix } from "https://deno.land/x/good@1.9.1.1/string.js"
import { dirname } from "https://deno.land/std@0.128.0/path/posix.ts"

// import { WasiWorker } from './wasi_worker.ts'
import uint8ArrayForWasiWorkerJs from "./wasi_worker.js.binaryified.js"
const webWorkerCode = URL.createObjectURL(new Blob([uint8ArrayForWasiWorkerJs], { type: "text/javascript" }))

const USER = "wasm"
const CC_PATH = "/usr/bin/cc"
const TMP_PATH = "/tmp"

const getCompilerObject = Symbol("getCompilerObject")
export function Compiler(options={ pwd:null, extraFileSystem:{}, totalFileSystem:null }) {
    const { pwd, extraFileSystem, totalFileSystem } = options
    // NOTE: this boilerplate is just a workaround to get (effectively) an async constructor for the Compiler class
    let compiler
    return (options == getCompilerObject) ? this : (async function() {
        // 
        // base properties
        // 
            this._worker = null
            this._messageId = 0
            this._actionHandlerMap = new Map() // <number, ActionHandler>
            this._priorTasks = Promise.resolve()
            this.pwd = pwd || `/home/${USER}`
            
            /**
             * callback for compiler output
             *
             * @param {string} arg.text - 
             * @param {boolean} arg.isError -
             */
            this._onOutput = (()=>0)
            // ({text, isError}) => {
            //     if (isError) {
            //         console.error(text)
            //     } else {
            //         console.log(text)
            //     }
            // }
        // 
        // worker setup
        // 
            this._worker = new Worker(
                // "file:///Users/jeffhykin/repos/xcc_deno/main/wasi_worker.bundle.js",
                webWorkerCode,
                { type: "module" }
            )
            this._worker.onmessage = (event) => {
                const data = event.data
                if (data.messageId != null && this._actionHandlerMap.has(data.messageId)) {
                    const handler = this._actionHandlerMap.get(data.messageId)
                    this._actionHandlerMap.delete(data.messageId)
                    if (data.error != null) {
                        handler.reject(data.error)
                    } else {
                        handler.resolve(data.result)
                    }
                } else {
                    switch (data.action) {
                        case "consoleOut":
                            this._onOutput(data)
                            break
                        default:
                            console.error(`[Inside of WccRunner, worker.onmessage] Received an unknown action ${data.action}`, toRepresentation(data))
                            break
                    }
                }
            }
        // 
        // file system setup
        // 
            const recursiveTrue = { recursive: true }
            const fileSystemSetupPromises = [
                this.mkdir(TMP_PATH, recursiveTrue),
                this.mkdir(this.pwd, recursiveTrue).then(
                    ()=>this.chdir(this.pwd)
                ),
            ]
            // if totalFileSystem skip the default files
            if (!totalFileSystem) {
                fileSystemSetupPromises.push(
                    new Promise((resolve, reject) => unzip(uint8ArrayForWccfilesZip, (err, unzipped) => {
                        if (err) {
                            reject(err)
                            return
                        }

                        let ccExists = false
                        const promises = Object.entries(unzipped).map(async ([filename, data]) => {
                            if (data == null || data.byteLength === 0) {
                                // Skip directories.
                                return
                            }
                            const filepath = `/${filename}`
                            await this.mkdir(path.dirname(filepath), recursiveTrue)
                            await this.writeFile(filepath, data)
                            ccExists ||= filepath === CC_PATH
                        })
                        Promise.all(promises).then((result) => {
                                if (!ccExists) {
                                    reject(Error("C-this not found in the zip file"))
                                }
                                resolve(result)
                            }).catch(reject)
                    }))
                )
            }
            for (const [path, contents] of Object.entries(extraFileSystem||{})) {
                const isFolder = path.endsWith("/") && contents === ""
                if (path.endsWith("/")) {
                    if (contents === "") {
                        fileSystemSetupPromises.push(
                            this.mkdir(this.abspath(path), recursiveTrue)
                        )
                    } else {
                        console.warn(`When creating a Compiler object with an with extraFileSystem, e.g. Compiler({ extraFileSystem: {...} }), each key is a path, and paths that end with slash are expected to be a folder (${JSON.stringify(path)}). As a sanity-check the value (as in key-value) of a folder is also expected to be an empty string. Instead the value was ${toRepresentation(contents)}\nPlease change the value to be an empty string, or remove the trailing slash if this was supposed to be a file`)
                    }
                } else {
                    let actualContents = contents
                    if (actualContents == null) {
                        actualContents = ""
                    } else if (ArrayBuffer.isView(actualContents)) {
                        // FIXME: this is not round-trip safe, but we need to modify the worker to support sending Uint8Array's directly
                        actualContents = new TextDecoder().decode(actualContents)
                    } else if (typeof actualContents === "string") {
                        // noop
                    } else {
                        throw new Error(`[Compiler.constructor] Unexpected type for contents of extraFileSystem[${JSON.stringify(path)}]\nThe value needs to be a string, typed array (ex: Uint8Array), or null\nInstead it was: ${toRepresentation(actualContents)}`)
                    }
                    fileSystemSetupPromises.push(
                        this.mkdir(dirname(path), recursiveTrue).then(
                            ()=>this.writeFile(path, actualContents),
                        ),
                    )
                }
            }
            await Promise.all(fileSystemSetupPromises)
        // 
    }).bind(compiler = new Compiler(getCompilerObject))().then(()=>compiler)
}


// 
// 
// main api
// 
// 
    /**
     * Compiles a source file using the specified options.
     *
     * @param {string} sourceName - The name of the source file to compile.
     * @param {string[]} [extraOptions] - Optional additional options for the compiler.
     * @param {boolean} [options.captureOutput=true] - Whether to capture the output of the compiler.
     * @param {function} [options.onOutput=null] - Optional callback for compiler output.
     * @returns {Promise<{} & { exitCode: number, out: string, stdout: string, stderr: string }>} exitCode and output
     */
    Compiler.prototype.compile = function(sourceName, extraOptions) {
        let args = [CC_PATH];
        if (extraOptions != null) {
            args = args.concat(extraOptions);
        }
        args.push(sourceName);
        return this.runWasi(args[0], args)
    }

    /**
     * Runs a WASI (WebAssembly System Interface) command with the specified arguments.
     *
     * @param {string} filePath - The path to the WASI executable.
     * @param {string[]} args - The arguments to pass to the executable.
     * @returns {Promise<number>} A promise that resolves to the exit code of the command.
     */
    Compiler.prototype.runWasi = function (filePath, args, { onOutput=null }={}) {
        if (onOutput == null) {
            const out = []
            const stdout = []
            const stderr = []
            onOutput = ({ text, isError }) => {
                out.push(text)
                if (isError) {
                    stderr.push(text)
                } else {
                    stdout.push(text)
                }
            }
            const onOutputBefore = this._onOutput
            this._onOutput = onOutput
            return this._priorTasks = this._priorTasks.then(()=>this._postMessage("runWasi", { filePath, args })).then(
                exitCode=>{
                    this._onOutput = onOutputBefore
                    return { exitCode, out: out.join(""), stdout: stdout.join(""), stderr: stderr.join("") }
                }
            );
        } else {
            // this._priorTasks enforces sequential execution so that stdout/stderr can be properly isolated per-compile task
            return this._priorTasks = this._priorTasks.then(()=>{
                const onOutputBefore = this._onOutput
                this._onOutput = onOutput
                return this._postMessage("runWasi", { filePath, args }).then((exitCode)=>{
                    this._onOutput = onOutputBefore
                    return {exitCode}
                })
            });
        }
    }

    /**
     * Clears temporary files from the temporary directory.
     *
     * @returns {Promise<void>} A promise that resolves when all temporary files have been deleted.
     */
    Compiler.prototype.clearTemporaries = async function () {
        const files = await this._postMessage("readdir", { filePath: TMP_PATH });
        await Promise.all(files.map((file) => this._postMessage("unlink", { filePath: `${TMP_PATH}/${file}` })));
    }
    
    /**
     * terminate
     *
     * @returns {Promise<void>} stops the compiler from keeping a worker alive
     */
    Compiler.prototype.terminate = async function () {
        await this._worker.postMessage({ action: "terminate" });
        await this._worker.terminate()
        for (const [key, value] of this._actionHandlerMap.entries()) {
            try {
                console.log(`resolving action handler: ${key}`)
                value.resolve()
            } catch (error) {
                console.log(`error when trying to resolve action handler: ${error}`)
            }
        }
        return
    }

// 
// 
// file system tools
// 
// 
    /**
     * Writes content to a file at the specified path.
     *
     * @param {string} filePath - The path of the file to write to.
     * @param {string | Uint8Array} content - The content to write to the file.
     * @returns {Promise<void>} A promise that resolves when the file has been written.
     */
    Compiler.prototype.writeFile =  async function(filePath, content) {
        await this._postMessage("writeFile", { filePath: this.abspath(filePath), content });
    }

    /**
     * Reads the content of a file at the specified path.
     *
     * @param {string} filePath - The path of the file to read from.
     * @returns {Promise<Uint8Array>} A promise that resolves with the content of the file.
     */
    Compiler.prototype.readFile = async function(filePath) {
        return await this._postMessage("readFile", { filePath: this.abspath(filePath) });
    }

    /**
     * Changes the current working directory to the specified path.
     *
     * @param {string} filePath - The path of the directory to change to.
     * @returns {Promise<boolean>} A promise that resolves to true if the directory was successfully changed, false otherwise.
     */
    Compiler.prototype.chdir = function(filePath) {
        return this._postMessage("chdir", { filePath: this.abspath(filePath) });
    }

    /**
     * Creates a new directory at the specified path.
     *
     * @param {string} filePath - The path of the directory to create.
     * @param {any} [option] - Optional settings for the directory creation (e.g., recursive).
     * @returns {Promise<void>} A promise that resolves when the directory has been created.
     */
    Compiler.prototype.mkdir = function(filePath, option) {
        return this._postMessage("mkdir", { filePath: this.abspath(filePath), option });
    }

    Compiler.prototype.abspath = function(path2) {
        if (path2[0] === "/") {
            return path2
        }
        return path.join(this.pwd, path2)
    }

// 
// interals 
// 

    /**
     * Sends a message to the worker with the specified action and data.
     *
     * @param {string} action - The action to perform.
     * @param {any} [data={}] - The data to send along with the action.
     * @returns {Promise<any>} A promise that resolves with the response or rejects on error.
     */
    Compiler.prototype._postMessage = function(action, data = {}) {
        return new Promise((resolve, reject) => {
            const messageId = ++this._messageId;
            this._actionHandlerMap.set(messageId, { resolve, reject });
            data.action = action;
            data.messageId = messageId;
            this._worker.postMessage(data);
        });
    }