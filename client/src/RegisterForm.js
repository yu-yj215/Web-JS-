// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await axios.post('http://localhost:3001/register', { username, password });
      alert(response.data.message); // Registration success message from the server
    } catch (error) {
      console.error('Registration failed:', error.response.data.error); // Registration failure message from the server
    }
  };

  return (
    
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit = {handleRegister}>
          <label htmlFor='username'>Username</label>
          <input value={username} onChange= {(e) => setUsername(e.target.value)} type="username" placeholder='username' id="username" name="username"/>
          <label htmlFor='password'>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='********' id="password" name="password"/>
          <label htmlFor='confirmPassword'>confirmPassword</label>
          <input value={confirmPassword} onChange= {(e) => setConfirmPassword(e.target.value)} type="confirmPassword" placeholder='********' id="corfirmPassowrd" name="confirmPassword"/>
          <button type='submit'>Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>이미 회원이라면? 로그인</button>
    </div>
    
  );
};

export default RegistrationForm;
