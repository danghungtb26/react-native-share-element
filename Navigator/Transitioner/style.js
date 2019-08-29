import { Animated } from 'react-native'
import { ESP } from './util'

export const test = a => {
  console.log(a)
}

export const getFontSize = element => {
  return (element.props && element.props.style.fontSize) || 12
}

export const getTypeElement = element => {
  return element.type
}

export const type = {
  text: 'Text',
  image: 'Image',
  view: 'View',
}

export const getFontSizeAnimate = shareView => {
  const { fromIndex, fromItem, toItem, animation = new Animated.Value(0) } = shareView
  if (getTypeElement(fromItem.children) === type.text) {
    const inputRange = [fromIndex, fromIndex + 1]
    const fontSize = animation.interpolate({
      inputRange,
      outputRange: [getFontSize(fromItem.children), getFontSize(toItem.children)],
      extrapolate: 'clamp',
      easing: t => t,
    })
    return { fontSize }
  }
  return { ...getSizeAnimate(shareView) }
}

export const getSizeAnimate = shareView => {
  console.log('TCL: shareView', shareView)
  const { fromIndex, fromItem, toItem, animation = new Animated.Value(0) } = shareView
  const inputRange = [fromIndex, fromIndex + 1]
  const height = animation.interpolate({
    inputRange,
    outputRange: [fromItem.measure.heightItem, toItem.measure.heightItem],
    extrapolate: 'clamp',
  })
  const width = animation.interpolate({
    inputRange,
    outputRange: [fromItem.measure.widthItem, toItem.measure.widthItem],
    extrapolate: 'clamp',
    easing: t => t,
  })
  return { width, height }
}

export const getStyle = shareView => {
  const { fromIndex, fromItem, toItem, animation = new Animated.Value(0) } = shareView
  const inputRange = [fromIndex, fromIndex + 1]
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
    inputRange: [fromIndex, fromIndex + ESP, fromIndex + 1 - ESP, fromIndex + 1],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  })
  const style = { top, left, opacity, ...getFontSizeAnimate(shareView) }
  return style
}
