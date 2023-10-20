import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../styles/modal.css';
import axios from 'axios';

function Modal({ getModal }) {
  useEffect(() => {
    const nickname = document.getElementById('nickname');
    const save = document.getElementById('save');
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', () => {
      if (localStorage.getItem('nickname')) {
        window.location.replace('/');
      } else {
        alert('닉네임 설정이 필수입니다.');
      }
    });
    save.addEventListener('click', () => {
      if (nickname.value.length < 2) {
        alert('닉네임을 2글자 이상 입력해 주세요');
      } else {
        localStorage.setItem('nickname', nickname.value);
        getModal(false);
        axios({
          method: 'post',
          url: '/nickname',
          data: {
            userId: localStorage.getItem('userId'),
            alias: `${nickname.value}`,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
          .then((res) => {
            console.log('200 OK');
          })
          .catch((error) => {
            console.log(error);
          });
        window.location.replace('/community');
      }
    });
  }, []);

  return (
    <div id="background">
      <div id="modal">
        <button id="closeBtn" />
        <div id="image" />
        <h2 id="setNicknameTitle">닉네임 설정</h2>
        <input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요 (2-10자 입력 가능)"
          maxLength={10}
          minLength={2}
        />
        <input id="save" type="submit" value="저장" />
      </div>
    </div>
  );
}

export default Modal;
