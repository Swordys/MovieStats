import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "chart.js";
// import Grade from "grade-js";

class Charto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    };
  }

  componentDidUpdate() {
    let chatCanvas = this.refs.chart;
    const { movieData, selectedMovie } = this.props;
    const { arr } = this.state;
    let { budget, revenue } = selectedMovie;
    let movieChart = null;

    if (budget && revenue) {
      // budget = Math.round((budget /= 1000000));
      // revenue = Math.round((revenue /= 1000000));
      movieChart = new Chart(chatCanvas, {
        type: "doughnut",
        data: {
          labels: ["Budget", "Revenue"],
          datasets: [
            {
              label: "Movie Revenue",
              backgroundColor: ["#8e5ea2", "#3cba9f"],
              data: [budget, revenue]
            }
          ]
        },
        options: {
          title: {
            display: false
          }
        }
      });
    } else
      movieChart = new Chart(chatCanvas, {
        type: "line",
        data: {
          labels: [...movieData.map(mov => mov.title)],
          datasets: [
            {
              label: "Raiting",
              backgroundColor: "rgba(172, 138, 173, 0.8)",
              data: [...movieData.map(mov => mov.vote_average)]
            }
          ]
        },

        options: {
          scales: {
            xAxes: [
              {
                stacked: false,
                beginAtZero: true,
                scaleLabel: {
                  labelString: "Month"
                },
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }
            ]
          },
          legend: { display: false },
          title: {
            display: true,
            text: `Raitings for popular movies in ${movieData[0].release_date.substring(
              0,
              4
            )}`
          }
        }
      });

    arr.push(movieChart);
    if (arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        arr[i].destroy();
      }
    }
  }

  render() {
    return (
      <div style={{ padding: "20px 0 20px 0" }}>
        <canvas ref={"chart"} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movieData: state.movieList,
  selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps, null)(Charto);
