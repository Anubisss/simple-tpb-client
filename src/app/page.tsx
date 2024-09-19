'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { categoryMapping } from '@/lib/category';

const categoryShortcuts = [
  { id: '200', label: 'Video' },
  { id: '207', label: 'HD Movies' },
  { id: '208', label: 'HD TV shows' },
  { id: '211', label: '4k Movies' },
  { id: '212', label: '4k TV shows' },
];

const Home = () => {
  const [torrentName, setTorrentName] = useState('');
  const [category, setCategory] = useState('0');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const name = torrentName.trim();
    if (!name.length) {
      return;
    }

    router.push(`/result?name=${name}&category=${category}`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Simple TPB Client</h1>
      <form onSubmit={handleSearch} className="w-full max-w-2xl text-center">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={torrentName}
            autoFocus
            onChange={(e) => setTorrentName(e.target.value)}
            className="w-8/12 p-4 border border-gray-300 rounded-l-md"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-4/12 pl-1 py-4 border-t border-b border-r border-gray-300 rounded-r-md text-sm"
          >
            {Object.entries(categoryMapping).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4 flex gap-x-4 items-center justify-center flex-wrap">
          <div className="basis-full mb-2">
            <h3 className="text-xl font-semibold">Category shortcuts</h3>
          </div>
          {categoryShortcuts.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="border border-blue-300 px-4 py-2 rounded-xl hover:bg-blue-300 bg-blue-200"
              onClick={() => setCategory(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-md hover:bg-blue-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
