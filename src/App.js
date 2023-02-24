import "./App.scss";
import pokemon from "./pokemon.json";
import PokemonRow from "./components/PokemonRow";
import PropTypes from "prop-types";
import { useState } from "react";

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div className="wrapper_tableSide">
    <h2>{name.english}</h2>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attact: PropTypes.number.isRequired,
    Defence: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

function App() {
  const [filter, setFilter] = useState("");
  const [selected, setSelectItem] = useState(null);
  return (
    <div className="wrapper">
      <h1 className="wrapper_title">Pokemon List</h1>
      <div>
        <div className="wrapper_content">
          <input
            className="wrapper_filter"
            type="text"
            name="name"
            id="name"
            placeholder="Search your Pokemon!"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <table className="wrapper_tableMain">
            <thead>
              <tr>
                <td>Name</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .slice(0, 10)
                .map((pokemon) => (
                  <PokemonRow
                    key={pokemon.id}
                    pokemon={pokemon}
                    onSelect={(pokemon) => setSelectItem(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {selected && <PokemonInfo {...selected} />}
      </div>
    </div>
  );
}

export default App;
