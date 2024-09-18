'use client';

import React, { FC } from 'react';

import TorrentDetails from '@/types/torrentDetails';
import TorrentFile from '@/types/torrentFile';
import { getCategoryName } from '@/lib/category';
import { bytesToSize, convertTimestampToDate } from '@/lib/conversion';
import { getUploaderClassName } from '@/lib/uploaderClassNames';
import DownloadLink from '@/app/components/download-link';

interface Props {
  torrent: TorrentDetails;
  files: TorrentFile[];
}

const createLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s[\]]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const Details: FC<Props> = ({ torrent, files }) => {
  const isFilelistNotFound = files.length === 1 && files[0].size === '0';

  return (
    <div className="max-w-[1600px] mx-auto mt-6 border border-gray-200">
      <div className="bg-gray-50 mb-4 text-center p-3 border-gray-200 border-b">
        <h1 className="text-2xl font-bold">{torrent.name}</h1>
      </div>
      <div className="text-center text-3xl mb-4">
        <DownloadLink infoHash={torrent.info_hash} torrrentName={torrent.name} />
      </div>
      <div className="flex gap-12 justify-center">
        <div>
          <span className="font-bold">Category:</span> {getCategoryName(torrent.category)}
        </div>
        <div>
          <span className="font-bold">Size:</span> {bytesToSize(+torrent.size)}
        </div>
        <div>
          <span className="font-bold">Seeders:</span> {torrent.seeders}
        </div>
        <div>
          <span className="font-bold">Leechers:</span> {torrent.leechers}
        </div>
        <div>
          <span className="font-bold">Uploaded:</span> {convertTimestampToDate(+torrent.added)},{' '}
          {torrent.username} [
          <span className={getUploaderClassName(torrent.status)}>{torrent.status}</span>]
        </div>
        {torrent.imdb && (
          <div>
            <span className="font-bold">IMDB:</span>{' '}
            <a
              href={`https://www.imdb.com/title/${torrent.imdb}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {torrent.imdb}
            </a>
          </div>
        )}
        <div>
          <span className="font-bold">TPB:</span>{' '}
          <a
            href={`https://thepiratebay.org/description.php?id=${torrent.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {torrent.id}
          </a>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-center mb-1">Description</h3>
        <div className="border border-gray-200 w-[90%] mx-auto p-4 max-h-[500px] overflow-y-auto">
          {torrent.descr.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {createLinks(line)}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-8 mb-8">
        <h3 className="text-xl font-bold text-center mb-1">Files ({torrent.num_files})</h3>
        {isFilelistNotFound && <div className="mt-4 text-center">Filelist not found.</div>}
        {!isFilelistNotFound && (
          <div className="border border-gray-200 w-[90%] mx-auto p-4 max-h-[300px] overflow-y-auto">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between">
                <span>{file.name}</span>
                <span className="text-gray-600">{bytesToSize(+file.size)}</span>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
