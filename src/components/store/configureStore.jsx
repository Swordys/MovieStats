import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/RootReducer";

export default function configStore(initialState) {
  return createStore(reducer, initialState, applyMiddleware(thunk));
}
