import {useQuery} from '@tanstack/react-query';
import {fetchAuthUser} from '../actions/UserActions';

export const useAuthUser = () => {
  return useQuery({
    retry: false,
    staleTime: 1000 * 60 * 60,
    queryKey: ['auth-user'],
    queryFn: () => fetchAuthUser(),
  });
};
