"use client";

import { useRouter } from "next/navigation";

import {
  ArrowRight,
  CalendarDays,
  CircleDot,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";


export default function HomePage() {


  const router = useRouter();



  function entrarNoSistema() {

    router.push("/dashboard");

  }




  return (

    <main className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-green-950 to-slate-950">


      <div className="w-full max-w-6xl px-6 py-12">






        <div className="grid items-center gap-16 md:grid-cols-2">







          <div className="space-y-8 text-white">





            <div className="flex items-center gap-3">


              <div className="rounded-full bg-emerald-500/10 p-3">


                <CircleDot

                  size={34}

                  className="text-emerald-400"

                />


              </div>


              <span className="text-sm font-light tracking-wide text-slate-400">

                Sistema de gestão esportiva

              </span>


            </div>









            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">


              Bem-vindo ao


              <span className="block text-emerald-400">

                Jogaê

              </span>


            </h1>









            <p className="max-w-md text-base leading-relaxed text-slate-300 md:text-lg">


              Organize jogos, controle horários e mantenha seu campo sempre preparado.


            </p>









            <Button

              size="lg"

              onClick={entrarNoSistema}

              className="group bg-gradient-to-r from-emerald-500 to-green-400 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-emerald-500/30"

            >

              Entrar no sistema


              <ArrowRight

                className="ml-2 transition-transform group-hover:translate-x-1"

              />


            </Button>






          </div>









          <div className="flex justify-center">



            <div className="relative">


              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl" />



              <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-emerald-500/10 text-8xl backdrop-blur-sm">


                ⚽


              </div>


            </div>



          </div>







        </div>









        <div className="mt-20 grid gap-6 md:grid-cols-3">








          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-white/10">


            <Trophy className="mb-4 text-emerald-400" />


            <h3 className="font-semibold">

              Jogos organizados

            </h3>


            <p className="mt-2 text-sm leading-relaxed text-slate-400">

              Controle partidas e adversários.

            </p>


          </div>








          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-white/10">


            <CalendarDays className="mb-4 text-emerald-400" />


            <h3 className="font-semibold">

              Agenda inteligente

            </h3>


            <p className="mt-2 text-sm leading-relaxed text-slate-400">

              Evite conflitos de horários.

            </p>


          </div>








          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-white/10">


            <CircleDot className="mb-4 text-emerald-400" />


            <h3 className="font-semibold">

              Campo organizado

            </h3>


            <p className="mt-2 text-sm leading-relaxed text-slate-400">

              Tenha tudo em um só lugar.

            </p>


          </div>






        </div>







      </div>


    </main>

  );

}