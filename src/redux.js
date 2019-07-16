import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import mainSaga from './sagas'

export const createReduxInstance = (initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  )
  const persistor = persistStore(store)
  const mainTask = sagaMiddleware.run(mainSaga)
  return {
    store,
    persistor,
    saga: {
      middleware: sagaMiddleware,
      mainTask,
    },
  }
}

const hotReplaceReducer = (reduxInstance) => {
  const newRootReducer = require('./reducers').default
  reduxInstance.store.replaceReducer(newRootReducer)
}

const hotReplaceSaga = (reduxInstance) => {
  const newMainSaga = require('./sagas').default
  reduxInstance.saga.mainTask.cancel()
  reduxInstance.saga.mainTask = reduxInstance.saga.middleware.run(newMainSaga)
}

export const configureStore = (initialState) => {
  if (module.hot) {
    const reduxInstance = window.hotRedux || createReduxInstance(initialState)
    if (window.hotRedux) {
      hotReplaceReducer(reduxInstance)
      hotReplaceSaga(reduxInstance)
    }
    module.hot.accept(() => {
      hotReplaceReducer(reduxInstance)
      hotReplaceSaga(reduxInstance)
    })
    window.hotRedux = reduxInstance
    return reduxInstance
  } else {
    return createReduxInstance(initialState)
  }
}
