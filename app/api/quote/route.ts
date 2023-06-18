import Quote from "@/models/quote";
import { connectToDB } from "@/utils/database";
// import { NextApiRequest } from "next";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const quotes = await Quote.find({}).populate("creator");

    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all quotes", { status: 500 });
  }
};
