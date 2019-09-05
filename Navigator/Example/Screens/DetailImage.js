import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Proptypes from 'prop-types'
import { ScrollView } from 'react-native-gesture-handler'
import ShareView from '../../Transitioner/ShareView'

const { width, height } = Dimensions.get('window')

class Index extends Component {
  constructor(props) {
    super(props)
    const name = props.navigation.getParam('name', '')
    const item = props.navigation.getParam('item', {})
    this.state = {
      name,
      item,
      enable: true,
    }
  }

  onScroll = ({ nativeEvent }) => {
    console.log('TCL: Index -> _onScroll -> nativeEvent', nativeEvent)
    if (nativeEvent.contentOffset.y <= 0 && this.state.enable) {
      this.setState({ enable: false })
    }
    if (nativeEvent.contentOffset.y > 0 && !this.state.enable) {
      this.setState({ enable: true })
    }
  }

  render() {
    const { name, item, enable } = this.state
    console.log('TCL: render -> enable', enable)
    const { screenIndex, navigation } = this.props
    return (
      <ScrollView
        disableScrollViewPanResponder={false}
        shouldActivateOnStart={false}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
      >
        <View>
          <ShareView screenIndex={screenIndex} name={name}>
            <Image source={item.source} style={{ width, height: 200 }} />
          </ShareView>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Test', { name: `image - ${item.id}`, item })
            }}
          >
            <Text>close</Text>
          </TouchableOpacity>
          {/* <View style={{ position: 'absolute', bottom: 0, top: 0, left: 0, right: 0 }}>
          <ShareView screenIndex={screenIndex} name={`text-${name}`}>
            <Text style={{ fontSize: 30 }}>abcxyz</Text>
          </ShareView>
        </View> */}
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
          <Text>aasdasdasdaskjdakdaskdbaskdbasdkasbdkabsdskd</Text>
        </View>
      </ScrollView>
    )
  }
}

Index.propTypes = {}

export default Index
