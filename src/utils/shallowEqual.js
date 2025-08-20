const isPlainObject = (o) => {
  if (o === null || typeof o !== 'object') return false
  const proto = Object.getPrototypeOf(o)
  return proto === Object.prototype || proto === null
}

export const shallowEqual = (a, b) => {
  if (a === b) return true
  if (a == null || b == null) return false

  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; ++i) if (a[i] !== b[i]) return false
    return true
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (aKeys.length !== bKeys.length) return false
    for (const k of aKeys) if (!Object.prototype.hasOwnProperty.call(b, k) || a[k] !== b[k]) return false
    return true
  }

  return false
}
