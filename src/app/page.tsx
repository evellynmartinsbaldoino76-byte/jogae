"use client";

import { ArrowRight, CalendarDays, CircleDot, ShieldCheck, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Trophy, title: "Partidas sob controle", text: "Cadastre confrontos, adversários e resultados com clareza." },
  { icon: CalendarDays, title: "Agenda sem conflitos", text: "Visualize a programação do campo com facilidade." },
  { icon: ShieldCheck, title: "Times sempre prontos", text: "Centralize elencos e escudos em um só lugar." },
];

export default function HomePage() {
  const router = useRouter();
  return <main className="relative min-h-screen overflow-hidden bg-[#061713] text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(16,185,129,.2),transparent_31%),radial-gradient(circle_at_80%_25%,rgba(20,184,166,.12),transparent_28%),linear-gradient(135deg,#061713_0%,#071b19_48%,#091321_100%)]" />
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-12 lg:px-10">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <section>
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/15 bg-white/[.035] px-3 py-2 text-sm text-emerald-100/75"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"><CircleDot size={19} /></span>Sistema de gestão esportiva</div>
          <p className="mt-10 text-xs font-bold uppercase tracking-[.24em] text-emerald-300">Organização que entra em campo</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black leading-[.97] tracking-tight sm:text-6xl lg:text-7xl">Seu campo. <span className="text-emerald-400">Seu jogo.</span><br />Tudo no Jogaê.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">Organize partidas, acompanhe a agenda e administre seus times com uma experiência simples, rápida e profissional.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4"><Button size="lg" onClick={() => router.push("/dashboard")} className="h-12 rounded-xl bg-emerald-400 px-6 font-bold text-[#052018] shadow-lg shadow-emerald-500/20 hover:bg-emerald-300">Entrar no sistema <ArrowRight size={18} className="ml-2" /></Button><span className="text-sm text-slate-400">Feito para quem organiza futebol.</span></div>
        </section>
        <section className="relative mx-auto w-full max-w-md"><div className="absolute inset-0 scale-90 rounded-full bg-emerald-400/15 blur-3xl" /><div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[.1] to-white/[.025] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl"><div className="flex items-center justify-between text-sm text-slate-300"><span>Próxima partida</span><span className="rounded-full bg-emerald-400/15 px-3 py-1 font-semibold text-emerald-300">Confirmado</span></div><div className="my-9 flex items-center justify-between gap-4"><span className="text-center text-lg font-bold">Seu<br />time</span><div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-5xl shadow-[0_0_40px_rgba(52,211,153,.2)]">⚽</div><span className="text-center text-lg font-bold">Time<br />adversário</span></div><div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center"><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-300">Organize. Jogue. Evolua.</p></div></div></section>
      </div>
      <section className="mt-14 grid gap-4 md:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[.055]"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><Icon size={22} /></div><h2 className="text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p></article>)}</section>
    </div>
  </main>;
}
