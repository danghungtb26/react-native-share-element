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
    let a = await this.content.updateMeasure()
    const { onTransitionStart } = this.props
    if (typeof onTransitionStart === 'function') {
      a = await onTransitionStart(props, preProps)
    }
    return a
  }

  renderContent = (props, preProps) => {
    const { screenProps } = this.props
    return (
      <TransitionerContent
        ref={e => (this.content = e)}
        {...this.props}
        props={props}
        preProps={preProps}
        screenProps={screenProps}
      />
    )
  }

  render() {
    console.log(this.props)
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
  const router = StackRouter(route, config)
  console.log('TCL: createStackShared -> router', router)
  console.log('TCL: createStackShared -> config', config)
  return createNavigator(CustomTransformer, router, config)
}

export default createStackShared
