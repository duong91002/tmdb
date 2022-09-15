import React, { useEffect, useState } from "react";
import "./MovieSearch.scss";
import { apiImage, apiSearchMovie, apiSearchTv } from "../Api";
import { Link } from "react-router-dom";
import Header from "../header/Header";
// import { Link } from "react-router-dom";
const MovieSearch = () => {
  // *****************************
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("a");
  useEffect(() => {
    const arrmovie = [];
    const arrtv = [];
    const arrram = [];
    const timer = setTimeout(async () => {
      const data = await fetch(apiSearchMovie(text || "a")).then((res) =>
        res.json()
      );

      arrmovie.push(...data.results);
      arrmovie.map((item) => {
        item.typefilm = "movie";
      });

      const data1 = await fetch(apiSearchTv(text || "a")).then((res) =>
        res.json()
      );

      arrtv.push(...data1.results);
      arrtv.map((item) => {
        item.typefilm = "tv";
      });
      arrram.push(...arrmovie, ...arrtv);
      setMovies(arrram);
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);
  // *****************************
  return (
    <>
      <Header />
      <div className="panelContainer">
        <div className="ContentContainer">
          <div className="panelSearch">
            <input
              className="inputsearch"
              type="text"
              placeholder="Search movies....."
              onChange={(e) => setText(e.target.value)}
            ></input>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieSearch;
