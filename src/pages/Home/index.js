import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const pokemonCollectionRef = collection(db, "pokemons");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getDocs(pokemonCollectionRef);

        setPokemons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (erro) {
        console.log(erro);
      }
    }
    fetchPokemon();
  }, []);

  return (
    <div>
      {pokemons.map((currentPokemon) => {
        return (
          <div>
            <h1>{currentPokemon.poke_name}</h1>
            <img src={currentPokemon.poke_img} alt="Pokemon" />
            <p>#{currentPokemon.number}</p>
            <ul>
              {currentPokemon.types.map((currentType) => {
                return <li>{currentType.type}</li>;
              })}
            </ul>
            <Link to={`/pokemon/${currentPokemon.id}`}>
              <button type="button">Saber mais</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
