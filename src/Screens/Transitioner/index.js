import React, { Component } from 'react'
import { StyleSheet, Platform, Easing, View, Animated, Button, Text } from 'react-native'
import {
  //   Transitioner,
  StackRouter,
  createNavigationContainer,
  addNavigationHelpers,
  createNavigator,
  createAppContainer,
  defaultNavigationOptions,
  SceneView,
} from 'react-navigation'
import { Transitioner } from 'react-navigation-stack'

const MyNavScreen = ({ navigation, banner }) => {
  console.log('TCL: MyNavScreen -> banner', banner)
  return (
    <View>
      <Text>{banner}</Text>
      {navigation.state && navigation.state.routeName !== 'Settings' && (
        <Button onPress={() => navigation.navigate('Settings')} title="Go to a settings screen" />
      )}

      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </View>
  )
}

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
)

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
)

class CustomNavigationView extends Component {
  render() {
    const { navigation, router } = this.props
    console.log('TCL: CustomNavigationView -> render -> router', this.props)

    return (
      <Transitioner
        configureTransition={this._configureTransition}
        navigation={navigation}
        render={this._render}
      />
    )
  }

  _configureTransition(transitionProps, prevTransitionProps) {
    return {
      duration: 200,
      easing: Easing.out(Easing.ease),
    }
  }

  _render = (transitionProps, prevTransitionProps) => {
    console.log('TCL: CustomNavigationView -> _render -> transitionProps', transitionProps)
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene))
    return <SceneView style={{ flex: 1 }}>{scenes}</SceneView>
  }

  _renderScene = (transitionProps, scene) => {
    console.log('TCL: CustomNavigationView -> _renderScene -> transitionProps', transitionProps)
    const { navigation, router } = this.props
    const { routes } = navigation.state
    const { position } = transitionProps
    const { index } = scene

    const animatedValue = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
    })

    const animation = {
      opacity: animatedValue,
      transform: [{ scale: animatedValue }],
    }

    // The prop `router` is populated when we call `createNavigator`.
    const Scene = router.getComponent(scene.route.routeName)
    return (
      <Animated.View key={index} style={[styles.view, animation]}>
        <Scene
          navigation={addNavigationHelpers({
            ...navigation,
            state: routes[index],
          })}
        />
      </Animated.View>
    )
  }
}

const CustomRouter = StackRouter({
  Home: { screen: MyHomeScreen },
  Settings: { screen: MySettingsScreen },
})

const CustomTransitioner = createNavigator(CustomNavigationView, CustomRouter, {
  ...defaultNavigationOptions,
})

export default CustomTransitioner

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})
