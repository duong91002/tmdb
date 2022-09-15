import React, { useEffect, useState } from "react";
import { apiDetail, apiImage, apiTrailer } from "../Api";
import "./Detail.scss";
import Cast from "../cast/Cast";
import { Link } from "react-router-dom";
import Header from "../header/Header";
const Detail = () => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState();
  const [displaytrailer, setDisplayTrailer] = useState(1);
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
  useEffect(() => {
    const arrTrailer = [];
    fetch(
      apiDetail(
        window.location.pathname.split("/")[1],
        window.location.search.split("=")[1]
      )
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
    fetch(
      apiTrailer(
        window.location.pathname.split("/")[1],
        window.location.search.split("=")[1]
      )
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results === []) {
          arrTrailer.push(data.results);
          arrTrailer.map((item, index) => {
            if (item[index].type == "Trailer") {
              setTrailer(item[index].key);
              return;
            } else {
              setTrailer(item[index].key);
              return;
            }
          });
        }
      });
    const timer = setTimeout(() => {
      setHasTimeElapsed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const minute = parseInt(movies.runtime % 60);
  const hours = parseInt(movies.runtime / 60);
  const handleTrailer = () => {
    setDisplayTrailer(parseInt(displaytrailer + 1));
  };
  return (
    <>
      <Header />
      <div className="panelContainer">
        <div className="ContentContainer">
          <div className="panelDetail">
            {hasTimeElapsed ? (
              <>
                {displaytrailer % 2 == 0 ? (
                  <div
                    className="backgroundWatchTrailer"
                    onClick={handleTrailer}
                  >
                    <iframe
                      allowFullScreen
                      className="watchTrailer"
                      src={`https://www.youtube.com/embed/${trailer}`}
                    ></iframe>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="headerDetail"
                  style={{
                    backgroundImage: `url(${apiImage(movies.backdrop_path)})`,
                  }}
                ></div>
                <div className="contentDetail">
                  <div className="leftDetail">
                    <img
                      src={`${apiImage(movies.poster_path)}`}
                      className="poster"
                    ></img>
                    <p className="homepage" style={{ paddingTop: "20px" }}>
                      Homepage:{" "}
                      <a
                        style={{ textDecoration: "underline" }}
                        href={movies.homepage}
                      >
                        {movies.homepage}
                      </a>
                    </p>
                  </div>
                  <div className="rightDetail">
                    <h1 style={{ padding: "5px 0" }}>
                      {movies.title ||
                        movies.original_title ||
                        movies.name ||
                        movies.original_name}
                    </h1>
                    {window.location.pathname.split("/")[1] == "movie" ? (
                      <p style={{ padding: "10px 0" }}>
                        Time: {hours} hours {minute} min
                      </p>
                    ) : (
                      ""
                    )}

                    <div style={{ padding: "10px 0" }}>
                      <span className="logotmdb">Tmdb</span>{" "}
                      <span style={{ color: "#dcf836" }}>
                        <strong>{movies.vote_average}</strong>
                      </span>
                      / {movies.vote_count} Vote Count
                    </div>
                    <div
                      className="containerGenre"
                      style={{ padding: "10px 0" }}
                    >
                      {movies.genres.map((item, index) => {
                        return (
                          <div className=" genre" key={index}>
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ padding: "10px 0", lineHeight: "0.7cm" }}>
                      Overview: {movies.overview}
                    </div>
                    <div style={{ padding: "10px 0" }}>
                      Country: {movies.production_countries[0].name}
                    </div>
                    <div style={{ padding: "10px 0" }}>
                      Release Date:{" "}
                      {movies.release_date ||
                        movies.last_episode_to_air.air_date}
                    </div>
                    <div className="panelaction">
                      <div className="trailer" onClick={handleTrailer}>
                        Trailer
                      </div>
                      <Link
                        to={
                          window.location.pathname.split("/")[1] == "tv"
                            ? `../${
                                window.location.pathname.split("/")[1]
                              }/watch?id=${
                                window.location.search.split("=")[1]
                              }&season=${
                                movies.seasons[0].season_number
                              }&episode=1`
                            : `../${
                                window.location.pathname.split("/")[1]
                              }/watch?id=${
                                window.location.search.split("=")[1]
                              }`
                        }
                      >
                        <div className="movie">Watch</div>
                      </Link>
                    </div>
                    <Cast {...movies} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
