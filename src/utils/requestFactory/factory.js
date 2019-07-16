import PropTypes from 'prop-types'

import { createSaga } from './saga'
import { makeSelectRequest } from './selectors'
import { createInitialState, createReducerEventHandler } from './reducer'

import {
  makeCancelRequest,
  makeStartRequest,
  makeUpdateRequestState,
} from './actions'

const configPropTypes = {
  cancelEvent: PropTypes.string.isRequired,
  requestConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  startEvent: PropTypes.string.isRequired,
  stateKey: PropTypes.string.isRequired,
  updateEvent: PropTypes.string.isRequired,
}

export const create = (config = {}) => {
  PropTypes.checkPropTypes(
    configPropTypes,
    config,
    'config option',
    'requestFactory',
  )
  return {
    reducer: {
      event: config.updateEvent,
      handler: createReducerEventHandler(config.stateKey),
      state: createInitialState(config.stateKey),
      stateKey: config.stateKey,
    },
    actions: {
      cancelRequest: makeCancelRequest(config.cancelEvent),
      startRequest: makeStartRequest(config.startEvent),
    },
    selectors: {
      createRequestSelector: makeSelectRequest(config.stateKey),
    },
    saga: {
      event: config.startEvent,
      worker: createSaga({
        requestConfig: config.requestConfig,
        updateRequestState: makeUpdateRequestState(config.updateEvent),
        cancelEvent: config.cancelEvent,
      }),
    },
  }
}
