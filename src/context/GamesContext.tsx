"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface Game {
  id: string;
  date: string;
  time: string;
  field: string;
  team: string;
  opponent: string;
  status: string;
}

interface GamesContextData {
  games: Game[];
  addGame: (game: Game) => void;
  updateGame: (id: string, game: Game) => void;
  removeGame: (id: string) => void;
}

const GamesContext = createContext<GamesContextData | null>(null);

export function GamesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [games, setGames] = useState<Game[]>([]);

  function addGame(game: Game) {
    setGames((current) => [...current, game]);
  }

  function updateGame(id: string, updatedGame: Game) {
    setGames((current) =>
      current.map((game) =>
        game.id === id ? updatedGame : game
      )
    );
  }

  function removeGame(id: string) {
    setGames((current) =>
      current.filter((game) => game.id !== id)
    );
  }

  return (
    <GamesContext.Provider
      value={{
        games,
        addGame,
        updateGame,
        removeGame,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error(
      "useGames deve ser usado dentro de GamesProvider."
    );
  }

  return context;
}