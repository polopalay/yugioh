function truncate(str, n) {
  return str.length > n ? `${str.slice(0, n - 1)}...` : str
}
function isNumeric(str) {
  if (typeof str !== 'string') return false
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str))
}
function formatBase64(str = '') {
  const rs = str.replace(/^data:image\/[a-z]+;base64,/, '')
  return rs
}
function isBase64(str = '') {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
  return base64regex.test(formatBase64(str))
}
export { truncate, isNumeric, isBase64, formatBase64 }
