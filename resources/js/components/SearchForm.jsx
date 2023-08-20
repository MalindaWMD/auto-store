import { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAxios, useAxiosPromise } from '../hooks/axios'
import { useQuery } from '../hooks/routes'
import { classNames } from '../utils/css'
import SearchHelperModal from './SearchHelperModal'
import { getCookie, setCookie } from '../utils/cookies'

export default function SearchForm({ plain = false, className }) {

  const [showHelpModal, setShowHelpModal] = useState(false)
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [engines, setEngines] = useState([]);

  const query = useQuery()

  useEffect(() => {
    useAxiosPromise('/api/vehicles/makes', 'GET').then(res => {
      if(res.status != 200){
        return
      }

      setMakes(res.data?.data)
    });
  }, [])

  const handleMakerChange = (e) => {
    useAxiosPromise('/api/vehicles/models/' + e.target.value, 'GET').then(res => {
      if(res.status != 200){
        return
      }
      
      setModels(res.data?.data);
    });
  }

  const handleModelChange = (e) => {
    useAxiosPromise('/api/vehicles/engines/' + e.target.value, 'GET').then(res => {
      if(res.status != 200){
        return
      }
      
      setEngines(res.data?.data);
    });
  }

  return (
    <>
      <SearchHelperModal open={showHelpModal} openAction={setShowHelpModal}/>

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
                disabled={ makes.length == 0 }
                onChange={handleMakerChange}
                >
                <option value="" className="text-gray-100">Select make</option>
                {makes && makes.map(make => {
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
                disabled={ models.length == 0 }
                onChange={handleModelChange}
                >
                <option value="" className="text-gray-100">Select model</option>
                {models.map(model => {
                  return <option key={model.id} value={model.id} className="text-gray-100">{model.name}</option>
                })}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="engine" className="block text-sm font-medium leading-6 text-gray-900">
              Engine
            </label>
            <div className="mt-2">
              <select
                name="make"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400"
                disabled={ engines.length == 0 }
                >
                <option value="" className="text-gray-100">Select engine</option>
                {engines.map(engine => {
                  return <option key={engine.id} value={engine.id} className="text-gray-100">{engine.name}</option>
                })}
              </select>
            </div>
          </div>

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
    </>
  )
}