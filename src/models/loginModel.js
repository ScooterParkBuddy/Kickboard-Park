import loginAxios from '../lib/loginAxios';
import { setPostHeaders } from '../lib/postAxios';
import { setLoginHeaders } from '../lib/loginAxios';

// const JWT_EXPIRRY_TIME = 12 * 3600 * 1000;
const JWT_EXPIRRY_TIME = 12 * 1000;

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

  setTimeout(getRefreshToken, JWT_EXPIRRY_TIME - 100000);
}

async function getRefreshToken() {
  await loginAxios({
    method: 'get',
    url: '/my',
  })
    .then((res) => {
      const refreshToken = res.data.refreshToken;
      setLoginHeaders(refreshToken);
      getAccessToken();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getAccessToken() {
  const data = await loginAxios({
    method: 'get',
    url: '/refresh',
  })
    .then((res) => {
      const accessToken = res.data.access_token;
      console.log('ref acc', accessToken);
      setPostHeaders(accessToken);
      setLoginHeaders(accessToken);
      onLoginSuccess(accessToken);
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

const LoginModel = {
  isSameId,
  getRefreshToken,
  onLoginSuccess,
};
export default LoginModel;
