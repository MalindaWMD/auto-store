import axios from "axios";

export const fetchProducts = async (params) => {
  const response = await axios.get('/api/products', {params: params});
  if(response.data){
    return {products: response.data.data, pagination: response.data.pagination}
  }
}