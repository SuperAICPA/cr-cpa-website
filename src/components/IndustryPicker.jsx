/* ============================================================
   IndustryPicker — About page "Industries I work with".
   Two groups (service businesses / product businesses). Clicking
   an industry opens a short card on what I help that business with.
   The open item lives in the parent (openId / setOpenId) so it
   survives the About page re-rendering.
   ============================================================ */
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import LineIcon from "./LineIcon";

export const INDUSTRY_GROUPS = [
  {
    key: "service",
    label: { en: "Service businesses", ko: "서비스업" },
    items: [
      {
        id: "construction", icon: "hardhat", link: "construction",
        name: { en: "Construction & Contractors", ko: "건설·시공" },
        summary: { en: "Books that show each job's real margin, and subcontractor paperwork that is ready before year end.", ko: "현장마다 실제로 얼마가 남는지 보이게 장부를 잡고, 하청업체 서류는 연말 전에 맞춰 둡니다." },
        points: {
          en: ["Job costing by project", "Subcontractor W-9s and 1099-NEC", "Progress billing, retention and WIP schedules", "Payroll for field crews"],
          ko: ["현장별 원가 관리(Job Costing)", "하청업체 W-9 수집과 1099-NEC 발행", "기성 청구, 유보금(Retention), WIP 보고", "현장 인력 급여 처리"],
        },
      },
      {
        id: "restaurants", icon: "utensils", link: "restaurant-tax",
        name: { en: "Restaurants & Food Service", ko: "식당·외식업" },
        summary: { en: "Sales tax, tips and payroll handled every quarter, with numbers split by location.", ko: "판매세, 팁, 급여를 분기마다 정리하고 매장이 여럿이면 매장별로 숫자를 나눕니다." },
        points: {
          en: ["CDTFA sales tax returns", "Tip reporting and the FICA tip credit", "POS sales matched to bank deposits", "P&L by location and food cost"],
          ko: ["CDTFA 판매세 신고", "팁 신고와 FICA 팁 크레딧", "POS 매출과 은행 입금 대사", "매장별 손익과 식재료 원가"],
        },
      },
      {
        id: "medical", icon: "medical", link: "svc_13",
        name: { en: "Medical & Dental Practices", ko: "병원·치과" },
        summary: { en: "Tax and books for professional corporations, from insurance deposits to the doctor's own salary and retirement plan.", ko: "전문직 법인의 세금과 장부를 맡습니다. 보험 청구 입금부터 원장님 급여와 은퇴 플랜까지 봅니다." },
        points: {
          en: ["Professional corporation tax returns", "Insurance and patient payments matched to deposits", "Owner salary and quarterly estimates", "Tax side of retirement plan choices"],
          ko: ["전문직 법인(Professional Corporation) 세무 신고", "보험사·환자 입금과 장부 대사", "원장님 급여와 분기 예정세", "은퇴 플랜 선택의 세금 효과 검토"],
        },
      },
      {
        id: "beauty", icon: "scissors", link: "svc_3",
        name: { en: "Beauty, Nail & Spa", ko: "미용실·네일·스파" },
        summary: { en: "Staff, booth renters and tips sorted out correctly, so payroll and sales tax match what actually happens in the shop.", ko: "직원과 부스 렌트, 팁을 제대로 구분해서 급여와 판매세가 매장 실제 운영과 맞도록 합니다." },
        points: {
          en: ["Employee vs. booth renter (W-2 or 1099)", "Payroll with tips", "Sales tax on retail products", "Monthly bookkeeping"],
          ko: ["직원과 부스 렌트 구분(W-2/1099)", "팁을 포함한 급여 처리", "판매 제품 판매세 신고", "월별 장부 정리"],
        },
      },
      {
        id: "trucking", icon: "truck", link: "svc_2",
        name: { en: "Trucking & Logistics", ko: "운송·물류" },
        summary: { en: "Costs tracked truck by truck, and drivers classified the right way under California rules.", ko: "트럭별로 비용을 나눠 보고, 캘리포니아 기준에 맞게 드라이버를 구분합니다." },
        points: {
          en: ["Cost and profit by truck", "Depreciation on trucks and equipment", "Driver classification (W-2 or 1099)", "Fuel, repair and toll records organized"],
          ko: ["트럭별 비용과 수익", "차량·장비 감가상각", "드라이버 W-2/1099 구분 검토", "연료비·수리비·통행료 정리"],
        },
      },
      {
        id: "realestate", icon: "home", link: "svc_1",
        name: { en: "Real Estate Investors & Agents", ko: "부동산 투자·중개" },
        summary: { en: "Rental income, depreciation and sales planned ahead, and agent income set up to keep less of it going to self-employment tax.", ko: "임대 소득, 감가상각, 매각 시점을 미리 계획하고, 중개인 소득은 자영업세 부담을 줄이는 구조로 잡습니다." },
        points: {
          en: ["Rental property returns and depreciation", "Like-kind (1031) exchange review", "Commission income and S corp review", "Property-level books for investors"],
          ko: ["임대 부동산 신고와 감가상각", "1031 교환 가능 여부 검토", "커미션 소득과 S corp 전환 검토", "투자자용 부동산별 장부"],
        },
      },
      {
        id: "professional", icon: "briefcase", link: "s-corp-calculator",
        name: { en: "Professional Services", ko: "전문 서비스·프리랜서" },
        summary: { en: "For consultants, designers, insurance agents and other one-person or small firms: entity choice, salary and quarterly tax.", ko: "컨설턴트, 디자이너, 보험 에이전트처럼 혼자 또는 소규모로 일하는 분들의 법인 형태, 급여, 분기 세금을 봅니다." },
        points: {
          en: ["S corp election and a reasonable salary", "Quarterly estimated tax", "Home office and vehicle deductions", "SEP-IRA or Solo 401(k) planning"],
          ko: ["S corp 선택과 적정 급여 책정", "분기 예정세 계산", "홈 오피스·차량 비용 공제", "SEP-IRA, Solo 401(k) 계획"],
        },
      },
      {
        id: "tech", icon: "laptop", link: "svc_5",
        name: { en: "Tech & Startups", ko: "IT·스타트업" },
        summary: { en: "Set up so investors can read your books, with the deadlines founders tend to miss written down early.", ko: "투자자가 장부를 보고 바로 이해할 수 있게 정리하고, 창업자가 놓치기 쉬운 기한을 미리 챙깁니다." },
        points: {
          en: ["Entity choice (LLC or C corp)", "83(b) election within 30 days of a stock grant", "Investor-ready monthly financials", "Multi-state payroll for remote staff"],
          ko: ["법인 형태 선택(LLC 또는 C corp)", "주식 부여 후 30일 안의 83(b) 신고", "투자자용 월별 재무제표", "다른 주에 있는 직원 급여"],
        },
      },
      {
        id: "education", icon: "cap", link: "svc_3",
        name: { en: "Tutoring & Education", ko: "학원·교육" },
        summary: { en: "Tuition coming in, instructors paid correctly, and payroll filings kept current.", ko: "수강료 입금을 정리하고, 강사 급여를 제대로 구분하고, 급여 신고를 기한 안에 냅니다." },
        points: {
          en: ["Tuition receipts matched to the books", "Instructors: employee or contractor", "Payroll and EDD filings", "Monthly bookkeeping"],
          ko: ["수강료 입금과 장부 대사", "강사 직원/계약자 구분", "급여와 EDD 신고", "월별 장부 정리"],
        },
      },
      {
        id: "nonprofit", icon: "heart", link: "svc_12",
        name: { en: "Nonprofits & Churches", ko: "비영리 단체·교회" },
        summary: { en: "Financial reports the board can read, plus the filings that keep tax-exempt status in good standing.", ko: "이사회나 제직회가 읽을 수 있는 재정 보고서를 만들고, 면세 지위를 지키는 신고를 챙깁니다." },
        points: {
          en: ["Form 990 and California filings (Form 199, RRF-1)", "Pastor pay and housing allowance", "Donation records and board reports", "Applying for tax-exempt status"],
          ko: ["Form 990과 캘리포니아 신고(Form 199, RRF-1)", "목회자 사례비와 주택 수당(Housing Allowance)", "헌금·기부 기록과 재정 보고", "면세 단체 신청"],
        },
      },
    ],
  },
  {
    key: "product",
    label: { en: "Product businesses: retail, distribution, manufacturing", ko: "제품 판매·유통·제조" },
    items: [
      {
        id: "retail", icon: "bag", link: "svc_2",
        name: { en: "Retail Stores", ko: "소매·매장" },
        summary: { en: "Sales tax filed on time and inventory counted so the cost of goods is real, not a guess.", ko: "판매세를 기한 안에 내고, 재고를 실제로 세어 매출원가가 추정이 아닌 숫자가 되게 합니다." },
        points: {
          en: ["CDTFA sales tax returns", "POS sales matched to bank deposits", "Inventory counts and cost of goods sold", "Cash sales handled cleanly"],
          ko: ["CDTFA 판매세 신고", "POS 매출과 은행 입금 대사", "재고 실사와 매출원가", "현금 매출 정리"],
        },
      },
      {
        id: "wholesale", icon: "package", link: "svc_10",
        name: { en: "Wholesale & Import", ko: "도매·수입 유통" },
        summary: { en: "Freight and duties built into inventory cost, resale certificates on file, and payments to overseas suppliers recorded properly.", ko: "운임과 관세를 재고 원가에 넣고, 재판매 증명서를 챙기고, 해외 공급처 송금을 제대로 기록합니다." },
        points: {
          en: ["Landed cost: freight and duties in inventory", "Resale certificates and exempt sales", "Payments to Korean and other overseas suppliers", "Inventory and margin by product line"],
          ko: ["운임·관세를 포함한 재고 원가", "재판매 증명서와 면세 매출 관리", "한국 등 해외 공급처 송금 정리", "제품군별 재고와 마진"],
        },
      },
      {
        id: "manufacturing", icon: "factory", link: "svc_2",
        name: { en: "Manufacturing", ko: "제조" },
        summary: { en: "Product cost that includes materials, labor and overhead, so pricing decisions rest on real numbers.", ko: "재료비, 인건비, 간접비를 넣은 제품 원가를 계산해서 가격 결정이 실제 숫자 위에서 이뤄지게 합니다." },
        points: {
          en: ["Product costing: materials, labor, overhead", "Inventory and work in process", "Equipment depreciation and Section 179", "California partial sales tax exemption on equipment"],
          ko: ["제품 원가 계산(재료비·인건비·간접비)", "재고와 재공품 관리", "장비 감가상각과 Section 179", "제조 장비 판매세 부분 면제 검토"],
        },
      },
      {
        id: "ecommerce", icon: "cart", link: "svc_13",
        name: { en: "Online Sellers (Amazon, Shopify)", ko: "온라인 판매(아마존·쇼피파이)" },
        summary: { en: "Marketplace payouts matched to your books, and a clear answer on which states you owe sales tax in.", ko: "마켓플레이스 정산금을 장부와 맞추고, 어느 주에 판매세 의무가 있는지 분명하게 정리합니다." },
        points: {
          en: ["Amazon and Shopify payouts reconciled", "Sales tax nexus by state", "Inventory held in FBA and 3PL warehouses", "1099-K matched to reported sales"],
          ko: ["아마존·쇼피파이 정산 대사", "주별 판매세 의무(Nexus) 검토", "FBA·3PL 창고 재고 관리", "1099-K와 신고 매출 대조"],
        },
      },
      {
        id: "autodealer", icon: "car", link: "svc_2",
        name: { en: "Auto Dealers", ko: "자동차 딜러" },
        summary: { en: "Each car's real cost, purchase plus reconditioning, tracked from purchase to sale, with sales tax reported correctly.", ko: "차 한 대마다 매입가와 수리비를 더한 실제 원가를 매입부터 판매까지 추적하고, 판매세를 정확히 신고합니다." },
        points: {
          en: ["Vehicle-by-vehicle inventory cost", "CDTFA sales tax on vehicle sales", "Floor plan interest and DMV fees separated", "Profit by vehicle"],
          ko: ["차량별 재고 원가(매입가+수리비)", "차량 판매 CDTFA 판매세 신고", "플로어 플랜 이자와 DMV 수수료 구분", "차량별 이익"],
        },
      },
      {
        id: "apparel", icon: "shirt", link: "svc_2",
        name: { en: "Apparel & Fashion", ko: "의류·패션" },
        summary: { en: "Inventory, import costs and factoring statements reconciled, so you know what each style actually earns.", ko: "재고, 수입 비용, 팩토링 정산을 맞춰서 스타일별로 실제 얼마가 남는지 보이게 합니다." },
        points: {
          en: ["Inventory and cost by style", "Import freight and duties", "Factoring and chargeback reconciliation", "Sewing contractor payments and 1099s"],
          ko: ["스타일별 재고와 원가", "수입 운임과 관세", "팩토링·차지백 정산 대사", "봉제 하청 지급과 1099"],
        },
      },
      {
        id: "food", icon: "jar", link: "svc_2",
        name: { en: "Food Production & Distribution", ko: "식품 제조·유통" },
        summary: { en: "Taxable and non-taxable items sorted for sales tax, and spoilage and returns recorded instead of disappearing.", ko: "판매세 과세·면세 품목을 나누고, 폐기와 반품이 빠지지 않고 기록되게 합니다." },
        points: {
          en: ["Taxable vs. exempt food items", "Spoilage, returns and inventory loss", "Customer invoices matched to payments", "Cost per product"],
          ko: ["과세·면세 품목 구분", "폐기·반품·재고 손실 처리", "납품처 청구서와 입금 대사", "제품별 원가"],
        },
      },
      {
        id: "cosmetics", icon: "bottle", link: "svc_10",
        name: { en: "K-Beauty & Cosmetics", ko: "K-뷰티·화장품 유통" },
        summary: { en: "For brands selling Korean products in the US, wholesale and online: inventory, related-party payments and foreign-owned company filings.", ko: "한국 제품을 미국에서 도매·온라인으로 파는 회사의 재고, 한국 본사와의 거래, 외국인 소유 법인 신고를 봅니다." },
        points: {
          en: ["Inventory across wholesale and online channels", "Transactions with the Korean parent or supplier", "Form 5472 for foreign-owned companies", "Sales tax by channel"],
          ko: ["도매·온라인 채널별 재고", "한국 본사·공급처와의 거래 정리", "외국인 소유 법인 Form 5472", "채널별 판매세"],
        },
      },
    ],
  },
];

const ALL = INDUSTRY_GROUPS.flatMap(g => g.items.map(it => ({ ...it, group: g })));

function IndustryModal({ item, lang, colors, fonts, onClose, navigate }) {
  const closeRef = useRef(null);
  const ko = lang === "ko";
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    if (closeRef.current) closeRef.current.focus({ preventScroll: true });
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const go = (p) => { onClose(); navigate(p); };

  return createPortal(
    <div className="ind-ov" onClick={onClose} role="presentation">
      <div className="ind-dlg" role="dialog" aria-modal="true" aria-labelledby="ind-dlg-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="ind-x" type="button" onClick={onClose} aria-label={ko ? "닫기" : "Close"}>×</button>
        <div className="ind-dlg-head">
          <span className="ind-dlg-ic"><LineIcon name={item.icon} size={26} color={colors.gold} stroke={1.5} /></span>
          <div>
            <div className="ind-dlg-k">{item.group.label[lang]}</div>
            <h3 id="ind-dlg-title" style={{ fontFamily: fonts.display }}>{item.name[lang]}</h3>
          </div>
        </div>
        <p className="ind-dlg-sum">{item.summary[lang]}</p>
        <div className="ind-dlg-lbl">{ko ? "이렇게 돕습니다" : "What I help with"}</div>
        <ul className="ind-dlg-list">
          {item.points[lang].map((p, i) => <li key={i}>{p}</li>)}
        </ul>
        <div className="ind-dlg-btns">
          <button type="button" className="ind-btn-main" onClick={() => go("contact")}>{ko ? "상담 신청하기" : "Request a consultation"}</button>
          {item.link && (
            <button type="button" className="ind-btn-sub" onClick={() => go(item.link)}>{ko ? "관련 서비스 보기 →" : "Related service →"}</button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function IndustryPicker({ lang, colors, fonts, navigate, openId, setOpenId }) {
  const ko = lang === "ko";
  const open = ALL.find(it => it.id === openId);
  return (
    <div className="ind-pick">
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, color: colors.navy, marginBottom: 6 }}>
        {ko ? "함께 일하는 업종" : "Industries I work with"}
      </h3>
      <p className="ind-hint">{ko ? "업종을 누르면 어떤 일을 돕는지 볼 수 있습니다." : "Tap an industry to see what I help with."}</p>
      {INDUSTRY_GROUPS.map(g => (
        <div key={g.key} className="ind-group">
          <div className="ind-group-k">{g.label[lang]}</div>
          <div className="ind-grid">
            {g.items.map(it => (
              <button key={it.id} type="button" className="ind-chip" onClick={() => setOpenId(it.id)} aria-haspopup="dialog">
                <LineIcon name={it.icon} size={22} color={colors.gold} stroke={1.5} />
                <span className="ind-chip-t">{it.name[lang]}</span>
                <span className="ind-chip-a" aria-hidden="true">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      {open && <IndustryModal item={open} lang={lang} colors={colors} fonts={fonts} navigate={navigate} onClose={() => setOpenId(null)} />}
    </div>
  );
}
