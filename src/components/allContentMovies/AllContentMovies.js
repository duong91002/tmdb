import React, { useEffect, useState } from "react";
import "./AllContentMovies.scss";
import { apiMovie, apiImage } from "../Api";
import { Link } from "react-router-dom";
import Header from "../header/Header";
const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [lastpage, setLastPage] = useState("");
  const [url, setUrl] = useState(window.location.search.slice(6));
  const [arrPage, setPage] = useState([1, 2, 3, 4, 5]);
  const [pagemax5, setpagemax5] = useState(false);
  const [pagemin5, setpagemin5] = useState(false);
  const [pagemaxlastpage, setPagemaxlastpage] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetch(apiMovie(window.location.pathname, window.location.search.slice(6)))
      .then((res) => res.json())
      .then((data) => {
        if (data.total_pages > 500) {
          setLastPage(500);
          loadpage(500);
        } else {
          setLastPage(data.total_pages);
          loadpage(data.total_pages);
        }
        setMovies(data.results);
      });
    const timer = setTimeout(() => {
      document.getElementById(
        `page${window.location.search.split("=")[1]}`
      ).style.backgroundColor = "#428bca";
    }, 500);
    return () => clearTimeout(timer);
  }, [url]);
  // **************************************************
  const loadpage = (total_pages) => {
    if (window.location.search.slice(6) <= 4) {
      setpagemin5(false);
      setPagemaxlastpage(false);
      setPage([1, 2, 3, 4, 5]);
      setpagemax5(true);
    } else if (
      window.location.search.slice(6) > 4 &&
      window.location.search.slice(6) <= parseInt(total_pages - 4)
    ) {
      setpagemax5(false);
      setPagemaxlastpage(false);
      setPage([
        parseInt(window.location.search.slice(6)) - 2,
        parseInt(window.location.search.slice(6)) - 1,
        parseInt(window.location.search.slice(6)),
        parseInt(window.location.search.slice(6)) + 1,
        parseInt(window.location.search.slice(6)) + 2,
      ]);
      setpagemin5(true);
    } else if (
      window.location.search.slice(6) > total_pages - 4 &&
      window.location.search.slice(6) <= total_pages
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
  // **************************************************
  const handleChangePage = (key) => {
    arrPage.map((item) => {
      document.getElementById(`page${item}`).style.backgroundColor = "#06121e";
      document.getElementById(`page${lastpage}`).style.backgroundColor =
        "#06121e";
    });
    setUrl(key);
  };
  return (
    <>
      <Header />
      <div className="panelContainer">
        <div className="ContentContainer">
          <div className="panelMovie">
            <h2>{}</h2>
            <div className="contentSlideMovie">
              {movies.map((item, index) => {
                // console.log(page);
                return (
                  <Link
                    to={`../${
                      window.location.pathname.split("/")[1]
                    }/detail?id=${item.id}`}
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
                              : apiImage(item.poster_path || item.backdrop_path)
                          }
                        ></img>
                      </div>
                      <p className="textMoive">
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
            <div className="panelPage">
              <Link
                to={`?page=${parseInt(window.location.search.slice(6)) - 1}`}
                onChange={() => setUrl(window.location)}
              >
                <div
                  className="itemPage"
                  onClick={() =>
                    handleChangePage(
                      `?page=${parseInt(window.location.search.slice(6)) - 1}`
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
                        to={`?page=${item}`}
                        key={item}
                        onChange={() => setUrl(window.location)}
                      >
                        <div
                          className="itemPage"
                          onClick={() => handleChangePage(`?page=${item}`)}
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
                  <Link to={`?page=1`} onChange={() => setUrl(window.location)}>
                    <div
                      className="itemPage"
                      onClick={() => handleChangePage(`?page=1`)}
                      id={`page1`}
                    >
                      1
                    </div>
                  </Link>
                  <div className="itemPage">...</div>
                  {arrPage.map((item) => {
                    return (
                      <Link
                        to={`?page=${item}`}
                        key={item}
                        onChange={() => setUrl(window.location)}
                      >
                        <div
                          className="itemPage"
                          onClick={() => handleChangePage(`?page=${item}`)}
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
                  <Link to={`?page=1`} onChange={() => setUrl(window.location)}>
                    <div
                      className="itemPage"
                      onClick={() => handleChangePage(`?page=1`)}
                      id={`page1`}
                    >
                      1
                    </div>
                  </Link>
                  <div className="itemPage">...</div>
                  {arrPage.map((item) => {
                    return (
                      <Link
                        to={`?page=${item}`}
                        key={item}
                        onChange={() => setUrl(window.location)}
                      >
                        <div
                          className="itemPage"
                          onClick={() => handleChangePage(`?page=${item}`)}
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
                to={`?page=${lastpage}`}
                onChange={() => setUrl(window.location)}
              >
                <div
                  className="itemPage"
                  onClick={() => handleChangePage(`?page=${lastpage}`)}
                  id={`page${lastpage}`}
                >
                  {lastpage}
                </div>
              </Link>
              <Link
                to={`?page=${parseInt(window.location.search.slice(6)) + 1}`}
                onChange={() => setUrl(window.location)}
              >
                <div
                  className="itemPage"
                  onClick={() =>
                    handleChangePage(
                      `?page=${parseInt(window.location.search.slice(6)) + 1}`
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
export default Movie;
