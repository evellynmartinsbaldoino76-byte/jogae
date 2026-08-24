"use client";

import {
  CalendarDays,
  Clock3,
  Download,
  MapPin,
  Share2,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

interface Team {
  id: string;
  name: string;
  shieldUrl?: string | null;
}

interface StoryShareDialogProps {
  game: ShareGame | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LIME = "#b6ff00";

export function StoryShareDialog({
  game,
  open,
  onOpenChange,
}: StoryShareDialogProps) {
  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [teamData, setTeamData] =
    useState<Team[]>([]);

  const artworkRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * ============================================================
   * BUSCA OS TIMES
   * ============================================================
   */

  useEffect(() => {
    async function loadTeams() {
      try {
        const response =
          await fetch("/api/teams");

        if (!response.ok) {
          throw new Error(
            "Erro ao carregar times."
          );
        }

        const data: Team[] =
          await response.json();

        setTeamData(data);
      } catch (error) {
        console.error(
          "Erro ao carregar escudos:",
          error
        );
      }
    }

    loadTeams();
  }, []);

  /*
   * ============================================================
   * ESCUDOS
   * ============================================================
   */

  function getTeamShield(
    teamName: string
  ) {
    const team = teamData.find(
      (item) =>
        item.name.toLowerCase() ===
        teamName.toLowerCase()
    );

    return team?.shieldUrl || null;
  }

  /*
   * ============================================================
   * DADOS DA PARTIDA
   *
   * IMPORTANTE:
   * Não fazemos return aqui.
   * Todos os Hooks precisam ser chamados antes de qualquer
   * retorno condicional.
   * ============================================================
   */

  const teamShield = game
    ? getTeamShield(game.team)
    : null;

  const opponentShield = game
    ? getTeamShield(game.opponent)
    : null;

  /*
   * A arte é 9:16.
   */

  const width = 1080;
  const height = 1920;

  /*
   * ============================================================
   * DATA
   * ============================================================
   */

  function formatDate(date: string) {
    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  }

  /*
   * ============================================================
   * GERAÇÃO DA ARTE
   * ============================================================
   */

  async function generatePreview() {
    if (!artworkRef.current || !game) {
      return;
    }

    setIsGenerating(true);

    try {
      await document.fonts?.ready;

      /*
       * Aguarda o navegador terminar
       * de renderizar os escudos.
       */

      await new Promise<void>(
        (resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve();
            });
          });
        }
      );

      /*
       * Pequena espera adicional para
       * imagens externas.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 250)
      );

      const dataUrl =
        await toPng(
          artworkRef.current,
          {
            width,
            height,
            pixelRatio: 1,
            cacheBust: true,
            backgroundColor:
              "#020202",

            style: {
              transform: "none",
              margin: "0",
            },

            filter: (node) => {
              if (
                node instanceof
                  HTMLElement &&
                node.dataset
                  .exportIgnore ===
                  "true"
              ) {
                return false;
              }

              return true;
            },
          }
        );

      setPreviewUrl(dataUrl);
    } catch (error) {
      console.error(
        "Erro ao gerar arte:",
        error
      );

      setPreviewUrl(null);
    } finally {
      setIsGenerating(false);
    }
  }

  /*
   * ============================================================
   * ATUALIZA A PRÉ-VISUALIZAÇÃO
   *
   * ESTE HOOK FICA ANTES DE QUALQUER RETURN.
   * ============================================================
   */

  useEffect(() => {
    if (!open || !game) {
      setPreviewUrl(null);
      return;
    }

    const timeout =
      window.setTimeout(() => {
        generatePreview();
      }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    open,
    game?.id,
    game?.date,
    game?.time,
    game?.field,
    game?.team,
    game?.opponent,
    game?.status,
    game?.teamScore,
    game?.opponentScore,
    teamShield,
    opponentShield,
  ]);

  /*
   * ============================================================
   * DOWNLOAD
   * ============================================================
   */

  function downloadImage() {
    if (!previewUrl || !game) {
      return;
    }

    const link =
      document.createElement("a");

    link.href = previewUrl;

    link.download =
      `jogae-fim-de-jogo-${game.date}.png`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  /*
   * ============================================================
   * COMPARTILHAR
   * ============================================================
   */

  async function shareImage() {
    if (!previewUrl || !game) {
      return;
    }

    try {
      const response =
        await fetch(previewUrl);

      const blob =
        await response.blob();

      const file =
        new File(
          [blob],
          `jogae-fim-de-jogo-${game.date}.png`,
          {
            type: "image/png",
          }
        );

      if (
        navigator.share &&
        navigator.canShare?.({
          files: [file],
        })
      ) {
        await navigator.share({
          title: "Jogaê",
          text:
            `${game.team} × ${game.opponent}`,
          files: [file],
        });

        return;
      }

      downloadImage();
    } catch (error) {
      console.error(
        "Erro ao compartilhar:",
        error
      );

      downloadImage();
    }
  }

  /*
   * ============================================================
   * A PARTIR DAQUI PODE HAVER RETURN CONDICIONAL
   * ============================================================
   */

  if (!open || !game) {
    return null;
  }

  return (
    <>
      {/* ========================================================
          MODAL
      ======================================================== */}

      <div
        className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/90
          p-4
          backdrop-blur-md
        "
      >
        <div
          className="
            flex
            max-h-[96vh]
            w-full
            max-w-6xl
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-slate-950
            text-white
            shadow-2xl
          "
        >
          {/* ==================================================
              CABEÇALHO
          ================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-white/10
              px-6
              py-5
            "
          >
            <div>
              <h2
                className="
                  flex
                  items-center
                  gap-2
                  text-xl
                  font-bold
                "
              >
                <Share2
                  size={21}
                  className="text-emerald-400"
                />

                Compartilhar no Instagram
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                Arte oficial do jogo em formato Story.
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                onOpenChange(false)
              }
              className="
                rounded-full
                text-slate-400
                hover:bg-white/10
                hover:text-white
              "
            >
              <X size={20} />
            </Button>
          </div>

          {/* ==================================================
              PREVIEW
          ================================================== */}

          <div
            className="
              flex
              min-h-0
              flex-1
              items-center
              justify-center
              overflow-auto
              bg-black
              p-6
            "
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Pré-visualização da arte"
                className="
                  max-h-[72vh]
                  max-w-full
                  rounded-2xl
                  object-contain
                  shadow-2xl
                "
              />
            ) : (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  gap-4
                  text-center
                "
              >
                <div
                  className="
                    h-10
                    w-10
                    animate-spin
                    rounded-full
                    border-2
                    border-white/10
                    border-t-emerald-400
                  "
                />

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  {isGenerating
                    ? "Gerando arte oficial..."
                    : "Preparando pré-visualização..."}
                </p>
              </div>
            )}
          </div>

          {/* ==================================================
              RODAPÉ
          ================================================== */}

          <div
            className="
              flex
              shrink-0
              flex-col
              gap-3
              border-t
              border-white/10
              p-5
              sm:flex-row
              sm:justify-end
            "
          >
            <Button
              type="button"
              variant="outline"
              onClick={downloadImage}
              disabled={
                !previewUrl ||
                isGenerating
              }
              className="
                h-11
                rounded-xl
                border-white/10
                bg-white/[0.03]
                text-white
                hover:bg-white/10
              "
            >
              <Download
                size={17}
                className="mr-2"
              />

              Baixar imagem
            </Button>

            <Button
              type="button"
              onClick={shareImage}
              disabled={
                !previewUrl ||
                isGenerating
              }
              className="
                h-11
                rounded-xl
                bg-emerald-500
                font-semibold
                text-slate-950
                shadow-lg
                hover:bg-emerald-400
              "
            >
              <Share2
                size={17}
                className="mr-2"
              />

              Compartilhar
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================
          ARTE OFICIAL — 1080 × 1920
      ======================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          left-[-99999px]
          top-0
        "
        aria-hidden="true"
      >
        <div
          ref={artworkRef}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="
            relative
            isolate
            overflow-hidden
            bg-black
            font-sans
            text-white
          "
        >
          {/* ==================================================
              FUNDO PRINCIPAL
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-black
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-cover
              bg-center
            "
            style={{
              backgroundImage:
                "url('/images/story-stadium-bg.jpg')",
            }}
          />

          {/* ==================================================
              ESCURECIMENTO DO FUNDO
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-black/45
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-black/10
              via-black/35
              to-black/80
            "
          />

          {/* ==================================================
              BRILHO VERDE CENTRAL
          ================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-[30%]
              h-[900px]
              w-[900px]
              -translate-x-1/2
              rounded-full
              bg-lime-400/10
              blur-[150px]
            "
          />

          {/* ==================================================
              MOLDURA EXTERNA
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              border-[16px]
              border-lime-400
              shadow-[inset_0_0_45px_rgba(181,255,0,0.35)]
            "
          />

          {/* ==================================================
              CANTOS / PINCELADAS
          ================================================== */}

          <div
            className="
              absolute
              -left-[160px]
              -top-[120px]
              h-[260px]
              w-[650px]
              rotate-[-18deg]
              bg-lime-400
              opacity-90
            "
          />

          <div
            className="
              absolute
              -right-[160px]
              -top-[120px]
              h-[260px]
              w-[650px]
              rotate-[18deg]
              bg-lime-400
              opacity-90
            "
          />

          <div
            className="
              absolute
              -bottom-[130px]
              -left-[180px]
              h-[260px]
              w-[700px]
              rotate-[18deg]
              bg-lime-400
              opacity-90
            "
          />

          <div
            className="
              absolute
              -bottom-[130px]
              -right-[180px]
              h-[260px]
              w-[700px]
              rotate-[-18deg]
              bg-lime-400
              opacity-90
            "
          />

          {/* ==================================================
              TÍTULO
          ================================================== */}

          <div
            className="
              absolute
              left-0
              right-0
              top-[7%]
              text-center
            "
          >
            <div
              className="
                text-[150px]
                font-black
                uppercase
                leading-[0.85]
                tracking-[-0.07em]
                text-lime-400
                [text-shadow:0_8px_25px_rgba(0,0,0,0.8)]
              "
            >
              FIM
            </div>

            <div
              className="
                relative
                mt-2
                inline-block
                text-[91px]
                font-black
                uppercase
                italic
                leading-none
                tracking-[-0.055em]
                text-white
                [text-shadow:0_8px_20px_rgba(0,0,0,0.9)]
              "
            >
              DE JOGO!
            </div>

            <div
              className="
                mx-auto
                mt-[-4px]
                h-[12px]
                w-[610px]
                rotate-[-2deg]
                bg-lime-400
                shadow-[0_0_25px_rgba(181,255,0,0.7)]
              "
            />
          </div>

          {/* ==================================================
              PARTIDA
          ================================================== */}

          <div
            className="
              absolute
              left-[6%]
              right-[6%]
              top-[30%]
              flex
              items-center
              justify-between
            "
          >
            {/* TIME 1 */}

            <div
              className="
                flex
                w-[34%]
                flex-col
                items-center
                text-center
              "
            >
              <div
                className="
                  flex
                  h-[300px]
                  w-[300px]
                  items-center
                  justify-center
                "
              >
                {teamShield ? (
                  <img
                    src={teamShield}
                    alt=""
                    crossOrigin="anonymous"
                    className="
                      max-h-[285px]
                      max-w-[285px]
                      object-contain
                      drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]
                    "
                  />
                ) : (
                  <div
                    className="
                      h-[250px]
                      w-[250px]
                      rounded-full
                      border-4
                      border-lime-400
                    "
                  />
                )}
              </div>

              <div
                className="
                  mt-4
                  text-[38px]
                  font-black
                  uppercase
                  leading-none
                  text-white
                  [text-shadow:0_5px_15px_rgba(0,0,0,0.9)]
                "
              >
                {game.team}
              </div>
            </div>

            {/* VS */}

            <div
              className="
                relative
                flex
                w-[25%]
                items-center
                justify-center
              "
            >
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[360px]
                  w-[12px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rotate-[38deg]
                  bg-lime-400
                  shadow-[0_0_25px_rgba(181,255,0,0.55)]
                "
              />

              <div
                className="
                  relative
                  z-10
                  text-[150px]
                  font-black
                  italic
                  leading-none
                  tracking-[-0.1em]
                  text-lime-400
                  [text-shadow:0_10px_30px_rgba(0,0,0,0.9)]
                "
              >
                VS
              </div>
            </div>

            {/* TIME 2 */}

            <div
              className="
                flex
                w-[34%]
                flex-col
                items-center
                text-center
              "
            >
              <div
                className="
                  flex
                  h-[300px]
                  w-[300px]
                  items-center
                  justify-center
                "
              >
                {opponentShield ? (
                  <img
                    src={opponentShield}
                    alt=""
                    crossOrigin="anonymous"
                    className="
                      max-h-[285px]
                      max-w-[285px]
                      object-contain
                      drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]
                    "
                  />
                ) : (
                  <div
                    className="
                      h-[250px]
                      w-[250px]
                      rounded-full
                      border-4
                      border-lime-400
                    "
                  />
                )}
              </div>

              <div
                className="
                  mt-4
                  text-[38px]
                  font-black
                  uppercase
                  leading-none
                  text-white
                  [text-shadow:0_5px_15px_rgba(0,0,0,0.9)]
                "
              >
                {game.opponent}
              </div>
            </div>
          </div>

          {/* ==================================================
              FAIXA PREPARE-SE
          ================================================== */}

          <div
            className="
              absolute
              left-[14%]
              right-[14%]
              top-[54%]
              h-[105px]
              rounded-[28px]
              border-[4px]
              border-lime-400
              bg-black/65
              shadow-[0_0_25px_rgba(181,255,0,0.2)]
            "
          >
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                gap-5
              "
            >
              <CalendarDays
                size={48}
                strokeWidth={2}
                className="text-lime-400"
              />

              <span
                className="
                  text-[34px]
                  font-black
                  uppercase
                  text-white
                "
              >
                PREPARE-SE PARA
              </span>

              <span
                className="
                  text-[34px]
                  font-black
                  uppercase
                  text-lime-400
                "
              >
                GRANDES PARTIDAS!
              </span>
            </div>
          </div>

          {/* ==================================================
              INFORMAÇÕES
          ================================================== */}

          <div
            className="
              absolute
              left-[7%]
              right-[7%]
              top-[61%]
              overflow-hidden
              rounded-[30px]
              border-[4px]
              border-lime-400
              bg-black/65
              shadow-[0_0_30px_rgba(181,255,0,0.18)]
            "
          >
            <div
              className="
                grid
                grid-cols-3
              "
            >
              {/* DATA */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  px-4
                  py-8
                  text-center
                "
              >
                <CalendarDays
                  size={58}
                  strokeWidth={1.8}
                  className="
                    mb-3
                    text-lime-400
                  "
                />

                <span
                  className="
                    text-[26px]
                    font-black
                    uppercase
                    text-lime-400
                  "
                >
                  DATA
                </span>

                <span
                  className="
                    mt-3
                    whitespace-nowrap
                    text-[30px]
                    font-black
                    text-white
                  "
                >
                  {formatDate(game.date)}
                </span>
              </div>

              {/* HORÁRIO */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  border-x-[3px]
                  border-lime-400
                  px-4
                  py-8
                  text-center
                "
              >
                <Clock3
                  size={58}
                  strokeWidth={1.8}
                  className="
                    mb-3
                    text-lime-400
                  "
                />

                <span
                  className="
                    text-[26px]
                    font-black
                    uppercase
                    text-lime-400
                  "
                >
                  HORÁRIO
                </span>

                <span
                  className="
                    mt-3
                    text-[32px]
                    font-black
                    text-white
                  "
                >
                  {game.time}
                </span>
              </div>

              {/* LOCAL */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  px-4
                  py-8
                  text-center
                "
              >
                <MapPin
                  size={58}
                  strokeWidth={1.8}
                  className="
                    mb-3
                    text-lime-400
                  "
                />

                <span
                  className="
                    text-[26px]
                    font-black
                    uppercase
                    text-lime-400
                  "
                >
                  LOCAL
                </span>

                <span
                  className="
                    mt-3
                    max-w-[280px]
                    truncate
                    text-[30px]
                    font-black
                    uppercase
                    text-white
                  "
                >
                  {game.field}
                </span>
              </div>
            </div>
          </div>

          {/* ==================================================
              LOGO CAMPO SOCIETY
          ================================================== */}

          <div
            className="
              absolute
              bottom-[7%]
              left-1/2
              flex
              -translate-x-1/2
              flex-col
              items-center
            "
          >
            <div
              className="
                flex
                h-[205px]
                w-[205px]
                flex-col
                items-center
                justify-center
                rounded-full
                border-[5px]
                border-lime-400
                bg-black/70
                text-center
                shadow-[0_0_30px_rgba(181,255,0,0.25)]
              "
            >
              <div
                className="
                  text-[25px]
                  font-black
                  uppercase
                  leading-none
                  text-white
                "
              >
                ⚽
              </div>

              <div
                className="
                  mt-2
                  text-[27px]
                  font-black
                  uppercase
                  leading-none
                  text-white
                "
              >
                CAMPO
              </div>

              <div
                className="
                  mt-1
                  text-[28px]
                  font-black
                  uppercase
                  leading-none
                  text-lime-400
                "
              >
                SOCIETY
              </div>

              <div
                className="
                  mt-1
                  text-[26px]
                  font-black
                  uppercase
                  leading-none
                  text-white
                "
              >
                A.R.S.S
              </div>
            </div>

            {/* INSTAGRAM */}

            <div
              className="
                mt-6
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  h-[3px]
                  w-[95px]
                  bg-lime-400
                "
              />

              <span
                className="
                  text-[25px]
                  font-semibold
                  text-white
                "
              >
                ◎ @camposocietyarss
              </span>

              <div
                className="
                  h-[3px]
                  w-[95px]
                  bg-lime-400
                "
              />
            </div>
          </div>

          {/* ==================================================
              VINHETA
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]
            "
          />

          {/* ==================================================
              BORDA INTERNA
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[35px]
              border
              border-white/10
            "
          />
        </div>
      </div>
    </>
  );
}