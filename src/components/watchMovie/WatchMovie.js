import React, { useEffect, useState } from "react";
import "./WatchMovie.scss";
import Header from "../header/Header";
import {
  apiDetail,
  getMovie2Embed,
  getTvShow2Embed,
  getseason,
  getepisode,
} from "../Api";
import { Link } from "react-router-dom";
const WatchMovie = () => {
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
  const [movies, setMovies] = useState([]);
  const [url, setUrl] = useState(window.location.search);
  const [linkfilm, setLinkfilm] = useState();
  const [season, setSeason] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [linkchangeepisode, setlinkchangeepisode] = useState([]);
  const [informationEpisode, setInformationEpisode] = useState([]);
  const arr = [];
  useEffect(() => {
    fetch(
      apiDetail(
        window.location.pathname.split("/")[1],
        window.location.search.split("=")[1].split("&")[0]
      )
    )
      .then((res) => res.json())
      .then((data) => {
        if (window.location.pathname.split("/")[1] == "tv") {
          for (let i = 0; i < data.seasons.length; i++) {
            console.log("ad");
            fetch(
              getseason(
                window.location.search.split("=")[1].split("&")[0],
                data.seasons[i].season_number
              )
            )
              .then((res) => res.json())
              .then((data1) => {
                arr.push(data1.episodes[0].episode_number);
                setlinkchangeepisode(arr);
              });
          }
        }
      });
  }, []);

  useEffect(() => {
    fetch(
      apiDetail(
        window.location.pathname.split("/")[1],
        window.location.search.split("=")[1].split("&")[0]
      )
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        if (window.location.pathname.split("/")[1] == "tv") {
          setSeason(data.seasons);
        }
      });
    if (window.location.pathname.split("/")[1] == "tv") {
      fetch(
        getseason(
          window.location.search.split("=")[1].split("&")[0],
          window.location.search.split("=")[2].split("&")[0]
        )
      )
        .then((res) => res.json())
        .then((data) => {
          setEpisode(data.episodes);
        });

      fetch(
        getepisode(
          window.location.search.split("=")[1].split("&")[0],
          window.location.search.split("=")[2].split("&")[0],
          window.location.search.split("=")[3]
        )
      )
        .then((res) => res.json())
        .then((data) => {
          setInformationEpisode(data);
        });
      setLinkfilm(
        getTvShow2Embed(
          window.location.search.split("=")[1].split("&")[0],
          window.location.search.split("=")[2].split("&")[0],
          window.location.search.split("=")[3]
        )
      );
    }
    const timer = setTimeout(() => {
      setHasTimeElapsed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);
  const handlechangeSeason = (key) => {
    setUrl(key);
  };
  const handlechangeEpisode = (key) => {
    setUrl(key);
  };
  return (
    <>
      <Header />
      <div className="panelContainer">
        <div className="ContentContainer">
          <div className="panelWatchMovie">
            <div className="headerWatchMovie"></div>
            {hasTimeElapsed ? (
              <>
                <div className="panelvideo">
                  {window.location.pathname.split("/")[1] == "movie" ? (
                    <iframe
                      allowFullScreen
                      src={`${getMovie2Embed(
                        window.location.search.split("=")[1]
                      )}`}
                      className="video"
                    ></iframe>
                  ) : (
                    <iframe
                      allowFullScreen
                      src={linkfilm}
                      className="video"
                    ></iframe>
                  )}
                </div>
                <div className="contentinformation">
                  <h1 style={{ padding: "40px 0 10px" }}>
                    {movies.title ||
                      movies.original_title ||
                      movies.name ||
                      movies.original_name}
                    {window.location.pathname.split("/")[1] == "tv" ? (
                      <span>
                        {" ("}
                        Season:{" "}
                        {window.location.search.split("=")[2].split("&")[0]}
                        {")"}
                      </span>
                    ) : (
                      ""
                    )}
                  </h1>
                  <div style={{ padding: "10px 0 40px", lineHeight: "0.7cm" }}>
                    {informationEpisode.overview}
                  </div>
                  {window.location.pathname.split("/")[1] == "tv" ? (
                    <>
                      {hasTimeElapsed ? (
                        <div className="panelListTv">
                          <h3 className="headerSeason">Season</h3>
                          <div
                            className="panelSeason"
                            style={{
                              display: "grid",
                              gap: "5px",
                            }}
                          >
                            {season.map((item, index) => {
                              // if (item.season_number > 0) {
                              return (
                                <Link
                                  to={`../tv/watch?id=${
                                    window.location.search
                                      .split("=")[1]
                                      .split("&")[0]
                                  }&season=${item.season_number}&episode=${
                                    linkchangeepisode[index]
                                  }`}
                                  key={index}
                                >
                                  <div
                                    className="itemSeason"
                                    onClick={() =>
                                      handlechangeSeason(
                                        `../tv/watch?id=${
                                          window.location.search
                                            .split("=")[1]
                                            .split("&")[0]
                                        }&season=${
                                          item.season_number
                                        }&episode=${parseInt(
                                          linkchangeepisode[index]
                                        )}`
                                      )
                                    }
                                  >
                                    {item.season_number}
                                  </div>
                                </Link>
                              );
                              // }
                            })}
                          </div>
                          <h3 className="headerSeason">Episode</h3>
                          <div
                            className="panelEpisode"
                            style={{
                              display: "grid",
                              gap: "5px",
                            }}
                          >
                            {episode.map((item, index) => {
                              return (
                                <Link
                                  to={`../tv/watch?id=${
                                    window.location.search
                                      .split("=")[1]
                                      .split("&")[0]
                                  }&season=${
                                    window.location.search
                                      .split("=")[2]
                                      .split("&")[0]
                                  }&episode=${item.episode_number}`}
                                  key={index}
                                >
                                  <div
                                    className="itemEpisode"
                                    onClick={() =>
                                      handlechangeEpisode(
                                        `../tv/watch?id=${
                                          window.location.search
                                            .split("=")[1]
                                            .split("&")[0]
                                        }&season=${
                                          window.location.search
                                            .split("=")[2]
                                            .split("&")[0]
                                        }&episode=${item.episode_number}`
                                      )
                                    }
                                  >
                                    {item.episode_number}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
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

export default WatchMovie;
