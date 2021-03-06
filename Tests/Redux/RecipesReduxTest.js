import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/RecipesRedux'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.recipesRequest('data'))

  t.true(state.fetching)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.recipesSuccess('hi'))

  t.is(state.payload, 'hi')
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.recipesFailure(99))

  t.false(state.fetching)
  t.true(state.error)
})
