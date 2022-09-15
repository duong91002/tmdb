import React, { useEffect, useState } from "react";
import { apiGenre, apiMovieGenre, apiImage } from "../Api";
import { Link, useParams } from "react-router-dom";
import Header from "../header/Header";
import "./GenreMovie.scss";
const GenreMovie = () => {
  const [genre, setGenre] = useState([]);
  const [url, setUrl] = useState("");
  const [movies, setMovies] = useState([]);
  const [iddisplay, setIdDisplay] = useState(-1);
  const [lastpage, setLastPage] = useState([]);
  const [arrPage, setPage] = useState([1, 2, 3, 4, 5]);
  const [pagemax5, setpagemax5] = useState(false);
  const [pagemin5, setpagemin5] = useState(false);
  const [pagemaxlastpage, setPagemaxlastpage] = useState(false);
  const params = useParams();

  // console.log(params);
  //   ********************************************************
  const arr = [];
  useEffect(() => {
    let flag = window.location.pathname.split("/")[1];
    genre.map((item) => {
      document.getElementById(`id${item.id}`).style.backgroundColor = "#0b1e30";
    });
    document.getElementById("movie").style.backgroundColor = "#0b1e30";
    document.getElementById("tv").style.backgroundColor = "#0b1e30";
    //   ********************************************************
    if (iddisplay === 0) {
      flag = "movie";
      document.getElementById("movie").style.backgroundColor = "#428bca";
    } else if (iddisplay === 1) {
      flag = "tv";
      document.getElementById("tv").style.backgroundColor = "#428bca";
    } else if (iddisplay === -1) {
      flag = window.location.pathname.split("/")[1];
      document.getElementById(
        window.location.pathname.split("/")[1]
      ).style.backgroundColor = "#428bca";
    }
    fetch(apiGenre(flag))
      .then((res) => res.json())
      .then((data) => {
        setGenre(data.genres);
      });
    const timer = setTimeout(() => {
      document.getElementById(
        `id${window.location.search.split("=")[1].split("&")[0]}`
      ).style.backgroundColor = "#428bca";
      document.getElementById(
        `page${window.location.search.split("=")[2]}`
      ).style.backgroundColor = "#428bca";
    }, 500);
    // ************************************************
    fetch(
      apiMovieGenre(
        flag,
        window.location.search.split("=")[1] +
          "=" +
          window.location.search.split("=")[2]
      )
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.total_pages > 500) {
          setLastPage(500);
          loadpage(500);
        } else {
          setLastPage(data.total_pages);
          loadpage(data.total_pages);
        }
        arr.push(...data.results);
        arr.map((item) => {
          item.typefilm = flag;
        });
        setMovies(arr);
      });
    return () => clearTimeout(timer);
    // console.log(window.location.search.split("=")[2]); //page
    // console.log(window.location.search.split("=")[1].split("&")[0]); //id
  }, [url]);
  //   ********************************************************

  const handleOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleOnTop();
  }, [url]);

  const handlechangeGenre = (key, id) => {
    arrPage.map((item) => {
      document.getElementById(`page${item}`).style.backgroundColor = "#06121e";
      document.getElementById(`page${lastpage}`).style.backgroundColor =
        "#06121e";
    });
    setUrl(key);
    setIdDisplay(id);
  };
  //   ********************************************************
  const handlechangeMovieGenre = (key) => {
    arrPage.map((item) => {
      document.getElementById(`page${item}`).style.backgroundColor = "#06121e";
      document.getElementById(`page${lastpage}`).style.backgroundColor =
        "#06121e";
    });
    setUrl(key);
  };
  //   ***************************************************
  const loadpage = (total_pages) => {
    if (window.location.search.split("=")[2] <= 4) {
      setpagemin5(false);
      setPagemaxlastpage(false);
      setPage([1, 2, 3, 4, 5]);
      setpagemax5(true);
    } else if (
      window.location.search.split("=")[2] > 4 &&
      window.location.search.split("=")[2] <= parseInt(total_pages - 4)
    ) {
      setpagemax5(false);
      setPagemaxlastpage(false);
      setPage([
        parseInt(window.location.search.split("=")[2]) - 2,
        parseInt(window.location.search.split("=")[2]) - 1,
        parseInt(window.location.search.split("=")[2]),
        parseInt(window.location.search.split("=")[2]) + 1,
        parseInt(window.location.search.split("=")[2]) + 2,
      ]);
      setpagemin5(true);
    } else if (
      window.location.search.split("=")[2] > total_pages - 4 &&
      window.location.search.split("=")[2] <= total_pages
    ) {
      setpagemax5(false);
      setpagemin5(false);
      setPage([
        parseInt(total_pages) - 5,
        parseInt(total_pages) - 4,
        parseInt(total_pages) - 3,
        parseInt(total_pages) - 2,
        parseInt(total_pages) - 1,
      ]);
      setPagemaxlastpage(true);
    }
  };
  //   ***************************************************
  const handleChangePage = (key) => {
    arrPage.map((item) => {
      document.getElementById(`page${item}`).style.backgroundColor = "#06121e";
      document.getElementById(`page${lastpage}`).style.backgroundColor =
        "#06121e";
    });
    setUrl(key);
  };
  //   ********************************************************
  return (
    <>
      <Header />
      <div className="panelContainer">
        <div className="ContentContainer">
          <div className="panelGenre">
            <h2 className="headerGenre">Genre</h2>
            <div className="panelkeyGenre">
              <Link to={`../movie/genre?g=28&page=1`}>
                <div
                  onClick={() =>
                    handlechangeGenre("../movie/genre?g=28&page=1", 0)
                  }
                  id="movie"
                  className="keyGenre"
                >
                  Movie
                </div>
              </Link>
              <Link to={`../tv/genre?g=10759&page=1`}>
                <div
                  onClick={() =>
                    handlechangeGenre("../tv/genre?g=10759&page=1", 1)
                  }
                  id="tv"
                  className="keyGenre"
                >
                  Tv
                </div>
              </Link>
            </div>
            <div className="Genre">
              {genre.map((item, index) => {
                return (
                  <Link to={`?g=${item.id}&page=1`} key={index}>
                    <div
                      className="itemGenre"
                      id={`id${item.id}`}
                      style={{ backgroundColor: "#0b1e30" }}
                      onClick={() =>
                        handlechangeMovieGenre(`?g=${item.id}&page=1`)
                      }
                    >
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="panelSlideMovie">
              <div className="contentSlideMovie">
                {movies.map((item, index) => {
                  // console.log(page);
                  return (
                    <Link
                      to={`../${item.typefilm}/detail?id=${item.id}`}
                      key={index}
                    >
                      <div className="grid-item">
                        <div className="panelimgMovie">
                          <img
                            className="imgMovie"
                            src={
                              item.poster_path === null &&
                              item.backdrop_path === null
                                ? "https://www.fujinoya-1895.jp/wp-content/uploads/no_image-300x300.jpg"
                                : apiImage(
                                    item.poster_path || item.backdrop_path
                                  )
                            }
                          ></img>
                        </div>
                        <p className="textMoive">
                          {" "}
                          {item.title ||
                            item.name ||
                            item.original_title ||
                            item.original_name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="panelPage">
              <Link
                to={`?g=${
                  window.location.search.split("=")[1].split("&")[0]
                }&page=${parseInt(window.location.search.split("=")[2]) - 1}`}
              >
                <div
                  className="itemPage"
                  onClick={() =>
                    handleChangePage(
                      `?g=${
                        window.location.search.split("=")[1].split("&")[0]
                      }&page=${
                        parseInt(window.location.search.split("=")[2]) - 1
                      }`
                    )
                  }
                >
                  <i className="fa-solid fa-angle-left"></i>
                </div>
              </Link>
              {pagemax5 ? (
                <>
                  {arrPage.map((item) => {
                    return (
                      <Link
                        to={`?g=${
                          window.location.search.split("=")[1].split("&")[0]
                        }&page=${item}`}
                        key={item}
                      >
                        <div
                          className="itemPage"
                          onClick={() =>
                            handleChangePage(
                              `?g=${
                                window.location.search
                                  .split("=")[1]
                                  .split("&")[0]
                              }&page=${item}`
                            )
                          }
                          id={`page${item}`}
                        >
                          {item}
                        </div>
                      </Link>
                    );
                  })}
                  <div className="itemPage">...</div>
                </>
              ) : pagemin5 ? (
                <>
                  <Link
                    to={`?g=${
                      window.location.search.split("=")[1].split("&")[0]
                    }&page=1`}
                  >
                    <div
                      className="itemPage"
                      onClick={() =>
                        handleChangePage(
                          `?g=${
                            window.location.search.split("=")[1].split("&")[0]
                          }&page=1`
                        )
                      }
                      id={`page1`}
                    >
                      1
                    </div>
                  </Link>
                  <div className="itemPage">...</div>
                  {arrPage.map((item) => {
                    return (
                      <Link
                        to={`?g=${
                          window.location.search.split("=")[1].split("&")[0]
                        }&page=${item}`}
                        key={item}
                      >
                        <div
                          className="itemPage"
                          onClick={() =>
                            handleChangePage(
                              `?g=${
                                window.location.search
                                  .split("=")[1]
                                  .split("&")[0]
                              }&page=${item}`
                            )
                          }
                          id={`page${item}`}
                        >
                          {item}
                        </div>
                      </Link>
                    );
                  })}
                  <div className="itemPage">...</div>
                </>
              ) : pagemaxlastpage ? (
                <>
                  <Link
                    to={`?g=${
                      window.location.search.split("=")[1].split("&")[0]
                    }&page=1`}
                  >
                    <div
                      className="itemPage"
                      onClick={() =>
                        handleChangePage(
                          `?g=${
                            window.location.search.split("=")[1].split("&")[0]
                          }&page=1`
                        )
                      }
                      id={`page1`}
                    >
                      1
                    </div>
                  </Link>
                  <div className="itemPage">...</div>
                  {arrPage.map((item) => {
                    return (
                      <Link
                        to={`?g=${
                          window.location.search.split("=")[1].split("&")[0]
                        }&page=${item}`}
                        key={item}
                      >
                        <div
                          className="itemPage"
                          onClick={() =>
                            handleChangePage(
                              `?g=${
                                window.location.search
                                  .split("=")[1]
                                  .split("&")[0]
                              }&page=${item}`
                            )
                          }
                          id={`page${item}`}
                        >
                          {item}
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              <Link
                to={`?g=${
                  window.location.search.split("=")[1].split("&")[0]
                }&page=${lastpage}`}
              >
                <div
                  className="itemPage"
                  onClick={() =>
                    handleChangePage(
                      `?g=${
                        window.location.search.split("=")[1].split("&")[0]
                      }&page=${lastpage}`
                    )
                  }
                  id={`page${lastpage}`}
                >
                  {lastpage}
                </div>
              </Link>
              <Link
                to={`?g=${
                  window.location.search.split("=")[1].split("&")[0]
                }&page=${parseInt(window.location.search.split("=")[2]) + 1}`}
              >
                <div
                  className="itemPage"
                  onClick={() =>
                    handleChangePage(
                      `?g=${
                        window.location.search.split("=")[1].split("&")[0]
                      }&page=${
                        parseInt(window.location.search.split("=")[2]) + 1
                      }`
                    )
                  }
                >
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenreMovie;
