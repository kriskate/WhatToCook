// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

let ingredientBase = {
  width: 95,
  height: 25,
  justifyContent: 'center',
  alignItems: 'center',
  margin: Metrics.baseMargin,
},
labelBase = {
  fontWeight: 'bold',
  textAlign: 'center',
}
export default StyleSheet.create({
  ingredient: { ...ingredientBase,
    backgroundColor: Colors.silver,
    borderWidth: 1,
    borderColor: Colors.faded,
  },
  ingredient_s: { ...ingredientBase,
    backgroundColor: Colors.secondary3,
  },
  label: { ...labelBase,
    color: Colors.windowTint,
  },
  label_s: { ...labelBase,
    color: Colors.silver,
  },
  listContent: {
    paddingTop: Metrics.navBarHeight,
    padding: Metrics.smallMargin,

    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
