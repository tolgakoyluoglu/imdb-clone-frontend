import React, { Component } from "react";
import axios from "axios";
import '../movies/Movie.css'
import { Link } from "react-router-dom";

export default class Movie extends Component {
  state = {
    movie: [],
    cast: [],
    crew: [],
    video: [],
    isLoading: true,
    genre: [],
  };
  //Get movie, credit and video from API
  componentDidMount = () => {
    window.scrollTo(0, 0)

    let id = this.props.match.params.id;
    axios
      .post(`${process.env.REACT_APP_API_PORT}/search/movie`, {
        id
      })
      .then(res => {
        this.setState({
          movie: res.data,
          genre: res.data.genres[0],
          isLoading: false,
        });
      })
      .then(axios.post(`${process.env.REACT_APP_API_PORT}/search/credit`, {
        id
      })
        .then(res => {
          this.setState({
            cast: res.data.cast,
            crew: res.data.crew,
          })
        })
        .then(axios.post(`${process.env.REACT_APP_API_PORT}/search/video`, {
          id
        })
          .then(res => {
            this.setState({
              video: res.data.results[0],
            })
            console.log(this.state)
          })
        )
      )
  }

  //Save movie to watchlist
  saveToWatchlist = () => {
    let model = {
      id: localStorage.getItem('id'),
      movieId: this.state.movie.id,
      title: this.state.movie.title,
      image: this.state.movie.poster_path,
    }

    axios.post(`${process.env.REACT_APP_API_PORT}`)
    console.log(model)
  }

  render() {
    //Display actors
    const topActors = this.state.cast
    let topFive = []

    for (let i = 0; i < 5; i++) {
      if (topActors[i])
        topFive.push(topActors[i])
    }

    let showTop;

    showTop = topFive.map(top => {
      return (
        <div className="actorContainer" key={top.id}>
          <div className="name">
            <ul>
              <li>{top.name}</li>
            </ul>
          </div>
        </div>
      )
    })
    //Display crew
    const topCrew = this.state.crew
    let crewFive = []

    for (let x = 0; x < 5; x++) {
      if (topCrew[x])
        crewFive.push(topCrew[x])
    }

    let showCrew;

    showCrew = crewFive.map(crew => {
      return (
        <div className="actorContainer" key={crew.credit_id}>
          <div className="name" key={crew.id}>
            <ul>
              <li>{crew.job}: <strong>{crew.name}</strong></li>
            </ul>
          </div>
        </div>
      )
    })
    //Loading indicator
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
          <div className="movieContainer">
            <div className="imageContainer">
              <div className="card">
                <div className="card-image">
                  <img src={"http://image.tmdb.org/t/p/w185" + this.state.movie.poster_path} alt="Not Found"></img>
                </div>
              </div>
            </div>
            <div className="movieText">
              <h4>{this.state.movie.title}</h4>
              <p>{this.state.movie.release_date}</p>
              <p>{this.state.genre.name}</p>
              <p>{this.state.movie.overview}</p>
              <p>Imdb Rating: {this.state.movie.vote_average}</p>
              <p>Popularity: {this.state.movie.popularity}</p>
              <p>Runtime: {this.state.movie.runtime} min</p>
              <Link to={{ pathname: "/profile/" + this.state.movie.id }}>
                <button onClick={this.saveToWatchlist} className="btn waves-effect waves-light" type="submit" name="action">Add to watchlist</button>
              </Link>

            </div>
            <div className="movieInfo">
              <h5>Actors: </h5>
              {showTop}
            </div>
            <div className="movieInfo">
              <h5>Crew: </h5>
              {showCrew}
            </div>
          </div>
          <div className="video">
            <div className="videoContainer">
              <h4>Trailer</h4>
              {this.state.video !== undefined ? <iframe src={`https://www.youtube.com/embed/${this.state.video.key}?rel=0&amp;controls=0&amp;showinfo=0`} allow="autoplay; encrypted-media"
                allowFullScreen title="Youtube"></iframe> : 'Trailer not found'}
            </div>
          </div>
        </div>
      );
    }
  }
}
