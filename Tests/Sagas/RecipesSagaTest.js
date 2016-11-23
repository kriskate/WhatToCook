/* ***********************************************************
* Wiring Instructions
* To make this test work, you'll need to:
*  - Add a Fixture named getRecipes to the
*    ./App/Services/FixtureApi file. You can just keep adding
*    functions to that file.
*************************************************************/

import test from 'ava'
import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { getRecipes } from '../../App/Sagas/RecipesSaga'
import RecipesActions from '../../App/Redux/RecipesRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', t => {
  const step = stepper(getRecipes(FixtureAPI, {data: 'taco'}))
  // first yield is the API
  t.deepEqual(step(), call(FixtureAPI.getRecipes, 'taco'))
})

test('success path', t => {
  const response = FixtureAPI.getRecipes('taco')
  const step = stepper(getRecipes(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step successful return and data!
  t.deepEqual(step(response), put(RecipesActions.recipesSuccess(21)))
})

test('failure path', t => {
  const response = {ok: false}
  const step = stepper(getRecipes(FixtureAPI, {data: 'taco'}))
  // Step 1: hit the api
  step()
  // Second step failed response
  t.deepEqual(step(response), put(RecipesActions.recipesFailure()))
})
