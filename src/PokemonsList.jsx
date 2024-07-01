import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const PAGE_SIZE = 12;

const fetchPokemonPage = async (offset) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  const data = await response.json();
  return data.results;
};

const PokemonsList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const endOfPageRef = useRef();
  const intersectionCallback = useRef();

  useEffect(() => {
    setIsPending(true);
    fetchPokemonPage().then((firstPageOfPokemons) => {
      setPokemons(firstPageOfPokemons);
      setIsPending(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) =>
      intersectionCallback.current(entries)
    );
    observer.observe(endOfPageRef.current);
  }, []);

  const handleIntersection = (entries) => {
    const endOfPage = entries[0];
    if (endOfPage.isIntersecting && !isPending) {
      console.log("is intersecting");
    } else {
      console.log("is not intersecting");
    }
  };

  useEffect(() => {
    intersectionCallback.current = handleIntersection;
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Infinite scrolling list of pokemons
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "250px 250px 250px 250px",
          margin: "auto",
          maxWidth: "1000px",
        }}
      >
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{
              border: "1px solid lightgray",
              padding: "5px",
              margin: "5px",
              textAlign: "center",
            }}
          >
            <h3>{pokemon.name}</h3>
            <img
              src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
              width="200px"
            />
          </div>
        ))}
      </div>
      {isPending && (
        <div style={{ textAlign: "center", margin: "10px" }}>Loading ...</div>
      )}
      <div ref={endOfPageRef}></div>
    </div>
  );
};

export default PokemonsList;
