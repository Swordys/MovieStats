export const getCurrentDate = (state = "", action) => {
  switch (action.type) {
    case "SET_DATE":
      return action.date;
    default:
      return state;
  }
};

export const getMovieList = (state = [], action) => {
  switch (action.type) {
    case "GET_MOVIE_LIST":
      return [...action.list];
    default:
      return state;
  }
};


