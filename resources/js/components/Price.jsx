import { useCurrency } from "../hooks/useCurrency";

export default function Price({ value }) {
  const currency = useCurrency()

  value = !value ? 0 : value;

  return (
    <>
      {currency?.code + (value/100).toFixed(2) }
    </>
  )
}