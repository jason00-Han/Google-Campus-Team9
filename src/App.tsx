// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import DiaryPage from './pages/Diary';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  // useEffect의 의존성 배열에서 navigate를 제거합니다.
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true }); // replace: true 옵션 추가를 권장
    }
  }, [isLoggedIn]); // isLoggedIn 상태에만 의존하도록 변경

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setCurrentUser(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    navigate('/login');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" replace />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <DiaryPage currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
      />
      <Route 
        path="*"
        element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}
