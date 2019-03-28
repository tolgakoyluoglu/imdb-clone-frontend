import React, { Component } from 'react'
import '../start/Start.css'
import axios from 'axios'
import { Link } from "react-router-dom";

export default class Start extends Component {

    state = {
        latest: [],
        topMovie: [],
        popular: []
    }

    componentDidMount() {
        this.getLatest()
        this.getTop()
    }

    getLatest = () => {
        axios
            .get(`${process.env.REACT_APP_API_PORT}/search/latest`)
            .then(res => {
                this.setState({
                    latest: res.data.results
                });
                console.log(res)
            });
    };
    getTop = () => {
        axios
            .get(`${process.env.REACT_APP_API_PORT}/search/top`)
            .then(res => {
                this.setState({
                    topMovie: res.data.results
                });
                console.log(res)
            });
    };


    render() {
        const topRated = this.state.topMovie
        let topFive = []

        for (let i = 0; i < 5; i++) {
            if (topRated[i])
                topFive.push(topRated[i])
            console.log(topFive)
        }

        let showTop;

        showTop = topFive.map(top => {
            return (
                <div class="col s12 m6">
                    <Link to={{ pathname: "/movie/" + top.id }}>
                        <div class="card">
                            <div class="card-image">
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
            console.log(latestFive)
        }

        let showLatest;

        showLatest = latestFive.map(dataLatest => {
            return (
                <div class="col s12 m6">
                    <Link to={{ pathname: "/movie/" + dataLatest.id }}>
                        <div class="card">
                            <div class="card-image">
                                <img src={"http://image.tmdb.org/t/p/w185" + dataLatest.poster_path} alt="Not Found"></img>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })

        return (
            <div className="sticky">
                <div className="banner">
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
                </div>
            </div>
        )
    }
}
