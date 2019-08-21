import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import PHOTOS from './data'
import { processImages, buildRows, normalizeRows } from './utils'
import PhotoGallery from './PhotoGallery'
import GridItem from './GridItem'

const maxWidth = Dimensions.get('window').width

export default class List extends React.Component {
  constructor(props) {
    super(props)
    const processedImages = processImages(PHOTOS)
    let rows = buildRows(processedImages, maxWidth)
    rows = normalizeRows(rows, maxWidth)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.state = {
      dataSource: ds.cloneWithRows(rows),
    }
  }

  renderRow = (onPhotoOpen, row) => (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
      }}
    >
      {row.map(item => (
        <GridItem item={item} key={item.id} onPhotoOpen={onPhotoOpen} />
      ))}
    </View>
  )

  showTabbar = value => {
    const { navigation } = this.props
    navigation.setParams({ visibale: value })
  }

  render() {
    return (
      <PhotoGallery
        showTabbar={this.showTabbar}
        renderContent={({ onPhotoOpen }) => (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this, onPhotoOpen)}
          />
        )}
        navigation={this.props.navigation}
      />
    )
  }
}

List.navigationOptions = ({ navigation }) => {
  console.log('TCL: List.navigationOptions -> navigation', navigation)
  const visibale = navigation.getParam('visibale')
  console.log('TCL: List.navigationOptions -> visibale', visibale)
  return {
    tabBarVisible: visibale !== undefined ? visibale : true,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
