"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useGames } from "@/context/GamesContext";



const horariosIniciais = [
  "19:30",
  "20:30",
  "21:30",
];



export default function AgendaPage() {


  const { games } = useGames();


  const hoje = new Date()
    .toISOString()
    .split("T")[0];



  const [data, setData] = useState(hoje);


  const [horarios, setHorarios] =
    useState(horariosIniciais);



  const [novoHorario, setNovoHorario] =
    useState("");



  const [open, setOpen] =
    useState(false);






  function adicionarHorario() {


    if (!novoHorario) {
      return;
    }



    setHorarios((atual) => [

      ...atual,

      novoHorario,

    ]);



    setNovoHorario("");

    setOpen(false);

  }








  function encontrarJogo(horario: string) {


    return games.find(

      (game) =>

        game.date === data &&

        game.time === horario

    );


  }








  return (

    <div className="space-y-6">





      <div className="flex items-center justify-between">


        <div>


          <h1 className="text-3xl font-bold">
            Agenda 🕒
          </h1>



          <p className="text-muted-foreground">
            Controle de datas e horários disponíveis para jogos.
          </p>


        </div>







        <Dialog
          open={open}
          onOpenChange={setOpen}
        >



          <DialogTrigger
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >

            + Novo horário

          </DialogTrigger>








          <DialogContent>



            <DialogHeader>


              <DialogTitle>
                Adicionar horário
              </DialogTitle>


            </DialogHeader>







            <div className="space-y-4">





              <Input

                type="time"

                value={novoHorario}

                onChange={(e) =>
                  setNovoHorario(e.target.value)
                }

              />







              <Button

                className="w-full"

                onClick={adicionarHorario}

              >

                Salvar horário

              </Button>





            </div>





          </DialogContent>






        </Dialog>





      </div>









      <Card>


        <CardHeader>


          <CardTitle>
            📅 Data da agenda
          </CardTitle>


        </CardHeader>





        <CardContent>


          <Input

            type="date"

            value={data}

            onChange={(e) =>
              setData(e.target.value)
            }

          />


        </CardContent>


      </Card>









      <Card>


        <CardHeader>


          <CardTitle>
            Campo principal 🏟️
          </CardTitle>


        </CardHeader>






        <CardContent className="space-y-3">






          {horarios.map((horario) => {


            const jogo = encontrarJogo(horario);




            return (



              <div

                key={horario}

                className="flex items-center justify-between rounded-lg border p-4"

              >





                <div>



                  <p className="font-semibold">

                    {horario}

                  </p>






                  {

                    jogo ? (


                      <p className="text-sm text-muted-foreground">


                        ⚽ {jogo.team}

                        {" x "}

                        {jogo.opponent ||
                          "Aguardando adversário"}


                      </p>


                    ) : (


                      <p className="text-sm text-muted-foreground">

                        Horário disponível

                      </p>


                    )


                  }





                </div>








                {


                  jogo ? (


                    <Badge>

                      {jogo.status}

                    </Badge>


                  ) : (


                    <Badge>

                      Disponível

                    </Badge>


                  )


                }





              </div>




            );


          })}







        </CardContent>



      </Card>






    </div>

  );

}