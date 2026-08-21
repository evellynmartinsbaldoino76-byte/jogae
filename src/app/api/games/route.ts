import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar jogos
export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.error("ERRO AO BUSCAR JOGOS:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar jogos",
        details: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

// Criar jogo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const game = await prisma.game.create({
      data: {
        date: body.date,
        time: body.time,
        field: "Associação da Polícia",
        team: body.team,
        opponent: body.opponent,
        status: body.status,

        // Placar
        teamScore:
          body.teamScore !== undefined &&
          body.teamScore !== null &&
          body.teamScore !== ""
            ? Number(body.teamScore)
            : null,

        opponentScore:
          body.opponentScore !== undefined &&
          body.opponentScore !== null &&
          body.opponentScore !== ""
            ? Number(body.opponentScore)
            : null,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error("ERRO AO CRIAR JOGO:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar jogo",
        details: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

// Editar jogo
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const game = await prisma.game.update({
      where: {
        id: body.id,
      },

      data: {
        date: body.date,
        time: body.time,
        field: "Associação da Polícia",
        team: body.team,
        opponent: body.opponent,
        status: body.status,

        // Placar
        teamScore:
          body.teamScore !== undefined &&
          body.teamScore !== null &&
          body.teamScore !== ""
            ? Number(body.teamScore)
            : null,

        opponentScore:
          body.opponentScore !== undefined &&
          body.opponentScore !== null &&
          body.opponentScore !== ""
            ? Number(body.opponentScore)
            : null,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error("ERRO AO EDITAR JOGO:", error);

    return NextResponse.json(
      {
        error: "Erro ao editar jogo",
        details: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

// Excluir jogo
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    await prisma.game.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("ERRO AO EXCLUIR JOGO:", error);

    return NextResponse.json(
      {
        error: "Erro ao excluir jogo",
        details: String(error),
      },
      {
        status: 500,
      }
    );
  }
}