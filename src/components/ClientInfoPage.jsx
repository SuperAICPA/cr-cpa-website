/* ============================================================
   Client info — how to start, documents, payment, letters,
   key deadlines and common questions.
   Update DEADLINES each tax season.
   ============================================================ */

const DEADLINES = [
  { date: { en: "Jan 15, 2027", ko: "2027년 1월 15일" },
    what: { en: "Fourth-quarter 2026 estimated tax payments (IRS and FTB)", ko: "2026년 4분기 예정세 납부 (IRS·FTB)" } },
  { date: { en: "Feb 1, 2027", ko: "2027년 2월 1일" },
    what: { en: "W-2s and 1099-NECs due to workers and the IRS", ko: "W-2·1099-NEC 직원 발급과 IRS 제출" } },
  { date: { en: "Mar 15, 2027", ko: "2027년 3월 15일" },
    what: { en: "S corp (1120-S) and partnership (1065) returns. Extension moves filing to Sept 15.", ko: "S corp(1120-S)·파트너십(1065) 신고. 연장하면 9월 15일까지" } },
  { date: { en: "Apr 15, 2027", ko: "2027년 4월 15일" },
    what: { en: "Individual (1040, 540) and C corp (1120) returns and payments, first-quarter 2027 estimates, and FBAR", ko: "개인(1040·540)·C corp(1120) 신고와 납부, 2027년 1분기 예정세, FBAR" } },
  { date: { en: "Oct 15, 2027", ko: "2027년 10월 15일" },
    what: { en: "Extended individual returns and the automatic FBAR extension", ko: "연장한 개인 신고 마감, FBAR 자동 연장 마감" } },
];

const FAQ = [
  { q: { en: "How are fees set?", ko: "수수료는 어떻게 정해지나요?" },
    a: { en: "After the consultation, I write the fee into the engagement letter based on the work we agreed on. Nothing starts before you sign it, and if the scope changes I'll tell you first. Monthly work such as bookkeeping and payroll is usually a flat monthly fee; tax returns are usually priced per return.",
         ko: "상담에서 맡길 일의 범위를 확인한 뒤, 금액을 업무 계약서(engagement letter)에 적어 드립니다. 서명하시기 전에는 일을 시작하지 않고, 범위가 바뀌면 먼저 말씀드립니다. 장부·급여처럼 매달 하는 일은 보통 월정액, 세금 신고는 보통 신고서별 금액입니다." } },
  { q: { en: "What should I bring for my individual return?", ko: "개인 세금 신고에 무엇을 준비하면 되나요?" },
    a: { en: "W-2s, every 1099 you received (interest, dividends, brokerage, 1099-NEC, 1099-K), mortgage interest statements (1098), childcare and tuition records, last year's return, and the highest balance of any account outside the U.S.",
         ko: "W-2, 받으신 1099 전부(이자·배당·증권·1099-NEC·1099-K), 모기지 이자 명세(1098), 보육비와 학비 영수증, 작년 신고서, 그리고 해외 계좌가 있으면 연중 최고 잔액을 준비해 주세요." } },
  { q: { en: "If I file an extension, can I pay later too?", ko: "연장 신고를 하면 세금도 늦게 내도 되나요?" },
    a: { en: "No. An extension gives you more time to file, not to pay. Tax still due should be paid by the original deadline to avoid interest and penalties.",
         ko: "아니요. 연장은 신고서 제출 기한만 늘려 줍니다. 낼 세금은 원래 기한까지 내야 이자와 벌금이 붙지 않습니다." } },
  { q: { en: "When will my refund arrive?", ko: "환급은 언제쯤 받나요?" },
    a: { en: "The IRS sends most e-filed refunds within three weeks. California is similar or a little slower. Paper returns take much longer.",
         ko: "IRS는 전자 신고한 환급을 대부분 3주 안에 보냅니다. 캘리포니아는 비슷하거나 조금 더 걸립니다. 종이 신고는 훨씬 오래 걸립니다." } },
  { q: { en: "I have bank accounts in Korea. Do I need to report them?", ko: "한국에 은행 계좌가 있는데 신고해야 하나요?" },
    a: { en: "If the combined balance of all your foreign accounts went over $10,000 at any point during the year, you need to file an FBAR. Depending on the amounts, Form 8938 may be required as well.",
         ko: "해외 계좌 잔액을 모두 합친 금액이 연중 한 번이라도 $10,000을 넘었다면 FBAR 신고 대상입니다. 금액에 따라 Form 8938도 필요할 수 있습니다." } },
  { q: { en: "Can we talk in Korean?", ko: "상담은 한국어로 할 수 있나요?" },
    a: { en: "Yes. Meetings, emails and explanations of your return can all be in Korean or English.",
         ko: "네. 상담, 이메일, 신고서 설명까지 모두 한국어나 영어로 하실 수 있습니다." } },
  { q: { en: "When is the office open?", ko: "사무실은 언제 문을 여나요?" },
    a: { en: "Monday to Friday, 9 a.m. to 6 p.m. Saturdays by appointment.",
         ko: "월요일부터 금요일, 오전 9시부터 오후 6시까지입니다. 토요일은 예약제로 운영합니다." } },
];

export default function ClientInfoPage({ lang, colors, fonts, navigate }) {
  const ko = lang === "ko";
  const tx = (o) => (ko ? o.ko : o.en);

  const steps = ko
    ? [
        ["상담 요청", "전화(213-325-9800)나 문의 양식으로 연락 주세요."],
        ["무료 30분 상담", "상황을 듣고 무엇이 필요한지 말씀드립니다."],
        ["범위와 비용 확인", "맡길 일과 비용을 업무 계약서(engagement letter)로 정리합니다."],
        ["서류와 결제 안내", "서류 보내는 방법과 결제 방법은 상담 후 이메일로 안내해 드립니다."],
      ]
    : [
        ["Get in touch", "Call 213-325-9800 or send the contact form."],
        ["Free 30-minute consultation", "I listen to your situation and tell you what it needs."],
        ["Scope and fee in writing", "The work and the fee go into an engagement letter."],
        ["Documents and payment", "After the consultation, I email you how to send documents and how to pay."],
      ];

  return (
    <div className="ci" data-ko={ko ? "1" : "0"}>
      <style>{`
        .ci[data-ko="1"] { word-break: keep-all; overflow-wrap: anywhere; }
        .ci-hero { background: linear-gradient(160deg, ${colors.darkNavy} 0%, ${colors.navy} 100%); color: #fff;
          padding: clamp(118px, 14vw, 150px) clamp(16px, 5vw, 40px) clamp(44px, 6vw, 64px); }
        .ci-in { max-width: 1000px; margin: 0 auto; }
        .ci-eyebrow { font-size: 12px; letter-spacing: 3px; color: ${colors.lightGold}; font-weight: 700; text-transform: uppercase; margin-bottom: 14px; }
        .ci-h1 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(32px, 5vw, 50px); line-height: 1.12; margin: 0 0 14px; }
        .ci[data-ko="1"] .ci-h1, .ci[data-ko="1"] .ci-h2 { font-family: ${fonts.sans}; font-weight: 700; letter-spacing: -0.4px; }
        .ci-lede { font-size: clamp(15px, 1.8vw, 18px); line-height: 1.7; color: #ffffffbf; max-width: 60ch; margin: 0; }
        .ci-sec { padding: clamp(44px, 6vw, 72px) clamp(16px, 5vw, 40px); }
        .ci-sec.alt { background: #F6F4F0; }
        .ci-h2 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(24px, 3vw, 32px); color: ${colors.navy}; margin: 0 0 22px; }
        .ci-steps { display: grid; grid-template-columns: 1fr; gap: 14px; counter-reset: s; }
        @media (min-width: 560px) { .ci-steps { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1000px) { .ci-steps { grid-template-columns: repeat(4, 1fr); } }
        .ci-step { background: #fff; border: 1px solid ${colors.lightGray}; border-radius: 12px; padding: 20px; }
        .ci-step b { display: flex; align-items: center; gap: 10px; color: ${colors.navy}; font-size: 16px; margin-bottom: 8px; }
        .ci-step b::before { counter-increment: s; content: counter(s); width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: ${colors.navy}; color: #fff; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; }
        .ci-step span { font-size: 14.5px; line-height: 1.65; color: #4B5563; }
        .ci-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ci-box { background: #fff; border: 1px solid ${colors.lightGray}; border-radius: 12px; padding: 22px; }
        .ci-box h3 { margin: 0 0 10px; font-size: 17px; color: ${colors.navy}; }
        .ci-box p, .ci-box li { font-size: 15px; line-height: 1.7; color: #374151; margin: 0 0 8px; }
        .ci-box ul { padding-left: 18px; margin: 0; }
        .ci-link { background: none; border: 0; padding: 0; color: ${colors.navy}; font-weight: 700; cursor: pointer; font-size: 15px; font-family: ${fonts.sans}; text-decoration: underline; text-decoration-color: ${colors.gold}; text-underline-offset: 3px; }
        .ci-dl { border: 1px solid ${colors.lightGray}; border-radius: 12px; overflow: hidden; background: #fff; }
        .ci-dl div { display: grid; grid-template-columns: 170px 1fr; gap: 16px; padding: 14px 18px; border-bottom: 1px solid ${colors.lightGray}; }
        .ci-dl div:last-child { border-bottom: 0; }
        .ci-dl dt { font-weight: 800; color: ${colors.navy}; font-size: 15px; }
        .ci-dl dd { margin: 0; font-size: 15px; line-height: 1.6; color: #374151; }
        .ci-small { font-size: 13px; color: ${colors.gray}; line-height: 1.6; margin-top: 12px; }
        .ci-faq details { border-bottom: 1px solid ${colors.lightGray}; padding: 16px 0; }
        .ci-faq summary { cursor: pointer; font-weight: 700; color: ${colors.navy}; font-size: 16px; line-height: 1.5; }
        .ci-faq p { margin: 10px 0 0; font-size: 15px; line-height: 1.75; color: #374151; }
        .ci-cta { display: inline-block; margin-top: 8px; background: ${colors.navy}; color: #fff; border: 0; border-radius: 8px; cursor: pointer;
          font-family: ${fonts.sans}; font-size: 15px; font-weight: 700; padding: 15px 24px; }
        @media (max-width: 760px) { .ci-two { grid-template-columns: 1fr; } .ci-dl div { grid-template-columns: 1fr; gap: 4px; } .ci-cta { width: 100%; } }
      `}</style>

      <header className="ci-hero">
        <div className="ci-in">
          <div className="ci-eyebrow">{ko ? "고객 안내" : "Client info"}</div>
          <h1 className="ci-h1">{ko ? "맡기시는 순서와 자주 묻는 것" : "How working with me works"}</h1>
          <p className="ci-lede">
            {ko
              ? "처음 연락하실 때부터 서류, 결제, 마감일까지 한곳에 모았습니다."
              : "From the first call to documents, payment and deadlines, in one place."}
          </p>
        </div>
      </header>

      <section className="ci-sec">
        <div className="ci-in">
          <h2 className="ci-h2">{ko ? "처음 맡기실 때" : "Getting started"}</h2>
          <div className="ci-steps">
            {steps.map(([b, s]) => (<div className="ci-step" key={b}><b>{b}</b><span>{s}</span></div>))}
          </div>
        </div>
      </section>

      <section className="ci-sec alt">
        <div className="ci-in ci-two">
          <div className="ci-box">
            <h3>{ko ? "서류 보내실 때" : "Sending documents"}</h3>
            <ul>
              <li>{ko ? "보내는 방법은 상담 후 이메일로 따로 안내해 드립니다." : "I'll email you how to send documents after we talk."}</li>
              <li>{ko ? "문의 양식이나 일반 이메일에는 소셜 번호와 세금 서류를 넣지 마세요." : "Please don't put Social Security numbers or tax documents in the contact form or ordinary email."}</li>
              <li>{ko ? "원본은 보관하시고 사본을 보내 주세요." : "Keep your originals and send copies."}</li>
            </ul>
          </div>
          <div className="ci-box">
            <h3>{ko ? "수수료 결제" : "Paying your fee"}</h3>
            <p>{ko ? "결제 방법은 상담 후 업무 계약서와 함께 이메일로 안내해 드립니다." : "Payment instructions come by email with your engagement letter after the consultation."}</p>
            <p>{ko ? "세금을 IRS나 FTB에 직접 내는 방법은 자료실에 정리해 두었습니다." : "How to pay the IRS or FTB directly is covered on the Resources page."}{" "}
              <button type="button" className="ci-link" onClick={() => navigate("resources")}>{ko ? "자료실 보기 →" : "Go to Resources →"}</button></p>
          </div>
          <div className="ci-box" style={{ gridColumn: "1 / -1" }}>
            <h3>{ko ? "IRS·FTB에서 편지를 받으셨다면" : "Got a letter from the IRS or FTB?"}</h3>
            <p>{ko
              ? "편지 오른쪽 위나 아래에 있는 번호(CP2000, LT11 같은)와 날짜를 먼저 알려 주세요. 대부분 답변 기한이 있습니다. 전화로 상품권이나 송금으로 돈을 내라고 하면 사기입니다."
              : "Send me the notice number (top or bottom right, like CP2000 or LT11) and the date first. Most letters have a response deadline. A phone call demanding payment by gift card or wire is a scam."}{" "}
              <button type="button" className="ci-link" onClick={() => navigate("irs-ftb-letter")}>{ko ? "통지서 대응 안내 →" : "More on IRS and FTB letters →"}</button></p>
          </div>
        </div>
      </section>

      <section className="ci-sec">
        <div className="ci-in">
          <h2 className="ci-h2">{ko ? "주요 마감일 (2026년분 신고)" : "Key deadlines for 2026 returns"}</h2>
          <dl className="ci-dl">
            {DEADLINES.map((d) => (<div key={d.date.en}><dt>{tx(d.date)}</dt><dd>{tx(d.what)}</dd></div>))}
          </dl>
          <p className="ci-small">
            {ko
              ? "연장은 신고 기한만 늘려 주고 납부 기한은 그대로입니다. 재난 지역 연장처럼 예외가 생길 수 있으니 상황에 따라 확인해 드립니다."
              : "An extension moves the filing date, not the payment date. Exceptions such as disaster-area extensions can apply, so I'll confirm yours."}
          </p>
        </div>
      </section>

      <section className="ci-sec alt">
        <div className="ci-in ci-faq">
          <h2 className="ci-h2">{ko ? "자주 묻는 질문" : "Common questions"}</h2>
          {FAQ.map((f) => (
            <details key={f.q.en}><summary>{tx(f.q)}</summary><p>{tx(f.a)}</p></details>
          ))}
          <div style={{ marginTop: 28 }}>
            <button type="button" className="ci-cta" onClick={() => navigate("contact")}>
              {ko ? "무료 30분 상담 예약" : "Book a free 30-minute consultation"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
