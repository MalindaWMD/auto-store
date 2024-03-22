import {useAxios} from '../hooks/axios';
import {useQueryParams} from '../hooks/routes';

// If it's the search page, we need to perform search query
export const performOrdersQuery = () => {
  return useAxios('/api/user/orders', 'GET', getParams());
};

const getParams = () => {
  const query = useQueryParams();
  //
  const params = {};
  query.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
