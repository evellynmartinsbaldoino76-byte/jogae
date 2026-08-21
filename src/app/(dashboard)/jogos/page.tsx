"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Trash2,
  Pencil,
  Trophy,
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
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { NewGameDialog } from "@/components/jogos/NewGameDialog";
import { useGames, Game } from "@/context/GamesContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [scoreGame, setScoreGame] =
    useState<Game | null>(null);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [openScore, setOpenScore] =
    useState(false);

  const [teamScore, setTeamScore] =
    useState("");

  const [opponentScore, setOpponentScore] =
    useState("");

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

        setTeamData(data);

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

  function getResult(
    game: Game
  ) {
    if (
      game.teamScore === null ||
      game.teamScore === undefined ||
      game.opponentScore === null ||
      game.opponentScore === undefined
    ) {
      return null;
    }

    if (
      game.teamScore >
      game.opponentScore
    ) {
      return "Vitória";
    }

    if (
      game.teamScore <
      game.opponentScore
    ) {
      return "Derrota";
    }

    return "Empate";
  }

  function getResultClasses(
    game: Game
  ) {
    const result = getResult(game);

    if (result === "Vitória") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    }

    if (result === "Derrota") {
      return "border-red-400/20 bg-red-400/10 text-red-300";
    }

    if (result === "Empate") {
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    }

    return "border-white/10 bg-white/[0.05] text-slate-400";
  }

  function openScoreDialog(
    game: Game
  ) {
    setScoreGame(game);

    setTeamScore(
      game.teamScore !== null &&
        game.teamScore !== undefined
        ? String(game.teamScore)
        : ""
    );

    setOpponentScore(
      game.opponentScore !== null &&
        game.opponentScore !== undefined
        ? String(game.opponentScore)
        : ""
    );

    setOpenScore(true);
  }

  async function saveScore() {
    if (!scoreGame) {
      return;
    }

    if (
      teamScore === "" ||
      opponentScore === ""
    ) {
      return;
    }

    const parsedTeamScore =
      Number(teamScore);

    const parsedOpponentScore =
      Number(opponentScore);

    if (
      Number.isNaN(parsedTeamScore) ||
      Number.isNaN(parsedOpponentScore) ||
      parsedTeamScore < 0 ||
      parsedOpponentScore < 0
    ) {
      return;
    }

    await updateGame(
      scoreGame.id,
      {
        ...scoreGame,
        teamScore:
          parsedTeamScore,
        opponentScore:
          parsedOpponentScore,
      }
    );

    setOpenScore(false);
    setScoreGame(null);
    setTeamScore("");
    setOpponentScore("");
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

      if (
        statusFilter === "encerrados"
      ) {
        return finished;
      }

      if (
        statusFilter === "proximos"
      ) {
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

  function formatGameDate(
    date: string
  ) {
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

            const result =
              getResult(game);

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
                      ? "opacity-90"
                      : ""
                  }
                `}
              >

                {/* CABEÇALHO */}

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

                    {/* TIMES */}

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

                      {/* TIME */}

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

                      {/* PLACAR / X */}

                      <div
                        className="
                          flex
                          shrink-0
                          flex-col
                          items-center
                          justify-center
                        "
                      >
                        {finished &&
                        game.teamScore !== null &&
                        game.teamScore !== undefined &&
                        game.opponentScore !== null &&
                        game.opponentScore !== undefined ? (
                          <div
                            className="
                              flex
                              flex-col
                              items-center
                              gap-1
                            "
                          >
                            <div
                              className="
                                text-3xl
                                font-black
                                tracking-tight
                                text-white
                              "
                            >
                              {game.teamScore}
                              <span
                                className="
                                  mx-1.5
                                  text-lg
                                  font-medium
                                  text-slate-500
                                "
                              >
                                ×
                              </span>
                              {game.opponentScore}
                            </div>

                            {result && (
                              <span
                                className={`
                                  rounded-full
                                  border
                                  px-2.5
                                  py-0.5
                                  text-[10px]
                                  font-semibold
                                  ${getResultClasses(game)}
                                `}
                              >
                                {result}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span
                            className="
                              text-lg
                              font-bold
                              text-emerald-400
                            "
                          >
                            ×
                          </span>
                        )}
                      </div>

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

                  {/* RESULTADO */}

                  {finished && (
                    <div
                      className="
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-4
                      "
                    >
                      {result ? (
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >
                            <Trophy
                              size={17}
                              className="
                                text-emerald-400
                              "
                            />

                            <span
                              className="
                                text-sm
                                font-medium
                                text-slate-300
                              "
                            >
                              Resultado
                            </span>
                          </div>

                          <span
                            className={`
                              rounded-full
                              border
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              ${getResultClasses(game)}
                            `}
                          >
                            {result}
                          </span>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          onClick={() =>
                            openScoreDialog(
                              game
                            )
                          }
                          className="
                            h-10
                            w-full
                            rounded-xl
                            bg-emerald-500
                            font-semibold
                            text-slate-950
                            transition
                            hover:bg-emerald-400
                          "
                        >
                          Adicionar resultado
                        </Button>
                      )}

                      {result && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            openScoreDialog(
                              game
                            )
                          }
                          className="
                            mt-2
                            h-9
                            w-full
                            rounded-xl
                            text-xs
                            text-slate-400
                            hover:bg-white/5
                            hover:text-white
                          "
                        >
                          Editar placar
                        </Button>
                      )}
                    </div>
                  )}

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

      {/* EDIÇÃO DO JOGO */}

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

      {/* DIALOG DE PLACAR */}

      <Dialog
        open={openScore}
        onOpenChange={(open) => {
          setOpenScore(open);

          if (!open) {
            setScoreGame(null);
            setTeamScore("");
            setOpponentScore("");
          }
        }}
      >
        <DialogContent
          className="
            rounded-2xl
            border-white/10
            bg-slate-950
            text-white
            shadow-2xl
          "
        >
          <DialogHeader>
            <DialogTitle
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Registrar resultado
            </DialogTitle>
          </DialogHeader>

          {scoreGame && (
            <div className="space-y-6">

              {/* TIMES */}

              <div
                className="
                  grid
                  grid-cols-[1fr_auto_1fr]
                  items-center
                  gap-4
                "
              >

                {/* SEU TIME */}

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-3
                    text-center
                  "
                >
                  {getTeamShield(
                    scoreGame.team
                  ) ? (
                    <img
                      src={
                        getTeamShield(
                          scoreGame.team
                        ) || ""
                      }
                      alt={`Escudo do ${scoreGame.team}`}
                      className="
                        h-16
                        w-16
                        object-contain
                      "
                    />
                  ) : (
                    <span className="text-3xl">
                      ⚽
                    </span>
                  )}

                  <span
                    className="
                      max-w-full
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {scoreGame.team}
                  </span>

                  <Input
                    type="number"
                    min="0"
                    value={teamScore}
                    onChange={(e) =>
                      setTeamScore(
                        e.target.value
                      )
                    }
                    className="
                      h-14
                      rounded-xl
                      border-white/10
                      bg-white/5
                      text-center
                      text-2xl
                      font-bold
                      text-white
                    "
                  />
                </div>

                {/* X */}

                <span
                  className="
                    text-xl
                    font-bold
                    text-slate-500
                  "
                >
                  ×
                </span>

                {/* ADVERSÁRIO */}

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-3
                    text-center
                  "
                >
                  {getTeamShield(
                    scoreGame.opponent
                  ) ? (
                    <img
                      src={
                        getTeamShield(
                          scoreGame.opponent
                        ) || ""
                      }
                      alt={`Escudo do ${scoreGame.opponent}`}
                      className="
                        h-16
                        w-16
                        object-contain
                      "
                    />
                  ) : (
                    <span className="text-3xl">
                      ⚽
                    </span>
                  )}

                  <span
                    className="
                      max-w-full
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {scoreGame.opponent}
                  </span>

                  <Input
                    type="number"
                    min="0"
                    value={opponentScore}
                    onChange={(e) =>
                      setOpponentScore(
                        e.target.value
                      )
                    }
                    className="
                      h-14
                      rounded-xl
                      border-white/10
                      bg-white/5
                      text-center
                      text-2xl
                      font-bold
                      text-white
                    "
                  />
                </div>
              </div>

              {/* BOTÃO */}

              <Button
                type="button"
                onClick={saveScore}
                className="
                  h-11
                  w-full
                  rounded-xl
                  bg-emerald-500
                  font-semibold
                  text-slate-950
                  transition
                  hover:bg-emerald-400
                "
              >
                Salvar resultado
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}