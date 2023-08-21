import { useEffect } from "react";
import Modal from "../../components/Modal"

export default function PaymentModal({ open, order }) {

	const payment = {
		"sandbox": true,
		"merchant_id": "211526",    // Replace your Merchant ID
		"return_url": 'http://localhost/checkout/success',     // Important
		"cancel_url": 'http://localhost/checkout/failed',     // Important
		"notify_url": 'http://localhost/api/checkout/notify',
		"order_id": order.reference,
		"items": "Door bell wireles, Other items 1 , other 2",
		"amount": order.total / 100,
		"currency": "LKR",
		"hash": "45D3CBA93E9F2189BD630ADFE19AA6DC", // *Replace with generated hash retrieved from backend
		"first_name": "Saman",
		"last_name": "Perera",
		"email": "samanp@gmail.com",
		"phone": "0771234567",
		"address": "No.1, Galle Road",
		"city": "Colombo",
		"country": "Sri Lanka",
		"delivery_address": "No. 46, Galle road, Kalutara South",
		"delivery_city": "Kalutara",
		"delivery_country": "Sri Lanka",
		"custom_1": "",
		"custom_2": ""
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
				console.log("Error:"  + error);
		};
	}

	useEffect(() => {
		init()
		window.payhere.startPayment(payment);
	}, [])

	return (
		<Modal open={open} title="Processing payment. Do not refresh the page." type="info"/>
	)
}