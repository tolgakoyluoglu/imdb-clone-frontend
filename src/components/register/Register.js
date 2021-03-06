import React, { Component } from 'react'
import { register } from '../functions/UserFunctions'

export default class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        error: '',
        submitted: false,
    }

    onChange = this.onChange.bind(this)
    onSubmit = this.onSubmit.bind(this)

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        this.setState({ submitted: true })
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        if (this.state.email !== null || this.state.name !== null || this.state.password !== null) {
            register(newUser).then(res => {
                if (res) {
                    this.props.history.push('/profile')
                } else {
                    this.setState({ error: 'Email exist' })
                }
            })
        } else {
            alert('Please enter all fields')
        }
    }
    render() {
        return (
            <div className="sticky">
                <div className="login">
                    <form noValidate onSubmit={this.onSubmit} required>
                        <h5>Register</h5>
                        <input type="email" name="name" placeholder="Name.." required value={this.state.name} onChange={this.onChange}></input>
                        <input type="email" name="email" placeholder="Email.." required value={this.state.email} onChange={this.onChange}></input>
                        <input type="password" name="password" placeholder="Password.." required value={this.state.password} onChange={this.onChange}></input>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                        <div className={'form-group' + (this.state.error !== '' ? ' has-error' : '')}>
                            {this.state.error !== '' &&
                                <div className="help-block">Email already exist</div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}