import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../actions/CartActions";
import { useCart } from "react-use-cart";
import { useEffect } from "react";

export const useShoppingCart = () => {
  const cart = useCart();
  const { data, isSuccess} = useQuery({
    retry: 1,
    staleTime: 1000 * 60 * 20,
    enabled: cart.isEmpty,
    queryKey: ['cart'],
    queryFn: () => fetchCart()
  })

  useEffect(() => {
      if(isSuccess){
        cart.setItems(data?.items)
        return
      }
      
      cart.emptyCart()
  }, [])

  return cart
}