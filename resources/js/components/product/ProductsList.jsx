import ProductCardLoading from '../loaders/ProductCardLoading'
import ProductCard from './ProductCard'
import { FaceFrownIcon } from '@heroicons/react/24/outline'

export default function ProductList({ products, isLoading }) {

  if (isLoading) {
    return <ProductCardLoading count={3} />
  }

  if (products?.length == 0) {
    return (
      <div className="rounded w-full p-10 bg-gray-100 text-sm inline-flex items-center justify-center">
        <FaceFrownIcon className="w-6 h-6 stroke-gray-500 mr-2" />
        Sorry, No products found with selection options.
      </div>
    )
  }

  return (
    <>
      {products?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </>
  )
}