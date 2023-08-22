import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // const json = await request.json();
  const rtext = await request.text();
  console.log(rtext);

  const greeting = await fetch(`http://api/Engine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: rtext }),
  });

  const text = await greeting.text();

  return NextResponse.json({ data: text });
}
