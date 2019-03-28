import axios from 'axios'

export const register = newUser => {
    return axios
        .post(`${process.env.REACT_APP_API_PORT}/users/register`, {
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
        .post(`${process.env.REACT_APP_API_PORT}/users/login`, {
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

export const update = updateUser => {
    return axios
        .put(`${process.env.REACT_APP_API_PORT}/users/update/${updateUser.email}/`, {
            name: updateUser.name
        })
        .then(res => {
            console.log(res)
            console.log('Name is updated')
        }).catch(err => {
            console.log(err)
        })
}
