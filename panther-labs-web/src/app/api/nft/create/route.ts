import { createNFT } from "@/lib/nfts";
import { generateRandomIntegerId } from "@/lib/utils";
import { NFTFormSchema } from "@/types/nft";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = NFTFormSchema.parse(body);
    const id = generateRandomIntegerId(100, 200);

    await createNFT({ id, ...data });

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
