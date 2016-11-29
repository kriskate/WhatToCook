import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Config from 'react-native-config'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  recipeDetailsRequest: ['data'],
  recipeDetailsSuccess: ['payload'],
  recipeDetailsFailure: null
})

export const RecipeDetailsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload })

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECIPE_DETAILS_REQUEST]: request,
  [Types.RECIPE_DETAILS_SUCCESS]: success,
  [Types.RECIPE_DETAILS_FAILURE]: failure
})


/* to-do: delete these when not needed anymore
let testState = {
  f2f_url:"http://food2fork.com/view/47024",
  image_url:"http://static.food2fork.com/icedcoffee5766.jpg",
  ingredients:["my ingredient","1 pound Ground Coffee (good, Rich Roast)","8 quarts Cold Water","Half-and-half (healthy Splash Per Serving)","Sweetened Condensed Milk (2-3 Tablespoons Per Serving)","Note: Can Use Skim Milk, 2% Milk, Whole Milk, Sugar, Artificial Sweeteners, Syrups...adapt To Your Liking!"],
  publisher:"The Pioneer Woman",
  publisher_url:"http://thepioneerwoman.com",
  recipe_id:"47024",
  social_rank:100,
  source_url:"http://thepioneerwoman.com/cooking/2011/06/perfect-iced-coffee/",
  title: "Perfect Iced Coffee",
}
*/
