"use client";

import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useGames } from "@/context/GamesContext";

function toKey(date: Date) { return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-"); }

export default function AgendaV2Page() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { games } = useGames();
  const selectedGames = selectedDate ? games.filter((game) => game.date === toKey(selectedDate)).sort((a, b) => a.time.localeCompare(b.time)) : [];
  const formatDate = (date?: Date) => date?.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }) ?? "";

  return <div className="mx-auto max-w-7xl space-y-7">
    <header className="rounded-3xl border border-emerald-400/15 bg-gradient-to-r from-emerald-500/10 to-transparent px-6 py-7 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-400">Planejamento</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Agenda de jogos</h1><p className="mt-2 text-slate-400">Escolha uma data para consultar as partidas agendadas.</p></header>
    <div className="grid gap-6 lg:grid-cols-[390px_1fr]">
      <section className="rounded-3xl border border-white/10 bg-[#0a1720] p-5 shadow-[0_16px_40px_rgba(0,0,0,.18)]"><div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200"><CalendarDays size={17} className="text-emerald-400" />Selecione uma data</div><Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="w-full rounded-2xl text-white" /></section>
      <section className="min-h-[390px] rounded-3xl border border-white/10 bg-[#0a1720] p-6 shadow-[0_16px_40px_rgba(0,0,0,.18)]"><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-400">Programação do dia</p><h2 className="mt-2 text-2xl font-bold capitalize text-white">{formatDate(selectedDate)}</h2><p className="mt-2 text-sm text-slate-400">{selectedGames.length ? `${selectedGames.length} ${selectedGames.length === 1 ? "partida agendada" : "partidas agendadas"}` : "Nenhuma partida agendada nesta data."}</p>
        {selectedGames.length ? <div className="mt-6 space-y-3">{selectedGames.map((game) => <article key={game.id} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-4 sm:grid-cols-[100px_1fr_auto] sm:items-center"><div className="flex items-center gap-2 text-xl font-black text-emerald-300"><Clock3 size={19} />{game.time}</div><div><p className="font-bold text-white">{game.team} <span className="mx-1 text-emerald-400">×</span> {game.opponent}</p><p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400"><MapPin size={14} />{game.field}</p></div><span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">{game.status}</span></article>)}</div> : <div className="mt-8 flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[.02] text-center"><div className="rounded-2xl bg-emerald-400/10 p-4 text-emerald-300"><Users size={25} /></div><p className="mt-4 font-semibold text-white">Dia livre no campo</p><p className="mt-1 text-sm text-slate-400">Cadastre uma partida na tela de Jogos.</p></div>}
      </section>
    </div>
  </div>;
}
