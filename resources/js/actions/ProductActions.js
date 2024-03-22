import axios from 'axios';

export const fetchProducts = async (params) => {
  const response = await axios.get('/api/products', {params: params});
  if (response.data) {
    return {products: response.data.data, pagination: response.data.pagination};
  }
};

export const fetchSingleProduct = async (productId) => {
  const response = await axios.get('/api/products/' + productId);
  return response.data?.data;
};

export const postAddToCart = async (variantId) => {
  const response = await axios.post('/api/cart/add', {product_id: variantId});
  return response.data;
};
