import React, { Component } from 'react'
import { View, UIManager, findNodeHandle } from 'react-native'
import PropTypes from 'prop-types'

import { SharedItem } from './SharedItems'

class SharedView extends Component {
  _view: any

  static contextTypes = {
    registerSharedView: PropTypes.func,
    unregisterSharedView: PropTypes.func,
  }

  componentDidMount() {
    const { registerSharedView } = this.context
    if (!registerSharedView) return

    const { name, containerRouteName, keyNav } = this.props
    // console.log("TCL: SharedView -> componentDidMount -> index", index)
    const arr = keyNav.split('-')
    const index = arr[arr.length - 1]
    const nativeHandle = findNodeHandle(this._view)
    registerSharedView(
      new SharedItem(
        name,
        containerRouteName,
        React.Children.only(this.props.children),
        nativeHandle,
        undefined,
        index
      )
    )
  }

  componentWillUnmount() {
    const { unregisterSharedView } = this.context
    if (!unregisterSharedView) return

    const { name, containerRouteName } = this.props
    unregisterSharedView(name, containerRouteName)
  }

  render() {
    return (
      <View
        collapsable={false}
        onLayout={e => console.log(e.nativeEvent)}
        ref={c => (this._view = c)}
      >
        {this.props.children}
      </View>
    )
  }
}

export default SharedView
