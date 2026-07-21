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


interface NewGameDialogProps {
  teams: string[];
  onCreate: (game: any) => void;
}


export function NewGameDialog({
  teams,
  onCreate,
}: NewGameDialogProps) {


  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [team, setTeam] = useState("");

  const [opponent, setOpponent] = useState("");





  function handleSave() {


    if (!date || !time || !team) {
      return;
    }



    onCreate({

      date,

      time,

      field: "Campo principal",

      team,

      opponent:
        opponent || "Aguardando adversário",


      status:
        opponent === "Aguardando adversário" || !opponent
          ? "Aguardando adversário"
          : "Confirmado",

    });



    setDate("");

    setTime("");

    setTeam("");

    setOpponent("");

  }





  return (

    <Dialog>


      <DialogTrigger>

        <Button>
          + Novo jogo
        </Button>

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

            onChange={(e) =>
              setDate(e.target.value)
            }

          />







          <Select

            onValueChange={(value) =>
              setTime(value as string)
            }

          >


            <SelectTrigger>

              <SelectValue placeholder="Escolha o horário" />

            </SelectTrigger>




            <SelectContent>


              <SelectItem value="19:30">

                19:30

              </SelectItem>



              <SelectItem value="20:30">

                20:30

              </SelectItem>



              <SelectItem value="21:30">

                21:30

              </SelectItem>


            </SelectContent>


          </Select>







          <div className="rounded-md border p-3 text-sm">

            🏟️ Campo:

            <strong className="ml-2">
              Campo principal
            </strong>


          </div>







          <Select

            onValueChange={(value) =>
              setTeam(value as string)
            }

          >


            <SelectTrigger>

              <SelectValue placeholder="Escolha o time" />

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

            onValueChange={(value) =>
              setOpponent(value as string)
            }

          >


            <SelectTrigger>

              <SelectValue placeholder="Escolha o adversário" />

            </SelectTrigger>





            <SelectContent>



              <SelectItem value="Aguardando adversário">

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