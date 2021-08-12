import Link from "next/link";
import styles from "../styles/pages/Card.module.css";

import { Pokemon } from "../interfaces/pokemon";
interface CardPokemonProps {
  pokemon: Pokemon;
}

export function Card({ pokemon }: CardPokemonProps) {
  return (
    <Link href={`${pokemon.id}`}>
      <div className={styles.container}>
        <strong>PC {pokemon.base_experience}</strong>
        <img src={pokemon.sprites.front_default} />
        <strong>{pokemon.name}</strong>

        <div className={styles.types}>
          {pokemon.types.map(({ type }) => (
            <span
              style={{ background: `var(--${type.name})` }}
              key={type.url}
            >
              {type.name}
            </span>
          ))}
        </div>

        <div className={styles.position}>
          <small>#{pokemon.id}</small>
        </div>
      </div>
    </Link>
  );
}