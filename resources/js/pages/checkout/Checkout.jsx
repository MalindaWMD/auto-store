import React, { useContext, useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import { useAxiosPromise } from '../../hooks/axios'
import TContainer from '../../components/TContainer'
import AddressForm from './AddressForm'
import CartItems from './CartItems'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import ValidationError from '../../components/ValidationError'
import { isAValidationError } from '../../utils/connection'
import Modal from '../../components/Modal'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, cartTotal, isEmpty, emptyCart } = useCart()
  const { user } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState()
  const [ showOrderStatus, setShowOrderStatus] = useState(false)
  const [pageData, setPageData] = useState({
    shippingOptions: [],
    selectedShipping: null,
  });
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: null,
    billingAddress: null,
    sameAsShipping: true,
    shippingOption: null,
  })
  const [validationErrors, setValidationErrors] = useState()

  const [order, setOrder] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    if (isEmpty) {
      navigate('/shop')
    }

    if (user) {
      useAxiosPromise('/api/cart/shipping-options', 'GET').then(res => {
        let options = res.data.data

        setPageData({
          ...pageData,
          shippingOptions: options,
        })

        setCheckoutData({
          ...checkoutData,
          shippingAddress: user.customer.address,
          shippingOption: options.length === 1 ? options[0] : null,
        })

        setIsLoading(false)
      }).catch(err => {
        setIsLoading(false)
      })
    }
  }, [user])

  const handleAddressInputChange = (type, name, value) => {
    let fieldName = type + 'Address'
    let address = checkoutData[fieldName]

    address = {
      ...address,
      [name]: value
    }

    setCheckoutData({
      ...checkoutData,
      [fieldName]: address
    })
  }

  const handleCheckoutDataChange = (field, value) => {
    setCheckoutData({
      ...checkoutData,
      [field]: value
    })
  }

  const handleSubmit = () => {
    useAxiosPromise('/api/checkout', 'POST', checkoutData).then(res => {

      setOrder(res.data.data);

      setShowOrderStatus(true);

      // Clear local cart
      emptyCart()

      // redirect to order success page
      // navigate('/checkout/success?order_id=' + order.reference)

    }).catch(err => {
      // Validation errors
      if (isAValidationError(err.response)) {
        setValidationErrors(err.response.data.errors)
      } else {
        toast.error(err.response.data.error)
      }
    })
  }

  if (isLoading || pageData.shippingOptions.length == 0) {
    return (<p>Loading...</p>)
  }

  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: '211526', // Replace your Merchant ID
    return_url: 'http://localhost/return',
    cancel_url: 'http://localhost/cancel',
    notify_url: 'http://localhost/notify',
    order_id: order?.id,
    items: order?.reference,
    amount: order?.total, 
    currency: 'LKR',
    first_name: 'Saman',
    last_name: 'Perera',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    delivery_address: 'No. 46, Galle road, Kalutara South', // optional field
    delivery_city: 'Kalutara', // optional field
    delivery_country: 'Sri Lanka', // optional field
    custom_1: '', // optional field
    custom_2: '', // optional field
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:"  + error);
  };

  function pay(){
    window.payhere.startPayment(payment);
  }

  return (
    <div className="relative bg-white">

      <Modal open={showOrderStatus} title="Order placed successfully" type="success">
        <p className="text-sm text-blue-600">Thank you!</p>
        <p className="text-sm text-gray-500 mb-5">
          Your order is in transit. We'll notify you about further updates.
        </p>
        <button onClick={pay}>Pay with Payhere</button>;
        <Link to={'/shop'} className="justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Continue shopping</Link>
      </Modal>

      <TContainer />
      {/* Background color split screen for large screens */}
      <div className="absolute left-0 top-0 hidden  h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-gray-100 lg:block" aria-hidden="true" />

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-100 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <CartItems items={items} cartTotal={cartTotal} shippingOption={checkoutData.shippingOption} />

          <p className="text-center text-sm text-gray-500 sm:text-left my-8">
            You won't be charged until the next step.
          </p>
          <div className="mt-6 border-t border-gray-200 pt-3 sm:flex sm:items-center sm:justify-between">
            <button
              type="button"
              className="w-full rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none  focus:ring-offset-gray-50 sm:order-last sm:w-auto"
              onClick={() => navigate('/shop')}
            >
              Continue shopping
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none  focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
            >
              Place order
            </button>
          </div>
        </section>

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
                    value={checkoutData.shippingAddress?.contact_phone || ''}
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
                    value={checkoutData.shippingAddress?.contact_email || ''}
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

              <AddressForm address={checkoutData.shippingAddress} inputChangeAction={handleAddressInputChange} validationErrors={validationErrors} />
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
                  value={checkoutData.sameAsShipping}
                  onChange={() => handleCheckoutDataChange('sameAsShipping', !checkoutData.sameAsShipping)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-2">
                  <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                    Same as shipping information
                  </label>
                </div>
              </div>

              {!checkoutData.sameAsShipping && <AddressForm type='billing' address={checkoutData.billingAddress} inputChangeAction={handleAddressInputChange} validationErrors={validationErrors} />}
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
