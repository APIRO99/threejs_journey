import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from 'components/ResponsiveAppBar/ResponsiveAppBar';
//Pages
import BaseScene from 'Pages/BaseScene/BaseScene';
import SquareAdmin from 'Pages/SquareAdmin/SquareAdmin';
import FullScreen from 'Pages/FullScreen/FullScrenn';

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar pages={["basescene", "squareadmin", "fullscreen"]}/>
        <Routes>
          <Route path="/" element={<div> Hey, this is the home of my three js learning project</div>} />
          <Route path="basescene/" element={<BaseScene />} />
          <Route path="squareadmin/" element={<SquareAdmin />} />
          <Route path="fullscreen/" element={<FullScreen />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
