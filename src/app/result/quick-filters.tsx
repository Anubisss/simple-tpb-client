'use client';

import React, { FC } from 'react';

import { TorrentSearchResultFilters } from '@/types/torrentSearchResultFilters';

interface Props {
  filters: TorrentSearchResultFilters;
  onFilterChange: (filterKey: keyof TorrentSearchResultFilters, value?: string) => void;
}

const QuickFilters: FC<Props> = ({ filters, onFilterChange }) => {
  const renderCheckbox = (filterKey: Exclude<keyof TorrentSearchResultFilters, 'name'>) => (
    <label>
      <input
        type="checkbox"
        checked={filters[filterKey]}
        onChange={() => onFilterChange(filterKey)}
      />
      <span className={`ml-1 ${filterKey === 'Trusted uploader' && 'text-pink-500'}`}>
        {filterKey}
      </span>
    </label>
  );

  return (
    <div className="mt-2 mb-4 flex items-center justify-center">
      <div>
        <span className="mr-4">Quick filters</span>
        <input
          type="text"
          value={filters.name}
          onChange={(e) => onFilterChange('name', e.target.value)}
          className="border rounded px-4 py-2 w-64"
          placeholder="Torrent name"
        />
      </div>
      <div className="ml-4 flex items-center space-x-4">
        {renderCheckbox('720p')}
        {renderCheckbox('1080p')}
        {renderCheckbox('2160p')}
        {renderCheckbox('HDR')}
        {renderCheckbox('DV')}
        {renderCheckbox('Atmos')}
        {renderCheckbox('Trusted uploader')}
      </div>
    </div>
  );
};

export default QuickFilters;
