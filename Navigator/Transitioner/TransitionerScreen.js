import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'
import Proptypes from 'prop-types'
import _ from 'lodash'
import { PanGestureHandler } from 'react-native-gesture-handler'
import ScreenView from './ScreenView'
import TransitionerOverlay from './TransitionerOverlay'

class TransitionerScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.a = new Animated.Value(0)
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
    this.refOverlay = []
  }

  handlePanGestureStateChange = e => {
    const { oldState } = e.nativeEvent
    if (oldState === 4) {
      const { translationY } = e.nativeEvent
      if (Math.abs(translationY) > 150) {
        const { scene } = this.props
        if (scene.index > 0) {
          this.onReSetMeasure(() => scene.descriptor.navigation.goBack())
        }
      } else {
        Animated.timing(this.gestureY, {
          toValue: 0,
          duration: 100,
          easing: t => t,
        }).start()
      }
    }
  }

  onReSetMeasure = callback => {
    // this.refOverlay.forEach(item => {
    //   if (item) {
    //     if (item.reSetToItem) {
    //       item.reSetToItem()
    //     }
    //   }
    // })
    // setTimeout(() => callback(), 30)
    callback()
  }

  onSetRef = (e, index) => {
    this.refOverlay[index] = e
  }

  RenderOverlay = (props, index) => {
    const { position } = this.props
    return (
      <TransitionerOverlay
        onComponentRef={e => this.onSetRef(e, index)}
        key={index}
        animation={position}
        {...props}
      />
    )
  }

  render() {
    const { position, scene, screenProps, shareView } = this.props
    const { index } = scene
    const share = shareView.map((item, i) => this.RenderOverlay(item, i))
    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.00001, index],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    })
    return (
      <View
        style={{
          // flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {share}
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
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#fff',
              opacity,
              transform: [{ translateY: this.gestureY }],
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
      </View>
    )
  }
}

TransitionerScreen.propTypes = {}

export default TransitionerScreen
