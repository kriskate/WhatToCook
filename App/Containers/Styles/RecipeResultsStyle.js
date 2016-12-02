// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

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
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  watermark:{
    position: 'absolute',
    bottom: 0,
    right: 0,

    color: Colors.charcoal,
    textAlign: "right",
    fontSize: Fonts.size.small,
  },
})
