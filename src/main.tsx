// src/main.tsx

import React from 'react';
// 1. 'react-dom/client'에서 'createRoot' 함수만 직접 가져옵니다.
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 2. 렌더링할 컨테이너(root div)를 찾습니다.
const container = document.getElementById('root');

// 3. createRoot를 직접 호출하여 root를 생성합니다.
const root = createRoot(container!); // '!'는 container가 null이 아님을 TypeScript에 알려줍니다.

// 4. 생성된 root에 App 컴포넌트를 렌더링합니다.
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
