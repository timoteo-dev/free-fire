import { r as s, G as e, H as Et, J as Za, L as _Component, K as Ge, S as _Component2, M as As, N as Ce, O as Ke, Q as Cs, X as Ye, T as _Component3, U as _Component4, V as Je, W as $t, Y as Da, Z as Fs, $ as Ea, a0 as Mt, a1 as _Component18, a2 as _Component6, a3 as Oa, a4 as _Component25, a5 as Ga, a6 as _Component19, a7 as _Component16, a8 as Es, a9 as Ft, aa as _Component5, ab as _Component7, ac as _Component8, ad as _Component9, ae as _Component0, af as _Component1, ag as At, ah as _Component10, ai as _Component17, aj as Ds, ak as Gt, al as _Component15, am as Pa, an as Ma, ao as Tt, ap as rr, aq as or, ar as _Component22, as as Rs, at as _Component23, h as ir, au as _Component24, av as Ra, aw as Wa, ax as rs, ay as _Component27, az as Kt, aA as _Component32, aB as _Component33, aC as _Component34, aD as Ha, aE as _Component37, aF as _Component38, aG as _Component41, aH as _Component42, aI as _Component43, aJ as ur, aK as Va, aL as Qa, aM as _Component47, aN as _Component50, aO as _Component48, aP as _Component52, aQ as _Component53, aR as _Component51, aS as _Component54, aT as _Component55, aU as _Component56, aV as Ts, aW as _Component57, aX as Nr, aY as _Component66, aZ as $e, a_ as Sr } from "./vendor-core-C2u8DzsH.js";
import { c as kr } from "./vendor-supabase-DNcsfm5d.js";
import { R as Te, L as _Component13, C as _Component11, X as _Component12, Y as Ie, T as _e, a as Ya, b as Ot, B as _Component20, c as Qe, d as _Component21, A as Os, e as Ps } from "./vendor-charts-C10ilfWe.js";
import { E as Ar, h as Cr } from "./vendor-pdf-D1q7SlmK.js";
(function () {
  const c = document.createElement("link").relList;
  if (c && c.supports && c.supports("modulepreload")) {
    return;
  }
  for (const o of document.querySelectorAll("link[rel=\"modulepreload\"]")) {
    j(o);
  }
  new MutationObserver(o => {
    for (const g of o) {
      if (g.type === "childList") {
        for (const y of g.addedNodes) {
          if (y.tagName === "LINK" && y.rel === "modulepreload") {
            j(y);
          }
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function l(o) {
    const g = {};
    if (o.integrity) {
      g.integrity = o.integrity;
    }
    if (o.referrerPolicy) {
      g.referrerPolicy = o.referrerPolicy;
    }
    if (o.crossOrigin === "use-credentials") {
      g.credentials = "include";
    } else if (o.crossOrigin === "anonymous") {
      g.credentials = "omit";
    } else {
      g.credentials = "same-origin";
    }
    return g;
  }
  function j(o) {
    if (o.ep) {
      return;
    }
    o.ep = true;
    const g = l(o);
    fetch(o.href, g);
  }
})();
const Fr = "https://idegcrfymkgkjphluuda.supabase.co";
const Er = "sb_publishable_UC9QH993uXUNR7oXUjGVEQ_JCoCfpYr";
const K = kr(Fr, Er);
const ta = "isSubscriber";
const Ms = s.createContext(undefined);
const Ua = () => {
  try {
    const r = sessionStorage.getItem(ta);
    if (r !== null) {
      return JSON.parse(r);
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
const Dr = ({
  children: r
}) => {
  const [c, l] = s.useState(null);
  const [j, o] = s.useState(null);
  const [g, y] = s.useState(true);
  const S = Ua();
  const [u, w] = s.useState(S ?? false);
  const [P, k] = s.useState(S === null);
  const D = async m => {
    if (Ua() === null) {
      k(true);
    }
    try {
      const {
        data: h,
        error: R
      } = await K.from("subscriptions").select("*").eq("user_id", m).eq("status", "ativo").gt("data_fim", new Date().toISOString()).order("created_at", {
        ascending: false
      }).limit(1).maybeSingle();
      if (R) {
        throw R;
      }
      const v = !!h;
      w(v);
      sessionStorage.setItem(ta, JSON.stringify(v));
    } catch (h) {
      console.error("Erro ao validar assinatura:", h);
      if (Ua() === null) {
        w(false);
        sessionStorage.setItem(ta, JSON.stringify(false));
      }
    } finally {
      k(false);
    }
  };
  const f = async () => {
    if (j) {
      sessionStorage.removeItem(ta);
      k(true);
      await D(j.id);
    }
  };
  s.useEffect(() => {
    K.auth.getSession().then(({
      data: {
        session: x
      }
    }) => {
      l(x);
      const h = x?.user ?? null;
      o(h);
      y(false);
      if (h) {
        D(h.id);
      } else {
        sessionStorage.removeItem(ta);
        w(false);
        k(false);
      }
    });
    const {
      data: {
        subscription: m
      }
    } = K.auth.onAuthStateChange((x, h) => {
      l(h);
      const R = h?.user ?? null;
      o(R);
      y(false);
      if (x === "SIGNED_OUT") {
        sessionStorage.removeItem(ta);
        w(false);
        k(false);
      } else if (x === "SIGNED_IN" && R) {
        D(R.id);
      } else if (x === "TOKEN_REFRESHED") {
        k(false);
      } else if (x === "PASSWORD_RECOVERY" && window.location.pathname !== "/reset-password") {
        window.location.href = "/reset-password";
      }
    });
    return () => m.unsubscribe();
  }, []);
  const i = {
    session: c,
    user: j,
    loading: g,
    isSubscriber: u,
    subscriberLoading: P,
    signOut: async () => {
      await K.auth.signOut();
    },
    refreshSubscription: f
  };
  return <Ms.Provider value={i}>{r}</Ms.Provider>;
};
const We = () => {
  const r = s.useContext(Ms);
  if (r === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return r;
};
function ns(r) {
  const [c, l] = s.useState(null);
  const [j, o] = s.useState(null);
  const [g, y] = s.useState(true);
  s.useEffect(() => {
    if (!r) {
      y(false);
      return;
    }
    async function S() {
      try {
        const [u, w] = await Promise.all([K.from("subscriptions").select("plano, status, data_fim").eq("user_id", r).order("data_fim", {
          ascending: false
        }).limit(1).maybeSingle(), K.from("perfis").select("trial_expires_at").eq("id", r).maybeSingle()]);
        if (u.data) {
          const P = u.data.status === "ativo" && new Date(u.data.data_fim) > new Date();
          l({
            ...u.data,
            ativo: P
          });
        } else {
          l(null);
        }
        if (w.data) {
          o(w.data.trial_expires_at);
        }
      } catch (u) {
        console.error("Erro no useSubscription:", u);
      } finally {
        y(false);
      }
    }
    S();
  }, [r]);
  return {
    subscription: c,
    trialExpiresAt: j,
    loading: g
  };
}
const Rr = "true";
const xa = String(Rr).toLowerCase().trim().replace(/['"]/g, "") !== "false";
const _Component59 = ({
  mode: r = "login"
}) => {
  const [c, l] = s.useState(r);
  const [j, o] = s.useState("");
  const [g, y] = s.useState("");
  const [S, u] = s.useState("");
  const [w, P] = s.useState(null);
  const [k, D] = s.useState(false);
  const [f, N] = s.useState(null);
  const i = s.useRef(null);
  const m = Et();
  const {
    session: x
  } = We();
  const [h, R] = s.useState(false);
  const [v, p] = s.useState("");
  const [T, Y] = s.useState(false);
  const [X, _] = s.useState(null);
  const [q, V] = s.useState(false);
  const [H, je] = s.useState(null);
  const Ne = s.useRef(null);
  const De = async ue => {
    ue.preventDefault();
    if (v.trim()) {
      V(true);
      _(null);
      try {
        const {
          error: ae
        } = await K.auth.resetPasswordForEmail(v, {
          redirectTo: "https://analista-eight.vercel.app/reset-password",
          captchaToken: H ?? undefined
        });
        if (ae) {
          throw ae;
        }
        Y(true);
      } catch (ae) {
        _(ae.message || "Erro ao enviar e-mail de recuperação.");
        je(null);
        setTimeout(() => {
          Ne.current?.reset();
        }, 500);
      } finally {
        V(false);
      }
    }
  };
  Za.useEffect(() => {
    l(r);
    if (x) {
      m("/", {
        replace: true
      });
    }
  }, [r, x, m]);
  const be = async ue => {
    ue.preventDefault();
    if (!xa || !!f) {
      D(true);
      P(null);
      try {
        if (c === "register") {
          if (!S.trim()) {
            throw new Error("O nome do time é obrigatório.");
          }
          const {
            data: ae,
            error: M
          } = await K.functions.invoke("check-ip", {
            body: {
              action: "check"
            }
          });
          if (M) {
            console.warn("Erro ao verificar IP (Anti-Fraude):", M);
          } else if (ae?.bloqueado) {
            throw new Error("Já existe uma conta cadastrada neste dispositivo.");
          }
          const {
            data: A,
            error: C
          } = await K.auth.signUp({
            email: j,
            password: g,
            options: {
              data: {
                team_name: S
              },
              captchaToken: f ?? undefined
            }
          });
          if (C) {
            throw C;
          }
          if (A?.user) {
            const z = localStorage.getItem("celo_referral");
            await K.from("perfis").insert([{
              id: A.user.id,
              email: j,
              nome: S,
              referral_code: z || null
            }]);
            if (z) {
              localStorage.removeItem("celo_referral");
            }
            await K.functions.invoke("check-ip", {
              body: {
                action: "register",
                user_id: A.user.id
              }
            });
          }
          m("/");
        } else {
          const {
            error: ae
          } = await K.auth.signInWithPassword({
            email: j,
            password: g,
            options: {
              captchaToken: f ?? undefined
            }
          });
          if (ae) {
            throw ae;
          }
          m("/");
        }
      } catch (ae) {
        P(ae.message || "Ocorreu um erro na autenticação.");
        N(null);
        i.current?.reset();
      } finally {
        D(false);
      }
    }
  };
  return <div className="ctracker-auth min-h-screen bg-[var(--bg-main)] flex flex-col md:flex-row overflow-hidden font-['Inter',sans-serif]"><div className="ctracker-auth-art hidden md:flex md:w-[60%] relative items-center justify-center p-20 overflow-hidden border-r border-[var(--border-subtle)]"><div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)",
        backgroundSize: "30px 30px"
      }} /><div className="relative z-10 flex flex-col items-center text-center animate-reveal"><img src="/redesign/logo.svg" alt="CTracker" className="w-[82px] h-[92px] object-contain mb-5 transition-all duration-700 hover:scale-105" /><div className="space-y-4"><p className="text-2xl font-black tracking-tight text-white"><span className="text-[var(--accent)]">C</span>TRACKER</p><h2 className="text-5xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight">Leia o jogo.<br /><span className="text-[var(--accent)]">Decida com dados.</span></h2><p className="text-[var(--text-secondary)] max-w-sm text-lg leading-relaxed font-medium">A plataforma de análise para times competitivos de Free Fire.</p></div></div></div><div className="ctracker-auth-form flex-1 flex flex-col items-center justify-center p-8 md:p-16 bg-[var(--bg-surface)] relative z-20"><div className="w-full max-w-[360px] animate-reveal"><header className="mb-10 text-center md:text-left"><div className="flex items-center justify-center gap-3 mb-10"><img src="/redesign/logo.svg" alt="" style={{
              height: "48px",
              width: "auto"
            }} /><span className="text-xl font-black tracking-tight text-white"><span className="text-[var(--accent)]">C</span>TRACKER</span></div><h3 className="text-3xl font-bold text-[#EDEDED] tracking-tight mb-2">{c === "login" ? "Entrar" : "Criar conta"}</h3><p className="text-[#A1A1A1] text-body font-normal">{c === "login" ? "Bem-vindo ao Celo Tracker" : "Crie sua conta gratuitamente"}</p></header><div className="flex gap-4 mb-8 text-label relative">{[{
            id: "login",
            label: "Entrar",
            path: "/login"
          }, {
            id: "register",
            label: "Cadastro",
            path: "/register"
          }].map(ue => <_Component to={ue.path} onClick={() => {
            l(ue.id);
            P(null);
          }} className={`transition-all pb-2 z-10 ${c === ue.id ? "text-[var(--accent)] border-b-2 border-[var(--accent)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"}`} style={{
            textDecoration: "none"
          }} key={ue.id}>{ue.label}</_Component>)}</div><div className="w-full h-px bg-[var(--border-subtle)] -mt-10 mb-10" />{w && <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-md flex gap-3 items-start animate-reveal"><Ge size={18} className="text-red-500 shrink-0 mt-0.5" /><span className="text-red-500 text-body font-medium leading-relaxed">{w}</span></div>}<form onSubmit={be} className="space-y-6">{c === "register" && <div className="space-y-2 group"><label className="text-body-sm font-normal text-[#A1A1A1] group-focus-within:text-[var(--accent)] transition-colors">Nome do time</label><input type="text" value={S} onChange={ue => u(ue.target.value)} placeholder="Ex: LOUD, Team Liquid..." className="input-base px-4 border-[var(--border-default)] bg-[var(--bg-surface)]" required={c === "register"} /></div>}<div className="space-y-2 group"><label className="text-body-sm font-normal text-[#A1A1A1] group-focus-within:text-[var(--accent)] transition-colors">Email</label><input type="email" value={j} onChange={ue => o(ue.target.value)} placeholder="seu@email.com" className="input-base px-4 border-[var(--border-default)] bg-[var(--bg-surface)]" required={true} /></div><div className="space-y-2 group"><label className="text-body-sm font-normal text-[#A1A1A1] group-focus-within:text-[var(--accent)] transition-colors">Senha</label><input type="password" value={g} onChange={ue => y(ue.target.value)} placeholder="••••••••" className="input-base px-4 border-[var(--border-default)] bg-[var(--bg-surface)]" required={true} /></div>{c === "login" && <button type="button" onClick={() => R(true)} className="text-sm text-[var(--accent)] hover:underline mt-1 text-right w-full block">Esqueci minha senha</button>}{xa && <div className="flex justify-center"><_Component2 ref={i} siteKey="0x4AAAAAAC_dlFCLsDJzfs_o" onSuccess={ue => N(ue)} onExpire={() => {
              N(null);
              i.current?.reset();
            }} onError={() => {
              N(null);
              i.current?.reset();
            }} options={{
              theme: "dark"
            }} key={c} /></div>}<button type="submit" disabled={k || xa && !f} className="btn-primary w-full py-3.5 flex items-center justify-center font-semibold text-body rounded-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed">{k ? <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <span>{c === "login" ? "Entrar" : "Criar conta"}</span>}</button></form></div></div>{h && <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-reveal"><div className="w-full max-w-[400px] bg-[#0F0F0F] border border-[var(--border-subtle)] rounded-xl p-8 relative animate-reveal"><h3 className="text-2xl font-bold text-[#EDEDED] mb-2 tracking-tight">Recuperar Senha</h3>{T ? <div className="space-y-6 mt-4"><div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md text-green-500 text-sm leading-relaxed font-medium">✓ E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada e spam.</div><button type="button" onClick={() => {
            R(false);
            p("");
            Y(false);
            _(null);
            je(null);
          }} className="w-full py-3 text-sm font-semibold rounded-lg bg-[var(--accent)] text-white hover:bg-[#E41F29] transition-colors">Voltar para o Login</button></div> : <form onSubmit={De} className="space-y-6 mt-4"><p className="text-[#A1A1A1] text-sm leading-relaxed">Insira seu e-mail cadastrado. Enviaremos um link seguro para você redefinir sua senha.</p><div className="space-y-2 group"><label className="text-body-sm font-normal text-[#A1A1A1] group-focus-within:text-[var(--accent)] transition-colors">E-mail</label><input type="email" required={true} placeholder="seu@email.com" value={v} onChange={ue => p(ue.target.value)} className="input-base px-4 border-[var(--border-default)] bg-[var(--bg-surface)] w-full" /></div>{X && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-xs font-medium">{X}</div>}{xa && <div className="flex justify-center"><_Component2 ref={Ne} siteKey="0x4AAAAAAC_dlFCLsDJzfs_o" onSuccess={ue => je(ue)} onExpire={() => {
              je(null);
              Ne.current?.reset();
            }} onError={() => {
              je(null);
              Ne.current?.reset();
            }} options={{
              theme: "dark"
            }} key="forgot-password" /></div>}<div className="flex gap-3 pt-2"><button type="button" onClick={() => {
              R(false);
              p("");
              Y(false);
              _(null);
              je(null);
            }} className="flex-1 py-3 text-sm font-semibold rounded-lg border border-[var(--border-strong)] text-[#EDEDED] hover:bg-white/5 transition-colors">Cancelar</button><button type="submit" disabled={q || xa && !H} className="flex-1 py-3 text-sm font-semibold rounded-lg bg-[var(--accent)] text-white hover:bg-[#E41F29] transition-colors flex items-center justify-center disabled:opacity-50">{q ? <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : "Enviar Link"}</button></div></form>}</div></div>}</div>;
};
const Tr = As({
  Data: Cs([Ce(), Ke()]).optional(),
  Campeonato: Ce().optional(),
  Rodada: Ke().or(Ce().transform(Number)).optional(),
  Mapa: Ce().optional(),
  Equipe: Ce().optional(),
  Colocacao: Ke().or(Ce().transform(Number)).optional(),
  Kill: Ke().or(Ce().transform(Number)).default(0),
  "Pontos/Posicao": Ke().or(Ce().transform(Number)).default(0),
  Pontos_Total: Ke().or(Ce().transform(Number)).default(0),
  Booyah: Ce().optional(),
  "Quebra de Call": Ce().optional(),
  "Resultado quebra": Ce().optional(),
  id: Ce().or(Ke()).optional()
});
const Or = As({
  Data: Cs([Ce(), Ke()]).optional(),
  Equipe: Ce().optional(),
  Modo: Ce().optional(),
  Mapa: Ce().optional(),
  Posicao: Ke().optional().or(Ce().transform(r => Number(r) || 0)),
  Player: Ce(),
  Kill: Ke().or(Ce().transform(r => Number(r) || 0)),
  Morte: Ke().or(Ce().transform(r => Number(r) || 0)),
  Assistencia: Ke().optional().or(Ce().transform(r => Number(r) || 0)),
  Queda: Ke().optional().or(Ce().transform(r => Number(r) || 0)),
  "Dano causado": Ke().or(Ce().transform(r => Number(r) || 0)),
  Derrubados: Ke().optional().or(Ce().transform(r => Number(r) || 0)),
  Ressurgimento: Ke().optional().or(Ce().transform(r => Number(r) || 0))
});
const Pr = r => r.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
const Mr = (r, c) => {
  let l = 0;
  let j = 0;
  let o = 0;
  let g = {
    player: "N/A",
    kills: 0,
    team: "-"
  };
  let y = {
    player: "N/A",
    damage: 0,
    team: "-"
  };
  let S = {
    player: "N/A",
    assists: 0,
    team: "-"
  };
  r.forEach(N => {
    l += Math.max(0, N.Kill || 0);
    j += Math.max(0, N["Dano causado"] || 0);
    o += Math.max(0, N.Morte || 0);
    if (N.Kill > g.kills) {
      g = {
        player: N.Player,
        kills: N.Kill,
        team: N.Equipe
      };
    }
    if (N["Dano causado"] > y.damage) {
      y = {
        player: N.Player,
        damage: N["Dano causado"],
        team: N.Equipe
      };
    }
    if ((N.Assistencia || 0) > S.assists) {
      S = {
        player: N.Player,
        assists: N.Assistencia || 0,
        team: N.Equipe
      };
    }
  });
  const u = c || new Set(r.map(N => `${N.Data}-${N.Mapa}-${N.Posicao}-${N.Queda}`)).size || 1;
  const w = Number((l / u).toFixed(2));
  const P = {
    avgDamage: Number((j / u).toFixed(0)),
    totalKills: l,
    survivalRate: Number((o / u).toFixed(2))
  };
  const k = r.length > 0 ? [...r].sort((N, i) => String(i.Data).localeCompare(String(N.Data)))[0].Data : null;
  const D = k ? r.filter(N => N.Data === k) : [];
  let f = {
    player: "N/A",
    score: 0
  };
  D.forEach(N => {
    const i = N.Kill * 10 + (N["Dano causado"] || 0);
    if (i > f.score) {
      f = {
        player: N.Player,
        score: i
      };
    }
  });
  return {
    metrics: {
      totalKills: l,
      totalDano: j,
      kdRatio: w,
      mvp: g,
      topDamage: y,
      topAssists: S,
      lastMatchMVP: f
    },
    squad: P
  };
};
const Ja = (r, c) => {
  const l = [];
  r.forEach(i => {
    const m = {};
    Object.keys(i).forEach(h => {
      const R = Pr(h);
      if (R === "data") {
        m.Data = i[h];
      } else if (R === "campeonato") {
        m.Campeonato = i[h];
      } else if (R === "rodada") {
        m.Rodada = i[h];
      } else if (R === "mapa") {
        m.Mapa = i[h]?.toString().trim();
      } else if (R === "equipe") {
        m.Equipe = i[h];
      } else if (R === "colocacao") {
        m.Colocacao = i[h];
      } else if (R === "kill" || R === "kills") {
        m.Kill = Math.max(0, parseInt(i[h]) || 0);
      } else if (R.includes("pontosposicao")) {
        m["Pontos/Posicao"] = Math.max(0, parseInt(i[h]) || 0);
      } else if (R.includes("pontostotal")) {
        m.Pontos_Total = Math.max(0, parseInt(i[h]) || 0);
      } else if (R === "booyah") {
        m.Booyah = i[h]?.toString().trim().toUpperCase() || "NAO";
      } else if (R.includes("quebradecall")) {
        m["Quebra de Call"] = i[h]?.toString().trim().toUpperCase() || "NAO";
      } else if (R.includes("resultadoquebra")) {
        m["Resultado quebra"] = i[h]?.toString().trim() || "-";
      }
    });
    if (i.id) {
      m.id = i.id;
    }
    const x = Tr.safeParse(m);
    if (x.success) {
      l.push(x.data);
    }
  });
  const j = [];
  if (c) {
    c.forEach(i => {
      const m = {};
      Object.keys(i).forEach(h => {
        const R = h.trim();
        m[R] = i[h];
        if (R === "Assistência") {
          m.Assistencia = i[h];
        }
        if (R === "Dano" && !i["Dano causado"]) {
          m["Dano causado"] = i[h];
        }
      });
      const x = Or.safeParse(m);
      if (x.success) {
        j.push(x.data);
      }
    });
  }
  const o = {
    totalQuedas: 0,
    totalKills: 0,
    mediaKills: 0,
    totalPontos: 0,
    mediaPontos: 0,
    totalBooyahs: 0,
    percentBooyah: 0,
    totalQuebras: 0,
    callsGanhas: 0,
    callsPerdidas: 0,
    percentSucessoCall: 0,
    consistencyScore: 0,
    avgPlacement: 0,
    rankings: {
      byKills: [],
      byPoints: [],
      byBooyah: [],
      byConsistency: []
    }
  };
  const g = {};
  let y = 0;
  let S = 0;
  let u = 0;
  l.forEach(i => {
    o.totalQuedas++;
    o.totalKills += i.Kill;
    o.totalPontos += i.Pontos_Total;
    if (i.Booyah === "SIM") {
      o.totalBooyahs++;
    }
    if (i["Quebra de Call"] === "SIM") {
      o.totalQuebras++;
      if (i["Resultado quebra"] === "GANHOU") {
        y++;
      } else if (i["Resultado quebra"] === "PERDEU") {
        S++;
      }
    }
    u += i.Colocacao;
    const m = i.Mapa?.toString().trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "DESCONHECIDO";
    g[m] ||= {
      mapa: m,
      quedas: 0,
      totalKills: 0,
      mediaKills: 0,
      totalPontos: 0,
      totalBooyahs: 0,
      percentBooyah: 0,
      tentativasCall: 0,
      callsGanhas: 0,
      percentSucessoCall: 0,
      consistency: 0,
      avgPlacement: 0
    };
    const x = g[m];
    x.quedas++;
    x.totalKills += i.Kill;
    x.totalPontos += i.Pontos_Total;
    if (i.Booyah === "SIM") {
      x.totalBooyahs++;
    }
    if (i["Quebra de Call"] === "SIM") {
      x.tentativasCall++;
      if (i["Resultado quebra"] === "GANHOU") {
        x.callsGanhas++;
      }
    }
  });
  o.mediaKills = Number((o.totalKills / (o.totalQuedas || 1)).toFixed(2));
  o.mediaPontos = Number((o.totalPontos / (o.totalQuedas || 1)).toFixed(2));
  o.percentBooyah = Number((o.totalBooyahs / (o.totalQuedas || 1) * 100).toFixed(1));
  o.callsGanhas = y;
  o.callsPerdidas = S;
  o.percentSucessoCall = o.totalQuebras > 0 ? Number((y / o.totalQuebras * 100).toFixed(1)) : 0;
  o.avgPlacement = Number((u / (o.totalQuedas || 1)).toFixed(1));
  const w = Object.values(g).map(i => {
    i.mediaKills = Number((i.totalKills / i.quedas).toFixed(2));
    i.percentBooyah = Number((i.totalBooyahs / i.quedas * 100).toFixed(1));
    i.percentSucessoCall = i.tentativasCall > 0 ? Number((i.callsGanhas / i.tentativasCall * 100).toFixed(1)) : 0;
    const x = l.filter(v => (v.Mapa || "").toString().trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === i.mapa).map(v => v.Pontos_Total);
    const h = x.reduce((v, p) => v + p, 0) / x.length;
    const R = x.reduce((v, p) => v + Math.pow(p - h, 2), 0) / x.length;
    i.consistency = Number(Math.sqrt(R).toFixed(2));
    return i;
  });
  o.rankings.byKills = w.sort((i, m) => m.totalKills - i.totalKills).map(i => ({
    label: i.mapa,
    value: i.totalKills
  }));
  o.rankings.byBooyah = w.sort((i, m) => m.totalBooyahs - i.totalBooyahs).map(i => ({
    label: i.mapa,
    value: i.totalBooyahs
  }));
  o.rankings.byConsistency = w.sort((i, m) => i.consistency - m.consistency).map(i => ({
    label: i.mapa,
    value: i.consistency
  }));
  const P = l.map(i => i.Pontos_Total);
  const k = P.reduce((i, m) => i + m, 0) / (P.length || 1);
  const D = P.reduce((i, m) => i + Math.pow(m - k, 2), 0) / (P.length || 1);
  o.consistencyScore = Number(Math.sqrt(D).toFixed(2));
  const {
    metrics: f,
    squad: N
  } = Mr(j, o.totalQuedas);
  return {
    general: o,
    byMap: w,
    playerMetrics: f,
    squadMetrics: N,
    rawData: l.sort((i, m) => {
      const x = new Date(String(i.Data)).getTime();
      const h = new Date(String(m.Data)).getTime();
      if (x !== h) {
        return h - x;
      } else {
        return (Number(m.Rodada) || 0) - (Number(i.Rodada) || 0);
      }
    }),
    playerData: j
  };
};
const _Component26 = () => {
  const [r, c] = s.useState(false);
  const [l, j] = s.useState(1);
  const o = Et();
  s.useEffect(() => {
    if (localStorage.getItem("onboarding_done") !== "true") {
      c(true);
    }
  }, []);
  const g = () => {
    localStorage.setItem("onboarding_done", "true");
    c(false);
  };
  const y = () => {
    localStorage.setItem("onboarding_done", "true");
    c(false);
    o("/planos");
  };
  if (!r) {
    return null;
  }
  const u = [{
    id: 1,
    icon: <Je size={48} className="text-[var(--accent)]" />,
    title: "Bem-vindo ao Celo Tracker!",
    content: "A plataforma de análise definitiva para times competitivos de Free Fire. Acompanhe métricas, evolua seu squad e domine o cenário.",
    buttonText: "Próximo",
    showX: false
  }, {
    id: 2,
    icon: <Da size={48} className="text-[var(--accent)]" />,
    title: "Tudo que você precisa",
    content: <ul className="space-y-3 mt-4 text-left inline-block"><li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><div className="bg-[var(--accent-green-muted)] p-1 rounded-full text-[var(--accent-green)]"><$t size={12} strokeWidth={3} /></div>Dashboard completo com métricas</li><li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><div className="bg-[var(--accent-green-muted)] p-1 rounded-full text-[var(--accent-green)]"><$t size={12} strokeWidth={3} /></div>Histórico detalhado de partidas</li><li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><div className="bg-[var(--accent-green-muted)] p-1 rounded-full text-[var(--accent-green)]"><$t size={12} strokeWidth={3} /></div>Radar de habilidades por jogador</li><li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"><div className="bg-[var(--accent-green-muted)] p-1 rounded-full text-[var(--accent-green)]"><$t size={12} strokeWidth={3} /></div>Inserção manual de dados</li></ul>,
    buttonText: "Próximo",
    showX: false
  }, {
    id: 3,
    icon: <div className="relative"><Fs size={64} className="text-[var(--accent)]" /><div className="absolute -top-2 -right-2 badge badge-purple border border-[var(--accent)] animate-bounce font-bold">PRO</div></div>,
    title: "Leitura automática via IA",
    content: <div className="p-4 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-glow)] mt-4"><p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed italic">"Tire um print do resultado da partida e deixe o Celo Tracker fazer o resto. Nossa IA lê os dados automaticamente em segundos."</p></div>,
    buttonText: "Quero esse recurso",
    secondaryButton: "Continuar no gratuito",
    showX: true
  }][l - 1];
  return <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade"><div className="card w-full max-w-[480px] p-10 relative animate-reveal text-center shadow-2xl border-[var(--border-default)]">{u.showX && <button onClick={g} className="absolute top-6 right-6 p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"><Ye size={20} /></button>}<div className="flex flex-col items-center"><div className="mb-8 p-6 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-inner">{u.icon}</div><h2 className="text-2xl font-extrabold mb-4 tracking-tight">{u.title}</h2><div className="min-h-[100px] mb-8">{typeof u.content == "string" ? <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{u.content}</p> : u.content}</div><div className="w-full space-y-3">{l < 3 ? <button onClick={() => j(w => w + 1)} className="btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 group">{u.buttonText}<_Component3 size={18} className="group-hover:translate-x-1 transition-transform" /></button> : <e.Fragment><button onClick={y} className="btn-primary w-full py-4 text-sm font-bold shadow-lg shadow-[var(--accent-glow)]">{u.buttonText}</button><button onClick={g} className="btn-ghost w-full py-3 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border-transparent">Continuar no plano gratuito</button></e.Fragment>}</div><div className="flex items-center gap-2 mt-8">{[1, 2, 3].map(w => <div className={`w-2 h-2 rounded-full transition-all duration-300 ${l === w ? "bg-[var(--accent)] w-6" : "bg-[var(--border-strong)]"}`} key={w} />)}</div>{l > 1 && <button onClick={() => j(w => w - 1)} className="absolute bottom-10 left-10 p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] flex items-center gap-1 text-xs font-semibold transition-colors"><_Component4 size={16} />Voltar</button>}</div></div></div>;
};
const Aa = ["Múltiplas rotas no planejador de Estratégias — desenhe quantas quiser.", "Mapeamento de Times — adicione a logo do squad direto no mapa.", "Novo marcador POUSO no planejador de rotas."];
const Ir = () => {
  const r = [...Aa, ...Aa, ...Aa, ...Aa];
  return <div className="w-full bg-[#0C0C0E] border-b border-[var(--border-subtle)] overflow-hidden py-1.5 shrink-0 select-none z-30 relative"><div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">{r.map((c, l) => <span className="flex items-center text-[11px] font-medium text-[var(--text-secondary)] whitespace-nowrap px-3" key={l}><span>{c}</span><span className="ml-6 text-[var(--text-tertiary)] opacity-40">•</span></span>)}</div></div>;
};
const Ct = ({
  children: r,
  activeTab: c,
  isSubscriber: l = false
}) => {
  const {
    signOut: j,
    user: o
  } = We();
  const {
    trialExpiresAt: g,
    subscription: y
  } = ns(o?.id);
  const S = g ?? null;
  const u = S ? new Date(S) > new Date() : false;
  const w = Et();
  const [P, k] = s.useState(false);
  const D = y?.plano?.toLowerCase() || "";
  const f = ["mensal", "trimestral"].includes(D);
  const N = y?.status === "ativo";
  const i = y?.data_fim;
  const m = i ? Math.ceil((new Date(i).getTime() - Date.now()) / 86400000) : null;
  const x = N && f && m !== null && m > 0;
  const h = x && m <= 7;
  const [R, v] = s.useState(() => sessionStorage.getItem("ctracker_renewal_modal_seen") === "true");
  const p = x && m <= 3 && !R;
  const T = () => {
    sessionStorage.setItem("ctracker_renewal_modal_seen", "true");
    v(true);
  };
  const X = `https://wa.me/13981630304?text=Olá, quero renovar meu plano ${y?.plano ? y.plano.toUpperCase() : "MENSAL"} do CTracker`;
  const _ = y?.ativo ?? l;
  const q = [{
    id: "overview",
    label: "Dashboard",
    icon: Da,
    path: "/?tab=overview",
    premium: false
  }, {
    id: "rounds",
    label: "Rodadas",
    icon: Ea,
    path: "/?tab=rounds",
    premium: false
  }, {
    id: "players",
    label: "Jogadores",
    icon: Mt,
    path: "/?tab=players",
    premium: false
  }, {
    id: "individual",
    label: "Individual",
    icon: _Component18,
    path: "/?tab=individual",
    premium: false
  }, {
    id: "coletivo",
    label: "Coletivo",
    icon: _Component6,
    path: "/coletivo",
    premium: false
  }, {
    id: "quebras",
    label: "Quebras",
    icon: Oa,
    path: "/quebras",
    premium: true
  }, {
    id: "composicao",
    label: "Composição",
    icon: _Component25,
    path: "/?tab=composicao",
    premium: false
  }, {
    id: "comparison",
    label: "Comparativos",
    icon: Ga,
    path: "/?tab=comparison",
    premium: true
  }, {
    id: "heatmap",
    label: "Mapa de Calor",
    icon: _Component19,
    path: "/?tab=heatmap",
    premium: true
  }, {
    id: "rotas",
    label: "Estratégias",
    icon: _Component19,
    path: "/rotas",
    premium: false
  }, {
    id: "campeonatos",
    label: "Campeonatos",
    icon: _Component16,
    path: "/campeonatos",
    premium: false
  }, {
    id: "history",
    label: "Análise",
    icon: Es,
    path: "/?tab=history",
    premium: true
  }];
  return <div className="ctracker-shell min-h-screen w-full flex bg-[var(--bg-main)]" data-screen={c ?? "input"}>{P && <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden" onClick={() => k(false)} />}<aside className={`ctracker-sidebar fixed inset-y-0 left-0 z-50 w-[280px] md:w-64 flex flex-col transform transition-transform duration-300 ease-out 
                ${P ? "translate-x-0" : "-translate-x-full"} 
                md:relative md:translate-x-0 bg-[var(--bg-surface)] border-r border-[var(--border-default)]`}><div className="flex items-center justify-between cursor-pointer transition-all duration-300 group px-6 py-5"><div onClick={() => {
          w("/");
          k(false);
        }}><img src="/redesign/logo.svg" alt="CTracker" style={{
            height: "42px",
            width: "auto"
          }} className="transition-all duration-500 group-hover:scale-105" /><span className="ml-2 text-lg font-black tracking-tight text-white"><span className="text-[var(--accent)]">C</span>TRACKER</span></div><button onClick={() => k(false)} className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white rounded-lg hover:bg-white/5 active:scale-95 transition-all"><Ye size={24} /></button></div><nav data-tour="sidebar-nav" className="flex-1 px-4 flex flex-col overflow-y-auto custom-scrollbar"><div className="text-label mb-2 mt-2 px-2 text-[var(--text-disabled)] tracking-[0.1em]">ANÁLISE</div><div className="flex flex-col gap-1">{q.filter(V => ["overview", "rounds", "players", "individual", "coletivo"].includes(V.id)).map(V => {
            const H = c === V.id;
            const je = V.premium && !_;
            return <button onClick={() => {
              if (je) {
                w("/planos", {
                  state: {
                    message: "Esta funcionalidade é exclusiva para assinantes. Assine um plano para ter acesso completo."
                  }
                });
                return;
              }
              w(V.path);
              k(false);
            }} className={`nav-item w-full flex items-center justify-between ${H ? "active" : ""} ${je ? "opacity-80" : ""}`} key={V.id}><div className="flex items-center gap-[10px]"><V.icon size={18} /><span className="font-medium text-[14px]">{V.label}</span></div>{je && <Ft size={12} className="text-[var(--text-tertiary)]" />}</button>;
          })}</div><div className="text-label mb-2 mt-6 px-2 text-[var(--text-disabled)] tracking-[0.1em]">TÁTICO</div><div className="flex flex-col gap-1">{q.filter(V => ["quebras", "composicao", "comparison", "heatmap", "rotas", "campeonatos", "history"].includes(V.id)).map(V => {
            const H = c === V.id;
            const je = V.premium && !_;
            return <button onClick={() => {
              if (je) {
                w("/planos", {
                  state: {
                    message: "Esta funcionalidade é exclusiva para assinantes. Assine um plano para ter acesso completo."
                  }
                });
                return;
              }
              w(V.path);
              k(false);
            }} className={`nav-item w-full flex items-center justify-between ${H ? "active" : ""} ${je ? "opacity-80" : ""}`} key={V.id}><div className="flex items-center gap-[10px]"><V.icon size={18} /><span className="font-medium text-[14px]">{V.label}</span></div>{je && <Ft size={12} className="text-[var(--text-tertiary)]" />}</button>;
          })}</div><div className="text-label mb-2 mt-6 px-2 text-[var(--text-disabled)] tracking-[0.1em]">CONTA</div><div className="flex flex-col gap-1"><button onClick={() => {
            w("/planos");
            k(false);
          }} className={`nav-item w-full flex items-center gap-[10px] ${c === "planos" ? "active" : ""}`}><_Component5 size={18} /><span className="font-medium text-[14px]">Planos</span></button><button onClick={() => {
            w("/?tab=security");
            k(false);
          }} className={`nav-item w-full flex items-center gap-[10px] ${c === "security" ? "active" : ""}`}><Ft size={18} /><span className="font-medium text-[14px]">Segurança</span></button></div><div className="pt-4 mt-6 border-t border-[var(--border-default)] mb-4"><button onClick={() => w("/input")} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white w-full flex items-center justify-center gap-2 transition-all duration-150 rounded-[10px] font-semibold text-[14px] py-[12px]"><Ea size={18} />Inserir Dados</button>{!_ && S && (u ? <div className="mt-4 p-4 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/20"><div className="flex items-center justify-between mb-1"><span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider">Trial ativo</span><_Component6 size={12} className="text-[#FFC107]" /></div><div className="flex items-baseline gap-1"><span className="text-xl font-black text-[#FFC107]">{Math.max(0, Math.ceil((new Date(S).getTime() - Date.now()) / 3600000))}</span><span className="text-[11px] font-medium text-[#FFC107]/80">horas restantes</span></div><div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[#FFC107] transition-all duration-500" style={{
                width: `${Math.min(100, Math.max(0, new Date(S).getTime() - Date.now()) / 86400000 * 100)}%`
              }} /></div></div> : <a href="https://wa.me/13981630304?text=Olá! Meu trial expirou e quero assinar o Celo Tracker" target="_blank" rel="noreferrer" className="mt-4 p-4 rounded-xl bg-[#FF3038]/10 border border-[#FF3038]/20 flex items-center justify-between group transition-all hover:bg-[#FF3038]/20"><div className="flex flex-col"><span className="text-[10px] font-bold text-[#FF3038] uppercase tracking-wider">Trial expirado</span><span className="text-sm font-black text-[#FF3038]">Assinar plano</span></div><_Component3 size={18} className="text-[#FF3038] group-hover:translate-x-1 transition-transform" /></a>)}</div></nav><div className="p-4 space-y-2 border-t border-white/10"><a href="https://wa.me/13981630304" target="_blank" rel="noreferrer" className="btn-ghost w-full flex items-center justify-between"><span className="flex items-center gap-2"><Ge size={16} /> Suporte Técnico</span><_Component3 size={12} /></a><button onClick={() => j()} className="btn-ghost w-full flex items-center gap-2 text-[var(--accent-red)] hover:bg-[var(--accent-red)]/10 border-transparent hover:border-[var(--accent-red)]/20"><_Component7 size={16} /> Sair da Conta</button><div className="pt-4 text-center"><p className="text-label">Criado por <span className="text-[var(--accent)] font-bold">@CeloCoach</span></p></div></div></aside><div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden pb-[60px] md:pb-0">{h && <div className="w-full bg-[#EF4444] text-white px-4 py-2.5 flex items-center justify-between text-caption z-45 shadow-lg shrink-0 select-none border-b border-black/10"><div className="flex items-center gap-2 font-black uppercase tracking-wider text-[11px]"><span>Seu plano vence em {m} {m === 1 ? "dia" : "dias"}</span></div><a href={X} target="_blank" rel="noreferrer" className="bg-[#0F0F0F] text-white hover:bg-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 text-center">Renovar</a></div>}<Ir /><header className="ctracker-topbar hidden md:flex" aria-label="Barra superior"><div className="ctracker-breadcrumb"><span>CTracker</span><_Component3 size={14} /><strong>{q.find(V => V.id === c)?.label ?? (c === "planos" ? "Planos" : c === "input" ? "Inserir Dados" : c === "security" ? "Segurança" : "Plataforma")}</strong></div><div className="ctracker-topbar-user"><span className="ctracker-status-dot" /> Plataforma ativa <span className="ctracker-avatar">{o?.email?.charAt(0).toUpperCase() ?? "C"}</span></div></header><header className="md:hidden h-[56px] flex items-center justify-between px-4 bg-[var(--bg-surface)] border-b border-[var(--border-default)] shrink-0 z-40 relative"><button onClick={() => k(true)} className="p-2 text-[var(--text-secondary)] hover:text-white rounded-lg hover:bg-white/5 active:scale-95 transition-all" title="Abrir menu"><_Component8 size={24} /></button><div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" onClick={() => w("/")}><img src="/redesign/logo.svg" alt="CTracker" style={{
            height: "36px",
            width: "auto"
          }} /></div><div className="w-[40px]" /> </header><div style={{
        minWidth: 0
      }} className="ctracker-content flex-1 min-h-0 overflow-y-auto w-full pb-[80px] md:pb-0 layout-content-container relative z-10">{r}</div></div><nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-[#0C0C0C]/95 backdrop-blur-md border-t border-[var(--border-default)] flex justify-around items-center z-40 md:hidden pb-safe"><button onClick={() => w("/?tab=overview")} className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-semibold transition-colors hover:text-white ${c === "overview" ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}><Da size={20} /><span>Dashboard</span></button><button onClick={() => w("/?tab=players")} className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-semibold transition-colors hover:text-white ${c === "players" ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}><Mt size={20} /><span>Jogadores</span></button><button onClick={() => w("/?tab=rounds")} className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-semibold transition-colors hover:text-white ${c === "rounds" ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}><Ea size={20} /><span>Rodadas</span></button><button onClick={() => w("/input")} className={`flex flex-col items-center justify-center gap-1 w-full h-full text-[10px] font-semibold transition-colors hover:text-white ${window.location.pathname === "/input" ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}><_Component6 size={20} /><span>Inserir</span></button></nav>{p && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-reveal"><div className="w-full max-w-sm bg-[#0F0F0F] border border-[#F59E0B]/30 rounded-2xl p-8 shadow-2xl relative text-center"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.1)]"><span className="text-2xl animate-pulse">⚠️</span></div><div className="mt-6 space-y-4"><h3 className="text-lg font-black text-white uppercase tracking-tight">Seu plano vence em {m} {m === 1 ? "dia" : "dias"}!</h3><p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">Renove agora para não perder o acesso ao CTracker</p></div><div className="grid grid-cols-1 gap-3 w-full mt-8"><a href={X} target="_blank" rel="noreferrer" onClick={T} className="py-3 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black text-caption font-black uppercase tracking-wider text-center transition-all duration-150 shadow-md active:scale-95 block">Renovar pelo WhatsApp</a><button onClick={T} className="py-3 px-4 border border-white/10 rounded-xl text-caption font-bold text-[var(--text-secondary)] hover:bg-white/5 transition-colors">Lembrar depois</button></div></div></div>}</div>;
};
const _r = () => {
  const [r, c] = s.useState([]);
  const [l, j] = s.useState(true);
  const [o, g] = s.useState(false);
  const [y, S] = s.useState("status");
  const [u, w] = s.useState("");
  const [P, k] = s.useState("");
  const [D, f] = s.useState("");
  const [N, i] = s.useState(null);
  s.useEffect(() => {
    m();
  }, []);
  const m = async () => {
    j(true);
    try {
      const {
        data: p,
        error: T
      } = await K.auth.mfa.listFactors();
      if (T) {
        throw T;
      }
      c(p.all || []);
    } catch (p) {
      console.error("Erro ao carregar fatores MFA:", p);
    } finally {
      j(false);
    }
  };
  const x = async () => {
    g(true);
    i(null);
    try {
      const {
        data: p,
        error: T
      } = await K.auth.mfa.enroll({
        factorType: "totp",
        issuer: "Celo Tracker",
        friendlyName: "Autenticador"
      });
      if (T) {
        throw T;
      }
      k(p.id);
      w(p.totp.qr_code);
      S("qr");
    } catch (p) {
      i(p.message || "Erro ao iniciar configuração");
    } finally {
      g(false);
    }
  };
  const h = async p => {
    p.preventDefault();
    g(true);
    i(null);
    try {
      const {
        data: T,
        error: Y
      } = await K.auth.mfa.challenge({
        factorId: P
      });
      if (Y) {
        throw Y;
      }
      const {
        error: X
      } = await K.auth.mfa.verify({
        factorId: P,
        challengeId: T.id,
        code: D
      });
      if (X) {
        throw X;
      }
      S("status");
      m();
    } catch (T) {
      i(T.message || "Código inválido.");
    } finally {
      g(false);
    }
  };
  const R = async p => {
    if (confirm("Tem certeza que deseja desativar o MFA? Sua conta ficará menos protegida.")) {
      j(true);
      try {
        const {
          error: T
        } = await K.auth.mfa.unenroll({
          factorId: p
        });
        if (T) {
          throw T;
        }
        m();
      } catch (T) {
        alert(T.message);
      } finally {
        j(false);
      }
    }
  };
  const v = r.some(p => p.status === "verified");
  if (l && y === "status") {
    return <div className="flex flex-col items-center justify-center py-20 animate-reveal"><_Component9 size={32} className="text-[#FF3038] animate-spin mb-4" /><p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Carregando segurança...</p></div>;
  } else {
    return <div className="max-w-4xl mx-auto py-8 px-4 animate-reveal"><header className="mb-10"><div className="flex items-center gap-3 mb-2"><Oa className="text-[var(--accent)]" size={24} /><h2 className="text-2xl font-black text-white uppercase tracking-tight">Segurança da Conta</h2></div><p className="text-[var(--text-secondary)] text-sm font-medium">Gerencie sua proteção e métodos de autenticação.</p></header><div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="md:col-span-2 space-y-6"><div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-6"><div className="flex items-start justify-between mb-8"><div className="flex items-center gap-4"><div className={`p-3 rounded-md ${v ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}><_Component0 size={20} /></div><div><h3 className="text-white font-bold text-sm">Autenticação em dois fatores (MFA)</h3><p className="text-[var(--text-tertiary)] text-xs mt-1">Status: {v ? "Ativado ✓" : "Desativado"}</p></div></div>{v && <span className="bg-green-500/20 text-green-500 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest border border-green-500/30">Ativo</span>}</div>{N && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm flex gap-2"><Ge size={16} className="shrink-0" /><span>{N}</span></div>}{y === "status" && <div className="space-y-6"><p className="text-[var(--text-secondary)] text-sm leading-relaxed">O MFA adiciona uma camada extra de segurança. Ao entrar, além da senha, você precisará de um código do seu celular.</p>{v ? <div className="space-y-4">{r.map(p => <div className="flex items-center justify-between p-4 rounded-md bg-[var(--bg-surface)] border border-[var(--border-default)]" key={p.id}><div className="flex items-center gap-3"><_Component1 size={16} className="text-green-500" /><span className="text-white font-medium text-sm">{p.friendly_name || "Autenticador"}</span></div><button onClick={() => R(p.id)} className="text-xs text-red-500 font-bold hover:underline">Remover</button></div>)}</div> : <button onClick={x} disabled={o} className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm">{o ? <_Component9 size={16} className="animate-spin" /> : <e.Fragment>Ativar Autenticação Agora <At size={16} /></e.Fragment>}</button>}</div>}{y === "qr" && <div className="flex flex-col items-center gap-6 animate-reveal"><div className="bg-white p-2 rounded-md"><img src={u} alt="TOTP QR Code" className="w-40 h-40" /></div><div className="text-center"><p className="text-white text-sm font-bold mb-2">Escaneie com Google Authenticator ou Authy</p><p className="text-[var(--text-tertiary)] text-xs">Depois de escanear, clique no botão abaixo para verificar.</p></div><button onClick={() => S("verify")} className="btn-primary w-full py-3 rounded-md text-sm">Já escaneei e quero verificar</button><button onClick={() => S("status")} className="text-[var(--text-secondary)] hover:text-white text-xs">Cancelar</button></div>}{y === "verify" && <form onSubmit={h} className="space-y-6 animate-reveal"><div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">Código de 6 dígitos</label><input type="text" maxLength={6} value={D} onChange={p => f(p.target.value.replace(/\D/g, ""))} className="w-full bg-[var(--bg-surface)] border-b-2 border-b-[var(--border-default)] focus:border-b-[var(--accent)] transition-colors py-3 text-center text-xl tracking-[0.4em] font-black text-white outline-none rounded-t-md" placeholder="000000" autoFocus={true} /></div><button type="submit" disabled={o || D.length !== 6} className="btn-primary w-full py-3 rounded-md flex items-center justify-center gap-2 text-sm">{o ? <_Component9 size={16} className="animate-spin" /> : "Confirmar e Ativar"}</button><button onClick={() => S("qr")} type="button" className="text-[var(--text-secondary)] hover:text-white text-xs w-full text-center">Voltar ao QR Code</button></form>}</div></div><div className="space-y-6"><div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-6"><Ft className="text-[var(--accent)] mb-4" size={20} /><h4 className="text-white font-bold text-xs mb-3 uppercase tracking-wide">Dicas de Segurança</h4><ul className="space-y-3"><li className="text-[var(--text-secondary)] text-xs leading-relaxed border-l-2 border-[var(--border-default)] pl-3">Não reuse senhas de outros serviços.</li><li className="text-[var(--text-secondary)] text-xs leading-relaxed border-l-2 border-[var(--border-default)] pl-3">Use um gerenciador de senhas (1Password, Bitwarden).</li><li className="text-[var(--text-secondary)] text-xs leading-relaxed border-l-2 border-[var(--border-default)] pl-3">Mantenha o MFA sempre ativo para proteção máxima.</li></ul></div></div></div></div>;
  }
};
const Br = ["BERMUDA", "KALAHARI", "NOVA TERRA", "PURGATORIO", "SOLARA"];
const Lr = {
  BERMUDA: "/maps/Bermuda_grid.jpg",
  KALAHARI: "/maps/Kalahari_grid.jpg",
  "NOVA TERRA": "/maps/Nova_Terra_grid.jpg",
  PURGATORIO: "/maps/Purgatory_grid.jpg",
  PURGATÓRIO: "/maps/Purgatory_grid.jpg",
  PURGATORY: "/maps/Purgatory_grid.jpg",
  SOLARA: "/maps/Solara_grid.jpg"
};
const qr = r => r.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const Ur = ({
  userId: r
}) => {
  const [c, l] = s.useState("BERMUDA");
  const [j, o] = s.useState([]);
  const [g, y] = s.useState(true);
  const [S, u] = s.useState(1);
  s.useEffect(() => {
    w();
  }, [c, r]);
  const w = async () => {
    if (r) {
      y(true);
      try {
        const i = qr(c);
        let m = K.from("death_locations").select("id, x_percent, y_percent, tipo, rota_ordem, rota_grupo").eq("user_id", r);
        if (i === "PURGATORIO") {
          m = m.in("mapa", ["PURGATORIO", "PURGATÓRIO", "PURGATORY"]);
        } else {
          m = m.eq("mapa", i);
        }
        const {
          data: x,
          error: h
        } = await m;
        if (h) {
          throw h;
        }
        o(x || []);
      } catch (i) {
        console.error("Erro ao buscar mortes:", i);
      } finally {
        y(false);
      }
    }
  };
  const P = s.useMemo(() => {
    const i = [];
    j.filter(h => !h.tipo || h.tipo === "morte").forEach(h => {
      let R = false;
      for (const v of i) {
        if (Math.sqrt(Math.pow(v.x - h.x_percent, 2) + Math.pow(v.y - h.y_percent, 2)) <= 3.5) {
          v.count += 1;
          R = true;
          break;
        }
      }
      if (!R) {
        i.push({
          x: h.x_percent,
          y: h.y_percent,
          count: 1
        });
      }
    });
    return i;
  }, [j]);
  const k = s.useMemo(() => {
    const i = new Map();
    j.forEach(m => {
      if (m.tipo === "rota" && m.rota_grupo) {
        if (!i.has(m.rota_grupo)) {
          i.set(m.rota_grupo, []);
        }
        i.get(m.rota_grupo).push(m);
      }
    });
    i.forEach(m => {
      m.sort((x, h) => (x.rota_ordem || 0) - (h.rota_ordem || 0));
    });
    return Array.from(i.entries());
  }, [j]);
  const D = s.useMemo(() => {
    const i = P.reduce((m, x) => x.count > m ? x.count : m, 0);
    return {
      total: j.length,
      max: i
    };
  }, [j, P]);
  const f = i => {
    let m = 32;
    let x = "14px";
    let h = "rgba(251, 191, 36, 0.45)";
    let R = "2px solid rgba(251, 191, 36, 0.95)";
    if (i >= 5) {
      m = 48;
      x = "24px";
      h = "rgba(239, 68, 68, 0.65)";
      R = "2.5px solid rgba(239, 68, 68, 0.95)";
    } else if (i >= 3) {
      m = 40;
      x = "18px";
      h = "rgba(239, 68, 68, 0.45)";
      R = "2px solid rgba(239, 68, 68, 0.95)";
    }
    return {
      backgroundColor: h,
      size: m,
      border: R,
      fontSize: x
    };
  };
  const N = Lr[c];
  return <div className="flex flex-col gap-2 w-full h-full overflow-hidden heatmap-page-container"><div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1 gap-4"><div><h2 className="text-heading text-lg flex items-center gap-2"><_Component10 className="text-[var(--accent)]" size={18} />Mapa de Calor — Onde seu time morre</h2><p className="text-label mt-1">Análise de densidade de mortes por mapa</p></div><button onClick={w} disabled={g} className="p-2 btn-ghost rounded-lg self-end md:self-auto"><_Component9 size={16} className={g ? "animate-spin text-[var(--accent)]" : ""} /></button></div><div className="metric-strip mb-2"><div className="metric-strip-item"><span className="text-[10px] text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Registros Totais</span><span className="text-2xl font-black text-[var(--accent)] numeric-mono">{D.total}</span></div><div className="metric-strip-item"><span className="text-[10px] text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Mapa Selecionado</span><span className="text-2xl font-black text-white numeric-mono font-mono">{c}</span></div><div className="metric-strip-item"><span className="text-[10px] text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Maior Conc. Morte</span><span className={`text-2xl font-black numeric-mono ${D.max >= 5 ? "text-[#EF4444]" : D.max >= 3 ? "text-[#F59E0B]" : "text-[#22C55E]"}`}>{D.max} {D.max === 1 ? "morte" : "mortes"}</span></div></div><div className="flex flex-wrap gap-2 mb-2">{Br.map(i => <button onClick={() => l(i)} className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${c === i ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--accent)] hover:text-white"}`} key={i}>{i}</button>)}</div><div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "8px 0"
    }}><span style={{
        color: "#EDEDED",
        fontSize: "13px",
        whiteSpace: "nowrap"
      }}>Opacidade das Marcações</span><input type="range" min={0.1} max={1} step={0.05} value={S} onChange={i => u(parseFloat(i.target.value))} style={{
        accentColor: "#FF3038",
        flex: 1
      }} /><span style={{
        color: "#EDEDED",
        fontSize: "13px",
        minWidth: "36px",
        textAlign: "right"
      }}>{Math.round(S * 100)}%</span></div><div className="flex-1 w-full max-w-full relative overflow-hidden rounded border border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-center min-h-[200px] heatmap-img-container">{g ? <div className="absolute inset-0 z-10 bg-[var(--bg-surface)]/50 backdrop-blur-sm flex items-center justify-center"><_Component9 size={24} className="animate-spin text-[var(--accent)]" /></div> : null}{N ? <div className="relative inline-block max-w-full max-h-full p-2 heatmap-img-wrapper" style={{
        position: "relative",
        display: "inline-block"
      }}><img src={N} alt={`Mapa ${c}`} className="max-w-full max-h-[calc(100vh-510px)] object-contain opacity-80 heatmap-img" draggable={false} /><svg style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 5
        }}><defs><marker id="heatmap-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#FF3038" /></marker></defs>{k.map(([i, m]) => {
            if (m.length < 2) {
              return null;
            }
            const x = [];
            for (let h = 0; h < m.length - 1; h++) {
              const R = m[h];
              const v = m[h + 1];
              const p = h === m.length - 2;
              x.push(<line x1={`${R.x_percent}%`} y1={`${R.y_percent}%`} x2={`${v.x_percent}%`} y2={`${v.y_percent}%`} stroke="#FF3038" strokeWidth="3.5" markerEnd={p ? "url(#heatmap-arrow)" : undefined} key={`${i}-${h}`} />);
            }
            return <g key={i}>{x}</g>;
          })}</svg>{j.filter(i => i.tipo === "rota").map((i, m) => <div className="absolute rounded-full" style={{
          left: `${i.x_percent}%`,
          top: `${i.y_percent}%`,
          width: "10px",
          height: "10px",
          backgroundColor: "#FF3038",
          border: "1.5px solid white",
          transform: "translate(-50%, -50%)",
          zIndex: 6,
          pointerEvents: "none"
        }} key={`rota-dot-${m}`} />)}{j.filter(i => i.tipo === "trocacao").map((i, m) => <div className="absolute rounded-full flex items-center justify-center font-bold text-white transition-all hover:scale-125 cursor-help shadow-lg" style={{
          left: `${i.x_percent}%`,
          top: `${i.y_percent}%`,
          width: "32px",
          height: "32px",
          backgroundColor: "rgba(245, 158, 11, 0.55)",
          border: "2px solid rgba(245, 158, 11, 0.95)",
          transform: "translate(-50%, -50%)",
          fontSize: "14px",
          zIndex: 9,
          opacity: S
        }} title="Trocação registrada" key={`trocacao-${m}`}>⚔️</div>)}{P.map((i, m) => {
          const x = f(i.count);
          return <div className="absolute rounded-full flex items-center justify-center font-bold text-white transition-all hover:scale-125 cursor-help shadow-lg" style={{
            left: `${i.x}%`,
            top: `${i.y}%`,
            width: `${x.size}px`,
            height: `${x.size}px`,
            backgroundColor: x.backgroundColor,
            border: x.border,
            transform: "translate(-50%, -50%)",
            fontSize: x.fontSize,
            zIndex: 10,
            opacity: S
          }} title={`${i.count} mortes nesta região`} key={`morte-${m}`}><span>💀</span>{i.count > 1 && <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-[9px] min-w-[16px] h-[16px] flex items-center justify-center border border-white font-sans font-bold">{i.count}</span>}</div>;
        })}</div> : <div className="text-center p-8"><p className="text-[var(--text-secondary)]">Mapa "{c}" não possui imagem configurada.</p></div>}</div><div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 justify-center items-center text-xs font-semibold heatmap-legend-container p-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg"><div className="flex items-center gap-2 text-[var(--text-secondary)] whitespace-nowrap"><span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          flexShrink: 0,
          fontSize: "11px",
          lineHeight: 1,
          backgroundColor: "rgba(251, 191, 36, 0.45)",
          border: "2px solid rgba(251, 191, 36, 0.95)"
        }}>💀</span><span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-mono">1-2 mortes</span></div><div className="flex items-center gap-2 text-[var(--text-secondary)] whitespace-nowrap"><span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          flexShrink: 0,
          fontSize: "13px",
          lineHeight: 1,
          backgroundColor: "rgba(239, 68, 68, 0.45)",
          border: "2px solid rgba(239, 68, 68, 0.95)"
        }}>💀</span><span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-mono">3-4 mortes</span></div><div className="flex items-center gap-2 text-[var(--text-secondary)] whitespace-nowrap"><span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          flexShrink: 0,
          fontSize: "15px",
          lineHeight: 1,
          backgroundColor: "rgba(239, 68, 68, 0.65)",
          border: "2.5px solid rgba(239, 68, 68, 0.95)"
        }}>💀</span><span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-mono">5+ mortes</span></div><div className="flex items-center gap-2 text-[var(--text-secondary)] whitespace-nowrap"><span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          flexShrink: 0,
          fontSize: "13px",
          lineHeight: 1,
          backgroundColor: "rgba(245, 158, 11, 0.55)",
          border: "2px solid rgba(245, 158, 11, 0.95)"
        }}>⚔️</span><span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-mono">Trocação</span></div><div className="flex items-center gap-2 text-[var(--text-secondary)] whitespace-nowrap"><span className="w-6 h-1 inline-block flex-shrink-0 bg-[#FF3038] relative"><span className="absolute -right-1 -top-1 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-[#FF3038]" /></span><span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-mono">ROTA</span></div></div></div>;
};
const $r = ({
  allPlayerRows: r,
  availableChamps: c
}) => {
  const [l, j] = s.useState(() => localStorage.getItem("comparison_campA") || "");
  const [o, g] = s.useState(() => localStorage.getItem("comparison_campB") || "");
  const y = v => {
    j(v);
    localStorage.setItem("comparison_campA", v);
  };
  const S = v => {
    g(v);
    localStorage.setItem("comparison_campB", v);
  };
  s.useEffect(() => {
    if (l && c.length > 0) {
      if (!c.some(p => p.toUpperCase().trim() === l.toUpperCase().trim())) {
        j("");
        localStorage.removeItem("comparison_campA");
      }
    }
  }, [l, c]);
  s.useEffect(() => {
    if (o && c.length > 0) {
      if (!c.some(p => p.toUpperCase().trim() === o.toUpperCase().trim())) {
        g("");
        localStorage.removeItem("comparison_campB");
      }
    }
  }, [o, c]);
  const u = v => {
    if (!v) {
      return [];
    }
    const p = r.filter(X => (X.campeonato_correto ? String(X.campeonato_correto).trim().toUpperCase() : X.campeonato ? String(X.campeonato).trim().toUpperCase() : "SEM EVENTO") === String(v).trim().toUpperCase());
    const T = new Map();
    for (const X of p) {
      const _ = X.partida_id ? String(X.partida_id) : X.created_at ? String(X.created_at) : `${X.data}|${X.campeonato_correto}|${X.rodada}|${X.mapa}`;
      if (!T.has(_)) {
        T.set(_, {
          matchId: _,
          created_at: X.created_at || "1970-01-01",
          kills: 0,
          dano: 0,
          derrubados: 0,
          mortes: 0,
          colocacao: Number(X.posicao) || 0,
          quedas: 1
        });
      }
      const q = T.get(_);
      q.kills += Number(X.kill || 0);
      q.dano += Number(X.dano_causado || 0);
      q.derrubados += Number(X.derrubados || 0);
      q.mortes += Number(X.morte || 0);
    }
    const Y = Array.from(T.values());
    Y.sort((X, _) => {
      const q = new Date(X.created_at).getTime();
      const V = new Date(_.created_at).getTime();
      return q - V;
    });
    return Y;
  };
  const [w, P] = s.useState([]);
  const [k, D] = s.useState([]);
  s.useEffect(() => {
    if (r.length > 0 && l) {
      P(u(l));
    } else {
      P([]);
    }
  }, [r, l]);
  s.useEffect(() => {
    if (r.length > 0 && o) {
      D(u(o));
    } else {
      D([]);
    }
  }, [r, o]);
  const f = v => {
    if (v.length === 0) {
      return {
        kills: 0,
        dano: 0,
        kd: 0,
        derrubados: 0,
        colocacao: 0,
        matches: 0
      };
    }
    const p = v.length;
    let T = 0;
    let Y = 0;
    let X = 0;
    let _ = 0;
    let q = 0;
    v.forEach(V => {
      T += V.kills;
      Y += V.dano;
      X += V.derrubados;
      _ += V.mortes;
      q += V.colocacao;
    });
    return {
      kills: T / p,
      dano: Y / p,
      kd: p > 0 ? T / p : T,
      derrubados: X / p,
      colocacao: q / p,
      matches: p
    };
  };
  const N = f(w);
  const i = f(k);
  const m = Math.max(w.length, k.length);
  const x = s.useMemo(() => {
    const v = [];
    for (let p = 0; p < m; p++) {
      const T = w[p];
      const Y = k[p];
      v.push({
        name: `Queda ${p + 1}`,
        killsA: T ? T.kills : null,
        killsB: Y ? Y.kills : null,
        danoA: T ? T.dano : null,
        danoB: Y ? Y.dano : null,
        kdA: T ? T.quedas > 0 ? Number((T.kills / T.quedas).toFixed(2)) : T.kills : null,
        kdB: Y ? Y.quedas > 0 ? Number((Y.kills / Y.quedas).toFixed(2)) : Y.kills : null,
        derrubadosA: T ? T.derrubados : null,
        derrubadosB: Y ? Y.derrubados : null,
        colocacaoA: T ? T.colocacao : null,
        colocacaoB: Y ? Y.colocacao : null
      });
    }
    return v;
  }, [w, k, m]);
  const h = v => v.toFixed(1).replace(".0", "");
  const R = ({
    active: v,
    payload: p,
    label: T
  }) => v && p && p.length ? <div className="bg-[#09090b] border border-[var(--border-default)] rounded-lg p-3 shadow-xl"><p className="text-white font-bold mb-2 text-sm">{T}</p>{p.map((Y, X) => <div className="flex items-center gap-2 mb-1" key={X}><div className="w-3 h-3 rounded-full" style={{
        backgroundColor: Y.color
      }} /><span className="text-xs text-[var(--text-secondary)]">{Y.name}:</span><span className="text-xs font-bold text-white numeric-mono">{Y.value}</span></div>)}</div> : null;
  return <div className="space-y-6 animate-reveal w-full"><div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center"><Ga size={20} className="text-[var(--accent)]" /></div><div><h2 className="text-white font-bold text-lg">Comparativo de Campeonatos</h2><p className="text-[var(--text-tertiary)] text-xs">Selecione dois campeonatos para contrapor a evolução de desempenho por queda.</p></div></div><div className="flex items-center gap-4 w-full md:w-auto"><div className="flex-1 md:w-48"><label className="text-[10px] uppercase font-bold text-[#FF3038] tracking-wider mb-1 block">Campeonato A</label><select value={l} onChange={v => y(v.target.value)} className="w-full bg-[#09090b] border border-[#FF3038]/30 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#FF3038] transition-colors appearance-none cursor-pointer"><option value="">Selecione...</option>{c.map(v => <option value={v} key={v}>{v}</option>)}</select></div><div className="text-[var(--text-disabled)] font-bold pt-5">VS</div><div className="flex-1 md:w-48"><label className="text-[10px] uppercase font-bold text-[#22C55E] tracking-wider mb-1 block">Campeonato B</label><select value={o} onChange={v => S(v.target.value)} className="w-full bg-[#09090b] border border-[#22C55E]/30 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#22C55E] transition-colors appearance-none cursor-pointer"><option value="">Selecione...</option>{c.map(v => <option value={v} key={v}>{v}</option>)}</select></div></div></div>{(!l || !o) && <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-12 flex flex-col items-center justify-center text-center"><Ga size={48} className="text-[var(--text-disabled)] mb-4 opacity-50" /><h3 className="text-[var(--text-secondary)] font-bold text-lg mb-2">Aguardando Seleção</h3><p className="text-[var(--text-tertiary)] text-sm max-w-md">Por favor, selecione dois campeonatos nos dropdowns acima para carregar o painel comparativo.</p></div>}{r.length > 0 && l && w.length === 0 && <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6 flex flex-col items-center justify-center text-center"><Ge size={32} className="text-[#FF4444] mb-2" /><p className="text-[#FF4444] font-bold text-sm">Campeonato não encontrado. Selecione outro campeonato.</p></div>}{r.length > 0 && o && k.length === 0 && <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6 flex flex-col items-center justify-center text-center"><Ge size={32} className="text-[#FF4444] mb-2" /><p className="text-[#FF4444] font-bold text-sm">Campeonato não encontrado. Selecione outro campeonato.</p></div>}{l && o && <e.Fragment><div className="grid grid-cols-2 md:grid-cols-5 gap-4">{[{
          label: "Kills / Queda",
          valA: N.kills,
          valB: i.kills,
          icon: _Component25
        }, {
          label: "Dano / Queda",
          valA: N.dano,
          valB: i.dano,
          icon: _Component17
        }, {
          label: "K/D Squad",
          valA: N.kd,
          valB: i.kd,
          icon: _Component6
        }, {
          label: "Derrubados / Queda",
          valA: N.derrubados,
          valB: i.derrubados,
          icon: Mt
        }, {
          label: "Colocação Média",
          valA: N.colocacao,
          valB: i.colocacao,
          icon: Je,
          inv: true
        }].map((v, p) => <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 flex flex-col" key={p}><div className="flex items-center justify-between mb-3"><span className="text-[10px] text-[var(--text-tertiary)] uppercase font-bold tracking-wider">{v.label}</span><v.icon size={14} className="text-[var(--text-disabled)]" /></div><div className="flex flex-col gap-2 mt-auto"><div className="flex justify-between items-end"><span className="text-[#FF3038] text-xs font-bold truncate max-w-[50%]" title={l}>{l}</span><span className={`text-xl font-black numeric-mono ${v.inv ? v.valA < v.valB ? "text-white" : "text-white/50" : v.valA > v.valB ? "text-white" : "text-white/50"}`}>{h(v.valA)}</span></div><div className="flex justify-between items-end"><span className="text-[#22C55E] text-xs font-bold truncate max-w-[50%]" title={o}>{o}</span><span className={`text-xl font-black numeric-mono ${v.inv ? v.valB < v.valA ? "text-white" : "text-white/50" : v.valB > v.valA ? "text-white" : "text-white/50"}`}>{h(v.valB)}</span></div></div></div>)}</div><div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{[{
          title: "Kills do Squad por Queda",
          dataKeyA: "killsA",
          dataKeyB: "killsB",
          colorA: "#FF3038",
          colorB: "#22C55E"
        }, {
          title: "Dano do Squad por Queda",
          dataKeyA: "danoA",
          dataKeyB: "danoB",
          colorA: "#FF3038",
          colorB: "#22C55E"
        }, {
          title: "Derrubados por Queda",
          dataKeyA: "derrubadosA",
          dataKeyB: "derrubadosB",
          colorA: "#FF3038",
          colorB: "#22C55E"
        }, {
          title: "K/D do Squad por Queda",
          dataKeyA: "kdA",
          dataKeyB: "kdB",
          colorA: "#FF3038",
          colorB: "#22C55E"
        }].map((v, p) => <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4" key={p}><h3 className="text-label-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4">{v.title}</h3><div className="h-64"><Te width="100%" height="100%"><_Component13 data={x} margin={{
                top: 5,
                right: 20,
                left: -20,
                bottom: 5
              }}><_Component11 strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} /><_Component12 dataKey="name" stroke="var(--text-tertiary)" fontSize={10} tickLine={false} axisLine={false} /><Ie stroke="var(--text-tertiary)" fontSize={10} tickLine={false} axisLine={false} /><_e content={R} /><Ya wrapperStyle={{
                  fontSize: "11px",
                  color: "var(--text-secondary)"
                }} /><Ot type="monotone" name={l} dataKey={v.dataKeyA} stroke={v.colorA} strokeWidth={3} dot={{
                  r: 4,
                  fill: v.colorA
                }} activeDot={{
                  r: 6
                }} connectNulls={true} /><Ot type="monotone" name={o} dataKey={v.dataKeyB} stroke={v.colorB} strokeWidth={3} dot={{
                  r: 4,
                  fill: v.colorB
                }} activeDot={{
                  r: 6
                }} connectNulls={true} /></_Component13></Te></div></div>)}<div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 lg:col-span-2"><h3 className="text-label-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Colocação por Queda (Menor é Melhor)</h3><div className="h-64"><Te width="100%" height="100%"><_Component13 data={x} margin={{
                top: 5,
                right: 20,
                left: -20,
                bottom: 5
              }}><_Component11 strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} /><_Component12 dataKey="name" stroke="var(--text-tertiary)" fontSize={10} tickLine={false} axisLine={false} /><Ie stroke="var(--text-tertiary)" fontSize={10} tickLine={false} axisLine={false} reversed={true} domain={[1, 12]} /><_e content={R} /><Ya wrapperStyle={{
                  fontSize: "11px",
                  color: "var(--text-secondary)"
                }} /><Ot type="monotone" name={l} dataKey="colocacaoA" stroke="#FF3038" strokeWidth={3} dot={{
                  r: 4,
                  fill: "#FF3038"
                }} activeDot={{
                  r: 6
                }} connectNulls={true} /><Ot type="monotone" name={o} dataKey="colocacaoB" stroke="#22C55E" strokeWidth={3} dot={{
                  r: 4,
                  fill: "#22C55E"
                }} activeDot={{
                  r: 6
                }} connectNulls={true} /></_Component13></Te></div></div></div></e.Fragment>}</div>;
};
class Kr extends Za.Component {
  constructor(c) {
    super(c);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{
        padding: "24px",
        color: "#EDEDED",
        textAlign: "center",
        marginTop: "48px"
      }}><p style={{
          fontSize: "16px",
          marginBottom: "16px"
        }}>Algo deu errado. Recarregue a página.</p><button onClick={() => window.location.reload()} style={{
          background: "#FF3038",
          color: "#EDEDED",
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px"
        }}>Recarregar</button></div>;
    } else {
      return this.props.children;
    }
  }
}
const Pt = ({
  options: r,
  selected: c,
  onChange: l,
  icon: j,
  placeholder: o = "Todos Eventos",
  pluralName: g = "eventos"
}) => {
  const [y, S] = s.useState(false);
  const u = s.useRef(null);
  s.useEffect(() => {
    const f = N => {
      if (u.current && !u.current.contains(N.target)) {
        S(false);
      }
    };
    document.addEventListener("mousedown", f);
    return () => document.removeEventListener("mousedown", f);
  }, []);
  const w = c.length === 0 || c.length === r.length;
  const P = () => {
    l(w ? [] : []);
  };
  const k = f => {
    if (w) {
      l([f]);
    } else if (c.includes(f)) {
      const N = c.filter(i => i !== f);
      l(N);
    } else {
      const N = [...c, f];
      if (N.length === r.length) {
        l([]);
      } else {
        l(N);
      }
    }
  };
  let D = o;
  if (!w && c.length > 0) {
    if (c.length === 1) {
      D = c[0];
    } else if (c.length <= 2) {
      D = c.join(", ");
    } else {
      D = `${c.length} ${g}`;
    }
  }
  return <div className="relative" ref={u}><button type="button" onClick={() => S(!y)} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--border-subtle)] transition-colors text-[var(--text-secondary)] hover:text-white min-w-[140px] justify-between cursor-pointer"><div className="flex items-center gap-2 overflow-hidden">{j}<span className="font-bold text-caption uppercase tracking-wider truncate max-w-[150px]">{D}</span></div><Ds size={14} className={`transition-transform duration-200 ${y ? "rotate-180" : ""}`} /></button>{y && <div className="absolute top-full left-0 mt-1 w-64 bg-[#09090b] border border-[var(--border-default)] rounded-md shadow-xl z-50 overflow-hidden max-h-60 flex flex-col"><div className="overflow-y-auto custom-scrollbar p-1"><div className="flex items-center px-3 py-2 cursor-pointer hover:bg-[var(--bg-hover)] rounded-md transition-colors" onClick={P}><div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${w ? "bg-[var(--accent)] border-[var(--accent)]" : "border-[var(--border-strong)]"}`}>{w && <$t size={12} className="text-white" />}</div><span className="text-label-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">{o}</span></div><div className="h-px bg-[var(--border-subtle)] my-1 mx-2" />{r.map(f => {
          const N = w || c.includes(f);
          return <div className="flex items-center px-3 py-2 cursor-pointer hover:bg-[var(--bg-hover)] rounded-md transition-colors" onClick={() => k(f)} key={f}><div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${N ? "bg-[var(--accent)] border-[var(--accent)]" : "border-[var(--border-strong)]"}`}>{N && <$t size={12} className="text-white" />}</div><span className="text-label-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]">{f}</span></div>;
        })}{r.length === 0 && <div className="px-3 py-3 text-center text-label-sm text-[var(--text-tertiary)]">Nenhum {g} encontrado</div>}</div></div>}</div>;
};
const ma = ["FASE DE GRUPOS", "QUALIFY", "SEMI", "FINAL"];
const Ta = ({
  children: r,
  className: c = ""
}) => <div className={`card p-6 relative overflow-hidden ${c}`}>{r}</div>;
const Gr = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  color: "var(--text-primary)",
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  padding: "12px 16px",
  boxShadow: "var(--shadow-elevated)"
};
const Wr = {
  color: "var(--text-primary)",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase"
};
const Hr = {
  color: "var(--text-secondary)",
  fontSize: "10px",
  fontWeight: "700",
  textTransform: "uppercase",
  marginBottom: "4px"
};
const Vr = ({
  message: r,
  type: c
}) => {
  const l = {
    success: {
      badge: "badge-green",
      icon: _Component1
    },
    error: {
      badge: "badge-red",
      icon: Gt
    },
    warning: {
      badge: "badge-amber",
      icon: Ge
    }
  }[c];
  const _Component14 = l.icon;
  return <div className="fixed top-6 right-6 z-[9999] card p-4 flex items-center gap-3 animate-fade-in"><div className={`badge ${l.badge}`}><_Component14 size={14} /></div><span className="text-heading">{r}</span></div>;
};
const et = r => {
  const c = r.toUpperCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (c === "PURGATORIO" || c === "PURGATORY") {
    return "PURGATORIO";
  } else if (c === "NOVA TERRA" || c === "NOVATERRA") {
    return "NOVA TERRA";
  } else {
    return c;
  }
};
const Qr = ({
  data: r,
  setPartidaEditando: c,
  setMatchToDelete: l,
  setIsDeleteModalOpen: j
}) => <div className="space-y-6 animate-reveal"><div className="flex items-center justify-between"><div><h3 className="text-heading text-xl">Cronologia de Partidas</h3><p className="text-label mt-1">Histórico completo de partidas registradas</p></div></div><div className="overflow-hidden bg-transparent md:bg-[var(--bg-card)] border-none md:border border-[var(--border-subtle)] rounded-lg">{!r || r.rawData.length === 0 ? <div className="flex flex-col items-center justify-center p-16 text-center bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl"><Ge size={32} className="mb-4 text-[var(--text-tertiary)] opacity-20" /><p className="text-label uppercase tracking-widest">Nenhum dado encontrado</p></div> : <e.Fragment><div className="hidden md:block overflow-x-auto bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl"><table className="w-full text-left table-dense"><thead className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]"><tr><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Data</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Torneio</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Rodada</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Mapa</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Rank</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-right">Abates</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-right">Total</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-right">Booyah</th><th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-right">Ação</th></tr></thead><tbody className="divide-y divide-[var(--border-subtle)]">{r.rawData.map((o, g) => <tr className="hover:bg-[var(--bg-hover)] transition-colors group" key={g}><td className="px-4 py-3 numeric-mono text-[var(--text-secondary)] text-label">{String(o.Data).includes("-") ? String(o.Data).split("-").reverse().join("/") : o.Data}</td><td className="px-4 py-3 font-bold text-[var(--text-primary)] text-label-sm uppercase truncate max-w-[120px]" title={o.Campeonato}>{o.Campeonato}</td><td className="px-4 py-3 font-bold text-[var(--text-tertiary)] text-label">#{String(o.Rodada).padStart(2, "0")}</td><td className="px-4 py-3 font-bold text-[var(--text-secondary)] uppercase text-label-sm">{o.Mapa}</td><td className="px-6 py-4"><span className={`badge ${o.Colocacao === 1 ? "badge-purple" : "badge-ghost"}`}>P{o.Colocacao}</span></td><td className="px-4 py-3 text-right numeric-mono text-[var(--accent-red)] text-label">{o.Kill}</td><td className="px-4 py-3 text-right numeric-mono text-[var(--text-primary)] text-label">{o.Pontos_Total}</td><td className="px-4 py-3 text-right">{o.Booyah === "SIM" ? <div className="flex justify-end"><div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--accent-glow)]"><Je size={12} className="text-white" /></div></div> : <span className="text-[var(--text-tertiary)]">--</span>}</td><td className="px-4 py-3 text-right"><div className="flex justify-end items-center gap-2"><button onClick={() => c(o)} className="p-2 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors opacity-0 group-hover:opacity-100" title="Editar Partida">✏️</button><button onClick={() => {
                    l(o);
                    j(true);
                  }} className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100" title="Remover Partida"><_Component15 size={16} /></button></div></td></tr>)}</tbody></table></div><div className="block md:hidden space-y-3 px-2 py-1">{r.rawData.map((o, g) => {
          const y = String(o.Data).includes("-") ? String(o.Data).split("-").reverse().join("/").substring(0, 5) : String(o.Data).substring(0, 5);
          const u = {
            BERMUDA: "BER",
            KALAHARI: "KAL",
            "NOVA TERRA": "NOV",
            PURGATORIO: "PUR",
            PURGATÓRIO: "PUR",
            SOLARA: "SOL"
          }[String(o.Mapa).toUpperCase()] || String(o.Mapa).substring(0, 3).toUpperCase();
          return <div className="bg-[#171717] border border-[#2C2C2C] rounded-xl p-4 shadow-md flex flex-col gap-2 relative" key={g}><div className="flex justify-between items-center"><span className="font-bold text-[var(--accent)] text-body uppercase truncate max-w-[70%]">{o.Campeonato}</span><span className="text-[var(--text-tertiary)] text-caption font-mono">{y}</span></div><div className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-[var(--text-secondary)] font-semibold mt-1"><span>Rodada {String(o.Rodada).padStart(2, "0")}</span><span className="text-[var(--text-tertiary)]">•</span><span>{u}</span><span className="text-[var(--text-tertiary)]">•</span><span className={`px-2 py-0.5 rounded text-label-sm font-bold ${o.Colocacao === 1 ? "bg-[var(--accent)]/25 text-[var(--accent)] border border-[var(--accent)]/40" : "bg-white/5 text-[var(--text-secondary)]"}`}>P{o.Colocacao} {o.Booyah === "SIM" && "🏆"}</span></div><div className="flex justify-between items-center border-t border-[#2C2C2C] pt-3 mt-1"><div className="flex gap-4 text-caption font-semibold"><div><span className="text-[var(--text-tertiary)] block text-micro uppercase tracking-wider">Abates</span><span className="text-[var(--accent-red)] font-mono">{o.Kill}</span></div><div><span className="text-[var(--text-tertiary)] block text-micro uppercase tracking-wider">Total</span><span className="text-[var(--text-primary)] font-mono">{o.Pontos_Total} pts</span></div></div><div className="flex gap-2"><button onClick={() => c(o)} className="p-2 rounded-lg text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 active:scale-95 transition-all text-caption" title="Editar Partida">✏️</button><button onClick={() => {
                  l(o);
                  j(true);
                }} className="p-2 rounded-lg text-red-500 bg-red-500/5 border border-red-500/10 active:scale-95 transition-all text-caption" title="Remover Partida">🗑️</button></div></div></div>;
        })}</div></e.Fragment>}</div></div>;
const Yr = ({
  filterOptions: r,
  roundChampFilter: c,
  setRoundChampFilter: l,
  roundDateFilter: j,
  setRoundDateFilter: o,
  roundsStats: g,
  roundsChartData: y,
  roundsTabRows: S,
  expandedRound: u,
  setExpandedRound: w,
  roundPlayerData: P
}) => <div className="space-y-6 animate-reveal"><div className="flex flex-wrap items-center gap-4"><Pt options={r.championships} selected={c} onChange={l} icon={<Je size={16} className="text-[var(--accent)]" />} placeholder="Todos Eventos" /><Pt options={r.dates} selected={j} onChange={o} icon={<_Component16 size={16} className="text-[var(--accent)]" />} placeholder="Todas as Datas" pluralName="datas" /></div><div className="metric-strip mb-6"><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Total de Rodadas</span><span className="text-2xl font-black text-[#EDEDED] numeric-mono">{g?.total || 0}</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Melhor Rodada</span><span className="text-2xl font-black text-[#22C55E] numeric-mono">{g?.best || 0}</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Pior Rodada</span><span className="text-2xl font-black text-[#EF4444] numeric-mono">{g?.worst || 0}</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Média de Pontos</span><span className="text-2xl font-black text-[#F59E0B] numeric-mono">{g?.avg || 0}</span></div></div><Ta className="p-0 overflow-hidden"><div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]"><h4 className="text-heading text-body font-bold uppercase tracking-widest flex items-center gap-2"><Pa size={16} className="text-[var(--accent)]" />Evolução de Pontos por Rodada</h4></div><div style={{
      width: "100%",
      height: 300,
      minHeight: 300,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 32,
      paddingBottom: 32
    }}><Te width="100%" height="100%"><_Component13 data={y}><_Component11 stroke="#27272A" vertical={false} strokeDasharray="3 3" /><_Component12 dataKey="name" tick={{
            fontSize: 10,
            fill: "#A1A1AA"
          }} axisLine={false} tickLine={false} /><Ie tick={{
            fontSize: 10,
            fill: "#A1A1AA"
          }} axisLine={false} tickLine={false} /><_e contentStyle={Gr} itemStyle={Wr} labelStyle={Hr} formatter={k => [k ?? 0, "PONTOS"]} labelFormatter={k => String(k)} /><Ot type="monotone" dataKey="pontos" name="PONTOS" stroke="#FF3038" strokeWidth={3} dot={{
            r: 5,
            fill: "#FF3038",
            strokeWidth: 0
          }} activeDot={{
            r: 8,
            fill: "#FF3038",
            stroke: "#FFF",
            strokeWidth: 2
          }} /></_Component13></Te></div></Ta><Ta className="p-0 overflow-hidden"><table className="w-full text-left table-dense"><thead className="bg-[#18181B] border-b border-[#27272A]"><tr><th className="px-4 py-3 font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-label-sm">Rodada</th><th className="px-4 py-3 font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-label-sm">Mapa</th><th className="px-4 py-3 font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-label-sm text-center">Colocação</th><th className="px-4 py-3 font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-label-sm text-center">Kills Squad</th><th className="px-4 py-3 font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-label-sm text-center">Pontos</th><th className="px-4 py-3 font-bold text-[var(--text-tertiary)] uppercase tracking-wider text-label-sm">Data</th></tr></thead><tbody className="divide-y divide-[var(--border-subtle)]">{S.map((k, D) => <Za.Fragment key={D}><tr onClick={() => w(f => f === `${k.Campeonato}|${k.Rodada}` ? null : `${k.Campeonato}|${k.Rodada}`)} className="hover:bg-white/5 transition-colors cursor-pointer group"><td className="px-4 py-3 font-bold text-[var(--text-primary)]">#{String(k.Rodada).padStart(2, "0")}</td><td className="px-4 py-3 font-bold uppercase text-[var(--text-secondary)] text-label">{k.Mapa}</td><td className="px-4 py-3 text-center"><span className={`badge ${k.Colocacao === 1 ? "badge-purple" : "badge-ghost"}`}>P{k.Colocacao}</span></td><td className="px-4 py-3 text-center numeric-mono text-[var(--accent-red)]">{k.Kill}</td><td className="px-4 py-3 text-center numeric-mono text-[var(--text-primary)]">{k.Pontos_Total}</td><td className="px-4 py-3 text-[var(--text-tertiary)] numeric-mono text-label">{k.Data}</td></tr>{u === `${k.Campeonato}|${k.Rodada}` && <tr className="bg-[var(--bg-surface)] animate-fade-in border-l-2 border-[var(--accent)]"><td colSpan={6} className="px-8 py-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">{P.length === 0 ? <div className="col-span-full text-center py-4 text-[#A1A1AA] italic">Carregando performance individual...</div> : P.map((f, N) => <div className="p-3 rounded-lg bg-black/30 border border-white/5" key={N}><div className="text-label-sm font-bold text-[var(--accent)] uppercase mb-1">{f.player}</div><div className="flex justify-between items-center"><span className="text-caption text-white"><Ma size={10} className="inline mr-1 opacity-50" />{f.kill}</span><span className="text-caption text-white"><_Component17 size={10} className="inline mr-1 opacity-50" />{f.dano_causado}</span><span className={`text-label-sm ${f.morte === 0 ? "text-green-400" : "text-red-400"}`}>{f.morte === 0 ? "SURVIVED" : "ELIMINATED"}</span></div></div>)}</div></td></tr>}</Za.Fragment>)}</tbody></table></Ta></div>;
const Jr = ({
  isUploadingPhoto: r,
  playerPhoto: c,
  selectedIndividualPlayer: l,
  setSelectedIndividualPlayer: j,
  fileInputRef: o,
  handlePhotoUpload: g,
  distinctIndividualPlayers: y,
  individualStats: S,
  individualKdChartData: u,
  individualMapChartData: w,
  individualPlacementData: P,
  individualVsSquadData: k,
  individualRawData: D
}) => <div className="space-y-8 animate-reveal"><div className="flex flex-col md:flex-row md:items-center justify-between gap-6 card"><div className="flex items-center gap-6"><div className="relative group"><div className="w-24 h-24 rounded-full border-4 border-[var(--bg-surface)] bg-[#1A1A1A] overflow-hidden flex items-center justify-center text-[var(--accent)] text-3xl font-black shadow-lg">{r ? <Tt size={24} className="animate-spin text-[var(--accent)]" /> : c ? <img src={c} alt={l} className="w-full h-full object-cover" /> : l ? l.substring(0, 2).toUpperCase() : "?"}</div><button onClick={() => o.current?.click()} disabled={r || !l} title="Alterar foto do jogador" className="absolute bottom-0 right-0 p-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-full text-[var(--text-secondary)] hover:text-white transition-all shadow-md group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] disabled:opacity-50"><Fs size={14} /></button><input type="file" ref={o} className="hidden" accept="image/jpeg,image/png,image/webp" onChange={g} /></div><div className="flex items-center gap-3 bg-[#09090b] px-4 py-2 rounded-lg border border-[var(--border-default)]"><_Component18 size={16} className="text-[var(--text-tertiary)]" /><select value={l} onChange={f => j(f.target.value)} className="bg-transparent text-white outline-none border-none text-body-sm font-bold cursor-pointer appearance-none min-w-[150px]"><option value="" disabled={true} className="bg-[#09090b]">Selecionar Jogador</option>{y.map(f => <option value={f} className="bg-[#09090b]" key={f}>{f}</option>)}</select><Ds size={14} className="text-[var(--text-tertiary)]" /></div></div></div><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3"><div className="flex flex-col gap-1 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[#22C55E]/20 transition-colors"><span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">KILLS</span><span className="text-2xl font-black text-[#22C55E] tracking-tight">{S.kills}</span></div><div className="flex flex-col gap-1 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[#EF4444]/20 transition-colors"><span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">MORTES</span><span className="text-2xl font-black text-[#EF4444] tracking-tight">{S.mortes}</span></div><div className="flex flex-col gap-1 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[#3B82F6]/20 transition-colors"><span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">ASSISTS</span><span className="text-2xl font-black text-[#3B82F6] tracking-tight">{S.assists}</span></div><div className="flex flex-col gap-1 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[#F59E0B]/20 transition-colors"><span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">K/D</span><span className="text-2xl font-black text-[#F59E0B] tracking-tight">{S.kd.toFixed(2)}</span></div><div className="flex flex-col gap-1 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-white/10 transition-colors"><span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">DANO MÉD.</span><span className="text-2xl font-black text-[#EDEDED] tracking-tight">{S.danoMedio}</span></div><div className="flex flex-col gap-1 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[#FF3038]/20 transition-colors"><span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">DERRUBADOS</span><span className="text-2xl font-black text-[#FF3038] tracking-tight">{S.derrubados}</span></div><div className="flex flex-col gap-1 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-white/10 transition-colors"><span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">QUEDAS</span><span className="text-2xl font-black text-[#EDEDED] tracking-tight">{S.quedas}</span></div></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="card space-y-6"><h3 className="text-label text-[var(--text-secondary)] tracking-widest flex items-center gap-2"><Pa size={14} /> EVOLUÇÃO K/D</h3><div style={{
        width: "100%",
        height: "260px"
      }}><Te width="100%" height="100%"><_Component13 data={u} margin={{
            left: -20,
            bottom: 5,
            right: 10,
            top: 10
          }}><_Component11 stroke="var(--border-subtle)" vertical={false} strokeDasharray="3 3" /><_Component12 dataKey="name" axisLine={false} tickLine={false} tick={{
              fontSize: 10,
              fill: "var(--text-tertiary)"
            }} /><Ie tickLine={false} axisLine={false} tick={{
              fontSize: 10,
              fill: "var(--text-tertiary)"
            }} /><_e contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "var(--border-default)",
              borderRadius: "8px"
            }} itemStyle={{
              fontSize: "12px",
              fontWeight: "bold"
            }} labelStyle={{
              fontSize: "11px",
              color: "var(--text-tertiary)"
            }} formatter={f => [f, "K/D"]} /><Ot type="monotone" dataKey="kd" stroke="var(--accent)" strokeWidth={2} dot={{
              r: 3,
              fill: "var(--bg-surface)",
              strokeWidth: 2
            }} activeDot={{
              r: 5,
              fill: "var(--accent)",
              strokeWidth: 0
            }} /></_Component13></Te></div></div><div className="card space-y-6"><h3 className="text-label text-[var(--text-secondary)] tracking-widest flex items-center gap-2"><_Component19 size={14} /> ABATES POR MAPA</h3><div style={{
        width: "100%",
        height: "260px"
      }}><Te width="100%" height="100%"><_Component20 data={w} layout="vertical" margin={{
            left: 0,
            bottom: 5,
            right: 20,
            top: 10
          }}><_Component11 stroke="var(--border-subtle)" horizontal={true} vertical={false} strokeDasharray="3 3" /><_Component12 type="number" hide={true} /><Ie dataKey="name" type="category" axisLine={false} tickLine={false} tick={{
              fontSize: 10,
              fill: "var(--text-secondary)",
              fontWeight: "bold"
            }} width={80} /><_e contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "var(--border-default)",
              borderRadius: "8px"
            }} itemStyle={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#10B981"
            }} cursor={{
              fill: "var(--bg-main)"
            }} formatter={f => [f, "Abates"]} /><Qe dataKey="kills" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} /></_Component20></Te></div></div><div className="card space-y-6"><h3 className="text-label text-[var(--text-secondary)] tracking-widest flex items-center gap-2"><Je size={14} /> COLOCAÇÕES ALCANÇADAS</h3><div style={{
        width: "100%",
        height: "260px"
      }}><Te width="100%" height="100%"><_Component20 data={P} margin={{
            left: -20,
            bottom: 5,
            right: 10,
            top: 10
          }}><_Component11 stroke="var(--border-subtle)" vertical={false} strokeDasharray="3 3" /><_Component12 dataKey="name" axisLine={false} tickLine={false} tick={{
              fontSize: 10,
              fill: "var(--text-secondary)",
              fontWeight: "bold"
            }} /><Ie tickLine={false} axisLine={false} tick={{
              fontSize: 10,
              fill: "var(--text-tertiary)"
            }} /><_e contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "var(--border-default)",
              borderRadius: "8px"
            }} itemStyle={{
              fontSize: "12px",
              fontWeight: "bold"
            }} cursor={{
              fill: "var(--bg-main)"
            }} formatter={f => [f, "Quedas"]} /><Qe dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>{P.map((f, N) => <_Component21 fill={f.fill} key={`cell-${N}`} />)}</Qe></_Component20></Te></div></div><div className="card space-y-6"><h3 className="text-label text-[var(--text-secondary)] tracking-widest flex items-center gap-2"><_Component6 size={14} /> JOGADOR VS SQUAD (MÉDIA POR QUEDA)</h3><div style={{
        width: "100%",
        height: "260px"
      }}><Te width="100%" height="100%"><_Component20 data={k} margin={{
            left: -20,
            bottom: 5,
            right: 10,
            top: 10
          }}><_Component11 stroke="var(--border-subtle)" vertical={false} strokeDasharray="3 3" /><_Component12 dataKey="name" axisLine={false} tickLine={false} tick={{
              fontSize: 10,
              fill: "var(--text-secondary)"
            }} /><Ie tickLine={false} axisLine={false} tick={{
              fontSize: 10,
              fill: "var(--text-tertiary)"
            }} /><_e contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "var(--border-default)",
              borderRadius: "8px"
            }} itemStyle={{
              fontSize: "12px",
              fontWeight: "bold"
            }} cursor={{
              fill: "var(--bg-main)"
            }} /><Qe dataKey="Jogador" fill="#FF3038" radius={[4, 4, 0, 0]} /><Qe dataKey="Squad" fill="#F59E0B" radius={[4, 4, 0, 0]} /></_Component20></Te></div></div></div><div className="card space-y-4"><div className="flex items-center justify-between"><h3 className="text-label text-[var(--text-secondary)] tracking-widest">HISTÓRICO DE QUEDAS DO JOGADOR</h3><div className="text-[10px] text-[var(--text-tertiary)] uppercase">{D.length} registros</div></div><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b border-[var(--border-subtle)] text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider"><th className="py-3 px-4 w-[120px]">Data</th><th className="py-3 px-4">Mapa</th><th className="py-3 px-4 text-right">Kills</th><th className="py-3 px-4 text-right">Mortes</th><th className="py-3 px-4 text-right">Assists</th><th className="py-3 px-4 text-right">Dano</th><th className="py-3 px-4 text-center">Colocação</th><th className="py-3 px-4 text-right">K/D</th></tr></thead><tbody className="text-[13px]">{D.map((f, N) => {
            const i = Number(f.kill) || 0;
            const m = Number(f.morte) || 0;
            const x = m === 0 ? i : i / m;
            const h = Number(f.posicao) || 0;
            return <tr className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-main)] transition-colors" key={N}><td className="py-3 px-4 font-mono text-[var(--text-secondary)] whitespace-nowrap">{f.data ? f.data.includes("-") ? f.data.split("-").reverse().join("/") : f.data : "-"}</td><td className="py-3 px-4 font-bold text-white">{f.mapa || "-"}</td><td className="py-3 px-4 text-right font-mono text-[#10B981]">{i}</td><td className="py-3 px-4 text-right font-mono text-[#EF4444]">{m}</td><td className="py-3 px-4 text-right font-mono text-[#F59E0B]">{Number(f.assistencia) || 0}</td><td className="py-3 px-4 text-right font-mono text-white/80">{Number(f.dano_causado) || 0}</td><td className="py-3 px-4 text-center">{h > 0 && <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${h <= 3 ? "bg-[#10B981]/10 text-[#10B981]" : h <= 8 ? "bg-[#6B7280]/10 text-[#6B7280]" : "bg-[#EF4444]/10 text-[#EF4444]"}`}>#{h}</span>}</td><td className="py-3 px-4 text-right font-mono"><span className={x >= 1.5 ? "text-[#10B981]" : x < 1 ? "text-[#EF4444]" : "text-[#F59E0B]"}>{x.toFixed(2)}</span></td></tr>;
          })}{D.length === 0 && <tr><td colSpan={8} className="py-12 text-center text-[var(--text-tertiary)] text-body-sm">Nenhum dado encontrado para o jogador selecionado.</td></tr>}</tbody></table></div></div></div>;
const Xr = "ctracker_tutorial_completed";
const Zr = "v1";
function eo() {
  const r = `${Xr}_${Zr}`;
  const [c, l] = s.useState(false);
  const j = s.useCallback(() => localStorage.getItem(r) === "true", [r]);
  const o = s.useCallback(() => {
    localStorage.setItem(r, "true");
    l(false);
  }, [r]);
  const g = s.useCallback(() => {
    localStorage.removeItem(r);
    l(true);
  }, [r]);
  const y = s.useCallback(() => {
    l(true);
  }, []);
  return {
    isActive: c,
    hasCompleted: j,
    markCompleted: o,
    resetTutorial: g,
    startTutorial: y
  };
}
const zs = s.createContext({
  startTour: () => {},
  resetTutorial: () => {}
});
function to() {
  return s.useContext(zs);
}
const ao = 1200;
const so = [{
  element: "[data-tour=\"sidebar-nav\"]",
  popover: {
    title: "📊 Navegação",
    description: "Aqui você acessa todas as seções: Dashboard, HeatMap, Campeonatos, Squad e Configurações.",
    side: "right",
    align: "start"
  }
}, {
  element: "[data-tour=\"dashboard-stats\"]",
  popover: {
    title: "🏆 Estatísticas Gerais",
    description: "Resumo de K/D/A, kills e partidas do campeonato selecionado. Use o filtro no topo para trocar de campeonato.",
    side: "bottom",
    align: "start"
  }
}, {
  element: "[data-tour=\"upload-screenshot\"]",
  popover: {
    title: "📸 Upload de Screenshot",
    description: "Tire print da tela de resultados do Free Fire e envie aqui. O OCR extrai os dados automaticamente — K/D/A, dano, posição e mais.",
    side: "bottom",
    align: "start"
  }
}, {
  element: "[data-tour=\"campeonatos-list\"]",
  popover: {
    title: "🗂️ Campeonatos",
    description: "Organize suas partidas por campeonato. Cada campeonato pode ter múltiplas rodadas e mapas.",
    side: "right",
    align: "start"
  }
}, {
  element: "[data-tour=\"heatmap-view\"]",
  popover: {
    title: "🗺️ HeatMap",
    description: "Visualize onde seus jogadores estão caindo em cada mapa. Identifique padrões e ajuste a estratégia.",
    side: "bottom",
    align: "center"
  }
}, {
  element: "[data-tour=\"squad-link\"]",
  popover: {
    title: "🔗 Link Público do Squad",
    description: "Compartilhe as estatísticas do seu time com um link público. Escolha quais campeonatos aparecem.",
    side: "left",
    align: "start"
  }
}, {
  element: "[data-tour=\"tutorial-button\"]",
  popover: {
    title: "✅ Tudo certo!",
    description: "Você pode rever este tutorial a qualquer momento clicando neste botão. Bom jogo! 🎮",
    side: "left",
    align: "end"
  }
}];
function _Component67({
  children: r
}) {
  const {
    hasCompleted: c,
    markCompleted: l,
    resetTutorial: j
  } = eo();
  const o = s.useRef(null);
  const g = u => {
    const w = u.filter(k => k.element ? document.querySelector(k.element) !== null : true);
    return rr({
      animate: true,
      smoothScroll: true,
      allowClose: true,
      overlayOpacity: 0.55,
      stagePadding: 8,
      stageRadius: 8,
      showProgress: true,
      progressText: "{{current}} de {{total}}",
      nextBtnText: "Próximo →",
      prevBtnText: "← Anterior",
      doneBtnText: "Concluir ✓",
      onDestroyStarted: () => {
        l();
        o.current?.destroy();
      },
      steps: w
    });
  };
  const y = (u = so) => {
    if (o.current) {
      o.current.destroy();
    }
    const w = g(u);
    o.current = w;
    w.drive();
  };
  const S = () => {
    j();
    setTimeout(() => y(), 300);
  };
  s.useEffect(() => {
    if (!["/landing", "/login", "/register", "/planos", "/reset-password"].some(w => window.location.pathname.startsWith(w)) && window.location.pathname !== "/" && !c()) {
      const w = setTimeout(() => {
        y();
      }, ao);
      return () => clearTimeout(w);
    }
  }, []);
  return <zs.Provider value={{
    startTour: y,
    resetTutorial: S
  }}>{r}</zs.Provider>;
}
function Xa({
  variant: r = "floating",
  className: c
}) {
  const {
    startTour: l
  } = to();
  const j = or();
  if (r === "floating" && (["/landing", "/login", "/register", "/planos", "/reset-password", "/rotas"].some(g => j.pathname.startsWith(g)) || j.pathname === "/")) {
    return null;
  } else if (r === "inline") {
    return <button type="button" data-tour="tutorial-button" id="tutorial-restart-button" onClick={() => l()} title="Ver Tutorial" className={c || "btn-ghost flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-lg text-xs route-planner-chip border border-[#FF3038]/40 text-[#FF3038] hover:bg-[#FF3038]/15 font-bold"}><_Component22 size={13} /><span>Tutorial</span></button>;
  } else {
    return <button data-tour="tutorial-button" id="tutorial-restart-button" onClick={() => l()} title="Ver Tutorial" className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-2 px-4 py-2.5
        bg-[#FF3038] hover:bg-[#D8232D] active:scale-95
        text-white text-sm font-medium
        rounded-full shadow-lg shadow-[#FF3038]/30
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[#FF3038]/50
      `}><_Component22 size={16} /><span>Tutorial</span></button>;
  }
}
function Is({
  content: r,
  side: c = "top",
  size: l = 15
}) {
  const [j, o] = s.useState(false);
  const g = s.useRef(null);
  s.useEffect(() => {
    const S = u => {
      if (g.current && !g.current.contains(u.target)) {
        o(false);
      }
    };
    document.addEventListener("mousedown", S);
    return () => document.removeEventListener("mousedown", S);
  }, []);
  const y = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  return <div ref={g} className="relative inline-flex items-center" onMouseEnter={() => o(true)} onMouseLeave={() => o(false)} onClick={() => o(S => !S)}><Rs size={l} className="text-[#FF3038] opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />{j && <div className={`
            absolute ${y[c]} z-[9999]
            w-64 px-3 py-2
            bg-[#1a1a2e] border border-[#FF3038]/30
            text-[#EDEDED] text-xs leading-relaxed
            rounded-lg shadow-xl
            pointer-events-none
          `}>{r}</div>}</div>;
}
const _Component29 = ({
  playerList: r,
  playerSelectedPlayer: c,
  setPlayerSelectedPlayer: l,
  playerChampOptions: j,
  playerChampFilter: o,
  setPlayerChampFilter: g,
  filterOptions: y,
  playerDateFilter: S,
  setPlayerDateFilter: u,
  playerRoundFilter: w,
  setPlayerRoundFilter: P,
  setMapFilter: k,
  playerStatsLoading: D,
  sortConfig: f,
  setSortConfig: N,
  playerTableData: i,
  maxAbates: m,
  pyramidData: x,
  donutData: h,
  quedasDonutData: R,
  lineChartData: v
}) => <div style={{
  minWidth: 0,
  overflow: "hidden"
}} className="space-y-6 animate-reveal w-full"><div className="flex flex-wrap items-center gap-3 jogadores-filtros"><Pt options={r} selected={c} onChange={l} icon={<_Component23 size={14} className="text-[var(--accent)]" />} placeholder="Todos Jogadores" pluralName="jogadores" /><Pt options={j} selected={o} onChange={g} icon={<Je size={14} className="text-[var(--accent)]" />} placeholder="Todos Eventos" /><Pt options={y.dates} selected={S} onChange={u} icon={<_Component16 size={14} className="text-[var(--accent)]" />} placeholder="Todas Datas" pluralName="datas" /><Pt options={y.rounds.map(String)} selected={w} onChange={P} icon={<_Component6 size={14} className="text-[var(--accent)]" />} placeholder="Todas Rodadas" pluralName="rodadas" /></div>{(c.length > 0 || o.length > 0 || S.length > 0 || w.length > 0) && <div className="flex items-center gap-2 mb-4 animate-fade-in group"><div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-3 py-1.5 rounded-md flex items-center gap-2"><Ge size={12} className="text-[#F59E0B]" /><span className="text-label-sm font-bold uppercase tracking-wider text-[#F59E0B]">Filtros Ativos</span><button onClick={() => {
        l([]);
        g([]);
        u([]);
        P([]);
        k([]);
      }} className="hover:bg-[#F59E0B]/20 p-1 rounded-sm transition-colors ml-1" title="Limpar todos os filtros"><Gt size={14} className="text-[#F59E0B]" /></button></div></div>}<div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl overflow-hidden relative">{D && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center"><_Component9 size={24} className="text-[var(--accent)] animate-spin" /></div>}<div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-[#09090b] border-b border-[var(--border-default)]"><tr>{[{
              l: "Player",
              k: "name"
            }, {
              l: "Abates",
              k: "abates"
            }, {
              l: "Mortes",
              k: "mortes"
            }, {
              l: "Assists",
              k: "assistencias"
            }, {
              l: "Dano",
              k: "dano",
              tip: "Dano causado por partida, extraído automaticamente do screenshot pelo OCR."
            }, {
              l: "K/D",
              k: "kd",
              tip: "Kill / Death ratio. Abates totais divididos pelo número de quedas (partidas)."
            }, {
              l: "Derrubados",
              k: "derrubados"
            }, {
              l: "Quedas",
              k: "quedas",
              tip: "Número de partidas (quedas) do jogador no filtro selecionado."
            }].map(p => <th className="px-4 py-3 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => N({
              key: p.k,
              direction: f.key === p.k && f.direction === "desc" ? "asc" : "desc"
            })} key={p.k}><span className="inline-flex items-center gap-1">{p.l} {f.key === p.k ? f.direction === "asc" ? "▲" : "▼" : ""}{p.tip && <Is content={p.tip} side="top" size={11} />}</span></th>)}</tr></thead><tbody className="divide-y divide-[var(--border-subtle)]">{i.map((p, T) => {
            const Y = c.length > 0 && !c.includes(p.name);
            return <tr className={`hover:bg-white/5 transition-colors ${Y ? "opacity-30" : "opacity-100"}`} key={T}><td className="px-4 py-3 text-caption font-bold text-white whitespace-nowrap">{p.name}</td><td className="px-4 py-3 whitespace-nowrap"><div className="flex items-center gap-3"><span className="w-6 text-right font-black numeric-mono text-[var(--text-secondary)]">{p.abates}</span><div className="w-16 h-1.5 bg-[#18181b] rounded-full overflow-hidden"><div className="h-full bg-[var(--accent)] rounded-full" style={{
                      width: `${Math.max(2, p.abates / m * 100)}%`
                    }} /></div></div></td><td className="px-4 py-3 font-medium numeric-mono text-[var(--text-secondary)]">{p.mortes}</td><td className="px-4 py-3 font-medium numeric-mono text-[var(--text-secondary)]">{p.assistencias}</td><td className="px-4 py-3 font-medium numeric-mono text-[var(--text-secondary)]">{p.dano.toLocaleString("pt-BR")}</td><td className={`px-4 py-3 font-black numeric-mono ${Number(p.kd) >= 1.5 ? "text-[#22C55E]" : Number(p.kd) >= 1 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{String(p.kd).replace(".", ",")}</td><td className="px-4 py-3 font-medium numeric-mono text-[var(--text-secondary)]">{p.derrubados}</td><td className="px-4 py-3 font-medium numeric-mono text-[var(--text-secondary)]">{p.quedas}</td></tr>;
          })}</tbody></table></div></div><div className="dashboard-grid-3-col"><div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 flex flex-col min-h-[180px]"><div className="flex items-center justify-between mb-3"><h4 className="text-label font-bold text-[var(--text-secondary)] uppercase tracking-wider">Top Dano</h4><_Component17 size={14} className="text-[var(--text-tertiary)]" /></div><div className="flex-1 w-full"><Te width="100%" height="100%"><_Component20 data={x.slice(0, 5)} layout="vertical" margin={{
            top: 0,
            right: 20,
            left: 0,
            bottom: 0
          }}><_Component12 type="number" hide={true} /><Ie dataKey="name" type="category" axisLine={false} tickLine={false} tick={{
              fontSize: 9,
              fill: "var(--text-tertiary)",
              fontWeight: "bold"
            }} width={60} /><_e cursor={{
              fill: "rgba(255,255,255,0.02)"
            }} contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "var(--border-default)",
              fontSize: "11px",
              borderRadius: "6px"
            }} /><Qe dataKey="dano" name="Dano" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={10}>{x.slice(0, 5).map((p, T) => <_Component21 opacity={c.length === 0 || c.includes(p.name) ? 1 : 0.3} key={`cell-${T}`} />)}</Qe></_Component20></Te></div></div><div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 flex flex-col min-h-[180px]"><div className="flex items-center justify-between mb-3"><h4 className="text-label font-bold text-[var(--text-secondary)] uppercase tracking-wider">Distribuição de Kills</h4><Ma size={14} className="text-[var(--text-tertiary)]" /></div><div className="flex-1 w-full"><Te width="100%" height="100%"><_Component20 data={h.map(p => ({
            name: p.name,
            abates: p.value
          })).sort((p, T) => T.abates - p.abates).slice(0, 5)} layout="vertical" margin={{
            top: 0,
            right: 20,
            left: 0,
            bottom: 0
          }}><_Component12 type="number" hide={true} /><Ie dataKey="name" type="category" axisLine={false} tickLine={false} tick={{
              fontSize: 9,
              fill: "var(--text-tertiary)",
              fontWeight: "bold"
            }} width={60} /><_e cursor={{
              fill: "rgba(255,255,255,0.02)"
            }} contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "var(--border-default)",
              fontSize: "11px",
              borderRadius: "6px"
            }} /><Qe dataKey="abates" name="Abates" fill="#22C55E" radius={[0, 4, 4, 0]} barSize={10}>{h.sort((p, T) => T.value - p.value).slice(0, 5).map((p, T) => <_Component21 opacity={c.length === 0 || c.includes(p.name) ? 1 : 0.3} key={`cell-${T}`} />)}</Qe></_Component20></Te></div></div><div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 flex flex-col min-h-[180px]"><div className="flex items-center justify-between mb-3"><h4 className="text-label font-bold text-[var(--text-secondary)] uppercase tracking-wider">Presença (Quedas)</h4><Mt size={14} className="text-[var(--text-tertiary)]" /></div><div className="flex-1 w-full"><Te width="100%" height="100%"><_Component20 data={R.map(p => ({
            name: p.name,
            quedas: p.value
          })).sort((p, T) => T.quedas - p.quedas).slice(0, 5)} layout="vertical" margin={{
            top: 0,
            right: 20,
            left: 0,
            bottom: 0
          }}><_Component12 type="number" hide={true} /><Ie dataKey="name" type="category" axisLine={false} tickLine={false} tick={{
              fontSize: 9,
              fill: "var(--text-tertiary)",
              fontWeight: "bold"
            }} width={60} /><_e cursor={{
              fill: "rgba(255,255,255,0.02)"
            }} contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "var(--border-default)",
              fontSize: "11px",
              borderRadius: "6px"
            }} /><Qe dataKey="quedas" name="Quedas" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={10}>{R.sort((p, T) => T.value - p.value).slice(0, 5).map((p, T) => <_Component21 opacity={c.length === 0 || c.includes(p.name) ? 1 : 0.3} key={`cell-${T}`} />)}</Qe></_Component20></Te></div></div></div><div style={{
    minWidth: 0,
    maxWidth: "100%"
  }} className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 relative"><div className="absolute inset-0 opacity-[0.03] bg-gradient-to-t from-[var(--accent)] to-transparent pointer-events-none rounded-xl" /><div className="flex items-center justify-between mb-6 relative z-10"><div><h4 className="text-caption font-bold text-white uppercase tracking-wider">Desempenho Geral do Elenco</h4><p className="text-label-sm text-[var(--text-tertiary)] mt-1">Comparativo de Abates vs Assistências</p></div></div><div style={{
      width: "100%",
      maxWidth: "100%",
      height: "320px"
    }} className="relative z-10"><Te width="100%" height={300}><_Component13 data={v} margin={{
          left: -10,
          bottom: 40,
          right: 20,
          top: 5
        }}><_Component11 stroke="var(--border-subtle)" vertical={false} strokeDasharray="3 3" /><_Component12 dataKey="player" axisLine={false} tickLine={false} tick={{
            fontSize: 9,
            fill: "var(--text-tertiary)",
            fontWeight: "bold"
          }} angle={-35} textAnchor="end" interval={0} /><Ie tickLine={false} axisLine={false} tick={{
            fontSize: 10,
            fill: "var(--text-tertiary)"
          }} /><_e contentStyle={{
            backgroundColor: "#09090b",
            borderColor: "var(--border-default)",
            borderRadius: "8px"
          }} itemStyle={{
            fontSize: "12px",
            fontWeight: "bold"
          }} labelStyle={{
            fontSize: "11px",
            color: "var(--text-tertiary)"
          }} formatter={(p, T) => [p, T === "kill" ? "Méd. Abates" : "Méd. Assist."]} /><Ot type="monotone" dataKey="kill" name="kill" stroke="var(--accent)" strokeWidth={2} dot={{
            r: 4,
            fill: "var(--bg-surface)",
            strokeWidth: 2
          }} activeDot={{
            r: 6,
            fill: "var(--accent)",
            strokeWidth: 0
          }} /><Ot type="monotone" dataKey="assistencia" name="assistencia" stroke="#3B82F6" strokeWidth={2} dot={{
            r: 4,
            fill: "var(--bg-surface)",
            strokeWidth: 2
          }} activeDot={{
            r: 6,
            fill: "#3B82F6",
            strokeWidth: 0
          }} /></_Component13></Te></div></div></div>;
const _Component28 = ({
  data: r,
  navigate: c,
  selectedMap: l,
  setSelectedMap: j,
  globalSquadStats: o,
  overviewExtras: g,
  pointsPerMatchData: y,
  mapPointsData: S,
  placementDistribution: u
}) => <div className="space-y-8 animate-reveal">{r ? <e.Fragment>{l && <div className="flex items-center gap-2 mb-6 animate-fade-in group pointer-events-none"><div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-[var(--accent)]/5 backdrop-blur-sm pointer-events-auto"><_Component19 size={12} className="text-[var(--accent)]" /><span className="text-label-sm font-bold uppercase tracking-widest text-[var(--accent)]">Filtrando por: {l}</span><button onClick={() => j(null)} className="hover:bg-[var(--accent)]/20 p-1 rounded-full transition-colors ml-1" title="Limpar filtro de mapa"><Gt size={14} className="text-[var(--accent)]" /></button></div></div>}<div data-tour="dashboard-stats" className="metric-strip mb-6"><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Quedas</span><span className="text-2xl font-black text-white numeric-mono">{o.quedas}</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Méd. Pontos</span><span className={`text-2xl font-black numeric-mono ${Number(r.general.mediaPontos) >= 15 ? "text-[#22C55E]" : Number(r.general.mediaPontos) >= 10 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{r.general.mediaPontos}</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Booyah %</span><span className={`text-2xl font-black numeric-mono ${Number(r.general.percentBooyah) > 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}>{r.general.percentBooyah}%</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider flex items-center gap-1">K/D Squad<Is content="Kill / Death ratio do squad. Calculado dividindo kills totais pelas quedas (partidas) da seleção atual." side="top" size={12} /></span><span className={`text-2xl font-black numeric-mono ${Number(o.kd) >= 2 ? "text-[#22C55E]" : Number(o.kd) >= 1 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{o.kd}</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Top 3 %</span><span className={`text-2xl font-black numeric-mono ${(g?.taxaTop3 || 0) >= 30 ? "text-[#22C55E]" : (g?.taxaTop3 || 0) >= 15 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{g?.taxaTop3 || 0}%</span></div></div><div className="dashboard-grid-60-40 mb-6"><div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 flex flex-col min-h-[300px]"><div className="flex items-center justify-between mb-4"><div><h4 className="text-heading text-body uppercase tracking-wide">Evolução de Pontos (Quedas)</h4><p className="text-label text-[var(--text-tertiary)] mt-1">Desempenho cronológico</p></div><Pa size={16} className="text-[var(--text-tertiary)]" /></div><div className="flex-1 w-full h-full min-h-[220px]"><Te width="100%" height="100%"><Os data={y} margin={{
              top: 5,
              right: 0,
              left: -25,
              bottom: 0
            }}><defs><linearGradient id="colorPontosArea" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FF3038" stopOpacity={0.3} /><stop offset="95%" stopColor="#FF3038" stopOpacity={0} /></linearGradient></defs><_Component11 stroke="var(--border-subtle)" vertical={false} strokeDasharray="3 3" /><_Component12 dataKey="name" tickLine={false} axisLine={false} tick={{
                fontSize: 10,
                fill: "var(--text-tertiary)"
              }} /><Ie tickLine={false} axisLine={false} tick={{
                fontSize: 10,
                fill: "var(--text-tertiary)"
              }} /><_e contentStyle={{
                backgroundColor: "#09090b",
                borderColor: "var(--border-default)",
                borderRadius: "8px"
              }} itemStyle={{
                color: "#fff",
                fontSize: "12px"
              }} labelStyle={{
                color: "var(--text-tertiary)",
                fontSize: "10px"
              }} /><Ps type="monotone" dataKey="pontos" name="Pontos" stroke="#FF3038" strokeWidth={2} fillOpacity={1} fill="url(#colorPontosArea)" /></Os></Te></div></div><div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 flex flex-col"><div className="flex items-center justify-between mb-6"><div><h4 className="text-heading text-body uppercase tracking-wide">PONTOS POR MAPA</h4><p className="text-label text-[var(--text-tertiary)] mt-1">Kills vs Colocação por território</p></div><_Component19 size={16} className="text-[var(--text-tertiary)]" /></div><div className="flex-1 min-h-[220px] w-full">{S && S.length > 0 ? <Te width="100%" height="100%"><_Component20 data={S} margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5
            }}><_Component12 dataKey="name" stroke="#EDEDED" tick={{
                fill: "#EDEDED",
                fontSize: 11,
                fontWeight: 600
              }} tickLine={false} axisLine={false} interval={0} /><Ie stroke="var(--text-tertiary)" fontSize={10} tickLine={false} axisLine={false} /><_e contentStyle={{
                backgroundColor: "#09090b",
                borderColor: "var(--border-default)",
                borderRadius: "8px"
              }} itemStyle={{
                color: "#fff",
                fontSize: "12px"
              }} labelStyle={{
                color: "var(--text-tertiary)",
                fontSize: "10px"
              }} /><Ya verticalAlign="top" height={36} wrapperStyle={{
                fontSize: "11px",
                color: "var(--text-secondary)"
              }} /><Qe dataKey="ptKills" name="Pontos Kills" fill="#FF3038" radius={[4, 4, 0, 0]} /><Qe dataKey="ptColocacao" name="Pontos Colocação" fill="#22C55E" radius={[4, 4, 0, 0]} /></_Component20></Te> : <div className="h-full flex items-center justify-center text-caption text-[var(--text-tertiary)]">Sem dados de jogadores</div>}</div></div></div>{g && <div className="small-multiples-grid"><div className="small-multiple-card"><div className="mb-2"><h5 className="text-label font-bold text-[var(--text-secondary)] uppercase tracking-wide">Booyahs por Mapa</h5></div><div className="flex-1 w-full h-full min-h-[120px]">{g.booyahsByMap && g.booyahsByMap.length > 0 ? <Te width="100%" height="100%"><_Component20 data={g.booyahsByMap} layout="vertical" margin={{
              top: 0,
              right: 20,
              left: 0,
              bottom: 0
            }}><_Component12 type="number" hide={true} /><Ie dataKey="mapa" type="category" axisLine={false} tickLine={false} tick={{
                fontSize: 9,
                fill: "var(--text-tertiary)"
              }} width={60} /><_e cursor={{
                fill: "rgba(255,255,255,0.02)"
              }} contentStyle={{
                backgroundColor: "#09090b",
                borderColor: "var(--border-default)"
              }} /><Qe dataKey="qtd" name="Booyahs" fill="#22C55E" radius={[0, 4, 4, 0]} barSize={12} /></_Component20></Te> : <div className="h-full flex items-center justify-center text-label-sm text-[var(--text-tertiary)]">Nenhum Booyah</div>}</div></div><div className="small-multiple-card"><div className="mb-2"><h5 className="text-label font-bold text-[var(--text-secondary)] uppercase tracking-wide">Colocações</h5></div><div className="flex-1 w-full h-full min-h-[120px]"><Te width="100%" height="100%"><_Component20 data={u} margin={{
              top: 10,
              right: 5,
              left: 5,
              bottom: 5
            }}><_Component12 dataKey="posicao" axisLine={false} tickLine={false} tick={{
                fontSize: 8,
                fill: "var(--text-tertiary)"
              }} /><Ie hide={true} /><_e cursor={{
                fill: "rgba(255,255,255,0.02)"
              }} contentStyle={{
                backgroundColor: "#09090b",
                borderColor: "var(--border-default)"
              }} /><Qe dataKey="quantidade" name="Vezes" fill="#F59E0B" radius={[2, 2, 0, 0]} /></_Component20></Te></div></div><div className="small-multiple-card flex gap-3 bg-transparent border-none p-0 relative overflow-visible"><div className="flex-1 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl p-3 flex flex-col justify-between"><h5 className="text-micro font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Melhor Mapa</h5>{g.melhorMapa ? <div><p className="text-body font-black text-white uppercase truncate" title={g.melhorMapa.mapa}>{g.melhorMapa.mapa}</p><p className="text-label font-bold text-green-400">{g.melhorMapa.media} pts</p></div> : <div className="text-label-sm text-[var(--text-tertiary)] mt-auto">--</div>}</div><div className="flex-1 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl p-3 flex flex-col justify-between"><h5 className="text-micro font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Pior Mapa</h5>{g.piorMapa ? <div><p className="text-body font-black text-white uppercase truncate" title={g.piorMapa.mapa}>{g.piorMapa.mapa}</p><p className="text-label font-bold text-red-400">{g.piorMapa.media} pts</p></div> : <div className="text-label-sm text-[var(--text-tertiary)] mt-auto">--</div>}</div></div><div className="small-multiple-card border-none bg-transparent relative flex flex-col justify-between col-span-full md:col-span-1" style={{
        minHeight: "160px",
        width: "100%",
        overflow: "visible"
      }}><div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-[#FF3038] to-transparent pointer-events-none rounded-xl" /><div className="mb-2 relative z-10 px-4 pt-4 flex justify-between items-start"><div><h5 className="text-label font-bold text-[var(--accent)] uppercase tracking-wide">Tendência de Pontos</h5><p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Últimas 10 quedas do squad</p></div>{(() => {
            const w = y.slice(-10);
            if (w.length === 0) {
              return null;
            }
            const P = w[0]?.pontos ?? 0;
            const k = w[w.length - 1]?.pontos ?? 0;
            const D = k > P ? "↑ Subindo" : k < P ? "↓ Caindo" : "→ Estável";
            const f = k > P ? "var(--color-success)" : k < P ? "var(--color-danger)" : "var(--color-warning)";
            return <span className="text-[10px] font-bold px-2 py-0.5 rounded border" style={{
              color: f,
              borderColor: `${f}40`,
              backgroundColor: `${f}10`
            }}>{D}</span>;
          })()}</div><div className="flex-1 w-full relative z-10 px-2 pb-2 mt-4">{y.length > 0 ? <Te width="100%" height={100}><_Component13 data={y.slice(-10)}><Ot type="monotone" dataKey="pontos" stroke="var(--accent)" strokeWidth={2} dot={false} /></_Component13></Te> : <div className="h-full flex items-center justify-center text-label-sm text-[var(--text-tertiary)]">Sem dados</div>}</div></div></div>}</e.Fragment> : <div className="flex flex-col items-center justify-center py-20 text-center card border-dashed"><div className="p-6 rounded-2xl mb-6 bg-[var(--accent-muted)]"><Es size={40} className="text-[var(--accent)]" /></div><h3 className="text-heading text-xl mb-2">Nenhum dado encontrado</h3><p className="max-w-xs text-label px-4">Nenhuma partida registrada ainda. Insira seus dados para começar a análise do seu squad.</p><button onClick={() => c("/input")} className="mt-8 btn-primary flex items-center gap-2"><Ea size={16} /> Inserir Dados</button></div>}</div>;
const $a = [{
  nome: "A124",
  img: "/PERSONAGENS/A124.png",
  ativo: true
}, {
  nome: "ORION",
  img: "/PERSONAGENS/ORION.png",
  ativo: true
}, {
  nome: "SKYLER",
  img: "/PERSONAGENS/SKYLER.png",
  ativo: true
}, {
  nome: "STEFFIE",
  img: "/PERSONAGENS/STEFFIE.png",
  ativo: true
}, {
  nome: "IRIS",
  img: "/PERSONAGENS/IRIS.png",
  ativo: true
}, {
  nome: "CR7",
  img: "/PERSONAGENS/CR7.png",
  ativo: true
}, {
  nome: "TATSUYA",
  img: "/PERSONAGENS/TATSUYA.png",
  ativo: true
}, {
  nome: "HOMERO",
  img: "/PERSONAGENS/HOMERO.png",
  ativo: true
}, {
  nome: "DIMITRI",
  img: "/PERSONAGENS/DIMITRI.png",
  ativo: true
}, {
  nome: "EVELYN",
  img: "/PERSONAGENS/EVELYN.png",
  ativo: true
}, {
  nome: "KAMIR",
  img: "/PERSONAGENS/KAMIR.png",
  ativo: true
}, {
  nome: "SANTINO",
  img: "/PERSONAGENS/SANTINO.png",
  ativo: true
}, {
  nome: "KODA",
  img: "/PERSONAGENS/KODA.png",
  ativo: true
}, {
  nome: "RYDEN",
  img: "/PERSONAGENS/RYDEN.png",
  ativo: true
}, {
  nome: "OSCAR",
  img: "/PERSONAGENS/OSCAR.png",
  ativo: true
}, {
  nome: "KASSIE",
  img: "/PERSONAGENS/KASSIE.png",
  ativo: true
}, {
  nome: "KENTA",
  img: "/PERSONAGENS/KENTA.png",
  ativo: true
}, {
  nome: "EXTREMA",
  img: "/PERSONAGENS/EXTREMA.png",
  ativo: true
}, {
  nome: "ALOK",
  img: "/PERSONAGENS/ALOK.png",
  ativo: true
}, {
  nome: "IGNIS",
  img: "/PERSONAGENS/IGNIS.png",
  ativo: true
}, {
  nome: "WUKONG",
  img: "/PERSONAGENS/WUKONG.png",
  ativo: true
}, {
  nome: "MARO",
  img: "/PERSONAGENS/MARO.png"
}, {
  nome: "ALVARO",
  img: "/PERSONAGENS/ALVARO.png"
}, {
  nome: "MIGUEL",
  img: "/PERSONAGENS/MIGUEL.png"
}, {
  nome: "RAFAEL",
  img: "/PERSONAGENS/RAFAEL.png"
}, {
  nome: "OTHO",
  img: "/PERSONAGENS/OTHO.png"
}, {
  nome: "THIVA",
  img: "/PERSONAGENS/THIVA.png"
}, {
  nome: "NAIRI",
  img: "/PERSONAGENS/NAIRI.png"
}, {
  nome: "HAYATO",
  img: "/PERSONAGENS/HAYATO.png"
}, {
  nome: "SONIA",
  img: "/PERSONAGENS/SONIA.png"
}, {
  nome: "ANDREW",
  img: "/PERSONAGENS/ANDREW.png"
}, {
  nome: "WOLFHRAH",
  img: "/PERSONAGENS/WOLFHAH.png"
}, {
  nome: "ANTONIO",
  img: "/PERSONAGENS/ANTONIO.png"
}, {
  nome: "LUNA",
  img: "/PERSONAGENS/LUNA.png"
}, {
  nome: "MOCO",
  img: "/PERSONAGENS/MOCO.png"
}, {
  nome: "JUSTIN",
  img: "/PERSONAGENS/JUSTIN.png"
}, {
  nome: "KAPELLA",
  img: "/PERSONAGENS/KAPELA.png"
}, {
  nome: "SHANI",
  img: "/PERSONAGENS/SHANI.png"
}, {
  nome: "SHIRO",
  img: "/PERSONAGENS/SHIRO.png"
}, {
  nome: "KLA",
  img: "/PERSONAGENS/KLA.png"
}, {
  nome: "BIOCHIP",
  img: "/PERSONAGENS/BIOCHIP.png"
}, {
  nome: "LUQUETA",
  img: "/PERSONAGENS/LUQUETA.png"
}, {
  nome: "SUZY",
  img: "/PERSONAGENS/SUZY.png"
}, {
  nome: "MISHA",
  img: "/PERSONAGENS/MISHA.png"
}, {
  nome: "CAROLINE",
  img: "/PERSONAGENS/CAROLINE.png"
}, {
  nome: "KELLY",
  img: "/PERSONAGENS/KELLY.png"
}, {
  nome: "OLIVIA",
  img: "/PERSONAGENS/OLIVIA.png"
}, {
  nome: "JOSEPH",
  img: "/PERSONAGENS/JOSEPH.png"
}, {
  nome: "KAIROS",
  img: "/PERSONAGENS/KAIROS.png"
}, {
  nome: "JOTA",
  img: "/PERSONAGENS/JOTA.png"
}, {
  nome: "LEON",
  img: "/PERSONAGENS/LEON.png"
}, {
  nome: "NIKITA",
  img: "/PERSONAGENS/NIKITA.png"
}, {
  nome: "FORD",
  img: "/PERSONAGENS/FORD.png"
}, {
  nome: "NOTORA",
  img: "/PERSONAGENS/NOTORA.png"
}, {
  nome: "MAXIM",
  img: "/PERSONAGENS/MAXIM.png"
}, {
  nome: "LILA",
  img: "/PERSONAGENS/LILA.png"
}, {
  nome: "PALOMA",
  img: "/PERSONAGENS/PALOMA.png"
}, {
  nome: "LAURA",
  img: "/PERSONAGENS/LAURA.png"
}, {
  nome: "DIANA",
  img: "/PERSONAGENS/DIANA.png"
}, {
  nome: "DBOAS",
  img: "/PERSONAGENS/DBOAS.png"
}, {
  nome: "RIN",
  img: "/PERSONAGENS/RIN.png"
}, {
  nome: "NERO",
  img: "/PERSONAGENS/NERO.png",
  ativo: true
}, {
  nome: "MORSE",
  img: "/PERSONAGENS/morse.png",
  ativo: true
}, {
  nome: "RAY",
  img: "/PERSONAGENS/RAY.png"
}];
const fs = [{
  nome: "BRABUINO",
  img: "/MASCOSTE/BRABUINO.png"
}, {
  nome: "DRAKINHO",
  img: "/MASCOSTE/DRAKINHO.png"
}, {
  nome: "AGUIA",
  img: "/MASCOSTE/AGUIA.png"
}, {
  nome: "MANDRAKO",
  img: "/MASCOSTE/MANDRAKO.png"
}, {
  nome: "CASCUDINHO",
  img: "/MASCOSTE/CASCUDINHO.png"
}, {
  nome: "LIGEIRINHO",
  img: "/MASCOSTE/LIGEIRINHO.png"
}, {
  nome: "ROBO",
  img: "/MASCOSTE/robo.png"
}, {
  nome: "LONTRETA",
  img: "/MASCOSTE/lontreta.png"
}, {
  nome: "SHIBA",
  img: "/MASCOSTE/SHIBA.png"
}, {
  nome: "MANDACARU",
  img: "/MASCOSTE/MANDAKARU.png"
}, {
  nome: "LUPINO",
  img: "/MASCOSTE/LUPINO.png"
}, {
  nome: "ARITA",
  img: "/MASCOSTE/ARITA-1.png"
}, {
  nome: "BARAO TURBO",
  img: "/MASCOSTE/TUBARA-O.png"
}, {
  nome: "SALAMANDRA",
  img: "/MASCOSTE/SALAMANDRA.png"
}, {
  nome: "IETI",
  img: "/MASCOSTE/IETI.png"
}, {
  nome: "COELHO",
  img: "/MASCOSTE/COELHO.png"
}, {
  nome: "TIGRE",
  img: "/MASCOSTE/TIGRINHO.png"
}, {
  nome: "PATOPINHO",
  img: "/MASCOSTE/PATOPINHO.png"
}, {
  nome: "ET",
  img: "/MASCOSTE/ET.png"
}, {
  nome: "PIGUIM",
  img: "/MASCOSTE/PINGUIM.png"
}, {
  nome: "ROBO V2",
  img: "/MASCOSTE/ROBO (1).png"
}, {
  nome: "RAPOSA",
  img: "/MASCOSTE/RAPOSA.png"
}, {
  nome: "PANDA",
  img: "/MASCOSTE/PANDA.png"
}, {
  nome: "CACHUROBO",
  img: "/MASCOSTE/CACHORRO-MECANICO.png"
}, {
  nome: "GATINHO",
  img: "/MASCOSTE/GATINHO.png"
}, {
  nome: "PORING",
  img: "/MASCOSTE/PORING.png"
}, {
  nome: "PANTERA",
  img: "/MASCOSTE/PANTERA.png"
}, {
  nome: "AGENTE URSO",
  img: "/MASCOSTE/agente-ursos.png"
}];
const gs = [{
  nome: "SUPER MOCHILA DE PERNA",
  img: "/CARREGAMENTO/SUPER-MOCHILA-DE-PERNA (1).png"
}, {
  nome: "LOJA TATICA",
  img: "/CARREGAMENTO/LOJA-TATICA.png"
}, {
  nome: "BONUS DE EQUIPE",
  img: "/CARREGAMENTO/BE.png"
}, {
  nome: "MARTELO DE REFORCO",
  img: "/CARREGAMENTO/MARTELO.png"
}];
const _Component30 = ({
  selectionModal: r,
  setSelectionModal: c,
  modalSearch: l,
  setModalSearch: j,
  updateJogadorComposicao: o,
  composicaoSelecionada: g,
  setComposicaoSelecionada: y,
  composicoesSalvas: S,
  handleLoadComposicao: u,
  setComposicaoNome: w,
  setJogadoresComposicao: P,
  defaultComposicao: k,
  jogadoresComposicao: D,
  composicaoNome: f,
  handleSaveComposicao: N,
  handleDeleteComposicao: i
}) => <div className="composition-page space-y-6 animate-reveal">{r && (() => {
    const m = r.type === "ativa" || r.type === "passiva";
    const x = r.type === "pet";
    let h = m ? $a : x ? fs : gs;
    if (r.type === "ativa") {
      h = h.filter(T => T.ativo);
    } else if (r.type === "passiva") {
      h = h.filter(T => !T.ativo);
    }
    const R = m ? "Selecione o Personagem" : x ? "Selecione o Pet" : "Selecione o Carregamento";
    const v = h.filter(T => T.nome.toUpperCase().includes(l.toUpperCase()));
    const p = () => {
      c(null);
      j("");
    };
    return ir.createPortal(<div className="composition-picker-backdrop fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/85 backdrop-blur-sm" onClick={p}><div className="composition-picker-dialog bg-[var(--bg-card)] border-t border-l border-r md:border border-[var(--border-default)] rounded-t-2xl md:rounded-2xl rounded-b-none md:rounded-b-2xl w-full max-w-2xl h-[85vh] md:h-auto md:max-h-[80vh] flex flex-col shadow-2xl" onClick={T => T.stopPropagation()}><div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1 md:hidden shrink-0" /><div className="flex items-center justify-between px-5 py-3 md:py-4 border-b border-[var(--border-subtle)] shrink-0"><span className="text-[13px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">{R}</span><button onClick={p} className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 md:bg-transparent text-[var(--text-tertiary)] hover:text-white transition-colors"><Ye size={18} /></button></div><div className="px-5 py-3 border-b border-[var(--border-subtle)] shrink-0"><input type="text" autoFocus={true} value={l} onChange={T => j(T.target.value)} placeholder="Buscar..." className="input-base w-full text-[13px] bg-[#0F0F0F]" /></div><div className="composition-picker-grid overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 content-start flex-1">{v.map(T => m ? <button className="composition-picker-character flex flex-col items-center p-0 rounded-lg bg-[#0F0F0F] border border-white/5 overflow-hidden hover:border-[var(--accent)] transition-all cursor-pointer group shrink-0 min-h-[130px] md:min-h-[110px]" onClick={() => {
            if (r.type === "passiva" && r.passivaIndex !== undefined) {
              o(r.playerIndex, "passivas", T.nome, r.passivaIndex);
            } else {
              o(r.playerIndex, r.type, T.nome);
            }
            p();
          }} key={T.nome}><div className="w-full shrink-0 flex items-center justify-center p-2 md:p-0 overflow-hidden bg-[#1A1A1A] h-[110px] md:h-[120px]"><img src={T.img} alt={T.nome} className="block mx-auto w-full h-full object-cover object-[center_10%] md:object-top scale-100 md:scale-[1.3] md:origin-top transition-transform" /></div><div className="flex-1 w-full flex items-center justify-center p-1.5 bg-[#0F0F0F]"><span className="text-[9px] text-[#999] text-center leading-[1.2] uppercase tracking-wide">{T.nome}</span></div></button> : x ? <button onClick={() => {
            if (r.type === "passiva" && r.passivaIndex !== undefined) {
              o(r.playerIndex, "passivas", T.nome, r.passivaIndex);
            } else {
              o(r.playerIndex, r.type, T.nome);
            }
            p();
          }} style={{
            background: "#1A1A1A",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "8px",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            width: "100%"
          }} key={T.nome}><img src={T.img} alt={T.nome} style={{
              width: "64px",
              height: "64px",
              objectFit: "contain"
            }} /><span style={{
              fontSize: "9px",
              color: "#888",
              textAlign: "center"
            }}>{T.nome}</span></button> : <button className="flex flex-col items-center p-0 rounded-lg bg-[#0F0F0F] border border-white/5 overflow-hidden hover:border-[var(--accent)] transition-all cursor-pointer group shrink-0 min-h-[130px] md:min-h-[110px]" onClick={() => {
            if (r.type === "passiva" && r.passivaIndex !== undefined) {
              o(r.playerIndex, "passivas", T.nome, r.passivaIndex);
            } else {
              o(r.playerIndex, r.type, T.nome);
            }
            p();
          }} key={T.nome}><div className="w-full shrink-0 flex items-center justify-center p-2 md:p-0 bg-[#1A1A1A] md:bg-transparent flex-1"><img src={T.img} alt={T.nome} className="block mx-auto w-[80%] h-auto object-contain group-hover:scale-105 transition-transform" /></div><div className="flex-1 w-full flex items-center justify-center p-1.5 bg-[#0F0F0F]"><span className="text-[9px] text-[#999] text-center leading-[1.2] uppercase tracking-wide">{T.nome}</span></div></button>)}{v.length === 0 && <div className="col-span-full text-center text-[var(--text-tertiary)] text-[12px] py-8">Nenhum resultado</div>}</div></div></div>, document.body);
  })()}<div className="composition-intro"><div><h1>Composição</h1><p>Escolha os personagens e organize as funções do squad.</p></div><div className="composition-actions"><select aria-label="Carregar composição salva" className="input-base" value={g} onChange={m => {
        const x = S.find(h => h.id === m.target.value);
        if (x) {
          u(x);
        }
      }}><option value="">Carregar composição...</option>{S.map(m => <option value={m.id} key={m.id}>{m.nome}</option>)}</select><button type="button" className="btn-ghost composition-new-button" onClick={() => {
        y("");
        w("");
        P(k);
      }}><_Component9 size={15} /> Nova composição</button></div></div><div className="composition-banner"><h2>QUATRO JOGADORES.<br /><span>UMA ESTRATÉGIA.</span></h2><p>Elenco e habilidades reunidos para preparar o squad.</p></div><div className="composition-roster">{D.map((m, x) => {
      const h = $a.find(p => p.nome === m.ativa);
      const R = fs.find(p => p.nome === m.pet);
      const v = gs.find(p => p.nome === m.carregamento);
      return <section className="composition-player-card" aria-label={`Jogador ${x + 1}`} key={x}><button type="button" className="composition-character-stage" aria-label={`Selecionar personagem ativo do jogador ${x + 1}`} onClick={() => {
          c({
            type: "ativa",
            playerIndex: x
          });
          j("");
        }}><span className="composition-role-badge">{m.funcao || `JOGADOR ${x + 1}`}</span>{h ? <img src={h.img} alt={h.nome} className="composition-hero-character" /> : <span className="composition-character-placeholder"><_Component18 size={44} /><strong>Escolher personagem</strong></span>}<span className="composition-stage-action">{h ? "Trocar" : "Escolher"} <_Component24 size={14} /></span></button><div className="composition-player-details"><label><span>Nome do jogador</span><input type="text" aria-label={`Nome do jogador ${x + 1}`} value={m.nome} onChange={p => o(x, "nome", p.target.value)} placeholder={`JOGADOR ${x + 1}`} /></label><label><span>Função no squad</span><input type="text" aria-label={`Função do jogador ${x + 1}`} value={m.funcao} onChange={p => o(x, "funcao", p.target.value)} placeholder="Ex.: Rush, Suporte" /></label><div className="composition-active-label"><span>Ativa</span><strong>{h?.nome || "Não selecionada"}</strong></div><div className="composition-equipment"><button type="button" onClick={() => {
              c({
                type: "pet",
                playerIndex: x
              });
              j("");
            }} aria-label={`Selecionar pet do jogador ${x + 1}`}>{R ? <img src={R.img} alt="" /> : <_Component17 size={19} />}<span><small>Pet</small><strong>{R?.nome || "Selecionar"}</strong></span></button><button type="button" onClick={() => {
              c({
                type: "carregamento",
                playerIndex: x
              });
              j("");
            }} aria-label={`Selecionar carregamento do jogador ${x + 1}`}>{v ? <img src={v.img} alt="" /> : <_Component25 size={19} />}<span><small>Carregamento</small><strong>{v?.nome || "Selecionar"}</strong></span></button></div><div className="composition-passives"><span>Habilidades passivas</span><div>{[0, 1, 2].map(p => {
                const T = m.passivas[p] || "";
                const Y = $a.find(X => X.nome === T);
                return <button type="button" aria-label={`Selecionar passiva ${p + 1} do jogador ${x + 1}`} onClick={() => {
                  c({
                    type: "passiva",
                    playerIndex: x,
                    passivaIndex: p
                  });
                  j("");
                }} key={p}>{Y ? <img src={Y.img} alt="" /> : <strong>P{p + 1}</strong>}<small>{Y?.nome || "Selecionar"}</small></button>;
              })}</div></div></div></section>;
    })}</div><div className="composition-save-grid"><Ta className="flex-1 flex flex-col gap-4"><div><h4 className="text-[13px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Salvar Estratégia</h4><p className="text-[11px] text-[var(--text-tertiary)]">Dê um nome para identificar a composição.</p></div><div className="flex gap-3"><input type="text" value={f} onChange={m => w(m.target.value)} placeholder="Nome (Ex: Rush Agressivo)" className="input-base flex-1 text-[13px]" /><button className="btn-primary flex items-center gap-2 whitespace-nowrap" onClick={N}><Ra size={15} /> {g ? "Atualizar" : "Salvar"}</button></div></Ta><Ta className="flex-[2] overflow-hidden flex flex-col"><h4 className="text-[13px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4">Composições Salvas</h4>{S.length === 0 ? <div className="flex-1 flex items-center justify-center text-[var(--text-tertiary)] text-[12px] uppercase py-6">Nenhuma composição salva</div> : <div className="overflow-x-auto"><table className="w-full text-left text-[13px]"><thead><tr className="border-b border-[var(--border-subtle)] text-[var(--text-tertiary)] uppercase text-[10px]"><th className="pb-2 font-medium">Nome</th><th className="pb-2 font-medium">Data</th><th className="pb-2 font-medium text-right">Ações</th></tr></thead><tbody>{S.map(m => <tr className="border-b border-[var(--border-subtle)]/50 hover:bg-white/[0.02] transition-colors" key={m.id}><td className="py-3 font-semibold text-[var(--text-secondary)]">{m.nome}</td><td className="py-3 text-[var(--text-tertiary)]">{new Date(m.created_at).toLocaleDateString("pt-BR")}</td><td className="py-3 flex justify-end gap-2"><button onClick={() => u(m)} className="btn-ghost px-2 py-1 text-[11px] h-auto flex items-center gap-1"><Wa size={12} /> Carregar</button><button onClick={() => i(m.id)} className="btn-ghost px-2 py-1 text-[11px] h-auto text-[var(--accent-red)] hover:bg-[var(--accent-red)]/10"><_Component15 size={12} /></button></td></tr>)}</tbody></table></div>}</Ta></div></div>;
const _Component63 = () => {
  const r = Et();
  const [c, l] = s.useState("");
  const [j, o] = s.useState(null);
  const [g, y] = s.useState(false);
  const [S, u] = s.useState([]);
  const [w, P] = s.useState({});
  const [k, D] = s.useState([]);
  const [f, N] = s.useState([]);
  const [i, m] = s.useState([]);
  const [x, h] = s.useState(null);
  const [R, v] = s.useState(false);
  const [p, T] = s.useState(true);
  const [Y, X] = s.useState(null);
  const [_] = rs();
  const [q, V] = s.useState(_.get("tab") || "overview");
  const [H, je] = s.useState({
    date: [],
    championship: [],
    round: []
  });
  const [Ne, De] = s.useState([]);
  s.useEffect(() => {
    const d = _.get("tab");
    if (d && d !== q) {
      V(d);
    } else if (!d) {
      V("overview");
    }
  }, [_, q]);
  const [be, ue] = s.useState("all");
  const [ae, M] = s.useState("");
  const [A, C] = s.useState([]);
  const [z, te] = s.useState([]);
  const [pe, Ae] = s.useState([]);
  const [Oe, G] = s.useState([]);
  const [ce, Be] = s.useState([]);
  const [ft, gt] = s.useState(false);
  const [Wt, oa] = s.useState([]);
  const [ot, W] = s.useState([]);
  const [Z, ee] = s.useState([]);
  const [Fe, Xe] = s.useState(null);
  const [Pe, he] = s.useState([]);
  const [fe, qe] = s.useState("");
  const [Dt, Me] = s.useState("");
  const [Ht, nt] = s.useState(false);
  const Vt = s.useRef(null);
  const ct = [{
    nome: "",
    funcao: "",
    ativa: "",
    pet: "",
    carregamento: "",
    passivas: ["", "", ""]
  }, {
    nome: "",
    funcao: "",
    ativa: "",
    pet: "",
    carregamento: "",
    passivas: ["", "", ""]
  }, {
    nome: "",
    funcao: "",
    ativa: "",
    pet: "",
    carregamento: "",
    passivas: ["", "", ""]
  }, {
    nome: "",
    funcao: "",
    ativa: "",
    pet: "",
    carregamento: "",
    passivas: ["", "", ""]
  }];
  const [ja, vt] = s.useState([]);
  const [jt, ye] = s.useState("");
  const [yt, It] = s.useState(ct);
  const [Qt, na] = s.useState("");
  const [Ia, _a] = s.useState(null);
  const [Yt, Jt] = s.useState("");
  s.useEffect(() => {
    C(H.date);
    te(H.championship);
    Ae(H.round);
    W(H.championship);
    ee(H.date);
  }, [H.date, H.championship, H.round, q]);
  const [Bt, it] = s.useState(null);
  const [Lt, Nt] = s.useState(false);
  const [Le, ia] = s.useState(null);
  const [wt, ya] = s.useState(null);
  const [Na, wa] = s.useState(false);
  const {
    user: se
  } = We();
  const Ee = (d, b) => {
    it({
      message: d,
      type: b
    });
    setTimeout(() => it(null), 4000);
  };
  const [oe, Ze] = s.useState(null);
  const [qt, Xt] = s.useState([]);
  const Sa = async d => {
    if (se) {
      try {
        const {
          data: b,
          error: F
        } = await K.from("performance_jogadores").select("id, player").eq("partida_id", d).eq("user_id", se.id);
        if (F) {
          throw F;
        }
        Xt(b || []);
      } catch (b) {
        console.error("Erro ao buscar jogadores da partida:", b);
      }
    }
  };
  s.useEffect(() => {
    if (oe) {
      Sa(oe.id);
    } else {
      Xt([]);
    }
  }, [oe, se]);
  const la = async () => {
    if (se) {
      T(true);
      X(null);
      try {
        const [d, b] = await Promise.all([K.from("partidas_geral").select("*").eq("user_id", se.id).order("data", {
          ascending: false
        }).order("created_at", {
          ascending: false
        }), K.from("performance_jogadores").select("*").eq("user_id", se.id).order("data", {
          ascending: false
        }).order("created_at", {
          ascending: false
        })]);
        if (d.error) {
          throw d.error;
        }
        if (b.error) {
          throw b.error;
        }
        const F = (d.data || []).map(I => ({
          Data: I.data,
          Campeonato: I.campeonato,
          Rodada: I.rodada,
          Mapa: et(I.mapa),
          Equipe: I.equipe,
          Colocacao: I.colocacao,
          Kill: I.kill,
          "Pontos/Posicao": I.pontos_posicao,
          Pontos_Total: I.pontos_total,
          Booyah: I.booyah ? "SIM" : "NAO",
          "Quebra de Call": I.quebra_de_call ? "SIM" : "NAO",
          "Resultado quebra": I.resultado_quebra,
          id: I.id
        }));
        D(F);
        const O = (b.data || []).map(I => ({
          Data: I.data,
          Campeonato: I.campeonato,
          Rodada: I.rodada,
          Equipe: I.equipe,
          Modo: I.modo,
          Mapa: et(I.mapa),
          Posicao: I.posicao,
          Player: I.player,
          Kill: I.kill,
          Morte: I.morte,
          Assistencia: I.assistencia,
          Queda: I.queda,
          "Dano causado": I.dano_causado,
          Derrubados: I.derrubados,
          Ressurgimento: I.ressurgimento,
          Quedas: I.quedas,
          KD: I.kd,
          MD: I.md,
          Revividos: I.revividos,
          partida_id: I.partida_id
        }));
        N(O);
      } catch {
        X("Não foi possível carregar os dados. Verifique sua conexão.");
        Ee("Erro de conexão com o banco.", "error");
      } finally {
        T(false);
      }
    }
  };
  const n = async () => {
    if (!!se && !!oe) {
      v(true);
      try {
        const {
          error: d
        } = await K.from("partidas_geral").update({
          campeonato: oe.Campeonato,
          rodada: oe.Rodada,
          mapa: oe.Mapa,
          colocacao: oe.Colocacao,
          kill: oe.Kill,
          pontos_total: oe.Pontos_Total,
          booyah: oe.Booyah === "SIM",
          pontos_posicao: Math.max(0, oe.Pontos_Total - oe.Kill)
        }).eq("id", oe.id).eq("user_id", se.id);
        if (d) {
          throw d;
        }
        const {
          error: b
        } = await K.from("performance_jogadores").update({
          campeonato: oe.Campeonato,
          rodada: String(oe.Rodada),
          mapa: oe.Mapa,
          posicao: oe.Colocacao
        }).eq("partida_id", oe.id).eq("user_id", se.id);
        if (b) {
          throw b;
        }
        for (const F of qt) {
          const {
            error: O
          } = await K.from("performance_jogadores").update({
            player: F.player.toUpperCase().trim()
          }).eq("id", F.id).eq("user_id", se.id);
          if (O) {
            throw O;
          }
        }
        await la();
        Ee("Partida atualizada com sucesso! ✏️", "success");
        Ze(null);
      } catch (d) {
        console.error("Erro ao editar:", d);
        Ee("Erro ao salvar as alterações.", "error");
      } finally {
        v(false);
      }
    }
  };
  const t = s.useMemo(() => {
    const d = new Set();
    const b = new Set();
    k.forEach(O => {
      if (O.Data) {
        d.add(String(O.Data).trim());
      }
      if (O.Campeonato) {
        b.add(String(O.Campeonato).toUpperCase().trim());
      }
    });
    const F = new Set();
    k.forEach(O => {
      const I = H.championship.length === 0 || H.championship.map(we => we.toUpperCase().trim()).includes(String(O.Campeonato).toUpperCase().trim());
      const ne = H.date.length === 0 || H.date.map(we => we.trim()).includes(String(O.Data).trim());
      if (I && ne && O.Rodada) {
        F.add(String(O.Rodada).toUpperCase().trim());
      }
    });
    return {
      dates: Array.from(d).sort(),
      championships: Array.from(b).sort(),
      rounds: Array.from(F).sort((O, I) => {
        const ne = we => {
          const de = ma.indexOf(we.trim().toUpperCase());
          if (de !== -1) {
            return de + 1000;
          }
          const ie = Number(we);
          if (isNaN(ie)) {
            return 9999;
          } else {
            return ie;
          }
        };
        return ne(O) - ne(I);
      })
    };
  }, [k, H.championship, H.date]);
  const B = s.useMemo(() => {
    const d = new Set();
    f.forEach(F => {
      const O = String(F.Campeonato || "").trim().toUpperCase();
      if (H.championship.length === 0 || H.championship.includes(O)) {
        const ne = et(F.Mapa);
        if (ne) {
          d.add(ne);
        }
      }
    });
    return Array.from(d).sort();
  }, [f, H.championship]);
  s.useEffect(() => {
    De(d => d.filter(b => B.includes(b)));
  }, [B]);
  s.useEffect(() => {
    if (!se) {
      return;
    }
    const d = async () => {
      const {
        data: O
      } = await K.from("perfis").select("nome, share_token").eq("id", se.id).single();
      if (O) {
        l(O.nome || se?.email || "");
        o(O.share_token);
      }
    };
    const b = async () => {
      const {
        data: O
      } = await K.from("subscriptions").select("*").eq("user_id", se.id).eq("status", "ativo").gt("data_fim", new Date().toISOString()).maybeSingle();
      wa(!!O);
    };
    const F = async () => {
      const {
        data: O
      } = await K.from("composicoes").select("*").eq("user_id", se.id).order("created_at", {
        ascending: false
      });
      if (O) {
        vt(O);
      }
    };
    d();
    la();
    b();
    F();
  }, [se]);
  const E = s.useMemo(() => {
    const d = (() => {
      if (be === "7d") {
        const b = new Date();
        b.setDate(b.getDate() - 6);
        b.setHours(0, 0, 0, 0);
        return b;
      }
      if (be === "30d") {
        const b = new Date();
        b.setFullYear(b.getFullYear(), b.getMonth(), 1);
        b.setHours(0, 0, 0, 0);
        return b;
      }
      return null;
    })();
    return k.filter(b => {
      const F = H.championship.length === 0 || H.championship.map(re => re.toUpperCase().trim()).includes(String(b.Campeonato).toUpperCase().trim());
      const O = !wt || et(b.Mapa) === et(wt);
      const I = H.round.length === 0 || H.round.map(re => re.toUpperCase().trim()).includes(String(b.Rodada).toUpperCase().trim());
      const ne = Ne.length === 0 || Ne.includes(et(b.Mapa));
      if (ae) {
        const re = String(b.Data || "");
        const Ve = ae.split("-").reverse().join("/");
        return (re === ae || re === Ve) && F && O && I && ne;
      }
      if (H.date.length !== 0 && !H.date.map(re => re.trim()).includes(String(b.Data).trim()) || !F || !O || !I || !ne) {
        return false;
      }
      if (!d) {
        return true;
      }
      const de = String(b.Data || "");
      const ie = de.split("/");
      const J = ie.length === 3 ? new Date(`${ie[2]}-${ie[1]}-${ie[0]}`) : new Date(de);
      return !isNaN(J.getTime()) && J >= d;
    });
  }, [k, H.date, H.championship, H.round, be, ae, wt, Ne]);
  const a = s.useMemo(() => {
    const d = (() => {
      if (be === "7d") {
        const b = new Date();
        b.setDate(b.getDate() - 6);
        b.setHours(0, 0, 0, 0);
        return b;
      }
      if (be === "30d") {
        const b = new Date();
        b.setFullYear(b.getFullYear(), b.getMonth(), 1);
        b.setHours(0, 0, 0, 0);
        return b;
      }
      return null;
    })();
    return f.filter(b => {
      const F = String(b.Campeonato || "").trim().toUpperCase() || "SEM EVENTO";
      const O = H.championship.length === 0 || H.championship.map(re => re.toUpperCase().trim()).includes(F);
      const I = H.round.length === 0 || H.round.map(re => re.toUpperCase().trim()).includes(String(b.Rodada).toUpperCase().trim());
      const ne = !wt || et(b.Mapa) === et(wt);
      if (ae) {
        const re = String(b.Data || "");
        const Ve = ae.split("-").reverse().join("/");
        return (re === ae || re === Ve) && O && ne && I;
      }
      if (H.date.length !== 0 && !H.date.map(re => re.trim()).includes(String(b.Data).trim()) || !O || !ne || !I) {
        return false;
      }
      if (!d) {
        return true;
      }
      const de = String(b.Data || "");
      const ie = de.split("/");
      const J = ie.length === 3 ? new Date(`${ie[2]}-${ie[1]}-${ie[0]}`) : new Date(de);
      return !isNaN(J.getTime()) && J >= d;
    });
  }, [f, H.date, H.championship, H.round, be, ae, wt]);
  s.useEffect(() => {
    if (E.length === 0 && a.length === 0) {
      if (k.length > 0 || f.length > 0) {
        h(Ja([], []));
      } else {
        h(null);
      }
      return;
    }
    h(Ja(E, a));
  }, [E, a]);
  const L = s.useMemo(() => Array.from(new Set(f.map(d => d.Player).filter(Boolean))).sort(), [f]);
  const [xe, Se] = s.useState({
    key: "abates",
    direction: "desc"
  });
  const [Q, U] = s.useState([]);
  s.useEffect(() => {
    if (!se || !["players", "individual", "comparison"].includes(q)) {
      return;
    }
    let d = false;
    (async () => {
      gt(true);
      Be([]);
      U([]);
      try {
        let F = K.from("vw_jogadores_com_campeonato").select("player, kill, assistencia, dano_causado, posicao, mapa, equipe, data, rodada, campeonato, morte, derrubados, partida_id, created_at, campeonato_correto").eq("user_id", se.id);
        if (be === "7d") {
          const J = new Date();
          J.setDate(J.getDate() - 6);
          F = F.gte("data", J.toISOString().split("T")[0]);
        } else if (be === "30d") {
          const J = new Date();
          const re = new Date(J.getFullYear(), J.getMonth(), 1);
          F = F.gte("data", re.toISOString().split("T")[0]);
        }
        if (ae) {
          F = F.eq("data", ae);
        }
        const [O, I] = await Promise.all([F, K.from("vw_jogadores_com_campeonato").select("campeonato_correto").eq("user_id", se.id).not("campeonato_correto", "is", null)]);
        if (d) {
          return;
        }
        if (O.error) {
          throw O.error;
        }
        if (!I.error && I.data) {
          const J = Array.from(new Set(I.data.map(re => String(re.campeonato_correto).trim().toUpperCase()))).sort();
          oa(J);
        }
        const ne = O.data || [];
        m(ne);
        const we = ne.filter(J => {
          const re = J.campeonato_correto ? String(J.campeonato_correto).trim().toUpperCase() : J.campeonato ? String(J.campeonato).trim().toUpperCase() : "SEM EVENTO";
          const Ve = String(J.player).trim().toUpperCase();
          const kt = A.length === 0 || A.includes(J.data);
          const Ut = Oe.length === 0 || Oe.includes(Ve);
          const Ba = z.length === 0 || z.includes(re);
          const La = J.rodada ? String(J.rodada).trim() : "";
          const qa = pe.length === 0 || pe.includes(La);
          const ca = Ne.length === 0 || Ne.includes(et(J.mapa));
          return kt && Ut && Ba && qa && ca;
        });
        if (d) {
          return;
        }
        if (!we || we.length === 0) {
          Be([]);
          U([]);
          return;
        }
        const de = {};
        we.forEach(J => {
          const re = J.player;
          de[re] ||= {
            name: re,
            kills: 0,
            damage: 0,
            assists: 0,
            deaths: 0,
            derrubados: 0,
            partidas: new Set()
          };
          de[re].kills += Number(J.kill) || 0;
          de[re].damage += Number(J.dano_causado) || 0;
          de[re].assists += Number(J.assistencia) || 0;
          de[re].deaths += Number(J.morte) || 0;
          de[re].derrubados += Number(J.derrubados) || 0;
          const Ve = J.partida_id ? String(J.partida_id) : `${J.data}|${J.campeonato}|${J.rodada}|${J.mapa}`;
          de[re].partidas.add(Ve);
        });
        if (d) {
          return;
        }
        let ie = Object.values(de).map(J => ({
          name: J.name,
          abates: J.kills,
          mortes: J.deaths,
          assistencias: J.assists,
          dano: J.damage,
          kd: parseFloat((J.kills / Math.max(1, J.partidas.size)).toFixed(2)),
          derrubados: J.derrubados,
          quedas: J.partidas.size
        }));
        ie.sort((J, re) => {
          let Ve = J[xe.key];
          let kt = re[xe.key];
          if (Ve < kt) {
            if (xe.direction === "asc") {
              return -1;
            } else {
              return 1;
            }
          } else if (Ve > kt) {
            if (xe.direction === "asc") {
              return 1;
            } else {
              return -1;
            }
          } else {
            return 0;
          }
        });
        Be(ie);
        U(we);
      } catch (F) {
        if (!d) {
          Ee(`Erro: ${F.message || "Erro ao carregar estatísticas"}`, "error");
        }
      } finally {
        if (!d) {
          gt(false);
        }
      }
    })();
    return () => {
      d = true;
    };
  }, [se, q, A, z, pe, Oe, xe, Ne, be, ae]);
  const $ = s.useMemo(() => Math.max(...ce.map(d => d.abates), 1), [ce]);
  const ge = s.useMemo(() => {
    const d = ["#FF3038", "#F97316", "#EAB308", "#22C55E", "#F472B6", "#FF8A90", "#94A3B8"];
    return ce.map((b, F) => ({
      name: b.name,
      value: b.abates,
      fill: d[F % d.length]
    }));
  }, [ce]);
  const ve = s.useMemo(() => {
    const d = ["#FF3038", "#F97316", "#EAB308", "#22C55E", "#F472B6", "#FF8A90", "#94A3B8"];
    return ce.map((b, F) => ({
      name: b.name,
      value: b.quedas,
      fill: d[F % d.length]
    }));
  }, [ce]);
  const Re = s.useMemo(() => [...ce].sort((d, b) => b.dano - d.dano), [ce]);
  const ke = s.useMemo(() => {
    const d = {};
    Q.forEach(b => {
      const F = String(b.player || "").trim();
      if (F) {
        d[F] ||= {
          kill: 0,
          assistencia: 0,
          count: 0
        };
        d[F].kill += Number(b.kill) || 0;
        d[F].assistencia += Number(b.assistencia) || 0;
        d[F].count += 1;
      }
    });
    return Object.entries(d).map(([b, F]) => ({
      player: b,
      kill: parseFloat((F.kill / F.count).toFixed(2)),
      assistencia: parseFloat((F.assistencia / F.count).toFixed(2))
    })).sort((b, F) => F.kill - b.kill);
  }, [Q]);
  const He = s.useMemo(() => {
    const d = E.length || 1;
    const b = a.reduce((O, I) => O + (Number(I.Kill) || 0), 0);
    const F = a.reduce((O, I) => O + (Number(I.Derrubados) || 0), 0);
    return {
      quedas: E.length,
      kd: parseFloat((b / (E.length || 1)).toFixed(2)),
      medAbates: parseFloat((b / d).toFixed(2)),
      medDerrubados: parseFloat((F / d).toFixed(2))
    };
  }, [E, a]);
  const dt = s.useMemo(() => !Q || Q.length === 0 ? [] : Array.from(new Set(Q.map(b => String(b.player || "").trim()).filter(Boolean))).sort(), [Q]);
  s.useEffect(() => {
    if (dt.length > 0 && !fe) {
      qe(dt[0]);
    }
  }, [dt, fe]);
  s.useEffect(() => {
    let d = true;
    (async () => {
      if (!!se && !!fe) {
        try {
          const {
            data: F,
            error: O
          } = await K.from("jogadores_perfil").select("foto_url").eq("user_id", se.id).eq("player", fe).single();
          if (d) {
            if (O && O.code !== "PGRST116") {
              console.error("Erro ao buscar foto:", O);
            }
            Me(F?.foto_url || "");
          }
        } catch (F) {
          console.error(F);
        }
      }
    })();
    return () => {
      d = false;
    };
  }, [se, fe]);
  const xt = (d, b = 400, F = 0.8) => new Promise((O, I) => {
    const ne = new Image();
    const we = new FileReader();
    we.onload = de => {
      ne.src = de.target?.result;
    };
    we.onerror = de => I(de);
    ne.onload = () => {
      let {
        width: de,
        height: ie
      } = ne;
      if (de > ie && de > b) {
        ie = Math.round(ie * b / de);
        de = b;
      } else if (ie > b) {
        de = Math.round(de * b / ie);
        ie = b;
      }
      const J = document.createElement("canvas");
      J.width = de;
      J.height = ie;
      const re = J.getContext("2d");
      if (!re) {
        I(new Error("Canvas não suportado"));
        return;
      }
      re.drawImage(ne, 0, 0, de, ie);
      J.toBlob(Ve => {
        if (Ve) {
          O(Ve);
        } else {
          I(new Error("Falha ao comprimir imagem"));
        }
      }, "image/webp", F);
    };
    ne.onerror = de => I(de);
    we.readAsDataURL(d);
  });
  const Zt = async d => {
    const b = d.target.files?.[0];
    console.log("[DEBUG] handlePhotoUpload disparado. file:", b, "user:", se?.id, "selectedIndividualPlayer:", fe);
    if (!b || !se || !fe) {
      console.log("[DEBUG] Saída antecipada acionada. file:", !!b, "user:", !!se, "selectedIndividualPlayer:", fe);
      return;
    }
    if (b.size > 5242880) {
      console.log("[DEBUG] Arquivo excede 5MB. Tamanho:", b.size);
      Ee("Arquivo muito grande (máximo 5MB).", "error");
      if (d.target) {
        d.target.value = "";
      }
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(b.type)) {
      console.log("[DEBUG] Tipo de arquivo inválido:", b.type);
      Ee("Formato inválido. Use apenas JPEG, PNG ou WebP.", "error");
      if (d.target) {
        d.target.value = "";
      }
      return;
    }
    console.log("[DEBUG] Iniciando setIsUploadingPhoto(true) e compressão Canvas...");
    nt(true);
    try {
      let O;
      try {
        O = await xt(b, 400, 0.8);
        console.log("[DEBUG] Compressão concluída. Blob size:", O.size, "type:", O.type);
      } catch (re) {
        console.error("[DEBUG] Erro na compressão de imagem:", re);
        Ee("Erro ao processar imagem, tente outra foto.", "error");
        return;
      }
      const I = fe.replace(/[^a-zA-Z0-9_-]/g, "_");
      const ne = `${se.id}/${I}.webp`;
      console.log("[DEBUG] Fazendo upload no Storage bucket \"player-photos\". Path:", ne);
      const {
        error: we
      } = await K.storage.from("player-photos").upload(ne, O, {
        upsert: true,
        cacheControl: "3600",
        contentType: "image/webp"
      });
      if (we) {
        console.error("[DEBUG] Erro no upload Storage:", we);
        Ee(`Erro ao subir imagem: ${we.message}`, "error");
        return;
      }
      const {
        data: de
      } = K.storage.from("player-photos").getPublicUrl(ne);
      const ie = `${de.publicUrl}?t=${Date.now()}`;
      console.log("[DEBUG] Upload Storage OK. Public URL:", ie);
      console.log("[DEBUG] Gravando no banco (jogadores_perfil)...");
      const {
        error: J
      } = await K.from("jogadores_perfil").upsert({
        user_id: se.id,
        player: fe,
        foto_url: ie,
        updated_at: new Date().toISOString()
      }, {
        onConflict: "user_id,player"
      });
      if (J) {
        console.error("[DEBUG] Erro ao salvar no banco:", J);
        Ee(`Erro ao salvar no banco: ${J.message}`, "error");
        return;
      }
      console.log("[DEBUG] Sucesso completo!");
      Me(ie);
      Ee("Foto do jogador atualizada com sucesso!", "success");
    } catch (O) {
      console.error("[DEBUG] Erro inesperado ao salvar foto:", O);
      Ee("Erro ao atualizar foto.", "error");
    } finally {
      nt(false);
      if (d.target) {
        d.target.value = "";
      }
    }
  };
  const Ue = s.useMemo(() => !Q || !fe ? [] : Q.filter(d => String(d.player || "").trim() === fe), [Q, fe]);
  const mt = s.useMemo(() => {
    const d = Ue;
    const b = d.length;
    let F = 0;
    let O = 0;
    let I = 0;
    let ne = 0;
    let we = 0;
    d.forEach(ie => {
      F += Number(ie.kill) || 0;
      O += Number(ie.morte) || 0;
      I += Number(ie.assistencia) || 0;
      ne += Number(ie.dano_causado) || 0;
      we += Number(ie.derrubados) || 0;
    });
    const de = b === 0 ? F : F / b;
    return {
      quedas: b,
      kills: F,
      mortes: O,
      assists: I,
      danoMedio: parseFloat((ne / Math.max(1, b)).toFixed(0)),
      derrubados: we,
      kd: parseFloat(de.toFixed(2))
    };
  }, [Ue]);
  const ea = s.useMemo(() => {
    const d = [...Ue].sort((F, O) => new Date(F.data).getTime() - new Date(O.data).getTime());
    const b = {};
    d.forEach(F => {
      const O = F.data || "N/A";
      b[O] ||= {
        kills: 0,
        mortes: 0,
        count: 0
      };
      b[O].kills += Number(F.kill) || 0;
      b[O].mortes += Number(F.morte) || 0;
      b[O].count += 1;
    });
    return Object.entries(b).map(([F, O]) => ({
      name: F.includes("-") ? F.split("-").reverse().join("/") : F,
      kd: parseFloat((O.kills / Math.max(1, O.count)).toFixed(2))
    }));
  }, [Ue]);
  const Bs = s.useMemo(() => {
    const d = {};
    Ue.forEach(b => {
      const F = b.mapa || "N/A";
      d[F] ||= {
        kills: 0
      };
      d[F].kills += Number(b.kill) || 0;
    });
    return Object.entries(d).map(([b, F]) => ({
      name: b,
      kills: F.kills
    })).sort((b, F) => F.kills - b.kills);
  }, [Ue]);
  const Ls = s.useMemo(() => {
    let d = 0;
    let b = 0;
    let F = 0;
    Ue.forEach(O => {
      const I = Number(O.posicao) || 0;
      if (I > 0 && I <= 3) {
        d++;
      } else if (I > 3 && I <= 8) {
        b++;
      } else if (I >= 9) {
        F++;
      }
    });
    return [{
      name: "Top 3",
      value: d,
      fill: "#10B981"
    }, {
      name: "Top 4-8",
      value: b,
      fill: "#6B7280"
    }, {
      name: "Top 9+",
      value: F,
      fill: "#EF4444"
    }];
  }, [Ue]);
  const qs = s.useMemo(() => {
    if (!Q.length || !Ue.length) {
      return [];
    }
    const d = Q.reduce((I, ne) => I + (Number(ne.kill) || 0), 0) / (Q.length || 1);
    const b = Q.reduce((I, ne) => I + (Number(ne.assistencia) || 0), 0) / (Q.length || 1);
    const F = mt.kills / (mt.quedas || 1);
    const O = mt.assists / (mt.quedas || 1);
    return [{
      name: "Abates/Q",
      Jogador: parseFloat(F.toFixed(2)),
      Squad: parseFloat(d.toFixed(2))
    }, {
      name: "Assist/Q",
      Jogador: parseFloat(O.toFixed(2)),
      Squad: parseFloat(b.toFixed(2))
    }];
  }, [Q, Ue, mt]);
  const Us = s.useMemo(() => {
    if (!x) {
      return null;
    }
    const d = E;
    const b = d.length || 1;
    const F = d.filter(le => Number(le.Colocacao) <= 3).length;
    const O = d.filter(le => Number(le.Colocacao) <= 5).length;
    const I = d.filter(le => Number(le.Colocacao) <= 12).length;
    const ne = d.filter(le => le.Booyah === "SIM").length;
    const we = {};
    d.forEach(le => {
      if (le.Booyah === "SIM" && le.Mapa) {
        const me = et(le.Mapa);
        we[me] = (we[me] || 0) + 1;
      }
    });
    const de = Object.entries(we).sort(([, le], [, me]) => me - le).map(([le, me]) => ({
      mapa: le,
      qtd: me
    }));
    const ie = {};
    d.forEach(le => {
      const me = String(le.Campeonato || "Sem Evento");
      ie[me] ||= {
        sum: 0,
        count: 0
      };
      ie[me].sum += Number(le.Pontos_Total) || 0;
      ie[me].count += 1;
    });
    const J = Object.entries(ie).map(([le, {
      sum: me,
      count: pt
    }]) => ({
      evento: le,
      media: parseFloat((me / pt).toFixed(2))
    })).sort((le, me) => me.media - le.media);
    const re = {};
    d.forEach(le => {
      const me = String(le.Rodada || "");
      if (me) {
        re[me] ||= {
          sum: 0,
          count: 0
        };
        re[me].sum += Number(le.Pontos_Total) || 0;
        re[me].count += 1;
      }
    });
    const Ve = Object.entries(re).sort(([le], [me]) => {
      const pt = da => {
        const ls = ma.indexOf(da.trim().toUpperCase());
        if (ls !== -1) {
          return ls + 1000;
        }
        const cs = Number(da);
        if (isNaN(cs)) {
          return 9999;
        } else {
          return cs;
        }
      };
      return pt(le) - pt(me);
    }).map(([le, {
      sum: me,
      count: pt
    }]) => ({
      rodada: le,
      media: parseFloat((me / pt).toFixed(2))
    }));
    const kt = {};
    d.forEach(le => {
      const me = et(le.Mapa || "");
      if (!!me && me.toUpperCase() !== "N/A") {
        kt[me] ||= {
          sum: 0,
          count: 0
        };
        kt[me].sum += Number(le.Pontos_Total) || 0;
        kt[me].count += 1;
      }
    });
    const Ut = Object.entries(kt).map(([le, {
      sum: me,
      count: pt
    }]) => ({
      mapa: le,
      media: parseFloat((me / pt).toFixed(2))
    })).sort((le, me) => me.media - le.media);
    const Ba = Ut.length > 0 ? Ut[0] : null;
    const La = Ut.length > 0 ? Ut[Ut.length - 1] : null;
    const qa = [...d].sort((le, me) => {
      const pt = new Date(String(le.Data).includes("/") ? String(le.Data).split("/").reverse().join("-") : String(le.Data)).getTime();
      const da = new Date(String(me.Data).includes("/") ? String(me.Data).split("/").reverse().join("-") : String(me.Data)).getTime();
      if (pt !== da) {
        return pt - da;
      } else {
        return Number(le.Rodada) - Number(me.Rodada);
      }
    });
    let ca = 0;
    let ka = 0;
    qa.forEach(le => {
      if (le.Booyah === "SIM") {
        ka += 1;
        if (ka > ca) {
          ca = ka;
        }
      } else {
        ka = 0;
      }
    });
    return {
      taxaBooyah: parseFloat((ne / b * 100).toFixed(2)),
      taxaTop3: parseFloat((F / b * 100).toFixed(2)),
      taxaTop5: parseFloat((O / b * 100).toFixed(2)),
      taxaTop12: parseFloat((I / b * 100).toFixed(2)),
      booyahsByMap: de,
      avgByChamp: J,
      avgPontosByRound: Ve,
      melhorMapa: Ba,
      piorMapa: La,
      bestStreak: ca
    };
  }, [x, E]);
  const St = s.useMemo(() => k.filter(d => {
    const b = String(d.Campeonato || "").trim().toUpperCase();
    const F = ot.length === 0 || ot.includes(b);
    const O = Z.length === 0 || Z.includes(String(d.Data));
    const I = Ne.length === 0 || Ne.includes(et(d.Mapa));
    return F && O && I;
  }).sort((d, b) => {
    const F = d.Data.includes("/") ? new Date(d.Data.split("/").reverse().join("-")) : new Date(d.Data);
    const O = b.Data.includes("/") ? new Date(b.Data.split("/").reverse().join("-")) : new Date(b.Data);
    if (F.getTime() !== O.getTime()) {
      return F.getTime() - O.getTime();
    }
    const I = ne => {
      const we = String(ne || "").trim().toUpperCase();
      const de = ma.indexOf(we);
      if (de !== -1) {
        return de + 1000;
      }
      const ie = Number(we);
      if (isNaN(ie)) {
        return 9999;
      } else {
        return ie;
      }
    };
    return I(d.Rodada) - I(b.Rodada);
  }), [k, ot, Z, Ne]);
  const $s = s.useMemo(() => {
    if (St.length === 0) {
      return null;
    }
    const d = St.map(O => Number(O.Pontos_Total) || 0);
    const b = St.reduce((O, I) => (Number(O.Pontos_Total) || 0) > (Number(I.Pontos_Total) || 0) ? O : I);
    const F = St.reduce((O, I) => (Number(O.Pontos_Total) || 0) < (Number(I.Pontos_Total) || 0) ? O : I);
    return {
      total: St.length,
      best: Number(b.Pontos_Total) || 0,
      worst: Number(F.Pontos_Total) || 0,
      avg: parseFloat((d.reduce((O, I) => O + I, 0) / St.length).toFixed(1))
    };
  }, [St]);
  const Ks = s.useMemo(() => St.map((d, b) => ({
    name: `R${d.Rodada}-${b}`,
    pontos: Number(d.Pontos_Total)
  })), [St]);
  s.useEffect(() => {
    if (!Fe || !se) {
      he([]);
      return;
    }
    const [d, b] = Fe.split("|");
    (async () => {
      const {
        data: O
      } = await K.from("vw_jogadores_com_campeonato").select("*").eq("user_id", se.id).ilike("campeonato_correto", d.trim()).eq("rodada", b);
      he(O || []);
    })();
  }, [Fe, se]);
  const Gs = s.useMemo(() => [...E].reverse().map((d, b) => ({
    name: `Q${b + 1}`,
    pontos: Number(d.Pontos_Total) || 0,
    campeonato: d.Campeonato,
    rodada: d.Rodada,
    mapa: d.Mapa,
    colocacao: d.Colocacao
  })), [E]);
  const Ws = s.useMemo(() => {
    const d = {
      1: 12,
      2: 9,
      3: 8,
      4: 7,
      5: 6,
      6: 5,
      7: 4,
      8: 3,
      9: 2,
      10: 1
    };
    const b = {};
    a.forEach(F => {
      const O = et(F.Mapa || F.mapa);
      if (!O) {
        return;
      }
      b[O] ||= {
        totalKills: 0,
        totalColocacao: 0,
        partidasUnicas: new Set()
      };
      b[O].totalKills += Number(F.Kill || F.kill) || 0;
      const I = String(F.partida_id || F.PartidaId || `${F.Data}_${F.Rodada}_${O}`);
      if (!b[O].partidasUnicas.has(I)) {
        b[O].partidasUnicas.add(I);
        const ne = Number(F.Posicao || F.posicao) || 0;
        b[O].totalColocacao += d[ne] || 0;
      }
    });
    return Object.entries(b).map(([F, O]) => {
      const I = O.partidasUnicas.size || 1;
      return {
        name: F,
        ptKills: Math.round(O.totalKills / I * 10) / 10,
        ptColocacao: Math.round(O.totalColocacao / I * 10) / 10
      };
    }).sort((F, O) => O.ptKills + O.ptColocacao - (F.ptKills + F.ptColocacao));
  }, [a]);
  const Hs = s.useMemo(() => {
    const d = Array(12).fill(0);
    E.forEach(b => {
      const F = Number(b.Colocacao);
      if (F >= 1 && F <= 12) {
        d[F - 1]++;
      }
    });
    return d.map((b, F) => ({
      posicao: `${F + 1}º`,
      quantidade: b
    }));
  }, [E]);
  const is = async () => {
    if (!j || !se) {
      Ee("Erro ao gerar link de compartilhamento. Tente recarregar.", "error");
      return;
    }
    y(true);
    const {
      data: d
    } = await K.from("partidas_geral").select("campeonato").eq("user_id", se.id).order("campeonato");
    if (d) {
      const b = Array.from(new Set(d.map(O => O.campeonato).filter(Boolean)));
      u(b);
      const F = {};
      b.forEach(O => F[O] = true);
      P(F);
    }
  };
  const Vs = () => {
    const b = S.filter(I => w[I]).map(I => encodeURIComponent(I)).join(",");
    const F = b ? `?camps=${b}` : "";
    const O = `${window.location.origin}/squad/${j}${F}`;
    navigator.clipboard.writeText(O).then(() => {
      Ee("✅ Link copiado! Envie para o seu squad.", "success");
      y(false);
    }).catch(() => {
      Ee("Erro ao copiar link.", "error");
    });
  };
  const Qs = async () => {
    if (!!se && !!Le) {
      if (!Le.id) {
        Ee("ID da partida não encontrado.", "error");
        return;
      }
      v(true);
      try {
        const [d, b] = await Promise.all([K.from("partidas_geral").delete().eq("id", Le.id), K.from("performance_jogadores").delete().eq("user_id", se.id).eq("data", String(Le.Data)).eq("mapa", String(Le.Mapa))]);
        if (d.error) {
          throw d.error;
        }
        if (b.error) {
          throw b.error;
        }
        D(F => F.filter(O => O.id !== Le.id));
        N(F => F.filter(O => O.partida_id && Le.id ? O.partida_id !== Le.id : String(O.Data) !== String(Le.Data) || String(O.Mapa) !== String(Le.Mapa) || String(O.Rodada) !== String(Le.Rodada)));
        Ee("Queda removida com sucesso! 🗑️", "success");
        Nt(false);
        ia(null);
      } catch (d) {
        console.error("Erro ao deletar:", d);
        Ee("Erro ao remover queda.", "error");
      } finally {
        v(false);
      }
    }
  };
  const Ys = async () => {
    if (!se || !jt.trim()) {
      Ee("Nome da composição é obrigatório", "warning");
      return;
    }
    let d = {
      user_id: se.id,
      nome: jt,
      jogadores: yt
    };
    if (Qt) {
      d.id = Qt;
    }
    const {
      error: b
    } = await K.from("composicoes").upsert(d);
    if (b) {
      Ee("Erro ao salvar composição", "error");
    } else {
      Ee("Composição salva!", "success");
      const {
        data: F
      } = await K.from("composicoes").select("*").eq("user_id", se.id).order("created_at", {
        ascending: false
      });
      if (F) {
        vt(F);
      }
    }
  };
  const Js = async d => {
    if (!se) {
      return;
    }
    const {
      error: b
    } = await K.from("composicoes").delete().eq("id", d).eq("user_id", se.id);
    if (!b) {
      vt(F => F.filter(O => O.id !== d));
      Ee("Composição deletada", "success");
      if (Qt === d) {
        na("");
        It(ct);
        ye("");
      }
    }
  };
  const Xs = d => {
    na(d.id);
    ye(d.nome);
    It(d.jogadores || ct);
  };
  const Zs = (d, b, F, O) => {
    It(I => {
      const ne = JSON.parse(JSON.stringify(I));
      if (O !== undefined) {
        ne[d].passivas[O] = F;
      } else {
        ne[d][b] = F;
      }
      return ne;
    });
  };
  return <div className="flex-1 flex flex-col bg-[var(--bg-main)]"><_Component26 />{Bt && <Vr message={Bt.message} type={Bt.type} />}{g && <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><div className="card w-full max-w-sm p-8 animate-reveal border-[var(--accent)]/30"><div className="flex flex-col items-center text-center"><div className="p-4 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] mb-6"><Mt size={32} /></div><h3 className="text-heading text-lg">Compartilhar Squad</h3><p className="text-label mt-2 px-4 mb-6">Selecione quais campeonatos exibir na página pública:</p></div><div className="max-h-60 overflow-y-auto space-y-2 mb-6 pr-2">{S.map(d => <label className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] cursor-pointer hover:border-[var(--accent)] transition-colors" key={d}><input type="checkbox" className="w-4 h-4 accent-purple-500 rounded" checked={!!w[d]} onChange={b => P(F => ({
              ...F,
              [d]: b.target.checked
            }))} /><span className="text-caption font-bold text-zinc-300 uppercase">{d}</span></label>)}{S.length === 0 && <p className="text-zinc-500 text-caption text-center">Nenhum evento encontrado.</p>}</div><div className="grid grid-cols-2 gap-3"><button onClick={() => y(false)} className="btn-ghost">Cancelar</button><button onClick={Vs} className="btn-primary flex items-center justify-center gap-2">Copiar Link</button></div></div></div>}{Lt && <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><div className="card w-full max-w-sm p-8 animate-reveal border-[var(--accent-red)]/30"><div className="flex flex-col items-center text-center"><div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-6"><Ge size={32} /></div><h3 className="text-heading text-lg">Remover Queda?</h3><p className="text-label mt-2 px-4">Tem certeza que deseja apagar esta queda? <br /><span className="text-white">Mapa: {Le?.Mapa} | Rodada: #{Le?.Rodada}</span></p><p className="text-label-sm text-red-500 font-bold uppercase tracking-widest mt-4">Esta ação não pode ser desfeita.</p></div><div className="grid grid-cols-2 gap-3 mt-8"><button onClick={() => Nt(false)} className="btn-ghost">Cancelar</button><button onClick={Qs} className="btn-primary !bg-red-600 hover:!bg-red-700 shadow-lg shadow-red-900/20 flex items-center justify-center gap-2" disabled={R}>{R ? <_Component9 size={14} className="animate-spin" /> : <_Component15 size={14} />} Apagar</button></div></div></div>}{oe && <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><div className="card w-full max-w-md p-8 animate-reveal border-[var(--accent)]/30"><div className="flex flex-col mb-6"><h3 className="text-heading text-lg flex items-center gap-2">✏️ Editar Queda</h3><p className="text-label mt-1">Ajuste os dados gerais da queda</p></div><div className="space-y-4"><div><label className="text-label-sm uppercase font-bold text-[var(--text-tertiary)] block mb-1">Campeonato / Torneio</label><input type="text" value={oe.Campeonato || ""} onChange={d => Ze({
              ...oe,
              Campeonato: d.target.value
            })} className="w-full bg-[var(--bg-main)] border border-[var(--border-default)] rounded-lg px-3 py-2 text-white text-caption outline-none focus:border-[var(--accent)]" placeholder="Ex: Liga Brasileira" /></div><div className="grid grid-cols-2 gap-4"><div><label htmlFor="edit-partida-rodada" className="text-label-sm uppercase font-bold text-[var(--text-tertiary)] block mb-1">Rodada</label><select id="edit-partida-rodada" value={oe.Rodada || ""} onChange={d => Ze({
                ...oe,
                Rodada: d.target.value
              })} className="w-full bg-[var(--bg-main)] border border-[var(--border-default)] rounded-lg px-3 py-2 text-white text-caption outline-none focus:border-[var(--accent)] cursor-pointer"><option value="">Selecione a fase</option>{oe.Rodada && !ma.includes(String(oe.Rodada)) && <option value={oe.Rodada}>{oe.Rodada}</option>}{ma.map(d => <option value={d} key={d}>{d}</option>)}</select></div><div><label htmlFor="edit-partida-mapa" className="text-label-sm uppercase font-bold text-[var(--text-tertiary)] block mb-1">Mapa</label><select id="edit-partida-mapa" value={oe.Mapa || ""} onChange={d => Ze({
                ...oe,
                Mapa: d.target.value
              })} className="w-full bg-[var(--bg-main)] border border-[var(--border-default)] rounded-lg px-3 py-2 text-white text-caption outline-none focus:border-[var(--accent)] cursor-pointer"><option value="BERMUDA">BERMUDA</option><option value="KALAHARI">KALAHARI</option><option value="NOVA TERRA">NOVA TERRA</option><option value="PURGATORIO">PURGATORIO</option><option value="SOLARA">SOLARA</option></select></div></div><div className="grid grid-cols-3 gap-4"><div><label className="text-label-sm uppercase font-bold text-[var(--text-tertiary)] block mb-1">Posição / Rank</label><input type="number" value={oe.Colocacao || ""} onChange={d => Ze({
                ...oe,
                Colocacao: parseInt(d.target.value) || 0
              })} className="w-full bg-[var(--bg-main)] border border-[var(--border-default)] rounded-lg px-3 py-2 text-white text-caption outline-none focus:border-[var(--accent)]" /></div><div><label className="text-label-sm uppercase font-bold text-[var(--text-tertiary)] block mb-1">Abates</label><input type="number" value={oe.Kill === undefined ? 0 : oe.Kill} onChange={d => Ze({
                ...oe,
                Kill: parseInt(d.target.value) || 0
              })} className="w-full bg-[var(--bg-main)] border border-[var(--border-default)] rounded-lg px-3 py-2 text-white text-caption outline-none focus:border-[var(--accent)]" /></div><div><label className="text-label-sm uppercase font-bold text-[var(--text-tertiary)] block mb-1">Total Pontos</label><input type="number" value={oe.Pontos_Total === undefined ? 0 : oe.Pontos_Total} onChange={d => Ze({
                ...oe,
                Pontos_Total: parseInt(d.target.value) || 0
              })} className="w-full bg-[var(--bg-main)] border border-[var(--border-default)] rounded-lg px-3 py-2 text-white text-caption outline-none focus:border-[var(--accent)]" /></div></div><div className="flex items-center gap-3 py-2"><input type="checkbox" id="edit-booyah" checked={oe.Booyah === "SIM"} onChange={d => Ze({
              ...oe,
              Booyah: d.target.checked ? "SIM" : "NAO"
            })} className="w-4 h-4 accent-purple-500 rounded cursor-pointer" /><label htmlFor="edit-booyah" className="text-caption text-zinc-300 font-bold cursor-pointer select-none">Booyah (Vitória)</label></div>{qt.length > 0 && <div style={{
            marginTop: "16px",
            borderTop: "1px solid #2C2C2C",
            paddingTop: "16px"
          }}><label style={{
              color: "#777",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "8px"
            }}>NOMES DOS JOGADORES</label><div style={{
              maxHeight: "180px",
              overflowY: "auto",
              paddingRight: "4px"
            }}>{qt.map((d, b) => <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px"
              }} key={d.id}><span style={{
                  color: "#777",
                  fontSize: "12px",
                  minWidth: "20px"
                }}>{b + 1}.</span><input value={d.player} onChange={F => {
                  const O = [...qt];
                  O[b].player = F.target.value.toUpperCase();
                  Xt(O);
                }} style={{
                  flex: 1,
                  background: "#121212",
                  border: "1px solid #2C2C2C",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  color: "#EDEDED",
                  fontSize: "13px"
                }} placeholder="NOME DO JOGADOR" /></div>)}</div></div>}</div><div className="grid grid-cols-2 gap-3 mt-8"><button onClick={() => Ze(null)} className="btn-ghost">Cancelar</button><button onClick={n} className="btn-primary flex items-center justify-center gap-2" disabled={R}>{R ? <_Component9 size={14} className="animate-spin" /> : null} Salvar</button></div></div></div>}<Ct activeTab={q} isSubscriber={Na}><header className="ctracker-dashboard-header flex flex-col gap-4 px-8 py-5 z-20 backdrop-blur-md sticky top-0 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]"><div className="flex items-center justify-between w-full"><div className="flex items-center gap-4"><div className="hidden md:flex items-center text-caption uppercase tracking-widest text-[#A1A1A1] font-normal"><span>CONTROLE</span><span className="mx-2 opacity-50">›</span><span>{q === "overview" ? "DASHBOARD" : q === "players" ? "JOGADORES" : q === "individual" ? "INDIVIDUAL" : q === "rounds" ? "RODADAS" : "ANÁLISE"}</span></div></div></div><div className="flex items-center justify-start w-full gap-4"><div className="hidden lg:flex items-center gap-2">{[{
              id: "7d",
              label: "7 DIAS"
            }, {
              id: "30d",
              label: "ESTE MÊS"
            }, {
              id: "all",
              label: "TODOS"
            }].map(d => <button onClick={() => {
              ue(d.id);
              M("");
            }} className={`px-3 py-1.5 rounded-lg text-body-sm border border-[var(--border-default)] transition-all ${be === d.id && !ae ? "bg-[var(--accent-muted)] border-[var(--accent)] text-[var(--accent-hover)] font-bold" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--accent-muted)] font-medium"} ${ae ? "opacity-50 grayscale" : ""}`} key={d.id}>{d.label}</button>)}</div><div className="hidden lg:flex items-center gap-2"><div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#09090b] border border-[var(--border-default)] transition-all ${ae ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/30" : ""}`}><_Component16 size={13} className={ae ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"} /><select value={ae} onChange={d => {
                M(d.target.value);
                if (d.target.value) {
                  ue("all");
                }
              }} className="bg-transparent text-white outline-none border-none text-caption cursor-pointer appearance-none min-w-[100px]" aria-label="Filtrar por data específica"><option value="" className="bg-[#09090b]">Filtrar por Data</option>{t.dates.map(d => {
                  const b = d.includes("-") ? d.split("-").reverse().join("/") : d;
                  return <option value={d} className="bg-[#09090b]" key={d}>{b}</option>;
                })}</select>{ae && <button onClick={() => M("")} className="ml-1 text-[var(--text-tertiary)] hover:text-white transition-colors"><Gt size={14} /></button>}</div><div data-tour="campeonatos-list"><Pt options={t.championships} selected={H.championship} onChange={d => je(b => ({
                ...b,
                championship: d
              }))} icon={<Je size={13} className="text-[var(--accent)]" />} placeholder="Todos os Eventos" /></div><Pt options={t.rounds.map(String)} selected={H.round} onChange={d => je(b => ({
              ...b,
              round: d
            }))} icon={<_Component6 size={13} className="text-[var(--accent)]" />} placeholder="Todas Rodadas" pluralName="rodadas" /><Pt options={B} selected={Ne} onChange={De} icon={<_Component19 size={13} className="text-[var(--accent)]" />} placeholder="Todos Mapas" pluralName="mapas" /></div><div className="flex items-center gap-4 pl-4 border-l border-[var(--border-subtle)]"><div className="hidden sm:flex flex-col text-right items-end gap-1"><span className="text-body-sm text-[#6B7280]">{c || se?.email || "Analista"}</span></div><button data-tour="squad-link" onClick={is} className="hidden md:flex items-center gap-2 text-[var(--accent)] text-body-sm hover:underline" title="Compartilhar Dashboard"><_Component27 size={14} />Link para Players</button><button onClick={is} className="md:hidden btn-ghost p-2.5 text-[var(--accent)]"><_Component27 size={18} /></button><div className="w-10 h-10 rounded-full border-2 border-[var(--accent)] flex items-center justify-center font-bold text-caption bg-[var(--accent-muted)] text-[var(--accent-hover)]">{(c || se?.email || "A")[0].toUpperCase()}</div></div></div></header><main style={{
        minWidth: 0
      }} className="ctracker-workspace-main flex-1 p-8 space-y-8 custom-scrollbar"><Kr>{p ? <div className="h-full w-full flex flex-col items-center justify-center space-y-6"><div className="w-12 h-12 rounded-lg border-2 border-[var(--accent)]/20 border-t-[var(--accent)] animate-spin" /><p className="text-label animate-pulse text-[var(--accent)]">Inicializando Protocolo de Dados</p></div> : Y ? <div className="h-full flex flex-col items-center justify-center p-12 text-center card"><div className="p-5 rounded-xl bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 mb-6"><Ge size={40} className="text-[var(--accent-red)]" /></div><h3 className="text-heading text-xl mb-2">Falha de Sincronização</h3><p className="max-w-xs text-body text-[var(--text-secondary)] mb-8">{Y}</p><button onClick={() => window.location.reload()} className="btn-primary">Reconectar Sistema</button></div> : <e.Fragment>{q === "overview" && <_Component28 data={x} navigate={r} selectedMap={wt} setSelectedMap={ya} globalSquadStats={He} overviewExtras={Us} pointsPerMatchData={Gs} mapPointsData={Ws} placementDistribution={Hs} />}{q === "security" && <_r />}{q === "heatmap" && se?.id && <div data-tour="heatmap-view"><Ur userId={se.id} /></div>}{q === "comparison" && <$r allPlayerRows={i} availableChamps={t.championships} />}{q === "players" && <_Component29 playerList={L} playerSelectedPlayer={Oe} setPlayerSelectedPlayer={G} playerChampOptions={Wt} playerChampFilter={z} setPlayerChampFilter={te} filterOptions={t} playerDateFilter={A} setPlayerDateFilter={C} playerRoundFilter={pe} setPlayerRoundFilter={Ae} setMapFilter={De} playerStatsLoading={ft} sortConfig={xe} setSortConfig={Se} playerTableData={ce} maxAbates={$} pyramidData={Re} donutData={ge} quedasDonutData={ve} lineChartData={ke} />}{q === "individual" && <Jr isUploadingPhoto={Ht} playerPhoto={Dt} selectedIndividualPlayer={fe} setSelectedIndividualPlayer={qe} fileInputRef={Vt} handlePhotoUpload={Zt} distinctIndividualPlayers={dt} individualStats={mt} individualKdChartData={ea} individualMapChartData={Bs} individualPlacementData={Ls} individualVsSquadData={qs} individualRawData={Ue} />}{q === "rounds" && <Yr filterOptions={t} roundChampFilter={ot} setRoundChampFilter={W} roundDateFilter={Z} setRoundDateFilter={ee} roundsStats={$s} roundsChartData={Ks} roundsTabRows={St} expandedRound={Fe} setExpandedRound={Xe} roundPlayerData={Pe} />}{q === "composicao" && <_Component30 selectionModal={Ia} setSelectionModal={_a} modalSearch={Yt} setModalSearch={Jt} updateJogadorComposicao={Zs} composicaoSelecionada={Qt} setComposicaoSelecionada={na} composicoesSalvas={ja} handleLoadComposicao={Xs} setComposicaoNome={ye} setJogadoresComposicao={It} defaultComposicao={ct} jogadoresComposicao={yt} composicaoNome={jt} handleSaveComposicao={Ys} handleDeleteComposicao={Js} />}{q === "history" && <Qr data={x} setPartidaEditando={Ze} setMatchToDelete={ia} setIsDeleteModalOpen={Nt} />}</e.Fragment>}</Kr></main></Ct></div>;
};
const lo = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  color: "var(--text-primary)",
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  padding: "12px 16px",
  boxShadow: "var(--shadow-elevated)"
};
const _Component65 = () => {
  const [r, c] = s.useState([]);
  const [l, j] = s.useState(true);
  const [o, g] = s.useState("");
  const [y, S] = s.useState("Todos");
  const [u, w] = s.useState("Todos");
  const [P, k] = s.useState("");
  const {
    user: D,
    isSubscriber: f
  } = We();
  s.useEffect(() => {
    if (!D) {
      return;
    }
    const x = async () => {
      const {
        data: R
      } = await K.from("perfis").select("nome, email").eq("id", D.id).single();
      if (R) {
        k(R.nome || R.email || D.email || "");
      }
    };
    const h = async () => {
      j(true);
      try {
        const {
          data: R,
          error: v
        } = await K.from("performance_jogadores").select("*").eq("user_id", D.id).order("data", {
          ascending: false
        });
        if (v) {
          throw v;
        }
        const p = (R || []).map(T => ({
          Data: T.data,
          Campeonato: T.campeonato || "Sem Evento",
          Mapa: T.mapa || "Desconhecido",
          Player: T.player,
          Kill: Number(T.kill) || 0,
          Morte: Number(T.morte) || 0,
          Assistencia: Number(T.assistencia) || 0,
          Dano: Number(T.dano_causado) || 0,
          Derrubados: Number(T.derrubados) || 0,
          Revividos: Number(T.ressurgimento) || 0,
          Cura: Number(T.cura) || 0,
          Headshots: Number(T.headshots) || 0
        }));
        c(p);
      } catch (R) {
        console.error("Error fetching collective data:", R);
      } finally {
        j(false);
      }
    };
    x();
    h();
  }, [D]);
  const N = s.useMemo(() => {
    const x = new Set();
    const h = new Set();
    r.forEach(R => {
      if (R.Campeonato) {
        x.add(R.Campeonato.toUpperCase().trim());
      }
      if (R.Mapa) {
        h.add(R.Mapa.toUpperCase().trim());
      }
    });
    return {
      championships: Array.from(x).sort(),
      maps: Array.from(h).sort()
    };
  }, [r]);
  const i = s.useMemo(() => {
    const x = r.filter(v => {
      const p = v.Data?.trim() ?? "";
      const T = o.trim();
      const Y = o.split("-").reverse().join("/").trim();
      const X = !o || p === T || p === Y;
      const _ = y === "Todos" || v.Campeonato?.toUpperCase().trim() === y.toUpperCase().trim();
      const q = u === "Todos" || v.Mapa?.toUpperCase().trim() === u.toUpperCase().trim();
      return X && _ && q;
    });
    const h = {};
    x.forEach(v => {
      const p = v.Player?.toUpperCase().trim();
      if (p) {
        h[p] ||= {
          name: p,
          kills: 0,
          assists: 0,
          dano: 0,
          mortes: 0,
          dps: 0,
          revividos: 0,
          derrubados: 0,
          cura: 0,
          headshots: 0,
          partidas: 0
        };
        h[p].kills += v.Kill;
        h[p].assists += v.Assistencia;
        h[p].dano += v.Dano;
        h[p].mortes += v.Morte;
        h[p].derrubados += v.Derrubados;
        h[p].revividos += v.Revividos;
        h[p].cura += v.Cura;
        h[p].headshots += v.Headshots;
        h[p].partidas += 1;
      }
    });
    const R = Object.values(h).map(v => ({
      ...v,
      curaMedia: v.partidas > 0 ? Math.round(v.cura / v.partidas) : 0,
      headshotsMedia: v.partidas > 0 ? parseFloat((v.headshots / v.partidas).toFixed(2)) : 0
    }));
    return {
      kills: [...R].sort((v, p) => p.kills - v.kills),
      assists: [...R].sort((v, p) => p.assists - v.assists),
      dano: [...R].sort((v, p) => p.dano - v.dano),
      mortes: [...R].sort((v, p) => p.mortes - v.mortes),
      derrubados: [...R].sort((v, p) => p.derrubados - v.derrubados),
      revividos: [...R].sort((v, p) => p.revividos - v.revividos),
      cura: [...R].sort((v, p) => p.curaMedia - v.curaMedia),
      headshots: [...R].sort((v, p) => p.headshotsMedia - v.headshotsMedia)
    };
  }, [r, o, y, u]);
  const _Component31 = ({
    data: x,
    dataKey: h,
    title: R,
    color: v,
    subtitle: p = "Métricas individuais"
  }) => <div className="h-full flex flex-col p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg"><div className="flex items-center justify-between mb-4"><div><h4 className="text-heading">{R}</h4><p className="text-caption text-[var(--text-tertiary)] mb-4">{p}</p></div></div><div className="flex-1 min-h-[250px]"><Te width="100%" height="100%"><_Component20 data={x} layout="vertical" margin={{
          top: 5,
          right: 30,
          left: 40,
          bottom: 5
        }}><_Component11 strokeDasharray="3 3" horizontal={false} stroke="var(--border-subtle)" /><_Component12 type="number" hide={true} /><Ie type="category" dataKey="name" tick={{
            fontSize: 10,
            fill: "var(--text-secondary)",
            fontWeight: 600
          }} axisLine={false} tickLine={false} /><_e cursor={{
            fill: "rgba(255,255,255,0.03)"
          }} contentStyle={lo} itemStyle={{
            color: "#fff",
            fontSize: "11px",
            fontWeight: "bold"
          }} labelStyle={{
            color: "var(--text-tertiary)",
            fontSize: "10px",
            marginBottom: "4px"
          }} /><Qe dataKey={h} fill={v} radius={[0, 4, 4, 0]} barSize={18} label={{
            position: "right",
            fill: "var(--text-primary)",
            fontSize: 10,
            fontWeight: "bold"
          }}>{x.map((T, Y) => <_Component21 fillOpacity={1 - Y * 0.1} key={`cell-${Y}`} />)}</Qe></_Component20></Te></div></div>;
  return <Ct activeTab="coletivo" isSubscriber={f}><div className="ctracker-coletivo-page flex-1 flex flex-col min-h-full"><header className="ctracker-filter-header flex flex-col gap-4 px-8 py-5 z-20 backdrop-blur-md sticky top-0 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]"><div className="flex items-center justify-between w-full"><div className="flex items-center gap-4"><div className="hidden md:flex items-center text-caption uppercase tracking-widest text-[var(--text-tertiary)] font-bold"><span>CONTROLE</span><span className="mx-2 opacity-50">›</span><span>ANÁLISE COLETIVA</span></div></div><div className="flex items-center gap-4"><div className="hidden sm:flex flex-col text-right items-end gap-1"><span className="text-body-sm text-[var(--text-tertiary)]">{P || "Analista"}</span></div></div></div><div className="flex flex-col md:flex-row md:items-center justify-start w-full gap-3"><div className={`flex w-full md:w-auto items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] transition-all ${o ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/30" : ""}`}><_Component16 size={13} className={o ? "text-[var(--accent)]" : "text-[var(--text-tertiary)] shrink-0"} /><input type="date" value={o} onChange={x => g(x.target.value)} className="bg-transparent text-[var(--text-tertiary)] outline-none border-none text-body-sm [color-scheme:dark] cursor-pointer flex-1" aria-label="Filtrar por data específica" />{o && <button onClick={() => g("")} className="text-[var(--text-tertiary)] hover:text-white transition-colors shrink-0"><Gt size={14} /></button>}</div><div className="flex w-full md:w-auto items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)]"><Je size={13} className="text-[var(--accent)] shrink-0" /><select value={y} onChange={x => S(x.target.value)} className="flex-1 outline-none cursor-pointer bg-transparent text-[var(--text-tertiary)] border-none text-body-sm font-medium w-full" aria-label="Filtrar por evento competitivo"><option value="Todos" className="bg-[#141416]">Todos Eventos</option>{N.championships.map(x => <option value={x} className="bg-[#141416]" key={x}>{x}</option>)}</select></div><div className="flex w-full md:w-auto items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)]"><_Component19 size={13} className="text-[var(--accent)] shrink-0" /><select value={u} onChange={x => w(x.target.value)} className="flex-1 outline-none cursor-pointer bg-transparent text-[var(--text-tertiary)] border-none text-body-sm font-medium w-full" aria-label="Filtrar por mapa"><option value="Todos" className="bg-[#141416]">Todos Mapas</option>{N.maps.map(x => <option value={x} className="bg-[#141416]" key={x}>{x}</option>)}</select></div></div></header><main className="ctracker-workspace-main flex-1 p-8 custom-scrollbar">{l ? <div className="h-full w-full flex flex-col items-center justify-center space-y-6"><div className="w-12 h-12 rounded-lg border-2 border-[var(--accent)]/20 border-t-[var(--accent)] animate-spin" /><p className="text-label animate-pulse text-[var(--accent)]">Processando Métricas Coletivas</p></div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-reveal pb-20"><_Component31 title="Kills" data={i.kills} dataKey="kills" color="#10B981" /><_Component31 title="Assists" data={i.assists} dataKey="assists" color="#FF6B72" /><_Component31 title="Dano Causado" data={i.dano} dataKey="dano" color="#F59E0B" /><_Component31 title="Mortes" data={i.mortes} dataKey="mortes" color="#EF4444" /><_Component31 title="Derrubados" data={i.derrubados} dataKey="derrubados" color="#F97316" /><_Component31 title="Revividos" data={i.revividos} dataKey="revividos" color="#3B82F6" /><_Component31 title="Cura Média por Queda" data={i.cura} dataKey="curaMedia" color="#EC4899" subtitle="Média de cura do jogador" /><_Component31 title="HEADSHOTS" data={i.headshots} dataKey="headshotsMedia" color="#06B6D4" subtitle="Média de headshots por queda" /></div>}</main></div></Ct>;
};
const _Component35 = ({
  onSquadChange: r
}) => {
  const {
    user: c
  } = We();
  const [l, j] = s.useState([]);
  const [o, g] = s.useState("");
  const [y, S] = s.useState(true);
  const [u, w] = s.useState("");
  s.useEffect(() => {
    if (c) {
      P();
    }
  }, [c]);
  const P = async () => {
    S(true);
    try {
      const {
        data: f,
        error: N
      } = await K.from("squad_jogadores").select("id, nome_oficial").eq("user_id", c?.id).order("criado_em", {
        ascending: true
      });
      if (N) {
        throw N;
      }
      j(f || []);
      r(f || []);
    } catch (f) {
      console.error("Erro ao buscar squad:", f);
    } finally {
      S(false);
    }
  };
  const k = async f => {
    f.preventDefault();
    if (!c || !o.trim()) {
      return;
    }
    if (l.length >= 6) {
      w("Máximo de 6 jogadores atingido.");
      setTimeout(() => w(""), 3000);
      return;
    }
    const N = o.trim().toUpperCase();
    if (l.some(i => i.nome_oficial === N)) {
      w("Jogador já cadastrado!");
      setTimeout(() => w(""), 3000);
      return;
    }
    try {
      const {
        data: i,
        error: m
      } = await K.from("squad_jogadores").insert([{
        user_id: c.id,
        nome_oficial: N
      }]).select("id, nome_oficial").single();
      if (m) {
        throw m;
      }
      const x = [...l, i];
      j(x);
      r(x);
      g("");
    } catch (i) {
      console.error("Erro ao adicionar jogador:", i);
      w("Erro ao salvar jogador.");
      setTimeout(() => w(""), 3000);
    }
  };
  const D = async f => {
    if (c) {
      try {
        const {
          error: N
        } = await K.from("squad_jogadores").delete().eq("id", f).eq("user_id", c.id);
        if (N) {
          throw N;
        }
        const i = l.filter(m => m.id !== f);
        j(i);
        r(i);
      } catch (N) {
        console.error("Erro ao remover jogador:", N);
      }
    }
  };
  return <div className="card p-6 mb-6 !bg-[#141416] border border-[#27272A] relative"><div className="flex items-center gap-3 mb-6"><div className="p-2.5 rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]"><Mt size={20} /></div><div><h3 className="text-heading text-lg tracking-wide uppercase">Jogadores Oficiais do Squad</h3><p className="text-label mt-1">Cadastre nomes para evitar duplicações por erros do OCR.</p></div></div>{u && <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-sm px-4 py-2 rounded-lg mb-4 flex items-center gap-2"><Ge size={16} /> {u}</div>}<div className="mb-6 flex flex-wrap gap-2">{l.map(f => <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46]" key={f.id}><span className="text-sm font-bold uppercase">{f.nome_oficial}</span><button onClick={() => D(f.id)} className="text-[#A1A1AA] hover:text-[#EF4444] transition-colors p-0.5"><Ye size={14} /></button></div>)}{l.length === 0 && !y && <p className="text-[#A1A1AA] text-sm italic">Nenhum jogador cadastrado. Adicione seu squad abaixo!</p>}</div><form onSubmit={k} className="flex gap-2"><input type="text" placeholder="Nome Oficial do Jogador..." value={o} onChange={f => g(f.target.value)} maxLength={20} disabled={l.length >= 6} className="flex-1 bg-[#18181B] border border-[#27272A] rounded-lg px-4 text-sm text-[#FAFAFA] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none disabled:opacity-50" /><button type="submit" disabled={l.length >= 6 || !o.trim()} className="btn-primary py-2 flex items-center gap-2 disabled:opacity-50"><Kt size={16} /> Adicionar</button></form></div>;
};
function js(r, c) {
  const l = mo(r);
  if (!c || c.length === 0) {
    return l;
  }
  const j = c.find(S => S === l);
  if (j) {
    return j;
  }
  const o = (S, u) => {
    const w = Array.from({
      length: S.length + 1
    }, (P, k) => Array.from({
      length: u.length + 1
    }, (D, f) => k === 0 ? f : f === 0 ? k : 0));
    for (let P = 1; P <= S.length; P++) {
      for (let k = 1; k <= u.length; k++) {
        w[P][k] = S[P - 1] === u[k - 1] ? w[P - 1][k - 1] : 1 + Math.min(w[P - 1][k], w[P][k - 1], w[P - 1][k - 1]);
      }
    }
    return w[S.length][u.length];
  };
  let g = "";
  let y = 999;
  c.forEach(S => {
    const u = o(l, S);
    if (u < y) {
      y = u;
      g = S;
    }
  });
  if (y <= 2) {
    return g;
  } else {
    return l;
  }
}
function mo(r) {
  let c = r.replace(/^#+/, "").trim();
  c = c.replace(/[^\x00-\x7F]+/g, "").trim();
  c = c.replace(/\s+/g, " ").trim();
  const l = c.split(" ").filter(g => g.length > 0);
  if (l.length === 0) {
    return "";
  }
  let o = l[l.length - 1].toUpperCase();
  if (o === "IAPA") {
    o = "JAPA";
  }
  return o;
}
const po = [{
  titulo: "MVP da Partida",
  descricao: "Alcançou 15 ou mais kills em uma única partida.",
  icone: "Sword",
  condicao: r => r.kills >= 15
}, {
  titulo: "Dano Massivo",
  descricao: "Causou 2000 ou mais de dano em uma única partida.",
  icone: "Zap",
  condicao: r => r.dano >= 2000
}, {
  titulo: "Booyah Master",
  descricao: "Conquistou o 1° lugar (Booyah) na partida.",
  icone: "Trophy",
  condicao: r => r.colocacao === 1
}, {
  titulo: "Anjo do Squad",
  descricao: "Ressurgiu 3 ou mais companheiros na mesma partida.",
  icone: "HeartPulse",
  condicao: r => r.ressurgimentos >= 3
}, {
  titulo: "Destruidor",
  descricao: "Derrubou 10 ou mais inimigos em uma única partida.",
  icone: "Flame",
  condicao: r => r.derrubados >= 10
}, {
  titulo: "Ghost",
  descricao: "Terminou a partida sem morrer (mortes = 0) e ficou no Top 3.",
  icone: "Shield",
  condicao: r => r.mortes === 0 && r.colocacao <= 3
}, {
  titulo: "Mestre da Assistência",
  descricao: "Concedeu 8 ou mais assistências no mesmo jogo.",
  icone: "Users",
  condicao: r => r.assistencias >= 8
}];
async function uo(r, c) {
  const l = [];
  const {
    data: j
  } = await K.from("conquistas_jogadores").select("titulo").eq("jogador_id", r);
  const o = new Set((j || []).map(u => u.titulo));
  const g = po.filter(u => !o.has(u.titulo) && u.condicao(c));
  if (g.length === 0) {
    return [];
  }
  const y = g.map(u => ({
    jogador_id: r,
    titulo: u.titulo,
    descricao: u.descricao,
    icone: u.icone
  }));
  const {
    error: S
  } = await K.from("conquistas_jogadores").insert(y);
  if (!S) {
    g.forEach(u => l.push(u.titulo));
  }
  return l;
}
async function ho(r, c, l) {
  const j = {};
  if (l) {
    j.Authorization = "Bearer " + l;
  }
  let o = r;
  const g = r.length * 3 / 4;
  if (g >= 204800) {
    console.log("[Vision] Imagem com " + Math.round(g / 1024) + "KB >= 200KB. Redimensionando no frontend...");
    try {
      o = await new Promise((u, w) => {
        const P = new Image();
        P.onload = () => {
          let D = P.width;
          let f = P.height;
          if (D > 800) {
            const h = 800 / D;
            D = 800;
            f = Math.round(f * h);
          }
          const N = document.createElement("canvas");
          N.width = D;
          N.height = f;
          const i = N.getContext("2d");
          if (!i) {
            w(new Error("Falha ao obter contexto 2D do canvas"));
            return;
          }
          i.drawImage(P, 0, 0, D, f);
          const x = N.toDataURL("image/jpeg", 0.7).replace(/^data:image\/[a-z]+;base64,/, "");
          u(x);
        };
        P.onerror = () => {
          w(new Error("Erro ao carregar imagem para redimensionamento"));
        };
        const k = r.startsWith("data:") ? r : "data:image/jpeg;base64," + r;
        P.src = k;
      });
      console.log("[Vision] Imagem redimensionada com sucesso. Novo tamanho: " + Math.round(o.length * 3 / 4 / 1024) + "KB");
    } catch (u) {
      console.error("[Vision] Erro ao redimensionar imagem, enviando original:", u);
      o = r;
    }
  }
  const {
    data: y,
    error: S
  } = await K.functions.invoke("ocr", {
    body: {
      image: o
    },
    headers: Object.keys(j).length > 0 ? j : undefined
  });
  if (S) {
    const u = S?.context?.status || S?.status;
    throw u === 429 ? new Error("Você atingiu o limite de leituras por hora. Aguarde para continuar.") : u === 401 ? new Error("Você precisa estar logado para usar esta funcionalidade.") : new Error("Erro ao processar o print. Tente novamente.");
  }
  return JSON.stringify(y ?? {});
}
const bo = {
  BERMUDA: "/maps/Bermuda_grid.jpg",
  KALAHARI: "/maps/Kalahari_grid.jpg",
  "NOVA TERRA": "/maps/Nova_Terra_grid.jpg",
  PURGATORIO: "/maps/Purgatory_grid.jpg",
  PURGATÓRIO: "/maps/Purgatory_grid.jpg",
  PURGATORY: "/maps/Purgatory_grid.jpg",
  SOLARA: "/maps/Solara_grid.jpg"
};
const fo = r => r.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const _Component39 = ({
  isOpen: r,
  onClose: c,
  mapa: l,
  partida_id: j
}) => {
  const {
    user: o
  } = We();
  const [g, y] = s.useState([]);
  const [S, u] = s.useState("morte");
  const [w, P] = s.useState(null);
  const [k, D] = s.useState(false);
  const [f, N] = s.useState(null);
  const i = s.useRef(null);
  const m = fo(l || "");
  const x = bo[m];
  s.useEffect(() => {
    if (r) {
      y([]);
      u("morte");
      P(null);
      D(false);
    }
  }, [r]);
  if (!r) {
    return null;
  }
  const h = _ => {
    const q = i.current;
    if (!q) {
      return;
    }
    const V = q.getBoundingClientRect();
    const H = (_.clientX - V.left) / V.width * 100;
    const je = (_.clientY - V.top) / V.height * 100;
    const Ne = Math.max(0, Math.min(100, H));
    const De = Math.max(0, Math.min(100, je));
    if (S === "rota") {
      let be = w;
      let ue = 1;
      if (be) {
        ue = g.filter(M => M.tipo === "rota" && M.rota_grupo === be).length + 1;
      } else {
        be = crypto.randomUUID();
        P(be);
      }
      y(ae => [...ae, {
        x: Ne,
        y: De,
        tipo: "rota",
        rota_ordem: ue,
        rota_grupo: be
      }]);
    } else {
      y(be => [...be, {
        x: Ne,
        y: De,
        tipo: S
      }]);
    }
  };
  const R = _ => {
    const q = i.current;
    if (!q) {
      return;
    }
    const V = q.getBoundingClientRect();
    N({
      x: (_.clientX - V.left) / V.width * 100,
      y: (_.clientY - V.top) / V.height * 100
    });
  };
  const v = () => {
    if (g.length === 0) {
      return;
    }
    const _ = g[g.length - 1];
    y(q => q.slice(0, -1));
    if (_.tipo === "rota" && _.rota_grupo) {
      if (g.filter(V => V.tipo === "rota" && V.rota_grupo === _.rota_grupo).length <= 1) {
        P(null);
      } else {
        P(_.rota_grupo);
      }
    }
  };
  const p = () => {
    P(null);
  };
  const T = () => {
    if (w) {
      y(_ => _.filter(q => q.rota_grupo !== w));
      P(null);
    }
  };
  const Y = () => {
    y([]);
    P(null);
  };
  const X = async () => {
    if (g.length !== 0 && !!o && !!j) {
      D(true);
      try {
        const {
          error: _
        } = await K.from("death_locations").insert(g.map(q => ({
          user_id: o.id,
          partida_id: j,
          mapa: m,
          x_percent: q.x,
          y_percent: q.y,
          tipo: q.tipo,
          rota_ordem: q.rota_ordem || null,
          rota_grupo: q.rota_grupo || null
        })));
        if (_) {
          throw _;
        }
        c();
      } catch (_) {
        console.error("Erro ao salvar pontos de morte:", _);
        alert("Erro ao salvar localizações. Tente novamente.");
      } finally {
        D(false);
      }
    }
  };
  return <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"><div className="card w-full max-w-4xl p-6 pb-[calc(80px+env(safe-area-inset-bottom))] md:pb-6 relative animate-reveal flex flex-col max-h-screen md:max-h-[95vh] overflow-y-auto"><div className="flex justify-between items-center mb-4"><div><h3 className="text-heading text-lg flex items-center gap-2"><_Component10 className="text-[var(--accent)]" />Mapa de Marcação — {l}</h3><p className="text-label mt-1">Selecione uma ferramenta e clique no mapa para registrar os eventos da queda.</p></div><button onClick={c} className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-tertiary)]" disabled={k}><Ye size={20} /></button></div><div className="flex flex-wrap justify-between items-center gap-4 mb-4 p-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl"><div className="flex gap-2"><button type="button" onClick={() => {
            if (w) {
              P(null);
            }
            u("morte");
          }} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${S === "morte" ? "bg-[#EF4444] text-white shadow-sm scale-105" : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)]"}`}><_Component32 size={14} /> 💀 Morte</button><button type="button" onClick={() => {
            if (w) {
              P(null);
            }
            u("trocacao");
          }} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${S === "trocacao" ? "bg-[#F59E0B] text-white shadow-sm scale-105" : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)]"}`}><_Component33 size={14} /> ⚔️ Trocação</button><button type="button" onClick={() => u("rota")} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${S === "rota" ? "bg-[#FF3038] text-white shadow-sm scale-105" : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)]"}`}><_Component34 size={14} /> 🗺️ Rota</button></div>{S === "rota" && w && <div className="flex items-center gap-2 animate-reveal"><span className="text-xs text-[#FF3038] font-bold animate-pulse flex items-center gap-1 mr-2">● Editando Rota Ativa</span><button type="button" onClick={T} className="px-2.5 py-1 rounded bg-red-950/50 hover:bg-red-900 border border-red-500/30 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-all">Cancelar Rota</button><button type="button" onClick={p} className="px-2.5 py-1 rounded bg-[#FF3038] hover:bg-[#4649cc] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow">Finalizar Rota</button></div>}</div><div className="flex-1 overflow-hidden relative rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-center min-h-[300px]">{x ? <div style={{
          position: "relative",
          display: "inline-block"
        }}><img ref={i} src={x} alt={`Mapa ${l}`} style={{
            display: "block",
            width: "100%"
          }} className={`max-w-full max-h-[60vh] object-contain transition-opacity ${k ? "opacity-50" : ""}`} draggable={false} /><div onClick={h} onMouseMove={R} onMouseLeave={() => N(null)} style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            cursor: "crosshair",
            zIndex: 4
          }} /><svg style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2.5
          }}><defs><marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#FF3038" /></marker><marker id="arrow-dashed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#FF3038" opacity="0.6" /></marker></defs>{(() => {
              const _ = new Map();
              g.forEach(q => {
                if (q.tipo === "rota" && q.rota_grupo) {
                  if (!_.has(q.rota_grupo)) {
                    _.set(q.rota_grupo, []);
                  }
                  _.get(q.rota_grupo).push(q);
                }
              });
              _.forEach(q => {
                q.sort((V, H) => (V.rota_ordem || 0) - (H.rota_ordem || 0));
              });
              return Array.from(_.entries()).map(([q, V]) => {
                if (V.length < 2) {
                  return null;
                }
                const H = [];
                for (let je = 0; je < V.length - 1; je++) {
                  const Ne = V[je];
                  const De = V[je + 1];
                  const be = je === V.length - 2;
                  H.push(<line x1={`${Ne.x}%`} y1={`${Ne.y}%`} x2={`${De.x}%`} y2={`${De.y}%`} stroke="#FF3038" strokeWidth="3" markerEnd={be ? "url(#arrow)" : undefined} key={`${q}-${je}`} />);
                }
                return <g key={q}>{H}</g>;
              });
            })()}{(() => {
              if (S !== "rota" || !w || !f) {
                return null;
              }
              const _ = g.filter(V => V.tipo === "rota" && V.rota_grupo === w);
              if (_.length === 0) {
                return null;
              }
              _.sort((V, H) => (V.rota_ordem || 0) - (H.rota_ordem || 0));
              const q = _[_.length - 1];
              return <line x1={`${q.x}%`} y1={`${q.y}%`} x2={`${f.x}%`} y2={`${f.y}%`} stroke="#FF3038" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-dashed)" />;
            })()}</svg>{g.map((_, q) => _.tipo === "morte" ? <div style={{
            position: "absolute",
            left: `${_.x}%`,
            top: `${_.y}%`,
            transform: "translate(-50%, -50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#EF4444",
            border: "2.5px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)",
            zIndex: 3,
            pointerEvents: "none"
          }} title="Morte" key={q}>💀</div> : _.tipo === "trocacao" ? <div style={{
            position: "absolute",
            left: `${_.x}%`,
            top: `${_.y}%`,
            transform: "translate(-50%, -50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#F59E0B",
            border: "2.5px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)",
            zIndex: 3,
            pointerEvents: "none"
          }} title="Trocação" key={q}>⚔️</div> : _.tipo === "rota" ? <div style={{
            position: "absolute",
            left: `${_.x}%`,
            top: `${_.y}%`,
            transform: "translate(-50%, -50%)",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#FF3038",
            border: "2.5px solid white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            zIndex: 3,
            pointerEvents: "none"
          }} title={`Rota - Ponto ${_.rota_ordem}`} key={q} /> : null)}{f && (S === "morte" ? <div style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: "translate(-50%, -50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "2px dashed #EF4444",
            background: "rgba(239, 68, 68, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            pointerEvents: "none",
            zIndex: 3
          }}>💀</div> : S === "trocacao" ? <div style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: "translate(-50%, -50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "2px dashed #F59E0B",
            background: "rgba(245, 158, 11, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            pointerEvents: "none",
            zIndex: 3
          }}>⚔️</div> : S === "rota" ? <div style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: "translate(-50%, -50%)",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            border: "2px dashed #FF3038",
            background: "rgba(255, 48, 56, 0.3)",
            pointerEvents: "none",
            zIndex: 3
          }} /> : null)}</div> : <div className="text-center p-8"><p className="text-[var(--text-secondary)]">Mapa "{l}" não possui imagem configurada.</p></div>}</div><div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 sticky bottom-0 bg-[var(--bg-surface)] pt-4 pb-2 border-t border-[var(--border-default)] z-10"><div className="text-sm font-medium text-[var(--text-secondary)] flex gap-4"><span>Mortes: <strong className="text-[#EF4444]">{g.filter(_ => _.tipo === "morte").length}</strong></span><span>Trocações: <strong className="text-[#F59E0B]">{g.filter(_ => _.tipo === "trocacao").length}</strong></span><span>Rotas: <strong className="text-[#FF3038]">{new Set(g.filter(_ => _.tipo === "rota").map(_ => _.rota_grupo)).size}</strong></span></div><div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto"><button type="button" onClick={Y} disabled={g.length === 0 || k} className="btn-ghost text-red-400 hover:text-red-300 hover:bg-red-950/20 flex items-center gap-2 transition-all px-3 py-2 rounded-lg" title="Limpar todas as marcações"><_Component15 size={16} /> Limpar Tudo</button><button type="button" onClick={v} disabled={g.length === 0 || k} className="btn-ghost flex items-center gap-2 transition-all px-3 py-2 rounded-lg" title="Desfazer a última marcação"><Ha size={16} /> Desfazer</button><button type="button" onClick={c} disabled={k} className="btn-ghost flex items-center gap-2 transition-all px-3 py-2 rounded-lg">Pular</button><button type="button" onClick={X} disabled={g.length === 0 || k || !x} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-102 active:scale-98"><Ra size={16} /> Salvar Queda</button></div></div></div></div>;
};
const vo = ["BERMUDA", "PURGATORIO", "KALAHARI", "ALPINE", "NOVA TERRA", "SOLARA"];
const jo = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const yo = ["FASE DE GRUPOS", "QUALIFY", "SEMI", "FINAL"];
const _Component36 = ({
  label: r,
  id: c,
  type: l = "text",
  value: j,
  onChange: o,
  required: g,
  placeholder: y,
  className: S = "rounded-lg"
}) => <div className="flex flex-col gap-1.5 animate-reveal w-full"><label htmlFor={c} className="text-label font-medium text-[var(--text-secondary)] flex items-center gap-1.5">{r} {g && <span className="text-rose-500">*</span>}</label><div className="relative"><input id={c} type={l} value={j} placeholder={y} min={l === "number" ? "0" : undefined} onChange={u => {
      const w = u.target.value;
      if (l !== "number" || !(parseInt(w) < 0)) {
        o(w);
      }
    }} className={`input-base px-4 border-[var(--border-default)] bg-[var(--bg-surface)] ${S}`} /></div></div>;
const Ka = ({
  label: r,
  id: c,
  value: l,
  onChange: j,
  options: o,
  required: g,
  className: y = "rounded-lg"
}) => <div className="flex flex-col gap-1.5 animate-reveal w-full"><label htmlFor={c} className="text-label font-medium text-[var(--text-secondary)] flex items-center gap-1.5">{r} {g && <span className="text-rose-500">*</span>}</label><select id={c} value={l} onChange={S => j(S.target.value)} className={`input-base px-4 border-[var(--border-default)] bg-[var(--bg-surface)] appearance-none ${y}`} style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717A' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "0.6rem"
  }}><option value="">Selecionar</option>{o.map(S => <option value={S} key={S}>{S}</option>)}</select></div>;
const No = ({
  message: r,
  type: c
}) => {
  const l = {
    success: {
      border: "#10B98130",
      color: "#10B981",
      Icon: _Component1
    },
    error: {
      border: "#F43F5E30",
      color: "#F43F5E",
      Icon: Gt
    }
  }[c || "success"];
  return <div className="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 bg-[var(--bg-surface)] border rounded-md animate-reveal shadow-2xl" style={{
    borderColor: l.border
  }}><l.Icon size={16} color={l.color} /><span className="text-[var(--text-primary)] text-caption font-semibold">{r}</span></div>;
};
const wo = {
  1: 12,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
  11: 0,
  12: 0
};
const So = () => {
  const {
    user: r
  } = We();
  const c = Et();
  const [l, j] = s.useState({
    data: new Date().toISOString().split("T")[0],
    campeonato: "",
    mapa: "",
    rodada: "",
    colocacao: "",
    equipe: "SQUAD PRINCIPAL",
    totalKillsManual: "0"
  });
  const [o, g] = s.useState([{
    nome: "",
    kills: "0",
    assistencias: "0",
    derrubados: "0",
    dano: "0",
    morte: "0",
    revividos: "0",
    cura: "0",
    headshot_percent: "0"
  }, {
    nome: "",
    kills: "0",
    assistencias: "0",
    derrubados: "0",
    dano: "0",
    morte: "0",
    revividos: "0",
    cura: "0",
    headshot_percent: "0"
  }, {
    nome: "",
    kills: "0",
    assistencias: "0",
    derrubados: "0",
    dano: "0",
    morte: "0",
    revividos: "0",
    cura: "0",
    headshot_percent: "0"
  }, {
    nome: "",
    kills: "0",
    assistencias: "0",
    derrubados: "0",
    dano: "0",
    morte: "0",
    revividos: "0",
    cura: "0",
    headshot_percent: "0"
  }]);
  const [y, S] = s.useState([]);
  const [u, w] = s.useState(false);
  const [P, k] = s.useState(false);
  const {
    subscription: D,
    trialExpiresAt: f
  } = ns(r?.id);
  const N = D?.ativo ?? false;
  const [i, m] = s.useState(null);
  const [x, h] = s.useState(false);
  const [R, v] = s.useState(false);
  const [p, T] = s.useState(false);
  const [Y, X] = s.useState(null);
  const [_, q] = s.useState({
    quebraCall: null,
    resultadoCall: null,
    qualCall: ""
  });
  const [V, H] = s.useState(false);
  const [je, Ne] = s.useState("");
  const [De, be] = s.useState("");
  const ue = s.useRef(null);
  const ae = wo[parseInt(l.colocacao)] || 0;
  const M = parseInt(l.totalKillsManual) || 0;
  const A = ae + M;
  const C = f ? new Date(f) > new Date() : false;
  const z = N || C;
  s.useEffect(() => {
    const W = o.reduce((Z, ee) => Z + (parseInt(ee.kills) || 0), 0);
    j(Z => ({
      ...Z,
      totalKillsManual: String(W)
    }));
  }, [o]);
  const te = (W, Z) => {
    m({
      message: W,
      type: Z
    });
    setTimeout(() => m(null), 4000);
  };
  const pe = (W, Z, ee) => {
    const Fe = [...o];
    Fe[W] = {
      ...Fe[W],
      [Z]: ee
    };
    g(Fe);
  };
  const Ae = () => {
    j({
      data: new Date().toISOString().split("T")[0],
      campeonato: "",
      mapa: "",
      rodada: "",
      colocacao: "",
      equipe: "SQUAD PRINCIPAL",
      totalKillsManual: "0"
    });
    g([{
      nome: "",
      kills: "0",
      assistencias: "0",
      derrubados: "0",
      dano: "0",
      morte: "0",
      revividos: "0",
      cura: "0",
      headshot_percent: "0"
    }, {
      nome: "",
      kills: "0",
      assistencias: "0",
      derrubados: "0",
      dano: "0",
      morte: "0",
      revividos: "0",
      cura: "0",
      headshot_percent: "0"
    }, {
      nome: "",
      kills: "0",
      assistencias: "0",
      derrubados: "0",
      dano: "0",
      morte: "0",
      revividos: "0",
      cura: "0",
      headshot_percent: "0"
    }, {
      nome: "",
      kills: "0",
      assistencias: "0",
      derrubados: "0",
      dano: "0",
      morte: "0",
      revividos: "0",
      cura: "0",
      headshot_percent: "0"
    }]);
    q({
      quebraCall: null,
      resultadoCall: null,
      qualCall: ""
    });
    X(null);
    Ne("");
    be("");
  };
  const Oe = W => new Promise((Z, ee) => {
    const Fe = new Image();
    Fe.src = URL.createObjectURL(W);
    Fe.onload = () => {
      const Xe = document.createElement("canvas");
      let Pe = Fe.width;
      let he = Fe.height;
      const fe = 1200;
      if (Pe > he) {
        if (Pe > fe) {
          he *= fe / Pe;
          Pe = fe;
        }
      } else if (he > fe) {
        Pe *= fe / he;
        he = fe;
      }
      Xe.width = Pe;
      Xe.height = he;
      Xe.getContext("2d")?.drawImage(Fe, 0, 0, Pe, he);
      const Dt = Xe.toDataURL("image/jpeg", 0.8).split(",")[1];
      Z(Dt);
      URL.revokeObjectURL(Fe.src);
    };
    Fe.onerror = ee;
  });
  const G = async W => {
    const Z = W.target.files?.[0];
    if (Z) {
      k(true);
      try {
        const ee = await Oe(Z);
        const Fe = Z.type || "image/jpeg";
        const {
          data: {
            session: Xe
          }
        } = await K.auth.getSession();
        const Pe = await ho(ee, Fe, Xe?.access_token);
        if (!Pe || Pe === "{}") {
          te("Não foi possível extrair dados da imagem.", "error");
          return;
        }
        let he;
        try {
          const fe = Pe.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
          he = JSON.parse(fe);
        } catch {
          console.error("[OCR] JSON inválido recebido:", Pe);
          te("Resposta inválida. Tente novamente.", "error");
          return;
        }
        j(fe => ({
          ...fe,
          mapa: he.mapa,
          colocacao: String(he.posicao_squad ?? he.colocacao ?? "")
        }));
        g(fe => fe.map((qe, Dt) => {
          const Me = he.jogadores[Dt];
          if (Me) {
            return {
              ...qe,
              nome: Me.nome !== `Jogador ${Dt + 1}` ? js(Me.nome, y.map(Ht => Ht.nome_oficial)) : qe.nome,
              kills: String(Me.kills),
              assistencias: String(Me.assists),
              derrubados: String(Me.derrubados),
              dano: String(Me.dano),
              morte: String(Me.mortes ?? 0),
              revividos: String(Me.reviv ?? Me.ressurgimentos ?? 0),
              cura: String(Me.cura ?? 0),
              headshot_percent: String(Me.headshot_percent ?? 0)
            };
          } else {
            return qe;
          }
        }));
        if (r) {
          await K.from("ocr_usage").insert({
            user_id: r.id
          });
        }
        te("Screenshot lida! Revise os dados antes de salvar.", "success");
      } catch (ee) {
        te(ee.message || "Erro ao processar screenshot.", "error");
      } finally {
        k(false);
        if (ue.current) {
          ue.current.value = "";
        }
      }
    }
  };
  const ce = async () => {
    if (!!r && !u) {
      if (!l.campeonato || !l.mapa || !l.rodada || !l.colocacao) {
        te("Preencha os dados da partida", "error");
        return;
      }
      if (o.some(W => !W.nome || W.nome.trim() === "")) {
        te("Preencha o nome de todos os jogadores", "error");
        return;
      }
      w(true);
      try {
        const W = M;
        const Z = A;
        const {
          data: ee,
          error: Fe
        } = await K.from("partidas_geral").insert({
          user_id: r.id,
          data: l.data,
          campeonato: l.campeonato.toUpperCase(),
          rodada: l.rodada,
          mapa: l.mapa,
          equipe: l.equipe,
          colocacao: Math.max(1, parseInt(l.colocacao) || 1),
          kill: Math.max(0, W),
          pontos_posicao: Math.max(0, ae),
          pontos_total: Math.max(0, Z),
          booyah: parseInt(l.colocacao) === 1
        }).select("id").single();
        if (Fe) {
          throw Fe;
        }
        const Xe = o.map(he => {
          const fe = js(he.nome, y.map(qe => qe.nome_oficial));
          return {
            user_id: r.id,
            partida_id: ee?.id,
            data: l.data,
            equipe: l.equipe,
            modo: "Campeonato",
            mapa: l.mapa,
            campeonato: l.campeonato.toUpperCase(),
            rodada: l.rodada,
            posicao: Math.max(1, parseInt(l.colocacao) || 1),
            player: fe || "JOGADOR DESCONHECIDO",
            kill: Math.max(0, parseInt(he.kills) || 0),
            morte: Math.max(0, parseInt(he.morte) || 0),
            assistencia: Math.max(0, parseInt(he.assistencias) || 0),
            queda: 0,
            dano_causado: Math.max(0, parseInt(he.dano) || 0),
            derrubados: Math.max(0, parseInt(he.derrubados) || 0),
            ressurgimento: Math.max(0, parseInt(he.revividos) || 0),
            cura: Math.max(0, parseInt(he.cura) || 0),
            headshots: Math.round((parseInt(he.kills) || 0) * ((parseFloat(he.headshot_percent) || 0) / 100))
          };
        });
        const {
          error: Pe
        } = await K.from("performance_jogadores").insert(Xe);
        if (Pe) {
          throw Pe;
        }
        if (ee?.id) {
          X(ee.id);
          be(ee.id);
          Ne(l.mapa);
          T(true);
        }
        te("Squad Salvo com Sucesso!", "success");
        for (const he of o) {
          const fe = r.id;
          const qe = {
            kills: Math.max(0, parseInt(he.kills) || 0),
            dano: Math.max(0, parseInt(he.dano) || 0),
            assistencias: Math.max(0, parseInt(he.assistencias) || 0),
            derrubados: Math.max(0, parseInt(he.derrubados) || 0),
            ressurgimentos: Math.max(0, parseInt(he.revividos) || 0),
            mortes: Math.max(0, parseInt(he.morte) || 0),
            colocacao: Math.max(1, parseInt(l.colocacao) || 1)
          };
          (await uo(fe, qe)).forEach(Me => te(`🏆 Conquista: ${Me}`, "success"));
        }
      } catch (W) {
        te(W.message || "Erro ao salvar", "error");
      } finally {
        w(false);
      }
    }
  };
  const Be = () => {
    T(false);
    H(true);
  };
  const ft = async () => {
    if (Y) {
      w(true);
      try {
        const {
          error: W
        } = await K.from("partidas_geral").update({
          quebra_call: true,
          resultado_call: _.resultadoCall,
          qual_call: _.qualCall ? _.qualCall.toUpperCase() : null
        }).eq("id", Y);
        if (W) {
          throw W;
        }
        Be();
      } catch (W) {
        te(W.message || "Erro ao salvar detalhes", "error");
      } finally {
        w(false);
      }
    }
  };
  const gt = async () => {
    if (Y) {
      q(W => ({
        ...W,
        quebraCall: false
      }));
      w(true);
      try {
        const {
          error: W
        } = await K.from("partidas_geral").update({
          quebra_call: false,
          resultado_call: null,
          qual_call: null
        }).eq("id", Y);
        if (W) {
          throw W;
        }
        Be();
      } catch (W) {
        te(W.message || "Erro", "error");
      } finally {
        w(false);
      }
    }
  };
  const Wt = () => {
    Be();
  };
  const oa = () => {
    H(false);
    Ae();
  };
  const ot = async () => {
    if (!!r && !R) {
      v(true);
      try {
        const [W, Z, ee] = await Promise.all([K.from("performance_jogadores").delete().eq("user_id", r.id), K.from("partidas_geral").delete().eq("user_id", r.id), K.from("conquistas_jogadores").delete().eq("jogador_id", r.id)]);
        if (W.error) {
          throw W.error;
        }
        if (Z.error) {
          throw Z.error;
        }
        if (ee.error) {
          console.warn("[RESET] Erro ao limpar conquistas:", ee.error);
        }
        te("Tabela e histórico reiniciados!", "success");
        h(false);
        c("/");
      } catch (W) {
        te(W.message || "Erro ao reiniciar tabela", "error");
      } finally {
        v(false);
      }
    }
  };
  return <Ct activeTab="input" isSubscriber={N}><div className="ctracker-input-page flex-1 font-['Inter',sans-serif] custom-scrollbar">{i && <No message={i.message} type={i.type} />}<header className="ctracker-input-header sticky top-0 z-20 bg-[var(--bg-main)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"><div className="w-full px-6 h-16 flex items-center justify-between"><div className="flex items-center gap-4"><button onClick={() => c("/")} className="p-2 border border-[var(--border-default)] rounded-md hover:bg-[var(--bg-hover)] transition-colors"><_Component4 size={18} className="text-[var(--text-secondary)]" /></button><div className="flex flex-col"><h1 className="text-body font-bold text-[var(--text-primary)]">Inserir Partida</h1><p className="text-label font-medium text-[var(--text-tertiary)]">Preencha os dados do squad</p></div></div><div className="flex items-center gap-3"><input ref={ue} type="file" accept="image/*" className="hidden" onChange={G} /><button onClick={() => h(true)} className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[var(--border-default)] rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-all"><_Component15 size={14} /><span className="text-caption font-semibold md:inline hidden">Reiniciar Tabela</span></button></div></div></header><main className="ctracker-workspace-main w-full px-6 py-8 space-y-8 pb-20"><_Component35 onSquadChange={S} /><section className="animate-reveal"><div className="flex items-center gap-2 mb-4"><h2 className="text-body font-bold text-[var(--text-primary)]">Dados da partida</h2></div><div className="card p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"><_Component36 label="Data" type="date" value={l.data} onChange={W => j(Z => ({
              ...Z,
              data: W
            }))} className="rounded-lg" /><_Component36 label="Campeonato" value={l.campeonato} onChange={W => j(Z => ({
              ...Z,
              campeonato: W.trim().toUpperCase()
            }))} placeholder="Ex: LBFF" className="rounded-lg" /><Ka label="Mapa" value={l.mapa} onChange={W => j(Z => ({
              ...Z,
              mapa: W
            }))} options={vo} className="rounded-lg" /><Ka label="Rodada" value={l.rodada} onChange={W => j(Z => ({
              ...Z,
              rodada: W
            }))} options={yo} className="rounded-lg" /><Ka label="Colocação" value={l.colocacao} onChange={W => j(Z => ({
              ...Z,
              colocacao: W
            }))} options={jo} className="rounded-lg" /><_Component36 label="Kills Squad" type="number" value={l.totalKillsManual} onChange={W => j(Z => ({
              ...Z,
              totalKillsManual: W
            }))} className="rounded-lg" /><div className="flex flex-col gap-1.5 w-full"><span className="text-label font-medium text-[var(--text-secondary)]">Total de Pontos</span><div className="w-full h-[38px] flex items-center justify-center bg-[var(--accent-muted)] rounded-lg"><span className="text-xl font-bold text-[var(--accent-hover)]">{A}</span></div></div></div></section><section className="animate-reveal"><div className="flex items-center gap-2 mb-4"><h2 className="text-body font-bold text-[var(--text-primary)]">Integrantes do squad</h2></div><div className="grid grid-cols-1 md:grid-cols-4 gap-4">{o.map((W, Z) => <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 hover:border-[var(--accent-glow)] transition-all" key={Z}><div className="pb-4 mb-4 border-b border-[var(--border-subtle)]"><div className="flex flex-col gap-1.5 animate-reveal w-full"><label className="text-label font-bold text-[#F97316] flex items-center gap-1.5 uppercase tracking-wide">Jogador {Z + 1}</label><div className="relative flex items-center"><input type="text" placeholder="Nome do Player" value={W.nome} onChange={ee => pe(Z, "nome", ee.target.value.toUpperCase())} className="input-base px-4 pr-10 border-[#F97316] bg-[#1C1410] rounded-md w-full focus:ring-1 focus:ring-[#F97316] uppercase transition-all shadow-[0_0_15px_rgba(249,115,22,0.1)] font-bold text-[#F97316]" /><div className="absolute right-3 text-[#F97316] pointer-events-none"><_Component37 size={16} /></div></div><span className="text-label-sm text-[#F97316]/80 font-medium mt-0.5">Confirme o nome antes de salvar</span></div><span className="text-label text-[var(--text-tertiary)] font-medium mt-1 inline-block">Métricas de partida</span></div><div className="grid grid-cols-2 gap-3"><_Component36 label="Kills" type="number" value={W.kills} onChange={ee => pe(Z, "kills", ee)} className="rounded-md" /><_Component36 label="Assists" type="number" value={W.assistencias} onChange={ee => pe(Z, "assistencias", ee)} className="rounded-md" /><_Component36 label="Derrub." type="number" value={W.derrubados} onChange={ee => pe(Z, "derrubados", ee)} className="rounded-md" /><_Component36 label="Dano" type="number" value={W.dano} onChange={ee => pe(Z, "dano", ee)} className="rounded-md" /><_Component36 label="Mortes" type="number" value={W.morte} onChange={ee => pe(Z, "morte", ee)} className="rounded-md" /><_Component36 label="Reviv." type="number" value={W.revividos} onChange={ee => pe(Z, "revividos", ee)} className="rounded-md" /><_Component36 label="Cura" type="number" value={W.cura} onChange={ee => pe(Z, "cura", ee)} className="rounded-md" /><_Component36 label="% Capa" type="number" value={W.headshot_percent} onChange={ee => pe(Z, "headshot_percent", ee)} className="rounded-md" /></div></div>)}</div></section><div className="flex flex-col items-center gap-3 pt-8 animate-reveal max-w-2xl mx-auto w-full">{z ? <button data-tour="upload-screenshot" onClick={() => {
            ue.current?.click();
          }} disabled={P} className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3.5 font-bold text-body rounded-xl transition-all shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2">{P ? <e.Fragment><Tt size={16} className="animate-spin" /><span>LENDO...</span></e.Fragment> : <span>Ler Screenshot</span>}</button> : <div className="w-full p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl flex flex-col items-center text-center gap-4 animate-reveal"><div className="flex flex-col gap-1"><p className="text-body font-bold text-amber-500">Seu período gratuito expirou</p><p className="text-caption text-[var(--text-secondary)]">Assine um plano para continuar inserindo prints.</p></div><a href="https://wa.me/13981630304?text=Olá! Quero conhecer os planos e assinar o Celo Tracker" target="_blank" rel="noreferrer" className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white py-3 font-bold text-body rounded-lg transition-all flex items-center justify-center gap-2">Assinar via WhatsApp</a></div>}<button onClick={ce} disabled={u || o.some(W => !W.nome || W.nome.trim() === "")} className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:bg-[#27272A] disabled:text-[#A1A1AA] disabled:shadow-none disabled:cursor-not-allowed text-white py-3.5 font-bold text-body rounded-xl transition-all shadow-lg shadow-purple-500/10">{u ? "PROCESSANDO..." : "SALVAR PARTIDA"}</button></div></main>{x && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><div className="w-full max-w-sm bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 shadow-2xl animate-reveal"><div className="flex flex-col items-center text-center gap-4"><div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-2"><_Component37 size={32} /></div><h3 className="text-lg font-bold text-[var(--text-primary)]">Ação Irreversível</h3><p className="text-body text-[var(--text-secondary)] leading-relaxed">Após você aceitar, sua planilha será resetada e você não terá mais acesso aos resultados passados. Deseja continuar?</p><div className="grid grid-cols-2 gap-3 w-full mt-6"><button onClick={() => h(false)} className="px-4 py-2 border border-[var(--border-default)] rounded-md text-body font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">Cancelar</button><button onClick={ot} disabled={R} className="py-2 px-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-500 text-body font-bold hover:bg-red-500 hover:text-white transition-all disabled:opacity-50">{R ? "LIMPENDO..." : "CONFIRMAR"}</button></div></div></div></div>}{p && <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-reveal"><div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 shadow-2xl relative overflow-hidden"><div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Rs size={100} /></div><div className="flex flex-col gap-6 relative z-10"><div className="flex flex-col items-center text-center gap-2"><div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)] mb-2"><_Component38 size={24} fill="currentColor" /></div><h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">Detalhes da Partida</h3><p className="text-caption text-[var(--text-secondary)] font-medium">Preencha para análise completa do coach</p></div><div className="space-y-6 mt-4"><div className="space-y-3"><label className="text-label font-bold text-[var(--text-tertiary)] uppercase tracking-wider flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />Houve quebra de call?</label><div className="grid grid-cols-2 gap-3"><button onClick={() => q(W => ({
                    ...W,
                    quebraCall: true
                  }))} className={`py-3 rounded-lg text-caption font-bold transition-all border ${_.quebraCall === true ? "bg-[var(--accent)] border-[var(--accent)] text-white" : "bg-[var(--bg-main)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"}`}>SIM</button><button onClick={gt} className={`py-3 rounded-lg text-caption font-bold transition-all border ${_.quebraCall === false ? "bg-[var(--accent)] border-[var(--accent)] text-white" : "bg-[var(--bg-main)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"}`}>{u && _.quebraCall === false ? "Aguarde..." : "NÃO"}</button></div></div>{_.quebraCall === true && <div className="space-y-6 animate-reveal"><div className="space-y-3"><label className="text-label font-bold text-[var(--text-tertiary)] uppercase tracking-wider flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />Qual foi o resultado?</label><div className="grid grid-cols-2 gap-3"><button onClick={() => q(W => ({
                      ...W,
                      resultadoCall: "win"
                    }))} className={`py-3 rounded-lg text-caption font-bold transition-all border ${_.resultadoCall === "win" ? "bg-[var(--accent-green)] border-[var(--accent-green)] text-white" : "bg-[var(--bg-main)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"}`}>WIN</button><button onClick={() => q(W => ({
                      ...W,
                      resultadoCall: "loss"
                    }))} className={`py-3 rounded-lg text-caption font-bold transition-all border ${_.resultadoCall === "loss" ? "bg-[var(--accent-red)] border-[var(--accent-red)] text-white" : "bg-[var(--bg-main)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"}`}>LOSS</button></div></div><div className="space-y-3"><label className="text-label font-bold text-[var(--text-tertiary)] uppercase tracking-wider flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />Em qual call quebramos?</label><input type="text" value={_.qualCall} onChange={W => q(Z => ({
                    ...Z,
                    qualCall: W.target.value
                  }))} placeholder="Ex: Call do final, call da zona..." className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-body text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all" /></div></div>}</div><div className="flex flex-col gap-3 mt-4">{_.quebraCall === true && _.resultadoCall !== null && <button onClick={ft} disabled={u} className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-4 font-black uppercase tracking-widest text-caption rounded-xl shadow-xl shadow-[var(--accent-glow)] transition-all disabled:opacity-30 animate-reveal">{u ? "SALVANDO..." : "Salvar e Continuar"}</button>}<button onClick={Wt} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] text-label-sm font-bold uppercase transition-colors py-2 tracking-widest">Pular e fechar</button></div></div></div></div>}<_Component39 isOpen={V} onClose={oa} mapa={je} partida_id={De} /><style>{`
                    @keyframes reveal {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-reveal {
                        animation: reveal 0.4s ease-out forwards;
                    }
                `}</style></div></Ct>;
};
const _s = ({
  className: r = ""
}) => {
  const {
    user: c
  } = We();
  const l = o => {
    const g = o === "mensal" ? "https://pay.lowify.com.br/checkout?product_id=fm8aYN" : "https://pay.lowify.com.br/checkout?product_id=pnuhEA";
    const y = new URLSearchParams();
    if (c?.email) {
      y.append("email", c.email);
    }
    if (c?.id) {
      y.append("custom_id", c.id);
      y.append("src", c.id);
    }
    const S = y.toString();
    const u = S ? `${g}&${S}` : g;
    window.open(u, "_blank");
  };
  const _Component40 = ({
    text: o
  }) => <li style={{
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    fontSize: "0.88rem",
    color: "#A1A1A1",
    padding: "0.35rem 0"
  }}><$t size={16} color="#E21B23" style={{
      flexShrink: 0,
      marginTop: "2px"
    }} /><span>{o}</span></li>;
  return <div className={`w-full max-w-5xl mx-auto px-6 py-12 ${r}`}><div><div style={{
        textAlign: "center",
        marginBottom: "3.5rem"
      }}><div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(226, 27, 35, 0.08)",
          border: "1px solid rgba(226, 27, 35, 0.25)",
          padding: "0.3rem 1rem",
          borderRadius: "100px",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "#FF2525",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: "1.2rem"
        }}>NOSSOS PLANOS</div><h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-1px",
          color: "#EDEDED",
          marginBottom: "0.9rem"
        }}>Evolua sua squad. <span style={{
            color: "#E21B23"
          }}>Acesso Instantâneo.</span></h2><p style={{
          color: "#A1A1A1",
          fontSize: "0.98rem",
          lineHeight: 1.75,
          maxWidth: "480px",
          margin: "0 auto"
        }}>Acesso ilimitado às nossas ferramentas. Escolha o melhor plano para o seu time.</p></div><div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
        maxWidth: "800px",
        margin: "0 auto"
      }}><div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px",
          padding: "2.8rem 2.2rem",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}><div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: ".72rem",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: ".9rem"
          }}>PLANO MENSAL</div><div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2rem"
          }}><span className="line-through text-[var(--text-tertiary)] text-sm">R$15,90</span><span className="text-3xl font-black text-white">R$10,90</span><span className="text-sm text-[var(--text-tertiary)]">/mês</span><span className="bg-[#E21B23] text-white text-xs font-black px-2 py-1 rounded">31% OFF</span></div><ul style={{
            listStyle: "none",
            marginBottom: "2.5rem",
            flex: 1,
            padding: 0
          }}><_Component40 text="Leituras ilimitadas via OCR de prints" /><_Component40 text="Dashboard completo com estatísticas da squad" /><_Component40 text="Filtros avançados por campeonatos e mapas" /><_Component40 text="Gerador de link público para compartilhar" /><_Component40 text="Suporte premium integrado" /></ul><button onClick={() => l("mensal")} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.03)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: ".95rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s"
          }} onMouseEnter={o => {
            o.currentTarget.style.background = "rgba(255,255,255,0.08)";
            o.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }} onMouseLeave={o => {
            o.currentTarget.style.background = "rgba(255,255,255,0.03)";
            o.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}>Assinar Plano</button></div><div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1.5px solid #E21B23",
          borderRadius: "20px",
          padding: "2.8rem 2.2rem",
          textAlign: "left",
          position: "relative",
          boxShadow: "0 0 45px rgba(226,27,35,0.18)",
          display: "flex",
          flexDirection: "column"
        }}><div style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg,#E21B23,#B8141B)",
            color: "#fff",
            fontSize: ".68rem",
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: ".35rem 1.2rem",
            borderRadius: "100px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(226,27,35,0.4)"
          }}>MAIS POPULAR</div><div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: ".72rem",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#FF2525",
            marginBottom: ".9rem"
          }}>PLANO TRIMESTRAL</div><div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem"
          }}><span className="line-through text-[var(--text-tertiary)] text-sm">R$39,90</span><span className="text-3xl font-black text-white">R$24,90</span><span className="text-sm text-[var(--text-tertiary)]">/trimestre</span><span className="bg-[#E21B23] text-white text-xs font-black px-2 py-1 rounded">37% OFF</span></div><div style={{
            marginBottom: "2.3rem",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}><span className="text-[#22C55E] text-xs font-bold">Apenas R$8,30/mês</span></div><ul style={{
            listStyle: "none",
            marginBottom: "2.5rem",
            flex: 1,
            padding: 0
          }}><_Component40 text="Tudo do plano Mensal incluído" /><_Component40 text="Histórico completo de campeonatos" /><_Component40 text="Relatório detalhado por quedas/rodadas" /><_Component40 text="Suporte ultra-prioritário direto" /><_Component40 text="Mais economia a longo prazo" /></ul><button onClick={() => l("trimestral")} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "1rem",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(180deg,#F0242C,#E21B23)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: ".95rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 4px 18px rgba(226,27,35,0.35)"
          }} onMouseEnter={o => {
            o.currentTarget.style.transform = "translateY(-1px)";
            o.currentTarget.style.boxShadow = "0 6px 24px rgba(226,27,35,0.5)";
          }} onMouseLeave={o => {
            o.currentTarget.style.transform = "translateY(0)";
            o.currentTarget.style.boxShadow = "0 4px 18px rgba(226,27,35,0.35)";
          }}>Assinar Plano</button></div></div><div style={{
        marginTop: "4rem",
        paddingTop: "2rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        justifyContent: "center",
        gap: "3rem",
        flexWrap: "wrap",
        opacity: 0.6
      }}><div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}><_Component41 size={16} color="#E21B23" /><span style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#EDEDED"
          }}>Gateway Criptografado</span></div><div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}><_Component5 size={16} color="#E21B23" /><span style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#EDEDED"
          }}>Pagamento Seguro</span></div></div></div></div>;
};
const _Component60 = () => {
  const [r, c] = s.useState(null);
  const [l, j] = s.useState(true);
  const [o, g] = s.useState(false);
  const {
    user: y
  } = We();
  const S = Et();
  s.useEffect(() => {
    (async () => {
      if (!y) {
        j(false);
        return;
      }
      try {
        const {
          data: N,
          error: i
        } = await K.from("subscriptions").select("*").eq("user_id", y.id).eq("status", "ativo").gt("data_fim", new Date().toISOString()).maybeSingle();
        if (i) {
          throw i;
        }
        c(N);
        const m = !!N && new Date(N.data_fim) > new Date();
        g(m);
      } catch (N) {
        console.error("Erro ao buscar assinatura:", N);
      } finally {
        j(false);
      }
    })();
  }, [y]);
  const u = () => {
    if (!r?.data_fim) {
      return {
        color: "var(--text-tertiary)",
        label: "-",
        bar: "bg-zinc-800"
      };
    }
    const f = new Date();
    const i = new Date(r.data_fim).getTime() - f.getTime();
    const m = Math.ceil(i / 86400000);
    if (m < 0) {
      return {
        color: "#EF4444",
        label: "VENCIDO",
        bar: "bg-red-500",
        days: 0
      };
    } else if (m <= 7) {
      return {
        color: "#F59E0B",
        label: "VENCENDO EM BREVE",
        bar: "bg-orange-500",
        days: m
      };
    } else {
      return {
        color: "#10B981",
        label: "ATIVO",
        bar: "bg-green-500",
        days: m
      };
    }
  };
  const w = f => {
    switch (f?.toLowerCase()) {
      case "trimestral":
        return "R$ 24,90/trimestre";
      case "mensal":
        return "R$ 10,90/mês";
      case "semanal":
        return "R$ 10,00/semana";
      case "modo competitivo":
        return "R$ 10,00/semana";
      default:
        return "Grátis";
    }
  };
  const P = u();
  const k = w(r?.plano);
  const D = () => {
    if (!r?.data_inicio || !r?.data_fim) {
      return 0;
    }
    const f = new Date(r.data_inicio).getTime();
    const N = new Date(r.data_fim).getTime();
    const i = new Date().getTime();
    const m = N - f;
    const x = i - f;
    return Math.min(100, Math.max(0, x / m * 100));
  };
  if (l) {
    return <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center"><Tt size={40} className="text-[var(--accent)] animate-spin" /></div>;
  } else {
    return <Ct activeTab="planos" isSubscriber={o}><div className="flex-1 p-6 md:p-12 font-['Inter',sans-serif] animate-reveal custom-scrollbar">{r ? <div className="max-w-4xl mx-auto"><header className="mb-16"><button onClick={() => S(-1)} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4 text-body font-medium"><_Component4 size={16} />Voltar</button><h1 className="text-3xl font-extrabold tracking-tight">Sua Assinatura</h1><p className="text-[var(--text-secondary)] mt-2">Gerencie seu plano e acompanhe o vencimento.</p></header><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="flex flex-col items-start justify-center p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg"><div className="flex items-center gap-3 mb-6"><div className="p-2.5 rounded-md bg-green-500/10 text-green-500"><_Component38 size={20} fill="currentColor" /></div><span className="px-2.5 py-1 rounded-sm text-label-sm font-black tracking-widest bg-green-500 text-white uppercase border border-green-500/30">PLANO ATIVO</span></div><h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2 font-mono">PLANO {r.plano}</h2><div className="flex items-center gap-2 text-lg font-bold text-white/70 mb-8 font-mono"><_Component5 size={16} />{k}</div><div className="w-full pt-6 border-t border-[var(--border-subtle)]"><button onClick={() => c(null)} className="btn-primary w-full py-3 text-caption tracking-widest font-black uppercase flex items-center justify-center gap-3 rounded-md"><_Component42 size={12} /> Renovar Plano</button></div></div><div className="p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg flex flex-col justify-between"><div><div className="flex items-center justify-between mb-8"><div className="flex items-center gap-2 text-label !mt-0 uppercase font-black text-label-sm tracking-widest opacity-50"><_Component43 size={14} /> Tempo de Acesso</div>{P.label !== "ATIVO" && <span className="px-2 py-1 rounded text-micro font-bold tracking-wider" style={{
                    backgroundColor: `${P.color}20`,
                    color: P.color
                  }}>{P.label}</span>}</div><div className="mb-10 text-center md:text-left"><div className="text-4xl font-black text-white mb-2 font-mono">{P.days} <span className="text-caption text-white/30 uppercase tracking-widest font-bold">Dias Restantes</span></div><div className="text-caption font-medium text-white/50 flex items-center justify-center md:justify-start gap-2 font-mono"><_Component16 size={12} /> Expira em: {new Date(r.data_fim).toLocaleDateString("pt-BR")}</div></div></div><div className="space-y-4"><div className="flex justify-between items-end mb-2"><span className="text-label-sm font-black uppercase tracking-widest text-white/30">Uso do Período</span><span className="text-label-sm font-black text-white/70 font-mono">{Math.round(D())}%</span></div><div className="w-full h-2 bg-white/5 rounded-full overflow-hidden"><div className={`h-full transition-all duration-1000 ${P.bar}`} style={{
                    width: `${D()}%`
                  }} /></div>{P.label !== "ATIVO" && <div className="flex items-center gap-2 text-label-sm font-bold mt-4" style={{
                  color: P.color
                }}><Ge size={12} /> Sugerimos renovar seu plano agora para evitar interrupções.</div>}</div></div></div></div> : <div className="max-w-6xl mx-auto"><header className="mb-16"><button onClick={() => S(-1)} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4 text-body font-medium"><_Component4 size={16} />Voltar</button></header><_s /><div className="max-w-4xl mx-auto mt-20 text-center pb-12"><p className="text-[var(--text-tertiary)] text-caption leading-relaxed max-w-2xl mx-auto">Suporte dedicado Celo Tracker.</p></div></div>}</div></Ct>;
  }
};
const Ao = {
  accent: "#FF3038"
};
const _Component45 = ({
  children: r,
  className: c = "",
  id: l
}) => <div id={l} className={`bg-[var(--bg-card)] border border-[#2D2D30] rounded-2xl p-6 relative overflow-hidden shadow-xl ${c}`}>{r}</div>;
const Ca = ({
  title: r,
  value: c,
  icon: _Component44,
  color: j = Ao.accent,
  glow: o
}) => <div className="bg-[var(--bg-card)] border border-[#2D2D30] rounded-2xl p-6 flex flex-col gap-3 relative transition-all hover:border-[#FF3038]/40 shadow-lg"><div className="flex justify-between items-start"><div className="p-2.5 rounded-xl bg-[#FF3038]/10 text-[#FF3038]" style={{
      color: j,
      backgroundColor: `${j}15`
    }}><_Component44 size={20} /></div>{o && <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF3038]/5 blur-3xl rounded-full" />}</div><div><h3 className="text-3xl font-black text-white tracking-tighter">{c}</h3><p className="text-label-sm font-bold text-[#71717A] uppercase tracking-widest mt-1">{r}</p></div></div>;
const Co = {
  backgroundColor: "#1A1A1A",
  border: "1px solid #2D2D30",
  borderRadius: "12px",
  color: "#EDEDED",
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  padding: "12px 16px"
};
const ua = r => {
  const c = r.toUpperCase().trim();
  if (c === "PURGATORIO" || c === "PURGATORY" || c === "PURGATÓRIO") {
    return "PURGATORIO";
  } else if (c === "NOVA TERRA" || c === "NOVATERRA") {
    return "NOVA TERRA";
  } else {
    return c;
  }
};
const _Component62 = () => {
  const {
    token: r
  } = ur();
  const c = Et();
  const [l, j] = s.useState(null);
  const [o, g] = s.useState(null);
  const [y, S] = s.useState([]);
  const [u, w] = s.useState([]);
  const [P, k] = s.useState(true);
  const [D, f] = s.useState(null);
  const [N, i] = s.useState("overview");
  const [m, x] = s.useState(false);
  const [h, R] = s.useState({
    date: "Todos",
    championship: "Todos",
    map: "TODOS OS MAPAS",
    timeFilter: "all"
  });
  const p = new URLSearchParams(window.location.search).get("camps");
  const T = s.useMemo(() => p ? p.split(",").map(M => decodeURIComponent(M)) : null, [p]);
  const Y = s.useRef(null);
  const X = s.useRef([]);
  const _ = s.useMemo(() => {
    const M = [...new Set(y.map(C => C.Mapa ? ua(C.Mapa) : "").filter(Boolean))].sort();
    if (h.map === "TODOS OS MAPAS") {
      X.current = M;
      return M;
    }
    const A = [...new Set([...X.current, ua(h.map)])].filter(Boolean).sort();
    if (A.length > 0) {
      return A;
    } else {
      return M;
    }
  }, [y, h.map]);
  s.useEffect(() => {
    if (!r) {
      return;
    }
    (async () => {
      k(true);
      try {
        const {
          data: A,
          error: C
        } = await K.from("perfis").select("id, nome, share_token").eq("share_token", r).single();
        if (C || !A) {
          f("Link de compartilhamento inválido ou expirado.");
          return;
        }
        j(A);
      } catch {
        f("Ocorreu um erro ao validar o token.");
      }
    })();
  }, [r]);
  const [q, V] = s.useState({
    dates: [],
    championships: []
  });
  const [H, je] = s.useState({});
  const Ne = s.useMemo(() => {
    const M = q.championships;
    if (T && T.length > 0) {
      const A = T.map(C => C.toUpperCase().trim());
      return M.filter(C => A.includes(C.toUpperCase().trim()));
    }
    return M;
  }, [q.championships, T]);
  s.useEffect(() => {
    if (l?.id) {
      K.from("partidas_geral").select("data, campeonato").eq("user_id", l.id).then(({
        data: M
      }) => {
        if (M) {
          const A = new Set(M.map(z => z.data).filter(Boolean));
          const C = new Set(M.map(z => z.campeonato?.trim()).filter(Boolean));
          V({
            dates: Array.from(A).sort().reverse(),
            championships: Array.from(C).sort()
          });
        }
      });
      K.from("jogadores_perfil").select("player, foto_url").eq("user_id", l.id).then(({
        data: M
      }) => {
        if (M) {
          const A = {};
          M.forEach(C => {
            if (C.player && C.foto_url) {
              A[C.player] = C.foto_url;
            }
          });
          je(A);
        }
      });
    }
  }, [l?.id]);
  s.useEffect(() => {
    if (!l?.id) {
      return;
    }
    let M = false;
    (async () => {
      k(true);
      try {
        let C = K.from("partidas_geral").select("*").eq("user_id", l.id).order("data", {
          ascending: false
        });
        let z = K.from("performance_jogadores").select("*").eq("user_id", l.id);
        if (T && T.length > 0) {
          C = C.in("campeonato", T);
          z = z.in("campeonato", T);
        }
        if (h.championship !== "Todos") {
          const G = h.championship.trim();
          C = C.ilike("campeonato", G);
          z = z.ilike("campeonato", G);
        }
        if (h.date !== "Todos") {
          C = C.eq("data", h.date);
          z = z.eq("data", h.date);
        } else if (h.timeFilter !== "all") {
          const G = h.timeFilter === "7d" ? 7 : 30;
          const ce = new Date();
          ce.setDate(ce.getDate() - G);
          C = C.gte("created_at", ce.toISOString());
          z = z.gte("created_at", ce.toISOString());
        }
        if (h.map !== "TODOS OS MAPAS") {
          const G = ua(h.map);
          let ce = G;
          if (G === "PURGATORIO") {
            ce = "PURGAT%RIO";
          } else if (G === "NOVA TERRA") {
            ce = "%TERRA";
          }
          C = C.ilike("mapa", ce);
          z = z.ilike("mapa", ce);
        }
        const [te, pe] = await Promise.all([C, z]);
        if (M) {
          return;
        }
        if (te.error) {
          throw new Error("Erro ao carregar partidas.");
        }
        const Ae = (te.data || []).map(G => ({
          Data: G.data,
          Campeonato: G.campeonato,
          Rodada: G.rodada,
          Mapa: G.mapa ? ua(G.mapa) : G.mapa,
          Equipe: G.equipe,
          Colocacao: G.colocacao,
          Kill: G.kill,
          "Pontos/Posicao": G.pontos_posicao,
          Pontos_Total: G.pontos_total,
          Booyah: G.booyah || G.colocacao === 1 ? "SIM" : "NAO"
        }));
        const Oe = (pe.data || []).map(G => ({
          Data: G.data,
          Campeonato: G.campeonato,
          Rodada: G.rodada,
          Equipe: G.equipe,
          Modo: G.modo,
          Mapa: G.mapa ? ua(G.mapa) : G.mapa,
          Posicao: G.posicao,
          Player: G.player,
          Kill: G.kill,
          Morte: G.morte,
          Assistencia: G.assistencia,
          Queda: G.queda,
          "Dano causado": G.dano_causado,
          Derrubados: G.derrubados,
          Ressurgimento: G.ressurgimento
        }));
        S(Ae);
        w(Oe);
      } catch (C) {
        if (M) {
          return;
        }
        console.error(C);
        f("Ocorreu um erro ao processar os dados do squad.");
      } finally {
        if (!M) {
          k(false);
        }
      }
    })();
    return () => {
      M = true;
    };
  }, [l?.id, h, T]);
  s.useEffect(() => {
    if (y.length > 0) {
      g(Ja(y, u));
    } else {
      g(null);
    }
  }, [y, u]);
  const De = s.useMemo(() => {
    if (u.length === 0) {
      return [];
    }
    const M = {};
    const A = {};
    u.forEach(C => {
      if (!C.Player) {
        return;
      }
      const z = C.Player;
      M[z] ||= {
        name: z,
        kills: 0,
        deaths: 0,
        assists: 0,
        damage: 0,
        knocks: 0
      };
      A[z] ||= new Set();
      M[z].kills += C.Kill || 0;
      M[z].deaths += C.Morte || 0;
      M[z].assists += C.Assistencia || 0;
      M[z].damage += C["Dano causado"] || 0;
      M[z].knocks += C.Derrubados || 0;
      A[z].add(`${C.Data}|${C.Mapa}|${C.Campeonato}|${C.Rodada}`);
    });
    return Object.values(M).map(C => {
      const z = A[C.name]?.size || 0;
      return {
        ...C,
        kd: parseFloat((C.kills / Math.max(1, z)).toFixed(2)),
        quedas: z
      };
    }).sort((C, z) => z.kills - C.kills);
  }, [u]);
  const be = s.useMemo(() => {
    const M = {};
    u.forEach(C => {
      const z = C.Player;
      if (z) {
        M[z] ||= {
          name: z,
          kills: 0,
          assists: 0,
          dano: 0,
          mortes: 0,
          derrubados: 0,
          revividos: 0
        };
        M[z].kills += C.Kill || 0;
        M[z].assists += C.Assistencia || 0;
        M[z].dano += C["Dano causado"] || 0;
        M[z].mortes += C.Morte || 0;
        M[z].derrubados += C.Derrubados || 0;
        M[z].revividos += C.Ressurgimento || 0;
      }
    });
    const A = Object.values(M);
    return {
      kills: [...A].sort((C, z) => z.kills - C.kills),
      assists: [...A].sort((C, z) => z.assists - C.assists),
      dano: [...A].sort((C, z) => z.dano - C.dano),
      mortes: [...A].sort((C, z) => z.mortes - C.mortes),
      derrubados: [...A].sort((C, z) => z.derrubados - C.derrubados),
      revividos: [...A].sort((C, z) => z.revividos - C.revividos)
    };
  }, [u]);
  const ue = async () => {
    const M = l?.nome || "Analista";
    const A = new Ar("p", "mm", "a4");
    const C = document.getElementById("public-squad-content");
    if (!C) {
      return;
    }
    const z = await Cr(C, {
      scale: 1,
      useCORS: true,
      backgroundColor: "#0a0a0f"
    });
    const te = z.toDataURL("image/png");
    const pe = 210;
    const Ae = z.height * pe / z.width;
    A.addImage(te, "PNG", 0, 0, pe, Ae);
    A.save(`CeloTracker_${M}_${new Date().toLocaleDateString("pt-BR")}.pdf`);
  };
  const _Component46 = ({
    data: M,
    dataKey: A,
    title: C,
    color: z
  }) => <_Component45 className="h-full flex flex-col"><h4 className="text-label-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">{C}</h4><div className="flex-1 min-h-[250px]"><Te width="100%" height="100%"><_Component20 data={M} layout="vertical" margin={{
          top: 5,
          right: 30,
          left: 40,
          bottom: 5
        }}><_Component11 strokeDasharray="3 3" horizontal={false} stroke="#2D2D30" /><_Component12 type="number" hide={true} /><Ie type="category" dataKey="name" tick={{
            fontSize: 10,
            fill: "#71717A",
            fontWeight: 600
          }} axisLine={false} tickLine={false} /><_e cursor={{
            fill: "rgba(255,255,255,0.03)"
          }} contentStyle={Co} /><Qe dataKey={A} fill={z} radius={[0, 4, 4, 0]} barSize={18} label={{
            position: "right",
            fill: "#fff",
            fontSize: 10,
            fontWeight: "bold"
          }}>{M.map((te, pe) => <_Component21 fillOpacity={1 - pe * 0.1} key={`cell-${pe}`} />)}</Qe></_Component20></Te></div></_Component45>;
  if (P) {
    return <div className="min-h-screen bg-[#0B0B0C] flex flex-col items-center justify-center text-white"><div className="w-12 h-12 border-2 border-[#FF555D]/20 border-t-[#FF555D] rounded-full animate-spin mb-4" /><p className="text-label-sm font-bold uppercase tracking-[0.3em] text-zinc-500">Sincronizando Squad</p></div>;
  } else if (D) {
    return <div className="min-h-screen bg-[#0B0B0C] flex flex-col items-center justify-center text-white p-6 text-center"><Ge size={48} className="text-red-500 mb-4" /><h2 className="text-2xl font-black uppercase mb-2">Acesso Negado</h2><p className="text-zinc-500 text-body max-w-xs">{D}</p><button onClick={() => c("/register")} className="mt-8 bg-[#FF555D] text-white px-8 py-3 rounded-full font-black text-caption uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#FF555D]/20">Criar meu próprio Dashboard</button></div>;
  } else {
    return <div className="ctracker-public-page min-h-screen bg-[#0B0B0C] text-white font-['Inter',sans-serif]"><div id="public-squad-content"><header id="public-header" className="h-16 md:h-20 bg-[#0B0B0C]/80 backdrop-blur-xl border-b border-[#2D2D30] sticky top-0 z-50 px-4 md:px-6 flex items-center justify-between"><div className="flex items-center gap-2 md:gap-4"><img src="/redesign/logo.svg" alt="" className="h-8 md:h-10 w-auto" /><span className="text-sm md:text-lg font-black tracking-tight"><span className="text-[var(--accent)]">C</span>TRACKER</span><div className="h-6 md:h-8 w-px bg-[#2D2D30]" /><div><span className="block text-[8px] md:text-[9px] font-black text-[#FF555D] uppercase tracking-[0.15em] md:tracking-[0.2em] mb-0.5">Analytics Público</span><span className="block text-label-sm md:text-xs font-black uppercase truncate max-w-[120px] md:max-w-none">Coach: {l?.nome || "Analista"}</span></div></div><div className="flex items-center gap-2"><button onClick={() => c("/register")} className="bg-[#FF3038] text-black px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-black text-micro md:text-[10px] uppercase tracking-widest hover:bg-[#FF555D] transition-colors shadow-lg shadow-red-900/20">Começar</button></div></header><main className="ctracker-public-main w-full p-6 lg:p-10 space-y-8"><div className="flex gap-2 p-1 bg-[#161618] border border-[#2D2D30] rounded-2xl w-fit">{[{
              id: "overview",
              label: "Estatísticas",
              icon: Da
            }, {
              id: "players",
              label: "Jogadores",
              icon: Mt
            }, {
              id: "coletivo",
              label: "Coletivo",
              icon: _Component6
            }].map(M => <button onClick={() => i(M.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-label-sm font-black uppercase tracking-widest transition-all ${N === M.id ? "bg-[#FF555D] text-white shadow-lg shadow-[#FF555D]/20" : "text-zinc-500 hover:text-white"}`} key={M.id}><M.icon size={14} /> {M.label}</button>)}</div><div className="bg-[#161618] border border-[#2D2D30] rounded-2xl overflow-hidden filtros-container"><button onClick={() => x(!m)} className="w-full flex md:hidden items-center justify-between p-4 font-bold text-caption uppercase tracking-widest text-zinc-400 hover:text-white"><span>Filtros de Análise</span><span>{m ? "▲ Recolher" : "▼ Expandir"}</span></button><div className={`${m ? "flex" : "hidden"} md:flex flex-wrap items-center gap-6 p-6 border-t border-[#2D2D30] md:border-none`}><div className="space-y-2"><span className="block text-micro font-black text-zinc-500 uppercase tracking-widest">Período</span><div className="flex bg-[#0B0B0C] p-1 rounded-xl border border-[#2D2D30]">{["7d", "30d", "all"].map(M => <button onClick={() => R(A => ({
                    ...A,
                    timeFilter: M,
                    date: "Todos"
                  }))} className={`px-4 py-2 rounded-lg text-micro font-black uppercase tracking-widest transition-all ${h.timeFilter === M && h.date === "Todos" ? "bg-[#FF3038] text-white" : "text-zinc-500 hover:text-zinc-300"}`} key={M}>{M === "7d" ? "7 Dias" : M === "30d" ? "30 Dias" : "Tudo"}</button>)}</div></div><div className="h-10 w-px bg-[#2D2D30] hidden md:block" /><div className="space-y-2"><span className="block text-micro font-black text-zinc-500 uppercase tracking-widest">Data Específica</span><select className="bg-[#0B0B0C] border border-[#2D2D30] text-label-sm font-bold uppercase tracking-widest text-[#A1A1AA] outline-none px-4 py-2.5 rounded-xl min-w-[180px] filtro-select" value={h.date} onChange={M => R(A => ({
                  ...A,
                  date: M.target.value,
                  timeFilter: "all"
                }))} aria-label="Filtrar por data específica"><option value="Todos">Todas as Datas</option>{q.dates.map(M => <option value={M} key={M}>{M}</option>)}</select></div><div className="h-10 w-px bg-[#2D2D30] hidden md:block" /><div className="space-y-2"><span className="block text-micro font-black text-zinc-500 uppercase tracking-widest">Equipe / Campeonato</span><select className="bg-[#0B0B0C] border border-[#2D2D30] text-label-sm font-bold uppercase tracking-widest text-[#A1A1AA] outline-none px-4 py-2.5 rounded-xl min-w-[200px] filtro-select" value={h.championship} onChange={M => R(A => ({
                  ...A,
                  championship: M.target.value
                }))} aria-label="Filtrar por campeonato"><option value="Todos">Todos os Campeonatos</option>{Ne.map(M => <option value={M} key={M}>{M}</option>)}</select></div><div className="h-10 w-px bg-[#2D2D30] hidden md:block" /><div className="space-y-2"><span className="block text-micro font-black text-zinc-500 uppercase tracking-widest">Mapa</span><select className="bg-[#0B0B0C] border border-[#2D2D30] text-label-sm font-bold uppercase tracking-widest text-[#A1A1AA] outline-none px-4 py-2.5 rounded-xl min-w-[180px] filtro-select" value={h.map} onChange={M => R(A => ({
                  ...A,
                  map: M.target.value
                }))} aria-label="Filtrar por mapa"><option value="TODOS OS MAPAS">TODOS OS MAPAS</option>{_.map(M => <option value={M} key={M}>{M}</option>)}</select></div></div></div><div ref={Y}>{N === "overview" && o && <div id="overview-section" className="space-y-8 animate-fade-in"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"><Ca title="Total Kills" value={o.playerMetrics.totalKills || 0} icon={Ma} glow={true} /><Ca title="Pontuação Total" value={o.general.totalPontos || 0} icon={Je} /><Ca title="Booyahs" value={o.general.totalBooyahs || 0} icon={Pa} color="#FF6B72" /><Ca title="Dano Médio / Queda" value={(o.squadMetrics.avgDamage || 0).toLocaleString()} icon={_Component17} color="#F97316" /></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><_Component45 className="lg:col-span-2 min-h-[400px]"><h4 className="text-label-sm font-bold text-zinc-500 uppercase tracking-widest mb-10">Evolução Diária (Kills)</h4><Te width="100%" height={300}><Os data={[...y].reverse().map(M => ({
                      data: M.Data,
                      kill: M.Kill
                    }))}><defs><linearGradient id="gradPublic" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF555D" stopOpacity={0.3} /><stop offset="100%" stopColor="#FF555D" stopOpacity={0} /></linearGradient></defs><_Component12 dataKey="data" axisLine={false} tickLine={false} tick={{
                        fontSize: 10,
                        fill: "#52525B"
                      }} /><Ie axisLine={false} tickLine={false} tick={{
                        fontSize: 10,
                        fill: "#52525B"
                      }} /><_e contentStyle={{
                        backgroundColor: "#161618",
                        border: "1px solid #2D2D30",
                        borderRadius: "12px"
                      }} /><Ps type="monotone" dataKey="kill" stroke="#FF555D" fill="url(#gradPublic)" strokeWidth={3} /></Os></Te></_Component45><div className="space-y-6"><_Component45><h4 className="text-label-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Squad Performance</h4><div className="space-y-5">{[{
                        label: "Total Quedas",
                        value: o.general.totalQuedas,
                        icon: _Component6
                      }, {
                        label: "K/D Equipe",
                        value: o.playerMetrics.kdRatio,
                        icon: _Component38
                      }, {
                        label: "Booyah Rate",
                        value: `${o.general.percentBooyah}%`,
                        icon: Je
                      }].map((M, A) => <div className="flex items-center justify-between" key={A}><div className="flex items-center gap-3 text-zinc-400"><M.icon size={12} /><span className="text-label-sm uppercase font-bold tracking-widest">{M.label}</span></div><span className="text-white font-black text-body">{M.value}</span></div>)}</div></_Component45><_Component45><h4 className="text-label-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Mapa Dominante</h4><div className="text-center py-4"><_Component19 className="mx-auto text-[#FF555D] mb-2" size={32} /><span className="block text-2xl font-black uppercase text-white">{o.byMap[0]?.mapa || "N/A"}</span><span className="text-micro text-zinc-500 uppercase font-black">{o.byMap[0]?.totalPontos || 0} Pontos Acumulados</span></div></_Component45></div></div></div>}{N === "players" && <div id="players-section" className="animate-fade-in"><_Component45 className="!p-0 overflow-hidden"><table className="w-full text-left"><thead><tr className="bg-[#1C1C1F] border-b border-[#2D2D30]">{["Jogador", "Abates", "Mortes", "Assists", "Dano", "KD"].map((M, A) => <th className="px-6 py-5 text-micro font-black uppercase tracking-[0.2em] text-zinc-500" key={A}>{M}</th>)}</tr></thead><tbody>{De.map((M, A) => <tr className="border-b border-[#2D2D30]/50 hover:bg-[#FF555D]/5 transition-colors" key={A}><td className="px-6 py-5 font-black text-white uppercase text-caption flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2D2D30] overflow-hidden flex items-center justify-center text-xs font-bold text-[#FF555D] shrink-0">{H[M.name] ? <img src={H[M.name]} alt={M.name} className="w-full h-full object-cover" /> : M.name ? M.name.substring(0, 2).toUpperCase() : "?"}</div><span>{M.name}</span></td><td className="px-6 py-5 font-bold text-[#FF555D]">{M.kills}</td><td className="px-6 py-5 text-zinc-400">{M.deaths}</td><td className="px-6 py-5 text-zinc-400">{M.assists}</td><td className="px-6 py-5 font-mono text-zinc-300">{M.damage.toLocaleString()}</td><td className="px-6 py-5"><span className="bg-[#FF555D]/10 text-[#FF555D] px-2 py-1 rounded text-label-sm font-black">{M.kd} KD</span></td></tr>)}</tbody></table></_Component45></div>}{N === "coletivo" && <div id="coletivo-section" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-reveal"><_Component46 title="Kills" data={be.kills} dataKey="kills" color="#FF555D" /><_Component46 title="Assists" data={be.assists} dataKey="assists" color="#FF555D" /><_Component46 title="Dano Causado" data={be.dano} dataKey="dano" color="#FF555D" /><_Component46 title="Mortes" data={be.mortes} dataKey="mortes" color="#FF555D" /><_Component46 title="Derrubados" data={be.derrubados} dataKey="derrubados" color="#FF555D" /><_Component46 title="Revividos" data={be.revividos} dataKey="revividos" color="#FF555D" /></div>}</div></main></div><button onClick={ue} className="fixed bottom-6 right-6 z-[999] bg-[#FF3038] text-white border-none rounded-xl py-3 px-5 cursor-pointer flex items-center gap-2 text-body font-semibold shadow-lg shadow-[#FF3038]/40 hover:scale-105 active:scale-95 transition-all">📥 <span className="hidden sm:inline">Salvar PDF</span></button></div>;
  }
};
const Ns = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  color: "var(--text-primary)",
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  padding: "12px 16px",
  boxShadow: "var(--shadow-elevated)"
};
function Fo() {
  const {
    user: r,
    isSubscriber: c
  } = We();
  const [l, j] = s.useState(true);
  const [o, g] = s.useState([]);
  const [y, S] = s.useState("all");
  const [u, w] = s.useState("Todos");
  const [P, k] = s.useState("Todos");
  s.useEffect(() => {
    if (!r) {
      return;
    }
    (async () => {
      j(true);
      try {
        const {
          data: h,
          error: R
        } = await K.from("partidas_geral").select("*").eq("user_id", r.id).eq("quebra_call", true).order("data", {
          ascending: false
        });
        if (R) {
          throw R;
        }
        g(h || []);
      } catch (h) {
        console.error("Erro ao buscar quebras:", h);
      } finally {
        j(false);
      }
    })();
  }, [r]);
  const D = s.useMemo(() => {
    const x = new Date();
    const h = y === "7d" ? new Date(x.getTime() - 604800000) : y === "30d" ? new Date(x.getFullYear(), x.getMonth(), 1) : null;
    return o.filter(R => {
      if (h && R.data) {
        const v = R.data.split("/");
        const p = v.length === 3 ? new Date(`${v[2]}-${v[1]}-${v[0]}`) : new Date(R.data);
        if (isNaN(p.getTime()) || p < h) {
          return false;
        }
      }
      return (u === "Todos" || R.resultado_call?.toUpperCase() === u) && (P === "Todos" || R.mapa?.toUpperCase().trim() === P.toUpperCase().trim());
    });
  }, [o, y, u, P]);
  const f = s.useMemo(() => {
    const x = D.length;
    const h = D.filter(v => v.resultado_call?.toUpperCase() === "WIN").length;
    const R = D.filter(v => v.resultado_call?.toUpperCase() === "LOSS").length;
    return {
      total: x,
      winRate: x > 0 ? (h / x * 100).toFixed(1) : "0",
      lossRate: x > 0 ? (R / x * 100).toFixed(1) : "0"
    };
  }, [D]);
  const N = s.useMemo(() => {
    const x = {};
    D.forEach(h => {
      if (h.mapa) {
        const R = h.mapa.toUpperCase().trim();
        x[R] = (x[R] || 0) + 1;
      }
    });
    return Object.entries(x).map(([h, R]) => ({
      mapa: h,
      total: R
    })).sort((h, R) => R.total - h.total);
  }, [D]);
  const i = s.useMemo(() => {
    const x = {};
    D.forEach(h => {
      const R = h.qual_call?.toUpperCase().trim() || "SEM NOME";
      x[R] ||= {
        name: R,
        win: 0,
        loss: 0,
        total: 0
      };
      x[R].total++;
      if (h.resultado_call?.toUpperCase() === "WIN") {
        x[R].win++;
      }
      if (h.resultado_call?.toUpperCase() === "LOSS") {
        x[R].loss++;
      }
    });
    return Object.values(x).sort((h, R) => R.total - h.total).slice(0, 10);
  }, [D]);
  const m = s.useMemo(() => Array.from(new Set(o.map(x => x.mapa?.toUpperCase().trim()).filter(Boolean))).sort(), [o]);
  if (l) {
    return <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center"><div className="flex flex-col items-center gap-4"><_Component6 className="animate-spin text-[var(--accent)]" size={40} /><p className="text-label uppercase tracking-widest font-bold">Analisando Estratégias...</p></div></div>;
  } else {
    return <Ct activeTab="quebras" isSubscriber={c}><div className="ctracker-quebras-page flex-1 custom-scrollbar"><header className="ctracker-filter-header flex flex-col gap-4 sticky top-0 z-20 bg-[var(--bg-surface)] backdrop-blur-md border-b border-[var(--border-subtle)] px-6 py-5"><div className="w-full flex items-center justify-between"><div className="flex items-center gap-4"><div className="hidden md:flex items-center text-caption uppercase tracking-widest text-[var(--text-tertiary)] font-bold"><span>CONTROLE</span><span className="mx-2 opacity-50">›</span><span>QUEBRAS</span></div></div><div className="flex items-center gap-4"><div className="hidden sm:flex flex-col text-right items-end gap-1"><span className="text-body-sm text-[var(--text-tertiary)]">{r?.email || "Analista"}</span></div></div></div><div className="w-full flex items-center justify-start gap-4"><div className="flex items-center gap-2">{[{
                id: "7d",
                label: "7 DIAS"
              }, {
                id: "30d",
                label: "ESTE MÊS"
              }, {
                id: "all",
                label: "TODOS"
              }].map(x => <button onClick={() => S(x.id)} className={`px-3 py-1.5 rounded-lg text-body-sm border border-[var(--border-default)] transition-all ${y === x.id ? "bg-[var(--accent-muted)] border-[var(--accent)] text-[#FF8389] font-bold" : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--accent-muted)] font-medium"}`} key={x.id}>{x.label}</button>)}</div></div></header><main className="ctracker-workspace-main w-full px-6 py-10 space-y-10"><div className="flex flex-wrap items-center gap-4"><div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)]"><_Component6 size={16} className="text-[var(--accent)]" /><select value={u} onChange={x => w(x.target.value)} className="bg-transparent text-[var(--text-primary)] border-none px-2 outline-none cursor-pointer min-w-[120px] font-bold text-body" aria-label="Filtrar por resultado do call"><option value="Todos" className="bg-[#141416]">Todos Resultados</option><option value="WIN" className="bg-[#141416]">Vitórias (WIN)</option><option value="LOSS" className="bg-[#141416]">Derrotas (LOSS)</option></select></div><div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)]"><_Component19 size={16} className="text-[var(--accent)]" /><select value={P} onChange={x => k(x.target.value)} className="bg-transparent text-[var(--text-primary)] border-none px-2 outline-none cursor-pointer min-w-[120px] font-bold text-body" aria-label="Filtrar por mapa"><option value="Todos" className="bg-[#141416]">Todos os Mapas</option>{m.map(x => <option value={x} className="bg-[#141416]" key={x}>{x}</option>)}</select></div></div><div className="metric-strip mb-6"><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Total de Quebras</span><span className="text-2xl font-black text-white numeric-mono flex items-baseline gap-2">{f.total}<span className="text-label-sm text-[var(--text-tertiary)] font-mono tracking-widest font-normal uppercase">{o.length > 0 ? `(${(f.total / o.length * 100).toFixed(0)}%)` : "(0%)"}</span></span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Taxa de Vitória (WIN)</span><span className="text-2xl font-black text-[#22C55E] numeric-mono">{f.winRate}%</span></div><div className="metric-strip-item"><span className="text-label-sm text-[var(--text-tertiary)] uppercase font-bold tracking-wider">Taxa de Derrota (LOSS)</span><span className="text-2xl font-black text-[#EF4444] numeric-mono">{f.lossRate}%</span></div></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="p-4 bg-[var(--bg-card)] border border-[var(--border-default)] rounded flex flex-col"><div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2"><div><h4 className="text-heading text-body font-bold uppercase tracking-wider">Quebras por Mapa</h4><p className="text-label text-[var(--text-tertiary)]">Volume de confrontos por território</p></div><div className="p-1 text-[var(--text-tertiary)]"><_Component10 size={16} /></div></div><div className="h-64"><Te width="100%" height="100%"><_Component20 data={N} layout="vertical" margin={{
                    left: 24,
                    right: 16,
                    top: 8,
                    bottom: 8
                  }}><_Component11 strokeDasharray="3 3" horizontal={false} stroke="var(--border-subtle)" /><_Component12 type="number" hide={true} /><Ie dataKey="mapa" type="category" axisLine={false} tickLine={false} tick={{
                      fontSize: 10,
                      fill: "var(--text-secondary)",
                      fontWeight: 700
                    }} /><_e contentStyle={Ns} cursor={{
                      fill: "var(--bg-hover)"
                    }} /><Qe dataKey="total" fill="#FF3038" radius={[0, 2, 2, 0]} barSize={16} /></_Component20></Te></div></div><div className="p-4 bg-[var(--bg-card)] border border-[var(--border-default)] rounded flex flex-col"><div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2"><div><h4 className="text-heading text-body font-bold uppercase tracking-wider">Frequência por Call</h4><p className="text-label text-[var(--text-tertiary)]">Métricas detalhadas por ponto de interesse</p></div><div className="p-1 text-[var(--text-tertiary)]"><Ma size={16} /></div></div><div className="h-64"><Te width="100%" height="100%"><_Component20 data={i} layout="vertical" margin={{
                    left: 40,
                    right: 16,
                    top: 8,
                    bottom: 8
                  }}><_Component11 strokeDasharray="3 3" horizontal={false} stroke="var(--border-subtle)" /><_Component12 type="number" hide={true} /><Ie dataKey="name" type="category" axisLine={false} tickLine={false} tick={{
                      fontSize: 10,
                      fill: "var(--text-secondary)",
                      fontWeight: 700
                    }} /><_e contentStyle={Ns} cursor={{
                      fill: "var(--bg-hover)"
                    }} /><Qe dataKey="total" fill="#FF3038" radius={[0, 2, 2, 0]} barSize={14} /></_Component20></Te></div></div></div><div className="border border-[var(--border-default)] rounded overflow-hidden bg-[var(--bg-card)] p-4"><div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2"><div><h4 className="text-heading text-body font-bold uppercase tracking-wider">Histórico de Quebras</h4><p className="text-label text-[var(--text-tertiary)]">Detalhamento das quebras de calls</p></div><div className="text-label-sm font-mono text-[var(--text-secondary)] bg-white/5 px-2 py-0.5 rounded">{D.length} registros</div></div><div className="overflow-x-auto"><table className="w-full text-left table-dense"><thead className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]"><tr><th className="px-4 py-2 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Data</th><th className="px-4 py-2 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Mapa</th><th className="px-4 py-2 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Call</th><th className="px-4 py-2 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Resultado</th><th className="px-4 py-2 text-label-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Rodada</th></tr></thead><tbody className="divide-y divide-[var(--border-subtle)]">{D.map((x, h) => <tr className="hover:bg-[var(--bg-hover)]/30 transition-colors group" key={h}><td className="px-4 py-2"><div className="flex items-center gap-3"><div className="p-1 rounded bg-[var(--bg-surface)] text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors"><_Component16 size={12} /></div><span className="text-caption font-medium text-[var(--text-secondary)] font-mono">{x.data?.includes("-") ? x.data.split("-").reverse().join("/") : x.data}</span></div></td><td className="px-4 py-2 text-label font-bold text-[var(--text-primary)] uppercase">{x.mapa}</td><td className="px-4 py-2 text-label font-bold text-[var(--text-secondary)]">{x.qual_call || "—"}</td><td className="px-4 py-2"><span className={`px-2 py-0.5 rounded text-label-sm font-bold uppercase tracking-wider border ${x.resultado_call?.toUpperCase() === "WIN" ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20" : "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20"}`}>{x.resultado_call || "LOSS"}</span></td><td className="px-4 py-2 text-label font-bold text-[var(--text-tertiary)] font-mono">{isNaN(Number(x.rodada)) ? x.rodada : `${x.rodada}ª`}</td></tr>)}{D.length === 0 && <tr><td colSpan={5} className="px-6 py-16 text-center"><div className="flex flex-col items-center gap-3 opacity-20"><Oa size={32} /><p className="text-label-sm font-black uppercase tracking-widest">Nenhuma quebra de call registrada</p></div></td></tr>}</tbody></table></div></div></main></div></Ct>;
  }
}
const Eo = "/assets/logo-CVpo9q4X.png";
const lt = ["#FF3038", "#FF6B00", "#00E676", "#FF007A", "#FFD600", "#00E5FF", "#9D00FF", "#FF4081"];
const _t = ["#FF1744", "#FF5722", "#F50057", "#FF9100", "#D500F9", "#C51162", "#FF3D00", "#E91E63"];
function ws(r, c) {
  const l = r === "rotacao_inimiga" ? _t : lt;
  const j = new Set(c.map(o => o.cor).filter(Boolean));
  for (const o of l) {
    if (!j.has(o)) {
      return o;
    }
  }
  return l[c.length % l.length];
}
const Ss = ["BERMUDA", "KALAHARI", "NOVA TERRA", "PURGATORIO", "SOLARA"];
const Fa = [{
  id: "plinko",
  label: "PLINKO",
  color: "#FFD700"
}, {
  id: "dropzone",
  label: "DROP ZONE",
  color: "#FFFFFF"
}, {
  id: "pouso",
  label: "POUSO",
  color: "#00BFA5"
}, {
  id: "mandrako",
  label: "MANDRAKO",
  color: "#00C853"
}, {
  id: "rotacao",
  label: "Rotação",
  color: "#FF3038"
}, {
  id: "rotacao_inimiga",
  label: "Rota Inimiga",
  color: "#FF1744"
}, {
  id: "posicionamento",
  label: "Posicionamento",
  color: "#FF4444"
}, {
  id: "barracao",
  label: "BARRACÃO",
  color: "#FF6B00"
}, {
  id: "safe",
  label: "SAFE",
  color: "#FFFFFF"
}];
const Do = {
  BERMUDA: "/maps/Bermuda_grid.jpg",
  KALAHARI: "/maps/Kalahari_grid.jpg",
  "NOVA TERRA": "/maps/Nova_Terra_grid.jpg",
  PURGATORIO: "/maps/Purgatory_grid.jpg",
  PURGATÓRIO: "/maps/Purgatory_grid.jpg",
  PURGATORY: "/maps/Purgatory_grid.jpg",
  SOLARA: "/maps/Solara_grid.jpg"
};
const Ro = r => r.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const _Component49 = ({
  message: r,
  type: c
}) => {
  const l = {
    success: {
      border: "#10B98130",
      color: "#10B981",
      Icon: _Component1
    },
    error: {
      border: "#F43F5E30",
      color: "#F43F5E",
      Icon: Gt
    }
  }[c || "success"];
  return <div className="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 bg-[var(--bg-surface)] border rounded-md animate-reveal shadow-2xl" style={{
    borderColor: l.border
  }}><l.Icon size={16} color={l.color} /><span className="text-[var(--text-primary)] text-caption font-semibold">{r}</span></div>;
};
const To = () => {
  const {
    user: r
  } = We();
  const [c, l] = s.useState(null);
  const [j, o] = s.useState(true);
  const g = () => {
    const n = "https://pay.lowify.com.br/checkout?product_id=jQltjn";
    if (!r) {
      return n;
    }
    const t = new URLSearchParams();
    if (r.email) {
      t.append("email", r.email);
    }
    if (r.id) {
      t.append("custom_id", r.id);
      t.append("src", r.id);
    }
    const B = t.toString();
    if (B) {
      return `${n}&${B}`;
    } else {
      return n;
    }
  };
  const [y, S] = s.useState("BERMUDA");
  const [u, w] = s.useState("plinko");
  const [P, k] = s.useState("");
  const [D, f] = s.useState([]);
  const [N, i] = s.useState([]);
  const [m, x] = s.useState([]);
  const [h, R] = s.useState(false);
  const [v, p] = s.useState(null);
  const [T, Y] = s.useState(false);
  const [X, _] = s.useState("select");
  const [q, V] = s.useState("");
  const [H, je] = s.useState("");
  const [Ne, De] = s.useState(false);
  const [be, ue] = s.useState("");
  const [ae, M] = s.useState(null);
  const [A, C] = s.useState([{
    id: "tracado-1",
    nome: "Rota 1",
    tipo: "rotacao",
    waypoints: [],
    visible: true,
    cor: lt[0]
  }]);
  const [z, te] = s.useState("tracado-1");
  const [pe, Ae] = s.useState(false);
  const [Oe, G] = s.useState([]);
  const [ce, Be] = s.useState(window.innerWidth < 640);
  const [ft, gt] = s.useState(false);
  const [Wt, oa] = s.useState({
    x: 0.5,
    y: 0.5
  });
  const [ot, W] = s.useState(null);
  s.useEffect(() => {
    W(null);
  }, [u]);
  const Z = u === "rotacao" || u === "rotacao_inimiga";
  const ee = s.useMemo(() => A.find(n => n.id === z) || A[0], [A, z]);
  s.useEffect(() => {
    if (u === "rotacao" || u === "rotacao_inimiga") {
      C(n => n.length === 0 ? [{
        id: "tracado-1",
        nome: "Rota 1",
        tipo: u,
        waypoints: [],
        visible: true,
        cor: u === "rotacao_inimiga" ? _t[0] : lt[0]
      }] : n.map(t => {
        if (t.id === z && t.tipo !== u) {
          const B = ws(u, n.filter(E => E.id !== t.id));
          return {
            ...t,
            tipo: u,
            cor: B
          };
        }
        return t;
      }));
    }
  }, [u, z]);
  const Fe = () => {
    const n = A.length + 1;
    const t = `tracado-${Date.now()}`;
    const B = `Rota ${n}`;
    const E = u === "rotacao_inimiga" ? "rotacao_inimiga" : "rotacao";
    const a = ws(E, A);
    const L = {
      id: t,
      nome: B,
      tipo: E,
      waypoints: [],
      visible: true,
      cor: a
    };
    C(xe => [...xe, L]);
    te(t);
    ye(`"+ Nova Rota" criada (${B})`, "success");
  };
  const Xe = (n, t) => {
    if (t) {
      t.stopPropagation();
    }
    C(B => B.map(E => E.id === n ? {
      ...E,
      visible: !E.visible
    } : E));
  };
  const Pe = (n, t) => {
    if (t) {
      t.stopPropagation();
    }
    if (A.length <= 1) {
      C(E => E.map(a => a.id === n ? {
        ...a,
        waypoints: []
      } : a));
      ye("Traçado resetado", "success");
      return;
    }
    const B = A.filter(E => E.id !== n);
    C(B);
    if (z === n) {
      te(B[B.length - 1].id);
    }
    ye("Traçado removido", "success");
  };
  s.useEffect(() => {
    const n = () => Be(window.innerWidth < 640);
    window.addEventListener("resize", n);
    return () => window.removeEventListener("resize", n);
  }, []);
  const he = s.useRef(false);
  const fe = s.useRef(null);
  const [qe, Dt] = s.useState([]);
  const [Me, Ht] = s.useState(false);
  const [nt, Vt] = s.useState(false);
  const [ct, ja] = s.useState(null);
  const vt = s.useRef(null);
  const jt = s.useRef(null);
  const ye = (n, t) => {
    ja({
      message: n,
      type: t
    });
    setTimeout(() => ja(null), 4000);
  };
  s.useEffect(() => {
    if (!r) {
      return;
    }
    (async () => {
      o(true);
      try {
        const {
          data: t,
          error: B
        } = await K.from("perfis").select("*").eq("id", r.id).maybeSingle();
        if (B) {
          throw B;
        }
        l(t);
      } catch (t) {
        console.error("[RoutePlanner] Erro ao carregar perfil:", t);
      } finally {
        o(false);
      }
    })();
  }, [r]);
  const yt = c?.is_admin === true || c?.rotas_ativo === true && (!c?.rotas_ativo_expira_em || new Date(c.rotas_ativo_expira_em) > new Date());
  const It = async () => {
    if (!!r && !!yt) {
      Ht(true);
      try {
        const {
          data: n,
          error: t
        } = await K.from("rotas_estudo").select("*").eq("user_id", r.id).order("created_at", {
          ascending: false
        });
        if (t) {
          throw t;
        }
        Dt(n || []);
      } catch (n) {
        console.error("[RoutePlanner] Erro ao buscar rotas:", n);
      } finally {
        Ht(false);
      }
    }
  };
  s.useEffect(() => {
    if (yt) {
      It();
    }
  }, [r, yt]);
  const Qt = async () => {
    if (!!r && !!yt) {
      R(true);
      try {
        const {
          data: n,
          error: t
        } = await K.from("times_mapeamento").select("*").order("nome", {
          ascending: true
        });
        if (t) {
          console.warn("[RoutePlanner] Aviso ao carregar times_mapeamento:", t.message);
        } else if (n) {
          x(n);
        }
      } catch (n) {
        console.error("[RoutePlanner] Erro ao buscar times_mapeamento:", n);
      } finally {
        R(false);
      }
    }
  };
  s.useEffect(() => {
    if (yt) {
      Qt();
    }
  }, [r, yt]);
  const na = async n => {
    if (n) {
      n.preventDefault();
    }
    if (!r || Ne) {
      return;
    }
    const t = q.trim();
    const B = H.trim();
    if (!t) {
      ye("Digite o nome do time", "error");
      return;
    }
    if (!B) {
      ye("Cole a URL da logo do time", "error");
      return;
    }
    De(true);
    try {
      const {
        data: E,
        error: a
      } = await K.from("times_mapeamento").insert({
        nome: t,
        logo_url: B,
        created_by: r.id
      }).select().single();
      if (a) {
        if (a.code === "23505" || a.message?.toLowerCase().includes("unique") || a.message?.toLowerCase().includes("duplicate")) {
          ye("Esse time já está cadastrado. Selecione-o na lista.", "error");
        } else {
          throw a;
        }
        return;
      }
      ye(`Time "${t}" cadastrado com sucesso!`, "success");
      V("");
      je("");
      if (E) {
        x(L => [...L.filter(xe => xe.id !== E.id), E].sort((xe, Se) => xe.nome.localeCompare(Se.nome)));
        p(E);
        w("time");
        Y(false);
      }
    } catch (E) {
      ye(E.message || "Erro ao cadastrar time", "error");
    } finally {
      De(false);
    }
  };
  const Ia = async n => {
    if (!!r && !!n) {
      try {
        const {
          error: t
        } = await K.from("times_mapeamento").delete().eq("id", n.id).eq("created_by", r.id);
        if (t) {
          throw t;
        }
        ye(`Time "${n.nome}" excluído com sucesso!`, "success");
        x(B => B.filter(E => E.id !== n.id));
        if (v?.id === n.id) {
          p(null);
          if (u === "time") {
            w("plinko");
          }
        }
        M(null);
      } catch (t) {
        ye(t.message || "Erro ao excluir time", "error");
      }
    }
  };
  const _a = Ro(y);
  const Yt = Do[_a];
  const Jt = s.useMemo(() => {
    const n = Fa.find(t => t.id === u);
    if (n) {
      return n.color;
    } else {
      return "#FF3038";
    }
  }, [u]);
  const Bt = () => {
    const n = jt.current;
    if (!n) {
      return;
    }
    const t = n.getContext("2d");
    if (!t) {
      return;
    }
    t.clearRect(0, 0, n.width, n.height);
    A.forEach(E => {
      if (!E.visible) {
        return;
      }
      const a = E.id === z;
      const L = E.waypoints;
      if (L.length === 0) {
        return;
      }
      t.save();
      t.globalAlpha = 1;
      const Se = (E.tipo || "rotacao") === "rotacao_inimiga" ? _t[0] : lt[0];
      const Q = E.cor || Se;
      if (L.length > 1) {
        t.beginPath();
        t.moveTo(L[0].x * n.width, L[0].y * n.height);
        for (let xt = 1; xt < L.length; xt++) {
          t.lineTo(L[xt].x * n.width, L[xt].y * n.height);
        }
        t.strokeStyle = Q;
        t.lineWidth = a ? 5 : 2.5;
        t.lineCap = "round";
        t.lineJoin = "round";
        t.stroke();
        const U = L[L.length - 1];
        const $ = L[L.length - 2];
        const ge = $.x * n.width;
        const ve = $.y * n.height;
        const Re = U.x * n.width;
        const ke = U.y * n.height;
        const He = Math.atan2(ke - ve, Re - ge);
        const dt = a ? 14 : 9;
        t.beginPath();
        t.moveTo(Re, ke);
        t.lineTo(Re - dt * Math.cos(He - Math.PI / 6), ke - dt * Math.sin(He - Math.PI / 6));
        t.lineTo(Re - dt * Math.cos(He + Math.PI / 6), ke - dt * Math.sin(He + Math.PI / 6));
        t.closePath();
        t.fillStyle = Q;
        t.fill();
      }
      L.forEach(U => {
        const $ = U.x * n.width;
        const ge = U.y * n.height;
        if (a) {
          t.beginPath();
          t.arc($, ge, 11, 0, Math.PI * 2);
          t.fillStyle = `${Q}40`;
          t.fill();
        }
        t.beginPath();
        t.arc($, ge, a ? 7.5 : 5, 0, Math.PI * 2);
        t.fillStyle = Q;
        t.fill();
        t.strokeStyle = "#FFFFFF";
        t.lineWidth = a ? 2.5 : 1.5;
        t.stroke();
      });
      t.restore();
    });
    D.forEach(E => {
      const a = E.x * n.width;
      const L = E.y * n.height;
      if (E.tipo === "plinko") {
        t.beginPath();
        t.arc(a, L, 6, 0, Math.PI * 2);
        t.fillStyle = "#FFD700";
        t.fill();
        t.fillStyle = "#FFFFFF";
        t.font = "bold 7px sans-serif";
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.fillText("$", a, L);
      } else if (E.tipo === "dropzone") {
        t.beginPath();
        t.arc(a, L, 16, 0, Math.PI * 2);
        t.fillStyle = "#FFFFFF";
        t.fill();
        t.lineWidth = 1;
        t.strokeStyle = "#888888";
        t.stroke();
        t.fillStyle = "#333333";
        t.strokeStyle = "#333333";
        t.lineWidth = 1;
        t.beginPath();
        t.arc(a, L - 3, 8, Math.PI, 0);
        t.fill();
        t.beginPath();
        t.arc(a, L + 8, 2, 0, Math.PI * 2);
        t.fill();
        t.beginPath();
        t.moveTo(a - 8, L - 3);
        t.lineTo(a, L + 8);
        t.moveTo(a, L - 3);
        t.lineTo(a, L + 8);
        t.moveTo(a + 8, L - 3);
        t.lineTo(a, L + 8);
        t.stroke();
        t.fillStyle = "#FFFFFF";
        t.font = "bold 9px sans-serif";
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.fillText("DROP", a, L + 24);
      } else if (E.tipo === "pouso") {
        t.beginPath();
        t.arc(a, L, 16, 0, Math.PI * 2);
        t.fillStyle = "#00BFA5";
        t.fill();
        t.lineWidth = 1.5;
        t.strokeStyle = "#00897B";
        t.stroke();
        t.fillStyle = "#FFFFFF";
        t.strokeStyle = "#FFFFFF";
        t.lineWidth = 2;
        t.beginPath();
        t.arc(a, L - 3, 5, 0, Math.PI * 2);
        t.stroke();
        t.beginPath();
        t.arc(a, L - 3, 2, 0, Math.PI * 2);
        t.fill();
        t.beginPath();
        t.moveTo(a - 5, L + 4);
        t.lineTo(a + 5, L + 4);
        t.lineTo(a, L + 9);
        t.closePath();
        t.fill();
        t.fillStyle = "#FFFFFF";
        t.font = "bold 9px sans-serif";
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.fillText("POUSO", a, L + 24);
      } else if (E.tipo === "mandrako") {
        if (Lt.current) {
          const Se = Math.round(17.535055350553506);
          t.beginPath();
          t.arc(a, L, Se / 2 + 6, 0, Math.PI * 2);
          t.fillStyle = "rgba(0, 200, 83, 0.25)";
          t.fill();
          t.strokeStyle = "#00C853";
          t.lineWidth = 2;
          t.stroke();
          t.drawImage(Lt.current, a - Se / 2, L - 18, Se, 36);
        } else {
          t.beginPath();
          t.arc(a, L, 10, 0, Math.PI * 2);
          t.fillStyle = "#00C853";
          t.fill();
          t.lineWidth = 2;
          t.strokeStyle = "#FFFFFF";
          t.stroke();
          t.fillStyle = "#FFFFFF";
          t.font = "bold 12px sans-serif";
          t.textAlign = "center";
          t.textBaseline = "middle";
          t.fillText("M", a, L);
        }
      } else if (E.tipo === "posicionamento") {
        t.beginPath();
        t.arc(a, L, 16, 0, Math.PI * 2);
        t.fillStyle = "#FF4444";
        t.fill();
        t.lineWidth = 2;
        t.strokeStyle = "#FFFFFF";
        t.stroke();
        t.fillStyle = "#FFFFFF";
        t.strokeStyle = "#FFFFFF";
        t.lineWidth = 2;
        t.beginPath();
        t.arc(a, L - 5, 4, 0, Math.PI * 2);
        t.fill();
        t.beginPath();
        t.moveTo(a, L - 1);
        t.lineTo(a, L + 6);
        t.stroke();
        t.beginPath();
        t.moveTo(a - 6, L + 2);
        t.lineTo(a + 6, L + 2);
        t.stroke();
        t.fillStyle = "#FFFFFF";
        t.font = "bold 10px sans-serif";
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.fillText(E.label, a, L + 12);
      } else if (E.tipo === "barracao") {
        t.beginPath();
        t.arc(a, L, 16, 0, Math.PI * 2);
        t.fillStyle = "#FF6B00";
        t.fill();
        t.strokeStyle = "#FF8C00";
        t.lineWidth = 2;
        t.stroke();
        t.beginPath();
        t.moveTo(a, L - 10);
        t.lineTo(a - 9, L - 3);
        t.lineTo(a + 9, L - 3);
        t.closePath();
        t.fillStyle = "#FFFFFF";
        t.fill();
        t.fillStyle = "#FFFFFF";
        t.fillRect(a - 7, L - 3, 14, 8);
        t.strokeStyle = "#FF6B00";
        t.lineWidth = 1.5;
        t.beginPath();
        t.moveTo(a - 2, L - 3);
        t.lineTo(a - 2, L + 5);
        t.stroke();
        t.beginPath();
        t.moveTo(a + 2, L - 3);
        t.lineTo(a + 2, L + 5);
        t.stroke();
        t.fillStyle = "#FFFFFF";
        t.font = "bold 9px sans-serif";
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.fillText("FARM", a, L + 24);
      } else if (E.tipo === "time") {
        const xe = E.logo_url ? ia(E.logo_url) : "error";
        const Se = 24;
        t.beginPath();
        t.arc(a, L, Se, 0, Math.PI * 2);
        t.fillStyle = "#111827";
        t.fill();
        t.lineWidth = 2.5;
        t.strokeStyle = "#3B82F6";
        t.stroke();
        if (xe && xe !== "error") {
          t.save();
          t.beginPath();
          t.arc(a, L, Se - 2, 0, Math.PI * 2);
          t.clip();
          t.drawImage(xe, a - (Se - 2), L - (Se - 2), (Se - 2) * 2, (Se - 2) * 2);
          t.restore();
        } else {
          t.fillStyle = "#94A3B8";
          t.font = "bold 16px sans-serif";
          t.textAlign = "center";
          t.textBaseline = "middle";
          const Q = (E.nome_time || E.label || "T").charAt(0).toUpperCase();
          t.fillText(Q, a, L);
        }
        t.fillStyle = "#FFFFFF";
        t.font = "bold 10px sans-serif";
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.fillText(E.nome_time || E.label || "TIME", a, L + 33);
      }
    });
    N.forEach(E => {
      const a = E.x * n.width;
      const L = E.y * n.height;
      const xe = E.r * n.width;
      t.beginPath();
      t.arc(a, L, xe, 0, Math.PI * 2);
      t.strokeStyle = "#FFFFFF";
      t.lineWidth = 2.5;
      t.setLineDash([]);
      t.stroke();
      t.fillStyle = "rgba(255,255,255,0.9)";
      t.font = "bold 13px sans-serif";
      t.textAlign = "center";
      t.textBaseline = "middle";
      t.fillText(E.label, a, L + 5);
    });
    const B = fe.current;
    if (B && B.r > 0) {
      const E = B.x * n.width;
      const a = B.y * n.height;
      const L = B.r * n.width;
      t.beginPath();
      t.arc(E, a, L, 0, Math.PI * 2);
      t.setLineDash([5, 3]);
      t.strokeStyle = "rgba(255,255,255,0.6)";
      t.lineWidth = 2;
      t.stroke();
      t.setLineDash([]);
    }
  };
  const it = () => {
    const n = vt.current;
    const t = jt.current;
    if (n && t) {
      t.width = n.clientWidth || n.width;
      t.height = n.clientHeight || n.height;
      const B = n.parentElement;
      if (B) {
        const E = n.getBoundingClientRect();
        const a = B.getBoundingClientRect();
        t.style.width = `${E.width}px`;
        t.style.height = `${E.height}px`;
        t.style.left = `${E.left - a.left}px`;
        t.style.top = `${E.top - a.top}px`;
      }
      Bt();
    }
  };
  s.useEffect(() => {
    it();
  }, [D, A, z, N, Jt, y]);
  s.useEffect(() => {
    window.addEventListener("resize", it);
    let n = null;
    if (vt.current) {
      n = new ResizeObserver(() => {
        it();
      });
      n.observe(vt.current);
    }
    return () => {
      window.removeEventListener("resize", it);
      if (n) {
        n.disconnect();
      }
    };
  }, [D, A, N, Jt, y]);
  const Lt = s.useRef(null);
  const Nt = s.useRef(new Map());
  const Le = s.useRef(null);
  const ia = n => {
    const t = Nt.current.get(n);
    if (t) {
      return t;
    }
    const B = new Image();
    B.crossOrigin = "anonymous";
    B.src = n;
    B.onload = () => {
      Nt.current.set(n, B);
      it();
    };
    B.onerror = () => {
      Nt.current.set(n, "error");
      it();
    };
    return null;
  };
  s.useEffect(() => {
    const n = new Image();
    n.src = "/MASCOSTE/MANDRAKO.png";
    n.onload = () => {
      Lt.current = n;
      it();
    };
  }, []);
  s.useEffect(() => {
    const n = new Image();
    n.src = Eo;
    n.onload = () => {
      Le.current = n;
    };
  }, []);
  const wt = n => {
    if (u === "safe") {
      return;
    }
    const t = jt.current;
    if (!t) {
      return;
    }
    const B = D.filter($ => $.tipo === "posicionamento").length;
    if (u === "posicionamento" && B >= 4) {
      ye("Máximo de 4 jogadores atingido", "error");
      return;
    }
    const E = t.getBoundingClientRect();
    const a = n.clientX - E.left;
    const L = n.clientY - E.top;
    const xe = a / E.width;
    const Se = L / E.height;
    const Q = Math.max(0, Math.min(1, xe));
    const U = Math.max(0, Math.min(1, Se));
    if (u === "dropzone") {
      const $ = {
        x: Q,
        y: U,
        label: "DROP",
        tipo: "dropzone"
      };
      f(ge => [...ge, $]);
      G(ge => [...ge, {
        type: "waypoint"
      }]);
    } else if (u === "pouso") {
      const $ = {
        x: Q,
        y: U,
        label: "POUSO",
        tipo: "pouso"
      };
      f(ge => [...ge, $]);
      G(ge => [...ge, {
        type: "waypoint"
      }]);
    } else if (u === "time") {
      if (!v) {
        ye("Selecione um time no botão \"+ TIME\"", "error");
        Y(true);
        return;
      }
      const $ = D.filter(ke => ke.tipo === "time");
      const ge = new Set($.map(ke => ke.nome_time || ke.label));
      if (ge.size >= 12 && !ge.has(v.nome)) {
        ye("Limite de 12 times diferentes por mapa atingido.", "error");
        return;
      }
      if ($.filter(ke => (ke.nome_time || ke.label) === v.nome).length >= 2) {
        ye("Esse time já tem 2 marcadores no mapa (máximo permitido).", "error");
        return;
      }
      const Re = {
        x: Q,
        y: U,
        label: v.nome,
        tipo: "time",
        logo_url: v.logo_url,
        nome_time: v.nome
      };
      f(ke => [...ke, Re]);
      G(ke => [...ke, {
        type: "waypoint"
      }]);
    } else if (Z) {
      const $ = ee ? ee.waypoints : [];
      const ge = String($.length + 1);
      const ve = {
        x: Q,
        y: U,
        label: ge,
        tipo: u
      };
      const Re = ee ? ee.id : z;
      C(ke => ke.length === 0 ? [{
        id: "tracado-1",
        nome: "Rota 1",
        tipo: u,
        waypoints: [ve],
        visible: true,
        cor: u === "rotacao_inimiga" ? _t[0] : lt[0]
      }] : ke.map(He => He.id === Re ? {
        ...He,
        waypoints: [...He.waypoints, ve]
      } : He));
      G(ke => [...ke, {
        type: "waypoint",
        tracadoId: Re
      }]);
    } else {
      let $ = "";
      if (u === "posicionamento") {
        $ = String(B + 1);
      }
      const ge = {
        x: Q,
        y: U,
        label: $,
        tipo: u
      };
      f(ve => [...ve, ge]);
      G(ve => [...ve, {
        type: "waypoint"
      }]);
    }
  };
  const ya = n => {
    const t = jt.current;
    if (!t) {
      return {
        x: 0,
        y: 0
      };
    }
    const B = t.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (n.clientX - B.left) / B.width)),
      y: Math.max(0, Math.min(1, (n.clientY - B.top) / B.height))
    };
  };
  const Na = n => {
    const t = ya(n);
    oa(t);
    if (ot !== null) {
      if (N.length < 3) {
        const E = ["S1", "S2", "S3"][N.length];
        const a = {
          x: t.x,
          y: t.y,
          r: ot,
          label: E
        };
        i(L => [...L, a]);
        G(L => [...L, {
          type: "safeCircle"
        }]);
        ye(`Safe Zone ${E} adicionada!`, "success");
      } else {
        ye("Máximo de 3 safes atingido", "error");
      }
      W(null);
      return;
    }
    if (u === "safe") {
      fe.current = {
        x: t.x,
        y: t.y,
        r: 0,
        label: ""
      };
      he.current = true;
    }
  };
  const wa = n => {
    if (!he.current || u !== "safe") {
      return;
    }
    const t = fe.current;
    if (!t) {
      return;
    }
    const B = ya(n);
    const E = B.x - t.x;
    const a = B.y - t.y;
    const L = Math.sqrt(E * E + a * a);
    fe.current = {
      ...t,
      r: L
    };
    Bt();
  };
  const se = () => {
    if (!he.current || u !== "safe") {
      return;
    }
    const n = fe.current;
    if (n && n.r > 0.01) {
      if (N.length < 3) {
        const B = ["S1", "S2", "S3"][N.length];
        i(E => [...E, {
          ...n,
          label: B
        }]);
        G(E => [...E, {
          type: "safeCircle"
        }]);
      } else {
        ye("Máximo de 3 safes atingido", "error");
      }
    }
    he.current = false;
    fe.current = null;
    Bt();
  };
  const Ee = () => {
    const n = Oe[Oe.length - 1];
    if (n) {
      if (n.type === "waypoint") {
        if (n.tracadoId) {
          C(t => t.map(B => B.id === n.tracadoId ? {
            ...B,
            waypoints: B.waypoints.slice(0, -1)
          } : B));
        } else {
          f(t => t.slice(0, -1));
        }
      } else if (n.type === "safeCircle") {
        i(t => t.slice(0, -1));
      }
      G(t => t.slice(0, -1));
    }
  };
  const oe = () => {
    f([]);
    i([]);
    C([{
      id: "tracado-1",
      nome: "Rota 1",
      tipo: "rotacao",
      waypoints: [],
      visible: true,
      cor: lt[0]
    }]);
    te("tracado-1");
    G([]);
  };
  const Ze = async () => {
    if (!r || nt) {
      return;
    }
    if (!P.trim()) {
      ye("Dê um nome para a rota", "error");
      return;
    }
    const n = A.reduce((t, B) => t + B.waypoints.length, 0);
    if (D.length === 0 && N.length === 0 && n === 0) {
      ye("Marque pelo menos um ponto no mapa", "error");
      return;
    }
    Vt(true);
    try {
      const t = A.flatMap(a => a.waypoints);
      const B = [...D, ...t];
      const {
        error: E
      } = await K.from("rotas_estudo").insert({
        user_id: r.id,
        nome: P.trim().toUpperCase(),
        mapa: y,
        tipo: u,
        waypoints: {
          tracados: A,
          points: B,
          circles: N
        }
      });
      if (E) {
        throw E;
      }
      ye("Rota salva com sucesso!", "success");
      k("");
      f([]);
      i([]);
      C([{
        id: "tracado-1",
        nome: "Rota 1",
        tipo: "rotacao",
        waypoints: [],
        visible: true,
        cor: lt[0]
      }]);
      te("tracado-1");
      G([]);
      It();
    } catch (t) {
      ye(t.message || "Erro ao salvar rota", "error");
    } finally {
      Vt(false);
    }
  };
  const qt = n => {
    S(n.mapa);
    w(n.tipo);
    k(n.nome);
    const t = n.waypoints;
    if (t && t.tracados && Array.isArray(t.tracados) && t.tracados.length > 0) {
      const B = t.tracados.map((E, a) => {
        const L = E.tipo || (n.tipo === "rotacao_inimiga" ? "rotacao_inimiga" : "rotacao");
        const xe = L === "rotacao_inimiga" ? _t : lt;
        return {
          id: E.id || `tracado-${a + 1}`,
          nome: E.nome || `Rota ${a + 1}`,
          tipo: L,
          waypoints: Array.isArray(E.waypoints) ? E.waypoints : [],
          visible: E.visible !== undefined ? E.visible : true,
          cor: E.cor || xe[a % xe.length]
        };
      });
      C(B);
      te(B[0].id);
      f(Array.isArray(t.points) ? t.points.filter(E => E.tipo !== "rotacao" && E.tipo !== "rotacao_inimiga") : []);
      i(t.circles || []);
    } else if (Array.isArray(t)) {
      const B = t.filter(xe => xe.tipo === "rotacao" || xe.tipo === "rotacao_inimiga");
      const E = t.filter(xe => xe.tipo !== "rotacao" && xe.tipo !== "rotacao_inimiga");
      const a = n.tipo === "rotacao_inimiga" ? _t[0] : lt[0];
      const L = {
        id: "tracado-1",
        nome: "Rota 1",
        tipo: n.tipo === "rotacao_inimiga" ? "rotacao_inimiga" : "rotacao",
        waypoints: B,
        visible: true,
        cor: a
      };
      C([L]);
      te("tracado-1");
      f(E);
      i([]);
    } else {
      const B = t?.points || [];
      const E = B.filter(Se => Se.tipo === "rotacao" || Se.tipo === "rotacao_inimiga");
      const a = B.filter(Se => Se.tipo !== "rotacao" && Se.tipo !== "rotacao_inimiga");
      const L = n.tipo === "rotacao_inimiga" ? _t[0] : lt[0];
      const xe = {
        id: "tracado-1",
        nome: "Rota 1",
        tipo: n.tipo === "rotacao_inimiga" ? "rotacao_inimiga" : "rotacao",
        waypoints: E,
        visible: true,
        cor: L
      };
      C([xe]);
      te("tracado-1");
      f(a);
      i(t?.circles || []);
    }
    G([]);
    ye(`Rota "${n.nome}" carregada!`, "success");
  };
  const Xt = async (n, t) => {
    if (window.confirm(`Tem certeza que deseja excluir a rota "${t}"?`)) {
      Vt(true);
      try {
        const {
          error: B
        } = await K.from("rotas_estudo").delete().eq("id", n);
        if (B) {
          throw B;
        }
        ye("Rota excluída!", "success");
        It();
      } catch (B) {
        ye(B.message || "Erro ao excluir rota", "error");
      } finally {
        Vt(false);
      }
    }
  };
  const Sa = async () => {
    const n = vt.current;
    if (!n) {
      return;
    }
    const t = D.filter(Q => Q.tipo === "time" && Q.logo_url).map(Q => Q.logo_url);
    const B = [];
    if (t.length > 0) {
      Array.from(new Set(t)).forEach(U => {
        B.push(new Promise($ => {
          const ge = Nt.current.get(U);
          if (ge) {
            $(ge);
            return;
          }
          const ve = new Image();
          ve.crossOrigin = "anonymous";
          ve.src = U;
          ve.onload = () => {
            Nt.current.set(U, ve);
            $(ve);
          };
          ve.onerror = () => {
            Nt.current.set(U, "error");
            $("error");
          };
        }));
      });
    }
    await Promise.all(B);
    const E = document.createElement("canvas");
    E.width = 1000;
    E.height = 1000;
    const a = E.getContext("2d");
    if (!a) {
      return;
    }
    a.drawImage(n, 0, 0, 1000, 1000);
    A.forEach(Q => {
      if (!Q.visible) {
        return;
      }
      const U = Q.waypoints;
      if (U.length === 0) {
        return;
      }
      const ge = (Q.tipo || "rotacao") === "rotacao_inimiga" ? _t[0] : lt[0];
      const ve = Q.cor || ge;
      if (U.length > 1) {
        a.beginPath();
        a.moveTo(U[0].x * 1000, U[0].y * 1000);
        for (let ea = 1; ea < U.length; ea++) {
          a.lineTo(U[ea].x * 1000, U[ea].y * 1000);
        }
        a.strokeStyle = ve;
        a.lineWidth = 4;
        a.lineCap = "round";
        a.lineJoin = "round";
        a.stroke();
        const Re = U[U.length - 1];
        const ke = U[U.length - 2];
        const He = ke.x * 1000;
        const dt = ke.y * 1000;
        const xt = Re.x * 1000;
        const Zt = Re.y * 1000;
        const Ue = Math.atan2(Zt - dt, xt - He);
        const mt = 16;
        a.beginPath();
        a.moveTo(xt, Zt);
        a.lineTo(xt - mt * Math.cos(Ue - Math.PI / 6), Zt - mt * Math.sin(Ue - Math.PI / 6));
        a.lineTo(xt - mt * Math.cos(Ue + Math.PI / 6), Zt - mt * Math.sin(Ue + Math.PI / 6));
        a.closePath();
        a.fillStyle = ve;
        a.fill();
      }
      U.forEach(Re => {
        const ke = Re.x * 1000;
        const He = Re.y * 1000;
        a.beginPath();
        a.arc(ke, He, 9, 0, Math.PI * 2);
        a.fillStyle = ve;
        a.fill();
        a.strokeStyle = "#FFFFFF";
        a.lineWidth = 3;
        a.stroke();
      });
    });
    D.forEach(Q => {
      const U = Q.x * 1000;
      const $ = Q.y * 1000;
      if (Q.tipo === "plinko") {
        a.beginPath();
        a.arc(U, $, 10, 0, Math.PI * 2);
        a.fillStyle = "#FFD700";
        a.fill();
        a.fillStyle = "#FFFFFF";
        a.font = "bold 11px sans-serif";
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.fillText("$", U, $);
      } else if (Q.tipo === "dropzone") {
        a.beginPath();
        a.arc(U, $, 24, 0, Math.PI * 2);
        a.fillStyle = "#FFFFFF";
        a.fill();
        a.lineWidth = 1;
        a.strokeStyle = "#888888";
        a.stroke();
        a.fillStyle = "#333333";
        a.strokeStyle = "#333333";
        a.lineWidth = 1;
        a.beginPath();
        a.arc(U, $ - 4, 12, Math.PI, 0);
        a.fill();
        a.beginPath();
        a.arc(U, $ + 12, 3, 0, Math.PI * 2);
        a.fill();
        a.beginPath();
        a.moveTo(U - 12, $ - 4);
        a.lineTo(U, $ + 12);
        a.moveTo(U, $ - 4);
        a.lineTo(U, $ + 12);
        a.moveTo(U + 12, $ - 4);
        a.lineTo(U, $ + 12);
        a.stroke();
        a.fillStyle = "#FFFFFF";
        a.font = "bold 14px sans-serif";
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.fillText("DROP", U, $ + 36);
      } else if (Q.tipo === "mandrako") {
        if (Lt.current) {
          const ve = Math.round(26.30258302583026);
          a.beginPath();
          a.arc(U, $, ve / 2 + 9, 0, Math.PI * 2);
          a.fillStyle = "rgba(0, 200, 83, 0.25)";
          a.fill();
          a.strokeStyle = "#00C853";
          a.lineWidth = 3;
          a.stroke();
          a.drawImage(Lt.current, U - ve / 2, $ - 27, ve, 54);
        } else {
          a.beginPath();
          a.arc(U, $, 15, 0, Math.PI * 2);
          a.fillStyle = "#00C853";
          a.fill();
          a.lineWidth = 3;
          a.strokeStyle = "#FFFFFF";
          a.stroke();
          a.fillStyle = "#FFFFFF";
          a.font = "bold 16px sans-serif";
          a.textAlign = "center";
          a.textBaseline = "middle";
          a.fillText("M", U, $);
        }
      } else if (Q.tipo === "posicionamento") {
        a.beginPath();
        a.arc(U, $, 24, 0, Math.PI * 2);
        a.fillStyle = "#FF4444";
        a.fill();
        a.lineWidth = 3;
        a.strokeStyle = "#FFFFFF";
        a.stroke();
        a.fillStyle = "#FFFFFF";
        a.strokeStyle = "#FFFFFF";
        a.lineWidth = 3;
        a.beginPath();
        a.arc(U, $ - 7.5, 6, 0, Math.PI * 2);
        a.fill();
        a.beginPath();
        a.moveTo(U, $ - 1.5);
        a.lineTo(U, $ + 9);
        a.stroke();
        a.beginPath();
        a.moveTo(U - 9, $ + 3);
        a.lineTo(U + 9, $ + 3);
        a.stroke();
        a.fillStyle = "#FFFFFF";
        a.font = "bold 14px sans-serif";
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.fillText(Q.label, U, $ + 18);
      } else if (Q.tipo === "barracao") {
        a.beginPath();
        a.arc(U, $, 24, 0, Math.PI * 2);
        a.fillStyle = "#FF6B00";
        a.fill();
        a.strokeStyle = "#FF8C00";
        a.lineWidth = 3;
        a.stroke();
        a.beginPath();
        a.moveTo(U, $ - 15);
        a.lineTo(U - 13, $ - 4.5);
        a.lineTo(U + 13, $ - 4.5);
        a.closePath();
        a.fillStyle = "#FFFFFF";
        a.fill();
        a.fillStyle = "#FFFFFF";
        a.fillRect(U - 10, $ - 4.5, 20, 12);
        a.strokeStyle = "#FF6B00";
        a.lineWidth = 2;
        a.beginPath();
        a.moveTo(U - 3, $ - 4.5);
        a.lineTo(U - 3, $ + 7.5);
        a.stroke();
        a.beginPath();
        a.moveTo(U + 3, $ - 4.5);
        a.lineTo(U + 3, $ + 7.5);
        a.stroke();
        a.fillStyle = "#FFFFFF";
        a.font = "bold 14px sans-serif";
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.fillText("FARM", U, $ + 36);
      } else if (Q.tipo === "rotacao") {
        a.beginPath();
        a.arc(U, $, 11, 0, Math.PI * 2);
        a.fillStyle = "#FF3038";
        a.fill();
        a.strokeStyle = "#FFFFFF";
        a.lineWidth = 3.5;
        a.stroke();
      } else if (Q.tipo === "rotacao_inimiga") {
        a.beginPath();
        a.arc(U, $, 11, 0, Math.PI * 2);
        a.fillStyle = "#FF1744";
        a.fill();
        a.strokeStyle = "#FFFFFF";
        a.lineWidth = 3.5;
        a.stroke();
      } else if (Q.tipo === "pouso") {
        a.beginPath();
        a.arc(U, $, 24, 0, Math.PI * 2);
        a.fillStyle = "#00BFA5";
        a.fill();
        a.lineWidth = 2;
        a.strokeStyle = "#00897B";
        a.stroke();
        a.fillStyle = "#FFFFFF";
        a.strokeStyle = "#FFFFFF";
        a.lineWidth = 3;
        a.beginPath();
        a.arc(U, $ - 4.5, 7.5, 0, Math.PI * 2);
        a.stroke();
        a.beginPath();
        a.arc(U, $ - 4.5, 3, 0, Math.PI * 2);
        a.fill();
        a.beginPath();
        a.moveTo(U - 7.5, $ + 6);
        a.lineTo(U + 7.5, $ + 6);
        a.lineTo(U, $ + 13.5);
        a.closePath();
        a.fill();
        a.fillStyle = "#FFFFFF";
        a.font = "bold 14px sans-serif";
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.fillText("POUSO", U, $ + 36);
      } else if (Q.tipo === "time") {
        const ge = Q.logo_url ? ia(Q.logo_url) : "error";
        const ve = 36;
        a.beginPath();
        a.arc(U, $, ve, 0, Math.PI * 2);
        a.fillStyle = "#111827";
        a.fill();
        a.lineWidth = 4;
        a.strokeStyle = "#3B82F6";
        a.stroke();
        if (ge && ge !== "error") {
          a.save();
          a.beginPath();
          a.arc(U, $, ve - 3, 0, Math.PI * 2);
          a.clip();
          a.drawImage(ge, U - (ve - 3), $ - (ve - 3), (ve - 3) * 2, (ve - 3) * 2);
          a.restore();
        } else {
          a.fillStyle = "#94A3B8";
          a.font = "bold 24px sans-serif";
          a.textAlign = "center";
          a.textBaseline = "middle";
          const Re = (Q.nome_time || Q.label || "T").charAt(0).toUpperCase();
          a.fillText(Re, U, $);
        }
        a.fillStyle = "#FFFFFF";
        a.font = "bold 15px sans-serif";
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.fillText((Q.nome_time || Q.label || "TIME").toUpperCase(), U, $ + ve + 16);
      }
    });
    N.forEach(Q => {
      const U = Q.x * 1000;
      const $ = Q.y * 1000;
      const ge = Q.r * 1000;
      a.beginPath();
      a.arc(U, $, ge, 0, Math.PI * 2);
      a.strokeStyle = "#FFFFFF";
      a.lineWidth = 4;
      a.setLineDash([]);
      a.stroke();
      a.fillStyle = "rgba(255,255,255,0.9)";
      a.font = "bold 20px sans-serif";
      a.textAlign = "center";
      a.textBaseline = "middle";
      a.fillText(Q.label, U, $ + 7);
    });
    if (Le.current) {
      const U = Le.current.naturalHeight / Le.current.naturalWidth;
      const $ = Math.round(U * 75);
      const ge = 20;
      const ve = 925 - ge;
      const Re = 1000 - $ - ge;
      a.save();
      a.globalAlpha = 0.55;
      a.drawImage(Le.current, ve, Re, 75, $);
      a.restore();
    }
    const L = E.toDataURL("image/png");
    const xe = document.createElement("a");
    const Se = (P.trim() || "sem_nome").replace(/\s+/g, "_").toLowerCase();
    xe.download = `ctracker_rota_${Se}_${y.toLowerCase()}.png`;
    xe.href = L;
    xe.click();
  };
  if (j) {
    return <Ct activeTab="rotas"><div className="h-full w-full flex flex-col items-center justify-center space-y-6 bg-[var(--bg-main)]"><div className="w-12 h-12 rounded-lg border-2 border-[var(--accent)]/20 border-t-[var(--accent)] animate-spin" /><p className="text-label animate-pulse text-[var(--accent)]">Verificando Credenciais...</p></div></Ct>;
  }
  if (!yt) {
    return <Ct activeTab="rotas"><div className="flex-1 flex items-center justify-center p-8 bg-[#0F0F0F] font-['Inter',sans-serif]"><div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-reveal"><div className="mx-auto w-16 h-16 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] shadow-[0_0_20px_rgba(91,95,255,0.1)]"><Ft size={28} /></div><div className="space-y-3"><h3 className="text-heading text-xl font-black uppercase tracking-tight text-white">Estratégias Bloqueado</h3><p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">Acesse o criador de rotas e drop táticos profissionais. Contrate o módulo adicional de estratégias para liberar acesso completo.</p></div><div className="border-t border-[var(--border-default)] pt-4 flex flex-col items-center"><span className="text-[var(--text-secondary)] text-[11px] font-bold uppercase tracking-wider mb-1">Assinatura Mensal</span><span className="text-3xl font-black text-white font-mono">R$ 9,90<span className="text-sm font-normal text-[var(--text-tertiary)]">/mês</span></span></div><a href={g()} target="_blank" rel="noopener noreferrer" className="w-full bg-[#FF3038] hover:bg-[#E41F29] text-white py-3.5 px-4 rounded-xl font-bold text-caption uppercase tracking-wider block text-center transition-all duration-150 shadow-md active:scale-95 flex items-center justify-center gap-2">Assinar Módulo Estratégias</a></div></div></Ct>;
  }
  const la = () => T ? <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-reveal"><div className="bg-[#12141A] border border-[var(--border-default)] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"><div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]"><div className="flex items-center gap-2.5"><div className="p-1.5 border border-blue-500/30 rounded-lg bg-blue-500/10 text-blue-400"><_Component47 size={18} /></div><div><h3 className="text-body font-bold text-white uppercase tracking-wider">Mapeamento de Times</h3><p className="text-[11px] text-[var(--text-tertiary)]">Cadastre e posicione a logo das equipes no mapa</p></div></div><button type="button" onClick={() => Y(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-tertiary)] hover:text-white transition-colors"><Ye size={18} /></button></div><div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-main)]"><button type="button" onClick={() => _("select")} className={`flex-1 py-3 text-caption-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${X === "select" ? "border-[#FF3038] text-white bg-[var(--bg-surface)]" : "border-transparent text-[var(--text-tertiary)] hover:text-white"}`}>Selecionar Time ({m.length})</button><button type="button" onClick={() => _("create")} className={`flex-1 py-3 text-caption-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${X === "create" ? "border-[#FF3038] text-white bg-[var(--bg-surface)]" : "border-transparent text-[var(--text-tertiary)] hover:text-white"}`}>+ Cadastrar Novo Time</button></div><div className="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-4">{X === "select" && <div className="space-y-4"><input type="text" value={be} onChange={n => ue(n.target.value)} placeholder="Buscar time pelo nome..." className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#FF3038] font-bold text-white" />{h ? <div className="py-8 flex justify-center"><Tt className="animate-spin text-[#FF3038]" size={24} /></div> : m.filter(n => n.nome.toLowerCase().includes(be.toLowerCase())).length === 0 ? <div className="text-center py-8 space-y-3 border border-dashed border-[var(--border-subtle)] rounded-xl p-4"><p className="text-caption text-[var(--text-tertiary)]">Nenhum time encontrado.</p><button type="button" onClick={() => _("create")} className="px-4 py-2 bg-[#FF3038] hover:bg-[#E41F29] text-white rounded-lg font-bold text-xs uppercase transition-all">+ Cadastrar Novo Time</button></div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{(() => {
              const n = D.filter(E => E.tipo === "time");
              const t = new Set(n.map(E => E.nome_time || E.label));
              const B = t.size;
              return m.filter(E => E.nome.toLowerCase().includes(be.toLowerCase())).map(E => {
                const a = r?.id && E.created_by === r.id;
                const L = t.has(E.nome);
                const xe = n.filter($ => ($.nome_time || $.label) === E.nome).length;
                const Se = B >= 12 && !L;
                const Q = xe >= 2;
                const U = Se || Q;
                return <div onClick={() => {
                  if (Q) {
                    ye("Esse time já tem 2 marcadores no mapa (máximo permitido).", "error");
                    return;
                  }
                  if (Se) {
                    ye("Limite de 12 times diferentes por mapa atingido.", "error");
                    return;
                  }
                  p(E);
                  w("time");
                  Y(false);
                  ye(`Time "${E.nome}" selecionado! Clique no mapa.`, "success");
                }} className={`p-3 bg-[var(--bg-surface)] border rounded-xl flex items-center justify-between gap-3 transition-all ${U ? "opacity-50 cursor-not-allowed border-[var(--border-subtle)]" : v?.id === E.id ? "border-[#3B82F6] ring-1 ring-[#3B82F6] cursor-pointer hover:bg-[var(--bg-hover)]" : "border-[var(--border-default)] cursor-pointer hover:bg-[var(--bg-hover)]"}`} key={E.id}><div className="flex items-center gap-3 min-w-0"><div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">{E.logo_url ? <img src={E.logo_url} alt={E.nome} className="w-full h-full object-contain" onError={$ => {
                        $.target.style.display = "none";
                      }} /> : <span className="font-bold text-white text-xs">{E.nome.charAt(0)}</span>}</div><div className="flex flex-col min-w-0"><span className="font-bold text-white text-caption truncate uppercase">{E.nome}</span>{xe > 0 && <span className="text-[9px] font-semibold text-blue-400">{xe}/2 no mapa</span>}</div></div><div className="flex items-center gap-1.5 shrink-0">{a && <button type="button" onClick={$ => {
                      $.stopPropagation();
                      M(E);
                    }} className="p-1.5 text-red-400 hover:text-white hover:bg-red-950/40 border border-red-500/20 rounded-lg transition-colors" title="Excluir Time"><_Component15 size={13} /></button>}<button type="button" disabled={U} className={`px-2.5 py-1 text-white rounded-lg text-[10px] font-bold uppercase transition-all ${U ? "bg-gray-600/50 cursor-not-allowed" : "bg-[#3B82F6] hover:bg-blue-600"}`}>Usar</button></div></div>;
              });
            })()}</div>}</div>}{ae && <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-reveal"><div className="bg-[#181A20] border border-[var(--border-default)] rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl"><div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400"><_Component15 size={24} /></div><h4 className="text-body font-bold text-white uppercase tracking-wider">Excluir Time?</h4><p className="text-caption text-[var(--text-secondary)] leading-relaxed">Tem certeza que deseja excluir o time <strong className="text-white uppercase">{ae.nome}</strong>? Essa ação não pode ser desfeita.</p><div className="flex gap-2 pt-2"><button type="button" onClick={() => M(null)} className="flex-1 py-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border-default)] rounded-xl font-bold text-xs uppercase text-white transition-all">Cancelar</button><button type="button" onClick={() => Ia(ae)} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase transition-all shadow-md">Excluir</button></div></div></div>}{X === "create" && <form onSubmit={na} className="space-y-4"><div className="space-y-1.5"><label className="text-caption-sm font-bold text-[var(--text-secondary)] uppercase">Nome do Time</label><input type="text" value={q} onChange={n => V(n.target.value)} placeholder="Ex: LOUD, Fluxo, Pain Gaming" className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#FF3038] font-bold text-white uppercase" required={true} /></div><div className="space-y-1.5"><label className="text-caption-sm font-bold text-[var(--text-secondary)] uppercase">URL da Logo Externa</label><input type="url" value={H} onChange={n => je(n.target.value)} placeholder="https://exemplo.com/logo.png" className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#FF3038] font-mono text-white" required={true} /><a href="https://youtu.be/KZYK9lBdm9c" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-[#FF3038] hover:text-[#7A7DFF] transition-colors mt-1 hover:underline font-medium"><_Component48 className="w-3 h-3" /><span>Não sabe como pegar o link da imagem? Veja o tutorial</span></a></div>{H.trim() && <div className="p-3 bg-black/40 border border-[var(--border-subtle)] rounded-xl flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-black/60 border border-white/20 flex items-center justify-center overflow-hidden shrink-0"><img src={H.trim()} alt="Preview Logo" className="w-full h-full object-contain" onError={n => {
                n.target.style.display = "none";
              }} /></div><div><p className="text-caption-sm font-bold text-white">Pré-visualização</p><p className="text-[10px] text-[var(--text-tertiary)]">Como o escudo aparecerá no mapa</p></div></div>}<button type="submit" disabled={Ne || !q.trim() || !H.trim()} className="w-full bg-[#FF3038] hover:bg-[#E41F29] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg">{Ne ? <Tt size={16} className="animate-spin" /> : <Kt size={16} />}Salvar e Selecionar Time</button></form>}</div></div></div> : null;
  if (ce) {
    return <Ct activeTab="rotas"><div className="ctracker-route-workspace flex flex-col w-full min-h-full font-['Inter',sans-serif] bg-[var(--bg-main)] p-4 pb-[24px]">{ct && <_Component49 message={ct.message} type={ct.type} />}<div className="flex flex-col gap-2 pb-3 border-b border-[var(--border-subtle)] shrink-0 sticky top-0 z-20 bg-[var(--bg-main)]/95 backdrop-blur-md pt-1"><div className="flex items-center gap-3"><div className="p-1.5 border border-[var(--border-default)] rounded-md bg-[var(--bg-surface)] shrink-0"><_Component19 size={16} className="text-[var(--accent)]" /></div><h2 className="text-heading text-sm font-bold shrink-0">Planejamento de Rota</h2></div><input type="text" value={P} onChange={n => k(n.target.value)} placeholder="Ex: Rota de Invasão Purgatório" className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[var(--accent)] uppercase font-bold text-white w-full route-planner-input" /></div><div className="flex gap-2 w-full py-3 shrink-0"><select value={y} onChange={n => {
            S(n.target.value);
            f([]);
            i([]);
            G([]);
          }} className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer font-bold text-white route-planner-select">{Ss.map(n => <option value={n} key={n}>{n}</option>)}</select><select value={u} onChange={n => w(n.target.value)} style={{
            borderColor: Jt,
            backgroundColor: `${Jt}1A`
          }} className="flex-1 bg-[var(--bg-surface)] border rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer font-bold text-white route-planner-select"><option value="plinko">🟡 PLINKO</option><option value="dropzone">🪂 DROP ZONE</option><option value="pouso">🟢 POUSO</option><option value="mandrako">🟢 MANDRAKO</option><option value="rotacao">🔵 ROTAÇÃO</option><option value="rotacao_inimiga">🔴 ROTA INIMIGA</option><option value="posicionamento">🔴 POSICIONAMENTO</option><option value="barracao">🗑️ BARRACÃO</option><option value="safe">⭕ SAFE</option></select></div><button type="button" onClick={() => Y(true)} style={u === "time" ? {
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          color: "#FFFFFF"
        } : {
          borderColor: "var(--border-default)",
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-secondary)"
        }} className={`w-full py-2 px-3 border rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 shrink-0 route-planner-chip mb-3 ${u === "time" ? "font-extrabold text-white" : ""}`}><Kt size={14} className="shrink-0 text-[#3B82F6]" /><span>{v ? `TIME: ${v.nome}` : "+ ADICIONAR TIME"}</span></button>{Z && <div className="flex items-center gap-1.5 py-2 px-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl mb-3 shrink-0"><div className="relative flex-1 min-w-0"><select value={z} onChange={n => te(n.target.value)} className="w-full bg-[var(--bg-main)] border border-[var(--border-default)] rounded-lg text-xs font-bold text-white py-2 pl-2.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:border-[var(--accent)] truncate" style={{
              minHeight: "36px"
            }}>{A.map(n => <option value={n.id} key={n.id}>{`● ${n.nome} (${n.waypoints.length} pts)`}</option>)}</select><span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-[10px]">▼</span></div>{ee && <button type="button" onClick={n => Xe(ee.id, n)} className="p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-default)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-white transition-all shrink-0" style={{
            minHeight: "36px",
            minWidth: "36px"
          }} title={ee.visible ? "Ocultar este traçado" : "Exibir este traçado"}>{ee.visible ? <Va size={13} className="text-emerald-400" /> : <Qa size={13} className="text-red-400" />}</button>}{ee && A.length > 1 && <button type="button" onClick={n => Pe(ee.id, n)} className="p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-default)] hover:border-red-500 text-[var(--text-tertiary)] hover:text-red-400 transition-all shrink-0" style={{
            minHeight: "36px",
            minWidth: "36px"
          }} title="Excluir este traçado"><Ye size={13} /></button>}<button type="button" onClick={Fe} className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-[#FF3038] hover:bg-[#E41F29] text-white text-xs font-bold uppercase transition-all shrink-0 shadow-sm" style={{
            minHeight: "36px"
          }} title="Criar novo traçado"><Kt size={13} /></button></div>}<div className="w-full max-w-full relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-center min-h-[250px] shrink-0">{Yt ? <div style={{
            position: "relative",
            display: "inline-block"
          }} className="max-w-full max-h-full"><img ref={vt} src={Yt} alt={`Mapa ${y}`} onLoad={it} className="w-full h-auto object-contain opacity-85" draggable={false} /><canvas ref={jt} onClick={wt} onPointerDown={Na} onPointerMove={wa} onPointerUp={se} onPointerLeave={se} style={{
              position: "absolute",
              cursor: ot !== null ? "crosshair" : u === "safe" ? "cell" : "crosshair",
              zIndex: 10,
              touchAction: "none"
            }} />{ot !== null && <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-[#FF3038] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg animate-pulse flex items-center gap-2"><span>Toque no mapa para posicionar a Safe Zone</span><button type="button" onClick={() => W(null)} className="p-0.5 hover:bg-white/20 rounded-full"><Ye size={14} /></button></div>}{u === "safe" && <button type="button" onClick={() => gt(true)} disabled={N.length >= 3} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#FF3038] hover:bg-[#E41F29] disabled:opacity-50 disabled:hover:bg-[#FF3038] disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap route-planner-chip animate-reveal">+ Adicionar Safe Zone</button>}</div> : <p className="text-[var(--text-secondary)]">Mapa não configurado.</p>}{ft && <div className="absolute inset-0 bg-black/60 z-40 flex items-end justify-center transition-opacity duration-300"><div className="absolute inset-0" onClick={() => gt(false)} /><div className="relative w-full max-w-md bg-[#0F0F0F] border-t border-[var(--border-default)] rounded-t-2xl p-6 z-50 animate-slide-up space-y-5 shadow-2xl"><div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]"><h3 className="text-body font-bold text-[#EDEDED] uppercase tracking-wider">Tamanho da Safe Zone</h3><button type="button" onClick={() => gt(false)} className="p-1 rounded-md hover:bg-white/5 text-[var(--text-tertiary)] hover:text-white transition-colors"><Ye size={16} /></button></div><div className="space-y-3">{[{
                  id: "pequeno",
                  label: "Pequeno",
                  desc: "Raio: 15% da largura do mapa",
                  radius: 0.15
                }, {
                  id: "medio",
                  label: "Médio",
                  desc: "Raio: 25% da largura do mapa",
                  radius: 0.25
                }, {
                  id: "grande",
                  label: "Grande",
                  desc: "Raio: 35% da largura do mapa",
                  radius: 0.35
                }].map(n => <button type="button" onClick={() => {
                  if (window.matchMedia("(pointer: coarse)").matches) {
                    W(n.radius);
                    gt(false);
                    ye("Toque no mapa para posicionar a Safe Zone", "success");
                  } else {
                    const E = ["S1", "S2", "S3"][N.length];
                    const a = {
                      x: Wt.x,
                      y: Wt.y,
                      r: n.radius,
                      label: E
                    };
                    i(L => [...L, a]);
                    G(L => [...L, {
                      type: "safeCircle"
                    }]);
                    gt(false);
                    ye(`Safe Zone ${E} adicionada!`, "success");
                  }
                }} className="w-full flex items-center justify-between p-4 bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border-default)] hover:border-[#FF3038] rounded-xl text-left transition-all active:scale-[0.98] route-planner-chip" key={n.id}><div><p className="text-caption font-bold text-[#EDEDED]">{n.label}</p><p className="text-[10px] text-[var(--text-tertiary)]">{n.desc}</p></div><span className="text-[11px] font-black text-[#FF3038] uppercase tracking-wider font-mono">{n.radius * 100}%</span></button>)}</div></div></div>}{pe && <div className="absolute top-0 right-0 z-30 h-full w-[300px] bg-[var(--bg-surface)]/95 backdrop-blur-md border-l border-[var(--border-default)] shadow-2xl flex flex-col p-4 animate-reveal"><div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4"><h3 className="text-body font-bold text-white uppercase tracking-wider">Rotas Salvas</h3><button onClick={() => Ae(false)} className="p-1 rounded-md hover:bg-white/5 text-[var(--text-tertiary)] hover:text-white transition-colors"><Ye size={16} /></button></div><div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">{Me ? <div className="py-8 flex justify-center"><Tt className="animate-spin text-[var(--accent)]" size={20} /></div> : qe.length === 0 ? <p className="text-[11px] text-[var(--text-tertiary)] text-center py-6">Nenhuma rota salva ainda.</p> : qe.map(n => {
                const t = Fa.find(B => B.id === n.tipo);
                return <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl flex flex-col gap-2.5 hover:border-[var(--accent)]/50 transition-all" key={n.id}><div className="flex flex-col gap-1 min-w-0"><span className="text-caption-sm font-black text-white uppercase truncate">{n.nome}</span><div className="flex items-center gap-1.5 text-[9px] text-[var(--text-tertiary)] font-bold"><span className="uppercase bg-[var(--bg-main)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">{n.mapa}</span><span style={{
                        color: t ? t.color : "#FFFFFF",
                        borderColor: t ? `${t.color}40` : "var(--border-subtle)",
                        backgroundColor: t ? `${t.color}15` : "transparent"
                      }} className="uppercase px-1.5 py-0.5 rounded border font-extrabold">{t ? t.label : n.tipo}</span></div></div><div className="flex items-center gap-1.5 w-full mt-1 border-t border-[var(--border-subtle)] pt-2"><button onClick={() => {
                      qt(n);
                      Ae(false);
                    }} className="flex-1 py-1 bg-[var(--bg-main)] hover:bg-[var(--accent)] hover:text-white rounded border border-[var(--border-default)] text-[9px] font-extrabold uppercase transition-all text-center text-white route-planner-chip">Carregar</button><button onClick={() => Xt(n.id, n.nome)} className="p-1 bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white rounded border border-red-500/20 transition-all route-planner-chip" title="Excluir Rota"><_Component15 size={11} /></button></div></div>;
              })}</div></div>}</div><div className="py-2 text-center shrink-0"><p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">{u === "safe" ? "Use o botão flutuante para adicionar safe zones." : "Clique no mapa para marcar os caminhos."}</p></div><div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)] py-1.5 px-1 shrink-0"><span>Pontos: <strong className="text-[#FF3038] font-mono text-sm">{Z ? ee ? ee.waypoints.length : 0 : D.length + N.length}</strong></span>{Z ? <span className="text-[11px] text-[var(--text-tertiary)]">Traçado ativo: <strong className="text-white font-semibold">{ee ? ee.nome : "Rota 1"}</strong></span> : <span className="text-[11px] text-[var(--text-tertiary)]">Traçados: <strong className="text-white font-semibold">{A.length}</strong></span>}</div><div className="flex flex-col gap-2 pt-2 border-t border-[var(--border-subtle)] shrink-0 bg-[var(--bg-main)]"><div className="flex gap-2 w-full"><button type="button" onClick={oe} disabled={D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0) || nt} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs font-bold text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed route-planner-chip"><_Component15 size={13} /> Limpar</button><button type="button" onClick={Ee} disabled={D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0) || nt} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed route-planner-chip"><Ha size={13} /> Desfazer</button></div><div className="flex gap-2 w-full"><button type="button" onClick={() => Ae(n => !n)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs font-bold text-white transition-all route-planner-chip">📋 Rotas Salvas ({qe.length})</button><button type="button" onClick={Sa} disabled={D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed route-planner-chip"><Wa size={13} /> Exportar PNG</button></div><div className="flex gap-2 w-full"><Xa variant="inline" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#FF3038]/40 bg-[#FF3038]/10 hover:bg-[#FF3038]/20 text-xs font-bold text-[#FF3038] transition-all route-planner-chip" /><button type="button" onClick={Ze} disabled={nt || D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0) || !P.trim()} className="flex-1 bg-[#FF3038] hover:bg-[#E41F29] text-white py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md route-planner-chip">{nt ? <Tt size={13} className="animate-spin" /> : <Ra size={13} />} Salvar Rota</button></div></div></div>{la()}</Ct>;
  } else {
    return <Ct activeTab="rotas"><div className="ctracker-route-workspace flex flex-col h-full font-['Inter',sans-serif] bg-[var(--bg-main)] p-4 sm:p-6 pb-[96px] sm:pb-6 overflow-hidden">{ct && <_Component49 message={ct.message} type={ct.type} />}<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)] shrink-0"><div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto"><div className="flex items-center gap-3"><div className="p-1.5 border border-[var(--border-default)] rounded-md bg-[var(--bg-surface)] shrink-0"><_Component19 size={16} className="text-[var(--accent)]" /></div><h2 className="text-heading text-sm font-bold shrink-0">Planejamento de Rota</h2></div><input type="text" value={P} onChange={n => k(n.target.value)} placeholder="Ex: Rota de Invasão Purgatório" className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg px-3 py-1.5 sm:py-1 text-xs outline-none focus:border-[var(--accent)] uppercase font-bold text-white w-full sm:max-w-[260px] route-planner-input" /></div><div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto shrink-0"><button onClick={() => Ae(n => !n)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-xs font-bold text-white transition-all route-planner-chip flex-1 sm:flex-none justify-center">📋 Rotas Salvas ({qe.length})</button><select value={y} onChange={n => {
              S(n.target.value);
              f([]);
              i([]);
              C([{
                id: "tracado-1",
                nome: "Rota 1",
                tipo: "rotacao",
                waypoints: [],
                visible: true,
                cor: lt[0]
              }]);
              te("tracado-1");
              G([]);
            }} className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer font-bold text-white route-planner-select flex-1 sm:flex-none">{Ss.map(n => <option value={n} key={n}>{n}</option>)}</select></div></div><div className="flex items-center gap-2 py-3 overflow-x-auto custom-scrollbar hide-scrollbar shrink-0">{Fa.map(n => {
            const t = u === n.id;
            const B = {
              borderColor: n.color,
              backgroundColor: `${n.color}1A`,
              color: "#FFFFFF"
            };
            const E = {
              borderColor: "var(--border-default)",
              backgroundColor: "transparent",
              color: "var(--text-secondary)"
            };
            return <button type="button" onClick={() => w(n.id)} style={t ? B : E} className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 shrink-0 hover:text-white route-planner-chip ${t ? "scale-102 font-extrabold" : ""}`} key={n.id}>{n.id === "dropzone" ? <span className="text-sm leading-none">🪂</span> : n.id === "mandrako" ? <img src="/MASCOSTE/MANDRAKO.png" width={16} height={16} style={{
                objectFit: "contain"
              }} className="shrink-0" alt="Mandrako Icon" /> : n.id === "barracao" ? <_Component47 size={12} className="shrink-0" /> : n.id === "safe" ? <_Component50 size={12} className="shrink-0" /> : <span style={{
                backgroundColor: n.color
              }} className="w-2 h-2 rounded-full inline-block shrink-0" />}<span>{n.label}</span></button>;
          })}<button type="button" onClick={() => Y(true)} style={u === "time" ? {
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            color: "#FFFFFF"
          } : {
            borderColor: "var(--border-default)",
            backgroundColor: "transparent",
            color: "var(--text-secondary)"
          }} className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 shrink-0 hover:text-white route-planner-chip ${u === "time" ? "scale-102 font-extrabold" : ""}`}><span className="text-sm leading-none">🛡️</span><span>{v ? `Time: ${v.nome}` : "+ ADICIONAR TIME"}</span></button></div>{Z && <div className="flex items-center gap-2 py-2 px-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl my-1 overflow-x-auto custom-scrollbar shrink-0"><span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider shrink-0">Traçados ({A.length}):</span><div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar flex-1">{A.map(n => {
              const t = n.id === z;
              return <div onClick={() => te(n.id)} style={t ? {
                borderColor: n.cor,
                backgroundColor: `${n.cor}25`
              } : {}} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all border shrink-0 ${t ? "text-white shadow-sm ring-1 ring-white/30 font-black" : "bg-[var(--bg-main)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white"}`} key={n.id}><span style={{
                  backgroundColor: n.cor || "#FF3038"
                }} className="w-2.5 h-2.5 rounded-full inline-block shrink-0 border border-white/50 shadow-sm" /><span>{n.nome} ({n.waypoints.length} pts)</span><button type="button" onClick={B => Xe(n.id, B)} className="p-0.5 hover:text-white opacity-80 hover:opacity-100 transition-opacity ml-1" title={n.visible ? "Ocultar este traçado" : "Exibir este traçado"}>{n.visible ? <Va size={11} className="text-emerald-400" /> : <Qa size={11} className="text-red-400" />}</button>{A.length > 1 && <button type="button" onClick={B => Pe(n.id, B)} className="p-0.5 hover:text-red-400 opacity-60 hover:opacity-100 transition-opacity" title="Excluir este traçado"><Ye size={11} /></button>}</div>;
            })}</div><button type="button" onClick={Fe} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF3038] hover:bg-[#E41F29] text-white text-[10px] font-bold uppercase transition-all shrink-0 ml-auto shadow-sm"><Kt size={13} /><span>+ Nova Rota</span></button></div>}<div className="flex-1 w-full max-w-full relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] flex items-center justify-center min-h-[300px]">{Yt ? <div style={{
            position: "relative",
            display: "inline-block"
          }} className="max-w-full max-h-full"><img ref={vt} src={Yt} alt={`Mapa ${y}`} onLoad={it} className="max-w-full max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-250px)] object-contain opacity-85" draggable={false} /><canvas ref={jt} onClick={wt} onPointerDown={Na} onPointerMove={wa} onPointerUp={se} onPointerLeave={se} style={{
              position: "absolute",
              cursor: ot !== null ? "crosshair" : u === "safe" ? "cell" : "crosshair",
              zIndex: 10,
              touchAction: "none"
            }} /></div> : <p className="text-[var(--text-secondary)]">Mapa não configurado.</p>}{pe && <div className="absolute top-0 right-0 z-30 h-full w-[300px] bg-[var(--bg-surface)]/95 backdrop-blur-md border-l border-[var(--border-default)] shadow-2xl flex flex-col p-4 animate-reveal"><div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4"><h3 className="text-body font-bold text-white uppercase tracking-wider">Rotas Salvas</h3><button onClick={() => Ae(false)} className="p-1 rounded-md hover:bg-white/5 text-[var(--text-tertiary)] hover:text-white transition-colors"><Ye size={16} /></button></div><div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">{Me ? <div className="py-8 flex justify-center"><Tt className="animate-spin text-[var(--accent)]" size={20} /></div> : qe.length === 0 ? <p className="text-[11px] text-[var(--text-tertiary)] text-center py-6">Nenhuma rota salva ainda.</p> : qe.map(n => {
                const t = Fa.find(B => B.id === n.tipo);
                return <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl flex flex-col gap-2.5 hover:border-[var(--accent)]/50 transition-all" key={n.id}><div className="flex flex-col gap-1 min-w-0"><span className="text-caption-sm font-black text-white uppercase truncate">{n.nome}</span><div className="flex items-center gap-1.5 text-[9px] text-[var(--text-tertiary)] font-bold"><span className="uppercase bg-[var(--bg-main)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">{n.mapa}</span><span style={{
                        color: t ? t.color : "#FFFFFF",
                        borderColor: t ? `${t.color}40` : "var(--border-subtle)",
                        backgroundColor: t ? `${t.color}15` : "transparent"
                      }} className="uppercase px-1.5 py-0.5 rounded border font-extrabold">{t ? t.label : n.tipo}</span></div></div><div className="flex items-center gap-1.5 w-full mt-1 border-t border-[var(--border-subtle)] pt-2"><button onClick={() => {
                      qt(n);
                      Ae(false);
                    }} className="flex-1 py-1 bg-[var(--bg-main)] hover:bg-[var(--accent)] hover:text-white rounded border border-[var(--border-default)] text-[9px] font-extrabold uppercase transition-all text-center text-white route-planner-chip">Carregar</button><button onClick={() => Xt(n.id, n.nome)} className="p-1 bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white rounded border border-red-500/20 transition-all route-planner-chip" title="Excluir Rota"><_Component15 size={11} /></button></div></div>;
              })}</div></div>}</div><div className="py-2 text-center shrink-0"><p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">{u === "safe" ? "Dica: clique e arraste para desenhar zonas seguras (S1, S2, S3)." : Z ? "Dica: Clique no mapa para desenhar a rota ativa. Use \"+ Nova Rota\" para iniciar um novo traçado independente." : "Dica: Clique no mapa para adicionar pontos sequenciais."}</p></div><div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-[var(--border-subtle)] shrink-0 bg-[var(--bg-main)]"><div className="text-xs font-bold text-[var(--text-secondary)] flex gap-4"><span>Pontos: <strong className="text-[#FF3038] font-mono text-sm">{Z ? ee ? ee.waypoints.length : 0 : D.length + N.length}</strong></span>{Z && <span className="text-[11px] text-[var(--text-tertiary)]">Traçado ativo: <strong className="text-white font-semibold">{ee ? ee.nome : "Rota 1"}</strong></span>}</div><div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end items-center"><button type="button" onClick={oe} disabled={D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0) || nt} className="btn-ghost text-red-400 hover:text-red-300 hover:bg-red-950/20 flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-lg text-xs route-planner-chip" title="Limpar todas as marcações"><_Component15 size={13} /> Limpar</button><button type="button" onClick={Ee} disabled={D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0) || nt} className="btn-ghost flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-lg text-xs route-planner-chip" title="Desfazer a última marcação"><Ha size={13} /> Desfazer</button><button type="button" onClick={Sa} disabled={D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0)} className="btn-ghost flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-lg text-xs route-planner-chip" title="Exportar como imagem PNG"><Wa size={13} /> Exportar PNG</button><Xa variant="inline" className="btn-ghost flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-lg text-xs route-planner-chip border border-[#FF3038]/40 text-[#FF3038] hover:bg-[#FF3038]/15 font-bold" /><button type="button" onClick={Ze} disabled={nt || D.length === 0 && N.length === 0 && A.every(n => n.waypoints.length === 0) || !P.trim()} className="bg-[#FF3038] hover:bg-[#E41F29] text-white px-5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md route-planner-chip">{nt ? <Tt size={13} className="animate-spin" /> : <Ra size={13} />} Salvar Rota</button></div></div>{la()}</div></Ct>;
  }
};
function Oo() {
  const {
    user: r,
    isSubscriber: c
  } = We();
  const [l, j] = s.useState(true);
  const [o, g] = s.useState(false);
  const [y, S] = s.useState(new Date());
  const [u, w] = s.useState([]);
  const [P, k] = s.useState([]);
  const [D, f] = s.useState(false);
  const [N, i] = s.useState("");
  const [m, x] = s.useState(null);
  const [h, R] = s.useState("");
  const [v, p] = s.useState("14:00");
  const [T, Y] = s.useState("");
  const [X, _] = s.useState(false);
  const [q, V] = s.useState(null);
  s.useEffect(() => {
    if (!r) {
      return;
    }
    (async () => {
      j(true);
      try {
        const {
          data: C,
          error: z
        } = await K.from("perfis").select("campeonatos_ativo").eq("id", r.id).single();
        if (z && z.code !== "PGRST116") {
          console.error("Erro ao verificar acesso aos campeonatos:", z);
        }
        const te = !!C?.campeonatos_ativo;
        g(te);
        if (te) {
          await H(y, r.id);
        }
      } catch (C) {
        console.error("Erro ao carregar dados:", C);
      } finally {
        j(false);
      }
    })();
  }, [r]);
  s.useEffect(() => {
    if (r && o) {
      H(y, r.id);
    }
  }, [y, o, r]);
  const H = async (A, C) => {
    try {
      const z = A.getFullYear();
      const te = A.getMonth();
      const pe = new Date(z, te, 1, 0, 0, 0, 0);
      const Ae = new Date(z, te + 1, 0, 23, 59, 59, 999);
      const {
        data: Oe,
        error: G
      } = await K.from("campeonatos_agendados").select("*").eq("user_id", C).gte("data_hora", pe.toISOString()).lte("data_hora", Ae.toISOString()).order("data_hora", {
        ascending: true
      });
      if (G) {
        throw G;
      }
      w(Oe || []);
      const ce = new Date();
      ce.setHours(0, 0, 0, 0);
      const {
        data: Be,
        error: ft
      } = await K.from("campeonatos_agendados").select("*").eq("user_id", C).gte("data_hora", ce.toISOString()).order("data_hora", {
        ascending: true
      });
      if (ft) {
        throw ft;
      }
      k(Be || []);
    } catch (z) {
      console.error("Erro ao buscar campeonatos agendados:", z);
    }
  };
  const je = s.useMemo(() => {
    const A = y.getFullYear();
    const C = y.getMonth();
    const z = new Date(A, C, 1).getDay();
    const te = new Date(A, C + 1, 0).getDate();
    const pe = new Date(A, C, 0).getDate();
    const Ae = [];
    for (let G = z - 1; G >= 0; G--) {
      const ce = pe - G;
      const Be = new Date(A, C - 1, ce);
      const ft = `${Be.getFullYear()}-${String(Be.getMonth() + 1).padStart(2, "0")}-${String(ce).padStart(2, "0")}`;
      Ae.push({
        dayNumber: ce,
        dateStr: ft,
        isCurrentMonth: false,
        fullDate: Be
      });
    }
    for (let G = 1; G <= te; G++) {
      const ce = `${A}-${String(C + 1).padStart(2, "0")}-${String(G).padStart(2, "0")}`;
      const Be = new Date(A, C, G);
      Ae.push({
        dayNumber: G,
        dateStr: ce,
        isCurrentMonth: true,
        fullDate: Be
      });
    }
    const Oe = 7 - Ae.length % 7;
    if (Oe < 7) {
      for (let G = 1; G <= Oe; G++) {
        const ce = new Date(A, C + 1, G);
        const Be = `${ce.getFullYear()}-${String(ce.getMonth() + 1).padStart(2, "0")}-${String(G).padStart(2, "0")}`;
        Ae.push({
          dayNumber: G,
          dateStr: Be,
          isCurrentMonth: false,
          fullDate: ce
        });
      }
    }
    return Ae;
  }, [y]);
  const Ne = s.useMemo(() => {
    const A = {};
    u.forEach(C => {
      if (!C.data_hora) {
        return;
      }
      const z = new Date(C.data_hora);
      const te = `${z.getFullYear()}-${String(z.getMonth() + 1).padStart(2, "0")}-${String(z.getDate()).padStart(2, "0")}`;
      A[te] ||= [];
      A[te].push(C);
    });
    return A;
  }, [u]);
  const De = (A, C) => {
    i(A);
    if (C) {
      x(C);
      R(C.nome_campeonato);
      const z = new Date(C.data_hora);
      const te = String(z.getHours()).padStart(2, "0");
      const pe = String(z.getMinutes()).padStart(2, "0");
      p(`${te}:${pe}`);
      Y(C.observacoes || "");
    } else {
      x(null);
      R("");
      p("14:00");
      Y("");
    }
    f(true);
  };
  const be = async A => {
    A.preventDefault();
    if (!!r && !!h.trim() && !!N) {
      _(true);
      try {
        const [C, z, te] = N.split("-");
        const [pe, Ae] = v.split(":");
        const Oe = new Date(parseInt(C), parseInt(z) - 1, parseInt(te), parseInt(pe || "14"), parseInt(Ae || "00"));
        const G = {
          user_id: r.id,
          nome_campeonato: h.trim(),
          data_hora: Oe.toISOString(),
          observacoes: T.trim() || null
        };
        if (m) {
          const {
            error: ce
          } = await K.from("campeonatos_agendados").update({
            nome_campeonato: G.nome_campeonato,
            data_hora: G.data_hora,
            observacoes: G.observacoes
          }).eq("id", m.id).eq("user_id", r.id);
          if (ce) {
            throw ce;
          }
        } else {
          const {
            error: ce
          } = await K.from("campeonatos_agendados").insert(G);
          if (ce) {
            throw ce;
          }
        }
        f(false);
        await H(y, r.id);
      } catch (C) {
        console.error("Erro ao salvar campeonato:", C);
        alert("Não foi possível salvar o campeonato. Tente novamente.");
      } finally {
        _(false);
      }
    }
  };
  const ue = async A => {
    if (!!r && !!confirm("Deseja realmente remover este campeonato agendado?")) {
      V(A);
      try {
        const {
          error: C
        } = await K.from("campeonatos_agendados").delete().eq("id", A).eq("user_id", r.id);
        if (C) {
          throw C;
        }
        f(false);
        await H(y, r.id);
      } catch (C) {
        console.error("Erro ao excluir campeonato:", C);
        alert("Erro ao excluir o campeonato.");
      } finally {
        V(null);
      }
    }
  };
  const ae = A => {
    const C = new Date(A);
    return {
      dateFormatted: C.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }),
      timeFormatted: C.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      weekday: C.toLocaleDateString("pt-BR", {
        weekday: "short"
      })
    };
  };
  const M = s.useMemo(() => {
    const A = new Date();
    return `${A.getFullYear()}-${String(A.getMonth() + 1).padStart(2, "0")}-${String(A.getDate()).padStart(2, "0")}`;
  }, []);
  if (l) {
    return <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center"><div className="flex flex-col items-center gap-4"><_Component6 className="animate-spin text-[var(--accent)]" size={40} /><p className="text-label uppercase tracking-widest font-bold text-[var(--text-secondary)]">Carregando Campeonatos...</p></div></div>;
  } else {
    return <Ct activeTab="campeonatos" isSubscriber={c}><div className="ctracker-championship-page flex-1 custom-scrollbar min-h-screen flex flex-col bg-[var(--bg-main)]"><header className="ctracker-simple-header flex flex-col gap-4 sticky top-0 z-20 bg-[var(--bg-surface)] backdrop-blur-md border-b border-[var(--border-subtle)] px-6 py-5"><div className="w-full flex items-center justify-between"><div className="flex items-center gap-4"><div className="hidden md:flex items-center text-caption uppercase tracking-widest text-[var(--text-tertiary)] font-bold"><span>CONTROLE</span><span className="mx-2 opacity-50">›</span><span className="text-[var(--accent)] font-extrabold">CAMPEONATOS</span></div></div><div className="flex items-center gap-4"><div className="hidden sm:flex flex-col text-right items-end gap-1"><span className="text-body-sm text-[var(--text-tertiary)]">{r?.email || "Coach"}</span></div></div></div></header><main className="ctracker-workspace-main w-full flex-1 px-4 sm:px-6 py-8">{o ? <div className="w-full max-w-7xl mx-auto space-y-10"><div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[var(--bg-card)] border border-[var(--border-default)] p-6 rounded-2xl"><div><div className="flex items-center gap-3"><_Component16 className="text-[var(--accent)]" size={28} /><h1 className="text-2xl font-black text-[var(--text-primary)] capitalize">{y.toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric"
                    })}</h1></div><p className="text-body-sm text-[var(--text-secondary)] mt-1">Clique em qualquer dia para agendar ou visualizar campeonatos futuros do seu squad.</p></div><div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end"><button onClick={() => S(new Date(y.getFullYear(), y.getMonth() - 1, 1))} className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all" title="Mês anterior"><_Component4 size={20} /></button><button onClick={() => S(new Date())} className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent)] transition-all">Mês Atual</button><button onClick={() => S(new Date(y.getFullYear(), y.getMonth() + 1, 1))} className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all" title="Próximo mês"><_Component3 size={20} /></button></div></div><div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden shadow-xl"><div className="grid grid-cols-7 border-b border-[var(--border-default)] bg-[var(--bg-surface)]">{["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((A, C) => <div className={`py-3 text-center text-xs font-bold uppercase tracking-wider ${C === 0 || C === 6 ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"}`} key={A}>{A}</div>)}</div><div className="grid grid-cols-7 auto-rows-fr divider-grid">{je.map((A, C) => {
                  const z = Ne[A.dateStr] || [];
                  const te = A.dateStr === M;
                  return <div onClick={() => De(A.dateStr)} className={`min-h-[110px] sm:min-h-[130px] p-2 sm:p-3 border-b border-r border-[var(--border-subtle)] transition-all cursor-pointer flex flex-col justify-between group ${A.isCurrentMonth ? "bg-[var(--bg-card)] hover:bg-[var(--bg-surface)]" : "bg-[var(--bg-main)]/40 opacity-40"} ${te ? "ring-2 ring-[var(--accent)] ring-inset" : ""}`} key={`${A.dateStr}-${C}`}><div className="flex items-center justify-between"><span className={`text-xs sm:text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center ${te ? "bg-[var(--accent)] text-white" : "text-[var(--text-primary)]"}`}>{A.dayNumber}</span><span className="opacity-0 group-hover:opacity-100 text-[var(--accent)] transition-opacity p-1"><Kt size={14} /></span></div><div className="mt-2 flex-1 flex flex-col gap-1.5 overflow-y-auto max-h-[80px] custom-scrollbar">{z.map(pe => {
                        const {
                          timeFormatted: Ae
                        } = ae(pe.data_hora);
                        return <div onClick={Oe => {
                          Oe.stopPropagation();
                          De(A.dateStr, pe);
                        }} className="px-2 py-1 rounded bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/25 transition-all text-left group/item" key={pe.id}><div className="flex items-center justify-between text-[11px] font-extrabold truncate gap-1"><span className="truncate">{pe.nome_campeonato}</span><span className="text-[10px] opacity-80 shrink-0">{Ae}</span></div></div>;
                      })}</div></div>;
                })}</div></div><div className="bg-[var(--bg-card)] border border-[var(--border-default)] p-6 rounded-2xl space-y-6"><div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4"><div className="flex items-center gap-3"><Je className="text-[var(--accent)]" size={24} /><h2 className="text-xl font-bold text-[var(--text-primary)]">Próximos Campeonatos Agendados</h2></div><span className="text-xs font-bold text-[var(--text-tertiary)] bg-[var(--bg-surface)] px-3 py-1.5 rounded-full border border-[var(--border-subtle)]">{P.length} {P.length === 1 ? "evento" : "eventos"}</span></div>{P.length === 0 ? <div className="text-center py-10 text-[var(--text-secondary)] space-y-2"><_Component16 size={36} className="mx-auto text-[var(--text-tertiary)] opacity-50" /><p className="text-sm font-medium">Nenhum campeonato futuro agendado no momento.</p><p className="text-xs text-[var(--text-tertiary)]">Clique em qualquer dia do calendário para agendar um novo campeonato.</p></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{P.map(A => {
                  const {
                    dateFormatted: C,
                    timeFormatted: z,
                    weekday: te
                  } = ae(A.data_hora);
                  const pe = A.data_hora.split("T")[0];
                  return <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between gap-4 group" key={A.id}><div className="space-y-2"><div className="flex items-center justify-between"><span className="text-[10px] uppercase font-bold tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-md border border-[var(--accent)]/20">{te} • {C}</span><div className="flex items-center gap-1 text-[11px] font-bold text-[var(--text-secondary)]"><_Component43 size={12} className="text-[var(--accent)]" />{z}</div></div><h3 className="text-base font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{A.nome_campeonato}</h3>{A.observacoes && <p className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] p-2.5 rounded-lg border border-[var(--border-subtle)] line-clamp-3 leading-relaxed whitespace-pre-wrap">{A.observacoes}</p>}</div><div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]"><button onClick={() => De(pe, A)} className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--accent-muted)] transition-all" title="Editar campeonato"><_Component51 size={16} /></button><button onClick={() => ue(A.id)} className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all" title="Excluir campeonato"><_Component15 size={16} /></button></div></div>;
                })}</div>}</div></div> : <div className="w-full max-w-4xl mx-auto py-10 flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn"><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-extrabold uppercase tracking-widest"><_Component52 size={16} /> Addon Vitalício para Coaches</div><h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">Calendário de Campeonatos</h1><p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">Nunca mais perca a data de um campeonato. Marque todos os campeonatos futuros do seu squad direto no painel, datas, horários e observações organizados num calendário simples, só seu.</p><div className="w-full p-6 sm:p-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] shadow-2xl flex flex-col items-center gap-8"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left"><div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"><_Component53 className="text-[var(--accent)] shrink-0 mt-0.5" size={20} /><div><h4 className="text-sm font-bold text-[var(--text-primary)]">Datas & Horários</h4><p className="text-xs text-[var(--text-secondary)] mt-1">Organize todos os torneios futuros do seu time num único lugar.</p></div></div><div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"><_Component53 className="text-[var(--accent)] shrink-0 mt-0.5" size={20} /><div><h4 className="text-sm font-bold text-[var(--text-primary)]">Observações Estratégicas</h4><p className="text-xs text-[var(--text-secondary)] mt-1">Anote links de transmissão, IDs da sala, regras ou avisos para o squad.</p></div></div><div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"><_Component53 className="text-[var(--accent)] shrink-0 mt-0.5" size={20} /><div><h4 className="text-sm font-bold text-[var(--text-primary)]">Visão Mensal Intuitiva</h4><p className="text-xs text-[var(--text-secondary)] mt-1">Navegação rápida por meses com indicadores visuais nos dias de campeonato.</p></div></div><div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"><_Component53 className="text-[var(--accent)] shrink-0 mt-0.5" size={20} /><div><h4 className="text-sm font-bold text-[var(--text-primary)]">Lista de Próximos Eventos</h4><p className="text-xs text-[var(--text-secondary)] mt-1">Timeline em ordem cronológica dos próximos desafios do seu squad.</p></div></div></div><div className="w-full pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6"><div className="text-center sm:text-left"><span className="block text-xs uppercase tracking-widest text-[var(--text-tertiary)] font-bold mb-1">Preço Especial de Lançamento</span><div className="flex items-baseline justify-center sm:justify-start gap-2"><span className="text-3xl sm:text-4xl font-black text-[var(--accent)]">R$ 4,99</span><span className="text-xs font-semibold text-[var(--text-secondary)]">pagamento único, acesso vitalício</span></div></div><a href="https://pay.lowify.com.br/checkout?product_id=Gziu9m" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-[var(--accent)]/25 transition-all hover:scale-[1.03] active:scale-[0.98]"><Je size={20} />Comprar Acesso Vitalício</a></div></div></div>}</main>{D && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"><div className="bg-[var(--bg-card)] border border-[var(--border-default)] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"><div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]"><div className="flex items-center gap-3"><Je size={20} className="text-[var(--accent)]" /><h3 className="text-lg font-bold text-[var(--text-primary)]">{m ? "Editar Campeonato" : "Agendar Campeonato"}</h3></div><button onClick={() => f(false)} className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-white hover:bg-white/5 transition-all"><Ye size={20} /></button></div><form onSubmit={be} className="p-6 space-y-5"><div><label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Nome do Campeonato *</label><input type="text" required={true} placeholder="Ex: Liga Principal Free Fire / LBFF Qualify" value={h} onChange={A => R(A.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-disabled)] outline-none focus:border-[var(--accent)] transition-all font-medium text-sm" /></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Data Selecionada</label><input type="text" disabled={true} value={N ? N.split("-").reverse().join("/") : ""} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] font-bold text-sm" /></div><div><label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Horário (Hora da Partida) *</label><input type="time" required={true} value={v} onChange={A => p(A.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-all font-bold text-sm" /></div></div><div><label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Observações (Opcional)</label><textarea rows={3} placeholder="Link da sala, ID/Senha, grupo de capitães, regras ou mapa da partida..." value={T} onChange={A => Y(A.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-disabled)] outline-none focus:border-[var(--accent)] transition-all font-normal text-sm resize-none" /></div><div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] gap-3">{m ? <button type="button" disabled={X || !!q} onClick={() => ue(m.id)} className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"><_Component15 size={16} />Excluir</button> : <div />}<div className="flex items-center gap-3"><button type="button" onClick={() => f(false)} className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-white font-bold text-xs transition-all">Cancelar</button><button type="submit" disabled={X || !h.trim()} className="px-6 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[var(--accent)]/20 transition-all disabled:opacity-50">{X ? <_Component6 size={16} className="animate-spin" /> : <Kt size={16} />}{m ? "Atualizar" : "Salvar Campeonato"}</button></div></div></form></div></div>}</div></Ct>;
  }
}
const Po = () => {
  const {
    session: r,
    loading: c
  } = We();
  const l = Et();
  const [j, o] = s.useState(0);
  const [g, y] = s.useState(47);
  const [S, u] = s.useState(1243);
  const [w, P] = s.useState(3891);
  s.useEffect(() => {
    const D = setInterval(() => {
      y(i => i < 99 ? i + 1 : i);
    }, 8000);
    const f = setInterval(() => {
      u(i => i + 1);
    }, 5000);
    const N = setInterval(() => {
      P(i => i + 1);
    }, 3000);
    return () => {
      clearInterval(D);
      clearInterval(f);
      clearInterval(N);
    };
  }, []);
  s.useEffect(() => {
    const D = setInterval(() => {
      o(f => (f + 1) % 3);
    }, 3500);
    return () => clearInterval(D);
  }, []);
  s.useEffect(() => {
    if (!c && r) {
      l("/", {
        replace: true
      });
    }
  }, [r, c, l]);
  const k = D => {
    o(D);
  };
  if (c) {
    return <div className="flex h-screen items-center justify-center bg-[#0F0F0F]"><div className="animate-spin h-8 w-8 border-4 border-[#FF3038]/30 border-t-[#FF3038] rounded-full" /></div>;
  } else {
    return <div className="landing-page"><div className="urgency-bar">{g} squads ativos <span className="urgency-sep">•</span> {S.toLocaleString("pt-BR")} partidas analisadas <span className="urgency-sep">•</span> {w.toLocaleString("pt-BR")} prints lidos hoje</div><nav><a href="#" className="logo"><img src="/redesign/logo.svg" alt="" className="logo-img" /><span><b>C</b>TRACKER</span></a><ul className="nav-links"><li><a href="#features">Recursos</a></li><li><a href="#planos">Planos</a></li><li><a href="#depoimento">Sobre</a></li></ul><div className="nav-ctas"><button onClick={() => l("/login")} className="btn-nav-l"><At size={17} /> ENTRAR</button></div></nav><section className="hero" id="inicio"><div className="hero-portrait" role="img" aria-label="Celo diante de cenário competitivo vermelho e preto" /><div className="hero-inner"><div className="hero-copy"><div className="hero-badge">DADOS QUE TRANSFORMAM RESULTADOS</div><h1>LEIA O JOGO.<br /><span>DECIDA COM DADOS.</span></h1><p className="hero-desc">A plataforma de análise de dados de alta performance do cenário competitivo de Free Fire.</p><div className="hero-ctas"><button onClick={() => l("/login")} className="btn-hero-primary"><At size={20} /> ACESSAR CTRACKER</button><button onClick={D => {
                D.preventDefault();
                document.getElementById("plataforma")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center"
                });
              }} className="btn-hero-outline"><_Component54 size={18} fill="currentColor" /> VER PLATAFORMA</button></div><ul className="hero-indicators" aria-label="Diferenciais da plataforma"><li><_Component55 size={22} /><span>ANÁLISE<br />PROFISSIONAL</span></li><li><_Component38 size={22} /><span>INSIGHTS<br />EM TEMPO REAL</span></li><li><Mt size={22} /><span>FEITO PARA<br />O COMPETITIVO</span></li></ul></div><div className="hero-visual" id="plataforma"><div className="carousel-wrap"><div className="carousel-track" style={{
                transform: `translateX(-${j * 100}%)`
              }}><img src="/redesign/dashboard-demo.png" alt="Prévia ilustrativa DEMO do painel CTracker" className="carousel-img" /><img src="/dashboard2.jpg" alt="Prévia do painel de jogadores CTracker" className="carousel-img" /><img src="/dashboard3.jpg" alt="Prévia de análises CTracker" className="carousel-img" /></div><div className="carousel-dots" aria-label="Prévias da plataforma">{[0, 1, 2].map(D => <button type="button" aria-label={`Ver prévia ${D + 1}`} aria-current={j === D ? "true" : undefined} className={`dot ${j === D ? "active" : ""}`} onClick={() => k(D)} key={D} />)}</div></div><p className="demo-caption">Prévia ilustrativa da plataforma</p></div></div></section><section className="redesign-features" id="features" aria-label="Recursos da plataforma"><a href="#planos"><_Component55 size={27} /><span><strong>Performance</strong><small>Acompanhe estatísticas detalhadas de jogadores e equipes.</small></span><At size={19} /></a><a href="#planos"><Mt size={27} /><span><strong>Comparação</strong><small>Compare desempenhos e encontre vantagens competitivas.</small></span><At size={19} /></a><a href="#planos"><_Component17 size={27} /><span><strong>Scouting</strong><small>Descubra talentos e analise potenciais para o seu time.</small></span><At size={19} /></a><a href="#planos"><_Component56 size={27} /><span><strong>Histórico</strong><small>Reveja partidas, evoluções e tendências do cenário.</small></span><At size={19} /></a></section><section className="redesign-campaign"><div><p>ESTRATÉGIA COMEÇA COM INFORMAÇÃO</p><h2>EVOLUA SUA ANÁLISE.<br /><span>LEVE SEU JOGO MAIS LONGE.</span></h2></div><div><p>Tenha acesso a dados, comparações e insights que fazem a diferença no competitivo.</p><button onClick={() => l("/login")} className="btn-hero-primary"><At size={18} /> ACESSAR CTRACKER</button></div></section><section className="redesign-banners" aria-label="Diferenciais CTracker"><img src="/redesign/banner-data.png" alt="Dados reais para decisões reais" /><img src="/redesign/banner-ranked.png" alt="Do ranked ao competitivo" /><img src="/redesign/banner-scouting.png" alt="Encontre talentos antes de todo mundo" /><img src="/redesign/banner-history.png" alt="Cada dado conta uma história" /></section><section className="content-section" style={{
        background: "#0F0F0F"
      }}><div style={{
          maxWidth: "860px",
          margin: "0 auto",
          textAlign: "center"
        }}><p style={{
            color: "#FF3038",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px"
          }}>VOCÊ SE RECONHECE AQUI?</p><h2 style={{
            color: "#EDEDED",
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "8px"
          }}>Todo coach competitivo já perdeu tempo</h2><h2 style={{
            color: "#FF3038",
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "48px"
          }}>que deveria ter gasto treinando.</h2><div className="info-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "32px"
          }}><div className="info-card" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "left"
            }}><p style={{
                color: "#FF3038",
                fontWeight: 600,
                marginBottom: "8px"
              }}>• Copiando dado na mão</p><p style={{
                color: "#A1A1A1",
                fontSize: "14px",
                lineHeight: "1.6"
              }}>Abrindo screenshot, olhando número por número, digitando na planilha. Isso não é análise — é trabalho braçal.</p></div><div className="info-card" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "left"
            }}><p style={{
                color: "#FF3038",
                fontWeight: 600,
                marginBottom: "8px"
              }}>• Decisão de lineup no achismo</p><p style={{
                color: "#A1A1A1",
                fontSize: "14px",
                lineHeight: "1.6"
              }}>Você escalou o jogador porque "parecia bem" na última rodada. Sem dado histórico, toda escolha é um chute.</p></div><div className="info-card" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "left"
            }}><p style={{
                color: "#FF3038",
                fontWeight: 600,
                marginBottom: "8px"
              }}>• Relatório que fica obsoleto</p><p style={{
                color: "#A1A1A1",
                fontSize: "14px",
                lineHeight: "1.6"
              }}>Passou horas montando o report da rodada. Amanhã tem mais uma e você começa do zero de novo.</p></div><div className="info-card" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "left"
            }}><p style={{
                color: "#FF3038",
                fontWeight: 600,
                marginBottom: "8px"
              }}>• Sem histórico de evolução</p><p style={{
                color: "#A1A1A1",
                fontSize: "14px",
                lineHeight: "1.6"
              }}>Não sabe dizer se o jogador melhorou nos últimos 3 torneios. Só lembra da impressão geral, não dos números.</p></div></div><div style={{
            borderLeft: "3px solid #FF3038",
            padding: "20px 24px",
            background: "#171717",
            borderRadius: "0 12px 12px 0",
            textAlign: "left",
            marginBottom: "32px"
          }}><p style={{
              color: "#EDEDED",
              fontSize: "15px",
              fontStyle: "italic",
              lineHeight: "1.7"
            }}>"O Celo Tracker foi criado por coaches que viveram essas mesmas frustrações. A ideia é simples: você sobe o print, a IA lê tudo, e em segundos você tem o relatório pronto pra passar pro squad."</p></div><button onClick={() => l("/login")} style={{
            background: "transparent",
            border: "1px solid #EDEDED",
            color: "#EDEDED",
            padding: "14px 32px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer"
          }}>Quero analisar sem planilha</button></div></section><section className="content-section" style={{
        background: "#0F0F0F"
      }}><div style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center"
        }}><p style={{
            color: "#FF3038",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px"
          }}>POR QUE MUDAR?</p><h2 style={{
            color: "#EDEDED",
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "8px"
          }}>O jeito antigo <span style={{
              color: "#FF3038"
            }}>custa mais</span></h2><h2 style={{
            color: "#EDEDED",
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "16px"
          }}>do que parece</h2><p style={{
            color: "#A1A1A1",
            fontSize: "15px",
            maxWidth: "600px",
            margin: "0 auto 48px",
            lineHeight: "1.7"
          }}>Cada rodada analisada no Excel é tempo que você não passou treinando, ajustando táticas ou estudando o adversário.</p><div className="compare-table" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid #2C2C2C",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "48px"
          }}><div style={{
              background: "#1A1A1A",
              padding: "16px",
              borderBottom: "1px solid #2C2C2C",
              borderRight: "1px solid #2C2C2C"
            }}><p style={{
                color: "#777",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "4px"
              }}>ANTES</p><p style={{
                color: "#EDEDED",
                fontWeight: 600
              }}>Planilha / manual</p></div><div style={{
              background: "#331015",
              padding: "16px",
              borderBottom: "1px solid #2C2C2C"
            }}><p style={{
                color: "#FF3038",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "4px"
              }}>COM CELO TRACKER</p><p style={{
                color: "#EDEDED",
                fontWeight: 600
              }}>Análise por IA</p></div><div style={{
              padding: "20px",
              borderBottom: "1px solid #1A1A1A",
              borderRight: "1px solid #2C2C2C",
              textAlign: "left"
            }}><p style={{
                color: "#FF5252",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✕ COLETA DE DADOS</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}>Abre o print, lê cada número, digita na planilha. Um jogador por vez, uma rodada por vez.</p><span style={{
                background: "#2A0B0B",
                color: "#FF5252",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>~45 min por rodada</span></div><div style={{
              padding: "20px",
              borderBottom: "1px solid #1A1A1A",
              textAlign: "left"
            }}><p style={{
                color: "#00E676",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✓ COLETA DE DADOS</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}>Sobe a screenshot. A IA lê <strong style={{
                  color: "#EDEDED"
                }}>kills, dano, mortes e posição</strong> automaticamente. Sem digitar nada.</p><span style={{
                background: "#052E1F",
                color: "#00E676",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>~30 segundos</span></div><div style={{
              padding: "20px",
              borderBottom: "1px solid #1A1A1A",
              borderRight: "1px solid #2C2C2C",
              textAlign: "left"
            }}><p style={{
                color: "#FF5252",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✕ HISTÓRICO DE EVOLUÇÃO</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}>Guarda em abas separadas por rodada. Impossível comparar fases diferentes sem montar tabela nova.</p><span style={{
                background: "#2A0B0B",
                color: "#FF5252",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>Dado espalhado e perdido</span></div><div style={{
              padding: "20px",
              borderBottom: "1px solid #1A1A1A",
              textAlign: "left"
            }}><p style={{
                color: "#00E676",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✓ HISTÓRICO DE EVOLUÇÃO</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}><strong style={{
                  color: "#EDEDED"
                }}>Dashboard com histórico completo</strong> por jogador, rodada e campeonato. Tudo junto, filtrável.</p><span style={{
                background: "#052E1F",
                color: "#00E676",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>Tudo em um lugar</span></div><div style={{
              padding: "20px",
              borderBottom: "1px solid #1A1A1A",
              borderRight: "1px solid #2C2C2C",
              textAlign: "left"
            }}><p style={{
                color: "#FF5252",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✕ DECISÃO DE LINEUP</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}>Baseada em impressão geral e memória da última rodada. Sem dado comparativo entre jogadores.</p><span style={{
                background: "#2A0B0B",
                color: "#FF5252",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>Achismo disfarçado de análise</span></div><div style={{
              padding: "20px",
              borderBottom: "1px solid #1A1A1A",
              textAlign: "left"
            }}><p style={{
                color: "#00E676",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✓ DECISÃO DE LINEUP</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}>Compara performance dos jogadores por fase, por campeonato, por métrica. Dado real, não feeling.</p><span style={{
                background: "#052E1F",
                color: "#00E676",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>Decisão com evidência</span></div><div style={{
              padding: "20px",
              borderRight: "1px solid #2C2C2C",
              textAlign: "left"
            }}><p style={{
                color: "#FF5252",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✕ CUSTO REAL</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}>Grátis em dinheiro. Mas 3–4 horas por semana em trabalho manual = tempo que não foi treinamento.</p><span style={{
                background: "#2A0B0B",
                color: "#FF5252",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>Caro em tempo</span></div><div style={{
              padding: "20px",
              textAlign: "left"
            }}><p style={{
                color: "#00E676",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "6px"
              }}>✓ CUSTO REAL</p><p style={{
                color: "#A1A1A1",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "8px"
              }}>A partir de <strong style={{
                  color: "#EDEDED"
                }}>R$0 grátis</strong> para começar. Plano completo por menos de R$1,50 por dia de campeonato.</p><span style={{
                background: "#052E1F",
                color: "#00E676",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>Barato em tempo e dinheiro</span></div></div><div style={{
            background: "#171717",
            border: "1px solid #2C2C2C",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px"
          }}><p style={{
              color: "#EDEDED",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "20px"
            }}>Tempo gasto por semana de campeonato</p><div style={{
              marginBottom: "12px"
            }}><div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px"
              }}><span style={{
                  color: "#A1A1A1",
                  fontSize: "13px"
                }}>Planilha manual (por rodada)</span><span style={{
                  color: "#FF5252",
                  fontSize: "13px"
                }}>~3–4 horas</span></div><div style={{
                background: "#FF5252",
                height: "8px",
                borderRadius: "4px",
                width: "90%"
              }} /></div><div><div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px"
              }}><span style={{
                  color: "#A1A1A1",
                  fontSize: "13px"
                }}>Com Celo Tracker</span><span style={{
                  color: "#00E676",
                  fontSize: "13px"
                }}>~5 minutos</span></div><div style={{
                background: "#00E676",
                height: "8px",
                borderRadius: "4px",
                width: "8%"
              }} /></div></div><div style={{
            background: "#331015",
            border: "1px solid #FF3038",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "32px"
          }}><p style={{
              color: "#FF3038",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px"
            }}>ANCORAGEM DE VALOR</p><p style={{
              color: "#EDEDED",
              fontSize: "16px",
              lineHeight: "1.8"
            }}>Se você gasta <strong>3 horas por semana</strong> em trabalho manual que vale R$20/hora, está perdendo <strong>R$240/mês em tempo</strong> — só para manter uma planilha.<br />O plano Elite Squad custa <strong>R$34,90/trimestre</strong>. A conta é simples.</p><button onClick={() => l("/login")} style={{
              marginTop: "24px",
              background: "#FF3038",
              color: "#EDEDED",
              border: "none",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer"
            }}>Quero evoluir por R$34,90/trimestre</button></div></div></section><div className="divider-l" /><section className="planos" id="planos"><div className="sec-wrap"><_s className="planos-landing-override" /><div style={{
            background: "rgba(255, 193, 7, 0.08)",
            border: "1px solid rgba(255, 193, 7, 0.35)",
            borderRadius: "12px",
            padding: "16px 20px",
            marginTop: "16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            maxWidth: "480px",
            margin: "16px auto 0"
          }}><span style={{
              fontSize: "20px",
              lineHeight: 1
            }}>⚡</span><div><p style={{
                margin: 0,
                color: "#EDEDED",
                fontSize: "14px",
                fontWeight: 600
              }}>Como funciona a ativação?</p><p style={{
                margin: "4px 0 0",
                color: "#aaa",
                fontSize: "13px",
                lineHeight: "1.5"
              }}>Após o pagamento, envie o comprovante + seu e-mail no WhatsApp. A ativação é feita manualmente em até 15 minutos.</p></div></div></div></section><section className="content-section" id="depoimento" style={{
        background: "#0F0F0F"
      }}><div style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}><div className="depoimentos-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "64px"
          }}><div className="depo-box" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px"
            }}><p style={{
                color: "#EDEDED",
                fontSize: "14px",
                lineHeight: "1.7",
                fontStyle: "italic",
                marginBottom: "20px"
              }}>"O Celo Tracker mudou como eu preparo minha equipe. Antes eu ficava copiando dado na mão. Agora subo a screenshot e em segundos já sei<strong> onde cada jogador precisa melhorar.</strong>"</p><div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}><div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#FF3038",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#EDEDED"
                  }}>CR</div><div><p style={{
                      color: "#EDEDED",
                      fontSize: "13px",
                      fontWeight: 600,
                      margin: 0
                    }}>Coach Rafinha</p><p style={{
                      color: "#FF3038",
                      fontSize: "11px",
                      margin: 0
                    }}>Head Coach — Liga DN</p></div></div><span style={{
                  color: "#FFC107"
                }}>★★★★★</span></div></div><div className="depo-box" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px"
            }}><p style={{
                color: "#EDEDED",
                fontSize: "14px",
                lineHeight: "1.7",
                fontStyle: "italic",
                marginBottom: "20px"
              }}>"Antes eu passava horas no Excel tentando montar relatório de campeonato. Agora <strong>em 5 minutos tenho tudo pronto</strong> pra passar pro meu squad antes da próxima rodada."</p><div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}><div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#00D1B2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#EDEDED"
                  }}>CT</div><div><p style={{
                      color: "#EDEDED",
                      fontSize: "13px",
                      fontWeight: 600,
                      margin: 0
                    }}>Coach Thiaguinho</p><p style={{
                      color: "#FF3038",
                      fontSize: "11px",
                      margin: 0
                    }}>Coach</p></div></div><span style={{
                  color: "#FFC107"
                }}>★★★★★</span></div></div><div className="depo-box" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px"
            }}><p style={{
                color: "#EDEDED",
                fontSize: "14px",
                lineHeight: "1.7",
                fontStyle: "italic",
                marginBottom: "20px"
              }}>"Eu jogava sem saber meus números reais. Depois que meu coach começou a usar o sistema, percebi que <strong>meu dano tava alto mas eu tava derrubando pouco</strong>. Isso mudou meu jogo."</p><div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}><div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#FF3EDB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#EDEDED"
                  }}>DK</div><div><p style={{
                      color: "#EDEDED",
                      fontSize: "13px",
                      fontWeight: 600,
                      margin: 0
                    }}>Dark</p><p style={{
                      color: "#FF3038",
                      fontSize: "11px",
                      margin: 0
                    }}>Jogador</p></div></div><span style={{
                  color: "#FFC107"
                }}>★★★★★</span></div></div><div className="depo-box" style={{
              background: "#171717",
              border: "1px solid #2C2C2C",
              borderRadius: "12px",
              padding: "24px"
            }}><p style={{
                color: "#EDEDED",
                fontSize: "14px",
                lineHeight: "1.7",
                fontStyle: "italic",
                marginBottom: "20px"
              }}>"Ferramenta séria para coach sério. Consigo ver a evolução de cada jogador rodada a rodada e <strong>tomar decisão de lineup com dado real</strong>, não com achismo."</p><div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}><div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}><div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#FF8C00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#EDEDED"
                  }}>CM</div><div><p style={{
                      color: "#EDEDED",
                      fontSize: "13px",
                      fontWeight: 600,
                      margin: 0
                    }}>Coach Matheuzin</p><p style={{
                      color: "#FF3038",
                      fontSize: "11px",
                      margin: 0
                    }}>Coach</p></div></div><span style={{
                  color: "#FFC107"
                }}>★★★★★</span></div></div></div><div style={{
            textAlign: "center",
            marginBottom: "48px"
          }}><p style={{
              color: "#FF3038",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "24px"
            }}>RESUMINDO TUDO QUE VOCÊ VAI TER</p><div className="resumo-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "48px",
              textAlign: "left"
            }}>{[["OCR automático", "— sobe o print, a IA extrai tudo em segundos"], ["Dashboard completo", "com histórico por jogador, rodada e campeonato"], ["Link público", "— qualquer jogador acessa sem criar conta"], ["Filtros por liga e data", "para comparar fases e campeonatos"], ["Histórico preservado", "mesmo quando o squad muda"], ["Decisão de lineup", "com dado real, não com achismo"]].map(([D, f], N) => <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                background: "#171717",
                border: "1px solid #2C2C2C",
                borderRadius: "8px",
                padding: "16px"
              }} key={N}><span style={{
                  color: "#00E676",
                  fontSize: "16px",
                  marginTop: "1px"
                }}>✓</span><p style={{
                  color: "#A1A1A1",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  margin: 0
                }}><strong style={{
                    color: "#EDEDED"
                  }}>{D}</strong>{f}</p></div>)}</div><h2 style={{
              color: "#EDEDED",
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "8px"
            }}>Tudo isso por <span style={{
                color: "#FF3038"
              }}>menos de R$1,50 por dia.</span></h2><p style={{
              color: "#A1A1A1",
              fontSize: "14px",
              marginBottom: "32px"
            }}>Começa grátis. Faz o upgrade quando quiser. <strong style={{
                color: "#EDEDED"
              }}>Sem contrato, sem formulário.</strong></p><a href="/login" style={{
              display: "block",
              maxWidth: "400px",
              margin: "0 auto 12px",
              background: "#FF3038",
              color: "#EDEDED",
              padding: "16px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center"
            }}>Quero começar grátis agora</a><p style={{
              color: "#777",
              fontSize: "12px",
              marginBottom: "16px"
            }}>Acesso imediato · Cancele quando quiser · <span style={{
                color: "#FF3038"
              }}>Sem cartão para o plano grátis</span></p><button onClick={() => l("/planos")} style={{
              display: "block",
              maxWidth: "400px",
              width: "100%",
              margin: "0 auto",
              border: "1px solid #2C2C2C",
              background: "transparent",
              color: "#EDEDED",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              cursor: "pointer"
            }}>Ver todos os planos →</button></div></div></section><footer><a href="#" className="logo"><img src="/redesign/logo.svg" alt="" className="logo-img" /><span><b>C</b>TRACKER</span></a><ul className="footer-links"><li><a href="#">Política de privacidade</a></li><li><a href="#">Termos de uso</a></li></ul><span className="footer-copy">© 2025 Celo Tracker. Todos os direitos reservados.</span></footer></div>;
  }
};
const Mo = 1800000;
const Rt = ({
  children: r
}) => {
  const {
    session: c,
    loading: l,
    signOut: j
  } = We();
  s.useEffect(() => {
    let o;
    const g = () => {
      clearTimeout(o);
      o = window.setTimeout(async () => {
        try {
          console.warn("Sessão expirada por inatividade.");
          await j();
        } catch {}
      }, Mo);
    };
    g();
    window.addEventListener("mousemove", g);
    window.addEventListener("keydown", g);
    window.addEventListener("click", g);
    window.addEventListener("scroll", g);
    return () => {
      clearTimeout(o);
      window.removeEventListener("mousemove", g);
      window.removeEventListener("keydown", g);
      window.removeEventListener("click", g);
      window.removeEventListener("scroll", g);
    };
  }, [j]);
  if (l) {
    return <div className="flex h-screen items-center justify-center" style={{
      backgroundColor: "#0A0E17",
      color: "#FFFFFF"
    }}><div className="flex flex-col items-center gap-4"><div className="animate-spin h-8 w-8 border-4 border-[#8A2BE2]/30 border-t-[#8A2BE2] rounded-full" /><p className="font-bold tracking-widest text-[#8A2BE2] animate-pulse">VALIDANDO ACESSO...</p></div></div>;
  } else if (c) {
    return <e.Fragment>{r}</e.Fragment>;
  } else {
    return <Ts to="/login" replace={true} />;
  }
};
function _Component64({
  children: r
}) {
  return <e.Fragment>{r}</e.Fragment>;
}
function _Component61() {
  const r = "5575988255821";
  const [c] = rs();
  const l = c.get("novo") === "true";
  const j = c.get("esgotado") === "true";
  const o = {
    icon: l && !j ? <Je size={64} /> : <Ft size={64} />,
    title: j ? "Seu período trial expirou" : l ? "Escolha seu plano" : "Seu plano expirou",
    subtitle: j ? "Seu dia de acesso gratuito chegou ao fim. Assine um plano para continuar utilizando o OCR e as métricas avançadas." : l ? "Acesse todas as métricas da sua squad com um plano CTracker." : "Renove sua assinatura para continuar acessando as métricas avançadas e o dashboard completo da sua squad.",
    button: j || l ? "Assinar via WhatsApp" : "Renovar agora via WhatsApp",
    message: "Olá! Quero assinar o CTracker"
  };
  return <div className="ctracker-upgrade-page" style={{
    minHeight: "100vh",
    background: "#0F0F0F",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    padding: "2rem"
  }}><div style={{
      marginBottom: "1.5rem",
      filter: "drop-shadow(0 0 20px rgba(255, 48, 56, 0.3))",
      color: "#FF3038"
    }}>{o.icon}</div><h1 style={{
      fontSize: "2rem",
      fontWeight: 800,
      marginBottom: "1rem",
      textAlign: "center",
      background: "linear-gradient(to bottom, #FFFFFF, #9CA3AF)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>{o.title}</h1><p style={{
      color: "#9CA3AF",
      marginBottom: "2.5rem",
      textAlign: "center",
      maxWidth: "400px",
      lineHeight: 1.6
    }}>{o.subtitle}</p><a href={`https://wa.me/${r}?text=${encodeURIComponent(o.message)}`} target="_blank" rel="noopener noreferrer" style={{
      background: "#FF3038",
      color: "#fff",
      padding: "1rem 2.5rem",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: 700,
      fontSize: "1rem",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 10px 25px -5px rgba(255, 48, 56, 0.4)",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem"
    }} onMouseOver={g => {
      g.currentTarget.style.transform = "translateY(-2px)";
      g.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(255, 48, 56, 0.5)";
    }} onMouseOut={g => {
      g.currentTarget.style.transform = "translateY(0)";
      g.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(255, 48, 56, 0.4)";
    }}><span>{o.button}</span></a><button onClick={() => window.history.back()} style={{
      marginTop: "1.5rem",
      background: "none",
      border: "none",
      color: "#6B7280",
      fontSize: "0.875rem",
      fontWeight: 600,
      cursor: "pointer",
      textDecoration: "underline"
    }}>Voltar</button></div>;
}
const Io = () => {
  const [r, c] = s.useState("intro");
  const [l, j] = s.useState("");
  const [o, g] = s.useState("");
  const [y, S] = s.useState("");
  const [u, w] = s.useState(false);
  const [P, k] = s.useState(null);
  const D = Et();
  const f = async () => {
    w(true);
    k(null);
    try {
      const {
        data: i,
        error: m
      } = await K.auth.mfa.enroll({
        factorType: "totp",
        issuer: "Celo Tracker",
        friendlyName: "Autenticador"
      });
      if (m) {
        throw m;
      }
      g(i.id);
      j(i.totp.qr_code);
      c("qr");
    } catch (i) {
      k(i.message || "Erro ao iniciar configuração de MFA");
    } finally {
      w(false);
    }
  };
  const N = async i => {
    i.preventDefault();
    w(true);
    k(null);
    try {
      if (y.length !== 6) {
        throw new Error("O código deve ter 6 dígitos");
      }
      const {
        data: m,
        error: x
      } = await K.auth.mfa.challenge({
        factorId: o
      });
      if (x) {
        throw x;
      }
      const {
        error: h
      } = await K.auth.mfa.verify({
        factorId: o,
        challengeId: m.id,
        code: y
      });
      if (h) {
        throw h;
      }
      c("success");
      setTimeout(() => D("/"), 2000);
    } catch (m) {
      k(m.message || "Código inválido. Tente novamente.");
    } finally {
      w(false);
    }
  };
  return <div className="ctracker-mfa-page min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6"><div className="bg-[#141416] w-full max-w-md p-8 rounded-3xl border border-white/5 shadow-2xl animate-reveal"><div className="flex flex-col items-center text-center mb-8"><div className="p-4 rounded-2xl bg-[#FF3038]/10 text-[#FF3038] mb-6"><Oa size={32} /></div><h2 className="text-3xl font-bold text-white tracking-tight">{r === "success" ? "Verificado!" : "Segurança em 2 Fatores"}</h2><p className="text-zinc-400 mt-2 font-medium">{r === "intro" && "Como administrador, você precisa ativar o MFA para acessar o sistema."}{r === "qr" && "Escaneie o QR Code abaixo com seu Google Authenticator ou Authy."}{r === "verify" && "Insira o código de 6 dígitos gerado pelo seu aplicativo."}{r === "success" && "Sua conta está protegida. Redirecionando..."}</p></div>{P && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start animate-reveal text-red-500 text-body font-medium"><Ge size={18} className="shrink-0 mt-0.5" /><span>{P}</span></div>}{r === "intro" && <button onClick={f} disabled={u} className="w-full py-4 rounded-xl bg-[#FF3038] hover:bg-[#DA1C27] text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50">{u ? <_Component9 size={20} className="animate-spin" /> : <e.Fragment>Configurar Agora <At size={18} /></e.Fragment>}</button>}{r === "qr" && <div className="flex flex-col items-center gap-6"><div className="bg-white p-3 rounded-2xl"><img src={l} alt="MFA QR Code" className="w-52 h-52" /></div><button onClick={() => c("verify")} className="w-full py-4 rounded-xl bg-[#FF3038] hover:bg-[#DA1C27] text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]">Já escaneei <At size={18} /></button></div>}{r === "verify" && <form onSubmit={N} className="space-y-6"><div className="space-y-2"><label className="text-caption uppercase tracking-widest text-zinc-500 font-bold">Código de 6 dígitos</label><input type="text" maxLength={6} value={y} onChange={i => S(i.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] font-bold text-white outline-none focus:border-[#FF3038]/50 transition-all" autoFocus={true} /></div><button type="submit" disabled={u || y.length !== 6} className="w-full py-4 rounded-xl bg-[#FF3038] hover:bg-[#DA1C27] text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50">{u ? <_Component9 size={20} className="animate-spin" /> : "Verificar e Ativar"}</button><button type="button" onClick={() => c("qr")} className="w-full py-2 text-zinc-500 hover:text-white text-body transition-colors">Voltar para o QR Code</button></form>}{r === "success" && <div className="flex justify-center py-8"><div className="text-green-500 animate-bounce"><_Component1 size={64} /></div></div>}<div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-zinc-600 text-label-sm font-black uppercase tracking-[0.3em]"><Ft size={12} /> Proteção Celo Tracker</div></div></div>;
};
const _o = () => {
  const [r, c] = s.useState("");
  const [l, j] = s.useState("");
  const [o, g] = s.useState(false);
  const [y, S] = s.useState(false);
  const [u] = rs();
  const w = u.get("token_hash");
  const P = u.get("type");
  const [k, D] = s.useState(w && P ? "confirming" : "unauthorized");
  const [f, N] = s.useState("");
  const i = Et();
  const m = async () => {
    S(true);
    N("");
    const {
      error: h
    } = await K.auth.verifyOtp({
      token_hash: w,
      type: "recovery"
    });
    if (h) {
      N("Link inválido ou expirado. Solicite um novo reset de senha.");
      D("error");
    } else {
      D("authorized");
    }
    S(false);
  };
  const x = async h => {
    h.preventDefault();
    N("");
    if (r.length < 6) {
      N("A nova senha deve ter no mínimo 6 caracteres.");
      D("error");
      return;
    }
    if (r !== l) {
      N("As senhas não coincidem. Verifique e tente novamente.");
      D("error");
      return;
    }
    S(true);
    try {
      const {
        error: R
      } = await K.auth.updateUser({
        password: r
      });
      if (R) {
        throw R;
      }
      D("success");
      await K.auth.signOut();
      setTimeout(() => {
        i("/login", {
          replace: true
        });
      }, 3000);
    } catch (R) {
      N(R.message || "Erro ao redefinir a senha. O link de recuperação pode ter expirado ou ser inválido.");
      D("error");
    } finally {
      S(false);
    }
  };
  return <div className="ctracker-auth min-h-screen bg-[var(--bg-main)] flex flex-col md:flex-row overflow-hidden font-['Inter',sans-serif]"><div className="ctracker-auth-art hidden md:flex md:w-[60%] relative items-center justify-center p-20 overflow-hidden border-r border-[var(--border-subtle)]"><div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)",
        backgroundSize: "30px 30px"
      }} /><div className="relative z-10 flex flex-col items-center text-center animate-reveal"><img src="/redesign/logo.svg" alt="CTracker" className="w-[82px] h-[92px] object-contain mb-5 transition-all duration-700 hover:scale-105" /><div className="space-y-4"><p className="text-2xl font-black tracking-tight text-white"><span className="text-[var(--accent)]">C</span>TRACKER</p><h2 className="text-5xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight">Leia o jogo.<br /><span className="text-[var(--accent)]">Decida com dados.</span></h2><p className="text-[var(--text-secondary)] max-w-sm text-lg leading-relaxed font-medium">Defina sua nova senha para retomar o acesso aos seus dados competitivos.</p></div></div></div><div className="ctracker-auth-form flex-1 flex flex-col items-center justify-center p-8 md:p-16 bg-[var(--bg-surface)] relative z-20"><div className="w-full max-w-[360px] animate-reveal"><header className="mb-10 text-center md:text-left"><div className="flex items-center justify-center gap-3 mb-10"><img src="/redesign/logo.svg" alt="" style={{
              height: "48px",
              width: "auto"
            }} /><span className="text-xl font-black tracking-tight text-white"><span className="text-[var(--accent)]">C</span>TRACKER</span></div><h3 className="text-3xl font-bold text-[#EDEDED] tracking-tight mb-2">Nova Senha</h3><p className="text-[#A1A1A1] text-body font-normal">{k === "confirming" && "Confirme para prosseguir com a redefinição de senha."}{k === "unauthorized" && "Link de acesso inválido ou expirado."}{k === "success" && "Senha redefinida com sucesso!"}{(k === "authorized" || k === "error") && "Insira suas novas credenciais de acesso nos campos abaixo."}</p></header>{k === "confirming" && <div className="p-6 bg-[#FF3038]/10 border border-[#FF3038]/20 rounded-xl flex flex-col items-center text-center gap-4 animate-reveal"><div className="w-12 h-12 rounded-full bg-[#FF3038]/20 flex items-center justify-center text-[#FF3038]"><Ft size={28} /></div><div className="space-y-2"><h4 className="text-white font-bold text-lg">Confirmação necessária</h4><p className="text-[#A1A1A1] text-sm leading-relaxed">Para proteger sua conta, clique no botão abaixo para confirmar a redefinição de senha.</p></div><button onClick={m} disabled={y} className="btn-primary w-full py-3 flex items-center justify-center font-semibold text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">{y ? <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <span>Confirmar redefinição de senha</span>}</button></div>}{k === "success" && <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex flex-col items-center text-center gap-4 animate-reveal"><div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><_Component53 size={28} /></div><div className="space-y-2"><h4 className="text-white font-bold text-lg">Senha Redefinida!</h4><p className="text-[#A1A1A1] text-sm leading-relaxed">Sua senha foi redefinida com total sucesso. Redirecionando para a tela de login...</p></div><button onClick={() => i("/login")} className="btn-primary w-full py-2.5 flex items-center justify-center font-semibold text-sm rounded-lg mt-2">Ir para o Login</button></div>}{k === "unauthorized" && <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col items-center text-center gap-4 animate-reveal"><div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500"><Ge size={28} /></div><div className="space-y-2"><h4 className="text-white font-bold text-lg">Link Inválido</h4><p className="text-[#A1A1A1] text-sm leading-relaxed">Este link de recuperação expirou ou é inválido. Por favor, solicite uma nova redefinição na tela de login.</p></div><button onClick={() => i("/login")} className="btn-primary w-full py-2.5 flex items-center justify-center font-semibold text-sm rounded-lg mt-2">Ir para o Login</button></div>}{(k === "authorized" || k === "error") && <e.Fragment>{k === "error" && f && <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-md flex gap-3 items-start animate-reveal"><Ge size={18} className="text-red-500 shrink-0 mt-0.5" /><div className="flex flex-col gap-2 text-left"><span className="text-red-500 text-xs font-semibold leading-normal">Falha ao redefinir a senha:</span><span className="text-red-400 text-xs leading-normal">{f}</span><button type="button" onClick={() => i("/login")} className="text-left text-xs font-bold text-[var(--accent)] hover:underline mt-1 flex items-center gap-1"><_Component57 size={12} /> Solicitar novo link de redefinição</button></div></div>}<form onSubmit={x} className="space-y-6"><div className="space-y-2 group relative"><label className="text-body-sm font-normal text-[#A1A1A1] group-focus-within:text-[var(--accent)] transition-colors">Nova senha</label><div className="relative"><input type={o ? "text" : "password"} value={r} onChange={h => c(h.target.value)} placeholder="Mínimo 6 caracteres" className="input-base pl-10 pr-10 border-[var(--border-default)] bg-[var(--bg-surface)] w-full" required={true} minLength={6} /><Ft size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" /><button type="button" onClick={() => g(!o)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-white transition-colors">{o ? <Qa size={16} /> : <Va size={16} />}</button></div></div><div className="space-y-2 group relative"><label className="text-body-sm font-normal text-[#A1A1A1] group-focus-within:text-[var(--accent)] transition-colors">Confirmar nova senha</label><div className="relative"><input type={o ? "text" : "password"} value={l} onChange={h => j(h.target.value)} placeholder="Repita a nova senha" className="input-base pl-10 pr-10 border-[var(--border-default)] bg-[var(--bg-surface)] w-full" required={true} minLength={6} /><Ft size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" /></div></div><button type="submit" disabled={y} className="btn-primary w-full py-3.5 flex items-center justify-center font-semibold text-body rounded-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed">{y ? <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <span>Redefinir senha</span>}</button></form></e.Fragment>}</div></div></div>;
};
function Bo() {
  const {
    user: r
  } = We();
  const [c, l] = s.useState(false);
  const [j, o] = s.useState(0);
  const [g, y] = s.useState("");
  s.useEffect(() => {
    if (!r) {
      return;
    }
    (async () => {
      if (sessionStorage.getItem("expiration_alert_dismissed")) {
        return;
      }
      const {
        data: w,
        error: P
      } = await K.from("subscriptions").select("*").eq("user_id", r.id).in("status", ["active", "ativo"]).limit(1).maybeSingle();
      if (P || !w) {
        return;
      }
      const k = w.expires_at || w.data_fim;
      const D = w.plan || w.plano || "Gratuito";
      if (!k) {
        return;
      }
      const f = new Date(k);
      const N = new Date();
      f.setHours(0, 0, 0, 0);
      N.setHours(0, 0, 0, 0);
      const i = f.getTime() - N.getTime();
      const m = Math.ceil(i / 86400000);
      if (m <= 3 && m >= 0 && D.toLowerCase() !== "gratuito") {
        o(m);
        y(D);
        l(true);
      }
    })();
  }, [r]);
  return {
    showModal: c,
    daysLeft: j,
    plan: g,
    handleClose: () => {
      sessionStorage.setItem("expiration_alert_dismissed", "true");
      l(false);
    }
  };
}
function Lo({
  daysLeft: r,
  plan: c,
  onClose: l
}) {
  let j = "";
  if (r === 0) {
    j = "Seu plano expira hoje!";
  } else if (r === 1) {
    j = "Seu plano expira amanhã.";
  } else {
    j = `Seu plano expira em ${r} dias.`;
  }
  const o = () => {
    window.open("https://wa.me/5511999999999?text=Quero%20renovar%20meu%20plano%20CTracker", "_blank");
  };
  return <e.Fragment><style>{`
          @keyframes expirationModalEnter {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .expiration-animate-in {
            animation: expirationModalEnter 0.2s ease-out forwards;
          }
        `}</style><div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm px-4"><div className="relative w-full max-w-md flex flex-col items-center bg-[#111111] expiration-animate-in" style={{
        borderRadius: "12px",
        border: "1px solid rgba(91,95,255,0.3)",
        padding: "32px"
      }}><button onClick={l} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><Ye size={24} /></button><_Component43 color="#FF3038" size={40} className="mb-4" /><h2 className="font-bold text-[#EDEDED] mb-2" style={{
          fontSize: "20px"
        }}>Seu plano expira em breve</h2><p className="text-white font-medium mb-4 text-lg">{j}</p><p className="text-[#AAAAAA] text-center mb-8" style={{
          fontSize: "14px"
        }}>Renove agora para continuar acessando todas as funcionalidades do CTracker.</p><div className="flex flex-col w-full gap-3 mt-auto"><button onClick={o} className="w-full py-3 px-4 bg-[#FF3038] hover:bg-[#4A4EE5] text-white font-medium rounded-lg transition-colors">Renovar agora</button><button onClick={l} className="w-full py-3 px-4 bg-transparent border border-white/10 hover:bg-white/5 text-[#AAAAAA] font-medium rounded-lg transition-colors">Lembrar depois</button></div></div></div></e.Fragment>;
}
function _Component58() {
  const {
    showModal: r,
    daysLeft: c,
    plan: l,
    handleClose: j
  } = Bo();
  if (r) {
    return <Lo daysLeft={c} plan={l} onClose={j} />;
  } else {
    return null;
  }
}
function Uo({
  children: r
}) {
  const {
    user: c
  } = We();
  const {
    subscription: l,
    loading: j
  } = ns(c?.id);
  if (j) {
    return null;
  } else if (l?.ativo) {
    return <Ts to="/" replace={true} />;
  } else {
    return <e.Fragment>{r}</e.Fragment>;
  }
}
function $o() {
  s.useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("ref");
    if (c) {
      localStorage.setItem("celo_referral", c);
      const l = window.location.pathname;
      window.history.replaceState({}, "", l);
    }
  }, []);
  return <Dr><_Component67><_Component58 /><Nr><_Component66><$e path="/login" element={<_Component59 mode="login" />} /><$e path="/register" element={<_Component59 mode="register" />} /><$e path="/landing" element={<Po />} /><$e path="/planos" element={<_Component60 />} /><$e path="/reset-password" element={<_o />} /><$e path="/upgrade" element={<Rt><Uo><_Component61 /></Uo></Rt>} /><$e path="/setup-mfa" element={<Rt><Io /></Rt>} /><$e path="/squad/:token" element={<_Component62 />} /><$e path="/share/:token" element={<_Component62 />} /><$e path="/" element={<Rt><_Component64><_Component63 /></_Component64></Rt>} /><$e path="/coletivo" element={<Rt><_Component64><_Component65 /></_Component64></Rt>} /><$e path="/quebras" element={<Rt><_Component64><Fo /></_Component64></Rt>} /><$e path="/rotas" element={<Rt><To /></Rt>} /><$e path="/campeonatos" element={<Rt><Oo /></Rt>} /><$e path="/analise" element={<Rt><_Component64><_Component63 /></_Component64></Rt>} /><$e path="/input" element={<Rt><_Component64><So /></_Component64></Rt>} /></_Component66><Xa /></Nr></_Component67></Dr>;
}
Sr.createRoot(document.getElementById("root")).render(<$o />);