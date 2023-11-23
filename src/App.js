import Navi from './components/Nav';
import Map from './components/Map';
import useGeolocation from 'react-hook-geolocation';
import WritePost from './components/WritePost';
import UpdatePost from './components/UpdatePost';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Community from './components/Community';
import KakaoLogin from './components/KakaoLogin';

function App() {
  const geolocation = useGeolocation();
  const lat = geolocation.latitude;
  const lng = geolocation.longitude;
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
        <Route path="/community/write" element={<WritePost />} />
        <Route path="/community/update" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
