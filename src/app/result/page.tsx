'use client';

import React, { useState, useEffect, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { categoryMapping } from '@/lib/category';
import Torrent from '@/types/torrent';
import LoadingIndicator from '../components/loading-indicator';
import ErrorIndicator from '../components/error-indicator';
import Table from './table';
import {
  SortBy,
  SortDirection,
  TorrentSearchResultSortCriteria,
} from '@/types/torrentSearchResultSortCriteria';
import QuickFilters from './quick-filters';
import { TorrentSearchResultFilters } from '@/types/torrentSearchResultFilters';

const checkboxFilterKeys: (keyof Omit<TorrentSearchResultFilters, 'name'>)[] = [
  '720p',
  '1080p',
  '2160p',
  'HDR',
  'DV',
  'Atmos',
  'Trusted uploader',
];

const isEmptyResult = (torrents: Torrent[]): boolean => {
  return torrents.length === 0 || (torrents.length === 1 && torrents[0].id === '0');
};

interface Props {
  searchParams: {
    name: string;
    category: string;
  };
}

const Result: FC<Props> = ({ searchParams }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [torrentName, setTorrentName] = useState(searchParams.name || '');
  const [category, setCategory] = useState(searchParams.category || '');

  const [torrents, setTorrents] = useState<Torrent[]>([]);
  const [filteredSortedTorrents, setFilteredSortedTorrents] = useState<Torrent[]>([]);

  const [filters, setFilters] = useState<TorrentSearchResultFilters>({
    name: '',
    '720p': false,
    '1080p': false,
    '2160p': false,
    HDR: false,
    DV: false,
    Atmos: false,
    'Trusted uploader': false,
  });
  const [sortCriteria, setSortCriteria] = useState<TorrentSearchResultSortCriteria>({
    by: null,
    direction: 'asc',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const name = torrentName.trim();
    if (!name.length) {
      return;
    }

    router.push(`/result?name=${name}&category=${category}`);
  };

  const handleFilterChange = (filterKey: keyof TorrentSearchResultFilters, value?: string) => {
    setFilters((prev) => {
      if (filterKey === 'name') {
        return {
          ...prev,
          name: value as string,
        };
      }
      return {
        ...prev,
        [filterKey]: !prev[filterKey],
      };
    });
  };

  const handleSortCriteriaChange = (by: SortBy, direction: SortDirection) => {
    if (sortCriteria.by === by && sortCriteria.direction === direction) {
      setSortCriteria({
        by: null,
        direction: sortCriteria.direction,
      });
    } else {
      setSortCriteria({
        by,
        direction,
      });
    }
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

    const nameSearch = searchParams.name || '';
    const categorySearch = searchParams.category || '';
    if (nameSearch && categorySearch) {
      loadResult(nameSearch, categorySearch);
    }
  }, [searchParams]);

  useEffect(() => {
    let filteredSorted = torrents.slice();

    if (filters.name) {
      const nameFilter = filters.name.trim().toLowerCase();
      if (nameFilter) {
        filteredSorted = filteredSorted.filter((t) => t.name.toLowerCase().includes(nameFilter));
      }
    }

    for (const key of checkboxFilterKeys) {
      if (filters[key]) {
        if (key === 'Trusted uploader') {
          filteredSorted = filteredSorted.filter((t) => t.status === 'trusted');
          continue;
        }
        filteredSorted = filteredSorted.filter((t) =>
          t.name.toLowerCase().includes(key.toLowerCase())
        );
      }
    }

    if (sortCriteria.by) {
      filteredSorted = filteredSorted.sort((a: Torrent, b: Torrent) => {
        const sortKey = sortCriteria.by as SortBy;

        const aValue = +a[sortKey];
        const bValue = +b[sortKey];

        return sortCriteria.direction === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    setFilteredSortedTorrents(filteredSorted);
  }, [torrents, filters, sortCriteria]);

  const resultIsEmpty = isEmptyResult(torrents);

  return (
    <>
      <div className="p-4 flex justify-center bg-gray-50 border border-b-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 absolute left-4">
          <Link href="/">Simple TPB Client</Link>
        </h1>
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={torrentName}
            onChange={(e) => setTorrentName(e.target.value)}
            className="border rounded px-4 py-2 w-[420px]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-2 py-2 border rounded-md text-sm"
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

        return (
          <>
            <QuickFilters filters={filters} onFilterChange={handleFilterChange} />
            <Table
              torrents={filteredSortedTorrents}
              sortCriteria={sortCriteria}
              onSortCriteriaChange={handleSortCriteriaChange}
            />
          </>
        );
      })()}
    </>
  );
};

export default Result;
