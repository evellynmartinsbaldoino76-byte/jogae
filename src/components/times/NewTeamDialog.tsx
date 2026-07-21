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


interface NewTeamDialogProps {
  onCreate: (name: string) => boolean;
}


export function NewTeamDialog({
  onCreate,
}: NewTeamDialogProps) {


  const [name, setName] = useState("");

  const [error, setError] = useState("");



  function handleSave() {


    if (!name.trim()) {

      setError("Digite o nome do time.");

      return;

    }



    const created = onCreate(name);



    if (!created) {

      setError("Este time já está cadastrado.");

      return;

    }



    setName("");

    setError("");

  }



  return (

    <Dialog>


      <DialogTrigger>
        + Novo time
      </DialogTrigger>



      <DialogContent>


        <DialogHeader>

          <DialogTitle>
            Novo time ⚽
          </DialogTitle>

        </DialogHeader>



        <div className="space-y-4">


          <Input

            placeholder="Nome do time"

            value={name}

            onChange={(e) => {

              setName(e.target.value);

              setError("");

            }}

          />



          {error && (

            <p className="text-sm text-red-500">
              ⚠ {error}
            </p>

          )}



          <Button

            onClick={handleSave}

            className="w-full"

          >

            Salvar time

          </Button>


        </div>


      </DialogContent>


    </Dialog>

  );
}