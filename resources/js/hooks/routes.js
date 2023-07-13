import { matchPath, matchRoutes, useLocation } from "react-router"
import { routes } from "../routes/routes"
import { useMemo } from "react"

export const useNavigationLinks = () => {
  let navigation = {
    pages: [],
    categories: [],
  }

  routes.map(route => {
    if (route.index) {
      navigation.pages.push({
        path: route.path,
        name: route.displayName,
      })
    }
  })

  return navigation
}

export const useCurrentRoute = () => {
  const location = useLocation()
  const [{ route }] = matchRoutes(routes, location.pathname)

  const isCurrentPath = matchPath(route.path, location.pathname) !== null

  return {route, isCurrentPath }
}

export const useQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const useCurrentPath = () => {
  return useLocation().pathname
}