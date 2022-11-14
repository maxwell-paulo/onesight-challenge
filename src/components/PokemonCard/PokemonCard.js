import { Link } from "react-router-dom";

export function PokemonCard(props) {
  const { poke_name, number, poke_img, type, id } = props;

  return (
    <div>
      <h1>{poke_name}</h1>
      <img src={poke_img} alt="Pokemon" />
      <p>{number}</p>
      <ul>
        <li>{type}</li>
      </ul>
      <Link to={`/pokemon/${id}`}>
        <button type="button">Saber mais</button>
      </Link>
    </div>
  );
}
