import { useQuery } from "@tanstack/react-query"
import { fetchAppData } from "../actions/AppActions"

export const useAppData = () => {
    return useQuery({
        staleTime: 1000 * 60 * 60 * 24,
        queryKey: ['app-data'],
        queryFn: () => fetchAppData()
    })
}