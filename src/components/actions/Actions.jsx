import Axios from "axios";

// const setDate = date => ({
//   type: "SET_DATE",
//   date
// });

const getMovieList = list => ({
  type: "GET_MOVIE_LIST",
  list
});

export const getMovies = year => dispatch => {
  let apiKey = "69105684953c2ea2d50e1490cad9437c";
  let call = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year}`;
  Axios.get(call).then(movies => {
    // dispatch(setDate(year));
    dispatch(getMovieList(movies.data.results));
  });
};
