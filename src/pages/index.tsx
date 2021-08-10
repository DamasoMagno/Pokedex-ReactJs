import React, { ChangeEvent, FormEvent, useState } from "react";
import { useEffect } from "react";
import { Card } from "../components/CardPokemon";
import { Header } from '../components/Header';

import { api } from "../services/api";

import styles from "../styles/pages/Home.module.css";

import { Pokemon } from "../interfaces";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState({});
  const [offset, setOffset] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(20);
  let timer = null;

  useEffect(() => {
    renderPokemons(offset, currentLimit);
  }, []);

  async function renderPokemons(offset, currentLimit) {
    for (let currentPosition = offset; currentPosition <= currentLimit; currentPosition++) {
      const pokemon = await api.get<Pokemon>(`${currentPosition}`)
      setAllPokemons(pokemons => [...pokemons, pokemon.data])
    }
  }

  async function showMorePokemons() {
    const newOffset = offset + 20;
    const newCurrentLimit = currentLimit + 20;
    
    setOffset(newOffset);
    setCurrentLimit(newCurrentLimit);
    
    renderPokemons(newOffset, newCurrentLimit);
  }
  

  function handleSearchPokemon(e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      try {
        const pokemon = await api.get(`${e.target.value}`);
        setPokemon(pokemon.data);
      } catch (error) {
        console.log(error.message);
      }
    }, 1000);

    console.log(pokemon);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.searchPokemon}>
          <input placeholder="pokemon" onChange={handleSearchPokemon} />
        </div>
        <div className={styles.content}>
          {allPokemons.map((pokemon) => {
            return <Card pokemon={pokemon} key={pokemon.id} />
          })}
        </div>
      <button className={styles.seeMore} onClick={showMorePokemons}>Ver Mais</button>
      </div>
    </>
  )
}