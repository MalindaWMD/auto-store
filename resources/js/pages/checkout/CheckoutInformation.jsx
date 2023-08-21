import ValidationError from "../../components/ValidationError";
import AddressForm from "./AddressForm";

export default function CheckoutInformation({shippingAddress, billingAddress, sameBillingAddress, handleAddressInputChange, handleCheckoutDataChange, validationErrors}) {
	return (
		<div className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
			<div className="mx-auto max-w-lg lg:max-w-none">
				<section aria-labelledby="contact-info-heading">
					<h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
						Contact information
					</h2>
					<div className="mt-6">
						<label htmlFor="phone-no" className="block text-sm font-medium text-gray-700">
							Contact no
						</label>
						<div className="mt-1">
							<input
								type="text"
								id="phone-no"
								name="phone-no"
								autoComplete="phone"
								value={shippingAddress?.contact_phone || ''}
								onChange={(e) => handleAddressInputChange('shipping', 'contact_phone', e.target.value)}
								className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
							<ValidationError errors={validationErrors?.['shippingAddress.contact_phone']} />
						</div>
					</div>
					<div className="mt-6">
						<label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
							Email address
						</label>
						<div className="mt-1">
							<input
								type="email"
								id="email-address"
								name="email-address"
								autoComplete="email"
								value={shippingAddress?.contact_email || ''}
								onChange={(e) => handleAddressInputChange('shipping', 'contact_email', e.target.value)}
								className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
							<ValidationError errors={validationErrors?.['shippingAddress.contact_email']} />
						</div>
					</div>
				</section>

				<section aria-labelledby="shipping-heading" className="mt-10">
					<h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
						Shipping address
					</h2>

					<AddressForm address={shippingAddress} inputChangeAction={handleAddressInputChange} validationErrors={validationErrors} />
				</section>

				<section aria-labelledby="billing-heading" className="mt-10">
					<h2 id="billing-heading" className="text-lg font-medium text-gray-900">
						Billing information
					</h2>

					<div className="mt-6 flex items-center">
						<input
							id="same-as-shipping"
							name="same-as-shipping"
							type="checkbox"
							defaultChecked
							value={sameBillingAddress}
							onChange={() => handleCheckoutDataChange('sameAsShipping', !sameBillingAddress)}
							className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<div className="ml-2">
							<label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
								Same as shipping information
							</label>
						</div>
					</div>

					{!sameBillingAddress && <AddressForm type='billing' address={billingAddress} inputChangeAction={handleAddressInputChange} validationErrors={validationErrors} />}
				</section>
			</div>
		</div>
	)
}