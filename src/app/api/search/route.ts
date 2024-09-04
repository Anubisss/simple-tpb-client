import { NextResponse } from 'next/server';
import axios from 'axios';

export const POST = async (req: Request) => {
  const { q, cat } = await req.json();
  const res = await axios.get(`https://apibay.org/q.php?q=${q}&cat=${cat}`);
  return NextResponse.json(res.data);
};
