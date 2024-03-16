import { useState } from 'react'
import { fetchProducts } from '../actions/ProductActions'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import ProductList from '../components/product/ProductsList'
import ProductFilters from '../components/product/filters/ProductFilters'
import { useProductSearch } from '../hooks/useProductSearch'
import { useCurrentUrl } from '../hooks/routes'
import { useNavigate } from 'react-router-dom'

export default function Shop() {
  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const currentUrl = useCurrentUrl()
  const { data, isPending, isError, isPlaceholderData } = useProductSearch(page)


  return (
    <Layout>
      <div className="bg-white">
        <div>
          {/* <MobileProductFilters open={mobileFiltersOpen} openAction={setMobileFiltersOpen} as={Fragment} /> */}
          <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
            <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <ProductFilters/>
              <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <h2 id="product-heading" className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-y-4 divide-y divide-gray-200">
                  <ProductList isLoading={isPending} isError={isError} products={data?.products}/>
                  
                  <div>
                    <Pagination isPlaceholderData={isPlaceholderData} pagination={data?.pagination} page={page} setPage={setPage}/>
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
