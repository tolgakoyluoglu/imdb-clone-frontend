import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import '../profile/Profile.css'
import axios from 'axios';

export default class Profile extends Component {
    state = {
        email: '',
        name: '',
        watchlist: [],
    }
    //Decode the mail and name so we can display it on profile page. Do post request to backend API to show movies in watchlist
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const user = localStorage.getItem('id')
        this.setState({
            email: decoded.email,
            name: decoded.name,
        })
        axios.post(`${process.env.REACT_APP_API_PORT}/watchlist/show`, {
            user: user
        })
            .then(res => {
                this.setState({
                    watchlist: res.data
                })
            })
    }

    //Delete movie from watchlist
    deleteMovie = (id) => {
        axios.delete(`${process.env.REACT_APP_API_PORT}/watchlist/delete/${id}`)
            .then(res => {
            })
    }

    render() {
        let watchlist = this.state.watchlist
        let movieList = watchlist.map(movie => {
            return (
                <div key={movie._id}>
                    <p>{movie.title}<i onClick={() => this.deleteMovie(movie._id)} className="small material-icons">clear</i></p>

                </div>
            )
        })
        return (
            <div className="sticky">
                <div className="form">
                    <h5>Welcome {this.state.name}!</h5>
                </div>
                <div className="watchList">
                    <h5>Watchlist: </h5>
                    {movieList}
                </div>
            </div>
        )
    }
}
