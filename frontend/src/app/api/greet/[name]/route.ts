import zmqRequest from '@/lib/zmq/zmqRequest';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params }) {
  const name = params.name;
  const greeting = await zmqRequest(name);
  return NextResponse.json({ greeting });
}
