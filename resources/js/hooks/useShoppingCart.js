import {useQuery} from '@tanstack/react-query';
import {fetchCart} from '../actions/CartActions';

export const useShoppingCart = () => {
  return useQuery({
    retry: 1,
    staleTime: 1000 * 60 * 20,
    queryKey: ['cart'],
    queryFn: () => fetchCart(),
  });
};
