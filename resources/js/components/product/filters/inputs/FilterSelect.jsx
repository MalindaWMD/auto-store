import { useQuery as useURLQuery } from "../../../../hooks/routes"

export default function FilterSelect({ filterName, options }) {
  const urlQuery = useURLQuery()
  let selected = urlQuery.get(filterName)

  return (
      <select
        name={filterName}
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={selected}
      >
        <option value="">All types</option>
        {options.map((option, idx) => {
          return <option key={filterName + '-' + idx} value={option.id}>{option.name}</option>
        })}
      </select>
    )
}