import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import game from './modules/game'

export default combineReducers({
  game,
  reduxAsyncConnect,
  routing: routerReducer
})
