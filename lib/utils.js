export { findCurrentRoute, parseCurrentRouteHash, compileToHash, replaceHash }

function findCurrentRoute(routes) {
  return routes.find(isInObjectArray('path', parseCurrentRouteHash()))
}

function parseCurrentRouteHash() {
  return '/' + location.hash.split('=')[0].slice(1)
}

function compileToHash(location) {
  return '#' + location.slice(1)
}

function replaceHash(location) {
  return window.location.replace(window.location.origin + location)
}
