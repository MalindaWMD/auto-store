import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../actions/ProductActions"
import { useQueryParams } from "./routes"
import { keepPreviousData } from '@tanstack/react-query'

export const useProductSearch = (page) => {
    const params = getParams(page)

    return useQuery({
        queryKey: ['search', 'products', page, params],
        queryFn: () => fetchProducts(params),
        placeholderData: keepPreviousData,
    })
}

const getParams = (page) => {
    const query = useQueryParams()
  
    return {
      make: query.get('make'),
      model: query.get('model'),
      engine: query.get('engine'),
      types: query.get('types'),
      q: query.get('q'),
      collection: query.get('collection'),
      brand: query.getAll('brand[]'),
      page: page,
    }
  }