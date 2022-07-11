import React from "react";

import styles from "../Paginator.module.scss";

type Props = {
  filmPage: number;
  totalFilms: number;
  paginate: (num: number) => void;
  currentPage: number;
  setCurrentPage: (num: any) => void;
};

const Paginator: React.FC<Props> = ({
  filmPage,
  totalFilms,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(filmPage / totalFilms); i++) {
    pageNumber.push(i);
  }
  const currentPageFirst = currentPage - 5 < 0 ? 0 : currentPage - 5;
  const currentPageLast = currentPageFirst + 5;

  const cutPageNumber = pageNumber.slice(currentPageFirst, currentPageLast);

  const onClickPref = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev: number) => prev - 1);
    }
  };
  const onClickNext = () => setCurrentPage((prev: number) => prev + 1);

  return (
    <div className={styles.paginator}>
      <button
        disabled={currentPage === 1}
        onClick={() => onClickPref()}
        className={currentPage === 1 ? styles.disabled : ""}>
        {"<"}
      </button>
      <ul className={styles.paginator__container}>
        {cutPageNumber.map((number) => {
          return (
            <li
              className={currentPage === number ? styles.active : ""}
              onClick={() => paginate(number)}
              key={number}>
              {number}
            </li>
          );
        })}
      </ul>
      <button onClick={() => onClickNext()} className={styles.btn}>
        {">"}
      </button>
    </div>
  );
};

export default Paginator;
