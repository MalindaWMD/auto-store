import { createContext, useEffect, useState } from "react"
import { useAxios, useAxiosPromise } from "../hooks/axios"
import PageLoading from "../components/loaders/PageLoading"
import Cookies from "js-cookie"
import { getCookie, setCookie } from "../utils/cookies"
import { useCart } from "react-use-cart"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {setItems, emptyCart} = useCart()

  const isLoggedIn = () => {
    return user !== null && user !== undefined
  }

  const loadAppData = async () => {
    let cookieData = getCookie('app-data')
    
    if (cookieData) {
      setAppData(cookieData)
      setIsLoading(false)
      return
    }

    await useAxiosPromise('/api/app/data', 'GET').then(res => {
      setAppData(res.data.data)
      setCookie('app-data', res.data.data)
    }).catch(err => { })
  }

  const loadUser = async () => {
    // let cookieData = getCookie('user')
    // if ( ! cookieData) {
    //   setUser(cookieData)
    //   setIsLoading(false)
    //   return
    // }

    useAxiosPromise('/api/user', 'GET').then(res => {
      setUser(res.data.data)
      setCookie('user', res.data.data, 1/24)
      setIsLoading(false)
    }).catch(err => {
      setIsLoading(false)
    })
  }

  const loadCart = () => {
    useAxiosPromise('/api/cart', 'GET').then(res => {
      let cart = res.data.data
      if(cart) {
        setItems(cart.items)
      }else{
        emptyCart()
      }
    }).catch(err => { 
      console.log(err)
    })
  }

  useEffect(() => {
    loadAppData()
    loadUser()
    loadCart()
  }, [])

  if (isLoading) {
    return <PageLoading />
  }

  return (
    <AppContext.Provider value={{ appData, user, setUser, isLoggedIn }}>
      {children}
    </AppContext.Provider>
  )
}