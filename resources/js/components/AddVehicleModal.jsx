import Modal from './Modal'
import { useMutation } from '@tanstack/react-query';
import { postNewVehicle } from '../actions/VehicleActions';
import FormMessage from './FormMessage';

export default function AddVehicleModal({ open, openAction }) {

  const addVehicleMutation = useMutation({
    mutationFn: (newVehicle) => {
      return postNewVehicle(newVehicle)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData(e.target)
    data = Object.fromEntries(data.entries())

    addVehicleMutation.mutate(data, {
      onSuccess: () => {
        e.target.reset()
      }
    })
  }

  const handleClose = () => {
    addVehicleMutation.reset()
    openAction()
  }

  return (
    <>
      <Modal open={open} setOpen={handleClose} size="xl">
        <div className="text-left">
          <h1 className="text-lg font-bold mb-3">Can’t find your car in the catalogue?</h1>
          <p className="text-sm mb-2">Please provide the following information about your car and we will try to add it to our catalogue:</p>

          <FormMessage isShown={addVehicleMutation.isSuccess} type="success" message="Your request has been submitted." />
          <FormMessage isShown={addVehicleMutation.isError} type="error" message={addVehicleMutation.error?.response?.data?.message} />

          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="vin" className="block text-sm font-medium leading-6 text-gray-900">
                Vehicle Identification Number(VIN)
              </label>
              <div className="mt-2">
                <input type="text" name="vin" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <label htmlFor="make" className="block text-sm font-medium leading-6 text-gray-900">
                  Vehicle Make
                </label>
                <div className="mt-2">
                  <input type="text" name="make" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" required />
                </div>
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
                  Model
                </label>
                <div className="mt-2">
                  <input type="text" name="model" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" required />
                </div>
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                  Year of manufacture
                </label>
                <div className="mt-2">
                  <input type="text" name="year" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" required />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="maker" className="block text-sm font-medium leading-6 text-gray-900">
                Your email
              </label>
              <div className="mt-2">
                <input type="email" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:ring-gray-200 disabled:cursor-not-allowed placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:text-gray-400" />
              </div>
              <small><i>You'll be notified as soon as your car has been added to the catelogue</i></small>
            </div>

            <div>
              <button type="submit" disabled={addVehicleMutation.isPending} className="mt-5 w-full rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-center text-white hover:bg-indigo-700 flex items-center justify-center">
                {addVehicleMutation.isPending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}