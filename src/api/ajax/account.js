import axios from "../http"

function getAccount() {
    return axios.get("/adminUser/profile")
}

function submitName(data) {
    return axios.put("/adminUser/name",data)
}

function submitPass(data) {
    return axios.put("/adminUser/password",data)
}

export default {
    getAccount,
    submitName,
    submitPass
}