const keyAPI = "1d8335abc1492efbcd1a65f823ca848c";
export const apiMovie = (genre, page) =>
  `https://api.themoviedb.org/3${genre}?api_key=${keyAPI}&language=en-US&page=${page}`;
export const apiImage = (keyImage) =>
  `https://image.tmdb.org/t/p/w500${keyImage}`;
export const apiSearchMovie = (keySearch) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${keyAPI}&query=${keySearch}`;
export const apiSearchTv = (keySearch) =>
  `https://api.themoviedb.org/3/search/tv?api_key=${keyAPI}&query=${keySearch}`;
export const apiGenre = (key) => `
https://api.themoviedb.org/3/genre/${key}/list?api_key=${keyAPI}&language=en-US`;
export const apiMovieGenre = (genre, key) =>
  `https://api.themoviedb.org/3/discover/${genre}?api_key=${keyAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${key}&with_watch_monetization_types=flatrate`;
export const apiDetail = (genre, id) =>
  `https://api.themoviedb.org/3/${genre}/${id}?api_key=${keyAPI}&language=en-US&append_to_response=credits`;
export const apiTrailer = (genre, id) =>
  `https://api.themoviedb.org/3/${genre}/${id}/videos?api_key=${keyAPI}&language=en-US`;
export const getMovie2Embed = (id) =>
  `https://www.2embed.to/embed/tmdb/movie?id=${id}`;
export const getTvShow2Embed = (id, season, episode) =>
  `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`;
export const getseason = (id, season) =>
  `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${keyAPI}&language=en-US`;
export const getepisode = (id, season, episode) =>
  `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=${keyAPI}&language=en-US`;
