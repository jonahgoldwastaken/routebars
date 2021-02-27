import { compileToHash, replaceHash } from './utils.js'

export function navigate(destination, replace) {
  const hash = compileToHash(destination)
  if (replace) replaceHash(hash)
  else window.location.hash = hash
}
