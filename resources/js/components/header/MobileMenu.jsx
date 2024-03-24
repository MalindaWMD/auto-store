import React from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {useNavigationLinks} from '../../hooks/routes';

export default function MobileMenu({show, openAction, as, currencies}) {
  const navigation = useNavigationLinks();

  return (
    <Transition.Root show={show} as={as}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={openAction}>
        <Transition.Child
          as={as}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={as}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-black pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => openAction(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 border-t border-gray-600 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.path} className="-m-2 block p-2 font-medium text-gray-100">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-600 px-4 py-6">
                <div className="flow-root">
                  <a href="/login" className="-m-2 block p-2 font-medium text-gray-100">
                      Login
                  </a>
                </div>
                <div className="flow-root">
                  <a href="/register" className="-m-2 block p-2 font-medium text-gray-100">
                    Register
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
