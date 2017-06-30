import React, { Component } from "react";
import { connect } from "react-redux";

class SelectedMovie extends Component {
  constructor(props) {
    super(props);
    this.renderStyle = this.renderStyle.bind(this);
  }

  renderStyle() {
    const { selectedMovie } = this.props;
    if (Object.keys(selectedMovie).length > 0) {
      console.log(selectedMovie);
      let baseBack = "http://image.tmdb.org/t/p/w780";
      return {
        opacity: "1",
        zIndex: "1",
        transform: "rotateX(0)",
        background: `url(${baseBack + selectedMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      };
    }
    return {
      opacity: "0",
      zIndex: "-1",
      transform: "rotateX(35deg)"
    };
  }

  render() {
    return <div style={this.renderStyle()} className="selectedMovie" />;
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps, null)(SelectedMovie);
