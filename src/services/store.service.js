import api from './api'

const API_URL = import.meta.env.VITE_STORE_API_URL;

const getStores = async () => {
    return await api.get(`${API_URL}`);
}

const getStoreById = async (id) => {
    return await api.get(`${API_URL}/${id}`);
}

const createStore = async (store) => {
    return await api.post(`${API_URL}/`, store);
}

const updateStore = async (id, newStore) => {

    return await api.put(`${API_URL}/${id}`, newStore);
}

const deleteStore = async (id) => {
    return await api.delete(`${API_URL}/${id}`);
}

const StoreService = {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore
}

export default StoreService;