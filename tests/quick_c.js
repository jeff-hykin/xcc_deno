import { quickC } from '../main/main.js'

import uint8ArrayForWasiWorkerJs from "/Users/jeffhykin/repos/xcc_deno/main/wasi_worker.js.binaryified.js"

const webWorkerCode = URL.createObjectURL(new Blob([uint8ArrayForWasiWorkerJs], { type: "text/javascript" }))
let _worker = new Worker(
    // "file:///Users/jeffhykin/repos/xcc_deno/main/wasi_worker.bundle.js",
    webWorkerCode,
    { type: "module" }
)
_worker.terminate()
console.log(`hi`)
// const { fib, fib2 } = await quickC(`
//     int fib(int n) {
//         if (n < 2)
//             return n;
//         else
//             return fib(n - 1) + fib(n - 2);
//     }
    
//     int fib2(int n) {
//         if (n <= 1)
//             return n;
//         else
//             return fib(n - 1) + fib(n - 2);
//     }
// `, {verbose:true})


// console.debug(`fib(22) is:`,fib(22))
// console.debug(`fib2(22) is:`,fib2(22))
// // Deno.exit()