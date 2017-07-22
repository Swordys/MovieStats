import React, { Component } from "react";
import { connect } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import { convTime } from "./common/helper.js";

// Actions
import { closeSelected } from "./actions/Actions";

// Components
import CastMember from "./CastMember";
import MovieTrailer from "./MovieTrailer";

// Styles
import "../css/awesome/font-awesome.min.css";
import "../css/selectedMovie.css";

class SelectedMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      playTrailer: false
    };
    this.renderStyle = this.renderStyle.bind(this);
    this.closeSelected = this.closeSelected.bind(this);
    this.renderCast = this.renderCast.bind(this);
    this.closeTrailer = this.closeTrailer.bind(this);
  }

  componentWillReceiveProps(props) {
    const { selectedMovie } = props;
    // console.log(selectedMovie);
    if (Object.keys(selectedMovie).length > 0) {
      this.setState({
        selected: true
      });
    }
  }

  renderCast() {
    let { cast } = this.props.selectedMovie;

    if (cast) {
      if (cast.length > 6) {
        cast = cast.slice(0, 6);
      }
      return cast.map(item => {
        return <CastMember {...item} key={item.id} />;
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
    const { closeMovie } = this.props;
    closeMovie();
    this.setState({
      selected: false
    });
  }

  closeTrailer() {
    this.setState({
      playTrailer: false
    });
  }

  render() {
    const {
      title,
      poster_path,
      release_date,
      overview,
      runtime,
      genres,
      vote_average,
      vote_count,
      videos
    } = this.props.selectedMovie;
    const posterLink = "http://image.tmdb.org/t/p/w342";

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
        <div style={this.renderStyle("img")} />
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
                textShadow: "0px 1px black",
                flexShrink: "0"
              }}
            >
              {title}
            </h1>
            <div
              style={{ flexShrink: "0", color: "white", marginBottom: "5px" }}
            >
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
                alignItems: "center",
                flexShrink: "0"
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
                  fontSize: "13px",
                  flexShrink: "0"
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
            <div className="movieCast">
              <div className="castMemberWrap">
                {this.renderCast()}
              </div>
            </div>
            <div
              onClick={() =>
                !this.state.playTrailer && this.setState({ playTrailer: true })}
              className="movieTrailer"
            >
              <div className="trailerIcon">
                <i
                  style={{ fontSize: "12px", color: "white" }}
                  className="fa fa-play"
                  aria-hidden="true"
                />
              </div>
              <span className="trailerText">WATCH TRAILER</span>
            </div>
          </div>
        </div>
        <MovieTrailer
          closeTrailer={this.closeTrailer}
          playTrailer={this.state.playTrailer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie
});

const mapDispatchToProps = dispatch => ({
  closeMovie: () => {
    dispatch(closeSelected());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMovie);
