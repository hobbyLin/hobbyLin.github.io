/**
 * Created by Administrator on 2017/3/27.
 */
define(function() {
    function t() {
        return $(window).scrollTop() + $(window).height()
    }
    function e() {
        return window.sSession && window.sSession.isLogin && "1" === window.sSession.isLogin
    }
    function a() {
        var t = window.localStorage && window.localStorage.getItem("total_request") || 0;
        if (t) {
            var e = t.split("_")[1];
            return e
        }
        return 0
    }
    function i() {
        var t = window.localStorage && window.localStorage.getItem("total_request") || 0,
            e = new Date,
            a = parseInt(e.getFullYear() + "" + (e.getMonth() + 1) + e.getDate(), 10);
        if (t) {
            var i = parseInt(t.split("_")[0], 10),
                n = parseInt(t.split("_")[1], 10);
            a > i ? window.localStorage.setItem("total_request", a + "_0") : (n++, window.localStorage.setItem("total_request", a + "_" + n))
        } else window.localStorage.setItem("total_request", a + "_0")
    }
    function n() {
        var t = location.href.match(/from=([^&/]*)/),
            i = window.ecom && window.ecom.getHistoryTitle && window.ecom.getHistoryTitle(),
            n = {
                query: "wise_index",
                cp: "wise_home_page",
                pui: e() ? 1 : 0,
                pn: ++B,
                from: t ? t[1] : "0",
                wsw: screen.availWidth,
                wsh: screen.availHeight,
                wiw: $(window).width(),
                wih: $(window).height(),
                sid: window.sSession && window.sSession.logid || "",
                wosid: window.sSession && window.sSession.osid || "",
                wbwsid: window.sSession && window.sSession.browserid || "",
                nettype: window.sSession && window.sSession.netType || 0,
                fc: b[b.length - 1].freshCount,
                ft: b[b.length - 1].freshType,
                pos: E,
                total: a(),
                fdtitle: i || "",
                ecom: _("ecom")
            };
        return b.length && (J = b.pop()), n
    }
    function o() {
        return O[B + 1] || v
    }
    function r(t) {
        try {
            ("undefined" == typeof window.AFD_ADSENSE || $.isArray(window.AFD_ADSENSE) === !1) && (window.AFD_ADSENSE = []), window.AFD_ADSENSE.push(t), window.AFD_ADSENSE[window.AFD_ADSENSE.length - 1].freshData = J
        } catch (e) {}
    }
    function d(t) {
        var e = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var a in e) new RegExp("(" + a + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? e[a] : ("00" + e[a]).substr(("" + e[a]).length)));
        return t
    }
    function s(t) {
        if (t) {
            var e = (new Date).getTime(),
                a = new Image;
            t += "&rand=" + (e + Math.random()), a.onload = a.onerror = a.onabort = function() {
                a.onload = a.onerror = a.onabort = null, a = null
            }, a.src = t
        }
    }
    function w(t) {
        var e = {
            baiduid: window.B && window.B.cookie && window.B.cookie("BAIDUID"),
            tag: "wise_home",
            action: "renderfail",
            pn: B,
            sid: window.B.cookie("H_WISE_SIDS"),
            pre_qid: window.sSession && window.sSession.logid || "",
            extends_1: JSON && JSON.stringify(q)
        };
        e = $.extend(e, t || {}), s(I + "?" + l(e))
    }
    function c(t) {
        var e = "//als.baidu.com/clog/glog",
            a = {
                productId: 8,
                _client_type: "1",
                _os_type: window.sSession && window.sSession.osid || "0",
                baiduid: window.B && window.B.cookie && window.B.cookie("BAIDUID"),
                da_page: "index"
            };
        a = $.extend(a, t || {}), s(e + "?" + l(a))
    }
    function l(t) {
        var e = [];
        for (var a in t) t.hasOwnProperty(a) && e.push(encodeURIComponent(a) + "=" + encodeURIComponent(t[a]));
        return e.join("&")
    }
    function _(t) {
        var e = window.location.href;
        t = t.replace(/[\[\]]/g, "\\$&");
        var a = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)"),
            i = a.exec(e);
        return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
    }
    function f() {
        var e = t(),
            a = $(".ads-item");
        a.each(function(t, a) {
            var i = $(a),
                n = i.offset().top;
            if ("true" !== i.attr("data-init")) {
                var r = n - e,
                    d = o();
                k && r >= 10 && d >= r && (i.attr("data-init", "true"), q.startPos = e, q.adPos = n, q.startTime && (q.lastTime = q.startTime), E = i.index() + 1, u(i))
            }
        }), clearTimeout(x), x = setTimeout(p, 150)
    }
    function p() {
        var e = t(),
            a = $(".ads-item");
        a.each(function(t, a) {
            var i = $(a),
                n = i.offset().top,
                o = i.find("a");
            if (i.height() > 0 && o.length > 0 && e > n) {
                var r = o.attr("data-pos"),
                    s = o.attr("data-pn"),
                    l = i.attr("data-apr") || 0;
                l && (l = +l);
                var _ = {},
                    f = (e - n) / i.height();
                f = f > 1 ? 1 : f, _.apr = +f.toFixed(2), _.apr > l && (i.attr("data-apr", _.apr), w({
                    action: "adsshow",
                    pn: s,
                    extends_1: JSON && JSON.stringify(_),
                    extends_2: r
                }));
                var p = o.attr("data-show"),
                    u = o.attr("data-rank"),
                    g = o.attr("data-adid"),
                    m = o.attr("data-searchId"),
                    h = o.attr("data-src"),
                    S = o.attr("data-cmatch") || "",
                    x = o.attr("data-ip") || "",
                    T = o.attr("data-time") || "";
                "true" !== p && e - n > .3 * i.height() && (o.attr("data-show", "true"), w({
                    action: "adsexposure",
                    baiduid: window.B && window.B.cookie && window.B.cookie("BAIDUID"),
                    searchId: m,
                    rank: u || 1,
                    adid: g,
                    src: h || 1026,
                    time: d.call(new Date, "yyyy-MM-dd HH:mm:ss"),
                    ck: "",
                    pn: s,
                    extends_1: _.apr,
                    extends_2: r,
                    cmatch: S,
                    ip: x,
                    request_time: T
                }), window.B.thunderLog && window.B.thunderLog.send && window.B.thunderLog.send({
                    ct: 1,
                    cst: 10,
                    logFrom: "mid_news",
                    rids: o.attr("data-rid"),
                    pos: o.attr("data-pos"),
                    searchId: m
                }));
                var v = o.attr("data-showfor1px");
                "true" !== v && e > n && (o.attr("data-showfor1px", "true"), c({
                    da_page_num: s,
                    da_locate: r,
                    da_type: 3,
                    origin_time: (new Date).getTime(),
                    ext_info: o.attr("data-ext_info") || ""
                }))
            }
            var D = i.attr("data-store");
            "true" !== D && 0 === i.height() && i.attr("data-ext_info") && e > n && (i.attr("data-store", "true"), c({
                da_type: 3,
                origin_time: (new Date).getTime(),
                ext_info: i.attr("data-ext_info") || ""
            }))
        })
    }
    function u(e) {
        g(), i();
        var a = e.attr("data-pos");
        e.removeAttr("data-rid"), e.removeAttr("data-pos");
        var o = y;
        T && (o = y + "&show_info=" + T), $.ajax({
            url: o,
            type: "GET",
            dataType: "jsonp",
            timeout: 1500,
            data: n()
        }).done(function(i) {
            r(i), m(e);
            var n = t(),
                o = e.offset().top;
            if (0 !== i.err_no) return void c({
                da_ext1: 1,
                origin_time: (new Date).getTime(),
                da_ext2: JSON && JSON.stringify(q)
            });
            if (i.ad_place_list.length && !i.ad_place_list[0].ad_place_data && i.ad_place_list[0].ad_item_list.length && i.ad_place_list[0].ad_item_list[0].ext_info && e.attr("data-ext_info", i.ad_place_list[0].ad_item_list[0].ext_info), i.ad_place_list.length <= 0 || !i.ad_place_list[0].ad_place_data) return void c({
                da_ext1: 2,
                origin_time: (new Date).getTime(),
                da_ext2: JSON && JSON.stringify(q)
            });
            if (o > n + D) {
                var d = e.html(i.ad_place_list[0].ad_place_data).find("a"),
                    s = d.attr("data-searchId") || Math.floor(1e17 * Math.random());
                if (d.attr({
                        "data-rid": "ecomads-" + s + "-" + B,
                        "data-pos": a,
                        "data-pn": B
                    }), i.ad_place_list[0].ad_place_js.length > 0) try {
                    d.attr("data-ext_info", i.ad_place_list[0].ad_place_js)
                } catch (w) {}
                var l = d.attr("data-showinfo");
                return l && (T = l), d.bind("click", function() {
                    c({
                        da_page_num: d.attr("data-pn"),
                        da_locate: d.attr("data-pos"),
                        da_type: 2,
                        origin_time: (new Date).getTime(),
                        ext_info: d.attr("data-ext_info") || ""
                    })
                }), d.find('[data-type="ec_ad_asyn_phone"]').on("click", function() {
                    c({
                        da_area: "phone",
                        da_page_num: d.attr("data-pn"),
                        da_locate: d.attr("data-pos"),
                        da_type: 2,
                        origin_time: (new Date).getTime(),
                        ext_info: d.attr("data-ext_info") || ""
                    })
                }), void c({
                    da_ext1: 3,
                    origin_time: (new Date).getTime(),
                    da_ext2: JSON && JSON.stringify(q)
                })
            }
            c({
                da_ext1: 4,
                origin_time: (new Date).getTime(),
                da_ext2: JSON && JSON.stringify(q)
            })
        }).fail(function(t, a) {
            r({
                textStatus: a
            }), m(e), c({
                da_ext1: 5,
                origin_time: (new Date).getTime(),
                da_ext2: JSON && JSON.stringify(q),
                da_ext3: a
            })
        })
    }
    function g() {
        q.startTime = (new Date).getTime(), q.interval = q.startTime - q.lastTime
    }
    function m(e) {
        q.endTime = (new Date).getTime(), q.requestTime = q.endTime - q.startTime;
        var a = t(),
            i = e.offset().top;
        q.endPos = a, q.distance = i - a
    }
    function h() {
        var t = $("[name=word]");
        t.on("focus", function() {
            k = !1
        }), t.on("blur", function() {
            k = !0
        }), $(window).on("scroll", f)
    }
    function S() {
        h(), window.ecom = window.ecom || {}, window.ecom.fclick = w, window.ecom.request = s, window.ecom.paramsToUrl = l, window.require(["ecom/wise/log"], function(t) {
            t.init(), window.ecom.getHistoryTitle = t.getHistoryTitle
        })
    }
    var x, T, v = 500,
        D = 5,
        y = "//afd.baidu.com/afd/wise?_api=new",
        I = "http:" === location.protocol ? "http://fclick.baidu.com/w.gif" : "https://sp0.baidu.com/-rU_dTmfKgQFm2e88IuM_a/w.gif",
        B = -1,
        E = 7,
        N = 0,
        A = 1,
        b = [{
            freshCount: 1,
            freshType: 3
        }],
        k = !0,
        O = {},
        J = "",
        q = {
            height: $(window).height(),
            interval: 0,
            lastTime: (new Date).getTime(),
            startTime: 0,
            endTime: 0,
            startPos: 0,
            endPos: 0,
            adPos: 0,
            requestTime: 0,
            distance: 0
        };
    return window.B && window.B.listen("skeleton/tab", "afrInsertDom1", function() {
        A++, b.push({
            freshCount: A,
            freshType: 3
        })
    }), window.B && window.B.listen("skeleton/tab", "preInsertDom1", function() {
        N++, b.push({
            freshCount: N,
            freshType: 4
        })
    }), {
        init: S
    }
});