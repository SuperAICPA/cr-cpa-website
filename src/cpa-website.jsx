import { useState, useEffect, useRef, useCallback } from "react";
import ReviewsSection from "./components/ReviewsSection";

const translations = {
  en: {
    nav: { home: "Home", services: "Services", about: "About", resources: "Resources", contact: "Contact" },
    hero: {
      tagline: "Precision. Integrity. Growth.",
      subtitle: "Trusted CPA & Consulting Services for Discerning Clients",
      cta: "Schedule a Consultation",
      ctaSecondary: "Our Services",
      valueFocus: "We focus on professional excellence to maximize our clients' value"
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
          title: "Tax Services",
          desc: "Complete tax solutions for individuals and businesses — from annual preparation and strategic planning to complex resolution and international compliance across all 50 states.",
          icon: "📊",
          features: ["Individual & Business Tax Preparation", "Tax Resolution (IRS & FTB)", "International Tax Compliance (FBAR/FATCA)", "Multi-State Tax Filing", "Tax Planning & Strategy"]
        },
        {
          title: "Bookkeeping & Payroll",
          desc: "Keep your financials clean and your team paid on time. We handle the day-to-day so you can focus on growing your business.",
          icon: "📒",
          features: ["Monthly / Quarterly Bookkeeping", "Payroll Processing & Compliance", "Financial Statement Preparation", "Accounts Payable & Receivable", "Cloud Accounting Setup (QBO)"]
        },
        {
          title: "Business Formation & Consulting",
          desc: "From entity selection and incorporation to ongoing strategic guidance — we help you build and grow on a solid foundation.",
          icon: "💼",
          features: ["Entity Selection & Formation (LLC, S-Corp, C-Corp)", "Business Valuations", "Growth Strategy & Advisory", "SBA & Commercial Loan Support", "Mergers & Acquisitions Support"]
        },
        {
          title: "Forensic Accounting & Litigation Support",
          desc: "Expert financial analysis for legal proceedings. We provide detailed, court-ready reports and serve as expert witnesses when your case demands precision.",
          icon: "🔍",
          features: ["Damages Calculation & Analysis", "Expert Witness Testimony", "Construction Dispute Accounting", "Partnership & Shareholder Disputes", "Fraud Investigation & Detection"]
        },
        {
          title: "Bilingual CPA Services",
          desc: "Fully bilingual (Korean & English) professional services designed for the Korean-American business community. We bridge language and cultural gaps in financial management.",
          icon: "🌐",
          features: ["Korean & English Tax Consultation", "Immigrant Tax Planning (FBAR/FATCA)", "Cross-Border Business Advisory", "Korean Community Business Support", "Bilingual Financial Reporting"]
        }
      ]
    },
    industrySpotlight: {
      title: "Industry Spotlight",
      subtitle: "Deep expertise where it matters most",
      construction: {
        title: "Construction Companies",
        desc: "We understand the unique financial complexities of construction — from job costing to subcontractor compliance. Our dedicated construction accounting practice helps contractors stay profitable and compliant.",
        features: ["Job Costing & Project-Based Accounting", "Subcontractor 1099 Compliance", "Progress Billing & WIP Reporting", "Cost Accounting Procedures", "Construction-Specific Tax Strategy"]
      },
      bbq: {
        title: "BBQ Franchise & Multi-Location Restaurants",
        desc: "Managing finances across multiple restaurant locations requires specialized expertise. We help franchise operators and multi-unit owners gain clarity on per-location profitability and streamline operations.",
        features: ["Multi-Location Financial Consolidation", "Food Cost Analysis & Optimization", "Franchise Royalty & Fee Management", "Per-Location P&L Reporting", "Restaurant-Specific Tax Planning"]
      }
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
      credentials: "Licensed CPA · Los Angeles, California",
      industriesTitle: "Industries We Serve",
      industries: [
        { icon: "🏗️", name: "Construction & Contractors" },
        { icon: "🍽️", name: "Restaurants & Food Service" },
        { icon: "🏥", name: "Healthcare & Medical" },
        { icon: "🚛", name: "Trucking & Transportation" },
        { icon: "🛍️", name: "Retail & Wholesale" },
        { icon: "🏠", name: "Real Estate & Property" },
        { icon: "💇", name: "Beauty & Personal Care" },
        { icon: "💻", name: "Technology & Startups" }
      ]
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
        serviceOptions: ["Tax Services", "Bookkeeping & Payroll", "Business Formation & Consulting", "Forensic Accounting", "Bilingual CPA Services", "Other"],
        message: "Tell us about your needs",
        submit: "Request Consultation",
        success: "Thank you! We'll be in touch within 24 hours."
      },
      multilingualTitle: "We Welcome Your Inquiry in Any Language",
      multilingualSubtitle: "We respond to written inquiries in the following languages"
    },
    footer: {
      tagline: "Your Trusted Financial Partner",
      rights: "© 2025 CR Accountancy and Consulting. All rights reserved.",
      disclaimer: "Danny Kim, CPA · Licensed in the State of California"
    }
  },
  ko: {
    nav: { home: "홈", services: "서비스", about: "소개", resources: "고객자료실", contact: "연락처" },
    hero: {
      tagline: "정확함. 신뢰. 성장.",
      subtitle: "신뢰할 수 있는 CPA & 컨설팅 서비스",
      cta: "상담 예약하기",
      ctaSecondary: "서비스 보기",
      valueFocus: "우리는 고객의 가치를 높이기 위한 전문성에 집중합니다"
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
          title: "세무 서비스",
          desc: "개인 및 법인을 위한 종합 세무 서비스 — 연간 세금 신고부터 전략적 절세, 복잡한 세무 분쟁 해결, 국제 세무 컴플라이언스까지.",
          icon: "📊",
          features: ["개인 및 법인 세금 신고", "세무 분쟁 해결 (IRS & FTB)", "국제 세무 컴플라이언스 (FBAR/FATCA)", "다주(多州) 세금 신고", "절세 전략 수립"]
        },
        {
          title: "장부 관리 & 급여",
          desc: "재무 장부를 정확하게, 급여를 제때 처리합니다. 일상적인 회계 업무는 저희가 맡겠습니다.",
          icon: "📒",
          features: ["월간 / 분기별 장부 관리", "급여 처리 및 컴플라이언스", "재무제표 작성", "매입/매출 채권 관리", "클라우드 회계 설정 (QBO)"]
        },
        {
          title: "법인 설립 & 경영 컨설팅",
          desc: "법인 형태 선택과 설립부터 지속적인 전략 자문까지 — 탄탄한 기반 위에 사업을 성장시킵니다.",
          icon: "💼",
          features: ["법인 설립 및 구조화 (LLC, S-Corp, C-Corp)", "기업 가치 평가", "성장 전략 및 자문", "SBA 및 상업 대출 지원", "M&A 지원"]
        },
        {
          title: "포렌식 회계 & 소송 지원",
          desc: "법적 절차를 위한 전문 재무 분석. 법원에 제출 가능한 상세 보고서를 작성하고, 필요 시 전문가 증인으로 활동합니다.",
          icon: "🔍",
          features: ["손해액 산정 및 분석", "전문가 증인 활동", "건설 분쟁 회계", "파트너십 및 주주 분쟁", "부정행위 조사 및 탐지"]
        },
        {
          title: "이중 언어 CPA 서비스",
          desc: "한영 이중 언어 전문 서비스로 한인 비즈니스 커뮤니티를 위해 설계되었습니다. 재무 관리에서 언어와 문화적 장벽을 해소합니다.",
          icon: "🌐",
          features: ["한영 이중 언어 세무 상담", "이민자 세무 계획 (FBAR/FATCA)", "한미 간 비즈니스 자문", "한인 커뮤니티 사업 지원", "이중 언어 재무 보고"]
        }
      ]
    },
    industrySpotlight: {
      title: "산업별 전문 서비스",
      subtitle: "가장 중요한 분야에서의 깊은 전문성",
      construction: {
        title: "건설 회사",
        desc: "건설업 특유의 복잡한 재무 구조를 이해합니다. 프로젝트별 원가 관리부터 하청업체 컴플라이언스까지, 시공사의 수익성과 규정 준수를 돕습니다.",
        features: ["프로젝트별 원가 회계 (Job Costing)", "하청업체 1099 컴플라이언스", "기성 청구 및 WIP 보고", "원가 회계 절차 수립", "건설업 특화 세무 전략"]
      },
      bbq: {
        title: "BBQ 프랜차이즈 & 다점포 식당",
        desc: "다수 매장의 재무를 관리하려면 전문적인 경험이 필요합니다. 프랜차이즈 운영자와 다점포 오너가 매장별 수익성을 명확히 파악하고 운영을 효율화할 수 있도록 돕습니다.",
        features: ["다점포 재무 통합 보고", "식재료 원가 분석 및 최적화", "프랜차이즈 로열티 및 수수료 관리", "매장별 손익 보고", "외식업 특화 세무 계획"]
      }
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
      credentials: "공인회계사(CPA) · 캘리포니아 로스앤젤레스",
      industriesTitle: "서비스 업종",
      industries: [
        { icon: "🏗️", name: "건설 및 시공업" },
        { icon: "🍽️", name: "식당 및 요식업" },
        { icon: "🏥", name: "병원 및 의료업" },
        { icon: "🚛", name: "트럭킹 및 운송업" },
        { icon: "🛍️", name: "소매 및 도매업" },
        { icon: "🏠", name: "부동산 및 임대업" },
        { icon: "💇", name: "뷰티 및 개인 서비스" },
        { icon: "💻", name: "IT 및 스타트업" }
      ]
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
        serviceOptions: ["세무 서비스", "장부 관리 & 급여", "법인 설립 & 경영 컨설팅", "포렌식 회계", "이중 언어 CPA 서비스", "기타"],
        message: "문의 내용을 입력해 주세요",
        submit: "상담 신청하기",
        success: "감사합니다! 24시간 이내에 연락드리겠습니다."
      },
      multilingualTitle: "어떤 언어로든 문의해 주세요",
      multilingualSubtitle: "아래 언어로 서면 문의에 응대합니다"
    },
    footer: {
      tagline: "신뢰할 수 있는 재무 파트너",
      rights: "© 2025 CR Accountancy and Consulting. All rights reserved.",
      disclaimer: "Danny Kim, CPA · 캘리포니아 공인회계사"
    }
  }
};

// ============================================================
// 13 SERVICE SUBPAGE DATA
// ============================================================
const serviceDetails = [
  {
    id: "svc_1", icon: "📊", category: "CORE TAX & ACCOUNTING",
    title: { en: "Tax Preparation", ko: "세금 신고" },
    tagline: { en: "Accurate filing, maximum savings.", ko: "정확한 신고, 최대 절세 — 모든 유형의 세금 신고를 한 곳에서." },
    intro: { en: "From individuals to complex multi-entity structures, CR Accountancy handles federal, state, and California tax returns accurately and strategically.", ko: "개인부터 복잡한 다중 법인 구조까지, CR Accountancy는 연방·주·캘리포니아 세금 신고를 정확하고 전략적으로 처리합니다. 단순 신고에 그치지 않고 매년 절세 기회를 발굴하고 다음 해를 위한 플랜을 함께 수립합니다." },
    items: [
      { en: "Individual Tax Return", ko: "Individual Tax Return — Form 1040 및 각종 Schedule 신고. W-2, 1099, 부동산·투자 소득 등 다양한 소득 유형 처리." },
      { en: "Business Tax Return", ko: "Business Tax Return — S-Corp (1120-S), Partnership (1065), C-Corp (1120), LLC, Schedule C 신고. 사업체 구조에 맞는 절세 전략 적용." },
      { en: "Nonprofit Tax Return", ko: "Nonprofit Tax Return — Form 990 / 990-EZ / 990-N 신고. 면세 지위(Tax-Exempt Status) 유지를 위한 컴플라이언스 관리." },
      { en: "Trust Tax Return", ko: "Trust Tax Return — Form 1041 신고. 신탁 소득의 수익자(Beneficiary) 배분 처리 및 Schedule K-1 발행." },
      { en: "State & Multi-State Tax", ko: "State & Local Tax — California FTB 신고 포함 멀티 주 세금 신고. 거주지 변경 및 비거주자 소득 처리." },
      { en: "Tax Planning", ko: "Tax Planning — 연간 세금 최소화 전략, 분기별 예납세(Estimated Tax) 계산 및 개인·사업체 통합 플래닝." },
      { en: "Amended Returns", ko: "Amended Returns — 과거 신고 오류 수정 (Form 1040-X). 누락된 공제 항목 추가로 환급 극대화." },
      { en: "Foreign Income & FBAR", ko: "Foreign Income & FBAR — 해외 금융계좌 신고 (FBAR, FATCA), 해외 소득 및 외국세액공제 처리." }
    ],
    process: [
      { en: "Initial Consultation", ko: "초기 상담 — 고객의 소득 유형, 사업 구조, 특이 사항을 파악하여 맞춤 견적을 제공합니다." },
      { en: "Document Collection", ko: "서류 수집 — 필요 서류 체크리스트를 제공하고 안전한 포털을 통해 서류를 수신합니다." },
      { en: "Return Preparation", ko: "세금 신고서 작성 — 검토 후 세금 신고서를 작성하고 공제 항목을 최대한 적용합니다." },
      { en: "Client Review & Signature", ko: "고객 검토 및 서명 — 작성된 신고서를 고객에게 설명하고 전자 서명 후 최종 제출합니다." },
      { en: "Filing & Follow-up", ko: "제출 및 사후 관리 — IRS/FTB에 전자 신고 후 접수 확인서를 제공하며, 이후 문의도 지속 지원합니다." }
    ],
    docs: ["W-2 (Employment Income)", "1099-NEC / 1099-MISC", "1099-INT / 1099-DIV", "1098 (Mortgage Interest)", "Schedule K-1", "Prior Year Tax Returns", "Rental Income Records", "Business Income/Expense Records", "Foreign Account Information"],
    faq: [
      { q: { en: "Does a nonprofit need to file taxes annually?", ko: "비영리재단도 매년 세금 신고를 해야 하나요?" }, a: { en: "Yes. Tax-exempt organizations must file Form 990 annually. Missing 3 consecutive years results in automatic revocation of tax-exempt status.", ko: "네, 세금 면제(Tax-Exempt) 단체도 매년 Form 990 시리즈를 IRS에 제출해야 합니다. 3년 연속 미신고 시 면세 지위가 자동 취소됩니다." } },
      { q: { en: "Does a Revocable Trust need a separate tax filing?", ko: "Revocable Trust는 별도로 세금 신고를 해야 하나요?" }, a: { en: "A living revocable trust is included in the grantor's 1040 during their lifetime. After death, a separate Form 1041 is required.", ko: "생전 신탁(Revocable Living Trust)은 설정자(Grantor)가 살아있는 동안 별도 신고 없이 개인 1040에 포함됩니다. 설정자 사망 후는 별도 Form 1041 신고가 필요합니다." } },
      { q: { en: "When are filing deadlines?", ko: "신고 마감일은 언제인가요?" }, a: { en: "Individual (1040) and Trust (1041) deadlines are April 15. Nonprofit (990) is 5.5 months after fiscal year end. Extensions are available.", ko: "개인(1040)·Trust(1041) 마감은 4월 15일, 비영리(990) 마감은 회계연도 종료 후 5개월 15일입니다. Extension 신청으로 각각 연장 가능합니다." } }
    ]
  },
  {
    id: "svc_2", icon: "📒", category: "CORE TAX & ACCOUNTING",
    title: { en: "Bookkeeping & Accounting", ko: "장부 관리 & 회계" },
    tagline: { en: "Clean books, clear insights — so you can focus on your business.", ko: "정확한 장부, 명확한 숫자 — 사업주가 숫자가 아닌 사업에 집중할 수 있도록." },
    intro: { en: "Accurate bookkeeping is the foundation of a healthy business. We handle everything from monthly financial statements to cloud-based real-time bookkeeping.", ko: "정확한 장부 관리는 건강한 사업의 기본입니다. 월별 재무제표 작성부터 클라우드 기반 실시간 장부 관리까지, 사업주가 숫자가 아닌 사업에 집중할 수 있도록 지원합니다." },
    items: [
      { en: "Monthly Bookkeeping", ko: "월별 장부 관리 — 수입·지출 분류, 은행 계좌 조정(Bank Reconciliation), 월별 결산 처리." },
      { en: "Financial Statements", ko: "재무제표 작성 — 손익계산서, 대차대조표, 현금흐름표 월별·분기별·연간 작성." },
      { en: "QuickBooks Setup & Management", ko: "QuickBooks — 클라우드 회계 소프트웨어 설정, 정리, 마이그레이션 및 교육." },
      { en: "Catch-up Bookkeeping", ko: "Catch-up Bookkeeping — 수개월 또는 수년치 누락된 장부를 정리하는 서비스." },
      { en: "AR / AP Management", ko: "매출채권·매입채무 (AR/AP) — 인보이스 발행 및 결제 추적." },
      { en: "Tax Preparation Link", ko: "세금 준비 연계 — 연간 세금 신고를 위한 장부 데이터 정리 및 CPA 연계 처리." }
    ],
    process: [
      { en: "Current Assessment", ko: "현황 파악 — 현재 장부 상태, 사용 중인 소프트웨어, 거래 규모를 파악합니다." },
      { en: "System Setup", ko: "시스템 구축 — QuickBooks 계정 설정 및 차트 오브 어카운트(COA) 구성." },
      { en: "Monthly Processing", ko: "월별 정기 처리 — 매월 거래 분류, 은행 조정, 재무제표 작성 후 보고." },
      { en: "Quarterly Review", ko: "분기별 리뷰 — 재무 성과 검토 및 세금 준비를 위한 분기 결산." }
    ],
    docs: ["Bank Statements", "Credit Card Statements", "Invoices / Receipts", "Payroll Records", "Prior Year Tax Returns", "Existing QuickBooks File"],
    faq: [
      { q: { en: "Do I have to use QuickBooks?", ko: "QuickBooks를 사용하지 않아도 되나요?" }, a: { en: "No. We support Excel, Wave, Xero and other platforms. We can help migrate to the optimal software.", ko: "네. Excel, Wave, Xero 등 다양한 플랫폼을 지원하며, 필요시 최적의 소프트웨어로 마이그레이션을 도와드립니다." } },
      { q: { en: "How long does catch-up bookkeeping take?", ko: "Catch-up Bookkeeping 기간은 얼마나 걸리나요?" }, a: { en: "Typically 1–4 weeks depending on transaction volume. We'll provide a timeline estimate at the initial consultation.", ko: "거래 규모에 따라 다르지만 일반적으로 1~4주 내 완료됩니다. 초기 상담 시 일정을 안내해드립니다." } },
      { q: { en: "How is the monthly fee determined?", ko: "월 비용은 어떻게 되나요?" }, a: { en: "Fees are based on the number of monthly transactions and complexity. We provide a custom quote after the initial consultation.", ko: "월 거래 건수 및 복잡도에 따라 책정됩니다. 초기 상담 후 맞춤 견적을 제공합니다." } }
    ]
  },
  {
    id: "svc_3", icon: "💰", category: "CORE TAX & ACCOUNTING",
    title: { en: "Payroll Management", ko: "급여 관리" },
    tagline: { en: "Complex payroll compliance, handled by experts.", ko: "복잡한 급여 컴플라이언스, 전문가에게 맡기세요." },
    intro: { en: "We professionally manage payroll tax filings, compliance, and all federal and state reporting obligations — from hiring to termination.", ko: "급여 처리의 복잡한 세금 신고, 컴플라이언스, 연방 및 주 보고 의무를 전문적으로 대행합니다. 직원 채용부터 퇴직까지 전 과정을 지원합니다." },
    items: [
      { en: "Payroll Processing", ko: "급여 처리 — 주급·격주급·월급 처리. 직접 입금(Direct Deposit) 설정 및 실행." },
      { en: "Payroll Tax Filing", ko: "Payroll Tax 신고 — 941(분기), 940(연간 FUTA), W-2 및 1099 발행." },
      { en: "California Compliance", ko: "California 컴플라이언스 — CA DE-9, DE-9C, EDD 등록 및 보고. SUI, SDI 처리." },
      { en: "New Employee Onboarding", ko: "신규 직원 온보딩 — I-9, W-4, DE-4 서류 처리 및 New Hire 보고." },
      { en: "1099 Processing", ko: "1099 처리 — 독립 계약자(Independent Contractor)에 대한 1099-NEC 발행 및 보고." },
      { en: "Garnishment Handling", ko: "Garnishment 처리 — 임금 압류(Wage Garnishment), IRS/FTB 레비 대응 및 처리." }
    ],
    process: [
      { en: "Company Setup", ko: "회사 정보 등록 — EIN, CA 고용주 계좌, 직원 정보, 급여 일정 등 초기 설정." },
      { en: "Regular Payroll Run", ko: "정기 급여 실행 — 지정된 급여일에 맞춰 급여를 계산하고 직접 입금 처리." },
      { en: "Tax Deposits", ko: "세금 납부 — 연방·주 Payroll Tax를 해당 기한 내 자동 납부." },
      { en: "Quarterly & Annual Filing", ko: "분기·연간 신고 — 941, 940, DE-9 분기 신고 및 W-2/1099 연간 발행." }
    ],
    docs: ["EIN Documentation", "Employee W-4 / DE-4", "Bank Account Info (Direct Deposit)", "Payroll History", "Prior 941/940 Returns", "CA EDD Account Information"],
    faq: [
      { q: { en: "How many employees do you need to start?", ko: "몇 명부터 서비스가 가능한가요?" }, a: { en: "We serve businesses from 1-person owners to 50+ employees.", ko: "1인 기업(오너 급여)부터 50인 이상 규모까지 모두 지원합니다." } },
      { q: { en: "Can I switch from my current payroll system?", ko: "기존 급여 시스템에서 전환이 가능한가요?" }, a: { en: "Yes. We support data migration from Gusto, ADP, Paychex, and other platforms.", ko: "네. Gusto, ADP, Paychex 등 기존 플랫폼에서의 데이터 마이그레이션을 지원합니다." } },
      { q: { en: "Can you handle California's complex payroll laws?", ko: "California 급여 법규가 복잡한데 처리 가능한가요?" }, a: { en: "Yes. We specialize in CA labor law compliance including minimum wage, overtime, SDI, and SUI requirements.", ko: "California 노동법 및 EDD 규정에 따른 컴플라이언스를 전문적으로 처리합니다. 최저임금, 오버타임, SDI, SUI 등 CA 특수 사항 포함." } }
    ]
  },
  {
    id: "svc_4", icon: "⚖️", category: "CORE TAX & ACCOUNTING",
    title: { en: "Tax Resolution", ko: "세금 분쟁 해결" },
    tagline: { en: "Before meeting an IRS officer — contact CR Accountancy first.", ko: "IRS 담당자를 만나기 전에, 먼저 CR Accountancy에 연락하세요." },
    intro: { en: "We professionally resolve IRS, FTB, and CDTFA tax issues. If you received an audit notice, had wages garnished, or have a tax lien — you need immediate consultation.", ko: "IRS·FTB·CDTFA 세금 문제를 전문적으로 해결합니다. 감사 통지를 받았다면, 임금이 동결되었다면, 세금 체권이 설정되었다면 즉시 상담이 필요합니다. 감사 대응부터 체권 해제까지 원스톱으로 처리합니다." },
    items: [
      { en: "IRS / FTB Audit Representation", ko: "IRS / FTB 감사 대응 — IRS 및 CA FTB 세무조사에 CPA 자격으로 대리인 역할 수행. 서류 준비부터 조사관 연락 창구까지." },
      { en: "CDTFA Sales Tax Audit", ko: "CDTFA 판매세 감사 — California 판매세·사용세 감사 대응. 소매업·음식점·제조업체 전문." },
      { en: "Offer in Compromise", ko: "Offer in Compromise — IRS 채무 조정 협상. 납부 의무 금액을 실질적으로 줄일 수 있는 조건을 분석하고 신청 대행." },
      { en: "Installment Agreement", ko: "Installment Agreement — 세금 분할 납부 협의. IRS/FTB와 월납 계획을 협상." },
      { en: "Wage Garnishment Release", ko: "Wage Garnishment Release — 임금 압류 해제. 고용주 연락 창구 차단 및 해제 절차 진행." },
      { en: "Bank Levy Release", ko: "Bank Levy Release — 은행 계좌 동결 해제. 신속한 대응으로 자금 접근성 복구." },
      { en: "Tax Lien Response", ko: "Tax Lien 대응 — IRS/FTB 세금 담보(Federal/State Tax Lien) 해제 전략 수립 및 대응." },
      { en: "Delinquent Returns", ko: "Delinquent Returns — 연체된 세금 신고서 작성 및 제출. IRS Voluntary Disclosure 프로그램 연계." }
    ],
    process: [
      { en: "Problem Assessment", ko: "문제 파악 — IRS/FTB 통지서, 체납 내역 등을 확인하고 상황을 정확히 파악합니다." },
      { en: "Strategy Development", ko: "대응 전략 수립 — Offer in Compromise, 분할 납부, 콜렉션 유예(CNC) 등 최적 대안을 선정합니다." },
      { en: "IRS/FTB Representation", ko: "IRS/FTB 대리 — CPA 자격으로 납세자 대리인 역할 수행. 고객이 직접 담당자를 만날 필요 없음." },
      { en: "Resolution & Follow-up", ko: "해결 및 사후 관리 — 문제 해결 후 미래 컴플라이언스 유지를 위한 세무 플래닝 지원." }
    ],
    docs: ["Original IRS/FTB Notice", "CP2000 / CP3219A or Other Letters", "Tax Balance Verification", "CDTFA Audit Notice", "Prior Year Tax Records", "Asset / Property List"],
    faq: [
      { q: { en: "An IRS Revenue Officer visited — what should I do?", ko: "IRS 담당자(Revenue Officer)가 방문했는데 어떻게 해야 하나요?" }, a: { en: "Contact us immediately. Having a CPA as your representative provides significant advantages during Revenue Officer interactions.", ko: "즉시 연락주세요. Revenue Officer 접촉 시 CPA가 대리인으로 동석하면 서류 요청 및 입장에서 유리한 결과를 얻을 수 있습니다." } },
      { q: { en: "Does everyone qualify for Offer in Compromise?", ko: "Offer in Compromise는 누구나 되나요?" }, a: { en: "You must meet IRS criteria (ability to pay, income, assets). We'll evaluate your eligibility in the consultation.", ko: "IRS가 정한 자격 요건(지불 능력, 소득, 자산 등)을 충족해야 합니다. 상담을 통해 신청 가능성을 먼저 확인해 드립니다." } },
      { q: { en: "My business is at risk due to unpaid sales tax — what can I do?", ko: "판매세 미납으로 사업이 위기라면?" }, a: { en: "Contact us quickly. We can pursue Installment Agreements or Currently Not Collectible status to protect your business.", ko: "신속하게 연락 주세요. Installment Agreement 또는 Currently Not Collectible 신청이 가능합니다." } }
    ]
  },
  {
    id: "svc_5", icon: "🏢", category: "CORE TAX & ACCOUNTING",
    title: { en: "Business Formation", ko: "법인 설립" },
    tagline: { en: "Starting with the right structure is your best tax strategy.", ko: "올바른 구조로 시작하는 것이 가장 큰 절세입니다." },
    intro: { en: "We guide you from entity selection and registration to tax account setup. Choosing the right entity type directly impacts your future taxes and legal protection.", ko: "사업 유형 결정부터 설립 등록, 세무 계좌 개설까지 전 과정을 지원합니다. Entity 선택은 향후 세금과 법적 보호에 직결되므로, 창업 초기에 올바른 설계가 가장 중요합니다." },
    items: [
      { en: "LLC Formation", ko: "LLC 설립 — 단일·다수 회원 LLC 구성. Operating Agreement 작성 및 캘리포니아 SOS 등록." },
      { en: "S-Corp & C-Corp", ko: "S-Corp 및 C-Corp — 주주 구성, 바이론, 급여 설정. S-Corp 선출 (Form 2553) 지원." },
      { en: "Partnership", ko: "Partnership — General / Limited Partnership 설립. 동업자간 Partnership Agreement 작성 지원." },
      { en: "Nonprofit (501c3)", ko: "Nonprofit (501c3) — Form 1023 작성 및 IRS 면세 지위 신청 대행. CA AG 등록 포함." },
      { en: "EIN Registration", ko: "EIN 등록 — 연방 고용주 식별번호(EIN) IRS 신청 및 안내." },
      { en: "CA Business License & Registration", ko: "CA Business License 및 등록 — City/County Business License 및 CA Secretary of State 등록 지원." }
    ],
    process: [
      { en: "Entity Type Decision", ko: "Entity 타입 결정 — 세금 효율, 법적 보호, 투자자 유치 등 목표에 따라 최적 구조를 추천합니다." },
      { en: "Document Preparation", ko: "구성 서류 작성 — Articles of Organization/Incorporation, Operating Agreement, Bylaws 등 작성 지원." },
      { en: "EIN & Tax Account Setup", ko: "EIN 및 세무 계좌 개설 — EIN 신청, CA 보드 등록, 판매세 퍼밋 등." },
      { en: "System Integration", ko: "시스템 구축 연계 — 회계 시스템, 페이롤, 은행 계좌 설정 등 초기 지원." }
    ],
    docs: ["Owner ID / Identification", "Proof of State Residency", "Proposed Business Name", "Existing Business Plan", "Investor / Partner Information"],
    faq: [
      { q: { en: "Which entity should I choose?", ko: "어떤 Entity를 선택해야 하나요?" }, a: { en: "LLC offers flexibility and simplicity; S-Corp excels at reducing self-employment tax. The best structure depends on size, investor plans, and income level.", ko: "LLC는 유연성과 단순함, S-Corp은 Self-employment Tax를 줄이고 급여와 배당으로 소득을 분리하는 절세 전환이 가능합니다. 사업 규모, 투자자 유치 계획, 소득 수준에 따라 최적 구조가 달라집니다." } },
      { q: { en: "Do you help Korean businesses expanding to the US?", ko: "한국에서 미국으로 사업을 확장하는 경우도 지원하나요?" }, a: { en: "Yes. We provide bilingual support for Korean company US incorporation, tax structure, and operations.", ko: "네. 한국 기업의 미국 법인 설립, 세무 구조, 운영 자문까지 bilingual로 지원합니다." } }
    ]
  },
  {
    id: "svc_6", icon: "💼", category: "BUSINESS & FINANCIAL ADVISORY",
    title: { en: "Business Consulting", ko: "비즈니스 컨설팅" },
    tagline: { en: "A practical business partner grounded in numbers.", ko: "숫자에 기반한 실질적인 비즈니스 파트너." },
    intro: { en: "From startup structure design to growth strategy and M&A support — we provide actionable business advisory beyond accounting.", ko: "창업 구조 설계부터 사업 확장 전략, M&A 지원까지 — 숫자에 기반한 실질적인 비즈니스 자문을 제공합니다. 단순한 회계사를 넘어 사업 파트너로서 성장을 함께합니다." },
    items: [
      { en: "Entity Structure Design", ko: "Entity 구조 설계 — LLC, S-Corp, C-Corp, Partnership — 세금 효율과 법적 보호를 고려한 최적 구조 선택." },
      { en: "Business Plan Preparation", ko: "사업 계획서 작성 — 투자자·은행 제출용 사업 계획서 및 재무 프로젝션 작성." },
      { en: "Cash Flow Management", ko: "Cash Flow 관리 — 현금흐름 분석, 예측 모델 수립 및 단기·장기 자금 계획." },
      { en: "Cost & Profitability Analysis", ko: "원가 분석·수익성 — 제품·서비스별 원가 구조 분석 및 가격 전략 수립." },
      { en: "M&A Advisory", ko: "M&A 자문 — 사업체 인수·매각 시 실사(Due Diligence), 기업가치 평가, 구조 협상 지원." },
      { en: "SBA Loan Support", ko: "SBA 대출 지원 — SBA 7(a), 504 대출 신청을 위한 재무제표 준비 및 대출 패키지 작성." }
    ],
    process: [
      { en: "Business Diagnosis", ko: "사업 현황 진단 — 재무 구조, 사업 모델, 성장 목표를 심층 분석합니다." },
      { en: "Strategy Development", ko: "전략 수립 — 진단 결과를 바탕으로 단기·중기·장기 실행 계획을 수립합니다." },
      { en: "Execution Support", ko: "실행 지원 — 전략 실행 단계에서 재무 데이터 기반의 의사결정을 지원합니다." },
      { en: "Performance Monitoring", ko: "성과 모니터링 — KPI 설정 및 주기적 리뷰를 통해 목표 달성도를 추적합니다." }
    ],
    docs: ["Last 3 Years of Financial Statements", "Tax Returns", "Business Registration Documents", "Existing Contracts / Leases", "Bank Statements (3–6 months)", "Business Plan Materials"],
    faq: [
      { q: { en: "Do I need consulting in the early startup stage?", ko: "창업 초기 단계에서도 컨설팅이 필요한가요?" }, a: { en: "Especially yes — early entity selection and accounting system setup have a huge impact on future tax savings and legal protection.", ko: "특히 창업 초기 Entity 선택과 회계 시스템 구축이 향후 세금 절세와 법적 보호에 큰 영향을 미칩니다. 초기 설계가 가장 중요합니다." } },
      { q: { en: "Are there referral fees for SBA loans?", ko: "SBA 대출 소개 수수료가 있나요?" }, a: { en: "Consulting fees are charged as a fixed amount — never as a percentage of the loan.", ko: "컨설팅 수수료는 고정 금액으로 별도 청구되며, 대출 금액의 퍼센트 형태로는 받지 않습니다." } }
    ]
  },
  {
    id: "svc_7", icon: "📈", category: "BUSINESS & FINANCIAL ADVISORY",
    title: { en: "Financial Advisory & Wealth Planning", ko: "재무 자문 & 자산 플래닝" },
    tagline: { en: "Comprehensive financial advisory from a CPA who understands taxes.", ko: "세금을 이해하는 CPA의 종합 재무 자문." },
    intro: { en: "Comprehensive financial advisory for individuals and families — from retirement planning and investment structure to tax-efficient asset allocation.", ko: "개인과 가족의 재무 목표 달성을 위한 종합 재무 자문 서비스. 은퇴 계획, 투자 구조, 세금 효율적인 자산 배분까지 — 장기적 재정 건전성을 위한 파트너가 됩니다." },
    items: [
      { en: "Retirement Planning", ko: "은퇴 계획 — 401(k), IRA, Roth IRA, SEP-IRA 등 은퇴 계좌 전략 수립 및 절세 최적화." },
      { en: "Family Legacy Planning", ko: "Family Legacy Planning — Trust, 유언장, 생전 증여 전략을 통한 차세대 자산 이전 계획." },
      { en: "Tax-Efficient Investing", ko: "세금 효율적 투자 — 자산 배분 구조를 세금 관점에서 최적화. Capital Gain 관리 전략." },
      { en: "Real Estate Financial Advisory", ko: "부동산 재무 자문 — 투자 부동산 취득·처분·교환(1031 Exchange) 전략 및 세무 처리." },
      { en: "Insurance & Risk Management", ko: "보험·리스크 관리 — 생명보험, 장애보험을 활용한 재무 리스크 대비 전략." },
      { en: "Wealth Transfer", ko: "Wealth Transfer — Estate Tax 최소화를 위한 증여 전략, GRAT, IDGT, FLP 구조 자문." }
    ],
    process: [
      { en: "Financial Assessment", ko: "재무 현황 분석 — 자산, 부채, 현금흐름, 보험, 은퇴 계좌 등 전반적인 재무 현황을 파악합니다." },
      { en: "Goal Setting", ko: "목표 설정 — 단기·중기·장기 재무 목표를 구체화하고 우선순위를 설정합니다." },
      { en: "Comprehensive Plan", ko: "종합 계획 수립 — 세금, 투자, 은퇴, 상속을 통합한 맞춤형 재무 계획서를 작성합니다." },
      { en: "Annual Review", ko: "정기 리뷰 — 연간 또는 생애 주요 이벤트 시 계획을 업데이트합니다." }
    ],
    docs: ["Recent Tax Returns", "Bank / Investment Account Statements", "Real Estate Holdings", "Life Insurance Policies", "Retirement Account Balances", "Trust / Will Copies"],
    faq: [
      { q: { en: "Does a CPA provide investment advice?", ko: "CPA가 투자 자문도 하나요?" }, a: { en: "We advise on tax-efficient asset structure and financial planning. Securities investment recommendations require a separate license, and we collaborate with qualified specialists.", ko: "CPA로서 세금 효율적 자산 구조와 재무 계획을 자문합니다. 증권 투자 추천은 별도 라이선스 영역이므로, 필요시 적합한 전문가와 협력합니다." } },
      { q: { en: "Can you advise on 1031 Exchange?", ko: "1031 Exchange 자문도 가능한가요?" }, a: { en: "Yes. We advise on tax deferral strategies through like-kind exchanges for investment real estate sales.", ko: "네. 투자 부동산 매각 후 Like-Kind 교환을 통한 양도세 이연 전략을 세무 관점에서 자문합니다." } }
    ]
  },
  {
    id: "svc_8", icon: "👨‍👩‍👧", category: "BUSINESS & FINANCIAL ADVISORY",
    title: { en: "Family Legacy & Wealth Transfer", ko: "가족 자산 이전 & 상속 계획" },
    tagline: { en: "Designing the transfer of wealth across generations.", ko: "세대를 넘어 이어지는 부의 설계." },
    intro: { en: "We design the most efficient way to transfer assets to your children. From trust structure design to estate tax savings — including practical advisory for Korean-American families.", ko: "의도한 대로 자녀에게 유산을 이전하는 가장 효율적인 방법을 설계합니다. Trust 구조 설계부터 Estate Tax 절세까지, 그리고 한인 가정의 특수한 자산 구조를 연계한 실질적 자문을 제공합니다." },
    items: [
      { en: "Trust Design & Accounting", ko: "Trust 설계 및 회계 — Revocable/Irrevocable Trust 구조 설계 자문 및 Trust 회계(수익자 기록, K-1 발행)." },
      { en: "Estate Tax Planning", ko: "Estate Tax Planning — 연방 및 CA 상속세 최소화 전략. Unified Credit 활용 및 증여 제외 적용." },
      { en: "Lifetime Gift Strategy", ko: "생전 증여 전략 — 연간 증여 세액 공제(연 $18,000/인) 활용. 연령대별 최적 증여 시점 설계." },
      { en: "GRAT / IDGT Structures", ko: "GRAT / IDGT 구조 — 고자산가 대상 절세 자산 이전 기법. Grantor Retained Annuity Trust 및 Intentionally Defective Grantor Trust." },
      { en: "FLP / LLC Structures", ko: "FLP / LLC 구조 — Family Limited Partnership 및 LLC를 활용한 사업체 자산 이전 및 평가 할인 절세." },
      { en: "Will & Beneficiary Strategy", ko: "유언장 및 수혜자 전략 — 유언장 검토, 수혜자 최적화, 사이클 플랜 업데이트 지원." }
    ],
    process: [
      { en: "Asset Overview", ko: "자산 현황 파악 — Trust, 부동산, 사업체, 승계 예정 자산 등 전체 현황 점검." },
      { en: "Tax-Saving Structure", ko: "절세 구조 설계 — Estate Tax 노출 분석 후 연방·주 수준에서 최적 절세 구조 설계." },
      { en: "Trust & Document Coordination", ko: "신탁 및 문서 작성 연계 — 서류 작성은 Estate Attorney와 협력 진행 (Danny 네트워크 활용)." },
      { en: "Annual Review", ko: "연간 리뷰 — 세법 변경, 자산 변동, 가족 상황 변화에 따른 플랜 업데이트." }
    ],
    docs: ["Trust Document Copies", "Will / Testament Copy", "Real Estate Title Documents", "Life Insurance Policies", "Beneficiary Designation Forms", "Recent Tax Returns"],
    faq: [
      { q: { en: "Does a trust avoid probate?", ko: "Trust를 설정하면 프로베이트(Probate)를 피할 수 있나요?" }, a: { en: "Generally yes — a properly funded trust avoids probate, making inheritance faster and less costly. Assets must actually be transferred into the trust.", ko: "일반적으로 매녀타입드 Trust는 프로베이트를 피할 수 있어 상속 과정을 빠르고 비용을 줄일 수 있습니다. 다만 Trust에 자산을 실제 이전해야 합니다." } },
      { q: { en: "What is the federal Estate Tax exemption?", ko: "연방 Estate Tax는 얼마부터 부과되나요?" }, a: { en: "As of 2024, the federal Estate Tax exemption is approximately $13.6M (individual) / $27.2M (couple). Sunset provisions may change this after 2025.", ko: "2024년 기준 연방 Estate Tax 면제 한도는 약 $13.6M(개인)/$27.2M(부부)입니다. 2025년 이후 일몰조항(Sunset Provision)에 따라 변경될 수 있어 지금 준비하는 게 중요합니다." } },
      { q: { en: "Do you help with 2nd-generation Korean-American inheritance?", ko: "한인 2세대 상속 문제도 도와주시나요?" }, a: { en: "Yes. We support US tax filings for citizen/PR children, phased asset transfers, and tax treatment of Korean real estate sale proceeds.", ko: "네. 미국 시민권자 또는 영주권자인 자녀의 미국 세부 정리, 자산의 단계적 이전, 한국 부동산 판매이익 입금에 대한 세무 처리도 지원합니다." } }
    ]
  },
  {
    id: "svc_9", icon: "🔍", category: "BUSINESS & FINANCIAL ADVISORY",
    title: { en: "Forensic Accounting & Litigation Support", ko: "포렌식 회계 & 소송 지원" },
    tagline: { en: "CPA expertise becomes a tool in disputes.", ko: "분쟁 현장에서 CPA의 전문성이 도구가 됩니다." },
    intro: { en: "We establish facts based on financial data in disputes, litigation, and audit situations. We provide court-ready damage calculations, fraud investigations, and Expert Witness services.", ko: "분쟁, 소송, 감사 상황에서 재무 데이터를 기반으로 사실을 규명합니다. 법원 제출용 손해배상 산정, 부정 행위 조사, Expert Witness 서비스를 제공합니다." },
    items: [
      { en: "Damages Calculation", ko: "손해배상 산정 — 계약 분쟁, 사업 중단, 부상 등으로 인한 경제적 손실 계량화. Lost Profit 분석." },
      { en: "Fraud Investigation", ko: "부정 행위 조사 — 횡령, 회계 조작, 자금 유용 등 내부 부정(Fraud) 탐지 및 증거 문서화." },
      { en: "Expert Witness", ko: "Expert Witness — 법원 및 중재에서의 전문가 증언. 복잡한 재무 사안을 명확하게 설명하는 Expert Report 작성." },
      { en: "Quantum Meruit Support", ko: "Quantum Meruit 지원 — 서면 계약 없는 용역 제공의 합리적 가치(Reasonable Value) 산정 지원." },
      { en: "Divorce Asset Division", ko: "이혼 재산 분할 — 혼인 재산 파악, 숨겨진 자산 추적, 사업체 가치 평가 및 분할 자문." },
      { en: "Tax Audit Representation", ko: "세무 조사 대응 — IRS/FTB 감사(Audit) 대응, 서류 준비 및 CPA 대리 응대." }
    ],
    process: [
      { en: "Case Overview", ko: "사건 개요 파악 — 변호사 또는 의뢰인으로부터 사건의 쟁점과 필요 분석 범위를 확인합니다." },
      { en: "Document Collection", ko: "자료 수집·검토 — 관련 재무 서류, 계약서, 은행 거래 내역 등을 수집하고 분석합니다." },
      { en: "Analysis & Report", ko: "분석 및 보고서 작성 — 재무 분석 결과를 법원 제출 가능한 Expert Report 형식으로 작성합니다." },
      { en: "Testimony & Support", ko: "증언 및 협의 지원 — 법정 증언, 중재, 협상 과정에서 전문가로서 지원합니다." }
    ],
    docs: ["All Relevant Contracts", "Financial Statements (Dispute Period)", "Bank / Credit Card Statements", "Tax Returns", "Payroll Records", "Project-Level Cost Breakdown"],
    faq: [
      { q: { en: "Can I engage you directly without an attorney?", ko: "변호사를 통해서만 의뢰 가능한가요?" }, a: { en: "Attorney referrals are most common, but individuals and businesses may also engage us directly.", ko: "변호사를 통한 의뢰가 일반적이지만, 개인 또는 기업이 직접 의뢰도 가능합니다." } },
      { q: { en: "What format is the Expert Report?", ko: "Expert Report는 어떤 형식인가요?" }, a: { en: "Reports are prepared to meet federal and state court requirements, clearly stating methodology, data sources, and conclusions.", ko: "연방 및 주 법원 규정에 맞는 형식으로 작성되며, 분석 방법론, 데이터 출처, 결론이 명확히 기재됩니다." } },
      { q: { en: "I received an IRS audit notice — can you help?", ko: "IRS 감사 통지를 받았는데 도움받을 수 있나요?" }, a: { en: "Yes. We handle IRS and CA FTB audit response, document preparation, and CPA representation.", ko: "네. IRS 및 CA FTB 감사 대응, 서류 준비 및 CPA 자격으로 납세자 대리를 제공합니다." } }
    ]
  },
  {
    id: "svc_10", icon: "🌏", category: "SPECIALTY SERVICES",
    title: { en: "International Tax", ko: "국제 세무" },
    tagline: { en: "A CPA who understands taxes in both the US and Korea.", ko: "미국과 한국, 두 나라의 세금을 이해하는 CPA." },
    intro: { en: "We professionally handle complex international tax issues — from US-Korea tax treaties and FBAR/FATCA to foreign corporate filings.", ko: "글로벌 사업 환경에서 발생하는 복잡한 국제 세무 이슈를 전문적으로 처리합니다. 미국-한국 조세 조약부터 FBAR, FATCA, 외국 법인 신고까지 포괄적으로 지원합니다." },
    items: [
      { en: "FBAR / FATCA Filing", ko: "FBAR / FATCA 신고 — 해외 금융계좌 신고(FinCEN 114) 및 Form 8938. 미신고 시 고액 패널티 방지." },
      { en: "US-Korea Tax Treaty", ko: "미-한 조세 조약 — 미국-한국 조세 조약을 활용한 이중과세 방지 및 원천세 최적화." },
      { en: "Foreign Corporate Filing", ko: "외국 법인 신고 — Form 5471 (외국 법인), Form 8865 (외국 파트너십), Form 8858 (외국 지점)." },
      { en: "Non-Resident Tax", ko: "비거주자 세무 — NRA(Non-Resident Alien) 세금 신고, Form 1040-NR 처리." },
      { en: "Foreign Gifts & Inheritances", ko: "해외 증여·상속 — 해외로부터 받은 증여(Form 3520) 및 상속 신고. 해외 재산 관련 컴플라이언스." },
      { en: "US Entity Setup for Korean Businesses", ko: "미국 법인 설립 자문 — 한국 기업의 미국 진출 시 최적 법인 구조 설계 및 세무 전략 수립." }
    ],
    process: [
      { en: "International Tax Assessment", ko: "국제 세무 현황 파악 — 해외 계좌, 외국 법인 소유 여부, 해외 소득 유형 등을 종합 파악합니다." },
      { en: "Filing Obligation Review", ko: "신고 의무 확인 — FBAR, FATCA, Form 5471 등 각 상황별 신고 의무를 정확히 확인합니다." },
      { en: "Return Preparation & Filing", ko: "신고서 작성·제출 — 기한 내 정확한 신고서를 작성하고 IRS에 제출합니다." },
      { en: "Ongoing Compliance", ko: "지속 컴플라이언스 — 매년 변경되는 국제 세법에 맞춰 지속적인 컴플라이언스를 유지합니다." }
    ],
    docs: ["Foreign Account Details (Institution & Balance)", "Foreign Corporate Financial Statements", "Korean Tax Returns", "US Tax Returns", "Foreign Income Documentation", "Passport & Visa Information"],
    faq: [
      { q: { en: "I missed FBAR filings — what should I do?", ko: "FBAR를 모르고 신고를 못 했는데 어떻게 하나요?" }, a: { en: "The Streamlined Filing Compliance Procedure allows you to voluntarily correct past non-filings with potential penalty reduction. Contact us quickly.", ko: "Streamlined Filing Compliance Procedure를 통해 과거 미신고를 자발적으로 수정할 수 있습니다. 패널티 감면 가능성이 있으므로 빠른 상담을 권합니다." } },
      { q: { en: "Do I need to report just having a Korean bank account?", ko: "한국에 계좌만 있어도 신고해야 하나요?" }, a: { en: "US residents (citizens, green card holders, tax residents) must file FBAR if combined foreign account balances exceed $10,000 at any point.", ko: "미국 거주자(시민권자·영주권자·세법상 거주자)는 해외 금융계좌 합산 잔액이 $10,000을 초과하면 FBAR 신고 의무가 있습니다." } },
      { q: { en: "I own shares in a Korean company — do I need to file?", ko: "한국 법인의 지분을 보유하고 있으면 신고해야 하나요?" }, a: { en: "Owning 10%+ of a foreign corporation triggers Form 5471 filing. Failure to file can result in penalties of $10,000+.", ko: "외국 법인 지분 10% 이상 보유 시 Form 5471 신고 의무가 발생합니다. 미신고 시 $10,000 이상의 패널티가 부과될 수 있습니다." } }
    ]
  },
  {
    id: "svc_11", icon: "₿", category: "SPECIALTY SERVICES",
    title: { en: "Crypto Tax", ko: "암호화폐 세금" },
    tagline: { en: "More intuitive than algorithms — accurate IRS crypto reporting.", ko: "알고리즘보다 더 직관적으로 — 정확한 IRS 코인 신고." },
    intro: { en: "We provide specialized support for complex cryptocurrency tax treatment — from exchange data analysis to DeFi, NFT, and staking income.", ko: "암호화폐 거래의 복잡한 세무 처리를 전문적으로 지원합니다. 거래소 데이터 분석부터 DeFi, NFT, 스테이킹 소득까지 — IRS 가이드라인에 맞는 정확한 신고를 제공합니다." },
    items: [
      { en: "Trade Gain/Loss Calculation", ko: "거래 손익 계산 — FIFO/LIFO/HIFO 방법 적용. 거래소별 데이터 통합 및 Capital Gain/Loss 산정." },
      { en: "Mining / Staking Income", ko: "Mining / Staking 소득 — 채굴·스테이킹 보상의 소득 인식 시점 및 금액 산정. 사업 소득 vs 투자 소득 구분." },
      { en: "DeFi / NFT Processing", ko: "DeFi / NFT 처리 — DeFi 유동성 제공, NFT 민팅·매각 관련 세무 처리 및 소득 분류." },
      { en: "Exchange Data Consolidation", ko: "거래소 데이터 정리 — Coinbase, Binance, Kraken 등 다수 거래소 데이터 통합 및 누락 거래 복원." },
      { en: "Amended Returns", ko: "과거 신고 수정 — 암호화폐 신고 누락 또는 오류 수정을 위한 Amended Return 처리." },
      { en: "Tax Loss Harvesting", ko: "Tax Loss Harvesting — 손실 거래를 활용한 세금 절감 전략 수립 및 연말 포트폴리오 최적화." }
    ],
    process: [
      { en: "Transaction Data Collection", ko: "거래 내역 수집 — 모든 거래소, 지갑, DeFi 프로토콜의 거래 내역을 취합합니다." },
      { en: "Data Sorting & Classification", ko: "데이터 정리·분류 — 거래 유형별(매매, 전송, 보상, 에어드랍 등) 분류 및 USD 가치 산정." },
      { en: "Gain/Loss Calculation", ko: "손익 계산 — 선택된 회계 방법(FIFO/HIFO)으로 Capital Gain/Loss를 계산합니다." },
      { en: "Tax Return Integration", ko: "세금 신고 통합 — 결과를 개인 또는 사업체 세금 신고서에 정확히 반영합니다." }
    ],
    docs: ["Exchange CSV Downloads", "Wallet Address List", "Staking / Mining Reward History", "NFT Transaction History", "Prior Year Tax Returns", "Foreign Exchange Account Information"],
    faq: [
      { q: { en: "Do I have to report just holding crypto?", ko: "암호화폐를 보유만 하고 팔지 않아도 신고해야 하나요?" }, a: { en: "Simply holding (HODLing) is not a taxable event. Taxable events include sales, exchanges, payments, and receiving staking rewards.", ko: "단순 보유(HODLing)는 과세 이벤트가 아닙니다. 매각, 교환, 결제 사용, 스테이킹 보상 수령 등이 과세 이벤트입니다." } },
      { q: { en: "How does IRS classify crypto?", ko: "IRS가 암호화폐를 어떻게 보나요?" }, a: { en: "The IRS classifies cryptocurrency as property. Held over 1 year: Long-term Capital Gains (max 20%). Under 1 year: ordinary income tax rates.", ko: "IRS는 암호화폐를 Property(재산)으로 분류합니다. 1년 이상 보유 시 Long-term Capital Gain(최대 20%), 1년 미만은 일반 소득세율이 적용됩니다." } }
    ]
  },
  {
    id: "svc_12", icon: "🤝", category: "SPECIALTY SERVICES",
    title: { en: "Nonprofit Accounting", ko: "비영리 회계" },
    tagline: { en: "Focus on your mission — leave the finances to us.", ko: "선한 일에 전념하도록, 재무는 맡겨주세요." },
    intro: { en: "We support financial management and IRS compliance tailored to nonprofit organizations' special accounting standards (GAAP for Nonprofits).", ko: "비영리 단체의 특수한 회계 기준(GAAP for Nonprofits)에 맞는 재무 관리와 IRS 컴플라이언스를 지원합니다. 면세 지위 유지부터 투명한 재무 보고까지 전문적으로 처리합니다." },
    items: [
      { en: "Form 990 Filing", ko: "Form 990 신고 — 990, 990-EZ, 990-N, 990-PF 작성 및 제출. 면세 지위 유지를 위한 컴플라이언스 관리." },
      { en: "Nonprofit Bookkeeping", ko: "비영리 장부 관리 — Fund Accounting 기반 월별 장부 관리. 제한·비제한 기금(Restricted/Unrestricted) 분리 회계." },
      { en: "Financial Statement Preparation", ko: "재무제표 작성 — Statement of Financial Position, Activities, Cash Flows — 비영리 기준 재무제표." },
      { en: "Tax-Exempt Application", ko: "Tax-Exempt 신청 — Form 1023 / 1023-EZ 작성. 501(c)(3) 면세 지위 취득을 위한 IRS 신청 대행." },
      { en: "Grant Reporting & Management", ko: "Grant 보고·관리 — 정부·재단 그랜트 수령 시 요구되는 재무 보고 및 지출 추적." },
      { en: "HOA Accounting", ko: "HOA 회계 — 주택소유자협회(HOA) 회비 관리, 예산 책정, 재무제표 작성 및 연간 신고." }
    ],
    process: [
      { en: "Organization Assessment", ko: "단체 현황 파악 — 면세 지위, 회계연도, 주요 수입원 및 현 회계 상태를 파악합니다." },
      { en: "Accounting System Setup", ko: "회계 시스템 구축 — 비영리 전용 Chart of Accounts 설계 및 Fund Accounting 시스템 구축." },
      { en: "Monthly Processing", ko: "월별 정기 처리 — 거래 분류, 기금별 추적, 월별 재무제표 작성 및 이사회 보고." },
      { en: "Annual Filing", ko: "연간 신고 완료 — Form 990 시리즈 작성 및 마감일 전 제출. CA AG 신고(RRF-1) 포함." }
    ],
    docs: ["IRS Determination Letter", "Fiscal Year Financial Records", "Donation / Grant Records", "Board Meeting Minutes", "Prior Form 990", "CA AG Registration Documents"],
    faq: [
      { q: { en: "Can you help from the 501(c)(3) application stage?", ko: "501(c)(3) 신청부터 도와줄 수 있나요?" }, a: { en: "Yes. We support the entire process from Form 1023 preparation to IRS correspondence for obtaining tax-exempt status.", ko: "네. Form 1023 작성부터 IRS 서신 대응까지 면세 지위 취득 전 과정을 지원합니다." } },
      { q: { en: "What happens if Form 990 is not filed?", ko: "Form 990을 제출하지 않으면 어떻게 되나요?" }, a: { en: "Missing 3 consecutive years results in automatic IRS revocation of tax-exempt status. Reinstatement requires starting the application from scratch.", ko: "3년 연속 미제출 시 IRS가 면세 지위를 자동 취소합니다. 취소 후 재취득은 처음부터 신청해야 합니다." } },
      { q: { en: "Do you serve small churches and community organizations?", ko: "소규모 교회나 커뮤니티 단체도 서비스가 가능한가요?" }, a: { en: "Yes. We serve organizations of all sizes from those filing only 990-N (e-Postcard) to large nonprofits.", ko: "네. 990-N(e-Postcard)만 제출하는 소규모 단체부터 대형 비영리까지 규모에 맞는 서비스를 제공합니다." } }
    ]
  },
  {
    id: "svc_13", icon: "🏗️", category: "SPECIALTY SERVICES",
    title: { en: "Industry-Specific CPA", ko: "업종별 전문 CPA" },
    tagline: { en: "Your industry's growth needs a CPA who knows your industry.", ko: "당신 업종의 성장에는 당신 업종을 아는 CPA가 필요합니다." },
    intro: { en: "Industry-specific tax and accounting services. We provide customized solutions tailored to each industry's regulatory environment and tax structure.", ko: "업종별 세무·회계 서비스. 각 산업의 규제 환경과 세무 구조에 맞춰 맞춤형 솔루션을 제공합니다. 한인 집중 업종인 건설업, 부동산, 의료, 음식점, eCommerce 등에 풍부한 실무 경험을 보유하고 있습니다." },
    items: [
      { en: "Construction & Real Estate", ko: "Construction & Real Estate — 공사별 원가 관리, 완공기준 수익인식(PCM), Retainage 회계, 1031 Exchange 자문." },
      { en: "Healthcare / Medical", ko: "Healthcare / Medical — 병의원·치과·의료 법인 세무 구조 설계. HIPAA 컴플라이언스, MSO 구조 자문." },
      { en: "Restaurant & Retail", ko: "Restaurant & Retail — CDTFA 판매세 컴플라이언스, 현금 매출 관리, 팁 소득 보고, POS 데이터 연계." },
      { en: "eCommerce / Creators", ko: "eCommerce / Creators — 아마존 셀러, 이커머스 사업자, 유튜버·틱톡커·크리에이터들의 주 세금 컴플라이언스 및 수익 구조 최적화." },
      { en: "Professional Services", ko: "Professional Services — 변호사·회계사·컨설턴트 등 전문직의 로열티 수입, S-Corp 전환, 구이 관리." },
      { en: "Gas Station / Hotel", ko: "Gas Station / Hotel — 주유소 판매세 신고, 호텔 점유율(Occupancy Tax), 가맹점 임대료 수입 회계 전문." }
    ],
    process: [
      { en: "Industry Compliance Review", ko: "업종 컴플라이언스 점검 — 해당 업종의 특수 세무 의무와 리스크 요소를 상담에서 직접 파악합니다." },
      { en: "Custom Accounting System", ko: "맞춤형 회계 시스템 구축 — 업종별 특수 항목(원가, 판매, 재고, 무형자산 등)을 반영한 COA 설계." },
      { en: "Tax Strategy", ko: "세무 전략 수립 — 업종별 세금 특성과 절세 포인트를 활용한 연간 신고 전략 수립." },
      { en: "Ongoing Support", ko: "지속적 지원 — 경영진단, 분기 검토, 규제 변경 사항 안내 등 연간 오너십으로 지원합니다." }
    ],
    docs: ["Business Registration Documents", "Last 2 Years of Financial Statements", "Sales Tax Registration Certificate", "Industry-Specific License Documents", "Payroll Records", "Tax Returns (Last 2 Years)"],
    faq: [
      { q: { en: "Can you help with construction cost accounting?", ko: "건설업의 코스트 어카운팅이 너무 복잡한데 도와주시나요?" }, a: { en: "Yes. We have extensive experience with construction-specific accounting including Retainage, revenue recognition, and Quantum Meruit litigation.", ko: "네. 건설업의 특성상 필요한 Retainage 수익 인식, Quantum Meruit 소송 등 건설 분야 특수 실무 경험이 풍부합니다." } },
      { q: { en: "Do restaurants need to file CDTFA separately?", ko: "음식점도 CDTFA 신고를 별도로 해야 하나요?" }, a: { en: "Yes. Restaurants are subject to sales tax, and there are separate reporting obligations for tips paid to employees. Record keeping for CDTFA audit preparedness is critical.", ko: "네. 음식점은 판매세 대상이며, 직원에게 지급하는 팁도 별도 보고 의무가 있습니다. CDTFA 감사 대비를 위한 기록 관리가 중요합니다." } },
      { q: { en: "Does an eCommerce business need to file multi-state taxes?", ko: "eCommerce 업체는 다주 세금 신고를 해야 하나요?" }, a: { en: "Filing obligations vary by the buyer's state. We conduct Nexus analysis to identify each state's obligations and help implement automation tools.", ko: "구매자가 있는 주에 따라 판매세(Sales Tax) 납부 의무가 다릅니다. Nexus 분석을 통해 각 주별 신고 의무를 파악하고 자동화 도구 연계를 도와드립니다." } }
    ]
  }
];

// Home page service card → subpage mapping
const homeServiceSubpages = ["svc_1", "svc_2", "svc_5", "svc_9", "svc_10"];

// Multilingual welcome messages for Contact section
const multilingualWelcome = [
  { flag: "🇺🇸", lang: "English", message: "Feel free to contact us in English." },
  { flag: "🇰🇷", lang: "한국어", message: "한국어로 편하게 문의하세요." },
  { flag: "🇲🇽", lang: "Español", message: "Puede contactarnos en español. Respondemos por correo electrónico." },
  { flag: "🇨🇳", lang: "中文", message: "欢迎用中文联系我们，我们将通过邮件回复。" },
  { flag: "🇻🇳", lang: "Tiếng Việt", message: "Vui lòng liên hệ bằng tiếng Việt. Chúng tôi sẽ phản hồi qua email." },
  { flag: "🇯🇵", lang: "日本語", message: "日本語でのお問い合わせも承ります。メールにて対応いたします。" },
  { flag: "🇵🇭", lang: "Tagalog", message: "Maaari kayong makipag-ugnayan sa Tagalog. Sasagutin namin sa email." },
  { flag: "🇲🇳", lang: "Монгол", message: "Монгол хэлээр холбогдож болно. Имэйлээр хариулна." }
];

// ============================================================
// AI CPA CHATBOT COMPONENT
// ============================================================
const CHAT_SYSTEM = `You are an AI assistant for CR Accountancy & Consulting (Danny Kim, CPA), a licensed CPA firm in Los Angeles, CA.

RULES:
1. Provide GENERAL TAX INFORMATION only - never specific tax advice. Include disclaimer that personalized advice requires CPA review.
2. Detect the user's language automatically and respond in the same language.
3. Support: English, 한국어, Español, 中文, Tiếng Việt, 日本語, Tagalog, Монгол.
4. Be warm, professional, helpful. Represent a premium CPA firm.

FIRM INFO:
- Danny Kim, CPA - Licensed in California, 25+ years experience
- Services: Tax Services, Bookkeeping & Payroll, Business Formation & Consulting, Forensic Accounting & Litigation Support, Bilingual CPA Services
- Industry Specialties: Construction companies (job costing, subcontractor compliance), BBQ franchise & multi-location restaurants (food cost analysis, multi-location accounting)
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
  };
  const qas = {
    en: [{ l: "Tax Filing", m: "I need help with my tax return." }, { l: "Business Setup", m: "I want to set up an LLC." }, { l: "Bookkeeping", m: "I need bookkeeping services." }, { l: "Construction CPA", m: "I need a CPA who understands construction accounting." }],
    ko: [{ l: "세금 신고", m: "세금 신고 도움이 필요합니다." }, { l: "법인 설립", m: "LLC 설립을 하고 싶습니다." }, { l: "건설업 회계", m: "건설회사 회계 관리가 필요합니다." }, { l: "해외 계좌", m: "FBAR 신고 도움이 필요합니다." }],
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
  const lFlags = { en: "🇺🇸", ko: "🇰🇷" };

  return (<>
    <style>{`@keyframes cFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes cBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}@keyframes cPulse{0%,100%{transform:scale(1);box-shadow:0 4px 24px rgba(184,146,106,0.4)}50%{transform:scale(1.08);box-shadow:0 4px 32px rgba(184,146,106,0.6)}}@keyframes cSlide{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
    <button onClick={() => setIsOpen(!isOpen)} style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, width: 64, height: 64, borderRadius: "50%", background: isOpen ? "#0A1628" : "linear-gradient(135deg, #B8926A, #D4B896)", border: "none", cursor: "pointer", boxShadow: `0 4px 24px ${isOpen ? "rgba(10,22,40,0.4)" : "rgba(184,146,106,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", animation: pulse ? "cPulse 2s ease-in-out infinite" : "none" }}>
      <span style={{ fontSize: 28, color: isOpen ? "#fff" : "#060F1F", lineHeight: 1 }}>{isOpen ? "✕" : "💬"}</span>
    </button>
    {isOpen && (
      <div style={{ position: "fixed", bottom: 100, right: 24, zIndex: 9998, width: 400, maxWidth: "calc(100vw - 48px)", height: 580, maxHeight: "calc(100vh - 140px)", borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", background: cBg, animation: "cSlide 0.3s ease" }}>
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
        <div style={{ padding: "12px 16px 16px", borderTop: "1px solid #E8E4DF", background: "#fff" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea ref={inRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }} placeholder={chatLang === "ko" ? "메시지를 입력하세요..." : "Type your message..."} rows={1} style={{ flex: 1, padding: "12px 16px", border: "1px solid #E8E4DF", borderRadius: 24, fontSize: 14, color: "#0A1628", outline: "none", resize: "none", lineHeight: 1.4, maxHeight: 100 }} onFocus={e => e.target.style.borderColor = "#B8926A"} onBlur={e => e.target.style.borderColor = "#E8E4DF"}/>
            <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{ width: 44, height: 44, borderRadius: "50%", background: input.trim() && !loading ? "linear-gradient(135deg, #B8926A, #D4B896)" : "#E8E4DF", border: "none", cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 18, color: input.trim() ? "#060F1F" : "#8A95A5" }}>↑</span></button>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#8A95A5" }}>{chatLang === "ko" ? "AI 상담은 일반 정보이며, 전문 자문은 CPA 검토를 통해 제공됩니다." : "AI consultation is informational. Professional advice requires CPA review."}</div>
        </div>
      </div>
    )}
  </>);
}

// ============================================================
// CONTACT FORM
// ============================================================
function ContactForm({ lang, t, colors, fonts }) {
  const [fd, setFd] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => { setFd(prev => ({ ...prev, [field]: value })); };
  const handleSubmit = () => {
    if (fd.name && fd.email) {
      fetch("https://formspree.io/f/meerdzov", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fd),
      }).then(() => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFd({ name: "", email: "", phone: "", service: "", message: "" });
      }).catch(() => { alert("Failed to send. Please call 213-325-9800."); });
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
            <input type={field === "email" ? "email" : "text"} value={fd[field]} onChange={(e) => handleChange(field, e.target.value)} style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = colors.gold} onBlur={(e) => e.target.style.borderColor = colors.lightGray} />
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

// ============================================================
// RESOURCES PAGE — Tax Payment Guide
// ============================================================
function ResourcesPage({ lang, colors, fonts }) {
  const isKo = lang === "ko";
  const S = { section: { maxWidth: 1200, margin: "0 auto", padding: "100px 40px" } };
  const agencyBlock = (agency, color, onlineRows, checkSteps, checkAddr) => (
    <div key={agency} style={{ marginBottom: 56 }}>
      <div style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, padding: "20px 32px", borderRadius: "8px 8px 0 0" }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 20, color: "#fff", fontWeight: 700 }}>{agency}</h3>
      </div>
      <div style={{ border: `1px solid ${colors.lightGray}`, borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
        {/* Online section */}
        <div style={{ background: colors.cream, padding: "12px 24px", borderBottom: `1px solid ${colors.lightGray}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span>🌐</span>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.gold, textTransform: "uppercase" }}>{isKo ? "온라인 납부" : "Online Payment"}</span>
        </div>
        {onlineRows.map((row, j) => (
          <div key={j} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 24px", borderBottom: `1px solid ${colors.lightGray}`, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.navy, marginBottom: 4 }}>{row.name}</div>
              {row.url && <a href={row.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: colors.blue, textDecoration: "none", display: "block", marginBottom: 6 }}>→ {row.url.replace("https://", "")}</a>}
              <div style={{ fontSize: 13, color: colors.gray, lineHeight: 1.6 }}>{isKo ? row.ko : row.en}</div>
            </div>
            {row.badge && <div style={{ background: row.badgeColor || colors.navy, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap", alignSelf: "start" }}>{row.badge}</div>}
          </div>
        ))}
        {/* Check/Mail section */}
        <div style={{ background: colors.cream, padding: "12px 24px", borderBottom: `1px solid ${colors.lightGray}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span>✉</span>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.gold, textTransform: "uppercase" }}>{isKo ? "체크 / 우편 납부" : "Check / Mail Payment"}</span>
        </div>
        <div style={{ padding: "20px 24px" }}>
          {checkSteps.map((step, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 12, padding: "10px 0", borderBottom: i < checkSteps.length - 1 ? `1px solid ${colors.lightGray}` : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: colors.gray, lineHeight: 1.7, paddingTop: 4 }}>{isKo ? step.ko : step.en}</div>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            {checkAddr.map((a, i) => (
              <div key={i} style={{ background: colors.cream, border: `1px solid ${colors.lightGray}`, borderRadius: 6, padding: "12px 16px", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors.navy, marginBottom: 4 }}>{isKo ? a.labelKo : a.labelEn}</div>
                <div style={{ fontSize: 12, color: colors.gray }}>{a.address}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const irsOnline = [
    { name: "IRS Direct Pay (Individuals)", url: "https://www.irs.gov/payments/direct-pay-with-bank-account", en: "Bank account (ACH). Free. Pay balance due, estimated tax, or extension payment.", ko: "은행 계좌 직접 출금. 무료. 잔액, 예상세금, 연장 납부 가능.", badge: "FREE", badgeColor: "#16A34A" },
    { name: "IRS Direct Pay (Business)", url: "https://www.irs.gov/payments/pay-business-taxes-from-your-bank-account", en: "Bank account (ACH). Free. EIN required. For 1120S, 1065, 1120, 941 etc.", ko: "은행 계좌 직접 출금. 무료. EIN 필요. 1120S, 1065, 1120, 941 등.", badge: "FREE", badgeColor: "#16A34A" },
    { name: "Pay by Debit / Credit Card", url: "https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card", en: "Third-party processors. Credit: ~1.85–1.98% fee; Debit: ~$2.14–2.20 flat fee.", ko: "제3자 결제대행 이용. 신용카드: ~1.85–1.98% 수수료, 직불카드: ~$2.14–2.20.", badge: "FEE", badgeColor: "#DC2626" },
    { name: "IRS Online Account (Recommended)", url: "https://www.irs.gov/payments/online-account-for-individuals", en: "View balance, payment history, schedule future payments up to 1 year in advance.", ko: "잔액 조회, 납부 이력 확인, 최대 1년 후 납부 일정 설정 가능.", badge: "BEST", badgeColor: "#B8926A" }
  ];
  const irsCheckSteps = [
    { en: 'Make check payable to: "United States Treasury"', ko: '체크 수취인: "United States Treasury" 로 작성' },
    { en: "Write on memo line: SSN (or EIN) + tax year + form number (e.g., 2024 Form 1040)", ko: "메모란 기재: SSN/EIN + 세금 연도 + 폼 번호 (예: 2024 Form 1040)" },
    { en: "Attach payment voucher (Form 1040-V, 1040-ES, etc.) — do not staple", ko: "납부 바우처 (Form 1040-V, 1040-ES 등) 동봉 — 스테이플 금지" },
    { en: "Mail to the correct IRS address based on payment type", ko: "납부 유형에 따른 IRS 주소로 발송 (아래 참고)" }
  ];
  const irsAddr = [
    { labelEn: "Individual (1040) — WITH payment", labelKo: "개인 (1040) — 납부액 동봉 시", address: "Internal Revenue Service | P.O. Box 802501 | Cincinnati, OH 45280-2501" },
    { labelEn: "Individual (1040) — WITHOUT payment / refund", labelKo: "개인 (1040) — 납부액 없음 / 환급 예상", address: "Department of the Treasury | Internal Revenue Service | Ogden, UT 84201-0002" },
    { labelEn: "Estimated Tax (1040-ES) — CA Residents", labelKo: "예상세금 (1040-ES) — 캘리포니아 거주자", address: "Internal Revenue Service | P.O. Box 510000 | San Francisco, CA 94151-5100" }
  ];

  const ftbOnline = [
    { name: "Web Pay — Personal (Free)", url: "https://webapp.ftb.ca.gov/webpay/login/login", en: "Bank account (ACH). Free. For individuals filing CA Form 540.", ko: "은행 계좌 직접 출금. 무료. CA Form 540 개인 신고자용.", badge: "FREE", badgeColor: "#16A34A" },
    { name: "Web Pay — Business (Free)", url: "https://webapp.ftb.ca.gov/webpay/login/belogin", en: "Bank account (ACH). Free. For corporations, S-corps, partnerships (100S, 100, 565, 568).", ko: "은행 계좌 직접 출금. 무료. 법인/S법인/파트너십 (100S, 100, 565, 568).", badge: "FREE", badgeColor: "#16A34A" },
    { name: "Pay by Credit Card", url: "https://www.ftb.ca.gov/pay/payment-options.html", en: "Service fee applies. Visit FTB payment options for current processors.", ko: "수수료 발생. 현재 결제대행 업체는 FTB 납부 옵션 페이지에서 확인.", badge: "FEE", badgeColor: "#DC2626" },
    { name: "MyFTB Account (Recommended)", url: "https://www.ftb.ca.gov/myftb/index.asp", en: "View balance, notices, payment history, and make payments online.", ko: "잔액, 고지서, 납부 이력 조회 및 온라인 납부 가능.", badge: "BEST", badgeColor: "#B8926A" }
  ];
  const ftbCheckSteps = [
    { en: 'Make check payable to: "Franchise Tax Board"', ko: '체크 수취인: "Franchise Tax Board" 로 작성' },
    { en: "Write on memo line: SSN (or FEIN) + tax year + form number (e.g., 2024 Form 540)", ko: "메모란 기재: SSN/FEIN + 세금 연도 + 폼 번호 (예: 2024 Form 540)" },
    { en: "Submit separate checks for different tax years", ko: "세금 연도별로 체크를 반드시 분리하여 발송" },
    { en: "Include payment voucher (Form 3582 personal, Form 3539 business)", ko: "납부 바우처 동봉 (개인: Form 3582, 사업체: Form 3539)" }
  ];
  const ftbAddr = [
    { labelEn: "Personal (540) — WITH payment", labelKo: "개인 (540) — 납부액 동봉 시", address: "Franchise Tax Board | PO Box 942867 | Sacramento CA 94267-0001" },
    { labelEn: "Personal (540) — WITHOUT payment (refund / no balance)", labelKo: "개인 (540) — 납부액 없음 (환급/잔액 없음)", address: "Franchise Tax Board | PO Box 942840 | Sacramento CA 94240-0001" },
    { labelEn: "Business (100S, 100, 565, 568)", labelKo: "사업체 (100S, 100, 565, 568) — 납부 여부 무관", address: "Franchise Tax Board | PO Box 942857 | Sacramento CA 94257-0500" },
    { labelEn: "Overnight / FedEx / UPS", labelKo: "익일 배송 / FedEx·UPS 사용 시", address: "Franchise Tax Board | Sacramento CA 95827-1500" }
  ];

  const eddOnline = [
    { name: "e-Services for Business (Mandatory)", url: "https://edd.ca.gov/en/Payroll_Taxes/e-Services_for_Business", en: "File DE 9 / DE 9C wage reports, make Payroll Tax Deposits (DE 88). All CA employers must file and pay electronically.", ko: "DE 9/DE 9C 임금 보고서 신고, 급여세 납부 (DE 88). 모든 캘리포니아 고용주 전자 신고 의무.", badge: "REQUIRED", badgeColor: "#DC2626" },
    { name: "EDD Express Pay (No enrollment needed)", url: "https://edd.ca.gov/en/payroll_taxes/file_and_pay/", en: "Quick one-time payroll tax payment without enrolling in e-Services for Business.", ko: "e-Services 가입 없이 일회성 급여세 납부 가능.", badge: "QUICK", badgeColor: "#2563EB" },
    { name: "Pay by Credit / Debit Card (via ACI Payments)", url: "https://edd.ca.gov/en/payroll_taxes/file_and_pay/", en: "Credit card: 2.75% fee; Debit card: 1.75% fee (minimum $1.00) — paid to ACI Payments, not EDD.", ko: "신용카드: 2.75% 수수료, 직불카드: 1.75% (최소 $1.00) — EDD가 아닌 ACI Payments에 납부.", badge: "FEE", badgeColor: "#DC2626" }
  ];
  const eddCheckSteps = [
    { en: "Confirm you have an approved E-file/E-pay Mandate Waiver (Form DE 1245W)", ko: "전자 신고/납부 면제 승인서 (Form DE 1245W) 보유 여부 반드시 확인" },
    { en: 'Make check payable to: "Employment Development Department"', ko: '체크 수취인: "Employment Development Department" 로 작성' },
    { en: "Write your 8-digit EDD employer account number + quarter on the check memo", ko: "체크 메모란에 8자리 EDD 고용주 계좌 번호 + 해당 분기 기재" },
    { en: "Attach the DE 88 payment coupon (Payroll Tax Deposit coupon)", ko: "DE 88 납부 쿠폰 (Payroll Tax Deposit coupon) 동봉" }
  ];
  const eddAddr = [
    { labelEn: "Payroll Tax Deposit (DE 88) / Quarterly Returns", labelKo: "급여세 납부 (DE 88) / 분기별 신고", address: "Employment Development Department | PO Box 989061 | West Sacramento CA 95798-9061" }
  ];

  return (
    <div>
      <div style={{ background: `linear-gradient(165deg, #0A1628 0%, #1B4F8A 100%)`, padding: "160px 40px 80px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {isKo ? "고객 자료실" : "Client Resources"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: "#fff", fontWeight: 700, marginBottom: 20 }}>
          {isKo ? "세금 납부 안내" : "Tax Payment Guide"}
        </h1>
        <GoldDivider />
        <p style={{ fontFamily: fonts.body, fontSize: 18, color: "#ffffffaa", marginTop: 24, maxWidth: 600, margin: "24px auto 0" }}>
          {isKo ? "IRS · FTB · EDD 온라인 납부 및 체크/우편 납부 방법 안내" : "IRS · FTB · EDD — Online Payment & Check/Mail Payment Instructions"}
        </p>
      </div>

      <div style={{ background: "#FFF8F3", borderBottom: `1px solid ${colors.lightGray}`, padding: "20px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: colors.navy, maxWidth: 800, margin: "0 auto", lineHeight: 1.7 }}>
          {isKo ? "💡 온라인 납부(은행 계좌 ACH)를 권장드립니다 — 무료이며, 빠르고, 즉시 확인 가능합니다." : "💡 Online payment (ACH/bank account) is always recommended — it's free, fast, and provides instant confirmation."}
        </p>
      </div>

      <div style={S.section}>
        {agencyBlock("IRS — Internal Revenue Service (Federal Income Tax)", "#1B3A5C", irsOnline, irsCheckSteps, irsAddr)}

        <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 8, padding: "14px 20px", marginBottom: 40, display: "flex", gap: 12, alignItems: "start" }}>
          <span style={{ fontSize: 20 }}>⚠</span>
          <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.7 }}>
            {isKo ? "EFTPS.gov는 2026년 개인 납부에서 단계적으로 폐지됩니다. IRS Direct Pay 또는 IRS Online Account로 전환하세요." : "EFTPS.gov is being phased out for individuals in 2026. Switch to IRS Direct Pay or create an IRS Online Account."}
          </p>
        </div>

        {agencyBlock("FTB — Franchise Tax Board (CA State Income Tax)", "#1E5C3A", ftbOnline, ftbCheckSteps, ftbAddr)}

        <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 8, padding: "14px 20px", marginBottom: 40, display: "flex", gap: 12, alignItems: "start" }}>
          <span style={{ fontSize: 20 }}>⚠</span>
          <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.7 }}>
            {isKo ? "일부 납세자는 전자 납부 의무 (Mandatory e-Pay). 전자 납부 의무자가 체크 납부 시 벌금 부과." : "Some taxpayers are required to pay electronically (Mandatory e-Pay). Penalty applies if you mail a check when e-pay is required."}
          </p>
        </div>

        {agencyBlock("EDD — Employment Development Dept. (CA Payroll Tax)", "#5B2D8E", eddOnline, eddCheckSteps, eddAddr)}

        <div style={{ background: colors.cream, border: `1px solid ${colors.lightGray}`, borderRadius: 8, padding: "24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.8, marginBottom: 8 }}>
            {isKo ? "우편 주소 및 납부 링크는 변경될 수 있습니다. 납부 전 반드시 공식 웹사이트(irs.gov, ftb.ca.gov, edd.ca.gov)에서 확인하세요." : "Mailing addresses and payment links are subject to change. Always verify with official agency websites (irs.gov, ftb.ca.gov, edd.ca.gov) before submitting payment."}
          </p>
          <p style={{ fontSize: 12, color: colors.gold, fontWeight: 600 }}>CR Accountancy & Consulting | Danny Kim, CPA | dkcpala.com</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SERVICE DETAIL PAGE
// ============================================================
function ServiceDetailPage({ service, lang, colors, fonts, navigate }) {
  const isKo = lang === "ko";
  const t = (obj) => isKo ? obj.ko : obj.en;

  const categoryColors = {
    "CORE TAX & ACCOUNTING": colors.navy,
    "BUSINESS & FINANCIAL ADVISORY": "#1E5C3A",
    "SPECIALTY SERVICES": "#5B2D8E"
  };
  const catColor = categoryColors[service.category] || colors.navy;

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(165deg, ${catColor} 0%, ${catColor}cc 100%)`, padding: "160px 40px 80px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
          {service.category}
        </div>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{service.icon}</div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(32px, 5vw, 52px)", color: "#fff", fontWeight: 700, marginBottom: 16 }}>{t(service.title)}</h1>
        <GoldDivider />
        <p style={{ fontFamily: fonts.body, fontSize: 18, color: "#ffffffbb", marginTop: 20, maxWidth: 640, margin: "20px auto 0", fontStyle: "italic" }}>{t(service.tagline)}</p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
        {/* Intro */}
        <div style={{ maxWidth: 800, margin: "0 auto 64px", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
            {isKo ? "서비스 소개" : "Overview"}
          </div>
          <p style={{ fontFamily: fonts.body, fontSize: 17, color: colors.gray, lineHeight: 1.9 }}>{t(service.intro)}</p>
        </div>

        {/* Service Items Grid */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: colors.gold, textTransform: "uppercase", marginBottom: 32, fontWeight: 600, textAlign: "center" }}>
            {isKo ? "서비스 항목" : "What We Offer"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {service.items.map((item, i) => {
              const parts = isKo ? item.ko.split(" — ") : item.en.split(" — ");
              const itemTitle = parts[0];
              const itemDesc = parts[1] || "";
              return (
                <div key={i} style={{ background: colors.white, padding: "24px 28px", borderRadius: 6, border: `1px solid ${colors.lightGray}`, borderTop: `3px solid ${catColor}`, transition: "box-shadow 0.3s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: catColor, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>{isKo ? item.en : itemTitle}</span>
                  </div>
                  {itemDesc && <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.7 }}>{itemDesc}</p>}
                  {!itemDesc && isKo && <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.7 }}>{item.ko}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Process */}
        <div style={{ marginBottom: 72, background: colors.cream, borderRadius: 8, padding: "48px" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: colors.gold, textTransform: "uppercase", marginBottom: 36, fontWeight: 600, textAlign: "center" }}>
            {isKo ? "진행 절차" : "Our Process"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {service.process.map((step, i) => {
              const parts = isKo ? step.ko.split(" — ") : step.en.split(" — ");
              const stepTitle = isKo ? step.en : parts[0];
              const stepDesc = isKo ? parts[1] || step.ko : parts[1] || "";
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: catColor, color: "#fff", fontFamily: fonts.display, fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{i + 1}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>{stepTitle}</div>
                  {stepDesc && <p style={{ fontSize: 12, color: colors.gray, lineHeight: 1.7 }}>{stepDesc}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Documents + FAQ side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, marginBottom: 64 }}>
          {/* Required Documents */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: colors.gold, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
              {isKo ? "필요 서류" : "Required Documents"}
            </div>
            <div style={{ background: colors.white, border: `1px solid ${colors.lightGray}`, borderRadius: 6, padding: 24 }}>
              {service.docs.map((doc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < service.docs.length - 1 ? `1px solid ${colors.lightGray}` : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: catColor, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: colors.navy }}>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: colors.gold, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
              {isKo ? "자주 묻는 질문" : "FAQ"}
            </div>
            <div>
              {service.faq.map((item, i) => (
                <div key={i} style={{ background: colors.white, border: `1px solid ${colors.lightGray}`, borderRadius: 6, padding: "20px 24px", marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: colors.navy, marginBottom: 10 }}>Q. {t(item.q)}</div>
                  <div style={{ fontSize: 13, color: colors.gray, lineHeight: 1.75 }}>A. {t(item.a)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: `linear-gradient(135deg, ${catColor}, ${catColor}bb)`, borderRadius: 8, padding: "48px", textAlign: "center" }}>
          <h3 style={{ fontFamily: fonts.display, fontSize: 26, color: "#fff", marginBottom: 12 }}>
            {isKo ? "지금 바로 상담을 시작하세요" : "Schedule a Free Consultation"}
          </h3>
          <p style={{ fontSize: 14, color: "#ffffffbb", marginBottom: 24 }}>
            {isKo ? "무료 상담 · Los Angeles 지역 · 8개 언어 서비스 가능" : "Free consultation · Los Angeles · Available in 8 languages"}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <button onClick={() => navigate("contact")} style={{ background: colors.gold, border: "none", color: colors.darkNavy, fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "16px 40px", cursor: "pointer", borderRadius: 4 }}>
              {isKo ? "상담 신청하기" : "Request Consultation"}
            </button>
            <button onClick={() => navigate("services")} style={{ background: "transparent", border: "2px solid #ffffff88", color: "#fff", fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "14px 40px", cursor: "pointer", borderRadius: 4 }}>
              {isKo ? "전체 서비스 보기" : "All Services"}
            </button>
          </div>
          <p style={{ fontSize: 13, color: "#ffffffaa" }}>📞 213-325-9800 &nbsp;·&nbsp; ✉ info.dkcpa@gmail.com &nbsp;·&nbsp; 🌐 dkcpala.com</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CRAccountancy() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const t = translations[lang];
  const contentRef = useRef(null);

  useEffect(() => { setFadeIn(false); const timer = setTimeout(() => setFadeIn(true), 50); return () => clearTimeout(timer); }, [page]);
  useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); }, []);

  const navigate = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const colors = {
    navy: "#1A2332", darkNavy: "#0F1720", blue: "#2563EB", lightBlue: "#3B82F6",
    gold: "#A0845C", lightGold: "#C4A87A", cream: "#FAFAFA", white: "#FFFFFF",
    gray: "#6B7280", lightGray: "#E5E7EB"
  };
  const fonts = {
    display: "'DM Serif Display', Georgia, serif",
    body: "'Source Serif 4', Georgia, serif",
    sans: "'DM Sans', 'Helvetica Neue', sans-serif"
  };
  const baseStyles = {
    page: { minHeight: "100vh", background: colors.white, fontFamily: fonts.sans, color: colors.navy, overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "12px 0" : "20px 0", background: scrolled ? "rgba(10, 22, 40, 0.97)" : "rgba(10, 22, 40, 0.9)", backdropFilter: "blur(20px)", transition: "all 0.4s ease", borderBottom: scrolled ? `1px solid ${colors.gold}33` : "none" },
    navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    section: { maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }
  };

  // ============================================================
  // NAVBAR — Language selector: EN / KO only
  // ============================================================
  const NavBar = () => (
    <nav style={baseStyles.nav}>
      <div style={baseStyles.navInner}>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("home")}>
          <img src="/Logo_White_Final.png" alt="Danny Kim CPA - CR Accountancy & Consulting" onError={(e) => { e.target.onerror = null; e.target.src = "/Logo_Dark_Final.png"; }} style={{ height: 48 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="desktop-nav" style={{ display: "flex", gap: 4, marginRight: 16 }}>
            {["home", "services", "about", "resources", "contact"].map((p) => (
              <button key={p} onClick={() => navigate(p)} style={{
                background: page === p ? `${colors.gold}22` : "transparent", border: "none",
                color: page === p ? colors.gold : colors.white, fontFamily: fonts.sans, fontSize: 13,
                fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", padding: "10px 20px",
                cursor: "pointer", borderRadius: 4, transition: "all 0.3s ease"
              }}>
                {t.nav[p]}
              </button>
            ))}
          </div>

          {/* Language Toggle: EN / KO only */}
          <div style={{ display: "flex", background: `${colors.gold}15`, borderRadius: 6, border: `1px solid ${colors.gold}33`, overflow: "hidden" }}>
            {[{ code: "en", label: "EN" }, { code: "ko", label: "한국어" }].map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{
                background: lang === l.code ? `${colors.gold}44` : "transparent", border: "none",
                color: lang === l.code ? colors.white : `${colors.gold}aa`, fontSize: 12, fontWeight: 700,
                padding: "8px 14px", cursor: "pointer", letterSpacing: 1, fontFamily: fonts.sans, transition: "all 0.3s"
              }}>
                {l.label}
              </button>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
            display: "none", background: "none", border: "none", color: colors.white, fontSize: 24, cursor: "pointer", padding: 8
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background: colors.darkNavy, borderTop: `1px solid ${colors.gold}33`, padding: "20px 40px" }}>
          {["home", "services", "about", "resources", "contact"].map((p) => (
            <button key={p} onClick={() => navigate(p)} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
              color: page === p ? colors.gold : colors.white, fontFamily: fonts.sans, fontSize: 15,
              padding: "14px 0", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
              borderBottom: `1px solid ${colors.gold}11`
            }}>
              {t.nav[p]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  // ============================================================
  // HOME PAGE
  // ============================================================
  const HomePage = () => (
    <div>
      {/* Hero */}
      <div style={{
        minHeight: "100vh", background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.cream} 50%, #EEF2FF 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, ${colors.blue}08 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${colors.gold}10 0%, transparent 40%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 1, height: "30%", background: `linear-gradient(to bottom, transparent, ${colors.blue}15, transparent)` }} />
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 1, height: "25%", background: `linear-gradient(to bottom, transparent, ${colors.gold}15, transparent)` }} />

        <div style={{ textAlign: "center", maxWidth: 800, padding: "0 40px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 32, fontFamily: fonts.sans, fontWeight: 700, lineHeight: 2.2, textAlign: "center" }}>
            Danny Kim, CPA<br />CR Accountancy & Consulting
          </div>
          <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: colors.navy, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
            {t.hero.tagline}
          </h1>
          <div style={{ margin: "32px auto", maxWidth: 200 }}><GoldDivider /></div>
          <p style={{ fontFamily: fonts.body, fontSize: "clamp(18px, 2.5vw, 24px)", color: colors.gray, lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>
            {t.hero.subtitle}
          </p>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.gold, lineHeight: 1.6, marginBottom: 48, fontWeight: 600, maxWidth: 600, margin: "0 auto 48px", letterSpacing: 0.5 }}>
            {t.hero.valueFocus}
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("contact")} style={{
              background: colors.navy, border: "none", color: colors.white, fontFamily: fonts.sans,
              fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              padding: "18px 44px", cursor: "pointer", borderRadius: 4, transition: "all 0.3s ease",
              boxShadow: `0 4px 24px ${colors.navy}22`
            }}>
              {t.hero.cta}
            </button>
            <button onClick={() => navigate("services")} style={{
              background: "transparent", border: `2px solid ${colors.navy}`, color: colors.navy,
              fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              padding: "16px 44px", cursor: "pointer", borderRadius: 4, transition: "all 0.3s ease"
            }}>
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: colors.cream, borderBottom: `1px solid ${colors.lightGray}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
          {t.stats.map((stat, i) => (
            <div key={i}>
              <div style={{ fontFamily: fonts.display, fontSize: 42, fontWeight: 700, color: colors.blue, lineHeight: 1 }}>{stat.number}</div>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: colors.gray, marginTop: 8, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Preview — 5 categories */}
      <div style={{ ...baseStyles.section, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 36, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>{t.services.title}</h2>
          <GoldDivider />
          <p style={{ fontFamily: fonts.body, fontSize: 18, color: colors.gray, marginTop: 20, maxWidth: 600, margin: "20px auto 0" }}>{t.services.subtitle}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {t.services.items.map((svc, i) => (
            <div key={i} style={{
              background: colors.white, padding: 36, borderRadius: 4, border: `1px solid ${colors.lightGray}`,
              transition: "all 0.4s ease", cursor: "pointer", position: "relative", overflow: "hidden"
            }}
              onClick={() => navigate(homeServiceSubpages[i] || "services")}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = colors.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = colors.lightGray; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${colors.blue}, ${colors.gold})` }} />
              <div style={{ fontSize: 32, marginBottom: 14 }}>{svc.icon}</div>
              <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 10 }}>{svc.title}</h3>
              <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.7 }}>{svc.desc.substring(0, 90)}...</p>
              <div style={{ marginTop: 16, fontSize: 12, fontWeight: 700, color: colors.gold, letterSpacing: 1 }}>{lang === "ko" ? "자세히 보기 →" : "Learn More →"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Spotlight on Home */}
      <IndustrySpotlight />

      {/* CTA */}
      <div style={{ background: colors.cream, padding: "72px 40px", textAlign: "center" }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 32, color: colors.navy, marginBottom: 16 }}>
          {lang === "en" ? "Ready to Get Started?" : "시작할 준비가 되셨나요?"}
        </h2>
        <p style={{ fontFamily: fonts.body, fontSize: 18, color: colors.gray, marginBottom: 32, fontWeight: 500 }}>
          {lang === "en" ? "Schedule a free consultation today" : "지금 무료 상담을 예약하세요"}
        </p>
        <button onClick={() => navigate("contact")} style={{
          background: colors.navy, border: "none", color: colors.white, fontFamily: fonts.sans,
          fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          padding: "18px 48px", cursor: "pointer", borderRadius: 4, boxShadow: `0 4px 24px ${colors.navy}22`
        }}>
          {t.hero.cta}
        </button>
      </div>
    </div>
  );

  // ============================================================
  // INDUSTRY SPOTLIGHT SECTION (작업 4)
  // ============================================================
  const IndustrySpotlight = () => {
    const spotlight = t.industrySpotlight;
    return (
      <div style={{ background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.cream} 100%)`, borderTop: `1px solid ${colors.lightGray}`, borderBottom: `1px solid ${colors.lightGray}` }}>
        <div style={{ ...baseStyles.section, paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
              {lang === "en" ? "Specialized Expertise" : "산업별 전문성"}
            </div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 36, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>{spotlight.title}</h2>
            <GoldDivider />
            <p style={{ fontFamily: fonts.body, fontSize: 18, color: colors.gray, marginTop: 20, maxWidth: 600, margin: "20px auto 0" }}>{spotlight.subtitle}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Construction */}
            <div style={{
              background: colors.white, borderRadius: 8, border: `1px solid ${colors.lightGray}`,
              overflow: "hidden", transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
            }}>
              <div style={{ background: `linear-gradient(135deg, ${colors.navy}, #1B3A5C)`, padding: "32px 36px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 40 }}>🏗️</div>
                <h3 style={{ fontFamily: fonts.display, fontSize: 24, color: colors.white, fontWeight: 700 }}>{spotlight.construction.title}</h3>
              </div>
              <div style={{ padding: "32px 36px" }}>
                <p style={{ fontSize: 14, color: colors.gray, lineHeight: 1.8, marginBottom: 24 }}>{spotlight.construction.desc}</p>
                <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                  {lang === "en" ? "What We Deliver" : "제공 서비스"}
                </div>
                {spotlight.construction.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: j < 4 ? `1px solid ${colors.lightGray}` : "none" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.blue}, ${colors.gold})`, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.navy, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BBQ Franchise */}
            <div style={{
              background: colors.white, borderRadius: 8, border: `1px solid ${colors.lightGray}`,
              overflow: "hidden", transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
            }}>
              <div style={{ background: `linear-gradient(135deg, #7C2D12, #B45309)`, padding: "32px 36px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 40 }}>🍗</div>
                <h3 style={{ fontFamily: fonts.display, fontSize: 24, color: colors.white, fontWeight: 700 }}>{spotlight.bbq.title}</h3>
              </div>
              <div style={{ padding: "32px 36px" }}>
                <p style={{ fontSize: 14, color: colors.gray, lineHeight: 1.8, marginBottom: 24 }}>{spotlight.bbq.desc}</p>
                <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                  {lang === "en" ? "What We Deliver" : "제공 서비스"}
                </div>
                {spotlight.bbq.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: j < 4 ? `1px solid ${colors.lightGray}` : "none" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: `linear-gradient(135deg, #B45309, ${colors.gold})`, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: colors.navy, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // SERVICES PAGE — 13 service subpages
  // ============================================================
  const ServicesPage = () => {
    const categories = ["CORE TAX & ACCOUNTING", "BUSINESS & FINANCIAL ADVISORY", "SPECIALTY SERVICES"];
    const catLabels = {
      "CORE TAX & ACCOUNTING": { en: "Core Tax & Accounting", ko: "세금 & 회계 서비스", color: colors.navy },
      "BUSINESS & FINANCIAL ADVISORY": { en: "Business & Financial Advisory", ko: "사업 & 재무 자문", color: "#1E5C3A" },
      "SPECIALTY SERVICES": { en: "Specialty Services", ko: "전문 특화 서비스", color: "#5B2D8E" }
    };
    return (
      <div>
        <div style={{ background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.cream} 60%, #EEF2FF 100%)`, padding: "160px 40px 80px", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            {lang === "en" ? "What We Do" : "서비스 안내"}
          </div>
          <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.navy, fontWeight: 700, marginBottom: 20 }}>{t.services.title}</h1>
          <GoldDivider />
          <p style={{ fontFamily: fonts.body, fontSize: 20, color: colors.gray, marginTop: 24, maxWidth: 600, margin: "24px auto 0" }}>{t.services.subtitle}</p>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          {categories.map((cat) => {
            const catSvcs = serviceDetails.filter(s => s.category === cat);
            const label = catLabels[cat];
            return (
              <div key={cat} style={{ marginBottom: 72 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                  <div style={{ width: 4, height: 40, background: label.color, borderRadius: 2 }} />
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: 4, color: colors.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>{cat}</div>
                    <h2 style={{ fontFamily: fonts.display, fontSize: 28, color: colors.navy, fontWeight: 700 }}>{lang === "ko" ? label.ko : label.en}</h2>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
                  {catSvcs.map((svc) => (
                    <div key={svc.id}
                      onClick={() => navigate(svc.id)}
                      style={{ background: colors.white, border: `1px solid ${colors.lightGray}`, borderRadius: 6, padding: "28px 28px 24px", cursor: "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.09)"; e.currentTarget.style.borderColor = label.color; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = colors.lightGray; }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: label.color }} />
                      <div style={{ fontSize: 36, marginBottom: 12 }}>{svc.icon}</div>
                      <h3 style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, color: colors.navy, marginBottom: 8 }}>{lang === "ko" ? svc.title.ko : svc.title.en}</h3>
                      <p style={{ fontSize: 12, color: colors.gray, lineHeight: 1.6, marginBottom: 16 }}>{lang === "ko" ? svc.tagline.ko : svc.tagline.en}</p>
                      <div style={{ fontSize: 12, fontWeight: 700, color: label.color, letterSpacing: 1 }}>{lang === "ko" ? "자세히 보기 →" : "Learn More →"}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <IndustrySpotlight />

        {/* ── Google Reviews Section ── */}
        <ReviewsSection />

      </div>
    );
  };

  // ============================================================
  // ABOUT PAGE
  // ============================================================
  const AboutPage = () => (
    <div>
      <div style={{
        background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.cream} 60%, #EEF2FF 100%)`,
        padding: "160px 40px 80px", textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {lang === "en" ? "Our Story" : "사무실 소개"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.navy, fontWeight: 700, marginBottom: 20 }}>{t.about.title}</h1>
        <GoldDivider />
      </div>
      <div style={baseStyles.section}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, marginBottom: 80, alignItems: "start" }}>
          <div style={{ background: colors.cream, padding: 48, borderRadius: 4, textAlign: "center", position: "sticky", top: 120 }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.gold}, ${colors.lightGold})`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontFamily: fonts.display, color: colors.darkNavy, fontWeight: 700 }}>DK</div>
            <h3 style={{ fontFamily: fonts.display, fontSize: 24, color: colors.navy, marginBottom: 8 }}>Danny Kim</h3>
            <div style={{ fontSize: 13, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>CPA</div>
            <div style={{ width: 40, height: 1, background: colors.gold, margin: "0 auto 16px" }} />
            <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.6 }}>{t.about.credentials}</p>
          </div>
          <div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 28, color: colors.navy, marginBottom: 24 }}>{t.about.subtitle}</h2>
            <p style={{ fontSize: 16, color: colors.gray, lineHeight: 1.9, marginBottom: 24, fontFamily: fonts.body }}>{t.about.bio}</p>
            <p style={{ fontSize: 16, color: colors.gray, lineHeight: 1.9, marginBottom: 40, fontFamily: fonts.body }}>{t.about.bio2}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {t.about.values.map((v, i) => (
                <div key={i} style={{ background: colors.white, padding: 28, borderRadius: 4, border: `1px solid ${colors.lightGray}`, borderTop: `3px solid ${colors.gold}` }}>
                  <h4 style={{ fontFamily: fonts.display, fontSize: 18, color: colors.navy, marginBottom: 8 }}>{v.title}</h4>
                  <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontFamily: fonts.display, fontSize: 22, color: colors.navy, marginBottom: 20 }}>{t.about.industriesTitle}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {t.about.industries.map((ind, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 4, background: i % 2 === 0 ? colors.cream : colors.white, border: `1px solid ${colors.lightGray}` }}>
                    <span style={{ fontSize: 22 }}>{ind.icon}</span>
                    <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500 }}>{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================================
  // CONTACT PAGE — with multilingual welcome (작업 3)
  // ============================================================
  const ContactPage = () => (
    <div>
      <div style={{
        background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.cream} 60%, #EEF2FF 100%)`,
        padding: "160px 40px 80px", textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {lang === "en" ? "Connect With Us" : "문의하기"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.navy, fontWeight: 700, marginBottom: 20 }}>{t.contact.title}</h1>
        <GoldDivider />
        <p style={{ fontFamily: fonts.body, fontSize: 20, color: colors.gray, marginTop: 24 }}>{t.contact.subtitle}</p>
      </div>

      <div style={{ ...baseStyles.section, paddingTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "start" }}>
          {/* Contact Info */}
          <div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Office Address" : "사무실 주소"}
              </div>
              <p style={{ fontSize: 15, color: colors.navy, lineHeight: 1.8, whiteSpace: "pre-line" }}>{t.contact.info.address}</p>
            </div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Phone" : "전화"}
              </div>
              <a href="tel:2133259800" style={{ fontSize: 15, color: colors.blue, textDecoration: "none", fontWeight: 600 }}>{t.contact.info.phone}</a>
            </div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Email" : "이메일"}
              </div>
              <a href="mailto:info.dkcpa@gmail.com" style={{ fontSize: 15, color: colors.blue, textDecoration: "none", fontWeight: 600 }}>{t.contact.info.email}</a>
            </div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                {lang === "en" ? "Office Hours" : "영업 시간"}
              </div>
              <p style={{ fontSize: 15, color: colors.navy, lineHeight: 1.8, whiteSpace: "pre-line" }}>{t.contact.info.hours}</p>
            </div>

            {/* Multilingual Welcome Section (작업 3) */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.navy}08, ${colors.blue}06)`,
              border: `1px solid ${colors.lightGray}`,
              borderRadius: 8, padding: "28px 24px", marginTop: 8
            }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
                {t.contact.multilingualTitle}
              </div>
              <p style={{ fontSize: 12, color: colors.gray, marginBottom: 20, lineHeight: 1.5 }}>
                {t.contact.multilingualSubtitle}
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {multilingualWelcome.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", borderRadius: 6,
                    background: (i === 0 || i === 1) ? `${colors.gold}10` : colors.white,
                    border: (i === 0 || i === 1) ? `1px solid ${colors.gold}30` : `1px solid ${colors.lightGray}`,
                    transition: "all 0.2s"
                  }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{item.flag}</span>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: colors.navy, letterSpacing: 1 }}>{item.lang}</span>
                      <p style={{ fontSize: 12, color: colors.gray, marginTop: 2, lineHeight: 1.4 }}>{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ background: colors.cream, padding: 32, borderRadius: 4, textAlign: "center", marginTop: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📍</div>
              <p style={{ fontSize: 13, color: colors.navy, lineHeight: 1.6 }}>Koreatown, Los Angeles</p>
              <p style={{ fontSize: 11, color: colors.gray, marginTop: 8 }}>
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

  // ============================================================
  // FOOTER
  // ============================================================
  const Footer = () => (
    <footer style={{ background: colors.darkNavy, borderTop: `1px solid ${colors.gold}22`, padding: "60px 40px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: fonts.display, fontSize: 20, color: colors.white, marginBottom: 8 }}>Danny Kim, CPA</div>
            <div style={{ fontSize: 11, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>CR Accountancy & Consulting</div>
            <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.7 }}>{t.footer.tagline}</p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
              {lang === "en" ? "Quick Links" : "바로가기"}
            </div>
            {["home", "services", "about", "resources", "contact"].map((p) => (
              <button key={p} onClick={() => navigate(p)} style={{
                display: "block", background: "none", border: "none", color: colors.gray,
                fontSize: 13, padding: "6px 0", cursor: "pointer", fontFamily: fonts.sans, textAlign: "left"
              }}>
                {t.nav[p]}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
              {lang === "en" ? "Contact" : "연락처"}
            </div>
            <p style={{ fontSize: 13, color: colors.gray, lineHeight: 2 }}>
              213-325-9800<br />info.dkcpa@gmail.com<br />611 S Catalina St #216<br />Los Angeles, CA 90005
            </p>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${colors.gold}15`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: `${colors.cream}44` }}>{t.footer.rights}</p>
          <p style={{ fontSize: 11, color: `${colors.cream}44` }}>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );

  const svc = serviceDetails.find(s => s.id === page);
  const currentPage = svc
    ? <ServiceDetailPage service={svc} lang={lang} colors={colors} fonts={fonts} navigate={navigate} />
    : page === "resources"
    ? <ResourcesPage lang={lang} colors={colors} fonts={fonts} />
    : page === "home" ? <HomePage />
    : page === "services" ? <ServicesPage />
    : page === "about" ? <AboutPage />
    : page === "contact" ? <ContactPage />
    : <HomePage />;
  const pages = {}; // kept for reference — routing handled above

  return (
    <div style={baseStyles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&family=Source+Serif+4:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
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
      <div ref={contentRef} style={{ opacity: fadeIn ? 1 : 0, transform: fadeIn ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
        {currentPage}
      </div>
      <Footer />
      {/* <AIChatbot lang={lang} /> */}
    </div>
  );
}
