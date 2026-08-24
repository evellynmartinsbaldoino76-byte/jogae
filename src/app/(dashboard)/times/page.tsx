"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users } from "lucide-react";

import { NewTeamDialog } from "@/components/times/NewTeamDialog";

import { TeamActions } from "@/components/times/TeamActions";

import { useTeams } from "@/context/TeamsContext";

export default function TimesPage() {
  const {
    teams,
    addTeam,
    updateTeam,
    removeTeam,
  } = useTeams();

  async function handleCreateTeam(
    name: string,
    shieldUrl?: string
  ) {
    const exists = teams.some(
      (team) =>
        team.name.toLowerCase() ===
        name.toLowerCase()
    );

    if (exists) {
      return false;
    }

    return await addTeam(
      name,
      shieldUrl
    );
  }

  async function handleEditTeam(
    id: string,
    newName: string,
    shieldUrl?: string | null
  ) {
    const currentTeam =
      teams.find(
        (team) => team.id === id
      );

    if (!currentTeam) {
      return;
    }

    await updateTeam(id, {
      ...currentTeam,
      name: newName,
      shieldUrl:
        shieldUrl !== undefined
          ? shieldUrl
          : currentTeam.shieldUrl,
    });
  }

  async function handleDeleteTeam(
    id: string
  ) {
    await removeTeam(id);
  }

  return (
    <div className="space-y-8">

      {/* CABEÇALHO */}

      <div
        className="
          rounded-3xl
          border
          border-emerald-400/15
          bg-gradient-to-r
          from-emerald-500/10
          to-transparent
          px-6
          py-7
          sm:px-8
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-emerald-400"><Users size={15} />Elencos</div>
          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-100
            "
          >
            Times cadastrados
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-400
            "
          >
            <span className="font-semibold text-emerald-300">{teams.length}</span>{" "}
            {teams.length === 1
              ? "time ativo"
              : "times ativos"}
          </p>
        </div>

        <div
          className="
            shrink-0
            self-start
            lg:self-auto
          "
        >
          <NewTeamDialog
            onCreate={
              handleCreateTeam
            }
          />
        </div>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {teams.length === 0 ? (
          <Card
            className="
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              shadow-xl
              shadow-black/10
            "
          >
            <CardContent
              className="
                p-10
                text-center
                text-slate-400
              "
            >
              Nenhum time cadastrado.
            </CardContent>
          </Card>
        ) : (
          teams.map((team) => (
            <Card
              key={team.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-slate-900
                shadow-xl
                shadow-black/15
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/15
                hover:bg-slate-800
                hover:shadow-2xl
                hover:shadow-black/25
              "
            >

              {/* CABEÇALHO DO CARD */}

              <CardHeader
                className="
                  p-6
                  pb-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  {/* ESCUDO */}

                  {team.shieldUrl && (
                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        justify-center
                      "
                    >
                      <img
                        src={
                          team.shieldUrl
                        }
                        alt={`Escudo do ${team.name}`}
                        className="
                          h-16
                          w-auto
                          max-w-20
                          object-contain
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}

                  {/* INFORMAÇÕES */}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >

                      {/* NOME */}

                      <CardTitle
                        className="
                          min-w-0
                          line-clamp-2
                          text-lg
                          font-bold
                          leading-tight
                          text-slate-100
                        "
                      >
                        {team.name}
                      </CardTitle>

                      {/* STATUS */}

                      <Badge
                        className="
                          shrink-0
                          rounded-full
                          border
                          border-emerald-400/20
                          bg-emerald-400/10
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-emerald-300
                          shadow-none
                        "
                      >
                        <ShieldCheck size={13} className="mr-1" />Ativo
                      </Badge>

                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* AÇÕES */}

              <CardContent
                className="
                  px-6
                  pb-6
                "
              >
                <div
                  className="
                    border-t
                    border-white/10
                    pt-5
                  "
                >
                  <TeamActions
                    team={team}
                    onEdit={
                      handleEditTeam
                    }
                    onDelete={
                      handleDeleteTeam
                    }
                  />
                </div>
              </CardContent>

            </Card>
          ))
        )}
      </div>

    </div>
  );
}
