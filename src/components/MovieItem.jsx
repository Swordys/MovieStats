import React, { Component } from "react";

class MovieItem extends Component {
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
      <div className="movieItem">
        <div style={posterStyle} />
      </div>
    );
  }
}

export default MovieItem;
