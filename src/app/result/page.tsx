'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import { categoryMapping } from '@/lib/category';
import Torrent from '@/types/torrent';
import LoadingIndicator from '../components/loading-indicator';
import ErrorIndicator from '../components/error-indicator';
import Table from './table';

const isEmptyResult = (torrents: Torrent[]): boolean => {
  return torrents.length === 1 && torrents[0].id === '0';
};

const Result = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [torrentName, setTorrentName] = useState(searchParams.get('name') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [torrents, setTorrents] = useState([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const name = torrentName.trim();
    if (!name.length) {
      return;
    }

    router.push(`/result?name=${name}&category=${category}`);
  };

  useEffect(() => {
    const loadResult = async (q: string, cat: string) => {
      setLoading(true);

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q, cat }),
      });

      if (response.ok) {
        const data = await response.json();
        setTorrents(data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    const nameSearch = searchParams.get('name') || '';
    const categorySearch = searchParams.get('category') || '';
    if (nameSearch && categorySearch) {
      loadResult(nameSearch, categorySearch);
    }
  }, [searchParams]);

  const resultIsEmpty = isEmptyResult(torrents);

  return (
    <>
      <div className="p-4 flex justify-center bg-gray-50 border border-b-gray-200">
        <div className="w-full max-w-5xl">
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-700">
              <Link href="/">Simple TPB Client</Link>
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={torrentName}
              onChange={(e) => setTorrentName(e.target.value)}
              className="border rounded px-4 py-2 w-5/12"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-2 py-2 border rounded-md text-sm w-2/12"
            >
              {Object.entries(categoryMapping).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {(() => {
        if (loading) {
          return <LoadingIndicator />;
        }
        if (error) {
          return <ErrorIndicator message="Can't load the result. Try again." />;
        }
        if (resultIsEmpty) {
          return (
            <div className="text-xl text-center mt-10 font-bold">
              Your search did not match any torrents.
            </div>
          );
        }

        return <Table torrents={torrents} />;
      })()}
    </>
  );
};

export default Result;
