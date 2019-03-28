import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../home/Home.css'
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

        <div class="col s12 m6">
          <Link to={{ pathname: "/movie/" + movie.id }}>
            <div class="card">
              <div class="card-image">
                <img src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="Not Found"></img>
              </div>
            </div>
          </Link>
        </div>

      );
    });
    return (
      <div className="sticky">
        <form onSubmit={this.handleSubmit}>
          <input type="text" autoComplete="off" name="search" />
          <button class="btn waves-effect waves-light" type="submit" name="action">Submit
          </button>
        </form>
        <div className="homeContainer">
          {movieList}
        </div>
      </div>
    );
  }
}
