import Navi from './components/nav';
import Map from './components/map';
import Help from './components/help';
import useGeolocation from 'react-hook-geolocation';
import AccidentForum from './components/accidentForum';
import GeneralForum from './components/generalForum';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Community from './components/community';
function App() {
  const geolocation = useGeolocation();

  //const lat = geolocation.latitude;
  //const lng = geolocation.longitude;
  const lat = 37.5176412282367;
  const lng = 127.041673152472;
  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path="/" element={<Map lat={lat} lng={lng} />} />
        <Route path="/community" element={<Community />} />
        <Route path="/help" element={<Help />} />
        <Route path="/community/accident" element={<AccidentForum />} />
        <Route path="/community/general" element={<GeneralForum />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
