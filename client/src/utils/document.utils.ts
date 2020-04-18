export const getTotalColumns = (): number => {
  return Math.floor(document.body.clientWidth / 15);
};

export const getTotalRows = (): number => {
  return Math.floor(document.documentElement.clientHeight / 15);
};