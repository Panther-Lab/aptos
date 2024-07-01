import { updatePool } from "@/lib/pool-db";
import { updatePoolSchema } from "@/types/pool";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = updatePoolSchema.parse(body);

    if (!id) {
      return new Response("NO ID PROVIDED", {
        status: 400,
      });
    }

    await updatePool(data);

    return new NextResponse("OK", {
      status: 200,
    });
  } catch (error) {
    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 },
    );
  }
}
