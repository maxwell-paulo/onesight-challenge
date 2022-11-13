import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config.js";

export function AddPokemon() {
  const navigate = useNavigate();

  const pokemonCollectionRef = collection(db, "pokemons");

  const [form, setForm] = useState({
    poke_name: "",
    number: 0,
    types: [],
    poke_img: "",
  });

  const [types, setTypes] = useState({
    type: "",
  });

  function handleTypeChange(e) {
    setTypes({ ...types, [e.target.name]: e.target.value });
    console.log(types);
  }

  function handleAddType(e) {
    e.preventDefault();

    setForm({ ...form, types: [...form.types, types] });
    console.log(form);
  }

  function handleTypeDelete(tipo) {
    let newTypes = form.types.filter((current) => {
      return current !== tipo;
    });
    setForm({ ...form, types: [...newTypes] });
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await addDoc(pokemonCollectionRef, form);

      navigate("/");

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  // const createUser = async () => {
  //   await addDoc(pokemonCollectionRef, { ...form });

  //   navigate("/");
  // };

  return (
    <div>
      <h1>Adicionar Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do Pokémon:</label>
          <input
            id="nome"
            name="poke_name"
            type="text"
            value={form.poke_name}
            onChange={handleFormChange}
            required
          />
          <label htmlFor="numero">Número na Pokedex:</label>
          <input
            id="numero"
            name="number"
            value={form.number}
            type="number"
            onChange={handleFormChange}
            required
            min="1"
            max="905"
          />

          <label htmlFor="imagem">Imagem do Pokémon:</label>
          <input
            id="imagem"
            name="poke_img"
            value={form.poke_img}
            type="text"
            onChange={handleFormChange}
            placeholder="http://www.exemplo.com/img.png"
            required
          />
          <label htmlFor="tipos">Tipos: </label>
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
            <option value="Normal">Normal</option>
            <option value="Fogo">Fogo</option>
            <option value="Água">Água</option>
            <option value="Grama">Grama</option>
            <option value="Voador">Voador</option>
            <option value="Lutador">Lutador</option>
            <option value="Veneno">Veneno</option>
            <option value="Elétrico">Elétrico</option>
            <option value="Terra">Terra</option>
            <option value="Pedra">Pedra</option>
            <option value="Psíquico">Psíquico</option>
            <option value="Gelo">Gelo</option>
            <option value="Inseto">Inseto</option>
            <option value="Fantasma">Fantasma</option>
            <option value="Ferro">Ferro</option>
            <option value="Dragão">Dragão</option>
            <option value="Sombrio">Sombrio</option>
            <option value="Fada">Fada</option>
          </select>
          <button type="button" onClick={handleAddType} required>
            Adicionar
          </button>
          <div>
            {form.types.map((current) => {
              console.log(`current.type ${current.type}`);
              return (
                <div>
                  <p>{current.type}</p>
                  <button
                    onClick={() => handleTypeDelete(current)}
                    type="button"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <button type="submit">ADICIONAR!</button>
        </div>
      </form>
    </div>
  );
}
