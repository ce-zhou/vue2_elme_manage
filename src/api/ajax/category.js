import axios from '../http'

function getCategoryList(params) {
    return axios.get("/categories", params)
}

function deleteCategory(data) {
    return axios.delete('/categories', data)
}

function getCategoryDialog(id) {
    return axios.get(`/categories/${id}`)
}

function getCategory(data) {
    return axios.post('/categories', data)
}

function getCategoryEdit(data) {
    return axios.put("/categories", data)
}

export default {
    getCategoryList,
    deleteCategory,
    getCategoryDialog,
    getCategory,
    getCategoryEdit
}