// @flow

import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import styles from './Styles/ResultStyle'

export default class Result extends React.Component {
  _handlePress (recipe_id) {
    //openURL(f2f_url)
    this.props.getRecipeDetails(recipe_id)
  }
  render () {
    const { f2f_url, image_url, publisher, publisher_url, recipe_id, social_rank, source_url, title } = this.props.data

    return (
      <TouchableOpacity style={styles.card} onPress={() => this._handlePress(recipe_id)}>
        <Text style={styles.boldLabel}>{title}</Text>
        <Image
          style={styles.image}
          source={{uri: image_url}}
      />
      </TouchableOpacity>
    )
  }
}

Result.propTypes = {
  data: React.PropTypes.object,
}
