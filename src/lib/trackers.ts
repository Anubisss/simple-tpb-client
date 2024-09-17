const trackers = [
  'udp://tracker.opentrackr.org:1337',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.torrent.eu.org:451/announce',
  'udp://tracker.bittor.pw:1337/announce',
  'udp://public.popcorn-tracker.org:6969/announce',
  'udp://tracker.dler.org:6969/announce',
  'udp://exodus.desync.com:6969',
  'udp://open.demonii.com:1337/announce',
];

const getTrackerListForMagnetUri = (): string => {
  return trackers.map((t) => `&tr=${t}`).join('');
};

export { getTrackerListForMagnetUri };
