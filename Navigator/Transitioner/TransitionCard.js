import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'
import Proptypes from 'prop-types'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ScreenView from './ScreenView'

class TransitionCard extends Component {
  constructor(props) {
    super(props)
    console.log('TCL: TransitionCard -> constructor -> props', props)
    this.state = {}
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
    this.position = new Animated.Value(0)
    const { position, layout } = props
    this.position = Animated.subtract(position, Animated.divide(this.gestureX, 375))
  }

  handlePanGestureStateChange = e => {
    const { oldState } = e.nativeEvent
    if (oldState === 4) {
      const { translationX } = e.nativeEvent
      if (Math.abs(translationX) > 150) {
        const { scene } = this.props
        if (scene.index > 0) {
          scene.descriptor.navigation.goBack()
        }
      } else {
        Animated.timing(this.gestureX, {
          toValue: 0,
          duration: 100,
          easing: t => t,
        }).start()
      }
    }
  }

  listener = e => console.log(e)

  render() {
    const { position, scene, screenProps, layout } = this.props
    const { index } = scene
    const left = this.position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [375, 0, -50],
    })
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <PanGestureHandler
          ref={this.panGestureRef}
          onGestureEvent={this.gestureEvent}
          onHandlerStateChange={this.handlePanGestureStateChange}
          enabled={index > 0}
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left,
              right: 0,
              bottom: 0,
              backgroundColor: '#fff',
              //   opacity,
              transform: [{ translateX: this.gestureX }],
            }}
          >
            <ScreenView
              screenIndex={scene.index}
              navigation={scene.descriptor.navigation}
              screenProps={screenProps}
              component={scene.descriptor.getComponent(scene.route.routeName)}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    )
  }
}

TransitionCard.propTypes = {}

export default TransitionCard
