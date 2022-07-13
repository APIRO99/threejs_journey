import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from '../components/ResponsiveAppBar/ResponsiveAppBar';
//Pages
// import SquareAdmin from '../pages/SquareAdmin/SquareAdmin';
// import FullScreen from '../pages/FullScreen/FullScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <ResponsiveAppBar pages={["squareadmin", "fullScreen"]}/>
        <Routes>
          <Route path="/" element={<div> Hey, this is the home of my three js learning project</div>} />
          <Route path="squareadmin/" element={<div>squareAdmin</div>} />
          <Route path="fullScreen/" element={<div>FullScreen</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
