// @flow

import React, { PropTypes } from 'react'
import { TouchableOpacity, View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import RecipesActions from '../Redux/RecipesRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/IngredientsStyle'

class Ingredients extends React.Component {

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)

    this.state = {
      dataSource: this._generateData()
    }
  }

  _generateData (selected) {
    let arr_ingredients =
      'egg,sugar,salt,lettuce,onion,carrot,pepper,broccoli,cauliflower,cucumber,tomato,chicken,pork,fish,lamb,turkey,avocado,corn,parsnip,mushrooms,cabbage,chili,garlic,flour,pasta,courget,zucchini,sprouts,butter,peas,beans,lentils,chickpeas,celery,aubergine,potato,rice,couscous,buttermilk,cream,milk,spinach'.split(',').sort()

    let dataObjects = arr_ingredients.map((ingredient) => {
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
      <TouchableOpacity style={rowData.isSelected ? styles.row_selected : styles.row}
      onPress={() => this.props.ingredientSelected(rowData.ingredient)}>
        <Text style={styles.boldLabel}>{rowData.ingredient}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections
          pageSize={15}
        />
      </View>
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
