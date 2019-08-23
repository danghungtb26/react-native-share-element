import React from 'react'
import {} from 'react-native'
import { Transitioner } from 'react-navigation-stack'
import { createNavigator, StackRouter } from 'react-navigation'
import TransitionerContent from './TransitionerContent'

class CustomTransformer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  configureTransition = () => {
    return {
      duration: 500,
    }
  }

  onTransitionStart = async (props, preProps) => {
    console.log("TCL: CustomTransformer -> onTransitionStart -> preProps", preProps)
    console.log("TCL: CustomTransformer -> onTransitionStart -> props", props)
    // console.log('object')
    // console.log(this.content)
    const a = await this.content.updateMeasure()
    console.log("TCL: CustomTransformer -> onTransitionStart -> a", a)
    // console.log("TCL: CustomTransformer -> onTransitionStart -> a", a)
    return a
    
  }

  renderContent = (props, preProps) => {
    const { screenProps } = this.props
    return (
      <TransitionerContent
        ref={e => this.content = e}
        {...this.props}
        props={props}
        preProps={preProps}
        screenProps={screenProps}
      />
    )
  }

  render() {
    return (
      <Transitioner
        configureTransition={this.configureTransition}
        render={this.renderContent}
        {...this.props}
        onTransitionStart={this.onTransitionStart}
      />
    )
  }
}

const createStackShared = (route, config = {}) => {
  const router = StackRouter(route)
  return createNavigator(CustomTransformer, router, config)
}

export default createStackShared
