// App.js
import React from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegisterForm';

const App = () => {
  return (
    <div>
      <h1>Login App</h1>
      <LoginForm />
      <RegistrationForm />
    </div>
  );
};

export default App;
