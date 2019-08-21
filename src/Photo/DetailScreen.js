import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'

const maxWidth = Dimensions.get('window').width

export default class DetailScreen extends React.Component {
  static contextTypes = {
    onImageDetailRef: PropTypes.func,
    onTranslation: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      localPhoto: null,
    }
    this.panGestureRef = React.createRef()
    this.gestureX = new Animated.Value(0)
    this.gestureY = new Animated.Value(0)
    this.gestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.gestureX,
            translationY: this.gestureY,
          },
        },
      ],
      {
        // useNativeDriver: true,
        listener: this.listener,
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    const { photo } = nextProps
    if (photo) {
      this.setState({ localPhoto: photo })
    }
  }

  listener = e => {
    const { translationX, translationY } = e.nativeEvent
    // console.log('TCL: DetailScreen -> e.nativeEvent', e.nativeEvent)
    // this.context.onTranslation(
    //   this.gestureX.__getValue() * 0.35,
    //   this.gestureY.__getValue() * 0.35,
    //   1 - (this.gestureX.__getValue() * 0.35) / Dimensions.get('window').width
    // )
  }

  handlePanGestureStateChange = e => {
    const { oldState } = e.nativeEvent
    if (oldState === 4) {
      const { translationX, translationY } = e.nativeEvent
      console.log('TCL: DetailScreen -> e.nativeEvent', e.nativeEvent)
      // console.log(this.ea)
      if (Math.abs(translationX) > 100 || translationY > 150) {
        this.context.onTranslation(
          this.gestureX.__getValue() * 0.85,
          this.gestureY.__getValue() * 0.85,
          1 - (this.gestureX.__getValue() * 0.15) / Dimensions.get('window').width
        )
        const { localPhoto } = this.state
        const { onClose } = this.props
        onClose(localPhoto.id, () => {
          setTimeout(() => {
            // this.gestureX.__getValue()
            this.gestureX.setValue(0)
            this.gestureY.setValue(0)
          }, 300)
        })
      } else {
        this.gestureX.setValue(0)
        this.gestureY.setValue(0)
      }
    }
  }

  render() {
    const { onClose, openProgress, isAnimating } = this.props
    const { localPhoto } = this.state

    const { width } = Dimensions.get('window')
    const { height } = Dimensions.get('window')
    const scale = this.gestureX.interpolate({
      inputRange: [-Dimensions.get('window').width, 0, Dimensions.get('window').width],
      outputRange: [0.85, 1, 0.85],
    })

    const translateX = this.gestureX.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [-0.7 * width, 0, 0.7 * width],
    })

    const translateY = this.gestureY.interpolate({
      inputRange: [-height, 0, height],
      outputRange: [-0.7 * height, 0, 0.7 * height],
    })

    const style = {
      transform: [{ translateX }, { translateY }, { scale }],
    }
    if (localPhoto) {
      return (
        <PanGestureHandler
          ref={this.panGestureRef}
          onGestureEvent={this.gestureEvent}
          onHandlerStateChange={this.handlePanGestureStateChange}
        >
          <Animated.View
            style={[StyleSheet.absoluteFill, style]}
            pointerEvents={isAnimating || this.props.photo ? 'auto' : 'none'}
          >
            <Animated.Image
              ref={r => {
                this._openingImageRef = r
                this.context.onImageDetailRef(r)
              }}
              source={localPhoto.source}
              style={{
                width: maxWidth,
                height: 300,
                opacity: openProgress.interpolate({
                  inputRange: [0, 0.99, 0.995],
                  outputRange: [0, 0, 1],
                }),
              }}
            />
            <Animated.View
              style={[
                styles.body,
                {
                  opacity: openProgress,
                  backgroundColor: '#fff',
                  transform: [
                    {
                      translateY: openProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity onPress={() => this.props.navigation.push('Test')}>
                <Text style={styles.title}>- {localPhoto.postedBy}</Text>
              </TouchableOpacity>
              <Text style={styles.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                opacity: openProgress,
              }}
              pointerEvents={isAnimating ? 'none' : 'auto'}
            >
              <TouchableOpacity onPress={() => onClose(localPhoto.id)} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      )
    }
    return <View />
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    // fontFamily: 'Avenir Next',
    lineHeight: 50,
  },
  description: {
    color: '#333',
    fontSize: 14,
    // fontFamily: 'Avenir Next'
  },
  body: { flex: 1, padding: 15 },
  closeText: { color: 'white', backgroundColor: 'transparent' },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    borderRadius: 5,
  },
})
