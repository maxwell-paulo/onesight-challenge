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

          <label htmlFor="sobre">Escreva sobre o Pokémon</label>
          <input
            id="sobre"
            name="about"
            value={form.about}
            type="text"
            onChange={handleFormChange}
            placeholder="Sobre:"
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
          <button type="submit">EDITAR!</button>
        </div>
      </form>
    </div>
  );
}
