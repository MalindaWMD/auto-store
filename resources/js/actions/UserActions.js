import axios from "axios"

export const getUser = async () => {
    try {
        const res = await axios.get('/api/user');
        return res.data.data;
    } catch (err) {
        return err.response.data;
    }
}

export const login = async (data) => {
    return await axios.get('/sanctum/csrf-cookie').then(response => {
        return axios.post('/api/login', data).then(res => {
            return res.data
        }).catch(err => {
            throw err.response?.data
        })
    })
}