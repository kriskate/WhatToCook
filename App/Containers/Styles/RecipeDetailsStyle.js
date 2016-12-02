// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    color: Colors.panther,
    marginVertical: Metrics.baseMargin,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  contentTitle: {
    fontWeight: 'bold',
    color: Colors.coal,
    textAlign: 'left',
    padding: Metrics.smallMargin,
  },

  bordered:{
    margin: Metrics.smallMargin,
    borderWidth: 1,
    borderColor: Colors.secondary1,
  },

  recipeImage: {
    height:300,
  },
})
