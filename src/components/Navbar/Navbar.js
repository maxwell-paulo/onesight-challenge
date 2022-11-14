import { Searchbar } from "../Searchbar/Searchbar.js";
import logo from "../../images/Pokemon-Logo.png";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="flex justify-between items-center pt-5 pb-3 px-10 bg-sky-700 fixed top-0 w-full">
      <div className="flex justify-between items-center gap-10">
        <Link to={`/`}>
          <p className="font-roboto text-white text-xl font-black text-center hover:text-yellow-400">
            Home
          </p>
        </Link>
        <Link to={`/add-pokemon`}>
          <p className="font-roboto text-white text-xl font-black text-center hover:text-yellow-400">
            Adicionar Pokémon
          </p>
        </Link>
      </div>
      <img src={logo} alt="Logo" className="w-28" />
      <Searchbar />
    </div>
  );
}
