import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";



interface ScheduleCardProps {

  time: string;

  status: "Livre" | "Agendado";

  teams?: string;

  onSchedule?: () => void;

  onEdit?: () => void;

  onDelete?: () => void;

}





export function ScheduleCard({

  time,

  status,

  teams,

  onSchedule,

  onEdit,

  onDelete,

}: ScheduleCardProps) {


  const available = status === "Livre";



  return (

    <Card
      className="
      border-white/10
      bg-white/5
      backdrop-blur-xl
      shadow-xl
      transition-all
      hover:border-emerald-400/40
      "
    >


      <CardHeader>


        <CardTitle

          className="
          flex
          items-center
          justify-between
          text-white
          "

        >


          <span>

            🕒 {time}

          </span>



          <Badge

            className={

              available

                ? "bg-emerald-500/20 text-emerald-400"

                : "bg-blue-500/20 text-blue-400"

            }

          >

            {status}

          </Badge>


        </CardTitle>


      </CardHeader>






      <CardContent

        className="
        space-y-4
        text-slate-300
        "

      >



        {available ? (


          <>


            <p className="text-slate-400">

              Horário disponível

            </p>





            <button

              onClick={onSchedule}

              className="
              w-full
              rounded-xl
              bg-emerald-500
              px-4
              py-2
              font-semibold
              text-black
              transition
              hover:bg-emerald-400
              "

            >

              + Agendar jogo


            </button>



          </>



        ) : (


          <>



            <p

              className="
              text-lg
              font-semibold
              text-white
              "

            >

              {teams}

            </p>





            <div className="flex gap-3">


              <button

                onClick={onEdit}

                className="
                rounded-xl
                border
                border-white/10
                px-4
                py-2
                text-sm
                text-white
                transition
                hover:bg-white/10
                "

              >

                Editar


              </button>




              <button

                onClick={onDelete}

                className="
                rounded-xl
                border
                border-red-500/30
                px-4
                py-2
                text-sm
                text-red-400
                transition
                hover:bg-red-500/10
                "

              >

                Excluir


              </button>



            </div>



          </>



        )}



      </CardContent>


    </Card>

  );

}