import axios from '../http'

function getOrderList(params) {
    return axios.get("/orders", params)
}

function handleConfig(data) {
    return axios.put("/orders/checkDone", data)
}

function handleSend(data) {
    return axios.put("/orders/checkOut", data)
}

function handleClose(data) {
    return axios.put("/orders/close", data)
}

function getOrderDetail(id) {
    return axios.get(`/orders/${id}`)
}

export default {
    getOrderList,
    handleConfig,
    handleSend,
    handleClose,
    getOrderDetail
}