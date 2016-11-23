import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  recipesRequest: ['data'],
  recipesSuccess: ['payload'],
  recipesFailure: ['error'],

  ingredientsSelected: ['ingredient'],
  ingredientsExcluded: ['ingredient'],
})

export const RecipesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,

  ingredients_selected: [],
  ingredients_excluded: [],
})

/* ------------- Reducers ------------- */

export const selected = (state, { ingredient }) => {
  let arr = state.ingredients_selected
  if(arr.includes(ingredient))
    return state.merge({ ingredients_selected:
      [
       ...arr.slice(0, arr.indexOf(ingredient)),
       ...arr.slice(arr.indexOf(ingredient) + 1)
      ]
    })

  return state.merge({ ingredients_selected:
     [...arr, ingredient]
   })
}

export const excluded = (state, { ingredients_excluded }) =>
  state.merge({ ingredients_excluded })

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, action) =>
  state.merge({ fetching: false, error: action.error, payload: null })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECIPES_REQUEST]: request,
  [Types.RECIPES_SUCCESS]: success,
  [Types.RECIPES_FAILURE]: failure,

  [Types.INGREDIENTS_SELECTED]: selected,
  [Types.INGREDIENTS_EXCLUDED]: excluded,
})
