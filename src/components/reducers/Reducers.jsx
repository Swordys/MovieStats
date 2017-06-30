export const getMovieList = (state = [], action) => {
  switch (action.type) {
    case "GET_MOVIE_LIST":
      return [...action.list];
    default:
      return state;
  }
};

export const getSelectedMovie = (state = {}, action) => {
  switch (action.type) {
    case "GET_SELECTED_MOVIE":
      return action.movieObj;
    default:
      return state;
  }
};
