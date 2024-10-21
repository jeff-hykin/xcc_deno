import { quickC } from '../main/main.js'
// import { quickC } from '../main/main.bundle.js'
// import { quickC } from 'https://raw.githubusercontent.com/jeff-hykin/xcc_deno/41ef849e9571798b2a43f10fc9b96d78e7463986/main/main.bundle.js'

var { fib, fib2, ...other } = await quickC`
    int fib(int n) {
        if (n < 2)
            return n;
        else
            return fib(n - 1) + fib(n - 2);
    }
    
    int fib2(int n) {
        if (n <= 1)
            return n;
        else
            return fib(n - 1) + fib(n - 2);
    }
    int main() {
        return fib(22);
    }
`


console.debug(`other is:`,other)
console.debug(`other.__main_argc_argv() is:`,other.__main_argc_argv())
console.debug(`fib(22) is:`,fib(22))
console.debug(`fib2(22) is:`,fib2(22))
// Deno.exit()