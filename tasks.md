- DONE: Use wasi_worker.ts instead of wasi_worker.js
    - DONE: download memfs
    - DONE: patch fs-monkey/lib/util/lists 
- DONE: try to get fib exported
    - DONE: manually create necessary imports
    - DONE: post issue about -e not working
    - make a way to get the names of all functions, or make an export-all option
        - make a PR for that
- DONE: Make Deno.exit() not needed (use worker.terminate())
- DONE: test if terminating worker is necessary
    - answer: yes

- fix binaryify not self-updating
- Create a way to write binary files to the worker

### quickC
- make quickC have a class setup
- add caching techniques

### All targets deterministic output
- create an "all targets" compilation tool
- simplify the c args for:
    - adding more header files
    - custom predefined macros
    - adding shared/static object files
    - shared object files
    - shared object outputs
    - target system selection
    - system path lookup
    - ENV vars
- start making seralizable system for deterministic builds
    - test how it handles `__DATE__`
    - test how filepaths (split by `/`) are handled
- figure out how to specify/hardcode dynamically linked libraries


### Custom XCC builds
- compile ./wcc from scratch using a nixpkgs setup
    - figure out how to build lib/wcrt0.a
    - figure out how to build lib/wlibc.a



- big goals:
    - how to deal with project that use build systems
        - probably try to wrap gcc and then listen to the args that are used, then translate those to XCC function calls
    - tools to compile:
        - `make`
        - `sed`
        - `grep`
        - `bash`
        - `openssl`
        - `imagemagick`
        - `libpng`
        - `git`
        - `python`
        - `ffmpeg`
    - concepts:
        - how to use/load a shared object or connected a shared object like ffmpeg into another binary/project
        - how to patch a system call of a resulting binary
        - make a patching tool that can modify and/or hardcode ENV vars into a binary
    - make a list of major blockers:
        - no goto
        - probably no libc support for networking
        - probably nothing involving USB, cameras, or serial ports
        - env vars?
        - missing stdlib headers:
            - `assert.h`     : 👍
            - `complex.h`    : ❌
            - `ctype.h`      : 👍
            - `errno.h`      : 👍
            - `fenv.h`       : ❌
            - `float.h`      : ❌
            - `inttypes.h`   : 👍
            - `iso646.h`     : ❌
            - `limits.h`     : 👍
            - `locale.h`     : ❌
            - `math.h`       : 👍
            - `setjmp.h`     : 👍
            - `signal.h`     : ❌
            - `stdalign.h`   : ❌
            - `stdarg.h`     : 👍
            - `stdatomic.h`  : ❌
            - `stdbit.h`     : ❌
            - `stdbool.h`    : 👍
            - `stdckdint.h`  : ❌
            - `stddef.h`     : 👍
            - `stdint.h`     : 👍
            - `stdio.h`      : 👍
            - `stdlib.h`     : 👍
            - `stdnoreturn.h`: ❌
            - `string.h`     : 👍
            - `tgmath.h`     : ❌
            - `threads.h`    : ❌
            - `time.h`       : 👍
            - `uchar.h`      : ❌
            - `wchar.h`      : ❌
            - `wctype.h`     : ❌
    