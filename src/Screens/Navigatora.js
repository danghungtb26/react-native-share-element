import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createAppContainer } from 'react-navigation'
import ListPhoto from './List'
import ListItem from './List2'
import Search from './Search'

const Tabs = createMaterialBottomTabNavigator({
  ListPhoto,
  ListItem,
  // Search,
})

export default createAppContainer(Tabs)
