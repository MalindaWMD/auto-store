import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { classNames } from '../utils/css'

const icons = {
  success: <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />,
  error: <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />,
  info: <ExclamationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />,
}

const iconClasses = {
  success: 'bg-green-100',
  error: 'bg-red-100',
  info: 'bg-blue-100',
}

export default function Modal({ title, children, type, open=false, setOpen=()=>{} }) {

  const Icon = () => {
    if( ! type) return null

    return (
      <div className={classNames('mx-auto flex h-12 w-12 mb-4 items-center justify-center rounded-full bg-green-100', iconClasses[type])}>
        {icons[type]}
      </div>
    )
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-95 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:px-6 sm:py-8">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                    autoFocus={false}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div>
                  <div className="text-center">
                    <Icon/>
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      {children}
                      {/* <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                      </p> */}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
