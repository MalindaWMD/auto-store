import Layout from "../components/Layout"

export default function ReturnPolicy() {
  return <Layout>
    <div className="mx-auto py-16 max-w-7xl px-4 sm:static sm:px-6 lg:px-8 text-sm">
      <h1 className="text-2xl font-bold text-center mb-4">Return Policy</h1>
      <p className="mb-4">
        <b>Thank you for shopping at Sparehouse! </b>
        We value your satisfaction and strive to provide you with the best online shopping experience possible. If, for any reason, you are not completely satisfied with your purchase, we are here to help.
      </p>

      <h3 class="text-lg font-bold my-4">Returns</h3>
      <p class="my-4">We accept returns within 30 days from the date of purchase. To be eligible for a return, your item must be:</p>
      <ul class="list-disc ml-4">
        <li>Unused</li>
        <li>In its original packaging</li>
        <li>In the same condition that you received it</li>
      </ul>

      <h3 class="text-lg font-bold my-4">Refunds</h3>
      <p class="my-4">Once we receive your return and inspect the item, we will notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment. Please note that the refund amount will exclude any shipping charges incurred during the initial purchase.</p>

      <h3 class="text-lg font-bold my-4">Exchanges</h3>
      <p class="my-4">If you would like to exchange your item for a different size, color, or style, please contact our customer support team within 14 days of receiving your order. We will provide you with further instructions on how to proceed with the exchange.</p>

      <h3 class="text-lg font-bold my-4">Non-Returnable Items</h3>
      <p class="my-4">Certain items are non-returnable and non-refundable. These include:</p>
      <ul class="list-disc ml-4">
        <li>Gift cards</li>
        <li>Downloadable software products</li>
        <li>Personalized or custom-made items</li>
        <li>Perishable goods</li>
        <li>Damaged or defective items that have been installed or used</li>
      </ul>

      <h3 class="text-lg font-bold my-4">Damaged or Defective Items</h3>
      <p class="my-4">If your item arrives damaged or defective, please contact us immediately. We will arrange for a replacement or issue a refund, depending on your preference and product availability.</p>

      <h3 class="text-lg font-bold my-4">Return Shipping</h3>
      <p class="my-4">You will be responsible for paying the shipping costs for returning your item, unless the return is due to our error (e.g., wrong item shipped, defective product). In such cases, we will provide you with a prepaid shipping label.</p>

      <h3 class="text-lg font-bold my-4">Processing Time</h3>
      <p class="my-4">Refunds and exchanges will be processed within 7 business days after we receive your returned item. Please note that it may take additional time for the refund to appear in your account, depending on your payment provider.</p>

      <h3 class="text-lg font-bold my-4">Contact Us</h3>
      <p class="my-4">If you have any questions or concerns regarding our refund policy, please contact our customer support team. We are here to assist you and ensure your shopping experience with us is enjoyable and hassle-free.</p>

    </div>
  </Layout>
}