import React from 'react'
import { NavigationContext } from 'react-navigation'

export default class ScreenView extends React.PureComponent {
  render() {
    const { screenProps, component: Component, navigation, screenIndex } = this.props
    return (
      <NavigationContext.Provider value={navigation}>
        <Component screenProps={screenProps} navigation={navigation} screenIndex={screenIndex} />
      </NavigationContext.Provider>
    )
  }
}
