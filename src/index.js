import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginModel from './models/loginModel';

//액세스 토큰 있으면 다시 헤더 설정
if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== undefined) {
  const accessToken = localStorage.getItem('accessToken');
  LoginModel.onLoginSuccess(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
