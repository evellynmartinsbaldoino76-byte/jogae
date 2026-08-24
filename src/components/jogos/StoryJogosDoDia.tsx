"use client";

import { Game } from "@/context/GamesContext";

interface StoryJogosDoDiaProps {
  games: Game[];
}

export function StoryJogosDoDia({
  games,
}: StoryJogosDoDiaProps) {
  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const todayGames = games
    .filter((game) => game.date === todayString)
    .sort((a, b) =>
      a.time.localeCompare(b.time)
    );

  function formatDate(date: string) {
    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div
      className="
        relative
        mx-auto
        aspect-[9/16]
        w-full
        max-w-[400px]
        overflow-hidden
      "
    >
      {/* LAYOUT BASE */}

      <img
        src="/story-jogo.png.png"
        alt="Story Jogos do Dia"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* CONTEÚDO DINÂMICO */}

      <div className="absolute inset-0">

        {/* DATA */}

        {todayGames.length > 0 && (
          <div
            className="
              absolute
              left-0
              right-0
              top-[20%]
              text-center
              text-lg
              font-bold
              text-white
            "
          >
            {formatDate(todayGames[0].date)}
          </div>
        )}

        {/* JOGOS */}

        <div
          className="
            absolute
            left-[8%]
            right-[8%]
            top-[38%]
            flex
            flex-col
            gap-8
          "
        >
          {todayGames.map((game) => (
            <div
              key={game.id}
              className="
                grid
                grid-cols-[1fr_auto_1fr]
                items-center
                gap-3
              "
            >

              {/* TIME 1 */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                  "
                >
                  <span
                    className="
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    ⚽
                  </span>
                </div>

                <span
                  className="
                    mt-2
                    max-w-[110px]
                    text-sm
                    font-bold
                    leading-tight
                    text-white
                  "
                >
                  {game.team}
                </span>
              </div>

              {/* HORÁRIO */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <span
                  className="
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  {game.time}
                </span>

                <span
                  className="
                    text-xl
                    font-black
                    text-white
                  "
                >
                  VS
                </span>
              </div>

              {/* TIME 2 */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                  "
                >
                  <span
                    className="
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    ⚽
                  </span>
                </div>

                <span
                  className="
                    mt-2
                    max-w-[110px]
                    text-sm
                    font-bold
                    leading-tight
                    text-white
                  "
                >
                  {game.opponent}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* SEM JOGOS */}

        {todayGames.length === 0 && (
          <div
            className="
              absolute
              left-[10%]
              right-[10%]
              top-[45%]
              text-center
              text-sm
              font-semibold
              text-white
            "
          >
            Nenhum jogo hoje
          </div>
        )}

      </div>
    </div>
  );
}