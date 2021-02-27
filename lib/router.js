import { findCurrentRoute } from './utils.js'

export function router(routes) {
  let hash
  let root
  let currentComponent
  window.addEventListener('hashchange', hashChangeHandler)
  return element => {
    root = element
    hashChangeHandler()
  }

  async function hashChangeHandler() {
    const newRoute = findCurrentRoute(routes)
    if (newRoute) {
      unmountRoute()
      const middlewareRoute = runMiddleware(newRoute)
      if (middlewareRoute) {
        navigate(middlewareRoute)
        return
      }
      renderRoute()
    }
  }

  function unmountRoute() {
    currentRoute.unmounted?.()
  }

  function runMiddleware(route) {
    return route.middleware?.()
  }

  async function renderRoute(route) {
    currentComponent = await route.component(updateRoute.bind(null, hash))
    root.innerHTML = currentComponent.template
    root.className = hash
    currentComponent.mounted?.(currentComponent)
  }

  function updateRoute(path, newTemplate) {
    if (path === hash) {
      root.innerHTML = newTemplate
      currentComponent.updated?.(currentComponent)
    }
  }
}
