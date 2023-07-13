import { classNames } from "../utils/css"
import { StarIcon } from '@heroicons/react/20/solid'

const sizes = {
  'xs': 'text-xs',
  'sm': 'text-sm',
}

export default function RatingBar({ value, total, size = 'sm' }) {

  if (!value) {
    return null
  }

  return (
    <div className={classNames(sizes[size], "flex items-center mt-4")}>
      {[...Array(value).keys()].map((rating) => (
        <StarIcon
          key={rating}
          className="text-yellow-400 h-4 w-4 flex-shrink-0"
          aria-hidden="true"
        />
      ))}
      {total && <span className="ml-1 text-gray-500">{total} Reviews</span>}
    </div>
  )
}