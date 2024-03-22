import {useQuery} from '@tanstack/react-query';
import {fetchProductBrands} from '../actions/ProductFilterActions';

export const useProductFilters = () => {
  return useQuery({
    queryKey: ['product', 'filters'],
    queryFn: () => fetchProductBrands(),
  });
};
