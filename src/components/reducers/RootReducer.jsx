import { combineReducers } from "redux";
import { getMovieList, getSelectedMovie } from "./Reducers";

const rootReducer = combineReducers({
  movieList: getMovieList,
  selectedMovie: getSelectedMovie
});

export default rootReducer;
