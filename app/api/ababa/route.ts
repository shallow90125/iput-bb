import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ a: 123 });
}

export async function POST(request: Request) {
  return new Response(null, { status: 200 });
}
