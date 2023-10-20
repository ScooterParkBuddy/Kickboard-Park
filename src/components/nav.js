import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
import { useEffect, useState } from 'react';
import Loading from './loading';

const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/kakaologin`;

function Nav() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loginBtn = document.getElementById('loginBtn');

    function setLogin() {
      loginBtn.classList.add('hidden');
    }
    if (localStorage.getItem('userId')) {
      setLogin();
    }
    loginBtn.addEventListener('click', () => {
      setLoading(true);
      window.location.href = KAKAO_LOGIN_URL;
    });
  }, []);
  return (
    <div id="wrapper">
      {loading ? <Loading /> : null}
      <div className="navbar">
        <NavLink to="/" className="navMenu" activeclassname="active">
          홈
        </NavLink>
        <NavLink to="/community" className="navMenu" activeclassname="active">
          커뮤니티
        </NavLink>
        <div id="my">
          <button type="button" id="loginBtn" />
        </div>
      </div>
    </div>
  );
}
export default Nav;
