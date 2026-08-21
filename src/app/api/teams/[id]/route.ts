import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const shieldUrl =
      typeof body.shieldUrl === "string" &&
      body.shieldUrl.trim()
        ? body.shieldUrl.trim()
        : null;

    if (!name) {
      return NextResponse.json(
        {
          error: "O nome do time é obrigatório.",
        },
        {
          status: 400,
        }
      );
    }

    const existingTeam =
      await prisma.team.findUnique({
        where: {
          id,
        },
      });

    if (!existingTeam) {
      return NextResponse.json(
        {
          error: "Time não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    const team =
      await prisma.team.update({
        where: {
          id,
        },
        data: {
          name,
          shieldUrl,
        },
      });

    return NextResponse.json(team);
  } catch (error) {
    console.error(
      "Erro ao atualizar time:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao atualizar time.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    const existingTeam =
      await prisma.team.findUnique({
        where: {
          id,
        },
      });

    if (!existingTeam) {
      return NextResponse.json(
        {
          error: "Time não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.team.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Erro ao excluir time:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao excluir time.",
      },
      {
        status: 500,
      }
    );
  }
}