import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import '../profile/Profile.css'
import axios from 'axios';
import { Link } from "react-router-dom";

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
        this.setState({
            email: decoded.email,
            name: decoded.name,
        })
        this.showMovie()
    }
    //Show movies in watchlist
    showMovie = () => {
        const user = localStorage.getItem('id')
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
                console.log(res)
                this.showMovie()
            })
    }

    render() {
        let watchlist = this.state.watchlist
        let movieList = watchlist.map(movie => {
            return (
                // <div className="movieContainer">
                //     <div className="icon" key={movie._id}>
                //     </div>
                //     <div className="imageContainer">
                //         <div className="card">
                //             <div className="card-image">
                //                 <img src={"http://image.tmdb.org/t/p/w185" + movie.image} alt="Not Found"></img>
                //             </div>
                //         </div>
                //     </div>
                // </div>

                <div className="col s12 m6" key={movie.id}>
                    <Link to={{ pathname: "/movie/" + movie.id }}>
                        <div className="card">
                            <div className="card-image">
                                <img src={"http://image.tmdb.org/t/p/w185" + movie.image} alt="Not Found"></img>
                            </div>
                        </div>
                    </Link>
                    <h6>{movie.title}</h6>
                    <i onClick={() => this.deleteMovie(movie._id)} className="small material-icons">clear</i>
                </div >


            )
        })
        return (
            <div className="sticky">
                <div className="form">
                    <h5>Welcome {this.state.name}!</h5>
                </div>
                <div className="watchList">
                    <h5>Watchlist: </h5>
                    <div className="watchlistContainer">

                        {movieList}
                    </div>
                </div>
            </div>
        )
    }
}
