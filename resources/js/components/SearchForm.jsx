import { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAxiosPromise } from '../hooks/axios'
import { useQuery as useURLQuery } from '../hooks/routes'
import { classNames } from '../utils/css'
import SearchHelperModal from './SearchHelperModal'
import AddVehicleModal from './AddVehicleModal'
import { useQuery } from '@tanstack/react-query'
import { fetchVehicleEngines, fetchVehicleMakes, fetchVehicleModels } from '../actions/VehicleActions'

export default function SearchForm({ plain = false, className }) {

  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  // const [makes, setMakes] = useState([]);
  // const [models, setModels] = useState([]);
  // const [engines, setEngines] = useState([]);

  const [make, setMake] = useState()
  const [model, setModel] = useState()

  const urlQuery = useURLQuery()

  // get Makes
  const {data: makes, isPending: isMakesPending} =  useQuery({
    retry: 1,
    queryKey: ['vehicles', 'makes'],
    queryFn: () => fetchVehicleMakes()
  })

  // get models
  const {data: models, isPending: isModelsPending} =  useQuery({
    enabled: !!make,
    retry: 1,
    queryKey: ['vehicles', 'models', make],
    queryFn: () => fetchVehicleModels(make)
  })

  // get engines
  const {data: engines, isPending: isEnginessPending} =  useQuery({
    enabled: !!model,
    retry: 1,
    queryKey: ['vehicles', 'models', model],
    queryFn: () => fetchVehicleEngines(model)
  })

  const handleMakesChange = (e) => {
    setMake(e.target.value)
    setModel(null)
  }

  return (
    <>
      <SearchHelperModal open={showHelpModal} openAction={setShowHelpModal}/>
      <AddVehicleModal open={showVehicleModal} openAction={setShowVehicleModal}/>

      <div className={classNames(className, !plain ? 'shadow-md border rounded-md p-6' : '')}>
        <form action="/shop" method="GET">

          <h3 className="mb-3 font-bold">Select your vehicle to search for parts</h3>

          <div className="mb-3">
            <label htmlFor="maker" className="block text-sm font-medium leading-6 text-gray-900">
              Maker
            </label>
            <div className="mt-2">
              <select
                name="make"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400"
                disabled={ isMakesPending }
                onChange={handleMakesChange}
                >
                <option value="" className="text-gray-100">Select make</option>
                {makes?.map(make => {
                  return <option key={make.id} value={make.id} className="text-gray-100">{make.name}</option>
                })}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
              Model
            </label>
            <div className="mt-2">
              <select
                name="make"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400"
                disabled={ isModelsPending }
                onChange={(e) => setModel(e.target.value)}
                >
                <option value="" className="text-gray-100">Select model</option>
                {models?.map(model => {
                  return <option key={model.id} value={model.id} className="text-gray-100">{model.name}</option>
                })}
              </select>
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="engine" className="block text-sm font-medium leading-6 text-gray-900">
              Engine
            </label>
            <div className="mt-2">
              <select
                name="make"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400"
                disabled={ isEnginessPending }
                >
                <option value="" className="text-gray-100">Select engine</option>
                {engines?.map(engine => {
                  return <option key={engine.id} value={engine.id} className="text-gray-100">{engine.name}</option>
                })}
              </select>
            </div>
          </div>

          <button type="button" className="text-xs text-indigo-600 font-medium" onClick={() => setShowVehicleModal(!showVehicleModal)}>Can't find your vehicle?</button>

          <div className="mb-3">
            <label htmlFor="q" className="w-full justify-center items-center text-sm font-medium leading-6 text-gray-900 inline-flex">
              or enter what you need
              <button type="button" onClick={() => setShowHelpModal(!showHelpModal)}>
                <InformationCircleIcon className="h-5 w-5 fill-blue-500" />
              </button>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="q"
                id="q"
                autoComplete="q"
                placeholder="ex:- Wheel hub"
                defaultValue={urlQuery.get('q')}
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
    </>
  )
}