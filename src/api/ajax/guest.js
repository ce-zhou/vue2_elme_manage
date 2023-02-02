import axios from '../http'

function getGuestList(params) {
    return axios.get("/users", params)
}

function handleSolve(data) {
    return axios.put('/users/0', data)
}

function handleForbid(data) {
    return axios.put('/users/1', data)
}

export default {
    getGuestList,
    handleSolve,
    handleForbid
}