import axios from '../http'

function getGoodList(params) {
    return axios.get("/goods/list", params)
}

function handleStatus(status, data) {
    return axios.put(`/goods/status/${status}`, data)
}

function submitForm(data) {
    return axios.post('/goods', data)
}

function submitFormEdit(data) {
    return axios.put('/goods', data)
}

function edit(id) {
    return axios.get(`/goods/${id}`)
}

function lazyLoad(params) {
    return axios.get("/categories", params)
}

export default {
    getGoodList,
    handleStatus,
    submitForm,
    submitFormEdit,
    edit,
    lazyLoad
}