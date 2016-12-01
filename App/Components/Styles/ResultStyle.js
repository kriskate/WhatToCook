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
    width: 160,
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.ricePaper,
    /*borderRadius: Metrics.smallMargin*/
  },
  image: {
    width: 150,
    height: 120,
    marginBottom: Metrics.smallMargin,
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
})
