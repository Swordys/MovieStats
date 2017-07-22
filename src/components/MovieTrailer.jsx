import React, { Component } from "react";
import { connect } from "react-redux";

class MovieTrailer extends Component {
  render() {
    let playerStyle = {
      border: "1px solid black",
      height: "100%",
      width: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      transition: "all 350ms ease-out",
      transform: "translateY(-30px)",
      opacity: "0",
      zIndex: "-1"
    };

    let id = "";

    const { videos } = this.props.selectedMovie;

    if (videos && videos.results) {
      id = videos.results[0].key;
    }

    if (this.props.playTrailer) {
      playerStyle.transform = "translateY(0px)";
      playerStyle.opacity = "1";
      playerStyle.zIndex = "5";
    }


    return (
      <div style={playerStyle}>
        <iframe
          title="movieTrailer"
          id="ytplayer"
          type="text/html"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}?fs=0&rel=0&showinfo=0&color=white&iv_load_policy=3`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps, null)(MovieTrailer);
