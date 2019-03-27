import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

export default class Profile extends Component {
    state = {
        email: '',
        name: '',
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            email: decoded.email,
            name: decoded.name
        })
    }
    render() {
        return (
            <div>
                <h1>Welcome {this.state.name}</h1>
            </div>
        )
    }
}
