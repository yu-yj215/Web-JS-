// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      alert(response.data.message); // 로그인 성공 시 서버에서 반환한 데이터
      console.log(response.data.message);
      props.onLoginSuccess();
    } catch (error) {
      console.error('Login failed:', error); // 로그인 실패 시 서버에서 반환한 에러 메시지
    }
  };

  return (
    
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit = {handleLogin}>
          <label htmlFor='username'>Username</label>
          <input value={username} onChange= {(e) => setUsername(e.target.value)} type="username" placeholder='username' id="username" name="username"/>
          <label htmlFor='password'>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='********'id="password" name="password"/>
          <button type='submit'>LogIn</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>회원이 아니라면? 회원가입</button>
    </div>
    
  );
};

export default LoginForm;
