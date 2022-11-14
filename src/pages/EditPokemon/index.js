import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export function EditPokemon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pokemonCollectionRef = collection(db, "pokemons");

  const [form, setForm] = useState({
    poke_name: "",
    number: 0,
    types: [],
    poke_img: "",
    about: "",
  });

  const [types, setTypes] = useState({
    type: "",
  });

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getDocs(pokemonCollectionRef);

        data.docs.map((doc) => {
          if (doc.id === id) {
            setForm({ ...doc.data() });
          }
        });
      } catch (erro) {
        console.log(erro);
      }
    }
    fetchPokemon();
  }, []);

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleTypeChange(e) {
    setTypes({ ...types, [e.target.name]: e.target.value });
  }

  function handleAddType(e) {
    e.preventDefault();

    setForm({ ...form, types: [...form.types, types] });
  }

  function handleTypeDelete(type) {
    let newTypes = form.types.filter((current) => {
      return current !== type;
    });
    setForm({ ...form, types: [...newTypes] });
  }

  function handleCancel() {
    navigate(`/pokemon/${id}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const pokemonDoc = doc(db, "pokemons", id);

    try {
      await updateDoc(pokemonDoc, form);

      navigate("/");
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <div className="bg-grayrgba  mt-36 mb-8 w-5/6 m-auto border-sky-600 border-8 rounded-md p-8">
      <h1 className="flex justify-center items-center mb-10 font-roboto font-black text-sky-700 text-5xl">
        Editar Pokémon
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center w-9/12 m-auto gap-6">
          <div className="flex gap-20 justify-between items-center">
            <div className="flex flex-col justify-center items-center gap-1">
              <label
                htmlFor="nome"
                className=" font-roboto text-sky-700 text-xl font-black text-center"
              >
                Nome do Pokémon
              </label>
              <input
                id="nome"
                name="poke_name"
                type="text"
                value={form.poke_name}
                onChange={handleFormChange}
                required
                className="w-48 text-center"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
              <label
                htmlFor="numero"
                className=" font-roboto text-sky-700 text-xl font-black text-center"
              >
                Número na Pokedex
              </label>
              <input
                id="numero"
                name="number"
                value={form.number}
                type="number"
                onChange={handleFormChange}
                required
                min="001"
                max="905"
                className="w-48 text-center"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
              <label
                htmlFor="imagem"
                className=" font-roboto text-sky-700 text-xl font-black text-center"
              >
                Imagem do Pokémon
              </label>
              <input
                id="imagem"
                name="poke_img"
                value={form.poke_img}
                type="text"
                onChange={handleFormChange}
                placeholder="http://www.exemplo.com/img.png"
                required
                className="w-48 text-center"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
            <label
              htmlFor="sobre"
              className=" font-roboto text-sky-700 text-xl font-black text-center"
            >
              Escreva sobre o Pokémon
            </label>
            <input
              id="sobre"
              name="about"
              value={form.about}
              type="text"
              onChange={handleFormChange}
              placeholder="Sobre:"
              required
              className="h-24 w-96"
            />
          </div>

          <div className="flex gap-10 justify-between items-center">
            <div className="flex flex-col justify-center items-center gap-3">
              <label
                htmlFor="tipos"
                className=" font-roboto text-sky-700 text-xl font-black text-center"
              >
                Tipos
              </label>
              <select
                id="tipos"
                name="type"
                value={types.type}
                onChange={handleTypeChange}
                required
              >
                <option hidden defaultValue>
                  Selecione
                </option>

                <option disabled>Tipos</option>
                <option value="Água">Água</option>
                <option value="Dragão">Dragão</option>
                <option value="Elétrico">Elétrico</option>
                <option value="Fada">Fada</option>
                <option value="Fantasma">Fantasma</option>
                <option value="Ferro">Ferro</option>
                <option value="Fogo">Fogo</option>
                <option value="Gelo">Gelo</option>
                <option value="Grama">Grama</option>
                <option value="Inseto">Inseto</option>
                <option value="Lutador">Lutador</option>
                <option value="Normal">Normal</option>
                <option value="Pedra">Pedra</option>
                <option value="Psíquico">Psíquico</option>
                <option value="Sombrio">Sombrio</option>
                <option value="Terra">Terra</option>
                <option value="Veneno">Veneno</option>
                <option value="Voador">Voador</option>
              </select>
              <button
                type="button"
                onClick={handleAddType}
                required
                className="w-24 font-Roboto text-white bg-gray-600 py-1 px-1 rounded-md    transform transition hover:bg-blue-500"
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-col justify-center items-center bg-white w-52 py-6 gap-5">
              {form.types.map((current) => {
                return (
                  <div>
                    <p className="font-roboto text-sky-700 text-md font-black text-center">
                      {current.type}
                    </p>
                    <button
                      onClick={() => handleTypeDelete(current)}
                      type="button"
                      className="w-18 font-Roboto text-white bg-gray-600 px-1 py-1 rounded-md    transform transition hover:bg-red-500"
                    >
                      remover
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center gap-5">
            <button
              type="submit"
              className="w-32 font-Roboto text-white bg-gray-600 py-3 px-4 rounded-md  hover:-translate-y-0.5  transform transition hover:bg-blue-500"
            >
              SALVAR
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-32 font-Roboto text-white bg-gray-600 py-3 px-4 rounded-md  hover:-translate-y-0.5  transform transition hover:bg-red-500"
            >
              CANCELAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
