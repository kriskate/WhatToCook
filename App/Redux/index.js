// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    recipes: require('./RecipesRedux').reducer,
    recipeDetails: require('./RecipeDetailsRedux').reducer,
    //login: require('./LoginRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
