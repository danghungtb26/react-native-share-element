import React, { Component } from 'react'
import { Animated, UIManager, findNodeHandle } from 'react-native'
import Proptypes from 'prop-types'

class Transition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromPosition: {
        pageX: 0,
        pageY: 0,
        widthItem: 0,
        heightItem: 0,
      },
      toPosition: {
        pageX: 0,
        pageY: 0,
        widthItem: 0,
        heightItem: 0,
      },
      children: null,
      callback: () => {},
    }
  }

  shouldComponentUpdate(nextProps) {
    const { y } = this.props
    if (y !== nextProps.y) return false
    return true
  }

  measure = nativeHandle => {
    return new Promise((resolve, reject) => {
      UIManager.measureInWindow(nativeHandle, (pageX, pageY, widthItem, heightItem) => {
        resolve({ pageX, pageY, widthItem, heightItem })
      })
    })
  }

  setValue = async (item, detail, callback = () => {}) => {
    if (item) {
      const { nativeHander, children, changOpacity } = item
      this.item = item
      const { y, animation } = this.props
      const fromPosition = await this.measure(findNodeHandle(nativeHander))
      const toPosition = await this.measure(findNodeHandle(detail.nativeHander))
      this.setState(
        {
          fromPosition: {
            ...fromPosition,
            pageY: fromPosition.pageY - y,
            pageX: fromPosition.pageX,
          },
          toPosition: {
            ...toPosition,
            pageY: toPosition.pageY - y,
            pageX: toPosition.pageX,
          },
          children,
          callback,
        },
        () => {
          changOpacity(
            animation.interpolate({
              inputRange: [0, Number.EPSILON, 1],
              outputRange: [1, 0, 0],
            })
          )
        }
      )
    } else {
      this.setState({
        fromPosition: {
          pageX: 0,
          pageY: 0,
          widthItem: 0,
          heightItem: 0,
        },
        toPosition: {
          pageX: 0,
          pageY: 0,
          widthItem: 0,
          heightItem: 0,
        },
        children: null,
        callback: () => {},
      })
      this.item.changOpacity(1)
      this.item = item
    }
  }

  setValueTranistion = async (detail, callback) => {
    const toPosition = await this.measure(findNodeHandle(detail.nativeHander))
    const { y } = this.props
    this.setState(
      {
        toPosition: {
          ...toPosition,
          pageY: toPosition.pageY / 2 - y / 2,
          pageX: toPosition.pageX / 2,
        },
      },
      callback
    )
    setTimeout(() => {
      if (callback) callback()
    }, 100)
  }

  onLayout = () => {
    const { callback } = this.state
    if (callback) callback()
  }

  render() {
    // console.log(this.state)
    const { children, fromPosition, toPosition } = this.state
    const { animation } = this.props

    const opacity = animation.interpolate({
      inputRange: [0, Number.EPSILON, 1 - Number.EPSILON, 1],
      outputRange: [0, 1, 1, 0],
    })

    const tranlationXAnimated = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        fromPosition.pageX +
          fromPosition.widthItem / 2 -
          toPosition.widthItem / 2 -
          toPosition.pageX,
        toPosition.pageX,
      ],
    })
    const tranlationYAnimated = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        fromPosition.pageY +
          fromPosition.heightItem / 2 -
          toPosition.heightItem / 2 -
          toPosition.pageY,
        toPosition.pageY,
      ],
    })
    const scaleXAnimated = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [fromPosition.widthItem / toPosition.widthItem, 1],
    })
    const scaleYAnimated = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [fromPosition.heightItem / toPosition.heightItem, 1],
    })

    const animatedStyle = {
      position: 'absolute',
      right: null,
      bottom: null,
      top: toPosition.pageY,
      left: toPosition.pageX,
      width: toPosition.widthItem,
      height: toPosition.heightItem,
      backgroundColor: 'red',
      opacity,
      transform: [
        { translateX: tranlationXAnimated },
        { translateY: tranlationYAnimated },
        { scaleX: scaleXAnimated },
        { scaleY: scaleYAnimated },
      ],
    }

    if (children) {
      const AnimatedComp = Animated.createAnimatedComponent(children.type)
      return React.createElement(
        AnimatedComp,
        {
          ...children.props,
          style: [children.props.style, animatedStyle],
          onLayout: this.onLayout,
        },
        children.props.children
      )
    }
    return null
  }
}

Transition.propTypes = {}

export default Transition
