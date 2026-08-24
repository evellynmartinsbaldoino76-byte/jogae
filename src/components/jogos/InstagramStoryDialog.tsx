"use client";

import { Download, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

interface ShareGame {
  id: string;
  date: string;
  time: string;
  field: string;
  team: string;
  opponent: string;
  status: string;
  teamScore?: number | null;
  opponentScore?: number | null;
}

interface StoryProps {
  game: ShareGame | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Team {
  id: string;
  name: string;
  shieldUrl?: string | null;
}

const ART_SIZE = { width: 1080, height: 1920 };

function formatShortDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function InstagramStoryDialog({ game, open, onOpenChange }: StoryProps) {
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  // Partidas com placar usam o card de resultado; as demais usam Jogos de Hoje.
  const isFinished = game?.teamScore != null && game?.opponentScore != null;
  // Este arquivo é a versão limpa do layout, sem nomes, placar e data de exemplo.
  const template = isFinished ? "/fim-jogo.png.png" : "/story-jogo.png.png";

  useEffect(() => {
    fetch("/api/teams")
      .then((response) => (response.ok ? response.json() : []))
      .then((data: Team[]) => setTeams(data))
      .catch((error) => console.error("Erro ao carregar os escudos:", error));
  }, []);

  function getShield(teamName: string) {
    return teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase())?.shieldUrl ?? null;
  }

  const teamShield = game ? getShield(game.team) : null;
  const opponentShield = game ? getShield(game.opponent) : null;

  useEffect(() => {
    if (!open || !game || !artworkRef.current) {
      setPreviewUrl(null);
      return;
    }

    let active = true;
    const timer = window.setTimeout(async () => {
      if (!artworkRef.current) return;
      setGenerating(true);
      try {
        await document.fonts?.ready;
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
          });
        });
        const image = await toPng(artworkRef.current, {
          width: ART_SIZE.width,
          height: ART_SIZE.height,
          pixelRatio: 1,
          cacheBust: true,
          backgroundColor: "#010101",
        });
        if (active) setPreviewUrl(image);
      } catch (error) {
        console.error("Erro ao gerar a arte para o Instagram:", error);
        if (active) setPreviewUrl(null);
      } finally {
        if (active) setGenerating(false);
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [open, game, template, teamShield, opponentShield]);

  function download() {
    if (!previewUrl || !game) return;
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = `jogae-${isFinished ? "fim-de-jogo" : "jogos-de-hoje"}-${game.date}.png`;
    link.click();
  }

  async function share() {
    if (!previewUrl || !game) return;
    try {
      const file = new File([await (await fetch(previewUrl)).blob()], `jogae-${game.date}.png`, { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: "Jogaê", text: `${game.team} × ${game.opponent}`, files: [file] });
        return;
      }
    } catch (error) {
      console.error("Erro ao compartilhar a arte:", error);
    }
    download();
  }

  if (!open || !game) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
        <div className="flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 text-white shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold"><Share2 size={21} className="text-lime-400" />Compartilhar no Instagram</h2>
              <p className="mt-1 text-sm text-slate-400">{isFinished ? "Layout de fim de jogo com placar." : "Layout de jogos de hoje."}</p>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="rounded-full text-slate-400 hover:bg-white/10 hover:text-white"><X size={20} /></Button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black p-6">
            {previewUrl ? <img src={previewUrl} alt="Pré-visualização da arte" className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl" /> : <div className="text-sm text-slate-400">{generating ? "Gerando arte..." : "Preparando pré-visualização..."}</div>}
          </div>
          <div className="flex shrink-0 flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={download} disabled={!previewUrl || generating} className="border-white/10 bg-white/[.03] text-white hover:bg-white/10"><Download size={17} className="mr-2" />Baixar imagem</Button>
            <Button type="button" onClick={share} disabled={!previewUrl || generating} className="bg-lime-400 font-semibold text-black hover:bg-lime-300"><Share2 size={17} className="mr-2" />Compartilhar</Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed left-[-99999px] top-0" aria-hidden="true">
        <div ref={artworkRef} className="relative overflow-hidden bg-black font-sans text-white" style={ART_SIZE}>
          <img src={template} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <>
            <TeamMark shield={teamShield} name={game.team} side="left" />
            <TeamMark shield={opponentShield} name={game.opponent} side="right" />
            {isFinished && (
              <>
                <div className="absolute left-[31.5%] top-[49.5%] flex h-[108px] w-[108px] items-center justify-center rounded-full border-[4px] border-lime-400 bg-black/85 text-[68px] font-black leading-none text-white shadow-[0_0_22px_rgba(181,255,0,.35)]">{game.teamScore}</div>
                <div className="absolute right-[31%] top-[49.5%] flex h-[108px] w-[108px] items-center justify-center rounded-full border-[4px] border-lime-400 bg-black/85 text-[68px] font-black leading-none text-white shadow-[0_0_22px_rgba(181,255,0,.35)]">{game.opponentScore}</div>
              </>
            )}
            <div className="absolute left-[8%] top-[78.5%] w-[28%] text-center text-[50px] font-black tracking-[-.05em]">{formatShortDate(game.date)}</div>
            <div className="absolute left-[48%] top-[78.7%] w-[16%] text-center text-[44px] font-black tracking-[-.04em]">{game.time}</div>
          </>
        </div>
      </div>
    </>
  );
}

function TeamMark({ shield, name, side }: { shield: string | null; name: string; side: "left" | "right" }) {
  const position = side === "left" ? "-left-[2%]" : "-right-[2%]";
  return (
    <div className={`absolute top-[40%] ${position} flex w-[34%] flex-col items-center text-center`}>
      <div className="flex h-[350px] w-[350px] items-center justify-center">
        {shield ? <img src={shield} alt="" crossOrigin="anonymous" className="h-[330px] w-[330px] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,.9)]" /> : <div className="flex h-[280px] w-[280px] items-center justify-center rounded-full border-4 border-lime-400 text-[110px]">⚽</div>}
      </div>
      <div className="mt-4 flex min-h-[78px] w-[360px] items-center justify-center border-y-[3px] border-lime-400 bg-black/80 px-5 py-2 shadow-[0_0_18px_rgba(181,255,0,.18)]">
        <span className="line-clamp-2 max-w-full text-[31px] font-black uppercase leading-[1.05] text-white" style={{ textShadow: "0 4px 12px rgba(0,0,0,.95)" }}>{name}</span>
      </div>
    </div>
  );
}
