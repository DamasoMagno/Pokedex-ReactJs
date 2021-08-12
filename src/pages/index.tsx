import { ChangeEvent, useState, useEffect, useContext } from "react";

import { Card } from "../components/CardPokemon";
import { Header } from '../components/Header';
import { api } from "../services/api";
import { offsetContext } from "../context/currentOffset";

import styles from "../styles/pages/Home.module.css";

import { Pokemon } from "../interfaces/pokemon";

export default function Home() {
  const { allCurrentPokemons, setAllCurrentPokemons, setCurrentOffset, currentOffset } = useContext(offsetContext);

  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon>();

  const [buttonSearchDisabled, setButtonSearchDisabled] = useState(false);
  const [error, setError] = useState("");

  const initalOffset = 1;
  let timer = null;

  useEffect(() => {
    renderPokemons(initalOffset, allCurrentPokemons);
  }, []);

  async function renderPokemons(currentOffset: number, currentLimit: number) {
    while (currentOffset <= currentLimit) {
      const pokemon = await api.get<Pokemon>(`${currentOffset}`)
      setAllPokemons(pokemons => [...pokemons, pokemon.data])
      currentOffset++;
    }
  }

  async function showMorePokemons() {
    const newCurrentOffset = currentOffset + 20;
    const newLimitOfAllPokemons = allCurrentPokemons + 20;

    setCurrentOffset(newCurrentOffset);
    setAllCurrentPokemons(newLimitOfAllPokemons);

    setButtonSearchDisabled(true);
    await renderPokemons(newCurrentOffset, newLimitOfAllPokemons);
    setButtonSearchDisabled(false);
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