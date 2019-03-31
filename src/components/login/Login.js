import React, { Component } from 'react'
import { login } from '../functions/UserFunctions'
import '../login/Login.css'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
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
        //TODO: fix so it only redirects of credantials are true, else throw error
        login(user).then(data => {
            console.log(data)
            if (data) {
                this.props.history.push('/profile')
            } else {
                console.log('error on login')
            }
        })
    }
    render() {
        return (
            <div className="sticky">
                <div className="login">
                    <form noValidate onSubmit={this.onSubmit} required>
                        <h5>Login</h5>
                        <input type="email" name="email" placeholder="Email.." value={this.state.email} onChange={this.onChange}></input>
                        <input type="password" name="password" placeholder="Password.." value={this.state.password} onChange={this.onChange}></input>
                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
