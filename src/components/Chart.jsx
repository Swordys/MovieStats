import React, { Component } from "react";
import Chart from "chart.js";

class Charto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    };
  }

  componentDidUpdate() {
    let chatCanvas = this.refs.chart;
    const { movieData } = this.props;
    const { arr } = this.state;

    let movieChart = new Chart(chatCanvas, {
      type: "line",
      data: {
        labels: [...movieData.map(mov => mov.title)],
        datasets: [
          {
            label: "Popularity",
            backgroundColor: "rgba(172, 138, 173, 0.8)",
            data: [...movieData.map(mov => mov.popularity.toFixed(2) * 1)]
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
          text: `Most popular movies in ${movieData[0].release_date.substring(
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
      <div>
        <canvas ref={"chart"} />
      </div>
    );
  }
}

export default Charto;
