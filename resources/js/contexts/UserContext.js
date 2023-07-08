import { createContext, useEffect, useState } from "react"
import { useAxiosPromise } from "../hooks/axios"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    (async () => {
      await useAxiosPromise('/api/user', 'GET').then(res => {
        setUser(res.data.data)
      }).catch(err => { })
    })()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}