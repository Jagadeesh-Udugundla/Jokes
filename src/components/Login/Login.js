import React, { useState, useEffect } from 'react';
import './Login.css'
import JokesPage from '../JokesPage/JokesPage.js';

const LoginPage = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('password');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 container-fluid p-2">
      <div>
        {isLoggedIn ? (
          <JokesPage handleLogout={handleLogout} />
        ) : (
          <div className="form-container">
            <h1 className="head">
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder='User Id'
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Password'
                  required
                />
              </div>
              <div className='text-center'>
              <button type="submit" className="logout-button">Login</button>
              </div>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
