import { createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Home from '../Screens/Home'
import Transitioner from '../Screens/Transitioner'
import Setting from '../Screens/Setting'
import CreateStackTransitioner from '../Screens/CreateStackTransitioner'
import { createStackShared } from './Transitioner'

const Stack = createStackShared(
  {
    //   Transitioner,
    Home,
    Setting,
  },
  {}
)

const Stack2 = createStackNavigator(
  {
    Stack,
  },
  {
    gestureResponseDistance: 120,
  }
)

const Tabs = createMaterialBottomTabNavigator({
  Stack,
  Stack2,
})

export default Stack
