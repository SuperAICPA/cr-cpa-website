/* ============================================================
   Client stories — anonymized, generalized cases written by Danny.
   No names, amounts, years or notice numbers. Not client quotes.
   Used on the home page (all) and on landing pages (selected ids).
   ============================================================ */

export const STORIES = {
  levy: {
    tag: { en: "IRS levy notice", ko: "IRS 체납·압류 예고" },
    title: { en: "An S corp owner facing an IRS levy notice", ko: "IRS 압류 예고를 받은 S corp 사업자" },
    story: {
      en: "An S corp owner came to me after an IRS notice of intent to levy. The balance was too large to set up a payment plan online, and penalties had piled up. I put the power of attorney in place, asked for first-time penalty relief, and planned an upfront payment to bring the balance within reach of an installment agreement.",
      ko: "S corp를 운영하는 사업자가 IRS 압류 예고 통지를 받고 찾아오셨습니다. 체납액이 커서 온라인 분할 납부 신청이 막혀 있었고, 벌금도 적지 않게 붙어 있었습니다. 대리 위임을 먼저 정리하고, 처음 받은 벌금이라는 점을 근거로 감면을 요청했습니다. 분할 납부가 가능한 수준까지 잔액을 줄이도록 선납 계획도 함께 세웠습니다.",
    },
    result: {
      en: "The IRS removed the penalties and the payment plan is in place.",
      ko: "IRS가 벌금 감면을 받아들였고, 분할 납부가 설정됐습니다.",
    },
  },
  parents: {
    tag: { en: "Family representation", ko: "가족 대리" },
    title: { en: "An adult child handling a parent's taxes", ko: "부모님 세금을 대신 맡게 된 자녀" },
    story: {
      en: "An adult child managing finances for elderly parents brought me an IRS balance-due notice. Several years of returns turned out to be missing. I confirmed that the durable power of attorney allowed IRS representation and registered it, then used IRS records to find the unfiled years and prepared the federal and state returns.",
      ko: "연로한 부모님의 재정을 대신 관리하던 자녀분이 IRS 독촉 통지를 들고 오셨습니다. 확인해 보니 몇 해치 신고서가 빠져 있었습니다. 자녀분의 위임장(Durable POA)으로 IRS 대리가 가능한지 먼저 검토해 대리권을 등록했고, IRS 기록에서 빠진 연도를 찾아 연방과 주 신고서를 작성했습니다.",
    },
    result: {
      en: "The missing returns are filed and the remaining balance is on a payment plan.",
      ko: "밀린 신고를 모두 마치고, 남은 세금은 분할 납부로 정리했습니다.",
    },
  },
  rmd: {
    tag: { en: "Retirement accounts", ko: "은퇴 계좌" },
    title: { en: "A retiree who missed required distributions", ko: "최소 의무인출(RMD)을 놓친 은퇴자" },
    story: {
      en: "A retiree with an IRA learned late that required minimum distributions had been skipped for several years, which meant an excise tax on the missed amounts. I calculated the shortfall for each year and walked the client through taking the distributions.",
      ko: "IRA를 가진 은퇴자분이 몇 해 동안 최소 의무인출을 하지 않은 사실을 뒤늦게 아셨습니다. 그대로 두면 빠뜨린 금액에 소비세가 붙는 상황이었습니다. 연도별로 빠진 금액을 계산하고, 지금이라도 인출하도록 안내했습니다.",
    },
    result: {
      en: "For each year, I asked the IRS to waive the excise tax with an explanation of what happened.",
      ko: "해마다 사정을 설명해 IRS에 소비세 면제를 요청했습니다.",
    },
  },
  ccorp: {
    tag: { en: "One-owner C corp", ko: "1인 법인 절세" },
    title: { en: "A one-person C corp with no payroll", ko: "급여 없이 회사를 운영해 온 1인 법인 오너" },
    story: {
      en: "The sole owner of a C corp had been paying personal expenses from the company account instead of taking a salary. Business and personal spending were mixed and accounts were misclassified, so the year-end tax bill was a guess. I cleaned up the books, projected the year through December, and compared a year-end bonus, a SEP-IRA and a 401(k) side by side.",
      ko: "혼자 C corp를 운영하는 오너가 급여를 받지 않고 회사 계좌에서 개인 지출을 해 오셨습니다. 회사 비용과 개인 지출이 섞여 있었고 계정 분류도 맞지 않아, 연말에 세금이 얼마나 나올지 알 수 없었습니다. 장부를 정리해 연말까지의 손익을 예상하고, 연말 보너스·SEP-IRA·401(k)를 놓고 세금과 은퇴 자금이 어떻게 달라지는지 비교해 드렸습니다.",
    },
    result: {
      en: "The owner went with a 401(k) plus a year-end bonus, lowering that year's tax and moving the savings into retirement.",
      ko: "오너는 401(k)와 연말 보너스를 함께 쓰는 방안을 택해, 그해 세금을 줄이면서 그만큼을 은퇴 자금으로 돌렸습니다.",
    },
  },
};

const ORDER = ["levy", "parents", "rmd", "ccorp"];

export default function ClientStories({ ids = ORDER, lang, colors, fonts, background = "#fff" }) {
  const ko = lang === "ko";
  const tx = (o) => (ko ? o.ko : o.en);
  const list = ids.filter((id) => STORIES[id]);
  if (!list.length) return null;

  return (
    <section className="st-stories" data-ko={ko ? "1" : "0"} style={{ background, padding: "clamp(56px, 8vw, 96px) clamp(16px, 5vw, 40px)" }}>
      <style>{`
        .st-stories[data-ko="1"] { word-break: keep-all; overflow-wrap: anywhere; }
        .st-stories .st-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(440px, 100%), 1fr)); gap: 20px; }
        .st-stories .st-grid.one { max-width: 760px; }
        .st-stories .st-card { background: #fff; border: 1px solid ${colors.lightGray}; border-radius: 14px; padding: 28px 26px 24px;
          display: flex; flex-direction: column; gap: 14px; box-shadow: 0 1px 0 ${colors.lightGray}; transition: box-shadow .25s, transform .25s; }
        .st-stories .st-card:hover { box-shadow: 0 14px 40px ${colors.navy}14; transform: translateY(-2px); }
        .st-stories .st-tag { align-self: flex-start; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
          color: ${colors.gold}; background: ${colors.gold}14; border: 1px solid ${colors.gold}33; padding: 5px 10px; border-radius: 100px; }
        .st-stories .st-title { font-family: ${fonts.display}; font-weight: 400; font-size: 21px; line-height: 1.3; color: ${colors.navy}; margin: 0; }
        .st-stories[data-ko="1"] .st-title { font-family: ${fonts.sans}; font-weight: 700; font-size: 19px; letter-spacing: -0.3px; }
        .st-stories .st-body { font-size: 15px; line-height: 1.75; color: #374151; margin: 0; flex: 1; }
        .st-stories .st-result { display: flex; gap: 10px; align-items: flex-start; font-size: 14.5px; line-height: 1.6; font-weight: 600;
          color: ${colors.navy}; background: #F6F4F0; border-radius: 10px; padding: 12px 14px; margin: 0; }
        .st-stories .st-result span:first-child { color: ${colors.gold}; font-weight: 800; }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 680, marginBottom: 36 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: colors.gold, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>
            {ko ? "처리 사례" : "Client stories"}
          </div>
          <h2 style={{ fontFamily: ko ? fonts.sans : fonts.display, fontWeight: ko ? 700 : 400, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.2, color: colors.navy, margin: 0 }}>
            {ko ? "최근에 맡았던 일" : "Recent work"}
          </h2>
        </div>
        <div className={list.length === 1 ? "st-grid one" : "st-grid"}>
          {list.map((id) => {
            const s = STORIES[id];
            return (
              <article className="st-card" key={id}>
                <span className="st-tag">{tx(s.tag)}</span>
                <h3 className="st-title">{tx(s.title)}</h3>
                <p className="st-body">{tx(s.story)}</p>
                <p className="st-result"><span>✓</span><span>{tx(s.result)}</span></p>
              </article>
            );
          })}
        </div>
        <p style={{ fontSize: 12.5, color: colors.gray, lineHeight: 1.6, marginTop: 22 }}>
          {ko
            ? "고객 정보 보호를 위해 이름, 금액, 세부 사항은 일반화했습니다. 결과는 사안마다 다릅니다."
            : "Names, amounts and identifying details are left out to protect client confidentiality. Results depend on each situation."}
        </p>
      </div>
    </section>
  );
}
