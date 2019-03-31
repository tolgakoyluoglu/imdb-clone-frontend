import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../navbar/Navbar.css'

class Navbar extends Component {
    logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        this.props.history.push('/')
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
                    <a href="/" onClick={this.logout.bind(this)}>
                        Logout
                    </a>
                </li>
            </ul>
        )
        return (
            <header>
                <nav className="navbar">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">IMDB Clone</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to="/">Home</Link> </li>
                            <li><Link to="/movies">Movies</Link> </li>
                            <li>{localStorage.usertoken ? loggedIn : notLoggedIn}</li>

                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default withRouter(Navbar)