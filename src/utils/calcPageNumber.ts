export const calcPageNumber = (filmPage: number, totalFilms: number, currentPage: number) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(filmPage / totalFilms); i++) {
    pageNumber.push(i);
  }
  const currentPageFirst = currentPage - 5 < 0 ? 0 : currentPage - 5;
  const currentPageLast = currentPageFirst + 10;

  const cutPageNumber = pageNumber.slice(currentPageFirst, currentPageLast);
  return cutPageNumber;
};
