// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  findContainer: {
    backgroundColor: Colors.windowTint,
  },
  text: {
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
    color: Colors.snow,
  }
})
