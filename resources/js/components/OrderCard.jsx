import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { classNames } from '../utils/css'
import Price from './Price'
import moment from 'moment'

export default function OrderCard({order}) {

	const name = order.shipping_address?.first_name + ' ' + order.shipping_address?.last_name

	const getAddress = (address) => {
		if( ! address){
			return null
		}

		let addr = [address.line_one, address.line_two, address.line_three]

		addr = addr.filter(n => n)

		return addr.join(',');
	}

	const Status = ({text, color='green'}) => {
		return (
			<span className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-700 ring-1 ring-inset ring-${color}-600`}>
				{text}
			</span>
		)
	}

	return (
		<div
			className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
		>
			<h3 className="sr-only">
				Order placed on <time dateTime={order.created_at}>{order.created_at}</time>
			</h3>

			<div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
				<dl className="grid flex-1 grid-cols-3 gap-x-6 text-sm sm:col-span-3 lg:col-span-3">
					<div>
						<dt className="font-medium text-gray-900">Order number</dt>
						<dd className="mt-1 text-gray-500">{order.reference}</dd>
					</div>
					<div className="hidden sm:block">
						<dt className="font-medium text-gray-900">Date placed</dt>
						<dd className="mt-1 text-gray-500">
							<time dateTime={order.created_at}>{ moment(order.created_at).format('YYYY-MM-DD h:m A') }</time>
						</dd>
					</div>
					{order.status == 'delivered' && 
						<div className="hidden sm:block">
							<dt className="font-medium text-gray-900">Date delivered</dt>
							<dd className="mt-1 text-gray-500">
								<time dateTime={order.updated_at}>{ moment(order.updated_at).format('YYYY-MM-DD h:m A') }</time>
							</dd>
						</div>
					}

					<div className="col-span-3 pt-3 text-green-600">
						<Status text={order.status} color="green"/>
					</div>
				</dl>

				<Menu as="div" className="relative flex justify-end lg:hidden">
					<div className="flex items-center">
						<Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
							<span className="sr-only">Options for order {order.reference}</span>
							<EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<a
											href={order.id}
											className={classNames(
												active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											View
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href={order.id}
											className={classNames(
												active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											Invoice
										</a>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>

				<div className="hidden lg:col-span-1 lg:flex lg:items-center lg:justify-end lg:space-x-4">
					<a
						href={order.id}
						className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
					>
						<span>Request refund</span>
						<span className="sr-only">{order.reference}</span>
					</a>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-4">

				<div className="col-span-2 p-4">

					<div className="text-sm mb-4">
						<h4 className="text-gray-400 mb-1">Contact information</h4>
						<p>{name}</p>
						<p>{order.shipping_address?.contact_email}</p>
						<p>{order.shipping_address?.contact_phone}</p>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="text-sm">
							<h4 className="text-gray-400 mb-1">Shipping address</h4>
							<p>{name}</p>
							<p>{getAddress(order.shipping_address)}</p>
							<p>{order.shipping_address?.city} {order.shipping_address?.postcode}</p>
						</div>

						<div className="text-sm">
							<h4 className="text-gray-400 mb-1">Billing address</h4>
							<p>{name}</p>
							<p>{getAddress(order.billing_address)}</p>
							<p>{order.billing_address?.city} {order.billing_address?.postcode}</p>
						</div>
					</div>

					<div className="text-sm border-t pt-4 font-medium">
						<div className="flex justify-between items-center mb-2">
							<span>Subtotal</span>
							<Price value={order.sub_total} />
						</div>
						<div className="flex justify-between items-center mb-2">
							<span>Shipping</span>
							<Price value={order.shipping_total} />
						</div>
						<div className="flex justify-between items-center text-lg">
							<span>Total</span>
							<Price value={order.total} />
						</div>
					</div>
				</div>

				<div className="col-span-2 p-4">
					<h4 className="sr-only">Items</h4>
					<div className="space-y-2 mt-3 max-h-[300px] overflow-y-scroll">
						{order.lines.map((line) => (
							<div key={line.id} className="flex justify-between items-start">
								<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-20 sm:w-20 hover:border-2 hover:border-blue-600">
									<a href={'/shop/product/' + line.product.slug}>
										<img
											src={line.product.image?.original_url}
											alt={line.product.name}
											className="h-full w-full object-cover object-center"
										/>
									</a>
								</div>
								<div className="flex-1 px-3">
									<h5 className="text-sm">{line.product.name}</h5>
									<p className="text-xs text-gray-500">Serial no: {line.product.serial_no}</p>
									<p className="text-xs text-gray-500">Qty: {line.quantity}</p>
								</div>
								<div>
									<p className="text-sm mt-2 sm:mt-0"><Price value={line.unit_price}/></p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}