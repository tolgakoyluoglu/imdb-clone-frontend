import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { update } from '../functions/UserFunctions'

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
            name: decoded.name,
            changeName: ''
        })
    }

    onChange = this.onChange.bind(this)
    onSubmit = this.onSubmit.bind(this)

    onSubmit(e) {
        e.preventDefault()

        const user = {
            name: this.state.changeName,
            email: this.state.email
        }
        update(user).then(res => {
            this.setState({
                name: user.name
            })

        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.state.name}</h1>
                <form noValidate onSubmit={this.onSubmit}>
                    <label>Change Name</label>
                    <input type="text" name="changeName" value={this.state.changeName} onChange={this.onChange}></input>
                    <button type="submit">Click</button>
                </form>
            </div>
        )
    }
}
