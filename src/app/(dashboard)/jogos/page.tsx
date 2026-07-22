"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Shield,
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


export default function JogosPage() {

  const {
    games,
    addGame,
    removeGame,
    updateGame,
  } = useGames();


  const [teams, setTeams] = useState<string[]>([]);

  const [editingGame, setEditingGame] =
    useState<Game | null>(null);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedTeam, setSelectedTeam] =
    useState("todos");



  useEffect(() => {

    async function loadTeams() {

      try {

        const response = await fetch("/api/teams");

        const data = await response.json();

        setTeams(
          data.map(
            (team: { name: string }) => team.name
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




  const filteredGames =
    selectedTeam === "todos"
      ? games
      : games.filter(
          (game) =>
            game.team === selectedTeam ||
            game.opponent === selectedTeam
        );



  return (

    <div className="space-y-8">


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





      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


        <Select
  value={selectedTeam}
  onValueChange={(value) =>
    setSelectedTeam(value ?? "todos")
  }
>
        

          <SelectTrigger className="w-72">

            <SelectValue placeholder="Todos os times" />

          </SelectTrigger>


          <SelectContent>


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




        <p className="text-slate-400">

          {filteredGames.length} jogo
          {filteredGames.length !== 1 ? "s" : ""} encontrado
          {filteredGames.length !== 1 ? "s" : ""}

        </p>


      </div>





      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


        {filteredGames.length === 0 ? (


          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">


            <CardContent className="p-8 text-center text-slate-400">

              Nenhum jogo encontrado para este time.

            </CardContent>


          </Card>



        ) : (


          filteredGames.map((game) => (


            <Card
              key={game.id}
              className="border-white/10 bg-white/5 backdrop-blur-xl"
            >


              <CardHeader>


                <CardTitle className="flex justify-between text-white">


                  <span>

                    {game.team} x {game.opponent}

                  </span>


                  <Badge>

                    {game.status}

                  </Badge>


                </CardTitle>


              </CardHeader>





              <CardContent className="space-y-3 text-slate-300">


               <p className="flex items-center gap-2">
  <CalendarDays size={18} />
  {new Date(game.date + "T00:00:00").toLocaleDateString("pt-BR")}
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





                <div className="flex gap-2 pt-4">



                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {

                      setEditingGame(game);

                      setOpenEdit(true);

                    }}
                  >

                    <Pencil
                      size={16}
                      className="mr-2"
                    />

                    Editar

                  </Button>





                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() =>
                      removeGame(game.id)
                    }
                  >

                    <Trash2
                      size={16}
                      className="mr-2"
                    />

                    Excluir

                  </Button>



                </div>



              </CardContent>


            </Card>


          ))


        )}


      </div>





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