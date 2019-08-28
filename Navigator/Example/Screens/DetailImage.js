import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Proptypes from 'prop-types'
import ShareView from '../../Transitioner/ShareView'

class Index extends Component {
  constructor(props) {
    super(props)
    const name = props.navigation.getParam('name', '')
    const item = props.navigation.getParam('item', {})
    this.state = {
      name,
      item,
    }
  }

  render() {
    const { name, item } = this.state
    const { screenIndex } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ShareView screenIndex={screenIndex} name={name}>
          <Image source={item.source} style={{ width: 357, height: 200 }} />
        </ShareView>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
