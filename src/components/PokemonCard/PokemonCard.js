import { Link } from "react-router-dom";
import background from "../../images/Cardback-PhotoRoom.jpeg";

export function PokemonCard(props) {
  const { poke_name, number, poke_img, type, id } = props;

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "24rem",
          marginLeft: "3rem",
        }}
      >
        <div className="flex flex-col justify-between items-center mb-10 h-96 w-96 p-4">
          <h1 className="font-roboto font-black text-sky-700 text-3xl bg-white py-1 px-2 rounded-md border border-gray-400 shadow-md shadow-white mb-10">
            {poke_name}
          </h1>

          <img src={poke_img} alt="Pokemon" className="w-40 h-40 mb-16" />

          <p className="font-roboto text-sky-700 text-md font-black bg-white py-1 px-2 rounded-md border border-gray-400 shadow-md shadow-white mb-3">
            #{number}
          </p>
          <ul>
            <li className="flex flex-row font-roboto text-sky-700 text-lg font-black gap-3">
              {type}
            </li>
          </ul>
        </div>
      </div>
      <Link to={`/pokemon/${id}`}>
        <button
          type="button"
          className="w-32 font-Roboto text-white bg-gray-600 py-3 px-4 rounded-md  hover:-translate-y-0.5  transform transition hover:bg-blue-500 mb-8"
        >
          Saber mais
        </button>
      </Link>
    </div>
  );
}
