import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Proptypes from 'prop-types'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
