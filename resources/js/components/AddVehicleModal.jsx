import { toast } from 'react-toastify';
import { useAxiosPromise } from '../hooks/axios';
import Modal from './Modal'
import { useEffect, useState } from 'react';
import ModalLoading from './loaders/ModalLoading';
import ValidationError from './ValidationError';
import { isAValidationError } from '../utils/connection';
import { classNames } from '../utils/css';

export default function AddVehicleModal({ open, openAction }) {

	const [isLoading, setIsLoading] = useState(false)
	const [validationErrors, setValidationErrors] = useState({})
	const [message, setMessage] = useState()

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsLoading(true)
		setValidationErrors()
		setMessage()

		const data = new FormData(e.target);

		useAxiosPromise('/api/vehicles/add', 'POST', data)
			.then(res => {
				setIsLoading(false)
				if (res.status != 200) {
					setMessage({
						type: 'error',
						message: 'Error sending request. Please try again.'
					})
					return;
				}

				setMessage({
					type: 'success',
					message: 'Your request has been submitted.'
				})

				e.target.reset()
				setValidationErrors()

				setTimeout(() => {
					setMessage()
					openAction()
				}, 1000)
			})
			.catch(err => {
				setIsLoading(false)

				if (isAValidationError(err.response)) {
					setValidationErrors(err.response.data.errors)
				} else {
					setMessage({
						type: 'error',
						message: 'Error sending request. Please try again.'
					})
				}

			})
	}

	const Alert = () => {

		if( ! message){
			return null
		}

		return (
			<div>
				<div className={classNames('text-white px-3 py-2 rounded text-xs', (message?.type == 'error' ? 'bg-red-400' : 'bg-green-600') )}>
					{message.message}
				</div>
		</div>
		)
	}

	return (
		<>
			<Modal open={open} setOpen={openAction} size="xl">
				<div className="text-left">
					<h1 className="text-lg font-bold mb-3">Can’t find your car in the catalogue?</h1>
					<p className="text-sm">Please provide the following information about your car and we will try to add it to our catalogue:</p>

					<form className="mt-4" onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="vin" className="block text-sm font-medium leading-6 text-gray-900">
								Vehicle Identification Number(VIN)
							</label>
							<div className="mt-2">
								<input type="text" name="vin" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" />
								<ValidationError errors={validationErrors?.vin} />
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4 mb-3">
							<div>
								<label htmlFor="make" className="block text-sm font-medium leading-6 text-gray-900">
									Vehicle Make
								</label>
								<div className="mt-2">
									<input type="text" name="make" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" required />
									<ValidationError errors={validationErrors?.make} />
								</div>
							</div>
							<div>
								<label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
									Model
								</label>
								<div className="mt-2">
									<input type="text" name="model" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" required />
									<ValidationError errors={validationErrors?.model} />
								</div>
							</div>
							<div>
								<label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
									Year of manufacture
								</label>
								<div className="mt-2">
									<input type="text" name="year" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" required />
									<ValidationError errors={validationErrors?.year} />
								</div>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="maker" className="block text-sm font-medium leading-6 text-gray-900">
								Your email
							</label>
							<div className="mt-2">
								<input type="email" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" />
								<ValidationError errors={validationErrors?.email} />
							</div>
							<small><i>You'll be notified as soon as your car has been added to the catelogue</i></small>
						</div>
						
						<Alert/>

						<div>
							<button type="submit" disabled={isLoading} className="mt-5 w-full rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-center text-white hover:bg-indigo-700 flex items-center justify-center">
								{isLoading ? 'Sending...' : 'Send'}
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	)
}