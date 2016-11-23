// @flow

import React, { PropTypes } from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import RecipesActions from '../Redux/RecipesRedux'

import Result from '../Components/Result'

// import { Actions as NavigationActions } from 'react-native-router-flux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/RecipeResultsStyle'

const MSG_ERROR = 'An error occured while trying to retrieve the recipe. Please try again later',
      MSG_RETRIEVING = 'Retrieving recipes. Please wait',
      MSG_NORECIPES = 'No recipes found for the selected ingredients'

class RecipeResults extends React.Component {

  state: {
    dataSource: Object
  }

  constructor(props){
    super(props)

    const { fetched, error } = this.props

    const dev_key = '5b17915c779541a046758363a174ce36'
    fetch(`http://food2fork.com/api/search?key=${dev_key}&q=` + this.props.ingredients_selected.join(','))
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

  _renderRow (rowData) {
    return ( <Result data={rowData} /> )
  }


  _checkData () {
      if(this.state){
        if(this.props.isError){ return MSG_ERROR } if(this.state.dataSource.getRowCount() === 0){ return MSG_NORECIPES }
        else{ return null }
      } else{ return MSG_RETRIEVING }
  }
  
  render () {
    let msg = this._checkData()
    return (
      <View style={styles.container}>
        <AlertMessage title={msg} show={msg} />
        {
        this.props.isError || this.props.fetching || !this.state || !this.state.dataSource ? null :
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections
            pageSize={15}
          />
        }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeResults)
