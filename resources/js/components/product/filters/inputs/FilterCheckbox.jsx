import { useQueryParams as useURLQuery } from "../../../../hooks/routes"

export default function FilterCheckbox({filterName, options}) {
  const urlQuery = useURLQuery()
  let selected = urlQuery.getAll(filterName+'[]')
  return (
    <>
      {options.map((option, optionIdx) => (
        <div key={option.name} className="flex items-center">
          <input
            id={`${filterName}-${optionIdx}`}
            name={`${filterName + '[]'}`}
            defaultValue={option.id}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            defaultChecked={selected.indexOf('' + option.id) > -1}
          />
          <label htmlFor={`${filterName}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
            {option.name}
          </label>
        </div>
      ))}
    </>
  )
}