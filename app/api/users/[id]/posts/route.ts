import Quote from "@/models/quote";
import { connectToDB } from "@/utils/database";
import { NextApiRequest } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (
  request: NextApiRequest,
  { params }: { params: Params }
) => {
  try {
    await connectToDB();

    const quotes = await Quote.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch quotes created by user", {
      status: 500,
    });
  }
};
