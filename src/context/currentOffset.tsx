import { createContext, ReactNode, useState } from "react";

interface offsetContext {
  allCurrentPokemons: number;
  currentOffset: number;
  setAllCurrentPokemons: (number: number) => void;
  setCurrentOffset: (number: number) => void;
}

interface AppContextProps {
  children: ReactNode;
}

export const offsetContext = createContext({} as offsetContext);

export function AppContext({children}: AppContextProps){
  const [ allCurrentPokemons,  setAllCurrentPokemons ] = useState(20);
  const [ currentOffset, setCurrentOffset ] = useState(1);

  return (
    <offsetContext.Provider value={{allCurrentPokemons, setAllCurrentPokemons, currentOffset, setCurrentOffset}}>
      { children }
    </offsetContext.Provider>
  );
}