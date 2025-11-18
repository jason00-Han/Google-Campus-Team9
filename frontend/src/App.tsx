import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import DiaryPage from './pages/Diary';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser('');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      ) : (
        <Route
          path="/"
          element={
            <DiaryPage
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          }
        />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
