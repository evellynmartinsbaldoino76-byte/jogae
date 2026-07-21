import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";


export default function DashboardPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Olá, Evellyn 👋
        </h1>

        <p className="text-muted-foreground">
          Aqui está o resumo do seu Jogaê.
        </p>
      </div>


      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>
              Próximo jogo
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              Hoje 20:30
            </p>

            <Badge className="mt-2">
              Confirmado
            </Badge>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>
              Meus times
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              3
            </p>

            <p className="text-muted-foreground">
              times cadastrados
            </p>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>
              Campos
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              5
            </p>

            <p className="text-muted-foreground">
               campos cadastrados
            </p>
          </CardContent>
        </Card>

      </div>


      <Card>

        <CardHeader>
          <CardTitle>
            Próximas partidas
          </CardTitle>
        </CardHeader>


        <CardContent>

          <div className="flex items-center justify-between border-b py-3">

            <div>
              <p className="font-semibold">
                Feras FC x Lobos FC
              </p>

              <p className="text-sm text-muted-foreground">
                Arena Central • 22/07 às 20:30
              </p>
            </div>


            <Badge>
              Futebol
            </Badge>

          </div>


        </CardContent>

      </Card>


    </div>
  );
}