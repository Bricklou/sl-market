import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { userReducer } from './modules/user'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const logger = createLogger()

export const rootReducer = combineReducers({
  user: userReducer,
})

let composeEnhancers
if (process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
} else {
  composeEnhancers = compose
}

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)))

export default store
