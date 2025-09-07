import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const exchange = searchParams.get("exchange");

  if (!exchange) {
    return NextResponse.json({ error: "exchange required" }, { status: 400 });
  }

  const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
  const url = `https://finnhub.io/api/v1/crypto/symbol?exchange=${exchange}&token=${FINNHUB_API_KEY}`;

  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "finnhub error",
      },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
