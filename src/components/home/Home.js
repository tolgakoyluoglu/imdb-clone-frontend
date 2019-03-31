import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../home/Home.css'
export default class Home extends Component {
  state = {
    movies: [],
    isLoading: true
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_PORT}/search/latest`)
      .then(res => {
        this.setState({
          movies: res.data.results,
          isLoading: false
        });
      });
  }

  getMovies = query => {
    axios
      .post(`${process.env.REACT_APP_API_PORT}/search`, {
        query
      })
      .then(res => {
        this.setState({
          movies: res.data.results,
          isLoading: false,
        });
      });
  };

  handleSubmit = e => {
    this.setState({ isLoading: true })
    e.preventDefault();
    const value = e.target.search.value;
    this.getMovies(value);
  };

  render() {
    const movies = this.state.movies;
    const movieList = movies.map(movie => {
      return (
        <div className="col s12 m6" key={movie.id}>
          <Link to={{ pathname: "/movie/" + movie.id }}>
            <div className="card">
              <div className="card-image">
                <img src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="Not Found"></img>
              </div>
            </div>
          </Link>
        </div >

      );
    });
    if (this.state.isLoading) {
      return (
        <div className="sticky">
          <div className="containerLoader">
            <div className="loading"></div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="sticky">
          <form className="homeSearch" onSubmit={this.handleSubmit}>
            <input type="text" autoComplete="off" name="search" placeholder="Search for any movie.." />
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
            <div className="custom-select" display="show">
            </div>
          </form>
          <div className="homeContainer">
            {movieList}
          </div>
        </div>
      );
    }
  }
}
