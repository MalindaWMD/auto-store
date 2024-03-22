import Price from "../Price";

const Component = ({ value, type }) => {
  if (value === null) {
    return null;
  }

  switch (type) {
    case 'price':
      return <span className="text-blue-400 line-through mr-5 font-medium">
        <Price value={value}/>
      </span>

    case 'percentage':
      return <span className="inline-flex items-center rounded-full bg-red-400 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-blue-500/10">
        {value}%
      </span>

    case 'discounted-price':
      return <p className="text-2xl font-bold">
        <Price value={value}/>
      </p>

    case 'save':
      return <span className="text-xs text-green-600 font-medium">Save {' '}
        <Price value={value}/>
      </span>

    default:
      return null
  }
}

export default function ProductPriceCard({ price }) {
  let oldPrice = 0
  let discountedPrice = 0

  if(price){    
    oldPrice = price.price
    discountedPrice = price.discounted_price
  }

  const save = (discountedPrice - oldPrice).toFixed(2);
  const percentage = Math.ceil((save / discountedPrice) * 100);

  return (
    <>
      <Component value={discountedPrice} type={'price'} />
      <Component value={percentage} type={'percentage'} />
      <Component value={oldPrice} type={'discounted-price'} />
      <Component value={save} type={'save'} />
    </>
  )
}