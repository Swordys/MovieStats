import Axios from "axios";

const getMovieList = list => ({
  type: "GET_MOVIE_LIST",
  list
});

const selectedMovie = movieObj => ({
  type: "GET_SELECTED_MOVIE",
  movieObj
});

export const closeSelected = () => ({
  type: "CLOSE_SELECTED_MOVIE"
});

export const getMovies = year => dispatch => {
  let apiKey = "69105684953c2ea2d50e1490cad9437c";
  let call = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_count.desc&primary_release_year=${year}`;
  Axios.get(call).then(movies => {
    dispatch(getMovieList(movies.data.results));
  });
};

export const selectMovie = movieId => dispatch => {
  let call = `https://api.themoviedb.org/3/movie/${movieId}?api_key=69105684953c2ea2d50e1490cad9437c&language=en-US&append_to_response=videos`;
  let callCast = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=69105684953c2ea2d50e1490cad9437c`;
  let movieData = null;
  let movieCast = null;
  Axios.get(call)
    .then(movie => {
      movieData = movie.data;
      return Axios.get(callCast);
    })
    .then(cast => {
      movieCast = cast.data;
      dispatch(selectedMovie(Object.assign(movieData, movieCast)));
      // console.log(movieData);
      // console.log(movieCast);
    });
};

const actorData = data => ({
  type: "GET_ACTOR_DATA",
  data
});

export const selectActor = actorId => dispatch => {
  let apiKey = "69105684953c2ea2d50e1490cad9437c";
  let call = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`;
  Axios.get(call).then(actor => {
    dispatch(actorData(actor.data));
  });
};
