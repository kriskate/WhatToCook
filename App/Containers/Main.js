// @flow

import React from 'react'
import { Images } from '../Themes'
import { ScrollView, Text, Image, View, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RecipesActions from '../Redux/RecipesRedux'

import styles from './Styles/MainStyle'

import I18n from 'react-native-i18n'

import Ingredients from './Ingredients'

class Main extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />


        <Ingredients/>

                <View>
                  <Text style={styles.subtitle}>
                    Select the ingredients you want to use, then
                  </Text>
                </View>
        <RoundedButton  onPress={this.props.findRecipes}>
          Find recipes
        </RoundedButton>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findRecipes: () => {
      dispatch(RecipesActions.recipesRequest(null))
      NavigationActions.recipeResults()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
