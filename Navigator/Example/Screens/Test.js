import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Proptypes from 'prop-types'
import ShareView from '../../Transitioner/ShareView'

const { width, height } = Dimensions.get('window')

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <ShareView screenIndex={screenIndex} name={name}> */}
        <Image source={item.source} style={{ width, height: 200 }} />
        {/* </ShareView> */}
        <Text>close</Text>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
