const footerNavigation = {
  company: [
    { name: 'Who we are', href: '/about' },
    { name: 'Terms & Conditions', href: 'terms-and-conditions' },
    { name: 'Privacy', href: '/privacy-policy' },
  ],
  customerService: [
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '/return-policy' },
    // { name: 'Warranty', href: '#' },
    // { name: 'Secure Payments', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-700">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-700 py-20">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {/* Image section */}
            <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
              <a href="/">
                <span className="sr-only">Sparehouse</span>
                <svg fill="#ff4343" version="1.1" id="Layer_1" viewBox="0 0 512 512" className="h-8 w-auto" stroke="#ff4343"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M230.4,243.2c-21.171,0-38.4,17.229-38.4,38.4c0,21.171,17.229,38.4,38.4,38.4s38.4-17.229,38.4-38.4 C268.8,260.429,251.571,243.2,230.4,243.2z M230.4,294.4c-7.066,0-12.8-5.734-12.8-12.8c0-7.074,5.734-12.8,12.8-12.8 c7.066,0,12.8,5.726,12.8,12.8C243.2,288.666,237.466,294.4,230.4,294.4z"></path> </g> </g> <g> <g> <rect x="140.8" y="256" width="25.6" height="51.2"></rect> </g> </g> <g> <g> <rect x="204.8" y="192" width="51.2" height="25.6"></rect> </g> </g> <g> <g> <rect x="294.4" y="256" width="25.6" height="51.2"></rect> </g> </g> <g> <g> <rect x="204.8" y="345.6" width="51.2" height="25.6"></rect> </g> </g> <g> <g> <path d="M230.4,0c-8.422,0-17.161,0.435-26.726,1.34c-8.303,0.785-15.71,5.564-19.84,12.809 c-8.542,14.985-14.985,30.959-19.951,47.334C69.257,90.146,0,177.741,0,281.6C0,408.644,103.356,512,230.4,512 c103.868,0,191.505-69.257,220.143-163.891c16.367-4.975,32.324-11.409,47.3-19.942c7.245-4.13,12.023-11.529,12.809-19.84 c0.913-9.566,1.348-18.304,1.348-26.726C512,126.327,385.673,0,230.4,0z M230.4,486.4c-113.109,0-204.8-91.691-204.8-204.8 c0-87.236,54.622-161.553,131.473-191.053c-2.057,12.382-3.473,24.858-3.473,37.453c0,11.571,1.161,22.844,2.825,33.963 C116.369,186.786,89.6,231.014,89.6,281.6c0,77.764,63.036,140.8,140.8,140.8c50.637,0,94.899-26.82,119.706-66.935 C361.19,357.18,372.437,358.4,384,358.4c12.553,0,24.986-1.408,37.325-3.447C391.817,431.77,317.611,486.4,230.4,486.4z M230.4,166.4c63.522,0,115.2,51.678,115.2,115.2s-51.678,115.2-115.2,115.2s-115.2-51.678-115.2-115.2S166.878,166.4,230.4,166.4 z M485.171,305.92C455.305,322.944,420.83,332.8,384,332.8c-7.467,0-14.788-0.572-22.033-1.399 c5.871-15.497,9.233-32.239,9.233-49.8c0-77.764-63.036-140.8-140.8-140.8c-17.527,0-34.236,3.345-49.715,9.199 c-0.853-7.228-1.485-14.532-1.485-21.999c0-36.83,9.856-71.305,26.88-101.171c8.013-0.759,16.111-1.229,24.32-1.229 c141.38,0,256,114.611,256,256C486.4,289.809,485.931,297.907,485.171,305.92z"></path> </g> </g> <g> <g> <circle cx="74.615" cy="323.345" r="12.8"></circle> </g> </g> <g> <g> <circle cx="46.78" cy="297.668" r="12.8"></circle> </g> </g> <g> <g> <circle cx="63.351" cy="359.509" r="12.8"></circle> </g> </g> <g> <g> <circle cx="100.07" cy="411.904" r="12.8"></circle> </g> </g> <g> <g> <circle cx="152.499" cy="448.649" r="12.8"></circle> </g> </g> <g> <g> <circle cx="278.101" cy="459.639" r="12.8"></circle> </g> </g> <g> <g> <circle cx="336.128" cy="432.589" r="12.8"></circle> </g> </g> <g> <g> <circle cx="124.681" cy="130.611" r="12.8"></circle> </g> </g> <g> <g> <circle cx="381.389" cy="387.328" r="12.8"></circle> </g> </g> <g> <g> <circle cx="79.411" cy="175.881" r="12.8"></circle> </g> </g> <g> <g> <circle cx="52.361" cy="233.89" r="12.8"></circle> </g> </g> <g> <g> <circle cx="214.357" cy="465.237" r="12.8"></circle> </g> </g> <g> <g> <circle cx="98.287" cy="374.101" r="12.8"></circle> </g> </g> <g> <g> <circle cx="137.899" cy="413.696" r="12.8"></circle> </g> </g> <g> <g> <circle cx="188.672" cy="437.419" r="12.8"></circle> </g> </g> <g> <g> <circle cx="244.454" cy="442.266" r="12.8"></circle> </g> </g> <g> <g> <circle cx="298.564" cy="427.776" r="12.8"></circle> </g> </g> <g> <g> <circle cx="344.405" cy="395.605" r="12.8"></circle> </g> </g> <g> <g> <circle cx="116.361" cy="167.561" r="12.8"></circle> </g> </g> <g> <g> <circle cx="84.233" cy="213.419" r="12.8"></circle> </g> </g> <g> <g> <circle cx="69.734" cy="267.546" r="12.8"></circle> </g> </g> </g></svg>
              </a>
            </div>

            {/* Sitemap sections */}
            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Company</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-50 hover:text-gray-200">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Customer Service</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.customerService.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-50 hover:text-gray-200">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter section */}
            {/* <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <h3 className="text-sm font-medium text-gray-900">Register for our newsletter</h3>
              <p className="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
              <form className="mt-2 flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none "
                  >
                    Register
                  </button>
                </div>
              </form>
            </div> */}
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 text-center">
          <p className="text-sm text-gray-400 inline-flex">&copy; {(new Date()).getFullYear()} Sparehouse, Inc. All rights reserved. Made by 
          <a href="http://perlrabbit.com" target="_blank" className="text-blue-300 inline-flex ml-1">
            <img src="http://perlrabbit.com/assets/img/favicon.png" className="w-5 h-5 mr-1" /> 
            Perlrabbit
          </a></p>
        </div>
      </div>
    </footer>
  )
}