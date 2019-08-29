import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
import ShareView from '../../Transitioner/ShareView'

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onPressItem = () => {
    const { item, navigation } = this.props
    navigation.push('DetailImage', { name: `image - ${item.id}`, item })
  }

  render() {
    const { item, screenIndex } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.onPressItem}>
          <ShareView screenIndex={screenIndex} name={`image - ${item.id}`}>
            <Image source={item.source} style={{ width: 200, height: 150 }} />
          </ShareView>
        </TouchableOpacity>
      </View>
    )
  }
}

Item.propTypes = {}

export default Item
