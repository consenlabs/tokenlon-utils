const padLeft = (n: string, width: number, z?: string): string => {
  const nz = z || '0'
  const nn = '' + n
  return nn.length >= width
    ? nn
    : new Array(width - nn.length + 1).join(nz) + nn
}

function compareSemver(base: string, compare: string) {
  const pa = String(base).split('.')
  const pb = String(compare).split('.')
  for (let i = 0; i < 3; i++) {
    const na = Number(pa[i])
    const nb = Number(pb[i])
    if (na > nb) return 1
    if (nb > na) return -1
    if (!isNaN(na) && isNaN(nb)) return 1
    if (isNaN(na) && !isNaN(nb)) return -1
  }
  return 0
}

/**
 * @param {string} key
 * @return {*}
 */
function queryUrlSearchParams(key: string) {
  const qs = new URLSearchParams(window.location.search)
  return qs.get(key)
}

/**
 * @param {Object} obj
 * @return {*}  {string}
 */
const encodeURLParams = (obj: Object): string => {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value === 'undefined') {
      value = ''
    }
    params.push([key, encodeURIComponent(value)].join('='))
  })
  return params.join('&')
}

const hasParentNodes = (classname: string) => {
  return (node) => {
    while (node) {
      if (node.classList && node.classList.contains(classname)) {
        return true
      }
      node = node.parentNode
    }
    return false
  }
}

export {
  padLeft,
  compareSemver,
  encodeURLParams,
  queryUrlSearchParams,
  hasParentNodes,
}
