import React, { Component } from 'react'
import { Text, View, TouchableOpacity, findNodeHandle, ScrollView } from 'react-native'
import Proptypes from 'prop-types'
import ShareView from '../../Transitioner/ShareView'
import { measureNode } from '../../Transitioner/util'

class Screen1 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  nextSceen = () => {
    const { navigation } = this.props
    navigation.push('Screen2')
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render() {
    const { screenIndex } = this.props
    return (
      <ScrollView>
        <View style={{ width: '100%', height: 700 }} />
        <TouchableOpacity activeOpacity={1} onPress={this.goBack}>
          <ShareView name="back" screenIndex={screenIndex}>
            <Text style={{ marginBottom: 200, fontSize: 30 }}> back </Text>
          </ShareView>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={this.nextSceen}>
          <ShareView name="text" screenIndex={screenIndex}>
            <Text style={{ fontSize: 14 }}> Screen1 </Text>
          </ShareView>
        </TouchableOpacity>
        <View style={{ width: '100%', height: 100 }} />
      </ScrollView>
    )
  }
}

Screen1.propTypes = {}

export default Screen1
