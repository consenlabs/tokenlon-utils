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
export { encodeURLParams, queryUrlSearchParams }
