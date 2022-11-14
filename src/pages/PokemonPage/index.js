import { useState, useEffect } from "react";
import { db } from "../../firebase-config.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

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

  function handleToast() {
    toast((t) => (
      <span className=" font-roboto text-sky-700 text-md font-black text-center mb-5">
        Tem certeza que deseja <b>excluir</b> esse Pokémon?
        <div className="flex justify-center items-center gap-14 mt-3">
          <button
            className="w-24 font-Roboto text-white bg-red-900 py-3 px-4 rounded-md    transform transition hover:bg-red-500"
            onClick={() => {
              handleDelete(t);
            }}
          >
            Excluir
          </button>
          <button
            className="w-24 font-Roboto text-white bg-blue-500 py-3 px-4 rounded-md    transform transition hover:bg-green-500"
            onClick={() => toast.dismiss(t.id)}
          >
            Não
          </button>
        </div>
      </span>
    ));
  }

  async function handleDelete(t) {
    const pokemonDoc = doc(db, "pokemons", id);
    try {
      await deleteDoc(pokemonDoc);

      toast.dismiss(t.id);
      navigate("/");
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <div className="bg-grayrgba mt-36 mb-8 h-5/6 w-5/6 m-auto border-sky-600 border-8 rounded-md">
      {pokemons.map((currentPokemon) => {
        if (currentPokemon.id === id) {
          return (
            <div className="flex flex-col justify-center items-center gap-4 m-5">
              <h1 className="font-roboto font-black text-sky-700 text-5xl mt-5">
                {currentPokemon.poke_name}
              </h1>
              <div className="flex justify-between items-center w-3/6 ">
                <img
                  src={currentPokemon.poke_img}
                  alt="Pokemon"
                  className="w-80 h-80 mb-16"
                />
                <div className="flex flex-col justify-between items-center gap-5">
                  <div className="flex gap-5">
                    <p className="font-roboto text-sky-700 text-xl font-black ">
                      Número na Pokedex:
                    </p>
                    <p className="font-roboto text-sky-700 text-xl font-black ">
                      #{currentPokemon.number}
                    </p>
                  </div>
                  <div className="flex justify-center items-start gap-5">
                    <p className="font-roboto text-sky-700 text-xl font-black ">
                      Tipos:
                    </p>
                    <ul>
                      {currentPokemon.types.map((currentType) => {
                        return (
                          <li className="font-roboto text-sky-700 text-xl font-black ">
                            - {currentType.type}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="w-3/6 font-roboto text-sky-700 text-xl font-black text-center">
                {currentPokemon.about}
              </p>

              <div className="flex gap-4">
                <Link to={`/edit-pokemon/${currentPokemon.id}`}>
                  <button
                    type="button"
                    className="w-40 font-Roboto text-white bg-gray-600 py-3 px-4 rounded-md  hover:-translate-y-0.5  transform transition hover:bg-blue-500"
                  >
                    Editar Pokémon
                  </button>
                </Link>

                <button
                  onClick={handleToast}
                  className="w-40 font-Roboto text-white bg-gray-600 py-3 px-4 rounded-md  hover:-translate-y-0.5  transform transition hover:bg-red-500"
                >
                  Deletar Pokémon
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
