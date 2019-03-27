import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:8002/users/register', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log('User is registered')
        }).catch(err => {
            console.log(err)
        })
}

export const login = user => {
    return axios
        .post('http://localhost:8002/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}
