export const fetchCart = async () => {
  const res = await axios.get('/api/cart');
  return res.data?.data;
};
