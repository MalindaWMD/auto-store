import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '../utils/css'
import { useQuery } from '../hooks/routes'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import Modal from './Modal'

export default function SearchForm({ plain=false, className}) {

  const [showHelpModal, setShowHelpModal] = useState(false)

  const query = useQuery()

  return (
    <>
    <Modal open={showHelpModal} setOpen={setShowHelpModal}>
      
      <div className="text-xs text-left">
      <p className="mb-3">Search for spare parts using the following combinations.</p>

      <table>
        <thead>
          <tr className="bg-indigo-400 text-white text-center">
            <th className="py-1">Search type</th>
            <th className="py-1">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1 font-medium">Car part</td>
            <td className="py-1">Engine oil</td>
          </tr>
          <tr>
            <td className="py-1 font-medium">Car part + car part manufacturer</td>
            <td className="py-1">Engine Oil CASTROL</td>
          </tr>
          <tr>
            <td className="py-1 font-medium">Car part + car brand</td>
            <td className="py-1">Engine oil DAEWOO</td>
          </tr>
          <tr>
            <td className="py-1 font-medium">Car part + item number</td>
            <td className="py-1">Engine oil + 192.929</td>
          </tr>
          <tr>
            <td className="py-1 font-medium">Item number</td>
            <td className="py-1">8GA 002 071-121</td>
          </tr>
          <tr>
            <td className="py-1 font-medium">Item number + car part manufacturer</td>
            <td className="py-1">1219603500 CASTROL</td>
          </tr>
          <tr>
            <td className="py-1 font-medium">OEN (original equipment number)</td>
            <td className="py-1">1332645</td>
          </tr>
          <tr>
            <td className="py-1 font-medium">OEN + car part manufacturer</td>
            <td className="py-1">100109001 CASTROL</td>
          </tr>
        </tbody>
      </table>
      </div>
    </Modal>
    
    <div className={ classNames(className,  !plain ? 'shadow-md border rounded-md p-6' : '') }>
      <form action="/shop" method="GET">

        <h3 className="mb-3 font-bold">Select your vehicle to search for parts</h3>

        <div className="mb-3">
          <label htmlFor="maker" className="block text-sm font-medium leading-6 text-gray-900">
            Maker
          </label>
          <div className="mt-2">

            <select 
              name="make" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" className="text-gray-100">Select make</option>

            </select>
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
          <label htmlFor="q" className="w-full justify-center items-center text-sm font-medium leading-6 text-gray-900 inline-flex">
            or enter what you need
            <button type="button" onClick={() => setShowHelpModal( ! showHelpModal)}>
              <InformationCircleIcon className="h-5 w-5 fill-blue-500"/>
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