import React, { Component } from 'react'
import { Text, View, Animated, findNodeHandle } from 'react-native'
import Proptypes from 'prop-types'
import { measureNode } from './util'

export const screenTypes = {
  list: 'list',
  detail: 'detail',
}

class ShareView extends Component {
  static contextTypes = {
    registerSharedView: Proptypes.func,
    unregisterSharedView: Proptypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      opacity: 1,
    }
    this.layouted = false
  }

  componentDidMount() {}

  componentWillUnmount() {
    const { unregisterSharedView } = this.context
    const { name, children, screenIndex } = this.props
    if (unregisterSharedView)
      unregisterSharedView(
        name,
        screenIndex,
        findNodeHandle(this.view),
        React.Children.only(children)
      )
  }

  onSetOpacity = opacity => {
    if (opacity) {
      this.setState({ opacity })
    }
  }

  onLayout = async () => {
    if (!this.layouted) {
      const { name, children, screenIndex } = this.props
      const measure = await measureNode(findNodeHandle(this.view))
      const { registerSharedView } = this.context
      if (registerSharedView)
        registerSharedView(
          name,
          screenIndex,
          findNodeHandle(this.view),
          React.Children.only(children),
          measure,
          this.onSetOpacity
        )
      this.layouted = true
    }
  }

  onSetRef = async ref => {
    this.view = ref
  }

  render() {
    const { opacity } = this.state
    const { children } = this.props
    return (
      <Animated.View
        onLayout={this.onLayout}
        ref={this.onSetRef}
        style={{ opacity }}
        collapsable={false}
      >
        {children}
      </Animated.View>
    )
  }
}

ShareView.propTypes = {}

export default ShareView
