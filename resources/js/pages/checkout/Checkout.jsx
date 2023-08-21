import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCart } from 'react-use-cart'
import Modal from '../../components/Modal'
import TContainer from '../../components/TContainer'
import { AppContext } from '../../contexts/AppContext'
import { useAxiosPromise } from '../../hooks/axios'
import { isAValidationError } from '../../utils/connection'
import CheckoutInformation from './CheckoutInformation'
import CheckoutItems from './CheckoutItems'
import PaymentModal from './PaymentModal'
import Skeleton from 'react-loading-skeleton'

export default function Checkout() {
  const navigate = useNavigate()
  const { isEmpty, emptyCart } = useCart()
  const { user } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState()
  const [showOrderStatus, setShowOrderStatus] = useState(false)
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
    setIsLoading(true)
    useAxiosPromise('/api/checkout', 'POST', checkoutData).then(res => {
      setIsLoading(false)
      setOrder(res.data.data)
      setShowOrderStatus(true)

      // Clear local cart
      emptyCart()
      
      // redirect to order success page
      setTimeout(() => {
        navigate('/user/orders?order_id=' + res.data.data.reference)
      }, 2000)

    }).catch(err => {
      setIsLoading(false)
      // Validation errors
      if (isAValidationError(err.response)) {
        setValidationErrors(err.response.data.errors)
      } else {
        toast.error(err.response.data.error)
      }
    })
  }

  // if (isLoading || pageData.shippingOptions.length == 0) {
  //   return (
  //     <div className="relative bg-white">
  //       {/* Background color split screen for large screens */}
  //       <div className="absolute left-0 top-0 hidden  h-full w-1/2 bg-white lg:block" aria-hidden="true" />
  //       <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-gray-100 lg:block" aria-hidden="true" />
  //     </div>
  //   )
  // }

  return (
    <>

      {/* {order && <PaymentModal open={true} order={order}/>} */}

      <div className="relative bg-white">
        <Modal open={showOrderStatus} title="Order placed successfully" type="success">
        <p className="text-sm text-blue-600">Thank you!</p>
        <p className="text-sm text-gray-500 mb-5">
          Your order is in transit. We'll notify you about further updates.
        </p>
        <Link to={'/shop'} className="mx-2 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Go to shop</Link>
        <Link to={'/user/orders'} className="mx-2 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">Orders</Link>
      </Modal>

      { isLoading &&
        <Modal open={true} title="" type="info" closable={false}>
          <p className="text-sm text-gray-500 mb-5">
            Loading. Please wait!
          </p>
        </Modal>
    }

        <TContainer />
        {/* Background color split screen for large screens */}
        <div className="absolute left-0 top-0 hidden  h-full w-1/2 bg-white lg:block" aria-hidden="true" />
        <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-gray-100 lg:block" aria-hidden="true" />

        <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <h1 className="sr-only">Order information</h1>

          <CheckoutItems
            shippingOption={checkoutData.shippingOption}
            handleCheckout={handleSubmit} />

          <CheckoutInformation
            shippingAddress={checkoutData.shippingAddress}
            billingAddress={checkoutData.billingAddress}
            sameBillingAddress={checkoutData.sameAsShipping}
            handleAddressInputChange={handleAddressInputChange}
            handleCheckoutDataChange={handleCheckoutDataChange}
            validationErrors={validationErrors} />
        </main>
      </div>
    </>
  )
}
