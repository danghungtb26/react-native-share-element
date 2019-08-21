import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'
import Proptypes from 'prop-types'

class TransitionOverLay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getSharedElementStyle = (props, prevProps, itemFrom, itemTo) => {
    const { position, progress } = props

    const x = Math.min(props.index, prevProps.index)
    const y = Math.max(props.index, prevProps.index)
    const inputRange = [x, y]

    const getElementType = item => {
      const { type } = item.reactElement
      return type && (type.displayName || type.name)
    }
    const animateWidthHeight = (itemFrom, itemTo) => {
      const width = position.interpolate({
        inputRange,
        outputRange:
          props.index > prevProps.index
            ? [itemFrom.metrics.width, itemTo.metrics.width]
            : [itemTo.metrics.width, itemFrom.metrics.width],
      })
      const height = position.interpolate({
        inputRange,
        outputRange:
          props.index > prevProps.index
            ? [itemFrom.metrics.height, itemTo.metrics.height]
            : [itemTo.metrics.height, itemFrom.metrics.height],
      })
      return { width, height }
    }

    const animateScale = (itemFrom, itemTo) => {
      const toVsFromScaleX = itemTo.scaleRelativeTo(itemFrom).x
      const toVsFromScaleY = itemTo.scaleRelativeTo(itemFrom).y
      // using progress is actually much simpler than position in previous implementation.
      const scaleX = position.interpolate({
        inputRange,
        outputRange: [1, toVsFromScaleX],
      })
      const scaleY = position.interpolate({
        inputRange,
        outputRange: [1, toVsFromScaleY],
      })
      const left = position.interpolate({
        inputRange,
        outputRange: [
          itemFrom.metrics.x,
          itemTo.metrics.x + (itemFrom.metrics.width / 2) * (toVsFromScaleX - 1),
        ],
      })
      const top = position.interpolate({
        inputRange,
        outputRange: [
          itemFrom.metrics.y,
          itemTo.metrics.y + (itemFrom.metrics.height / 2) * (toVsFromScaleY - 1),
        ],
      })
      return {
        left,
        top,
        transform: [{ scaleX }, { scaleY }],
      }
    }

    const animateFontSize = (itemFrom, itemTo) => {
      // This requires the shared Text to have a "fontSize" prop that is the same as the style.
      const getFontSize = element => (element.props && element.props.style.fontSize) || 12
      return {
        fontSize: position.interpolate({
          inputRange,
          outputRange: [getFontSize(itemFrom.reactElement), getFontSize(itemTo.reactElement)],
        }),
      }
    }

    const elementType = getElementType(itemFrom)
    let style
    switch (elementType) {
      case 'Image':
        style = animateWidthHeight(itemFrom, itemTo)
        break
      case 'Text':
        style = {
          ...animateWidthHeight(itemFrom, itemTo),
          ...animateFontSize(itemFrom, itemTo),
        }
        break
      default:
        style = animateScale(itemFrom, itemTo)
    }

    const left = position.interpolate({
      inputRange,
      outputRange:
        props.index > prevProps.index
          ? [itemFrom.metrics.x, itemTo.metrics.x]
          : [itemFrom.metrics.x, itemTo.metrics.x].reverse(),
    })
    const top = position.interpolate({
      inputRange,
      outputRange:
        props.index > prevProps.index
          ? [itemFrom.metrics.y, itemTo.metrics.y]
          : [itemFrom.metrics.y, itemTo.metrics.y].reverse(),
    })

    return {
      // elevation: this.interpolateElevation(props, prevProps, 1), // make sure shared elements stay above the faked container
      position: 'absolute',
      left,
      top,
      right: null,
      bottom: null,
      ...style,
    }
  }

  render() {
    const { prevProps, props, sharedItems } = this.props
    const fromRoute = prevProps ? prevProps.scene.route.routeName : 'unknownRoute'
    const fromIndex = prevProps ? prevProps.index : -1
    console.log('TCL: TransitionOverLay -> render -> fromRoute', fromRoute)
    const toRoute = props.scene.route.routeName
    const toIndex = props.index
    const pairs = sharedItems.getMeasuredItemPairs(fromRoute, toRoute)
    console.log('TCL: TransitionOverLay -> render -> pairs', pairs)
    const sharedElements = pairs.map((pair, idx) => {
      const { fromItem, toItem } = pair
      if (fromIndex === fromItem.index && toIndex === toItem.index) {
        const animatedStyle = this.getSharedElementStyle(props, prevProps, fromItem, toItem)
        const element = fromItem.reactElement
        const AnimatedComp = Animated.createAnimatedComponent(element.type)
        return React.createElement(
          AnimatedComp,
          { ...element.props, style: [element.props.style, animatedStyle], key: idx },
          element.props.children
        )
      }
      return null
    })
    // const containerStyle = this.getOverlayContainerStyle(props.position, props.index)

    return (
      // <Animated.View style={[styles.overlay, this.props.style]}>
      //   {this.renderFakedSEContainer(pairs, props, prevProps)}
      <View style={{ position: 'absolute', top: 0 }}>{sharedElements}</View>
      // </Animated.View>
    )
  }
}

TransitionOverLay.propTypes = {}

export default TransitionOverLay
