import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar className="bg-black" fontColor="text-white" />
        {/* Main Content */}
        <main className="flex-grow p-4 bg-black text-white mt-16">
          <h1 className="text-3xl text-center my-10">Welcome to Moovie Time</h1>
          <p className="text-center">
            Discover movies, TV shows, and much more!
          </p>
          <div className="h-[2000px]">
            {/* Ini untuk simulasi konten panjang */}
            Scroll ke bawah untuk melihat footer!
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
