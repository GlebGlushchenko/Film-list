import axios from "axios";
import React from "react";
import Paginator from "./components/Paginator/Paginator";
import "./scss/app.scss";

const App: React.FC = () => {
  const [films, setFilms] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [filmPage, setFilmPage] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    try {
      axios.get(`https://yts.mx/api/v2/list_movies.json?page=${currentPage}`).then((res) => {
        setFilms(
          res.data.data.movies.map((i: any) => {
            return { ...i, comment: "", valueInput: "" };
          }),
        );
        setFilmPage(res.data.data.movie_count);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilms(
      films.map((i) => {
        if (e.target.id === i.id.toString()) {
          return { ...i, valueInput: e.target.value };
        }
        return i;
      }),
    );
  };

  const addComment = (filmId: number) => {
    setFilms(
      films.map((i) => {
        if (filmId === i.id) {
          return { ...i, comment: i.comment + i.valueInput, valueInput: "" };
        }
        return i;
      }),
    );
  };

  const removeComment = (filmId: number) => {
    setFilms(
      films.map((i) => {
        if (filmId === i.id) {
          return { ...i, comment: "", valueInput: "" };
        }
        return i;
      }),
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Film List</h1>
      </header>
      <main className="main">
        {isLoading
          ? "....LOADING"
          : films.map((obj: any) => {
              return (
                <ul key={obj.id} className="film__card">
                  <div>
                    <li className="film__card-item">
                      <img className="film__card-image" src={obj.medium_cover_image} alt="Poster" />
                    </li>
                    <li>
                      <h3 className="film__card-title">{obj.title}</h3>
                    </li>
                    <li>
                      <p className="film__card-description">
                        {obj.description_full.slice(0, 200) + "..."}
                      </p>
                    </li>
                  </div>
                  <div>
                    <div className="comment">
                      <h5>Comment</h5>
                      <p>{obj.comment}</p>
                    </div>
                    <input
                      placeholder="Enter comment"
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                          addComment(obj.id);
                        }
                      }}
                      value={obj.valueInput}
                      id={obj.id}
                      onChange={(e) => handlerOnChange(e)}
                      type="text"
                    />
                    <button onClick={() => addComment(obj.id)}>Save comment</button>
                    <button onClick={() => removeComment(obj.id)}> Remove comment</button>
                  </div>
                </ul>
              );
            })}
      </main>
      <Paginator
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        filmPage={filmPage}
        totalFilms={films.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
