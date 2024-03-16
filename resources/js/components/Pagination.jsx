export default function Pagination({ isPlaceholderData, pagination, page, setPage }) {

  if( ! pagination?.has_pages){
    return null
  }

  return (
    <nav className="flex items-center justify-center border-t border-gray-200 px-4 sm:px-0">
      <div className="hidden md:-mt-px md:flex">
        <button
          className="text-indigo-600 inline-flex items-center px-4 pt-4 text-sm font-medium disabled:text-gray-500  hover:text-gray-700 cursor-pointer"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          Previous Page
        </button>{' '}
        <button
          className="text-indigo-600 inline-flex items-center px-4 pt-4 text-sm font-medium disabled:text-gray-500  hover:text-gray-700 cursor-pointer"
          onClick={() => {
            if (!isPlaceholderData && pagination?.has_more) {
              setPage((old) => old + 1)
            }
          }}
          disabled={isPlaceholderData || !pagination?.has_more}
        >
          Next Page
        </button>
      </div>
    </nav>
  )
}
