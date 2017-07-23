import { combineReducers } from "redux";
import { getMovieList, getSelectedMovie, getActorData } from "./Reducers";

const rootReducer = combineReducers({
  movieList: getMovieList,
  selectedMovie: getSelectedMovie,
  actorData: getActorData
});

export default rootReducer;
