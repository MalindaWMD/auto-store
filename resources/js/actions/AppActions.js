export const fetchAppData = async () => {
  const response = await axios.get('/api/app/data');
  return response.data?.data;
};
