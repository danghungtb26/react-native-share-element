import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'
import Proptypes from 'prop-types'

export const screenTypes = {
  list: 'list',
  detail: 'detail',
}

class ShareView extends Component {
  static contextTypes = {
    onImageRef: Proptypes.func,
    onImageDetailRef: Proptypes.func,
    onRemoveItem: Proptypes.func,
    onRemoveDetail: Proptypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      opacity: 1,
    }
  }

  componentDidMount() {
    const { name, screen, idItem, children } = this.props
    if (screen === screenTypes.list) {
      const { onImageRef } = this.context
      onImageRef(name, idItem, this.view, React.Children.only(children), this.onSetOpacity)
    }

    if (screen === screenTypes.detail) {
      const { onImageDetailRef } = this.context
      onImageDetailRef(name, this.view, React.Children.only(children))
    }
  }

  componentWillUnmount() {
    const { onRemoveItem, onRemoveDetail } = this.context
    const { name } = this.props
    if (name === screenTypes.list) {
      onRemoveItem()
    }
    if (name === screenTypes.detail) {
      onRemoveDetail()
    }
  }

  onSetOpacity = opacity => {
    if (opacity) {
      this.setState({ opacity })
    }
  }

  onSetRef = ref => {
    this.view = ref
  }

  render() {
    const { opacity } = this.state
    const { children } = this.props
    return (
      <Animated.View ref={this.onSetRef} style={{ opacity }} collapsable={false}>
        {children}
      </Animated.View>
    )
  }
}

ShareView.propTypes = {}

export default ShareView
