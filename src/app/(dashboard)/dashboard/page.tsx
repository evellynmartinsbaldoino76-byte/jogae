"use client";

import {
  CalendarDays,
  MapPin,
  Plus,
  Trophy,
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


  function novoJogo() {
    router.push("/jogos");
  }


  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-emerald-950
        via-slate-950
        to-blue-950
        px-6
        pb-10
        pt-10
        md:pt-12
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          space-y-10
        "
      >


        {/* CABEÇALHO */}
        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

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
              Painel de controle
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
              Olá!
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
              Bem-vindo ao painel de controle do Jogaê.
            </p>

          </div>


          <Button
            size="lg"
            onClick={novoJogo}
            className="
              group
              w-full
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


        </div>



        {/* CARDS */}
        <div
          className="
            grid
            gap-5
            md:grid-cols-3
          "
        >


          <Card
            onClick={() =>
              router.push("/jogos")
            }
            className="
              cursor-pointer
              border-white/10
              bg-white/5
              text-white
            "
          >

            <CardHeader>

              <CardTitle>
                Jogos
              </CardTitle>

            </CardHeader>


            <CardContent>

              <p
                className="
                  text-5xl
                  font-bold
                "
              >
                {games.length}
              </p>

              <p className="mt-3 text-slate-400">
                Jogos cadastrados
              </p>

            </CardContent>


          </Card>



          <Card
            onClick={() =>
              router.push("/times")
            }
            className="
              cursor-pointer
              border-white/10
              bg-white/5
              text-white
            "
          >

            <CardHeader>

              <CardTitle>
                Meus times
              </CardTitle>

            </CardHeader>


            <CardContent>

              <p
                className="
                  text-5xl
                  font-bold
                "
              >
                {teamsCount}
              </p>

              <p className="mt-3 text-slate-400">
                Times cadastrados
              </p>

            </CardContent>


          </Card>




          <Card
            className="
              border-white/10
              bg-white/5
              text-white
            "
          >

            <CardHeader>

              <CardTitle>
                Local
              </CardTitle>

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



        {/* PRÓXIMOS JOGOS */}
        <Card
          className="
            border-white/10
            bg-white/5
            text-white
          "
        >

          <CardHeader>

            <CardTitle>
              Próximas Partidas
            </CardTitle>

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

                {nextGames.map((game)=>(

                  <div
                    key={game.id}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/20
                      p-5
                    "
                  >

                    <Badge>
                      {game.status}
                    </Badge>


                    <h2
                      className="
                        mt-5
                        text-xl
                        font-bold
                        text-center
                      "
                    >

                      {game.team}

                      <span className="mx-2 text-emerald-400">
                        X
                      </span>

                      {game.opponent}

                    </h2>


                    <div className="mt-5 space-y-3">

                      <p>
                        📅 {formatDate(game.date)}
                      </p>


                      <p>
                        🕒 {game.time}
                      </p>


                      <p>
                        📍 {game.field}
                      </p>


                    </div>


                  </div>

                ))}


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