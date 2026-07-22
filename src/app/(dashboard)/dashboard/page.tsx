"use client";

import {
  CalendarDays,
  MapPin,
  Plus,
  Users,
  Trophy,
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


  const {
    games,
  } = useGames();



  const {
    teams,
  } = useTeams();



  const teamsCount =
    teams.length;





  const sortedGames = [...games].sort((a, b) => {
  const dataA = new Date(`${a.date}T${a.time}`);
  const dataB = new Date(`${b.date}T${b.time}`);

  return dataA.getTime() - dataB.getTime();
});


const nextGames =
  sortedGames.length > 0
    ? sortedGames.filter(
        (game) =>
          game.date === sortedGames[0].date
      )
    : [];

    function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

  function novoJogo() {

    router.push("/jogos");

  }







  return (


    <main className="
      min-h-screen
      bg-gradient-to-br
      from-emerald-950
      via-slate-950
      to-blue-950
      p-6
    ">


      <div className="space-y-8">



        <div>

          <h1 className="text-4xl font-bold text-white">

            Olá!

          </h1>


          <p className="mt-2 text-slate-300">

            Bem-vindo ao painel de controle do Jogaê.

          </p>


        </div>






        <div className="grid gap-6 md:grid-cols-3">





          <Card className="
            border-white/10
            bg-white/5
            text-white
            backdrop-blur-xl
          ">


            <CardHeader>

              <CalendarDays className="text-emerald-400"/>


              <CardTitle>

                Jogos

              </CardTitle>


            </CardHeader>



            <CardContent>


              <p className="text-5xl font-bold text-emerald-400">

                {games.length}

              </p>


              <p className="mt-2 text-slate-400">

                jogos confirmados

              </p>


            </CardContent>


          </Card>









          <Card className="
            border-white/10
            bg-white/5
            text-white
            backdrop-blur-xl
          ">


            <CardHeader>


              <Users className="text-emerald-400"/>


              <CardTitle>

                Meus times

              </CardTitle>


            </CardHeader>




            <CardContent>


              <p className="text-5xl font-bold text-emerald-400">

                {teamsCount}

              </p>


              <p className="mt-2 text-slate-400">

                times cadastrados

              </p>


            </CardContent>



          </Card>









          <Card className="
            border-white/10
            bg-white/5
            text-white
            backdrop-blur-xl
          ">



            <CardHeader>


              <MapPin className="text-emerald-400"/>


              <CardTitle>

                Local

              </CardTitle>


            </CardHeader>





            <CardContent>


              <p className="text-xl font-bold text-emerald-400">

                Associação da Polícia

              </p>


              <p className="mt-2 text-slate-400">

                campo fixo

              </p>


            </CardContent>


          </Card>





        </div>







        <Button

          size="lg"

          onClick={novoJogo}

          className="
            bg-emerald-500
            font-bold
            text-black
          "

        >

          <Plus className="mr-2"/>

          Agendar novo jogo


        </Button>









        <Card className="
          border-white/10
          bg-white/5
          text-white
          backdrop-blur-xl
        ">



          <CardHeader>


            <div className="flex items-center gap-3">


              <Trophy className="text-emerald-400"/>


              <CardTitle>

                Próximas Partidas

              </CardTitle>


            </div>


          </CardHeader>







          <CardContent>





            {nextGames.length > 0 ? (

  <div className="space-y-4">

    {nextGames.map((game) => (

      <div
        key={game.id}
        className="
          rounded-2xl
          border
          border-white/10
          bg-black/20
          p-6
          text-center
        "
      >

        <h2 className="text-2xl font-bold text-white">

          {game.team}

          <span className="mx-4 text-emerald-400">
            X
          </span>

          {game.opponent}

        </h2>


        <div className="mt-4 space-y-2 text-slate-300">

          <p>
            🕒 {formatDate(game.date)} às {game.time}
          </p>


          <p>
            🏟 {game.field}
          </p>


        </div>


        <Badge
          className="
            mt-4
            bg-emerald-500
            text-black
          "
        >

          {game.status}

        </Badge>


      </div>

    ))}

  </div>


) : (

  <p className="text-center text-slate-400">
    Nenhum jogo agendado.
  </p>

)}




          </CardContent>




        </Card>





      </div>


    </main>


  );


}