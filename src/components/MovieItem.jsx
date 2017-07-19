import React, { Component } from "react";
import { connect } from "react-redux";
import Tilt from "vanilla-tilt";
// import StarRatingComponent from "react-star-rating-component";

import { selectMovie } from "./actions/Actions";

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.selectMovie = this.selectMovie.bind(this);
    this.applyTilt = this.applyTilt.bind(this);
  }

  applyTilt() {
    const { movieItem } = this.refs;
    Tilt.init(movieItem, {
      max: 25,
      speed: 500,
      scale: 1.05,
      glare: true,
      "max-glare": 0.3
    });
  }

  selectMovie(e) {
    const { selectThatMovie, movieId } = this.props;
    e.preventDefault();
    selectThatMovie(movieId);
  }

  render() {
    const { poster, delay } = this.props;
    const posterStyle = {
      background: `url(${poster})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      transitionDelay: `${delay}ms`,
      transformStyle: "preserve-3d"
    };

    return (
      <div
        ref="movieItem"
        onMouseEnter={this.applyTilt}
        onClick={this.selectMovie}
        className="movieItem"
        style={posterStyle}
      >
        <div
          style={{
            height: "70px",
            width: "70px",
            background: "white",
            transform: "translateZ(20px)",
            opacity: 0
          }}
        />
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
