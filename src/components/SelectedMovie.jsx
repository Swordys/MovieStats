import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/awesome/font-awesome.min.css";
import "../css/selectedMovie.css";

class SelectedMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.renderStyle = this.renderStyle.bind(this);
    this.closeSelected = this.closeSelected.bind(this);
  }

  componentWillReceiveProps(props) {
    const { selectedMovie } = props;
    if (Object.keys(selectedMovie).length > 0) {
      this.setState({
        selected: true
      });
    }
  }

  renderStyle(loc) {
    const { selected } = this.state;
    const { selectedMovie } = this.props;
    const baseBack = "http://image.tmdb.org/t/p/w780";
    if (selected) {
      if (loc === "wrap") {
        return {
          opacity: "1",
          zIndex: "10",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transition: "z-index 400ms step-start, opacity 400ms linear",
          willChange: "transform"
        };
      } else if (loc === "img") {
        return {
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url(${baseBack + selectedMovie.backdrop_path})`,
          transform: "scale(1.1)",
          transition: "transform 400ms ease-out",
          transitionDelay: "100ms",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "blur(3px)",
          willChange: "transform"
        };
      }
    } else {
      if (loc === "wrap") {
        return {
          opacity: "0",
          zIndex: "-1",
          transition: "z-index 400ms step-end, opacity 400ms linear",
          willChange: "transform"
        };
      } else if (loc === "img") {
        return {
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          transform: "scale(1.3)",
          background: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),url(${selectedMovie.backdrop_path &&
      baseBack + selectedMovie.backdrop_path})`,
          transition: "transform 300ms ease-out",
          willChange: "transform"
        };
      }
    }
  }

  closeSelected() {
    console.log("close");
    this.setState({
      selected: false
    });
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
      boxShadow: "0px 0px 31px -3px rgba(0,0,0,0.45)",
      willChange: "transform"
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
      alignItems: "flex-start",
      willChange: "transform"
    };

    const movieInfo = {
      width: "100%",
      height: "100%",
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
            <div className="closeBtn">
              <i
                onClick={this.closeSelected}
                className="fa fa-times"
                aria-hidden="true"
              />
            </div>
            <h1 style={{ color: "white", textShadow: "0px 1px black" }}>
              {title}
            </h1>
            <div style={{ marginTop: "10px" }}>
              <span style={spanStyle}>
                <i className="fa fa-calendar-o" aria-hidden="true" />
                {" " + release_date}
              </span>
              <span style={spanStyle}>
                <i className="fa fa-clock-o" aria-hidden="true" />
                {" " + runtime + " min"}
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
