import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import SearchForm from '../SearchForm'
import { useProductFilters } from '../../hooks/productFilters'
import { useCurrentUrl, useQuery as useURLQuery } from '../../hooks/routes'

const HiddenSearchFields = () => {
  const urlQuery = useURLQuery()

  return(
    <>
      <input type="hidden" name="make" value={urlQuery.get('make')}/>
      <input type="hidden" name="model" value={urlQuery.get('model')}/>
      <input type="hidden" name="engine" value={urlQuery.get('engine')}/>
      <input type="hidden" name="q" value={urlQuery.get('q')}/>
    </>
  )
}

export default function ProductFilters() {
  const {data:filters} = useProductFilters()

  const urlQuery = useURLQuery()
  const currentUrl = useCurrentUrl()

  return (
    <aside>
      <h2 className="sr-only">Filters</h2>

      <button
        type="button"
        className="inline-flex items-center lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="text-sm font-medium text-gray-700">Filters</span>
        <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
      </button>

      <div className="hidden lg:block">

        <SearchForm plain={true} className="mb-6 pb-7 border-b" />

        <form action={currentUrl} method="get" className="space-y-10 divide-y divide-gray-200">

          <HiddenSearchFields/>

          {filters?.map((section, sectionIdx) => {
            
            let selected = urlQuery.getAll(section.key+'[]')

            return <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                <div className="space-y-3 pt-6">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.name} className="flex items-center">
                      <input
                        id={`${section.key}-${optionIdx}`}
                        name={`${ section.key + '[]'}`}
                        defaultValue={option.id}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={ selected.indexOf( '' + option.id ) > -1 }
                      />
                      <label htmlFor={`${section.key}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
      })}

          <button type="submit" className="border border-black"> filter</button>
        </form>
      </div>
    </aside>
  )
}