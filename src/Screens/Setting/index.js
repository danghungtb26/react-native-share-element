import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import Proptypes from 'prop-types'
import SharedView from '../../Navigator/Transitioner/SharedView'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { navigation } = this.props
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text> setting </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Home')}>
          <Text> setting </Text>
        </TouchableOpacity>
        <SharedView name="view" containerRouteName="Setting" keyNav={navigation.state.key}>
          {/* <View style={{ width: 200, height: 200, backgroundColor: 'yelllo' }} /> */}
          {/* <Text style={{ fontSize: 30 }}>aaaaaaa</Text> */}
          <Image
            source={require('../../../default-avatar.jpg')}
            style={{ width: 250, height: 250 }}
          />
        </SharedView>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
