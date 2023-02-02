import axios from '../http'

function getIndexConfig(params) {
    return axios.get("/indexConfigs", params)
}

function deleteData(data) {
    return axios.post('/indexConfigs/delete', data)
}

function getEditDialog(id) {
    return axios.get(`/indexConfigs/${id}`)
}

function getIndex(data) {
    return axios.post('/indexConfigs',data)
}

function getIndexEdit(data) {
    return axios.put('/indexConfigs', data)
}
export default {
    getIndexConfig,
    deleteData,
    getEditDialog,
    getIndex,
    getIndexEdit
}