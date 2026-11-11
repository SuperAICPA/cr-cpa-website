import { useState, useEffect, useRef, useCallback } from "react";
import ReviewsSection, { loadReviews } from "./components/ReviewsSection";
import LineIcon from "./components/LineIcon";
import ConstructionPage from "./components/ConstructionPage";
import LandingPage, { LANDINGS } from "./components/LandingPage";
import IndustryPicker from "./components/IndustryPicker";
import ClientStories from "./components/ClientStories";
import SCorpCalculator from "./components/SCorpCalculator";
import ClientInfoPage from "./components/ClientInfoPage";

const translations = {
  en: {
    nav: { home: "Home", services: "Services", about: "About", resources: "Resources", "client-info": "Client Info", contact: "Contact" },
    hero: {
      tagline: "Helping LA's Korean Businesses Keep More & Grow Faster",
      subtitle: "Construction · Franchise · High Net Worth",
      cta: "Book a Free 30-Min Consultation",
      ctaSecondary: "Our Services",
      ctaCalendly: "Schedule on Calendly →",
      valueFocus: "Specialized tax & accounting for industries that demand precision — construction, BBQ franchise, and high-net-worth individuals."
    },
    stats: [
      { number: "25+", label: "Years of Experience" },
      { number: "500+", label: "Clients Served" },
      { number: "98%", label: "Client Retention" },
      { number: "$50M+", label: "Tax Savings Delivered" }
    ],
    services: {
      title: "Our Services",
      subtitle: "Everything I take on, from tax returns to books, payroll and agency letters.",
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
          title: "Bilingual CPA Services",
          desc: "Fully bilingual (Korean & English) professional services designed for the Korean-American business community. We bridge language and cultural gaps in financial management.",
          icon: "🌐",
          features: ["Korean & English Tax Consultation", "Immigrant Tax Planning (FBAR/FATCA)", "Cross-Border Business Advisory", "Korean Community Business Support", "Bilingual Financial Reporting"]
        }
      ]
    },
    industrySpotlight: {
      title: "Industries",
      subtitle: "Every industry reads its numbers differently",
      construction: {
        title: "Construction Companies",
        desc: "A contractor's numbers only make sense when job costs, progress billing and subcontractor paperwork line up. I set up the books so each job shows its real margin, and keep 1099s and WIP schedules current during the year, not in March.",
        features: ["Job costing by project", "Subcontractor 1099s and W-9s", "Progress billing and WIP schedules", "Cost codes set up in your books", "Tax planning for contractors"]
      },
      bbq: {
        title: "BBQ Franchise & Multi-Location Restaurants",
        desc: "With several locations, a combined P&L hides which store is carrying the others. I split the numbers by location, track food cost and royalties separately, and roll it all into one report for the owner.",
        features: ["Combined reporting across locations", "Food cost tracking", "Franchise royalties and fees", "P&L by location", "Restaurant tax planning"]
      }
    },
    about: {
      title: "About",
      subtitle: "An engineer turned CPA, who looks at the numbers and the system behind them",
      bio: "Danny Kim, CPA brings over 25 years of experience serving individuals and businesses across diverse industries. Tax and bookkeeping aren't treated as separate jobs here: I follow the numbers from the way the books are kept to the return that gets filed.",
      bio2: "I mainly work with small and mid-sized LA businesses and their owners. It's a one-CPA office, so the person you meet at the first consultation is the person who reviews your books and signs your return. Repetitive work runs on automated tools, and the time saved goes into review.",
      values: [
        { title: "I do the work myself", desc: "The CPA you talk to is the one who reviews your books and signs your return." },
        { title: "Deadlines first", desc: "Filing and payment dates come from me before they become a problem." },
        { title: "Plain explanations", desc: "Numbers and agency letters explained in plain Korean or English." },
        { title: "The system, too", desc: "If the same error keeps coming back, I fix how the books are kept." }
      ],
      credentials: "Licensed CPA · Los Angeles, California",
      industriesTitle: "Industries I work with",
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
      subtitle: "Call, email, or use the form below. The first 30 minutes are free.",
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
        serviceOptions: ["Tax Services", "Bookkeeping & Payroll", "Business Formation & Consulting", "Bilingual CPA Services", "Other"],
        message: "How can I help?",
        submit: "Request Consultation",
        success: "Thank you. I'll be in touch within 24 hours."
      },
      multilingualTitle: "Write in your language",
      multilingualSubtitle: "English and Korean: by phone, at the office or by email. All other languages: the work is handled by email."
    },
    footer: {
      tagline: "Tax · Accounting · Accounting systems",
      rights: `© ${new Date().getFullYear()} CR Accountancy and Consulting. All rights reserved.`,
      disclaimer: "Danny Kim, CPA · Licensed in the State of California"
    }
  },
  ko: {
    nav: { home: "홈", services: "서비스", about: "소개", resources: "자료실", "client-info": "고객 안내", contact: "연락처" },
    hero: {
      tagline: "한인 비즈니스의 절세와 성장을 함께 만드는 CPA",
      subtitle: "건설업 · 프랜차이즈 · 고자산 개인",
      cta: "무료 30분 상담 예약",
      ctaSecondary: "서비스 보기",
      ctaCalendly: "Calendly로 예약하기 →",
      valueFocus: "건설업, BBQ 프랜차이즈, 고자산 고객을 위한 업종 특화 세무·회계 전략"
    },
    stats: [
      { number: "25+", label: "년 경력" },
      { number: "500+", label: "고객 서비스" },
      { number: "98%", label: "고객 유지율" },
      { number: "$50M+", label: "절세 실적" }
    ],
    services: {
      title: "서비스 안내",
      subtitle: "세금 신고부터 장부, 급여, 기관 통지서까지 맡는 일을 모두 적었습니다.",
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
          title: "이중 언어 CPA 서비스",
          desc: "한영 이중 언어 전문 서비스로 한인 비즈니스 커뮤니티를 위해 설계되었습니다. 재무 관리에서 언어와 문화적 장벽을 해소합니다.",
          icon: "🌐",
          features: ["한영 이중 언어 세무 상담", "이민자 세무 계획 (FBAR/FATCA)", "한미 간 비즈니스 자문", "한인 커뮤니티 사업 지원", "이중 언어 재무 보고"]
        }
      ]
    },
    industrySpotlight: {
      title: "업종별 전문",
      subtitle: "업종마다 숫자를 보는 법이 다릅니다",
      construction: {
        title: "건설 회사",
        desc: "건설업은 현장별 원가, 기성 청구, 하청업체 서류가 맞아야 숫자가 보입니다. 현장마다 실제 마진이 보이도록 장부를 잡고, 1099와 WIP 자료는 3월이 아니라 연중에 맞춰 둡니다.",
        features: ["현장별 원가 회계(Job Costing)", "하청업체 1099·W-9 관리", "기성 청구와 WIP 보고", "장부 안의 원가 코드 정리", "건설업 세무 계획"]
      },
      bbq: {
        title: "BBQ 프랜차이즈 & 다점포 식당",
        desc: "매장이 여러 곳이면 합쳐진 손익만으로는 어느 매장이 다른 매장을 받쳐 주고 있는지 보이지 않습니다. 매장별로 숫자를 나누고, 식재료 원가와 로열티를 따로 본 뒤, 오너가 한 번에 볼 수 있는 보고서로 묶습니다.",
        features: ["여러 매장 통합 보고", "식재료 원가 관리", "프랜차이즈 로열티·수수료 정리", "매장별 손익", "외식업 세무 계획"]
      }
    },
    about: {
      title: "사무실 소개",
      subtitle: "엔지니어로 시작해, 숫자와 그 숫자가 만들어지는 과정을 함께 보는 CPA",
      bio: "Danny Kim, CPA는 25년 이상의 경력으로 다양한 산업의 개인 및 기업 고객에게 서비스를 제공하고 있습니다. 세무와 회계를 따로 보지 않고, 장부가 만들어지는 과정부터 신고서까지 한 사람이 끝까지 봅니다.",
      bio2: "주로 LA의 중소기업과 사업주 개인을 맡습니다. 1인 사무소라서 처음 상담한 사람이 장부를 검토하고 신고서에 서명합니다. 반복 작업은 자동화 도구로 처리하고, 그렇게 아낀 시간을 검토에 씁니다.",
      values: [
        { title: "직접 합니다", desc: "상담한 사람이 장부를 검토하고, 신고서에 서명합니다." },
        { title: "기한을 먼저 챙깁니다", desc: "신고·납부 일정은 문제가 되기 전에 제가 먼저 알려 드립니다." },
        { title: "쉽게 설명합니다", desc: "숫자와 기관 통지서를 한국어와 영어로 풀어서 설명합니다." },
        { title: "시스템까지 봅니다", desc: "같은 실수가 반복되면 장부가 만들어지는 방식부터 고칩니다." }
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
      subtitle: "전화, 이메일, 아래 양식 중 편한 방법으로 연락 주세요. 첫 상담 30분은 무료입니다.",
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
        serviceOptions: ["세무 서비스", "장부 관리 & 급여", "법인 설립 & 경영 컨설팅", "이중 언어 CPA 서비스", "기타"],
        message: "문의 내용을 입력해 주세요",
        submit: "상담 신청하기",
        success: "감사합니다! 24시간 이내에 연락드리겠습니다."
      },
      multilingualTitle: "어떤 언어로든 문의해 주세요",
      multilingualSubtitle: "영어와 한국어는 전화·방문·이메일로, 그 밖의 언어는 이메일로 업무를 진행합니다."
    },
    footer: {
      tagline: "세무 · 회계 · 회계 시스템",
      rights: `© ${new Date().getFullYear()} CR Accountancy and Consulting. All rights reserved.`,
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
    tagline: { en: "Every return reviewed line by line, with next year planned before this one is filed.", ko: "한 줄씩 검토한 신고서, 그리고 내년 계획까지." },
    intro: { en: "I prepare individual, business, trust and multi-state returns, and go through each one line by line before you sign. Once it is filed, we go over what will change for next year.", ko: "개인, 법인, 신탁, 여러 주에 걸친 신고까지 맡습니다. 서명하시기 전에 신고서를 한 줄씩 검토하고, 신고가 끝나면 내년에 달라질 부분을 같이 짚어 드립니다." },
    items: [
      { en: "Individual Tax Return", ko: "개인 세금 신고 — Form 1040 및 각종 Schedule 신고. W-2, 1099, 부동산·투자 소득 등 다양한 소득 유형 처리." },
      { en: "Business Tax Return", ko: "사업체 세금 신고 — S-Corp (1120-S), Partnership (1065), C-Corp (1120), LLC, Schedule C 신고. 사업체 구조에 맞는 절세 전략 적용." },
      { en: "Nonprofit Tax Return", ko: "비영리단체 신고 — Form 990 / 990-EZ / 990-N 신고. 면세 지위(Tax-Exempt Status) 유지를 위한 컴플라이언스 관리." },
      { en: "Trust Tax Return", ko: "신탁(Trust) 신고 — Form 1041 신고. 신탁 소득의 수익자(Beneficiary) 배분 처리 및 Schedule K-1 발행." },
      { en: "State & Multi-State Tax", ko: "주·지방세 신고 — California FTB 신고 포함 멀티 주 세금 신고. 거주지 변경 및 비거주자 소득 처리." },
      { en: "Tax Planning", ko: "세금 계획 — 연간 세금 최소화 전략, 분기별 예납세(Estimated Tax) 계산 및 개인·사업체 통합 플래닝." },
      { en: "Amended Returns", ko: "수정 신고 — 과거 신고 오류 수정 (Form 1040-X). 빠진 공제 항목을 반영해 차액을 돌려받습니다." },
      { en: "Foreign Income & FBAR", ko: "해외 소득·해외 계좌(FBAR) — 해외 금융계좌 신고 (FBAR, FATCA), 해외 소득 및 외국세액공제 처리." }
    ],
    process: [
      { en: "Initial Consultation", ko: "초기 상담 — 고객의 소득 유형, 사업 구조, 특이 사항을 파악하여 맞춤 견적을 제공합니다." },
      { en: "Document Collection", ko: "서류 수집 — 필요 서류 체크리스트를 제공하고 안전한 포털을 통해 서류를 수신합니다." },
      { en: "Return Preparation", ko: "세금 신고서 작성 — 받을 수 있는 공제를 빠짐없이 반영해 신고서를 작성합니다." },
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
    tagline: { en: "Books closed every month, so the numbers are ready when you need them.", ko: "매달 마감하는 장부. 필요할 때 숫자가 준비돼 있습니다." },
    intro: { en: "I close your books every month. Transactions are categorized, bank and card accounts are reconciled, and you get monthly financial statements. If the books are behind, I start by catching them up.", ko: "매달 장부를 마감합니다. 거래를 분류하고 은행·카드 계좌를 맞춘 뒤 월별 재무제표를 보내 드립니다. 장부가 밀려 있다면 밀린 기간부터 정리합니다." },
    items: [
      { en: "Monthly Bookkeeping", ko: "월별 장부 관리 — 수입·지출 분류, 은행 계좌 조정(Bank Reconciliation), 월별 결산 처리." },
      { en: "Financial Statements", ko: "재무제표 작성 — 손익계산서, 대차대조표, 현금흐름표 월별·분기별·연간 작성." },
      { en: "QuickBooks Setup & Management", ko: "QuickBooks 설정·정리 — 클라우드 회계 소프트웨어 설정, 정리, 마이그레이션 및 교육." },
      { en: "Catch-up Bookkeeping", ko: "밀린 장부 정리 — 수개월 또는 수년치 누락된 장부를 정리하는 서비스." },
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
      { q: { en: "Do I have to use QuickBooks?", ko: "QuickBooks를 사용하지 않아도 되나요?" }, a: { en: "No. I also work with Excel, Wave, Xero and others. If another program fits your business better, I can move you over.", ko: "네. Excel, Wave, Xero 등으로도 작업합니다. 사업에 더 맞는 프로그램이 있다면 옮기는 작업도 맡습니다." } },
      { q: { en: "How long does catch-up bookkeeping take?", ko: "Catch-up Bookkeeping 기간은 얼마나 걸리나요?" }, a: { en: "Typically 1–4 weeks depending on transaction volume. We'll provide a timeline estimate at the initial consultation.", ko: "거래 규모에 따라 다르지만 일반적으로 1~4주 내 완료됩니다. 초기 상담 시 일정을 안내해드립니다." } },
      { q: { en: "How is the monthly fee determined?", ko: "월 비용은 어떻게 되나요?" }, a: { en: "It depends on monthly transaction volume and how complex the books are. I quote a fixed monthly fee after the first consultation.", ko: "월 거래 건수와 장부의 복잡도에 따라 정해집니다. 첫 상담 후 월 고정 금액으로 견적을 드립니다." } }
    ]
  },
  {
    id: "svc_3", icon: "💰", category: "CORE TAX & ACCOUNTING",
    title: { en: "Payroll Management", ko: "급여 관리" },
    tagline: { en: "Payroll, payroll taxes and quarterly filings, on schedule.", ko: "급여와 급여세, 분기 신고를 기한 안에." },
    intro: { en: "I run payroll and file the federal and California payroll returns that come with it (941, 940, DE 9 and DE 9C), plus W-2s and 1099s at year end. New hires, terminations and wage garnishments are handled in the same place.", ko: "급여 계산과 지급, 그에 따르는 연방·캘리포니아 급여세 신고(941, 940, DE 9, DE 9C), 연말 W-2·1099 발행까지 맡습니다. 신규 채용, 퇴사, 임금 압류 처리도 같은 곳에서 봅니다." },
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
      { q: { en: "How many employees do you need to start?", ko: "몇 명부터 서비스가 가능한가요?" }, a: { en: "Anyone from a one-person company paying only the owner to businesses with 50+ employees.", ko: "1인 기업(오너 급여)부터 50인 이상 규모까지 모두 지원합니다." } },
      { q: { en: "Can I switch from my current payroll system?", ko: "기존 급여 시스템에서 전환이 가능한가요?" }, a: { en: "Yes. I can move your data over from Gusto, ADP, Paychex and other providers.", ko: "네. Gusto, ADP, Paychex 등 기존 플랫폼에서의 데이터 마이그레이션을 지원합니다." } },
      { q: { en: "Can you handle California's complex payroll laws?", ko: "California 급여 법규가 복잡한데 처리 가능한가요?" }, a: { en: "Yes. Payroll is run under California rules, including minimum wage, overtime, SDI and SUI, and EDD filings are part of the service.", ko: "네. 최저임금, 오버타임, SDI, SUI 같은 캘리포니아 규정에 맞춰 급여를 처리하고, EDD 신고도 함께 맡습니다." } }
    ]
  },
  {
    id: "svc_4", icon: "⚖️", category: "CORE TAX & ACCOUNTING",
    title: { en: "Tax Resolution", ko: "세금 분쟁 해결" },
    tagline: { en: "When the IRS, FTB, EDD or CDTFA writes, I respond as your representative.", ko: "IRS·FTB·EDD·CDTFA에서 연락이 오면, 대리인으로 대응합니다." },
    intro: { en: "I handle IRS, FTB, EDD and CDTFA problems. If you've received an audit notice, had wages or a bank account levied, or have a tax lien, call before the next deadline.", ko: "IRS·FTB·EDD·CDTFA와 얽힌 세금 문제를 맡습니다. 세무조사 통지를 받았거나, 임금이나 은행 계좌가 압류됐거나, 세금 담보(Lien)가 설정됐다면 다음 기한 전에 연락 주세요. 조사 대응부터 담보 해제까지 맡습니다." },
    items: [
      { en: "IRS / FTB Audit Representation", ko: "IRS·FTB 세무조사 대응 — IRS와 California FTB 세무조사에 대리인으로 나섭니다. 서류 준비부터 조사관과의 연락까지 맡습니다." },
      { en: "CDTFA Sales Tax Audit", ko: "CDTFA 판매세 조사 — California 판매세·사용세 조사 대응. 신고한 매출과 장부가 맞지 않는 부분을 소명합니다." },
      { en: "Offer in Compromise", ko: "체납액 감면 협상(OIC) — IRS 채무 조정 협상. 납부 의무 금액을 실질적으로 줄일 수 있는 조건을 분석하고 신청 대행." },
      { en: "Installment Agreement", ko: "분할 납부 협의 — 세금 분할 납부 협의. IRS/FTB와 월납 계획을 협상." },
      { en: "Wage Garnishment Release", ko: "임금 압류 해제 — 임금 압류 해제. 고용주 연락 창구 차단 및 해제 절차 진행." },
      { en: "Bank Levy Release", ko: "은행 계좌 압류 해제 — 압류된 은행 계좌의 해제 절차 진행. 신속한 대응으로 자금 접근성 복구." },
      { en: "Tax Lien Response", ko: "세금 담보(Lien) 해제 — IRS·FTB 세금 담보(Federal/State Tax Lien) 해제 신청과 대응." },
      { en: "Delinquent Returns", ko: "미신고 연도 정리 — 연체된 세금 신고서 작성 및 제출. IRS Voluntary Disclosure 프로그램 연계." }
    ],
    process: [
      { en: "Problem Assessment", ko: "문제 파악 — IRS/FTB 통지서, 체납 내역 등을 확인하고 상황을 정확히 파악합니다." },
      { en: "Strategy Development", ko: "대응 전략 수립 — Offer in Compromise, 분할 납부, 징수 유예(CNC) 중 실제로 가능한 방법을 따져 봅니다." },
      { en: "IRS/FTB Representation", ko: "IRS/FTB 대리 — CPA 자격으로 납세자 대리인 역할 수행. 고객이 직접 담당자를 만날 필요 없음." },
      { en: "Resolution & Follow-up", ko: "해결 및 사후 관리 — 문제 해결 후 미래 컴플라이언스 유지를 위한 세무 플래닝 지원." }
    ],
    docs: ["Original IRS/FTB Notice", "CP2000 / CP3219A or Other Letters", "Tax Balance Verification", "CDTFA Audit Notice", "Prior Year Tax Records", "Asset / Property List"],
    faq: [
      { q: { en: "An IRS Revenue Officer visited — what should I do?", ko: "IRS 담당자(Revenue Officer)가 방문했는데 어떻게 해야 하나요?" }, a: { en: "Contact us immediately. Having a CPA as your representative provides significant advantages during Revenue Officer interactions.", ko: "즉시 연락주세요. Revenue Officer 접촉 시 CPA가 대리인으로 동석하면 서류 요청 및 입장에서 유리한 결과를 얻을 수 있습니다." } },
      { q: { en: "Does everyone qualify for Offer in Compromise?", ko: "Offer in Compromise는 누구나 되나요?" }, a: { en: "You must meet IRS criteria (ability to pay, income, assets). We'll evaluate your eligibility in the consultation.", ko: "IRS가 정한 자격 요건(지불 능력, 소득, 자산 등)을 충족해야 합니다. 상담을 통해 신청 가능성을 먼저 확인해 드립니다." } },
      { q: { en: "My business is at risk due to unpaid sales tax — what can I do?", ko: "판매세 미납으로 사업이 위기라면?" }, a: { en: "Call before the next notice deadline. An installment agreement or Currently Not Collectible status may be possible.", ko: "다음 통지서 기한 전에 연락 주세요. 분할 납부(Installment Agreement)나 징수 유예(Currently Not Collectible)를 신청할 수 있는지 검토합니다." } }
    ]
  },
  {
    id: "svc_5", icon: "🏢", category: "CORE TAX & ACCOUNTING",
    title: { en: "Business Formation", ko: "법인 설립" },
    tagline: { en: "Choose the entity with your own pay and taxes in mind.", ko: "본인 급여와 세금까지 생각해서 사업체 형태를 정합니다." },
    intro: { en: "LLC, S corp or C corp: the choice shapes your taxes for years. I compare them using your expected revenue and the salary you plan to take, then handle the registration, EIN and state tax accounts.", ko: "LLC, S corp, C corp 중 무엇을 고르느냐에 따라 앞으로 몇 년의 세금이 달라집니다. 예상 매출과 본인 급여를 넣어 비교해 본 뒤, 등록과 EIN, 주 세금 계좌 개설까지 진행합니다." },
    items: [
      { en: "LLC Formation", ko: "LLC 설립 — 단일·다수 회원 LLC 구성. Operating Agreement 작성 및 캘리포니아 SOS 등록." },
      { en: "S-Corp & C-Corp", ko: "S-Corp 및 C-Corp — 주주 구성, 바이론, 급여 설정. S-Corp 선출 (Form 2553) 지원." },
      { en: "Partnership", ko: "파트너십 — General / Limited Partnership 설립. 동업자간 Partnership Agreement 작성 지원." },
      { en: "Nonprofit (501c3)", ko: "비영리법인(501(c)(3)) — Form 1023 작성 및 IRS 면세 지위 신청 대행. CA AG 등록 포함." },
      { en: "EIN Registration", ko: "EIN 등록 — 연방 고용주 식별번호(EIN) IRS 신청 및 안내." },
      { en: "CA Business License & Registration", ko: "CA Business License 및 등록 — City/County Business License 및 CA Secretary of State 등록 지원." }
    ],
    process: [
      { en: "Entity Type Decision", ko: "Entity 타입 결정 — 세금, 법적 보호, 투자 유치 계획을 놓고 맞는 형태를 정합니다." },
      { en: "Document Preparation", ko: "구성 서류 작성 — Articles of Organization/Incorporation, Operating Agreement, Bylaws 등 작성 지원." },
      { en: "EIN & Tax Account Setup", ko: "EIN 및 세무 계좌 개설 — EIN 신청, CA 보드 등록, 판매세 퍼밋 등." },
      { en: "System Integration", ko: "시스템 구축 연계 — 회계 시스템, 페이롤, 은행 계좌 설정 등 초기 지원." }
    ],
    docs: ["Owner ID / Identification", "Proof of State Residency", "Proposed Business Name", "Existing Business Plan", "Investor / Partner Information"],
    faq: [
      { q: { en: "Which entity should I choose?", ko: "어떤 Entity를 선택해야 하나요?" }, a: { en: "LLC offers flexibility and simplicity; S-Corp excels at reducing self-employment tax. The best structure depends on size, investor plans, and income level.", ko: "LLC는 유연성과 단순함, S-Corp은 Self-employment Tax를 줄이고 급여와 배당으로 소득을 분리하는 절세 전환이 가능합니다. 사업 규모, 투자 유치 계획, 소득 수준에 따라 맞는 형태가 달라집니다." } },
      { q: { en: "Do you help Korean businesses expanding to the US?", ko: "한국에서 미국으로 사업을 확장하는 경우도 지원하나요?" }, a: { en: "Yes. I help Korean companies set up a US entity, decide the tax structure and handle ongoing filings, in Korean or English.", ko: "네. 한국 기업의 미국 법인 설립, 세무 구조, 운영 자문까지 bilingual로 지원합니다." } }
    ]
  },
  {
    id: "svc_6", icon: "💼", category: "BUSINESS & FINANCIAL ADVISORY",
    title: { en: "Business Consulting", ko: "비즈니스 컨설팅" },
    tagline: { en: "Structure, pricing and growth decisions, checked against the numbers first.", ko: "구조·가격·확장 결정을 숫자로 먼저 따져 봅니다." },
    intro: { en: "For decisions that move your numbers: opening another location, buying out a partner, changing prices, selling the business. We talk it through with your books open, not from general rules.", ko: "매장 추가, 동업자 지분 정리, 가격 조정, 사업 매각처럼 숫자가 크게 바뀌는 결정을 앞두고 상의하는 자리입니다. 일반론이 아니라 회사 장부를 펴 놓고 이야기합니다." },
    items: [
      { en: "Entity Structure Design", ko: "Entity 구조 설계 — LLC, S-Corp, C-Corp, Partnership — 세금과 법적 보호를 함께 따져 형태를 정합니다." },
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
    tagline: { en: "Retirement savings and investment income, planned around tax.", ko: "은퇴 자금과 투자 소득을 세금과 함께 계획합니다." },
    intro: { en: "Retirement accounts, investment income and asset allocation, looked at from the tax side. The aim is one plan in which your tax, retirement and estate decisions do not work against each other.", ko: "은퇴 계좌, 투자 소득, 자산 배분을 세금 쪽에서 함께 봅니다. 세금, 은퇴, 상속에 관한 결정이 서로 어긋나지 않도록 하나의 계획으로 묶는 것이 목표입니다." },
    items: [
      { en: "Retirement Planning", ko: "은퇴 계획 — 401(k), IRA, Roth IRA, SEP-IRA 등 어느 계좌에 얼마를 넣을지 세금 쪽에서 정합니다." },
      { en: "Family Legacy Planning", ko: "가족 자산 계획 — Trust, 유언장, 생전 증여 전략을 통한 차세대 자산 이전 계획." },
      { en: "Tax-Efficient Investing", ko: "세금 효율적 투자 — 자산 배분을 세금 관점에서 점검하고 Capital Gain 실현 시점을 계획합니다." },
      { en: "Real Estate Financial Advisory", ko: "부동산 재무 자문 — 투자 부동산 취득·처분·교환(1031 Exchange) 전략 및 세무 처리." },
      { en: "Insurance & Risk Management", ko: "보험·리스크 관리 — 생명보험, 장애보험을 활용한 재무 리스크 대비 전략." },
      { en: "Wealth Transfer", ko: "자산 이전 — Estate Tax 최소화를 위한 증여 전략, GRAT, IDGT, FLP 구조 자문." }
    ],
    process: [
      { en: "Financial Assessment", ko: "재무 현황 분석 — 자산, 부채, 현금흐름, 보험, 은퇴 계좌 등 전반적인 재무 현황을 파악합니다." },
      { en: "Goal Setting", ko: "목표 설정 — 단기·중기·장기 재무 목표를 구체화하고 우선순위를 설정합니다." },
      { en: "Comprehensive Plan", ko: "종합 계획 수립 — 세금, 투자, 은퇴, 상속을 한 문서에 정리한 재무 계획서를 작성합니다." },
      { en: "Annual Review", ko: "정기 리뷰 — 연간 또는 생애 주요 이벤트 시 계획을 업데이트합니다." }
    ],
    docs: ["Recent Tax Returns", "Bank / Investment Account Statements", "Real Estate Holdings", "Life Insurance Policies", "Retirement Account Balances", "Trust / Will Copies"],
    faq: [
      { q: { en: "Does a CPA provide investment advice?", ko: "CPA가 투자 자문도 하나요?" }, a: { en: "I advise on asset structure and planning from the tax side. Recommending specific securities requires a separate license, so for that I work with licensed advisors.", ko: "CPA로서 세금 효율적 자산 구조와 재무 계획을 자문합니다. 증권 투자 추천은 별도 라이선스 영역이므로, 필요시 적합한 전문가와 협력합니다." } },
      { q: { en: "Can you advise on 1031 Exchange?", ko: "1031 Exchange 자문도 가능한가요?" }, a: { en: "Yes. When you sell investment real estate, I review whether a like-kind exchange can defer the tax and what it takes to qualify.", ko: "네. 투자 부동산 매각 후 Like-Kind 교환을 통한 양도세 이연 전략을 세무 관점에서 자문합니다." } }
    ]
  },
  {
    id: "svc_8", icon: "👨‍👩‍👧", category: "BUSINESS & FINANCIAL ADVISORY",
    title: { en: "Family Legacy & Wealth Transfer", ko: "가족 자산 이전 & 상속 계획" },
    tagline: { en: "Passing assets to the next generation, with the tax worked out first.", ko: "다음 세대로 자산을 넘기기 전에, 세금부터 정리합니다." },
    intro: { en: "Planning how your assets pass to your children: trust structure, lifetime gifts and estate tax. For families with property in both Korea and the US, I look at both countries together. Trust documents are drafted by your attorney; I work alongside them on the tax side.", ko: "자녀에게 자산을 어떻게 넘길지 계획합니다. 신탁 구조, 생전 증여, 상속세를 함께 보고, 한국과 미국 양쪽에 자산이 있는 가정은 두 나라를 같이 놓고 검토합니다. 신탁 문서는 변호사가 작성하고, 저는 세금 쪽을 맡아 함께 진행합니다." },
    items: [
      { en: "Trust Structure & Accounting", ko: "신탁 구조와 회계 — Revocable/Irrevocable Trust 구조 자문과 신탁 회계(수익자 기록, K-1 발행)." },
      { en: "Estate Tax Planning", ko: "상속세 계획 — 연방 및 CA 상속세 최소화 전략. Unified Credit 활용 및 증여 제외 적용." },
      { en: "Lifetime Gift Strategy", ko: "생전 증여 전략 — 연간 증여 면제 한도(2026년 받는 사람 1인당 $19,000)를 활용해 언제, 얼마씩 증여할지 계획합니다." },
      { en: "GRAT / IDGT Structures", ko: "GRAT / IDGT 구조 — 고자산가 대상 절세 자산 이전 기법. Grantor Retained Annuity Trust 및 Intentionally Defective Grantor Trust." },
      { en: "FLP / LLC Structures", ko: "FLP / LLC 구조 — Family Limited Partnership 및 LLC를 활용한 사업체 자산 이전 및 평가 할인 절세." },
      { en: "Will & Beneficiary Strategy", ko: "유언장 및 수혜자 전략 — 유언장을 검토하고, 은퇴 계좌·보험의 수혜자 지정이 계획과 맞는지 점검합니다." }
    ],
    process: [
      { en: "Asset Overview", ko: "자산 현황 파악 — Trust, 부동산, 사업체, 승계 예정 자산 등 전체 현황 점검." },
      { en: "Tax-Saving Structure", ko: "절세 구조 설계 — Estate Tax가 얼마나 나올지 먼저 계산하고, 줄일 수 있는 구조를 설계합니다." },
      { en: "Trust & Document Coordination", ko: "신탁 및 문서 작성 연계 — 서류 작성은 Estate Attorney와 협력 진행 (Danny 네트워크 활용)." },
      { en: "Annual Review", ko: "연간 리뷰 — 세법 변경, 자산 변동, 가족 상황 변화에 따른 플랜 업데이트." }
    ],
    docs: ["Trust Document Copies", "Will / Testament Copy", "Real Estate Title Documents", "Life Insurance Policies", "Beneficiary Designation Forms", "Recent Tax Returns"],
    faq: [
      { q: { en: "Does a trust avoid probate?", ko: "Trust를 설정하면 프로베이트(Probate)를 피할 수 있나요?" }, a: { en: "Generally yes — a properly funded trust avoids probate, making inheritance faster and less costly. Assets must actually be transferred into the trust.", ko: "일반적으로 매녀타입드 Trust는 프로베이트를 피할 수 있어 상속 과정을 빠르고 비용을 줄일 수 있습니다. 다만 Trust에 자산을 실제 이전해야 합니다." } },
      { q: { en: "What is the federal Estate Tax exemption?", ko: "연방 Estate Tax는 얼마부터 부과되나요?" }, a: { en: "As of 2024, the federal Estate Tax exemption is approximately $13.6M (individual) / $27.2M (couple). Sunset provisions may change this after 2025.", ko: "2024년 기준 연방 Estate Tax 면제 한도는 약 $13.6M(개인)/$27.2M(부부)입니다. 2025년 이후 일몰조항(Sunset Provision)에 따라 변경될 수 있어 지금 준비하는 게 중요합니다." } },
      { q: { en: "Do you help with 2nd-generation Korean-American inheritance?", ko: "한인 2세대 상속 문제도 도와주시나요?" }, a: { en: "Yes. That includes US filings for children who are citizens or green card holders, transferring assets in stages, and the tax side of bringing home proceeds from selling Korean real estate.", ko: "네. 미국 시민권자 또는 영주권자인 자녀의 미국 세금 신고, 자산의 단계적 이전, 한국 부동산 판매이익 입금에 대한 세무 처리도 지원합니다." } }
    ]
  },
  {
    id: "svc_10", icon: "🌏", category: "SPECIALTY SERVICES",
    title: { en: "International Tax", ko: "국제 세무" },
    tagline: { en: "Foreign accounts, foreign income and filings on both sides of the Pacific.", ko: "해외 계좌, 해외 소득, 한국과 미국 양쪽의 신고까지." },
    intro: { en: "For people and companies with income, accounts or businesses in both Korea and the US. I handle FBAR and FATCA reporting, foreign tax credits, the US-Korea tax treaty, and the filings that come with owning a foreign company.", ko: "한국과 미국 양쪽에 소득이나 계좌, 회사가 있는 분들의 신고를 맡습니다. FBAR와 FATCA 신고, 외국납부세액공제, 한미 조세조약 적용, 외국 법인을 가진 경우의 신고까지 봅니다." },
    items: [
      { en: "FBAR / FATCA Filing", ko: "FBAR / FATCA 신고 — 해외 금융계좌 신고(FinCEN 114) 및 Form 8938. 미신고 시 고액 패널티 방지." },
      { en: "US-Korea Tax Treaty", ko: "미-한 조세 조약 — 한미 조세조약을 적용해 같은 소득에 두 번 세금을 내지 않도록 하고 원천징수율을 맞춥니다." },
      { en: "Foreign Corporate Filing", ko: "외국 법인 신고 — Form 5471 (외국 법인), Form 8865 (외국 파트너십), Form 8858 (외국 지점)." },
      { en: "Non-Resident Tax", ko: "비거주자 세무 — NRA(Non-Resident Alien) 세금 신고, Form 1040-NR 처리." },
      { en: "Foreign Gifts & Inheritances", ko: "해외 증여·상속 — 해외로부터 받은 증여(Form 3520) 및 상속 신고. 해외 재산 관련 컴플라이언스." },
      { en: "US Entity Setup for Korean Businesses", ko: "미국 법인 설립 자문 — 한국 기업이 미국에 진출할 때 법인 형태와 세무 구조를 정합니다." }
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
    tagline: { en: "Every trade matched to its cost basis and reported the way the IRS expects.", ko: "거래마다 취득가를 맞춰 IRS 기준대로 신고합니다." },
    intro: { en: "I pull exchange and wallet records together and work out the gains, losses and income you need to report, DeFi, staking and NFTs included. If earlier years were missed or reported wrong, they can be amended.", ko: "거래소와 지갑 기록을 모아 신고해야 할 손익과 소득을 계산합니다. DeFi, 스테이킹, NFT도 포함됩니다. 지난 연도에 빠졌거나 잘못 신고된 부분은 수정 신고로 바로잡습니다." },
    items: [
      { en: "Trade Gain/Loss Calculation", ko: "거래 손익 계산 — FIFO/LIFO/HIFO 방법 적용. 거래소별 데이터 통합 및 Capital Gain/Loss 산정." },
      { en: "Mining / Staking Income", ko: "Mining / Staking 소득 — 채굴·스테이킹 보상의 소득 인식 시점 및 금액 산정. 사업 소득 vs 투자 소득 구분." },
      { en: "DeFi / NFT Processing", ko: "DeFi / NFT 처리 — DeFi 유동성 제공, NFT 민팅·매각 관련 세무 처리 및 소득 분류." },
      { en: "Exchange Data Consolidation", ko: "거래소 데이터 정리 — Coinbase, Binance, Kraken 등 다수 거래소 데이터 통합 및 누락 거래 복원." },
      { en: "Amended Returns", ko: "과거 신고 수정 — 암호화폐 신고 누락 또는 오류 수정을 위한 Amended Return 처리." },
      { en: "Tax Loss Harvesting", ko: "손실 실현 절세 — 연말 전에 손실 난 포지션을 정리해 이익과 상계할지 검토합니다." }
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
    tagline: { en: "Form 990, restricted funds and board reports for churches and nonprofits.", ko: "교회와 비영리단체의 990 신고, 지정 기금, 이사회 재무 보고." },
    intro: { en: "I keep nonprofit books under nonprofit accounting rules and file the Form 990 every year, watching the deadlines and reporting requirements that keep tax-exempt status in good standing.", ko: "비영리 회계 기준에 맞춰 장부를 관리하고 매년 Form 990을 신고합니다. 면세 지위가 흔들리지 않도록 신고 기한과 보고 의무를 챙깁니다." },
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
      { q: { en: "Can you help from the 501(c)(3) application stage?", ko: "501(c)(3) 신청부터 도와줄 수 있나요?" }, a: { en: "Yes. I prepare Form 1023 and handle IRS correspondence until the exemption is approved.", ko: "네. Form 1023 작성부터 IRS 서신 대응까지 면세 지위 취득 전 과정을 지원합니다." } },
      { q: { en: "What happens if Form 990 is not filed?", ko: "Form 990을 제출하지 않으면 어떻게 되나요?" }, a: { en: "Missing 3 consecutive years results in automatic IRS revocation of tax-exempt status. Reinstatement requires starting the application from scratch.", ko: "3년 연속 미제출 시 IRS가 면세 지위를 자동 취소합니다. 취소 후 재취득은 처음부터 신청해야 합니다." } },
      { q: { en: "Do you serve small churches and community organizations?", ko: "소규모 교회나 커뮤니티 단체도 서비스가 가능한가요?" }, a: { en: "Yes. Small organizations that only file the 990-N (e-Postcard) are welcome, as are larger ones.", ko: "네. 990-N(e-Postcard)만 제출하는 소규모 단체부터 대형 비영리까지 규모에 맞는 서비스를 제공합니다." } }
    ]
  },
  {
    id: "svc_13", icon: "🏗️", category: "SPECIALTY SERVICES",
    title: { en: "Industry-Specific CPA", ko: "업종별 전문 CPA" },
    tagline: { en: "Accounting set up the way your industry actually runs.", ko: "업종이 실제로 돌아가는 방식에 맞춘 회계." },
    intro: { en: "Construction, real estate, medical practices, restaurants and online sellers each have their own rules, and their numbers go wrong in different places. I set up the books and the tax work around how your industry actually runs.", ko: "건설, 부동산, 병원, 식당, 온라인 판매는 업종마다 규정도 다르고 숫자가 틀어지는 지점도 다릅니다. 업종이 실제로 돌아가는 방식에 맞춰 장부와 세무를 잡습니다." },
    items: [
      { en: "Construction & Real Estate", ko: "건설·부동산 — 공사별 원가 관리, 완공기준 수익인식(PCM), Retainage 회계, 1031 Exchange 자문." },
      { en: "Healthcare / Medical", ko: "병원·의료 — 병의원·치과·의료 법인 세무 구조 설계. HIPAA 컴플라이언스, MSO 구조 자문." },
      { en: "Restaurant & Retail", ko: "식당·소매 — CDTFA 판매세 컴플라이언스, 현금 매출 관리, 팁 소득 보고, POS 데이터 연계." },
      { en: "eCommerce / Creators", ko: "온라인 판매·크리에이터 — 아마존 셀러, 이커머스 사업자, 유튜버·틱톡커·크리에이터들의 여러 주에 걸친 판매세·소득세 신고와 수익 구조 정리." },
      { en: "Professional Services", ko: "전문 서비스업 — 변호사·회계사·컨설턴트 등 전문직의 로열티 수입, S-Corp 전환, 구이 관리." },
      { en: "Gas Station / Hotel", ko: "주유소·호텔 — 주유소 판매세 신고, 호텔 점유율(Occupancy Tax), 가맹점 임대료 수입 회계 전문." }
    ],
    process: [
      { en: "Industry Compliance Review", ko: "업종 컴플라이언스 점검 — 해당 업종의 특수 세무 의무와 리스크 요소를 상담에서 직접 파악합니다." },
      { en: "Custom Accounting System", ko: "맞춤형 회계 시스템 구축 — 업종별 특수 항목(원가, 판매, 재고, 무형자산 등)을 반영한 COA 설계." },
      { en: "Tax Strategy", ko: "세무 전략 수립 — 업종별 세금 특성과 절세 포인트를 활용한 연간 신고 전략 수립." },
      { en: "Ongoing Support", ko: "지속적 지원 — 경영진단, 분기 검토, 규제 변경 사항 안내 등 연간 오너십으로 지원합니다." }
    ],
    docs: ["Business Registration Documents", "Last 2 Years of Financial Statements", "Sales Tax Registration Certificate", "Industry-Specific License Documents", "Payroll Records", "Tax Returns (Last 2 Years)"],
    faq: [
      { q: { en: "Can you help with construction cost accounting?", ko: "건설업의 코스트 어카운팅이 너무 복잡한데 도와주시나요?" }, a: { en: "Yes. Job costing, retainage and percentage-of-completion revenue are the core of construction books, and I set them up for contractors.", ko: "네. 공사별 원가 관리(Job Costing), Retainage, 진행기준 수익 인식 등 건설업 특유의 회계를 다룹니다." } },
      { q: { en: "Do restaurants need to file CDTFA separately?", ko: "음식점도 CDTFA 신고를 별도로 해야 하나요?" }, a: { en: "Yes. Restaurants are subject to sales tax, and there are separate reporting obligations for tips paid to employees. Record keeping for CDTFA audit preparedness is critical.", ko: "네. 음식점은 판매세 대상이며, 직원에게 지급하는 팁도 별도 보고 의무가 있습니다. CDTFA 감사 대비를 위한 기록 관리가 중요합니다." } },
      { q: { en: "Does an eCommerce business need to file multi-state taxes?", ko: "eCommerce 업체는 다주 세금 신고를 해야 하나요?" }, a: { en: "It depends on where your buyers are. I review nexus state by state to see where you must register and file, and help set up tools that collect and report the tax.", ko: "구매자가 있는 주에 따라 판매세(Sales Tax) 납부 의무가 다릅니다. Nexus 분석을 통해 각 주별 신고 의무를 파악하고 자동화 도구 연계를 도와드립니다." } }
    ]
  }
  ,{
    id: "svc_14", icon: "🌐", category: "SPECIALTY SERVICES",
    title: { en: "Bilingual CPA Services", ko: "이중 언어 CPA 서비스" },
    tagline: { en: "Tax and accounting explained in Korean, filed in English.", ko: "설명은 한국어로, 신고는 영어로." },
    intro: { en: "Meetings, emails and explanations can all be in Korean or English, whichever is easier for you. Returns and agency letters are in English, so I go through what they say in Korean.", ko: "상담과 이메일은 한국어나 영어 중 편한 쪽으로 진행합니다. 신고서와 기관 서류는 영어로 되어 있으니, 무엇이 적혀 있는지 한국어로 풀어서 설명해 드립니다." },
    items: [
      { en: "Korean & English Tax Consultation", ko: "한영 세무 상담 — 세금 신고, 절세 전략, IRS/FTB 문제 등 모든 세무 사항을 한국어로 상담 및 처리." },
      { en: "Immigrant Tax Planning (FBAR/FATCA)", ko: "이민자 세무 계획 — 영주권·시민권 취득 전후로 달라지는 세금 문제를 미리 정리하고, 해외 계좌·자산 신고(FBAR/FATCA)를 맡습니다." },
      { en: "Cross-Border Business Advisory", ko: "한미 비즈니스 자문 — 한국 기업의 미국 진출 또는 미국 사업체의 한국 연계 구조 설계 및 세무 전략." },
      { en: "Korean Community Business Support", ko: "한인 커뮤니티 사업 지원 — 한인 소상공인의 법인 설립, 세무, 회계, 급여를 한국어로 한 번에 맡습니다." },
      { en: "Bilingual Financial Reporting", ko: "이중 언어 재무 보고 — 재무제표 및 세무 보고서를 한국어와 영어로 동시 제공. 한국 본사·투자자 보고 지원." },
      { en: "Korean Business Expansion to US", ko: "한국 기업 미국 진출 — 미국 법인 설립, EIN 등록, 은행 계좌 개설 자문, 초기 세무 구조 설계까지 한국어로 지원." }
    ],
    process: [
      { en: "Initial Consultation in Korean", ko: "한국어 초기 상담 — 세무·회계 현황을 한국어로 파악하고 필요한 서비스를 정확히 진단합니다." },
      { en: "Bilingual Document Preparation", ko: "이중 언어 서류 준비 — 미국 세무 서류를 한국어 설명과 함께 준비하여 내용을 완전히 이해할 수 있도록 합니다." },
      { en: "Filing & Compliance", ko: "신고 및 컴플라이언스 — IRS, FTB, FinCEN 등 관련 기관에 정확하고 기한 내 신고를 완료합니다." },
      { en: "Ongoing Korean-Language Support", ko: "지속적인 한국어 지원 — 연중 세무 이슈 발생 시 한국어로 신속히 대응하고 안내합니다." }
    ],
    docs: ["Passport or ID / 여권 또는 신분증", "Prior Year Tax Returns / 이전 세금 신고서", "Foreign Account Info (FBAR) / 해외 계좌 정보", "Business Registration / 사업자 등록 서류", "Korean Tax Records (if any) / 한국 세금 자료", "Income & Expense Documents / 소득·지출 서류"],
    faq: [
      { q: { en: "Can all consultations be conducted in Korean?", ko: "상담부터 신고까지 전부 한국어로 가능한가요?" }, a: { en: "Yes. From the initial consultation through filing and follow-up, everything can be handled in Korean. No English required.", ko: "네. 초기 상담부터 신고, 사후 관리까지 모든 과정을 한국어로 진행합니다. 영어를 못하셔도 전혀 불편함 없이 서비스를 받으실 수 있습니다." } },
      { q: { en: "I recently immigrated — where do I start?", ko: "최근에 미국에 왔는데 세금 신고를 어떻게 시작해야 하나요?" }, a: { en: "Immigration status, income sources, and foreign assets all affect your US tax obligations. We'll map out your specific situation and filing requirements in a consultation.", ko: "이민 신분, 소득 출처, 해외 자산 여부에 따라 미국 세금 신고 의무가 달라집니다. 상담을 통해 본인의 상황에 맞는 신고 의무와 절차를 안내해 드립니다." } },
      { q: { en: "Do you serve non-Korean clients as well?", ko: "한국어를 못하는 고객도 서비스를 받을 수 있나요?" }, a: { en: "Yes. Every service is available in English. Korean is there for clients who want it, not a requirement.", ko: "네. 모든 서비스를 영어로도 똑같이 진행합니다. 한국어는 원하시는 분께 드리는 선택지일 뿐 조건이 아닙니다." } }
    ]
  }
];

// Home page service card → subpage mapping
const homeServiceSubpages = ["svc_1", "svc_2", "svc_5", "svc_14"];

// Multilingual welcome messages for Contact section
const multilingualWelcome = [
  { flag: "EN", lang: "English", message: "Phone, office visits or email." },
  { flag: "KO", lang: "한국어", message: "전화, 방문, 이메일 모두 편하게 이용하세요." },
  { flag: "ES", lang: "Español", message: "Escríbame por correo electrónico. Las consultas y el trabajo en español se atienden por correo." },
  { flag: "ZH", lang: "中文", message: "请通过电子邮件联系我。中文咨询和业务均通过电子邮件进行。" },
  { flag: "VI", lang: "Tiếng Việt", message: "Vui lòng liên hệ qua email. Tư vấn và công việc bằng tiếng Việt được thực hiện qua email." },
  { flag: "JA", lang: "日本語", message: "メールでお問い合わせください。日本語でのご相談・業務はメールで対応いたします。" },
  { flag: "TL", lang: "Tagalog", message: "Sumulat po kayo sa email. Ang konsultasyon at trabaho sa Tagalog ay ginagawa sa email." },
  { flag: "MN", lang: "Монгол", message: "Имэйлээр холбогдоно уу. Монгол хэл дээрх зөвлөгөө, ажлыг имэйлээр гүйцэтгэнэ." }
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
- Services: Tax Services, Bookkeeping & Payroll, Business Formation & Consulting, Bilingual CPA Services
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
// Draft kept outside the component: the page re-mounts when the nav bar changes on scroll,
// and without this the visitor's typing was wiped before they could press Submit.
const EMPTY_CONTACT = { name: "", email: "", phone: "", service: "", message: "" };
let contactDraft = { ...EMPTY_CONTACT };

function ContactForm({ lang, t, colors, fonts }) {
  const [fd, setFd] = useState(() => ({ ...contactDraft }));
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (field, value) => {
    setFormError("");
    setFd(prev => { const next = { ...prev, [field]: value }; contactDraft = next; return next; });
  };
  const handleSubmit = () => {
    if (!fd.name || !fd.email) {
      setFormError(lang === "en" ? "Please enter your name and email." : "성함과 이메일을 입력해 주세요.");
      return;
    }
    fetch("https://formspree.io/f/meerdzov", {
      method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ ...fd, page: window.location.pathname }),
    }).then((res) => {
      if (!res.ok) throw new Error("send failed");
      // Google Ads conversion (IDs live in public/index.html → window.DK_ADS; blank = off)
      try {
        const ads = window.DK_ADS;
        if (ads && ads.id && ads.label && typeof window.gtag === "function") {
          window.gtag("event", "conversion", { send_to: ads.id + "/" + ads.label });
        }
      } catch (e) { /* tracking must never block the form */ }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      contactDraft = { ...EMPTY_CONTACT };
      setFd({ ...EMPTY_CONTACT });
    }).catch(() => { alert("Failed to send. Please call 213-325-9800."); });
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", border: `1px solid ${colors.lightGray}`,
    borderRadius: 4, fontSize: 15, fontFamily: fonts.sans, color: colors.navy,
    outline: "none", transition: "border-color 0.3s", boxSizing: "border-box"
  };

  return (
    <div className="contact-form-box" style={{ background: colors.white, padding: 48, borderRadius: 4, border: `1px solid ${colors.lightGray}`, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontFamily: fonts.display, fontSize: 24, color: colors.navy, marginBottom: 8 }}>
        {lang === "en" ? "Request a Consultation" : "상담 신청"}
      </h3>
      <p style={{ fontSize: 14, color: colors.gray, marginBottom: 32 }}>
        {lang === "en" ? "Fill out the form and I'll get back to you within 24 hours." : "아래 양식을 작성하시면 24시간 이내에 연락드리겠습니다."}
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
        {formError && (
          <div style={{ color: "#B91C1C", fontSize: 14, fontWeight: 600 }}>{formError}</div>
        )}
        <button onClick={handleSubmit} style={{
          background: `linear-gradient(135deg, ${colors.gold}, ${colors.lightGold})`, border: "none", color: colors.darkNavy,
          fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          padding: "18px 40px", cursor: "pointer", borderRadius: 2, marginTop: 8,
          transition: "all 0.3s ease", boxShadow: `0 4px 16px ${colors.gold}33`
        }}>
          {t.contact.form.submit}
        </button>
        <p style={{ fontSize: 12, color: colors.gray, lineHeight: 1.6, margin: 0 }}>
          {lang === "en"
            ? "Please don't include Social Security numbers or tax documents in this form. "
            : "이 양식에는 소셜 번호나 세금 서류를 넣지 마세요. "}
          <a href={lang === "en" ? "/privacy.html" : "/privacy.html#ko"} style={{ color: colors.gray, textDecoration: "underline" }}>
            {lang === "en" ? "Privacy Policy" : "개인정보처리방침"}
          </a>
        </p>
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
  const S = { section: { maxWidth: 1200, margin: "0 auto", padding: "100px clamp(16px, 5vw, 40px)" } };
  const agencyBlock = (agency, color, onlineRows, checkSteps, checkAddr) => (
    <div key={agency} style={{ marginBottom: 56 }}>
      <div style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, padding: "20px 32px", borderRadius: "8px 8px 0 0" }}>
        <h3 style={{ fontFamily: fonts.display, fontSize: 20, color: "#fff", fontWeight: 700 }}>{agency}</h3>
      </div>
      <div style={{ border: `1px solid ${colors.lightGray}`, borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
        {/* Online section */}
        <div style={{ background: colors.cream, padding: "12px 24px", borderBottom: `1px solid ${colors.lightGray}`, display: "flex", alignItems: "center", gap: 8 }}>
          <LineIcon name="globe" size={16} color={colors.gold} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.gold, textTransform: "uppercase" }}>{isKo ? "온라인 납부" : "Online Payment"}</span>
        </div>
        {onlineRows.map((row, j) => (
          <div key={j} className="res-row" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 24px", borderBottom: `1px solid ${colors.lightGray}`, alignItems: "start" }}>
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
          <LineIcon name="mail" size={16} color={colors.gold} />
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
        <p style={{ fontSize: 13, color: colors.navy, maxWidth: 800, margin: "0 auto", lineHeight: 1.7, display: "flex", gap: 8, justifyContent: "center", alignItems: "flex-start" }}>
          <LineIcon name="bulb" size={18} color={colors.gold} style={{ marginTop: 2 }} />
          <span>{isKo ? "온라인 납부(은행 계좌 ACH)를 권장드립니다 — 무료이며, 빠르고, 즉시 확인 가능합니다." : "Online payment (ACH/bank account) is always recommended — it's free, fast, and provides instant confirmation."}</span>
        </p>
      </div>

      <div style={S.section}>
        {agencyBlock("IRS — Internal Revenue Service (Federal Income Tax)", "#1B3A5C", irsOnline, irsCheckSteps, irsAddr)}

        <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 8, padding: "14px 20px", marginBottom: 40, display: "flex", gap: 12, alignItems: "start" }}>
          <LineIcon name="alert" size={20} color="#B45309" style={{ marginTop: 1 }} />
          <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.7 }}>
            {isKo ? "EFTPS.gov는 2026년 개인 납부에서 단계적으로 폐지됩니다. IRS Direct Pay 또는 IRS Online Account로 전환하세요." : "EFTPS.gov is being phased out for individuals in 2026. Switch to IRS Direct Pay or create an IRS Online Account."}
          </p>
        </div>

        {agencyBlock("FTB — Franchise Tax Board (CA State Income Tax)", "#1E5C3A", ftbOnline, ftbCheckSteps, ftbAddr)}

        <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 8, padding: "14px 20px", marginBottom: 40, display: "flex", gap: 12, alignItems: "start" }}>
          <LineIcon name="alert" size={20} color="#B45309" style={{ marginTop: 1 }} />
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
    "BUSINESS & FINANCIAL ADVISORY": colors.navy,
    "SPECIALTY SERVICES": colors.navy
  };
  const catColor = categoryColors[service.category] || colors.navy;

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(165deg, ${catColor} 0%, ${catColor}cc 100%)`, padding: "160px 40px 80px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
          {isKo ? ({ "CORE TAX & ACCOUNTING": "세금 · 회계", "BUSINESS & FINANCIAL ADVISORY": "사업 · 재무 자문", "SPECIALTY SERVICES": "전문 분야" }[service.category] || service.category) : service.category}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><LineIcon name={service.icon} size={46} color={colors.lightGold} stroke={1.4} /></div>
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
            {isKo ? "서비스 항목" : "What this covers"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20 }}>
            {service.items.map((item, i) => {
              const parts = isKo ? item.ko.split(" — ") : item.en.split(" — ");
              const itemTitle = parts[0];
              const itemDesc = parts[1] || "";
              return (
                <div key={i} style={{ background: colors.white, padding: "24px 28px", borderRadius: 6, border: `1px solid ${colors.lightGray}`, borderTop: `3px solid ${catColor}`, transition: "box-shadow 0.3s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: catColor, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>{itemTitle}</span>
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
            {isKo ? "진행 절차" : "How it works"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 24 }}>
            {service.process.map((step, i) => {
              const parts = isKo ? step.ko.split(" — ") : step.en.split(" — ");
              const stepTitle = parts[0];
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
        <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, marginBottom: 64 }}>
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
          <p style={{ fontSize: 13, color: "#ffffffaa", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "6px 16px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LineIcon name="phone" size={14} />213-325-9800</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LineIcon name="mail" size={14} />info.dkcpa@gmail.com</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LineIcon name="globe" size={14} />dkcpala.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
// ============================================================
// URL routing: /services, /contact, /construction, /svc_1, landing pages …
// ============================================================
const ROUTES = ["home", "services", "about", "resources", "contact", "construction", "client-info", "s-corp-calculator", ...Object.keys(LANDINGS)];
function pathToPage() {
  const p = window.location.pathname.replace(/^\/|\/$/g, "");
  if (ROUTES.includes(p) || /^svc_\d+$/.test(p)) return p;
  return "home";
}
// The home page keeps the title and description written in public/index.html
const DEFAULT_HEAD = {
  title: typeof document !== "undefined" ? document.title : "",
  desc: typeof document !== "undefined" ? (document.querySelector('meta[name="description"]') || {}).content || "" : "",
};

export default function CRAccountancy() {
  // ?lang=ko opens the Korean version (used for Korean-language ads and KakaoTalk links)
  const [lang, setLang] = useState(() => {
    try { return new URLSearchParams(window.location.search).get("lang") === "ko" ? "ko" : "en"; } catch (e) { return "en"; }
  });
  const [page, setPage] = useState(pathToPage);
  const [gStats, setGStats] = useState(null); // Google rating + review count for the first screen
  useEffect(() => {
    loadReviews().then((d) => {
      if (typeof d.rating === "number" && typeof d.total === "number" && d.total > 0) setGStats({ rating: d.rating, total: d.total });
    }).catch(() => {});
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(null); // About: industry card that is open
  const [scrolled, setScrolled] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const t = translations[lang];
  const contentRef = useRef(null);

  useEffect(() => { setFadeIn(false); const timer = setTimeout(() => setFadeIn(true), 50); return () => clearTimeout(timer); }, [page]);
  useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); }, []);

  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
    setIndustryOpen(null);
    const url = p === "home" ? "/" : `/${p}`;
    if (window.location.pathname !== url) window.history.pushState({ page: p }, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back / forward buttons
  useEffect(() => {
    const onPop = () => setPage(pathToPage());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Per-page title, description and canonical address for search engines
  useEffect(() => {
    const ko = lang === "ko";
    const brand = "Danny Kim, CPA";
    const svcItem = serviceDetails.find(s => s.id === page);
    const landing = LANDINGS[page];
    const titles = {
      services: ko ? "서비스 안내" : "Services",
      about: ko ? "사무실 소개" : "About",
      contact: ko ? "문의하기" : "Contact",
      resources: ko ? "자료실" : "Resources",
      construction: ko ? "건설업 회계·현장별 원가 관리" : "Construction Accounting & Job Costing in LA",
      "client-info": ko ? "고객 안내" : "Client Info",
      "s-corp-calculator": ko ? "S corp 계산기 (캘리포니아)" : "S Corp Tax Calculator for California",
    };
    const descs = {
      "client-info": ko ? "처음 맡기실 때의 순서, 서류와 결제 안내, 2027년 세금 마감일, 자주 묻는 질문." : "How to get started, sending documents, paying your fee, 2027 tax deadlines and common questions.",
      "s-corp-calculator": ko ? "개인 사업자·1인 LLC의 자영업세와 S corp 급여세·캘리포니아 세금을 비교하는 계산기." : "Compare self-employment tax with S corp payroll and California taxes. A quick estimate for California business owners.",
    };
    let title = DEFAULT_HEAD.title;
    let desc = DEFAULT_HEAD.desc;
    if (landing) { title = ko ? landing.seo.title.ko : landing.seo.title.en; desc = ko ? landing.seo.desc.ko : landing.seo.desc.en; }
    else if (svcItem) title = `${ko ? svcItem.title.ko : svcItem.title.en} | ${brand}`;
    else if (titles[page]) { title = `${titles[page]} | ${brand}`; if (descs[page]) desc = descs[page]; }
    document.title = title;
    const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el && val) el.setAttribute(attr, val); };
    set('meta[name="description"]', "content", desc);
    const url = "https://dkcpala.com" + (page === "home" ? "" : `/${page}`);
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", desc);
  }, [page, lang]);

  const colors = {
    navy: "#1A2332", darkNavy: "#0F1720", blue: "#2563EB", lightBlue: "#3B82F6",
    gold: "#A0845C", lightGold: "#C4A87A", cream: "#FAFAFA", white: "#FFFFFF",
    gray: "#6B7280", lightGray: "#E5E7EB"
  };
  // Accounting Systems & AI advisory page on the consulting site
  const ACCT_URL = "https://consulting.dkcpala.com/accounting";
  const acctLabel = lang === "ko" ? "회계 시스템·AI 자문" : "Accounting Systems & AI";
  const fonts = {
    display: "'DM Serif Display', Georgia, serif",
    body: "'Source Serif 4', Georgia, serif",
    sans: "'DM Sans', 'Helvetica Neue', sans-serif"
  };
  const baseStyles = {
    page: { minHeight: "100vh", background: colors.white, fontFamily: fonts.sans, color: colors.navy, overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "12px 0" : "20px 0", background: scrolled ? "rgba(10, 22, 40, 0.97)" : "rgba(10, 22, 40, 0.9)", backdropFilter: "blur(20px)", transition: "all 0.4s ease", borderBottom: scrolled ? `1px solid ${colors.gold}33` : "none" },
    navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    section: { maxWidth: 1200, margin: "0 auto", padding: "100px clamp(16px, 5vw, 40px)" }
  };

  // ============================================================
  // NAVBAR — Language selector: EN / KO only
  // ============================================================
  const NavBar = () => (
    <nav style={baseStyles.nav}>
      <div className="nav-inner" style={baseStyles.navInner}>
        <a href="/" className="brand" aria-label="Danny Kim, CPA — CR Accountancy & Consulting, home"
          onClick={(e) => { e.preventDefault(); navigate("home"); }}>
          <img src="/cr-mark.png" alt="" className="brand-mark" width="184" height="92" />
          <span className="brand-rule" aria-hidden="true" />
          <span className="brand-text" aria-hidden="true">
            <span className="brand-name">DANNY KIM, CPA</span>
            <span className="brand-sub">CR ACCOUNTANCY &amp; CONSULTING</span>
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="desktop-nav" style={{ display: "flex", gap: 4, marginRight: 16 }}>
            {["services", "about", "resources", "client-info", "contact"].map((p) => (
              <button key={p} onClick={() => navigate(p)} style={{
                background: page === p ? `${colors.gold}22` : "transparent", border: "none",
                color: page === p ? colors.gold : colors.white, fontFamily: fonts.sans, fontSize: 13,
                fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", padding: "10px 14px",
                cursor: "pointer", borderRadius: 4, transition: "all 0.3s ease", whiteSpace: "nowrap"
              }}>
                {t.nav[p]}
              </button>
            ))}
          </div>

          {/* Accounting Systems & AI — stays in the top bar on tablets too (hidden on phones; phones get it in the menu) */}
          <a href={ACCT_URL} target="_blank" rel="noopener noreferrer" className="acct-nav-btn" style={{
            position: "relative", display: "inline-flex", alignItems: "center", textDecoration: "none",
            background: "transparent", border: `1px solid ${colors.lightGold}99`,
            color: colors.white, fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
            padding: "9px 16px", borderRadius: 6, marginRight: 8, whiteSpace: "nowrap"
          }}>
            {acctLabel}
            <span style={{
              position: "absolute", top: -9, right: -10, background: colors.gold, color: colors.darkNavy,
              fontSize: 9, fontWeight: 800, letterSpacing: 1, padding: "2px 6px", borderRadius: 8
            }}>NEW</span>
          </a>

          {/* Language Toggle: EN / KO only */}
          <div style={{ display: "flex", background: `${colors.gold}15`, borderRadius: 6, border: `1px solid ${colors.gold}33`, overflow: "hidden" }}>
            {[{ code: "en", label: "EN" }, { code: "ko", label: "KO" }].map((l) => (
              <button key={l.code} className="lang-btn" onClick={() => setLang(l.code)} style={{
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
          {["home", "services", "about", "resources", "client-info", "contact"].map((p) => (
            <button key={p} onClick={() => navigate(p)} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
              color: page === p ? colors.gold : colors.white, fontFamily: fonts.sans, fontSize: 15,
              padding: "14px 0", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
              borderBottom: `1px solid ${colors.gold}11`
            }}>
              {t.nav[p]}
            </button>
          ))}
          <a href={ACCT_URL} target="_blank" rel="noopener noreferrer" style={{
            display: "block", width: "100%", textAlign: "left", textDecoration: "none",
            color: colors.lightGold, fontFamily: fonts.sans, fontSize: 15, fontWeight: 700,
            padding: "14px 0", letterSpacing: 1, borderBottom: `1px solid ${colors.gold}11`
          }}>
            {acctLabel} ↗
          </a>
        </div>
      )}
    </nav>
  );

  // ============================================================
  // HOME PAGE
  // ============================================================
  const HomePage = () => (
    <div>
      {/* Hero — one message, one button */}
      <section className="hero2" data-ko={lang === "ko" ? "1" : "0"}>
        <div className="hero2-glow" aria-hidden="true" />
        <div className="hero2-rings" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero2-in">
          <div className="hero2-who">{lang === "ko" ? "Danny Kim, CPA · LA 코리아타운" : "Danny Kim, CPA · Koreatown, Los Angeles"}</div>
          <h1 className="hero2-h1">
            {lang === "ko"
              ? (<><span>숫자가 정확하면,</span><span className="hero2-accent">결정이 빨라집니다.</span></>)
              : (<><span>Clean numbers.</span><span className="hero2-accent">Faster decisions.</span></>)}
          </h1>
          <p className="hero2-sub">
            {lang === "ko"
              ? "세무와 회계, 회계 시스템까지. LA의 사업체와 재무팀을 한국어와 영어로 돕습니다."
              : "Tax, accounting and accounting systems for LA businesses and finance teams, in Korean and English."}
          </p>
          <div className="hero2-cta">
            <button type="button" className="hero2-btn" onClick={() => navigate("contact")}>
              {lang === "ko" ? "상담 예약하기" : "Book a consultation"} <span aria-hidden="true">→</span>
            </button>
            <a className="hero2-call" href="tel:+12133259800">{lang === "ko" ? "첫 상담 30분 무료 · 213-325-9800" : "First 30 minutes free · 213-325-9800"}</a>
          </div>
          <button type="button" className="hero2-proof" onClick={() => { const el = document.getElementById("reviews"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}>
            {gStats ? (
              <>
                <span className="hero2-stars" aria-hidden="true">★★★★★</span>
                <span>{lang === "ko"
                  ? <>Google 평점 <b>{gStats.rating.toFixed(1)}</b> · 리뷰 {gStats.total}개</>
                  : <><b>{gStats.rating.toFixed(1)}</b> on Google · {gStats.total} reviews</>}</span>
                <span aria-hidden="true">→</span>
              </>
            ) : (
              <><span className="hero2-star">★</span>{lang === "ko" ? "Google 리뷰 읽어 보기" : "Read Google reviews"}</>
            )}
          </button>
        </div>
      </section>

      {/* Services — two quiet lists; the full list lives on /services */}
      <section className="svc2" data-ko={lang === "ko" ? "1" : "0"}>
        <div className="svc2-in">
          <div className="svc2-head">
            <div>
              <div className="svc2-eyebrow">{lang === "ko" ? "서비스" : "Services"}</div>
              <h2 className="svc2-h2">{lang === "ko" ? "맡기실 수 있는 일" : "What you can hand off"}</h2>
            </div>
            <button type="button" className="svc2-all" onClick={() => navigate("services")}>
              {lang === "ko" ? "전체 서비스 보기 →" : "All services →"}
            </button>
          </div>
          <div className="svc2-cols">
            {[
              {
                en: "For individuals", ko: "개인",
                links: [
                  { id: "svc_1", en: "Tax preparation", ko: "세금 신고" },
                  { id: "irs-ftb-letter", en: "IRS and FTB letters", ko: "IRS·FTB 통지서" },
                  { id: "svc_10", en: "Foreign accounts (FBAR)", ko: "해외 계좌 신고 (FBAR)" },
                  { id: "svc_11", en: "Crypto tax", ko: "암호화폐 세금" },
                  { id: "svc_7", en: "Wealth planning", ko: "자산 플래닝" },
                  { id: "svc_8", en: "Estate and legacy planning", ko: "상속 계획" },
                ]
              },
              {
                en: "For businesses", ko: "사업체",
                links: [
                  { id: "svc_2", en: "Bookkeeping", ko: "장부 관리" },
                  { id: "svc_3", en: "Payroll", ko: "급여 관리" },
                  { id: "svc_5", en: "Business formation", ko: "법인 설립" },
                  { id: "svc_4", en: "Tax resolution", ko: "세금 분쟁 해결" },
                  { id: "svc_12", en: "Nonprofits and churches", ko: "비영리·교회" },
                  { id: "svc_13", en: "Services by industry", ko: "업종별 서비스" },
                ]
              }
            ].map((g) => (
              <div key={g.en} className="svc2-col">
                <h3 className="svc2-label">{lang === "ko" ? g.ko : g.en}</h3>
                <ul className="svc2-list">
                  {g.links.map((l) => (
                    <li key={l.id}>
                      <button type="button" className="svc2-row" onClick={() => navigate(l.id)}>
                        <span>{lang === "ko" ? l.ko : l.en}</span>
                        <span className="svc2-arrow" aria-hidden="true">→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For finance teams (controllers, accounting staff) */}
      <section className="fin2" data-ko={lang === "ko" ? "1" : "0"}>
        <div className="fin2-in">
          <div className="fin2-head">
            <div className="fin2-eyebrow">{lang === "ko" ? "재무팀 · 회계팀과 함께" : "For finance teams"}</div>
            <h2 className="fin2-h2">{lang === "ko" ? "회사 안의 재무팀과 같이 일합니다" : "I work alongside your finance team"}</h2>
            <p className="fin2-lede">{lang === "ko"
              ? "직원을 대신하는 것이 아니라, 마감과 신고에서 손이 모자라거나 판단이 필요한 부분을 맡습니다."
              : "Not a replacement for your staff. I take the parts of close and compliance where you're short on hands or need a second opinion."}</p>
            <button type="button" className="fin2-link" onClick={() => navigate("contact")}>{lang === "ko" ? "업무 범위 상의하기 →" : "Talk through the scope →"}</button>
          </div>
          <ol className="fin2-list">
            {(lang === "ko" ? [
              ["월 마감 검토", "은행 대사, 계정 분류, 월별 재무제표를 재무팀과 같이 점검합니다."],
              ["여러 법인 정리", "법인 사이에 대신 낸 비용과 거래를 가려, 회사마다 장부가 맞게 정리합니다."],
              ["신고 일정 관리", "판매세(CDTFA), 급여세(941 · DE 9), 1099, 법인세 신고를 기한 안에 냅니다."],
              ["기관 통지서 대응", "IRS · FTB · EDD · CDTFA 통지서가 오면 대리인으로 답변합니다."],
              ["연말 결산과 법인 신고", "결산 조정과 법인 신고서(1120 · 1120-S · 1065)를 일정에 맞춰 준비합니다."],
            ] : [
              ["Month-end close review", "Bank reconciliations, account coding and monthly statements, reviewed with your team."],
              ["Multi-entity cleanup", "Payments one company made for another sorted out, so each company's books stand on their own."],
              ["Compliance calendar", "Sales tax (CDTFA), payroll tax (941, DE 9), 1099s and corporate returns, filed on time."],
              ["Agency notices", "When the IRS, FTB, EDD or CDTFA writes, I respond as your representative."],
              ["Year-end close and returns", "Year-end adjustments and corporate returns (1120, 1120-S, 1065), prepared on schedule."],
            ]).map(([title, desc], i) => (
              <li key={title} className="fin2-row">
                <span className="fin2-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="fin2-t">{title}</span>
                <span className="fin2-d">{desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industry Spotlight on Home */}
      <IndustrySpotlight />

      {/* First year in business (replaces the calculator band; keeps the calculator entry) */}
      <section className="fy2" data-ko={lang === "ko" ? "1" : "0"}>
        <div className="fy2-in">
          <div className="fy2-head">
            <div>
              <div className="svc2-eyebrow">{lang === "ko" ? "창업 첫해" : "Your first year in business"}</div>
              <h2 className="fy2-h2">{lang === "ko" ? "사업을 막 시작하셨다면, 이 네 가지부터" : "Just started? Start with these four"}</h2>
            </div>
            <div className="fy2-actions">
              <button type="button" className="fy2-btn" onClick={() => navigate("s-corp-calculator")}>{lang === "ko" ? "S corp 계산기 →" : "S corp calculator →"}</button>
              <button type="button" className="svc2-all" onClick={() => navigate("contact")}>{lang === "ko" ? "창업 상담 예약 →" : "Book a startup consultation →"}</button>
            </div>
          </div>
          <div className="fy2-grid">
            {(lang === "ko" ? [
              ["사업체 형태 정하기", "개인 사업자, LLC, S corp 중 무엇이 맞는지 본인 급여와 세금까지 따져 봅니다."],
              ["등록과 허가", "EIN, 주 등록, 시 사업자 등록, 물건을 팔면 판매세 허가(seller's permit)까지."],
              ["계좌와 장부 분리", "사업 계좌를 따로 열고, 첫 달부터 장부를 맞춰 둡니다."],
              ["급여와 예정세", "직원을 쓰면 EDD 등록과 급여세, 본인은 분기별 예정세 납부를 챙깁니다."],
            ] : [
              ["Choose the entity", "Sole proprietor, LLC or S corp, decided with your own pay and taxes in mind."],
              ["Registrations", "EIN, state filing, city business license, and a seller's permit if you sell goods."],
              ["Separate account and books", "A separate business account, with books kept from the first month."],
              ["Payroll and estimated tax", "EDD registration and payroll tax once you hire, and quarterly estimated tax for you."],
            ]).map(([title, desc], i) => (
              <div key={title} className="fy2-card">
                <span className="fy2-n">{i + 1}</span>
                <h3 className="fy2-t">{title}</h3>
                <p className="fy2-d">{desc}</p>
              </div>
            ))}
          </div>
          <button type="button" className="fy2-fee" onClick={() => navigate("client-info")}>{lang === "ko" ? "수수료는 어떻게 정해지나요? →" : "How are fees set? →"}</button>
        </div>
      </section>

      {/* ── CR Consulting Division Spotlight ── */}
      <ConsultingSpotlight />

      {/* ── Client stories ── */}
      <ClientStories lang={lang} colors={colors} fonts={fonts} background="#F6F4F0" />

      {/* ── Google Reviews Section ── */}
      <ReviewsSection lang={lang} />

      {/* CTA */}
      <section className="cta-final" data-ko={lang === "ko" ? "1" : "0"}>
        <div className="hero2-glow" aria-hidden="true" />
        <div className="cta-final-in">
          <h2 className="cta-final-h">{lang === "en" ? "Let's start with your numbers." : "숫자부터 같이 보시죠."}</h2>
          <p className="cta-final-sub">{lang === "en" ? "Tell me where things stand. I'll lay out what it takes, and what it doesn't." : "지금 상황을 말씀해 주시면, 무엇이 필요하고 무엇은 필요 없는지 정리해 드립니다."}</p>
          <div className="hero2-cta cta-final-row">
            <button type="button" className="hero2-btn" onClick={() => navigate("contact")}>
              {lang === "ko" ? "상담 예약하기" : "Book a consultation"} <span aria-hidden="true">→</span>
            </button>
            <a className="hero2-call" href="tel:+12133259800">{lang === "ko" ? "첫 상담 30분 무료 · 213-325-9800" : "First 30 minutes free · 213-325-9800"}</a>
          </div>
        </div>
      </section>
    </div>
  );

  // ============================================================
  // INDUSTRY SPOTLIGHT SECTION (작업 4)
  // ============================================================
  const IndustrySpotlight = () => {
    const spotlight = t.industrySpotlight;
    const ko = lang === "ko";
    const cols = [
      { key: "construction", icon: "hardhat", go: "construction", link: ko ? "건설업 전문 서비스 보기 →" : "Construction services →" },
      { key: "bbq", icon: "utensils", go: "restaurant-tax", link: ko ? "식당 세무 서비스 보기 →" : "Restaurant services →" },
    ];
    return (
      <section className="ind2" data-ko={ko ? "1" : "0"}>
        <div className="ind2-in">
          <div className="svc2-eyebrow">{ko ? "업종별 전문" : "Industries"}</div>
          <h2 className="svc2-h2 ind2-h2">{ko ? "업종마다 숫자를 보는 법이 다릅니다" : "Every industry reads its numbers differently"}</h2>
          <div className="ind2-cols">
            {cols.map((c) => {
              const d = spotlight[c.key];
              return (
                <div key={c.key} className="ind2-col">
                  <div className="ind2-top">
                    <LineIcon name={c.icon} size={30} color={colors.gold} stroke={1.5} />
                    <h3 className="ind2-title">{d.title}</h3>
                  </div>
                  <p className="ind2-desc">{d.desc}</p>
                  <ul className="ind2-list">
                    {d.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <button type="button" className="svc2-all ind2-link" onClick={() => navigate(c.go)}>{c.link}</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // ============================================================
  // CR CONSULTING DIVISION SPOTLIGHT — links to consulting site
  // ============================================================
  const ConsultingSpotlight = () => {
    const ko = lang === "ko";
    // Three consulting offerings, one card each (each card = one link)
    const cards = [
      {
        href: `${ACCT_URL}#check`, isNew: true, icon: "search",
        kicker: ko ? "회계 시스템 · AI" : "Accounting Systems & AI",
        title: ko ? "회계 시스템·AI 진단" : "Accounting System & AI Assessment",
        desc: ko ? "QuickBooks부터 AI 도구까지, 지금 쓰는 시스템을 진단하고 맞는 방향을 제안합니다."
                 : "From QuickBooks to AI tools, I review the system you run today and recommend what fits.",
        cta: ko ? "무료 2분 자가 점검 →" : "Free 2-minute self-check →"
      },
      {
        href: "https://consulting.dkcpala.com/banking", icon: "landmark",
        kicker: ko ? "SBA · 은행 대출" : "SBA & Bank Loans",
        title: ko ? "은행 대출 준비 프로그램" : "Bank Loan Readiness Program",
        desc: ko ? "신청 전에 숫자부터 준비합니다. 지금 신청해도 되는지 2분이면 확인할 수 있습니다."
                 : "Get the numbers ready before you apply. Find out in 2 minutes whether to apply now or wait.",
        cta: ko ? "지금 신청해도 될까요? →" : "Should you apply yet? →"
      },
      {
        href: "https://consulting.dkcpala.com", icon: "wrench",
        kicker: ko ? "맞춤형 앱" : "Custom Apps",
        title: ko ? "업무에 맞춘 앱 제작" : "Apps Built Around Your Business",
        tags: ko ? ["건설 Job Costing", "식당 재고·원가", "급여·현금 관리", "오너 대시보드"]
                 : ["Job Costing", "Restaurant Inventory & Food Cost", "Payroll & Cash", "Owner Dashboards"],
        cta: ko ? "컨설팅 사이트 보기 →" : "Visit consulting site →"
      }
    ];
    return (
      <div style={{ background: colors.darkNavy, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 85% 20%, ${colors.gold}1c 0%, transparent 45%), radial-gradient(circle at 10% 90%, ${colors.gold}10 0%, transparent 40%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", position: "relative" }}>
          <div style={{ maxWidth: 760, marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 5, color: colors.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>
              CR Consulting · {ko ? "컨설팅 사업부" : "Consulting Division"}
            </div>
            <h2 style={{ fontFamily: fonts.display, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: colors.white, lineHeight: 1.25, marginBottom: 14, wordBreak: "keep-all" }}>
              {ko ? "회계 시스템을 진단하고, 회사에 맞는 시스템과 앱을 만듭니다" : "I assess your accounting system and build what fits"}
            </h2>
            <p style={{ fontFamily: fonts.body, fontSize: 16, color: `${colors.cream}bb`, lineHeight: 1.7 }}>
              {ko ? "업종에 관계없이, 회계를 아는 사람이 직접 설계합니다." : "Any industry. Designed by someone who understands your numbers."}
            </p>
          </div>

          <div className="cs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20 }}>
            {cards.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="cs-card" style={{
                position: "relative", display: "flex", flexDirection: "column", textDecoration: "none",
                background: `${colors.white}08`, border: `1px solid ${c.isNew ? colors.lightGold + "88" : colors.white + "1f"}`, borderRadius: 10, padding: "26px 24px",
                wordBreak: "keep-all"
              }}>
                {c.isNew && (
                  <span style={{ position: "absolute", top: 18, right: 18, fontSize: 10, fontWeight: 800, letterSpacing: 1, background: colors.gold, color: colors.darkNavy, padding: "3px 8px", borderRadius: 8 }}>NEW</span>
                )}
                <span style={{ marginBottom: 16 }}><LineIcon name={c.icon} size={28} color={colors.lightGold} stroke={1.5} /></span>
                <span style={{ fontSize: 10, letterSpacing: 3, color: colors.lightGold, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>{c.kicker}</span>
                <span style={{ fontFamily: fonts.display, fontSize: 21, fontWeight: 700, color: colors.white, lineHeight: 1.3, marginBottom: 10 }}>{c.title}</span>
                {c.desc && (
                  <span style={{ fontSize: 14, color: `${colors.cream}e0`, lineHeight: 1.7, marginBottom: 18 }}>{c.desc}</span>
                )}
                {c.tags && (
                  <span style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {c.tags.map((tg) => (
                      <span key={tg} style={{ fontSize: 12, color: colors.cream, background: `${colors.white}12`, border: `1px solid ${colors.white}1f`, borderRadius: 100, padding: "5px 11px" }}>{tg}</span>
                    ))}
                  </span>
                )}
                <span style={{ marginTop: "auto", fontSize: 13, fontWeight: 700, color: colors.lightGold, letterSpacing: 0.5 }}>{c.cta}</span>
              </a>
            ))}
          </div>

          <p style={{ fontSize: 11, color: `${colors.cream}55`, lineHeight: 1.6, marginTop: 22 }}>
            {ko
              ? "* 컨설팅 서비스는 CR Consulting에서 제공되는 관리 자문 서비스이며, 회계 감사·검토·인증 업무와 구분됩니다."
              : "* Consulting services are provided by CR Consulting as management advisory services, separate from attest, audit, or review services."}
          </p>
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
      "BUSINESS & FINANCIAL ADVISORY": { en: "Business & Financial Advisory", ko: "사업 & 재무 자문", color: colors.navy },
      "SPECIALTY SERVICES": { en: "Specialty Services", ko: "전문 특화 서비스", color: colors.navy }
    };
    return (
      <div>
        <div style={{ background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.cream} 100%)`, padding: "160px 40px 80px", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            {lang === "en" ? "Services" : "서비스 안내"}
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
                    {lang !== "ko" && <div style={{ fontSize: 10, letterSpacing: 4, color: colors.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>{cat}</div>}
                    <h2 style={{ fontFamily: fonts.display, fontSize: 28, color: colors.navy, fontWeight: 700 }}>{lang === "ko" ? label.ko : label.en}</h2>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap: 20 }}>
                  {catSvcs.map((svc) => (
                    <div key={svc.id}
                      onClick={() => navigate(svc.id)}
                      style={{ background: colors.white, border: `1px solid ${colors.lightGray}`, borderRadius: 6, padding: "28px 28px 24px", cursor: "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.09)"; e.currentTarget.style.borderColor = colors.lightGold; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = colors.lightGray; }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: colors.gold }} />
                      <div style={{ marginBottom: 14 }}><LineIcon name={svc.icon} size={30} color={colors.gold} stroke={1.5} /></div>
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

        <ConsultingSpotlight />

      </div>
    );
  };

  // ============================================================
  // ABOUT PAGE
  // ============================================================
  const AboutPage = () => (
    <div>
      <div style={{
        background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.cream} 100%)`,
        padding: "160px 40px 80px", textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {"Danny Kim, CPA"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.navy, fontWeight: 700, marginBottom: 20 }}>{t.about.title}</h1>
        <GoldDivider />
      </div>
      <div style={baseStyles.section}>
        <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, marginBottom: 80, alignItems: "start" }}>
          <div className="about-card" style={{ background: colors.cream, padding: 48, borderRadius: 4, textAlign: "center", position: "sticky", top: 120 }}>
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
            <div className="two-col-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {t.about.values.map((v, i) => (
                <div key={i} style={{ background: colors.white, padding: 28, borderRadius: 4, border: `1px solid ${colors.lightGray}`, borderTop: `3px solid ${colors.gold}` }}>
                  <h4 style={{ fontFamily: fonts.display, fontSize: 18, color: colors.navy, marginBottom: 8 }}>{v.title}</h4>
                  <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 44 }}>
              <IndustryPicker lang={lang} colors={colors} fonts={fonts} navigate={navigate} openId={industryOpen} setOpenId={setIndustryOpen} />
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
        background: `linear-gradient(165deg, ${colors.white} 0%, ${colors.cream} 100%)`,
        padding: "160px 40px 80px", textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          {lang === "en" ? "Koreatown · Los Angeles" : "LA 코리아타운 사무실"}
        </div>
        <h1 style={{ fontFamily: fonts.display, fontSize: "clamp(36px, 5vw, 56px)", color: colors.navy, fontWeight: 700, marginBottom: 20 }}>{t.contact.title}</h1>
        <GoldDivider />
        <p style={{ fontFamily: fonts.body, fontSize: 20, color: colors.gray, marginTop: 24 }}>{t.contact.subtitle}</p>
      </div>

      <div style={{ ...baseStyles.section, paddingTop: 80 }}>
        <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "start" }}>
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
              <a href="tel:2133259800" style={{ fontSize: 15, color: colors.navy, textDecoration: "none", fontWeight: 600 }}>{t.contact.info.phone}</a>
            </div>
            <div className="mail-free" style={{ marginBottom: 36, background: colors.navy, borderTop: `3px solid ${colors.gold}`, borderRadius: 8, padding: "22px 24px 24px" }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: colors.lightGold, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                {lang === "en" ? "Email · No charge" : "이메일 문의 · 무료"}
              </div>
              <a href="mailto:info.dkcpa@gmail.com" style={{ fontSize: 18, color: colors.white, textDecoration: "none", fontWeight: 600, borderBottom: `1px solid ${colors.gold}88`, paddingBottom: 2, wordBreak: "break-all" }}>{t.contact.info.email}</a>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.75, marginTop: 14, wordBreak: "keep-all" }}>
                {lang === "en"
                  ? "Email me and I'll answer at no charge, faster and more precisely than on a call. If you received a notice, attach a photo of it with SSNs and account numbers covered."
                  : "이메일로 보내 주시면 비용 없이, 더 빠르고 정확하게 답변드립니다. 받으신 통지서가 있으면 사진을 함께 보내 주세요. SSN과 계좌번호는 가리고 보내 주시면 됩니다."}
              </p>
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
              <p style={{ fontSize: 12.5, color: colors.gray, marginBottom: 20, lineHeight: 1.6, wordBreak: "keep-all" }}>
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
                    <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 6, border: `1px solid ${colors.gold}55`, color: colors.gold, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.flag}</span>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: colors.navy, letterSpacing: 1 }}>{item.lang}</span>
                      <p style={{ fontSize: 12, color: colors.gray, marginTop: 2, lineHeight: 1.4, wordBreak: (item.flag === "ZH" || item.flag === "JA") ? "normal" : "keep-all" }}>{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ background: colors.cream, padding: 32, borderRadius: 4, textAlign: "center", marginTop: 24 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><LineIcon name="pin" size={32} color={colors.gold} stroke={1.5} /></div>
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
    <footer style={{ background: colors.darkNavy, borderTop: `1px solid ${colors.gold}22`, padding: "60px clamp(16px, 5vw, 40px) 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="stack-mobile" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: fonts.display, fontSize: 20, color: colors.white, marginBottom: 8 }}>Danny Kim, CPA</div>
            <div style={{ fontSize: 11, color: colors.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>CR Accountancy & Consulting</div>
            <p style={{ fontSize: 13, color: colors.gray, lineHeight: 1.7 }}>{t.footer.tagline}</p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: colors.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
              {lang === "en" ? "Quick Links" : "바로가기"}
            </div>
            {["home", "services", "about", "resources", "client-info", "contact"].map((p) => (
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
              {lang === "en" ? "For Businesses" : "사업체"}
            </div>
            {[
              { p: "bookkeeping-payroll", en: "Monthly Books & Payroll", ko: "장부·급여 월 관리" },
              { p: "restaurant-tax", en: "Restaurants", ko: "식당 세무" },
              { p: "construction", en: "Construction", ko: "건설업" },
              { p: "irs-ftb-letter", en: "IRS · FTB Letters", ko: "IRS·FTB 통지서" },
              { p: "s-corp-calculator", en: "S Corp Calculator", ko: "S corp 계산기" },
            ].map((l) => (
              <a key={l.p} href={`/${l.p}`} onClick={(e) => { e.preventDefault(); navigate(l.p); }} style={{
                display: "block", color: colors.gray, fontSize: 13, padding: "6px 0", textDecoration: "none", fontFamily: fonts.sans
              }}>
                {lang === "en" ? l.en : l.ko}
              </a>
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
          <a href={lang === "en" ? "/privacy.html" : "/privacy.html#ko"} style={{ fontSize: 11, color: `${colors.cream}88`, textDecoration: "underline" }}>
            {lang === "en" ? "Privacy Policy" : "개인정보처리방침"}
          </a>
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
    : page === "construction" ? <ConstructionPage lang={lang} />
    : page === "client-info" ? <ClientInfoPage lang={lang} colors={colors} fonts={fonts} navigate={navigate} />
    : page === "s-corp-calculator" ? <SCorpCalculator lang={lang} colors={colors} fonts={fonts} navigate={navigate} />
    : LANDINGS[page] ? <LandingPage id={page} lang={lang} colors={colors} fonts={fonts}
        form={<ContactForm lang={lang} t={t} colors={colors} fonts={fonts} />} />
    : page === "home" ? <HomePage />
    : page === "services" ? <ServicesPage />
    : page === "about" ? <AboutPage />
    : page === "contact" ? <ContactPage />
    : <HomePage />;
  const pages = {}; // kept for reference — routing handled above

  return (
    <div style={baseStyles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&family=Source+Serif+4:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@500;700;800&family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${colors.gold}44; color: ${colors.navy}; }
        .res-row > div:first-child { min-width: 0; }
        .res-row a { overflow-wrap: anywhere; }
        .cs-card { transition: transform .2s ease, box-shadow .2s ease; }
        .cs-card:hover { transform: translateY(-4px); }
        /* tablets: the grid has two columns, so let a lone last card use the full row */
        @media (min-width: 660px) and (max-width: 959px) { .cs-grid > .cs-card:last-child:nth-child(odd) { grid-column: 1 / -1; } }

        /* ── Logo lockup (mark | name over firm name) ── */
        .brand { --s: 0.9; display: flex; flex-shrink: 0; margin-right: 20px; align-items: center; gap: calc(13px * var(--s)); text-decoration: none; cursor: pointer; }
        .brand-mark { height: calc(30px * var(--s)); width: auto; display: block; }
        .brand-rule { width: 1px; height: calc(34px * var(--s)); background: ${colors.lightGold}99; }
        .brand-text { display: flex; flex-direction: column; gap: calc(5px * var(--s)); line-height: 1; font-family: 'Poppins', ${fonts.sans}; white-space: nowrap; }
        .brand-name { font-size: calc(19px * var(--s)); font-weight: 700; letter-spacing: 0.02em; color: #fff; }
        .brand-sub { font-size: calc(8.2px * var(--s)); font-weight: 500; letter-spacing: 0.114em; margin-right: -0.114em; color: ${colors.lightGold}; }

        /* ── Home: services lists ── */
        .svc2 { background: #fff; padding: clamp(64px, 9vw, 112px) clamp(16px, 5vw, 40px); }
        .svc2[data-ko="1"] { word-break: keep-all; }
        .svc2-in { max-width: 1200px; margin: 0 auto; }
        .svc2-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 44px; }
        .svc2-eyebrow { font-size: 12px; letter-spacing: 3px; color: ${colors.gold}; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; }
        .svc2-h2 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(30px, 3.8vw, 44px); line-height: 1.15; color: ${colors.navy}; margin: 0; }
        .svc2[data-ko="1"] .svc2-h2 { font-family: ${fonts.sans}; font-weight: 700; letter-spacing: -0.5px; }
        .svc2-all { flex-shrink: 0; background: none; border: 0; border-bottom: 1px solid ${colors.navy}40; padding: 0 0 3px; cursor: pointer;
          color: ${colors.navy}; font-family: ${fonts.sans}; font-size: 14px; font-weight: 600; white-space: nowrap; }
        .svc2-all:hover { border-color: ${colors.navy}; }
        .svc2-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(32px, 6vw, 88px); }
        .svc2-label { font-family: ${fonts.sans}; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${colors.gold};
          margin: 0; padding-bottom: 14px; border-bottom: 1.5px solid ${colors.navy}; }
        .svc2-list { list-style: none; margin: 0; padding: 0; }
        .svc2-row { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; cursor: pointer;
          background: none; border: 0; border-bottom: 1px solid ${colors.lightGray}; padding: 19px 4px;
          font-family: ${fonts.sans}; font-size: 17px; font-weight: 500; color: ${colors.navy}; transition: background .2s, padding .2s; }
        .svc2-arrow { color: #B8BDC6; transition: transform .2s, color .2s; }
        .svc2-row:hover { background: #F6F4F0; padding-left: 14px; padding-right: 14px; }
        .svc2-row:hover .svc2-arrow { color: ${colors.gold}; transform: translateX(3px); }
        .svc2-row:focus-visible { outline: 2px solid ${colors.gold}; outline-offset: -2px; }

        /* ── Home: first screen ── */
        .hero2 { position: relative; overflow: hidden; color: #fff;
          background: linear-gradient(155deg, #0B131C 0%, ${colors.navy} 58%, #24324A 100%);
          min-height: clamp(600px, 94vh, 900px); display: flex; align-items: center;
          padding: 132px clamp(16px, 5vw, 40px) 72px; }
        .hero2-glow { position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(900px 520px at 88% 12%, ${colors.gold}26, transparent 60%),
                      radial-gradient(700px 500px at 0% 100%, ${colors.blue}1f, transparent 60%); }
        .hero2-rings { position: absolute; right: -140px; top: 50%; transform: translateY(-50%); width: 640px; height: 640px; pointer-events: none; }
        .hero2-rings span { position: absolute; inset: 0; border: 1px solid ${colors.gold}30; border-radius: 50%; }
        .hero2-rings span:nth-child(2) { inset: 90px; border-color: ${colors.gold}22; }
        .hero2-rings span:nth-child(3) { inset: 180px; border-color: ${colors.gold}18; }
        .hero2-in { position: relative; z-index: 1; width: 100%; max-width: 1200px; margin: 0 auto; }
        .hero2-who { display: inline-flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; letter-spacing: 1.5px;
          color: ${colors.lightGold}; margin-bottom: 28px; }
        .hero2-who::before { content: ""; width: 32px; height: 1px; background: ${colors.lightGold}; }
        .hero2-h1 { font-family: ${fonts.sans}; font-weight: 800; font-size: clamp(44px, 7vw, 92px); line-height: 1.02;
          letter-spacing: -0.045em; margin: 0 0 28px; }
        .hero2-h1 span { display: block; }
        .hero2-accent { color: ${colors.lightGold}; }
        .hero2[data-ko="1"] .hero2-h1 { font-family: 'Noto Sans KR', ${fonts.sans}; font-weight: 800; letter-spacing: -0.05em;
          line-height: 1.14; font-size: clamp(40px, 6.6vw, 84px); max-width: none; word-break: keep-all; }
        .hero2-sub { font-size: clamp(16px, 1.9vw, 20px); line-height: 1.65; color: #FFFFFFB3; max-width: 34em; margin: 0 0 40px; }
        .hero2[data-ko="1"] .hero2-sub { word-break: keep-all; }
        .hero2-cta { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
        .hero2-btn { display: inline-flex; align-items: center; gap: 10px; border: 0; cursor: pointer; border-radius: 10px;
          background: linear-gradient(135deg, ${colors.lightGold}, ${colors.gold}); color: ${colors.darkNavy};
          font-family: ${fonts.sans}; font-size: 16px; font-weight: 800; padding: 19px 30px;
          box-shadow: 0 14px 40px ${colors.gold}40; transition: transform .2s ease, box-shadow .2s ease; }
        .hero2-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 48px ${colors.gold}55; }
        .hero2-call { color: #FFFFFFCC; font-size: 15px; font-weight: 600; text-decoration: none; border-bottom: 1px solid #FFFFFF40; padding-bottom: 2px; }
        .hero2-call:hover { color: #fff; border-color: #fff; }
        .hero2-proof { display: inline-flex; align-items: center; gap: 8px; margin-top: 44px; background: none; border: 0; cursor: pointer; padding: 0;
          color: #FFFFFF99; font-family: ${fonts.sans}; font-size: 14px; font-weight: 500; }
        .hero2-proof:hover { color: #fff; }
        .hero2-star { color: ${colors.lightGold}; font-size: 16px; }
        .hero2-stars { color: ${colors.lightGold}; font-size: 14px; letter-spacing: 2px; }
        .hero2-proof b { color: #fff; font-weight: 700; }

        /* ── Home: industries (same language as the services list) ── */
        .ind2 { background: #F6F4F0; padding: clamp(64px, 9vw, 112px) clamp(16px, 5vw, 40px); }
        .ind2[data-ko="1"] { word-break: keep-all; }
        .ind2-in { max-width: 1200px; margin: 0 auto; }
        .ind2-h2 { margin-bottom: 44px; }
        .ind2[data-ko="1"] .svc2-h2 { font-family: ${fonts.sans}; font-weight: 700; letter-spacing: -0.5px; }
        .ind2-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(32px, 6vw, 88px); }
        .ind2-col { border-top: 1.5px solid ${colors.navy}; padding-top: 26px; display: flex; flex-direction: column; }
        .ind2-top { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .ind2-title { font-family: ${fonts.sans}; font-size: 22px; font-weight: 700; color: ${colors.navy}; letter-spacing: -0.3px; line-height: 1.3; margin: 0; }
        .ind2-desc { font-size: 15.5px; color: #4B5563; line-height: 1.75; margin: 0 0 20px; }
        .ind2-list { list-style: none; margin: 0 0 26px; padding: 0; }
        .ind2-list li { position: relative; padding: 12px 0 12px 22px; border-bottom: 1px solid ${colors.lightGray}; font-size: 15px; color: ${colors.navy}; }
        .ind2-list li::before { content: ""; position: absolute; left: 2px; top: 50%; width: 8px; height: 1.5px; background: ${colors.gold}; }
        .ind2-link { align-self: flex-start; margin-top: auto; }

        /* ── Home: finance teams ── */
        .fin2 { background: ${colors.darkNavy}; color: #fff; padding: clamp(64px, 9vw, 112px) clamp(16px, 5vw, 40px); }
        .fin2[data-ko="1"] { word-break: keep-all; }
        .fin2-in { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: .85fr 1.15fr; gap: 40px clamp(40px, 6vw, 88px); align-items: start; }
        .fin2-eyebrow { font-size: 12px; letter-spacing: 3px; color: ${colors.lightGold}; font-weight: 700; text-transform: uppercase; margin-bottom: 14px; }
        .fin2-h2 { font-family: ${fonts.sans}; font-weight: 800; font-size: clamp(28px, 3.4vw, 42px); line-height: 1.2; letter-spacing: -0.03em; margin: 0 0 18px; color: #fff; }
        .fin2[data-ko="1"] .fin2-h2 { font-family: 'Noto Sans KR', ${fonts.sans}; letter-spacing: -0.04em; }
        .fin2-lede { font-size: 16.5px; line-height: 1.75; color: #FFFFFFB3; margin: 0 0 26px; }
        .fin2-link { background: none; border: 0; border-bottom: 1px solid ${colors.lightGold}88; padding: 0 0 3px; color: ${colors.lightGold}; font-family: ${fonts.sans}; font-size: 15px; font-weight: 700; cursor: pointer; }
        .fin2-link:hover { border-color: ${colors.lightGold}; }
        .fin2-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid #FFFFFF26; }
        .fin2-row { display: grid; grid-template-columns: 44px 210px 1fr; gap: 6px 20px; align-items: baseline; padding: 20px 0; border-bottom: 1px solid #FFFFFF1F; }
        .fin2-n { font-size: 12px; font-weight: 700; letter-spacing: 1px; color: ${colors.lightGold}; }
        .fin2-t { font-size: 17px; font-weight: 700; color: #fff; }
        .fin2-d { font-size: 15px; line-height: 1.65; color: #FFFFFFB3; }

        /* ── Home: first year in business ── */
        .fy2 { background: #fff; padding: clamp(64px, 9vw, 112px) clamp(16px, 5vw, 40px); }
        .fy2[data-ko="1"] { word-break: keep-all; }
        .fy2-in { max-width: 1200px; margin: 0 auto; }
        .fy2-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 36px; }
        .fy2-h2 { font-family: ${fonts.sans}; font-weight: 700; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.2; letter-spacing: -0.5px; color: ${colors.navy}; margin: 0; }
        .fy2[data-ko="1"] .fy2-h2 { font-family: 'Noto Sans KR', ${fonts.sans}; letter-spacing: -0.04em; }
        .fy2-actions { display: flex; align-items: center; gap: 22px; flex-shrink: 0; }
        .fy2-btn { border: 0; cursor: pointer; border-radius: 10px; background: ${colors.navy}; color: #fff; font-family: ${fonts.sans}; font-size: 15px; font-weight: 700; padding: 14px 22px; white-space: nowrap; }
        .fy2-btn:hover { background: #24324A; }
        .fy2-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1.5px solid ${colors.navy}; }
        .fy2-card { padding: 24px 22px 26px 0; border-right: 1px solid ${colors.lightGray}; }
        .fy2-card + .fy2-card { padding-left: 22px; }
        .fy2-card:last-child { border-right: 0; }
        .fy2-n { display: inline-flex; width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid ${colors.gold}; color: ${colors.gold}; font-size: 13px; font-weight: 700; align-items: center; justify-content: center; margin-bottom: 14px; }
        .fy2-t { font-family: ${fonts.sans}; font-size: 18px; font-weight: 700; color: ${colors.navy}; margin: 0 0 8px; }
        .fy2-d { font-size: 15px; line-height: 1.7; color: #4B5563; margin: 0; }
        .fy2-fee { margin-top: 28px; background: none; border: 0; padding: 0 0 3px; border-bottom: 1px solid ${colors.navy}40; color: ${colors.navy}; font-family: ${fonts.sans}; font-size: 14.5px; font-weight: 600; cursor: pointer; }
        .fy2-fee:hover { border-color: ${colors.navy}; }

        /* About: industries */
        .ind-hint { font-size: 13.5px; color: ${colors.gray}; margin-bottom: 22px; }
        .ind-group + .ind-group { margin-top: 28px; }
        .ind-group-k { font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: ${colors.gold}; font-weight: 600; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid ${colors.lightGray}; }
        .ind-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ind-chip { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 52px; text-align: left; padding: 12px 14px 12px 16px; background: ${colors.white}; border: 1px solid ${colors.lightGray}; border-radius: 4px; cursor: pointer; font-family: ${fonts.sans}; transition: border-color .15s, background .15s; }
        .ind-chip:hover { border-color: ${colors.gold}; background: ${colors.cream}; }
        .ind-chip:focus-visible { outline: 2px solid ${colors.gold}; outline-offset: 2px; }
        .ind-chip-t { flex: 1; font-size: 14px; color: ${colors.navy}; font-weight: 500; line-height: 1.35; word-break: keep-all; }
        .ind-chip-a { font-size: 20px; color: ${colors.gold}; line-height: 1; transition: transform .15s; }
        .ind-chip:hover .ind-chip-a { transform: translateX(3px); }
        .ind-ov { position: fixed; inset: 0; z-index: 3000; background: rgba(15,23,32,.55); display: flex; align-items: center; justify-content: center; padding: 16px; animation: indFade .18s ease; }
        .ind-dlg { position: relative; width: 100%; max-width: 540px; max-height: calc(100vh - 32px); overflow: auto; background: ${colors.white}; border-top: 3px solid ${colors.gold}; border-radius: 8px; padding: 32px 32px 28px; box-shadow: 0 24px 60px rgba(0,0,0,.25); animation: indUp .2s ease; font-family: ${fonts.sans}; }
        .ind-x { position: absolute; top: 10px; right: 12px; width: 40px; height: 40px; border: 0; background: none; border-radius: 50%; font-size: 28px; line-height: 1; color: ${colors.gray}; cursor: pointer; }
        .ind-x:hover { background: ${colors.cream}; color: ${colors.navy}; }
        .ind-dlg-head { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; padding-right: 32px; }
        .ind-dlg-ic { flex-shrink: 0; width: 52px; height: 52px; border-radius: 50%; border: 1px solid ${colors.gold}66; display: flex; align-items: center; justify-content: center; }
        .ind-dlg-k { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.gold}; font-weight: 600; margin-bottom: 4px; }
        .ind-dlg h3 { margin: 0; font-size: 24px; color: ${colors.navy}; line-height: 1.25; word-break: keep-all; }
        .ind-dlg-sum { font-size: 15.5px; color: #3D4756; line-height: 1.75; margin-bottom: 20px; word-break: keep-all; }
        .ind-dlg-lbl { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.gold}; font-weight: 600; margin-bottom: 8px; }
        .ind-dlg-list { list-style: none; padding: 0; margin: 0 0 24px; }
        .ind-dlg-list li { position: relative; padding: 10px 0 10px 20px; border-top: 1px solid ${colors.lightGray}; font-size: 14.5px; color: ${colors.navy}; line-height: 1.5; word-break: keep-all; }
        .ind-dlg-list li:last-child { border-bottom: 1px solid ${colors.lightGray}; }
        .ind-dlg-list li::before { content: "–"; position: absolute; left: 0; top: 10px; color: ${colors.gold}; font-weight: 600; }
        .ind-dlg-btns { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; }
        .ind-btn-main { background: ${colors.navy}; color: ${colors.white}; border: 0; border-radius: 4px; padding: 13px 22px; font-family: ${fonts.sans}; font-size: 14px; font-weight: 600; cursor: pointer; }
        .ind-btn-main:hover { background: ${colors.darkNavy}; }
        .ind-btn-sub { background: none; border: 0; border-bottom: 1px solid ${colors.navy}40; padding: 0 0 3px; color: ${colors.navy}; font-family: ${fonts.sans}; font-size: 14px; font-weight: 600; cursor: pointer; }
        .ind-btn-sub:hover { border-color: ${colors.navy}; }
        @keyframes indFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes indUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .ind-ov, .ind-dlg { animation: none; } }
        @media (max-width: 560px) {
          .ind-grid { grid-template-columns: 1fr; }
          .ind-ov { align-items: flex-end; padding: 0; }
          .ind-dlg { max-width: none; max-height: 88vh; border-radius: 12px 12px 0 0; padding: 28px 22px 24px; }
          .ind-dlg h3 { font-size: 21px; }
          .ind-btn-main { width: 100%; }
        }
        @media (max-width: 1024px) {
          .fy2-grid { grid-template-columns: 1fr 1fr; }
          .fy2-card { padding: 22px 18px 24px 0; }
          .fy2-card:nth-child(2n) { border-right: 0; padding-left: 18px; }
          .fy2-card:nth-child(2n+1) { padding-left: 0; }
          .fy2-card:nth-child(n+3) { border-top: 1px solid ${colors.lightGray}; }
          .fin2-in { grid-template-columns: 1fr; }
        }

        /* ── Home: closing band (matches the first screen) ── */
        .cta-final { position: relative; overflow: hidden; color: #fff; text-align: center;
          background: linear-gradient(155deg, #0B131C 0%, ${colors.navy} 58%, #24324A 100%);
          padding: clamp(72px, 10vw, 120px) clamp(16px, 5vw, 40px); border-bottom: 1px solid #FFFFFF14; }
        .cta-final-in { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .cta-final-h { font-family: ${fonts.sans}; font-weight: 800; font-size: clamp(34px, 5vw, 58px); line-height: 1.1; letter-spacing: -0.04em; margin: 0 0 18px; color: #fff; }
        .cta-final[data-ko="1"] .cta-final-h { font-family: 'Noto Sans KR', ${fonts.sans}; letter-spacing: -0.05em; word-break: keep-all; }
        .cta-final-sub { font-size: clamp(16px, 1.8vw, 19px); line-height: 1.65; color: #FFFFFFB3; margin: 0 auto 36px; max-width: 34em; word-break: keep-all; }
        .cta-final-row { justify-content: center; }

        /* ── Home: S corp calculator entry ── */
        .calc-band { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 24px;
          background: ${colors.navy}; color: #fff; border-radius: 16px; padding: clamp(24px, 4vw, 36px) clamp(22px, 4vw, 44px);
          background-image: radial-gradient(500px 220px at 100% 0%, ${colors.gold}30, transparent 70%); }
        .calc-band-eyebrow { font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; color: ${colors.lightGold}; font-weight: 700; margin-bottom: 8px; }
        .calc-band-title { font-size: clamp(20px, 2.6vw, 26px); font-weight: 700; line-height: 1.3; margin-bottom: 6px; word-break: keep-all; }
        .calc-band-text { font-size: 15px; color: #FFFFFFB3; line-height: 1.6; word-break: keep-all; }
        .calc-band-btn { flex-shrink: 0; border: 0; cursor: pointer; border-radius: 10px; background: #fff; color: ${colors.navy};
          font-family: ${fonts.sans}; font-size: 15px; font-weight: 800; padding: 16px 24px; white-space: nowrap; }
        /* Full menu needs about 1,180px; below that use the ☰ menu so nothing is pushed off screen */
        @media (max-width: 1180px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 768px) {
          .stack-mobile { grid-template-columns: 1fr !important; gap: 32px !important; }
          .stack-mobile > * { min-width: 0; }
          .about-card { overflow-wrap: anywhere; }
          .about-card { position: static !important; padding: 28px 20px !important; }
          .contact-form-box { padding: 28px 20px !important; }
          .acct-nav-btn { display: none !important; }
          .acct-strip { flex-wrap: wrap; }
          .acct-strip-cta { width: 100%; text-align: center; }
          .nav-inner { padding: 0 16px !important; }
          .brand { --s: 0.8; margin-right: 12px; }
          .ind2-cols { grid-template-columns: 1fr; gap: 44px; }
          .fin2-row { grid-template-columns: 34px 1fr; }
          .fin2-d { grid-column: 2; }
          .fy2-head { flex-direction: column; align-items: flex-start; }
          .fy2-actions { flex-direction: column; align-items: flex-start; gap: 14px; }
          .fy2-grid { grid-template-columns: 1fr; }
          .fy2-card, .fy2-card + .fy2-card, .fy2-card:nth-child(2n), .fy2-card:nth-child(2n+1) { padding: 20px 0; border-right: 0; }
          .fy2-card + .fy2-card { border-top: 1px solid ${colors.lightGray}; }
          .ind2-title { font-size: 20px; }
          .cta-final-row { align-items: stretch; }
          .svc2-head { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 32px; }
          .svc2-cols { grid-template-columns: 1fr; gap: 40px; }
          .svc2-row { font-size: 16px; padding: 16px 2px; }
          .hero2 { min-height: auto; padding: 120px 16px 64px; }
          .hero2-rings { width: 420px; height: 420px; right: -220px; top: 30%; opacity: .6; }
          .hero2-who { font-size: 12px; margin-bottom: 22px; }
          .hero2-sub { margin-bottom: 32px; }
          .hero2-cta { flex-direction: column; align-items: stretch; gap: 16px; }
          .hero2-btn { justify-content: center; }
          .hero2-call { align-self: center; }
          .hero2-proof { margin-top: 32px; display: flex; width: 100%; justify-content: center; }
          .calc-band { flex-direction: column; align-items: stretch; }
          .calc-band-btn { width: 100%; }
        }
        @media (max-width: 400px) {
          .two-col-sm { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .lang-btn { padding: 7px 11px !important; }
        }
        @media (max-width: 340px) {
          .brand-mark, .brand-rule { display: none; }
        }
        @media (max-width: 380px) {
          .brand { --s: 0.72; }
        }
        @media (min-width: 1181px) {
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
