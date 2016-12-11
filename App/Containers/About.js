// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { openURL } from '../Services/URL'

// Styles
import styles from './Styles/AboutStyle'

// I18n
import I18n from 'react-native-i18n'

class About extends React.Component {

  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.mainText}>Technologies used:</Text>
          {I18n.t("techsused").split('\n').map((tech, idx) =>
            (tech.trim() == "" ? null : <TouchableOpacity key={idx} onPress={() => openURL(tech.split('-')[1].trim())}><Text style={styles.text}>  ○ {tech.split('-')[0].trim()}</Text></TouchableOpacity>)
          )}
          <TouchableOpacity onPress={() => openURL(I18n.t('appGithubRepo'))}><Icon name='github' size={Metrics.icons.tiny}  style={styles.mainText}> - {I18n.t("appGithubRepo")}</Icon></TouchableOpacity>
        </KeyboardAvoidingView>
        <Text style={styles.version}>{I18n.t("appversion").replace("$v", require('../../package.json').version)}</Text>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
