import React, { Component } from 'react'
import { Text, View, Animated, Easing } from 'react-native'
import Proptypes from 'prop-types'
import List from './List'
import Transition from './Transition'
import TransitionHeight from './TransitionHeight'
import Detail from './Detail'

class Index extends Component {
  static childContextTypes = {
    onImageRef: Proptypes.func,
    onImageDetailRef: Proptypes.func,
    onTranslation: Proptypes.func,
    onRemoveItem: Proptypes.func,
    onRemoveDetail: Proptypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      y: 0,
    }
    this.progressAnimated = new Animated.Value(0)
    this.listRef = []
    this.detailRef = null
  }

  getChildContext = () => ({
    onImageRef: this.onImageRef,
    onImageDetailRef: this.onImageDetailRef,
    onTranslation: this.onTranslation,
    onRemoveItem: this.onRemoveItem,
    onRemoveDetail: this.onRemoveDetail,
  })

  onImageRef = (name, id, nativeHander, children, changOpacity) => {
    this.listRef[id] = { name, nativeHander, children, changOpacity }
  }

  onImageDetailRef = (name, nativeHander, children) => {
    this.detailRef = { name, nativeHander, children }
  }

  onRemoveDetail = () => {}

  onRemoveItem = () => {}

  onTranslation = callback => {
    this.transition.setValueTranistion(this.detailRef, callback)
  }

  onReset = () => {
    this.transition.setValue(null)
    this.detail.setValue(null)
  }

  onOpen = e => {
    const item = this.listRef[e.id]
    if (this.detail && this.detail.setValue) {
      this.detail.setValue(e, () => this.onStartAnimation(item))
    }
  }

  onClose = callback => {
    Animated.timing(this.progressAnimated, {
      toValue: 0,
      duration: 1000,
      // useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        if (typeof callback === 'function') callback()
        this.onReset()
      }
    })
  }

  onStartAnimation = item => {
    if (this.transition && this.transition.setValue)
      this.transition.setValue(item, this.detailRef, () => {
        Animated.timing(this.progressAnimated, {
          toValue: 1,
          duration: 1000,
          // easing: ,
          // useNativeDriver: true,
        }).start()
      })
  }

  RenderContent = () => {
    const { data, renderItem } = this.props
    return <List {...this.props} data={data} renderItem={renderItem} onOpen={this.onOpen} />
  }

  onSetRefTransition = ref => {
    this.transition = ref
  }

  onSetRefDetail = ref => {
    this.detail = ref
  }

  onLayout = e => {
    const { y } = e.nativeEvent.layout
    this.setState({ y })
  }

  RenderTransition = () => {
    const { y } = this.state
    const { progressAnimated, isScale } = this.props
    if (!isScale)
      return <Transition y={y} ref={this.onSetRefTransition} animation={this.progressAnimated} />
    return <TransitionHeight ref={this.onSetRefTransition} animation={this.progressAnimated} />
  }

  RenderDetail = () => {
    const { renderDetail } = this.props
    return (
      <Detail
        ref={this.onSetRefDetail}
        animation={this.progressAnimated}
        renderDetail={renderDetail}
        onClose={this.onClose}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        {this.RenderContent()}
        {this.RenderTransition()}
        {this.RenderDetail()}
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
