import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.js";
import { AddPokemon } from "./pages/AddPokemon";
import { Home } from "./pages/Home";
import { PokemonPage } from "./pages/PokemonPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-pokemon" element={<AddPokemon />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </div>
  );
}

export default App;
