// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    recipes: require('./RecipesRedux').reducer,
  //  temperature: require('./TemperatureRedux').reducer,
    //login: require('./LoginRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
