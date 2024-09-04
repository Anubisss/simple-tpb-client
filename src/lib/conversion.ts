export const convertTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const bytesToSize = (bytes: number): string => {
  const KB = 1024;
  const MB = KB * KB;
  const GB = MB * KB;

  if (bytes >= GB) {
    return (bytes / GB).toFixed(1) + ' GB';
  } else if (bytes >= MB) {
    return (bytes / MB).toFixed(1) + ' MB';
  } else {
    return (bytes / KB).toFixed(1) + ' KB';
  }
};
