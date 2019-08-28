import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import Proptypes from 'prop-types'
import data from '../../Image/index'
import Item from './Item'

class ListImage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  keyExtractor = (item, index) => `${item.id} - ${item.name} - ${index}`

  renderItem = ({ item, index }) => {
    const { navigation, screenIndex } = this.props
    return (
      <Item item={item} indexOfList={index} navigation={navigation} screenIndex={screenIndex} />
    )
  }

  render() {
    return <FlatList data={data} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
  }
}

ListImage.propTypes = {}

export default ListImage
