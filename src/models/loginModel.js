import loginAxios from '../lib/loginAxios';
import { setPostHeaders } from '../lib/postAxios';
import { setLoginHeaders } from '../lib/loginAxios';
import axios from 'axios';

const JWT_EXPIRRY_TIME = 12 * 3600 * 1000; //accessToken 만료시간-> 밀리초

async function isSameId(writerId) {
  const data = await loginAxios({
    method: 'get',
    url: '/my',
  })
    .then((res) => {
      if (writerId === res.data.useId) {
        return true;
      } else return false;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

async function onLoginSuccess(accessToken) {
  setPostHeaders(accessToken);
  setLoginHeaders(accessToken);

  localStorage.setItem('accessToken', accessToken);
  if (localStorage.getItem('userId') === null || localStorage.getItem('userId') === undefined) {
    await loginAxios({
      method: 'get',
      url: '/my',
    })
      .then((res) => {
        const userId = res.data.userId;
        localStorage.setItem('userId', userId);
      })
      .catch((error) => {
        return error.response;
      });
  }
  //만료 시간 1분 전, 갱신
  setTimeout(getRefreshToken, JWT_EXPIRRY_TIME - 60000);
}

async function getRefreshToken() {
  await loginAxios({
    method: 'get',
    url: '/my',
  })
    .then((res) => {
      const refreshToken = res.data.refreshToken;
      getAccessToken(refreshToken);
    })
    .catch((error) => {
      console.log('getRefresh', error);
    });
}
async function getNickname(userId) {
  await loginAxios({
    method: 'get',
    url: '/my/nickname',
    params: {
      userId: userId,
    },
  })
    .then((res) => {
      console.log('data', res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error.response);
    });
}
async function getAccessToken(refreshToken) {
  const data = await axios({
    method: 'get',
    url: '/kakao/refresh',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
    .then((res) => {
      const accessToken = res.data.access_token;
      onLoginSuccess(accessToken);
    })
    .catch((error) => {
      console.log('getAccessToken', error);
    });
  return data;
}

const LoginModel = {
  isSameId,
  getRefreshToken,
  getNickname,
  onLoginSuccess,
};
export default LoginModel;
