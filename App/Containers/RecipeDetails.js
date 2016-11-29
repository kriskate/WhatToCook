// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ListView } from 'react-native'
import styles from './Styles/RecipeDetailsStyle'
import Config from 'react-native-config'
import RecipeDetailsActions from '../Redux/RecipeDetailsRedux'

class RecipeDetails extends React.Component {
  componentWillMount () {
    this.getDetails(this.props.data)
  }
  componentWillReceiveProps (newProps){
    // this component will be reinstantiated by react-native-router-flux after a short delay, so if the user click another recipe in that timespan, the same instance will be in place, but it actually needs to change
    if(newProps.data !== this.props.data) this.getDetails(newProps.data)
    return true
  }

  getDetails (data){
    this.props.getRecipeDetails(data)
      // this is used for testing purposes
    //setTimeout(() => this.props.recipeDetailsSuccess(testState)); return
    fetch(`http://food2fork.com/api/get?key=${Config.API_KEY}&rId=${data}`)
      .then(function(response){
        return response.json()
      })
      .then((payload) => {
        this.props.recipeDetailsSuccess(payload)
      })
      .catch(function(err){
        error(err)
      })
  }

  render () {
    let { recipeDetails, fetching } = this.props
    return (
      fetching || !recipeDetails ? <View style={styles.container}/> :
      <View style={styles.container}>
        <AlertMessage title={msg} show={msg} />
        <Image
          style={styles.recipeImage}
          source={{uri: recipeDetails.image_url}}
        />
        <View>
          <Text style={styles.sectionText}>{recipeDetails.title}</Text>
        </View>

          {/*<ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Result data={rowData} getRecipeDetails={this.props.getRecipeDetails} />}
            enableEmptySections
            pageSize={15}
          />*/}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  let { fetching, error, payload, data } = state.recipeDetails
  return {
    recipeDetails: (payload && payload.recipe) ? payload.recipe : null,
    fetching, error, payload,
    recipeData: data,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRecipeDetails: (recipe_id) =>
      dispatch(RecipeDetailsActions.recipeDetailsRequest(recipe_id)),
    recipeDetailsSuccess: (payload) =>
      dispatch(RecipeDetailsActions.recipeDetailsSuccess(payload)),
    recipeDetailsFailed: (err) =>
      dispatch(RecipeDetailsActions.recipeDetailsFailure(err)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails)
