import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard.js";

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
          <>
            <PokemonCard
              poke_name={currentPokemon.poke_name}
              poke_img={currentPokemon.poke_img}
              number={currentPokemon.number}
              id={currentPokemon.id}
              type={currentPokemon.types.map((currentType) => {
                return currentType.type;
              })}
            />
          </>
        );
      })}
    </div>
  );
}
