// @flow

import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import styles from './Styles/ResultStyle'
import { Linking } from 'react-native'


const openURL = (url) => {
  Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
}

export default class Result extends React.Component {

  render () {
    const { f2f_url, image_url, publisher, publisher_url, recipe_id, social_rank, source_url, title } = this.props.data

    return (
      <TouchableOpacity style={styles.card} onPress={() => openURL(f2f_url)}>
        <Text style={styles.boldLabel}>{title}</Text>
        <Image
          style={{width: 150, height: 120}}
          source={{uri: image_url}}
      />
      </TouchableOpacity>
    )
  }
}

Result.propTypes = {
  data: React.PropTypes.object,
}
