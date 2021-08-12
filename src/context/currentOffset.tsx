import { createContext, ReactNode, useState } from "react";

interface offsetContext {
  limitOfAllPokemons: number;
  setLimitOfAllPokemons: (number: number) => void;
}

interface AppContextProps {
  children: ReactNode;
}

export const offsetContext = createContext({} as offsetContext);

export function AppContext({children}: AppContextProps){
  const [limitOfAllPokemons,  setLimitOfAllPokemons] = useState(1);

  return (
    <offsetContext.Provider value={{limitOfAllPokemons, setLimitOfAllPokemons}}>
      { children }
    </offsetContext.Provider>
  );
}