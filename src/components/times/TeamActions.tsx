"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";



interface TeamActionsProps {


  team: {

    id: string;

    name: string;

  };


  onEdit: (

    id: string,

    newName: string

  ) => Promise<void>;



  onDelete: (

    id: string

  ) => Promise<void>;


}







export function TeamActions({

  team,

  onEdit,

  onDelete,

}: TeamActionsProps) {



  const [name, setName] = useState(team.name);



  const [open, setOpen] = useState(false);








  async function handleEdit() {



    if (!name.trim()) return;



    await onEdit(

      team.id,

      name.trim()

    );



    setOpen(false);


  }








  return (


    <div className="flex gap-2 mt-4">






      <Dialog

        open={open}

        onOpenChange={setOpen}

      >





        <DialogTrigger>


          <Button variant="outline">

            Editar

          </Button>


        </DialogTrigger>








        <DialogContent>





          <DialogHeader>


            <DialogTitle>

              Editar time ⚽

            </DialogTitle>


          </DialogHeader>








          <div className="space-y-4">





            <Input



              value={name}



              onChange={(e) =>

                setName(e.target.value)

              }


            />







            <Button



              onClick={handleEdit}



              className="w-full"


            >


              Salvar alteração


            </Button>







          </div>








        </DialogContent>







      </Dialog>









      <Button



        variant="destructive"



        onClick={() =>

          onDelete(team.id)

        }


      >


        Excluir


      </Button>






    </div>



  );


}