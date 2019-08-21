import React, { Component } from 'react'
import { Text, View, requireNativeComponent } from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import Proptypes from 'prop-types'

class ReView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <RNReView {...this.props} />
  }
}

ReView.propTypes = {
  source: Proptypes.object,
}

const RNReView = requireNativeComponent('RNReNew', ReView)

export default ReView
