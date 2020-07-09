import {useMemo} from 'react'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'

let index

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const initializeStore = (preloadedState) => {
  let _store = index ?? initStore(preloadedState)

  if (preloadedState && index) {
    _store = initStore({
      ...index.getState(),
      ...preloadedState,
    })
    index = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!index) index = _store

  return _store
}

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
