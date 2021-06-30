import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { userReducer } from './modules/user'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

// Creating the Redux store
const logger = createLogger()

// Applying modules (here the user module)
export const rootReducer = combineReducers({
  user: userReducer,
})

/**
 * Setup the compose enhancer:
 * - if we are in production mode, use the redux composer
 * - else, user the redux devtool composer if present
 */
let composeEnhancers
if (process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
} else {
  composeEnhancers = compose
}

export type RootState = ReturnType<typeof rootReducer>

// Configure redux middlewares depending on the NODE_ENV
const middlewares = process.env.NODE_ENV !== 'development' ? [thunk] : [thunk, logger]

// Create the store and export it
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
export default store
