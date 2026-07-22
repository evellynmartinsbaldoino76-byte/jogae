"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";


interface DeleteGameDialogProps {

  open: boolean;

  onOpenChange: (open: boolean) => void;

  teams?: string;

  onConfirm: () => void;

}



export function DeleteGameDialog({

  open,

  onOpenChange,

  teams,

  onConfirm,

}: DeleteGameDialogProps) {


  function handleDelete() {

    onConfirm();

    onOpenChange(false);

  }



  return (

    <Dialog

      open={open}

      onOpenChange={onOpenChange}

    >


      <DialogContent

        className="
        border-white/10
        bg-slate-950
        text-white
        backdrop-blur-xl
        "

      >


        <DialogHeader>


          <DialogTitle

            className="
            text-xl
            "

          >

            Excluir jogo ⚽

          </DialogTitle>


        </DialogHeader>





        <div className="space-y-5">


          <p className="text-slate-300">


            Deseja realmente excluir esta partida?


          </p>



          <div

            className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-4
            text-center
            font-semibold
            text-white
            "

          >

            {teams}


          </div>






          <div

            className="
            flex
            justify-end
            gap-3
            "

          >


            <Button

              variant="outline"

              onClick={() =>
                onOpenChange(false)
              }

              className="
              border-white/10
              text-white
              hover:bg-white/10
              "

            >

              Cancelar


            </Button>





            <Button

              onClick={handleDelete}

              className="
              bg-red-500
              text-white
              hover:bg-red-400
              "

            >

              Excluir


            </Button>



          </div>


        </div>


      </DialogContent>


    </Dialog>

  );

}