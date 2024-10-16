const buffer = new Uint8Array(1024)
const promise = Deno.stdin.read(buffer)

setTimeout(() => { Deno.stdin.close(); console.log("stdin was closed") })
await promise
