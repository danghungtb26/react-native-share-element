import React, { Component } from 'react'
import { Text, View, Animated, StyleSheet, Dimensions } from 'react-native'
import { SceneView } from 'react-navigation'
import Proptypes from 'prop-types'
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler'

import StackGestureContext from 'react-navigation-stack/src/utils/StackGestureContext'

class TransitionScreen extends Component {
  constructor(props) {
    super(props)
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
  }

  getOverlayContainerStyle = (progress, index) => {
    const right = progress.interpolate({
      inputRange: [index, index + 0.2, index + 0.5, index + 0.99999, index + 1],
      outputRange: [0, 100, 150, 200, 1000], // move it off screen after transition is done
    })
    return {
      right,
    }
  }

  renderDarkeningOverlay = (progress, position, sceneIndex) => {
    const backgroundColor = position.interpolate({
      inputRange: [sceneIndex - 1, sceneIndex, sceneIndex + 0.2, sceneIndex + 1],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.5)'],
    })
    const animatedStyle = {
      // elevation: 5, // to ensure the overlay covers toolbar
      backgroundColor,
      ...this.getOverlayContainerStyle(position, sceneIndex),
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
    // console.log(styles)
    return <Animated.View style={animatedStyle} pointerEvents="none" />
  }

  handlePanGestureStateChange = e => {
    const { oldState } = e.nativeEvent
    if (oldState === 4) {
      const { translationX, translationY } = e.nativeEvent
      // console.log(this.ea)
      if (Math.abs(translationX) > 100) {
        const newa = {
          nativeEvent: {
            layout: {
              x: translationX,
              y: translationY,
              width: this.width,
              height: this.height,
            },
          },
        }

        const { onLayoutScreen } = this.props
        onLayoutScreen(newa)
        const { scene } = this.props
        // console.log('TCL: TransitionScreen -> props', props)
        // scene.descriptor.navigation
        if (scene.index > 0) scene.descriptor.navigation.goBack()
        // console.log("TCL: TransitionScreen -> scene.descriptor.navigation",)
      } else {
        this.gestureX.setValue(0)
        this.gestureY.setValue(0)
      }
    }
  }

  listener = e => {
    const { translationX, translationY } = e.nativeEvent
    const { nativeEvent } = this.ea
    const { layout } = nativeEvent
    const newE = {
      ...this.ea,
      nativeEvent: { ...nativeEvent, layout: { ...layout, x: translationX, y: translationY } },
    }
    // console.log("TCL: TransitionScreen -> newE", newE)
    // const { onLayoutScreen } = this.props
    // onLayoutScreen(newE)
  }

  onLayout = e => {
    const { width, height } = e.nativeEvent.layout
    this.width = width
    this.height = height
    this.ea = e
    const { onLayoutScreen } = this.props
    if (onLayoutScreen) onLayoutScreen(e)
  }

  render() {
    const { position, scene, progress, navigation, onLayoutScreen } = this.props
    const { index } = scene
    const inputRange = [index - 1, index - 0.0001, index, index + 0.0001, index + 1]
    const opacity = position.interpolate({
      inputRange,
      outputRange: [0, 0, 1, 1, 0],
    })

    const left = position.interpolate({
      inputRange,
      outputRange: [375, 0, 0, 0, 0],
    })

    const scale = this.gestureX.interpolate({
      inputRange: [
        -this.width || -Dimensions.get('window').width,
        0,
        Math.abs(this.width) || Dimensions.get('window').width,
      ],
      outputRange: [0.5, 1, 0.5],
    })

    const style = {
      opacity,
      transform: [{ translateX: this.gestureX }, { translateY: this.gestureY }, { scale }],
    }

    return (
      <PanGestureHandler
        ref={this.panGestureRef}
        onGestureEvent={this.gestureEvent}
        onHandlerStateChange={this.handlePanGestureStateChange}
        enabled={scene.index > 0}
      >
        <Animated.View style={[styles.scene, style]} onLayout={this.onLayout} collapsable={false}>
          <StackGestureContext.Provider value={this.panGestureRef}>
            <SceneView
              navigation={scene.descriptor.navigation}
              screenProps={this.props.screenProps}
              component={scene.descriptor.getComponent(scene.route.routeName)}
            />
            {this.renderDarkeningOverlay(progress, position, index)}
          </StackGestureContext.Provider>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}

TransitionScreen.propTypes = {}

export default TransitionScreen

const styles = StyleSheet.create({
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
