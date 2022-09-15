import React, { useEffect } from "react";
import { apiImage } from "../Api";
import { Link } from "react-router-dom";
import "./ItemSlideMovie.scss";
const ItemSlideMoive = (o) => {
  return (
    <Link to={`../${o.title}/detail?id=${o.content.results[o.index].id}`}>
      <div className="grid-item">
        <div className="panelimgMovie">
          <img
            className="imgMovie"
            src={
              o.content.results[o.index].poster_path === null &&
              o.content.results[o.index].backdrop_path === null
                ? "https://www.fujinoya-1895.jp/wp-content/uploads/no_image-300x300.jpg"
                : apiImage(
                    o.content.results[o.index].poster_path ||
                      o.content.results[o.index].backdrop_path
                  )
            }
          ></img>
        </div>
        <p className="textMoive">
          {o.content.results[o.index].title ||
            o.content.results[o.index].name ||
            o.content.results[o.index].original_title ||
            o.content.results[o.index].original_name}
        </p>
      </div>
    </Link>
  );
};

export default ItemSlideMoive;
