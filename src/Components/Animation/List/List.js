import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
// import data from './data'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  keyExtractor = (item, index) => `${item.id}${index}`

  renderItem = prop => {
    const { renderItem, onOpen } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          onOpen(prop.item)
        }}
        activeOpacity={1}
      >
        {renderItem(prop)}
      </TouchableOpacity>
    )
  }

  render() {
    const { data, renderItem } = this.props
    return (
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ width: '100%', height: 1, backgroundColor: '#dddddd' }} />
        )}
        data={data}
        numColumns={2}
        {...this.props}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

List.propTypes = {}

export default List
