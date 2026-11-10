// api/reviews.js
// Vercel Serverless Function — 프로젝트 루트의 /api 폴더에 위치
// Google Places API에서 최신 리뷰 5개와 전체 평점·리뷰 수를 가져옵니다.
// 별점으로 거르지 않고, 받은 그대로(원문 언어) 보여 줍니다.

export default async function handler(req, res) {
  // 로컬 미리보기(npm start)에서도 실제 리뷰를 볼 수 있게 localhost:3000 허용
  const ALLOWED = ['https://dkcpala.com', 'https://www.dkcpala.com', 'http://localhost:3000'];
  const origin = req.headers && req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', ALLOWED.includes(origin) ? origin : 'https://dkcpala.com');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // 6시간 캐싱 — API 호출 횟수 절감 (새 리뷰는 최대 6시간 뒤 반영)
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate');

  try {
    const data = await fetchGoogleReviews();
    res.status(200).json(data);
  } catch (err) {
    console.error('Reviews API error:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}

async function fetchGoogleReviews() {
  const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!API_KEY || !PLACE_ID) {
    console.warn('Google API credentials missing');
    return { reviews: [], rating: null, total: null };
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${PLACE_ID}` +
    `&fields=reviews,rating,user_ratings_total` +
    `&reviews_sort=newest` +
    `&reviews_no_translations=true` +
    `&key=${API_KEY}`;

  const res  = await fetch(url);
  const data = await res.json();

  if (data.status && data.status !== 'OK') {
    console.warn('Places API status:', data.status, data.error_message || '');
  }

  const place = data.result || {};
  const reviews = (place.reviews || [])
    .sort((a, b) => (b.time || 0) - (a.time || 0))
    .slice(0, 5)
    .map(r => ({
      source: 'google',
      author: r.author_name,
      avatar: r.profile_photo_url || null,
      rating: r.rating,
      text:   r.text || '',
      date:   new Date(r.time * 1000).toISOString(),
      url:    r.author_url || null,
    }));

  return {
    reviews,
    rating: typeof place.rating === 'number' ? place.rating : null,
    total:  typeof place.user_ratings_total === 'number' ? place.user_ratings_total : null,
  };
}
