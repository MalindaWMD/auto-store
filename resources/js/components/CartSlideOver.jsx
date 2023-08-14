import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import SlideOver from './SlideOver'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import Price from './Price'
import { useAxios, useAxiosPromise } from '../hooks/axios'

const ItemsList = () => {
  const { items } = useCart();

  if (!items || items.length == 0) {
    return (
      <p>Your cart is empty</p>
    )
  }

  return (
    <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
      {items.map((item) => (
        <li key={item.id} className="flex items-start space-x-4 py-6">
          <img
            src={item.product.media.original_url}
            alt={item.product.name}
            className="h-20 w-20 flex-none rounded-md object-cover object-center shadow-md border border-dashed"
          />
          <div className="flex-auto space-y-1">
            <h3>{item.product.name}</h3>
            <p className="text-gray-500">Serial no: {item.product.serial_no}</p>
            <p className="text-gray-500">Quantity:  {item.quantity} (x<Price value={item.price} />)</p>
          </div>
          <p className="flex-none text-base font-medium"><Price value={item.quantity * item.price} /></p>
        </li>
      ))}
    </ul>

  )
}

const Footer = () => {
  const { cartTotal, emptyCart } = useCart();

  const clearCart = () => {

    useAxiosPromise('/api/cart/clear', 'POST').then(res => {
      if(res.status == 200){
        emptyCart()
      }
    }).catch(err => {
    })
  }

  return (
    <div className="flex flex-col w-full">
      
      <dl>
      <div className="text-right">
          <button className="text-sm text-red-600" onClick={clearCart}>Clear cart</button>
        </div>
        <div className="flex items-center justify-between py-4">
          <dt className="text-base font-medium text-gray-900">Total</dt>
          <dd className="text-base font-medium text-gray-900"><Price value={cartTotal} /></dd>
        </div>
      </dl>

      <Link to={'/cart'} className="w-full mb-2 rounded-md text-center bg-indigo-400 px-3 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset focus:ring-indigo-200 focus:ring-offset-2">
        View cart
      </Link>

      <Link to={'/checkout'} className="w-full rounded-md text-center bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-5">
        Checkout
      </Link>
    </div>
  )
}

export default function CartSlideOver({ open, setOpen }) {
  return (
    <SlideOver open={open} setOpen={setOpen} title={'Your shopping cart'} footer={<Footer />}>
      <ItemsList/>
    </SlideOver>
  )
}
