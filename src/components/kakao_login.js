import '../styles/kakaoLogin.css';
import { useEffect } from 'react';
function LoginWithKakao() {
  useEffect(() => {
    const loginBtn = document.getElementById('img-btn');
    loginBtn.addEventListener('click', () => {
      alert('클릭');
    });
  }, []);
  return <button type="button" id="img-btn" />;
}
export default LoginWithKakao;
