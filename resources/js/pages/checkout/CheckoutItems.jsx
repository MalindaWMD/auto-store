import { useNavigate } from 'react-router'
import CartItems from './CartItems'
import { useCart } from 'react-use-cart'

export default function CheckoutItems({shippingOption, handleCheckout}) {

	const navigate = useNavigate()
	const { items, cartTotal, isEmpty, emptyCart } = useCart()

	if( ! shippingOption){
		return null;
	}

	return (
		<section
			aria-labelledby="summary-heading"
			className="bg-gray-100 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
		>
			<CartItems items={items} cartTotal={cartTotal} shippingOption={shippingOption} />

			<p className="text-center text-sm text-gray-500 sm:text-left my-8">
				You won't be charged until the next step.
			</p>
			<div className="mt-6 border-t border-gray-200 pt-3 sm:flex sm:items-center sm:justify-between">
				<button
					type="button"
					className="w-full rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none  focus:ring-offset-gray-50 sm:order-last sm:w-auto"
					onClick={() => navigate('/shop')}
				>
					Continue shopping
				</button>
				<button
					type="button"
					onClick={handleCheckout}
					className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none  focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
				>
					Place order
				</button>
			</div>
		</section>

	)
}