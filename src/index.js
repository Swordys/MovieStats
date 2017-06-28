import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import configureStore from "./components/store/configureStore.jsx";

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
