export const injectRefCodeIntoError = (refCode, error) => {
  if (refCode) {
    const message = error.message
    Object.defineProperty(error, 'message', { writable: true })
    error.message = `[${String(refCode).toUpperCase()}] ${message}`
  }
}
