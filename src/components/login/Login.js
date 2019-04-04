import React, { Component } from 'react'
import { login } from '../functions/UserFunctions'
import '../login/Login.css'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        submitted: false,
        error: ''
    }

    onChange = this.onChange.bind(this)
    onSubmit = this.onSubmit.bind(this)

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ submitted: true })

        if (!(this.state.email && this.state.password)) {
            return;
        }
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
                this.setState({ error: 'Invalid credentials' })
            }
        })
    }
    render() {
        return (
            <div className="sticky">
                <div className="login">
                    <form noValidate onSubmit={this.onSubmit} required>
                        <div className={'form-group' + (this.state.submitted && !this.state.email ? ' has-error' : '')}>
                            <h5>Login</h5>
                            <input type="email" name="email" placeholder="Email.." value={this.state.email} onChange={this.onChange}></input>
                            {this.state.submitted && !this.state.email &&
                                <div className="help-block">Email is required</div>
                            }
                            <div className={'form-group' + (this.state.submitted && !this.state.password ? ' has-error' : '')}>
                                <input type="password" name="password" placeholder="Password.." value={this.state.password} onChange={this.onChange}></input>
                                {this.state.submitted && !this.state.password &&
                                    <div className="help-block">Password is required</div>
                                }
                                <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                                <div className={'form-group' + (this.state.error !== '' ? ' has-error' : '')}>
                                    {this.state.error !== '' &&
                                        <div className="help-block">Invalid email or password</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
