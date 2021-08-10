import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Rings } from "react-loading-icons";

import { Pokemon } from "../interfaces";

import { api } from "../services/api";

import styles from "../styles/pages/Pokemon.module.css";

export default function Pokemon() {
  const router = useRouter();
  const { idPokemon } = router.query;
  
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    
    api.get<Pokemon>(`${idPokemon}`)
      .then(pokemon => setPokemon(pokemon.data));
  }, []);

  return (
    <div>
      <Header />
      { pokemon ? (
        <>
          <div className={styles.container}>
            <div className={styles.pokemonAbout}>
              <strong>CP {pokemon.base_experience}</strong>
              <img src={pokemon.sprites.front_default} alt="" />
              <strong>{pokemon.name}</strong>
            </div>
            <div className={styles.allInformations}>
              {pokemon.abilities.map(({ability}) => (
                console.log(ability),
                <p key={ability.url}>{ability.name}</p>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Rings stroke="#000" fontSize={50} color="#FFF" />
      )}
    </div>
  );
}