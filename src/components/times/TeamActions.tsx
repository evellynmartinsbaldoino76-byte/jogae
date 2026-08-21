"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { supabase } from "@/lib/supabase";

interface TeamActionsProps {
  team: {
    id: string;
    name: string;
    shieldUrl?: string | null;
  };

  onEdit: (
    id: string,
    newName: string,
    shieldUrl?: string | null
  ) => Promise<void>;

  onDelete: (
    id: string
  ) => Promise<void>;
}

export function TeamActions({
  team,
  onEdit,
  onDelete,
}: TeamActionsProps) {
  const [name, setName] =
    useState(team.name);

  const [shieldUrl, setShieldUrl] =
    useState(team.shieldUrl || "");

  const [open, setOpen] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setUploading(true);

    try {
      if (!file.type.startsWith("image/")) {
        setError(
          "Escolha uma imagem válida."
        );

        return;
      }

      const maxSize =
        5 * 1024 * 1024;

      if (file.size > maxSize) {
        setError(
          "A imagem deve ter no máximo 5 MB."
        );

        return;
      }

      const fileExtension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "png";

      /*
       * Todos os escudos dos times
       * ficam dentro da mesma pasta.
       */

      const fileName =
        `times/${team.id}-${Date.now()}.${fileExtension}`;

      const {
        error: uploadError,
      } =
        await supabase.storage
          .from("team-shields")
          .upload(
            fileName,
            file,
            {
              cacheControl: "3600",
              upsert: true,
              contentType: file.type,
            }
          );

      if (uploadError) {
        console.error(
          "Erro no upload:",
          uploadError
        );

        throw uploadError;
      }

      const {
        data: publicUrlData,
      } =
        supabase.storage
          .from("team-shields")
          .getPublicUrl(
            fileName
          );

      const publicUrl =
        publicUrlData.publicUrl;

      if (!publicUrl) {
        setError(
          "Não foi possível obter a URL do escudo."
        );

        return;
      }

      setShieldUrl(
        publicUrl
      );
    } catch (error) {
      console.error(
        "Erro no upload:",
        error
      );

      setError(
        "Não foi possível enviar o escudo."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  }

  async function handleEdit() {
    const trimmedName =
      name.trim();

    if (!trimmedName) {
      setError(
        "Digite o nome do time."
      );

      return;
    }

    if (uploading) {
      setError(
        "Aguarde o upload do escudo terminar."
      );

      return;
    }

    try {
      await onEdit(
        team.id,
        trimmedName,
        shieldUrl || null
      );

      setOpen(false);
      setError("");
    } catch (error) {
      console.error(
        "Erro ao editar time:",
        error
      );

      setError(
        "Não foi possível atualizar o time."
      );
    }
  }

  function handleOpenChange(
    value: boolean
  ) {
    setOpen(value);

    if (value) {
      setName(team.name);

      setShieldUrl(
        team.shieldUrl || ""
      );

      setError("");
    }
  }

  return (
    <div
      className="
        mt-4
        flex
        flex-wrap
        gap-2
      "
    >
      {/* EDITAR */}

      <Dialog
        open={open}
        onOpenChange={
          handleOpenChange
        }
      >
        <DialogTrigger
          type="button"
          className="
            inline-flex
            h-9
            items-center
            justify-center
            rounded-full
            border
            border-slate-700/70
            bg-slate-800/40
            px-5
            text-sm
            font-medium
            text-slate-300
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white
            active:translate-y-0
            active:scale-[0.98]
          "
        >
          Editar
        </DialogTrigger>

        {/* MODAL */}

        <DialogContent
          className="
            w-[calc(100%-2rem)]
            max-w-md
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-slate-950
            p-0
            text-white
            shadow-2xl
            shadow-black/50
          "
        >
          {/* FUNDO SUTIL */}

          <div
            className="
              absolute
              inset-0
              -z-10
              bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_45%)]
            "
          />

          <div className="p-7">

            {/* CABEÇALHO */}

            <DialogHeader className="text-center">

              <DialogTitle
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-100
                "
              >
                Editar time
              </DialogTitle>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-slate-500
                "
              >
                Atualize o nome ou o
                escudo do time.
              </p>

            </DialogHeader>

            {/* CONTEÚDO */}

            <div
              className="
                mt-9
                space-y-7
              "
            >

              {/* ESCUDO */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    min-h-24
                    max-w-full
                    items-center
                    justify-center
                  "
                >

                  {shieldUrl ? (
                    <img
                      src={shieldUrl}
                      alt={`Escudo do ${name}`}
                      loading="lazy"
                      decoding="async"
                      className="
                        max-h-24
                        max-w-32
                        w-auto
                        object-contain
                        drop-shadow-lg
                      "
                      onError={(event) => {
                        console.error(
                          "Erro ao carregar escudo:",
                          shieldUrl
                        );

                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <span
                      className="
                        text-5xl
                        opacity-30
                      "
                    >
                      ⚽
                    </span>
                  )}

                </div>

                {/* TROCAR ESCUDO */}

                <label
                  htmlFor={`team-shield-${team.id}`}
                  className="
                    inline-flex
                    h-10
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-700/70
                    bg-slate-800/60
                    px-5
                    text-sm
                    font-medium
                    text-slate-300
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-slate-600
                    hover:bg-slate-800
                    hover:text-white
                    active:translate-y-0
                  "
                >
                  {uploading
                    ? "Enviando..."
                    : "Trocar escudo"}

                  <input
                    id={`team-shield-${team.id}`}
                    type="file"
                    accept="
                      image/png,
                      image/jpeg,
                      image/webp,
                      image/svg+xml
                    "
                    className="hidden"
                    onChange={
                      handleUpload
                    }
                    disabled={uploading}
                  />
                </label>

              </div>

              {/* NOME DO TIME */}

              <div>

                <label
                  htmlFor={`team-name-${team.id}`}
                  className="
                    mb-4
                    block
                    text-sm
                    font-medium
                    text-slate-300
                  "
                >
                  Nome do time
                </label>

                <Input
                  id={`team-name-${team.id}`}
                  type="text"
                  placeholder="Digite o novo nome do time"
                  value={name}
                  onChange={(event) => {
                    setName(
                      event.target.value
                    );

                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      event.preventDefault();

                      handleEdit();
                    }
                  }}
                  className="
                    h-12
                    rounded-xl
                    border
                    border-slate-700/70
                    bg-slate-900/70
                    px-4
                    text-white
                    placeholder:text-slate-600
                    shadow-none
                    transition-all
                    duration-200
                    hover:border-slate-600
                    focus:border-emerald-400/50
                    focus:bg-slate-900
                    focus:ring-2
                    focus:ring-emerald-400/10
                  "
                />

              </div>

              {/* ERRO */}

              {error && (
                <div
                  className="
                    rounded-xl
                    border
                    border-red-400/20
                    bg-red-400/10
                    px-4
                    py-3
                    text-center
                    text-sm
                    text-red-300
                  "
                >
                  {error}
                </div>
              )}

              {/* SALVAR */}

              <div className="pt-1">

                <Button
                  type="button"
                  onClick={
                    handleEdit
                  }
                  disabled={
                    uploading
                  }
                  className="
                    h-11
                    w-full
                    rounded-full
                    border
                    border-emerald-400/20
                    bg-gradient-to-r
                    from-emerald-500
                    to-emerald-400
                    px-6
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-emerald-500/20
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:from-emerald-400
                    hover:to-emerald-300
                    hover:shadow-xl
                    hover:shadow-emerald-500/25
                    active:translate-y-0
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {uploading
                    ? "Aguarde..."
                    : "Salvar alteração"}
                </Button>

              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* EXCLUIR */}

      <Button
        type="button"
        variant="ghost"
        onClick={() =>
          onDelete(team.id)
        }
        className="
          h-9
          rounded-full
          border
          border-red-400/20
          bg-red-400/10
          px-5
          text-sm
          font-medium
          text-red-300
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-red-400/30
          hover:bg-red-400/15
          hover:text-red-200
          active:translate-y-0
          active:scale-[0.98]
        "
      >
        Excluir
      </Button>

    </div>
  );
}