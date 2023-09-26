import axios from 'axios';
import postAxios from '../lib/postAxios';
import loginAxios from '../lib/loginAxios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModel from '../models/loginModel';
import { setPostHeaders } from '../lib/postAxios';
import { setLoginHeaders } from '../lib/loginAxios';

function KaKaoLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    loginAxios({
      method: 'get',
      url: '/login',
      params: {
        code: code,
      },
    })
      .then((res) => {
        const accessToken = res.data.access_token;
        console.log('kakao', res.data);
        if (res.status === 200) {
          LoginModel.onLoginSuccess(accessToken);
          navigate('/');
        }
      })
      .catch((error) => console.log('err', error));
  }, []);
  return (
    <div>
      <h1>Kakao Login ing</h1>
    </div>
  );
}
export default KaKaoLogin;
