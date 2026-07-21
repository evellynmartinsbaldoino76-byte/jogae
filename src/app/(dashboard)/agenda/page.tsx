"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";


const horarios = [
  "19:30",
  "20:30",
  "21:30",
];


export default function AgendaPage() {

  return (
    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold">
          Agenda 🕒
        </h1>


        <p className="text-muted-foreground">
          Controle de datas e horários disponíveis para jogos.
        </p>

      </div>



      <Card>


        <CardHeader>

          <CardTitle>
            Campo principal 🏟️
          </CardTitle>

        </CardHeader>



        <CardContent className="space-y-3">


          {horarios.map((horario) => (

            <div
              key={horario}
              className="flex items-center justify-between rounded-lg border p-4"
            >


              <div>

                <p className="font-semibold">
                  {horario}
                </p>


                <p className="text-sm text-muted-foreground">
                  Horário disponível
                </p>

              </div>



              <Badge>
                Disponível
              </Badge>


            </div>

          ))}


        </CardContent>


      </Card>


    </div>
  );

}