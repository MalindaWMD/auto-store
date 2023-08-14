import { Fragment, useContext } from "react"
import { classNames } from "../utils/css"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"
import { useAxiosPromise } from "../hooks/axios"
import { AppContext } from "../contexts/AppContext"
import { removeCookie } from "../utils/cookies"
import { googleLogout } from "@react-oauth/google"
import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function UserMenu({ user }) {

	if (!user) {
		return null
	}

	const { setUser } = useContext(AppContext)

	const handleLogout = () => {
		useAxiosPromise('/api/logout', 'POST').then(res => {
			setUser(null)
			removeCookie('user')
			googleLogout()
		})
	}

	return (
		<Menu as="div" className="relative ml-4">
			<div>
				<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
					<span className="absolute -inset-1.5" />
					<span className="sr-only">Open user menu</span>
					<UserCircleIcon className="h-10 w-10 fill-slate-300" />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<Menu.Item>
						{({ active }) => (
							<Link
								to="/user/profile"
								className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
							>
								Your Profile
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<Link
								to="/user/orders"
								className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
							>
								Orders
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<a
								to="/user/settings"
								className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
							>
								Settings
							</a>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button onClick={handleLogout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}>
								Sign out
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}