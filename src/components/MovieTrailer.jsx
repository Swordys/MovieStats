import React, { Component } from "react";
import { connect } from "react-redux";

class MovieTrailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailerState: false
    };

    this.renderPlayer = this.renderPlayer.bind(this);
  }

  renderPlayer() {
    const { videos } = this.props.selectedMovie;

    if (videos && videos.results) {
      let key = "";
      if (videos.results.length > 0) {
        key = videos.results[0].key;
      }
      return (
        <iframe
          title="movieTrailer"
          id="ytplayer"
          type="text/html"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${key}?fs=0&rel=0&showinfo=0&color=white&iv_load_policy=3`}
          frameBorder="0"
          allowFullScreen
        />
      );
    }
  }

  render() {
    let playerStyle = {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      transition:
        "z-index 400ms step-start, opacity 400ms ease-out, transform 400ms ease-out",
      transform: "translateY(-30px)",
      opacity: "0",
      zIndex: "-1"
    };

    if (this.props.playTrailer) {
      playerStyle.transform = "translateY(0px)";
      playerStyle.opacity = "1";
      playerStyle.zIndex = "5";
    } else {
      playerStyle.transition =
        "z-index 400ms step-end, opacity 400ms linear, transform 400ms ease-out";
    }

    return (
      <div style={playerStyle}>
        <div onClick={() => this.props.closeTrailer()} className="closeBtn">
          <i className="fa fa-times" aria-hidden="true" />
        </div>
        {this.renderPlayer()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps, null)(MovieTrailer);
