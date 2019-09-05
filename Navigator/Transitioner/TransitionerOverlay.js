import React, { Component } from 'react'
import { Text, View, Animated, UIManager, StyleSheet } from 'react-native'
import _ from 'lodash'
import Proptypes from 'prop-types'
import { measureNode } from './util'
import { test, getStyle } from './style'

export const getFontSize = element => {
  return (element.props && element.props.style.fontSize) || 12
}

class TransitionerOverlay extends Component {
  constructor(props) {
    super(props)
    if (props.onComponentRef) props.onComponentRef(this)
    this.state = {
      animation: props.animation,
    }
    this.checkAnimation = true
    const { fromItem, toItem, fromIndex, animation } = props
    const opacity = animation.interpolate({
      inputRange: [fromIndex, fromIndex + 0.0001, fromIndex + 1],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    })
    fromItem.callback(opacity)
  }

  componentWillUnmount() {
    const { fromItem, onComponentRef } = this.props
    if (fromItem) fromItem.callback(1)
    if (onComponentRef) onComponentRef(null)
  }

  reSetToItem = async callback => {
    callback()
  }

  render() {
    const { fromItem, toItem } = this.props
    if (!fromItem || !toItem) return null
    const style = { position: 'absolute', right: null, bottom: null, ...getStyle(this.props) }
    const AnimatedComp = Animated.createAnimatedComponent(fromItem.children.type)
    return React.createElement(
      AnimatedComp,
      {
        ...fromItem.children.props,
        style: [fromItem.children.props.style, style],
      },
      fromItem.children.props.children
    )
  }
}

TransitionerOverlay.propTypes = {}

export default TransitionerOverlay

const styles = StyleSheet.create({
  aa: {
    // transform: [{tra}]
    position: 'absolute',
  },
})
