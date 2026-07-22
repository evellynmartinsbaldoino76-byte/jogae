"use client";

import {
  CalendarDays,
  MapPin,
  Plus,
  Users,
  Trophy,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Badge } from "@/components/ui/badge";


import { Button } from "@/components/ui/button";




interface Game {

  id: string;

  date: string;

  time: string;

  field: string;

  team: string;

  opponent: string;

  status: string;

}






export default function DashboardPage() {



  const router = useRouter();




  const [games, setGames] =
    useState<Game[]>([]);



  const [teamsCount, setTeamsCount] =
    useState(0);






  useEffect(() => {



    async function loadData() {



      try {



        const gamesResponse =
          await fetch("/api/games");


        const gamesData =
          await gamesResponse.json();



        setGames(gamesData);







        const teamsResponse =
          await fetch("/api/teams");



        const teamsData =
          await teamsResponse.json();



        setTeamsCount(
          teamsData.length
        );




      } catch (error) {


        console.error(
          "Erro ao carregar dashboard:",
          error
        );


      }


    }




    loadData();



  }, []);







  const nextGame =
    games.length > 0
      ? games[0]
      : null;








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

            Olá, Gian 👋

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

                Próximo jogo

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

                Próxima Partida

              </CardTitle>


            </div>


          </CardHeader>







          <CardContent>




            {nextGame ? (



              <div className="
                rounded-2xl
                border
                border-white/10
                bg-black/20
                p-8
                text-center
              ">



                <h2 className="text-3xl font-bold">


                  {nextGame.team}


                  <span className="mx-4 text-emerald-400">

                    X

                  </span>


                  {nextGame.opponent}



                </h2>







                <div className="mt-6 space-y-2 text-slate-300">


                  <p>

                    🕒 {nextGame.date} às {nextGame.time}

                  </p>



                  <p>

                    🏟 {nextGame.field}

                  </p>


                </div>







                <Badge className="
                  mt-6
                  bg-emerald-500
                  text-black
                ">


                  {nextGame.status}


                </Badge>





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