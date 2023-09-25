import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
import { useEffect } from 'react';
import LoginModel from '../models/loginModel';

const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/kakaologin`;

function Nav() {
  useEffect(() => {
    console.log('nav');
    const loginBtn = document.getElementById('loginBtn');
    const myBtn = document.getElementById('myBtn');
    const div = document.getElementById('my');
    loginBtn.addEventListener('click', () => {
      window.location.href = KAKAO_LOGIN_URL;
      loginBtn.classList.add('hidden');
      myBtn.classList.remove('hidden');
    });
  }, []);
  return (
    <div id="wrapper">
      <div className="navbar">
        <NavLink to="/" className="navMenu" activeclassname="active">
          홈
        </NavLink>
        <NavLink to="/community" className="navMenu" activeclassname="active">
          커뮤니티
        </NavLink>
        <NavLink to="/help" className="navMenu" activeclassname="active">
          고객센터
        </NavLink>
        <div id="my">
          <button type="button" id="loginBtn" />
          <button id="myBtn" className="hidden" />
        </div>
      </div>
    </div>
  );
}
export default Nav;
