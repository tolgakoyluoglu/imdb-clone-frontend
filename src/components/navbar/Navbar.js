import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

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
                    <button href="" onClick={this.logout.bind(this)}>
                        Logout
                    </button>
                </li>
            </ul>
        )
        return (
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? loggedIn : notLoggedIn}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)