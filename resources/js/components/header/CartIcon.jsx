import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from 'react-use-cart'
import Price from '../Price'
import { useShoppingCart } from '../../hooks/useShoppingCart'


export default function CartIcon({cartAction}) {
  const { data:cart, isSuccess, isError } = useShoppingCart()

  return (
    <a href="#" onClick={cartAction} className="group -m-2 flex items-center p-2 rounded-md bg-[#ffffff1c]">
      <ShoppingBagIcon
        className="h-6 w-6 flex-shrink-0 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      />
      <span className="ml-1 text-sm font-medium text-white">{cart?.items_count}</span>
      <span className="ml-1 text-sm font-medium text-[#f37c2e] text-md"><Price value={cart?.total}/></span>
      <span className="sr-only">items in cart, view bag</span>
    </a>
  )
}