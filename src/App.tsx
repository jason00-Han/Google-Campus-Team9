// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DiaryPage from './pages/DiaryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* 새로운 다이어리 페이지 라우트 추가 */}
        <Route path="/diary" element={<DiaryPage />} />

        {/* 앱 시작 시 로그인 페이지로 이동하도록 설정 */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
