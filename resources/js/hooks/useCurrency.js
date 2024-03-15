import { useQuery } from "@tanstack/react-query"
import { useAppData } from "./useAppData"

const defaultCurrency = {
  "id": 1,
  "code": "LKR",
  "name": "Sri Lankan rupee",
  "exchange_rate": "1.0000",
  "decimal_places": 2,
  "enabled": 1,
  "default": 1,
  "created_at": "2023-06-03T14:57:37.000000Z",
  "updated_at": "2023-07-30T16:30:17.000000Z"
}

export const useCurrency = () => {
  const {data, isPending, isError} = useAppData()

  if(isPending || isError){
    return defaultCurrency
  }
  
  return data?.currency
}