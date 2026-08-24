"use client";

import {
  CalendarDays,
  MapPin,
  Plus,
  Users,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useGames } from "@/context/GamesContext";
import { useTeams } from "@/context/TeamsContext";

export default function DashboardPage() {
  const router = useRouter();

  const { games } = useGames();
  const { teams } = useTeams();

  const teamsCount = teams.length;

  const now = new Date();

  const futureGames = [...games]
    .filter((game) => {
      const gameDate = new Date(
        `${game.date}T${game.time}`
      );

      return gameDate >= now;
    })
    .sort((a, b) => {
      const dataA = new Date(
        `${a.date}T${a.time}`
      );

      const dataB = new Date(
        `${b.date}T${b.time}`
      );

      return (
        dataA.getTime() -
        dataB.getTime()
      );
    });

  const nextGames =
    futureGames.length > 0
      ? futureGames.filter(
          (game) =>
            game.date === futureGames[0].date
        )
      : [];

  function formatDate(date: string) {
    const formatted =
      new Date(
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

  /*
   * ======================================================
   * BUSCAR ESCUDO DO TIME
   * ======================================================
   */

  function getTeamShield(
    teamName: string
  ) {
    const normalizedName =
      teamName
        .trim()
        .toLowerCase();

    const team = teams.find(
      (item) =>
        item.name
          .trim()
          .toLowerCase() ===
        normalizedName
    );

    return team?.shieldUrl ?? null;
  }

  function novoJogo() {
    router.push("/jogos");
  }

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#071b1a]
        via-[#091522]
        to-[#10142d]
        px-4
        pb-12
        pt-6
        sm:px-6
        lg:px-10
        lg:pt-10
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          space-y-7
        "
      >
        {/* ================================================== */}
        {/* CABEÇALHO */}
        {/* ================================================== */}

        <section
          className="
            relative
            overflow-hidden
            flex
            flex-col
            gap-6
            rounded-3xl
            border
            border-emerald-400/15
            bg-gradient-to-br
            from-emerald-500/15
            via-[#0b1c25]
            to-[#0d1126]
            px-6
            py-8
            shadow-[0_18px_60px_rgba(0,0,0,0.26)]
            sm:px-9
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative">
            <p
              className="
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-emerald-400
              "
            >
              Visão geral
            </p>

            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
                text-white
                md:text-5xl
              "
            >
              Olá, organizador.
            </h1>

            <p
              className="
                mt-3
                max-w-xl
                text-base
                leading-relaxed
                text-slate-300
              "
            >
              Acompanhe seus jogos, times e próximas partidas em um único lugar.
            </p>
          </div>

          <Button
            size="lg"
            onClick={novoJogo}
            className="relative
              group
              w-full
              rounded-xl
              bg-emerald-500
              font-bold
              text-black
              shadow-lg
              shadow-emerald-500/10
              transition-all
              hover:-translate-y-0.5
              hover:bg-emerald-400
              lg:w-auto
            "
          >
            <Plus
              size={20}
              className="
                mr-2
                transition-transform
                group-hover:rotate-90
              "
            />

            Agendar novo jogo
          </Button>
        </section>

        {/* ================================================== */}
        {/* CARDS */}
        {/* ================================================== */}

        <div
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >
          {/* JOGOS */}

          <Card
            onClick={() =>
              router.push("/jogos")
            }
            className="
              cursor-pointer
              border-white/10
              bg-[#0a1720]/90
              text-white
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
              transition-all
              hover:-translate-y-1
              hover:border-emerald-400/35
            "
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-300">
                Jogos
              </CardTitle>
              <div className="rounded-xl bg-emerald-400/10 p-2.5 text-emerald-300"><CalendarDays size={19} /></div>
            </CardHeader>

            <CardContent>
              <p
                className="
                  text-5xl
                  font-black
                "
              >
                {games.length}
              </p>

              <p className="mt-3 text-slate-400">
                Jogos cadastrados
              </p>
            </CardContent>
          </Card>

          {/* TIMES */}

          <Card
            onClick={() =>
              router.push("/times")
            }
            className="
              cursor-pointer
              border-white/10
              bg-[#0a1720]/90
              text-white
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
              transition-all
              hover:-translate-y-1
              hover:border-sky-400/35
            "
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-300">
                Meus times
              </CardTitle>
              <div className="rounded-xl bg-sky-400/10 p-2.5 text-sky-300"><Users size={19} /></div>
            </CardHeader>

            <CardContent>
              <p
                className="
                  text-5xl
                  font-black
                "
              >
                {teamsCount}
              </p>

              <p className="mt-3 text-slate-400">
                Times cadastrados
              </p>
            </CardContent>
          </Card>

          {/* LOCAL */}

          <Card
            className="
              border-white/10
              bg-[#0a1720]/90
              text-white
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
            "
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-300">
                Local principal
              </CardTitle>
              <div className="rounded-xl bg-violet-400/10 p-2.5 text-violet-300"><MapPin size={19} /></div>
            </CardHeader>

            <CardContent>
              <p className="text-xl font-bold">
                Associação da Polícia
              </p>

              <p className="mt-3 text-slate-400">
                Campo fixo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ================================================== */}
        {/* PRÓXIMOS JOGOS */}
        {/* ================================================== */}

        <Card
          className="
            rounded-3xl
            border-white/10
            bg-[#0a1720]/90
            text-white
            shadow-[0_16px_45px_rgba(0,0,0,0.20)]
          "
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-400">Agenda</p>
              <CardTitle className="mt-1 text-2xl">
                Próximas Partidas
              </CardTitle>
            </div>
            <Button variant="ghost" onClick={() => router.push("/jogos")} className="rounded-xl text-slate-300 hover:bg-white/5 hover:text-emerald-300">Ver jogos</Button>
          </CardHeader>

          <CardContent>
            {nextGames.length > 0 ? (
              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >
                {nextGames.map((game) => {
                  const teamShield =
                    getTeamShield(
                      game.team
                    );

                  const opponentShield =
                    getTeamShield(
                      game.opponent
                    );

                  return (
                    <div
                      key={game.id}
                      className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-gradient-to-br
                        from-white/[0.055]
                        to-transparent
                        p-5
                        transition-all
                        hover:border-emerald-400/30
                      "
                    >
                      <Badge>
                        {game.status}
                      </Badge>

                      {/* ================================================== */}
                      {/* TIMES + ESCUDOS */}
                      {/* ================================================== */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-center
                          gap-5
                        "
                      >
                        {/* TIME DA ESQUERDA */}

                        <div
                          className="
                            flex
                            min-w-0
                            flex-1
                            items-center
                            justify-end
                            gap-3
                          "
                        >
                          <span
                            className="
                              text-right
                              text-xl
                              font-bold
                              leading-tight
                            "
                          >
                            {game.team}
                          </span>

                          {teamShield && (
                            <img
                              src={teamShield}
                              alt={`Escudo ${game.team}`}
                              className="
                                h-12
                                w-12
                                shrink-0
                                object-contain
                              "
                            />
                          )}
                        </div>

                        {/* X */}

                        <span
                          className="
                            shrink-0
                            text-xl
                            font-black
                            text-emerald-400
                          "
                        >
                          X
                        </span>

                        {/* TIME DA DIREITA */}

                        <div
                          className="
                            flex
                            min-w-0
                            flex-1
                            items-center
                            justify-start
                            gap-3
                          "
                        >
                          {opponentShield && (
                            <img
                              src={opponentShield}
                              alt={`Escudo ${game.opponent}`}
                              className="
                                h-12
                                w-12
                                shrink-0
                                object-contain
                              "
                            />
                          )}

                          <span
                            className="
                              text-left
                              text-xl
                              font-bold
                              leading-tight
                            "
                          >
                            {game.opponent}
                          </span>
                        </div>
                      </div>

                      {/* ================================================== */}
                      {/* INFORMAÇÕES DO JOGO */}
                      {/* ================================================== */}

                      <div className="mt-5 space-y-3">
                        <p>
                          📅{" "}
                          {formatDate(
                            game.date
                          )}
                        </p>

                        <p>
                          🕒 {game.time}
                        </p>

                        <p>
                          📍 {game.field}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-400">
                Nenhum jogo futuro agendado.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
