import React, { Component } from "react";
import { connect } from "react-redux";

class SelectedMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.renderStyle = this.renderStyle.bind(this);
  }

  componentWillReceiveProps(props) {
    const { selectedMovie } = props;
    if (Object.keys(selectedMovie).length > 0) {
      this.setState({
        selected: true
      });
    }
    console.log(selectedMovie);
  }

  renderStyle(loc) {
    const { selected } = this.state;
    const { selectedMovie } = this.props;
    const baseBack = "http://image.tmdb.org/t/p/w780";
    if (selected) {
      if (loc === "wrap") {
        return {
          opacity: "1",
          zIndex: "1",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        };
      } else if (loc === "img") {
        return {
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          background: `url(${baseBack + selectedMovie.backdrop_path})`,
          transform: "scale(1)",
          transition: "transform 400ms ease-out",
          transitionDelay: "100ms",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        };
      }
    } else {
      if (loc === "wrap") {
        return {
          opacity: "0",
          zIndex: "-1"
        };
      } else if (loc === "img") {
        return {
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          transform: "scale(1.2)"
        };
      }
    }
  }

  render() {
    return (
      <div style={this.renderStyle("wrap")} className="selectedMovie">
        <div style={this.renderStyle("img")} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps, null)(SelectedMovie);
