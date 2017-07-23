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
    case "CLOSE_SELECTED_MOVIE":
      return {};
    default:
      return state;
  }
};

export const getActorData = (state = {}, action) => {
  switch (action.type) {
    case "GET_ACTOR_DATA":
      return action.data;
    default:
      return state;
  }
};
