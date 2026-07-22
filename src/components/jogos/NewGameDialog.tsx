"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

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




interface NewGameDialogProps {

  teams: string[];

  games: Game[];

  onCreate: (game: Game) => void;

  onUpdate?: (
    id: string,
    game: Game
  ) => void;

  initialDate?: string;

  initialTime?: string;

  editingGame?: Game | null;

  open?: boolean;

  onOpenChange?: (
    open: boolean
  ) => void;

  showTrigger?: boolean;

}





const horariosDisponiveis = [

  "19:30",

  "20:30",

  "21:30",

];









export function NewGameDialog({

  teams,

  games,

  onCreate,

  onUpdate,

  initialDate,

  initialTime,

  editingGame,

  open,

  onOpenChange,

  showTrigger = true,

}: NewGameDialogProps) {



  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [team, setTeam] = useState("");

  const [opponent, setOpponent] = useState("");








  useEffect(() => {


    if (editingGame) {


      setDate(editingGame.date);

      setTime(editingGame.time);

      setTeam(editingGame.team);

      setOpponent(

        editingGame.opponent === "Aguardando adversário"

          ? ""

          : editingGame.opponent

      );


      return;

    }



    setDate(initialDate ?? "");

    setTime(initialTime ?? "");

    setTeam("");

    setOpponent("");



  }, [

    editingGame,

    initialDate,

    initialTime

  ]);









  function horariosLivres() {


    const ocupados = games

      .filter(

        (game) =>

          game.date === date &&

          game.id !== editingGame?.id

      )

      .map(

        (game) => game.time

      );



    return horariosDisponiveis.filter(

      (horario) =>

        !ocupados.includes(horario)

    );


  }









  function handleSave() {


    if (!date || !time || !team) {

      return;

    }





    const game: Game = {


      id:

        editingGame

          ? editingGame.id

          : crypto.randomUUID(),



      date,

      time,

      field: "Campo principal",

      team,

      opponent:

        opponent ||

        "Aguardando adversário",



      status:

        opponent

          ? "Confirmado"

          : "Aguardando adversário",



    };







    if (editingGame) {


      onUpdate?.(

        editingGame.id,

        game

      );


    } else {


      onCreate(game);


    }







    setDate("");

    setTime("");

    setTeam("");

    setOpponent("");



    onOpenChange?.(false);


  }













  return (

    <Dialog

      open={open}

      onOpenChange={onOpenChange}

    >



      {showTrigger && (

        <DialogTrigger

          render={

            <Button />

          }

        >

          + Novo jogo

        </DialogTrigger>

      )}







      <DialogContent>



        <DialogHeader>


          <DialogTitle>


            {editingGame

              ? "Editar jogo ⚽"

              : "Novo jogo ⚽"

            }


          </DialogTitle>


        </DialogHeader>








        <div className="space-y-4">







          <Input

            type="date"

            value={date}

            onChange={(e) => {


              setDate(e.target.value);

              setTime("");


            }}

          />








          <Select

            value={time}

            onValueChange={(value) =>

              setTime(value ?? "")

            }

            disabled={!date}

          >


            <SelectTrigger>


              <SelectValue

                placeholder="Escolha o horário"

              />


            </SelectTrigger>





            <SelectContent>


              {horariosLivres().map(

                (horario) => (


                  <SelectItem

                    key={horario}

                    value={horario}

                  >

                    {horario}

                  </SelectItem>


                )

              )}


            </SelectContent>


          </Select>








          <div className="rounded-md border p-3 text-sm">


            🏟️ Campo:

            <strong className="ml-2">

              Campo principal

            </strong>


          </div>








          <Select

            value={team}

            onValueChange={(value) =>

              setTeam(value ?? "")

            }

          >


            <SelectTrigger>


              <SelectValue

                placeholder="Escolha o time"

              />


            </SelectTrigger>





            <SelectContent>


              {teams.map((item) => (


                <SelectItem

                  key={item}

                  value={item}

                >

                  {item}

                </SelectItem>


              ))}


            </SelectContent>


          </Select>








          <Select

            value={opponent}

            onValueChange={(value) =>

              setOpponent(value ?? "")

            }

          >


            <SelectTrigger>


              <SelectValue

                placeholder="Escolha o adversário"

              />


            </SelectTrigger>





            <SelectContent>


              <SelectItem value="">

                Aguardando adversário

              </SelectItem>





              {teams.map((item) => (


                <SelectItem

                  key={item}

                  value={item}

                >

                  {item}

                </SelectItem>


              ))}


            </SelectContent>


          </Select>








          <Button

            className="w-full"

            onClick={handleSave}

          >


            {editingGame

              ? "Salvar alterações"

              : "Salvar jogo"

            }


          </Button>







        </div>






      </DialogContent>





    </Dialog>

  );

}