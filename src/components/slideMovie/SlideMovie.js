import React, { useEffect, useState } from "react";
import "./SlideMovie.scss";
import { apiMovie } from "../Api";
import { Link, useParams } from "react-router-dom";
import ItemSlideMoive from "../itemSlideMovie/ItemSlideMovie";
import Header from "../header/Header";
const SlideMoives = () => {
  // const jsonchild = JSON.parse(window.localStorage.getItem("user"));
  // console.log(jsonchild);
  const [hastime, setHastime] = useState(false);
  const [quantitiesMovie, setQuantitiesMovie] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);
  const [width, setWidth] = useState(window.innerWidth);
  const params = useParams();
  const moviesHome = [
    {
      id: 0,
      api: apiMovie("/movie/now_playing", 1),
      name: "Now Playing Movie",
      title: "movie",
      genre: "now_playing",
    },
    {
      id: 1,
      api: apiMovie("/tv/on_the_air", 1),
      name: "On The Air TV Show",
      title: "tv",
      genre: "on_the_air",
    },
    {
      id: 2,
      api: apiMovie("/movie/popular", 1),
      name: "Popular Movie",
      title: "movie",
      genre: "popular",
    },
    {
      id: 3,
      api: apiMovie("/tv/popular", 1),
      name: "Popular Tv Show",
      title: "tv",
      genre: "popular",
    },
  ];
  const moviesMovie = [
    {
      id: 4,
      api: apiMovie("/movie/now_playing", 1),
      name: "Now Playing Movie",
      title: "movie",
      genre: "now_playing",
    },
    {
      id: 5,
      api: apiMovie("/movie/popular", 1),
      name: "Popular Movie",
      title: "movie",
      genre: "popular",
    },
    {
      id: 6,
      api: apiMovie("/movie/top_rated", 1),
      name: "Top Rated Movie",
      title: "movie",
      genre: "top_rated",
    },
    {
      id: 7,
      api: apiMovie("/movie/upcoming", 1),
      name: "Up Coming Movie",
      title: "movie",
      genre: "upcoming",
    },
  ];
  const moviesTv = [
    {
      id: 8,
      api: apiMovie("/tv/airing_today", 1),
      name: "TV Airing Today",
      title: "tv",
      genre: "airing_today",
    },
    {
      id: 9,
      api: apiMovie("/tv/on_the_air", 1),
      name: "TV On The Air ",
      title: "tv",
      genre: "on_the_air",
    },
    {
      id: 10,
      api: apiMovie("/tv/popular", 1),
      name: "Popular Tv ",
      title: "tv",
      genre: "popular",
    },
    {
      id: 11,
      api: apiMovie("/tv/top_rated", 1),
      name: "Top Rated TV",
      title: "tv",
      genre: "top_rated",
    },
  ];
  const arrAPI = [];
  const arrAPI1 = [];
  const arrAPI2 = [];
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const arr = ["1", "2", "3", "4", "5"];
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };
    handleWidth();
    window.addEventListener("resize", handleWidth);
    if (width <= 768) {
      setQuantitiesMovie([...arr, "6"]);
    } else if (width > 768 && width <= 1024) {
      setQuantitiesMovie([...arr, "6"]);
    } else if (width > 1024 && width <= 1300) {
      setQuantitiesMovie([...arr, "6", "7", "8"]);
    } else if (width > 1300) {
      setQuantitiesMovie([...arr]);
    }
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [width]);
  // *********************
  useEffect(() => {
    setHastime(false);
    if (params.id === "movie") {
      moviesMovie.map(async (item) => {
        let data = await fetch(item.api).then((res) => res.json());
        arrAPI1.push({ ...item, content: data });
        setMovies(arrAPI1);
      });
    } else if (params.id === "tv") {
      moviesTv.map(async (item) => {
        let data = await fetch(item.api).then((res) => res.json());
        arrAPI2.push({ ...item, content: data });
        setMovies(arrAPI2);
      });
    } else {
      moviesHome.map(async (item) => {
        let data = await fetch(item.api).then((res) => res.json());
        arrAPI.push({ ...item, content: data });
        setMovies(arrAPI);
      });
    }
    const timer = setTimeout(() => {
      setHastime(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [params]);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [url]);
  return (
    <>
      <Header />
      <div className="panelContainer">
        <div className="ContentContainer">
          <div className="panel">
            {hastime ? (
              <>
                {movies.map((item, index) => {
                  return (
                    <div className="panelSlideMovie" key={index}>
                      <div className="headerSlideMovie">
                        <div className="tittlSlideMovie">{item.name}</div>
                        <Link to={`../${item.title}/${item.genre}?page=1`}>
                          <div className="viewMoreSlideMoive">
                            View More{" "}
                            <i className="fa-solid fa-angles-right"></i>
                          </div>
                        </Link>
                      </div>
                      <div className="contentSlideMovie">
                        {quantitiesMovie.map((its, index) => {
                          return (
                            <ItemSlideMoive
                              title={item.title}
                              content={item.content}
                              index={index}
                              key={index}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
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

export default SlideMoives;
