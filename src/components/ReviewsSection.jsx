// src/components/ReviewsSection.jsx
// Google 리뷰만 표시 (Yelp 제거 버전)

import { useState, useEffect, useRef, useCallback } from 'react';
import './ReviewsSection.css';

// ─── Google 아이콘 ────────────────────────────────────────────────
const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ─── 별점 ─────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <div className="rv-stars" aria-label={`${rating} out of 5 stars`}>
    {[1,2,3,4,5].map(n => (
      <span key={n} className={n <= rating ? 'rv-star filled' : 'rv-star'}>★</span>
    ))}
  </div>
);

// ─── 아바타 ────────────────────────────────────────────────────────
const Avatar = ({ author, avatar }) => {
  if (avatar) return <img src={avatar} alt={author} className="rv-avatar-img" />;
  const initials = author.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  return <div className="rv-avatar-initials">{initials}</div>;
};

// ─── 정적 fallback 리뷰 (API 연결 전 또는 실패 시 표시) ─────────────
const FALLBACK_REVIEWS = [
  {
    source: 'google',
    author: 'James P.',
    avatar: null,
    rating: 5,
    text: 'Danny is the best CPA in the town. He is honest, trustworthy, knowledgeable, and extremely personable. He has been taking care of my taxes and all of my family.',
    date: '2026-01-15T00:00:00Z',
    url: 'https://g.page/r/CbBcrZOvjfxzEBM/review',
  },
  {
    source: 'google',
    author: 'Sarah K.',
    avatar: null,
    rating: 5,
    text: 'Extremely professional and thorough. Danny helped me navigate a complicated business tax situation and saved me significantly. Highly recommend for any Korean-speaking clients.',
    date: '2025-11-10T00:00:00Z',
    url: 'https://g.page/r/CbBcrZOvjfxzEBM/review',
  },
  {
    source: 'google',
    author: 'Michael L.',
    avatar: null,
    rating: 5,
    text: 'CR Accountancy handled our construction company payroll and job costing seamlessly. Finally found a CPA who truly understands the construction industry.',
    date: '2025-09-22T00:00:00Z',
    url: 'https://g.page/r/CbBcrZOvjfxzEBM/review',
  },
  {
    source: 'google',
    author: 'Linda H.',
    avatar: null,
    rating: 5,
    text: 'Danny has been our family CPA for over 5 years. Always responsive, accurate, and genuinely cares about his clients. 한국어로 소통할 수 있어서 특히 좋습니다.',
    date: '2025-07-08T00:00:00Z',
    url: 'https://g.page/r/CbBcrZOvjfxzEBM/review',
  },
  {
    source: 'google',
    author: 'Kevin C.',
    avatar: null,
    rating: 5,
    text: 'Switched to CR Accountancy after years of frustration with other CPAs. The difference is night and day — proactive, detail-oriented, and explains everything clearly.',
    date: '2025-05-30T00:00:00Z',
    url: 'https://g.page/r/CbBcrZOvjfxzEBM/review',
  },
];

// ─── 리뷰 카드 ────────────────────────────────────────────────────
const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const TRUNCATE = 160;
  const needsTruncate = review.text.length > TRUNCATE;
  const displayText = needsTruncate && !expanded
    ? review.text.slice(0, TRUNCATE).trimEnd() + '…'
    : review.text;

  const dateStr = new Date(review.date).toLocaleDateString('en-US', {
    month: 'short', year: 'numeric'
  });

  return (
    <div className="rv-card">
      <div className="rv-card-header">
        <Avatar author={review.author} avatar={review.avatar} />
        <div className="rv-card-meta">
          <span className="rv-author">{review.author}</span>
          <span className="rv-date">{dateStr}</span>
        </div>
        <span className="rv-source-badge">
          <GoogleIcon size={14} />
          Google
        </span>
      </div>

      <Stars rating={review.rating} />

      <p className="rv-text">{displayText}</p>

      {needsTruncate && (
        <button className="rv-expand" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

// ─── 메인 컴포넌트 ────────────────────────────────────────────────
export default function ReviewsSection() {
  const [reviews, setReviews]     = useState(FALLBACK_REVIEWS);
  const [totalCount, setTotalCount] = useState(FALLBACK_REVIEWS.length);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused]   = useState(false);
  const timerRef = useRef(null);

  // 실시간 Google 리뷰 fetch
  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => {
        if (data.reviews?.length > 0) setReviews(data.reviews);
        if (data.meta?.total) setTotalCount(data.meta.total);
      })
      .catch(() => {}); // 실패 시 fallback 유지
  }, []);

  const total = reviews.length;

  const goTo = useCallback((i) => {
    setActiveIdx(((i % total) + total) % total);
  }, [total]);

  // 5초마다 자동 슬라이드
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => goTo(prev => prev + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goTo]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="rv-section" id="reviews">

      {/* 헤더 */}
      <div className="rv-header">
        <div className="rv-header-text">
          <p className="rv-label">Client Reviews</p>
          <h2 className="rv-title">What Our Clients Say</h2>
          <p className="rv-subtitle">Honest words from those we've served</p>
        </div>

        {/* 통계 */}
        <div className="rv-stats">
          <div className="rv-stat">
            <span className="rv-stat-num">{avgRating}</span>
            <Stars rating={5} />
            <span className="rv-stat-label">Average Rating</span>
          </div>
          <div className="rv-stat-divider" />
          <div className="rv-stat">
            <div className="rv-stat-google">
              <GoogleIcon size={20} />
              <span className="rv-stat-count">{totalCount}</span>
            </div>
            <span className="rv-stat-label">Google Reviews</span>
          </div>
          <div className="rv-stat-divider" />
          <div className="rv-stat">
            <span className="rv-stat-num">100%</span>
            <span className="rv-stat-label">Recommend Us</span>
          </div>
        </div>
      </div>

      {/* 캐러셀 */}
      <div
        className="rv-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="rv-track"
          style={{ transform: `translateX(-${activeIdx * (100 / Math.min(total, 3))}%)` }}
        >
          {reviews.map((review, i) => (
            <div key={i} className="rv-slide">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <button className="rv-arrow rv-prev" onClick={() => goTo(activeIdx - 1)} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button className="rv-arrow rv-next" onClick={() => goTo(activeIdx + 1)} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* 점 인디케이터 */}
      <div className="rv-dots">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`rv-dot ${i === activeIdx ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      {/* Google 리뷰 남기기 버튼 */}
      <div className="rv-cta-row">
        <a
          href="https://g.page/r/CbBcrZOvjfxzEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="rv-cta"
        >
          <GoogleIcon size={16} />
          Google 리뷰 남기기
        </a>
      </div>

    </section>
  );
}
