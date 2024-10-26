// Xorshift32 algorithm
export class RandomSource {
    constructor(seed) {
        this.state = seed | 1; //  can't allow zero, as it screws everything up
    }

    next() {
        this.state ^= this.state << 13;
        this.state ^= this.state >> 17;
        this.state ^= this.state << 5;
        const nextU32_1 = this.state >>> 0
        this.state ^= this.state << 13;
        this.state ^= this.state >> 17;
        this.state ^= this.state << 5;
        const nextU32_2 = this.state >>> 0
        return (nextU32_1 / 2**32) + (nextU32_2 / 2**64);
    }
}