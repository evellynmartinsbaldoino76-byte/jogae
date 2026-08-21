"use client";

import {
  createContext,
  useContext,
  useEffect,
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

  teamScore?: number | null;

  opponentScore?: number | null;
}

interface GamesContextData {
  games: Game[];

  addGame: (game: Game) => Promise<void>;

  updateGame: (
    id: string,
    game: Game
  ) => Promise<void>;

  removeGame: (
    id: string
  ) => Promise<void>;
}

const GamesContext =
  createContext<GamesContextData | null>(null);

export function GamesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [games, setGames] =
    useState<Game[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadGames() {
    try {
      const response =
        await fetch("/api/games");

      if (!response.ok) {
        throw new Error(
          "Erro ao carregar jogos."
        );
      }

      const data =
        await response.json();

      console.log(
        "GAMES RECEBIDOS:",
        data
      );

      setGames(data);
    } catch (error) {
      console.error(
        "Erro ao carregar jogos:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames();
  }, []);

  async function addGame(game: Game) {
    const response =
      await fetch("/api/games", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          ...game,

          teamScore:
            game.teamScore ?? null,

          opponentScore:
            game.opponentScore ?? null,
        }),
      });

    if (!response.ok) {
      throw new Error(
        "Erro ao criar jogo."
      );
    }

    const newGame =
      await response.json();

    setGames((current) => [
      ...current,
      newGame,
    ]);
  }

  async function updateGame(
    id: string,
    updatedGame: Game
  ) {
    const response =
      await fetch("/api/games", {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          ...updatedGame,

          id,

          teamScore:
            updatedGame.teamScore ??
            null,

          opponentScore:
            updatedGame.opponentScore ??
            null,
        }),
      });

    if (!response.ok) {
      throw new Error(
        "Erro ao atualizar jogo."
      );
    }

    const game =
      await response.json();

    setGames((current) =>
      current.map((item) =>
        item.id === id
          ? game
          : item
      )
    );
  }

  async function removeGame(
    id: string
  ) {
    const response =
      await fetch("/api/games", {
        method: "DELETE",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
        }),
      });

    if (!response.ok) {
      throw new Error(
        "Erro ao excluir jogo."
      );
    }

    setGames((current) =>
      current.filter(
        (game) =>
          game.id !== id
      )
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
  const context =
    useContext(GamesContext);

  if (!context) {
    throw new Error(
      "useGames deve ser usado dentro de GamesProvider."
    );
  }

  return context;
}