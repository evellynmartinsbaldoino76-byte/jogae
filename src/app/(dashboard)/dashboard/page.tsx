"use client";

import {
  CalendarDays,
  MapPin,
  Plus,
  Users,
  Trophy,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";


export default function DashboardPage() {


  const router = useRouter();


  function novoJogo() {

    router.push("/jogos");

  }




  return (

    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-950 to-blue-950 p-6">


      <div className="space-y-8">





        {/* Cabeçalho */}


        <div>


          <h1 className="text-4xl font-bold text-white">

            Olá, Gian 👋

          </h1>


          <p className="mt-2 text-slate-300">

            Bem-vindo ao painel de controle do Jogaê.

          </p>


        </div>









        {/* Resumo */}


        <div className="grid gap-6 md:grid-cols-3">





          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl shadow-xl">


            <CardHeader>


              <CalendarDays className="text-emerald-400" />


              <CardTitle>

                Próximo jogo

              </CardTitle>


            </CardHeader>


            <CardContent>


              <p className="text-5xl font-bold text-emerald-400">

                1

              </p>


              <p className="mt-2 text-slate-400">

                jogo confirmado

              </p>


            </CardContent>


          </Card>








          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl shadow-xl">


            <CardHeader>


              <Users className="text-emerald-400" />


              <CardTitle>

                Meus times

              </CardTitle>


            </CardHeader>


            <CardContent>


              <p className="text-5xl font-bold text-emerald-400">

                3

              </p>


              <p className="mt-2 text-slate-400">

                times cadastrados

              </p>


            </CardContent>


          </Card>








          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl shadow-xl">


            <CardHeader>


              <MapPin className="text-emerald-400" />


              <CardTitle>

                Campos

              </CardTitle>


            </CardHeader>


            <CardContent>


              <p className="text-5xl font-bold text-emerald-400">

                5

              </p>


              <p className="mt-2 text-slate-400">

                campos cadastrados

              </p>


            </CardContent>


          </Card>





        </div>








        {/* Ação principal */}



        <Button

          size="lg"

          onClick={novoJogo}

          className="bg-emerald-500 font-bold text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"

        >

          <Plus className="mr-2"/>

          Agendar novo jogo


        </Button>









        {/* Próxima partida */}



        <Card className="border-white/10 bg-white/5 text-white backdrop-blur-xl shadow-xl">


          <CardHeader>


            <div className="flex items-center gap-3">


              <Trophy className="text-emerald-400"/>


              <CardTitle>

                Próxima Partida

              </CardTitle>


            </div>


          </CardHeader>





          <CardContent>



            <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center">





              <h2 className="text-3xl font-bold">


                Feras FC


                <span className="mx-4 text-emerald-400">

                  X

                </span>


                Lobos FC


              </h2>






              <div className="mt-6 space-y-2 text-slate-300">


                <p>

                  🕒 Hoje às 20:30

                </p>


                <p>

                  🏟 Arena Central

                </p>


              </div>






              <Badge className="mt-6 bg-emerald-500 px-4 py-1 text-black">


                Confirmado


              </Badge>





            </div>


          </CardContent>



        </Card>







      </div>


    </main>

  );

}