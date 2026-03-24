import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  // react-snap이 프리렌더한 HTML이 있으면 hydrate
  hydrateRoot(rootElement, <React.StrictMode><App /></React.StrictMode>);
} else {
  // 프리렌더 없으면 일반 render
  createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}

reportWebVitals();
