"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { NewTeamDialog } from "@/components/times/NewTeamDialog";


export default function TimesPage() {

  const [teams, setTeams] = useState([
    "Feras FC",
    "Lobos FC",
  ]);


  function handleCreateTeam(name: string) {

    const exists = teams.some(
      (team) =>
        team.toLowerCase() === name.toLowerCase()
    );


    if (exists) {
      return false;
    }


    setTeams((current) => [
      ...current,
      name,
    ]);


    return true;
  }


  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between">


        <div>

          <h1 className="text-3xl font-bold">
            Times cadastrados ⚽
          </h1>


          <p className="text-muted-foreground">
            {teams.length} times ativos
          </p>

        </div>



        <NewTeamDialog
          onCreate={handleCreateTeam}
        />


      </div>



      <div className="grid gap-4 md:grid-cols-3">


        {teams.map((team) => (

          <Card key={team}>

            <CardHeader>

              <CardTitle>
                {team}
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

        ))}


      </div>


    </div>

  );

}