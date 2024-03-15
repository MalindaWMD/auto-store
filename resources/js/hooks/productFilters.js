import { useQuery } from "@tanstack/react-query";
import { fetchProductBrands } from "../actions/ProductFilterActions";

const filters = [
  // {
  //   id: 'color',
  //   name: 'Color',
  //   options: [
  //     { value: 'white', label: 'White' },
  //     { value: 'beige', label: 'Beige' },
  //     { value: 'blue', label: 'Blue' },
  //     { value: 'brown', label: 'Brown' },
  //     { value: 'green', label: 'Green' },
  //     { value: 'purple', label: 'Purple' },
  //   ],
  // },
  // {
  //   id: 'category',
  //   name: 'Category',
  //   options: [
  //     { value: 'new-arrivals', label: 'All New Arrivals' },
  //     { value: 'tees', label: 'Tees' },
  //     { value: 'crewnecks', label: 'Crewnecks' },
  //     { value: 'sweatshirts', label: 'Sweatshirts' },
  //     { value: 'pants-shorts', label: 'Pants & Shorts' },
  //   ],
  // },
  // {
  //   id: 'sizes',
  //   name: 'Sizes',
  //   options: [
  //     { value: 'xs', label: 'XS' },
  //     { value: 's', label: 'S' },
  //     { value: 'm', label: 'M' },
  //     { value: 'l', label: 'L' },
  //     { value: 'xl', label: 'XL' },
  //     { value: '2xl', label: '2XL' },
  //   ],
  // },
]

export const useProductFilters = () => {
  return useQuery({
    queryKey: ['product', 'filters'],
    queryFn: () => fetchProductBrands()
  })
}