import { useMutation } from "@tanstack/react-query";
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { postWishlistItem } from "../../actions/UserActions";

const ButtonContent = ({added=false}) => {
  if(added){
    return(
      <>
        <HeartSolid className="h-4 w-4 mr-1 fill-blue-500" />
        Remove from wishlist
      </>
    )
  }

  return (
    <>
    <HeartIcon className="h-4 w-4 mr-1" />
    Add to wishlist
  </>
  )
}

export default function UpdateWishlist({ productId }) {

  const updateWishlistMutation = useMutation({
    mutationFn: (item) => postWishlistItem(item)
  })

  const handleUpdateWishlist = (productId) => {
    const item = {
      product_id: productId,
      action: 'ADD',
    }

    updateWishlistMutation.mutate(item);

  }

  return (
    <button 
      className="inline-flex items-center text-xs hover:text-blue-500 disabled:text-gray-500 hover:cursor-pointer mb-4" 
      onClick={() => handleUpdateWishlist(productId)}
      disabled={updateWishlistMutation.isPending}
      >
      <ButtonContent added={updateWishlistMutation.isSuccess}/>
    </button>
  )
}