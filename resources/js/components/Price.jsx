import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"
import getSymbolFromCurrency from "currency-symbol-map";

export default function Price({ value }) {

  const {appData} = useContext(AppContext)

  const getSymbol = () => {
    return getSymbolFromCurrency(appData?.currency.code)
  }

  return (
    <>
      {getSymbol() + (value/100).toFixed(2) }
    </>
  )
}