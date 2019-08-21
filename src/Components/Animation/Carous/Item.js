import React, { Component } from 'react'
import { Text, View, Dimensions, Animated } from 'react-native'
import Proptypes from 'prop-types'

const { width, height } = Dimensions.get('window')

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.animation = new Animated.Value(0)
  }

  render() {
    const { showView, animation, item } = this.props

    const scale = animation.interpolate({
      inputRange: [(showView - 1) * width, showView * width, (showView + 1) * width],
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    })

    const opacity = animation.interpolate({
      inputRange: [(showView - 1) * width, showView * width, (showView + 1) * width],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    })

    const style = { transform: [{ scale }], opacity }

    return (
      <Animated.View
        style={[
          {
            width,
            height,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#24912a',
          },
          style,
        ]}
      >
        <Text style={{}}> textInComponent  a{item} </Text>
      </Animated.View>
    )
  }
}

Item.propTypes = {
  item: Proptypes.any,
  showView: Proptypes.number,
  animation: Proptypes.any,
}

export default Item
