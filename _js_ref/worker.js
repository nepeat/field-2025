var A = n => `px_${n.x}__py_${n.y}`;
var d = 32,
    X = d - 1,
    Y = 200;

function C(n) {
    let e = k(n);
    return `https://webview.devvit.net/${U(e)}`
}

function k(n) {
    let e = n.kind === "deltas" ? "d" : "p",
        t = A(n.partitionXY);
    return `${n.pathPrefix}/${t}/${n.subredditId}/${e}/${n.challengeNumber}/${n.sequenceNumber}`
}

function U(n) {
    let e = "platform/";
    return n.startsWith(e) && (n = n.slice(e.length)), n
}
var m = class {
    #t;
    #e;
    constructor(e, t) {
        this.#t = {
            x: e.x * t,
            y: e.y * t
        }, this.#e = t
    }
    async encode(e) {
        let t = new Uint8Array(3 * e.length);
        for (let [r, i] of e.entries()) this.#r(t.subarray(3 * r, 3 * (r + 1)), i), r > 0 && r % Y === 0 && await Promise.resolve();
        return t
    }
    #r(e, t) {
        let r = t.globalXY.x - this.#t.x,
            c = (t.globalXY.y - this.#t.y) * this.#e + r,
            s = c >>> 16 & 255,
            l = c >>> 8 & 255,
            f = c & 255;
        s |= t.team << 6 & 255, s |= t.isBan ? d : 0, e.set([s, l, f], 0)
    }
    decode(e) {
        let t = [];
        for (let r = 0; r < e.length; r += 3) t.push(this.#n(e.subarray(r, r + 3)));
        return t
    }
    #n(e) {
        let t = e[0],
            r = (t & X) << 16 | e[1] << 8 | e[2];
        return {
            globalXY: {
                x: this.#t.x + r % this.#e,
                y: this.#t.y + Math.floor(r / this.#e)
            },
            isBan: (t & d) === d,
            team: t >> 6
        }
    }
};
var g = class {
        async encode(e) {
            let t = new p,
                r = new b,
                i = 0,
                c = 0;
            for (let o of this.#t(e))
                if (c++, c > 102400 && (await Promise.resolve(), c = 1), o.kind === "Group") {
                    i += o.trits.length;
                    let u = 0;
                    for (let y of o.trits.reverse()) u = 3 * u + y;
                    t.writeByte(u);
                    for (let y of o.teams) r.writeU2(y)
                } else i += o.length, o.length < 9 ? t.writeByte(244 + 3 * (o.length - 6) + o.trit) : (t.writeByte(253 + o.trit), t.writeByte(o.length - 9)), o.trit !== 0 && r.writeU2(o.team);
            let s = t.bytes(),
                l = r.flush(),
                f = new p;
            this.#r(f, i), this.#r(f, s.length);
            let a = new Uint8Array(6 + s.length + l.length);
            return a.set(f.bytes()), a.set(s, 6), a.set(l, 6 + s.length), a
        }* #t(e) {
            let t = {};
            for (let r of e) {
                let i = this.#e(r);
                if (t.group) {
                    t.group.trits.push(i), i !== 0 && t.group.teams.push(r.team), t.group.trits.length === 5 && (yield t.group, delete t.group);
                    continue
                }
                if (!t.run) t.run = {
                    kind: "Run",
                    trit: i,
                    team: r?.team,
                    length: 1
                };
                else {
                    if (i === t.run.trit && r?.team === t.run.team && t.run.length < 264) {
                        t.run.length++;
                        continue
                    }
                    if (t.run.length > 5) {
                        yield t.run, t.run = {
                            kind: "Run",
                            trit: i,
                            team: r?.team,
                            length: 1
                        };
                        continue
                    }
                    if (t.group = {
                            kind: "Group",
                            trits: Array(t.run.length).fill(t.run.trit),
                            teams: t.run.trit === 0 ? [] : Array(t.run.length).fill(t.run.team)
                        }, t.group.trits.length === 5) {
                        yield t.group, delete t.group, t.run = {
                            kind: "Run",
                            trit: i,
                            team: r?.team,
                            length: 1
                        };
                        continue
                    }
                    delete t.run, t.group.trits.push(i), i !== 0 && t.group.teams.push(r?.team), t.group.trits.length === 5 && (yield t.group, delete t.group)
                }
            }
            t.run && (t.run.length <= 5 ? yield {
                kind: "Group",
                trits: Array(t.run.length).fill(t.run.trit),
                teams: t.run.trit === 0 ? [] : Array(t.run.length).fill(t.run.team)
            } : yield t.run), t.group && (yield t.group)
        }
        #e(e) {
            return e ? e.isBan ? 2 : 1 : 0
        }* decode(e) {
            let t = this.#n(e),
                r = this.#n(e.subarray(3, 6)),
                i = e.subarray(6, 6 + r),
                c = new x(e.subarray(6 + r));
            for (let s = 0; t > 0 && s < i.length; s++) {
                let l = i[s];
                if (l >= 244) {
                    let a = (l - 244) % 3 === 0 ? void 0 : {
                        isBan: (l - 244) % 3 === 2,
                        team: c.readU2()
                    };
                    if (l >= 253) {
                        let o = i[++s] + 9;
                        for (let u = 0; u < o; u++) t--, yield a
                    } else {
                        let o = Math.floor((l - 244) / 3) + 6;
                        for (let u = 0; u < o; u++) t--, yield a
                    }
                } else
                    for (let f = 0; t > 0 && f < 5; f++) {
                        let a = l % 3;
                        l = Math.floor(l / 3);
                        let o = a === 0 ? void 0 : {
                            isBan: a === 2,
                            team: c.readU2()
                        };
                        t--, yield o
                    }
            }
        }
        #r(e, t) {
            e.writeByte(t >>> 16 & 255), e.writeByte(t >>> 8 & 255), e.writeByte(t & 255)
        }
        #n(e) {
            return e[0] << 16 | e[1] << 8 | e[2]
        }
    },
    p = class {
        #t;
        #e;
        constructor() {
            this.#t = new Uint8Array(16), this.#e = 0
        }
        writeByte(e) {
            if (this.#e >= this.#t.length) {
                let t = this.#t;
                this.#t = new Uint8Array(t.length * 2), this.#t.set(t)
            }
            this.#t[this.#e++] = e
        }
        bytes() {
            return this.#t.subarray(0, this.#e)
        }
    },
    b = class {
        #t = new p;
        #e = 0;
        #r = 0;
        writeU2(e) {
            this.#e = this.#e << 2 | e & 3, this.#r += 2, this.#r === 8 && (this.#t.writeByte(this.#e), this.#e = 0, this.#r = 0)
        }
        flush() {
            if (this.#r > 0) {
                for (; this.#r < 8;) this.#e <<= 2, this.#r += 2;
                this.#t.writeByte(this.#e)
            }
            return this.#t.bytes()
        }
    },
    x = class {
        #t;
        #e = 0;
        #r = 0;
        #n = 8;
        constructor(e) {
            this.#t = e, this.#r = e[0]
        }
        readU2() {
            this.#n -= 2;
            let e = this.#r >>> this.#n & 3;
            return this.#n === 0 && (this.#n = 8, this.#e += 1, this.#e < this.#t.length && (this.#r = this.#t[this.#e])), e
        }
    };

function P(n, e, t) {
    n[e] = 3 + t
}
console.log("part-data-worker created");
var h = class extends Error {},
    w = class {
        #t = new AbortController;
        deregister() {
            removeEventListener("message", this.#e)
        }
        register() {
            addEventListener("message", this.#e)
        }
        #e = async e => {
            if (!e.isTrusted) return;
            let t = e.data;
            switch (t.type) {
                case "Fetch": {
                    let {
                        key: r,
                        partSize: i,
                        workerID: c
                    } = t, s, l = !1;
                    try {
                        s = await B(r, this.#t)
                    } catch (a) {
                        l = a instanceof h, !this.#t.signal.aborted && !(a instanceof h) && console.warn(a)
                    }
                    let f;
                    if (s)
                        if (r.kind === "deltas") f = new m(r.partitionXY, i).decode(new Uint8Array(s));
                        else {
                            let a = new g,
                                o = new Uint8Array(i * i),
                                u = 0;
                            for (let y of a.decode(new Uint8Array(s))) y ? y.isBan ? o[u] = 2 : P(o, u, y.team) : o[u] = 1, u++, u >= 1024e3 && await Promise.resolve();
                            f = o.buffer
                        } I({
                        type: "Cells",
                        cells: f,
                        key: r,
                        workerID: c,
                        is404Err: l
                    });
                    break
                }
                case "Kill":
                    this.#t.abort(), this.deregister(), setTimeout(() => {
                        console.log("part-data-worker destroyed"), close()
                    }, 1e3);
                    break;
                default:
            }
        }
    };
async function B(n, e) {
    let t = C(n),
        r = await fetch(t, {
            headers: {
                accept: "application/binary"
            },
            signal: e.signal
        });
    if (r.status === 404) throw new h;
    if (!r.ok) throw Error(`part fetch error ${r.status}: ${r.statusText} for ${t}`);
    let i = r.headers.get("Content-Type");
    if (!i?.startsWith("application/binary")) throw Error(`bad part fetch response type ${i} for ${t}`);
    return await r.arrayBuffer()
}

function I(n) {
    globalThis.postMessage(n, n.cells instanceof ArrayBuffer ? [n.cells] : [])
}
var D = new w;
D.register();