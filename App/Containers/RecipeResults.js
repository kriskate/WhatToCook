// @flow

import React, { PropTypes } from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import RecipesActions from '../Redux/RecipesRedux'
import RecipeDetailsActions from '../Redux/RecipeDetailsRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Config from 'react-native-config'

import Result from '../Components/Result'
import AlertMessage from '../Components/AlertMessage'
import { openURL } from '../Services/URL'

// Styles
import styles from './Styles/RecipeResultsStyle'

const MSG_ERROR = 'An error occured while trying to retrieve the recipe. Please try again later',
      MSG_RETRIEVING = 'Retrieving recipes. Please wait',
      MSG_NORECIPES = `No recipes found for the selected ingredients
      
      try deselecting a few`

class RecipeResults extends React.Component {

  state: {
    dataSource: Object
  }

  constructor(props){
    super(props)

    const { fetched, error } = this.props
    fetch(`http://food2fork.com/api/search?key=${Config.API_KEY}&q=` + this.props.ingredients_selected.join(','))
      .then(function(response){
        return response.text()
      })
      .then((text) => {
        fetched(JSON.parse(text))
      })
      .catch(function(err){
        error(err)
      })
  }
  componentWillReceiveProps (newProps) {
    if(!newProps.fetching && newProps.recipes){
      let dataObjects = newProps.recipes

      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})

      this.setState({
        dataSource: ds.cloneWithRows(dataObjects)
      })
    }
  }


  _checkData () {
    if(this.props.isError){ return MSG_ERROR }
    if(this.state){
      if(this.state.dataSource.getRowCount() === 0){ return MSG_NORECIPES }
      else{ return null }
    } else{ return MSG_RETRIEVING }
  }

  render () {
    let msg = this._checkData()

    return (
      <View style={styles.mainContainer}>
        <AlertMessage title={msg} show={msg} />
        {
        this.props.isError || this.props.fetching || !this.state || !this.state.dataSource ? null :
          <View>
            <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Result data={rowData} getRecipeDetails={this.props.getRecipeDetails} />}
              enableEmptySections
              pageSize={30}
            />
          </View>
        }
        <Text style={styles.watermark} onPress={() => openURL("http://food2fork.com")}>Powered By Food2Fork.com</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.payload && state.recipes.payload.recipes ? state.recipes.payload.recipes : null,
    fetching: state.recipes.fetching,
    isError: state.recipes.error,

    ingredients_selected: state.recipes.ingredients_selected.asMutable(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetch is handled in Main.js
    fetched: (payload) => dispatch(RecipesActions.recipesSuccess(payload)),
    error: (payload) => dispatch(RecipesActions.recipesFailure(payload)),

    getRecipeDetails: (recipe_id) => {
      NavigationActions.recipeDetails(recipe_id)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeResults)
