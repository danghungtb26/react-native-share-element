import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import Proptypes from 'prop-types'
import { ShareView } from '../../Components/Animation/List'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { item, onClose } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
        <ShareView name="image" screen="detail">
          <View
            style={{
              flex: 1,
              backgroundColor: '#dddddd',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Image
              source={item.source}
              style={{ width: Dimensions.get('window').width, height: 200 }}
            />
            <TouchableOpacity onPress={onClose}>
              <Text>close</Text>
            </TouchableOpacity>
          </View>
        </ShareView>
      </View>
    )
  }
}

Index.propTypes = {}

export default Index
