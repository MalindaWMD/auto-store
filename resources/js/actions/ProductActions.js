import { useAxios } from "../hooks/axios"
import { useCurrentPath, useQuery } from "../hooks/routes"
import ReactGA from "react-ga4";

// If it's the search page, we need to perform search query
export const performProductQuery = () => {
  const currentPath = useCurrentPath()

  const params = getParams()

  if (currentPath == '/shop/search' && searchQuery) {
    return useAxios('/api/products/search', 'GET', getParams());
  }

  if (params) {
    ReactGA.event({
      category: "Product search",
      action: "Search searched",
    });
  }

  return useAxios('/api/products', 'GET', getParams());
}

const getParams = () => {
  const query = useQuery()

  return {
    make: query.get('make'),
    model: query.get('model'),
    engine: query.get('engine'),
    types: query.get('types'),
    q: query.get('q'),
    collection: query.get('collection'),
    brand: query.getAll('brand[]'),
    page: query.get('page'),
  }
}