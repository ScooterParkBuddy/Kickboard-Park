import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import '../styles/sidebar.css';

function Sidebar({ getBoardId, boardId }) {
  const ACTIVE_CLASS = 'active';
  const navigate = useNavigate();
  let newBoardId = boardId;

  useEffect(() => {
    const writeBtn = document.getElementById('writeBtn');

    writeBtn.addEventListener('click', () => {
      navigate('/community/write', {
        state: {
          BOARD_ID: newBoardId,
        },
      });
    });

    const itemList = document.querySelectorAll('.sidemenu');
    const defaultForum = document.getElementById(boardId);
    defaultForum.classList.add(ACTIVE_CLASS);
    itemList.forEach(function (item) {
      item.addEventListener('click', function () {
        getBoardId(Number(item.id));
        newBoardId = Number(item.id);
        itemList.forEach(function (e) {
          e.classList.remove(ACTIVE_CLASS);
        });
        item.classList.add(ACTIVE_CLASS);
      });
    });
  }, []);
  return (
    <div className="sidebar">
      <Profile />
      <div id="writeBtnArea">
        <button type="button" id="writeBtn">
          글쓰기
        </button>
      </div>
      <ul className="menuBox">
        <li className="sidemenu" id="0">
          사건·사고 게시판
        </li>
        <li className="sidemenu" id="1">
          자유게시판
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
