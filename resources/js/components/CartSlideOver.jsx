import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import SlideOver from './SlideOver'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import Price from './Price'
import { useAxios, useAxiosPromise } from '../hooks/axios'

const ItemsList = ({ items }) => {
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
  return (
    <Link to={'/checkout'} className="w-full rounded-md text-center bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-5">
      Checkout
    </Link>
  )
}

export default function CartSlideOver({ open, setOpen }) {

  const { items, cartTotal } = useCart();

  return (
    <SlideOver open={open} setOpen={setOpen} title={'Your shopping cart'} footer={<Footer/>}>
      <ItemsList items={items} />
      <h4>
        <b>Total: <Price value={cartTotal} /></b>
      </h4>
    </SlideOver>
  )
}
