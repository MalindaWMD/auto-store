import { useAxios } from "../hooks/axios"
import { useCurrentPath, useQuery } from "../hooks/routes"

// If it's the search page, we need to perform search query
export const performProductQuery = () => {
    const query = useQuery()
    const currentPath = useCurrentPath()
    const searchQuery = query.get('q')

    if(currentPath == '/shop/search' && searchQuery){
        return useAxios('/api/products/search', 'GET', { q: searchQuery });
    }
    
    return useAxios('/api/products', 'GET');
}