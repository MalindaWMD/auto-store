import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {
	CheckCircleIcon
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { classNames } from '../../utils/css'


const orders = [
	{
		number: 'WU88191111',
		href: '#',
		invoiceHref: '#',
		createdDate: 'Jul 6, 2021',
		createdDatetime: '2021-07-06',
		deliveredDate: 'July 12, 2021',
		deliveredDatetime: '2021-07-12',
		total: '$160.00',
		products: [
			{
				id: 1,
				name: 'Micro Backpack',
				description:
					'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
				href: '#',
				price: '$70.00',
				imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
				imageAlt:
					'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
			},
			{
				id: 2,
				name: 'Micro Backpack',
				description:
					'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
				href: '#',
				price: '$70.00',
				imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
				imageAlt:
					'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
			},
			{
				id: 3,
				name: 'Micro Backpack',
				description:
					'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
				href: '#',
				price: '$70.00',
				imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
				imageAlt:
					'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
			},
			{
				id: 4,
				name: 'Micro Backpack',
				description:
					'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
				href: '#',
				price: '$70.00',
				imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
				imageAlt:
					'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
			},
			{
				id: 5,
				name: 'Micro Backpack',
				description:
					'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
				href: '#',
				price: '$70.00',
				imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
				imageAlt:
					'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
			},
			{
				id: 6,
				name: 'Micro Backpack',
				description:
					'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
				href: '#',
				price: '$70.00',
				imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
				imageAlt:
					'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
			},
			// More products...
		],
	},
	// More orders...
]

export default function Orders() {
	return (
		<div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
			<section aria-labelledby="payment-details-heading">
				<div className="mb-4">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Order history</h2>
					<p className="mt-1 text-sm leading-6 text-gray-500">
						Check the status of recent orders, manage returns, and discover similar products.
					</p>
				</div>

				<div className="mx-auto max-w-3xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
					{orders.map((order) => (
						<div
							key={order.number}
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
									<div>
										<dt className="font-medium text-gray-900">Total amount</dt>
										<dd className="mt-1 font-medium text-gray-900">{order.total}</dd>
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

							<div className="grid grid-cols-4 gap-4 px-4">

								<div className="col-span-2"></div>

								<div className="col-span-2">
									{/* Products */}
									<h4 className="sr-only">Items</h4>
									<div className="divide-y">

										{order.products.map((product) => (

											<div key={product.id} className="flex justify-between items-center">
												<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-20 sm:w-20 hover:border-2 hover:border-blue-600">
													<img
														src={product.imageSrc}
														alt={product.imageAlt}
														className="h-full w-full object-cover object-center"
													/>
												</div>

												<div>
													<h5 className="text-sm">{product.name}</h5>
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
					))}
				</div>
			</section>
		</div>
	)
}