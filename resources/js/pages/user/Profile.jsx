
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios, useAxiosPromise } from "../../hooks/axios";
import ModalLoading from "../../components/loaders/ModalLoading";
import ValidationError from '../../components/ValidationError'
import { isAValidationError } from "../../utils/connection";
import { toast } from "react-toastify";


export default function Profile() {
	const navigate = useNavigate()
	const [validationErrors, setValidationErrors] = useState()
	const [isPageLoading, setIsPageLoading] = useState(false)

	const { data: user, isLoading, error } = useAxios('/api/user')

	if (error) {
		return navigate('/')
	}

	const handelSubmit = (e) => {
		e.preventDefault();

		setIsPageLoading(true)
		setValidationErrors();

		const data = new FormData(e.target);

		useAxiosPromise('/api/user/update', 'POST', data).then(res => {
			setIsPageLoading(false)

			toast.success('Profile information updated successfully')

			e.target.reset()
  
    }).catch(err => {
			setIsPageLoading(false)

      // Validation errors
      if (isAValidationError(err.response)) {
        setValidationErrors(err.response.data.errors)
			}else if(err.response.status == 401){
				navigate('/')
      } else {
        toast.error(err.response.data.error)
      }
    })
	}

	return (
		<>
			<ModalLoading open={isLoading || isPageLoading} />
			<div className="space-y-6 sm:px-6 lg:px-0">
				<section aria-labelledby="payment-details-heading">
					<form action="#" method="POST" autoComplete="off" onSubmit={handelSubmit}>
						<div className="shadow sm:overflow-hidden sm:rounded-md">
							<div className="bg-white px-4 py-6 sm:p-6">
								<div>
									<h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
										Personal details
									</h2>
									<p className="mt-1 text-sm text-gray-500">
										Update your personal details. You cannot change your password if you have registered with us using Facebook or Google.
									</p>
								</div>

								<div className="mt-6 grid grid-cols-4 gap-6">
									<div className="col-span-4 sm:col-span-2">
										<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
											Name
										</label>
										<input
											type="text"
											name="name"
											id="name"
											autoComplete="cc-given-name"
											defaultValue={user?.name}
											className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
											required
										/>
										<ValidationError errors={validationErrors?.name}/>
									</div>

									<div className="col-span-4 sm:col-span-2">
									</div>

									<div className="col-span-4 sm:col-span-2">
										<label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
											Email address
										</label>
										<input
											type="email"
											id="email-address"
											defaultValue={user?.email}
											className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
											readOnly
										/>
										<ValidationError errors={validationErrors?.email}/>
									</div>

									<div className="col-span-4 sm:col-span-2"></div>

									{user?.auth_type == 'default' &&
										<>
											<div className="col-span-4 sm:col-span-2">
												<label htmlFor="postal-code" className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
													Password

													<div className="has-tooltip text-xs ml-1 text-blue-600">
														<span className="tooltip rounded shadow-lg p-1 -mt-[95px] bg-white border border-blue-600 text-xs px-3 text-black">
															Password should be a combination of,
															<ul className="list-disc list-inside">
																<li>Uppercase characters (A – Z)</li>
																<li>Lowercase characters (a – z)</li>
																<li>Base 10 digits (0 – 9)</li>
																<li>Non-alphanumeric (For example: !, $, #, or %)</li>
															</ul>
														</span>
														(Rules)
													</div>
												</label>
												<input
													type="password"
													name="password"
													id="password"
													autoComplete="off"
													className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
												/>
												<ValidationError errors={validationErrors?.password}/>
											</div>

											<div className="col-span-4 sm:col-span-2">
												<label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
													Confirm password
												</label>
												<input
													type="password"
													name="password_confirmation"
													id="password-confirmation"
													autoComplete="off"
													className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
												/>
												<ValidationError errors={validationErrors?.password_confirmation}/>
											</div>
										</>
									}
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
								<button
									type="submit"
									className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
								>
									Save
								</button>
							</div>
						</div>
					</form>
				</section>
			</div>
		</>
	)
}