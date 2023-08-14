import { useState } from "react";
import { ArchiveBoxIcon, CogIcon, CreditCardIcon, HeartIcon, ReceiptRefundIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useCurrentPath } from "../hooks/routes";
import { classNames } from "../utils/css";
import Layout from "../components/Layout";
import Orders from "./user/Orders";
import Profile from "./user/Profile";
import Refunds from "./user/Refunds";
import Wishlist from "./user/Wishlist";

const navigation = [
  { name: 'Profile', href: '/user/profile', icon: UserCircleIcon, current: true, component: <Profile/> },
  { name: 'Orders', href: '/user/orders', icon: ArchiveBoxIcon, current: false, component: <Orders/> },
  // { name: 'Wishlist', href: '/user/wishlist', icon: HeartIcon, current: false, component: <Wishlist/> },
  // { name: 'Refunds', href: '/user/refunds', icon: ReceiptRefundIcon, current: false, component: <Refunds/> },
]

export default function UserProfile() {

  const [ component, setComponent ] = useState(navigation.filter((nav) => {
    return nav.href === useCurrentPath()
  })[0]?.component || <Profile/>)

  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        
      <main className="mx-auto max-w-7xl pb-10 lg:px-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      (item.href === useCurrentPath() )
                        ? 'bg-gray-50 text-indigo-600 hover:bg-white'
                        : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={(item.href === useCurrentPath() ) ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        (item.href === useCurrentPath() ) ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                        '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </nav>
            </aside>

            {component}
          </div>
        </main>

      </div>
    </Layout>
  )
}
