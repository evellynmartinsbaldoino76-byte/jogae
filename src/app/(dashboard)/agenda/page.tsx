"use client";

import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


import { ScheduleCard } from "@/components/agenda/ScheduleCard";

import { NewGameDialog } from "@/components/jogos/NewGameDialog";

import { DeleteGameDialog } from "@/components/jogos/DeleteGameDialog";

import {
  useGames,
  Game,
} from "@/context/GamesContext";

import { teams } from "@/lib/teams";





export default function AgendaPage() {


  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );


  const [dialogOpen, setDialogOpen] = useState(false);


  const [selectedTime, setSelectedTime] = useState("");


  const [editingGame, setEditingGame] = useState<Game | null>(null);


  const [deletingGame, setDeletingGame] = useState<Game | null>(null);



  const {
    games,
    addGame,
    updateGame,
    removeGame,
  } = useGames();





  const horarios = [

    "19:30",

    "20:30",

    "21:30",

  ];







  function changeDay(value: number) {


    const newDate = new Date(selectedDate);


    newDate.setDate(
      newDate.getDate() + value
    );


    setSelectedDate(newDate);


  }







  function getWeekDay(date: Date) {


    return new Intl.DateTimeFormat(

      "pt-BR",

      {
        weekday: "long",
      }

    )

      .format(date)

      .toUpperCase();


  }







  function getFullDate(date: Date) {


    return new Intl.DateTimeFormat(

      "pt-BR",

      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }

    )

      .format(date)

      .toUpperCase();


  }







  function formatDate(date: Date) {


    return (

      date.getFullYear()

      +

      "-" +

      String(
        date.getMonth() + 1
      ).padStart(2, "0")

      +

      "-" +

      String(
        date.getDate()
      ).padStart(2, "0")

    );


  }








  function getGameByTime(time: string) {


    return games.find(

      (game) =>

        game.date === formatDate(selectedDate)

        &&

        game.time === time

    );


  }







  function handleSchedule(time: string) {


    setEditingGame(null);

    setSelectedTime(time);

    setDialogOpen(true);


  }







  function handleEdit(game: Game) {


    setEditingGame(game);

    setSelectedTime(game.time);

    setDialogOpen(true);


  }







  function handleDelete(game: Game) {


    setDeletingGame(game);


  }







  return (


    <div className="space-y-8">







      <div

        className="
        flex
        items-center
        justify-between
        "

      >





        <div

          className="
          flex
          items-center
          gap-4
          "

        >



          <button

            onClick={() => changeDay(-1)}

            className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-3
            text-white
            transition
            hover:bg-white/10
            "

          >

            <ChevronLeft size={22}/>


          </button>






          <div className="text-center">


            <p className="text-sm font-semibold text-emerald-400">

              {getWeekDay(selectedDate)}

            </p>



            <p className="text-2xl font-bold text-white">

              {getFullDate(selectedDate)}

            </p>



          </div>






          <button

            onClick={() => changeDay(1)

            }

            className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-3
            text-white
            transition
            hover:bg-white/10
            "

          >

            <ChevronRight size={22}/>


          </button>



        </div>



      </div>









      <div

        className="
        grid
        gap-5
        md:grid-cols-3
        "

      >




        {

          horarios.map((horario) => {


            const game = getGameByTime(horario);




            return (

              <ScheduleCard

                key={horario}

                time={horario}

                status={

                  game

                    ? "Agendado"

                    : "Livre"

                }

                teams={

                  game

                    ? `${game.team} x ${game.opponent}`

                    : undefined

                }

                onSchedule={() =>

                  handleSchedule(horario)

                }


                onEdit={() =>

                  game && handleEdit(game)

                }


                onDelete={() =>

                  game && handleDelete(game)

                }


              />


            );


          })

        }



      </div>









      <div>


        <h2

          className="
          mb-4
          text-xl
          font-semibold
          text-white
          "

        >

          Horário personalizado


        </h2>




        <div

          className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-6
          text-slate-300
          backdrop-blur-xl
          "

        >

          Nenhuma reserva personalizada.


        </div>



      </div>









      <NewGameDialog

        teams={teams}

        games={games}

        open={dialogOpen}

        onOpenChange={(open) => {


          setDialogOpen(open);



          if (!open) {


            setEditingGame(null);


          }


        }}


        showTrigger={false}


        initialDate={

          editingGame

            ? editingGame.date

            : formatDate(selectedDate)

        }


        initialTime={

          editingGame

            ? editingGame.time

            : selectedTime

        }


        editingGame={editingGame}


        onCreate={(game) => {


          if (editingGame) {


            updateGame(

              editingGame.id,

              game

            );


          } else {


            addGame(game);


          }


        }}


      />








      <DeleteGameDialog

        open={!!deletingGame}

        onOpenChange={(open) => {


          if (!open) {


            setDeletingGame(null);


          }


        }}

        teams={

          deletingGame

            ? `${deletingGame.team} x ${deletingGame.opponent}`

            : ""

        }


        onConfirm={() => {


          if (deletingGame) {


            removeGame(

              deletingGame.id

            );


            setDeletingGame(null);


          }


        }}


      />







    </div>


  );

}