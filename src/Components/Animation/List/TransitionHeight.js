import React, { Component } from 'react'
import { Animated, UIManager, findNodeHandle, View } from 'react-native'
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
      childrenPre: null,
      childrenNext: null,
      callback: () => {},
    }
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
      const { animation } = this.props
      this.item = item
      const fromPosition = await this.measure(findNodeHandle(nativeHander))
      const toPosition = await this.measure(findNodeHandle(detail.nativeHander))
      this.setState(
        {
          fromPosition,
          toPosition,
          childrenPre: children,
          callback,
          childrenNext: detail.children,
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
        childrenPre: null,
        childrenNext: null,
        callback: () => {},
      })
      this.item.changOpacity(1)
      this.item = item
      this.layout = false
    }
  }

  setValueTranistion = async (detail, callback) => {
    const toPosition = await this.measure(findNodeHandle(detail.nativeHander))
    this.setState(
      { toPosition: { ...toPosition, pageY: toPosition.pageY, pageX: toPosition.pageX } },
      callback
    )
    setTimeout(() => {
      callback()
    }, 100)
  }

  onLayout = () => {
    if (!this.layout) {
      this.layout = true
      const { callback } = this.state
      callback()
    }
  }

  render() {
    // console.log(this.state)
    const { childrenPre, fromPosition, toPosition, childrenNext } = this.state
    const { animation } = this.props

    const opacityPre = animation.interpolate({
      inputRange: [0, Number.EPSILON, 0.5 - Number.EPSILON, 0.5, 1],
      outputRange: [0, 1, 0.5, 0.3, 0],
    })
    const opacityNext = animation.interpolate({
      inputRange: [0, 0.5, 0.5 + Number.EPSILON, 1 - Number.EPSILON, 1],
      outputRange: [0, 0.3, 0.5, 1, 0],
    })

    const tranlationXAnimated = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [fromPosition.pageX, toPosition.pageX],
    })
    const tranlationYAnimated = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [fromPosition.pageY, toPosition.pageY],
    })
    // const scaleXAnimated = animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [fromPosition.widthItem / toPosition.widthItem, 1],
    // })
    // const scaleYAnimated = animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [fromPosition.heightItem / toPosition.heightItem, 1],
    // })

    const heightAnimated = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [fromPosition.heightItem, toPosition.heightItem],
      extrapolate: 'clamp',
    })
    // console.log('TCL: render -> heightAnimated', heightAnimated)

    const animatedStyle = {
      position: 'absolute',
      right: null,
      bottom: null,
      top: tranlationYAnimated,
      left: toPosition.pageX,
      width: toPosition.widthItem,
      height: heightAnimated,
      // backgroundColor: 'red',
      opacity: opacityPre,
    }

    if (childrenPre) {
      const AnimatedComp = Animated.createAnimatedComponent(childrenPre.type)
      const ViewPre = React.createElement(
        AnimatedComp,
        {
          ...childrenPre.props,
          style: [childrenPre.props.style, animatedStyle, { alignItems: 'center' }],
          onLayout: this.onLayout,
          collapsable: false,
        },
        childrenPre.props.children
      )
      const ViewNext = React.createElement(
        AnimatedComp,
        {
          ...childrenNext.props,
          style: [childrenNext.props.style, animatedStyle, { opacity: opacityNext }],
          onLayout: this.onLayout,
          collapsable: false,
        },
        childrenNext.props.children
      )
      return (
        <View
          style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
          collapsable={false}
        >
          {ViewPre}
          {ViewNext}
        </View>
      )
    }
    return null
  }
}

Transition.propTypes = {}

export default Transition
