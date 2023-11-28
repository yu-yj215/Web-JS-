// App.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegisterForm';
import SeatClient from './SeatClient';

import './App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLoginForm(false);
  };

  // 로그아웃 시 호출되는 함수
  const handleLogout = () => {
    setLoggedIn(false);
  };

  // 회원가입 성공 시 호출되는 함수
  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
  };
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className='App'>
      {
        isLoggedIn ? (
          <SeatClient onLogout={handleLogout} />
        ) : (
          currentForm === "login" ? (
            <LoginForm onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <RegistrationForm onFormSwitch={toggleForm} onRegistrationSuccess={handleRegistrationSuccess} />
          )
        )
      }
    </div>
  );
};

export default App;
