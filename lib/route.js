export function route(path, component, middleware) {
  return {
    path,
    component,
    middleware,
  }
}
