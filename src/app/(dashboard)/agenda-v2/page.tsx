
"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Clock,
} from "lucide-react";


export default function AgendaV2Page() {

  const [selectedDate, setSelectedDate] =
    useState<Date | undefined>(
      new Date()
    );


  const horarios = [
    "19:30",
    "20:30",
    "21:30",
  ];


  function capitalize(text: string) {

    if (!text) return "";

    return (
      text.charAt(0).toUpperCase() +
      text.slice(1)
    );

  }


  function formatDate(date?: Date) {

    if (!date) return "";

    const formatted = date.toLocaleDateString(
      "pt-BR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    return capitalize(formatted);

  }


  return (

    <div className="space-y-8">


      {/* Título */}

      <div>

        <h1
          className="
          text-3xl
          font-bold
          text-white
          "
        >

          Agenda de Jogos

        </h1>


        <p
          className="
          mt-2
          text-slate-400
          "
        >

          Escolha uma data para visualizar horários disponíveis.

        </p>


      </div>


      <div
        className="
        grid
        gap-6
        lg:grid-cols-[420px_1fr]
        "
      >


        {/* Calendário */}

        <Card
          className="
          border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-xl
          "
        >

          <CardContent
            className="
            p-5
            "
          >

            <Calendar

              mode="single"

              selected={selectedDate}

              onSelect={setSelectedDate}

              className="
              rounded-xl
              text-white
              "

            />


          </CardContent>


        </Card>


        {/* Horários */}

        <Card

          className="
          border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-xl
          "

        >

          <CardContent
            className="
            p-6
            "
          >


            <h2
              className="
              text-xl
              font-semibold
              text-white
              "
            >

              {formatDate(selectedDate)}

            </h2>


            <p
              className="
              mt-2
              text-slate-400
              "
            >

              Horários disponíveis

            </p>


            <div
              className="
              mt-6
              grid
              gap-4
              md:grid-cols-3
              "
            >


              {
                horarios.map((horario) => (

                  <button

                    key={horario}

                    className="
                    group
                    rounded-2xl
                    border
                    border-emerald-400/20
                    bg-emerald-400/10
                    p-5
                    text-left
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-emerald-400/50
                    hover:bg-emerald-400/20
                    "

                  >


                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      text-emerald-300
                      "
                    >

                      <Clock
                        size={18}
                      />


                      <span
                        className="
                        font-semibold
                        "
                      >

                        {horario}

                      </span>


                    </div>


                    <p
                      className="
                      mt-3
                      text-sm
                      text-slate-300
                      "
                    >

                      Disponível

                    </p>


                  </button>

                ))
              }


            </div>


          </CardContent>


        </Card>


      </div>


    </div>

  );

}

