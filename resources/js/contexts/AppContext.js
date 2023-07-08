import { createContext, useEffect, useState } from "react"
import { useAxiosPromise } from "../hooks/axios"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    (async () => {
      await useAxiosPromise('/api/app/data', 'GET').then(res => {
        setAppData(res.data.data)
      }).catch(err => { })

      await useAxiosPromise('/api/user', 'GET').then(res => {
        setUser(res.data.data)
      }).catch(err => { })
    })()
  }, [])

  return (
    <AppContext.Provider value={{ appData, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}