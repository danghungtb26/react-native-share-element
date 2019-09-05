import React, { Component } from 'react'
import { View } from 'react-native'
import Proptypes from 'prop-types'
import _ from 'lodash'
import TransitionerScreen from './TransitionerScreen'
import { measureNode } from './util'

class TransitionerContent extends Component {
  static childContextTypes = {
    registerSharedView: Proptypes.func,
    unregisterSharedView: Proptypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      shareItem: [],
      shareView: [],
    }
  }

  getChildContext() {
    return {
      registerSharedView: this.registerSharedView,
      unregisterSharedView: this.unregisterSharedView,
    }
  }

  registerSharedView = async (name, index, nodeHandle, children, measure, callback) => {
    const newShareItem = { name, index, nodeHandle, children, callback, measure }
    const { shareItem } = this.state
    const checkIndexShareView = _.findIndex(
      shareItem,
      i => i.index === index - 1 && i.name === name
    )
    let newShareView
    if (checkIndexShareView >= 0) {
      newShareView = {
        fromIndex: index - 1,
        fromItem: shareItem[checkIndexShareView],
        toItem: newShareItem,
      }
    }
    this.setState(state => ({
      shareItem: [...state.shareItem, newShareItem],
      shareView: newShareView !== undefined ? [...state.shareView, newShareView] : state.shareView,
    }))
  }

  unregisterSharedView = (name, index, nodeHandle) => {
    const { shareItem, shareView } = this.state
    _.remove(shareItem, i => i.index === index && i.name === name && i.nodeHandle === nodeHandle)
    _.remove(
      shareView,
      i =>
        i.fromIndex === index - 1 &&
        i.toItem.name === name &&
        i.toItem.index === index &&
        i.toItem.nodeHandle === nodeHandle
    )
    this.setState({ shareItem, shareView })
  }

  updateMeasure = async () => {
    const { shareItem, shareView } = this.state
    console.log('object')
    const { props } = this.props
    const { scene } = props
    const newShareItem = await Promise.all(
      shareItem.map(async item => {
        if (
          item.index === scene.index - 1 ||
          item.index === scene.index ||
          item.index === scene.index + 1
        ) {
          const measure = await measureNode(item.nodeHandle)
          return { ...item, measure }
        }
        return item
      })
    )
    const newShareView = await Promise.all(
      shareView.map(async item => {
        if (
          item.fromIndex === scene.index - 1 ||
          item.fromIndex === scene.index ||
          item.fromIndex === scene.index + 1
        ) {
          const indexFrom = _.findIndex(
            newShareItem,
            i => i.index === item.fromIndex && i.name === item.fromItem.name
          )
          let newfrom = item.fromItem
          if (indexFrom >= 0) {
            newfrom = newShareItem[indexFrom]
          }
          const indexTo = _.findIndex(
            newShareItem,
            i => i.index === item.toItem.index && i.name === item.toItem.name
          )
          let newTo = item.toItem
          if (indexTo >= 0) {
            newTo = newShareItem[indexTo]
          }
          return { ...item, fromItem: newfrom, toItem: newTo }
        }
        return item
      })
    )
    this.setState({ shareItem: newShareItem, shareView: newShareView })
    return new Promise((resole, reject) => {
      setTimeout(() => {
        return resole(true)
      }, 0)
    })
  }

  test = () => {
    return new Promise(e => {
      return e({ a: 'a' })
    })
  }

  RenderScreen = props => {
    const { scene } = props
    const { shareView } = this.state
    const shareViewItem = shareView.filter(i => i.fromIndex === scene.index - 1)
    const { screenProps } = this.props
    return (
      <TransitionerScreen
        key={scene.index}
        {...props}
        screenProps={screenProps}
        shareView={shareViewItem}
      />
    )
  }

  render() {
    const { props } = this.props
    const { shareView } = this.state
    const screnes = props.scenes.map(scene => this.RenderScreen({ ...props, scene }))
    return <View style={{ flex: 1 }}>{screnes}</View>
  }
}

TransitionerContent.propTypes = {}

export default TransitionerContent
