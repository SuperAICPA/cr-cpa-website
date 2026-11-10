/* ============================================================
   Landing pages for ads and search
     /bookkeeping-payroll   business monthly books, payroll, tax
     /restaurant-tax        restaurants: sales tax, tips, payroll
     /irs-ftb-letter        IRS / FTB / EDD / CDTFA letters
   Copy lives in LANDINGS below. To show a starting price later,
   fill in `price` for that page (leave null to hide it).
   ============================================================ */

import ReviewsSection from "./ReviewsSection";
import ClientStories from "./ClientStories";

const PHONE = "213-325-9800";
const TEL = "tel:+12133259800";

export const LANDINGS = {
  "bookkeeping-payroll": {
    stories: ["ccorp"],
    price: null, // e.g. { en: "From $___ a month", ko: "월 $___부터" }
    seo: {
      title: {
        en: "Bookkeeping, Payroll & Business Tax in Koreatown LA | Danny Kim, CPA",
        ko: "LA 한인 사업체 장부·급여·세금 월 관리 | Danny Kim, CPA",
      },
      desc: {
        en: "Monthly bookkeeping, payroll, sales tax and year-end returns for small businesses in Los Angeles, handled by one California CPA in Korean and English.",
        ko: "LA 소규모 사업체의 월별 장부, 급여, 판매세, 연말 세금 신고를 캘리포니아 CPA 한 사람이 한국어와 영어로 맡습니다.",
      },
    },
    eyebrow: { en: "For business owners", ko: "사업체 월 관리" },
    h1: { en: "Books, payroll and taxes in one place, every month", ko: "장부, 급여, 세금을 한 곳에서 매달" },
    lede: {
      en: "If you are juggling a bookkeeper, a payroll company and a tax preparer, I can take over all of it. You get one monthly report and one person to call, and your tax returns are built from the same books.",
      ko: "장부, 급여, 세금 신고를 각각 다른 곳에 맡기고 계시다면 제가 한꺼번에 맡겠습니다. 매달 보고서 한 부와 연락할 사람 한 명이 생기고, 세금 신고서도 같은 장부에서 나옵니다.",
    },
    note: {
      title: { en: "What changes for 2026 payroll", ko: "2026년 급여 신고에서 바뀌는 것" },
      items: [
        {
          en: "2026 W-2s report tips (code TP) and overtime (code TT) separately in box 12, and tipped jobs need an occupation code in box 14b. Only the overtime premium required by federal law counts, so California daily overtime has to be worked out separately.",
          ko: "2026년분 W-2부터 12번 칸에 팁(코드 TP)과 초과근무 수당(코드 TT)을 따로 적고, 팁을 받는 직종은 14b 칸에 직종 코드를 넣어야 합니다. 연방법이 요구하는 초과근무 할증분만 인정되기 때문에 캘리포니아의 하루 8시간 초과 오버타임은 따로 계산해야 합니다.",
        },
        {
          en: "For payments made in 2026, 1099-NEC and 1099-MISC are required at $2,000 instead of $600.",
          ko: "2026년 지급분부터 1099-NEC·1099-MISC 발행 기준이 $600에서 $2,000으로 올랐습니다.",
        },
      ],
    },
    includesTitle: { en: "What I handle", ko: "제가 맡는 일" },
    includes: [
      { t: { en: "Monthly bookkeeping", ko: "월별 장부" },
        d: { en: "Transactions coded and bank and card accounts reconciled in QuickBooks Online, with a profit and loss statement and balance sheet each month.",
             ko: "QuickBooks Online에서 거래 분류와 은행·카드 대사를 하고, 매달 손익계산서와 대차대조표를 드립니다." } },
      { t: { en: "Payroll", ko: "급여" },
        d: { en: "Pay runs and direct deposit, federal 941 and 940, California DE 9 and DE 9C, new hire reports, W-2s and 1099s.",
             ko: "급여 계산과 직접 입금, 연방 941·940, 캘리포니아 DE 9·DE 9C, 신규 직원 신고, W-2와 1099 발행." } },
      { t: { en: "Sales tax", ko: "판매세" },
        d: { en: "CDTFA sales and use tax returns on the schedule CDTFA assigns, tied out to your POS reports and bank deposits.",
             ko: "CDTFA가 정한 주기에 맞춰 판매세 신고를 하고, POS 매출과 은행 입금액과 맞춰 봅니다." } },
      { t: { en: "Owner taxes during the year", ko: "사장님 세금 관리" },
        d: { en: "Quarterly estimated payments for the owners, and a reasonable salary set for S corporation owners.",
             ko: "사장님의 분기별 예정세 납부와, S corp 사장님의 적정 급여 설정." } },
      { t: { en: "Year-end returns", ko: "연말 세금 신고" },
        d: { en: "The business return (1120-S, 1065 or 1120), the California return, and the owners' personal returns.",
             ko: "법인 신고서(1120-S, 1065, 1120), 캘리포니아 신고서, 사장님 개인 신고서." } },
      { t: { en: "Letters from agencies", ko: "세무 당국 통지서" },
        d: { en: "IRS, FTB, EDD and CDTFA letters handled as they arrive.",
             ko: "IRS, FTB, EDD, CDTFA에서 오는 편지를 받는 대로 처리합니다." } },
    ],
    fitTitle: { en: "A good fit if", ko: "이런 사업체에 맞습니다" },
    fit: [
      { en: "You have employees and run payroll every week or two.", ko: "직원이 있고 매주 또는 격주로 급여를 줍니다." },
      { en: "You hold a seller's permit and file sales tax.", ko: "판매세 허가(seller's permit)가 있고 판매세를 신고합니다." },
      { en: "Your books are behind, or nobody has looked at them since last year's return.", ko: "장부가 밀려 있거나, 작년 세금 신고 이후로 아무도 장부를 안 봤습니다." },
      { en: "You want to talk to the person who does the work, in Korean or English.", ko: "실제로 일하는 사람과 한국어나 영어로 직접 이야기하고 싶습니다." },
    ],
    steps: [
      { t: { en: "A short call", ko: "짧은 통화" },
        d: { en: "Tell me how many companies, employees and bank accounts you have and what software you use now. There is no charge for this.",
             ko: "회사 수, 직원 수, 은행 계좌 수와 지금 쓰는 프로그램을 알려 주세요. 이 통화는 무료입니다." } },
      { t: { en: "Scope and fee in writing", ko: "범위와 비용을 서면으로" },
        d: { en: "Before any work starts, the scope and a fixed monthly fee go into an engagement letter.",
             ko: "일을 시작하기 전에 업무 범위와 월 고정 비용을 업무 계약서(engagement letter)로 정리합니다." } },
      { t: { en: "Catch-up if needed", ko: "밀린 장부 정리" },
        d: { en: "If the books are behind, I bring them current first. That part is quoted separately.",
             ko: "장부가 밀려 있으면 먼저 정리합니다. 이 부분은 따로 견적을 드립니다." } },
      { t: { en: "Every month", ko: "매달" },
        d: { en: "Books closed, payroll filed, and a short report with the numbers you actually use.",
             ko: "장부 마감, 급여 신고, 그리고 실제로 쓰시는 숫자만 담은 짧은 보고서." } },
    ],
    faq: [
      { q: { en: "Do I have to use QuickBooks?", ko: "꼭 QuickBooks를 써야 하나요?" },
        a: { en: "QuickBooks Online is what I use most. If you are on Xero or something else, tell me on the call and I will say plainly whether I can work in it.",
             ko: "제가 가장 많이 쓰는 건 QuickBooks Online입니다. Xero나 다른 프로그램을 쓰신다면 통화 때 말씀해 주세요. 제가 그 프로그램으로 일할 수 있는지 솔직하게 말씀드리겠습니다." } },
      { q: { en: "Can you take over from Gusto, ADP or my current bookkeeper?", ko: "지금 쓰는 Gusto, ADP나 북키퍼에서 넘겨받을 수 있나요?" },
        a: { en: "Yes. I can keep payroll on Gusto or QuickBooks Payroll, or move it. Switching mid-year means carrying the year-to-date numbers over correctly, so January 1 or the start of a quarter is the easiest time.",
             ko: "네. Gusto나 QuickBooks Payroll을 그대로 쓰거나 옮길 수 있습니다. 연중에 바꾸면 그해 누적 금액을 정확히 옮겨야 해서, 1월 1일이나 분기 시작일이 가장 수월합니다." } },
      { q: { en: "How much does it cost?", ko: "비용은 얼마인가요?" },
        a: { en: "It depends on the number of companies, employees and monthly transactions. After the first call I quote a fixed monthly fee in writing.",
             ko: "회사 수, 직원 수, 월 거래량에 따라 다릅니다. 첫 통화 후에 월 고정 비용을 서면으로 드립니다." } },
      { q: { en: "Do I need to come to the office?", ko: "사무실에 가야 하나요?" },
        a: { en: "Most of the work happens online. You are welcome to meet me at the office in Koreatown whenever it helps.",
             ko: "대부분 온라인으로 진행합니다. 필요하시면 언제든 코리아타운 사무실에서 만나실 수 있습니다." } },
    ],
  },

  "restaurant-tax": {
    price: null,
    seo: {
      title: {
        en: "Restaurant Sales Tax, Tip Reporting & Payroll in LA | Danny Kim, CPA",
        ko: "LA 식당 판매세·팁 신고·급여 | Danny Kim, CPA",
      },
      desc: {
        en: "CDTFA sales tax, tip reporting, payroll and monthly books for Los Angeles restaurants, including Korean BBQ and multi-location owners. Korean and English.",
        ko: "LA 식당의 CDTFA 판매세, 팁 신고, 급여, 월별 장부. 한식 BBQ와 다점포 사장님. 한국어와 영어로 상담합니다.",
      },
    },
    eyebrow: { en: "Restaurants", ko: "식당·요식업" },
    h1: { en: "Sales tax, tips and payroll for restaurants", ko: "식당 판매세, 팁, 급여를 한 번에" },
    lede: {
      en: "Restaurants are a common target for CDTFA sales tax audits, and 2026 changes how tips go on W-2s. I keep your POS sales, bank deposits, sales tax returns and payroll lined up so the numbers agree when someone asks.",
      ko: "식당은 CDTFA 판매세 감사를 자주 받는 업종이고, 2026년부터는 W-2의 팁 신고 방식도 바뀝니다. POS 매출, 은행 입금, 판매세 신고, 급여가 서로 맞도록 관리해서 누가 물어도 숫자가 일치하게 해 드립니다.",
    },
    note: {
      title: { en: "Tips in 2026", ko: "2026년 팁 신고" },
      items: [
        {
          en: "Employees can deduct qualified tips on their federal return for 2025 through 2028, up to $25,000 a year. To claim it they need the tips shown separately on the W-2 you give them.",
          ko: "직원은 2025~2028년 동안 연방 세금에서 적격 팁을 연 최대 $25,000까지 공제받을 수 있습니다. 그러려면 사장님이 주는 W-2에 팁이 따로 표시돼 있어야 합니다.",
        },
        {
          en: "Starting with 2026 W-2s, tips go in box 12 with code TP and the job's occupation code goes in box 14b. Your POS tip data has to reach payroll in a form that supports this.",
          ko: "2026년분 W-2부터 팁은 12번 칸에 코드 TP로, 직종 코드는 14b 칸에 들어갑니다. POS의 팁 기록이 이 형식에 맞게 급여로 넘어와야 합니다.",
        },
      ],
    },
    includesTitle: { en: "What I handle", ko: "제가 맡는 일" },
    includes: [
      { t: { en: "Sales tax returns", ko: "판매세 신고" },
        d: { en: "CDTFA returns for each location, with sales tied to POS reports and bank deposits.",
             ko: "매장별 CDTFA 신고. POS 매출 보고서와 은행 입금액에 맞춰 신고합니다." } },
      { t: { en: "Tip reporting", ko: "팁 신고" },
        d: { en: "Tip records carried from your POS into payroll, Form 8027 if you are a large food or beverage establishment, and a check on the FICA tip credit (Form 8846).",
             ko: "POS 팁 기록을 급여로 연결하고, 대형 요식업소에 해당하면 Form 8027을 신고하며, FICA 팁 세액공제(Form 8846)도 검토합니다." } },
      { t: { en: "Payroll", ko: "급여" },
        d: { en: "Pay runs, 941, DE 9 and DE 9C, and W-2s with the new tip and overtime codes.",
             ko: "급여 계산, 941, DE 9·DE 9C, 새 팁·초과근무 코드가 들어간 W-2." } },
      { t: { en: "Monthly numbers by store", ko: "매장별 월 숫자" },
        d: { en: "Food cost and labor by month and by location, so you can see which store is carrying the others.",
             ko: "월별·매장별 식자재비와 인건비. 어느 매장이 다른 매장을 먹여 살리는지 보입니다." } },
      { t: { en: "Year-end returns", ko: "연말 세금 신고" },
        d: { en: "Business and California returns, and the owners' personal returns.",
             ko: "법인 신고서, 캘리포니아 신고서, 사장님 개인 신고서." } },
      { t: { en: "Audits and letters", ko: "감사와 통지서" },
        d: { en: "If a CDTFA audit letter or an IRS or EDD notice arrives, I prepare the records and deal with the agency.",
             ko: "CDTFA 감사 통지나 IRS·EDD 편지가 오면 자료를 준비하고 기관을 직접 상대합니다." } },
    ],
    fitTitle: { en: "A good fit if", ko: "이런 식당에 맞습니다" },
    fit: [
      { en: "You run a Korean BBQ or another full-service restaurant with tipped staff.", ko: "한식 BBQ나 팁을 받는 직원이 있는 풀서비스 식당을 운영합니다." },
      { en: "You own several locations or franchise units and need each one's numbers separately.", ko: "여러 매장이나 프랜차이즈 지점을 갖고 있어 매장별 숫자가 필요합니다." },
      { en: "Nobody has compared your POS reports with your sales tax returns.", ko: "POS 보고서와 판매세 신고 금액을 아무도 맞춰 본 적이 없습니다." },
    ],
    steps: [
      { t: { en: "A short call", ko: "짧은 통화" },
        d: { en: "Tell me how many locations you have, which POS you use and who does payroll now. No charge.",
             ko: "매장 수, 쓰시는 POS, 지금 급여를 누가 하는지 알려 주세요. 무료입니다." } },
      { t: { en: "Scope and fee in writing", ko: "범위와 비용을 서면으로" },
        d: { en: "The scope and a fixed monthly fee go into an engagement letter before work starts.",
             ko: "일을 시작하기 전에 업무 범위와 월 고정 비용을 업무 계약서로 정리합니다." } },
      { t: { en: "First review", ko: "첫 점검" },
        d: { en: "I compare recent POS reports, deposits and sales tax returns and show you where they differ.",
             ko: "최근 POS 보고서, 입금액, 판매세 신고를 비교해서 어디가 다른지 보여 드립니다." } },
      { t: { en: "Every month", ko: "매달" },
        d: { en: "Sales tax, payroll and books kept in step, with a store-by-store report.",
             ko: "판매세, 급여, 장부를 같이 맞추고 매장별 보고서를 드립니다." } },
    ],
    faq: [
      { q: { en: "My POS already calculates sales tax. Why would the return be off?", ko: "POS가 판매세를 계산해 주는데 왜 신고가 틀릴 수 있나요?" },
        a: { en: "POS totals and the return often differ because of voids, gift cards, delivery apps, catering and discounts. CDTFA auditors compare your deposits and purchases to what you reported, so the differences need an explanation before they ask.",
             ko: "취소, 상품권, 배달앱, 케이터링, 할인 때문에 POS 합계와 신고 금액이 자주 달라집니다. CDTFA 감사관은 입금액과 매입액을 신고 금액과 비교하기 때문에, 차이는 묻기 전에 설명할 수 있어야 합니다." } },
      { q: { en: "Do I need to file Form 8027?", ko: "Form 8027을 신고해야 하나요?" },
        a: { en: "Generally yes if food or drinks are consumed on site, tipping is customary and you had more than 10 employees on a typical business day. I check this when we start.",
             ko: "일반적으로 매장 안에서 음식을 먹고, 팁 문화가 있고, 평소 영업일에 직원이 10명을 넘으면 해당됩니다. 시작할 때 확인해 드립니다." } },
      { q: { en: "We have several locations. Can you keep them separate?", ko: "매장이 여러 곳인데 따로 관리되나요?" },
        a: { en: "Yes. Each location gets its own sales, food cost and labor in the monthly report, and sales tax is reported by location.",
             ko: "네. 월 보고서에 매장별 매출, 식자재비, 인건비가 따로 나오고, 판매세도 매장별로 신고합니다." } },
      { q: { en: "How much does it cost?", ko: "비용은 얼마인가요?" },
        a: { en: "It depends on locations, employees and transactions. After the first call I quote a fixed monthly fee in writing.",
             ko: "매장 수, 직원 수, 거래량에 따라 다릅니다. 첫 통화 후 월 고정 비용을 서면으로 드립니다." } },
    ],
  },

  "irs-ftb-letter": {
    stories: ["levy", "parents"],
    price: null,
    seo: {
      title: {
        en: "Got an IRS or FTB Letter? Notice Help in Koreatown LA | Danny Kim, CPA",
        ko: "IRS·FTB 통지서 대응 | LA 한인 CPA Danny Kim",
      },
      desc: {
        en: "Help with IRS, California FTB, EDD and CDTFA letters: response deadlines, payment plans, penalty relief, unfiled returns and audits. Korean and English.",
        ko: "IRS, 캘리포니아 FTB, EDD, CDTFA 통지서 대응. 답변 기한, 분할 납부, 벌금 감면, 미신고 연도, 세무조사. 한국어와 영어로 상담합니다.",
      },
    },
    eyebrow: { en: "IRS · FTB · EDD · CDTFA letters", ko: "세무 당국 통지서" },
    h1: { en: "Got a letter from the IRS or FTB?", ko: "IRS나 FTB에서 편지를 받으셨나요?" },
    lede: {
      en: "Most letters have a response deadline, and missing it narrows your options. Tell me the notice number (top or bottom right corner, like CP2000 or LT11) and the date on it. I will tell you what it means and what it would cost to handle.",
      ko: "대부분의 통지서에는 답변 기한이 있고, 기한을 넘기면 할 수 있는 일이 줄어듭니다. 편지 오른쪽 위나 아래에 있는 번호(CP2000, LT11 같은)와 날짜를 알려 주세요. 무슨 내용인지, 처리 비용이 얼마인지 말씀드리겠습니다.",
    },
    note: {
      title: { en: "Common letters", ko: "자주 받는 편지" },
      items: [
        { en: "IRS CP2000: income reported to the IRS doesn't match your return. Answer by the date on the notice, usually 30 days.",
          ko: "IRS CP2000: IRS에 보고된 소득과 신고서가 다릅니다. 편지에 적힌 날짜까지 답해야 하며, 보통 30일입니다." },
        { en: "IRS CP14, CP501, CP503: balance due reminders. Interest and penalties keep adding up.",
          ko: "IRS CP14, CP501, CP503: 체납 안내입니다. 이자와 벌금이 계속 붙습니다." },
        { en: "IRS CP504: notice of intent to levy. The IRS can take your state tax refund and move toward other levies.",
          ko: "IRS CP504: 압류 예고입니다. 주 세금 환급금을 가져갈 수 있고 다른 압류로 이어집니다." },
        { en: "IRS LT11 or Letter 1058: final notice before levy. You have 30 days to request a Collection Due Process hearing.",
          ko: "IRS LT11 또는 Letter 1058: 압류 전 최종 통지입니다. 30일 안에 징수 절차 심리(CDP hearing)를 요청할 수 있습니다." },
        { en: "FTB Notice of Proposed Assessment: you generally have 60 days to file a protest.",
          ko: "FTB Notice of Proposed Assessment: 보통 60일 안에 이의(protest)를 제기할 수 있습니다." },
        { en: "EDD and CDTFA letters: payroll tax and sales tax notices, often tied to an audit.",
          ko: "EDD·CDTFA 편지: 급여세와 판매세 통지로, 감사와 연결되는 경우가 많습니다." },
      ],
    },
    includesTitle: { en: "What I handle", ko: "제가 맡는 일" },
    includes: [
      { t: { en: "Responses", ko: "답변서" },
        d: { en: "Reading the letter, gathering the records and writing the response before the deadline.",
             ko: "편지를 읽고 자료를 모아 기한 전에 답변서를 보냅니다." } },
      { t: { en: "Payment plans", ko: "분할 납부" },
        d: { en: "Installment agreements with the IRS and FTB that fit what you can actually pay.",
             ko: "실제로 낼 수 있는 금액에 맞춰 IRS·FTB와 분할 납부를 정합니다." } },
      { t: { en: "Penalty relief", ko: "벌금 감면" },
        d: { en: "First-time abatement and reasonable cause requests.",
             ko: "최초 위반 감면(first-time abatement)과 정당한 사유(reasonable cause) 요청." } },
      { t: { en: "Unfiled years", ko: "미신고 연도" },
        d: { en: "Preparing past returns so the account can be settled.",
             ko: "밀린 연도의 신고서를 작성해 계정을 정리합니다." } },
      { t: { en: "Levies and garnishments", ko: "압류 해제" },
        d: { en: "Working with collections to release a bank levy or wage garnishment.",
             ko: "징수 부서와 협의해 은행 계좌 압류나 급여 압류를 풀어 냅니다." } },
      { t: { en: "Audits", ko: "세무조사" },
        d: { en: "Correspondence and office audits with the IRS and FTB, with a power of attorney (IRS Form 2848, FTB 3520) so I deal with them for you.",
             ko: "IRS·FTB 서면 조사와 사무실 조사. 위임장(IRS Form 2848, FTB 3520)을 받아 제가 직접 상대합니다." } },
      { t: { en: "Offer in compromise", ko: "세금 감액 합의(OIC)" },
        d: { en: "I check first whether you qualify, because many people don't, before anyone pays an application fee.",
             ko: "신청비를 내기 전에 자격이 되는지부터 확인합니다. 해당되지 않는 경우가 많기 때문입니다." } },
    ],
    notTitle: { en: "What I don't take", ko: "맡지 않는 일" },
    not: [
      { en: "Tax Court cases and criminal tax matters belong with a tax attorney. If your case needs one, I will tell you on the first call.",
        ko: "조세법원 소송과 형사 세무 사건은 세무 변호사의 일입니다. 변호사가 필요한 사건이면 첫 통화에서 말씀드립니다." },
    ],
    steps: [
      { t: { en: "Tell me the notice", ko: "편지 번호 알려 주기" },
        d: { en: "Send the notice number and date with the form below, or call. Telling you what the letter is costs nothing.",
             ko: "아래 양식이나 전화로 편지 번호와 날짜를 알려 주세요. 무슨 편지인지 알려 드리는 건 무료입니다." } },
      { t: { en: "Fixed fee in writing", ko: "고정 비용을 서면으로" },
        d: { en: "An engagement letter and a power of attorney so I can speak to the agency for you.",
             ko: "업무 계약서와 위임장을 받아 제가 기관과 직접 이야기합니다." } },
      { t: { en: "To the end", ko: "끝까지" },
        d: { en: "I follow it until the balance is resolved or the payment plan is in place.",
             ko: "체납이 정리되거나 분할 납부가 확정될 때까지 챙깁니다." } },
    ],
    faq: [
      { q: { en: "How do I know the letter is real?", ko: "편지가 진짜인지 어떻게 아나요?" },
        a: { en: "The IRS and FTB first contact you by mail. They don't demand payment by gift card, wire or crypto, and they don't threaten arrest over the phone. If you're unsure, send me the notice number and I will check.",
             ko: "IRS와 FTB는 처음에 우편으로 연락합니다. 상품권, 송금, 암호화폐로 돈을 내라고 하지 않고, 전화로 체포하겠다고 위협하지도 않습니다. 의심되시면 편지 번호를 보내 주세요. 확인해 드립니다." } },
      { q: { en: "The deadline already passed. Is it too late?", ko: "기한이 이미 지났는데 늦었나요?" },
        a: { en: "Usually not, but some options close. The sooner I see it, the more choices you have.",
             ko: "대부분 늦지 않았지만, 일부 선택지는 사라집니다. 빨리 보여 주실수록 할 수 있는 게 많습니다." } },
      { q: { en: "Do I have to talk to the IRS myself?", ko: "제가 직접 IRS와 통화해야 하나요?" },
        a: { en: "No. Once you sign a power of attorney, I deal with them directly.",
             ko: "아니요. 위임장에 서명하시면 제가 직접 상대합니다." } },
      { q: { en: "Should I send a photo of the letter?", ko: "편지 사진을 보내도 되나요?" },
        a: { en: "Not through the form or regular email. The notice number and date are enough to start. If we work together, I will give you a secure way to send the full letter.",
             ko: "문의 양식이나 일반 이메일로는 보내지 마세요. 처음에는 편지 번호와 날짜면 충분합니다. 함께 일하게 되면 편지 전체를 안전하게 보내실 방법을 따로 드립니다." } },
    ],
  },
};

export default function LandingPage({ id, lang, colors, fonts, form }) {
  const L = LANDINGS[id];
  if (!L) return null;
  const ko = lang === "ko";
  const tx = (o) => (o ? (ko ? o.ko : o.en) : "");
  const goForm = () => {
    const el = document.getElementById("lp-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lp" data-ko={ko ? "1" : "0"}>
      <style>{`
        .lp { --navy:${colors.navy}; --gold:${colors.gold}; --gray:${colors.gray}; --line:${colors.lightGray}; }
        .lp[data-ko="1"] { word-break: keep-all; overflow-wrap: anywhere; }
        .lp-hero { background: linear-gradient(165deg, ${colors.navy} 0%, #24324a 100%); color:#fff;
          padding: clamp(120px, 15vw, 160px) clamp(16px, 5vw, 40px) clamp(56px, 7vw, 80px); }
        .lp-in { max-width: 1040px; margin: 0 auto; }
        .lp-eyebrow { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: ${colors.lightGold}; font-weight: 600; margin-bottom: 18px; }
        .lp-h1 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(32px, 5.4vw, 54px); line-height: 1.12; margin: 0 0 20px; max-width: 18ch; }
        .lp[data-ko="1"] .lp-h1 { font-family: ${fonts.sans}; font-weight: 700; letter-spacing: -0.5px; max-width: 20ch; }
        .lp-lede { font-size: clamp(16px, 1.9vw, 19px); line-height: 1.7; color: #ffffffcc; max-width: 62ch; margin: 0 0 30px; }
        .lp-cta { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .lp-btn { display: inline-block; text-decoration: none; cursor: pointer; border: 0; font-family: ${fonts.sans};
          font-size: 15px; font-weight: 700; padding: 15px 26px; border-radius: 3px; }
        .lp-btn-gold { background: linear-gradient(135deg, ${colors.gold}, ${colors.lightGold}); color: ${colors.darkNavy}; }
        .lp-btn-line { background: transparent; color: #fff; border: 1px solid #ffffff66; }
        .lp-price { margin-top: 18px; font-size: 15px; color: ${colors.lightGold}; font-weight: 600; }
        .lp-sec { padding: clamp(48px, 7vw, 80px) clamp(16px, 5vw, 40px); }
        .lp-sec.alt { background: #F6F4F0; }
        .lp-h2 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(26px, 3.4vw, 36px); color: ${colors.navy}; margin: 0 0 28px; }
        .lp[data-ko="1"] .lp-h2 { font-family: ${fonts.sans}; font-weight: 700; }
        .lp-note { background: #fff; border: 1px solid ${colors.lightGray}; border-left: 4px solid ${colors.gold}; padding: 22px 24px; }
        .lp-note h3 { font-size: 16px; color: ${colors.navy}; margin: 0 0 12px; }
        .lp-note ul, .lp-fit ul { margin: 0; padding-left: 20px; }
        .lp-note li, .lp-fit li { font-size: 15.5px; line-height: 1.7; color: #374151; margin-bottom: 8px; }
        .lp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 16px; }
        .lp-card { background: #fff; border: 1px solid ${colors.lightGray}; border-top: 3px solid ${colors.navy}; padding: 22px 22px 20px; }
        .lp-card h3 { font-size: 16px; color: ${colors.navy}; margin: 0 0 8px; }
        .lp-card p { font-size: 14.5px; line-height: 1.7; color: ${colors.gray}; margin: 0; }
        .lp-two { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .lp-steps { counter-reset: s; list-style: none; margin: 0; padding: 0; }
        .lp-steps li { position: relative; padding: 0 0 20px 52px; }
        .lp-steps li::before { counter-increment: s; content: counter(s); position: absolute; left: 0; top: 0;
          width: 36px; height: 36px; border-radius: 50%; background: ${colors.navy}; color: #fff;
          display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; }
        .lp-steps b { display: block; color: ${colors.navy}; font-size: 16px; margin-bottom: 4px; }
        .lp-steps span { font-size: 14.5px; line-height: 1.7; color: ${colors.gray}; }
        .lp-not { margin-top: 28px; font-size: 14.5px; line-height: 1.7; color: #374151; background: #fff; border: 1px dashed #c9c3b8; padding: 16px 18px; }
        .lp-faq details { border-bottom: 1px solid ${colors.lightGray}; padding: 16px 0; }
        .lp-faq summary { cursor: pointer; font-weight: 600; color: ${colors.navy}; font-size: 16px; line-height: 1.5; }
        .lp-faq p { margin: 10px 0 0; font-size: 15px; line-height: 1.75; color: #374151; }
        #lp-form { scroll-margin-top: 80px; }
        .lp-contact { display: grid; grid-template-columns: 1fr 1.25fr; gap: 40px; align-items: start; }
        .lp-contact .lp-ph { font-size: 26px; font-weight: 700; color: ${colors.navy}; text-decoration: none; }
        .lp-small { font-size: 12.5px; color: ${colors.gray}; line-height: 1.6; margin-top: 28px; }
        @media (max-width: 820px) {
          .lp-two, .lp-contact { grid-template-columns: 1fr; gap: 28px; }
          .lp-btn { flex: 1 1 auto; text-align: center; }
        }
      `}</style>

      <div>
        <header className="lp-hero">
          <div className="lp-in">
            <div className="lp-eyebrow">{tx(L.eyebrow)}</div>
            <h1 className="lp-h1">{tx(L.h1)}</h1>
            <p className="lp-lede">{tx(L.lede)}</p>
            <div className="lp-cta">
              <a className="lp-btn lp-btn-gold" href={TEL}>{ko ? `전화 ${PHONE}` : `Call ${PHONE}`}</a>
              <button type="button" className="lp-btn lp-btn-line" onClick={goForm}>{ko ? "문의 남기기" : "Send a message"}</button>
            </div>
            {L.price && <div className="lp-price">{tx(L.price)}</div>}
          </div>
        </header>

        {L.note && (
          <section className="lp-sec alt">
            <div className="lp-in lp-note">
              <h3>{tx(L.note.title)}</h3>
              <ul>{L.note.items.map((it, i) => <li key={i}>{tx(it)}</li>)}</ul>
            </div>
          </section>
        )}

        <section className="lp-sec">
          <div className="lp-in">
            <h2 className="lp-h2">{tx(L.includesTitle)}</h2>
            <div className="lp-grid">
              {L.includes.map((c, i) => (
                <div className="lp-card" key={i}>
                  <h3>{tx(c.t)}</h3>
                  <p>{tx(c.d)}</p>
                </div>
              ))}
            </div>
            {L.not && (
              <div className="lp-not">
                <b>{tx(L.notTitle)}</b>{" "}
                {L.not.map((n, i) => <span key={i}>{tx(n)} </span>)}
              </div>
            )}
          </div>
        </section>

        <section className="lp-sec alt">
          <div className="lp-in lp-two">
            {L.fit ? (
              <div className="lp-fit">
                <h2 className="lp-h2">{tx(L.fitTitle)}</h2>
                <ul>{L.fit.map((f, i) => <li key={i}>{tx(f)}</li>)}</ul>
              </div>
            ) : <div />}
            <div>
              <h2 className="lp-h2">{ko ? "진행 방식" : "How it starts"}</h2>
              <ol className="lp-steps">
                {L.steps.map((s, i) => (
                  <li key={i}><b>{tx(s.t)}</b><span>{tx(s.d)}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="lp-sec">
          <div className="lp-in lp-faq">
            <h2 className="lp-h2">{ko ? "자주 묻는 질문" : "Questions people ask"}</h2>
            {L.faq.map((f, i) => (
              <details key={i}>
                <summary>{tx(f.q)}</summary>
                <p>{tx(f.a)}</p>
              </details>
            ))}
          </div>
        </section>

        {L.stories && <ClientStories ids={L.stories} lang={lang} colors={colors} fonts={fonts} background="#F6F4F0" />}

        <ReviewsSection lang={lang} />

        <section className="lp-sec alt" id="lp-form">
          <div className="lp-in lp-contact">
            <div>
              <h2 className="lp-h2">{ko ? "연락 주세요" : "Get in touch"}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#374151", margin: "0 0 18px" }}>
                {ko
                  ? "전화가 연결되지 않으면 양식으로 남겨 주세요. 한국어나 영어로 답장 드립니다."
                  : "If I can't pick up, leave a message with the form. I reply in Korean or English."}
              </p>
              <a className="lp-ph" href={TEL}>{PHONE}</a>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: colors.gray, marginTop: 14 }}>
                info.dkcpa@gmail.com<br />611 S Catalina St #216<br />Los Angeles, CA 90005
              </p>
              <p className="lp-small">
                {ko
                  ? "이 페이지는 일반적인 안내이며, 개별 상황에 대한 세무 조언이 아닙니다."
                  : "This page is general information, not tax advice for your situation."}
              </p>
            </div>
            <div>{form}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
