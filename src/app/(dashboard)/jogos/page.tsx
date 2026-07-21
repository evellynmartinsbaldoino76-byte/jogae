import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";


export default function JogosPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Jogos agendados ⚽
          </h1>

          <p className="text-muted-foreground">
            Organize e acompanhe todas as partidas.
          </p>
        </div>


        <Button>
          + Novo jogo
        </Button>

      </div>



      <Card>

        <CardHeader>
          <CardTitle>
            Feras FC x Lobos FC
          </CardTitle>
        </CardHeader>


        <CardContent>

          <div className="space-y-2">

            <p>
              📅 22/07/2026
            </p>

            <p>
              ⏰ 20:30
            </p>

            <p>
              🏟 Campo Central
            </p>


            <Badge>
              Confirmado
            </Badge>

          </div>

        </CardContent>

      </Card>


    </div>
  );
}