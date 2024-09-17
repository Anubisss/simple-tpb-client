const uploaderClassNames = {
  '': 'text-black',
  member: 'text-black',
  vip: 'text-green-500',
  trusted: 'text-pink-500',
  moderator: 'text-black font-bold',
};

const getUploaderClassName = (uploaderStatus: keyof typeof uploaderClassNames): string => {
  return uploaderClassNames[uploaderStatus] ? uploaderClassNames[uploaderStatus] : 'text-red-500';
};

export { uploaderClassNames, getUploaderClassName };
