import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => this.props.navigation.push('List')}>
          <Text> textInComponent </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
