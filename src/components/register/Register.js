import React, { Component } from 'react'
import { register } from '../functions/UserFunctions'

export default class Register extends Component {
    state = {
        name: '',
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        register(newUser).then(res => {
            this.props.history.push('/login')
        })
    }
    render() {
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name.." value={this.state.name} onChange={this.onChange}></input>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email.." value={this.state.email} onChange={this.onChange}></input>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password.." value={this.state.password} onChange={this.onChange}></input>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}