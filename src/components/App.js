import React, { Component } from "react";
import "../App.css";
import Input from "./Input.jsx";
import Charto from "./Chart.jsx";
import Movies from "./Movies.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };

    this.getMovieData = this.getMovieData.bind(this);
  }

  getMovieData(data) {
    this.setState({
      movies: data
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="App">
        <Input getData={this.getMovieData} />
        <Charto movieData={movies} />
        <Movies movieData={movies} />
      </div>
    );
  }
}

export default App;
