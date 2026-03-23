// api/reviews.js
// Vercel Serverless Function — 프로젝트 루트의 /api 폴더에 위치
// Google Places API로 리뷰를 가져옵니다

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.dkcpala.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // 6시간 캐싱 — API 호출 횟수 절감
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate');

  try {
    const reviews = await fetchGoogleReviews();
    res.status(200).json({ reviews, total: reviews.length });
  } catch (err) {
    console.error('Reviews API error:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}

async function fetchGoogleReviews() {
  const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!API_KEY || !PLACE_ID) {
    console.warn('Google API credentials missing — using fallback');
    return [];
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${PLACE_ID}` +
    `&fields=reviews,rating,user_ratings_total` +
    `&reviews_sort=newest` +
    `&key=${API_KEY}`;

  const res  = await fetch(url);
  const data = await res.json();

  if (!data.result?.reviews) return [];

  return data.result.reviews
    .filter(r => r.rating >= 4)
    .map(r => ({
      source: 'google',
      author: r.author_name,
      avatar: r.profile_photo_url || null,
      rating: r.rating,
      text:   r.text,
      date:   new Date(r.time * 1000).toISOString(),
      url:    r.author_url,
    }));
}
