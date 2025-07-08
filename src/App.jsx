import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import AnimePage from "./Components/AnimePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<HomePage/>} />
          <Route path="/Anime/:id" element = {<AnimePage/>} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
