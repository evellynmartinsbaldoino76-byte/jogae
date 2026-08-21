"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface Team {
  id: string;
  name: string;
  shieldUrl?: string | null;
  createdAt?: string;
}

interface TeamsContextData {
  teams: Team[];

  addTeam: (
    name: string,
    shieldUrl?: string
  ) => Promise<boolean>;

  removeTeam: (
    id: string
  ) => Promise<void>;

  updateTeam: (
    id: string,
    team: Team
  ) => Promise<void>;
}

const TeamsContext =
  createContext<TeamsContextData | null>(null);

export function TeamsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [teams, setTeams] =
    useState<Team[]>([]);

  async function loadTeams() {
    try {
      const response = await fetch(
        "/api/teams"
      );

      if (!response.ok) {
        throw new Error(
          "Erro ao carregar times."
        );
      }

      const data =
        await response.json();

      setTeams(data);
    } catch (error) {
      console.error(
        "Erro ao carregar times:",
        error
      );
    }
  }

  useEffect(() => {
    loadTeams();
  }, []);

  async function addTeam(
    name: string,
    shieldUrl?: string
  ): Promise<boolean> {
    try {
      const response =
        await fetch(
          "/api/teams",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              shieldUrl:
                shieldUrl || null,
            }),
          }
        );

      if (!response.ok) {
        return false;
      }

      const team =
        await response.json();

      setTeams((current) => [
        ...current,
        team,
      ]);

      return true;
    } catch (error) {
      console.error(
        "Erro ao criar time:",
        error
      );

      return false;
    }
  }

  async function removeTeam(
    id: string
  ): Promise<void> {
    try {
      const response =
        await fetch(
          `/api/teams/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Erro ao excluir time."
        );
      }

      setTeams((current) =>
        current.filter(
          (team) =>
            team.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Erro ao excluir time:",
        error
      );
    }
  }

  async function updateTeam(
    id: string,
    team: Team
  ): Promise<void> {
    try {
      const response =
        await fetch(
          `/api/teams/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: team.id,
              name: team.name,
              shieldUrl:
                team.shieldUrl || null,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Erro ao atualizar time."
        );
      }

      const updatedTeam =
        await response.json();

      setTeams((current) =>
        current.map(
          (item) =>
            item.id === id
              ? updatedTeam
              : item
        )
      );
    } catch (error) {
      console.error(
        "Erro ao atualizar time:",
        error
      );
    }
  }

  return (
    <TeamsContext.Provider
      value={{
        teams,
        addTeam,
        updateTeam,
        removeTeam,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}

export function useTeams() {
  const context =
    useContext(TeamsContext);

  if (!context) {
    throw new Error(
      "useTeams deve ser usado dentro de TeamsProvider."
    );
  }

  return context;
}