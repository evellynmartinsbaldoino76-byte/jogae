"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { NewTeamDialog } from "@/components/times/NewTeamDialog";

import { TeamActions } from "@/components/times/TeamActions";

import { useTeams } from "@/context/TeamsContext";




export default function TimesPage() {


  const {
    teams,
    addTeam,
    updateTeam,
    removeTeam,
  } = useTeams();







  async function handleCreateTeam(
    name: string
  ) {


    const exists = teams.some(

      (team) =>

        team.name.toLowerCase() ===
        name.toLowerCase()

    );



    if (exists) {

      return false;

    }



    return await addTeam(name);


  }








  async function handleEditTeam(

    id: string,

    newName: string

  ) {


    await updateTeam(
  id,
  {
    id,
    name: newName,
  }
);

  }









  async function handleDeleteTeam(

    id: string

  ) {


    await removeTeam(id);


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




          <Card

            key={team.id}

          >





            <CardHeader>



              <CardTitle>

                {team.name}

              </CardTitle>



            </CardHeader>








            <CardContent>





              <p className="text-muted-foreground">

                Time cadastrado

              </p>






              <Badge className="mt-3">

                Ativo

              </Badge>









              <TeamActions



                team={team}



                onEdit={handleEditTeam}



                onDelete={handleDeleteTeam}



              />







            </CardContent>







          </Card>






        ))}







      </div>






    </div>


  );


}