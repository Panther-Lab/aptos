import { createPool } from "@/lib/pool-db";
import { generateRandomIntegerId } from "@/lib/utils";
import { pool } from "@/types/pool";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = body as pool;
    const id = generateRandomIntegerId(100, 200);

    await createPool({ id, ...data });

    return new NextResponse("OK", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not create Pool, Please try later", {
      status: 500,
    });
  }
}
