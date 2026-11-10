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

// 리뷰는 Vercel 서버 함수(/api/reviews)에서 옵니다. npm start 로컬 미리보기에서는
// 그 함수가 돌지 않으므로 실제 사이트의 주소에서 받아 옵니다.
const REVIEWS_URL = process.env.NODE_ENV === 'development'
  ? 'https://dkcpala.com/api/reviews'
  : '/api/reviews';

// One request per page load, shared by the first screen (rating line) and this section.
let reviewsPromise = null;
export function loadReviews() {
  if (!reviewsPromise) {
    reviewsPromise = fetch(REVIEWS_URL)
      .then(r => { if (!r.ok) throw new Error('fetch failed'); return r.json(); })
      .catch(err => { reviewsPromise = null; throw err; });
  }
  return reviewsPromise;
}

// ─── 문구 ─────────────────────────────────────────────────────────
const TEXT = {
  en: {
    label: 'Client reviews', title: 'What clients say',
    subtitle: 'The five most recent reviews on Google, shown as posted.',
    rating: 'Google rating', count: 'Google reviews',
    more: 'Read more', less: 'Show less', write: 'Leave a Google review', locale: 'en-US',
  },
  ko: {
    label: 'Google 리뷰', title: '고객분들이 남긴 리뷰',
    subtitle: 'Google에 올라온 최근 리뷰 5개를 그대로 보여 드립니다.',
    rating: 'Google 평점', count: 'Google 리뷰',
    more: '더 보기', less: '접기', write: 'Google 리뷰 남기기', locale: 'ko-KR',
  },
};

// ─── 리뷰 카드 ────────────────────────────────────────────────────
const ReviewCard = ({ review, t }) => {
  const [expanded, setExpanded] = useState(false);
  const TRUNCATE = 160;
  const needsTruncate = review.text.length > TRUNCATE;
  const displayText = needsTruncate && !expanded
    ? review.text.slice(0, TRUNCATE).trimEnd() + '…'
    : review.text;

  const dateStr = new Date(review.date).toLocaleDateString(t.locale, {
    month: 'short', year: 'numeric'
  });

  return (
    <div className="rv-card">
      <div className="rv-card-header">
        <Avatar author={review.author} avatar={review.avatar} />
        <div className="rv-card-meta">
          {review.url
            ? <a className="rv-author" href={review.url} target="_blank" rel="noopener noreferrer">{review.author}</a>
            : <span className="rv-author">{review.author}</span>}
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
          {expanded ? t.less : t.more}
        </button>
      )}
    </div>
  );
};

// ─── 메인 컴포넌트 ────────────────────────────────────────────────
export default function ReviewsSection({ lang = 'en' }) {
  const t = TEXT[lang === 'ko' ? 'ko' : 'en'];
  const [reviews, setReviews]       = useState([]);
  const [rating, setRating]         = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [activeIdx, setActiveIdx]   = useState(0);
  const [isPaused, setIsPaused]     = useState(false);
  const [perPage, setPerPage]       = useState(3);
  const activeIdxRef = useRef(0);
  const timerRef = useRef(null);
  const touchX = useRef(0);
  const [loadFailed, setLoadFailed] = useState(false);

  // Google 최신 리뷰 5개 + 전체 평점·리뷰 수 (예시 리뷰는 쓰지 않음)
  useEffect(() => {
    loadReviews()
      .then(data => {
        if (Array.isArray(data.reviews)) {
          setReviews(data.reviews.slice(0, 5));
          setActiveIdx(0);
          activeIdxRef.current = 0;
        }
        if (typeof data.rating === 'number') setRating(data.rating);
        if (typeof data.total === 'number') setTotalCount(data.total);
      })
      .catch(() => setLoadFailed(true));
  }, []);

  // 화면 크기에 따라 한 번에 보여줄 슬라이드 수 결정
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 600) setPerPage(1);
      else if (window.innerWidth <= 900) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const total = reviews.length;
  const maxIdx = Math.max(0, total - perPage);

  const goTo = useCallback((i) => {
    const next = Math.min(Math.max(0, typeof i === 'function' ? i(activeIdxRef.current) : i), maxIdx);
    activeIdxRef.current = next;
    setActiveIdx(next);
  }, [maxIdx]);

  // 5초마다 자동 슬라이드
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      goTo(prev => prev >= maxIdx ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goTo, maxIdx]);


  return (
    <section className="rv-section" id="reviews">

      {/* 헤더 */}
      <div className="rv-header">
        <div className="rv-header-text">
          <p className="rv-label">{t.label}</p>
          <h2 className="rv-title">{t.title}</h2>
          <p className="rv-subtitle">{t.subtitle}</p>
        </div>

        {/* 통계 — Google에서 받은 실제 평점과 리뷰 수만 표시 */}
        {rating !== null && totalCount !== null && (
          <div className="rv-stats">
            <div className="rv-stat">
              <span className="rv-stat-num">{rating.toFixed(1)}</span>
              <Stars rating={Math.round(rating)} />
              <span className="rv-stat-label">{t.rating}</span>
            </div>
            <div className="rv-stat-divider" />
            <div className="rv-stat">
              <div className="rv-stat-google">
                <GoogleIcon size={20} />
                <span className="rv-stat-count">{totalCount}</span>
              </div>
              <span className="rv-stat-label">{t.count}</span>
            </div>
          </div>
        )}
      </div>

      {total > 0 && (<>
      {/* 캐러셀 */}
      <div
        className="rv-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setIsPaused(true); }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) goTo(activeIdxRef.current + (dx < 0 ? 1 : -1));
          setIsPaused(false);
        }}
      >
        <div
          className="rv-track"
          style={{ transform: `translateX(-${activeIdx * (100 / perPage)}%)` }}
        >
          {reviews.map((review, i) => (
            <div key={i} className="rv-slide" style={{ flex: `0 0 ${100 / perPage}%` }}>
              <ReviewCard review={review} t={t} />
            </div>
          ))}
        </div>

        {activeIdx > 0 && (
          <button className="rv-arrow rv-prev" onClick={() => goTo(activeIdx - 1)} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}
        {activeIdx < maxIdx && (
          <button className="rv-arrow rv-next" onClick={() => goTo(activeIdx + 1)} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}
      </div>

      {/* 점 인디케이터 */}
      <div className="rv-dots">
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button
            key={i}
            className={`rv-dot ${i === activeIdx ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      </>)}

      {process.env.NODE_ENV === 'development' && loadFailed && total === 0 && (
        <p style={{ textAlign: 'center', fontSize: 13, color: '#9ca3af', margin: '8px 0 0' }}>
          (로컬 미리보기 안내) 실제 사이트에서 리뷰를 받아 오지 못했습니다. 배포된 사이트에서는 정상적으로 표시됩니다.
        </p>
      )}

      {/* Google 리뷰 남기기 버튼 */}
      <div className="rv-cta-row">
        <a
          href="https://g.page/r/CbBcrZOvjfxzEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="rv-cta"
        >
          <GoogleIcon size={16} />
          {t.write}
        </a>
      </div>

    </section>
  );
}
