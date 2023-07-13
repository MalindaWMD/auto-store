import axios from "axios"

export const getUser = async () => {
    try {
        const res = await axios.get('/api/user');
        return res.data.data;
    } catch (err) {
        return err.response.data;
    }
}