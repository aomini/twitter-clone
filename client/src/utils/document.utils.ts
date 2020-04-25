export const getTotalColumns = (): number => {
  return Math.floor(document.documentElement.clientWidth / 25);
};

export const getTotalRows = (): number => {
  return Math.floor(document.documentElement.clientHeight / 25);
};