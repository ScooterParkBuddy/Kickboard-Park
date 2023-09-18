import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
import KakaoLogin from './kakao_login';

function Nav() {
  return (
    <div>
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
          <KakaoLogin />
        </div>
      </div>
    </div>
  );
}
export default Nav;
