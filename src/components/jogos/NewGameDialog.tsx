"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface Game {
  id: string;
  date: string;
  time: string;
  field: string;
  team: string;
  opponent: string;
  status: string;
}

interface NewGameDialogProps {
  teams: string[];

  games: Game[];

  onCreate: (game: Game) => void;

  onUpdate?: (
    id: string,
    game: Game
  ) => void;

  editingGame?: Game | null;

  open?: boolean;

  onOpenChange?: (
    open: boolean
  ) => void;

  showTrigger?: boolean;

  initialDate?: string;

  initialTime?: string;
}

export function NewGameDialog({
  teams,
  onCreate,
  onUpdate,
  editingGame,
  open,
  onOpenChange,
  showTrigger = true,
  initialDate,
  initialTime,
}: NewGameDialogProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [team, setTeam] = useState("");
  const [opponent, setOpponent] =
    useState("");

  useEffect(() => {
    if (editingGame) {
      setDate(editingGame.date);

      setTime(editingGame.time);

      setTeam(editingGame.team);

      setOpponent(
        editingGame.opponent ===
          "Aguardando adversário"
          ? ""
          : editingGame.opponent
      );
    } else {
      setDate(initialDate ?? "");

      setTime(initialTime ?? "");

      setTeam("");

      setOpponent("");
    }
  }, [
    editingGame,
    initialDate,
    initialTime,
  ]);

  function handleSave() {
    if (!date || !time || !team) {
      return;
    }

    const game: Game = {
      id:
        editingGame?.id ??
        crypto.randomUUID(),

      date,

      time,

      field:
        "Associação da Polícia",

      team,

      opponent:
        opponent ||
        "Aguardando adversário",

      status:
        opponent
          ? "Confirmado"
          : "Aguardando adversário",
    };

    if (editingGame) {
      onUpdate?.(
        editingGame.id,
        game
      );
    } else {
      onCreate(game);
    }

    setDate("");

    setTime("");

    setTeam("");

    setOpponent("");

    onOpenChange?.(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      {/* BOTÃO NOVO JOGO */}

      {showTrigger && (
        <DialogTrigger
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-500
            px-5
            text-sm
            font-semibold
            text-slate-950
            shadow-lg
            shadow-emerald-500/10
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-emerald-400
            hover:shadow-xl
            hover:shadow-emerald-500/20
            active:translate-y-0
            active:scale-[0.98]
          "
        >
          + Novo jogo
        </DialogTrigger>
      )}

      {/* CONTEÚDO */}

      <DialogContent
        className="
          rounded-2xl
          border-white/10
          bg-slate-950
          text-white
          shadow-2xl
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-xl
              font-bold
              text-white
            "
          >
            {editingGame
              ? "Editar jogo"
              : "Novo jogo"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          {/* DATA */}

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
                text-slate-300
              "
            >
              Data
            </label>

            <Input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="
                h-11
                rounded-xl
                border-white/10
                bg-white/5
                text-white
              "
            />
          </div>

          {/* HORÁRIO */}

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
                text-slate-300
              "
            >
              Horário
            </label>

            <Input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              disabled={!date}
              className="
                h-11
                rounded-xl
                border-white/10
                bg-white/5
                text-white
              "
            />
          </div>

          {/* LOCAL */}

          <div
            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              text-sm
              text-slate-400
            "
          >
            <span>📍 Local:</span>

            <strong
              className="
                ml-2
                font-semibold
                text-white
              "
            >
              Associação da Polícia
            </strong>
          </div>

          {/* SEU TIME */}

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
                text-slate-300
              "
            >
              Seu time
            </label>

            <Select
              value={team}
              onValueChange={(value) =>
                setTeam(value ?? "")
              }
            >
              <SelectTrigger
                className="
                  h-11
                  rounded-xl
                  border-white/10
                  bg-white/5
                  text-white
                "
              >
                <SelectValue
                  placeholder="Escolha seu time"
                />
              </SelectTrigger>

              <SelectContent
                className="
                  rounded-xl
                  border-white/10
                  bg-slate-950
                  text-white
                "
              >
                {teams.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ADVERSÁRIO */}

          <div className="space-y-2">
            <label
              className="
                text-sm
                font-medium
                text-slate-300
              "
            >
              Adversário
            </label>

            <Select
              value={opponent}
              onValueChange={(value) =>
                setOpponent(value ?? "")
              }
            >
              <SelectTrigger
                className="
                  h-11
                  rounded-xl
                  border-white/10
                  bg-white/5
                  text-white
                "
              >
                <SelectValue
                  placeholder="Escolha o adversário"
                />
              </SelectTrigger>

              <SelectContent
                className="
                  rounded-xl
                  border-white/10
                  bg-slate-950
                  text-white
                "
              >
                <SelectItem
                  value="Aguardando adversário"
                >
                  Aguardando adversário
                </SelectItem>

                {teams.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SALVAR */}

          <Button
            type="button"
            className="
              h-11
              w-full
              rounded-xl
              bg-emerald-500
              font-semibold
              text-slate-950
              transition-all
              hover:bg-emerald-400
              active:scale-[0.98]
            "
            onClick={handleSave}
          >
            {editingGame
              ? "Salvar alterações"
              : "Salvar jogo"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
