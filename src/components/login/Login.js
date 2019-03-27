import React, { Component } from 'react'
import { login } from '../functions/UserFunctions'

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
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1>Sign in</h1>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.onChange}></input>

                    <label>Password</label>
                    <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.onChange}></input>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
