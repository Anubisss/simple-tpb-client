'use client';

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import ErrorIndicator from '@/app/components/error-indicator';
import LoadingIndicator from '@/app/components/loading-indicator';
import TorrentDetails from '@/types/torrentDetails';
import TorrentFile from '@/types/torrentFile';
import Details from './details';

interface Props {
  params: {
    id: string;
  };
}

const DetailsPage: FC<Props> = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [details, setDetails] = useState<TorrentDetails | null>(null);
  const [files, setFiles] = useState<TorrentFile[]>([]);

  const torrentId = params.id;

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);

      const response = await fetch(`/api/details/${id}`);

      if (response.ok) {
        const data = await response.json();

        setDetails(data.details);
        setFiles(
          data.files.map((f: { name: string[]; size: number[] }) => ({
            name: f.name[0],
            size: f.size[0],
          }))
        );

        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchData(torrentId);
  }, [torrentId]);

  const isTorrentDoesntExist = details && +details.id === 0;

  return (
    <>
      <div className="p-4 bg-gray-50 border border-b-gray-200">
        <h1 className="text-3xl font-bold text-blue-700">
          <Link href="/">Simple TPB Client</Link>
        </h1>
      </div>
      {(() => {
        if (loading) {
          return <LoadingIndicator />;
        }
        if (error) {
          return (
            <ErrorIndicator message="Unable to load torrent details. Try reloading the page." />
          );
        }
        if (isTorrentDoesntExist) {
          return <ErrorIndicator message="Torrent not found." />;
        }

        if (details) {
          return <Details torrent={details} files={files} />;
        }
      })()}
    </>
  );
};

export default DetailsPage;
