import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MoviesPage from "./pages/MoviesPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import Page404 from "./pages/Page404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/info/:id" element={<MovieInfoPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
