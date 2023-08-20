import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { toast } from 'react-toastify'

import Layout from '../components/Layout'
import ModalLoading from '../components/loaders/ModalLoading'
import Price from '../components/Price'
import CartItemQtyPicker from '../components/CartItemQtyPicker'
import { useAxiosPromise } from '../hooks/axios'

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false)

  const { items, cartTotal, updateItemQuantity, removeItem } = useCart()

  const updateCartItem = (variantId, action = 'add') => {
    setIsLoading(true)
    useAxiosPromise('/api/cart/update', 'POST', { variant: variantId, action: action })
      .then(res => {

        let cartLine = res.data.data
        updateItemQuantity(cartLine.purchasable_id, cartLine.quantity)
        setIsLoading(false)

      }).catch(err => {
        console.log(err)
        toast.error('Error updating cart item', { containerId: 'left-toast-container' })
        setIsLoading(false)
      })
  }

  const removeCartItem = (variantId) => {
    setIsLoading(true)
    useAxiosPromise('/api/cart/remove', 'POST', { variant: variantId })
      .then(res => {
        let cartLine = res.data.data
        removeItem(cartLine.removed_item)
        setIsLoading(false)

      }).catch(err => {
        toast.error('Error removing cart item', { containerId: 'left-toast-container' })
        setIsLoading(false)
      })
  }

  if (!items || items.length == 0) {
    return (<Layout>
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8 py-16">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Your shopping cart is empty</h1>
        <p className="mb-8 text-sm">Visit shop page to find the best products for you</p>
        <Link to={'/shop'} className="rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
          Go to Shop
        </Link>
      </div>
    </Layout>
    )
  }

  return (
    <Layout>
      <ModalLoading open={isLoading} />

      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {items.map((item, productIdx) => (
                <li key={item.id} className="flex py-4 sm:py-8">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.media?.original_url}
                      alt={item.product.name}
                      className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm">
                            <a href={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.product.name}
                            </a>
                          </h3>
                        </div>

                        <p className="text-right text-sm font-medium text-gray-900"><Price value={item.itemTotal} /></p>
                      </div>

                      <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {item.product.name}
                        </label>

                        <CartItemQtyPicker qty={item.quantity} variantId={item.id} onAdd={() => updateCartItem(item.id, 'add')} onSubtract={() => updateCartItem(item.id, 'subtract')} />

                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="ml-3">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900"><Price value={cartTotal} /></dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="text-xs text-gray-500">Will be calculated in checkout</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900"><Price value={cartTotal} /></dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button className="w-full mb-3 rounded-md border border-transparent bg-white px-4 py-3 text-sm font-medium border-gray-400 text-black shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Clear cart
              </button>
              <button className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or
                <Link to={'/shop'} className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}
