import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import AnimePage from "./Components/AnimePage";
import UserContextProvider from "./Context/UserContextPro";
import WatchListPage from "./Components/WatchListPage";


function App() {
  return (
    <>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<HomePage/>} />
          <Route path="/Anime/:id" element = {<AnimePage/>} /> 
          <Route path="/WatchList" element = {<WatchListPage/>} /> 
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    </>
  );
}

export default App;
