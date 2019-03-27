import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
    movies: [],
    isLoading: true
  };

  getMovies = query => {
    axios
      .post(`${process.env.REACT_APP_API_PORT}/search`, {
        query
      })
      .then(res => {
        this.setState({
          movies: res.data.results
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const value = e.target.search.value;
    this.getMovies(value);
  };

  render() {
    const movies = this.state.movies;
    const movieList = movies.map(movie => {
      return (
        <div key={movie.id}>
          <Link to={{ pathname: "/movie/" + movie.id }}>
            <p>{movie.title}</p>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h1>Movies</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" />
          <button>Search</button>
        </form>
        {movieList}
      </div>
    );
  }
}
