"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


export default function AgendaV2Page() {

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );


  function changeMonth(value: number) {

    const newDate = new Date(currentDate);

    newDate.setMonth(
      newDate.getMonth() + value
    );

    setCurrentDate(newDate);

  }



  const monthName = currentDate.toLocaleDateString(
    "pt-BR",
    {
      month: "long",
      year: "numeric",
    }
  );



  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between">


        <button

          onClick={() => changeMonth(-1)}

          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-3
          text-white
          hover:bg-white/10
          "

        >

          <ChevronLeft size={22}/>

        </button>



        <div className="text-center">


          <h1 className="text-3xl font-bold text-white capitalize">

            {monthName}

          </h1>


          <p className="text-emerald-400">

            Agenda mensal

          </p>


        </div>



        <button

          onClick={() => changeMonth(1)}

          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-3
          text-white
          hover:bg-white/10
          "

        >

          <ChevronRight size={22}/>

        </button>


      </div>





      <div
        className="
        grid
        grid-cols-7
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        "
      >

        {
          [
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb",
            "Dom",
          ].map((day) => (

            <div
              key={day}
              className="
              text-center
              font-semibold
              text-slate-400
              "
            >

              {day}

            </div>

          ))
        }



        {
          Array.from({
            length: 35
          }).map((_, index) => (

            <div

              key={index}

              className="
              flex
              h-20
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-black/20
              text-white
              "

            >

              {index + 1}

            </div>

          ))
        }


      </div>


    </div>

  );

}