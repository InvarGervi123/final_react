import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HomeInfo from "./pages/HomeInfo";
import Page404 from "./pages/Page404";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info/:id" element={<HomeInfo />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
