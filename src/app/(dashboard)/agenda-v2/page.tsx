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

  const [selectedDay, setSelectedDay] = useState<number | null>(null);



  const monthName =
    currentDate.toLocaleDateString(
      "pt-BR",
      {
        month: "long",
        year: "numeric",
      }
    );



  const firstDay =
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();



  const daysInMonth =
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();



  function previousMonth() {

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );

    setSelectedDay(null);

  }



  function nextMonth() {

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );

    setSelectedDay(null);

  }



  const days: (number | null)[] = [];



  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    days.push(null);

  }



  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    days.push(day);

  }



  return (

    <div className="space-y-6">


      {/* Cabeçalho */}

      <div className="flex items-center justify-between">


        <button
          onClick={previousMonth}
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-3
          text-white
          transition
          hover:bg-white/10
          "
        >

          <ChevronLeft />

        </button>



        <h1
          className="
          text-3xl
          font-bold
          capitalize
          text-white
          "
        >

          {monthName}

        </h1>



        <button
          onClick={nextMonth}
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-3
          text-white
          transition
          hover:bg-white/10
          "
        >

          <ChevronRight />

        </button>


      </div>





      {/* Calendário */}

      <div
        className="
        grid
        grid-cols-7
        gap-3
        "
      >


        {
          [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb",
          ].map((day) => (

            <div
              key={day}
              className="
              text-center
              text-sm
              font-semibold
              text-slate-400
              "
            >

              {day}

            </div>

          ))
        }




        {
          days.map((day, index) => (

            <div
              key={index}
              className="
              min-h-24
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-3
              "
            >

              {
                day && (

                  <button
                    onClick={() =>
                      setSelectedDay(day)
                    }
                    className="
                    flex
                    h-full
                    w-full
                    items-start
                    text-left
                    text-white
                    hover:text-emerald-400
                    "
                  >

                    {day}

                  </button>

                )
              }


            </div>

          ))
        }


      </div>





      {/* Painel do dia */}

      {
        selectedDay && (

          <div
            className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-6
            text-white
            backdrop-blur-xl
            "
          >


            <h2
              className="
              text-xl
              font-bold
              "
            >

              Dia {selectedDay}

            </h2>



            <p
              className="
              mt-2
              text-slate-400
              "
            >

              Escolha um horário disponível

            </p>



            <div
              className="
              mt-5
              grid
              gap-3
              md:grid-cols-3
              "
            >


              {
                [
                  "19:30",
                  "20:30",
                  "21:30",
                ].map((time) => (

                  <button
                    key={time}
                    className="
                    rounded-xl
                    border
                    border-emerald-400/30
                    bg-emerald-400/10
                    p-4
                    text-emerald-300
                    transition
                    hover:bg-emerald-400/20
                    "
                  >

                    <strong>
                      {time}
                    </strong>

                    <br />

                    Livre


                  </button>

                ))
              }


            </div>


          </div>

        )
      }


    </div>

  );

}