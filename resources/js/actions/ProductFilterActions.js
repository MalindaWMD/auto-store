export const fetchProductBrands = async () => {
  const response = await axios.get('/api/products/filters');
  return response.data?.data;
};
