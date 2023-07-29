import { RadioGroup } from "@headlessui/react";

export default function ProductVariants({ selected, onChange, variants, title = null }) {

  if (variants.length <= 1) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {title ? <h3 className="text-sm font-medium text-gray-900">Size</h3> : null}
      </div>

      <RadioGroup value={selected} onChange={onChange} className="mt-4">
        <RadioGroup.Label className="sr-only">Choose a variant</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {variants.map((variant) => (
            <RadioGroup.Option
              key={'v-' + variant.id}
              value={variant.id}
              disabled={variant.stock === 0}
              className={({ active }) =>
                classNames(
                  variant.stock !== 0
                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                  active ? 'ring-2 ring-indigo-500' : '',
                  'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="span">{variant.name}</RadioGroup.Label>
                  {variant.stock !== 0 ? (
                    <span
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-md'
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                    >
                      <svg
                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        stroke="currentColor"
                      >
                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                      </svg>
                    </span>
                  )}
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  )
}