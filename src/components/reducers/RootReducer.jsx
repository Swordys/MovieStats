import { combineReducers } from "redux";
import { getCurrentDate, getMovieList } from "./Reducers";

const rootReducer = combineReducers({
  currentDate: getCurrentDate,
  movieList: getMovieList
});

export default rootReducer;
