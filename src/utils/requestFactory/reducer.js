import set from 'lodash/fp/set'

import { REQUEST_STORE_DEFAULTS } from './constants'

export const createInitialState = (keyName) => ({
  [keyName]: { ...REQUEST_STORE_DEFAULTS },
})

export const createReducerEventHandler = (keyName) => (state, action) =>
  set([keyName], { state: action.state, details: action.details }, state)
