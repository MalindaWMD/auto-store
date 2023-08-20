import { useQuery } from "../hooks/routes";
import { classNames } from "../utils/css";

export default function Pagination({ route, pagination }) {

	if (!pagination) {
		return null
	}

	if (pagination.total <= pagination.per_page) {
		return null
	}

	const totalPages = Math.ceil(pagination.total / pagination.per_page)

	let query = useQuery()

	let links = []
	for (let page = 1; page <= totalPages; page++) {

		query.set('page', page)

		links.push(
			<a
				key={page}
				href={route + '?' + query.toString()}
				className={classNames("inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer", page == pagination.current_page ? "border-indigo-500 text-indigo-600" : 'border-transparent')}>
				{page}
			</a>
		)
	}

	return (
		<nav className="flex items-center justify-center border-t border-gray-200 px-4 sm:px-0">
			<div className="hidden md:-mt-px md:flex">
				{links}
			</div>
		</nav>
	)
}
