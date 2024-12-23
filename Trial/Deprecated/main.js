/*
	VIEWPORT BUG FIX
	iOS viewport scaling bug fix, by @mathias, @cheeaun and @jdalton
*/

;
(function(e) {
    function o() {
        s.content = "width=device-width,minimum-scale=" + i[0] + ",maximum-scale=" + i[1];
        e.removeEventListener(n, o, true)
    }
    var t = "addEventListener",
        n = "gesturestart",
        r = "querySelectorAll",
        i = [1, 1],
        s = r in e ? e[r]("meta[name=viewport]") : [];
    if ((s = s[s.length - 1]) && t in e) {
        o();
        i = [.25, 1.6];
        e[t](n, o, true)
    }
})(document);

/*
	socialite.js - v2.0
*/

;
window.Socialite = function(a, b, c) {
    "use strict";
    var d = 0,
        e = [],
        f = {},
        g = {},
        h = /^($|loaded|complete)/,
        i = a.encodeURIComponent,
        j = {
            settings: {},
            trim: function(a) {
                return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
            },
            hasClass: function(a, b) {
                return (" " + a.className + " ").indexOf(" " + b + " ") !== -1
            },
            addClass: function(a, b) {
                j.hasClass(a, b) || (a.className = a.className === "" ? b : a.className + " " + b)
            },
            removeClass: function(a, b) {
                a.className = j.trim(" " + a.className + " ".replace(" " + b + " ", " "))
            },
            extendObject: function(a, b, d) {
                for (var e in b) {
                    var f = a[e] !== c;
                    if (f && typeof b[e] == "object")
                        j.extendObject(a[e], b[e], d);
                    else if (d || !f)
                        a[e] = b[e]
                }
            },
            getElements: function(a, b) {
                var c = 0,
                    d = [],
                    e = !!a.getElementsByClassName,
                    f = e ? a.getElementsByClassName(b) : a.getElementsByTagName("*");
                for (; c < f.length; c++)
                    (e || j.hasClass(f[c], b)) && d.push(f[c]);
                return d
            },
            getDataAttributes: function(a, b, c) {
                var d = 0,
                    e = "",
                    f = {},
                    g = a.attributes;
                for (; d < g.length; d++) {
                    var h = g[d].name,
                        j = g[d].value;
                    j.length && h.indexOf("data-") === 0 && (b && (h = h.substring(5)), c ? f[h] = j : e += i(h) + "=" + i(j) + "&")
                }
                return c ? f : e
            },
            copyDataAttributes: function(a, b, c, d) {
                var e = j.getDataAttributes(a, c, !0);
                for (var f in e)
                    b.setAttribute(d ? f.replace(/-/g, "_") : f, e[f])
            },
            createIframe: function(a, c) {
                var d = b.createElement("iframe");
                return d.style.cssText = "overflow: hidden; border: none;", j.extendObject(d, {
                    src: a,
                    allowtransparency: "true",
                    frameborder: "0",
                    scrolling: "no"
                }, !0), c && (d.onload = d.onreadystatechange = function() {
                    h.test(d.readyState || "") && (d.onload = d.onreadystatechange = null, j.activateInstance(c))
                }), d
            },
            networkReady: function(a) {
                return f[a] ? f[a].loaded : c
            },
            appendNetwork: function(a) {
                if (!a || a.appended)
                    return;
                if (typeof a.append == "function" && a.append(a) === !1) {
                    a.appended = a.loaded = !0, j.activateAll(a);
                    return
                }
                a.script && (a.el = b.createElement("script"), j.extendObject(a.el, a.script, !0), a.el.async = !0, a.el.onload = a.el.onreadystatechange = function() {
                    if (h.test(a.el.readyState || "")) {
                        a.el.onload = a.el.onreadystatechange = null, a.loaded = !0;
                        if (typeof a.onload == "function" && a.onload(a) === !1)
                            return;
                        j.activateAll(a)
                    }
                }, b.body.appendChild(a.el)), a.appended = !0
            },
            removeNetwork: function(a) {
                return j.networkReady(a.name) ? (a.el.parentNode.removeChild(a.el), !(a.appended = a.loaded = !1)) : !1
            },
            reloadNetwork: function(a) {
                var b = f[a];
                b && j.removeNetwork(b) && j.appendNetwork(b)
            },
            createInstance: function(a, b) {
                var f = !0,
                    g = {
                        el: a,
                        uid: d++,
                        widget: b
                    };
                return e.push(g), b.process !== c && (f = typeof b.process == "function" ? b.process(g) : !1), f && j.processInstance(g), g.el.setAttribute("data-socialite", g.uid), g.el.className = "socialite " + b.name + " socialite-instance", g
            },
            processInstance: function(a) {
                var c = a.el;
                a.el = b.createElement("div"), a.el.className = c.className, j.copyDataAttributes(c, a.el), c.nodeName.toLowerCase() === "a" && !c.getAttribute("data-default-href") && a.el.setAttribute("data-default-href", c.getAttribute("href"));
                var d = c.parentNode;
                d.insertBefore(a.el, c), d.removeChild(c)
            },
            activateInstance: function(a) {
                if (a && !a.loaded)
                    return a.loaded = !0, typeof a.widget.activate == "function" && a.widget.activate(a), j.addClass(a.el, "socialite-loaded"), a.onload ? a.onload(a.el) : null
            },
            activateAll: function(a) {
                typeof a == "string" && (a = f[a]);
                for (var b = 0; b < e.length; b++) {
                    var c = e[b];
                    c.init && c.widget.network === a && j.activateInstance(c)
                }
            },
            load: function(a, c, d, f, h) {
                a = a && typeof a == "object" && a.nodeType === 1 ? a : b;
                if (!c || typeof c != "object") {
                    j.load(a, j.getElements(a, "socialite"), d, f, h);
                    return
                }
                var i;
                if (/Array/.test(Object.prototype.toString.call(c))) {
                    for (i = 0; i < c.length; i++)
                        j.load(a, c[i], d, f, h);
                    return
                }
                if (c.nodeType !== 1)
                    return;
                if (!d || !g[d]) {
                    d = null;
                    var k = c.className.split(" ");
                    for (i = 0; i < k.length; i++)
                        if (g[k[i]]) {
                            d = k[i];
                            break
                        }
                    if (!d)
                        return
                }
                var l,
                    m = g[d],
                    n = parseInt(c.getAttribute("data-socialite"), 10);
                if (!isNaN(n)) {
                    for (i = 0; i < e.length; i++)
                        if (e[i].uid === n) {
                            l = e[i];
                            break
                        }
                } else
                    l = j.createInstance(c, m);
                if (h || !l)
                    return;
                l.init || (l.init = !0, l.onload = typeof f == "function" ? f : null, m.init(l)), m.network.appended ? j.networkReady(m.network.name) && j.activateInstance(l) : j.appendNetwork(m.network)
            },
            activate: function(b, c, d) {
                a.Socialite.load(null, b, c, d)
            },
            process: function(b, c, d) {
                a.Socialite.load(b, c, d, null, !0)
            },
            network: function(a, b) {
                f[a] = {
                    name: a,
                    el: null,
                    appended: !1,
                    loaded: !1,
                    widgets: {}
                }, b && j.extendObject(f[a], b)
            },
            widget: function(a, b, c) {
                c.name = a + "-" + b;
                if (!f[a] || g[c.name])
                    return;
                c.network = f[a], f[a].widgets[b] = g[c.name] = c
            },
            setup: function(a) {
                j.extendObject(j.settings, a, !0)
            }
        };
    return j
}(window, window.document), function(a, b, c, d) {
    c.setup({
        facebook: {
            lang: "en_GB",
            appId: null
        },
        twitter: {
            lang: "en"
        },
        googleplus: {
            lang: "en-GB"
        }
    }), c.network("facebook", {
        script: {
            src: "//connect.facebook.net/{{language}}/all.js",
            id: "facebook-jssdk"
        },
        append: function(d) {
            var e = b.createElement("div"),
                f = c.settings.facebook,
                g = {
                    onlike: "edge.create",
                    onunlike: "edge.remove",
                    onsend: "message.send"
                };
            e.id = "fb-root", b.body.appendChild(e), d.script.src = d.script.src.replace("{{language}}", f.lang), a.fbAsyncInit = function() {
                a.FB.init({
                    appId: f.appId,
                    xfbml: !0
                });
                for (var b in g)
                    typeof f[b] == "function" && a.FB.Event.subscribe(g[b], f[b])
            }
        }
    }), c.widget("facebook", "like", {
        init: function(d) {
            var e = b.createElement("div");
            e.className = "fb-like", c.copyDataAttributes(d.el, e), d.el.appendChild(e), a.FB && a.FB.XFBML && a.FB.XFBML.parse(d.el)
        }
    }), c.network("twitter", {
        script: {
            src: "//platform.twitter.com/widgets.js",
            id: "twitter-wjs",
            charset: "utf-8"
        },
        append: function() {
            var b = typeof a.twttr != "object",
                d = c.settings.twitter,
                e = ["click", "tweet", "retweet", "favorite", "follow"];
            return b && (a.twttr = t = {
                _e: [],
                ready: function(a) {
                    t._e.push(a)
                }
            }), a.twttr.ready(function(a) {
                for (var b = 0; b < e.length; b++) {
                    var f = e[b];
                    typeof d["on" + f] == "function" && a.events.bind(f, d["on" + f])
                }
                c.activateAll("twitter")
            }), b
        }
    });
    var e = function(a) {
            var d = b.createElement("a");
            d.className = a.widget.name + "-button", c.copyDataAttributes(a.el, d), d.setAttribute("href", a.el.getAttribute("data-default-href")), d.setAttribute("data-lang", a.el.getAttribute("data-lang") || c.settings.twitter.lang), a.el.appendChild(d)
        },
        f = function(b) {
            a.twttr && typeof a.twttr.widgets == "object" && typeof a.twttr.widgets.load == "function" && a.twttr.widgets.load()
        };
    c.widget("twitter", "share", {
        init: e,
        activate: f
    }), c.widget("twitter", "follow", {
        init: e,
        activate: f
    }), c.widget("twitter", "hashtag", {
        init: e,
        activate: f
    }), c.widget("twitter", "mention", {
        init: e,
        activate: f
    }), c.widget("twitter", "embed", {
        process: function(a) {
            a.innerEl = a.el, a.innerEl.getAttribute("data-lang") || a.innerEl.setAttribute("data-lang", c.settings.twitter.lang), a.el = b.createElement("div"), a.el.className = a.innerEl.className, a.innerEl.className = "", a.innerEl.parentNode.insertBefore(a.el, a.innerEl), a.el.appendChild(a.innerEl)
        },
        init: function(a) {
            a.innerEl.className = "twitter-tweet"
        },
        activate: f
    }), c.network("googleplus", {
        script: {
            src: "//apis.google.com/js/plusone.js"
        },
        append: function(b) {
            if (a.gapi)
                return !1;
            a.___gcfg = {
                lang: c.settings.googleplus.lang,
                parsetags: "explicit"
            }
        }
    });
    var g = function(a) {
            var d = b.createElement("div");
            d.className = "g-" + a.widget.gtype, c.copyDataAttributes(a.el, d), a.el.appendChild(d), a.gplusEl = d
        },
        h = function(a, b) {
            return typeof b != "function" ? null : function(c) {
                b(a.el, c)
            }
        },
        i = function(b) {
            var d = b.widget.gtype;
            if (a.gapi && a.gapi[d]) {
                var e = c.settings.googleplus,
                    f = c.getDataAttributes(b.el, !0, !0),
                    g = ["onstartinteraction", "onendinteraction", "callback"];
                for (var i = 0; i < g.length; i++)
                    f[g[i]] = h(b, e[g[i]]);
                a.gapi[d].render(b.gplusEl, f)
            }
        };
    c.widget("googleplus", "one", {
        init: g,
        activate: i,
        gtype: "plusone"
    }), c.widget("googleplus", "share", {
        init: g,
        activate: i,
        gtype: "plus"
    }), c.widget("googleplus", "badge", {
        init: g,
        activate: i,
        gtype: "plus"
    }), c.network("linkedin", {
        script: {
            src: "//platform.linkedin.com/in.js"
        }
    });
    var j = function(d) {
        var e = b.createElement("script");
        e.type = "IN/" + d.widget.intype, c.copyDataAttributes(d.el, e), d.el.appendChild(e), typeof a.IN == "object" && typeof a.IN.parse == "function" && (a.IN.parse(d.el), c.activateInstance(d))
    };
    c.widget("linkedin", "share", {
        init: j,
        intype: "Share"
    }), c.widget("linkedin", "recommend", {
        init: j,
        intype: "RecommendProduct"
    })
}(window, window.document, window.Socialite), function() {
    var a = window._socialite;
    if (/Array/.test(Object.prototype.toString.call(a)))
        for (var b = 0, c = a.length; b < c; b++)
            typeof a[b] == "function" && a[b]()
}();

;
(function(document, window, index)
{
    var sm = document.querySelector('.sm');
    if (sm)
        Socialite.load(sm);

}(document, window, 0));

/*
	AD
*/

;
(function(document, window, index)
{
    var ad = document.querySelector('.ad'),
        close = document.querySelector('.ad__close');

    if (!ad || !close)
        return true;

    close.addEventListener('click', function(e)
    {
        e.preventDefault();
        ad.parentNode.removeChild(ad);
    });

}(document, window, 0));


