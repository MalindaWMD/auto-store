import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import SearchForm from '../../SearchForm'
import { useProductFilters } from '../../../hooks/productFilters'
import { useCurrentUrl, useQueryParams as useURLQuery } from '../../../hooks/routes'
import FilterCheckbox from './inputs/FilterCheckbox'
import FilterSelect from './inputs/FilterSelect'

const HiddenSearchFields = () => {
  const urlQuery = useURLQuery()

  return(
    <>
      <input type="hidden" name="make" value={urlQuery.get('make') || undefined}/>
      <input type="hidden" name="model" value={urlQuery.get('model') || undefined}/>
      <input type="hidden" name="engine" value={urlQuery.get('engine') || undefined}/>
      <input type="hidden" name="q" value={urlQuery.get('q') || undefined}/>
    </>
  )
}

const FilterInput = ({filterName, type, options}) => {
  if(type == 'select'){
    return <FilterSelect filterName={filterName} options={options}/>
  }

  return <FilterCheckbox filterName={filterName} options={options}/>
}

export default function ProductFilters() {
  const {data:filters} = useProductFilters()
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

        <SearchForm plain={true} className="mb-2" />

        <form action={currentUrl} method="get" className="space-y-5 divide-y divide-gray-200">

          <HiddenSearchFields/>

          {filters?.map((section, sectionIdx) => {
            return <div key={section.name} className="pt-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                <div className="space-y-3 pt-6">
                  <FilterInput filterName={section.key} type={section.type} options={section.options}/>
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