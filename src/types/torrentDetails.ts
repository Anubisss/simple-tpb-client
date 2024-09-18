import Torrent from './torrent';

interface TorrentDetails extends Torrent {
  descr: string;
  num_files: number;
}

export default TorrentDetails;
