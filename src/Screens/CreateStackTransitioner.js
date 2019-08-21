import React from 'react'
import {
  createNavigator,
  StackRouter,
  defaultNavigationOptions as reactNavigationDefaultNavigationOptions,
  getCustomActionCreators,
  SceneView,
  StackActions,
} from 'react-navigation'
import { View, Animated, Easing, Dimensions } from 'react-native'
import { Transitioner } from 'react-navigation-stack'
import { ScreenContainer, Screen } from 'react-native-screens'

const EPS = 1e-5

const { width, height } = Dimensions.get('window')

export default (route, config) => {
  const {
    initialRouteName,
    initialRouteParams,
    paths,
    mode,
    transitionConfig,
    defaultNavigationOptions,
    style,
  } = config

  const stackRouterConfig = {
    ...reactNavigationDefaultNavigationOptions,
    initialRouteName,
    initialRouteParams,
    paths,
    defaultNavigationOptions,
    getCustomActionCreators,
  }

  class FluidNavigationView extends React.PureComponent {
    configureTransition = (transitionProps, prevTransitionProps) => {
      console.log(
        'TCL: FluidNavigationView -> configureTransition -> transitionProps',
        transitionProps
      )
      return {
        // duration in milliseconds, default: 250
        duration: 500,
        // An easing function from `Easing`, default: Easing.inOut(Easing.ease)
        easing: Easing.bounce,
      }
    }

    getOpacityStyle = (position: Animated.Value, index: number) => {
      return {
        opacity: position.interpolate({
          // inputRange: [index - 1, index - 0.25, index, index + 0.25, index + 1],
          // outputRange: [0, 1, 1, 1, 0],
          inputRange: [index, index + 1 - EPS, index + 1],
          outputRange: [1, 1, 0],
          extrapolate: 'clamp',
        }),
      }
    }

    renderContent = (transitionProps, prevTransitionProps) => {
      const scenes = transitionProps.scenes.map(scene => this.renderScene(transitionProps, scene))
      return <ScreenContainer style={{ flex: 1 }}>{scenes}</ScreenContainer>
    }

    renderScene = (transitionProps, scene) => {
      const { position } = transitionProps
      console.log('TCL: FluidNavigationView -> renderScene -> position', position)
      const { index } = scene
      const opacity = position.interpolate({
        inputRange: [index, index + 1 - EPS, index + 1],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
      })
      const top = position.interpolate({
        inputRange: [index, index + 1 - EPS, index + 1],
        outputRange: [0, height, height],
        extrapolate: 'clamp',
      })
      return (
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            top,
            left: 0,
            right: 0,
            bottom: 0,
            opacity,
          }}
          key={scene.key}
          collapsable={false}
        >
          <Screen style={{ flex: 1 }} active={scene.isActive ? 1 : 0}>
            <SceneView
              navigation={this.props.navigation}
              screenProps={this.props.screenProps}
              component={scene.descriptor.getComponent()}
            />
          </Screen>
        </Animated.View>
        // </Screen>
      )
    }

    render() {
      const {
        navigation,
        screenProps,
        descriptors,
        onTransitionStart,
        onTransitionEnd,
      } = this.props

      return (
        <Transitioner
          configureTransition={this.configureTransition}
          navigation={navigation}
          render={this.renderContent}
          descriptors={descriptors}
          screenProps={screenProps}
          onTransitionStart={onTransitionStart}
          onTransitionEnd={(transition, lastTransition) => {
            // console.log('TCL: FluidNavigationView -> render -> transition', transition)
            // const transitionDestKey = transition.scene.route.key
            // const isCurrentKey =
            //   navigation.state.routes[navigation.state.index].key === transitionDestKey
            // if (transition.navigation.state.isTransitioning && isCurrentKey) {
            //   navigation.dispatch(
            //     StackActions.completeTransition({
            //       key: navigation.state.key,
            //       toChildKey: transitionDestKey,
            //     })
            //   )
            // }
            if (onTransitionEnd) onTransitionEnd(transition, lastTransition)
          }}
        />
      )
    }
  }

  const router = StackRouter(route, stackRouterConfig)
  return createNavigator(FluidNavigationView, router, config)
}
