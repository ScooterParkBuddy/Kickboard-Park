import '../styles/community.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContentsModel from '../models/contentsModel';
import Sidebar from './Sidebar';
import Forum from './Forum';

function Community() {
  const navigate = useNavigate();
  // const navigateToAccident = () => {
  //   navigate('/community/accident');
  // };
  // const navigateToGeneral = () => {
  //   navigate('/community/general');
  // };
  const [boardId, setBoardId] = useState(0);
  const getBoardId = (value) => {
    setBoardId(value);
  };
  useEffect(() => {
    // const accidentForum = document.getElementById('accidentForum');
    // const generalForum = document.getElementById('generalForum');
    // const acc_promise = ContentsModel.gets(A_BOARD_ID);
    // acc_promise.then((data) => {
    //   if (data.errorCode === 400) {
    //     alert('로그인이 필요합니다');
    //     navigate('/');
    //   }
    //   for (let i = data.length - 1; i >= 0; i--) {
    //     if (i === data.length - 10) {
    //       break;
    //     }
    //     const li = document.createElement('li');
    //     li.innerText = data[i].title;
    //     li.id = 'titleList';
    //     accidentForum.appendChild(li);
    //   }
    // });
    // const gen_promise = ContentsModel.gets(G_BOARD_ID);
    // gen_promise.then((data) => {
    //   for (let i = data.length - 1; i >= 0; i--) {
    //     if (i === data.length - 10) {
    //       break;
    //     }
    //     const li = document.createElement('li');
    //     li.innerText = data[i].title;
    //     li.id = 'titleList';
    //     generalForum.appendChild(li);
    //   }
    // });
  }, []);

  return (
    <div id="community">
      <Sidebar getBoardId={getBoardId} boardId={boardId} />
      <Forum boardId={boardId} />
    </div>
  );
}

export default Community;
