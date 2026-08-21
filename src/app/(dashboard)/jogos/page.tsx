"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Trash2,
  Pencil,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewGameDialog } from "@/components/jogos/NewGameDialog";
import { useGames } from "@/context/GamesContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Game {
  id: string;
  date: string;
  time: string;
  field: string;
  team: string;
  opponent: string;
  status: string;
}

interface Team {
  id: string;
  name: string;
  shieldUrl?: string | null;
}

type StatusFilter =
  | "todos"
  | "proximos"
  | "encerrados";

export default function JogosPage() {
  const {
    games,
    addGame,
    removeGame,
    updateGame,
  } = useGames();

  const [teams, setTeams] =
    useState<string[]>([]);

  const [teamData, setTeamData] =
    useState<Team[]>([]);

  const [editingGame, setEditingGame] =
    useState<Game | null>(null);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedTeam, setSelectedTeam] =
    useState("todos");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("todos");

  const [currentTime, setCurrentTime] =
    useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response =
          await fetch("/api/teams");

        if (!response.ok) {
          throw new Error(
            "Erro ao carregar times."
          );
        }

        const data: Team[] =
          await response.json();

        // Guarda os times completos
        // para termos acesso aos escudos
        setTeamData(data);

        // Mantém a lista de nomes
        // usada pelos filtros e pelo NewGameDialog
        setTeams(
          data.map(
            (team) => team.name
          )
        );
      } catch (error) {
        console.error(
          "Erro ao carregar times:",
          error
        );
      }
    }

    loadTeams();
  }, []);

  function getTeamShield(
    teamName: string
  ) {
    const team = teamData.find(
      (item) =>
        item.name.toLowerCase() ===
        teamName.toLowerCase()
    );

    return team?.shieldUrl || null;
  }

  function isGameFinished(game: Game) {
    const gameDate = new Date(
      `${game.date}T${game.time}`
    );

    return gameDate < currentTime;
  }

  function getDisplayStatus(game: Game) {
    if (isGameFinished(game)) {
      return "Encerrado";
    }

    return game.status;
  }

  const filteredGames = games
    .filter((game) => {
      if (selectedTeam === "todos") {
        return true;
      }

      return (
        game.team === selectedTeam ||
        game.opponent === selectedTeam
      );
    })
    .filter((game) => {
      const finished =
        isGameFinished(game);

      if (statusFilter === "encerrados") {
        return finished;
      }

      if (statusFilter === "proximos") {
        return !finished;
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(
        `${a.date}T${a.time}`
      );

      const dateB = new Date(
        `${b.date}T${b.time}`
      );

      return (
        dateA.getTime() -
        dateB.getTime()
      );
    });

  function formatGameDate(date: string) {
    const formatted = new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    return (
      formatted.charAt(0).toUpperCase() +
      formatted.slice(1)
    );
  }

  return (
    <div className="space-y-10">

      {/* CABEÇALHO */}

      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-slate-100
            "
          >
            Jogos agendados
          </h1>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-relaxed
              text-slate-400
            "
          >
            Organize seus jogos, horários e adversários.
          </p>
        </div>

        <div
          className="
            shrink-0
            self-start
            lg:self-auto
          "
        >
          <NewGameDialog
            teams={teams}
            games={games}
            onCreate={addGame}
          />
        </div>
      </div>

      {/* FILTROS */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >

          {/* FILTRO DE STATUS */}

          <div
            className="
              flex
              items-center
              rounded-2xl
              border
              border-white/10
              bg-white/[0.035]
              p-1
              shadow-sm
              backdrop-blur-xl
            "
          >
            <button
              type="button"
              onClick={() =>
                setStatusFilter("todos")
              }
              className={`
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                ${
                  statusFilter === "todos"
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              Todos
            </button>

            <button
              type="button"
              onClick={() =>
                setStatusFilter("proximos")
              }
              className={`
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                ${
                  statusFilter === "proximos"
                    ? "bg-emerald-400/10 text-emerald-300 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              Próximos
            </button>

            <button
              type="button"
              onClick={() =>
                setStatusFilter("encerrados")
              }
              className={`
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                ${
                  statusFilter === "encerrados"
                    ? "bg-white/[0.08] text-slate-200 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              Encerrados
            </button>
          </div>

          {/* FILTRO DE TIMES */}

          <Select
            value={selectedTeam}
            onValueChange={(value) =>
              setSelectedTeam(
                value ?? "todos"
              )
            }
          >
            <SelectTrigger
              className="
                h-11
                w-64
                rounded-2xl
                border-white/10
                bg-white/[0.035]
                text-white
                shadow-sm
                backdrop-blur-xl
                transition
                hover:bg-white/[0.07]
              "
            >
              <SelectValue
                placeholder="Todos os times"
              />
            </SelectTrigger>

            <SelectContent
              className="
                rounded-2xl
                border-white/10
                bg-slate-900
                text-white
              "
            >
              <SelectItem value="todos">
                Todos os times
              </SelectItem>

              {teams.map((team) => (
                <SelectItem
                  key={team}
                  value={team}
                >
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CONTADOR */}

        <p
          className="
            text-sm
            font-medium
            text-slate-400
          "
        >
          {filteredGames.length} jogo
          {filteredGames.length !== 1
            ? "s"
            : ""}{" "}
          encontrado
          {filteredGames.length !== 1
            ? "s"
            : ""}
        </p>
      </div>

      {/* GRID DE JOGOS */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {filteredGames.length === 0 ? (

          <Card
            className="
              rounded-2xl
              border-white/10
              bg-white/[0.045]
              shadow-sm
              backdrop-blur-xl
            "
          >
            <CardContent
              className="
                p-10
                text-center
                text-slate-400
              "
            >
              {statusFilter === "encerrados"
                ? "Nenhum jogo encerrado."
                : statusFilter === "proximos"
                  ? "Nenhum jogo próximo."
                  : "Nenhum jogo encontrado para este time."}
            </CardContent>
          </Card>

        ) : (

          filteredGames.map((game) => {

            const finished =
              isGameFinished(game);

            const displayStatus =
              getDisplayStatus(game);

            const teamShield =
              getTeamShield(
                game.team
              );

            const opponentShield =
              getTeamShield(
                game.opponent
              );

            return (
              <Card
                key={game.id}
                className={`
                  group
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.045]
                  shadow-lg
                  shadow-black/10
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/15
                  hover:bg-white/[0.07]
                  hover:shadow-2xl
                  hover:shadow-black/20
                  ${
                    finished
                      ? "opacity-80"
                      : ""
                  }
                `}
              >

                {/* CABEÇALHO DO CARD */}

                <CardHeader
                  className="
                    p-6
                    pb-4
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    {/* TIMES + ESCUDOS */}

                    <div
                      className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        justify-center
                        gap-4
                      "
                    >

                      {/* TIME DA CASA */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-1
                          flex-col
                          items-center
                          gap-2
                          text-center
                        "
                      >
                        <div
                          className="
                            flex
                            h-16
                            items-center
                            justify-center
                          "
                        >
                          {teamShield ? (
                            <img
                              src={teamShield}
                              alt={`Escudo do ${game.team}`}
                              className="
                                max-h-16
                                max-w-16
                                w-auto
                                object-contain
                                drop-shadow-lg
                                transition-transform
                                duration-300
                                group-hover:scale-105
                              "
                            />
                          ) : (
                            <span
                              className="
                                text-3xl
                                opacity-30
                              "
                            >
                              ⚽
                            </span>
                          )}
                        </div>

                        <span
                          className="
                            max-w-full
                            truncate
                            text-sm
                            font-semibold
                            text-slate-100
                          "
                        >
                          {game.team}
                        </span>
                      </div>

                      {/* X */}

                      <span
                        className="
                          shrink-0
                          text-lg
                          font-bold
                          text-emerald-400
                        "
                      >
                        ×
                      </span>

                      {/* ADVERSÁRIO */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-1
                          flex-col
                          items-center
                          gap-2
                          text-center
                        "
                      >
                        <div
                          className="
                            flex
                            h-16
                            items-center
                            justify-center
                          "
                        >
                          {opponentShield ? (
                            <img
                              src={opponentShield}
                              alt={`Escudo do ${game.opponent}`}
                              className="
                                max-h-16
                                max-w-16
                                w-auto
                                object-contain
                                drop-shadow-lg
                                transition-transform
                                duration-300
                                group-hover:scale-105
                              "
                            />
                          ) : (
                            <span
                              className="
                                text-3xl
                                opacity-30
                              "
                            >
                              ⚽
                            </span>
                          )}
                        </div>

                        <span
                          className="
                            max-w-full
                            truncate
                            text-sm
                            font-semibold
                            text-slate-100
                          "
                        >
                          {game.opponent}
                        </span>
                      </div>

                    </div>

                    {/* STATUS */}

                    <Badge
                      className={`
                        shrink-0
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-medium
                        shadow-none
                        ${
                          finished
                            ? `
                              border-white/10
                              bg-white/[0.06]
                              text-slate-400
                            `
                            : `
                              border-emerald-400/20
                              bg-emerald-400/10
                              text-emerald-300
                            `
                        }
                      `}
                    >
                      {displayStatus}
                    </Badge>

                  </div>
                </CardHeader>

                {/* INFORMAÇÕES */}

                <CardContent
                  className="
                    space-y-4
                    px-6
                    pb-6
                    text-sm
                  "
                >

                  {/* DATA */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-slate-400
                    "
                  >
                    <CalendarDays
                      size={17}
                      className="
                        shrink-0
                        text-slate-500
                      "
                    />

                    <span>
                      {formatGameDate(
                        game.date
                      )}
                    </span>
                  </div>

                  {/* HORÁRIO */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-slate-400
                    "
                  >
                    <Clock3
                      size={17}
                      className="
                        shrink-0
                        text-slate-500
                      "
                    />

                    <span>
                      {game.time}
                    </span>
                  </div>

                  {/* LOCAL */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-slate-400
                    "
                  >
                    <MapPin
                      size={17}
                      className="
                        shrink-0
                        text-slate-500
                      "
                    />

                    <span className="truncate">
                      {game.field}
                    </span>
                  </div>

                  {/* TIME */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-slate-400
                    "
                  >
                    <UserRound
                      size={17}
                      className="
                        shrink-0
                        text-slate-500
                      "
                    />

                    <span>
                      {game.team}
                    </span>
                  </div>

                  {/* AÇÕES */}

                  <div
                    className="
                      flex
                      items-center
                      justify-end
                      gap-2
                      border-t
                      border-white/10
                      pt-5
                    "
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Editar jogo"
                      onClick={() => {
                        setEditingGame(game);
                        setOpenEdit(true);
                      }}
                      className="
                        h-9
                        w-9
                        rounded-full
                        text-slate-400
                        transition
                        hover:bg-white/10
                        hover:text-white
                      "
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      title="Excluir jogo"
                      onClick={() =>
                        removeGame(game.id)
                      }
                      className="
                        h-9
                        w-9
                        rounded-full
                        text-slate-400
                        transition
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* EDIÇÃO */}

      {editingGame && (
        <NewGameDialog
          teams={teams}
          games={games}
          onCreate={addGame}
          onUpdate={async (id, game) => {
            await updateGame(id, game);

            setEditingGame(null);
            setOpenEdit(false);
          }}
          editingGame={editingGame}
          open={openEdit}
          onOpenChange={(open) => {
            setOpenEdit(open);

            if (!open) {
              setEditingGame(null);
            }
          }}
          showTrigger={false}
        />
      )}

    </div>
  );
}