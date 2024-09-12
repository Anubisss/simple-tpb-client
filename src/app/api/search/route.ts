import { NextResponse } from 'next/server';
import axios from 'axios';

export const POST = async (req: Request) => {
  const { q, cat } = await req.json();

  // bypass TPB's cache
  const cacheTimestamp = new Date().getTime();

  const res = await axios.get(
    `https://apibay.org/q.php?q=${q}&cat=${cat}&timestamp=${cacheTimestamp}`
  );
  return NextResponse.json(res.data);
};
