(() => {
    var rt = !1,
        nt = !1,
        U = [],
        it = -1;

    function Vt(e) {
        Sn(e)
    }

    function Sn(e) {
        U.includes(e) || U.push(e), An()
    }

    function ve(e) {
        let t = U.indexOf(e);
        t !== -1 && t > it && U.splice(t, 1)
    }

    function An() {
        !nt && !rt && (rt = !0, queueMicrotask(On))
    }

    function On() {
        rt = !1, nt = !0;
        for (let e = 0; e < U.length; e++) U[e](), it = e;
        U.length = 0, it = -1, nt = !1
    }
    var R, D, L, st, ot = !0;

    function qt(e) {
        ot = !1, e(), ot = !0
    }

    function Ut(e) {
        R = e.reactive, L = e.release, D = t => e.effect(t, {
            scheduler: r => {
                ot ? Vt(r) : r()
            }
        }), st = e.raw
    }

    function at(e) {
        D = e
    }

    function Wt(e) {
        let t = () => {};
        return [n => {
            let i = D(n);
            return e._x_effects || (e._x_effects = new Set, e._x_runEffects = () => {
                e._x_effects.forEach(o => o())
            }), e._x_effects.add(i), t = () => {
                i !== void 0 && (e._x_effects.delete(i), L(i))
            }, i
        }, () => {
            t()
        }]
    }

    function Se(e, t) {
        let r = !0,
            n, i = D(() => {
                let o = e();
                JSON.stringify(o), r ? n = o : queueMicrotask(() => {
                    t(o, n), n = o
                }), r = !1
            });
        return () => L(i)
    }

    function W(e, t, r = {}) {
        e.dispatchEvent(new CustomEvent(t, {
            detail: r,
            bubbles: !0,
            composed: !0,
            cancelable: !0
        }))
    }

    function C(e, t) {
        if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
            Array.from(e.children).forEach(i => C(i, t));
            return
        }
        let r = !1;
        if (t(e, () => r = !0), r) return;
        let n = e.firstElementChild;
        for (; n;) C(n, t, !1), n = n.nextElementSibling
    }

    function E(e, ...t) {
        console.warn(`Alpine Warning: ${e}`, ...t)
    }
    var Gt = !1;

    function Jt() {
        Gt && E("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), Gt = !0, document.body || E("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), W(document, "alpine:init"), W(document, "alpine:initializing"), le(), rr(t => S(t, C)), ee(t => ce(t)), Ce((t, r) => {
            ue(t, r).forEach(n => n())
        });
        let e = t => !G(t.parentElement, !0);
        Array.from(document.querySelectorAll(Zt().join(","))).filter(e).forEach(t => {
            S(t)
        }), W(document, "alpine:initialized")
    }
    var ct = [],
        Yt = [];

    function Xt() {
        return ct.map(e => e())
    }

    function Zt() {
        return ct.concat(Yt).map(e => e())
    }

    function Ae(e) {
        ct.push(e)
    }

    function Oe(e) {
        Yt.push(e)
    }

    function G(e, t = !1) {
        return j(e, r => {
            if ((t ? Zt() : Xt()).some(i => r.matches(i))) return !0
        })
    }

    function j(e, t) {
        if (e) {
            if (t(e)) return e;
            if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement) return j(e.parentElement, t)
        }
    }

    function Qt(e) {
        return Xt().some(t => e.matches(t))
    }
    var er = [];

    function tr(e) {
        er.push(e)
    }

    function S(e, t = C, r = () => {}) {
        ir(() => {
            t(e, (n, i) => {
                r(n, i), er.forEach(o => o(n, i)), ue(n, n.attributes).forEach(o => o()), n._x_ignore && i()
            })
        })
    }

    function ce(e, t = C) {
        t(e, r => {
            lt(r), nr(r)
        })
    }
    var or = [],
        sr = [],
        ar = [];

    function rr(e) {
        ar.push(e)
    }

    function ee(e, t) {
        typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, sr.push(t))
    }

    function Ce(e) {
        or.push(e)
    }

    function Re(e, t, r) {
        e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r)
    }

    function lt(e, t) {
        e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
            (t === void 0 || t.includes(r)) && (n.forEach(i => i()), delete e._x_attributeCleanups[r])
        })
    }

    function nr(e) {
        if (e._x_cleanups)
            for (; e._x_cleanups.length;) e._x_cleanups.pop()()
    }
    var ut = new MutationObserver(mt),
        ft = !1;

    function le() {
        ut.observe(document, {
            subtree: !0,
            childList: !0,
            attributes: !0,
            attributeOldValue: !0
        }), ft = !0
    }

    function dt() {
        Cn(), ut.disconnect(), ft = !1
    }
    var fe = [];

    function Cn() {
        let e = ut.takeRecords();
        fe.push(() => e.length > 0 && mt(e));
        let t = fe.length;
        queueMicrotask(() => {
            if (fe.length === t)
                for (; fe.length > 0;) fe.shift()()
        })
    }

    function _(e) {
        if (!ft) return e();
        dt();
        let t = e();
        return le(), t
    }
    var pt = !1,
        Te = [];

    function cr() {
        pt = !0
    }

    function lr() {
        pt = !1, mt(Te), Te = []
    }

    function mt(e) {
        if (pt) {
            Te = Te.concat(e);
            return
        }
        let t = new Set,
            r = new Set,
            n = new Map,
            i = new Map;
        for (let o = 0; o < e.length; o++)
            if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach(s => s.nodeType === 1 && t.add(s)), e[o].removedNodes.forEach(s => s.nodeType === 1 && r.add(s))), e[o].type === "attributes")) {
                let s = e[o].target,
                    a = e[o].attributeName,
                    c = e[o].oldValue,
                    l = () => {
                        n.has(s) || n.set(s, []), n.get(s).push({
                            name: a,
                            value: s.getAttribute(a)
                        })
                    },
                    u = () => {
                        i.has(s) || i.set(s, []), i.get(s).push(a)
                    };
                s.hasAttribute(a) && c === null ? l() : s.hasAttribute(a) ? (u(), l()) : u()
            }
        i.forEach((o, s) => {
            lt(s, o)
        }), n.forEach((o, s) => {
            or.forEach(a => a(s, o))
        });
        for (let o of r) t.has(o) || (sr.forEach(s => s(o)), ce(o));
        t.forEach(o => {
            o._x_ignoreSelf = !0, o._x_ignore = !0
        });
        for (let o of t) r.has(o) || o.isConnected && (delete o._x_ignoreSelf, delete o._x_ignore, ar.forEach(s => s(o)), o._x_ignore = !0, o._x_ignoreSelf = !0);
        t.forEach(o => {
            delete o._x_ignoreSelf, delete o._x_ignore
        }), t = null, r = null, n = null, i = null
    }

    function Me(e) {
        return B(F(e))
    }

    function P(e, t, r) {
        return e._x_dataStack = [t, ...F(r || e)], () => {
            e._x_dataStack = e._x_dataStack.filter(n => n !== t)
        }
    }

    function F(e) {
        return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? F(e.host) : e.parentNode ? F(e.parentNode) : []
    }

    function B(e) {
        return new Proxy({
            objects: e
        }, Tn)
    }
    var Tn = {
        ownKeys({
            objects: e
        }) {
            return Array.from(new Set(e.flatMap(t => Object.keys(t))))
        },
        has({
            objects: e
        }, t) {
            return t == Symbol.unscopables ? !1 : e.some(r => Object.prototype.hasOwnProperty.call(r, t) || Reflect.has(r, t))
        },
        get({
            objects: e
        }, t, r) {
            return t == "toJSON" ? Rn : Reflect.get(e.find(n => Reflect.has(n, t)) || {}, t, r)
        },
        set({
            objects: e
        }, t, r, n) {
            let i = e.find(s => Object.prototype.hasOwnProperty.call(s, t)) || e[e.length - 1],
                o = Object.getOwnPropertyDescriptor(i, t);
            return o?.set && o ?.get ? Reflect.set(i, t, r, n) : Reflect.set(i, t, r)
        }
    };

    function Rn() {
        return Reflect.ownKeys(this).reduce((t, r) => (t[r] = Reflect.get(this, r), t), {})
    }

    function Ne(e) {
        let t = n => typeof n == "object" && !Array.isArray(n) && n !== null,
            r = (n, i = "") => {
                Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o, {
                    value: s,
                    enumerable: a
                }]) => {
                    if (a === !1 || s === void 0 || typeof s == "object" && s !== null && s.__v_skip) return;
                    let c = i === "" ? o : `${i}.${o}`;
                    typeof s == "object" && s !== null && s._x_interceptor ? n[o] = s.initialize(e, c, o) : t(s) && s !== n && !(s instanceof Element) && r(s, c)
                })
            };
        return r(e)
    }

    function De(e, t = () => {}) {
        let r = {
            initialValue: void 0,
            _x_interceptor: !0,
            initialize(n, i, o) {
                return e(this.initialValue, () => Mn(n, i), s => _t(n, i, s), i, o)
            }
        };
        return t(r), n => {
            if (typeof n == "object" && n !== null && n._x_interceptor) {
                let i = r.initialize.bind(r);
                r.initialize = (o, s, a) => {
                    let c = n.initialize(o, s, a);
                    return r.initialValue = c, i(o, s, a)
                }
            } else r.initialValue = n;
            return r
        }
    }

    function Mn(e, t) {
        return t.split(".").reduce((r, n) => r[n], e)
    }

    function _t(e, t, r) {
        if (typeof t == "string" && (t = t.split(".")), t.length === 1) e[t[0]] = r;
        else {
            if (t.length === 0) throw error;
            return e[t[0]] || (e[t[0]] = {}), _t(e[t[0]], t.slice(1), r)
        }
    }
    var ur = {};

    function y(e, t) {
        ur[e] = t
    }

    function de(e, t) {
        return Object.entries(ur).forEach(([r, n]) => {
            let i = null;

            function o() {
                if (i) return i; {
                    let [s, a] = ht(t);
                    return i = {
                        interceptor: De,
                        ...s
                    }, ee(t, a), i
                }
            }
            Object.defineProperty(e, `$${r}`, {
                get() {
                    return n(t, o())
                },
                enumerable: !1
            })
        }), e
    }

    function fr(e, t, r, ...n) {
        try {
            return r(...n)
        } catch (i) {
            te(i, e, t)
        }
    }

    function te(e, t, r = void 0) {
        e = Object.assign(e ?? {
            message: "No error message given."
        }, {
            el: t,
            expression: r
        }), console.warn(`Alpine Expression Error: ${e.message}

${r?'Expression: "'+r+`"

`:""}`, t), setTimeout(() => {
            throw e
        }, 0)
    }
    var Pe = !0;

    function ke(e) {
        let t = Pe;
        Pe = !1;
        let r = e();
        return Pe = t, r
    }

    function M(e, t, r = {}) {
        let n;
        return x(e, t)(i => n = i, r), n
    }

    function x(...e) {
        return dr(...e)
    }
    var dr = xt;

    function pr(e) {
        dr = e
    }

    function xt(e, t) {
        let r = {};
        de(r, e);
        let n = [r, ...F(e)],
            i = typeof t == "function" ? Nn(n, t) : Pn(n, t, e);
        return fr.bind(null, e, t, i)
    }

    function Nn(e, t) {
        return (r = () => {}, {
            scope: n = {},
            params: i = []
        } = {}) => {
            let o = t.apply(B([n, ...e]), i);
            Ie(r, o)
        }
    }
    var gt = {};

    function Dn(e, t) {
        if (gt[e]) return gt[e];
        let r = Object.getPrototypeOf(async function() {}).constructor,
            n = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e,
            o = (() => {
                try {
                    let s = new r(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`);
                    return Object.defineProperty(s, "name", {
                        value: `[Alpine] ${e}`
                    }), s
                } catch (s) {
                    return te(s, t, e), Promise.resolve()
                }
            })();
        return gt[e] = o, o
    }

    function Pn(e, t, r) {
        let n = Dn(t, r);
        return (i = () => {}, {
            scope: o = {},
            params: s = []
        } = {}) => {
            n.result = void 0, n.finished = !1;
            let a = B([o, ...e]);
            if (typeof n == "function") {
                let c = n(n, a).catch(l => te(l, r, t));
                n.finished ? (Ie(i, n.result, a, s, r), n.result = void 0) : c.then(l => {
                    Ie(i, l, a, s, r)
                }).catch(l => te(l, r, t)).finally(() => n.result = void 0)
            }
        }
    }

    function Ie(e, t, r, n, i) {
        if (Pe && typeof t == "function") {
            let o = t.apply(r, n);
            o instanceof Promise ? o.then(s => Ie(e, s, r, n)).catch(s => te(s, i, t)) : e(o)
        } else typeof t == "object" && t instanceof Promise ? t.then(o => e(o)) : e(t)
    }
    var Et = "x-";

    function T(e = "") {
        return Et + e
    }

    function mr(e) {
        Et = e
    }
    var yt = {};

    function d(e, t) {
        return yt[e] = t, {
            before(r) {
                if (!yt[r]) {
                    console.warn(String.raw `Cannot find directive \`${r}\`. \`${e}\` will use the default order of execution`);
                    return
                }
                let n = J.indexOf(r);
                J.splice(n >= 0 ? n : J.indexOf("DEFAULT"), 0, e)
            }
        }
    }

    function ue(e, t, r) {
        if (t = Array.from(t), e._x_virtualDirectives) {
            let o = Object.entries(e._x_virtualDirectives).map(([a, c]) => ({
                    name: a,
                    value: c
                })),
                s = vt(o);
            o = o.map(a => s.find(c => c.name === a.name) ? {
                name: `x-bind:${a.name}`,
                value: `"${a.value}"`
            } : a), t = t.concat(o)
        }
        let n = {};
        return t.map(hr((o, s) => n[o] = s)).filter(xr).map(kn(n, r)).sort(Ln).map(o => In(e, o))
    }

    function vt(e) {
        return Array.from(e).map(hr()).filter(t => !xr(t))
    }
    var bt = !1,
        pe = new Map,
        _r = Symbol();

    function ir(e) {
        bt = !0;
        let t = Symbol();
        _r = t, pe.set(t, []);
        let r = () => {
                for (; pe.get(t).length;) pe.get(t).shift()();
                pe.delete(t)
            },
            n = () => {
                bt = !1, r()
            };
        e(r), n()
    }

    function ht(e) {
        let t = [],
            r = a => t.push(a),
            [n, i] = Wt(e);
        return t.push(i), [{
            Alpine: z,
            effect: n,
            cleanup: r,
            evaluateLater: x.bind(x, e),
            evaluate: M.bind(M, e)
        }, () => t.forEach(a => a())]
    }

    function In(e, t) {
        let r = () => {},
            n = yt[t.type] || r,
            [i, o] = ht(e);
        Re(e, t.original, o);
        let s = () => {
            e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i), n = n.bind(n, e, t, i), bt ? pe.get(_r).push(n) : n())
        };
        return s.runCleanups = o, s
    }
    var Le = (e, t) => ({
            name: r,
            value: n
        }) => (r.startsWith(e) && (r = r.replace(e, t)), {
            name: r,
            value: n
        }),
        $e = e => e;

    function hr(e = () => {}) {
        return ({
            name: t,
            value: r
        }) => {
            let {
                name: n,
                value: i
            } = gr.reduce((o, s) => s(o), {
                name: t,
                value: r
            });
            return n !== t && e(n, t), {
                name: n,
                value: i
            }
        }
    }
    var gr = [];

    function re(e) {
        gr.push(e)
    }

    function xr({
        name: e
    }) {
        return yr().test(e)
    }
    var yr = () => new RegExp(`^${Et}([^:^.]+)\\b`);

    function kn(e, t) {
        return ({
            name: r,
            value: n
        }) => {
            let i = r.match(yr()),
                o = r.match(/:([a-zA-Z0-9\-_:]+)/),
                s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                a = t || e[r] || r;
            return {
                type: i ? i[1] : null,
                value: o ? o[1] : null,
                modifiers: s.map(c => c.replace(".", "")),
                expression: n,
                original: a
            }
        }
    }
    var wt = "DEFAULT",
        J = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", wt, "teleport"];

    function Ln(e, t) {
        let r = J.indexOf(e.type) === -1 ? wt : e.type,
            n = J.indexOf(t.type) === -1 ? wt : t.type;
        return J.indexOf(r) - J.indexOf(n)
    }
    var St = [],
        At = !1;

    function ne(e = () => {}) {
        return queueMicrotask(() => {
            At || setTimeout(() => {
                je()
            })
        }), new Promise(t => {
            St.push(() => {
                e(), t()
            })
        })
    }

    function je() {
        for (At = !1; St.length;) St.shift()()
    }

    function br() {
        At = !0
    }

    function me(e, t) {
        return Array.isArray(t) ? wr(e, t.join(" ")) : typeof t == "object" && t !== null ? $n(e, t) : typeof t == "function" ? me(e, t()) : wr(e, t)
    }

    function wr(e, t) {
        let r = o => o.split(" ").filter(Boolean),
            n = o => o.split(" ").filter(s => !e.classList.contains(s)).filter(Boolean),
            i = o => (e.classList.add(...o), () => {
                e.classList.remove(...o)
            });
        return t = t === !0 ? t = "" : t || "", i(n(t))
    }

    function $n(e, t) {
        let r = a => a.split(" ").filter(Boolean),
            n = Object.entries(t).flatMap(([a, c]) => c ? r(a) : !1).filter(Boolean),
            i = Object.entries(t).flatMap(([a, c]) => c ? !1 : r(a)).filter(Boolean),
            o = [],
            s = [];
        return i.forEach(a => {
            e.classList.contains(a) && (e.classList.remove(a), s.push(a))
        }), n.forEach(a => {
            e.classList.contains(a) || (e.classList.add(a), o.push(a))
        }), () => {
            s.forEach(a => e.classList.add(a)), o.forEach(a => e.classList.remove(a))
        }
    }

    function Y(e, t) {
        return typeof t == "object" && t !== null ? jn(e, t) : Fn(e, t)
    }

    function jn(e, t) {
        let r = {};
        return Object.entries(t).forEach(([n, i]) => {
            r[n] = e.style[n], n.startsWith("--") || (n = Bn(n)), e.style.setProperty(n, i)
        }), setTimeout(() => {
            e.style.length === 0 && e.removeAttribute("style")
        }), () => {
            Y(e, r)
        }
    }

    function Fn(e, t) {
        let r = e.getAttribute("style", t);
        return e.setAttribute("style", t), () => {
            e.setAttribute("style", r || "")
        }
    }

    function Bn(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    function _e(e, t = () => {}) {
        let r = !1;
        return function() {
            r ? t.apply(this, arguments) : (r = !0, e.apply(this, arguments))
        }
    }
    d("transition", (e, {
        value: t,
        modifiers: r,
        expression: n
    }, {
        evaluate: i
    }) => {
        typeof n == "function" && (n = i(n)), n !== !1 && (!n || typeof n == "boolean" ? Kn(e, r, t) : zn(e, n, t))
    });

    function zn(e, t, r) {
        Er(e, me, ""), {
            enter: i => {
                e._x_transition.enter.during = i
            },
            "enter-start": i => {
                e._x_transition.enter.start = i
            },
            "enter-end": i => {
                e._x_transition.enter.end = i
            },
            leave: i => {
                e._x_transition.leave.during = i
            },
            "leave-start": i => {
                e._x_transition.leave.start = i
            },
            "leave-end": i => {
                e._x_transition.leave.end = i
            }
        }[r](t)
    }

    function Kn(e, t, r) {
        Er(e, Y);
        let n = !t.includes("in") && !t.includes("out") && !r,
            i = n || t.includes("in") || ["enter"].includes(r),
            o = n || t.includes("out") || ["leave"].includes(r);
        t.includes("in") && !n && (t = t.filter((g, b) => b < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((g, b) => b > t.indexOf("out")));
        let s = !t.includes("opacity") && !t.includes("scale"),
            a = s || t.includes("opacity"),
            c = s || t.includes("scale"),
            l = a ? 0 : 1,
            u = c ? he(t, "scale", 95) / 100 : 1,
            p = he(t, "delay", 0) / 1e3,
            m = he(t, "origin", "center"),
            w = "opacity, transform",
            $ = he(t, "duration", 150) / 1e3,
            Ee = he(t, "duration", 75) / 1e3,
            f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
        i && (e._x_transition.enter.during = {
            transformOrigin: m,
            transitionDelay: `${p}s`,
            transitionProperty: w,
            transitionDuration: `${$}s`,
            transitionTimingFunction: f
        }, e._x_transition.enter.start = {
            opacity: l,
            transform: `scale(${u})`
        }, e._x_transition.enter.end = {
            opacity: 1,
            transform: "scale(1)"
        }), o && (e._x_transition.leave.during = {
            transformOrigin: m,
            transitionDelay: `${p}s`,
            transitionProperty: w,
            transitionDuration: `${Ee}s`,
            transitionTimingFunction: f
        }, e._x_transition.leave.start = {
            opacity: 1,
            transform: "scale(1)"
        }, e._x_transition.leave.end = {
            opacity: l,
            transform: `scale(${u})`
        })
    }

    function Er(e, t, r = {}) {
        e._x_transition || (e._x_transition = {
            enter: {
                during: r,
                start: r,
                end: r
            },
            leave: {
                during: r,
                start: r,
                end: r
            },
            in (n = () => {}, i = () => {}) {
                Fe(e, t, {
                    during: this.enter.during,
                    start: this.enter.start,
                    end: this.enter.end
                }, n, i)
            },
            out(n = () => {}, i = () => {}) {
                Fe(e, t, {
                    during: this.leave.during,
                    start: this.leave.start,
                    end: this.leave.end
                }, n, i)
            }
        })
    }
    window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, r, n) {
        let i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout,
            o = () => i(r);
        if (t) {
            e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : o() : e._x_transition ? e._x_transition.in(r) : o();
            return
        }
        e._x_hidePromise = e._x_transition ? new Promise((s, a) => {
            e._x_transition.out(() => {}, () => s(n)), e._x_transitioning && e._x_transitioning.beforeCancel(() => a({
                isFromCancelledTransition: !0
            }))
        }) : Promise.resolve(n), queueMicrotask(() => {
            let s = vr(e);
            s ? (s._x_hideChildren || (s._x_hideChildren = []), s._x_hideChildren.push(e)) : i(() => {
                let a = c => {
                    let l = Promise.all([c._x_hidePromise, ...(c._x_hideChildren || []).map(a)]).then(([u]) => u());
                    return delete c._x_hidePromise, delete c._x_hideChildren, l
                };
                a(e).catch(c => {
                    if (!c.isFromCancelledTransition) throw c
                })
            })
        })
    };

    function vr(e) {
        let t = e.parentNode;
        if (t) return t._x_hidePromise ? t : vr(t)
    }

    function Fe(e, t, {
        during: r,
        start: n,
        end: i
    } = {}, o = () => {}, s = () => {}) {
        if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
            o(), s();
            return
        }
        let a, c, l;
        Hn(e, {
            start() {
                a = t(e, n)
            },
            during() {
                c = t(e, r)
            },
            before: o,
            end() {
                a(), l = t(e, i)
            },
            after: s,
            cleanup() {
                c(), l()
            }
        })
    }

    function Hn(e, t) {
        let r, n, i, o = _e(() => {
            _(() => {
                r = !0, n || t.before(), i || (t.end(), je()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning
            })
        });
        e._x_transitioning = {
            beforeCancels: [],
            beforeCancel(s) {
                this.beforeCancels.push(s)
            },
            cancel: _e(function() {
                for (; this.beforeCancels.length;) this.beforeCancels.shift()();
                o()
            }),
            finish: o
        }, _(() => {
            t.start(), t.during()
        }), br(), requestAnimationFrame(() => {
            if (r) return;
            let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3,
                a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
            s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), _(() => {
                t.before()
            }), n = !0, requestAnimationFrame(() => {
                r || (_(() => {
                    t.end()
                }), je(), setTimeout(e._x_transitioning.finish, s + a), i = !0)
            })
        })
    }

    function he(e, t, r) {
        if (e.indexOf(t) === -1) return r;
        let n = e[e.indexOf(t) + 1];
        if (!n || t === "scale" && isNaN(n)) return r;
        if (t === "duration" || t === "delay") {
            let i = n.match(/([0-9]+)ms/);
            if (i) return i[1]
        }
        return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n
    }
    var I = !1;

    function A(e, t = () => {}) {
        return (...r) => I ? t(...r) : e(...r)
    }

    function Sr(e) {
        return (...t) => I && e(...t)
    }
    var Ar = [];

    function K(e) {
        Ar.push(e)
    }

    function Or(e, t) {
        Ar.forEach(r => r(e, t)), I = !0, Tr(() => {
            S(t, (r, n) => {
                n(r, () => {})
            })
        }), I = !1
    }
    var Be = !1;

    function Cr(e, t) {
        t._x_dataStack || (t._x_dataStack = e._x_dataStack), I = !0, Be = !0, Tr(() => {
            Vn(t)
        }), I = !1, Be = !1
    }

    function Vn(e) {
        let t = !1;
        S(e, (n, i) => {
            C(n, (o, s) => {
                if (t && Qt(o)) return s();
                t = !0, i(o, s)
            })
        })
    }

    function Tr(e) {
        let t = D;
        at((r, n) => {
            let i = t(r);
            return L(i), () => {}
        }), e(), at(t)
    }

    function ge(e, t, r, n = []) {
        switch (e._x_bindings || (e._x_bindings = R({})), e._x_bindings[t] = r, t = n.includes("camel") ? Zn(t) : t, t) {
            case "value":
                qn(e, r);
                break;
            case "style":
                Wn(e, r);
                break;
            case "class":
                Un(e, r);
                break;
            case "selected":
            case "checked":
                Gn(e, t, r);
                break;
            default:
                Mr(e, t, r);
                break
        }
    }

    function qn(e, t) {
        if (e.type === "radio") e.attributes.value === void 0 && (e.value = t), window.fromModel && (typeof t == "boolean" ? e.checked = xe(e.value) === t : e.checked = Rr(e.value, t));
        else if (e.type === "checkbox") Number.isInteger(t) ? e.value = t : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some(r => Rr(r, e.value)) : e.checked = !!t;
        else if (e.tagName === "SELECT") Xn(e, t);
        else {
            if (e.value === t) return;
            e.value = t === void 0 ? "" : t
        }
    }

    function Un(e, t) {
        e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = me(e, t)
    }

    function Wn(e, t) {
        e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = Y(e, t)
    }

    function Gn(e, t, r) {
        Mr(e, t, r), Yn(e, t, r)
    }

    function Mr(e, t, r) {
        [null, void 0, !1].includes(r) && Qn(t) ? e.removeAttribute(t) : (Nr(t) && (r = t), Jn(e, t, r))
    }

    function Jn(e, t, r) {
        e.getAttribute(t) != r && e.setAttribute(t, r)
    }

    function Yn(e, t, r) {
        e[t] !== r && (e[t] = r)
    }

    function Xn(e, t) {
        let r = [].concat(t).map(n => n + "");
        Array.from(e.options).forEach(n => {
            n.selected = r.includes(n.value)
        })
    }

    function Zn(e) {
        return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase())
    }

    function Rr(e, t) {
        return e == t
    }

    function xe(e) {
        return [1, "1", "true", "on", "yes", !0].includes(e) ? !0 : [0, "0", "false", "off", "no", !1].includes(e) ? !1 : e ? Boolean(e) : null
    }

    function Nr(e) {
        return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e)
    }

    function Qn(e) {
        return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e)
    }

    function Dr(e, t, r) {
        return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : Ir(e, t, r)
    }

    function Pr(e, t, r, n = !0) {
        if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
        if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
            let i = e._x_inlineBindings[t];
            return i.extract = n, ke(() => M(e, i.expression))
        }
        return Ir(e, t, r)
    }

    function Ir(e, t, r) {
        let n = e.getAttribute(t);
        return n === null ? typeof r == "function" ? r() : r : n === "" ? !0 : Nr(t) ? !![t, "true"].includes(n) : n
    }

    function ze(e, t) {
        var r;
        return function() {
            var n = this,
                i = arguments,
                o = function() {
                    r = null, e.apply(n, i)
                };
            clearTimeout(r), r = setTimeout(o, t)
        }
    }

    function Ke(e, t) {
        let r;
        return function() {
            let n = this,
                i = arguments;
            r || (e.apply(n, i), r = !0, setTimeout(() => r = !1, t))
        }
    }

    function He({
        get: e,
        set: t
    }, {
        get: r,
        set: n
    }) {
        let i = !0,
            o, s, a = D(() => {
                let c = e(),
                    l = r();
                if (i) n(Ot(c)), i = !1;
                else {
                    let u = JSON.stringify(c),
                        p = JSON.stringify(l);
                    u !== o ? n(Ot(c)) : u !== p && t(Ot(l))
                }
                o = JSON.stringify(e()), s = JSON.stringify(r())
            });
        return () => {
            L(a)
        }
    }

    function Ot(e) {
        return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e
    }

    function kr(e) {
        (Array.isArray(e) ? e : [e]).forEach(r => r(z))
    }
    var X = {},
        Lr = !1;

    function $r(e, t) {
        if (Lr || (X = R(X), Lr = !0), t === void 0) return X[e];
        X[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && X[e].init(), Ne(X[e])
    }

    function jr() {
        return X
    }
    var Fr = {};

    function Br(e, t) {
        let r = typeof t != "function" ? () => t : t;
        return e instanceof Element ? Ct(e, r()) : (Fr[e] = r, () => {})
    }

    function zr(e) {
        return Object.entries(Fr).forEach(([t, r]) => {
            Object.defineProperty(e, t, {
                get() {
                    return (...n) => r(...n)
                }
            })
        }), e
    }

    function Ct(e, t, r) {
        let n = [];
        for (; n.length;) n.pop()();
        let i = Object.entries(t).map(([s, a]) => ({
                name: s,
                value: a
            })),
            o = vt(i);
        return i = i.map(s => o.find(a => a.name === s.name) ? {
            name: `x-bind:${s.name}`,
            value: `"${s.value}"`
        } : s), ue(e, i, r).map(s => {
            n.push(s.runCleanups), s()
        }), () => {
            for (; n.length;) n.pop()()
        }
    }
    var Kr = {};

    function Hr(e, t) {
        Kr[e] = t
    }

    function Vr(e, t) {
        return Object.entries(Kr).forEach(([r, n]) => {
            Object.defineProperty(e, r, {
                get() {
                    return (...i) => n.bind(t)(...i)
                },
                enumerable: !1
            })
        }), e
    }
    var ei = {
            get reactive() {
                return R
            },
            get release() {
                return L
            },
            get effect() {
                return D
            },
            get raw() {
                return st
            },
            version: "3.13.7",
            flushAndStopDeferringMutations: lr,
            dontAutoEvaluateFunctions: ke,
            disableEffectScheduling: qt,
            startObservingMutations: le,
            stopObservingMutations: dt,
            setReactivityEngine: Ut,
            onAttributeRemoved: Re,
            onAttributesAdded: Ce,
            closestDataStack: F,
            skipDuringClone: A,
            onlyDuringClone: Sr,
            addRootSelector: Ae,
            addInitSelector: Oe,
            interceptClone: K,
            addScopeToNode: P,
            deferMutations: cr,
            mapAttributes: re,
            evaluateLater: x,
            interceptInit: tr,
            setEvaluator: pr,
            mergeProxies: B,
            extractProp: Pr,
            findClosest: j,
            onElRemoved: ee,
            closestRoot: G,
            destroyTree: ce,
            interceptor: De,
            transition: Fe,
            setStyles: Y,
            mutateDom: _,
            directive: d,
            entangle: He,
            throttle: Ke,
            debounce: ze,
            evaluate: M,
            initTree: S,
            nextTick: ne,
            prefixed: T,
            prefix: mr,
            plugin: kr,
            magic: y,
            store: $r,
            start: Jt,
            clone: Cr,
            cloneNode: Or,
            bound: Dr,
            $data: Me,
            watch: Se,
            walk: C,
            data: Hr,
            bind: Br
        },
        z = ei;

    function Tt(e, t) {
        let r = Object.create(null),
            n = e.split(",");
        for (let i = 0; i < n.length; i++) r[n[i]] = !0;
        return t ? i => !!r[i.toLowerCase()] : i => !!r[i]
    }
    var ti = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
    var Ts = Tt(ti + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
    var qr = Object.freeze({}),
        Rs = Object.freeze([]);
    var ri = Object.prototype.hasOwnProperty,
        ye = (e, t) => ri.call(e, t),
        H = Array.isArray,
        ie = e => Ur(e) === "[object Map]";
    var ni = e => typeof e == "string",
        Ve = e => typeof e == "symbol",
        be = e => e !== null && typeof e == "object";
    var ii = Object.prototype.toString,
        Ur = e => ii.call(e),
        Rt = e => Ur(e).slice(8, -1);
    var qe = e => ni(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
    var Ue = e => {
            let t = Object.create(null);
            return r => t[r] || (t[r] = e(r))
        },
        oi = /-(\w)/g,
        Ms = Ue(e => e.replace(oi, (t, r) => r ? r.toUpperCase() : "")),
        si = /\B([A-Z])/g,
        Ns = Ue(e => e.replace(si, "-$1").toLowerCase()),
        Mt = Ue(e => e.charAt(0).toUpperCase() + e.slice(1)),
        Ds = Ue(e => e ? `on${Mt(e)}` : ""),
        Nt = (e, t) => e !== t && (e === e || t === t);
    var Dt = new WeakMap,
        we = [],
        k, Z = Symbol("iterate"),
        Pt = Symbol("Map key iterate");

    function ai(e) {
        return e && e._isEffect === !0
    }

    function Zr(e, t = qr) {
        ai(e) && (e = e.raw);
        let r = li(e, t);
        return t.lazy || r(), r
    }

    function Qr(e) {
        e.active && (en(e), e.options.onStop && e.options.onStop(), e.active = !1)
    }
    var ci = 0;

    function li(e, t) {
        let r = function() {
            if (!r.active) return e();
            if (!we.includes(r)) {
                en(r);
                try {
                    return fi(), we.push(r), k = r, e()
                } finally {
                    we.pop(), tn(), k = we[we.length - 1]
                }
            }
        };
        return r.id = ci++, r.allowRecurse = !!t.allowRecurse, r._isEffect = !0, r.active = !0, r.raw = e, r.deps = [], r.options = t, r
    }

    function en(e) {
        let {
            deps: t
        } = e;
        if (t.length) {
            for (let r = 0; r < t.length; r++) t[r].delete(e);
            t.length = 0
        }
    }
    var oe = !0,
        kt = [];

    function ui() {
        kt.push(oe), oe = !1
    }

    function fi() {
        kt.push(oe), oe = !0
    }

    function tn() {
        let e = kt.pop();
        oe = e === void 0 ? !0 : e
    }

    function N(e, t, r) {
        if (!oe || k === void 0) return;
        let n = Dt.get(e);
        n || Dt.set(e, n = new Map);
        let i = n.get(r);
        i || n.set(r, i = new Set), i.has(k) || (i.add(k), k.deps.push(i), k.options.onTrack && k.options.onTrack({
            effect: k,
            target: e,
            type: t,
            key: r
        }))
    }

    function q(e, t, r, n, i, o) {
        let s = Dt.get(e);
        if (!s) return;
        let a = new Set,
            c = u => {
                u && u.forEach(p => {
                    (p !== k || p.allowRecurse) && a.add(p)
                })
            };
        if (t === "clear") s.forEach(c);
        else if (r === "length" && H(e)) s.forEach((u, p) => {
            (p === "length" || p >= n) && c(u)
        });
        else switch (r !== void 0 && c(s.get(r)), t) {
            case "add":
                H(e) ? qe(r) && c(s.get("length")) : (c(s.get(Z)), ie(e) && c(s.get(Pt)));
                break;
            case "delete":
                H(e) || (c(s.get(Z)), ie(e) && c(s.get(Pt)));
                break;
            case "set":
                ie(e) && c(s.get(Z));
                break
        }
        let l = u => {
            u.options.onTrigger && u.options.onTrigger({
                effect: u,
                target: e,
                key: r,
                type: t,
                newValue: n,
                oldValue: i,
                oldTarget: o
            }), u.options.scheduler ? u.options.scheduler(u) : u()
        };
        a.forEach(l)
    }
    var di = Tt("__proto__,__v_isRef,__isVue"),
        rn = new Set(Object.getOwnPropertyNames(Symbol).map(e => Symbol[e]).filter(Ve)),
        pi = nn();
    var mi = nn(!0);
    var Wr = _i();

    function _i() {
        let e = {};
        return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
            e[t] = function(...r) {
                let n = h(this);
                for (let o = 0, s = this.length; o < s; o++) N(n, "get", o + "");
                let i = n[t](...r);
                return i === -1 || i === !1 ? n[t](...r.map(h)) : i
            }
        }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
            e[t] = function(...r) {
                ui();
                let n = h(this)[t].apply(this, r);
                return tn(), n
            }
        }), e
    }

    function nn(e = !1, t = !1) {
        return function(n, i, o) {
            if (i === "__v_isReactive") return !e;
            if (i === "__v_isReadonly") return e;
            if (i === "__v_raw" && o === (e ? t ? Ni : cn : t ? Mi : an).get(n)) return n;
            let s = H(n);
            if (!e && s && ye(Wr, i)) return Reflect.get(Wr, i, o);
            let a = Reflect.get(n, i, o);
            return (Ve(i) ? rn.has(i) : di(i)) || (e || N(n, "get", i), t) ? a : It(a) ? !s || !qe(i) ? a.value : a : be(a) ? e ? ln(a) : Qe(a) : a
        }
    }
    var hi = gi();

    function gi(e = !1) {
        return function(r, n, i, o) {
            let s = r[n];
            if (!e && (i = h(i), s = h(s), !H(r) && It(s) && !It(i))) return s.value = i, !0;
            let a = H(r) && qe(n) ? Number(n) < r.length : ye(r, n),
                c = Reflect.set(r, n, i, o);
            return r === h(o) && (a ? Nt(i, s) && q(r, "set", n, i, s) : q(r, "add", n, i)), c
        }
    }

    function xi(e, t) {
        let r = ye(e, t),
            n = e[t],
            i = Reflect.deleteProperty(e, t);
        return i && r && q(e, "delete", t, void 0, n), i
    }

    function yi(e, t) {
        let r = Reflect.has(e, t);
        return (!Ve(t) || !rn.has(t)) && N(e, "has", t), r
    }

    function bi(e) {
        return N(e, "iterate", H(e) ? "length" : Z), Reflect.ownKeys(e)
    }
    var wi = {
            get: pi,
            set: hi,
            deleteProperty: xi,
            has: yi,
            ownKeys: bi
        },
        Ei = {
            get: mi,
            set(e, t) {
                return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0
            },
            deleteProperty(e, t) {
                return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0
            }
        };
    var Lt = e => be(e) ? Qe(e) : e,
        $t = e => be(e) ? ln(e) : e,
        jt = e => e,
        Ze = e => Reflect.getPrototypeOf(e);

    function We(e, t, r = !1, n = !1) {
        e = e.__v_raw;
        let i = h(e),
            o = h(t);
        t !== o && !r && N(i, "get", t), !r && N(i, "get", o);
        let {
            has: s
        } = Ze(i), a = n ? jt : r ? $t : Lt;
        if (s.call(i, t)) return a(e.get(t));
        if (s.call(i, o)) return a(e.get(o));
        e !== i && e.get(t)
    }

    function Ge(e, t = !1) {
        let r = this.__v_raw,
            n = h(r),
            i = h(e);
        return e !== i && !t && N(n, "has", e), !t && N(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i)
    }

    function Je(e, t = !1) {
        return e = e.__v_raw, !t && N(h(e), "iterate", Z), Reflect.get(e, "size", e)
    }

    function Gr(e) {
        e = h(e);
        let t = h(this);
        return Ze(t).has.call(t, e) || (t.add(e), q(t, "add", e, e)), this
    }

    function Jr(e, t) {
        t = h(t);
        let r = h(this),
            {
                has: n,
                get: i
            } = Ze(r),
            o = n.call(r, e);
        o ? sn(r, n, e) : (e = h(e), o = n.call(r, e));
        let s = i.call(r, e);
        return r.set(e, t), o ? Nt(t, s) && q(r, "set", e, t, s) : q(r, "add", e, t), this
    }

    function Yr(e) {
        let t = h(this),
            {
                has: r,
                get: n
            } = Ze(t),
            i = r.call(t, e);
        i ? sn(t, r, e) : (e = h(e), i = r.call(t, e));
        let o = n ? n.call(t, e) : void 0,
            s = t.delete(e);
        return i && q(t, "delete", e, void 0, o), s
    }

    function Xr() {
        let e = h(this),
            t = e.size !== 0,
            r = ie(e) ? new Map(e) : new Set(e),
            n = e.clear();
        return t && q(e, "clear", void 0, void 0, r), n
    }

    function Ye(e, t) {
        return function(n, i) {
            let o = this,
                s = o.__v_raw,
                a = h(s),
                c = t ? jt : e ? $t : Lt;
            return !e && N(a, "iterate", Z), s.forEach((l, u) => n.call(i, c(l), c(u), o))
        }
    }

    function Xe(e, t, r) {
        return function(...n) {
            let i = this.__v_raw,
                o = h(i),
                s = ie(o),
                a = e === "entries" || e === Symbol.iterator && s,
                c = e === "keys" && s,
                l = i[e](...n),
                u = r ? jt : t ? $t : Lt;
            return !t && N(o, "iterate", c ? Pt : Z), {
                next() {
                    let {
                        value: p,
                        done: m
                    } = l.next();
                    return m ? {
                        value: p,
                        done: m
                    } : {
                        value: a ? [u(p[0]), u(p[1])] : u(p),
                        done: m
                    }
                },
                [Symbol.iterator]() {
                    return this
                }
            }
        }
    }

    function V(e) {
        return function(...t) {
            {
                let r = t[0] ? `on key "${t[0]}" ` : "";
                console.warn(`${Mt(e)} operation ${r}failed: target is readonly.`, h(this))
            }
            return e === "delete" ? !1 : this
        }
    }

    function vi() {
        let e = {
                get(o) {
                    return We(this, o)
                },
                get size() {
                    return Je(this)
                },
                has: Ge,
                add: Gr,
                set: Jr,
                delete: Yr,
                clear: Xr,
                forEach: Ye(!1, !1)
            },
            t = {
                get(o) {
                    return We(this, o, !1, !0)
                },
                get size() {
                    return Je(this)
                },
                has: Ge,
                add: Gr,
                set: Jr,
                delete: Yr,
                clear: Xr,
                forEach: Ye(!1, !0)
            },
            r = {
                get(o) {
                    return We(this, o, !0)
                },
                get size() {
                    return Je(this, !0)
                },
                has(o) {
                    return Ge.call(this, o, !0)
                },
                add: V("add"),
                set: V("set"),
                delete: V("delete"),
                clear: V("clear"),
                forEach: Ye(!0, !1)
            },
            n = {
                get(o) {
                    return We(this, o, !0, !0)
                },
                get size() {
                    return Je(this, !0)
                },
                has(o) {
                    return Ge.call(this, o, !0)
                },
                add: V("add"),
                set: V("set"),
                delete: V("delete"),
                clear: V("clear"),
                forEach: Ye(!0, !0)
            };
        return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
            e[o] = Xe(o, !1, !1), r[o] = Xe(o, !0, !1), t[o] = Xe(o, !1, !0), n[o] = Xe(o, !0, !0)
        }), [e, r, t, n]
    }
    var [Si, Ai, Oi, Ci] = vi();

    function on(e, t) {
        let r = t ? e ? Ci : Oi : e ? Ai : Si;
        return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(ye(r, i) && i in n ? r : n, i, o)
    }
    var Ti = {
        get: on(!1, !1)
    };
    var Ri = {
        get: on(!0, !1)
    };

    function sn(e, t, r) {
        let n = h(r);
        if (n !== r && t.call(e, n)) {
            let i = Rt(e);
            console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
        }
    }
    var an = new WeakMap,
        Mi = new WeakMap,
        cn = new WeakMap,
        Ni = new WeakMap;

    function Di(e) {
        switch (e) {
            case "Object":
            case "Array":
                return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
                return 2;
            default:
                return 0
        }
    }

    function Pi(e) {
        return e.__v_skip || !Object.isExtensible(e) ? 0 : Di(Rt(e))
    }

    function Qe(e) {
        return e && e.__v_isReadonly ? e : un(e, !1, wi, Ti, an)
    }

    function ln(e) {
        return un(e, !0, Ei, Ri, cn)
    }

    function un(e, t, r, n, i) {
        if (!be(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
        if (e.__v_raw && !(t && e.__v_isReactive)) return e;
        let o = i.get(e);
        if (o) return o;
        let s = Pi(e);
        if (s === 0) return e;
        let a = new Proxy(e, s === 2 ? n : r);
        return i.set(e, a), a
    }

    function h(e) {
        return e && h(e.__v_raw) || e
    }

    function It(e) {
        return Boolean(e && e.__v_isRef === !0)
    }
    y("nextTick", () => ne);
    y("dispatch", e => W.bind(W, e));
    y("watch", (e, {
        evaluateLater: t,
        cleanup: r
    }) => (n, i) => {
        let o = t(n),
            a = Se(() => {
                let c;
                return o(l => c = l), c
            }, i);
        r(a)
    });
    y("store", jr);
    y("data", e => Me(e));
    y("root", e => G(e));
    y("refs", e => (e._x_refs_proxy || (e._x_refs_proxy = B(Ii(e))), e._x_refs_proxy));

    function Ii(e) {
        let t = [];
        return j(e, r => {
            r._x_refs && t.push(r._x_refs)
        }), t
    }
    var Ft = {};

    function Bt(e) {
        return Ft[e] || (Ft[e] = 0), ++Ft[e]
    }

    function fn(e, t) {
        return j(e, r => {
            if (r._x_ids && r._x_ids[t]) return !0
        })
    }

    function dn(e, t) {
        e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Bt(t))
    }
    y("id", (e, {
        cleanup: t
    }) => (r, n = null) => {
        let i = `${r}${n?`-${n}`:""}`;
        return ki(e, i, t, () => {
            let o = fn(e, r),
                s = o ? o._x_ids[r] : Bt(r);
            return n ? `${r}-${s}-${n}` : `${r}-${s}`
        })
    });
    K((e, t) => {
        e._x_id && (t._x_id = e._x_id)
    });

    function ki(e, t, r, n) {
        if (e._x_id || (e._x_id = {}), e._x_id[t]) return e._x_id[t];
        let i = n();
        return e._x_id[t] = i, r(() => {
            delete e._x_id[t]
        }), i
    }
    y("el", e => e);
    pn("Focus", "focus", "focus");
    pn("Persist", "persist", "persist");

    function pn(e, t, r) {
        y(t, n => E(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n))
    }
    d("modelable", (e, {
        expression: t
    }, {
        effect: r,
        evaluateLater: n,
        cleanup: i
    }) => {
        let o = n(t),
            s = () => {
                let u;
                return o(p => u = p), u
            },
            a = n(`${t} = __placeholder`),
            c = u => a(() => {}, {
                scope: {
                    __placeholder: u
                }
            }),
            l = s();
        c(l), queueMicrotask(() => {
            if (!e._x_model) return;
            e._x_removeModelListeners.default();
            let u = e._x_model.get,
                p = e._x_model.set,
                m = He({
                    get() {
                        return u()
                    },
                    set(w) {
                        p(w)
                    }
                }, {
                    get() {
                        return s()
                    },
                    set(w) {
                        c(w)
                    }
                });
            i(m)
        })
    });
    d("teleport", (e, {
        modifiers: t,
        expression: r
    }, {
        cleanup: n
    }) => {
        e.tagName.toLowerCase() !== "template" && E("x-teleport can only be used on a <template> tag", e);
        let i = mn(r),
            o = e.content.cloneNode(!0).firstElementChild;
        e._x_teleport = o, o._x_teleportBack = e, e.setAttribute("data-teleport-template", !0), o.setAttribute("data-teleport-target", !0), e._x_forwardEvents && e._x_forwardEvents.forEach(a => {
            o.addEventListener(a, c => {
                c.stopPropagation(), e.dispatchEvent(new c.constructor(c.type, c))
            })
        }), P(o, {}, e);
        let s = (a, c, l) => {
            l.includes("prepend") ? c.parentNode.insertBefore(a, c) : l.includes("append") ? c.parentNode.insertBefore(a, c.nextSibling) : c.appendChild(a)
        };
        _(() => {
            s(o, i, t), S(o), o._x_ignore = !0
        }), e._x_teleportPutBack = () => {
            let a = mn(r);
            _(() => {
                s(e._x_teleport, a, t)
            })
        }, n(() => o.remove())
    });
    var Li = document.createElement("div");

    function mn(e) {
        let t = A(() => document.querySelector(e), () => Li)();
        return t || E(`Cannot find x-teleport element for selector: "${e}"`), t
    }
    var _n = () => {};
    _n.inline = (e, {
        modifiers: t
    }, {
        cleanup: r
    }) => {
        t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, r(() => {
            t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore
        })
    };
    d("ignore", _n);
    d("effect", A((e, {
        expression: t
    }, {
        effect: r
    }) => {
        r(x(e, t))
    }));

    function se(e, t, r, n) {
        let i = e,
            o = c => n(c),
            s = {},
            a = (c, l) => u => l(c, u);
        if (r.includes("dot") && (t = $i(t)), r.includes("camel") && (t = ji(t)), r.includes("passive") && (s.passive = !0), r.includes("capture") && (s.capture = !0), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("debounce")) {
            let c = r[r.indexOf("debounce") + 1] || "invalid-wait",
                l = et(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
            o = ze(o, l)
        }
        if (r.includes("throttle")) {
            let c = r[r.indexOf("throttle") + 1] || "invalid-wait",
                l = et(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
            o = Ke(o, l)
        }
        return r.includes("prevent") && (o = a(o, (c, l) => {
            l.preventDefault(), c(l)
        })), r.includes("stop") && (o = a(o, (c, l) => {
            l.stopPropagation(), c(l)
        })), r.includes("self") && (o = a(o, (c, l) => {
            l.target === e && c(l)
        })), (r.includes("away") || r.includes("outside")) && (i = document, o = a(o, (c, l) => {
            e.contains(l.target) || l.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && c(l))
        })), r.includes("once") && (o = a(o, (c, l) => {
            c(l), i.removeEventListener(t, o, s)
        })), o = a(o, (c, l) => {
            Bi(t) && zi(l, r) || c(l)
        }), i.addEventListener(t, o, s), () => {
            i.removeEventListener(t, o, s)
        }
    }

    function $i(e) {
        return e.replace(/-/g, ".")
    }

    function ji(e) {
        return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase())
    }

    function et(e) {
        return !Array.isArray(e) && !isNaN(e)
    }

    function Fi(e) {
        return [" ", "_"].includes(e) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase()
    }

    function Bi(e) {
        return ["keydown", "keyup"].includes(e)
    }

    function zi(e, t) {
        let r = t.filter(o => !["window", "document", "prevent", "stop", "once", "capture"].includes(o));
        if (r.includes("debounce")) {
            let o = r.indexOf("debounce");
            r.splice(o, et((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
        }
        if (r.includes("throttle")) {
            let o = r.indexOf("throttle");
            r.splice(o, et((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
        }
        if (r.length === 0 || r.length === 1 && hn(e.key).includes(r[0])) return !1;
        let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(o => r.includes(o));
        return r = r.filter(o => !i.includes(o)), !(i.length > 0 && i.filter(s => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && hn(e.key).includes(r[0]))
    }

    function hn(e) {
        if (!e) return [];
        e = Fi(e);
        let t = {
            ctrl: "control",
            slash: "/",
            space: " ",
            spacebar: " ",
            cmd: "meta",
            esc: "escape",
            up: "arrow-up",
            down: "arrow-down",
            left: "arrow-left",
            right: "arrow-right",
            period: ".",
            equal: "=",
            minus: "-",
            underscore: "_"
        };
        return t[e] = e, Object.keys(t).map(r => {
            if (t[r] === e) return r
        }).filter(r => r)
    }
    d("model", (e, {
        modifiers: t,
        expression: r
    }, {
        effect: n,
        cleanup: i
    }) => {
        let o = e;
        t.includes("parent") && (o = e.parentNode);
        let s = x(o, r),
            a;
        typeof r == "string" ? a = x(o, `${r} = __placeholder`) : typeof r == "function" && typeof r() == "string" ? a = x(o, `${r()} = __placeholder`) : a = () => {};
        let c = () => {
                let m;
                return s(w => m = w), gn(m) ? m.get() : m
            },
            l = m => {
                let w;
                s($ => w = $), gn(w) ? w.set(m) : a(() => {}, {
                    scope: {
                        __placeholder: m
                    }
                })
            };
        typeof r == "string" && e.type === "radio" && _(() => {
            e.hasAttribute("name") || e.setAttribute("name", r)
        });
        var u = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
        let p = I ? () => {} : se(e, u, t, m => {
            l(Ki(e, t, m, c()))
        });
        if (t.includes("fill") && ([void 0, null, ""].includes(c()) || e.type === "checkbox" && Array.isArray(c())) && e.dispatchEvent(new Event(u, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = p, i(() => e._x_removeModelListeners.default()), e.form) {
            let m = se(e.form, "reset", [], w => {
                ne(() => e._x_model && e._x_model.set(e.value))
            });
            i(() => m())
        }
        e._x_model = {
            get() {
                return c()
            },
            set(m) {
                l(m)
            }
        }, e._x_forceModelUpdate = m => {
            m === void 0 && typeof r == "string" && r.match(/\./) && (m = ""), window.fromModel = !0, _(() => ge(e, "value", m)), delete window.fromModel
        }, n(() => {
            let m = c();
            t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(m)
        })
    });

    function Ki(e, t, r, n) {
        return _(() => {
            if (r instanceof CustomEvent && r.detail !== void 0) return r.detail !== null && r.detail !== void 0 ? r.detail : r.target.value;
            if (e.type === "checkbox")
                if (Array.isArray(n)) {
                    let i = null;
                    return t.includes("number") ? i = zt(r.target.value) : t.includes("boolean") ? i = xe(r.target.value) : i = r.target.value, r.target.checked ? n.concat([i]) : n.filter(o => !Hi(o, i))
                } else return r.target.checked;
            else return e.tagName.toLowerCase() === "select" && e.multiple ? t.includes("number") ? Array.from(r.target.selectedOptions).map(i => {
                let o = i.value || i.text;
                return zt(o)
            }) : t.includes("boolean") ? Array.from(r.target.selectedOptions).map(i => {
                let o = i.value || i.text;
                return xe(o)
            }) : Array.from(r.target.selectedOptions).map(i => i.value || i.text) : t.includes("number") ? zt(r.target.value) : t.includes("boolean") ? xe(r.target.value) : t.includes("trim") ? r.target.value.trim() : r.target.value
        })
    }

    function zt(e) {
        let t = e ? parseFloat(e) : null;
        return Vi(t) ? t : e
    }

    function Hi(e, t) {
        return e == t
    }

    function Vi(e) {
        return !Array.isArray(e) && !isNaN(e)
    }

    function gn(e) {
        return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function"
    }
    d("cloak", e => queueMicrotask(() => _(() => e.removeAttribute(T("cloak")))));
    Oe(() => `[${T("init")}]`);
    d("init", A((e, {
        expression: t
    }, {
        evaluate: r
    }) => typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)));
    d("text", (e, {
        expression: t
    }, {
        effect: r,
        evaluateLater: n
    }) => {
        let i = n(t);
        r(() => {
            i(o => {
                _(() => {
                    e.textContent = o
                })
            })
        })
    });
    d("html", (e, {
        expression: t
    }, {
        effect: r,
        evaluateLater: n
    }) => {
        let i = n(t);
        r(() => {
            i(o => {
                _(() => {
                    e.innerHTML = o, e._x_ignoreSelf = !0, S(e), delete e._x_ignoreSelf
                })
            })
        })
    });
    re(Le(":", $e(T("bind:"))));
    var xn = (e, {
        value: t,
        modifiers: r,
        expression: n,
        original: i
    }, {
        effect: o
    }) => {
        if (!t) {
            let a = {};
            zr(a), x(e, n)(l => {
                Ct(e, l, i)
            }, {
                scope: a
            });
            return
        }
        if (t === "key") return qi(e, n);
        if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return;
        let s = x(e, n);
        o(() => s(a => {
            a === void 0 && typeof n == "string" && n.match(/\./) && (a = ""), _(() => ge(e, t, a, r))
        }))
    };
    xn.inline = (e, {
        value: t,
        modifiers: r,
        expression: n
    }) => {
        t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = {
            expression: n,
            extract: !1
        })
    };
    d("bind", xn);

    function qi(e, t) {
        e._x_keyExpression = t
    }
    Ae(() => `[${T("data")}]`);
    d("data", (e, {
        expression: t
    }, {
        cleanup: r
    }) => {
        if (Ui(e)) return;
        t = t === "" ? "{}" : t;
        let n = {};
        de(n, e);
        let i = {};
        Vr(i, n);
        let o = M(e, t, {
            scope: i
        });
        (o === void 0 || o === !0) && (o = {}), de(o, e);
        let s = R(o);
        Ne(s);
        let a = P(e, s);
        s.init && M(e, s.init), r(() => {
            s.destroy && M(e, s.destroy), a()
        })
    });
    K((e, t) => {
        e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0))
    });

    function Ui(e) {
        return I ? Be ? !0 : e.hasAttribute("data-has-alpine-state") : !1
    }
    d("show", (e, {
        modifiers: t,
        expression: r
    }, {
        effect: n
    }) => {
        let i = x(e, r);
        e._x_doHide || (e._x_doHide = () => {
            _(() => {
                e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0)
            })
        }), e._x_doShow || (e._x_doShow = () => {
            _(() => {
                e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display")
            })
        });
        let o = () => {
                e._x_doHide(), e._x_isShown = !1
            },
            s = () => {
                e._x_doShow(), e._x_isShown = !0
            },
            a = () => setTimeout(s),
            c = _e(p => p ? s() : o(), p => {
                typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, p, s, o) : p ? a() : o()
            }),
            l, u = !0;
        n(() => i(p => {
            !u && p === l || (t.includes("immediate") && (p ? a() : o()), c(p), l = p, u = !1)
        }))
    });
    d("for", (e, {
        expression: t
    }, {
        effect: r,
        cleanup: n
    }) => {
        let i = Gi(t),
            o = x(e, i.items),
            s = x(e, e._x_keyExpression || "index");
        e._x_prevKeys = [], e._x_lookup = {}, r(() => Wi(e, i, o, s)), n(() => {
            Object.values(e._x_lookup).forEach(a => a.remove()), delete e._x_prevKeys, delete e._x_lookup
        })
    });

    function Wi(e, t, r, n) {
        let i = s => typeof s == "object" && !Array.isArray(s),
            o = e;
        r(s => {
            Ji(s) && s >= 0 && (s = Array.from(Array(s).keys(), f => f + 1)), s === void 0 && (s = []);
            let a = e._x_lookup,
                c = e._x_prevKeys,
                l = [],
                u = [];
            if (i(s)) s = Object.entries(s).map(([f, g]) => {
                let b = yn(t, g, f, s);
                n(v => {
                    u.includes(v) && E("Duplicate key on x-for", e), u.push(v)
                }, {
                    scope: {
                        index: f,
                        ...b
                    }
                }), l.push(b)
            });
            else
                for (let f = 0; f < s.length; f++) {
                    let g = yn(t, s[f], f, s);
                    n(b => {
                        u.includes(b) && E("Duplicate key on x-for", e), u.push(b)
                    }, {
                        scope: {
                            index: f,
                            ...g
                        }
                    }), l.push(g)
                }
            let p = [],
                m = [],
                w = [],
                $ = [];
            for (let f = 0; f < c.length; f++) {
                let g = c[f];
                u.indexOf(g) === -1 && w.push(g)
            }
            c = c.filter(f => !w.includes(f));
            let Ee = "template";
            for (let f = 0; f < u.length; f++) {
                let g = u[f],
                    b = c.indexOf(g);
                if (b === -1) c.splice(f, 0, g), p.push([Ee, f]);
                else if (b !== f) {
                    let v = c.splice(f, 1)[0],
                        O = c.splice(b - 1, 1)[0];
                    c.splice(f, 0, O), c.splice(b, 0, v), m.push([v, O])
                } else $.push(g);
                Ee = g
            }
            for (let f = 0; f < w.length; f++) {
                let g = w[f];
                a[g]._x_effects && a[g]._x_effects.forEach(ve), a[g].remove(), a[g] = null, delete a[g]
            }
            for (let f = 0; f < m.length; f++) {
                let [g, b] = m[f], v = a[g], O = a[b], Q = document.createElement("div");
                _(() => {
                    O || E('x-for ":key" is undefined or invalid', o, b, a), O.after(Q), v.after(O), O._x_currentIfEl && O.after(O._x_currentIfEl), Q.before(v), v._x_currentIfEl && v.after(v._x_currentIfEl), Q.remove()
                }), O._x_refreshXForScope(l[u.indexOf(b)])
            }
            for (let f = 0; f < p.length; f++) {
                let [g, b] = p[f], v = g === "template" ? o : a[g];
                v._x_currentIfEl && (v = v._x_currentIfEl);
                let O = l[b],
                    Q = u[b],
                    ae = document.importNode(o.content, !0).firstElementChild,
                    Ht = R(O);
                P(ae, Ht, o), ae._x_refreshXForScope = wn => {
                    Object.entries(wn).forEach(([En, vn]) => {
                        Ht[En] = vn
                    })
                }, _(() => {
                    v.after(ae), A(() => S(ae))()
                }), typeof Q == "object" && E("x-for key cannot be an object, it must be a string or an integer", o), a[Q] = ae
            }
            for (let f = 0; f < $.length; f++) a[$[f]]._x_refreshXForScope(l[u.indexOf($[f])]);
            o._x_prevKeys = u
        })
    }

    function Gi(e) {
        let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
            r = /^\s*\(|\)\s*$/g,
            n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
            i = e.match(n);
        if (!i) return;
        let o = {};
        o.items = i[2].trim();
        let s = i[1].replace(r, "").trim(),
            a = s.match(t);
        return a ? (o.item = s.replace(t, "").trim(), o.index = a[1].trim(), a[2] && (o.collection = a[2].trim())) : o.item = s, o
    }

    function yn(e, t, r, n) {
        let i = {};
        return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map(s => s.trim()).forEach((s, a) => {
            i[s] = t[a]
        }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map(s => s.trim()).forEach(s => {
            i[s] = t[s]
        }) : i[e.item] = t, e.index && (i[e.index] = r), e.collection && (i[e.collection] = n), i
    }

    function Ji(e) {
        return !Array.isArray(e) && !isNaN(e)
    }

    function bn() {}
    bn.inline = (e, {
        expression: t
    }, {
        cleanup: r
    }) => {
        let n = G(e);
        n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, r(() => delete n._x_refs[t])
    };
    d("ref", bn);
    d("if", (e, {
        expression: t
    }, {
        effect: r,
        cleanup: n
    }) => {
        e.tagName.toLowerCase() !== "template" && E("x-if can only be used on a <template> tag", e);
        let i = x(e, t),
            o = () => {
                if (e._x_currentIfEl) return e._x_currentIfEl;
                let a = e.content.cloneNode(!0).firstElementChild;
                return P(a, {}, e), _(() => {
                    e.after(a), A(() => S(a))()
                }), e._x_currentIfEl = a, e._x_undoIf = () => {
                    C(a, c => {
                        c._x_effects && c._x_effects.forEach(ve)
                    }), a.remove(), delete e._x_currentIfEl
                }, a
            },
            s = () => {
                e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf)
            };
        r(() => i(a => {
            a ? o() : s()
        })), n(() => e._x_undoIf && e._x_undoIf())
    });
    d("id", (e, {
        expression: t
    }, {
        evaluate: r
    }) => {
        r(t).forEach(i => dn(e, i))
    });
    K((e, t) => {
        e._x_ids && (t._x_ids = e._x_ids)
    });
    re(Le("@", $e(T("on:"))));
    d("on", A((e, {
        value: t,
        modifiers: r,
        expression: n
    }, {
        cleanup: i
    }) => {
        let o = n ? x(e, n) : () => {};
        e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
        let s = se(e, t, r, a => {
            o(() => {}, {
                scope: {
                    $event: a
                },
                params: [a]
            })
        });
        i(() => s())
    }));
    tt("Collapse", "collapse", "collapse");
    tt("Intersect", "intersect", "intersect");
    tt("Focus", "trap", "focus");
    tt("Mask", "mask", "mask");

    function tt(e, t, r) {
        d(t, n => E(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n))
    }
    z.setEvaluator(xt);
    z.setReactivityEngine({
        reactive: Qe,
        effect: Zr,
        release: Qr,
        raw: h
    });
    var Kt = z;
    window.Alpine = Kt;
    queueMicrotask(() => {
        Kt.start()
    });
})();