import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedToken = localStorage.getItem('token');

    if (savedEmail && savedToken) {
      navigate('/ask', { state: { email: savedEmail, token: savedToken } });
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'token') {
      setToken(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3131/login', { email, token });
  
      if (response.status === 200) {
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        navigate('/ask', { state: { email, token } });
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animated-background login-page">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={handleInputChange} />
        </label>
        <label>
          Token:
          <input type="password" name="token" value={token} onChange={handleInputChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;