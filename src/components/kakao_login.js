import loginAxios from '../lib/loginAxios';
import { useEffect, useState } from 'react';
import LoginModel from '../models/loginModel';
import Loading from './loading';
import Modal from './modal';

function KaKaoLogin() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const getModal = (value) => {
    setModal(value);
  };
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
        if (res.status === 200) {
          LoginModel.onLoginSuccess(accessToken);
          setLoading(false);
        }
      })
      .catch((error) => console.log('err', error));
  }, []);
  return <div>{loading ? <Loading /> : <Modal getModal={getModal} modal={modal} />}</div>;
}
export default KaKaoLogin;
