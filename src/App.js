import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.js";
import { AddPokemon } from "./pages/AddPokemon";
import { Home } from "./pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addpokemon" element={<AddPokemon />} />
      </Routes>
    </div>
  );
}

export default App;
