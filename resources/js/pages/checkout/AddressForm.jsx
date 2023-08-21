import React, { useState } from "react"
import { getCitiesInProvince, getProvices } from "../../utils/address/address"
import ValidationError from "../../components/ValidationError"

export default function AddressForm({ address, inputChangeAction, validationErrors, type = 'shipping' }) {
  const [cities, setCities] = useState([])

  const loadCities = (e) => {
    if (!e.target.value) {
      return
    }

    setCities(getCitiesInProvince(e.target.value))
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
      <div className="sm:col-span-3">
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
          First name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={address?.first_name || ''}
            onChange={(e) => inputChangeAction(type, e.target.name, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <ValidationError errors={validationErrors?.[type + 'Address.first_name']} />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
          Last name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={address?.last_name || ''}
            onChange={(e) => inputChangeAction(type, e.target.name, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <ValidationError errors={validationErrors?.[type + 'Address.last_name']} />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="line_one" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="line_one"
            name="line_one"
            autoComplete="street-address"
            value={address?.line_one || ''}
            onChange={(e) => inputChangeAction(type, e.target.name, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <ValidationError errors={validationErrors?.[type + 'Address.line_one']} />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="line_two" className="block text-sm font-medium text-gray-700">
          Street
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="line_two"
            name="line_two"
            value={address?.line_two || ''}
            onChange={(e) => inputChangeAction(type, e.target.name, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <ValidationError errors={validationErrors?.[type + 'Address.line_two']} />
        </div>
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State / Province
        </label>
        <div className="mt-1">
          <select
            id="state"
            name="state"
            autoComplete="address-level1"
            defaultValue={address?.state || ''}
            onChange={(e) => { loadCities(e); inputChangeAction(type, e.target.name, e.target.value) }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {getProvices().map((province, i) => {
              return <option key={i} value={province}>{province}</option>
            })}
          </select>
          <ValidationError errors={validationErrors?.[type + 'Address.state']} />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <div className="mt-1">
          <select
            id="city"
            name="city"
            autoComplete="address-level1"
            defaultValue={address?.city || ''}
            onChange={(e) => inputChangeAction(type, e.target.name, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {
              Object.keys(cities).map((key, ki) => {
                return <React.Fragment key={ki}>
                  {ki === 0 && <option value=""></option>}
                  <optgroup label={key}>
                    {cities[key].map((city, i) => {
                      return <option key={i} value={city}>{city}</option>
                    })}
                  </optgroup>
                </React.Fragment>
              })
            }
          </select>
          <ValidationError errors={validationErrors?.[type + 'Address.city']} />
        </div>
      </div>

      <div>
        <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
          Postal code
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="postcode"
            name="postcode"
            autoComplete="postcode"
            value={address?.postcode || ''}
            onChange={(e) => inputChangeAction(type, e.target.name, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <ValidationError errors={validationErrors?.[type + 'Address.postcode']} />
        </div>
      </div>

      {
        type == 'shipping' &&
        <div className="sm:col-span-3">
          <label htmlFor="delivery_instructions" className="block text-sm font-medium text-gray-700">
            Delivery instructions
          </label>
          <div className="mt-1">
            <textarea
              rows={4}
              id="delivery_instructions"
              name="delivery_instructions"
              value={address?.delivery_instructions || ''}
              onChange={(e) => inputChangeAction(type, e.target.name, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
            <ValidationError errors={validationErrors?.[type + 'Address.delivery_instructions']} />
          </div>
        </div>
      }
    </div>
  )
}