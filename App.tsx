import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#080810;--surface:#0f0f1a;--card:#13131f;--border:rgba(255,255,255,0.06);
    --accent:#6366f1;--accent2:#8b5cf6;--green:#10b981;--amber:#f59e0b;--red:#ef4444;
    --text:#f1f5f9;--muted:#64748b;--font:'Syne',sans-serif;--mono:'JetBrains Mono',monospace;
  }
  body{background:var(--bg);color:var(--text);font-family:var(--font);-webkit-tap-highlight-color:transparent;user-select:none}
  .app{min-height:100vh;max-width:480px;margin:0 auto;padding:16px 16px 100px}
  .glass{background:var(--card);border:1px solid var(--border);backdrop-filter:blur(12px)}
  .card{border-radius:24px;padding:20px}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .ap{animation:pulse 2s infinite}
  .as{animation:spin 1s linear infinite}
  .au{animation:slideUp 0.4s ease forwards}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
  .chat-box{height:280px;overflow-y:auto;padding:4px 0;scroll-behavior:smooth}
  .chat-box::-webkit-scrollbar{width:3px}
  .chat-box::-webkit-scrollbar-thumb{background:var(--accent);border-radius:99px}
  .msg{padding:10px 14px;border-radius:16px;font-size:13px;line-height:1.6;max-width:85%;animation:fadeIn .3s ease}
  .mu{background:var(--accent);margin-left:auto;border-bottom-right-radius:4px}
  .ma{background:rgba(255,255,255,0.05);border:1px solid var(--border);margin-right:auto;border-bottom-left-radius:4px}
  .ms{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);color:#10b981;font-size:11px;text-align:center;margin:0 auto;padding:6px 12px;border-radius:99px}
  .dots{display:flex;gap:4px;align-items:center;padding:12px 14px}
  .dots span{width:6px;height:6px;background:var(--muted);border-radius:50%;animation:pulse 1.2s infinite}
  .dots span:nth-child(2){animation-delay:.2s}
  .dots span:nth-child(3){animation-delay:.4s}
  .bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;background:rgba(8,8,16,0.95);border-top:1px solid var(--border);padding:10px 20px;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px);z-index:50}
  .nb{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);cursor:pointer;padding:8px 14px;border-radius:12px;transition:all .2s;border:none;background:transparent}
  .nb.active{color:var(--accent);background:rgba(99,102,241,0.1)}
  .cam-ov{position:fixed;inset:0;background:#000;z-index:100;display:flex;flex-direction:column}
  .tag{font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:4px 8px;border-radius:6px}
  .ci{flex:1;background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--text);font-family:var(--font);font-size:13px;border-radius:14px;padding:10px 14px;resize:none;outline:none;max-height:100px;min-height:42px;transition:border-color .2s}
  .ci:focus{border-color:var(--accent)}
  .ci::placeholder{color:var(--muted)}
  .bb{height:8px;border-radius:99px;background:rgba(255,255,255,0.06);overflow:hidden}
  .bf{height:100%;border-radius:99px;transition:width 1s ease}
  .sdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
  .stitle{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;display:flex;align-items:center;gap:6px}
  .qb{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer}
  .qi{width:52px;height:52px;border-radius:18px;display:flex;align-items:center;justify-content:center;transition:all .2s;border:1px solid}
  .qb:active .qi{transform:scale(.9)}
  .ql{font-size:10px;color:var(--muted);font-weight:600}
  .cc{border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer;transition:all .2s;min-height:100px}
  .cc:active{transform:scale(.95)}
  .mo{position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn .2s}
  .mb{background:var(--card);border:1px solid rgba(99,102,241,0.3);border-radius:28px;padding:24px;width:100%;max-width:360px;position:relative;animation:slideUp .3s ease}
  pre{white-space:pre-wrap;word-break:break-word;font-family:var(--mono);font-size:12px}
  .btn{cursor:pointer;transition:all .15s ease;border:none;outline:none}
  .btn:active{transform:scale(.95)}
`;

const Svg = ({ d, size = 20, color = "currentColor", cls = "" }: { d: string | string[]; size?: number; color?: string; cls?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}
    style={{ display: "block", flexShrink: 0 }}>
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const I = {
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  wifi: ["M5 12.55a11 11 0 0 1 14.08 0","M1.42 9a16 16 0 0 1 21.16 0","M8.53 16.11a6 6 0 0 1 6.95 0","M12 20h.01"],
  pin: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z","M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  cam: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  vol: ["M11 5L6 9H2v6h4l5 4V5z","M19.07 4.93a10 10 0 0 1 0 14.14","M15.54 8.46a5 5 0 0 1 0 7.07"],
  volx: ["M11 5L6 9H2v6h4l5 4V5z","M23 9l-6 6","M17 9l6 6"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  dl: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M7 10l5 5 5-5","M12 15V3"],
  layers: ["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  msg: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  hist: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  search: ["M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z","M21 21l-4.35-4.35"],
  mail: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  yt: ["M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z","M9.75 15.02V8.98L15.5 12l-5.75 3.02z"],
  brain: ["M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z","M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"],
  spark: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
  cpu: ["M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z","M9 9h6v6H9z","M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"],
  phone: "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 17h.01",
  send: ["M22 2L11 13","M22 2L15 22 8 13 2 9z"],
  x: ["M18 6 6 18","M6 6l12 12"],
  ref: ["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"],
  vib: ["M2 8v8","M6 6v12","M10 4v16","M14 4v16","M18 6v12","M22 8v8"],
};

export default function App() {
  const [tab, setTab] = useState("home");
  const [battery, setBattery] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);
  const [loc, setLoc] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [camOpen, setCamOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "system", content: "Claude AI متصل · مجاني بلا قيود ✦" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [scan, setScan] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then(b => {
        const upd = () => setBattery({ level: Math.round(b.level * 100), charging: b.charging });
        upd(); b.addEventListener("levelchange", upd); b.addEventListener("chargingchange", upd);
      });
    }
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const bCol = battery ? (battery.level > 50 ? "#10b981" : battery.level > 20 ? "#f59e0b" : "#ef4444") : "#6366f1";

  const getLoc = () => {
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      p => { setLoc({ lat: p.coords.latitude.toFixed(5), lng: p.coords.longitude.toFixed(5), acc: Math.round(p.coords.accuracy) }); setLocLoading(false); },
      () => { setLoc({ err: true }); setLocLoading(false); }
    );
  };

  const vib = () => navigator.vibrate && navigator.vibrate([50, 30, 50]);

  const toggleCam = async () => {
    if (!camOpen) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        streamRef.current = s;
        setCamOpen(true);
        setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = s; }, 100);
      } catch { alert("لا يمكن الوصول للكاميرا"); }
    } else {
      streamRef.current?.getTracks().forEach(t => t.stop());
      setCamOpen(false);
    }
  };

  const smartScan = () => {
    setScan("scanning");
    setTab("home");
    setTimeout(() => setScan({
      النموذج: "claude-sonnet-4-20250514",
      النظام: navigator.platform || "N/A",
      اللغة: navigator.language,
      الذاكرة: navigator.deviceMemory ? navigator.deviceMemory + " GB" : "N/A",
      المعالجات: navigator.hardwareConcurrency || "N/A",
      الشاشة: `${screen.width}×${screen.height}`,
      المنطقة: Intl.DateTimeFormat().resolvedOptions().timeZone,
      الاتصال: navigator.connection?.effectiveType || "N/A",
      وضع_التفكير: thinking ? "مفعّل 🧠" : "معطّل",
    }), 800);
  };

  const send = async () => {
    const t = input.trim();
    if (!t || loading) return;
    setInput("");
    const userMsg = { role: "user", content: t };
    const history = [...msgs.filter(m => m.role !== "system"), userMsg];
    setMsgs(p => [...p, userMsg]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: thinking
            ? "أنت Claude AI. فكّر بعمق وأجب بدقة. استخدم العربية عند الإمكان."
            : "أنت Claude AI مدمج في Phone Control Hub. أجب بإيجاز ودقة. استخدم العربية عند الإمكان.",
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const d = await res.json();
      setMsgs(p => [...p, { role: "assistant", content: d.content?.[0]?.text || "حدث خطأ." }]);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "⚠️ تعذّر الاتصال بـ Claude." }]);
    }
    setLoading(false);
  };

  const s = (d, size, color, cls) => <Svg d={d} size={size} color={color} cls={cls} />;

  const row = (label, val) => (
    <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"9px 12px", borderRadius:10, background:"rgba(255,255,255,0.03)", marginBottom:6, fontSize:13 }}>
      <span style={{ color:"var(--muted)" }}>{label}</span>
      <span style={{ fontFamily:"var(--mono)", fontSize:12 }}>{val}</span>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* Header */}
        <header style={{ marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.02em", lineHeight:1 }}>Phone Control Hub</h1>
              <p style={{ fontSize:11, color:"var(--muted)", marginTop:4, fontFamily:"var(--mono)" }}>مركز التحكم · Claude AI</p>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn glass" onClick={() => setThinking(!thinking)} title="وضع التفكير" style={{ padding:8, borderRadius:12, color: thinking ? "#8b5cf6" : "var(--muted)", background: thinking ? "rgba(139,92,246,0.15)" : "var(--card)", border: thinking ? "1px solid rgba(139,92,246,0.4)" : "1px solid var(--border)" }}>
                {s(I.brain, 18)}
              </button>
              <button className="btn glass" onClick={() => setInfoOpen(true)} style={{ padding:8, borderRadius:12, color:"var(--muted)", border:"1px solid var(--border)" }}>
                {s(I.cpu, 18)}
              </button>
            </div>
          </div>
          <div className="glass" style={{ borderRadius:14, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div className="sdot ap" style={{ background: online ? "var(--green)" : "var(--red)" }} />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", color: online ? "var(--green)" : "var(--red)" }}>{online ? "ONLINE" : "OFFLINE"}</span>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <span className="tag" style={{ background:"rgba(99,102,241,0.15)", color:"var(--accent)", border:"1px solid rgba(99,102,241,0.25)" }}>CLAUDE AI</span>
              {thinking && <span className="tag" style={{ background:"rgba(139,92,246,0.15)", color:"#a78bfa", border:"1px solid rgba(139,92,246,0.3)" }}>THINKING</span>}
            </div>
          </div>
        </header>

        {/* ── HOME ── */}
        {tab === "home" && <>
          {/* Battery */}
          <div className="glass card au" style={{ marginBottom:14, opacity:0 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <span style={{ fontSize:12, color:"var(--muted)", fontWeight:600 }}>Battery · البطارية</span>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                {battery?.charging && <Svg d={I.zap} size={14} color="#fbbf24" cls="ap" />}
                <span style={{ fontFamily:"var(--mono)", fontSize:11, color: bCol }}>{battery?.charging ? "شحن ⚡" : "تشغيل"}</span>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:12 }}>
              <span style={{ fontSize:56, fontWeight:800, letterSpacing:"-0.04em", color: bCol, lineHeight:1 }}>{battery ? battery.level : "--"}</span>
              <span style={{ fontSize:20, color:"var(--muted)", fontWeight:600 }}>%</span>
            </div>
            <div className="bb"><div className="bf" style={{ width:`${battery?.level||0}%`, background: bCol }} /></div>
          </div>

          {/* Location */}
          <div className="glass card au" style={{ marginBottom:14, opacity:0, animationDelay:"0.05s" }}>
            <div className="stitle">{s(I.pin, 14)} الموقع · Location</div>
            {loc?.err
              ? <p style={{ fontSize:12, color:"var(--red)", marginBottom:12 }}>تعذّر جلب الموقع</p>
              : loc
                ? <div style={{ marginBottom:12 }}>
                    <p style={{ fontFamily:"var(--mono)", fontSize:13, marginBottom:4 }}>{loc.lat}, {loc.lng}</p>
                    <p style={{ fontSize:11, color:"var(--muted)" }}>دقة: {loc.acc}م</p>
                  </div>
                : <p style={{ fontSize:12, color:"var(--muted)", marginBottom:12 }}>لم يتم جلب الموقع بعد</p>
            }
            <button className="btn" onClick={getLoc} disabled={locLoading} style={{ width:"100%", padding:11, background:"rgba(99,102,241,0.2)", border:"1px solid rgba(99,102,241,0.4)", color:"var(--accent)", borderRadius:14, fontSize:13, fontWeight:700, fontFamily:"var(--font)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {s(I.ref, 14, "currentColor", locLoading ? "as" : "")} {locLoading ? "جاري التحديث..." : "تحديث الموقع"}
            </button>
          </div>

          {/* Controls */}
          <div className="grid2 au" style={{ marginBottom:14, opacity:0, animationDelay:"0.1s" }}>
            {[
              { ic:I.vib, label:"اهتزاز", sub:"Vibrate", fn:vib, c:"#6366f1" },
              { ic:muted?I.volx:I.vol, label:muted?"صوت":"كتم", sub:muted?"Unmute":"Mute", fn:()=>setMuted(!muted), c:muted?"#ef4444":"#10b981" },
              { ic:I.cam, label:"الكاميرا", sub:"Camera", fn:toggleCam, c:"#8b5cf6" },
              { ic:I.eye, label:"فحص ذكي", sub:"Smart Scan", fn:smartScan, c:"#f59e0b" },
            ].map((c, i) => (
              <button key={i} className="btn glass cc" onClick={c.fn}>
                <div style={{ width:44, height:44, borderRadius:14, background:`${c.c}18`, display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${c.c}28` }}>
                  {s(c.ic, 20, c.c)}
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:12, fontWeight:700, marginBottom:2 }}>{c.label}</div>
                  <div style={{ fontSize:10, color:"var(--muted)" }}>{c.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Scan result */}
          {scan && scan !== "scanning" && typeof scan === "object" && (
            <div className="glass card au" style={{ marginBottom:14, opacity:0 }}>
              <div className="stitle">{s(I.cpu, 14)} نتيجة الفحص الذكي</div>
              {Object.entries(scan).map(([k, v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid var(--border)", fontSize:12 }}>
                  <span style={{ color:"var(--muted)" }}>{k.replace(/_/g," ")}</span>
                  <span style={{ fontFamily:"var(--mono)", fontSize:11, maxWidth:"55%", textAlign:"right", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{String(v)}</span>
                </div>
              ))}
              <button className="btn" onClick={() => setScan(null)} style={{ marginTop:12, width:"100%", padding:9, background:"rgba(255,255,255,0.05)", border:"1px solid var(--border)", color:"var(--muted)", borderRadius:12, fontSize:12, fontFamily:"var(--font)" }}>
                إغلاق
              </button>
            </div>
          )}
          {scan === "scanning" && (
            <div className="glass card" style={{ marginBottom:14, textAlign:"center", padding:32 }}>
              {s(I.cpu, 28, "var(--accent)", "as")}
              <p style={{ fontSize:13, color:"var(--muted)", marginTop:12 }}>جاري الفحص الذكي...</p>
            </div>
          )}

          {/* Quick Launch */}
          <div className="glass card au" style={{ opacity:0, animationDelay:"0.15s" }}>
            <div className="stitle">{s(I.layers, 14)} وصول سريع</div>
            <div className="grid3">
              {[
                { ic:I.yt, label:"YouTube", c:"#ef4444", bg:"rgba(239,68,68,0.1)", bd:"rgba(239,68,68,0.2)", url:"https://youtube.com" },
                { ic:I.mail, label:"البريد", c:"#6366f1", bg:"rgba(99,102,241,0.1)", bd:"rgba(99,102,241,0.2)", url:"mailto:" },
                { ic:I.search, label:"بحث", c:"#10b981", bg:"rgba(16,185,129,0.1)", bd:"rgba(16,185,129,0.2)", url:"https://google.com" },
              ].map((q, i) => (
                <button key={i} className="btn qb" onClick={() => window.open(q.url, "_blank")}>
                  <div className="qi" style={{ background:q.bg, borderColor:q.bd }}>{s(q.ic, 20, q.c)}</div>
                  <span className="ql">{q.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>}

        {/* ── CHAT ── */}
        {tab === "chat" && (
          <div className="glass card au" style={{ opacity:0 }}>
            <div className="stitle">
              {s(I.spark, 14, "var(--accent)")} دردشة Claude AI
              {thinking && <span className="tag" style={{ background:"rgba(139,92,246,0.15)", color:"#a78bfa", border:"1px solid rgba(139,92,246,0.3)", marginRight:8 }}>تفكير عميق</span>}
            </div>
            <div className="chat-box">
              {msgs.map((m, i) =>
                m.role === "system"
                  ? <div key={i} style={{ display:"flex", justifyContent:"center", marginBottom:12 }}><div className="msg ms">{m.content}</div></div>
                  : <div key={i} style={{ display:"flex", flexDirection:"column", marginBottom:10, alignItems: m.role==="user"?"flex-end":"flex-start" }}>
                      <div className={`msg ${m.role==="user"?"mu":"ma"}`}><pre>{m.content}</pre></div>
                    </div>
              )}
              {loading && <div style={{ display:"flex", marginBottom:10 }}><div className="msg ma dots"><span/><span/><span/></div></div>}
              <div ref={endRef} />
            </div>
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:12, marginTop:4, display:"flex", gap:8, alignItems:"flex-end" }}>
              <textarea className="ci" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
                placeholder="اكتب رسالة..." rows={1} />
              <button className="btn" onClick={send} disabled={loading || !input.trim()} style={{ width:42, height:42, borderRadius:12, flexShrink:0, background: input.trim()&&!loading?"var(--accent)":"rgba(255,255,255,0.05)", border:"1px solid var(--border)", color: input.trim()&&!loading?"#fff":"var(--muted)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {s(I.send, 16)}
              </button>
            </div>
          </div>
        )}

        {/* ── ARCHIVE ── */}
        {tab === "archive" && (
          <div className="glass card au" style={{ textAlign:"center", padding:48, opacity:0 }}>
            {s(I.hist, 40, "var(--muted)")}
            <p style={{ color:"var(--muted)", fontSize:14, marginTop:16 }}>لا توجد محادثات محفوظة</p>
          </div>
        )}

      </div>

      {/* Bottom Nav */}
      <nav className="bnav">
        {[
          { id:"home", ic:I.phone, label:"الرئيسية" },
          { id:"chat", ic:I.msg, label:"Chat AI" },
          { id:"archive", ic:I.hist, label:"الأرشيف" },
        ].map(n => (
          <button key={n.id} className={`btn nb ${tab===n.id?"active":""}`} onClick={() => setTab(n.id)}>
            {s(n.ic, 20)} {n.label}
          </button>
        ))}
        <span className="tag" style={{ background:"rgba(16,185,129,0.1)", color:"var(--green)", border:"1px solid rgba(16,185,129,0.2)" }}>FREE</span>
      </nav>

      {/* Camera */}
      {camOpen && (
        <div className="cam-ov">
          <div style={{ padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid var(--border)", background:"rgba(0,0,0,0.6)" }}>
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.1em", color:"#6366f1" }}>LIVE CAMERA</span>
            <button className="btn" onClick={toggleCam} style={{ color:"var(--muted)", background:"rgba(255,255,255,0.1)", border:"none", borderRadius:8, padding:6 }}>{s(I.x, 18)}</button>
          </div>
          <video ref={videoRef} style={{ flex:1, width:"100%", objectFit:"cover" }} autoPlay playsInline muted />
          <div style={{ padding:24, display:"flex", justifyContent:"center", background:"rgba(0,0,0,0.6)" }}>
            <button className="btn" onClick={() => { vib(); alert("تم التقاط الصورة ✓"); }} style={{ width:64, height:64, background:"#fff", borderRadius:"50%", border:"4px solid rgba(255,255,255,0.3)" }} />
          </div>
        </div>
      )}

      {/* Info Modal */}
      {infoOpen && (
        <div className="mo" onClick={() => setInfoOpen(false)}>
          <div className="mb" onClick={e => e.stopPropagation()}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--accent),var(--accent2))", borderRadius:"28px 28px 0 0" }} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:"rgba(99,102,241,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {s(I.brain, 20, "var(--accent)")}
                </div>
                <div>
                  <div style={{ fontWeight:800, fontSize:15 }}>Claude Engine</div>
                  <div style={{ fontSize:10, color:"var(--accent)", fontFamily:"var(--mono)", letterSpacing:"0.1em" }}>Sonnet 4 · Active</div>
                </div>
              </div>
              <button className="btn" onClick={() => setInfoOpen(false)} style={{ color:"var(--muted)", background:"transparent", border:"none" }}>{s(I.x, 18)}</button>
            </div>
            {[
              ["النموذج","claude-sonnet-4-20250514"],
              ["الحالة","نشط ✓"],
              ["التفكير العميق", thinking ? "مفعّل 🧠" : "معطّل"],
              ["الاتصال", online ? "متصل ✓" : "غير متصل"],
              ["البطارية", battery ? `${battery.level}%` : "غير متاح"],
              ["عدد الرسائل", msgs.filter(m=>m.role!=="system").length],
            ].map(([k,v]) => row(k, v))}
            <button className="btn" onClick={() => setInfoOpen(false)} style={{ marginTop:16, width:"100%", padding:12, background:"var(--accent)", border:"none", color:"#fff", borderRadius:14, fontSize:13, fontWeight:700, fontFamily:"var(--font)" }}>
              تأكيد
            </button>
          </div>
        </div>
      )}
    </>
  );
}
