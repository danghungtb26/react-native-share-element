import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Dimensions,
  UIManager,
  InteractionManager,
} from 'react-native'

import { Transitioner } from 'react-navigation-stack'
import { addNavigationHelpers, createNavigator, StackRouter, SceneView } from 'react-navigation'
import Proptypes from 'prop-types'

import { ScreenContainer, Screen } from 'react-native-screens'

import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler'

import StackGestureContext from 'react-navigation-stack/src/utils/StackGestureContext'

import SharedItems from './SharedItems'
import TransitionScreen from './TransitionScreen'
import TransitionOverLay from './TransitionOverlay'
import TransitionContent from './TransitionContent'

class CustomTransformer extends Component {
  static childContextTypes = {
    registerSharedView: Proptypes.func,
    unregisterSharedView: Proptypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      sharedItems: new SharedItems(),
      itemsToMeasure: [],
    }
  }

  getChildContext() {
    const self = this
    // console.log('TCL: CustomTransformer -> getChildContext -> self', self)
    return {
      registerSharedView: sharedItem => {
        this.addSharedItem(sharedItem)
        const { name, containerRouteName } = sharedItem

        const matchingItem = this.state.sharedItems.findMatchByName(name, containerRouteName)
        // schedule to measure (on layout) if another view with the same name is mounted
        if (matchingItem) {
          this.setState(prevState => ({
            sharedItems: prevState.sharedItems,
            itemsToMeasure: [...prevState.itemsToMeasure, sharedItem, matchingItem],
          }))
        }
      },
      unregisterSharedView: (name, containerRouteName) => {
        this.removeSharedItem(name, containerRouteName)
      },
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    /*
      state / prop changes
      - navigation change: nextProps !== this.props                       => true
      - onLayout: state: itemsToMeasure, sharedItems.metrics              => measured?
      - afterInteraction: state: itemsToMeasure, sharedElements.metrics   => false
      - register: state.sharedElements, state.itemsToMeasure              => false
      - unregister: statee.sharedElements                                 => false
    */
    return this.props !== nextProps || nextState.itemsToMeasure.length === 0
  }

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array)
    }
  }

  onLayout = async () => {
    const toUpdate = []
    const { itemsToMeasure } = this.state
    console.log('TCL: CustomTransformer -> onLayout -> itemsToMeasure', itemsToMeasure)
    // itemsToMeasure.map(async item => {
    //   const { name, containerRouteName } = item
    //   const metrics = this.measure(item)
    //   console.log('TCL: CustomTransformer -> onLayout -> metrics', metrics)
    //   toUpdate.push({ name, containerRouteName, metrics })
    // })
    await this.asyncForEach(itemsToMeasure, async item => {
      const metrics = await this.measure(item)
      console.log('TCL: CustomTransformer -> onLayout -> metrics', metrics)
      //   console.log('TCL: CustomTransformer -> onLayout -> metrics', metrics)
      const { name, containerRouteName } = item
      toUpdate.push({ name, containerRouteName, metrics })
    })
    if (toUpdate.length > 0) {
      const { sharedItems } = this.state
      const newsharedItems = sharedItems.updateMetrics(toUpdate)
      // console.log("TCL: CustomTransformer -> onLayout -> newsharedItems", newsharedItems)
      this.setState(prevState => ({
        sharedItems: newsharedItems,
        itemsToMeasure: [],
      }))
    }
  }

  setSharedItemsState = (fun = () => {}, callback) => {
    this.setState(prevState => ({ sharedItems: fun(prevState) }), callback)
  }

  measure = sharedItem => {
    return new Promise((resolve, reject) => {
      UIManager.measureInWindow(sharedItem.nativeHandle, (x, y, width, height) => {
        resolve({ x, y, width, height })
      })
    })
  }

  addSharedItem = sharedItem => {
    this.setSharedItemsState(prevState => prevState.sharedItems.add(sharedItem))
  }

  removeSharedItem = (name, containerRouteName) => {
    this.setSharedItemsState(prevState => prevState.sharedItems.remove(name, containerRouteName))
  }

  configureTransition = () => {
    return {
      duration: 500,
    }
  }

  // getOverlayContainerStyle = (progress, index) => {
  //   const right = progress.interpolate({
  //     inputRange: [index, index + 0.2, index + 0.5, index + 0.99999, index + 1],
  //     outputRange: [0, 100, 150, 200, 1000], // move it off screen after transition is done
  //   })
  //   return {
  //     right,
  //   }
  // }

  // getSharedElementStyle = (props, prevProps, itemFrom, itemTo) => {
  //   const { position, progress } = props

  //   const x = Math.min(props.index, prevProps.index)
  //   const y = Math.max(props.index, prevProps.index)
  //   const inputRange = [x, y]

  //   const getElementType = item => {
  //     const { type } = item.reactElement
  //     return type && (type.displayName || type.name)
  //   }
  //   const animateWidthHeight = (itemFrom, itemTo) => {
  //     const width = position.interpolate({
  //       inputRange,
  //       outputRange:
  //         props.index > prevProps.index
  //           ? [itemFrom.metrics.width, itemTo.metrics.width]
  //           : [itemTo.metrics.width, itemFrom.metrics.width],
  //     })
  //     const height = position.interpolate({
  //       inputRange,
  //       outputRange:
  //         props.index > prevProps.index
  //           ? [itemFrom.metrics.height, itemTo.metrics.height]
  //           : [itemTo.metrics.height, itemFrom.metrics.height],
  //     })
  //     return { width, height }
  //   }

  //   const animateScale = (itemFrom, itemTo) => {
  //     const toVsFromScaleX = itemTo.scaleRelativeTo(itemFrom).x
  //     const toVsFromScaleY = itemTo.scaleRelativeTo(itemFrom).y
  //     // using progress is actually much simpler than position in previous implementation.
  //     const scaleX = position.interpolate({
  //       inputRange,
  //       outputRange: [1, toVsFromScaleX],
  //     })
  //     const scaleY = position.interpolate({
  //       inputRange,
  //       outputRange: [1, toVsFromScaleY],
  //     })
  //     const left = position.interpolate({
  //       inputRange,
  //       outputRange: [
  //         itemFrom.metrics.x,
  //         itemTo.metrics.x + (itemFrom.metrics.width / 2) * (toVsFromScaleX - 1),
  //       ],
  //     })
  //     const top = position.interpolate({
  //       inputRange,
  //       outputRange: [
  //         itemFrom.metrics.y,
  //         itemTo.metrics.y + (itemFrom.metrics.height / 2) * (toVsFromScaleY - 1),
  //       ],
  //     })
  //     return {
  //       left,
  //       top,
  //       transform: [{ scaleX }, { scaleY }],
  //     }
  //   }

  //   const animateFontSize = (itemFrom, itemTo) => {
  //     // This requires the shared Text to have a "fontSize" prop that is the same as the style.
  //     const getFontSize = element => (element.props && element.props.style.fontSize) || 12
  //     return {
  //       fontSize: position.interpolate({
  //         inputRange,
  //         outputRange: [getFontSize(itemFrom.reactElement), getFontSize(itemTo.reactElement)],
  //       }),
  //     }
  //   }

  //   const elementType = getElementType(itemFrom)
  //   let style
  //   switch (elementType) {
  //     case 'Image':
  //       style = animateWidthHeight(itemFrom, itemTo)
  //       break
  //     case 'Text':
  //       style = {
  //         ...animateWidthHeight(itemFrom, itemTo),
  //         ...animateFontSize(itemFrom, itemTo),
  //       }
  //       break
  //     default:
  //       style = animateScale(itemFrom, itemTo)
  //   }

  //   const left = position.interpolate({
  //     inputRange,
  //     outputRange:
  //       props.index > prevProps.index
  //         ? [itemFrom.metrics.x, itemTo.metrics.x]
  //         : [itemFrom.metrics.x, itemTo.metrics.x].reverse(),
  //   })
  //   const top = position.interpolate({
  //     inputRange,
  //     outputRange:
  //       props.index > prevProps.index
  //         ? [itemFrom.metrics.y, itemTo.metrics.y]
  //         : [itemFrom.metrics.y, itemTo.metrics.y].reverse(),
  //   })

  //   return {
  //     // elevation: this.interpolateElevation(props, prevProps, 1), // make sure shared elements stay above the faked container
  //     position: 'absolute',
  //     left,
  //     top,
  //     right: null,
  //     bottom: null,
  //     ...style,
  //   }
  // }

  // getBBox = metricsArray => {
  //   let left = Number.MAX_VALUE
  //   let top = Number.MAX_VALUE
  //   let right = Number.MIN_VALUE
  //   let bottom = Number.MIN_VALUE
  //   metricsArray.forEach(m => {
  //     if (m.x < left) left = m.x
  //     if (m.y < top) top = m.y
  //     if (m.x + m.width > right) right = m.x + m.width
  //     if (m.y + m.height > bottom) bottom = m.y + m.height
  //   })
  //   const width = right - left
  //   const height = bottom - top
  //   return { left, top, right, bottom, width, height }
  // }

  // interpolateElevation = (props, prevProps, base) => {
  //   const { position, navigation, index } = props
  //   const prevIndex = prevProps.index
  //   const minIdx = Math.min(index, prevIndex)
  //   const maxIdx = Math.max(index, prevIndex)

  //   return position.interpolate({
  //     inputRange: [minIdx, maxIdx],
  //     outputRange: [5 + base, 25 + base],
  //   })
  // }

  handlePanGestureStateChange = e => {
    const { oldState } = e.nativeEvent
    console.log('TCL: e.nativeEvent', e.nativeEvent)
    console.log('TCL: oldState', oldState)
  }

  renderContent = (props, prevProps) => {
    const scenes = props.scenes.map(scene => this.renderScene({ ...props, scene }))
    const overlay = this.renderOverlay(props, prevProps)
    console.log(this.state.sharedItems)
    return (
      <TransitionContent
        {...this.props}
        props={props}
        prevProps={prevProps}
        onLayoutScreen={this.onLayout}
        sharedItems={this.state.sharedItems}
      />
    )
  }

  // renderFakedSEContainer = (pairs, props, prevProps) => {
  //   if (!prevProps || pairs.length === 0) return null
  //   const fromItemBBox = this.getBBox(pairs.map(p => p.fromItem.metrics))
  //   const toItemBBox = this.getBBox(pairs.map(p => p.toItem.metrics))
  //   const { position, progress, navigation, index } = props
  //   const prevIndex = prevProps.index
  //   const minIdx = Math.min(index, prevIndex)
  //   const maxIdx = Math.max(index, prevIndex)
  //   const inputRange = [minIdx, maxIdx]
  //   const adaptRange = range => (index > prevIndex ? range : range.reverse())
  //   const left = position.interpolate({
  //     inputRange,
  //     outputRange: adaptRange([fromItemBBox.left, toItemBBox.left]),
  //   })
  //   const top = position.interpolate({
  //     inputRange,
  //     outputRange: adaptRange([fromItemBBox.top, toItemBBox.top]),
  //   })
  //   const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
  //   const width = position.interpolate({
  //     inputRange,
  //     outputRange: [index > prevIndex ? fromItemBBox.width : toItemBBox.width, windowWidth],
  //   })
  //   const height = position.interpolate({
  //     inputRange,
  //     outputRange: [index > prevIndex ? fromItemBBox.height : toItemBBox.height, windowHeight],
  //   })
  //   const elevation = this.interpolateElevation(props, prevProps, 0)
  //   const style = {
  //     backgroundColor: 'blue',
  //     // elevation,
  //     position: 'absolute',
  //     left: 0,
  //     top: 0,
  //     right: null,
  //     bottom: null,
  //     width,
  //     height,
  //   }
  //   return <Animated.View style={style} />
  // }

  renderOverlay = (props, prevProps) => {
    // const fromRoute = prevProps ? prevProps.scene.route.routeName : 'unknownRoute'
    // const toRoute = props.scene.route.routeName
    // const pairs = this.state.sharedItems.getMeasuredItemPairs(fromRoute, toRoute)
    // // console.log("TCL: renderOverlay -> sharedItems", this.state.sharedItems)
    // const sharedElements = pairs.map((pair, idx) => {
    //   const { fromItem, toItem } = pair
    //   const animatedStyle = this.getSharedElementStyle(props, prevProps, fromItem, toItem)
    //   const element = fromItem.reactElement
    //   const AnimatedComp = Animated.createAnimatedComponent(element.type)
    //   return React.createElement(
    //     AnimatedComp,
    //     { ...element.props, style: [element.props.style, animatedStyle], key: idx },
    //     element.props.children
    //   )
    // })
    // const containerStyle = this.getOverlayContainerStyle(props.position, props.index)

    return (
      // <Animated.View style={[styles.overlay, this.props.style]}>
      //   {this.renderFakedSEContainer(pairs, props, prevProps)}
      // <View style={{ position: 'absolute', top: 0 }}>{sharedElements}</View>
      <TransitionOverLay props={props} prevProps={prevProps} sharedItems={this.state.sharedItems} />
      // </Animated.View>
    )
  }

  // renderDarkeningOverlay = (progress, position, sceneIndex) => {
  //   const backgroundColor = position.interpolate({
  //     inputRange: [sceneIndex - 1, sceneIndex, sceneIndex + 0.2, sceneIndex + 1],
  //     outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.5)'],
  //   })
  //   const animatedStyle = {
  //     elevation: 5, // to ensure the overlay covers toolbar
  //     backgroundColor,
  //     ...this.getOverlayContainerStyle(position, sceneIndex),
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     bottom: 0,
  //     right: 0,
  //   }
  //   // console.log(styles)
  //   return <Animated.View style={animatedStyle} pointerEvents="none" />
  // }

  renderScene = transitionProps => {
    const { position, scene, progress, navigation } = transitionProps
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

    const style = { opacity }
    const { screenProps } = this.props
    return (
      // <Animated.View
      //   key={transitionProps.scene.route.key}
      //   style={[styles.scene, style]}
      //   onLayout={this.onLayout}
      //   collapsable={false}
      // >
      //   <SceneView
      //     navigation={scene.descriptor.navigation}
      //     screenProps={this.props.screenProps}
      //     component={scene.descriptor.getComponent(scene.route.routeName)}
      //   />
      //   {this.renderDarkeningOverlay(progress, position, index)}
      // </Animated.View>
      <TransitionScreen
        {...transitionProps}
        screenProps={screenProps}
        onLayoutScreen={this.onLayout}
      />
    )
  }

  // getChildNavigation = scene => {
  //   if (!this.childNavigationProps) this.childNavigationProps = {}
  //   let newNavigation = this.childNavigationProps[scene.key]
  //   if (!newNavigation || newNavigation.state !== scene.route) {
  //     const { navigation } = this.props
  //     this.childNavigationProps[scene.key] = addNavigationHelpers({
  //       ...navigation,
  //       state: scene.route,
  //     })

  //     newNavigation = addNavigationHelpers({
  //       ...navigation,
  //       state: scene.route,
  //     })
  //   }
  //   return newNavigation
  // }

  render() {
    return (
      <Transitioner
        configureTransition={this.configureTransition}
        render={this.renderContent}
        {...this.props}
      />
    )
  }
}

CustomTransformer.propTypes = {}

const createStackShared = (route, config = {}) => {
  const router = StackRouter(route)
  return createNavigator(CustomTransformer, router, config)
}

export default createStackShared

const styles = StyleSheet.create({
  scenes: {
    flex: 1,
  },
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 100000, // invisible by default
    right: 0,
    bottom: 0,
  },
})
