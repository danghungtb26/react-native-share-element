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

  async componentDidMount() {
    console.log('didmout')
  }

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
      console.log('onlayout')
      this.layouted = true
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
    }
  }

  onSetRef = async ref => {
    this.view = ref
  }

  render() {
    const { opacity } = this.state
    const { children, style = {} } = this.props
    const { alignItems = 'flex-start', ...restStyle } = style
    return (
      <View style={{ alignItems, ...restStyle }} {...this.props}>
        <Animated.View
          onLayout={this.onLayout}
          ref={this.onSetRef}
          style={{ opacity }}
          collapsable={false}
        >
          {children}
        </Animated.View>
      </View>
    )
  }
}

ShareView.propTypes = {}

export default ShareView
