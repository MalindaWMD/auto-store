import { Fragment, useState } from 'react'
import { performProductQuery } from '../actions/ProductActions'
import Layout from '../components/Layout'
import ProductCardLoading from '../components/loaders/ProductCardLoading'
import MobileProductFilters from '../components/product/MobileProductFilters'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import { useProductFilters } from '../hooks/productFilters'

export default function Shop() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const filters = useProductFilters()
  
  const {data:products, isLoading} = performProductQuery()
  
  return (
    <Layout>
      <div className="bg-white">
        <div>
          <MobileProductFilters open={mobileFiltersOpen} openAction={setMobileFiltersOpen} as={Fragment}/>
          <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
            <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <ProductFilters filters={filters}/>
              <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <h2 id="product-heading" className="sr-only">Products</h2>                
                <div className="grid grid-cols-1 gap-y-4 divide-y divide-gray-200">
                  {products && products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}

                  { isLoading ? <ProductCardLoading count={3}/> : null }
                  { !isLoading && !products ? <p>No product found</p> : null}
                  <div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}
