import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import SquareAdmin from '../pages/SquareAdmin/SquareAdmin';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<div> Hey, this is the home of my three js learning project</div>} />
          <Route path="squareadmin/" element={<SquareAdmin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
