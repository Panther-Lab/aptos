import { updateStatus } from "@/lib/nfts";
import { updateNFTSchema } from "@/types/nft";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = updateNFTSchema.parse(body);

    await updateStatus(id);

    return new NextResponse("OK", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 },
    );
  }
}
