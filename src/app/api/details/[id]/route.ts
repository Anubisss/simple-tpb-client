import { NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  // bypass TPB's cache
  const cacheTimestamp = new Date().getTime();

  const [files, details] = await Promise.all([
    axios.get(`https://apibay.org/f.php?id=${id}&timestamp=${cacheTimestamp}`),
    axios.get(`https://apibay.org/t.php?id=${id}&timestamp=${cacheTimestamp}`),
  ]);

  return NextResponse.json({ files: files.data, details: details.data });
};
