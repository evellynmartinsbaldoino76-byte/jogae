"use client";

import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { supabase } from "@/lib/supabase";

interface NewTeamDialogProps {
  onCreate: (
    name: string,
    shieldUrl?: string
  ) => Promise<boolean>;
}

export function NewTeamDialog({
  onCreate,
}: NewTeamDialogProps) {
  const [name, setName] = useState("");
  const [shieldUrl, setShieldUrl] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setError("");

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

    try {
      setUploading(true);

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "png";

      const fileName =
        `${crypto.randomUUID()}.${extension}`;

      const filePath =
        `times/${fileName}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("team-shields")
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          }
        );

      if (uploadError) {
        console.error(
          "Erro no upload:",
          uploadError
        );

        setError(
          `Erro no upload: ${uploadError.message}`
        );

        return;
      }

      const { data } =
        supabase.storage
          .from("team-shields")
          .getPublicUrl(
            filePath
          );

      if (!data.publicUrl) {
        setError(
          "Não foi possível obter a URL do escudo."
        );

        return;
      }

      setShieldUrl(
        data.publicUrl
      );
    } catch (error) {
      console.error(
        "Erro inesperado no upload:",
        error
      );

      if (
        error instanceof Error
      ) {
        setError(
          `Erro no upload: ${error.message}`
        );
      } else {
        setError(
          "Ocorreu um erro inesperado ao enviar o escudo."
        );
      }
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }
    }
  }

  function handleRemoveShield() {
    setShieldUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  }

  async function handleSave() {
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

    const created =
      await onCreate(
        trimmedName,
        shieldUrl || undefined
      );

    if (!created) {
      setError(
        "Este time já está cadastrado."
      );
      return;
    }

    setName("");
    setShieldUrl("");
    setError("");
    setOpen(false);
  }

  function handleOpenChange(
    value: boolean
  ) {
    setOpen(value);

    if (!value) {
      setName("");
      setShieldUrl("");
      setError("");
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        handleOpenChange
      }
    >
      <DialogTrigger
        className="
          inline-flex
          h-11
          items-center
          justify-center
          rounded-xl
          bg-emerald-500
          px-5
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-emerald-500/10
          transition-all
          duration-200
          hover:bg-emerald-400
          hover:shadow-emerald-500/20
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-400/30
        "
      >
        + Novo time
      </DialogTrigger>

      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-md
          rounded-2xl
          border
          border-white/10
          bg-[#0b1420]
          p-6
          text-white
          shadow-2xl
          shadow-black/40
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-xl
              font-bold
              tracking-tight
              text-slate-100
            "
          >
            Novo time
          </DialogTitle>
        </DialogHeader>

        <div
          className="
            mt-2
            space-y-5
          "
        >
          {/* ESCUDO */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-3
            "
          >
            <div
              className="
                relative
                flex
                h-28
                w-28
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
              "
            >
              {shieldUrl ? (
                <img
                  src={shieldUrl}
                  alt="Escudo do time"
                  className="
                    h-full
                    w-full
                    object-contain
                    p-3
                  "
                />
              ) : (
                <span
                  className="
                    text-4xl
                    opacity-40
                  "
                >
                  ⚽
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              onChange={
                handleFileChange
              }
            />

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <button
                type="button"
                disabled={uploading}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-4
                  text-sm
                  font-medium
                  text-slate-200
                  transition
                  hover:bg-white/[0.09]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {uploading
                  ? "Enviando..."
                  : shieldUrl
                    ? "Trocar escudo"
                    : "Escolher escudo"}
              </button>

              {shieldUrl &&
                !uploading && (
                  <button
                    type="button"
                    onClick={
                      handleRemoveShield
                    }
                    className="
                      inline-flex
                      h-10
                      items-center
                      justify-center
                      rounded-xl
                      px-3
                      text-sm
                      font-medium
                      text-red-300
                      transition
                      hover:bg-red-400/10
                    "
                  >
                    Remover
                  </button>
                )}
            </div>

            <span
              className="
                text-xs
                text-slate-500
              "
            >
              PNG, JPG, WEBP ou SVG • até 5 MB
            </span>
          </div>

          {/* NOME */}

          <div
            className="
              space-y-2
            "
          >
            <label
              htmlFor="team-name"
              className="
                text-sm
                font-medium
                text-slate-300
              "
            >
              Nome do time
            </label>

            <Input
              id="team-name"
              type="text"
              placeholder="Digite o nome do time"
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
                  handleSave();
                }
              }}
              className="
                h-11
                rounded-xl
                border-white/10
                bg-white/[0.04]
                text-white
                placeholder:text-slate-500
                transition
                focus:border-emerald-400/40
                focus:ring-emerald-400/20
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
                text-sm
                text-red-300
              "
            >
              {error}
            </div>
          )}

          {/* SALVAR */}

          <button
            type="button"
            disabled={uploading}
            onClick={handleSave}
            className="
              inline-flex
              h-11
              w-full
              items-center
              justify-center
              rounded-xl
              bg-emerald-500
              px-4
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-emerald-500/10
              transition-all
              duration-200
              hover:bg-emerald-400
              hover:shadow-emerald-500/20
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400/30
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {uploading
              ? "Enviando escudo..."
              : "Salvar time"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}