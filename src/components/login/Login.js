import React, { Component } from 'react'
import { login } from '../functions/UserFunctions'
import '../login/Login.css'

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    onChange = this.onChange.bind(this)
    onSubmit = this.onSubmit.bind(this)

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push('/profile')
            }
        })
    }
    render() {
        return (
            <div className="sticky">
                <form noValidate onSubmit={this.onSubmit}>
                    <h5>Sign in</h5>
                    <input type="email" name="email" placeholder="Email.." value={this.state.email} onChange={this.onChange}></input>
                    <input type="password" name="password" placeholder="Password.." value={this.state.password} onChange={this.onChange}></input>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                </form>
            </div>
        )
    }
}
