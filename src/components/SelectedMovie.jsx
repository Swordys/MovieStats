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
    // console.log(selectedMovie);
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
          transform: "scale(1.1)",
          transition: "transform 400ms ease-out",
          transitionDelay: "100ms",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "blur(3px)"
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
          transform: "scale(1.3)"
        };
      }
    }
  }

  render() {
    const {
      title,
      poster_path,
      release_date,
      budget,
      overview,
      revenue,
      runtime
    } = this.props.selectedMovie;
    const posterLink = "http://image.tmdb.org/t/p/w342";
    console.log(budget, revenue);

    const coverStyle = {
      height: "100%",
      width: "265px",
      backgroundImage: poster_path && `url(${posterLink + poster_path})`,
      flexShrink: "0",
      marginRight: "20px",
      borderRadius: "2px",
      overFlow: "hidden",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      boxShadow: "0px 0px 31px -3px rgba(0,0,0,0.45)"
    };

    const movieInfoWrap = {
      boxSizing: "border-box",
      height: "100%",
      width: "100%",
      position: "relative",
      padding: "20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start"
    };

    const movieInfo = {
      width: "100%",
      height: "100%",
      opacity: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start"
    };

    const spanStyle = {
      color: "white",
      marginRight: "10px",
      fontWeight: "bold",
      textShadow: "0px 1px black"
    };

    return (
      <div style={this.renderStyle("wrap")} className="selectedMovie">
        <div style={this.renderStyle("img")} />
        <div style={movieInfoWrap}>
          <div style={coverStyle} />
          <div style={movieInfo}>
            <h1 style={{ color: "white", textShadow: "0px 1px black" }}>
              {title}
            </h1>
            <div style={{ marginTop: "10px" }}>
              <span style={spanStyle}>
                {release_date}
              </span>
              <span style={spanStyle}>
                {runtime + " min"}
              </span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <p style={{ color: " white", textShadow: "0px 1px black" }}>
                {overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps, null)(SelectedMovie);
