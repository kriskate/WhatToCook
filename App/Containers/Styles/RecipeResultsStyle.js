// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 2,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.panther,
    textAlign: 'left',
    marginLeft: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin
  },
  label: {
    marginLeft: Metrics.baseMargin,
    color: Colors.windowTint,
    textAlign: 'left'
  },
  listContent: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  watermark:{
    color: Colors.cloud,
    textAlign: "right",
    fontSize: 10,
  },
})
