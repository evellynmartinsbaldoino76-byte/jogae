"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Instagram, Share2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Game } from "@/context/GamesContext";

interface Team { name: string; shieldUrl?: string | null }

type ShareMode = "story" | "feed" | "result";

interface ShareGameDialogProps {
  game: Game | null;
  teams: Team[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export function ShareGameDialog({ game, teams, open, onOpenChange }: ShareGameDialogProps) {
  const [mode, setMode] = useState<ShareMode>("story");
  const [copied, setCopied] = useState(false);

  const team = useMemo(() => game ? teams.find(t => t.name.toLowerCase() === game.team.toLowerCase()) : undefined, [game, teams]);
  const opponent = useMemo(() => game ? teams.find(t => t.name.toLowerCase() === game.opponent.toLowerCase()) : undefined, [game, teams]);

  if (!game) return null;

  const finished = game.teamScore != null && game.opponentScore != null;
  const resultText = finished ? `${game.teamScore} × ${game.opponentScore}` : "×";
  const shareText = mode === "result" && finished
    ? `${game.team} ${game.teamScore} × ${game.opponentScore} ${game.opponent}`
    : `${game.team} × ${game.opponent} — ${formatDate(game.date)} às ${game.time}`;

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "Jogaê", text: shareText });
    } else {
      await navigator.clipboard?.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  }

  async function copyText() {
    await navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function downloadPlaceholder() {
    const content = `${shareText}\n${game.field}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jogae-${game.team}-vs-${game.opponent}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl rounded-3xl border-white/10 bg-slate-950 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Compartilhar jogo</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="space-y-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Formato</p>
            {([
              ["story", "Story", "1080 × 1920"],
              ["feed", "Feed", "1080 × 1350"],
              ["result", "Jogo encerrado", "Resultado"],
            ] as const).map(([value, label, detail]) => (
              <button key={value} type="button" onClick={() => setMode(value)} className={`w-full rounded-2xl border p-4 text-left transition ${mode === value ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/10 bg-white/[0.035] hover:bg-white/[0.06]"}`}>
                <div className="font-semibold">{label}</div>
                <div className="mt-1 text-xs text-slate-500">{detail}</div>
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(220px,330px)_1fr]">
            <div className={`mx-auto w-full max-w-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-2xl ${mode === "feed" ? "aspect-[4/5]" : "aspect-[9/16]"}`}>
              <div className="flex h-full flex-col items-center justify-between p-5 text-center">
                <div className="w-full text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">JOGOS</div>
                <div className="flex w-full items-center justify-center gap-3">
                  <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                    {team?.shieldUrl ? <img src={team.shieldUrl} alt="" className="h-16 w-16 object-contain" /> : <div className="text-3xl">⚽</div>}
                    <span className="max-w-full truncate text-sm font-bold">{game.team}</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-400">{resultText}</div>
                  <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                    {opponent?.shieldUrl ? <img src={opponent.shieldUrl} alt="" className="h-16 w-16 object-contain" /> : <div className="text-3xl">⚽</div>}
                    <span className="max-w-full truncate text-sm font-bold">{game.opponent}</span>
                  </div>
                </div>
                <div className="w-full space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                  <div>{formatDate(game.date)} • {game.time}</div>
                  <div className="text-slate-500">{game.field}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Prévia</p>
                <h3 className="mt-2 text-xl font-bold">{game.team} × {game.opponent}</h3>
                <p className="mt-2 text-sm text-slate-400">{formatDate(game.date)} às {game.time} • {game.field}</p>
                {mode === "result" && !finished && <p className="mt-3 text-sm text-amber-300">Adicione o placar ao jogo para liberar a arte de resultado.</p>}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <Button onClick={share} className="rounded-xl bg-emerald-500 font-semibold text-slate-950 hover:bg-emerald-400"><Share2 size={16} /> Compartilhar</Button>
                <Button onClick={copyText} variant="outline" className="rounded-xl border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"><Copy size={16} /> {copied ? "Copiado" : "Copiar"}</Button>
                <Button onClick={downloadPlaceholder} variant="outline" className="rounded-xl border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"><Download size={16} /> Baixar</Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500"><Instagram size={15} /> A arte final 1080×1920/1080×1350 será conectada ao modelo oficial do Jogaê nesta etapa.</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
