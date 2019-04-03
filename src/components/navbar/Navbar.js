import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../navbar/Navbar.css'

class Navbar extends Component {
    logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        this.props.history.push('/tmdb')
    }

    render() {
        const notLoggedIn = (
            <ul>
                <li>
                    <Link to="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        Register
                    </Link>
                </li>
            </ul>
        )

        const loggedIn = (
            <ul>
                <li>
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <a href="/tmdb" onClick={this.logout.bind(this)}>
                        Logout
                    </a>
                </li>
            </ul>
        )
        return (
            <header>
                <div className="navWrapper">
                    <a href="/tmdb" className="logo">IMDB Clone</a>
                    <ul id="navMenu" className="navMenu">
                        <li><Link to="/tmdb">Home</Link> </li>
                        <li><Link to="/movies">Movies</Link> </li>
                        {localStorage.usertoken ? loggedIn : notLoggedIn}

                    </ul>
                </div>
            </header>
        )
    }
}

export default withRouter(Navbar)