import { Tab } from '@headlessui/react'
import { classNames } from '../../utils/css'

export default function ProductImageGallery({ images }) {

  Object.keys(images)

  if( !images || images.length === 0 ){
    return (
      <img src="/images/image-placeholder.jpg" alt="" className="w-full h-full shadow-sm" />
    )
  }

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {Object.keys(images).map((key) => {
            let image = images[key]
            return <Tab
              key={key}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              {({ selected }) => (
                <>
                  <span className="sr-only">{image.name}</span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img src={image.original_url} alt="" className="h-full w-full object-contain object-center" />
                  </span>
                  <span
                    className={classNames(
                      selected ? 'ring-indigo-500' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
        })}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
        {Object.keys(images).map((key) => {
          let image = images[key]
          return <Tab.Panel key={key}>
            <img
              src={image.original_url}
              className="h-full w-full object-contain object-center sm:rounded-lg"
            />
          </Tab.Panel>
        })}
      </Tab.Panels>
    </Tab.Group>
  )
}