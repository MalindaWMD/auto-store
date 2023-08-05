import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { classNames } from '../utils/css'
import { useQuery } from '../hooks/routes'

export default function SearchForm({ plain=false, size='md', className}) {

  const query = useQuery()

  return (
    <div className={ classNames(className,  !plain ? 'shadow-md border rounded-md p-6' : '') }>
      <form action="/shop" method="GET">

        <h3 className="mb-3 font-bold">Select your vehicle to search for parts</h3>

        <div className="mb-3">
          <label htmlFor="maker" className="block text-sm font-medium leading-6 text-gray-900">
            Maker
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="maker"
              id="maker"
              autoComplete="maker"
              placeholder="Select vehicle maker"
              defaultValue={query.get('maker')}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
            Model
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="model"
              id="model"
              autoComplete="model"
              placeholder="Select model"
              defaultValue={query.get('model')}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="engine" className="block text-sm font-medium leading-6 text-gray-900">
            Engine
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="engine"
              id="engine"
              autoComplete="engine"
              placeholder="Select engine"
              defaultValue={query.get('engine')}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="q" className="block text-center text-sm font-medium leading-6 text-gray-900">
            or enter what you need
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="q"
              id="q"
              autoComplete="q"
              placeholder="ex:- Wheel hub"
              defaultValue={query.get('q')}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button type="submit" className="mt-5 w-full rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-center text-white hover:bg-indigo-700 flex items-center justify-center">
          <MagnifyingGlassIcon className="h-5 w-5 mx-3" aria-hidden="true" />
          Search
        </button>

      </form>

    </div>
  )
}