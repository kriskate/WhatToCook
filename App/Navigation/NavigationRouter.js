// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Components/CustomNavBar'

// screens identified by the router
import Main from '../Containers/Main'
import About from '../Containers/About'
import RecipeResults from '../Containers/RecipeResults'
import RecipeDetails from '../Containers/RecipeDetails'
import LoginScreen from '../Containers/LoginScreen'

import I18n from 'react-native-i18n'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
          <Scene initial key='main' component={Main} title={I18n.t('whattocook')} navigationBarStyle={Styles.navBar} renderLeftButton={NavItems.hamburgerButton} />
          <Scene key='recipeResults' component={RecipeResults} title={I18n.t('recipeResults')} />
          <Scene key='recipeDetails' component={RecipeDetails} title={I18n.t('recipeDetails')} />

          <Scene key='about' component={About} title={I18n.t('About')} />

          {/* title='Device Info' navBar={CustomNavBar} />*/}
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
