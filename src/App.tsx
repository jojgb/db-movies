import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/pages/home";
import MovieList from "./components/pages/movieList";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar className="bg-slate-700" fontColor="text-white" />
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex-grow p-4 bg-black text-white mt-16">
                <Home />
              </main>
            }
          />
          <Route path="/list" element={<MovieList />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
