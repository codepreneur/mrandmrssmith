import { call, cancelled, put, race, select, take } from 'redux-saga/effects'
import axios, { CancelToken } from 'axios'

import isFunction from 'lodash/isFunction'
import mergeAll from 'lodash/fp/mergeAll'

import { getTokenSelector, getBaseUrlSelector } from './defaults'
import { LOADING, READY, ERROR, CANCELLED } from './constants'

export const createSaga = ({
  cancelEvent,
  requestConfig,
  updateRequestState,
}) => {
  return function* request(action) {
    const source = CancelToken.source()
    const baseUrlSelector = getBaseUrlSelector()
    const tokenSelector = getTokenSelector()

    const defaultConfig = {}
    const internalConfig = { cancelToken: source.token }
    const customConfig = isFunction(requestConfig)
      ? requestConfig(action.payload)
      : requestConfig

    if (baseUrlSelector) {
      const baseURL = yield select(baseUrlSelector)
      defaultConfig.baseURL = baseURL
    }

    if (tokenSelector) {
      const token = yield select(tokenSelector)
      defaultConfig.headers = { Authorization: `BEARER ${token}` }
    }

    try {
      const requestFinalConfig = mergeAll([
        defaultConfig,
        customConfig,
        internalConfig,
      ])

      yield put(updateRequestState(LOADING, { config: customConfig }))

      const { request } = yield race({
        request: call(axios.request, requestFinalConfig),
        cancel: take(cancelEvent),
      })

      if (request) {
        yield put(updateRequestState(READY, request))
      } else {
        source.cancel()
        yield put(updateRequestState(CANCELLED, { config: customConfig }))
      }
    } catch (error) {
      yield put(updateRequestState(ERROR, error))
    } finally {
      if (yield cancelled()) {
        source.cancel()
      }
    }
  }
}
