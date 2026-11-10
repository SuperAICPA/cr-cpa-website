import { useState } from "react";

/* ============================================================
   S corp payroll-tax comparison (California)
   Update RATES once a year. Sources:
   - SS wage base 2026 $184,500 (SSA, Oct 2025)
   - CA SDI 1.3%, no wage cap; UI new employer 3.4% and ETT 0.1% on first $7,000 (EDD, 2026)
   - FUTA 0.6% + CA credit reduction 1.2% = 1.8% on first $7,000 (latest confirmed: 2025)
   - CA S corp franchise tax 1.5% of net income, $800 minimum
   ============================================================ */
export const RATES = {
  year: 2026,
  ssWageBase: 184500,
  ss: 0.124,          // Social Security, employer + employee
  medicare: 0.029,    // Medicare, employer + employee
  seFactor: 0.9235,   // share of net profit subject to self-employment tax
  futa: 0.018,
  futaBase: 7000,
  caUi: 0.034,
  caEtt: 0.001,
  caUiBase: 7000,
  caSdi: 0.013,
  caSCorp: 0.015,
  caSCorpMin: 800,
};

export function compareSCorp(profit, salary, extra, r = RATES) {
  const P = Math.max(0, Number(profit) || 0);
  const W = Math.min(Math.max(0, Number(salary) || 0), P);
  const X = Math.max(0, Number(extra) || 0);

  // Sole proprietor / single-member LLC: self-employment tax
  const seBase = P * r.seFactor;
  const seTax = seBase >= 400 ? r.ss * Math.min(seBase, r.ssWageBase) + r.medicare * seBase : 0;

  // S corp: payroll taxes on the owner's salary
  const fica = r.ss * Math.min(W, r.ssWageBase) + r.medicare * W;          // both halves
  const employerFica = fica / 2;
  const unemployment = r.futa * Math.min(W, r.futaBase) + (r.caUi + r.caEtt) * Math.min(W, r.caUiBase);
  const sdi = r.caSdi * W;
  const sCorpNet = Math.max(0, P - W - employerFica - unemployment - X);
  const caTax = Math.max(r.caSCorpMin, r.caSCorp * sCorpNet);
  const sCorpTotal = fica + unemployment + sdi + caTax + X;

  return {
    profit: P, salary: W, salaryCapped: (Number(salary) || 0) > P,
    seTax, fica, unemployment, sdi, caTax, extra: X, sCorpTotal,
    difference: seTax - sCorpTotal, // positive = S corp costs less
  };
}

const usd = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(n));

export default function SCorpCalculator({ lang, colors, fonts, navigate }) {
  const ko = lang === "ko";
  const [profit, setProfit] = useState(120000);
  const [salary, setSalary] = useState(60000);
  const [extra, setExtra] = useState(1500);
  const r = compareSCorp(profit, salary, extra);
  const saves = r.difference > 0;
  const maxBar = Math.max(r.seTax, r.sCorpTotal, 1);

  const field = (label, hint, value, set, id) => (
    <label className="sc-field" htmlFor={id}>
      <span className="sc-label">{label}</span>
      <span className="sc-input-wrap">
        <span className="sc-dollar">$</span>
        <input id={id} className="sc-input" type="number" inputMode="numeric" min="0" step="1000" value={value}
          onChange={(e) => set(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))} />
      </span>
      {hint && <span className="sc-hint">{hint}</span>}
    </label>
  );

  const rows = [
    [ko ? "급여세 (사회보장·메디케어, 회사와 본인 몫)" : "Payroll tax (Social Security and Medicare, both halves)", r.fica],
    [ko ? "실업보험세 (연방·캘리포니아)" : "Unemployment taxes (federal and California)", r.unemployment],
    [ko ? "캘리포니아 SDI (급여에서 공제)" : "California SDI (withheld from salary)", r.sdi],
    [ko ? "캘리포니아 S corp 세금 (순이익의 1.5%, 최소 $800)" : "California S corp tax (1.5% of net income, $800 minimum)", r.caTax],
    [ko ? "추가 운영 비용" : "Extra running costs", r.extra],
  ];

  return (
    <div className="sc" data-ko={ko ? "1" : "0"}>
      <style>{`
        .sc[data-ko="1"] { word-break: keep-all; overflow-wrap: anywhere; }
        .sc-hero { background: linear-gradient(160deg, ${colors.darkNavy} 0%, ${colors.navy} 100%); color: #fff;
          padding: clamp(118px, 14vw, 150px) clamp(16px, 5vw, 40px) clamp(44px, 6vw, 64px); }
        .sc-in { max-width: 1100px; margin: 0 auto; }
        .sc-eyebrow { font-size: 12px; letter-spacing: 3px; color: ${colors.lightGold}; font-weight: 700; text-transform: uppercase; margin-bottom: 14px; }
        .sc-h1 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(32px, 5vw, 50px); line-height: 1.12; margin: 0 0 14px; }
        .sc[data-ko="1"] .sc-h1 { font-family: ${fonts.sans}; font-weight: 700; letter-spacing: -0.5px; }
        .sc-lede { font-size: clamp(15px, 1.8vw, 18px); line-height: 1.7; color: #ffffffbf; max-width: 60ch; margin: 0; }
        .sc-body { padding: clamp(36px, 6vw, 64px) clamp(16px, 5vw, 40px) clamp(56px, 8vw, 88px); background: #F6F4F0; }
        .sc-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 24px; align-items: start; }
        .sc-panel { background: #fff; border: 1px solid ${colors.lightGray}; border-radius: 14px; padding: clamp(20px, 3vw, 30px); }
        .sc-panel h2 { font-size: 15px; letter-spacing: 1.5px; text-transform: uppercase; color: ${colors.gold}; margin: 0 0 18px; }
        .sc-field { display: block; margin-bottom: 20px; }
        .sc-label { display: block; font-weight: 700; color: ${colors.navy}; font-size: 15px; margin-bottom: 8px; }
        .sc-input-wrap { display: flex; align-items: center; border: 1.5px solid ${colors.lightGray}; border-radius: 10px; background: #fff; }
        .sc-input-wrap:focus-within { border-color: ${colors.navy}; }
        .sc-dollar { padding: 0 4px 0 14px; color: ${colors.gray}; font-weight: 600; }
        .sc-input { flex: 1; min-width: 0; border: 0; outline: 0; font-size: 18px; font-weight: 600; color: ${colors.navy}; padding: 13px 14px 13px 4px; background: transparent; font-family: ${fonts.sans}; }
        .sc-hint { display: block; font-size: 13px; color: ${colors.gray}; line-height: 1.55; margin-top: 7px; }
        .sc-warn { font-size: 13px; color: #9A3412; background: #FFF7ED; border: 1px solid #FED7AA; border-radius: 8px; padding: 10px 12px; margin: -8px 0 18px; line-height: 1.55; }
        .sc-answer { border-radius: 12px; padding: 20px 22px; margin-bottom: 20px; }
        .sc-answer.yes { background: ${colors.navy}; color: #fff; }
        .sc-answer.no { background: #FFF7ED; color: #7C2D12; border: 1px solid #FED7AA; }
        .sc-answer small { display: block; font-size: 13px; opacity: .8; margin-bottom: 6px; }
        .sc-answer b { display: block; font-size: clamp(26px, 4vw, 34px); line-height: 1.15; }
        .sc-bars { margin: 6px 0 22px; }
        .sc-bar { margin-bottom: 12px; }
        .sc-bar-top { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; color: ${colors.navy}; margin-bottom: 6px; }
        .sc-bar-top b { white-space: nowrap; }
        .sc-track { height: 12px; background: #EEF0F3; border-radius: 99px; overflow: hidden; }
        .sc-fill { height: 100%; border-radius: 99px; }
        .sc-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .sc-table td { padding: 9px 0; border-bottom: 1px solid ${colors.lightGray}; color: #374151; vertical-align: top; }
        .sc-table td:last-child { text-align: right; white-space: nowrap; padding-left: 12px; font-variant-numeric: tabular-nums; }
        .sc-table tr.total td { font-weight: 800; color: ${colors.navy}; border-bottom: 0; }
        .sc-notes { margin-top: 22px; font-size: 13px; color: ${colors.gray}; line-height: 1.7; }
        .sc-notes ul { padding-left: 18px; margin: 6px 0 0; }
        .sc-cta { display: inline-block; margin-top: 22px; background: ${colors.navy}; color: #fff; border: 0; border-radius: 8px; cursor: pointer;
          font-family: ${fonts.sans}; font-size: 15px; font-weight: 700; padding: 15px 22px; }
        @media (max-width: 860px) { .sc-grid { grid-template-columns: 1fr; } .sc-cta { width: 100%; } }
      `}</style>

      <header className="sc-hero">
        <div className="sc-in">
          <div className="sc-eyebrow">{ko ? "S corp 계산기" : "S corp calculator"}</div>
          <h1 className="sc-h1">{ko ? "S corp로 바꾸면 세금이 얼마나 달라질까?" : "Would an S corp lower your taxes?"}</h1>
          <p className="sc-lede">
            {ko
              ? "개인 사업자나 1인 LLC로 내는 자영업세와, S corp로 바꿔 급여를 받을 때 드는 급여세·캘리포니아 세금을 나란히 비교합니다."
              : "Compare the self-employment tax you pay as a sole proprietor or single-member LLC with the payroll and California taxes you'd pay as an S corp taking a salary."}
          </p>
        </div>
      </header>

      <div className="sc-body">
        <div className="sc-in sc-grid">
          <div className="sc-panel">
            <h2>{ko ? "숫자 넣기" : "Your numbers"}</h2>
            {field(ko ? "1년 순이익 (세전)" : "Net business profit for the year",
              ko ? "매출에서 경비를 뺀 금액입니다." : "Revenue minus expenses, before your own pay.",
              profit, setProfit, "sc-profit")}
            {field(ko ? "S corp일 때 사장님 급여" : "Salary you'd pay yourself as an S corp",
              ko ? "하시는 일에 맞는 합리적인 수준이어야 합니다. 너무 낮게 잡으면 IRS가 배당을 급여로 다시 볼 수 있습니다."
                 : "It has to be reasonable for the work you do. Set it too low and the IRS can treat distributions as wages.",
              salary, setSalary, "sc-salary")}
            {r.salaryCapped && (
              <div className="sc-warn">{ko ? "급여가 순이익보다 많아서 순이익만큼으로 계산했습니다." : "Salary is higher than profit, so it was capped at the profit amount."}</div>
            )}
            {field(ko ? "S corp 추가 운영 비용 (1년)" : "Extra S corp running costs (per year)",
              ko ? "급여 처리 서비스, 법인 세금 신고 등 S corp가 되면 새로 드는 비용입니다. 기본값은 예시입니다."
                 : "Payroll service, the separate corporate return and similar costs. The default is only an example.",
              extra, setExtra, "sc-extra")}
          </div>

          <div className="sc-panel" aria-live="polite">
            <h2>{ko ? "비교 결과" : "Comparison"}</h2>
            <div className={`sc-answer ${saves ? "yes" : "no"}`}>
              <small>{ko ? "S corp로 바꾸면 1년에" : "As an S corp, per year"}</small>
              <b>{saves
                ? (ko ? `약 ${usd(r.difference)} 줄어듭니다` : `about ${usd(r.difference)} less`)
                : (ko ? `약 ${usd(-r.difference)} 더 듭니다` : `about ${usd(-r.difference)} more`)}</b>
            </div>

            <div className="sc-bars">
              <div className="sc-bar">
                <div className="sc-bar-top"><span>{ko ? "개인 사업자·1인 LLC: 자영업세" : "Sole prop / LLC: self-employment tax"}</span><b>{usd(r.seTax)}</b></div>
                <div className="sc-track"><div className="sc-fill" style={{ width: `${(r.seTax / maxBar) * 100}%`, background: "#9CA3AF" }} /></div>
              </div>
              <div className="sc-bar">
                <div className="sc-bar-top"><span>{ko ? "S corp: 아래 항목 합계" : "S corp: total of the items below"}</span><b>{usd(r.sCorpTotal)}</b></div>
                <div className="sc-track"><div className="sc-fill" style={{ width: `${(r.sCorpTotal / maxBar) * 100}%`, background: colors.gold }} /></div>
              </div>
            </div>

            <table className="sc-table">
              <tbody>
                {rows.map(([label, v]) => (<tr key={label}><td>{label}</td><td>{usd(v)}</td></tr>))}
                <tr className="total"><td>{ko ? "S corp 합계" : "S corp total"}</td><td>{usd(r.sCorpTotal)}</td></tr>
              </tbody>
            </table>

            <div className="sc-notes">
              <b>{ko ? `${RATES.year}년 기준 어림 계산입니다.` : `A rough ${RATES.year} estimate.`}</b>
              <ul>
                {ko ? (<>
                  <li>사회보장세 상한 $184,500, 캘리포니아 SDI 1.3%, 실업보험(신규 사업장 3.4%)과 ETT 0.1%는 직원 1인당 $7,000까지 반영했습니다. 연방 실업세는 캘리포니아 감액분을 반영한 최근 확정치(1.8%)를 썼습니다.</li>
                  <li>연방·주 소득세의 변화(QBI 공제 등), 추가 메디케어세, 현재 LLC가 내는 연 $800과 LLC 수수료는 넣지 않았습니다. 실제 결과는 이것보다 크거나 작을 수 있습니다.</li>
                  <li>개별 상황에 대한 세무 조언이 아닙니다.</li>
                </>) : (<>
                  <li>Uses the $184,500 Social Security wage base, California SDI at 1.3%, and California UI (new employer 3.4%) and ETT (0.1%) on the first $7,000. Federal unemployment uses the latest confirmed rate with California's credit reduction (1.8%).</li>
                  <li>Leaves out income tax effects (such as the QBI deduction), the additional Medicare tax, and the $800 tax and fee an existing LLC already pays. Your real result can be higher or lower.</li>
                  <li>General information, not tax advice for your situation.</li>
                </>)}
              </ul>
            </div>

            <button type="button" className="sc-cta" onClick={() => navigate("contact")}>
              {ko ? "내 숫자로 정확히 따져 보기 → 무료 상담" : "Check it with your real numbers → free consultation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
