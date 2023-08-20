import { useEffect, useState } from 'react'
import OrderCard from '../../components/OrderCard'
import ModalLoading from '../../components/loaders/ModalLoading'
import { useAxiosPromise } from '../../hooks/axios'
import { toast } from 'react-toastify'
import Pagination from '../../components/Pagination'
import { performOrdersQuery } from '../../actions/OrderActions'

export default function Orders() {

	const { data: orders, error, isLoading, pagination } = performOrdersQuery()

	if(error){
		toast.error('Error loading orders. Please try refreshing the page.', {
			containerId: 'left-toast-container'
		})
	}

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
						{orders && orders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}

						<Pagination route={'/user/orders'} pagination={pagination} />
					</div>
				</section>
			</div>
		</>
	)
}