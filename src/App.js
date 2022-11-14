import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.js";
import { AddPokemon } from "./pages/AddPokemon";
import { Home } from "./pages/Home";
import { PokemonPage } from "./pages/PokemonPage";
import { EditPokemon } from "./pages/EditPokemon";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-pokemon" element={<AddPokemon />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
        <Route path="/edit-pokemon/:id" element={<EditPokemon />} />
      </Routes>
    </div>
  );
}

export default App;
