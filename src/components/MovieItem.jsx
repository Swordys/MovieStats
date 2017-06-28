import React, { Component } from "react";

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.selectMovie = this.selectMovie.bind(this);
  }

  selectMovie(e) {
    e.preventDefault();
    console.log(this.props);
  }

  render() {
    const { poster } = this.props;

    const posterStyle = {
      height: "100%",
      width: "100%",
      background: `url(${poster})`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    };

    // console.log(this.props);
    return (
      <div onClick={this.selectMovie} className="movieItem">
        <div style={posterStyle} />
      </div>
    );
  }
}

export default MovieItem;
