type SortBy = 'added' | 'size' | 'seeders' | 'leechers';
type SortDirection = 'asc' | 'desc';

interface TorrentSearchResultSortCriteria {
  by: null | SortBy;
  direction: SortDirection;
}

export type { SortBy, SortDirection, TorrentSearchResultSortCriteria };
