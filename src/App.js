import Navi from './components/nav';
import Map from './components/map';
import Help from './components/help';
import useGeolocation from 'react-hook-geolocation';
import AccidentForum from './components/accidentForum';
import GeneralForum from './components/generalForum';
import ContentsView from './components/contentView';
import WriteContents from './components/writeContents';
import UpdateContents from './components/updateContents';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Community from './components/community';
import KakaoLogin from './components/kakao_login';
import { useEffect } from 'react';
import LoginModel from './models/loginModel';

function App() {
  const geolocation = useGeolocation();
  // const lat = geolocation.latitude;
  // const lng = geolocation.longitude;
  const lat = 37.5176412282367;
  const lng = 127.041673152472;
  const url = '/parking';

  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path="/" element={<Map lat={lat} lng={lng} url={url} />} />
        <Route path="/community" element={<Community />} />
        <Route path="/help" element={<Help />} />
        <Route path="/kakaologin" element={<KakaoLogin />} />
        <Route path="/community/accident" element={<AccidentForum />} />
        <Route path="/community/general" element={<GeneralForum />} />
        <Route path="/community/write" element={<WriteContents />} />
        <Route path="/community/update" element={<UpdateContents />} />
        <Route path="/community/view" element={<ContentsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
