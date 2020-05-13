export const getTotalColumns = (): number => {
  return Math.floor(document.documentElement.clientWidth / 25);
};

export const getTotalRows = (): number => {
  const navElement = document.querySelector("nav") as HTMLElement;
  const navHeight = navElement ? navElement.clientHeight : 0;
  const gridPadding = 10;
  return Math.floor(
    (document.documentElement.clientHeight - navHeight - gridPadding - 25) / 25
  );
};
