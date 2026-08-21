import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error(
      "Erro ao buscar times:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao buscar times.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

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
          error:
            "O nome do time é obrigatório.",
        },
        {
          status: 400,
        }
      );
    }

    const team =
      await prisma.team.create({
        data: {
          name,
          shieldUrl,
        },
      });

    return NextResponse.json(team);
  } catch (error) {
    console.error(
      "Erro ao criar time:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao criar time.",
      },
      {
        status: 500,
      }
    );
  }
}