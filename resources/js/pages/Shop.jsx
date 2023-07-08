import { Fragment, useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import Layout from '../components/Layout'
import ProductFilters from '../components/product/ProductFilters'
import MobileProductFilters from '../components/product/MobileProductFilters'
import ProductCardLoading from '../components/loaders/ProductCardLoading'
import { useProductFilters } from '../hooks/productFilters'
import { useAxios } from '../hooks/axios'

export default function Shop() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const filters = useProductFilters();

  const {data: products, isLoading} = useAxios('/api/products', 'GET');

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
