// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  ingredient: {
    width: 95,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.bloodOrange,
  },
  ingredient_selected: {
    width: 95,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center'
  },
  listContent: {
    padding: Metrics.smallMargin,
    paddingTop: Metrics.navBarHeight,
    backgroundColor: Colors.panther,

    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
