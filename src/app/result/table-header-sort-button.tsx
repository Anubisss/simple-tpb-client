'use client';

import { SortDirection } from '@/types/torrentSearchResultSort';
import React, { FC } from 'react';

interface Props {
  sorted: boolean;
  direction: SortDirection;
  onClick: (direction: SortDirection) => void;
}

const TableHeaderSortButton: FC<Props> = ({ sorted, direction, onClick }: Props) => {
  const sortedAsc = sorted && direction === 'asc';
  const sortedDesc = sorted && direction === 'desc';

  const sortedAscClassNames = sortedAsc
    ? 'text-blue-500 cursor-pointer'
    : 'text-gray-400 cursor-pointer hover:text-blue-500';
  const sortedDescClassNames = sortedDesc
    ? 'text-blue-500 cursor-pointer'
    : 'text-gray-400 cursor-pointer hover:text-blue-500';

  return (
    <>
      <span className={sortedAscClassNames} onClick={() => onClick('asc')}>
        ▲
      </span>
      <span className={sortedDescClassNames} onClick={() => onClick('desc')}>
        ▼
      </span>
    </>
  );
};

export default TableHeaderSortButton;
