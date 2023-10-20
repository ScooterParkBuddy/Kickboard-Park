import { useState, useEffect } from 'react';
import Navi from './components/nav';
import Map from './components/map';
import useGeolocation from 'react-hook-geolocation';
import ContentsView from './components/contentView';
import WriteContents from './components/writeContents';
import UpdateContents from './components/updateContents';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Community from './components/community';
import KakaoLogin from './components/kakao_login';
import Loading from './components/loading';

function App() {
  const [loading, setLoading] = useState(true);
  const geolocation = useGeolocation();
  const lat = geolocation.latitude;
  const lng = geolocation.longitude;
  useEffect(() => {
    if (lat) {
      setLoading(false);
    }
  }, [lat, lng]);
  // const lat = 37.5176412282367;
  // const lng = 127.041673152472;
  const url = '/parking';
  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        {lat && <Route path="/" element={<Map lat={lat} lng={lng} url={url} />} />}
        <Route path="/community" element={<Community />} />
        <Route path="/kakaologin" element={<KakaoLogin />} />
        <Route path="/community/write" element={<WriteContents />} />
        <Route path="/community/update" element={<UpdateContents />} />
        <Route path="/community/view/:postId" element={<ContentsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
