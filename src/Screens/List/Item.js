import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Proptypes from 'prop-types'
import { ShareView } from '../../Components/Animation/List'

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { item } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
        <ShareView name="image" screen="list" idItem={item.id}>
          <Image source={item.source} style={{ width: 100, height: 100 }} />
        </ShareView>
      </View>
    )
  }
}

Item.propTypes = {}

export default Item
