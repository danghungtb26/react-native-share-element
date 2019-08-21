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
    console.log('home')
    const { navigation } = this.props
    console.log('TCL: Index -> render -> navigation', navigation.state.key)
    // const arr = navigation.state.key.split('-')
    // console.log('TCL: Index -> render -> navigation', navigation.push('Setting'))
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.push('Setting')}>
          <Text> textInComponent </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Setting')}>
          <View style={{ marginTop: 300 }}>
            <SharedView name="view" containerRouteName="Home" keyNav={navigation.state.key}>
              {/* <View style={{ width: 100, height: 100, backgroundColor: 'yelllo' }} /> */}
              {/* <Text style={{ fontSize: 15 }}>aaaaaaa</Text> */}
              <Image
                source={require('../../../default-avatar.jpg')}
                style={{ width: 100, height: 100 }}
              />
            </SharedView>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
