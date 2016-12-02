// @flow

import React from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import styles from './Styles/ResultStyle'

export default class Result extends React.Component {
  render () {
    const { f2f_url, image_url, publisher, publisher_url, recipe_id, social_rank, source_url, title } = this.props.data
    const { getRecipeDetails } = this.props
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => getRecipeDetails(recipe_id)}>
          <Text style={styles.title}>{title}</Text>
          <Image style={styles.image} source={{uri: image_url}} />
        </TouchableOpacity>
      </View>
    )
  }
}

Result.propTypes = {
  data: React.PropTypes.object,
}
