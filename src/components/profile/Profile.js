import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { update } from '../functions/UserFunctions'
import '../profile/Profile.css'

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
            <div className="sticky">
                <div className="form">
                    <h5>Welcome {this.state.name}!</h5>
                    <form className="formProfile" noValidate onSubmit={this.onSubmit}>
                        <label>Change Name: </label>
                        <input type="text" className="inputName" name="changeName" value={this.state.changeName} onChange={this.onChange}></input>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                    </form>
                </div>
                <div className="watchList">
                    <h5>Watchlist: </h5>
                </div>
            </div>
        )
    }
}
