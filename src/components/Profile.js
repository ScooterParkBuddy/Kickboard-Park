import '../styles/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { EditIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import Modal from './Modal';

library.add(faUser);

function Profile() {
  const nickname = localStorage.getItem('nickname');
  const [modal, setModal] = useState(false);
  const getModal = (value) => {
    setModal(value);
  };
  useEffect(() => {
    const sideeditBtn = document.getElementById('sideeditBtn');
    sideeditBtn.addEventListener('click', () => {
      setModal(true);
    });
  }, []);
  return (
    <div className="box">
      {modal ? <Modal getModal={getModal} modal={modal} /> : null}
      <div className="photoBox">
        <FontAwesomeIcon icon="user" color="black" size="xl" className="profilePhoto" />
      </div>
      <div id="nicknameArea">
        <p className="profileNickname">{nickname}</p>
        <EditIcon id="sideeditBtn" />
      </div>
    </div>
  );
}
export default Profile;
