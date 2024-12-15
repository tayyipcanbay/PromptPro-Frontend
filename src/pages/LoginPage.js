import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const host = 'https://tayyipcanbay.pythonanywhere.com';
  // const host = 'http://localhost:5500';

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
    setErrorMessage('');  // Clear any previous error message

    try {
      const response = await axios.post(`${host}/login`, { email, token });

      if (response.status === 200) {
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        navigate('/ask', { state: { email, token } });
      } else if (response.status === 401) {
        setErrorMessage('Login failed. Please check your credentials and try again.');
      } else if (response.status === 500) {
        setErrorMessage('An error occurred on the server. Please try again later.');
      } else {
        setErrorMessage('An unknown error occurred. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <div className="animated-background login-page">
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
