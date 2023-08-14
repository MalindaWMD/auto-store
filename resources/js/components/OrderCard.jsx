import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { classNames } from '../utils/css'
import Price from './Price'

export default function OrderCard({order}) {
	return (
		<div
			className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
		>
			<h3 className="sr-only">
				Order placed on <time dateTime={order.createdDatetime}>{order.createdDate}</time>
			</h3>

			<div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
				<dl className="grid flex-1 grid-cols-3 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-4 lg:col-span-3">
					<div>
						<dt className="font-medium text-gray-900">Order number</dt>
						<dd className="mt-1 text-gray-500">{order.number}</dd>
					</div>
					<div className="hidden sm:block">
						<dt className="font-medium text-gray-900">Date placed</dt>
						<dd className="mt-1 text-gray-500">
							<time dateTime={order.createdDatetime}>{order.createdDate}</time>
						</dd>
					</div>
					<div className="hidden sm:block">
						<dt className="font-medium text-gray-900">Date delivered</dt>
						<dd className="mt-1 text-gray-500">
							<time dateTime={order.createdDatetime}>{order.createdDate}</time>
						</dd>
					</div>
				</dl>

				<Menu as="div" className="relative flex justify-end lg:hidden">
					<div className="flex items-center">
						<Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
							<span className="sr-only">Options for order {order.number}</span>
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
											href={order.href}
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
											href={order.invoiceHref}
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
						href={order.href}
						className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
					>
						<span>Request refund</span>
						<span className="sr-only">{order.number}</span>
					</a>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-4">

				<div className="col-span-2 p-4">

					<div className="text-sm mb-4">
						<h4 className="text-gray-600 mb-1">Contact information</h4>
						<p>Malinda Weerasinghe</p>
						<p>wmdmalinda@gmail.com</p>
						<p>0711631826</p>
					</div>

					<div className="text-sm mb-4">
						<h4 className="text-gray-600 mb-1">Shipping address</h4>
						<p>Malinda Weerasinghe</p>
						<p>334/G/3, Cemetery road, Malamulla</p>
						<p>Panadura, 12500</p>
					</div>

					<div className="text-sm mb-4">
						<h4 className="text-gray-600 mb-1">Billing address</h4>
						<p>Malinda Weerasinghe</p>
						<p>334/G/3, Cemetery road, Malamulla</p>
						<p>Panadura, 12500</p>
					</div>

					<div className="text-sm border-t pt-3 font-medium">
						<div className="flex justify-between items-center mb-2">
							<span>Subtotal</span>
							<Price value={1234} />
						</div>
						<div className="flex justify-between items-center mb-2">
							<span>Shipping</span>
							<Price value={1234} />
						</div>
						<div className="flex justify-between items-center text-lg">
							<span>Total</span>
							<Price value={1234} />
						</div>
					</div>
				</div>

				<div className="col-span-2 p-4">
					<h4 className="sr-only">Items</h4>
					<div className="space-y-2 mt-3 max-h-[380px] overflow-y-scroll">
						{order.products.map((product) => (
							<div key={product.id} className="flex justify-between items-start">
								<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-20 sm:w-20 hover:border-2 hover:border-blue-600">
									<a href="#">
										<img
											src={product.imageSrc}
											alt={product.imageAlt}
											className="h-full w-full object-cover object-center"
										/>
									</a>
								</div>
								<div className="flex-1 px-3">
									<h5 className="text-sm">{product.name}</h5>
									<p className="text-xs text-gray-500">Serial no: 123123</p>
									<p className="text-xs text-gray-500">Qty: 1</p>
								</div>
								<div>
									<p className="text-sm mt-2 sm:mt-0">{product.price}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}