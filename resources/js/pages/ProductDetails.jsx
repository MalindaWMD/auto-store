import { useState, Fragment, useEffect, useContext } from 'react'
import { RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { classNames } from '../utils/css'
import { useParams } from 'react-router'
import { useAxios, useAxiosPromise } from '../hooks/axios'
import ProductPriceCard from '../components/product/ProductPriceCard'
import RatingBar from '../components/RatingBar'
import ShareButtons from '../components/ShareButtons'
import RelatedProducts from '../components/RelatedProducts'
import Layout from '../components/Layout'
import Skeleton from 'react-loading-skeleton'
import ProductVariants from '../components/product/ProductVariants'
import ProductImageGallery from '../components/product/ProductImageGallery'
import CustomerReviews from '../components/product/CustomerReviews'
import ProductFaq from '../components/product/ProductFaqs'
import ProductDescription from '../components/product/ProductDescription'
import { useCart } from 'react-use-cart'

const faqs = [


  {
    question: 'What format are these icons?',
    answer:
      'The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.',
  },
  {
    question: 'Can I use the icons at different sizes?',
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
]

export const ProductLoading = () => {
  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-8  pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div>
              <Skeleton className="w-1/3 pb-[50%] lg:w-1/2 lg:pb-[100%] mb-5" />
            </div>
            <div>
              <Skeleton />
              <Skeleton className="h-8" />
              <Skeleton className="h-14 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function ProductDeatils() {
  const { id } = useParams()
  const [selectedVariant, setSelectedVariant] = useState()
  const [product, setProduct] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    loadData()
  }, [])

  // Loading product data
  const loadData = () => {
    useAxiosPromise('/api/products/' + id, 'GET').then(res => {
      let data = res.data.data;
  
      // set product
      setProduct(data)
  
      // set default selected variant
      if(data && data.variants && data.variants.length > 0){
        setSelectedVariant(data.variants[0])
      }
  
      setIsLoading(false)
    }).catch( err => {
      setIsLoading(false)
    })
  }

  if (isLoading || !product) {
    return <ProductLoading />
  }

  const handleAddToCart = () => {
    useAxiosPromise('/api/cart/add', 'POST', {variant: selectedVariant.id}).then(res => {
      let data = res.data.data
      addItem(data, data.qty || 1)
    }).catch( err => {
      console.log(err);
    })
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-8  pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <div>

              <ProductImageGallery images={product.images} />

              <div className="mx-auto mt-16 pt-10 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                <Tab.Group as="div">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                            'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                          )
                        }
                      >
                        Product Details
                      </Tab>

                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                            'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                          )
                        }
                      >
                        Customer Reviews
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                            'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                          )
                        }
                      >
                        FAQ
                      </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    <Tab.Panel className="pt-10">
                      <ProductDescription description={product.description} />
                    </Tab.Panel>
                    <Tab.Panel className="-mb-10">
                      <CustomerReviews reviews={product.ratings} />
                    </Tab.Panel>

                    <Tab.Panel className="text-sm text-gray-500">
                      <ProductFaq faqs={faqs} />
                    </Tab.Panel>


                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-500 text-sm">Serial No: {product.serial_no}</p>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <div className="flex justify-start items-center py-5">
                  <div>
                    <ProductPriceCard className="" price={product.prices[0]} />
                  </div>
                  <div className="ml-4 border-l border-gray-300 pl-4">
                    <h2 className="sr-only">Reviews</h2>
                    <RatingBar />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-sm text-gray-500">
                  {product.short_description}
                </div>
              </div>

              <div className="mt-6">

                <div className="mt-10">
                  <ProductVariants selected={selectedVariant} onChange={setSelectedVariant} variants={product.variants} />
                </div>

                <div className="mt-10 flex">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none  focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    disabled={ !selectedVariant || !selectedVariant.id}
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>

              <ShareButtons />

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">

                  <div className="pt-10">
                    <h3 className="font-medium text-gray-900 mb-3">Additional details</h3>
                    <table>
                      <tbody>
                        {product.additional_data.map((detail, i) => (
                          <tr key={i} className="text-sm">
                            <td className="py-1 font-medium">{detail.name}:</td>
                            <td className="text-right py-1 text-gray-500">{detail.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </section>
            </div>
          </div>

          <RelatedProducts products={product.associations} />
        </div>
      </div>
    </Layout>
  )
}