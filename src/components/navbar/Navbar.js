import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../navbar/Navbar.css'

class Navbar extends Component {
    logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
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
                    <div class="nav-wrapper">
                        <a href="/" class="brand-logo">The Movie Base</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
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