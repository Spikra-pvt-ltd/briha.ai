import { useState, useEffect, useRef } from "react";

// ─── Premium Light Color Palette ───
const C = {
  bg: "#fafbff",
  bgCard: "#ffffff",
  bgSoft: "#f0f2ff",
  accent: "#4f46e5",
  accentLight: "#6366f1",
  accentGlow: "rgba(79,70,229,0.12)",
  gradient: "linear-gradient(135deg, #4f46e5, #7c3aed, #db2777)",
  gradientSoft: "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(124,58,237,0.05))",
  text: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  white: "#ffffff",
  green: "#059669",
  greenBg: "rgba(5,150,105,0.08)",
  orange: "#d97706",
  orangeBg: "rgba(217,119,6,0.08)",
  pink: "#db2777",
  pinkBg: "rgba(219,39,119,0.08)",
  blue: "#2563eb",
  blueBg: "rgba(37,99,235,0.08)",
  cyan: "#0891b2",
  cyanBg: "rgba(8,145,178,0.08)",
  red: "#dc2626",
  redBg: "rgba(220,38,38,0.06)",
};

const products = [
  {
    id: "lead-enrichment",
    name: "Lead Enrichment",
    tagline: "Turn raw leads into rich profiles — automatically.",
    icon: "01",
    color: C.blue,
    colorBg: C.blueBg,
    description: "Connects to multiple data sources to automatically fill in missing company details, social profiles, tech stacks, and buying signals. Your sales team focuses on selling, not researching.",
    features: ["Auto-enrichment from 50+ data sources", "Company firmographics, technographics & social profiles", "Real-time buying intent signals", "Zoho CRM integration & bulk CSV upload"],
    metrics: [{ l: "Data Accuracy", v: "95%+" }, { l: "Time Saved", v: "12hrs/week" }, { l: "Lead Conversion", v: "+40%" }],
  },
  {
    id: "mom-generator",
    name: "MoM Generator",
    tagline: "From meeting chaos to crystal-clear minutes — instantly.",
    icon: "02",
    color: C.cyan,
    colorBg: C.cyanBg,
    description: "Advanced NLP listens, transcribes, and summarizes your meetings into structured, actionable documents. Identifies decisions, assigns owners to action items, and tracks follow-ups automatically.",
    features: ["Real-time transcription & AI summarization", "Automatic action item & decision extraction", "Calendar & project tool integration", "Searchable meeting archive"],
    metrics: [{ l: "Transcription", v: "98%" }, { l: "Prep Time", v: "-80%" }, { l: "Items Tracked", v: "100%" }],
  },
  {
    id: "cta-agent",
    name: "Call Analyzer",
    tagline: "Phone call to CRM — fully automated intelligence pipeline.",
    icon: "03",
    color: C.pink,
    colorBg: C.pinkBg,
    description: "Transforms raw phone call recordings into actionable CRM intelligence. Transcribes client calls, generates summaries, extracts call-to-action items, scores leads against your ICP, and pushes everything into your CRM module's notes section.",
    features: ["Automatic transcription & AI-powered summaries", "Call-to-action extraction & prioritization", "Lead ICP scoring from conversation signals", "Auto-push to Zoho CRM & multi-platform support"],
    metrics: [{ l: "Accuracy", v: "98%" }, { l: "CRM Update", v: "<30s" }, { l: "Productivity", v: "+60%" }],
  },
  {
    id: "follow-up-email",
    name: "Email Agent",
    tagline: "Never drop the ball — AI drafts your follow-ups from past conversations.",
    icon: "04",
    color: C.orange,
    colorBg: C.orangeBg,
    description: "Automatically monitors your client interactions, detects when follow-ups are due, and drafts personalized emails based on the full context of past conversations. It reads through previous emails, call notes, and meeting summaries to craft relevant, timely follow-ups — then reminds you or sends them on your schedule.",
    features: ["Smart follow-up detection from conversation history", "AI-drafted emails with tone & brand voice matching", "Configurable reminders, escalation & approval workflow", "CRM activity timeline integration"],
    metrics: [{ l: "Follow-up Rate", v: "100%" }, { l: "Draft Accuracy", v: "92%" }, { l: "Deals Rescued", v: "+35%" }],
  },
  {
    id: "ceo-dashboard",
    name: "CEO's Dashboard",
    tagline: "Your entire business — one intelligent screen.",
    icon: "05",
    color: C.green,
    colorBg: C.greenBg,
    description: "Aggregates data from your CRM, finance tools, project management, and HR systems into a single AI-powered command center. Predictive insights, anomaly alerts, and natural language querying for decision-makers.",
    features: ["Unified data from CRM, Finance, HR & PM", "AI insights, anomaly detection & predictive forecasting", "Natural language querying & custom KPI alerts", "Mobile-optimized executive view"],
    metrics: [{ l: "Data Sources", v: "20+" }, { l: "Decision Speed", v: "5x faster" }, { l: "Reports", v: "Instant" }],
  },
];

// ─── Global Styles ───
const styleTag = document.createElement("style");
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: ${C.bg}; }
  @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(79,70,229,0.15); } 50% { box-shadow: 0 0 40px rgba(79,70,229,0.3); } }
  .gradient-text { background: linear-gradient(135deg, #4f46e5, #7c3aed, #db2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .card-lift { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; transition: all 0.3s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .card-lift:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(79,70,229,0.1); border-color: rgba(79,70,229,0.2); }
  .glow-btn { transition: all 0.3s ease; }
  .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(79,70,229,0.3); }
  .product-row { transition: all 0.25s ease; }
  .product-row:hover { background: #f0f0ff !important; transform: translateX(4px); }
  .nav-link { transition: all 0.2s ease; }
  .nav-link:hover { color: #4f46e5 !important; background: rgba(79,70,229,0.08) !important; }
  .feature-card { transition: all 0.25s ease; }
  .feature-card:hover { border-color: rgba(79,70,229,0.3) !important; background: #f8f9ff !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(79,70,229,0.06); }
`;
if (!document.querySelector("#briha-styles")) { styleTag.id = "briha-styles"; document.head.appendChild(styleTag); }

// ─── Demos ───

function LeadEnrichmentDemo() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("john@acmecorp.com");
  const [busy, setBusy] = useState(false);
  const run = () => {
    setBusy(true); setStep(0);
    [1, 2, 3, 4].forEach((s, i) => setTimeout(() => { setStep(s); if (s === 4) setBusy(false); }, (i + 1) * 600));
  };
  return (
    <DemoWrap>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter a lead email..." style={inputStyle} />
        <button onClick={run} disabled={busy} style={btnStyle(C.accent, busy)} className="glow-btn">
          {busy ? "Enriching..." : "Enrich Lead"}
        </button>
      </div>
      {step >= 1 && (
        <div style={{ background: C.bgSoft, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {step >= 1 && <Fl l="Full Name" v="John Mitchell" />}{step >= 2 && <Fl l="Company" v="Acme Corp" />}{step >= 2 && <Fl l="Title" v="VP of Sales" />}
            {step >= 3 && <Fl l="Company Size" v="150-200 employees" />}{step >= 3 && <Fl l="Industry" v="SaaS / B2B" />}{step >= 3 && <Fl l="Tech Stack" v="Zoho, Slack, AWS" />}
            {step >= 4 && <Fl l="LinkedIn" v="linkedin.com/in/johnm" />}{step >= 4 && <Fl l="Buying Intent" v="● High" c={C.green} />}{step >= 4 && <Fl l="Revenue Est." v="$12M–$18M" />}
          </div>
        </div>
      )}
      {step >= 4 && <div style={{ color: C.green, fontSize: 13, marginTop: 12, fontWeight: 500 }}>✓ Enriched from 6 sources in 2.4s</div>}
    </DemoWrap>
  );
}

function MoMDemo() {
  const [busy, setBusy] = useState(false);
  const [lines, setLines] = useState([]);
  const out = ["Meeting: Q1 Product Roadmap Review", "Date: March 12, 2026 · 45 min", "Attendees: Radha R., Arun K., Priya S.", "", "Key Decisions:", "  → Launch Lead Enrichment v2.0 by April 15", "  → Prioritize CEO Dashboard mobile view", "  → 2 devs allocated to CTA Agent", "", "Action Items:", "  ☐ Arun — Finalize API docs by March 20", "  ☐ Priya — User testing for MoM, March 25", "  ☐ Radha — Partner demo prep for Zoholics", "", "Risk: Timeline tight for April release"];
  const run = () => {
    setBusy(true); setLines([]);
    out.forEach((l, i) => setTimeout(() => { setLines(p => [...p, l]); if (i === out.length - 1) setBusy(false); }, (i + 1) * 180));
  };
  return (
    <DemoWrap>
      <button onClick={run} disabled={busy} style={btnStyle(C.cyan, busy)} className="glow-btn">
        {busy ? "Generating..." : "▶ Process Sample Meeting"}
      </button>
      {lines.length > 0 && (
        <div style={{ background: C.white, borderRadius: 10, padding: 18, fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12, lineHeight: 1.9, marginTop: 14, border: `1px solid ${C.border}` }}>
          {lines.map((l, i) => <div key={i} style={{ color: l.startsWith("Key") || l.startsWith("Action") || l.startsWith("Risk") ? C.accent : C.textSecondary }}>{l || "\u00A0"}</div>)}
        </div>
      )}
    </DemoWrap>
  );
}

function CTAAgentDemo() {
  const [stage, setStage] = useState(0);
  const steps = [
    { label: "Uploading Recording", icon: "🎙️" },
    { label: "Transcribing", icon: "📝" },
    { label: "Summarizing", icon: "📋" },
    { label: "Extracting Actions", icon: "🎯" },
    { label: "Scoring ICP", icon: "📊" },
    { label: "Pushing to CRM", icon: "🔗" },
  ];
  const run = () => {
    setStage(0);
    let s = 0;
    const tick = () => { s++; setStage(s); if (s < 6) setTimeout(tick, 900); else setTimeout(() => setStage(7), 500); };
    setTimeout(tick, 300);
  };

  const transcript = '[00:00] Rep: "Hi Sarah, following up on the Zoho CRM implementation proposal."\n[00:12] Client: "We\'ve reviewed it. Team is interested but concerned about data migration."\n[00:28] Rep: "We have a dedicated migration module that handles that seamlessly."\n[01:45] Client: "We\'d need a timeline and a 10-user pilot first."\n[02:10] Rep: "I\'ll send a pilot proposal by end of week."\n[02:22] Client: "Also need an ROI breakdown for CFO approval."';

  const summary = 'Sales follow-up with Sarah (NovaTech Solutions) re: Zoho CRM implementation. Client interested, raised data migration concerns. Requested 10-user pilot and ROI breakdown for CFO budget approval. Rep to send pilot proposal by EOW.';
  const actions = [
    { a: "Send pilot proposal (10 users)", o: "Rep", p: "High", d: "This Friday" },
    { a: "Prepare ROI breakdown for CFO", o: "Rep", p: "High", d: "Next Tuesday" },
    { a: "Schedule technical call — data migration", o: "Solutions", p: "Medium", d: "Next week" },
    { a: "Follow up on budget approval", o: "Rep", p: "Medium", d: "In 2 weeks" },
  ];
  const icp = {
    score: 82, items: [
      { f: "Company Size", s: 90 }, { f: "Budget Authority", s: 70 }, { f: "Need Urgency", s: 85 }, { f: "Tech Fit", s: 80 }, { f: "Timeline", s: 75 },
    ]
  };

  return (
    <DemoWrap>
      <button onClick={run} disabled={stage > 0 && stage < 7} style={btnStyle(C.pink, stage > 0 && stage < 7)} className="glow-btn">
        {stage === 0 ? "▶ Process Sample Call" : stage < 7 ? "Processing..." : "▶ Run Again"}
      </button>
      {stage > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {steps.map((s, i) => (
              <span key={i} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, border: `1px solid ${stage > i ? C.accent : C.border}`, color: stage > i ? C.accent : C.textMuted, background: stage > i ? C.accentGlow : C.white, fontWeight: stage > i ? 600 : 400, transition: "all 0.3s" }}>
                {s.icon} {s.label} {stage > i ? "✓" : ""}
              </span>
            ))}
          </div>
          {stage >= 2 && <ResultBlock title="Transcript" content={
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.7, color: C.textSecondary }}>{transcript}</pre>
          } />}
          {stage >= 3 && <ResultBlock title="AI Summary" content={
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: C.textSecondary }}>{summary}</p>
          } />}
          {stage >= 4 && (
            <ResultBlock title="Call-to-Actions" content={
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Action", "Owner", "Priority", "Due"].map(h => <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.textMuted, fontWeight: 600, fontSize: 11 }}>{h}</th>)}
                </tr></thead>
                <tbody>{actions.map((a, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                    <td style={{ padding: "8px 10px", color: C.text }}>{a.a}</td>
                    <td style={{ padding: "8px 10px", color: C.textSecondary }}>{a.o}</td>
                    <td style={{ padding: "8px 10px" }}><span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: a.p === "High" ? C.redBg : C.orangeBg, color: a.p === "High" ? C.red : C.orange }}>{a.p}</span></td>
                    <td style={{ padding: "8px 10px", color: C.textSecondary }}>{a.d}</td>
                  </tr>
                ))}</tbody>
              </table>
            } />
          )}
          {stage >= 5 && (
            <ResultBlock title={`ICP Score — ${icp.score}/100`} content={
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {icp.items.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 110, fontSize: 12, color: C.textMuted }}>{b.f}</span>
                    <div style={{ flex: 1, height: 5, background: C.borderLight, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${b.s}%`, background: C.gradient, borderRadius: 3, transition: "width 0.6s ease" }} />
                    </div>
                    <span style={{ width: 28, fontSize: 11, color: C.text, fontWeight: 600, textAlign: "right" }}>{b.s}</span>
                  </div>
                ))}
              </div>
            } />
          )}
          {stage >= 6 && (
            <div style={{ marginTop: 12, padding: 16, background: C.greenBg, borderRadius: 12, border: `1px solid rgba(5,150,105,0.15)` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 4 }}>✓ Pushed to CRM Notes</div>
              <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>
                Module: Leads → NovaTech Solutions (Sarah)<br />
                Transcript, summary, 4 actions, ICP score (82) synced to notes.
              </div>
            </div>
          )}
        </div>
      )}
    </DemoWrap>
  );
}

function FollowUpDemo() {
  const [stage, setStage] = useState(0);
  const run = () => {
    setStage(0);
    let s = 0;
    const tick = () => { s++; setStage(s); if (s < 4) setTimeout(tick, 800); };
    setTimeout(tick, 300);
  };

  const pastConvo = [
    { date: "Mar 5", type: "Email", summary: "Sent Zoho CRM pilot proposal to Sarah (NovaTech). 10-user plan, $4,800/yr." },
    { date: "Mar 7", type: "Call", summary: "Sarah confirmed internal review underway. CFO wants ROI doc." },
    { date: "Mar 10", type: "Email", summary: "Sent ROI breakdown document. Sarah said she'd share with CFO by Wed." },
  ];

  const draftEmail = 'Subject: Following up — NovaTech pilot & ROI review\n\nHi Sarah,\n\nHope you\'re doing well. I wanted to check in on the ROI document I sent over on Monday — were you able to share it with your CFO as planned?\n\nHappy to jump on a quick call if there are any questions from the finance team, or if it would help to walk through the numbers together.\n\nAlso, just a heads up — we have a few pilot slots opening up in April, so if timing works on your end, we can get NovaTech onboarded quickly.\n\nLooking forward to hearing from you.\n\nBest,\n[Rep Name]';

  return (
    <DemoWrap>
      <button onClick={run} disabled={stage > 0 && stage < 4} style={btnStyle(C.orange, stage > 0 && stage < 4)} className="glow-btn">
        {stage === 0 ? "▶ Analyze Past Conversations" : stage < 4 ? "Analyzing..." : "▶ Run Again"}
      </button>
      {stage >= 1 && (
        <div style={{ marginTop: 16 }}>
          <ResultBlock title="Past Conversation Timeline" content={
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {pastConvo.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 52, fontSize: 11, color: C.textMuted, paddingTop: 2 }}>{c.date}</div>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: c.type === "Call" ? C.orangeBg : C.blueBg, color: c.type === "Call" ? C.orange : C.blue, fontWeight: 600 }}>{c.type}</span>
                  <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.5 }}>{c.summary}</div>
                </div>
              ))}
            </div>
          } />
        </div>
      )}
      {stage >= 2 && (
        <div style={{ marginTop: 12, padding: 16, background: C.orangeBg, borderRadius: 12, border: "1px solid rgba(217,119,6,0.15)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.orange, marginBottom: 4 }}>⏰ Follow-Up Reminder Triggered</div>
          <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>
            It's been 3 days since the ROI doc was sent. Sarah committed to sharing with CFO by Wednesday — no response yet. Recommended action: <strong style={{ color: C.text }}>gentle follow-up email</strong>.
          </div>
        </div>
      )}
      {stage >= 3 && (
        <ResultBlock title="AI-Drafted Follow-Up Email" content={
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.7, color: C.textSecondary, fontFamily: "inherit" }}>{draftEmail}</pre>
        } />
      )}
      {stage >= 4 && (
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="glow-btn" style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: C.accent, color: C.white, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Approve & Send</button>
          <button style={{ padding: "9px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: C.text, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Edit Draft</button>
          <button style={{ padding: "9px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: C.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Snooze 1 Day</button>
        </div>
      )}
    </DemoWrap>
  );
}

function CEODashboardDemo() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 400); }, []);
  const kpis = [
    { l: "Revenue (MTD)", v: "$1.24M", ch: "+12.4%", up: true },
    { l: "Active Deals", v: "47", ch: "+8", up: true },
    { l: "Customer NPS", v: "72", ch: "+3", up: true },
    { l: "Burn Rate", v: "$89K", ch: "-5.2%", up: true },
  ];
  const bars = [62, 78, 45, 88, 95, 72, 84];
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  return (
    <DemoWrap>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 16 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: C.white, borderRadius: 12, padding: 16, border: `1px solid ${C.border}`, opacity: loaded ? 1 : 0, transition: `all 0.5s ${i * 0.12}s`, transform: loaded ? "translateY(0)" : "translateY(10px)", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 11, color: C.textMuted }}>{k.l}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 4 }}>{k.v}</div>
            <div style={{ fontSize: 12, color: k.up ? C.green : C.pink, marginTop: 4, fontWeight: 500 }}>{k.ch}</div>
          </div>
        ))}
      </div>
      <div style={{ background: C.white, borderRadius: 12, padding: 18, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Revenue Trend</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", height: loaded ? h : 0, background: C.gradient, borderRadius: 4, transition: `height 0.6s ${i * 0.08}s ease-out`, opacity: 0.85 }} />
              <span style={{ fontSize: 10, color: C.textMuted }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12, padding: "12px 16px", background: C.accentGlow, borderRadius: 12, border: `1px solid rgba(79,70,229,0.12)` }}>
        <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>✨ AI Insight: </span>
        <span style={{ fontSize: 13, color: C.textSecondary }}>Revenue trending 18% above forecast. Consider accelerating Q2 hiring.</span>
      </div>
    </DemoWrap>
  );
}

// ─── Shared Components ───

function DemoWrap({ children }) {
  return <div style={{ background: C.bgSoft, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>{children}</div>;
}

function ResultBlock({ title, content }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{title}</div>
      <div style={{ background: C.white, borderRadius: 10, padding: 16, border: `1px solid ${C.border}`, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>{content}</div>
    </div>
  );
}

function Fl({ l, v, c }) {
  return <div style={{ minWidth: 130 }}><div style={{ fontSize: 11, color: C.textMuted, marginBottom: 2 }}>{l}</div><div style={{ fontSize: 13, color: c || C.text, fontWeight: 500 }}>{v}</div></div>;
}

const inputStyle = { flex: 1, padding: "12px 16px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.white, color: C.text, fontSize: 15, outline: "none", transition: "border-color 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" };
const btnStyle = (color, disabled) => ({ padding: "12px 24px", borderRadius: 10, border: "none", background: disabled ? "#d1d5db" : color, color: C.white, fontWeight: 600, cursor: disabled ? "default" : "pointer", fontSize: 15, whiteSpace: "nowrap", opacity: disabled ? 0.6 : 1 });

// ─── Pages ───

function HomePage({ navigate }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "120px 40px 100px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Ambient glow orbs */}
        <div style={{ position: "absolute", top: "-10%", left: "15%", width: 400, height: 400, background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "0%", right: "10%", width: 350, height: 350, background: "radial-gradient(circle, rgba(219,39,119,0.06) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

        <p style={{ fontSize: 14, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600, position: "relative" }}>The AI arm of Spikra</p>
        <h1 style={{ fontSize: "clamp(36px,5.5vw,60px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 24px", position: "relative" }}>
          <span className="gradient-text">AI products that</span><br />
          <span style={{ color: C.text }}>actually work.</span>
        </h1>
        <p style={{ fontSize: 19, color: C.textSecondary, lineHeight: 1.7, margin: "0 0 40px", position: "relative" }}>
          Purpose-built solutions for lead management, meeting intelligence, call analytics, follow-up automation, and executive decision-making.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <button onClick={() => navigate("lead-enrichment")} className="glow-btn" style={{ padding: "16px 36px", borderRadius: 12, border: "none", background: C.gradient, color: C.white, fontWeight: 700, fontSize: 16, cursor: "pointer", backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite" }}>
            Explore Products →
          </button>
          <a href="mailto:team@briha.ai" style={{ padding: "16px 36px", borderRadius: 12, border: `1px solid ${C.border}`, color: C.text, fontWeight: 500, fontSize: 16, textDecoration: "none", transition: "all 0.3s", background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>Contact Us</a>
        </div>
      </section>

      {/* Product List */}
      <section style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
          {products.map((p, i) => (
            <div key={p.id} onClick={() => navigate(p.id)} className="product-row"
              style={{ display: "flex", alignItems: "center", padding: "28px 32px", cursor: "pointer", background: C.white, borderBottom: i < products.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.color, marginRight: 28, fontFamily: "monospace", background: p.colorBg, padding: "6px 10px", borderRadius: 8 }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: C.text }}>{p.name}</div>
                <div style={{ fontSize: 15, color: C.textSecondary, marginTop: 4 }}>{p.tagline}</div>
              </div>
              <span style={{ fontSize: 16, color: C.textMuted, transition: "transform 0.2s" }}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* USP Grid */}
      <section style={{ padding: "40px 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, textAlign: "center" }}>
          {[
            { n: "Production-Ready", d: "Real products, real businesses, real results.", icon: "🚀" },
            { n: "Zoho-Native", d: "Deep integrations by a Zoho Premium Partner.", icon: "🔗" },
            { n: "Enterprise Secure", d: "Your data stays yours. Zero leakage.", icon: "🛡️" },
            { n: "Results-Driven", d: "Measurable ROI from day one.", icon: "📈" },
          ].map((x, i) => (
            <div key={i} className="card-lift" style={{ padding: "32px 24px" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{x.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 8 }}>{x.n}</div>
              <div style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      <CTABlock />
    </div>
  );
}

function ProductPage({ product, navigate }) {
  const demos = { "lead-enrichment": LeadEnrichmentDemo, "mom-generator": MoMDemo, "cta-agent": CTAAgentDemo, "follow-up-email": FollowUpDemo, "ceo-dashboard": CEODashboardDemo };
  const Demo = demos[product.id];
  const idx = products.findIndex(p => p.id === product.id);
  const prev = idx > 0 ? products[idx - 1] : null;
  const next = idx < products.length - 1 ? products[idx + 1] : null;

  const pipelineSteps = {
    "cta-agent": [
      { icon: "🎙️", l: "Call Recording", d: "Upload or auto-capture" },
      { icon: "📝", l: "Transcription", d: "Audio to text with speakers" },
      { icon: "📋", l: "Summary", d: "Key points extracted" },
      { icon: "🎯", l: "Actions", d: "Items with owners & dates" },
      { icon: "📊", l: "ICP Score", d: "Lead scored against profile" },
      { icon: "🔗", l: "CRM Push", d: "Synced to CRM notes" },
    ],
    "follow-up-email": [
      { icon: "📂", l: "Past Conversations", d: "Emails, calls, meetings scanned" },
      { icon: "🧠", l: "Context Analysis", d: "AI understands full history" },
      { icon: "⏰", l: "Reminder Trigger", d: "Detects when follow-up is due" },
      { icon: "✉️", l: "Draft Email", d: "Personalized email written" },
      { icon: "✅", l: "Review & Send", d: "Approve, edit, or snooze" },
    ],
  };

  const pipeline = pipelineSteps[product.id];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px 80px" }}>
      <button onClick={() => navigate("home")} className="nav-link" style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 15, marginBottom: 40, padding: "4px 8px", borderRadius: 6 }}>← All products</button>

      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: product.color, fontFamily: "monospace", background: product.colorBg, padding: "6px 12px", borderRadius: 8, display: "inline-block", marginBottom: 12 }}>{product.icon}</span>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: C.text, margin: "8px 0", lineHeight: 1.2 }}>{product.name}</h1>
        <p style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.7, maxWidth: 700 }}>{product.description}</p>
      </div>

      {pipeline && (
        <div style={{ marginBottom: 40, padding: 28, background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 18 }}>How It Works</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {pipeline.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span style={{ color: C.textMuted, fontSize: 14, margin: "0 2px" }}>→</span>}
                <div style={{ textAlign: "center", padding: "10px 14px", background: C.bgSoft, borderRadius: 12, border: `1px solid ${C.border}`, minWidth: 95 }}>
                  <div style={{ fontSize: 20 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginTop: 4 }}>{s.l}</div>
                  <div style={{ fontSize: 10, color: C.textMuted }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 40 }}>
        {product.metrics.map((m, i) => (
          <div key={i} className="card-lift" style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 800, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{m.v}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>{m.l}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>Try It Out</h2>
        {Demo && <Demo />}
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>Demo Video</h2>
        <div className="card-lift" style={{ aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: 20, animation: "pulse-glow 2s infinite" }}>▶</div>
          <p style={{ color: C.textMuted, fontSize: 14 }}>Video coming soon</p>
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 10 }}>
          {product.features.map((f, i) => (
            <div key={i} className="feature-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
              <span style={{ color: product.color, fontSize: 10 }}>●</span>
              <span style={{ fontSize: 15, color: C.textSecondary }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 14, marginBottom: 48 }}>
        {prev ? (
          <button onClick={() => navigate(prev.id)} className="card-lift" style={{ flex: 1, padding: 20, cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: 11, color: C.textMuted }}>← Previous</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginTop: 4 }}>{prev.name}</div>
          </button>
        ) : <div style={{ flex: 1 }} />}
        {next ? (
          <button onClick={() => navigate(next.id)} className="card-lift" style={{ flex: 1, padding: 20, cursor: "pointer", textAlign: "right" }}>
            <div style={{ fontSize: 11, color: C.textMuted }}>Next →</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginTop: 4 }}>{next.name}</div>
          </button>
        ) : <div style={{ flex: 1 }} />}
      </div>

      <CTABlock />
    </div>
  );
}

function CTABlock() {
  return (
    <section style={{ padding: "40px 20px 60px", textAlign: "center" }}>
      <div style={{ maxWidth: 580, margin: "0 auto", padding: "56px 44px", borderRadius: 20, background: C.gradientSoft, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", boxShadow: "0 4px 24px rgba(79,70,229,0.06)" }}>
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 12, position: "relative" }}>Ready to get started?</h2>
        <p style={{ color: C.textSecondary, fontSize: 16, marginBottom: 32, lineHeight: 1.6, position: "relative" }}>Let's discuss how Briha.ai can transform your business.</p>
        <a href="mailto:team@briha.ai" className="glow-btn" style={{ display: "inline-block", padding: "16px 40px", borderRadius: 12, background: C.gradient, color: C.white, fontWeight: 700, fontSize: 16, textDecoration: "none", backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite", position: "relative" }}>
          Contact Us — team@briha.ai
        </a>
      </div>
    </section>
  );
}

function Navbar({ page, navigate }) {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,251,255,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <span className="gradient-text" style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>briha.ai</span>
          <span style={{ fontSize: 11, color: C.textMuted, border: `1px solid ${C.border}`, padding: "3px 10px", borderRadius: 6 }}>by Spikra</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {products.map(p => (
            <button key={p.id} onClick={() => navigate(p.id)} className="nav-link"
              style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: page === p.id ? C.accentGlow : "transparent", color: page === p.id ? C.accent : C.textMuted, fontSize: 13, cursor: "pointer", fontWeight: page === p.id ? 600 : 400, whiteSpace: "nowrap" }}>
              {p.name}
            </button>
          ))}
          <a href="mailto:team@briha.ai" className="glow-btn" style={{ marginLeft: 8, padding: "8px 18px", borderRadius: 8, background: C.accent, color: C.white, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 20px", textAlign: "center", background: C.white }}>
      <span className="gradient-text" style={{ fontSize: 18, fontWeight: 800 }}>briha.ai</span>
      <p style={{ color: C.textSecondary, fontSize: 14, margin: "10px 0 4px" }}>The AI product arm of Spikra — Zoho Premium Partner</p>
      <p style={{ color: C.textMuted, fontSize: 13 }}>© 2026 Spikra Pvt Ltd</p>
      <a href="mailto:team@briha.ai" style={{ color: C.accent, fontSize: 14, marginTop: 8, display: "inline-block", textDecoration: "none" }}>team@briha.ai</a>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const navigate = t => { setPage(t); window.scrollTo(0, 0); };
  const cur = products.find(p => p.id === page);
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh" }}>
      <Navbar page={page} navigate={navigate} />
      {page === "home" ? <HomePage navigate={navigate} /> : cur ? <ProductPage product={cur} navigate={navigate} /> : null}
      <Footer />
    </div>
  );
}