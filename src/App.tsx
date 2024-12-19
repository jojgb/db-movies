import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar className="bg-black" fontColor="text-white" />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
