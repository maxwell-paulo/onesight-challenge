import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export function Searchbar() {
  const [pokemonList, setPokemonlist] = useState([]);
  const pokemonCollectionRef = collection(db, "pokemons");
  const navigate = useNavigate();

  function handleSelect(e) {
    navigate(`/pokemon/${e.value}`);
  }

  function styleFunction(provided, state) {
    return { ...provided, color: state.isFocused ? "blue" : "red" };
  }

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getDocs(pokemonCollectionRef);

        setPokemonlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (erro) {
        console.log(erro);
      }
    }
    fetchPokemon();
  }, []);

  const options = pokemonList.map((current) => {
    return {
      value: `${current.id}`,
      label: `${current.poke_name} - #${current.number}`,
    };
  });

  return (
    <div>
      <Select
        className="w-64 font-roboto"
        options={options}
        onChange={handleSelect}
        styles={styleFunction}
        placeholder="Procurar Pokémon favorito"
      />
    </div>
  );
}
