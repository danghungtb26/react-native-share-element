import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import List from './List'
import Test from './Test'

const Stack = createStackNavigator({
  List,
  Test,
},{
  headerMode: 'none',
})

const Tabs = createMaterialBottomTabNavigator({
  Stack,
  List2: List,
})

export default createAppContainer(Tabs)
