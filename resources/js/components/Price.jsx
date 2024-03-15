import { useCurrency } from "../hooks/useCurrency";

export default function Price({ value }) {
  const currency = useCurrency()

  return (
    <>
      {currency?.code + (value/100).toFixed(2) }
    </>
  )
}