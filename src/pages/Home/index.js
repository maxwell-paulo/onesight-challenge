import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { PokemonCard } from "../../components/PokemonCard/PokemonCard.js";
import addBtn from "../../images/Add-Button.png";
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
    <div className="flex justify-center bg-grayrgba my-8 w-5/6 m-auto border-sky-600 border-8 rounded-md p-8 flex-wrap">
      <Link to={"/add-pokemon"}>
        <img src={addBtn} alt="Add button" className="w-80 " />
      </Link>

      {pokemons.map((currentPokemon) => {
        return (
          <div>
            <PokemonCard
              poke_name={currentPokemon.poke_name}
              poke_img={currentPokemon.poke_img}
              number={currentPokemon.number}
              id={currentPokemon.id}
              type={currentPokemon.types.map((currentType) => {
                return (
                  <div className=" bg-white py-1 px-2 rounded-md border border-gray-400 shadow-md shadow-white ">
                    <p>{currentType.type}</p>
                  </div>
                );
              })}
            />
          </div>
        );
      })}
    </div>
  );
}
