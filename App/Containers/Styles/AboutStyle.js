// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  mainText: {
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.baseMargin,
    color: Colors.panther,
  },
  text: {
    marginHorizontal: Metrics.baseMargin,
    color: Colors.panther,
    fontWeight: "bold",
  },
  version: {
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.baseMargin,
  }
})
