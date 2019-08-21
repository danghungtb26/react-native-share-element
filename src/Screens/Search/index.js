import React, { Component } from 'react'
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Easing,
  UIManager,
  LayoutAnimation,
} from 'react-native'
import Proptypes from 'prop-types'
import List from '../List'


const ViewAnimated = Animated.createAnimatedComponent(View)
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: true,
    }
    this.animation = new Animated.Value(0)
  }

  onOpen = () => {
    if (!this.open) {
      Animated.spring(this.animation, {
        toValue: 500,
        // duration: 500,
        // Easing: t => t  ** 2,
        speed: 20,
        useNativeDriver: false,
      }).start(() => {
        this.open = true
      })
    } else {
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 500,
      }).start(() => {
        this.open = false
      })
    }
  //   LayoutAnimation.spring()
  //     this.setState({ isShow: !this.state.isShow })
  }

  render() {
    const height = this.animation.interpolate({
      inputRange: [0, 10],
      outputRange: [0, 200],
      extrapolate: 'clamp',
    })
    const opacity = this.animation.interpolate({
      inputRange: [0 , 5,10],
      outputRange: [0, 0.3 ,1]
    })
    const { isShow } = this.state
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={1} onPress={this.onOpen}>
          <Text style={{ height: '10%' }}> textInComponent </Text>
        </TouchableOpacity>

        {/* <List /> */}
       {isShow?   <ViewAnimated style={{ height: Animated.add(this.animation ,300),opacity, backgroundColor: 'red', width: '100%' }} />: null}
      </SafeAreaView>
    )
  }
}

Search.propTypes = {}

export default Search
