import { useEffect } from "react";
import Modal from "../../components/Modal"

export default function PaymentModal({ open, order }) {

  let payment = {
    sandbox: process.env.MIX_PAYHERE_SANDBOX || true,
    merchant_id: process.env.MIX_PAYHERE_MERCHANT_ID, // "211526",    // Replace your Merchant ID
    return_url: process.env.MIX_PAYHERE_RETURN_URL, //'http://localhost/checkout/success',     // Important
    cancel_url: process.env.MIX_PAYHERE_CANCEL_URL, //'http://localhost/checkout/failed',     // Important
    notify_url: process.env.MIX_PAYHERE_NOTIFY_URL, //'http://localhost/api/checkout/notify',\
    currency: process.env.MIX_PAYHERE_CURRENCY, //"LKR",
    order_id: order.reference,
    items: "",
    amount: order.total / 100,
    hash: "45D3CBA93E9F2189BD630ADFE19AA6DC", // *Replace with generated hash retrieved from backend
    first_name: order.billing_address.first_name,
    last_name: order.billing_address.last_name,
    email: order.billing_address.contact_email,
    phone: order.billing_address.contact_phone,
    address: order.billing_address.line_one + ',' + order.billing_address.line_two,
    city: order.billing_address.city,
    country: 'Sri Lanka',
    delivery_address: order.shipping_address.line_one + ',' + order.shipping_address.line_two,
    delivery_city: order.shipping_address.city,
    delivery_country: 'Sri Lanka',
    custom_1: "",
    custom_2: ""
  }

  const init = () => {
    // Payment completed. It can be a successful failure.
    window.payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      // Note: validate the payment and show success or failure page to the customer
    };

    // Payment window closed
    window.payhere.onDismissed = function onDismissed() {
      // Note: Prompt user to pay again or show an error page
      console.log("Payment dismissed");
    };

    // Error occurred
    window.payhere.onError = function onError(error) {
      // Note: show an error page
      console.log("Error:" + error);
    };
  }

  useEffect(() => {
    init()

    // window.payhere.startPayment(payment);
  }, [])

  return (
    <Modal open={open} title="Processing payment. Do not refresh the page." type="info" >
      {console.log(payment)}
      <button onClick={() => window.payhere.startPayment(payment)}>Pay</button>
    </Modal>
  )
}