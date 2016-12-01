// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },

  row: {
    flex: 1,
    backgroundColor: Colors.ricePaper,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    justifyContent: 'center',
  },


  card: {
    width: Metrics.screenWidth/2 - Metrics.smallMargin*1.5,
    height: 180,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Metrics.smallMargin*2,
    marginLeft: Metrics.smallMargin,
    backgroundColor: Colors.silver,
  },
  image: {
    width: Metrics.screenWidth/2 - Metrics.smallMargin*1.5,
    height: 155,
  },

  boldLabel: {
    alignSelf: 'flex-start',
    color: Colors.panther,
    textAlign: 'left',
    margin: Metrics.smallMargin,
  },
  label: {
    marginLeft: Metrics.baseMargin,
    color: Colors.windowTint,
    textAlign: 'left'
  },
})
