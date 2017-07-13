import React, { Component } from "react";
import { connect } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import { convTime } from "./common/helper.js";
import Grade from "grade-js";

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
    const { bkDrop } = this.refs;
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
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url(${selectedMovie.backdrop_path &&
      baseBack + selectedMovie.backdrop_path})`,
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
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),url(${selectedMovie.backdrop_path &&
      baseBack + selectedMovie.backdrop_path})`,
          transition: "transform 300ms ease-out",
          willChange: "transform"
        };
      }
    }
  }

  closeSelected() {
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
      runtime,
      genres,
      vote_average,
      vote_count
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

    return (
      <div style={this.renderStyle("wrap")} className="selectedMovie">
        <div ref="bkDrop" style={this.renderStyle("img")} />
        <div className="bkShadow" />
        <div className="movieInfoWrap">
          <div ref={"movieCover"} style={coverStyle} />
          <div className="movieInfo">
            <div onClick={this.closeSelected} className="closeBtn">
              <i className="fa fa-times" aria-hidden="true" />
            </div>
            <h1
              style={{
                color: "white",
                marginBottom: "10px",
                textShadow: "0px 1px black"
              }}
            >
              {title}
            </h1>
            <div style={{ color: "white", marginBottom: "5px" }}>
              {genres &&
                genres.map(item =>
                  <span className="movieGenre" key={item.id}>
                    {item.name}
                  </span>
                )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <StarRatingComponent
                name={"movieRating"}
                value={Math.round(vote_average)}
                starCount={10}
                editing={false}
                renderStarIcon={(index, value) => {
                  return (
                    <span
                      style={{ marginRight: "3.5px", fontSize: "14px" }}
                      className={index <= value ? "fa fa-star" : "fa fa-star"}
                    />
                  );
                }}
                emptyStarColor={"#ccc"}
              />
              <span
                className="spanStyle"
                style={{
                  padding: "0",
                  margin: "1px 0 0 5px",
                  fontSize: "13px"
                }}
              >
                ({vote_count})
              </span>
            </div>
            <div style={{ marginTop: "5px" }}>
              <span className="spanStyle">
                {release_date && " " + release_date.substring(0, 4)}
              </span>
              <span className="spanStyle">
                <i className="fa fa-clock-o" aria-hidden="true" />
                {" " + convTime(runtime)}
              </span>
            </div>
            <div style={{ marginTop: "15px" }}>
              <p className="aboutMovie">
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
