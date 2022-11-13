import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard.js";

export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const pokemonCollectionRef = collection(db, "pokemons");

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getDocs(pokemonCollectionRef);

      setPokemons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

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
          </div>
        );
      })}
    </div>
  );
}
