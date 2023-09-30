import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from 'react-use-cart';
import Modal from '../../components/Modal';
import TContainer from '../../components/TContainer';
import { AppContext } from '../../contexts/AppContext';
import { useAxiosPromise } from '../../hooks/axios';
import { isAValidationError } from '../../utils/connection';
import CheckoutInformation from './CheckoutInformation';
import CheckoutItems from './CheckoutItems';
import PaymentModal from './PaymentModal';
import Skeleton from 'react-loading-skeleton';

export default function Checkout() {
  const navigate = useNavigate();
  const { isEmpty, emptyCart } = useCart();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: null,
    billingAddress: null,
    sameAsShipping: true,
    shippingOption: null,
  });
  const [validationErrors, setValidationErrors] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    if (isEmpty) {
      navigate('/shop');
      setIsLoading(false); // Exit early if the cart is empty
      return;
    }

    // Fetch shipping options
    useAxiosPromise('/api/cart/shipping-options', 'GET')
      .then((res) => {
        const options = res.data.data;
        setCheckoutData((prevData) => ({
          ...prevData,
          shippingOption: options.length === 1 ? options[0] : null,
        }));
      })
      .catch((err) => {
        console.error(err); // Log any errors
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      return; // User data already loaded, no need to fetch it again
    }

    // Fetch user data
    useAxiosPromise('/api/user', 'GET')
      .then((userRes) => {
        const userData = userRes.data.data;
        setUser(userData);
        setCheckoutData((prevData) => ({
          ...prevData,
          shippingAddress: userData.customer.address,
        }));
      })
      .catch((err) => {
        console.error(err); // Log any errors
      });
  }, []);

  
  useEffect(() => {
    if(window.payhere){
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [])

  const handleAddressInputChange = (type, name, value) => {
    const fieldName = type + 'Address';
    const address = checkoutData[fieldName];

    const updatedAddress = {
      ...address,
      [name]: value,
    };

    setCheckoutData((prevData) => ({
      ...prevData,
      [fieldName]: updatedAddress,
    }));
  };

  const handleCheckoutDataChange = (field, value) => {
    setCheckoutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);

    useAxiosPromise('/api/checkout', 'POST', checkoutData)
      .then((res) => {
        setOrder(res.data.data);
        // setShowOrderStatus(true);

        // Clear local cart
        emptyCart();

        // Redirect to order success page after a delay
        setTimeout(() => {
          // navigate('/user/orders?order_id=' + res.data.data.reference);
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);

        // Validation errors
        if (isAValidationError(err.response)) {
          setValidationErrors(err.response.data.errors);
        } else {
          toast.error(err.response.data.error);
        }
      });
  };

  return (
    <>
      {order && <PaymentModal open={true} order={order} />}

      <div className="relative bg-white">
        <Modal open={showOrderStatus} title="Order placed successfully" type="success">
          <p className="text-sm text-blue-600">Thank you!</p>
          <p className="text-sm text-gray-500 mb-5">
            Your order is in transit. We'll notify you about further updates.
          </p>
          <Link
            to={'/shop'}
            className="mx-2 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Go to shop
          </Link>
          <Link
            to={'/user/orders'}
            className="mx-2 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
          >
            Orders
          </Link>
        </Modal>

        {isLoading && (
          <Modal open={true} title="" type="info" closable={false}>
            <p className="text-sm text-gray-500 mb-5">Loading. Please wait!</p>
          </Modal>
        )}

        <TContainer />
        {/* Background color split screen for large screens */}
        <div className="absolute left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
        <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-gray-100 lg:block" aria-hidden="true" />

        <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <h1 className="sr-only">Order information</h1>

          <CheckoutItems shippingOption={checkoutData.shippingOption} handleCheckout={handleSubmit} />

          <CheckoutInformation
            shippingAddress={checkoutData.shippingAddress}
            billingAddress={checkoutData.billingAddress}
            sameBillingAddress={checkoutData.sameAsShipping}
            handleAddressInputChange={handleAddressInputChange}
            handleCheckoutDataChange={handleCheckoutDataChange}
            validationErrors={validationErrors}
          />
        </main>
      </div>
    </>
  );
}
