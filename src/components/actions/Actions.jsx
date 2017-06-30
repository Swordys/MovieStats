import Axios from "axios";

const getMovieList = list => ({
  type: "GET_MOVIE_LIST",
  list
});

const selectedMovie = movieObj => ({
  type: "GET_SELECTED_MOVIE",
  movieObj
});

export const getMovies = year => dispatch => {
  let apiKey = "69105684953c2ea2d50e1490cad9437c";
  let call = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_count.desc&primary_release_year=${year}`;
  Axios.get(call).then(movies => {
    dispatch(getMovieList(movies.data.results));
  });
};

export const selectMovie = movieId => dispatch => {
  let call = `https://api.themoviedb.org/3/movie/${movieId}?api_key=69105684953c2ea2d50e1490cad9437c&language=en-US`;
  Axios.get(call).then(movie => {
    dispatch(selectedMovie(movie.data));
  });
};
