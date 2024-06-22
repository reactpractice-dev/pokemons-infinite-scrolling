import { useState } from "react";
import { useEffect } from "react";

const PAGE_SIZE = 6;

const fetchPokemonPage = async (offset) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  const data = await response.json();
  console.log(data);
  return data.results;
};

const PokemonsList = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    fetchPokemonPage().then((firstPageOfPokemons) =>
      setPokemons(firstPageOfPokemons)
    );
  }, []);
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          style={{
            border: "1px solid lightgray",
            padding: "5px",
            margin: "5px",
          }}
        >
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PokemonsList;
