import axios from "axios"

export const fetchAuthUser = async () => {
    const res = await axios.get('/api/user');
    return res.data;
}

export const postWishlistItem = async (item) => {
    const res = await axios.post('/api/user/wishlist/update', item)
    return res.data
}

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