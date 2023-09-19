import Navi from './components/nav';
import Map from './components/map';
import Help from './components/help';
import AccidentForum from './components/accidentForum';
import GeneralForum from './components/generalForum';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Community from './components/community';
function App() {
  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/community" element={<Community />} />
        <Route path="/help" element={<Help />} />
        <Route path="/community/accident" element={<AccidentForum />} />
        <Route path="/community/general" element={<GeneralForum />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
