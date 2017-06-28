import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

// Actions
import { getMovies } from "./actions/Actions";

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let year = e.target.firstChild.value;
    let checkRgx = /^(\d{4})$/;
    if (checkRgx.test(year)) {
      if (year * 1 > 1900 && year * 1 < 2017) {
        const { getMovieList } = this.props;
        getMovieList(year);
        // this.getMovies(year);
      }
    }
  }

  getMovies(year) {
    let apiKey = "69105684953c2ea2d50e1490cad9437c";
    let call = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year}`;
    const { getData } = this.props;
    Axios.get(call).then(movies => getData(movies.data.results));
  }

  render() {
    const inpStyle = {
      borderRadius: "2px",
      border: "1px solid darkgray",
      outline: "none",
      padding: "5px"
    };

    return (
      <div style={{ marginBottom: "10px" }}>
        <form onSubmit={this.handleSubmit}>
          <input style={inpStyle} placeholder={"Enter Year"} />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMovieList: year => {
    dispatch(getMovies(year));
  }
});

export default connect(null, mapDispatchToProps)(Input);
