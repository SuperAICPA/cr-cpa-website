import { useState } from "react";

/* ============================================================
   dkcpala.com /construction   —   CPA Consulting : Construction
   오너가 10초 안에 판단하고 전화하도록 설계.
   중심 화면: 현장별로 얼마 받고 · 얼마 나가고 · 얼마 남는가.
   ▼ 배포 전 CONFIG만 채우세요.
   ============================================================ */
const CONFIG = {
  name: "Danny Kim",
  title: "CPA · 토목/구조 엔지니어링 출신",
  titleEn: "CPA · Civil & structural engineering background",
  phone: "213-325-9800",
  email: "info.dkcpa@gmail.com",
  kakaoUrl: "", // 카카오 채널 주소. 비워두면 버튼이 표시되지 않습니다.
  photo: "",    // 프로필 사진 URL. 비워두면 이니셜이 표시됩니다.
  brand: "DK CPA Consulting",
  site: "dkcpala.com",
};

/* 현장별 손익 — 실제 클라이언트 숫자로 교체해서 쓰세요 */
const JOBS = [
  { ko: "Wilshire 리테일 TI", en: "Wilshire Retail TI",
    contract: 1335000, labor: 385000, material: 290000, sub: 445000 },
  { ko: "Torrance 창고 신축", en: "Torrance Warehouse",
    contract: 2445000, labor: 620000, material: 560000, sub: 870000 },
  { ko: "Glendale 메디컬 오피스", en: "Glendale Medical Office",
    contract: 845000, labor: 290000, material: 175000, sub: 335000 },
  { ko: "Irvine 레스토랑", en: "Irvine Restaurant",
    contract: 417000, labor: 128000, material: 96000, sub: 131000 },
];
const RISK = 0.10; // 마진이 이 아래면 위험 표시

const T = {
  ko: {
    tag: "건설 전문 · Los Angeles",
    h1a: "어느 현장이 벌고",
    h1b: "어느 현장이 까먹는지.",
    lede: "현장별로 얼마 받고, 얼마 나가고, 얼마 남는지 — 매달 이 한 장이 사장님 숫자로 채워집니다.",
    free: "첫 상담 무료",
    emailFirst: "전화 연결이 안 되면 이메일로 주십시오. 전화보다 빠르고 정확하게 답변드립니다.",
    emailBtn: "이메일 보내기",
    call: "전화 상담",
    kpi: ["진행 중 현장", "지금 남는 돈", "위험 현장"],
    boardTitle: "4주 뒤, 사장님 현장이 이렇게 보입니다",
    boardSub: "현장 하나하나가 계약금액을 어디로 내보내고 있는지, 그리고 얼마가 손에 남는지. 매달 같은 날 받아보십니다.",
    company: "회사 전체",
    lRevenue: "계약금액",
    lCost: "들어간 돈",
    lProfit: "남는 돈",
    lMargin: "마진",
    legend: ["인건비", "자재", "하도급", "남는 돈"],
    riskTag: "위험",
    boardNote:
      "Glendale 현장은 $845,000짜리인데 남는 게 $45,000입니다. 준공하고 나서 알면 늦고, 지금 알면 손 쓸 수 있습니다.",
    whyTitle: "언젠가는 어차피 만들어야 하는 서류입니다",
    whySub: "회사가 커지면 돈줄 쪽에서 먼저 요구합니다. 그때 급하게 만들려고 하면 시간도 비용도 몇 배로 듭니다.",
    why: [
      { k: "은행", t: "한도를 올리거나 갱신할 때",
        need: "재무제표 + 현장별 진행표(WIP)",
        risk: "없으면 한도가 동결되거나 깎입니다" },
      { k: "보증 (Bond)", t: "큰 현장에 입찰할 때",
        need: "재무제표 + 수주잔고 + 운전자본",
        risk: "없으면 보증 한도 산정 자체가 안 됩니다" },
      { k: "원청 GC", t: "협력업체로 등록할 때",
        need: "재무제표 + 보험 + 현장 실적",
        risk: "없으면 입찰 기회 자체가 없습니다" },
    ],
    whyNeed: "요구하는 것",
    whyRisk: "없을 때",
    whyNote: "이 서류들은 나중에 몰아서 만들 수 없습니다. 지난 1년치 원가가 현장별로 정리돼 있어야 나옵니다. 지금부터 쌓아두면 그때는 그냥 뽑아서 드리면 됩니다.",
    gutTitle: "이 세 가지를 매달 알고 계시게 됩니다",
    guts: [
      "이 현장 끝나면 얼마 남는지 — 끝나기 전에",
      "지금 어느 현장이 까먹고 있는지 — 이번 달에",
      "받을 유보금이 얼마나 물려 있는지 — 현장별로",
    ],
    gutTail: "지금은 준공하고 나서야 아시는 것들입니다.",
    howTitle: "진행 방식",
    how: [
      { k: "1단계", t: "통화 10분", d: "현장 몇 개인지, 어디가 걸리는지. 범위와 요율을 정리해 드립니다 — 여기까지 무료" },
      { k: "2단계", t: "첫 현장 4주", d: "계약 후 착수. 매니저는 하루 5분, 앱은 저희가 드립니다" },
      { k: "3단계", t: "매달", d: "위 화면을 전 현장으로. 은행·보증사 제출 서류까지 함께" },
    ],
    afterTitle: "저희가 맡는 범위",
    after: [
      { t: "시스템 설치", d: "계정체계 · 공종코드 · 앱 배포" },
      { t: "매월 관리", d: "현장별 손익 · WIP · 유보금 · 은행/보증사 제출 서류" },
      { t: "세무", d: "법인 · 개인 · 급여세 · IRS/FTB" },
    ],
    afterNote: "현장 수와 법인 수에 따라 범위를 정하고 요율을 말씀드립니다. 착수는 계약 이후입니다.",
    whoTitle: "담당",
    whoBullets: [
      "토목·구조 엔지니어링 배경 — 현장 얘기가 통합니다",
      "캘리포니아 CPA — 은행·보증사 제출 서류까지",
      "상담과 보고서 모두 한국어 · 영어 — 스페인어는 지원하지 않습니다",
    ],
    lastTitle: "통화 10분이면 정리됩니다",
    lastBody: "현장 몇 개인지, 어디가 걸리는지만 알려주십시오. 어느 현장부터 볼지, 범위와 요율이 어떻게 되는지 그 자리에서 정리해 드립니다. 상담 자체는 비용이 없습니다.",
    kakao: "카카오톡",
    disc:
      "화면의 현장명과 금액은 예시이며 실제 고객 자료가 아닙니다. 본 서비스는 자문의견(advisory review)으로 제공되며 재무제표에 대한 인증(assurance)을 제공하지 않습니다. 개별 결과를 보장하지 않습니다.",
  },
  en: {
    tag: "Construction · Los Angeles",
    h1a: "Which jobs make money.",
    h1b: "Which jobs bleed.",
    lede: "What each job brings in, what goes out, what's left — one page, filled with your numbers, every month.",
    free: "First call is free",
    emailFirst: "If we don't pick up, email us. You'll get a faster and more precise answer than by phone.",
    emailBtn: "Send an email",
    call: "Call",
    kpi: ["Active jobs", "Left on the table", "At risk"],
    boardTitle: "In four weeks, your jobs look like this",
    boardSub: "Where each job is sending its contract value, and how much actually stays with you. Same day every month.",
    company: "Company total",
    lRevenue: "Contract",
    lCost: "Costs",
    lProfit: "Left",
    lMargin: "Margin",
    legend: ["Labor", "Material", "Subs", "Left"],
    riskTag: "AT RISK",
    boardNote:
      "Glendale is an $845,000 job leaving $45,000. Finding that out at closeout is too late. Finding it now is not.",
    whyTitle: "You'll have to produce these anyway",
    whySub: "As the company grows, the money side asks first. Building it under pressure costs several times more.",
    why: [
      { k: "Bank", t: "Raising or renewing a credit line",
        need: "Financial statements + WIP schedule",
        risk: "Without them the line gets frozen or cut" },
      { k: "Surety", t: "Bidding a larger job",
        need: "Financial statements + backlog + working capital",
        risk: "Without them your bond capacity can't even be calculated" },
      { k: "General contractor", t: "Getting prequalified as a sub",
        need: "Financial statements + insurance + job history",
        risk: "Without them you don't get to bid at all" },
    ],
    whyNeed: "What they ask for",
    whyRisk: "If you don't have it",
    whyNote: "These can't be assembled after the fact. They come out of twelve months of costs already sorted by job. Build it from now and we simply print it when the day comes.",
    gutTitle: "You'll know these three every month",
    guts: [
      "What this job will leave — before it closes",
      "Which job is losing money — this month",
      "How much retainage is tied up — job by job",
    ],
    gutTail: "Today you find these out at closeout.",
    howTitle: "How it works",
    how: [
      { k: "Step 1", t: "A ten-minute call", d: "How many jobs, where it hurts. We set scope and quote — no charge for this" },
      { k: "Step 2", t: "First job, four weeks", d: "Begins once we're engaged. Five minutes a day from your manager. We provide the app" },
      { k: "Step 3", t: "Every month", d: "The screen above across all jobs, plus bank and surety packages" },
    ],
    afterTitle: "What we handle",
    after: [
      { t: "System setup", d: "Chart of accounts · cost codes · app rollout" },
      { t: "Monthly", d: "Job-level P&L · WIP · retainage · bank and surety packages" },
      { t: "Tax", d: "Business · individual · payroll · IRS/FTB" },
    ],
    afterNote: "We set scope by job count and entity count, then quote. Work begins once we're engaged.",
    whoTitle: "Who you'll work with",
    whoBullets: [
      "Civil and structural engineering background — we speak field",
      "California CPA — through to bank and surety submissions",
      "Consultations and reports in Korean and English — Spanish is not supported",
    ],
    lastTitle: "Ten minutes to know where you stand",
    lastBody: "Tell us how many jobs you're running and where it hurts. On that call we'll pick the first job, set the scope, and give you the number. The call itself costs nothing.",
    kakao: "KakaoTalk",
    disc:
      "Job names and figures shown are illustrative, not actual client data. These services are provided as an advisory review and give no assurance on any financial information. Individual results are not guaranteed.",
  },
};

const usd = (n) => "$" + n.toLocaleString("en-US");
const short = (n) =>
  n >= 1000000 ? "$" + (n / 1000000).toFixed(2) + "M" : "$" + Math.round(n / 1000) + "K";
const TEL = "tel:" + CONFIG.phone.replace(/[^\d+]/g, "");

export default function ConstructionPage({ lang: langProp }) {
  // CPA 사이트 안에 붙으면 상위 언어 설정을 따르고 자체 상단바를 숨깁니다.
  const embedded = typeof langProp === "string";
  const [ownLang, setOwnLang] = useState("en");
  const lang = embedded ? (langProp === "ko" ? "ko" : "en") : ownLang;
  const setLang = setOwnLang;
  const t = T[lang];
  const initials = CONFIG.name.split(" ").map((w) => w[0]).join("");

  const rows = JOBS.map((j) => {
    const cost = j.labor + j.material + j.sub;
    const profit = j.contract - cost;
    return { ...j, cost, profit, margin: profit / j.contract, risk: profit / j.contract < RISK };
  });
  const tot = rows.reduce(
    (a, r) => ({ contract: a.contract + r.contract, cost: a.cost + r.cost, profit: a.profit + r.profit }),
    { contract: 0, cost: 0, profit: 0 }
  );
  const totMargin = tot.profit / tot.contract;
  const riskCount = rows.filter((r) => r.risk).length;

  return (
    <div className="cn" data-embed={embedded ? "1" : "0"}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

.cn{
  --paper:#EEF1F4; --white:#fff; --ink:#0E151D; --blue:#1C3D5A;
  --rule:#C9D3DC; --mute:#5C6A77; --flag:#B3261E; --ok:#1C7A56;
  --lab:#20496B; --mat:#4A7FA6; --sub:#8FB4CD;
  background:var(--paper); color:var(--ink);
  font-family:'IBM Plex Sans','IBM Plex Sans KR',system-ui,sans-serif;
  font-size:17px; line-height:1.6; -webkit-font-smoothing:antialiased; padding-bottom:78px;
}
/* CPA 사이트의 고정 상단바(position:fixed) 아래로 내려주기 */
.cn[data-embed="1"]{padding-top:104px;}
@media (max-width:719px){ .cn[data-embed="1"]{padding-top:92px;} }
.cn *{box-sizing:border-box;}
.cn-w{max-width:960px;margin:0 auto;padding:0 22px;}
.cn-m{font-family:'IBM Plex Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums;}

.cn-top{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid var(--rule);}
.cn-tag{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);}
.cn-lg{display:flex;border:1px solid var(--rule);}
.cn-lg button{appearance:none;border:0;background:transparent;cursor:pointer;
  font-family:'IBM Plex Mono',monospace;font-size:11px;padding:5px 11px;color:var(--mute);}
.cn-lg button[data-on="1"]{background:var(--blue);color:#fff;}
.cn-lg button:focus-visible{outline:2px solid var(--blue);outline-offset:2px;}

.cn-hero{padding:36px 0 30px;}
.cn[data-embed="1"] .cn-hero{padding-top:8px;}
.cn-h1{font-family:'Archivo','IBM Plex Sans KR',sans-serif;font-weight:800;letter-spacing:-.025em;
  line-height:1.04;font-size:clamp(32px,7.2vw,54px);margin:0;}
.cn-h1 b{display:block;font-weight:800;}
.cn-h1 b:last-child{color:var(--blue);}
.cn-lede{margin:18px 0 26px;font-size:18px;color:var(--mute);max-width:46ch;}
.cn-act{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.cn-call{display:inline-flex;align-items:center;gap:10px;background:var(--ink);color:#fff;
  text-decoration:none;padding:16px 26px;font-weight:700;font-size:18px;}
.cn-call:hover{background:var(--blue);}
.cn-call:focus-visible{outline:3px solid var(--blue);outline-offset:3px;}
.cn-free{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ok);font-weight:600;}


.cn-mail{margin-top:18px;padding:14px 16px;background:var(--white);border:1px solid var(--rule);
  border-left:3px solid var(--blue);max-width:52ch;}
.cn-mailtxt{margin:0 0 9px;font-size:14.5px;color:var(--mute);}
.cn-maillink{display:inline-flex;align-items:center;gap:8px;color:var(--blue);
  font-family:'IBM Plex Mono',monospace;font-size:15px;font-weight:600;text-decoration:none;
  border-bottom:1.5px solid var(--blue);padding-bottom:2px;}
.cn-maillink:hover{color:var(--ink);border-bottom-color:var(--ink);}
.cn-maillink:focus-visible{outline:2px solid var(--blue);outline-offset:3px;}
.cn-kpi{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:32px;
  border:1px solid var(--rule);background:var(--white);}
@media (max-width:420px){ .cn-kc{padding:14px 10px;} .cn-kk{font-size:11px;} .cn-ks{font-size:10.5px;} }
.cn-kc{padding:18px 16px;border-right:1px solid #E4E9ED;}
.cn-kc:last-child{border-right:0;background:#FDF6F5;}
.cn-kk{font-size:12.5px;color:var(--mute);margin-bottom:6px;}
.cn-kv{font-family:'Archivo',sans-serif;font-weight:800;font-size:clamp(22px,5vw,34px);
  line-height:1;letter-spacing:-.02em;}
.cn-kc:last-child .cn-kv{color:var(--flag);}
.cn-ks{font-size:12px;color:var(--mute);margin-top:6px;}

.cn-s{padding:44px 0;border-top:1px solid var(--rule);}
.cn-h2{font-family:'Archivo','IBM Plex Sans KR',sans-serif;font-weight:700;
  font-size:clamp(21px,3.6vw,28px);letter-spacing:-.015em;margin:0 0 8px;}
.cn-sub{color:var(--mute);font-size:15.5px;margin:0 0 22px;max-width:58ch;}
.cn-gap{height:22px;}

/* ---- owner board ---- */
.cn-board{border:1px solid var(--rule);background:var(--white);}
.cn-co{display:flex;flex-wrap:wrap;gap:0;border-bottom:2px solid var(--ink);background:#F6F9FB;}
.cn-cocell{flex:1 1 120px;padding:16px 18px;border-right:1px solid #E4E9ED;}
.cn-cocell:last-child{border-right:0;}
.cn-cok{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--mute);margin-bottom:5px;}
.cn-cov{font-family:'Archivo',sans-serif;font-weight:800;font-size:22px;letter-spacing:-.02em;}
.cn-cocell[data-p="1"] .cn-cov{color:var(--ok);}

.cn-job{padding:20px 18px;border-top:1px solid #E4E9ED;}
.cn-job:first-of-type{border-top:0;}
.cn-job[data-risk="1"]{background:#FDF6F5;}
.cn-jt{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px;}
.cn-jn{font-weight:600;font-size:17px;}
.cn-jm{display:flex;align-items:center;gap:9px;}
.cn-jpct{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:19px;color:var(--ok);}
.cn-job[data-risk="1"] .cn-jpct{color:var(--flag);}
.cn-risk{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.12em;
  background:var(--flag);color:#fff;padding:3px 8px;}

.cn-bar{display:flex;height:34px;width:100%;overflow:hidden;background:#E8EDF1;}
.cn-seg{display:flex;align-items:center;justify-content:center;overflow:hidden;
  font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#fff;white-space:nowrap;}
.cn-seg[data-t="labor"]{background:var(--lab);}
.cn-seg[data-t="material"]{background:var(--mat);}
.cn-seg[data-t="sub"]{background:var(--sub);color:#12303F;}
.cn-seg[data-t="profit"]{background:var(--ok);font-weight:600;}
.cn-job[data-risk="1"] .cn-seg[data-t="profit"]{background:var(--flag);}

.cn-nums{display:flex;flex-wrap:wrap;gap:0;margin-top:12px;border-top:1px solid #EBEFF3;}
.cn-nc{flex:1 1 110px;padding:10px 0 0;}
.cn-nk{font-size:11.5px;color:var(--mute);margin-bottom:2px;}
.cn-nv{font-family:'IBM Plex Mono',monospace;font-size:15.5px;font-weight:600;}
.cn-nc[data-p="1"] .cn-nv{color:var(--ok);}
.cn-job[data-risk="1"] .cn-nc[data-p="1"] .cn-nv{color:var(--flag);}

.cn-leg{display:flex;flex-wrap:wrap;gap:16px;padding:14px 18px;border-top:1px solid var(--rule);
  background:#F6F9FB;font-size:12.5px;color:var(--mute);}
.cn-li{display:flex;align-items:center;gap:7px;}
.cn-sw{width:13px;height:13px;flex:0 0 auto;}
.cn-note{margin-top:18px;padding-left:14px;border-left:3px solid var(--flag);
  font-size:16.5px;font-weight:500;max-width:56ch;}


.cn-why{display:grid;grid-template-columns:1fr;gap:1px;background:var(--rule);border:1px solid var(--rule);}
.cn-wc{background:var(--white);padding:22px 18px;}
.cn-wk{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--blue);margin-bottom:8px;}
.cn-wtt{font-weight:600;font-size:17px;margin-bottom:14px;}
.cn-wrow{padding-top:10px;border-top:1px solid #EBEFF3;margin-top:10px;}
.cn-wrow:first-of-type{border-top:0;margin-top:0;padding-top:0;}
.cn-wlab{font-size:11.5px;color:var(--mute);margin-bottom:3px;}
.cn-wval{font-size:14.5px;font-weight:500;}
.cn-wval[data-r="1"]{color:var(--flag);}
.cn-gut{background:var(--white);border:1px solid var(--rule);padding:24px 22px;}
.cn-gk{font-family:'Archivo','IBM Plex Sans KR',sans-serif;font-weight:700;font-size:19px;}
.cn-gut ul{list-style:none;margin:14px 0;padding:0;}
.cn-gut li{padding:11px 0;border-top:1px solid #E9EDF1;font-size:17px;font-weight:500;}
.cn-gut li:first-child{border-top:0;}
.cn-gtail{font-family:'Archivo','IBM Plex Sans KR',sans-serif;font-weight:700;font-size:19px;color:var(--blue);}

.cn-g3{display:grid;grid-template-columns:1fr;gap:1px;background:var(--rule);border:1px solid var(--rule);}
.cn-b{background:var(--white);padding:20px 18px;}
.cn-bk{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;color:var(--blue);margin-bottom:9px;}
.cn-bt{font-weight:600;font-size:17px;margin-bottom:4px;}
.cn-bd{font-size:14.5px;color:var(--mute);}

.cn-who{display:flex;gap:20px;align-items:flex-start;background:var(--white);
  border:1px solid var(--rule);padding:24px 22px;flex-wrap:wrap;}
.cn-av{flex:0 0 auto;width:76px;height:76px;background:var(--blue);color:#fff;display:grid;
  place-items:center;font-family:'Archivo',sans-serif;font-weight:800;font-size:26px;overflow:hidden;}
.cn-av img{width:100%;height:100%;object-fit:cover;}
.cn-wn{font-weight:700;font-size:19px;}
.cn-wt{font-size:13.5px;color:var(--mute);margin-bottom:12px;}
.cn-who ul{list-style:none;margin:0;padding:0;}
.cn-who li{font-size:15px;padding:5px 0 5px 17px;position:relative;}
.cn-who li::before{content:"";position:absolute;left:0;top:14px;width:7px;height:1.5px;background:var(--blue);}

.cn-end{background:var(--ink);color:#fff;padding:50px 0;}
.cn-et{font-family:'Archivo','IBM Plex Sans KR',sans-serif;font-weight:800;
  font-size:clamp(26px,5vw,40px);letter-spacing:-.025em;margin:0 0 12px;}
.cn-eb{color:#AEBBC6;max-width:48ch;margin:0 0 26px;font-size:16.5px;}
.cn-num{font-family:'IBM Plex Mono',monospace;font-size:clamp(22px,4.6vw,32px);font-weight:600;
  color:#fff;text-decoration:none;display:inline-block;border-bottom:2px solid #46586A;padding-bottom:3px;}
.cn-num:hover{border-bottom-color:#fff;}
.cn-alt{margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;}
.cn-alt a{color:#C3CFD9;text-decoration:none;font-size:14px;border:1px solid #3A4A58;padding:9px 16px;}
.cn-alt a:hover{border-color:#8FA3B4;color:#fff;}

.cn-stick{position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--ink);
  display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px;border-top:1px solid #33424F;}
.cn-sl{color:#AEBBC6;font-size:13px;}
.cn-sb{background:#fff;color:var(--ink);text-decoration:none;font-weight:700;padding:12px 20px;font-size:16px;white-space:nowrap;}
.cn-sb:focus-visible{outline:3px solid #fff;outline-offset:2px;}

.cn-f{padding:24px 0 34px;font-size:11.5px;color:#7F8C98;line-height:1.7;}
.cn-f p{margin:0 0 7px;max-width:80ch;}

@media (min-width:720px){
  .cn-g3,.cn-why{grid-template-columns:repeat(3,1fr);}
  .cn-s{padding:56px 0;}
  .cn{padding-bottom:0;}
  .cn-stick{display:none;}
  .cn-cov{font-size:26px;}
}
@media (prefers-reduced-motion:reduce){.cn *{transition:none!important;}}
      `}</style>

      <div className="cn-w">
        {!embedded && (
          <div className="cn-top">
            <span className="cn-tag">{t.tag}</span>
            <div className="cn-lg">
              {["en", "ko"].map((l) => (
                <button key={l} data-on={lang === l ? "1" : "0"} onClick={() => setLang(l)} aria-pressed={lang === l}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        <header className="cn-hero">
          {embedded && <p className="cn-tag" style={{ marginBottom: 14 }}>{t.tag}</p>}
          <h1 className="cn-h1">
            <b>{t.h1a}</b>
            <b>{t.h1b}</b>
          </h1>
          <p className="cn-lede">{t.lede}</p>
          <div className="cn-act">
            <a className="cn-call" href={TEL}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.5 3h3l1.5 4-2 1.4a13 13 0 0 0 6.6 6.6L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.2 2 2 0 0 1 5 3h1.5Z"
                  stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
              </svg>
              {CONFIG.phone}
            </a>
            <span className="cn-free">{t.free}</span>
          </div>

          <div className="cn-mail">
            <p className="cn-mailtxt">{t.emailFirst}</p>
            <a className="cn-maillink" href={`mailto:${CONFIG.email}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 6h18v12H3z" stroke="currentColor" strokeWidth="1.9" />
                <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
              </svg>
              {CONFIG.email}
            </a>
          </div>

          <div className="cn-kpi">
            <div className="cn-kc">
              <div className="cn-kk">{t.kpi[0]}</div>
              <div className="cn-kv">{rows.length}</div>
              <div className="cn-ks cn-m">{short(tot.contract)}</div>
            </div>
            <div className="cn-kc">
              <div className="cn-kk">{t.kpi[1]}</div>
              <div className="cn-kv cn-m">{short(tot.profit)}</div>
              <div className="cn-ks cn-m">{(totMargin * 100).toFixed(1)}%</div>
            </div>
            <div className="cn-kc">
              <div className="cn-kk">{t.kpi[2]}</div>
              <div className="cn-kv">{riskCount}</div>
              <div className="cn-ks cn-m">{lang === "ko" ? "마진 10% 미만" : "under 10% margin"}</div>
            </div>
          </div>
        </header>

        {/* ===== Owner board ===== */}
        <section className="cn-s">
          <h2 className="cn-h2">{t.boardTitle}</h2>
          <p className="cn-sub">{t.boardSub}</p>

          <div className="cn-board">
            <div className="cn-co">
              <div className="cn-cocell">
                <div className="cn-cok">{t.company} · {t.lRevenue}</div>
                <div className="cn-cov cn-m">{usd(tot.contract)}</div>
              </div>
              <div className="cn-cocell">
                <div className="cn-cok">{t.lCost}</div>
                <div className="cn-cov cn-m">{usd(tot.cost)}</div>
              </div>
              <div className="cn-cocell" data-p="1">
                <div className="cn-cok">{t.lProfit}</div>
                <div className="cn-cov cn-m">{usd(tot.profit)}</div>
              </div>
              <div className="cn-cocell">
                <div className="cn-cok">{t.lMargin}</div>
                <div className="cn-cov cn-m">{(totMargin * 100).toFixed(1)}%</div>
              </div>
            </div>

            {rows.map((r) => {
              const segs = [
                { t: "labor", v: r.labor, l: t.legend[0] },
                { t: "material", v: r.material, l: t.legend[1] },
                { t: "sub", v: r.sub, l: t.legend[2] },
                { t: "profit", v: r.profit, l: t.legend[3] },
              ];
              return (
                <div className="cn-job" data-risk={r.risk ? "1" : "0"} key={r.en}>
                  <div className="cn-jt">
                    <span className="cn-jn">{lang === "ko" ? r.ko : r.en}</span>
                    <span className="cn-jm">
                      {r.risk && <span className="cn-risk">{t.riskTag}</span>}
                      <span className="cn-jpct">{(r.margin * 100).toFixed(1)}%</span>
                    </span>
                  </div>

                  <div className="cn-bar" role="img"
                    aria-label={segs.map((s) => `${s.l} ${usd(s.v)}`).join(", ")}>
                    {segs.map((s) => {
                      const w = (s.v / r.contract) * 100;
                      return (
                        <span className="cn-seg" data-t={s.t} key={s.t} style={{ width: w + "%" }}>
                          {w >= 12 ? s.l : ""}
                        </span>
                      );
                    })}
                  </div>

                  <div className="cn-nums">
                    <div className="cn-nc">
                      <div className="cn-nk">{t.lRevenue}</div>
                      <div className="cn-nv cn-m">{usd(r.contract)}</div>
                    </div>
                    <div className="cn-nc">
                      <div className="cn-nk">{t.lCost}</div>
                      <div className="cn-nv cn-m">{usd(r.cost)}</div>
                    </div>
                    <div className="cn-nc" data-p="1">
                      <div className="cn-nk">{t.lProfit}</div>
                      <div className="cn-nv cn-m">{usd(r.profit)}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="cn-leg">
              {["labor", "material", "sub", "profit"].map((k, i) => (
                <span className="cn-li" key={k}>
                  <span className="cn-sw" style={{
                    background: k === "labor" ? "#20496B" : k === "material" ? "#4A7FA6"
                      : k === "sub" ? "#8FB4CD" : "#1C7A56",
                  }} />
                  {t.legend[i]}
                </span>
              ))}
            </div>
          </div>

          <p className="cn-note">{t.boardNote}</p>
        </section>

        {/* ===== 왜 필요한가 — 외부 요구 ===== */}
        <section className="cn-s">
          <h2 className="cn-h2">{t.whyTitle}</h2>
          <p className="cn-sub">{t.whySub}</p>
          <div className="cn-why">
            {t.why.map((w, i) => (
              <div className="cn-wc" key={i}>
                <div className="cn-wk">{w.k}</div>
                <div className="cn-wtt">{w.t}</div>
                <div className="cn-wrow">
                  <div className="cn-wlab">{t.whyNeed}</div>
                  <div className="cn-wval">{w.need}</div>
                </div>
                <div className="cn-wrow">
                  <div className="cn-wlab">{t.whyRisk}</div>
                  <div className="cn-wval" data-r="1">{w.risk}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="cn-note">{t.whyNote}</p>
        </section>

        <section className="cn-s">
          <div className="cn-gut">
            <div className="cn-gk">{t.gutTitle}</div>
            <ul>{t.guts.map((g, i) => <li key={i}>{g}</li>)}</ul>
            <div className="cn-gtail">{t.gutTail}</div>
          </div>
        </section>

        <section className="cn-s">
          <h2 className="cn-h2">{t.howTitle}</h2>
          <div className="cn-gap" />
          <div className="cn-g3">
            {t.how.map((s, i) => (
              <div className="cn-b" key={i}>
                <div className="cn-bk">{s.k}</div>
                <div className="cn-bt">{s.t}</div>
                <div className="cn-bd">{s.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="cn-s">
          <h2 className="cn-h2">{t.afterTitle}</h2>
          <p className="cn-sub">{t.afterNote}</p>
          <div className="cn-g3">
            {t.after.map((s, i) => (
              <div className="cn-b" key={i}>
                <div className="cn-bt">{s.t}</div>
                <div className="cn-bd">{s.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="cn-s">
          <h2 className="cn-h2">{t.whoTitle}</h2>
          <div className="cn-gap" />
          <div className="cn-who">
            <div className="cn-av">
              {CONFIG.photo ? <img src={CONFIG.photo} alt={CONFIG.name} /> : initials}
            </div>
            <div style={{ flex: "1 1 260px" }}>
              <div className="cn-wn">{CONFIG.name}</div>
              <div className="cn-wt">{lang === "ko" ? CONFIG.title : CONFIG.titleEn}</div>
              <ul>{t.whoBullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          </div>
        </section>
      </div>

      <section className="cn-end">
        <div className="cn-w">
          <h2 className="cn-et">{t.lastTitle}</h2>
          <p className="cn-eb">{t.lastBody}</p>
          <a className="cn-num" href={TEL}>{CONFIG.phone}</a>
          <p style={{ color: "#8FA0AE", fontSize: 14, margin: "16px 0 0", maxWidth: "46ch" }}>
            {t.emailFirst}
          </p>
          <div className="cn-alt">
            {CONFIG.kakaoUrl ? <a href={CONFIG.kakaoUrl}>{t.kakao}</a> : null}
            <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
          </div>
        </div>
      </section>

      <div className="cn-w cn-f">
        <p>{t.disc}</p>
        {!embedded && <p>{CONFIG.brand} · {CONFIG.site}</p>}
      </div>

      {embedded && (
        <style>{`@media (max-width:719px){ body{padding-bottom:78px;} }`}</style>
      )}

      <div className="cn-stick">
        <span className="cn-sl">{t.free} · {t.call}</span>
        <a className="cn-sb" href={TEL}>{CONFIG.phone}</a>
      </div>
    </div>
  );
}
