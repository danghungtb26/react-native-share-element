import React, { Component } from 'react'
import { Animated } from 'react-native'
import Proptypes from 'prop-types'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

class Detail extends Component {
  static contextTypes = {
    onTranslation: Proptypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      item: null,
      callback: () => {},
    }
    this.panGestureRef = React.createRef()
    this.gestureX = new Animated.Value(0)
    this.gestureY = new Animated.Value(0)
    this.gestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.gestureX,
            translationY: this.gestureY,
          },
        },
      ],
      {
        // useNativeDriver: true,
        listener: this.listener,
      }
    )
  }

  listener = () => {}

  handlePanGestureStateChange = e => {
    const { oldState } = e.nativeEvent
    if (oldState === 4) {
      const { translationY } = e.nativeEvent
      if (Math.abs(translationY) > 80) {
        const { onClose } = this.props
        const { onTranslation } = this.context
        onTranslation(() => {
          onClose(() => {
            setTimeout(() => {
              this.gestureX.setValue(0)
              this.gestureY.setValue(0)
            }, 0)
          })
        })
      } else {
        this.gestureX.setValue(0)
        this.gestureY.setValue(0)
      }
    }
  }

  setValue = (item, callback = () => {}) => {
    this.setState({ item, callback })
  }

  onLayout = () => {
    const { callback } = this.state
    if (callback) callback()
  }

  render() {
    const { item } = this.state
    const { renderDetail, animation, onClose } = this.props
    const opacity = animation.interpolate({
      inputRange: [0, Number.EPSILON, 1 - Number.EPSILON, 1],
      outputRange: [0, 0, 0, 1],
    })
    if (item) {
      return (
        <PanGestureHandler
          onGestureEvent={this.gestureEvent}
          onHandlerStateChange={this.handlePanGestureStateChange}
        >
          <Animated.View
            onLayout={this.onLayout}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity,
              backgroundColor: '#fff',
              transform: [{ translateY: Animated.multiply(this.gestureY, 1) }],
            }}
          >
            {renderDetail(item, onClose)}
          </Animated.View>
        </PanGestureHandler>
      )
    }
    return null
  }
}

Detail.propTypes = {}

export default Detail
