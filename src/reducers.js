import { combineReducers } from 'redux'

const placeholderReducer = { Placeholder: () => ({}) }

export default combineReducers({
  ...placeholderReducer,
})
