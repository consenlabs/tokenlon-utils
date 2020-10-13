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
export { padLeft, compareSemver }
