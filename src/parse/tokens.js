class Tokens {

    // static COUNTINUE = 'COUNTINUE';
    constructor(tokens) {
        this.data = tokens;
        this.cur = 0;
        this.end = tokens.length;
    }

    // get curToken() {
    //     return this.data[this.cur];
    // }

    // 只遍历一次
    traverse(cb) {
        for (; this.cur < this.end; this.cur++) {
            let res = cb(this.data[this.cur], this.cur);
            if (res === Tokens.COUNTINUE) continue;
            if (res === Tokens.BREAK) return Tokens.BREAK;
            return res;
        }
        return Tokens.OVER;
    }

    // traverseTo(tokenType, cb) {
    //     this.traverse((token) => {
    //         cb(token);
    //         if (token.type === tokenType) return true;
    //     })
    // }

    move(step) {
        this.cur += step;
    }

    skipTo(tokenType) {
        this.traverse((token) => {
            if (token.type === tokenType) return Tokens.BREAK;
            return Tokens.COUNTINUE;
        })
    }

}

Tokens.OVER = 'OVER';
Tokens.BREAK = 'BREAK';
Tokens.COUNTINUE = 'COUNTINUE';

module.exports = Tokens