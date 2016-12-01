// @flow

import Config from 'react-native-config'
import React from 'react'
import { connect } from 'react-redux'

import { ScrollView, View, Text, Image, ListView } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import AlertMessage from '../Components/AlertMessage'
import styles from './Styles/RecipeDetailsStyle'
import RecipeDetailsActions from '../Redux/RecipeDetailsRedux'
import I18n from 'react-native-i18n'

import { openURL } from '../Services/URL'


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
    //console.log(recipeDetails.ingredients)
    return (
      <View style={styles.container}>
        <AlertMessage title={MSG} show={MSG} />
        {
          !recipeDetails || MSG ? null :
        <ScrollView>
          <Image
            style={styles.recipeImage}
            source={{uri: recipeDetails.image_url}}
          />
          <View>
            <Text style={styles.sectionText}>{recipeDetails.title}</Text>
          </View>
          {recipeDetails.ingredients.map((ingredient, idx) =>
            <Text style={styles.contentText} key={idx}>{ingredient}</Text>
          )}
            {/*<ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text>{rowData}</Text>}
              enableEmptySections
              pageSize={15}
            />*/}
          <RoundedButton  onPress={() => openURL(recipeDetails.source_url)}>
            {I18n.t("recipeOriginal")}
          </RoundedButton>
        </ScrollView>
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
