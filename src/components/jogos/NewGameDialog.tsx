"use client";

import { useState } from "react";

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

}: NewGameDialogProps) {



  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [team, setTeam] = useState("");

  const [opponent, setOpponent] = useState("");








  function horariosLivres() {


    const ocupados = games

      .filter(
        (game) =>
          game.date === date
      )

      .map(
        (game) =>
          game.time
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






    onCreate({

      id: crypto.randomUUID(),

      date,

      time,

      field: "Campo principal",

      team,

      opponent:
        opponent || "Aguardando adversário",

      status:

        opponent

          ? "Confirmado"

          : "Aguardando adversário",

    });






    setDate("");

    setTime("");

    setTeam("");

    setOpponent("");

  }









  return (

    <Dialog>





      <DialogTrigger

        render={
          <Button />
        }

      >

        + Novo jogo


      </DialogTrigger>








      <DialogContent>



        <DialogHeader>


          <DialogTitle>

            Novo jogo ⚽

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

                placeholder={
                  date
                    ? "Escolha o horário"
                    : "Escolha a data primeiro"
                }

              />


            </SelectTrigger>







            <SelectContent>





              {horariosLivres().length === 0 && (


                <SelectItem

                  value="sem-horario"

                  disabled

                >

                  Nenhum horário disponível

                </SelectItem>


              )}






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

            Salvar jogo

          </Button>






        </div>





      </DialogContent>






    </Dialog>

  );

}