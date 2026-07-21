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
  onCreate: (name: string) => void;
}


export function NewTeamDialog({ onCreate }: NewTeamDialogProps) {

  const [name, setName] = useState("");


  function handleSave() {

    if (!name.trim()) return;


    onCreate(name);


    setName("");
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
            onChange={(e) => setName(e.target.value)}
          />


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