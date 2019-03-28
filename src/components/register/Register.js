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
            <div className="sticky">
                <form noValidate onSubmit={this.onSubmit}>
                    <h5>Register</h5>
                    <input type="email" name="name" placeholder="Name.." value={this.state.name} onChange={this.onChange}></input>
                    <input type="email" name="email" placeholder="Email.." value={this.state.email} onChange={this.onChange}></input>
                    <input type="password" name="password" placeholder="Password.." value={this.state.password} onChange={this.onChange}></input>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                </form>
            </div>
        )
    }
}