import {
  _ as T,
  G as le,
  g as M,
  aY as te,
  dy as ce,
  dz as we,
  o as ee,
  u as ye,
  S as re,
  a as ke,
  dA as Se,
  dB as $e,
  dC as Ce,
  dD as Ae,
  b7 as Le,
  bn as Ie,
  b8 as De,
  b9 as Te,
  K as ue,
  i as oe,
  h as Be,
  dE as ae,
  dF as Ee,
  r as de,
  j as Pe,
} from "./page-activity-ea39ac09.js";
import {
  _ as V,
  P as ve,
  Q,
  a2 as D,
  o as p,
  j as k,
  a4 as Z,
  a5 as xe,
  l as s,
  a6 as h,
  a1 as w,
  a0 as v,
  a9 as _e,
  H as r,
  A as H,
  N as me,
  ap as pe,
  r as f,
  a3 as fe,
  aa as I,
  af as Ne,
  ag as Re,
  q as Fe,
  Z as Ve,
  J as F,
  G as J,
  ae as L,
  a7 as P,
  a8 as z,
  K as Ge,
  aD as Ue,
  aC as ne,
  b1 as je,
  X as He,
  ac as K,
  $ as Oe,
  B as Me,
  b2 as ze,
  ak as O,
  k as Ke,
  a_ as Ye,
  b3 as qe,
  b4 as Xe,
  b5 as We,
  b6 as Je,
  b7 as Qe,
  b8 as Ze,
  b9 as et,
  ba as tt,
  bb as st,
  bc as ot,
  bd as at,
  be as nt,
  bf as it,
  bg as lt,
  bh as ct,
  bi as rt,
  bj as ut,
  bk as dt,
  bl as vt,
  bm as _t,
  bn as mt,
  bo as pt,
  bp as ft,
  bq as gt,
  br as ht,
  bs as bt,
  bt as wt,
  bu as yt,
  bv as kt,
  bw as St,
  bx as $t,
  by as Ct,
  bz as At,
  bA as Lt,
  bB as It,
  bC as Dt,
  bD as Tt,
  bE as Bt,
  bF as Et,
  bG as Pt,
  bH as xt,
  bI as Nt,
} from "./modules-4d120c6a.js";
import { u as ge } from "./page-login-e929bf2f.js";
import "./native/index-047f1601.js";
import "./en-a4a7bd36.js";
import "./rus-4b29bbd8.js";
import "./vi-872c7f97.js";
import "./id-28070973.js";
import "./hd-27d64f28.js";
import "./tha-4e3b5587.js";
import "./md-d52326ed.js";
import "./bra-75ca4513.js";
import "./my-8060c426.js";
import "./bdt-6453a3e1.js";
import "./zh-0d68ba51.js";
import "./pak-6eaf680f.js";
import "./ar-24b179c3.js";
import "./page-home-0c39c14c.js";
window.getBuildInfo = function () {
  return {
    buildTime: "11/19/2024, 8:59:03 AM",
    branch: " commitId:57dcd5a099a5ad2929b9086eb28575d40351b993",
  };
};
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a);
  new MutationObserver((a) => {
    for (const i of a)
      if (i.type === "childList")
        for (const u of i.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && n(u);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function o(a) {
    const i = {};
    return (
      a.integrity && (i.integrity = a.integrity),
      a.referrerPolicy && (i.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function n(a) {
    if (a.ep) return;
    a.ep = !0;
    const i = o(a);
    fetch(a.href, i);
  }
})();
const Rt = {
    class: "tabbar__container",
  },
  Ft = ["onClick"],
  Vt = {
    key: 0,
    class: "promotionBg",
  },
  Gt = V({
    __name: "index",
    setup(t) {
      const e = ve(),
        o = Q();
      async function n(i) {
        await e.push({
          name: i,
        });
      }
      const a = [
        {
          name: "home",
        },
        {
          name: "activity",
        },
        {
          name: "promotion",
        },
        {
          name: "wallet",
        },
        {
          name: "main",
        },
      ];
      return (i, u) => {
        const l = D("svg-icon");
        return (
          p(),
          k("div", Rt, [
            (p(),
            k(
              Z,
              null,
              xe(a, (d, _) =>
                s(
                  "div",
                  {
                    class: _e([
                      "tabbar__container-item",
                      {
                        active: d.name === r(o).name,
                      },
                    ]),
                    key: d + "" + _,
                    onClick: (c) => n(d.name),
                  },
                  [
                    h(
                      l,
                      {
                        name: d.name,
                      },
                      null,
                      8,
                      ["name"],
                    ),
                    d.name === "promotion"
                      ? (p(), k("div", Vt))
                      : w("v-if", !0),
                    s("span", null, v(i.$t(d.name)), 1),
                  ],
                  10,
                  Ft,
                ),
              ),
              64,
            )),
          ])
        );
      };
    },
  });
const Ut = T(Gt, [
  ["__scopeId", "data-v-6ab3f23e"],
  [
    "__file",
    "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/TabBar/index.vue",
  ],
]);
function jt() {
  const t = le(),
    e = () => {
      document.visibilityState === "visible"
        ? t.setvisibility()
        : t.setvisibility(0);
    };
  H(() => {
    document.addEventListener("visibilitychange", e);
  }),
    me(() => {
      document.removeEventListener("visibilitychange", e);
    });
}
const Ht = V({
  __name: "Customer",
  setup(t) {
    pe((m) => ({
      "f6a705e1-currentFontFamily": G.value,
    }));
    const e = f(!1),
      o = f({
        x: 0,
        y: 0,
      }),
      n = f(0),
      a = f(0),
      i = f(0),
      u = f(0),
      l = f(0),
      d = f(0),
      _ = f();
    let c, B, S, C;
    const { getSelfCustomerServiceLink: x } = ge({
      ServerType: 2,
    });
    function N() {
      j(c, B, S, C) || x();
    }
    H(() => {
      _.value = document.getElementById("customerId");
    });
    function y(m) {
      e.value = !0;
      var g;
      m.touches ? (g = m.touches[0]) : (g = m),
        (o.value.x = g.clientX),
        (o.value.y = g.clientY),
        (n.value = _.value.offsetLeft),
        (a.value = _.value.offsetTop),
        (c = m.clientX),
        (B = m.clientY);
    }
    function A(m) {
      if (e.value) {
        var g,
          E = document.getElementById("customerId"),
          U = E.clientWidth,
          Y = E.clientHeight,
          q = document.documentElement.clientHeight,
          b = document.documentElement.clientWidth;
        m.touches ? (g = m.touches[0]) : (g = m),
          (i.value = g.clientX - o.value.x),
          (u.value = g.clientY - o.value.y),
          (l.value = n.value + i.value),
          (d.value = a.value + u.value),
          l.value <= 0 && (l.value = 0),
          d.value <= 0 && (d.value = 0),
          l.value >= b - U && (l.value = b - U),
          d.value >= q - Y && (d.value = q - Y),
          (_.value.style.left = l.value + "px"),
          (_.value.style.top = d.value + "px"),
          document.addEventListener(
            "touchmove",
            function () {
              m.preventDefault();
            },
            !1,
          );
      }
      m.stopPropagation(), m.preventDefault();
    }
    function $(m) {
      (e.value = !1), (S = m.clientX), (C = m.clientY);
    }
    function j(m, g, E, U) {
      return !(Math.sqrt((m - E) * (m - E) + (g - U) * (g - U)) <= 1);
    }
    const G = f("bahnschrift");
    return (m, g) => {
      const E = fe("lazy");
      return (
        p(),
        k(
          "div",
          {
            class: "customer",
            onClick: N,
            onMousedown: y,
            onTouchstart: y,
            onMousemove: A,
            onTouchmove: A,
            onMouseup: $,
            id: "customerId",
          },
          [I(s("img", null, null, 512), [[E, r(M)("home", "icon_sevice")]])],
          32,
        )
      );
    };
  },
});
const Ot = T(Ht, [
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/common/Customer.vue",
    ],
  ]),
  Mt = "/assets/png/logo-b82895d1.png";
const zt = {},
  he = (t) => (Ne("data-v-5eb72be7"), (t = t()), Re(), t),
  Kt = {
    class: "start-page",
  },
  Yt = he(() =>
    s(
      "div",
      {
        class: "dice",
      },
      null,
      -1,
    ),
  ),
  qt = he(() =>
    s(
      "img",
      {
        class: "logo",
        src: Mt,
      },
      null,
      -1,
    ),
  );
function Xt(t, e) {
  return (
    p(),
    k("div", Kt, [
      s("div", null, [Yt, s("p", null, v(t.$t("fairAndSafe")), 1), qt]),
    ])
  );
}
const Wt = T(zt, [
    ["render", Xt],
    ["__scopeId", "data-v-5eb72be7"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/entrance/ar013/StartPage.vue",
    ],
  ]),
  Jt = {
    class: "header",
  },
  Qt = {
    class: "title",
  },
  Zt = {
    class: "tip",
  },
  es = {
    class: "container",
  },
  ts = {
    class: "footer",
  },
  ss = V({
    __name: "dialog",
    setup(t) {
      const e = ve(),
        o = Q(),
        n = f(!1),
        { closeFirstSave: a } = te(),
        { ActiveSotre: i, getFirstRechargeList: u } = ce(),
        l = Fe(new Date()).format("YYYY-MM-DD"),
        d = Ve("firstSave", null),
        _ = F(() => d.value == l),
        c = () => {
          _.value
            ? ((d.value = ""), localStorage.removeItem("firstSave"))
            : (d.value = l);
        },
        B = () => {
          (n.value = !1), a();
        },
        S = ["activity", "home", "main", "wallet", "promotion"];
      J(
        () => o.name,
        (y) => {
          S.includes(o.name) && C();
        },
      );
      const C = () => {
          d.value != l &&
            u().then((y) => {
              if (!y.length) {
                (n.value = !1), a();
                return;
              }
              const A = y.find(($) => $.isFinshed);
              A && (i.value.isShowFirstSaveDialog = !1), A || (n.value = !0);
            });
        },
        x = () => {
          (n.value = !1),
            a(!0),
            e.push({
              name: "FirstRecharge",
            });
        },
        N = () => {
          (n.value = !1),
            a(!0),
            e.push({
              name: "Recharge",
            });
        };
      return (
        H(() => {
          S.includes(o.name) && C();
        }),
        (y, A) => {
          const $ = D("svg-icon"),
            j = D("van-dialog");
          return (
            p(),
            L(
              j,
              {
                show: n.value,
                "onUpdate:show": A[0] || (A[0] = (G) => (n.value = G)),
                className: "firstSaveDialog",
              },
              {
                title: P(() => [
                  s("div", Jt, [
                    s("div", Qt, v(y.$t("firstDialogH")), 1),
                    s("div", Zt, v(y.$t("firstDialogTip")), 1),
                  ]),
                ]),
                footer: P(() => [
                  s("div", ts, [
                    s(
                      "div",
                      {
                        class: _e([
                          "active",
                          {
                            a: _.value,
                          },
                        ]),
                        onClick: c,
                      },
                      [
                        h($, {
                          name: "active",
                        }),
                        z(v(y.$t("noTipToday")), 1),
                      ],
                      2,
                    ),
                    s(
                      "div",
                      {
                        class: "btn",
                        onClick: x,
                      },
                      v(y.$t("activity")),
                      1,
                    ),
                  ]),
                ]),
                default: P(() => [
                  s("div", es, [
                    h(
                      we,
                      {
                        list: r(i).FirstRechargeList,
                        onGorecharge: N,
                      },
                      null,
                      8,
                      ["list"],
                    ),
                  ]),
                  s("div", {
                    class: "close",
                    onClick: B,
                  }),
                ]),
                _: 1,
              },
              8,
              ["show"],
            )
          );
        }
      );
    },
  });
const os = T(ss, [
    ["__scopeId", "data-v-9cd12fb2"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Activity/FirstRecharge/dialog.vue",
    ],
  ]),
  as = {
    class: "dialog-window",
  },
  ns = {
    class: "dialog-wrapper",
  },
  is = {
    class: "dialog-title",
  },
  ls = {
    class: "dialog-content",
  },
  cs = {
    class: "dialog-window",
  },
  rs = {
    class: "dialog-wrapper",
  },
  us = {
    class: "dialog-title",
  },
  ds = {
    class: "dialog-tips",
  },
  vs = {
    class: "dialog-content",
  },
  _s = {
    class: "dialog-tips",
    style: {
      "margin-bottom": "0",
    },
  },
  ms = {
    class: "dialog-window",
  },
  ps = {
    class: "dialog-wrapper",
  },
  fs = {
    class: "dialog-tips",
    style: {
      "margin-top": "10px",
    },
  },
  gs = {
    class: "dialog-title",
    style: {
      "margin-top": "0",
    },
  },
  hs = {
    class: "dialog-tips",
  },
  bs = {
    class: "dialog-content",
  },
  ws = V({
    __name: "AllPageDialog",
    setup(t) {
      Q();
      const { ActiveSotre: e } = ce(),
        {
          store: o,
          closeInvite: n,
          showFirstSave: a,
          onReturnAwards: i,
        } = te();
      return (u, l) => {
        const d = D("van-dialog"),
          _ = fe("lazy");
        return (
          p(),
          k(
            Z,
            null,
            [
              r(a)
                ? (p(),
                  L(os, {
                    key: 0,
                  }))
                : w("v-if", !0),
              h(
                d,
                {
                  show: r(e).showReceiveDialog,
                  "onUpdate:show":
                    l[1] || (l[1] = (c) => (r(e).showReceiveDialog = c)),
                  "show-confirm-button": !1,
                  className: "noOverHidden",
                },
                {
                  default: P(() => [
                    s("div", as, [
                      s("div", ns, [
                        I(s("img", null, null, 512), [
                          [_, r(M)("public", "succeed")],
                        ]),
                        s("div", is, v(u.$t("awardsReceived")), 1),
                        s("div", ls, [
                          I(s("img", null, null, 512), [
                            [_, r(M)("activity/DailyTask", "amountIcon")],
                          ]),
                          s("span", null, v(r(ee)(r(e).receiveAmount)), 1),
                        ]),
                        s(
                          "div",
                          {
                            class: "dialog-btn",
                            onClick:
                              l[0] ||
                              (l[0] = (c) => (r(e).showReceiveDialog = !1)),
                          },
                          v(u.$t("confirm")),
                          1,
                        ),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["show"],
              ),
              h(
                d,
                {
                  show: r(o).invite,
                  "onUpdate:show": l[3] || (l[3] = (c) => (r(o).invite = c)),
                  "show-confirm-button": !1,
                  className: "noOverHidden",
                },
                {
                  default: P(() => [
                    s("div", cs, [
                      s("div", rs, [
                        I(s("img", null, null, 512), [
                          [_, r(M)("public", "succeed")],
                        ]),
                        s("div", us, v(u.$t("inviteTips")), 1),
                        s("p", ds, v(u.$t("inviteAmount")), 1),
                        s("div", vs, [
                          s("span", _s, v(u.$t("commissionAmount")), 1),
                          s("span", null, v(r(ee)(r(o).rebateAmount)), 1),
                        ]),
                        s(
                          "div",
                          {
                            class: "dialog-btn",
                            onClick: l[2] || (l[2] = (c) => r(n)()),
                          },
                          v(u.$t("receive")),
                          1,
                        ),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["show"],
              ),
              h(
                d,
                {
                  show: r(o).oldUser,
                  "onUpdate:show": l[5] || (l[5] = (c) => (r(o).oldUser = c)),
                  "show-confirm-button": !1,
                  "close-on-click-overlay": !0,
                  className: "noOverHidden",
                },
                {
                  default: P(() => [
                    s("div", ms, [
                      s("div", ps, [
                        I(s("img", null, null, 512), [
                          [_, r(M)("public", "succeed")],
                        ]),
                        s("p", fs, v(u.$t("oldPromptTip")), 1),
                        s("div", gs, v(u.$t("oldPrompt")), 1),
                        s("p", hs, v(u.$t("oldPromptGift")), 1),
                        s("div", bs, [
                          s("span", null, v(r(ee)(r(o).returnAwards)), 1),
                        ]),
                        s(
                          "div",
                          {
                            class: "dialog-btn",
                            onClick: l[4] || (l[4] = (c) => r(i)()),
                          },
                          v(u.$t("receive")),
                          1,
                        ),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["show"],
              ),
            ],
            64,
          )
        );
      };
    },
  });
const ys = T(ws, [
    ["__scopeId", "data-v-3d4fafbb"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/common/AllPageDialog.vue",
    ],
  ]),
  ks = V({
    __name: "App",
    setup(t) {
      pe((b) => ({
        "f13b4d11-currentFontFamily": G.value,
      }));
      const { openAll: e } = te(),
        o = Ie(),
        n = f(!1),
        a = f(!1),
        i = Q(),
        u = ye(),
        l = re(),
        { locale: d } = Ge(),
        _ = le(),
        c = f(!1),
        B = F(() => i.meta.tabBar),
        S = "redHome",
        C = F(() =>
          ["electronic", "blackGoldHome"].includes(S)
            ? !1
            : ![
                "/wallet/Withdraw/C2cDetail",
                "/wallet/RechargeHistory/RechargeUpiDetail",
                "/wallet/Withdraw/Upi",
                "/wallet/Withdraw/AddUpi",
                "/wallet/Withdraw/c2cCancelWithdrawal/index.vue",
                "/wallet/otherPay?type=C2C",
                "/home/game",
              ].includes(i.path),
        ),
        x = f(0),
        N = f(Math.floor(Math.random() * 1e4)),
        y = F(() => i.name + N.value),
        A = () => {
          o.on("changeKeepAliveKey", () => {
            N.value = Math.floor(Math.random() * 1e4);
          });
        };
      sessionStorage.getItem("isload")
        ? (n.value = !1)
        : ((a.value = !0),
          sessionStorage.setItem("isload", a.value.toString()),
          (n.value = !0)),
        l.getHomeSetting(),
        J(
          () => l.getAreacode,
          (b) => {
            b && u.setNumberType(b.substring(1));
          },
        ),
        J(
          () => l.getDL,
          (b) => {
            (d.value = b), _.updateLanguage(b), De(b), Te(ue.global.t);
          },
        ),
        setTimeout(() => {
          n.value = !1;
        }, 2e3);
      const $ = f(!1),
        j = ke();
      j.$subscribe((b, R) => {
        ($.value = R.isLoading), j.setLoading($.value);
      });
      const G = f("bahnschrift");
      let m = Se(),
        g = l.getLanguage,
        E = $e(m, g);
      const U = async (b) => {
          const R = [
              {
                title: "vi",
                fontStyle: "bahnschrift",
              },
              {
                title: "else",
                fontStyle: "'Roboto', 'Inter', sans-serif",
              },
            ],
            X = R.findIndex((W) => W.title == E);
          X >= 0
            ? (G.value = R[X].fontStyle)
            : (G.value = R[R.length - 1].fontStyle);
        },
        Y = () => {
          o.on("keyChange", () => {
            x.value++;
          }),
            o.on("changeIsGame", () => {
              (c.value = !c.value), ($.value = !$.value);
            });
        },
        q = () => {
          o.off("keyChange"),
            o.off("changeKeepAliveKey"),
            o.off("changeIsGame");
        };
      return (
        u.setNumberType(l.getAreacode.substring(1)),
        U(),
        H(() => {
          Ce() && Ae(),
            e(),
            q(),
            Y(),
            A(),
            localStorage.getItem("language") &&
              Le(localStorage.getItem("language"));
        }),
        jt(),
        (b, R) => {
          const X = D("LoadingView");
          return (
            p(),
            k(
              Z,
              null,
              [
                h(
                  X,
                  {
                    loading: $.value,
                    type: "loading",
                    isGame: c.value,
                  },
                  {
                    default: P(() => [
                      (p(),
                      L(
                        r(je),
                        {
                          key: x.value,
                        },
                        {
                          default: P(({ Component: W }) => [
                            (p(),
                            L(
                              Ue,
                              {
                                max: 1,
                              },
                              [
                                r(i).meta.keepAlive
                                  ? (p(),
                                    L(ne(W), {
                                      key: y.value,
                                    }))
                                  : w("v-if", !0),
                              ],
                              1024,
                            )),
                            r(i).meta.keepAlive
                              ? w("v-if", !0)
                              : (p(),
                                L(ne(W), {
                                  key: 0,
                                })),
                          ]),
                          _: 1,
                        },
                      )),
                      w("online custom service"),
                      C.value
                        ? (p(),
                          L(Ot, {
                            key: 0,
                          }))
                        : w("v-if", !0),
                      B.value
                        ? (p(),
                          L(Ut, {
                            key: 1,
                          }))
                        : w("v-if", !0),
                    ]),
                    _: 1,
                  },
                  8,
                  ["loading", "isGame"],
                ),
                n.value
                  ? (p(),
                    L(Wt, {
                      key: 0,
                    }))
                  : w("v-if", !0),
                h(ys),
              ],
              64,
            )
          );
        }
      );
    },
  });
const Ss = T(ks, [
  [
    "__file",
    "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/entrance/ar013/App.vue",
  ],
]);
const $s = {
    mounted(t, e) {
      if (typeof e.value[0] != "function" || typeof e.value[1] != "number")
        throw new Error(
          "v-debounce: value must be an array that includes a function and a number",
        );
      let o = null;
      const n = e.value[0],
        a = e.value[1];
      (t.__handleClick__ = function () {
        o && clearTimeout(o),
          (o = setTimeout(() => {
            n();
          }, a || 500));
      }),
        t.addEventListener("click", t.__handleClick__);
    },
    beforeUnmount(t) {
      t.removeEventListener("click", t.__handleClick__);
    },
  },
  Cs = {
    mounted(t, e) {
      if (typeof e.value[0] != "function" || typeof e.value[1] != "number")
        throw new Error(
          "v-throttle: value must be an array that includes a function and a number",
        );
      let o = null;
      const n = e.value[0],
        a = e.value[1];
      (t.__handleClick__ = function () {
        o && clearTimeout(o),
          t.disabled ||
            ((t.disabled = !0),
            n(),
            (o = setTimeout(() => {
              t.disabled = !1;
            }, a || 500)));
      }),
        t.addEventListener("click", t.__handleClick__);
    },
    beforeUnmount(t) {
      t.removeEventListener("click", t.__handleClick__);
    },
  },
  As = {
    mounted(t, e) {
      t.addEventListener("input", (o) => {
        const a = t.value.replace(/\D+/g, "");
        (t.value = a), (e.value = a);
      });
    },
  },
  Ls = (t) => ({
    beforeMount: (e, o) => {
      e.classList.add("ar-lazyload");
      const { value: n } = o;
      (e.dataset.origin = n), t.observe(e);
    },
    updated(e, o) {
      (e.dataset.origin = o.value), t.observe(e);
    },
    unmounted(e, o) {
      t.unobserve(e);
    },
    mounted(e, o) {
      t.observe(e);
    },
  }),
  Is = {
    mounted(t, e) {
      let o = 0;
      const n = e.value && e.value.wait ? e.value.wait : 3e3,
        a = (i) => {
          const u = Date.now();
          u - o >= n &&
            ((o = u), e.value && e.value.handler && e.value.handler(i));
        };
      t.addEventListener("click", a),
        (t._throttleClickCleanup = () => {
          t.removeEventListener("click", a);
        });
    },
    unmounted(t) {
      t._throttleClickCleanup && t._throttleClickCleanup(),
        delete t._throttleClickCleanup;
    },
  },
  Ds = {
    mounted(t, e) {
      const { value: o } = e;
      let n = He("permission", null);
      n.value === null ||
        !o ||
        (n && (n = JSON.parse(n.value)),
        n && n[o] === !1 && (t.style.display = "none"));
    },
  },
  ie = {
    debounce: $s,
    throttle: Cs,
    onlyNum: As,
    throttleClick: Is,
    haspermission: Ds,
  },
  Ts = {
    install: function (t) {
      Object.keys(ie).forEach((o) => {
        t.directive(o, ie[o]);
      });
      const e = new IntersectionObserver(
        (o) => {
          o.forEach((n) => {
            if (n.isIntersecting) {
              const a = n.target;
              (a.src = a.dataset.origin || oe("images", "avatar")),
                (a.onerror = () => {
                  e.unobserve(a);
                  let i = a.dataset.img || oe("images", "avatar");
                  if (!i || (i != null && i.includes("undefined"))) {
                    a.onerror = null;
                    return;
                  }
                  (a.src = i), (a.style.objectFit = "contain");
                }),
                a.classList.remove("ar-lazyload"),
                e.unobserve(a);
            }
          });
        },
        {
          rootMargin: "0px 0px -50px 0px",
        },
      );
      t.directive("lazy", Ls(e));
    },
  },
  Bs = {
    class: "navbar-fixed",
  },
  Es = {
    class: "navbar__content",
  },
  Ps = {
    class: "navbar__content-center",
  },
  xs = {
    class: "navbar__content-title",
  },
  Ns = V({
    __name: "NavBar",
    props: {
      title: {
        type: String,
        default: "",
      },
      placeholder: {
        type: Boolean,
        default: !0,
      },
      leftArrow: {
        type: Boolean,
        default: !1,
      },
      backgroundColor: {
        type: String,
        default: "#f7f8ff",
      },
      classN: {
        type: String,
        default: "",
      },
      headLogo: {
        type: Boolean,
        default: !1,
      },
      headerUrl: {
        type: String,
        default: "",
      },
    },
    emits: ["click-left", "click-right"],
    setup(t, { emit: e }) {
      const o = f(),
        n = re(),
        a = F(() => n.getHeadLogo),
        i = () => {
          e("click-left");
        },
        u = () => {
          e("click-right");
        };
      return (
        H(() => {}),
        (l, d) => {
          const _ = D("van-icon");
          return (
            p(),
            k(
              "div",
              {
                class: "navbar",
                ref_key: "navbar",
                ref: o,
              },
              [
                s("div", Bs, [
                  s("div", Es, [
                    s(
                      "div",
                      {
                        class: "navbar__content-left",
                        onClick: i,
                      },
                      [
                        K(
                          l.$slots,
                          "left",
                          {},
                          () => [
                            t.leftArrow
                              ? (p(),
                                L(_, {
                                  key: 0,
                                  name: "arrow-left",
                                }))
                              : w("v-if", !0),
                          ],
                          !0,
                        ),
                      ],
                    ),
                    s("div", Ps, [
                      t.headLogo
                        ? (p(),
                          k(
                            "div",
                            {
                              key: 0,
                              class: "headLogo",
                              style: Oe({
                                backgroundImage:
                                  "url(" + (t.headerUrl || a.value) + ")",
                              }),
                            },
                            null,
                            4,
                          ))
                        : w("v-if", !0),
                      K(
                        l.$slots,
                        "center",
                        {},
                        () => [s("div", xs, v(t.title), 1)],
                        !0,
                      ),
                    ]),
                    s(
                      "div",
                      {
                        class: "navbar__content-right",
                        onClick: u,
                      },
                      [K(l.$slots, "right", {}, void 0, !0)],
                    ),
                  ]),
                ]),
              ],
              512,
            )
          );
        }
      );
    },
  });
const Rs = T(Ns, [
    ["__scopeId", "data-v-12a80a3e"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/common/NavBar.vue",
    ],
  ]),
  Fs = {
    class: "ar-loading-view",
  },
  Vs = {
    class: "loading-wrapper",
  },
  Gs = {
    class: "com__box",
  },
  Us = Ke(
    '<div class="loading" data-v-647954c7><div class="shape shape-1" data-v-647954c7></div><div class="shape shape-2" data-v-647954c7></div><div class="shape shape-3" data-v-647954c7></div><div class="shape shape-4" data-v-647954c7></div></div>',
    1,
  ),
  js = {
    class: "skeleton-wrapper",
  },
  Hs = {
    class: "iosDialog",
  },
  Os = {
    class: "title",
  },
  Ms = {
    class: "websit_info",
  },
  zs = ["src"],
  Ks = {
    class: "link",
  },
  Ys = {
    class: "text",
  },
  qs = {
    class: "text",
  },
  Xs = {
    class: "text",
  },
  Ws = ["src"],
  Js = V({
    __name: "LoadingView",
    props: {
      loading: {
        type: Boolean,
        required: !0,
      },
      type: {
        type: String,
        required: !0,
      },
      isGame: {
        type: Boolean,
        required: !0,
      },
    },
    setup(t) {
      const e = t,
        o = f();
      let n = null;
      const { homeState: a, downloadIcon: i, webSiteUrl: u } = Be(),
        { getSelfCustomerServiceLink: l } = ge({
          ServerType: 2,
        }),
        d = window.location.href,
        _ = F(() => location.origin || "");
      return (
        H(async () => {
          if (d.includes("?")) {
            const c = new URLSearchParams(d.split("?")[1]);
            c.size && c.get("goTo") === "worktraking" && l("worktraking");
          }
          await Me(),
            (n = ze.loadAnimation({
              container: o.value,
              renderer: "svg",
              loop: !0,
              autoplay: !0,
              path: "/data.json",
            }));
        }),
        J(
          () => e.loading,
          () => {
            e.type === "loading" &&
              !e.isGame &&
              (e.loading ? n && n.play() : n && n.stop());
          },
        ),
        me(() => {
          n && n.destroy(), (n = null);
        }),
        (c, B) => {
          const S = D("VanSkeleton"),
            C = D("svg-icon"),
            x = D("van-popup");
          return (
            p(),
            k(
              Z,
              null,
              [
                I(
                  s(
                    "div",
                    Fs,
                    [
                      K(
                        c.$slots,
                        "template",
                        {},
                        () => [
                          I(
                            s(
                              "div",
                              Vs,
                              [
                                w(" <VanLoading /> "),
                                I(
                                  s(
                                    "div",
                                    {
                                      ref_key: "element",
                                      ref: o,
                                      class: "loading-animat",
                                    },
                                    null,
                                    512,
                                  ),
                                  [[O, !c.isGame]],
                                ),
                                I(
                                  s(
                                    "div",
                                    Gs,
                                    [w(" loading "), Us, w(" 说明：组件名 ")],
                                    512,
                                  ),
                                  [[O, c.isGame]],
                                ),
                                w(' <div class="animation"></div> '),
                              ],
                              512,
                            ),
                            [[O, c.type === "loading"]],
                          ),
                          I(
                            s(
                              "div",
                              js,
                              [
                                h(S, {
                                  row: 10,
                                }),
                                h(S, {
                                  title: "",
                                  avatar: "",
                                  row: 5,
                                }),
                                h(S, {
                                  title: "",
                                  row: 5,
                                }),
                              ],
                              512,
                            ),
                            [[O, c.type === "skeleton"]],
                          ),
                        ],
                        !0,
                      ),
                    ],
                    512,
                  ),
                  [[O, c.loading]],
                ),
                K(c.$slots, "default", {}, void 0, !0),
                h(
                  x,
                  {
                    show: r(a).iosDialog,
                    "onUpdate:show":
                      B[0] || (B[0] = (N) => (r(a).iosDialog = N)),
                    round: "",
                    closeable: "",
                    position: "bottom",
                    style: {
                      height: "40%",
                    },
                  },
                  {
                    default: P(() => [
                      s("div", Hs, [
                        s("div", Os, v(c.$t("pwaInstall")), 1),
                        s("div", Ms, [
                          s(
                            "img",
                            {
                              class: "icon",
                              src: r(i),
                            },
                            null,
                            8,
                            zs,
                          ),
                          s("div", Ks, [
                            s("div", null, v(_.value.split("://")[1]), 1),
                            s("div", null, v(_.value), 1),
                          ]),
                        ]),
                        s("div", Ys, [
                          z("1. " + v(c.$t("pwaText1")) + " ", 1),
                          h(C, {
                            name: "share",
                          }),
                        ]),
                        s("div", qs, [
                          z("2. " + v(c.$t("pwaText2")) + " ", 1),
                          s("span", null, [
                            z(v(c.$t("pwaText3")) + " ", 1),
                            h(C, {
                              name: "add_icon",
                            }),
                          ]),
                        ]),
                        s("div", Xs, [
                          z("3. " + v(c.$t("pwaText4")) + " ", 1),
                          s(
                            "img",
                            {
                              class: "icon",
                              src: r(i),
                            },
                            null,
                            8,
                            Ws,
                          ),
                        ]),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["show"],
                ),
              ],
              64,
            )
          );
        }
      );
    },
  });
const Qs = T(Js, [
  ["__scopeId", "data-v-647954c7"],
  [
    "__file",
    "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/common/LoadingView.vue",
  ],
]);
const Zs = ["xlink:href"],
  eo = {
    __name: "svgIcons",
    props: {
      name: {
        type: String,
        required: !0,
      },
      color: {
        type: String,
        default: "",
      },
    },
    setup(t) {
      const e = t,
        o = F(() => `#icon-${e.name}`),
        n = F(() => (e.name ? `svg-icon icon-${e.name}` : "svg-icon"));
      return (a, i) => (
        p(),
        k(
          "svg",
          Ye(
            {
              class: n.value,
            },
            a.$attrs,
            {
              style: {
                color: t.color,
              },
            },
          ),
          [
            s(
              "use",
              {
                "xlink:href": o.value,
              },
              null,
              8,
              Zs,
            ),
          ],
          16,
        )
      );
    },
  },
  to = T(eo, [
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/common/svgIcons.vue",
    ],
  ]),
  so = {
    class: "ar-searchbar__selector",
  },
  oo = {
    class: "ar-searchbar__selector-default",
  },
  ao = V({
    __name: "ArSelect",
    props: {
      selectName: {
        type: String,
        default: "",
      },
    },
    emits: ["click-select"],
    setup(t, { emit: e }) {
      const o = () => {
        e("click-select");
      };
      return (n, a) => {
        const i = D("van-icon");
        return (
          p(),
          k("div", so, [
            s(
              "div",
              {
                onClick: o,
              },
              [
                s("span", oo, v(t.selectName), 1),
                h(i, {
                  name: "arrow-down",
                }),
              ],
            ),
          ])
        );
      };
    },
  });
const no = T(ao, [
    ["__scopeId", "data-v-fa757a88"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/common/ArSelect.vue",
    ],
  ]),
  io = (t) => {
    t.component("NavBar", Rs),
      t.component("LoadingView", Qs),
      t.component("ArSelect", no),
      t.component("svg-icon", to),
      t
        .use(qe)
        .use(Xe)
        .use(We)
        .use(Je)
        .use(Qe)
        .use(Ze)
        .use(et)
        .use(tt)
        .use(st)
        .use(ot)
        .use(at)
        .use(nt)
        .use(it)
        .use(lt)
        .use(ct)
        .use(rt)
        .use(ut)
        .use(dt)
        .use(vt)
        .use(_t)
        .use(mt)
        .use(pt)
        .use(ft)
        .use(gt)
        .use(ht)
        .use(bt)
        .use(wt)
        .use(yt)
        .use(kt)
        .use(St)
        .use($t)
        .use(Ct)
        .use(At)
        .use(Lt)
        .use(It)
        .use(Dt)
        .use(Tt)
        .use(ue)
        .use(Ts)
        .use(Bt)
        .use(Et);
    let e = t.config.globalProperties,
      o = {};
    (o.TopHeight = 38),
      Object.keys(ae.refiter).forEach((n) => {
        o[n] = ae.refiter[n];
      }),
      (e.$u = o);
  };
Ee.fb({
  38316220667: "2061590324241394",
  42318414899: "893342322790796",
});
de.addRoute({
  path: "/",
  name: "home",
  component: () =>
    Pe(
      () => import("./page-home-0c39c14c.js").then((t) => t.X),
      [
        "assets/js/page-home-0c39c14c.js",
        "assets/js/modules-4d120c6a.js",
        "assets/css/modules-b642e9bc.css",
        "assets/js/page-activity-ea39ac09.js",
        "assets/js/native/index-047f1601.js",
        "assets/js/en-a4a7bd36.js",
        "assets/js/rus-4b29bbd8.js",
        "assets/js/vi-872c7f97.js",
        "assets/js/id-28070973.js",
        "assets/js/hd-27d64f28.js",
        "assets/js/tha-4e3b5587.js",
        "assets/js/md-d52326ed.js",
        "assets/js/bra-75ca4513.js",
        "assets/js/my-8060c426.js",
        "assets/js/bdt-6453a3e1.js",
        "assets/js/zh-0d68ba51.js",
        "assets/js/pak-6eaf680f.js",
        "assets/js/ar-24b179c3.js",
        "assets/css/page-activity-2987852d.css",
        "assets/css/page-home-21a13573.css",
      ],
    ),
  meta: {
    title: "home",
    tabBar: !0,
    keepAlive: !1,
  },
});
const se = Pt(Ss),
  be = xt();
io(se);
be.use(Nt);
se.use(de).use(be);
se.mount("#app");
