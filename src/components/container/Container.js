import React, { useEffect, useState } from "react";
import "./Container.scss";
import SlideMoives from "../slideMovie/SlideMovie";
import { Route, Routes } from "react-router-dom";
import AllContentMovies from "../allContentMovies/AllContentMovies";
import Login from "../login/Login";
import MovieSearch from "../movieSearch/MovieSearch";
import GenreMovie from "../genreMovie/GenreMovie";
import Detail from "../detail/Detail";
import WatchMovie from "../watchMovie/WatchMovie";
import Setting from "../setting/Setting";
const Container = () => {
  // *************************************http://localhost:3000/movie

  return (
    <>
      {
        <Routes>
          <Route path="/" element={<SlideMoives />}></Route>
          <Route path="/:id" element={<SlideMoives />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/signup" element={<Login />}></Route>
          <Route path="/:id/genre" element={<GenreMovie />}></Route>
          <Route path="/search" element={<MovieSearch />}></Route>
          <Route path="/:id/:id" element={<AllContentMovies />}></Route>
          <Route path="/:id/detail" element={<Detail />}></Route>
          <Route path="/:id/watch" element={<WatchMovie />}></Route>
        </Routes>
      }
    </>
  );
};
export default Container;
