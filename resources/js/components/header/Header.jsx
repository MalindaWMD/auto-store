import { Fragment, useCallback, useContext, useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import TopNavigation from './TopNavigation'
import FlyoutMenus from './FlyOutMenus'
import MobileMenu from './MobileMenu'
import CartIcon from './CartIcon'

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
  categories: [
    {
      name: 'Engine parts',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Tools',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Accessories', href: '#' },
    { name: 'Oils', href: '#' },
    { name: 'Filters', href: '#' },
    { name: 'Brakes', href: '#' },
  ],
}
const collections = [
  {
    name: "Women's",
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg',
    imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
  },
  {
    name: "Men's",
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg',
    imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
  },
  {
    name: 'Desk Accessories',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-03.jpg',
    imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
  },
]
const trendingProducts = [
  {
    id: 1,
    name: 'Leather Long Wallet',
    color: 'Natural',
    price: '$75',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  // More products...
]
const perks = [
  {
    name: 'Free returns',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Same day delivery',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
  },
  {
    name: 'All year discount',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'For the planet',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
]


export default function Header(props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white relative z-40">
      {/* Mobile menu */}
      <MobileMenu show={open} as={Fragment} openAction={setOpen} currencies={currencies}/>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <TopNavigation currencies={currencies}/>

          {/* Secondary navigation */}
          <div className="bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <svg fill="#7800e8" version="1.1" id="Layer_1" viewBox="0 0 512 512" className="h-8 w-auto" stroke="#7800e8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M230.4,243.2c-21.171,0-38.4,17.229-38.4,38.4c0,21.171,17.229,38.4,38.4,38.4s38.4-17.229,38.4-38.4 C268.8,260.429,251.571,243.2,230.4,243.2z M230.4,294.4c-7.066,0-12.8-5.734-12.8-12.8c0-7.074,5.734-12.8,12.8-12.8 c7.066,0,12.8,5.726,12.8,12.8C243.2,288.666,237.466,294.4,230.4,294.4z"></path> </g> </g> <g> <g> <rect x="140.8" y="256" width="25.6" height="51.2"></rect> </g> </g> <g> <g> <rect x="204.8" y="192" width="51.2" height="25.6"></rect> </g> </g> <g> <g> <rect x="294.4" y="256" width="25.6" height="51.2"></rect> </g> </g> <g> <g> <rect x="204.8" y="345.6" width="51.2" height="25.6"></rect> </g> </g> <g> <g> <path d="M230.4,0c-8.422,0-17.161,0.435-26.726,1.34c-8.303,0.785-15.71,5.564-19.84,12.809 c-8.542,14.985-14.985,30.959-19.951,47.334C69.257,90.146,0,177.741,0,281.6C0,408.644,103.356,512,230.4,512 c103.868,0,191.505-69.257,220.143-163.891c16.367-4.975,32.324-11.409,47.3-19.942c7.245-4.13,12.023-11.529,12.809-19.84 c0.913-9.566,1.348-18.304,1.348-26.726C512,126.327,385.673,0,230.4,0z M230.4,486.4c-113.109,0-204.8-91.691-204.8-204.8 c0-87.236,54.622-161.553,131.473-191.053c-2.057,12.382-3.473,24.858-3.473,37.453c0,11.571,1.161,22.844,2.825,33.963 C116.369,186.786,89.6,231.014,89.6,281.6c0,77.764,63.036,140.8,140.8,140.8c50.637,0,94.899-26.82,119.706-66.935 C361.19,357.18,372.437,358.4,384,358.4c12.553,0,24.986-1.408,37.325-3.447C391.817,431.77,317.611,486.4,230.4,486.4z M230.4,166.4c63.522,0,115.2,51.678,115.2,115.2s-51.678,115.2-115.2,115.2s-115.2-51.678-115.2-115.2S166.878,166.4,230.4,166.4 z M485.171,305.92C455.305,322.944,420.83,332.8,384,332.8c-7.467,0-14.788-0.572-22.033-1.399 c5.871-15.497,9.233-32.239,9.233-49.8c0-77.764-63.036-140.8-140.8-140.8c-17.527,0-34.236,3.345-49.715,9.199 c-0.853-7.228-1.485-14.532-1.485-21.999c0-36.83,9.856-71.305,26.88-101.171c8.013-0.759,16.111-1.229,24.32-1.229 c141.38,0,256,114.611,256,256C486.4,289.809,485.931,297.907,485.171,305.92z"></path> </g> </g> <g> <g> <circle cx="74.615" cy="323.345" r="12.8"></circle> </g> </g> <g> <g> <circle cx="46.78" cy="297.668" r="12.8"></circle> </g> </g> <g> <g> <circle cx="63.351" cy="359.509" r="12.8"></circle> </g> </g> <g> <g> <circle cx="100.07" cy="411.904" r="12.8"></circle> </g> </g> <g> <g> <circle cx="152.499" cy="448.649" r="12.8"></circle> </g> </g> <g> <g> <circle cx="278.101" cy="459.639" r="12.8"></circle> </g> </g> <g> <g> <circle cx="336.128" cy="432.589" r="12.8"></circle> </g> </g> <g> <g> <circle cx="124.681" cy="130.611" r="12.8"></circle> </g> </g> <g> <g> <circle cx="381.389" cy="387.328" r="12.8"></circle> </g> </g> <g> <g> <circle cx="79.411" cy="175.881" r="12.8"></circle> </g> </g> <g> <g> <circle cx="52.361" cy="233.89" r="12.8"></circle> </g> </g> <g> <g> <circle cx="214.357" cy="465.237" r="12.8"></circle> </g> </g> <g> <g> <circle cx="98.287" cy="374.101" r="12.8"></circle> </g> </g> <g> <g> <circle cx="137.899" cy="413.696" r="12.8"></circle> </g> </g> <g> <g> <circle cx="188.672" cy="437.419" r="12.8"></circle> </g> </g> <g> <g> <circle cx="244.454" cy="442.266" r="12.8"></circle> </g> </g> <g> <g> <circle cx="298.564" cy="427.776" r="12.8"></circle> </g> </g> <g> <g> <circle cx="344.405" cy="395.605" r="12.8"></circle> </g> </g> <g> <g> <circle cx="116.361" cy="167.561" r="12.8"></circle> </g> </g> <g> <g> <circle cx="84.233" cy="213.419" r="12.8"></circle> </g> </g> <g> <g> <circle cx="69.734" cy="267.546" r="12.8"></circle> </g> </g> </g></svg>
                  </a>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <FlyoutMenus as={Fragment}/>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Search */}
                  <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="#" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <img
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                    className="h-8 w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
                  {/* <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                    Search z
                  </a> */}

                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    {/* <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                      <span className="sr-only">Help</span>
                      <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                    <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                      Help
                    </a> */}

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                        <CartIcon cartAction={props.cartAction}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
