"use client";

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


import { useGames } from "@/context/GamesContext";





export default function JogosPage() {


  const { games, addGame } = useGames();





  return (


    <div className="space-y-8">





      {/* Cabeçalho */}


      <div className="flex items-center justify-between">



        <div>


          <h1 className="text-4xl font-bold text-white">

            Jogos agendados ⚽

          </h1>



          <p className="mt-2 text-slate-400">

            Organize os jogos, horários e adversários.

          </p>



        </div>







        <NewGameDialog

          teams={teams}

          games={games}

          onCreate={addGame}

        />




      </div>







      {/* Lista de jogos */}


      <div

        className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
        "

      >




        {games.length === 0 ? (


          <Card

            className="
            border-white/10
            bg-white/5
            backdrop-blur-xl
            "

          >


            <CardContent

              className="
              p-6
              text-center
              text-slate-400
              "

            >

              Nenhum jogo agendado.


            </CardContent>


          </Card>



        ) : (



          games.map((game) => (



            <Card

              key={game.id}

              className="
              border-white/10
              bg-white/5
              backdrop-blur-xl
              shadow-xl
              "

            >




              <CardHeader>


                <CardTitle

                  className="
                  flex
                  items-center
                  justify-between
                  text-white
                  "

                >



                  <span>

                    {game.team} x {game.opponent}

                  </span>



                  <Badge

                    className="
                    bg-emerald-500/20
                    text-emerald-400
                    "

                  >

                    {game.status}

                  </Badge>



                </CardTitle>


              </CardHeader>






              <CardContent

                className="
                space-y-3
                text-slate-300
                "

              >



                <p className="flex items-center gap-2">

                  <CalendarDays size={18} />

                  {game.date}


                </p>





                <p className="flex items-center gap-2">


                  <Clock3 size={18} />

                  {game.time}


                </p>






                <p className="flex items-center gap-2">


                  <MapPin size={18} />

                  {game.field}


                </p>





                <p className="flex items-center gap-2">


                  <Shield size={18} />

                  {game.team}


                </p>




              </CardContent>





            </Card>



          ))


        )}



      </div>





    </div>


  );

}