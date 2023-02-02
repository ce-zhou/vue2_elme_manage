import axios from '../http'

function getSwiperList(params) {
    return axios.get("/carousels", params)
}

function deleteData(data) {
    return axios.post('/carousels/delete', data)
}

function getEditData(id) {
    return axios.get(`/carousels/${id}`)
}

function submitForm(data) {
    return axios.post("/carousels", data)
}

function submitFormEdit(data) {
    return axios.put("/carousels",data)
}

export default {
    getSwiperList,
    deleteData,
    getEditData,
    submitForm,
    submitFormEdit
}