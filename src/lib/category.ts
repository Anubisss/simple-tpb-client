const categoryMapping = {
  '0': 'All',

  // Audio
  '100': 'Audio',
  '101': 'Audio > Music',
  '102': 'Audio > Audio books',
  '103': 'Audio > Sound clips',
  '104': 'Audio > FLAC',
  '199': 'Audio > Other',

  // Video
  '200': 'Video',
  '201': 'Video > Movies',
  '202': 'Video > Movies DVDR',
  '203': 'Video > Music videos',
  '204': 'Video > Movie clips',
  '205': 'Video > TV shows',
  '206': 'Video > Handheld',
  '207': 'Video > HD - Movies',
  '208': 'Video > HD - TV shows',
  '209': 'Video > 3D',
  '210': 'Video > CAM/TS',
  '211': 'Video > UHD/4k - Movies',
  '212': 'Video > UHD/4k - TV shows',
  '299': 'Video > Other',

  // Applications
  '300': 'Applications',
  '301': 'Applications > Windows',
  '302': 'Applications > Mac',
  '303': 'Applications > UNIX',
  '304': 'Applications > Handheld',
  '305': 'Applications > IOS (iPad/iPhone)',
  '306': 'Applications > Android',
  '399': 'Applications > Other OS',

  // Games
  '400': 'Games',
  '401': 'Games > PC',
  '402': 'Games > Mac',
  '403': 'Games > PSx',
  '404': 'Games > XBOX360',
  '405': 'Games > Wii',
  '406': 'Games > Handheld',
  '407': 'Games > IOS (iPad/iPhone)',
  '408': 'Games > Android',
  '499': 'Games > Other',

  // Porn
  '500': 'Porn',
  '501': 'Porn > Movies',
  '502': 'Porn > Movies DVDR',
  '503': 'Porn > Pictures',
  '504': 'Porn > Games',
  '505': 'Porn > HD - Movies',
  '506': 'Porn > Movie clips',
  '507': 'Porn > UHD/4k - Movies',
  '599': 'Porn > Other',

  // Other
  '600': 'Other',
  '601': 'Other > E-books',
  '602': 'Other > Comics',
  '603': 'Other > Pictures',
  '604': 'Other > Covers',
  '605': 'Other > Physibles',
  '699': 'Other > Other',
};

const getCategoryName = (categoryId: string): string => {
  const id = categoryId as keyof typeof categoryMapping;
  if (categoryMapping[id]) {
    return categoryMapping[id];
  }
  return `Unknown (#${categoryId})`;
};

export { categoryMapping, getCategoryName };
