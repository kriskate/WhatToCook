// @flow

import React, { PropTypes } from 'react'
import { TouchableOpacity, View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import RecipesActions from '../Redux/RecipesRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './Styles/IngredientsStyle'
import I18n from 'react-native-i18n'

class Ingredients extends React.Component {

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

  _generateData (selected) {
    let dataObjects = this.arr_ingredients.map((ingredient) => {
      return {
        ingredient, isSelected: selected ? selected.includes(ingredient) : false
      }
    })

    const rowHasChanged = (r1, r2) => r1 !== r2

    const ds = new ListView.DataSource({rowHasChanged})

    return ds.cloneWithRows(dataObjects)
  }
  componentWillReceiveProps (newProps) {
    if (newProps.selected) {
      this.setState({dataSource: this._generateData(newProps.selected)})
    }
  }

  _renderRow (rowData) {
    return (
      <TouchableOpacity style={rowData.isSelected ? styles.ingredient_selected : styles.ingredient}
      onPress={() => this.props.ingredientSelected(rowData.ingredient)}>
        <Text style={styles.boldLabel}>{rowData.ingredient}</Text>
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

const mapStateToProps = (state) => {
  return {
    selected: state.recipes.ingredients_selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ingredientSelected: (ingredient) => dispatch(RecipesActions.ingredientsSelected(ingredient))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients)
