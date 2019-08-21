import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
import ShareView from '../../Transitioner/ShareView'

class Screen2 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  nextSceen = () => {
    const { navigation } = this.props
    navigation.push('Screen1')
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render() {
    const { screenIndex } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity activeOpacity={1} onPress={this.goBack}>
          <ShareView name="back" screenIndex={screenIndex}>
            <Text style={{ marginBottom: 200, fontSize: 15 }}> back </Text>
          </ShareView>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={this.nextSceen}>
          <ShareView name="text" screenIndex={screenIndex}>
            <Text style={{ fontSize: 30 }}> Screen1 </Text>
          </ShareView>
        </TouchableOpacity>
      </View>
    )
  }
}

Screen2.propTypes = {}

export default Screen2
