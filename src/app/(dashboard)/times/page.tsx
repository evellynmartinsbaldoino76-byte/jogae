import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";


export default function TimesPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Times cadastrados ⚽
          </h1>

          <p className="text-muted-foreground">
            Organize os times que participam dos jogos.
          </p>
        </div>


        <Button>
          + Novo time
        </Button>

      </div>



      <div className="grid gap-4 md:grid-cols-3">


        <Card>

          <CardHeader>
            <CardTitle>
              Feras FC
            </CardTitle>
          </CardHeader>


          <CardContent>

            <p className="text-muted-foreground">
              Time cadastrado
            </p>

            <Badge className="mt-3">
              Ativo
            </Badge>

          </CardContent>

        </Card>



        <Card>

          <CardHeader>
            <CardTitle>
              Lobos FC
            </CardTitle>
          </CardHeader>


          <CardContent>

            <p className="text-muted-foreground">
              Time cadastrado
            </p>

            <Badge className="mt-3">
              Ativo
            </Badge>

          </CardContent>

        </Card>



      </div>

    </div>
  );
}