"use client";

import { useState } from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Shield,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Badge } from "@/components/ui/badge";


import { NewGameDialog } from "@/components/jogos/NewGameDialog";


import { teams } from "@/lib/teams";





interface Game {

  id: string;

  date: string;

  time: string;

  field: string;

  team: string;

  opponent: string;

  status: string;

}





export default function JogosPage() {



  const [games, setGames] = useState<Game[]>([]);






  function handleCreateGame(game: Game) {


    setGames((current) => [

      ...current,

      game,

    ]);


  }








  return (



    <div className="space-y-8">







      {/* Cabeçalho */}


      <div className="flex items-center justify-between">


        <div>


          <h1 className="text-4xl font-bold text-white">

            Jogos agendados ⚽

          </h1>


          <p className="mt-2 text-slate-400">

            Gerencie partidas, horários e adversários.

          </p>


        </div>







        <NewGameDialog

          teams={teams}

          games={games}

          onCreate={handleCreateGame}

        />




      </div>









      {games.length === 0 && (


        <Card>


          <CardContent className="flex flex-col items-center justify-center py-12">


            <Shield

              size={50}

              className="mb-4 text-emerald-400"

            />


            <p className="text-slate-300">

              Nenhum jogo agendado ainda.

            </p>


            <p className="mt-2 text-sm text-slate-500">

              Clique em "+ Novo jogo" para começar.

            </p>


          </CardContent>


        </Card>


      )}









      <div className="grid gap-6 md:grid-cols-2">






        {games.map((game) => (



          <Card

            key={game.id}

            className="overflow-hidden"

          >



            <CardHeader>



              <div className="flex items-center justify-between">


                <CardTitle className="text-xl">


                  Próxima partida


                </CardTitle>




                <Badge

                  className={
                    game.status === "Confirmado"

                    ?

                    "bg-emerald-500 text-black"

                    :

                    "bg-yellow-400 text-black"

                  }

                >

                  {game.status}


                </Badge>



              </div>



            </CardHeader>









            <CardContent className="space-y-6">





              <div className="flex items-center justify-center gap-4 text-center">



                <div>


                  <p className="text-2xl font-bold text-white">

                    {game.team}

                  </p>


                  <p className="text-xs text-slate-400">

                    Mandante

                  </p>


                </div>





                <span className="text-3xl font-bold text-emerald-400">

                  X

                </span>






                <div>



                  <p className="text-2xl font-bold text-white">


                    {game.opponent || "Aguardando adversário"}


                  </p>


                  <p className="text-xs text-slate-400">

                    Visitante

                  </p>


                </div>





              </div>









              <div className="space-y-3 border-t border-white/10 pt-5 text-slate-300">





                <p className="flex items-center gap-2">

                  <CalendarDays size={18} className="text-emerald-400"/>

                  {game.date}

                </p>





                <p className="flex items-center gap-2">


                  <Clock3 size={18} className="text-emerald-400"/>

                  {game.time}


                </p>







                <p className="flex items-center gap-2">


                  <MapPin size={18} className="text-emerald-400"/>

                  {game.field}


                </p>






              </div>





            </CardContent>



          </Card>




        ))}



      </div>





    </div>


  );

}