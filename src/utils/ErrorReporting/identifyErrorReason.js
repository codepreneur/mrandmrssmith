import { UnrecognizedCaseError, ReduxActionError } from './errorTypes'

import { APP_RUNTIME_ERROR } from './referenceCodes'

const map = [
  [UnrecognizedCaseError, APP_RUNTIME_ERROR],
  [ReduxActionError, APP_RUNTIME_ERROR],
]

export const identify = (error) => {
  const found = map.find(([ErrorType]) => error instanceof ErrorType)
  return found ? found[1] : undefined
}
