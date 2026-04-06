import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    accountAssociation: {
      header: "eyJhbGciOiJ...", // Пока заглушка, заменим после шага с base.dev
      payload: "eyJkb21haW4i...",
      signature: "..."
    },
    frame: {
      version: "1",
      name: "Base Daily Check-in",
      iconUrl: `${process.env.NEXT_PUBLIC_URL}/base-square.png`,
      splashImageUrl: `${process.env.NEXT_PUBLIC_URL}/base-square.png`,
      splashBackgroundColor: "#000510",
      homeUrl: process.env.NEXT_PUBLIC_URL,
    },
  };

  return NextResponse.json(config);
}