import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params }) {
  const name = params.name;

  const greeting = await fetch(`http://api/Engine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: name }),
  });

  return NextResponse.json({ data: await greeting.text() });
}
