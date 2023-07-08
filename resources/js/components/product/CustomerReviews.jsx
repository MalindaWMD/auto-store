import { classNames } from "../../utils/css"
import RatingBar from "../RatingBar"

export default function CustomerReviews({reviews}) {
  if (!reviews || reviews.length == 0) {
    return null
  }

  return (
    <>
      <h3 className="sr-only">Customer Reviews</h3>
      {reviews.map((review, reviewIdx) => (
        <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
          <div className="flex-none py-10">
            <img src={review.avatarSrc} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
          </div>
          <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10')}>
            <h3 className="font-medium text-gray-900">{review.user.name}</h3>
            <p>
              <time dateTime={review.created_at}>{review.created_at}</time>
            </p>

            <RatingBar value={review.rating} size="md" />

            <p className="sr-only">{review.rating} out of 5 stars</p>

            <p className="prose prose-sm mt-4 max-w-none text-gray-500">{review.comment}</p>
          </div>
        </div>
      ))}
    </>
  )
}