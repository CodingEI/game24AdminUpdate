import {
  _ as M,
  a2 as V,
  j as C,
  l as e,
  a4 as ke,
  a5 as Ue,
  o as w,
  H as a,
  a0 as r,
  a6 as k,
  P as Z,
  J as R,
  I as ot,
  r as m,
  K as se,
  a9 as O,
  a7 as G,
  F as qe,
  a3 as ye,
  aa as U,
  a8 as B,
  a1 as q,
  am as pe,
  n as D,
  D as nt,
  ae as ee,
  $ as te,
  ak as Y,
  B as X,
  af as ve,
  ag as me,
  G as Ie,
  A as _e,
  O as be,
  aA as at,
  aM as De,
  N as Me,
  ad as rt,
} from "./modules-4d120c6a.js";
import {
  i as Se,
  _ as A,
  g as ge,
  aZ as de,
  a_ as $e,
  v as lt,
  A as z,
  a$ as it,
  b0 as ut,
  b1 as ct,
  b2 as dt,
  b3 as pt,
  b4 as Ve,
  S as Te,
  G as Ae,
  b5 as Be,
  b6 as vt,
  b7 as mt,
  b8 as _t,
  b9 as gt,
  K as fe,
  u as oe,
  ba as ft,
  bb as ht,
  bc as He,
  bd as Oe,
  be as wt,
  a as Ge,
  D as je,
  bf as We,
  bg as ze,
  bh as yt,
  bi as bt,
  aY as kt,
} from "./page-activity-ea39ac09.js";
import { v as Pe, a as St } from "./page-home-0c39c14c.js";
window.getBuildInfo = function () {
  return {
    buildTime: "11/19/2024, 8:59:03 AM",
    branch: " commitId:57dcd5a099a5ad2929b9086eb28575d40351b993",
  };
};
const Ct = { class: "content" },
  $t = ["onClick"],
  It = { class: "content-item-title" },
  Tt = ["src"],
  Pt = M({
    __name: "ServiceLIst",
    props: {
      list: {
        type: null,
        required: !0,
        default: { type: Array, default: () => [] },
      },
    },
    emits: ["onClick"],
    setup(p, { emit: y }) {
      return (i, t) => {
        const l = V("van-icon");
        return (
          w(),
          C("div", Ct, [
            e("div", null, [
              (w(!0),
              C(
                ke,
                null,
                Ue(
                  i.list,
                  (s, o) => (
                    w(),
                    C(
                      "div",
                      {
                        class: "content-item",
                        key: o,
                        onClick: () => {
                          y("onClick", s);
                        },
                      },
                      [
                        e("div", It, [
                          e(
                            "img",
                            {
                              src: a(Se)("main", `CStype${s.typeID}`),
                              alt: "",
                            },
                            null,
                            8,
                            Tt,
                          ),
                          e("span", null, r(s.typeName || s.name), 1),
                        ]),
                        k(l, { name: "arrow", size: "18px", color: "#A8A8A8" }),
                      ],
                      8,
                      $t,
                    )
                  ),
                ),
                128,
              )),
            ]),
          ])
        );
      };
    },
  });
const Ft = A(Pt, [
  ["__scopeId", "data-v-f4c030dd"],
  [
    "__file",
    "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/common/ServiceLIst.vue",
  ],
]);
function Ke(p) {
  const y = Z(),
    { ServerType: i } = p,
    t = R(() => Te().getIsSelfCustomerService),
    l = ot({ ContactList: [], CollectionList: [] }),
    s = m(),
    o = R(() => l.ContactList),
    d = R(() => l.CollectionList);
  let n = !1;
  function v() {
    y.go(-1);
  }
  function f(g) {
    y.push({
      name:
        i == 1
          ? "Server-ServiceCollection"
          : "CustomerService-ServiceCollection",
      state: { itemId: g.typeID },
    });
  }
  function c(g) {
    if (g.url) {
      if (de()) {
        $e("recharge", { url: g.url, returnType: "1", gameName: "" });
        return;
      }
      lt(g.url);
    }
  }
  const h = async () => {
      const g = await z(i == 1 ? it() : ut());
      g && (l.ContactList = g.data || []);
    },
    $ = async (g) => {
      const L = await z(i == 1 ? ct(g) : dt(g));
      L && (l.CollectionList = L.data || []);
    };
  async function u() {
    const g = await z(pt());
    g && (s.value = g.data || {});
  }
  return {
    List: Ft,
    getIcons: ge,
    goBack: v,
    onItemClick: f,
    onClickUrl: c,
    getList: h,
    ContactList: o,
    getServiceList: $,
    CollectionList: d,
    serviceGroup: s,
    getCustomerServiceGroup: u,
    isCenterServer: t,
    getSelfCustomerServiceLink: async (g) => {
      if (n) return;
      if (!t.value) return y.push({ name: "CustomerService" });
      n = !0;
      let L = null;
      de() ||
        (L = new Promise((T) => {
          T(window.open("about:blank", "_blank"));
        }));
      const S = window.location.origin || "",
        P = await z(Ve(encodeURIComponent(S)));
      if (P != null && P.data) {
        if ((g === "worktraking" && (window.location.href = P.data), de())) {
          $e("recharge", {
            url: g === "addUSTD" ? P.data + "&goToType=addUSDT" : P.data,
            returnType: "1",
            gameName: "",
          });
          return;
        }
        L == null ||
          L.then((T) => {
            T &&
              (T.location.href =
                g === "addUSTD" ? P.data + "&goToType=addUSDT" : P.data);
          });
      } else y.push({ name: "CustomerService" });
      n = !1;
    },
    goToTictek: async (g, L = !1) => {
      if (n || !t.value || L || ![0, 2].includes(g.state)) return;
      n = !0;
      const S = window.location.origin || "";
      let P = null;
      de() ||
        (P = new Promise((K) => {
          K(window.open("about:blank", "_blank"));
        }));
      const T = await z(Ve(encodeURIComponent(S))),
        H =
          (T == null ? void 0 : T.data) +
          `&rechargeNumber=${g.rechargeNumber}&amount=${g.price}`;
      if (T != null && T.data) {
        if (de()) {
          $e("recharge", { url: H, returnType: "1", gameName: "" });
          return;
        }
        P == null ||
          P.then((K) => {
            K && (K.location.href = H);
          });
      }
      n = !1;
    },
  };
}
const Ne = m(!1);
function Xe() {
  const { locale: p } = se(),
    y = Ae(),
    i = Z();
  async function t(d, n) {
    mt(d),
      (p.value = d),
      y.updateLanguage(d),
      await _t(d),
      gt(fe.global.t),
      localStorage.setItem("needUpd", "1"),
      n === 1 ? l() : (Ne.value = !1);
  }
  const l = () => {
      i.back();
    },
    s = R(() => {
      let d = 0;
      const n = Te().getLanguage,
        v = [];
      if (n) {
        const f = n == null ? void 0 : n.replace("th", "tha").split("|");
        f == null ||
          f.forEach((c) => {
            Be.forEach((h) => {
              (c.toLowerCase().indexOf(h.key.toLowerCase()) !== -1 ||
                h.key.toLowerCase().indexOf(c.toLowerCase()) !== -1) &&
                (v.push(h), d++);
            });
          });
      }
      return y.getLanguage || y.updateLanguage(vt()), d == 0 ? Be : v;
    });
  return {
    onClick: t,
    languagesList: s,
    getIcons: ge,
    locale: p,
    goBack: l,
    getLangName: (d) => {
      const n = s.value.find((v) => v.key === d);
      return (n == null ? void 0 : n.key.toLocaleUpperCase()) || "";
    },
    show: Ne,
  };
}
const Lt = ["onClick"],
  xt = { class: "item-title" },
  Et = ["src"],
  Rt = { key: 0 },
  Vt = { key: 1 },
  Bt = M({
    __name: "index",
    props: { type: { type: Number, default: 1 } },
    setup(p) {
      const { onClick: y, languagesList: i, locale: t } = Xe();
      return (l, s) => {
        const o = V("van-radio"),
          d = V("van-radio-group");
        return (
          w(),
          C(
            "div",
            { class: O(p.type === 2 ? "list info" : "list") },
            [
              (w(!0),
              C(
                ke,
                null,
                Ue(
                  a(i),
                  (n, v) => (
                    w(),
                    C(
                      "div",
                      {
                        class: O([
                          "item ar-1px-b",
                          n.key == a(t) ? "checked" : "",
                        ]),
                        key: v,
                        onClick: (f) => a(y)(n.key, p.type),
                      },
                      [
                        e("div", xt, [
                          e(
                            "img",
                            { src: a(Se)("languages", n.key) },
                            null,
                            8,
                            Et,
                          ),
                          p.type === 2
                            ? (w(),
                              C("span", Rt, r(n.key.toLocaleUpperCase()), 1))
                            : (w(), C("span", Vt, r(n.name), 1)),
                        ]),
                        k(
                          d,
                          {
                            modelValue: a(t),
                            "onUpdate:modelValue":
                              s[0] ||
                              (s[0] = (f) => (qe(t) ? (t.value = f) : null)),
                          },
                          {
                            default: G(() => [
                              k(o, { name: n.key }, null, 8, ["name"]),
                            ]),
                            _: 2,
                          },
                          1032,
                          ["modelValue"],
                        ),
                      ],
                      10,
                      Lt,
                    )
                  ),
                ),
                128,
              )),
            ],
            2,
          )
        );
      };
    },
  });
const Nt = A(Bt, [
    ["__scopeId", "data-v-29e221c4"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Main/LanguageList/index.vue",
    ],
  ]),
  Ut = { class: "img" },
  qt = M({
    __name: "LangPopup",
    setup(p) {
      const { getLangName: y, locale: i, show: t } = Xe(),
        l = Te(),
        s = R(() => l.getLoginChangeLanguage == "1");
      return (o, d) => {
        const n = V("van-popup"),
          v = ye("lazy");
        return (
          w(),
          C("div", null, [
            s.value
              ? (w(),
                C(
                  "div",
                  {
                    key: 0,
                    class: "right",
                    onClick: d[0] || (d[0] = (f) => (t.value = !0)),
                  },
                  [
                    e("div", Ut, [
                      U(e("img", null, null, 512), [
                        [v, a(Se)("languages", a(i))],
                      ]),
                    ]),
                    B(" " + r(a(y)(a(i))), 1),
                  ],
                ))
              : q("v-if", !0),
            k(
              n,
              {
                show: a(t),
                "onUpdate:show":
                  d[1] || (d[1] = (f) => (qe(t) ? (t.value = f) : null)),
                class: "popup",
                position: "bottom",
                teleport: "body",
              },
              { default: G(() => [k(Nt, { type: 2 })]), _: 1 },
              8,
              ["show"],
            ),
          ])
        );
      };
    },
  });
const Dt = A(qt, [
    ["__scopeId", "data-v-8610bd15"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/LangPopup.vue",
    ],
  ]),
  Mt = { class: "popups" },
  At = { class: "popup-content" },
  Ht = { class: "tit" },
  Ot = { class: "con" },
  Gt = { class: "info" },
  jt = { class: "txt" },
  Wt = { class: "txt" },
  zt = { class: "box" },
  Kt = ["placeholder"],
  Xt = { class: "lab" },
  Yt = { class: "popup-foot" },
  Zt = M({
    __name: "index",
    props: { showPopup: { type: Boolean, default: m(!1) } },
    emits: ["update:showPopup", "onConfirm", "onBack"],
    setup(p, { emit: y }) {
      const i = p,
        t = Z(),
        { t: l } = se(),
        s = R({
          get() {
            return i.showPopup || !1;
          },
          set(f) {
            y("update:showPopup", f);
          },
        }),
        o = m(""),
        d = () => {
          if (!o.value) return D(l("googleKey"));
          y("onConfirm", o.value.toString());
        },
        n = () => {
          (o.value = ""), y("onBack");
        };
      function v() {
        t.push({ name: "CustomerService" });
      }
      return (f, c) => {
        const h = V("van-icon"),
          $ = V("van-popup"),
          u = ye("throttle-click"),
          I = ye("lazy");
        return (
          w(),
          C("div", Mt, [
            k(
              $,
              {
                show: s.value,
                "onUpdate:show": c[1] || (c[1] = (E) => (s.value = E)),
                position: "center",
                round: "",
                class: "popup",
                "close-on-click-overlay": !1,
              },
              {
                default: G(() => [
                  e("div", At, [
                    e("div", Ht, r(a(l)("googleVerification")), 1),
                    e("div", Ot, [
                      e("div", Gt, [
                        e("p", jt, r(a(l)("googleTip5")), 1),
                        e("p", Wt, r(a(l)("googleTip6")), 1),
                      ]),
                      e("div", zt, [
                        U(
                          e(
                            "input",
                            {
                              class: "input",
                              type: "text",
                              "onUpdate:modelValue":
                                c[0] || (c[0] = (E) => (o.value = E)),
                              maxlength: "6",
                              oninput: "value=value.replace(/\\D/g,'')",
                              placeholder: a(l)("PgoogleVerification"),
                            },
                            null,
                            8,
                            Kt,
                          ),
                          [[pe, o.value]],
                        ),
                        e("p", Xt, [
                          k(h, { class: "icon", name: "warning-o" }),
                          B(r(a(l)("PVerificationCode")) + " ", 1),
                          e(
                            "span",
                            { onClick: v },
                            r(a(l)("contactServicer")),
                            1,
                          ),
                        ]),
                      ]),
                      e("div", Yt, [
                        U((w(), C("div", null, [B(r(a(l)("confirm")), 1)])), [
                          [u, { handler: d, wait: 1e3 }],
                        ]),
                        e(
                          "div",
                          { onClick: n },
                          r(a(l)("withdrawDialogDesc6")),
                          1,
                        ),
                      ]),
                    ]),
                    U(e("img", { class: "close", onClick: n }, null, 512), [
                      [I, a(Se)("main", "close")],
                    ]),
                  ]),
                ]),
                _: 1,
              },
              8,
              ["show"],
            ),
          ])
        );
      };
    },
  });
const Ye = A(Zt, [
    ["__scopeId", "data-v-96e240c3"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Main/VerifyPopup/index.vue",
    ],
  ]),
  ne = (p) => (ve("data-v-869b9ee0"), (p = p()), me(), p),
  Jt = ["src"],
  Qt = ["src"],
  es = { key: 1, class: "captcha_message" },
  ts = { class: "captcha_message__icon" },
  ss = {
    key: 0,
    height: "28",
    viewBox: "0 0 28 28",
    width: "28",
    xmlns: "http://www.w3.org/2000/svg",
  },
  os = ne(() =>
    e(
      "g",
      {
        fill: "none",
        "fill-rule": "evenodd",
        stroke: "#fff",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "1.5",
      },
      [
        e("path", {
          d: "M22.776 4.073A13.2 13.2 0 0 0 14 .75C6.682.75.75 6.682.75 14S6.682 27.25 14 27.25 27.25 21.318 27.25 14c0-.284-.009-.566-.027-.845",
        }),
        e("path", { d: "M7 12.5l7 7 13-13" }),
      ],
      -1,
    ),
  ),
  ns = [os],
  as = {
    key: 1,
    height: "28",
    viewBox: "0 0 28 28",
    width: "28",
    xmlns: "http://www.w3.org/2000/svg",
  },
  rs = ne(() =>
    e(
      "g",
      {
        fill: "none",
        "fill-rule": "evenodd",
        stroke: "#fff",
        "stroke-width": "1.5",
      },
      [
        e("circle", { cx: "14", cy: "14", r: "13.25" }),
        e("path", {
          d: "M8.75 8.75l10.5 10.5M19.25 8.75l-10.5 10.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
      ],
      -1,
    ),
  ),
  ls = [rs],
  is = { class: "captcha_message__text" },
  us = { key: 2, class: "captcha_message loadding" },
  cs = ne(() =>
    e(
      "div",
      { class: "captcha_message__icon captcha_message__icon--loadding" },
      null,
      -1,
    ),
  ),
  ds = { class: "captcha_message__text" },
  ps = { key: 3, class: "captcha_message" },
  vs = ne(() =>
    e(
      "div",
      { class: "captcha_message__icon captcha_message__icon--loadding" },
      null,
      -1,
    ),
  ),
  ms = ne(() => e("div", { class: "captcha_message__text" }, null, -1)),
  _s = [vs, ms],
  gs = ne(() =>
    e(
      "path",
      {
        d: "M500.864 545.728a47.744 47.744 0 0 0 6.72-48.896 24.704 24.704 0 0 0-4.48-8.384L240.256 193.088a34.24 34.24 0 0 0-28.608-17.408 34.24 34.24 0 0 0-25.856 12.864 46.592 46.592 0 0 0 0 59.52l238.08 264.512-238.08 264.512a46.592 46.592 0 0 0-1.088 59.52 32 32 0 0 0 50.56 0l265.6-290.88z",
        "p-id": "820",
      },
      null,
      -1,
    ),
  ),
  fs = ne(() =>
    e(
      "path",
      {
        d: "M523.84 248.064l236.992 264.512-238.08 264.512a46.592 46.592 0 0 0 0 59.52 32 32 0 0 0 50.56 0l265.6-292.608a47.744 47.744 0 0 0 6.72-48.832 24.704 24.704 0 0 0-4.48-8.448L578.304 191.36a34.24 34.24 0 0 0-55.552-2.816 46.592 46.592 0 0 0 1.088 59.52z",
        "p-id": "821",
      },
      null,
      -1,
    ),
  ),
  hs = [gs, fs],
  ws = { key: 0, class: "captcha__actions" },
  ys = ["fill"],
  bs = ne(() =>
    e(
      "path",
      {
        d: "M10,4 C12.0559549,4 13.9131832,5.04358655 15.0015086,6.68322231 L15,5.5 C15,5.22385763 15.2238576,5 15.5,5 C15.7761424,5 16,5.22385763 16,5.5 L16,8.5 C16,8.77614237 15.7761424,9 15.5,9 L12.5,9 C12.2238576,9 12,8.77614237 12,8.5 C12,8.22385763 12.2238576,8 12.5,8 L14.5842317,8.00000341 C13.7999308,6.20218044 12.0143541,5 10,5 C7.23857625,5 5,7.23857625 5,10 C5,12.7614237 7.23857625,15 10,15 C11.749756,15 13.3431487,14.0944653 14.2500463,12.6352662 C14.3958113,12.4007302 14.7041063,12.328767 14.9386423,12.4745321 C15.1731784,12.6202971 15.2451415,12.9285921 15.0993765,13.1631281 C14.0118542,14.9129524 12.0990688,16 10,16 C6.6862915,16 4,13.3137085 4,10 C4,6.6862915 6.6862915,4 10,4 Z",
        "fill-rule": "nonzero",
      },
      null,
      -1,
    ),
  ),
  ks = [bs],
  Ss = M({
    __name: "SlideCaptcha",
    props: {
      width: { type: Number, default: 340 },
      height: { type: Number, default: 212 },
      barHeight: { type: Number, default: 40 },
      handlerIconWidth: { type: Number, default: 16 },
      handlerIconHeigth: { type: Number, default: 16 },
      background: { type: String, default: "#eee" },
      circle: { type: Boolean, default: !1 },
      radius: { type: String, default: "4px" },
      text: { type: String, default: "" },
      progressBarBg: { type: String, default: "#76c61d" },
      successTip: {
        type: String,
        default: "Verification passed, over 80% of users.",
      },
      failTip: {
        type: String,
        default:
          "Verification failed, drag the slider to correctly merge the floating image.",
      },
      showRefresh: { type: Boolean, default: !1 },
      refreshColor: { type: String, default: "#505050" },
    },
    emits: ["finish", "refresh"],
    setup(p, { expose: y, emit: i }) {
      const t = p,
        l = m(!1),
        s = m(!1),
        o = m(0),
        d = m(0),
        n = m(!1),
        v = m(!1),
        f = m(!1),
        c = m([]),
        h = m(void 0),
        $ = m(!1),
        u = m(!1),
        I = m(!1),
        E = m(""),
        g = m(""),
        L = m(!1),
        S = R(() => ({
          width: t.width + "px",
          height: t.height + "px",
          position: "relative",
          overflow: "hidden",
        })),
        P = R(() => ({ width: t.width + "px" })),
        T = R(() => ({
          width: t.width + "px",
          height: t.barHeight + "px",
          lineHeight: t.barHeight + "px",
          background: t.background,
          borderRadius: t.circle ? t.barHeight / 2 + "px" : t.radius,
        })),
        H = R(() => ({
          background: t.progressBarBg,
          height: t.barHeight + "px",
          borderRadius: t.circle
            ? t.barHeight / 2 + "px 0 0 " + t.barHeight / 2 + "px"
            : t.radius,
        })),
        K = R(() => ({ height: t.barHeight + "px", width: t.width + "px" })),
        ue = R(() => ({
          width: t.barHeight + "px",
          height: t.barHeight - 2 + "px",
        })),
        re = R(() => ({
          width: t.handlerIconWidth + "px",
          height: t.handlerIconHeigth + "px",
        })),
        ae = R(() => t.refreshColor),
        b = R(() => ({ color: t.refreshColor })),
        F = m(),
        W = m(),
        J = m(),
        _ = m(),
        x = m(),
        le = () => {
          (l.value = !0),
            X(() => {
              xe(), et();
            }),
            (I.value = !0);
        },
        ce = (N, Q) => {
          (I.value = !1), (E.value = N), (g.value = Q);
        },
        j = () => {
          u.value = !0;
        },
        Je = (N) => {
          (N.value = N), (u.value = !1), ($.value = !0);
        },
        xe = () => {
          (o.value = 0),
            (d.value = 0),
            (c.value = []),
            (s.value = !1),
            (f.value = !1),
            (I.value = !1),
            (u.value = !1),
            ($.value = !1),
            (L.value = !1),
            W && (W.value.style.width = 0),
            _ && (_.value.style.left = 0),
            x && (x.value.style.left = 0);
        },
        Ee = () => {
          window.removeEventListener("touchmove", he),
            window.removeEventListener("touchend", we),
            window.removeEventListener("mousemove", he),
            window.removeEventListener("mouseup", we);
        },
        Re = (N) => {
          !L.value &&
            E.value &&
            g.value &&
            !f.value &&
            (window.addEventListener("touchmove", he),
            window.addEventListener("touchend", we),
            window.addEventListener("mousemove", he),
            window.addEventListener("mouseup", we),
            (s.value = !0),
            (h.value = new Date()),
            (o.value = N.pageX || N.touches[0].pageX),
            (d.value = N.pageY || N.touches[0].pageY));
        },
        he = (N) => {
          if (s.value && !L.value && E.value && g.value && !f.value) {
            const Q = (N.pageX || N.touches[0].pageX) - o.value,
              Ce = (N.pageY || N.touches[0].pageY) - d.value;
            (x.value.style.left = Q + "px"),
              (W.value.style.width = Q + t.barHeight / 2 + "px"),
              (_.value.style.left = Q + "px"),
              c.value.push({
                x: Math.round(Q),
                y: Math.round(Ce),
                t: new Date().getTime() - h.value.getTime(),
              });
          }
        },
        we = () => {
          s.value &&
            !L.value &&
            E.value &&
            g.value &&
            !f.value &&
            ((s.value = !1),
            (f.value = !0),
            Ee(),
            i("finish", {
              backgroundImageWidth: J.value.offsetWidth,
              backgroundImageHeight: J.value.offsetHeight,
              sliderImageWidth: _.value.offsetWidth,
              sliderImageHeight: _.value.offsetHeight,
              startTime: h.value,
              endTime: new Date(),
              tracks: c.value,
            }));
        },
        Qe = (N) => {
          l.value = N;
        },
        et = () => {
          F.value.style.setProperty("--textColor", "#333"),
            F.value.style.setProperty(
              "--width",
              Math.floor(t.width / 2) + "px",
            ),
            F.value.style.setProperty(
              "--pwidth",
              -Math.floor(t.width / 2) + "px",
            );
        },
        tt = () => {
          xe(), i("refresh");
        };
      return (
        y({
          startRequestVerify: j,
          endRequestVerify: Je,
          startRequestGenerate: le,
          endRequestGenerate: ce,
          setShowHiden: Qe,
        }),
        nt(() => {
          Ee();
        }),
        (N, Q) => {
          const Ce = V("van-popup");
          return (
            w(),
            ee(
              Ce,
              {
                show: l.value,
                "onUpdate:show": Q[0] || (Q[0] = (st) => (l.value = st)),
                teleport: "body",
              },
              {
                default: G(() => [
                  e(
                    "div",
                    { class: "captcha", style: te(P.value) },
                    [
                      e(
                        "div",
                        { class: "captcha__main", style: te(S.value) },
                        [
                          E.value
                            ? (w(),
                              C(
                                "img",
                                {
                                  key: 0,
                                  ref_key: "backgroundRef",
                                  ref: J,
                                  alt: "background",
                                  class: "captcha_background",
                                  src: E.value,
                                },
                                null,
                                8,
                                Jt,
                              ))
                            : q("v-if", !0),
                          U(
                            e(
                              "img",
                              {
                                ref_key: "sliderRef",
                                ref: _,
                                alt: "slider",
                                class: O([
                                  "captcha_slider",
                                  { goFirst: n.value, goKeep: v.value },
                                ]),
                                src: g.value,
                              },
                              null,
                              10,
                              Qt,
                            ),
                            [[Y, g.value]],
                          ),
                          $.value
                            ? (w(),
                              C("div", es, [
                                e("div", ts, [
                                  L.value
                                    ? (w(), C("svg", ss, ns))
                                    : (w(), C("svg", as, ls)),
                                ]),
                                e(
                                  "div",
                                  is,
                                  r(L.value ? p.successTip : p.failTip),
                                  1,
                                ),
                              ]))
                            : q("v-if", !0),
                          I.value
                            ? (w(),
                              C("div", us, [
                                cs,
                                e("div", ds, r(N.$t("loading")) + "...", 1),
                              ]))
                            : q("v-if", !0),
                          u.value ? (w(), C("div", ps, _s)) : q("v-if", !0),
                        ],
                        4,
                      ),
                      e(
                        "div",
                        {
                          ref_key: "dragVerifyRef",
                          ref: F,
                          class: "captcha__bar",
                          style: te(T.value),
                        },
                        [
                          e(
                            "div",
                            {
                              ref_key: "progressBarRef",
                              ref: W,
                              class: O([
                                "captcha_progress_bar",
                                { goFirst2: n.value },
                              ]),
                              style: te(H.value),
                            },
                            null,
                            6,
                          ),
                          e(
                            "div",
                            {
                              class: "captcha_progress_bar__text",
                              style: te(K.value),
                            },
                            r(N.$t("slideCaptchaText")),
                            5,
                          ),
                          e(
                            "div",
                            {
                              ref_key: "handlerRef",
                              ref: x,
                              class: O([
                                "captcha_handler",
                                { goFirst: n.value },
                              ]),
                              style: te(ue.value),
                              onMousedown: Re,
                              onTouchstart: Re,
                            },
                            [
                              (w(),
                              C(
                                "svg",
                                {
                                  "p-id": "819",
                                  style: te(re.value),
                                  version: "1.1",
                                  viewBox: "0 0 1024 1024",
                                  xmlns: "http://www.w3.org/2000/svg",
                                },
                                hs,
                                4,
                              )),
                            ],
                            38,
                          ),
                        ],
                        4,
                      ),
                      p.showRefresh
                        ? (w(),
                          C("div", ws, [
                            e(
                              "a",
                              {
                                class: "captcha__action",
                                style: te(b.value),
                                onClick: tt,
                              },
                              [
                                (w(),
                                C(
                                  "svg",
                                  {
                                    fill: ae.value,
                                    height: "20px",
                                    version: "1.1",
                                    viewBox: "0 0 20 20",
                                    width: "20px",
                                    xmlns: "http://www.w3.org/2000/svg",
                                  },
                                  ks,
                                  8,
                                  ys,
                                )),
                                q(
                                  ' <span class="captcha__action__text">刷新</span> ',
                                ),
                              ],
                              4,
                            ),
                          ]))
                        : q("v-if", !0),
                    ],
                    4,
                  ),
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
const Ze = A(Ss, [
    ["__scopeId", "data-v-869b9ee0"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/SlideCaptcha.vue",
    ],
  ]),
  Cs = { class: "verifyInput__container" },
  $s = { class: "verifyInput__container-label" },
  Is = { key: 0 },
  Ts = { key: 1 },
  Ps = { class: "verifyInput__container-input" },
  Fs = ["placeholder"],
  Ls = { key: 0 },
  xs = { key: 1 },
  Es = { class: "verifyInput__container-tip" },
  Rs = M({
    __name: "VerifyInput",
    props: {
      value: { type: String, required: !1 },
      typeP: { type: String, required: !1 },
      isShowVerifyT: { type: Boolean, required: !1 },
      placeholder: {
        type: String,
        required: !1,
        default: fe.global.t("registerTip1"),
      },
      sendFunc: { type: Function, required: !1 },
      number: { type: String, required: !1 },
      numberType: { type: String, required: !1, default: "" },
      showVerify: { type: Boolean, required: !1, default: !0 },
      email: { type: String, required: !1 },
      loginType: { type: String, required: !1 },
    },
    emits: ["update:value"],
    setup(p, { emit: y }) {
      const i = p,
        { t } = se(),
        l = oe(),
        o = Ae().getUserInfo,
        d = Z(),
        n = R({
          get() {
            return i.value || "";
          },
          set(u) {
            y("update:value", u);
          },
        }),
        v = m(!0);
      async function f() {
        var I;
        if ((v.value && (v.value = !1), l.countDown > 0)) return;
        if (
          d.currentRoute.value.name === "rpwd" ||
          d.currentRoute.value.name === "register" ||
          (d.currentRoute.value.name === "SettingC-UpdatePhone" &&
            !i.isShowVerifyT)
        ) {
          if (!((I = i.number) != null && I.trim()))
            return D({ message: t("telUndetected"), wordBreak: "break-word" });
          const E = (i.number.trim() + i.numberType.trim()).length;
          if (E < 10 || E > 14)
            return D({ message: t("wrongTel"), wordBreak: "break-word" });
        } else if (
          !localStorage.getItem("numberType") &&
          localStorage.getItem("number")
        )
          return D({ message: t("telUndetected"), wordBreak: "break-word" });
        !i.sendFunc || (await i.sendFunc()) === -1 || l.sendCode();
      }
      const c = R(() => {
          var u;
          return i.number
            ? i.numberType + i.number
            : ((u = o == null ? void 0 : o.verifyMethods) == null
                ? void 0
                : u.mobile) ||
                localStorage.getItem("numberType") +
                  localStorage.getItem("number");
        }),
        h = (u) => {
          const I = u.target;
          (I.value = I.value.replace(/\s+/g, "")),
            (I.value = I.value.replace(/[^\d]/g, ""));
        };
      function $() {
        d.push({ name: "CustomerService" });
      }
      return (u, I) => {
        const E = V("svg-icon"),
          g = V("van-icon");
        return U(
          (w(),
          C(
            "div",
            Cs,
            [
              U(
                e(
                  "div",
                  $s,
                  [
                    k(E, { name: "verify" }),
                    u.typeP === "updatePhone" || u.typeP === "lock"
                      ? (w(),
                        C(
                          "span",
                          Is,
                          r(u.$t("sendVerifyCodeTo")) + " " + r(a(ft)(c.value)),
                          1,
                        ))
                      : (w(), C("span", Ts, r(u.$t("verifyCode")), 1)),
                  ],
                  512,
                ),
                [[Y, !(u.isShowVerifyT === !1 && u.typeP === "updatePhone")]],
              ),
              e("div", Ps, [
                U(
                  e(
                    "input",
                    {
                      type: "text",
                      "onUpdate:modelValue":
                        I[0] || (I[0] = (L) => (n.value = L)),
                      placeholder: u.$t("phEnterVerificationCode"),
                      maxlength: "6",
                      onInput: h,
                    },
                    null,
                    40,
                    Fs,
                  ),
                  [[pe, n.value]],
                ),
                e(
                  "button",
                  { onClick: f, class: O({ inActive: a(l).countDown > 0 }) },
                  [
                    a(l).countDown === 0
                      ? (w(), C("span", Ls, r(u.$t("send")), 1))
                      : (w(), C("span", xs, r(a(l).countDown) + "S ", 1)),
                  ],
                  2,
                ),
              ]),
              U(
                e(
                  "div",
                  Es,
                  [
                    k(g, { name: "warning-o" }),
                    e("span", null, r(u.$t("codeUnreceived")) + "?", 1),
                    e(
                      "span",
                      { onClick: I[1] || (I[1] = (L) => $()) },
                      r(u.$t("contactServicer")),
                      1,
                    ),
                  ],
                  512,
                ),
                [[Y, !v.value]],
              ),
            ],
            512,
          )),
          [[Y, u.showVerify]],
        );
      };
    },
  });
const Vs = A(Rs, [
    ["__scopeId", "data-v-c17848a2"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/VerifyInput.vue",
    ],
  ]),
  Bs = { class: "passwordInput__container" },
  Ns = { class: "passwordInput__container-label" },
  Us = { class: "passwordInput__container-input" },
  qs = ["type", "placeholder", "maxlength", "value"],
  Ds = ["src"],
  Ms = M({
    __name: "PasswordInput",
    props: {
      value: { type: String, required: !1 },
      maxlength: { type: Number, required: !1, default: 15 },
      label: { type: String, required: !0 },
    },
    emits: ["update:value"],
    setup(p, { emit: y }) {
      const i = p,
        t = fe.global.t,
        l = m(),
        s = m(""),
        o = m(!1);
      Ie(
        s,
        (S) => {
          y("update:value", S);
        },
        { flush: "post" },
      );
      const d = (S) => {
          if (o.value) return;
          let P = f();
          const T = S.target;
          T.value = T.value.replace(/\s+/g, "");
          const H = /[\u4e00-\u9fa5]/g;
          (T.value = T.value.replace(H, "")), c(P, T.value), h(T.value), $(P);
        },
        n = m(!1),
        v = R(() => ge("main", `${n.value ? "eyeVisible" : "eyeInvisible"}`)),
        f = () => {
          var S = { start: 0, end: 0 };
          return (
            (S.start = l.value.selectionStart),
            (S.end = l.value.selectionEnd),
            S
          );
        },
        c = (S, P) => {
          if (P.length > 1 && !P.includes("•")) {
            s.value = P;
            return;
          }
          let T = P.split("•").join("");
          if (T) {
            let H = s.value.length - (P.length - S.end);
            s.value = s.value.slice(0, S.end - T.length) + T + s.value.slice(H);
          } else
            s.value =
              s.value.slice(0, S.end) +
              s.value.slice(S.end + s.value.length - P.length);
        },
        h = (S) => {
          if (n.value) return;
          if (!S) {
            l.value.value = "";
            return;
          }
          let P = "";
          for (let T = 0; T < S.length; T++) P += "•";
          l.value.value = P;
        },
        $ = (S) => {
          l.value.setSelectionRange(S.start, S.end);
        },
        u = () => {
          o.value = !0;
        },
        I = (S) => {
          o.value && ((o.value = !1), d(S));
        },
        E = () => {
          (n.value = !n.value),
            n.value ? (l.value.value = s.value) : h(s.value);
        };
      _e(() => {
        (s.value = i.value || ""), h(s.value);
      });
      const g = localStorage.getItem("language"),
        L = R(() => {
          let S,
            P = i.label;
          switch (g) {
            case "vi":
              switch (P) {
                case "Đặt mật khẩu":
                  S = t("setLoginPSW");
                  break;
                case "Xác nhận mật khẩu":
                  S = t("enterPswConfirmation");
                  break;
                default:
                  S = t("phEnter") + P;
                  break;
              }
              break;
            default:
              S = P;
          }
          return S;
        });
      return (S, P) => {
        const T = V("svg-icon");
        return (
          w(),
          C("div", Bs, [
            e("div", Ns, [
              k(T, {
                name: "editPswIcon",
                class: "passwordInput__container-label__icon",
              }),
              e("span", null, r(S.label), 1),
            ]),
            e("div", Us, [
              e(
                "input",
                {
                  type: n.value ? "text" : "password",
                  placeholder: L.value,
                  maxlength: S.maxlength,
                  onInput: d,
                  onCompositionstart: u,
                  onCompositionend: I,
                  ref_key: "inputPwd",
                  ref: l,
                  value: S.value,
                  autocomplete: "new-password",
                },
                null,
                40,
                qs,
              ),
              e("img", { src: v.value, class: "eye", onClick: E }, null, 8, Ds),
            ]),
          ])
        );
      };
    },
  });
const ie = A(Ms, [
    ["__scopeId", "data-v-ea5b66c8"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/PasswordInput.vue",
    ],
  ]),
  Fe = (p) => (ve("data-v-ab583a3a"), (p = p()), me(), p),
  As = { class: "RpwdPopup" },
  Hs = { class: "RpwdPopup-head" },
  Os = { class: "RpwdPopup-topTip" },
  Gs = Fe(() => e("br", null, null, -1)),
  js = { class: "RpwdPopup-tip" },
  Ws = Fe(() => e("div", { class: "tipbg" }, null, -1)),
  zs = { class: "RpwdPopup-errorTip" },
  Ks = { key: 0 },
  Xs = { class: "errorTip" },
  Ys = Fe(() => e("br", null, null, -1)),
  Zs = { class: "RpwdPopup-foot" },
  Js = M({
    __name: "RpwdPopup",
    props: {
      show: { type: Boolean, default: !1 },
      gamePresentation: { type: String, default: "" },
      phoneNumber: { type: String, default: "" },
      phoneNumberType: { type: String, default: "" },
      passwordErrorMaxNum: { default: 10 },
    },
    emits: ["update:show"],
    setup(p, { emit: y }) {
      const i = p,
        { t } = se(),
        l = Z(),
        s = m(!1),
        o = oe(),
        d = m(!1),
        n = m({ smsvcode: "", password: "", rePassword: "" }),
        v = R({
          get() {
            return i.show || !1;
          },
          set($) {
            $ || y("update:show", !1);
          },
        }),
        f = async () => {
          if (!i.phoneNumber) return;
          (await z(
            ht({
              phone: i.phoneNumberType + i.phoneNumber,
              codeType: He.resetPassword,
            }),
          ))
            ? be(t("sendSuccess"))
            : setTimeout(() => {
                o.setCountDown(0);
              }, 500);
        },
        c = async () => {
          if (!n.value.smsvcode.trim())
            return D({ message: t("registerTip1"), wordBreak: "break-word" });
          if (n.value.smsvcode.trim().length != 6)
            return D({
              message: t("verifyCode6Digits"),
              wordBreak: "break-word",
            });
          if (!n.value.password.trim())
            return D({ message: t("registerTip2"), wordBreak: "break-word" });
          if (!Pe.passReg3.test(n.value.password)) {
            s.value = !0;
            return;
          }
          if (!n.value.rePassword.trim())
            return D({ message: t("registerTip3"), wordBreak: "break-word" });
          if (n.value.password !== n.value.rePassword) {
            d.value = !0;
            return;
          } else d.value = !1;
          const { password: $, smsvcode: u } = n.value;
          let I = {
            username: i.phoneNumberType + i.phoneNumber,
            password: $,
            type: "mobile",
            smsvcode: u,
          };
          (await z(Oe(I))) &&
            (be(t("rpdsucceed")), localStorage.clear(), y("update:show", !1));
        },
        h = () => {
          l.push({ name: "CustomerService" });
        };
      return ($, u) => {
        const I = V("svg-icon"),
          E = V("van-popup");
        return (
          w(),
          C(
            ke,
            null,
            [
              q(" 规则弹层 begin"),
              k(
                E,
                {
                  show: v.value,
                  "onUpdate:show": u[4] || (u[4] = (g) => (v.value = g)),
                  "close-on-click-overlay": !1,
                  position: "bottom",
                  round: "",
                },
                {
                  default: G(() => [
                    e("div", As, [
                      e("div", Hs, r(a(t)("idlockTitle")), 1),
                      e("div", Os, [
                        B(r(a(t)("idlockTip1", [p.passwordErrorMaxNum])), 1),
                        Gs,
                        B(r(a(t)("idlockTip3")), 1),
                      ]),
                      k(
                        Vs,
                        {
                          value: n.value.smsvcode,
                          "onUpdate:value":
                            u[0] || (u[0] = (g) => (n.value.smsvcode = g)),
                          number: p.phoneNumber,
                          sendFunc: f,
                          numberType: p.phoneNumberType,
                          "type-p": "lock",
                        },
                        null,
                        8,
                        ["value", "number", "numberType"],
                      ),
                      k(
                        ie,
                        {
                          value: n.value.password,
                          "onUpdate:value":
                            u[1] || (u[1] = (g) => (n.value.password = g)),
                          label: a(t)("newPSWRest"),
                        },
                        null,
                        8,
                        ["value", "label"],
                      ),
                      U(
                        e(
                          "div",
                          js,
                          [Ws, e("span", null, r(a(t)("pswRule")), 1)],
                          512,
                        ),
                        [[Y, s.value]],
                      ),
                      k(
                        ie,
                        {
                          value: n.value.rePassword,
                          "onUpdate:value":
                            u[2] || (u[2] = (g) => (n.value.rePassword = g)),
                          label: a(t)("newPSWconfirm"),
                        },
                        null,
                        8,
                        ["value", "label"],
                      ),
                      e("div", zs, [
                        d.value
                          ? (w(), C("span", Ks, r(a(t)("unmatchedInput")), 1))
                          : q("v-if", !0),
                      ]),
                      e(
                        "div",
                        {
                          class: "gotuserver van-hairline--surround",
                          onClick: h,
                        },
                        [
                          k(I, { name: "customer1" }),
                          B(r(a(t)("contactServicer")), 1),
                        ],
                      ),
                      e("div", Xs, [
                        B(r(a(t)("wrongTel")), 1),
                        Ys,
                        B(r(a(t)("rpwdPopupTip")), 1),
                      ]),
                      e("div", Zs, [
                        e(
                          "button",
                          { class: "dialogBtn", onClick: c },
                          r(a(t)("confirm")),
                          1,
                        ),
                        e(
                          "button",
                          {
                            class: "dialogBtn",
                            onClick:
                              u[3] || (u[3] = (g) => y("update:show", !1)),
                          },
                          r(a(t)("cancel")),
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
            2112,
          )
        );
      };
    },
  });
const Qs = A(Js, [
    ["__scopeId", "data-v-ab583a3a"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/RpwdPopup.vue",
    ],
  ]),
  eo = { class: "phoneInput__container" },
  to = { class: "phoneInput__container-label" },
  so = { class: "phoneInput__container-input" },
  oo = ["placeholder"],
  no = M({
    __name: "PhoneInput",
    props: {
      type: { type: String, required: !0 },
      showValidate: { type: Boolean, required: !0 },
      typeP: { type: String, required: !1 },
      numberType: { type: String, required: !0 },
      number: { type: String, required: !0 },
    },
    emits: ["update:show-validate", "changeT", "changeN"],
    setup(p, { expose: y, emit: i }) {
      const t = p,
        l = m(),
        s = R({
          get() {
            return t.number;
          },
          set(c) {
            i("changeN", c.replace(/[^0-9]/g, ""));
          },
        });
      function o(c) {
        c.target.value.length < 6 && i("update:show-validate", !0);
      }
      function d(c) {
        const h = c.target,
          $ = /[\u4e00-\u9fa5]/g;
        (h.value = h.value.replace($, "")),
          h.value.length > 0 && i("update:show-validate", !1);
      }
      const n = (c) => {
        i("changeT", c);
      };
      at(l, () => {
        l.value.close();
      }),
        _e(() => {});
      const v = m();
      function f() {
        X(() => {
          v.value.focus();
        });
      }
      return (
        y({ getFocus: f }),
        (c, h) => {
          const $ = V("svg-icon"),
            u = ye("only-num");
          return (
            w(),
            C("div", eo, [
              e("div", to, [
                k($, { name: "phone" }),
                e("span", null, r(c.$t("phone")), 1),
              ]),
              e("div", so, [
                k(
                  wt,
                  {
                    typeValue: t.numberType,
                    ref_key: "dropDown",
                    ref: l,
                    onChangeT: n,
                  },
                  null,
                  8,
                  ["typeValue"],
                ),
                U(
                  e(
                    "input",
                    {
                      type: "text",
                      name: "userNumber",
                      "onUpdate:modelValue":
                        h[0] || (h[0] = (I) => (s.value = I)),
                      placeholder: c.$t("plsEnterTel"),
                      onBlur: o,
                      onInput: d,
                      ref_key: "number",
                      ref: v,
                    },
                    null,
                    40,
                    oo,
                  ),
                  [[u], [pe, s.value]],
                ),
              ]),
            ])
          );
        }
      );
    },
  });
const ao = A(no, [
    ["__scopeId", "data-v-50aa8bb0"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/PhoneInput.vue",
    ],
  ]),
  ro = (p) => (ve("data-v-33f88764"), (p = p()), me(), p),
  lo = { class: "signIn__container" },
  io = { class: "signIn__container-button" },
  uo = { class: "signIn_footer" },
  co = { class: "font24" },
  po = { class: "font24" },
  vo = { class: "idlockTip" },
  mo = ro(() => e("br", null, null, -1)),
  _o = ["src"],
  go = M({
    __name: "SignIn",
    setup(p, { expose: y }) {
      const i = Z(),
        { t } = se(),
        l = m("login"),
        { setLoading: s } = Ge(),
        o = oe(),
        d = m(!1),
        { getSelfCustomerServiceLink: n, isCenterServer: v } = Ke({
          ServerType: 2,
        }),
        f = m(!1),
        c = m(10),
        h = m();
      let $ = !1;
      async function u() {
        if (!$) {
          if (
            (($ = !0),
            We() && (await new Promise((_) => setTimeout(_, 1e3))),
            ($ = !1),
            !o.userForm.number || o.userForm.number.toString().trim() === "")
          ) {
            f.value = !0;
            return;
          }
          if (
            !o.userForm.password ||
            o.userForm.password.toString().trim() === ""
          )
            return D({ message: t("registerTip2"), wordBreak: "break-word" });
          (o.userForm.numberType = o.getUserForm.numberType.replace("+", "")),
            o.userForm.remember && o.userForm.password.toString().trim() !== ""
              ? localStorage.setItem("remember", o.userForm.password)
              : localStorage.setItem("remember", ""),
            o.isOpenCaptcha && !S.value
              ? ae()
              : (s(!0),
                await o
                  .signIn(o.userForm)
                  .then((_) => {
                    o.userForm.vCode = "";
                  })
                  .catch((_) => {
                    var x;
                    (S.value = !1),
                      _.code === 1 &&
                        (c.value =
                          ((x = _.data) == null
                            ? void 0
                            : x.passwordErrorMaxNum) || 10),
                      _.msgCode === 33
                        ? X(() => (F.value = !0))
                        : b(_.msgCode || 0);
                  })
                  .finally(() => {
                    T.value.setShowHiden(!1), s(!1);
                  }));
        }
      }
      const I = () => {
        i.push({ name: "register" });
      };
      function E() {
        i.push({ name: "rpwd" }), o.setCurrentView("ResetPassword");
      }
      function g() {
        n();
      }
      const L = (_) => {
          o.getUserForm.numberType = _;
        },
        S = m(!1),
        P = (_) => {
          o.getUserForm.number = _;
        },
        T = m(),
        H = m(""),
        K = () => {
          (d.value = !1), n();
        };
      De(window, "keydown", (_) => {
        _.key == "Enter" && u();
      }),
        _e(async () => {
          var x;
          const _ = o.getUserForm;
          localStorage.getItem("remember") != null &&
          ((x = localStorage.getItem("remember")) == null
            ? void 0
            : x.toString().trim()) != ""
            ? (_.password = localStorage.getItem("remember"))
            : (_.password = ""),
            o.setUserForm({ ..._ });
        });
      let ue = Ie(
        () => o.userForm.number,
        (_) => {
          o.setCountDown(0);
        },
        { flush: "post" },
      );
      const re = async (_) => {
          X(async () => {
            T.value.startRequestVerify(),
              s(!0),
              o
                .signIn(
                  Object.assign(o.userForm, { captchaId: H.value, track: _ }),
                )
                .then((x) => {})
                .catch((x) => {
                  var le;
                  x.code === 1 &&
                    (c.value =
                      ((le = x.data) == null
                        ? void 0
                        : le.passwordErrorMaxNum) || 10),
                    x.msgCode === 33
                      ? (X(() => (F.value = !0)), (S.value = !0))
                      : b(x.msgCode || 0);
                })
                .finally(() => {
                  T.value.setShowHiden(!1), s(!1);
                });
          });
        },
        ae = () => {
          X(async () => {
            T.value.startRequestGenerate();
            const _ = await z(ze());
            _
              ? ((H.value = _.data.captchaId),
                T.value.endRequestGenerate(
                  _.data.backgroundImage,
                  _.data.sliderImage,
                ))
              : T.value.endRequestGenerate(null, null);
          });
        },
        b = (_) => {
          _ == 122 && (d.value = !0);
        };
      Me(() => {
        ue(), o.getUserForm.remember || (o.getUserForm.password = "");
      });
      const F = m(!1),
        W = (_) => {
          (o.userForm.vCode = _), u();
        },
        J = () => {
          (F.value = !1), (o.userForm.vCode = "");
        };
      return (
        y({ showPhoneValidate: f }),
        (_, x) => {
          const le = V("van-checkbox"),
            ce = V("svg-icon");
          return (
            w(),
            C("div", lo, [
              k(
                ao,
                {
                  "show-validate": f.value,
                  "onUpdate:showValidate":
                    x[0] || (x[0] = (j) => (f.value = j)),
                  ref_key: "phone",
                  ref: h,
                  type: l.value,
                  "number-type": a(o).getUserForm.numberType,
                  number: a(o).userForm.number,
                  onChangeT: L,
                  onChangeN: P,
                },
                null,
                8,
                ["show-validate", "type", "number-type", "number"],
              ),
              k(
                ie,
                {
                  value: a(o).userForm.password,
                  "onUpdate:value":
                    x[1] || (x[1] = (j) => (a(o).userForm.password = j)),
                  label: _.$t("password"),
                  maxlength: 32,
                },
                null,
                8,
                ["value", "label"],
              ),
              e("div", null, [
                k(
                  le,
                  {
                    modelValue: a(o).userForm.rememberpwd,
                    "onUpdate:modelValue":
                      x[2] || (x[2] = (j) => (a(o).userForm.rememberpwd = j)),
                  },
                  { default: G(() => [B(r(_.$t("rememberPSW")), 1)]), _: 1 },
                  8,
                  ["modelValue"],
                ),
              ]),
              e("div", io, [
                e(
                  "button",
                  {
                    class: O([a(o).userForm.number != "" ? "active" : ""]),
                    onClick: u,
                  },
                  r(_.$t("login")),
                  3,
                ),
                e(
                  "button",
                  { class: "register", onClick: I },
                  r(_.$t("register")),
                  1,
                ),
              ]),
              e("div", uo, [
                a(o).isOpenForgetPasswordSMSState ||
                a(o).isOpenForgetPasswordEmailState
                  ? (w(),
                    C("div", { key: 0, class: "forgetcon", onClick: E }, [
                      k(ce, { name: "clock_b", class: "forgetbg" }),
                      e("div", co, r(_.$t("forgetPSW")), 1),
                    ]))
                  : q("v-if", !0),
                e("div", { class: "customcon", onClick: g }, [
                  a(v)
                    ? (w(),
                      ee(ce, {
                        key: 0,
                        name: "serverTicket1",
                        class: "forgetbg",
                      }))
                    : (w(),
                      ee(ce, {
                        key: 1,
                        name: "customer_b",
                        class: "forgetbg",
                      })),
                  e(
                    "div",
                    po,
                    r(
                      a(v)
                        ? a(t)("serverTicket")
                        : _.$t("customerServiceTitle"),
                    ),
                    1,
                  ),
                ]),
              ]),
              k(
                Ze,
                {
                  ref_key: "captchaRef",
                  ref: T,
                  "refresh-color": "#FFFFFF",
                  "show-refresh": !0,
                  text: a(t)("slideCaptchaText"),
                  onFinish: re,
                  onRefresh: ae,
                },
                null,
                8,
                ["text"],
              ),
              q("10锁定密码弹窗"),
              a(o).isOpenForgetPasswordSMSState && d.value
                ? (w(),
                  ee(
                    Qs,
                    {
                      key: 0,
                      show: d.value,
                      "onUpdate:show": x[3] || (x[3] = (j) => (d.value = j)),
                      phoneNumber: a(o).getUserForm.number,
                      phoneNumberType: a(o).getUserForm.numberType,
                      passwordErrorMaxNum: c.value,
                    },
                    null,
                    8,
                    [
                      "show",
                      "phoneNumber",
                      "phoneNumberType",
                      "passwordErrorMaxNum",
                    ],
                  ))
                : (w(),
                  ee(
                    je,
                    {
                      key: 1,
                      show: d.value,
                      "onUpdate:show": x[5] || (x[5] = (j) => (d.value = j)),
                      "show-cancel-btn": !0,
                      title: _.$t("idlockTitle"),
                    },
                    {
                      content: G(() => [
                        e("div", vo, [
                          B(r(_.$t("idlockTip1", [c.value])) + " ", 1),
                          mo,
                          B(r(_.$t("idlockTip2")), 1),
                        ]),
                      ]),
                      footer: G(() => [
                        e(
                          "button",
                          {
                            class: "dialogBtn",
                            onClick: x[4] || (x[4] = (j) => (d.value = !1)),
                          },
                          r(_.$t("cancel")),
                          1,
                        ),
                        e("button", { class: "dialogBtn", onClick: K }, [
                          e(
                            "img",
                            { src: a(ge)("main", "iconservr") },
                            null,
                            8,
                            _o,
                          ),
                          B(" " + r(_.$t("contactServicer")), 1),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ["show", "title"],
                  )),
              q(" 验证弹窗 "),
              k(
                Ye,
                { showPopup: F.value, onOnConfirm: W, onOnBack: J },
                null,
                8,
                ["showPopup"],
              ),
            ])
          );
        }
      );
    },
  });
const fo = A(go, [
    ["__scopeId", "data-v-33f88764"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/SignIn.vue",
    ],
  ]),
  ho = { class: "verifyInput__container" },
  wo = { class: "verifyInput__container-label" },
  yo = { key: 0 },
  bo = { key: 1 },
  ko = { class: "verifyInput__container-input" },
  So = ["placeholder"],
  Co = { key: 0 },
  $o = { key: 1 },
  Io = { class: "verifyInput__container-tip" },
  To = M({
    __name: "VerifyEmailInput",
    props: {
      value: { type: String, required: !1 },
      typeP: { type: String, required: !1 },
      isShowVerifyT: { type: Boolean, required: !1 },
      placeholder: {
        type: String,
        required: !1,
        default: fe.global.t("registerTip6"),
      },
      sendFunc: { type: Function, required: !1 },
      number: { type: String, required: !1 },
      numberType: { type: String, required: !1 },
      showVerify: { type: Boolean, required: !1, default: !0 },
      email: { type: String, required: !1, default: "" },
      loginType: { type: String, required: !1 },
    },
    emits: ["update:value"],
    setup(p, { emit: y }) {
      const i = p;
      se();
      const t = oe(),
        l = Z(),
        s = R({
          get() {
            return i.value || "";
          },
          set(c) {
            y("update:value", c);
          },
        }),
        o = m(!0);
      async function d() {
        o.value && (o.value = !1),
          !(t.countEmailDown > 0) &&
            (t.sendEmailCode(), i.sendFunc && i.sendFunc());
      }
      const n = R(() => localStorage.getItem("email") || i.email),
        v = (c) => {
          const h = c.target;
          (h.value = h.value.replace(/\s+/g, "")),
            (h.value = h.value.replace(/[^\d]/g, ""));
        };
      function f() {
        l.push({ name: "CustomerService" });
      }
      return (c, h) => {
        const $ = V("svg-icon"),
          u = V("van-icon");
        return U(
          (w(),
          C(
            "div",
            ho,
            [
              U(
                e(
                  "div",
                  wo,
                  [
                    k($, {
                      name: "safeIcon",
                      class: "verifyInput__container-label__icon",
                    }),
                    c.typeP === "updateEmail" || c.typeP === "lock"
                      ? (w(),
                        C(
                          "span",
                          yo,
                          r(c.$t("sendVerifyCodeTo")) + " " + r(a(yt)(n.value)),
                          1,
                        ))
                      : (w(), C("span", bo, r(c.$t("verifyCode")), 1)),
                  ],
                  512,
                ),
                [[Y, !(c.isShowVerifyT === !1 && c.typeP === "updateEmail")]],
              ),
              e("div", ko, [
                U(
                  e(
                    "input",
                    {
                      type: "text",
                      "onUpdate:modelValue":
                        h[0] || (h[0] = (I) => (s.value = I)),
                      placeholder: c.$t("phEnterVerificationCode"),
                      maxlength: "6",
                      onInput: v,
                    },
                    null,
                    40,
                    So,
                  ),
                  [[pe, s.value]],
                ),
                e(
                  "button",
                  {
                    onClick: d,
                    class: O({ inActive: a(t).countEmailDown > 0 }),
                  },
                  [
                    a(t).countEmailDown === 0
                      ? (w(), C("span", Co, r(c.$t("send")), 1))
                      : (w(), C("span", $o, r(a(t).countEmailDown) + "S ", 1)),
                  ],
                  2,
                ),
              ]),
              U(
                e(
                  "div",
                  Io,
                  [
                    k(u, { name: "warning-o" }),
                    e("span", null, r(c.$t("codeUnreceived")) + "?", 1),
                    e(
                      "span",
                      { onClick: h[1] || (h[1] = (I) => f()) },
                      r(c.$t("contactServicer")),
                      1,
                    ),
                  ],
                  512,
                ),
                [[Y, !o.value]],
              ),
            ],
            512,
          )),
          [[Y, c.showVerify]],
        );
      };
    },
  });
const Po = A(To, [
    ["__scopeId", "data-v-484b25b1"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/VerifyEmailInput.vue",
    ],
  ]),
  Le = (p) => (ve("data-v-95ce4137"), (p = p()), me(), p),
  Fo = { class: "RpwdPopup" },
  Lo = { class: "RpwdPopup-head" },
  xo = { class: "RpwdPopup-topTip" },
  Eo = Le(() => e("br", null, null, -1)),
  Ro = { class: "RpwdPopup-tip" },
  Vo = Le(() => e("div", { class: "tipbg" }, null, -1)),
  Bo = { class: "RpwdPopup-errorTip" },
  No = { key: 0 },
  Uo = { class: "errorTip" },
  qo = Le(() => e("br", null, null, -1)),
  Do = { class: "RpwdPopup-foot" },
  Mo = M({
    __name: "EmailRpwdPopup",
    props: {
      show: { type: Boolean, default: !1 },
      gamePresentation: { type: String, default: "" },
      email: { type: String, default: "" },
      passwordErrorMaxNum: { default: 10 },
    },
    emits: ["update:show"],
    setup(p, { emit: y }) {
      const i = p,
        { t } = se(),
        l = Z(),
        s = m(!1),
        o = oe(),
        d = m(!1),
        n = m({ smsvcode: "", password: "", rePassword: "" }),
        v = R({
          get() {
            return i.show || !1;
          },
          set($) {
            $ || y("update:show", !1);
          },
        }),
        f = async () => {
          if (!i.email) return;
          (await z(bt({ email: i.email, emailType: He.resetPassword })))
            ? be(t("sendSuccess"))
            : setTimeout(() => {
                o.setCountEmailDown(0);
              }, 500);
        },
        c = async () => {
          if (!n.value.smsvcode.trim())
            return D({ message: t("registerTip6"), wordBreak: "break-word" });
          if (n.value.smsvcode.trim().length != 6)
            return D({
              message: t("verifyCode6Digits"),
              wordBreak: "break-word",
            });
          if (!n.value.password.trim())
            return D({ message: t("registerTip2"), wordBreak: "break-word" });
          if (!Pe.passReg3.test(n.value.password)) {
            s.value = !0;
            return;
          }
          if (!n.value.rePassword.trim())
            return D({ message: t("registerTip3"), wordBreak: "break-word" });
          if (n.value.password !== n.value.rePassword) {
            d.value = !0;
            return;
          } else d.value = !1;
          const { password: $, smsvcode: u } = n.value;
          let I = {
            username: i.email,
            type: "email",
            password: $,
            smsvcode: u,
          };
          (await z(Oe(I))) &&
            (be(t("rpdsucceed")), localStorage.clear(), y("update:show", !1));
        },
        h = () => {
          l.push({ name: "CustomerService" });
        };
      return ($, u) => {
        const I = V("svg-icon"),
          E = V("van-popup");
        return (
          w(),
          C(
            ke,
            null,
            [
              q(" 规则弹层 begin"),
              k(
                E,
                {
                  show: v.value,
                  "onUpdate:show": u[4] || (u[4] = (g) => (v.value = g)),
                  "close-on-click-overlay": !1,
                  position: "bottom",
                  round: "",
                },
                {
                  default: G(() => [
                    e("div", Fo, [
                      e("div", Lo, r(a(t)("idlockTitle")), 1),
                      e("div", xo, [
                        B(r(a(t)("idlockTip1", [p.passwordErrorMaxNum])), 1),
                        Eo,
                        B(r(a(t)("idlockTip3")), 1),
                      ]),
                      k(
                        Po,
                        {
                          value: n.value.smsvcode,
                          "onUpdate:value":
                            u[0] || (u[0] = (g) => (n.value.smsvcode = g)),
                          sendFunc: f,
                          email: p.email,
                          "type-p": "lock",
                        },
                        null,
                        8,
                        ["value", "email"],
                      ),
                      k(
                        ie,
                        {
                          value: n.value.password,
                          "onUpdate:value":
                            u[1] || (u[1] = (g) => (n.value.password = g)),
                          label: a(t)("newPSWRest"),
                        },
                        null,
                        8,
                        ["value", "label"],
                      ),
                      U(
                        e(
                          "div",
                          Ro,
                          [Vo, e("span", null, r(a(t)("pswRule")), 1)],
                          512,
                        ),
                        [[Y, s.value]],
                      ),
                      k(
                        ie,
                        {
                          value: n.value.rePassword,
                          "onUpdate:value":
                            u[2] || (u[2] = (g) => (n.value.rePassword = g)),
                          label: a(t)("newPSWconfirm"),
                        },
                        null,
                        8,
                        ["value", "label"],
                      ),
                      e("div", Bo, [
                        d.value
                          ? (w(), C("span", No, r(a(t)("unmatchedInput")), 1))
                          : q("v-if", !0),
                      ]),
                      e("div", { class: "gotuserver", onClick: h }, [
                        k(I, { name: "customer1" }),
                        B(r(a(t)("contactServicer")), 1),
                      ]),
                      e("div", Uo, [
                        B(r(a(t)("wrongemail")), 1),
                        qo,
                        B(r(a(t)("rpwdEmailPopupTip")), 1),
                      ]),
                      e("div", Do, [
                        e(
                          "button",
                          { class: "dialogBtn", onClick: c },
                          r(a(t)("confirm")),
                          1,
                        ),
                        e(
                          "button",
                          {
                            class: "dialogBtn",
                            onClick:
                              u[3] || (u[3] = (g) => y("update:show", !1)),
                          },
                          r(a(t)("cancel")),
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
            2112,
          )
        );
      };
    },
  });
const Ao = A(Mo, [
    ["__scopeId", "data-v-95ce4137"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/EmailRpwdPopup.vue",
    ],
  ]),
  Ho = { class: "emailcontainer" },
  Oo = { class: "emailinput__container" },
  Go = { class: "emailinput__container-label" },
  jo = { class: "emailinput__container-input" },
  Wo = ["placeholder"],
  zo = M({
    __name: "EmailInput",
    props: {
      type: { type: String, required: !0 },
      email: { type: String, required: !0 },
    },
    emits: ["update:show-validate", "changeN"],
    setup(p, { expose: y, emit: i }) {
      const t = p,
        l = oe(),
        s = R({
          get() {
            return t.email;
          },
          set(v) {
            i("changeN", v);
          },
        });
      function o(v) {
        const f = v.target,
          c = /[\u4e00-\u9fa5]/g;
        (f.value = f.value.replace(c, "")),
          f.value.length > 0 && i("update:show-validate", !1);
      }
      const d = m();
      function n() {
        X(() => {
          d.value.focus();
        });
      }
      return (
        y({ getFocus: n }),
        (v, f) => {
          const c = V("svg-icon");
          return (
            w(),
            C("div", Ho, [
              e("div", Oo, [
                e("div", Go, [
                  k(c, {
                    name: "email",
                    class: "emailinput__container-label__icon",
                  }),
                  e(
                    "span",
                    null,
                    r(
                      a(l).isOpenExternalAccount
                        ? `${v.$t("otherlogin")} ${v.$t("login")}`
                        : v.$t("email"),
                    ),
                    1,
                  ),
                ]),
                e("div", jo, [
                  U(
                    e(
                      "input",
                      {
                        type: "text",
                        name: "userEmail",
                        maxlength: "250",
                        "onUpdate:modelValue":
                          f[0] || (f[0] = (h) => (s.value = h)),
                        placeholder: v.$t("inputemail"),
                        onInput: o,
                        ref_key: "email",
                        ref: d,
                      },
                      null,
                      40,
                      Wo,
                    ),
                    [[pe, s.value]],
                  ),
                ]),
              ]),
            ])
          );
        }
      );
    },
  });
const Ko = A(zo, [
    ["__scopeId", "data-v-4499df08"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/EmailInput.vue",
    ],
  ]),
  Xo = (p) => (ve("data-v-436a69c4"), (p = p()), me(), p),
  Yo = { class: "signIn__container" },
  Zo = { class: "signIn__container-button" },
  Jo = { class: "signIn_footer" },
  Qo = { class: "font24" },
  en = { class: "font24" },
  tn = { class: "idlockTip" },
  sn = Xo(() => e("br", null, null, -1)),
  on = ["src"],
  nn = M({
    __name: "EmailSignIn",
    setup(p) {
      const y = Z(),
        { t: i } = se(),
        t = m(10),
        { setLoading: l } = Ge(),
        s = oe(),
        o = m(!1),
        { getSelfCustomerServiceLink: d, isCenterServer: n } = Ke({
          ServerType: 2,
        }),
        v = m(!1),
        f = m(),
        c = m("login"),
        h = m(!1);
      async function $() {
        if (
          (We() && (await new Promise((b) => setTimeout(b, 500))),
          !(!s.userForm.email || s.userForm.email.toString().trim() === ""))
        ) {
          if (!s.isOpenExternalAccount && !Pe.email1.test(s.userForm.email))
            return D({ message: i(St.email), wordBreak: "break-word" });
          if (
            !s.userForm.password ||
            s.userForm.password.toString().trim() === ""
          )
            return D({ message: i("registerTip2"), wordBreak: "break-word" });
          s.userForm.remember && s.userForm.password.toString().trim() !== ""
            ? localStorage.setItem("remember", s.userForm.password)
            : localStorage.setItem("remember", ""),
            s.isOpenCaptcha && !h.value
              ? re()
              : (l(!0),
                await s
                  .signIn(s.userForm)
                  .then((b) => {})
                  .catch((b) => {
                    var F;
                    (h.value = !1),
                      b.code === 1 &&
                        (t.value =
                          ((F = b.data) == null
                            ? void 0
                            : F.passwordErrorMaxNum) || 10),
                      b.msgCode === 33 ? (v.value = !0) : ae(b.msgCode || 0);
                  })
                  .finally(() => {
                    L.value.setShowHiden(!1), l(!1);
                  }));
        }
      }
      const u = () => {
        y.push({ name: "register" });
      };
      function I() {
        y.push({ name: "rpwd" }), s.setCurrentView("ResetPassword");
      }
      function E() {
        d();
      }
      const g = (b) => {
          s.getUserForm.email = b;
        },
        L = m(),
        S = m(""),
        P = () => {
          (o.value = !1), y.push({ name: "CustomerService" });
        };
      De(window, "keydown", (b) => {
        b.key == "Enter" && $();
      });
      const T = (b) => {
          (s.userForm.vCode = b), $();
        },
        H = () => {
          (v.value = !1), (s.userForm.vCode = "");
        };
      _e(async () => {
        var F;
        const b = s.getUserForm;
        localStorage.getItem("remember") != null &&
        ((F = localStorage.getItem("remember")) == null
          ? void 0
          : F.toString().trim()) != ""
          ? (b.password = localStorage.getItem("remember"))
          : (b.password = ""),
          s.setUserForm({ ...b });
      });
      let K = Ie(
        () => s.userForm.number,
        (b) => {
          s.setCountDown(0);
        },
        { flush: "post" },
      );
      const ue = async (b) => {
          X(async () => {
            L.value.startRequestVerify(),
              l(!0),
              s
                .signIn(
                  Object.assign(s.userForm, { captchaId: S.value, track: b }),
                )
                .then((F) => {
                  s.userForm.vCode = "";
                })
                .catch((F) => {
                  var W;
                  F.code === 1 &&
                    (t.value =
                      ((W = F.data) == null ? void 0 : W.passwordErrorMaxNum) ||
                      10),
                    F.msgCode === 33
                      ? (X(() => (v.value = !0)), (h.value = !0))
                      : ae(F.msgCode || 0);
                })
                .finally(() => {
                  L.value.setShowHiden(!1), l(!1);
                });
          });
        },
        re = () => {
          X(async () => {
            L.value.startRequestGenerate();
            const b = await z(ze());
            b
              ? ((S.value = b.data.captchaId),
                L.value.endRequestGenerate(
                  b.data.backgroundImage,
                  b.data.sliderImage,
                ))
              : L.value.endRequestGenerate(null, null);
          });
        },
        ae = (b) => {
          b == 122 && (o.value = !0);
        };
      return (
        Me(() => {
          K(), s.getUserForm.remember || (s.getUserForm.password = "");
        }),
        (b, F) => {
          const W = V("van-checkbox"),
            J = V("svg-icon");
          return (
            w(),
            C("div", Yo, [
              k(
                Ko,
                {
                  ref_key: "email",
                  ref: f,
                  type: c.value,
                  email: a(s).userForm.email,
                  onChangeN: g,
                },
                null,
                8,
                ["type", "email"],
              ),
              k(
                ie,
                {
                  value: a(s).userForm.password,
                  "onUpdate:value":
                    F[0] || (F[0] = (_) => (a(s).userForm.password = _)),
                  label: b.$t("password"),
                  maxlength: 32,
                },
                null,
                8,
                ["value", "label"],
              ),
              e("div", null, [
                k(
                  W,
                  {
                    modelValue: a(s).userForm.rememberpwd,
                    "onUpdate:modelValue":
                      F[1] || (F[1] = (_) => (a(s).userForm.rememberpwd = _)),
                  },
                  { default: G(() => [B(r(b.$t("rememberPSW")), 1)]), _: 1 },
                  8,
                  ["modelValue"],
                ),
              ]),
              e("div", Zo, [
                e(
                  "button",
                  {
                    class: O([a(s).userForm.email != "" ? "active" : ""]),
                    onClick: $,
                  },
                  r(b.$t("login")),
                  3,
                ),
                e(
                  "button",
                  { class: "register", onClick: u },
                  r(b.$t("register")),
                  1,
                ),
              ]),
              e("div", Jo, [
                a(s).isOpenForgetPasswordSMSState ||
                a(s).isOpenForgetPasswordEmailState
                  ? (w(),
                    C("div", { key: 0, class: "forgetcon", onClick: I }, [
                      k(J, { name: "clock_b", class: "forgetbg" }),
                      e("div", Qo, r(b.$t("forgetPSW")), 1),
                    ]))
                  : q("v-if", !0),
                e("div", { class: "customcon", onClick: E }, [
                  a(n)
                    ? (w(),
                      ee(J, {
                        key: 0,
                        name: "serverTicket1",
                        class: "forgetbg",
                      }))
                    : (w(),
                      ee(J, { key: 1, name: "customer_b", class: "forgetbg" })),
                  e(
                    "div",
                    en,
                    r(
                      a(n)
                        ? a(i)("serverTicket")
                        : b.$t("customerServiceTitle"),
                    ),
                    1,
                  ),
                ]),
              ]),
              k(
                Ze,
                {
                  ref_key: "captchaRef",
                  ref: L,
                  "refresh-color": "#FFFFFF",
                  "show-refresh": !0,
                  text: a(i)("slideCaptchaText"),
                  onFinish: ue,
                  onRefresh: re,
                },
                null,
                8,
                ["text"],
              ),
              q("10锁定密码弹窗"),
              a(s).isOpenForgetPasswordEmailState && o.value
                ? (w(),
                  ee(
                    Ao,
                    {
                      key: 0,
                      show: o.value,
                      "onUpdate:show": F[2] || (F[2] = (_) => (o.value = _)),
                      email: a(s).getUserForm.email,
                      passwordErrorMaxNum: t.value,
                    },
                    null,
                    8,
                    ["show", "email", "passwordErrorMaxNum"],
                  ))
                : (w(),
                  ee(
                    je,
                    {
                      key: 1,
                      show: o.value,
                      "onUpdate:show": F[4] || (F[4] = (_) => (o.value = _)),
                      "show-cancel-btn": !0,
                      title: b.$t("idlockTitle"),
                    },
                    {
                      content: G(() => [
                        e("div", tn, [
                          B(r(b.$t("idlockTip1", [t.value])) + " ", 1),
                          sn,
                          B(r(b.$t("idlockTip2")), 1),
                        ]),
                      ]),
                      footer: G(() => [
                        e(
                          "button",
                          {
                            class: "dialogBtn",
                            onClick: F[3] || (F[3] = (_) => (o.value = !1)),
                          },
                          r(b.$t("cancel")),
                          1,
                        ),
                        e("button", { class: "dialogBtn", onClick: P }, [
                          e(
                            "img",
                            { src: a(ge)("main", "iconservr") },
                            null,
                            8,
                            on,
                          ),
                          B(" " + r(b.$t("contactServicer")), 1),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ["show", "title"],
                  )),
              q(" 验证弹窗 "),
              k(
                Ye,
                { showPopup: v.value, onOnConfirm: T, onOnBack: H },
                null,
                8,
                ["showPopup"],
              ),
            ])
          );
        }
      );
    },
  });
const an = A(nn, [
    ["__scopeId", "data-v-436a69c4"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/components/Login/EmailSignIn.vue",
    ],
  ]),
  rn = { class: "login__container-heading" },
  ln = { class: "login__container-heading__title" },
  un = { class: "login__container-heading__subTitle" },
  cn = { class: "login_container-tab" },
  dn = { class: "login__container-form" },
  pn = M({
    __name: "index",
    setup(p) {
      const { t: y } = fe.global,
        i = Z(),
        t = oe();
      t.getRegisterState();
      const l = m("mobile"),
        s = m(void 0);
      t.userForm.logintype = l.value;
      const { openAll: o } = kt();
      function d() {
        i.replace("/");
      }
      const n = (v) => {
        (l.value = v),
          (t.userForm.logintype = v),
          (t.userForm.password = ""),
          t.remember(!0);
      };
      return (
        rt((v, f, c) => {
          c(), v.name === "home" && o();
        }),
        _e(() => {
          t.remember(!0), t.getIp();
        }),
        (v, f) => {
          const c = V("NavBar"),
            h = V("svg-icon");
          return (
            w(),
            C(
              "div",
              {
                class: "login__container",
                ref_key: "loginContainerRef",
                ref: s,
              },
              [
                k(
                  c,
                  {
                    onClickLeft: d,
                    class: "main",
                    leftArrow: !0,
                    headLogo: !0,
                  },
                  { right: G(() => [k(Dt)]), _: 1 },
                ),
                e("div", rn, [
                  e("h1", ln, r(a(y)("login")), 1),
                  e("div", un, [
                    e("div", null, r(v.$t("pleaseloginphoneoremail")), 1),
                    e("div", null, r(v.$t("forgetyourpassword")), 1),
                  ]),
                ]),
                e("div", cn, [
                  e(
                    "div",
                    {
                      class: O(["tab", [l.value == "mobile" ? "active" : ""]]),
                      onClick: f[0] || (f[0] = ($) => n("mobile")),
                    },
                    [
                      k(h, { name: "phone" }),
                      e("div", null, r(v.$t("phoneN")), 1),
                    ],
                    2,
                  ),
                  e(
                    "div",
                    {
                      class: O(["tab", [l.value == "email" ? "active" : ""]]),
                      onClick: f[1] || (f[1] = ($) => n("email")),
                    },
                    [
                      e("div", null, [
                        k(h, { name: "email" }),
                        U(k(h, { name: "user" }, null, 512), [
                          [Y, a(t).isOpenExternalAccount],
                        ]),
                      ]),
                      e(
                        "div",
                        null,
                        r(
                          a(t).isOpenExternalAccount
                            ? v.$t("otherlogin")
                            : v.$t("emaillogin"),
                        ),
                        1,
                      ),
                    ],
                    2,
                  ),
                ]),
                e("div", dn, [
                  e(
                    "div",
                    {
                      class: O([
                        "tab-content",
                        [l.value == "mobile" ? "activecontent" : ""],
                      ]),
                    },
                    [k(fo, { ref: "signIn" }, null, 512)],
                    2,
                  ),
                  e(
                    "div",
                    {
                      class: O([
                        "tab-content",
                        [l.value == "email" ? "activecontent" : ""],
                      ]),
                    },
                    [k(an, { ref: "signIn" }, null, 512)],
                    2,
                  ),
                ]),
              ],
              512,
            )
          );
        }
      );
    },
  });
const vn = A(pn, [
    ["__scopeId", "data-v-47f4cc84"],
    [
      "__file",
      "/var/lib/jenkins/workspace/web-印度-okowin-ar013-webnew/src/views/login/index.vue",
    ],
  ]),
  fn = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: vn },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
export {
  Ko as E,
  Nt as L,
  ie as P,
  Ze as S,
  Vs as V,
  Ye as a,
  Po as b,
  ao as c,
  Dt as d,
  fn as i,
  Ke as u,
};
