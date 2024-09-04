'use client';

import React, { FC, useEffect, useState } from 'react';

interface TorrentType {
  id: string;
  category: string;
  name: string;
  added: string;
  size: string;
  seeders: string;
  leechers: string;
  imdb?: string;
  status: string;
}

interface TorrentDetailsType extends TorrentType {
  descr: string;
  num_files: number;
  info_hash: string;
}

interface TorrentFile {
  name: string;
  size: string;
}

interface TorrentDetailsProps {
  params: {
    id: string;
  };
}

const getMagnetUri = (infoHash: string, torrrentName: string): string => {
  return `magnet:?xt=urn:btih:${infoHash}&dn=${torrrentName}&tr=udp://tracker.opentrackr.org:1337&tr=udp://open.stealth.si:80/announce&tr=udp://tracker.torrent.eu.org:451/announce&tr=udp://tracker.bittor.pw:1337/announce&tr=udp://public.popcorn-tracker.org:6969/announce&tr=udp://tracker.dler.org:6969/announce&tr=udp://exodus.desync.com:6969&tr=udp://open.demonii.com:1337/announce`;
};

const Details: FC<TorrentDetailsProps> = ({ params }) => {
  const [details, setDetails] = useState<TorrentDetailsType | null>(null);
  const [files, setFiles] = useState<TorrentFile[]>([]);

  const torrentId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/details/${torrentId}`);
      const data = await response.json();

      setDetails(data.details);
      setFiles(
        data.files.map((f: { name: string[]; size: number[] }) => ({
          name: f.name[0],
          size: f.size[0],
        }))
      );
    };

    fetchData();
  }, []);

  if (!details) {
    return null;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{details.name}</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p>
            <a
              href={getMagnetUri(details.info_hash, details.name)}
              className="text-blue-600 hover:underline"
            >
              DOWNLOAD
            </a>
          </p>
          <p>
            <span className="font-semibold">Category:</span> {details.category}
          </p>
          <p>
            <span className="font-semibold">Added:</span>{' '}
            {new Date(details.added).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {details.size}
          </p>
          <p>
            <span className="font-semibold">Seeders:</span> {details.seeders}
          </p>
          <p>
            <span className="font-semibold">Leechers:</span> {details.leechers}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {details.status}
          </p>
        </div>

        <div>
          {details.imdb && (
            <p>
              <span className="font-semibold">IMDB:</span>
              <a
                href={`https://www.imdb.com/title/${details.imdb}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {details.imdb}
              </a>
            </p>
          )}
          <p>
            <span className="font-semibold">Description:</span>
            <p className="mt-2">
              {details.descr.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </p>
          <p>
            <span className="font-semibold">Number of Files:</span> {details.num_files}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Files</h2>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
          >
            <span>{file.name}</span>
            <span className="text-gray-600">{file.size}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
