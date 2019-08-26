import React, { Component } from 'react'
import { Text, View, Animated, UIManager, StyleSheet } from 'react-native'
import _ from 'lodash'
import Proptypes from 'prop-types'
import { measureNode } from './util'

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
    // const { toItem } = this.state
    // const { nodeHandle } = toItem
    // const measure = await measureNode(nodeHandle)
    // // console.log("TCL: TransitionerOverlay -> measure", measure)
    // this.setState({ toItem: { ...toItem, measure } }, callback)
    callback()
  }

  render() {
    const { animation } = this.state
    const { fromItem, fromIndex, toItem } = this.props
    if (!fromItem || !toItem) return null
    const inputRange = [fromIndex, fromIndex + 1]
    const fontSize = animation.interpolate({
      inputRange,
      outputRange: [getFontSize(fromItem.children), getFontSize(toItem.children)],
      extrapolate: 'clamp',
      easing: t => t,
    })
    const left = animation.interpolate({
      inputRange,
      outputRange: [fromItem.measure.pageX, toItem.measure.pageX],
      extrapolate: 'clamp',
    })
    const top = animation.interpolate({
      inputRange,
      outputRange: [fromItem.measure.pageY, toItem.measure.pageY],
      extrapolate: 'clamp',
    })
    const opacity = animation.interpolate({
      inputRange: [
        fromIndex,
        fromIndex + Number.EPSILON,
        fromIndex + 1 - Number.EPSILON,
        fromIndex + 1,
      ],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    })
    const style = { fontSize, position: 'absolute', right: null, bottom: null, top, left, opacity }
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
