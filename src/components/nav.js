import { NavLink } from 'react-router-dom';
import '../styles/nav.css';

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
        <button id="my">로그인</button>
      </div>
    </div>
  );
}
export default Nav;
