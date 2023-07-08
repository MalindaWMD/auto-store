import { ArchiveBoxIcon, HeartIcon } from '@heroicons/react/24/outline'
import ProductPriceCard from './ProductPriceCard'
import { Link } from 'react-router-dom'
import RatingBar from '../RatingBar'

const ProductImage = () => {
  return (
    <div className="flex flex-col justify-start items-center">
      <a href="#">
        <img className="w-1/3 self-start justify-self-start" src="https://cdn.autodoc.de/brands/thumbs/152.png?m=2&ccf=68956265" alt="" />
      </a>
      <div className="flex justify-center items-center w-full h-full">
        <img src="https://cdn.autodoc.de/thumb?id=16627508&m=2&n=0&lng=en&ccf=94077840" alt="" />
      </div>
    </div>
  )
}

const ProductAdditionalDetails = ({details}) => {

  if( ! details || details.length == 0){
    return;
  }

  return (
    <div className="mt-4 text-xs bg-gray-100 p-2 rounded-sm">
        <table className="w-full">
          <tbody>
            { details.map((attr, i) => (
              <tr key={i}>
                <td className="py-1 font-medium">{attr.name}: </td>
                <td className="py-1 text-gray-500 text-right">{attr.value}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
  )
}

const ProductDeatils = ({product}) => {
  return (
    <div className="col-span-2">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <span className="text-sm text-gray-800">{product.short_description}</span>

      <RatingBar value={product.rating.average} total={product.rating.total_ratings} size="xs" />

      <div className="text-gray-500 text-xs font-medium mt-4">SKU: {product.stock.sku}</div>

      <ProductAdditionalDetails details={product.additional_data}/>
      
    </div>
  )
}

const PriceDeatils = ({product}) => {
  return (
    <div className="px-5 flex flex-col justify-between items-start">
      <div>
        <ProductPriceCard price={product.price} />
        {product.stock.available && <StockStatus />}
      </div>
      <div className="flex flex-col">
        <a className="inline-flex items-center text-sm hover:text-blue-500 hover:cursor-pointer mb-4">
          <HeartIcon className="h-4 w-4 mr-1" />
          Add to wishlist
        </a>
        <Link to={'/shop/product/' + product.slug}
          className="w-full text-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-20">
          View more
        </Link>
      </div>
    </div>
  )
}

const StockStatus = () => {
  return (
    <div className="my-3 flex justify-start items-center text-xs text-green-600">
      <ArchiveBoxIcon className="w-4 h-4 mr-2" />
      <span>In stock</span>
    </div>
  )
}

export default function ProductCard({ product }) {  
  return (
    <div className="grid grid-cols-4 grid-gap-6 py-5 hover:bg-gray-50 rounded-sm">
      <ProductImage />
      <ProductDeatils product={product}/>
      <PriceDeatils product={product}/>
    </div>
  )
}