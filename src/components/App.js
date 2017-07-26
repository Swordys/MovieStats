import React, { Component } from "react";
import "../App.css";
import Input from "./Input.jsx";
import Charto from "./Chart.jsx";
import Movies from "./Movies.jsx";
import SelectedActor from "./SelectedActor.jsx";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Input />
        <Charto />
        <Movies />
        <SelectedActor />
      </div>
    );
  }
}

export default App;
