import React, { Component } from 'react'
import '../start/Start.css'
import axios from 'axios'
import { Link } from "react-router-dom";

export default class Start extends Component {

    state = {
        latest: [],
        topMovie: [],
        upcoming: [],
        isLoading: true,
    }

    componentDidMount() {
        this.getLatest()
        this.getTop()
        this.getUpcoming()
    }

    getLatest = () => {
        axios
            .get(`${process.env.REACT_APP_API_PORT}/search/latest`)
            .then(res => {
                this.setState({
                    latest: res.data.results,
                    isLoading: false
                });
            });
    };
    getTop = () => {
        axios
            .get(`${process.env.REACT_APP_API_PORT}/search/top`)
            .then(res => {
                this.setState({
                    topMovie: res.data.results,
                });
            });
    };
    getUpcoming = () => {
        axios
            .get(`${process.env.REACT_APP_API_PORT}/search/upcoming`)
            .then(res => {
                this.setState({
                    upcoming: res.data.results
                });
            });
    };


    render() {
        const topRated = this.state.topMovie
        let topFive = []

        for (let i = 0; i < 5; i++) {
            if (topRated[i])
                topFive.push(topRated[i])
        }

        let showTop;

        showTop = topFive.map(top => {
            return (
                <div className="col s12 m6" key={top.id}>
                    <Link to={{ pathname: "/movie/" + top.id }}>
                        <div className="card">
                            <div className="card-image">
                                <img src={"http://image.tmdb.org/t/p/w185" + top.poster_path} alt="Not Found"></img>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })

        const latestMovies = this.state.latest
        let latestFive = []

        for (let y = 0; y < 5; y++) {
            if (latestMovies[y])
                latestFive.push(latestMovies[y])
        }

        let showLatest;

        showLatest = latestFive.map(latest => {
            return (
                <div className="col s12 m6" key={latest.id}>
                    <Link to={{ pathname: "/movie/" + latest.id }}>
                        <div className="card">
                            <div className="card-image">
                                <img src={"http://image.tmdb.org/t/p/w185" + latest.poster_path} alt="Not Found"></img>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })

        const upcomingMovies = this.state.upcoming
        let upcomingFive = []

        for (let x = 0; x < 5; x++) {
            if (upcomingMovies[x])
                upcomingFive.push(upcomingMovies[x])
        }

        let showUpcoming;

        showUpcoming = upcomingFive.map(upcoming => {
            return (
                <div classame="col s12 m6" key={upcoming.id}>
                    <Link to={{ pathname: "/movie/" + upcoming.id }}>
                        <div className="card">
                            <div className="card-image">
                                <img src={"http://image.tmdb.org/t/p/w185" + upcoming.poster_path} alt="Not Found"></img>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })
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
                    <div className="banner">
                        <div className="bannertext">
                            <div className="text">
                                <h5>Captain Marvel (2019)</h5>
                                <p>The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.</p>
                            </div>
                        </div>
                    </div>
                    <div className="featured">
                        <h4>Latest</h4>
                        <div className="latest">
                            {showLatest}
                        </div>
                        <h4>Top Rated</h4>
                        <div className="rated">
                            {showTop}
                        </div>
                        <h4>Upcoming</h4>
                        <div className="rated">
                            {showUpcoming}
                        </div>
                    </div>
                </div>
            )
        }
    }
}
