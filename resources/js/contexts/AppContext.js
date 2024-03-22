import React, {createContext, useState} from 'react';
import PageLoading from '../components/loaders/PageLoading';
import {useAxiosPromise} from '../hooks/axios';
import {setCookie} from '../utils/cookies';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = () => {
    return !!user;
  };

  const loadUser = async () => {
    try {
      const response = await useAxiosPromise('/api/user', 'GET');
      const userData = response.data.data;
      setUser(userData);
      setCookie('user', userData, 1 / 24);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <AppContext.Provider value={{user, setUser, isLoggedIn, loadUser}}>
      {children}
    </AppContext.Provider>
  );
};
