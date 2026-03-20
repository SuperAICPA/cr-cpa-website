import { useState, useEffect, useRef, useCallback } from "react";

const translations = {
  en: {
    nav: { home: "Home", services: "Services", about: "About", contact: "Contact" },
    hero: {
      tagline: "Precision. Integrity. Growth.",
      subtitle: "Trusted CPA & Consulting Services for Discerning Clients",
      cta: "Schedule a Consultation",
      ctaSecondary: "Our Services"
    },
    stats: [
      { number: "25+", label: "Years of Experience" },
      { number: "500+", label: "Clients Served" },
      { number: "98%", label: "Client Retention" },
      { number: "$50M+", label: "Tax Savings Delivered" }
    ],
    services: {
      title: "Our Services",
      subtitle: "Comprehensive financial solutions tailored to your success",
      items: [
        {
          title: "Tax Preparation & Planning",
          desc: "Strategic tax planning and compliance for individuals and businesses. We minimize your tax liability while ensuring full regulatory compliance across all 50 states.",
          icon: "📊",
          features: ["Individual & Business Returns", "Multi-State Compliance", "IRS Representation", "Tax Strategy & Planning"]
        },
        {
          title: "Bookkeeping & Accounting",
          desc: "Meticulous financial record-keeping that gives you a clear picture of your business health. Real-time reporting and analysis for informed decision-making.",
          icon: "📒",
          features: ["Monthly Financial Statements", "Accounts Payable/Receivable", "Bank Reconciliation", "Financial Analysis"]
        },
        {
          title: "Business Consulting",
          desc: "Strategic advisory services to help you scale, optimize, and protect your business. From entity structuring to growth strategy, we're your trusted partner.",
          icon: "💼",
          features: ["Entity Structuring", "Business Valuations", "Growth Strategy", "SBA Loan Advisory"]
        },
        {
          title: "Payroll Management",
          desc: "Complete payroll solutions from processing to compliance. We handle the complexity so you can focus on growing your business.",
          icon: "💰",
          features: ["Payroll Processing", "1099 & W-2 Management", "Employment Tax Filing", "Workers' Comp Compliance"]
        }
      ]
    },
    about: {
      title: "About Our Firm",
      subtitle: "A Modern CPA Practice Built on Trust and Innovation",
      bio: "Danny Kim, CPA brings over 25 years of experience serving individuals and businesses across diverse industries. Our firm combines deep expertise in tax, accounting, and business advisory with cutting-edge technology to deliver exceptional results.",
      bio2: "We specialize in serving small to mid-sized businesses and high-net-worth individuals, providing personalized attention that larger firms simply cannot match. Our AI-enhanced workflows ensure accuracy and efficiency while our hands-on approach guarantees the personal touch you deserve.",
      values: [
        { title: "Precision", desc: "Every number tells a story. We ensure yours is accurate." },
        { title: "Integrity", desc: "Your trust is our most valuable asset." },
        { title: "Innovation", desc: "Leveraging technology for superior results." },
        { title: "Growth", desc: "Your success is our measure of achievement." }
      ],
      credentials: "Licensed CPA · Los Angeles, California"
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to take control of your financial future?",
      info: {
        address: "611 S Catalina St, Unit #216\nLos Angeles, CA 90005",
        phone: "213-325-9800",
        email: "info.dkcpa@gmail.com",
        hours: "Mon – Fri: 9:00 AM – 6:00 PM\nSat: By Appointment"
      },
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        service: "Service Interested In",
        serviceOptions: ["Tax Preparation", "Bookkeeping", "Business Consulting", "Payroll", "Other"],
        message: "Tell us about your needs",
        submit: "Request Consultation",
        success: "Thank you! We'll be in touch within 24 hours."
      }
    },
    footer: {
      tagline: "Your Trusted Financial Partner",
      rights: "© 2025 CR Accountancy and Consulting. All rights reserved.",
      disclaimer: "Danny Kim, CPA · Licensed in the State of California"
    }
  },
  ko: {
    nav: { home: "홈", services: "서비스", about: "소개", contact: "연락처" },
    hero: {
      tagline: "정확함. 신뢰. 성장.",
      subtitle: "신뢰할 수 있는 CPA & 컨설팅 서비스",
      cta: "상담 예약하기",
      ctaSecondary: "서비스 보기"
    },
    stats: [
      { number: "25+", label: "년 경력" },
      { number: "500+", label: "고객 서비스" },
      { number: "98%", label: "고객 유지율" },
      { number: "$50M+", label: "절세 실적" }
    ],
    services: {
      title: "서비스 안내",
      subtitle: "고객의 성공을 위한 종합 재무 솔루션",
      items: [
        {
          title: "세금 신고 및 절세 전략",
          desc: "개인 및 법인을 위한 전략적 세금 계획과 신고 서비스. 모든 주(州)에 걸친 규정 준수와 함께 세금 부담을 최소화합니다.",
          icon: "📊",
          features: ["개인 및 법인 세금 신고", "다주(多州) 세금 관리", "IRS 대리 서비스", "절세 전략 수립"]
        },
        {
          title: "부기 및 회계 서비스",
          desc: "꼼꼼한 재무 기록 관리로 사업의 건강 상태를 명확히 파악합니다. 실시간 리포팅과 분석으로 현명한 의사결정을 지원합니다.",
          icon: "📒",
          features: ["월간 재무제표 작성", "매출/매입 관리", "은행 계좌 대사", "재무 분석"]
        },
        {
          title: "비즈니스 컨설팅",
          desc: "사업 확장, 최적화, 보호를 위한 전략적 자문 서비스. 법인 설립부터 성장 전략까지 신뢰할 수 있는 파트너가 되겠습니다.",
          icon: "💼",
          features: ["법인 설립 및 구조화", "기업 가치 평가", "성장 전략 수립", "SBA 대출 자문"]
        },
        {
          title: "급여 관리 서비스",
          desc: "급여 처리부터 규정 준수까지 완벽한 급여 솔루션을 제공합니다. 복잡한 업무는 저희에게 맡기고 사업 성장에 집중하세요.",
          icon: "💰",
          features: ["급여 처리", "1099 및 W-2 관리", "고용세 신고", "산재보험 관리"]
        }
      ]
    },
    about: {
      title: "사무실 소개",
      subtitle: "신뢰와 혁신을 기반으로 한 현대적 CPA 사무실",
      bio: "Danny Kim, CPA는 25년 이상의 경력으로 다양한 산업의 개인 및 기업 고객에게 서비스를 제공하고 있습니다. 세무, 회계, 경영 자문 분야의 깊은 전문성에 최첨단 기술을 결합하여 탁월한 결과를 제공합니다.",
      bio2: "중소기업 및 고소득 개인 고객을 전문적으로 서비스하며, 대형 회계법인이 제공할 수 없는 맞춤형 관심을 드립니다. AI 기반 워크플로우로 정확성과 효율성을 보장하면서도 고객 한 분 한 분을 직접 케어합니다.",
      values: [
        { title: "정확함", desc: "모든 숫자에는 이야기가 있습니다. 정확하게 전달합니다." },
        { title: "신뢰", desc: "고객의 신뢰가 가장 소중한 자산입니다." },
        { title: "혁신", desc: "기술을 활용하여 더 나은 결과를 만듭니다." },
        { title: "성장", desc: "고객의 성공이 저희의 성과입니다." }
      ],
      credentials: "공인회계사(CPA) · 캘리포니아 로스앤젤레스"
    },
    contact: {
      title: "문의하기",
      subtitle: "재무 관리의 새로운 시작을 준비하세요",
      info: {
        address: "611 S Catalina St, Unit #216\nLos Angeles, CA 90005",
        phone: "213-325-9800",
        email: "info.dkcpa@gmail.com",
        hours: "월 – 금: 오전 9시 – 오후 6시\n토요일: 예약제"
      },
      form: {
        name: "성함",
        email: "이메일 주소",
        phone: "전화번호",
        service: "관심 서비스",
        serviceOptions: ["세금 신고", "부기/회계", "비즈니스 컨설팅", "급여 관리", "기타"],
        message: "문의 내용을 입력해 주세요",
        submit: "상담 신청하기",
        success: "감사합니다! 24시간 이내에 연락드리겠습니다."
      }
    },
    footer: {
      tagline: "신뢰할 수 있는 재무 파트너",
      rights: "© 2025 CR Accountancy and Consulting. All rights reserved.",
      disclaimer: "Danny Kim, CPA · 캘리포니아 공인회계사"
    }
  }
};

// ============================================================
// AI CPA CHATBOT COMPONENT
// ============================================================
const CHAT_SYSTEM = `You are an AI assistant for CR Accountancy & Consulting (Danny Kim, CPA), a licensed CPA firm in Los Angeles, CA.

RULES:
1. Provide GENERAL TAX INFORMATION only - never specific tax advice. Include disclaimer that personalized advice requires CPA review.
2. Detect the user's language automatically and respond in the same language.
3. Support: English, 한국어, Español, 中文, Tiếng Việt, 日本語, Tagalog, हिन्दी, العربية, Français.
4. Be warm, professional, helpful. Represent a premium CPA firm.

FIRM INFO:
- Danny Kim, CPA - Licensed in California, 25+ years experience
- Services: Tax Preparation, Bookkeeping, Business Consulting, Payroll, Forensic Accounting, Litigation Support, Business Valuations
- Specialties: Korean-speaking clients, immigrant tax (FBAR/FATCA), multi-state, LLC/S-Corp setup
- Location: 611 S Catalina St #216, Los Angeles, CA 90005 (Koreatown)
- Phone: 213-325-9800 | Email: info.dkcpa@gmail.com | Hours: Mon-Fri 9-6, Sat by appt

SERVICE PRICING:
- Individual Tax Return (1040): from $199
- Business Tax Return: from $499
- Bookkeeping: from $299/mo
- Business Formation: from $599
- Payroll: from $199/mo
- FBAR/FATCA: from $199
- Tax Planning Session: $299
- Forensic Accounting: Custom

GOALS: Greet warmly, identify needs, ask relevant questions, provide general info, recommend services, offer to schedule consultation.
DISCLAIMER (in user's language): "This is general guidance only, not professional tax advice. Personalized advice requires CPA review."
Keep responses under 200 words. Be conversational.`;

function AIChatbot({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLang, setChatLang] = useState(lang || "en");
  const [showQA, setShowQA] = useState(true);
  const [pulse, setPulse] = useState(true);
  const endRef = useRef(null);
  const inRef = useRef(null);
  const convRef = useRef([]);

  const greets = {
    en: "Hello! I'm the AI assistant for CR Accountancy & Consulting. How can I help you today? Feel free to ask in any language!",
    ko: "안녕하세요! CR Accountancy & Consulting의 AI 어시스턴트입니다. 세금 신고, 법인 설립 등 무엇이든 도와드리겠습니다!",
    es: "¡Hola! Soy el asistente de IA de CR Accountancy & Consulting. ¿En qué puedo ayudarle?",
    zh: "您好！我是CR Accountancy & Consulting的AI助手。请随时提问！",
  };
  const qas = {
    en: [{ l: "Tax Filing", m: "I need help with my tax return." }, { l: "Business Setup", m: "I want to set up an LLC." }, { l: "Bookkeeping", m: "I need bookkeeping services." }, { l: "FBAR/FATCA", m: "I have foreign accounts, need FBAR help." }],
    ko: [{ l: "세금 신고", m: "세금 신고 도움이 필요합니다." }, { l: "법인 설립", m: "LLC 설립을 하고 싶습니다." }, { l: "부기 정리", m: "부기 서비스가 필요합니다." }, { l: "해외 계좌", m: "FBAR 신고 도움이 필요합니다." }],
    es: [{ l: "Impuestos", m: "Necesito ayuda con impuestos." }, { l: "Negocio", m: "Quiero establecer una LLC." }, { l: "Contabilidad", m: "Necesito contabilidad." }, { l: "FBAR", m: "Tengo cuentas extranjeras." }],
    zh: [{ l: "报税", m: "我需要报税帮助。" }, { l: "开公司", m: "我想注册LLC。" }, { l: "记账", m: "需要记账服务。" }, { l: "海外账户", m: "需要FBAR帮助。" }],
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { if (isOpen && msgs.length === 0) setMsgs([{ role: "assistant", content: greets[chatLang] || greets.en }]); if (isOpen) { setPulse(false); setTimeout(() => inRef.current?.focus(), 300); } }, [isOpen]);
  useEffect(() => { setChatLang(lang === "ko" ? "ko" : "en"); }, [lang]);

  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return;
    const um = { role: "user", content: text.trim() };
    setMsgs(p => [...p, um]); setInput(""); setShowQA(false); setLoading(true);
    convRef.current = [...convRef.current, um];
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: CHAT_SYSTEM, messages: convRef.current }),
      });
      const d = await r.json();
      const t = d.content?.filter(c => c.type === "text").map(c => c.text).join("\n") || "Please call us at 213-325-9800.";
      const am = { role: "assistant", content: t };
      convRef.current = [...convRef.current, am]; setMsgs(p => [...p, am]);
    } catch { setMsgs(p => [...p, { role: "assistant", content: chatLang === "ko" ? "죄송합니다. 전화(213-325-9800)로 문의해 주세요." : "Please call us at 213-325-9800." }]); }
    setLoading(false);
  }, [loading, chatLang]);

  const cBg = "#F8F6F3";
  const lFlags = { en: "🇺🇸", ko: "🇰🇷", es: "🇲🇽", zh: "🇨🇳" };

  return (<>
    <style>{`@keyframes cFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes cBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}@keyframes cPulse{0%,100%{transform:scale(1);box-shadow:0 4px 24px rgba(184,146,106,0.4)}50%{transform:scale(1.08);box-shadow:0 4px 32px rgba(184,146,106,0.6)}}@keyframes cSlide{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
    <button onClick={() => setIsOpen(!isOpen)} style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, width: 64, height: 64, borderRadius: "50%", background: isOpen ? "#0A1628" : "linear-gradient(135deg, #B8926A, #D4B896)", border: "none", cursor: "pointer", boxShadow: `0 4px 24px ${isOpen ? "rgba(10,22,40,0.4)" : "rgba(184,146,106,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", animation: pulse ? "cPulse 2s ease-in-out infinite" : "none" }}>
      <span style={{ fontSize: 28, color: isOpen ? "#fff" : "#060F1F", lineHeight: 1 }}>{isOpen ? "✕" : "💬"}</span>
    </button>
    {isOpen && (
      <div style={{ position: "fixed", bottom: 100, right: 24, zIndex: 9998, width: 400, maxWidth: "calc(100vw - 48px)", height: 580, maxHeight: "calc(100vh - 140px)", borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", background: cBg, animation: "cSlide 0.3s ease" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0A1628, #1B4F8A)", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #B8926A, #D4B896)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#060F1F" }}>CR</div>
            <div><div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>CR AI Assistant</div><div style={{ fontSize: 11, color: "#D4B896cc" }}>Danny Kim, CPA</div></div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {Object.entries(lFlags).map(([l, f]) => (
              <button key={l} onClick={() => { setChatLang(l); if (msgs.length <= 1) { setMsgs([{ role: "assistant", content: greets[l] || greets.en }]); convRef.current = []; } }} style={{ background: chatLang === l ? "#B8926A44" : "transparent", border: chatLang === l ? "1px solid #B8926A" : "1px solid transparent", borderRadius: 6, padding: "4px 6px", cursor: "pointer", fontSize: 16 }}>{f}</button>
            ))}
          </div>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 16, animation: "cFade 0.3s ease" }}>
              {m.role !== "user" && <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, marginRight: 10, marginTop: 4, background: "linear-gradient(135deg, #1B4F8A, #0A1628)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>CR</div>}
              <div style={{ maxWidth: "78%", padding: "14px 18px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? "linear-gradient(135deg, #1B4F8A, #0A1628)" : "#fff", color: m.role === "user" ? "#fff" : "#0A1628", fontSize: 14, lineHeight: 1.65, boxShadow: m.role === "user" ? "none" : "0 2px 8px rgba(0,0,0,0.06)", border: m.role === "user" ? "none" : "1px solid #E8E4DF", whiteSpace: "pre-wrap" }}>{m.content}</div>
            </div>
          ))}
          {loading && <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}><div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #1B4F8A, #0A1628)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>CR</div><div style={{ padding: "14px 22px", borderRadius: "18px 18px 18px 4px", background: "#fff", border: "1px solid #E8E4DF", display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8926A", animation: `cBounce 1.2s ease-in-out ${i*0.15}s infinite` }}/>)}</div></div>}
          {showQA && msgs.length <= 1 && <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>{(qas[chatLang] || qas.en).map((q, i) => <button key={i} onClick={() => send(q.m)} style={{ background: "#fff", border: "1px solid #E8E4DF", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontSize: 12, color: "#1B4F8A", fontWeight: 500, transition: "all 0.2s" }} onMouseEnter={e => { e.target.style.borderColor = "#B8926A"; e.target.style.background = "#F5F0EB"; }} onMouseLeave={e => { e.target.style.borderColor = "#E8E4DF"; e.target.style.background = "#fff"; }}>{q.l}</button>)}</div>}
          <div ref={endRef}/>
        </div>
        {/* Input */}
        <div style={{ padding: "12px 16px 16px", borderTop: "1px solid #E8E4DF", background: "#fff" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea ref={inRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }} placeholder={chatLang === "ko" ? "메시지를 입력하세요..." : chatLang === "es" ? "Escriba su mensaje..." : "Type your message..."} rows={1} style={{ flex: 1, padding: "12px 16px", border: "1px solid #E8E4DF", borderRadius: 24, fontSize: 14, color: "#0A1628", outline: "none", resize: "none", lineHeight: 1.4, maxHeight: 100 }} onFocus={e => e.target.style.borderColor = "#B8926A"} onBlur={e => e.target.style.borderColor = "#E8E4DF"}/>
            <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{ width: 44, height: 44, borderRadius: "50%", background: input.trim() && !loading ? "linear-gradient(135deg, #B8926A, #D4B896)" : "#E8E4DF", border: "none", cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 18, color: input.trim() ? "#060F1F" : "#8A95A5" }}>↑</span></button>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#8A95A5" }}>{chatLang === "ko" ? "AI 상담은 일반 정보이며, 전문 자문은 CPA 검토를 통해 제공됩니다." : "AI consultation is informational. Professional advice requires CPA review."}</div>
        </div>
      </div>
    )}
  </>);
}

// ============================================================
// CONTACT FORM - Standalone component with own state
// ============================================================
function ContactForm({ lang, t, colors, fonts }) {
  const [fd, setFd] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFd(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (fd.name && fd.email) {
      fetch("https://formspree.io/f/meerdzov", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fd),
      }).then(() => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFd({ name: "", email: "", phone: "", service: "", message: "" });
      }).catch(() => {
        alert("Failed to send. Please call 213-325-9800.");
      });
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", border: `1px solid ${colors.lightGray}`,
    borderRadius: 4, fontSize: 15, fontFamily: fonts.sans, color: colors.navy,
    outline: "none", transition: "border-color 0.3s", boxSizing: "border-box"
  };

  return (
    <div style={{ background: colors.white, padding: 48, borderRadius: 4, border: `1px solid ${colors.lightGray}`, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontFamily: fonts.display, fontSize: 24, color: colors.navy, marginBottom: 8 }}>
        {lang === "en" ? "Request a Consultation" : "상담 신청"}
      </h3>
      <p style={{ fontSize: 14, color: colors.gray, marginBottom: 32 }}>
        {lang === "en" ? "Fill out the form below and we'll get back to you within 24 hours." : "아래 양식을 작성하시면 24시간 이내에 연락드리겠습니다."}
      </p>

      {submitted && (
        <div style={{ background: "#E8F5E9", border: "1px solid #66BB6A", color: "#2E7D32", padding: "16px 20px", borderRadius: 4, marginBottom: 24, fontSize: 14, fontWeight: 500 }}>
          {t.contact.form.success}
        </div>
      )}

      <div style={{ display: "grid", gap: 20 }}>
        {["name", "email", "phone"].map((field) => (
          <div key={field}>
            <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: colors.gray, marginBottom: 8, fontWeight: 600 }}>
              {t.contact.form[field]}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              value={fd[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = colors.gold}
              onBlur={(e) => e.target.style.borderColor = colors.lightGray}
            />
          </div>
        ))}

        <div>
          <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: colors.gray, marginBottom: 8, fontWeight: 600 }}>
            {t.contact.form.service}
          </label>
          <select value={fd.service} onChange={(e) => handleChange("service", e.target.value)} style={{ ...inputStyle, color: fd.service ? colors.navy : colors.gray, background: colors.white }}>
            <option value="">{lang === "en" ? "Select a service" : "서비스를 선택하세요"}</option>
            {t.contact.form.serviceOptions.map((opt, i) => (<option key={i} value={opt}>{opt}</option>))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: colors.gray, marginBottom: 8, fontWeight: 600 }}>
            {t.contact.form.message}
          </label>
          <textarea value={fd.message} onChange={(e) => handleChange("message", e.target.value)} rows={5} style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => e.target.style.borderColor = colors.gold} onBlur={(e) => e.target.style.borderColor = colors.lightGray} />
        </div>

        <button onClick={handleSubmit} style={{
          background: `linear-gradient(135deg, ${colors.gold}, ${colors.lightGold})`, border: "none", color: colors.darkNavy,
          fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          padding: "18px 40px", cursor: "pointer", borderRadius: 2, marginTop: 8,
          transition: "all 0.3s ease", boxShadow: `0 4px 16px ${colors.gold}33`
        }}>
          {t.contact.form.submit}
        </button>
      </div>
    </div>
  );
}

const GoldDivider = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: "0 auto", maxWidth: 200 }}>
    <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, transparent, #B8926A)" }} />
    <div style={{ width: 6, height: 6, background: "#B8926A", transform: "rotate(45deg)" }} />
    <div style={{ height: 1, flex: 1, background: "linear-gradient(to left, transparent, #B8926A)" }} />
  </div>
);

export default function CRAccountancy() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const t = translations[lang];
  const contentRef = useRef(null);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      fetch("https://formspree.io/f/meerdzov", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(() => {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 4000);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      }).catch(() => {
        alert("Failed to send. Please call 213-325-9800.");
      });
    }
  };

  const colors = {
    navy: "#0A1628",
    darkNavy: "#060F1F",
    blue: "#1B4F8A",
    lightBlue: "#2E6AB4",
    gold: "#B8926A",
    lightGold: "#D4B896",
    cream: "#F5F0EB",
    white: "#FFFFFF",
    gray: "#8A95A5",
    lightGray: "#E8E4DF"
  };

  const fonts = {
    display: "'Playfair Display', Georgia, serif",
    body: "'Cormorant Garamond', Georgia, serif",
    sans: "'Libre Franklin', 'Helvetica Neue', sans-serif"
  };

  const baseStyles = {
    page: {
      minHeight: "100vh",
      background: colors.cream,
      fontFamily: fonts.sans,
      color: colors.navy,
      overflowX: "hidden"
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(10, 22, 40, 0.97)" : "rgba(10, 22, 40, 0.9)",
      backdropFilter: "blur(20px)",
      transition: "all 0.4s ease",
      borderBottom: scrolled ? `1px solid ${colors.gold}33` : "none"
    },
    navInner: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    section: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "100px 40px"
    }
  };

  const NavBar = () => (
    <nav style={baseStyles.nav}>
      <div style={baseStyles.navInner}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }} onClick={() => navigate("home")}>
          <img src="/cr_logo_final.png" alt="CR Innovation Logo" style={{ height: 44, borderRadius: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
          <div>
            <div style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: colors.white, letterSpacing: 1 }}>
              DANNY KIM, CPA
            </div>
            <div style={{ fontSize: 10, color: colors.gold, letterSpacing: 3, textTransform: "uppercase", marginTop: 2 }}>
              CR Accountancy & Consulting
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="desktop-nav" style={{ display: "flex", gap: 4, marginRight: 16 }}>
            {["home", "services", "about", "contact"].map((p) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                style={{
                  background: page === p ? `${colors.gold}22` : "transparent",
                  border: "none",
                  color: page === p ? colors.gold : colors.white,
                  fontFamily: fonts.sans,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  cursor: "pointer",
                  borderRadius: 4,
                  transition: "all 0.3s ease"
                }}
              >
                {t.nav[p]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setLang(lang === "en" ? "ko" : "en")}
            style={{
              background: `${colors.gold}22`,
              border: `1px solid ${colors.gold}44`,
              color: colors.gold,
              fontSize: 12,
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: 4,
              cursor: "pointer",
              letterSpacing: 1,
              fontFamily: fonts.sans
            }}
          >
            {lang === "en" ? "한국어" : "ENG"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: colors.white,
              fontSize: 24,
              cursor: "pointer",
              padding: 8
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: colors.darkNavy,
          borderTop: `1px solid ${colors.gold}33`,
          padding: "20px 40px"
        }}>
          {["home", "services", "about", "contact"].map((p) => (
            <button
              key={p}
              onClick={() => navigate(p)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                color: page === p ? colors.gold : colors.white,
                fontFamily: fonts.sans,
                fontSize: 15,
                padding: "14px 0",
                cursor: "pointer",
                letterSpacing: 1,
                textTransform: "uppercase",
                borderBottom: `1px solid ${colors.gold}11`
              }}
            >
              {t.nav[p]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(165deg, ${colors.darkNavy} 0%, ${colors.navy} 40%, ${colors.blue} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${colors.gold}08 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${colors.lightBlue}15 0%, transparent 40%)`,
          pointerEvents: "none"
        }} />
        
        {/* Decorative lines */}
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 1, height: "30%", background: `linear-gradient(to bottom, transparent, ${colors.gold}30, transparent)` }} />
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 1, height: "25%", background: `linear-gradient(to bottom, transparent, ${colors.gold}20, transparent)` }} />

        <div style={{ textAlign: "center", maxWidth: 800, padding: "0 40px", position: "relative", zIndex: 1 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 6,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 32,
            fontFamily: fonts.sans,
            fontWeight: 500
          }}>
            Danny Kim, CPA · CR Accountancy & Consulting
          </div>
          
          <h1 style={{
            fontFamily: fonts.display,
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: -1
          }}>
            {t.hero.tagline}
          </h1>

          <div style={{ margin: "32px auto", maxWidth: 200 }}>
            <GoldDivider />
          </div>

          <p style={{
            fontFamily: fonts.body,
            fontSize: "clamp(18px, 2.5vw, 24px)",
            color: `${colors.cream}cc`,
            lineHeight: 1.6,
            marginBottom: 48,
            fontWeight: 300
          }}>
            {t.hero.subtitle}
          </p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("contact")}
              style={{
                background: `linear-gradient(135deg, ${colors.gold}, ${colors.lightGold})`,
                border: "none",
                color: colors.darkNavy,
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "18px 44px",
                cursor: "pointer",
                borderRadius: 2,
                transition: "all 0.3s ease",
                boxShadow: `0 4px 24px ${colors.gold}44`
              }}
            >
              {t.hero.cta}
            </button>
            <button
              onClick={() => navigate("services")}
              style={{
                background: "transparent",
                border: `1px solid ${colors.gold}66`,
                color: colors.gold,
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "18px 44px",
                cursor: "pointer",
                borderRadius: 2,
                transition: "all 0.3s ease"
              }}
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        background: colors.white,
        borderBottom: `1px solid ${colors.lightGray}`,
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)"
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 32,
          textAlign: "center"
        }}>
          {t.stats.map((stat, i) => (
            <div key={i}>
              <div style={{
                fontFamily: fonts.display,
                fontSize: 42,
                fontWeight: 700,
                color: colors.blue,
                lineHeight: 1
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: colors.gray,
                marginTop: 8,
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Services Preview */}
      <div style={{ ...baseStyles.section, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 36, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>
            {t.services.title}
          </h2>
          <GoldDivider />
          <p style={{ fontFamily: fonts.body, fontSize: 18, color: colors.gray, marginTop: 20, maxWidth: 600, margin: "20px auto 0" }}>
            {t.services.subtitle}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {t.services.items.map((svc, i) => (
            <div
              key={i}
              style={{
                background: colors.white,
                padding: 40,
                borderRadius: 4,
                border: `1px solid ${colors.lightGray}`,
                transition: "all 0.4s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onClick={() => navigate("services")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = colors.gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = colors.lightGray;
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${colors.blue}, ${colors.gold})` }} />
              <div style={{ fontSize: 36, marginBottom: 16 }}>{svc.icon}</div>
              <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: colors.navy, marginBottom: 12 }}>
                {svc.title}
              </h3>
              <p style={{ fontSize: 14, color: colors.gray, lineHeight: 1.7 }}>
                {svc.desc.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.blue} 100%)`,
        padding: "72px 40px",
        textAlign: "center",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 50% 50%, ${colors.gold}0a 0%, transparent 70%)`,
          pointerEvents: "none"
        }} />
        <h2 style={{ fontFamily: fonts.display, fontSize: 32, color: colors.white, marginBottom: 16, position: "relative" }}>
          {lang === "en" ? "Ready to Get Started?" : "시작할 준비가 되셨나요?"}
        </h2>
        <p style={{ fontFamily: fonts.body, fontSize: 18, color: `${colors.cream}aa`, marginBottom: 32, position: "relative" }}>
          {lang === "en" ? "Schedule a free consultation today" : "지금 무료 상담을 예약하세요"}
        </p>
        <button
          onClick={() => navigate("contact")}
          style={{
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.lightGold})`,
            border: "none",
            color: colors.darkNavy,
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            padding: "18px 48px",
            cursor: "pointer",
            borderRadius: 2,
            position: "relative",
            boxShadow: `0 4px 24px ${colors.gold}33`
          }}
        >
          {t.hero.cta}
        </button>
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div>
      {/* Services Header */}
      <div style={{
        background: `linear-gradient(165deg, ${colors.darkNavy} 0%, ${colors.navy} 60%, ${colors.blue} 100%)`,
        padding: "160px 40px 80px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {lang === "en" ? "What We Do" : "서비스 안내"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.white, fontWeight: 700, marginBottom: 20 }}>
          {t.services.title}
        </h1>
        <GoldDivider />
        <p style={{ fontFamily: fonts.body, fontSize: 20, color: `${colors.cream}aa`, marginTop: 24, maxWidth: 600, margin: "24px auto 0" }}>
          {t.services.subtitle}
        </p>
      </div>

      {/* Service Details */}
      <div style={{ ...baseStyles.section, paddingTop: 80 }}>
        {t.services.items.map((svc, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              marginBottom: i < 3 ? 80 : 0,
              paddingBottom: i < 3 ? 80 : 0,
              borderBottom: i < 3 ? `1px solid ${colors.lightGray}` : "none",
              alignItems: "center"
            }}
          >
            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>{svc.icon}</div>
              <h2 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>
                {svc.title}
              </h2>
              <p style={{ fontSize: 15, color: colors.gray, lineHeight: 1.8, marginBottom: 24 }}>
                {svc.desc}
              </p>
            </div>
            <div style={{
              order: i % 2 === 0 ? 2 : 1,
              background: colors.white,
              padding: 40,
              borderRadius: 4,
              border: `1px solid ${colors.lightGray}`
            }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
                {lang === "en" ? "Key Services" : "주요 서비스"}
              </div>
              {svc.features.map((f, j) => (
                <div key={j} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: j < svc.features.length - 1 ? `1px solid ${colors.lightGray}` : "none"
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.blue}, ${colors.gold})`,
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AboutPage = () => (
    <div>
      <div style={{
        background: `linear-gradient(165deg, ${colors.darkNavy} 0%, ${colors.navy} 60%, ${colors.blue} 100%)`,
        padding: "160px 40px 80px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {lang === "en" ? "Our Story" : "사무실 소개"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.white, fontWeight: 700, marginBottom: 20 }}>
          {t.about.title}
        </h1>
        <GoldDivider />
      </div>

      <div style={baseStyles.section}>
        {/* Bio Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, marginBottom: 80, alignItems: "start" }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.navy}, ${colors.blue})`,
            padding: 48,
            borderRadius: 4,
            textAlign: "center",
            position: "sticky",
            top: 120
          }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.lightGold})`,
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontFamily: fonts.display,
              color: colors.darkNavy,
              fontWeight: 700
            }}>
              DK
            </div>
            <h3 style={{ fontFamily: fonts.display, fontSize: 24, color: colors.white, marginBottom: 8 }}>
              Danny Kim
            </h3>
            <div style={{ fontSize: 13, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
              CPA
            </div>
            <div style={{ width: 40, height: 1, background: colors.gold, margin: "0 auto 16px" }} />
            <p style={{ fontSize: 13, color: `${colors.cream}88`, lineHeight: 1.6 }}>
              {t.about.credentials}
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 28, color: colors.navy, marginBottom: 24 }}>
              {t.about.subtitle}
            </h2>
            <p style={{ fontSize: 16, color: colors.gray, lineHeight: 1.9, marginBottom: 24, fontFamily: fonts.body }}>
              {t.about.bio}
            </p>
            <p style={{ fontSize: 16, color: colors.gray, lineHeight: 1.9, marginBottom: 40, fontFamily: fonts.body }}>
              {t.about.bio2}
            </p>

            {/* Values */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {t.about.values.map((v, i) => (
                <div key={i} style={{
                  background: colors.white,
                  padding: 28,
                  borderRadius: 4,
                  border: `1px solid ${colors.lightGray}`,
                  borderTop: `3px solid ${colors.gold}`
                }}>
                  <h4 style={{ fontFamily: fonts.display, fontSize: 18, color: colors.navy, marginBottom: 8 }}>
                    {v.title}
                  </h4>
                  <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.6 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div>
      <div style={{
        background: `linear-gradient(165deg, ${colors.darkNavy} 0%, ${colors.navy} 60%, ${colors.blue} 100%)`,
        padding: "160px 40px 80px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {lang === "en" ? "Connect With Us" : "문의하기"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.white, fontWeight: 700, marginBottom: 20 }}>
          {t.contact.title}
        </h1>
        <GoldDivider />
        <p style={{ fontFamily: fonts.body, fontSize: 20, color: `${colors.cream}aa`, marginTop: 24 }}>
          {t.contact.subtitle}
        </p>
      </div>

      <div style={{ ...baseStyles.section, paddingTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "start" }}>
          {/* Contact Info */}
          <div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Office Address" : "사무실 주소"}
              </div>
              <p style={{ fontSize: 15, color: colors.navy, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {t.contact.info.address}
              </p>
            </div>

            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Phone" : "전화"}
              </div>
              <a href="tel:2133259800" style={{ fontSize: 15, color: colors.blue, textDecoration: "none", fontWeight: 600 }}>
                {t.contact.info.phone}
              </a>
            </div>

            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Email" : "이메일"}
              </div>
              <a href="mailto:info.dkcpa@gmail.com" style={{ fontSize: 15, color: colors.blue, textDecoration: "none", fontWeight: 600 }}>
                {t.contact.info.email}
              </a>
            </div>

            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Office Hours" : "영업 시간"}
              </div>
              <p style={{ fontSize: 15, color: colors.navy, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {t.contact.info.hours}
              </p>
            </div>

            {/* Map placeholder */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.navy}, ${colors.blue})`,
              padding: 32,
              borderRadius: 4,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📍</div>
              <p style={{ fontSize: 13, color: colors.cream, lineHeight: 1.6 }}>
                Koreatown, Los Angeles
              </p>
              <p style={{ fontSize: 11, color: `${colors.cream}66`, marginTop: 8 }}>
                {lang === "en" ? "Conveniently located in the heart of Koreatown" : "코리아타운 중심부에 위치"}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm lang={lang} t={t} colors={colors} fonts={fonts} />
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer style={{
      background: colors.darkNavy,
      borderTop: `1px solid ${colors.gold}22`,
      padding: "60px 40px 40px"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: fonts.display, fontSize: 20, color: colors.white, marginBottom: 8 }}>
              Danny Kim, CPA
            </div>
            <div style={{ fontSize: 11, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
              CR Accountancy & Consulting
            </div>
            <p style={{ fontSize: 13, color: `${colors.cream}66`, lineHeight: 1.7 }}>
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
              {lang === "en" ? "Quick Links" : "바로가기"}
            </div>
            {["home", "services", "about", "contact"].map((p) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  color: `${colors.cream}88`,
                  fontSize: 13,
                  padding: "6px 0",
                  cursor: "pointer",
                  fontFamily: fonts.sans,
                  textAlign: "left"
                }}
              >
                {t.nav[p]}
              </button>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
              {lang === "en" ? "Contact" : "연락처"}
            </div>
            <p style={{ fontSize: 13, color: `${colors.cream}88`, lineHeight: 2 }}>
              213-325-9800<br />
              info.dkcpa@gmail.com<br />
              611 S Catalina St #216<br />
              Los Angeles, CA 90005
            </p>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${colors.gold}15`,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12
        }}>
          <p style={{ fontSize: 11, color: `${colors.cream}44` }}>
            {t.footer.rights}
          </p>
          <p style={{ fontSize: 11, color: `${colors.cream}44` }}>
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );

  const pages = { home: <HomePage />, services: <ServicesPage />, about: <AboutPage />, contact: <ContactPage /> };

  return (
    <div style={baseStyles.page}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Cormorant+Garamond:wght@300;400;500;600&family=Libre+Franklin:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${colors.gold}44; color: ${colors.navy}; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
      
      <NavBar />
      
      <div
        ref={contentRef}
        style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
      >
        {pages[page]}
      </div>
      
      <Footer />
      <AIChatbot lang={lang} />
    </div>
  );
}
