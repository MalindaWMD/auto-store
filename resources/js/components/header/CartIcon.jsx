import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from 'react-use-cart'
import Price from '../Price'


export default function CartIcon({cartAction}) {
  // const {data, isLoading} = useAxios('/api/cart', 'GET');

  const { totalUniqueItems, cartTotal } = useCart()

  return (
    <a href="#" onClick={cartAction} className="group -m-2 flex items-center p-2 rounded-md bg-[#ffffff1c]">
      <ShoppingBagIcon
        className="h-6 w-6 flex-shrink-0 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      />
      <span className="ml-1 text-sm font-medium text-white">{totalUniqueItems}</span>
      <span className="ml-1 text-sm font-medium text-[#f37c2e] text-md"><Price value={cartTotal}/></span>
      <span className="sr-only">items in cart, view bag</span>
    </a>
  )
}