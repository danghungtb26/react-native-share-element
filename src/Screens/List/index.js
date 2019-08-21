import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Proptypes from 'prop-types'
import { List, Gallary } from '../../Components/Animation/List'
import defaultData, { main } from './data'
import Item from './Item'
import Detail from './Detail'

main()

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
        style={{ height: 400, marginTop: 100 }}
        data={data}
        renderItem={this.renderItem}
        renderDetail={this.renderDetail}
      />
    )
  }
}

ListScreen.propTypes = {}

const getmake = createSelector(
  state => state.list,
  list =>
    list.sort((a, b) => {
      if (a.height >= b.height) return 1
      return -1
    })
)

const mapStateToProp = () => {
  return (state, props) => {
    const a = getmake(state, props)
    return state
  }
}

export default connect(mapStateToProp)(ListScreen)
