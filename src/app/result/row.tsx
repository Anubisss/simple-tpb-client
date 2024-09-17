import React, { FC } from 'react';
import Link from 'next/link';

import { getCategoryName } from '@/lib/category';
import { bytesToSize, convertTimestampToDate } from '@/lib/conversion';
import Torrent from '@/types/torrent';
import DownloadLink from '../components/download-link';
import { getUploaderClassName } from '@/lib/uploaderClassNames';

interface Props {
  torrent: Torrent;
}

const Row: FC<Props> = ({ torrent }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-4 py-4">
        <span className="text-blue-600 hover:underline">
          <Link href={`/details/${torrent.id}`}>{torrent.name}</Link>
        </span>
      </td>
      <td className="px-4 py-4 text-center">{getCategoryName(torrent.category)}</td>
      <td className="px-4 py-4 text-center">{convertTimestampToDate(+torrent.added)}</td>
      <td className="px-4 py-4 text-center">{bytesToSize(+torrent.size)}</td>
      <td className="px-4 py-4 text-center">{torrent.seeders}</td>
      <td className="px-4 py-4 text-center">{torrent.leechers}</td>
      <td className="px-4 py-4 text-center">
        <div className={getUploaderClassName(torrent.status)}>{torrent.status}</div>
      </td>
      <td className="px-4 py-4 text-center">
        <DownloadLink infoHash={torrent.info_hash} torrrentName={torrent.name} />
      </td>
    </tr>
  );
};

export default Row;
