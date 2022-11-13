import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export function PokemonCard(props) {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState({ types: [] });
  const pokemonCollectionRef = collection(db, "pokemons");
  const { poke_name, number, poke_img } = props;

  useEffect(() => {
    const fetchType = async () => {
      const data = await getDocs(pokemonCollectionRef);
      setPokemons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setTypes(pokemons.map((current) => current.types));
    };

    fetchType();
  }, []);

  return (
    <div>
      <h1>{poke_name}</h1>
      <img src={poke_img} alt="Pokemon" />
      <p>#{number}</p>
      {types.map((currentType) => {
        return (
          <>
            <li>{currentType.type}</li>
          </>
        );
      })}
    </div>
  );
}
