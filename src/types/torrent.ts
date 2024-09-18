import { uploaderClassNames } from '@/lib/uploaderClassNames';

export default interface Torrent {
  id: string;
  category: string;
  name: string;
  added: string;
  size: string;
  seeders: string;
  leechers: string;
  imdb?: string;
  status: keyof typeof uploaderClassNames;
  info_hash: string;
  username: string;
}
