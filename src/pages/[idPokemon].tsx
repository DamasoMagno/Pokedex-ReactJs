import { GetServerSideProps } from "next";

import { api } from "../services/api";
import { Header } from "../components/Header";

import styles from "../styles/pages/Pokemon.module.css";

import { Pokemon as PokemonProps } from "../interfaces/pokemon";
interface PokemonsProps {
  pokemon: PokemonProps;
}

export default function Pokemon({ pokemon }: PokemonsProps) {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.pokemonAbout}>
          <strong>CP {pokemon.base_experience}</strong>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <strong>{pokemon.name}</strong>
        </div>

        <div className={styles.allInformations}>
          {pokemon.abilities.map(({ ability }) => (
            <p key={ability.url}>{ability.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { idPokemon } = params;

  const { data: pokemon } = await api.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);

  return {
    props: {
      pokemon
    }
  }
}