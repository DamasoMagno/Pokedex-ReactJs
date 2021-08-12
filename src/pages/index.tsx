import { ChangeEvent, useState, useEffect, useContext } from "react";

import { Card } from "../components/CardPokemon";
import { Header } from '../components/Header';
import { api } from "../services/api";
import { offsetContext } from "../context/currentOffset";

import styles from "../styles/pages/Home.module.css";

import { Pokemon } from "../interfaces/pokemon";

export default function Home() {
  const { limitOfAllPokemons, setLimitOfAllPokemons } = useContext(offsetContext);

  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon>();

  const [offset, setOffset] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(20);

  const [buttonSearchDisabled, setButtonSearchDisabled] = useState(false);
  const [error, setError] = useState("");

  let timer = null;

  useEffect(() => {
    if(limitOfAllPokemons > 10){
      renderPokemons(1, limitOfAllPokemons);
      return;
    }
    
    renderPokemons(offset, currentLimit);
  }, []);

  async function renderPokemons(offset, currentLimit) {
    while(offset <= currentLimit) {
      const pokemon = await api.get<Pokemon>(`${offset}`)
      setAllPokemons(pokemons => [...pokemons, pokemon.data])
      offset++;
    }
  }

  async function handleDisplayMorePokemons(...args: [number, number, number?]){
    setButtonSearchDisabled(true);

    await renderPokemons(args[0], args[1]);

    setLimitOfAllPokemons(args[2] || args[1]);
    setButtonSearchDisabled(false);
  }

  async function showMorePokemons() {
    const newOffset = offset + 20;
    const newCurrentLimit = currentLimit + 20;

    setOffset(newOffset);
    setCurrentLimit(newCurrentLimit);

    if(limitOfAllPokemons > 10){
      handleDisplayMorePokemons(limitOfAllPokemons + 1, limitOfAllPokemons + 20, newCurrentLimit);
      return;
    }

    handleDisplayMorePokemons(newOffset, newCurrentLimit)
  }

  function handleSearchPokemon(e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      try {
        const response = await api.get(`${e.target.value.toLowerCase()}`);
        setPokemon(response.data);
        setError("");
      } catch (e) {
        setError("This pokemon not found");
      }
    }, 500);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.searchPokemon}>
          <input
            placeholder="pokemon"
            onChange={handleSearchPokemon}
          />
          {error && (<p className={"error"}>{error}</p>)}
        </div>
        {!pokemon?.name ? (
          <>
            <div className={styles.content}>
              {allPokemons.map((pokemon) => (
                <Card
                  pokemon={pokemon}
                  key={pokemon.id}
                />
              ))}
            </div>
            <button
              disabled={buttonSearchDisabled}
              className={styles.seeMore}
              onClick={showMorePokemons}
            >
              Ver Mais
            </button>
          </>
        ) : (
          <Card pokemon={pokemon} />
        )}
      </div>
    </>
  )
}