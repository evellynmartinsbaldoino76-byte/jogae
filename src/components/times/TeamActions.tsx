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
  team: string;
  onEdit: (oldName: string, newName: string) => void;
  onDelete: (name: string) => void;
}


export function TeamActions({
  team,
  onEdit,
  onDelete,
}: TeamActionsProps) {


  const [name, setName] = useState(team);



  function handleEdit() {

    if (!name.trim()) return;


    onEdit(team, name);

  }



  return (

    <div className="flex gap-2 mt-4">


      <Dialog>


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

        onClick={() => onDelete(team)}

      >

        Excluir

      </Button>



    </div>

  );

}