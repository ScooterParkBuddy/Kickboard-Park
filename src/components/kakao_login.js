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
    axios({
      method: 'get',
      url: '/kakao/login',
      params: {
        code: code,
      },
    })
      .then((res) => {
        const accessToken = res.data.access_token;
        console.log('token', accessToken);
        if (res.status === 200) {
          console.log('200');
          setPostHeaders(accessToken);
          setLoginHeaders(accessToken);
          // loginAxios.defaults.common.Authorization = `Bearer ${accessToken}`;
          // console.log('auth', postAxios.defaults.headers.common.Authorization);
          loginAxios({
            method: 'get',
            url: '/my',
          })
            .then((response) => {
              console.log('response', response);
            })
            .catch((error) => {
              console.log('error', error);
            });
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
