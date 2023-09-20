import '../styles/community.css';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Community() {
  const navigate = useNavigate();

  const navigateToAccident = () => {
    navigate('/community/accident');
  };
  const navigateToGeneral = () => {
    navigate('/community/general');
  };

  return (
    <div id="community">
      <div>
        <h1 onClick={navigateToAccident}>🚨 사건·사고 게시판</h1>
        <div id="accidentForum">
          <li>강남구 xx동 사고</li>
        </div>
      </div>
      <div id="generalArea">
        <h1 onClick={navigateToGeneral}>🌟 자유게시판</h1>
        <div id="generalForum"></div>
      </div>
    </div>
  );
}

export default Community;
