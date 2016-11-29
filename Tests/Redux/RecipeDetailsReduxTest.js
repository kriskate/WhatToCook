import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/RecipeDetailsRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.recipeDetailsRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.recipeDetailsSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.recipeDetailsFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
