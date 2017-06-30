import React, { Component } from "react";
import { connect } from "react-redux";

import { selectMovie } from "./actions/Actions";

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.selectMovie = this.selectMovie.bind(this);
  }

  selectMovie(e) {
    const { selectThatMovie, movieId } = this.props;
    e.preventDefault();
    selectThatMovie(movieId);
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

    return (
      <div onClick={this.selectMovie} className="movieItem">
        <div style={posterStyle} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectThatMovie: movieId => {
    dispatch(selectMovie(movieId));
  }
});

export default connect(null, mapDispatchToProps)(MovieItem);
