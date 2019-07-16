export const makeUpdateRequestState = (type) => (state, details = null) => ({
  type,
  state,
  details,
})

export const makeStartRequest = (type) => (payload) => ({
  type,
  payload,
})

export const makeCancelRequest = (type) => () => ({ type })
