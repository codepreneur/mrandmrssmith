import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'

const defaultSettings = {
  tokenSelector: null,
  baseUrlSelector: null,
}

const setFunctionValue = (key) => (value) => {
  const canBeSet = isFunction(value) && isString(key) && key
  if (canBeSet) {
    defaultSettings[key] = value
  }
  return canBeSet
}

export const getTokenSelector = () => defaultSettings.tokenSelector

export const getBaseUrlSelector = () => defaultSettings.baseUrlSelector

export const setTokenSelector = () => setFunctionValue('tokenSelector')

export const setBaseUrlSelector = () => setFunctionValue('baseUrlSelector')
