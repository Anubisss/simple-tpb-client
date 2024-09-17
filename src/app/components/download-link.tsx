'use client';

import React, { FC } from 'react';

import { getTrackerListForMagnetUri } from '@/lib/trackers';

const getMagnetUri = (infoHash: string, torrrentName: string): string => {
  return `magnet:?xt=urn:btih:${infoHash}&dn=${torrrentName}${getTrackerListForMagnetUri()}`;
};

interface Props {
  infoHash: string;
  torrrentName: string;
}

const DownloadLink: FC<Props> = ({ infoHash, torrrentName }) => {
  return (
    <a href={getMagnetUri(infoHash, torrrentName)} className="text-blue-600 hover:underline">
      Download
    </a>
  );
};

export default DownloadLink;
