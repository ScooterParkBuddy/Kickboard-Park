import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
import { useEffect, useState } from 'react';
import Loading from './loading';
import Modal from './modal';
import { EditIcon } from '@chakra-ui/icons';

const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/kakaologin`;

function Nav() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const getModal = (value) => {
    setModal(value);
  };
  useEffect(() => {
    console.log('nav');
    const loginBtn = document.getElementById('loginBtn');
    const myBtn = document.getElementById('myBtn');
    const nickname = localStorage.getItem('nickname');
    const nicknameArea = document.getElementById('nicknameArea');
    const editBtn = document.getElementById('editBtn');
    editBtn.addEventListener('click', () => {
      setModal(true);
    });
    function setLogin() {
      nicknameArea.classList.remove('hidden');
      loginBtn.classList.add('hidden');
      myBtn.innerText = `${nickname} 님`;
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
      {modal ? <Modal getModal={getModal} modal={modal} /> : null}
      <div className="navbar">
        <NavLink to="/" className="navMenu" activeclassname="active">
          홈
        </NavLink>
        <NavLink to="/community" className="navMenu" activeclassname="active">
          커뮤니티
        </NavLink>
        <div id="my">
          <button type="button" id="loginBtn" />
          <div id="nicknameArea" className="hidden">
            <button type="button" id="myBtn" />
            <EditIcon id="editBtn" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Nav;
