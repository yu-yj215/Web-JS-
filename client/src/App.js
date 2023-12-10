// App.js
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegisterForm';
import SeatClient from './SeatClient';
import axios from 'axios';
import './App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  axios.defaults.withCredentials = true;


  useEffect(() => {
    // 컴포넌트가 마운트될 때 서버에 로그인 상태 확인 요청
    axios.get('http://localhost:3001/check-login')
      .then(response => {
        if (response.data.loggedIn) {
          setLoggedIn(true);
          console.log("유지 성공");
        }
        else {
          setLoggedIn(false);
          console.log("유지 실패")
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
      });
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  // 로그아웃 시 호출되는 함수
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/logout');
      alert(response.data.message); // 로그아웃 성공 시 서버에서 반환한 데이터
      console.log(response.data.message);
      setLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error); // 로그아웃 실패 시 서버에서 반환한 에러 메시지
    }
  };

  // 회원가입 성공 시 호출되는 함수
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className='App'>
      {
        isLoggedIn ? (
          <SeatClient onLogout={handleLogout}/>
        ) : (
          currentForm === "login" ? (
            <LoginForm onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess}  />
          ) : (
            <RegistrationForm onFormSwitch={toggleForm} />
          )
        )
      }
    </div>
  );
};

export default App;
