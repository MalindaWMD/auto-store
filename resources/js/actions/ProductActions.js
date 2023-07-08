import axios from "axios"

export const getAllProducts = () => {
    return axios.get('/products');
}

export const getProduct = async (id) => {
    try {
        const res = await axios.get('/api/products/' + id);
        return res.data.data;
    } catch (err) {
        return err.response.data;
    }
  }