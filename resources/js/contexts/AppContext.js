import { createContext, useEffect, useState } from "react";
import { useAxiosPromise } from "../hooks/axios";
import PageLoading from "../components/loaders/PageLoading";
import { getCookie, setCookie } from "../utils/cookies";
import { useCart } from "react-use-cart";
import { useAuthUser } from "../hooks/useAuthUser";
import { useQueryClient } from "@tanstack/react-query";
import { useShoppingCart } from "../hooks/useShoppingCart";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setItems, emptyCart } = useCart();

  const isLoggedIn = () => {
    return !!user;
  };

  const loadAppData = async () => {
    try {
      const cookieData = getCookie('app-data');
      if (cookieData) {
        setAppData(cookieData);
        setIsLoading(false);
        return;
      }

      const response = await useAxiosPromise('/api/app/data', 'GET');
      const responseData = response.data.data;
      setAppData(responseData);
      setCookie('app-data', responseData);
    } catch (error) {
      console.error("Error loading app data:", error);
    }
  };

  const loadUser = async () => {
    try {
      const response = await useAxiosPromise('/api/user', 'GET');
      const userData = response.data.data;
      setUser(userData);
      setCookie('user', userData, 1 / 24);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const response = await useAxiosPromise('/api/cart', 'GET');
      const cartData = response.data.data;
      if (cartData) {
        setItems(cartData.items);
      } else {
        emptyCart();
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    // loadAppData();
    // loadUser();
    // loadCart();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <AppContext.Provider value={{ appData, user, setUser, isLoggedIn, loadUser }}>
      {children}
    </AppContext.Provider>
  );
};