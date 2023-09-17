import Navi from './components/nav';
import Map from './components/map';
import Help from './components/help';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Community from './components/community';
function App() {
  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path="/home" element={<Map />} />
        <Route path="/community" element={<Community />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
