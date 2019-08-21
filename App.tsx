/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import {Provider} from 'react-redux'
import Navigator from './src/Navigator'
import { ImageFilter } from './src/Components';
import List from './src/Screens/List2'
import Search from './src/Screens/Search'
import store from './src/redux';
import ReView from './src/Components/UIComponents/RNReView';
import Carous from './src/Components/Animation/Carous';
import Share from './Navigator/Example'
// import { useScreens } from 'react-native-screens'
// useScreens(false)


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n  Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n Shake or press menu button for dev menu',
})

export default class App extends React.PureComponent {

  constructor(props) {
    super(props)
    
  }
  
  render() {
    return (
      // <View style={styles.container}>
      // {/* <View style={{ borderRadius: 10, width: 100, height: 100 }}> */}
      //   <ImageFilter source={require('./default-avatar.jpg')} style={{ width: 100, height: 100, borderRadius: 50}}>
      //     <Text>aaa</Text>
      //   </ImageFilter>
      //   </View>
      // </View>
      // <Provider store={store}>
      //   <Navigator />
      // </Provider>
      // <Search />
      // <ReView style={{ width: 500, height: 400, margin: 50 }}/>
      // <Carous />
      <Share />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
