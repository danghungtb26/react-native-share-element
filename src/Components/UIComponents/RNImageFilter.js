import React, { Component } from 'react'
import { Text, View, requireNativeComponent } from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import Proptypes from 'prop-types'

class RNImageFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { source, style } = this.props
    console.log('TCL: RNImageFilter -> render -> style', style)
    const sourcea = resolveAssetSource(source) || {}
    let uri = sourcea.uri || ''
    console.log('TCL: RNImageFilter -> render -> uri', uri)
    if (uri && uri.match(/^\//)) {
      uri = `file://${uri}`
    }
    return (
      <ImageFilter
        {...this.props}
        source={{ uri }}
        filter={{ name: 'CIPhotoEffectInstant' }}
        circle={(style && style.borderRadius) || 10}
      />
    )
  }
}

RNImageFilter.propTypes = {
  source: Proptypes.object,
}

const ImageFilter = requireNativeComponent('RNImageFilter', RNImageFilter)

export default RNImageFilter
