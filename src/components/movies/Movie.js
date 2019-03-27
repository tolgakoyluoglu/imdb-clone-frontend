import React, { Component } from "react";
import axios from "axios";

export default class Movie extends Component {
  state = {
    movie: []
  };

  componentDidMount = () => {
    let id = this.props.match.params.id;
    axios
      .post(`${process.env.REACT_APP_API_PORT}/search/movie`, {
        id
      })
      .then(res => {
        this.setState({
          movie: res.data
        });
        console.log(this.state);
      });
  };
  render() {
    return (
      <div>
        <h1>Detals</h1>
        <p>{this.state.movie.title}</p>
      </div>
    );
  }
}
