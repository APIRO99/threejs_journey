import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from 'components/ResponsiveAppBar/ResponsiveAppBar';
//Pages
import Home from 'Pages/Home/Home';
import BasicScene from "Pages/BasicScene/BasicScene";
import BaseScene from 'Pages/BaseScene/BaseScene';
import SquareAdmin from 'Pages/SquareAdmin/SquareAdmin';
import FullScreen from 'Pages/FullScreen/FullScrenn';
import TransformObjects from "Pages/TransformObjects/TransformObjects";
import Animations from "Pages/Animations/Animations";
import Cameras from "Pages/Cameras/Cameras";
import Geometry from "Pages/Geometry/Geometry";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar pages={[
        "03-BasicScene", 
        "05-TransformObjects", 
        "06-Animations", 
        "07-Caneras", 
        "08-fullscreen",
        "09-geometry",
        "basescene", 
        "squareadmin", 
      ]}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="03-BasicScene/" element={<BasicScene />} />
          <Route path="05-TransformObjects/" element={<TransformObjects />} />
          <Route path="06-Animations/" element={<Animations />} />
          <Route path="07-Caneras/" element={<Cameras />} />
          <Route path="08-fullscreen/" element={<FullScreen />} />
          <Route path="09-geometry/" element={<Geometry />} />
          <Route path="basescene/" element={<BaseScene />} />
          <Route path="squareadmin/" element={<SquareAdmin />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
