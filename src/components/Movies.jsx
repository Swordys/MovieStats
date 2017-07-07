import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import MovieItem from "./MovieItem";
import SelectedMovie from "./SelectedMovie";
import "../css/movies.css";
import "../css/reactTrans.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.renderMovieItems = this.renderMovieItems.bind(this);
  }

  renderMovieItems() {
    const { movieData } = this.props;
    let basePos = "http://image.tmdb.org/t/p/w154";
    let baseBack = "http://image.tmdb.org/t/p/w780";
    let time = -30;
    return movieData.map(item =>
      <MovieItem
        key={uuid()}
        movieId={item.id}
        poster={item.poster_path ? basePos + item.poster_path : null}
        title={item.title}
        date={item.release_date}
        backdrop={item.backdrop_path ? baseBack + item.backdrop_path : null}
        overview={item.overview}
        delay={(time += 30)}
      />
    );
  }

  render() {
    return (
      <div className="movieWrapMain">
        <ReactCSSTransitionGroup
          transitionName="movieItem"
          transitionEnterTimeout={3000}
          transitionLeaveTimeout={300}
          component="div"
          className="movieWrap"
        >
          {this.renderMovieItems()}
        </ReactCSSTransitionGroup>
        <SelectedMovie />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movieData: state.movieList
});

export default connect(mapStateToProps, null)(Movies);
