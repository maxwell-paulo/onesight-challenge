import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate, Link } from "react-router-dom";
import { async } from "@firebase/util";

export function PokemonPage() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  async function handleDelete() {
    const pokemonDoc = doc(db, "pokemons", id);
    try {
      await deleteDoc(pokemonDoc);

      navigate("/");
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <div>
      {pokemons.map((currentPokemon) => {
        if (currentPokemon.id === id) {
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
              <p>{currentPokemon.about}</p>

              <Link to={`/edit-pokemon/${currentPokemon.id}`}>
                <button type="button">Editar Pokémon</button>
              </Link>

              <button onClick={handleDelete}>Deletar Pokémon</button>
            </div>
          );
        }
      })}
    </div>
  );
}
