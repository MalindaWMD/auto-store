import { useAxios } from "../hooks/axios"
import { useCurrentPath, useQuery } from "../hooks/routes"

const acceptableParams = [
    'q',
    'type',
    'brand',
    'collection',
    'page',
]

// If it's the search page, we need to perform search query
export const performProductQuery = () => {
    const currentPath = useCurrentPath()

    if(currentPath == '/shop/search' && searchQuery){
        return useAxios('/api/products/search', 'GET', getParams());
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