import { useAxios } from "../hooks/axios"
import { useCurrentPath, useQuery } from "../hooks/routes"

// If it's the search page, we need to perform search query
export const performProductQuery = () => {
    const query = useQuery()
    const currentPath = useCurrentPath()

    // Query params
    const search = query.get('q')
    const type = query.get('type')
    const brand = query.get('brand')
    const collection = query.get('collection')
    const page = query.get('page')

    if(currentPath == '/shop/search' && searchQuery){
        return useAxios('/api/products/search', 'GET', { q: search, type: type, brand: brand, collection: collection, page: page });
    }
    
    return useAxios('/api/products', 'GET', { q: search, type: type, brand: brand, collection: collection, page: page });
}