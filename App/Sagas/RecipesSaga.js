import { call, put } from 'redux-saga/effects'
import RecipesActions from '../Redux/RecipesRedux'

export function * getRecipes (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getRecipes, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RecipesActions.recipesSuccess(response.data))
  } else {
    yield put(RecipesActions.recipesFailure())
  }
}
