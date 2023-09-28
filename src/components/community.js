import '../styles/community.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ContentsModel from '../models/contentsModel';
const A_BOARD_ID = 0;
const G_BOARD_ID = 1;

function Community() {
  const navigate = useNavigate();
  const navigateToAccident = () => {
    navigate('/community/accident');
  };
  const navigateToGeneral = () => {
    navigate('/community/general');
  };

  useEffect(() => {
    const accidentForum = document.getElementById('accidentForum');
    const generalForum = document.getElementById('generalForum');

    const acc_promise = ContentsModel.gets(A_BOARD_ID);
    acc_promise.then((data) => {
      if (data.errorCode === 400) {
        alert('로그인이 필요합니다');
        navigate('/');
      }
      for (let i = data.length - 1; i >= 0; i--) {
        if (i === data.length - 10) {
          break;
        }
        const li = document.createElement('li');

        li.innerText = data[i].title;
        li.id = 'titleList';
        accidentForum.appendChild(li);
      }
    });

    const gen_promise = ContentsModel.gets(G_BOARD_ID);
    gen_promise.then((data) => {
      for (let i = data.length - 1; i >= 0; i--) {
        if (i === data.length - 10) {
          break;
        }
        const li = document.createElement('li');

        li.innerText = data[i].title;
        li.id = 'titleList';
        generalForum.appendChild(li);
      }
    });
  }, []);

  return (
    <div id="community">
      <div>
        <h1 onClick={navigateToAccident}>🚨 사건·사고 게시판</h1>
        <hr className="commHr" />
        <div id="accidentForum"></div>
      </div>
      <div id="generalArea">
        <h1 onClick={navigateToGeneral}>🌟 자유게시판</h1>
        <hr className="commHr" />
        <div id="generalForum"></div>
      </div>
    </div>
  );
}

export default Community;
