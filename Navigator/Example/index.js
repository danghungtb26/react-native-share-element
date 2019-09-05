import { createAppContainer, createStackNavigator } from 'react-navigation'

import { createStackShared } from '../Transitioner'
import Screen1 from './Screens/Screen1'
import Screen2 from './Screens/Screen2'
import ListImage from './Screens/ListImage'
import DetailImage from './Screens/DetailImage'
import Test from './Screens/Test'

const StackShare = createStackShared(
  {
    ListImage,
    Screen1: {
      screen: Screen1,
      navigationOptions: {
        abc: 'aaa',
      },
    },
    Screen2,
    DetailImage,
    // Test,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      abc: 'aaa',
    },
  }
)

const Stack = createStackNavigator({
  StackShare: {
    screen: StackShare,
    navigationOptions: {
      header: null,
    },
  },
  Test,
})

export default createAppContainer(Stack)
