'use client';

import React, { FC } from 'react';

import Torrent from '@/types/torrent';
import Row from './row';
import TableHeaderSortButton from './table-header-sort-button';
import {
  SortBy,
  SortDirection,
  TorrentSearchResultSortCriteria,
} from '@/types/torrentSearchResultSortCriteria';

interface Props {
  torrents: Torrent[];
  sortCriteria: TorrentSearchResultSortCriteria;
  onSortCriteriaChange: (by: SortBy, direction: SortDirection) => void;
}

const Table: FC<Props> = ({ torrents, sortCriteria, onSortCriteriaChange }) => {
  if (!torrents.length) {
    return <div className="text-center mt-8">No torrents found.</div>;
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
              <TableHeaderSortButton
                sorted={sortCriteria.by === 'added'}
                direction={sortCriteria.direction}
                onClick={(direction) => onSortCriteriaChange('added', direction)}
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Size
              <TableHeaderSortButton
                sorted={sortCriteria.by === 'size'}
                direction={sortCriteria.direction}
                onClick={(direction) => onSortCriteriaChange('size', direction)}
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SE
              <TableHeaderSortButton
                sorted={sortCriteria.by === 'seeders'}
                direction={sortCriteria.direction}
                onClick={(direction) => onSortCriteriaChange('seeders', direction)}
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              LE
              <TableHeaderSortButton
                sorted={sortCriteria.by === 'leechers'}
                direction={sortCriteria.direction}
                onClick={(direction) => onSortCriteriaChange('leechers', direction)}
              />
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
            <Row key={torrent.id} torrent={torrent} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
