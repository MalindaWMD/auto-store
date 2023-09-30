import Layout from "../components/Layout"

export default function PrivacyPolicy() {
  return <Layout>
    <div className="mx-auto py-16 max-w-7xl px-4 sm:static sm:px-6 lg:px-8 text-sm">
      <h1 className="text-2xl font-bold text-center mb-4">Privacy Policy</h1>
      <p className="my-4">At Sparehouse, we are committed to protecting the privacy and security of our customers' personal information. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit or make a purchase on our website. By using our website, you consent to the practices described in this policy.</p>

      <h3 className="text-lg font-bold my-4">Information We Collect</h3>
      <p className="my-4">When you visit our website, we may collect certain information about you, including:</p>
      <ul className="list-disc ml-4">
        <li>Personal identification information (such as your name, email address, and phone number) provided voluntarily by you during the registration or checkout process.</li>
        <li>Payment and billing information necessary to process your orders, including credit card details, which are securely handled by trusted third-party payment processors.</li>
        <li>Browsing information, such as your IP address, browser type, and device information, collected automatically using cookies and similar technologies.</li>
      </ul>

      <h3 className="text-lg font-bold my-4">Use of Information</h3>
      <p className="my-4">We may use the collected information for the following purposes:</p>
      <ul className="list-disc ml-4">
        <li>To process and fulfill your orders, including shipping and delivery.</li>
        <li>To communicate with you regarding your purchases, provide customer support, and respond to inquiries or requests.</li>
        <li>To personalize your shopping experience and present relevant product recommendations and promotions.</li>
        <li>To improve our website, products, and services based on your feedback and browsing patterns.</li>
        <li>To detect and prevent fraud, unauthorized activities, and abuse of our website.</li>
      </ul>

      <h3 className="text-lg font-bold my-4">Information Sharing</h3>
      <p className="my-4">We respect your privacy and do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
      <ul className="list-disc ml-4">
        <li>Trusted service providers: We may share your information with third-party service providers who assist us in operating our website, processing payments, and delivering products. These providers are contractually obligated to handle your data securely and confidentially.</li>
        <li>Legal requirements: We may disclose your information if required to do so by law or in response to valid legal requests or orders.</li>
      </ul>

      <h3 className="text-lg font-bold my-4">Data Security</h3>
      <p className="my-4">We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

      <h3 className="text-lg font-bold my-4">Cookies and Tracking Technologies</h3>
      <p className="my-4">We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and gather information about your preferences and interactions with our website. You have the option to disable cookies through your browser settings, but this may limit certain features and functionality of our website.</p>

      <h3 className="text-lg font-bold my-4">Changes to the Privacy Policy</h3>
      <p className="my-4">We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with a revised "last updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.</p>

      <h3 className="text-lg font-bold my-4">Contact Us</h3>
      <p className="my-4">If you have any questions, concerns, or requests regarding our Privacy Policy or the handling of your personal information, please contact us using the information provided on our website.</p>

    </div>
  </Layout>
}