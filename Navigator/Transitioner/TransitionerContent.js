import React, { Component } from 'react'
import { Text, View } from 'react-native'
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

  componentDidUpdate() {
    this.updateMeasure()
  }


  registerSharedView = async (name, index, nodeHandle, children, measure, callback) => {
    const newShareItem = { name, index, nodeHandle, children, callback, measure }
    const { shareItem, shareView } = this.state
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
    this.setState({
      shareItem: [...shareItem, newShareItem],
      shareView: newShareView !== undefined ? [...shareView, newShareView] : shareView,
    })
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
    const { shareItem } = this.state
    const { props } = this.props
    const { scene } = props
    const newShareItem = await shareItem.map(async item => {
      if (item.index === scene.index) {
        const measure = await measureNode(item.nodeHandle)
        return { ...item, measure }
      }
      return item
    })
    this.setState({ shareItem: newShareItem })
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
    const { props, preProps } = this.props
    const { shareItem } = this.state
    console.log("TCL: TransitionerContent -> render -> shareView", shareItem)
    const screnes = props.scenes.map(scene => this.RenderScreen({ ...props, scene }))
    return <View style={{ flex: 1 }}>{screnes}</View>
  }
}

TransitionerContent.propTypes = {}

export default TransitionerContent
