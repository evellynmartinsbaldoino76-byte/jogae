import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



// Buscar jogos
export async function GET() {

  const games = await prisma.game.findMany({

    orderBy: {
      createdAt: "desc",
    },

  });


  return NextResponse.json(games);

}






// Criar jogo
export async function POST(
  request: NextRequest
) {

  const body = await request.json();



  const game = await prisma.game.create({

    data: {

      date: body.date,

      time: body.time,

      field: "Associação da Polícia",

      team: body.team,

      opponent: body.opponent,

      status: body.status,

    },

  });



  return NextResponse.json(game);

}







// Editar jogo
export async function PUT(
  request: NextRequest
) {


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

    },

  });



  return NextResponse.json(game);

}








// Excluir jogo
export async function DELETE(
  request: NextRequest
) {


  const body = await request.json();



  await prisma.game.delete({

    where: {

      id: body.id,

    },

  });



  return NextResponse.json({

    success: true,

  });

}