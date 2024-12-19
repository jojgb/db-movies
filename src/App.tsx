import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/pages/home";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar className="bg-black" fontColor="text-white" />
        {/* Main Content */}
        <main className="flex-grow p-4 bg-black text-white mt-16">
          <Home />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
