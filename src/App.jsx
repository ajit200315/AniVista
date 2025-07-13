import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import AnimePage from "./Components/AnimePage";
import UserContextProvider from "./Context/UserContextPro";


function App() {
  return (
    <>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<HomePage/>} />
          <Route path="/Anime/:id" element = {<AnimePage/>} /> 
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    </>
  );
}

export default App;
