// @flow

import Config from 'react-native-config'
import React from 'react'
import { connect } from 'react-redux'

import { View, Text, Image, ListView } from 'react-native'
import AlertMessage from '../Components/AlertMessage'
import styles from './Styles/RecipeDetailsStyle'
import RecipeDetailsActions from '../Redux/RecipeDetailsRedux'
import I18n from 'react-native-i18n'


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
    let { recipeDetails, error, fetching, MSG } = this.props
    return (
      <View style={styles.container}>
        <AlertMessage title={MSG} show={MSG} />
        {
          !recipeDetails || MSG ? null :
        <View>
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
        }
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  let { fetching, error, payload, data } = state.recipeDetails
  let MSG = fetching ? I18n.t("fetching") : ""
      MSG = error ? I18n.t("errorFetching") : ""
  return {
    MSG,
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
