(() => {
    function g(n) {
        n.directive("collapse", e), e.inline = (t, {
            modifiers: i
        }) => {
            i.includes("min") && (t._x_doShow = () => {}, t._x_doHide = () => {})
        };

        function e(t, {
            modifiers: i
        }) {
            let r = l(i, "duration", 250) / 1e3,
                u = l(i, "min", 0),
                h = !i.includes("min");
            t._x_isShown || (t.style.height = `${u}px`), !t._x_isShown && h && (t.hidden = !0), t._x_isShown || (t.style.overflow = "hidden");
            let c = (d, s) => {
                    let o = n.setStyles(d, s);
                    return s.height ? () => {} : o
                },
                f = {
                    transitionProperty: "height",
                    transitionDuration: `${r}s`,
                    transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)"
                };
            t._x_transition = { in (d = () => {}, s = () => {}) {
                    h && (t.hidden = !1), h && (t.style.display = null);
                    let o = t.getBoundingClientRect().height;
                    t.style.height = "auto";
                    let a = t.getBoundingClientRect().height;
                    o === a && (o = u), n.transition(t, n.setStyles, {
                        during: f,
                        start: {
                            height: o + "px"
                        },
                        end: {
                            height: a + "px"
                        }
                    }, () => t._x_isShown = !0, () => {
                        t.getBoundingClientRect().height == a && (t.style.overflow = null)
                    })
                },
                out(d = () => {}, s = () => {}) {
                    let o = t.getBoundingClientRect().height;
                    n.transition(t, c, {
                        during: f,
                        start: {
                            height: o + "px"
                        },
                        end: {
                            height: u + "px"
                        }
                    }, () => t.style.overflow = "hidden", () => {
                        t._x_isShown = !1, t.style.height == `${u}px` && h && (t.style.display = "none", t.hidden = !0)
                    })
                }
            }
        }
    }

    function l(n, e, t) {
        if (n.indexOf(e) === -1) return t;
        let i = n[n.indexOf(e) + 1];
        if (!i) return t;
        if (e === "duration") {
            let r = i.match(/([0-9]+)ms/);
            if (r) return r[1]
        }
        if (e === "min") {
            let r = i.match(/([0-9]+)px/);
            if (r) return r[1]
        }
        return i
    }
    document.addEventListener("alpine:init", () => {
        window.Alpine.plugin(g)
    });
})();