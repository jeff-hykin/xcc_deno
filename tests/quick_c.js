import { quickC } from '../main/main.js'

const { fib, fib2 } = await quickC(`
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
`, )


console.debug(`fib(22) is:`,fib(22))
console.debug(`fib2(22) is:`,fib2(22))
// Deno.exit()