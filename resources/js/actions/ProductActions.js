import { useAxios } from "../hooks/axios"
import { useCurrentPath, useQuery } from "../hooks/routes"
import ReactGA from "react-ga4";

// const acceptableParams = [
//     'q',
//     'type',
//     'brand',
//     'collection',
//     'page',
// ]

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

  let params = {};
  query.forEach((value, key) => {
    params[key] = value
  });
  return params;
}