import { injectRefCodeIntoError } from '../loggingUtils'

describe('logginUtils', () => {
  describe('injectRefCodeIntoError', () => {
    it('should upper case the ref code and prepend it', () => {
      const error = new Error('this is not an error')
      injectRefCodeIntoError('grey', error)
      expect(error.message).toBe('[GREY] this is not an error')
    })

    it('should add refCode to non-writable error', () => {
      const error = new Error('this is not an error')
      Object.defineProperty(error, 'message', { writable: false })
      injectRefCodeIntoError('grey', error)
      expect(error.message).toBe('[GREY] this is not an error')
    })

    it('should not add a refCode if empty', () => {
      const error = new Error('this is not an error')
      injectRefCodeIntoError('', error)
      expect(error.message).toBe('this is not an error')
      injectRefCodeIntoError(null, error)
      expect(error.message).toBe('this is not an error')
      injectRefCodeIntoError(undefined, error)
      expect(error.message).toBe('this is not an error')
    })
  })
})
