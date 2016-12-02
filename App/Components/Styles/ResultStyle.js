// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'


let cardSize = Metrics.screenWidth/2 - Metrics.smallMargin*1.5
export default {
  cardSize: {height:cardSize},
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
    width: cardSize,
    height: cardSize,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    //marginLeft: Metrics.smallMargin,
    backgroundColor: Colors.silver,
    borderWidth: 1,
    borderColor: Colors.secondary1,
  },
  cardContent: {
    width: cardSize - 2,
    height: cardSize - 2,
  },
  image: {
    width: cardSize - 2,
    height: cardSize - 2 - Metrics.smallMargin*2, /* adjusted in Result.js */
  },

  title: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    margin: Metrics.smallMargin,
    color: Colors.panther,
  },
  label: {
    marginLeft: Metrics.baseMargin,
    color: Colors.windowTint,
    textAlign: 'left'
  },
}
