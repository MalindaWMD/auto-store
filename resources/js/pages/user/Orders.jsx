import { useState } from 'react'
import OrderCard from '../../components/OrderCard'
import ModalLoading from '../../components/loaders/ModalLoading'

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

	const [isLoading, setIsLoading] = useState(false)

	return (
		<>
			<ModalLoading open={isLoading} />
			<div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
				<section aria-labelledby="payment-details-heading">
					<div className="mb-4">
						<h2 className="text-base font-semibold leading-7 text-gray-900">Order history</h2>
						<p className="mt-1 text-sm leading-6 text-gray-500">
							Check the status of recent orders, manage returns, and discover similar products.
						</p>
					</div>

					<div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
						{orders.map((order) => (
							<OrderCard key={order.number} order={order}/>
						))}
					</div>
				</section>
			</div>
		</>
	)
}