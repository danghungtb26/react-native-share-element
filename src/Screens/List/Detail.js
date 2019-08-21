import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
import { ShareView } from '../../Components/Animation/List'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { item, onClose } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <ShareView name="image" screen="detail">
          <Image source={item.source} style={{ width: 375, height: 200 }} />
        </ShareView>
        <TouchableOpacity onPress={onClose}>
          <Text>close</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
