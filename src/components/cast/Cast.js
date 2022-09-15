import React, { useState, useEffect } from "react";
import { apiImage } from "../Api";
import "./Cast.scss";
const Cast = (movies) => {
  const [cast, setCast] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [displayview, setDisplayView] = useState(0);
  const arrcast = [];
  const viewallcast = () => {
    let n = 0;
    if (displayview % 2 != 0) {
      changeWidth();
    } else {
      if (movies.credits.cast.length >= 20) {
        n = 20;
      } else {
        n = movies.credits.cast.length;
      }
      for (let i = 0; i < n; i++) {
        arrcast[i] = i;
      }
      setCast(arrcast);
    }
    setDisplayView(parseInt(displayview + 1));
  };
  const changeWidth = () => {
    if (width <= 600) {
      setCast([1, 2]);
    } else if (width > 600 && width <= 820) {
      setCast([1, 2, 3]);
    } else if (width > 820 && width <= 880) {
      setCast([1, 2, 3, 4]);
    } else if (width > 880 && width <= 1024) {
      setCast([1, 2, 3]);
    } else if (width > 1024 && width <= 1300) {
      setCast([1, 2, 3, 4]);
    } else if (width > 1300) {
      setCast([1, 2, 3, 4, 5]);
    }
  };
  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };
    handleWidth();
    window.addEventListener("resize", handleWidth);
    changeWidth();
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [width]);
  return (
    <div className="panelCast">
      {movies.credits.cast.length >= 5 ? (
        <>
          <div className="headerCast">
            <h4>CAST</h4>
            {displayview % 2 == 0 ? (
              <div className="viewallcast" onClick={viewallcast}>
                View All Cast
              </div>
            ) : (
              <div className="viewallcast" onClick={viewallcast}>
                Close All Cast
              </div>
            )}
          </div>
          <div className="contentCast">
            {cast.map((item, index) => {
              // movies.credits.cast[index]
              return (
                <div className="itemcontent" key={index}>
                  <div className="panelImgCast">
                    <img
                      className="imgCast"
                      src={
                        movies.credits.cast[index].profile_path === null
                          ? "https://www.fujinoya-1895.jp/wp-content/uploads/no_image-300x300.jpg"
                          : apiImage(movies.credits.cast[index].profile_path)
                      }
                    ></img>
                  </div>
                  <div className="textCast">
                    <p className="castName">
                      {movies.credits.cast[index].name ||
                        movies.credits.cast[index].original_name}
                    </p>
                    <div className="castCharater">
                      {movies.credits.cast[index].character}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cast;
