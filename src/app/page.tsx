'use client';

import React, { useState, FC } from 'react';
import Link from 'next/link';

const categoryMapping = {
  '200': 'Video',
  '208': 'HD - TV shows',
};

const getCategoryName = (categoryId: string): string => {
  const id = categoryId as keyof typeof categoryMapping;
  if (categoryMapping[id]) {
    const mainCategoryId: keyof typeof categoryMapping = (id[0] +
      '00') as keyof typeof categoryMapping;
    return `${categoryMapping[mainCategoryId]} > ${categoryMapping[id]}`;
  }
  return `Unknown (#${categoryId})`;
};

const convertTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const bytesToSize = (bytes: number): string => {
  const KB = 1024;
  const MB = KB * KB;
  const GB = MB * KB;

  if (bytes >= GB) {
    return (bytes / GB).toFixed(1) + ' GB';
  } else if (bytes >= MB) {
    return (bytes / MB).toFixed(1) + ' MB';
  } else {
    return (bytes / KB).toFixed(1) + ' KB';
  }
};

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

interface TorrentProps {
  torrent: TorrentType;
}

const Torrent: FC<TorrentProps> = ({ torrent }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4">
        <span className="text-blue-600 hover:underline">
          <Link href={`/torrent-details/${torrent.id}`}>{torrent.name}</Link>
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

interface TorrentListProps {
  torrents: TorrentType[];
}

const TorrentList: FC<TorrentListProps> = ({ torrents }) => {
  if (!torrents.length) {
    return <div className="text-center text-gray-500">No torrents found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Uploaded
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Size
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              LE
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              IMDb
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {torrents.map((torrent) => (
            <Torrent key={torrent.id} torrent={torrent} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [torrents, setTorrents] = useState([]);

  const handleSearch = async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: searchTerm }),
    });
    const data = await response.json();
    setTorrents(data);
  };

  return (
    <div>
      <h1>Simple TPB Client</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-4 py-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Search
      </button>
      <TorrentList torrents={torrents} />
    </div>
  );
};

export default Home;
