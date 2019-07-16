import { createSelector } from 'reselect'
import get from 'lodash/fp/get'

export const makeSelectRequest = (stateKey) => (parentStateSelector) => () =>
  createSelector(
    parentStateSelector,
    get([stateKey]),
  )
