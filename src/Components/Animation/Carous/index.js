import React, { Component } from 'react'
import { Text, View, FlatList, Animated, Dimensions, StatusBar, ScrollView } from 'react-native'
import Proptypes from 'prop-types'

import Item from './Item'

const { width, height } = Dimensions.get('window')

const AFlatlist = Animated.createAnimatedComponent(FlatList)

const dataa = []

for (let i = 0; i < 50; i += 1) {
  dataa.push(i)
}

class Carous extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: dataa,
    }
    this.scrollX = new Animated.Value(0)
    this.scrollY = new Animated.Value(0)
  }

  renderItem = ({ item, index }) => {
    return <Item animation={this.scrollX} item={item} showView={index} />
  }

  render() {
    const { data } = this.state
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AFlatlist
          data={data}
          keyExtractor={item => `${item}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={this.renderItem}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], {
            listener: this.listener,
            useNativeDriver: true,
          })}
          // snapToInterval={width}
          pagingEnabled
          decelerationRate={0}
          snapToAlignment="center"
        />
      </View>
    )
  }
}

Carous.propTypes = {}

export default Carous
