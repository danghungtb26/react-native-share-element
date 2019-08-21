import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Proptypes from 'prop-types'
import { Gallary } from '../../Components/Animation/List'
import defaultData from './data'
import Item from './Item'
import Detail from './Detail'

class ListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: defaultData,
    }
  }

  renderItem = ({ item }) => {
    return <Item item={item} />
  }

  renderDetail = (item, onClose) => {
    return <Detail item={item} onClose={onClose} />
  }

  render() {
    const { data } = this.state
    return (
      <Gallary
        numColumns={1}
        data={data}
        renderItem={this.renderItem}
        renderDetail={this.renderDetail}
        isScale
      />
    )
  }
}

ListScreen.propTypes = {}

export default ListScreen
