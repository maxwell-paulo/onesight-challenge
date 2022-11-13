import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.js";

function App() {
  return (
    <div>
      <Navbar />
      <Routes></Routes>
    </div>
  );
}

export default App;
