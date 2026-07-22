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

  const { id } = await context.params;

  const body = await request.json();


  const team = await prisma.team.update({

    where: {
      id,
    },

    data: {
      name: body.name,
    },

  });


  return NextResponse.json(team);

}






export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {


  const { id } = await context.params;



  await prisma.team.delete({

    where: {
      id,
    },

  });



  return NextResponse.json({

    success: true,

  });


}