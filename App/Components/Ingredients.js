// @flow

import React, { PropTypes } from 'react'
import { TouchableOpacity, View, Text, ListView } from 'react-native'
import RecipesActions from '../Redux/RecipesRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './Styles/IngredientsStyle'
import I18n from 'react-native-i18n'

export default class Ingredients extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)

    this.arr_ingredients = I18n.t("ingredients").split(',').sort()
    this.state = {
      dataSource: this._generateData()
    }
  }

  _generateData (ingredients_selected) {
    let dataObjects = this.arr_ingredients.map((ingredient) => {
      return {
        ingredient, isSelected: ingredients_selected ? ingredients_selected.includes(ingredient) : false
      }
    })

    const rowHasChanged = (r1, r2) => r1 !== r2

    const ds = new ListView.DataSource({rowHasChanged})

    return ds.cloneWithRows(dataObjects)
  }
  componentWillReceiveProps (newProps) {
    if (newProps.ingredients_selected) {
      this.setState({dataSource: this._generateData(newProps.ingredients_selected)})
    }
  }

  _renderRow (rowData) {
    let { isSelected, ingredient } = rowData
    let { ingredientSelected } = this.props
    return (
      <TouchableOpacity style={isSelected ? styles.ingredient_s : styles.ingredient}
      onPress={() => ingredientSelected(ingredient)}>
        <Text style={isSelected ? styles.label_s : styles.label}>{ingredient}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <ListView
        contentContainerStyle={styles.listContent}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections
        pageSize={30}
      />
    )
  }
}
