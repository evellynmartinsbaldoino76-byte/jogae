"use client";

import { useState } from "react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Badge } from "@/components/ui/badge";


import { NewGameDialog } from "@/components/jogos/NewGameDialog";



export default function JogosPage() {


  const [games, setGames] = useState<any[]>([]);



  const teams = [
    "Feras FC",
    "Lobos FC",
  ];





  function handleCreateGame(game: any) {


    setGames((current) => [

      ...current,

      game,

    ]);

  }






  return (

    <div className="space-y-6">



      <div className="flex items-center justify-between">


        <div>


          <h1 className="text-3xl font-bold">
            Jogos agendados ⚽
          </h1>



          <p className="text-muted-foreground">
            Aqui estão os resumos dos jogos agendados.
          </p>


        </div>





        <NewGameDialog

          teams={teams}

          onCreate={handleCreateGame}

        />


      </div>







      {games.length === 0 && (

        <Card>


          <CardContent className="pt-6">


            <p className="text-muted-foreground">

              Nenhum jogo agendado.

            </p>


          </CardContent>


        </Card>

      )}







      <div className="grid gap-4 md:grid-cols-2">



        {games.map((game, index) => (



          <Card key={index}>


            <CardHeader>


              <CardTitle>

                {game.team}

                {" x "}

                {game.opponent}


              </CardTitle>


            </CardHeader>





            <CardContent className="space-y-2">


              <p>
                📅 {game.date}
              </p>


              <p>
                🕒 {game.time}
              </p>


              <p>
                🏟️ {game.field}
              </p>



              <Badge>

                {game.status}

              </Badge>


            </CardContent>


          </Card>



        ))}



      </div>




    </div>

  );

}