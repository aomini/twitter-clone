export const getTotalColumns = (): number => {
  return Math.floor(document.documentElement.clientWidth / 15);
};

export const getTotalRows = (): number => {
  return Math.floor(document.documentElement.clientHeight / 15);
};