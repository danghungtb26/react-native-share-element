import React, { Component } from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native'
import Proptypes from 'prop-types'

import { ScreenContainer, Screen } from 'react-native-screens'

import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler'

import StackGestureContext from 'react-navigation-stack/src/utils/StackGestureContext'
import TransitionOverLay from './TransitionOverlay'
import TransitionScreen from './TransitionScreen'

class TransitionContent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.panGestureRef = React.createRef()
    // this.gestureX = new Animated.Value(0)
    // this.gestureY = new Animated.Value(0)
    // this.gestureEvent = Animated.event(
    //   [
    //     {
    //       nativeEvent: {
    //         translationX: this.gestureX,
    //         translationY: this.gestureY,
    //       },
    //     },
    //   ],
    //   {
    //     useNativeDriver: true,
    //     listener: e => console.log(e.nativeEvent)
    //   }
    // )
  }

  // preparePosition() {
  //   if (this.gesturePosition) {
  //     // FIXME: this doesn't seem right, there is setValue called in some places
  //     // @ts-ignore
  //     const { props } = this.props
  //     const { position } = props
  //     this.position = Animated.add(position, this.gesturePosition)
  //   } else {
  //     const { props } = this.props
  //     const { position } = props
  //     this.position = position
  //   }
  // }

  // prepareAnimated() {
  //   if (this.props === this.prevProps) {
  //     return
  //   }
  //   this.prevProps = this.props

  //   this.preparePosition()
  // }

  renderOverlay = (props, prevProps) => {
    return (
      <TransitionOverLay props={props} prevProps={prevProps} sharedItems={this.props.sharedItems} />
    )
  }

  renderScene = transitionProps => {
    const { screenProps, onLayoutScreen } = this.props
    const { scene } = transitionProps
    return (
      <TransitionScreen
        {...transitionProps}
        screenProps={screenProps}
        onLayoutScreen={onLayoutScreen}
        key={scene.index}
      />
    )
  }

  render() {
    // this.prepareAnimated()
    const { props, prevProps } = this.props
    const scenes = props.scenes.map(scene => this.renderScene({ ...props, scene }))
    const overlay = this.renderOverlay(props, prevProps)
    // const translationX = this.gestureX.in
    return (
      // <PanGestureHandler
      //   ref={this.panGestureRef}
      //   onGestureEvent={this.gestureEvent}
      //   onHandlerStateChange={this.handlePanGestureStateChange}
      // >
      //   <Animated.View style={[{ flex: 1 }, { transform: [{translateX:this.gestureY}] }]}>
      //     <StackGestureContext.Provider value={this.panGestureRef}>
      <ScreenContainer style={styles.scenes}>
        {scenes}
        {overlay}
      </ScreenContainer>
      //     </StackGestureContext.Provider>
      //   </Animated.View>
      // </PanGestureHandler>
    )
  }
}

TransitionContent.propTypes = {}

export default TransitionContent

const styles = StyleSheet.create({
  scenes: {
    flex: 1,
  },
})
