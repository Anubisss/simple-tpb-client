import React, { FC } from 'react';
import Link from 'next/link';

import { getCategoryName } from '@/lib/category';
import { bytesToSize, convertTimestampToDate } from '@/lib/conversion';
import Torrent from '@/types/torrent';

interface Props {
  torrent: Torrent;
}

const Row: FC<Props> = ({ torrent }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4">
        <span className="text-blue-600 hover:underline">
          <Link href={`/details/${torrent.id}`}>{torrent.name}</Link>
        </span>
      </td>
      <td className="px-6 py-4">{getCategoryName(torrent.category)}</td>
      <td className="px-6 py-4">{convertTimestampToDate(+torrent.added)}</td>
      <td className="px-6 py-4">{bytesToSize(+torrent.size)}</td>
      <td className="px-6 py-4">{torrent.seeders}</td>
      <td className="px-6 py-4">{torrent.leechers}</td>
      <td className="px-6 py-4">
        {torrent.imdb && (
          <a
            href={`https://www.imdb.com/title/${torrent.imdb}/`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            IMDB
          </a>
        )}
      </td>
      <td className="px-6 py-4">{torrent.status}</td>
    </tr>
  );
};

export default Row;
